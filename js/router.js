// Filename: router

define([
    'underscore',
    'backbone',

    'collections/books/BooksCollection',

    'views/app/MenuView',
    'views/books/BookListView',
    'views/topRatedPages/TopRatedPagesView'
], function (_, Backbone, BooksCollection, MenuView, BookListView, TopRatedPagesView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        views: [],
        defaultTopLevelViewParams: {
            parentContainer: '.container-fluid'
        },

        initialize: function () {
            this.booksCollection = new BooksCollection();
            this.defaultTopLevelViewParams.books = this.booksCollection;
            this.defaultTopLevelViewParams.router = this;

            this.views.menu = new MenuView({el: '#menu', router: this});
        },

        routes: {
            'books': 'showBookList',
            'books/:title(/)(:page)': 'showBook',

            'top-rated-pages': 'showTopRatedPages',

            '*actions': 'defaultRoute'
        },

        defaultRoute: function () {
            this.navigate('books', {trigger: true, replace: true});
        },

        showTopRatedPages: function () {
            this.createTopLevelView(TopRatedPagesView, 'top-rated-pages');
        },

        showBookList: function () {
            this.createTopLevelView(BookListView, 'books');
        },

        showBook: function (title, page) {
            this.showBookList();
            this.views.topLevel.updateDetails(title, page);
        },

        createTopLevelView: function (Constructor, menuId, options) {
            if (!this.isRequestedViewAlreadyDisplayed(Constructor.objectType)) {
                var opts = _.extend({}, this.defaultTopLevelViewParams, options);
                this.updateMenu(menuId);
                this.views.topLevel = new Constructor(opts);
            }
        },

        isRequestedViewAlreadyDisplayed: function (requestedView) {
            if(this.views.topLevel !== undefined){
                if (this.views.topLevel.objectType === requestedView) {
                    return true;
                } else {
                    this.views.topLevel.destroy();
                }
            }
            return false;
        },

        updateMenu: function (selected) {
            this.views.menu.updateSelected(selected);
        }
    });

    // we need only one instance of router
    return new AppRouter();
});