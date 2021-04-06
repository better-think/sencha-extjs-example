/**
 * NestedList provides a miller column interface to navigate between nested sets
 * and provide a clean interface with limited screen real-estate.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *  var data = {
 *      text: 'Groceries',
 *      items: [{
 *          text: 'Drinks',
 *          items: [{
 *              text: 'Water',
 *              items: [{
 *                  text: 'Sparkling',
 *                  leaf: true
 *              }, {
 *                  text: 'Still',
 *                  leaf: true
 *              }]
 *          }, {
 *              text: 'Coffee',
 *              leaf: true
 *          }, {
 *              text: 'Espresso',
 *              leaf: true
 *          }, {
 *              text: 'Redbull',
 *              leaf: true
 *          }, {
 *              text: 'Coke',
 *              leaf: true
 *          }, {
 *              text: 'Diet Coke',
 *              leaf: true
 *          }]
 *      }, {
 *          text: 'Fruit',
 *          items: [{
 *              text: 'Bananas',
 *              leaf: true
 *          }, {
 *              text: 'Lemon',
 *              leaf: true
 *          }]
 *      }, {
 *          text: 'Snacks',
 *          items: [{
 *              text: 'Nuts',
 *              leaf: true
 *          }, {
 *              text: 'Pretzels',
 *              leaf: true
 *          }, {
 *              text: 'Wasabi Peas',
 *              leaf: true
 *          }]
 *      }]
 * };
 *
 * Ext.define('ListItem', {
 *     extend: 'Ext.data.Model',
 *     config: {
 *         fields: [{
 *             name: 'text',
 *             type: 'string'
 *         }]
 *     }
 * });
 *
 * var store = Ext.create('Ext.data.TreeStore', {
 *     model: 'ListItem',
 *     defaultRootProperty: 'items',
 *     root: data
 * });
 *
 * var nestedList = Ext.create('Ext.NestedList', {
 *     fullscreen: true,
 *     title: 'Groceries',
 *     displayField: 'text',
 *     store: store
 * });
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container layout="fit">
 *     <ext-nestedlist
 *         displayField="text"
 *         height="600px"
 *         title="Groceries"
 *         onready="nestedlist.readyNestedList"
 *     >
 *     </ext-nestedlist>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', tab: 2, packages: ['ext-web-components']})
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-nestedlist.component';
 * 
 * export default class NestedListComponent {
 *     constructor() {
 *         this.store = Ext.create('Ext.data.TreeStore', {
 *             defaultRootProperty: 'items',
 *             root: {
 *                 text: 'Groceries',
 *                 items: [{
 *                     text: 'Drinks',
 *                     items: [{
 *                         text: 'Water',
 *                         items: [{
 *                             text: 'Sparkling',
 *                             leaf: true
 *                         }, {
 *                             text: 'Still',
 *                             leaf: true
 *                         }]
 *                     }]
 *                 },{
 *                 text: 'Snacks',
 *                 items: [{
 *                     text: 'Nuts',
 *                     leaf: true
 *                  }, {
 *                     text: 'Pretzels',
 *                     leaf: true
 *                  }, {
 *                     text: 'Wasabi Peas',
 *                     leaf: true
 *                  }]
 *                }]
 *            }
 *         });
 *    }
 *    readyNestedList(event) {
 *        this.nestedListView = event.detail.cmp;
 *        this.nestedListView.setStore(this.store);
 *    }  
 * }
 *
 * window.nestedlist = new NestedListComponent();
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react'
 * import { ExtNestedList } from '@sencha/ext-react';
 *
 * export default class MyExample extends Component {
 *
 *     store = Ext.create('Ext.data.TreeStore', {
 *         defaultRootProperty: 'items',
 *         root: {
 *             text: 'Groceries',
 *             items: [{
 *                 text: 'Drinks',
 *                 items: [{
 *                     text: 'Water',
 *                     items: [{
 *                         text: 'Sparkling',
 *                         leaf: true
 *                     }, {
 *                         text: 'Still',
 *                         leaf: true
 *                     }]
 *                 }]
 *             },{
 *                 text: 'Snacks',
 *                 items: [{
 *                     text: 'Nuts',
 *                     leaf: true
 *                 }, {
 *                     text: 'Pretzels',
 *                     leaf: true
 *                 }, {
 *                     text: 'Wasabi Peas',
 *                     leaf: true
 *                 }]
 *             }]
 *         }
 *     });
 *
 *     render() {
 *         return (
 *             <ExtNestedList
 *                 displayField="text"
 *                 store={this.store}
 *                 title="Groceries"
 *             />
 *         )
 *     }
 * }
 * ```
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
 *              <ExtNestedList 
 *                 [displayField]="'text'"
 *                 [height]="'600px'"
 *                 [store]="this.store"
 *                 title="Groceries"
 *             ></ExtNestedList>
 *             `
 * })
 * export class AppComponent {
 *     store = Ext.create('Ext.data.TreeStore', {
 *         defaultRootProperty: 'items',
 *         root: {
 *             text: 'Groceries',
 *             items: [{
 *                 text: 'Drinks',
 *                 items: [{
 *                     text: 'Water',
 *                     items: [{
 *                         text: 'Sparkling',
 *                         leaf: true
 *                     }, {
 *                         text: 'Still',
 *                         leaf: true
 *                     }]
 *                 }]
 *             },{
 *                 text: 'Snacks',
 *                 items: [{
 *                     text: 'Nuts',
 *                     leaf: true
 *                 }, {
 *                     text: 'Pretzels',
 *                     leaf: true
 *                 }, {
 *                     text: 'Wasabi Peas',
 *                     leaf: true
 *                 }]
 *             }]
 *         }
 *     });
 *
 * }
 * ```
 */
