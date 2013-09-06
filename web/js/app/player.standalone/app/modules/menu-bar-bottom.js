define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var Citations = {};

    // This will fetch the tutorial template and render it.
    Citations.View = Backbone.View.extend({
        
        timer: null,
        visible: false,
        hover: false,
        playing: false,

        template: "menu-bar-bottom",

        className: "ZEEGA-player-citations",

        serialize: function() {
            if ( this.model.project ) {
                return this.model.project.toJSON();
            }
        },

        initialize: function() {
            /* update the arrow state whenever a frame is rendered */
            this.model.on("frame_play", this.updateCitations, this);
            this.model.on("data_loaded", this.render, this);
            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );
        },

        onPlay: function() {
            this.$("#project-play-pause i").addClass("pause-zcon").removeClass("play-zcon");
        },

        onPause: function() {
            this.$("#project-play-pause i").addClass("play-zcon").removeClass("pause-zcon");
            this.fadeIn();
        },

        updateCitations: function( info ) {
            var layersToCite = _.map( info.layers, function( layer ){
                // if( layer.attr.citation && layer.attr.archive ) return layer;

                // this is janky . fix!
                if( _.contains(["Audio", "Image", "Video"], layer.type ) && layer.attr.archive && layer.attr.archive != "Absolute" ) {

                    return layer;
                }
                return false;
            });

            this.$(".ZEEGA-citations-primary").empty();
            _.each( _.compact( layersToCite ), function(layer){
                var citation = new CitationView({ model: new Backbone.Model(layer) });

                this.$(".ZEEGA-citations-primary").append(citation.el);
                citation.render();
            }.bind( this ));
        },

        events: {
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click #project-play-pause": "playpause",
            "click #project-home": "home"
        },

        fadeOut: function( stay ) {
            if( this.visible ) {
                var fadeOutAfter = stay || 2000;

                if ( this.timer ) {
                    clearTimeout( this.timer );
                }
                this.timer = setTimeout(function(){
                    if ( !this.hover && app.player.state != "paused" ) {
                        this.visible = false;
                        this.$el.fadeOut();
                    }
                }.bind( this ), fadeOutAfter);
                
            }
        },

        fadeIn: function( stay ) {
            if( !this.visible ) {
                this.visible = true;
                this.$el.fadeIn();
                this.fadeOut( stay );
            }
        },

        onMouseenter: function() {
            this.hover = true;
        },

        onMouseleave: function() {
            this.hover = false;
            this.fadeOut();
        },

        playpause: function() {
            if ( this.model.state == "paused") {
                this.model.play();
            } else {
                this.model.pause();
            }
            return false;
        },

        home: function() {
            
            this.model.cueFrame( this.model.get("startFrame") );
            
            return false;
        }
    });

    var CitationView = Backbone.View.extend({
        tagName: "li",
        template: "citation",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            "hover": "onHover"
        },

        onHover: function() {
            this.$("i").toggleClass("loaded");
        }
  
    });

    return Citations;
});