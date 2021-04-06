/**
 * SegmentedButton is a container for a group of {@link Ext.Button}s. Generally a SegmentedButton
 * would be a child of a {@link Ext.Toolbar} and would be used to switch between different views.
 *
 * ## Example usage:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * var segmentedButton = Ext.create('Ext.SegmentedButton', {
 *     allowMultiple: true,
 *     items: [
 *         {
 *             text: 'Option 1'
 *         },
 *         {
 *             text: 'Option 2',
 *             pressed: true
 *         },
 *         {
 *             text: 'Option 3'
 *         }
 *     ],
 *     listeners: {
 *         toggle: function(container, button, pressed){
 *             alert("User toggled the '" + button.getText() + "' button: " +
 *             (pressed ? 'on' : 'off'));
 *         }
 *     }
 * });
 * Ext.Viewport.add({ xtype: 'container', padding: 10, items: [segmentedButton] });
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtContainer, ExtPicker, ExtButton } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *     showPicker = () => this.picker.show();
 *     render() {
 *         return (
 *              <ExtContainer>
 *                  <ExtButton ui="action" handler={this.showPicker} text="Show Picker"/>
 *                   <ExtPicker
 *                      ref={picker => this.picker = picker}
 *                      slots={[
 *                          {
 *                              name: 'limit_speed',
 *                              title: 'Speed',
 *                              data: [
 *                                  {text: '50 KB/s', value: 50},
 *                                  {text: '100 KB/s', value: 100},
 *                                  {text: '200 KB/s', value: 200},
 *                                  {text: '300 KB/s', value: 300}
 *                              ]
 *                          }
 *                      ]}
 *                 />
 *             </ExtContainer>
 *         )
 *     }
 * }
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
 *         <ExtContainer>
 *             <ExtButton ui="action" [handler]="this.showPicker"
 *                    text="Show Picker"></ExtButton>
 *             <ExtPicker
 *                 (ready)='this.onPickerReady($event)'
 *                 [slots]="[
 *                     {
 *                         name: 'limit_speed',
 *                         title: 'Speed',
 *                         data: [
 *                             {text: '50 KB/s', value: 50},
 *                             {text: '100 KB/s', value: 100},
 *                             {text: '200 KB/s', value: 200},
 *                             {text: '300 KB/s', value: 300}
 *                         ]
 *                     }
 *                 ]"
 *             >
 *             </ExtPicker>
 *         </ExtContainer>
 *     `
 * })
 * export class AppComponent {
 *         pickerComp;
 *
 *         onPickerReady = (event) => {
 *             this.pickerComp = event.detail.cmp;
 *         }
 *
 *         showPicker = () => {
 *             this.pickerComp.show();
 *         }
 * }
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 *  @example({tab: 1})
 * <ext-container>
 *     <ext-button ui="action" ontap="picker.showPicker" text="Show Picker"></ext-button>
 *     <ext-picker
 *         onready="picker.pickerReady"
 *         slots='[{
 *                 "name": "limit_speed",
 *                 "title": "Speed",
 *                 "data": [
 *                             {"text": "50 KB/s", "value": "50"},
 *                             {"text": "100 KB/s", "value": "100"},
 *                             {"text": "200 KB/s", "value": "200"},
 *                             {"text": "300 KB/s", "value": "300"}
 *                         ]
 *                 }]'
 *     >
 *     </ext-picker>
 * </ext-container>
 * ```
 *
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-button.component';
 * import '@sencha/ext-web-components/dist/ext-picker.component';
 *
 * export default class PickerComponent {
 *     pickerReady = (event) => {
 *         this.pickerCmp = event.detail.cmp;
 *     }
 *
 *     showPicker = () => {
 *          this.pickerCmp.show();
 *     }
 * }
 * window.picker = new PickerComponent();
 * ```
 *
 */
