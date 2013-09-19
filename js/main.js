// Filename: main

require.config({
    paths: {
        //core libs
        jquery: 'libs/jquery/jquery-1.10.1',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',

        // templates
        templates: '../templates',

        // require plugins
        text: 'libs/require/text',

        // backbone plugins
        bbrel: 'libs/backbone/backbone-relational'

    }

});

require([
    'backbone',
    'bbrel'
], function (Backbone) {
    'use strict';

    // we need to be absolutely sure that any dependency chain
    // will not call a library plugin before it's initialization
    require(['router'], function(){
        Backbone.history.start({pushState: true});
    });
});