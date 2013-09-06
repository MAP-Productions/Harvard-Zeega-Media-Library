this["JST"] = this["JST"] || {};

this["JST"]["app/templates/navbar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class=\'pull-left\'>\n    <li class=\'logo\'>\n        <a href="#"><img src="assets/img/zeega-logo-header.png"/></a>\n    </li>\n</ul>\n<ul class=\'pull-right\'>\n    <li>\n        <a href="http://www.zeega.org/user/'+
( userId )+
'" target="blank"><i class="icon-user icon-white"></i></a>\n    </li>\n    <li>\n        <a href="#"><i class="icon-folder-open icon-white"></i></a>\n        <ul class="submenu">\n            <li>\n                <a href="/'+
( root )+
'project/new" data-bypass="true" ><i class="icon-file"></i> New Zeega</a>\n            </li>\n            <li class="divider"></li>\n\n            ';
 _.each( userProjects, function( project) { 
;__p+='\n                <li>\n                    <a href="/'+
( project.id )+
'"  data-bypass="true" >'+
( project.title )+
'</a>\n                </li>\n            ';
 }); 
;__p+='\n\n        </ul>\n    </li>\n    <li>\n        <a href="http://www.zeega.org/faq/" target="blank"><i class="icon-question-sign icon-white"></i></a>\n    </li>\n</ul>';
}
return __p;
};

this["JST"]["app/templates/modal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">'+
( modal.title )+
'</div>\n    <div class="modal-body">'+
( modal.content )+
'</div>\n    <div class="modal-footer"></div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/layers.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="layer-list"></ul>';
}
return __p;
};

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'left-column\'>\n    <div class="static-upper">\n        <div class="nav"></div>\n        <div class="project-meta"></div>\n        <div class="layer-drawer"></div>\n    </div>\n    <div class="media-drawer"></div>\n</div>\n<div class=\'right-column\'>\n    <div class="project-navs">\n        <div class="sequences"></div>\n        <div class="frames"></div>\n        <div class="soundtrack"></div>\n        <div class="controls-wrapper">\n            <div class="layer-controls"></div>\n            <div class="frame-controls"></div>\n        </div>\n    </div>\n    <div class="workspace"></div>\n    <div class="layers"></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/soundtrack.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="elapsed"></div>\n<div class="soundtrack-waveform"\n';
 if ( model ) { 
;__p+='\n    style=" background: url('+
( attr.thumbnail_url )+
');\n    background-size: 100% 100%"\n';
 } 
;__p+='\n></div>\n\n';
 if ( model === false ) { 
;__p+='\n    <span class="instructions-1">Drag audio here to add soundtrack</span>\n    <span class="instructions-2">Drop to add soundtrack</span>\n';
 } else { 
;__p+='\n    <div class="soundtrack-info">\n        <span class="title">'+
( attr.title )+
'</span>\n        <span class="time-display"></span>\n    </div>\n    <div class="soundtrack-controls">\n        <a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n        <a href="#" class="remove"><i class="icon-remove icon-white"></i></a>\n    </div>\n';
 } 
;__p+='';
}
return __p;
};

this["JST"]["app/templates/frame.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="frame-menu">\n    <a href="#"><i class="icon-edit icon-white"></i></a>\n    <ul class="submenu">\n        <li class="menu-head">\n            Page Options\n        </li>\n        <li class="divider"></li>\n        <li>\n            <a href="#" class="action" data-action="deleteFrame"><i class="icon-remove"></i> delete</a>\n        </li>\n    </ul>\n</div>\n\n<a href="#" class="frame-thumb"\n    data-id="'+
( id )+
'"\n    style="\n        ';
 if( thumbnail_url !== "" ) { 
;__p+='\n            background: url('+
( thumbnail_url )+
') no-repeat center center; \n            -webkit-background-size: cover;\n            -moz-background-size: cover;\n            -o-background-size: cover;\n            background-size: cover;\n        ';
 } 
;__p+='\n"></a>';
}
return __p;
};

this["JST"]["app/templates/layer-control-bar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-bar-title"></div>\n<div class="layer-controls-inner"></div>';
}
return __p;
};

