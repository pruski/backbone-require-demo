// Filename: PagesCollection

define([
    'jquery',
    'underscore',
    'backbone',

    'models/books/PageModel'

], function ($, _, Backbone, PageModel) {
    'use strict';

    return Backbone.Collection.extend({
        objectType: 'PagesCollection',
        model: PageModel,

        initialize: function () {
            _.bindAll(this);
        },

        getRatingList: function () {
            return this.map(function(page){
                return page.getRating();
            });
        }
    });
});