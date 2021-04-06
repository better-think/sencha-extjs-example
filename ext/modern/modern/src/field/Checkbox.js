/**
 * The checkbox field is an enhanced version of the native browser checkbox and is
 * great for enabling your user to choose one or more items from a set (for example
 * choosing toppings for a pizza order). It works like any other
 * {@link Ext.field.Field field} and is usually found in the context of a form:
 *
 * ## Example
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * var form = Ext.create('Ext.form.Panel', {
 *     fullscreen: true,
 *     items: [
 *         {
 *             xtype: 'checkboxfield',
 *             name : 'tomato',
 *             label: 'Tomato',
 *             value: 'tomato',
 *             checked: true
 *         },
 *         {
 *             xtype: 'checkboxfield',
 *             name : 'salami',
 *             label: 'Salami'
 *         },
 *         {
 *             xtype: 'toolbar',
 *             docked: 'bottom',
 *             items: [
 *                 { xtype: 'spacer' },
 *                 {
 *                     text: 'getValues',
 *                     handler: function() {
 *                         var form = Ext.ComponentQuery.query('formpanel')[0],
 *                             values = form.getValues();
 *
 *                         Ext.Msg.alert(null,
 *                             "Tomato: " + ((values.tomato) ? "yes" : "no") +
 *                             "<br />Salami: " + ((values.salami) ? "yes" : "no")
 *                         );
 *                     }
 *                 },
 *                 { xtype: 'spacer' }
 *             ]
 *         }
 *     ]
 * });
 *
 *
 * The form above contains two check boxes - one for Tomato, one for Salami. We configured the
 * Tomato checkbox to be checked immediately on load, and the Salami checkbox to be unchecked.
 * We also specified an optional text {@link #value} that will be sent when we submit the form.
 * We can get this value using the Form's {@link Ext.form.Panel#getValues getValues} function,
 * or have it sent as part of the data that is sent when the form is submitted:
 *
 *     form.getValues(); //contains a key called 'tomato' if the Tomato field is still checked
 *     form.submit(); //will send 'tomato' in the form submission data
 *
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtFormPanel, ExtContainer, ExtCheckBoxField } from '@sencha/ext-react';
 * export default class MyExample extends Component {
 *     render() {
 *         return (
 *            <ExtContainer layout="center">
 *                <ExtFormPanel shadow layout={{type: 'vbox', align: 'left'}}>
 *                    <ExtCheckBoxField boxLabel="Unchecked"/>
 *                    <ExtCheckBoxField boxLabel="Checked" checked/>
 *                    <ExtCheckBoxField boxLabel="Disabled" disabled/>
 *                    <ExtCheckBoxField boxLabel="Disabled (checked)" disabled checked/>
 *                </ExtFormPanel>
 *            </ExtContainer>
 *         )
 *     }
 * }
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 * import { Component } from '@angular/core'
 * declare var Ext: any;
 * @Component({
 *    selector: 'app-root-1',
 *    styles: [``],
 *    template: `
 *            <ExtContainer [shadow]="true" [layout]='"center"'>
 *                <ExtFormPanel [shadow] [layout]="{type: 'vbox', align: 'left'}">
 *                    <ExtCheckBoxField [boxLabel]='"Unchecked"'>
 *                    </ExtCheckBoxField>
 *                    <ExtCheckBoxField [boxLabel]='"Checked"' [checked]="true">
 *                    </ExtCheckBoxField>
 *                    <ExtCheckBoxField [boxLabel]='"Disabled"' [disabled]="true">
 *                    </ExtCheckBoxField>
 *                    <ExtCheckBoxField [boxLabel]='"Disabled (checked)"'
 *                       [disabled]="true" [checked]="true">
 *                    </ExtCheckBoxField>
 *                </ExtFormPanel>
 *            </ExtContainer>
 *    `
 * })
 * export class AppComponent {}
 * ```
 * ```html
 *  @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 *  <ext-container layout="center">
 *    <ext-formpanel
 *        shadow="true"
 *        layout='{"type": "vbox", "align": "left"}'
 *     >
 *        <ext-checkboxfield boxLabel="Unchecked"></ext-checkboxfield>
 *        <ext-checkboxfield boxLabel="Checked" checked></ext-checkboxfield>
 *        <ext-checkboxfield boxLabel="Disabled" disabled></ext-checkboxfield>
 *        <ext-checkboxfield boxLabel="Disabled (checked)" disabled checked></ext-checkboxfield>
 *    </ext-formpanel>
 *  </ext-container>
 *```
 *```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 *import '@sencha/ext-web-components/dist/ext-container.component';
 *import '@sencha/ext-web-components/dist/ext-formpanel.component';
 *import '@sencha/ext-web-components/dist/ext-checkboxfield.component';
 *
 *export default class CheckBoxFieldComponent {}
 *```
 */
