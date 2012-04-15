/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * toolbox/toolbox.expose.js
 * toolbox/toolbox.flashembed.js
 * toolbox/toolbox.mousewheel.js
 * tooltip/tooltip.js
 * tooltip/tooltip.slide.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * jquery.event.wheel.js - rev 1 
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 * 
 * -----
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).bind("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).bind("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).unbind("click."+m).unbind("keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:f.css("top"),left:f.css("left"),width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),e.size>1&&(e.circular=!1),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return n.add(o)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.find(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(e.size,a)},prev:function(a){return f.move(-e.size,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children().last().before(b),h.children().first().replaceWith(b.clone().addClass(e.clonedClass))):(h.append(b),o.removeClass("disabled")),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}});var m=b.parents().add(b).filter(function(){if(a(this).css("display")==="none")return!0});m.length?(m.show(),f.seekTo(0,0,function(){}),m.hide()):f.seekTo(0,0,function(){})}var n=c(b,e.prev).click(function(a){a.stopPropagation(),f.prev()}),o=c(b,e.next).click(function(a){a.stopPropagation(),f.next()});e.circular||(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(n.toggleClass(e.disabledClass,b<=0),o.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||n.addClass(e.disabledClass)),f.getSize()<2&&n.add(o).addClass(e.disabledClass),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var p={};h[0].ontouchstart=function(a){var b=a.touches[0];p.x=b.clientX,p.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=p.x-b.clientX,d=p.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(!(!e.keyboard||b.altKey||b.ctrlKey||b.metaKey||a(b.target).is(":input"))){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.autoscroll={conf:{autoplay:!0,interval:3e3,autopause:!0}},a.fn.autoscroll=function(c){typeof c=="number"&&(c={interval:c});var d=a.extend({},b.autoscroll.conf,c),e;this.each(function(){var b=a(this).data("scrollable"),c=b.getRoot(),f,g=!1;function h(){f=setTimeout(function(){b.next()},d.interval)}b&&(e=b),b.play=function(){f||(g=!1,c.bind("onSeek",h),h())},b.pause=function(){f=clearTimeout(f),c.unbind("onSeek",h)},b.resume=function(){g||b.play()},b.stop=function(){g=!0,b.pause()},d.autopause&&c.add(b.getNaviButtons()).hover(b.pause,b.resume),d.autoplay&&b.play()});return d.api?e:this}})(jQuery);
(function(a){var b=a.tools.scrollable;b.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:!1,idPrefix:null,history:!1}};function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}a.fn.navigator=function(d){typeof d=="string"&&(d={navi:d}),d=a.extend({},b.navigator.conf,d);var e;this.each(function(){var b=a(this).data("scrollable"),f=d.navi.jquery?d.navi:c(b.getRoot(),d.navi),g=b.getNaviButtons(),h=d.activeClass,i=d.history&&history.pushState,j=b.getConf().size;b&&(e=b),b.getNaviButtons=function(){return g.add(f)},i&&(history.pushState({i:0}),a(window).bind("popstate",function(a){var c=a.originalEvent.state;c&&b.seekTo(c.i)}));function k(a,c,d){b.seekTo(c),d.preventDefault(),i&&history.pushState({i:c})}function l(){return f.find(d.naviItem||"> *")}function m(b){var c=a("<"+(d.naviItem||"a")+"/>").click(function(c){k(a(this),b,c)});b===0&&c.addClass(h),d.indexed&&c.text(b+1),d.idPrefix&&c.attr("id",d.idPrefix+b);return c.appendTo(f)}l().length?l().each(function(b){a(this).click(function(c){k(a(this),b,c)})}):a.each(b.getItems(),function(a){a%j==0&&m(a)}),b.onBeforeSeek(function(a,b){setTimeout(function(){if(!a.isDefaultPrevented()){var c=b/j,d=l().eq(c);d.length&&l().removeClass(h).eq(c).addClass(h)}},1)}),b.onAddItem(function(a,c){var d=b.getItems().index(c);d%j==0&&m(d)})});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){var c=this.getConf();this.getPanes().slideUp(c.slideUpSpeed),this.getPanes().eq(a).slideDown(c.slideDownSpeed,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c,d;a.tools.tabs.addEffect("horizontal",function(b,e){if(!c){var f=this.getPanes().eq(b),g=this.getCurrentPane();d||(d=this.getPanes().eq(0).width()),c=!0,f.show(),g.animate({width:0},{step:function(a){f.css("width",d-a)},complete:function(){a(this).hide(),e.call(),c=!1}}),g.length||(e.call(),c=!1)}});function e(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){j=c,d.type="onClick",g.trigger(d,[c])}),h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var d=this.data("tabs");d&&(d.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){d=new e(a(this),b,c),a(this).data("tabs",d)});return c.api?d:this}})(jQuery);
(function(a){var b;b=a.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:!1,autopause:!0,interval:3e3,clickable:!0,api:!1}};function c(b,c){var d=this,e=b.add(this),f=b.data("tabs"),g,h=!0;function i(c){var d=a(c);return d.length<2?d:b.parent().find(c)}var j=i(c.next).click(function(){f.next()}),k=i(c.prev).click(function(){f.prev()});function l(){g=setTimeout(function(){f.next()},c.interval)}a.extend(d,{getTabs:function(){return f},getConf:function(){return c},play:function(){if(g)return d;var b=a.Event("onBeforePlay");e.trigger(b);if(b.isDefaultPrevented())return d;h=!1,e.trigger("onPlay"),e.bind("onClick",l),l();return d},pause:function(){if(!g)return d;var b=a.Event("onBeforePause");e.trigger(b);if(b.isDefaultPrevented())return d;g=clearTimeout(g),e.trigger("onPause"),e.unbind("onClick",l);return d},resume:function(){h||d.play()},stop:function(){d.pause(),h=!0}}),a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(b,e){a.isFunction(c[e])&&a(d).bind(e,c[e]),d[e]=function(b){return a(d).bind(e,b)}}),c.autopause&&f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause,d.resume),c.autoplay&&d.play(),c.clickable&&f.getPanes().click(function(){f.next()});if(!f.getConf().rotate){var m=c.disabledClass;f.getIndex()||k.addClass(m),f.onBeforeClick(function(a,b){k.toggleClass(m,!b),j.toggleClass(m,b==f.getTabs().length-1)})}}a.fn.slideshow=function(d){var e=this.data("slideshow");if(e)return e;d=a.extend({},b.conf,d),this.each(function(){e=new c(a(this),d),a(this).data("slideshow",e)});return d.api?e:this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).bind("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.bind("click.mask",function(b){a.mask.close(b)}),a(window).bind("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).unbind("keydown.mask"),e.unbind("click.mask"),a(window).unbind("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(){var a=document.all,b="http://www.adobe.com/go/getflashplayer",c=typeof jQuery=="function",d=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,e={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:!0,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:!1,cachebusting:!1};window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){},__flash_savedUnloadHandler=function(){}});function f(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function g(a,b){var c=[];for(var d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d]));return c}window.flashembed=function(a,b,c){typeof a=="string"&&(a=document.getElementById(a.replace("#","")));if(a){typeof b=="string"&&(b={src:b});return new j(a,f(f({},e),b),c)}};var h=f(window.flashembed,{conf:e,getVersion:function(){var a,b;try{b=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(c){try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a&&a.GetVariable("$version")}catch(e){try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b=a&&a.GetVariable("$version")}catch(f){}}}b=d.exec(b);return b?[b[1],b[3]]:[0,0]},asString:function(a){if(a===null||a===undefined)return null;var b=typeof a;b=="object"&&a.push&&(b="array");switch(b){case"string":a=a.replace(new RegExp("([\"\\\\])","g"),"\\$1"),a=a.replace(/^\s?(\d+\.?\d*)%/,"$1pct");return"\""+a+"\"";case"array":return"["+g(a,function(a){return h.asString(a)}).join(",")+"]";case"function":return"\"function()\"";case"object":var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push("\""+d+"\":"+h.asString(a[d]));return"{"+c.join(",")+"}"}return String(a).replace(/\s/g," ").replace(/\'/g,"\"")},getHTML:function(b,c){b=f({},b);var d="<object width=\""+b.width+"\" height=\""+b.height+"\" id=\""+b.id+"\" name=\""+b.id+"\"";b.cachebusting&&(b.src+=(b.src.indexOf("?")!=-1?"&":"?")+Math.random()),b.w3c||!a?d+=" data=\""+b.src+"\" type=\"application/x-shockwave-flash\"":d+=" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"",d+=">";if(b.w3c||a)d+="<param name=\"movie\" value=\""+b.src+"\" />";b.width=b.height=b.id=b.w3c=b.src=null,b.onFail=b.version=b.expressInstall=null;for(var e in b)b[e]&&(d+="<param name=\""+e+"\" value=\""+b[e]+"\" />");var g="";if(c){for(var i in c)if(c[i]){var j=c[i];g+=i+"="+encodeURIComponent(/function|object/.test(typeof j)?h.asString(j):j)+"&"}g=g.slice(0,-1),d+="<param name=\"flashvars\" value='"+g+"' />"}d+="</object>";return d},isSupported:function(a){return i[0]>a[0]||i[0]==a[0]&&i[1]>=a[1]}}),i=h.getVersion();function j(c,d,e){if(h.isSupported(d.version))c.innerHTML=h.getHTML(d,e);else if(d.expressInstall&&h.isSupported([6,65]))c.innerHTML=h.getHTML(f(d,{src:d.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title});else{c.innerHTML.replace(/\s/g,"")||(c.innerHTML="<h2>Flash version "+d.version+" or greater is required</h2><h3>"+(i[0]>0?"Your version is "+i:"You have no flash plugin installed")+"</h3>"+(c.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+b+"'>here</a></p>"),c.tagName=="A"&&(c.onclick=function(){location.href=b}));if(d.onFail){var g=d.onFail.call(this);typeof g=="string"&&(c.innerHTML=g)}}a&&(window[d.id]=document.getElementById(d.id)),f(this,{getRoot:function(){return c},getOptions:function(){return d},getConf:function(){return e},getApi:function(){return c.firstChild}})}c&&(jQuery.tools=jQuery.tools||{version:"v1.2.6"},jQuery.tools.flashembed={conf:e},jQuery.fn.flashembed=function(a,b){return this.each(function(){jQuery(this).data("flashembed",flashembed(this,a,b))})})})();
(function(a){a.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)},a.event.special.wheel={setup:function(){a.event.add(this,b,c,{})},teardown:function(){a.event.remove(this,b,c)}};var b=a.browser.mozilla?"DOMMouseScroll"+(a.browser.version<"1.9"?" mousemove":""):"mousewheel";function c(b){switch(b.type){case"mousemove":return a.extend(b.data,{clientX:b.clientX,clientY:b.clientY,pageX:b.pageX,pageY:b.pageY});case"DOMMouseScroll":a.extend(b,b.data),b.delta=-b.detail/3;break;case"mousewheel":b.delta=b.wheelDelta/120}b.type="wheel";return a.event.handle.call(this,b,b.delta)}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.bind(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).bind(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.unbind(p[0]).bind(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.unbind(p[1]).bind(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.tooltip;a.extend(b.conf,{direction:"up",bounce:!1,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!a.browser.msie});var c={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};b.addEffect("slide",function(a){var b=this.getConf(),d=this.getTip(),e=b.slideFade?{opacity:b.opacity}:{},f=c[b.direction]||c.up;e[f[1]]=f[0]+"="+b.slideOffset,b.slideFade&&d.css({opacity:0}),d.show().animate(e,b.slideInSpeed,a)},function(b){var d=this.getConf(),e=d.slideOffset,f=d.slideFade?{opacity:0}:{},g=c[d.direction]||c.up,h=""+g[0];d.bounce&&(h=h=="+"?"-":"+"),f[g[1]]=h+"="+e,this.getTip().animate(f,d.slideOutSpeed,function(){a(this).hide(),b.call()})})})(jQuery);



// Following is PwC Media Player library
// v10.2 Sept 23 2011
// (c) 2011 PwC

function thisMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
     }
function PauseMedia(value) {
         thisMovie(value).MediaController('pause');
     }
function PlayMedia(value) {
	thisMovie(value).MediaController('play');
}

function PauseAllMedia() {
	$('object').each(function(){
		var tmp = $(this).attr("id");
		thisMovie(tmp).MediaController('pause');
	});


}
function PlayAllMedia() {
	$('object').each(function(){
		var tmp = $(this).attr("id");
		thisMovie(tmp).MediaController('play');
	});


}

function CloseOverlay(){
		$(".media-overlay").each(function() {
					$(this).overlay().close();
			});
};
function ShowThumb(ddd,bool){
		
		if (bool)
		{
			CloseOverlay();
			$(window.location).attr('href',$(ddd).attr("src")); //if its an overlay
		} else
		{
				
			thumbnailHtml		= "<a href='"+ $(ddd).attr("src")+"'><img style='background-color: rgb(0,0,0)' src='"+$(ddd).attr("poster")+"' width='"+$(ddd).attr("width")+"' height='"+$(ddd).attr("height")+"' alt='Play media' /><img style='position:relative;top:-24px;left:0px;' src='"+$(ddd).attr("media-playbutton")+"' alt='Play button' /></a>";
			
			var temp = $(ddd).parent();
			$(temp).html(thumbnailHtml);
		}
};
//Create embedded media plugin

(function($){   
jQuery.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return jQuery.getUrlVars()[name];
  }
});

	

  $.fn.embedMedia = function(t) {  
  
  //Determine if media should use UK's servers
	var _mediaPageURL = window.location.href.toString();
	var _mediaURLPrefix = "http://download.pwc.com";
	if (_mediaPageURL.search(".co.uk") >=0 				|| 
		_mediaPageURL.search("/uk/en") >=0 				||
		_mediaPageURL.search("/en_UK/uk") >=0 			||
		_mediaPageURL.search("/en_uk/uk") >=0 )
	{
		_mediaURLPrefix = "http://pwc-uk.edgesuite.net/pwc";
	}
	if (_mediaPageURL.search(".co.uk/careers") >=0 				|| 
		_mediaPageURL.search("/uk/en/careers") >=0 				||
		_mediaPageURL.search("/en_UK/uk/careers") >=0 			||
		_mediaPageURL.search("/en_uk/uk/careers") >=0 )
	{
		_mediaURLPrefix = "http://download.pwc.com";
	}
  
  	//PATH TO ASSETS
	var mediaSwfPath 	= "";
	var imagePath		= "";
	var mediaSwfPath 	= "/gx/en/assets/media/";
	var imagePath		= "/en_GX/webadmin/assets/image/";
	
	
  	
		//START each media-embed
			
		//DEFAULT VALUES DO NOT EDIT
		var mediaFlashObjectId		= "flash_"+t;		//The identifier if this is a flash object
		var mediaSrc 				= ""; 		//relative source of media (audio/video/image)
		var mediaTitle 				= ""; 		//Basic title to display below overlay
		var mediaWidth				= "540"; 	//width of media
		var mediaHeight				= "300"; 	//height of media 		
		var mediaTrack				= "true"; 	//webtrends
		var mediaHd					= "false";	//HD video - string gets passed to flash player
		var mediaMobile				= false;	//mobile backup video
		var mediaPoster				= "";		//Still image for audio and HTML5 player
		var mediaFlashvars			= "";		//Used for regular flash movies 
		var mediaStreaming 			 = "false";   //Override default streaming behavior
		var mediaColor				= "orange"; //one of eight choices
		var mediaAltFlashID			= null; 		//a div section used for alternate content in case no flash
		var mediaActivateNow		= false;			//start video immediately or not
		var mediaCuepoints			= "";		//relative path to a cuepoints xml file
		
		if ($(this).attr("media-objectid"))		{ 	mediaFlashObjectId 		= $(this).attr("media-objectid"); 		} 	
		if ($(this).attr("media-title")) 		{ 	mediaTitle 		= $(this).attr("media-title"); 		} 		
		if ($(this).attr("media-src"))			{	mediaSrc 		= $(this).attr("media-src");		} 
		if ($(this).attr("media-width")) 		{	mediaWidth 		= $(this).attr("media-width");		}
		if ($(this).attr("media-height"))	 	{	mediaHeight 	= $(this).attr("media-height");		}
		if ($(this).attr("media-track")) 		{	mediaTrack 		= $(this).attr("media-track");		}
		if ($(this).attr("media-poster")) 		{	mediaPoster 	= $(this).attr("media-poster");		} 
		if ($(this).attr("media-hd")) 			{	mediaHd 		= $(this).attr("media-hd"); 		} 
		if ( ($(this).attr("media-mobile")) &&  ($(this).attr("media-mobile") == "true") ) {	mediaMobile	= true;	} 
		if ($(this).attr("media-flashvars")) 	{ 	mediaFlashvars	= "?" + $(this).attr("media-flashvars"); 	} 
		if ($(this).attr("media-streaming")) 	{ 	mediaStreaming	= $(this).attr("media-streaming"); 	} 
		if ($(this).attr("media-color")) 		{ 	mediaColor		= $(this).attr("media-color"); 	} 
		if ($(this).attr("media-alternate-id")) { 	mediaAltFlashID	= $(this).attr("media-alternate-id"); 	} 
		if ( ($(this).attr("media-activatenow")) && ($(this).attr("media-activatenow") == "true") ) 	{ 	mediaActivateNow	= true; 	} 
		if ($(this).attr("media-cuepoints")) 	{ 	mediaCuepoints	= $(this).attr("media-cuepoints"); 	} 
		//reformat mediatitle
		var reformattedMediaTitle = mediaTitle.replace(/[\'\?]/g, "");
		//hide the alternate-id
		(mediaAltFlashID) ? $(mediaAltFlashID).css("display", "none") : undefined;
		//look for link transform
		var hasLinkTransform = false;
		var testString = new RegExp(/\?linktransform=no/ig);
		testString.test(document.URL) ? hasLinkTransform = true : undefined;
			
		//check for file extension
		var mediaType 		= "";
		var fileExtension 	= "";
		var buttonSrc		= null; 
		fileExtension		= mediaSrc.substring(mediaSrc.lastIndexOf(".") + 1,mediaSrc.length).toLowerCase();
		if ( (fileExtension == "jpeg") || (fileExtension == "jpg") || (fileExtension == "gif") || (fileExtension == "png")) {
			mediaType 		= "image";
		} else if ( fileExtension == "mp3" ) {
			buttonSrc		= "media-audio-button.jpg";
			mediaType 		= "audio";
			hasLinkTransform ? mediaSrc = mediaSrc.substring(3,mediaSrc.length) : undefined;
		} else if ( fileExtension == "swf" ) {
			mediaType		= "flash";
		} else {
			mediaType	 	= "video";
			buttonSrc 		= "media-play-button.jpg";
			hasLinkTransform ? mediaSrc = mediaSrc.substring(3,mediaSrc.length) : undefined;
		}
		
		//Set mobile version flag
		var showmobileVersion = false;
		if ((mediaType == "audio") && (flashembed.isSupported([10,0]) == false)) {
			showmobileVersion = true;
		} else if ( (mediaType == "video") && (flashembed.isSupported([10,0]) == false) && (mediaMobile)) {
			showmobileVersion = true;
		}
					 
		if ((showmobileVersion == true)) {  //START mobile
			
			var newHtml = "";
			//Create HTML5 player with plain video link as fallback
			switch (mediaType) {
				case "video":
					newHtml 	= "<video poster='"+mediaPoster+"' media-playbutton='"+imagePath+buttonSrc+"' src='"+_mediaURLPrefix + mediaSrc+".mp4' controls height='"+mediaHeight+"' width='"+mediaWidth+"' onerror='ShowThumb($(this),false);'><a href='" + _mediaURLPrefix + mediaSrc+".mp4'><img style='background-color: rgb(0,0,0)' src='"+mediaPoster+"' width='"+mediaWidth+"' height='"+mediaHeight+"' alt='Play media' /><img style='position:relative;top:-24px;left:0px;' src='"+imagePath+buttonSrc+"' alt='Play button' /></a></video>"
				break;
				
				case "audio":
					newHtml	= "<a href='" + _mediaURLPrefix + mediaSrc+"'><img style='background-color: rgb(0,0,0)' src='"+mediaPoster+"' width='"+mediaWidth+"' height='"+mediaHeight+"' alt='Play media' /><img style='position:relative;top:0px;left:-"+mediaWidth+"px;' src='"+imagePath+buttonSrc+"' alt='Play button' /></a>"
		
					
				break;
					
			}
			$(this).html(newHtml);
			
		} else {
			//START Can show flash
			if (flashembed.isSupported([10,0])){ 
			
				//START flashembed generic flash
				if ( mediaType == "flash" ){
					
					$(this).flashembed({
						//params
						src					: mediaSrc + mediaFlashvars, 
						version				: [10, 60], //requires version 10.1
						wmode				: 'transparent',
						allowscriptaccess	: 'always',
						allowfullscreen		: 'true',
						bgcolor				: '#FFFFFF',
						expressInstall		: mediaSwfPath+'expressinstall.swf',
						width				: mediaWidth,
						height				: mediaHeight,
						id					: mediaFlashObjectId
						});
						
						 //END flashembed generic player
					//$(this).html(regularFlashHtml);
					
				}  else {
					
					$(this).flashembed({
						//params
						src					: mediaSwfPath+'pwcMedia.swf', 
						
						version				: [10, 60], //requires version 10.1
						expressInstall		: mediaSwfPath+'expressinstall.swf',
						wmode				: 'transparent',
						allowscriptaccess	: 'always',
						allowfullscreen		: 'true',
						width				: mediaWidth,
						height				: mediaHeight,
						id					: mediaFlashObjectId
						}, {
						media				: mediaSrc,
						color				: mediaColor,
						player				: mediaSwfPath+'pwcMediaPlayer.swf',
						instantplay			: mediaActivateNow,
						hd					: mediaHd,
						videowidth			: mediaWidth,
						videoheight			: mediaHeight,
						webtrends			: mediaTrack,
						title				: reformattedMediaTitle,
						poster				: mediaPoster,
						stream 				: mediaStreaming,
						cuepoints			: mediaCuepoints
					}); //END flashembed media player
					
				//	$(this).html(flashMediaPlayerHtml);
					
				} //END flashembed generic flash ELSE
				
				
			} else //END flash is supported
			
			{	//BEGIN alternate flash content
				if (mediaAltFlashID) {
					
					$(this).html($("#"+mediaAltFlashID).html());
				} else {
					var altmediacontent = "<div align='center' style='padding:10px;' ><p>You need Adobe Flash to view this.</p><a href='http://get.adobe.com/flashplayer/' target='_blank' ><img src='"+imagePath+"media-get-flash.jpg' /></a></div>";
					$(this).html(altmediacontent);
				}
				
			}  //END alternate flash content
					
		} //END mobile or flash
	  
		
  };
})(jQuery);

 
 
 
 
 
 
 
 //Overlay method
  (function($){  
  $.fn.overlayMedia = function(p) {  
  
  //Determine if media should use UK's servers
	var _mediaPageURL = window.location.href.toString();
	var _mediaURLPrefix = "http://download.pwc.com";
	if (_mediaPageURL.search(".co.uk") >=0 				|| 
		_mediaPageURL.search("/uk/en") >=0 				||
		_mediaPageURL.search("/en_UK/uk") >=0 			||
		_mediaPageURL.search("/en_uk/uk") >=0 )
	{
		_mediaURLPrefix = "http://pwc-uk.edgesuite.net/pwc";
	}
	if (_mediaPageURL.search(".co.uk/careers") >=0 				|| 
		_mediaPageURL.search("/uk/en/careers") >=0 				||
		_mediaPageURL.search("/en_UK/uk/careers") >=0 			||
		_mediaPageURL.search("/en_uk/uk/careers") >=0 )
	{
		_mediaURLPrefix = "http://download.pwc.com";
	}
  
  	 //PATH TO ASSETS
	var mediaSwfPath 	= "";
	var imagePath		= "";
	var mediaSwfPath 	= "/gx/en/assets/media/";
	var imagePath		= "/en_GX/webadmin/assets/image/";
	
		//START each media-overlay
		if ($("#pwc-media-overlay").length){ } else	
		{
			$("<div class='expanding_overlay' id='pwc-media-overlay'><div id='media-player'> </div><div id='media-details' style='font-size:small' ></div></div>").appendTo('body'); 
		}
		
		
		//DEFAULT VALUES DO NOT EDIT
		var mediaFlashObjectId		= "flash_"+p;		//The identifier if this is a flash object
		var mediaSrc 				= ""; 		//relative source of media (audio/video/image)
		var mediaTitle 				= ""; 		//Basic title to display below overlay
		var mediaWidth				= "540"; 	//width of media
		var mediaHeight				= "300"; 	//height of media 		
		var mediaTrack				= "true"; 	//webtrends
		var mediaDetailsId			= null;		//Div ID for raw HTML content in lieu of title
		var mediaHd					= "false";	//HD video - string gets passed to flash player
		var mediaMobile				= false;	//mobile backup video
		var mediaPoster				= "";		//Still image for audio and HTML5 player
		var mediaFlashvars			= "";		//Used for regular flash movies 
		var mediaStreaming  		= "false";   //Override default streaming behavior
		var mediaActivateNow		= false;	//Immediately open the modal or not (when created dynamically)
		var mediaColor				= "orange"; //Color family (8 choices)
		var mediaAltFlashID			= null; 		//a div section used for alternate content in case no flash
		var mediaCuepoints			= "";		//relative path to a cuepoints xml file
		var mediaType				= "";		//added Oct 17 2011- force a media type (helpful with external ajax)
		
		if ($(this).attr("media-objectid"))		{ 	mediaFlashObjectId 		= $(this).attr("media-objectid"); 		} 	
		if ($(this).attr("media-title")) 		{ 	mediaTitle 		= $(this).attr("media-title"); 		} 		
		if ($(this).attr("media-src"))			{	mediaSrc 		= $(this).attr("media-src");		} 
		if ($(this).attr("media-width")) 		{	mediaWidth 		= $(this).attr("media-width");		}
		if ($(this).attr("media-height"))	 	{	mediaHeight 	= $(this).attr("media-height");		}
		if ($(this).attr("media-track")) 		{	mediaTrack 		= $(this).attr("media-track");		}
		if ($(this).attr("media-poster")) 		{	mediaPoster 	= $(this).attr("media-poster");		} 		
		if ($(this).attr("media-details-id")) 	{	mediaDetailsId 	= $(this).attr("media-details-id");	}
		if ($(this).attr("media-hd")) 			{	mediaHd 		= $(this).attr("media-hd"); 		} 
		if ( ($(this).attr("media-mobile")) &&  ($(this).attr("media-mobile") == "true") ) {	mediaMobile	= true;	} 
		if ($(this).attr("media-flashvars")) 	{ 	mediaFlashvars	= "?" + $(this).attr("media-flashvars"); 	} 
		if ($(this).attr("media-streaming")) 	{ 	mediaStreaming	= $(this).attr("media-streaming"); 	} 
		if ($(this).attr("media-color")) 		{ 	mediaColor		= $(this).attr("media-color"); 	} 
		if ( ($(this).attr("media-activatenow")) && ($(this).attr("media-activatenow") == "true") ) 	{ 	mediaActivateNow	= true; 	} 
		if ($(this).attr("media-alternate-id")) { 	mediaAltFlashID	= $(this).attr("media-alternate-id"); 	} 
		if ($(this).attr("media-cuepoints")) 	{ 	mediaCuepoints	= $(this).attr("media-cuepoints"); 	} 
		if ($(this).attr("media-type")) 		{ 	mediaType		= $(this).attr("media-type"); 		} 
		//reformat mediatitle
		var reformattedMediaTitle = mediaTitle.replace(/[\'\?]/g, "");
		//hide the alternate-id
		(mediaAltFlashID) ? $("#"+mediaAltFlashID).css("display", "none") : undefined;
		//hide details ID if it exists
		(mediaDetailsId) ? $("#"+mediaDetailsId).css("display", "none") : undefined;
		//look for link transform
		var hasLinkTransform = false;
		var testString = new RegExp(/\?linktransform=no/ig);
		testString.test(document.URL) ? hasLinkTransform = true : undefined;
  		
				
		//check for file extension
		var fileExtension 	= "";
		fileExtension		= mediaSrc.substring(mediaSrc.lastIndexOf(".") + 1,mediaSrc.length).toLowerCase();
		if (mediaType != "") {
			//use the user-assigned mediaType
		} else if (mediaSrc.charAt(0) == "#") {
			mediaType 		= "html";
		} else if ( (fileExtension == "jhtml") || (fileExtension == "html") || (fileExtension == "htm") ) {
			mediaType 		= "external";
			hasLinkTransform ? mediaSrc += "?linktransform=no" : undefined;
		}else if ( (fileExtension == "jpeg") || (fileExtension == "jpg") || (fileExtension == "gif") || (fileExtension == "png")) {
			mediaType 		= "image";
		} else if ( fileExtension == "mp3" ) {
			mediaType 		= "audio";			
			hasLinkTransform ? mediaSrc = mediaSrc.substring(3,mediaSrc.length) : undefined;			
		} else if ( fileExtension == "swf" ) {
			mediaType		= "flash";
		} else {
			mediaType 	= "video";
			hasLinkTransform ? mediaSrc = mediaSrc.substring(3,mediaSrc.length) : undefined;
		}
		
		
		//Set mobile version flag
		var showmobileVersion = false;
		if ((mediaType == "audio") && (flashembed.isSupported([10,0]) == false)) {
			showmobileVersion = true;
		} else if ( (mediaType == "video") && (flashembed.isSupported([10,0]) == false) && (mediaMobile)) {
			showmobileVersion = true;
		}
		
		if ((showmobileVersion) && (mediaType == "audio")) { //if audio - jump right to audio
			
			$(this).click(function(){
				//redirect to media
				document.location = _mediaURLPrefix + mediaSrc;

			});
	
		} else { //create standard overlay
		
			$(this).overlay({  //START overlay
			
				target					: '#pwc-media-overlay',
				effect 					: 'apple',
				speed					: 'normal',
				closeOnClick 			: true,
				closeonEscape			: true,
				fadeInSpeed				: 0,
				fadeOutSpeed			: 0,
				zIndex					: 20000,	
				fixed					: false,
				top						: '8%',						
				mask					: {
					color				: '#ffffff',
					loadSpeed			: 200,
					opacity				: 0.85
				},
				load					: mediaActivateNow,
				onClose					: function() {
						//reset some styles 
						if (mediaType == "html") {
							//if it's inline we move the div back to body DOM and hide it
							$(mediaSrc).css('display','none');
							$(mediaSrc).appendTo("body");
							
						}
						$("#media-player").css("background-color","");
						$("#media-player").css("border","");
						
						$("#media-player").empty();
										},
				onLoad					: function() {
						//hide the background image for odd sizes
 
						if ( (mediaType == "external") || (mediaType == "html") || (mediaType == "image") || (mediaType == "flash") || (mediaHeight == "45" ) ) {
							$("img[src*=media-transparent]").attr("id","media-transparent-background"); //assign ID to transparent background
							$("#media-transparent-background").fadeOut('fast');
							
						}
						
					
										},
				onBeforeClose			: function() {
					
					
										},
				onBeforeLoad			: function() { //START onBeforeLoad of overlay
					
          				
						this.getOverlay().appendTo('body'); //IE7 fix for z-index issue
						var formattedtitle = "<h3>"+mediaTitle+"</h3>";
						$("#media-details").css("width", (mediaWidth+"px"));
						//use the title or inline content div for details
						(mediaDetailsId) ? $("#media-details").html($("#"+mediaDetailsId).html()) : $("#media-details").html(formattedtitle);
						
						//no poster image for non-audio media
						(mediaType != "audio" ) ? mediaPoster = "" : undefined;
						 
						//START file extension conditional
						switch (mediaType) {
							
							case "external":
								
								$("#media-player").css("background-color","#FFFFFF");
								$("#media-player").css("border","1px solid #968c6d");
								
								var externalHtml = "<iframe type='text/html' width='"+mediaWidth+"' height='"+mediaHeight+"' src='"+mediaSrc+"' frameborder='0' style='overflow-x:hidden;overflow-y:scroll;' scrolling='yes'></iframe>";
								$("#media-player").html(externalHtml);
								

								break;
							
							case "image":
								//image
								
								var imageHtml = "<img src=\""+mediaSrc+ "\" alt=\""+mediaTitle+"\" width=\""+ mediaWidth +"\" height=\""+ mediaHeight +"\" />";
							
								$("#media-player").html(imageHtml);
								break;
								
							case "html":
								
								var tempContentDiv = "<div id='media-inline-html-div' style='overflow-y:auto;width:"+mediaWidth+"px;height:"+mediaHeight+"px;padding:0px 10px 10px 10px;'></div>";
														
								$("#media-player").append(tempContentDiv);
								$(mediaSrc).appendTo("#media-inline-html-div");
								$(mediaSrc).css('display','block'); 
								//set some styles 
								$("#media-player").css("background-color","#FFFFFF");
								$("#media-player").css("border","1px solid #cccccc");
								
								break;
							
								
								
							default:
							//START Can show flash
							if (flashembed.isSupported([10,0])){ 
								
								//START flashembed generic flash
								if ( mediaType == "flash" ){
									//set some styles 
									$("#media-player").css("background-color","#FFFFFF");
									$("#media-player").css("border","1px solid #968c6d");
									//START flashembed generic player
									flashembed("media-player", {
										//params
										src					: mediaSrc + mediaFlashvars, 
										version				: [10, 60], //requires version 10.1
										wmode				: 'transparent',
										allowscriptaccess	: 'always',
										allowfullscreen		: 'true',
										bgcolor				: '#FFFFFF',
										expressInstall		: mediaSwfPath+'expressinstall.swf',
										width				: mediaWidth,
										height				: mediaHeight,
										id					: mediaFlashObjectId
										}); //END flashembed generic player
									
								}  else {
									$("#media-player").css("border","1px solid #968c6d");
									$("#media-player").css("border-bottom","none");
																		
									//START flashembed media player
									flashembed("media-player", {
										//params
										src					: mediaSwfPath+'pwcMedia.swf', 
										expressInstall		: mediaSwfPath+'expressinstall.swf',
										version				: [10, 60], //requires version 10.1
										wmode				: 'transparent',
										allowscriptaccess	: 'always',
										allowfullscreen		: 'true',
										width				: mediaWidth,
										height				: mediaHeight,
										id					: mediaFlashObjectId
										}, {
										media				: mediaSrc,
										color				: mediaColor,
										player				: mediaSwfPath+'pwcMediaPlayer.swf',
										instantplay			: 'true',
										hd					: mediaHd,
										videowidth			: mediaWidth,
										videoheight			: mediaHeight,
										webtrends			: mediaTrack,
										title				: reformattedMediaTitle,
										poster				: mediaPoster,
										stream				: mediaStreaming,
										cuepoints			: mediaCuepoints
									}); //END flashembed media player
								} //END flashembed generic flash
										
									
							} else {
								
								//show mobile content if activated, and if it's a video
								if ((showmobileVersion) && (mediaType == "video")) { 
									//HTML5
									
									var newHtml 	= "<video poster='"+mediaPoster+"' autoplay src='" + _mediaURLPrefix + mediaSrc+".mp4' controls height='"+mediaHeight+"' width='"+mediaWidth+"' onerror='ShowThumb($(this),true);'>You need Adobe Flash or HTML5 to view this content</video>"
									$("#media-player").html(newHtml);
								
								} else {
									
									if (mediaAltFlashID) {
										$("#media-player").html("<div align='center' style='padding:10px;background-color:#ffffff' >"+$("#"+mediaAltFlashID).html()+"</div>");
									} else {
										var altmediacontent = "<div align='center' style='padding:10px;background-color:#ffffff' ><p>You need Adobe Flash to view this.</p><a href='http://get.adobe.com/flashplayer/' target='_blank' ><img src='"+imagePath+"media-get-flash.jpg' /></a></div>";
										$("#media-player").html(altmediacontent);
									}
								}
							} //END Can show flash
							
						}
							
						
		
		
						 
				
				} //END onBeforeLoad of overlay
							
		
			}) //END overlay
			
		} //END mobile redirect OR overlay 
		
		
		
		
		
  }
 })(jQuery);
	

$(document).ready(function() {  //START document ready
	<!--only scan div elements -->
	$("div.media-embed").each(function(a){
		$(this).embedMedia(a)
		});
	<!-- the modal can go on almost anything -->
	$(".media-overlay").each(function(b){
		$(this).overlayMedia(b)
		});
	//Check for overlay in url
	var _overlayvar = jQuery.getUrlVar('overlay');
	if(typeof _overlayvar != 'undefined'){
		if ($("#" + _overlayvar).length){
			var api = $("#" + _overlayvar).data("overlay");
			api.load();
		}

	}
	
		
});  //END document ready

			

			
