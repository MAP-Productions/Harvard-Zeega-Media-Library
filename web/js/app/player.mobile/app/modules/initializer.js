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

    return Backbone.Model.extend({

        initialize: function() {
            console.log(app.api);
            $("#main").empty()
                .append("<div id='overlays'></div>")
                .append("<div id='player'></div>")
                .append("<div id='underlay'></div>");

            this.initPlayer();
        },

        initPlayer: function() {
            app.player = new Zeega.player({
                // debugEvents: true,
                autoplay: false,
                cover: true,
                target: '#player',
                startFrame: app.state.get("frameID"),
                keyboard: false,
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.api + "/items/" + app.state.get("projectID") :
                    "testproject.json"
            });
            if ( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.once('data_loaded', function() {
                    this.onDataLoaded();
                }, this);
            }
        },

        onDataLoaded: function( parsed ) {
            app.layout = new UI.Layout({ model: app.player });
        }

  });
});