this["JST"]["app/templates/media-drawer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="media-drawer-controls ZEEGA-hmenu dark">\n    <ul class=\'pull-left\'>\n        <li>\n            <input class="search-box" type="text" placeholder="search media"/>\n        </li>\n        <li>\n            <a href="#" class="clearSearch"><i class="icon-remove icon-white"></i></a>\n        </li>\n    </ul>\n    <ul class=\'pull-right\'>\n        <li>\n            <a href="#" class="gridToggle"><i class="icon-th-list icon-white"></i></a>\n        </li>\n    </ul>\n</div>\n<ul class="ZEEGA-items"></ul>';
}
return __p;
};

this["JST"]["app/templates/workspace.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-workspace"></div>';
}
return __p;
};

this["JST"]["app/templates/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#">\n    <div class="item-thumb">\n        ';
 if ( layer_type == "Audio" ) { 
;__p+='\n            <div class="thumb-title">'+
( title )+
'</div>\n        ';
 } 
;__p+='\n        <img src="'+
( thumbnail_url )+
'"\n            alt="'+
( title )+
'"\n            title="'+
( title )+
'"\n            height="100%"\n            width="100%"/>\n    </div>\n    <div class="item-title">\n        <i class="zicon-'+
( layer_type.toLowerCase() )+
' zicon-white"></i>\n        <span class="item-title-text">'+
( title )+
'</span>\n    </div>\n</a>';
}
return __p;
};

this["JST"]["app/templates/sequence.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="sequence-title">'+
( title )+
'</a>\n<a href="#" class="dropdown"><i class="icon-edit icon-white"></i></a>';
}
return __p;
};

this["JST"]["app/templates/item-viewer-audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="">\n    <audio class="preview-audio" src="'+
( uri )+
'" controls="true" /></audio>\n</div>\n<div class="viewer-controls">\n    \n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to frame</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n    <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/sequences.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="sequence-list"></ul>\n<div class="add-sequence"><a href="#"><i class="icon-plus icon-white"></i> add sequence</a></div>';
}
return __p;
};

this["JST"]["app/templates/layer-list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-marker">\n    <div class="layer-list-top">\n        <span class="layer-title">'+
( attr.title )+
'</span>\n    </div>\n    <div class="layer-list-bottom clearfix">\n        <a href="#" class="action-bg pull-left"><i class="zicon-'+
( type.toLowerCase() )+
' zicon-white"></i></a>\n        <a href="#" class="action-bg pull-right"><i data-action="deleteLayer" class="action icon-trash icon-white"></i></a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/project-meta.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-project-cover" style="\n    background: url('+
( cover_image )+
') no-repeat center center;\n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <div class="project-meta-upper">\n        <div class="ZEEGA-project-title" contenteditable="true">'+
( title )+
'</div>\n    </div>\n    <a href="#" class="preview">\n        <i class="play-zcon"></i>\n        <span class="preview-text">Preview</span>\n    </a>\n    <div class="project-meta-lower">\n        <div class="ZEEGA-project-share">\n            <a href="#" class="project-share-toggle">share</a>:\n            <div class="hidden-drawer '+
( drawerClass )+
'">\n                <a href="https://twitter.com/intent/tweet?original_referer=http://www.zeega.com/'+
( item_id )+
'&text=Zeega%20Project%3A%20'+
( title )+
' &url=http://www.zeega.com/'+
( item_id )+
'"\n                    class="social-share"\n                    data-itemid="'+
( item_id )+
'"\n                    target="blank">\n                    <i class="zsocial-twitter">\n                    </i>\n                </a>\n                <a href="http://www.facebook.com/sharer.php?u=http://www.zeega.com/'+
( item_id )+
'"\n                    class="social-share"\n                    data-itemid="'+
( item_id )+
'"\n                    target="blank">\n                    <i class="zsocial-facebook"></i>\n                </a>\n                <a href="http://www.tumblr.com/share"\n                    class="social-share"\n                    data-itemid="'+
( item_id )+
'"\n                    target="blank">\n                    <i class="zsocial-tumblr"></i>\n                </a>\n                <a href="mailto:friend@example.com?subject=Check out this Zeega!&body=http://www.zeega.com/'+
( item_id )+
'"\n                    class="social-share"\n                    data-itemid="'+
( item_id )+
'">\n                    <i class="zsocial-email"></i>\n                </a>\n            </div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-collection-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<a href="#" class="prev arrow arrow-left"></a>\n<a href="#" class="next arrow arrow-right"></a>\n\n<div class="modal-content">\n\n    <div class="modal-title"></div>\n    <div class="modal-body"></div>\n    <div class="modal-footer"></div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/layer-panel.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-hmenu dark">\n    <ul class=\'pull-left\'>\n        <li>\n            <a href="#" data-layerType="Text">\n                <div class="hmenu-label">text</div>\n                <i class="icon-font icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Rectangle">\n                <div class="hmenu-label">color</div>\n                <i class="icon-th-large icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Geo">\n                <div class="hmenu-label">streetview</div>\n                <i class="icon-map-marker icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Popup">\n                <div class="hmenu-label">popup</div>\n                <i class="icon-share icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div class="ZEEGA-layer-list">\n    <ul></ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-viewer-image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="\n    background: url('+
( uri )+
');\n    background-size: contain;\n    background-position: 50% 50%;\n    background-repeat: no-repeat;\n"></div>\n<div class="viewer-controls">\n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to frame</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n    <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/frames.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="frame-list"></ul>\n<div class="add-frame"><a href="#"><i class="icon-plus icon-white"></i> add page</a></div>';
}
return __p;
};

