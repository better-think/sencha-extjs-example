/**
 * The Modern Grid's ViewOptions plugin produces a menu that slides in from the right
 * (by default) when you longpress on the grid headers. The menu displays the column
 * header names which represents the order of the grid's columns. This allows users to
 * easily reorder the grid's columns by reordering the rows. Items may be dragged by
 * grabbing the furthest left side of the row and moving the item vertically.
 *
 * Once the columns are ordered to your liking, you may then close the menu by tapping the
 * "Done" button.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * var store = Ext.create('Ext.data.Store', {
 *     fields: ['name', 'email', 'phone'],
 *     data: [{
 *         name: 'Lisa',
 *         email: 'lisa@simpsons.com',
 *         phone: '555-111-1224'
 *     }, {
 *         name: 'Bart',
 *         email: 'bart@simpsons.com',
 *         phone: '555-111-1234'
 *     }, {
 *         name: 'Homer',
 *         email: 'homer@simpsons.com',
 *         phone: '555-222-1244'
 *     }, {
 *         name: 'Marge',
 *         email: 'marge@simpsons.com',
 *         phone: '555-222-1254'
 *     }]
 * });
 *
 * Ext.create('Ext.grid.Grid', {
 *     store: store,
 *     plugins: {
 *         gridviewoptions: true
 *     },
 *     columns: [{
 *         text: 'Name',
 *         dataIndex: 'name',
 *         width: 200
 *     }, {
 *         text: 'Email',
 *         dataIndex: 'email',
 *         width: 250
 *     }, {
 *         text: 'Phone',
 *         dataIndex: 'phone',
 *         width: 120
 *     }],
 *     fullscreen: true
 * });
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container width="100%" height="100%">
 *     <ext-grid
 *         shadow="true"
 *         height="100%"
 *         onready="basicgrid.onGridReady"
 *         plugins='["gridviewoptions"]'
 *     >
 *         <ext-column text="Name" dataIndex="name" flex="1" sortable="false"></ext-column>
 *         <ext-column text="Email" dataIndex="email" flex="1"></ext-column>
 *         <ext-column text="Phone" dataIndex="phone" flex="1"></ext-column>
 *     </ext-grid>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', tab: 2, packages: ['ext-web-components']})
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-grid.component';
 * import '@sencha/ext-web-components/dist/ext-column.component';
 * 
 * Ext.require('Ext.grid.plugin.ViewOptions');
 * 
 * export default class BasicGridComponent {
 *     constructor() {
 *        this.store = new Ext.data.Store({
 *           data: [
 *               { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
 *               { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
 *               { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
 *               { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
 *           ]
 *        });
 *     }
 * 
 *     onGridReady(event) {
 *         this.basicGridCmp = event.detail.cmp;
 *         this.basicGridCmp.setStore(this.store);
 *     }
 * }
 * 
 *   window.basicgrid = new BasicGridComponent();
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react'
 * import { ExtGrid, ExtColumn } from '@sencha/ext-react';
 * 
 * Ext.require('Ext.grid.plugin.ViewOptions');
 *
 * export default class MyExample extends Component {
 *
 *     store = new Ext.data.Store({
 *         data: [
 *             { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
 *             { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
 *             { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
 *             { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
 *         ]
 *     });
 *
 *     render() {
 *         return (
 *             <ExtGrid
 *                 layout="fit"
 *                 store={this.store}
 *                 plugins={[ 'gridviewoptions' ]}
 *             >
 *                 <ExtColumn text="Name" dataIndex="name" flex={1} sortable={false} />
 *                 <ExtColumn text="Email" dataIndex="email" flex={1} />
 *                 <ExtColumn text="Phone" dataIndex="phone" flex={1} />
 *             </ExtGrid>
 *         )
 *     }
 * }
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 *  import { Component } from '@angular/core'
 *  declare var Ext: any;
 *
 *  Ext.require('Ext.grid.plugin.ViewOptions');
 *  @Component({
 *      selector: 'app-root-1',
 *      styles: [`
 *              `],
 *      template: `
 *      <ExtContainer layout="fit">
 *          <ExtGrid
 *              [height]="'500px'"
 *              [store]="store"
 *              plugins="gridviewoptions"
 *          >
 *              <ExtColumn text="Name" dataIndex="name" flex="1" [sortable]="false"></ExtColumn>
 *              <ExtColumn text="Email" dataIndex="email" flex="1"></ExtColumn>
 *              <ExtColumn text="Phone" dataIndex="phone" flex="1"></ExtColumn>
 *          </ExtGrid>
 *      </ExtContainer>
 *      `
 *  })
 *  export class AppComponent {
 *      store = new Ext.data.Store({
 *          data: [
 *              { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
 *              { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
 *              { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
 *              { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
 *          ]
 *      });
 *  }
 * ```
 *
 * Developers may modify the menu and its contents by overriding {@link #sheet} and
 * {@link #columnList} respectively.
 *
 */
