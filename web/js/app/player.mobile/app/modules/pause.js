define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        className: "ZEEGA-pause-overlay",
        template: "pause",

        serialize: function() {
            return this.model.project.toJSON();
        },

        events: {
            "click .mobile-play": "play",
            "click .menu": "toggleCoffin"
        },

        toggleCoffin: function() {
            app.layout.toggleCoffin();
        },

        play: function() {
            this.remove();
            this.model.play();
        }

  });

});
