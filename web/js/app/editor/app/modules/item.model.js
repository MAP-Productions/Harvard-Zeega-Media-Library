define([
    "app",
    "modules/views/item",
    "backbone"
],

function( app, ItemView ) {

    return Backbone.Model.extend({
        
        view: null,

        url: function(){
            var url = app.api + "items/" + this.id;

            return url;
        },
        
        initialize: function() {
            this.view = new ItemView({ model: this });
        }

    });

});
