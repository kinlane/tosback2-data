/* EXPORTED: TIME: 2012/02/21 13:55:42 with FULL svn REVISION: 22336 */
/** * SWFAddress 2.4: Deep linking for Flash and Ajax <http://www.asual.com/swfaddress/> * * SWFAddress is (c) 2006-2009 Rostislav Hristov and contributors * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> * */function handleSWFAddressInit(a){SWFAddress.inited=!0,SWFAddress.removeEventListener(SWFAddressEvent.INIT)}if(typeof asual=="undefined")var asual={};typeof asual.util=="undefined"&&(asual.util={}),asual.util.Browser=new function(){var a=navigator.userAgent.toLowerCase(),b=/webkit/.test(a),c=/opera/.test(a),d=/msie/.test(a)&&!/opera/.test(a),e=/mozilla/.test(a)&&!/(compatible|webkit)/.test(a),f=parseFloat(d?a.substr(a.indexOf("msie")+4):(a.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1]);this.toString=function(){return"[class Browser]"},this.getVersion=function(){return f},this.isMSIE=function(){return d},this.isSafari=function(){return b},this.isOpera=function(){return c},this.isMozilla=function(){return e}},asual.util.Events=new function(){var a="DOMContentLoaded",b="onstop",c=window,d=document,e=[],f=asual.util,g=f.Browser,h=g.isMSIE(),i=g.isSafari();this.toString=function(){return"[class Events]"},this.addListener=function(b,c,d){e.push({o:b,t:c,l:d});if(c!=a||!h&&!i)b.addEventListener?b.addEventListener(c,d,!1):b.attachEvent&&b.attachEvent("on"+c,d)},this.removeListener=function(b,c,d){for(var f=0,g;g=e[f];f++)if(g.o==b&&g.t==c&&g.l==d){e.splice(f,1);break}if(c!=a||!h&&!i)b.removeEventListener?b.removeEventListener(c,d,!1):b.detachEvent&&b.detachEvent("on"+c,d)};var j=function(){for(var b=0,c;c=e[b];b++)c.t!=a&&f.Events.removeListener(c.o,c.t,c.l)},k=function(){if(d.readyState=="interactive"){function a(){d.detachEvent(b,a),j()}d.attachEvent(b,a),c.setTimeout(function(){d.detachEvent(b,a)},0)}};(h||i)&&function(){try{(h&&d.body||!/loaded|complete/.test(d.readyState))&&d.documentElement.doScroll("left")}catch(b){return setTimeout(arguments.callee,0)}for(var c=0,b;b=e[c];c++)b.t==a&&b.l.call(null)}(),h&&c.attachEvent("onbeforeunload",k),this.addListener(c,"unload",j)},asual.util.Functions=new function(){this.toString=function(){return"[class Functions]"},this.bind=function(a,b,c){for(var d=2,e,f=[];e=arguments[d];d++)f.push(e);return function(){return a.apply(b,f)}}};var SWFAddressEvent=function(a){this.toString=function(){return"[object SWFAddressEvent]"},this.type=a,this.target=[SWFAddress][0],this.value=SWFAddress.getValue(),this.path=SWFAddress.getPath(),this.pathNames=SWFAddress.getPathNames(),this.parameters={};var b=SWFAddress.getParameterNames();for(var c=0,d=b.length;c<d;c++)this.parameters[b[c]]=SWFAddress.getParameter(b[c]);this.parameterNames=b};SWFAddressEvent.INIT="init",SWFAddressEvent.CHANGE="change",SWFAddressEvent.INTERNAL_CHANGE="internalChange",SWFAddressEvent.EXTERNAL_CHANGE="externalChange";var SWFAddress=new function(){var _getHash=function(){var a=_l.href.indexOf("#");return a!=-1?_ec(_dc(_l.href.substr(a+1))):""},_getWindow=function(){try{top.document;return top}catch(a){return window}},_strictCheck=function(a,b){_opts.strict&&(a=b?a.substr(0,1)!="/"?"/"+a:a:a==""?"/":a);return a},_ieLocal=function(a,b){return _msie&&_l.protocol=="file:"?b?_value.replace(/\?/,"%3F"):_value.replace(/%253F/,"?"):a},_searchScript=function(a){if(a.childNodes)for(var b=0,c=a.childNodes.length,d;b<c;b++){a.childNodes[b].src&&(_url=String(a.childNodes[b].src));if(d=_searchScript(a.childNodes[b]))return d}},_titleCheck=function(){_d.title!=_title&&_d.title.indexOf("#")!=-1&&(_d.title=_title)},_listen=function(){if(!_silent){var a=_getHash(),b=_value!=a;_safari&&_version<523?_length!=_h.length&&(_length=_h.length,typeof _stack[_length-1]!=UNDEFINED&&(_value=_stack[_length-1]),_update.call(this,!1)):_msie&&b?_version<7?_l.reload():this.setValue(a):b&&(_value=a,_update.call(this,!1)),_msie&&_titleCheck.call(this)}},_bodyClick=function(e){if(_popup.length>0){var popup=window.open(_popup[0],_popup[1],eval(_popup[2]));typeof _popup[3]!=UNDEFINED&&eval(_popup[3])}_popup=[]},_swfChange=function(){for(var a=0,b,c,d=SWFAddress.getValue(),e="setSWFAddressValue";b=_ids[a];a++){c=document.getElementById(b);if(c)if(c.parentNode&&typeof c.parentNode.so!=UNDEFINED)c.parentNode.so.call(e,d);else{if(!c||typeof c[e]==UNDEFINED){var f=c.getElementsByTagName("object"),g=c.getElementsByTagName("embed");c=f[0]&&typeof f[0][e]!=UNDEFINED?f[0]:g[0]&&typeof g[0][e]!=UNDEFINED?g[0]:null}c&&c[e](d)}else(c=document[b])&&typeof c[e]!=UNDEFINED&&c[e](d)}},_jsDispatch=function(a){this.dispatchEvent(new SWFAddressEvent(a)),a=a.substr(0,1).toUpperCase()+a.substr(1),typeof this["on"+a]==FUNCTION&&this["on"+a]()},_jsInit=function(){_util.Browser.isSafari()&&_d.body.addEventListener("click",_bodyClick),_jsDispatch.call(this,"init")},_jsChange=function(){_swfChange(),_jsDispatch.call(this,"change")},_update=function(a){_jsChange.call(this),a?_jsDispatch.call(this,"internalChange"):_jsDispatch.call(this,"externalChange"),_st(_functions.bind(_track,this),10)},_track=function(){var a=(_l.pathname+(/\/$/.test(_l.pathname)?"":"/")+this.getValue()).replace(/\/\//,"/").replace(/^\/$/,""),b=_t[_opts.tracker];typeof b==FUNCTION?b(a):typeof _t.pageTracker!=UNDEFINED&&typeof _t.pageTracker._trackPageview==FUNCTION?_t.pageTracker._trackPageview(a):typeof _t.urchinTracker==FUNCTION&&_t.urchinTracker(a)},_htmlWrite=function(){var a=_frame.contentWindow.document;a.open(),a.write("<html><head><title>"+_d.title+"</title><script>var "+ID+' = "'+_getHash()+'";</script></head></html>'),a.close()},_htmlLoad=function(){var a=_frame.contentWindow,b=a.location.href;_value=typeof a[ID]!=UNDEFINED?a[ID]:"",_value!=_getHash()&&(_update.call(SWFAddress,!1),_l.hash=_ieLocal(_value,TRUE))},_load=function(){if(!_loaded){_loaded=TRUE;if(_msie&&_version<8){var a=_d.getElementsByTagName("frameset")[0];_frame=_d.createElement((a?"":"i")+"frame"),a?(a.insertAdjacentElement("beforeEnd",_frame),a[a.cols?"cols":"rows"]+=",0",_frame.src="javascript:false",_frame.noResize=!0,_frame.frameBorder=_frame.frameSpacing=0):(_frame.src="javascript:false",_frame.style.display="none",_d.body.insertAdjacentElement("afterBegin",_frame)),_st(function(){_events.addListener(_frame,"load",_htmlLoad),typeof _frame.contentWindow[ID]==UNDEFINED&&_htmlWrite()},50)}else _safari&&(_version<418&&(_d.body.innerHTML+='<form id="'+ID+'" style="position:absolute;top:-9999px;" method="get"></form>',_form=_d.getElementById(ID)),typeof _l[ID]==UNDEFINED&&(_l[ID]={}),typeof _l[ID][_l.pathname]!=UNDEFINED&&(_stack=_l[ID][_l.pathname].split(",")));_st(_functions.bind(function(){_jsInit.call(this),_jsChange.call(this),_track.call(this)},this),1),_msie&&_version>=8?(_d.body.onhashchange=_functions.bind(_listen,this),_si(_functions.bind(_titleCheck,this),50)):_si(_functions.bind(_listen,this),50)}},ID="swfaddress",FUNCTION="function",UNDEFINED="undefined",TRUE=!0,FALSE=!1,_util=asual.util,_browser=_util.Browser,_events=_util.Events,_functions=_util.Functions,_version=_browser.getVersion(),_msie=_browser.isMSIE(),_mozilla=_browser.isMozilla(),_opera=_browser.isOpera(),_safari=_browser.isSafari(),_supported=FALSE,_t=_getWindow(),_d=_t.document,_h=_t.history,_l=_t.location,_si=setInterval,_st=setTimeout,_dc=decodeURI,_ec=encodeURI,_frame,_form,_url,_title=_d.title,_length=_h.length,_silent=FALSE,_loaded=FALSE,_justset=TRUE,_juststart=TRUE,_ref=this,_stack=[],_ids=[],_popup=[],_listeners={},_value=_getHash(),_opts={history:TRUE,strict:TRUE};_msie&&_d.documentMode&&_d.documentMode!=_version&&(_version=_d.documentMode!=8?7:8),_supported=_mozilla&&_version>=1||_msie&&_version>=6||_opera&&_version>=9.5||_safari&&_version>=312;if(_supported){_opera&&(history.navigationMode="compatible");for(var i=1;i<_length;i++)_stack.push("");_stack.push(_getHash()),_msie&&_l.hash!=_getHash()&&(_l.hash="#"+_ieLocal(_getHash(),TRUE)),_searchScript(document);var _qi=_url?_url.indexOf("?"):-1;if(_qi!=-1){var param,params=_url.substr(_qi+1).split("&");for(var i=0,p;p=params[i];i++)param=p.split("="),/^(history|strict)$/.test(param[0])&&(_opts[param[0]]=isNaN(param[1])?/^(true|yes)$/i.test(param[1]):parseInt(param[1])!=0),/^tracker$/.test(param[0])&&(_opts[param[0]]=param[1])}_msie&&_titleCheck.call(this),window==_t&&_events.addListener(document,"DOMContentLoaded",_functions.bind(_load,this)),_events.addListener(_t,"load",_functions.bind(_load,this))}else!_supported&&_l.href.indexOf("#")!=-1||_safari&&_version<418&&_l.href.indexOf("#")!=-1&&_l.search!=""?(_d.open(),_d.write('<html><head><meta http-equiv="refresh" content="0;url='+_l.href.substr(0,_l.href.indexOf("#"))+'" /></head></html>'),_d.close()):_track();this.toString=function(){return"[class SWFAddress]"},this.back=function(){_h.back()},this.forward=function(){_h.forward()},this.up=function(){var a=this.getPath();this.setValue(a.substr(0,a.lastIndexOf("/",a.length-2)+(a.substr(a.length-1)=="/"?1:0)))},this.go=function(a){_h.go(a)},this.href=function(a,b){b=typeof b!=UNDEFINED?b:"_self",b=="_self"?self.location.href=a:b=="_top"?_l.href=a:b=="_blank"?window.open(a):_t.frames[b].location.href=a},this.popup=function(url,name,options,handler){try{var popup=window.open(url,name,eval(options));typeof handler!=UNDEFINED&&eval(handler)}catch(ex){}_popup=arguments},this.getIds=function(){return _ids},this.getId=function(a){return _ids[0]},this.setId=function(a){_ids[0]=a},this.addId=function(a){this.removeId(a),_ids.push(a)},this.removeId=function(a){for(var b=0;b<_ids.length;b++)if(a==_ids[b]){_ids.splice(b,1);break}},this.addEventListener=function(a,b){typeof _listeners[a]==UNDEFINED&&(_listeners[a]=[]),_listeners[a].push(b)},this.removeEventListener=function(a,b){if(typeof _listeners[a]!=UNDEFINED){for(var c=0,d;d=_listeners[a][c];c++)if(d==b)break;_listeners[a].splice(c,1)}},this.dispatchEvent=function(a){if(this.hasEventListener(a.type)){a.target=this;for(var b=0,c;c=_listeners[a.type][b];b++)c(a);return TRUE}return FALSE},this.hasEventListener=function(a){return typeof _listeners[a]!=UNDEFINED&&_listeners[a].length>0},this.getBaseURL=function(){var a=_l.href;a.indexOf("#")!=-1&&(a=a.substr(0,a.indexOf("#"))),a.substr(a.length-1)=="/"&&(a=a.substr(0,a.length-1));return a},this.getStrict=function(){return _opts.strict},this.setStrict=function(a){_opts.strict=a},this.getHistory=function(){return _opts.history},this.setHistory=function(a){_opts.history=a},this.getTracker=function(){return _opts.tracker},this.setTracker=function(a){_opts.tracker=a},this.getTitle=function(){return _d.title},this.setTitle=function(a){if(!_supported)return null;typeof a!=UNDEFINED&&(a=="null"&&(a=""),a=_dc(a),_st(function(){_title=_d.title=a,_juststart&&_frame&&_frame.contentWindow&&_frame.contentWindow.document&&(_frame.contentWindow.document.title=a,_juststart=FALSE),!_justset&&_mozilla&&_l.replace(_l.href.indexOf("#")!=-1?_l.href:_l.href+"#"),_justset=FALSE},10))},this.getStatus=function(){return _t.status},this.setStatus=function(a){if(!_supported)return null;if(typeof a!=UNDEFINED){a=="null"&&(a=""),a=_dc(a);if(!_safari){a=_strictCheck(a!="null"?a:"",TRUE),a=="/"&&(a="");if(!/http(s)?:\/\//.test(a)){var b=_l.href.indexOf("#");a=(b==-1?_l.href:_l.href.substr(0,b))+"#"+a}_t.status=a}}},this.resetStatus=function(){_t.status=""},this.getValue=function(){if(!_supported)return null;return _dc(_strictCheck(_ieLocal(_value,FALSE),FALSE))},this.setValue=function(a){if(!_supported)return null;if(typeof a!=UNDEFINED){a=="null"&&(a="/"),a=_ec(_dc(_strictCheck(a,TRUE)));if(_value==a)return;_justset=TRUE,_value=a,_silent=TRUE,_update.call(SWFAddress,!0),_stack[_h.length]=_value;if(_safari)if(_opts.history){_l[ID][_l.pathname]=_stack.toString(),_length=_h.length+1;if(_version<418)_l.search==""&&(_form.action="#"+_value,_form.submit());else if(_version<523||_value==""){var b=_d.createEvent("MouseEvents");b.initEvent("click",TRUE,TRUE);var c=_d.createElement("a");c.href="#"+_value,c.dispatchEvent(b)}else _l.hash="#"+_value}else _l.replace("#"+_value);else _value!=_getHash()&&(_opts.history?_l.hash="#"+_dc(_ieLocal(_value,TRUE)):_l.replace("#"+_dc(_value)));_msie&&_version<8&&_opts.history&&_st(_htmlWrite,50),_safari?_st(function(){_silent=FALSE},1):_silent=FALSE}},this.getPath=function(){var a=this.getValue();return a.indexOf("?")!=-1?a.split("?")[0]:a.indexOf("#")!=-1?a.split("#")[0]:a},this.getPathNames=function(){var a=this.getPath(),b=a.split("/");(a.substr(0,1)=="/"||a.length==0)&&b.splice(0,1),a.substr(a.length-1,1)=="/"&&b.splice(b.length-1,1);return b},this.getQueryString=function(){var a=this.getValue(),b=a.indexOf("?");if(b!=-1&&b<a.length)return a.substr(b+1)},this.getParameter=function(a){var b=this.getValue(),c=b.indexOf("?");if(c!=-1){b=b.substr(c+1);var d,e=b.split("&"),f=e.length,g=[];while(f--)d=e[f].split("="),d[0]==a&&g.push(d[1]);if(g.length!=0)return g.length!=1?g:g[0]}},this.getParameterNames=function(){var a=this.getValue(),b=a.indexOf("?"),c=[];if(b!=-1){a=a.substr(b+1);if(a!=""&&a.indexOf("=")!=-1){var d=a.split("&"),e=0;while(e<d.length)c.push(d[e].split("=")[0]),e++}}return c},this.onInit=null,this.onChange=null,this.onInternalChange=null,this.onExternalChange=null,function(){var a;typeof FlashObject!=UNDEFINED&&(SWFObject=FlashObject);if(typeof SWFObject!=UNDEFINED&&SWFObject.prototype&&SWFObject.prototype.write){var b=SWFObject.prototype.write;SWFObject.prototype.write=function(){a=arguments,this.getAttribute("version").major<8&&(this.addVariable("$swfaddress",SWFAddress.getValue()),(typeof a[0]=="string"?document.getElementById(a[0]):a[0]).so=this);var c;(c=b.apply(this,a))&&_ref.addId(this.getAttribute("id"));return c}}if(typeof swfobject!=UNDEFINED){var c=swfobject.registerObject;swfobject.registerObject=function(){a=arguments,c.apply(this,a),_ref.addId(a[0])};var d=swfobject.createSWF;swfobject.createSWF=function(){a=arguments;var b=d.apply(this,a);b&&_ref.addId(a[0].id);return b};var e=swfobject.embedSWF;swfobject.embedSWF=function(){a=arguments,typeof a[8]==UNDEFINED&&(a[8]={}),typeof a[8].id==UNDEFINED&&(a[8].id=a[1]),e.apply(this,a),_ref.addId(a[8].id)}}if(typeof UFO!=UNDEFINED){var f=UFO.create;UFO.create=function(){a=arguments,f.apply(this,a),_ref.addId(a[0].id)}}if(typeof AC_FL_RunContent!=UNDEFINED){var g=AC_FL_RunContent;AC_FL_RunContent=function(){a=arguments,g.apply(this,a);for(var b=0,c=a.length;b<c;b++)a[b]=="id"&&_ref.addId(a[b+1])}}}()};SWFAddress.inited=!1,SWFAddress.addEventListener(SWFAddressEvent.INIT,handleSWFAddressInit)//mod for at&t app landing page.//This should probably be part of SWFAddress anyways. Just need a way to know if it's been initialized.SWFAddress.inited = false;function handleSWFAddressInit($event){	SWFAddress.inited = true;	SWFAddress.removeEventListener(SWFAddressEvent.INIT);}SWFAddress.addEventListener(SWFAddressEvent.INIT, handleSWFAddressInit);