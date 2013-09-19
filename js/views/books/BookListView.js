// Filename: BookListView

define([
    'jquery',
    'underscore',
    'backbone',

    'views/mixins/DestroyableView',

    'views/books/BookView',

    'text!templates/books/BookListTpl.html'

], function ($, _, Backbone, DestroyableView, BookView, BookListTpl) {
    'use strict';

    var BookListView = Backbone.View.extend({
        objectType: 'BookListView',
        id: 'books',
        className: 'row-fluid',
        template: _.template(BookListTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.parentContainer = $(options.parentContainer);
            this.booksCollection = options.books;
            this.subViews = {};
            this.router = options.router;

            this.render();
        },

        events: {
            'click li': 'loadBook'
        },

        loadBook: function (e) {
            e.preventDefault();
            this.router.navigate(e.currentTarget.getAttribute('data-route'), {trigger: true});
        },

        render: function () {
            this.$el.html(this.template({ books: this.booksCollection.getTitles() }));
            this.parentContainer.html(this.el);
        },

        updateDetails: function (title, page) {
            var opts = {
                parentContainer: '#bookView',
                book: this.booksCollection.get(title),
                router: this.router
            };

            if(page !== undefined){
                opts.page = page;
            }

            this.updateSelected(title);
            this.subViews.book = new BookView(opts);
        },

        updateSelected: function (title) {
            if (this.selected !== title) {
                this.updateUI(title);
                this.selected = title;
                return true;
            }
            return false;
        },

        updateUI: function (title) {
            this.$el.find('.active').removeClass('active');
            this.$el.find('[data-route="/books/'+title+'"]').addClass('active');
        }
    });

    _.extend(BookListView.prototype, DestroyableView);

    return BookListView;

});