this["JST"] = this["JST"] || {};

this["JST"]["app/templates/citation.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<i class="zitem-'+
( attr.archive.toLowerCase() )+
' zitem-30"></i>\n<div class="player-citation-bubble clearfix">\n  <div class="player-citation-content">\n    <h3>'+
( attr.title )+
'</h3>\n    <div class="content">\n      <span class="citation-subhead">DESCRIPTION:</span> '+
( attr.description )+
'\n    </div>\n    <div class="creator"><span class="citation-subhead">\n      CREATED BY:</span> '+
( attr.media_creator_realname )+
'\n    </div>\n\n  ';
 if( !_.isNull( attr.media_geo_longitude ) ) { 
;__p+='\n    <div class="location-created">\n      <span class="citation-subhead">LOCATION:</span> '+
( attr.media_geo_longitude )+
', '+
( attr.media_geo_latitude )+
'\n    </div>\n  ';
 } 
;__p+='\n    <div class="trackback">\n      <a href="'+
( attr.attribution_uri )+
'" target="blank">view original</a>\n    </div>\n  </div>\n  <div class="player-citation-thumb"><img src="'+
( attr.thumbnail_url )+
'" height="100px" width="100px"/></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="arrow arrow-left prev disabled"></a>\n<a href="#" class="arrow arrow-right next disabled"></a>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-loader-inner">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n    <div class="ZEEGA-loading-bar-wrapper">\n        <div class="ZEEGA-loading-bar"></div>\n    </div>\n    <ul class="ZEEGA-loading-layers"></ul>\n</div>\n<span class="ZEEGA-loader-bg"></span>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-bottom.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="ZEEGA-standalone-controls">\n    <li><a id="project-home" href="#" ><i class="home-zcon"></i></a></li>\n    <li><a id="project-play-pause" href="#" ><i class="pause-zcon"></i></a></li>\n</ul>\n<ul class="ZEEGA-citations-primary"></ul>';
}
return __p;
};

this["JST"]["app/templates/menu-bar-top.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="ZEEGA-menu-bar menu-bar-left">\n    <li>\n        <a href="http://www.zeega.com/" class="ZEEGA-standalone-logo" style="padding:7px;"></a>\n    </li>\n    <li class="menu-bar-title">\n        <span class="project-title">'+
( title )+
'</span>\n        <span class="sequence-description"></span>\n        <span class="sequence-author">\n            by <a href="http:'+
( hostname )+
''+
( directory )+
'user/'+
( user_id )+
'" data-bypass="true" >'+
( authors )+
'</a>\n        </span>\n    </li>\n</ul>\n<ul class="ZEEGA-menu-bar menu-bar-right">\n    <li><a id="project-share" href="#">share</a></li>\n    <li class="slide-menu">\n        <a href="https://twitter.com/intent/tweet?original_referer=http://www.zeega.com/'+
( item_id )+
'&text=Zeega%20Project%3A%20'+
( title )+
' &url=http://www.zeega.com/'+
( item_id )+
'" target="blank"><i class="zsocial-twitter"></i></a>\n        <a href="http://www.facebook.com/sharer.php?u=http://www.zeega.com/'+
( item_id )+
'" target="blank"><i class="zsocial-facebook"></i></a>\n        <a href="http://www.tumblr.com/share" target="blank"><i class="zsocial-tumblr"></i></a>\n        <a href="mailto:friend@example.com?subject=Check out this Zeega!&body=http://www.zeega.com/'+
( item_id )+
'"><i class="zsocial-email"></i></a>\n    </li>\n    <!--<li><a id="project-credits" href="#"><i class="icon-align-justify icon-white"></i></a></li>-->\n    <li><a id="project-fullscreen-toggle" href="#"><i class="icon-resize-full icon-white"></i></a></li>\n</ul>\n';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a class="play" href="#"></a>';
}
return __p;
};