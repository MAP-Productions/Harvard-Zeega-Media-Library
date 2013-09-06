define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "frame",
        className: "ZEEGA-frame",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.model.on("focus", this.onFocus, this );
            this.model.on("blur", this.onBlur, this );
            this.model.on("thumbUpdateStart", this.onThumbUpdateStart, this );
            this.model.on("change:thumbnail_url", this.onThumbUpdateComplete, this );
        },

        onThumbUpdateStart: function() {
            this.$el.css({
                background: "url(assets/img/tiny-stripes.png)"
            });
            this.$(".frame-thumb").css({
                opacity: 0.5
            });
        },

        onThumbUpdateComplete: function() {
            this.$el.css({
                background: "transparent"
            });
            this.$(".frame-thumb").css({
                background: "url(" + this.model.get("thumbnail_url") + ") no-repeat center center",
                opacity: 1
            });
        },

        events: {
            "click .frame-thumb": "viewFrame",
            "click .action": "doAction"
        },

        doAction: function( e ) {
            this[ $(e.target).closest("a").data("action") ]();
        },

        deleteFrame: function() {
            if ( confirm("Delete Frame? This cannot be undone!") ) { 
                console.log('delete frame', this.model );
                this.model.collection.remove( this.model );
            }
        },

        viewFrame: function() {
            this.model.status.setCurrentFrame( this.model );
        },

        onFocus: function() {
            this.$el.addClass("active");
        },
        onBlur: function() {
            this.$el.removeClass("active");
        }
        
    });

});
