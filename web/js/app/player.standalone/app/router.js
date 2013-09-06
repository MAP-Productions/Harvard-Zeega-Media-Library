define([
    // Application.
    "app",
    // Modules.
    "modules/controller"
],

function( app, Controller ) {
    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            "": "base",
            "f/:frameID": 'goToFrame',
            "frame/:frameID": "goToFrame",
            "*path": "base"
        },

        /*
        when no route is present.

        player could wait for user input or rely on bootstrapped data
        */
        base: function() {
            initialize();
        },

        goToFrame: function( frameID ) {
            app.state.set({
                frameID: frameID
            });
            if(app.state.get("initialized")) {
                app.player.cueFrame( frameID );
            }
            initialize();
        }

    });

    /* create init fxn that can only run once per load */
    var init = function() {
        new Controller.Model();
        app.state.set("initialized", true );
    };
    var initialize = _.once( init );
    
    return Router;
});