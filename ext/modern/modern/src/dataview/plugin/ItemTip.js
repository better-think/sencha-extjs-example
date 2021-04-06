/**
 * A plugin which is a {@link Ext.tip.ToolTip} which shows itself upon mouseover of a DataView item.
 *
 * The associated {@link Ext.data.Model record} is passed into the {@link #setData} method
 * just before the tip is shown. The record is stored in the `record` property.
 */
Ext.define('Ext.dataview.plugin.ItemTip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'plugin.dataviewtip',

    anchor: true,

    showOnTap: true,

    defaultBindProperty: 'data',

    config: {
        // So that we can get early access to the owning DataView
        // in applyBind so we can ensure we have a ViewModel.
        cmp: null,

        /**
         * By default, the tip is constrained to within the client dataview and
         * only show if it will fit within the dataview. To allow tips to show outside
         * of the dataview, configure this as `false`.
         */
        constrainToView: true
    },

    listeners: {
        beforeshow: 'onBeforeShow',
        show: 'onShow',
        scope: 'this'
    },

    init: Ext.emptyFn,

    destroy: function() {
        // We need to null out the parent very early, otherwise
        // it will try and call remove() when this isn't really
        // a child item.
        this.parent = null;
        this.callParent();
    },

    applyData: function(data) {
        if (data.isEntity) {
            data = data.getData(true);
        }

        return data;
    },

    updateCmp: function(dataview) {
        var me = this,
            scroller = dataview.getScrollable();

        me.dataview = me.parent = dataview;
        dataview.on('initialize', 'onDataViewInitialized', me);

        if (scroller) {
            scroller.on('scroll', 'onDataViewScroll', me);
        }
    },

    onDataViewInitialized: function(dataview) {
        var me = this;

        me.setTarget(dataview.bodyElement);
        me.itemSelector = dataview.itemSelector;

        if (!me.getDelegate()) {
            me.setDelegate(me.itemSelector);
        }
    },

    onBeforeShow: function() {
        var me = this,
            viewModel = me.getViewModel(),
            location = me.getCmp().createLocation(me.currentTarget);

        // In case location has become invalidated during the showDelay.
        // For example the hovered item being removed.
        if (location.record) {
            if (me.getBind()) {
                viewModel.set('record', location.record);
                viewModel.set('recordIndex', me.location.recordIndex);

                // Flush the data now so that the alignment is correct
                viewModel.notify();
            }
            else {
                me.setData(location.record.data);
            }
        }
    },

    onShow: function() {
        // If we are outside the scrolling viewport, then we cannot be anchored
        // to a visible target, so we must not show.
        this.checkScrollVisibility();
    },

    onDataViewScroll: function() {
        // If we are outside the scrolling viewport, then we cannot be anchored
        // to a visible target, so we must hide.
        this.checkScrollVisibility();
    },

    privates: {
        // Plugins get assigned an id of their alias.type by default.
        // This plugin is a component so must have a unique id.
        initId: function(config) {
            if (config.id === 'dataviewtip') {
                config.id = this.id = this.getId();
            }
            else {
                this.callParent([config]);
            }
        },

        checkScrollVisibility: function() {
            var me = this,
                isInView, testEl;

            if (me.isVisible() && me.getConstrainToView()) {
                // Ensure alignment is correct due to this possibly being called in a
                // scroll handler.
                me.realignToTarget();
                testEl = me.getAnchor() || me.el;

                isInView = me.dataview.getScrollable().isInView(testEl);

                // If we are not in view, then hide
                if (!(isInView.x && isInView.y)) {
                    me.hide();
                }
            }
        },

        applyBind: function(binds, currentBindings) {
            var me = this,
                dataview = me.getCmp(),
                viewModel = me.getViewModel(),
                parentViewModel = dataview.lookupViewModel();

            // Ensure we have a connected ViewModel before binding is processed.
            if (viewModel) {
                viewModel.setParent(parentViewModel);
            }
            else {
                me.setViewModel(Ext.Factory.viewModel({
                    parent: parentViewModel,
                    data: {}
                }));
            }

            me.callParent([binds, currentBindings]);
        }
    }
});
