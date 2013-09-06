define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    ProjectMeta = Backbone.View.extend({

        drawerClass: "",
        template: "project-meta",
        
        serialize: function() {
            return _.extend({ drawerClass: this.drawerClass }, this.model.project.toJSON() );
        },

        generateRandomTitle: function() {
            return adjective[ Math.floor( Math.random() * adjective.length ) ] + " " + noun[ Math.floor( Math.random() * noun.length ) ];
        },

        afterRender: function() {
            this.makeCoverDroppable();

            if ( app.project.get("cover_image") === "" ) {
                this.model.on("layer_added", this.onLayerAdded, this );
            }

            this.model.project.on("sync", this.render, this );
        },

        makeCoverDroppable: function() {
            this.$el.droppable({
                accept: ".item",
                tolerance: "pointer",
                drop: function( e, ui ) {
                    if ( _.contains( ["Image"], app.dragging.get("layer_type") )) {
                        var cover = app.dragging.get("uri");

                        this.updateCoverImage( cover );
                    }
                }.bind( this )
            });
        },

        onLayerAdded: function( layer ) {
            if ( this.model.project.get("cover_image") === "" ) {
                if ( layer.get("type") == "Image" ) {
                    this.updateCoverImage( layer.getAttr("uri") );
                }
            } else {
                this.model.off("layer_added");
            }
        },

        updateCoverImage: function( url ) {
            app.project.save("cover_image", url );

            $(".ZEEGA-project-cover").fadeOut("fast", function() {
                $(".ZEEGA-project-cover")
                    .attr("style", "")
                    .css({
                        background: "url(" + url + ")",
                        "-webkit-background-size": "cover"
                    })
                    .fadeIn("fast");
            });
        },

        events: {
            "keypress .ZEEGA-project-title": "onTitleKeyup",
            "blur .ZEEGA-project-title": "onBlur",
            "click .meta-menu a": "onMenuClick",
            "click .preview": "projectPreview",
            "click .project-share-toggle": "toggleShare",
            "click .social-share": "socialShare"
        },

        onTitleKeyup: function( e ) {
            if ( e.which == 13 ) {
                this.$(".ZEEGA-project-title").blur();
                return false;
            }
        },

        onMenuClick: function( e ) {
            var $target = $(e.target).closest("a");

            if ( !$target.hasClass("disabled") ) {
                this[ $target.data("action") ]();
            }
        },

        projectPreview: function() {
            var projectData = app.project.getProjectJSON();
            
console.log("preview project", projectData);
            app.zeegaplayer = new Zeega.player({
                data: projectData,
                startFrame: app.status.get("currentFrame").id,
                controls: {
                    arrows: true,
                    close: true
                }
            });
        },

        toggleShare: function() {

            if ( this.drawerClass == "open" ) {
                this.drawerClass = "";
                this.$(".hidden-drawer").removeClass("open");
            } else {
                this.drawerClass = "open";
                this.$(".hidden-drawer").addClass("open");
                this.model.project.publishProject();
            }
        },

        socialShare: function( e ) {
            // prevent unpublished links from being shared
            if ( $( e.target ).closest(".social-share").data("itemid") === null ) {
                e.preventDefault();
                return false;
            }
        },

        onBlur: function() {
            if ( this.model.project.get("title") != this.$(".ZEEGA-project-title").text() ) {
                this.model.project.save("title", this.$(".ZEEGA-project-title").text() );
            }
        }
    });

    // Required, return the module for AMD compliance
    return ProjectMeta;

});
