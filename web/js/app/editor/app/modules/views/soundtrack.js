define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        model: null,
        template: "soundtrack",
        className: "ZEEGA-soundtrack",

        serialize: function() {
            if ( this.model === null || this.model.get("type") != "Audio" ) {
                return { model: false };
            } else if ( this.model.get("type") == "Audio" ) {
                return _.extend({ model: true }, this.model.toJSON() );
            }
        },

        initialize: function() {
            app.status.on("change:currentSequence", this.onEnterSequence, this );
            this.onEnterSequence( app.status.get("currentSequence") );
        },

        onEnterSequence: function( sequence ) {
            if ( sequence.get("attr").soundtrack ) {
                this.setSoundtrackLayer( app.project.getLayer( sequence.get("attr").soundtrack ) );
            }
        },

        afterRender: function() {
            this.makeDroppable();
            app.trigger("rendered", this );
        },

        makeDroppable: function() {
            this.$el.droppable({
                accept: ".item",
                tolerance: "pointer",
                hoverClass: "can-drop",
                drop: function( e, ui ) {
                    if ( _.contains( ["Audio"], app.dragging.get("layer_type") )) {
                        this.updateWaveform( app.dragging.get("thumbnail_url") );

                        app.status.get('currentSequence').setSoundtrack( app.dragging, this );
                    }
                }.bind( this )
            });
        },

        updateWaveform: function( url ) {
            this.$(".soundtrack-waveform").css({
                background: "url(" + url + ")",
                backgroundSize: "100% 100%"
            });
        },

        setSoundtrackLayer: function( layer ) {
            if ( this.model !== null ) {
                this.removeSoundtrack( false );
            }
            if ( layer ) {
                this.model = layer;
                this.model.on("play", this.onPlay, this );
                this.model.on("pause", this.onPause, this );
                this.model.on("timeupdate", this.onTimeupdate, this );
            }
            this.render();
        },

        onPlay: function( obj ) {
            this.$(".playpause i")
                .removeClass("icon-play")
                .addClass("icon-pause");
        },

        onPause: function( obj ) {
            this.$(".playpause i")
                .addClass("icon-play")
                .removeClass("icon-pause");
        },

        onTimeupdate: function( obj ) {
            this.$(".elapsed").css("width", ( obj.currentTime / obj.duration ) * 100 + "%" );
            this.$(".time-display").text( this.toMinSec( obj.currentTime ) + " / " + this.toMinSec( obj.duration ) );
        },

        events: {
            "click .playpause": "playpause",
            "click .remove": "removeSoundtrack"
        },

        playpause: function() {
            this.model.visual.playPause();
        },

        onRemoveSoundtrack: function() {
            if ( confirm("Remove soundtrack from project?") ) {
                this.removeSoundtrack( true );
            }
        },

        removeSoundtrack: function( save ) {
            this.stopListening( this.model );

            if ( save ) {
                app.status.get('currentSequence').removeSoundtrack( this.model );
                app.status.get('currentSequence').lazySave();
            }
            this.model = null;
            this.render();
        },

        toMinSec: function( s ) {
            var min, sec;

            min = Math.floor( s / 60 );
            min = min < 10 ? "0" + min : min;
            sec = Math.round( s % 60 );
            sec = sec < 10 ? "0" + sec : sec;

            return min + ":" + sec;
        }
        
    });

});
