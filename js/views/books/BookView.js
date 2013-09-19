// Filename: BookView

define([
    'jquery',
    'underscore',
    'backbone',

    'views/mixins/DestroyableView',

    'views/books/PageView',

    'text!templates/books/BookTpl.html',
    'text!templates/books/PageTpl.html'


], function ($, _, Backbone, DestroyableView, PageView, BookTpl, PageTpl) {
    'use strict';

    var BookView = Backbone.View.extend({
        objectType: 'BookView',
        className: 'row-fluid',
        template: _.template(BookTpl),
        pageTemplate: _.template(PageTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.parentContainer = $(options.parentContainer);
            this.subViews = {};
            this.router = options.router;
            this.book = options.book;
            this.bookLength = this.book.getLength();
            this.currentPage = this.getPageFromRoute(options.page);

            this.render();
        },

        getPageFromRoute: function (page){
            if(isNaN(page)){
                return 0;
            }

            return this.getValidPage(page);
        },

        getValidPage: function (page){
            var valid = page > 0 ? ( page > this.bookLength ? 0 : page ) : 0;
            return parseInt(valid, 10);
        },

        events: {
            'click #prev': 'loadPreviousPage',
            'click #next': 'loadNextPage'
        },

        loadPreviousPage: function () {
            if(this.hasPreviousPage()){
                switch(this.currentPage){
                    case 2:
                        this.currentPage = 1;
                        break;
                    case 1:
                        this.currentPage = 0;
                        break;
                    default:
                        this.currentPage -= 2;
                        break;
                }
                this.renderBook();
            }
        },

        loadNextPage: function () {
            if(this.hasNextPage()){
                switch(this.currentPage){
                    case 0:
                        this.clearCover();
                        this.currentPage = 1;
                        break;
                    default:
                        this.currentPage += 2;
                        break;
                }
                this.renderBook();
            }
        },

        hasPreviousPage: function () {
            return this.currentPage > 0;
        },

        hasNextPage: function () {
            return this.currentPage > 0 ? this.bookLength > this.currentPage + 1 : this.bookLength > 0;
        },

        render: function () {
            this.$el.html(this.template());
            this.parentContainer.html(this.el);
            this.renderBook();
        },

        renderBook: function () {
            this.renderPreparation();

            if(this.currentPage === 0){
                this.renderCover();
            } else {
                this.renderPages();
            }
        },

        renderPreparation: function () {
            this.destroySubViews();
            this.updateRoute();
            this.updateNav();
        },

        updateRoute: function () {
            this.router.navigate(this.getCurrentRoute());
        },

        getCurrentRoute: function () {
            return '/books/' + this.book.get('title') + (this.currentPage > 0 ? '/' + this.currentPage : '');
        },

        renderPages: function () {
            var currentPages = this.getTwoPages();

            this.createPage('pageLeft', currentPages[0]);

            if(currentPages[1] !== undefined){
                this.createPage('pageRight', currentPages[1]);
                this.equalizePages();
            }
        },

        createPage: function (which, page) {
            this.subViews[which] = new PageView({parentContainer: '#' + which, page: page});
        },

        getTwoPages: function () {
            return this.book.getTwoPages(this.currentPage);
        },

        equalizePages: function () {
            var left = this.$el.find('#pageLeft .pageView .pageFrame'),
                right = this.$el.find('#pageRight .pageView .pageFrame'),
                leftHeight = left.height(),
                rightHeight = right.height();

            if(leftHeight > rightHeight){
                right.height(leftHeight);
            } else {
                left.height(rightHeight);
            }

        },

        updateNav: function () {
            if(this.bookLength > this.currentPage + 1){
                this.$el.find('#next').removeClass('empty');
            } else {
                this.$el.find('#next').addClass('empty');
            }

            if(this.currentPage === 0){
                this.$el.find('#prev').addClass('empty');
            } else {
                this.$el.find('#prev').removeClass('empty');
            }
        },

        renderCover: function () {
            this.$el.find('#pageRight').html(this.getCoverHtml());
        },

        getCoverHtml: function () {
            return '<div class="pageView">' +
                this.pageTemplate({
                    page: '',
                    content: '<h3>' + this.book.escape('prettyName') + '</h3>',
                    noRating: true
                }) +
                '</div>';
        },

        clearCover: function () {
            this.$el.find('#pageRight').empty();
        }
    });

    _.extend(BookView.prototype, DestroyableView);

    return BookView;

});