this["JST"]["app/templates/frame-controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="section-header">Transition</div>\n<div class="advance-controls">\n    <div class="adv-section advance-manual">\n        <a href="#">\n            <div>click</div>\n            <i class="icon-hand-up icon-white"></i>\n        </a>\n    </div>\n    <div class="adv-section advance-auto">\n        <a href="#">\n            <div>timed</div>\n            <i class="icon-time icon-white"></i>\n            <input type="text" placeholder="sec"/>\n        </a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/media-collection.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="media-collection-title">\n    '+
( title )+
'\n    <a href="#" class="get-bookmarklet">Add Media <i class="icon-bookmark icon-white"></i></a>\n</div>\n<ul class="media-collection-items"></ul>';
}
return __p;
};

this["JST"]["app/templates/layer-drawer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-layer-drawer">\n    <ul>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="Link">\n                <div class="item-label">link</div>\n                <i class="icon-arrow-up icon-white"></i>\n            </a>\n        </li>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="Text">\n                <div class="item-label">text</div>\n                <i class="icon-font icon-white"></i>\n            </a>\n        </li>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="Rectangle">\n                <div class="item-label">color</div>\n                <i class="icon-th-large icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <i class="icon-eye-open id-icon icon-white"></i>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/checkbox/checkbox.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="roundedOne">\n    <input type="checkbox" value="None" id="roundedOne" name="check" />\n    <label for="roundedOne"></label>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/slider/slider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="control-name">'+
( title )+
'</div>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr[ _propertyName ] * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="control-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/linkto/linkto.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">link to</div>\n<div class="control-frame-thumb" style="\n    background: url('+
( thumbnail_url )+
') no-repeat center center; \n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <a href="#"></a>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/color/color.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( _title )+
'</div>\n<div class="color-selector">\n    <div class="color-preview" style="background-color: '+
( attr[ _propertyName ] )+
'"></div>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/linkimage/linkimage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">image</div>\n<select class="link-image-select">\n    <option value="arrow_up">Up Arrow</option>\n    <option value="arrow_down">Down Arrow</option>\n    <option value="arrow_left">Left Arrow</option>\n    <option value="arrow_right">Right Arrow</option>\n    <option value="default">none</option>\n</select>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/av/av.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">media controls</div>\n<a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n<div class="av-slider"></div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/textbar/textbar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">text controls</div>\n\n<a data-action="bold" class="textbar-btn" href="#" >\n    <i class="icon-bold"></i>\n</a>\n<a data-action="italic" class="textbar-btn" href="#" >\n    <i class="icon-italic"></i>\n</a>\n<a data-action="clear" class="textbar-btn" href="#" >\n    <i class="icon-ban-circle"></i>\n</a>\n\n<div class="font-chooser control">\n    <select class="font-list" style=""></select>\n    <select class="size-list" style="">\n        <option value="100">8</option>\n        <option value="125">10</option>\n        <option value="150">12</option>\n        <option value="175">14</option>\n        <option value="200">18</option>\n        <option value="250">24</option>\n        <option value="375">36</option>\n        <option value="500">48</option>\n        <option value="800">72</option>\n        <option value="1600">144</option>\n        <option value="2400">200</option>\n        <option value="3600">300</option>\n    </select>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/video/video.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshowthumbslider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'slideshow-thumb-wrapper\'>\n    <ul>\n        ';
 _.each(attr.slides, function(slide, i){ 
;__p+='\n            <li>\n                <div class=\'slideshow-thumbnail\' style="background:url('+
( slide.attr.thumbnail_url )+
'); background-repeat:no-repeat;background-size:100%;background-position:center">\n                    <a href=\'#\' class=\'slider-thumb\' data-slidenum="'+
( i )+
'"></a>\n                </div>\n            </li>\n        ';
 });
;__p+='\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshow-metadata.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'slide-title\'>'+
( title )+
'</div>\n<div class=\'slide-description\'>'+
( description )+
'</div>\n<a href="'+
( attribution_uri )+
'" target=\'blank\' class=\'attribution-link\'>\n    '+
( media_creator_username )+
'\n    <i class=\'slideshow-icon-'+
( archive.toLowerCase() )+
' ssarchive\'></i>\n</a>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshow.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#\' class=\'slideshow-arrow arrow-left slideshow-control-prev disabled\'></a>\n<a href=\'#\' class=\'slideshow-arrow arrow-right slideshow-control-next\'></a>\n\n<div class=\'slideshow-container\'>\n\t';
 _.each( attr.slides, function(slide,i){ 
;__p+='\n\t\t<div class=\'slideshow-slide slideshow-slide-'+
( i )+
'\' style=\'\n      background:url('+
( slide.attr.uri )+
') no-repeat center center;\n      -webkit-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      -moz-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      -o-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n    \'></div>\n\t';
 }) 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">\n    <img src="'+
( attr.uri )+
'" width=\'100%\' />\n</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/geo/geo.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/text/text.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#\' class=\'ZEEGA-link-inner\'></a>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <ul class="frame-chooser-list clearfix">\n        </ul>\n        <div class="bottom-chooser">\n            <div class="new-frame">\n                <a href="#" class="link-new-frame"><i class="icon-plus icon-white"></i> New Page</a>\n            </div>\n            <a href="#" class="submit">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup-video.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'ZEEGA-popup-click-content popup-video\' >\n  <a href="#" class="popup-close">close</a>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup-image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'ZEEGA-popup-click-content popup-image\' style="\n  background: url('+
( attr.popup_content.uri )+
') no-repeat center center;\n  -webkit-background-size: contain;\n  -moz-background-size: contain;\n  -o-background-size: contain;\n  background-size: contain;\n">\n  <a href="#" class="popup-close">close</a>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a\n  href="#"\n  class="ZEEGA-popup-click-target"\n  ';
 if ( attr.popup_target ) { 
;__p+='\n  style="\n    background: url('+
( attr.popup_target.uri )+
') no-repeat center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n  "\n  ';
 } 
;__p+='\n  data-caption="';
 if ( attr.popup_content ) { 
;__p+=''+
( attr.popup_content.title )+
'';
 } 
;__p+='"\n  >\n  ';
 if ( attr.popup_content ) { 
;__p+='<span class="popup-title" style=\'display:none\'>'+
( attr.popup_content.title )+
'</span>';
 } 
;__p+='\n</a>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/rectangle/rectangle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target"></div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<audio id="audio-el-'+
( id )+
'" src="'+
( attr.uri )+
'"\n    ';
 if ( attr.loop ) { 
;__p+='\n        loop\n    ';
 } 
;__p+='\n    preload\n></audio>';
}
return __p;
};