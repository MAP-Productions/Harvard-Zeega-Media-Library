define([
    "app",

    "modules/views/navbar",
    "modules/views/project-meta",
    "modules/views/sequences",
    "modules/views/frames",
    "modules/views/frame-controls",
    "modules/views/workspace",
    "modules/views/layers",
    "modules/views/layer-controls",
    "modules/views/layer-drawer",
    "modules/views/soundtrack",

    "modules/views/media-drawer",
    // "modules/search.model",

    "backbone"
],

function( app, Navbar, ProjectMeta, Sequences, Frames, FrameControls, Workspace, Layers, LayerControls, LayerDrawer, Soundtrack, MediaDrawer) {

    return Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",
        manage: true,

        initialize: function() {
            app.on("rendered", this.lazyResize, this );
            $( window ).resize( this.lazyResize );
        },

        beforeRender: function() {
            this.insertView( ".nav", new Navbar({ model: app }) );
            this.insertView( ".sequences", new Sequences({ model: app }) );
            this.insertView( ".workspace", new Workspace({ model: app }) );
            this.insertView( ".layers", new Layers({ model: app }) );
        },

        afterRender: function() {

            new Soundtrack({
                el: this.$(".soundtrack")
            }).render();

            new ProjectMeta({
                model: app,
                el: this.$(".project-meta")
            }).render();

            new LayerDrawer({
                model: app,
                el: this.$(".layer-drawer")
            }).render();

            new Frames({
                model: app,
                el: this.$(".frames")
            }).render();

            new FrameControls({
                model: app,
                el: this.$(".frame-controls")
            }).render();

            new LayerControls({
                model: app,
                el: this.$(".layer-controls"),
                afterRender: function() {
                    app.trigger("rendered");
                }
            }).render();

            new MediaDrawer({
                collection: app.mediaCollection,
                el: this.$(".media-drawer")
            }).render();

        },

        lazyResize: _.debounce(function() {
            app.trigger("window-resize");
        }, 500 )

    });

});
