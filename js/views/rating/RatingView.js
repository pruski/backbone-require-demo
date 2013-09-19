// Filename: RatingView

define([
    'jquery',
    'underscore',
    'backbone',

    'views/mixins/DestroyableView',

    'views/rating/RateModeView',

    'text!templates/rating/RatingTpl.html'

], function ($, _, Backbone, DestroyableView, RateModeView, RatingTpl) {
    'use strict';

    var RatingView = Backbone.View.extend({
        objectType: 'RatingView',
        template: _.template(RatingTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.rating = options.rating;
            this.subViews = {};

            this.setListeners();

            this.render();

        },

        events: {
            'mouseover': 'startRateMode'
        },

        startRateMode: function (){
            this.stopListening();
            this.undelegateEvents();
            this.getRateModeView().startRateMode();
            this.listenTo(this.subViews.rateMode, 'stop', this.rateModeFinished);
        },

        rateModeFinished: function () {
            this.stopListening();
            this.delegateEvents();
            this.setListeners();
            this.render();
        },

        getRateModeView: function () {
            if(this.subViews.rateMode === undefined){
                this.subViews.rateMode = new RateModeView({el: this.el, rating: this.rating});
            }
            return this.subViews.rateMode;
        },

        setListeners: function () {
            this.listenTo(this.rating, 'change:rate', this.render);
        },

        render: function () {
            var rate = this.rating.get('rate');
            this.$el.html(this.template({fullRate: rate, emptyRate: 5 - rate}));
        }
    });

    _.extend(RatingView.prototype, DestroyableView);

    return RatingView;

});