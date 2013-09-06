/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "backbone",

    "modules/ui",

     // Plugins
    'zeegaplayer'
],

function(app, Backbone, UI) {

    // Create a new module
    var Controller = {};

    // Does this need to be a model?? why not right?
    Controller.Model = Backbone.Model.extend({

        initialize: function() {
            this.initPlayer();
        },

        initPlayer: function() {
            app.player = new Zeega.player({
                // debugEvents: true,
                // cover: false,
                controls: false,
                autoplay: false,
                target: '#player',
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.api + "/items/" + app.state.get("projectID") :
                    "testproject.json",
                startFrame: app.state.get("frameID")
            });

            if( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.on('data_loaded', this.onDataLoaded, this);
            }
            app.player.on('frame_play', this.onFrameRender, this);
            app.player.on('sequence_enter', this.updateWindowTitle, this);
        },

        onDataLoaded: function() {
            /*
            render base layout
            the base layout contains the logic for the player skin (citations, ui, etc)
            */
            app.layout = new UI.Layout();
        },

        onFrameRender: function( info ) {
            // app.router.navigate( 'f/'+ info.id );
        },

        updateWindowTitle: function( info ) {
            var title = app.player.project.get("title") + " by " + app.player.project.get("authors");

            $('title').text( title );
        }

  });

    // Required, return the module for AMD compliance
    return Controller;
});