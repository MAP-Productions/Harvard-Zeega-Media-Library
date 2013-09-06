 define([
    "app",
    "modules/theme",
    "backbone"
],

function( app, Theme ) {

    var MainCollection = Backbone.Collection.extend({

        initialize: function( options ){
            _.extend( this, options );

        },

        url: function() {
            
            var url = app.api + "items/" + this.id + "/items?fields=media_geo_latitude,media_geo_longitude,media_creator_username,media_creator_realname,id,attribution_uri,thumbnail_url,uri,title,description,date_created,media_type,tags,layer_type,display_name,eidtable,published";
            return url;
        },

        parse: function( response ) {
            return response.items;
        }

    });
    



    var MainLayout = Backbone.Layout.extend({

        el: "#main",
        template: "layout-main",

        initialize: function() {
            
            var collectionData;
            // var lazyResize = _.debounce(function() {
            //     this.lazyResize();
            // }.bind( this ), 300);

            // $( window ).resize( lazyResize );
            // this.themes = new MainCollection({ id: this.id });
            // this.themes.on("reset", this.onReset, this );
            // 92990

            if ( window.collections ) {
                collectionData = jQuery.parseJSON( window.collections );
                this.themes = new Theme.Collection(collectionData.items);
            } else {
                            this.themes = new Theme.Collection([
                {
                    "id": 92569,
                    "user_id": null,
                    "username": "",
                    "display_name": "James Burns",
                    "title": "First Zeegas",
                    "description": "These Zeegas are my favorite :)",
                    "tags": [
                        "backgroundColor-#ebebeb", "format-large", "order-0"
                    ]
                },

                {
                    "id": 92989,
                    "user_id": null,
                    "username": "",
                    "display_name": "James Burns",
                    "title": "Second Zeegas",
                    "description": "Poop",
                    "tags": [
                        "backgroundColor-#fdb2a6","format-mini", "order-1"
                    ]
                },
                
                {
                    "id": 93607,
                    "user_id": null,
                    "username": "",
                    "display_name": "James Burns",
                    "title": "Third Zeegas",
                    "description": "Poop",
                    "tags": [
                        "backgroundColor-#ebebeb", "format-large", "order-2"
                    ]
                },
                {
                    "id": 93608,
                    "user_id": null,
                    "username": "",
                    "display_name": "James Burns",
                    "title": "Fourth Zeegas",
                    "description": "These Zeegas are my favorite :)",
                    "tags": [
                        "backgroundColor-#fdb2a6", "format-mini", "order-3"
                    ]
                }

            ]);
            }

            this.themes.parseTags();
            console.log(this.themes);
            
        },

        beforeRender: function() {

            var _this = this;
            
            _this.themes.each(function( theme ) {
                if( theme.get("format") == "large"){
                    _this.insertView( "#content", new Theme.View.Large({ model: theme }) );
                } else {
                    _this.insertView( "#content", new Theme.View.Mini({ model: theme }) );
                }
            });
           
        },

        afterRender: function() {

             
        },

        lazyResize: function() {
            app.trigger("window-resize");
        }
    });

    return MainLayout;

});
