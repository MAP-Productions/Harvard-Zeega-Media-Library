define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    return Backbone.View.extend({
        
        className: "pause-overlay",
        template: "pause",
        
        serialize: function() {
            return this.model.project.toJSON();
        },

        events: {
            "click .play": "play"
        },

        play: function() {
            this.model.play();
        }
    });

});