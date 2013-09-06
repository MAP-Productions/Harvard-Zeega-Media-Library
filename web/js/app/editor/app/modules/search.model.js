define([
    "app",

    "modules/search.collection",
    "modules/views/items",
    "backbone"
],

function( app, SearchCollection, ItemsView ) {

    return Backbone.Model.extend({
        
        items: null,
        history: [],

        defaults: {
            collection: "",
            type: "-project AND -collection",
            page: 1,
            q: "",
            user: 36,
            sort: "date-desc"
        },

        initialize: function() {

            app.once("rendered", this.onLayoutRendered, this );
            // create collection. bootstraps itself
            this.collection = new SearchCollection([], { search: this });
            this.collection.on("reset", this.onCollectionReset, this );
            this.on("change:q", this.updateItems, this );
        },

        updateItems: function() {
            this.collection.fetch();
        },

        onLayoutRendered: function() {
            var itemsView = new ItemsView({
                model: app,
                el: app.layout.$(".media-drawer")
            });

            itemsView.render();
            app.layout.itemsView = itemsView;
        },

        onCollectionReset: function( collection ) {
            app.layout.itemsView.collection = collection;
            app.layout.itemsView.renderItems();
        }

    });

});
