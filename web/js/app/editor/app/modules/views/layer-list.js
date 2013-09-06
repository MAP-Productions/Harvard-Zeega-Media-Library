define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    return Backbone.View.extend({

        tagName: "li",
        template: "layer-list",
        className: "ZEEGA-layer-list",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.model.on("focus", this.onFocus, this );
            this.model.on("blur", this.onBlur, this );
            this.model.on("remove", this.onRemove, this );
            this.model.on("sync", this.onSync, this );
        },

        events: {
            "click .action": "doAction",
            "click": "selectLayer"
        },

        doAction: function( e ) {
            this[ $(e.target).data("action") ]();
        },

        continueToNextFrame: function() {
            this.$el.attr("data-continue", "true");
            app.status.get("currentSequence").continueLayerToNextFrame( this.model );
        },

        continueToChapter: function() {
            this.$el.attr("data-persist", "true"); // this will toggle!!
            app.status.get("currentSequence").togglePersistance( this.model );
        },

        deleteLayer: function() {
            if ( confirm("do you really want to delete this layer?") ) {
                this.model.collection.remove( this.model );
            }
        },

        selectLayer: function() {
            if ( app.status.get("currentLayer") != this.model ) {
                app.status.setCurrentLayer( this.model );
            }
        },

        onFocus: function() {
            this.$el.addClass("active");
        },

        onBlur: function() {
            this.$el.removeClass("active");
        },

        onRemove: function() {
            // this.model.onRemoveFrom Edito()>>???
            this.remove();
        },

        onSync: function() {
            this.updateTitle();
        },

        updateTitle: function() {
            this.$(".layer-title").text( this.model.getAttr("title"));
        }
        
    });

});
