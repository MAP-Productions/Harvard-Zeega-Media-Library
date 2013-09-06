define([
    "app",
    // Modules
    "modules/layout-main",
    "backbone"
],

function( app, MainLayout) {

    return Backbone.Model.extend({
        
        initialize: function() {
            this.addHeaderUX();
            this.insertLayout();
        },

        insertLayout: function() {
            app.layout = new MainLayout();
            app.layout.render();
        },

        addHeaderUX: function() {
            $(".bug-report").click( function( e ){ e.stopPropagation(); });
  
            $(".bug-report").parent().click( function(){
                $(".bug-unsubmitted").show();
                $(".bug-submitted").hide();
            });
  
            $(".close-bug").click( function(){
                $(".bug-report").parent().trigger("click");
            });
  
  
            $(".submit-bug").click(function(){

                var bug = new Backbone.Model({
                    url: window.location.href,
                    hash: window.location.hash.substr( 1 ),
                    description: $(".bug-description").val(),
                    email: $(".bug-email").val(),
                    login: sessionStorage.getItem("user")

                });

                if(!_.isUndefined( window.BrowserDetect )){

                    bug.browser=BrowserDetect.browser;
                    bug.version=BrowserDetect.version;
                    bug.os=BrowserDetect.OS;

                }

                bug.url = sessionStorage.getItem("hostname") + sessionStorage.getItem("directory") + "bugs/report.php";
                bug.save();
                $(".bug-description").attr("value", "");
                $(".bug-unsubmitted").fadeOut("fast", function(){
                    $(".bug-submitted").fadeIn();
                });

            });

            $(".drop-down").click( function(){
                var that = $(this);

                if( $(this).hasClass("open") ) {
                    $(this).removeClass("open");
                } else {
                    $(this).addClass("open");
                    $("body").bind("click",function(){
                        that.removeClass("open");
                        $(this).unbind();
                    });
                    return false;
                }
            });
  
            $("#header-add-media").click( function(){
                $("#add-media").modal();
                return false;
            });
        }

    });

});
