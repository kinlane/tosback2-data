var swfobject=function(){var aq="undefined",aD="object",ab="Shockwave Flash",X="ShockwaveFlash.ShockwaveFlash",aE="application/x-shockwave-flash",ac="SWFObjectExprInst",ax="onreadystatechange",af=window,aL=document,aB=navigator,aa=false,Z=[aN],aG=[],ag=[],al=[],aJ,ad,ap,at,ak=false,aU=false,aH,an,aI=true,ah=function(){var a=typeof aL.getElementById!=aq&&typeof aL.getElementsByTagName!=aq&&typeof aL.createElement!=aq,e=aB.userAgent.toLowerCase(),c=aB.platform.toLowerCase(),h=c?/win/.test(c):/win/.test(e),j=c?/mac/.test(c):/mac/.test(e),g=/webkit/.test(e)?parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,d=!+"\v1",f=[0,0,0],k=null;
if(typeof aB.plugins!=aq&&typeof aB.plugins[ab]==aD){k=aB.plugins[ab].description;if(k&&!(typeof aB.mimeTypes!=aq&&aB.mimeTypes[aE]&&!aB.mimeTypes[aE].enabledPlugin)){aa=true;d=false;k=k.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
f[0]=parseInt(k.replace(/^(.*)\..*$/,"$1"),10);f[1]=parseInt(k.replace(/^.*\.(.*)\s.*$/,"$1"),10);f[2]=/[a-zA-Z]/.test(k)?parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof af.ActiveXObject!=aq){try{var i=new ActiveXObject(X);
if(i){k=i.GetVariable("$version");if(k){d=true;k=k.split(" ")[1].split(",");f=[parseInt(k[0],10),parseInt(k[1],10),parseInt(k[2],10)]}}}catch(b){}}}return{w3:a,pv:f,wk:g,ie:d,win:h,mac:j}}(),aK=function(){if(!ah.w3){return
}if((typeof aL.readyState!=aq&&aL.readyState=="complete")||(typeof aL.readyState==aq&&(aL.getElementsByTagName("body")[0]||aL.body))){aP()}if(!ak){if(typeof aL.addEventListener!=aq){aL.addEventListener("DOMContentLoaded",aP,false)
}if(ah.ie&&ah.win){aL.attachEvent(ax,function(){if(aL.readyState=="complete"){aL.detachEvent(ax,arguments.callee);aP()}});if(af==top){(function(){if(ak){return}try{aL.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);
return}aP()})()}}if(ah.wk){(function(){if(ak){return}if(!/loaded|complete/.test(aL.readyState)){setTimeout(arguments.callee,0);return}aP()})()}aC(aP)}}();function aP(){if(ak){return}try{var b=aL.getElementsByTagName("body")[0].appendChild(ar("span"));
b.parentNode.removeChild(b)}catch(a){return}ak=true;var d=Z.length;for(var c=0;c<d;c++){Z[c]()}}function aj(a){if(ak){a()}else{Z[Z.length]=a}}function aC(a){if(typeof af.addEventListener!=aq){af.addEventListener("load",a,false)
}else{if(typeof aL.addEventListener!=aq){aL.addEventListener("load",a,false)}else{if(typeof af.attachEvent!=aq){aM(af,"onload",a)}else{if(typeof af.onload=="function"){var b=af.onload;af.onload=function(){b();
a()}}else{af.onload=a}}}}}function aN(){if(aa){Y()}else{am()}}function Y(){var d=aL.getElementsByTagName("body")[0];var b=ar(aD);b.setAttribute("type",aE);var a=d.appendChild(b);if(a){var c=0;(function(){if(typeof a.GetVariable!=aq){var e=a.GetVariable("$version");
if(e){e=e.split(" ")[1].split(",");ah.pv=[parseInt(e[0],10),parseInt(e[1],10),parseInt(e[2],10)]}}else{if(c<10){c++;setTimeout(arguments.callee,10);return}}d.removeChild(b);a=null;am()})()}else{am()}}function am(){var g=aG.length;
if(g>0){for(var h=0;h<g;h++){var c=aG[h].id;var l=aG[h].callbackFn;var a={success:false,id:c};if(ah.pv[0]>0){var i=aS(c);if(i){if(ao(aG[h].swfVersion)&&!(ah.wk&&ah.wk<312)){ay(c,true);if(l){a.success=true;
a.ref=av(c);l(a)}}else{if(aG[h].expressInstall&&au()){var e={};e.data=aG[h].expressInstall;e.width=i.getAttribute("width")||"0";e.height=i.getAttribute("height")||"0";if(i.getAttribute("class")){e.styleclass=i.getAttribute("class")
}if(i.getAttribute("align")){e.align=i.getAttribute("align")}var f={};var d=i.getElementsByTagName("param");var k=d.length;for(var j=0;j<k;j++){if(d[j].getAttribute("name").toLowerCase()!="movie"){f[d[j].getAttribute("name")]=d[j].getAttribute("value")
}}ae(e,f,c,l)}else{aF(i);if(l){l(a)}}}}}else{ay(c,true);if(l){var b=av(c);if(b&&typeof b.SetVariable!=aq){a.success=true;a.ref=b}l(a)}}}}}function av(b){var d=null;var c=aS(b);if(c&&c.nodeName=="OBJECT"){if(typeof c.SetVariable!=aq){d=c
}else{var a=c.getElementsByTagName(aD)[0];if(a){d=a}}}return d}function au(){return !aU&&ao("6.0.65")&&(ah.win||ah.mac)&&!(ah.wk&&ah.wk<312)}function ae(f,d,h,e){aU=true;ap=e||null;at={success:false,id:h};
var a=aS(h);if(a){if(a.nodeName=="OBJECT"){aJ=aO(a);ad=null}else{aJ=a;ad=h}f.id=ac;if(typeof f.width==aq||(!/%$/.test(f.width)&&parseInt(f.width,10)<310)){f.width="310"}if(typeof f.height==aq||(!/%$/.test(f.height)&&parseInt(f.height,10)<137)){f.height="137"
}aL.title=aL.title.slice(0,47)+" - Flash Player Installation";var b=ah.ie&&ah.win?"ActiveX":"PlugIn",c="MMredirectURL="+af.location.toString().replace(/&/g,"%26")+"&MMplayerType="+b+"&MMdoctitle="+aL.title;
if(typeof d.flashvars!=aq){d.flashvars+="&"+c}else{d.flashvars=c}if(ah.ie&&ah.win&&a.readyState!=4){var g=ar("div");h+="SWFObjectNew";g.setAttribute("id",h);a.parentNode.insertBefore(g,a);a.style.display="none";
(function(){if(a.readyState==4){a.parentNode.removeChild(a)}else{setTimeout(arguments.callee,10)}})()}aA(f,d,h)}}function aF(a){if(ah.ie&&ah.win&&a.readyState!=4){var b=ar("div");a.parentNode.insertBefore(b,a);
b.parentNode.replaceChild(aO(a),b);a.style.display="none";(function(){if(a.readyState==4){a.parentNode.removeChild(a)}else{setTimeout(arguments.callee,10)}})()}else{a.parentNode.replaceChild(aO(a),a)}}function aO(b){var d=ar("div");
if(ah.win&&ah.ie){d.innerHTML=b.innerHTML}else{var e=b.getElementsByTagName(aD)[0];if(e){var a=e.childNodes;if(a){var f=a.length;for(var c=0;c<f;c++){if(!(a[c].nodeType==1&&a[c].nodeName=="PARAM")&&!(a[c].nodeType==8)){d.appendChild(a[c].cloneNode(true))
}}}}}return d}function aA(e,g,c){var d,a=aS(c);if(ah.wk&&ah.wk<312){return d}if(a){if(typeof e.id==aq){e.id=c}if(ah.ie&&ah.win){var f="";for(var i in e){if(e[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){g.movie=e[i]
}else{if(i.toLowerCase()=="styleclass"){f+=' class="'+e[i]+'"'}else{if(i.toLowerCase()!="classid"){f+=" "+i+'="'+e[i]+'"'}}}}}var h="";for(var j in g){if(g[j]!=Object.prototype[j]){h+='<param name="'+j+'" value="'+g[j]+'" />'
}}a.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+f+">"+h+"</object>";ag[ag.length]=e.id;d=aS(e.id)}else{var b=ar(aD);b.setAttribute("type",aE);for(var k in e){if(e[k]!=Object.prototype[k]){if(k.toLowerCase()=="styleclass"){b.setAttribute("class",e[k])
}else{if(k.toLowerCase()!="classid"){b.setAttribute(k,e[k])}}}}for(var l in g){if(g[l]!=Object.prototype[l]&&l.toLowerCase()!="movie"){aQ(b,l,g[l])}}a.parentNode.replaceChild(b,a);d=b}}return d}function aQ(b,d,c){var a=ar("param");
a.setAttribute("name",d);a.setAttribute("value",c);b.appendChild(a)}function aw(a){var b=aS(a);if(b&&b.nodeName=="OBJECT"){if(ah.ie&&ah.win){b.style.display="none";(function(){if(b.readyState==4){aT(a)
}else{setTimeout(arguments.callee,10)}})()}else{b.parentNode.removeChild(b)}}}function aT(a){var b=aS(a);if(b){for(var c in b){if(typeof b[c]=="function"){b[c]=null}}b.parentNode.removeChild(b)}}function aS(a){var c=null;
try{c=aL.getElementById(a)}catch(b){}return c}function ar(a){return aL.createElement(a)}function aM(a,c,b){a.attachEvent(c,b);al[al.length]=[a,c,b]}function ao(a){var b=ah.pv,c=a.split(".");c[0]=parseInt(c[0],10);
c[1]=parseInt(c[1],10)||0;c[2]=parseInt(c[2],10)||0;return(b[0]>c[0]||(b[0]==c[0]&&b[1]>c[1])||(b[0]==c[0]&&b[1]==c[1]&&b[2]>=c[2]))?true:false}function az(b,f,a,c){if(ah.ie&&ah.mac){return}var e=aL.getElementsByTagName("head")[0];
if(!e){return}var g=(a&&typeof a=="string")?a:"screen";if(c){aH=null;an=null}if(!aH||an!=g){var d=ar("style");d.setAttribute("type","text/css");d.setAttribute("media",g);aH=e.appendChild(d);if(ah.ie&&ah.win&&typeof aL.styleSheets!=aq&&aL.styleSheets.length>0){aH=aL.styleSheets[aL.styleSheets.length-1]
}an=g}if(ah.ie&&ah.win){if(aH&&typeof aH.addRule==aD){aH.addRule(b,f)}}else{if(aH&&typeof aL.createTextNode!=aq){aH.appendChild(aL.createTextNode(b+" {"+f+"}"))}}}function ay(a,c){if(!aI){return}var b=c?"visible":"hidden";
if(ak&&aS(a)){aS(a).style.visibility=b}else{az("#"+a,"visibility:"+b)}}function ai(b){var a=/[\\\"<>\.;]/;var c=a.exec(b)!=null;return c&&typeof encodeURIComponent!=aq?encodeURIComponent(b):b}var aR=function(){if(ah.ie&&ah.win){window.attachEvent("onunload",function(){var a=al.length;
for(var b=0;b<a;b++){al[b][0].detachEvent(al[b][1],al[b][2])}var d=ag.length;for(var c=0;c<d;c++){aw(ag[c])}for(var e in ah){ah[e]=null}ah=null;for(var f in swfobject){swfobject[f]=null}swfobject=null})
}}();return{registerObject:function(a,e,c,b){if(ah.w3&&a&&e){var d={};d.id=a;d.swfVersion=e;d.expressInstall=c;d.callbackFn=b;aG[aG.length]=d;ay(a,false)}else{if(b){b({success:false,id:a})}}},getObjectById:function(a){if(ah.w3){return av(a)
}},embedSWF:function(k,e,h,f,c,a,b,i,g,j){var d={success:false,id:e};if(ah.w3&&!(ah.wk&&ah.wk<312)&&k&&e&&h&&f&&c){ay(e,false);aj(function(){h+="";f+="";var q={};if(g&&typeof g===aD){for(var o in g){q[o]=g[o]
}}q.data=k;q.width=h;q.height=f;var n={};if(i&&typeof i===aD){for(var p in i){n[p]=i[p]}}if(b&&typeof b===aD){for(var l in b){if(typeof n.flashvars!=aq){n.flashvars+="&"+l+"="+b[l]}else{n.flashvars=l+"="+b[l]
}}}if(ao(c)){var m=aA(q,n,e);if(q.id==e){ay(e,true)}d.success=true;d.ref=m}else{if(a&&au()){q.data=a;ae(q,n,e,j);return}else{ay(e,true)}}if(j){j(d)}})}else{if(j){j(d)}}},switchOffAutoHideShow:function(){aI=false
},ua:ah,getFlashPlayerVersion:function(){return{major:ah.pv[0],minor:ah.pv[1],release:ah.pv[2]}},hasFlashPlayerVersion:ao,createSWF:function(a,b,c){if(ah.w3){return aA(a,b,c)}else{return undefined}},showExpressInstall:function(b,a,d,c){if(ah.w3&&au()){ae(b,a,d,c)
}},removeSWF:function(a){if(ah.w3){aw(a)}},createCSS:function(b,a,c,d){if(ah.w3){az(b,a,c,d)}},addDomLoadEvent:aj,addLoadEvent:aC,getQueryParamValue:function(b){var a=aL.location.search||aL.location.hash;
if(a){if(/\?/.test(a)){a=a.split("?")[1]}if(b==null){return ai(a)}var c=a.split("&");for(var d=0;d<c.length;d++){if(c[d].substring(0,c[d].indexOf("="))==b){return ai(c[d].substring((c[d].indexOf("=")+1)))
}}}return""},expressInstallCallback:function(){if(aU){var a=aS(ac);if(a&&aJ){a.parentNode.replaceChild(aJ,a);if(ad){ay(ad,true);if(ah.ie&&ah.win){aJ.style.display="block"}}if(ap){ap(at)}}aU=false}}}}();
if("undefined"===typeof YAHOO){YAHOO={};YAHOO.widget={}}(function(){YAHOO.widget.Video=function(nodeId,config,events){var _debug=(typeof config.debugMode!="undefined"&&(config.debugMode=="1"||config.debugMode=="true"||config.debugMode==true||config.debugMode==1));
var _embedNodeId;var _instanceNum=Math.floor(Math.random()*100000);var _config;var _myInstance="YEP"+_instanceNum;var _clientSupport;var _clientEventHandler;var _clientCallbacks={};this._isReady=false;
this._nonFlashRenderer=null;this._playerNodeId="yppVideoPlayer"+_instanceNum;this._player;this.autoStart=config.autoStart;this._plMgr;function _log(data){if(_debug===true&&typeof window.console==="object"&&typeof window.console.log==="function"){console.log("PlayerJS: "+data)
}}function _delegate(instance,method){return function(){return method.apply(instance,arguments)}}function _isValidContainer(nodeId){return(typeof nodeId==="string"&&typeof document.getElementById(nodeId)==="object")
}function _isValidConfig(config){if(typeof config.wmode=="undefined"){config.wmode="opaque";if("undefined"!==typeof YAHOO&&"undefined"!==typeof YAHOO.env){config.wmode=(YAHOO.env.ua.ie!==0)?"window":"opaque"
}}for(var item in config){_log("config["+item+"] = "+config[item])}return(typeof config==="object")}function _getThumbServiceUrl(mediaId){return"http://m.yahoo.com/w/video/clip/"+mediaId+"/info?tag=image&iw="+_config.width+"&ih="+_config.height
}function _getStreamServiceUrl(mediaId){return"http://m.yahoo.com/w/web/video?u=url%5B%5D%3D"+mediaId+"&lg=yep"}function _detectClient(){var miscPattern=new RegExp("(hiptop|/MIDP|Symbian|Windows CE|IEMobile|NetFront|webOS|Dolfin/[0-9].[0-9]|Jasmine|Polaris|Brew|Windows Phone|Opera Mini|BlackBerry|Opera Mobi|Obigo/Q7|Googlebot-Mobile)");
var qtSupportPattern=new RegExp("(iPad|iPhone|iPod)");if(navigator.userAgent.match(miscPattern)){return"other"}else{if(navigator.userAgent.match(qtSupportPattern)){return"quicktime"}else{return"flash"}}}function _setAPI(clientType){_log("_setAPI: clientType = "+clientType);
switch(clientType){case"HTML5":YAHOO.widget.Video.prototype.render=_HTML5Renderer;window[_myInstance]=_delegate(this,_HTML5EventHandler);break;case"quicktime":YAHOO.widget.Video.prototype.render=_quicktimeRenderer;
window[_myInstance]=_delegate(this,_quicktimeEventHandler);break;case"other":YAHOO.widget.Video.prototype.render=_otherRenderer;window[_myInstance]=_delegate(this,_quicktimeEventHandler);break;default:YAHOO.widget.Video.prototype.render=_YEPRenderer;
window[_myInstance]={};window[_myInstance].playerEvents=_delegate(this,_eventHandler);window[_myInstance].accessibilityFunction=_delegate(this,accessibilityFunction);break}}function accessibilityFunction(fncName,fncParam){_log("accessibilityFunction: "+fncName+", "+fncParam);
switch(fncName){case"togglePlayPause":this.togglePlayPause();break;case"modifyPlayhead":this.modifyPlayhead(fncParam);break;case"modifyVolume":this.modifyVolume(fncParam);break;case"replayMedia":this.replayMedia();
break;case"setFocus":this.setFocus();break}}function _YEPRenderer(){var p=_config;var flashvars={eventHandler:"window."+_myInstance+".playerEvents"};var flashvarBlackList={width:true,height:true,playerUrl:true,wmode:true,container:true};
for(var item in p){if(item!="eventHandler"){if(!flashvarBlackList[item]){flashvars[item]=p[item]}}else{_clientEventHandler=p[item]}}var params={allowfullscreen:"true",allowscriptaccess:"always",quality:"high",tabindex:"999",wmode:p.wmode};
if(typeof p.enableFullscreen!="undefined"){params.allowfullscreen=p.enableFullscreen}var attributes={};var playerDiv=document.createElement("div");playerDiv.setAttribute("id",this._playerNodeId);document.getElementById(_embedNodeId).appendChild(playerDiv);
var that=this;swfobject.embedSWF(p.playerUrl,this._playerNodeId,p.width,p.height,p.version?p.version:"10.1.0","http://l.yimg.com/a/i/us/ypp/player/expressinstall.swf",flashvars,params,attributes,function embedSwfCallbackFn(e){if(!e.success){var left=Math.round((p.width-112)/2);
var top=Math.round((p.height-33)/2);var alternative='<a href="http://www.adobe.com/go/getflashplayer/" style="border: 0px; margin-left: '+left+'px;" ><img src="http://l.yimg.com/a/i/us/ypp/player/get_flash_player.gif" alt="Get Adobe Flash Player" style="border: 0px; margin-top:'+top+'px;"/></a>';
document.getElementById(e.id).innerHTML=alternative}else{that._player=e.ref;var controls='<h4 style="position:absolute;left:-10000px;top:0px;width:1px;height:1px;overflow:hidden;"><a name="player_controls_'+_instanceNum+'">Video Player Controls</a></h4><ul style="position:absolute;left:-10000px;top:0px;width:1px;height:1px;overflow:hidden;"><li><button disabled="true" id="player_access_controls_play_'+_instanceNum+'" accesskey="1" title="Play/Pause Video" value="Play/Pause Video" onclick="'+_myInstance+'.accessibilityFunction(\'togglePlayPause\')">Play/Pause Video</button></li><li><button disabled="true" id="player_access_controls_reverse_'+_instanceNum+'" accesskey="2" title="Seek Reverse" value="Seek Reverse" onclick="'+_myInstance+'.accessibilityFunction(\'modifyPlayhead\', -5 )">Seek Reverse</button></li><li><button disabled="true" id="player_access_controls_forward_'+_instanceNum+'" accesskey="3" title="Seek Forward" value="Seek Forward" onclick="'+_myInstance+'.accessibilityFunction(\'modifyPlayhead\', 5 )">Seek Forward</button></li><li><button disabled="true" id="player_access_controls_replay_'+_instanceNum+'" accesskey="4" title="Replay Video" value="Replay Video" onclick="'+_myInstance+'.accessibilityFunction(\'replayMedia\')">Replay Video</button></li><li><button disabled="true" id="player_access_controls_volDown_'+_instanceNum+'" accesskey="5" title="Volume Down" value="Volume Down" onclick="'+_myInstance+'.accessibilityFunction(\'modifyVolume\', -10 )">Volume Down</button></li><li><button disabled="true" id="player_access_controls_volUp_'+_instanceNum+'" accesskey="6" title="Volume Up" value="Volume Up" onclick="'+_myInstance+'.accessibilityFunction(\'modifyVolume\', 10)">Volume Up</button></li><li><button disabled="true" id="player_access_controls_focus_'+_instanceNum+'" accesskey="7" title="Focus Video" value="Focus Video" onclick="'+_myInstance+".accessibilityFunction('setFocus')\">Focus Video</button></li></ul>";
var container=document.createElement("div");container.setAttribute("id","alt_video_controls_"+_instanceNum);container.setAttribute("style","position:absolute;left:-10000px;top:0px;width:1px;height:1px;overflow:hidden;");
container.style.cssText="position:absolute;left:-10000px;top:0px;width:1px;height:1px;overflow:hidden;";container.innerHTML=controls;document.getElementById(_embedNodeId).insertBefore(container,that._player)
}})}function _otherRenderer(){if(!this._isReady){var eventHandler=function(){_eventHandler("onPlayerReady")};setTimeout(eventHandler,1)}var posterUrl="";var streamUrl="";var _currentMedia=this._plMgr.getCurrentItem();
if(_currentMedia){posterUrl=_getThumbServiceUrl(_currentMedia.mediaId);streamUrl=_getStreamServiceUrl(_currentMedia.mediaId)}var container=document.getElementById(_embedNodeId);var p=_config;var w=""+p.width;
var h=""+p.height;var playButtonUrl="http://l.yimg.com/a/i/us/ypp/player/bn_play_160.png";var imageSizingStyle="";if((p.width/p.height)>1.5){imageSizingStyle=" height:"+h+"px; "}else{imageSizingStyle=" width:"+w+"px; "
}var playButtonWidth=160;var playButtonHeight=160;var outerDiv=document.createElement("div");outerDiv.style.position="relative";outerDiv.style.width=w+"px";outerDiv.style.height=h+"px";outerDiv.style.overflow="hidden";
var thumbnailDiv=document.createElement("div");thumbnailDiv.style.position="relative";thumbnailDiv.style.width=w+"px";thumbnailDiv.style.height=h+"px";thumbnailDiv.style.overflow="hidden";thumbnailDiv.style.textAlign="center";
thumbnailDiv.style.backgroundColor="#000000";thumbnailDiv.style.verticalAlign="middle";thumbnailDiv.style.display="table-cell";var promptX=""+((p.width/2)-(playButtonWidth/2))+"px";var promptY=""+((p.height/2)-(playButtonHeight/2))+"px";
var iconDiv=document.createElement("div");iconDiv.style.position="absolute";iconDiv.style.left=promptX;iconDiv.style.top=promptY;iconDiv.style.zIndex=5000;iconDiv.style.opacity=0.75;var thumbnailImage=document.createElement("img");
thumbnailImage.setAttribute("border",0);thumbnailImage.setAttribute("src",posterUrl);thumbnailImage.setAttribute("style",imageSizingStyle);var playIconImage=document.createElement("img");playIconImage.setAttribute("border",0);
playIconImage.setAttribute("src",playButtonUrl);playIconImage.setAttribute("width",playButtonWidth);playIconImage.setAttribute("height",playButtonHeight);var thumbnailLink=document.createElement("a");thumbnailLink.setAttribute("href",streamUrl);
var playIconLink=document.createElement("a");playIconLink.setAttribute("href",streamUrl);while(container.firstChild){container.removeChild(container.firstChild)}container.appendChild(outerDiv);outerDiv.appendChild(thumbnailDiv);
outerDiv.appendChild(iconDiv);thumbnailDiv.appendChild(thumbnailLink);iconDiv.appendChild(playIconLink);thumbnailLink.appendChild(thumbnailImage);playIconLink.appendChild(playIconImage);this.loadClip=function(){var currentMedia=this._plMgr.getCurrentItem();
if(currentMedia&&currentMedia.mediaId){thumbnailImage.setAttribute("src",_getThumbServiceUrl(currentMedia.mediaId));thumbnailLink.setAttribute("href",_getStreamServiceUrl(currentMedia.mediaId));playIconLink.setAttribute("href",_getStreamServiceUrl(currentMedia.mediaId))
}};this.playMedia=function(){var currentMedia=this._plMgr.getCurrentItem();if(currentMedia&&currentMedia.mediaId){window.location.href=_getStreamServiceUrl(currentMedia.mediaId)}}}function _HTML5Renderer(){_log("_html5Renderer");
var posterUrl="";var streamUrl="";var _currentMedia=this._plMgr.getCurrentItem();if(_currentMedia){posterUrl=_getThumbServiceUrl(_currentMedia.mediaId);streamUrl=_getStreamServiceUrl(_currentMedia.mediaId)
}var p=_config;var s;var outerDiv=document.createElement("div");s=outerDiv.style;s.position="relative";s.width=p.width+"px";s.height=p.height+"px";s.overflow="hidden";var videoPlayer=document.createElement("video");
videoPlayer.setAttribute("id",this._playerNodeId);videoPlayer.setAttribute("controls","true");if(p.autoPlay){videoPlayer.setAttribute("autoplay","true")}videoPlayer.setAttribute("src",streamUrl);videoPlayer.setAttribute("poster",posterUrl);
videoPlayer.setAttribute("width",p.width+"px");videoPlayer.setAttribute("height",p.height+"px");var container=document.getElementById(_embedNodeId);outerDiv.appendChild(videoPlayer);while(container.firstChild){container.removeChild(container.firstChild)
}container.appendChild(outerDiv);this._player=document.getElementById(this._playerNodeId);this.loadClip=function(){_log("loadClip");var currentMedia=this._plMgr.getCurrentItem();if(currentMedia&&currentMedia.mediaId){var streamUrl=_getStreamServiceUrl(currentMedia.mediaId);
var thumbnailUrl=_getThumbServiceUrl(currentMedia.mediaId);this._player.src=_getStreamServiceUrl(currentMedia.mediaId);this._player.poster=_getThumbServiceUrl(currentMedia.mediaId);this._player.load()}};
this.playMedia=function(){this._player.play();return true}}function _quicktimeRenderer(){var posterUrl="";var streamUrl="";var p=_config;var s;var _media={};var playerId=this._playerNodeId;if(p.vid&&p.vid!="undefined"){_media.mediaId=p.vid;
_media.thumbnailUrl=(p.thumbnailUrl)?p.thumbnailUrl:"";_media.shareUrl=(p.shareUrl)?p.thumbnailUrl:"";this._plMgr.addItem(_media)}else{if(!this._isReady){var eventHandler=function(){_quicktimeEventHandler({type:"qt_begin"})
};setTimeout(eventHandler,1)}}function _writeQTEmbed(currentMedia){_log("_writeQTEmbed: "+currentMedia);if(currentMedia&&currentMedia.mediaId){var streamUrl=_getStreamServiceUrl(currentMedia.mediaId);var posterUrl=_getThumbServiceUrl(currentMedia.mediaId);
var outerDiv=document.createElement("div");s=outerDiv.style;s.position="relative";s.width=p.width+"px";s.height=p.height+"px";s.overflow="hidden";var videoPlayer=document.createElement("embed");videoPlayer.setAttribute("id",playerId);
videoPlayer.setAttribute("href",streamUrl);videoPlayer.setAttribute("src",posterUrl);videoPlayer.setAttribute("width",p.width+"px");videoPlayer.setAttribute("height",p.height+"px");videoPlayer.setAttribute("autoplay","true");
videoPlayer.setAttribute("controller","true");videoPlayer.setAttribute("controller","tofit");videoPlayer.setAttribute("scale","aspect");videoPlayer.setAttribute("cache","true");videoPlayer.setAttribute("type","video/x-m4v");
videoPlayer.setAttribute("target","myself");videoPlayer.setAttribute("enablejavaScript","true");videoPlayer.setAttribute("postdomevents","true");outerDiv.appendChild(videoPlayer);var container=document.getElementById(_embedNodeId);
while(container.firstChild){container.removeChild(container.firstChild)}container.appendChild(outerDiv);this._player=document.getElementById(playerId);var _ref=eval("window."+_myInstance+"");this._player.addEventListener("qt_begin",_ref,false);
this._player.addEventListener("qt_ended",_ref,false);this._player.addEventListener("qt_error",_ref,false);this._player.addEventListener("qt_pause",_ref,false);this._player.addEventListener("qt_play",_ref,false);
this._player.addEventListener("qt_volumechange",_ref,false);this._player.addEventListener("qt_progress",_ref,false);this._player.addEventListener("qt_load",_ref,false)}}this.loadClip=function(){_writeQTEmbed(this._plMgr.getCurrentItem())
};this.playMedia=function(){if(this._player.Play){this._player.Play()}else{if(this._player.play){this._player.play()}}return true};_writeQTEmbed(_media)}function playlistManager(){this.currentIndex=-1;
this.playlist=[];function isValidMedia(media){return(typeof media==="object"&&typeof media.mediaId!="undefined"&&media.mediaId.length>0)}this.setCurrentIndex=function(index){_log("playlistManager.setCurrentIndex: "+index);
var n=parseInt(index);if(typeof index==="number"){this.currentIndex=index}};this.getCurrentIndex=function(){return this.currentIndex};this.addItem=function(media){if(isValidMedia(media)){this.playlist.push(media)
}};this.removeItem=function(media){};this.clear=function(){this.playlist=[]};this.getCurrentItem=function(){return this.playlist[this.currentIndex]}}function _eventHandler(eventType,data){switch(eventType){case"onAdPlaybackProgress":case"onPlayheadChange":case"onPlayerAPIDebug":break;
case"onPlayerReady":_log("_eventHandler: eventType = "+eventType);_enableAccessibilityControls();this._isReady=true;break;case"onPlayerUnload":_log("_eventHandler: eventType = "+eventType);var container=document.getElementById(_embedNodeId);
while(container.firstChild){container.removeChild(container.firstChild)}break;default:_log("_eventHandler: eventType = "+eventType);break}if(typeof _clientEventHandler==="function"){_clientEventHandler.apply(window,arguments)
}if(typeof _clientCallbacks[eventType]==="function"){_clientCallbacks[eventType].apply(window,arguments)}if(this.Events&&typeof this.Events[eventType]==="object"){this.Events[eventType].fire()}if(eventType==="onPlayerUnload"){_myInstance,_embedNodeId,_config,_debug,_instanceNum,this._player,this._playerNodeId,_clientEventHandler,_clientCallbacks,_currentMedia,this._isReady,this._nonFlashRenderer=null
}}function _HTML5EventHandler(){console.log("_HTML5EventHandler");console.log(arguments)}function _quicktimeEventHandler(e){var eventType=e.type;_log("_quicktimeEventHandler event: "+eventType);if(eventType){var data="";
switch(eventType){case"qt_begin":this._isReady=true;data=["onPlayerReady",""];break;case"qt_error":data=["onPlayerError",this._plMgr.getCurrentItem()];break;case"qt_play":data=["onPlaybackStart",this._plMgr.getCurrentItem()];
break;case"qt_pause":data=["onPlaybackPause",this._plMgr.getCurrentItem()];break;case"qt_ended":data=["onPlaybackComplete",this._plMgr.getCurrentItem()];break}if(data!=""){if(typeof _clientEventHandler==="function"){_clientEventHandler.apply(window,data)
}if(typeof _clientCallbacks[data[0]]==="function"){_clientCallbacks[data[0]].apply(window,data)}if(this.Events&&typeof this.Events[eventType]==="object"){this.Events[eventType].fire()}}}}function _enableAccessibilityControls(){var controls=["player_access_controls_play_"+_instanceNum,"player_access_controls_reverse_"+_instanceNum,"player_access_controls_forward_"+_instanceNum,"player_access_controls_replay_"+_instanceNum,"player_access_controls_volDown_"+_instanceNum,"player_access_controls_volUp_"+_instanceNum,"player_access_controls_focus_"+_instanceNum];
for(var x=0;x<controls.length;x+=1){document.getElementById(controls[x]).disabled=false}}if(_isValidContainer(nodeId)){_embedNodeId=nodeId}else{return null}if(_isValidConfig(config)){_config=config}else{return null
}if(typeof events==="object"){_clientCallbacks=events}if(typeof _config.eventHandler==="function"){_clientEventHandler=_config.eventHandler}this._plMgr=new playlistManager();var vids="";if(typeof _config.vid==="string"&&_config.vid.length>0){vids=_config.vid.split(",");
for(var i=0;i<vids.length;i++){var media={mediaId:vids[i]};if(i===0){if(typeof _config.thumbnailUrl==="string"&&_config.thumbnailUrl.length>0){media.thumbnailUrl=_config.thumbnailUrl}if(typeof _config.shareUrl==="string"&&_config.shareUrl.length>0){media.shareUrl=_config.shareUrl
}if(typeof _config.playbackStart==="string"&&_config.playbackStart.length>0){media.playbackStart=_config.playbackStart}if(typeof _config.playbackEnd==="string"&&_config.playbackEnd.length>0){media.playbackEnd=_config.playbackEnd
}}this._plMgr.addItem(media);if(i==0){this._plMgr.setCurrentIndex(0)}}}var clientSupport="flash";if(typeof _config==="object"&&_config.supportMobile!=false){clientSupport=_detectClient.call(this)}this._nonFlashRenderer=(clientSupport!="flash");
_log("this._nonFlashRenderer: "+this._nonFlashRenderer);_setAPI.call(this,clientSupport)};YAHOO.widget.Video.prototype={version:"2.7.3.6256",render:function(){},loadClip:function(){this.render()},Events:("undefined"!==typeof YAHOO&&"undefined"!==typeof YAHOO.util)?{onPlayerReady:new YAHOO.util.CustomEvent("onPlayerReady"),onPlayerUnload:new YAHOO.util.CustomEvent("onPlayerUnload"),onPlayerError:new YAHOO.util.CustomEvent("onPlayerError"),onPlayerWarning:new YAHOO.util.CustomEvent("onPlayerWarning"),onPlayerDebug:new YAHOO.util.CustomEvent("onPlayerDebug"),onPlayerStateChange:new YAHOO.util.CustomEvent("onPlayerStateChange"),onPlayheadChange:new YAHOO.util.CustomEvent("onPlayheadChange"),onVolumeChange:new YAHOO.util.CustomEvent("onVolumeChange"),onPlaybackStart:new YAHOO.util.CustomEvent("onPlaybackStart"),onPlaybackPause:new YAHOO.util.CustomEvent("onPlaybackPause"),onPlaybackResume:new YAHOO.util.CustomEvent("onPlaybackResume"),onPlaybackSeek:new YAHOO.util.CustomEvent("onPlaybackSeek"),onPlaybackStop:new YAHOO.util.CustomEvent("onPlaybackStop"),onPlaybackComplete:new YAHOO.util.CustomEvent("onPlaybackComplete"),onPlaybackError:new YAHOO.util.CustomEvent("onPlaybackError"),onAdPlaybackStart:new YAHOO.util.CustomEvent("onAdPlaybackStart"),onAdPlaybackComplete:new YAHOO.util.CustomEvent("onAdPlaybackComplete"),onAdPlaybackProgress:new YAHOO.util.CustomEvent("onAdPlaybackProgress"),onPlaylistChange:new YAHOO.util.CustomEvent("onPlaylistChange"),onPlaylistStart:new YAHOO.util.CustomEvent("onPlaylistStart"),onPlaylistComplete:new YAHOO.util.CustomEvent("onPlaylistComplete")}:{},playMedia:function(){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.playMedia();return true},pauseMedia:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.pauseMedia();return true
},stopMedia:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.stopMedia();return true},seekMedia:function(secs){if(this._nonFlashRenderer){return false}if(!this._isReady){return false
}this._player.seekMedia(secs);return true},skipMedia:function(numberToSkip){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.skipMedia(numberToSkip);return true},setPlaylistMetaData:function(playlist){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.setPlaylistMetaData(playlist);return true},loadPlaylist:function(playlist){if(!this._isReady){return false}if(typeof playlist!="object"||(typeof playlist.mediaItems!="object"&&playlist.mediaItems.length<1)){return false
}this.clearPlaylist();for(var i=0;i<playlist.mediaItems.length;i++){this.addToPlaylist(playlist.mediaItems[i],i)}var position=playlist.currentPosition;if(!isNaN(position)){if(this._nonFlashRenderer){this._plMgr.setCurrentIndex(position)
}else{this._player.setPlaylistPosition(position)}}return true},loadPlaylistById:function(id){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.loadPlaylistById(id);return true
},addToPlaylist:function(o,i,t){if(this._nonFlashRenderer){this._plMgr.addItem(o);if(this._plMgr.playlist.length==1){this._plMgr.setCurrentIndex(0);this.loadClip()}return true}if(!this._isReady){return false
}this._player.addToPlaylist(o,i,t);return true},getPlaylist:function(){if(this._nonFlashRenderer){return{currentPosition:this._plMgr.getCurrentIndex(),mediaItems:this._plMgr.playlist}}if(!this._isReady){return false
}return this._player.getPlaylist()},getPlaylists:function(){if(this._nonFlashRenderer){return this.getPlaylist()}if(!this._isReady){return false}return this._player.getPlaylists()},getActivePlaylist:function(){if(this._nonFlashRenderer){return this._plMgr.playlist
}if(!this._isReady){return false}return this._player.getActivePlaylist()},setActivePlaylist:function(playlist){if(this._nonFlashRenderer){return true}if(!this._isReady){return false}this._player.setActivePlaylist(playlist);
return true},clearPlaylist:function(){if(this._nonFlashRenderer){this._plMgr.clear();return true}if(!this._isReady){return false}this._player.clearPlaylist();return true},getPlaylistPosition:function(){if(this._nonFlashRenderer){return this._plMgr.currentIndex
}if(!this._isReady){return false}return this._player.getPlaylistPosition()},setPlaylistPosition:function(position){if(this._nonFlashRenderer){this._plMgr.setCurrentIndex(Number(position));this.loadClip();
if(this.autoStart==1){this.playMedia()}}else{if(!this._isReady){return false}this._player.setPlaylistPosition(position)}return true},setPlaylistPositionByMediaId:function(mediaId){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.setPlaylistPositionByMediaId(mediaId);return true},removeFromPlaylist:function(index){if(this._nonFlashRenderer){return false}if(!this._isReady){return false
}this._player.removeFromPlaylist(index);return true},removeFromPlaylistByMediaId:function(mediaId){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.removeFromPlaylistByMediaId(mediaId);
return true},getHTMLObjectId:function(){return this._playerNodeId},getCurrentVideo:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getCurrentVideo();
return true},getEnabledState:function(UIComponent){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getEnabledState(UIComponent);return true},getBufferingProgress:function(){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}return this._player.getBufferingProgress();return true},getPlaybackState:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getPlaybackState();
return true},getPlayheadTime:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getPlayheadTime();return true},getVolume:function(){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}return this._player.getVolume();return true},setVolume:function(vol){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.setVolume(vol);
return true},getIsMuted:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getIsMuted();return true},setIsMuted:function(isMuted){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.setIsMuted(isMuted);return true},getIntl:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}var locale=this._player.getLocale();
return locale.split("-")[1]},getLanguage:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}var locale=this._player.getLocale();return locale.split("-")[0]},getLocale:function(){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}return this._player.getLocale();return true},getPlatformVersion:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getPlatformVersion();
return true},getPlayerVersion:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}return this._player.getPlayerVersion();return true},setRepeat:function(bool){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.setRepeat(bool);return true},setContinuousPlay:function(bool){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.setContinuousPlay(bool);
return true},getIsReady:function(){return this._isReady},togglePlayPause:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.togglePlayPause();return true},modifyPlayhead:function(pos){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.modifyPlayhead(pos);return true},replayMedia:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.replayMedia();
return true},modifyVolume:function(vol){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.modifyVolume(vol);return true},setFocus:function(){if(this._nonFlashRenderer){return false
}if(!this._isReady){return false}this._player.setFocus();return true},unload:function(){if(this._nonFlashRenderer){return false}if(!this._isReady){return false}this._player.unload();return true},init:function(){}()}
})();if("undefined"!==typeof YAHOO&&"undefined"!==typeof YAHOO.register){YAHOO.register("YPPVideo",YAHOO.widget.Video,{version:"2.7.3",build:"6256"})};