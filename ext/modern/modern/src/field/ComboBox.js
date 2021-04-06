/**
 * A combobox control with support for autocomplete, remote loading, and many other features.
 *
 * A ComboBox is like a combination of a traditional HTML text `<input>` field and a `<select>`
 * field; if the {@link #cfg!editable} config is `true`, then the user is able to type freely
 * into the field, and/or pick values from a dropdown selection list.
 *
 * The user can input any value by default, even if it does not appear in the selection list;
 * to prevent free-form values and restrict them to items in the list, set
 * {@link #forceSelection} to `true`.
 *
 * The selection list's options are populated from any {@link Ext.data.Store}, including remote
 * stores. The data items in the store are mapped to each option's displayed text and backing
 * value via the {@link #valueField} and {@link #displayField} configurations which are applied
 * to the list via the {@link #cfg!itemTpl}.
 *
 * If your store is not remote, i.e. it depends only on local data and is loaded up front, you MUST
 * set the {@link #queryMode} to `'local'`.
 *
 * # Example usage:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *      Ext.create({
 *          fullscreen: true,
 *          xtype: 'container',
 *          padding: 50,
 *          layout: 'vbox',
 *          items: [{
 *              xtype: 'combobox',
 *              label: 'Choose State',
 *              queryMode: 'local',
 *              displayField: 'name',
 *              valueField: 'abbr',
 *
 *              store: [
 *                  { abbr: 'AL', name: 'Alabama' },
 *                  { abbr: 'AK', name: 'Alaska' },
 *                  { abbr: 'AZ', name: 'Arizona' }
 *              ]
 *          }]
 *      });
 * ```
 *
 * # Events
 *
 * ComboBox fires a select event if an item is chosen from the associated list.  If
 * the ComboBox is configured with {@link #forceSelection}: true, an action event is fired
 * when the user has typed the ENTER key while editing the field, and a change event on
 * each keystroke.
 *
 * ## Customized combobox
 *
 * Both the text shown in dropdown list and text field can be easily customized:
 *```javascript
 *     @example({ framework: 'extjs' })
 *      Ext.create({
 *          fullscreen: true,
 *          xtype: 'container',
 *          padding: 50,
 *          layout: 'vbox',
 *          items: [{
 *              xtype: 'combobox',
 *              label: 'Choose State',
 *              queryMode: 'local',
 *              displayField: 'name',
 *              valueField: 'abbr',
 *
 *              // For the dropdown list
 *              itemTpl: '<span role="option" class="x-boundlist-item">{abbr} - {name}</span>',
 *
 *              // For the content of the text field
 *              displayTpl: '{abbr} - {name}',
 *
 *              editable: false,  // disable typing in the text field
 *
 *              store: [
 *                  { abbr: 'AL', name: 'Alabama' },
 *                  { abbr: 'AK', name: 'Alaska' },
 *                  { abbr: 'AZ', name: 'Arizona' }
 *              ]
 *          }]
 *      });
 *
 * See also the {@link #cfg!floatedPicker} and {@link #cfg!edgePicker} options for additional
 * configuration of the options list.
 *
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 * import { Component } from '@angular/core'
 * declare var Ext: any;
 *
 * @Component({
 *     selector: 'app-root-1',
 *     styles: [``],
 *     template: `
 *         <ExtContainer [layout]='"center"'>
 *             <ExtFormPanel [shadow]>
 *                 <ExtComboBox
 *                     [width]="200"
 *                     [label]='"State"'
 *                     [options]='data'
 *                     [displayField]='"name"'
 *                     [valueField]='"code"'
 *                     [queryMode]='"local"'
 *                     [labelAlign]='"placeholder"'
 *                     [typeAhead]
 *                 ></ExtComboBox>
 *             </ExtFormPanel>
 *         </ExtContainer>
 * })
 * export class AppComponent {
 *     data = [
 *         {"name":"Alabama","abbrev":"AL"},
 *         {"name":"Alaska","abbrev":"AK"},
 *         {"name":"Arizona","abbrev":"AZ"}
 *     ];
 *  }
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-formpanel
 *    shadow="true"
 * >
 *    <ext-combobox
 *        width="200"
 *        label="State"
 *        displayField="name"
 *        valueField="code"
 *        queryMode="local"
 *        labelAlign="placeholder"
 *        typeAhead="true"
 *        onready="comboboxfield.comboboxFieldReady"
 *     >
 *     </ext-combobox>
 * </ext-formpanel>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-formpanel.component';
 * import '@sencha/ext-web-components/dist/ext-combobox.component';
 *
 * export default class ComboBoxFieldComponent {
 *    constructor() {
 *         this.data = [
 *             {"name":"Alabama","abbrev":"AL"},
 *             {"name":"Alaska","abbrev":"AK"},
 *             {"name":"Arizona","abbrev":"AZ"}
 *         ]
 *   }
 *   comboboxFieldReady(event) {
 *       this.combobox = event.detail.cmp;
 *       this.combobox.setOptions(this.data);
 *   }
 * }
 *
 * window.comboboxfield = new ComboBoxFieldComponent();
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtFormPanel, ExtComboBox } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *     render() {
 *          const data = [
 *               {"name":"Alabama","abbrev":"AL"},
 *               {"name":"Alaska","abbrev":"AK"},
 *               {"name":"Arizona","abbrev":"AZ"}
 *          ]
 *
 *          return (
 *              <ExtFormPanel shadow>
 *                  <ExtComboBox
 *                      width={200}
 *                      label="State"
 *                      options={data}
 *                      displayField="name"
 *                      valueField="code"
 *                      queryMode="local"
 *                      labelAlign="placeholder"
 *                      typeAhead
 *                  />
 *              </ExtFormPanel>
 *          )
 *      }
 * }
 * ```
 *
 * @since 6.5.0
 */