Ext.define('Ext.field.Checkbox', {
    extend: 'Ext.field.Input',
    alternateClassName: 'Ext.form.Checkbox',
    xtype: [
        'checkbox',
        'checkboxfield'
    ],

    mixins: ['Ext.field.BoxLabelable'],

    qsaLeftRe: /[[]/g,
    qsaRightRe: /[\]]/g,

    /**
     * @cfg shareableName
     * @inheritdoc
     */
    shareableName: true,
    isCheckbox: true,

    /**
     * @property defaultBindProperty
     * @inheritdoc
     */
    defaultBindProperty: 'checked',

    /**
     * @cfg twoWayBindable
     * @inheritdoc
     */
    twoWayBindable: {
        checked: 1
    },

    /**
     * @cfg publishes
     * @inheritdoc
     */
    publishes: {
        checked: 1
    },

    /**
     * @event change
     * Fires when the field value changes.
     * @param {Ext.field.Checkbox} this This field.
     * @param {Boolean} newValue The new value.
     * @param {Boolean} oldValue The original value.
     */

    /**
     * @event check
     * Fires when the checkbox is checked.
     * @param {Ext.field.Checkbox} this This checkbox.
     */

    /**
     * @event uncheck
     * Fires when the checkbox is unchecked.
     * @param {Ext.field.Checkbox} this This checkbox.
     */

    config: {
        /**
         * @cfg {String} value
         * The string value to submit if the item is in a checked state.
         * @accessor
         */
        value: '',

        /**
         * @cfg {Boolean} checked
         * `true` if the checkbox should render initially checked.
         * @accessor
         */
        checked: false

        /**
         * @cfg {Boolean} labelMaskTap
         * @private
         */
    },

    inputType: 'checkbox',

    /**
     * @property classCls
     * @inheritdoc
     */
    classCls: Ext.baseCSSPrefix + 'checkboxfield',
    checkedCls: Ext.baseCSSPrefix + 'checked',

    getBodyTemplate: function() {
        return this.mixins.boxLabelable.getBodyTemplate.call(this);
    },

    /**
     * @private
     */
    getBoxTemplate: function() {
        return [{
            reference: 'iconElement',
            cls: Ext.baseCSSPrefix + 'font-icon ' + Ext.baseCSSPrefix + 'icon-el',
            children: [this.getInputTemplate()]
        }];
    },

    getInputTemplate: function() {
        var template = this.callParent();

        template.listeners = template.listeners || {};
        template.listeners.change = {
            fn: 'onChange',
            delegated: false
        };

        return template;
    },

    /**
     * Returns the submit value for the checkbox which can be used when submitting forms.
     * @return {Boolean/String} value The value of {@link #value} or `true`, if {@link #checked}.
     */
    getSubmitValue: function() {
        return this.getChecked() ? Ext.isEmpty(this._value) ? true : this._value : null;
    },

    serialize: function() {
        return this.getSubmitValue();
    },

    /**
     * @private
     */
    checkedRe: /^(true|1|on)/i,

    /**
     * Returns the `checked` value of this field
     * @return {Mixed} value The field value
     */
    getChecked: function() {
        return !!this.inputElement.dom.checked;
    },

    applyChecked: function(checked) {
        if (this.isConfiguring) {
            this.originalState = checked;
        }

        return !!this.checkedRe.test(String(checked));
    },

    updateChecked: function(checked, oldChecked) {
        var me = this,
            eventName;

        if (!me.$onChange) {
            me.inputElement.dom.checked = checked;
        }

        me.toggleCls(me.checkedCls, checked);

        // only call onChange (which fires events) if the component has been initialized
        if (me.initialized) {
            eventName = checked ? 'check' : 'uncheck';
            me.fireEvent(eventName, me);
            me.fireEvent('change', me, checked, oldChecked);
        }

        me.setDirty(me.isDirty());
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} `true` if checked, `false` otherwise.
     */
    isChecked: function() {
        return this.getChecked();
    },

    isDirty: function() {
        return this.getChecked() !== this.originalState;
    },

    /**
     * Set the checked state of the checkbox to `true`.
     * @return {Ext.field.Checkbox} This checkbox.
     */
    check: function() {
        return this.setChecked(true);
    },

    /**
     * Set the checked state of the checkbox to `false`.
     * @return {Ext.field.Checkbox} This checkbox.
     */
    uncheck: function() {
        return this.setChecked(false);
    },

    onChange: function(e) {
        var me = this;

        me.$onChange = true;
        me.setChecked(!!e.target.checked);
        delete me.$onChange;
    },

    /**
     * return all fields with same name in nameHolder
     */
    getSameGroupFields: function() {
        var me = this,
            component = me.lookupNameHolder(),
            name = me.name;

        if (!component) {
            //<debug>
            Ext.Logger.warn(me.self.$className +
                ' components must always be descendants of an Ext.field.Panel.'
            );
            //</debug>

            // This is to handle ComponentQuery's lack of handling [name=foo[bar]] properly
            name = name.replace(me.qsaLeftRe, '\\[').replace(me.qsaRightRe, '\\]');

            return Ext.Viewport.query('checkboxfield[name=' + name + ']');
        }

        return component.lookupName(name);
    },

    /**
     * Returns an array of values from the checkboxes in the group that are checked.
     * @return {Array}
     */
    getGroupValues: function() {
        var values = [];

        this.getSameGroupFields().forEach(function(field) {
            if (field.getChecked()) {
                values.push(field.getValue());
            }
        });

        return values;
    },

    /**
     * Set the status of all matched checkboxes in the same group to checked.
     * @param {Array} values An array of values.
     * @return {Ext.field.Checkbox} This checkbox.
     */
    setGroupValues: function(values) {
        this.getSameGroupFields().forEach(function(field) {
            field.setChecked(values.indexOf(field.getValue()) !== -1);
        });

        return this;
    },

    /**
     * Resets the status of all matched checkboxes in the same group to checked.
     * @return {Ext.field.Checkbox} This checkbox.
     */
    resetGroupValues: function() {
        this.getSameGroupFields().forEach(function(field) {
            field.setChecked(field.originalState);
        });

        return this;
    },

    reset: function() {
        this.setChecked(this.originalState);

        return this;
    },

    resetOriginalValue: function() {
        this.originalState = this.getChecked();

        this.setDirty(false);
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else false
     * @since 7.0
     */
    getRawValue: function() {
        return this.getChecked();
    },

    rawToValue: Ext.emptyFn
});
