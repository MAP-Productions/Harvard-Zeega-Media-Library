this["JST"] = this["JST"] || {};

this["JST"]["app/templates/navbar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">       \n        <div class="span6">\n            <div class="branding"\n                <a href="/"><img src="assets/img/zeega-logo.png" alt="zeega-logo" width="134" height="43"></a>\n                <div class="strapline">\n              Remake the Internet\n                </div>\n            </div>\n    </div>\n    \n    <div class="span8">\n        <div class="navigation">    \n            <div class="">\n                <a href="http://blog.zeega.com/about">About </a> |      \n                <a href="http://zeega.com/team">Team </a> |      \n                <a href="http://blog.zeega.com" target="_blank">News</a> | \n                <a href="/register">Sign Up</a> |\n                <a href="/login">Login</a>\n            </div>\n        </div>\n    </div>\n\n</div>              \n';
}
return __p;
};

this["JST"]["app/templates/theme.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">       \n    <h2>'+
( title )+
'<span class="tagline">'+
( description )+
'</span> </h2>\n    <div class="items"></div>\n</div>              \n            \n';
}
return __p;
};

this["JST"]["app/templates/intro.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">\n\n    <div class="intro-left">\n\n        <br>\n        <h2>\n        Zeega is revolutionizing web publishing and interactive storytelling for a future beyond blogs.<br><br>\n\n        With Zeega, you can use any media in the cloud, transform the entire screen into your playground, and share your interactive creations with the world.\n        </h2>\n\n    </div>\n\n    <div class="intro-right">\n\n        <a href="#" onclick="fbLogin();" style="width: 200px;" ><img src="http://zeega.com/images/registration/login-facebook.png" width="200px"/></a><br>\n        <a href="{{ path("ZeegaSocialBundle_twitter_connect") }}"><img src="http://zeega.com/images/registration/login-twitter.png" width="200px"/ ></a> <br/>\n    </div>\n\n    <div style="clear: both;"></div>\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="nav container"></div>\n<div id="content"></div>';
}
return __p;
};

this["JST"]["app/templates/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="item-content">\n    \t<h2>'+
( title )+
'</h2>\n   \t\t<a class="item-profile" href = "http://zeega.com/profile/'+
( user_id )+
'">'+
( display_name )+
'</a>\n</div>\n    \n<p class="headline">'+
( headline )+
'</p>';
}
return __p;
};

this["JST"]["app/templates/item-mini.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n<div class="item-content">\n\t<div class="item-overlay">\n\t\t<h3>'+
( title )+
'</h3>\n\t\t<a class="item-profile" href = "http://zeega.com/profile/'+
( user_id )+
'">'+
( display_name )+
'</a>\n\t</div>\n</div>\n    \n';
}
return __p;
};

this["JST"]["app/templates/theme-mini.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">       \n    <h2>'+
( title )+
' <span class="tagline">'+
( description )+
'</span> </h2>\n    <div class="items"></div>\n</div>              \n';
}
return __p;
};