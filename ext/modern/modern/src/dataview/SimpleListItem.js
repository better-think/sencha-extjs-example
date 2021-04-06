/**
 * This component is the default data item used by {@link Ext.dataview.List}.
 *
 * This component supports disclosure icons and generates the slimmest markup possible for
 * a list data item. It doesn't support container functionality like adding or docking
 * items. To enable those features, use {@link Ext.dataview.ListItem} instead:
 *
 *      {
 *          xtype: 'list',
 *          itemConfig: {
 *              xtype: 'listitem'
 *          }
 *      }
 */
Ext.define('Ext.dataview.SimpleListItem', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.dataview.component.SimpleListItem',
    xtype: 'simplelistitem',

    mixins: [
        'Ext.dataview.Disclosable', // must come before Toolable
        'Ext.mixin.Toolable',
        'Ext.dataview.GenericItem',
        'Ext.dataview.Pinnable'
    ],

    classCls: Ext.baseCSSPrefix + 'listitem',

    inheritUi: true,

    html: '\xA0',

    template: [{
        reference: 'bodyElement',
        cls: Ext.baseCSSPrefix + 'body-el',
        uiCls: 'body-el',
        children: [{
            reference: 'innerElement',
            cls: Ext.baseCSSPrefix + 'inner-el',
            uiCls: 'inner-el'
        }]
    }],

    doDestroy: function() {
        this.mixins.toolable.doDestroy.call(this);
        this.callParent();
    },

    // It must be initialized as focusable, but must never respond itself.
    // It is a slave of the NavigationModel
    handleFocusEvent: Ext.emptyFn,

    updateRecord: function(record) {
        var me = this,
            dataview, data;

        if (me.destroying || me.destroyed) {
            return;
        }

        dataview = me.parent;
        data = dataview && dataview.gatherData(record);

        me.updateData(data);

        me.syncDisclosure(record);
    },

    updateHtml: function(html, oldHtml) {
        this.callParent([this.handleEmptyText(html), oldHtml]);
    },

    privates: {
        getRenderTarget: function() {
            return this.innerElement;
        },

        invokeToolHandler: function(tool, handler, scope, args, e) {
            if (this.invokeDisclosure(tool, handler, e)) {
                return false;
            }

            return tool.invokeToolHandler(tool, handler, scope, args, e);
        }
    }
});