Ext.define('Ext.SegmentedButton', {
    extend: 'Ext.Container',
    xtype: 'segmentedbutton',

    alternateClassName: 'Ext.button.Segmented',

    requires: [
        'Ext.Button',
        'Ext.layout.Box'
    ],

    isSegmentedButton: true,

    /**
     * @property classCls
     * @inheritdoc
     */
    classCls: Ext.baseCSSPrefix + 'segmentedbutton',

    config: {
        /**
         * @cfg {Boolean} allowMultiple
         * Allow multiple pressed buttons.
         * @accessor
         */
        allowMultiple: false,

        /**
         * @cfg {Boolean} allowDepress
         * Allow toggling the pressed state of each button.
         * Defaults to `true` when {@link #allowMultiple} is `true`.
         * @accessor
         */
        allowDepress: false,

        /**
         * @cfg {Boolean} allowToggle
         * Allow child buttons to be pressed when tapped on. Set to `false` to allow
         * tapping but not toggling of the buttons.
         * @accessor
         */
        allowToggle: true,

        /**
         * @cfg {Boolean} forceSelection
         * If {@link #allowMultiple} is `true`, this config may be set to `true` to indicate that
         * at least one button in the set must remain pressed at all times.
         *
         * If no {@link #value} is configured, and no child buttons are configured `pressed`, the
         * first child button is set `pressed: true`
         *
         * @since 6.0.2
         */
        forceSelection: false,

        /**
         * @cfg {Array} pressedButtons
         * The pressed buttons for this segmented button.
         *
         * You can remove all pressed buttons by calling {@link #setPressedButtons} with an empty
         * array.
         * @accessor
         */
        pressedButtons: null,

        /**
         * @cfg defaultType
         * @inheritdoc
         */
        defaultType: 'button',

        /**
         * @cfg {String} defaultUI
         * Default {@link Ext.Component#ui ui} to use for buttons in this segmented button.
         * Buttons can override this default by specifying their own UI
         */
        defaultUI: 'segmented',

        /**
         * @cfg {String/Number/String[]/Number[]} value
         * @accessor
         * The value of this button.  When {@link #allowMultiple} is `false`, value is a
         * String or Number.  When {@link #allowMultiple} is `true`, value is an array
         * of values.  A value corresponds to a child button's {@link Ext.Button#value
         * value}, or its index if no child button values match the given value.
         *
         * Using the `value` config of the child buttons with single toggle:
         *
         *```javascript
         * @example({ framework: 'extjs' })
         *     var button = Ext.create('Ext.SegmentedButton', {
         *         renderTo: Ext.getBody(),
         *         value: 'optTwo', // begin with "Option Two" selected
         *         items: [{
         *             text: 'Option One',
         *             value: 'optOne'
         *         }, {
         *             text: 'Option Two',
         *             value: 'optTwo'
         *         }, {
         *             text: 'Option Three',
         *             value:  'optThree'
         *         }]
         *     });
         * ```
         *
         *     console.log(button.getValue()); // 'optTwo'
         *
         *     // Sets the value to optOne, and sets the pressed state of the "Option One" button
         *     button.setValue('optOne');
         *
         *     console.log(button.getValue()); // 'optOne'
         *
         * Using multiple toggle, and index-based values:
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     var button = Ext.create('Ext.SegmentedButton', {
         *         renderTo: Ext.getBody(),
         *         allowMultiple: true
         *         value: [1, 2], // begin with "Option Two" and "Option Three" selected
         *         items: [{
         *             text: 'Option One'
         *         }, {
         *             text: 'Option Two'
         *         }, {
         *             text: 'Option Three'
         *         }]
         *     });
         * ```
         *
         *     // Sets value to [0, 2], and sets pressed state of "Option One" and "Option Three"
         *     button.setValue([0, 2]);
         *
         *     console.log(button.getValue()); // [0, 2]
         *
         *     // Remove all pressed buttons, and set value to null
         *     button.setValue(null);
         *
         * Note that value based setting and index based setting cannot be mixed.
         */
        value: undefined,

        /**
         * @cfg {Boolean} vertical
         * `true` to display the buttons vertically
         */
        vertical: false
    },

    /**
     * @cfg defaults
     * @inheritdoc
     */
    defaults: {
        flex: '1 1 auto'
    },

    /**
     * @cfg autoSize
     * @inheritdoc
     */
    autoSize: null,

    /**
     * @cfg layout
     * @inheritdoc
     */
    layout: {
        type: 'box',
        vertical: false,
        align: 'stretch'
    },

    /**
     * @property defaultBindProperty
     * @inheritdoc
     */
    defaultBindProperty: 'value',

    /**
     * @cfg twoWayBindable
     * @inheritdoc
     */
    twoWayBindable: 'value',

    /**
     * @cfg publishes
     * @inheritdoc
     */
    publishes: 'value',

    /**
     * @event toggle
     * Fires when any child button's pressed state has changed.
     * @param {Ext.SegmentedButton} this
     * @param {Ext.Button} button The toggled button.
     * @param {Boolean} isPressed Boolean to indicate if the button was pressed or not.
     */

    /**
     * @event change
     * Fires when the value changes.
     * @param {Ext.SegmentedButton} this
     * @param {Object/Object[]} value The new value. Will be an array with {@link #allowMultiple},
     * a single value if not.
     * @param {Object/Object[]} oldValue The old value. Will be an array with
     * {@link #allowMultiple}, a single value if not.
     */

    constructor: function(config) {
        this.valueMap = {};
        this.callParent([config]);
    },

    initialize: function() {
        var me = this;

        me.callParent();

        me.onAfter({
            delegate: '> button',
            scope: me,
            hide: 'onButtonHiddenChange',
            show: 'onButtonHiddenChange'
        });
    },

    applyPressedButtons: function(pressedButtons) {
        var buttons = pressedButtons,
            len, i, button;

        pressedButtons = [];

        if (buttons) {
            buttons = Ext.Array.from(buttons);
            len = buttons && buttons.length;

            for (i = 0; i < len; ++i) {
                button = this.getComponent(buttons[i]);

                if (button) {
                    pressedButtons.push(button);
                }
            }
        }

        return pressedButtons;
    },

    updatePressedButtons: function(pressedButtons) {
        this.setValue(pressedButtons);
    },

    getPressedButtons: function() {
        var items = this.getItems().items,
            len = items.length,
            ret = [],
            i, button;

        for (i = 0; i < len; ++i) {
            button = items[i];

            if (button.getPressed()) {
                ret.push(button);
            }
        }

        return ret;
    },

    applyValue: function(value, oldValue) {
        var me = this,
            buttons = me.getItems(),
            allowMultiple = me.getAllowMultiple(),
            values, i, length, button, buttonValue;

        if (me.isConfiguring) {
            // if no value, look if any buttons are configured as pressed
            if (value == null) {
                values = [];
                length = buttons.length;

                for (i = 0; i < length; i++) {
                    button = buttons.getAt(i);

                    if (button.isPressed()) {
                        buttonValue = me.getButtonValue(button);

                        if (!Ext.Array.contains(values, buttonValue)) {
                            values.push(buttonValue);
                        }
                    }
                }

                value = values;
            }
            else {
                value = Ext.Array.from(value);

                //<debug>
                values = value;
                length = values.length;

                for (i = 0; i < length; i++) {
                    button = me.lookupButtonByValue(values[i]);

                    if (!button) {
                        Ext.raise(
                            'Invalid value "' + value + '" for segmented button: "' + me.id + '"');
                    }
                }
                //</debug>
            }
        }
        else {
            value = Ext.Array.from(value);

            //<debug>
            values = value;
            length = values.length;

            for (i = 0; i < length; i++) {
                button = me.lookupButtonByValue(values[i]);

                if (!button) {
                    Ext.raise(
                        'Invalid value "' + value + '" for segmented button: "' + me.id + '"');
                }
            }
            //</debug>
        }

        //<debug>
        if (value.length > 1 && !allowMultiple) {
            Ext.raise('Cannot set multiple values when allowMultiple is false');
        }
        //</debug>

        value = allowMultiple ? me.sortValues(value) : value[0];

        if ((allowMultiple ? !value.length : value == null) && me.getForceSelection()) {
            value = me.getButtonValue(buttons.getAt(0));

            if (allowMultiple) {
                value = [value];
            }
        }

        return Ext.isDefined(value) ? value : null;
    },

    updateValue: function(value, oldValue) {
        var me = this,
            changed = [],
            newValues = Ext.Array.from(value),
            oldValues = Ext.Array.from(oldValue),
            button, i, length;

        me.settingValue = true;

        if (oldValues.length) {
            length = oldValues.length;

            for (i = 0; i < length; i++) {
                button = me.lookupButtonByValue(oldValues[i]);

                // unpress this button if it's not in the new value
                if (!Ext.Array.contains(newValues, oldValues[i])) {
                    button.setPressed(false);

                    changed.push(button);
                }
            }
        }

        if (newValues.length) {
            length = newValues.length;

            for (i = 0; i < length; i++) {
                button = me.lookupButtonByValue(newValues[i]);

                // detect if this button was already pressed
                if (!Ext.Array.contains(oldValues, newValues[i])) {
                    button.setPressed(true);

                    changed.push(button);
                }
            }
        }

        // we shouldn't fire any events on initial instantiation
        if (!me.isConfiguring) {
            if (me.hasListeners.toggle) {
                length = changed.length;

                me.sortToggleItems(changed);

                for (i = 0; i < length; i++) {
                    button = changed[i];

                    me.fireEvent('toggle', me, button, button.getPressed());
                }
            }

            if (me.hasListeners.change) {
                changed = me.getAllowMultiple()
                    ? !Ext.Array.equals(value, oldValue)
                    : value !== oldValue;

                if (changed) {
                    me.fireEvent('change', me, value, oldValue);
                }
            }
        }

        me.settingValue = false;
    },

    updateAllowMultiple: function(allowMultiple) {
        if (!this.initialized && !this.getInitialConfig()
            .hasOwnProperty('allowDepress') && allowMultiple) {
            this.setAllowDepress(true);
        }
    },

    updateVertical: function(vertical) {
        var me = this,
            vCls = Ext.baseCSSPrefix + 'vertical',
            hCls = Ext.baseCSSPrefix + 'horizontal';

        me.replaceCls(vertical ? hCls : vCls, vertical ? vCls : hCls);
        me.getLayout().setVertical(vertical);
    },

    onItemAdd: function(item, index) {
        var me = this,
            defaultUI = me.getDefaultUI(),
            value = item.getValue();

        // Force allowDepress to be configured if needed
        me.getAllowMultiple();

        if (defaultUI && (item.getUi() == null)) {
            item.setUi(defaultUI);
        }

        if (value !== null) {
            me.valueMap[value] = item;
            me.useValueMap = true;
        }

        item.$segmentedListeners = item.on({
            scope: me,
            beforepressedchange: 'onBeforePressedChange',
            pressedchange: 'onPressedChange',
            order: 'before',
            destroyable: true
        });

        me.callParent([item, index]);
        me.updateFirstAndLastCls(me.getItems());
        item.$enableToggle = item.getEnableToggle();
        item.$allowDepress = item.getAllowDepress();
        item.setEnableToggle(me.getAllowToggle());
        item.setAllowDepress(me.getAllowDepress());
    },

    onItemRemove: function(item, index, destroying) {
        var me = this,
            value = item.getValue(),
            useValueMap = me.useValueMap,
            listeners = item.$segmentedListeners,
            current, newValue, i;

        me.callParent([item, index, destroying]);

        if (!me.destroying) {
            if (listeners) {
                listeners.destroy();
            }

            me.updateFirstAndLastCls(this.getItems());

            if (useValueMap) {
                delete me.valueMap[value];
            }
            else {
                value = index;
            }

            // If the item is currently pressed, we need to remove
            // it from the value collection
            if (item.getPressed()) {
                current = me.getValue();

                if (me.getAllowMultiple()) {
                    index = current.indexOf(value);
                    newValue = current.slice();
                    // If we're index mapping, get any value after the
                    // removing, since the index will shift down by 1. Note
                    // that the value is always kept in order of index.

                    if (!useValueMap) {
                        for (i = newValue.length - 1; i > index; --i) {
                            --newValue[i];
                        }
                    }

                    newValue.splice(index, 1);
                }
                else {
                    newValue = null;
                }

                me.setValue(newValue);
            }

            item.setEnableToggle(item.$enableToggle);
            item.setAllowDepress(item.$allowDepress);
        }

        item.$segmentedListeners = null;
    },

    /**
     * Returns `true` if a specified {@link Ext.Button} is pressed.
     * @param {Ext.Button} button The button to check if pressed.
     * @return {Boolean} pressed
     */
    isPressed: function(button) {
        return button.getPressed();
    },

    /**
     * @private
     */
    updateDisabled: function(disabled, oldDisabled) {
        var me = this;

        me.items.each(function(item) {
            item.setDisabled(disabled);
        }, me);

        me.callParent([disabled, oldDisabled]);
    },

    updateDefaultUI: function(defaultUI) {
        var items = this.items && this.items.items,
            len = items.length,
            i, item;

        for (i = 0; i < len; i++) {
            item = items[i];

            if (item.getUi() == null) {
                item.setUi(defaultUI);
            }
        }

    },

    doDestroy: function() {
        this.valueMap = null;
        this.callParent();
    },

    privates: {
        getAllPressed: function(items) {
            var map = {},
                pressingItem = this.pressingItem,
                len, i, button, pressed;

            items = items.items;
            len = items.length;

            for (i = 0; i < len; ++i) {
                button = items[i];

                // If we're currently pressing the item, the state will already
                // be set, but for the purpose of setting the value we want to
                // treat it as though it's in the old state
                if (button === pressingItem) {
                    pressed = !button.getPressed();
                }
                else {
                    pressed = button.getPressed();
                }

                if (pressed) {
                    map[button.id] = button;
                }
            }

            return map;
        },

        /**
         * Looks up a child button by its value
         * @private
         * @param {String/Number} value The button's value or index
         * @return {Ext.button.Button}
         */
        lookupButtonByValue: function(value) {
            return this.useValueMap ? this.valueMap[value] : this.getItems().getAt(value);
        },

        /**
         * Gets a button's value. If the button doesn't have a value,
         * the value will be the button's index.
         * @param {Ext.Button} button
         * @return {String/Number} value The button's value or index.
         *
         * @since 6.5.0
         */
        getButtonValue: function(button) {
            var value;

            if (this.useValueMap) {
                value = button.getValue();
            }

            if (value == null) {
                value = this.getItems().indexOf(button);
            }

            return value;
        },

        onBeforePressedChange: function(button, pressed) {
            // If we allow multiple selections, and we are forcing a selection, and we are
            // unpressing and we only have one value, then veto this. we are not allowing the
            // selection length to fall to zero.
            var value = this.getValue(),
                ret;

            if (this.getForceSelection() && !pressed) {
                if (this.getAllowMultiple()) {
                    ret = value.length === 1;
                }
                else if (value === this.getButtonValue(button)) {
                    ret = false;
                }
            }

            return ret;
        },

        onPressedChange: function(button, pressed) {
            var me, Array, allowMultiple, buttonValue, value, valueIndex;

            if (this.settingValue) {
                return;
            }

            me = this;
            Array = Ext.Array;
            allowMultiple = me.getAllowMultiple();
            buttonValue = me.getButtonValue(button);
            value = me.getValue();

            if (allowMultiple) {
                valueIndex = Array.indexOf(value, buttonValue);
            }

            if (pressed) {
                if (allowMultiple) {
                    if (valueIndex === -1) {
                        // We must not mutate our value property here
                        value = Array.slice(value);
                        value.push(buttonValue);
                    }
                }
                else {
                    value = buttonValue;
                }
            }
            else {
                if (allowMultiple) {
                    if (valueIndex > -1) {
                        // We must not mutate our value property here
                        value = Array.slice(value);
                        value.splice(valueIndex, 1);
                    }
                }
                else if (value === buttonValue) {
                    value = null;
                }
            }

            me.pressingItem = button;
            me.setValue(value);
            me.pressingItem = null;
        },

        /**
         * @private
         */
        onButtonHiddenChange: function() {
            this.updateFirstAndLastCls(this.getItems());
        },

        sortToggleItems: function(buttons) {
            var items = this.getItems();

            Ext.Array.sort(buttons, function(a, b) {
                var p1 = a.getPressed() ? 1 : 0,
                    p2 = b.getPressed() ? 1 : 0,
                    ret = p1 - p2;

                if (ret === 0) {
                    ret = items.indexOf(a) - items.indexOf(b);
                }

                return ret;
            });
        },

        sortValues: function(values) {
            var fn = Ext.Array.numericSortFn,
                map = this.valueMap,
                items = this.getItems();

            values = Ext.Array.clone(values);

            if (this.useValueMap) {
                fn = function(a, b) {
                    a = items.indexOf(map[a]);
                    b = items.indexOf(map[b]);

                    return a - b;
                };
            }

            Ext.Array.sort(values, fn);

            return values;
        },

        /**
         * @private
         */
        updateFirstAndLastCls: function(items) {
            var ln = items.length,
                basePrefix = Ext.baseCSSPrefix,
                firstCls = basePrefix + 'first',
                lastCls = basePrefix + 'last',
                item, i;

            // remove all existing classes
            for (i = 0; i < ln; i++) {
                item = items.items[i];
                item.removeCls(firstCls);
                item.removeCls(lastCls);
            }

            // add a first cls to the first non-hidden button
            for (i = 0; i < ln; i++) {
                item = items.items[i];

                if (!item.isHidden()) {
                    item.addCls(firstCls);
                    break;
                }
            }

            // add a last cls to the last non-hidden button
            for (i = ln - 1; i >= 0; i--) {
                item = items.items[i];

                if (!item.isHidden()) {
                    item.addCls(lastCls);
                    break;
                }
            }
        }
    }
});
