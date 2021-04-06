/**
 * Panels are {@link Ext.Container containers} with an optional
 * {@link Ext.panel.Header header} that can be positioned using the
 * {@link #cfg-headerPosition headerPosition} config option.
 *
 * Panels add extra functionality by providing various options for configuring a header
 * that is docked inside the panel.  Setting any of the following panel config options
 * will automatically create a header:
 * - {@link #cfg-title title}
 * - {@link #cfg-iconCls iconCls}
 * - {@link #cfg-icon icon}
 * - {@link #cfg-tools tools}
 * - {@link #cfg-closable closable}
 *
 * It is also possible to configure the header directly using the {@link #header}
 * configuration. See {@link Ext.panel.Header} for more information.
 *
 * ### Simple Panel Example (with body text / html)
 *
 * Usually, Panels are used as constituents within an
 * {@link Ext.app.Application application}, in which case, they
 * would be used as child items of {@link Ext.Container Containers}, and would themselves
 * use {@link Ext.Component Ext.Components} as child {@link #cfg-items items}. However,
 * to illustrate simply rendering a Panel into the document, here's how to do it:
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *     Ext.create({
 *         xtype: 'panel',
 *         title: 'Panel Title',
 *         iconCls: 'x-fa fa-html5',
 *         height: 400,
 *         width: 400,
 *         bodyPadding: 12,
 *         html: 'Sample HTML text',
 *         renderTo: Ext.getBody()
 *     });
 * ```
 *
 * ### Panel Example (with child items)
 *
 * Panels are, by virtue of their inheritance from {@link Ext.Container}, capable of
 * being configured with a {@link Ext.Container#layout layout}, and containing child
 * {@link Ext.Component Components}.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *     Ext.create({
 *         xtype: 'panel',
 *         bodyPadding: true, // don't want content to crunch against the borders
 *         width: 300,
 *         title: 'Filters',
 *         items: [{
 *             xtype: 'datefield',
 *             label: 'Start date'
 *         }, {
 *             xtype: 'datefield',
 *             label: 'End date'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 * ```
 *
 * Panel also provides built-in {@link #cfg-collapsible collapsible, expandable}, and
 * {@link #cfg-closable closable} behavior. Panels can be easily dropped into any
 * {@link Ext.Container Container} or layout, and the layout and rendering pipeline
 * is {@link Ext.Container#method-add completely managed by the framework}.
 *
 * ### Floating Panels
 *
 * Panels are also useful as Overlays - containers that float over your application.
 * If configured with `{@link #cfg-anchor anchor}` set to `true`, when you
 * {@link #method-showBy showBy} another component, there will be an anchor arrow
 * pointing to the reference component.
 *
 * ```javascript
 * @example({ framework: 'extjs' })
 *     var panel = Ext.create({
 *         xtype: 'panel',
 *         title: 'Floated',
 *         bodyPadding: true,
 *         html: 'context panel text',
 *         // the panel will be hidden until shown
 *         floated: true,
 *         // adds the close tool in the panel header
 *         closable: true,
 *         // hides, rather than destroys the closed panel
 *         closeAction: 'hide',
 *         anchor: true
 *     });
 *
 *     Ext.create({
 *         xtype: 'button',
 *         text: 'Show Popup',
 *         margin: 20,
 *         // shows the floated panel next to the button
 *         handler: function () {
 *             panel.showBy(this, 'tl-bl');
 *         },
 *         renderTo: Ext.getBody()
 *     });
 * ```
 * ```javascript
 * @example({framework: 'ext-react', packages:['ext-react']})
 * import React, { Component } from 'react';
 * import { ExtContainer, ExtPanel, ExtButton } from '@sencha/ext-react';
 * Ext.require('Ext.Toast');
 *
 * export default class MyExample extends Component {
 * 	    render() {
 * 	        function toolHandler(owner, tool) {
 * 	            Ext.toast(`You clicked ${tool.config.type}`);
 *	        }
 *	        return (
 *	            <ExtContainer>
 *	                <ExtPanel
 *	                    shadow
 *	                    title="Panel"
 *	                    height={300}
 *	                    width={500}
 *	                    tools={[
 *	                        { type: 'minimize', handler: toolHandler },
 *	                        { type: 'refresh', handler: toolHandler },
 *	                        { type: 'save', handler: toolHandler },
 *	                        { type: 'search', handler: toolHandler },
 *	                        { type: 'close', handler: toolHandler }
 *	                    ]}
 *	                >
 *	                    <p>Panel Body</p>
 *	                </ExtPanel>
 *	                <ExtButton ui="action" handler={() => this.modal.cmp.show()}
 *                       margin="20 0 0 0" text="Show Modal"/>
 *	                <ExtPanel
 *	                    ref={modal => this.modal = modal}
 *	                    title="Floated Panel"
 *	                    modal
 *	                    floated
 *	                    centered
 *	                    hideOnMaskTap
 *	                    width={Ext.filterPlatform('ie10') ? '100%' :
 *                            (Ext.os.deviceType == 'Phone') ? 260 : 400}
 *	                    maxHeight={Ext.filterPlatform('ie10') ? '30%' :
 *                          (Ext.os.deviceType == 'Phone') ? 220 : 400}
 *	                    showAnimation={{
 *	                        type: 'popIn',
 *	                        duration: 250,
 *	                        easing: 'ease-out'
 *	                    }}
 *	                    hideAnimation={{
 *	                        type: 'popOut',
 *	                        duration: 250,
 *	                        easing: 'ease-out'
 *	                    }}
 *	                >
 *	                    <p>
 *	                        This is a modal, centered and floated panel.
 *                          hideOnMaskTap is true by default so we can tap anywhere
 *                          outside the overlay to hide it.
 *                      </p>
 *	                </ExtPanel>
 *	            </ExtContainer>
 *	        )
 *	    }
 *	}
 * ```
 * ```javascript
 * @example({framework: 'ext-angular', packages:['ext-angular']})
 * declare var Ext: any;
 * import {Component} from '@angular/core';
 * Ext.require('Ext.Toast');
 *
 * @Component({
 *		  selector: 'app-component',
 *		  template: `<ExtContainer>
 *		    <ExtPanel
 *		        [shadow]="true"
 *		        title="Panel"
 *		        [height]="300"
 *		        [width]="500"
 *		        (ready)="this.onMainPanelReady($event)"
 *		        [html]= "'<p>Panel Body</p>'"
 *		    >
 *		    </ExtPanel>
 *		    <ExtButton [ui]="'action'" (tap)="modalClick()"
 *              margin="20 0 0 0" text="Show Modal">
 *        </ExtButton>
 *		    <ExtPanel
 *		        title="Floated Panel"
 *		        [modal]="true"
 *		        [floated]="true"
 *		        [centered]="true"
 *		        hideOnMaskTap="true"
 *		        [width]="400"
 *		        maxHeight="400"
 *		        (ready)="this.onModalPanelReady($event)"
 *		        [showAnimation]="{
 *		        type: 'popIn',
 *		        duration: 250,
 *		        easing: 'ease-out'
 *		        }"
 *		        [hideAnimation]="{
 *		        type: 'popOut',
 *		        duration: 250,
 *		        easing: 'ease-out'
 *		        }"
 *		        [html]="'<p>This is a modal, centered and floated panel.
 *              hideOnMaskTap is true by default so we can tap anywhere
 *              outside the overlay to hide it.</p>'"
 *		    >
 *		    </ExtPanel>
 *		  </ExtContainer>`,
 *		  styles: [``]
 *		})
 *
 *		  export class AppComponent  {
 *		  mainPanel:any;
 *		  modalPanelCmp:any;
 *		  toolHandler = (owner, tool) => {
 *		     Ext.toast(`You clicked ${tool.config.type}`);
 *		  }
 *
 *		  onMainPanelReady = (event) => {
 *		    this.mainPanel = event.detail.cmp;
 *		    this.mainPanel.setTools([
 *		      { type: "minimize", handler: this.toolHandler.bind(this) },
 *		      { type: "refresh", handler: this.toolHandler.bind(this) },
 *		      { type: "save", handler: this.toolHandler.bind(this) },
 *		      { type: "search", handler: this.toolHandler.bind(this) },
 *		      { type: "close", handler: this.toolHandler.bind(this) }
 *		    ]);
 *		  }
 *
 *		  onModalPanelReady = (event) => {
 *		    this.modalPanelCmp = event.detail.cmp;
 *		  }
 *
 *		  modalClick = (owner, tool) => {
 *		    this.modalPanelCmp.show();
 *		  }
 *		}
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container>
 *    <ext-panel
 *        shadow="true"
 *        title="Panel"
 *        height="300"
 *        width="500"
 *        onready="mainPanel.onMainPanelReady"
 *    >
 *        <p>Panel Body</p>
 *    </ext-panel>
 *    <ext-button ui="action" ontap="mainPanel.modalClick"
 *      margin="20 0 0 0" text="Show Modal"></ext-button>
 *    <ext-panel
 *        title="Floated Panel"
 *        modal="true"
 *        floated="true"
 *        centered="true"
 *        hideOnMaskTap="true"
 *        width="400"
 *        maxHeight="400"
 *        onready="mainPanel.onModalPanelReady"
 *        showAnimation='{
 *             "type": "popIn",
 *             "duration": 250,
 *             "easing": "ease-out"
 *        }'
 *        hideAnimation='{
 *             "type": "popOut",
 *             "duration": 250,
 *             "easing": "ease-out"
 *        }'
 *    >
 *        <p>This is a modal, centered and floated panel.
 *          hideOnMaskTap is true by default so
 *          we can tap anywhere outside the overlay to hide it.</p>
 *    </ext-panel>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-button.component';
 * import '@sencha/ext-web-components/dist/ext-panel.component';
 *
 * Ext.require('Ext.Toast');
 *
 * export default class MainPanelComponent {
 *   toolHandler = (owner, tool) => {
 *      Ext.toast(`You clicked ${tool.config.type}`);
 *   }
 *
 *   onMainPanelReady = (event) => {
 *       this.mainPanel = event.detail.cmp;
 *       this.mainPanel.setTools([
 *          { type: "minimize", handler: this.toolHandler.bind(this) },
 *          { type: "refresh", handler: this.toolHandler.bind(this) },
 *          { type: "save", handler: this.toolHandler.bind(this) },
 *          { type: "search", handler: this.toolHandler.bind(this) },
 *          { type: "close", handler: this.toolHandler.bind(this) }
 *       ]);
 *   }
 *
 *   onModalPanelReady = (event) => {
 *      this.modalPanelCmp = event.detail.cmp;
 *   }
 *
 *   modalClick = (owner, tool) => {
 *      this.modalPanelCmp.show();
 *   }
 * }
 * window.mainPanel = new MainPanelComponent();
 * ```
 *
 * **Note:** By default, the `{@link #cfg-closable close}` header tool _destroys_ the
 * Panel resulting in removal of the Panel and the destruction of any descendant
 * Components. This makes the Panel object, and all its descendants **unusable**. To
 * enable the close tool to simply _hide_ a Panel for later re-use, configure the Panel
 * with `{@link #closeAction closeAction}: 'hide'`.
 */
