(function(Modal) {
    
    Modal.Views.AddMedia = Backbone.View.extend({
        
        className : "modal",
        
        render: function()
        {
            this.imageUrls = [];
            this.$el.html( this.getTemplate() );
            return this;
        },

        events : {
            "click .close" : "hide",
            "change .add-photo input" : "imageUpload"
        },

        show : function(){ this.$el.modal("show"); },
        hide : function(){ this.$el.modal("hide"); },
        imageUpload: function(event) {
            var fileInput = event.target, imageData;
            imageData = new FormData();
            
            imageData.append( "file", fileInput.files[0] );

            $.ajax({
                url: sessionStorage.getItem("hostname") + "kinok/image",
                type: "POST",
                data: imageData,
                dataType: "json",
                processData: false,
                contentType: false,
                fileElementId: "imagefile",
                
                success: function( data ) {

                    $(fileInput).parent('span').css({
                        "background-image" : "url(" + data.image_url_4 + ")",
                        "background-size" : "cover"
                    });
                    
                    zeega.app.addItem( data );

                    this.$el.find("#image-uploads").append("<span class='add-photo' href='#'><input id = 'imagefile' name = 'imagefile' type='file' href='#'></input></span>");
                    
                }.bind(this)
            });
        },

        getTemplate : function()
        {



            var html =    //Step 1
                "<div class='modal-header'>"+
                    "<button class='close'>&times;</button>"+
                    "<h3>Add Media</h3>"+
                "</div>"+

                "<div class='modal-body clearfix'>"+
                    "<div id = 'image-uploads' >"+
                        "<p><b>Upload images for your computer:</b></p>"+
                        "<span class='add-photo' href='#'>"+
                            "<input id = 'imagefile'  name = 'imagefile'  type='file' href='#'></input>"+
                        "</span>"+
                    "</div>"+
                    "<div id = 'bookmarklet-instructions' >"+
                        "<div>"+
                        "<p><b>Or use media from the web:</b></p>"+
                        "<p>Drag the icon below to the Bookmarks Bar on your browser. Then simply click \"Add to HELP Platform\" when viewing a URL that ends in .jpg, .png, .mp3, .mp4 or an image on Flickr, a video on YouTube (including your own unlisted videos) and audio on SoundCloud.</p>"+
                            "<a style='float:left' href=\"javascript:(function()%7Bvar%20head=document.getElementsByTagName('body')%5B0%5D,script=document.createElement('script');script.id='zeegabm';script.type='text/javascript';script.src='"+ zeega.app.url_prefix +"js/widget/zeega.bookmarklet.js?'%20+%20Math.floor(Math.random()*99999);head.appendChild(script);%7D)();%20void%200\">"+
                                "<img src='"+ zeega.app.url_prefix +"images/help_bookmarklet.png' alt='Add to HELP Platform'/>"+
                            "</a>"+
                        "</div>"+
                    "</div>"+
                    //"javascript:(function()%7Bvar%20head=document.getElementsByTagName("body")%5B0%5D,script=document.createElement("script");script.id="zeegabm";script.type="text/javascript";script.src=""+ zeega.app.url_prefix +"js/widget/zeega.bookmarklet.js?"%20+%20Math.floor(Math.random()*99999);head.appendChild(script);%7D)();%20void%200"+

                    "<div class='publish-footer'>"+
                        "<button class='btn secondary pull-right close' ><i class='icon-ok-circle'></i> Done</button>"+
                    "</div>"+
                "</div>";
            return html;
        }
    });
    
})(zeega.module("modal"));