Ext.define('Ext.dataview.NestedList', {
    alternateClassName: 'Ext.NestedList',
    extend: 'Ext.Container',
    xtype: 'nestedlist',
    requires: [
        'Ext.layout.Card',
        'Ext.dataview.List',
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.XTemplate',
        'Ext.data.StoreManager',
        'Ext.data.TreeStore',
        'Ext.data.NodeStore'
    ],

    config: {
        /**
         * @cfg {String/Object/Boolean} cardSwitchAnimation
         * Animation to be used during transitions of cards.
         * @removed 2.0.0 please use {@link Ext.layout.Card#animation}
         */

        /**
         * @cfg {String} backText
         * The label to display for the back button.
         * @accessor
         */
        backText: 'Back',

        /**
         * @cfg {Boolean} useTitleAsBackText
         * `true` to use title as a label for back button.
         * @accessor
         */
        useTitleAsBackText: true,

        /**
         * @cfg {Boolean} updateTitleText
         * Update the title text with the currently selected category.
         * @accessor
         */
        updateTitleText: true,

        /**
         * @cfg {String} displayField
         * Display field to use when setting item text and title.
         * This configuration is ignored when overriding {@link #getItemTextTpl} or
         * {@link #getTitleTextTpl} for the item text or title.
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {String} loadingText
         * Loading text to display when a subtree is loading.
         * @accessor
         */
        loadingText: 'Loading...',

        /**
         * @cfg {String} emptyText
         * Empty text to display when a subtree is empty.
         * @accessor
         */
        emptyText: 'No items available.',

        /**
         * @cfg {Boolean/Function} onItemDisclosure
         * Maps to the {@link Ext.List#onItemDisclosure} configuration for individual lists.
         * @accessor
         */
        onItemDisclosure: false,

        /**
         * @cfg {Boolean} allowDeselect
         * Set to `true` to allow the user to deselect leaf items via interaction.
         * @accessor
         */
        allowDeselect: false,

        /**
         * @deprecated 2.0.0 Please set the {@link #toolbar} configuration to `false` instead
         * @cfg {Boolean} useToolbar `true` to show the header toolbar.
         * @accessor
         */
        useToolbar: null,

        /**
         * @cfg {Ext.Toolbar/Object/Boolean} toolbar
         * The configuration to be used for the toolbar displayed in this nested list.
         * @accessor
         */
        toolbar: {
            docked: 'top',
            xtype: 'titlebar',
            ui: 'light',
            inline: true
        },

        /**
         * @cfg {String} title The title of the toolbar
         * @accessor
         */
        title: '',

        /**
         * @cfg {String} layout
         * @hide
         * @accessor
         */
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                duration: 250,
                direction: 'left'
            }
        },

        /**
         * @cfg {Ext.data.TreeStore/String} store The tree store to be used for this nested list.
         */
        store: null,

        /**
         * @cfg {Ext.Container} detailContainer The container of the `detailCard`.
         * A detailContainer is a reference to the container where a detail card
         * displays.
         *
         * See http://en.wikipedia.org/wiki/Miller_columns
         *
         * The two possible values for a detailContainer are undefined (default),
         * which indicates that a detailCard appear in the same container, or you
         * can specify a new container location. The default condition uses the
         * current List container.
         *
         * The following example shows creating a location for a detailContainer:
         *
         * var detailContainer = Ext.create('Ext.Container', {
         *     layout: 'card'
         * });
         *
         * var nestedList = Ext.create('Ext.NestedList', {
         *     store: treeStore,
         *     detailCard: true,
         *     detailContainer: detailContainer
         * });
         *
         * The default value is typically used for phone devices in portrait mode
         * where the small screen size dictates that the detailCard replace the
         * current container.
         * @accessor
         */
        detailContainer: undefined,

        /**
         * @cfg {Ext.Component} detailCard provides the information for a leaf
         * in a Miller column list. In a Miller column, users follow a
         * hierarchial tree structure to a leaf, which provides information
         * about the item in the list. The detailCard lists the information at
         * the leaf.
         *
         * See http://en.wikipedia.org/wiki/Miller_columns
         *
         * @accessor
         */
        detailCard: null,

        /**
         * @cfg {Object} backButton The configuration for the back button used in the nested list.
         */
        backButton: {
            hidden: true
        },

        /**
         * @cfg {Object} listConfig An optional config object which is merged with the default
         * configuration used to create each nested list.
         */
        listConfig: null,

        /**
         * @cfg {Boolean} variableHeights
         * This configuration allows you optimize the picker by not having it read the DOM 
         * heights of list items.
         */
        variableHeights: false,

        /**
         * @private
         */
        lastNode: null,

        /**
         * @private
         */
        lastActiveList: null,

        ui: null,

        clearSelectionOnListChange: true
    },

    baseCls: Ext.baseCSSPrefix + 'nested-list',

    /**
     * @private
     * @property {String} [listMode=title]
     * This hold the current list mode, values could be: `title`, `node`, `deep`. `title` when the 
     * list is at the top level, `node` for first level and `deep` for any level lower than that.
     * This will be used by the `updateTitle` method in order to change the appropriate component's 
     * text value.
     */
    listMode: 'title',

    /**
     * @event itemtap
     * Fires when a node is tapped on.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Number} index The index of the item tapped.
     * @param {Ext.dom.Element} target The element tapped.
     * @param {Ext.data.Record} record The record tapped.
     * @param {Ext.event.Event} e The event object.
     */

    /**
     * @event itemdoubletap
     * Fires when a node is double tapped on.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Number} index The index of the item that was tapped.
     * @param {Ext.dom.Element} target The element tapped.
     * @param {Ext.data.Record} record The record tapped.
     * @param {Ext.event.Event} e The event object.
     */

    /**
     * @event containertap
     * Fires when a tap occurs and it is not on a template node.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Ext.event.Event} e The raw event object.
     */

    /**
     * @event select
     * Fires when nodes are selected.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Array} selections Array of selected nodes.
     */

    /**
     * @event deselect
     * Fires when nodes are deselected.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Array} selections Array of deselected nodes.
     */

    /**
     * @event selectionchange
     * Fires when the selected nodes change.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {Array} selections Array of nodes selected or deselected.
     */

    /**
     * @event beforeselectionchange
     * Fires before a selection is made.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.dataview.List} list The Ext.dataview.List that is currently active.
     * @param {HTMLElement} node The node to be selected.
     * @param {Array} selections Array of currently selected nodes.
     * @deprecated 2.0.0 Please listen to the {@link #selectionchange} event with an order of 
     * `before` instead.
     */

    /**
     * @event listchange
     * Fires when the user taps a list item.
     * @param {Ext.dataview.NestedList} this
     * @param {Object} listitem The new active list.
     */

    /**
     * @event leafitemtap
     * Fires when the user taps a leaf list item.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.List} list The subList the item is on.
     * @param {Number} index The index of the item tapped.
     * @param {Ext.dom.Element} target The element tapped.
     * @param {Ext.data.Record} record The record tapped.
     * @param {Ext.event.Event} e The event.
     */

    /**
     * @event back
     * @preventable
     * Fires when the user taps Back.
     * @param {Ext.dataview.NestedList} this
     * @param {HTMLElement} node The node to be selected.
     * @param {Ext.dataview.List} lastActiveList The Ext.dataview.List that was last active.
     * @param {Boolean} detailCardActive Flag set if the detail card is currently active.
     */

    /**
     * @event beforeload
     * Fires before a request is made for a new data object.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.data.Store} store The store instance.
     * @param {Ext.data.Operation} operation The Ext.data.Operation object that will be passed 
     * to the Proxy to load the Store.
     */

    /**
     * @event load
     * Fires whenever records have been loaded into the store.
     * @param {Ext.dataview.NestedList} this
     * @param {Ext.data.Store} store The store instance.
     * @param {Ext.util.Grouper[]} records An array of records.
     * @param {Boolean} successful `true` if the operation was successful.
     * @param {Ext.data.Operation} operation The associated operation.
     */
    constructor: function(config) {
        if (Ext.isObject(config)) {
            if (config.getTitleTextTpl) {
                this.getTitleTextTpl = config.getTitleTextTpl;
            }

            if (config.getItemTextTpl) {
                this.getItemTextTpl = config.getItemTextTpl;
            }
        }

        this.callParent([config]);
    },

    changeListMode: function(node) {
        var me = this,
            store = me.getStore(),
            rootNode = store && store.getRoot();

        if (node === rootNode) {
            me.listMode = 'title';
        }
        else if (node.parentNode === rootNode) {
            me.listMode = 'node';
        }
        else {
            me.listMode = 'deep';
        }
    },

    onChildInteraction: function() {
        if (this.isGoingTo) {
            return false;
        }
    },

    applyDetailContainer: function(config) {
        if (!config) {
            config = this;
        }

        return config;
    },

    updateDetailContainer: function(newContainer, oldContainer) {
        if (newContainer) {
            newContainer.on('beforeactiveitemchange', 'onBeforeDetailContainerChange', this);
            newContainer.on('activeitemchange', 'onDetailContainerChange', this);
        }
    },

    onBeforeDetailContainerChange: function() {
        this.isGoingTo = true;
    },

    onDetailContainerChange: function() {
        this.isGoingTo = false;
    },

    /**
     * Called when an list item has been tapped.
     * @param {Ext.List} list The subList the item is on.
     * @param {Number} location The id of the item tapped.
     *
     * @private
     */
    onChildTap: function(list, location) {
        var me = this,
            hasListeners = me.hasListeners,
            record = location.record;

        if (me.onChildInteraction(list, location) === false) {
            return false;
        }

        if (hasListeners.childtap) {
            location.list = list;
            me.fireEvent('childtap', me, location);
        }

        if (hasListeners.itemtap) {
            me.fireEvent('itemtap',
                         me,
                         list,
                         location.viewIndex,
                         location.child,
                         record,
                         location.event
            );
        }

        if (record.isLeaf()) {
            if (hasListeners.leafchildtap) {
                location.list = list;
                me.fireEvent('leafchildtap', me, location);
            }

            if (hasListeners.leafitemtap) {
                me.fireEvent('leafitemtap',
                             me,
                             list,
                             location.viewIndex,
                             location.child,
                             record,
                             location.event
                );
            }

            me.goToLeaf(record);
        }
        else {
            this.goToNode(record);
        }
    },

    onBeforeSelect: function() {
        this.fireEvent.apply(this, [].concat('beforeselect',
                                             this,
                                             Array.prototype.slice.call(arguments))
        );
    },

    onContainerTap: function() {
        this.fireEvent.apply(this, [].concat('containertap',
                                             this,
                                             Array.prototype.slice.call(arguments))
        );
    },

    onSelect: function() {
        var args = Array.prototype.slice.call(arguments);

        this.fireEvent.apply(this, [].concat('select', this, args));
        this.onSelectionChange(args);
    },

    onDeselect: function() {
        var args = Array.prototype.slice.call(arguments);

        this.fireEvent.apply(this, [].concat('deselect', this, args));
        this.onSelectionChange(args);
    },

    onSelectionChange: function(args) {
        this.fireEvent.apply(this, [].concat('selectionchange', this, args));
    },

    onChildDoubleTap: function(list, location) {
        var me = this,
            hasListeners = me.hasListeners;

        if (hasListeners.childdoubletap) {
            location.list = list;
            me.fireEvent('childdoubletap', me, location);
        }

        if (hasListeners.itemdoubletap) {
            me.fireEvent('itemdoubletap',
                         me,
                         list,
                         location.viewIndex,
                         location.child,
                         location.record,
                         location.event
            );
        }
    },

    onStoreBeforeLoad: function() {
        var loadingText = this.getLoadingText();

        if (loadingText) {
            this.setMasked({
                xtype: 'loadmask',
                message: loadingText
            });
        }

        this.fireEvent.apply(this, [].concat('beforeload',
                                             this,
                                             Array.prototype.slice.call(arguments))
        );
    },

    onStoreLoad: function(store, records, successful, operation, parentNode) {
        this.setMasked(false);
        this.fireEvent.apply(this, [].concat('load', this, Array.prototype.slice.call(arguments)));

        if (store.indexOf(this.getLastNode()) === -1) {
            this.goToNode(store.getRoot());
        }
    },

    /**
     * Called when the backButton has been tapped.
     */
    onBackTap: function() {
        var me = this,
            node = me.getLastNode(),
            detailCard = me.getDetailCard(),
            detailCardActive = detailCard && me.getActiveItem() === detailCard,
            layout = me.getLayout(),
            animation = layout ? layout.getAnimation() : null,
            lastActiveList = me.getLastActiveList();

        if (!animation || !(animation && animation.isAnimating)) {
            this.fireAction('back',
                            [this, node, lastActiveList, detailCardActive],
                            'doBack',
                            null,
                            null,
                            'after'
            );
        }
    },

    doBack: function(me, node, lastActiveList, detailCardActive) {
        var layout = me.getLayout(),
            animation = layout ? layout.getAnimation() : null;

        if (detailCardActive && lastActiveList) {
            if (animation) {
                animation.setReverse(true);
            }

            me.setActiveItem(lastActiveList);
            me.setLastNode(node.parentNode);
            me.syncToolbar();
        }
        else {
            me.goToNode(node.parentNode);
        }
    },

    updateData: function(data) {
        if (!this.getStore()) {
            this.setStore(new Ext.data.TreeStore({
                root: data
            }));
        }
    },

    applyStore: function(store) {
        if (store) {
            if (Ext.isString(store)) {
                // store id
                store = Ext.data.StoreManager.get(store);
            }
            else {
                // store instance or store config
                if (!(store instanceof Ext.data.TreeStore)) {
                    store = Ext.factory(store, Ext.data.TreeStore, null);
                }
            }

            //<debug>
            if (!store) {
                Ext.Logger.warn("The specified Store cannot be found", this);
            }
            //</debug>
        }

        return store;
    },

    storeListeners: {
        rootchange: 'onStoreRootChange',
        load: 'onStoreLoad',
        beforeload: 'onStoreBeforeLoad'
    },

    updateStore: function(newStore, oldStore) {
        var me = this,
            listeners = this.storeListeners;

        listeners.scope = me;

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }

            oldStore.un(listeners);
        }

        if (newStore) {
            newStore.on(listeners);
            me.goToNode(newStore.getRoot());
        }
    },

    onStoreRootChange: function(store, node) {
        this.goToNode(node);
    },

    applyDetailCard: function(detailCard, oldDetailCard) {
        return Ext.factory(detailCard,
                           Ext.Component,
                           detailCard === null ? oldDetailCard : undefined
        );
    },

    applyBackButton: function(config) {
        var toolbar = this.getToolbar();

        return !toolbar ? false : Ext.factory(config, Ext.Button, this.getBackButton());
    },

    updateBackButton: function(newButton, oldButton) {
        var me = this;

        if (newButton) {
            newButton.on('tap', me.onBackTap, me);
            newButton.setText(me.getBackText());

            if (me.$backButtonContainer) {
                me.$backButtonContainer.insert(0, newButton);
            }
            else {
                me.getToolbar().insert(0, newButton);
            }
        }
        else if (oldButton) {
            oldButton.destroy();
        }
    },

    applyToolbar: function(config) {
        var containerConfig;

        if (config && config.splitNavigation) {
            Ext.apply(config, {
                docked: 'top',
                xtype: 'titlebar',
                ui: 'light'
            });

            containerConfig = (config.splitNavigation === true)
                ? {}
                : config.splitNavigation;

            this.$backButtonContainer = this.add(Ext.apply({
                xtype: 'toolbar',
                docked: 'bottom',
                hidden: true,
                ui: 'dark'
            }, containerConfig));
        }

        return Ext.factory(config, Ext.TitleBar, this.getToolbar());
    },

    updateToolbar: function(newToolbar, oldToolbar) {
        var me = this;

        if (newToolbar) {
            newToolbar.setTitle(me.getTitle());

            if (!newToolbar.getParent()) {
                me.add(newToolbar);
            }
        }
        else if (oldToolbar) {
            oldToolbar.destroy();
        }
    },

    updateUseToolbar: function(newUseToolbar, oldUseToolbar) {
        if (!newUseToolbar) {
            this.setToolbar(false);
        }
    },

    updateTitle: function(newTitle) {
        var me = this,
            backButton = me.getBackButton();

        if (me.getUpdateTitleText()) {
            if (me.listMode === 'title') {
                me.setToolbarTitle(newTitle);
            }
            else if (backButton && me.getUseTitleAsBackText() && me.listMode === 'node') {
                backButton.setText(newTitle);
            }
        }
        else {
            me.setToolbarTitle(newTitle);
        }
    },

    /**
     * Override this method to provide custom template rendering of individual
     * nodes. The template will receive all data within the Record and will also
     * receive whether or not it is a leaf node.
     * @param {Ext.data.Record} node
     * @return {String}
     */
    getItemTextTpl: function(node) {
        return '{' + this.getDisplayField() + '}';
    },

    /**
     * Override this method to provide custom template rendering of titles/back
     * buttons when {@link #useTitleAsBackText} is enabled.
     * @param {Ext.data.Record} node
     * @return {String}
     */
    getTitleTextTpl: function(node) {
        return '{' + this.getDisplayField() + '}';
    },

    /**
     * @private
     */
    renderTitleText: function(node, forBackButton) {
        var initialTitle;

        if (!node.titleTpl) {
            node.titleTpl = Ext.create('Ext.XTemplate', this.getTitleTextTpl(node));
        }

        if (node.isRoot()) {
            initialTitle = this.getTitle();

            return (forBackButton && initialTitle === '')
                ? this.getInitialConfig('backText')
                : initialTitle;
        }

        return node.titleTpl.applyTemplate(node.data);
    },

    /**
     * Method to handle going to a specific node within this nested list. Node must be part of the
     * internal {@link #store}.
     * @param {Ext.data.NodeInterface} node The specified node to navigate to.
     */
    goToNode: function(node) {
        var me = this,
            activeItem, detailCard, detailCardActive, reverse, firstList,
            secondList, layout, animation, list;

        if (!node) {
            return;
        }

        activeItem = me.getActiveItem();
        detailCard = me.getDetailCard();
        detailCardActive = detailCard && me.getActiveItem() === detailCard;
        reverse = me.goToNodeReverseAnimation(node);
        firstList = me.firstList;
        secondList = me.secondList;
        layout = me.getLayout();
        animation = layout ? layout.getAnimation() : null;

        // if the node is a leaf, throw an error
        if (node.isLeaf()) {
            throw new Error('goToNode: passed a node which is a leaf.');
        }

        // if we are currently at the passed node, do nothing.
        if (node === me.getLastNode() && !detailCardActive) {
            return;
        }

        if (detailCardActive) {
            if (animation) {
                animation.setReverse(true);
            }

            list = me.getLastActiveList();
            list.getStore().setNode(node);
            node.expand();
            me.setActiveItem(list);
        }
        else {
            if (animation) {
                animation.setReverse(reverse);
            }

            if (firstList && secondList) {
                // firstList and secondList have both been created
                activeItem = me.getActiveItem();

                me.setLastActiveList(activeItem);
                list = (activeItem === firstList) ? secondList : firstList;

                list.getStore().setNode(node);
                node.expand();

                me.setActiveItem(list);

                if (me.getClearSelectionOnListChange()) {
                    list.deselectAll();
                }
            }
            else if (firstList) {
                // only firstList has been created
                me.setLastActiveList(me.getActiveItem());
                me.setActiveItem(me.getList(node));
                me.secondList = me.getActiveItem();
            }
            else {
                // no lists have been created
                me.setActiveItem(me.getList(node));
                me.firstList = me.getActiveItem();
            }
        }

        me.fireEvent('listchange', me, me.getActiveItem());

        me.setLastNode(node);
        me.changeListMode(node);
        me.syncToolbar();
    },

    /**
     * The leaf you want to navigate to. You should pass a node instance.
     * @param {Ext.data.NodeInterface} node The specified node to navigate to.
     */
    goToLeaf: function(node) {
        var me = this,
            card, container, sharedContainer, layout, animation, activeItem;

        if (!node.isLeaf()) {
            throw new Error('goToLeaf: passed a node which is not a leaf.');
        }

        card = me.getDetailCard();
        container = me.getDetailContainer();
        sharedContainer = container === me;
        layout = me.getLayout();
        animation = layout ? layout.getAnimation() : false;

        if (card) {
            if (container.getItems().indexOf(card) === -1) {
                container.add(card);
            }

            if (sharedContainer) {
                activeItem = me.getActiveItem();

                if (activeItem instanceof Ext.dataview.List) {
                    me.setLastActiveList(activeItem);
                }

                me.setLastNode(node);
            }

            if (animation) {
                animation.setReverse(false);
            }

            container.setActiveItem(card);
            me.syncToolbar();
        }
    },

    /**
     * @private
     * Method which updates the {@link #backButton} and {@link #toolbar} with 
     * the latest information from the current node.
     */
    syncToolbar: function(forceDetail) {
        var me = this,
            detailCard = me.getDetailCard(),
            node = me.getLastNode(),
            detailActive = forceDetail || (detailCard && (me.getActiveItem() === detailCard)),
            parentNode = (detailActive) ? node : node.parentNode,
            backButton = me.getBackButton(),
            toolbar = me.getToolbar(),
            splitNavigation;

        if (!toolbar) {
            return;
        }

        // show/hide the backButton, and update the backButton text, if one exists
        if (backButton) {
            splitNavigation = toolbar.getInitialConfig('splitNavigation');

            if (splitNavigation) {
                me.$backButtonContainer[parentNode ? 'show' : 'hide']();
            }

            backButton[parentNode ? 'show' : 'hide']();

            if (parentNode && me.getUseTitleAsBackText()) {
                backButton.setText(me.renderTitleText(node.parentNode, true));
            }
        }

        if (node) {
            me.setToolbarTitle(me.renderTitleText(node));
        }
    },

    updateBackText: function(newText) {
        var btn = this.getBackButton();

        if (btn) {
            btn.setText(newText);
        }
    },

    /**
     * @private
     * Returns `true` if the passed node should have a reverse animation from the 
     * previous current node.
     * @param {Ext.data.NodeInterface} node
     */
    goToNodeReverseAnimation: function(node) {
        var lastNode = this.getLastNode();

        if (!lastNode) {
            return false;
        }

        return (!lastNode.contains(node) && lastNode.isAncestor(node)) ? true : false;
    },

    /**
     * @private
     * Returns the list config for a specified node.
     * @param {HTMLElement} node The node for the list config.
     */
    getList: function(node) {
        var me = this,
            treeStore = new Ext.data.NodeStore({
                recursive: false,
                node: node,
                rootVisible: false,
                model: me.getStore().getModel(),
                proxy: 'memory'
            }),
            list;

        node.expand();

        list = Ext.create(Ext.Object.merge({
            xtype: 'list',
            pressedDelay: 250,
            autoDestroy: true,
            store: treeStore,
            onItemDisclosure: me.getOnItemDisclosure(),
            variableHeights: me.getVariableHeights(),
            emptyText: me.getEmptyText(),
            selectable: {
                deselectable: me.getAllowDeselect()
            },
            listeners: {
                scope: me,
                childdoubletap: 'onChildDoubleTap',
                beforeselectionchange: 'onBeforeSelect',
                containertap: 'onContainerTap',
                select: 'onSelect',
                deselect: 'onDeselect',
                childtap: {
                    fn: 'onChildTap',
                    priority: 1000
                },
                childtouchstart: {
                    fn: 'onChildInteraction',
                    priority: 1000
                }
            },
            itemTpl: '<span<tpl if="leaf == true"> class="x-list-item-leaf"</tpl>>' +
                      me.getItemTextTpl(node) +
                      '</span>'
        }, me.getListConfig()));

        me.relayEvents(list, ['activate']);

        return list;
    },
    privates: {
        /**
         * @private
         * This method will change the toolbar title without changing the List title.
         */
        setToolbarTitle: function(newTitle) {
            var me = this,
                toolbar = me.getToolbar();

            if (toolbar) {
                toolbar.setTitle(newTitle);
            }
        }
    }
});

