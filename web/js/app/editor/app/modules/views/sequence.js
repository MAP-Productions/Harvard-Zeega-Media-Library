define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "sequence",
        className: "ZEEGA-sequence",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            //"click .controls-toggle": "toggleControls"
        }
        
    });

});