Ext.define('Ext.Panel', {
    extend: 'Ext.Container',
    xtype: 'panel',
    alternateClassName: 'Ext.panel.Panel',
    isPanel: true,

    mixins: [
        'Ext.panel.Buttons',
        'Ext.mixin.Toolable'
    ],

    requires: [
        'Ext.layout.Box',
        'Ext.Toolbar'
    ],

    /**
     * @property defaultBindProperty
     * @inheritdoc
     */
    defaultBindProperty: 'title',

    config: {
        /**
         * @cfg {'top'/'right'/'bottom'/'left'} headerPosition
         * The position of the header. Ignored if no {@link #cfg-header} is created.
         *
         * @since 6.5.0
         */
        headerPosition: 'top',

        /**
         * @cfg {Boolean/Object} header
         * Pass as `false` to prevent a header from being created.
         *
         * You may also assign a header with a config object (optionally containing an
         * `xtype`) to custom-configure your panel's header.
         *
         * See {@link Ext.panel.Header} for all the options that may be specified here.
         */
        header: null,

        /**
         * @cfg icon
         * @inheritdoc Ext.panel.Header#cfg-icon
         */
        icon: null,

        /**
         * @cfg iconCls
         * @inheritdoc Ext.panel.Header#cfg-iconCls
         */
        iconCls: null,

        /**
         * @cfg [iconAlign='left']
         * @inheritdoc Ext.panel.Header#cfg-iconAlign
         */
        iconAlign: null,

        /**
         * @cfg title
         * @inheritdoc Ext.panel.Header#cfg-title
         */
        title: null,

        /**
         * @cfg [titleAlign='left']
         * @inheritdoc Ext.panel.Header#cfg-titleAlign
         */
        titleAlign: null,

        /**
         * @cfg {Boolean} [anchor=false]
         * Configure `true` to show an anchor element pointing to the target component
         * when this Panel is floating and {@link #showBy shown by} another component.
         */
        anchor: null,

        /**
         * @cfg {String} anchorPosition
         * Set the anchor position.
         *
         * @private
         */
        anchorPosition: null,

        /**
         * @cfg {Boolean} closable
         * True to display the 'close' tool button and allow the user to close the panel
         * or false to hide the button and disallow closing the window.
         *
         * By default, when close is requested by clicking the close button in the
         * header, the {@link #method-close} method will be called. This will
         * _{@link Ext.Component#method-destroy destroy}_ the Panel and its content
         * meaning that it may not be reused.
         *
         * To make closing a Panel _hide_ the Panel so that it may be reused, set
         * {@link #closeAction} to 'hide'.
         */
        closable: null,

        // eslint-disable-next-line max-len
        // @cmd-auto-dependency {aliasPrefix: "widget.", typeProperty: "xtype", defaultType: "toolbar"}
        /**
         * @cfg {Object/Object[]} bbar
         * Convenience config. Short for 'Bottom Bar'.
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         bbar: [{
         *             xtype: 'button',
         *             text : 'Button 1'
         *         }]
         *     });
         * ```
         *
         * is equivalent to
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         items: [{
         *             xtype: 'toolbar',
         *             docked: 'bottom',
         *             items: [{
         *                 xtype: 'button',
         *                 text: 'Button 1'
         *             }]
         *         }]
         *     });
         * ```
         *
         * @since 6.5.0
         */
        bbar: null,

        // eslint-disable-next-line max-len
        // @cmd-auto-dependency {aliasPrefix: "widget.", typeProperty: "xtype", defaultType: "toolbar"}
        /**
         * @cfg {Object/Object[]} lbar
         * Convenience config. Short for 'Left Bar' (left-docked, vertical toolbar).
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         lbar: [{
         *             xtype: 'button',
         *             text : 'Button 1'
         *         }]
         *     });
         * ```
         *
         * is equivalent to
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         items: [{
         *             xtype: 'toolbar',
         *             docked: 'left',
         *             items: [{
         *                 xtype: 'button',
         *                 text: 'Button 1'
         *             }]
         *         }]
         *     });
         * ```
         *
         * @since 6.5.0
         */
        lbar: null,

        // eslint-disable-next-line max-len
        // @cmd-auto-dependency {aliasPrefix: "widget.", typeProperty: "xtype", defaultType: "toolbar"}
        /**
         * @cfg {Object/Object[]} rbar
         * Convenience config. Short for 'Right Bar' (right-docked, vertical toolbar).
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         rbar: [{
         *             xtype: 'button',
         *             text : 'Button 1'
         *         }]
         *     });
         * ```
         *
         * is equivalent to
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         items: [{
         *             xtype: 'toolbar',
         *             docked: 'right',
         *             items: [{
         *                 xtype: 'button',
         *                 text: 'Button 1'
         *             }]
         *         }]
         *     });
         * ```
         *
         * @since 6.5.0
         */
        rbar: null,

        // eslint-disable-next-line max-len
        // @cmd-auto-dependency {aliasPrefix: "widget.", typeProperty: "xtype", defaultType: "toolbar"}
        /**
         * @cfg {Object/Object[]} tbar
         * Convenience config. Short for 'Top Bar'.
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         tbar: [{
         *             xtype: 'button',
         *             text : 'Button 1'
         *         }]
         *     });
         * ```
         *
         * is equivalent to
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         fullscreen: true,
         *         html: 'hello world',
         *         padding: 20,
         *         items: [{
         *             xtype: 'toolbar',
         *             docked: 'top',
         *             items: [{
         *                 xtype: 'button',
         *                 text: 'Button 1'
         *             }]
         *         }]
         *     });
         * ```
         *
         * @since 6.5.0
         */
        tbar: null
    },

    cachedConfig: {
        /**
         * @cfg border
         * @inheritdoc
         */
        border: false,

        /**
         * @cfg {Boolean} bodyBorder
         * Controls the border style of the panel body using the following values:
         *
         * - `true` to enable the border around the panel body (as defined by the theme)
         * Note that even when enabled, the bodyBorder is only visible when there are
         * docked items around the edges of the panel.  Where the bodyBorder touches the
         * panel's outer border it is automatically collapsed into a single border.
         *
         * - `false` to disable the body border
         *
         * - `null` - use the value of {@link #cfg-border border} as the value for
         * `bodyBorder`
         */
        bodyBorder: null,

        /**
         * @cfg {Number/Boolean/String} bodyPadding
         * A shortcut for setting a padding style on the body element. The value can
         * either be a number to be applied to all sides, or a normal CSS string
         * describing padding.
         *
         *     bodyPadding: 5 // 5px padding on all sides
         *
         *     bodyPadding: '10 20' // 10px top and bottom padding - 20px side padding
         *
         * *See the {@link Ext.dom.Element#static-method-unitizeBox unitizeBox} method
         * for more information on what string values are valid*
         */
        bodyPadding: null,

        /**
         * @cfg {String/Object} bodyStyle
         * Custom CSS styles to be applied to the panel's body element, which can be
         * supplied as a valid CSS style string or an object containing style property
         * name/value pairs.
         *
         * For example, these two formats are interpreted to be equivalent:
         *
         *     bodyStyle: 'background:#ffc; padding:10px;'
         *
         *     bodyStyle: {
         *         background: '#ffc',
         *         padding: '10px'
         *     }
         *
         * @accessor set
         * @since 6.5.0
         */
        bodyStyle: null,

        /**
         * @cfg {Object/Ext.Button[]} buttons
         * The buttons for this panel to be displayed in the `buttonToolbar` as a keyed
         * object (or array) of button configuration objects.
         *
         *```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         xtype: 'panel',
         *         html: 'hello world',
         *         padding: 20,
         *         buttons: {
         *            ok: {text: 'OK', handler: 'onOK'}
         *         }
         *     });
         * ```
         *
         * For buttons that are defined in `standardButtons` (such as `'ok'`), there is a
         * more convenient short-hand for this config:
         *
         * ```javascript
         * @example({ framework: 'extjs' })
         *     Ext.create({
         *         fullscreen: true,
         *         xtype: 'panel',
         *         html: 'hello world',
         *         padding: 20,
         *         buttons: {
         *            ok: 'onOK',
         *            cancel: 'onCancel'
         *         }
         *     });
         * ```
         *
         * The {@link #minButtonWidth} is used as the default
         * {@link Ext.Button#minWidth minWidth} for the buttons in the buttons toolbar.
         * @since 6.5.0
         */

        /**
         * @cfg {Object/Ext.Toolbar} buttonToolbar
         * Configure the toolbar that holds the `buttons` inside.
         * @since 6.5.0
         */
        buttonToolbar: {
            xtype: 'toolbar',
            itemId: 'buttonToolbar',
            docked: 'bottom',
            defaultType: 'button',
            weighted: true,
            ui: 'footer',
            defaultButtonUI: 'action',

            layout: {
                type: 'box',
                vertical: false,
                pack: 'center'
            }
        },

        /**
         * @cfg {String} closeAction
         * The action to take when the close header tool is clicked:
         *
         * - **`'{@link #method-destroy}'`** :
         *
         *   {@link #method-remove remove} the window from the DOM and
         *   {@link Ext.Component#method-destroy destroy} it and all descendant Components.
         *   The window will **not** be available to be redisplayed via the
         *   {@link #method-show} method.
         *
         * - **`'{@link #method-hide}'`** :
         *
         *   {@link #method-hide} the window by setting visibility to hidden and applying
         *   negative offsets. The window will be available to be redisplayed via the
         *   {@link #method-show} method.
         *
         * **Note:** This behavior has changed! setting *does* affect the {@link #method-close}
         * method which will invoke the appropriate closeAction.
         */
        closeAction: 'destroy',

        /**
         * @cfg {String} closeToolText
         * Text to be announced by screen readers when the **close**
         * {@link Ext.Tool tool} is focused.  Will also be set as the close tool's
         * {@link Ext.Tool#cfg-tooltip tooltip} text.
         *
         * **Note:** Applicable when the panel is {@link #closable}: true
         * @locale
         */
        closeToolText: 'Close panel'
    },

    /**
     * @property classCls
     * @inheritdoc
     */
    classCls: Ext.baseCSSPrefix + 'panel',

    headerCls: null,
    titleCls: null,
    toolCls: Ext.baseCSSPrefix + 'paneltool',
    sideCls: {
        top: Ext.baseCSSPrefix + 'top',
        right: Ext.baseCSSPrefix + 'right',
        bottom: Ext.baseCSSPrefix + 'bottom',
        left: Ext.baseCSSPrefix + 'left'
    },

    /**
     * @cfg manageBorders
     * @inheritdoc
     */
    manageBorders: true,

    allowHeader: true,

    /**
     * @property template
     * @inheritdoc
     */
    template: [{
        reference: 'bodyWrapElement',
        cls: Ext.baseCSSPrefix + 'body-wrap-el',
        uiCls: 'body-wrap-el',
        children: [{
            reference: 'bodyElement',
            cls: Ext.baseCSSPrefix + 'body-el',
            uiCls: 'body-el'
        }]
    }],

    initialize: function() {
        var me = this,
            scrollable;

        me.callParent();
        // TODO: make autoAutoRefresh public and remove this code from here
        scrollable = me.getScrollable();

        if (scrollable && scrollable.isVirtualScroller) {
            scrollable.setAutoRefresh(true);
        }
    },

    /**
     * Adds a CSS class to the body element. If not rendered, the class will be added
     * when the panel is rendered.
     * @param {String} cls The class to add
     * @return {Ext.Panel} this
     */
    addBodyCls: function(cls) {
        this.bodyElement.addCls(cls);

        return this;
    },

    /**
     * Removes a CSS class from the body element
     * @param {String} cls The class to remove
     * @return {Ext.Panel} this
     */
    removeBodyCls: function(cls) {
        this.bodyElement.removeCls(cls);

        return this;
    },

    applyBodyPadding: function(bodyPadding) {
        if (bodyPadding === true) {
            bodyPadding = 5;
        }

        if (bodyPadding) {
            bodyPadding = Ext.dom.Element.unitizeBox(bodyPadding);
        }

        return bodyPadding;
    },

    applyBodyStyle: function(bodyStyle, oldBodyStyle) {
        // If we're doing something with data binding, say:
        // style: {
        //     backgroundColor: 'rgba({r}, {g}, {b}, 1)'
        // }
        // The inner values will change, but the object won't, so force
        // a copy to be created here if necessary
        if (oldBodyStyle && bodyStyle === oldBodyStyle && Ext.isObject(oldBodyStyle)) {
            bodyStyle = Ext.apply({}, bodyStyle);
        }

        this.bodyElement.applyStyles(bodyStyle);

        return null;
    },

    //<debug>
    getBodyStyle: function() {
        Ext.Error.raise(
            "'bodyStyle' is a write-only config.  To query element styles use the " +
            "Ext.dom.Element API.");
    },
    //</debug>

    /**
     * Add tools to this panel {@link Ext.panel.Header header}
     *
     *     panel.addTool({
     *         type: 'gear',
     *         handler: function () {
     *             // ....
     *         }
     *     });
     *
     *     panel.addTool([{
     *         type: 'gear',
     *         handler: 'viewControllerGearMethod'
     *     }, {
     *         type: 'save',
     *         handler: 'viewControllerSaveMethod'
     *     }]);
     *
     * By default the tools will be accessible via keyboard, with the exception of
     * automatically added collapse/expand and close tools.
     *
     * If you implement keyboard equivalents of your tools' actions elsewhere and do not
     * want the tools to participate in keyboard navigation, you can make them
     * presentational instead:
     *
     *     panel.addTool({
     *         type: 'mytool',
     *         focusable: false,
     *         ariaRole: 'presentation'
     *         // ...
     *     });
     *
     * @param {Object/Object[]/Ext.Tool/Ext.Tool[]} tool The tool or tools to add.
     */
    addTool: function(tool) {
        var header = this.ensureHeader(),  // creates if header !== false
            items;

        if (header) {
            items = this.createTools(Ext.Array.from(tool));

            if (items && items.length) {
                items = header.add(items);
            }
        }

        return items;
    },

    applyHeader: function(newHeader, oldHeader) {
        // This method should never call any getters here doing so will cause re-entry into
        // this method. Extra Headers will be created
        var me = this,
            header = oldHeader,
            isTrue;

        me.allowHeader = newHeader !== false;

        if (oldHeader && !newHeader) {
            header = Ext.destroy(header);
        }

        if (newHeader && me.allowHeader) {
            isTrue = newHeader === true;

            if (header) {
                if (!isTrue) {
                    header.setConfig(newHeader);
                }
            }
            else {
                if (isTrue) {
                    newHeader = {};
                }

                newHeader.$initParent = me;
                header = Ext.factory(me.createHeader(newHeader));
                me.header = header;
                delete header.$initParent;
                delete newHeader.$initParent;

                // Must not use the parent linkage. That implies that this is in the
                // items collection, and available to be removed using the remove method.
                header.ownerCmp = me;

                (me.maxHeightElement || me.el).insertFirst(header.el);

                header.doInheritUi();
            }
        }

        return header || null;
    },

    updateHeader: function(header) {
        if (header) {
            this.positionHeader(header);
        }
        else {
            this.syncBorders();
        }
    },

    applyTools: function(tools) {
        var header = this.ensureHeader(),  // creates if header !== false
            items;

        if (header) {
            // Remove all tools (since we are the impl of a setTools([...]) call)
            header.clearTools();

            items = this.createTools(tools);

            if (items && items.length) {
                header.add(items);
            }
        }

        // we don't return anything since the tools are "stored" on the Header
    },

    /**
     * Closes this panel as described by the `closeAction`.
     */
    close: function() {
        var me = this,
            action = me.getCloseAction(),
            destroy = action === 'destroy';

        if (me.fireEvent('beforeclose', me) !== false) {
            if (action && !destroy) {
                me[action]();
            }

            me.fireEvent('close', me);

            if (destroy) {
                me.destroy();
            }
        }
    },

    createHeader: function(config) {
        var me = this,
            ret = {
                xtype: 'panelheader',
                instanceCls: me.headerCls,
                docked: 'top'
            },
            icon, title;

        me._isCreatingHeader = true;

        if (config && config !== true) {
            Ext.merge(ret, config);
        }

        if (me.initialized) {
            // Only attempt to configure title if we are not currently initializing.
            // During initialization the updater for title will run if present and apply
            // it to the header so there is no work to be done here.
            title = me.getTitle();

            if (title != null) {
                if (typeof title === 'string') {
                    title = {
                        text: title
                    };
                }

                Ext.merge(ret, {
                    title: title
                });
            }

            icon = me.getIconCls();

            if (icon != null) {
                ret.iconCls = icon;
            }
            else {
                icon = me.getIcon();

                if (icon != null) {
                    ret.icon = icon;
                }
            }
        }

        me._isCreatingHeader = false;

        return ret;
    },

    applyAnchor: function(anchor, oldAnchor) {
        var me = this,
            el = me.el.dom,
            svgEl, pathEl;

        // true results in us owning an anchor element in the anchor property
        if (anchor) {
            // Already have one - undefined means no change`
            if (oldAnchor) {
                return;
            }
            else {
                anchor = me.el.insertFirst({
                    cls: Ext.baseCSSPrefix + 'anchor-el'
                });
                svgEl = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                svgEl.setAttribute('class', Ext.baseCSSPrefix + 'pointer-el');
                pathEl = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                svgEl.appendChild(pathEl);
                anchor.dom.appendChild(svgEl);
            }

            // Anchor is positioned outside the element bounds.
            // Must show overflow while anchor is enabled.
            el.style.overflow = 'visible';
        }
        // false destroys the anchor element and dereferences the pointerEl
        else if (oldAnchor) {
            me.anchorSize = oldAnchor.destroy();
            el.style.overflow = '';
        }

        return anchor;
    },

    initAnchor: function() {
        var me = this,
            anchor = me.getAnchor(),
            cls = me.sideCls.top,
            svgEl = anchor.dom.firstChild,
            pathEl = svgEl.firstChild,
            anchorSize;

        anchor.addCls(cls);
        anchor.show();
        anchorSize = anchor.measure();
        me.anchorSize = anchorSize = new Ext.util.Offset(anchorSize.width, anchorSize.height);

        // A small space between the anchor point and the target
        me.anchorMargin = parseFloat(anchor.getStyle('marginLeft')) || 0;
        anchor.dom.style.margin = '0';

        // Draw our arrow.
        svgEl.setAttribute('height', anchorSize.y);
        svgEl.setAttribute('width', anchorSize.x);
        pathEl.setAttribute(
            'd',
            'M0 ' + anchorSize.y + ' L' + anchorSize.x / 2 + ' 0.5 L' + anchorSize.x +
            ' ' + anchorSize.y);
        anchorSize.y -= parseFloat(Ext.fly(pathEl).getStyle('stroke-width'));

        anchor.removeCls(cls);
        anchor.hide();
    },

    updateAnchorPosition: function(anchorPosition, oldAnchorPosition) {
        var me = this,
            anchorEl = me.getAnchor(),
            sideCls = me.sideCls;

        // If we have no anchor, there's nothing to do.
        if (anchorEl) {
            if (oldAnchorPosition) {
                anchorEl.removeCls(sideCls[oldAnchorPosition.side]);
            }

            if (anchorPosition) {
                anchorEl.addCls(sideCls[anchorPosition.side]);
                anchorEl.translate(anchorPosition.x, anchorPosition.y);
                anchorEl.show();
            }
            else {
                anchorEl.hide();
            }
        }
    },

    updateBorder: function(border, oldBorder) {
        var me = this;

        me.callParent([border, oldBorder]);

        if (me.getBodyBorder() === null) {
            me.setBodyBorderEnabled(border !== false);
        }

        me.syncBorders();
    },

    updateBodyPadding: function(newBodyPadding) {
        this.bodyElement.setStyle('padding', newBodyPadding);
    },

    updateBodyBorder: function(bodyBorder) {
        var me = this;

        bodyBorder = (bodyBorder === null) ? me.getBorder() : bodyBorder;

        me.setBodyBorderEnabled(bodyBorder !== false);

        me.syncBorders();
    },

    updateClosable: function(closable) {
        var me = this,
            tools;

        if (closable) {
            tools = me.addTool({
                type: 'close',
                weight: 1000,
                scope: me,
                handler: 'onCloseTool',
                tooltip: me.getCloseToolText(),
                $internal: true
            });

            if (tools && tools.length) {
                me.closeTool = tools[0];
            }
        }
        else {
            Ext.destroy(me.closeTool);
        }
    },

    updateHeaderPosition: function(headerPosition, oldHeaderPosition) {
        this.moveHeaderPosition(headerPosition, oldHeaderPosition);
    },

    updateIcon: function(icon) {
        var header = this.ensureHeader();  // creates if header !== false

        if (header) {
            header.setIcon(icon);
        }
    },

    updateIconCls: function(iconCls) {
        var header = this.ensureHeader();  // creates if header !== false

        if (header) {
            header.setIconCls(iconCls);
        }
    },

    updateIconAlign: function(iconAlign) {
        var header = this.ensureHeader();  // creates if header !== false

        if (header) {
            header.setIconAlign(iconAlign);
        }
    },

    applyBbar: function(toolbar, previous) {
        return this.normalizeButtonBar(toolbar, previous, 'bottom');
    },

    applyLbar: function(toolbar, previous) {
        return this.normalizeButtonBar(toolbar, previous, 'left');
    },

    applyRbar: function(toolbar, previous) {
        return this.normalizeButtonBar(toolbar, previous, 'right');
    },

    applyTbar: function(toolbar, previous) {
        return this.normalizeButtonBar(toolbar, previous, 'top');
    },

    updateTitle: function(title) {
        var header = this.ensureHeader(),
            tab = this.tab;

        if (header) {
            header.setTitle(title);
        }

        if (tab && tab.isTab && !tab.destroying && !tab.destroyed) {
            tab.setText(title);
        }
    },

    updateTitleAlign: function(titleAlign) {
        var header = this.ensureHeader();  // creates if header !== false

        if (header) {
            header.setTitleAlign(titleAlign);
        }
    },

    updateUi: function(ui, oldUi) {
        this.callParent([ui, oldUi]);

        if (this.hasResizable) {
            this.onResizableUiChange(ui, oldUi);
        }

        // invalidate anchor size so it is measured again on next alignTo
        this.anchorSize = null;
    },

    alignTo: function(component, alignment, options) {
        var me = this,
            anchorElement = me.getAnchor(),
            config = me.initialConfig,
            positioned = me.isPositioned(),
            setX = positioned ? me.setLeft : me.setX,
            setY = positioned ? me.setTop : me.setY,
            x, y, target, anchorMargin, alignmentInfo, resultRegion, oldHeight, parent;

        // Initialize anchor size, content and margin if not done.
        if (anchorElement) {
            if (!me.anchorSize) {
                me.initAnchor();
            }
        }

        // Call through the Component class (which registers a viewportResizeListener), and
        // up to Widget which does pure alignment.
        // We only need extra if we're showing an anchor.
        else {
            return me.callParent([component, alignment, options]);
        }

        anchorMargin = me.anchorMargin;

        // Passed "component" may be a Region, Component, oer element
        target = component.isRegion
            ? component
            : (component.isWidget
                ? component.el
                : Ext.fly(component)).getRegion();

        target.adjust(-anchorMargin, anchorMargin, anchorMargin, -anchorMargin);
        alignmentInfo = me.getAlignmentInfo(target, alignment);

        if (alignmentInfo.isAligned) {
            return;
        }

        parent = me.getParent();

        if (!me.getFloated()) {
            if (!parent) {
                me.setFloated(true);
            }
            else {
                me.positioned = true;
            }
        }

        if ('unconstrainedWidth' in me) {
            me.setWidth(me.unconstrainedWidth);
        }

        if ('unconstrainedHeight' in me) {
            me.setHeight(me.unconstrainedHeight);
        }

        // Cache the alignment options for any realign call which might happen on
        // viewport resize or configuration change.
        // See Ext.Widget#realign
        me.alignToArgs = [component, alignment, options];

        resultRegion = me.getAlignRegion(target, alignment, Ext.apply({
            anchorSize: me.anchorSize,
            axisLock: me.getAxisLock()
        }, options));

        // If already aligned, will return undefined
        if (resultRegion) {
            setX.call(me, resultRegion.x);
            setY.call(me, resultRegion.y);

            if (resultRegion.constrainWidth) {
                me.unconstrainedWidth = config.width || me.self.prototype.width;

                // We must deal with height changing if we restrict width and we are aligning
                // above
                oldHeight = me.el.getHeight();
                me.setWidth(alignmentInfo.stats.width = resultRegion.getWidth());

                // We are being positioned above, bump upwards by how much the
                // element has expanded as a result of width restriction.
                if (resultRegion.align.position === 0) {
                    setY.call(me, resultRegion.y + (oldHeight - me.el.getHeight()));
                }
            }

            if (resultRegion.constrainHeight) {
                me.unconstrainedHeight = config.height || me.self.prototype.height;
                me.setHeight(alignmentInfo.stats.height = resultRegion.getHeight());
            }

            if (resultRegion.anchor) {
                x = 0;
                y = 0;

                // The result is to the left or right of the target
                if (resultRegion.anchor.align & 1) {
                    y = resultRegion.anchor.y - resultRegion.y;
                }
                else {
                    x = resultRegion.anchor.x - resultRegion.x;
                }

                me.setAnchorPosition({
                    side: resultRegion.anchor.position,
                    x: x,
                    y: y
                });
            }
            else {
                me.setAnchorPosition(null);
            }

            me.setCurrentAlignmentInfo(alignmentInfo);
        }
        else if (anchorElement) {
            // Already aligned
            anchorElement.show();
        }

        if (!me.viewportResizeListener) {
            me.viewportResizeListener = Ext.on({
                resize: 'onViewportResize',
                scope: me,
                destroyable: true
            });
        }
    },

    getRefItems: function(deep) {
        var items = this.callParent([deep]),
            header = this.getConfig('header', false, true);

        if (header) {
            // Header is logically and visually the first item, so
            // header, then header items are *prepended* to results.
            if (deep && header.getRefItems) {
                items.unshift.apply(items, header.getRefItems(deep));
            }

            items.unshift(header);
        }

        return items;
    },

    onCloseTool: function() {
        this.close();
    },

    onRender: function() {
        var me = this,
            header;

        me.callParent();

        header = me.getHeader();

        if (header) {
            header.setRendered(true);
        }

        if (me.hasCollapsible) {
            me.onCollapsibleRendered();
        }
    },

    doDestroy: function() {
        Ext.destroy(this.header, this.anchor);
        this.callParent();
    },

    privates: {
        headerPositionMap: {
            top: {
                cls: Ext.baseCSSPrefix + 'header-position-top',
                dom: 0,
                horz: true
            },
            right: {
                cls: Ext.baseCSSPrefix + 'header-position-right',
                dom: 1,
                vert: true
            },
            bottom: {
                cls: Ext.baseCSSPrefix + 'header-position-bottom',
                dom: 1,
                horz: true
            },
            left: {
                cls: Ext.baseCSSPrefix + 'header-position-left',
                dom: 0,
                vert: true
            }
        },

        adjustButtons: function(buttons, oldButtons) {
            return this.normalizeButtonBar(buttons, oldButtons, 'bottom',
                                           this.getButtonToolbar());
        },

        ensureHeader: function() {
            var me = this,
                header;

            if (!me._isCreatingHeader) {
                me.getItems();

                header = me.getHeader();

                if (!header && me.allowHeader) {
                    me.setHeader(true);
                    header = me.getHeader();
                }
            }

            return header;
        },

        moveHeaderPosition: function(headerPosition, oldHeaderPosition) {
            var me = this,
                el = me.element,
                map = me.headerPositionMap,
                oldItem = map[oldHeaderPosition],
                newItem = map[headerPosition],
                oldCls = oldItem ? oldItem.cls : '',
                newCls = newItem.cls,
                positionedHeader,
                header;

            if (oldCls !== newCls) {
                if (oldHeaderPosition) {
                    el.removeCls(oldCls);
                }

                el.addCls(newCls);
            }

            if (oldHeaderPosition || headerPosition !== 'top') {
                header = me.ensureHeader();

                if (header) {
                    if (!me.isConfiguring) {
                        me.positionHeader(header, headerPosition);
                        positionedHeader = true;
                    }
                }
            }

            if (!positionedHeader) {
                me.syncBorders();
            }

            return header;
        },

        positionHeader: function(header, position) {
            var me = this,
                pos = position || me.getHeaderPosition();

            header.setPosition(pos);

            me.syncBorders();
        },

        setBodyBorderEnabled: function(enabled) {
            this.bodyElement.setStyle('border-width', enabled ? '' : '0');
        },

        syncBorders: function() {
            if (!this.isConfiguring) {
                this.getLayout().handleDockedItemBorders(true);
            }
        }
    }
});
