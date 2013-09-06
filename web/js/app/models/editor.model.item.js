(function(Items){

    Items.Model = Backbone.Model.extend({

        url: function()
        {
            var url;

            if(_.isUndefined(this.id)){
                url = zeega.app.apiLocation + "api/items";
            } else {
                url = zeega.app.apiLocation + "api/items/"+this.id;
            }
            console.log(url, this.id, "ok");
            return url;

        },

        initialize : function(){}

    });

})(zeega.module("items"));