Ext.define('Ext.field.ComboBox', {
    extend: 'Ext.field.Select',
    xtype: [
        'combobox',
        'comboboxfield'
    ],

    alternateClassName: [
        'Ext.form.field.ComboBox' // classic compat
    ],

    requires: [
        'Ext.dataview.BoundListNavigationModel'
    ],

    config: {
        /**
         * @cfg {Function/String/Object/Ext.util.Filter} primaryFilter
         * A filter config object, or a Filter instance used to filter the store on input
         * field mutation by typing or pasting.
         *
         * This may be a filter config object which specifies a filter which uses the
         * {@link #cfg!store}'s fields.
         *
         * {@link Ext.util.Filter Filters} may also be instantiated using a custom `filterFn`
         * to allow a developer to specify complex matching. For example, a combobox developer
         * might allow a user to filter using either the {@link #cfg!valueField} or
         * {@link #cfg!displayField} by using:
         *
         *     primaryFilter: function(candidateRecord) {
         *         // This called in the scope of the Filter instance, we have this config
         *         var value = this.getValue();
         *
         *         return Ext.String.startsWith(candidateRecord.get('stateName', value, true) ||
         *                Ext.String.startsWith(candidateRecord.get('abbreviation', value, true);
         *     }
         *
         * This may also be configured as the name of a method on a ViewController which is to
         * be used as the filtering function. Note that this will *still* be called in the
         * scope of the created Filter object because that has access to the `value`
         * which is being tested for.
         */
        primaryFilter: true,

        /**
         * @cfg {String} queryParam
         * Name of the parameter used by the Store to pass the typed string when the ComboBox
         * is configured with
         * `{@link #queryMode}: 'remote'`. If explicitly set to a falsy value it will not be
         * sent.
         */
        queryParam: 'query',

        /**
         * @cfg {String} queryMode
         * The mode in which the ComboBox uses the configured Store. Acceptable values are:
         *
         *  - **`'local'`** : In this mode, the ComboBox assumes the store is fully loaded and
         *   will query it directly.
         *
         *  - **`'remote'`** : In this mode the ComboBox loads its Store dynamically based upon
         *   user interaction.
         *
         *   This is typically used for "autocomplete" type inputs, and after the user finishes
         *   typing, the Store is {@link Ext.data.Store#method!load load}ed.
         *
         *   A parameter containing the typed string is sent in the load request. The default
         *   parameter name for the input string is `query`, but this can be configured using
         *   the {@link #cfg!queryParam} config.
         *
         *   In `queryMode: 'remote'`, the Store may be configured with
         *   `{@link Ext.data.Store#cfg!remoteFilter remoteFilter}: true`, and further filters
         *   may be _programmatically_ added to the Store which are then passed with every
         *   load request which allows the server to further refine the returned dataset.
         *
         *   Typically, in an autocomplete situation, {@link #cfg!hideTrigger} is configured
         *   `true` because it has no meaning for autocomplete.
         */
        queryMode: 'remote',

        /**
         * @cfg {Boolean} queryCaching
         * When true, this prevents the combo from re-querying (either locally or remotely)
         * when the current query is the same as the previous query.
         */
        queryCaching: true,

        /**
         * @cfg {Number} queryDelay
         * The length of time in milliseconds to delay between the start of typing and sending
         * the query to filter the dropdown list.
         *
         * Defaults to `500` if `{@link #queryMode} = 'remote'` or `10` if
         * `{@link #queryMode} = 'local'`
         */
        queryDelay: true,

        /**
         * @cfg {Number} minChars
         * The minimum number of characters the user must type before autocomplete and
         * {@link #typeAhead} activate.
         *
         * Defaults to `4` if {@link #queryMode} is `'remote'` or `0` if {@link #queryMode}
         * is `'local'`, does not apply if {@link Ext.form.field.Trigger#editable editable}
         * is `false`.
         */
        minChars: null,

        /**
         * @cfg {Boolean} anyMatch
         * * Only valid when {@link #cfg!queryMode} is `'local'`.*
         * Configure as `true` to cause the {@link #cfg!primaryFilter} to match the typed
         * characters at any position in the {@link #displayField}'s value when filtering
         * *locally*.
         */
        anyMatch: false,

        /**
         * @cfg {Boolean} caseSensitive
         * * Only valid when {@link #cfg!queryMode} is `'local'`.*
         * Configure as `true` to cause the {@link #cfg!primaryFilter} to match with
         * exact case matching.
         */
        caseSensitive: false,

        /**
         * @cfg {Boolean} typeAhead
         * `true` to populate and autoselect the remainder of the text being typed after
         * a configurable delay ({@link #typeAheadDelay}) if it matches a known value.
         */
        typeAhead: false,

        /**
         * @cfg {Number} typeAheadDelay
         * The length of time in milliseconds to wait until the typeahead text is displayed
         * if {@link #typeAhead} is `true`.
         */
        typeAheadDelay: 250,

        /**
         * @cfg {String} triggerAction
         * The action to execute when the trigger is clicked.
         *
         *  - **`'all'`** :
         *
         *   {@link #doFilter run the query} specified by the `{@link #cfg!allQuery}` config option
         *
         *  - **`'last'`** :
         *
         *   {@link #doFilter run the query} using the `{@link #lastQuery last query value}`.
         *
         *  - **`'query'`** :
         *
         *   {@link #doFilter run the query} using the {@link Ext.form.field.Base#getRawValue
         *   raw value}.
         *
         * See also `{@link #queryParam}`.
         */
        triggerAction: 'all',

        /**
         * @cfg {String} allQuery
         * The text query to use to filter the store when the trigger element is tapped
         * (or expansion is requested by a keyboard gesture). By default, this is `null`
         * causing no filtering to occur.
         */
        allQuery: null,

        /**
         * @cfg {Boolean} enableRegEx
         * *When {@link #queryMode} is `'local'` only*
         *
         * Set to `true` to have the ComboBox use the typed value as a RegExp source to
         * filter the store to get possible matches.
         * Invalid regex values will be ignored.
         */
        enableRegEx: null
    },

    /**
     * @cfg {Boolean} autoSelect
     * `true` to auto select the first value in the {@link #store} or {@link #options} when
     * they are changed. Only happens when the {@link #value} is set to `null`.
     */
    autoSelect: false,

    classCls: Ext.baseCSSPrefix + 'combobox',

    /**
     * @cfg editable
     * @inheritdoc Ext.field.Text#cfg-editable
     */
    editable: true,

    /**
     * @cfg {Boolean} forceSelection
     * Set to `true` to restrict the selected value to one of the values in the list, or
     * `false` to allow the user to set arbitrary text into the field.
     */
    forceSelection: false,

    /**
     * @event beforepickercreate
     * Fires before the pop-up picker is created to give a developer a chance to configure it.
     * @param {Ext.field.ComboBox} this
     * @param {Object} newValue The config object for the picker.
     */

    /**
     * @event pickercreate
     * Fires after the pop-up picker is created to give a developer a chance to configure it.
     * @param {Ext.field.ComboBox} this
     * @param {Ext.dataview.List/Ext.Component} picker The instantiated picker.
     */

    /**
     * @event beforequery
     * Fires before all queries are processed. Return false to cancel the query or set the
     * queryPlan's cancel property to true.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {Ext.form.field.ComboBox} queryPlan.combo A reference to this ComboBox.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's
     * {@link #valueField}.
     * @param {Boolean} queryPlan.force If `true`, causes the query to be executed even if the
     * minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return,
     * causes the query not to be executed.
     * @param {Object} [queryPlan.lastQuery] The queryPlan object used in the previous query.
     */

    /**
     * @event select
     * Fires when the user has selected an item from the associated picker.
     * @param {Ext.field.ComboBox} this This field
     * @param {Ext.data.Model} newValue The corresponding record for the new value
     */

    /**
     * @event change
     * Fires when the field is changed, or if forceSelection is false, on keystroke.
     * @param {Ext.field.ComboBox} this This field
     * @param {Ext.data.Model} newValue The new value
     * @param {Ext.data.Model} oldValue The original value
     */

    // Start with value on prototype.
    lastQuery: {},

    // ENTER does not trigger an input event
    keyMap: {
        scope: 'this',
        ENTER: 'onEnterKey'
    },

    platformConfig: {
        phone: {
            editable: false
        }
    },

    /**
     * @private
     * Respond to selection. Needed if we are multiselect
     */
    onCollectionAdd: function(valueCollection, adds) {
        // Clear the suggestion input upon add of a new selection
        if (this.getMultiSelect()) {
            this.inputElement.dom.value = '';

            // If we were expanded, then release the filter constrains that were
            // in place due to the primaryFilter using the inputElement's value.
            if (this.expanded) {
                this.doRawFilter();
            }
        }

        this.callParent([valueCollection, adds]);
    },

    onInput: function(e) {
        var me = this,
            filterTask = me.doFilterTask,
            value = me.inputElement.dom.value,
            filters = me.getStore().getFilters(),
            keyboardEvent, isDelimiter;

        if (Ext.supports.inputEventData) {
            isDelimiter = e.browserEvent.data === me.getDelimiter();
        }
        // Fall back to testing whether the last keyboard event was the delimiter key and
        // is close enough in time to be the source of this input event.
        else {
            keyboardEvent = me.lastKeyMapEvent;

            isDelimiter = keyboardEvent &&
                keyboardEvent.getChar() === me.getDelimiter() &&
                (Ext.ticks() - keyboardEvent.time) < 20;
        }

        // Keep our config up to date:
        me._inputValue = value;

        if (!me.hasFocus && me.getLabelAlign() === 'placeholder') {
            me.syncLabelPlaceholder(true);
        }

        if (!me.getForceSelection() || (value === '' && !me.getRequired())) {
            // If we are allowing addition of multiple new values, do so on receipt of
            // the delimiter character.
            if (me.getMultiSelect()) {
                if (isDelimiter) {
                    return me.addNewMultiValues();
                }
            }
            else {
                me.callParent([e]);
            }
        }
        else {
            me.syncEmptyState();
        }

        if (value.length) {
            if (!filterTask) {
                filterTask = me.doFilterTask = new Ext.util.DelayedTask(me.doRawFilter, me);
            }

            filterTask.delay(me.getQueryDelay());
        }
        else {
            me.collapse();
            filters.beginUpdate();
            me.getPrimaryFilter().setDisabled(true);
            filters.endUpdate();
        }
    },

    onEnterKey: function(e) {
        var me = this;

        if (!me.getForceSelection() && me.getMultiSelect()) {
            me.addNewMultiValues();
        }
    },

    addNewMultiValues: function() {
        var me = this,
            inputValue = me.inputElement.dom.value,
            newValue;

        newValue = me.getValue() || [];
        newValue.push.apply(newValue, inputValue.split(me.getDelimiter()));

        return me.setValue(Ext.Array.clean(newValue));
    },

    /**
     * @private
     * Execute the query with the raw contents within the textfield.
     */
    doRawFilter: function() {
        var me = this,
            rawValue = me.inputElement.dom.value,
            lastQuery = me.lastQuery.query,
            isErase = lastQuery && lastQuery.length > rawValue.length;

        me.doFilter({
            query: rawValue,
            isErase: isErase
        });
    },

    /**
     * @private
     * Show the dropdown based upon triggerAction and allQuery
     */
    onExpandTap: function() {
        var me = this,
            triggerAction = me.getTriggerAction();

        // TODO: Keyboard operation
        // Alt-Down arrow opens the picker but does not select items:
        // http://www.w3.org/TR/wai-aria-practices/#combobox

        if (me.expanded) {
            // Check the expended time to check that we are not being called in the immediate
            // aftermath of an expand. The reason being that expandTrigger does focusOnTap
            // and Picker fields expand on focus if the focus happened via touch.
            // But then, when the expandTrigger calls its handler, we get here immediately
            // and do a collapse.
            if (Ext.now() - me.expanded > 100) {
                me.collapse();
            }
        }
        else if (!me.getReadOnly() && !me.getDisabled()) {
            if (triggerAction === 'all') {
                me.doFilter({
                    query: me.getAllQuery(),
                    force: true // overrides the minChars test
                });
            }
            else if (triggerAction === 'last') {
                me.doFilter({
                    query: me.lastQuery.query,
                    force: true // overrides the minChars test
                });
            }
            else {
                me.doFilter({
                    query: me.inputElement.dom.value
                });
            }
        }
    },

    clearValue: function() {
        var me = this;

        me.setValue(null);
        me.setInputValue('');
        me.setFieldDisplay();
    },

    /**
     * Executes a query to filter the dropdown list. Fires the {@link #beforequery} event
     * prior to performing the query allowing the query action to be canceled if needed.
     *
     * @param {Object} query An object containing details about the query to be executed.
     * @param {String} [query.query] The query value to be used to match against the
     * ComboBox's {@link #textField}. If not present, the primary {@link #cfg!textfield}
     * filter is disabled.
     * @param {Boolean} query.force If `true`, causes the query to be executed even if
     * the {@link #cfg!minChars} threshold is not met.
     * @returns {Boolean} `true` if the query resulted in picker expansion.
     */
    doFilter: function(query) {
        var me = this,
            isLocal = me.getQueryMode() === 'local',
            lastQuery = me.lastQuery,
            store = me.getStore() && me._pickerStore,
            filter = me.getPrimaryFilter(),
            filters = store.getFilters(),
            // Decide if, and how we are going to query the store
            queryPlan = me.beforeFilter(Ext.apply({
                filterGeneration: filter.generation,
                lastQuery: lastQuery || {},
                combo: me,
                cancel: false
            }, query)),
            picker, source;

        // Allow veto.
        if (store && queryPlan !== false && !queryPlan.cancel) {
            // User can be typing a regex in here, if it's invalid
            // just swallow the exception and move on
            if (me.getEnableRegEx()) {
                try {
                    queryPlan.query = new RegExp(queryPlan.query);
                }
                catch (e) {
                    queryPlan.query = null;
                }
            }

            // Update the value.
            filter.setValue(queryPlan.query);

            // If we are not caching previous queries, or the filter has changed in any way
            // (value, or matching criteria etc), or the force flag is different, then we
            // must re-filter. Otherwise, we just drop through to expand.
            if (!me.getQueryCaching() || filter.generation !== lastQuery.filterGeneration ||
                query.force) {
                // If there is a query string to filter against, enable the filter now and prime
                // its value.
                // Filtering will occur when the store's FilterCollection broadcasts its
                // endUpdate signal.
                if (Ext.isEmpty(queryPlan.query)) {
                    filter.setDisabled(true);
                }
                else {
                    filter.setDisabled(false);

                    // If we are doing remote filtering, set a flag to
                    // indicate to onStoreLoad that the load is the result of filering.
                    me.isFiltering = !isLocal;
                }

                me.lastQuery = queryPlan;

                // Firing the ensUpdate event will cause the store to refilter if local filtering
                // or reload starting at page 1 if remote.
                filters.beginUpdate();
                filters.endUpdate();

                // If we are doing local filtering, the upstream store MUST be loaded.
                // Now we use a ChainedStore we must do this. In previous versions
                // simply adding a filter caused automatic store load.
                if (store.isChainedStore) {
                    source = store.getSource();

                    if (!source.isLoaded() && !source.hasPendingLoad()) {
                        source.load();
                    }
                }
            }

            if (me.getTypeAhead()) {
                me.doTypeAhead(queryPlan);
            }

            // If the query result is non-zero length, or there is empty text to display
            // we must expand.
            // Note that edge pickers do not have an emptyText config.
            picker = me.getPicker();

            // If it's a remote store, we must expand now, so that the picker will show its
            // loading mask to show that some activity is happening.
            if (!isLocal || store.getCount() || (picker.getEmptyText && picker.getEmptyText())) {
                me.expand();

                // If the use is querying by a value, and it's a local filter, then
                // set the location immediately. If it's going to be a remote filter,
                // then onStoreLoad will set the location after the
                if (queryPlan.query && isLocal) {
                    me.setPickerLocation();
                }

                return true;
            }

            // The result of the filtering is no records and there's no emptyText...
            // if it's a local query, hide the picker. If it's remote, we do not
            // know the result size yet, so the loading mask must stay visible.
            me.collapse();
        }

        return false;
    },

    /**
     * @template
     * A method which may modify aspects of how the store is to be filtered (if
     * {@link #queryMode} is `"local"`) of loaded (if {@link #queryMode} is `"remote"`).
     *
     * This is called by the {@link #doFilter method, and may be overridden in subclasses to modify
     * the default behaviour.
     *
     * This method is passed an object containing information about the upcoming query operation
     * which it may modify before returning.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {String} [queryPlan.query] The query value to be used to match against the
     * ComboBox's {@link #textField}.
     * If not present, the primary {@link #cfg!textfield} filter is disabled.
     * @param {String} queryPlan.lastQuery The query value used the last time a store query
     * was made.
     * @param {Boolean} queryPlan.force If `true`, causes the query to be executed even if
     * the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon
     * return, causes the query not to be executed.
     */
    beforeFilter: function(queryPlan) {
        var me = this,
            query = queryPlan.query,
            len;

        // Allow beforequery event to veto by returning false
        if (me.fireEvent('beforequery', queryPlan) === false) {
            queryPlan.cancel = true;
        }
        // Allow beforequery event to veto by returning setting the cancel flag
        else if (!queryPlan.cancel) {
            len = query && query.length;

            // If the minChars threshold has not been met, and we're not forcing a query, cancel
            // the query
            if (!queryPlan.force && len && len < me._getMinChars()) {
                queryPlan.cancel = true;
            }
        }

        return queryPlan;
    },

    completeEdit: function() {
        var me = this,
            inputValue = me.getInputValue(),
            value = me.getValue(),
            selection = me.getSelection();

        // Don't want to callParent here, we need custom handling

        if (me.doFilterTask) {
            me.doFilterTask.cancel();
        }

        // Allow the input value to add a new value if configured to do so.
        if (!me.getForceSelection() && me.getMultiSelect()) {

            // If there is input left, then if selectOnTab is set, process it
            // into a new value, otherwise clear the input.
            if (inputValue) {
                if (this.getSelectOnTab()) {
                    me.addNewMultiValues();
                }
                else {
                    this.setInputValue('');
                }
            }
        }
        else {
            // We must not leave an inconsistent state.
            // So if there's a textual value, there must be some
            // selection.
            if (inputValue) {
                // Prevent an issue where we have duplicate display values with
                // different underlying values. If the typed value exactly matches
                // the selection Record, we must not do a syncValue.
                if (!selection || selection.get(this.getDisplayField()) !== inputValue) {
                    me.syncMode = 'input';
                    me.syncValue();

                    // If syncValue finds that they quit after typing some non-matchable text,
                    // revert to the underlying value.
                    if (!me.getValue()) {
                        me.setValue(value);
                    }
                }
            }
            // They cleared out the text, and are leaving.
            // If there's an underlying value:
            //  If we're required, restore the display
            //  Else clear the selection
            else if (selection) {
                if (me.getRequired()) {
                    me.setFieldDisplay(selection);
                }
                else {
                    me.setSelection(null);
                }
            }

            if (me.getTypeAhead()) {
                me.select(inputValue ? inputValue.length : 0);
            }
        }
    },

    /**
     * @private
     * Called when local filtering is being used.
     * Only effective when NOT actively using the primary filter
     */
    onStoreFilterChange: function() {
        var me = this,
            store = me.getStore(),
            selection = me.getSelection() || null,
            toRemove = [];

        // If we are not in the middle of doing a primary filter, then prune no longer
        // present value(s)
        if (selection && !me.destroying && store && store.isLoaded() &&
            me.getPrimaryFilter().getDisabled()) {
            if (me.getMultiSelect()) {
                Ext.Array.each(selection, function(record) {
                    if (!record.isEntered && !store.contains(record)) {
                        toRemove.push(record);
                    }
                });
            }
            else {
                if (!selection.isEntered && !store.contains(selection)) {
                    toRemove.push(selection);
                }
            }

            // Prune out values which are no longer in the source store
            if (toRemove.length) {
                this.getValueCollection().remove(toRemove);
            }
        }
    },

    // TODO: Decide on an EdgePicker

    onListSelect: Ext.emptyFn,

    applyQueryDelay: function(queryDelay) {
        if (queryDelay === true) {
            queryDelay = this.getQueryMode() === 'local' ? 10 : 500;
        }

        return queryDelay;
    },

    applyPrimaryFilter: function(filter, oldFilter) {
        var me = this,
            store = me.getStore() && me._pickerStore,
            isInstance = filter && filter.isFilter,
            methodName;

        // If we have to remove the oldFilter, or reconfigure it...
        if (store && oldFilter) {
            // We are replacing the old filter
            if (filter) {
                if (isInstance) {
                    store.removeFilter(oldFilter, true);
                }
                else {
                    oldFilter.setConfig(filter);

                    return;
                }
            }
            // We are removing the old filter
            else if (!store.destroyed) {
                store.getFilters().remove(oldFilter);
            }
        }

        // There is a new filter
        if (filter) {
            if (filter === true) {
                filter = {
                    id: me.id + '-primary-filter',
                    anyMatch: me.getAnyMatch(),
                    caseSensitive: me.getCaseSensitive(),
                    root: 'data',
                    property: me.getDisplayField(),
                    value: me.inputElement.dom.value,
                    disabled: true
                };
            }

            // If it's a string, create a function which calls it where it can be found
            // but using the Filter as the scope.
            if (typeof filter === 'string') {
                methodName = filter;
                filter = {
                    filterFn: function(rec) {
                        var methodOwner = me.resolveListenerScope(me);

                        // Maintainer: MUST pass "this" as the scope because the method must
                        // be executed as a Filter method for access to the filter configurations.
                        return methodOwner[methodName].call(this, rec);
                    }
                };
            }

            // Ensure it's promoted to an instance
            if (!filter.isFilter) {
                filter = new Ext.util.Filter(filter);
            }

            // Primary filter serialized as simple value by default
            filter.serialize = function() {
                return me.serializePrimaryFilter(this);
            };

            // Add filter if we have a store already
            if (store) {
                store.addFilter(filter, true);
            }
        }

        return filter;
    },

    updateOptions: function(options, oldOptions) {
        if (options) {
            this.setQueryMode('local');
        }

        this.callParent([options, oldOptions]);
    },

    updatePicker: function(picker, oldPicker) {
        if (picker) {
            picker.getSelectable().addIgnoredFilter(this.getPrimaryFilter());
        }

        this.callParent([picker, oldPicker]);
    },

    updateStore: function(store, oldStore) {
        var me = this,
            isRemote = me.getQueryMode() === 'remote',
            primaryFilter,
            proxy, oldFilters;

        // Tweak the proxy to encode the primaryFilter's parameter as documented for ComboBox
        if (isRemote) {
            store.setRemoteFilter(true);

            // Set the Proxy's filterParam name to our queryParam name if it is a ServerProxy
            // which encodes params.
            proxy = store.getProxy();

            if (proxy.setFilterParam) {
                proxy.setFilterParam(me.getQueryParam());
            }
        }

        // Superclass ensures that there's a ChainedStore in the _pickerStore
        // property if we are going to be adding our own local filters to it.
        me.callParent([store, oldStore]);

        // The primaryFilter (Our typing filter) will add itself to the _pickerStore.
        primaryFilter = me.getPrimaryFilter();

        if (primaryFilter) {
            // Remove primaryFilter from the outgoing store.
            // It will only be there if the outgoing store was remoteFilter.
            if (oldStore && !oldStore.destroyed) {
                oldFilters = oldStore.getFilters();

                // Filter collection might not exist.
                if (oldFilters) {
                    oldFilters.remove(primaryFilter);
                }
            }

            // Add the primary filter to the (possibly new, but possibly just
            // re-attached to the incoming store) pickerStore.
            // See Ext.field.Select#updateStore, and its call to updatePickerStore.
            me._pickerStore.addFilter(primaryFilter, true);
        }

        // If we are doing remote filtering, then mutating the store's filters should not
        // result in a re-evaluation of whether the current value(s) is/are still present in
        // the store.
        // For local filtering, if a new filter is added (must not be done while typing is
        // taking place) then the current selection is pruned to remove no longer valid
        // entries.
        if (me.getQueryMode() === 'local') {
            store.on({
                filterchange: 'onStoreFilterChange',
                scope: me
            });
        }
    },

    /**
     * @template
     * A method that may be overridden in a subclass which serializes the primary filter
     * (the filter that passes the typed value for transmission to the server in the
     * {@link #cfg!queryParam}).
     *
     * The provided implementation simply passes the filter's textual value as the
     * {@link #cfg!queryParam} value.
     *
     * @param {Ext.util.Filter} filter The {@link #cfg!primaryFilter} of this ComboBox which
     * encapsulates the typed value and the matching rules.
     * @return {String/Object} A value which, when encoded as an HTML parameter, your server
     * will understand.
     */
    serializePrimaryFilter: function(filter) {
        return filter.getValue();
    },

    doDestroy: function() {
        var me = this;

        me.setPrimaryFilter(null);

        if (me.typeAheadTask) {
            me.typeAheadTask = me.typeAheadTask.cancel();
        }

        me.callParent();
    },

    doTypeAhead: function(queryPlan) {
        var me = this;

        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }

        // Only typeahead when user extends the query string, or it's a completely different query
        // If user is erasing, re-extending with typeahead is not wanted.
        if (
            (!queryPlan.lastQuery.query || !queryPlan.query ||
                queryPlan.query.length > queryPlan.lastQuery.query.length) ||
            !Ext.String.startsWith(queryPlan.lastQuery.query, queryPlan.query)
        ) {
            me.typeAheadTask.delay(me.getTypeAheadDelay());
        }
    },

    onTypeAhead: function() {
        var me = this,
            displayField = me.getDisplayField(),
            inputEl = me.inputElement.dom,
            rawValue = inputEl.value,
            store = me.getStore(),
            record = store.findRecord(displayField, rawValue),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = rawValue.length;

            if (selStart !== 0 && selStart !== len) {
                inputEl.value = me._inputValue = newValue;

                me.select(selStart, len);
            }
        }
    },

    privates: {
        _getMinChars: function() {
            var result = this.getMinChars();

            if (result == null) {
                result = this.getQueryMode() === 'remote' ? 4 : 0;
            }

            return result;
        },

        setFieldDisplay: function(selection) {
            var me = this,
                inputValue;

            me.callParent([selection]);

            if (!me.getMultiSelect()) {
                if (me.getTypeAhead()) {
                    inputValue = me.getInputValue();

                    me.select(inputValue ? inputValue.length : 0);
                }
            }
        }
    }
});
