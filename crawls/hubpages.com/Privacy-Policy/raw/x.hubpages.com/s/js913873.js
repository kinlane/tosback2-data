(function($,_1){
$.ui=$.ui||{};
if($.ui.version){
return;
}
$.extend($.ui,{version:"1.8.22",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
$.fn.extend({propAttr:$.fn.prop||$.fn.attr,_focus:$.fn.focus,focus:function(_2,fn){
return typeof _2==="number"?this.each(function(){
var _3=this;
setTimeout(function(){
$(_3).focus();
if(fn){
fn.call(_3);
}
},_2);
}):this._focus.apply(this,arguments);
},scrollParent:function(){
var _4;
if(($.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){
_4=this.parents().filter(function(){
return (/(relative|absolute|fixed)/).test($.curCSS(this,"position",1))&&(/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}else{
_4=this.parents().filter(function(){
return (/(auto|scroll)/).test($.curCSS(this,"overflow",1)+$.curCSS(this,"overflow-y",1)+$.curCSS(this,"overflow-x",1));
}).eq(0);
}
return (/fixed/).test(this.css("position"))||!_4.length?$(document):_4;
},zIndex:function(_5){
if(_5!==_1){
return this.css("zIndex",_5);
}
if(this.length){
var _6=$(this[0]),_7,_8;
while(_6.length&&_6[0]!==document){
_7=_6.css("position");
if(_7==="absolute"||_7==="relative"||_7==="fixed"){
_8=parseInt(_6.css("zIndex"),10);
if(!isNaN(_8)&&_8!==0){
return _8;
}
}
_6=_6.parent();
}
}
return 0;
},disableSelection:function(){
return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(_9){
_9.preventDefault();
});
},enableSelection:function(){
return this.unbind(".ui-disableSelection");
}});
if(!$("<a>").outerWidth(1).jquery){
$.each(["Width","Height"],function(i,_a){
var _b=_a==="Width"?["Left","Right"]:["Top","Bottom"],_c=_a.toLowerCase(),_d={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};
function _e(_f,_10,_11,_12){
$.each(_b,function(){
_10-=parseFloat($.curCSS(_f,"padding"+this,true))||0;
if(_11){
_10-=parseFloat($.curCSS(_f,"border"+this+"Width",true))||0;
}
if(_12){
_10-=parseFloat($.curCSS(_f,"margin"+this,true))||0;
}
});
return _10;
};
$.fn["inner"+_a]=function(_13){
if(_13===_1){
return _d["inner"+_a].call(this);
}
return this.each(function(){
$(this).css(_c,_e(this,_13)+"px");
});
};
$.fn["outer"+_a]=function(_14,_15){
if(typeof _14!=="number"){
return _d["outer"+_a].call(this,_14);
}
return this.each(function(){
$(this).css(_c,_e(this,_14,true,_15)+"px");
});
};
});
}
function _16(_17,_18){
var _19=_17.nodeName.toLowerCase();
if("area"===_19){
var map=_17.parentNode,_1a=map.name,img;
if(!_17.href||!_1a||map.nodeName.toLowerCase()!=="map"){
return false;
}
img=$("img[usemap=#"+_1a+"]")[0];
return !!img&&_1b(img);
}
return (/input|select|textarea|button|object/.test(_19)?!_17.disabled:"a"==_19?_17.href||_18:_18)&&_1b(_17);
};
function _1b(_1c){
return !$(_1c).parents().andSelf().filter(function(){
return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this);
}).length;
};
$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(_1d){
return function(_1e){
return !!$.data(_1e,_1d);
};
}):function(_1f,i,_20){
return !!$.data(_1f,_20[3]);
},focusable:function(_21){
return _16(_21,!isNaN($.attr(_21,"tabindex")));
},tabbable:function(_22){
var _23=$.attr(_22,"tabindex"),_24=isNaN(_23);
return (_24||_23>=0)&&_16(_22,!_24);
}});
$(function(){
var _25=document.body,div=_25.appendChild(div=document.createElement("div"));
div.offsetHeight;
$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
$.support.minHeight=div.offsetHeight===100;
$.support.selectstart="onselectstart" in div;
_25.removeChild(div).style.display="none";
});
if(!$.curCSS){
$.curCSS=$.css;
}
$.extend($.ui,{plugin:{add:function(_26,_27,set){
var _28=$.ui[_26].prototype;
for(var i in set){
_28.plugins[i]=_28.plugins[i]||[];
_28.plugins[i].push([_27,set[i]]);
}
},call:function(_29,_2a,_2b){
var set=_29.plugins[_2a];
if(!set||!_29.element[0].parentNode){
return;
}
for(var i=0;i<set.length;i++){
if(_29.options[set[i][0]]){
set[i][1].apply(_29.element,_2b);
}
}
}},contains:function(a,b){
return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);
},hasScroll:function(el,a){
if($(el).css("overflow")==="hidden"){
return false;
}
var _2c=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;
if(el[_2c]>0){
return true;
}
el[_2c]=1;
has=(el[_2c]>0);
el[_2c]=0;
return has;
},isOverAxis:function(x,_2d,_2e){
return (x>_2d)&&(x<(_2d+_2e));
},isOver:function(y,x,top,_2f,_30,_31){
return $.ui.isOverAxis(y,top,_30)&&$.ui.isOverAxis(x,_2f,_31);
}});
})(jQuery);
(function($,_32){
if($.cleanData){
var _33=$.cleanData;
$.cleanData=function(_34){
for(var i=0,_35;(_35=_34[i])!=null;i++){
try{
$(_35).triggerHandler("remove");
}
catch(e){
}
}
_33(_34);
};
}else{
var _36=$.fn.remove;
$.fn.remove=function(_37,_38){
return this.each(function(){
if(!_38){
if(!_37||$.filter(_37,[this]).length){
$("*",this).add([this]).each(function(){
try{
$(this).triggerHandler("remove");
}
catch(e){
}
});
}
}
return _36.call($(this),_37,_38);
});
};
}
$.widget=function(_39,_3a,_3b){
var _3c=_39.split(".")[0],_3d;
_39=_39.split(".")[1];
_3d=_3c+"-"+_39;
if(!_3b){
_3b=_3a;
_3a=$.Widget;
}
$.expr[":"][_3d]=function(_3e){
return !!$.data(_3e,_39);
};
$[_3c]=$[_3c]||{};
$[_3c][_39]=function(_3f,_40){
if(arguments.length){
this._createWidget(_3f,_40);
}
};
var _41=new _3a();
_41.options=$.extend(true,{},_41.options);
$[_3c][_39].prototype=$.extend(true,_41,{namespace:_3c,widgetName:_39,widgetEventPrefix:$[_3c][_39].prototype.widgetEventPrefix||_39,widgetBaseClass:_3d},_3b);
$.widget.bridge(_39,$[_3c][_39]);
};
$.widget.bridge=function(_42,_43){
$.fn[_42]=function(_44){
var _45=typeof _44==="string",_46=Array.prototype.slice.call(arguments,1),_47=this;
_44=!_45&&_46.length?$.extend.apply(null,[true,_44].concat(_46)):_44;
if(_45&&_44.charAt(0)==="_"){
return _47;
}
if(_45){
this.each(function(){
var _48=$.data(this,_42),_49=_48&&$.isFunction(_48[_44])?_48[_44].apply(_48,_46):_48;
if(_49!==_48&&_49!==_32){
_47=_49;
return false;
}
});
}else{
this.each(function(){
var _4a=$.data(this,_42);
if(_4a){
_4a.option(_44||{})._init();
}else{
$.data(this,_42,new _43(_44,this));
}
});
}
return _47;
};
};
$.Widget=function(_4b,_4c){
if(arguments.length){
this._createWidget(_4b,_4c);
}
};
$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(_4d,_4e){
$.data(_4e,this.widgetName,this);
this.element=$(_4e);
this.options=$.extend(true,{},this.options,this._getCreateOptions(),_4d);
var _4f=this;
this.element.bind("remove."+this.widgetName,function(){
_4f.destroy();
});
this._create();
this._trigger("create");
this._init();
},_getCreateOptions:function(){
return $.metadata&&$.metadata.get(this.element[0])[this.widgetName];
},_create:function(){
},_init:function(){
},destroy:function(){
this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");
},widget:function(){
return this.element;
},option:function(key,_50){
var _51=key;
if(arguments.length===0){
return $.extend({},this.options);
}
if(typeof key==="string"){
if(_50===_32){
return this.options[key];
}
_51={};
_51[key]=_50;
}
this._setOptions(_51);
return this;
},_setOptions:function(_52){
var _53=this;
$.each(_52,function(key,_54){
_53._setOption(key,_54);
});
return this;
},_setOption:function(key,_55){
this.options[key]=_55;
if(key==="disabled"){
this.widget()[_55?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",_55);
}
return this;
},enable:function(){
return this._setOption("disabled",false);
},disable:function(){
return this._setOption("disabled",true);
},_trigger:function(_56,_57,_58){
var _59,_5a,_5b=this.options[_56];
_58=_58||{};
_57=$.Event(_57);
_57.type=(_56===this.widgetEventPrefix?_56:this.widgetEventPrefix+_56).toLowerCase();
_57.target=this.element[0];
_5a=_57.originalEvent;
if(_5a){
for(_59 in _5a){
if(!(_59 in _57)){
_57[_59]=_5a[_59];
}
}
}
this.element.trigger(_57,_58);
return !($.isFunction(_5b)&&_5b.call(this.element[0],_57,_58)===false||_57.isDefaultPrevented());
}};
})(jQuery);
(function($,_5c){
var _5d=false;
$(document).mouseup(function(e){
_5d=false;
});
$.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){
var _5e=this;
this.element.bind("mousedown."+this.widgetName,function(_5f){
return _5e._mouseDown(_5f);
}).bind("click."+this.widgetName,function(_60){
if(true===$.data(_60.target,_5e.widgetName+".preventClickEvent")){
$.removeData(_60.target,_5e.widgetName+".preventClickEvent");
_60.stopImmediatePropagation();
return false;
}
});
this.started=false;
},_mouseDestroy:function(){
this.element.unbind("."+this.widgetName);
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
},_mouseDown:function(_61){
if(_5d){
return;
}
(this._mouseStarted&&this._mouseUp(_61));
this._mouseDownEvent=_61;
var _62=this,_63=(_61.which==1),_64=(typeof this.options.cancel=="string"&&_61.target.nodeName?$(_61.target).closest(this.options.cancel).length:false);
if(!_63||_64||!this._mouseCapture(_61)){
return true;
}
this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){
this._mouseDelayTimer=setTimeout(function(){
_62.mouseDelayMet=true;
},this.options.delay);
}
if(this._mouseDistanceMet(_61)&&this._mouseDelayMet(_61)){
this._mouseStarted=(this._mouseStart(_61)!==false);
if(!this._mouseStarted){
_61.preventDefault();
return true;
}
}
if(true===$.data(_61.target,this.widgetName+".preventClickEvent")){
$.removeData(_61.target,this.widgetName+".preventClickEvent");
}
this._mouseMoveDelegate=function(_65){
return _62._mouseMove(_65);
};
this._mouseUpDelegate=function(_66){
return _62._mouseUp(_66);
};
$(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
_61.preventDefault();
_5d=true;
return true;
},_mouseMove:function(_67){
if($.browser.msie&&!(document.documentMode>=9)&&!_67.button){
return this._mouseUp(_67);
}
if(this._mouseStarted){
this._mouseDrag(_67);
return _67.preventDefault();
}
if(this._mouseDistanceMet(_67)&&this._mouseDelayMet(_67)){
this._mouseStarted=(this._mouseStart(this._mouseDownEvent,_67)!==false);
(this._mouseStarted?this._mouseDrag(_67):this._mouseUp(_67));
}
return !this._mouseStarted;
},_mouseUp:function(_68){
$(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){
this._mouseStarted=false;
if(_68.target==this._mouseDownEvent.target){
$.data(_68.target,this.widgetName+".preventClickEvent",true);
}
this._mouseStop(_68);
}
return false;
},_mouseDistanceMet:function(_69){
return (Math.max(Math.abs(this._mouseDownEvent.pageX-_69.pageX),Math.abs(this._mouseDownEvent.pageY-_69.pageY))>=this.options.distance);
},_mouseDelayMet:function(_6a){
return this.mouseDelayMet;
},_mouseStart:function(_6b){
},_mouseDrag:function(_6c){
},_mouseStop:function(_6d){
},_mouseCapture:function(_6e){
return true;
}});
})(jQuery);
(function($,_6f){
$.widget("ui.sortable",$.ui.mouse,{widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){
var o=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?o.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit();
this.ready=true;
},destroy:function(){
$.Widget.prototype.destroy.call(this);
this.element.removeClass("ui-sortable ui-sortable-disabled");
this._mouseDestroy();
for(var i=this.items.length-1;i>=0;i--){
this.items[i].item.removeData(this.widgetName+"-item");
}
return this;
},_setOption:function(key,_70){
if(key==="disabled"){
this.options[key]=_70;
this.widget()[_70?"addClass":"removeClass"]("ui-sortable-disabled");
}else{
$.Widget.prototype._setOption.apply(this,arguments);
}
},_mouseCapture:function(_71,_72){
var _73=this;
if(this.reverting){
return false;
}
if(this.options.disabled||this.options.type=="static"){
return false;
}
this._refreshItems(_71);
var _74=null,_75=this,_76=$(_71.target).parents().each(function(){
if($.data(this,_73.widgetName+"-item")==_75){
_74=$(this);
return false;
}
});
if($.data(_71.target,_73.widgetName+"-item")==_75){
_74=$(_71.target);
}
if(!_74){
return false;
}
if(this.options.handle&&!_72){
var _77=false;
$(this.options.handle,_74).find("*").andSelf().each(function(){
if(this==_71.target){
_77=true;
}
});
if(!_77){
return false;
}
}
this.currentItem=_74;
this._removeCurrentsFromItems();
return true;
},_mouseStart:function(_78,_79,_7a){
var o=this.options,_7b=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(_78);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
$.extend(this.offset,{click:{left:_78.pageX-this.offset.left,top:_78.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
this.originalPosition=this._generatePosition(_78);
this.originalPageX=_78.pageX;
this.originalPageY=_78.pageY;
(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){
this.currentItem.hide();
}
this._createPlaceholder();
if(o.containment){
this._setContainment();
}
if(o.cursor){
if($("body").css("cursor")){
this._storedCursor=$("body").css("cursor");
}
$("body").css("cursor",o.cursor);
}
if(o.opacity){
if(this.helper.css("opacity")){
this._storedOpacity=this.helper.css("opacity");
}
this.helper.css("opacity",o.opacity);
}
if(o.zIndex){
if(this.helper.css("zIndex")){
this._storedZIndex=this.helper.css("zIndex");
}
this.helper.css("zIndex",o.zIndex);
}
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
this.overflowOffset=this.scrollParent.offset();
}
this._trigger("start",_78,this._uiHash());
if(!this._preserveHelperProportions){
this._cacheHelperProportions();
}
if(!_7a){
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("activate",_78,_7b._uiHash(this));
}
}
if($.ui.ddmanager){
$.ui.ddmanager.current=this;
}
if($.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_78);
}
this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(_78);
return true;
},_mouseDrag:function(_7c){
this.position=this._generatePosition(_7c);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){
this.lastPositionAbs=this.positionAbs;
}
if(this.options.scroll){
var o=this.options,_7d=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){
if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-_7c.pageY<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_7d=this.scrollParent[0].scrollTop+o.scrollSpeed;
}else{
if(_7c.pageY-this.overflowOffset.top<o.scrollSensitivity){
this.scrollParent[0].scrollTop=_7d=this.scrollParent[0].scrollTop-o.scrollSpeed;
}
}
if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-_7c.pageX<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_7d=this.scrollParent[0].scrollLeft+o.scrollSpeed;
}else{
if(_7c.pageX-this.overflowOffset.left<o.scrollSensitivity){
this.scrollParent[0].scrollLeft=_7d=this.scrollParent[0].scrollLeft-o.scrollSpeed;
}
}
}else{
if(_7c.pageY-$(document).scrollTop()<o.scrollSensitivity){
_7d=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);
}else{
if($(window).height()-(_7c.pageY-$(document).scrollTop())<o.scrollSensitivity){
_7d=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);
}
}
if(_7c.pageX-$(document).scrollLeft()<o.scrollSensitivity){
_7d=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);
}else{
if($(window).width()-(_7c.pageX-$(document).scrollLeft())<o.scrollSensitivity){
_7d=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);
}
}
}
if(_7d!==false&&$.ui.ddmanager&&!o.dropBehaviour){
$.ui.ddmanager.prepareOffsets(this,_7c);
}
}
this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){
this.helper[0].style.left=this.position.left+"px";
}
if(!this.options.axis||this.options.axis!="x"){
this.helper[0].style.top=this.position.top+"px";
}
for(var i=this.items.length-1;i>=0;i--){
var _7e=this.items[i],_7f=_7e.item[0],_80=this._intersectsWithPointer(_7e);
if(!_80){
continue;
}
if(_7f!=this.currentItem[0]&&this.placeholder[_80==1?"next":"prev"]()[0]!=_7f&&!$.ui.contains(this.placeholder[0],_7f)&&(this.options.type=="semi-dynamic"?!$.ui.contains(this.element[0],_7f):true)){
this.direction=_80==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(_7e)){
this._rearrange(_7c,_7e);
}else{
break;
}
this._trigger("change",_7c,this._uiHash());
break;
}
}
this._contactContainers(_7c);
if($.ui.ddmanager){
$.ui.ddmanager.drag(this,_7c);
}
this._trigger("sort",_7c,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false;
},_mouseStop:function(_81,_82){
if(!_81){
return;
}
if($.ui.ddmanager&&!this.options.dropBehaviour){
$.ui.ddmanager.drop(this,_81);
}
if(this.options.revert){
var _83=this;
var cur=_83.placeholder.offset();
_83.reverting=true;
$(this.helper).animate({left:cur.left-this.offset.parent.left-_83.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-_83.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){
_83._clear(_81);
});
}else{
this._clear(_81,_82);
}
return false;
},cancel:function(){
var _84=this;
if(this.dragging){
this._mouseUp({target:null});
if(this.options.helper=="original"){
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
for(var i=this.containers.length-1;i>=0;i--){
this.containers[i]._trigger("deactivate",null,_84._uiHash(this));
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",null,_84._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(this.placeholder){
if(this.placeholder[0].parentNode){
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
}
if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){
this.helper.remove();
}
$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){
$(this.domPosition.prev).after(this.currentItem);
}else{
$(this.domPosition.parent).prepend(this.currentItem);
}
}
return this;
},serialize:function(o){
var _85=this._getItemsAsjQuery(o&&o.connected);
var str=[];
o=o||{};
$(_85).each(function(){
var res=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||(/(.+)[-=_](.+)/));
if(res){
str.push((o.key||res[1]+"[]")+"="+(o.key&&o.expression?res[1]:res[2]));
}
});
if(!str.length&&o.key){
str.push(o.key+"=");
}
return str.join("&");
},toArray:function(o){
var _86=this._getItemsAsjQuery(o&&o.connected);
var ret=[];
o=o||{};
_86.each(function(){
ret.push($(o.item||this).attr(o.attribute||"id")||"");
});
return ret;
},_intersectsWith:function(_87){
var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;
var l=_87.left,r=l+_87.width,t=_87.top,b=t+_87.height;
var _88=this.offset.click.top,_89=this.offset.click.left;
var _8a=(y1+_88)>t&&(y1+_88)<b&&(x1+_89)>l&&(x1+_89)<r;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>_87[this.floating?"width":"height"])){
return _8a;
}else{
return (l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b);
}
},_intersectsWithPointer:function(_8b){
var _8c=(this.options.axis==="x")||$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_8b.top,_8b.height),_8d=(this.options.axis==="y")||$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_8b.left,_8b.width),_8e=_8c&&_8d,_8f=this._getDragVerticalDirection(),_90=this._getDragHorizontalDirection();
if(!_8e){
return false;
}
return this.floating?(((_90&&_90=="right")||_8f=="down")?2:1):(_8f&&(_8f=="down"?2:1));
},_intersectsWithSides:function(_91){
var _92=$.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,_91.top+(_91.height/2),_91.height),_93=$.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,_91.left+(_91.width/2),_91.width),_94=this._getDragVerticalDirection(),_95=this._getDragHorizontalDirection();
if(this.floating&&_95){
return ((_95=="right"&&_93)||(_95=="left"&&!_93));
}else{
return _94&&((_94=="down"&&_92)||(_94=="up"&&!_92));
}
},_getDragVerticalDirection:function(){
var _96=this.positionAbs.top-this.lastPositionAbs.top;
return _96!=0&&(_96>0?"down":"up");
},_getDragHorizontalDirection:function(){
var _97=this.positionAbs.left-this.lastPositionAbs.left;
return _97!=0&&(_97>0?"right":"left");
},refresh:function(_98){
this._refreshItems(_98);
this.refreshPositions();
return this;
},_connectWith:function(){
var _99=this.options;
return _99.connectWith.constructor==String?[_99.connectWith]:_99.connectWith;
},_getItemsAsjQuery:function(_9a){
var _9b=this;
var _9c=[];
var _9d=[];
var _9e=this._connectWith();
if(_9e&&_9a){
for(var i=_9e.length-1;i>=0;i--){
var cur=$(_9e[i]);
for(var j=cur.length-1;j>=0;j--){
var _9f=$.data(cur[j],this.widgetName);
if(_9f&&_9f!=this&&!_9f.options.disabled){
_9d.push([$.isFunction(_9f.options.items)?_9f.options.items.call(_9f.element):$(_9f.options.items,_9f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),_9f]);
}
}
}
}
_9d.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var i=_9d.length-1;i>=0;i--){
_9d[i][0].each(function(){
_9c.push(this);
});
}
return $(_9c);
},_removeCurrentsFromItems:function(){
var _a0=this.currentItem.find(":data("+this.widgetName+"-item)");
for(var i=0;i<this.items.length;i++){
for(var j=0;j<_a0.length;j++){
if(_a0[j]==this.items[i].item[0]){
this.items.splice(i,1);
}
}
}
},_refreshItems:function(_a1){
this.items=[];
this.containers=[this];
var _a2=this.items;
var _a3=this;
var _a4=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],_a1,{item:this.currentItem}):$(this.options.items,this.element),this]];
var _a5=this._connectWith();
if(_a5&&this.ready){
for(var i=_a5.length-1;i>=0;i--){
var cur=$(_a5[i]);
for(var j=cur.length-1;j>=0;j--){
var _a6=$.data(cur[j],this.widgetName);
if(_a6&&_a6!=this&&!_a6.options.disabled){
_a4.push([$.isFunction(_a6.options.items)?_a6.options.items.call(_a6.element[0],_a1,{item:this.currentItem}):$(_a6.options.items,_a6.element),_a6]);
this.containers.push(_a6);
}
}
}
}
for(var i=_a4.length-1;i>=0;i--){
var _a7=_a4[i][1];
var _a8=_a4[i][0];
for(var j=0,_a9=_a8.length;j<_a9;j++){
var _aa=$(_a8[j]);
_aa.data(this.widgetName+"-item",_a7);
_a2.push({item:_aa,instance:_a7,width:0,height:0,left:0,top:0});
}
}
},refreshPositions:function(_ab){
if(this.offsetParent&&this.helper){
this.offset.parent=this._getParentOffset();
}
for(var i=this.items.length-1;i>=0;i--){
var _ac=this.items[i];
if(_ac.instance!=this.currentContainer&&this.currentContainer&&_ac.item[0]!=this.currentItem[0]){
continue;
}
var t=this.options.toleranceElement?$(this.options.toleranceElement,_ac.item):_ac.item;
if(!_ab){
_ac.width=t.outerWidth();
_ac.height=t.outerHeight();
}
var p=t.offset();
_ac.left=p.left;
_ac.top=p.top;
}
if(this.options.custom&&this.options.custom.refreshContainers){
this.options.custom.refreshContainers.call(this);
}else{
for(var i=this.containers.length-1;i>=0;i--){
var p=this.containers[i].element.offset();
this.containers[i].containerCache.left=p.left;
this.containers[i].containerCache.top=p.top;
this.containers[i].containerCache.width=this.containers[i].element.outerWidth();
this.containers[i].containerCache.height=this.containers[i].element.outerHeight();
}
}
return this;
},_createPlaceholder:function(_ad){
var _ae=_ad||this,o=_ae.options;
if(!o.placeholder||o.placeholder.constructor==String){
var _af=o.placeholder;
o.placeholder={element:function(){
var el=$(document.createElement(_ae.currentItem[0].nodeName)).addClass(_af||_ae.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!_af){
el.style.visibility="hidden";
}
return el;
},update:function(_b0,p){
if(_af&&!o.forcePlaceholderSize){
return;
}
if(!p.height()){
p.height(_ae.currentItem.innerHeight()-parseInt(_ae.currentItem.css("paddingTop")||0,10)-parseInt(_ae.currentItem.css("paddingBottom")||0,10));
}
if(!p.width()){
p.width(_ae.currentItem.innerWidth()-parseInt(_ae.currentItem.css("paddingLeft")||0,10)-parseInt(_ae.currentItem.css("paddingRight")||0,10));
}
}};
}
_ae.placeholder=$(o.placeholder.element.call(_ae.element,_ae.currentItem));
_ae.currentItem.after(_ae.placeholder);
o.placeholder.update(_ae,_ae.placeholder);
},_contactContainers:function(_b1){
var _b2=null,_b3=null;
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.currentItem[0],this.containers[i].element[0])){
continue;
}
if(this._intersectsWith(this.containers[i].containerCache)){
if(_b2&&$.ui.contains(this.containers[i].element[0],_b2.element[0])){
continue;
}
_b2=this.containers[i];
_b3=i;
}else{
if(this.containers[i].containerCache.over){
this.containers[i]._trigger("out",_b1,this._uiHash(this));
this.containers[i].containerCache.over=0;
}
}
}
if(!_b2){
return;
}
if(this.containers.length===1){
this.containers[_b3]._trigger("over",_b1,this._uiHash(this));
this.containers[_b3].containerCache.over=1;
}else{
if(this.currentContainer!=this.containers[_b3]){
var _b4=10000;
var _b5=null;
var _b6=this.positionAbs[this.containers[_b3].floating?"left":"top"];
for(var j=this.items.length-1;j>=0;j--){
if(!$.ui.contains(this.containers[_b3].element[0],this.items[j].item[0])){
continue;
}
var cur=this.containers[_b3].floating?this.items[j].item.offset().left:this.items[j].item.offset().top;
if(Math.abs(cur-_b6)<_b4){
_b4=Math.abs(cur-_b6);
_b5=this.items[j];
this.direction=(cur-_b6>0)?"down":"up";
}
}
if(!_b5&&!this.options.dropOnEmpty){
return;
}
this.currentContainer=this.containers[_b3];
_b5?this._rearrange(_b1,_b5,null,true):this._rearrange(_b1,null,this.containers[_b3].element,true);
this._trigger("change",_b1,this._uiHash());
this.containers[_b3]._trigger("change",_b1,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[_b3]._trigger("over",_b1,this._uiHash(this));
this.containers[_b3].containerCache.over=1;
}
}
},_createHelper:function(_b7){
var o=this.options;
var _b8=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[_b7,this.currentItem])):(o.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!_b8.parents("body").length){
$(o.appendTo!="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(_b8[0]);
}
if(_b8[0]==this.currentItem[0]){
this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};
}
if(_b8[0].style.width==""||o.forceHelperSize){
_b8.width(this.currentItem.width());
}
if(_b8[0].style.height==""||o.forceHelperSize){
_b8.height(this.currentItem.height());
}
return _b8;
},_adjustOffsetFromHelper:function(obj){
if(typeof obj=="string"){
obj=obj.split(" ");
}
if($.isArray(obj)){
obj={left:+obj[0],top:+obj[1]||0};
}
if("left" in obj){
this.offset.click.left=obj.left+this.margins.left;
}
if("right" in obj){
this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left;
}
if("top" in obj){
this.offset.click.top=obj.top+this.margins.top;
}
if("bottom" in obj){
this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top;
}
},_getParentOffset:function(){
this.offsetParent=this.helper.offsetParent();
var po=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0])){
po.left+=this.scrollParent.scrollLeft();
po.top+=this.scrollParent.scrollTop();
}
if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&$.browser.msie)){
po={top:0,left:0};
}
return {top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};
},_getRelativeOffset:function(){
if(this.cssPosition=="relative"){
var p=this.currentItem.position();
return {top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};
}else{
return {top:0,left:0};
}
},_cacheMargins:function(){
this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)};
},_cacheHelperProportions:function(){
this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};
},_setContainment:function(){
var o=this.options;
if(o.containment=="parent"){
o.containment=this.helper[0].parentNode;
}
if(o.containment=="document"||o.containment=="window"){
this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,($(o.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];
}
if(!(/^(document|window|parent)$/).test(o.containment)){
var ce=$(o.containment)[0];
var co=$(o.containment).offset();
var _b9=($(ce).css("overflow")!="hidden");
this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(_b9?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(_b9?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];
}
},_convertPositionTo:function(d,pos){
if(!pos){
pos=this.position;
}
var mod=d=="absolute"?1:-1;
var o=this.options,_ba=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_bb=(/(html|body)/i).test(_ba[0].tagName);
return {top:(pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_bb?0:_ba.scrollTop()))*mod)),left:(pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_bb?0:_ba.scrollLeft())*mod))};
},_generatePosition:function(_bc){
var o=this.options,_bd=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&$.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,_be=(/(html|body)/i).test(_bd[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){
this.offset.relative=this._getRelativeOffset();
}
var _bf=_bc.pageX;
var _c0=_bc.pageY;
if(this.originalPosition){
if(this.containment){
if(_bc.pageX-this.offset.click.left<this.containment[0]){
_bf=this.containment[0]+this.offset.click.left;
}
if(_bc.pageY-this.offset.click.top<this.containment[1]){
_c0=this.containment[1]+this.offset.click.top;
}
if(_bc.pageX-this.offset.click.left>this.containment[2]){
_bf=this.containment[2]+this.offset.click.left;
}
if(_bc.pageY-this.offset.click.top>this.containment[3]){
_c0=this.containment[3]+this.offset.click.top;
}
}
if(o.grid){
var top=this.originalPageY+Math.round((_c0-this.originalPageY)/o.grid[1])*o.grid[1];
_c0=this.containment?(!(top-this.offset.click.top<this.containment[1]||top-this.offset.click.top>this.containment[3])?top:(!(top-this.offset.click.top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;
var _c1=this.originalPageX+Math.round((_bf-this.originalPageX)/o.grid[0])*o.grid[0];
_bf=this.containment?(!(_c1-this.offset.click.left<this.containment[0]||_c1-this.offset.click.left>this.containment[2])?_c1:(!(_c1-this.offset.click.left<this.containment[0])?_c1-o.grid[0]:_c1+o.grid[0])):_c1;
}
}
return {top:(_c0-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(_be?0:_bd.scrollTop())))),left:(_bf-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+($.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():_be?0:_bd.scrollLeft())))};
},_rearrange:function(_c2,i,a,_c3){
a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?i.item[0]:i.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var _c4=this,_c5=this.counter;
window.setTimeout(function(){
if(_c5==_c4.counter){
_c4.refreshPositions(!_c3);
}
},0);
},_clear:function(_c6,_c7){
this.reverting=false;
var _c8=[],_c9=this;
if(!this._noFinalSort&&this.currentItem.parent().length){
this.placeholder.before(this.currentItem);
}
this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){
for(var i in this._storedCSS){
if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static"){
this._storedCSS[i]="";
}
}
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
}else{
this.currentItem.show();
}
if(this.fromOutside&&!_c7){
_c8.push(function(_ca){
this._trigger("receive",_ca,this._uiHash(this.fromOutside));
});
}
if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!_c7){
_c8.push(function(_cb){
this._trigger("update",_cb,this._uiHash());
});
}
if(!$.ui.contains(this.element[0],this.currentItem[0])){
if(!_c7){
_c8.push(function(_cc){
this._trigger("remove",_cc,this._uiHash());
});
}
for(var i=this.containers.length-1;i>=0;i--){
if($.ui.contains(this.containers[i].element[0],this.currentItem[0])&&!_c7){
_c8.push((function(c){
return function(_cd){
c._trigger("receive",_cd,this._uiHash(this));
};
}).call(this,this.containers[i]));
_c8.push((function(c){
return function(_ce){
c._trigger("update",_ce,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
}
}
for(var i=this.containers.length-1;i>=0;i--){
if(!_c7){
_c8.push((function(c){
return function(_cf){
c._trigger("deactivate",_cf,this._uiHash(this));
};
}).call(this,this.containers[i]));
}
if(this.containers[i].containerCache.over){
_c8.push((function(c){
return function(_d0){
c._trigger("out",_d0,this._uiHash(this));
};
}).call(this,this.containers[i]));
this.containers[i].containerCache.over=0;
}
}
if(this._storedCursor){
$("body").css("cursor",this._storedCursor);
}
if(this._storedOpacity){
this.helper.css("opacity",this._storedOpacity);
}
if(this._storedZIndex){
this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);
}
this.dragging=false;
if(this.cancelHelperRemoval){
if(!_c7){
this._trigger("beforeStop",_c6,this._uiHash());
for(var i=0;i<_c8.length;i++){
_c8[i].call(this,_c6);
}
this._trigger("stop",_c6,this._uiHash());
}
this.fromOutside=false;
return false;
}
if(!_c7){
this._trigger("beforeStop",_c6,this._uiHash());
}
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){
this.helper.remove();
}
this.helper=null;
if(!_c7){
for(var i=0;i<_c8.length;i++){
_c8[i].call(this,_c6);
}
this._trigger("stop",_c6,this._uiHash());
}
this.fromOutside=false;
return true;
},_trigger:function(){
if($.Widget.prototype._trigger.apply(this,arguments)===false){
this.cancel();
}
},_uiHash:function(_d1){
var _d2=_d1||this;
return {helper:_d2.helper,placeholder:_d2.placeholder||$([]),position:_d2.position,originalPosition:_d2.originalPosition,offset:_d2.positionAbs,item:_d2.currentItem,sender:_d1?_d1.element:null};
}});
$.extend($.ui.sortable,{version:"1.8.22"});
})(jQuery);
(function($,_d3){
var _d4=5;
$.widget("ui.slider",$.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){
var _d5=this,o=this.options,_d6=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),_d7="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",_d8=(o.values&&o.values.length)||1,_d9=[];
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider"+" ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(o.disabled?" ui-slider-disabled ui-disabled":""));
this.range=$([]);
if(o.range){
if(o.range===true){
if(!o.values){
o.values=[this._valueMin(),this._valueMin()];
}
if(o.values.length&&o.values.length!==2){
o.values=[o.values[0],o.values[0]];
}
}
this.range=$("<div></div>").appendTo(this.element).addClass("ui-slider-range"+" ui-widget-header"+((o.range==="min"||o.range==="max")?" ui-slider-range-"+o.range:""));
}
for(var i=_d6.length;i<_d8;i+=1){
_d9.push(_d7);
}
this.handles=_d6.add($(_d9.join("")).appendTo(_d5.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(_da){
_da.preventDefault();
}).hover(function(){
if(!o.disabled){
$(this).addClass("ui-state-hover");
}
},function(){
$(this).removeClass("ui-state-hover");
}).focus(function(){
if(!o.disabled){
$(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
$(this).addClass("ui-state-focus");
}else{
$(this).blur();
}
}).blur(function(){
$(this).removeClass("ui-state-focus");
});
this.handles.each(function(i){
$(this).data("index.ui-slider-handle",i);
});
this.handles.keydown(function(_db){
var _dc=$(this).data("index.ui-slider-handle"),_dd,_de,_df,_e0;
if(_d5.options.disabled){
return;
}
switch(_db.keyCode){
case $.ui.keyCode.HOME:
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_UP:
case $.ui.keyCode.PAGE_DOWN:
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
_db.preventDefault();
if(!_d5._keySliding){
_d5._keySliding=true;
$(this).addClass("ui-state-active");
_dd=_d5._start(_db,_dc);
if(_dd===false){
return;
}
}
break;
}
_e0=_d5.options.step;
if(_d5.options.values&&_d5.options.values.length){
_de=_df=_d5.values(_dc);
}else{
_de=_df=_d5.value();
}
switch(_db.keyCode){
case $.ui.keyCode.HOME:
_df=_d5._valueMin();
break;
case $.ui.keyCode.END:
_df=_d5._valueMax();
break;
case $.ui.keyCode.PAGE_UP:
_df=_d5._trimAlignValue(_de+((_d5._valueMax()-_d5._valueMin())/_d4));
break;
case $.ui.keyCode.PAGE_DOWN:
_df=_d5._trimAlignValue(_de-((_d5._valueMax()-_d5._valueMin())/_d4));
break;
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
if(_de===_d5._valueMax()){
return;
}
_df=_d5._trimAlignValue(_de+_e0);
break;
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if(_de===_d5._valueMin()){
return;
}
_df=_d5._trimAlignValue(_de-_e0);
break;
}
_d5._slide(_db,_dc,_df);
}).keyup(function(_e1){
var _e2=$(this).data("index.ui-slider-handle");
if(_d5._keySliding){
_d5._keySliding=false;
_d5._stop(_e1,_e2);
_d5._change(_e1,_e2);
$(this).removeClass("ui-state-active");
}
});
this._refreshValue();
this._animateOff=false;
},destroy:function(){
this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider"+" ui-slider-horizontal"+" ui-slider-vertical"+" ui-slider-disabled"+" ui-widget"+" ui-widget-content"+" ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this;
},_mouseCapture:function(_e3){
var o=this.options,_e4,_e5,_e6,_e7,_e8,_e9,_ea,_eb,_ec;
if(o.disabled){
return false;
}
this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
_e4={x:_e3.pageX,y:_e3.pageY};
_e5=this._normValueFromMouse(_e4);
_e6=this._valueMax()-this._valueMin()+1;
_e8=this;
this.handles.each(function(i){
var _ed=Math.abs(_e5-_e8.values(i));
if(_e6>_ed){
_e6=_ed;
_e7=$(this);
_e9=i;
}
});
if(o.range===true&&this.values(1)===o.min){
_e9+=1;
_e7=$(this.handles[_e9]);
}
_ea=this._start(_e3,_e9);
if(_ea===false){
return false;
}
this._mouseSliding=true;
_e8._handleIndex=_e9;
_e7.addClass("ui-state-active").focus();
_eb=_e7.offset();
_ec=!$(_e3.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=_ec?{left:0,top:0}:{left:_e3.pageX-_eb.left-(_e7.width()/2),top:_e3.pageY-_eb.top-(_e7.height()/2)-(parseInt(_e7.css("borderTopWidth"),10)||0)-(parseInt(_e7.css("borderBottomWidth"),10)||0)+(parseInt(_e7.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){
this._slide(_e3,_e9,_e5);
}
this._animateOff=true;
return true;
},_mouseStart:function(_ee){
return true;
},_mouseDrag:function(_ef){
var _f0={x:_ef.pageX,y:_ef.pageY},_f1=this._normValueFromMouse(_f0);
this._slide(_ef,this._handleIndex,_f1);
return false;
},_mouseStop:function(_f2){
this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(_f2,this._handleIndex);
this._change(_f2,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false;
},_detectOrientation:function(){
this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal";
},_normValueFromMouse:function(_f3){
var _f4,_f5,_f6,_f7,_f8;
if(this.orientation==="horizontal"){
_f4=this.elementSize.width;
_f5=_f3.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0);
}else{
_f4=this.elementSize.height;
_f5=_f3.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0);
}
_f6=(_f5/_f4);
if(_f6>1){
_f6=1;
}
if(_f6<0){
_f6=0;
}
if(this.orientation==="vertical"){
_f6=1-_f6;
}
_f7=this._valueMax()-this._valueMin();
_f8=this._valueMin()+_f6*_f7;
return this._trimAlignValue(_f8);
},_start:function(_f9,_fa){
var _fb={handle:this.handles[_fa],value:this.value()};
if(this.options.values&&this.options.values.length){
_fb.value=this.values(_fa);
_fb.values=this.values();
}
return this._trigger("start",_f9,_fb);
},_slide:function(_fc,_fd,_fe){
var _ff,_100,_101;
if(this.options.values&&this.options.values.length){
_ff=this.values(_fd?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((_fd===0&&_fe>_ff)||(_fd===1&&_fe<_ff))){
_fe=_ff;
}
if(_fe!==this.values(_fd)){
_100=this.values();
_100[_fd]=_fe;
_101=this._trigger("slide",_fc,{handle:this.handles[_fd],value:_fe,values:_100});
_ff=this.values(_fd?0:1);
if(_101!==false){
this.values(_fd,_fe,true);
}
}
}else{
if(_fe!==this.value()){
_101=this._trigger("slide",_fc,{handle:this.handles[_fd],value:_fe});
if(_101!==false){
this.value(_fe);
}
}
}
},_stop:function(_102,_103){
var _104={handle:this.handles[_103],value:this.value()};
if(this.options.values&&this.options.values.length){
_104.value=this.values(_103);
_104.values=this.values();
}
this._trigger("stop",_102,_104);
},_change:function(_105,_106){
if(!this._keySliding&&!this._mouseSliding){
var _107={handle:this.handles[_106],value:this.value()};
if(this.options.values&&this.options.values.length){
_107.value=this.values(_106);
_107.values=this.values();
}
this._trigger("change",_105,_107);
}
},value:function(_108){
if(arguments.length){
this.options.value=this._trimAlignValue(_108);
this._refreshValue();
this._change(null,0);
return;
}
return this._value();
},values:function(_109,_10a){
var vals,_10b,i;
if(arguments.length>1){
this.options.values[_109]=this._trimAlignValue(_10a);
this._refreshValue();
this._change(null,_109);
return;
}
if(arguments.length){
if($.isArray(arguments[0])){
vals=this.options.values;
_10b=arguments[0];
for(i=0;i<vals.length;i+=1){
vals[i]=this._trimAlignValue(_10b[i]);
this._change(null,i);
}
this._refreshValue();
}else{
if(this.options.values&&this.options.values.length){
return this._values(_109);
}else{
return this.value();
}
}
}else{
return this._values();
}
},_setOption:function(key,_10c){
var i,_10d=0;
if($.isArray(this.options.values)){
_10d=this.options.values.length;
}
$.Widget.prototype._setOption.apply(this,arguments);
switch(key){
case "disabled":
if(_10c){
this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.propAttr("disabled",true);
this.element.addClass("ui-disabled");
}else{
this.handles.propAttr("disabled",false);
this.element.removeClass("ui-disabled");
}
break;
case "orientation":
this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case "value":
this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case "values":
this._animateOff=true;
this._refreshValue();
for(i=0;i<_10d;i+=1){
this._change(null,i);
}
this._animateOff=false;
break;
}
},_value:function(){
var val=this.options.value;
val=this._trimAlignValue(val);
return val;
},_values:function(_10e){
var val,vals,i;
if(arguments.length){
val=this.options.values[_10e];
val=this._trimAlignValue(val);
return val;
}else{
vals=this.options.values.slice();
for(i=0;i<vals.length;i+=1){
vals[i]=this._trimAlignValue(vals[i]);
}
return vals;
}
},_trimAlignValue:function(val){
if(val<=this._valueMin()){
return this._valueMin();
}
if(val>=this._valueMax()){
return this._valueMax();
}
var step=(this.options.step>0)?this.options.step:1,_10f=(val-this._valueMin())%step,_110=val-_10f;
if(Math.abs(_10f)*2>=step){
_110+=(_10f>0)?step:(-step);
}
return parseFloat(_110.toFixed(5));
},_valueMin:function(){
return this.options.min;
},_valueMax:function(){
return this.options.max;
},_refreshValue:function(){
var _111=this.options.range,o=this.options,self=this,_112=(!this._animateOff)?o.animate:false,_113,_114={},_115,_116,_117,_118;
if(this.options.values&&this.options.values.length){
this.handles.each(function(i,j){
_113=(self.values(i)-self._valueMin())/(self._valueMax()-self._valueMin())*100;
_114[self.orientation==="horizontal"?"left":"bottom"]=_113+"%";
$(this).stop(1,1)[_112?"animate":"css"](_114,o.animate);
if(self.options.range===true){
if(self.orientation==="horizontal"){
if(i===0){
self.range.stop(1,1)[_112?"animate":"css"]({left:_113+"%"},o.animate);
}
if(i===1){
self.range[_112?"animate":"css"]({width:(_113-_115)+"%"},{queue:false,duration:o.animate});
}
}else{
if(i===0){
self.range.stop(1,1)[_112?"animate":"css"]({bottom:(_113)+"%"},o.animate);
}
if(i===1){
self.range[_112?"animate":"css"]({height:(_113-_115)+"%"},{queue:false,duration:o.animate});
}
}
}
_115=_113;
});
}else{
_116=this.value();
_117=this._valueMin();
_118=this._valueMax();
_113=(_118!==_117)?(_116-_117)/(_118-_117)*100:0;
_114[self.orientation==="horizontal"?"left":"bottom"]=_113+"%";
this.handle.stop(1,1)[_112?"animate":"css"](_114,o.animate);
if(_111==="min"&&this.orientation==="horizontal"){
this.range.stop(1,1)[_112?"animate":"css"]({width:_113+"%"},o.animate);
}
if(_111==="max"&&this.orientation==="horizontal"){
this.range[_112?"animate":"css"]({width:(100-_113)+"%"},{queue:false,duration:o.animate});
}
if(_111==="min"&&this.orientation==="vertical"){
this.range.stop(1,1)[_112?"animate":"css"]({height:_113+"%"},o.animate);
}
if(_111==="max"&&this.orientation==="vertical"){
this.range[_112?"animate":"css"]({height:(100-_113)+"%"},{queue:false,duration:o.animate});
}
}
}});
$.extend($.ui.slider,{version:"1.8.22"});
}(jQuery));
jQuery.effects||(function($,_119){
$.effects={};
$.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(i,attr){
$.fx.step[attr]=function(fx){
if(!fx.colorInit){
fx.start=_11a(fx.elem,attr);
fx.end=_11b(fx.end);
fx.colorInit=true;
}
fx.elem.style[attr]="rgb("+Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1],10),255),0)+","+Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2],10),255),0)+")";
};
});
function _11b(_11c){
var _11d;
if(_11c&&_11c.constructor==Array&&_11c.length==3){
return _11c;
}
if(_11d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(_11c)){
return [parseInt(_11d[1],10),parseInt(_11d[2],10),parseInt(_11d[3],10)];
}
if(_11d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(_11c)){
return [parseFloat(_11d[1])*2.55,parseFloat(_11d[2])*2.55,parseFloat(_11d[3])*2.55];
}
if(_11d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(_11c)){
return [parseInt(_11d[1],16),parseInt(_11d[2],16),parseInt(_11d[3],16)];
}
if(_11d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(_11c)){
return [parseInt(_11d[1]+_11d[1],16),parseInt(_11d[2]+_11d[2],16),parseInt(_11d[3]+_11d[3],16)];
}
if(_11d=/rgba\(0, 0, 0, 0\)/.exec(_11c)){
return _11e["transparent"];
}
return _11e[$.trim(_11c).toLowerCase()];
};
function _11a(elem,attr){
var _11f;
do{
_11f=($.curCSS||$.css)(elem,attr);
if(_11f!=""&&_11f!="transparent"||$.nodeName(elem,"body")){
break;
}
attr="backgroundColor";
}while(elem=elem.parentNode);
return _11b(_11f);
};
var _11e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var _120=["add","remove","toggle"],_121={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function _122(){
var _123=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,_124={},key,_125;
if(_123&&_123.length&&_123[0]&&_123[_123[0]]){
var len=_123.length;
while(len--){
key=_123[len];
if(typeof _123[key]=="string"){
_125=key.replace(/\-(\w)/g,function(all,_126){
return _126.toUpperCase();
});
_124[_125]=_123[key];
}
}
}else{
for(key in _123){
if(typeof _123[key]==="string"){
_124[key]=_123[key];
}
}
}
return _124;
};
function _127(_128){
var name,_129;
for(name in _128){
_129=_128[name];
if(_129==null||$.isFunction(_129)||name in _121||(/scrollbar/).test(name)||(!(/color/i).test(name)&&isNaN(parseFloat(_129)))){
delete _128[name];
}
}
return _128;
};
function _12a(_12b,_12c){
var diff={_:0},name;
for(name in _12c){
if(_12b[name]!=_12c[name]){
diff[name]=_12c[name];
}
}
return diff;
};
$.effects.animateClass=function(_12d,_12e,_12f,_130){
if($.isFunction(_12f)){
_130=_12f;
_12f=null;
}
return this.queue(function(){
var that=$(this),_131=that.attr("style")||" ",_132=_127(_122.call(this)),_133,_134=that.attr("class")||"";
$.each(_120,function(i,_135){
if(_12d[_135]){
that[_135+"Class"](_12d[_135]);
}
});
_133=_127(_122.call(this));
that.attr("class",_134);
that.animate(_12a(_132,_133),{queue:false,duration:_12e,easing:_12f,complete:function(){
$.each(_120,function(i,_136){
if(_12d[_136]){
that[_136+"Class"](_12d[_136]);
}
});
if(typeof that.attr("style")=="object"){
that.attr("style").cssText="";
that.attr("style").cssText=_131;
}else{
that.attr("style",_131);
}
if(_130){
_130.apply(this,arguments);
}
$.dequeue(this);
}});
});
};
$.fn.extend({_addClass:$.fn.addClass,addClass:function(_137,_138,_139,_13a){
return _138?$.effects.animateClass.apply(this,[{add:_137},_138,_139,_13a]):this._addClass(_137);
},_removeClass:$.fn.removeClass,removeClass:function(_13b,_13c,_13d,_13e){
return _13c?$.effects.animateClass.apply(this,[{remove:_13b},_13c,_13d,_13e]):this._removeClass(_13b);
},_toggleClass:$.fn.toggleClass,toggleClass:function(_13f,_140,_141,_142,_143){
if(typeof _140=="boolean"||_140===_119){
if(!_141){
return this._toggleClass(_13f,_140);
}else{
return $.effects.animateClass.apply(this,[(_140?{add:_13f}:{remove:_13f}),_141,_142,_143]);
}
}else{
return $.effects.animateClass.apply(this,[{toggle:_13f},_140,_141,_142]);
}
},switchClass:function(_144,add,_145,_146,_147){
return $.effects.animateClass.apply(this,[{add:add,remove:_144},_145,_146,_147]);
}});
$.extend($.effects,{version:"1.8.22",save:function(_148,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_148.data("ec.storage."+set[i],_148[0].style[set[i]]);
}
}
},restore:function(_149,set){
for(var i=0;i<set.length;i++){
if(set[i]!==null){
_149.css(set[i],_149.data("ec.storage."+set[i]));
}
}
},setMode:function(el,mode){
if(mode=="toggle"){
mode=el.is(":hidden")?"show":"hide";
}
return mode;
},getBaseline:function(_14a,_14b){
var y,x;
switch(_14a[0]){
case "top":
y=0;
break;
case "middle":
y=0.5;
break;
case "bottom":
y=1;
break;
default:
y=_14a[0]/_14b.height;
}
switch(_14a[1]){
case "left":
x=0;
break;
case "center":
x=0.5;
break;
case "right":
x=1;
break;
default:
x=_14a[1]/_14b.width;
}
return {x:x,y:y};
},createWrapper:function(_14c){
if(_14c.parent().is(".ui-effects-wrapper")){
return _14c.parent();
}
var _14d={width:_14c.outerWidth(true),height:_14c.outerHeight(true),"float":_14c.css("float")},_14e=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),_14f=document.activeElement;
try{
_14f.id;
}
catch(e){
_14f=document.body;
}
_14c.wrap(_14e);
if(_14c[0]===_14f||$.contains(_14c[0],_14f)){
$(_14f).focus();
}
_14e=_14c.parent();
if(_14c.css("position")=="static"){
_14e.css({position:"relative"});
_14c.css({position:"relative"});
}else{
$.extend(_14d,{position:_14c.css("position"),zIndex:_14c.css("z-index")});
$.each(["top","left","bottom","right"],function(i,pos){
_14d[pos]=_14c.css(pos);
if(isNaN(parseInt(_14d[pos],10))){
_14d[pos]="auto";
}
});
_14c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});
}
return _14e.css(_14d).show();
},removeWrapper:function(_150){
var _151,_152=document.activeElement;
if(_150.parent().is(".ui-effects-wrapper")){
_151=_150.parent().replaceWith(_150);
if(_150[0]===_152||$.contains(_150[0],_152)){
$(_152).focus();
}
return _151;
}
return _150;
},setTransition:function(_153,list,_154,_155){
_155=_155||{};
$.each(list,function(i,x){
var unit=_153.cssUnit(x);
if(unit[0]>0){
_155[x]=unit[0]*_154+unit[1];
}
});
return _155;
}});
function _156(_157,_158,_159,_15a){
if(typeof _157=="object"){
_15a=_158;
_159=null;
_158=_157;
_157=_158.effect;
}
if($.isFunction(_158)){
_15a=_158;
_159=null;
_158={};
}
if(typeof _158=="number"||$.fx.speeds[_158]){
_15a=_159;
_159=_158;
_158={};
}
if($.isFunction(_159)){
_15a=_159;
_159=null;
}
_158=_158||{};
_159=_159||_158.duration;
_159=$.fx.off?0:typeof _159=="number"?_159:_159 in $.fx.speeds?$.fx.speeds[_159]:$.fx.speeds._default;
_15a=_15a||_158.complete;
return [_157,_158,_159,_15a];
};
function _15b(_15c){
if(!_15c||typeof _15c==="number"||$.fx.speeds[_15c]){
return true;
}
if(typeof _15c==="string"&&!$.effects[_15c]){
return true;
}
return false;
};
$.fn.extend({effect:function(_15d,_15e,_15f,_160){
var args=_156.apply(this,arguments),_161={options:args[1],duration:args[2],callback:args[3]},mode=_161.options.mode,_162=$.effects[_15d];
if($.fx.off||!_162){
if(mode){
return this[mode](_161.duration,_161.callback);
}else{
return this.each(function(){
if(_161.callback){
_161.callback.call(this);
}
});
}
}
return _162.call(this,_161);
},_show:$.fn.show,show:function(_163){
if(_15b(_163)){
return this._show.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="show";
return this.effect.apply(this,args);
}
},_hide:$.fn.hide,hide:function(_164){
if(_15b(_164)){
return this._hide.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="hide";
return this.effect.apply(this,args);
}
},__toggle:$.fn.toggle,toggle:function(_165){
if(_15b(_165)||typeof _165==="boolean"||$.isFunction(_165)){
return this.__toggle.apply(this,arguments);
}else{
var args=_156.apply(this,arguments);
args[1].mode="toggle";
return this.effect.apply(this,args);
}
},cssUnit:function(key){
var _166=this.css(key),val=[];
$.each(["em","px","%","pt"],function(i,unit){
if(_166.indexOf(unit)>0){
val=[parseFloat(_166),unit];
}
});
return val;
}});
$.easing.jswing=$.easing.swing;
$.extend($.easing,{def:"easeOutQuad",swing:function(x,t,b,c,d){
return $.easing[$.easing.def](x,t,b,c,d);
},easeInQuad:function(x,t,b,c,d){
return c*(t/=d)*t+b;
},easeOutQuad:function(x,t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeInOutQuad:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},easeInCubic:function(x,t,b,c,d){
return c*(t/=d)*t*t+b;
},easeOutCubic:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t+1)+b;
},easeInOutCubic:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t+b;
}
return c/2*((t-=2)*t*t+2)+b;
},easeInQuart:function(x,t,b,c,d){
return c*(t/=d)*t*t*t+b;
},easeOutQuart:function(x,t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
},easeInOutQuart:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
},easeInQuint:function(x,t,b,c,d){
return c*(t/=d)*t*t*t*t+b;
},easeOutQuint:function(x,t,b,c,d){
return c*((t=t/d-1)*t*t*t*t+1)+b;
},easeInOutQuint:function(x,t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t*t+b;
}
return c/2*((t-=2)*t*t*t*t+2)+b;
},easeInSine:function(x,t,b,c,d){
return -c*Math.cos(t/d*(Math.PI/2))+c+b;
},easeOutSine:function(x,t,b,c,d){
return c*Math.sin(t/d*(Math.PI/2))+b;
},easeInOutSine:function(x,t,b,c,d){
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
},easeInExpo:function(x,t,b,c,d){
return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
},easeOutExpo:function(x,t,b,c,d){
return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
},easeInOutExpo:function(x,t,b,c,d){
if(t==0){
return b;
}
if(t==d){
return b+c;
}
if((t/=d/2)<1){
return c/2*Math.pow(2,10*(t-1))+b;
}
return c/2*(-Math.pow(2,-10*--t)+2)+b;
},easeInCirc:function(x,t,b,c,d){
return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
},easeOutCirc:function(x,t,b,c,d){
return c*Math.sqrt(1-(t=t/d-1)*t)+b;
},easeInOutCirc:function(x,t,b,c,d){
if((t/=d/2)<1){
return -c/2*(Math.sqrt(1-t*t)-1)+b;
}
return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
},easeInElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
},easeOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
},easeInOutElastic:function(x,t,b,c,d){
var s=1.70158;
var p=0;
var a=c;
if(t==0){
return b;
}
if((t/=d/2)==2){
return b+c;
}
if(!p){
p=d*(0.3*1.5);
}
if(a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
},easeInBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},easeOutBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},easeInOutBack:function(x,t,b,c,d,s){
if(s==_119){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},easeInBounce:function(x,t,b,c,d){
return c-$.easing.easeOutBounce(x,d-t,0,c,d)+b;
},easeOutBounce:function(x,t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}else{
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
}
}
}
},easeInOutBounce:function(x,t,b,c,d){
if(t<d/2){
return $.easing.easeInBounce(x,t*2,0,c,d)*0.5+b;
}
return $.easing.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b;
}});
})(jQuery);
(function($,_167){
$.effects.blind=function(o){
return this.queue(function(){
var el=$(this),_168=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _169=o.options.direction||"vertical";
$.effects.save(el,_168);
el.show();
var _16a=$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_169=="vertical")?"height":"width";
var _16b=(_169=="vertical")?_16a.height():_16a.width();
if(mode=="show"){
_16a.css(ref,0);
}
var _16c={};
_16c[ref]=mode=="show"?_16b:0;
_16a.animate(_16c,o.duration,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_168);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_16d){
$.effects.bounce=function(o){
return this.queue(function(){
var el=$(this),_16e=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _16f=o.options.direction||"up";
var _170=o.options.distance||20;
var _171=o.options.times||5;
var _172=o.duration||250;
if(/show|hide/.test(mode)){
_16e.push("opacity");
}
$.effects.save(el,_16e);
el.show();
$.effects.createWrapper(el);
var ref=(_16f=="up"||_16f=="down")?"top":"left";
var _173=(_16f=="up"||_16f=="left")?"pos":"neg";
var _170=o.options.distance||(ref=="top"?el.outerHeight(true)/3:el.outerWidth(true)/3);
if(mode=="show"){
el.css("opacity",0).css(ref,_173=="pos"?-_170:_170);
}
if(mode=="hide"){
_170=_170/(_171*2);
}
if(mode!="hide"){
_171--;
}
if(mode=="show"){
var _174={opacity:1};
_174[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_174,_172/2,o.options.easing);
_170=_170/2;
_171--;
}
for(var i=0;i<_171;i++){
var _175={},_176={};
_175[ref]=(_173=="pos"?"-=":"+=")+_170;
_176[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_175,_172/2,o.options.easing).animate(_176,_172/2,o.options.easing);
_170=(mode=="hide")?_170*2:_170/2;
}
if(mode=="hide"){
var _174={opacity:0};
_174[ref]=(_173=="pos"?"-=":"+=")+_170;
el.animate(_174,_172/2,o.options.easing,function(){
el.hide();
$.effects.restore(el,_16e);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}else{
var _175={},_176={};
_175[ref]=(_173=="pos"?"-=":"+=")+_170;
_176[ref]=(_173=="pos"?"+=":"-=")+_170;
el.animate(_175,_172/2,o.options.easing).animate(_176,_172/2,o.options.easing,function(){
$.effects.restore(el,_16e);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
}
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_177){
$.effects.clip=function(o){
return this.queue(function(){
var el=$(this),_178=["position","top","bottom","left","right","height","width"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _179=o.options.direction||"vertical";
$.effects.save(el,_178);
el.show();
var _17a=$.effects.createWrapper(el).css({overflow:"hidden"});
var _17b=el[0].tagName=="IMG"?_17a:el;
var ref={size:(_179=="vertical")?"height":"width",position:(_179=="vertical")?"top":"left"};
var _17c=(_179=="vertical")?_17b.height():_17b.width();
if(mode=="show"){
_17b.css(ref.size,0);
_17b.css(ref.position,_17c/2);
}
var _17d={};
_17d[ref.size]=mode=="show"?_17c:0;
_17d[ref.position]=mode=="show"?0:_17c/2;
_17b.animate(_17d,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_178);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_17e){
$.effects.drop=function(o){
return this.queue(function(){
var el=$(this),_17f=["position","top","bottom","left","right","opacity"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var _180=o.options.direction||"left";
$.effects.save(el,_17f);
el.show();
$.effects.createWrapper(el);
var ref=(_180=="up"||_180=="down")?"top":"left";
var _181=(_180=="up"||_180=="left")?"pos":"neg";
var _182=o.options.distance||(ref=="top"?el.outerHeight(true)/2:el.outerWidth(true)/2);
if(mode=="show"){
el.css("opacity",0).css(ref,_181=="pos"?-_182:_182);
}
var _183={opacity:mode=="show"?1:0};
_183[ref]=(mode=="show"?(_181=="pos"?"+=":"-="):(_181=="pos"?"-=":"+="))+_182;
el.animate(_183,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_17f);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_184){
$.effects.explode=function(o){
return this.queue(function(){
var rows=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
var _185=o.options.pieces?Math.round(Math.sqrt(o.options.pieces)):3;
o.options.mode=o.options.mode=="toggle"?($(this).is(":visible")?"hide":"show"):o.options.mode;
var el=$(this).show().css("visibility","hidden");
var _186=el.offset();
_186.top-=parseInt(el.css("marginTop"),10)||0;
_186.left-=parseInt(el.css("marginLeft"),10)||0;
var _187=el.outerWidth(true);
var _188=el.outerHeight(true);
for(var i=0;i<rows;i++){
for(var j=0;j<_185;j++){
el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(_187/_185),top:-i*(_188/rows)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_187/_185,height:_188/rows,left:_186.left+j*(_187/_185)+(o.options.mode=="show"?(j-Math.floor(_185/2))*(_187/_185):0),top:_186.top+i*(_188/rows)+(o.options.mode=="show"?(i-Math.floor(rows/2))*(_188/rows):0),opacity:o.options.mode=="show"?0:1}).animate({left:_186.left+j*(_187/_185)+(o.options.mode=="show"?0:(j-Math.floor(_185/2))*(_187/_185)),top:_186.top+i*(_188/rows)+(o.options.mode=="show"?0:(i-Math.floor(rows/2))*(_188/rows)),opacity:o.options.mode=="show"?1:0},o.duration||500);
}
}
setTimeout(function(){
o.options.mode=="show"?el.css({visibility:"visible"}):el.css({visibility:"visible"}).hide();
if(o.callback){
o.callback.apply(el[0]);
}
el.dequeue();
$("div.ui-effects-explode").remove();
},o.duration||500);
});
};
})(jQuery);
(function($,_189){
$.effects.fade=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide");
elem.animate({opacity:mode},{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_18a){
$.effects.fold=function(o){
return this.queue(function(){
var el=$(this),_18b=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"hide");
var size=o.options.size||15;
var _18c=!(!o.options.horizFirst);
var _18d=o.duration?o.duration/2:$.fx.speeds._default/2;
$.effects.save(el,_18b);
el.show();
var _18e=$.effects.createWrapper(el).css({overflow:"hidden"});
var _18f=((mode=="show")!=_18c);
var ref=_18f?["width","height"]:["height","width"];
var _190=_18f?[_18e.width(),_18e.height()]:[_18e.height(),_18e.width()];
var _191=/([0-9]+)%/.exec(size);
if(_191){
size=parseInt(_191[1],10)/100*_190[mode=="hide"?0:1];
}
if(mode=="show"){
_18e.css(_18c?{height:0,width:size}:{height:size,width:0});
}
var _192={},_193={};
_192[ref[0]]=mode=="show"?_190[0]:size;
_193[ref[1]]=mode=="show"?_190[1]:0;
_18e.animate(_192,_18d,o.options.easing).animate(_193,_18d,o.options.easing,function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_18b);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(el[0],arguments);
}
el.dequeue();
});
});
};
})(jQuery);
(function($,_194){
$.effects.highlight=function(o){
return this.queue(function(){
var elem=$(this),_195=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.options.mode||"show"),_196={backgroundColor:elem.css("backgroundColor")};
if(mode=="hide"){
_196.opacity=0;
}
$.effects.save(elem,_195);
elem.show().css({backgroundImage:"none",backgroundColor:o.options.color||"#ffff99"}).animate(_196,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
(mode=="hide"&&elem.hide());
$.effects.restore(elem,_195);
(mode=="show"&&!$.support.opacity&&this.style.removeAttribute("filter"));
(o.callback&&o.callback.apply(this,arguments));
elem.dequeue();
}});
});
};
})(jQuery);
(function($,_197){
$.effects.pulsate=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"show"),_198=((o.options.times||5)*2)-1,_199=o.duration?o.duration/2:$.fx.speeds._default/2,_19a=elem.is(":visible"),_19b=0;
if(!_19a){
elem.css("opacity",0).show();
_19b=1;
}
if((mode=="hide"&&_19a)||(mode=="show"&&!_19a)){
_198--;
}
for(var i=0;i<_198;i++){
elem.animate({opacity:_19b},_199,o.options.easing);
_19b=(_19b+1)%2;
}
elem.animate({opacity:_19b},_199,o.options.easing,function(){
if(_19b==0){
elem.hide();
}
(o.callback&&o.callback.apply(this,arguments));
});
elem.queue("fx",function(){
elem.dequeue();
}).dequeue();
});
};
})(jQuery);
(function($,_19c){
$.effects.puff=function(o){
return this.queue(function(){
var elem=$(this),mode=$.effects.setMode(elem,o.options.mode||"hide"),_19d=parseInt(o.options.percent,10)||150,_19e=_19d/100,_19f={height:elem.height(),width:elem.width()};
$.extend(o.options,{fade:true,mode:mode,percent:mode=="hide"?_19d:100,from:mode=="hide"?_19f:{height:_19f.height*_19e,width:_19f.width*_19e}});
elem.effect("scale",o.options,o.duration,o.callback);
elem.dequeue();
});
};
$.effects.scale=function(o){
return this.queue(function(){
var el=$(this);
var _1a0=$.extend(true,{},o.options);
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1a1=parseInt(o.options.percent,10)||(parseInt(o.options.percent,10)==0?0:(mode=="hide"?0:100));
var _1a2=o.options.direction||"both";
var _1a3=o.options.origin;
if(mode!="effect"){
_1a0.origin=_1a3||["middle","center"];
_1a0.restore=true;
}
var _1a4={height:el.height(),width:el.width()};
el.from=o.options.from||(mode=="show"?{height:0,width:0}:_1a4);
var _1a5={y:_1a2!="horizontal"?(_1a1/100):1,x:_1a2!="vertical"?(_1a1/100):1};
el.to={height:_1a4.height*_1a5.y,width:_1a4.width*_1a5.x};
if(o.options.fade){
if(mode=="show"){
el.from.opacity=0;
el.to.opacity=1;
}
if(mode=="hide"){
el.from.opacity=1;
el.to.opacity=0;
}
}
_1a0.from=el.from;
_1a0.to=el.to;
_1a0.mode=mode;
el.effect("size",_1a0,o.duration,o.callback);
el.dequeue();
});
};
$.effects.size=function(o){
return this.queue(function(){
var el=$(this),_1a6=["position","top","bottom","left","right","width","height","overflow","opacity"];
var _1a7=["position","top","bottom","left","right","overflow","opacity"];
var _1a8=["width","height","overflow"];
var _1a9=["fontSize"];
var _1aa=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var _1ab=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1ac=o.options.restore||false;
var _1ad=o.options.scale||"both";
var _1ae=o.options.origin;
var _1af={height:el.height(),width:el.width()};
el.from=o.options.from||_1af;
el.to=o.options.to||_1af;
if(_1ae){
var _1b0=$.effects.getBaseline(_1ae,_1af);
el.from.top=(_1af.height-el.from.height)*_1b0.y;
el.from.left=(_1af.width-el.from.width)*_1b0.x;
el.to.top=(_1af.height-el.to.height)*_1b0.y;
el.to.left=(_1af.width-el.to.width)*_1b0.x;
}
var _1b1={from:{y:el.from.height/_1af.height,x:el.from.width/_1af.width},to:{y:el.to.height/_1af.height,x:el.to.width/_1af.width}};
if(_1ad=="box"||_1ad=="both"){
if(_1b1.from.y!=_1b1.to.y){
_1a6=_1a6.concat(_1aa);
el.from=$.effects.setTransition(el,_1aa,_1b1.from.y,el.from);
el.to=$.effects.setTransition(el,_1aa,_1b1.to.y,el.to);
}
if(_1b1.from.x!=_1b1.to.x){
_1a6=_1a6.concat(_1ab);
el.from=$.effects.setTransition(el,_1ab,_1b1.from.x,el.from);
el.to=$.effects.setTransition(el,_1ab,_1b1.to.x,el.to);
}
}
if(_1ad=="content"||_1ad=="both"){
if(_1b1.from.y!=_1b1.to.y){
_1a6=_1a6.concat(_1a9);
el.from=$.effects.setTransition(el,_1a9,_1b1.from.y,el.from);
el.to=$.effects.setTransition(el,_1a9,_1b1.to.y,el.to);
}
}
$.effects.save(el,_1ac?_1a6:_1a7);
el.show();
$.effects.createWrapper(el);
el.css("overflow","hidden").css(el.from);
if(_1ad=="content"||_1ad=="both"){
_1aa=_1aa.concat(["marginTop","marginBottom"]).concat(_1a9);
_1ab=_1ab.concat(["marginLeft","marginRight"]);
_1a8=_1a6.concat(_1aa).concat(_1ab);
el.find("*[width]").each(function(){
var _1b2=$(this);
if(_1ac){
$.effects.save(_1b2,_1a8);
}
var _1b3={height:_1b2.height(),width:_1b2.width()};
_1b2.from={height:_1b3.height*_1b1.from.y,width:_1b3.width*_1b1.from.x};
_1b2.to={height:_1b3.height*_1b1.to.y,width:_1b3.width*_1b1.to.x};
if(_1b1.from.y!=_1b1.to.y){
_1b2.from=$.effects.setTransition(_1b2,_1aa,_1b1.from.y,_1b2.from);
_1b2.to=$.effects.setTransition(_1b2,_1aa,_1b1.to.y,_1b2.to);
}
if(_1b1.from.x!=_1b1.to.x){
_1b2.from=$.effects.setTransition(_1b2,_1ab,_1b1.from.x,_1b2.from);
_1b2.to=$.effects.setTransition(_1b2,_1ab,_1b1.to.x,_1b2.to);
}
_1b2.css(_1b2.from);
_1b2.animate(_1b2.to,o.duration,o.options.easing,function(){
if(_1ac){
$.effects.restore(_1b2,_1a8);
}
});
});
}
el.animate(el.to,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(el.to.opacity===0){
el.css("opacity",el.from.opacity);
}
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_1ac?_1a6:_1a7);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_1b4){
$.effects.shake=function(o){
return this.queue(function(){
var el=$(this),_1b5=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"effect");
var _1b6=o.options.direction||"left";
var _1b7=o.options.distance||20;
var _1b8=o.options.times||3;
var _1b9=o.duration||o.options.duration||140;
$.effects.save(el,_1b5);
el.show();
$.effects.createWrapper(el);
var ref=(_1b6=="up"||_1b6=="down")?"top":"left";
var _1ba=(_1b6=="up"||_1b6=="left")?"pos":"neg";
var _1bb={},_1bc={},_1bd={};
_1bb[ref]=(_1ba=="pos"?"-=":"+=")+_1b7;
_1bc[ref]=(_1ba=="pos"?"+=":"-=")+_1b7*2;
_1bd[ref]=(_1ba=="pos"?"-=":"+=")+_1b7*2;
el.animate(_1bb,_1b9,o.options.easing);
for(var i=1;i<_1b8;i++){
el.animate(_1bc,_1b9,o.options.easing).animate(_1bd,_1b9,o.options.easing);
}
el.animate(_1bc,_1b9,o.options.easing).animate(_1bb,_1b9/2,o.options.easing,function(){
$.effects.restore(el,_1b5);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
});
el.queue("fx",function(){
el.dequeue();
});
el.dequeue();
});
};
})(jQuery);
(function($,_1be){
$.effects.slide=function(o){
return this.queue(function(){
var el=$(this),_1bf=["position","top","bottom","left","right"];
var mode=$.effects.setMode(el,o.options.mode||"show");
var _1c0=o.options.direction||"left";
$.effects.save(el,_1bf);
el.show();
$.effects.createWrapper(el).css({overflow:"hidden"});
var ref=(_1c0=="up"||_1c0=="down")?"top":"left";
var _1c1=(_1c0=="up"||_1c0=="left")?"pos":"neg";
var _1c2=o.options.distance||(ref=="top"?el.outerHeight(true):el.outerWidth(true));
if(mode=="show"){
el.css(ref,_1c1=="pos"?(isNaN(_1c2)?"-"+_1c2:-_1c2):_1c2);
}
var _1c3={};
_1c3[ref]=(mode=="show"?(_1c1=="pos"?"+=":"-="):(_1c1=="pos"?"-=":"+="))+_1c2;
el.animate(_1c3,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){
if(mode=="hide"){
el.hide();
}
$.effects.restore(el,_1bf);
$.effects.removeWrapper(el);
if(o.callback){
o.callback.apply(this,arguments);
}
el.dequeue();
}});
});
};
})(jQuery);
(function($,_1c4){
$.effects.transfer=function(o){
return this.queue(function(){
var elem=$(this),_1c5=$(o.options.to),_1c6=_1c5.offset(),_1c7={top:_1c6.top,left:_1c6.left,height:_1c5.innerHeight(),width:_1c5.innerWidth()},_1c8=elem.offset(),_1c9=$("<div class=\"ui-effects-transfer\"></div>").appendTo(document.body).addClass(o.options.className).css({top:_1c8.top,left:_1c8.left,height:elem.innerHeight(),width:elem.innerWidth(),position:"absolute"}).animate(_1c7,o.duration,o.options.easing,function(){
_1c9.remove();
(o.callback&&o.callback.apply(elem[0],arguments));
elem.dequeue();
});
});
};
})(jQuery);
(function($,_1ca,_1cb){
var _1cc=/\+/g;
function raw(s){
return s;
};
function _1cd(s){
return decodeURIComponent(s.replace(_1cc," "));
};
var _1ce=$.cookie=function(key,_1cf,_1d0){
if(_1cf!==_1cb){
_1d0=$.extend({},_1ce.defaults,_1d0);
if(_1cf===null){
_1d0.expires=-1;
}
if(typeof _1d0.expires==="number"){
var days=_1d0.expires,t=_1d0.expires=new Date();
t.setDate(t.getDate()+days);
}
_1cf=_1ce.json?JSON.stringify(_1cf):String(_1cf);
return (_1ca.cookie=[encodeURIComponent(key),"=",_1ce.raw?_1cf:encodeURIComponent(_1cf),_1d0.expires?"; expires="+_1d0.expires.toUTCString():"",_1d0.path?"; path="+_1d0.path:"",_1d0.domain?"; domain="+_1d0.domain:"",_1d0.secure?"; secure":""].join(""));
}
var _1d1=_1ce.raw?raw:_1cd;
var _1d2=_1ca.cookie.split("; ");
for(var i=0,_1d3;(_1d3=_1d2[i]&&_1d2[i].split("="));i++){
if(_1d1(_1d3.shift())===key){
var _1d4=_1d1(_1d3.join("="));
return _1ce.json?JSON.parse(_1d4):_1d4;
}
}
return null;
};
_1ce.defaults={};
$.removeCookie=function(key,_1d5){
if($.cookie(key)!==null){
$.cookie(key,null,_1d5);
return true;
}
return false;
};
})(jQuery,document);
function tip_init(){
jQuery(".hptip").each(function(){
var url=jQuery(this).attr("data-tip");
if(jQuery(this).hasClass("mouseoverable")){
jQuery(this).hover(function(){
jQuery(this).data("sticky",1);
tip_show(url,this.id,this.name,true);
},function(){
jQuery(this).data("sticky",0);
var id=this.id;
setTimeout(function(){
tip_remove(id);
},800);
}).click(function(){
return false;
});
jQuery("#HPT").live("mouseover",function(){
var _1d6=jQuery(this).data("linkId");
if(_1d6){
jQuery("#"+_1d6).data("sticky",1);
}
}).live("mouseout",function(_1d7){
var hpts=jQuery(_1d7.relatedTarget).closest("#HPT");
if(hpts.size()==0){
var _1d8=jQuery(this).data("linkId");
if(_1d8){
jQuery("#"+_1d8).data("sticky",0);
}
setTimeout(function(){
tip_remove(_1d8);
},800);
}
});
}else{
if(this.tagName=="INPUT"){
jQuery(this).hover(function(){
tip_show(url,this.id,false,false);
},function(){
jQuery("#HPT").remove();
});
}else{
jQuery(this).hover(function(){
tip_show(url,this.id,this.name,false);
},function(){
jQuery("#HPT").remove();
}).click(function(){
return false;
});
}
}
});
};
function tip_remove(_1d9){
var _1da=jQuery("#HPT").data("linkId");
if(_1d9!=_1da){
return;
}
var _1db=jQuery("#"+_1d9).data("sticky");
if(!_1db){
jQuery("#HPT").remove();
}
};
function tip_show(url,_1dc,_1dd,_1de){
if(jQuery("#HPT").size()){
jQuery("#HPT").remove();
}
if(_1dd==false&&_1de){
_1dd="&nbsp;";
}
var de=document.documentElement;
var w=self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
var _1df=getElementWidth(_1dc);
var _1e0=w-getAbsoluteLeft(_1dc)-_1df;
var _1e1=getAbsoluteLeft(_1dc);
var _1e2=getAbsoluteTop(_1dc)-3;
var _1e3=url.replace(/^[^\?]+\??/,"");
var _1e4=parseQuery(_1e3);
if(_1e4["width"]===undefined){
_1e4["width"]=250;
}
if(_1e4["link"]!==undefined){
jQuery("#"+_1dc).bind("click",function(){
window.location=_1e4["link"];
});
jQuery("#"+_1dc).css("cursor","pointer");
}
var _1e5=_1de?" <a href='#' class='close' onclick='jQuery(\"#HPT\").remove(); return false;'>x</a>":"";
var _1e6=_1e4["css"]?" class='"+_1e4["css"]+"'":"";
var _1e7;
var _1e8=false;
if(_1e4["dir"]!==undefined){
_1e7=_1e4["dir"];
}else{
if(_1e0>(_1e4["width"]*1+11)){
_1e7="right";
}else{
if(_1e0+_1df*0.3>(_1e4["width"]*1+11)){
_1e7="right";
_1e8=true;
}else{
if(_1e1>(_1e4["width"]*1+11)){
_1e7="left";
}else{
_1e7="right";
_1e8=true;
}
}
}
}
var _1e9=_1e7=="left"?"right":"left";
var _1ea=_1dd?"<div id='HPT_close_"+_1e9+"'>"+_1dd+_1e5+"</div>":"";
var _1eb=_1e7=="left"?"style='left:"+((_1e4["width"]*1)+1)+"px"+"'":"";
jQuery("#container").append("<div id='HPT' style='width:"+_1e4["width"]*1+"px'"+_1e6+"><div id='HPT_arrow_"+_1e9+"' "+_1eb+"></div>"+_1ea+"<div id='HPT_copy'><div class='HPT_loader'><div></div></div>");
if(_1e7=="right"){
var _1eb=_1df+11;
if(_1e8){
var _1ec=getAbsoluteLeft(_1dc)+_1eb-_1df*0.3;
}else{
var _1ec=getAbsoluteLeft(_1dc)+_1eb;
}
}else{
var _1ec=getAbsoluteLeft(_1dc)-((_1e4["width"]*1)+15);
}
var _1ed=jQuery("#container").offset();
_1ec-=_1ed.left;
_1e2-=_1ed.top;
jQuery("#HPT").css({left:_1ec+"px",top:_1e2+"px"});
jQuery("#HPT").data("linkId",_1dc);
jQuery("#HPT").show();
jQuery("#HPT_copy").load(url);
};
function getElementWidth(_1ee){
x=document.getElementById(_1ee);
return x.offsetWidth;
};
function getAbsoluteLeft(_1ef){
o=document.getElementById(_1ef);
oLeft=o.offsetLeft;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oLeft+=oParent.offsetLeft;
o=oParent;
}
return oLeft;
};
function getAbsoluteTop(_1f0){
o=document.getElementById(_1f0);
oTop=o.offsetTop;
while(o.offsetParent!=null){
oParent=o.offsetParent;
oTop+=oParent.offsetTop;
o=oParent;
}
return oTop;
};
function parseQuery(_1f1){
var _1f2=new Object();
if(!_1f1){
return _1f2;
}
var _1f3=_1f1.split(/[;&]/);
for(var i=0;i<_1f3.length;i++){
var _1f4=_1f3[i].split("=");
if(!_1f4||_1f4.length!=2){
continue;
}
var key=unescape(_1f4[0]);
var val=unescape(_1f4[1]);
val=val.replace(/\+/g," ");
_1f2[key]=val;
}
return _1f2;
};
function blockEvents(evt){
if(evt.target){
evt.preventDefault();
}else{
evt.returnValue=false;
}
};
Object.extend(Hash.prototype,{remove:function(){
return this.unset(arguments);
}});
Form.Element.setValue=function(_1f5,_1f6){
element_id=_1f5;
_1f5=$(_1f5);
if(!_1f5){
_1f5=document.getElementsByName(element_id)[0];
}
if(!_1f5){
return false;
}
var _1f7=_1f5.tagName.toLowerCase();
var _1f8=Form.Element.SetSerializers[_1f7](_1f5,_1f6);
};
Form.Element.SetSerializers={input:function(_1f9,_1fa){
switch(_1f9.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.SetSerializers.textarea(_1f9,_1fa);
case "checkbox":
return Form.Element.SetSerializers.checkbox(_1f9,_1fa);
case "radio":
return Form.Element.SetSerializers.inputSelector(_1f9,_1fa);
}
return false;
},checkbox:function(_1fb,_1fc){
if(_1fc==0||_1fc==null||_1fc==""){
_1fb.checked=false;
}else{
_1fb.checked=true;
}
},inputSelector:function(_1fd,_1fe){
fields=document.getElementsByName(_1fd.name);
for(var i=0;i<fields.length;i++){
if(fields[i].value==_1fe){
fields[i].checked=true;
}
}
},textarea:function(_1ff,_200){
_1ff.value=_200;
},select:function(_201,_202){
var _203="",opt,_204=_201.selectedIndex;
for(var i=0;i<_201.options.length;i++){
if(_201.options[i].value==_202){
_201.selectedIndex=i;
return true;
}
}
}};
var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_205){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_205||{});
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
this.now=this.options.transition(Tpos)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(from,to){
if(this.timer!=null){
return;
}
this.from=from;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_206){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_206);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _207=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_207);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_208){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_208);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_209){
if(_209==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_209*100+")";
}
this.el.style.opacity=_209;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(pos){
return ((-Math.cos(pos*Math.PI)/2)+0.5);
};
fx.linear=function(pos){
return pos;
};
fx.cubic=function(pos){
return Math.pow(pos,3);
};
fx.circ=function(pos){
return Math.sqrt(pos);
};
fx.Scroll=Class.create();
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_20a){
this.setOptions(_20a);
},scrollTo:function(el){
var dest=Position.cumulativeOffset($(el))[1]-20;
var _20b=window.innerHeight||document.documentElement.clientHeight;
var full=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(dest+_20b>full){
this.custom(top,dest-_20b+(full-dest));
}else{
this.custom(top,dest);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_20c){
this.el=$(el);
this.setOptions(_20c);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_20d){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_20d||{});
},initialize:function(el,_20e){
this.el=$(el);
this.setOptions(_20e);
if(this.options.opacity){
this.o=new fx.Opacity(el,_20e);
_20e.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_20e);
_20e.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_20e);
}
},toggle:function(){
this.checkExec("toggle");
},hide:function(){
this.checkExec("hide");
},clearTimer:function(){
this.checkExec("clearTimer");
},checkExec:function(func){
if(this.o){
this.o[func]();
}
if(this.h){
this.h[func]();
}
if(this.w){
this.w[func]();
}
},resizeTo:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);
this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);
}
},customSize:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,hto);
this.w.custom(this.el.offsetWidth,wto);
}
}};
fx.Accordion=Class.create();
fx.Accordion.prototype={setOptions:function(_20f){
this.options={delay:100,opacity:false};
Object.extend(this.options,_20f||{});
},initialize:function(_210,_211,_212){
this.elements=_211;
this.setOptions(_212);
var _212=_212||"";
_211.each(function(el,i){
_212.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_212);
el.fx.hide();
});
_210.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_211[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_213){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_213){
this.clearAndToggle(el);
}
}.bind(this));
if(_213.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_213);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_214){
this.el=$(el);
this.days=365;
this.options=_214;
this.effect();
var _215=this.readCookie();
if(_215){
this.fx.now=_215;
this.fx.increase();
}
},setCookie:function(_216){
var date=new Date();
date.setTime(date.getTime()+(this.days*24*60*60*1000));
var _217="; expires="+date.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_216+_217+"; path=/";
},readCookie:function(){
var _218=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_218)==0){
return c.substring(_218.length,c.length);
}
}
return false;
},custom:function(from,to){
if(this.fx.now!=to){
this.setCookie(to);
this.fx.custom(from,to);
}
}};
fx.RememberHeight=Class.create();
fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Height(this.el,this.options);
this.prefix="height";
},toggle:function(){
if(this.el.offsetHeight==0){
this.setCookie(this.el.scrollHeight);
}else{
this.setCookie(0);
}
this.fx.toggle();
},resize:function(to){
this.setCookie(this.el.offsetHeight+to);
this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);
},hide:function(){
if(!this.readCookie()){
this.fx.hide();
}
}});
fx.RememberText=Class.create();
fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Text(this.el,this.options);
this.prefix="text";
}});
fx.expoIn=function(pos){
return Math.pow(2,10*(pos-1));
};
fx.expoOut=function(pos){
return (-Math.pow(2,-10*pos)+1);
};
fx.quadIn=function(pos){
return Math.pow(pos,2);
};
fx.quadOut=function(pos){
return -(pos)*(pos-2);
};
fx.circOut=function(pos){
return Math.sqrt(1-Math.pow(pos-1,2));
};
fx.circIn=function(pos){
return -(Math.sqrt(1-Math.pow(pos,2))-1);
};
fx.backIn=function(pos){
return (pos)*pos*((2.7)*pos-1.7);
};
fx.backOut=function(pos){
return ((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);
};
fx.sineOut=function(pos){
return Math.sin(pos*(Math.PI/2));
};
fx.sineIn=function(pos){
return -Math.cos(pos*(Math.PI/2))+1;
};
fx.sineInOut=function(pos){
return -(Math.cos(Math.PI*pos)-1)/2;
};
fx.Position=Class.create();
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_219){
this.el=$(el);
this.setOptions(_219);
this.now=[0,0];
},step:function(){
var time=(new Date).getTime();
if(time>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var Tpos=(time-this.startTime)/(this.options.duration);
var tmp=[];
tmp[0]=(this.options.transition(Tpos)*(this.to[0]-this.from[0])+this.from[0]);
tmp[1]=(this.options.transition(Tpos)*(this.to[1]-this.from[1])+this.from[1]);
this.now=tmp;
}
this.increase();
},increase:function(){
this.el.style["left"]=this.now[0]+"px";
this.el.style["top"]=this.now[1]+"px";
},move:function(from,to){
to=to?to:this.now;
this.custom(from,to);
}});
fx.Color=Class.create();
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_21a){
this.el=$(el);
this.setOptions(_21a);
this.now=0;
this.regex=new RegExp("#?(..?)(..?)(..?)");
if(!this.options.fromColor){
this.options.fromColor="#FFFFFF";
}
if(!this.options.toColor){
this.options.toColor="#FFFFFF";
}
if(!this.options.property){
this.props=new Array("backgroundColor");
}else{
this.props=this.options.property.split(",");
}
},increase:function(){
var hex="rgb("+(Math.round(this.cs[0]+(this.ce[0]-this.cs[0])*this.now))+","+(Math.round(this.cs[1]+(this.ce[1]-this.cs[1])*this.now))+","+(Math.round(this.cs[2]+(this.ce[2]-this.cs[2])*this.now))+")";
for(i=0;i<this.props.length;i++){
if(this.props[i]=="backgroundColor"){
this.el.style.backgroundColor=hex;
}else{
if(this.props[i]=="color"){
this.el.style.color=hex;
}else{
if(this.props[i]=="borderColor"){
this.el.style.borderColor=hex;
}
}
}
}
},toggle:function(){
this.cs=this.regex.exec(this.options.fromColor);
this.ce=this.regex.exec(this.options.toColor);
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
},cycle:function(){
this.toggle();
setTimeout(this.toggle.bind(this),this.options.duration+10);
},customColor:function(from,to){
this.cs=this.regex.exec(from);
this.ce=this.regex.exec(to);
for(i=1;i<this.cs.length;i++){
if(this.cs[i].length==1){
this.cs[i]+=this.cs[i];
}
if(this.ce[i].length==1){
this.ce[i]+=this.ce[i];
}
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
this.custom(0,1);
},customColorRGB:function(from,to){
this.rgb_regex=new RegExp("^rgb.([^,]*),s?([^,]*),s?([^)]*)");
this.cs=this.rgb_regex.exec(from);
this.ce=this.rgb_regex.exec(to);
if(!this.cs){
this.customColor(from,to);
return;
}
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i]);
this.ce[i-1]=parseInt(this.ce[i]);
}
this.custom(0,1);
}});
fx.Slide=Class.create();
Object.extend(Object.extend(fx.Slide.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
function toggleOverlay(id){
toggleOverlay.init(id);
toggleOverlay.toggleCurtain();
};
function overlayIsOpen(id){
toggleOverlay.init(id);
return toggleOverlay.curtain.style.display=="block";
};
toggleOverlay.init=function(id){
this.isIE6orBelow=false;
var _21b=navigator.userAgent.toLowerCase();
var _21c=_21b.indexOf("msie")+1;
if(_21c){
version=_21b.charAt(_21c+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_21b.indexOf("mobile")>-1;
this.overlay=$(id);
this.wrapper=this.getWrapper();
this.curtain=this.getCurtain();
this.wrapper.appendChild(this.overlay);
if(this.isIE6orBelow){
this.iframe=this.getIframe();
}
if(navigator.userAgent.indexOf("Linux")!=-1){
tempObjects=document.body.getElementsByTagName("object");
this.elementsToHide=[];
for(var i=0;i<tempObjects.length;i++){
if(!$(tempObjects[i]).descendantOf(this.overlay)){
this.elementsToHide.push(tempObjects[i]);
}
}
}
if(this.isMobile){
scroll(0,0);
}
};
toggleOverlay.toggleCurtain=function(id){
this.overlay.toggle();
if(this.curtain.style.display!="block"){
this.showCurtain();
}else{
this.hideCurtain();
}
};
toggleOverlay.showCurtain=function(){
this.setElementVisibility("hidden");
this.wrapper.style.display="block";
this.curtain.style.display="block";
if(this.isIE6orBelow){
this.iframe.style.display="block";
}
this.stretchCurtain();
jq(this.overlay).trigger("visible",true);
Event.observe(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.hideCurtain=function(){
this.setElementVisibility("visible");
this.curtain.style.display="none";
this.wrapper.style.display="none";
if(this.isIE6orBelow){
this.iframe.style.display="none";
}
jq(this.overlay).trigger("visible",false);
Event.stopObserving(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.setElementVisibility=function(_21d){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_21d;
}
}
};
toggleOverlay.getWrapper=function(){
var id="toggleOverlayWrapper";
var div=$(id);
if(div){
return div;
}
div=document.createElement("div");
div.id=id;
document.body.appendChild(div);
div.style.zIndex="1000";
if(this.isIE6orBelow){
div.style.position="absolute";
div.style.top=Position.getViewportScrollY()+"px";
Event.observe(window,"scroll",function(){
div.style.top=Position.getViewportScrollY()+"px";
});
}else{
div.style.position="fixed";
}
return div;
};
toggleOverlay.getCurtain=function(){
var id="toggleOverlayCurtain";
var _21e=$(id);
if(_21e){
return _21e;
}
_21e=document.createElement("div");
_21e.id=id;
this.wrapper.appendChild(_21e);
return _21e;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _21f=$(id);
if(_21f){
return _21f;
}
_21f=document.createElement("iframe");
_21f.id=id;
_21f.src="";
_21f.frameBorder="no";
_21f.scrolling="no";
document.body.appendChild(_21f);
return _21f;
};
toggleOverlay.stretchCurtain=function(){
height=jq(document).height();
toggleOverlay.wrapper.style.height=height+"px";
toggleOverlay.wrapper.style.width=document.body.scrollWidth+"px";
toggleOverlay.curtain.style.height=height+"px";
if(this.isIE6orBelow){
toggleOverlay.iframe.style.height=height+"px";
toggleOverlay.iframe.style.width=document.body.scrollWidth+"px";
}
if(this.isMobile||navigator.userAgent.indexOf("AppleWebKit/")>-1&&!document.evaluate){
wd=self["innerWidth"];
}else{
if(navigator.userAgent.indexOf("Opera")>-1&&parseFloat(window.opera.version())<9.5){
wd=document.body["clientWidth"];
}else{
wd=document.documentElement["clientWidth"];
}
}
left=wd/2-toggleOverlay.overlay.clientWidth/2+"px";
toggleOverlay.overlay.style.left=left;
};
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_220){
this.restore=_220;
this.mem=[];
this.pathMem=[];
return this.toJsonStringArray(arg).join("");
},toObject:function(x){
eval("this.myObj="+x);
if(!this.restoreCirculars||!alert){
return this.myObj;
}
this.restoreCode=[];
this.make(this.myObj,true);
var r=this.restoreCode.join(";")+";";
eval("r=r.replace(/\\W([0-9]{1,})(\\W)/g,\"[$1]$2\").replace(/\\.\\;/g,\";\")");
eval(r);
return this.myObj;
},toJsonStringArray:function(arg,out){
if(!out){
this.path=[];
}
out=out||[];
var u;
switch(typeof arg){
case "object":
this.lastObj=arg;
if(this.detectCirculars){
var m=this.mem;
var n=this.pathMem;
for(var i=0;i<m.length;i++){
if(arg===m[i]){
out.push("\"JSONcircRef:"+n[i]+"\"");
return out;
}
}
m.push(arg);
n.push(this.path.join("."));
}
if(arg){
if(arg.constructor==Array){
out.push("[");
for(var i=0;i<arg.length;++i){
this.path.push(i);
if(i>0){
out.push(",\n");
}
this.toJsonStringArray(arg[i],out);
this.path.pop();
}
out.push("]");
return out;
}else{
if(typeof arg.toString!="undefined"){
out.push("{");
var _221=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var curr=out.length;
if(!_221){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(curr,out.length-curr);
}else{
_221=false;
}
this.path.pop();
}
out.push("}");
return out;
}
}
return out;
}
out.push("null");
return out;
case "unknown":
case "undefined":
case "function":
out.push(this.includeFunctions?arg:u);
return out;
case "string":
if(this.restore&&arg.indexOf("JSONcircRef:")==0){
this.restoreCode.push("this.myObj."+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
}
out.push("\"");
var a=["\\","\\\\","\n","\\n","\r","\\r","\"","\\\""];
arg+="";
for(var i=0;i<8;i+=2){
arg=arg.split(a[i]).join(a[i+1]);
}
out.push(arg);
out.push("\"");
return out;
default:
out.push(String(arg));
return out;
}
}};
if(!window.console){
window.console={};
}
if(!window.console.log){
window.console.log=function(){
};
}
jq(document).ajaxError(function(e,_222,_223,_224){
if(_222.getAllResponseHeaders()){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
jq.post("/xml/reporterror.php",{status:_222.status,response:_222.responseText,url:_223.url});
}
});
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
return;
var _225=req.getAllResponseHeaders();
jq.post("/xml/reporterror.php",{headers:_225,error:1});
};
var insideHubEditor=false;
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},prototypeAvailable:function(){
return "undefined"!=typeof (Ajax)&&"undefined"!=typeof (Ajax.activeRequestCount);
},onComplete:function(){
if(0==jq.active&&(!this.prototypeAvailable()||0==Ajax.activeRequestCount)){
this.flag(false);
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
setTimeout(function(){
myGlobalHandlers.showIcon();
},2000);
}else{
var _226=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_226.hide();
}
},showIcon:function(id){
if(jq.active>0||(this.prototypeAvailable()&&Ajax.activeRequestCount>0)){
var _227=insideHubEditor?jq("#ajaxing_big"):jq("#ajaxing");
_227.css("display","inline");
}
},onReady:function(){
jq(document).ready(function(){
var _228=jq("body").get(0);
var _229=(typeof (_228.contentEditable)!="undefined");
var _22a=(window.screen.width>1000||window.screen.height>1000);
if(_229&&_22a){
var _22b=new Date();
_22b.setDate(_22b.getDate()+30);
var sep=(document.cookie.length>0)?";":"";
document.cookie="istablet=likely; expires="+_22b.toUTCString()+"; path=/";
}
});
}};
jq(document).ajaxStart(function(){
myGlobalHandlers.onCreate();
});
jq(document).ajaxStop(function(){
myGlobalHandlers.onComplete();
});
var detect=navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if(checkIt("konqueror")){
browser="Konqueror";
OS="Linux";
}else{
if(checkIt("safari")){
browser="Safari";
}else{
if(checkIt("opera")){
browser="Opera";
}else{
if(checkIt("msie")){
browser="IE";
}else{
if(!checkIt("compatible")){
browser="Netscape Navigator";
version=detect.charAt(8);
}else{
browser="An unknown browser";
}
}
}
}
}
if(!version){
var idx=place+thestring.length;
version="";
do{
var c=detect.charAt(idx);
if(c!=" "&&c!="."){
version=version+c;
}
}while(idx++<detect.length&&c!=" "&&c!=".");
}
if(!OS){
if(checkIt("linux")){
OS="Linux";
}else{
if(checkIt("x11")){
OS="Unix";
}else{
if(checkIt("mac")){
OS="Mac";
}else{
if(checkIt("win")){
OS="Windows";
}else{
OS="an unknown operating system";
}
}
}
}
}
function checkIt(_22c){
place=detect.indexOf(_22c)+1;
thestring=_22c;
return place;
};
function ssToId(id,_22d){
var _22d=_22d||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_22d);
return false;
};
function ssOnload(){
var _22e=location.hash.slice(1);
if(_22e=="comments"){
ssToId("comFirst");
}else{
if(_22e.substr(0,8)=="comment-"){
ssToId("comment"+_22e.substr(8));
}else{
if(_22e.substr(0,5)=="slide"){
var _22f=_22e.replace("slide","");
var _230=jQuery(".image_module_thumb[id*=\""+_22f+"\"]");
if(_230.length>0){
_230.click();
_230.parents(".moduleImage").find(".slide_display img:visible").click();
}else{
jQuery("#img_url_"+_22f+" img").click();
}
}else{
if("rate"==_22e){
}else{
if(_22e!=null&&_22e){
ssToId(_22e);
}
}
}
}
}
};
function fetchRecaptcha(_231){
var _232="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _233=document.getElementsByTagName("head")[0];
var _234=document.createElement("script");
_234.type="text/javascript";
_234.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_234.onload=function(){
Recaptcha.create(_232,_231,{theme:"red"});
};
_234.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_232,_231,{theme:"red"});
}
};
_233.appendChild(_234);
}else{
Recaptcha.create(_232,_231,{theme:"red"});
}
};
function check_signed_in_ajax(_235,_236){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_237,_238){
_235(eval(_237.responseText),_236);
}});
};
function whenSignedIn(_239,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_239,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_23a,info){
if(_23a){
info.fn.apply(null,info.args);
}else{
var url;
if("undefined"!=typeof (info.options.utm_source)){
url="/xml/signinupform.php?utm_source="+info.options.utm_source;
}else{
url="/xml/signinupform.php";
}
showFancyAjaxOverlay(url,info.options,"",{width:380,height:300,innerColor:"#e4e7e0",onComplete:function(){
var _23b="undefined"==typeof (info.options.captchaId)?"captcha_div":info.options.captchaId;
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha(_23b);
}
jq("#signInOverlay").bind("success",function(){
hideFancyOverlay();
info.fn.apply(null,info.args);
jq(this).unbind("success");
});
}});
}
return false;
};
function insertVideo(type,key,css,_23c,_23d,_23e){
var _23f="<div class=\"video\">";
var mode="opaque";
if(_23d){
mode="transparent";
}
if(_23e=="bad"){
_23f="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(type=="Google"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="YouTube"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Revver"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+mode+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(type=="Metacafe"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Yahoo"){
_23f+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+mode+"\"></embed></object>";
}else{
if(type=="YahooSports"){
_23f+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+mode+"\" />";
}else{
if(type=="Vimeo"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="BlipTV"){
_23f+="<embed style=\""+_23c+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+mode+"\">"+"</embed>";
}else{
if(type=="Unknown"){
_23f+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_23f+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_23f+="</div>";
if(_23d){
jq("#"+_23d).html(_23f);
}else{
if(type!="New"){
document.write(_23f);
}
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_240){
if(_240===undefined){
_240=false;
}
if(_240){
var _241=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_241){
return false;
}
}
jq.post("/xml/hubfeedshare.php",{url:url},function(rsp){
eval(rsp);
if(success){
jq("#share_with_followers").html("Hub shared!");
}else{
jq("#share_with_followers").html("Sorry, something went wrong!");
}
});
};
function praiseHub(id,val,_242){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,style:_242?_242:0},function(){
jq("#praise_feedback").html("Saved. Thanks!");
});
return false;
};
function recArt(id,val){
jq("#rec_"+id).load("/xml/feedback.php",{a:id,v:val});
return false;
};
function hubFeedback(id,val,done){
jq.post("/xml/feedback.php",{a:id,v:val},done);
return false;
};
function answerFeedback(_243,val,done){
jq.post("/xml/answervote.php",{id:_243,vote:val},done);
return false;
};
function toggleShareIt(id,flg,_244){
if(_244===undefined){
_244=false;
}
if(flg){
jq("#share_tgt").load("/xml/shareit.php",{art_id:id,show_warn:_244});
}else{
jq("#share_tgt").html("");
}
return false;
};
function extractParamFromUri(uri,_245){
if(!uri){
return;
}
var _246=new RegExp("[\\?&#]"+_245+"=([^&#]*)");
var _247=_246.exec(uri);
if(_247!=null){
return unescape(_247[1]);
}
return;
};
function displaySocialButtons(_248){
if("IE"==browser&&version<=7){
return false;
}
_248=_248||{};
var _249=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_248["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(data,_24a){
FB.init({xfbml:true});
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_24b){
_gaq.push(["t2._trackSocial","facebook","like",_24b]);
});
FB.Event.subscribe("edge.remove",function(_24c){
_gaq.push(["t2._trackSocial","facebook","unlike",_24c]);
});
FB.Event.subscribe("message.send",function(_24d){
_gaq.push(["t2._trackSocial","facebook","send",_24d]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show().trigger("display");
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show().trigger("display");
});
}
if(!_248["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(data,_24e){
twttr.events.bind("tweet",function(_24f){
if(_24f){
var _250;
if(_24f.target&&_24f.target.nodeName=="IFRAME"){
_250=extractParamFromUri(_24f.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_250]);
}
});
});
}
if(!_248["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_248["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_249;
};
function showLinkArticle(url,_251){
if(window.location.hash){
url+=window.location.hash;
}
var data={page_url:url,page_title:_251};
showFancyAjaxOverlay("/xml/linkarticle.php",data,"linkarticle");
return false;
};
function showFlag(id,from){
var url;
switch(from){
case "hub":
url="/xml/flaghub.php?a="+id;
break;
case "request":
url="/xml/flagrequest.php?r="+id;
break;
case "profile":
url="/xml/flagprofile.php?u="+id;
break;
}
jq("#flag_box_"+id+" .flag_button").toggleClass("open");
if(jq("#flag_box_"+id+" .flag_content").length>0){
jq("#flag_box_"+id+" .flag_content").toggle();
}else{
jq.get(url,function(data){
jq("#flag_box_"+id+".flag_button_box").append(data);
});
jq(document).mouseup(function(e){
if(jq("#flag_box_"+id+" .flag_button").hasClass("open")){
if(jq("#flag_box_"+id+".flag_button_box").has(e.target).length===0){
jq("#flag_box_"+id+" .flag_button").toggleClass("open");
jq("#flag_box_"+id+" .flag_content").toggle();
}
}
});
}
return false;
};
function showFlagHub(id){
showFlag(id,"hub");
return false;
};
function hideFlagHub(id){
jq(".flag_button").removeClass("open");
jq("#flag_box_"+id+".flag_button_box").html("<span class=\"flag_thanks\">Ok, we're on it. Thanks!</span>");
};
function showFancyAjaxOverlay(url,data,_252,_253){
if(!_253){
var _253={};
}
jq.post(url,data,function(html){
jq("#fancybox-wrap").attr("class","");
var _254=jq.extend({content:html,onComplete:function(){
if(_252){
jq("#fancybox-wrap").addClass(_252);
}
},autoDimensions:false,width:610,height:500,padding:0},_253);
jq.fancybox(_254);
});
};
function showFancyOverlay(html,_255){
if(!_255){
var _255={};
}
var _256=jq.extend({content:html},_255);
jq.fancybox(_256);
return false;
};
function hideFancyOverlay(){
jq.fancybox.close();
return false;
};
function follow(_257,_258,_259,_25a,_25b){
var _25c=jq(this);
var data={typeId:_257,objectId:_258,isActive:_259,printNumbers:_25a,overrides:_25b};
var ajax=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:data,success:function(data){
if(data=="Not signed in"){
var url="/signin?explain=";
switch(_257){
case 1:
url+=escape("follow answers to this question");
break;
case 2:
url+=escape("follow comments to this Hub");
break;
case 3:
url+=escape("follow users");
break;
case 4:
url+=escape("follow categories");
break;
case 5:
case 6:
url+=escape("follow posts in this forum thread");
break;
}
url+="&url=";
url+=encodeURI(document.URL);
document.location.href=url;
}else{
if(data=="same"){
alert("You may not follow yourself");
}else{
switch(_257){
case 1:
jQuery(".follow_question_"+_258).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_258).replaceWith(data);
break;
case 3:
var json=JSONstring.toObject(data),_25d=jQuery(".follow_"+_258);
_25d.replaceWith(json.buttonText);
if(json.fanMail){
jQuery.fancybox(json.fanMail,{"autoDimensions":false,"height":400,onClosed:function(){
if(_25c.hasClass("close_after")){
jq(window).trigger("suggestion_followed",[jQuery("#follow_"+_258)]);
}
}});
}
break;
case 4:
jQuery(".follow_"+_258).replaceWith(data);
break;
case 5:
case 6:
jQuery("#follow_"+_258).replaceWith(data);
break;
}
}
}
}});
};
function updateFollowButtons(){
var _25e=jq("span[id^=follow_], span[class^=follow_]"),_25f=jQuery.map(_25e,function(span,i){
if(jq(span).find("a").text().toUpperCase()=="LOADING..."){
var _260=jq(span),_261=parseInt(_260.data("typeId")),_262=_260.data("objectId"),_263=true,_264=_260.data("overrides");
return {typeId:_261,objectId:_262,overrides:_264,printNumbers:_263};
}else{
}
});
if(_25f.length>0){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",dataType:"json",data:{itemsToPaint:_25f},success:function(data){
jq.each(data,function(){
var item=this;
switch(item.typeId){
case 1:
jQuery("span.follow_question_"+item.objectId).replaceWith(item.content);
break;
case 2:
jQuery("span.follow_article_"+item.objectId).html(item.content);
break;
case 3:
var json=JSONstring.toObject(item.content);
jQuery("span#follow_"+item.objectId).replaceWith(json.buttonText);
break;
case 4:
jQuery("span.follow_"+item.objectId).replaceWith(item.content);
break;
case 5:
jQuery("span#follow_"+item.objectId).replaceWith(item.content);
break;
case 6:
jQuery("span#follow_"+item.objectId).replaceWith(item.content);
break;
}
});
}});
}
};
function updateFollowButton(_265,_266,_267,_268){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_265,objectId:_266,printNumbers:_267,overrides:_268},success:function(data){
switch(_265){
case 1:
jQuery(".follow_question_"+_266).replaceWith(data);
break;
case 2:
jQuery(".follow_article_"+_266).html(data);
break;
case 3:
var json=JSONstring.toObject(data);
jQuery("#follow_"+_266).replaceWith(json.buttonText);
break;
case 4:
jQuery(".follow_"+_266).replaceWith(data);
break;
case 5:
jQuery("#follow_"+_266).replaceWith(data);
break;
case 6:
jQuery("#follow_"+_266).replaceWith(data);
break;
}
}});
};
function expandComments(id,mm,flg){
if(flg){
jQuery("#comment_tgt").load("/xml/comments.php",{"mdc_id":id,"modMode":mm});
}else{
jQuery("#comment_tgt").html="";
}
return false;
};
function deleteComment(_269,_26a){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_26a).serialize(),success:function(resp){
toggleCommentEdit(_269,false);
jq("#ctext_"+_269).html(resp);
jq("#cedit_"+_269).remove();
}});
return false;
};
function toggleCommentEdit(_26b,_26c){
if(_26c){
jq("#cedit_"+_26b).hide();
jq("#cbox_"+_26b).show();
jq("#ctext_"+_26b).hide();
}else{
jq("#cedit_"+_26b).show();
jq("#cbox_"+_26b).hide();
jq("#ctext_"+_26b).show();
}
};
(function($){
$.fn.sampleDuration=function(_26d){
var _26e=new Date();
return $(this).bind("beforeunload",function(){
var _26f=new Date();
$.post("/xml/duration",{art_id:_26d,dur:_26f-_26e});
});
};
})(jQuery);
function setupNavMenu(){
jq(document).ready(function(){
var _270=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_270=="touchstart"){
jq("#header_explore").bind(_270+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_270+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_270+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("#header_wrap").bind(_270+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_270+".nav",function(_271){
_271.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_272){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_273){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_274){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_275){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_276){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_277){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_278){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_279){
nav_hide_all_menus();
});
jq("html").bind("click",function(_27a){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_27b){
_27b.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function showImageFromThumb(){
var id=jq(this).attr("id");
var _27c=id.replace("t_","slide_img_");
var _27d=jq("#"+_27c);
_27d.parent().parent().children(":visible").hide();
_27d.parent().show();
};
function initThumbnailImages(){
jq(".image_module_thumb").click(showImageFromThumb);
};
function initHub(_27e){
initThumbnailImages();
relatedHubStats.trackedclass=".tracked_link";
relatedHubStats.initEventHandlers();
initTurboHubShare();
initTurboVoting(_27e);
initCommentPlaceholderText();
};
function collectRating(_27f,_280,_281,freq,_282){
var _283=location.hash.slice(1);
var _284="rate"==_283;
if(!_284&&jq.cookie("rating")){
return false;
}
if(_284||Math.random()<freq){
var d=new Date();
var _285=d.getTime();
var ref=document.referrer;
if(!_284&&!ref){
return false;
}
setTimeout(function(){
jq.post("/xml/article/rate.php",{rf:ref},function(_286){
if(_286||_284){
jq.cookie("rating","1",{expires:30,path:"/",domain:_281});
jq("#rate_hub").hubrating({toggleExplanations:false,onsubmit:function(_287){
var _288=new Date();
var _289=_288.getTime()-_285;
jq.post("/xml/feedback.php",{a:_27f,s:_287.substance,o:_287.organization,m:_287.mechanics,q:_287.quality,version:_282,rf:ref,d:_289},function(){
jq("#rating_submission, #hop_explain").remove();
jq("#rate_hub .head_one").text("Thanks for your help!").after("<p>Your opinion will help us to improve HubPages.</p>");
setTimeout(function(){
jq("#close_hub_rating").click();
},3000);
});
},detailedExplanations:false,showExplanations:0==_282,singleSlider:_282>0,ratingMissingMessage:_282>0?"Please rate this article. Thanks!":"Please rate this article on all three scales. Thanks!"});
var d2=new Date();
setTimeout(function(){
jq("#rate_hub").slideDown(1000);
},Math.max(1,_280-(d2.getTime()-_285)));
}
},"json");
},3000);
}
};
function initCommentPlaceholderText(){
jq(".moduleComment textarea").data("placeholder","Add Your Comment...");
jq(".moduleComment .text_input").data("placeholder","Your Name").val("");
jq(".moduleComment textarea, .moduleComment .text_input").focus(function(){
var ph=jq(this).data("placeholder");
if(ph&&ph==jq(this).val()&&jq(this).hasClass("placeholder")){
jq(this).val("").removeClass("placeholder");
}
}).blur(function(){
var ph=jq(this).data("placeholder");
if(ph&&""==jq(this).val()){
jq(this).addClass("placeholder").val(ph);
}
}).blur();
};
function initQATurboVoting(_28a){
jq("#answer_vote_"+_28a+" .answer_vote_up").click(function(){
answerFeedback(_28a,1,function(){
jq("#answer_vote_"+_28a+" .answer_vote_up").addClass("answer_voted_up");
jq("#answer_vote_"+_28a+" .answer_vote_down").addClass("answer_down_disabled");
jq("#answer_vote_"+_28a+" .answer_vote_up").removeClass("answer_up_disabled");
jq("#answer_vote_"+_28a+" .answer_vote_down").removeClass("answer_voted_down");
showQAVoteThanks(_28a);
});
return false;
});
jq("#answer_vote_"+_28a+" .answer_vote_down").click(function(){
answerFeedback(_28a,0,function(){
jq("#answer_vote_"+_28a+" .answer_vote_up").addClass("answer_up_disabled");
jq("#answer_vote_"+_28a+" .answer_vote_down").addClass("answer_voted_down");
jq("#answer_vote_"+_28a+" .answer_vote_up").removeClass("answer_voted_up");
jq("#answer_vote_"+_28a+" .answer_vote_down").removeClass("answer_down_disabled");
showQAVoteThanks(_28a);
});
return false;
});
jq("#answer_vote_"+_28a).mouseenter(function(){
jq(this).data("active",true);
setTimeout(showQAVoteBubble(_28a),1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideQAVoteBubble(_28a),500);
});
};
function showQAVoteThanks(_28b){
jq("#vote_bubble_"+_28b+" p").text("Thank you for ensuring top quality content on HubPages.");
};
function showQAVoteBubble(_28c){
var av=jq("#answer_vote_"+_28c);
if(av.data("active")){
jq("#vote_bubble_"+_28c).fadeIn(600);
}
};
function hideQAVoteBubble(_28d){
var vb=jq("#vote_bubble_"+_28d);
var d=new Date();
var _28e=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#answer_vote_"+_28d).data("active")&&!_28e){
vb.fadeOut(600);
}
};
function initTurboVoting(_28f){
var _290=jq("#vote_bubble");
jq("#hub_vote .hub_vote_up").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_28f,1,function(){
jq("#hub_vote .hub_vote_up").addClass("hub_voted_up");
jq("#hub_vote .hub_vote_down").addClass("hub_down_disabled");
showVoteThanks();
});
return false;
});
jq("#hub_vote .hub_vote_down").click(function(){
if(jq("#hub_vote").data("voted")){
return false;
}
jq("#hub_vote").data("voted",true);
hubFeedback(_28f,0,function(){
jq("#hub_vote .hub_vote_up").addClass("hub_up_disabled");
jq("#hub_vote .hub_vote_down").addClass("hub_voted_down");
showVoteThanks();
});
return false;
});
jq("#hub_vote").mouseenter(function(){
jq(this).data("active",true);
setTimeout(showVoteBubble,1500);
}).mouseleave(function(){
jq(this).data("active",false);
setTimeout(hideVoteBubble,500);
});
};
function showVoteThanks(){
jq("#vote_bubble p").text("Thank you for ensuring top quality content on HubPages.");
var d=new Date();
jq("#vote_bubble").data("thanks",d.getTime()).not(":visible").fadeIn(600);
setTimeout(hideVoteBubble,3500);
};
function showVoteBubble(){
var hv=jq("#hub_vote");
if(hv.data("active")){
jq("#vote_bubble").fadeIn(600);
}
};
function hideVoteBubble(){
var vb=jq("#vote_bubble");
var d=new Date();
var _291=vb.data("thanks")&&d.getTime()<vb.data("thanks")+3000;
if(!jq("#hub_vote").data("active")&&!_291){
vb.fadeOut(600);
}
};
function initTurboHubShare(){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(socialWidgetUpdate).resize(socialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
setTimeout(function(){
socialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_hub_social").css("visibility","visible");
}else{
jq("#share_hub_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
if(!jq("#share_hub_social .fb_share_wrap span").width()){
jq("#share_hub_social .fb_share_wrap span, #share_hub_social .fb_share_wrap iframe:first").css({width:"100px",height:"23px"});
}
},2000);
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
},3000);
};
function socialWidgetUpdate(){
var _292=20;
var pos=jq(this).scrollTop();
var _293=jq("#share_hub");
var _294=jq("#hub_container");
var _295=0;
var _296=jq(".moduleHostedVideo");
if(_296.size()){
_295=_296.first().position().top+_296.first().outerHeight();
}
var _297=_294.height()-_293.outerHeight();
var _298=_294.offset();
if(_298.top+_295-pos<_292){
if(pos>_298.top+_297){
_293.css({position:"absolute",top:_297+"px",right:"-15px",left:"auto"});
}else{
_293.css({position:"fixed",top:_292+"px",left:(538+_298.left)+"px",right:"auto"});
}
}else{
_293.css({position:"absolute",top:_295+"px",right:"-15px",left:"auto"});
}
};
function initTurboQAShare(){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(qaSocialWidgetUpdate).resize(qaSocialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
setTimeout(function(){
qaSocialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_qa_social").css("visibility","visible");
}else{
jq("#share_qa_social").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
if(!jq("#share_qa_social .fb_share_wrap span").width()){
jq("#share_qa_social .fb_share_wrap span, #share_qa_social .fb_share_wrap iframe:first").css({width:"100px",height:"23px"});
}
},2000);
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
},3000);
};
function qaSocialWidgetUpdate(){
var _299=20;
var pos=jq(this).scrollTop();
var _29a=jq("#share_qa");
var _29b=jq("#answers");
var _29c=0;
var _29d=jq(".moduleHostedVideo");
if(_29d.size()){
_29c=_29d.first().position().top+_29d.first().outerHeight();
}
var _29e=_29b.height()-_29a.outerHeight();
var _29f=_29b.offset();
if(_29f.top+_29c-pos<_299){
if(pos>_29f.top+_29e){
_29a.css({position:"absolute",top:_29e+"px",left:"auto"});
}else{
_29a.css({position:"fixed",top:_299+"px",left:(520+_29f.left)+"px",right:"auto"});
}
}else{
_29a.css({position:"absolute",top:_29c+"px",left:"auto"});
}
};
function google_ad_request_done(_2a0){
var s="";
var i;
if(_2a0.length==0){
return;
}
if(_2a0[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_2a0[0].image_width+"\" HEIGHT=\""+_2a0[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_2a0[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_2a0[0].image_url+"\" WIDTH=\""+_2a0[0].image_width+"\" HEIGHT=\""+_2a0[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_2a0[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_2a0[0].url+"\" target=\"_top\" title=\"go to "+_2a0[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_2a0[0].visible_url+"';return true\"><img border=\"0\" src=\""+_2a0[0].image_url+"\"width=\""+_2a0[0].image_width+"\"height=\""+_2a0[0].image_height+"\"></a>";
}else{
if(_2a0[0].type=="html"){
s+=_2a0[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a>";
for(i=0;i<_2a0.length;++i){
ad=_2a0[i];
s+="<div class=\"cjs_ad cjs_ad_"+i+"\">";
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
s+="</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hubAnchorUpdate(){
var _2a1=jq.address.value().substr(1);
if(""==_2a1){
return;
}
var _2a2=false;
if(_2a1.substr(0,8)=="comment-"){
_2a2=true;
_2a1="comment"+_2a1.substr(8);
}
if("morecomments"==_2a1||_2a2){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_2a1){
ssToId("comFirst");
}else{
if("morecomments"==_2a1){
}else{
if("rate"==_2a1){
}else{
ssToId(_2a1);
}
}
}
};
function loadRatingSystem(_2a3,_2a4,_2a5,_2a6){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_2a3,params:{id:_2a6},ratingClass:"rating"});
};
function initAutoComplete(_2a7,_2a8){
var _2a9="";
var _2aa="++none++";
var _2ab=false;
var _2ac=false;
var _2ad=false;
var _2ae="#the_auto_comp_box";
var _2af="#search_form";
var _2b0="#search_input";
var _2b1=".search_submit";
var _2b2="search_form";
var _2b3="/xml/getautocompletestrings.php";
var _2b4="";
var _2b5=0;
var _2b6=null;
var _2b7=null;
var _2b8=null;
var _2b9=null;
var _2ba=null;
var _2bb=false;
if(_2a8){
_2ae=_2a8.boxid;
_2af=_2a8.container;
_2b0=_2a8.input;
_2b1=_2a8.submit;
if(_2a8.ajaxtarget!=undefined){
_2b3=_2a8.ajaxtarget;
}
if(_2a8.querystring!=undefined){
_2b4="&"+_2a8.querystring;
}
if(_2a8.filter!=undefined){
_2b6=_2a8.filter;
}
if(_2a8.callback!=undefined){
_2b7=_2a8.callback;
}
if(_2a8.keyboardelem!=undefined){
_2b9=_2a8.keyboardelem;
}
if(_2a8.targoutput!=undefined){
_2b8=_2a8.targoutput;
}
if(_2a8.keyuptarget!=undefined){
_2ba=_2a8.keyuptarget;
}
if(_2a8.showprogress!=undefined){
_2bb=_2a8.showprogress;
}
}
if(!_2b9){
_2b9=_2b0;
}
if(!_2b8){
_2b8=_2b0;
}
if(!_2ba){
_2ba=_2b9;
}
jq(document).ready(function(){
if(!_2ab){
_2ab=true;
jq("<div id=\""+_2ae.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_2b9);
if(_2bb){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_2ae);
jq("#auto_comp_close").bind("click",function(){
jq(_2ae).hide();
jq("#auto_comp_close").hide();
});
}
jq(_2ae).hide();
if(!_2bb){
jq(_2ae).bind("focusin",function(){
_2ac=true;
});
jq(_2ae).bind("focusout",function(){
_2ac=false;
});
jq(_2af).bind("focusin",function(){
_2ad=true;
});
jq(_2af).bind("focusout",function(){
_2ad=false;
setTimeout(function(){
if(!_2ac&&!_2ad){
jq(_2ae).hide();
jq("#auto_comp_close").hide();
_2b4=_2b4.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_2af).attr("autocomplete","off");
jq(_2b9).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_2b5=0;
jq(_2ae+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_2ba).bind("keyup",function(){
var _2bc=jq(_2b0).attr("value");
if(_2b0!=_2b9){
if(_2a9!=_2bc){
_2b4=_2b4.replace(/start=[0123456789]+/,"");
_2b4=_2b4.replace(/&&/,"&");
}
_2a9="";
_2aa="++none++";
}
var _2bd;
if(_2a8){
_2bd="hubs";
}else{
_2bd=jq(".search_type option:selected").val();
if(_2bd==undefined){
_2bd="site";
}
}
if(jq.trim(_2bc).length==0){
jq(_2ae).hide();
jq("#auto_comp_close").hide();
}
if(jq.trim(_2bc).length>0&&_2a9!=_2bc){
_2a9=_2bc;
if(_2bc.indexOf(_2aa)==0){
jq(_2ae+" > .auto_comp_row").each(function(){
var _2be=jq(this).text();
if(_2b6){
_2be=_2b6(_2be);
}
if(_2be.indexOf(_2bc)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_2aa="++none++";
jq(_2ae+" > .auto_comp_row").remove();
var _2bf="?";
if(_2bb){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_2ae);
jq(_2ae).show();
_2bf="?s="+escape(_2bc)+"&";
}
var _2c0=jq(_2af).serialize();
var _2c1=/(^|&)s=/;
if(!_2c0.match(_2c1)&&!_2b4.match(_2c1)&&!_2bf.match(_2c1)){
_2c0+="&s="+_2bc;
}
jq.get(_2b3+_2bf+"t="+escape(_2bd)+_2b4,_2c0,function(data){
jq(_2ae+" div[id=auto_comp_error]").remove();
jq(_2ae+" div[id=auto_comp_progress]").remove();
_2b4=_2b4.replace(/start=[0123456789]+/,"");
_2b4=_2b4.replace(/&&/,"&");
var _2c2=jq(data).find("div").length;
var _2c3=false;
if(_2c2==0){
return true;
}
var _2c4=jq(_2b0).val();
if(_2c4!=_2bc){
return true;
}
if(_2c2<_2a7){
_2aa=_2bc;
}else{
_2aa="++none++";
}
jq(_2ae).show();
jq(_2b9).focus();
var _2c5=jq(_2b9).position();
var _2c6=jq(_2b9).outerHeight(true);
jq(_2ae).position(_2c5.top+_2c6,_2c5.left+5);
jq(data).find("div").appendTo(_2ae);
jq(_2ae+" > .auto_comp_row").bind("click",function(){
var _2c7=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_2c7=true;
var _2c8=href.substr(8);
_2b4+="&start="+_2c8;
_2b4=_2b4.replace(/&&/,"&");
}
});
if(_2c7){
if(!_2c3){
setTimeout(function(){
jq(_2ba).trigger("keyup");
},200);
_2ac=false;
_2c3=true;
}
return (false);
}
var _2c9=jq(this).text();
if(_2b6){
_2c9=_2b6(_2c9);
}
jq(_2b8).attr("value",_2c9);
if(document.forms[_2b2]){
document.forms[_2b2].submit();
}else{
if(_2b1){
jq(_2b1).trigger("click");
}
}
return (false);
});
jq(_2ae+" > .auto_comp_row").bind("keypress",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 13:
jq(this).trigger("click");
return (false);
break;
}
return (true);
});
jq(_2ae+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_2ae+" > .auto_comp_row:visible:eq("+_2b5+") > a").length){
return (false);
}
++_2b5;
jq(_2ae+" > .auto_comp_row:visible:eq("+_2b5+") > a").trigger("focus");
return (false);
break;
case 38:
--_2b5;
if(_2b5<0){
jq(_2b9).trigger("focus");
}else{
jq(_2ae+" > .auto_comp_row:visible:eq("+_2b5+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_2b7){
_2b7();
}
},"html");
}
});
}
});
};
function updateNumCharCount(_2ca,_2cb,_2cc){
if(jq("#"+_2cb).hasClass("dimmed")){
jq("#"+_2cc).html(_2ca);
}else{
if(jq("#"+_2cb).val().length>_2ca){
jq("#"+_2cb).value=jq("#"+_2cb).val().substring(0,_2ca);
}
jq("#"+_2cc).html(_2ca-jq("#"+_2cb).val().length);
}
};
function checkCharCount(_2cd,_2ce,_2cf){
updateNumCharCount(_2cd,_2ce,_2cf);
jQuery("#"+_2ce).bind("click keyup keydown",function(){
updateNumCharCount(_2cd,_2ce,_2cf);
});
jQuery("#"+_2ce).bind("keypress",function(evt){
updateNumCharCount(_2cd,_2ce,_2cf);
var code=(evt.keyCode?evt.keyCode:evt.which);
if(code!=8&&code!=37&&code!=38&&code!=39&&code!=40&&(browser=="Opera"||code!=46)){
if(jQuery(this).val().length>=_2cd){
evt.stopPropagation();
return false;
}
}
return true;
});
};
function checkCommentCharCount(_2d0,_2d1,_2d2,_2d3){
jQuery("#"+_2d1).bind("click keypress keydown keyup",function(){
if(jQuery("#"+_2d3).text()<_2d0){
jQuery("#"+_2d2).show("fast");
}else{
jQuery("#"+_2d2).hide("fast");
}
});
};
function initCommentsCapsule(_2d4,_2d5,_2d6){
if(_2d6.signInRequired){
jq("#comment_submit_"+_2d4).data("disabled",true);
jq("#comment_submit_"+_2d4+", .moduleComment .compose_comment textarea").click(function(){
whenSignedIn({explain:"to comment",showSignup:true,utm_source:"tocomment"},function(){
jq("#comText_"+_2d4).remove();
document.location=_2d6.url;
document.location.reload(true);
});
return false;
});
return;
}
checkCharCount(8192,"comText_"+_2d4,"comText_"+_2d4+"_chars");
checkCommentCharCount(1000,"comText_"+_2d4,"comCharDiv_"+_2d4,"comText_"+_2d4+"_chars");
var _2d7="function"==typeof (_2d6.success)?_2d6.success:function(resp){
jq("#mod_"+_2d4).html(resp);
jq("#spinner").hide();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
};
var _2d8;
if(_2d5){
_2d8=function(form,btn){
whenSignedIn({explain:"to comment as "+_2d5,utm_source:"tocomment"},function(){
jq(form).ajaxSubmit({type:"POST",success:_2d7});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
});
};
}else{
_2d8=function(form,btn){
jq(form).ajaxSubmit({type:"POST",success:_2d7});
btn.data("disabled",true);
setTimeout(function(){
btn.data("disabled",false);
},3000);
};
}
jq(document).delegate("#fancybox-close","click",function(){
jq("#spinner").hide();
return false;
});
jq("#comment_submit_"+_2d4).click(function(){
jq("#comment_"+_2d4).submit();
return false;
});
var _2d9={onkeyup:false,submitHandler:function(form){
var btn=jq("#comment_submit_"+_2d4);
if(btn.data("disabled")){
return;
}
jq("#spinner").show();
_2d8.apply(this,[form,btn]);
},rules:{name:{requiredNoPlaceholder:true,nohtml:true}},messages:{name:{requiredNoPlaceholder:"Please enter your name before posting."}},errorLabelContainer:"#formErrors_{$modId} ul",errorElement:"li",errorClass:"errorFld",onfocusout:false};
_2d9.rules["comText_"+_2d4]={requiredNoPlaceholder:true,minlength:4,nohtml:true};
_2d9.messages["comText_"+_2d4]={requiredNoPlaceholder:"Please enter a comment before posting.",minlength:"Your comment is rather short."};
jq("#comment_"+_2d4).validate(_2d9);
};
function forceOpenHiddenRequestComment(){
jq(document).ready(function(){
if(!jq(document.location.hash).is(":visible")){
jq(document.location.hash).parent().toggle();
jq(document.location.hash).parent().parent().find("a.see_all").toggle();
jq(document.location.hash).parent().parent().find("a.hide_extra").toggle();
}
});
};
function safeScriptEval(_2da){
var _2db=_2da.innerHTML.strip();
if(_2db.substring(0,4)=="<!--"){
_2db=_2db.substring(4,_2db.length-3);
}
try{
eval(_2db);
}
catch(e){
}
};
function selectTab(_2dc,_2dd,_2de,_2df){
var _2e0;
if(!_2de){
_2de=jq("#tab_"+_2dc+"_0").closest("ul").children().size();
}
var _2e1,_2e2;
for(var i=0;i<_2de;i++){
_2e1=jq("#tab_"+_2dc+"_"+i);
_2e2=jq("#tabcontent_"+_2dc+"_"+i);
if(!_2e1.size()||!_2e2.size()){
alert("Cannot locate element: baseid="+_2dc+" index="+_2dd+" tabcount="+_2de);
}
if(_2e1.hasClass("selected")){
_2e0=i;
}
if(i==_2dd){
_2e1.addClass("selected");
_2e2.addClass("selected");
}else{
_2e1.removeClass("selected");
_2e2.removeClass("selected");
}
}
var _2e3={};
if(_2df&&_2e3.toString.call(_2df)=="[object Function]"){
_2df(_2e0,_2dd);
}
return false;
};
function categoryFanBulkJoin(id,_2e4,_2e5,_2e6,_2e7,_2e8){
var _2e9=jq(".jc");
var cids=Array();
var _2ea=Array();
var i=0;
var k=0;
jq(".jc").each(function(_2eb,box){
if(jq(box).is(":checked")){
cids[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_2e6){
_2ea[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=cids.join(",");
unchecked_ids=_2ea.join(",");
if(_2e6){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_2e7){
_2e7(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_2e8)!="undefined"){
data["searchTxt"]=_2e8;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_2e4){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_2e5){
setTimeout(categoryFanHighlight,500);
}
}
if(_2e7){
_2e7(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_2ec,_2ed,_2ee,cols,_2ef){
if(!_2ee){
var _2ee=8;
}
if(!cols){
var cols=2;
}
var _2f0=jq("#"+_2ed).val();
if(""==jq.trim(_2f0)){
return;
}
jq("#"+_2ec).load("/xml/categoryFanSearch.php",{search:_2f0,limit:_2ee,cols:cols},function(){
if(_2ef){
_2ef();
}
});
return false;
};
function facebookConnect(_2f1){
if(typeof (_2f1)=="undefined"){
_2f1="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_2f1}).toQueryString();
var ajax=new Ajax.Request("/xml/facebook_authurl.php",{method:"post",parameters:uri,onFailure:reportError,onComplete:function(req){
eval(req.responseText);
if(typeof (authorizationUrl)!="undefined"){
this.child.document.location=authorizationUrl;
}else{
this.child.close();
}
}});
return false;
};
function facebookPopup(_2f2){
xyPos="";
if(window.screenX&&window.innerWidth){
xPos=window.screenX+((window.innerWidth-550)/2);
yPos=window.screenY+((window.innerHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}else{
if(window.screenLeft&&document.body.clientHeight){
xPos=window.screenLeft+((document.body.clientWidth-550)/2);
yPos=window.screenTop+((document.body.clientHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}
}
child=window.open(_2f2,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_2f3,_2f4){
var ajax=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_2f3+"="+(_2f4?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function checkViolations(_2f5){
if(_2f5){
jq(".violations_span").html("");
var _2f6={check_violation:1};
}else{
var _2f6={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_2f6,dataType:"json",success:function(_2f7){
if(_2f7.data){
jq(".violations_span").html(_2f7.data);
}
if(!_2f7.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showFlagRequest(id){
showFlag(id,"request");
};
function showFlagProfile(id){
showFlag(id,"profile");
};
function showEditProfileForm(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/profileform.php",uri,"editprofile");
return false;
};
function showAuthorHubOfTheDay(aid){
var uri=$H({user_id:aid}).toQueryString();
showAjaxOverlay("/xml/hotd_author.php",uri,"hotd");
return false;
};
function showTermsOfService(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/termsofservice.php",uri,"tos");
return false;
};
function showHubOverlay(url,_2f8,_2f9){
var uri=$H({url:url,addComment:_2f8,commentText:_2f9}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_2fa){
var uri=$H({modId:_2fa}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_2fb,_2fc){
var uri=$H({moduleId:_2fb,pollId:_2fc}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_2fd,_2fe,_2ff,_300){
if(!$("overlay")){
var pole=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_2ff){
$("overlay").addClassName(_2ff);
}
toggleOverlay("overlay");
var ajax=new Ajax.Updater({success:"overlay_content"},_2fd,{parameters:_2fe,onComplete:function(){
if(_300!=undefined){
_300.call($("overlay"));
}
if(!$("fixed_title")){
return;
}
var _301=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_301+"px"});
}
adjustOverlayHeight();
}.bind(this),onFailure:reportError,evalScripts:true});
};
function closeAjaxOverlay(){
toggleOverlay("overlay");
$("overlay").className="overlay";
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
return false;
};
function adjustOverlayHeight(){
var _302=browser=="IE"&&version<=6;
var _303=$("overlay");
var _304=Position.getViewportHeight();
if(_304>750){
var _305=_304-150;
}else{
var _305=_304-90;
}
var _306=_303.getStyle("paddingTop");
var _307=_303.getStyle("paddingBottom");
_305-=_306.substring(0,_306.length-2);
_305-=_307.substring(0,_307.length-2);
_305=Math.max(_305,100);
$("overlay").setStyle({height:_305+"px"});
if(_304>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_302){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_302){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _308=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_308+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_305-60)+"px",overflowY:"auto"});
}
};
function activity_why(id,_309,_30a,_30b){
var ajax=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_309,actionTargetId:_30a,createDate:_30b}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function ellipse(str,_30c){
if(str.length>_30c&&_30c!=0){
str=str.substr(0,_30c-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_30c-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function addTagEntries(){
var _30d=4;
var _30e=document.createElement("div");
_30e.id="moreEntryDiv";
var li=null;
var _30f=4+1;
var _310=_30f+_30d;
for(var i=_30f;i<_310;i++){
li=document.createElement("li");
_30e.appendChild(li);
var _311=document.createElement("input");
_311.className="tagEntry";
_311.name="tag_"+i;
_311.type="text";
_311.size=40;
li.appendChild(_311);
}
$("tagEntries").appendChild(_30e);
return true;
};
function hubtool_add_tag(_312){
var _313=(_312)?$(_312):$("add_tag_input");
if(!_313){
return;
}
var tag;
if(Field.present(_313)&&_313.type){
tag=$F(_313);
Field.clear(_313);
}else{
if(_313.innerHTML){
tag=_313.innerHTML;
Element.remove(Element.findElement(_313,"li"));
}
}
if(!tag){
return;
}
var _314=0;
var _315=/^tag_(\d+)$/i;
var _316=$$(".tagEntry");
_316.each(function(ele){
if(ele.id){
var ms=_315.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_314){
_314=id;
}
}
}
});
_314++;
var _317="tag_"+_314;
var _318=$("add_tag_input").parentNode;
var _319="<input class=\"tagEntry\" id=\""+_317+"\" name=\""+_317+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_317)){
var _31a=$(_317).tabIndex;
Element.update($(_317).parentNode,_319);
$(_317).tabIndex=_31a;
}else{
var _31b=$("tag_1").tabIndex-1;
var _31a=_31b+_314;
var pole=new Insertion.Before(_318,"<li>"+_319+"</li>");
$(_317).tabIndex=_31a;
_31a=$("add_tag_input").tabIndex;
_31a++;
$("add_tag_input").tabIndex=_31a;
}
return false;
};
function add_tag(_31c){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _31d=tag.replace(/'/g,"\\'");
var _31e=tag.replace(/ /g,"+");
var _31f="tagd_"+tag.replace(/ /g,"_");
_31f=_31f.toLowerCase();
if($(_31f)){
$(_31f).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _320=$("nav_tags_edit");
var _321="<a href=\"javascript:void delete_tag('"+_31c+"','"+_31d+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_321+="<a id=\""+_31f+"\" href=\"/tag/"+_31e+"\">"+tag+"</a>";
var item=document.createElement("li");
item.innerHTML=_321;
_320.appendChild(item);
save_tag(_31c,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_322,tag){
if(!_322||!tag){
return;
}
var _323="tagd_"+tag.replace(/ /g,"_");
var _324=$(_323);
if(!_324){
return;
}
var li=_324.parentNode;
Element.remove(li);
save_tag(_322,tag,true);
return false;
};
function save_tag(_325,tag,del){
var _326=(del)?1:0;
var req={a:_325,v:tag,d:_326};
var _327=$H(req).toQueryString();
var ajax=new Ajax.Request("/xml/tagadd.php",{parameters:_327,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function fireOnReturn(_328,func){
Event.observe(_328,"keyup",function(_329){
_329=_329||window.event;
if(_329.which){
if(_329.which==Event.KEY_RETURN){
_329.preventDefault();
func();
}
}else{
if(_329.keyCode){
if(_329.keyCode==Event.KEY_RETURN){
Event.stop(_329);
func();
}
}
}
},false);
};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_32a){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_32a*100)+")";
}
ele.style.opacity=_32a;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _32b;
if(document.defaultView){
_32b=document.defaultView.getComputedStyle(ele,"");
}else{
_32b=ele.currentStyle;
}
return _32b;
};
Element.cloneStyles=function(ele,_32c,_32d){
ele=$(ele);
_32c=$(_32c);
var _32e=Element.getCurrentStyle(ele);
for(var name in _32e){
if(browser=="Opera"){
if(name=="height"||name=="pixelHeight"||name=="pixelWidth"||name=="posHeight"||name=="posWidth"||name=="width"||name=="font"||name=="fontSize"){
continue;
}
}
var _32f=_32e[name];
if(_32f!==""&&!(_32f instanceof Object)&&name!="length"&&name!="parentRule"){
if(_32d&&name.indexOf(_32d)!==0){
continue;
}
_32c.style[name]=_32f;
}
}
return _32c;
};
Element.findElement=function(_330,_331){
_330=$(_330);
while(_330.parentNode&&(!_330.tagName||(_330.tagName.toUpperCase()!=_331.toUpperCase()))){
_330=_330.parentNode;
}
return _330;
};
String.prototype.trim=function(){
var res=this;
while(res.substring(0,1)==" "){
res=res.substring(1,res.length);
}
while(res.substring(res.length-1,res.length)==" "){
res=res.substring(0,res.length-1);
}
return res;
};
String.prototype.startsWith=function(_332){
var res=this;
return res.substring(0,_332.length)==_332;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _333=p.innerHTML;
if(_333.length>len){
_333=_333.substring(0,len);
_333=_333.replace(/\w+$/,"");
_333+="...";
p.innerHTML=_333;
}
}
};
Position.getViewportHeight=function(){
if(window.innerHeight!=window.undefined){
return window.innerHeight;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return window.undefined;
};
Position.getViewportWidth=function(){
if(window.innerWidth!=window.undefined){
return window.innerWidth;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientWidth;
}
if(document.body){
return document.body.clientWidth;
}
return window.undefined;
};
Position.getDocumentHeight=function(){
return document.documentElement.scrollHeight;
};
Position.getDocumentWidth=function(){
return document.documentElement.scrollWidth;
};
Position.getViewportScrollX=function(){
var _334=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_334=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_334=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_334=window.pageXOffset;
}else{
if(window.scrollX){
_334=window.scrollX;
}
}
}
}
return _334;
};
Position.getViewportScrollY=function(){
var _335=0;
if(document.documentElement&&document.documentElement.scrollTop){
_335=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_335=document.body.scrollTop;
}else{
if(window.pageYOffset){
_335=window.pageYOffset;
}else{
if(window.scrollY){
_335=window.scrollY;
}
}
}
}
return _335;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _336=jq(window).scrollTop();
var _337=_336+jq(window).height();
if(eleBot<_336){
return -1;
}
if(off.top>_337){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _338=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _339=[_338[0]+Position.getViewportWidth(),_338[1]+Position.getViewportHeight()];
return (_338[0]<off[0]&&off[0]<_339[0]&&_338[1]<off[1]&&off[1]<_339[1]);
};
Position.set=function(ele,_33a){
if(ele&&_33a){
ele.style.left=_33a[0]+"px";
ele.style.top=_33a[1]+"px";
}
};
function phone_verify_required(_33b,_33c,_33d,_33e){
if(typeof (_33e)=="undefined"){
data={};
}else{
data={a:_33e};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_33b);
}else{
_33c.apply(null,_33d);
}
},"json");
};
function require_phone_verification(_33f,_340){
url="/xml/verify/phone.php";
if(typeof (_340)!="undefined"&&_340){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_33f},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_341,end){
for(var i=_341;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_341)+1;
}
update_plural(name);
};
function unselect_all(name,_342,end){
for(var i=_342;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=false;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=0;
}
update_plural(name);
};
function checkbox_onchange(name,num){
var disp=$(name+"_selected");
if(disp){
var ele=$(name+"_"+num);
if(ele.checked){
disp.innerHTML=parseInt(disp.innerHTML,10)+1;
update_plural(name);
}else{
disp.innerHTML=parseInt(disp.innerHTML,10)-1;
update_plural(name);
}
}
};
function update_plural(name){
var ele=document.getElementById(name+"_selected");
if(ele){
var disp=document.getElementById(name+"_plural");
if(disp){
if(parseInt(ele.innerHTML,10)==1){
disp.innerHTML=" is";
}else{
disp.innerHTML="s are";
}
}
}
};
function import_now(_343,name,_344,end){
var _345=self.opener.document.getElementById(_343);
if(_345){
for(var i=_344;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _346=$(name+"_email_"+i);
if(_345.value.length<2||_345.value.charAt(_345.value.length)==","||_345.value.charAt(_345.value.length-1)==","){
_345.value=_345.value+_346.innerHTML;
}else{
_345.value=_345.value+", "+_346.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_347,_348,max){
var _349=document.getElementById(_347);
var _34a=document.getElementById(_348);
if(!_349){
alert("charCounter bad source: "+_347);
}
if(!_34a){
alert("charCounter bad source: "+_348);
}
if(_349.value.length>max){
_349.value=_349.value.substring(0,max);
}
_34a.value=max-_349.value.length;
};
function hideAnswers(){
$("hiddenAnswers").hide();
$("hideAnswers").hide();
$("showAnswers").show();
return false;
};
function showAnswers(){
$("hiddenAnswers").show();
$("hideAnswers").show();
$("showAnswers").hide();
return false;
};
function fetchAnswers(_34b,_34c,_34d){
var _34e=$H({answerIds:_34b,enableVoting:_34c,enableEditing:_34d}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_34e,onComplete:function(_34f){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_350,v){
if(_350===undefined){
_350=true;
}
jq.post("/xml/answervote.php",{id:id,vote:v,timeIndicator:_350});
return false;
};
function answerVoteDown(id,_351){
return answerVote(id,_351,-1);
};
function answerVoteUp(id,_352){
return answerVote(id,_352,1);
};
function getElementScreenTop(){
var _353=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _353;
};
function setElementScreenTop(top){
if(window.pageYOffset){
var x=window.pageXOffset;
window.scrollTo(x,top);
}else{
if(document.documentElement){
document.documentElement.scrollTop=top;
}else{
document.body.scrollTop=top;
}
}
};
function getElementTop(elem){
var top=0;
do{
top+=elem.offsetTop;
elem=elem.offsetParent;
}while(elem!=null);
return top;
};
function getElementLeft(elem){
var left=0;
do{
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return left;
};
var Timer=Class.create();
Timer.prototype={initialize:function(){
this.start();
},start:function(){
this.startTime=new Date();
},stop:function(){
this.stopTime=new Date();
this.length=(this.stopTime-this.startTime);
},inspect:function(){
if(!this.stopTime){
this.stop();
}
return "duration: "+this.length+"ms";
}};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_354){
id=jQuery(_354.target).attr("id");
id=id.replace("answer_delete_","");
jQuery.ajax({url:"/xml/delete_answer?id="+id,success:function(data){
jQuery("#"+id).html(data);
if(data=="Undelete Answer"){
jQuery("#answer"+id).css("opacity",0.4);
}else{
jQuery("#answer"+id).css("opacity",1);
}
jQuery("#answer"+id).effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function toggleRequestCommentEdit(id){
jq("#edit_rc_"+id).css("display","block");
};
function submitRequestCommentEdit(i){
var txt=jq("#edit_rc_"+i+" textarea").val();
if(txt==""){
var _355="#edit_rc_error_"+i;
jQuery(_355).html("You cannot submit an empty comment.");
}else{
jq.ajax({url:"/xml/request_comment_edit.php",type:"POST",data:{id:i,text:txt},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#edit_rc_error_"+i).html(data.msg);
jQuery("#edit_rc_error_"+i).show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jq("#rc_"+i).replaceWith(data.msg);
jq("#rc_"+i).effect("highlight",{color:"yellow"},1000);
}
}});
}
return false;
};
function supportRequestCommentDeletion(){
jQuery(".request_comment_delete").click(function(_356){
orig_id=jQuery(_356.target).attr("id");
id=orig_id.replace("rcd_","");
jQuery.ajax({url:"/xml/delete_request_comment?id="+id,success:function(data){
jQuery("#"+orig_id).html(data);
if(data=="Undelete Comment"){
jQuery("#"+orig_id).parent().css("opacity",0.4);
}else{
jQuery("#"+orig_id).parent().css("opacity",1);
}
jQuery("#"+orig_id).parent().effect("highlight",{color:"yellow"},1000);
}});
return false;
});
jQuery(".request_comment_notspam").click(function(_357){
orig_id=jQuery(_357.target).attr("id");
id=orig_id.replace("rcns_","");
jQuery.ajax({url:"/xml/request_comment_notspam?id="+id,success:function(data){
jQuery("#"+orig_id).html(data);
if(data=="Undelete Comment"){
jQuery("#"+orig_id).parent().css("opacity",0.4);
}else{
jQuery("#"+orig_id).parent().css("opacity",1);
}
jQuery("#"+orig_id).parent().effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function showAnswerCommentBox(id,_358){
if(jQuery(id).next().attr("id")=="answer_comment"&&jQuery("#answer_comment").css("display")=="block"){
jQuery("#answer_comment").css("display","none");
jQuery("input[name=\"commentSubmit\"]").unbind("click");
}else{
jQuery("#answer_comment").css("display","block");
jQuery("#answer_comment textarea").val("");
var form=jQuery("#answer_comment").detach();
jQuery(id).after(form);
var idx=id.substring(id.indexOf("_")+1);
jQuery("input[name=\"commentSubmit\"]").unbind("click");
jQuery("input[name=\"commentSubmit\"]").click(function(){
submitAnswerComment(idx);
return false;
});
}
jQuery("#rc_numcharsvalue").html(_358);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _359="#result_"+i;
var _35a="#error_"+i;
var txt=jQuery("#answer_comment textarea").val();
if(txt==""){
jQuery("#rc_error").html("You cannot submit an empty comment");
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jQuery.ajax({url:"/xml/request_comment_submit.php",type:"POST",data:{id:i,text:txt},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#rc_error").html(data.msg);
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jQuery("#answer_comment").fadeOut("slow",function(){
jQuery("#answer_comment").prev().css("display","none");
jQuery(_359).append(data.msg);
var _35b=jQuery(_359).children().last().attr("id");
jQuery(_359).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_35b);
});
});
}
}});
}
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_35c){
this.buffer.push(_35c);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function clickBestAnswer(rId,aId){
if(confirm("Are you sure that you want to select this as the best answer?  This cannot be undone.")){
jQuery.ajax({url:"/xml/select_best_answer.php",type:"POST",data:{request_id:rId,answer_id:aId},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#rc_error").html(data.msg);
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
var id="#answer"+aId;
jQuery(id).addClass("bestanswer");
jQuery(".bestanswerselector").hide();
}
}});
}
};
function hpFormHandler(_35d){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_35d);
this.errors=$H({});
this.method="post";
this.errorId="formErrors";
this.errorHeader="<strong>Please fix these errors before continuing:</strong><br/>";
this.useEffects=true;
this.individualerrors=false;
this.scrollToErrors=false;
this.ensureSignedInBeforeSave=false;
this.ensureSignedInOptions={};
this.ensureCheckedSecurity=false;
this.lastCheckedSecurity=new Date().getTime()-(1000*1000);
this.setValidators();
};
hpFormHandler.prototype.handleSubmitServerError=function(req){
};
hpFormHandler.prototype.validateHideDiv=function(id){
$(id).hide();
};
hpFormHandler.prototype.validateLengthMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(($F(ele).trim().length>max),ele,msg);
};
hpFormHandler.prototype.validateLengthMin=function(ele,min,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthMinTrim=function(ele,min,msg){
var val=$F(ele);
val=jQuery.trim(val);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthExactly=function(ele,len,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length!=len),ele,msg);
};
hpFormHandler.prototype.validateValueMin=function(ele,min,msg){
var val=$F(ele);
this.testForError(val<min,ele,msg);
};
hpFormHandler.prototype.validateValueMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(val>max,ele,msg);
};
hpFormHandler.prototype.validateMandatory=function(ele,msg){
var val=false;
if($F(ele)){
val=$F(ele).trim();
}
this.testForError((!val||val.length==0),ele,msg);
};
hpFormHandler.prototype.validateRadioChecked=function(ele,msg){
if(!ele.name){
return;
}
var _35e=$$("input[name="+ele.name+"]");
var _35f=false;
_35e.each(function(r){
if(r.checked==true){
_35f=true;
throw $break;
}
});
this.testForError(!_35f,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _360=false;
if(val.length>=20){
var _361=val.match(/\s+/g);
var _362=_361?_361.length:0;
var _363=_362+1;
_360=_363/(val.length-_362)<0.08;
}
this.testForError(_360,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_364,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_364)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_365,msg){
var val=$F(ele);
this.testForError((val.search(_365)!=-1),ele,msg);
};
hpFormHandler.prototype.validateNoSpaces=function(ele,msg){
var val=$F(ele).trim();
this.testForError(val.search(/ /)!=-1,ele,msg);
};
hpFormHandler.prototype.validateNot=function(ele,not,msg){
this.testForError(($F(ele).trim()==not),ele,msg);
};
hpFormHandler.prototype.validateSameAs=function(ele,ele2,msg){
this.testForError(($F(ele)!=$F(ele2)),ele,msg);
};
hpFormHandler.prototype.validateNoWords=function(ele,_366,msg){
var val=$F(ele);
var _367=false;
for(i=0;i<_366.length&&!_367;i++){
var _368=new RegExp("[^a-zA-Z]"+_366[i]+"[^a-zA-Z]","i");
_367=(val.search(_368)>=0);
if(!_367){
_368=new RegExp("^"+_366[i]+"[^a-zA-Z]","i");
_367=(val.search(_368)>=0);
}
if(!_367){
_368=new RegExp("[^a-zA-Z]"+_366[i]+"$","i");
_367=(val.search(_368)>=0);
}
if(!_367){
_368=new RegExp("^"+_366[i]+"$","i");
_367=(val.search(_368)>=0);
}
}
this.testForError(_367,ele,msg);
};
hpFormHandler.prototype.validateServerCheck=function(ele,url,msg){
var val=$F(ele);
if(val.length==0){
return;
}
if(ele.lastGoodValue&&ele.lastGoodValue==val){
return;
}
val=encodeURIComponent(val);
var _369=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
eval(req.responseText);
if(!valid&&typeof msg=="object"){
if(typeof errorCode!="undefined"&&typeof msg[errorCode]!="undefined"){
msg=msg[errorCode];
}else{
msg=msg[0];
}
}
this.testForError(!valid,ele,msg);
if(valid){
ele.lastGoodValue=val;
}
this._showErrors();
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:reportError});
};
hpFormHandler.prototype.checkAnsweredSecurityQuestionBeforeSave=function(){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
this.lastCheckedSecurity=new Date().getTime();
this._showErrors();
}else{
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _36a=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
return;
}
this.form.submit();
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function validateCheckedSecurityAndSubmit(form,fn,args){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
}else{
if(typeof (fn)=="function"){
fn.apply(form,args);
}else{
form.submit();
}
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function showAskSecurityQuestion(){
var aEl=jq("<a class=\"iframe\" href=\"/my/profile/security_ask_iframe.php\" style=\"display:none\">This goes to iframe</a>");
jq("#container").append(aEl);
jq(".iframe").fancybox({"hideOnContentClick":false,"hideOnOverlayClick":false,"enableEscapeButton":false,"showCloseButton":false,"width":750,"height":170,"scrolling":"no"});
jq(".iframe").click();
};
hpFormHandler.prototype.validateEmailList=function(ele){
var _36b=800;
var _36c=6;
this.validateLengthMin(ele,_36c,"The address you entered is too short. Please use an address at least "+_36c+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _36d=200;
this.validateLengthMax(ele,_36d,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _36e=2;
var _36f=200;
this.validateLengthMin(ele,_36e,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_36f,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _370=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_370=true;
}
this.testForError(!_370,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _371=40;
var _372=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_372,"Your password is too short.  Protect your account by choosing a password that is at least  "+_372+" characters long.  Safety first!");
this.validateLengthMax(ele1,_371,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _373=60;
var _374=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_373,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_375){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_375.detect(function(name){
return ($F(ele)==name);
});
this.testForError(existingName,ele,"You already have a group with this name.  Please select it from the list, or enter a new name.");
};
hpFormHandler.prototype.observe=function(){
new Form.EventObserver(this.form,this._elemsChanged.bind(this));
};
hpFormHandler.prototype.focusFirst=function(){
Form.focusFirstElement(this.form);
};
hpFormHandler.prototype.tabOnEnter=function(){
hpFormHandler.tabOnEnter(this.form);
};
hpFormHandler.tabOnEnter=function(form){
if(!$(form)){
return;
}
var _376=$A($(form).getElementsByTagName("input"));
_376.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_377,_378,_379){
if($(_377)&&$(_378)){
var gw=new GhostWatcher(_377,_378,_379);
}
};
hpFormHandler.prototype.setValidators=function(_37a,_37b){
this.toValidate=$H(_37a);
this.toValidateOnsubmit=$H(_37b);
};
hpFormHandler.prototype.hasErrors=function(){
return (this.errors&&this.errors.keys()&&this.errors.keys().length>0);
};
hpFormHandler.prototype.cancel=function(){
this.reset();
};
hpFormHandler.prototype.reset=function(){
Form.reset(this.form);
if(this.cancelUri){
location.href=this.cancelUri;
}
};
hpFormHandler.prototype.valid=function(){
this._runValidators(true);
if(this.hasErrors()){
return false;
}
return true;
};
hpFormHandler.prototype.save=function(_37c){
if(this.ensureSignedInBeforeSave&&!_37c){
whenSignedIn(this.ensureSignedInOptions,this.save.bind(this,true));
return false;
}
this.form.descendants().each(function(elt){
if(elt&&elt.tagName&&elt.hasClassName&&(elt.tagName=="TEXTAREA"||elt.tagName=="INPUT")&&elt.hasClassName("dimmed")){
elt.value="";
}
});
this._runValidators(true);
if(this.hasErrors()){
if(this.scrollToErrors){
var _37d=new fx.Scroll({duration:100});
_37d.scrollTo(this.errorDiv);
}
return false;
}
if((this.ensureCheckedSecurity)&&(new Date().getTime()-this.lastCheckedSecurity>1000*15)){
this.checkAnsweredSecurityQuestionBeforeSave();
return false;
}
if(window.tinyMCE&&tinyMCE.triggerSave){
try{
tinyMCE.triggerSave(false,true);
}
catch(e){
}
}
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _37e=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
}
return (this.submitMode);
};
hpFormHandler.prototype.handleResponse=function(req){
if(!this.skipValidationOfResponse){
eval(req.responseText);
}
if(this.skipValidationOfResponse||valid==1){
if(this.saveCallback){
this.saveCallback(req);
}
if(this.nextUri){
location.href=this.nextUri;
}
return true;
}else{
this.handleSubmitServerError(req);
return false;
}
};
hpFormHandler.prototype.testForError=function(_37f,ele,msg){
if(_37f){
this.errors.set(ele.id,msg);
}else{
if(this.errors.get(ele.id)){
if(typeof msg=="object"){
for(idx in msg){
if(this.errors.get(ele.id)==msg[idx]){
this.errors.unset(ele.id);
}
}
}else{
if(this.errors.get(ele.id)==msg){
this.errors.unset(ele.id);
}
}
}
}
};
hpFormHandler.prototype._elemsChanged=function(ele){
this._runValidators(false);
};
hpFormHandler.prototype._runValidators=function(_380){
var _381=Form.getElements(this.form);
var _382=$A(_381);
_382.each(function(node){
if(_380){
var _383=this.toValidateOnsubmit.get(node.id);
if(!_383){
_383=this.toValidateOnsubmit.get(node.className);
}
if(_383){
_383(node);
}
}
var _383=this.toValidate.get(node.id);
if(!_383){
_383=this.toValidate.get(node.className);
}
if(_383){
_383(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _384="";
if(json.status=="error"){
var _385=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_384+=" - "+json.errors[key][i]+"\n";
}
_385++;
}
}
if(_385>0){
var _386=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_386+=_384+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_386);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _387=new fx.Scroll({duration:300});
_387.scrollTo("changesSaved");
$("changesSaved").show();
}else{
alert("An unknown error has occured.  Please try saving again.  If the problem persists, contact team@hubpages.com");
}
}
};
hpFormHandler.prototype._showErrors=function(){
if(this.individualerrors){
this._showErrorsPerField();
}else{
this._showErrorsOneDiv();
}
};
hpFormHandler.prototype._showErrorsOneDiv=function(){
if(!this.errorDiv&&!$(this.errorId)){
new Insertion.Top(this.form,"<div id=\""+this.errorId+"\"></div>");
}
if(!this.errorDiv){
this.errorDiv=$(this.errorId);
}
if(this.useEffects&&!this.errFade){
this.errFade=new fx.Opacity(this.errorDiv,{duration:500});
this.errFade.now=0;
}
if(!this.hasErrors()){
if(this.lit){
if(this.useEffects){
this.errFade.toggle();
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
if($("nextB")){
$("nextB").src="http://x.hubpages.com/x/next.gif";
}
this.lit=false;
}
return;
}
var _388=this.errorHeader;
_388+="<ul>";
this.errors.each(function(err){
_388+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_388+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_388;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _389=$(err.key);
var _38a=err.key+"_error";
var _38b=$(_38a);
if(_38b){
_38b.innerHTML=err.value;
_38b.className="alert";
_38b.show();
}else{
new Insertion.Top(_389.parentNode,"<div id=\""+_38a+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_389,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _38c=typeof this.errors.get(targetId)=="undefined";
if(_38c){
if($(targetId+"_error")){
$(targetId+"_error").hide();
}
hpFormHandler.lightEle(ele,false);
}
}.bind(this));
this.lit=true;
}else{
if(this.lit){
if(this.useEffects){
var eles=this.form.select(".alert");
eles.each(function(ele){
ele.hide();
});
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
this.lit=false;
}
}
};
function _handleInputKeypress(_38d){
_38d=_38d||window.event;
if(_38d.which){
if(_38d.which==Event.KEY_RETURN){
var _38e=document.createEvent("KeyboardEvent");
_38e.initKeyEvent("keydown",true,true,document.defaultView,_38d.ctrlKey,_38d.altKey,_38d.shiftKey,_38d.metaKey,Event.KEY_TAB,0);
_38d.preventDefault();
_38d.target.dispatchEvent(_38e);
}
}else{
if(_38d.keyCode){
if(_38d.keyCode==Event.KEY_RETURN){
_38d.keyCode=Event.KEY_TAB;
}
}
}
return true;
};
hpFormHandler.lightEle=function(ele,on){
ele=$(ele);
if(!ele){
return;
}
if(on){
Element.addClassName(ele,"alertBorder");
}else{
Element.removeClassName(ele,"alertBorder");
}
};
var GhostWatcher=Class.create();
GhostWatcher.prototype={initialize:function(_38f,_390,_391){
this.fromEle=$(_38f);
this.toEle=$(_390);
this.copyFunction=(_391!=null)?_391:this.copyValue;
if(this.fromEle&&this.toEle){
Event.observe(this.fromEle,"keyup",this.copyFunction.bind(this),false);
}
Event.observe(window,"focus",this.copyFunction.bind(this),false);
Event.observe(window,"load",this.copyFunction.bind(this),false);
},copyValue:function(evt){
var text=$F(this.fromEle);
this.toEle.innerHTML=text.stripTags();
},recopy:function(){
this.copyFunction();
}};
function growTextArea(elt,_392,_393,_394){
var rows=Math.ceil($F(elt).length/_392)+1;
var _395=rows*_393;
_395=Math.max(_395,_394);
elt.setStyle({height:_395+"px"});
};
function makeGrowable(id,_396,_397,_398){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_396,_397,_398);
});
};
function makeExpandable(id,_399,_39a,_39b,_39c,_39d){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_399);
var _39d=(_39d===undefined)?"expanded":_39d;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_39d)){
anc.addClass(_39d);
if(typeof (_39c)=="function"){
_39c.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_39a)=="function"){
_39a.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_39b){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_399);
});
};
function categorySearch(_39e){
jq("#"+_39e+"SearchResults").load("/xml/categorysearch.php",{uniqueId:_39e,searchText:jq("#"+_39e+"SearchText").val()});
};
(function($){
var _39f=function(){
this.children("select").change(function(_3a0){
var _3a1=jq(_3a0.target);
_3a1.parent().hpCategorySelector("chooseCategory",_3a1.val());
});
};
var _3a2={init:function(_3a3){
var _3a4=$.extend({userId:0,valueId:"#categoryId",data:{}},_3a3);
this.data("settings",_3a4);
_39f.apply(this);
return this;
},chooseCategory:function(_3a5){
return this.each(function(_3a6,elt){
var _3a7=jq(elt);
var _3a8=_3a7.data("settings");
var _3a9=_3a7.attr("id");
var _3aa=$.extend({categoryId:_3a5,id:_3a9},_3a8.data);
jq.post("/xml/categoryselector.php",_3aa,function(rsp){
var data=jq.parseJSON(rsp);
_3a7.html(data.render);
_39f.apply(_3a7);
_3a7.find("select").first().focus();
$(_3a8.valueId).val(_3a5);
_3a7.trigger("categoryChange.hpCategorySelector",data);
});
});
},refresh:function(){
return this.each(function(_3ab,elt){
var _3ac=jq(elt);
_3ac.hpCategorySelector("chooseCategory",_3ac.hpCategorySelector("getValue"));
});
},getValue:function(){
var _3ad=this.data("settings");
return $(_3ad.valueId).val();
},destroy:function(){
}};
$.fn.hpCategorySelector=function(_3ae){
if(_3a2[_3ae]){
return _3a2[_3ae].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _3ae==="object"||!_3ae){
return _3a2.init.apply(this,arguments);
}else{
$.error("Method "+_3ae+" does not exist on jQuery.hpCategorySelector");
}
}
};
})(jQuery);
(function($){
var _3af=function(){
this.children("select").change(function(_3b0){
var _3b1=jq(_3b0.target);
_3b1.parent().hpForumSelector("chooseForum",_3b1.val(),_3b1.prevAll("select").size()>0);
});
};
var _3b2={init:function(_3b3){
var _3b4=$.extend({userId:0,data:{},id:"admin"},_3b3);
this.data("settings",_3b4);
_3af.apply(this);
return this;
},chooseForum:function(_3b5,_3b6){
var _3b7=0,data={};
if(/fave/.test(_3b5)){
data["categoryId"]=_3b5.substring(5);
_3b7=data["categoryId"];
}else{
if(_3b6){
data["categoryId"]=_3b5;
}else{
data["forumId"]=_3b5;
}
}
return this.each(function(_3b8,elt){
var _3b9=jq(elt);
var _3ba=_3b9.data("settings");
var _3bb=_3b9.attr("id");
var _3bc=$.extend(data,_3ba.data);
_3bc["id"]=_3ba.id;
jq.post("/xml/forumselector.php",_3bc,function(rsp){
_3b9.html(rsp);
_3af.apply(_3b9);
$("#"+_3ba.id+"_category_id").val(_3b7);
});
});
},getValue:function(){
var _3bd=this.data("settings");
return $(_3bd.valueId).val();
},destroy:function(){
}};
$.fn.hpForumSelector=function(_3be){
if(_3b2[_3be]){
return _3b2[_3be].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _3be==="object"||!_3be){
return _3b2.init.apply(this,arguments);
}else{
$.error("Method "+_3be+" does not exist on jQuery.hpForumSelector");
}
}
};
})(jQuery);
function addEvent(_3bf,type,_3c0){
if(!_3c0.$$guid){
_3c0.$$guid=addEvent.guid++;
}
if(!_3bf.events){
_3bf.events={};
}
var _3c1=_3bf.events[type];
if(!_3c1){
_3c1=_3bf.events[type]={};
if(_3bf["on"+type]){
_3c1[0]=_3bf["on"+type];
}
}
_3c1[_3c0.$$guid]=_3c0;
_3bf["on"+type]=handleEvent;
};
addEvent.guid=1;
function removeEvent(_3c2,type,_3c3){
if(_3c2.events&&_3c2.events[type]){
delete _3c2.events[type][_3c3.$$guid];
}
};
function handleEvent(_3c4){
var _3c5=true;
_3c4=_3c4||fixEvent(window.event);
if(_3c4==null){
return false;
}
if(this.events==null){
return false;
}
var _3c6=this.events[_3c4.type];
for(var i in _3c6){
this.$$handleEvent=_3c6[i];
if(this.$$handleEvent(_3c4)===false){
_3c5=false;
}
}
return _3c5;
};
function fixEvent(_3c7){
if(_3c7!=null){
_3c7.preventDefault=fixEvent.preventDefault;
_3c7.stopPropagation=fixEvent.stopPropagation;
}
return _3c7;
};
fixEvent.preventDefault=function(){
this.returnValue=false;
};
fixEvent.stopPropagation=function(){
this.cancelBubble=true;
};
function getEventTarget(e){
var targ;
if(!e){
e=window.event;
}
if(e.target){
targ=e.target;
}else{
if(e.srcElement){
targ=e.srcElement;
}
}
if(targ.nodeType==3){
targ=targ.parentNode;
}
return targ;
};
var css={getElementsByClass:function(node,_3c8,tag){
var _3c9=new Array();
var els=node.getElementsByTagName(tag);
var _3ca=els.length;
var _3cb=new RegExp("(^|\\s)"+_3c8+"(\\s|$)");
for(var i=0,j=0;i<_3ca;i++){
if(this.elementHasClass(els[i],_3c8)){
_3c9[j]=els[i];
j++;
}
}
return _3c9;
},elementHasClass:function(el,_3cc){
if(!el){
return false;
}
var _3cd=new RegExp("\\b"+_3cc+"\\b");
if(el.className.match(_3cd)){
return true;
}
return false;
}};
var standardistaTableSorting={that:false,sortColumnIndex:-1,lastAssignedId:0,newRows:-1,lastSortedTable:-1,init:function(){
if(!document.getElementsByTagName){
return;
}
this.that=this;
this.run();
},run:function(){
var _3ce=document.getElementsByTagName("table");
for(var i=0;i<_3ce.length;i++){
var _3cf=_3ce[i];
if(css.elementHasClass(_3cf,"sortable")){
this.makeSortable(_3cf);
}
}
},makeSortable:function(_3d0){
if(!_3d0.id){
_3d0.id="sortableTable"+this.lastAssignedId++;
}
if(!_3d0.tHead||!_3d0.tHead.rows||0==_3d0.tHead.rows.length){
return;
}
var row=null;
for(var i=0;i<_3d0.tHead.rows.length;i++){
if(css.elementHasClass(_3d0.tHead.rows[i],"sort_control_buttons")){
row=_3d0.tHead.rows[i];
break;
}
}
if(row==null){
row=_3d0.tHead.rows[_3d0.tHead.rows.length-1];
}
for(var i=0;i<row.cells.length;i++){
var _3d1=row.cells[i].firstChild;
_3d1.onclick=this.headingClicked;
_3d1.setAttribute("columnId",i);
}
},sortTheTable:function(e){
var that=standardistaTableSorting.that;
var _3d2=getEventTarget(e);
var td=_3d2.parentNode;
var tr=td.parentNode;
var _3d3=tr.parentNode;
var _3d4=_3d3.parentNode;
if(!_3d4.tBodies||_3d4.tBodies[0].rows.length<=1){
return false;
}
var _3d5=_3d2.getAttribute("columnId")||td.cellIndex;
var _3d6=css.getElementsByClass(td,"tableSortArrow","span");
var _3d7="";
if(_3d6.length>0){
_3d7=_3d6[0].getAttribute("sortOrder");
}
var itm="";
var _3d8=0;
while(""==itm&&_3d8<_3d4.tBodies[0].rows.length){
var elm=_3d4.tBodies[0].rows[_3d8].cells[_3d5];
if(elm.childNodes.length==1){
itm=that.getInnerText(_3d4.tBodies[0].rows[_3d8].cells[_3d5]);
}else{
itm=that.getInnerText(_3d4.tBodies[0].rows[_3d8].cells[_3d5].firstChild);
}
_3d8++;
}
var _3d9=that.determineSortFunction(itm);
var _3da;
if(_3d4.id==that.lastSortedTable&&_3d5==that.sortColumnIndex){
_3da=that.newRows;
_3da.reverse();
}else{
that.sortColumnIndex=_3d5;
_3da=new Array();
for(var j=0;j<_3d4.tBodies[0].rows.length;j++){
_3da[j]=_3d4.tBodies[0].rows[j];
}
_3da.sort(_3d9);
}
that.moveRows(_3d4,_3da);
that.newRows=_3da;
that.lastSortedTable=_3d4.id;
var _3d6=css.getElementsByClass(tr,"tableSortArrow","span");
for(var j=0;j<_3d6.length;j++){
if(j==_3d5){
if(null==_3d7||""==_3d7||"DESC"==_3d7){
_3d6[j].innerHTML="▼";
_3d6[j].setAttribute("sortOrder","ASC");
}else{
_3d6[j].innerHTML="▲";
_3d6[j].setAttribute("sortOrder","DESC");
}
}else{
_3d6[j].innerHTML="&nbsp;";
}
}
if(Element.hasClassName(_3d4.tBodies[0].rows[0],"evenRow")||Element.hasClassName(_3d4.tBodies[0].rows[0],"oddRow")){
for(var i=0;i<_3d4.tBodies[0].rows.length;i++){
tr=_3d4.tBodies[0].rows[i];
if(i%2==0){
if(!Element.hasClassName(tr,"oddRow")){
Element.addClassName(tr,"oddRow");
}
if(Element.hasClassName(tr,"evenRow")){
Element.removeClassName(tr,"evenRow");
}
}else{
if(!Element.hasClassName(tr,"evenRow")){
Element.addClassName(tr,"evenRow");
}
if(Element.hasClassName(tr,"oddRow")){
Element.removeClassName(tr,"oddRow");
}
}
}
}
return false;
},headingClicked:function(e){
var that=standardistaTableSorting.that;
that.sortTheTable(e);
return false;
},getInnerText:function(el){
if("string"==typeof el||"undefined"==typeof el){
return el;
}
if(null==el){
return "";
}
if(el.innerText){
return el.innerText;
}
if(el.nodeType&&el.nodeType==3){
return jq(el).text();
}
var str=el.getAttribute("standardistaTableSortingInnerText");
if(null!=str&&""!=str){
return str;
}
str="";
var cs=el.childNodes;
var l=cs.length;
for(var i=0;i<l;i++){
if(1==cs[i].nodeType){
str+=this.getInnerText(cs[i]);
break;
}else{
if(3==cs[i].nodeType){
str+=cs[i].nodeValue;
break;
}
}
}
el.setAttribute("standardistaTableSortingInnerText",str);
return str;
},determineSortFunction:function(itm){
var _3db=this.sortCaseInsensitive;
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)){
_3db=this.sortDate;
}
if(itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)){
_3db=this.sortDate;
}
if(itm.match(/^[�$]/)){
_3db=this.sortCurrency;
}
if(itm.match(/^\d?\.?\d+$/)){
_3db=this.sortNumeric;
}
if(itm.match(/^[+-]?\d*\.?\d+([eE]-?\d+)?$/)){
_3db=this.sortNumeric;
}
if(itm.match(/^\d[\d,]*(\.\d+)?$/)){
_3db=this.sortNumeric;
}
if(itm.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)){
_3db=this.sortIP;
}
return _3db;
},sortCaseInsensitive:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase();
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase();
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},sortDate:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]);
var bb=that.getInnerText(b.cells[that.sortColumnIndex]);
var dt1,dt2,yr=-1;
if(aa.length==10){
dt1=aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
}else{
yr=aa.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt1=yr+aa.substr(3,2)+aa.substr(0,2);
}
if(bb.length==10){
dt2=bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
}else{
yr=bb.substr(6,2);
if(parseInt(yr)<50){
yr="20"+yr;
}else{
yr="19"+yr;
}
dt2=yr+bb.substr(3,2)+bb.substr(0,2);
}
if(dt1==dt2){
return 0;
}else{
if(dt1<dt2){
return -1;
}
}
return 1;
},sortCurrency:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.getInnerText(a.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
var bb=that.getInnerText(b.cells[that.sortColumnIndex]).replace(/[^0-9.]/g,"");
return parseFloat(aa)-parseFloat(bb);
},sortNumeric:function(a,b){
var that=standardistaTableSorting.that;
var _3dc=a.cells[that.sortColumnIndex];
if(_3dc.childNodes.length>1){
var aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
aa=parseFloat(that.getInnerText(a.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(aa)){
aa=0;
}
var _3dd=b.cells[that.sortColumnIndex];
if(_3dd.childNodes.length>1){
var bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex].firstChild).replace(/\,/g,""));
}else{
bb=parseFloat(that.getInnerText(b.cells[that.sortColumnIndex]).replace(/\,/g,""));
}
if(isNaN(bb)){
bb=0;
}
return aa-bb;
},makeStandardIPAddress:function(val){
var vals=val.split(".");
for(x in vals){
val=vals[x];
while(3>val.length){
val="0"+val;
}
vals[x]=val;
}
val=vals.join(".");
return val;
},sortIP:function(a,b){
var that=standardistaTableSorting.that;
var aa=that.makeStandardIPAddress(that.getInnerText(a.cells[that.sortColumnIndex]).toLowerCase());
var bb=that.makeStandardIPAddress(that.getInnerText(b.cells[that.sortColumnIndex]).toLowerCase());
if(aa==bb){
return 0;
}else{
if(aa<bb){
return -1;
}else{
return 1;
}
}
},moveRows:function(_3de,_3df){
for(var i=0;i<_3df.length;i++){
var _3e0=_3df[i];
_3de.tBodies[0].appendChild(_3e0);
}
}};
function standardistaTableSortingInit(){
standardistaTableSorting.init();
};
Event.observe(window,"load",standardistaTableSortingInit);
var PollManager=Class.create();
PollManager.prototype={initialize:function(_3e1,_3e2,_3e3){
this.modId=_3e1;
this.pollId=_3e2;
this.results_div_id=_3e1+"_poll_results";
this.vote_form_id=_3e1+"_vote_form";
this.vote_radio_name=_3e1+"_vote";
this.hubnugget=_3e3;
},seePollVotes:function(){
this.question_HTML=$(this.results_div_id).innerHTML;
var _3e4=$H({id:this.pollId}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3e4,onFailure:reportError,onComplete:function(){
}});
},goBackAndVote:function(){
$(this.results_div_id).innerHTML=this.question_HTML;
},voteInPoll:function(){
var vote;
var hn=this.hubnugget?1:0;
var _3e5=Form.getInputs(this.vote_form_id,"radio",this.vote_radio_name).find(function(_3e6){
return _3e6.checked;
});
if(null==_3e5){
return;
}else{
vote=_3e5.value;
}
var _3e7=$H({id:this.pollId,vote:vote,hn:hn}).toQueryString();
var ajax=new Ajax.Updater({success:this.results_div_id},"/xml/pollvote.php",{parameters:_3e7,onFailure:reportError,onComplete:function(){
}});
}};
var PollManagerManager=Class.create();
PollManagerManager.prototype={initialize:function(){
this.pollManagers=[];
},add:function(id,pm){
this.pollManagers[id]=pm;
},getById:function(id){
return this.pollManagers[id];
}};
var pmm=new PollManagerManager();
var ContentRotator=Class.create();
ContentRotator.prototype={initialize:function(ids,_3e8,_3e9,_3ea,_3eb,_3ec,_3ed,_3ee,_3ef,loop,_3f0){
this.ids=ids;
this.prefix=_3e8;
this.interval=_3e9;
this.position=0;
this.paused=false;
this.transitionEffect=_3ea;
this.transitioning=false;
this.updateFunction=null;
if(_3f0!==undefined&&jq(_3f0).length>0){
this.navButtons=jq(_3f0);
this.firstButton=this.navButtons.find("li").first();
this.firstButton.find("a").addClass("active");
this.renderNavButtons.bind(this);
this.renderNavButtons();
}
this.activeUpdateThreadId=0;
this.fadeTransition=false;
if(_3eb){
this.playId=_3eb;
}
if(_3ec){
this.pauseId=_3ec;
}
if(_3ed){
this.positionIndicatorId=_3ed;
}
if(this.interval>0){
setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
if(_3ee){
this.prevId=_3ee;
}
if(_3ef){
this.nextId=_3ef;
}
if(loop==undefined||loop){
this.loop=true;
}else{
this.loop=false;
}
},renderNavButtons:function(){
var _3f1=this.firstButton,_3f2=_3f1.find("a"),self=this,_3f3=this.position;
_3f2.data("position",_3f3);
_3f2.click(function(e){
e.preventDefault();
self.seek(jq(this).data("position"));
});
for(var i=1,l=this.ids.length;i<l;i++){
var _3f4=_3f1.clone(true),_3f5=++_3f3,_3f6=_3f4.find("a");
_3f6.attr("id","button_"+_3f5);
_3f6.removeClass("active");
_3f6.data("position",_3f5);
self.navButtons.append(_3f4);
}
},update:function(_3f7){
if(this.paused||this.activeUpdateThreadId!=_3f7){
return;
}
this.next();
this.updateFunction=setTimeout(this.update.bind(this,_3f7),this.interval);
},pause:function(){
if($(this.pauseId)){
$(this.pauseId).hide();
}
if($(this.playId)){
$(this.playId).show();
}
this.paused=true;
},play:function(){
if($(this.pauseId)){
$(this.pauseId).show();
}
if($(this.playId)){
$(this.playId).hide();
}
this.paused=false;
this.activeUpdateThreadId++;
this.update(this.activeUpdateThreadId);
},endTransition:function(){
this.transitioning=false;
},seek:function(_3f8){
var next=this.position<_3f8,_3f9=_3f8%this.ids.length;
while(_3f9<0){
_3f9+=this.ids.length;
}
if(this.position==_3f9){
return;
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).removeClassName("active");
}
if(this.transitionEffect>0){
if(this.transitioning){
if(next){
setTimeout(this.next.bind(this),400);
}else{
setTimeout(this.previous.bind(this),400);
}
return;
}
this.transitioning=true;
var _3fa=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
_3fa.toggle();
this.position=_3f9;
if(this.fadeTransition){
var _3fb=new fx.Opacity(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}else{
var _3fb=new fx.Height(this.prefix+this.ids[this.position],{duration:this.transitionEffect});
}
if(window.ActiveXObject){
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible"});
$(this.prefix+this.ids[this.position]).style.removeAttribute("filter");
}else{
$(this.prefix+this.ids[this.position]).setStyle({display:"inline",visibility:"visible",opacity:1});
}
_3fb.options.onComplete=this.endTransition.bind(this);
_3fb.hide();
_3fb.toggle();
}else{
$(this.prefix+this.ids[this.position]).hide();
this.position=_3f9;
$(this.prefix+this.ids[this.position]).show();
}
if(this.positionIndicatorId){
$(this.positionIndicatorId+"_"+this.position).addClassName("active");
}
if(!this.loop){
$(this.nextId).removeClassName("disabled");
$(this.prevId).removeClassName("disabled");
if(this.position==this.ids.length-1){
$(this.nextId).addClassName("disabled");
}
if(this.position==0){
$(this.prevId).addClassName("disabled");
}
}
this.selectCurrentButton(_3f8);
},next:function(){
this.seek(this.position+1);
},previous:function(){
this.seek(this.position-1);
},selectCurrentButton:function(_3fc){
if(this.navButtons){
clearTimeout(this.updateFunction);
if(this.interval>0){
this.updateFunction=setTimeout(this.update.bind(this,this.activeUpdateThreadId),this.interval);
}
this.navButtons.find("a[id^=button]").removeClass("active");
jq("#button_"+(_3fc%this.ids.length)).addClass("active");
}
}};
var FeedManager=Class.create();
FeedManager.prototype={initialize:function(_3fd,_3fe,_3ff,_400,_401){
this.typeId=_3fd;
this.categoryId=_3fe;
this.userId=_401;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.standalone=_400;
this.updateTime=_3ff;
this.originalUpdateTime=_3ff;
this.currentTime=parseInt(_3ff,10);
this.reportingFeedStoryId=0;
this.hiddenCount=0;
this.handlers=[];
this.feedItems=[];
this.feedItemCollection=[];
jq(".feed_interact_link").live("click",function(_402){
_402.preventDefault();
jq(this).closest(".options").prevAll(".feed_interact").show();
return false;
});
if(!this.standalone){
Event.observe(window,"load",function(){
if(browser=="IE"&&version<=6){
$("old_browser").show();
}
this.updateFeedTypeFilters();
$$("#sidebar .cat").each(function(elt){
if(elt.hasClassName("disabled")){
return;
}
elt.observe("mouseover",function(){
elt.addClassName("active_category");
elt.down(".delete_category").show();
});
elt.observe("mouseout",function(){
elt.removeClassName("active_category");
elt.down(".delete_category").hide();
});
});
this.newStoriesAvailable=0;
this.updaterFibonacciValue=60000;
this.updaterFibonacciValue2=60000;
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this));
}
setInterval(this.updateTimes.bind(this),60000);
},updateTimes:function(){
this.currentTime+=60;
$$(".timestamp").each(function(elt){
var _403=0;
elt.classNames().each(function(name){
if(name.substring(0,2)=="t_"){
_403=parseInt(name.substring(2),10);
throw $break;
}
});
elt.innerHTML=this.getTimeAgo(this.currentTime-_403);
}.bind(this));
},getTimeAgo:function(_404){
if(_404<=1){
return "1 second ago";
}
var _405=Math.round(_404/60);
var _406=Math.round(_404/3600);
var days=Math.round(_404/86400);
var _407=Math.round(_404/604800);
var _408=Math.round(_404/2592000);
var _409=Math.round(_404/31536000);
var ret="";
if(_409>=2){
ret=_409+" years ago";
}else{
if(_408>=2){
ret=_408+" months ago";
}else{
if(_407>=2){
ret=_407+" weeks ago";
}else{
if(days>=2){
ret=days+" days ago";
}else{
if(_406>=2){
ret=_406+" hours ago";
}else{
if(_405>=1){
ret=_405+" minute"+(_405==1?"":"s")+" ago";
}else{
ret=_404+" second"+(_404==1?"":"s")+" ago";
}
}
}
}
}
}
return ret;
},fibonacciUpdate:function(){
var _40a=this.updaterFibonacciValue+this.updaterFibonacciValue2;
this.updaterFibonacciValue=this.updaterFibonacciValue2;
this.updaterFibonacciValue2=_40a;
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:0,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId}).toQueryString(),onComplete:function(req){
var _40b=parseInt(req.responseText,10);
if(_40b>0){
this.newStoriesAvailable=_40b;
this.updateStoriesAvailable();
}
setTimeout(this.fibonacciUpdate.bind(this),this.updaterFibonacciValue);
}.bind(this)});
},updateStoriesAvailable:function(){
if(this.newStoriesAvailable==0){
$("new_stories_available").innerHTML="";
return;
}
var _40c=this.newStoriesAvailable==1?"y":"ies";
var is=this.newStoriesAvailable==1?"is":"are";
$("new_stories_available").innerHTML="at least "+this.newStoriesAvailable+" new stor"+_40c+" "+is+" available (click to load)";
},loadNewStories:function(_40d){
var nt=_40d?_40d:0;
$("loading_feed").show();
new Ajax.Request("/xml/feedupdate.php",{parameters:$H({render:1,a:this.updateTime,typeId:this.typeId,cId:this.categoryId,userId:this.userId,nt:nt}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
this.updateTime=data["utime"];
var _40e=$(document.createElement("div"));
_40e.addClassName("feed_item");
_40e.innerHTML=data["render"];
var _40f=$("feed_box").down(".feed_item",0);
_40f.parentNode.insertBefore(_40e,_40f);
_40e.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
eval(elt.innerHTML);
}
});
this.addItems(data["feedData"]);
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
this.updaterFibonacciValue=30000;
this.updaterFibonacciValue2=30000;
this.newStoriesAvailable=0;
this.updateStoriesAvailable();
$("loading_feed").hide();
}.bind(this)});
return false;
},userFanJoin:function(u){
$("loading_feed").show();
new Ajax.Request("/xml/fan.php",{parameters:"u="+u+"&action=add",onComplete:function(req){
var info=JSONstring.toObject(req.responseText);
$("loading_feed").hide();
var _410=$(document.createElement("div"));
_410.addClassName("feed_item");
_410.innerHTML="<h2 class=\"feed_heading\">You are now following <a href=\""+info["url"]+"\">"+info["username"]+"</a>.</h2>";
var _411=$("feed_box").down(".feed_item",0);
_411.parentNode.insertBefore(_410,_411);
var li=$("suggested_author_"+u);
var ul=li.up("ul");
li.remove();
if(ul.immediateDescendants().size()==0){
new Ajax.Updater("suggested_author_box","/xml/fan.php",{parameters:"action=suggest&c="+this.categoryId});
}
}.bind(this)});
return false;
},categoryFanJoin:function(){
categoryFanBulkJoin("feed_category_fans",false,false,true,this.categoryFanCallback.bind(this));
$("loading_feed").show();
$("category_fan_search").innerHTML="";
$("category_fan_search_text").value="";
return false;
},categoryFanCallback:function(rsp){
var info=JSONstring.toObject(rsp);
if(info.length>0){
if(this.categoryId||this.typeId){
$("loading_feed").hide();
$A(info).each(function(data){
var _412=$(document.createElement("div"));
_412.addClassName("feed_item");
_412.innerHTML="<h2 class=\"feed_heading\">You are now following the topic <a href=\"/feed/all/"+data["id"]+"\">"+data["name"]+"</a>.</h2>";
var _413=$("feed_box").down(".feed_item",0);
_413.parentNode.insertBefore(_412,_413);
});
}else{
this.loadNewStories(info.length);
}
$A(info).each(function(data){
jq("#hc_"+data["id"]).remove();
});
}else{
$("loading_feed").hide();
var _414=$(document.createElement("div"));
_414.addClassName("feed_item");
_414.innerHTML="<h2 class=\"feed_heading\">You were already a fan of that topic or topics.</h2>";
var _415=$("feed_box").down(".feed_item",0);
_415.parentNode.insertBefore(_414,_415);
return;
}
var _416=$("category_filters");
if(!_416){
var _417=$(document.createElement("div"));
_417.addClassName("feed_setting_box");
_417.innerHTML="<h3>Filter By Topic</h3><ul id=\"category_filters\" class=\"feed_filter\"><li class=\"all active\">All Topics</li></ul>";
jq("#find_feed_topics").after(_417);
var _416=$("category_filters");
}
$A(info).each(function(data){
var li=$(document.createElement("li"));
li.id="category_filter_"+data["id"];
li.addClassName("cat");
li.innerHTML="<a class=\"delete_category\" onclick=\"return fm.deleteCategory("+data["id"]+",'"+data["name"]+"');"+"\" style=\"display: none;\" href=\"#\">delete</a>";
li.innerHTML+="<a href=\"/feed/all/"+data["id"]+"\" title=\""+data["path"]+"\">"+data["name"]+"</a>";
_416.appendChild(li);
li.observe("mouseover",function(){
li.addClassName("active_category");
li.down(".delete_category").show();
});
li.observe("mouseout",function(){
li.removeClassName("active_category");
li.down(".delete_category").hide();
});
});
},readMore:function(_418,type,id){
new Ajax.Updater(_418,"/xml/readmore.php",{parameters:$H({id:id,type:type}).toQueryString()});
return false;
},makeGrowable:function(id,_419,_41a,_41b){
makeGrowable(id,_419,_41a,_41b);
},makeExpandable:function(id,_41c,_41d,_41e,_41f){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
var anc=elt.closest("div");
ancId=anc.attr("id");
if(ancId==""||!anc.hasClass("feed_interact")){
makeExpandable(id,_41c,_41d,_41e,null,_41f);
return;
}
elt.addClass("expandable_text dimmed").val(_41c).data("hasFocus",false);
function _420(){
anyHasFocus=false;
anc.find("input, textarea").each(function(_421,elt){
if(jq(elt).data("hasFocus")){
anyHasFocus=true;
return false;
}
});
return !anc.data("mouseInside")&&!anyHasFocus&&elt.val()=="";
};
function _422(){
if(_420()){
if(!_41e){
elt.css({height:""}).closest("div").removeClass("expanded");
}
elt.addClass("dimmed").val(_41c);
}
};
elt.bind("focus",function(){
if(!anc.hasClass("expanded")){
anc.addClass("expanded");
updateFollowCheckbox.apply(this);
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_41d)=="function"){
_41d.apply(this);
}
});
jq("#"+ancId+" input, #"+ancId+" textarea").live("blur",function(){
jq(this).data("hasFocus",false);
_422();
}).live("focus",function(){
jq(this).data("hasFocus",true);
});
anc.bind("mouseenter",function(){
anc.data("mouseInside",true);
});
anc.bind("mouseleave",function(){
anc.data("mouseInside",false);
_422();
});
},addItems:function(feed){
feed.each(function(item){
var fi=new FeedItemManager(item["id"],item["fid"],item["date"],item["hidden"],this);
this.feedItems[item["id"]]=fi;
this.feedItemCollection.push(fi);
if(!item["temporary"]){
if(item["hidden"]){
this.hiddenCount++;
}else{
if(!this.standalone){
fi.hideMenuObserve();
}
}
}
}.bind(this));
if(!this.standalone){
this.updateHiddenLink();
}
},addHandler:function(name,h){
h.ensureSignedInBeforeSave=true;
this.handlers[name]=h;
},getHandler:function(name){
return this.handlers[name];
},saveForm:function(_423){
this.getHandler(_423).save();
return false;
},addStoryToTop:function(_424,id,_425){
var _426=$(document.createElement("div"));
_426.innerHTML=_424;
_426.addClassName("feed_item");
var _427=$("feed_box").down(".feed_item",0);
_427.parentNode.insertBefore(_426,_427);
_426.descendants().each(function(elt){
if(elt.tagName=="SCRIPT"){
safeScriptEval(elt);
}
});
this.addItems(new Array({id:id,fid:id,date:0,hidden:0,temporary:1}));
var _428=new fx.Color(_426,{duration:1600,fromColor:"#feffd7",toColor:"#ffffff",onComplete:(_425?_425:function(){
})});
_428.toggle();
updateFollowButtons();
},shrinkStatus:function(){
photoGalleryInserter.instance().close();
var s=$("status");
s.value="What's on your mind?";
s.addClassName("dimmed");
$$("#status_update input[type=checkbox]")[0].checked=false;
$$("#status_update .photo_preview")[0].innerHTML="";
$$("#status_update input[name=imageId]")[0].value=0;
$("status_wrapper").removeClassName("expanded");
var _429=new fx.Height("status_wrapper",{duration:400,toHeight:23,onComplete:function(){
$("status_wrapper").setStyle({height:"auto"});
$("tabcontent_feed_top_0").removeClassName("expanded");
}});
_429.toggle();
},shrinkQuestion:function(data){
photoGalleryInserter.instance().close();
$("question_errors").innerHTML="";
if(data["limitReached"]){
$("tabcontent_feed_top_1").innerHTML="<h2>You have reached your daily limit for asking questions.</h2>";
}else{
var _42a=new fx.Height("question_wrapper",{duration:800,toHeight:31,onComplete:function(){
jq("#category").hpCategorySelector("chooseCategory",0);
$("categorySearchResults").innerHTML="";
Form.reset($("question_form"));
var _42b=$("question");
_42b.value="What is your question?";
_42b.setStyle({"color":"#777"});
$("q_numcharsvalue").innerHTML=100;
$("ad_numcharsvalue").innerHTML=600;
$("question_counter").hide();
$$(".feed #question_label")[0].hide();
$("requestSuggestions").hide();
$("confirmquestion").hide();
$("requestSuggestionsButton").show();
$("question_details").hide();
selectTab("categoryTabs",1,2);
subFlg=false;
$("question_wrapper").setStyle({height:"auto"});
$$("#question_details input[type=checkbox]")[0].checked=false;
$$("#question_details .photo_preview")[0].innerHTML="";
$$("#question_details input[name=imageId]")[0].value=0;
}});
_42a.toggle();
}
},forumShrink:function(){
photoGalleryInserter.instance().close();
var _42c=new fx.Height("forum_wrapper",{duration:600,toHeight:22,onComplete:function(){
$("forum_msg").innerHTML="";
$("forum_details").hide();
var _42d=$("subject");
var _42e=$("message");
_42d.setStyle({"color":"#777"});
_42d.value="What is the subject of your forum post?";
_42e.value="";
jq("#feed_forum_selector").hpForumSelector("chooseForum",0);
$("forum_wrapper").setStyle({height:"auto"});
jq("#forum_errors").hide();
jq("#subject_label").hide();
jq("#subject_counter").hide();
$$("#forum_details input[type=checkbox]")[1].checked=false;
$$("#forum_details .photo_preview")[0].innerHTML="";
$$("#forum_details input[name=imageId]")[0].value=0;
}});
_42c.toggle();
},forumCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
fm.addStoryToTop(data["render"],data["id"],this.forumShrink.bind(this));
}else{
if(data["msg"]){
$("forum_msg").innerHTML=data["msg"];
}
}
},statusCallback:function(req){
var data=JSONstring.toObject(req.responseText);
sId=data["id"].substring(7);
linkId="delete_status_"+sId;
removeHtml="<a href=\"#\" id=\""+linkId+"\" title=\"delete this status update\">[delete]</a>";
fm.addStoryToTop(data["render"]+removeHtml,data["id"],this.shrinkStatus.bind(this));
jq("#"+linkId).click(deleteStatus);
},questionCallback:function(req){
var data=JSONstring.toObject(req.responseText);
this.addStoryToTop(data["render"],data["id"],this.shrinkQuestion.bind(this,data));
},moreFeed:function(_42f){
new Ajax.Request("/xml/feedmore.php",{parameters:$H({b:this.originalUpdateTime,startpos:_42f,typeId:this.typeId,userId:this.userId,categoryId:this.categoryId,sa:this.standalone?1:0,mobile:this.mobile?1:0}).toQueryString(),onComplete:function(req){
var _430=JSONstring.toObject(req.responseText);
var _431=$("show_more");
_431.style.display="none";
_431.id="";
var _432=$(document.createElement("div"));
$("feed_box").appendChild(_432);
_432.innerHTML=_430["render"];
var _433=$("feed_more_"+_42f);
$$("#feed_more_"+_42f+" script").each(function(_434){
safeScriptEval(_434);
});
this.addItems(_430["feed"]);
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}.bind(this)});
return false;
},updateHiddenLink:function(){
if(this.hiddenCount==1){
$("show_hidden").innerHTML="show 1 hidden story";
}else{
if(this.hiddenCount>0){
$("show_hidden").innerHTML="show "+this.hiddenCount+" hidden stories";
}else{
$("show_hidden").innerHTML="";
}
}
},getById:function(id){
return this.feedItems[id];
},stopReporting:function(){
if(this.reportingFeedStoryId){
this.getById(this.reportingFeedStoryId).stopObservePostReporting();
this.reportingFeedStoryId=0;
}
},unhideAll:function(){
this.feedItemCollection.each(function(fi){
fi.unhide();
});
this.updateHiddenLink();
return false;
},unhideUser:function(_435){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({u:_435,del:1}).toQueryString(),onComplete:function(){
$$(".u"+_435).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _436=this.getById(fid);
if(_436){
_436.unhide(true);
}
}
}.bind(this));
var hu=$("hu_"+_435);
if(hu){
if(hu.siblings().size()==0){
var _437=$("hidden_people");
if(!($("hidden_topics"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_437.parentNode.insertBefore(p,_437);
}
_437.remove();
}else{
hu.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},unhideCategory:function(_438){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({c:_438,del:1}).toQueryString(),onComplete:function(){
$$(".c"+_438).each(function(elt){
if(elt.id){
var fid=elt.id.substring(elt.id.indexOf("_")+1);
var _439=this.getById(fid);
if(_439){
_439.unhide(true);
}
}
}.bind(this));
var hc=$("hc_"+_438);
if(hc){
if(hc.siblings().size()==0){
var _43a=$("hidden_topics");
if(!($("hidden_people"))){
var p=$(document.createElement("p"));
p.innerHTML="All people and topics are visible.";
_43a.parentNode.insertBefore(p,_43a);
}
_43a.remove();
}else{
hc.remove();
}
}
this.updateHiddenLink();
}.bind(this)});
return false;
},toggleEditHidden:function(){
var val=$("edit_hidden").innerHTML;
if(val=="done editing"){
$("edit_hidden").innerHTML="edit";
$("hidden_list").hide();
}else{
$("edit_hidden").innerHTML="done editing";
if($("hidden_list").innerHTML==""){
this.updateHiddenList(true);
}else{
$("hidden_list").show();
}
}
return false;
},updateHiddenList:function(show){
new Ajax.Updater("hidden_list","/xml/feedhide.php",{parameters:"list=1",onComplete:function(){
if(show){
$("hidden_list").show();
}
}});
},closeOverlay:function(){
this.stopReporting();
toggleOverlay("overlay");
var _43b=$("overlay");
_43b.classNames().each(function(name){
if(name!="overlay"){
_43b.removeClassName(name);
}
});
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
$("overlay").setStyle({paddingTop:"0"});
return false;
},openOverlay:function(_43c){
if(_43c){
$("overlay").addClassName(_43c);
}
adjustOverlayHeight();
toggleOverlay("overlay");
},showHelpOverlay:function(url){
this.openOverlay("help");
new Ajax.Updater("overlay_content","/xml/staticpage.php?url="+url);
return false;
},showQuestionOverlay:function(id){
this.openOverlay("hubpage");
new Ajax.Updater("overlay_content","/xml/answersrender.php?id="+id,{evalScripts:true,onComplete:function(){
var _43d=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_43d+"px"});
}
adjustOverlayHeight();
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:1,objectId:id,printNumbers:true},success:function(data){
jQuery("#follow_"+id).replaceWith(data);
}});
jQuery.ajax({url:"http://platform.twitter.com/widgets.js",dataType:"script",cache:true});
}.bind(this)});
return false;
},showImageOverlay:function(url){
jq.fancybox({type:"image",href:url});
return false;
},showHubOverlay:function(url){
this.openOverlay("hubpage");
new Ajax.Request("/xml/articlerender.php?url="+url,{onComplete:function(req){
var _43e=0;
$("overlay_content").innerHTML=req.responseText;
var _43f=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_43f+"px"});
}
adjustOverlayHeight();
$$("#overlay_content script").each(function(_440){
var code=_440.innerHTML;
eval(code);
});
}.bind(this)});
return false;
},reportPost:function(_441){
this.openOverlay("postreport");
new Ajax.Updater("overlay_content","/xml/reportpostrender.php?p="+_441,{evalScripts:true});
return false;
},reportPostCallback:function(){
$("overlay_content").innerHTML="<h2>The post has been flagged. Thanks for your input!</h2>";
},deleteCategory:function(_442,_443){
var sure=confirm("Are you sure that you want to stop following "+_443+"?");
if(!sure){
return false;
}
var ajax=new Ajax.Request("/xml/categoryFanBulkJoin.php",{parameters:$H({checked_ids:"",unchecked_ids:_442,html_target:"feed_category_fans"}).toQueryString(),onSuccess:function(){
$("category_filter_"+_442).remove();
}});
return false;
},updateFeedTypeFilters:function(){
var _444=$A(["hubs","comments","posts","questions","answers","fans","milestones"]);
_444.each(function(type){
var _445=false;
$$("#type_filters li."+type+" input.ht_box").each(function(_446){
if(_446.checked){
_445=true;
throw $break;
}
});
var li=$("type_filters").down("li."+type);
if(li){
if(_445){
li.removeClassName("inactive");
}else{
li.addClassName("inactive");
li.hide();
}
}
});
},showFeedSettings:function(){
jq("#feed_settings").show().effect("highlight",{color:"#fffdcc"},1000);
jq("#view_feed_settings").html("hide filters &laquo;");
var _447=jq("#edit_button");
if(_447.html()=="edit"){
this.toggleFeedPrefs();
}
var _448=jq("#edit_prefs").parent().offset().top-10;
setElementScreenTop(_448);
return false;
},toggleFeedPrefs:function(){
var _449=$("edit_button");
var _44a=$("filter").value;
var _44b="edit";
if(_449.innerHTML=="save"){
_44b="save";
}
if(_44b=="save"){
this.updateFeedTypeFilters();
var _44c=0;
var _44d=$$(".ht_box");
for(var j=0;j<_44d.length;j++){
if(_44d[j].checked){
_44c+=Number(_44d[j].name.substr(3));
}
}
var _44e=$("current_prefs");
if(_44c!=_44e.value){
var ajax=new Ajax.Request("/xml/activityPref.php",{parameters:$H({prefs:_44c,filter:_44a,feed:1}).toQueryString(),onComplete:function(){
Element.update(_449,"edit");
var pf=$("preference_feedback");
pf.update("<span class=\"changes_saved\">Saved</span>. Changes take effect going forward. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _44f=parseInt(pf.getStyle("height"));
var _450=new fx.Height("preference_feedback",{duration:600});
_450.hide();
_450.custom(0,_44f);
}});
_44e.value=_44c;
}else{
Element.update(_449,"edit");
var pf=$("preference_feedback");
pf.update("No changes were made. <a href=\"#\" id=\"preference_change_hide\" onclick=\"$('preference_feedback').hide(); return false;\">hide</a>");
pf.setStyle({height:""});
pf.show();
var _451=parseInt(pf.getStyle("height"));
var _452=new fx.Height("preference_feedback",{duration:600});
_452.hide();
_452.custom(0,_451);
}
}
var curs=$$(".ht_cur");
var _453="";
for(var i=0;i<curs.length;i++){
_453=curs[i].className;
}
var eles=$$(".ht_pref");
for(var i=0;i<eles.length;i++){
if(_44b=="edit"){
if(_453=="ht_all ht_cur"){
eles[i].style.display="block";
}else{
if(eles[i].parentNode.className==_453){
eles[i].style.display="block";
}
}
}else{
eles[i].style.display="none";
}
}
if(_44b=="edit"){
_449.innerHTML="save";
$("preference_feedback").hide();
$$("#type_filters li.inactive").each(function(elt){
elt.show();
});
}
return false;
}};
var FeedItemManager=Class.create();
FeedItemManager.prototype={initialize:function(id,fid,_454,_455,_456){
this.id=id;
this.feedItemId=fid;
this.cdate=_454;
this.hidden=_455;
this.manager=_456;
this.menuVisible=0;
this.mobile=navigator.userAgent.toLowerCase().indexOf("mobile")>-1;
this.share_button_disabled=false;
this.mouseoverHandlers=new Array();
this.mouseoutHandlers=new Array();
this.clickHandlers=new Array();
this.prefix="story_";
this.htmlId=this.prefix+this.id;
this.triggerId="menu_trigger_"+this.id;
this.hideId="menu_"+this.id;
this.mainId="hide_menu_"+this.id;
this.messageId="message_"+this.id;
this.hideMessageId="hide_message_"+this.id;
this.likeId="feed_like_"+this.id;
},unhide:function(_457){
if(!$(this.htmlId).hasClassName("hidden")){
return;
}
$(this.htmlId).removeClassName("hidden");
this.manager.hiddenCount--;
if(_457){
this.hidden=0;
this.hideMenuObserve();
}
},hideMenuObserve:function(){
if(!this.mobile){
Event.observe(this.htmlId,"mouseover",this.showHideMenu.bindAsEventListener(this));
Event.observe(this.htmlId,"mouseout",this.hideHideMenu.bindAsEventListener(this));
Event.observe(this.triggerId,"mouseover",function(){
$(this.hideId).show();
}.bind(this));
Event.observe(this.triggerId,"mouseout",function(){
$(this.hideId).hide();
}.bind(this));
Event.observe(this.triggerId,"click",function(_458){
if(Event.element(_458).hasClassName("menu_trigger")){
this.hideStory();
}
}.bind(this));
}
$(this.hideId).immediateDescendants().each(function(elt){
elt=$(elt);
var _459=elt.immediateDescendants().detect(function(c){
return c.tagName=="UL";
});
if(_459){
elt.observe("mouseover",function(_45a){
_45a.show();
}.bind(this,_459));
elt.observe("mouseout",function(_45b){
_45b.hide();
}.bind(this,_459));
}
});
$(this.hideId).descendants().each(function(elt){
elt=$(elt);
if(elt.tagName=="LI"){
elt.observe("mouseover",function(){
if(!elt.hasClassName("active")){
elt.addClassName("active");
}
});
elt.observe("mouseout",function(){
if(elt.hasClassName("active")){
elt.removeClassName("active");
}
});
}
});
},showHideMenu:function(e){
if(!this.hidden&&!this.menuVisible){
this.menuVisible=1;
$(this.mainId).show();
}
},hideHideMenu:function(e){
if(this.menuVisible){
this.menuVisible=0;
$(this.mainId).hide();
}
},share:function(_45c){
if(_45c===undefined){
_45c=false;
}
if(_45c){
var _45d=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_45d){
return false;
}
}
check_signed_in_ajax(this.doShare.bind(this));
return false;
},doShare:function(_45e,_45f){
if(_45e){
if(!this.share_button_disabled){
this.share_button_disabled=true;
new Ajax.Updater("share_"+this.id,"/xml/feedshare.php",{parameters:$H({id:this.feedItemId,d:this.cdate}).toQueryString(),onComplete:function(){
$(this.messageId).innerHTML="This story has been shared with your followers.";
}.bind(this)});
if(_45f){
toggleOverlay("feedSignUp");
}
setTimeout(function(){
this.share_button_disabled=false;
},4000);
}
}else{
suFH.onSuccess=this.doShare.bind(this,true,true);
siFH.onSuccess=this.doShare.bind(this,true,true);
fetchRecaptcha("feedCaptcha");
toggleOverlay("feedSignUp");
}
},hide:function(){
this.manager.hiddenCount++;
this.hidden=1;
$(this.htmlId).addClassName("hidden");
},hideStory:function(){
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.feedItemId}).toQueryString(),onComplete:function(){
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _460=$(this.htmlId);
_460.parentNode.insertBefore(hmsg,_460);
}
hmsg.innerHTML="Story hidden";
jq("#"+this.hideMessageId).delay(2500).fadeOut(1000);
this.hide();
this.manager.updateHiddenLink();
}.bind(this)});
return false;
},removeHideMessage:function(){
$(this.hideMessageId).remove();
return false;
},hideUser:function(_461,_462){
_462=_462?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,userId:_461,force:_462}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _463=$(this.htmlId);
_463.parentNode.insertBefore(hmsg,_463);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".u"+_461).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
}.bind(this)});
return false;
},hideCategory:function(_464,_465){
_465=_465?1:0;
new Ajax.Request("/xml/feedhide.php",{parameters:$H({id:this.id,force:_465,categoryId:_464}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
var hmsg=$(this.hideMessageId);
if(!hmsg){
var hmsg=$(document.createElement("div"));
hmsg.id=this.hideMessageId;
hmsg.addClassName("hide_notice");
var _466=$(this.htmlId);
_466.parentNode.insertBefore(hmsg,_466);
}
hmsg.innerHTML=data["msgHtml"];
if(data["success"]){
$$(".c"+_464).each(function(elt){
eltId=elt.id.substring(this.prefix.length);
this.manager.getById(eltId).hide();
}.bind(this));
this.manager.updateHiddenLink();
this.manager.updateHiddenList();
}
if(data["ids"]){
$A(data["ids"]).each(function(id){
if($("category_filter_"+id)){
$("category_filter_"+id).remove();
}
});
}
}.bind(this)});
return false;
},hidePreviousPosts:function(){
var _467=$("feed_posts_"+this.id).immediateDescendants();
var _468=_467.size();
_467.each(function(elt,_469){
if(_469==_468-1){
elt.show();
}else{
elt.remove();
}
}.bind(this));
return false;
},hidePreviousComments:function(){
var _46a=$("feed_comments_"+this.id).immediateDescendants();
var _46b=_46a.size();
var _46c=0;
_46a.each(function(elt,_46d){
if(elt.hasClassName("show_previous")){
_46c=_46d;
}
});
_46a.each(function(elt,_46e){
if(_46e==_46c){
elt.show();
throw $break;
}else{
elt.remove();
}
}.bind(this));
return false;
},seePreviousPosts:function(_46f,num,_470){
new Ajax.Request("/xml/moreposts.php",{parameters:$H({uid:this.id,t:_46f,num:num,startpos:_470}).toQueryString(),onComplete:function(req){
var _471=$("feed_posts_"+this.id);
_471.down("div").hide();
new Insertion.Top(_471,req.responseText);
}.bind(this)});
return false;
},seePreviousFeedComments:function(num,_472){
new Ajax.Request("/xml/morefeedcomments.php",{parameters:$H({fid:this.feedItemId,id:this.id,num:num,startpos:_472}).toQueryString(),onComplete:function(req){
var _473=$("feed_comments_"+this.id);
_473.down("div").hide();
new Insertion.Top(_473,req.responseText);
}.bind(this)});
return false;
},seePreviousComments:function(_474,num,_475){
new Ajax.Request("/xml/morecomments.php",{parameters:$H({uid:this.id,mdcId:_474,num:num,startpos:_475}).toQueryString(),onComplete:function(req){
var _476=$("feed_comments_"+this.id);
_476.down("div").hide();
new Insertion.Top(_476,req.responseText);
}.bind(this)});
return false;
},commentCallback:function(req){
data=JSONstring.toObject(req.responseText);
var _477=$("feed_comments_"+this.id);
_477.innerHTML+=data["render"];
jq("#comment_"+this.id).val("").blur();
},answerCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("answer_interact_"+this.id).innerHTML=data["msg"];
$("answers_"+this.id).innerHTML=data["c"]+" answer"+(data["c"]==1?"":"s");
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},postCallback:function(req){
var data=JSONstring.toObject(req.responseText);
if(data["valid"]){
$("server_error_"+this.id).innerHTML="";
$("new_posts_"+this.id).innerHTML+=data["render"];
jq("#post_"+this.id).val("").blur();
}else{
$("server_error_"+this.id).innerHTML="<span class=\"alert\">"+data["msg"]+"</span>";
}
},activatePost:function(elt){
elt.addClassName("feed_post_active");
},deactivatePost:function(elt){
elt.removeClassName("feed_post_active");
},observePostReporting:function(_478){
this.manager.stopReporting();
this.manager.reportingFeedStoryId=this.id;
var _479=$$("#story_"+this.id+" .feed_post");
if(_479.size()>1){
_479.each(function(elt){
var _47a=this.postIdFromDivId(elt.id);
elt.setStyle({cursor:"pointer"});
var _47b=this.activatePost.bind(this,elt);
this.mouseoverHandlers[_47a]=_47b;
elt.observe("mouseover",_47b);
var _47c=this.deactivatePost.bind(this,elt);
this.mouseoutHandlers[_47a]=_47c;
elt.observe("mouseout",_47c);
var _47d=this.manager.reportPost.bind(this.manager,_47a);
this.clickHandlers[_47a]=_47d;
elt.observe("click",_47d);
}.bind(this));
var msg=$(document.createElement("p"));
msg.appendChild(document.createTextNode("Click on the post that you want to report or "));
var _47e=$(document.createElement("a"));
_47e.innerHTML="cancel report";
_47e.href="#";
msg.appendChild(_47e);
var _47f=$(this.messageId);
_47f.innerHTML="";
_47f.appendChild(msg);
_47f.addClassName("report_instructions");
var _480=parseInt(_47f.getStyle("height"));
var _481=new fx.Height(this.messageId,{duration:500});
_481.hide();
_481.custom(0,_480);
_47e.observe("click",this.stopObservePostReporting.bind(this));
}else{
if(_479.size()==1){
var post=_479.detect(function(elt){
return true;
});
var _482=post.id;
this.manager.reportPost(this.postIdFromDivId(_482));
}
}
return false;
},postIdFromDivId:function(_483){
return _483.substring(_483.lastIndexOf("_")+1);
},stopObservePostReporting:function(_484){
var _485=$$("#story_"+this.id+" .feed_post");
if(_485.size()>1){
_485.each(function(elt){
elt.setStyle({cursor:"auto"});
this.deactivatePost(elt);
var _486=this.postIdFromDivId(elt.id);
elt.stopObserving("mouseover",this.mouseoverHandlers[_486]);
elt.stopObserving("mouseout",this.mouseoutHandlers[_486]);
elt.stopObserving("click",this.clickHandlers[_486]);
}.bind(this));
}
$(this.messageId).innerHTML="";
$(this.messageId).removeClassName("report_instructions");
$(this.messageId).setStyle({height:""});
if(_484){
Event.stop(_484);
}
}};
function updateFollowCheckbox(){
var key=jq(this).attr("data-key");
if(key){
var id=jq(this).attr("data-id");
data={};
data[key]=id;
if(jq(this).next(".follow").size()==0){
jq(this).after("<span class=\"follow\"></span>");
}
jq(this).next(".follow").html("").css("height","0px").load("/xml/get_follow_checkbox.php",data,function(){
if(jq(this).html()!=""){
jq(this).css("height","auto");
}
});
}
};
function deleteStatus(_487){
link=jq(_487.target);
id=link.attr("id").substring(14);
jq.post("/xml/status.php",{del:id},function(){
link.prev("div").remove();
link.remove();
});
return false;
};
var mm;
function mapsManager(){
this.maps=[];
};
mapsManager.prototype.addMap=function(id,map){
this.maps[id]=map;
map.id=id;
};
mapsManager.prototype.getMapById=function(id){
return this.maps[id];
};
function markerMap(m,_488,tmId,usId){
this.map=m;
this.markers=[];
this.infowindow=new google.maps.InfoWindow();
this.polyline=new google.maps.Polyline({clickable:false,strokeColor:"#0000ff",strokeWeight:5,strokeOpacity:0.7});
this.polyline.setMap(m);
this.directionsResult=null;
this.legend=$(_488);
this.travelModeId=tmId;
this.unitSystemId=usId;
this.id=null;
};
markerMap.prototype.addMarker=function(_489,_48a){
this.markers.push(new infoMarker(this,_489,_48a,this.markers.length));
};
markerMap.prototype.removeAllMarkers=function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i].marker.setMap(null);
}
this.markers=[];
};
function infoMarker(_48b,_48c,_48d,_48e){
this.markermap=_48b;
this.marker=_48c;
this.content=_48d;
this.position=_48e;
this.open=false;
google.maps.event.addListener(this.marker,"click",function(){
this.markermap.infowindow.setContent(this.content);
this.markermap.infowindow.open(this.markermap.map,this.marker);
this.open=true;
google.maps.event.addListenerOnce(this.markermap.infowindow,"closeclick",function(){
this.open=false;
unhighlightMarker(this);
}.bind(this));
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseover",function(){
highlightMarker(this);
}.bind(this));
google.maps.event.addListener(this.marker,"mouseout",function(){
if(!this.open){
unhighlightMarker(this);
}
}.bind(this));
};
markerMap.prototype.hideDirections=function(){
var i=0;
while(true){
var _48f=$(this.legend.id+"_"+i);
if(_48f){
_48f.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML="";
$(this.legend.id+"_warnings").innerHTML="";
this.polyline.setMap(null);
};
markerMap.prototype.renderDirections=function(){
if(this.directionsResult.routes[0].overview_path.length==0){
this.polyline.setMap(null);
}else{
if(!this.polyline.getMap()){
this.polyline.setMap(this.map);
}
this.polyline.setPath(this.directionsResult.routes[0].overview_path);
}
var _490=this.directionsResult.routes[0];
var legs=_490.legs;
for(var i=0;i<legs.length;i++){
var leg=legs[i];
var html="<div>"+leg.distance.text+" - about "+leg.duration.text+" of "+$F(this.travelModeId).toLowerCase()+"</div><table><tbody>";
if(leg.steps.length>100){
html+="<p>We're sorry, but the directions for this step are too long to display.</p>";
}else{
for(var j=0;j<leg.steps.length;j++){
var step=leg.steps[j];
html+="<tr><td>"+(j+1)+".</td><td>"+step.instructions+"</td><td>"+step.distance.text+"</td></tr>";
}
html+="</tbody></table>";
}
$(this.legend.id+"_"+i).innerHTML=html;
}
while(true){
var _491=$(this.legend.id+"_"+i);
if(_491){
_491.innerHTML="";
}else{
break;
}
i++;
}
$(this.legend.id+"_copyright").innerHTML=_490.copyrights;
var _492="";
for(var j=0;j<_490.warnings.length;j++){
_492+=_490.warnings[j]+"<br/>";
}
$(this.legend.id+"_warnings").innerHTML=_492;
};
markerMap.prototype.fetchDirections=function(){
var _493=this.markers;
var l=_493.length;
var _494=new google.maps.LatLng(_493[0].marker.getPosition().lat(),_493[0].marker.getPosition().lng());
var _495=new google.maps.LatLng(_493[l-1].marker.getPosition().lat(),_493[l-1].marker.getPosition().lng());
var _496=[];
for(var i=1;i<l-1;i++){
_496.push({location:new google.maps.LatLng(_493[i].marker.getPosition().lat(),_493[i].marker.getPosition().lng()),stopover:true});
}
var _497={origin:_494,destination:_495,waypoints:_496,travelMode:google.maps.DirectionsTravelMode[$F(this.travelModeId)],unitSystem:google.maps.DirectionsUnitSystem[$F(this.unitSystemId)]};
var _498=new google.maps.DirectionsService();
_498.route(_497,function(_499,_49a){
if(_49a==google.maps.DirectionsStatus.OK&&this.markers.length==l){
this.directionsResult=_499;
this.renderDirections();
}
}.bind(this));
};
jQuery(function(){
mm=new mapsManager();
});
function renderMapFromData(id,data,_49b){
var _49c="map_canvas_"+id;
var _49d=mm.getMapById(id);
if(!_49d){
var map=new google.maps.Map(document.getElementById(_49c));
var _49d=new markerMap(map,"map_legend_"+id,"travel_mode_"+id,"unit_system_"+id);
mm.addMap(id,_49d);
sv=true;
}else{
var map=_49d.map;
sv=false;
}
map.setOptions({zoom:data.zoom,center:new google.maps.LatLng(data.lat,data.lng),mapTypeId:google.maps.MapTypeId[data.mapType],streetViewControl:sv,scrollwheel:false});
_49d.removeAllMarkers();
var _49e="";
for(var i=0;i<data.markers.length;i++){
var m=data.markers[i];
var _49f=mapLetterFromPosition(i);
var icon="http://www.google.com/mapfiles/marker_green"+_49f+".png";
var _4a0="<div class=\"infowindow_content\"><strong>"+m.name+"</strong><br/><small>"+m.address+"</small><p>"+m.description+"</p>";
var _4a1=new google.maps.Marker({position:new google.maps.LatLng(m.lat,m.lng),map:map,title:m.name,icon:icon});
_49d.addMarker(_4a1,_4a0);
if(data.hubtool){
var dest=(m.address.strip()=="")?m.name:m.address;
_49e+="<div class=\"map_stopover\" onmouseover=\"highlightMapMarker(event, "+id+", "+i+");\" onmouseout=\"unhighlightMapMarker(event, "+id+", "+i+");\">"+"<img src=\""+icon+"\" id=\"stopover_icon_"+id+"_"+i+"\"/>"+"<strong>"+m.name+"</strong> - "+"<small>"+m.address+" "+"<a href=\"http://maps.google.com/maps?f=d&z="+data.zoom+"&q="+encodeURI(dest)+"@"+m.lat+","+m.lng+"\">[get directions]</a>"+"</small>"+"<p>"+m.description+"</p>"+"</div>"+"<div id=\""+_49d.legend.id+"_"+i+"\"></div>";
}
}
if(data.hubtool){
_49e+="<div id=\""+_49d.legend.id+"_warnings\" class=\"map_warnings\"></div>";
_49e+="<div id=\""+_49d.legend.id+"_copyright\" class=\"map_copyright\"></div>";
_49d.legend.innerHTML=_49e;
if(data.markers.length>=2){
$("map_route_"+id).show();
}else{
$("map_route_"+id).hide();
}
if(data.markers.length>=2&&$("route_options_"+id).visible()){
if(_49b||!_49d.directionsResult){
_49d.fetchDirections();
}else{
_49d.renderDirections();
}
}else{
var _4a2={status:"OK",routes:[{legs:[],overview_path:[],copyrights:"",warnings:[]}]};
_49d.directionsResult=_4a2;
_49d.renderDirections();
}
}
};
function showRouteAndDirections(id){
mm.getMapById(id).fetchDirections();
};
function hideRouteAndDirections(id){
mm.getMapById(id).hideDirections();
};
function highlightMarker(_4a3){
var id=_4a3.markermap.id;
if(!id){
return;
}
var _4a4=mapLetterFromPosition(_4a3.position);
var icon="http://www.google.com/mapfiles/marker_yellow"+_4a4+".png";
_4a3.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4a3.position);
if(img){
img.src=icon;
}
};
function unhighlightMarker(_4a5){
var id=_4a5.markermap.id;
if(!id){
return;
}
var _4a6=mapLetterFromPosition(_4a5.position);
var icon="http://www.google.com/mapfiles/marker_green"+_4a6+".png";
_4a5.marker.setIcon(icon);
var img=$("stopover_icon_"+id+"_"+_4a5.position);
if(img){
img.src=icon;
}
};
function mapLetterFromPosition(pos){
return String.fromCharCode(65+pos);
};
function highlightMapMarker(_4a7,id,_4a8){
var _4a9=mm.getMapById(id);
if(_4a8<_4a9.markers.length){
highlightMarker(_4a9.markers[_4a8]);
}
};
function unhighlightMapMarker(_4aa,id,_4ab){
var _4ac=mm.getMapById(id);
if(_4ab<_4ac.markers.length){
unhighlightMarker(_4ac.markers[_4ab]);
}
};
var lastEditedMessageEle=null;
function attach_forum_topic_events(){
jQuery("div.posts a.reply").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
whenSignedIn({explain:"to reply to this post",btnText:"submit"},show_post_reply_box,post);
return false;
});
jQuery("div.posts a.delete").live("click",function(){
if(confirm("Are you sure you want to delete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/delete_inline.php",{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},processDeleteResponse);
}
return false;
});
jQuery("div.posts a.undelete").live("click",function(){
if(confirm("Are you sure you want to undelete this post?")){
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery(this).closest("li.threaded").load("/xml/forum/undelete_inline.php",{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},processUndeleteResponse);
}
return false;
});
jQuery("div.posts a.edit").live("click",function(){
jQuery("#report_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
jQuery.ajax({type:"GET",url:"/xml/forum/edit_inline.php",data:{postId:post.attr("id").substring(4),isprivate:post.hasClass("private")?1:0},complete:processStartEditResponse});
return false;
});
jQuery("div.posts a.report").live("click",function(){
jQuery("#editor_box").hide();
jQuery(".actionmenu a").removeClass("selected");
jQuery(this).addClass("selected");
var post=jQuery(this).closest("li.threaded");
post.append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
whenSignedIn({explain:"to report this post",btnText:"submit"},show_report_box,post);
return false;
});
jQuery("#editor_box .inline_cancel").click(function(){
jq("#photo_insert_code").hide();
jQuery(".actionmenu a").removeClass("selected");
var _4ad=jQuery("#editor_box");
if(_4ad.hasClass("edit_box")){
jQuery(".message",_4ad.closest(".postright")).show();
}
_4ad.hide();
return false;
});
jq("#editor_box #photo_insert_add").click(function(){
jq(this).hide();
jq("#photo_insert_code").hide();
var pgi=photoGalleryInserter.instance();
pgi.setOnImageSelect(function(id,_4ae,_4af){
var ta=jq("#editor_box textarea");
var _4b0=ta.val();
if(_4b0.length){
ta.val(_4b0+"\n\n[img]"+photoGalleryInserter.getImagePreviewURL(id,_4ae,_4af)+"[/img]\n\n");
}else{
ta.val("[img]"+photoGalleryInserter.getImagePreviewURL(id,_4ae,_4af)+"[/img]\n\n");
}
ta.focus();
});
pgi.setOnClose(function(){
jq("#editor_box #photo_insert_add").show();
});
jq("#editor_box #photo_insert").show();
return false;
});
jQuery("#editor_box .inline_reply").click(function(){
jq("#photo_insert_code").hide();
jQuery("#editor_box form").submit();
jQuery("#editor_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
return false;
});
jQuery("#report_box input[value=Cancel]").click(function(){
jQuery(".actionmenu a").removeClass("selected");
var _4b1=jQuery("#report_box");
_4b1.hide();
});
jQuery("#report_box input[value=Submit]").click(function(){
if(jQuery("#reportTypeId").val()=="0"){
alert("Please select a reason");
return false;
}
jQuery("#report_box").append("<img class=\"wait\" src=\"/x/spinner.gif\" />");
});
jQuery("div.reply_collapser a").live("click",function(){
var _4b2=jQuery(this).closest("div.replies_box_wrapper");
var _4b3=jQuery(this).closest("div.reply_collapser");
if(_4b3.hasClass("show")){
_4b3.addClass("hide").removeClass("show");
jQuery("a",_4b3).html("<span></span>");
jQuery("> .replies_box",_4b2).slideDown();
}else{
jQuery("> .replies_box",_4b2).slideUp(500,function(){
_4b3.addClass("show").removeClass("hide");
jQuery("a",_4b3).html("<span></span>"+jQuery("li.threaded",_4b2).length+" replies");
});
}
return false;
});
jQuery("a.toggle").live("click",function(){
if(jQuery(this).hasClass("expanded")){
jQuery(this).removeClass("expanded");
jQuery(this).html("more &rarr;");
}else{
jQuery(this).addClass("expanded");
jQuery(this).html("less &larr;");
}
jQuery("a.more",jQuery(this).closest(".actionmenu")).toggle();
return false;
});
jQuery("#reportTypeId").change(function(){
if(jQuery(this).val()=="5"){
jQuery("#new_category_wrapper").show();
}else{
jQuery("#new_category_wrapper").hide();
}
});
jQuery("li.threaded .in_reply_to a").live("click",function(){
var _4b4=jQuery(this);
var _4b5=jQuery("#threaded_reply_to_box");
if(_4b4.html()=="hide"){
_4b4.html("this");
_4b5.hide();
return false;
}
var _4b6=_4b4.attr("class").substr(7);
var _4b7=jQuery("#post"+_4b6+" .username").html();
var html="<p class=\"by\">By "+_4b7+"</p>"+jQuery("#message"+_4b6).html();
var _4b8=_4b4.closest("li.threaded");
if(_4b5.length>0){
_4b8.append(_4b5);
}else{
jQuery(_4b8).append("<div id=\"threaded_reply_to_box\"></div>");
_4b5=jQuery("#threaded_reply_to_box");
}
_4b5.html(html);
var pos=_4b4.position();
var _4b9=_4b4.width();
_4b5.css({"left":(pos.left+_4b9)+"px","top":pos.top+"px"});
_4b5.show();
_4b4.html("hide");
return false;
});
jQuery.each(jQuery("div.reply_collapser.show"),function(){
replies_wrapper=jQuery(this).closest("div.replies_box_wrapper");
jQuery("a",this).html(""+jQuery("li.threaded",replies_wrapper).length+" replies");
});
};
jQuery(function(){
jQuery("#tips_show").one("click",function(){
jQuery("#formatting_tips").find("img").each(function(){
var _4ba=jQuery(this);
_4ba.attr("src",_4ba.data("src"));
});
});
});
function show_post_reply_box(_4bb){
jQuery("li.threaded img.wait").remove();
_4bb.append(jQuery("#editor_box"));
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4bc=jQuery("#editor_box");
_4bc.removeClass("edit_box").addClass("reply_box");
jQuery(".inline_reply",_4bc).text("submit");
jQuery("form",_4bc).attr("action","/xml/forum/reply_inline.php");
jQuery("form",_4bc).ajaxForm({type:"POST",dataType:"json",success:processReplyResponse,error:processReplyError});
var _4bd=document.getElementById("admincenter");
if(jQuery("input[name=highlightReply]").length==0){
var _4be=_4bd?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
_4be+="<br/>";
jQuery("textarea",_4bc).after(_4be);
}
if(jQuery("#follow_topic").length==0){
var _4bf="checked";
var _4c0=window.location.pathname;
var arr=_4c0.split("/");
jQuery.ajax({type:"POST",url:"/xml/get_is_following_topic.php",data:{topicId:arr[3]},success:function(data){
jQuery("#follow_topic").html(data);
}});
var _4be="<p id=\"follow_topic\"></p>";
jQuery("textarea",_4bc).after(_4be);
}
jQuery("#posterror ul",_4bc).html("");
jQuery("#posterror",_4bc).hide();
jQuery("textarea",_4bc).val("");
jQuery("#postId",_4bc).val(_4bb.attr("id").substring(4));
_4bc.append(jQuery("#formatting_tips"));
_4bc.show();
var x=_4bc.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function show_report_box(_4c1){
jQuery("li.threaded img.wait").remove();
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
var _4c2=jQuery("#report_box");
jQuery("#reportPostId",_4c2).val(_4c1.attr("id").substring(4));
jQuery("form",_4c2).ajaxForm({type:"POST",success:processReportResponse});
jQuery(">.post_highlight > .actionmenu",_4c1).append(_4c2);
jQuery(">.post_wrap > .actionmenu",_4c1).append(_4c2);
_4c2.show();
var x=_4c2.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processReplyError(data,_4c3,_4c4){
alert("There may have been an error posting your reply ("+_4c3+").  We recommend copying the content of your reply somewhere for safekeeping, and then refreshing this page to see if your message has been posted. If this problem persists, please contact us at team@hubpages.com.");
};
function processEditedResponseError(data,_4c5,_4c6){
alert("There may have been an error updating your post ("+_4c5+").  We recommend copying the content of your edited reply somewhere for safekeeping, and then refreshing this page to see if your edit has been posted.  If this problem persists, please contact us at team@hubpages.com.");
};
function processReplyResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
var ol=jQuery("#replies_box_"+data.postId+" > ol");
if(ol.length==0){
jQuery("#replies_box_"+data.postId).append("<ol></ol>");
}
jQuery("#replies_box_"+data.postId+" > ol").append(data.replyHtml);
replies_wrapper=jQuery("#replies_box_"+data.postId).closest(".replies_box_wrapper");
replies_wrapper.show();
reply_collapser=jQuery("> .reply_collapser",replies_wrapper);
reply_collapser.addClass("hide").removeClass("show");
jQuery("a",reply_collapser).html("");
jQuery("> .replies_box",replies_wrapper).slideDown();
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processStartEditResponse(_4c7,_4c8){
jQuery("li.threaded img.wait").remove();
if(_4c8=="error"){
alert(_4c7.responseText);
return;
}
data=eval("("+_4c7.responseText+")");
if(lastEditedMessageEle){
lastEditedMessageEle.show();
}
lastEditedMessageEle=jQuery("#message"+data.postId).hide();
var _4c9=jQuery("#editor_box");
_4c9.removeClass("reply_box").addClass("edit_box");
jQuery(".inline_reply",_4c9).text("Save");
jQuery("form",_4c9).attr("action","/xml/forum/edit_inline.php");
jQuery("form",_4c9).ajaxForm({type:"POST",dataType:"json",success:processEditedResponse,error:processEditedResponseError});
if(jQuery("input[name=highlightReply]").length==0){
var _4ca=document.getElementById("admincenter");
replyOptionsHTML=_4ca?"<p><input type=\"checkbox\" name=\"highlightReply\"/> Highlight this reply</p>":"";
replyOptionsHTML+="<br/>";
jQuery("textarea",_4c9).after(replyOptionsHTML);
}
jQuery("input[name=follow]").attr("checked",data.follow==1);
jQuery("#posterror ul",_4c9).html("");
jQuery("#posterror",_4c9).hide();
jQuery("#postId",_4c9).val(data.postId);
jQuery("textarea",_4c9).val(data.message);
jQuery("#post"+data.postId+" > .post_wrap > .postright").append(jQuery("#editor_box"));
jQuery("#post"+data.postId+" > .post_highlight > .postright").append(jQuery("#editor_box"));
_4c9.append(jQuery("#formatting_tips"));
_4c9.show();
var x=_4c9.offset().top-300;
jQuery("html,body").animate({scrollTop:x},500);
};
function processEditedResponse(data){
jQuery("li.threaded img.wait").remove();
if(data.errors.length==0){
jQuery(".actionmenu a").removeClass("selected");
jQuery("#editor_box").hide();
jQuery("#message"+data.postId).html(data.editedHtml);
jQuery("#message"+data.postId).show();
document.getElementById("postwrap"+data.postId).className=data.highlight?"post_highlight":"post_wrap";
}else{
jQuery("#editor_box #posterror").show();
errors_html="<li>"+data.errors.join("</li><li>")+"</li>";
jQuery("#editor_box #posterror ul").html(errors_html);
}
};
function processDeleteResponse(_4cb,_4cc,_4cd){
if(_4cc=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4cb);
}
};
function processUndeleteResponse(_4ce,_4cf,_4d0){
if(_4cf=="error"){
jQuery("li.threaded img.wait").remove();
alert(_4ce);
}
};
function processReportResponse(_4d1){
jQuery(".actionmenu a").removeClass("selected");
jQuery("li.threaded img.wait").remove();
var _4d2=jQuery("#report_box");
_4d2.hide();
alert(_4d1);
};
(function($){
$.extend($.fn,{validate:function(_4d3){
if(!this.length){
_4d3&&_4d3.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _4d4=$.data(this[0],"validator");
if(_4d4){
return _4d4;
}
_4d4=new $.validator(_4d3,this[0]);
$.data(this[0],"validator",_4d4);
if(_4d4.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_4d4.cancelSubmit=true;
});
if(_4d4.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_4d4.submitButton=this;
});
}
this.submit(function(_4d5){
if(_4d4.settings.debug){
_4d5.preventDefault();
}
function _4d6(){
if(_4d4.settings.submitHandler){
if(_4d4.submitButton){
var _4d7=$("<input type='hidden'/>").attr("name",_4d4.submitButton.name).val(_4d4.submitButton.value).appendTo(_4d4.currentForm);
}
_4d4.settings.submitHandler.call(_4d4,_4d4.currentForm);
if(_4d4.submitButton){
_4d7.remove();
}
return false;
}
return true;
};
if(_4d4.cancelSubmit){
_4d4.cancelSubmit=false;
return _4d6();
}
if(_4d4.form()){
if(_4d4.pendingRequest){
_4d4.formSubmitted=true;
return false;
}
return _4d6();
}else{
_4d4.focusInvalid();
return false;
}
});
}
return _4d4;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _4d8=true;
var _4d9=$(this[0].form).validate();
this.each(function(){
_4d8&=_4d9.element(this);
});
return _4d8;
}
},removeAttrs:function(_4da){
var _4db={},_4dc=this;
$.each(_4da.split(/\s/),function(_4dd,_4de){
_4db[_4de]=_4dc.attr(_4de);
_4dc.removeAttr(_4de);
});
return _4db;
},rules:function(_4df,_4e0){
var _4e1=this[0];
if(_4df){
var _4e2=$.data(_4e1.form,"validator").settings;
var _4e3=_4e2.rules;
var _4e4=$.validator.staticRules(_4e1);
switch(_4df){
case "add":
$.extend(_4e4,$.validator.normalizeRule(_4e0));
_4e3[_4e1.name]=_4e4;
if(_4e0.messages){
_4e2.messages[_4e1.name]=$.extend(_4e2.messages[_4e1.name],_4e0.messages);
}
break;
case "remove":
if(!_4e0){
delete _4e3[_4e1.name];
return _4e4;
}
var _4e5={};
$.each(_4e0.split(/\s/),function(_4e6,_4e7){
_4e5[_4e7]=_4e4[_4e7];
delete _4e4[_4e7];
});
return _4e5;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_4e1),$.validator.classRules(_4e1),$.validator.attributeRules(_4e1),$.validator.staticRules(_4e1)),_4e1);
if(data.required){
var _4e8=data.required;
delete data.required;
data=$.extend({required:_4e8},data);
}
return data;
}});
$.extend($.expr[":"],{blank:function(a){
return !$.trim(""+a.value);
},filled:function(a){
return !!$.trim(""+a.value);
},unchecked:function(a){
return !a.checked;
}});
$.validator=function(_4e9,form){
this.settings=$.extend(true,{},$.validator.defaults,_4e9);
this.currentForm=form;
this.init();
};
$.validator.format=function(_4ea,_4eb){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_4ea);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_4eb.constructor!=Array){
_4eb=$.makeArray(arguments).slice(1);
}
if(_4eb.constructor!=Array){
_4eb=[_4eb];
}
$.each(_4eb,function(i,n){
_4ea=_4ea.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _4ea;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_4ec){
this.lastActive=_4ec;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_4ec,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_4ec)).hide();
}
},onfocusout:function(_4ed){
if(!this.checkable(_4ed)&&(_4ed.name in this.submitted||!this.optional(_4ed))){
this.element(_4ed);
}
},onkeyup:function(_4ee){
if(_4ee.name in this.submitted||_4ee==this.lastElement){
this.element(_4ee);
}
},onclick:function(_4ef){
if(_4ef.name in this.submitted){
this.element(_4ef);
}else{
if(_4ef.parentNode.name in this.submitted){
this.element(_4ef.parentNode);
}
}
},highlight:function(_4f0,_4f1,_4f2){
$(_4f0).addClass(_4f1).removeClass(_4f2);
},unhighlight:function(_4f3,_4f4,_4f5){
$(_4f3).removeClass(_4f4).addClass(_4f5);
}},setDefaults:function(_4f6){
$.extend($.validator.defaults,_4f6);
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){
this.labelContainer=$(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);
this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var _4f7=(this.groups={});
$.each(this.settings.groups,function(key,_4f8){
$.each(_4f8.split(/\s/),function(_4f9,name){
_4f7[name]=key;
});
});
var _4fa=this.settings.rules;
$.each(_4fa,function(key,_4fb){
_4fa[key]=$.validator.normalizeRule(_4fb);
});
function _4fc(_4fd){
var _4fe=$.data(this[0].form,"validator"),_4ff="on"+_4fd.type.replace(/^validate/,"");
_4fe.settings[_4ff]&&_4fe.settings[_4ff].call(_4fe,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_4fc).validateDelegate(":radio, :checkbox, select, option","click",_4fc);
if(this.settings.invalidHandler){
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
}
},form:function(){
this.checkForm();
$.extend(this.submitted,this.errorMap);
this.invalid=$.extend({},this.errorMap);
if(!this.valid()){
$(this.currentForm).triggerHandler("invalid-form",[this]);
}
this.showErrors();
return this.valid();
},checkForm:function(){
this.prepareForm();
for(var i=0,_500=(this.currentElements=this.elements());_500[i];i++){
this.check(_500[i]);
}
return this.valid();
},element:function(_501){
_501=this.clean(_501);
this.lastElement=_501;
this.prepareElement(_501);
this.currentElements=$(_501);
var _502=this.check(_501);
if(_502){
delete this.invalid[_501.name];
}else{
this.invalid[_501.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _502;
},showErrors:function(_503){
if(_503){
$.extend(this.errorMap,_503);
this.errorList=[];
for(var name in _503){
this.errorList.push({message:_503[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_504){
return !(_504.name in _503);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},resetForm:function(){
if($.fn.resetForm){
$(this.currentForm).resetForm();
}
this.submitted={};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},numberOfInvalids:function(){
return this.objectLength(this.invalid);
},objectLength:function(obj){
var _505=0;
for(var i in obj){
_505++;
}
return _505;
},hideErrors:function(){
this.addWrapper(this.toHide).hide();
},valid:function(){
return this.size()==0;
},size:function(){
return this.errorList.length;
},focusInvalid:function(){
if(this.settings.focusInvalid){
try{
$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}
catch(e){
}
}
},findLastActive:function(){
var _506=this.lastActive;
return _506&&$.grep(this.errorList,function(n){
return n.element.name==_506.name;
}).length==1&&_506;
},elements:function(){
var _507=this,_508={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_507.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _508||!_507.objectLength($(this).rules())){
return false;
}
_508[this.name]=true;
return true;
});
},clean:function(_509){
return $(_509)[0];
},errors:function(){
return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);
},reset:function(){
this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=$([]);
this.toHide=$([]);
this.currentElements=$([]);
},prepareForm:function(){
this.reset();
this.toHide=this.errors().add(this.containers);
},prepareElement:function(_50a){
this.reset();
this.toHide=this.errorsFor(_50a);
},check:function(_50b){
_50b=this.clean(_50b);
if(this.checkable(_50b)){
_50b=this.findByName(_50b.name).not(this.settings.ignore)[0];
}
var _50c=$(_50b).rules();
var _50d=false;
for(var _50e in _50c){
var rule={method:_50e,parameters:_50c[_50e]};
try{
var _50f=$.validator.methods[_50e].call(this,_50b.value.replace(/\r/g,""),_50b,rule.parameters);
if(_50f=="dependency-mismatch"){
_50d=true;
continue;
}
_50d=false;
if(_50f=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_50b));
return;
}
if(!_50f){
this.formatAndAdd(_50b,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_50b.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_50d){
return;
}
if(this.objectLength(_50c)){
this.successList.push(_50b);
}
return true;
},customMetaMessage:function(_510,_511){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_510).metadata()[this.settings.meta]:$(_510).metadata();
return meta&&meta.messages&&meta.messages[_511];
},customMessage:function(name,_512){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_512]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_513,_514){
return this.findDefined(this.customMessage(_513.name,_514),this.customMetaMessage(_513,_514),!this.settings.ignoreTitle&&_513.title||undefined,$.validator.messages[_514],"<strong>Warning: No message defined for "+_513.name+"</strong>");
},formatAndAdd:function(_515,rule){
var _516=this.defaultMessage(_515,rule.method),_517=/\$?\{(\d+)\}/g;
if(typeof _516=="function"){
_516=_516.call(this,rule.parameters,_515);
}else{
if(_517.test(_516)){
_516=jQuery.format(_516.replace(_517,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_516,element:_515});
this.errorMap[_515.name]=_516;
this.submitted[_515.name]=_516;
},addWrapper:function(_518){
if(this.settings.wrapper){
_518=_518.add(_518.parent(this.settings.wrapper));
}
return _518;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _519=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_519.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_519.element,_519.message);
}
if(this.errorList.length){
this.toShow=this.toShow.add(this.containers);
}
if(this.settings.success){
for(var i=0;this.successList[i];i++){
this.showLabel(this.successList[i]);
}
}
if(this.settings.unhighlight){
for(var i=0,_51a=this.validElements();_51a[i];i++){
this.settings.unhighlight.call(this,_51a[i],this.settings.errorClass,this.settings.validClass);
}
}
this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},validElements:function(){
return this.currentElements.not(this.invalidElements());
},invalidElements:function(){
return $(this.errorList).map(function(){
return this.element;
});
},showLabel:function(_51b,_51c){
var _51d=this.errorsFor(_51b);
if(_51d.length){
_51d.removeClass().addClass(this.settings.errorClass);
_51d.attr("generated")&&_51d.html(_51c);
}else{
_51d=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_51b),generated:true}).addClass(this.settings.errorClass).html(_51c||"");
if(this.settings.wrapper){
_51d=_51d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_51d).length){
this.settings.errorPlacement?this.settings.errorPlacement(_51d,$(_51b)):_51d.insertAfter(_51b);
}
}
if(!_51c&&this.settings.success){
_51d.text("");
typeof this.settings.success=="string"?_51d.addClass(this.settings.success):this.settings.success(_51d);
}
this.toShow=this.toShow.add(_51d);
},errorsFor:function(_51e){
var name=this.idOrName(_51e);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_51f){
return this.groups[_51f.name]||(this.checkable(_51f)?_51f.name:_51f.id||_51f.name);
},checkable:function(_520){
return /radio|checkbox/i.test(_520.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_521,_522){
return _522.form==form&&_522.name==name&&_522||null;
});
},getLength:function(_523,_524){
switch(_524.nodeName.toLowerCase()){
case "select":
return $("option:selected",_524).length;
case "input":
if(this.checkable(_524)){
return this.findByName(_524.name).filter(":checked").length;
}
}
return _523.length;
},depend:function(_525,_526){
return this.dependTypes[typeof _525]?this.dependTypes[typeof _525](_525,_526):true;
},dependTypes:{"boolean":function(_527,_528){
return _527;
},"string":function(_529,_52a){
return !!$(_529,_52a.form).length;
},"function":function(_52b,_52c){
return _52b(_52c);
}},optional:function(_52d){
return !$.validator.methods.required.call(this,$.trim(_52d.value),_52d)&&"dependency-mismatch";
},startRequest:function(_52e){
if(!this.pending[_52e.name]){
this.pendingRequest++;
this.pending[_52e.name]=true;
}
},stopRequest:function(_52f,_530){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_52f.name];
if(_530&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_530&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_531){
return $.data(_531,"previousValue")||$.data(_531,"previousValue",{old:null,valid:true,message:this.defaultMessage(_531,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_532,_533){
_532.constructor==String?this.classRuleSettings[_532]=_533:$.extend(this.classRuleSettings,_532);
},classRules:function(_534){
var _535={};
var _536=$(_534).attr("class");
_536&&$.each(_536.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_535,$.validator.classRuleSettings[this]);
}
});
return _535;
},attributeRules:function(_537){
var _538={};
var _539=$(_537);
for(var _53a in $.validator.methods){
var _53b=_539.attr(_53a);
if(_53b){
_538[_53a]=_53b;
}
}
if(_538.maxlength&&/-1|2147483647|524288/.test(_538.maxlength)){
delete _538.maxlength;
}
return _538;
},metadataRules:function(_53c){
if(!$.metadata){
return {};
}
var meta=$.data(_53c.form,"validator").settings.meta;
return meta?$(_53c).metadata()[meta]:$(_53c).metadata();
},staticRules:function(_53d){
var _53e={};
var _53f=$.data(_53d.form,"validator");
if(_53f.settings.rules){
_53e=$.validator.normalizeRule(_53f.settings.rules[_53d.name])||{};
}
return _53e;
},normalizeRules:function(_540,_541){
$.each(_540,function(prop,val){
if(val===false){
delete _540[prop];
return;
}
if(val.param||val.depends){
var _542=true;
switch(typeof val.depends){
case "string":
_542=!!$(val.depends,_541.form).length;
break;
case "function":
_542=val.depends.call(_541,_541);
break;
}
if(_542){
_540[prop]=val.param!==undefined?val.param:true;
}else{
delete _540[prop];
}
}
});
$.each(_540,function(rule,_543){
_540[rule]=$.isFunction(_543)?_543(_541):_543;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_540[this]){
_540[this]=Number(_540[this]);
}
});
$.each(["rangelength","range"],function(){
if(_540[this]){
_540[this]=[Number(_540[this][0]),Number(_540[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_540.min&&_540.max){
_540.range=[_540.min,_540.max];
delete _540.min;
delete _540.max;
}
if(_540.minlength&&_540.maxlength){
_540.rangelength=[_540.minlength,_540.maxlength];
delete _540.minlength;
delete _540.maxlength;
}
}
if(_540.messages){
delete _540.messages;
}
return _540;
},normalizeRule:function(data){
if(typeof data=="string"){
var _544={};
$.each(data.split(/\s/),function(){
_544[this]=true;
});
data=_544;
}
return data;
},addMethod:function(name,_545,_546){
$.validator.methods[name]=_545;
$.validator.messages[name]=_546!=undefined?_546:$.validator.messages[name];
if(_545.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_547,_548,_549){
if(!this.depend(_549,_548)){
return "dependency-mismatch";
}
switch(_548.nodeName.toLowerCase()){
case "select":
var val=$(_548).val();
return val&&val.length>0;
case "input":
if(this.checkable(_548)){
return this.getLength(_547,_548)>0;
}
default:
return $.trim(_547).length>0;
}
},remote:function(_54a,_54b,_54c){
if(this.optional(_54b)){
return "dependency-mismatch";
}
var _54d=this.previousValue(_54b);
if(!this.settings.messages[_54b.name]){
this.settings.messages[_54b.name]={};
}
_54d.originalMessage=this.settings.messages[_54b.name].remote;
this.settings.messages[_54b.name].remote=_54d.message;
_54c=typeof _54c=="string"&&{url:_54c}||_54c;
if(this.pending[_54b.name]){
return "pending";
}
if(_54d.old===_54a){
return _54d.valid;
}
_54d.old=_54a;
var _54e=this;
this.startRequest(_54b);
var data={};
data[_54b.name]=_54a;
$.ajax($.extend(true,{url:_54c,mode:"abort",port:"validate"+_54b.name,dataType:"json",data:data,success:function(_54f){
_54e.settings.messages[_54b.name].remote=_54d.originalMessage;
var _550=_54f===true;
if(_550){
var _551=_54e.formSubmitted;
_54e.prepareElement(_54b);
_54e.formSubmitted=_551;
_54e.successList.push(_54b);
_54e.showErrors();
}else{
var _552={};
var _553=_54f||_54e.defaultMessage(_54b,"remote");
_552[_54b.name]=_54d.message=$.isFunction(_553)?_553(_54a):_553;
_54e.showErrors(_552);
}
_54d.valid=_550;
_54e.stopRequest(_54b,_550);
}},_54c));
return "pending";
},minlength:function(_554,_555,_556){
return this.optional(_555)||this.getLength($.trim(_554),_555)>=_556;
},maxlength:function(_557,_558,_559){
return this.optional(_558)||this.getLength($.trim(_557),_558)<=_559;
},rangelength:function(_55a,_55b,_55c){
var _55d=this.getLength($.trim(_55a),_55b);
return this.optional(_55b)||(_55d>=_55c[0]&&_55d<=_55c[1]);
},min:function(_55e,_55f,_560){
return this.optional(_55f)||_55e>=_560;
},max:function(_561,_562,_563){
return this.optional(_562)||_561<=_563;
},range:function(_564,_565,_566){
return this.optional(_565)||(_564>=_566[0]&&_564<=_566[1]);
},email:function(_567,_568){
return this.optional(_568)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_567);
},url:function(_569,_56a){
return this.optional(_56a)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_569);
},date:function(_56b,_56c){
return this.optional(_56c)||!/Invalid|NaN/.test(new Date(_56b));
},dateISO:function(_56d,_56e){
return this.optional(_56e)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_56d);
},number:function(_56f,_570){
return this.optional(_570)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_56f);
},digits:function(_571,_572){
return this.optional(_572)||/^\d+$/.test(_571);
},creditcard:function(_573,_574){
if(this.optional(_574)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_573)){
return false;
}
var _575=0,_576=0,_577=false;
_573=_573.replace(/\D/g,"");
for(var n=_573.length-1;n>=0;n--){
var _578=_573.charAt(n);
var _576=parseInt(_578,10);
if(_577){
if((_576*=2)>9){
_576-=9;
}
}
_575+=_576;
_577=!_577;
}
return (_575%10)==0;
},accept:function(_579,_57a,_57b){
_57b=typeof _57b=="string"?_57b.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_57a)||_579.match(new RegExp(".("+_57b+")$","i"));
},equalTo:function(_57c,_57d,_57e){
var _57f=$(_57e).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_57d).valid();
});
return $.trim(_57c)==$.trim(_57f.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _580={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_581,_582,xhr){
var port=_581.port;
if(_581.mode=="abort"){
if(_580[port]){
_580[port].abort();
}
_580[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_583){
var mode=("mode" in _583?_583:$.ajaxSettings).mode,port=("port" in _583?_583:$.ajaxSettings).port;
if(mode=="abort"){
if(_580[port]){
_580[port].abort();
}
return (_580[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_584,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_584,_585,true);
},teardown:function(){
this.removeEventListener(_584,_585,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _585(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_586,type,_587){
return this.bind(type,function(_588){
var _589=$(_588.target);
if(_589.is(_586)){
return _587.apply(_589,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_58a,_58b,_58c){
return this.optional(_58b)||this.getLength(jq.trim(_58a),_58b)==_58c;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_58d,_58e,_58f){
if(!this.depend(_58f,_58e)){
return "dependency-mismatch";
}
switch(_58e.nodeName.toLowerCase()){
case "select":
var val=jq(_58e).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_58e)){
return this.getLength(_58d,_58e)==0;
}
default:
return jq.trim(_58d).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_590,_591){
if(!this.depend(_591,_590)){
return "dependency-mismatch";
}
var _592=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_592=true;
}else{
var _593=ssn.split("-");
if(_593[0]=="000"||_593[1]=="00"||_593[2]=="0000"){
_592=true;
}
if(_593[0]=="666"){
_592=true;
}
var _594=parseInt(_593[0],10);
if(_594>=900){
if(_593[1][0]!=7&&_593[1][0]!=8){
_592=true;
}
}
}
return !_592;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_595,_596,_597){
if(!this.depend(_597,_596)){
return "dependency-mismatch";
}
return _595.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_598,_599){
if(!this.depend(_599,_598)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_59a,_59b,_59c){
var _59a=jq.trim(_59a);
if(_59a.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _59d=_59a.split("-");
var m=1*_59d[0]-1;
var d=1*_59d[1];
var y=1*_59d[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_59e,_59f,_5a0){
return jq.trim(_59e).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
jQuery.validator.addMethod("requiredNoPlaceholder",function(_5a1,_5a2,_5a3){
if(!this.depend(_5a3,_5a2)){
return "dependency-mismatch";
}
if(jq(_5a2).hasClass("placeholder")){
return false;
}
switch(_5a2.nodeName.toLowerCase()){
case "select":
var val=jq(_5a2).val();
return val&&val.length>0;
case "input":
if(this.checkable(_5a2)){
return this.getLength(_5a1,_5a2)>0;
}
default:
return jq.trim(_5a1).length>0;
}
},"This field is required.");
(function(_5a4,$,_5a5){
"use strict";
var _5a6=$.event,_5a7;
_5a6.special.smartresize={setup:function(){
$(this).bind("resize",_5a6.special.smartresize.handler);
},teardown:function(){
$(this).unbind("resize",_5a6.special.smartresize.handler);
},handler:function(_5a8,_5a9){
var _5aa=this,args=arguments;
_5a8.type="smartresize";
if(_5a7){
clearTimeout(_5a7);
}
_5a7=setTimeout(function(){
jQuery.event.handle.apply(_5aa,args);
},_5a9==="execAsap"?0:100);
}};
$.fn.smartresize=function(fn){
return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"]);
};
$.Mason=function(_5ab,_5ac){
this.element=$(_5ac);
this._create(_5ab);
this._init();
};
$.Mason.settings={isResizable:true,isAnimated:false,animationOptions:{queue:false,duration:500},gutterWidth:0,isRTL:false,isFitWidth:false,containerStyle:{position:"relative"}};
$.Mason.prototype={_filterFindBricks:function(_5ad){
var _5ae=this.options.itemSelector;
return !_5ae?_5ad:_5ad.filter(_5ae).add(_5ad.find(_5ae));
},_getBricks:function(_5af){
var _5b0=this._filterFindBricks(_5af).css({position:"absolute"}).addClass("masonry-brick");
return _5b0;
},_create:function(_5b1){
this.options=$.extend(true,{},$.Mason.settings,_5b1);
this.styleQueue=[];
var _5b2=this.element[0].style;
this.originalStyle={height:_5b2.height||""};
var _5b3=this.options.containerStyle;
for(var prop in _5b3){
this.originalStyle[prop]=_5b2[prop]||"";
}
this.element.css(_5b3);
this.horizontalDirection=this.options.isRTL?"right":"left";
this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)};
this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth==="function";
var _5b4=this;
setTimeout(function(){
_5b4.element.addClass("masonry");
},0);
if(this.options.isResizable){
$(_5a4).bind("smartresize.masonry",function(){
_5b4.resize();
});
}
this.reloadItems();
},_init:function(_5b5){
this._getColumns();
this._reLayout(_5b5);
},option:function(key,_5b6){
if($.isPlainObject(key)){
this.options=$.extend(true,this.options,key);
}
},layout:function(_5b7,_5b8){
for(var i=0,len=_5b7.length;i<len;i++){
this._placeBrick(_5b7[i]);
}
var _5b9={};
_5b9.height=Math.max.apply(Math,this.colYs);
if(this.options.isFitWidth){
var _5ba=0;
i=this.cols;
while(--i){
if(this.colYs[i]!==0){
break;
}
_5ba++;
}
_5b9.width=(this.cols-_5ba)*this.columnWidth-this.options.gutterWidth;
}
this.styleQueue.push({$el:this.element,style:_5b9});
var _5bb=!this.isLaidOut?"css":(this.options.isAnimated?"animate":"css"),_5bc=this.options.animationOptions;
var obj;
for(i=0,len=this.styleQueue.length;i<len;i++){
obj=this.styleQueue[i];
obj.$el[_5bb](obj.style,_5bc);
}
this.styleQueue=[];
if(_5b8){
_5b8.call(_5b7);
}
this.isLaidOut=true;
},_getColumns:function(){
var _5bd=this.options.isFitWidth?this.element.parent():this.element,_5be=_5bd.width();
this.columnWidth=this.isFluid?this.options.columnWidth(_5be):this.options.columnWidth||this.$bricks.outerWidth(true)||_5be;
this.columnWidth+=this.options.gutterWidth;
this.cols=Math.floor((_5be+this.options.gutterWidth)/this.columnWidth);
this.cols=Math.max(this.cols,1);
},_placeBrick:function(_5bf){
var _5c0=$(_5bf),_5c1,_5c2,_5c3,_5c4,j;
_5c1=Math.ceil(_5c0.outerWidth(true)/(this.columnWidth+this.options.gutterWidth));
_5c1=Math.min(_5c1,this.cols);
if(_5c1===1){
_5c3=this.colYs;
}else{
_5c2=this.cols+1-_5c1;
_5c3=[];
for(j=0;j<_5c2;j++){
_5c4=this.colYs.slice(j,j+_5c1);
_5c3[j]=Math.max.apply(Math,_5c4);
}
}
var _5c5=Math.min.apply(Math,_5c3),_5c6=0;
for(var i=0,len=_5c3.length;i<len;i++){
if(_5c3[i]===_5c5){
_5c6=i;
break;
}
}
var _5c7={top:_5c5+this.offset.y};
_5c7[this.horizontalDirection]=this.columnWidth*_5c6+this.offset.x;
this.styleQueue.push({$el:_5c0,style:_5c7});
var _5c8=_5c5+_5c0.outerHeight(true),_5c9=this.cols+1-len;
for(i=0;i<_5c9;i++){
this.colYs[_5c6+i]=_5c8;
}
},resize:function(){
var _5ca=this.cols;
this._getColumns();
if(this.isFluid||this.cols!==_5ca){
this._reLayout();
}
},_reLayout:function(_5cb){
var i=this.cols;
this.colYs=[];
while(i--){
this.colYs.push(0);
}
this.layout(this.$bricks,_5cb);
},reloadItems:function(){
this.$bricks=this._getBricks(this.element.children());
},reload:function(_5cc){
this.reloadItems();
this._init(_5cc);
},appended:function(_5cd,_5ce,_5cf){
if(_5ce){
this._filterFindBricks(_5cd).css({top:this.element.height()});
var _5d0=this;
setTimeout(function(){
_5d0._appended(_5cd,_5cf);
},1);
}else{
this._appended(_5cd,_5cf);
}
},_appended:function(_5d1,_5d2){
var _5d3=this._getBricks(_5d1);
this.$bricks=this.$bricks.add(_5d3);
this.layout(_5d3,_5d2);
},remove:function(_5d4){
this.$bricks=this.$bricks.not(_5d4);
_5d4.remove();
},destroy:function(){
this.$bricks.removeClass("masonry-brick").each(function(){
this.style.position="";
this.style.top="";
this.style.left="";
});
var _5d5=this.element[0].style;
for(var prop in this.originalStyle){
_5d5[prop]=this.originalStyle[prop];
}
this.element.unbind(".masonry").removeClass("masonry").removeData("masonry");
$(_5a4).unbind(".masonry");
}};
$.fn.imagesLoaded=function(_5d6){
var _5d7=this,_5d8=_5d7.find("img").add(_5d7.filter("img")),len=_5d8.length,_5d9="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",_5da=[];
function _5db(){
_5d6.call(_5d7,_5d8);
};
function _5dc(_5dd){
var img=_5dd.target;
if(img.src!==_5d9&&$.inArray(img,_5da)===-1){
_5da.push(img);
if(--len<=0){
setTimeout(_5db);
_5d8.unbind(".imagesLoaded",_5dc);
}
}
};
if(!len){
_5db();
}
_5d8.bind("load.imagesLoaded error.imagesLoaded",_5dc).each(function(){
var src=this.src;
this.src=_5d9;
this.src=src;
});
return _5d7;
};
var _5de=function(_5df){
if(_5a4.console){
_5a4.console.error(_5df);
}
};
$.fn.masonry=function(_5e0){
if(typeof _5e0==="string"){
var args=Array.prototype.slice.call(arguments,1);
this.each(function(){
var _5e1=$.data(this,"masonry");
if(!_5e1){
_5de("cannot call methods on masonry prior to initialization; "+"attempted to call method '"+_5e0+"'");
return;
}
if(!$.isFunction(_5e1[_5e0])||_5e0.charAt(0)==="_"){
_5de("no such method '"+_5e0+"' for masonry instance");
return;
}
_5e1[_5e0].apply(_5e1,args);
});
}else{
this.each(function(){
var _5e2=$.data(this,"masonry");
if(_5e2){
_5e2.option(_5e0||{});
_5e2._init();
}else{
$.data(this,"masonry",new $.Mason(_5e0,this));
}
});
}
return this;
};
})(window,jQuery);
(function($){
$.expander={version:"1.4.3",defaults:{slicePoint:100,preserveWords:true,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:false,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:true,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null}};
$.fn.expander=function(_5e3){
var meth="init";
if(typeof _5e3=="string"){
meth=_5e3;
_5e3={};
}
var opts=$.extend({},$.expander.defaults,_5e3),_5e4=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,_5e5=opts.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,_5e6=/<\/?(\w+)[^>]*>/g,_5e7=/<(\w+)[^>]*>/g,_5e8=/<\/(\w+)>/g,_5e9=/(<\/[^>]+>)\s*$/,_5ea=/^<[^>]+>.?/,_5eb;
var _5ec={init:function(){
this.each(function(){
var i,l,tmp,_5ed,_5ee,_5ef,_5f0,_5f1,_5f2,_5f3,_5f4,_5f5,_5f6=[],_5f7=[],_5f8={},_5f9=this,_5fa=$(this),_5fb=$([]),o=$.extend({},opts,_5fa.data("expander")||$.meta&&_5fa.data()||{}),_5fc=!!_5fa.find("."+o.detailClass).length,_5fd=!!_5fa.find("*").filter(function(){
var _5fe=$(this).css("display");
return (/^block|table|list/).test(_5fe);
}).length,el=_5fd?"div":"span",_5ff=el+"."+o.detailClass,_600="span."+o.moreClass,_601=o.expandSpeed||0,_602=$.trim(_5fa.html()),_603=$.trim(_5fa.text()),_604=_602.slice(0,o.slicePoint);
if($.data(this,"expanderInit")){
return;
}
$.data(this,"expanderInit",true);
$.each(["onSlice","beforeExpand","afterExpand","onCollapse"],function(_605,val){
_5f8[val]=$.isFunction(o[val]);
});
_604=_615(_604);
_5ee=_604.replace(_5e6,"").length;
while(_5ee<o.slicePoint){
_5ed=_602.charAt(_604.length);
if(_5ed=="<"){
_5ed=_602.slice(_604.length).match(_5ea)[0];
}
_604+=_5ed;
_5ee++;
}
_604=_615(_604,o.preserveWords);
_5ef=_604.match(_5e7)||[];
_5f0=_604.match(_5e8)||[];
tmp=[];
$.each(_5ef,function(_606,val){
if(!_5e4.test(val)){
tmp.push(val);
}
});
_5ef=tmp;
l=_5f0.length;
for(i=0;i<l;i++){
_5f0[i]=_5f0[i].replace(_5e8,"$1");
}
$.each(_5ef,function(_607,val){
var _608=val.replace(_5e7,"$1");
var _609=$.inArray(_608,_5f0);
if(_609===-1){
_5f6.push(val);
_5f7.push("</"+_608+">");
}else{
_5f0.splice(_609,1);
}
});
_5f7.reverse();
if(!_5fc){
_5f2=_602.slice(_604.length);
_5f3=$.trim(_5f2.replace(_5e6,""));
if(_5f3===""||_5f3.split(/\s+/).length<o.widow){
return;
}
_5f1=_5f7.pop()||"";
_604+=_5f7.join("");
_5f2=_5f6.join("")+_5f2;
}else{
_5f2=_5fa.find(_5ff).remove().html();
_604=_5fa.html();
_602=_604+_5f2;
_5f1="";
}
o.moreLabel=_5fa.find(_600).length?"":_614(o);
if(_5fd){
_5f2=_602;
}
_604+=_5f1;
o.summary=_604;
o.details=_5f2;
o.lastCloseTag=_5f1;
if(_5f8.onSlice){
tmp=o.onSlice.call(_5f9,o);
o=tmp&&tmp.details?tmp:o;
}
var html=_611(o,_5fd);
_5fa.html(html);
_5f4=_5fa.find(_5ff);
_5f5=_5fa.find(_600);
_5f4[o.collapseEffect](0);
_5f5.find("a").unbind("click.expander").bind("click.expander",_60a);
_5fb=_5fa.find("div."+o.summaryClass);
if(o.userCollapse&&!_5fa.find("span."+o.lessClass).length){
_5fa.find(_5ff).append("<span class=\""+o.lessClass+"\">"+o.userCollapsePrefix+"<a href=\"#\">"+o.userCollapseText+"</a></span>");
}
_5fa.find("span."+o.lessClass+" a").unbind("click.expander").bind("click.expander",function(_60b){
_60b.preventDefault();
clearTimeout(_5eb);
var _60c=$(this).closest(_5ff);
_617(o,_60c);
if(_5f8.onCollapse){
o.onCollapse.call(_5f9,true);
}
});
function _60a(_60d){
_60d.preventDefault();
_5f5.hide();
_5fb.hide();
if(_5f8.beforeExpand){
o.beforeExpand.call(_5f9);
}
_5f4.stop(false,true)[o.expandEffect](_601,function(){
_5f4.css({zoom:""});
if(_5f8.afterExpand){
o.afterExpand.call(_5f9);
}
_60e(o,_5f4,_5f9);
});
};
});
},destroy:function(){
if(!this.data("expander")){
return;
}
this.removeData("expander");
this.each(function(){
var _60f=$(this),o=$.meta?$.extend({},opts,_60f.data()):opts,_610=_60f.find("."+o.detailClass).contents();
_60f.find("."+o.moreClass).remove();
_60f.find("."+o.summaryClass).remove();
_60f.find("."+o.detailClass).after(_610).remove();
_60f.find("."+o.lessClass).remove();
});
}};
if(_5ec[meth]){
_5ec[meth].call(this);
}
function _611(o,_612){
var el="span",_613=o.summary;
if(_612){
el="div";
if(_5e9.test(_613)&&!o.expandAfterSummary){
_613=_613.replace(_5e9,o.moreLabel+"$1");
}else{
_613+=o.moreLabel;
}
_613="<div class=\""+o.summaryClass+"\">"+_613+"</div>";
}else{
_613+=o.moreLabel;
}
return [_613,"<",el+" class=\""+o.detailClass+"\"",">",o.details,"</"+el+">"].join("");
};
function _614(o){
var ret="<span class=\""+o.moreClass+"\">"+o.expandPrefix;
ret+="<a href=\"#\">"+o.expandText+"</a></span>";
return ret;
};
function _615(txt,_616){
if(txt.lastIndexOf("<")>txt.lastIndexOf(">")){
txt=txt.slice(0,txt.lastIndexOf("<"));
}
if(_616){
txt=txt.replace(_5e5,"");
}
return $.trim(txt);
};
function _617(o,el){
el.stop(true,true)[o.collapseEffect](o.collapseSpeed,function(){
var _618=el.prev("span."+o.moreClass).show();
if(!_618.length){
el.parent().children("div."+o.summaryClass).show().find("span."+o.moreClass).show();
}
});
};
function _60e(_619,_61a,_61b){
if(_619.collapseTimer){
_5eb=setTimeout(function(){
_617(_619,_61a);
if($.isFunction(_619.onCollapse)){
_619.onCollapse.call(_61b,false);
}
},_619.collapseTimer);
}
};
return this;
};
$.fn.expander.defaults=$.expander.defaults;
})(jQuery);
(function($){
$.fn.checkLikeRadio=function(){
var that=this;
this.each(function(){
$(this).click(function(){
if($(this).attr("checked")){
var _61c=$(this);
$(that).each(function(){
if($(this)[0]!==_61c[0]){
$(this).attr("checked",false);
}
});
}
});
});
};
})(jQuery);
(function($){
$.fn.ajaxSubmit=function(_61d){
if(!this.length){
log("ajaxSubmit: skipping submit process - no element selected");
return this;
}
if(typeof _61d=="function"){
_61d={success:_61d};
}
var _61e=this.attr("action");
var url=(typeof _61e==="string")?$.trim(_61e):"";
if(url){
url=(url.match(/^([^#]+)/)||[])[1];
}
url=url||window.location.href||"";
_61d=$.extend(true,{url:url,type:this[0].getAttribute("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},_61d);
var veto={};
this.trigger("form-pre-serialize",[this,_61d,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this;
}
if(_61d.beforeSerialize&&_61d.beforeSerialize(this,_61d)===false){
log("ajaxSubmit: submit aborted via beforeSerialize callback");
return this;
}
var n,v,a=this.formToArray(_61d.semantic);
if(_61d.data){
_61d.extraData=_61d.data;
for(n in _61d.data){
if(_61d.data[n] instanceof Array){
for(var k in _61d.data[n]){
a.push({name:n,value:_61d.data[n][k]});
}
}else{
v=_61d.data[n];
v=$.isFunction(v)?v():v;
a.push({name:n,value:v});
}
}
}
if(_61d.beforeSubmit&&_61d.beforeSubmit(a,this,_61d)===false){
log("ajaxSubmit: submit aborted via beforeSubmit callback");
return this;
}
this.trigger("form-submit-validate",[a,this,_61d,veto]);
if(veto.veto){
log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;
}
var q=$.param(a);
if(_61d.type.toUpperCase()=="GET"){
_61d.url+=(_61d.url.indexOf("?")>=0?"&":"?")+q;
_61d.data=null;
}else{
_61d.data=q;
}
var _61f=this,_620=[];
if(_61d.resetForm){
_620.push(function(){
_61f.resetForm();
});
}
if(_61d.clearForm){
_620.push(function(){
_61f.clearForm();
});
}
if(!_61d.dataType&&_61d.target){
var _621=_61d.success||function(){
};
_620.push(function(data){
var fn=_61d.replaceTarget?"replaceWith":"html";
$(_61d.target)[fn](data).each(_621,arguments);
});
}else{
if(_61d.success){
_620.push(_61d.success);
}
}
_61d.success=function(data,_622,xhr){
var _623=_61d.context||_61d;
for(var i=0,max=_620.length;i<max;i++){
_620[i].apply(_623,[data,_622,xhr||_61f,_61f]);
}
};
var _624=$("input:file",this).length>0;
var mp="multipart/form-data";
var _625=(_61f.attr("enctype")==mp||_61f.attr("encoding")==mp);
if(_61d.iframe!==false&&(_624||_61d.iframe||_625)){
if(_61d.closeKeepAlive){
$.get(_61d.closeKeepAlive,_626);
}else{
_626();
}
}else{
$.ajax(_61d);
}
this.trigger("form-submit-notify",[this,_61d]);
return this;
function _626(){
var form=_61f[0];
if($(":input[name=submit],:input[id=submit]",form).length){
alert("Error: Form elements must not have name or id of \"submit\".");
return;
}
var s=$.extend(true,{},$.ajaxSettings,_61d);
s.context=s.context||s;
var id="jqFormIO"+(new Date().getTime()),fn="_"+id;
var $io=$("<iframe id=\""+id+"\" name=\""+id+"\" src=\""+s.iframeSrc+"\" />");
var io=$io[0];
$io.css({position:"absolute",top:"-1000px",left:"-1000px"});
var xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){
},getResponseHeader:function(){
},setRequestHeader:function(){
},abort:function(){
log("aborting upload...");
var e="aborted";
this.aborted=1;
$io.attr("src",s.iframeSrc);
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
s.complete&&s.complete.call(s.context,xhr,"error");
}};
var g=s.global;
if(g&&!$.active++){
$.event.trigger("ajaxStart");
}
if(g){
$.event.trigger("ajaxSend",[xhr,s]);
}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){
if(s.global){
$.active--;
}
return;
}
if(xhr.aborted){
return;
}
var _627=0;
var sub=form.clk;
if(sub){
var n=sub.name;
if(n&&!sub.disabled){
s.extraData=s.extraData||{};
s.extraData[n]=sub.value;
if(sub.type=="image"){
s.extraData[n+".x"]=form.clk_x;
s.extraData[n+".y"]=form.clk_y;
}
}
}
function _628(){
var t=_61f.attr("target"),a=_61f.attr("action");
form.setAttribute("target",id);
if(form.getAttribute("method")!="POST"){
form.setAttribute("method","POST");
}
if(form.getAttribute("action")!=s.url){
form.setAttribute("action",s.url);
}
if(!s.skipEncodingOverride){
_61f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});
}
if(s.timeout){
setTimeout(function(){
_627=true;
cb();
},s.timeout);
}
var _629=[];
try{
if(s.extraData){
for(var n in s.extraData){
_629.push($("<input type=\"hidden\" name=\""+n+"\" value=\""+s.extraData[n]+"\" />").appendTo(form)[0]);
}
}
$io.appendTo("body");
io.attachEvent?io.attachEvent("onload",cb):io.addEventListener("load",cb,false);
form.submit();
}
finally{
form.setAttribute("action",a);
if(t){
form.setAttribute("target",t);
}else{
_61f.removeAttr("target");
}
$(_629).remove();
}
};
if(s.forceSync){
_628();
}else{
setTimeout(_628,10);
}
var data,doc,_62a=50;
function cb(){
if(xhr.aborted){
return;
}
var doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;
if(!doc||doc.location.href==s.iframeSrc){
return;
}
io.detachEvent?io.detachEvent("onload",cb):io.removeEventListener("load",cb,false);
var ok=true;
try{
if(_627){
throw "timeout";
}
var _62b=s.dataType=="xml"||doc.XMLDocument||$.isXMLDoc(doc);
log("isXml="+_62b);
if(!_62b&&window.opera&&(doc.body==null||doc.body.innerHTML=="")){
if(--_62a){
log("requeing onLoad callback, DOM not available");
setTimeout(cb,250);
return;
}
}
xhr.responseText=doc.body?doc.body.innerHTML:doc.documentElement?doc.documentElement.innerHTML:null;
xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;
xhr.getResponseHeader=function(_62c){
var _62d={"content-type":s.dataType};
return _62d[_62c];
};
var scr=/(json|script)/.test(s.dataType);
if(scr||s.textarea){
var ta=doc.getElementsByTagName("textarea")[0];
if(ta){
xhr.responseText=ta.value;
}else{
if(scr){
var pre=doc.getElementsByTagName("pre")[0];
var b=doc.getElementsByTagName("body")[0];
if(pre){
xhr.responseText=pre.textContent;
}else{
if(b){
xhr.responseText=b.innerHTML;
}
}
}
}
}else{
if(s.dataType=="xml"&&!xhr.responseXML&&xhr.responseText!=null){
xhr.responseXML=_62e(xhr.responseText);
}
}
data=_630(xhr,s.dataType,s);
}
catch(e){
log("error caught:",e);
ok=false;
xhr.error=e;
s.error&&s.error.call(s.context,xhr,"error",e);
g&&$.event.trigger("ajaxError",[xhr,s,e]);
}
if(xhr.aborted){
log("upload aborted");
ok=false;
}
if(ok){
s.success&&s.success.call(s.context,data,"success",xhr);
g&&$.event.trigger("ajaxSuccess",[xhr,s]);
}
g&&$.event.trigger("ajaxComplete",[xhr,s]);
if(g&&!--$.active){
$.event.trigger("ajaxStop");
}
s.complete&&s.complete.call(s.context,xhr,ok?"success":"error");
setTimeout(function(){
$io.removeData("form-plugin-onload");
$io.remove();
xhr.responseXML=null;
},100);
};
var _62e=$.parseXML||function(s,doc){
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}else{
doc=(new DOMParser()).parseFromString(s,"text/xml");
}
return (doc&&doc.documentElement&&doc.documentElement.nodeName!="parsererror")?doc:null;
};
var _62f=$.parseJSON||function(s){
return window["eval"]("("+s+")");
};
var _630=function(xhr,type,s){
var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){
$.error&&$.error("parsererror");
}
if(s&&s.dataFilter){
data=s.dataFilter(data,type);
}
if(typeof data==="string"){
if(type==="json"||!type&&ct.indexOf("json")>=0){
data=_62f(data);
}else{
if(type==="script"||!type&&ct.indexOf("javascript")>=0){
$.globalEval(data);
}
}
}
return data;
};
};
};
$.fn.ajaxForm=function(_631){
if(this.length===0){
var o={s:this.selector,c:this.context};
if(!$.isReady&&o.s){
log("DOM not ready, queuing ajaxForm");
$(function(){
$(o.s,o.c).ajaxForm(_631);
});
return this;
}
log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));
return this;
}
return this.ajaxFormUnbind().bind("submit.form-plugin",function(e){
if(!e.isDefaultPrevented()){
e.preventDefault();
$(this).ajaxSubmit(_631);
}
}).bind("click.form-plugin",function(e){
var _632=e.target;
var $el=$(_632);
if(!($el.is(":submit,input:image"))){
var t=$el.closest(":submit");
if(t.length==0){
return;
}
_632=t[0];
}
var form=this;
form.clk=_632;
if(_632.type=="image"){
if(e.offsetX!=undefined){
form.clk_x=e.offsetX;
form.clk_y=e.offsetY;
}else{
if(typeof $.fn.offset=="function"){
var _633=$el.offset();
form.clk_x=e.pageX-_633.left;
form.clk_y=e.pageY-_633.top;
}else{
form.clk_x=e.pageX-_632.offsetLeft;
form.clk_y=e.pageY-_632.offsetTop;
}
}
}
setTimeout(function(){
form.clk=form.clk_x=form.clk_y=null;
},100);
});
};
$.fn.ajaxFormUnbind=function(){
return this.unbind("submit.form-plugin click.form-plugin");
};
$.fn.formToArray=function(_634){
var a=[];
if(this.length===0){
return a;
}
var form=this[0];
var els=_634?form.getElementsByTagName("*"):form.elements;
if(!els){
return a;
}
var i,j,n,v,el,max,jmax;
for(i=0,max=els.length;i<max;i++){
el=els[i];
n=el.name;
if(!n){
continue;
}
if(_634&&form.clk&&el.type=="image"){
if(!el.disabled&&form.clk==el){
a.push({name:n,value:$(el).val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
continue;
}
v=$.fieldValue(el,true);
if(v&&v.constructor==Array){
for(j=0,jmax=v.length;j<jmax;j++){
a.push({name:n,value:v[j]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:n,value:v});
}
}
}
if(!_634&&form.clk){
var _635=$(form.clk),_636=_635[0];
n=_636.name;
if(n&&!_636.disabled&&_636.type=="image"){
a.push({name:n,value:_635.val()});
a.push({name:n+".x",value:form.clk_x},{name:n+".y",value:form.clk_y});
}
}
return a;
};
$.fn.formSerialize=function(_637){
return $.param(this.formToArray(_637));
};
$.fn.fieldSerialize=function(_638){
var a=[];
this.each(function(){
var n=this.name;
if(!n){
return;
}
var v=$.fieldValue(this,_638);
if(v&&v.constructor==Array){
for(var i=0,max=v.length;i<max;i++){
a.push({name:n,value:v[i]});
}
}else{
if(v!==null&&typeof v!="undefined"){
a.push({name:this.name,value:v});
}
}
});
return $.param(a);
};
$.fn.fieldValue=function(_639){
for(var val=[],i=0,max=this.length;i<max;i++){
var el=this[i];
var v=$.fieldValue(el,_639);
if(v===null||typeof v=="undefined"||(v.constructor==Array&&!v.length)){
continue;
}
v.constructor==Array?$.merge(val,v):val.push(v);
}
return val;
};
$.fieldValue=function(el,_63a){
var n=el.name,t=el.type,tag=el.tagName.toLowerCase();
if(_63a===undefined){
_63a=true;
}
if(_63a&&(!n||el.disabled||t=="reset"||t=="button"||(t=="checkbox"||t=="radio")&&!el.checked||(t=="submit"||t=="image")&&el.form&&el.form.clk!=el||tag=="select"&&el.selectedIndex==-1)){
return null;
}
if(tag=="select"){
var _63b=el.selectedIndex;
if(_63b<0){
return null;
}
var a=[],ops=el.options;
var one=(t=="select-one");
var max=(one?_63b+1:ops.length);
for(var i=(one?_63b:0);i<max;i++){
var op=ops[i];
if(op.selected){
var v=op.value;
if(!v){
v=(op.attributes&&op.attributes["value"]&&!(op.attributes["value"].specified))?op.text:op.value;
}
if(one){
return v;
}
a.push(v);
}
}
return a;
}
return $(el).val();
};
$.fn.clearForm=function(){
return this.each(function(){
$("input,select,textarea",this).clearFields();
});
};
$.fn.clearFields=$.fn.clearInputs=function(){
return this.each(function(){
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
});
};
$.fn.resetForm=function(){
return this.each(function(){
if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){
this.reset();
}
});
};
$.fn.enable=function(b){
if(b===undefined){
b=true;
}
return this.each(function(){
this.disabled=!b;
});
};
$.fn.selected=function(_63c){
if(_63c===undefined){
_63c=true;
}
return this.each(function(){
var t=this.type;
if(t=="checkbox"||t=="radio"){
this.checked=_63c;
}else{
if(this.tagName.toLowerCase()=="option"){
var $sel=$(this).parent("select");
if(_63c&&$sel[0]&&$sel[0].type=="select-one"){
$sel.find("option").selected(false);
}
this.selected=_63c;
}
}
});
};
function log(){
if($.fn.ajaxSubmit.debug){
var msg="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){
window.console.log(msg);
}else{
if(window.opera&&window.opera.postError){
window.opera.postError(msg);
}
}
}
};
})(jQuery);
(function($){
$.ui=$.ui||{};
$.fn.extend({accordion:function(_63d,data){
var args=Array.prototype.slice.call(arguments,1);
return this.each(function(){
if(typeof _63d=="string"){
var _63e=$.data(this,"ui-accordion");
_63e[_63d].apply(_63e,args);
}else{
if(!$(this).is(".ui-accordion")){
$.data(this,"ui-accordion",new $.ui.accordion(this,_63d));
}
}
});
},activate:function(_63f){
return this.accordion("activate",_63f);
}});
$.ui.accordion=function(_640,_641){
this.options=_641=$.extend({},$.ui.accordion.defaults,_641);
this.element=_640;
$(_640).addClass("ui-accordion");
if(_641.navigation){
var _642=$(_640).find("a").filter(_641.navigationFilter);
if(_642.length){
if(_642.filter(_641.header).length){
_641.active=_642;
}else{
_641.active=_642.parent().parent().prev();
_642.addClass("current");
}
}
}
_641.headers=$(_640).find(_641.header);
_641.active=_643(_641.headers,_641.active);
if(_641.fillSpace){
var _644=$(_640).parent().height();
_641.headers.each(function(){
_644-=$(this).outerHeight();
});
var _645=0;
_641.headers.next().each(function(){
_645=Math.max(_645,$(this).innerHeight()-$(this).height());
}).height(_644-_645);
}else{
if(_641.autoheight){
var _644=0;
_641.headers.next().each(function(){
_644=Math.max(_644,$(this).outerHeight());
}).height(_644);
}
}
_641.headers.not(_641.active||"").next().hide();
_641.active.parent().andSelf().addClass(_641.selectedClass);
if(_641.event){
$(_640).bind((_641.event)+".ui-accordion",_646);
}
};
$.ui.accordion.prototype={activate:function(_647){
_646.call(this.element,{target:_643(this.options.headers,_647)[0]});
},enable:function(){
this.options.disabled=false;
},disable:function(){
this.options.disabled=true;
},destroy:function(){
this.options.headers.next().css("display","");
if(this.options.fillSpace||this.options.autoheight){
this.options.headers.next().css("height","");
}
$.removeData(this.element,"ui-accordion");
$(this.element).removeClass("ui-accordion").unbind(".ui-accordion");
}};
function _648(_649,_64a){
return function(){
return _649.apply(_64a,arguments);
};
};
function _64b(_64c){
if(!$.data(this,"ui-accordion")){
return;
}
var _64d=$.data(this,"ui-accordion");
var _64e=_64d.options;
_64e.running=_64c?0:--_64e.running;
if(_64e.running){
return;
}
if(_64e.clearStyle){
_64e.toShow.add(_64e.toHide).css({height:"",overflow:""});
}
$(this).triggerHandler("change.ui-accordion",[_64e.data],_64e.change);
};
function _64f(_650,_651,data,_652,down){
var _653=$.data(this,"ui-accordion").options;
_653.toShow=_650;
_653.toHide=_651;
_653.data=data;
var _654=_648(_64b,this);
_653.running=_651.size()==0?_650.size():_651.size();
if(_653.animated){
if(!_653.alwaysOpen&&_652){
$.ui.accordion.animations[_653.animated]({toShow:jQuery([]),toHide:_651,complete:_654,down:down,autoheight:_653.autoheight});
}else{
$.ui.accordion.animations[_653.animated]({toShow:_650,toHide:_651,complete:_654,down:down,autoheight:_653.autoheight});
}
}else{
if(!_653.alwaysOpen&&_652){
_650.toggle();
}else{
_651.hide();
_650.show();
}
_654(true);
}
};
function _646(_655){
var _656=$.data(this,"ui-accordion").options;
if(_656.disabled){
return false;
}
if(!_655.target&&!_656.alwaysOpen){
_656.active.parent().andSelf().toggleClass(_656.selectedClass);
var _657=_656.active.next(),data={instance:this,options:_656,newHeader:jQuery([]),oldHeader:_656.active,newContent:jQuery([]),oldContent:_657},_658=_656.active=$([]);
_64f.call(this,_658,_657,data);
return false;
}
var _659=$(_655.target);
if(_659.parents(_656.header).length){
while(!_659.is(_656.header)){
_659=_659.parent();
}
}
var _65a=_659[0]==_656.active[0];
if(_656.running||(_656.alwaysOpen&&_65a)){
return false;
}
if(!_659.is(_656.header)){
return;
}
_656.active.parent().andSelf().toggleClass(_656.selectedClass);
if(!_65a){
_659.parent().andSelf().addClass(_656.selectedClass);
}
var _658=_659.next(),_657=_656.active.next(),data={instance:this,options:_656,newHeader:_659,oldHeader:_656.active,newContent:_658,oldContent:_657},down=_656.headers.index(_656.active[0])>_656.headers.index(_659[0]);
_656.active=_65a?$([]):_659;
_64f.call(this,_658,_657,data,_65a,down);
return false;
};
function _643(_65b,_65c){
return _65c!=undefined?typeof _65c=="number"?_65b.filter(":eq("+_65c+")"):_65b.not(_65b.not(_65c)):_65c===false?$([]):_65b.filter(":eq(0)");
};
$.extend($.ui.accordion,{defaults:{selectedClass:"selected",alwaysOpen:true,animated:"slide",event:"click",header:"a",autoheight:true,running:0,navigationFilter:function(){
return this.href.toLowerCase()==location.href.toLowerCase();
}},animations:{slide:function(_65d,_65e){
_65d=$.extend({easing:"swing",duration:300},_65d,_65e);
if(!_65d.toHide.size()){
_65d.toShow.animate({height:"show"},_65d);
return;
}
var _65f=_65d.toHide.height(),_660=_65d.toShow.height(),_661=_660/_65f;
_65d.toShow.css({height:0,overflow:"hidden"}).show();
_65d.toHide.filter(":hidden").each(_65d.complete).end().filter(":visible").animate({height:"hide"},{step:function(now){
var _662=(_65f-now)*_661;
if($.browser.msie||$.browser.opera){
_662=Math.ceil(_662);
}
_65d.toShow.height(_662);
},duration:_65d.duration,easing:_65d.easing,complete:function(){
if(!_65d.autoheight){
_65d.toShow.css("height","auto");
}
_65d.complete();
}});
},bounceslide:function(_663){
this.slide(_663,{easing:_663.down?"bounceout":"swing",duration:_663.down?1000:200});
},easeslide:function(_664){
this.slide(_664,{easing:"easeinout",duration:700});
}}});
})(jQuery);
(function($){
var tmp,_665,_666,wrap,_667,_668,_669,_66a,_66b,_66c=0,_66d={},_66e=[],_66f=0,_670={},_671=[],_672=null,_673=new Image(),_674=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_675=/[^\.]\.(swf)\s*$/i,_676,_677=1,_678,_679,busy=false,_67a=20,fx=$.extend($("<div/>")[0],{prop:0}),_67b=0,_67c=!$.support.opacity&&!window.XMLHttpRequest,_67d=function(){
_665.hide();
_673.onerror=_673.onload=null;
if(_672){
_672.abort();
}
tmp.empty();
},_67e=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_67f=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_680=function(){
var view=_67f(),to={},_681=_670.margin,_682=_670.autoScale,_683=(_67a+_681)*2,_684=(_67a+_681)*2,_685=(_670.padding*2),_686;
if(_670.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_670.width))/100)-(_67a*2);
_682=false;
}else{
to.width=_670.width+_685;
}
if(_670.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_670.height))/100)-(_67a*2);
_682=false;
}else{
to.height=_670.height+_685;
}
if(_682&&(to.width>(view[0]-_683)||to.height>(view[1]-_684))){
if(_66d.type=="image"||_66d.type=="swf"){
_683+=_685;
_684+=_685;
_686=Math.min(Math.min(view[0]-_683,_670.width)/_670.width,Math.min(view[1]-_684,_670.height)/_670.height);
to.width=Math.round(_686*(to.width-_685))+_685;
to.height=Math.round(_686*(to.height-_685))+_685;
}else{
to.width=Math.min(to.width,(view[0]-_683));
to.height=Math.min(to.height,(view[1]-_684));
}
}
to.top=view[3]+((view[1]-(to.height+(_67a*2)))*0.5);
if(_670.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_67a*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_670.minWidth)+(_67a*2)))*0.5);
}
if(_670.autoScale===false){
to.top=Math.max(view[3]+_681,to.top);
to.left=Math.max(view[2]+_681,to.left);
}
return to;
},_687=function(_688){
if(_688&&_688.length){
switch(_670.titlePosition){
case "inside":
return _688;
case "over":
return "<span id=\"fancybox-title-over\">"+_688+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_688+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_689=function(){
var _68a=_670.title,_68b=_679.width-(_670.padding*2),_68c="fancybox-title-"+_670.titlePosition;
$("#fancybox-title").remove();
_67b=0;
if(_670.titleShow===false){
return;
}
_68a=$.isFunction(_670.titleFormat)?_670.titleFormat(_68a,_671,_66f,_670):_687(_68a);
if(!_68a||_68a===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_68c+"\" />").css({"width":_68b,"paddingLeft":_670.padding,"paddingRight":_670.padding}).html(_68a).appendTo("body");
switch(_670.titlePosition){
case "inside":
_67b=$("#fancybox-title").outerHeight(true)-_670.padding;
_679.height+=_67b;
break;
case "over":
$("#fancybox-title").css("bottom",_670.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_667).hide();
},_68d=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_670.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else{
if(e.keyCode==37){
e.preventDefault();
$.fancybox.prev();
}else{
if(e.keyCode==39){
e.preventDefault();
$.fancybox.next();
}
}
}
});
if($.fn.mousewheel){
wrap.unbind("mousewheel.fb");
if(_671.length>1){
wrap.bind("mousewheel.fb",function(e,_68e){
e.preventDefault();
if(busy||_68e===0){
return;
}
if(_68e>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_670.showNavArrows){
return;
}
if((_670.cyclic&&_671.length>1)||_66f!==0){
_66a.show();
}
if((_670.cyclic&&_671.length>1)||_66f!=(_671.length-1)){
_66b.show();
}
},_68f=function(){
var href,_690;
if((_671.length-1)>_66f){
href=_671[_66f+1].href;
if(typeof href!=="undefined"&&href.match(_674)){
_690=new Image();
_690.src=href;
}
}
if(_66f>0){
href=_671[_66f-1].href;
if(typeof href!=="undefined"&&href.match(_674)){
_690=new Image();
_690.src=href;
}
}
},_691=function(){
_668.css("overflow",(_670.scrolling=="auto"?(_670.type=="image"||_670.type=="iframe"||_670.type=="swf"?"hidden":"auto"):(_670.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_668.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_670.hideOnContentClick){
_668.one("click",$.fancybox.close);
}
if(_670.hideOnOverlayClick){
_666.one("click",$.fancybox.close);
}
if(_670.showCloseButton){
_669.show();
}
_68d();
$(window).bind("resize.fb",$.fancybox.center);
if(_670.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_670.onComplete)){
_670.onComplete(_671,_66f,_670);
}
busy=false;
_68f();
},_692=function(pos){
var _693=Math.round(_678.width+(_679.width-_678.width)*pos),_694=Math.round(_678.height+(_679.height-_678.height)*pos),top=Math.round(_678.top+(_679.top-_678.top)*pos),left=Math.round(_678.left+(_679.left-_678.left)*pos);
wrap.css({"width":_693+"px","height":_694+"px","top":top+"px","left":left+"px"});
_693=Math.max(_693-_670.padding*2,0);
_694=Math.max(_694-(_670.padding*2+(_67b*pos)),0);
_668.css({"width":_693+"px","height":_694+"px"});
if(typeof _679.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_695=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_696=function(){
var orig=_66d.orig?$(_66d.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_695(orig);
from={width:(pos.width+(_670.padding*2)),height:(pos.height+(_670.padding*2)),top:(pos.top-_670.padding-_67a),left:(pos.left-_670.padding-_67a)};
}else{
view=_67f();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_697=function(){
_665.hide();
if(wrap.is(":visible")&&$.isFunction(_670.onCleanup)){
if(_670.onCleanup(_671,_66f,_670)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_671=_66e;
_66f=_66c;
_670=_66d;
_668.get(0).scrollTop=0;
_668.get(0).scrollLeft=0;
if(_670.overlayShow){
if(_67c){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_666.css({"background-color":_670.overlayColor,"opacity":_670.overlayOpacity}).unbind().show();
}
_668.css("background-color",_670.innerColor);
_679=_680();
_689();
if(wrap.is(":visible")){
$(_669.add(_66a).add(_66b)).hide();
var pos=wrap.position(),_698;
_678={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_698=(_678.width==_679.width&&_678.height==_679.height);
_668.fadeOut(_670.changeFade,function(){
var _699=function(){
_668.html(tmp.contents()).fadeIn(_670.changeFade,_691);
};
$.event.trigger("fancybox-change");
_668.empty().css("overflow","hidden");
if(_698){
_668.css({top:_670.padding,left:_670.padding,width:Math.max(_679.width-(_670.padding*2),1),height:Math.max(_679.height-(_670.padding*2)-_67b,1)});
_699();
}else{
_668.css({top:_670.padding,left:_670.padding,width:Math.max(_678.width-(_670.padding*2),1),height:Math.max(_678.height-(_670.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_670.changeSpeed,easing:_670.easingChange,step:_692,complete:_699});
}
});
return;
}
wrap.css("opacity",1);
if(_670.transitionIn=="elastic"){
_678=_696();
_668.css({top:_670.padding,left:_670.padding,width:Math.max(_678.width-(_670.padding*2),1),height:Math.max(_678.height-(_670.padding*2),1)}).html(tmp.contents());
wrap.css(_678).show();
if(_670.opacity){
_679.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_670.speedIn,easing:_670.easingIn,step:_692,complete:_691});
}else{
_668.css({top:_670.padding,left:_670.padding,width:Math.max(_679.width-(_670.padding*2),1),height:Math.max(_679.height-(_670.padding*2)-_67b,1)}).html(tmp.contents());
wrap.css(_679).fadeIn(_670.transitionIn=="none"?0:_670.speedIn,_691);
}
},_69a=function(){
tmp.width(_66d.width);
tmp.height(_66d.height);
if(_66d.width=="auto"){
_66d.width=tmp.width();
}
if(_66d.height=="auto"){
_66d.height=tmp.height();
}
_697();
},_69b=function(){
busy=true;
_66d.width=_673.width;
_66d.height=_673.height;
$("<img />").attr({"id":"fancybox-img","src":_673.src,"alt":_66d.title}).appendTo(tmp);
_697();
},_69c=function(){
_67d();
var obj=_66e[_66c],href,type,_69d,str,emb,_69e,data;
_66d=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_66d:$(obj).data("fancybox")));
_69d=obj.title||$(obj).title||_66d.title||"";
if(obj.nodeName&&!_66d.orig){
_66d.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_69d===""&&_66d.orig){
_69d=_66d.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_66d.href||jq(obj).attr("href")||null;
}else{
href=_66d.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_66d.type){
type=_66d.type;
if(!href){
href=_66d.content;
}
}else{
if(_66d.content){
type="html";
}else{
if(href){
if(href.match(_674)){
type="image";
}else{
if(href.match(_675)){
type="swf";
}else{
if($(obj).hasClass("iframe")){
type="iframe";
}else{
if(href.match(/#/)){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?"inline":"ajax";
}else{
type="ajax";
}
}
}
}
}else{
type="inline";
}
}
}
_66d.type=type;
_66d.href=href;
_66d.title=_69d;
if(_66d.autoDimensions&&_66d.type!=="iframe"&&_66d.type!=="swf"){
_66d.width="auto";
_66d.height="auto";
}
if(_66d.modal){
_66d.overlayShow=true;
_66d.hideOnOverlayClick=false;
_66d.hideOnContentClick=false;
_66d.enableEscapeButton=false;
_66d.showCloseButton=false;
}
if($.isFunction(_66d.onStart)){
if(_66d.onStart(_66e,_66c,_66d)===false){
busy=false;
return;
}
}
tmp.css("padding",(_67a+_66d.padding+_66d.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_668.children());
});
switch(type){
case "html":
tmp.html(_66d.content);
_69a();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_668.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_69a();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_673=new Image();
_673.onerror=function(){
_67e();
};
_673.onload=function(){
_673.onerror=null;
_673.onload=null;
_69b();
};
_673.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_66d.width+"\" height=\""+_66d.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_66d.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_66d.width+"\" height=\""+_66d.height+"\""+emb+"></embed></object>";
tmp.html(str);
_69a();
break;
case "ajax":
_69e=href.split("#",2);
data=_66d.ajax.data||{};
if(_69e.length>1){
href=_69e[0];
if(typeof data=="string"){
data+="&selector="+_69e[1];
}else{
data.selector=_69e[1];
}
}
busy=false;
$.fancybox.showActivity();
_672=$.ajax($.extend(_66d.ajax,{url:href,data:data,error:_67e,success:function(data,_69f,_6a0){
if(_672.status==200){
tmp.html(data);
_69a();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_66d.scrolling+"\" src=\""+_66d.href+"\"></iframe>").appendTo(tmp);
_697();
break;
}
},_6a1=function(){
if(!_665.is(":visible")){
clearInterval(_676);
return;
}
$("div",_665).css("top",(_677*-40)+"px");
_677=(_677+1)%12;
},_6a2=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_665=$("<div id=\"fancybox-loading\"><div></div></div>"),_666=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_665.addClass("fancybox-ie");
}
_667=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_667.append(_668=$("<div id=\"fancybox-inner\"></div>"),_669=$("<a id=\"fancybox-close\"></a>"),_66a=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_66b=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_669.click($.fancybox.close);
_665.click($.fancybox.cancel);
_66a.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_66b.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_67c){
_666.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_665.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_667.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_6a3){
$(this).data("fancybox",$.extend({},_6a3,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_66e=[];
_66c=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_66e.push(this);
}else{
_66e=$("a[rel="+rel+"], area[rel="+rel+"]");
_66c=_66e.index(this);
}
_69c();
return false;
});
return this;
};
$.fancybox=function(obj){
if(busy){
return;
}
busy=true;
var opts=typeof arguments[1]!=="undefined"?arguments[1]:{};
_66e=[];
_66c=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_66e=jQuery.merge(_66e,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_66e.push(obj);
}
if(_66c>_66e.length||_66c<0){
_66c=0;
}
_69c();
};
$.fancybox.showActivity=function(){
clearInterval(_676);
_665.show();
_676=setInterval(_6a1,66);
};
$.fancybox.update=function(rel){
_66e=$("a[rel="+rel+"], area[rel="+rel+"]");
};
$.fancybox.hideActivity=function(){
_665.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_66f+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_66f-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_671.length>pos){
_66c=pos;
_69c();
}
if(_670.cyclic&&_671.length>1&&pos<0){
_66c=_671.length-1;
_69c();
}
if(_670.cyclic&&_671.length>1&&pos>=_671.length){
_66c=0;
_69c();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_67d();
if(_66d&&$.isFunction(_66d.onCancel)){
_66d.onCancel(_66e,_66c,_66d);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_670&&$.isFunction(_670.onCleanup)){
if(_670.onCleanup(_671,_66f,_670)===false){
busy=false;
return;
}
}
_67d();
$(_669.add(_66a).add(_66b)).hide();
$("#fancybox-title").remove();
wrap.add(_668).add(_666).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _6a4(){
_666.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_668.empty();
if($.isFunction(_670.onClosed)){
_670.onClosed(_671,_66f,_670);
}
_671=_66d=[];
_66f=_66c=0;
_670=_66d={};
busy=false;
};
_668.css("overflow","hidden");
if(_670.transitionOut=="elastic"){
_678=_696();
var pos=wrap.position();
_679={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_670.opacity){
_679.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_670.speedOut,easing:_670.easingOut,step:_692,complete:_6a4});
}else{
wrap.fadeOut(_670.transitionOut=="none"?0:_670.speedOut,_6a4);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_668.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_670.padding*2)+_67b});
_668.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_67f(),_6a5=_670.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_67b)+(_67a*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_67a*2)))*0.5);
to.top=Math.max(view[3]+_6a5,to.top);
to.left=Math.max(view[2]+_6a5,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",innerColor:"inherited",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_6a2();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_6a6){
this._container=jQuery(_6a6);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_6a7){
};
HubPages.Lightbox.f$=function(_6a8){
return jQuery(_6a8,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_6a9){
return jQuery(_6a9,this._container);
};
HubPages.Lightbox.MyPhotos=function(_6aa){
this._container=jQuery(_6aa);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_6ab,_6ac,_6ad){
if(_6ab!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_6ac.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_6ac.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_6ac);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_6ad<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_6ab,_6ac,_6ad+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_6ae){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_6ae);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_6af,_6b0,_6b1){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_6af[_6b0]).attr("href");
var _6b2=href.lastIndexOf("/");
var _6b3=_6b2==-1?0:href.slice(_6b2+1,-4);
this._currentImageId=_6b3;
jQuery.post("/xml/photos/locations/",{id:_6b3},jQuery.proxy(function(_6b4){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_6b3,_6b4,0);
},this));
};
HubPages.Lightbox.MyPhotos.prototype.isLoadComplete=function(){
return this._ready;
};
HubPages.Lightbox.MyPhotos.prototype.loadStarted=function(){
this._ready=false;
};
HubPages.Lightbox.MyPhotos.prototype.loadCompleted=function(){
this._ready=true;
};
HubPages.Lightbox.Slideshow=function(_6b5){
this._id=_6b5.id;
this._title=_6b5.title;
this._url=_6b5.url;
this._type=_6b5.type;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_6b5.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_6b6){
var id=_6b6.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_6b6);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_6b6.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(_6b7,_6b8){
var self=this;
if(this._type=="Hub"){
self._start=0;
jQuery.ajax({async:false,data:{id:this._id},dataType:"json",error:function(jxhr,_6b9,_6ba){
alert("Something went wrong. Please, reload the page.");
},success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
}else{
if(_6b7===undefined){
self._start=0;
self._limit=10;
}else{
self._start=_6b7;
self._limit=_6b8;
}
jQuery.ajax({async:false,data:{userId:this._id,start:self._start,limit:self._limit},dataType:"json",error:function(jxhr,_6bb,_6bc){
alert("Something went wrong. Please, reload the page.");
},success:function(data){
if(self._container.size()!==0){
HubPages.Lightbox.Slideshow.loadImages.call(self,data.images);
self._photoData.images=self._photoData.images.concat(data.images);
}else{
self._buildGui.call(self,data);
}
},timeout:6000,type:"GET",url:"/slideshow/"});
}
};
HubPages.Lightbox.Slideshow.prototype._buildGui=function(data){
this._container=jQuery("<div />").attr("id","slideshow_"+this._id);
this._container.addClass("slideshow").hide().appendTo("body");
this._photoData=data;
this._lastIndex=-1;
this._fireTracking=true;
this._counter=0;
this._startTime=(new Date()).getTime()/1000;
jQuery("body").delegate("#fancybox-wrap, #fancybox-inner, #fancybox-inner .content","mouseenter",function(){
if(!jq(this).hasClass("slide_image")){
return;
}
jQuery("#fancybox-right-ico").show();
jQuery("#fancybox-left-ico").show();
});
jQuery("body").delegate("#fancybox-wrap","mouseleave",function(){
if(!jq(this).hasClass("slide_image")){
return;
}
jQuery("#fancybox-right-ico").hide();
jQuery("#fancybox-left-ico").hide();
});
HubPages.Lightbox.Slideshow.loadImages.call(this,data.images);
if(data.related!==undefined){
var _6bd=jQuery("<a />").attr("href","#related_slideshows_"+this._id);
_6bd.addClass("lightbox").attr("rel","slideshow_"+this._id);
_6bd.appendTo(this._container);
var _6be=jQuery("<div />").attr("id","related_slideshows_"+this._id);
_6be.addClass("related_slideshows");
if(data.related.length){
_6be.append("<h2>View These Related Slideshows</h2>");
}else{
_6be.append("<h2>This Hub has no related slideshows</h2>");
}
_6be.appendTo(this._container);
var list=jQuery("<ul />");
_6be.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_6be);
}
var _6bf=jQuery("<li />");
_6bf.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _6c0=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),type:"Hub",auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _6c1=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_6c1);
_6bf.append(linkDiv);
_6bf.append("<br />");
var _6c2=jQuery("<img />").attr("src",item.thumb);
_6c2.appendTo(_6c0);
_6c0.appendTo(_6bf);
_6c0.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
}
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _6c3=jQuery("<div />").addClass("pinit_wrap");
_6c3.appendTo(this._socialBar);
var _6c4=jQuery("<div />").addClass("twitter_wrap");
_6c4.appendTo(this._socialBar);
var _6c5=jQuery("<div />").addClass("fb_share_wrap");
_6c5.appendTo(this._socialBar);
if(this._type=="Hub"){
_6c4.html(data.social.twitter);
_6c5.html(data.social.fb_share);
}
this._container.append(this._socialBar.show());
jQuery.address.strict(false);
jQuery.address.externalChange(function(e){
var hash=e.value;
if(hash.substr(0,5)=="slide"){
imgId=hash.replace("slide","");
jQuery("#slideshow_img_"+imgId).click();
}else{
if(hash==""){
jQuery.fancybox.close();
}
}
});
this.c$("a.lightbox").fancybox(this.options);
jq(document).trigger("slideshow_loaded");
};
HubPages.Lightbox.Slideshow.loadImages=function(_6c6){
var _6c7=this._start;
jQuery.each(_6c6,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({id:"slideshow_img_"+item.id,href:"#"+this._id+"_"+_6c7,rel:"slideshow_"+this._id,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._id+"_"+_6c7}).addClass("content");
div.appendTo(this._container);
var _6c8=jQuery("<div />");
_6c8.appendTo(div);
var _6c9=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_6c9.data("source",item.source);
_6c9.appendTo(_6c8);
_6c7++;
},this));
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_6ca,_6cb,_6cc,_6cd,_6ce){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
if(_6ce===undefined){
_6ce="Normal";
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_6ca;
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("20%");
jQuery("body").delegate(_6cd,"click",function(e){
var _6cf=HubPages.Lightbox.Slideshow.defaultHubId,_6d0="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
jq("#fancybox-wrap").addClass("slide_image");
if(!HubPages.Lightbox.Slideshow._slides[_6cf]){
HubPages.Lightbox.Slideshow.create({id:_6cf,title:_6cb,url:_6cc,type:_6ce});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
if(_6ce=="Hub"){
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1"),link=jQuery(_6d0+":has(img[src*=\""+id+"\"])"),_6d1=jQuery(_6d0).index(link);
HubPages.Lightbox.Slideshow._slides[_6cf].init();
if(_6d1>=0){
jQuery(".slideshow:first > a").eq(_6d1).click();
}
}else{
jQuery(".slideshow:first > a").eq(0).click();
}
});
jQuery(window).resize(function(){
if(typeof (_6d2)!="undefined"){
clearTimeout(_6d2);
}
var _6d2=setTimeout(function(){
var _6d3=jQuery("#fancybox-inner > div:visible").attr("id");
if(_6d3){
jQuery(".slideshow a[href=#"+_6d3+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._id);
var _6d4=this._container.size()==0;
if(_6d4){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_6d5,_6d6){
if(!jQuery("#fancybox-outer-title").length){
var _6d7=jQuery("<div />").attr("id","fancybox-outer-title");
var _6d8=jQuery("#fancybox-inner");
_6d8.before(_6d7);
}
var _6d9=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_6d9);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_6da,_6db){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
var _6dc=jq(window).scrollTop();
jQuery.address.value("");
jQuery(window).scrollTop(_6dc);
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_6dd,_6de){
var _6df=jQuery(".overlay_image").removeClass("overlay_image").css("visibility","hidden");
_6df.siblings("div").remove();
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_6e0,_6e1){
jQuery.fancybox.hideActivity();
var _6e2=_6e1+1;
if(this._type!="Hub"){
if(_6e2===1){
jQuery("#fancybox-left").hide();
}else{
if(_6e2>1){
jQuery("#fancybox-left").show();
}
}
if(_6e2==(_6e0.length-1)&&_6e0.length<this._photoData.total_images){
this.load(_6e0.length,10);
jQuery.fancybox.update("slideshow_"+this._id);
}
}
if(this._type=="Hub"){
if(_6e2>=_6e0.length){
return;
}
}
var _6e3=HubPages.Lightbox.f$("#fancybox-inner");
_6e3.height(_6e3.height()-70).css("overflow","visible");
var _6e4=_6e3.find("> .content img");
var _6e5=this._photoData.images[_6e1];
if(this._type!="Hub"){
jQuery("#fancybox-outer-title > a").replaceWith(_6e5.url_title);
}
jq.address.value("slide"+_6e5.id);
_6e4.css({width:"auto",height:"auto",maxWidth:(_6e3.innerWidth()-60)+"px",maxHeight:(_6e3.innerHeight()-100)+"px"});
if(_6e3.innerHeight()>0&&_6e4.height()>0){
var _6e6=(_6e3.innerHeight()-_6e4.height())/2;
_6e4.parent().css({width:_6e4.width(),height:_6e4.height(),margin:"0px auto",paddingTop:"10px"});
_6e4.parent().css("margin-top",_6e6+"px");
_6e4.css("visibility","visible").addClass("overlay_image");
if(_6e4.width()>250){
this.loadGoogleAds();
}
}else{
_6e4.load(function(){
var _6e7=HubPages.Lightbox.f$("#fancybox-inner");
var _6e8=_6e7.find("> .content img");
var _6e9=(_6e7.innerHeight()-_6e8.height())/2;
_6e8.parent().css({width:_6e8.width(),height:_6e8.height(),margin:"0px auto",paddingTop:"10px"});
_6e8.parent().css("margin-top",_6e9+"px");
_6e8.css("visibility","visible").addClass("overlay_image");
if(_6e8.width()>250){
this.loadGoogleAds();
}
}.bind(this));
}
var _6ea=jQuery(_6e0[_6e1]).attr("rel");
var _6eb=jQuery("#"+_6ea).find(".content img");
var _6ec=(new Date()).getTime()/1000;
var _6ed=_6ec-this._startTime;
var _6ee=this._counter/_6ed;
if(this._fireTracking&&_6ed>10&&_6ee>1){
this._fireTracking=false;
jQuery.ajax({url:"/xml/reporterror.php",type:"POST",data:{error:"Too many slideshow views! Loaded "+this._counter+" slideshow images in "+_6ed+" seconds (ratio: "+_6ee+")"}});
}
if(this._fireTracking){
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_6e5.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _6ef="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_6ef+="&labels="+escape(this._photoData.quantcastLabel);
}
var _6f0=new Image();
_6f0.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_6ef;
}
if(this._photoData.ctracking){
var _6f1=new Image();
_6f1.src=this._photoData.ctracking+"&"+(new Date()).getTime();
}
this._counter++;
}
var _6f2=HubPages.Lightbox.f$("#fancybox-title");
if(_6e5.sourceUrl||_6e5.sourceName){
if(_6e5.sourceUrl){
var _6f3="<a href=\""+_6e5.sourceUrl+"\" target=\"_blank\">"+(_6e5.sourceName?_6e5.sourceName:_6e5.sourceUrl)+"</a>";
}else{
var _6f3="<b>"+_6e5.sourceName+"</b>";
}
_6f2.html(_6f2.text()+"<br />Source: "+_6f3);
}
_6f2.find("div.slideshow-counter").remove();
_6f2.append(jQuery("<div />").html("Photo "+_6e2+" of "+this._photoData.total_images).addClass("slideshow-counter"));
if(this._lastIndex!=_6e1&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_6e5.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_6e5.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_6e5.social.pinit){
this._socialBar.find(".pinit_wrap").html(_6e5.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_6e1;
_6e4.parent("div").after(this._socialBar.show());
};
HubPages.Lightbox.Slideshow.prototype.loadGoogleAds=function(){
};
(function(_6f4,_6f5){
var _6f6=_6f4.document;
(function(){
var _6f7=false,_6f8=/xyz/.test(function(){
xyz;
})?/\b_super\b/:/.*/;
this.JRClass=function(){
};
JRClass.extend=function(prop){
var _6f9=this.prototype;
_6f7=true;
var _6fa=new this();
_6f7=false;
for(var name in prop){
_6fa[name]=typeof prop[name]=="function"&&typeof _6f9[name]=="function"&&_6f8.test(prop[name])?(function(name,fn){
return function(){
var tmp=this._super;
this._super=_6f9[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret;
};
})(name,prop[name]):prop[name];
}
function _6fb(){
if(!_6f7&&this.init){
this.init.apply(this,arguments);
}
};
_6fb.prototype=_6fa;
_6fb.constructor=_6fb;
_6fb.extend=arguments.callee;
return _6fb;
};
})();
var _6fc=JRClass.extend({init:function(_6fd,_6fe){
if(typeof _6fd=="string"){
this.video=_6f6.getElementById(_6fd);
}else{
this.video=_6fd;
}
this.video.player=this;
this.values={};
this.elements={};
this.options={autoplay:false,preload:true,useBuiltInControls:false,controlsBelow:false,controlsAtStart:false,controlsHiding:true,defaultVolume:0.85,playerFallbackOrder:["html5","flash","links"],flashPlayer:"htmlObject",flashPlayerVersion:false};
if(typeof _6fc.options=="object"){
_V_.merge(this.options,_6fc.options);
}
if(typeof _6fe=="object"){
_V_.merge(this.options,_6fe);
}
if(this.getPreloadAttribute()!==_6f5){
this.options.preload=this.getPreloadAttribute();
}
if(this.getAutoplayAttribute()!==_6f5){
this.options.autoplay=this.getAutoplayAttribute();
}
if(this.getAutostartAttribute()!==_6f5){
this.options.autoplay=this.options.autoplay||this.getAutostartAttribute();
}
this.box=this.video.parentNode;
this.linksFallback=this.getLinksFallback();
this.hideLinksFallback();
this.each(this.options.playerFallbackOrder,function(_6ff){
if(this[_6ff+"Supported"]()){
this[_6ff+"Init"]();
return true;
}
});
this.activateElement(this,"player");
this.activateElement(this.box,"box");
},behaviors:{},newBehavior:function(name,_700,_701){
this.behaviors[name]=_700;
this.extend(_701);
},activateElement:function(_702,_703){
if(typeof _702=="string"){
_702=_6f6.getElementById(_702);
}
this.behaviors[_703].call(this,_702);
},errors:[],warnings:[],warning:function(_704){
this.warnings.push(_704);
this.log(_704);
},history:[],log:function(_705){
if(!_705){
return;
}
if(typeof _705=="string"){
_705={type:_705};
}
if(_705.type){
this.history.push(_705.type);
}
if(this.history.length>=50){
this.history.shift();
}
try{
console.log(_705.type);
}
catch(e){
try{
opera.postError(_705.type);
}
catch(e){
}
}
},setLocalStorage:function(key,_706){
if(!localStorage){
return;
}
try{
localStorage[key]=_706;
}
catch(e){
if(e.code==22||e.code==1014){
this.warning(_6fc.warnings.localStorageFull);
}
}
},getPreloadAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")){
var _707=this.video.getAttribute("preload");
if(_707===""||_707==="true"){
return "auto";
}
if(_707==="false"){
return "none";
}
return _707;
}
},getAutoplayAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autoplay")){
var _708=this.video.getAttribute("autoplay");
if(_708==="false"){
return false;
}
return true;
}
},bufferedPercent:function(){
return (this.duration())?this.buffered()[1]/this.duration():0;
},each:function(arr,fn){
if(!arr||arr.length===0){
return;
}
for(var i=0,j=arr.length;i<j;i++){
if(fn.call(this,arr[i],i)){
break;
}
}
},extend:function(obj){
for(var _709 in obj){
if(obj.hasOwnProperty(_709)){
this[_709]=obj[_709];
}
}
}});
_6fc.player=_6fc.prototype;
_6fc.player.extend({flashSupported:function(){
if(!this.flashElement){
this.flashElement=this.getFlashElement();
}
if(this.flashElement&&this.flashPlayerVersionSupported()){
return true;
}else{
return false;
}
},flashInit:function(){
this.replaceWithFlash();
this.element=this.flashElement;
this.video.src="";
var _70a=_6fc.flashPlayers[this.options.flashPlayer];
this.extend(_6fc.flashPlayers[this.options.flashPlayer].api);
(_70a.init.context(this))();
},getFlashElement:function(){
var _70b=this.video.children;
for(var i=0,j=_70b.length;i<j;i++){
if(_70b[i].className=="vjs-flash-fallback"){
return _70b[i];
}
}
},replaceWithFlash:function(){
if(this.flashElement){
this.box.insertBefore(this.flashElement,this.video);
this.video.style.display="none";
}
},flashPlayerVersionSupported:function(){
var _70c=(this.options.flashPlayerVersion)?this.options.flashPlayerVersion:_6fc.flashPlayers[this.options.flashPlayer].flashPlayerVersion;
return _6fc.getFlashVersion()>=_70c;
}});
_6fc.flashPlayers={};
_6fc.flashPlayers.htmlObject={flashPlayerVersion:9,init:function(){
return true;
},api:{width:function(_70d){
if(_70d!==_6f5){
this.element.width=_70d;
this.box.style.width=_70d+"px";
this.triggerResizeListeners();
return this;
}
return this.element.width;
},height:function(_70e){
if(_70e!==_6f5){
this.element.height=_70e;
this.box.style.height=_70e+"px";
this.triggerResizeListeners();
return this;
}
return this.element.height;
}}};
_6fc.player.extend({linksSupported:function(){
return true;
},linksInit:function(){
this.showLinksFallback();
this.element=this.video;
},getLinksFallback:function(){
return this.box.getElementsByTagName("P")[0];
},hideLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="none";
}
},showLinksFallback:function(){
if(this.linksFallback){
this.linksFallback.style.display="block";
}
}});
_6fc.merge=function(obj1,obj2,safe){
for(var _70f in obj2){
if(obj2.hasOwnProperty(_70f)&&(!safe||!obj1.hasOwnProperty(_70f))){
obj1[_70f]=obj2[_70f];
}
}
return obj1;
};
_6fc.extend=function(obj){
this.merge(this,obj,true);
};
_6fc.extend({setupAllWhenReady:function(_710){
_6fc.options=_710;
_6fc.DOMReady(_6fc.setup);
},DOMReady:function(fn){
_6fc.addToDOMReady(fn);
},setup:function(_711,_712){
var _713=false,_714=[],_715;
if(!_711||_711=="All"){
_711=_6fc.getVideoJSTags();
}else{
if(typeof _711!="object"||_711.nodeType==1){
_711=[_711];
_713=true;
}
}
for(var i=0;i<_711.length;i++){
if(typeof _711[i]=="string"){
_715=_6f6.getElementById(_711[i]);
}else{
_715=_711[i];
}
_714.push(new _6fc(_715,_712));
}
return (_713)?_714[0]:_714;
},getVideoJSTags:function(){
var _716=_6f6.getElementsByTagName("video"),_717=[],_718;
for(var i=0,j=_716.length;i<j;i++){
_718=_716[i];
if(_718.className.indexOf("video-js")!=-1){
_717.push(_718);
}
}
return _717;
},browserSupportsVideo:function(){
if(typeof _6fc.videoSupport!="undefined"){
return _6fc.videoSupport;
}
_6fc.videoSupport=!!_6f6.createElement("video").canPlayType;
return _6fc.videoSupport;
},getFlashVersion:function(){
if(typeof _6fc.flashVersion!="undefined"){
return _6fc.flashVersion;
}
var _719=0,desc;
if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]=="object"){
desc=navigator.plugins["Shockwave Flash"].description;
if(desc&&!(typeof navigator.mimeTypes!="undefined"&&navigator.mimeTypes["application/x-shockwave-flash"]&&!navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)){
_719=parseInt(desc.match(/^.*\s+([^\s]+)\.[^\s]+\s+[^\s]+$/)[1],10);
}
}else{
if(typeof _6f4.ActiveXObject!="undefined"){
try{
var _71a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(_71a){
_719=parseInt(_71a.GetVariable("$version").match(/^[^\s]+\s(\d+)/)[1],10);
}
}
catch(e){
}
}
}
_6fc.flashVersion=_719;
return _6fc.flashVersion;
},isIE:function(){
return !+"\v1";
},isIPad:function(){
return navigator.userAgent.match(/iPad/i)!==null;
},isIPhone:function(){
return navigator.userAgent.match(/iPhone/i)!==null;
},isIOS:function(){
return _6fc.isIPhone()||_6fc.isIPad();
},iOSVersion:function(){
var _71b=navigator.userAgent.match(/OS (\d+)_/i);
if(_71b&&_71b[1]){
return _71b[1];
}
},isAndroid:function(){
return navigator.userAgent.match(/Android/i)!==null;
},androidVersion:function(){
var _71c=navigator.userAgent.match(/Android (\d+)\./i);
if(_71c&&_71c[1]){
return _71c[1];
}
},warnings:{videoNotReady:"Video is not ready yet (try playing the video first).",localStorageFull:"Local Storage is Full"}});
if(_6fc.isIE()){
_6f6.createElement("video");
}
_6f4.VideoJS=_6f4._V_=_6fc;
_6fc.player.extend({html5Supported:function(){
if(_6fc.browserSupportsVideo()&&this.canPlaySource()){
return true;
}else{
return false;
}
},html5Init:function(){
this.element=this.video;
this.fixPreloading();
this.supportProgressEvents();
this.volume((localStorage&&localStorage.volume)||this.options.defaultVolume);
if(_6fc.isIOS()){
this.options.useBuiltInControls=true;
this.iOSInterface();
}else{
if(_6fc.isAndroid()){
this.options.useBuiltInControls=true;
this.androidInterface();
}
}
if(!this.options.useBuiltInControls){
this.video.controls=false;
if(this.options.controlsBelow){
_V_.addClass(this.box,"vjs-controls-below");
}
this.activateElement(this.video,"playToggle");
this.buildStylesCheckDiv();
this.buildAndActivatePoster();
this.buildBigPlayButton();
this.buildAndActivateSpinner();
this.buildAndActivateControlBar();
this.loadInterface();
this.getSubtitles();
this.fixAutoplay();
}
},canPlaySource:function(){
if(this.canPlaySourceResult){
return this.canPlaySourceResult;
}
var _71d=this.video.children;
for(var i=0,j=_71d.length;i<j;i++){
if(_71d[i].tagName.toUpperCase()=="SOURCE"){
var _71e=this.video.canPlayType(_71d[i].type)||this.canPlayExt(_71d[i].src);
if(_71e=="probably"||_71e=="maybe"){
this.firstPlayableSource=_71d[i];
this.canPlaySourceResult=true;
return true;
}
}
}
this.canPlaySourceResult=false;
return false;
},canPlayExt:function(src){
if(!src){
return "";
}
var _71f=src.match(/\.([^\.]+)$/);
if(_71f&&_71f[1]){
var ext=_71f[1].toLowerCase();
if(_6fc.isAndroid()){
if(ext=="mp4"||ext=="m4v"){
return "maybe";
}
}else{
if(_6fc.isIOS()){
if(ext=="m3u8"){
return "maybe";
}
}
}
}
return "";
},forceTheSource:function(){
this.video.src=this.firstPlayableSource.src;
this.video.load();
},fixPreloading:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("preload")&&this.video.preload!="none"){
this.video.autobuffer=true;
}else{
this.video.autobuffer=false;
this.video.preload="none";
}
},supportProgressEvents:function(e){
_V_.addListener(this.video,"progress",this.playerOnVideoProgress.context(this));
},playerOnVideoProgress:function(_720){
this.setBufferedFromProgress(_720);
},setBufferedFromProgress:function(_721){
if(_721.total>0){
var _722=(_721.loaded/_721.total)*this.duration();
if(_722>this.values.bufferEnd){
this.values.bufferEnd=_722;
}
}
},iOSInterface:function(){
if(_6fc.iOSVersion()<4){
this.forceTheSource();
}
if(_6fc.isIPad()){
this.buildAndActivateSpinner();
}
},androidInterface:function(){
this.forceTheSource();
_V_.addListener(this.video,"click",function(){
this.play();
});
this.buildBigPlayButton();
_V_.addListener(this.bigPlayButton,"click",function(){
this.play();
}.context(this));
this.positionBox();
this.showBigPlayButtons();
},loadInterface:function(){
if(!this.stylesHaveLoaded()){
if(!this.positionRetries){
this.positionRetries=1;
}
if(this.positionRetries++<100){
setTimeout(this.loadInterface.context(this),10);
return;
}
}
this.hideStylesCheckDiv();
if(this.video.paused){
this.showPoster();
}else{
this.hidePoster();
}
if(this.video.paused!==false){
this.showBigPlayButtons();
}
if(this.options.controlsAtStart){
this.showControlBars();
}
this.positionAll();
},buildAndActivateControlBar:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildAndActivatePoster:function(){
this.updatePosterSource();
if(this.video.poster){
this.poster=_6f6.createElement("img");
this.box.appendChild(this.poster);
this.poster.src=this.video.poster;
this.poster.className="vjs-poster";
this.activateElement(this.poster,"poster");
}else{
this.poster=false;
}
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-big-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},buildAndActivateSpinner:function(){
this.spinner=_V_.createElement("div",{className:"vjs-spinner",innerHTML:"<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>"});
this.box.appendChild(this.spinner);
this.activateElement(this.spinner,"spinner");
},buildStylesCheckDiv:function(){
this.stylesCheckDiv=_V_.createElement("div",{className:"vjs-styles-check"});
this.stylesCheckDiv.style.position="absolute";
this.box.appendChild(this.stylesCheckDiv);
},hideStylesCheckDiv:function(){
this.stylesCheckDiv.style.display="none";
},stylesHaveLoaded:function(){
if(this.stylesCheckDiv.offsetHeight!=5){
return false;
}else{
return true;
}
},positionAll:function(){
this.positionBox();
this.positionControlBars();
this.positionPoster();
},positionBox:function(){
if(this.videoIsFullScreen){
this.box.style.width="";
this.element.style.height="";
if(this.options.controlsBelow){
this.box.style.height="";
this.element.style.height=(this.box.offsetHeight-this.controls.offsetHeight)+"px";
}
}else{
this.box.style.width=this.width()+"px";
this.element.style.height=this.height()+"px";
if(this.options.controlsBelow){
this.element.style.height="";
}
}
},getSubtitles:function(){
var _723=this.video.getElementsByTagName("TRACK");
for(var i=0,j=_723.length;i<j;i++){
if(_723[i].getAttribute("kind")=="subtitles"&&_723[i].getAttribute("src")){
this.subtitlesSource=_723[i].getAttribute("src");
this.loadSubtitles();
this.buildSubtitles();
}
}
},loadSubtitles:function(){
_V_.get(this.subtitlesSource,this.parseSubtitles.context(this));
},parseSubtitles:function(_724){
var _725=_724.split("\n"),line="",_726,time,text;
this.subtitles=[];
this.currentSubtitle=false;
this.lastSubtitleIndex=0;
for(var i=0;i<_725.length;i++){
line=_V_.trim(_725[i]);
if(line){
_726={id:line,index:this.subtitles.length};
line=_V_.trim(_725[++i]);
time=line.split(" --> ");
_726.start=this.parseSubtitleTime(time[0]);
_726.end=this.parseSubtitleTime(time[1]);
text=[];
for(var j=i;j<_725.length;j++){
line=_V_.trim(_725[++i]);
if(!line){
break;
}
text.push(line);
}
_726.text=text.join("<br/>");
this.subtitles.push(_726);
}
}
},parseSubtitleTime:function(_727){
var _728=_727.split(":"),time=0;
time+=parseFloat(_728[0])*60*60;
time+=parseFloat(_728[1])*60;
var _729=_728[2].split(/\.|,/);
time+=parseFloat(_729[0]);
ms=parseFloat(_729[1]);
if(ms){
time+=ms/1000;
}
return time;
},buildSubtitles:function(){
this.subtitlesDisplay=_V_.createElement("div",{className:"vjs-subtitles"});
this.box.appendChild(this.subtitlesDisplay);
this.activateElement(this.subtitlesDisplay,"subtitlesDisplay");
},addVideoListener:function(type,fn){
_V_.addListener(this.video,type,fn.rEvtContext(this));
},play:function(){
this.video.play();
return this;
},onPlay:function(fn){
this.addVideoListener("play",fn);
return this;
},pause:function(){
this.video.pause();
return this;
},onPause:function(fn){
this.addVideoListener("pause",fn);
return this;
},paused:function(){
return this.video.paused;
},currentTime:function(_72a){
if(_72a!==_6f5){
try{
this.video.currentTime=_72a;
}
catch(e){
this.warning(_6fc.warnings.videoNotReady);
}
this.values.currentTime=_72a;
return this;
}
return this.video.currentTime;
},onCurrentTimeUpdate:function(fn){
this.currentTimeListeners.push(fn);
},duration:function(){
return this.video.duration;
},buffered:function(){
if(this.values.bufferStart===_6f5){
this.values.bufferStart=0;
this.values.bufferEnd=0;
}
if(this.video.buffered&&this.video.buffered.length>0){
var _72b=this.video.buffered.end(0);
if(_72b>this.values.bufferEnd){
this.values.bufferEnd=_72b;
}
}
return [this.values.bufferStart,this.values.bufferEnd];
},volume:function(_72c){
if(_72c!==_6f5){
this.values.volume=Math.max(0,Math.min(1,parseFloat(_72c)));
this.video.volume=this.values.volume;
this.setLocalStorage("volume",this.values.volume);
return this;
}
if(this.values.volume){
return this.values.volume;
}
return this.video.volume;
},onVolumeChange:function(fn){
_V_.addListener(this.video,"volumechange",fn.rEvtContext(this));
},width:function(_72d){
if(_72d!==_6f5){
this.video.width=_72d;
this.box.style.width=_72d+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetWidth;
},height:function(_72e){
if(_72e!==_6f5){
this.video.height=_72e;
this.box.style.height=_72e+"px";
this.triggerResizeListeners();
return this;
}
return this.video.offsetHeight;
},supportsFullScreen:function(){
if(typeof this.video.webkitEnterFullScreen=="function"){
if(!navigator.userAgent.match("Chrome")&&!navigator.userAgent.match("Mac OS X 10.5")){
return true;
}
}
return false;
},html5EnterNativeFullScreen:function(){
try{
this.video.webkitEnterFullScreen();
}
catch(e){
if(e.code==11){
this.warning(_6fc.warnings.videoNotReady);
}
}
return this;
},enterFullScreen:function(){
if(this.supportsFullScreen()){
this.html5EnterNativeFullScreen();
}else{
this.enterFullWindow();
}
},exitFullScreen:function(){
if(this.supportsFullScreen()){
}else{
this.exitFullWindow();
}
},enterFullWindow:function(){
this.videoIsFullScreen=true;
this.docOrigOverflow=_6f6.documentElement.style.overflow;
_V_.addListener(_6f6,"keydown",this.fullscreenOnEscKey.rEvtContext(this));
_V_.addListener(_6f4,"resize",this.fullscreenOnWindowResize.rEvtContext(this));
_6f6.documentElement.style.overflow="hidden";
_V_.addClass(this.box,"vjs-fullscreen");
this.positionAll();
},exitFullWindow:function(){
this.videoIsFullScreen=false;
_6f6.removeEventListener("keydown",this.fullscreenOnEscKey,false);
_6f4.removeEventListener("resize",this.fullscreenOnWindowResize,false);
_6f6.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(this.box,"vjs-fullscreen");
this.positionAll();
},onError:function(fn){
this.addVideoListener("error",fn);
return this;
},onEnded:function(fn){
this.addVideoListener("ended",fn);
return this;
}});
_6fc.player.newBehavior("player",function(_72f){
this.onError(this.playerOnVideoError);
this.onPlay(this.playerOnVideoPlay);
this.onPlay(this.trackCurrentTime);
this.onPause(this.playerOnVideoPause);
this.onPause(this.stopTrackingCurrentTime);
this.onEnded(this.playerOnVideoEnded);
this.trackBuffered();
this.onBufferedUpdate(this.isBufferFull);
},{playerOnVideoError:function(_730){
this.log(_730);
this.log(this.video.error);
},playerOnVideoPlay:function(_731){
this.hasPlayed=true;
},playerOnVideoPause:function(_732){
},playerOnVideoEnded:function(_733){
this.currentTime(0);
this.pause();
},trackBuffered:function(){
this.bufferedInterval=setInterval(this.triggerBufferedListeners.context(this),500);
},stopTrackingBuffered:function(){
clearInterval(this.bufferedInterval);
},bufferedListeners:[],onBufferedUpdate:function(fn){
this.bufferedListeners.push(fn);
},triggerBufferedListeners:function(){
this.isBufferFull();
this.each(this.bufferedListeners,function(_734){
(_734.context(this))();
});
},isBufferFull:function(){
if(this.bufferedPercent()==1){
this.stopTrackingBuffered();
}
},trackCurrentTime:function(){
if(this.currentTimeInterval){
clearInterval(this.currentTimeInterval);
}
this.currentTimeInterval=setInterval(this.triggerCurrentTimeListeners.context(this),100);
this.trackingCurrentTime=true;
},stopTrackingCurrentTime:function(){
clearInterval(this.currentTimeInterval);
this.trackingCurrentTime=false;
},currentTimeListeners:[],triggerCurrentTimeListeners:function(late,_735){
this.each(this.currentTimeListeners,function(_736){
(_736.context(this))(_735||this.currentTime());
});
},resizeListeners:[],onResize:function(fn){
this.resizeListeners.push(fn);
},triggerResizeListeners:function(){
this.each(this.resizeListeners,function(_737){
(_737.context(this))();
});
}});
_6fc.player.newBehavior("mouseOverVideoReporter",function(_738){
_V_.addListener(_738,"mousemove",this.mouseOverVideoReporterOnMouseMove.context(this));
_V_.addListener(_738,"mouseout",this.mouseOverVideoReporterOnMouseOut.context(this));
},{mouseOverVideoReporterOnMouseMove:function(){
this.showControlBars();
clearInterval(this.mouseMoveTimeout);
this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4000);
},mouseOverVideoReporterOnMouseOut:function(_739){
var _73a=_739.relatedTarget;
while(_73a&&_73a!==this.box){
_73a=_73a.parentNode;
}
if(_73a!==this.box){
this.hideControlBars();
}
}});
_6fc.player.newBehavior("box",function(_73b){
this.positionBox();
_V_.addClass(_73b,"vjs-paused");
this.activateElement(_73b,"mouseOverVideoReporter");
this.onPlay(this.boxOnVideoPlay);
this.onPause(this.boxOnVideoPause);
},{boxOnVideoPlay:function(){
_V_.removeClass(this.box,"vjs-paused");
_V_.addClass(this.box,"vjs-playing");
},boxOnVideoPause:function(){
_V_.removeClass(this.box,"vjs-playing");
_V_.addClass(this.box,"vjs-paused");
}});
_6fc.player.newBehavior("poster",function(_73c){
this.activateElement(_73c,"mouseOverVideoReporter");
this.activateElement(_73c,"playButton");
this.onPlay(this.hidePoster);
this.onEnded(this.showPoster);
this.onResize(this.positionPoster);
},{showPoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="block";
this.positionPoster();
},positionPoster:function(){
if(!this.poster||this.poster.style.display=="none"){
return;
}
this.poster.style.height=this.height()+"px";
this.poster.style.width=this.width()+"px";
},hidePoster:function(){
if(!this.poster){
return;
}
this.poster.style.display="none";
},updatePosterSource:function(){
if(!this.video.poster){
var _73d=this.video.getElementsByTagName("img");
if(_73d.length>0){
this.video.poster=_73d[0].src;
}
}
}});
_6fc.player.newBehavior("controlBar",function(_73e){
if(!this.controlBars){
this.controlBars=[];
this.onResize(this.positionControlBars);
}
this.controlBars.push(_73e);
_V_.addListener(_73e,"mousemove",this.onControlBarsMouseMove.context(this));
_V_.addListener(_73e,"mouseout",this.onControlBarsMouseOut.context(this));
},{showControlBars:function(){
if(!this.options.controlsAtStart&&!this.hasPlayed){
return;
}
this.each(this.controlBars,function(bar){
bar.style.display="block";
});
},positionControlBars:function(){
this.updatePlayProgressBars();
this.updateLoadProgressBars();
},hideControlBars:function(){
if(this.options.controlsHiding&&!this.mouseIsOverControls){
this.each(this.controlBars,function(bar){
bar.style.display="none";
});
}
},onControlBarsMouseMove:function(){
this.mouseIsOverControls=true;
},onControlBarsMouseOut:function(_73f){
this.mouseIsOverControls=false;
}});
_6fc.player.newBehavior("playToggle",function(_740){
if(!this.elements.playToggles){
this.elements.playToggles=[];
this.onPlay(this.playTogglesOnPlay);
this.onPause(this.playTogglesOnPause);
}
this.elements.playToggles.push(_740);
_V_.addListener(_740,"click",this.onPlayToggleClick.context(this));
},{onPlayToggleClick:function(_741){
if(this.paused()){
this.play();
}else{
this.pause();
}
},playTogglesOnPlay:function(_742){
this.each(this.elements.playToggles,function(_743){
_V_.removeClass(_743,"vjs-paused");
_V_.addClass(_743,"vjs-playing");
});
},playTogglesOnPause:function(_744){
this.each(this.elements.playToggles,function(_745){
_V_.removeClass(_745,"vjs-playing");
_V_.addClass(_745,"vjs-paused");
});
}});
_6fc.player.newBehavior("playButton",function(_746){
_V_.addListener(_746,"click",this.onPlayButtonClick.context(this));
},{onPlayButtonClick:function(_747){
this.play();
}});
_6fc.player.newBehavior("pauseButton",function(_748){
_V_.addListener(_748,"click",this.onPauseButtonClick.context(this));
},{onPauseButtonClick:function(_749){
this.pause();
}});
_6fc.player.newBehavior("playProgressBar",function(_74a){
if(!this.playProgressBars){
this.playProgressBars=[];
this.onCurrentTimeUpdate(this.updatePlayProgressBars);
}
this.playProgressBars.push(_74a);
},{updatePlayProgressBars:function(_74b){
var _74c=(_74b!==_6f5)?_74b/this.duration():this.currentTime()/this.duration();
if(isNaN(_74c)){
_74c=0;
}
this.each(this.playProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(_74c*100,2)+"%";
}
});
}});
_6fc.player.newBehavior("loadProgressBar",function(_74d){
if(!this.loadProgressBars){
this.loadProgressBars=[];
}
this.loadProgressBars.push(_74d);
this.onBufferedUpdate(this.updateLoadProgressBars);
},{updateLoadProgressBars:function(){
this.each(this.loadProgressBars,function(bar){
if(bar.style){
bar.style.width=_V_.round(this.bufferedPercent()*100,2)+"%";
}
});
}});
_6fc.player.newBehavior("currentTimeDisplay",function(_74e){
if(!this.currentTimeDisplays){
this.currentTimeDisplays=[];
this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays);
}
this.currentTimeDisplays.push(_74e);
},{updateCurrentTimeDisplays:function(_74f){
if(!this.currentTimeDisplays){
return;
}
var time=(_74f)?_74f:this.currentTime();
this.each(this.currentTimeDisplays,function(dis){
dis.innerHTML=_V_.formatTime(time);
});
}});
_6fc.player.newBehavior("durationDisplay",function(_750){
if(!this.durationDisplays){
this.durationDisplays=[];
this.onCurrentTimeUpdate(this.updateDurationDisplays);
}
this.durationDisplays.push(_750);
},{updateDurationDisplays:function(){
if(!this.durationDisplays){
return;
}
this.each(this.durationDisplays,function(dis){
if(this.duration()){
dis.innerHTML=_V_.formatTime(this.duration());
}
});
}});
_6fc.player.newBehavior("currentTimeScrubber",function(_751){
_V_.addListener(_751,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this));
},{onCurrentTimeScrubberMouseDown:function(_752,_753){
_752.preventDefault();
this.currentScrubber=_753;
this.stopTrackingCurrentTime();
this.videoWasPlaying=!this.paused();
this.pause();
_V_.blockTextSelection();
this.setCurrentTimeWithScrubber(_752);
_V_.addListener(_6f6,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6f6,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this));
},onCurrentTimeScrubberMouseMove:function(_754){
this.setCurrentTimeWithScrubber(_754);
},onCurrentTimeScrubberMouseUp:function(_755){
_V_.unblockTextSelection();
_6f6.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,false);
_6f6.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,false);
if(this.videoWasPlaying){
this.play();
this.trackCurrentTime();
}
},setCurrentTimeWithScrubber:function(_756){
var _757=_V_.getRelativePosition(_756.pageX,this.currentScrubber);
var _758=_757*this.duration();
this.triggerCurrentTimeListeners(0,_758);
if(_758==this.duration()){
_758=_758-0.1;
}
this.currentTime(_758);
}});
_6fc.player.newBehavior("volumeDisplay",function(_759){
if(!this.volumeDisplays){
this.volumeDisplays=[];
this.onVolumeChange(this.updateVolumeDisplays);
}
this.volumeDisplays.push(_759);
this.updateVolumeDisplay(_759);
},{updateVolumeDisplays:function(){
if(!this.volumeDisplays){
return;
}
this.each(this.volumeDisplays,function(dis){
this.updateVolumeDisplay(dis);
});
},updateVolumeDisplay:function(_75a){
var _75b=Math.ceil(this.volume()*6);
this.each(_75a.children,function(_75c,num){
if(num<_75b){
_V_.addClass(_75c,"vjs-volume-level-on");
}else{
_V_.removeClass(_75c,"vjs-volume-level-on");
}
});
}});
_6fc.player.newBehavior("volumeScrubber",function(_75d){
_V_.addListener(_75d,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this));
},{onVolumeScrubberMouseDown:function(_75e,_75f){
_V_.blockTextSelection();
this.currentScrubber=_75f;
this.setVolumeWithScrubber(_75e);
_V_.addListener(_6f6,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this));
_V_.addListener(_6f6,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this));
},onVolumeScrubberMouseMove:function(_760){
this.setVolumeWithScrubber(_760);
},onVolumeScrubberMouseUp:function(_761){
this.setVolumeWithScrubber(_761);
_V_.unblockTextSelection();
_6f6.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,false);
_6f6.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,false);
},setVolumeWithScrubber:function(_762){
var _763=_V_.getRelativePosition(_762.pageX,this.currentScrubber);
this.volume(_763);
}});
_6fc.player.newBehavior("fullscreenToggle",function(_764){
_V_.addListener(_764,"click",this.onFullscreenToggleClick.context(this));
},{onFullscreenToggleClick:function(_765){
if(!this.videoIsFullScreen){
this.enterFullScreen();
}else{
this.exitFullScreen();
}
},fullscreenOnWindowResize:function(_766){
this.positionControlBars();
},fullscreenOnEscKey:function(_767){
if(_767.keyCode==27){
this.exitFullScreen();
}
}});
_6fc.player.newBehavior("bigPlayButton",function(_768){
if(!this.elements.bigPlayButtons){
this.elements.bigPlayButtons=[];
this.onPlay(this.bigPlayButtonsOnPlay);
this.onEnded(this.bigPlayButtonsOnEnded);
}
this.elements.bigPlayButtons.push(_768);
this.activateElement(_768,"playButton");
},{bigPlayButtonsOnPlay:function(_769){
this.hideBigPlayButtons();
},bigPlayButtonsOnEnded:function(_76a){
this.showBigPlayButtons();
},showBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_76b){
_76b.style.display="block";
});
},hideBigPlayButtons:function(){
this.each(this.elements.bigPlayButtons,function(_76c){
_76c.style.display="none";
});
}});
_6fc.player.newBehavior("spinner",function(_76d){
if(!this.spinners){
this.spinners=[];
_V_.addListener(this.video,"loadeddata",this.spinnersOnVideoLoadedData.context(this));
_V_.addListener(this.video,"seeking",this.spinnersOnVideoSeeking.context(this));
_V_.addListener(this.video,"seeked",this.spinnersOnVideoSeeked.context(this));
_V_.addListener(this.video,"canplay",this.spinnersOnVideoCanPlay.context(this));
_V_.addListener(this.video,"canplaythrough",this.spinnersOnVideoCanPlayThrough.context(this));
_V_.addListener(this.video,"waiting",this.spinnersOnVideoWaiting.context(this));
_V_.addListener(this.video,"stalled",this.spinnersOnVideoStalled.context(this));
_V_.addListener(this.video,"suspend",this.spinnersOnVideoSuspend.context(this));
_V_.addListener(this.video,"playing",this.spinnersOnVideoPlaying.context(this));
_V_.addListener(this.video,"timeupdate",this.spinnersOnVideoTimeUpdate.context(this));
}
this.spinners.push(_76d);
},{showSpinners:function(){
this.each(this.spinners,function(_76e){
_76e.style.display="block";
});
clearInterval(this.spinnerInterval);
this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100);
},hideSpinners:function(){
this.each(this.spinners,function(_76f){
_76f.style.display="none";
});
clearInterval(this.spinnerInterval);
},spinnersRotated:0,rotateSpinners:function(){
this.each(this.spinners,function(_770){
_770.style.WebkitTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
_770.style.MozTransform="scale(0.5) rotate("+this.spinnersRotated+"deg)";
});
if(this.spinnersRotated==360){
this.spinnersRotated=0;
}
this.spinnersRotated+=45;
},spinnersOnVideoLoadedData:function(_771){
this.hideSpinners();
},spinnersOnVideoLoadStart:function(_772){
this.showSpinners();
},spinnersOnVideoSeeking:function(_773){
},spinnersOnVideoSeeked:function(_774){
},spinnersOnVideoCanPlay:function(_775){
},spinnersOnVideoCanPlayThrough:function(_776){
this.hideSpinners();
},spinnersOnVideoWaiting:function(_777){
this.showSpinners();
},spinnersOnVideoStalled:function(_778){
},spinnersOnVideoSuspend:function(_779){
},spinnersOnVideoPlaying:function(_77a){
this.hideSpinners();
},spinnersOnVideoTimeUpdate:function(_77b){
if(this.spinner.style.display=="block"){
this.hideSpinners();
}
}});
_6fc.player.newBehavior("subtitlesDisplay",function(_77c){
if(!this.subtitleDisplays){
this.subtitleDisplays=[];
this.onCurrentTimeUpdate(this.subtitleDisplaysOnVideoTimeUpdate);
this.onEnded(function(){
this.lastSubtitleIndex=0;
}.context(this));
}
this.subtitleDisplays.push(_77c);
},{subtitleDisplaysOnVideoTimeUpdate:function(time){
if(this.subtitles){
if(!this.currentSubtitle||this.currentSubtitle.start>=time||this.currentSubtitle.end<time){
var _77d=false,_77e=(this.subtitles[this.lastSubtitleIndex].start>time),i=this.lastSubtitleIndex-(_77e)?1:0;
while(true){
if(_77e){
if(i<0||this.subtitles[i].end<time){
break;
}
if(this.subtitles[i].start<time){
_77d=i;
break;
}
i--;
}else{
if(i>=this.subtitles.length||this.subtitles[i].start>time){
break;
}
if(this.subtitles[i].end>time){
_77d=i;
break;
}
i++;
}
}
if(_77d!==false){
this.currentSubtitle=this.subtitles[_77d];
this.lastSubtitleIndex=_77d;
this.updateSubtitleDisplays(this.currentSubtitle.text);
}else{
if(this.currentSubtitle){
this.currentSubtitle=false;
this.updateSubtitleDisplays("");
}
}
}
}
},updateSubtitleDisplays:function(val){
this.each(this.subtitleDisplays,function(disp){
disp.innerHTML=val;
});
}});
_6fc.extend({addClass:function(_77f,_780){
if((" "+_77f.className+" ").indexOf(" "+_780+" ")==-1){
_77f.className=_77f.className===""?_780:_77f.className+" "+_780;
}
},removeClass:function(_781,_782){
if(_781.className.indexOf(_782)==-1){
return;
}
var _783=_781.className.split(/\s+/);
_783.splice(_783.lastIndexOf(_782),1);
_781.className=_783.join(" ");
},createElement:function(_784,_785){
return this.merge(_6f6.createElement(_784),_785);
},blockTextSelection:function(){
_6f6.body.focus();
_6f6.onselectstart=function(){
return false;
};
},unblockTextSelection:function(){
_6f6.onselectstart=function(){
return true;
};
},formatTime:function(secs){
var _786=Math.round(secs);
var _787=Math.floor(_786/60);
_787=(_787>=10)?_787:"0"+_787;
_786=Math.floor(_786%60);
_786=(_786>=10)?_786:"0"+_786;
return _787+":"+_786;
},getRelativePosition:function(x,_788){
return Math.max(0,Math.min(1,(x-this.findPosX(_788))/_788.offsetWidth));
},findPosX:function(obj){
var _789=obj.offsetLeft;
while(obj=obj.offsetParent){
_789+=obj.offsetLeft;
}
return _789;
},getComputedStyleValue:function(_78a,_78b){
return _6f4.getComputedStyle(_78a,null).getPropertyValue(_78b);
},round:function(num,dec){
if(!dec){
dec=0;
}
return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
},addListener:function(_78c,type,_78d){
if(_78c.addEventListener){
_78c.addEventListener(type,_78d,false);
}else{
if(_78c.attachEvent){
_78c.attachEvent("on"+type,_78d);
}
}
},removeListener:function(_78e,type,_78f){
if(_78e.removeEventListener){
_78e.removeEventListener(type,_78f,false);
}else{
if(_78e.attachEvent){
_78e.detachEvent("on"+type,_78f);
}
}
},get:function(url,_790){
if(typeof XMLHttpRequest=="undefined"){
XMLHttpRequest=function(){
try{
return new ActiveXObject("Msxml2.XMLHTTP.6.0");
}
catch(e){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP.3.0");
}
catch(f){
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(g){
}
throw new Error("This browser does not support XMLHttpRequest.");
};
}
var _791=new XMLHttpRequest();
_791.open("GET",url);
_791.onreadystatechange=function(){
if(_791.readyState==4&&_791.status==200){
_790(_791.responseText);
}
}.context(this);
_791.send();
},trim:function(_792){
return _792.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},bindDOMReady:function(){
if(_6f6.readyState==="complete"){
return _6fc.onDOMReady();
}
if(_6f6.addEventListener){
_6f6.addEventListener("DOMContentLoaded",_6fc.DOMContentLoaded,false);
_6f4.addEventListener("load",_6fc.onDOMReady,false);
}else{
if(_6f6.attachEvent){
_6f6.attachEvent("onreadystatechange",_6fc.DOMContentLoaded);
_6f4.attachEvent("onload",_6fc.onDOMReady);
}
}
},DOMContentLoaded:function(){
if(_6f6.addEventListener){
_6f6.removeEventListener("DOMContentLoaded",_6fc.DOMContentLoaded,false);
_6fc.onDOMReady();
}else{
if(_6f6.attachEvent){
if(_6f6.readyState==="complete"){
_6f6.detachEvent("onreadystatechange",_6fc.DOMContentLoaded);
_6fc.onDOMReady();
}
}
}
},DOMReadyList:[],addToDOMReady:function(fn){
if(_6fc.DOMIsReady){
fn.call(_6f6);
}else{
_6fc.DOMReadyList.push(fn);
}
},DOMIsReady:false,onDOMReady:function(){
if(_6fc.DOMIsReady){
return;
}
if(!_6f6.body){
return setTimeout(_6fc.onDOMReady,13);
}
_6fc.DOMIsReady=true;
if(_6fc.DOMReadyList){
for(var i=0;i<_6fc.DOMReadyList.length;i++){
_6fc.DOMReadyList[i].call(_6f6);
}
_6fc.DOMReadyList=null;
}
}});
_6fc.bindDOMReady();
Function.prototype.context=function(obj){
var _793=this,temp=function(){
return _793.apply(obj,arguments);
};
return temp;
};
Function.prototype.evtContext=function(obj){
var _794=this,temp=function(){
var _795=this;
return _794.call(obj,arguments[0],_795);
};
return temp;
};
Function.prototype.rEvtContext=function(obj,_796){
if(this.hasContext===true){
return this;
}
if(!_796){
_796=obj;
}
for(var _797 in _796){
if(_796[_797]==this){
_796[_797]=this.evtContext(obj);
_796[_797].hasContext=true;
return _796[_797];
}
}
return this.evtContext(obj);
};
if(_6f4.jQuery){
(function($){
$.fn.VideoJS=function(_798){
this.each(function(){
_6fc.setup(this,_798);
});
return this;
};
$.fn.player=function(){
return this[0].player;
};
})(jQuery);
}
_6f4.VideoJS=_6f4._V_=_6fc;
})(window);
jq.extend(VideoJS.prototype,{getSize:function(){
if(jq(".video_row").size()>0||jq(this.box).parents(".insert_row").size()>0||jq("#vid_stats").size()>0||jq(".form_row").size()){
return "small";
}else{
return "big";
}
},trackUsage:function(_799){
var _79a=((_799/15)|0)*15;
if(this.lastLoggedOffset!=_79a&&!this.paused()){
var _79b=this.video.id.replace("hp_video_","");
var _79c=(typeof isEmbed!=="undefined")?1:0;
var rf=escape(document.referrer);
var ajax=new Ajax.Request("/xml/videos/watching.php",{method:"get",parameters:{offset:_79a,videoId:_79b,rf:rf,isEmbed:_79c}});
this.lastLoggedOffset=_79a;
}
},buildAndActivateControlBar:function(){
this.onCurrentTimeUpdate(this.trackUsage);
if(this.getSize()=="big"){
this.buildBigController();
}else{
if(this.getSize()=="small"){
this.buildSmallController();
}else{
alert("unknown size for video controls");
}
}
},buildSmallController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigController:function(){
this.controls=_V_.createElement("div",{className:"vjs-controls"});
this.box.appendChild(this.controls);
this.activateElement(this.controls,"controlBar");
this.activateElement(this.controls,"mouseOverVideoReporter");
this.playControl=_V_.createElement("div",{className:"vjs-play-control",innerHTML:"<span></span>"});
this.controls.appendChild(this.playControl);
this.activateElement(this.playControl,"playToggle");
this.progressControl=_V_.createElement("div",{className:"vjs-progress-control"});
this.controls.appendChild(this.progressControl);
this.progressHolder=_V_.createElement("div",{className:"vjs-progress-holder"});
this.progressControl.appendChild(this.progressHolder);
this.activateElement(this.progressHolder,"currentTimeScrubber");
this.loadProgressBar=_V_.createElement("div",{className:"vjs-load-progress"});
this.progressHolder.appendChild(this.loadProgressBar);
this.activateElement(this.loadProgressBar,"loadProgressBar");
this.playProgressBar=_V_.createElement("div",{className:"vjs-play-progress"});
this.progressHolder.appendChild(this.playProgressBar);
this.activateElement(this.playProgressBar,"playProgressBar");
this.timeControl=_V_.createElement("div",{className:"vjs-time-control"});
this.controls.appendChild(this.timeControl);
this.currentTimeDisplay=_V_.createElement("span",{className:"vjs-current-time-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.currentTimeDisplay);
this.activateElement(this.currentTimeDisplay,"currentTimeDisplay");
this.timeSeparator=_V_.createElement("span",{innerHTML:" / "});
this.timeControl.appendChild(this.timeSeparator);
this.durationDisplay=_V_.createElement("span",{className:"vjs-duration-display",innerHTML:"00:00"});
this.timeControl.appendChild(this.durationDisplay);
this.activateElement(this.durationDisplay,"durationDisplay");
this.volumeControl=_V_.createElement("div",{className:"vjs-volume-control",innerHTML:"<div><span></span><span></span><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.volumeControl);
this.activateElement(this.volumeControl,"volumeScrubber");
this.volumeDisplay=this.volumeControl.children[0];
this.activateElement(this.volumeDisplay,"volumeDisplay");
this.fullscreenControl=_V_.createElement("div",{className:"vjs-fullscreen-control",innerHTML:"<div><span></span><span></span><span></span><span></span></div>"});
this.controls.appendChild(this.fullscreenControl);
this.activateElement(this.fullscreenControl,"fullscreenToggle");
},buildBigPlayButton:function(){
this.bigPlayButton=_V_.createElement("div",{className:"vjs-"+this.getSize()+"-play-button",innerHTML:"<span></span>"});
this.box.appendChild(this.bigPlayButton);
this.activateElement(this.bigPlayButton,"bigPlayButton");
},getAutostartAttribute:function(){
if(typeof this.video.hasAttribute=="function"&&this.video.hasAttribute("autostart")){
var _79d=this.video.getAttribute("autostart");
if(_79d==="false"){
return false;
}
return true;
}
},fixAutoplay:function(){
if(this.options.autoplay&&this.paused){
this.play();
}
}});
function expandHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
var v=jq(".video-js-box");
sidebox=jq("#sidebar > :first");
sbBottom=sidebox.offset()["top"]+sidebox.outerHeight()+15;
videoTopAdjustment=sbBottom-v.offset()["top"];
if(videoTopAdjustment>0){
var _79e=document.createElement("div");
_79e.style.height=videoTopAdjustment+"px";
_79e.style.background="transparent";
_79e.id="video_spacer";
v.before(_79e);
}
var _79f=v.offset()["top"]+v.outerHeight();
var _7a0=_79f-(sidebox.offset()["top"]+sidebox.outerHeight());
if(_7a0>0){
var _7a1=document.createElement("div");
_7a1.style.height=_7a0+"px";
_7a1.style.background="transparent";
_7a1.id="sidebar_spacer";
_7a1.className="sidebar_box";
sidebox.after(_7a1);
}
};
function shrinkHostedVideo(){
jq("#video_spacer").remove();
jq("#sidebar_spacer").remove();
};
function setupHostedVidUploader(m_id,_7a2,_7a3,_7a4,exts){
jQuery(document).ready(function(){
var _7a5=0;
var _7a6={button_id:"upload_videos",iframe_id:"upload_iframe",error_id:"upload_errors",upload_url:"/imgup/uploadvideo.php",params:{md_id:_7a2},size_limit:_7a4,queue_limit:_7a3,upload_limit:0,file_types:exts,file_types_description:"Video Files",flash_disabled:false,progress_id:"upload_progress",progress_bar_id:"upload_progress_bar",upload_image:"/x/choose_a_video_small.png",upload_image_one:"/x/choose_a_video_small.png",upload_progress_callback:function(file,_7a7){
if(file.size==_7a7){
if(!this.progress_bars[file.id].children(".processing").length){
this.progress_bars[file.id].html("<div class=\"processing\"></div>");
}
}
$("editlink_"+m_id).hide();
},upload_callback:function(_7a8){
try{
var data=JSONstring.toObject(_7a8);
}
catch(ex){
alert("ERROR: The following is not valid JSON\\n"+_7a8);
}
if(data.warnings.length){
warningHTML="";
for(var i=0;i<data.warnings.length;i++){
warningHTML+="<li><span class=\"alert\">"+data.warnings[i]+"</span></li>";
}
_7a5+=data.warnings.length;
$("upload_errors").innerHTML=$("upload_errors").innerHTML+warningHTML;
}else{
if(data.videos.length){
if(data.videos[0].id){
man.getById(m_id).load();
}
}
}
},batch_callback:function(_7a9){
if(!_7a5&&_7a9){
jq("#upload_videos_wrapper").hide();
jq("form.degraded").hide();
return;
}
_7a5=0;
},loaded_callback:function(_7aa){
if(_7aa){
}else{
jq("#queue_limit").html("a video");
jq("#flash_message").show();
}
jq("#directions").css("visibility","visible");
jq("#filesize_limit").show();
}};
var _7ab=new imageUploader(_7a6);
});
};
function getHPVideoPlayer(){
var _7ac="talkiesplayer";
return $(_7ac);
};
function updateVideoProcessingBar(vId,mId){
mId=mId?mId:0;
jQuery.ajax({dataType:"JSON",url:"/xml/videos/processing.php",type:"POST",data:{id:vId,mId:mId},success:function(data){
var _7ad=true;
if(data.percent){
var _7ae=data.percent;
jq("#progress_video_"+vId).width(_7ae+"%");
if(_7ae>90){
_7ad=false;
if(jq(".hubtool").length&&data.hubtool_html){
jq(".hubtool #hubvideo_wrapper_"+mId).replaceWith(data.hubtool_html);
}else{
jq("#progress_video_"+vId).parents(".processing").children("p").html("Processing is complete. Please refresh the page.").css({fontWeight:"bold"});
}
}
}
if(_7ad){
setTimeout(function(){
updateVideoProcessingBar(vId,mId);
},5000);
}
}});
};
if(window.jQuery){
(function($){
if($.browser.msie){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
$.fn.rating=function(_7af){
if(this.length==0){
return this;
}
if(typeof arguments[0]=="string"){
if(this.length>1){
var args=arguments;
return this.each(function(){
$.fn.rating.apply($(this),args);
});
}
$.fn.rating[arguments[0]].apply(this,$.makeArray(arguments).slice(1)||[]);
return this;
}
var _7af=$.extend({},$.fn.rating.options,_7af||{});
$.fn.rating.calls++;
this.not(".star-rating-applied").addClass("star-rating-applied").each(function(){
var _7b0,_7b1=$(this);
var eid=(this.name||"unnamed-rating").replace(/\[|\]/g,"_").replace(/^\_+|\_+$/g,"");
var _7b2=$(this.form||document.body);
var _7b3=_7b2.data("rating");
if(!_7b3||_7b3.call!=$.fn.rating.calls){
_7b3={count:0,call:$.fn.rating.calls};
}
var _7b4=_7b3[eid];
if(_7b4){
_7b0=_7b4.data("rating");
}
if(_7b4&&_7b0){
_7b0.count++;
}else{
_7b0=$.extend({},_7af||{},($.metadata?_7b1.metadata():($.meta?_7b1.data():null))||{},{count:0,stars:[],inputs:[]});
_7b0.serial=_7b3.count++;
_7b4=$("<span class=\"star-rating-control\"/>");
_7b1.before(_7b4);
_7b4.addClass("rating-to-be-drawn");
if(_7b1.attr("disabled")||_7b1.hasClass("disabled")){
_7b0.readOnly=true;
}
if(_7b1.hasClass("required")){
_7b0.required=true;
}
_7b4.append(_7b0.cancel=$("<div class=\"rating-cancel\"><a title=\""+_7b0.cancel+"\">"+_7b0.cancelValue+"</a></div>").mouseover(function(){
$(this).rating("drain");
$(this).addClass("star-rating-hover");
}).mouseout(function(){
$(this).rating("draw");
$(this).removeClass("star-rating-hover");
}).click(function(){
$(this).rating("select");
}).data("rating",_7b0));
}
var star=$("<div class=\"star-rating rater-"+_7b0.serial+"\"><a title=\""+(this.title||this.value)+"\">"+this.value+"</a></div>");
_7b4.append(star);
if(this.id){
star.attr("id",this.id);
}
if(this.className){
star.addClass(this.className);
}
if(_7b0.half){
_7b0.split=2;
}
if(typeof _7b0.split=="number"&&_7b0.split>0){
var stw=($.fn.width?star.width():0)||_7b0.starWidth;
var spi=(_7b0.count%_7b0.split),spw=Math.floor(stw/_7b0.split);
star.width(spw).find("a").css({"margin-left":"-"+(spi*spw)+"px"});
}
if(_7b0.readOnly){
star.addClass("star-rating-readonly");
}else{
star.addClass("star-rating-live").mouseover(function(){
$(this).rating("fill");
$(this).rating("focus");
}).mouseout(function(){
$(this).rating("draw");
$(this).rating("blur");
}).click(function(){
$(this).rating("select");
});
}
if(this.checked){
_7b0.current=star;
}
if(this.nodeName=="A"){
if($(this).hasClass("selected")){
_7b0.current=star;
}
}
_7b1.hide();
_7b1.change(function(){
$(this).rating("select");
});
star.data("rating.input",_7b1.data("rating.star",star));
_7b0.stars[_7b0.stars.length]=star[0];
_7b0.inputs[_7b0.inputs.length]=_7b1[0];
_7b0.rater=_7b3[eid]=_7b4;
_7b0.context=_7b2;
_7b1.data("rating",_7b0);
_7b4.data("rating",_7b0);
star.data("rating",_7b0);
_7b2.data("rating",_7b3);
});
$(".rating-to-be-drawn").rating("draw").removeClass("rating-to-be-drawn");
return this;
};
$.extend($.fn.rating,{calls:0,focus:function(){
var _7b5=this.data("rating");
if(!_7b5){
return this;
}
if(!_7b5.focus){
return this;
}
var _7b6=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7b5.focus){
_7b5.focus.apply(_7b6[0],[_7b6.val(),$("a",_7b6.data("rating.star"))[0]]);
}
},blur:function(){
var _7b7=this.data("rating");
if(!_7b7){
return this;
}
if(!_7b7.blur){
return this;
}
var _7b8=$(this).data("rating.input")||$(this.tagName=="INPUT"?this:null);
if(_7b7.blur){
_7b7.blur.apply(_7b8[0],[_7b8.val(),$("a",_7b8.data("rating.star"))[0]]);
}
},fill:function(){
var _7b9=this.data("rating");
if(!_7b9){
return this;
}
if(_7b9.readOnly){
return;
}
this.rating("drain");
this.prevAll().andSelf().filter(".rater-"+_7b9.serial).addClass("star-rating-hover");
},drain:function(){
var _7ba=this.data("rating");
if(!_7ba){
return this;
}
if(_7ba.readOnly){
return;
}
_7ba.rater.children().filter(".rater-"+_7ba.serial).removeClass("star-rating-on").removeClass("star-rating-hover");
},draw:function(){
var _7bb=this.data("rating");
if(!_7bb){
return this;
}
this.rating("drain");
if(_7bb.current){
_7bb.current.data("rating.input").attr("checked","checked");
_7bb.current.prevAll().andSelf().filter(".rater-"+_7bb.serial).addClass("star-rating-on");
}else{
$(_7bb.inputs).removeAttr("checked");
}
_7bb.cancel[_7bb.readOnly||_7bb.required?"hide":"show"]();
this.siblings()[_7bb.readOnly?"addClass":"removeClass"]("star-rating-readonly");
},select:function(_7bc,_7bd){
var _7be=this.data("rating");
if(!_7be){
return this;
}
if(_7be.readOnly){
return;
}
_7be.current=null;
if(typeof _7bc!="undefined"){
if(typeof _7bc=="number"){
return $(_7be.stars[_7bc]).rating("select",undefined,_7bd);
}
if(typeof _7bc=="string"){
$.each(_7be.stars,function(){
if($(this).data("rating.input").val()==_7bc){
$(this).rating("select",undefined,_7bd);
}
});
}
}else{
_7be.current=this[0].tagName=="INPUT"?this.data("rating.star"):(this.is(".rater-"+_7be.serial)?this:null);
}
this.data("rating",_7be);
this.rating("draw");
var _7bf=$(_7be.current?_7be.current.data("rating.input"):null);
if((_7bd||_7bd==undefined)&&_7be.callback){
_7be.callback.apply(_7bf[0],[_7bf.val(),$("a",_7be.current)[0]]);
}
},readOnly:function(_7c0,_7c1){
var _7c2=this.data("rating");
if(!_7c2){
return this;
}
_7c2.readOnly=_7c0||_7c0==undefined?true:false;
if(_7c1){
$(_7c2.inputs).attr("disabled","disabled");
}else{
$(_7c2.inputs).removeAttr("disabled");
}
this.data("rating",_7c2);
this.rating("draw");
},disable:function(){
this.rating("readOnly",true,true);
},enable:function(){
this.rating("readOnly",false,false);
}});
$.fn.rating.options={cancel:"Cancel Rating",cancelValue:"",split:0,starWidth:16};
$(function(){
$("input[type=radio].star").rating();
});
})(jQuery);
}
(function($){
var _7c3,_7c4;
function _7c5(elt,_7c6){
var _7c7=jq(elt).attr("id")+"_"+_7c6;
var _7c8=jq("#"+_7c7);
if(0==_7c8.size()){
var expl;
if(0==_7c6){
expl="Please choose a rating.";
}else{
if(_7c6%2==0){
expl="Explanation coming soon.";
}else{
if(1==_7c6){
expl="Does not even deserve a 2.";
}else{
var _7c9=_7c6-1;
var _7ca=_7c6+1;
var _7cb=_7c9==8?"an":"a";
var _7cc=_7ca==8?"an":"a";
expl="Exhibits characteristics between "+_7cb+" "+_7c9+" and "+_7cc+" "+_7ca+".";
}
}
}
var _7cd="explain_"+jq(elt).attr("id");
_7c8=jq("<div id=\""+_7c7+"\" class=\"rate_explain "+_7cd+"\"><p>"+expl+"</p></div>").insertAfter("#default_explain");
}
jq(".rate_explain").hide();
_7c8.show();
};
var _7ce={init:function(_7cf){
_7c4=this;
_7c3=$.extend({reason:false,showExplanations:true,toggleExplanations:true,detailedExplanations:true,onsubmit:false,singleSlider:false},_7cf);
if(_7c3.reason){
jq("#rating_submit").parent().before("<div id=\"rating_reason\">"+"<label for=\"reason\">Reasons for ratings:</label>"+"<textarea id=\"reason\"></textarea>"+"</div>");
}
if(_7c3.toggleExplanations){
jq("#hop_explain").after("<div id=\"hideshow\">"+"<a id=\"hide_explanation\" href=\"#\">hide explanations</a>"+"<a id=\"show_explanation\" style=\"display: none;\" href=\"#\">show explanations</a>"+"</div>");
jq("#hide_explanation").click(function(){
jq("#hop_explain").hide();
jq("#show_explanation").show();
jq("#hide_explanation").hide();
return false;
});
jq("#show_explanation").click(function(){
jq("#hop_explain").show();
jq("#show_explanation").hide();
jq("#hide_explanation").show();
return false;
});
}
jq("#creative").click(function(){
if(jq("#creative").is(":checked")){
jq(".slider_set, #rating_reason").hide();
jq(".rate_explain").hide();
jq("#creative_explain").show();
}else{
jq(".slider_set, #rating_reason").show();
jq("#default_explain").show();
jq("#creative_explain").hide();
}
});
jq("#close_hub_rating").click(function(){
jq(_7c4).slideUp(800,function(){
if(!jq(_7c4).data("rated")){
jq("#open_hub_rating").fadeIn();
}
});
return false;
});
jq("#open_hub_rating").click(function(){
jq(_7c4).find(".rate_explain").hide();
jq("#default_explain").show();
jq(this).hide();
jq(_7c4).slideDown(1000);
return false;
});
jq(".hub_rating_slider").slider({min:0,max:10,step:1,value:0,range:"min",slide:function(_7d0,ui){
var _7d1=ui.value==0?"?":ui.value;
jq(_7d0.target).prev(".head_two").children("strong").text(_7d1);
if(_7c3.showExplanations){
_7c5(_7d0.target,_7c3.detailedExplanations?ui.value:0);
}
},change:function(_7d2,ui){
var _7d3=ui.value==0?"?":ui.value;
jq(_7d2.target).prev(".head_two").children("strong").text(_7d3);
}}).mouseenter(function(_7d4){
if(_7c3.showExplanations){
_7c5(_7d4.currentTarget,_7c3.detailedExplanations?jq(_7d4.currentTarget).slider("value"):0);
}
});
if(_7c3.showExplanations&&!_7c3.detailedExplanations){
jq(".hub_rating_slider").mouseleave(function(_7d5){
jq(".rate_explain").hide();
jq("#default_explain").show();
});
}
jq("#rating_submit").click(function(){
var d=new Date();
if(!jq(this).data("lock")||jq(this).data("lock")<d.getTime()-4000){
jq(this).data("lock",d.getTime());
var _7d6={isCreative:jq("#creative").is(":checked")?1:0,substance:jq("#substance").size()?jq("#substance").slider("value"):0,organization:jq("#organization").size()?jq("#organization").slider("value"):0,mechanics:jq("#mechanics").size()?jq("#mechanics").slider("value"):0,quality:jq("#quality").size()?jq("#quality").slider("value"):0,reason:jq.trim(jq("#reason").val())};
if(!_7c3.singleSlider&&!_7d6.isCreative&&(0==_7d6.substance||0==_7d6.organization||0==_7d6.mechanics)){
alert(_7c3.ratingMissingMessage);
return false;
}else{
if(_7c3.singleSlider&&0==_7d6.quality){
alert(_7c3.ratingMissingMessage);
return false;
}else{
if(!_7d6.isCreative&&_7c3.reason&&!_7d6.reason){
alert(_7c3.reasonMissingMessage);
return false;
}
}
}
jq(_7c4).data("rated",true);
if(typeof _7c3.onsubmit=="function"){
_7c3.onsubmit.apply(_7c4,[_7d6]);
}
}else{
}
return false;
});
return this;
},clear:function(){
jq("#creative").attr("checked",false);
jq("#creative_explain").hide();
jq(".hub_rating_slider").slider("value",0);
jq(".rate_explain").hide();
jq("#default_explain").show();
jq("#reason").val("");
jq(".slider_set, #rating_reason, #rate_hub").show();
return this;
}};
$.fn.hubrating=function(_7d7){
if(_7ce[_7d7]){
return _7ce[_7d7].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(typeof _7d7==="object"||!_7d7){
return _7ce.init.apply(this,arguments);
}else{
$.error("Method "+_7d7+" does not exist on jQuery.hubrating");
}
}
};
})(jQuery);
eval(function(p,a,c,k,e,d){
e=function(c){
return (c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36));
};
if(!"".replace(/^/,String)){
while(c--){
d[e(c)]=k[c]||e(c);
}
k=[function(e){
return d[e];
}];
e=function(){
return "\\w+";
};
c=1;
}
while(c--){
if(k[c]){
p=p.replace(new RegExp("\\b"+e(c)+"\\b","g"),k[c]);
}
}
return p;
}("K M;I(M)1R 2K(\"2d't 4g M 5f 2g 3m 5e 5d\");(6(){6 r(e,f){I(!M.1S(e))1R 3n(\"3f 16 5c\");K a=e.1r;e=M(e.1n,t(e)+(f||\"\"));I(a)e.1r={1n:a.1n,1d:a.1d?a.1d.1c(0):N};H e}6 t(e){H(e.1I?\"g\":\"\")+(e.5g?\"i\":\"\")+(e.5h?\"m\":\"\")+(e.5l?\"x\":\"\")+(e.3l?\"y\":\"\")}6 B(e,f,a,b){K c=u.L,d,h,g;v=R;5k{O(;c--;){g=u[c];I(a&g.3o&&(!g.2N||g.2N.W(b))){g.2x.11=f;I((h=g.2x.X(e))&&h.P===f){d={3E:g.2f.W(b,h,a),1E:h};1P}}}}5j(i){1R i}5i{v=13}H d}6 p(e,f,a){I(3c.Y.1j)H e.1j(f,a);O(a=a||0;a<e.L;a++)I(e[a]===f)H a;H-1}M=6(e,f){K a=[],b=M.1G,c=0,d,h;I(M.1S(e)){I(f!==1b)1R 3n(\"2d't 5b 5a 53 52 51 16 4Y 4Z\");H r(e)}I(v)1R 2K(\"2d't W 3m M 55 59 58 57 56\");f=f||\"\";O(d={2I:13,1d:[],2z:6(g){H f.1j(g)>-1},3a:6(g){f+=g}};c<e.L;)I(h=B(e,c,b,d)){a.U(h.3E);c+=h.1E[0].L||1}Z I(h=n.X.W(z[b],e.1c(c))){a.U(h[0]);c+=h[0].L}Z{h=e.3b(c);I(h===\"[\")b=M.2k;Z I(h===\"]\")b=M.1G;a.U(h);c++}a=16(a.1L(\"\"),n.Q.W(f,w,\"\"));a.1r={1n:e,1d:d.2I?d.1d:N};H a};M.3v=\"1.5.0\";M.2k=1;M.1G=2;K C=/\\$(?:(\\d\\d?|[$&`'])|{([$\\w]+)})/g,w=/[^5m]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=13,u=[],n={X:16.Y.X,1t:16.Y.1t,1E:1z.Y.1E,Q:1z.Y.Q,1f:1z.Y.1f},x=n.X.W(/()??/,\"\")[1]===1b,D=6(){K e=/^/g;n.1t.W(e,\"\");H!e.11}(),y=6(){K e=/x/g;n.Q.W(\"x\",e,\"\");H!e.11}(),E=16.Y.3l!==1b,z={};z[M.2k]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\26-2a-f]{2}|u[\\26-2a-f]{4}|c[A-3k-z]|[\\s\\S]))/;z[M.1G]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\26-2a-f]{2}|u[\\26-2a-f]{4}|c[A-3k-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1i=6(e,f,a,b){u.U({2x:r(e,\"g\"+(E?\"y\":\"\")),2f:f,3o:a||M.1G,2N:b||N})};M.2B=6(e,f){K a=e+\"/\"+(f||\"\");H M.2B[a]||(M.2B[a]=M(e,f))};M.3i=6(e){H r(e,\"g\")};M.5B=6(e){H e.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,\"\\\\$&\")};M.5F=6(e,f,a,b){f=r(f,\"g\"+(b&&E?\"y\":\"\"));f.11=a=a||0;e=f.X(e);H b?e&&e.P===a?e:N:e};M.3r=6(){M.1i=6(){1R 2K(\"2d't 5J 1i 5I 3r\")}};M.1S=6(e){H 5H.Y.1x.W(e)===\"[2F 16]\"};M.3q=6(e,f,a,b){O(K c=r(f,\"g\"),d=-1,h;h=c.X(e);){a.W(b,h,++d,e,c);c.11===h.P&&c.11++}I(f.1I)f.11=0};M.5A=6(e,f){H 6 a(b,c){K d=f[c].1K?f[c]:{1K:f[c]},h=r(d.1K,\"g\"),g=[],i;O(i=0;i<b.L;i++)M.3q(b[i],h,6(k){g.U(d.3p?k[d.3p]||\"\":k[0])});H c===f.L-1||!g.L?g:a(g,c+1)}([e],0)};16.Y.1B=6(e,f){H J.X(f[0])};16.Y.W=6(e,f){H J.X(f)};16.Y.X=6(e){I(e!=N)e+=\"\";K f=n.X.1B(J,15),a;I(f){I(!x&&f.L>1&&p(f,\"\")>-1){a=16(J.1n,n.Q.W(t(J),\"g\",\"\"));n.Q.W(e.1c(f.P),a,6(){O(K c=1;c<15.L-2;c++)I(15[c]===1b)f[c]=1b})}I(J.1r&&J.1r.1d)O(K b=1;b<f.L;b++)I(a=J.1r.1d[b-1])f[a]=f[b];!D&&J.1I&&!f[0].L&&J.11>f.P&&J.11--}H f};I(!D)16.Y.1t=6(e){(e=n.X.W(J,e))&&J.1I&&!e[0].L&&J.11>e.P&&J.11--;H!!e};1z.Y.1E=6(e){M.1S(e)||(e=16(e));I(e.1I){K f=n.1E.1B(J,15);e.11=0;H f}H e.X(J)};1z.Y.Q=6(e,f){K a=M.1S(e),b,c;I(a&&1g f.5z()===\"3g\"&&f.1j(\"${\")===-1&&y)H n.Q.1B(J,15);I(a){I(e.1r)b=e.1r.1d}Z e+=\"\";I(1g f===\"6\")c=n.Q.W(J,e,6(){I(b){15[0]=1k 1z(15[0]);O(K d=0;d<b.L;d++)I(b[d])15[0][b[d]]=15[d+1]}I(a&&e.1I)e.11=15[15.L-2]+15[0].L;H f.1B(N,15)});Z{c=J+\"\";c=n.Q.W(c,e,6(){K d=15;H n.Q.W(f,C,6(h,g,i){I(g)5r(g){2i\"$\":H\"$\";2i\"&\":H d[0];2i\"`\":H d[d.L-1].1c(0,d[d.L-2]);2i\"'\":H d[d.L-1].1c(d[d.L-2]+d[0].L);5q:i=\"\";g=+g;I(!g)H h;O(;g>d.L-3;){i=1z.Y.1c.W(g,-1)+i;g=1M.3j(g/10)}H(g?d[g]||\"\":\"$\")+i}Z{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&e.1I)e.11=0;H c};1z.Y.1f=6(e,f){I(!M.1S(e))H n.1f.1B(J,15);K a=J+\"\",b=[],c=0,d,h;I(f===1b||+f<0)f=5o;Z{f=1M.3j(+f);I(!f)H[]}O(e=M.3i(e);d=e.X(a);){I(e.11>c){b.U(a.1c(c,d.P));d.L>1&&d.P<a.L&&3c.Y.U.1B(b,d.1c(1));h=d[0].L;c=e.11;I(b.L>=f)1P}e.11===d.P&&e.11++}I(c===a.L){I(!n.1t.W(e,\"\")||h)b.U(\"\")}Z b.U(a.1c(c));H b.L>f?b.1c(0,f):b};M.1i(/\\(\\?#[^)]*\\)/,6(e){H n.1t.W(A,e.2J.1c(e.P+e[0].L))?\"\":\"(?:)\"});M.1i(/\\((?!\\?)/,6(){J.1d.U(N);H\"(\"});M.1i(/\\(\\?<([$\\w]+)>/,6(e){J.1d.U(e[1]);J.2I=R;H\"(\"});M.1i(/\\\\k<([\\w$]+)>/,6(e){K f=p(J.1d,e[1]);H f>-1?\"\\\\\"+(f+1)+(45(e.2J.3b(e.P+e[0].L))?\"\":\"(?:)\"):e[0]});M.1i(/\\[\\^?]/,6(e){H e[0]===\"[]\"?\"\\\\b\\\\B\":\"[\\\\s\\\\S]\"});M.1i(/^\\(\\?([5u]+)\\)/,6(e){J.3a(e[1]);H\"\"});M.1i(/(?:\\s+|#.*)+/,6(e){H n.1t.W(A,e.2J.1c(e.P+e[0].L))?\"\":\"(?:)\"},M.1G,6(){H J.2z(\"x\")});M.1i(/\\./,6(){H\"[\\\\s\\\\S]\"},M.1G,6(){H J.2z(\"s\")})})();1g 24!=\"1b\"&&(24.M=M);I(1g 1q==\"1b\")K 1q=6(){6 r(a,b){a.1l.1j(b)!=-1||(a.1l+=\" \"+b)}6 t(a){H a.1j(\"3d\")==0?a:\"3d\"+a}6 B(a){H f.1X.2M[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3t:[a.2L],h={\"#\":\"1h\",\".\":\"1l\"}[b.1p(0,1)]||\"3e\",g,i;g=h!=\"3e\"?b.1p(1):b.5v();I((a[h]||\"\").1j(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1Q.5L;I(!g.1J){g.1J=g.4u;g.3N=6(){J.4w=13}}c.W(d||1Q,g)}a.3h?a.3h(\"4z\"+b,h):a.4y(b,h,13)}6 A(a,b){K c=f.1X.2t,d=N;I(c==N){c={};O(K h 2g f.1T){K g=f.1T[h];d=g.4A;I(d!=N){g.1Y=h.4p();O(g=0;g<d.L;g++)c[d[g]]=h}}f.1X.2t=c}d=f.1T[c[a]];d==N&&b!=13&&1Q.1U(f.14.1w.1U+(f.14.1w.39+a));H d}6 v(a,b){O(K c=a.1f(\"\\n\"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1L(\"\\n\")}6 u(a,b){I(a==N||a.L==0||a==\"\\n\")H a;a=a.Q(/</g,\"&1A;\");a=a.Q(/ {2,}/g,6(c){O(K d=\"\",h=0;h<c.L-1;h++)d+=f.14.1Z;H d+\" \"});I(b!=N)a=v(a,6(c){I(c.L==0)H\"\";K d=\"\";c=c.Q(/^(&2r;| )+/,6(h){d=h;H\"\"});I(c.L==0)H d;H d+'<17 1e=\"'+b+'\">'+c+\"</17>\"});H a}6 n(a,b){a.1f(\"\\n\");O(K c=\"\",d=0;d<50;d++)c+=\"                    \";H a=v(a,6(h){I(h.1j(\"\\t\")==-1)H h;O(K g=0;(g=h.1j(\"\\t\"))!=-1;)h=h.1p(0,g)+c.1p(0,b-g%b)+h.1p(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,\"\")}6 D(a,b){I(a.P<b.P)H-1;Z I(a.P>b.P)H 1;Z I(a.L<b.L)H-1;Z I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2C?b.2C:c;(d=b.1K.X(a))!=N;){K i=g(d,b);I(1g i==\"3g\")i=[1k f.2G(i,d.P,b.22)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1D;|&1A;).*)/;H a.Q(f.3A.3M,6(c){K d=\"\",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H'<a 27=\"'+c+'\">'+c+\"</a>\"+d})}6 z(){O(K a=1C.30(\"1m\"),b=[],c=0;c<a.L;c++)a[c].3f==\"21\"&&b.U(a[c]);H b}6 e(a){a=a.1J;K b=p(a,\".21\",R);a=p(a,\".48\",R);K c=1C.3V(\"3s\");I(!(!a||!b||p(a,\"3s\"))){B(b.1h);r(b,\"1n\");O(K d=a.3t,h=[],g=0;g<d.L;g++)h.U(d[g].4B||d[g].4P);h=h.1L(\"\\r\");c.3G(1C.4N(h));a.3G(c);c.2H();c.4R();w(c,\"4S\",6(){c.2L.4V(c);b.1l=b.1l.Q(\"1n\",\"\")})}}I(1g 3F!=\"1b\"&&1g M==\"1b\")M=3F(\"M\").M;K f={2O:{\"1e-29\":\"\",\"2h-1s\":1,\"2m-1s-2p\":13,2b:N,1u:N,\"4i-4k\":R,\"4j-1W\":4,1v:R,18:R,\"3T-17\":R,2n:13,\"44-43\":R,2R:13,\"1y-1m\":13},14:{1Z:\"&2r;\",2q:R,4h:13,4d:13,36:\"4T\",1w:{23:\"4M 1n\",2S:\"?\",1U:\"1q\\n\\n\",39:\"4F't 4D 1F O: \",4f:\"4C 4G't 4H O 1y-1m 4K: \",31:'<!4J 1y 4Q \"-//4I//3H 4E 1.0 4L//4O\" \"20://2w.3L.3K/4W/3I/3H/3I-4m.4q\"><1y 4o=\"20://2w.3L.3K/4x/4r\"><3J><5M 20-4s=\"4t-5p\" 5Y=\"2D/1y; 71=75-8\" /><1u>6V 1q</1u></3J><3B 1N=\"28-6T:74,6G,6S,6A-6H;6J-2e:#6K;2e:#6L;28-1W:6M;2D-3D:3C;\"><T 1N=\"2D-3D:3C;3w-37:1.6N;\"><T 1N=\"28-1W:6Q-6P;\">1q</T><T 1N=\"28-1W:.6I;3w-6B:6z;\"><T>3v 3.0.6C (6D 12 3x)</T><T><a 27=\"20://3u.2l/1q\" 1J=\"38\" 1N=\"2e:#3y\">20://3u.2l/1q</a></T><T>6E 17 6R 72.</T><T>73 6Z-3x 6Y 6U.</T></T><T>70 6X 6W J 1m, 76 <a 27=\"6x://2w.62.2l/61-60/5Z?63=64-68&67=66\" 1N=\"2e:#3y\">6y</a> 5X <2Q/>5Q 5P 5O!</T></T></3B></1y>'}},1X:{2t:N,2M:{}},1T:{},3A:{5R:/\\/\\*[\\s\\S]*?\\*\\//2j,5S:/\\/\\/.*$/2j,5W:/#.*$/2j,5V:/\"([^\\\\\"\\n]|\\\\.)*\"/g,5U:/'([^\\\\'\\n]|\\\\.)*'/g,5T:1k M('\"([^\\\\\\\\\"]|\\\\\\\\.)*\"',\"3z\"),69:1k M(\"'([^\\\\\\\\']|\\\\\\\\.)*'\",\"3z\"),6q:/(&1A;|<)!--[\\s\\S]*?--(&1D;|>)/2j,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6n:{19:/(&1A;|<)\\?=?/g,1a:/\\?(&1D;|>)/g},6r:{19:/(&1A;|<)%=?/g,1a:/%(&1D;|>)/g},6s:{19:/(&1A;|<)\\s*1m.*?(&1D;|>)/2U,1a:/(&1A;|<)\\/\\s*1m\\s*(&1D;|>)/2U}},18:{1H:6(a){6 b(i,k){H f.18.2v(i,k,f.14.1w[k])}O(K c='<T 1e=\"18\">',d=f.18.2o,h=d.33,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+=\"</T>\";H c},2v:6(a,b,c){H'<2W><a 27=\"#\" 1e=\"6w 6v'+b+\" \"+b+'\">'+c+\"</a></2W>\"},2f:6(a){K b=a.1J,c=b.1l||\"\";b=B(p(b,\".21\",R).1h);K d=6(h){H(h=16(h+\"6u(\\\\w+)\").X(c))?h[1]:N}(\"6t\");b&&d&&f.18.2o[d].2P(b);a.3N()},2o:{33:[\"23\",\"2S\"],23:{1H:6(a){I(a.V(\"2n\")!=R)H\"\";K b=a.V(\"1u\");H f.18.2v(a,\"23\",b?b:f.14.1w.23)},2P:6(a){a=1C.6l(t(a.1h));a.1l=a.1l.Q(\"3W\",\"\")}},2S:{2P:6(){K a=\"6e=0\";a+=\", 19=\"+(35.32-2X)/2+\", 37=\"+(35.2Z-34)/2+\", 32=2X, 2Z=34\";a=a.Q(/^,/,\"\");a=1Q.6b(\"\",\"38\",a);a.2H();K b=a.1C;b.6f(f.14.1w.31);b.6g();a.2H()}}}},2Y:6(a,b){K c;I(b)c=[b];Z{c=1C.30(f.14.36);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(f.14.2q)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3U 0,l={},m=1k M(\"^\\\\[(?<2V>(.*?))\\\\]$\"),s=1k M(\"(?<29>[\\\\w-]+)\\\\s*:\\\\s*(?<1V>[\\\\w-%#]+|\\\\[.*?\\\\]|\\\".*?\\\"|'.*?')\\\\s*;?\",\"g\");(j=s.X(k))!=N;){K o=j.1V.Q(/^['\"]|['\"]$/g,\"\");I(o!=N&&m.1t(o)){o=m.X(o);o=o.2V.L>0?o.2V.1f(/\\s*,\\s*/):[]}l[j.29]=o}g={1J:g,1o:C(i,l)};g.1o.1F!=N&&d.U(g)}H d},2b:6(a,b){K c=J.2Y(a,b),d=N,h=f.14;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1J,k=b.1o,j=k.1F,l;I(j!=N){I(k[\"1y-1m\"]==\"R\"||f.2O[\"1y-1m\"]==R){d=1k f.4l(j);j=\"4v\"}Z I(d=A(j))d=1k d;Z 6h;l=i.3O;I(h.2q){l=l;K m=x(l),s=13;I(m.1j(\"<![6i[\")==0){m=m.4e(9);s=R}K o=m.L;I(m.1j(\"]]\\>\")==o-3){m=m.4e(0,o-3);s=R}l=s?m:l}I((i.1u||\"\")!=\"\")k.1u=i.1u;k.1F=j;d.2y(k);b=d.2T(l);I((i.1h||\"\")!=\"\")b.1h=i.1h;i.2L.6j(b,i)}}},6k:6(a){w(1Q,\"4g\",6(){f.2b(a)})}};f.2G=6(a,b,c){J.1V=a;J.P=b;J.L=a.L;J.22=c;J.1Y=N};f.2G.Y.1x=6(){H J.1V};f.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1k f.1T.6c,g=J,i=\"2T 1H 2y\".1f(\" \");I(c!=N){d=1k c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1B(h,15)}})();d.2c==N?1Q.1U(f.14.1w.1U+(f.14.1w.4f+a)):h.2A.U({1K:d.2c.17,2C:6(j){O(K l=j.17,m=[],s=d.2A,o=j.P+j.19.L,F=d.2c,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.19!=N&&j.19!=N){q=y(j.19,F.19);b(q,j.P);m=m.1O(q)}I(F.1a!=N&&j.1a!=N){q=y(j.1a,F.1a);b(q,j.P+j[0].6d(j.1a));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1Y=c.1Y;H m}})}};f.4b=6(){};f.4b.Y={V:6(a,b){K c=J.1o[a];c=c==N?b:c;K d={\"R\":R,\"13\":13}[c];H d==N?c:d},3R:6(a){H 1C.3V(a)},3Q:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1g a[d]==\"2F\")c=c.1O(y(b,a[d]));H J.3X(c.6m(D))},3X:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1P;Z I(g.P==c.P&&g.L>c.L)a[b]=N;Z I(g.P>=c.P&&g.P<d)a[h]=N}H a},3P:6(a){K b=[],c=2u(J.V(\"2h-1s\"));v(a,6(d,h){b.U(h+c)});H b},40:6(a){K b=J.V(\"2b\",[]);I(1g b!=\"2F\"&&b.U==N)b=[b];a:{a=a.1x();K c=3U 0;O(c=c=1M.6o(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1P a}b=-1}H b!=-1},2s:6(a,b,c){a=[\"1s\",\"6p\"+b,\"P\"+a,\"6a\"+(b%2==0?1:2).1x()];J.40(b)&&a.U(\"5N\");b==0&&a.U(\"1P\");H'<T 1e=\"'+a.1L(\" \")+'\">'+c+\"</T>\"},49:6(a,b){K c=\"\",d=a.1f(\"\\n\").L,h=2u(J.V(\"2h-1s\")),g=J.V(\"2m-1s-2p\");I(g==R)g=(h+d-1).1x().L;Z I(45(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=f.14.1Z;Z{j=g;O(K l=k.1x();l.L<j;)l=\"0\"+l;j=l}a=j;c+=J.2s(i,k,a)}H c},41:6(a,b){a=x(a);K c=a.1f(\"\\n\");J.V(\"2m-1s-2p\");K d=2u(J.V(\"2h-1s\"));a=\"\";O(K h=J.V(\"1F\"),g=0;g<c.L;g++){K i=c[g],k=/^(&2r;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1x();i=i.1p(j.L);j=j.Q(\" \",f.14.1Z)}i=x(i);I(i.L==0)i=f.14.1Z;a+=J.2s(g,l,(j!=N?'<17 1e=\"'+h+' 65\">'+j+\"</17>\":\"\")+i)}H a},4a:6(a){H a?\"<3Y>\"+a+\"</3Y>\":\"\"},46:6(a,b){6 c(l){H(l=l?l.1Y||g:g)?l+\" \":\"\"}O(K d=0,h=\"\",g=J.V(\"1F\",\"\"),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1p(d,k.P-d),j+\"4c\")+u(k.1V,j+k.22);d=k.P+k.L+(k.6F||0)}}h+=u(a.1p(d),c()+\"4c\");H h},1H:6(a){K b=\"\",c=[\"21\"],d;I(J.V(\"2R\")==R)J.1o.18=J.1o.1v=13;1l=\"21\";J.V(\"2n\")==R&&c.U(\"3W\");I((1v=J.V(\"1v\"))==13)c.U(\"6O\");c.U(J.V(\"1e-29\"));c.U(J.V(\"1F\"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,\"\").Q(/\\r/g,\" \");b=J.V(\"4j-1W\");I(J.V(\"4i-4k\")==R)a=n(a,b);Z{O(K h=\"\",g=0;g<b;g++)h+=\" \";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2Q\\s*\\/?>|&1A;2Q\\s*\\/?&1D;/2U;I(f.14.4h==R)b=b.Q(h,\"\\n\");I(f.14.4d==R)b=b.Q(h,\"\");b=b.1f(\"\\n\");h=/^\\s*/;g=4n;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1P a}g=1M.4U(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1p(g);a=b.1L(\"\\n\")}I(1v)d=J.3P(a);b=J.3Q(J.2A,a);b=J.46(a,b);b=J.41(b,d);I(J.V(\"44-43\"))b=E(b);1g 2E!=\"1b\"&&2E.42&&2E.42.1E(/5w/)&&c.U(\"5x\");H b='<T 1h=\"'+t(J.1h)+'\" 1e=\"'+c.1L(\" \")+'\">'+(J.V(\"18\")?f.18.1H(J):\"\")+'<3S 5y=\"0\" 5t=\"0\" 4X=\"0\">'+J.4a(J.V(\"1u\"))+\"<3Z><47>\"+(1v?'<25 1e=\"1v\">'+J.49(a)+\"</25>\":\"\")+'<25 1e=\"17\"><T 1e=\"48\">'+b+\"</T></25></47></3Z></3S></T>\"},2T:6(a){I(a===N)a=\"\";J.17=a;K b=J.3R(\"T\");b.3O=J.1H(a);J.V(\"18\")&&w(p(b,\".18\"),\"5s\",f.18.2f);J.V(\"3T-17\")&&w(p(b,\".17\"),\"5K\",e);H b},2y:6(a){J.1h=\"\"+1M.5G(1M.5C()*5D).1x();f.1X.2M[t(J.1h)]=J;J.1o=C(f.2O,a||{});I(J.V(\"2R\")==R)J.1o.18=J.1o.1v=13},5E:6(a){a=a.Q(/^\\s+|\\s+$/g,\"\").Q(/\\s+/g,\"|\");H\"\\\\b(?:\"+a+\")\\\\b\"},5n:6(a){J.2c={19:{1K:a.19,22:\"1m\"},1a:{1K:a.1a,22:\"1m\"},17:1k M(\"(?<19>\"+a.19.1n+\")(?<17>.*?)(?<1a>\"+a.1a.1n+\")\",\"54\")}}};H f}();1g 24!=\"1b\"&&(24.1q=1q);",62,441,"||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|prototype|else||lastIndex||false|config|arguments|RegExp|code|toolbar|left|right|undefined|slice|captureNames|class|split|typeof|id|addToken|indexOf|new|className|script|source|params|substr|SyntaxHighlighter|_xregexp|line|test|title|gutter|strings|toString|html|String|lt|apply|document|gt|match|brush|OUTSIDE_CLASS|getHtml|global|target|regex|join|Math|style|concat|break|window|throw|isRegExp|brushes|alert|value|size|vars|brushName|space|http|syntaxhighlighter|css|expandSource|exports|td|dA|href|font|name|Fa|highlight|htmlScript|can|color|handler|in|first|case|gm|INSIDE_CLASS|com|pad|collapse|items|numbers|useScriptTags|nbsp|getLineHtml|discoveredBrushes|parseInt|getButtonHtml|www|pattern|init|hasFlag|regexList|cache|func|text|navigator|object|Match|focus|hasNamedCapture|input|Error|parentNode|highlighters|trigger|defaults|execute|br|light|help|getDiv|gi|values|span|500|findElements|height|getElementsByTagName|aboutDialog|width|list|250|screen|tagName|top|_blank|noBrush|setFlag|charAt|Array|highlighter_|nodeName|type|string|attachEvent|copyAsGlobal|floor|Za|sticky|the|TypeError|scope|backref|iterate|freezeTokens|textarea|childNodes|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|output|require|appendChild|DTD|xhtml1|head|org|w3|url|preventDefault|innerHTML|figureOutLineNumbers|findMatches|create|table|quick|void|createElement|collapsed|removeNestedMatches|caption|tbody|isLineHighlighted|getCodeLinesHtml|userAgent|links|auto|isNaN|getMatchesHtml|tr|container|getLineNumbersHtml|getTitleHtml|Highlighter|plain|stripBrs|substring|brushNotHtmlScript|load|bloggerMode|smart|tab|tabs|HtmlScript|transitional|1E3|xmlns|toLowerCase|dtd|xhtml|equiv|Content|srcElement|htmlscript|returnValue|1999|addEventListener|on|aliases|innerText|Brush|find|XHTML|Can|wasn|configured|W3C|DOCTYPE|option|Transitional|expand|createTextNode|EN|textContent|PUBLIC|select|blur|pre|min|removeChild|TR|cellspacing|from|another||one|constructing|when|sgi|constructor|functions|definition|token|within|flags|supply|expected|frame|same|twice|ignoreCase|multiline|finally|catch|try|extended|gimy|forHtmlScript|Infinity|Type|default|switch|click|cellpadding|imsx|toUpperCase|MSIE|ie|border|valueOf|matchChain|escape|random|1E6|getKeywords|execAt|round|Object|after|run|dblclick|event|meta|highlighted|active|development|keep|multiLineCComments|singleLineCComments|multiLineDoubleQuotedString|singleQuotedString|doubleQuotedString|singleLinePerlComments|to|content|webscr|bin|cgi|paypal|cmd|_s|spaces|2930402|hosted_button_id|xclick|multiLineSingleQuotedString|alt|open|Xml|lastIndexOf|scrollbars|write|close|continue|CDATA|replaceChild|all|getElementById|sort|phpScriptTags|max|number|xmlComments|aspScriptTags|scriptScriptTags|command|_|command_|toolbar_item|https|donate|3em|sans|bottom|87|November|JavaScript|offset|Arial|serif|75em|background|fff|000|1em|5em|nogutter|large|xx|syntax|Helvetica|family|Gorbatchev|About|like|you|Alex|2004|If|charset|highlighter|Copyright|Geneva|utf|please".split("|"),0,{}));
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7d8(){
var _7d9="ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR "+"DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH "+"HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP "+"HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY "+"HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT "+"HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE "+"LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF "+"LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR "+"LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR "+"PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT "+"PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 "+"POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR "+"PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 "+"PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT "+"SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG "+"ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM "+"char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t "+"clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS "+"FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t "+"__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t "+"jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler "+"sig_atomic_t size_t _stat __stat64 _stati64 terminate_function "+"time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf "+"va_list wchar_t wctrans_t wctype_t wint_t signed";
var _7da="break case catch class const __finally __exception __try "+"const_cast continue private public protected __declspec "+"default delete deprecated dllexport dllimport do dynamic_cast "+"else enum explicit extern if for friend goto inline "+"mutable naked namespace new noinline noreturn nothrow "+"register reinterpret_cast return selectany "+"sizeof static static_cast struct switch template this "+"thread throw true false try typedef typeid typename union "+"using uuid virtual void volatile whcar_t while";
var _7db="assert isalnum isalpha iscntrl isdigit isgraph islower isprint"+"ispunct isspace isupper isxdigit tolower toupper errno localeconv "+"setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod "+"frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf "+"longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start "+"clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen "+"fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell "+"fwrite getc getchar gets perror printf putc putchar puts remove "+"rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam "+"ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol "+"bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs "+"mbtowc qsort rand realloc srand strtod strtol strtoul system "+"wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr "+"strcmp strcoll strcpy strcspn strerror strlen strncat strncmp "+"strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime "+"clock ctime difftime gmtime localtime mktime strftime time";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7d9),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords(_7db),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords(_7da),"gm"),css:"keyword bold"}];
};
_7d8.prototype=new SyntaxHighlighter.Highlighter();
_7d8.aliases=["cpp","c"];
SyntaxHighlighter.brushes.Cpp=_7d8;
typeof (exports)!="undefined"?exports.Brush=_7d8:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7dc(){
var _7dd="abstract as base bool break byte case catch char checked class const "+"continue decimal default delegate do double else enum event explicit "+"extern false finally fixed float for foreach get goto if implicit in int "+"interface internal is lock long namespace new null object operator out "+"override params private protected public readonly ref return sbyte sealed set "+"short sizeof stackalloc static string struct switch this throw true try "+"typeof uint ulong unchecked unsafe ushort using virtual void while";
function _7de(_7df,_7e0){
var css=(_7df[0].indexOf("///")==0)?"color1":"comments";
return [new SyntaxHighlighter.Match(_7df[0],_7df.index,css)];
};
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:_7de},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7dd),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7dc.prototype=new SyntaxHighlighter.Highlighter();
_7dc.aliases=["c#","c-sharp","csharp"];
SyntaxHighlighter.brushes.CSharp=_7dc;
typeof (exports)!="undefined"?exports.Brush=_7dc:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7e1(){
function _7e2(str){
return "\\b([a-z_]|)"+str.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b";
};
function _7e3(str){
return "\\b"+str.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b";
};
var _7e4="ascent azimuth background-attachment background-color background-image background-position "+"background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top "+"border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color "+"border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width "+"border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color "+"content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display "+"elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font "+"height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top "+"margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans "+"outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page "+"page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position "+"quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress "+"table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em "+"vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index";
var _7e5="above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder "+"both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed "+"continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double "+"embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia "+"gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic "+"justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha "+"lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower "+"navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset "+"outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side "+"rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow "+"small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize "+"table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal "+"text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin "+"upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow";
var _7e6="[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif";
this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(_7e2(_7e4),"gm"),css:"keyword"},{regex:new RegExp(_7e3(_7e5),"g"),css:"value"},{regex:new RegExp(this.getKeywords(_7e6),"g"),css:"color1"}];
this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi});
};
_7e1.prototype=new SyntaxHighlighter.Highlighter();
_7e1.aliases=["css"];
SyntaxHighlighter.brushes.CSS=_7e1;
typeof (exports)!="undefined"?exports.Brush=_7e1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7e7(){
var _7e8="abs addr and ansichar ansistring array as asm begin boolean byte cardinal "+"case char class comp const constructor currency destructor div do double "+"downto else end except exports extended false file finalization finally "+"for function goto if implementation in inherited int64 initialization "+"integer interface is label library longint longword mod nil not object "+"of on or packed pansichar pansistring pchar pcurrency pdatetime pextended "+"pint64 pointer private procedure program property pshortstring pstring "+"pvariant pwidechar pwidestring protected public published raise real real48 "+"record repeat set shl shortint shortstring shr single smallint string then "+"threadvar to true try type unit until uses val var varirnt while widechar "+"widestring with word write writeln xor";
this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords(_7e8),"gmi"),css:"keyword"}];
};
_7e7.prototype=new SyntaxHighlighter.Highlighter();
_7e7.aliases=["delphi","pascal","pas"];
SyntaxHighlighter.brushes.Delphi=_7e7;
typeof (exports)!="undefined"?exports.Brush=_7e7:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7e9(){
function _7ea(_7eb,_7ec){
var _7ed=SyntaxHighlighter.Match,code=_7eb[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_7ee=[];
if(_7eb.attributes!=null){
var _7ef,_7f0=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_7ef=_7f0.exec(code))!=null){
_7ee.push(new _7ed(_7ef.name,_7eb.index+_7ef.index,"color1"));
_7ee.push(new _7ed(_7ef.value,_7eb.index+_7ef.index+_7ef[0].indexOf(_7ef.value),"string"));
}
}
if(tag!=null){
_7ee.push(new _7ed(tag.name,_7eb.index+tag[0].indexOf(tag.name),"keyword"));
}
return _7ee;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_7ea}];
};
_7e9.prototype=new SyntaxHighlighter.Highlighter();
_7e9.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_7e9;
typeof (exports)!="undefined"?exports.Brush=_7e9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f1(){
var _7f2="abstract assert boolean break byte case catch char class const "+"continue default do double else enum extends "+"false final finally float for goto if implements import "+"instanceof int interface long native new null "+"package private protected public return "+"short static strictfp super switch synchronized this throw throws true "+"transient try void volatile while";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords(_7f2),"gm"),css:"keyword"}];
this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g});
};
_7f1.prototype=new SyntaxHighlighter.Highlighter();
_7f1.aliases=["java"];
SyntaxHighlighter.brushes.Java=_7f1;
typeof (exports)!="undefined"?exports.Brush=_7f1:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f3(){
var _7f4="break case catch continue "+"default delete do else false  "+"for function if in instanceof "+"new null return super switch "+"this throw true try typeof var while with";
var r=SyntaxHighlighter.regexLib;
this.regexList=[{regex:r.multiLineDoubleQuotedString,css:"string"},{regex:r.multiLineSingleQuotedString,css:"string"},{regex:r.singleLineCComments,css:"comments"},{regex:r.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_7f4),"gm"),css:"keyword"}];
this.forHtmlScript(r.scriptScriptTags);
};
_7f3.prototype=new SyntaxHighlighter.Highlighter();
_7f3.aliases=["js","jscript","javascript"];
SyntaxHighlighter.brushes.JScript=_7f3;
typeof (exports)!="undefined"?exports.Brush=_7f3:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f5(){
var _7f6="abs acos acosh addcslashes addslashes "+"array_change_key_case array_chunk array_combine array_count_values array_diff "+"array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill "+"array_filter array_flip array_intersect array_intersect_assoc array_intersect_key "+"array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map "+"array_merge array_merge_recursive array_multisort array_pad array_pop array_product "+"array_push array_rand array_reduce array_reverse array_search array_shift "+"array_slice array_splice array_sum array_udiff array_udiff_assoc "+"array_udiff_uassoc array_uintersect array_uintersect_assoc "+"array_uintersect_uassoc array_unique array_unshift array_values array_walk "+"array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert "+"basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress "+"bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir "+"checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists "+"closedir closelog copy cos cosh count count_chars date decbin dechex decoct "+"deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log "+"error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded "+"feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents "+"fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype "+"floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf "+"fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname "+"gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt "+"getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext "+"gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set "+"interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double "+"is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long "+"is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault "+"is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br "+"parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir "+"round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split "+"str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes "+"stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk "+"strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime "+"strtoupper strtr strval substr substr_compare";
var _7f7="abstract and array as break case catch cfunction class clone const continue declare default die do "+"else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach "+"function include include_once global goto if implements interface instanceof namespace new "+"old_function or private protected public return require require_once static switch "+"throw try use var while xor ";
var _7f8="__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords(_7f6),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_7f8),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords(_7f7),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_7f5.prototype=new SyntaxHighlighter.Highlighter();
_7f5.aliases=["php"];
SyntaxHighlighter.brushes.Php=_7f5;
typeof (exports)!="undefined"?exports.Brush=_7f5:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7f9(){
var _7fa="and assert break class continue def del elif else "+"except exec finally for from global if import in is "+"lambda not or pass print raise return try yield while";
var _7fb="__import__ abs all any apply basestring bin bool buffer callable "+"chr classmethod cmp coerce compile complex delattr dict dir "+"divmod enumerate eval execfile file filter float format frozenset "+"getattr globals hasattr hash help hex id input int intern "+"isinstance issubclass iter len list locals long map max min next "+"object oct open ord pow print property range raw_input reduce "+"reload repr reversed round set setattr slice sorted staticmethod "+"str sum super tuple type type unichr unicode vars xrange zip";
var _7fc="None True False self cls class_";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords(_7fb),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_7fa),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7fc),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7f9.prototype=new SyntaxHighlighter.Highlighter();
_7f9.aliases=["py","python"];
SyntaxHighlighter.brushes.Python=_7f9;
typeof (exports)!="undefined"?exports.Brush=_7f9:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _7fd(){
var _7fe="alias and BEGIN begin break case class def define_method defined do each else elsif "+"END end ensure false for if in module new next nil not or raise redo rescue retry return "+"self super then throw true undef unless until when while yield";
var _7ff="Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload "+"Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol "+"ThreadGroup Thread Time TrueClass";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords(_7fe),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_7ff),"gm"),css:"color1"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_7fd.prototype=new SyntaxHighlighter.Highlighter();
_7fd.aliases=["ruby","rails","ror","rb"];
SyntaxHighlighter.brushes.Ruby=_7fd;
typeof (exports)!="undefined"?exports.Brush=_7fd:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _800(){
var _801="abs avg case cast coalesce convert count current_timestamp "+"current_user day isnull left lower month nullif replace right "+"session_user space substring sum system_user upper user year";
var _802="absolute action add after alter as asc at authorization begin bigint "+"binary bit by cascade char character check checkpoint close collate "+"column commit committed connect connection constraint contains continue "+"create cube current current_date current_time cursor database date "+"deallocate dec decimal declare default delete desc distinct double drop "+"dynamic else end end-exec escape except exec execute false fetch first "+"float for force foreign forward free from full function global goto grant "+"group grouping having hour ignore index inner insensitive insert instead "+"int integer intersect into is isolation key last level load local max min "+"minute modify move name national nchar next no numeric of off on only "+"open option order out output partial password precision prepare primary "+"prior privileges procedure public read real references relative repeatable "+"restrict return returns revoke rollback rollup rows rule schema scroll "+"second section select sequence serializable set size smallint static "+"statistics table temp temporary then time timestamp to top transaction "+"translation trigger true truncate uncommitted union unique update values "+"varchar varying view when where with work";
var _803="all and any between cross in join like not null or outer some";
this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_801),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords(_803),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords(_802),"gmi"),css:"keyword"}];
};
_800.prototype=new SyntaxHighlighter.Highlighter();
_800.aliases=["sql"];
SyntaxHighlighter.brushes.Sql=_800;
typeof (exports)!="undefined"?exports.Brush=_800:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _804(){
var _805="AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto "+"Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate "+"CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType "+"Date Decimal Declare Default Delegate Dim DirectCast Do Double Each "+"Else ElseIf End Enum Erase Error Event Exit False Finally For Friend "+"Function Get GetType GoSub GoTo Handles If Implements Imports In "+"Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module "+"MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing "+"NotInheritable NotOverridable Object On Option Optional Or OrElse "+"Overloads Overridable Overrides ParamArray Preserve Private Property "+"Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume "+"Return Select Set Shadows Shared Short Single Static Step Stop String "+"Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until "+"Variant When While With WithEvents WriteOnly Xor";
this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(_805),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_804.prototype=new SyntaxHighlighter.Highlighter();
_804.aliases=["vb","vbnet"];
SyntaxHighlighter.brushes.Vb=_804;
typeof (exports)!="undefined"?exports.Brush=_804:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _806(){
function _807(_808,_809){
var _80a=SyntaxHighlighter.Match,code=_808[0],tag=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(code),_80b=[];
if(_808.attributes!=null){
var _80c,_80d=new XRegExp("(?<name> [\\w:\\-\\.]+)"+"\\s*=\\s*"+"(?<value> \".*?\"|'.*?'|\\w+)","xg");
while((_80c=_80d.exec(code))!=null){
_80b.push(new _80a(_80c.name,_808.index+_80c.index,"color1"));
_80b.push(new _80a(_80c.value,_808.index+_80c.index+_80c[0].indexOf(_80c.value),"string"));
}
}
if(tag!=null){
_80b.push(new _80a(tag.name,_808.index+tag[0].indexOf(tag.name),"keyword"));
}
return _80b;
};
this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:_807}];
};
_806.prototype=new SyntaxHighlighter.Highlighter();
_806.aliases=["xml","xhtml","xslt","html"];
SyntaxHighlighter.brushes.Xml=_806;
typeof (exports)!="undefined"?exports.Brush=_806:null;
})();
function ClojureRegExp(_80e){
_80e=_80e+"(?=[[\\]{}(),\\s])";
this.regex=new RegExp(_80e,"g");
this.lookBehind=/[\[\]{}(),\s]$/;
};
ClojureRegExp.prototype.exec=function(str){
var _80f,_810;
while(_80f=this.regex.exec(str)){
_810=str.substring(0,_80f.index);
if(this.lookBehind.test(_810)){
return _80f;
}else{
this.regex.lastIndex=_80f.index+1;
}
}
return null;
};
SyntaxHighlighter.brushes.Clojure=function(){
var _811=". def do fn if let loop monitor-enter monitor-exit new quote recur set! "+"throw try var",_812="* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* "+"*command-line-args* *compile-files* *compile-path* *e *err* *file* "+"*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* "+"*print-dup* *print-length* *print-level* *print-meta* *print-readably* "+"*read-eval* *source-path* *use-context-classloader* "+"*warn-on-reflection* + - -> -&gt; ->> -&gt;&gt; .. / < &lt; <= &lt;= = "+"== > &gt; >= &gt;= accessor aclone "+"add-classpath add-watch agent agent-errors aget alength alias all-ns "+"alter alter-meta! alter-var-root amap ancestors and apply areduce "+"array-map aset aset-boolean aset-byte aset-char aset-double aset-float "+"aset-int aset-long aset-short assert assoc assoc! assoc-in associative? "+"atom await await-for await1 bases bean bigdec bigint binding bit-and "+"bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left "+"bit-shift-right bit-test bit-xor boolean boolean-array booleans "+"bound-fn bound-fn* butlast byte byte-array bytes cast char char-array "+"char-escape-string char-name-string char? chars chunk chunk-append "+"chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? "+"class class? clear-agent-errors clojure-version coll? comment commute "+"comp comparator compare compare-and-set! compile complement concat cond "+"condp conj conj! cons constantly construct-proxy contains? count "+"counted? create-ns create-struct cycle dec decimal? declare definline "+"defmacro defmethod defmulti defn defn- defonce defstruct delay delay? "+"deliver deref derive descendants destructure disj disj! dissoc dissoc! "+"distinct distinct? doall doc dorun doseq dosync dotimes doto double "+"double-array doubles drop drop-last drop-while empty empty? ensure "+"enumeration-seq eval even? every? false? ffirst file-seq filter find "+"find-doc find-ns find-var first float float-array float? floats flush "+"fn fn? fnext for force format future future-call future-cancel "+"future-cancelled? future-done? future? gen-class gen-interface gensym "+"get get-in get-method get-proxy-class get-thread-bindings get-validator "+"hash hash-map hash-set identical? identity if-let if-not ifn? import "+"in-ns inc init-proxy instance? int int-array integer? interleave intern "+"interpose into into-array ints io! isa? iterate iterator-seq juxt key "+"keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list "+"list* list? load load-file load-reader load-string loaded-libs locking "+"long long-array longs loop macroexpand macroexpand-1 make-array "+"make-hierarchy map map? mapcat max max-key memfn memoize merge "+"merge-with meta method-sig methods min min-key mod name namespace neg? "+"newline next nfirst nil? nnext not not-any? not-empty not-every? not= "+"\tns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics "+"ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? "+"or parents partial partition pcalls peek persistent! pmap pop pop! "+"pop-thread-bindings pos? pr pr-str prefer-method prefers "+"primitives-classnames print print-ctor print-doc print-dup print-method "+"print-namespace-doc print-simple print-special-doc print-str printf "+"println println-str prn prn-str promise proxy proxy-call-with-super "+"proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot "+"rand rand-int range ratio? rational? rationalize re-find re-groups "+"re-matcher re-matches re-pattern re-seq read read-line read-string "+"reduce ref ref-history-count ref-max-history ref-min-history ref-set "+"refer refer-clojure release-pending-sends rem remove remove-method "+"remove-ns remove-watch repeat repeatedly replace replicate require "+"reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq "+"rsubseq second select-keys send send-off seq seq? seque sequence "+"sequential? set set-validator! set? short short-array shorts "+"shutdown-agents slurp some sort sort-by sorted-map sorted-map-by "+"sorted-set sorted-set-by sorted? special-form-anchor special-symbol? "+"split-at split-with str stream? string? struct struct-map subs subseq "+"subvec supers swap! symbol symbol? sync syntax-symbol-anchor take "+"take-last take-nth take-while test the-ns time to-array to-array-2d "+"trampoline transient tree-seq true? type unchecked-add unchecked-dec "+"unchecked-divide unchecked-inc unchecked-multiply unchecked-negate "+"unchecked-remainder unchecked-subtract underive unquote "+"unquote-splicing update-in update-proxy use val vals var-get var-set "+"var? vary-meta vec vector vector? when when-first when-let when-not "+"while with-bindings with-bindings* with-in-str with-loading-context "+"with-local-vars with-meta with-open with-out-str with-precision xml-seq "+"zero? zipmap ";
this.getKeywords=function(_813){
_813=_813.replace(/[\-\[\]{}()*+?.\\\^$|,#]/g,"\\$&");
_813=_813.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return "(?:"+_813+")";
};
this.regexList=[{regex:new RegExp("\\W;.*$","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:/#"(?:\.|(\\\")|[^\""\n])*"/g,css:"string"},{regex:/\[|\]/g,css:"keyword"},{regex:/\s+&(amp;)?\s+/g,css:"keyword"},{regex:/#?\{|\}/g,css:"keyword"},{regex:/#\^\{/g,css:"keyword"},{regex:/#\(|%/g,css:"keyword"},{regex:/@/g,css:"keyword"},{regex:/(['`]|~@?)[\[({]/g,css:"keyword"},{regex:/\(|\)/g,css:"keyword"},{regex:/\\.\b/g,css:"value"},{regex:/[+\-]?\b0x[0-9A-F]+\b/gi,css:"value"},{regex:new ClojureRegExp("[+-]?\\b\\d+(\\.\\d*)?([eE][+-]?\\d+|M)?\\b"),css:"value"},{regex:/^[+\-]?\b\d+(\.\d*)?([eE][+\-]?\d+|M)?\b/g,css:"value"},{regex:/\b(true|false|nil)\b/g,css:"value"},{regex:/(`|#?'|~@?)[\w-.\/]+/g,css:"color1"},{regex:/:[A-Za-z0-9_\-]+/g,css:"constants"},{regex:new ClojureRegExp(this.getKeywords(_811)),css:"preprocessor"},{regex:/\#\^[A-Za-z]\w*/g,css:"preprocessor"},{regex:new ClojureRegExp(this.getKeywords(_812)),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.scriptScriptTags);
};
SyntaxHighlighter.brushes.Clojure.prototype=new SyntaxHighlighter.Highlighter();
SyntaxHighlighter.brushes.Clojure.aliases=["clojure","Clojure","clj"];
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _814(){
var _815="abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr "+"chroot close closedir connect cos crypt defined delete each endgrent "+"endhostent endnetent endprotoent endpwent endservent eof exec exists "+"exp fcntl fileno flock fork format formline getc getgrent getgrgid "+"getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr "+"getnetbyname getnetent getpeername getpgrp getppid getpriority "+"getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid "+"getservbyname getservbyport getservent getsockname getsockopt glob "+"gmtime grep hex index int ioctl join keys kill lc lcfirst length link "+"listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd "+"oct open opendir ord pack pipe pop pos print printf prototype push "+"quotemeta rand read readdir readline readlink readpipe recv rename "+"reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl "+"semget semop send setgrent sethostent setnetent setpgrp setpriority "+"setprotoent setpwent setservent setsockopt shift shmctl shmget shmread "+"shmwrite shutdown sin sleep socket socketpair sort splice split sprintf "+"sqrt srand stat study substr symlink syscall sysopen sysread sysseek "+"system syswrite tell telldir time times tr truncate uc ucfirst umask "+"undef unlink unpack unshift utime values vec wait waitpid warn write";
var _816="bless caller continue dbmclose dbmopen die do dump else elsif eval exit "+"for foreach goto if import last local my next no our package redo ref "+"require return sub tie tied unless untie until use wantarray while";
this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords(_815),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords(_816),"gm"),css:"keyword"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);
};
_814.prototype=new SyntaxHighlighter.Highlighter();
_814.aliases=["perl","Perl","pl"];
SyntaxHighlighter.brushes.Perl=_814;
typeof (exports)!="undefined"?exports.Brush=_814:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _817(){
var _818="if fi then elif else for do done until while break continue case function return in eq ne ge le";
var _819="alias apropos awk basename bash bc bg builtin bzip2 cal cat cd cfdisk chgrp chmod chown chroot"+"cksum clear cmp comm command cp cron crontab csplit cut date dc dd ddrescue declare df "+"diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval "+"exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format "+"free fsck ftp gawk getopts grep groups gzip hash head history hostname id ifconfig "+"import install join kill less let ln local locate logname logout look lpc lpr lprint "+"lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools "+"mv netstat nice nl nohup nslookup open op passwd paste pathchk ping popd pr printcap "+"printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice "+"remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown "+"sleep sort source split ssh strace su sudo sum symlink sync tail tar tee test time "+"times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias "+"uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir "+"vi watch wc whereis which who whoami Wget xargs yes";
this.regexList=[{regex:/^#!.*$/gm,css:"preprocessor bold"},{regex:/\/[\w-\/]+/gm,css:"plain"},{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_818),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_819),"gm"),css:"functions"}];
};
_817.prototype=new SyntaxHighlighter.Highlighter();
_817.aliases=["bash","shell"];
SyntaxHighlighter.brushes.Bash=_817;
typeof (exports)!="undefined"?exports.Brush=_817:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _81a(){
var _81b="after and andalso band begin bnot bor bsl bsr bxor "+"case catch cond div end fun if let not of or orelse "+"query receive rem try when xor"+" module export import define";
this.regexList=[{regex:new RegExp("[A-Z][A-Za-z0-9_]+","g"),css:"constants"},{regex:new RegExp("\\%.+","gm"),css:"comments"},{regex:new RegExp("\\?[A-Za-z0-9_]+","g"),css:"preprocessor"},{regex:new RegExp("[a-z0-9_]+:[a-z0-9_]+","g"),css:"functions"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords(_81b),"gm"),css:"keyword"}];
};
_81a.prototype=new SyntaxHighlighter.Highlighter();
_81a.aliases=["erl","erlang"];
SyntaxHighlighter.brushes.Erland=_81a;
typeof (exports)!="undefined"?exports.Brush=_81a:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _81c(){
var _81d="as assert break case catch class continue def default do else extends finally "+"if in implements import instanceof interface new package property return switch "+"throw throws try while public protected private static";
var _81e="void boolean byte char short int long float double";
var _81f="null";
var _820="allProperties count get size "+"collect each eachProperty eachPropertyName eachWithIndex find findAll "+"findIndexOf grep inject max min reverseEach sort "+"asImmutable asSynchronized flatten intersect join pop reverse subMap toList "+"padRight padLeft contains eachMatch toCharacter toLong toUrl tokenize "+"eachFile eachFileRecurse eachB yte eachLine readBytes readLine getText "+"splitEachLine withReader append encodeBase64 decodeBase64 filterLine "+"transformChar transformLine withOutputStream withPrintWriter withStream "+"withStreams withWriter withWriterAppend write writeLine "+"dump inspect invokeMethod print println step times upto use waitForOrKill "+"getText";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/""".*"""/g,css:"string"},{regex:new RegExp("\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b","gi"),css:"value"},{regex:new RegExp(this.getKeywords(_81d),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords(_81e),"gm"),css:"color1"},{regex:new RegExp(this.getKeywords(_81f),"gm"),css:"constants"},{regex:new RegExp(this.getKeywords(_820),"gm"),css:"functions"}];
this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
};
_81c.prototype=new SyntaxHighlighter.Highlighter();
_81c.aliases=["groovy"];
SyntaxHighlighter.brushes.Groovy=_81c;
typeof (exports)!="undefined"?exports.Brush=_81c:null;
})();
(function(){
typeof (require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;
function _821(){
var _822="val sealed case def true trait implicit forSome import match object null finally super "+"override try lazy for var catch throw type extends class while with new final yield abstract "+"else do if return protected private this package false";
var _823="[_:=><%#@]+";
this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/0x[a-f0-9]+|\d+(\.\d+)?/gi,css:"value"},{regex:new RegExp(this.getKeywords(_822),"gm"),css:"keyword"},{regex:new RegExp(_823,"gm"),css:"keyword"}];
};
_821.prototype=new SyntaxHighlighter.Highlighter();
_821.aliases=["scala"];
SyntaxHighlighter.brushes.Scala=_821;
typeof (exports)!="undefined"?exports.Brush=_821:null;
})();
(function($){
$.fn.starrating=function(_824){
var _824=$.extend({},$.fn.starrating.options,_824||{});
return this.each(function(){
var o=$.meta?$.extend({},_824,$this.data()):_824;
var url=this.action,_825,_826,_827;
init(this);
var div=$("<div/>").attr({title:this.title,"class":o.ratingClass}).insertAfter(this);
$(this).find("select option").each(function(){
div.append(this.value=="0"?"<div class='cancel'><a href='#0' title='Cancel Rating'>Cancel Rating</a></div>":"<div class='star'><a href='#"+this.value+"' title='Give it a "+this.value+" Star Rating'>"+this.value+"</a></div>");
});
var _828=div.find("div.star");
var _829=div.find("div.cancel");
disabled=$(this).find("select").is(":disabled")||o.disabled;
if(!disabled){
_828.mouseover(_82a).focus(_82a).mouseout(_82b).blur(_82b).click(_82c);
_829.mouseover(_82d).focus(_82d).mouseout(_82e).blur(_82e).click(_82c);
}else{
_82f(div);
}
_830();
function init(elem){
_825=$(elem).attr("title").split(/:\s*/)[1],_826=_825.split(".")[0],_827=_825.split(".")[1];
};
function _82a(){
_831();
fill(this);
};
function _82b(){
_831();
_830();
};
function _82e(){
_830();
$(this).removeClass("on");
};
function _82d(){
_831();
$(this).addClass("on");
};
function _82f(elem){
_828.unbind();
_829.unbind();
$(elem).css("cursor","default");
$(elem).find("a").each(function(){
var _832=$(this).attr("title");
var _833="Average Rating: "+_825;
$(this).attr("title",_832.replace("Give it a "+this.href.split("#")[1]+" Star Rating",_833).replace("Cancel Rating",_833));
$(this).css("cursor","default");
$(this).hover(function(){
if($(this).parent().hasClass("on")){
$(this).css("background-position",o.position);
}else{
$(this).css("background-position","inherit");
}
});
$(this).click(function(e){
e.preventDefault();
});
});
};
function _82c(){
if(_828.index(this)==-1&&!o.cancelSubmit){
return false;
}
_826=_828.index(this)+1;
_827=0;
if(_826==0){
_831();
}
var _834=$(this).find("a")[0].href.split("#")[1];
if(!o.isStatic){
var data=$.extend({rating:_834},o.params);
$.ajax({type:"POST",url:url,data:data,dataType:"text",success:o.success,complete:function(xml,txt){
var _835=$("div."+o.ratingClass);
init(_835);
_82b();
if(o.disableOnSubmit){
_82f(_835);
}
}});
}else{
o.success(_834);
}
return false;
};
function fill(elem){
_828.find("a").css("width","100%");
$(_828[_828.index(elem)-1]).prevAll().andSelf().filter("div.star").addClass("hover");
};
function _831(){
_828.removeClass("on hover");
};
function _830(){
$(_828[_826-1]).prevAll().andSelf().filter("div.star").addClass("on");
var _836=_827?_827*10:0;
if(_836>0){
$(_828[_826]).addClass("on").children("a").css("width",_836+"%");
}
};
}).remove();
};
if($.browser.msie){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
$.fn.starrating.options={cancelSubmit:true,disabled:false,position:"-87px -91px",success:function(data){
alert("Success!");
},disableOnSubmit:false,isStatic:false,ratingClass:"rating",params:{id:1}};
})(jQuery);
function initializeProfilePage(){
var _837="<span class=\"read_more\">+ More</span>";
function _838(){
jq(this).find("span.details").css({display:"inline"});
};
jq("body.newprofile #profile_header div.bio_container").expander({slicePoint:450,widow:8,expandText:_837,userCollapseText:"",expandSpeed:0,afterExpand:_838});
jq(".content_listing.text_content > li").each(function(i,el){
el=jq(el);
var _839=el.find("h3").first();
if(_839.height()>100){
el.addClass("smaller");
}
});
try{
_gaq.push(["t2._trackEvent","Related User","View","User Profile",0,true]);
jq(".similar_users_box .x_icon").live("click",function(ev){
_gaq.push(["t2._trackEvent","Related User","Dismiss","User Profile"]);
});
jq(".similar_users_box .f_button").live("click",function(ev){
_gaq.push(["t2._trackEvent","Related User","Follow","User Profile"]);
});
jq(".similar_users_box .similar_user_photo a, .similar_users_box .link_profile a").live("click",function(ev){
ev.preventDefault();
_gaq.push(["t2._trackEvent","Related User","Visit","User Profile"]);
window.location.href=jq(this).attr("href");
});
}
catch(e){
}
};
var ProfileManager=function(_83a,_83b,_83c,_83d,_83e){
this.userId=_83a;
this.userName=_83b;
this.loggedInUserId=_83c;
this.currentSection="mycontent";
this.defaultTab="hubs_items";
this.containerSectionDiv=jq("#profile_content_container");
this.profileContainer=_83d;
this.loadMoreBtn=this.profileContainer.find("#load_more_btn");
this.spinnerDiv=_83e;
this.allowedSections=["mycontent","activity","followers","following","fanmail","email","bio"];
this.moreRequest=this.profileContainer.data("moreRequest");
this.moreTopic=this.profileContainer.data("moreTopic");
this.moreArticle=this.profileContainer.data("moreArticle");
this.bindEvents();
HubPages.Lightbox.Slideshow.init(this.userId,"","","ul.profile_links > li.recent_images");
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
jq("#pagination").hide();
var _83f=window.location.href,hash=window.location.hash;
if(window.location.href.match(/filter=|page=/)){
if(hash){
parent.location.href=_83f.match(/^.*new/)[0]+hash;
}else{
parent.location.href=_83f.match(/^.*new/)[0];
}
}
if(hash){
this.loadSectionByHashTag(hash);
}else{
var _840=this.activateAvailableTag(this.defaultTab);
("undefined"!=typeof content_items)?content_items.activate(_840):false;
this.showLoadMoreButton();
ProfileManager.prototype.applyMasonry(jq("#content_"+this.defaultTab+">.content_listing"));
}
jq("div.categoryTeaser").each(function(){
var _841=jq(this).find("img"),_842=_841.height(),_843=_841.width(),_844=300,_845=240,_846=_842/_843,_847=_845/_844,_848=_844,_849=_845;
if(_846<_847){
_848=_843/_842*_845;
}else{
if(_846>_847){
_849=_842/_843*_844;
}
}
_841.css({"position":"relative","height":_849+"px","width":_848+"px"});
var _84a=((_841.height()-_845)*0.4)*-1,_84b=((_841.width()-_844)/2)*-1;
_841.css({"top":_84a+"px","left":_84b+"px"});
});
};
ProfileManager.prototype.activateAvailableTag=function(_84c){
if(jq("#"+_84c+"_item").length>0){
return _84c;
}else{
var _84d=jq("#section_mycontent > div.content_items > ul.content_list:parent");
if(_84d.length>0){
return _84d.parent().attr("id").replace(/content_/,"");
}
}
};
ProfileManager.prototype.destroyMasonry=function(dest){
dest.masonry("destroy");
};
ProfileManager.prototype.applyMasonry=function(dest){
if(dest.hasClass("masonry")){
}else{
if(!dest.is(":visible")){
}else{
dest.masonry({itemSelector:"li",columnWidth:295,gutterWidth:10});
}
}
};
ProfileManager.prototype.showLoadMoreButton=function(){
var _84e=this.containerSectionDiv.find("> div:visible");
switch(this.currentSection){
case "mycontent":
var _84f=jq(".content_nav ul#tabs li.active");
if(_84f.length>0){
var _850=_84f.attr("id").replace(/_items_item/,"");
if(this.moreContent(_850)){
if(!_84e.find("div.content_items:visible").first().data("no_content")){
this.containerSectionDiv.find("> div:visible").append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}else{
this.loadMoreBtn.hide();
}
}
break;
case "following":
if(!_84e.find("#following_people").data("no_content")||!_84e.find("#following_topics").data("no_content")){
_84e.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
break;
default:
if(this.currentSection!="activity"){
var _851=this.getDivSection(this.currentSection);
if(!_851.data("no_content")){
_84e.append(this.loadMoreBtn);
this.loadMoreBtn.show();
}else{
this.loadMoreBtn.hide();
}
}
}
};
ProfileManager.prototype.loadSectionByHashTag=function(_852){
if(_852){
var _853=_852.replace("#",""),_854=this.defaultTab,_855="";
if(_853.match(/^slide/)){
jq("ul.profile_links > li.recent_images").trigger("click");
}else{
if(_853.match(/^mycontent_.*_hubs$/)||_853.match(/^mycontent_.*_forums$/)||_853.match(/^mycontent_.*_answers$/)){
var _856=_853.replace(/^mycontent_|_[a-z]+$/g,""),tab=_853.match(/[a-z]+$/),_857=jq("#"+tab+"_topic_menu li");
for(var i=0,l=_857.length;i<l;i++){
if(jq(_857[i]).attr("data-hash")==_856){
_854=tab+"_items";
_855=this.activateAvailableTag(_854);
("undefined"!=typeof content_items)?content_items.activate(_855):false;
jq(_857[i]).trigger("click");
break;
}
}
}else{
if(this.isValidSection(_853)){
jq("a[href=#"+this.currentSection+"]").parent().removeClass("active");
this.currentSection=_853;
if(this.currentSection=="email"){
this.currentSection="fanmail";
}
if(this.currentSection=="bio"){
if(jq("#read_bio").length>0){
jq("#read_bio").trigger("click");
}
}else{
this.loadSection(this.currentSection,function(){
if(_853=="email"){
if(this.profileContainer.data("send_email")=="1"){
this.openFancyBox("#email_to_user");
}
}
});
}
}
}
}
_855=this.activateAvailableTag(_854);
("undefined"!=typeof content_items)?content_items.activate(_855):false;
this.showLoadMoreButton();
}
};
ProfileManager.prototype.isValidSection=function(_858){
var _859=false;
for(i in this.allowedSections){
if(this.allowedSections[i]==_858){
_859=true;
break;
}
}
return _859;
};
ProfileManager.prototype.loadContentOnScroll=function(){
var _85a=jq(window),_85b=jq("#footer_wrap"),pos=_85a.scrollTop(),_85c=jq("#profile_header"),_85d=_85c.offset().top,_85e=jq(window).scrollTop()>=(jq(document).height()-jq(window).height()-30),_85f=jq("#profile_content_container > div:visible"),_860=(_85f.length>0)?_85f.attr("id").replace(/section_/,""):"",_861=[],_862=jq(".content_nav ul#tabs li.active"),_863="";
if(_860=="mycontent"){
if(_862.length==0){
return;
}
_863=_862.attr("id").replace(/_items_item/,"");
}
if(_860=="following"){
_861.push(jq("#following_people"));
_861.push(jq("#following_topics"));
}else{
if(this.getDivSection(_860)){
_861.push(this.getDivSection(_860));
}
}
_861.each(jq.proxy(function(_864){
if(!this.moreContent(_863)){
return;
}
if(!_864.data("no_content")){
if(_864.data("loading")){
return;
}
if((_85a.scrollTop()+_85a.height())>=(jq(document).height()-1)){
setTimeout(jQuery.proxy(function(){
this.loadContent(_864,_860,_863);
},this),300);
}
}
},this));
};
ProfileManager.prototype.moreContent=function(_865){
if((_865=="answers"&&this.moreRequest==="1")||(_865=="hubs"&&this.moreArticle==="1")||(_865=="topic"&&this.moreTopic==="1")){
return true;
}else{
if((_865=="answers"&&this.moreRequest==="0")||(_865=="hubs"&&this.moreArticle==="0")||(_865=="topic"&&this.moreTopic==="0")){
return false;
}
}
};
ProfileManager.prototype.loadContent=function(_866,_867,_868){
var _869=jq(".newprofile #show_only").data("categoryId")||"all";
var page=_866.data("next")||2;
this.loadMoreBtn.hide();
if(jq("#spinner_loading").length>0){
_86a=jq("#spinner_loading");
}else{
var _86b=jq("#footer_wrap").height();
var _86a=jq("<div/>",{"id":"spinner_loading",}).html(jq(this.spinnerDiv));
}
_86a.show();
_866.parent().append(_86a);
_866.parent().find("#spinner_loading > img.spinner").show();
if(_867=="following"){
_867=_866.attr("id");
}
_866.data("loading",true);
jq.get(this.profileContainer.data("loadMoreUrl"),{section:_867,userId:this.userId,activeTab:_868,categoryId:_869,page:page,ajax:1},jq.proxy(function(data,_86c,xhr){
_86a.hide();
if(_867=="fanmail"){
var _86d=jq(data.render);
jq.each(_86d,function(){
if(jq("#"+jq(this).attr("id")).length===0){
_866.append(this);
}
});
}else{
var _86e="";
jq.each(data.render,function(id,val){
if(_866.find("#"+id).length===0){
_86e+=val;
}
});
var _86f=false;
if(_867=="mycontent"){
var ul=_866.find("ul");
if(ul.hasClass("masonry")){
var _870=jq(_86e);
ul.append(_870).masonry("appended",_870);
}else{
_86f=true;
ul.append(_86e);
}
}else{
_866.append(_86e);
}
if(_86f){
ProfileManager.prototype.applyMasonry(ul);
}
}
if(data.more){
jq(document).data("no_content_all",false);
_866.data("next",page+1);
this.loadMoreBtn.show();
}else{
jq(document).data("no_content_all",true);
_866.data("no_content",true);
}
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
_866.data("loading",false);
},this),"json");
};
ProfileManager.prototype.dismissSimilarUser=function(self){
var _871=jq(this).parent(),_872=_871.attr("id").replace(/similar_user_/,""),_873=jq("div.similar_users_box"),_874=_873.find(".last_similar_user");
if(_874.length===0){
firstUserId=_873.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
}else{
firstUserId=_874.attr("id").replace(/similar_user_/,"");
}
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:self.userId,userId:_872,firstUserId:firstUserId,action:"dismiss"},success:jq.proxy(function(data){
_871.fadeOut("slow",function(){
if(_871.parent().find(".similar_user:visible").length==0){
_871.parent().parent().fadeOut("slow",function(){
jq(this).remove();
});
}
if(data.render!=""){
_873.find(".last_similar_user").each(function(){
jq(this).removeClass("last_similar_user");
});
_871.replaceWith(data.render);
jq("#"+jq(data.render).attr("id")).addClass("last_similar_user");
_873.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_873.find(".similar_user").length<3){
self.loadSingleSimilarUser();
}
}
jq(this).remove();
});
},this)});
};
ProfileManager.prototype.loadSingleSimilarUser=function(){
var _875=jq("div.similar_users_box"),_876=_875.find(".similar_user").last().attr("id").replace(/similar_user_/,"");
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{profileUserId:this.userId,firstUserId:_876},success:jq.proxy(function(data){
if(data.render!=""){
_875.find("div.content_box_i").append(data.render);
_875.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
}
if(_875.find(".similar_user").length<3){
this.loadSingleSimilarUser();
}
},this)});
};
ProfileManager.prototype.loadSimilarUsers=function(num){
jq.ajax({url:"/xml/profile/similar_users.php",type:"POST",dataType:"json",data:{userId:this.userId,num:num,action:"load"},success:jq.proxy(function(data){
var _877=jq("div.similar_users_box"),_878=_877.find(".similar_user").length;
if(data.render!=""){
_877.find("div.content_box_i").append(data.render);
_877.fadeIn();
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_877.find(".similar_user").length<3&&data.more){
this.loadSingleSimilarUser();
}
}else{
if(data.more){
this.loadSingleSimilarUser();
}
}
},this)});
};
ProfileManager.prototype.bindEvents=function(){
var self=this;
jq(document).bind("slideshow_loaded",function(){
var _879=new RegExp(window.location.hash.replace(/slide|#/g,""),"i");
jq.each(jq(".slideshow img"),function(){
if(_879.test(jq(this).attr("src"))){
var href=jq(this).parents(".content").attr("id");
jq("a[href=#"+href+"]").trigger("click");
}
});
});
self.loadMoreBtn.live("click",function(){
var _87a=jq("#profile_content_container > div:visible"),_87b=(_87a.length>0)?_87a.attr("id").replace(/section_/,""):"",_87c=[],_87d=jq(".content_nav ul#tabs li.active"),_87e="";
if(_87b=="mycontent"){
if(_87d.length==0){
return;
}
_87e=_87d.attr("id").replace(/_items_item/,"");
_87c.push(_87a.find("div.content_items:visible").first());
}else{
if(_87b=="followers"){
_87c.push(_87a.find("div").first());
}else{
if(_87b=="following"){
_87c.push(jq("#following_people"));
_87c.push(jq("#following_topics"));
}else{
if(_87b=="fanmail"){
_87c.push(_87a.find("#fanmail_content"));
}
}
}
}
_87c.each(function(_87f){
if(!_87f.data("no_content")){
if(_87f.data("loading")){
return;
}
self.loadContent(_87f,_87b,_87e);
}else{
self.loadMoreBtn.hide();
}
});
});
jq("#read_bio").live("click",function(e){
var _880=jq(this).closest("div");
e.preventDefault();
_880.html(jq("img.spinner").first());
_880.hide();
jq("#biography").show();
});
jq("span.x_icon").live("click",function(){
self.dismissSimilarUser.call(this,self);
});
this.loadSimilarUsers(3);
jq(window).bind("suggestion_followed",function(e,a){
self.dismissSimilarUser.call(a.closest(".similar_user_stats"),self);
});
jq(window).scroll(function(){
self.loadContentOnScroll.call(self);
});
jq(".profile_links li:not(.recent_images, .no_images)").click(function(e){
e.preventDefault();
window.location.hash=jq(this).find("a").attr("href");
var _881=jq(this).find("a").text();
jq.each(jq(this).parent().find("li"),function(){
jq(this).removeClass("active");
});
self.loadSection(_881);
});
var _882=jq(".newprofile div.content_nav ul.filter_by_topic"),_883=jq(".newprofile #show_only"),_884="#section_mycontent .content_items:visible",_885=jq("ul.filter_by_topic li"),_886=false;
_883.click(function(){
if(!_886){
var _887=jq(".content_nav #tabs .active").attr("id").replace(/_items_item/,"");
ulFilters=jq("#"+_887+"_topic_menu");
ulFilters.attr("tabindex",-1);
setTimeout(function(){
ulFilters.focus();
},0);
if(ulFilters.is(":visible")){
ulFilters.hide();
_883.find("span").removeClass("active");
}else{
ulFilters.show();
_883.find("span").addClass("active");
}
var _888=ulFilters.offset().left,_889=_883.offset().left,_88a=(_888-_889)+11;
ulFilters.css("right",parseFloat(ulFilters.css("right"))+_88a+"px");
_886=false;
}
});
_882.bind("blur",function(e){
_886=true;
jq(this).hide();
_883.find("span").removeClass("active");
setTimeout(function(){
_886=false;
},500);
});
_885.click(function(){
var _88b=jq(this).attr("data-id"),_88c=jq(".content_nav ul#tabs li.active");
if(_88c.length>0){
var _88d=jq(".content_nav ul#tabs li.active").attr("id").replace(/_items_item/,""),_88e=jq(this).text();
_88c.data("categoryId",_88b);
jq(_884).find("ul").html(jq(self.spinnerDiv));
jq(_884).data("loading",true);
loadCategoryContent("mycontent",_88b,_88d,function(res){
var _88f=jq(_884).find("ul");
_88f.find("img.spinner").hide();
ProfileManager.prototype.destroyMasonry(_88f);
jq.each(res.render,function(id,val){
if(_88f.find("#"+id).length===0){
_88f.append(val);
}
});
ProfileManager.prototype.applyMasonry(_88f);
jq(_884).removeData("next");
if(res.more){
jq(_884).data("no_content",false);
jq(document).data("no_content_all",false);
}else{
jq(document).data("no_content_all",true);
jq(_884).data("no_content",true);
}
_883.data("categoryId",_88b);
_883.data(getUrlHashTagVersion(_88e),_88b);
_883.html("<span></span><strong>Show</strong>: "+_88e);
jq(_884).data("loading",false);
loadHashTag(_88d);
self.showLoadMoreButton();
});
_883.attr("tabindex",-1);
_883.focus();
_882.hide();
_883.find("span").removeClass("active");
}
});
};
ProfileManager.prototype.openFancyBox=function(_890,_891){
var el=jq(_890);
jq.fancybox({"href":_890,onStart:function(){
el.show();
},onClosed:function(){
el.hide();
el.find("#success_message_email").hide();
el.find("#email").show();
el.find("h3").show();
},onComplete:function(){
el.css("overflow-x","hidden");
}});
};
ProfileManager.prototype.getDivSection=function(_892){
var _893,_894=jq("#section_"+_892);
if(_892=="mycontent"){
_893=_894.find("div.content_items:visible").first();
}else{
if(_892=="followers"){
_893=_894.find("div").first();
}else{
if(_892=="fanmail"){
_893=_894.find("#fanmail_content");
}
}
}
return _893;
};
ProfileManager.prototype.loadSection=function(_895,_896){
this.currentSection=_895.replace(/\s/,"").toLowerCase();
if(this.currentSection=="myactivity"){
this.currentSection="activity";
}
var _897="section_"+this.currentSection,isCr=typeof cr,_898=jq("#profile_content_container"),_899=_898.offset().top,_89a=jq(this.spinnerDiv);
var _89b=jq("a[href=#"+this.currentSection+"]");
if(_89b.length>0){
jq("a[href=#"+this.currentSection+"]").parent().addClass("active");
}
if(_897!="section_mycontent"&&jq("#teaser").length>0&&isCr!="undefined"){
cr.pause();
}
jq("div[id^=section_]").hide();
if(jq("#"+_897).length>0){
jq("#"+_897).show();
if(_897=="section_mycontent"){
ProfileManager.prototype.applyMasonry(jq("#content_hubs_items > .content_listing"));
}
this.showLoadMoreButton();
}else{
var _89c=_898.find("img.spinner");
if(_89c.length==0){
_898.append(_89a);
}
_89c.show();
jq.post("/xml/profile/profile_section.php",{section:this.currentSection,userId:this.userId},jq.proxy(function(res){
var data=jQuery.parseJSON(res),_89d;
_898.find(".spinner").hide();
if(data.render){
_89e.call(this,data);
}else{
jq.each(data,jQuery.proxy(function(i,el){
_89e.call(this,el);
},this));
}
function _89e(el){
if(jq("#"+_897).length===0){
_89d=jq("<div/>",{id:_897,"class":"psection"});
}else{
_89d=jq("#"+_897);
}
_89d.append(el.render).appendTo("#profile_content_container");
if(!el.more&&this.currentSection!="activity"){
if(this.currentSection==="following"){
_89d.find("#"+el.section).data("no_content",true);
}else{
this.getDivSection(this.currentSection).data("no_content",true);
}
}
};
jq(document).trigger("update_follow_buttons");
updateFollowButtons();
if(_897=="section_fanmail"){
var _89f=jq("#email_to_user");
if(_89f.length>0){
jq(".lightbox").fancybox({onStart:function(){
window.location.hash="#email";
_89f.show();
},onClosed:function(){
_89f.hide();
_89f.find("#success_message_email").hide();
_89f.find("#email").show();
_89f.find("h3").show();
},onComplete:function(e){
_89f.css("overflow-x","hidden");
}});
window.prof=new hpFormHandler("email");
prof.submitMode=false;
prof.submitUri="/xml/sendmail.php";
prof.errorId="emailFormErrors";
prof.scrollToErrors=true;
prof.handleResponse=function(req){
try{
eval(req.responseText);
}
catch(e){
}
if(valid==1){
jq("#emailFormErrors").html("");
var _8a0=jq("#success_message_email");
_8a0.html(messaging);
_8a0.siblings("#email").fadeOut("slow",function(){
jq("#email_to_user h3").hide();
_8a0.show();
});
jq("#yourname").val("");
jq("#subject").val("");
jq("#message").val("");
Recaptcha.reload();
}else{
jq("#emailFormErrors").html(errorStr);
jq("#emailFormErrors").show();
if(hipFailure){
Recaptcha.reload();
}
}
return false;
};
fetchRecaptcha("email_article_captcha");
prof.useEffects=false;
prof.setValidators({toemail:prof.validateEmailList.bind(prof),youremail:prof.validateEmail.bind(prof),yourname:prof.validateEmailName.bind(prof)},{toemail:function(ele){
prof.validateMandatory(ele,"Please enter at least one email recipient.");
},youremail:function(ele){
prof.validateMandatory(ele,"Please enter your email address.");
},yourname:function(ele){
prof.validateMandatory(ele,"Please enter your name.");
},message:function(ele){
prof.testForError($F(ele).replace(/\s+/g,"").length<30,prof,"The content of your message is too short.");
}});
prof.observe();
}
if(jq("#new_fanmail").length>0){
var com=new hpFormHandler("new_fanmail");
com.handleResponse=function(req){
var _8a1=$("fanmailadd");
Element.update(_8a1,req.responseText);
};
com.setValidators({},{comText_fanmail:function(ele){
com.validateNot(ele,"Enter some praise","Please enter your endorsement.");
}});
com.errorHeader="";
com.submitUri="/xml/comment.php";
com.nextUri=null;
eval("com_"+this.loggedInUserId+"=com");
com.observe();
makeExpandable("comText_fanmail","Tell the world why you like "+this.userName+".");
makeGrowable("comText_fanmail",58,16,100);
}
}
this.showLoadMoreButton();
(_896!=undefined)?_896.call(this):false;
},this));
}
};

