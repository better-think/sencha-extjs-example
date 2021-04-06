/**
 * @private
 */
Ext.define('Ext.layout.card.fx.ScrollCover', {
    extend: 'Ext.layout.card.fx.Scroll',

    alias: 'layout.card.fx.scrollcover',

    onActiveItemChange: function(cardLayout, inItem, outItem, controller) {
        var containerElement, containerSize, xy, animConfig,
            inTranslate, outTranslate;

        this.currentEventController = controller;
        this.inItem = inItem;

        if (inItem && outItem) {
            containerElement = this.getLayout().container.bodyElement;

            containerSize = containerElement.getSize();
            xy = this.calculateXY(containerSize);
            animConfig = {
                easing: this.getEasing(),
                duration: this.getDuration()
            };

            inItem.renderElement.dom.style.setProperty('visibility', 'hidden', 'important');
            inTranslate = inItem.setTranslatable(true).getTranslatable();
            outTranslate = outItem.setTranslatable(true).getTranslatable();

            outTranslate.translate({ x: 0, y: 0 });
            inTranslate.translate({ x: xy.left, y: xy.top });
            inTranslate.getWrapper().dom.style.setProperty('z-index', '100', 'important');
            inItem.show();

            inTranslate.on({
                animationstart: 'onInAnimationStart',
                animationend: 'onInAnimationEnd',
                scope: this
            });
            inTranslate.translateAnimated({ x: 0, y: 0 }, animConfig);

            controller.pause();
        }
    },

    onInAnimationStart: function() {
        this.inItem.renderElement.dom.style.removeProperty('visibility');
    },

    onInAnimationEnd: function() {
        var wrapper;

        if (!this.destroyed) {
            wrapper = this.inItem.getTranslatable().getWrapper();

            // Remove this when we can remove translatable
            wrapper.dom.style.removeProperty('z-index');
            this.currentEventController.resume();
        }
    }
});
