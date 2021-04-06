/**
 *
 */
Ext.define('Ext.field.DatePickerNative', {
    extend: 'Ext.field.Date',
    alternateClassName: 'Ext.form.DatePickerNative',
    xtype: 'datepickernativefield',

    onFocus: function(e) {
        var me = this,
            success, fail, dateTimePickerFunc;

        if (!(navigator.plugins && navigator.plugins.dateTimePicker)) {

            me.callParent();

            return;
        }

        success = function(res) {
            me.setValue(res);
        };

        fail = function(e) {
            console.log("DateTimePicker: error occurred or cancelled: " + e);
        };

        try {

            dateTimePickerFunc = me.getName() === 'date'
                ? navigator.plugins.dateTimePicker.selectDate
                : navigator.plugins.dateTimePicker.selectTime;

            dateTimePickerFunc(success, fail, { value: me.getValue() });

        }
        catch (ex) {
            fail(ex);
        }
    }
});
