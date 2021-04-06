/**
 * This component renders a simple line to separate menu items.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * Ext.create('Ext.Panel', {
 *     fullscreen: true,
 *
 *     items: {
 *         xtype: 'menu',
 *         floated: false,
 *         docked: 'top',
 *         items: [{
 *             text: 'Galactus'
 *         },{
 *             xtype: 'menuseparator'
 *         },{
 *             text: 'Darkseid'
 *         },{
 *             text: 'Thanos'
 *         }]
 *     }
 * });
 * ```
 *
 * @since 6.5.0
 */
Ext.define('Ext.menu.Separator', {
    extend: 'Ext.Component',
    xtype: 'menuseparator',

    isMenuSeparator: true,

    focusable: false,

    classCls: Ext.baseCSSPrefix + 'menuseparator',

    ariaRole: 'separator'
});
