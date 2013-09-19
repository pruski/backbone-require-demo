// Filename: PageModel

define([
    'jquery',
    'underscore',
    'backbone',

    'models/rating/RatingModel'

], function ($, _, Backbone, RatingModel) {
    'use strict';

    return Backbone.RelationalModel.extend({
        objectType: 'PageModel',

        relations: [
            {
                type: Backbone.HasOne,
                key: 'rating',
                relatedModel: RatingModel,
                reverseRelation: {
                    key: 'page'
                }
            }
        ],

        initialize: function () {
            _.bindAll(this);
        },

        getRating: function () {
            return {
                page: this.get('page'),
                rate: this.get('rating').get('rate')
            };
        }

    });
});