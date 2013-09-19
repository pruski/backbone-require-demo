// Filename: RateModeView

define([
    'jquery',
    'underscore',
    'backbone',

    'text!templates/rating/RateModeTpl.html'

], function ($, _, Backbone, RateModeTpl) {
    'use strict';

    return Backbone.View.extend({
        objectType: 'RateModeView',
        template: _.template(RateModeTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.rating = options.rating;
            this.rateReferences = [];
        },

        events: {
            'mouseover li': 'updateSelection',
            'mouseleave': 'stopRateMode',
            'click li': 'saveRate'
        },

        saveRate: function (e) {
            this.thank();
            this.rating.addRate(this.getIndex(e));
            this.stopRateMode();
        },

        getIndex: function(element){
            var src = element;
            if(element.currentTarget !== undefined){
                src = element.currentTarget;
            }
            return parseInt(src.getAttribute('data-index'), 10);
        },

        updateSelection: function (e) {
            var current = this.getIndex(e) + 1;

            _.each(_.first(this.rateReferences, current),function(item){
                item.removeClass('elusive-icon-star-empty').addClass('elusive-icon-star');
            });

            _.each(_.rest(this.rateReferences, current), function(item){
                item.removeClass('elusive-icon-star').addClass('elusive-icon-star-empty');
            });
        },

        thank: function () {
            this.$el.find('+ .thanks').show().fadeOut(1500);
        },

        startRateMode: function () {
            this.render();
            this.getRatesReferences();
            this.delegateEvents();
        },

        stopRateMode: function () {
            this.undelegateEvents();
            this.trigger('stop');
        },

        getRatesReferences: function () {
            _.each(this.$el.find('li'), this.setRateReference);
        },

        setRateReference: function (ref) {
            this.rateReferences[this.getIndex(ref)] = $(ref).find('i');
        },

        render: function () {
            this.$el.html(this.template());
        }

    });
});