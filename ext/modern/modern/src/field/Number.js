/**
 * The Number field creates an HTML5 text input that allows the editing of number values,
 * and is usually created inside a form. Most browsers will show a specialized virtual keyboard
 * for entering numbers. The Number field only accepts numerical input.  If you want a Number field
 * with up/down spinners, see {@link Ext.field.Spinner}.
 * ```javascript
 *  @example({ framework: 'extjs' })
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'How old are you?',
 *                 items: [
 *                     {
 *                         xtype: 'numberfield',
 *                         label: 'Age',
 *                         minValue: 18,
 *                         maxValue: 150,
 *                         name: 'age'
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtContainer, ExtNumberField, ExtFormPanel } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *     render() {
 *        return (
 *             <ExtContainer layout="center">
 *                 <ExtFormPanel shadow>
 *                     <ExtNumberField
 *                         label="Number"
 *                         width="150"
 *                     />
 *                 </ExtFormPanel>
 *             </ExtContainer>
 *         )
 *     }
 * }
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 * import { Component } from '@angular/core'
 * declare var Ext: any;
 * @Component({
 *  selector: 'app-root-1',
 *  styles: [``],
 *  template: `
 *      <ExtContainer layout="center">
 *          <ExtFormPanel shadow="true">
 *              <ExtNumberField
 *                  label="Number"
 *                  width="150"
 *              >
 *              </ExtNumberField>
 *          </ExtFormPanel>
 *      </ExtContainer>
 *     `
 * })
 * export class AppComponent {}
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container layout="center">
 *    <ext-formpanel shadow="true">
 *        <ext-numberfield
 *             label="Number"
 *             width="150"
 *         >
 *        </ext-numberfield>
 *    </ext-formpanel>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-formpanel.component';
 * import '@sencha/ext-web-components/dist/ext-numberfield.component';
 *
 * export default class NumberFieldComponent {}
 * ```
 *
 * Or on its own, outside of a form:
 *
 *     Ext.create('Ext.field.Number', {
 *         label: 'Age',
 *         value: '26'
 *     });
 *
 * ## minValue, maxValue
 *
 * The {@link #minValue} and {@link #maxValue} configurations are self-explanatory and
 * simply constrain the value
 * For example, to create a salary field that limits entry to between 25,000 and 50,000
 * we can do this:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'Are you rich yet?',
 *                 items: [
 *                     {
 *                         xtype: 'numberfield',
 *                         label: 'Salary',
 *                         value: 30000,
 *                         minValue: 25000,
 *                         maxValue: 50000
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * This creates a field that starts with a value of $30,000 and will not go beneath $25,000
 * or above $50,000.
 *
 * Because number field inherits from {@link Ext.field.Text textfield} it gains all of the
 * functionality that text fields provide, including getting and setting the value at runtime,
 * validations and various events that are fired as the user interacts with the component.
 * Check out the {@link Ext.field.Text} docs to see the additional functionality available.
 */
