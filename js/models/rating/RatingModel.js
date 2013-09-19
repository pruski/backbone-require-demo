// Filename: RatingModel

define([
    'jquery',
    'underscore',
    'backbone'

], function ($, _, Backbone) {
    'use strict';

    return Backbone.RelationalModel.extend({
        objectType: 'RatingModel',
        defaults: {
            rate: 0
        },

        initialize: function () {
            _.bindAll(this);

            this.rates = [];
        },

        addRate: function (rate) {
            this.rates.push(rate);
            this.calculateAverageRate();
        },

        calculateAverageRate: function () {
            var sum = _.reduce(this.rates, function(a, b){
                return a + b;
            }, 0);
            this.set('rate', parseInt(sum / this.rates.length, 10));
        }

    });
});
