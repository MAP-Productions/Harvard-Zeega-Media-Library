define([
    "app",
    "backbone"
],

function( app ) {


    Item = {};
    
    Item.Model = Backbone.Model.extend({

    });

    Item.Collection = Backbone.Collection.extend({
        model: Item.Model,

        initialize: function( options ){
            _.extend( this, options );

        },

        url: function() {
            
            var url = app.api + "items/search?collection=" + this.id + "&fields=id,user_id,thumbnail_url,title,display_name,headline,description";
            return url;
        },

        parse: function( response ) {
            return response.items;
        }

    });

    Item.View = {};

    Item.View.Large = Backbone.View.extend({

        template: "item",
        className: "collection-item standard",
        tagName: "a",

        serialize: function() {
            return this.model.toJSON();
        },
        
        initialize: function() {
   
        },

        beforeRender: function() {
            this.$el.css({"background-image": "url('" + this.model.get("thumbnail_url") + "')"});
            this.$el.attr({"href": "http://zeega.com/" + this.model.get("id")});
        },

        onReset: function() {

        }
    });

    Item.View.Mini = Item.View.Large.extend({

        template: "item-mini",
        className: "collection-item mini"

    });


    // Required, return the module for AMD compliance
    return Item;

});