Ext.define('Ext.field.Number', {
    extend: 'Ext.field.Text',
    xtype: 'numberfield',
    alternateClassName: 'Ext.form.Number',

    requires: [
        'Ext.data.validator.Number'
    ],

    config: {
        /**
         * @cfg {Number} minValue
         * The minimum value that this Number field can accept. Defaults to no minimum.
         */
        minValue: null,

        /**
         * @cfg {Number} maxValue
         * The maximum value that this Number field can accept. Defaults to no maximum.
         */
        maxValue: null,

        /**
         * @cfg {Number} decimals
         * The maximum precision to display after the decimal separator.
         */
        decimals: 2,

        /**
         * @cfg {Boolean} trim
         * `false` to always show zeros when formatting the number
         */
        trim: true,

        /**
         * @cfg {String} decimalSeparator
         * Character(s) to allow as the decimal separator.
         * Defaults to {@link Ext.util.Format#decimalSeparator decimalSeparator}.
		 * @since 7.0
         */
        decimalSeparator: null
    },

    /**
     * @cfg {String} inputType
     * For desktop environments, an input of `type=text` is used and a rich user experience
     * is provided for numeric entry. For mobile environments, an input of `type=number` is
     * used and basic validation is performed on keystroke and `minValue` and `maxValue`
     * clamping is only done on blur or `setValue` if the field is not focused.
     *
     * If you specify `inputType` of `'text'`, the text input will be used on all devices
     * at the expense of numeric input keyboard on non-iOS devices. Alternatively, you may
     * specify an `inputType` of `'tel'` which will bring up the phone number input
     * keyboard, which isn't as ideal as the numeric keyboard.
     */
    inputType: Ext.os.is.Desktop ? 'text' : 'number',

    /**
     * @cfg {String} minValueText
     * The error message that will be displayed if the field's value is less than minValue
     * @Locale
     * @since 6.5.1
     */
    minValueText: 'The minimum value for this field is {0}',

    /**
     * @cfg {String} maxValueText
     * The error message that will be displayed if the field's value is greater than maxValue.
     * @Locale
     * @since 6.5.1
     */
    maxValueText: 'The maximum value for this field is {0}',

    /**
     * @cfg {String} decimalsText
     * The error message that will be displayed if the field's value has incorrect number of
     * decimal places.
     * @Locale
     * @since 6.5.1
     */
    decimalsText: 'The maximum decimal places is {0}',

    badFormatMessage: 'Value is not a valid number',

    classCls: Ext.baseCSSPrefix + 'numberfield',

    parseValidator: 'number',

    initialize: function() {
        var me = this;

        // Force numberFormat creation
        me.getDecimals();

        if (me.getDecimalSeparator() === null) {
            me.setDecimalSeparator(Ext.util.Format.decimalSeparator);
        }

        me.callParent();

        // This isn't supported in browsers yet, but is part of the spec.
        me.inputElement.dom.setAttribute('inputmode', 'numeric');

        //<debug>
        // Check after configuration to catch subclasses with config in prototype
        // We cannot uses masks. The parsing would not be able to deal with
        // fixed characters such as commas.
        if (me.getInputMask()) {
            Ext.raise('NumberFields cannot use input masks');
        }
        //</debug>
    },

    updateDecimals: function(decimals) {
        var me = this,
            format = '0',
            zeroChar = me.getTrim() ? '#' : '0',
            value;

        // logic to allow decimals or no
        me.syncDecimalValidator();

        if (decimals) {
            format += '.' + Ext.String.repeat(zeroChar, decimals);
        }

        me.numberFormat = format;

        if (!me.isConfiguring) {
            value = me.getValue();

            if (Ext.isDate(value)) {
                me.setInputValue(value);
            }
        }
    },

    applyInputValue: function(value) {
        var me = this,
            decimalSeparator = me.getDecimalSeparator();

        // Force numberFormat creation
        this.getDecimals();

        if (typeof value === 'number') {
            value = Ext.util.Format.number(value, this.numberFormat);
        }

        if (value && Ext.isString(value) && decimalSeparator) {
            value = value.replace(Ext.util.Format.decimalSeparator, decimalSeparator);
        }

        return value;
    },

    doValidate: function(value, errors, skipLazy) {
        var me = this,
            String = Ext.String,
            minValue = me.getMinValue(),
            maxValue = me.getMaxValue();

        me.callParent([ value, errors, skipLazy ]);

        if (minValue != null && value < minValue) {
            errors.push(String.format(me.minValueText, minValue));
        }
        else if (maxValue != null && value > maxValue) {
            errors.push(String.format(me.maxValueText, maxValue));
        }
    },

    onKeyDown: function(e) {
        var me = this,
            raw;

        // Prevalidate the result of the keystroke unless we are using DOM inputType of number.
        if (me.getInputType() !== 'number') {
            if (!e.ctrlKey && !e.altKey) {
                raw = me.calculateNewValue(e.key());

                // If the resulting raw value would be invalid, veto the event
                if (!me.specialKeys[e.getCharCode()] && !me.isAllowableValue(raw)) {
                    e.preventDefault();

                    return false;
                }
            }
        }

        me.callParent([e]);
    },

    transformValue: function(value) {
        if (!(value || value === 0)) {
            value = null;
        }

        return value;
    },

    rawToValue: Ext.emptyFn,

    updateDecimalSeparator: function() {
        this.syncDecimalValidator();
    },

    privates: {
        calculateNewValue: function(text) {
            var me = this,
                textSelection = me.getTextSelection(),
                raw = me.getInputValue();

            // Characters are selected, replace them.
            if (textSelection[1]) {
                raw = raw.substr(0, textSelection[0]) + text + raw.substr(textSelection[1]);
            }
            // No characters are selected, just insert at caret.
            else {
                raw = Ext.String.insert(raw, text, me.getCaretPos());
            }

            return raw;
        },

        handlePaste: function(e) {
            var me = this,
                text;

            if (me.getInputType() !== 'number') {
                text = e.getClipboardData('text/plain');

                if (text) {
                    text = me.calculateNewValue(text);

                    if (me.isAllowableValue(text)) {
                        me.setValue(text);
                    }

                    e.preventDefault();

                    return false;
                }
            }

            me.callParent([e]);

            me.validate();
        },

        isAllowableValue: function(value) {
            var minValue = this.getMinValue(),
                allowNegative = minValue == null || minValue < 0;

            if (!allowNegative && Ext.String.startsWith(value, '-')) {
                return false;
            }

            return this.isPartialValue(value) || this.parseValue(value) !== null;
        },

        isPartialValue: function(value) {
            var me = this,
                minValue = me.getMinValue(),
                allowNegative = minValue == null || minValue < 0;

            // '-' should not tickle the validation process if -ve is allowed.
            // '.' should not tickle the validation process if decimals are allowed.
            // '-.' likewise if both are allowed.
            // We do not want the validation to kick in and rewrite the calculated
            // value back into the field if the user is typing "-.5" which entails
            // going through invalid states.
            if (allowNegative && value === '-') {
                return true;
            }

            if (me.getDecimals() && (value === '.' || (allowNegative && value === '-.'))) {
                return true;
            }

            return false;
        },

        /**
         * Validate field against decimals and decimalSeparator
         * If decimals is 0, don't allow decimals else use decimalSeparator
         */
        syncDecimalValidator: function() {
            var me = this,
                separator = (me.getDecimals() === 0) ? null : me.getDecimalSeparator();

            me.setParseValidator(
                Ext.create('Ext.data.validator.Number', {
                    decimalSeparator: separator
                })
            );

            me.validate();
        }
    }
}, function(C) {
    var E = Ext.event.Event;

    C.prototype.specialKeys = Ext.Array.toMap([
        E.BACKSPACE,
        E.TAB,
        E.RETURN,
        E.CTRL,
        E.DELETE,
        E.LEFT,
        E.RIGHT,
        E.UP,
        E.DOWN,
        E.HOME,
        E.END,
        E.META
    ]);
});
