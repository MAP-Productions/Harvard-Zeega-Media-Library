/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",
    "backbone",

    "modules/loader",
    "modules/pause",
    "modules/underlay",
    "vendor/hammer/hammer"
],

function( app, Backbone, Loader, Pause, Underlay ) {

    // Create a new module
    var UI = {};

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({
        
        coffin: false,
        pauseView: null,
        el: "#main",

        initialize: function() {
            this.loader = new Loader({ model: this.model });
            this.underlay = new Underlay({ model: this.model });

            this.insertView("#overlays", this.loader );
            this.insertView("#underlay", this.underlay );
            this.render();
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
            this.startTouchEvents();
        },

        events: {
            "click #player": "pause"
        },

        pause: function() {
            app.player.playPause();

            if ( this.pauseView === null ) {
                this.pauseView = new Pause({ model: this.model });
            }
            this.$("#overlays").html( this.pauseView.el );
            this.pauseView.render();
        },

        startTouchEvents: function() {
            this.hammer = new Hammer( this.el, {
                prevent_default: false
            });
            this.hammer.onswipe = function( e ) {
                console.log('hammer swipe');
                this.onSwipe( e );
            }.bind( this );
        },

        onSwipe: function( e ) {
            if ( this.model.state == "playing" && this.model.status.get("current_frame_model").get("attr").advance === 0 ) {
                if ( e.direction == "left") {
                    this.model.cueNext();
                } else if ( e.direction == "right") {
                    this.model.cuePrev();
                }
            } else if ( this.model.state == "paused" && this.coffin && e.direction == "left" ) {
                this.hideCoffin();
            } else if ( this.model.state == "paused" && !this.coffin && e.direction == "right" ) {
                this.showCoffin();
            } else if ( !app.hasPlayed && !this.coffin && e.direction == "left" ) {
                this.loader.play();
            } else if ( app.hasPlayed && !this.coffin && e.direction == "left" ) {
                this.pauseView.play();
            }
        },

        toggleCoffin: function() {
            if ( this.coffin ) {
                this.hideCoffin();
            } else {
                this.showCoffin();
            }
        },

        showCoffin: function() {
            this.coffin = true;
            this.underlay.show();
            $("#overlays, #player").animate({
                left: "83%"
            });
            $("#underlay").fadeIn();
        },

        hideCoffin: function() {
            this.coffin = false;
            $("#overlays, #player").animate({
                left: 0
            });
            $("#underlay").fadeOut();
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});