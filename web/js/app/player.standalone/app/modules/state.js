define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    return Backbone.Model.extend({
        defaults: {
            baseRendered: false,
            firstVisit: true,
            fullscreen: false,
            initialized: false,
            projectID: null,
            frameID: null,
            windowWidth: 0,
            windowHeight: 0
        }
    });

});