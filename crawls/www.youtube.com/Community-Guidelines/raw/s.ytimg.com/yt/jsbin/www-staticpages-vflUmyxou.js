(function(){var g=void 0,h=null,j=!1,k,n=this,o=function(a){for(var a=a.split("."),b=n,c;c=a.shift();)if(b[c]!=h)b=b[c];else return h;return b},p=function(a){return"string"==typeof a};Math.floor(2147483648*Math.random()).toString(36);var r=function(a,b){var c=a.split("."),d=n;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&b!==g?d[f]=b:d=d[f]?d[f]:d[f]={}},s=function(a,b){function c(){}c.prototype=b.prototype;a.b=b.prototype;a.prototype=new c};var t=function(a){Error.captureStackTrace?Error.captureStackTrace(this,t):this.stack=Error().stack||"";a&&(this.message=""+a)};s(t,Error);var aa=function(a,b){for(var c=1;c<arguments.length;c++)var d=(""+arguments[c]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,d);return a};var u=function(a,b){b.unshift(a);t.call(this,aa.apply(h,b));b.shift()};s(u,t);var v=function(a,b,c){if(!a){var d=Array.prototype.slice.call(arguments,2),f="Assertion failed";if(b)var f=f+(": "+b),e=d;throw new u(""+f,e||[]);}};var w=Array.prototype,x=w.indexOf?function(a,b,c){v(a.length!=h);return w.indexOf.call(a,b,c)}:function(a,b,c){c=c==h?0:0>c?Math.max(0,a.length+c):c;if(p(a))return!p(b)||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},y=w.forEach?function(a,b,c){v(a.length!=h);w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=p(a)?a.split(""):a,e=0;e<d;e++)e in f&&b.call(c,f[e],e,a)},ba=w.filter?function(a,b,c){v(a.length!=h);return w.filter.call(a,b,c)}:function(a,
b,c){for(var d=a.length,f=[],e=0,i=p(a)?a.split(""):a,q=0;q<d;q++)if(q in i){var A=i[q];b.call(c,A,q,a)&&(f[e++]=A)}return f},z=function(a,b,c){v(a.length!=h);return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)};var B=function(a){a=a.className;return p(a)&&a.match(/\S+/g)||[]},C=function(a,b){for(var c=B(a),d=z(arguments,1),f=c,e=0;e<d.length;e++)0<=x(f,d[e])||f.push(d[e]);a.className=c.join(" ")},D=function(a,b){var c=B(a),d=z(arguments,1),c=ca(c,d);a.className=c.join(" ")},ca=function(a,b){return ba(a,function(a){return!(0<=x(b,a))})};var da=function(a){var b=E,c;for(c in b)if(a.call(g,b[c],c,b))return c};var F,G,H,I,J=function(){return n.navigator?n.navigator.userAgent:h};I=H=G=F=j;var K;if(K=J()){var ea=n.navigator;F=0==K.indexOf("Opera");G=!F&&-1!=K.indexOf("MSIE");H=!F&&-1!=K.indexOf("WebKit");I=!F&&!H&&"Gecko"==ea.product}var L=G,M=I,fa=H,N;
a:{var O="",P;if(F&&n.opera)var Q=n.opera.version,O="function"==typeof Q?Q():Q;else if(M?P=/rv\:([^\);]+)(\)|;)/:L?P=/MSIE\s+([^\);]+)(\)|;)/:fa&&(P=/WebKit\/(\S+)/),P)var R=P.exec(J()),O=R?R[1]:"";if(L){var S,T=n.document;S=T?T.documentMode:g;if(S>parseFloat(O)){N=""+S;break a}}N=O}
var ga=N,U={},V=function(a){if(!U[a]){for(var b=0,c=(""+ga).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=(""+a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(c.length,d.length),e=0;0==b&&e<f;e++){var i=c[e]||"",q=d[e]||"",A=RegExp("(\\d*)(\\D*)","g"),ma=RegExp("(\\d*)(\\D*)","g");do{var l=A.exec(i)||["","",""],m=ma.exec(q)||["","",""];if(0==l[0].length&&0==m[0].length)break;b=((0==l[1].length?0:parseInt(l[1],10))<(0==m[1].length?0:parseInt(m[1],10))?-1:(0==l[1].length?0:parseInt(l[1],
10))>(0==m[1].length?0:parseInt(m[1],10))?1:0)||((0==l[2].length)<(0==m[2].length)?-1:(0==l[2].length)>(0==m[2].length)?1:0)||(l[2]<m[2]?-1:l[2]>m[2]?1:0)}while(0==b)}U[a]=0<=b}},W={},X=function(){return W[9]||(W[9]=L&&!!document.documentMode&&9<=document.documentMode)};!L||X();!M&&!L||L&&X()||M&&V("1.9.1");L&&V("9");var Z=function(a,b){var c=b||document;return c.querySelectorAll&&c.querySelector?c.querySelectorAll("."+a):c.getElementsByClassName?c.getElementsByClassName(a):Y("*",a,b)},Y=function(a,b,c){var d=document,c=c||d,a=a&&"*"!=a?a.toUpperCase():"";if(c.querySelectorAll&&c.querySelector&&(a||b))return c.querySelectorAll(a+(b?"."+b:""));if(b&&c.getElementsByClassName){c=c.getElementsByClassName(b);if(a){for(var d={},f=0,e=0,i;i=c[e];e++)a==i.nodeName&&(d[f++]=i);d.length=f;return d}return c}c=c.getElementsByTagName(a||
"*");if(b){d={};for(e=f=0;i=c[e];e++)a=i.className,"function"==typeof a.split&&0<=x(a.split(/\s+/),b)&&(d[f++]=i);d.length=f;return d}return c},ha=function(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return h};var ia={},ja=function(){return ia["video-embed"]||(ia["video-embed"]="video-embed".replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()}))};var $=o("yt.dom.getNextId_");if(!$){$=function(){return++ka};r("yt.dom.getNextId_",$);var ka=0}var la=function(a){var b=a||document,c=h;return(c=b.querySelectorAll&&b.querySelector?b.querySelector(".video-slideshow-player"):Z("video-slideshow-player",a)[0])||h};var oa=function(a){if(a=a||o("window.event")){for(var b in a)0<=x(na,b)||(this[b]=a[b]);if((b=a.target||a.srcElement)&&3==b.nodeType)b=b.parentNode;this.target=b;if(b=a.relatedTarget)try{b=b.nodeName&&b}catch(c){b=h}else"mouseover"==this.type?b=a.fromElement:"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=a.clientX!==g?a.clientX:a.pageX;this.clientY=a.clientY!==g?a.clientY:a.pageY;if((a.clientX||a.clientY)&&document.body&&document.documentElement)this.pageX=a.clientX+document.body.scrollLeft+
document.documentElement.scrollLeft,this.pageY=a.clientY+document.body.scrollTop+document.documentElement.scrollTop;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.a=a}},na="stopPropagation preventMouseEvent preventManipulation preventDefault layerX layerY".split(" ");k=oa.prototype;k.type="";k.target=h;k.relatedTarget=h;k.currentTarget=h;k.keyCode=0;k.charCode=0;
k.altKey=j;k.ctrlKey=j;k.shiftKey=j;k.a=h;k.clientX=0;k.clientY=0;k.pageX=0;k.pageY=0;k.preventDefault=function(){this.a.returnValue=j;this.a.preventDefault&&this.a.preventDefault()};var E=o("yt.events.listeners_")||{};r("yt.events.listeners_",E);var pa=o("yt.events.counter_")||{count:0};r("yt.events.counter_",pa);
var qa=function(a,b){return da(function(c){return c[0]==a&&"click"==c[1]&&c[2]==b&&c[4]==j})},ra=function(a,b){if(a&&(a.addEventListener||a.attachEvent)){var c=qa(a,b);if(!c){var c=++pa.count+"",d=function(c){c=new oa(c);c.currentTarget=a;return b.call(a,c)};E[c]=[a,"click",b,d,j];a.addEventListener?a.addEventListener("click",d,j):a.attachEvent("onclick",d)}}},ta=function(a,b){sa(a,b,function(a){a=B(a);return 0<=x(a,"video-slideshow-select")})},sa=function(a,b,c){var d=a||document;ra(d,function(a){var e=
ha(a.target,function(a){return a===d||c(a)});e&&e!==d&&(a.currentTarget=e,b.call(e,a))})};var ua=function(a,b){if((a=p(a)?document.getElementById(a):a)&&a.style){a.style.display=b?"":"none";var c=a;!b?C(c,"hid"):D(c,"hid")}},va=function(a){y(arguments,function(a){ua(a,!0)})},wa=function(a){y(arguments,function(a){ua(a,j)})};r("yt.config_",window.yt&&window.yt.config_||{});r("yt.globals_",window.yt&&window.yt.globals_||{});r("yt.msgs_",window.yt&&window.yt.msgs_||{});r("yt.timeouts_",window.yt&&window.yt.timeouts_||[]);r("yt.intervals_",window.yt&&window.yt.intervals_||[]);eval("/*@cc_on!@*/false");r("yt.www.staticpages.initFakePager",function(a){var b=Y("div","tab",g),c=Y("button",h,p(a)?document.getElementById(a):a);y(c,function(a,f){ra(a,function(){y(b,function(a,b){D(c[b],"yt-uix-button-toggled");wa(a)});C(a,"yt-uix-button-toggled");va(b[f])})})});r("yt.www.staticpages.initSlideshows",function(){var a=Z("video-slideshow");y(a,function(a){var c=la(a);if(!c)return j;ta(a,function(a){var b=a.currentTarget;if(b&&(b=b.dataset?b.dataset[ja()]:b.getAttribute("data-video-embed")))c.src=b,a.preventDefault()})})});})();
