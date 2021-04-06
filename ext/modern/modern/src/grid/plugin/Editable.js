/**
 * The `editable` plugin enables form-based, grid row editing. Editing begins by double-tapping
 * a row. This can be set to any event, which we'll discuss below. The editor consists of a form
 * positioned on the right side of the viewport.
 *
 * There is a button to save or cancel all changes for the edit in the toolbar, and the
 * row is deletable by default.
 *
 * The default editable grid can be defined like so:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *  Ext.create({
 *      xtype: 'grid',
 *      fullscreen: true,
 *      plugins: {
 *          grideditable: true
 *      },
 *      store: {
 *          fields: [],
 *          data: [{
 *              name: 'Jake'
 *          }, {
 *              name: 'Finn'
 *          }]
 *      },
 *      columns: [{
 *          text: 'Name',
 *          dataIndex: 'name',
 *          flex: 1,
 *          editable: true
 *      }]
 *  });
 * ```
 *
 * By opening up the plugins type as an object (or an array of objects), you can modify your
 * editor more significantly.  You can see the changeable bits below:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *  Ext.create({
 *      xtype: 'grid',
 *      fullscreen: true,
 *      plugins: {
 *          grideditable: {
 *              triggerEvent: 'childdoubletap',
 *              enableDeleteButton: true,
 *              formConfig: null, // See more below
 *
 *              defaultFormConfig: {
 *                  xtype: 'formpanel',
 *                  scrollable: true,
 *                  items: [{
 *                      xtype: 'fieldset'
 *                  }]
 *              },
 *
 *              toolbarConfig: {
 *                  xtype: 'titlebar',
 *                  docked: 'top',
 *                  items: [{
 *                      xtype: 'button',
 *                      ui: 'decline',
 *                      text: 'Cancel',
 *                      align: 'left',
 *                      action: 'cancel'
 *                  }, {
 *                      xtype: 'button',
 *                      ui: 'confirm',
 *                      text: 'Submit',
 *                      align: 'right',
 *                      action: 'submit'
 *                  }]
 *              },
 *          }
 *      },
 *      store: {
 *          fields: [],
 *          data: [{
 *              name: 'Jake'
 *          }, {
 *              name: 'Finn'
 *          }]
 *      },
 *      columns: [{
 *          text: 'Name',
 *          dataIndex: 'name',
 *          flex: 1,
 *          editable: true
 *      }]
 * });
 * ```
 *
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
 * 
 * window.editablegrid = new EditableGridComponent();
 * ```
 * 
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 *  import React, { Component } from 'react'
 *  import { ExtGrid, ExtColumn, ExtSelectField } from '@sencha/ext-react';
 * 
 *  Ext.require('Ext.grid.plugin.Editable');
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
 *                  plugins={['grideditable']}
 *               >
 *                  <ExtColumn 
 *                      text="First Name"
 *                      dataIndex="fname"
 *                      flex={1}
 *                      editable
 *                  />
 *                  <ExtColumn 
 *                      text="Last Name"
 *                      dataIndex="lname"
 *                      flex={1}
 *                      editable
 *                  />
 *                  <ExtColumn 
 *                      text="Talent"
 *                      dataIndex="talent"
 *                      flex={1}
 *                      editable
 *                  >
 *                      <ExtSelectField
 *                          options={[
 *                              { text: 'All', value: 'All' },
 *                              { text: 'Archery', value: 'Archery' },
 *                              { text: 'Speedster', value: 'Speedster' },
 *                              { text: 'Weapons', value: 'Weapons' },
 *                              { text: 'Willpower', value: 'Willpower' }
 *                          ]}
 *                     />
 *                  </ExtColumn>
 *              </ExtGrid>
 *          )
 *      }
 * }
 * ```
 * 
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 *  import { Component } from '@angular/core'
 *  declare var Ext: any;
 *
 *  Ext.require('Ext.grid.plugin.Editable');
 *  @Component({
 *      selector: 'app-root-1',
 *      styles: [`
 *              `],
 *      template: `
 *      <ExtContainer>
 *          <ExtGrid
 *              [height]="'275px'"
 *              [store]="this.store"
 *              [plugins]="['grideditable']"
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
 *              <ExtSelectField
 *              [options]="[
 *                  { text: 'All', value: 'All' },
 *                  { text: 'Archery', value: 'Archery' },
 *                  { text: 'Speedster', value: 'Speedster' },
 *                  { text: 'Weapons', value: 'Weapons' },
 *                  { text: 'Willpower', value: 'Willpower' }
 *              ]"
 *          ></ExtSelectField>
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
 *  }
 * ```
 *  As you can see, you can easily modify nearly every bit of the editor window.  As mentioned
 *  above, the toolbar and delete button are the only components included by default.  That's
 *  where formConfig comes into play.
 *
 *  By adding formConfig, you can hardcode the form that gets created when editing a row.
 *  There are no fields set on the form initially, so you will need to define them
 *  yourself.  For example, if you had a "name" column, and you wanted it to be editable,
 *  you would do something like this in your plugins object:
 *
 *     formConfig: {
 *        items: [{
 *           xtype: 'textfield',
 *           name: 'name',
 *           label: 'Name'
 *        }]
 *     }
 *
 *  Now, upon opening the editor, you would see a textfield populated with the editable value from
 *  its corresponding record.
 *
 *  If you want to alter certain form configurations, but still have the default editor fields 
 *  applied, use the defaultFormConfig instead.
 */
