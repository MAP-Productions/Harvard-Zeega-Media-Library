define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    Intro = Backbone.View.extend({

        template: "intro",
        className: "intro",
        
        initialize: function() {
            
        }
    });

    // Required, return the module for AMD compliance
    return Intro;

});
