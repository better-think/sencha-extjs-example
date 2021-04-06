/**
 * The Cell Editing plugin utilizes an `Ext.Editor` to provide inline cell editing for
 * grid cells.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *  var store = Ext.create('Ext.data.Store', {
 *      fields: ['fname', 'lname', 'talent'],
 *      data: [
 *          { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *          { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *          { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *          { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *          { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  },
 *      ]
 *  });
 *
 *  Ext.create('Ext.grid.Grid', {
 *      title: 'DC Personnel',
 *
 *      store: store,
 *      plugins: {
 *          cellediting: true
 *      },
 *      columns: [
 *          { text: 'First Name', dataIndex: 'fname',  flex: 1, editable: true },
 *          { text: 'Last Name',  dataIndex: 'lname',  flex: 1 },
 *          { text: 'Talent',     dataIndex: 'talent', flex: 1 }
 *      ],
 *      fullscreen: true
 *  });
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container width="100%" height="100%">
 *     <ext-grid
 *         shadow="true"
 *         height="275"
 *         plugins='["cellediting"]'
 *         onready="editablegrid.onGridReady"
 *     >
 *         <ext-column text="First Name" dataIndex="fname" flex="1" editable="true"></ext-column>
 *         <ext-column text="Last Name" dataIndex="lname" flex="1" editable="true"></ext-column>
 *         <ext-column text="Talent" dataIndex="talent" flex="1" editable="true"></ext-column>
 *     </ext-grid>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', tab: 2, packages: ['ext-web-components']})
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-grid.component';
 * import '@sencha/ext-web-components/dist/ext-column.component';
 * 
 * Ext.require('Ext.grid.plugin.Editable');
 * 
 * export default class EditableGridComponent {
 *     constructor() {
 *        this.store = new Ext.data.Store({
 *           data: [
 *               { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *               { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *               { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *               { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *               { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  }
 *           ]
 *        });
 *     }
 * 
 *     onGridReady(event) {
 *         this.editableGridCmp = event.detail.cmp;
 *         this.editableGridCmp.setStore(this.store);
 *     }
 * }
 * window.editablegrid = new EditableGridComponent();
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 *  import React, { Component } from 'react'
 *  import { ExtGrid, ExtColumn, ExtSelectField } from '@sencha/ext-react';
 * 
 *  Ext.require('Ext.grid.plugin.CellEditing');
 *
 *  export default class MyExample extends Component {
 *
 *      store = new Ext.data.Store({
 *          data: [
 *              { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *              { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *              { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *              { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *              { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  }
 *          ]
 *      });
 *
 *      render() {
 *          return (
 *              <ExtGrid
 *                  height="275"
 *                  store={this.store}
 *                  plugins={['cellediting']}
 *                >
 *                    <ExtColumn 
 *                        text="First Name"
 *                        dataIndex="fname"
 *                        flex={1}
 *                        editable
 *                    />
 *                    <ExtColumn 
 *                        text="Last Name"
 *                        dataIndex="lname"
 *                        flex={1}
 *                        editable
 *                    />
 *                    <ExtColumn 
 *                        text="Talent"
 *                        dataIndex="talent"
 *                        flex={1}
 *                        editable
 *                    >
 *                        <ExtSelectField
 *                            options={[
 *                                { text: 'All', value: 'All' },
 *                                { text: 'Archery', value: 'Archery' },
 *                                { text: 'Speedster', value: 'Speedster' },
 *                                { text: 'Weapons', value: 'Weapons' },
 *                                { text: 'Willpower', value: 'Willpower' }
 *                            ]}
 *                       />
 *                    </ExtColumn>
 *              </ExtGrid>
 *          )
 *      }
 * }
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 *  import { Component } from '@angular/core'
 *  declare var Ext: any;
 *
 *  @Component({
 *      selector: 'app-root-1',
 *      styles: [`
 *              `],
 *      template: `
 *      <ExtContainer>
 *          <ExtGrid
 *              [height]="'275px'"
 *              [store]="this.store"
 *              [plugins]="['cellediting']"
 *          >
 *              <ExtColumn 
 *                  text="First Name"
 *                  dataIndex="fname"
 *                  flex="1"
 *                  editable="true"
 *              ></ExtColumn>
 *              <ExtColumn
 *                  text="Last Name"
 *                  dataIndex="lname"
 *                  flex="1"
 *                  editable="true"
 *              ></ExtColumn>
 *              <ExtColumn
 *                  text="Talent"
 *                  dataIndex="talent"
 *                  flex="1"
 *                  editable="true"
 *              >
 *                  <ExtSelectField
 *                      [options]="[
 *                          { text: 'All', value: 'All' },
 *                          { text: 'Archery', value: 'Archery' },
 *                          { text: 'Speedster', value: 'Speedster' },
 *                          { text: 'Weapons', value: 'Weapons' },
 *                          { text: 'Willpower', value: 'Willpower' }
 *                      ]"
 *                  ></ExtSelectField>
 *              </ExtColumn>
 *          </ExtGrid>
 *      </ExtContainer>
 *      `
 *  })
 *  export class AppComponent {
 *      store = new Ext.data.Store({
 *          data: [
 *              { 'fname': 'Barry',  'lname': 'Allen', 'talent': 'Speedster'},
 *              { 'fname': 'Oliver', 'lname': 'Queen', 'talent': 'Archery'},
 *              { 'fname': 'Kara',   'lname': 'Zor-El', 'talent': 'All'},
 *              { 'fname': 'Helena', 'lname': 'Bertinelli', 'talent': 'Weapons Expert'},
 *              { 'fname': 'Hal',    'lname': 'Jordan', 'talent': 'Willpower'  }
 *          ]
 *      });
 *
 *  }
 * ```
 *
 * @since 6.5.0
 */
