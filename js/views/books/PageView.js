// Filename: PageView

define([
    'jquery',
    'underscore',
    'backbone',

    'views/mixins/DestroyableView',

    'views/rating/RatingView',

    'text!templates/books/PageTpl.html'

], function ($, _, Backbone, DestroyableView, RatingView, PageTpl) {
    'use strict';

    var PageView = Backbone.View.extend({
        objectType: 'PageView',
        className: 'pageView',
        template: _.template(PageTpl),

        initialize: function (options) {
            _.bindAll(this);

            this.parentContainer = $(options.parentContainer);
            this.subViews = {};
            this.page = options.page;

            this.listenTo(this, 'destroying', this.destroying);

            this.render();
            this.subViews.rating = new RatingView({el: this.$el.find('.ratingView'), rating: this.page.get('rating')});
        },

        render: function () {
            this.$el.html(this.template({page: this.page.escape('page'), content: this.page.escape('content')}));
            this.parentContainer.removeClass('empty').html(this.el);
        },

        destroying: function () {
            this.parentContainer.addClass('empty');
        }

    });

    _.extend(PageView.prototype, DestroyableView);

    return PageView;

});