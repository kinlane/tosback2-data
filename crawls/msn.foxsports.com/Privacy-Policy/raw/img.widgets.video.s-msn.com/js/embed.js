// time   : 5/7/2012 5:11:39 AM
// expires   : 5/7/2012 12:26:39 PM
// machine: SN1*****001456
Msn = window.Msn || {};
Msn.Video = window.Msn.Video || new function () {};
Msn.Video.WidgetServer='img.widgets.video.s-msn.com';
Msn.Video.SslWidgetServer='img-widgets-video.msn.com';
Msn.Video.LocationServiceHost='video.msn.com';
Msn.Video.SslLocationServiceHost='hubs-video.msn.com';
Msn.Video.V5AssetHost='img1.video.s-msn.com';
Msn.Video.SslV5AssetHost='imgs1.video.msn.com';
Msn.Video.VersionTable={
lastModifiedTime: '4/25/2012 3:55:56 PM',
hasVersions: 'false',
global: '/v/5224.02/'
};
Msn=window.Msn||{};Msn.Video=window.Msn.Video||new function(){};Msn.Video.Widgets={playerarticle:{current:{path:"fl/player/current/player.swf"}},player:{"2":{path:"flash/soapbox1_1.swf",oldRoot:true},current:{path:"fl/player/current/player.swf"}},playerrtl:{current:{path:"flash/soapbox1_1RTL.swf",oldRoot:true}},playerad:{"2":{path:"flash/soapbox1_1.swf",oldRoot:true},current:{path:"fl/player/current/player.swf"}},slplayer:{current:{path:"sl/player/current/player.xap"},silverlight:true},slplayerad:{current:{path:"sl/player/current/player.xap"},silverlight:true},gallery:{"2":{path:"flash/gallerywidget/1_0/gallerywidget.swf",oldRoot:true},current:{path:"fl/gallerywidget/current/gallerywidget.swf"}},galleryrtl:{current:{path:"flash/gallerywidget/1_0/gallerywidget.swf",oldRoot:true}},customplayer:{"2":{path:"flash/customplayer/1_0/customplayer.swf",oldRoot:true},current:{path:"fl/customplayer/current/customPlayer.swf"}}};Msn.Video.initializeVersionTable=function(){var c=Msn.Video.JavascriptApi.getQSPs();if(checkString(c.versiontable)){var b=c.versiontable.split(";");for(var d in b){var a=b[d].split(":");if(a.length==2)Msn.Video.VersionTable[a[0].toLowerCase()]=a[1]}}};Msn.Video.isSafari=function(){return /Version\/(\d+\.\d+)(.\d+)*\s.*Safari/.test(navigator.userAgent)};Msn.Video.safariVersion=function(){var a=0;if(/Version\/(\d+\.\d+)(.\d+)*\s.*Safari/.test(navigator.userAgent))a=new Number(RegExp.$1);return a};function isFirefox(){return navigator.userAgent.toLowerCase().indexOf("firefox")>=0}Msn.Video.firefoxVersion=function(){var a=0;if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))a=new Number(RegExp.$1);return a};function isChrome(){return navigator.userAgent.toLowerCase().indexOf("chrome")>=0}Msn.Video.chromeVersion=function(){var a=0;if(/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent))a=new Number(RegExp.$1);return a};Msn.Video.isIE=function(a){return navigator.userAgent.indexOf("MSIE "+(a?a+".":""))>0};Msn.Video.IEVersion=function(){var b=/MSIE \d+\.?/,a=0;if(/MSIE (\d+\.\d+);/.test(navigator.userAgent))a=new Number(RegExp.$1);return a};function checkDefined(a){return typeof a!="undefined"&&null!=a}function checkString(a){return typeof a=="string"&&a.length>0}function checkObject(a){return typeof a=="object"&&null!=a}function checkArray(c,b){var a=c instanceof Array;if(b!="")a=a&&c.length>=b;return a}function checkFunction(a){return typeof a=="function"}function checkInt(a,c,b){if(null!=a&&(typeof a!="string"||""!=a)&&!isNaN(a)){if(checkDefined(c)&&a<c)return false;if(checkDefined(b)&&a>b)return false;return true}return false}function parseBool(a){return typeof a!="undefined"&&null!=a&&a.toLowerCase()=="true"}function padLeft(d,c,b){var a="";while(a.length<c)a=a+b;return a+d}function format(b){for(var a=1;a<arguments.length;a++)b=b.split("{"+(a-1)+"}").join(arguments[a]);return b}function openStandardWindow(b,a){return openWindow(b,a,1024,768,"resizable=yes,toolbar=yes,menubar=yes,scrollbars=yes,status=yes,location=yes")}function openWindow(c,b,e,d,a){window.open(c,b,format("width={0},height={1}{2}",e,d,a?","+a:""))}Msn.Video.JavascriptApi=window.Msn.Video.JavascriptApi||function(){var d="head",g="scriptId",f="Invalid Argument: filename is missing or is not a string",c=false,a=null,k=this,h=0,b={};function j(d,c){if(checkObject(b[d])){c=c||b[d].callback;var f=b[d].context;e(d);if(checkFunction(c))c(a,f,new Error("timed out waiting for script to load"))}}function e(c){if(checkObject(b[c])){if(checkDefined(b[c].timeout))clearTimeout(b[c].timeout);b[c]=a;delete b[c]}}return {makeRequest:function(i,d,g,e){if(!d)d=a;if(!e)e=c;var f=h++;b[f]={context:d,callback:g};Msn.Video.JavascriptApi.fetchScript(i+"&callbackName=Msn.Video.JavascriptApi.onComplete&cd="+f,f,a,e)},loadJS:function(e,d,g){if(!checkString(e))throw new Error(f);if(!d)d=a;if(!g)g=c;var k=c,j=document.getElementsByTagName("script");for(var i=0;i<j.length;i++)if(j[i].src.toLowerCase().indexOf(e)>=0){k=true;break}if(!k){var l=h++;b[l]={};Msn.Video.JavascriptApi.fetchScript(e,l,d,g)}else if(checkFunction(d))d()},fetchScript:function(m,h,i,k){if(!i)i=a;if(!k)k=c;var f=document.createElement("script");f.setAttribute("type","text/javascript");f.setAttribute("src",m);f.setAttribute("id",g+h);if(checkFunction(i))if(f.readyState)f.onreadystatechange=function(){if("loaded"==f.readyState||"complete"==f.readyState){f.onreadystatechange=a;f=a;if(checkObject(b[h])){e(h);i()}}};else f.onload=function(){f.onload=a;f=a;if(checkObject(b[h])){e(h);i()}};if(k)b[h].timeout=setTimeout(function(){f.onreadystatechange=a;f.onload=a;f=a;j(h,i)},4e3);var l=document.getElementsByTagName(d)[0];l.appendChild(f)},onComplete:function(k,f,h){if(checkObject(b[f])){var j=b[f].context,i=b[f].callback;e(f);if(!checkDefined(h))h=a;i(k,j,h)}var c=document.getElementById(g+f);if(checkDefined(c))setTimeout(function(){var b=document.getElementsByTagName(d)[0];b.removeChild(c);c.onreadystatechange=a;c.onload=a;c=a},0)},loadCSS:function(b){if(!checkString(b))throw new Error(f);var d=c,a,h=document.getElementsByTagName("link");for(var e=0;e<h.length;e++){a=h[e].href;if(checkString(a)&&a.toLowerCase().indexOf(b)>=0){d=true;break}}var g=document.styleSheets;for(i=0;i<g.length;i++){a=g[i].href;if(checkString(a)&&a.toLowerCase().indexOf(b)>=0){d=true;break}}if(!d)Msn.Video.JavascriptApi.fetchCSS(b)},fetchCSS:function(c){var a=document.createElement("link");a.setAttribute("type","text/css");a.setAttribute("rel","stylesheet");a.setAttribute("href",c);var b=document.getElementsByTagName(d)[0];b.appendChild(a)},getCookie:function(b){var f=a;if(checkString(b)){b=b.toLowerCase();var e=document.cookie.split(";");for(var d=0;d<e.length;++d){var c=e[d].split("="),g=c[0].replace(/^\s+|\s+$/g,"").toLowerCase();if(g==b){if(c.length>1)f=c[1].replace(/^\s+|\s+$/g,"");break}}}return f},setCookie:function(e,d,b){var a=e.toLowerCase()+"="+d+";path=/";if(b!=0){var f=new Date,c=new Date(f.getTime()+b*1e3);a+=";expires="+c.toGMTString()}document.cookie=a+";domain="+document.domain;document.cookie=a+";domain=.video.msn.com"},getQSPs:function(b){b=b||(window.location&&"undefined"!=window.location.search?window.location.search.substring(1):"");var f={};if(checkString(b)){var e=b.split("&");for(var d=0;d<e.length;++d){param=e[d];if(param.length>0){var c=param.split("=");f[c[0].toLowerCase()]=c.length>1?unescape(c[1]).toLowerCase():a}}}return f}}}();Msn.Video.CountryCodeLoader=window.Msn.Video.CountryCodeLoader||function(){var c=null,d="CountryCode",b=Msn.Video.JavascriptApi.getCookie(d),a;return {getCountryCode:function(){return b},setCountryCode:function(a){b=(a||"").toLowerCase();var c=checkString(b)?7*24*60*60:-1;Msn.Video.JavascriptApi.setCookie(d,b,c)},loadCountryCode:function(a){if(!checkString(b)){var d="video.msn.com";if(checkString(Msn.Video.LocationServiceHost))d=Msn.Video.LocationServiceHost;var f="http://"+d+"/soapboxservice2.aspx?mn=GetCountryCode&responseEncoding=json";Msn.Video.JavascriptApi.makeRequest(f,c,function(b){e(b,a)},true)}else if(a)e(c,a)},getVersionPath:function(){if(!a){a="";if(Msn.Video.VersionTable){if(checkString(b)&&checkString(Msn.Video.VersionTable[b]))a=Msn.Video.VersionTable[b];else if(checkString(Msn.Video.VersionTable["global"]))a=Msn.Video.VersionTable["global"];if(0==a.indexOf("/"))a=a.slice(1);if(a.length-1!=a.lastIndexOf("/"))a+="/"}}return a}};function e(a,d){if(a&&checkObject(a.ReverseIPResult)&&checkObject(a.ReverseIPResult.StatusCode)&&checkString(a.ReverseIPResult.StatusCode.$)&&a.ReverseIPResult.StatusCode.$.toLowerCase()=="success"){var f=checkDefined(a.ReverseIPResult.CountryCode)?a.ReverseIPResult.CountryCode.$:c;if(checkString(f))Msn.Video.CountryCodeLoader.setCountryCode(f);var e=checkDefined(a.ReverseIPResult.Zip)?a.ReverseIPResult.Zip.$:c;if(checkString(e))Msn.Video.JavascriptApi.setCookie("ZipCode",e,7*24*60*60)}if(d&&"function"==typeof d)d(b)}}();Msn.Video.VersionTable=window.Msn.Video.VersionTable||{};Msn.Video.Loader=window.Msn.Video.Loader||function(){var b=null,g="Invalid Argument: filename is missing or is not a string",q=this,d,l,e=[],f,n=Msn.Video.JavascriptApi.getQSPs();if(checkString(Msn.Video.WidgetServer))d=Msn.Video.WidgetServer;else{var m=document.getElementsByTagName("script");for(i=0;i<m.length;i++){var c=m[i].src.toLowerCase();if(c.indexOf("embed.js")==c.length-8){var a=c.indexOf("http://");a=a>=0?a+7:0;if(a==0){a=c.indexOf("https://");a=a>=0?a+8:0}if(a==0){d=document.location.domain;if(document.location.port!="80")d+=":"+document.location.port}else{var h=c.indexOf("/",a);h=h>=a?h:c.length;d=c.substring(a,h)}break}}}Msn.Video.initializeVersionTable();if(Msn.Video.VersionTable&&Msn.Video.VersionTable.hasVersions=="true"){if(n.hasOwnProperty("country"))Msn.Video.CountryCodeLoader.setCountryCode(n.country);Msn.Video.CountryCodeLoader.loadCountryCode(j)}else j();return {createWidget2:function(a){if(Msn.Video._loaded)Msn.Video.createWidget2(a);else e.push(a)},spawnOverlay:function(a){if(Msn.Video._loaded)Msn.Video.spawnOverlay(a);else f=a}};function j(){l=Msn.Video.CountryCodeLoader.getVersionPath();k("js/ch/channels.css");k("js/embed_internal.js",o)}function k(c,a){if(!checkString(c))throw new Error(g);if(!a)a=b;var e=c.toLowerCase();if(e.indexOf("http://")!=0)e=format("http://{0}/{1}{2}",d,l,c);p(e,a)}function p(a,c){if(!checkString(a))throw new Error(g);if(!c)c=b;var d=false;if(a.indexOf(".js")==a.length-3)Msn.Video.JavascriptApi.loadJS(a,c);else if(a.indexOf(".css")==a.length-4)Msn.Video.JavascriptApi.loadCSS(a)}function o(){while(0<e.length){var a=e.shift();Msn.Video.createWidget2(a)}e=b;if(f){Msn.Video.spawnOverlay(f);f=b}}}();if(!Msn.Video._loaded){Msn.Video.createWidget2=function(a){Msn.Video.Loader.createWidget2(a)};Msn.Video.createWidget=function(f,h,j,i,b,c,e,d,g,a){Msn.Video.createWidget2({divId:f,src:h,w:j,h:i,flashvars:b,widgetId:c,params:e,version:d,root:g,downlevel:a})};Msn.Video.spawnOverlay=function(a){Msn.Video.Loader.spawnOverlay(a);return false}}