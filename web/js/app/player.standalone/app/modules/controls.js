define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var Controls = {};

    // This will fetch the tutorial template and render it.
    Controls.View = Backbone.View.extend({
        
        template: "controls",

        className: "ZEEGA-player-controls",

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_play", this.updateArrowState, this);
        },

        events: {
            "click .next": "next",
            "click .prev": "prev"
        },

        next: function() {
            this.model.cueNext();
            return false;
        },

        prev: function() {
            this.model.cuePrev();
            return false;
        },

        updateArrowState: function( info ) {
            switch(info._connections) {
                case "l":
                    this.activateArrow("prev");
                    this.disableArrow("next");
                    break;
                case "r":
                    this.disableArrow("prev");
                    this.activateArrow("next");
                    break;
                case "lr":
                    this.activateArrow("prev");
                    this.activateArrow("next");
                    break;
                default:
                    this.disableArrow("prev");
                    this.disableArrow("next");
            }
        },

        activateArrow: function(className) {
            this.$("."+ className +".disabled").removeClass("disabled");
        },

        disableArrow: function(className) {
            this.$("."+ className).addClass("disabled");
        }
    });

    return Controls;
});