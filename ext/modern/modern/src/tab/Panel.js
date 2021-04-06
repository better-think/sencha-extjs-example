/**
 * Tab Panels are a great way to allow the user to switch between several 
 * pages that are all full screen. Each
 * Component in the Tab Panel gets its own Tab, which shows the Component when tapped on. 
 * Tabs can be positioned at the top or the bottom of the Tab Panel, 
 * and can optionally accept title and icon configurations 
 * (see {@link Ext.Button#iconCls iconCls} for additional information).
 *
 * Here's how we can set up a simple Tab Panel with tabs at the bottom.
 * Use the controls at the top left of the example
 * to toggle between code mode and live preview mode 
 * (you can also edit the code and see your changes in the live
 * preview):
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * Ext.create('Ext.TabPanel', {
 *     fullscreen: true,
 *     tabBarPosition: 'bottom',
 *
 *     items: [
 *         {
 *             title: 'Home',
 *             iconCls: 'home',
 *             html: 'Home Screen'
 *         },
 *         {
 *             title: 'Contact',
 *             iconCls: 'user',
 *             html: 'Contact Screen'
 *         }
 *     ]
 * });
 * ```
 * One tab was created for each of the {@link Ext.Panel panels} defined in the items array. 
 * Each tab automatically uses the title and icon defined on the item configuration, 
 * and switches to that item when tapped on. We can also position
 * the tab bar at the top, which makes our Tab Panel look like this:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 * Ext.create('Ext.TabPanel', {
 *     fullscreen: true,
 *
 *     items: [
 *         {
 *             title: 'Home',
 *             html: 'Home Screen'
 *         },
 *         {
 *             title: 'Contact',
 *             html: 'Contact Screen'
 *         }
 *     ]
 * });
 * ```
 * 
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 *  <ext-tabpanel
 *   flex="1"
 *   shadow="true"
 *   height="100%"
 *   defaults='{"cls": "card","layout": "center"}'
 *  >
 *      <ext-panel title="Tab 1" layout="center">
 *          <ext-container
 *              flex="1"
 *              html="By default, tabs are aligned to the top of a view."
 *          >
 *          </ext-container>
 *      </ext-panel>
 *      <ext-panel flex="1" title="Tab 2" layout="center">
 *          <ext-container
 *            flex="1"
 *            html=
 *              "A TabPanel can use different animations by setting <code>layout.animation.</code>"
 *          >
 *          </ext-container>
 *      </ext-panel>
 *      <ext-panel title="Tab 3" layout="center">
 *          <ext-container cls="action" html="User tapped Tab 3"></ext-container>
 *      </ext-panel>
 *  </ext-tabpanel>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', tab: 2, packages: ['ext-web-components']})
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-tabpanel.component';
 *  
 * export default class PanelComponent {}
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react'
 * import { ExtContainer, ExtTabPanel } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *     render() {
 *         return (
 *             <ExtTabPanel>
 *                 <ExtContainer title="Tab 1">
 *                     This is content for Tab 1!
 *                 </ExtContainer>
 *                 <ExtContainer title="Tab 2">
 *                     This is content for Tab 2!
 *                 </ExtContainer>
 *                 <ExtContainer title="Tab 3">
 *                     This is content for Tab 3!
 *                 </ExtContainer>
 *             </ExtTabPanel>
 *         )
 *     }
 * }
 * ```
 *
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 * import { Component } from '@angular/core'
 * declare var Ext: any;
 *
 * @Component({
 *     selector: 'app-root-1',
 *     styles: [`
 *             `],
 *     template: `
 *             <ExtTabPanel shadow="true">
 *                 <ExtContainer [title]="'Tab 1'">
 *                     This is content for Tab 1!
 *                 </ExtContainer>
 *                 <ExtContainer [title]="'Tab 2'">
 *                     This is content for Tab 2!
 *                 </ExtContainer>
 *                 <ExtContainer [title]="'Tab 3'">
 *                     This is content for Tab 3!
 *                 </ExtContainer>
 *             </ExtTabPanel>
 *             `
 * })
 * export class AppComponent {
 * }
 * ```
 *
 */
