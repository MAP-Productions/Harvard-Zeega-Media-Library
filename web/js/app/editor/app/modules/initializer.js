define([
    "app",
    // Modules
    "modules/status",
    "modules/layout-main",
    // Plugins
    "zeega-parser/parser",
    "modules/media-collection",
    "backbone"
],

function( app, Status, Layout, ZeegaParser, MediaCollection ) {

    return Backbone.Model.extend({
        
        initialize: function() {
            this.loadMetadata();
            app.mediaCollection = new MediaCollection();
            this.loadProject();
        },

        loadMetadata: function() {
            var meta = $("meta[name=zeega]");

            app.userId = meta.data("userId");
            app.projectId = meta.data("projectId");
            app.root = meta.data("root");
            app.apiRoot = meta.data("apiRoot"); // dev only
            app.api = "http:" + meta.data("hostname") + ( app.apiRoot ? app.apiRoot : app.root ) + "api/";
            app.featuredAPI = app.api + "items/featured";

        },

        loadProject: function( attributes ) {
            if ( window.projectJSON ) {
                this._parseData( jQuery.parseJSON( window.projectJSON ) );
            } else {
                var rawDataModel = new Backbone.Model();

                // mainly for testing
                rawDataModel.url = "http://dev.zeega.org/joseph/web/api/projects/6982";
                rawDataModel.fetch().success(function( response ) {
                    this._parseData( response );
                }.bind( this )).error(function() {
                    throw new Error("Ajax load fail");
                });
            }
        },

        _parseData: function( response ) {
            app.status = new Status();
            app.project = new ZeegaParser.parse( response, {
                pluginsPath: "app/zeega-parser/plugins/",
                attach: {
                    status: app.status
                }
            });

            app.status.set({
                currentSequence: app.project.sequences.at( 0 ),
                currentFrame: app.project.sequences.at( 0 ).frames.at( 0 )
            });
            console.log( app.project );
            this.insertLayout();
        },

        insertLayout: function() {
            app.layout = new Layout();
            app.layout.render();
        }

    });

});
