/* Generated on 04/09/2012 14:19:27*/
var mboxCopyright="&copy; 2003-2009. Omniture, Inc. All rights reserved.";mboxUrlBuilder=function(c,d){this.a=c;this.b=d;this.c=new Array();this.d=function(a){return a};this.f=null};mboxUrlBuilder.prototype.addParameter=function(f,a){var b=new RegExp("('|\")");if(b.exec(f)){throw"Parameter '"+f+"' contains invalid characters"}for(var c=0;c<this.c.length;c++){var d=this.c[c];if(d.name==f){d.value=a;return this}}var e=new Object();e.name=f;e.value=a;this.c[this.c.length]=e;return this};mboxUrlBuilder.prototype.addParameters=function(b){if(!b){return this}for(var a=0;a<b.length;a++){var d=b[a].indexOf("=");if(d==-1||d==0){continue}this.addParameter(b[a].substring(0,d),b[a].substring(d+1,b[a].length))}return this};mboxUrlBuilder.prototype.setServerType=function(a){this.o=a};mboxUrlBuilder.prototype.setBasePath=function(a){this.f=a};mboxUrlBuilder.prototype.setUrlProcessAction=function(a){this.d=a};mboxUrlBuilder.prototype.buildUrl=function(){var c=this.f?this.f:"/m2/"+this.b+"/mbox/"+this.o;var d=document.location.protocol=="file:"?"http:":document.location.protocol;var g=d+"//"+this.a+c;var f=g.indexOf("?")!=-1?"&":"?";for(var a=0;a<this.c.length;a++){var b=this.c[a];g+=f+encodeURIComponent(b.name)+"="+encodeURIComponent(b.value);f="&"}return this.t(this.d(g))};mboxUrlBuilder.prototype.getParameters=function(){return this.c};mboxUrlBuilder.prototype.setParameters=function(a){this.c=a};mboxUrlBuilder.prototype.clone=function(){var a=new mboxUrlBuilder(this.a,this.b);a.setServerType(this.o);a.setBasePath(this.f);a.setUrlProcessAction(this.d);for(var b=0;b<this.c.length;b++){a.addParameter(this.c[b].name,this.c[b].value)}return a};mboxUrlBuilder.prototype.t=function(a){return a.replace(/\"/g,"&quot;").replace(/>/g,"&gt;")};mboxStandardFetcher=function(){};mboxStandardFetcher.prototype.getType=function(){return"standard"};mboxStandardFetcher.prototype.fetch=function(a){a.setServerType(this.getType());document.write('<script src="'+a.buildUrl()+'" language="JavaScript"></script>')};mboxStandardFetcher.prototype.cancel=function(){};mboxAjaxFetcher=function(){};mboxAjaxFetcher.prototype.getType=function(){return"ajax"};mboxAjaxFetcher.prototype.fetch=function(b){b.setServerType(this.getType());var a=b.buildUrl();this.x=document.createElement("script");this.x.src=a;document.body.appendChild(this.x)};mboxAjaxFetcher.prototype.cancel=function(){};mboxMap=function(){this.y=new Object();this.z=new Array()};mboxMap.prototype.put=function(b,a){if(!this.y[b]){this.z[this.z.length]=b}this.y[b]=a};mboxMap.prototype.get=function(a){return this.y[a]};mboxMap.prototype.remove=function(a){this.y[a]=undefined};mboxMap.prototype.each=function(d){for(var b=0;b<this.z.length;b++){var c=this.z[b];var a=this.y[c];if(a){d(c,a)}}};mboxFactory=function(f,d,a){this.D=false;this.B=f;this.C=a;this.E=new mboxList();mboxFactories.put(a,this);this.F=typeof document.createElement("div").replaceChild!="undefined"&&(function(){return true})()&&typeof document.getElementById!="undefined"&&typeof(window.attachEvent||document.addEventListener||window.addEventListener)!="undefined"&&typeof encodeURIComponent!="undefined";this.G=this.F&&mboxGetPageParameter("mboxDisable")==null;var e=a=="default";this.I=new mboxCookieManager("mbox"+(e?"":("-"+a)),(function(){return mboxCookiePageDomain()})());this.G=this.G&&this.I.isEnabled()&&(this.I.getCookie("disable")==null);if(this.isAdmin()){this.enable()}this.J=mboxGenerateId();this.K=new mboxSession(this.J,"mboxSession","session",31*60,this.I);this.L=new mboxPC("PC",1209600,this.I);this.w=new mboxUrlBuilder(f,d);this.M(this.w,e);this.N=new Date().getTime();this.O=this.N;var c=this;this.addOnLoad(function(){c.O=new Date().getTime()});if(this.F){this.addOnLoad(function(){c.D=true;c.getMboxes().each(function(b){b.setFetcher(new mboxAjaxFetcher());b.finalize()})});this.limitTraffic(100,10368000);if(this.G){this.R();this.S=new mboxSignaler(function(b,g){return c.create(b,g)},this.I)}}};mboxFactory.prototype.isEnabled=function(){return this.G};mboxFactory.prototype.getDisableReason=function(){return this.I.getCookie("disable")};mboxFactory.prototype.isSupported=function(){return this.F};mboxFactory.prototype.disable=function(a,b){if(typeof a=="undefined"){a=60*60}if(typeof b=="undefined"){b="unspecified"}if(!this.isAdmin()){this.G=false;this.I.setCookie("disable",b,a)}};mboxFactory.prototype.enable=function(){this.G=true;this.I.deleteCookie("disable")};mboxFactory.prototype.isAdmin=function(){return document.location.href.indexOf("mboxEnv")!=-1};mboxFactory.prototype.limitTraffic=function(a,b){};mboxFactory.prototype.addOnLoad=function(a){if(window.addEventListener){window.addEventListener("load",a,false)}else{if(document.addEventListener){document.addEventListener("load",a,false)}else{if(document.attachEvent){window.attachEvent("onload",a)}}}};mboxFactory.prototype.getEllapsedTime=function(){return this.O-this.N};mboxFactory.prototype.getEllapsedTimeUntil=function(a){return a-this.N};mboxFactory.prototype.getMboxes=function(){return this.E};mboxFactory.prototype.get=function(a,b){return this.E.get(a).getById(b||0)};mboxFactory.prototype.update=function(a,b){if(!this.isEnabled()){return}if(this.E.get(a).length()==0){throw"Mbox "+a+" is not defined"}this.E.get(a).each(function(c){c.getUrlBuilder().addParameter("mboxPage",mboxGenerateId());c.load(b)})};mboxFactory.prototype.create=function(m,i,f){if(!this.isSupported()){return null}var k=this.w.clone();k.addParameter("mboxCount",this.E.length()+1);k.addParameters(i);var d=this.E.get(m).length();var h=this.C+"-"+m+"-"+d;var a;if(f){a=new mboxLocatorNode(f)}else{if(this.D){throw"The page has already been loaded, can't write marker"}a=new mboxLocatorDefault(h)}try{var g=this;var l="mboxImported-"+h;var j=new mbox(m,d,k,a,l);if(this.G){j.setFetcher(this.D?new mboxAjaxFetcher():new mboxStandardFetcher())}j.setOnError(function(e,c){j.setMessage(e);j.activate();if(!j.isActivated()){g.disable(60*60,e);window.location.reload(false)}});this.E.add(j)}catch(n){this.disable();throw'Failed creating mbox "'+m+'", the error was: '+n}var b=new Date();k.addParameter("mboxTime",b.getTime()-(b.getTimezoneOffset()*60000));return j};mboxFactory.prototype.getCookieManager=function(){return this.I};mboxFactory.prototype.getPageId=function(){return this.J};mboxFactory.prototype.getPCId=function(){return this.L};mboxFactory.prototype.getSessionId=function(){return this.K};mboxFactory.prototype.getSignaler=function(){return this.S};mboxFactory.prototype.getUrlBuilder=function(){return this.w};mboxFactory.prototype.M=function(b,a){b.addParameter("mboxHost",document.location.hostname).addParameter("mboxSession",this.K.getId());if(!a){b.addParameter("mboxFactoryId",this.C)}if(this.L.getId()!=null){b.addParameter("mboxPC",this.L.getId())}b.addParameter("mboxPage",this.J);b.setUrlProcessAction(function(c){c+="&mboxURL="+encodeURIComponent(document.location);var d=encodeURIComponent(document.referrer);if(c.length+d.length<2000){c+="&mboxReferrer="+d}c+="&mboxVersion="+mboxVersion;return c})};mboxFactory.prototype.gb=function(){return""};mboxFactory.prototype.R=function(){document.write("<style>.mboxDefault { visibility:hidden; }</style>")};mboxFactory.prototype.isDomLoaded=function(){return this.D};mboxSignaler=function(c,b){this.I=b;var d=b.getCookieNames("signal-");for(var a=0;a<d.length;a++){var e=d[a];var f=b.getCookie(e).split("&");var g=c(f[0],f);g.load();b.deleteCookie(e)}};mboxSignaler.prototype.signal=function(b,a){this.I.setCookie("signal-"+b,mboxShiftArray(arguments).join("&"),45*60)};mboxList=function(){this.E=new Array()};mboxList.prototype.add=function(a){if(a!=null){this.E[this.E.length]=a}};mboxList.prototype.get=function(d){var a=new mboxList();for(var b=0;b<this.E.length;b++){var c=this.E[b];if(c.getName()==d){a.add(c)}}return a};mboxList.prototype.getById=function(a){return this.E[a]};mboxList.prototype.length=function(){return this.E.length};mboxList.prototype.each=function(a){if(typeof a!="function"){throw"Action must be a function, was: "+typeof(a)}for(var b=0;b<this.E.length;b++){a(this.E[b])}};mboxLocatorDefault=function(a){this.g="mboxMarker-"+a;document.write('<div id="'+this.g+'" style="visibility:hidden;display:none">&nbsp;</div>')};mboxLocatorDefault.prototype.locate=function(){var a=document.getElementById(this.g);while(a!=null){if(a.nodeType==1){if(a.className=="mboxDefault"){return a}}a=a.previousSibling}return null};mboxLocatorDefault.prototype.force=function(){var a=document.createElement("div");a.className="mboxDefault";var b=document.getElementById(this.g);b.parentNode.insertBefore(a,b);return a};mboxLocatorNode=function(a){this.ob=a};mboxLocatorNode.prototype.locate=function(){return typeof this.ob=="string"?document.getElementById(this.ob):this.ob};mboxLocatorNode.prototype.force=function(){return null};mboxCreate=function(a){var b=mboxFactoryDefault.create(a,mboxShiftArray(arguments));if(b){b.load()}return b};mboxDefine=function(b,c){var a=mboxFactoryDefault.create(c,mboxShiftArray(mboxShiftArray(arguments)),b);return a};mboxUpdate=function(a){mboxFactoryDefault.update(a,mboxShiftArray(arguments))};mbox=function(a,d,e,c,b){this.ub=null;this.vb=0;this.ab=c;this.bb=b;this.wb=null;this.xb=new mboxOfferContent();this.pb=null;this.w=e;this.message="";this.yb=new Object();this.zb=0;this.sb=d;this.g=a;this.Ab();e.addParameter("mbox",a).addParameter("mboxId",d);this.Bb=function(){};this.Cb=function(){};this.Db=null};mbox.prototype.getId=function(){return this.sb};mbox.prototype.Ab=function(){if(this.g.length>250){throw"Mbox Name "+this.g+" exceeds max length of 250 characters."}else{if(this.g.match(/^\s+|\s+$/g)){throw"Mbox Name "+this.g+" has leading/trailing whitespace(s)."}}};mbox.prototype.getName=function(){return this.g};mbox.prototype.getParameters=function(){var d=this.w.getParameters();var a=new Array();for(var b=0;b<d.length;b++){if(d[b].name.indexOf("mbox")!=0){a[a.length]=d[b].name+"="+d[b].value}}return a};mbox.prototype.setOnLoad=function(a){this.Cb=a;return this};mbox.prototype.setMessage=function(a){this.message=a;return this};mbox.prototype.setOnError=function(a){this.Bb=a;return this};mbox.prototype.setFetcher=function(a){if(this.wb){this.wb.cancel()}this.wb=a;return this};mbox.prototype.getFetcher=function(){return this.wb};mbox.prototype.load=function(b){if(this.wb==null){return this}this.setEventTime("load.start");this.cancelTimeout();this.vb=0;var d=(b&&b.length>0)?this.w.clone().addParameters(b):this.w;this.wb.fetch(d);var a=this;this.Fb=setTimeout(function(){a.Bb("browser timeout",a.wb.getType())},15000);this.setEventTime("load.end");return this};mbox.prototype.loaded=function(){this.cancelTimeout();if(!this.activate()){var a=this;setTimeout(function(){a.loaded()},100)}};mbox.prototype.activate=function(){if(this.vb){return this.vb}this.setEventTime("activate"+ ++this.zb+".start");if(this.show()){this.cancelTimeout();this.vb=1}this.setEventTime("activate"+this.zb+".end");return this.vb};mbox.prototype.isActivated=function(){return this.vb};mbox.prototype.setOffer=function(a){if(a&&a.show&&a.setOnLoad){this.xb=a}else{throw"Invalid offer"}return this};mbox.prototype.getOffer=function(){return this.xb};mbox.prototype.show=function(){this.setEventTime("show.start");var a=this.xb.show(this);this.setEventTime(a==1?"show.end.ok":"show.end");return a};mbox.prototype.showContent=function(a){if(a==null){return 0}if(this.pb==null||!this.pb.parentNode){this.pb=this.getDefaultDiv();if(this.pb==null){return 0}}if(this.pb!=a){this.Hb(this.pb);this.pb.parentNode.replaceChild(a,this.pb);this.pb=a}this.Ib(a);this.Cb();return 1};mbox.prototype.hide=function(){this.setEventTime("hide.start");var a=this.showContent(this.getDefaultDiv());this.setEventTime(a==1?"hide.end.ok":"hide.end.fail");return a};mbox.prototype.finalize=function(){this.setEventTime("finalize.start");this.cancelTimeout();if(this.getDefaultDiv()==null){if(this.ab.force()!=null){this.setMessage("No default content, an empty one has been added")}else{this.setMessage("Unable to locate mbox")}}if(!this.activate()){this.hide();this.setEventTime("finalize.end.hide")}this.setEventTime("finalize.end.ok")};mbox.prototype.cancelTimeout=function(){if(this.Fb){clearTimeout(this.Fb)}if(this.wb!=null){this.wb.cancel()}};mbox.prototype.getDiv=function(){return this.pb};mbox.prototype.getDefaultDiv=function(){if(this.Db==null){this.Db=this.ab.locate()}return this.Db};mbox.prototype.setEventTime=function(a){this.yb[a]=(new Date()).getTime()};mbox.prototype.getEventTimes=function(){return this.yb};mbox.prototype.getImportName=function(){return this.bb};mbox.prototype.getURL=function(){return this.w.buildUrl()};mbox.prototype.getUrlBuilder=function(){return this.w};mbox.prototype.Kb=function(a){return a.style.display!="none"};mbox.prototype.Ib=function(a){this.Lb(a,true)};mbox.prototype.Hb=function(a){this.Lb(a,false)};mbox.prototype.Lb=function(b,a){b.style.visibility=a?"visible":"hidden";b.style.display=a?"block":"none"};mboxOfferContent=function(){this.Cb=function(){}};mboxOfferContent.prototype.show=function(a){var b=a.showContent(document.getElementById(a.getImportName()));if(b==1){this.Cb()}return b};mboxOfferContent.prototype.setOnLoad=function(a){this.Cb=a};mboxOfferAjax=function(a){this.Gb=a;this.Cb=function(){}};mboxOfferAjax.prototype.setOnLoad=function(a){this.Cb=a};mboxOfferAjax.prototype.show=function(b){var c=document.createElement("div");c.id=b.getImportName();c.innerHTML=this.Gb;var a=b.showContent(c);if(a==1){this.Cb()}return a};mboxOfferDefault=function(){this.Cb=function(){}};mboxOfferDefault.prototype.setOnLoad=function(a){this.Cb=a};mboxOfferDefault.prototype.show=function(a){var b=a.hide();if(b==1){this.Cb()}return b};mboxCookieManager=function mboxCookieManager(a,b){this.g=a;this.Ob=b==""||b.indexOf(".")==-1?"":"; domain="+b;this.Pb=new mboxMap();this.loadCookies()};mboxCookieManager.prototype.isEnabled=function(){this.setCookie("check","true",60);this.loadCookies();return this.getCookie("check")=="true"};mboxCookieManager.prototype.setCookie=function(b,a,c){if(typeof b!="undefined"&&typeof a!="undefined"&&typeof c!="undefined"){var d=new Object();d.name=b;d.value=escape(a);d.expireOn=Math.ceil(c+new Date().getTime()/1000);this.Pb.put(b,d);this.saveCookies()}};mboxCookieManager.prototype.getCookie=function(a){var b=this.Pb.get(a);return b?unescape(b.value):null};mboxCookieManager.prototype.deleteCookie=function(a){this.Pb.remove(a);this.saveCookies()};mboxCookieManager.prototype.getCookieNames=function(a){var b=new Array();this.Pb.each(function(c,d){if(c.indexOf(a)==0){b[b.length]=c}});return b};mboxCookieManager.prototype.saveCookies=function(){var a=new Array();var b=0;this.Pb.each(function(d,e){a[a.length]=d+"#"+e.value+"#"+e.expireOn;if(b<e.expireOn){b=e.expireOn}});var c=new Date(b*1000);document.cookie=this.g+"="+a.join("|")+"; expires="+c.toGMTString()+"; path=/"+this.Ob};mboxCookieManager.prototype.loadCookies=function(){this.Pb=new mboxMap();var b=document.cookie.indexOf(this.g+"=");if(b!=-1){var c=document.cookie.indexOf(";",b);if(c==-1){c=document.cookie.indexOf(",",b);if(c==-1){c=document.cookie.length}}var d=document.cookie.substring(b+this.g.length+1,c).split("|");var e=Math.ceil(new Date().getTime()/1000);for(var a=0;a<d.length;a++){var g=d[a].split("#");if(e<=g[2]){var f=new Object();f.name=g[0];f.value=g[1];f.expireOn=g[2];this.Pb.put(f.name,f)}}}};mboxSession=function(a,b,e,c,d){this.bc=b;this.jb=e;this.cc=c;this.I=d;this.dc=false;this.sb=typeof mboxForceSessionId!="undefined"?mboxForceSessionId:mboxGetPageParameter(this.bc);if(this.sb==null||this.sb.length==0){this.sb=d.getCookie(e);if(this.sb==null||this.sb.length==0){this.sb=a;this.dc=true}}d.setCookie(e,this.sb,c)};mboxSession.prototype.getId=function(){return this.sb};mboxSession.prototype.forceId=function(a){this.sb=a;this.I.setCookie(this.jb,this.sb,this.cc)};mboxPC=function(c,a,b){this.jb=c;this.cc=a;this.I=b;this.sb=typeof mboxForcePCId!="undefined"?mboxForcePCId:b.getCookie(c);if(this.sb!=null){b.setCookie(c,this.sb,a)}};mboxPC.prototype.getId=function(){return this.sb};mboxPC.prototype.forceId=function(a){if(this.sb!=a){this.sb=a;this.I.setCookie(this.jb,this.sb,this.cc);return true}return false};mboxGetPageParameter=function(a){var b=null;var c=new RegExp(a+"=([^&]*)");var d=c.exec(document.location);if(d!=null&&d.length>=2){b=d[1]}return b};mboxSetCookie=function(b,a,c){return mboxFactoryDefault.getCookieManager().setCookie(b,a,c)};mboxGetCookie=function(a){return mboxFactoryDefault.getCookieManager().getCookie(a)};mboxCookiePageDomain=function(){var c=(/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1];var b=/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;if(!b.exec(c)){var a=(/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(c);if(a){c=a[0]}}return c?c:""};mboxShiftArray=function(a){var b=new Array();for(var c=1;c<a.length;c++){b[b.length]=a[c]}return b};mboxGenerateId=function(){return(new Date()).getTime()+"-"+Math.floor(Math.random()*999999)};if(typeof mboxVersion=="undefined"){var mboxVersion=38;var mboxFactories=new mboxMap();var mboxFactoryDefault=new mboxFactory("gamefly.tt.omtrdc.net","gamefly","default")}if(mboxGetPageParameter("mboxDebug")!=null||mboxFactoryDefault.getCookieManager().getCookie("debug")!=null){setTimeout(function(){if(typeof mboxDebugLoaded=="undefined"){alert("Could not load the remote debug.\nPlease check your connection to Test&amp;Target servers")}},60*60);document.write('<script language="Javascript1.2" src="http://admin9.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=gamefly.tt.omtrdc.net&clientCode=gamefly"></script>')};