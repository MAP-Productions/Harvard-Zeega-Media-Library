this["JST"] = this["JST"] || {};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="mobile-play"><img src="assets/img/start-button.png"/></a>\n\n<div class="ZEEGA-loader-inner">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n</div>\n<div class="ZEEGA-paused-footer loader-footer">\n    <a class="menu" href="#"><img src="assets/img/menu-icon.png"/></a>\n    <span class="pull-right tip">tip:';
 if ( frames.length > 1 ) { 
;__p+=' Swipe to explore';
 } else { 
;__p+='Tap to pause';
 } 
;__p+='</span>\n</div>\n<span class="ZEEGA-loader-bg"></span>';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="mobile-play"><img src="assets/img/start-button.png"/></a>\n\n<div class="ZEEGA-pause-meta">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n</div>\n\n<div class="ZEEGA-paused-footer">\n    <a class="menu" href="#"><img src="assets/img/menu-icon.png"/></a>\n    <span class="pull-right tip">tip:';
 if ( frames.length > 1 ) { 
;__p+=' Swipe to explore';
 } else { 
;__p+='Tap to pause';
 } 
;__p+='</span>\n</div>';
}
return __p;
};

this["JST"]["app/templates/underlay.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="scroller">\n    <ul class="underlay-menu">\n        <li class="header">\n            <div>'+
( title )+
'</div>\n            <div class="coffin-author">by '+
( authors )+
'</div>\n        </li>\n        <li><a href="https://mobile.twitter.com/compose/tweet?status=http://www.zeega.com/'+
( id )+
'" target="blank"><i class="zsocial-twitter"></i>  Share on Twitter</a></li>\n        <li><a href="http://m.facebook.com/sharer.php?u=http://www.zeega.com/'+
( id )+
'&t='+
( title )+
' by '+
( authors )+
'" target="blank"><i class="zsocial-facebook"></i>  Share on Facebook</a></li>\n        <li><a href="mailto:friend@example.com?subject=Check out this Zeega!&body=http://www.zeega.com/'+
( id )+
'"><i class="zsocial-email"></i>  Share on Email</a></li>\n        <li class="spacer"></li>\n        <li class="header">Credits</li>\n        ';
 _.each( frames, function( frame ) { 
;__p+='\n            ';
 _.each( frame.layers, function( layer ) { 
;__p+='\n                ';
 if (layer.type != "Link") { 
;__p+='\n                    <li class="underlay-citation">\n                        <a href="'+
( layer.attr.attribution_uri )+
'" target="blank">\n                            <i class="icon-'+
( layer.type.toLowerCase() )+
' icon-white"></i> ';
 if ( layer.attr.title === "" ) { 
;__p+='[untitled]';
 } else { 
;__p+=''+
( layer.attr.title )+
'';
 } 
;__p+='\n                        </a>\n                    </li>\n                ';
 } 
;__p+='\n            ';
 }) 
;__p+='\n        ';
 }) 
;__p+='\n        <li class="spacer"></li>\n        <li><a href="http://www.zeega.com/" target="blank">Explore the Zeegaverse</a></li>\n    </ul>\n</div>\n<div class="bg" style="\n    background: url('+
( cover_image )+
');\n    background-position: 50% 50%;\n    background-repeat: no-repeat no-repeat;\n    background-attachment: fixed;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n"></div>';
}
return __p;
};