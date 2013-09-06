/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",

    // Libs
    "backbone",

    // Modules,
    "modules/loader",
    "modules/controls",
    "modules/menu-bar-bottom",
    "modules/menu-bar-top",
    "modules/pause"
],

function( app, Backbone, Loader, Controls, MenuBarBottom, MenuBarTop, PauseView ) {

    // Create a new module
    var UI = {};

    var FADE_OUT_DELAY = 3000;

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({

        hasPlayed: false,
        el: "#main",

        initialize: function() {
            this.setWindowSize();

            app.player.on("pause", this.onPause, this );
            app.player.on("play", this.onPlay, this );

            this.loader = new Loader.View({ model: app.player });
            this.controls = new Controls.View({ model: app.player });
            this.citations = new MenuBarBottom.View({ model: app.player });
            this.menuBar = new MenuBarTop.View({ model: app.player });

            this.insertView("#overlays", this.loader );
            this.insertView("#overlays", this.controls );

            this.insertView("#overlays", this.citations );
            this.insertView("#overlays", this.menuBar );
            
            this.render();

            $( window ).resize(function() {
                this.onResize();
            }.bind(this));
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
            // this.resetFadeOutTimer();
        },

        // sets the window size lazily so we don't have to do it elsewhere
        setWindowSize: function() {
            app.state.set("windowWidth", window.innerWidth );
            app.state.set("windowHeight", window.innerHeight );
        },

        events : {
            "mousemove": "onMouseMove",
            "resize": "onResize"
        },

        onResize: _.debounce( function() {
            this.setWindowSize();
        }, 500 ),

        onMouseMove: function( e ) {
            if ( this.hasPlayed ) {
                var pageX = e.pageX,
                    pageY = e.pageY;

                if ( pageY < 100 ) {
                    this.showMenubar();
                } else if ( pageY > app.state.get("windowHeight") - 100 ) {
                    this.showCitationbar();
                }
            }
        },

        showMenubar: _.debounce(function() {
            this.menuBar.fadeIn();
        }, 500, true ),

        showCitationbar: _.debounce(function() {
            this.citations.fadeIn();
        }, 500, true ),

        onPause: function() {
            this.pause = new PauseView({ model: app.player });
            this.$("#overlays").prepend( this.pause.el );
            this.pause.render();
        },

        onPlay: function() {
            this.menuBar.fadeOut();
            this.citations.fadeOut();
            if ( this.pause ) {
                this.pause.remove();
            }
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});