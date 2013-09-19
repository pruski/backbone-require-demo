// Filename: BooksCollection

define([
    'jquery',
    'underscore',
    'backbone',

    'models/books/BookModel'

], function ($, _, Backbone, BookModel) {
    'use strict';

    return Backbone.Collection.extend({
        objectType: 'BooksCollection',
        model: BookModel,

        initialize: function () {
            _.bindAll(this);

            var init = $('#initData');
            _.map(JSON.parse(init.text()).books, this.addBook);
            init.remove();
        },

        addBook: function (book, title) {
            this.add(new BookModel(_.extend({title: title}, book)));
        },

        getTitles: function () {
            return _.map(this.models, function(book){
                return book.getTitle();
            });
        },

        getTopRatedPages: function () {
            return _.sortBy(this.getRatingList(), this.ratingIterator);
        },

        getRatingList: function () {
            return _.flatten(
                this.map(function(book){
                    return book.getRatingList();
                })
            );
        },

        ratingIterator: function (page) {
            return -1 * page.rate;
        }
    });
});