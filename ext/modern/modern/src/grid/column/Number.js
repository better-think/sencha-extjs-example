/**
 * A Column type for rendering numeric data field according to a {@link #format} string.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * Ext.create('Ext.data.Store', {
 *    storeId:'sampleStore',
 *    fields:[
 *        { name: 'symbol', type: 'string' },
 *        { name: 'price',  type: 'number' },
 *        { name: 'change', type: 'number' },
 *        { name: 'volume', type: 'number' }
 *    ],
 *    data:[
 *        { symbol: "msft",   price: 25.76,  change: 2.43, volume: 61606325 },
 *        { symbol: "goog",   price: 525.73, change: 0.81, volume: 3053782  },
 *        { symbol: "apple",  price: 342.41, change: 1.35, volume: 24484858 },
 *        { symbol: "sencha", price: 142.08, change: 8.85, volume: 5556351  }
 *    ]
 * });
 *
 * Ext.create('Ext.grid.Grid', {
 *     title: 'Number Column Demo',
 *     store: Ext.data.StoreManager.lookup('sampleStore'),
 *     columns: [
 *         { text: 'Symbol', dataIndex: 'symbol', width: 100},
 *         { text: 'Price',  dataIndex: 'price',  formatter: 'usMoney' },
 *         { text: 'Change', dataIndex: 'change', xtype: 'numbercolumn', format:'0.00' },
 *         { text: 'Volume', dataIndex: 'volume', xtype: 'numbercolumn', format:'0,000' }
 *     ],
 *     height: 200,
 *     width: 400
 * });
 * ```
 */
Ext.define('Ext.grid.column.Number', {
    extend: 'Ext.grid.column.Column',
    xtype: 'numbercolumn',

    isNumberColumn: true,

    requires: [
        'Ext.util.Format',
        'Ext.grid.cell.Number'
    ],

    config: {
        /**
         * @cfg {String} format
         * A format string as used by {@link Ext.util.Format#number} to format values
         * for this column.
         */
        format: null
    },

    cell: {
        xtype: 'numbercell'
    },

    defaultEditor: {
        xtype: 'numberfield'
    }
});
