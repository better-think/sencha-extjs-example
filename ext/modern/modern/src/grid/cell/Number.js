/**
 * This class displays a numeric value in a {@link Ext.grid.Grid grid} cell. This cell type
 * is typically used by specifying {@link Ext.grid.column.Number} column type.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */
Ext.define('Ext.grid.cell.Number', {
    extend: 'Ext.grid.cell.Text',
    xtype: 'numbercell',

    isNumberCell: true,

    requires: [
        'Ext.util.Format'
    ],

    config: {
        /**
         * @cfg {String} format
         * A format string as used by {@link Ext.util.Format#number} to format values for
         * this column.
         */
        format: '0,000.00'
    },

    classCls: Ext.baseCSSPrefix + 'numbercell',

    zeroValue: null,

    updateColumn: function(column, oldColumn) {
        var format;

        this.callParent([ column, oldColumn ]);

        if (column && column.isNumberColumn) {
            format = column.getFormat();

            if (format !== null) {
                this.setFormat(format);
            }
        }
    },

    updateFormat: function(format) {
        if (!this.isConfiguring) {
            this.writeValue();
        }
    },

    formatValue: function(value) {
        var hasValue = value || value === 0,
            zeroValue;

        if (value === 0 && (zeroValue = this.getZeroValue()) !== null) {
            value = zeroValue || '';
        }
        else {
            value = hasValue ? Ext.util.Format.number(value, this.getFormat()) : '';
        }

        return value;
    }
});
