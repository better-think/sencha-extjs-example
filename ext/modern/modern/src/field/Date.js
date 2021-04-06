/**
 * This is a specialized field which shows a {@link Ext.picker.Date} when tapped.
 * If it has a predefined value, or a value is selected in the {@link Ext.picker.Date},
 * it will be displayed like a normal {@link Ext.field.Text} (but not selectable/changable).
 *
 *     Ext.create('Ext.field.Date', {
 *         label: 'Birthday',
 *         value: new Date()
 *     });
 *
 * {@link Ext.field.Date} fields are very simple to implement, and have no required configurations.
 *
 * ## Examples
 *
 * It can be very useful to set a default {@link #value} configuration on
 * {@link Ext.field.Date} fields. In this example, we set the {@link #value} to be
 * the current date.  You can also use the {@link #setValue} method to update the value at any time.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *     var form = Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         referenceHolder: true,
 *         items: [{
 *             xtype: 'fieldset',
 *             items: [{
 *                 xtype: 'datefield',
 *                 label: 'Birthday',
 *                 reference: 'birthday',
 *                 value: new Date()
 *             }]
 *         }, {
 *             xtype: 'toolbar',
 *             docked: 'bottom',
 *             items: [{
 *                 text: 'setValue',
 *                 handler: function() {
 *                     var field = form.lookup('birthday'),
 *                         y = Ext.Number.randomInt(1980, 2011),
 *                         m = Ext.Number.randomInt(0, 11),
 *                         d = Ext.Number.randomInt(1, 28);
 *
 *                     field.setValue(new Date(y, m, d));
 *                 }
 *             }]
 *         }]
 *     });
 * ```
 * When you need to retrieve the date from the {@link Ext.field.Date}, you can either use
 * the {@link #getValue} or {@link #getFormattedValue} methods:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * var form = Ext.create('Ext.form.Panel', {
 *     fullscreen: true,
 *     referenceHolder: true,
 *     items: [{
 *         xtype: 'fieldset',
 *         items: [{
 *             xtype: 'datefield',
 *             label: 'Birthday',
 *             reference: 'birthday',
 *             value: new Date()
 *         }]
 *     }, {
 *         xtype: 'toolbar',
 *         docked: 'bottom',
 *         items: [{
 *             text: 'getValue',
 *             handler: function() {
 *                 var field = form.lookup('birthday');
 *                 console.log(field.getValue());
 *             }
 *         }, {
 *             text: 'getFormattedValue',
 *             handler: function() {
 *                 var field = form.lookup('birthday');
 *                 console.log(field.getFormattedValue());
 *             }
 *         }]
 *     }]
 * });
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtContainer, ExtFormPanel, ExtDatePickerField } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *     render() {
 *         return (
 *             <ExtContainer layout="center">
 *                 <ExtFormPanel shadow>
 *                     <ExtDatePickerField
 *                         width={150}
 *                         value={new Date()}
 *                         destroyPickerOnHide
 *                         label="Date"
 *                         picker={{
 *                             yearFrom: 1990
 *                         }}
 *                     />
 *                 </ExtFormPanel>
 *             </ExtContainer>
 *         )
 *     }
 * }
 * ```
 * ```javascript
 *  @example({framework: 'ext-angular', packages:['ext-angular']})
 *  import { Component } from '@angular/core'
 * declare var Ext: any;
 *
 * @Component({
 *     selector: 'app-root-1',
 *     styles: [``],
 *     template: `
 *         <ExtContainer [layout]='"center"'>
 *             <ExtFormPanel [shadow]>
 *                 <ExtDatePickerField
 *                     [width]='150'
 *                     [value]='date'
 *                     [destroyPickerOnHide]
 *                     [label]='"Date"'
 *                     [picker]='{
 *                         yearFrom: 1990
 *                     }'
 *                 >
 *                 </ExtDatePickerField>
 *             </ExtFormPanel>
 *         </ExtContainer>
 *     `
 * })
 * export class AppComponent {
 *     date:Date = new Date();
 * }
 * ```
 * ```html
 *  @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 *  <ext-container layout="center">
 *    <ext-formpanel
 *      layout='{"type": "vbox", "align": "stretch"}'
 *      width="300"
 *      height="100"
 *      bodyPadding="10"
 *      shadow="true"
 *     >
 *      <ext-datepickerfield
 *        destroyPickerOnHide="true"
 *        label="Date"
 *        picker='{
 *          "yearFrom": "1990"
 *        }'
 *        onready="datepickerfield.datePickerFieldReady"
 *      >
 *      </ext-datepickerfield>
 *     </ext-formPanel>
 *  </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-datepickerfield.component';
 * import '@sencha/ext-web-components/dist/ext-formpanel.component';
 *
 * export default class DatePickerFieldComponent {
 *    datePickerFieldReady(event) {
 *        this.datepickerfieldView = event.detail.cmp;
 *        this.datepickerfieldView.setValue(new Date());
 *    }
 * }
 * window.datepickerfield = new DatePickerFieldComponent();
 *```
 */
