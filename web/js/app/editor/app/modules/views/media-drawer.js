define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "media-drawer",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            this.renderCollections();
            this.collection.on("add", this.renderCollection, this );
            this.onResize();
        },

        renderCollections: function() {
            this.$(".ZEEGA-items").empty();
            this.collection.each(function( collection ) {
                this.renderCollection( collection );
            }, this );
        },

        renderCollection: function( collection ) {
            this.$(".ZEEGA-items").append( collection.view.el );
            collection.view.render();
        },

        events: {
            "click .gridToggle": "gridToggle",
            "click .clearSearch": "clearSearch",
            "keyup .search-box": "onSearchKepress",
            "focus .search-box": "onSearchFocus"
        },

        gridToggle: function() {
            this.$el.toggleClass("list");

            this.$(".gridToggle i").toggleClass("icon-th")
                .toggleClass("icon-th-list");
        },

        clearSearch: function() {
            this.$(".search-box").val("");
            this.search("");
        },

        onSearchFocus: function() {
            
        },

        onSearchKepress: function( e ) {
            if ( e.which == 13 ) {
                this.search( this.$(".search-box").val() );
            }
        },

        search: function( query ) {
            var args = this.collection.at(0).get("urlArguments");

            args.q = query;
            this.collection.at(0).set("urlArguments", args );
            this.collection.at(0).mediaCollection.fetch();
        },

        onResize: function() {
            var leftCol = $(".left-column .static-upper").height() +
                $(".left-column .media-drawer-controls").height();

            this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
