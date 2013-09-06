define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    // Create a new module
    var MenuBar = {};

    // This will fetch the tutorial template and render it.
    MenuBar.View = Backbone.View.extend({
        
        timer: null,
        visible: false,
        hover: false,

        template: "menu-bar-top",

        className: "ZEEGA-player-menu-bar",

        serialize: function() {
            if ( this.model.project ) {
                return _.extend({
                        directory: sessionStorage.getItem("directory"),
                        hostname: sessionStorage.getItem("hostname")
                    },
                    this.model.project.toJSON()
                    );
            }
        },

        initialize: function() {
            this.model.on("data_loaded", this.render, this);
            this.model.on("sequence_enter", this.onEnterSequence, this );
            this.model.on("pause", this.fadeIn, this );
        },

        afterRender: function() {
            //check if embed
            if (window!=window.top) {
                this.$el.find(".menu-bar-left a").attr("target","_blank");
            }
        },

        onEnterSequence: function( info ) {
            this.updateDescription( info );
        },

        updateDescription: function( info ) {
            /* update the sequence title in the menu bar */
            // var def = /Sequence ([0-9]*)/g.test(info.title);
            // var seqTitle = def ? "" : " - "+ info.title;
            // this.$(".sequence-description").text(seqTitle);
        },

        events: {
            "click #project-share": "share",
            "click #project-credits": "credits",
            "click #project-fullscreen-toggle": "toggleFullscreen",
            "mouseenter": "onMouseenter",
            "mouseleave": "onMouseleave",
            "click .project-title": "home"
        },

        share: function() {
            this.model.pause();
            this.$(".slide-menu").toggle();
            return false;
        },

        credits: function() {
            return false;
        },

        toggleFullscreen: function() {
            if ( app.state.get("fullscreen") ) {
                this.leaveFullscreen();
            } else {
                this.goFullscreen();
            }
            return false;
        },

        goFullscreen : function() {
            app.state.set("fullscreen", true );
            docElm = document.getElementById("main");
              
            if ( docElm.requestFullscreen ) docElm.requestFullscreen();
            else if ( docElm.mozRequestFullScreen ) docElm.mozRequestFullScreen();
            else if ( docElm.webkitRequestFullScreen ) docElm.webkitRequestFullScreen();

            this.$("#project-fullscreen-toggle i")
                .removeClass("icon-resize-full")
                .addClass("icon-resize-small");
        },

        leaveFullscreen : function() {
            app.state.set("fullscreen", false );
            if ( document.exitFullscreen )        document.exitFullscreen();
            else if ( document.mozCancelFullScreen )    document.mozCancelFullScreen();
            else if ( document.webkitCancelFullScreen )   document.webkitCancelFullScreen();

            this.$("#project-fullscreen-toggle i")
                .addClass("icon-resize-full")
                .removeClass("icon-resize-small");
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

        home: function() {
            this.model.cueFrame( this.model.get("startFrame") );
            
            return false;
        }

    });

    return MenuBar;
});