/**
 * The Column Resizing plugin allows users to adjust the width of the grid columns to suit
 * their needs.  This functionality can be included by requiring the plugin and adding
 * it to your grid's plugins object.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *  var store = Ext.create('Ext.data.Store', {
 *      data: [
 *          { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
 *          { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
 *          { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
 *          { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
 *      ]
 *  });
 *
 *  Ext.create('Ext.grid.Grid', {
 *      fullscreen: true,
 *      layout: 'fit',
 *      store: store,
 *      plugins: {
 *          columnresizing: true
 *      },
 *      columns: [{
 *          text: "Name",
 *          dataIndex: "name",
 *          flex: 1
 *      },
 *      {
 *          text: "Email",
 *          dataIndex: "email",
 *          flex: 1
 *      },
 *      {
 *          text: "Phone",
 *          dataIndex: "phone",
 *          flex: 1
 *      }]
 *  });
 * ```
 *
 */
Ext.define('Ext.grid.plugin.ColumnResizing', {
    extend: 'Ext.Component',

    alias: ['plugin.columnresizing', 'plugin.gridcolumnresizing'],

    config: {
        grid: null,

        /**
         * @cfg {Boolean} realtime
         * When `true` the whole column will resize in real-time as the user drags. When
         * `false` only the header will resize until the interaction is done.
         */
        realtime: false
    },

    hasResizingCls: Ext.baseCSSPrefix + 'has-columnresizing',
    resizingCls: Ext.baseCSSPrefix + 'resizing',
    columnSelector: '.' + Ext.baseCSSPrefix + 'gridcolumn',
    resizerSelector: '.' + Ext.baseCSSPrefix + 'gridcolumn .' + Ext.baseCSSPrefix + 'resizer-el',

    init: function(grid) {
        this.setGrid(grid);
        grid.getHeaderContainer().setTouchAction({ panX: false });
    },

    updateGrid: function(grid, oldGrid) {
        var me = this,
            cls = me.hasResizingCls,
            headerContainer, resizeMarker;

        if (oldGrid) {
            headerContainer = oldGrid.getHeaderContainer();

            headerContainer.renderElement.un({
                touchstart: 'onContainerTouchStart',
                scope: me,
                priority: 100
            });

            oldGrid.removeCls(cls);
        }

        if (grid) {
            me._resizeMarker = resizeMarker = grid.resizeMarkerElement;
            me._resizeMarkerParent = resizeMarker.parent();

            headerContainer = grid.getHeaderContainer();
            headerContainer.renderElement.on({
                touchstart: 'onContainerTouchStart',
                scope: me
            });

            grid.addCls(cls);
        }
    },

    onContainerTouchStart: function(e) {
        var me = this,
            gridHeader = me.getGrid().getHeaderContainer(),
            target = e.getTarget(me.columnSelector),
            resizer = e.getTarget(me.resizerSelector),
            column;

        if (resizer && !e.multitouch && target && !me._resizeColumn) {
            column = Ext.Component.from(target);

            if (column && column.getResizable()) {
                me._startColumnWidth = column.getComputedWidth();
                me._minColumnWidth = column.getMinWidth();
                me._maxColumnWidth = column.getMaxWidth();
                me._resizeColumn = column;
                me._startX = e.getX();
                column.addCls(me.resizingCls);

                // Prevent drag and longpress gestures being triggered by this mousedown
                gridHeader.renderElement.suspendEvent('drag', 'longpress');

                if (!this.getRealtime()) {
                    me._resizeMarker.show();
                    me._resizeMarker.setLeft(
                        column.el.getOffsetsTo(me._resizeMarkerParent)[0] + me._startColumnWidth
                    );
                }
                else {
                    column.setWidth(me._startColumnWidth);
                }

                me.touchListeners = Ext.getBody().on({
                    touchEnd: 'onTouchEnd',
                    touchMove: 'onTouchMove',
                    scope: me,
                    destroyable: true
                });
            }
        }
        else if (e.multitouch && me._resizeColumn) {
            me.endResize();
        }
    },

    onTouchMove: function(e) {
        var me = this,
            column = me._resizeColumn,
            resizeAmount;

        // Single touch only
        if (e.isMultitouch) {
            me.endResize();
        }
        else if (column) {
            resizeAmount = e.getX() - me._startX;

            me.currentColumnWidth = Math.max(Math.ceil(me._startColumnWidth + resizeAmount),
                                             me._minColumnWidth);

            if (me._maxColumnWidth) {
                me.currentColumnWidth = Math.min(me.currentColumnWidth, me._maxColumnWidth);
            }

            if (me.getRealtime()) {
                column.setWidth(me.currentColumnWidth);
                column.renderElement.setWidth(me.currentColumnWidth);
            }
            else {
                me._resizeMarker.setLeft(
                    column.el.getOffsetsTo(me._resizeMarkerParent)[0] + me.currentColumnWidth
                );
            }

            column.resizing = true;

            e.claimGesture();
        }
    },

    onTouchEnd: function(e) {
        var column = this._resizeColumn,
            hasResized = e.getX() !== this._startX;

        Ext.destroy(this.touchListeners);

        if (column) {
            this.endResize();

            // Mouse/touch down then up means a tap on the resizer
            if (!hasResized) {
                column.onResizerTap(e);
            }
        }
    },

    endResize: function() {
        var me = this,
            column = me._resizeColumn,
            grid = me.getGrid();

        if (column) {
            if (!me.getRealtime()) {
                grid.resizeMarkerElement.hide();
            }

            if (me.currentColumnWidth) {
                column.setFlex(null);

                if (column.resizing) {
                    column.setWidth(me.currentColumnWidth);
                    column.resizing = false;
                }
                else if (me._resizeColumn.getWidth() === me._startColumnWidth) {
                    column.setWidth(me._startColumnWidth);
                }
            }

            column.removeCls(me.resizingCls);

            me._resizeColumn = null;
        }
    }
});