Ext.define('Ext.field.Date', {
    extend: 'Ext.field.Picker',

    alternateClassName: [
        'Ext.form.DatePicker',
        'Ext.field.DatePicker'
    ],

    xtype: ['datefield', 'datepickerfield'],

    requires: [
        'Ext.data.validator.Date',
        'Ext.field.trigger.Date',
        'Ext.picker.Date',
        'Ext.panel.Date',
        'Ext.data.field.Date'
    ],

    /**
     * @event change
     * Fires when a date is selected
     * @param {Ext.field.Date} this
     * @param {Date} newDate The new date
     * @param {Date} oldDate The old date
     */

    config: {
        /**
         * @cfg {Object/Date} value
         * Default value for the field and the internal {@link Ext.picker.Date} component.
         * Accepts an object of 'year', 'month' and 'day' values, all of which should be
         * numbers, or a {@link Date}.
         *
         * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
         */

        /**
         * @cfg {Boolean} destroyPickerOnHide
         * Whether or not to destroy the picker widget on hide. This save memory if it's
         * not used frequently, but increase delay time on the next show due to
         * re-instantiation.
         */
        destroyPickerOnHide: false,

        dataType: {
            type: 'date'
        },

        /**
         * @cfg {String} [dateFormat=Ext.util.Format.defaultDateFormat] The format to be
         * used when displaying the date in this field. Accepts any valid date format. You
         * can view formats over in the {@link Ext.Date} documentation.
         */
        dateFormat: '',

        /**
         * @cfg {String|String[]} altFormats
         * Multiple date formats separated by "|" or an array of date formats
         * to try when parsing a user input value and it doesn't match the defined format.
         * @since 7.0
         */
        altFormats: 'm/d/Y|' +
                    'n/j/Y|' +
                    'n/j/y|' +
                    'm/j/y|' +
                    'n/d/y|' +
                    'm/j/Y|' +
                    'n/d/Y|' +
                    'm-d-y|' +
                    'm-d-Y|' +
                    'm/d|' +
                    'm-d|' +
                    'md|' +
                    'mdy|' +
                    'mdY|' +
                    'd|' +
                    'Y-m-d|' +
                    'n-j|' +
                    'n/j',

        /**
         * @cfg {Date/String} [minDate] The minimum allowed date value for this field.
         * String value should conform to {@link #cfg!dateFormat}.
         */
        minDate: null,

        /**
         * @cfg {Date/String} [maxDate] The maximum allowed date value for this field.
         * String value should conform to {@link #cfg!dateFormat}.
         */
        maxDate: null,

        triggers: {
            expand: {
                type: 'date'
            }
        }
    },

    classCls: Ext.baseCSSPrefix + 'datepickerfield',
    matchFieldWidth: false,
    isDateField: true,

    /**
     * @property {String}
     * The error message when the {@link #cfg!minDate} constraint has been violated.
     * @locale
     */
    minDateMessage: "The date in this field must be equal to or after {0}",

    /**
     * @property {String}
     * The error message when the {@link #cfg!maxDate} constraint has been violated.
     * @locale
     */
    maxDateMessage: "The date in this field must be equal to or before {0}",

    /**
     * In the absence of a time value, a default value of 12 noon will be used
     * note: 12 noon was chosen because it steers well clear of all DST timezone changes
     * @private
     */
    initTime: '12', // 24 hour format
    initTimeFormat: 'H',

    floatedPicker: {
        xtype: 'datepanel',
        autoConfirm: true,
        floated: true,
        listeners: {
            tabout: 'onTabOut',
            select: 'onPickerChange',
            scope: 'owner'
        },
        keyMap: {
            ESC: 'onTabOut',
            scope: 'owner'
        }
    },

    edgePicker: {
        xtype: 'datepicker',
        cover: true
    },

    parseValidator: 'date',

    applyValue: function(value, oldValue) {
        if (!(value || value === 0)) {
            value = null;
        }

        value = this.callParent([value, oldValue]);

        if (value) {
            if (this.isConfiguring) {
                this.originalValue = value;
            }

            // The same date value may not be the same reference, so compare them by time.
            // If we have dates for both, then compare the time. If they're the same we
            // don't need to do anything.
            if (
                Ext.isDate(value) &&
                Ext.isDate(oldValue) &&
                value.getTime() === oldValue.getTime()
            ) {
                return;
            }
        }

        return value;
    },

    updateValue: function(value, oldValue) {
        // Used picker directly instead of using getter as getter will create picker
        // if it does not exist.
        // We don't want to create the picker in value updater, this might lead to bugs as
        // well as performance challenges.
        var picker = this._picker;

        if (picker && picker.isPicker && Ext.isDate(value)) {
            this.updatePickerValue(picker, value);
        }

        this.callParent([value, oldValue]);
    },

    updatePickerValue: function(picker, value) {
        picker.setValue(value);
    },

    applyInputValue: function(value, oldValue) {
        if (Ext.isDate(value)) {
            value = Ext.Date.format(value, this.getDateFormat());
        }

        return this.callParent([value, oldValue]);
    },

    applyAltFormats: function(altFormats) {
        if (altFormats && !Ext.isArray(altFormats)) {
            altFormats = altFormats.split('|');
        }

        return altFormats;
    },

    applyDateFormat: function(dateFormat) {
        return dateFormat || Ext.util.Format.defaultDateFormat;
    },

    /**
     * Updates the date format in the field.
     * @private
     */
    updateDateFormat: function() {
        var me = this,
            value;

        if (!me.isConfiguring && !me.hasFocus) {
            value = me.getValue();

            if (Ext.isDate(value)) {
                me.setInputValue(value);
            }
        }
    },

    applyMinDate: function(minDate) {
        if (typeof minDate === 'string') {
            minDate = Ext.Date.parse(minDate, this.getDateFormat());
        }

        //<debug>
        if (minDate !== null && !Ext.isDate(minDate)) {
            Ext.raise("Date object or string in dateFormat required");
        }
        //</debug>

        return minDate ? Ext.Date.clearTime(minDate, true) : null;
    },

    applyMaxDate: function(maxDate) {
        if (typeof maxDate === 'string') {
            maxDate = Ext.Date.parse(maxDate, this.getDateFormat());
        }

        //<debug>
        if (maxDate !== null && !Ext.isDate(maxDate)) {
            Ext.raise("Date object or string in dateFormat required");
        }
        //</debug>

        return maxDate ? Ext.Date.clearTime(maxDate, true) : null;
    },

    /**
     * Returns the value of the field formatted using the specified format. If it is not
     * specified, it will default to {@link #dateFormat} and then
     * {@link Ext.util.Format#defaultDateFormat}.
     * @param {String} format The format to be returned.
     * @return {String} The formatted date.
     */
    getFormattedValue: function(format) {
        var value = this.getValue();

        return Ext.isDate(value) ? Ext.Date.format(value, format || this.getDateFormat()) : '';
    },

    applyPicker: function(picker, oldPicker) {
        var me = this;

        picker = me.callParent([picker, oldPicker]);

        if (picker) {
            me.pickerType = picker.xtype === 'datepicker' ? 'edge' : 'floated';
            picker.ownerCmp = me;
        }

        return picker;
    },

    createFloatedPicker: function() {
        return this.getFloatedPicker();
    },

    createEdgePicker: function() {
        var me = this,
            minDate = this.getMinDate(),
            maxDate = this.getMaxDate();

        return Ext.merge({
            yearFrom: minDate ? minDate.getFullYear() : (new Date().getFullYear() - 20),
            yearTo: maxDate ? maxDate.getFullYear() : (new Date().getFullYear() + 20)
        }, me.getEdgePicker());
    },

    setPickerLocation: function(fromKeyboard) {
        var me = this,
            pickerType = me.pickerType,
            picker = me.getPicker(),
            value = me.getValue(),
            limit;

        me.$ignorePickerChange = true;

        if (value != null) {
            picker.setValue(value);
        }
        else if (pickerType === 'edge') {
            picker.setValue(new Date());
        }

        delete me.$ignorePickerChange;

        if (pickerType === 'floated') {
            picker.el.dom.tabIndex = -1;

            limit = me.getMinDate();

            if (limit) {
                picker.setMinDate(limit);
            }

            limit = me.getMaxDate();

            if (limit) {
                picker.setMaxDate(limit);
            }

            value = value || new Date();

            // Ensure the carousel is at the correct position wth no animation.
            picker.setValueWithoutAnim(value);

            if (fromKeyboard) {
                picker.focusDate(value);
            }
        }
    },

    doValidate: function(value, errors, skipLazy) {
        var me = this,
            format = me.getDateFormat(),
            limit, t;

        me.callParent([ value, errors, skipLazy ]);

        limit = me.getMinDate();
        t = +value;  // doValidate is only passed values that have been parsed

        if (limit && t < +limit) {
            limit = Ext.Date.format(limit, format);
            errors.push(Ext.String.format(me.minDateMessage, limit));
        }

        limit = me.getMaxDate();

        if (limit && t > +limit) {
            limit = Ext.Date.format(limit, format);
            errors.push(Ext.String.format(me.maxDateMessage, limit));
        }
    },

    /**
     * Called when the picker changes its value.
     * @param {Ext.picker.Date} picker The date picker.
     * @param {Object} value The new value from the date picker.
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this;

        if (me.$ignorePickerChange) {
            return;
        }

        me.forceSetValue(value);

        me.fireEvent('select', me, value);

        // Focus the inputEl first and then collapse. We configure
        // the picker not to revert focus which is a normal thing to do
        // for floaters; in our case when the picker is focusable it will
        // lead to unexpected results on Tab key presses.
        // Note that this focusing might happen synchronously during Tab
        // key handling in the picker, which is the way we want it.
        me.onTabOut(picker);
    },

    onTabOut: function() {
        // Automatic focus reversion will move focus back to the owning field if necessary.
        this.collapse();
    },

    parseValue: function(value, errors) {
        var me = this,
            date = value,
            defaultFormat = me.getDateFormat(),
            altFormats = me.getAltFormats(),
            formats = altFormats ? [defaultFormat].concat(altFormats) : [defaultFormat],
            formatsLength = formats.length,
            i, format;

        if (date) {
            if (!Ext.isDate(date)) {
                for (i = 0; i < formatsLength; i++) {
                    format = formats[i];
                    date = Ext.Date.parse(
                        value + ' ' + me.initTime,
                        format + ' ' + me.initTimeFormat
                    );

                    if (date) {
                        return Ext.Date.clearTime(date);
                    }
                }
            }

            if (date !== null) {
                return date;
            }
        }

        return this.callParent([value, errors]);
    },

    isEqual: function(value1, value2) {
        var v1 = this.transformValue(value1),
            v2 = this.transformValue(value2);

        return +v1 === +v2;
    },

    transformValue: function(value) {
        if (Ext.isObject(value)) {
            value = new Date(value.year, value.month, value.day);

            if (isNaN(value.getTime())) {
                value = null;
            }
        }

        return value;
    },

    doDestroy: function() {
        var picker = this._picker;

        if (picker && picker.isPicker) {
            picker.destroy();
        }

        this.callParent();
    },

    rawToValue: function(rawValue) {
        var me = this;

        return me.parseValue(rawValue) || rawValue || null;
    },

    privates: {
        setShowPickerValue: function(picker) {
            this.updatePickerValue(picker, this.getValue() || new Date());
        }
    },

    deprecated: {
        '6.5': {
            configs: {
                format: 'dateFormat'
            }
        }
    }
});