Ext.define('Ext.tab.Panel', {
    extend: 'Ext.Container',
    xtype: 'tabpanel',
    alternateClassName: 'Ext.TabPanel',
    isTabPanel: true,

    requires: [
        'Ext.layout.Card',
        'Ext.tab.Bar',
        'Ext.tab.Tab'
    ],

    config: {

        /**
         * @cfg {Boolean} autoOrientAnimation
         * Determines whether the slide animation should be automatically oriented depending on the 
         * TabBar position. When position is 'top' or 'bottom' it will slide left and when 
         * position is 'left' or 'right' it will slide up
         * @accessor
         */
        autoOrientAnimation: null,

        /**
         * @cfg {Object} tabBar
         * An Ext.tab.Bar configuration.
         * @accessor
         */
        tabBar: true,

        /**
         * @cfg {String} tabBarPosition
         * The docked position for the {@link #tabBar} instance.
         * Possible values are 'top', 'bottom', 'left' and 'right'.
         * @accessor
         */
        tabBarPosition: 'top',

        /**
         * @cfg {String} tabRotation
         * Specifies tab rotation. Possible values are 'default', 'left',
         * 'none', 'right'.
         * @accessor
         */
        tabRotation: "default",

        /**
         * @cfg layout
         * @inheritdoc
         */
        layout: {
            type: 'card',
            animation: {
                type: 'slide'
            }
        },

        /**
         * @cfg cls
         * @inheritdoc
         */
        cls: Ext.baseCSSPrefix + 'tabpanel'

        /**
         * @cfg {Boolean/String/Object} scrollable
         * @accessor
         * @hide
         */

        /**
         * @cfg {Boolean/String/Object} scroll
         */
    },

    defaults: {
        allowHeader: false
    },

    initialize: function() {
        var me = this;

        me.callParent();

        me.on({
            beforeactivetabchange: 'doTabChange',
            delegate: '> tabbar',
            scope: me
        });

        me.on({
            disabledchange: 'onItemDisabledChange',
            delegate: '> component',
            scope: me
        });
    },

    /**
     * Tab panels should not be scrollable. Instead, you should add scrollable to any item that
     * you want to scroll.
     * @private
     */
    applyScrollable: function() {
        return false;
    },

    updateTabRotation: function(rotation) {
        var bar = this.getTabBar();

        if (bar) {
            bar.setTabRotation(rotation);
        }
    },

    /**
     * Updates the Ui for this component and the {@link #tabBar}.
     */
    updateUi: function(ui, oldUi) {
        var bar;

        this.callParent([ui, oldUi]);

        bar = this.getTabBar();

        if (this.initialized && bar) {
            bar.setUi(ui);
        }
    },

    /**
     * @private
     */
    updateActiveItem: function(newActiveItem, oldActiveItem) {
        var items, oldIndex, newIndex, tabBar,
            oldTab, newTab;

        if (!newActiveItem) {
            return;
        }

        items = this.getInnerItems();
        oldIndex = items.indexOf(oldActiveItem);
        newIndex = items.indexOf(newActiveItem);
        tabBar = this.getTabBar();
        oldTab = tabBar.parseActiveTab(oldIndex);
        newTab = tabBar.parseActiveTab(newIndex);

        this.callParent(arguments);

        if (newIndex !== -1) {
            this.forcedChange = true;
            tabBar.setActiveTab(newIndex);
            this.forcedChange = false;

            if (oldTab) {
                oldTab.setActive(false);
            }

            if (newTab) {
                newTab.setActive(true);
            }
        }
    },

    /**
     * Updates this container with the new active item.
     * @param {Object} tabBar
     * @param {Object} newTab
     * @return {Boolean}
     */
    doTabChange: function(tabBar, newTab) {
        var oldActiveItem = this.getActiveItem(),
            newActiveItem;

        this.setActiveItem(tabBar.indexOf(newTab));
        newActiveItem = this.getActiveItem();

        return this.forcedChange || oldActiveItem !== newActiveItem;
    },

    /**
     * Creates a new {@link Ext.tab.Bar} instance using {@link Ext#factory}.
     * @param {Object} config
     * @return {Object}
     * @private
     */
    applyTabBar: function(config) {
        var innerItems,
            activeItem;

        if (this.isConfiguring) {
            activeItem = this.initialConfig.activeItem || 0;
        }
        else {
            innerItems = this.getInnerItems();
            activeItem = innerItems.indexOf(this._activeItem);
        }

        if (config === true) {
            config = {};
        }

        if (config) {
            Ext.applyIf(config, {
                ui: this.getUi(),
                docked: this.getTabBarPosition(),
                activeItem: activeItem
            });

            return Ext.factory(config, Ext.tab.Bar, this.getTabBar());
        }

        return null;
    },

    /**
     * Adds the new {@link Ext.tab.Bar} instance into this container.
     * @private
     */
    updateTabBar: function(tabBar, oldTabBar) {
        var me = this;

        if (oldTabBar && me.removingTabBar === undefined) {
            me.remove(oldTabBar, true);
        }

        if (tabBar) {
            me.add(tabBar);
            me.setTabBarPosition(tabBar.getDocked());
        }
    },

    doAutoOrientAnimation: function() {
        var position = this.getTabBarPosition(),
            layout = this.getLayout(),
            direction = position === 'left' || position === 'right' ? 'top' : 'left';

        layout.setAnimation({ type: 'slide', direction: direction });
    },

    updateAutoOrientAnimation: function(value) {
        var layout = this.getLayout(),
            initialLayout = this.getInitialConfig('layout');

        if (value) {
            this.doAutoOrientAnimation();
        }
        else {
            layout.setAnimation(initialLayout.animation);
        }
    },

    /**
     * Updates the docked position of the {@link #tabBar}.
     * @private
     */
    updateTabBarPosition: function(position) {
        var tabBar = this.getTabBar(),
            autoOrientAnimation = this.getAutoOrientAnimation();

        if (tabBar) {
            tabBar.setDocked(position);

            if (autoOrientAnimation) {
                this.doAutoOrientAnimation();
            }
        }
    },

    onItemAdd: function(card, itemIndex) {
        var me = this;

        if (!card.isInnerItem()) {
            return me.callParent([card, itemIndex]);
        }

        // eslint-disable-next-line vars-on-top
        var tabBar = me.getTabBar(),
            initialConfig = card.getInitialConfig(),
            tabConfig = initialConfig.tab || {},
            tabTitle = (card.getTitle) ? card.getTitle() : initialConfig.title,
            tabClosable = (card.getClosable) ? card.getClosable() : initialConfig.closable,
            tabIconAlign = (card.getIconAlign) ? card.getIconAlign() : initialConfig.iconAlign,
            tabIconCls = (card.getIconCls) ? card.getIconCls() : initialConfig.iconCls,
            tabIcon = (card.getIcon) ? card.getIcon() : initialConfig.icon,
            tabHidden = (card.getHidden) ? card.getHidden() : initialConfig.hidden,
            tabDisabled = (card.getDisabled) ? card.getDisabled() : initialConfig.disabled,
            tabBadgeText = (card.getBadgeText) ? card.getBadgeText() : initialConfig.badgeText,
            innerItems = me.getInnerItems(),
            index = innerItems.indexOf(card),
            tabs = tabBar.query('> tab'),
            activeTab = tabBar.getActiveTab(),
            currentTabInstance = (tabs.length >= innerItems.length) && tabs[index],
            header = card.getConfig('header', false, true),
            tabInstance;

        if (tabTitle && !tabConfig.title) {
            tabConfig.title = tabTitle;
        }

        if (tabClosable && !tabConfig.closable) {
            tabConfig.closable = tabClosable;
        }

        if (tabIconAlign && !tabConfig.iconAlign) {
            tabConfig.iconAlign = tabIconAlign;
        }

        if (tabIconCls && !tabConfig.iconCls) {
            tabConfig.iconCls = tabIconCls;
        }

        if (tabIcon && !tabConfig.icon) {
            tabConfig.icon = tabIcon;
        }

        if (tabHidden && !tabConfig.hidden) {
            tabConfig.hidden = tabHidden;
        }

        if (tabDisabled && !tabConfig.disabled) {
            tabConfig.disabled = tabDisabled;
        }

        if (tabBadgeText && !tabConfig.badgeText) {
            tabConfig.badgeText = tabBadgeText;
        }

        //<debug>
        if (!currentTabInstance && !tabConfig.title && !tabConfig.iconCls) {
            if (!tabConfig.title && !tabConfig.iconCls) {
                Ext.Logger.error('Adding a card to a tab container' +
                                 'without specifying any tab configuration');
            }
        }
        //</debug>

        tabInstance = Ext.factory(tabConfig, Ext.tab.Tab, currentTabInstance);

        if (!currentTabInstance) {
            tabBar.insert(index, tabInstance);
        }

        card.tab = tabInstance;
        tabInstance.card = card;

        // If there is an instantiated header, then hide it.
        // Otherwise, ensure there won't be a header.
        if (header) {
            header.setHidden(true);
        }

        me.callParent([card, index]);

        if (!activeTab && activeTab !== 0) {
            tabBar.setActiveTab(tabInstance);
        }
    },

    /**
     * If an item gets enabled/disabled and it has an tab, we should also enable/disable that tab
     * @private
     */
    onItemDisabledChange: function(item, newDisabled) {
        if (item && item.tab) {
            item.tab.setDisabled(newDisabled);
        }
    },

    // @private
    onItemRemove: function(item, index, destroying) {
        var me = this,
            meDestroying = me.destroying,
            clearBar, tabBar;

        if (!meDestroying) {
            tabBar = me.getTabBar();

            if (item === tabBar) {
                clearBar = me.removingTabBar === undefined;
            }
            else if (tabBar) {
                tabBar.remove(item.tab, true);
            }
        }

        me.callParent([item, index, destroying]);

        if (clearBar) {
            // Important to remove this after callParent so the layout can
            // process before we destroy it.
            me.removingTabBar = destroying;
            me.setTabBar(null);
            delete me.removingTabBar;
        }
    }
});
