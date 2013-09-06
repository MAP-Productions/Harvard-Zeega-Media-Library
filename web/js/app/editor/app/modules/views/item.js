define([
    "app",
    "backbone"
],

function( app, ItemView ) {

    return Backbone.View.extend({

        className: function() {
            return "item item-" + this.id;
        },
        tagName: "li",
        template: "item",

        serialize: function() {
            return this.model.toJSON();
        },

        afterRender: function() {
            this.listenTo(this.model, 'destroy', this.remove);
            this.$el.draggable({
                revert: "invalid",
                cursorAt: {
                    left: 0,
                    top: 0
                },
                helper: function( e ) {
                    return $(this).find(".item-thumb").clone().addClass("item-dragging");
                },
                start: function() {
                    app.dragging = this.model;
                }.bind( this ),
                stop: function() {
                    app.dragging = null;
                }
            });
        },

        events: {
            "click": "viewItem"
        },

        viewItem: function() {
            this.model.collection.itemViewer( this.model );
        }

    });

});
