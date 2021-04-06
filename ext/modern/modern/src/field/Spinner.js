/**
 * Wraps a Ext.form.Number field to provide a number input field with up/down spinner button and
 * optional step value for each spin up/down increment/decrement.
 *
 * Example usage:
 * ```javascript
 *  @example({ framework: 'extjs' })
 *     var spinner = Ext.create('Ext.field.Spinner', {
 *         label: 'Spinner Field',
 *         minValue: 0,
 *         maxValue: 100,
 *         stepValue: 2,
 *         cycle: true
 *     });
 *     Ext.Viewport.add({ xtype: 'container', items: [spinner] });
 * ```
 * ```javascript
 *  @example({framework: 'ext-react', packages:['ext-react']})
 *  import React, { Component } from 'react';
 *  import { ExtContainer, ExtSpinnerField, ExtFormPanel } from '@sencha/ext-react';
 *  export default class MyExample extends Component {
 *     render() {
 *         return (
 *             <ExtContainer layout="center">
 *                 <ExtFormPanel shadow>
 *                     <ExtSpinnerField
 *                         label="Spinner"
 *                         width="150"
 *                         minValue={0}
 *                         maxValue={10}
 *                         stepValue={1}
 *                     />
 *                 </ExtFormPanel>
 *             </ExtContainer>
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
 *     styles: [``],
 *     template: `
 *         <ExtContainer layout="center">
 *             <ExtFormPanel shadow="true" >
 *                 <ExtSpinnerField
 *                     label="Spinner"
 *                     width="150"
 *                     minValue="0"
 *                     maxValue="10"
 *                     stepValue="1"
 *                 >
 *                 </ExtSpinnerField>
 *             </ExtFormPanel>
 *         </ExtContainer>
 *     `
 * })
 * export class AppComponent {}
 * ```
 * ```html
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 1 })
 * <ext-container layout="center">
 *    <ext-formpanel shadow="true">
 *        <ext-spinnerfield
 *            label="Spinner"
 *            width="150"
 *            minValue="1"
 *            maxValue="10"
 *            stepValue="1"
 *        >
 *        </ext-spinnerfield>
 *    </ext-formpanel>
 * </ext-container>
 * ```
 * ```javascript
 * @example({framework: 'ext-web-components', packages:['ext-web-components'], tab: 2 })
 * import '@sencha/ext-web-components/dist/ext-container.component';
 * import '@sencha/ext-web-components/dist/ext-formpanel.component';
 * import '@sencha/ext-web-components/dist/ext-spinnerfield.component';
 *
 * export default class SpinnerFieldComponent {}
 * ```
 *
 */
