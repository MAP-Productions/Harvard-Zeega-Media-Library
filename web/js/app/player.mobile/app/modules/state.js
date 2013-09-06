define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    // Create a new module
    var State = {};

    // This will fetch the tutorial template and render it.
    State = Backbone.Model.extend({
        defaults: {
            baseRendered: false,
            firstVisit: true,
            fullscreen: false,
            initialized: false,
            projectID: null,
            frameID: null
        }
    });

    // Required, return the module for AMD compliance
    return State;
});