Ext.define('Ext.grid.plugin.Editable', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.grideditable',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.Sheet',
        'Ext.TitleBar'
    ],

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * @cfg {String} triggerEvent
         * The event used to trigger the showing of the editor form. This event should
         * be an event that is fired by the grid.
         */
        triggerEvent: 'childdoubletap',

        /**
         * @cfg {Object} formConfig
         * By changing the formConfig you can hardcode the form that gets created when 
         * editing a row.
         * Note that the fields are not set on this form, so you will have to define them 
         * yourself in this config. If you want to alter certain form configurations, but 
         * still have the default editor fields applied, use the defaultFormConfig instead.
         */
        formConfig: null,

        /**
         * @cfg {Object} defaultFormConfig
         * Configures the default form appended to the editable panel.
         */
        defaultFormConfig: {
            xtype: 'formpanel',
            scrollable: true,
            items: [{
                xtype: 'fieldset'
            }]
        },

        /**
         * @cfg {Object} toolbarConfig
         * Configures the toolbar appended to the editable panel.
         */
        toolbarConfig: {
            xtype: 'titlebar',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'alt',
                text: 'Cancel',
                align: 'left',
                action: 'cancel'
            }, {
                xtype: 'button',
                ui: 'alt',
                text: 'Submit',
                align: 'right',
                action: 'submit'
            }]
        },

        /**
         * @cfg {Boolean} enableDeleteButton
         * Creates a delete button, which allows the user to delete the selected row.
         */
        enableDeleteButton: true
    },

    init: function(grid) {
        this.setGrid(grid);

        grid.setTouchAction({
            doubleTapZoom: false
        });
    },

    destroy: function() {
        this.cleanup();
        this.callParent();
    },

    updateGrid: function(grid, oldGrid) {
        var triggerEvent = this.getTriggerEvent();

        if (oldGrid) {
            oldGrid.un(triggerEvent, 'onTrigger', this);
        }

        if (grid) {
            grid.on(triggerEvent, 'onTrigger', this);
        }
    },

    onCancelTap: function() {
        this.sheet.hide();
    },

    onSubmitTap: function() {
        this.form.getRecord().set(this.form.getValues());
        this.sheet.hide();
    },

    onSheetHide: function() {
        this.cleanup();
    },

    getEditorFields: function(columns) {
        var fields = [],
            ln = columns.length,
            //<debug>
            map = {},
            //</debug>
            i, column, editor;

        for (i = 0; i < ln; i++) {
            column = columns[i];
            editor = column.ensureEditor();

            if (editor) {
                //<debug>
                if (map[column.getDataIndex()]) {
                    Ext.raise('An editable column with the same dataIndex "' +
                        column.getDataIndex() + '" already exists.');
                }

                map[column.getDataIndex()] = true;
                //</debug>

                if (editor.isEditor) {
                    editor = editor.getField();
                }

                editor.setLabel(column.getText());
                editor.setName(column.getDataIndex());
                fields.push(editor);
            }
        }

        return fields;
    },

    onTrigger: function(grid, location) {
        var me = this,
            record = location.record,
            formConfig = me.getFormConfig(),
            toolbarConfig = me.getToolbarConfig(),
            fields, form, sheet, toolbar;

        // Don't want to react to grid headers etc
        if (!record || !location.row) {
            return;
        }

        if (formConfig) {
            me.form = form = Ext.factory(formConfig, Ext.form.Panel);
        }
        else {
            me.form = form = Ext.factory(me.getDefaultFormConfig());

            fields = me.getEditorFields(grid.getColumns());
            form.down('fieldset').setItems(fields);
            form.clearFields = true;
        }

        toolbar = Ext.factory(toolbarConfig, Ext.form.TitleBar);
        me.submitButton = toolbar.down('button[action=submit]');
        toolbar.down('button[action=cancel]').on('tap', 'onCancelTap', me);
        me.submitButton.on('tap', 'onSubmitTap', me);

        // We sync the enabled state of the submit button with form validity
        form.on({
            change: 'onFieldChange',
            delegate: 'field',
            scope: me
        });

        form.setRecord(record);

        me.sheet = sheet = grid.add({
            xtype: 'sheet',
            items: [toolbar, form],
            hideOnMaskTap: true,
            enter: 'right',
            exit: 'right',
            right: 0,
            width: 320,
            layout: 'fit',
            stretchY: true,
            hidden: true
        });

        if (me.getEnableDeleteButton()) {
            form.add({
                xtype: 'button',
                text: 'Delete',
                ui: 'decline',
                margin: 10,
                handler: function() {
                    grid.getStore().remove(record);
                    sheet.hide();
                }
            });
        }

        sheet.on('hide', 'onSheetHide', me);

        sheet.show();
    },

    privates: {
        onFieldChange: function() {
            this.submitButton.setDisabled(!this.form.isValid());
        },

        cleanup: function() {
            var me = this,
                form = me.form;

            if (form && !form.destroyed && form.clearFields) {
                form.removeAll(false);
            }

            me.form = me.sheet = Ext.destroy(me.sheet);
        }
    }
});
