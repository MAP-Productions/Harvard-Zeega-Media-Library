define([
    "app",
    "backbone",
    "iscroll"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        id: "ZEEGA-underlay",
        className: "ZEEGA-underlay",
        template: "underlay",
        myScroll: null,

        serialize: function() {
            return _.extend({}, this.model.project.toJSON(), { frames: this.model.getProjectData().frames });
        },

        show: function() {
            if ( this.myScroll === null ) {
                setTimeout(function () { 
                    this.myScroll = new iScroll('scroller');
                }.bind( this ), 0); 
            }
        },

        events: {
            "click .mobile-play": "play"
        },

        play: function() {
            this.remove();
            this.model.play();
        }

  });

});