Ext.define('Ext.field.Spinner', {
    extend: 'Ext.field.Number',
    xtype: 'spinnerfield',
    alternateClassName: 'Ext.form.Spinner',

    requires: [
        'Ext.field.trigger.SpinDown',
        'Ext.field.trigger.SpinUp'
    ],

    /**
     * @event spin
     * Fires when the value is changed via either spinner buttons.
     * @param {Ext.field.Spinner} this
     * @param {Number} value
     * @param {String} direction 'up' or 'down'.
     */

    /**
     * @event spindown
     * Fires when the value is changed via the spinner down button.
     * @param {Ext.field.Spinner} this
     * @param {Number} value
     */

    /**
     * @event spinup
     * Fires when the value is changed via the spinner up button.
     * @param {Ext.field.Spinner} this
     * @param {Number} value
     */

    /**
     * @event updatedata
     * @hide
     */

    /**
     * @event action
     * @hide
     */

    config: {
        /**
         * @cfg {Number} stepValue
         * Value that is added or subtracted from the current value when a spinner
         * is tapped.
         */
        stepValue: 1,

        /**
         * @cfg {Boolean} accelerateOnTapHold
         * `true` if autorepeating should start slowly and accelerate.
         */
        accelerateOnTapHold: true,

        /**
         * @cfg {Boolean} cycle
         * When set to `true`, it will loop the values of a minimum or maximum is
         * reached. If the maximum value is reached, the value will be set to the
         * minimum.
         */
        cycle: false,

        /**
         * @cfg clearable
         * @inheritdoc
         */
        clearable: false,

        /**
         * @cfg {Boolean} groupButtons
         * `true` if you want to group the buttons to the right of the fields. `false` if
         * you want the buttons to be at either side of the field.
         * @deprecated 6.2.0 This concern should be handled by the theme.
         */
        groupButtons: true
    },

    triggers: {
        spindown: {
            type: 'spindown',
            group: 'spin',
            repeat: true
        },
        spinup: {
            type: 'spinup',
            group: 'spin',
            repeat: true
        }
    },

    /**
     * @cfg value
     * @inheritdoc
     */
    value: 0,

    /**
     * @cfg decimals
     * @inheritdoc
     */
    decimals: 0,

    /**
     * @property classCls
     * @inheritdoc
     */
    classCls: Ext.baseCSSPrefix + 'spinnerfield',
    groupedButtonsCls: Ext.baseCSSPrefix + 'grouped-buttons',

    initElement: function() {
        this.callParent();

        this.inputElement.dom.readOnly = true;
    },

    updateGroupButtons: function(groupButtons) {
        var downTrigger = this.getTriggers().spindown;

        downTrigger.setGroup(groupButtons ? 'spin' : null);
        downTrigger.setSide(groupButtons ? null : 'left');
    },

    applyTriggers: function(triggers, oldTriggers) {
        var accelerate = this.getAccelerateOnTapHold(),
            upTrigger, downTrigger, upRepeat, downRepeat;

        if (triggers && accelerate) {
            upTrigger = triggers.spinup;
            downTrigger = triggers.spindown;
            upRepeat = upTrigger.repeat;

            if (upRepeat) {
                upTrigger.repeat = Ext.apply({
                    accelerate: accelerate
                }, upRepeat);
            }

            downRepeat = downTrigger.repeat;

            if (downRepeat) {
                downTrigger.repeat = Ext.apply({
                    accelerate: accelerate
                }, downRepeat);
            }
        }

        return this.callParent([triggers, oldTriggers]);
    },

    onKeyDown: function(e) {
        var limit;

        if (this.getInputType() !== 'number') {
            switch (e.getKey()) {
                case e.UP:
                    e.stopEvent();
                    this.spin(false);
                    break;

                case e.DOWN:
                    e.stopEvent();
                    this.spin(true);
                    break;

                // Home and End keys: https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton
                case e.HOME:
                    limit = this.getMinValue();

                    if (limit != null) {
                        e.stopEvent();
                        this.setValue(limit);
                    }

                    break;

                case e.END:
                    limit = this.getMaxValue();

                    if (limit != null) {
                        e.stopEvent();
                        this.setValue(limit);
                    }

                    break;
            }
        }

        this.callParent([e]);
    },

    /**
     * @private
     */
    onSpinDown: function() {
        if (!this.getDisabled() && !this.getReadOnly()) {
            this.spin(true);
        }
    },

    /**
     * @private
     */
    onSpinUp: function() {
        if (!this.getDisabled() && !this.getReadOnly()) {
            this.spin(false);
        }
    },

    /**
     * @private
     */
    spin: function(down) {
        var me = this,
            originalValue = me.getValue(),
            stepValue = me.getStepValue(),
            direction = down ? 'down' : 'up',
            minValue = me.getMinValue(),
            maxValue = me.getMaxValue(),
            value;

        if (down) {
            value = originalValue - stepValue;
        }
        else {
            value = originalValue + stepValue;
        }

        // if cycle is true, then we need to check fi the value hasn't
        // changed and we cycle the value
        if (me.getCycle()) {
            if (originalValue === minValue && value < minValue) {
                value = maxValue;
            }

            if (originalValue === maxValue && value > maxValue) {
                value = minValue;
            }
        }
        else if (minValue != null && value < minValue) {
            value = minValue;
        }
        else if (maxValue != null && value > maxValue) {
            value = maxValue;
        }

        me.spinning = true;
        me.setValue(value);
        me.spinning = false;
        value = me.getValue();

        me.fireEvent('spin', me, value, direction);
        me.fireEvent('spin' + direction, me, value);
    },

    rawToValue: Ext.emptyFn,

    privates: {
        spinning: false,

        canSetInputValue: function() {
            return this.spinning || this.callParent();
        }
    }
});
