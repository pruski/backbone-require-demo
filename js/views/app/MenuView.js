// Filename: MenuView

define([
    'jquery',
    'underscore',
    'backbone'

], function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({

        initialize: function (options) {
            _.bindAll(this);

            this.router = options.router;
        },

        events: {
            'click button': 'itemSelected'
        },

        itemSelected: function (e) {
            this.router.navigate(e.currentTarget.getAttribute('id'), {trigger: true});
        },

        updateSelected: function (target) {
            if (this.selected !== target) {
                this.updateUI(target);
                this.selected = target;
                return true;
            }
            return false;
        },

        updateUI: function (target) {
            this.$el.find('#' + this.selected).removeClass('btn-primary');
            this.$el.find('#' + target).addClass('btn-primary');
        }
    });

});