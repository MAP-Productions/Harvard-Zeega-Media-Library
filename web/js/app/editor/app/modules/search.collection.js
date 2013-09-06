define([
    "app",
    "modules/item.model",
    "backbone"
],

function( app, ItemModel ) {

    return Backbone.Collection.extend({
        
        model: ItemModel,
        search: null,

        initialize: function( models, options ) {
            this.search = options.search;
            this.fetch();
        },

        url: function() {
            var url = "http://www.zeega.com/api/items/search?";
//            var url = app.api + "items/search?";

            _.each( this.search.toJSON(), function( value, key ) {
                if ( value !== "" && value !== null ) {
                    url += key + "=" + value + "&";
                }
            });

            return url;
        },

        parse: function( response ) {
            return response.items;
        }

    });

});
