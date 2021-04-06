/**
 * This class provides access to a range of records in a {@link Ext.data.Store store}.
 * Instances of this class are not created directly but are rather returned by a store's
 * {@link Ext.data.AbstractStore#createActiveRange createActiveRange} method.
 *
 * This class is useful for buffered rendering where only a portion of the total set of
 * records are needed. By passing that information to a `Range`, the access to records
 * can be abstracted even across {@link Ext.data.virtual.Store virtual stores} where
 * only those records needed by views are fetched from the server.
 * @since 6.5.0
 */
Ext.define('Ext.data.Range', {
    requires: [
        'Ext.util.DelayedTask',
        'Ext.Deferred'
    ],

    isDataRange: true,

    /**
     * @cfg {Number} begin
     * The first record index of interest.
     *
     * This property is set by the `goto` method and is stored on the instance for
     * readonly use.
     * @readonly
     */
    begin: 0,

    /**
     * @cfg {Number} buffer
     * The buffer to execute server requests.
     */
    buffer: 0,

    /**
     * @cfg {Number} end
     * The first record beyond the range of interest. This is to make "length" of the
     * range simply `end - begin`.
     *
     * This property is set by the `goto` method and is stored on the instance for
     * readonly use.
     */
    end: 0,

    /**
     * @property (Number} length
     * The number of records in the range of `[begin, end)`. This is equal to the
     * difference `end - begin`.
     *
     * This property is maintained by the `goto` method and is stored on the instance for
     * readonly use.
     * @readonly
     */
    length: 0,

    /**
     * @property {Ext.data.Model[]} records
     * The records corresponding to the `begin` and `end` of this range. For normal
     * stores this is the standard array of records.
     *
     * For a {@link Ext.data.virtual.Store virtual store} this is a sparse object of
     * available records bounded by the limits of this range.
     *
     * In all cases, this object is keyed by the record index and (except for the
     * `length` property) should be treated as an array.
     * @readonly
     */

    /**
     * @cfg {Ext.data.AbstractStore} store
     * The associated store. This config must be supplied at construction and cannot
     * be changed after that time.
     * @readonly
     */
    store: null,

    /**
     * @cfg {Number} waitTimeout
     * A timeout to wait for promises to complete returned from `goto`. `null` for
     * the timeout to be infinite.
     */
    waitTimeout: 10000,

    // private
    activeWait: null,

    constructor: function(config) {
        var me = this,
            activeRanges, store;

        Ext.apply(me, config);

        store = me.store;

        if (!(activeRanges = store.activeRanges)) {
            store.activeRanges = activeRanges = [];
        }

        activeRanges.push(me);

        me.refresh();

        if ('begin' in config) {
            me.begin = me.end = 0; // Applied on us above, so clear it
            me.goto(config.begin, config.end).catch(function() {
                // Do nothing, since this was passed as a config, we can't
                // reasonably return a failure here
            });
        }
    },

    destroy: function() {
        var me = this,
            store = me.store,
            activeRanges = store && store.activeRanges;

        Ext.destroy(me.storeListeners);

        if (activeRanges) {
            Ext.Array.remove(activeRanges, me);
        }

        me.cancelActiveWait();

        me.callParent();
    },

    /**
     * Go to a particular point in the range.
     * @param {Number} begin The start index, inclusive.
     * @param {Number} end The end index, exclusive.
     * @return Ext.Promise The promise. Resolves with `this` when the range is resolved
     * successfully. Resolves with `null` if the range times out, or a new range is requested
     * before the current one completes.
     */
    goto: function(begin, end) {
        var me = this,
            buffer = me.buffer,
            task = me.task,
            promise;

        me.begin = begin;
        me.end = end;
        me.length = end - begin;

        me.cancelActiveWait();

        me.activeWait = me.setupWait(begin, end);
        // Need to assign this here. In a synchronous range, doGoto will resolve immediately.
        promise = me.activeWait.promise;
        me.resolveWaitIfSatisfied();

        if (buffer > 0) {
            if (!task) {
                me.task = task = new Ext.util.DelayedTask(me.doGoto, me);
            }

            task.delay(buffer);
        }
        else {
            me.doGoto();
        }

        return promise;
    },

    privates: {
        lastBegin: 0,
        lastEnd: 0,

        cancelActiveWait: function() {
            this.resolveWait(null);
        },

        doGoto: Ext.privateFn,

        refresh: function() {
            this.records = this.store.getData().items;
        },

        resolveWait: function(value) {
            var wait = this.activeWait;

            if (wait) {
                wait.deferred.resolve(value);
                this.activeWait = null;
            }

            return value;
        },

        resolveWaitIfSatisfied: function() {
            this.resolveWait(this);
        },

        setupWait: function(begin, end) {
            var me = this,
                timeout = me.waitTimeout,
                deferred = new Ext.Deferred(),
                promise = deferred.promise;

            if (timeout) {
                promise = Ext.Deferred.timeout(promise, timeout).catch(function() {
                    return me.resolveWait(null);
                });
            }

            return {
                deferred: deferred,
                promise: promise
            };
        }
    }
});