Ext.define('Ext.grid.plugin.ViewOptions', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.gridviewoptions',

    requires: [
        'Ext.dataview.NestedList',
        'Ext.dataview.plugin.SortableList',
        'Ext.grid.plugin.ViewOptionsListItem'
    ],

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * The width of the menu
         */
        sheetWidth: 320,

        /**
         * The configuration of the menu
         */
        sheet: {
            lazy: true,
            $value: {
                xtype: 'sheet',
                cls: Ext.baseCSSPrefix + 'gridviewoptions',
                items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Customize',
                    items: [{
                        xtype: 'button',
                        text: 'Done',
                        ui: 'action',
                        align: 'right',
                        role: 'donebutton'
                    }]
                }],
                hidden: true,
                hideOnMaskTap: true,
                enter: 'right',
                exit: 'right',
                modal: true,
                right: 0,
                layout: 'fit',
                stretchY: true
            }
        },

        /**
         * The column's configuration
         */
        columnList: {
            lazy: true,
            $value: {
                xtype: 'nestedlist',
                title: 'Columns',
                clearSelectionOnListChange: false,
                listConfig: {
                    triggerEvent: null,
                    infinite: true,
                    mode: 'MULTI',
                    variableHeights: true,
                    scrollToTopOnRefresh: false,
                    plugins: {
                        sortablelist: {
                            source: {
                                handle: '.' + Ext.baseCSSPrefix + 'column-options-sortablehandle'
                            }
                        }
                    },
                    itemConfig: {
                        xtype: 'viewoptionslistitem'
                    },
                    itemTpl: '{text}'
                },
                store: {
                    type: 'tree',
                    fields: [
                        'id',
                        'text',
                        'dataIndex',
                        'header',
                        'hidden',
                        'hideable',
                        'grouped',
                        'groupable'
                    ],
                    root: {
                        text: 'Columns'
                    }
                }
            }
        },

        /**
         * The CSS class responsible for displaying the visibility indicator.
         */
        visibleIndicatorSelector: '.' + Ext.baseCSSPrefix + 'column-options-visibleindicator',

        /**
         * The CSS class responsible for displaying the grouping indicator.
         */
        groupIndicatorSelector: '.' + Ext.baseCSSPrefix + 'column-options-groupindicator'
    },

    init: function(grid) {
        this.setGrid(grid);
    },

    destroy: function() {
        this.destroyMembers('sheet', 'columnList');

        this.callParent();
    },

    updateGrid: function(grid, oldGrid) {
        if (oldGrid) {
            oldGrid.getHeaderContainer().renderElement.un({
                contextmenu: 'onHeaderContextMenu',
                longpress: 'onHeaderLongPress',
                scope: this
            });
            oldGrid.un({
                columnadd: 'onColumnAdd',
                columnmove: 'onColumnMove',
                columnremove: 'onColumnRemove',
                columnhide: 'onColumnHide',
                columnshow: 'onColumnShow',
                scope: this
            });
        }

        if (grid) {
            grid.getHeaderContainer().renderElement.on({
                contextmenu: 'onHeaderContextMenu',
                longpress: 'onHeaderLongPress',
                scope: this
            });
        }
    },

    applySheet: function(sheet) {
        if (sheet && !sheet.isComponent) {
            sheet = Ext.factory(sheet, Ext.Sheet);
        }

        return sheet;
    },

    applyColumnList: function(list) {
        if (list && !list.isComponent) {
            list = Ext.factory(list, Ext.Container);
        }

        return list;
    },

    updateColumnList: function(list) {
        if (list) {
            list.on({
                listchange: 'onListChange',
                scope: this
            });

            // For each item in the nested list, we want to handle the reorder
            list.on('dragsort', 'onColumnDrag', this, {
                delegate: '> list'
            });

            this.attachTapListeners();
        }
    },

    updateSheet: function(sheet) {
        sheet.setWidth(this.getSheetWidth());
        sheet.add(this.getColumnList());
        sheet.on('hide', 'onSheetHide', this);
    },

    onDoneButtonTap: function() {
        this.getSheet().hide();
    },

    onColumnDrag: function(list, row, newIndex) {
        var column = Ext.getCmp(row.getRecord().get('id')),
            parent = column.getParent(),
            siblings = parent.getInnerItems(),
            i, ln, sibling;

        for (i = 0, ln = newIndex; i < ln; i++) {
            sibling = siblings[i];

            if (!sibling.isHeaderGroup && sibling.getIgnore()) {
                newIndex += 1;
            }
        }

        this.isMoving = true;
        parent.insert(newIndex, column);
        this.isMoving = false;
    },

    attachTapListeners: function() {
        var activeList = this.getColumnList().getActiveItem();

        if (!activeList.hasAttachedTapListeners) {
            activeList.onBefore({
                childtap: 'onListChildTap',
                scope: this
            });
            activeList.hasAttachedTapListeners = true;
        }
    },

    onListChange: function(nestedList, list) {
        var store = list.getStore(),
            activeNode = store.getNode(),
            records = activeNode.childNodes,
            ln = records.length,
            i, column, record;

        for (i = 0; i < ln; i++) {
            record = records[i];
            column = Ext.getCmp(record.getId());

            record.set('hidden', column.isHidden());
        }

        this.attachTapListeners();
    },

    onListChildTap: function(list, location) {
        var me = this,
            handled = false,
            e = location.event;

        if (Ext.fly(e.target).is(me.getVisibleIndicatorSelector())) {
            me.onVisibleIndicatorTap(location.row, location.record);
            handled = true;
        }
        else if (Ext.fly(e.target).is(me.getGroupIndicatorSelector())) {
            me.onGroupIndicatorTap(location.row, location.record);
            handled = true;
        }

        return !handled;
    },

    onVisibleIndicatorTap: function(row, record) {
        var hidden = !record.get('hidden'),
            column = Ext.getCmp(record.get('id')),
            len = this.getGrid().getVisibleColumns().length;

        if (len > 1 || (len && column.isHidden())) {
            column.setHidden(hidden);
            record.set('hidden', hidden);
        }
    },

    onGroupIndicatorTap: function(row, record) {
        var me = this,
            grouped = !record.get('grouped'),
            store = me.getGrid().getStore();

        // Clear everything
        this.getListRoot().cascade(function(node) {
            node.set('grouped', false);
        });

        if (grouped) {
            store.setGrouper({
                property: record.get('dataIndex')
            });
            record.set('grouped', true);
        }
        else {
            store.setGrouper(null);
        }
    },

    onColumnHide: function(headerContainer, column) {
        var nestedList = this.getColumnList(),
            activeList = nestedList.getActiveItem(),
            store = activeList.getStore(),
            record = store.getById(column.getId());

        if (record) {
            record.set('hidden', true);
        }
    },

    onColumnShow: function(headerContainer, column) {
        var nestedList = this.getColumnList(),
            activeList = nestedList.getActiveItem(),
            store = activeList.getStore(),
            record = store.getById(column.getId());

        if (record) {
            record.set('hidden', false);
        }
    },

    onColumnAdd: function(grid, column) {
        var me = this,
            nestedList, mainHeaderCt, header, store, parentNode, isGridGrouped,
            grouper, dataIndex, data, idx, headerNode;

        if (column.getIgnore() || this.isMoving) {
            return;
        }

        nestedList = me.getColumnList();
        mainHeaderCt = grid.getHeaderContainer();
        header = column.getParent();
        store = nestedList.getStore();
        parentNode = store.getRoot();
        isGridGrouped = grid.getGrouped();
        grouper = grid.getStore().getGrouper();
        dataIndex = column.getDataIndex();
        data = {
            id: column.getId(),
            text: column.getText() || '\xA0',
            groupable: isGridGrouped && column.canGroup(),
            hidden: column.isHidden(),
            hideable: column.getHideable(),
            grouped: !!(isGridGrouped && grouper && grouper.getProperty() === dataIndex),
            dataIndex: column.getDataIndex(),
            leaf: true
        };

        if (header !== mainHeaderCt) {
            headerNode = parentNode.findChild('id', header.getId());

            if (!headerNode) {
                idx = header.getParent().indexOf(header);
                headerNode = parentNode.insertChild(idx, {
                    groupable: false,
                    header: true,
                    hidden: header.isHidden(),
                    id: header.getId(),
                    text: header.getText()
                });
            }

            idx = header.indexOf(column);
            parentNode = headerNode;
        }
        else {
            idx = mainHeaderCt.indexOf(column);
        }

        parentNode.insertChild(idx, data);
    },

    onColumnMove: function(headerContainer, column, header) {
        this.onColumnRemove(headerContainer, column);
        this.onColumnAdd(headerContainer, column, header);
    },

    onColumnRemove: function(headerContainer, column) {
        var root, record;

        if (column.getIgnore() || this.isMoving) {
            return;
        }

        root = this.getListRoot();
        record = root.findChild('id', column.getId(), true);

        if (record) {
            record.parentNode.removeChild(record, true);
        }
    },

    onHeaderContextMenu: function(e) {
        // Stop context menu from being triggered by a longpress
        e.preventDefault();
    },

    onHeaderLongPress: function(e) {
        if (!this.getSheet().isVisible()) {
            this.showViewOptions();
        }
    },

    hideViewOptions: function() {
        var me = this,
            sheet = me.getSheet();

        me.getGrid().getHeaderContainer().setSortable(me.cachedSortable);
        delete me.cachedSortable;

        sheet.hide();
    },

    onSheetHide: function() {
        this.hideViewOptions();
    },

    showViewOptions: function() {
        var me = this,
            sheet = me.getSheet(),
            header;

        me.setup();

        if (!sheet.isVisible()) {
            // Since we may have shown the header in response to a longpress we don't
            // want the succeeding "tap" to trigger column sorting, so we temporarily
            // disable sort-on-tap while the ViewOptions are shown
            header = me.getGrid().getHeaderContainer();
            me.cachedSortable = header.getSortable();
            header.setSortable(false);

            me.updateListInfo();

            sheet.show();
        }
    },

    privates: {
        getListRoot: function() {
            return this.getColumnList().getStore().getRoot();
        },

        setup: function() {
            var me = this,
                grid = me.getGrid(),
                sheet, root;

            if (me.doneSetup) {
                return;
            }

            me.doneSetup = true;

            root = this.getListRoot();

            root.removeAll();

            grid.getColumns().forEach(function(leaf) {
                me.onColumnAdd(grid, leaf);
            });

            // Don't track the events until the first show, it's easier to
            // build it from scratch.
            grid.on({
                columnadd: 'onColumnAdd',
                columnmove: 'onColumnMove',
                columnremove: 'onColumnRemove',
                columnhide: 'onColumnHide',
                columnshow: 'onColumnShow',
                scope: me
            });

            sheet = me.getSheet();

            sheet.down('button[role=donebutton]').on({
                tap: 'onDoneButtonTap',
                scope: me
            });
        },

        updateListInfo: function() {
            var grid = this.getGrid(),
                store = grid.getStore(),
                grouper = store.getGrouper(),
                isGridGrouped = grid.getGrouped(),
                grouperProp = grouper && grouper.getProperty();

            this.getColumnList().getStore().getRoot().cascade(function(node) {
                var grouped = false,
                    dataIndex;

                if (isGridGrouped) {
                    dataIndex = node.get('dataIndex');
                    grouped = dataIndex && dataIndex === grouperProp;
                }

                node.set('grouped', dataIndex && grouped);
            });
        }
    }
});
