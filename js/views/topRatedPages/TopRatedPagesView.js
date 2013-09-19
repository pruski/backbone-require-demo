// Filename: TopRatedPagesView

define([
    'jquery',
    'underscore',
    'backbone',

    'views/mixins/DestroyableView',

    'text!templates/topRatedPages/TopRatedPagesTpl.html'

], function ($, _, Backbone, DestroyableView, TopRatedPagesTpl) {
    'use strict';

    var TopRatedPagesView =  Backbone.View.extend({
        objectType: 'TopRatedPagesView',
        id: 'topRatedPages',
        tagName: 'table',
        className: 'table table-bordered table-hover',
        template: _.template(TopRatedPagesTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.parentContainer = $(options.parentContainer);
            this.booksCollection = options.books;
            this.router = options.router;

            this.render();
        },

        events: {
            'click tr': 'itemSelected'
        },

        itemSelected: function (e) {
            this.router.navigate(e.currentTarget.getAttribute("data-route"), {trigger: true});
        },

        render: function () {
            var pages = this.booksCollection.getTopRatedPages();
            this.$el.html(this.template({pages: _.first(pages, 10)}));
            this.parentContainer.html(this.el);
        }
    });

    _.extend(TopRatedPagesView.prototype, DestroyableView);

    return TopRatedPagesView;

});