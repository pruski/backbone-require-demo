// Filename: DestroyableView

define([
    'underscore'
], function (_) {
    'use strict';

    return {
        destroySubViews: function () {
            _.each(this.subViews, this.destroySubView);
        },

        destroySubView: function (subView, key) {
            if(subView.destroy !== undefined){
                subView.destroy();
            } else {
                subView.remove();
            }
            delete this.subViews[key];
        },

        destroy: function () {
            this.destroySubViews();
            this.trigger('destroying');
            this.remove();
        }
    };
});