Ext.define('Ext.grid.plugin.CellEditing', {
    extend: 'Ext.plugin.Abstract',
    alias: ['plugin.gridcellediting', 'plugin.cellediting'],

    requires: [
        'Ext.grid.CellEditor',
        'Ext.grid.Location'
    ],

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * @cfg {String} triggerEvent
         * An optional pointer event to trigger cell editing.
         *
         * By default, cell editing begins when actionable mode is entered by pressing
         * `ENTER` or `F2` when focused on the cell.
         */
        triggerEvent: 'doubletap',

        /**
         * @cfg {Boolean} [selectOnEdit=false]
         * Configure as `true` to have the cell editor *select* the cell it is editing (If
         * cell selection enabled), or the record it is editing (if row selection enabled)
         */
        selectOnEdit: null
    },

    init: function(grid) {
        this.setGrid(grid);

        grid.setTouchAction({
            doubleTapZoom: false
        });

        grid.$cellEditing = true;
    },

    getEditor: function(location) {
        var column = location.column,
            fieldName = column.getDataIndex(),
            record = location.record,
            editable = column.getEditable(),
            editor, field;

        if (!(editor = editable !== false && column.getEditor(location.record)) && editable) {
            editor = Ext.create(column.getDefaultEditor());
        }

        if (editor) {
            if (!editor.isCellEditor) {
                // during the construction of the celleditor
                // we need to pass the plugin so it can find
                // the owner grid to relay it's own events
                editor = Ext.create({
                    xtype: 'celleditor',
                    field: editor,
                    plugin: this
                });
            }

            column.setEditor(editor);
            editor.editingPlugin = this;

            field = editor.getField();
            field.addUi('celleditor');

            // Enforce the Model's validation rules
            field.setValidationField(record.getField(fieldName), record);
        }

        return editor;
    },

    getActiveEditor: function() {
        return this.activeEditor;
    },

    updateGrid: function(grid, oldGrid) {
        if (oldGrid) {
            oldGrid.unregisterActionable(this);
        }

        if (grid) {
            grid.registerActionable(this);
        }
    },

    /**
     * @protected
     * Part of the grid Actionable interface.
     *
     * Callback called by the NavigationModel on entry into actionable mode at the specified
     * position.
     * @param {Ext.grid.Location} location The position at which to enter actionable mode.
     * @return {Ext.grid.Location} The location where actionable mode was successfully started.
     */
    activateCell: function(location) {
        var me = this,
            activeEditor = me.activeEditor,
            previousEditor = me.$previousEditor,
            editor, selModel, result;

        //<debug>
        if (!location) {
            Ext.raise('A grid Location must be passed into CellEditing#activateCell');
        }
        //</debug>

        // Do not restart editor on the same cell. This may happen when an actionable's
        // triggerEvent happens in a cell editor, and the event bubbles up to the
        // NavigationModel which will try to activate the owning cell.
        // In this case, we return the location to indicate that it's still a successful edit.
        if (activeEditor && activeEditor.$activeLocation.cell === location.cell) {
            return activeEditor.$activeLocation;
        }
        else {
            editor = me.getEditor(location);

            if (editor) {
                if (previousEditor) {
                    if (previousEditor.isCancelling) {
                        previousEditor.cancelEdit();
                    }
                    else {
                        previousEditor.completeEdit();
                    }
                }

                result = editor.startEdit(location);

                if (editor.editing) {

                    // Select the edit location if possible if we have been configured to do so.
                    if (me.getSelectOnEdit()) {
                        selModel = me.getGrid().getSelectable();

                        if (selModel.getCells()) {
                            selModel.selectCells(location, location);
                        }
                        else if (selModel.getRows()) {
                            selModel.select(location.record);
                        }
                    }

                    me.$previousEditor = editor;

                    return result;
                }
                else {
                    editor.onEditComplete(false, true);
                }
            }
        }
    },

    // for compatibility
    startEdit: function(record, column) {
        this.activateCell(new Ext.grid.Location(this.getGrid(), {
            record: record,
            column: column
        }));
    },

    destroy: function() {
        var grid = this.getGrid();

        if (grid) {
            grid.$cellEditing = false;
        }

        this.$previousEditor = null;
        this.callParent();
    }
});
