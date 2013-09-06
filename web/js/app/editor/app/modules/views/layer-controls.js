define([
    "app",

    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        controls: [],
        inFocus: null,

        template: "layer-control-bar",
        className: "ZEEGA-layer-control-bar",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
        },

        afterRender: function() {
            app.trigger("rendered", this );
        },

        onLayerFocus: function( status, layerModel ) {

            if ( this.inFocus ) {
                this.stopListening( this.inFocus );
            }

            if ( layerModel !== null ) {
                this.$(".layer-bar-title").text( layerModel.getAttr("title") );
                this.loadControls( layerModel );
            } else if ( layerModel === null ) {
                this.clearControls();
            }
            this.listen( layerModel );
        },

        listen: function( layerModel ) {
            if ( layerModel ) {
                layerModel.on("focus", this.onFocus, this );
                layerModel.on("blur", this.onBlur, this );
                layerModel.on("remove", this.onRemove, this );
            }
        },

        loadControls: function( layerModel ) {
            this.clearControls();

            _.each( layerModel._controls, function( control ) {
                    this.$(".layer-controls-inner").append( control.el );
                    control.render();
            });

        },

        onFocus: function() {

        },

        onBlur: function() {
            this.clearControls();
        },

        onRemove: function() {
            this.stopListening( this.inFocus );
            this.clearControls();
        },

        clearControls: function() {
            this.$(".layer-bar-title").empty();
            this.$(".layer-controls-inner").empty();
        }

    });

});
