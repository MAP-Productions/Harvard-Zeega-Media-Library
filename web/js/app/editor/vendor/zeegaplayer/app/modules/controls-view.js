define([
    "zeega",
    "modules/controls/arrows",
    "modules/controls/close",
    "modules/controls/playpause"
],
function( Zeega, ArrowView, CloseView, PlayPauseView ) {

    return Zeega.Backbone.LayoutView.extend({

        className: "ZEEGA-basic-controls",
        manage: true,

        initialize: function( args, options ) {
            this.model.on("frame_play", this.onFramePlay, this );
            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );
        },

        beforeRender: function() {
            if ( this.options.settings.close ) {
                this.insertView( new CloseView() );
            }
            if ( this.options.settings.arrows ) {
                this.insertView( new ArrowView() );
            }

            if ( this.options.settings.playpause ) {
                this.insertView( new PlayPauseView() );
            }
        },

        serialize: function() {

            // return _.defaults( this.options.settings, {
            //     arrows: true,
            //     close: true,
            //     playpause: true
            // });
        },

        events: {
            "click .ZEEGA-close": "close",
            "click .ZEEGA-prev": "prev",
            "click .ZEEGA-next": "next",
            "click .ZEEGA-playpause": "playpause"
        },

        close: function( event ) {
            event.preventDefault();
            this.model.destroy();
        },

        prev: function( event ) {
            event.preventDefault();
            this.model.cuePrev();
        },

        next: function( event ) {
            event.preventDefault();
            this.model.cueNext();
        },

        onFramePlay: function( info ) {
            switch(info._connections) {
                case "l":
                    this.activateArrow("ZEEGA-prev");
                    this.disableArrow("ZEEGA-next");
                    break;
                case "r":
                    this.disableArrow("ZEEGA-prev");
                    this.activateArrow("ZEEGA-next");
                    break;
                case "lr":
                    this.activateArrow("ZEEGA-prev");
                    this.activateArrow("ZEEGA-next");
                    break;
                default:
                    this.disableArrow("ZEEGA-prev");
                    this.disableArrow("ZEEGA-next");
            }
        },

        onPlay: function() {
            this.$(".ZEEGA-playpause")
                .addClass("pause-zcon")
                .removeClass("play-zcon");
        },
        
        onPause: function() {
            this.$(".ZEEGA-playpause")
                .addClass("play-zcon")
                .removeClass("pause-zcon");
        },

        playpause: function( event ) {
            event.preventDefault();
            this.model.playPause();
        },

        activateArrow: function(className) {
            this.$("."+ className +".disabled").removeClass("disabled");
        },

        disableArrow: function(className) {
            this.$("."+ className).addClass("disabled");
        }

    });

});
