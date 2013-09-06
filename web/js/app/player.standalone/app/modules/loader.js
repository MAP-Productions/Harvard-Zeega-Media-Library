define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    // Create a new module
    var Loader = {};

    // This will fetch the tutorial template and render it.
    Loader.View = Backbone.View.extend({

        DELAY: 2000,
        /* variables keeping track of generic layer states */
        layerCount : 0,
        layersReady : 0,

        className: "ZEEGA-loader-overlay",
        template: "loader",

        initialize: function() {
            this.model.on("layer_loading", this.onLayerLoading, this );
            this.model.on("layer_preloaded", this.onLayerReady, this );
        },

        serialize: function() {
            if ( this.model.project ) {
                return this.model.project.toJSON();
            }
        },

        afterRender: function() {

            // investigate the ui for this
            /*
            var coverImage;

            coverImage = this.model.data.get("cover_image");
            if( !_.isNull( coverImage ) && coverImage != "../../../images/default_cover.png" ) {
                this.$(".ZEEGA-loader-bg").css({
                    "background": "url('" + coverImage +"')",
                    "background-position": "50% 50%",
                    "background-repeat": "no-repeat no-repeat",
                    "background-attachment": "fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover"
                });
            }
            */
        },

        onLayerLoading: function( layer ) {
            this.layerCount++;

            if( _.contains(["Audio", "Image", "Video"], layer.type) ) {
                var item, itemType;

                itemType = layer.attr.archive || layer.type;
                item = "<li><i class='zitem-" + itemType.toLowerCase() +" zitem-30' data-id='" + layer.id + "'></i></li>";
                this.$(".ZEEGA-loading-layers").append( item );
            }
        },

        onLayerReady: function(layer) {
            this.layersReady++;

            this.$("[data-id='" + layer.id + "']").addClass('loaded');

            this.$(".ZEEGA-loading-bar").stop().animate({
                width: (this.layersReady/this.layerCount*100) +"%"
            });
            if (this.layersReady == this.layerCount) {
                _.delay(function(){
                    this.onCanPlay();
                }.bind( this ), this.DELAY );
            }
        },

        onCanPlay: _.once(function() {
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
            app.layout.hasPlayed = true;
            app.layout.showMenubar();
            app.layout.showCitationbar();
            this.model.play();
        })

  });

  // Required, return the module for AMD compliance
  return Loader;

});
