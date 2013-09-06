define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    Navbar = Backbone.View.extend({

        template: "navbar",
        className: "navbar ZEEGA-hmenu dark",
        
        serialize: function() {
            return {
                userId: app.userId,
                userProjects: $.parseJSON( window.userProjects ),
                directory: app.directory,
                root: app.root
            };
        }
    });

    // Required, return the module for AMD compliance
    return Navbar;

});
