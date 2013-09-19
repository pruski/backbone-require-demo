// Filename: BookModel

define([
    'jquery',
    'underscore',
    'backbone',

    'collections/books/PagesCollection',
    'models/books/PageModel'

], function ($, _, Backbone, PagesCollection, PageModel) {
    'use strict';

    return Backbone.RelationalModel.extend({
        objectType: 'BookModel',
        idAttribute: 'title',

        relations: [
            {
                type: Backbone.HasMany,
                key: 'pages',
                relatedModel: PageModel,
                collectionType: PagesCollection,
                reverseRelation: {
                    key: 'fromBook'
                }
            }
        ],

        initialize: function () {
            _.bindAll(this);
        },

        getRatingList: function () {
            var title = this.getTitle(),
                pages = this.get('pages').getRatingList();

            return pages.map(function(page){
                return _.extend(page, title);
            });
        },

        getTitle: function () {
            return {
                prettyName: this.escape('prettyName'),
                    title: this.get('title')
            };
        },

        getLength: function () {
            return this.get('pages').length;
        },

        getTwoPages: function (page) {
            var pages = this.get('pages');
            return [ pages.at(page-1), pages.at(page) ];
        }

    });
});