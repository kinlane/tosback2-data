function Log(_1,_2,_3){
var _4=Log.WARN;
var _5=Log.writeLogger;
var _6=false;
this.setPrefix=function(_7){
if(_7!="undefined"){
_6=_7;
}else{
_6=false;
}
};
this.setLogger=function(_8){
if(_8!="undefined"){
_5=_8;
}
};
this.setLevel=function(_9){
if(_9!="undefined"&&typeof _9=="number"){
_4=_9;
}else{
if(_9!="undefined"){
if(_9=="debug"){
_4=Log.DEBUG;
}else{
if(_9=="info"){
_4=Log.INFO;
}else{
if(_9=="error"){
_4=Log.ERROR;
}else{
if(_9=="fatal"){
_4=Log.FATAL;
}else{
if(_9=="warn"){
_4=Log.WARN;
}else{
_4=Log.NONE;
}
}
}
}
}
}
}
currentLevel=Log.ERROR;
};
this.getPrefix=function(){
return _6;
};
this.getLogger=function(){
return _5;
};
this.getLevel=function(){
return _4;
};
if(_1!="undefined"){
this.setLevel(_1);
}
if(_2!="undefined"){
this.setLogger(_2);
}
if(_3!="undefined"){
this.setPrefix(_3);
}
}
Log.prototype.debug=function(s){
if(this.getLevel()<=Log.DEBUG){
this._log(s,"DEBUG",this);
}
};
Log.prototype.info=function(s){
if(this.getLevel()<=Log.INFO){
this._log(s,"INFO",this);
}
};
Log.prototype.warn=function(s){
if(this.getLevel()<=Log.WARN){
this._log(s,"WARN",this);
}
};
Log.prototype.error=function(s){
if(this.getLevel()<=Log.ERROR){
this._log(s,"ERROR",this);
}
};
Log.prototype.fatal=function(s){
if(this.getLevel()<=Log.FATAL){
this._log(s,"FATAL",this);
}
};
Log.prototype._log=function(_f,_10,obj){
if(this.getPrefix()){
this.getLogger()(this.getPrefix()+" - "+_f,_10,obj);
}else{
this.getLogger()(_f,_10,obj);
}
};
Log.DEBUG=1;
Log.INFO=2;
Log.WARN=3;
Log.ERROR=4;
Log.FATAL=5;
Log.NONE=6;
Log.alertLogger=function(msg,_13){
alert(_13+" - "+msg);
};
Log.writeLogger=function(msg,_15){
document.writeln(_15+"&nbsp;-&nbsp;"+msg+"<br/>");
};
Log.consoleLogger=function(msg,_17,obj){
if(window.console){
window.console.log(_17+" - "+msg);
}else{
Log.popupLogger(msg,_17,obj);
}
};
Log.popupLogger=function(msg,_1a,obj){
if(obj.popupBlocker){
return;
}
if(!obj._window||!obj._window.document){
obj._window=window.open("","logger_popup_window","width=620,height=320,scrollbars=1,status=0,toolbars=0,resizeable=1");
if(!obj._window){
obj.popupBlocker=true;
alert("You have a popup window manager blocking the log4js log popup display.\n\nThis must be disabled to properly see logged events.");
return;
}
if(!obj._window.document.getElementById("loggerTable")){
obj._window.document.writeln("<table width='100%' id='loggerTable'><tr><th align='left'>Time</th><th width='100%' colspan='2' align='left'>Message</th></tr></table>");
obj._window.document.close();
}
}
var tbl=obj._window.document.getElementById("loggerTable");
var row=tbl.insertRow(-1);
var _1e=row.insertCell(-1);
var _1f=row.insertCell(-1);
var _20=row.insertCell(-1);
var d=new Date();
var h=d.getHours();
if(h<10){
h="0"+h;
}
var m=d.getMinutes();
if(m<10){
m="0"+m;
}
var s=d.getSeconds();
if(s<10){
s="0"+s;
}
var _25=(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear()+"&nbsp;-&nbsp;"+h+":"+m+":"+s;
_1e.style.fontSize="8pt";
_1e.style.fontWeight="bold";
_1e.style.paddingRight="6px";
_1f.style.fontSize="8pt";
_20.style.fontSize="8pt";
_20.style.whiteSpace="nowrap";
_20.style.width="100%";
if(tbl.rows.length%2==0){
_1e.style.backgroundColor="#eeeeee";
_1f.style.backgroundColor="#eeeeee";
_20.style.backgroundColor="#eeeeee";
}
_1e.innerHTML=_25;
_1f.innerHTML=_1a;
_20.innerHTML=msg;
};
Log.dumpObject=function(obj,_27){
if(!_27){
_27="";
}
if(_27.length>20){
return;
}
var s="{\n";
for(var p in obj){
s+=_27+p+":";
var _2a=typeof (obj[p]);
_2a=_2a.toLowerCase();
if(_2a=="object"){
s+=Log.dumpObject(obj[p],_27+"----");
}else{
s+=obj[p];
}
s+="\n";
}
s+=_27+"}";
return s;
};
window.logger=new Log(Log.NONE,Log.popupLogger);
var Prototype={Version:"1.4.0",ScriptFragment:"(?:<script.*?>)((\n|\r|.)*?)(?:</script>)",emptyFunction:function(){
},K:function(x){
return x;
}};
var Class={create:function(){
return function(){
this.initialize.apply(this,arguments);
};
}};
var Abstract=new Object();
Object.extend=function(_2c,_2d){
for(property in _2d){
_2c[property]=_2d[property];
}
return _2c;
};
Object.inspect=function(_2e){
try{
if(_2e==undefined){
return "undefined";
}
if(_2e==null){
return "null";
}
return _2e.inspect?_2e.inspect():_2e.toString();
}
catch(e){
if(e instanceof RangeError){
return "...";
}
throw e;
}
};
Function.prototype.bind=function(){
var _2f=this,args=$A(arguments),object=args.shift();
return function(){
return _2f.apply(object,args.concat($A(arguments)));
};
};
Function.prototype.bindAsEventListener=function(_30){
var _31=this;
return function(_32){
return _31.call(_30,_32||window.event);
};
};
Object.extend(Number.prototype,{toColorPart:function(){
var _33=this.toString(16);
if(this<16){
return "0"+_33;
}
return _33;
},succ:function(){
return this+1;
},times:function(_34){
$R(0,this,true).each(_34);
return this;
}});
var Try={these:function(){
var _35;
for(var i=0;i<arguments.length;i++){
var _37=arguments[i];
try{
_35=_37();
break;
}
catch(e){
}
}
return _35;
}};
var PeriodicalExecuter=Class.create();
PeriodicalExecuter.prototype={initialize:function(_38,_39){
this.callback=_38;
this.frequency=_39;
this.currentlyExecuting=false;
this.registerCallback();
},registerCallback:function(){
setInterval(this.onTimerEvent.bind(this),this.frequency*1000);
},onTimerEvent:function(){
if(!this.currentlyExecuting){
try{
this.currentlyExecuting=true;
this.callback();
}
finally{
this.currentlyExecuting=false;
}
}
}};
function $(){
var _3a=new Array();
for(var i=0;i<arguments.length;i++){
var _3c=arguments[i];
if(typeof _3c=="string"){
_3c=document.getElementById(_3c);
}
if(arguments.length==1){
return _3c;
}
_3a.push(_3c);
}
return _3a;
}
Object.extend(String.prototype,{stripTags:function(){
return this.replace(/<\/?[^>]+>/gi,"");
},stripScripts:function(){
return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"");
},extractScripts:function(){
var _3d=new RegExp(Prototype.ScriptFragment,"img");
var _3e=new RegExp(Prototype.ScriptFragment,"im");
return (this.match(_3d)||[]).map(function(_3f){
return (_3f.match(_3e)||["",""])[1];
});
},evalScripts:function(){
return this.extractScripts().map(eval);
},escapeHTML:function(){
var div=document.createElement("div");
var _41=document.createTextNode(this);
div.appendChild(_41);
return div.innerHTML;
},unescapeHTML:function(){
var div=document.createElement("div");
div.innerHTML=this.stripTags();
return div.childNodes[0]?div.childNodes[0].nodeValue:"";
},toQueryParams:function(){
var _43=this.match(/^\??(.*)$/)[1].split("&");
return _43.inject({},function(_44,_45){
var _46=_45.split("=");
_44[_46[0]]=_46[1];
return _44;
});
},toArray:function(){
return this.split("");
},camelize:function(){
var _47=this.split("-");
if(_47.length==1){
return _47[0];
}
var _48=this.indexOf("-")==0?_47[0].charAt(0).toUpperCase()+_47[0].substring(1):_47[0];
for(var i=1,len=_47.length;i<len;i++){
var s=_47[i];
_48+=s.charAt(0).toUpperCase()+s.substring(1);
}
return _48;
},inspect:function(){
return "'"+this.replace("\\","\\\\").replace("'","\\'")+"'";
}});
String.prototype.parseQuery=String.prototype.toQueryParams;
var $break=new Object();
var $continue=new Object();
var Enumerable={each:function(_4b){
var _4c=0;
try{
this._each(function(_4d){
try{
_4b(_4d,_4c++);
}
catch(e){
if(e!=$continue){
throw e;
}
}
});
}
catch(e){
if(e!=$break){
throw e;
}
}
},all:function(_4e){
var _4f=true;
this.each(function(_50,_51){
_4f=_4f&&!!(_4e||Prototype.K)(_50,_51);
if(!_4f){
throw $break;
}
});
return _4f;
},any:function(_52){
var _53=true;
this.each(function(_54,_55){
if(_53=!!(_52||Prototype.K)(_54,_55)){
throw $break;
}
});
return _53;
},collect:function(_56){
var _57=[];
this.each(function(_58,_59){
_57.push(_56(_58,_59));
});
return _57;
},detect:function(_5a){
var _5b;
this.each(function(_5c,_5d){
if(_5a(_5c,_5d)){
_5b=_5c;
throw $break;
}
});
return _5b;
},findAll:function(_5e){
var _5f=[];
this.each(function(_60,_61){
if(_5e(_60,_61)){
_5f.push(_60);
}
});
return _5f;
},grep:function(_62,_63){
var _64=[];
this.each(function(_65,_66){
var _67=_65.toString();
if(_67.match(_62)){
_64.push((_63||Prototype.K)(_65,_66));
}
});
return _64;
},include:function(_68){
var _69=false;
this.each(function(_6a){
if(_6a==_68){
_69=true;
throw $break;
}
});
return _69;
},inject:function(_6b,_6c){
this.each(function(_6d,_6e){
_6b=_6c(_6b,_6d,_6e);
});
return _6b;
},invoke:function(_6f){
var _70=$A(arguments).slice(1);
return this.collect(function(_71){
return _71[_6f].apply(_71,_70);
});
},max:function(_72){
var _73;
this.each(function(_74,_75){
_74=(_72||Prototype.K)(_74,_75);
if(_74>=(_73||_74)){
_73=_74;
}
});
return _73;
},min:function(_76){
var _77;
this.each(function(_78,_79){
_78=(_76||Prototype.K)(_78,_79);
if(_78<=(_77||_78)){
_77=_78;
}
});
return _77;
},partition:function(_7a){
var _7b=[],falses=[];
this.each(function(_7c,_7d){
((_7a||Prototype.K)(_7c,_7d)?_7b:falses).push(_7c);
});
return [_7b,falses];
},pluck:function(_7e){
var _7f=[];
this.each(function(_80,_81){
_7f.push(_80[_7e]);
});
return _7f;
},reject:function(_82){
var _83=[];
this.each(function(_84,_85){
if(!_82(_84,_85)){
_83.push(_84);
}
});
return _83;
},sortBy:function(_86){
return this.collect(function(_87,_88){
return {value:_87,criteria:_86(_87,_88)};
}).sort(function(_89,_8a){
var a=_89.criteria,b=_8a.criteria;
return a<b?-1:a>b?1:0;
}).pluck("value");
},toArray:function(){
return this.collect(Prototype.K);
},zip:function(){
var _8c=Prototype.K,args=$A(arguments);
if(typeof args.last()=="function"){
_8c=args.pop();
}
var _8d=[this].concat(args).map($A);
return this.map(function(_8e,_8f){
_8c(_8e=_8d.pluck(_8f));
return _8e;
});
},inspect:function(){
return "#<Enumerable:"+this.toArray().inspect()+">";
}};
Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray});
var $A=Array.from=function(_90){
if(!_90){
return [];
}
if(_90.toArray){
return _90.toArray();
}else{
var _91=[];
for(var i=0;i<_90.length;i++){
_91.push(_90[i]);
}
return _91;
}
};
Object.extend(Array.prototype,Enumerable);
Array.prototype._reverse=Array.prototype.reverse;
Object.extend(Array.prototype,{_each:function(_93){
for(var i=0;i<this.length;i++){
_93(this[i]);
}
},clear:function(){
this.length=0;
return this;
},first:function(){
return this[0];
},last:function(){
return this[this.length-1];
},compact:function(){
return this.select(function(_95){
return _95!=undefined||_95!=null;
});
},flatten:function(){
return this.inject([],function(_96,_97){
return _96.concat(_97.constructor==Array?_97.flatten():[_97]);
});
},without:function(){
var _98=$A(arguments);
return this.select(function(_99){
return !_98.include(_99);
});
},indexOf:function(_9a){
for(var i=0;i<this.length;i++){
if(this[i]==_9a){
return i;
}
}
return -1;
},reverse:function(_9c){
return (_9c!==false?this:this.toArray())._reverse();
},shift:function(){
var _9d=this[0];
for(var i=0;i<this.length-1;i++){
this[i]=this[i+1];
}
this.length--;
return _9d;
},inspect:function(){
return "["+this.map(Object.inspect).join(", ")+"]";
}});
var Hash={_each:function(_9f){
for(key in this){
var _a0=this[key];
if(typeof _a0=="function"){
continue;
}
var _a1=[key,_a0];
_a1.key=key;
_a1.value=_a0;
_9f(_a1);
}
},keys:function(){
return this.pluck("key");
},values:function(){
return this.pluck("value");
},merge:function(_a2){
return $H(_a2).inject($H(this),function(_a3,_a4){
_a3[_a4.key]=_a4.value;
return _a3;
});
},toQueryString:function(){
return this.map(function(_a5){
return _a5.map(encodeURIComponent).join("=");
}).join("&");
},inspect:function(){
return "#<Hash:{"+this.map(function(_a6){
return _a6.map(Object.inspect).join(": ");
}).join(", ")+"}>";
}};
function $H(_a7){
var _a8=Object.extend({},_a7||{});
Object.extend(_a8,Enumerable);
Object.extend(_a8,Hash);
return _a8;
}
ObjectRange=Class.create();
Object.extend(ObjectRange.prototype,Enumerable);
Object.extend(ObjectRange.prototype,{initialize:function(_a9,end,_ab){
this.start=_a9;
this.end=end;
this.exclusive=_ab;
},_each:function(_ac){
var _ad=this.start;
do{
_ac(_ad);
_ad=_ad.succ();
}while(this.include(_ad));
},include:function(_ae){
if(_ae<this.start){
return false;
}
if(this.exclusive){
return _ae<this.end;
}
return _ae<=this.end;
}});
var $R=function(_af,end,_b1){
return new ObjectRange(_af,end,_b1);
};
var Ajax={getTransport:function(){
return Try.these(function(){
return new ActiveXObject("Msxml2.XMLHTTP");
},function(){
return new ActiveXObject("Microsoft.XMLHTTP");
},function(){
return new XMLHttpRequest();
})||false;
},activeRequestCount:0};
Ajax.Responders={responders:[],_each:function(_b2){
this.responders._each(_b2);
},register:function(_b3){
if(!this.include(_b3)){
this.responders.push(_b3);
}
},unregister:function(_b4){
this.responders=this.responders.without(_b4);
},dispatch:function(_b5,_b6,_b7,_b8){
this.each(function(_b9){
if(_b9[_b5]&&typeof _b9[_b5]=="function"){
try{
_b9[_b5].apply(_b9,[_b6,_b7,_b8]);
}
catch(e){
}
}
});
}};
Object.extend(Ajax.Responders,Enumerable);
Ajax.Responders.register({onCreate:function(){
Ajax.activeRequestCount++;
},onComplete:function(){
Ajax.activeRequestCount--;
}});
Ajax.Base=function(){
};
Ajax.Base.prototype={setOptions:function(_ba){
this.options={method:"post",asynchronous:true,parameters:""};
Object.extend(this.options,_ba||{});
},responseIsSuccess:function(){
return this.transport.status==undefined||this.transport.status==0||(this.transport.status>=200&&this.transport.status<300);
},responseIsFailure:function(){
return !this.responseIsSuccess();
}};
Ajax.Request=Class.create();
Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Request.prototype=Object.extend(new Ajax.Base(),{initialize:function(url,_bc){
this.transport=Ajax.getTransport();
this.aborted=false;
this.setOptions(_bc);
this.request(url);
},request:function(url){
var _be=this.options.parameters||"";
if(_be.length>0){
_be+="&_=";
}
try{
this.url=url;
if(this.options.method=="get"&&_be.length>0){
this.url+=(this.url.match(/\?/)?"&":"?")+_be;
}
Ajax.Responders.dispatch("onCreate",this,this.transport);
this.transport.open(this.options.method,this.url,this.options.asynchronous);
if(this.options.asynchronous){
this.transport.onreadystatechange=this.onStateChange.bind(this);
setTimeout((function(){
this.respondToReadyState(1);
}).bind(this),10);
}
this.setRequestHeaders();
if(this.options.requestTimeout){
this.requestTimer=setTimeout((function(){
this.abortRequest();
}).bind(this),this.options.requestTimeout*1000);
}
var _bf=this.options.postBody?this.options.postBody:_be;
this.transport.send(this.options.method=="post"?_bf:null);
}
catch(e){
this.dispatchException(e);
}
},abortRequest:function(){
this.aborted=true;
this.transport.abort();
},setRequestHeaders:function(){
var _c0=["X-Requested-With","XMLHttpRequest","X-Prototype-Version",Prototype.Version];
if(this.options.method=="post"){
_c0.push("Content-type","application/x-www-form-urlencoded");
if(this.transport.overrideMimeType){
_c0.push("Connection","close");
}
}
if(this.options.requestHeaders){
_c0.push.apply(_c0,this.options.requestHeaders);
}
for(var i=0;i<_c0.length;i+=2){
this.transport.setRequestHeader(_c0[i],_c0[i+1]);
}
},onStateChange:function(){
var _c2=this.transport.readyState;
if(_c2!=1){
this.respondToReadyState(this.transport.readyState);
}
},header:function(_c3){
try{
return this.transport.getResponseHeader(_c3);
}
catch(e){
}
},evalJSON:function(){
try{
return eval(this.header("X-JSON"));
}
catch(e){
}
},evalResponse:function(){
try{
return eval(this.transport.responseText);
}
catch(e){
this.dispatchException(e);
}
},respondToReadyState:function(_c4){
var _c5=Ajax.Request.Events[_c4];
var _c6=this.transport,json=this.evalJSON();
if(_c5=="Complete"){
if(this.requestTimer){
clearTimeout(this.requestTimer);
}
try{
(this.options["on"+this.transport.status]||this.options["on"+(this.responseIsSuccess()?"Success":"Failure")]||Prototype.emptyFunction)(_c6,json);
if(!this.aborted){
(this.options["on"+this.transport.status]||this.options["on"+(this.responseIsSuccess()?"Success":"Failure")]||Prototype.emptyFunction)(_c6,json);
}else{
(this.options["onTimeout"]||Prototype.emptyFunction)(_c6,json);
}
}
catch(e){
this.dispatchException(e);
}
if((this.header("Content-type")||"").match(/^text\/javascript/i)){
this.evalResponse();
}
}
try{
(this.options["on"+_c5]||Prototype.emptyFunction)(_c6,json);
Ajax.Responders.dispatch("on"+_c5,this,_c6,json);
}
catch(e){
this.dispatchException(e);
}
if(_c5=="Complete"){
this.transport.onreadystatechange=Prototype.emptyFunction;
}
},dispatchException:function(_c7){
(this.options.onException||Prototype.emptyFunction)(this,_c7);
Ajax.Responders.dispatch("onException",this,_c7);
}});
Ajax.Updater=Class.create();
Object.extend(Object.extend(Ajax.Updater.prototype,Ajax.Request.prototype),{initialize:function(_c8,url,_ca){
this.containers={success:_c8.success?$(_c8.success):$(_c8),failure:_c8.failure?$(_c8.failure):(_c8.success?null:$(_c8))};
this.transport=Ajax.getTransport();
this.setOptions(_ca);
var _cb=this.options.onComplete||Prototype.emptyFunction;
this.options.onComplete=(function(_cc,_cd){
this.updateContent();
_cb(_cc,_cd);
}).bind(this);
this.request(url);
},updateContent:function(){
var _ce=this.responseIsSuccess()?this.containers.success:this.containers.failure;
var _cf=this.transport.responseText;
if(!this.options.evalScripts){
_cf=_cf.stripScripts();
}
if(_ce){
if(this.options.insertion){
new this.options.insertion(_ce,_cf);
}else{
Element.update(_ce,_cf);
}
}
if(this.responseIsSuccess()){
if(this.onComplete){
setTimeout(this.onComplete.bind(this),10);
}
}
}});
Ajax.PeriodicalUpdater=Class.create();
Ajax.PeriodicalUpdater.prototype=Object.extend(new Ajax.Base(),{initialize:function(_d0,url,_d2){
this.setOptions(_d2);
this.onComplete=this.options.onComplete;
this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);
this.updater={};
this.container=_d0;
this.url=url;
this.start();
},start:function(){
this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent();
},stop:function(){
this.updater.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments);
},updateComplete:function(_d3){
if(this.options.decay){
this.decay=(_d3.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=_d3.responseText;
}
this.timer=setTimeout(this.onTimerEvent.bind(this),this.decay*this.frequency*1000);
},onTimerEvent:function(){
this.updater=new Ajax.Updater(this.container,this.url,this.options);
}});
document.getElementsByClassName=function(_d4,_d5){
var _d6=($(_d5)||document.body).getElementsByTagName("*");
return $A(_d6).inject([],function(_d7,_d8){
if(_d8.className.match(new RegExp("(^|\\s)"+_d4+"(\\s|$)"))){
_d7.push(_d8);
}
return _d7;
});
};
if(!window.Element){
var Element=new Object();
}
Object.extend(Element,{visible:function(_d9){
return $(_d9).style.display!="none";
},toggle:function(){
for(var i=0;i<arguments.length;i++){
var _db=$(arguments[i]);
Element[Element.visible(_db)?"hide":"show"](_db);
}
},hide:function(){
for(var i=0;i<arguments.length;i++){
var _dd=$(arguments[i]);
_dd.style.display="none";
}
},show:function(){
for(var i=0;i<arguments.length;i++){
var _df=$(arguments[i]);
_df.style.display="";
}
},remove:function(_e0){
_e0=$(_e0);
_e0.parentNode.removeChild(_e0);
},update:function(_e1,_e2){
$(_e1).innerHTML=_e2.stripScripts();
setTimeout(function(){
_e2.evalScripts();
},10);
},getHeight:function(_e3){
_e3=$(_e3);
return _e3.offsetHeight;
},classNames:function(_e4){
return new Element.ClassNames(_e4);
},hasClassName:function(_e5,_e6){
if(!(_e5=$(_e5))){
return;
}
return Element.classNames(_e5).include(_e6);
},addClassName:function(_e7,_e8){
if(!(_e7=$(_e7))){
return;
}
return Element.classNames(_e7).add(_e8);
},removeClassName:function(_e9,_ea){
if(!(_e9=$(_e9))){
return;
}
return Element.classNames(_e9).remove(_ea);
},cleanWhitespace:function(_eb){
_eb=$(_eb);
for(var i=0;i<_eb.childNodes.length;i++){
var _ed=_eb.childNodes[i];
if(_ed.nodeType==3&&!/\S/.test(_ed.nodeValue)){
Element.remove(_ed);
}
}
},empty:function(_ee){
return $(_ee).innerHTML.match(/^\s*$/);
},scrollTo:function(_ef){
_ef=$(_ef);
var x=_ef.x?_ef.x:_ef.offsetLeft,y=_ef.y?_ef.y:_ef.offsetTop;
window.scrollTo(x,y);
},getStyle:function(_f1,_f2){
_f1=$(_f1);
var _f3=_f1.style[_f2.camelize()];
if(!_f3){
if(document.defaultView&&document.defaultView.getComputedStyle){
var css=document.defaultView.getComputedStyle(_f1,null);
_f3=css?css.getPropertyValue(_f2):null;
}else{
if(_f1.currentStyle){
_f3=_f1.currentStyle[_f2.camelize()];
}
}
}
if(window.opera&&["left","top","right","bottom"].include(_f2)){
if(Element.getStyle(_f1,"position")=="static"){
_f3="auto";
}
}
return _f3=="auto"?null:_f3;
},setStyle:function(_f5,_f6){
_f5=$(_f5);
for(name in _f6){
_f5.style[name.camelize()]=_f6[name];
}
},getDimensions:function(_f7){
_f7=$(_f7);
if(Element.getStyle(_f7,"display")!="none"){
return {width:_f7.offsetWidth,height:_f7.offsetHeight};
}
var els=_f7.style;
var _f9=els.visibility;
var _fa=els.position;
els.visibility="hidden";
els.position="absolute";
els.display="";
var _fb=_f7.clientWidth;
var _fc=_f7.clientHeight;
els.display="none";
els.position=_fa;
els.visibility=_f9;
return {width:_fb,height:_fc};
},makePositioned:function(_fd){
_fd=$(_fd);
var pos=Element.getStyle(_fd,"position");
if(pos=="static"||!pos){
_fd._madePositioned=true;
_fd.style.position="relative";
if(window.opera){
_fd.style.top=0;
_fd.style.left=0;
}
}
},undoPositioned:function(_ff){
_ff=$(_ff);
if(_ff._madePositioned){
_ff._madePositioned=undefined;
_ff.style.position=_ff.style.top=_ff.style.left=_ff.style.bottom=_ff.style.right="";
}
},makeClipping:function(_100){
_100=$(_100);
if(_100._overflow){
return;
}
_100._overflow=_100.style.overflow;
if((Element.getStyle(_100,"overflow")||"visible")!="hidden"){
_100.style.overflow="hidden";
}
},undoClipping:function(_101){
_101=$(_101);
if(_101._overflow){
return;
}
_101.style.overflow=_101._overflow;
_101._overflow=undefined;
}});
var Toggle=new Object();
Toggle.display=Element.toggle;
Abstract.Insertion=function(_102){
this.adjacency=_102;
};
Abstract.Insertion.prototype={initialize:function(_103,_104){
this.element=$(_103);
this.content=_104.stripScripts();
if(this.adjacency&&this.element.insertAdjacentHTML){
try{
this.element.insertAdjacentHTML(this.adjacency,this.content);
}
catch(e){
if(this.element.tagName.toLowerCase()=="tbody"){
this.insertContent(this.contentFromAnonymousTable());
}else{
throw e;
}
}
}else{
this.range=this.element.ownerDocument.createRange();
if(this.initializeRange){
this.initializeRange();
}
this.insertContent([this.range.createContextualFragment(this.content)]);
}
setTimeout(function(){
_104.evalScripts();
},10);
},contentFromAnonymousTable:function(){
var div=document.createElement("div");
div.innerHTML="<table><tbody>"+this.content+"</tbody></table>";
return $A(div.childNodes[0].childNodes[0].childNodes);
}};
var Insertion=new Object();
Insertion.Before=Class.create();
Insertion.Before.prototype=Object.extend(new Abstract.Insertion("beforeBegin"),{initializeRange:function(){
this.range.setStartBefore(this.element);
},insertContent:function(_106){
_106.each((function(_107){
this.element.parentNode.insertBefore(_107,this.element);
}).bind(this));
}});
Insertion.Top=Class.create();
Insertion.Top.prototype=Object.extend(new Abstract.Insertion("afterBegin"),{initializeRange:function(){
this.range.selectNodeContents(this.element);
this.range.collapse(true);
},insertContent:function(_108){
_108.reverse(false).each((function(_109){
this.element.insertBefore(_109,this.element.firstChild);
}).bind(this));
}});
Insertion.Bottom=Class.create();
Insertion.Bottom.prototype=Object.extend(new Abstract.Insertion("beforeEnd"),{initializeRange:function(){
this.range.selectNodeContents(this.element);
this.range.collapse(this.element);
},insertContent:function(_10a){
_10a.each((function(_10b){
this.element.appendChild(_10b);
}).bind(this));
}});
Insertion.After=Class.create();
Insertion.After.prototype=Object.extend(new Abstract.Insertion("afterEnd"),{initializeRange:function(){
this.range.setStartAfter(this.element);
},insertContent:function(_10c){
_10c.each((function(_10d){
this.element.parentNode.insertBefore(_10d,this.element.nextSibling);
}).bind(this));
}});
Element.ClassNames=Class.create();
Element.ClassNames.prototype={initialize:function(_10e){
this.element=$(_10e);
},_each:function(_10f){
this.element.className.split(/\s+/).select(function(name){
return name.length>0;
})._each(_10f);
},set:function(_111){
this.element.className=_111;
},add:function(_112){
if(this.include(_112)){
return;
}
this.set(this.toArray().concat(_112).join(" "));
},remove:function(_113){
if(!this.include(_113)){
return;
}
this.set(this.select(function(_114){
return _114!=_113;
}).join(" "));
},toString:function(){
return this.toArray().join(" ");
}};
Object.extend(Element.ClassNames.prototype,Enumerable);
var Field={clear:function(){
for(var i=0;i<arguments.length;i++){
$(arguments[i]).value="";
}
},focus:function(_116){
$(_116).focus();
},present:function(){
for(var i=0;i<arguments.length;i++){
if($(arguments[i]).value==""){
return false;
}
}
return true;
},select:function(_118){
$(_118).select();
},activate:function(_119){
_119=$(_119);
_119.focus();
if(_119.select){
_119.select();
}
}};
var Form={serialize:function(form){
var _11b=Form.getElements($(form));
var _11c=new Array();
for(var i=0;i<_11b.length;i++){
var _11e=Form.Element.serialize(_11b[i]);
if(_11e){
_11c.push(_11e);
}
}
return _11c.join("&");
},getElements:function(form){
form=$(form);
var _120=new Array();
for(tagName in Form.Element.Serializers){
var _121=form.getElementsByTagName(tagName);
for(var j=0;j<_121.length;j++){
_120.push(_121[j]);
}
}
return _120;
},getInputs:function(form,_124,name){
form=$(form);
var _126=form.getElementsByTagName("input");
if(!_124&&!name){
return _126;
}
var _127=new Array();
for(var i=0;i<_126.length;i++){
var _129=_126[i];
if((_124&&_129.type!=_124)||(name&&_129.name!=name)){
continue;
}
_127.push(_129);
}
return _127;
},disable:function(form){
var _12b=Form.getElements(form);
for(var i=0;i<_12b.length;i++){
var _12d=_12b[i];
_12d.blur();
_12d.disabled="true";
}
},enable:function(form){
var _12f=Form.getElements(form);
for(var i=0;i<_12f.length;i++){
var _131=_12f[i];
_131.disabled="";
}
},findFirstElement:function(form){
return Form.getElements(form).find(function(_133){
return _133.type!="hidden"&&!_133.disabled&&["input","select","textarea"].include(_133.tagName.toLowerCase());
});
},focusFirstElement:function(form){
Field.activate(Form.findFirstElement(form));
},reset:function(form){
$(form).reset();
}};
Form.Element={serialize:function(_136){
_136=$(_136);
var _137=_136.tagName.toLowerCase();
var _138=Form.Element.Serializers[_137](_136);
if(_138){
var key=encodeURIComponent(_138[0]);
if(key.length==0){
return;
}
if(_138[1].constructor!=Array){
_138[1]=[_138[1]];
}
return _138[1].map(function(_13a){
return key+"="+encodeURIComponent(_13a);
}).join("&");
}
},getValue:function(_13b){
_13b=$(_13b);
var _13c=_13b.tagName.toLowerCase();
var _13d=Form.Element.Serializers[_13c](_13b);
if(_13d){
return _13d[1];
}
}};
Form.Element.Serializers={input:function(_13e){
switch(_13e.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.Serializers.textarea(_13e);
case "checkbox":
case "radio":
return Form.Element.Serializers.inputSelector(_13e);
}
return false;
},inputSelector:function(_13f){
if(_13f.checked){
return [_13f.name,_13f.value];
}
},textarea:function(_140){
return [_140.name,_140.value];
},select:function(_141){
return Form.Element.Serializers[_141.type=="select-one"?"selectOne":"selectMany"](_141);
},selectOne:function(_142){
var _143="",opt,index=_142.selectedIndex;
if(index>=0){
opt=_142.options[index];
_143=opt.value;
if(!_143&&!("value" in opt)){
_143=opt.text;
}
}
return [_142.name,_143];
},selectMany:function(_144){
var _145=new Array();
for(var i=0;i<_144.length;i++){
var opt=_144.options[i];
if(opt.selected){
var _148=opt.value;
if(!_148&&!("value" in opt)){
_148=opt.text;
}
_145.push(_148);
}
}
return [_144.name,_145];
}};
var $F=Form.Element.getValue;
Abstract.TimedObserver=function(){
};
Abstract.TimedObserver.prototype={initialize:function(_149,_14a,_14b){
this.frequency=_14a;
this.element=$(_149);
this.callback=_14b;
this.lastValue=this.getValue();
this.registerCallback();
},registerCallback:function(){
setInterval(this.onTimerEvent.bind(this),this.frequency*1000);
},onTimerEvent:function(){
var _14c=this.getValue();
if(this.lastValue!=_14c){
this.callback(this.element,_14c);
this.lastValue=_14c;
}
}};
Form.Element.Observer=Class.create();
Form.Element.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){
return Form.Element.getValue(this.element);
}});
Form.Observer=Class.create();
Form.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){
return Form.serialize(this.element);
}});
Abstract.EventObserver=function(){
};
Abstract.EventObserver.prototype={initialize:function(_14d,_14e){
this.element=$(_14d);
this.callback=_14e;
this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=="form"){
this.registerFormCallbacks();
}else{
this.registerCallback(this.element);
}
},onElementEvent:function(){
var _14f=this.getValue();
if(this.lastValue!=_14f){
this.callback(this.element,_14f);
this.lastValue=_14f;
}
},registerFormCallbacks:function(){
var _150=Form.getElements(this.element);
for(var i=0;i<_150.length;i++){
this.registerCallback(_150[i]);
}
},registerCallback:function(_152){
if(_152.type){
switch(_152.type.toLowerCase()){
case "checkbox":
case "radio":
Event.observe(_152,"click",this.onElementEvent.bind(this));
break;
case "password":
case "text":
case "textarea":
case "select-one":
case "select-multiple":
Event.observe(_152,"change",this.onElementEvent.bind(this));
break;
}
}
}};
Form.Element.EventObserver=Class.create();
Form.Element.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){
return Form.Element.getValue(this.element);
}});
Form.EventObserver=Class.create();
Form.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){
return Form.serialize(this.element);
}});
if(!window.Event){
var Event=new Object();
}
Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,element:function(_153){
return _153.target||_153.srcElement;
},isLeftClick:function(_154){
return (((_154.which)&&(_154.which==1))||((_154.button)&&(_154.button==1)));
},pointerX:function(_155){
return _155.pageX||(_155.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
},pointerY:function(_156){
return _156.pageY||(_156.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
},stop:function(_157){
if(_157.preventDefault){
_157.preventDefault();
_157.stopPropagation();
}else{
_157.returnValue=false;
_157.cancelBubble=true;
}
},findElement:function(_158,_159){
var _15a=Event.element(_158);
while(_15a.parentNode&&(!_15a.tagName||(_15a.tagName.toUpperCase()!=_159.toUpperCase()))){
_15a=_15a.parentNode;
}
return _15a;
},observers:false,_observeAndCache:function(_15b,name,_15d,_15e){
if(!this.observers){
this.observers=[];
}
if(_15b.addEventListener){
this.observers.push([_15b,name,_15d,_15e]);
_15b.addEventListener(name,_15d,_15e);
}else{
if(_15b.attachEvent){
this.observers.push([_15b,name,_15d,_15e]);
_15b.attachEvent("on"+name,_15d);
}
}
},unloadCache:function(){
if(!Event.observers){
return;
}
for(var i=0;i<Event.observers.length;i++){
Event.stopObserving.apply(this,Event.observers[i]);
Event.observers[i][0]=null;
}
Event.observers=false;
},observe:function(_160,name,_162,_163){
var _160=$(_160);
_163=_163||false;
if(name=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_160.attachEvent)){
name="keydown";
}
this._observeAndCache(_160,name,_162,_163);
},stopObserving:function(_164,name,_166,_167){
var _164=$(_164);
_167=_167||false;
if(name=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_164.detachEvent)){
name="keydown";
}
if(_164.removeEventListener){
_164.removeEventListener(name,_166,_167);
}else{
if(_164.detachEvent){
_164.detachEvent("on"+name,_166);
}
}
}});
Event.observe(window,"unload",Event.unloadCache,false);
var Position={includeScrollOffsets:false,prepare:function(){
this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
},realOffset:function(_168){
var _169=0,valueL=0;
do{
_169+=_168.scrollTop||0;
valueL+=_168.scrollLeft||0;
_168=_168.parentNode;
}while(_168);
return [valueL,_169];
},cumulativeOffset:function(_16a){
var _16b=0,valueL=0;
do{
_16b+=_16a.offsetTop||0;
valueL+=_16a.offsetLeft||0;
_16a=_16a.offsetParent;
}while(_16a);
return [valueL,_16b];
},positionedOffset:function(_16c){
var _16d=0,valueL=0;
do{
_16d+=_16c.offsetTop||0;
valueL+=_16c.offsetLeft||0;
_16c=_16c.offsetParent;
if(_16c){
p=Element.getStyle(_16c,"position");
if(p=="relative"||p=="absolute"){
break;
}
}
}while(_16c);
return [valueL,_16d];
},offsetParent:function(_16e){
if(_16e.offsetParent){
return _16e.offsetParent;
}
if(_16e==document.body){
return _16e;
}
while((_16e=_16e.parentNode)&&_16e!=document.body){
if(Element.getStyle(_16e,"position")!="static"){
return _16e;
}
}
return document.body;
},within:function(_16f,x,y){
if(this.includeScrollOffsets){
return this.withinIncludingScrolloffsets(_16f,x,y);
}
this.xcomp=x;
this.ycomp=y;
this.offset=this.cumulativeOffset(_16f);
return (y>=this.offset[1]&&y<this.offset[1]+_16f.offsetHeight&&x>=this.offset[0]&&x<this.offset[0]+_16f.offsetWidth);
},withinIncludingScrolloffsets:function(_172,x,y){
var _175=this.realOffset(_172);
this.xcomp=x+_175[0]-this.deltaX;
this.ycomp=y+_175[1]-this.deltaY;
this.offset=this.cumulativeOffset(_172);
return (this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+_172.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+_172.offsetWidth);
},overlap:function(mode,_177){
if(!mode){
return 0;
}
if(mode=="vertical"){
return ((this.offset[1]+_177.offsetHeight)-this.ycomp)/_177.offsetHeight;
}
if(mode=="horizontal"){
return ((this.offset[0]+_177.offsetWidth)-this.xcomp)/_177.offsetWidth;
}
},clone:function(_178,_179){
_178=$(_178);
_179=$(_179);
_179.style.position="absolute";
var _17a=this.cumulativeOffset(_178);
_179.style.top=_17a[1]+"px";
_179.style.left=_17a[0]+"px";
_179.style.width=_178.offsetWidth+"px";
_179.style.height=_178.offsetHeight+"px";
},page:function(_17b){
var _17c=0,valueL=0;
var _17d=_17b;
do{
_17c+=_17d.offsetTop||0;
valueL+=_17d.offsetLeft||0;
if(_17d.offsetParent==document.body){
if(Element.getStyle(_17d,"position")=="absolute"){
break;
}
}
}while(_17d=_17d.offsetParent);
_17d=_17b;
do{
_17c-=_17d.scrollTop||0;
valueL-=_17d.scrollLeft||0;
}while(_17d=_17d.parentNode);
return [valueL,_17c];
},clone:function(_17e,_17f){
var _180=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
_17e=$(_17e);
var p=Position.page(_17e);
_17f=$(_17f);
var _182=[0,0];
var _183=null;
if(Element.getStyle(_17f,"position")=="absolute"){
_183=Position.offsetParent(_17f);
_182=Position.page(_183);
}
if(_183==document.body){
_182[0]-=document.body.offsetLeft;
_182[1]-=document.body.offsetTop;
}
if(_180.setLeft){
_17f.style.left=(p[0]-_182[0]+_180.offsetLeft)+"px";
}
if(_180.setTop){
_17f.style.top=(p[1]-_182[1]+_180.offsetTop)+"px";
}
if(_180.setWidth){
_17f.style.width=_17e.offsetWidth+"px";
}
if(_180.setHeight){
_17f.style.height=_17e.offsetHeight+"px";
}
},absolutize:function(_184){
_184=$(_184);
if(_184.style.position=="absolute"){
return;
}
Position.prepare();
var _185=Position.positionedOffset(_184);
var top=_185[1];
var left=_185[0];
var _188=_184.clientWidth;
var _189=_184.clientHeight;
_184._originalLeft=left-parseFloat(_184.style.left||0);
_184._originalTop=top-parseFloat(_184.style.top||0);
_184._originalWidth=_184.style.width;
_184._originalHeight=_184.style.height;
_184.style.position="absolute";
_184.style.top=top+"px";
_184.style.left=left+"px";
_184.style.width=_188+"px";
_184.style.height=_189+"px";
},relativize:function(_18a){
_18a=$(_18a);
if(_18a.style.position=="relative"){
return;
}
Position.prepare();
_18a.style.position="relative";
var top=parseFloat(_18a.style.top||0)-(_18a._originalTop||0);
var left=parseFloat(_18a.style.left||0)-(_18a._originalLeft||0);
_18a.style.top=top+"px";
_18a.style.left=left+"px";
_18a.style.height=_18a._originalHeight;
_18a.style.width=_18a._originalWidth;
}};
if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){
Position.cumulativeOffset=function(_18d){
var _18e=0,valueL=0;
do{
_18e+=_18d.offsetTop||0;
valueL+=_18d.offsetLeft||0;
if(_18d.offsetParent==document.body){
if(Element.getStyle(_18d,"position")=="absolute"){
break;
}
}
_18d=_18d.offsetParent;
}while(_18d);
return [valueL,_18e];
};
}
var Rico={Version:"1.1.2",prototypeVersion:parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])};
if((typeof Prototype=="undefined")||Rico.prototypeVersion<1.3){
throw ("Rico requires the Prototype JavaScript framework >= 1.3");
}
Rico.ArrayExtensions=new Array();
if(Object.prototype.extend){
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Object.prototype.extend;
}else{
Object.prototype.extend=function(_18f){
return Object.extend.apply(this,[this,_18f]);
};
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Object.prototype.extend;
}
if(Array.prototype.push){
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Array.prototype.push;
}
if(!Array.prototype.remove){
Array.prototype.remove=function(dx){
if(isNaN(dx)||dx>this.length){
return false;
}
for(var i=0,n=0;i<this.length;i++){
if(i!=dx){
this[n++]=this[i];
}
}
this.length-=1;
};
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Array.prototype.remove;
}
if(!Array.prototype.removeItem){
Array.prototype.removeItem=function(item){
for(var i=0;i<this.length;i++){
if(this[i]==item){
this.remove(i);
break;
}
}
};
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Array.prototype.removeItem;
}
if(!Array.prototype.indices){
Array.prototype.indices=function(){
var _194=new Array();
for(index in this){
var _195=false;
for(var i=0;i<Rico.ArrayExtensions.length;i++){
if(this[index]==Rico.ArrayExtensions[i]){
_195=true;
break;
}
}
if(!_195){
_194[_194.length]=index;
}
}
return _194;
};
Rico.ArrayExtensions[Rico.ArrayExtensions.length]=Array.prototype.indices;
}
if(window.DOMParser&&window.XMLSerializer&&window.Node&&Node.prototype&&Node.prototype.__defineGetter__){
if(!Document.prototype.loadXML){
Document.prototype.loadXML=function(s){
var doc2=(new DOMParser()).parseFromString(s,"text/xml");
while(this.hasChildNodes()){
this.removeChild(this.lastChild);
}
for(var i=0;i<doc2.childNodes.length;i++){
this.appendChild(this.importNode(doc2.childNodes[i],true));
}
};
}
Document.prototype.__defineGetter__("xml",function(){
return (new XMLSerializer()).serializeToString(this);
});
}
document.getElementsByTagAndClassName=function(_19a,_19b){
if(_19a==null){
_19a="*";
}
var _19c=document.getElementsByTagName(_19a)||document.all;
var _19d=new Array();
if(_19b==null){
return _19c;
}
for(var i=0;i<_19c.length;i++){
var _19f=_19c[i];
var _1a0=_19f.className.split(" ");
for(var j=0;j<_1a0.length;j++){
if(_1a0[j]==_19b){
_19d.push(_19f);
break;
}
}
}
return _19d;
};
Rico.Accordion=Class.create();
Rico.Accordion.prototype={initialize:function(_1a2,_1a3){
this.container=$(_1a2);
this.lastExpandedTab=null;
this.accordionTabs=new Array();
this.setOptions(_1a3);
this._attachBehaviors();
if(!_1a2){
return;
}
this.container.style.borderBottom="1px solid "+this.options.borderColor;
if(this.options.onLoadShowTab>=this.accordionTabs.length){
this.options.onLoadShowTab=0;
}
for(var i=0;i<this.accordionTabs.length;i++){
if(i!=this.options.onLoadShowTab){
this.accordionTabs[i].collapse();
this.accordionTabs[i].content.style.display="none";
}
}
this.lastExpandedTab=this.accordionTabs[this.options.onLoadShowTab];
if(this.options.panelHeight=="auto"){
var _1a5=(this.options.onloadShowTab===0)?1:0;
var _1a6=parseInt(RicoUtil.getElementsComputedStyle(this.accordionTabs[_1a5].titleBar,"height"));
if(isNaN(_1a6)){
_1a6=this.accordionTabs[_1a5].titleBar.offsetHeight;
}
var _1a7=this.accordionTabs.length*_1a6;
var _1a8=parseInt(RicoUtil.getElementsComputedStyle(this.container.parentNode,"height"));
if(isNaN(_1a8)){
_1a8=this.container.parentNode.offsetHeight;
}
this.options.panelHeight=_1a8-_1a7-2;
}
this.lastExpandedTab.content.style.height=this.options.panelHeight+"px";
this.lastExpandedTab.showExpanded();
this.lastExpandedTab.titleBar.style.fontWeight=this.options.expandedFontWeight;
},setOptions:function(_1a9){
this.options={expandedBg:"#63699c",hoverBg:"#63699c",collapsedBg:"#6b79a5",expandedTextColor:"#ffffff",expandedFontWeight:"bold",hoverTextColor:"#ffffff",collapsedTextColor:"#ced7ef",collapsedFontWeight:"normal",hoverTextColor:"#ffffff",borderColor:"#1f669b",panelHeight:200,onHideTab:null,onShowTab:null,onLoadShowTab:0};
Object.extend(this.options,_1a9||{});
},showTabByIndex:function(_1aa,_1ab){
var _1ac=arguments.length==1?true:_1ab;
this.showTab(this.accordionTabs[_1aa],_1ac);
},showTab:function(_1ad,_1ae){
if(this.lastExpandedTab==_1ad){
return;
}
var _1af=arguments.length==1?true:_1ae;
if(this.options.onHideTab){
this.options.onHideTab(this.lastExpandedTab);
}
this.lastExpandedTab.showCollapsed();
var _1b0=this;
var _1b1=this.lastExpandedTab;
this.lastExpandedTab.content.style.height=(this.options.panelHeight-1)+"px";
_1ad.content.style.display="";
_1ad.titleBar.style.fontWeight=this.options.expandedFontWeight;
if(_1af){
new Rico.Effect.AccordionSize(this.lastExpandedTab.content,_1ad.content,1,this.options.panelHeight,100,10,{complete:function(){
_1b0.showTabDone(_1b1);
}});
this.lastExpandedTab=_1ad;
}else{
this.lastExpandedTab.content.style.height="1px";
_1ad.content.style.height=this.options.panelHeight+"px";
this.lastExpandedTab=_1ad;
this.showTabDone(_1b1);
}
},showTabDone:function(_1b2){
_1b2.content.style.display="none";
this.lastExpandedTab.showExpanded();
if(this.options.onShowTab){
this.options.onShowTab(this.lastExpandedTab);
}
},_attachBehaviors:function(){
var _1b3=this._getDirectChildrenByTag(this.container,"DIV");
for(var i=0;i<_1b3.length;i++){
var _1b5=this._getDirectChildrenByTag(_1b3[i],"DIV");
if(_1b5.length!=2){
continue;
}
var _1b6=_1b5[0];
var _1b7=_1b5[1];
this.accordionTabs.push(new Rico.Accordion.Tab(this,_1b6,_1b7));
}
},_getDirectChildrenByTag:function(e,_1b9){
var kids=new Array();
var _1bb=e.childNodes;
for(var i=0;i<_1bb.length;i++){
if(_1bb[i]&&_1bb[i].tagName&&_1bb[i].tagName==_1b9){
kids.push(_1bb[i]);
}
}
return kids;
}};
Rico.Accordion.Tab=Class.create();
Rico.Accordion.Tab.prototype={initialize:function(_1bd,_1be,_1bf){
this.accordion=_1bd;
this.titleBar=_1be;
this.content=_1bf;
this._attachBehaviors();
},collapse:function(){
this.showCollapsed();
this.content.style.height="1px";
},showCollapsed:function(){
this.expanded=false;
this.titleBar.style.backgroundColor=this.accordion.options.collapsedBg;
this.titleBar.style.color=this.accordion.options.collapsedTextColor;
this.titleBar.style.fontWeight=this.accordion.options.collapsedFontWeight;
this.content.style.overflow="hidden";
},showExpanded:function(){
this.expanded=true;
this.titleBar.style.backgroundColor=this.accordion.options.expandedBg;
this.titleBar.style.color=this.accordion.options.expandedTextColor;
this.content.style.overflow="auto";
},titleBarClicked:function(e){
if(this.accordion.lastExpandedTab==this){
return;
}
this.accordion.showTab(this);
},hover:function(e){
this.titleBar.style.backgroundColor=this.accordion.options.hoverBg;
this.titleBar.style.color=this.accordion.options.hoverTextColor;
},unhover:function(e){
if(this.expanded){
this.titleBar.style.backgroundColor=this.accordion.options.expandedBg;
this.titleBar.style.color=this.accordion.options.expandedTextColor;
}else{
this.titleBar.style.backgroundColor=this.accordion.options.collapsedBg;
this.titleBar.style.color=this.accordion.options.collapsedTextColor;
}
},_attachBehaviors:function(){
this.content.style.border="1px solid "+this.accordion.options.borderColor;
this.content.style.borderTopWidth="0px";
this.content.style.borderBottomWidth="0px";
this.content.style.margin="0px";
this.titleBar.onclick=this.titleBarClicked.bindAsEventListener(this);
this.titleBar.onmouseover=this.hover.bindAsEventListener(this);
this.titleBar.onmouseout=this.unhover.bindAsEventListener(this);
}};
Rico.AjaxEngine=Class.create();
Rico.AjaxEngine.prototype={initialize:function(){
this.ajaxElements=new Array();
this.ajaxObjects=new Array();
this.requestURLS=new Array();
this.options={};
},registerAjaxElement:function(anId,_1c4){
if(!_1c4){
_1c4=$(anId);
}
this.ajaxElements[anId]=_1c4;
},registerAjaxObject:function(anId,_1c6){
this.ajaxObjects[anId]=_1c6;
},registerRequest:function(_1c7,_1c8){
this.requestURLS[_1c7]=_1c8;
},sendRequest:function(_1c9,_1ca){
if(arguments.length>=2){
if(typeof arguments[1]=="string"){
_1ca={parameters:this._createQueryString(arguments,1)};
}
}
this.sendRequestWithData(_1c9,null,_1ca);
},sendRequestWithData:function(_1cb,_1cc,_1cd){
var _1ce=this.requestURLS[_1cb];
if(_1ce==null){
return;
}
if(arguments.length>=3){
if(typeof arguments[2]=="string"){
_1cd.parameters=this._createQueryString(arguments,2);
}
}
new Ajax.Request(_1ce,this._requestOptions(_1cd,_1cc));
},sendRequestAndUpdate:function(_1cf,_1d0,_1d1){
if(arguments.length>=3){
if(typeof arguments[2]=="string"){
_1d1.parameters=this._createQueryString(arguments,2);
}
}
this.sendRequestWithDataAndUpdate(_1cf,null,_1d0,_1d1);
},sendRequestWithDataAndUpdate:function(_1d2,_1d3,_1d4,_1d5){
var _1d6=this.requestURLS[_1d2];
if(_1d6==null){
return;
}
if(arguments.length>=4){
if(typeof arguments[3]=="string"){
_1d5.parameters=this._createQueryString(arguments,3);
}
}
var _1d7=this._requestOptions(_1d5,_1d3);
new Ajax.Updater(_1d4,_1d6,_1d7);
},_requestOptions:function(_1d8,_1d9){
var _1da=["X-Rico-Version",Rico.Version];
var _1db="post";
if(_1d9==null){
if(Rico.prototypeVersion<1.4){
_1da.push("Content-type","text/xml");
}else{
_1db="get";
}
}
(!_1d8)?_1d8={}:"";
if(!_1d8._RicoOptionsProcessed){
if(_1d8.onComplete){
_1d8.onRicoComplete=_1d8.onComplete;
}
if(_1d8.overrideOnComplete){
_1d8.onComplete=_1d8.overrideOnComplete;
}else{
_1d8.onComplete=this._onRequestComplete.bind(this);
}
_1d8._RicoOptionsProcessed=true;
}
this.options={requestHeaders:_1da,parameters:_1d8.parameters,postBody:_1d9,method:_1db,onComplete:_1d8.onComplete};
Object.extend(this.options,_1d8);
return this.options;
},_createQueryString:function(_1dc,_1dd){
var _1de="";
for(var i=_1dd;i<_1dc.length;i++){
if(i!=_1dd){
_1de+="&";
}
var _1e0=_1dc[i];
if(_1e0.name!=undefined&&_1e0.value!=undefined){
_1de+=_1e0.name+"="+escape(_1e0.value);
}else{
var ePos=_1e0.indexOf("=");
var _1e2=_1e0.substring(0,ePos);
var _1e3=_1e0.substring(ePos+1);
_1de+=_1e2+"="+escape(_1e3);
}
}
return _1de;
},_onRequestComplete:function(_1e4){
if(!_1e4){
return;
}
if(_1e4.status!=200){
return;
}
var _1e5=_1e4.responseXML.getElementsByTagName("ajax-response");
if(_1e5==null||_1e5.length!=1){
return;
}
this._processAjaxResponse(_1e5[0].childNodes);
var _1e6=this.options.onRicoComplete;
if(_1e6!=null){
_1e6();
}
},_processAjaxResponse:function(_1e7){
for(var i=0;i<_1e7.length;i++){
var _1e9=_1e7[i];
if(_1e9.nodeType!=1){
continue;
}
var _1ea=_1e9.getAttribute("type");
var _1eb=_1e9.getAttribute("id");
if(_1ea=="object"){
this._processAjaxObjectUpdate(this.ajaxObjects[_1eb],_1e9);
}else{
if(_1ea=="element"){
this._processAjaxElementUpdate(this.ajaxElements[_1eb],_1e9);
}else{
alert("unrecognized AjaxResponse type : "+_1ea);
}
}
}
},_processAjaxObjectUpdate:function(_1ec,_1ed){
_1ec.ajaxUpdate(_1ed);
},_processAjaxElementUpdate:function(_1ee,_1ef){
_1ee.innerHTML=RicoUtil.getContentAsString(_1ef);
}};
var ajaxEngine=new Rico.AjaxEngine();
Rico.Color=Class.create();
Rico.Color.prototype={initialize:function(red,_1f1,blue){
this.rgb={r:red,g:_1f1,b:blue};
},setRed:function(r){
this.rgb.r=r;
},setGreen:function(g){
this.rgb.g=g;
},setBlue:function(b){
this.rgb.b=b;
},setHue:function(h){
var hsb=this.asHSB();
hsb.h=h;
this.rgb=Rico.Color.HSBtoRGB(hsb.h,hsb.s,hsb.b);
},setSaturation:function(s){
var hsb=this.asHSB();
hsb.s=s;
this.rgb=Rico.Color.HSBtoRGB(hsb.h,hsb.s,hsb.b);
},setBrightness:function(b){
var hsb=this.asHSB();
hsb.b=b;
this.rgb=Rico.Color.HSBtoRGB(hsb.h,hsb.s,hsb.b);
},darken:function(_1fc){
var hsb=this.asHSB();
this.rgb=Rico.Color.HSBtoRGB(hsb.h,hsb.s,Math.max(hsb.b-_1fc,0));
},brighten:function(_1fe){
var hsb=this.asHSB();
this.rgb=Rico.Color.HSBtoRGB(hsb.h,hsb.s,Math.min(hsb.b+_1fe,1));
},blend:function(_200){
this.rgb.r=Math.floor((this.rgb.r+_200.rgb.r)/2);
this.rgb.g=Math.floor((this.rgb.g+_200.rgb.g)/2);
this.rgb.b=Math.floor((this.rgb.b+_200.rgb.b)/2);
},isBright:function(){
var hsb=this.asHSB();
return this.asHSB().b>0.5;
},isDark:function(){
return !this.isBright();
},asRGB:function(){
return "rgb("+this.rgb.r+","+this.rgb.g+","+this.rgb.b+")";
},asHex:function(){
return "#"+this.rgb.r.toColorPart()+this.rgb.g.toColorPart()+this.rgb.b.toColorPart();
},asHSB:function(){
return Rico.Color.RGBtoHSB(this.rgb.r,this.rgb.g,this.rgb.b);
},toString:function(){
return this.asHex();
}};
Rico.Color.createFromHex=function(_202){
if(_202.length==4){
var _203=_202;
var _202="#";
for(var i=1;i<4;i++){
_202+=(_203.charAt(i)+_203.charAt(i));
}
}
if(_202.indexOf("#")==0){
_202=_202.substring(1);
}
var red=_202.substring(0,2);
var _206=_202.substring(2,4);
var blue=_202.substring(4,6);
return new Rico.Color(parseInt(red,16),parseInt(_206,16),parseInt(blue,16));
};
Rico.Color.createColorFromBackground=function(elem){
var _209=RicoUtil.getElementsComputedStyle($(elem),"backgroundColor","background-color");
if(_209=="transparent"&&elem.parentNode){
return Rico.Color.createColorFromBackground(elem.parentNode);
}
if(_209==null){
return new Rico.Color(255,255,255);
}
if(_209.indexOf("rgb(")==0){
var _20a=_209.substring(4,_209.length-1);
var _20b=_20a.split(",");
return new Rico.Color(parseInt(_20b[0]),parseInt(_20b[1]),parseInt(_20b[2]));
}else{
if(_209.indexOf("#")==0){
return Rico.Color.createFromHex(_209);
}else{
return new Rico.Color(255,255,255);
}
}
};
Rico.Color.HSBtoRGB=function(hue,_20d,_20e){
var red=0;
var _210=0;
var blue=0;
if(_20d==0){
red=parseInt(_20e*255+0.5);
_210=red;
blue=red;
}else{
var h=(hue-Math.floor(hue))*6;
var f=h-Math.floor(h);
var p=_20e*(1-_20d);
var q=_20e*(1-_20d*f);
var t=_20e*(1-(_20d*(1-f)));
switch(parseInt(h)){
case 0:
red=(_20e*255+0.5);
_210=(t*255+0.5);
blue=(p*255+0.5);
break;
case 1:
red=(q*255+0.5);
_210=(_20e*255+0.5);
blue=(p*255+0.5);
break;
case 2:
red=(p*255+0.5);
_210=(_20e*255+0.5);
blue=(t*255+0.5);
break;
case 3:
red=(p*255+0.5);
_210=(q*255+0.5);
blue=(_20e*255+0.5);
break;
case 4:
red=(t*255+0.5);
_210=(p*255+0.5);
blue=(_20e*255+0.5);
break;
case 5:
red=(_20e*255+0.5);
_210=(p*255+0.5);
blue=(q*255+0.5);
break;
}
}
return {r:parseInt(red),g:parseInt(_210),b:parseInt(blue)};
};
Rico.Color.RGBtoHSB=function(r,g,b){
var hue;
var _21b;
var _21c;
var cmax=(r>g)?r:g;
if(b>cmax){
cmax=b;
}
var cmin=(r<g)?r:g;
if(b<cmin){
cmin=b;
}
_21c=cmax/255;
if(cmax!=0){
_21b=(cmax-cmin)/cmax;
}else{
_21b=0;
}
if(_21b==0){
hue=0;
}else{
var redc=(cmax-r)/(cmax-cmin);
var _220=(cmax-g)/(cmax-cmin);
var _221=(cmax-b)/(cmax-cmin);
if(r==cmax){
hue=_221-_220;
}else{
if(g==cmax){
hue=2+redc-_221;
}else{
hue=4+_220-redc;
}
}
hue=hue/6;
if(hue<0){
hue=hue+1;
}
}
return {h:hue,s:_21b,b:_21c};
};
Rico.Corner={round:function(e,_223){
var e=$(e);
this._setOptions(_223);
var _224=this.options.color;
if(this.options.color=="fromElement"){
_224=this._background(e);
}
var _225=this.options.bgColor;
if(this.options.bgColor=="fromParent"){
_225=this._background(e.offsetParent);
}
this._roundCornersImpl(e,_224,_225);
},_roundCornersImpl:function(e,_227,_228){
if(this.options.border){
this._renderBorder(e,_228);
}
if(this._isTopRounded()){
this._roundTopCorners(e,_227,_228);
}
if(this._isBottomRounded()){
this._roundBottomCorners(e,_227,_228);
}
},_renderBorder:function(el,_22a){
var _22b="1px solid "+this._borderColor(_22a);
var _22c="border-left: "+_22b;
var _22d="border-right: "+_22b;
var _22e="style='"+_22c+";"+_22d+"'";
el.innerHTML="<div "+_22e+">"+el.innerHTML+"</div>";
},_roundTopCorners:function(el,_230,_231){
var _232=this._createCorner(_231);
for(var i=0;i<this.options.numSlices;i++){
_232.appendChild(this._createCornerSlice(_230,_231,i,"top"));
}
el.style.paddingTop=0;
el.insertBefore(_232,el.firstChild);
},_roundBottomCorners:function(el,_235,_236){
var _237=this._createCorner(_236);
for(var i=(this.options.numSlices-1);i>=0;i--){
_237.appendChild(this._createCornerSlice(_235,_236,i,"bottom"));
}
el.style.paddingBottom=0;
el.appendChild(_237);
},_createCorner:function(_239){
var _23a=document.createElement("div");
_23a.style.backgroundColor=(this._isTransparent()?"transparent":_239);
return _23a;
},_createCornerSlice:function(_23b,_23c,n,_23e){
var _23f=document.createElement("span");
var _240=_23f.style;
_240.backgroundColor=_23b;
_240.display="block";
_240.height="1px";
_240.overflow="hidden";
_240.fontSize="1px";
var _241=this._borderColor(_23b,_23c);
if(this.options.border&&n==0){
_240.borderTopStyle="solid";
_240.borderTopWidth="1px";
_240.borderLeftWidth="0px";
_240.borderRightWidth="0px";
_240.borderBottomWidth="0px";
_240.height="0px";
_240.borderColor=_241;
}else{
if(_241){
_240.borderColor=_241;
_240.borderStyle="solid";
_240.borderWidth="0px 1px";
}
}
if(!this.options.compact&&(n==(this.options.numSlices-1))){
_240.height="2px";
}
this._setMargin(_23f,n,_23e);
this._setBorder(_23f,n,_23e);
return _23f;
},_setOptions:function(_242){
this.options={corners:"all",color:"fromElement",bgColor:"fromParent",blend:true,border:false,compact:false};
Object.extend(this.options,_242||{});
this.options.numSlices=this.options.compact?2:4;
if(this._isTransparent()){
this.options.blend=false;
}
},_whichSideTop:function(){
if(this._hasString(this.options.corners,"all","top")){
return "";
}
if(this.options.corners.indexOf("tl")>=0&&this.options.corners.indexOf("tr")>=0){
return "";
}
if(this.options.corners.indexOf("tl")>=0){
return "left";
}else{
if(this.options.corners.indexOf("tr")>=0){
return "right";
}
}
return "";
},_whichSideBottom:function(){
if(this._hasString(this.options.corners,"all","bottom")){
return "";
}
if(this.options.corners.indexOf("bl")>=0&&this.options.corners.indexOf("br")>=0){
return "";
}
if(this.options.corners.indexOf("bl")>=0){
return "left";
}else{
if(this.options.corners.indexOf("br")>=0){
return "right";
}
}
return "";
},_borderColor:function(_243,_244){
if(_243=="transparent"){
return _244;
}else{
if(this.options.border){
return this.options.border;
}else{
if(this.options.blend){
return this._blend(_244,_243);
}else{
return "";
}
}
}
},_setMargin:function(el,n,_247){
var _248=this._marginSize(n);
var _249=_247=="top"?this._whichSideTop():this._whichSideBottom();
if(_249=="left"){
el.style.marginLeft=_248+"px";
el.style.marginRight="0px";
}else{
if(_249=="right"){
el.style.marginRight=_248+"px";
el.style.marginLeft="0px";
}else{
el.style.marginLeft=_248+"px";
el.style.marginRight=_248+"px";
}
}
},_setBorder:function(el,n,_24c){
var _24d=this._borderSize(n);
var _24e=_24c=="top"?this._whichSideTop():this._whichSideBottom();
if(_24e=="left"){
el.style.borderLeftWidth=_24d+"px";
el.style.borderRightWidth="0px";
}else{
if(_24e=="right"){
el.style.borderRightWidth=_24d+"px";
el.style.borderLeftWidth="0px";
}else{
el.style.borderLeftWidth=_24d+"px";
el.style.borderRightWidth=_24d+"px";
}
}
if(this.options.border!=false){
el.style.borderLeftWidth=_24d+"px";
}
el.style.borderRightWidth=_24d+"px";
},_marginSize:function(n){
if(this._isTransparent()){
return 0;
}
var _250=[5,3,2,1];
var _251=[3,2,1,0];
var _252=[2,1];
var _253=[1,0];
if(this.options.compact&&this.options.blend){
return _253[n];
}else{
if(this.options.compact){
return _252[n];
}else{
if(this.options.blend){
return _251[n];
}else{
return _250[n];
}
}
}
},_borderSize:function(n){
var _255=[5,3,2,1];
var _256=[2,1,1,1];
var _257=[1,0];
var _258=[0,2,0,0];
if(this.options.compact&&(this.options.blend||this._isTransparent())){
return 1;
}else{
if(this.options.compact){
return _257[n];
}else{
if(this.options.blend){
return _256[n];
}else{
if(this.options.border){
return _258[n];
}else{
if(this._isTransparent()){
return _255[n];
}
}
}
}
}
return 0;
},_hasString:function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>=0){
return true;
}
}
return false;
},_blend:function(c1,c2){
var cc1=Rico.Color.createFromHex(c1);
cc1.blend(Rico.Color.createFromHex(c2));
return cc1;
},_background:function(el){
try{
return Rico.Color.createColorFromBackground(el).asHex();
}
catch(err){
return "#ffffff";
}
},_isTransparent:function(){
return this.options.color=="transparent";
},_isTopRounded:function(){
return this._hasString(this.options.corners,"all","top","tl","tr");
},_isBottomRounded:function(){
return this._hasString(this.options.corners,"all","bottom","bl","br");
},_hasSingleTextChild:function(el){
return el.childNodes.length==1&&el.childNodes[0].nodeType==3;
}};
Rico.DragAndDrop=Class.create();
Rico.DragAndDrop.prototype={initialize:function(){
this.dropZones=new Array();
this.draggables=new Array();
this.currentDragObjects=new Array();
this.dragElement=null;
this.lastSelectedDraggable=null;
this.currentDragObjectVisible=false;
this.interestedInMotionEvents=false;
this._mouseDown=this._mouseDownHandler.bindAsEventListener(this);
this._mouseMove=this._mouseMoveHandler.bindAsEventListener(this);
this._mouseUp=this._mouseUpHandler.bindAsEventListener(this);
},registerDropZone:function(_260){
this.dropZones[this.dropZones.length]=_260;
},deregisterDropZone:function(_261){
var _262=new Array();
var j=0;
for(var i=0;i<this.dropZones.length;i++){
if(this.dropZones[i]!=_261){
_262[j++]=this.dropZones[i];
}
}
this.dropZones=_262;
},clearDropZones:function(){
this.dropZones=new Array();
},registerDraggable:function(_265){
this.draggables[this.draggables.length]=_265;
this._addMouseDownHandler(_265);
},clearSelection:function(){
for(var i=0;i<this.currentDragObjects.length;i++){
this.currentDragObjects[i].deselect();
}
this.currentDragObjects=new Array();
this.lastSelectedDraggable=null;
},hasSelection:function(){
return this.currentDragObjects.length>0;
},setStartDragFromElement:function(e,_268){
this.origPos=RicoUtil.toDocumentPosition(_268);
this.startx=e.screenX-this.origPos.x;
this.starty=e.screenY-this.origPos.y;
this.interestedInMotionEvents=this.hasSelection();
this._terminateEvent(e);
},updateSelection:function(_269,_26a){
if(!_26a){
this.clearSelection();
}
if(_269.isSelected()){
this.currentDragObjects.removeItem(_269);
_269.deselect();
if(_269==this.lastSelectedDraggable){
this.lastSelectedDraggable=null;
}
}else{
this.currentDragObjects[this.currentDragObjects.length]=_269;
_269.select();
this.lastSelectedDraggable=_269;
}
},_mouseDownHandler:function(e){
if(arguments.length==0){
e=event;
}
var _26c=e.which!=undefined;
if((_26c&&e.which!=1)||(!_26c&&e.button!=1)){
return;
}
var _26d=e.target?e.target:e.srcElement;
var _26e=_26d.draggable;
var _26f=_26d;
while(_26e==null&&_26f.parentNode){
_26f=_26f.parentNode;
_26e=_26f.draggable;
}
if(_26e==null){
return;
}
this.updateSelection(_26e,e.ctrlKey);
if(this.hasSelection()){
for(var i=0;i<this.dropZones.length;i++){
this.dropZones[i].clearPositionCache();
}
}
this.setStartDragFromElement(e,_26e.getMouseDownHTMLElement());
},_mouseMoveHandler:function(e){
var _272=e.which!=undefined;
if(!this.interestedInMotionEvents){
return;
}
if(!this.hasSelection()){
return;
}
if(!this.currentDragObjectVisible){
this._startDrag(e);
}
if(!this.activatedDropZones){
this._activateRegisteredDropZones();
}
this._updateDraggableLocation(e);
this._updateDropZonesHover(e);
this._terminateEvent(e);
},_makeDraggableObjectVisible:function(e){
if(!this.hasSelection()){
return;
}
var _274;
if(this.currentDragObjects.length>1){
_274=this.currentDragObjects[0].getMultiObjectDragGUI(this.currentDragObjects);
}else{
_274=this.currentDragObjects[0].getSingleObjectDragGUI();
}
if(RicoUtil.getElementsComputedStyle(_274,"position")!="absolute"){
_274.style.position="absolute";
}
if(_274.parentNode==null||_274.parentNode.nodeType==11){
document.body.appendChild(_274);
}
this.dragElement=_274;
this._updateDraggableLocation(e);
this.currentDragObjectVisible=true;
},_leftOffset:function(e){
return e.offsetX?document.body.scrollLeft:0;
},_topOffset:function(e){
return e.offsetY?document.body.scrollTop:0;
},_updateDraggableLocation:function(e){
var _278=this.dragElement.style;
_278.left=(e.screenX+this._leftOffset(e)-this.startx)+"px";
_278.top=(e.screenY+this._topOffset(e)-this.starty)+"px";
},_updateDropZonesHover:function(e){
var n=this.dropZones.length;
for(var i=0;i<n;i++){
if(!this._mousePointInDropZone(e,this.dropZones[i])){
this.dropZones[i].hideHover();
}
}
for(var i=0;i<n;i++){
if(this._mousePointInDropZone(e,this.dropZones[i])){
if(this.dropZones[i].canAccept(this.currentDragObjects)){
this.dropZones[i].showHover();
}
}
}
},_startDrag:function(e){
for(var i=0;i<this.currentDragObjects.length;i++){
this.currentDragObjects[i].startDrag();
}
this._makeDraggableObjectVisible(e);
},_mouseUpHandler:function(e){
if(!this.hasSelection()){
return;
}
var _27f=e.which!=undefined;
if((_27f&&e.which!=1)||(!_27f&&e.button!=1)){
return;
}
this.interestedInMotionEvents=false;
if(this.dragElement==null){
this._terminateEvent(e);
return;
}
if(this._placeDraggableInDropZone(e)){
this._completeDropOperation(e);
}else{
this._terminateEvent(e);
new Rico.Effect.Position(this.dragElement,this.origPos.x,this.origPos.y,200,20,{complete:this._doCancelDragProcessing.bind(this)});
}
Event.stopObserving(document.body,"mousemove",this._mouseMove);
Event.stopObserving(document.body,"mouseup",this._mouseUp);
},_retTrue:function(){
return true;
},_completeDropOperation:function(e){
if(this.dragElement!=this.currentDragObjects[0].getMouseDownHTMLElement()){
if(this.dragElement.parentNode!=null){
this.dragElement.parentNode.removeChild(this.dragElement);
}
}
this._deactivateRegisteredDropZones();
this._endDrag();
this.clearSelection();
this.dragElement=null;
this.currentDragObjectVisible=false;
this._terminateEvent(e);
},_doCancelDragProcessing:function(){
this._cancelDrag();
if(this.dragElement!=this.currentDragObjects[0].getMouseDownHTMLElement()&&this.dragElement){
if(this.dragElement.parentNode!=null){
this.dragElement.parentNode.removeChild(this.dragElement);
}
}
this._deactivateRegisteredDropZones();
this.dragElement=null;
this.currentDragObjectVisible=false;
},_placeDraggableInDropZone:function(e){
var _282=false;
var n=this.dropZones.length;
for(var i=0;i<n;i++){
if(this._mousePointInDropZone(e,this.dropZones[i])){
if(this.dropZones[i].canAccept(this.currentDragObjects)){
this.dropZones[i].hideHover();
this.dropZones[i].accept(this.currentDragObjects);
_282=true;
break;
}
}
}
return _282;
},_cancelDrag:function(){
for(var i=0;i<this.currentDragObjects.length;i++){
this.currentDragObjects[i].cancelDrag();
}
},_endDrag:function(){
for(var i=0;i<this.currentDragObjects.length;i++){
this.currentDragObjects[i].endDrag();
}
},_mousePointInDropZone:function(e,_288){
var _289=_288.getAbsoluteRect();
return e.clientX>_289.left+this._leftOffset(e)&&e.clientX<_289.right+this._leftOffset(e)&&e.clientY>_289.top+this._topOffset(e)&&e.clientY<_289.bottom+this._topOffset(e);
},_addMouseDownHandler:function(_28a){
htmlElement=_28a.getMouseDownHTMLElement();
if(htmlElement!=null){
htmlElement.ricoDraggable=_28a;
Event.observe(htmlElement,"mousedown",this._onmousedown.bindAsEventListener(this));
Event.observe(htmlElement,"mousedown",this._mouseDown);
}
},_activateRegisteredDropZones:function(){
var n=this.dropZones.length;
for(var i=0;i<n;i++){
var _28d=this.dropZones[i];
if(_28d.canAccept(this.currentDragObjects)){
_28d.activate();
}
}
this.activatedDropZones=true;
},_deactivateRegisteredDropZones:function(){
var n=this.dropZones.length;
for(var i=0;i<n;i++){
this.dropZones[i].deactivate();
}
this.activatedDropZones=false;
},_onmousedown:function(){
Event.observe(document.body,"mousemove",this._mouseMove);
Event.observe(document.body,"mouseup",this._mouseUp);
},_terminateEvent:function(e){
if(e.stopPropagation!=undefined){
e.stopPropagation();
}else{
if(e.cancelBubble!=undefined){
e.cancelBubble=true;
}
}
if(e.preventDefault!=undefined){
e.preventDefault();
}else{
e.returnValue=false;
}
},initializeEventHandlers:function(){
if(typeof document.implementation!="undefined"&&document.implementation.hasFeature("HTML","1.0")&&document.implementation.hasFeature("Events","2.0")&&document.implementation.hasFeature("CSS","2.0")){
document.addEventListener("mouseup",this._mouseUpHandler.bindAsEventListener(this),false);
document.addEventListener("mousemove",this._mouseMoveHandler.bindAsEventListener(this),false);
}else{
document.attachEvent("onmouseup",this._mouseUpHandler.bindAsEventListener(this));
document.attachEvent("onmousemove",this._mouseMoveHandler.bindAsEventListener(this));
}
}};
var dndMgr=new Rico.DragAndDrop();
dndMgr.initializeEventHandlers();
Rico.Draggable=Class.create();
Rico.Draggable.prototype={initialize:function(type,_292){
this.type=type;
this.htmlElement=$(_292);
this.selected=false;
},getMouseDownHTMLElement:function(){
return this.htmlElement;
},select:function(){
this.selected=true;
if(this.showingSelected){
return;
}
var _293=this.getMouseDownHTMLElement();
var _294=Rico.Color.createColorFromBackground(_293);
_294.isBright()?_294.darken(0.033):_294.brighten(0.033);
this.saveBackground=RicoUtil.getElementsComputedStyle(_293,"backgroundColor","background-color");
_293.style.backgroundColor=_294.asHex();
this.showingSelected=true;
},deselect:function(){
this.selected=false;
if(!this.showingSelected){
return;
}
var _295=this.getMouseDownHTMLElement();
_295.style.backgroundColor=this.saveBackground;
this.showingSelected=false;
},isSelected:function(){
return this.selected;
},startDrag:function(){
},cancelDrag:function(){
},endDrag:function(){
},getSingleObjectDragGUI:function(){
return this.htmlElement;
},getMultiObjectDragGUI:function(_296){
return this.htmlElement;
},getDroppedGUI:function(){
return this.htmlElement;
},toString:function(){
return this.type+":"+this.htmlElement+":";
}};
Rico.Dropzone=Class.create();
Rico.Dropzone.prototype={initialize:function(_297){
this.htmlElement=$(_297);
this.absoluteRect=null;
},getHTMLElement:function(){
return this.htmlElement;
},clearPositionCache:function(){
this.absoluteRect=null;
},getAbsoluteRect:function(){
if(this.absoluteRect==null){
var _298=this.getHTMLElement();
if(navigator.userAgent.toLowerCase().indexOf("msie")==-1){
var pos=RicoUtil.toViewportPosition(_298);
}else{
var pos=RicoUtil.toDocumentPosition(_298);
}
this.absoluteRect={top:pos.y,left:pos.x,bottom:pos.y+_298.offsetHeight,right:pos.x+_298.offsetWidth};
}
return this.absoluteRect;
},activate:function(){
var _29a=this.getHTMLElement();
if(_29a==null||this.showingActive){
return;
}
this.showingActive=true;
this.saveBackgroundColor=_29a.style.backgroundColor;
var _29b="#ffea84";
var _29c=Rico.Color.createColorFromBackground(_29a);
if(_29c==null){
_29a.style.backgroundColor=_29b;
}else{
_29c.isBright()?_29c.darken(0.2):_29c.brighten(0.2);
_29a.style.backgroundColor=_29c.asHex();
}
},deactivate:function(){
var _29d=this.getHTMLElement();
if(_29d==null||!this.showingActive){
return;
}
_29d.style.backgroundColor=this.saveBackgroundColor;
this.showingActive=false;
this.saveBackgroundColor=null;
},showHover:function(){
var _29e=this.getHTMLElement();
if(_29e==null||this.showingHover){
return;
}
this.saveBorderWidth=_29e.style.borderWidth;
this.saveBorderStyle=_29e.style.borderStyle;
this.saveBorderColor=_29e.style.borderColor;
this.showingHover=true;
_29e.style.borderWidth="1px";
_29e.style.borderStyle="solid";
_29e.style.borderColor="#ffff00";
},hideHover:function(){
var _29f=this.getHTMLElement();
if(_29f==null||!this.showingHover){
return;
}
_29f.style.borderWidth=this.saveBorderWidth;
_29f.style.borderStyle=this.saveBorderStyle;
_29f.style.borderColor=this.saveBorderColor;
this.showingHover=false;
},canAccept:function(_2a0){
return true;
},accept:function(_2a1){
var _2a2=this.getHTMLElement();
if(_2a2==null){
return;
}
n=_2a1.length;
for(var i=0;i<n;i++){
var _2a4=_2a1[i].getDroppedGUI();
if(RicoUtil.getElementsComputedStyle(_2a4,"position")=="absolute"){
_2a4.style.position="static";
_2a4.style.top="";
_2a4.style.top="";
}
_2a2.appendChild(_2a4);
}
}};
Rico.Effect={};
Rico.Effect.SizeAndPosition=Class.create();
Rico.Effect.SizeAndPosition.prototype={initialize:function(_2a5,x,y,w,h,_2aa,_2ab,_2ac){
this.element=$(_2a5);
this.x=x;
this.y=y;
this.w=w;
this.h=h;
this.duration=_2aa;
this.steps=_2ab;
this.options=arguments[7]||{};
this.sizeAndPosition();
},sizeAndPosition:function(){
if(this.isFinished()){
if(this.options.complete){
this.options.complete(this);
}
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _2ad=Math.round(this.duration/this.steps);
var _2ae=this.element.offsetLeft;
var _2af=this.element.offsetTop;
var _2b0=this.element.offsetWidth;
var _2b1=this.element.offsetHeight;
this.x=(this.x)?this.x:_2ae;
this.y=(this.y)?this.y:_2af;
this.w=(this.w)?this.w:_2b0;
this.h=(this.h)?this.h:_2b1;
var difX=this.steps>0?(this.x-_2ae)/this.steps:0;
var difY=this.steps>0?(this.y-_2af)/this.steps:0;
var difW=this.steps>0?(this.w-_2b0)/this.steps:0;
var difH=this.steps>0?(this.h-_2b1)/this.steps:0;
this.moveBy(difX,difY);
this.resizeBy(difW,difH);
this.duration-=_2ad;
this.steps--;
this.timer=setTimeout(this.sizeAndPosition.bind(this),_2ad);
},isFinished:function(){
return this.steps<=0;
},moveBy:function(difX,difY){
var _2b8=this.element.offsetLeft;
var _2b9=this.element.offsetTop;
var _2ba=parseInt(difX);
var _2bb=parseInt(difY);
var _2bc=this.element.style;
if(_2ba!=0){
_2bc.left=(_2b8+_2ba)+"px";
}
if(_2bb!=0){
_2bc.top=(_2b9+_2bb)+"px";
}
},resizeBy:function(difW,difH){
var _2bf=this.element.offsetWidth;
var _2c0=this.element.offsetHeight;
var _2c1=parseInt(difW);
var _2c2=parseInt(difH);
var _2c3=this.element.style;
if(_2c1!=0){
_2c3.width=(_2bf+_2c1)+"px";
}
if(_2c2!=0){
_2c3.height=(_2c0+_2c2)+"px";
}
}};
Rico.Effect.Size=Class.create();
Rico.Effect.Size.prototype={initialize:function(_2c4,w,h,_2c7,_2c8,_2c9){
new Rico.Effect.SizeAndPosition(_2c4,null,null,w,h,_2c7,_2c8,_2c9);
}};
Rico.Effect.Position=Class.create();
Rico.Effect.Position.prototype={initialize:function(_2ca,x,y,_2cd,_2ce,_2cf){
new Rico.Effect.SizeAndPosition(_2ca,x,y,null,null,_2cd,_2ce,_2cf);
}};
Rico.Effect.Round=Class.create();
Rico.Effect.Round.prototype={initialize:function(_2d0,_2d1,_2d2){
var _2d3=document.getElementsByTagAndClassName(_2d0,_2d1);
for(var i=0;i<_2d3.length;i++){
Rico.Corner.round(_2d3[i],_2d2);
}
}};
Rico.Effect.FadeTo=Class.create();
Rico.Effect.FadeTo.prototype={initialize:function(_2d5,_2d6,_2d7,_2d8,_2d9){
this.element=$(_2d5);
this.opacity=_2d6;
this.duration=_2d7;
this.steps=_2d8;
this.options=arguments[4]||{};
this.fadeTo();
},fadeTo:function(){
if(this.isFinished()){
if(this.options.complete){
this.options.complete(this);
}
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _2da=Math.round(this.duration/this.steps);
var _2db=this.getElementOpacity();
var _2dc=this.steps>0?(this.opacity-_2db)/this.steps:0;
this.changeOpacityBy(_2dc);
this.duration-=_2da;
this.steps--;
this.timer=setTimeout(this.fadeTo.bind(this),_2da);
},changeOpacityBy:function(v){
var _2de=this.getElementOpacity();
var _2df=Math.max(0,Math.min(_2de+v,1));
this.element.ricoOpacity=_2df;
this.element.style.filter="alpha(opacity:"+Math.round(_2df*100)+")";
this.element.style.opacity=_2df;
},isFinished:function(){
return this.steps<=0;
},getElementOpacity:function(){
if(this.element.ricoOpacity==undefined){
var _2e0=RicoUtil.getElementsComputedStyle(this.element,"opacity");
this.element.ricoOpacity=_2e0!=undefined?_2e0:1;
}
return parseFloat(this.element.ricoOpacity);
}};
Rico.Effect.AccordionSize=Class.create();
Rico.Effect.AccordionSize.prototype={initialize:function(e1,e2,_2e3,end,_2e5,_2e6,_2e7){
this.e1=$(e1);
this.e2=$(e2);
this.start=_2e3;
this.end=end;
this.duration=_2e5;
this.steps=_2e6;
this.options=arguments[6]||{};
this.accordionSize();
},accordionSize:function(){
if(this.isFinished()){
this.e1.style.height=this.start+"px";
this.e2.style.height=this.end+"px";
if(this.options.complete){
this.options.complete(this);
}
return;
}
if(this.timer){
clearTimeout(this.timer);
}
var _2e8=Math.round(this.duration/this.steps);
var diff=this.steps>0?(parseInt(this.e1.offsetHeight)-this.start)/this.steps:0;
this.resizeBy(diff);
this.duration-=_2e8;
this.steps--;
this.timer=setTimeout(this.accordionSize.bind(this),_2e8);
},isFinished:function(){
return this.steps<=0;
},resizeBy:function(diff){
var _2eb=this.e1.offsetHeight;
var _2ec=this.e2.offsetHeight;
var _2ed=parseInt(diff);
if(diff!=0){
this.e1.style.height=(_2eb-_2ed)+"px";
this.e2.style.height=(_2ec+_2ed)+"px";
}
}};
Rico.LiveGridMetaData=Class.create();
Rico.LiveGridMetaData.prototype={initialize:function(_2ee,_2ef,_2f0,_2f1){
this.pageSize=_2ee;
this.totalRows=_2ef;
this.setOptions(_2f1);
this.ArrowHeight=16;
this.columnCount=_2f0;
},setOptions:function(_2f2){
this.options={largeBufferSize:7,nearLimitFactor:0.2};
Object.extend(this.options,_2f2||{});
},getPageSize:function(){
return this.pageSize;
},getTotalRows:function(){
return this.totalRows;
},setTotalRows:function(n){
this.totalRows=n;
},getLargeBufferSize:function(){
return parseInt(this.options.largeBufferSize*this.pageSize);
},getLimitTolerance:function(){
return parseInt(this.getLargeBufferSize()*this.options.nearLimitFactor);
}};
Rico.LiveGridScroller=Class.create();
Rico.LiveGridScroller.prototype={initialize:function(_2f4,_2f5){
this.isIE=navigator.userAgent.toLowerCase().indexOf("msie")>=0;
this.liveGrid=_2f4;
this.metaData=_2f4.metaData;
this.createScrollBar();
this.scrollTimeout=null;
this.lastScrollPos=0;
this.viewPort=_2f5;
this.rows=new Array();
},isUnPlugged:function(){
return this.scrollerDiv.onscroll==null;
},plugin:function(){
this.scrollerDiv.onscroll=this.handleScroll.bindAsEventListener(this);
},unplug:function(){
this.scrollerDiv.onscroll=null;
},sizeIEHeaderHack:function(){
if(!this.isIE){
return;
}
var _2f6=$(this.liveGrid.tableId+"_header");
if(_2f6){
_2f6.rows[0].cells[0].style.width=(_2f6.rows[0].cells[0].offsetWidth+1)+"px";
}
},createScrollBar:function(){
var _2f7=this.liveGrid.viewPort.visibleHeight();
this.scrollerDiv=document.createElement("div");
var _2f8=this.scrollerDiv.style;
_2f8.borderRight=this.liveGrid.options.scrollerBorderRight;
_2f8.position="relative";
_2f8.left=this.isIE?"-6px":"-3px";
_2f8.width="19px";
_2f8.height=_2f7+"px";
_2f8.overflow="auto";
this.heightDiv=document.createElement("div");
this.heightDiv.style.width="1px";
this.heightDiv.style.height=parseInt(_2f7*this.metaData.getTotalRows()/this.metaData.getPageSize())+"px";
this.scrollerDiv.appendChild(this.heightDiv);
this.scrollerDiv.onscroll=this.handleScroll.bindAsEventListener(this);
var _2f9=this.liveGrid.table;
_2f9.parentNode.parentNode.insertBefore(this.scrollerDiv,_2f9.parentNode.nextSibling);
var _2fa=this.isIE?"mousewheel":"DOMMouseScroll";
Event.observe(_2f9,_2fa,function(evt){
if(evt.wheelDelta>=0||evt.detail<0){
this.scrollerDiv.scrollTop-=(2*this.viewPort.rowHeight);
}else{
this.scrollerDiv.scrollTop+=(2*this.viewPort.rowHeight);
}
this.handleScroll(false);
}.bindAsEventListener(this),false);
},updateSize:function(){
var _2fc=this.liveGrid.table;
var _2fd=this.viewPort.visibleHeight();
this.heightDiv.style.height=parseInt(_2fd*this.metaData.getTotalRows()/this.metaData.getPageSize())+"px";
},rowToPixel:function(_2fe){
return (_2fe/this.metaData.getTotalRows())*this.heightDiv.offsetHeight;
},moveScroll:function(_2ff){
this.scrollerDiv.scrollTop=this.rowToPixel(_2ff);
if(this.metaData.options.onscroll){
this.metaData.options.onscroll(this.liveGrid,_2ff);
}
},handleScroll:function(){
if(this.scrollTimeout){
clearTimeout(this.scrollTimeout);
}
var _300=this.lastScrollPos-this.scrollerDiv.scrollTop;
if(_300!=0){
var r=this.scrollerDiv.scrollTop%this.viewPort.rowHeight;
if(r!=0){
this.unplug();
if(_300<0){
this.scrollerDiv.scrollTop+=(this.viewPort.rowHeight-r);
}else{
this.scrollerDiv.scrollTop-=r;
}
this.plugin();
}
}
var _302=parseInt(this.scrollerDiv.scrollTop/this.viewPort.rowHeight);
this.liveGrid.requestContentRefresh(_302);
this.viewPort.scrollTo(this.scrollerDiv.scrollTop);
if(this.metaData.options.onscroll){
this.metaData.options.onscroll(this.liveGrid,_302);
}
this.scrollTimeout=setTimeout(this.scrollIdle.bind(this),1200);
this.lastScrollPos=this.scrollerDiv.scrollTop;
},scrollIdle:function(){
if(this.metaData.options.onscrollidle){
this.metaData.options.onscrollidle();
}
}};
Rico.LiveGridBuffer=Class.create();
Rico.LiveGridBuffer.prototype={initialize:function(_303,_304){
this.startPos=0;
this.size=0;
this.metaData=_303;
this.rows=new Array();
this.updateInProgress=false;
this.viewPort=_304;
this.maxBufferSize=_303.getLargeBufferSize()*2;
this.maxFetchSize=_303.getLargeBufferSize();
this.lastOffset=0;
},getBlankRow:function(){
if(!this.blankRow){
this.blankRow=new Array();
for(var i=0;i<this.metaData.columnCount;i++){
this.blankRow[i]="&nbsp;";
}
}
return this.blankRow;
},loadRows:function(_306){
var _307=_306.getElementsByTagName("rows")[0];
this.updateUI=_307.getAttribute("update_ui")=="true";
var _308=new Array();
var trs=_307.getElementsByTagName("tr");
for(var i=0;i<trs.length;i++){
var row=_308[i]=new Array();
var _30c=trs[i].getElementsByTagName("td");
for(var j=0;j<_30c.length;j++){
var cell=_30c[j];
var _30f=cell.getAttribute("convert_spaces")=="true";
var _310=RicoUtil.getContentAsString(cell);
row[j]=_30f?this.convertSpaces(_310):_310;
if(!row[j]){
row[j]="&nbsp;";
}
}
}
return _308;
},update:function(_311,_312){
var _313=this.loadRows(_311);
if(this.rows.length==0){
this.rows=_313;
this.size=this.rows.length;
this.startPos=_312;
return;
}
if(_312>this.startPos){
if(this.startPos+this.rows.length<_312){
this.rows=_313;
this.startPos=_312;
}else{
this.rows=this.rows.concat(_313.slice(0,_313.length));
if(this.rows.length>this.maxBufferSize){
var _314=this.rows.length;
this.rows=this.rows.slice(this.rows.length-this.maxBufferSize,this.rows.length);
this.startPos=this.startPos+(_314-this.rows.length);
}
}
}else{
if(_312+_313.length<this.startPos){
this.rows=_313;
}else{
this.rows=_313.slice(0,this.startPos).concat(this.rows);
if(this.rows.length>this.maxBufferSize){
this.rows=this.rows.slice(0,this.maxBufferSize);
}
}
this.startPos=_312;
}
this.size=this.rows.length;
},clear:function(){
this.rows=new Array();
this.startPos=0;
this.size=0;
},isOverlapping:function(_315,size){
return ((_315<this.endPos())&&(this.startPos<_315+size))||(this.endPos()==0);
},isInRange:function(_317){
return (_317>=this.startPos)&&(_317+this.metaData.getPageSize()<=this.endPos());
},isNearingTopLimit:function(_318){
return _318-this.startPos<this.metaData.getLimitTolerance();
},endPos:function(){
return this.startPos+this.rows.length;
},isNearingBottomLimit:function(_319){
return this.endPos()-(_319+this.metaData.getPageSize())<this.metaData.getLimitTolerance();
},isAtTop:function(){
return this.startPos==0;
},isAtBottom:function(){
return this.endPos()==this.metaData.getTotalRows();
},isNearingLimit:function(_31a){
return (!this.isAtTop()&&this.isNearingTopLimit(_31a))||(!this.isAtBottom()&&this.isNearingBottomLimit(_31a));
},getFetchSize:function(_31b){
var _31c=this.getFetchOffset(_31b);
var _31d=0;
if(_31c>=this.startPos){
var _31e=this.maxFetchSize+_31c;
if(_31e>this.metaData.totalRows){
_31e=this.metaData.totalRows;
}
_31d=_31e-_31c;
if(_31c==0&&_31d<this.maxFetchSize){
_31d=this.maxFetchSize;
}
}else{
var _31d=this.startPos-_31c;
if(_31d>this.maxFetchSize){
_31d=this.maxFetchSize;
}
}
return _31d;
},getFetchOffset:function(_31f){
var _320=_31f;
if(_31f>this.startPos){
_320=(_31f>this.endPos())?_31f:this.endPos();
}else{
if(_31f+this.maxFetchSize>=this.startPos){
var _320=this.startPos-this.maxFetchSize;
if(_320<0){
_320=0;
}
}
}
this.lastOffset=_320;
return _320;
},getRows:function(_321,_322){
var _323=_321-this.startPos;
var _324=_323+_322;
if(_324>this.size){
_324=this.size;
}
var _325=new Array();
var _326=0;
for(var i=_323;i<_324;i++){
_325[_326++]=this.rows[i];
}
return _325;
},convertSpaces:function(s){
return s.split(" ").join("&nbsp;");
}};
Rico.GridViewPort=Class.create();
Rico.GridViewPort.prototype={initialize:function(_329,_32a,_32b,_32c,_32d){
this.lastDisplayedStartPos=0;
this.div=_329.parentNode;
this.table=_329;
this.rowHeight=_32a;
this.div.style.height=(this.rowHeight*_32b)+"px";
this.div.style.overflow="hidden";
this.buffer=_32c;
this.liveGrid=_32d;
this.visibleRows=_32b+1;
this.lastPixelOffset=0;
this.startPos=0;
},populateRow:function(_32e,row){
for(var j=0;j<row.length;j++){
_32e.cells[j].innerHTML=row[j];
}
},bufferChanged:function(){
this.refreshContents(parseInt(this.lastPixelOffset/this.rowHeight));
},clearRows:function(){
if(!this.isBlank){
this.liveGrid.table.className=this.liveGrid.options.loadingClass;
for(var i=0;i<this.visibleRows;i++){
this.populateRow(this.table.rows[i],this.buffer.getBlankRow());
}
this.isBlank=true;
}
},clearContents:function(){
this.clearRows();
this.scrollTo(0);
this.startPos=0;
this.lastStartPos=-1;
},refreshContents:function(_332){
if(_332==this.lastRowPos&&!this.isPartialBlank&&!this.isBlank){
return;
}
if((_332+this.visibleRows<this.buffer.startPos)||(this.buffer.startPos+this.buffer.size<_332)||(this.buffer.size==0)){
this.clearRows();
return;
}
this.isBlank=false;
var _333=this.buffer.startPos>_332;
var _334=_333?this.buffer.startPos:_332;
var _335=(this.buffer.startPos+this.buffer.size<_332+this.visibleRows)?this.buffer.startPos+this.buffer.size:_332+this.visibleRows;
var _336=_335-_334;
var rows=this.buffer.getRows(_334,_336);
var _338=this.visibleRows-_336;
var _339=_333?0:_336;
var _33a=_333?_338:0;
for(var i=0;i<rows.length;i++){
this.populateRow(this.table.rows[i+_33a],rows[i]);
}
for(var i=0;i<_338;i++){
this.populateRow(this.table.rows[i+_339],this.buffer.getBlankRow());
}
this.isPartialBlank=_338>0;
this.lastRowPos=_332;
this.liveGrid.table.className=this.liveGrid.options.tableClass;
var _33c=this.liveGrid.options.onRefreshComplete;
if(_33c!=null){
_33c();
}
},scrollTo:function(_33d){
if(this.lastPixelOffset==_33d){
return;
}
this.refreshContents(parseInt(_33d/this.rowHeight));
this.div.scrollTop=_33d%this.rowHeight;
this.lastPixelOffset=_33d;
},visibleHeight:function(){
return parseInt(RicoUtil.getElementsComputedStyle(this.div,"height"));
}};
Rico.LiveGridRequest=Class.create();
Rico.LiveGridRequest.prototype={initialize:function(_33e,_33f){
this.requestOffset=_33e;
}};
Rico.LiveGrid=Class.create();
Rico.LiveGrid.prototype={initialize:function(_340,_341,_342,url,_344,_345){
this.options={tableClass:$(_340).className,loadingClass:$(_340).className,scrollerBorderRight:"1px solid #ababab",bufferTimeout:20000,sortAscendImg:"images/sort_asc.gif",sortDescendImg:"images/sort_desc.gif",sortImageWidth:9,sortImageHeight:5,ajaxSortURLParms:[],onRefreshComplete:null,requestParameters:null,inlineStyles:true};
Object.extend(this.options,_344||{});
this.ajaxOptions={parameters:null};
Object.extend(this.ajaxOptions,_345||{});
this.tableId=_340;
this.table=$(_340);
this.addLiveGridHtml();
var _346=this.table.rows[0].cells.length;
this.metaData=new Rico.LiveGridMetaData(_341,_342,_346,_344);
this.buffer=new Rico.LiveGridBuffer(this.metaData);
var _347=this.table.rows.length;
this.viewPort=new Rico.GridViewPort(this.table,this.table.offsetHeight/_347,_341,this.buffer,this);
this.scroller=new Rico.LiveGridScroller(this,this.viewPort);
this.options.sortHandler=this.sortHandler.bind(this);
if($(_340+"_header")){
this.sort=new Rico.LiveGridSort(_340+"_header",this.options);
}
this.processingRequest=null;
this.unprocessedRequest=null;
this.initAjax(url);
if(this.options.prefetchBuffer||this.options.prefetchOffset>0){
var _348=0;
if(this.options.offset){
_348=this.options.offset;
this.scroller.moveScroll(_348);
this.viewPort.scrollTo(this.scroller.rowToPixel(_348));
}
if(this.options.sortCol){
this.sortCol=_344.sortCol;
this.sortDir=_344.sortDir;
}
this.requestContentRefresh(_348);
}
},addLiveGridHtml:function(){
if(this.table.getElementsByTagName("thead").length>0){
var _349=this.table.cloneNode(true);
_349.setAttribute("id",this.tableId+"_header");
_349.setAttribute("class",this.table.className+"_header");
for(var i=0;i<_349.tBodies.length;i++){
_349.removeChild(_349.tBodies[i]);
}
this.table.deleteTHead();
this.table.parentNode.insertBefore(_349,this.table);
}
new Insertion.Before(this.table,"<div id='"+this.tableId+"_container'></div>");
this.table.previousSibling.appendChild(this.table);
new Insertion.Before(this.table,"<div id='"+this.tableId+"_viewport' style='float:left;'></div>");
this.table.previousSibling.appendChild(this.table);
},resetContents:function(){
this.scroller.moveScroll(0);
this.buffer.clear();
this.viewPort.clearContents();
},sortHandler:function(_34b){
if(!_34b){
return;
}
this.sortCol=_34b.name;
this.sortDir=_34b.currentSort;
this.resetContents();
this.requestContentRefresh(0);
},adjustRowSize:function(){
},setTotalRows:function(_34c){
this.resetContents();
this.metaData.setTotalRows(_34c);
this.scroller.updateSize();
},initAjax:function(url){
ajaxEngine.registerRequest(this.tableId+"_request",url);
ajaxEngine.registerAjaxObject(this.tableId+"_updater",this);
},invokeAjax:function(){
},handleTimedOut:function(){
this.processingRequest=null;
this.processQueuedRequest();
},fetchBuffer:function(_34e){
if(this.buffer.isInRange(_34e)&&!this.buffer.isNearingLimit(_34e)){
return;
}
if(this.processingRequest){
this.unprocessedRequest=new Rico.LiveGridRequest(_34e);
return;
}
var _34f=this.buffer.getFetchOffset(_34e);
this.processingRequest=new Rico.LiveGridRequest(_34e);
this.processingRequest.bufferOffset=_34f;
var _350=this.buffer.getFetchSize(_34e);
var _351=false;
var _352;
if(this.options.requestParameters){
_352=this._createQueryString(this.options.requestParameters,0);
}
_352=(_352==null)?"":_352+"&";
_352=_352+"id="+this.tableId+"&page_size="+_350+"&offset="+_34f;
if(this.sortCol){
_352=_352+"&sort_col="+escape(this.sortCol)+"&sort_dir="+this.sortDir;
}
this.ajaxOptions.parameters=_352;
ajaxEngine.sendRequest(this.tableId+"_request",this.ajaxOptions);
this.timeoutHandler=setTimeout(this.handleTimedOut.bind(this),this.options.bufferTimeout);
},setRequestParams:function(){
this.options.requestParameters=[];
for(var i=0;i<arguments.length;i++){
this.options.requestParameters[i]=arguments[i];
}
},requestContentRefresh:function(_354){
this.fetchBuffer(_354);
},ajaxUpdate:function(_355){
try{
clearTimeout(this.timeoutHandler);
this.buffer.update(_355,this.processingRequest.bufferOffset);
this.viewPort.bufferChanged();
}
catch(err){
}
finally{
this.processingRequest=null;
}
this.processQueuedRequest();
},_createQueryString:function(_356,_357){
var _358="";
if(!_356){
return _358;
}
for(var i=_357;i<_356.length;i++){
if(i!=_357){
_358+="&";
}
var _35a=_356[i];
if(_35a.name!=undefined&&_35a.value!=undefined){
_358+=_35a.name+"="+escape(_35a.value);
}else{
var ePos=_35a.indexOf("=");
var _35c=_35a.substring(0,ePos);
var _35d=_35a.substring(ePos+1);
_358+=_35c+"="+escape(_35d);
}
}
return _358;
},processQueuedRequest:function(){
if(this.unprocessedRequest!=null){
this.requestContentRefresh(this.unprocessedRequest.requestOffset);
this.unprocessedRequest=null;
}
}};
Rico.LiveGridSort=Class.create();
Rico.LiveGridSort.prototype={initialize:function(_35e,_35f){
this.headerTableId=_35e;
this.headerTable=$(_35e);
this.options=_35f;
this.setOptions();
this.applySortBehavior();
if(this.options.sortCol){
this.setSortUI(this.options.sortCol,this.options.sortDir);
}
},setSortUI:function(_360,_361){
var cols=this.options.columns;
for(var i=0;i<cols.length;i++){
if(cols[i].name==_360){
this.setColumnSort(i,_361);
break;
}
}
},setOptions:function(){
new Image().src=this.options.sortAscendImg;
new Image().src=this.options.sortDescendImg;
this.sort=this.options.sortHandler;
if(!this.options.columns){
this.options.columns=this.introspectForColumnInfo();
}else{
this.options.columns=this.convertToTableColumns(this.options.columns);
}
},applySortBehavior:function(){
var _364=this.headerTable.rows[0];
var _365=_364.cells;
for(var i=0;i<_365.length;i++){
this.addSortBehaviorToColumn(i,_365[i]);
}
},addSortBehaviorToColumn:function(n,cell){
if(this.options.columns[n].isSortable()){
cell.id=this.headerTableId+"_"+n;
cell.style.cursor="pointer";
cell.onclick=this.headerCellClicked.bindAsEventListener(this);
cell.innerHTML=cell.innerHTML+"<span id=\""+this.headerTableId+"_img_"+n+"\">"+"&nbsp;&nbsp;&nbsp;</span>";
}
},headerCellClicked:function(evt){
var _36a=evt.target?evt.target:evt.srcElement;
var _36b=_36a.id;
var _36c=parseInt(_36b.substring(_36b.lastIndexOf("_")+1));
var _36d=this.getSortedColumnIndex();
if(_36d!=-1){
if(_36d!=_36c){
this.removeColumnSort(_36d);
this.setColumnSort(_36c,Rico.TableColumn.SORT_ASC);
}else{
this.toggleColumnSort(_36d);
}
}else{
this.setColumnSort(_36c,Rico.TableColumn.SORT_ASC);
}
if(this.options.sortHandler){
this.options.sortHandler(this.options.columns[_36c]);
}
},removeColumnSort:function(n){
this.options.columns[n].setUnsorted();
this.setSortImage(n);
},setColumnSort:function(n,_370){
if(isNaN(n)){
return;
}
this.options.columns[n].setSorted(_370);
this.setSortImage(n);
},toggleColumnSort:function(n){
this.options.columns[n].toggleSort();
this.setSortImage(n);
},setSortImage:function(n){
var _373=this.options.columns[n].getSortDirection();
var _374=$(this.headerTableId+"_img_"+n);
if(_373==Rico.TableColumn.UNSORTED){
_374.innerHTML="&nbsp;&nbsp;";
}else{
if(_373==Rico.TableColumn.SORT_ASC){
_374.innerHTML="&nbsp;&nbsp;<img width=\""+this.options.sortImageWidth+"\" "+"height=\""+this.options.sortImageHeight+"\" "+"src=\""+this.options.sortAscendImg+"\"/>";
}else{
if(_373==Rico.TableColumn.SORT_DESC){
_374.innerHTML="&nbsp;&nbsp;<img width=\""+this.options.sortImageWidth+"\" "+"height=\""+this.options.sortImageHeight+"\" "+"src=\""+this.options.sortDescendImg+"\"/>";
}
}
}
},getSortedColumnIndex:function(){
var cols=this.options.columns;
for(var i=0;i<cols.length;i++){
if(cols[i].isSorted()){
return i;
}
}
return -1;
},introspectForColumnInfo:function(){
var _377=new Array();
var _378=this.headerTable.rows[0];
var _379=_378.cells;
for(var i=0;i<_379.length;i++){
_377.push(new Rico.TableColumn(this.deriveColumnNameFromCell(_379[i],i),true));
}
return _377;
},convertToTableColumns:function(cols){
var _37c=new Array();
for(var i=0;i<cols.length;i++){
_37c.push(new Rico.TableColumn(cols[i][0],cols[i][1]));
}
return _37c;
},deriveColumnNameFromCell:function(cell,_37f){
var _380=cell.innerText!=undefined?cell.innerText:cell.textContent;
return _380?_380.toLowerCase().split(" ").join("_"):"col_"+_37f;
}};
Rico.TableColumn=Class.create();
Rico.TableColumn.UNSORTED=0;
Rico.TableColumn.SORT_ASC="ASC";
Rico.TableColumn.SORT_DESC="DESC";
Rico.TableColumn.prototype={initialize:function(name,_382){
this.name=name;
this.sortable=_382;
this.currentSort=Rico.TableColumn.UNSORTED;
},isSortable:function(){
return this.sortable;
},isSorted:function(){
return this.currentSort!=Rico.TableColumn.UNSORTED;
},getSortDirection:function(){
return this.currentSort;
},toggleSort:function(){
if(this.currentSort==Rico.TableColumn.UNSORTED||this.currentSort==Rico.TableColumn.SORT_DESC){
this.currentSort=Rico.TableColumn.SORT_ASC;
}else{
if(this.currentSort==Rico.TableColumn.SORT_ASC){
this.currentSort=Rico.TableColumn.SORT_DESC;
}
}
},setUnsorted:function(_383){
this.setSorted(Rico.TableColumn.UNSORTED);
},setSorted:function(_384){
this.currentSort=_384;
}};
var RicoUtil={getElementsComputedStyle:function(_385,_386,_387){
if(arguments.length==2){
_387=_386;
}
var el=$(_385);
if(el.currentStyle){
return el.currentStyle[_386];
}else{
return document.defaultView.getComputedStyle(el,null).getPropertyValue(_387);
}
},createXmlDocument:function(){
if(document.implementation&&document.implementation.createDocument){
var doc=document.implementation.createDocument("","",null);
if(doc.readyState==null){
doc.readyState=1;
doc.addEventListener("load",function(){
doc.readyState=4;
if(typeof doc.onreadystatechange=="function"){
doc.onreadystatechange();
}
},false);
}
return doc;
}
if(window.ActiveXObject){
return Try.these(function(){
return new ActiveXObject("MSXML2.DomDocument");
},function(){
return new ActiveXObject("Microsoft.DomDocument");
},function(){
return new ActiveXObject("MSXML.DomDocument");
},function(){
return new ActiveXObject("MSXML3.DomDocument");
})||false;
}
return null;
},getContentAsString:function(_38a){
return _38a.xml!=undefined?this._getContentAsStringIE(_38a):this._getContentAsStringMozilla(_38a);
},_getContentAsStringIE:function(_38b){
var _38c="";
for(var i=0;i<_38b.childNodes.length;i++){
var n=_38b.childNodes[i];
if(n.nodeType==4){
_38c+=n.nodeValue;
}else{
_38c+=n.xml;
}
}
return _38c;
},_getContentAsStringMozilla:function(_38f){
var _390=new XMLSerializer();
var _391="";
for(var i=0;i<_38f.childNodes.length;i++){
var n=_38f.childNodes[i];
if(n.nodeType==4){
_391+=n.nodeValue;
}else{
_391+=_390.serializeToString(n);
}
}
return _391;
},toViewportPosition:function(_394){
return this._toAbsolute(_394,true);
},toDocumentPosition:function(_395){
return this._toAbsolute(_395,false);
},_toAbsolute:function(_396,_397){
if(navigator.userAgent.toLowerCase().indexOf("msie")==-1){
return this._toAbsoluteMozilla(_396,_397);
}
var x=0;
var y=0;
var _39a=_396;
while(_39a){
var _39b=0;
var _39c=0;
if(_39a!=_396){
var _39b=parseInt(this.getElementsComputedStyle(_39a,"borderLeftWidth"));
var _39c=parseInt(this.getElementsComputedStyle(_39a,"borderTopWidth"));
_39b=isNaN(_39b)?0:_39b;
_39c=isNaN(_39c)?0:_39c;
}
x+=_39a.offsetLeft-_39a.scrollLeft+_39b;
y+=_39a.offsetTop-_39a.scrollTop+_39c;
_39a=_39a.offsetParent;
}
if(_397){
x-=this.docScrollLeft();
y-=this.docScrollTop();
}
return {x:x,y:y};
},_toAbsoluteMozilla:function(_39d,_39e){
var x=0;
var y=0;
var _3a1=_39d;
while(_3a1){
x+=_3a1.offsetLeft;
y+=_3a1.offsetTop;
_3a1=_3a1.offsetParent;
}
_3a1=_39d;
while(_3a1&&_3a1!=document.body&&_3a1!=document.documentElement){
if(_3a1.scrollLeft){
x-=_3a1.scrollLeft;
}
if(_3a1.scrollTop){
y-=_3a1.scrollTop;
}
_3a1=_3a1.parentNode;
}
if(_39e){
x-=this.docScrollLeft();
y-=this.docScrollTop();
}
return {x:x,y:y};
},docScrollLeft:function(){
if(window.pageXOffset){
return window.pageXOffset;
}else{
if(document.documentElement&&document.documentElement.scrollLeft){
return document.documentElement.scrollLeft;
}else{
if(document.body){
return document.body.scrollLeft;
}else{
return 0;
}
}
}
},docScrollTop:function(){
if(window.pageYOffset){
return window.pageYOffset;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollTop;
}else{
if(document.body){
return document.body.scrollTop;
}else{
return 0;
}
}
}
}};
var BaseHandler=Class.create();
BaseHandler.prototype={initialize:function(){
},processAjaxRequest:function(url,_3a3,_3a4,_3a5){
if(_3a3!=null&&_3a3.length>0){
_3a3+="&ajax=true";
}else{
_3a3="ajax=true";
}
this.successMethod=_3a4;
this.errorMethod=_3a5;
var _3a6=new Ajax.Request(url,{method:"post",parameters:_3a3,requestTimeout:300,onComplete:this.processAjaxResponse.bind(this),onFailure:this.processAjaxFailure.bind(this),onTimeout:this.processAjaxTimeout.bind(this)});
},processAjaxResponse:function(_3a7){
try{
var _3a8=_3a7.getResponseHeader("X-JSONDataLength");
var _3a9=_3a7.responseText.length-_3a8;
var _3aa=_3a7.responseText.substring(0,_3a9);
var _3ab=_3a7.responseText.substr(_3a9);
var _3ac=eval("("+_3ab+")");
_3ac.responseBody=_3aa;
if(_3ac.isError==true){
if(_3ac.errorMsg){
alert(_3ac.errorMsg);
}
if(this.errorMethod!=null){
this.errorMethod();
}
}else{
if(_3ac.redirectPage==true&&_3ac.redirectURL&&_3ac.loadAsOverlay!=true){
window.location=_3ac.redirectURL;
}else{
this.successMethod(_3ac);
}
}
}
catch(e){
if(this.errorMethod!=null){
this.errorMethod();
}
return;
}
},processAjaxFailure:function(_3ad){
if(this.errorMethod!=null){
this.errorMethod();
}
},processAjaxTimeout:function(_3ae){
if(this.errorMethod!=null){
this.errorMethod();
}
}};
BaseHandler.purge=function(d){
var a=d.attributes,i,l,n;
if(a){
l=a.length;
for(i=0;i<l;i++){
n=a[i].name;
if(typeof d[n]=="function"){
d[n]=null;
}
}
}
a=d.childNodes;
if(a){
l=a.length;
for(i=0;i<l;i++){
BaseHandler.purge(d.childNodes[i]);
}
}
};
BaseHandler.buildQueryString=function(_3b1){
try{
if(_3b1==null){
return "";
}
var _3b2="";
for(var key in _3b1){
if(_3b2.length>0){
_3b2+="&"+key+"="+escape(_3b1[key]);
}else{
_3b2=key+"="+escape(_3b1[key]);
}
}
return _3b2;
}
catch(e){
return "";
}
};
var TabHandler=Class.create();
TabHandler.prototype={initialize:function(_3b4,_3b5){
this.tabHeaderEl=$(_3b4);
this.tabHeaderId=this.tabHeaderEl.getAttribute("id");
this.tabPanelEl=$(_3b5);
this.tabPanelId=_3b5;
this.captureRequest();
this.handleClick();
},captureRequest:function(){
},handleClick:function(){
var _3b6=this.tabHeaderEl.parentNode;
var _3b7=this.tabPanelEl.parentNode;
var _3b8="";
if(_3b6==null||_3b7==null){
return;
}
tabHeaders=_3b6.childNodes;
tabPanels=_3b7.childNodes;
if(tabHeaders==null||tabPanels==null){
return;
}
if(tabHeaders.length!=tabPanels.length){
return;
}
_3b8=this.getCurrentActiveTab(tabHeaders);
for(var i=0;i<tabHeaders.length;i++){
headerId=tabHeaders[i].getAttribute("id");
panelId=tabPanels[i].getAttribute("id");
headerClass=tabHeaders[i].className;
headerAjaxCallMade=tabHeaders[i].getAttribute("ajaxCallMade");
if(headerId==this.tabHeaderId){
if(tabHeaders[i].getAttribute("ajaxCallMade")==null&&headerId!=_3b8){
url=tabHeaders[i].childNodes[0].getAttribute("href");
tabPanels[i].style.display="block";
this.saveTabAttributes();
new DivReplaceHandler(url,tabPanels[i],"loadingOverlay",this.setTabAttributes.bind(this)).execute();
tabHeaders[i].setAttribute("ajaxCallMade","true");
this.turnOffTabs(tabHeaders);
tabHeaders[i].className=headerClass+" active";
}else{
tabPanels[i].style.display="block";
this.turnOffTabs(tabHeaders);
tabHeaders[i].className=headerClass+" active";
if(tabHeaders[i].getAttribute("ajaxCallMade")==null){
tabHeaders[i].setAttribute("ajaxCallMade","true");
}
}
}else{
if(headerId==_3b8&&tabHeaders[i].getAttribute("ajaxCallMade")==null){
tabHeaders[i].setAttribute("ajaxCallMade","true");
}
tabPanels[i].style.display="none";
}
}
},saveTabAttributes:function(){
this.tabHeaderEl.style.cursor="wait";
},setTabAttributes:function(){
this.tabHeaderEl.style.cursor="default";
},turnOffTabs:function(_3ba){
for(var i=0;i<_3ba.length;i++){
if(_3ba[i].className.indexOf("active")!=-1){
_3ba[i].className=_3ba[i].className.replace(/active/g,"");
}
}
},getCurrentActiveTab:function(_3bc){
var _3bd="";
for(var i=0;i<_3bc.length;i++){
if(_3bc[i].className.indexOf("active")!=-1){
_3bd=_3bc[i].getAttribute("id");
break;
}
}
return _3bd;
}};
var DivReplaceHandler=Class.create();
DivReplaceHandler.prototype={initialize:function(url,_3c0,_3c1,_3c2){
this.url=url;
this.divEl=$(_3c0);
this.callback=_3c2;
this.styleClass=_3c1;
this.loadingHandler=null;
return this;
},continueProcessing:function(){
if(this.divEl==null||this.url==null){
return false;
}else{
return true;
}
},execute:function(){
if(!this.continueProcessing()){
return;
}
this.origOnClick=null;
if(this.divEl.style.display=="none"){
this.divEl.style.display="block";
}
if(this.divEl.getAttribute("onclick")!=null){
this.origOnClick=this.divEl.getAttribute("onclick");
this.divEl.onclick="javascript:void();";
}
this.divEl.style.cursor="wait";
if(this.styleClass!=null&&this.styleClass.length>0){
this.loadingHandler=new LoadingHandler();
this.loadingHandler.showLoading(this.divEl,this.styleClass);
}
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
},processResponse:function(_3c3){
if(this.loadingHandler!=null){
this.loadingHandler.hideLoading();
}
this.divEl.innerHTML=_3c3.responseBody;
this.divEl.style.cursor="default";
if(this.origOnClick!=null){
this.divEl.onclick=this.origOnClick;
}
if(this.callback!=null){
this.callback(_3c3);
}
if(this.divEl.innerHTML!=null){
addReflections();
}
},handleError:function(){
var _3c4="";
if(this.loadingHandler!=null){
_3c4=this.loadingHandler.hideLoading();
}
if(_3c4.length>0){
this.divEl.innerHTML=_3c4;
}
this.divEl.style.cursor="default";
if(this.origOnClick!=null){
this.divEl.onclick=this.origOnClick;
}
if(this.callback!=null){
this.callback();
}
}};
var FormHandler=Class.create();
FormHandler.prototype={initialize:function(el,_3c6,_3c7,_3c8,_3c9){
this.el=$(el);
this.divEl=$(_3c6);
this.url=this.el.getAttribute("action");
this.styleClass=_3c8;
this.callback=_3c9;
this.loadingHandler=null;
if(_3c7==null||_3c7.length==0){
this.method="get";
}else{
this.method=_3c7.toLowerCase();
}
},continueProcessing:function(){
if(this.el==null||this.divEl==null||this.url==null){
return false;
}else{
return true;
}
},submit:function(){
if(!this.continueProcessing()){
return;
}
var _3ca="";
if(this.method=="get"){
params=Form.serialize(this.el);
if(this.url.indexOf("?")==-1){
this.url+="?"+params;
}else{
this.url=this.url.substring(this.url.indexOf("?"));
this.url+="?"+params;
}
}else{
_3ca=Form.serialize(this.el);
}
this.divEl.style.cursor="wait";
if(this.styleClass!=null&&this.styleClass.length>0){
this.loadingHandler=new LoadingHandler();
this.loadingHandler.showLoading(this.divEl,this.styleClass);
}
(new BaseHandler()).processAjaxRequest(this.url,_3ca,this.processResponse.bind(this),this.handleError.bind(this));
},processResponse:function(_3cb){
var _3cc="";
if(this.loadingHandler!=null){
this.loadingHandler.hideLoading();
}
if(this.callback!=null){
this.callback(_3cb);
}else{
this.divEl.innerHTML=_3cb.responseBody;
}
this.divEl.style.cursor="default";
},handleError:function(){
var _3cd="";
if(this.loadingHandler!=null){
_3cd=this.loadingHandler.hideLoading();
}
if(_3cd.length>0){
this.divEl.innerHTML=_3cd;
}
this.divEl.innerHTML=this.origDivInnerHTML;
this.divEl.style.cursor="default";
}};
var Form={serialize:function(form){
var _3cf=Form.getElements($(form));
var _3d0=new Array();
for(var i=0;i<_3cf.length;i++){
var _3d2=Form.Element.serialize(_3cf[i]);
if(_3d2){
_3d0.push(_3d2);
}
}
return _3d0.join("&");
},getElements:function(form){
var form=$(form);
var _3d4=new Array();
for(tagName in Form.Element.Serializers){
var _3d5=form.getElementsByTagName(tagName);
for(var j=0;j<_3d5.length;j++){
_3d4.push(_3d5[j]);
}
}
return _3d4;
},getInputs:function(form,_3d8,name){
var form=$(form);
var _3da=form.getElementsByTagName("input");
if(!_3d8&&!name){
return _3da;
}
var _3db=new Array();
for(var i=0;i<_3da.length;i++){
var _3dd=_3da[i];
if((_3d8&&_3dd.type!=_3d8)||(name&&_3dd.name!=name)){
continue;
}
_3db.push(_3dd);
}
return _3db;
},disable:function(form){
var _3df=Form.getElements(form);
for(var i=0;i<_3df.length;i++){
var _3e1=_3df[i];
_3e1.blur();
_3e1.disabled="true";
}
},enable:function(form){
var _3e3=Form.getElements(form);
for(var i=0;i<_3e3.length;i++){
var _3e5=_3e3[i];
_3e5.disabled="";
}
},focusFirstElement:function(form){
var form=$(form);
var _3e7=Form.getElements(form);
for(var i=0;i<_3e7.length;i++){
var _3e9=_3e7[i];
if(_3e9.type!="hidden"&&!_3e9.disabled){
Field.activate(_3e9);
break;
}
}
},reset:function(form){
$(form).reset();
}};
Form.Element={serialize:function(_3eb){
var _3eb=$(_3eb);
var _3ec=_3eb.tagName.toLowerCase();
var _3ed=Form.Element.Serializers[_3ec](_3eb);
if(_3ed){
return encodeURIComponent(_3ed[0])+"="+encodeURIComponent(_3ed[1]);
}
},getValue:function(_3ee){
var _3ee=$(_3ee);
var _3ef=_3ee.tagName.toLowerCase();
var _3f0=Form.Element.Serializers[_3ef](_3ee);
if(_3f0){
return _3f0[1];
}
}};
Form.Element.Serializers={input:function(_3f1){
switch(_3f1.type.toLowerCase()){
case "submit":
case "hidden":
case "password":
case "text":
return Form.Element.Serializers.textarea(_3f1);
case "checkbox":
case "radio":
return Form.Element.Serializers.inputSelector(_3f1);
}
return false;
},inputSelector:function(_3f2){
if(_3f2.checked){
return [_3f2.name,_3f2.value];
}
},textarea:function(_3f3){
return [_3f3.name,_3f3.value];
},select:function(_3f4){
var _3f5="";
if(_3f4.type=="select-one"){
var _3f6=_3f4.selectedIndex;
if(_3f6>=0){
_3f5=_3f4.options[_3f6].value||_3f4.options[_3f6].text;
}
}else{
_3f5=new Array();
for(var i=0;i<_3f4.length;i++){
var opt=_3f4.options[i];
if(opt.selected){
_3f5.push(opt.value||opt.text);
}
}
}
return [_3f4.name,_3f5];
}};
var FormSubmitHandler=Class.create();
FormSubmitHandler.prototype={initialize:function(el,_3fa,_3fb,_3fc,_3fd,_3fe,_3ff){
this.el=$(el);
this.divEl=$(_3fa);
this.errorDivId=$(_3fb);
this.method=_3fc;
this.styleClass=_3fd;
this.hideDiv=null;
this.callback=_3ff;
if(_3fe!=null){
this.hideDiv=$(_3fe);
}
},continueProcessing:function(){
if(this.el==null||this.divEl==null||this.errorDivId==null){
return false;
}else{
return true;
}
},submit:function(){
if(!this.continueProcessing()){
return;
}
this.setCursor("wait");
new FormHandler(this.el,this.divEl,this.method,this.styleClass,this.processResponse.bind(this)).submit();
},processResponse:function(_400){
if(_400.validationError!=null){
this.errorDivId.innerHTML=_400.responseBody;
this.errorDivId.style.display="block";
selfLabeledInputHandler();
}else{
window.location="/signup/m/plan";
}
this.setCursor("default");
},setCursor:function(_401){
for(var i=0;i<this.el.length;i++){
if(this.el[i].nodeType==1){
this.el[i].style.cursor=_401;
}
}
this.el.style.cursor=_401;
}};
var ReadMoreHandler=Class.create();
ReadMoreHandler.prototype={initialize:function(_403,_404,href){
this.tabHeader=_403;
this.tabPanel=_404;
this.href=href;
this.handleClick();
},handleClick:function(){
if(window.location.href.indexOf(this.href)==-1){
window.location=this.href;
return;
}
var _406=document.getElementById("tabsetHeader");
var _407=document.getElementById("tabsetPanel");
if(_406==null||_407==null){
return;
}
tabHeaders=_406.childNodes;
tabPanels=_407.childNodes;
if((tabHeaders==null||tabPanels==null)||(tabHeaders.length!=tabPanels.length)){
return;
}
var _408=this.getCurrentActiveTab(tabHeaders);
if(_408!=this.tabHeader){
this.turnOffTabs(tabHeaders);
this.hidePanels(tabPanels);
document.getElementById(this.tabPanel).style.display="block";
document.getElementById(this.tabHeader).className=document.getElementById(this.tabHeader).className+" active";
}
window.scrollTo(300,400);
},turnOffTabs:function(_409){
for(var i=0;i<_409.length;i++){
if(_409[i].className.indexOf("active")!=-1){
_409[i].className=_409[i].className.replace(/active/g,"");
}
}
},getCurrentActiveTab:function(_40b){
var _40c="";
for(var i=0;i<_40b.length;i++){
if(_40b[i].className.indexOf("active")!=-1){
_40c=_40b[i].getAttribute("id");
break;
}
}
return _40c;
},hidePanels:function(_40e){
for(var i=0;i<_40e.length;i++){
_40e[i].style.display="none";
}
}};
var LoadingHandler=Class.create();
LoadingHandler.prototype={initialize:function(){
return this;
},showLoading:function(_410,_411){
this.divEl=$(_410);
this.origHTML=this.divEl.innerHTML;
this.styleClass=_411;
this.origClass=this.divEl.className;
this.divEl.innerHTML="";
this.divEl.className=this.styleClass;
},hideLoading:function(){
this.divEl.className=this.origClass;
return this.origHTML;
}};
var overlayUtil=Class.create();
var Overlay;
overlayUtil={windowWidth:function(){
if(document.documentElement&&document.documentElement.clientWidth){
return document.documentElement.clientWidth;
}else{
if(document.body&&document.body.clientWidth){
return document.body.clientWidth;
}
}
},scrollOffset:function(){
var _412;
if(self.pageYOffset){
_412=self.pageYOffset;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
_412=document.documentElement.scrollTop;
}else{
if(document.body){
_412=document.body.scrollTop;
}
}
}
return (_412>0)?_412:0;
},updatePosition:function(_413){
_413.style.top=overlayUtil.scrollOffset()+20+"px";
},resetScroll:function(_414){
window.scrollTo(0,_414);
},handleResize:function(_415){
_415.style.width=overlayUtil.windowWidth()+"px";
},fitToPage:function(elem){
elem.style.height=document.body.scrollHeight+"px";
elem.style.width=overlayUtil.windowWidth()+"px";
},showMask:function(_417){
overlayUtil.fitToPage(_417);
_417.style.display="block";
if(document.all&&document.getElementById){
var _418=document.getElementsByTagName("SELECT");
for(var i=0;i<_418.length;i++){
if(_418[i].className.search("overlayOverride")==-1){
_418[i].className=_418[i].className.replace(new RegExp(" overlayOn\\b"),"");
_418[i].className+=" overlayOn";
}
}
}
},showContent:function(_41a,_41b){
_41a.style.visibility="hidden";
_41a.style.display="block";
overlayUtil.resetScroll(_41b);
overlayUtil.updatePosition(_41a);
_41a.style.visibility="visible";
},close:function(_41c,_41d){
if(document.all&&document.getElementById){
var _41e=document.getElementsByTagName("SELECT");
for(var i=0;i<_41e.length;i++){
_41e[i].className=_41e[i].className.replace(new RegExp(" overlayOn\\b"),"");
}
}
_41c.style.display="none";
_41d.style.display="none";
}};
var popupUrlHandler=Class.create();
var Overlay;
popupUrlHandler.prototype={initialize:function(url,_421,_422,_423,_424){
this.url=url;
this.divEl=$(_421);
this.maskEl=$("pageMask");
this.callback=_423;
this.styleClass=_422;
this.loadingHandler=null;
if(_424!=null){
this.catalystUrl=_424;
}else{
this.catalystUrl=location.href;
}
return this;
},continueProcessing:function(){
if(this.divEl==null||this.url==null){
return false;
}else{
return true;
}
},execute:function(){
if(!this.continueProcessing()){
return;
}
this.origOnClick=null;
if(this.divEl.getAttribute("onclick")!=null){
this.origOnClick=this.divEl.getAttribute("onclick");
this.divEl.onclick="javascript:void();";
}
if(this.styleClass!=null&&this.styleClass.length>0){
this.loadingHandler=new LoadingHandler();
this.loadingHandler.showLoading(this.divEl,this.styleClass);
}
var _425=new Array();
if(this.catalystUrl!=null){
_425["catalystUrl"]=this.catalystUrl;
}
this.url=this.urlWithQueryString(this.url,_425);
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
},urlWithQueryString:function(url,_427){
var hash=$H(_427);
var _429=hash.toQueryString();
if(_429!=null&&_429.length>0){
if(url.indexOf("?")!=-1){
url+="&"+_429;
}else{
url+="?"+_429;
}
}
return url;
},processResponse:function(_42a){
if(this.loadingHandler!=null){
this.loadingHandler.hideLoading();
}
BaseHandler.purge(this.divEl);
this.divEl.innerHTML=_42a.responseBody;
overlayUtil.showMask(this.maskEl);
Event.observe(window,"resize",this.handleResize.bind(this));
this.originalScroll=overlayUtil.scrollOffset();
overlayUtil.showContent(this.divEl,this.originalScroll);
if(this.origOnClick!=null){
this.divEl.onclick=this.origOnClick;
}
if(this.callback!=null){
this.callback();
}
},handleError:function(){
var _42b="";
if(this.loadingHandler!=null){
_42b=this.loadingHandler.hideLoading();
}
if(_42b.length>0){
this.divEl.innerHTML=_42b;
}
if(this.origOnClick!=null){
this.divEl.onclick=this.origOnClick;
}
if(this.callback!=null){
this.callback();
}
},handleResize:function(){
overlayUtil.handleResize(this.maskEl);
},resetScroll:function(){
overlayUtil.resetScroll(this.originalScroll);
},close:function(){
overlayUtil.close(this.divEl,this.maskEl);
}};
var popupContentHandler=Class.create();
popupContentHandler.prototype={initialize:function(_42c,_42d,_42e){
this.jsonResponse=_42c;
this.divEl=$(_42d);
this.maskEl=$("pageMask");
this.callback=_42e;
return this;
},continueProcessing:function(){
if(this.divEl==null||this.jsonResponse==null){
return false;
}else{
return true;
}
},execute:function(){
if(!this.continueProcessing()){
return;
}
BaseHandler.purge(this.divEl);
this.divEl.innerHTML=this.jsonResponse.responseBody;
overlayUtil.showMask(this.maskEl);
Event.observe(window,"resize",this.handleResize.bind(this));
this.originalScroll=overlayUtil.scrollOffset();
overlayUtil.showContent(this.divEl,this.originalScroll);
if(this.callback!=null){
this.callback();
}
},handleResize:function(){
overlayUtil.handleResize(this.maskEl);
},resetScroll:function(){
overlayUtil.resetScroll(this.originalScroll);
},close:function(){
overlayUtil.close(this.divEl,this.maskEl);
var _42f=this.divEl.getElementsByTagName("a");
var _430=_42f[0].getAttribute("href");
if(document.location.pathname=="/browse/queuemgmt/fullQueue"){
if(_430.indexOf("#TOR")==-1){
window.location.reload();
}
}
}};
var NextGenHandler=Class.create();
NextGenHandler.prototype={initialize:function(el,_432,_433,_434,_435){
this.el=$(el);
this.formDivId=$(_432);
this.method=_433;
this.styleClass=_434;
this.queueDiv=$("queueContentsContainer");
this.similarMoviesUrl=_435;
},continueProcessing:function(){
if(this.el==null||this.formDivId==null){
return false;
}else{
return true;
}
},submit:function(){
if(!this.continueProcessing()){
return;
}
new FormHandler(this.el,this.formDivId,this.method,this.styleClass,this.processResponse.bind(this)).submit();
},processResponse:function(_436){
if(_436.validationError!=null){
this.formDivId.innerHTML=_436.responseBody;
}else{
DndUtil.clearQueueDragAndDrop();
this.queueDiv.innerHTML=_436.responseBody;
var _437=document.getElementById("mQueueCorners");
if(_437){
_437.style.display="none";
_437.style.display="block";
}
new UpdateButtons().update(_436);
DndUtil.registerQueueDragAndDrop();
Overlay.close();
Facebook.publish_action("queue",Queue.getSplashPageUrl());
Queue.overlay=new QueueOverlay(this.similarMoviesUrl,"boxPopup","","");
Queue.overlay.execute();
}
}};
var giftCard=Class.create();
var giftCardNumber;
var pinNumber;
var errorMessage;
giftCard.prototype={initialize:function(_438,_439,_43a){
giftCardNumber=(document.getElementsByName("giftCard.clearTextAccountNumber"))[0].value;
pinNumber=(document.getElementsByName("giftCard.pinNumber"))[0].value;
this.divEl=document.getElementById(_439);
this.divEl1=document.getElementById(_43a);
if(giftCardNumber[0]==""&&pinNumber[0]==""){
this.divEl1.innerHTML="<p style='color:red'> Please enter the Gift Card Number and Pin Number</p>";
return false;
}else{
if(giftCardNumber[0]==""){
this.divEl1.innerHTML="<p style='color:red'> Please enter the Gift Card Number </p>";
return false;
}else{
if(pinNumber[0]==""){
this.divEl1.innerHTML="<p style='color:red'> Please enter the Pin Number </p>";
return false;
}
}
}
this.jsonResponse=null;
this.url=_438+giftCardNumber+"/"+pinNumber;
},add:function(){
try{
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("ValueLink.add(): "+e.message);
return true;
}
},remGiftCard:function(_43b){
try{
(new BaseHandler()).processAjaxRequest(_43b,"",this.processResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("ValueLink.add(): "+e.message);
return true;
}
},processResponse:function(_43c){
BaseHandler.purge(this.divEl);
BaseHandler.purge(this.divEl1);
if(_43c!=null){
if(_43c.GCCOUNT==null){
this.divEl1.innerHTML="<p style='color:red'>Please provide a valid gift card and pin number.</p>";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
}else{
var ijk=1;
var str="GC"+ijk+"N";
var _43f="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var _440=parseInt(_43c.GCCOUNT);
var _441="";
var _442="";
if(_440!=null){
document.getElementById("displayGiftcardDetails").style.display="none";
for(var ctr=0;ctr<_440;ctr++){
_441="GC"+(ctr+1)+"N";
_442="GC"+(ctr+1)+"B";
_43f=_43f+"Gift Card"+(ctr+1)+" :"+_43c[_441]+": $"+_43c[_442]+"&nbsp;&nbsp;<a href='javascript:removeGC("+ctr+");'>Remove</a><br>";
_43f=_43f+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
if(ctr==2){
hideDiv("ApplyGiftCard");
document.getElementsByName("giftCard.clearTextAccountNumber")[0].disabled=true;
document.getElementsByName("giftCard.pinNumber")[0].disabled=true;
}else{
showDiv("ApplyGiftCard");
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].disabled=false;
document.getElementsByName("giftCard.pinNumber")[0].disabled=false;
}
}
}
this.divEl1.innerHTML="";
this.divEl.innerHTML=_43f;
if(_43c.ISDUPLICATE!=undefined||_43c.ISDUPLICATE!=null){
this.divEl1.innerHTML="<font size='2em' color='red'>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+_43c.ISDUPLICATE+"</font>";
}
return false;
}
}
},handleError:function(){
this.divEl1.innerHTML="<p style='color:red'> Please enter the Gift Card Number and Pin Number</p>";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
}};
function removeGC(_444){
new giftCard("/signup/giftcard/removeGiftCardFromPayment/","apply","balance").remGiftCard("/signup/giftcard/removeGiftCardFromPayment/"+_444);
}
var OverlayLoginHandler=Class.create();
var overlayLoginCallback;
OverlayLoginHandler.prototype={initialize:function(_445){
this.successCallback=_445;
},performAuthenticatedAction:function(){
if(this.isNotLoggedIn()){
this.showOverlay();
overlayLoginCallback=this.successCallback;
return false;
}else{
this.successCallback();
return true;
}
},isNotLoggedIn:function(){
return (this.readCookie("BB_SA_COOKIE")==null&&this.readCookie("BB_HA_COOKIE")==null);
},readCookie:function(name){
var _447=name+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_447)==0){
return c.substring(_447.length,c.length);
}
}
return null;
},showOverlay:function(){
try{
new BaseHandler().processAjaxRequest("/esi/auth/overlayLogin","",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("overlayLoginHandler.showOverlay(): "+e.message);
}
},processResponse:function(_44b){
try{
if(_44b.loadAsOverlay==true){
Overlay=new popupContentHandler(_44b,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}
}
catch(e){
this.log("overlayLoginHandler.processResponse(): "+e.message);
}
},setCursors:function(_44c){
this.el.style.cursor=_44c;
document.body.style.cursor=_44c;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_44c;
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
function selfLabeledInputHandler(){
var _44d=document.getElementsByClassName("labelHidden");
if(_44d!=null&&_44d.length>0){
_44d.each(function(_44e){
var _44f=_44e.nextSibling;
var _450=_44f.form;
_44f.setAttribute("hint",_44e.innerHTML.replace(/^\s+|\s+$/g,""));
if(_44f.value==""||_44f.value==_44f.getAttribute("hint")){
if(_44f.getAttribute("type")=="password"){
_44f=changeInputType(_44f,"text");
_44f.setAttribute("prevtype","password");
}
Element.addClassName(_44f,"hinted");
_44f.value=_44f.getAttribute("hint");
}
Event.observe(_44f,"focus",function(_451){
var elem=Event.element(_451);
if(elem.value==elem.getAttribute("hint")){
elem.value="";
Element.removeClassName(elem,"hinted");
if(elem.getAttribute("prevtype")=="password"){
elem=changeInputType(elem,"password");
window.elementToFocus=elem;
window.setTimeout("window.elementToFocus.focus()",50);
}
}
});
Event.observe(_44f,"blur",function(_453){
var elem=Event.element(_453);
if(elem.value==""){
Element.addClassName(elem,"hinted");
if(elem.type=="password"){
elem=changeInputType(elem,"text");
elem.setAttribute("prevtype","password");
}
elem.value=elem.getAttribute("hint");
}
});
if(!Element.hasClassName(_450,"hintClear")){
Element.addClassName(_450,"hintClear");
Event.observe(_450,"submit",function(_455){
var _456=document.getElementsByClassName("hinted");
if(_456!=null&&_456.length>0){
_456.each(function(hint){
if(hint.value==hint.getAttribute("hint")){
hint.value="";
if(hint.getAttribute("prevtype")=="password"&&hint.type=="text"){
hint=changeInputType(hint,"password");
}
Element.removeClassName(hint,"hinted");
}
});
}
});
}
});
}
}
function changeInputType(elem,_459){
try{
elem.type=_459;
return elem;
}
catch(error){
var _45a=document.createElement("input");
_45a.setAttribute("type",_459);
if(elem.value){
_45a.value=elem.value;
}
if(elem.name){
_45a.name=elem.name;
}
if(elem.className){
_45a.className=elem.className;
}
_45a.setAttribute("hint",elem.getAttribute("hint"));
elem.parentNode.replaceChild(_45a,elem);
return _45a;
}
}
var FriendsHandler=Class.create();
var Overlay;
FriendsHandler.prototype={initialize:function(el,_45c,_45d,_45e,_45f,_460,_461){
this.el=$(el);
this.divEl=$(_45c);
this.errorDivId=$(_45d);
this.method=_45e;
this.styleClass=_45f;
this.hideDiv=null;
this.callback=_461;
if(_460!=null){
this.hideDiv=$(_460);
}
},continueProcessing:function(){
if(this.el==null||this.divEl==null||this.errorDivId==null){
return false;
}else{
return true;
}
},submit:function(){
if(!this.continueProcessing()){
return;
}
this.setCursor("wait");
new FormHandler(this.el,this.divEl,this.method,this.styleClass,this.processResponse.bind(this)).submit();
},processResponse:function(_462){
if(_462.validationError!=null){
this.errorDivId.innerHTML=_462.responseBody;
this.errorDivId.style.display="block";
}else{
if(_462.duplicateAlert=="true"){
document.location.reload();
}else{
if(_462.loadAsOverlay==true){
Overlay=new popupContentHandler(_462,"boxPopup",null);
Overlay.execute();
}else{
this.errorDivId.style.display="none";
this.divEl.innerHTML=_462.responseBody;
}
}
if(this.hideDiv!=null){
this.hideDiv.style.display="none";
}
if(this.callback!=null){
this.callback();
}
}
this.setCursor("default");
},setCursor:function(_463){
for(var i=0;i<this.el.length;i++){
if(this.el[i].nodeType==1){
this.el[i].style.cursor=_463;
}
}
this.el.style.cursor=_463;
}};
var FavoritesHandler=Class.create();
FavoritesHandler.prototype={initialize:function(el,URL){
this.el=$(el);
this.Url=URL;
this.origClass=this.el.className;
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.Url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("FavoritesHandler.add(): "+e.message);
}
},processResponse:function(_467){
try{
document.getElementById("favStatus").className="inFav";
}
catch(e){
this.log("FavoritesHandler.processResponse(): "+e.message);
}
},setCursors:function(_468){
this.el.style.cursor=_468;
document.body.style.cursor=_468;
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
function swapOneFormatDropdownAndDiv(_469,_46a,_46b){
var _46c=$(_469);
var _46d=$(_46a);
var _46b=$(_46b);
var _46e=_46c.selectedIndex;
var _46f=_46c.options[_46e].value;
var _470=_46c.options[_46c.selectedIndex].innerHTML;
var _471=0;
if(_46e==0){
_471=1;
}
_46d.value=_46c.options[_471].value;
_46b.innerHTML=_46c.options[_471].innerHTML;
}
function swapTwoFormatDropdownsAndDiv(_472,_473,_474,_475){
var _476=$(_472);
var _477=$(_473);
var _478=$(_474);
var _475=$(_475);
var _479=_476.selectedIndex;
var _47a=_476.options[_479].value;
var _47b=_476.options[_476.selectedIndex].innerHTML;
var _47c=0;
for(i=0;i<_476.options.length;i++){
if(i!=_479){
_477.options[_47c].value=_476.options[i].value;
_477.options[_47c].innerHTML=_476.options[i].innerHTML;
_47c++;
}
}
for(i=0;i<_477.options.length;i++){
if(_477.options[0].value!="DVD"&&_477.options[1].value!="DVD"){
if(_477.options[i].value==_476.options[0].value){
_477.selectedIndex=i;
}else{
_478.value=_477.options[i].value;
_475.innerHTML=_477.options[i].innerHTML;
}
}else{
if(_477.options[i].value=="BR"||_477.options[i].value=="HD"){
_477.selectedIndex=i;
}else{
_478.value=_477.options[i].value;
_475.innerHTML=_477.options[i].innerHTML;
}
}
}
}
function updateFormatOfMovie(_47d,_47e,_47f,_480){
var _481=$(_47d);
if(_481.selectedIndex==0){
return;
}
if(_481.selectedIndex==1){
window.location.href="/discformat/updateFormatOfMovie/"+_47e+"/"+_47f;
}else{
if(_481.selectedIndex==2){
window.location.href="/discformat/updateFormatOfMovie/"+_47e+"/"+_480;
}
}
}
function checkAllCheckBoxes(_482,_483){
allAvailableCheckbox=$(_482);
if(allAvailableCheckbox.checked){
var _484=document.getElementsByClassName(_483);
for(i=0;i<_484.length;i++){
_484[i].checked=true;
}
}else{
var _484=document.getElementsByClassName(_483);
for(i=0;i<_484.length;i++){
_484[i].checked=false;
}
}
}
function buttonHide(_485){
var _486=document.getElementById("discFormat").value;
if(_486=="BR"){
if(_485=="BR"){
document.getElementById("saveBtn").disabled=true;
}else{
document.getElementById("saveBtn").disabled=false;
}
}else{
if(_486=="DVD"){
if(_485=="DVD"){
document.getElementById("saveBtn").disabled=true;
}else{
document.getElementById("saveBtn").disabled=false;
}
}
}
}
function setDiscPreference(){
var _487=document.getElementsByTagName("input");
if(_487){
for(var i=0;i<_487.length;++i){
if(_487[i].type=="radio"&&_487[i].name=="discPreference"){
if(_487[i].checked){
discPrefernce=_487[i].value;
break;
}
}
}
}
new SimilarMovies(this,"3","/signup/m/discformatpreference?discPreference="+discPrefernce).add();
}
var AnonAddToQueue=Class.create();
AnonAddToQueue.prototype={initialize:function(el,URL,_48b,tit){
this.el=$(el);
this.Url=URL;
this.type=_48b;
this.title=tit;
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.Url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("anonAddToQueue.add(): "+e.message);
}
},processResponse:function(_48d){
try{
if(_48d.loadAsOverlay==true){
Overlay=new popupContentHandler(_48d,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}
}
catch(e){
this.log("anonAddToQueue.processResponse(): "+e.message);
}
},setCursors:function(_48e){
this.el.style.cursor=_48e;
document.body.style.cursor=_48e;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_48e;
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
var BBDragAndDrop=Class.create();
BBDragAndDrop.prototype=(new Rico.DragAndDrop()).extend({initialize:function(){
this._mouseDown=this._mouseDownHandler.bindAsEventListener(this);
this._mouseMove=this._mouseMoveHandler.bindAsEventListener(this);
this._mouseUp=this._mouseUpHandler.bindAsEventListener(this);
this.mouseCoords=new Array();
this.origMouseCoords=new Array();
},setStartDragFromElement:function(e,_490){
this.origPos=RicoUtil.toDocumentPosition(_490);
this.interestedInMotionEvents=this.hasSelection();
this._terminateEvent(e);
},_mouseDownHandler:function(e){
if(arguments.length==0){
e=event;
}
var _492=e.which!=undefined;
if((_492&&e.which!=1)||(!_492&&e.button!=1)){
return;
}
var _493=e.target?e.target:e.srcElement;
var _494=_493.ricoDraggable;
var _495=_493;
while(_494==null&&_495.parentNode){
_495=_495.parentNode;
_494=_495.ricoDraggable;
}
if(_494==null){
return;
}
this.updateSelection(_494,e.ctrlKey);
if(this.hasSelection()){
for(var i=0;i<this.dropZones.length;i++){
this.dropZones[i].clearPositionCache();
}
}
this.mouseCoords=[Event.pointerX(e),Event.pointerY(e)];
this.origMouseCoords=[Event.pointerX(e),Event.pointerY(e)];
this.setStartDragFromElement(e,_494.getMouseDownHTMLElement());
},_mouseMoveHandler:function(e){
try{
var _498=e.which!=undefined;
if(!this.interestedInMotionEvents){
return;
}
if(!this.hasSelection()){
return;
}
if(!this.currentDragObjectVisible){
this._startDrag(e);
}
if(!this.activatedDropZones){
this._activateRegisteredDropZones();
}
this.mouseCoords=[Event.pointerX(e),Event.pointerY(e)];
this._updateDraggableLocation(e);
this._updateDropZonesHover(e);
this._terminateEvent(e);
}
catch(e){
this.log("BBDragAndDrop._mouseMoveHandler(): "+e.message);
}
},_updateDraggableLocation:function(e){
var _49a=this.dragElement.style;
_49a.left=this.mouseCoords[0]+"px";
_49a.top=this.mouseCoords[1]+"px";
},_updateDropZonesHover:function(e){
var n=this.dropZones.length;
for(var i=0;i<n;i++){
if(!this._mousePointInDropZone(e,this.dropZones[i])){
this.dropZones[i].hideHover();
}
}
for(var i=0;i<n;i++){
if(this._mousePointInDropZone(e,this.dropZones[i])){
if(this.dropZones[i].canAccept(this.currentDragObjects)){
this.dropZones[i].showHover(e);
}
}
}
},_mouseUpHandler:function(e){
if(!this.hasSelection()){
return;
}
var _49f=e.which!=undefined;
if((_49f&&e.which!=1)||(!_49f&&e.button!=1)){
return;
}
this.interestedInMotionEvents=false;
if(this.dragElement==null){
this._terminateEvent(e);
return;
}
if(this._placeDraggableInDropZone(e)){
this._completeDropOperation(e);
}else{
this._terminateEvent(e);
var x=0;
var y=0;
if(this.origMouseCoords!=null){
x=this.origMouseCoords[0];
y=this.origMouseCoords[1];
}
new Rico.Effect.Position(this.dragElement,x,y,50,5,{complete:this._doCancelDragProcessing.bind(this)});
}
Event.stopObserving(document.body,"mousemove",this._mouseMove);
Event.stopObserving(document.body,"mouseup",this._mouseUp);
},registerDraggable:function(_4a2){
if($("queue")!=null){
if(_4a2.type=="MovieDraggable"&&_4a2.actionPath==null){
return;
}else{
this.draggables[this.draggables.length]=_4a2;
this._addMouseDownHandler(_4a2);
}
}
},clearDraggables:function(_4a3){
try{
for(var i=this.draggables.length-1;i>=0;i--){
if(this.draggables[i].type==_4a3){
this.draggables.removeItem(this.draggables[i]);
}
}
}
catch(e){
this.log("BBDragAndDrop.clearDraggables(): "+e.message);
}
},log:function(msg){
logger.error(msg);
}});
var dndBBMgr=new BBDragAndDrop();
dndBBMgr.initializeEventHandlers();
var BBDraggable=Class.create();
BBDraggable.removeOnDrop=false;
BBDraggable.revereNamesOnDrop=true;
BBDraggable.prototype=(new Rico.Draggable()).extend({initialize:function(el){
try{
if(el==null||el.length==0){
return null;
}
this.type="Custom";
this.htmlElement=$(el);
if(!this.continueProcessing()){
return null;
}
}
catch(e){
this.log("BBDraggable.initialize(): "+e.message);
}
},log:function(msg){
logger.error(msg);
},continueProcessing:function(){
try{
if(this.htmlElement!=null){
return true;
}else{
return false;
}
}
catch(e){
this.log("BBDraggable.continueProcessing(): "+e.message);
return false;
}
},select:function(){
this.selected=true;
},deselect:function(){
this.selected=false;
},startDrag:function(){
BBDraggable.isDragging=true;
},cancelDrag:function(){
BBDraggable.isDragging=false;
},endDrag:function(){
BBDraggable.isDragging=false;
if(BBDraggable.removeOnDrop){
this.htmlElement.style.display="none";
}
},getSingleObjectDragGUI:function(e){
},getDroppedGUI:function(){
},mousedOver:function(evt){
},mousedOut:function(evt){
},showLoading:function(evt){
},showFailure:function(evt){
this.log("<br/>Error retrieving movie details...");
},toString:function(){
var _4ad="";
_4ad="this.type: "+this.type+"<br/>";
_4ad+="this.htmlElement: "+this.htmlElement+"<br/>";
_4ad+="BBDraggable.isDragging: "+BBDraggable.isDragging+"<br/>";
return _4ad;
}});
BBDraggable.isDragging=false;
var BBDroppable=Class.create();
BBDroppable.prototype=(new Rico.Dropzone()).extend({initialize:function(el,_4af,_4b0){
this.htmlElement=$(el);
this.absoluteRect=null;
this.acceptedObjects=[];
this.marker=_4af;
this.position=_4b0;
this.offset=navigator.userAgent.toLowerCase().indexOf("msie")>=0?0:1;
this.droppedPosition=_4b0;
this.queueDiv=null;
this.actionPath=null;
this.index=this.extractIndexFromTag();
this.draggable=null;
this.childNodelen=null;
this.startingIndex=null;
this.pageStartingIndex=null;
this.pageStartingPosition=null;
this.value=null;
},activate:function(){
},deactivate:function(){
},showHover:function(e){
try{
this.droppedPosition=this.extractIndexFromTag();
var x=0;
var y=0;
if(document.all){
x=event.clientX;
y=event.clientY;
}else{
x=e.pageX;
y=e.pageY;
}
var _4b4=false;
this.where="upper";
Position.prepare();
Position.within(this.htmlElement,x,y);
if(Position.overlap("vertical",this.htmlElement)<=0.5){
this.where="lower";
this.droppedPosition++;
}
Position.clone(this.htmlElement,this.marker);
this.marker.style.top=parseInt(this.marker.style.top)+1+"px";
this.marker.style.height="1px";
if(this.where=="lower"){
this.marker.style.top=parseInt(this.marker.style.top)+parseInt(this.htmlElement.offsetHeight)+"px";
}
_4b4=true;
if(_4b4){
Element.show(this.marker);
}else{
Element.hide(this.marker);
}
}
catch(e){
this.log("BBDroppable.showHover(): "+e.message);
}
},hideHover:function(){
try{
if(this.marker!=null){
Element.hide(this.marker);
}
}
catch(e){
this.log("BBDroppable.hideHover(): "+e.message);
}
},accept:function(_4b5){
try{
var _4b6=_4b5[0];
if(_4b6.type==null||_4b6.type.length==0){
return;
}
if(_4b6.type=="MovieDraggable"&&_4b6.actionPath==null){
alert("No rentable product for this movie. Please try again later.");
return;
}
if(!this.prepareAjaxRequest(_4b6)){
return;
}
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.actionPath,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("BBDroppable.accept(): "+e.message);
}
},prepareAjaxRequest:function(_4b7){
try{
if(_4b7.type=="QueueDraggable"){
if(_4b7.actionPath==null){
return false;
}
this.queueDiv=_4b7.queueDiv;
this.actionPath=_4b7.actionPath;
this.draggable=_4b7;
this.childNodelen=htmlElement.parentNode.childNodes.length;
var i=0;
for(i=0;i<this.childNodelen;i++){
var row=htmlElement.parentNode.childNodes[i];
var _4ba=row.getElementsByTagName("qi")[0];
if(_4ba!=null){
this.startingIndex=i;
this.pageStartingIndex=_4ba.getAttribute("index");
this.pageStartingPosition=_4ba.getAttribute("position");
var _4bb=_4ba.getAttribute("setid").length;
var _4bc=null;
if(_4bb==0){
_4bc=row.childNodes[1].childNodes[0].childNodes[1];
}else{
if(_4bb>0){
_4bc=row.childNodes[2].childNodes[0].childNodes[1];
}
}
this.value=_4bc.getAttribute("value");
break;
}
}
var _4bd="";
var _4be=null;
if(this.droppedPosition!=0){
var _4bf=this.droppedPosition-1;
_4bf=this.startingIndex+_4bf;
if(this.pageStartingIndex!=0){
_4bf=_4bf-parseInt(this.pageStartingIndex);
if(_4bf>0){
_4be=htmlElement.parentNode.childNodes[_4bf];
}
}else{
_4be=htmlElement.parentNode.childNodes[_4bf];
}
if(_4be!=null){
var _4c0=_4be.getElementsByTagName("qi")[0];
_4bd=_4c0.getAttribute("itemid");
}
}
if(this.actionPath.indexOf("?")!=-1){
this.actionPath+="&";
}else{
this.actionPath+="?";
}
this.actionPath+="position="+this.droppedPosition+"&previousItemId="+_4bd;
return true;
}else{
return false;
}
}
catch(e){
this.log("BBDroppable.prepareAjaxRequest(): "+e.message);
return false;
}
},processResponse:function(_4c1){
try{
if(_4c1.loadAsOverlay==true){
Overlay=new popupContentHandler(_4c1,"boxPopup",null);
Overlay.execute();
this.setCursors("default");
document.body.style.cursor="default";
}else{
DndUtil.clearQueueDragAndDrop();
var List=document.getElementById("queueCurrentList");
var _4c3=(parseInt(this.startingIndex)+parseInt(this.draggable.oldIndex));
var _4c4=(parseInt(this.startingIndex)+parseInt(this.droppedPosition));
if(this.pageStartingIndex!=0){
_4c3=_4c3-parseInt(this.pageStartingIndex);
_4c4=_4c4-parseInt(this.pageStartingIndex);
List.insertBefore(htmlElement.parentNode.childNodes[_4c3],htmlElement.parentNode.childNodes[_4c4]);
}else{
List.insertBefore(htmlElement.parentNode.childNodes[_4c3],htmlElement.parentNode.childNodes[_4c4]);
var _4c5=0;
if(_4c4==0){
_4c4=_4c4+2;
_4c5=1;
this.draggable.oldIndex=0;
}else{
_4c5=_4c4-1;
}
var _4c6=htmlElement.parentNode.childNodes[_4c4];
var _4c7=htmlElement.parentNode.childNodes[_4c5];
var _4c8=htmlElement.parentNode.childNodes[this.startingIndex];
if(_4c5!=0&&this.draggable.oldIndex==0){
var atag=_4c6.childNodes[1].childNodes[0].childNodes[0].innerHTML;
_4c7.childNodes[1].childNodes[0].childNodes[0].innerHTML=atag;
var _4ca=_4c7.childNodes[0].childNodes[0].getAttribute("movietitle");
_4c7.childNodes[1].childNodes[0].childNodes[0].childNodes[0].setAttribute("title","Move \""+_4ca+"\" to top of Queue");
_4c7.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML="Move \""+_4ca+"\" to top of Queue";
_4c7.childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.cursor="pointer";
_4c8.childNodes[1].childNodes[0].childNodes[0].innerHTML="";
}
}
var m=1;
var k=0;
var _4cd=null;
var j=0;
var _4cf=parseInt(this.pageStartingPosition);
var _4d0=parseInt(this.value);
for(var i=parseInt(this.startingIndex),j=parseInt(this.pageStartingIndex);i<parseInt(this.childNodelen);i++,j++){
var _4d2=htmlElement.parentNode.childNodes[i];
var _4d3=_4d2.getElementsByTagName("qi")[0];
_4d3.setAttribute("index",j);
var _4ca=_4d3.getAttribute("movietitle");
if(i==parseInt(this.startingIndex)){
_4d3.setAttribute("position",(_4cf));
}else{
_4d3.setAttribute("position",(_4d0));
}
var _4d4=_4d3.getAttribute("setid").length;
var _4d5=_4d3.getAttribute("itemid");
var _4d6=_4d2.childNodes[1].childNodes[0].childNodes[1];
var _4d7=_4d2.childNodes[1].childNodes[0].childNodes[0].getElementsByTagName("a")[0];
if(_4d4==0){
_4d6.setAttribute("value",(_4d0));
_4d6.setAttribute("id",(_4d0));
_4d6.setAttribute("name","order("+_4d5+")");
_4cf=_4cf+1;
_4d0=_4d0+1;
if(_4d7!=null){
_4d7.onClick=function(){
"new Queue(this, '0').moveItem('"+_4d5+"');return false;";
};
_4d7.setAttribute("href","/browse/queuemgmt/fullQueue/moveItem?itemId="+_4d5+"&amp;position=0&amp;index="+j);
}
}else{
if(_4d4>0){
var _4d8=_4d2.childNodes.length;
var _4d9=_4d3.getAttribute("setid");
if(_4d6!=null&&_4d6.getAttribute("value")!=null&&_4d7!=null){
_4d7.onClick=function(){
"new Queue(this, '0').moveItem('"+_4d5+"');return false;";
};
_4d7.setAttribute("href","/browse/queuemgmt/fullQueue/moveItem?itemId="+_4d5+"&amp;position=0&amp;index="+j);
}else{
if(_4d7!=null){
_4d7.onClick=function(){
"new Queue(this, '0').moveSet('"+_4d9+"');return false;";
};
_4d7.setAttribute("href","/browse/queuemgmt/fullQueue/moveSet?setId="+_4d9+"&amp;position=0&amp;index="+j);
}
}
if(_4d8>0){
for(k=2;k<_4d8;k++){
var _4da=_4d2.childNodes[k].childNodes[0].childNodes[1];
if(_4da!=null){
_4da.setAttribute("value",(_4d0));
_4da.setAttribute("id",(_4d0));
_4da.setAttribute("name","order("+_4d5+")");
_4cf=_4cf+1;
_4d0=_4d0+1;
}
}
if(_4d6!=null&&_4d6.getAttribute("value")!=null){
_4d6.setAttribute("value",(_4d0));
_4d6.setAttribute("id",(_4d0));
_4d6.setAttribute("name","order("+_4d5+")");
_4cf=_4cf+1;
_4d0=_4d0+1;
}
}
}
}
}
var _4db=document.getElementById("mQueueCorners");
if(_4db){
_4db.style.display="none";
_4db.style.display="block";
}
new UpdateButtons().update(_4c1);
DndUtil.registerQueueDragAndDrop();
this.setCursors("default");
}
}
catch(e){
this.log("BBDroppable.processResponse(): "+e.message);
}
},handleError:function(){
this.setCursors("default");
},setCursors:function(_4dc){
try{
nodes=this.queueDiv.childNodes;
for(i=0;i<nodes.length;i++){
if(nodes[i].nodeType==1){
nodes[i].style.cursor=_4dc;
}
}
this.queueDiv.style.cursor=_4dc;
document.body.style.cursor=_4dc;
}
catch(e){
this.log("BBDroppable.setCursors(): "+e.message);
}
},canAccept:function(_4dd){
try{
for(var i=0;i<_4dd.length;i++){
if(_4dd[i]==null){
return false;
}
}
return true;
}
catch(e){
this.log("BBDroppable.canAccept(): "+e.message);
return false;
}
},extractPositionFromTag:function(){
try{
var _4df=this.htmlElement.getElementsByTagName("qi")[0];
if(_4df==null||_4df.length==0){
return 0;
}
return parseInt(_4df.getAttribute("position"));
}
catch(e){
this.log("BBDroppable.getActionPath(): "+e.message);
return 0;
}
},extractIndexFromTag:function(){
try{
var _4e0=this.htmlElement.getElementsByTagName("qi")[0];
if(_4e0==null||_4e0.length==0){
return 0;
}
return parseInt(_4e0.getAttribute("index"));
}
catch(e){
this.log("BBDroppable.getActionPath(): "+e.message);
return 0;
}
},displayDetails:function(_4e1){
},showLoading:function(evt){
},showFailure:function(evt){
},log:function(msg){
logger.error(msg);
}});
var DndUtil=Class.create();
DndUtil.createDropZones=function(el){
try{
this.htmlElement=$(el);
if(this.htmlElement==null){
return;
}
var _4e6=this.htmlElement.childNodes;
if(_4e6==null||_4e6.length==0){
return;
}
this.marker=$("dropmarker");
if(this.marker==null){
return;
}
for(i=0;i<_4e6.length;i++){
if(_4e6[i].nodeType==1){
dndBBMgr.registerDropZone(new BBDroppable(_4e6[i],this.marker,i));
}
}
}
catch(e){
logger.error("DndUtil.createDropZones(): "+e.message);
}
};
DndUtil.clearQueueDragAndDrop=function(){
try{
dndBBMgr.clearDropZones();
dndBBMgr.clearDraggables("QueueDraggable");
}
catch(e){
logger.error("DndUtil.clearQueueDragAndDrop(): "+e.message);
}
};
DndUtil.registerQueueDragAndDrop=function(){
try{
var _4e7=document.getElementsByName("pg.1.sort")[0];
if(_4e7){
if(_4e7.value!="position asc"){
return;
}
}
DndUtil.createDropZones("queueCurrentList");
DndUtil.createQueueDraggables("queueCurrentList");
}
catch(e){
logger.error("DndUtil.registerQueueDragAndDrop(): "+e.message);
}
};
DndUtil.createQueueDraggables=function(el){
try{
this.htmlElement=$(el);
if(this.htmlElement==null){
return;
}
var _4e9=this.htmlElement.childNodes;
if(_4e9==null||_4e9.length==0){
return;
}
for(var i=0;i<_4e9.length;i++){
if(_4e9[i].nodeType==1){
dndBBMgr.registerDraggable(new QueueDraggable(_4e9[i]));
}
}
}
catch(e){
logger.error("DndUtil.createQueueDraggables(): "+e.message);
}
};
var QueueDraggable=Class.create();
QueueDraggable.prototype=(new BBDraggable()).extend({initialize:function(el){
this.type="QueueDraggable";
this.htmlElement=$(el);
this.actionPath=null;
this.queueType=null;
this.queueDiv=$("queueContentsContainer");
this.movieTitle="Untitled";
this.titleElement=null;
this.anchorElement=null;
this.titleRollover=null;
this.posElement=null;
this.moveTopElement=null;
this.removeElement=null;
this.ratingElement=null;
this.queueFormatElement=null;
this.oldPosition=null;
this.position=null;
this.oldIndex=null;
if(this.htmlElement==null){
return;
}
this.extractDataFromQueueTag();
if(this.queueType!=null&&this.queueType=="full"){
this.handleFullQueueDraggable();
}
},extractDataFromQueueTag:function(){
try{
var _4ec=this.htmlElement.getElementsByTagName("qi")[0];
if(_4ec==null||_4ec.length==0){
return;
}
this.queueType=_4ec.getAttribute("queueType").toLowerCase();
if(this.queueType!="mini"&&this.queueType!="full"){
return;
}
var _4ed=_4ec.getAttribute("setId");
var _4ee=_4ec.getAttribute("itemId");
if(_4ec.getAttribute("movieTitle")!=null){
this.movieTitle=_4ec.getAttribute("movieTitle");
}
if(_4ec.getAttribute("position")!=null){
this.position=_4ec.getAttribute("position");
}
if(_4ec.getAttribute("index")!=null){
this.oldIndex=_4ec.getAttribute("index");
}
var _4ef="";
if(this.queueType=="mini"){
_4ef="miniQueue";
}else{
_4ef="fullQueue";
}
if(_4ed!=null&&_4ed.length>0){
this.actionPath="/queuemgmt/"+_4ef+"/moveSet?setId="+_4ed;
}else{
if(_4ee!=null&&_4ee.length>0){
this.actionPath="/queuemgmt/"+_4ef+"/moveItem?itemId="+_4ee;
}
}
}
catch(e){
this.log("QueueDraggable.getActionPath(): "+e.message);
}
},getSingleObjectDragGUI:function(e){
try{
var div=document.createElement("div");
div.className="MovieItemUI dragToQLabel";
var _4f2=this.movieTitle;
this.oldPosition=this.position;
while(_4f2.indexOf(" ")!=-1){
_4f2=_4f2.replace(" ","&nbsp;");
}
div.style.zIndex="1000";
new Insertion.Top(div,_4f2);
return div;
}
catch(e){
this.log("QueueDraggable.getSingleObjectDragGUI(): "+e.message);
return null;
}
},handleFullQueueDraggable:function(){
this.killDraggingBasedOnClass();
this.findTitleElement();
if(this.titleElement==null){
return;
}
this.findAnchorElement();
if(this.anchorElement==null){
return;
}
this.titleRollover=new Rollover(this.titleElement,this.anchorElement);
},findTitleElement:function(){
try{
var divs=this.htmlElement.getElementsByTagName("div");
if(divs!=null&&divs.length>0){
for(var i=0;i<divs.length;i++){
if(divs[i].className!=null&&divs[i].className.indexOf("title")!=-1){
this.titleElement=divs[i];
break;
}
}
}
}
catch(e){
this.log("QueueDraggable.findTitleElement(): "+e.message);
}
},findAnchorElement:function(){
try{
var _4f5=this.titleElement.getElementsByTagName("a");
if(_4f5!=null&&_4f5.length>0){
if(_4f5[0].getAttribute("href")!=null&&_4f5[0].getAttribute("href").length>0){
this.anchorElement=_4f5[0];
}
}
}
catch(e){
this.log("QueueDraggable.findAnchorElement(): "+e.message);
}
},killDraggingBasedOnClass:function(){
try{
this.posElement=document.getElementsByClassName("bvr-pos",this.htmlElement)[0];
this.moveTopElement=document.getElementsByClassName("bvr-qmovetop",this.htmlElement)[0];
this.removeElement=document.getElementsByClassName("bvr-qremove",this.htmlElement)[0];
this.ratingElement=document.getElementsByClassName("bvr-rating",this.htmlElement)[0];
this.queueFormatElement=document.getElementsByClassName("bvr-qformat",this.htmlElement)[0];
if(this.posElement!=null){
this.handlerTextChange=this.onPositionChange.bindAsEventListener(this);
Event.observe(this.posElement,"change",this.handlerTextChange);
Event.observe(this.posElement,"mousedown",this.eventSoak);
}
if(this.moveTopElement!=null){
Event.observe(this.moveTopElement,"mousedown",this.eventSoak);
}
if(this.removeElement!=null){
Event.observe(this.removeElement,"mousedown",this.eventSoak);
}
if(this.ratingElement!=null){
Event.observe(this.ratingElement,"mousedown",this.eventSoak);
}
if(this.queueFormatElement!=null){
Event.observe(this.queueFormatElement,"mousedown",this.eventSoak);
}
}
catch(e){
this.log("QueueDraggable.killDraggingBasedOnClass(): "+e.message);
}
},eventSoak:function(e){
Event.stop(e);
},onPositionChange:function(){
var _4f7=this.posElement.value;
if(isNaN(_4f7)||parseInt(_4f7)<=0){
this.posElement.value=this.posElement.id;
}
},toString:function(){
var _4f8="";
_4f8="this.type: "+this.type+"<br/>";
_4f8+="this.htmlElement: "+this.htmlElement+"<br/>";
_4f8+="this.actionPath: "+this.actionPath+"<br/>";
_4f8+="this.movieTitle: "+this.movieTitle+"<br/>";
_4f8+="this.titleElement: "+this.titleElement+"<br/>";
_4f8+="this.titleRollover: "+this.titleRollover+"<br/>";
_4f8+="this.oldPosition: "+this.oldPosition+"<br/>";
_4f8+="this.oldIndex: "+this.oldIndex+"<br/>";
return _4f8;
},log:function(msg){
logger.error(msg);
}});
var QueuePosition=Class.create();
QueuePosition.prototype.initialize=function(){
};
QueuePosition.position=function(){
if(!document.getElementById){
return;
}
if(!this._oHead||!this._oNav||!this._oQueue||!this._oContents||!this._oReco||(this._oQueue.className.indexOf("mQueue")==-1)){
return;
}
this._oRecent=$("queueRecent");
this._oRecos=$("reco");
var _4fa=0;
var _4fb=12;
var _4fc=9;
var _4fd=(this._oHead.offsetHeight+this._oNav.offsetHeight+_4fa+(this._oRecos?this._oRecos.offsetHeight+_4fb:0));
var _4fe=_4fd-window.pageYOffset;
var _4ff=window.innerHeight-(_4fe>0?_4fe:0)-_4fc;
if(_4ff<document.body.offsetHeight){
this._oQueue.style.maxHeight=document.body.offsetHeight+"px";
}else{
this._oQueue.style.maxHeight=_4ff+"px";
}
this._oQueue.style.zIndex="5";
this._oContents.style.height="auto";
this._oContents.style.position="relative";
if(_4fe<1){
this._oQueue.style.width=(this._oReco.offsetWidth)+"px";
this._oQueue.style.position="fixed";
this._oQueue.style.top="0";
}else{
this._oQueue.style.position="relative";
this._oQueue.style.width="auto";
this._oQueue.style.top="0";
}
if(this._oRecent){
this._oRecent.style.position="relative";
this._oRecent.style.left="0";
this._oRecent.style.zIndex="3";
var _500=this._oQueue.offsetHeight-this._oContents.offsetHeight;
if(_500>0){
_500=0;
}
this._oRecent.style.top=_500+"px";
}
};
function Main(){
if(window.MainHasRun){
return;
}
window.MainHasRun=true;
var _501=new QueuePosition();
_501._oHead=$("head");
_501._oNav=$("nav");
_501._oQueue=$("queue");
_501._oRecent=$("queueRecent");
_501._oContents=$("qContents");
_501._oReco=$("reco");
if(!document.all){
QueuePosition.position();
Event.observe(window,"scroll",QueuePosition.position.bind(_501));
Event.observe(window,"resize",QueuePosition.position.bind(_501));
setInterval("QueuePosition.position();",500);
}
DndUtil.windowLoaded=true;
}
Event.observe(window,"DOMContentLoaded",Main);
Event.observe(window,"load",Main);
var Queue=Class.create();
Queue.prototype={initialize:function(el,_503,_504){
this.el=$(el);
this.queueDiv=$("queueContentsContainer");
this.updateMiniQueue=true;
this.cartDiv=$("miniCart");
this.titleId=null;
this.packageId=null;
this.productId=null;
this.mktItemId=null;
this.listName=null;
this.catalystInfo=null;
this.catalystUrl=location.href;
this.movieTitle="Untitled";
this.url=null;
this.tempUrl=null;
this.qItemTag=null;
this.position=(_503!=null&&_503.length>0)?_503:-1;
this.completeAction=true;
this.qItemDiv=null;
this.qItemId=null;
this.expanded=true;
this.mainParentNode=null;
this.similarMoviesUrl=_504;
this.actionType="";
this.saveQ=false;
this.overloadRunning="false";
this.index=null;
this.actionName="";
if(this.el==null){
this.completeAction=false;
return this;
}
this.url=this.el.getAttribute("href");
this.tempUrl=this.url;
if(this.queueDiv==null){
this.updateMiniQueue=false;
if(this.cartDiv==null){
this.completeAction=false;
}
}
this.url=this.el.getAttribute("href");
if(this.url==null||this.url.length==0){
this.completeAction=false;
return this;
}
tokens=this.url.split("?");
var id=null;
if(tokens==null){
this.completeAction=false;
return this;
}
this.url=tokens[0];
try{
if(tokens.length>1){
var _506=tokens[1].split("&");
this.qItemId=_506[0].split("=")[1];
if(_506[2]!=null){
this.index=_506[2].split("=")[1];
}
var _507=_506[1].split("/");
if(_507.length>1){
if(_507[0].split("=")[1]=="true"){
this.saveQ=true;
}
this.overloadRunning=_507[1];
this.url=this.url+"/overlay";
}else{
if(_506[1].split("=")[1]=="true"){
this.saveQ=true;
}
}
}
this.mainParentNode=this.findParent(this.el);
}
catch(e){
}
return this;
},log:function(msg){
logger.error(msg);
},readCookie:function(name){
var _50a=name+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_50a)==0){
return c.substring(_50a.length,c.length);
}
}
return null;
},add:function(){
try{
this.url=this.url.replace(/^https?:\/\/[^\/]+/,"");
if(this.el.getAttribute("addClicked")!=null){
return true;
}
this.actionType="add";
this.qItemDiv=$(this.qItemId);
if(this.qItemDiv==null){
this.overloadRunning="true";
return false;
}
if(this.qItemDiv.getElementsByTagName("mt")!=null&&this.qItemDiv.getElementsByTagName("mt").length>0){
this.qItemTag=this.qItemDiv.getElementsByTagName("mt")[0];
this.titleId=this.qItemTag.getAttribute("titleId");
this.facebookTitleId=this.titleId;
}else{
if(this.qItemDiv.getElementsByTagName("mpkg")!=null&&this.qItemDiv.getElementsByTagName("mpkg").length>0){
this.qItemTag=this.qItemDiv.getElementsByTagName("mpkg")[0];
this.packageId=this.qItemTag.getAttribute("packageId");
}else{
if(this.qItemDiv.getElementsByTagName("mpr")!=null&&this.qItemDiv.getElementsByTagName("mpr").length>0){
this.qItemTag=this.qItemDiv.getElementsByTagName("mpr")[0];
this.productId=this.qItemTag.getAttribute("productId");
}else{
if(this.qItemDiv.getElementsByTagName("mkt")!=null&&this.qItemDiv.getElementsByTagName("mkt").length>0){
this.qItemTag=this.qItemDiv.getElementsByTagName("mkt")[0];
this.mktItemId=this.qItemTag.getAttribute("marketingitemid");
}
}
}
}
this.listName=this.qItemTag.getAttribute("listName");
this.catalystInfo=this.qItemTag.getAttribute("catalystInfo");
var _50e=this.qItemDiv.getElementsByTagName("a");
if(_50e!=null){
this.movieTitle=_50e[0].getAttribute("title");
}
if(this.movieTitle==null||this.movieTitle==""||this.movieTitle=="undefined"){
var tags=document.getElementsByTagName("h1");
if(tags!=null&&tags.length>0){
this.movieTitle=tags[0].innerHTML;
}else{
this.movieTitle="";
}
}
var _510=new Array();
if(this.titleId!=null){
_510["titleId"]=this.titleId;
}
if(this.packageId!=null){
_510["packageId"]=this.packageId;
}
if(this.productId!=null){
_510["productId"]=this.productId;
}
if(this.mktItemId!=null){
_510["mktItemId"]=this.mktItemId;
}
if(this.listName!=null){
_510["listName"]=this.listName;
}
if(this.catalystUrl!=null){
_510["catalystUrl"]=this.catalystUrl;
}
if(this.catalystInfo!=null){
_510["catalystInfo"]=this.catalystInfo;
}
_510["position"]=this.position;
this.url=this.urlWithQueryString(this.url,_510);
this.setCursors("wait");
this.el.setAttribute("addClicked","true");
new BaseHandler().processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
return true;
}
catch(e){
this.log("Queue.add(): "+e.message);
return false;
}
},updateStatus:function(_511){
try{
var _512=new Array();
_512["mktItemId"]=this.qItemId;
var _513=document.getElementsByName("gameFormatUpdate");
for(i=0;i<_513.length;i++){
if(_513[i].checked==true){
_512["gameFormatUpdate"]=_513[i].value;
}
}
_512["catalogGamePlatform"]=_511;
this.url=this.urlWithQueryString("/discformat/processUpdateGameFormatPreference",_512);
new BaseHandler().processAjaxRequest(this.url,"",this.processResponseClose.bind(this),this.processResponseClose.bind(this));
return false;
}
catch(e){
this.log("Queue.updateStatus(): "+e.message);
return false;
}
},moveSet:function(_514){
try{
if(!this.completeAction){
return;
}
var _515=new Array();
if(_514!=null){
_515["setId"]=_514;
}
_515["position"]=this.position;
this.url=this.urlWithQueryString(this.url,_515);
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.moveSet(): "+e.message);
return;
}
},moveItem:function(_516){
try{
if(!this.completeAction){
return;
}
var _517=new Array();
if(_516!=null){
_517["itemId"]=_516;
}
_517["position"]=this.position;
this.url=this.urlWithQueryString(this.url,_517);
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.moveItem(): "+e.message);
return;
}
},removeSet:function(_518){
try{
if(!this.completeAction){
return;
}
var _519=new Array();
if(_518!=null){
_519["setId"]=_518;
}
this.url=this.urlWithQueryString(this.url,_519);
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.removeSet(): "+e.message);
return;
}
},removeItem:function(_51a){
try{
if(!this.completeAction){
return;
}
var _51b=new Array();
if(_51a!=null){
_51b["itemId"]=_51a;
}
this.url=this.urlWithQueryString(this.url,_51b);
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.removeItem(): "+e.message);
return;
}
},breakSet:function(_51c){
try{
if(!this.completeAction){
return;
}
if(_51c==null||_51c.length==0){
return;
}
if(confirm("This will break up this set/series, do you want to proceed?")){
var _51d=new Array();
if(_51c!=null){
_51d["setId"]=_51c;
}
this.url=this.urlWithQueryString(this.url,_51d);
this.actionName="BREAKSET";
this.setCursors("wait");
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
}
catch(e){
this.log("Queue.breakSet(): "+e.message);
return;
}
},refresh:function(){
try{
this.url="/queuemgmt/updateQueue";
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.refresh(): "+e.message);
return;
}
},processResponseClose:function(_51e){
Overlay.close();
document.location.reload(true);
return false;
},processResponse:function(_51f){
try{
if(_51f.processDVDOffer=="true"){
var _520=_51f.blurayPackageId;
var _521=_51f.standardDVDPackageId;
var _522=_51f.offerDVDSettingsRequired;
if(_520!=null&&_521!=null){
OfferDVDLoader=new OfferDVD(_520,_521,this.position,_522,this.catalystUrl,this.catalystInfo);
OfferDVDLoader.openOverlay();
}
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}else{
var _523="false";
if(this.overloadRunning=="true"){
if(document.getElementsByTagName("span")!=null){
if(document.getElementsByTagName("span")[0]!=null){
if(document.getElementsByTagName("span")[0].innerHTML!=null){
if(document.getElementsByTagName("span")[0].innerHTML=="Similar Movies"){
_523="true";
}
}
}
}
}
if(this.overloadRunning!="true"&&_51f.loadAsOverlay=="true"){
try{
if(_51f.titleIds==null||_51f.packageIds==null||_51f.productIds==null||_51f.mktItemIds==null){
return;
}
var _524=null;
if(this.titleId!=null){
_524="title";
}
if(this.packageId!=null){
_524="package";
}
if(this.productId!=null){
_524="product";
}
if(this.mktItemId!=null){
_524="mktItem";
}
var _525="";
if(_524=="mktItem"){
_525="/queuemgmt/queue/mktItemOverlay/"+_524+"/"+this.qItemId;
}else{
_525="/queuemgmt/queue/overlay/"+_524+"/"+this.qItemId;
}
if(_51f.offereDVDPackageAdded=="true"){
_525=_525+"?dvdVersionAdded=true";
}
Queue.overlay=new QueueOverlay(_525,"boxPopup","",null);
Queue.overlay.execute();
}
catch(e){
this.log("Queue.processResponse(): "+e.message);
}
if(this.updateMiniQueue==true){
this.queueDiv.innerHTML=_51f.responseBody;
var _526=document.getElementById("mQueueCorners");
if(_526){
_526.style.display="none";
_526.style.display="block";
}
}
new UpdateButtons().update(_51f);
this.setCursors("");
this.el.removeAttribute("addClicked");
}else{
if(_51f.loadAsOverlay==true&&_51f.unSupportedPlatform==true){
Overlay=new popupContentHandler(_51f,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}else{
if(_51f.loadAsOverlay==true){
if(this.actionType=="add"){
if(this.facebookTitleId!=null){
fbEvent.publish_event("queue","/aff/p.26880/catalog/movieDetails/"+this.facebookTitleId);
}
}
Overlay=new popupContentHandler(_51f,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}else{
if(this.updateMiniQueue==true){
var _527=this.url.split("?");
var _528=_527[0].split("/");
var _529=null;
if(_528.length>1){
_529=_528[_528.length-1];
}
if(document.location.pathname!="/browse/queuemgmt/fullQueue"||_529=="moveItem"||_529=="moveSet"){
DndUtil.clearQueueDragAndDrop();
if(document.location.pathname!="/browse/queuemgmt/fullQueue"){
this.queueDiv.innerHTML=_51f.responseBody;
}
this.updateQueueContent();
var _526=document.getElementById("mQueueCorners");
if(_526){
_526.style.display="none";
_526.style.display="block";
}
DndUtil.registerQueueDragAndDrop();
}
}
new UpdateButtons().update(_51f);
this.setCursors("default");
if(this.actionType=="add"){
if(this.facebookTitleId!=null){
fbEvent.publish_event("queue","/aff/p.26880/catalog/movieDetails/"+this.facebookTitleId);
}
}
if(document.location.pathname=="/browse/queuemgmt/fullQueue"&&this.actionName=="BREAKSET"){
window.location.reload();
}
}
}
}
}
}
catch(e){
this.log("Queue.processResponse(): "+e.message);
}
},updateQueueContent:function(){
try{
var List=document.getElementById("queueCurrentList");
var _52b=htmlElement.parentNode.childNodes.length;
var j=0;
var _52d=0;
var _52e=0;
var id=0;
for(j=0;j<_52b;j++){
var row=htmlElement.parentNode.childNodes[j];
var _531=row.getElementsByTagName("qi")[0];
if(_531!=null){
_52d=_531.getAttribute("index");
_52e=_531.getAttribute("position");
var _532=_531.getAttribute("setid").length;
var _533=null;
if(_532==0){
_533=row.childNodes[1].childNodes[0].childNodes[1];
}else{
if(_532>0){
_533=row.childNodes[2].childNodes[0].childNodes[1];
}
}
id=_533.getAttribute("value");
break;
}
}
var _534=(parseInt(this.index)+j);
if(_52d!=0){
List.removeChild(htmlElement.parentNode.childNodes[(_534-_52d)]);
}else{
List.insertBefore(htmlElement.parentNode.childNodes[_534],htmlElement.parentNode.childNodes[j]);
var _535=htmlElement.parentNode.childNodes[j];
var _536=htmlElement.parentNode.childNodes[j+1];
var _537=_535.childNodes[1].childNodes[0].childNodes[0];
var _538=_536.childNodes[1].childNodes[0].childNodes[0];
this.element=_537.innerHTML;
_538.innerHTML=this.element;
var _539=_536.childNodes[0].childNodes[0].getAttribute("movietitle");
_538.childNodes[0].setAttribute("title","Move \""+_539+"\" to top of Queue");
_538.childNodes[0].innerHTML="Move \""+_539+"\" to top of Queue";
_538.childNodes[0].style.cursor="pointer";
_537.innerHTML="";
}
var m=1;
var k=0;
var _53c=null;
var l=0;
_52e=parseInt(_52e);
id=parseInt(id);
for(i=j,l=_52d;i<_52b;i++,l++){
var _53e=htmlElement.parentNode.childNodes[i];
var _53f=_53e.getElementsByTagName("qi")[0];
_53f.setAttribute("index",l);
if(i==j){
_53f.setAttribute("position",(_52e));
}else{
_53f.setAttribute("position",(id));
}
var _532=_53f.getAttribute("setid").length;
var _540=_53f.getAttribute("itemid");
var _533=_53e.childNodes[1].childNodes[0].childNodes[1];
var _541=_53e.childNodes[1].childNodes[0].childNodes[0].getElementsByTagName("a")[0];
if(_532==0){
_533.setAttribute("value",(id));
_533.setAttribute("id",(id));
_533.setAttribute("name","order("+_540+")");
_52e=_52e+1;
id=parseInt(id)+1;
if(_541!=null){
_541.onClick=function(){
"new Queue(this, '0').moveItem('"+_540+"');return false;";
};
_541.setAttribute("href","/browse/queuemgmt/fullQueue/moveItem?itemId="+_540+"&amp;position=0&amp;index="+l);
}
}else{
if(_532>0){
var _542=_53e.childNodes.length;
var _543=_53f.getAttribute("setid");
if(_533!=null&&_533.getAttribute("value")!=null&&_541!=null){
_541.onClick=function(){
"new Queue(this, '0').moveItem('"+_540+"');return false;";
};
_541.setAttribute("href","/browse/queuemgmt/fullQueue/moveItem?itemId="+_540+"&amp;position=0&amp;index="+l);
}else{
if(_541!=null){
_541.onClick=function(){
"new Queue(this, '0').moveSet('"+_543+"');return false;";
};
_541.setAttribute("href","/browse/queuemgmt/fullQueue/moveSet?setId="+_543+"&amp;position=0&amp;index="+l);
}
}
if(_542>0){
for(k=2;k<_542;k++){
var _544=_53e.childNodes[k].childNodes[0].childNodes[1];
if(_544!=null){
_544.setAttribute("value",(id));
_544.setAttribute("id",(id));
_544.setAttribute("name","order("+_540+")");
_52e=_52e+1;
id=parseInt(id)+1;
}
}
if(_533!=null&&_533.getAttribute("value")!=null){
_533.setAttribute("value",(id));
_533.setAttribute("id",(id));
_533.setAttribute("name","order("+_540+")");
_52e=_52e+1;
id=parseInt(id)+1;
}
}
}
}
}
}
catch(e){
this.log("Queue.updateQueueContent(): "+e.message);
return;
}
},getURI:function(){
var _545=document.location.pathname;
return _545;
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
},setCursors:function(_546){
this.el.style.cursor=_546;
document.body.style.cursor=_546;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_546;
}
},findParent:function(el){
try{
if(el.getAttribute("id")!=null){
if(el.getAttribute("id")==this.qItemId){
return el;
}else{
return this.findParent(el.parentNode);
}
}else{
return this.findParent(el.parentNode);
}
}
catch(e){
return null;
}
},highlightColor:function(el){
rootEl=el.parentNode.parentNode;
if(el.checked){
Element.addClassName(rootEl,"highlight");
}else{
Element.removeClassName(rootEl,"highlight");
}
},processAnonUser:function(){
try{
var _549=null;
var _54a=null;
if(this.tempUrl.indexOf("addTitleToQueue")>0){
this.qItemType="title";
}else{
if(this.tempUrl.indexOf("addPackageToQueue")>0){
this.qItemType="package";
}else{
if(this.tempUrl.indexOf("addProductToQueue")>0){
this.qItemType="product";
}else{
this.qItemType="mktItem";
}
}
}
var _54b=this.tempUrl.split("?");
if(_54b.length>1){
var _54c=_54b[1].split("&");
this.qItemId=_54c[0].split("=")[1];
}
var _54d="/queuemgmt/Queue/anonUserAddToQueue/"+this.qItemType+"/"+this.qItemId+"/find/false";
new BaseHandler().processAjaxRequest(_54d,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.processAnonUser(): "+e.message);
}
return this;
},html_entity_decode:function(str){
var ta=document.createElement("textarea");
ta.innerHTML=str;
return ta.value;
},urlWithQueryString:function(url,_551){
var hash=$H(_551);
var _553=hash.toQueryString();
if(_553!=null&&_553.length>0){
url+="?"+_553;
}
return url;
}};
Queue.expandCollapse=function(el,_555){
if(_555==null||_555.length==0){
return;
}
this.el=$(el);
expandCollapseEl=$(_555);
if(expandCollapseEl==null){
return;
}
var _556=getCookie("browsingSession");
if(_556=="block"){
expandCollapseEl.style.display="none";
this.el.parentNode.className="toggleExpand";
setCookie("browsingSession","none","100");
}else{
expandCollapseEl.style.display="block";
this.el.parentNode.className="toggle";
setCookie("browsingSession","block","100");
}
};
Queue.getSplashPageUrl=function(){
var url=window.location.href;
var _558="http://";
if(url.indexOf("http://")!=-1){
url=url.substring(7);
}else{
if(url.indexOf("https://")!=-1){
_558="https://";
url=url.substring(8);
}
}
serverAndPort=url.substring(0,url.indexOf("/")+1);
return (_558+serverAndPort);
};
Queue.getTitleUrl=function(_559){
var url=window.location.href;
var _55b="http://";
if(url.indexOf("http://")!=-1){
url=url.substring(7);
}else{
if(url.indexOf("https://")!=-1){
_55b="https://";
url=url.substring(8);
}
}
serverAndPort=url.substring(0,url.indexOf("/")+1);
return (_55b+serverAndPort+"/aff/p.26880//catalog/movieDetails/"+_559);
};
var UpdateButtons=Class.create();
UpdateButtons.prototype={initialize:function(){
},log:function(msg){
logger.error(msg);
},update:function(_55d){
try{
if(_55d.titleIds==null||_55d.packageIds==null||_55d.productIds==null||_55d.mktItemIds==null){
return;
}
this.updateByTitleIds(_55d.titleIds);
this.updateByPackageIds(_55d.packageIds);
this.updateByProductIds(_55d.productIds);
this.updateByMarketingIds(_55d.mktItemIds);
}
catch(e){
this.log("UpdateButtons.update(): "+e.message);
}
},updateByTitleIds:function(_55e){
try{
tags=document.getElementsByTagName("mt");
this.updateMovieDivs(tags,_55e,"titleId");
}
catch(e){
this.log("UpdateButtons.updateByTitleIds(): "+e.message);
}
},updateByPackageIds:function(_55f){
try{
tags=document.getElementsByTagName("mpkg");
this.updateMovieDivs(tags,_55f,"packageId");
}
catch(e){
this.log("UpdateButtons.updateByPackageIds(): "+e.message);
}
},updateByProductIds:function(_560){
try{
tags=document.getElementsByTagName("mpr");
this.updateMovieDivs(tags,_560,"productId");
}
catch(e){
this.log("UpdateButtons.updateByProductIds(): "+e.message);
}
},updateByMarketingIds:function(_561){
try{
tags=document.getElementsByTagName("mkt");
this.updateMovieDivs(tags,_561,"marketingitemid");
}
catch(e){
this.log("UpdateButtons.updateByMarketingIds(): "+e.message);
}
},updateMovieDivs:function(_562,ids,_564){
try{
for(i=0;i<_562.length;i++){
id=_562[i].getAttribute(_564);
parentNode=_562[i].parentNode;
if(id==null){
continue;
}
if(ids[id]!=null&&ids[id]){
Element.addClassName(parentNode,"inQueue");
}
}
}
catch(e){
this.log("UpdateButtons.updateMovieDivs(): "+e.message);
}
}};
var QueueOverlay=Class.create();
QueueOverlay.prototype=(new popupUrlHandler()).extend({updatePosition:function(){
var head=$("head");
var nav=$("nav");
var _567=(head?head.offsetHeight:0)+(nav?nav.offsetHeight:0)+8;
if(_567<0){
_567=20;
}
this.divEl.style.top=this.scrollOffset()+_567+"px";
}});
var RegisteredUserOverlay=Class.create();
RegisteredUserOverlay.prototype={initialize:function(el,URL){
this.el=$(el);
this.Url=URL;
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.Url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("RegisteredUserOverlay.add(): "+e.message);
}
},processResponse:function(_56a){
try{
if(_56a.loadAsOverlay==true){
Overlay=new popupContentHandler(_56a,"boxPopup",null);
Overlay.execute();
this.setCursors("default");
this.el.style.cursor="pointer";
}
}
catch(e){
this.log("RegisteredUserOverlay.processResponse(): "+e.message);
}
},setCursors:function(_56b){
this.el.style.cursor=_56b;
document.body.style.cursor=_56b;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_56b;
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
var SimilarMovies=Class.create();
SimilarMovies.prototype={initialize:function(el,_56d,_56e){
this.el=$(el);
this.url=_56e;
this.position=_56d;
return this;
},log:function(msg){
logger.error(msg);
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("Queue.add(): "+e.message);
return false;
}
},processResponse:function(_570){
try{
if(this.position==2){
_570.loadAsOverlay=true;
}
if(_570.loadAsOverlay==true){
Overlay=new popupContentHandler(_570,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}
if(this.position==3){
document.getElementById("discFormat").value=_570.discPreference;
document.getElementById("saveBtn").disabled=true;
document.getElementById("responsemsg").innerHTML=_570.discPreference;
if(_570.discPreference=="BR"){
document.getElementById("responsemsg").innerHTML="Blu-ray";
}
}
}
catch(e){
this.log("Queue.processResponse(): "+e.message);
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
},setCursors:function(_571){
this.el.style.cursor=_571;
document.body.style.cursor=_571;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_571;
}
}};
var BulkAddToQueue=Class.create();
BulkAddToQueue.prototype={initialize:function(el,URL){
this.el=$(el);
this.Url=URL;
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.Url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("BulkAddToQueue.add(): "+e.message);
}
},processResponse:function(_574){
try{
if(_574.loadAsOverlay==true){
Overlay=new popupContentHandler(_574,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}
}
catch(e){
this.log("BulkAddToQueue.processResponse(): "+e.message);
}
},setCursors:function(_575){
this.el.style.cursor=_575;
document.body.style.cursor=_575;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_575;
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
function validate(){
var chks=document.getElementsByName("selectedTitleId");
var _577=false;
for(var i=0;i<chks.length;i++){
if(chks[i].checked&&!chks[i].disabled){
_577=true;
break;
}
}
if(_577==false){
document.getElementsByName("add")[0].disabled=true;
document.getElementsByName("add")[1].disabled=true;
return false;
}else{
document.getElementsByName("add")[0].disabled=false;
document.getElementsByName("add")[1].disabled=false;
}
return true;
}
var EmptyQueue=Class.create();
EmptyQueue.prototype={initialize:function(el,URL){
this.el=$(el);
this.Url=URL;
},add:function(){
try{
new BaseHandler().processAjaxRequest(this.Url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("EmptyQueue.add(): "+e.message);
}
},processResponse:function(_57b){
try{
if(_57b.loadAsOverlay==true){
Overlay=new popupContentHandler(_57b,"boxPopup",null);
Overlay.execute();
this.el.removeAttribute("addClicked");
this.setCursors("default");
this.el.style.cursor="pointer";
}
}
catch(e){
this.log("EmptyQueue.processResponse(): "+e.message);
}
},setCursors:function(_57c){
this.el.style.cursor=_57c;
document.body.style.cursor=_57c;
if(this.mainParentNode!=null){
this.mainParentNode.style.cursor=_57c;
}
},handleError:function(){
this.setCursors("default");
this.el.removeAttribute("addClicked");
this.el.style.cursor="pointer";
}};
var ShuffleQueue=Class.create();
ShuffleQueue.prototype={initialize:function(){
},showLoadedMessage:function(_57d){
try{
_57d.innerHTML="Done! You have chosen... wisely";
}
catch(e){
this.log("ShuffleQueue.showLoadedMessage(): "+e.message);
}
}};
var OfferDVD=Class.create();
var OfferDVDLoader;
OfferDVD.prototype={initialize:function(_57e,_57f,_580,_581,_582,_583){
this.position=(_580!=null&&_580.length>0)?_580:-1;
this.bluraypackageId=_57e;
this.packageId=null;
this.itemId=null;
this.itemType=null;
this.standardDVDpackageId=_57f;
this.offerDVDSettingsRequired=_581;
this.catalystUrl=_582;
this.catalystInfo=_583;
this.actionType=null;
this.offereDVDPackageAdded=null;
return this;
},closeOfferDVDOverlay:function(){
try{
if(Overlay!=null){
Overlay.close();
}
}
catch(e){
this.log("OfferDVD.closeOfferDVDOverlay(): "+e.message);
}
},openOverlay:function(){
try{
if(this.bluraypackageId!=null&&this.standardDVDpackageId!=null){
var _584=new Array();
_584["packageId"]=this.bluraypackageId;
_584["standardDVDpackageId"]=this.standardDVDpackageId;
var _585=this.urlWithQueryString("/browse/queuemgmt/displayOfferDVDOverlay",_584);
Overlay=new popupUrlHandler(_585,"boxPopup","",null,null);
Overlay.execute();
}
}
catch(e){
this.log("OfferDVD.openOverlay(): "+e.message);
}
},add:function(_586,_587,_588){
try{
this.itemId=_588;
this.itemType=_587;
this.packageId=_586;
var _589=new Array();
_589["bypaassOfferDVDchk"]=true;
_589["packageId"]=this.packageId;
_589["position"]=this.position;
if(this.catalystUrl!=null){
_589["catalystUrl"]=this.catalystUrl;
}
if(this.catalystInfo!=null){
_589["catalystInfo"]=this.catalystInfo;
}
_589["position"]=this.position;
this.actionType="add";
var _58a=document.getElementById("enabledOfferDVDButtonDiv");
var _58b=document.getElementById("disabledOfferDVDButtonDiv");
if(_58a!=null&&_58b!=null){
_58a.style.display="none";
_58b.style.display="block";
}
var _58c=this.urlWithQueryString("/queuemgmt/addPackageToQueue",_589);
var _58d=document.getElementById("waitRequestOfferDVDDiv");
if(_58d!=null){
_58d.style.display="block";
}
new BaseHandler().processAjaxRequest(_58c,"",this.processResponse.bind(this),this.handleError.bind(this));
return true;
}
catch(e){
this.log("OfferDVD.add(): "+e.message);
return false;
}
},processResponse:function(_58e){
var _58f=document.getElementById("waitRequestOfferDVDDiv");
if(_58f!=null){
_58f.style.display="none";
}
if(this.actionType=="add"){
if(_58e.titleIds==null||_58e.packageIds==null||_58e.productIds==null||_58e.mktItemIds==null){
this.closeOfferDVDOverlay();
}else{
this.offereDVDPackageAdded=_58e.offereDVDPackageAdded;
if(this.offerDVDSettingsRequired=="false"){
this.closeOfferDVDOverlay();
this.updateQueueStatus(_58e);
this.openConfirmationOverlay();
}else{
this.openOfferDVDSettingsOverlay();
this.updateQueueStatus(_58e);
}
}
}else{
if(this.actionType=="saveUserSettings"){
this.closeOfferDVDOverlay();
this.openConfirmationOverlay();
}
}
},urlWithQueryString:function(url,_591){
var hash=$H(_591);
var _593=hash.toQueryString();
if(_593!=null&&_593.length>0){
url+="?"+_593;
}
return url;
},handleError:function(){
try{
this.closeOfferDVDOverlay();
}
catch(e){
this.log("OfferDVD.handleError(): "+e.message);
}
},openOfferDVDSettingsOverlay:function(){
try{
var _594=document.getElementById("offerDVDOverlayDIV");
var _595=document.getElementById("offerDVDSettingsDIV");
if(_594!=null&&_595!=null){
_594.style.display="none";
_594.style.height="0px";
_595.style.display="block";
_595.style.height="170px";
var _596=document.getElementById("OfferDVDSettingsHeader");
if(_596!=null){
_596.style.display="block";
}
}
}
catch(e){
this.log("OfferDVD.openOfferDVDSettingsOverlay(): "+e.message);
}
},updateQueueStatus:function(_597){
try{
var _598=document.getElementById("queueContentsContainer");
if(_598!=null){
_598.innerHTML=_597.responseBody;
var _599=document.getElementById("mQueueCorners");
if(_599){
_599.style.display="none";
_599.style.display="block";
}
}
new UpdateButtons().update(_597);
}
catch(e){
this.log("OfferDVD.updateQueueStatus(): "+e.message);
}
},saveUserSettings:function(_59a,form){
if(_59a=="false"){
this.closeOfferDVDOverlay();
this.openConfirmationOverlay();
}else{
try{
if(form!=null){
var len=form.discformatPreferenceType.length;
var _59d="";
for(i=0;i<len;i++){
if(form.discformatPreferenceType[i].checked){
_59d=form.discformatPreferenceType[i].value;
}
}
if(_59d!=""){
var _59e=new Array();
_59e["discformatPreferenceType"]=_59d;
var _59f=this.urlWithQueryString("/browse/queuemgmt/saveOfferDVDSettings",_59e);
this.actionType="saveUserSettings";
var _5a0=document.getElementById("waitRequestOfferDVDDiv");
if(_5a0!=null){
_5a0.style.display="block";
}
var _5a1=document.getElementById("enabledOfferSettingsButtonDiv");
var _5a2=document.getElementById("disabledOfferSettingsButtonDiv");
if(_5a1!=null&&_5a2!=null){
_5a1.style.display="none";
_5a2.style.display="block";
}
new BaseHandler().processAjaxRequest(_59f,"",this.processResponse.bind(this),this.handleError.bind(this));
}else{
alert("Please choose an option");
}
}
}
catch(e){
this.log("OfferDVD.saveUserSettings(): "+e.message);
}
}
},openConfirmationOverlay:function(_5a3){
try{
var _5a4="";
if(this.itemType=="mktItem"){
_5a4="/queuemgmt/queue/mktItemOverlay/"+this.itemType+"/"+this.itemId;
}else{
_5a4="/queuemgmt/queue/overlay/"+this.itemType+"/"+this.itemId;
}
if(this.offereDVDPackageAdded=="true"){
_5a4=_5a4+"?dvdVersionAdded=true";
}
OfferDVD.overlay=new QueueOverlay(_5a4,"boxPopup","",null);
OfferDVD.overlay.execute();
}
catch(e){
this.log("OfferDVD.openConfirmationOverlay(): "+e.message);
}
}};
var closeQueueUpdateOverlay=function(){
try{
Queue.overlay.close();
}
catch(e){
}
try{
OfferDVD.overlay.close();
}
catch(e){
}
};
var Cart=Class.create();
Cart.prototype={initialize:function(el,_5a6){
this.el=$(el);
this.similarMoviesUrl=_5a6;
this.cartDiv=$("cartContentsContainer");
this.url=null;
this.jsonResponse=null;
this.objectId=null;
this.objectType=null;
this.listName=null;
this.catalystInfo=null;
this.pageName=location.href;
this.movieId=null;
this.marketingId=null;
this.isGames="false";
if(this.el!==null){
this.url=this.el.getAttribute("href");
}
},log:function(msg){
logger.error(msg);
},addMarketing:function(){
try{
if(this.url==null||this.url.length==0){
return true;
}
if(this.el.getAttribute("addClicked")!=null){
return false;
}
tokens=this.similarMoviesUrl.split("/");
if(tokens.length>1){
this.marketingId=tokens[4];
}
this.objectType="FOH Marketing";
var _5a8=new Array();
if(this.listName!=null){
_5a8["listName"]=this.listName;
}
if(this.pageName!=null){
_5a8["pageName"]=this.pageName;
}
if(this.catalystInfo!=null){
_5a8["catalystInfo"]=this.catalystInfo;
}
if(this.marketingId!=null){
_5a8["objectId"]=this.marketingId;
}
if(this.objectType!=null){
_5a8["objectType"]=this.objectType;
}
this.url=this.urlAppendQueryString(this.url,_5a8);
this.setCursors("wait");
this.el.setAttribute("addClicked","true");
this.isGames="true";
new BaseHandler().processAjaxRequest(this.url,"",this.storeAjaxResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("Cart.addMarketing(): "+e.message);
return true;
}
},add:function(){
try{
if(this.url==null||this.url.length==0){
return true;
}
if(this.el.getAttribute("addClicked")!=null){
return false;
}
tokens=this.similarMoviesUrl.split("/");
if(tokens.length>1){
this.movieId=tokens[5];
}
this.movieDiv=$(this.movieId);
if(this.movieDiv==null){
if(tokens.length>1){
this.movieId=tokens[4];
}
this.movieDiv=$(this.movieId);
if(this.movieDiv==null){
return false;
}
}
if(this.movieDiv.getElementsByTagName("mt")!=null&&this.movieDiv.getElementsByTagName("mt").length>0){
this.movieTag=this.movieDiv.getElementsByTagName("mt")[0];
this.objectId=this.movieTag.getAttribute("titleId");
this.objectType="Title";
}else{
if(this.movieDiv.getElementsByTagName("mpkg")!=null&&this.movieDiv.getElementsByTagName("mpkg").length>0){
this.movieTag=this.movieDiv.getElementsByTagName("mpkg")[0];
this.objectId=this.movieTag.getAttribute("packageId");
this.objectType="Package";
}else{
if(this.movieDiv.getElementsByTagName("mpr")!=null&&this.movieDiv.getElementsByTagName("mpr").length>0){
this.movieTag=this.movieDiv.getElementsByTagName("mpr")[0];
this.objectId=this.movieTag.getAttribute("productId");
this.objectType="Product";
}
}
}
this.listName=this.movieTag.getAttribute("listName");
this.catalystInfo=this.movieTag.getAttribute("catalystInfo");
var _5a9=new Array();
if(this.listName!=null){
_5a9["listName"]=this.listName;
}
if(this.pageName!=null){
_5a9["pageName"]=this.pageName;
}
if(this.catalystInfo!=null){
_5a9["catalystInfo"]=this.catalystInfo;
}
if(this.objectId!=null){
_5a9["objectId"]=this.objectId;
}
if(this.objectType!=null){
_5a9["objectType"]=this.objectType;
}
this.url=this.urlWithQueryString(this.url,_5a9);
this.setCursors("wait");
this.el.setAttribute("addClicked","true");
new BaseHandler().processAjaxRequest(this.url,"",this.storeAjaxResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("Cart.add(): "+e.message);
return true;
}
},update:function(_5aa,_5ab,url){
try{
this.url=url;
this.updateDiv=_5ab;
this.el=$(_5ab);
new FormHandler(_5aa,_5ab,"get","",this.cartUpdated.bind(this)).submit();
}
catch(e){
this.log("Cart.update(): "+e.message);
}
},createBoxPopup:function(){
var div=document.createElement("div");
div.setAttribute("id","boxPopup");
document.body.appendChild(div);
},createPageMask:function(){
var div=document.createElement("div");
div.setAttribute("id","pageMask");
document.body.appendChild(div);
},storeAjaxResponse:function(_5af){
this.jsonResponse=_5af;
var _5b0=null;
var uri=document.location.pathname;
var _5b2=uri.split("/");
if(_5b2.length>0&&_5b2[1]=="games"){
this.isGames="true";
}
if(this.isGames=="false"){
var temp=this.movieDiv.innerHTML;
this.movieDiv.innerHTML=_5af.responseBody;
var _5b4=this.movieDiv.getElementsByTagName("a");
if(_5b4!=null){
_5b0=_5b4[0].getAttribute("title");
}
this.movieDiv.innerHTML=temp;
}
if(this.jsonResponse.pkgAlreadyInCart!=null){
if(this.similarMoviesUrl!==null&&this.similarMoviesUrl.length>0){
if(this.jsonResponse.pkgAlreadyInCart=="true"){
this.similarMoviesUrl+="/true";
}else{
this.similarMoviesUrl+="/false";
}
Cart.overlay=new MiniCartOverlay(this.similarMoviesUrl,"boxPopup","",this.processResponse.bind(this));
Cart.overlay.execute();
}
}else{
this.setCursors("");
}
},processResponse:function(){
try{
if(this.cartDiv!=null&&this.jsonResponse.pkgAddedToCart=="true"&&this.jsonResponse.pkgAlreadyInCart!="true"){
this.showMiniCartContainer();
this.cartDiv.innerHTML=this.jsonResponse.responseBody;
}
if($("headerShoppingCart")!=null&&this.jsonResponse.pkgAddedToCart=="true"&&this.jsonResponse.pkgAlreadyInCart!="true"){
$("headerShoppingCart").innerHTML="MY CART ("+this.jsonResponse.movieQuantityInCart+")";
}
this.setCursors("");
this.el.removeAttribute("addClicked");
}
catch(e){
this.log("Cart.processResponse(): "+e.message);
}
},cartUpdated:function(_5b5){
try{
if(this.url==null||this.url.length==0){
return;
}
if($("cartContentsContainer")!=null){
this.quantityUpdatedJsonResponse=_5b5;
this.cartDiv=$("miniCartQuantity");
if(this.cartDiv===null){
return;
}
this.setCursors("wait");
new BaseHandler().processAjaxRequest(this.url,"",this.processUpdateResponse.bind(this),this.handleError.bind(this));
}else{
$(this.updateDiv).innerHTML=_5b5.responseBody;
new BaseHandler().processAjaxRequest(this.url,"",this.processCartUpdateResponse.bind(this),this.handleError.bind(this));
}
}
catch(e){
this.log("Cart.cartUpdated(): "+e.message);
}
},processUpdateResponse:function(_5b6){
try{
$(this.updateDiv).innerHTML=this.quantityUpdatedJsonResponse.responseBody;
this.showMiniCartContainer();
this.cartDiv.innerHTML=_5b6.responseBody;
$("headerShoppingCart").innerHTML="MY CART ("+_5b6.movieQuantityInCart+")";
this.setCursors("");
}
catch(e){
this.log("Cart.processUpdateResponse(): "+e.message);
}
},processCartUpdateResponse:function(_5b7){
try{
$("headerShoppingCart").innerHTML="MY CART ("+_5b7.movieQuantityInCart+")";
this.setCursors("");
}
catch(e){
this.log("Cart.processUpdateResponse(): "+e.message);
}
},handleError:function(){
this.setCursors("");
},showMiniCartContainer:function(){
if($("miniCart").style.display=="none"){
$("miniCart").style.display="block";
$("miniCartEmpty").style.display="none";
}
if(this.jsonResponse.movieQuantityInCart>=0){
$("headerShoppingCartLink").style.display="inline";
}
},setCursors:function(_5b8){
this.el.style.cursor=_5b8;
document.body.style.cursor=_5b8;
},urlWithQueryString:function(url,_5ba){
var hash=$H(_5ba);
var _5bc=hash.toQueryString();
if(_5bc!=null&&_5bc.length>0){
url+="?"+_5bc;
}
return url;
},html_entity_decode:function(str){
var ta=document.createElement("textarea");
ta.innerHTML=str;
return ta.value;
},urlAppendQueryString:function(url,_5c0){
var hash=$H(_5c0);
var _5c2=hash.toQueryString();
if(_5c2!=null&&_5c2.length>0){
url+=_5c2;
}
return url;
}};
Cart.expandCollapse=function(el,_5c4){
if(_5c4==null||_5c4.length==0){
return;
}
this.el=$(el);
expandCollapseEl=$(_5c4);
if(expandCollapseEl==null){
return;
}
if(getCookie("browsingSession")=="block"){
expandCollapseEl.style.display="none";
this.el.parentNode.className="toggleExpand";
setCookie("outletBrowsingSession","none","100");
}else{
expandCollapseEl.style.display="block";
this.el.parentNode.className="toggle";
setCookie("outletBrowsingSession","block","100");
}
};
var MiniCartOverlay=Class.create();
MiniCartOverlay.prototype=(new popupUrlHandler()).extend({updatePosition:function(){
var head=$("head");
var nav=$("nav");
var _5c7=(head?head.offsetHeight:0)+(nav?nav.offsetHeight:0)+8;
if(_5c7<0){
_5c7=20;
}
this.divEl.style.top=this.scrollOffset()+_5c7+"px";
}});
var SelectEdition=Class.create();
SelectEdition.prototype={initialize:function(el,_5c9){
this.el=$(el);
this.editionsUrl=_5c9;
this.cartDiv=$("cartContentsContainer");
this.url=null;
this.jsonResponse=null;
this.movieTitleDetailId=null;
this.moviePackageDetailId=null;
this.saleType=null;
this.movieId=null;
this.movieDiv=null;
this.objectId=null;
this.objectType=null;
this.listName=null;
this.catalystInfo=null;
this.pageName=location.href;
this.movieTag=null;
this.isGames="false";
if(this.el!==null){
this.url=this.el.getAttribute("href");
}
tokens=this.editionsUrl.split("/");
if(tokens.length>1){
this.movieId=tokens[5];
}
},log:function(msg){
logger.error(msg);
},add:function(){
try{
if(this.editionsUrl==null||this.editionsUrl.length==0){
return true;
}
tokens=this.editionsUrl.split("/");
var list=null;
if(tokens.length>6){
list=tokens[6];
}
if(this.el.getAttribute("addClicked")!=null){
return false;
}
if((list!=null)&&((list.toString()=="hdDvdPackage")||(list.toString()=="brDvdPackage"))){
this.editionsUrl="/"+tokens[1]+"/"+tokens[2]+"/"+tokens[3]+"/"+tokens[4]+"/"+tokens[5];
this.listName=list;
this.catalystInfo="A";
}else{
this.movieDiv=$(this.movieId);
if(this.movieDiv==null){
return false;
}
if(this.movieDiv.getElementsByTagName("mt")!=null&&this.movieDiv.getElementsByTagName("mt").length>0){
this.movieTag=this.movieDiv.getElementsByTagName("mt")[0];
}else{
if(this.movieDiv.getElementsByTagName("mpkg")!=null&&this.movieDiv.getElementsByTagName("mpkg").length>0){
this.movieTag=this.movieDiv.getElementsByTagName("mpkg")[0];
}
}
this.listName=this.movieTag.getAttribute("listName");
this.catalystInfo=this.movieTag.getAttribute("catalystInfo");
}
this.objectType="Package";
this.setCursors("wait");
this.el.setAttribute("addClicked","true");
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.storeAjaxResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("SelectEdition.add(): "+e.message);
return true;
}
},createBoxPopup:function(){
var div=document.createElement("div");
div.setAttribute("id","boxPopup");
document.body.appendChild(div);
},createPageMask:function(){
var div=document.createElement("div");
div.setAttribute("id","pageMask");
document.body.appendChild(div);
},storeAjaxResponse:function(_5ce){
this.jsonResponse=_5ce;
this.moviePackageDetailId=_5ce.moviePackageDetailId;
this.movieTitleDetailId=_5ce.movieTitleDetailId;
this.saleType=_5ce.saleType;
var _5cf=null;
var uri=document.location.pathname;
var _5d1=uri.split("/");
if(_5d1.length>0&&_5d1[1]=="games"){
this.isGames="true";
}
if(this.isGames=="false"){
var temp=this.movieDiv.innerHTML;
this.movieDiv.innerHTML=_5ce.responseBody;
var _5d3=this.movieDiv.getElementsByTagName("a");
if(_5d3!=null&&_5d3.length>0){
_5cf=_5d3[1].getAttribute("title");
}
this.movieDiv.innerHTML=temp;
}
if(this.jsonResponse.moviePackageDetailId!=null){
var _5d4="/outlet/retail/shoppingcart/processAddPackageToShoppingCart?moviePackageId="+_5ce.moviePackageDetailId+"&saleType="+_5ce.saleType+"&listName="+this.listName+"&catalystInfo="+this.catalystInfo+"&pageName="+this.pageName+"&objectId="+_5ce.moviePackageDetailId+"&objectType="+this.objectType;
new BaseHandler().processAjaxRequest(_5d4,"",this.storeAddToCartResponse.bind(this),this.handleError.bind(this));
}else{
if(this.jsonResponse.availablePackagesCount=="0"){
window.location=this.url;
}else{
SelectEdition.overlay=new popupUrlHandler(this.editionsUrl,"boxPopup","",this.processResponse.bind(this));
SelectEdition.overlay.execute();
}
}
},storeAddToCartResponse:function(_5d5){
this.jsonResponse=_5d5;
try{
if(this.cartDiv!=null){
this.cartDiv.innerHTML=this.jsonResponse.responseBody;
}
if(this.jsonResponse.pkgAlreadyInCart!=null){
var _5d6="/outlet/minicart/overlay/"+this.movieTitleDetailId+"/"+this.moviePackageDetailId+"/"+this.saleType;
if(this.jsonResponse.pkgAlreadyInCart=="true"){
_5d6+="/true";
}else{
_5d6+="/false";
}
Cart.overlay=new MiniCartOverlay(_5d6,"boxPopup","",this.processAddToCartResponse.bind(this));
Cart.overlay.execute();
}
this.setCursors("");
this.el.removeAttribute("addClicked");
}
catch(e){
this.log("SelectEdition.processResponse(): "+e.message);
}
},processResponse:function(){
try{
this.setCursors("");
this.el.removeAttribute("addClicked");
}
catch(e){
this.log("SelectEdition.processResponse(): "+e.message);
}
},processAddToCartResponse:function(){
try{
this.showMiniCartContainer();
this.cartDiv.innerHTML=this.jsonResponse.responseBody;
$("headerShoppingCart").innerHTML="MY CART ("+this.jsonResponse.movieQuantityInCart+")";
this.setCursors("");
this.el.removeAttribute("addClicked");
}
catch(e){
this.log("SelectEdition.processAddToCartResponse(): "+e.message);
}
},handleError:function(){
this.setCursors("");
},showMiniCartContainer:function(){
if($("miniCart").style.display=="none"){
$("miniCart").style.display="block";
$("miniCartEmpty").style.display="none";
}
},html_entity_decode:function(str){
var ta=document.createElement("textarea");
ta.innerHTML=str;
return ta.value;
},setCursors:function(_5d9){
this.el.style.cursor=_5d9;
document.body.style.cursor=_5d9;
}};
var valueLink=Class.create();
var giftCardNumber;
var pinNumber;
var errorMessage;
valueLink.prototype={initialize:function(_5da,_5db){
giftCardNumber=(document.getElementsByName("giftCard.clearTextAccountNumber"))[0].value;
pinNumber=(document.getElementsByName("giftCard.pinNumber"))[0].value;
this.divEl=document.getElementById(_5db);
if(giftCardNumber==""&&pinNumber==""){
this.divEl.innerHTML="<p style='color:red'> Please enter the Gift Card Number and Pin Number</p>";
return false;
}else{
if(giftCardNumber==""){
this.divEl.innerHTML="<p style='color:red'> Please enter the Gift Card Number </p>";
return false;
}else{
if(pinNumber==""){
this.divEl.innerHTML="<p style='color:red'> Please enter the Pin Number </p>";
return false;
}
}
}
this.jsonResponse=null;
this.url=_5da+giftCardNumber+"/"+pinNumber;
},add:function(){
try{
(new BaseHandler()).processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("ValueLink.add(): "+e.message);
return true;
}
},processResponse:function(_5dc){
BaseHandler.purge(this.divEl);
document.getElementById("checkBalance1").style.display="none";
document.getElementById("checkBalance2").style.display="none";
document.getElementById("currentBalance").style.display="block";
if(_5dc.cardNumber==null){
this.divEl.innerHTML="<p style='color:red'>Please provide a valid gift card and pin number.</p>";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
}else{
this.divEl.innerHTML="GiftCard "+_5dc.cardNumber+" balance is : <b>$"+_5dc.balance+"</b>";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
return false;
}
s.pageName="Gift Card Balance Check";
},handleError:function(){
this.divEl.innerHTML="<p style='color:red'> Please provide a valid gift card and pin number.</p>";
document.getElementsByName("giftCard.clearTextAccountNumber")[0].value="";
document.getElementsByName("giftCard.pinNumber")[0].value="";
}};
var RatingWidget=Class.create();
RatingWidget.prototype={initialize:function(_5dd,_5de,_5df){
this.imgEl=$(_5dd);
this.origRating=_5de;
this.titleId=_5df;
if(this.imgEl.getAttribute("mapCreated")!=null){
return;
}
var _5e0=this.imgEl.parentNode;
if(_5e0==null){
return;
}
_5e0.setAttribute("origRating",this.origRating);
_5e0.setAttribute("titleId",this.titleId);
this.mapId=RatingWidget.sequence++;
if(!document.all){
this.imgEl.setAttribute("usemap","#mratingMap_"+this.mapId);
}else{
this.imgEl.setAttribute("useMap","#mratingMap_"+this.mapId);
}
var map=document.getElementsByTagName("map");
var _5e2=false;
if(map!=null){
for(i=0;i<map.length;i++){
if(map[i].getAttribute("name").indexOf("mratingMap")!=-1){
_5e2=true;
}
}
}
if(!_5e2){
RatingWidget.setup();
RatingWidget.fillInVersion(this.imgEl.src);
}
var _5e3="<map name=\"mratingMap_"+this.mapId+"\">";
_5e3+="<area shape=\"rect\" title=\"Don&#8217;t show me this movie again.\" coords=\"0,0,12,15\" rating=\"rt-1\">";
_5e3+="<area shape=\"rect\" title=\"I really hated this movie.\" coords=\"12,0,21,15\" rating=\"rt5\">";
_5e3+="<area shape=\"rect\" title=\"I hated this movie.\" coords=\"21,0,29,15\" rating=\"rt10\">";
_5e3+="<area shape=\"rect\" title=\"I really didn&#8217;t like this movie.\" coords=\"29,0,37,15\" rating=\"rt15\">";
_5e3+="<area shape=\"rect\" title=\"I didn&#8217;t like this movie.\" coords=\"37,0,45,15\" rating=\"rt20\">";
_5e3+="<area shape=\"rect\" title=\"This movie was just so-so.\" coords=\"45,0,53,15\" rating=\"rt25\">";
_5e3+="<area shape=\"rect\" title=\"This movie was okay.\" coords=\"53,0,61,15\" rating=\"rt30\">";
_5e3+="<area shape=\"rect\" title=\"I liked this movie.\" coords=\"61,0,69,15\" rating=\"rt35\">";
_5e3+="<area shape=\"rect\" title=\"I really liked this movie.\" coords=\"69,0,77,15\" rating=\"rt40\">";
_5e3+="<area shape=\"rect\" title=\"I loved this movie.\" coords=\"77,0,85,15\" rating=\"rt45\">";
_5e3+="<area shape=\"rect\" title=\"I absolutely loved this movie.\" coords=\"85,0,91,15\" rating=\"rt50\">";
_5e3+="</map>";
var _5e4=document.createElement("div");
_5e4.innerHTML=_5e3;
_5e0.appendChild(_5e4);
var _5e5=_5e4.childNodes[0].childNodes;
for(i=0;i<_5e5.length;i++){
_5e5[i].onmouseover=this.handleMouseOver.bind(this);
_5e5[i].onmouseout=this.handleMouseOut.bind(this);
if(typeof (RATING_WIDGET_AUTH_CHECK)!="undefined"){
_5e5[i].onclick=this.handleClickWithAuthCheck.bind(this);
}else{
_5e5[i].onclick=this.handleClick.bind(this,null);
}
}
this.imgEl.onmouseover="";
this.imgEl.setAttribute("mapCreated","true");
},handleMouseOver:function(evt){
var _5e7="";
if(!document.all){
_5e7=$(evt.target);
}else{
_5e7=$(event.srcElement);
}
rating=_5e7.getAttribute("rating");
this.ratingWidgetEl=_5e7.parentNode.parentNode.parentNode;
this.ratingWidgetEl.style.cursor="pointer";
(_5e7.parentNode.parentNode.parentNode.getElementsByTagName("img")[0]).src=RatingWidget.getImageSrc(rating);
},handleMouseOut:function(evt){
var _5e9="";
if(!document.all){
_5e9=$(evt.target);
}else{
_5e9=$(event.srcElement);
}
this.ratingWidgetEl.style.cursor="default";
(_5e9.parentNode.parentNode.parentNode.getElementsByTagName("img")[0]).src=RatingWidget.getImageSrc(_5e9.parentNode.parentNode.parentNode.getAttribute("origRating"));
},handleClickWithAuthCheck:function(evt){
var _5eb;
if(!document.all){
_5eb=evt.target;
}else{
_5eb=event.srcElement;
}
new OverlayLoginHandler(this.handleClick.bind(this,_5eb)).performAuthenticatedAction();
return false;
},handleClick:function(_5ec,evt){
var _5ee="";
if(_5ec!=null){
_5ee=_5ec;
}else{
if(!document.all){
_5ee=$(evt.target);
}else{
_5ee=$(event.srcElement);
}
}
this.rating=_5ee.getAttribute("rating");
this.ratingWidgetEl=_5ee.parentNode.parentNode.parentNode;
url="/acctmgmt/ratingSnippet";
numRating=rating;
if(numRating.indexOf("avg")!=-1){
numRating=numRating.substring(3);
}else{
if(numRating.indexOf("rt")!=-1){
numRating=numRating.substring(2);
}else{
return;
}
}
url+="?titleId="+this.ratingWidgetEl.getAttribute("titleId")+"&rating="+numRating;
this.ratingWidgetEl.style.cursor="wait";
new BaseHandler().processAjaxRequest(url,"",this.processResponse.bind(this),this.handleError.bind(this));
return false;
},processResponse:function(_5ef){
this.ratingWidgetEl.setAttribute("origRating",this.rating);
this.imgEl.src=RatingWidget.getImageSrc(this.rating);
movieRatingEl=document.getElementById("movieRating");
var tags=this.ratingWidgetEl.parentNode.getElementsByTagName("a");
if(tags.length!=0){
var _5f1=tags[0].innerText;
}
if(_5f1=="Review Guidelines"||tags.length==0){
var tags=document.getElementsByTagName("h1");
if(tags!=null){
var _5f1=tags[0].innerHTML;
}else{
_5f1="";
}
}else{
}
if(movieRatingEl!=null&&movieRatingEl.parentNode.getAttribute("id")==this.titleId){
movieRatingImg=movieRatingEl.getElementsByTagName("img")[0];
movieRatingImg.src=RatingWidget.getImageSrc(this.rating);
}
this.ratingWidgetEl.style.cursor="default";
},handleError:function(){
this.ratingWidgetEl.style.cursor="default";
},html_entity_decode:function(str){
var ta=document.createElement("textarea");
ta.innerHTML=str;
return ta.value;
},handleTimeout:function(_5f4){
alert("Your request has timed out.");
if(this.errorMethod!=null){
this.errorMethod();
}
}};
RatingWidget.sequence=0;
var ratingImage=new Array(24);
RatingWidget.setup=function(){
ratingImage["avg-1"]={path:"/content/@@version@@/img/rating/avg-1.gif",image:new Image()};
ratingImage["avg0"]={path:"/content/@@version@@/img/rating/avg0.gif",image:new Image()};
ratingImage["avg5"]={path:"/content/@@version@@/img/rating/avg5.gif",image:new Image()};
ratingImage["avg10"]={path:"/content/@@version@@/img/rating/avg10.gif",image:new Image()};
ratingImage["avg15"]={path:"/content/@@version@@/img/rating/avg15.gif",image:new Image()};
ratingImage["avg20"]={path:"/content/@@version@@/img/rating/avg20.gif",image:new Image()};
ratingImage["avg25"]={path:"/content/@@version@@/img/rating/avg25.gif",image:new Image()};
ratingImage["avg30"]={path:"/content/@@version@@/img/rating/avg30.gif",image:new Image()};
ratingImage["avg35"]={path:"/content/@@version@@/img/rating/avg35.gif",image:new Image()};
ratingImage["avg40"]={path:"/content/@@version@@/img/rating/avg40.gif",image:new Image()};
ratingImage["avg45"]={path:"/content/@@version@@/img/rating/avg45.gif",image:new Image()};
ratingImage["avg50"]={path:"/content/@@version@@/img/rating/avg50.gif",image:new Image()};
ratingImage["rt-1"]={path:"/content/@@version@@/img/rating/rt-1.gif",image:new Image()};
ratingImage["rt0"]={path:"/content/@@version@@/img/rating/rt0.gif",image:new Image()};
ratingImage["rt5"]={path:"/content/@@version@@/img/rating/rt5.gif",image:new Image()};
ratingImage["rt10"]={path:"/content/@@version@@/img/rating/rt10.gif",image:new Image()};
ratingImage["rt15"]={path:"/content/@@version@@/img/rating/rt15.gif",image:new Image()};
ratingImage["rt20"]={path:"/content/@@version@@/img/rating/rt20.gif",image:new Image()};
ratingImage["rt25"]={path:"/content/@@version@@/img/rating/rt25.gif",image:new Image()};
ratingImage["rt30"]={path:"/content/@@version@@/img/rating/rt30.gif",image:new Image()};
ratingImage["rt35"]={path:"/content/@@version@@/img/rating/rt35.gif",image:new Image()};
ratingImage["rt40"]={path:"/content/@@version@@/img/rating/rt40.gif",image:new Image()};
ratingImage["rt45"]={path:"/content/@@version@@/img/rating/rt45.gif",image:new Image()};
ratingImage["rt50"]={path:"/content/@@version@@/img/rating/rt50.gif",image:new Image()};
};
RatingWidget.fillInVersion=function(_5f5){
try{
if(ratingImage["avg-1"]==null||ratingImage["avg-1"].path==null){
return;
}
if((ratingImage["avg-1"].path).indexOf("@@version@@")==-1){
return;
}
src=_5f5.substring(_5f5.indexOf("content/"));
tokens=src.split("/");
if(tokens.length==0){
return;
}
version=tokens[1];
for(var key in ratingImage){
if(ratingImage[key].path==null||ratingImage[key].path=="undefined"){
continue;
}
ratingImage[key].path=ratingImage[key].path.replace("@@version@@",version);
ratingImage[key].image.src=ratingImage[key].path;
}
}
catch(e){
return;
}
};
RatingWidget.getImageSrc=function(_5f7){
return ratingImage[_5f7].image.src;
};
var GameRatingWidget=Class.create();
GameRatingWidget.prototype={initialize:function(_5f8,_5f9,_5fa){
this.imgEl=$(_5f8);
this.origRating=_5f9;
this.gameId=_5fa;
if(this.imgEl.getAttribute("mapCreated")!=null){
return;
}
var _5fb=this.imgEl.parentNode;
if(_5fb==null){
return;
}
_5fb.setAttribute("origRating",this.origRating);
_5fb.setAttribute("gameId",this.gameId);
this.mapId=GameRatingWidget.sequence++;
if(!document.all){
this.imgEl.setAttribute("usemap","#ratingMap_"+this.mapId);
}else{
this.imgEl.setAttribute("useMap","#ratingMap_"+this.mapId);
}
var map=document.getElementsByTagName("map");
var _5fd=false;
if(map!=null){
for(i=0;i<map.length;i++){
if(map[i].getAttribute("name").indexOf("ratingMap")!=-1){
_5fd=true;
}
}
}
if(!_5fd){
GameRatingWidget.setup();
GameRatingWidget.fillInVersion(this.imgEl.src);
}
var _5fe="<map name=\"ratingMap_"+this.mapId+"\">";
_5fe+="<area shape=\"rect\" title=\"Don&#8217;t show me this game again.\" coords=\"0,0,12,15\" rating=\"rt-1\">";
_5fe+="<area shape=\"rect\" title=\"I really hated this game.\" coords=\"12,0,21,15\" rating=\"rt5\">";
_5fe+="<area shape=\"rect\" title=\"I hated this game.\" coords=\"21,0,29,15\" rating=\"rt10\">";
_5fe+="<area shape=\"rect\" title=\"I really didn&#8217;t like this game.\" coords=\"29,0,37,15\" rating=\"rt15\">";
_5fe+="<area shape=\"rect\" title=\"I didn&#8217;t like this game.\" coords=\"37,0,45,15\" rating=\"rt20\">";
_5fe+="<area shape=\"rect\" title=\"This game was just so-so.\" coords=\"45,0,53,15\" rating=\"rt25\">";
_5fe+="<area shape=\"rect\" title=\"This game was okay.\" coords=\"53,0,61,15\" rating=\"rt30\">";
_5fe+="<area shape=\"rect\" title=\"I liked this game.\" coords=\"61,0,69,15\" rating=\"rt35\">";
_5fe+="<area shape=\"rect\" title=\"I really liked this game.\" coords=\"69,0,77,15\" rating=\"rt40\">";
_5fe+="<area shape=\"rect\" title=\"I loved this game.\" coords=\"77,0,85,15\" rating=\"rt45\">";
_5fe+="<area shape=\"rect\" title=\"I absolutely loved this game.\" coords=\"85,0,91,15\" rating=\"rt50\">";
_5fe+="</map>";
var _5ff=document.createElement("div");
_5ff.innerHTML=_5fe;
_5fb.appendChild(_5ff);
var _600=_5ff.childNodes[0].childNodes;
for(i=0;i<_600.length;i++){
_600[i].onmouseover=this.handleMouseOver.bind(this);
_600[i].onmouseout=this.handleMouseOut.bind(this);
_600[i].onclick=this.handleClick.bind(this);
if(typeof (RATING_WIDGET_AUTH_CHECK)!="undefined"){
_600[i].onclick=this.handleClickWithAuthCheck.bind(this);
}else{
_600[i].onclick=this.handleClick.bind(this,null);
}
}
this.imgEl.onmouseover="";
this.imgEl.setAttribute("mapCreated","true");
},handleMouseOver:function(evt){
var _602="";
if(!document.all){
_602=$(evt.target);
}else{
_602=$(event.srcElement);
}
rating=_602.getAttribute("rating");
this.ratingWidgetEl=_602.parentNode.parentNode.parentNode;
this.ratingWidgetEl.style.cursor="pointer";
(_602.parentNode.parentNode.parentNode.getElementsByTagName("img")[0]).src=GameRatingWidget.getImageSrc(rating);
},handleMouseOut:function(evt){
var _604="";
if(!document.all){
_604=$(evt.target);
}else{
_604=$(event.srcElement);
}
this.ratingWidgetEl.style.cursor="default";
(_604.parentNode.parentNode.parentNode.getElementsByTagName("img")[0]).src=GameRatingWidget.getImageSrc(_604.parentNode.parentNode.parentNode.getAttribute("origRating"));
},handleClickWithAuthCheck:function(evt){
var _606;
if(!document.all){
_606=evt.target;
}else{
_606=event.srcElement;
}
new OverlayLoginHandler(this.handleClick.bind(this,_606)).performAuthenticatedAction();
return false;
},handleClick:function(_607,evt){
var _609="";
if(_607!=null){
_609=_607;
}else{
if(!document.all){
_609=$(evt.target);
}else{
_609=$(event.srcElement);
}
}
this.rating=_609.getAttribute("rating");
this.ratingWidgetEl=_609.parentNode.parentNode.parentNode;
url="/games/ratingSnippet";
numRating=rating;
if(numRating.indexOf("avg")!=-1){
numRating=numRating.substring(3);
}else{
if(numRating.indexOf("rt")!=-1){
numRating=numRating.substring(2);
}else{
return;
}
}
url+="?gameId="+this.ratingWidgetEl.getAttribute("gameId")+"&rating="+numRating;
this.ratingWidgetEl.style.cursor="wait";
new BaseHandler().processAjaxRequest(url,"",this.processResponse.bind(this),this.handleError.bind(this));
return false;
},processResponse:function(_60a){
this.ratingWidgetEl.setAttribute("origRating",this.rating);
this.imgEl.src=GameRatingWidget.getImageSrc(this.rating);
gameRatingEl=document.getElementById("gameRating");
if(gameRatingEl!=null&&gameRatingEl.parentNode.getAttribute("id")==this.gameId){
gameRatingImg=gameRatingEl.getElementsByTagName("img")[0];
gameRatingImg.src=RatingWidget.getImageSrc(this.rating);
}
this.ratingWidgetEl.style.cursor="default";
},handleError:function(){
this.ratingWidgetEl.style.cursor="default";
},handleTimeout:function(_60b){
alert("Your request has timed out.");
if(this.errorMethod!=null){
this.errorMethod();
}
}};
GameRatingWidget.sequence=0;
var ratingImage=new Array(24);
GameRatingWidget.setup=function(){
ratingImage["avg-1"]={path:"/content/@@version@@/img/rating/avg-1.gif",image:new Image()};
ratingImage["avg0"]={path:"/content/@@version@@/img/rating/avg0.gif",image:new Image()};
ratingImage["avg5"]={path:"/content/@@version@@/img/rating/avg5.gif",image:new Image()};
ratingImage["avg10"]={path:"/content/@@version@@/img/rating/avg10.gif",image:new Image()};
ratingImage["avg15"]={path:"/content/@@version@@/img/rating/avg15.gif",image:new Image()};
ratingImage["avg20"]={path:"/content/@@version@@/img/rating/avg20.gif",image:new Image()};
ratingImage["avg25"]={path:"/content/@@version@@/img/rating/avg25.gif",image:new Image()};
ratingImage["avg30"]={path:"/content/@@version@@/img/rating/avg30.gif",image:new Image()};
ratingImage["avg35"]={path:"/content/@@version@@/img/rating/avg35.gif",image:new Image()};
ratingImage["avg40"]={path:"/content/@@version@@/img/rating/avg40.gif",image:new Image()};
ratingImage["avg45"]={path:"/content/@@version@@/img/rating/avg45.gif",image:new Image()};
ratingImage["avg50"]={path:"/content/@@version@@/img/rating/avg50.gif",image:new Image()};
ratingImage["rt-1"]={path:"/content/@@version@@/img/rating/rt-1.gif",image:new Image()};
ratingImage["rt0"]={path:"/content/@@version@@/img/rating/rt0.gif",image:new Image()};
ratingImage["rt5"]={path:"/content/@@version@@/img/rating/rt5.gif",image:new Image()};
ratingImage["rt10"]={path:"/content/@@version@@/img/rating/rt10.gif",image:new Image()};
ratingImage["rt15"]={path:"/content/@@version@@/img/rating/rt15.gif",image:new Image()};
ratingImage["rt20"]={path:"/content/@@version@@/img/rating/rt20.gif",image:new Image()};
ratingImage["rt25"]={path:"/content/@@version@@/img/rating/rt25.gif",image:new Image()};
ratingImage["rt30"]={path:"/content/@@version@@/img/rating/rt30.gif",image:new Image()};
ratingImage["rt35"]={path:"/content/@@version@@/img/rating/rt35.gif",image:new Image()};
ratingImage["rt40"]={path:"/content/@@version@@/img/rating/rt40.gif",image:new Image()};
ratingImage["rt45"]={path:"/content/@@version@@/img/rating/rt45.gif",image:new Image()};
ratingImage["rt50"]={path:"/content/@@version@@/img/rating/rt50.gif",image:new Image()};
};
GameRatingWidget.fillInVersion=function(_60c){
try{
if(ratingImage["avg-1"]==null||ratingImage["avg-1"].path==null){
return;
}
if((ratingImage["avg-1"].path).indexOf("@@version@@")==-1){
return;
}
src=_60c.substring(_60c.indexOf("content/"));
tokens=src.split("/");
if(tokens.length==0){
return;
}
version=tokens[1];
for(var key in ratingImage){
if(ratingImage[key].path==null||ratingImage[key].path=="undefined"){
continue;
}
ratingImage[key].path=ratingImage[key].path.replace("@@version@@",version);
ratingImage[key].image.src=ratingImage[key].path;
}
}
catch(e){
return;
}
};
GameRatingWidget.getImageSrc=function(_60e){
return ratingImage[_60e].image.src;
};
var Reviews=Class.create();
Reviews.prototype={initialize:function(){
return this;
},write:function(el,_610){
this.el=$(el);
this.divId=_610;
if(_610==null||_610.length==0){
this.displayError("Error going to Write a Review");
return;
}
this.url=this.el.getAttribute("href");
if(this.url==null||this.url.length==0){
this.displayError("Error going to Write a Review");
return;
}
new DivReplaceHandler(this.url,this.divId,"loadingOverlay").execute();
},submit:function(el,_612){
new FormHandler(el,_612,"post","loadingOverlay").submit();
},goBackToReviews:function(el,_614){
this.el=$(el);
this.url=this.el.getAttribute("href");
this.divId=_614;
if(this.el==null||this.url==null){
return;
}
new DivReplaceHandler(this.url,this.divId,"loadingOverlay").execute();
},updateFeedback:function(el){
this.el=$(el);
if(this.el==null){
return;
}
this.divEl=this.el.parentNode.parentNode;
if(this.divEl==null){
this.displayError("Error updating feedback");
return;
}
this.url=this.el.getAttribute("href");
if(this.url==null||this.url.length==0){
this.displayError("Error updating feedback");
return;
}
var _616=function(_617){
document.getElementsByClassName(this.divEl.className).each(function(elem){
elem.innerHTML=_617.responseBody;
});
};
new DivReplaceHandler(this.url,this.divEl,"loadingOverlayNoPadding",_616).execute();
},displayError:function(_619){
alert(_619);
}};
Reviews.toggleReadMore=function(el,_61b){
if(el==null){
return;
}
anchorEl=$(el);
if(anchorEl==null){
return;
}
divEl=anchorEl.parentNode;
if(divEl==null){
return;
}
parentEl=divEl.parentNode;
if(parentEl==null){
return;
}
childDivs=parentEl.childNodes;
if(childDivs==null||childDivs.length==0){
return;
}
showDivEl=null;
for(i=0;i<childDivs.length;i++){
if(childDivs[i].getAttribute("id")==_61b){
showDivEl=$(childDivs[i].getAttribute("id"));
break;
}
}
if(showDivEl==null){
return;
}
divEl.style.display="none";
showDivEl.style.display="block";
};
function countText(_61c,_61d,_61e){
this.textarea=$(_61c);
if(this.textarea.value.length>_61e){
this.textarea.value=this.textarea.value.substring(0,_61e);
}else{
$(_61d).innerHTML=(_61e-(this.textarea.value.length));
}
}
function fn_showDevices(){
document.getElementById("restrictedDevices").style.display="none";
document.getElementById("restrictedDevicesAll").style.display="block";
}
var Rollover=Class.create();
Rollover.prototype={initialize:function(_61f,_620){
this.parentElement=$(_61f);
this.draggableElement=$(_620);
if(this.parentElement==null||this.draggableElement==null){
return;
}
this.draggableElementProxy=null;
this.boxart=this.setBoxArt();
this.delayShow=500;
this.delayHide=150;
this.isRolloverShowing=false;
this.elementTimer=null;
this.rolloverTimer=null;
this.rolloverUrl=this.getRolloverContentSrc();
this.rolloverDetails=null;
if(this.rolloverUrl==null){
return;
}
if(Rollover.rolloverElement==null){
this.createRolloverElement();
}
if(Rollover.rolloverElement!=null){
this.draggableElement.onmouseover=this.mousedOver.bindAsEventListener(this);
this.draggableElement.onmouseout=this.mousedOut.bindAsEventListener(this);
}
},getRolloverContentSrc:function(){
try{
var _621=null;
var divs=this.parentElement.getElementsByTagName("div");
if(divs!=null&&divs.length>0){
for(i=0;i<divs.length;i++){
if(divs[i].className!=null&&divs[i].className.indexOf("rolloverDetailsDiv")!=-1){
_621=divs[i];
break;
}
}
}
if(_621!=null){
return _621.getAttribute("contentsrc");
}else{
return null;
}
}
catch(e){
this.log("Rollover.getRolloverContentSrc(): "+e.message);
}
},createRolloverElement:function(){
var div=document.createElement("div");
div.setAttribute("id","rolloverDetails");
div.className="rolloverDetails";
div.style.zIndex="1000";
document.body.appendChild(div);
Rollover.rolloverElement=document.getElementById("rolloverDetails");
},setBoxArt:function(){
try{
var _624=this.draggableElement.getElementsByTagName("img");
if(_624.length){
return _624[0];
}else{
var _625=this.parentElement.getElementsByTagName("a");
var _626=null;
for(var i=0;i<_625.length;i++){
var img=_625[i].childNodes[0];
if(img!=null&&img.src!=null){
this.draggableElementProxy=_625[i];
_626=img;
break;
}
}
return _626;
}
}
catch(e){
this.log("Rollover.setBoxArt(): "+e.message);
}
},mousedOver:function(evt){
try{
if(BBDraggable.isDragging){
return;
}
Rollover.rolloverElement.onmouseover=this.mousedOverRollover.bindAsEventListener(this);
Rollover.rolloverElement.onmouseout=this.mousedOutRollover.bindAsEventListener(this);
this.rolloverTimer=clearTimeout(this.rolloverTimer);
this.elementTimer=setTimeout(this.displayRolloverDetail.bind(this),this.delayShow);
}
catch(e){
this.log("Rollover.mousedOver(): "+e.message);
}
},mousedOut:function(evt){
try{
this.elementTimer=clearTimeout(this.elementTimer);
if(!this.rolloverTimer){
this.rolloverTimer=setTimeout(this.hideRolloverDetail.bind(this),this.delayHide);
}
}
catch(e){
this.log("Rollover.mousedOut(): "+e.message);
}
},mousedOverRollover:function(evt){
try{
if(BBDraggable.isDragging){
return;
}
if(this.rolloverTimer){
this.rolloverTimer=clearTimeout(this.rolloverTimer);
}
}
catch(e){
this.log("Rollover.mousedOverRollover(): "+e.message);
}
},mousedOutRollover:function(evt){
try{
if(!this.rolloverTimer){
this.rolloverTimer=setTimeout(this.hideRolloverDetail.bind(this),this.delayHideMs);
}
}
catch(e){
this.log("Rollover.mousedOutRollover(): "+e.message);
}
},displayRolloverDetail:function(){
try{
if(BBDraggable.isDragging){
this.hideRolloverDetail();
return;
}
if(this.rolloverDetails==null){
(new BaseHandler()).processAjaxRequest(this.rolloverUrl,"",this.processResponse.bind(this));
}else{
this.displayRollover();
}
}
catch(e){
this.log("Rollover.displayRolloverDetail(): "+e.message);
}
},processResponse:function(_62d){
try{
if(BBDraggable.isDragging){
this.hideRolloverDetail();
return;
}
this.rolloverDetails=_62d.responseBody;
this.displayRollover();
}
catch(e){
this.log("Rollover.processResponse(): "+e.message);
}
},hideRolloverDetail:function(){
try{
this.elementTimer=clearTimeout(this.elementTimer);
this.rolloverTimer=clearTimeout(this.rolloverTimer);
Element.hide(Rollover.rolloverElement);
Element.removeClassName(Rollover.rolloverElement,"rdDefault");
Element.removeClassName(Rollover.rolloverElement,"rdRight");
Element.removeClassName(Rollover.rolloverElement,"rdBottom");
Element.removeClassName(Rollover.rolloverElement,"rdRightBottom");
this.isRolloverShowing=false;
}
catch(e){
this.log("Rollover.hideRolloverDetail(): "+e.message);
}
},displayRollover:function(){
try{
if(BBDraggable.isDragging){
this.hideRolloverDetail();
}else{
this.isRolloverShowing=true;
el=Rollover.rolloverElement;
el.innerHTML=this.rolloverDetails;
var _62e=null;
if(this.draggableElementProxy!=null){
_62e=this.draggableElementProxy;
}else{
_62e=this.draggableElement;
}
Element.removeClassName(el,"rdDefault");
Element.removeClassName(el,"rdRight");
Element.removeClassName(el,"rdBottom");
Element.removeClassName(el,"rdRightBottom");
Element.show(el);
var _62f=el.offsetWidth;
var _630=el.offsetHeight;
Position.clone((this.boxart||this.parentElement),el);
if(this.boxart){
el.style.left=(parseInt(el.style.left)+this.boxart.offsetWidth+5)+"px";
el.style.top=(parseInt(el.style.top)+this.boxart.offsetHeight-25)+"px";
}else{
var _631=_62e.offsetWidth;
if(_62e.offsetWidth>_62e.parentNode.parentNode.offsetWidth){
_631=_62e.parentNode.parentNode.offsetWidth;
}
el.style.left=(parseInt(el.style.left)+_631+17)+"px";
el.style.top=(parseInt(el.style.top)+_62e.offsetHeight-17)+"px";
}
el.style.width="1px";
el.style.height="1px";
el.style.overflow="hidden";
el.style.visibility="hidden";
Position.prepare();
var _632=Position.cumulativeOffset(el);
_632[0]+=_62f-Position.deltaX;
_632[1]+=_630-Position.deltaY;
var _633="";
if(window.innerHeight){
_633=[window.innerWidth,window.innerHeight];
}else{
if(document.body.clientHeight){
_633=[document.body.clientWidth,document.body.clientHeight];
}else{
if(document.documentElement){
_633=[document.documentElement.clientWidth,document.documentElement.clientHeight];
}
}
}
if(document.getElementById("rolloverBottom")){
if(this.boxart){
el.style.top=(parseInt(el.offsetTop)-parseInt(this.boxart.height)+80)+"px";
}else{
el.style.top=(parseInt(el.offsetTop))+"px";
}
if(_632[0]>_633[0]||_632[1]>_633[1]){
Position.clone(this.boxart||this.parentElement,el);
if(_632[0]>_633[0]){
el.style.left=(parseInt(el.offsetLeft)-430)+"px";
Element.addClassName(el,"rdRight");
}else{
el.style.left=(parseInt(el.offsetLeft)+parseInt(this.boxart.width))+"px";
Element.addClassName(el,"rdDefault");
}
}else{
Element.addClassName(el,"rdDefault");
}
}else{
if(_632[0]>_633[0]||_632[1]>_633[1]){
Position.clone(this.boxart||this.parentElement,el);
el.style.width="1px";
el.style.height="1px";
bOffsetX=0;
bOffsetY=0;
if(_632[0]>_633[0]&&_632[1]>_633[1]){
Element.addClassName(el,"rdRightBottom");
if(this.boxart){
bOffsetX=-430;
bOffsetY=-_630+25;
}else{
bOffsetX=-440;
bOffsetY=-_630+13;
}
newCoordinateY=(_632[1]-_630-_630);
if(this.boxart){
newCoordinateY=newCoordinateY+33-this.boxart.offsetHeight;
}
if(newCoordinateY<0&&newCoordinateY<0){
var divs=el.getElementsByTagName("div");
contentsOffset=-newCoordinateY;
for(var i=0,j=divs.length;i<j;i++){
if(divs[i].className=="start"){
divs[i].style.top=(contentsOffset-18)+"px";
}
if(divs[i].className=="contents"){
divs[i].style.top=contentsOffset+"px";
divs[i].style.position="relative";
}
if(divs[i].className=="end"){
divs[i].style.bottom=(-14-contentsOffset)+"px";
}
}
}
}else{
if(_632[0]>_633[0]){
Element.addClassName(el,"rdRight");
if(this.boxart){
bOffsetX=-430;
bOffsetY=this.boxart.offsetHeight-25;
}else{
bOffsetX=-440;
bOffsetY=_62e.offsetHeight-13;
}
}else{
if(_632[1]>_633[1]){
Element.addClassName(el,"rdBottom");
if(this.boxart){
bOffsetX=this.boxart.offsetWidth+5;
bOffsetY=-_630+25;
}else{
bOffsetX=_62e.offsetWidth+13;
bOffsetY=-_630+13;
}
newCoordinateY=(_632[1]-_630-_630);
if(this.boxart){
newCoordinateY=newCoordinateY+33-this.boxart.offsetHeight;
}
if(newCoordinateY<0&&newCoordinateY<0){
var divs=el.getElementsByTagName("div");
contentsOffset=-newCoordinateY;
for(var i=0,j=divs.length;i<j;i++){
if(divs[i].className=="start"){
divs[i].style.top=(contentsOffset-18)+"px";
}
if(divs[i].className=="contents"){
divs[i].style.top=contentsOffset+"px";
divs[i].style.position="relative";
}
if(divs[i].className=="end"){
divs[i].style.bottom=(-14-contentsOffset)+"px";
}
}
}
}
}
}
el.style.left=(parseInt(el.style.left)+bOffsetX)+"px";
el.style.top=(parseInt(el.style.top)+bOffsetY)+"px";
}else{
Element.addClassName(el,"rdDefault");
}
}
el.style.width="420px";
el.style.height="auto";
el.style.overflow="visible";
el.style.visibility="visible";
}
}
catch(e){
this.log("Rollover.displayRollover(): "+e.message);
}
},log:function(msg){
logger.error(msg);
},toString:function(){
var _637="";
_637="this.parentElement: "+this.parentElement+"<br/>";
_637+="this.draggableElement: "+this.draggableElement+"<br/>";
_637+="this.draggableElementProxy: "+this.draggableElementProxy+"<br/>";
_637+="this.boxart: "+this.boxart+"<br/>";
_637+="this.delayShow: "+this.delayShow+"<br/>";
_637+="this.delayHide: "+this.delayHide+"<br/>";
_637+="this.isRolloverShowing: "+this.isRolloverShowing+"<br/>";
_637+="this.rolloverUrl: "+this.rolloverUrl+"<br/>";
_637+="this.rolloverDetails: "+this.rolloverDetails+"<br/>";
return _637;
}};
Rollover.rolloverElement=null;
var AvatarRollover=Class.create();
AvatarRollover.prototype=(new Rollover()).extend({initialize:function(_638,_639){
this.draggableElement=$(_638);
this.parentElement=this.draggableElement;
this.draggableElementProxy=null;
this.boxart=null;
this.delayShow=150;
this.delayHide=150;
this.isRolloverShowing=false;
this.elementTimer=null;
this.rolloverTimer=null;
this.rolloverDetails=$(_639).innerHTML;
if(Rollover.rolloverElement==null){
this.createRolloverElement();
}
this.draggableElement.onmouseover=this.mousedOver.bindAsEventListener(this);
this.draggableElement.onmouseout=this.mousedOut.bindAsEventListener(this);
this.mousedOver();
},toString:function(){
var _63a="";
_63a="this.parentElement: "+this.parentElement+"<br/>";
_63a+="this.draggableElement: "+this.draggableElement+"<br/>";
_63a+="this.draggableElementProxy: "+this.draggableElementProxy+"<br/>";
_63a+="this.boxart: "+this.boxart+"<br/>";
_63a+="this.delayShow: "+this.delayShow+"<br/>";
_63a+="this.delayHide: "+this.delayHide+"<br/>";
_63a+="this.isRolloverShowing: "+this.isRolloverShowing+"<br/>";
_63a+="this.AvatarRolloverId: "+this.AvatarRolloverId+"<br/>";
_63a+="this.rolloverDetails: "+this.rolloverDetails+"<br/>";
return _63a;
},displayRollover:function(){
try{
this.isRolloverShowing=true;
el=Rollover.rolloverElement;
el.innerHTML=this.rolloverDetails;
var _63b=this.draggableElement;
Element.show(el);
var _63c=el.offsetWidth;
var _63d=el.offsetHeight;
Position.clone(this.parentElement,el);
var _63e=_63b.offsetWidth;
if(_63b.offsetWidth>_63b.parentNode.parentNode.offsetWidth){
_63e=_63b.parentNode.parentNode.offsetWidth;
}
el.style.left=(parseInt(el.style.left)+_63e+17)+"px";
el.style.top=(parseInt(el.style.top)+_63b.offsetHeight-17)+"px";
el.style.width="1px";
el.style.height="1px";
el.style.overflow="hidden";
el.style.visibility="hidden";
Position.prepare();
var _63f=Position.cumulativeOffset(el);
_63f[0]+=_63c-Position.deltaX;
_63f[1]+=_63d-Position.deltaY;
var _640="";
if(window.innerHeight){
_640=[window.innerWidth,window.innerHeight];
}else{
if(document.body.clientHeight){
_640=[document.body.clientWidth,document.body.clientHeight];
}else{
if(document.documentElement){
_640=[document.documentElement.clientWidth,document.documentElement.clientHeight];
}
}
}
if(_63f[0]>_640[0]||_63f[1]>_640[1]){
Position.clone(this.parentElement,el);
el.style.width="1px";
el.style.height="1px";
bOffsetX=0;
bOffsetY=0;
additionalXOffset=-40;
additionalYOffset=50;
if(!window.innerHeight){
additionalYOffset=50;
}
if(_63f[0]>_640[0]&&_63f[1]>_640[1]){
bOffsetX=-240+additionalXOffset;
bOffsetY=-_63d+additionalYOffset;
}else{
if(_63f[0]>_640[0]){
bOffsetX=-240+additionalXOffset;
bOffsetY=_63b.offsetHeight-additionalYOffset;
}else{
if(_63f[1]>_640[1]){
bOffsetX=_63b.offsetWidth+additionalXOffset;
bOffsetY=-_63d+additionalYOffset;
}
}
}
el.style.left=(parseInt(el.style.left)+bOffsetX)+"px";
el.style.top=(parseInt(el.style.top)+bOffsetY)+"px";
}
el.style.width="240px";
el.style.height="auto";
el.style.overflow="visible";
el.style.visibility="visible";
}
catch(e){
}
}});
var ReadMoreRollover=Class.create();
ReadMoreRollover.prototype=(new Rollover()).extend({initialize:function(_641,url){
this.draggableElement=$(_641);
this.parentElement=this.draggableElement;
this.draggableElementProxy=null;
this.boxart=null;
this.delayShow=500;
this.delayHide=150;
this.isRolloverShowing=false;
this.elementTimer=null;
this.rolloverTimer=null;
this.rolloverUrl=url;
this.rolloverDetails=null;
if(Rollover.rolloverElement==null){
this.createRolloverElement();
}
this.draggableElement.onmouseover=this.mousedOver.bindAsEventListener(this);
this.draggableElement.onmouseout=this.mousedOut.bindAsEventListener(this);
this.mousedOver();
},toString:function(){
var _643="";
_643="this.parentElement: "+this.parentElement+"<br/>";
_643="this.draggableElement: "+this.draggableElement+"<br/>";
_643="this.draggableElementProxy: "+this.draggableElementProxy+"<br/>";
_643="this.boxart: "+this.boxart+"<br/>";
_643="this.delayShow: "+this.delayShow+"<br/>";
_643="this.delayHide: "+this.delayHide+"<br/>";
_643="this.isRolloverShowing: "+this.isRolloverShowing+"<br/>";
_643="this.rolloverDetails: "+this.rolloverDetails+"<br/>";
return _643;
}});
var MovieRollover=Class.create();
MovieRollover.prototype={initialize:function(el){
this.htmlElement=$(el);
this.actionPath=null;
this.movieElement=this.findMovieElement(this.htmlElement);
if(this.movieElement!=null){
this.actionPath=this.getActionPath(this.movieElement);
}
this.movieRollover=new Rollover(this.movieElement,this.htmlElement);
this.movieRollover.mousedOver();
},findMovieElement:function(el){
try{
if(el.className!=null){
if(el.className.indexOf("bvr-movielistitem")!=-1){
return el;
}else{
return this.findMovieElement(el.parentNode);
}
}else{
return this.findMovieElement(el.parentNode);
}
}
catch(e){
this.log("MovieRollover.findMovieElement(): "+e.message);
return null;
}
},getActionPath:function(el){
try{
var _647=el.getElementsByTagName("a");
var _648=null;
for(i=0;i<_647.length;i++){
if(_647[i]!=null&&_647[i].className.indexOf("bvr-qadd")!=-1){
if(_647[i].getAttribute("href")!=null){
_648=_647[i].getAttribute("href");
}
break;
}
}
return _648;
}
catch(e){
this.log("MovieRollover.getActionPath(): "+e.message);
return null;
}
},toString:function(){
var _649="";
_649="this.htmlElement: "+this.htmlElement+"<br/>";
_649+="this.movieElement: "+this.movieElement+"<br/>";
_649+="this.movieRollover: "+this.movieRollover+"<br/>";
_649+="this.actionPath: "+this.actionPath+"<br/>";
return _649;
},log:function(msg){
logger.error(msg);
}};
var GameRollover=Class.create();
GameRollover.prototype={initialize:function(el){
this.htmlElement=$(el);
this.actionPath=null;
this.gameElement=this.findGameElement(this.htmlElement);
if(this.gameElement!=null){
this.actionPath=this.getActionPath(this.gameElement);
}
this.gameRollover=new Rollover(this.gameElement,this.htmlElement);
this.gameRollover.mousedOver();
},findGameElement:function(el){
try{
if(el.className!=null){
if(el.className.indexOf("bvr-gamelistitem")!=-1){
return el;
}else{
return this.findGameElement(el.parentNode);
}
}else{
return this.findGameElement(el.parentNode);
}
}
catch(e){
this.log("GameRollover.findGameElement(): "+e.message);
return null;
}
},getActionPath:function(el){
try{
var _64e=el.getElementsByTagName("a");
var _64f=null;
for(i=0;i<_64e.length;i++){
if(_64e[i]!=null&&_64e[i].className.indexOf("bvr-qadd")!=-1){
if(_64e[i].getAttribute("href")!=null){
_64f=_64e[i].getAttribute("href");
}
break;
}
}
return _64f;
}
catch(e){
this.log("GameRollover.getActionPath(): "+e.message);
return null;
}
},toString:function(){
var _650="";
_650="this.htmlElement: "+this.htmlElement+"<br/>";
_650+="this.gameElement: "+this.gameElement+"<br/>";
_650+="this.gameRollover: "+this.gameRollover+"<br/>";
_650+="this.actionPath: "+this.actionPath+"<br/>";
return _650;
},log:function(msg){
logger.error(msg);
}};
var QuickHelpRollover=Class.create();
QuickHelpRollover.prototype=(new Rollover()).extend({initialize:function(_652){
this.draggableElement=$(_652);
this.parentElement=this.draggableElement;
this.draggableElementProxy=null;
this.boxart=null;
this.delayShow=500;
this.delayHide=150;
this.isRolloverShowing=false;
this.elementTimer=null;
this.rolloverTimer=null;
this.helpId=this.draggableElement.id.replace(" ","").toLowerCase();
this.rolloverDetails=document.getElementById(this.helpId).innerHTML;
if(Rollover.rolloverElement==null){
this.createRolloverElement();
}
this.draggableElement.onmouseover=this.mousedOver.bindAsEventListener(this);
this.draggableElement.onmouseout=this.mousedOut.bindAsEventListener(this);
this.mousedOver();
},toString:function(){
var _653="";
_653="this.parentElement: "+this.parentElement+"<br/>";
_653="this.draggableElement: "+this.draggableElement+"<br/>";
_653="this.draggableElementProxy: "+this.draggableElementProxy+"<br/>";
_653="this.boxart: "+this.boxart+"<br/>";
_653="this.delayShow: "+this.delayShow+"<br/>";
_653="this.delayHide: "+this.delayHide+"<br/>";
_653="this.isRolloverShowing: "+this.isRolloverShowing+"<br/>";
_653+="this.helpId: "+this.helpId+"<br/>";
_653="this.rolloverDetails: "+this.rolloverDetails+"<br/>";
return _653;
}});
var Download=Class.create();
Download.prototype={initialize:function(el,_655){
this.el=$(el);
this.editionsUrl=_655;
this.jsonResponse=null;
this.xml=null;
},log:function(msg){
logger.error(msg);
},handleError:function(){
},setCursors:function(_657){
this.el.style.cursor=_657;
document.body.style.cursor=_657;
},processHandoff:function(){
try{
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.storeAjaxHandoffResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("Download.processHandoff(): "+e.message);
return true;
}
},storeAjaxHandoffResponse:function(_658){
this.jsonResponse=_658;
var _659=_658.partialSuccessMessage;
if(_659!=""){
document.getElementById("mmFeedback").innerHTML=_659;
setTimeout(function(){
window.location.reload();
},5000);
}else{
window.location.reload();
}
},addMultipleOrder:function(){
try{
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.storeAjaxMultipleAddOrderResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("Download.addMultipleOrder(): "+e.message);
return true;
}
},storeAjaxMultipleAddOrderResponse:function(_65a){
this.jsonResponse=_65a;
var _65b=(_65a.handOffXml);
var _65c=_65a.orderDetailId;
try{
var _65d=new ActiveXObject("MovielinkBroker.MCCommandBroker");
_65d.SetAffiliate("77","www.blockbuster.com");
var _65e=(_65d.Add(_65b));
printCustomerFeedback(_65e,_65c);
}
catch(e){
return false;
}
},addTOS:function(){
try{
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.storeAjaxTOSResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("SelectEdition.add(): "+e.message);
return true;
}
},storeAjaxTOSResponse:function(_65f){
this.jsonResponse=_65f;
var _660=(_65f.handOffXml);
try{
var _661=new ActiveXObject("MovielinkBroker.MCCommandBroker");
_661.SetAffiliate("77","www.blockbuster.com");
var _662=(_661.Add(_660));
printCustomerFeedback(_662,"");
}
catch(e){
return false;
}
},verifyAge:function(){
try{
var _663=location.href;
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.processAgeCheckResponse.bind(this,_663),this.handleError.bind(this));
return false;
}
catch(e){
this.log("verifyAge(): "+e.message);
return true;
}
},processAgeCheckResponse:function(_664,_665){
this.jsonResponse=_664;
var _666=_664.skuId;
if(_664.ageVerified=="Y"){
try{
if(_664.isTOS=="Y"){
document.forms[0].action="/download/digital/checkout/tosCheckout/"+_666;
}else{
document.forms[0].action="/download/digital/checkout/downloadAuthentication/"+_666+"?catalystUrl="+_665;
}
document.forms[0].submit();
return false;
}
catch(e){
this.log("processAgeCheckResponse: "+e.message);
return true;
}
}else{
var age=_664.age;
document.getElementById("errorDiv_"+_666).innerHTML="<br/>You must be at least "+age+" years of age to rent or buy this movie.";
document.getElementById("errorDiv_"+_666).style.color="red";
}
},verifyCustomerDetails:function(){
try{
new BaseHandler().processAjaxRequest(this.editionsUrl,"",this.processCustomerDetailsResponse.bind(this),this.handleError.bind(this));
return false;
}
catch(e){
this.log("verifyCustomerDetails(): "+e.message);
return true;
}
},processCustomerDetailsResponse:function(_668){
this.jsonResponse=_668;
if(_668.nameVerified=="N"){
document.getElementById("errorDiv").innerHTML="Please enter your name.";
document.getElementById("errorDiv").style.color="red";
}else{
if(_668.questionVerified=="N"){
document.getElementById("errorDiv").innerHTML="Please tell us how we can help you.";
document.getElementById("errorDiv").style.color="red";
}else{
if(_668.emailVerified=="N"){
document.getElementById("errorDiv").innerHTML="Please enter your email address.";
document.getElementById("errorDiv").style.color="red";
}else{
try{
document.forms[0].action="https://admin.instantservice.com/servlet/Customer";
document.forms[0].submit();
}
catch(e){
this.log("processCustomerDetailsResponse: "+e.message);
return true;
}
}
}
}
},clearAltView:function(){
document.downloadCheckoutModel.freeFormCode.value="";
document.getElementsByName("freeFormCode")[0].disabled=false;
radios=document.getElementsByName("retailPromotionId");
for(i=0;i<radios.length;i++){
radios[i].checked=false;
}
},clearDefaultView:function(){
document.downloadCheckoutModel.promotionalCode.value="";
},displayAccesscodes:function(_669){
document.getElementById("availableCodes"+_669).style.display="block";
document.getElementById("plus"+_669).style.display="none";
document.getElementById("minus"+_669).style.display="block";
},hideAccesscodes:function(_66a){
document.getElementById("availableCodes"+_66a).style.display="none";
document.getElementById("plus"+_66a).style.display="block";
document.getElementById("minus"+_66a).style.display="none";
},checkFreeForm:function(){
radios=document.getElementsByName("retailPromotionId");
for(i=0;i<radios.length;i++){
if(radios[i].value=-99){
radios[i].checked=true;
}
}
}};
var mmStatusCount=0;
var M3Static;
var MMStatus;
var INSTALL_WMP=6;
var isEhome="false";
var latestVersion="";
var showHandOffDebug="false";
var handOffTimeOut="1000";
var indexArray=new Array();
var titleArray=new Array();
var tokenArray=new Array();
var retCodeArray=new Array();
function testMMStatus(_66b){
if(mmStatusCount<=0){
mmStatusCount++;
return;
}
if(isMMInstalled()=="true"){
switch(_66b){
case "upgrade":
if((M3Static.GetStatus()=="1")){
if(mmStatusCount<=0){
mmStatusCount++;
break;
}
window.clearInterval(MMStatus);
mmStatusCount=0;
SendDownloadRequest();
}
break;
case "install":
window.clearInterval(MMStatus);
SendDownloadRequest();
break;
case "myAccount":
if(mmStatusCount<=0){
mmStatusCount++;
break;
}
window.clearInterval(MMStatus);
mmStatusCount=0;
setTimeout("window.location.reload()",2000);
break;
}
}
}
function SendDownloadRequest(){
createMMStaticObject();
}
function timeOutDownloadTOS(_66c,_66d,_66e,_66f,_670,_671,_672,_673,_674){
setTimeout(function(){
if(!checkMMVersionUpgrade(_66c)){
timeOutDownloadTOS(_66c,_66d,_66e,_66f,_670,_671,_672,_673,_674);
}else{
M3Static.ExecuteUserCommandLong(2002,1,"");
try{
new Download(this,"/download/digital/downloadHandoffTOSXml?skuId="+_66d+"&licenseId="+_66e+"&downloadId="+_66f+"&licenseExpiration="+_670+"&licenseUrl="+_671+"&fullfillmentId="+_672+"&deviceId="+_673+"&deviceType="+_674).addTOS();
return true;
}
catch(e){
return false;
}
}
},1000);
}
function timeOutDownload(_675,ids,_677,_678){
setTimeout(function(){
if(!checkMMVersionUpgrade(_675)){
timeOutDownload(_675,ids,_677,_678);
}else{
M3Static.ExecuteUserCommandLong(2002,1,"");
try{
new Download(this,"/download/digital/downloadMultipleHandoffXml?orderDetailIds="+ids+"&deviceId="+_677+"&deviceType="+_678).addMultipleOrder();
return true;
}
catch(e){
return false;
}
}
},1000);
}
function createMMStaticObject(){
try{
if(typeof (M3Static)=="undefined"){
M3Static=new ActiveXObject("M3Static.Tool");
return true;
}
}
catch(e){
return false;
}
}
function isMMInstalled(){
if(checkMMInstalled()=="error"){
return "error";
}else{
if(checkMMInstalled()=="true"){
return "true";
}else{
return "false";
}
}
}
function checkMMInstalled(){
try{
createMMStaticObject();
if(M3Static.IsInstalled()){
return "true";
}else{
return "false";
}
}
catch(e){
return "error";
}
}
function checkMMVersion(_679){
try{
return mmVersionCheck(M3Static.GetVersion(),_679);
}
catch(e){
return false;
}
}
function checkMMVersionUpgrade(_67a){
try{
return mmVersionCheck(M3Static.GetVersion(),_67a);
}
catch(e){
return false;
}
}
function mmVersionCheck(_67b,_67c){
aryBase=_67c.split(".");
aryCur=_67b.split(".");
for(var i=0;i<aryBase.length;i++){
if(parseInt(aryBase[i])<parseInt(aryCur[i])){
return true;
}else{
if(parseInt(aryBase[i])>parseInt(aryCur[i])){
return false;
}
}
}
return true;
}
function printCustomerFeedback(_67e,_67f){
try{
if(_67f!=""){
new Download(this,"/download/digital/processMultipleHandOffResponse?orderDetailId="+_67f+"&handOffXml="+_67e).processHandoff();
}else{
new Download(this,"/download/digital/processMultipleHandOffResponse?handOffXml="+_67e).processHandoff();
window.location.reload();
}
}
catch(e){
}
}
function launchMMGUI(){
createMMStaticObject();
try{
M3Static.ExecuteUserCommandLong(2002,1,"");
}
catch(e){
return false;
}
}
function retrieveMMVersion(){
createMMStaticObject();
return M3Static.GetVersion();
}
function startInstallManager(){
document.getElementById("getPlayer").style.display="none";
if(document.getElementById("waitInstall")!=null){
document.getElementById("waitInstall").style.display="";
}
mmStatusCount=0;
MMStatus=setInterval("testMMStatus(\"myAccount\")",100);
}
function checkPlayerExistence(){
var _680=isMMInstalled();
if(_680=="true"){
hideDiv("getPlayer");
showDiv("downloadBlock1");
showDiv("downloadBlock2");
}else{
showDiv("getPlayer");
hideDiv("downloadBlock1");
hideDiv("downloadBlock2");
}
}
function verifyAge(age,_682,_683){
if(_683=="Y"){
if(document.getElementById("option_"+_682).checked){
return true;
}else{
document.getElementById("errorDiv_"+_682).innerHTML="<br/>You must be at least "+age+" years of age to rent or buy this movie.";
document.getElementById("errorDiv_"+_682).style.color="red";
return false;
}
}else{
if(document.getElementById("option_"+_682).checked){
var _684=document.getElementById("option_"+_682).checked;
new Download(this,"/download/digital/checkout/ageVerification?&ageCheck="+_684+"&skuId="+_682+"&age="+age+"&isTOS="+_683).verifyAge();
}else{
document.getElementById("errorDiv_"+_682).innerHTML="<br/>You must be at least "+age+" years of age to rent or buy this movie.";
document.getElementById("errorDiv_"+_682).style.color="red";
}
}
}
function chatCustomerCare(){
var _685=document.forms[0].userName.value;
var _686=document.forms[0].email.value;
var _687=document.forms[0].optionaldata.value;
new Download(this,"/download/digital/checkout/processChat?&userName="+_685+"&optionaldata="+_687+"&email="+_686).verifyCustomerDetails();
}
function launchGUI(){
if(isMMInstalled()){
launchMMGUI();
}else{
}
return true;
}
function checkUnCheckDownloads(_688){
var _689=document.getElementsByName("selectedDownload").length;
for(i=0;i<document.getElementsByName("selectedDownload").length;i++){
if(_688.checked){
document.getElementsByName("selectedDownload")[i].checked=true;
}else{
document.getElementsByName("selectedDownload")[i].checked=false;
}
}
}
function showOverlayForDownload(_68a,name){
var _68c=document.getElementsByName(name);
var mode="";
for(var i=0;i<_68c.length;i++){
if(_68c[i].checked==true){
mode=_68c[i].value;
}
}
if(mode!=""){
Overlay=new popupUrlHandler("/download/digital/checkout/downloadOffer/"+_68a+"/"+mode,"boxPopup","",null,location.href);
Overlay.execute();
return false;
}
}
function showSelectedDownloadOffer(_68f,_690,form){
var mode="";
var _693=form.downloadMode;
for(var i=0;i<_693.length;i++){
if(_693[i].checked==true){
mode=_693[i].value;
}
}
if(mode!=""){
Overlay=new popupUrlHandler("/download/digital/checkout/downloadPackageOffer/"+_68f+"/"+_690+"/"+mode,"boxPopup","",null,location.href);
Overlay.execute();
return false;
}
}
function showDownloadOffer(_695,_696,mode){
var _698=location.href;
Overlay=new popupUrlHandler("/download/digital/checkout/downloadPackageOffer/"+_695+"/"+_696+"/"+mode,"boxPopup","",null,_698);
Overlay.execute();
return false;
}
function showDownloadOffer(_699,mode){
var _69b=location.href;
Overlay=new popupUrlHandler("/download/digital/checkout/downloadOffer/"+_699+"/"+mode+"/","boxPopup","",null,_69b);
Overlay.execute();
return false;
}
function detectConfigurationSettings(){
var _69c=false;
try{
var _69d=new ActiveXObject("Msxml2.XMLHTTP");
var _69c=detectPlugin("MediaPlayer.MediaPlayer.1","Windows Media Player");
return _69c;
}
catch(err){
return false;
}
}
function detectPlugin(_69e,name){
result=false;
document.write("<SCRIPT LANGUAGE=VBScript>\n on error resume next \n result = IsObject(CreateObject(\""+_69e+"\"))</SCRIPT>\n");
return result;
}
function detectBrowserSetting(){
if(detectConfigurationSettings){
var _6a0=document.getElementById("browserDownload");
if(_6a0!=null){
showDiv("browserDownload");
}
}
}
function showBuyDownload(){
showDiv("buyOfferDetails");
showDiv("buyDownloadLink");
hideDiv("buyDownloadDetails");
hideDiv("buyDownloadLinkClose");
hideDiv("rentOfferDetails");
hideDiv("rentDownloadDetails");
hideDiv("rentDownloadLink");
hideDiv("rentDownloadLinkClose");
}
function showRentDownload(){
showDiv("rentOfferDetails");
showDiv("rentDownloadLink");
hideDiv("rentDownloadDetails");
hideDiv("rentDownloadLinkClose");
hideDiv("buyOfferDetails");
hideDiv("buyDownloadDetails");
hideDiv("buyDownloadLink");
hideDiv("buyDownloadLinkClose");
}
function showBuyTermsOpen(){
showDiv("buyDownloadDetails");
showDiv("buyDownloadLinkClose");
hideDiv("buyDownloadLink");
}
function showBuyTermsClose(){
hideDiv("buyDownloadDetails");
showDiv("buyDownloadLink");
hideDiv("buyDownloadLinkClose");
}
function showRentTermsOpen(){
hideDiv("rentDownloadLink");
showDiv("rentDownloadDetails");
showDiv("rentDownloadLinkClose");
}
function showRentTermsClose(){
showDiv("rentDownloadLink");
hideDiv("rentDownloadDetails");
hideDiv("rentDownloadLinkClose");
}
function initiateNonTOSDownload(_6a1,_6a2,_6a3,_6a4,_6a5,_6a6){
var _6a7=1000;
var _6a8=isMMInstalled();
var _6a9="mmInstallPath";
var _6aa="download"+_6a4;
hideDiv(_6aa);
var _6ab="pleaseWait"+_6a4;
showDiv(_6ab);
if(_6a8!="true"){
document.getElementById(_6a9).src=_6a2;
document.getElementById(_6a9).style.visibility="visible";
_6a7=1000;
waitForNonTOSDownload(_6a3,_6a1,_6a7,_6a5,_6a6);
}else{
if(_6a8=="true"){
_6a7=1000;
downloadNonTOS(_6a3,_6a1,_6a7,_6a5,_6a6);
}
}
}
function waitForNonTOSDownload(_6ac,_6ad,_6ae,_6af,_6b0){
setTimeout(function(){
if(isMMInstalled()!="true"){
waitForNonTOSDownload(_6ac,_6ad,_6ae,_6af,_6b0);
}else{
downloadNonTOS(_6ac,_6ad,_6ae,_6af,_6b0);
}
},_6ae);
}
function downloadNonTOS(_6b1,_6b2,_6b3,_6b4,_6b5){
setTimeout(function(){
var id=_6b2;
createMMStaticObject();
var _6b7=_6b1;
if(!checkMMVersion(_6b7)){
var _6b8="' /updatecheck /now '";
mmStatusCount=-10;
try{
createMMStaticObject();
M3Static.ExecuteUserCommandLong(2002,0,_6b8);
MMStatus=setInterval("testMMStatus(\"upgrade\")",2500);
}
catch(e){
}
}
if(!checkMMVersionUpgrade(_6b7)){
timeOutDownload(_6b7,id,_6b4,_6b5);
}else{
M3Static.ExecuteUserCommandLong(2002,1,"");
try{
new Download(this,"/download/digital/downloadMultipleHandoffXml?orderDetailIds="+id+"&deviceId="+_6b4+"&deviceType="+_6b5).addMultipleOrder();
return true;
}
catch(e){
return false;
}
}
},_6b3);
}
function initiateTOSDownload(_6b9,_6ba,_6bb,_6bc,_6bd,_6be,_6bf,_6c0,_6c1,_6c2){
var _6c3=1000;
var _6c4=isMMInstalled();
var _6c5="mmInstallPath";
var _6c6="download"+_6c0;
hideDiv(_6c6);
var _6c7="pleaseWait"+_6c0;
showDiv(_6c7);
if(_6c4!="true"){
document.getElementById(_6c5).src=_6be;
document.getElementById(_6c5).style.visibility="visible";
_6c3=1000;
waitForTOSDownload(_6bf,_6b9,_6ba,_6bb,_6bc,_6bd,_6c0,_6c3,_6c1,_6c2);
}else{
if(_6c4=="true"){
_6c3=1000;
downloadTOS(_6bf,_6b9,_6ba,_6bb,_6bc,_6bd,_6c0,_6c3,_6c1,_6c2);
}
}
}
function waitForTOSDownload(_6c8,_6c9,_6ca,_6cb,_6cc,_6cd,_6ce,_6cf,_6d0,_6d1){
setTimeout(function(){
if(isMMInstalled()!="true"){
waitForTOSDownload(_6c8,_6c9,_6ca,_6cb,_6cc,_6cd,_6ce,_6cf,_6d0,_6d1);
}else{
downloadTOS(_6c8,_6c9,_6ca,_6cb,_6cc,_6cd,_6ce,_6cf,_6d0,_6d1);
}
},_6cf);
}
function downloadTOS(_6d2,_6d3,_6d4,_6d5,_6d6,_6d7,_6d8,_6d9,_6da,_6db){
setTimeout(function(){
createMMStaticObject();
var _6dc=_6d2;
if(!checkMMVersion(_6dc)){
var _6dd="' /updatecheck /now '";
mmStatusCount=-10;
try{
createMMStaticObject();
M3Static.ExecuteUserCommandLong(2002,0,_6dd);
MMStatus=setInterval("testMMStatus(\"upgrade\")",2500);
}
catch(e){
}
}
if(!checkMMVersionUpgrade(_6dc)){
timeOutDownloadTOS(_6dc,_6d3,_6d4,_6d5,_6d6,_6d7,_6d8,_6da,_6db);
}else{
M3Static.ExecuteUserCommandLong(2002,1,"");
try{
new Download(this,"/download/digital/downloadHandoffTOSXml?skuId="+_6d3+"&licenseId="+_6d4+"&downloadId="+_6d5+"&licenseExpiration="+_6d6+"&licenseUrl="+_6d7+"&fullfillmentId="+_6d8+"&deviceId="+_6da+"&deviceType="+_6db).addTOS();
return true;
}
catch(e){
return false;
}
}
},_6d9);
}
function _element(){
this.type="element";
this.name=new String();
this.attributes=new Array();
this.contents=new Array();
this.uid=_Xparse_count++;
_Xparse_index[this.uid]=this;
}
function _chardata(){
this.type="chardata";
this.value=new String();
}
function _pi(){
this.type="pi";
this.value=new String();
}
function _comment(){
this.type="comment";
this.value=new String();
}
function _frag(){
this.str=new String();
this.ary=new Array();
this.end=new String();
}
var _Xparse_count=0;
var _Xparse_index=new Array();
function Xparse(src){
var frag=new _frag();
frag.str=_prolog(src);
var root=new _element();
root.name="ROOT";
frag=_compile(frag);
root.contents=frag.ary;
root.index=_Xparse_index;
_Xparse_index=new Array();
return root;
}
function _compile(frag){
while(1){
if(frag.str.length==0){
return frag;
}
var _6e2=frag.str.indexOf("<");
if(_6e2!=0){
var _6e3=frag.ary.length;
frag.ary[_6e3]=new _chardata();
if(_6e2==-1){
frag.ary[_6e3].value=_entity(frag.str);
frag.str="";
}else{
frag.ary[_6e3].value=_entity(frag.str.substring(0,_6e2));
frag.str=frag.str.substring(_6e2,frag.str.length);
}
}else{
if(frag.str.substring(1,2)=="?"){
frag=_tag_pi(frag);
}else{
if(frag.str.substring(1,4)=="!--"){
frag=_tag_comment(frag);
}else{
if(frag.str.substring(1,9)=="![CDATA["){
frag=_tag_cdata(frag);
}else{
if(frag.str.substring(1,frag.end.length+3)=="/"+frag.end+">"||_strip(frag.str.substring(1,frag.end.length+3))=="/"+frag.end){
frag.str=frag.str.substring(frag.end.length+3,frag.str.length);
frag.end="";
return frag;
}else{
frag=_tag_element(frag);
}
}
}
}
}
}
return "";
}
function _tag_element(frag){
var _6e5=frag.str.indexOf(">");
var _6e6=(frag.str.substring(_6e5-1,_6e5)=="/");
if(_6e6){
_6e5-=1;
}
var _6e7=_normalize(frag.str.substring(1,_6e5));
var _6e8=_6e7.indexOf(" ");
var _6e9=new String();
var name=new String();
if(_6e8!=-1){
name=_6e7.substring(0,_6e8);
_6e9=_6e7.substring(_6e8+1,_6e7.length);
}else{
name=_6e7;
}
var _6eb=frag.ary.length;
frag.ary[_6eb]=new _element();
frag.ary[_6eb].name=_strip(name);
if(_6e9.length>0){
frag.ary[_6eb].attributes=_attribution(_6e9);
}
if(!_6e6){
var _6ec=new _frag();
_6ec.str=frag.str.substring(_6e5+1,frag.str.length);
_6ec.end=name;
_6ec=_compile(_6ec);
frag.ary[_6eb].contents=_6ec.ary;
frag.str=_6ec.str;
}else{
frag.str=frag.str.substring(_6e5+2,frag.str.length);
}
return frag;
}
function _tag_pi(frag){
var _6ee=frag.str.indexOf("?>");
var val=frag.str.substring(2,_6ee);
var _6f0=frag.ary.length;
frag.ary[_6f0]=new _pi();
frag.ary[_6f0].value=val;
frag.str=frag.str.substring(_6ee+2,frag.str.length);
return frag;
}
function _tag_comment(frag){
var _6f2=frag.str.indexOf("-->");
var val=frag.str.substring(4,_6f2);
var _6f4=frag.ary.length;
frag.ary[_6f4]=new _comment();
frag.ary[_6f4].value=val;
frag.str=frag.str.substring(_6f2+3,frag.str.length);
return frag;
}
function _tag_cdata(frag){
var _6f6=frag.str.indexOf("]]>");
var val=frag.str.substring(9,_6f6);
var _6f8=frag.ary.length;
frag.ary[_6f8]=new _chardata();
frag.ary[_6f8].value=val;
frag.str=frag.str.substring(_6f6+3,frag.str.length);
return frag;
}
function _attribution(str){
var all=new Array();
while(1){
var eq=str.indexOf("=");
if(str.length==0||eq==-1){
return all;
}
var id1=str.indexOf("'");
var id2=str.indexOf("\"");
var ids=new Number();
var id=new String();
if((id1<id2&&id1!=-1)||id2==-1){
ids=id1;
id="'";
}
if((id2<id1||id1==-1)&&id2!=-1){
ids=id2;
id="\"";
}
var _700=str.indexOf(id,ids+1);
var val=str.substring(ids+1,_700);
var name=_strip(str.substring(0,eq));
all[name]=_entity(val);
str=str.substring(_700+1,str.length);
}
return "";
}
function _prolog(str){
var A=new Array();
A=str.split("\r\n");
str=A.join("\n");
A=str.split("\r");
str=A.join("\n");
var _705=str.indexOf("<");
if(str.substring(_705,_705+3)=="<?x"||str.substring(_705,_705+3)=="<?X"){
var _706=str.indexOf("?>");
str=str.substring(_706+2,str.length);
}
var _705=str.indexOf("<!DOCTYPE");
if(_705!=-1){
var _706=str.indexOf(">",_705)+1;
var dp=str.indexOf("[",_705);
if(dp<_706&&dp!=-1){
_706=str.indexOf("]>",_705)+2;
}
str=str.substring(_706,str.length);
}
return str;
}
function _strip(str){
var A=new Array();
A=str.split("\n");
str=A.join("");
A=str.split(" ");
str=A.join("");
A=str.split("\t");
str=A.join("");
return str;
}
function _normalize(str){
var A=new Array();
A=str.split("\n");
str=A.join(" ");
A=str.split("\t");
str=A.join(" ");
return str;
}
function _entity(str){
var A=new Array();
A=str.split("&lt;");
str=A.join("<");
A=str.split("&gt;");
str=A.join(">");
A=str.split("&quot;");
str=A.join("\"");
A=str.split("&apos;");
str=A.join("'");
A=str.split("&amp;");
str=A.join("&");
return str;
}
var TrailerHandler=Class.create();
TrailerHandler.prototype={initialize:function(_70e,_70f,_710,_711,_712,_713,_714,_715,_716){
this.channel=_715;
this.movieTrailerPlayer=_70e;
this.specificMovie=_714;
this.titleSpan=_70f;
this.clipsEl=_710;
this.navigationEl=_711;
this.titleId=_713;
this.listTitleId=_713;
if(_714){
if(this.channel!="/games"){
new DivReplaceHandler(this.channel+"/catalog/movie/movieTrailers/"+_713+"/"+true,_712,null,this.processInitializeTitles.bind(this)).execute();
}else{
new DivReplaceHandler(this.channel+"/catalog/game/movieTrailers/"+_713+"/"+true,_712,null,this.processInitializeTitles.bind(this)).execute();
}
}else{
if(_716){
new DivReplaceHandler(this.channel+"/catalog/movie/movieTrailers/"+_713+"/"+true,_712,null,this.processInitializeTitles.bind(this)).execute();
}
new DivReplaceHandler(this.channel+"/catalog/movie/browseTrailersTab",this.navigationEl,null,this.processBrowseTrailersTab.bind(this)).execute();
}
},nextTitle:function(_717){
var _718=this.findCurrentTitleEl();
if(_718!=null&&this.titlePosition!=(this.titlePlaylist.length-1)){
_718.className="clip";
}
this.titlePosition++;
if(this.titlePlaylist.length==this.titlePosition){
return;
}
var _719=this.findCurrentTitleEl();
_719.className="clip currentTitle";
var _71a=this.titlePlaylist[this.titlePosition].id;
new DivReplaceHandler(this.channel+"/catalog/movie/trailerBoxart/"+_71a,"boxartLayout",null,this.processNextTitleResponse.bind(this)).execute();
return false;
},findCurrentTitleEl:function(){
var _71b;
if(this.titlePosition==-1){
return null;
}
if(!this.specificMovie){
_71b="title_"+this.titlePlaylist[this.titlePosition].id;
}else{
_71b="title_"+this.titlePosition;
}
return $(_71b);
},nextClip:function(){
this.clipsPosition++;
if(this.clipsPlaylist.length==this.clipsPosition){
if(this.titlePlaylist.length>=0){
this.nextTitle();
}else{
this.clipsPosition--;
}
}else{
this.playCurrentClip();
$("clip_"+this.clipsPosition).previousSibling.className="clip";
$("clip_"+this.clipsPosition).className="clip currentClip";
}
},goToClip:function(_71c){
if($("clip_"+this.clipsPosition)!=null){
$("clip_"+this.clipsPosition).className="clip";
}
this.clipsPosition=_71c;
this.playCurrentClip();
},goToTitle:function(_71d){
if($("title_"+this.titlePosition)!=null){
$("title_"+this.titlePosition).className="clip";
}
this.titlePosition=_71d;
$("title_"+this.titlePosition).className="clip currentTitle";
var _71e=this.titlePlaylist[_71d].id;
new DivReplaceHandler(this.channel+"/catalog/movie/trailerBoxart/"+_71e,"boxartLayout",null,this.processNextTitleResponse.bind(this)).execute();
return false;
},goToListTitle:function(_71f){
if($("title_"+this.titlePosition)!=null){
$("title_"+this.titlePosition).className="clip";
}
this.titlePosition=_71f;
$("title_"+this.titlePosition).className="clip currentTitle";
this.listTitleId=_71f;
new DivReplaceHandler(this.channel+"/catalog/movie/trailerBoxart/"+this.listTitleId,"boxartLayout",null,this.processNextListTitleResponse.bind(this)).execute();
return false;
},browseTrailers:function(_720,_721,_722,_723){
this.resetTitlesStyles();
if($(_720).innerHTML==""){
this.arrowEl=_721;
this.menuName=_722;
if(_723){
new DivReplaceHandler(this.channel+"/catalog/movie/browseTrailerLists/"+_722,_720,null,this.processExpandMenuResponse.bind(this)).execute();
}else{
new DivReplaceHandler(this.channel+"/catalog/movie/browseTrailerTitles/"+_722,_720,null,this.processExpandSubMenuResponse.bind(this)).execute();
}
}else{
if($(_720).style.display=="none"){
$(_720).style.display="block";
$(this.arrowEl).className="listCollapse";
this.menuName=_722;
if(!_723){
new DivReplaceHandler(this.channel+"/catalog/movie/browseTrailerTitles/"+_722,_720,null,this.processExpandSubMenuResponse.bind(this)).execute();
}
}else{
$(_720).style.display="none";
$(_721).className="listExpand";
}
}
},browseTrailersTab:function(){
this.specificMovie=false;
new DivReplaceHandler(this.channel+"/catalog/movie/browseTrailersTab",this.navigationEl,null,this.processBrowseTrailersTab.bind(this)).execute();
},processInitializeTitles:function(_724){
this.titlePlaylist=_724.queuedTitles;
this.titlePosition=0;
if(this.channel!="/games"){
new DivReplaceHandler(this.channel+"/catalog/movie/trailerClips/"+this.titleId,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}else{
new DivReplaceHandler(this.channel+"/catalog/game/trailerClips/"+this.titleId,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}
},processInitializeClips:function(_725){
if(_725.movieTitle!=null&&_725.movieTitle!=""){
document.title=_725.movieTitle+" Trailer";
$("movieTrailerMainHeader").innerHTML=_725.movieTitle+" Trailer";
}
this.clipsPlaylist=_725.clips;
if($("initClipsPosition")!=null){
this.clipsPosition=$("initClipsPosition").innerHTML;
}else{
this.clipsPosition=0;
}
this.playCurrentClip();
},processNextTitleResponse:function(_726){
var _727=this.titlePlaylist[this.titlePosition].id;
if(this.channel!="/games"){
new DivReplaceHandler(this.channel+"/catalog/movie/trailerClips/"+_727,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}else{
new DivReplaceHandler(this.channel+"/catalog/game/trailerClips/"+_727,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}
},processNextListTitleResponse:function(_728){
if(this.channel!="/games"){
new DivReplaceHandler(this.channel+"/catalog/movie/trailerClips/"+this.listTitleId,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}else{
new DivReplaceHandler(this.channel+"/catalog/game/trailerClips/"+this.listTitleId,this.clipsEl,null,this.processInitializeClips.bind(this)).execute();
}
},processExpandMenuResponse:function(_729){
$(this.arrowEl).className="listCollapse";
},processExpandSubMenuResponse:function(_72a){
$(this.arrowEl).className="listCollapse";
var _72b=$("json_"+this.menuName).innerHTML;
this.titlePlaylist=eval("("+_72b+")");
this.titlePosition=-1;
this.nextTitle();
new DivReplaceHandler(this.channel+"/catalog/movie/trailerBoxart/"+this.titlePlaylist[0].id,"boxartLayout",null,this.processNextTitleResponse.bind(this)).execute();
},processBrowseTrailersTab:function(_72c){
$(this.clipsEl).innerHTML="";
},resetTitlesStyles:function(_72d){
var i=0;
if(this.titlePlaylist==null){
this.titlePlaylist=0;
}
for(i=0;i<this.titlePlaylist.length;i++){
titleEl="title_"+this.titlePlaylist[i].id;
titleLink=$(titleEl);
if(titleLink!=null){
titleLink.className="clip";
}
}
},playCurrentClip:function(){
var _72f=this.clipsPlaylist[this.clipsPosition].eclipId;
var _730=this.clipsPlaylist[this.clipsPosition].bitrateId;
$("clip_"+this.clipsPosition).className="clip currentClip";
this.findSWF(this.movieTrailerPlayer).playNextClip(_72f,_730);
},findSWF:function(_731){
if(navigator.appName.indexOf("Microsoft")!=-1){
return window[_731];
}else{
return document[_731];
}
}};
var InlineTrailerHandler=Class.create();
InlineTrailerHandler.prototype={initialize:function(_732,_733,_734,_735,_736,_737){
this.playerContainerEl=_733;
this.movieTrailerPlayer=_732;
this.titleId=_734;
this.showCallback=_735;
this.hideCallback=_736;
this.channel=_737;
var _738=new Ajax.Request("/app/jsp/catalog/snippet/layouts/snippets/inlineTrailer.jsp?titleId="+_734,{method:"get",requestTimeout:300,onComplete:this.processResponse.bind(this)});
},processResponse:function(_739){
this.showCallback();
$(this.playerContainerEl).innerHTML=_739.responseText;
if(this.channel!="/games"){
new BaseHandler().processAjaxRequest(this.channel+"/catalog/movie/movieTrailers/"+this.titleId+"/"+true,"",this.processInitializeTitles.bind(this),null);
}else{
new BaseHandler().processAjaxRequest(this.channel+"/catalog/game/movieTrailers/"+this.titleId+"/"+true,"",this.processInitializeTitles.bind(this),null);
}
},processInitializeTitles:function(_73a){
this.titlePlaylist=_73a.queuedTitles;
this.titlePosition=0;
if(this.channel!="/games"){
new BaseHandler().processAjaxRequest(this.channel+"/catalog/movie/trailerClips/"+this.titleId,"",this.processInitializeClips.bind(this),null);
}else{
new BaseHandler().processAjaxRequest(this.channel+"/games/catalog/game/trailerClips/"+this.titleId,"",this.processInitializeClips.bind(this),null);
}
},processInitializeClips:function(_73b){
this.clipsPlaylist=_73b.clips;
this.clipsPosition=0;
this.playCurrentClip();
},playCurrentClip:function(){
var _73c=this.clipsPlaylist[this.clipsPosition].eclipId;
var _73d=this.clipsPlaylist[this.clipsPosition].bitrateId;
playNextClip(this.movieTrailerPlayer,_73c,_73d);
},hideTrailerPlayer:function(){
this.hideCallback();
},nextClip:function(){
this.clipsPosition++;
if(this.clipsPlaylist.length==this.clipsPosition){
this.hideTrailerPlayer();
}else{
this.playCurrentClip();
}
}};
function playNextClip(_73e,_73f,_740){
var swf;
if(navigator.appName.indexOf("Microsoft")!=-1){
swf=window[_73e];
}else{
swf=document[_73e];
}
if(swf.playNextClip==null){
setTimeout(function(){
playNextClip(_73e,_73f,_740);
},20);
}else{
swf.playNextClip(_73f,_740);
}
}
var BrowseTrailerUtil=Class.create();
BrowseTrailerUtil={selectCategory:function(_742){
categoryEl=$(_742);
if(categoryEl.style.display=="none"){
categoryEl.style.display="";
}else{
categoryEl.style.display="none";
}
}};
function autoFill(id,_744){
document.getElementById(_744).innerHTML=document.getElementById(id).value;
}
function limitText(id,_746,_747){
onKeyDown(_747);
if(document.getElementById(id).value.length>_746){
document.getElementById(id).value=document.getElementById(id).value.substring(0,_746);
}
onKeyDown(_747);
}
function onChangeGiftType(id,path){
var _74a=document.getElementById(id);
document.getElementById("giftName").innerHTML=_74a.options[_74a.selectedIndex].text;
document.getElementById("img1").src=path+document.getElementById(id).value.toLowerCase()+".jpg";
}
function onChangeType(_74b,_74c,id,_74e){
if(document.getElementById(_74b).checked==true){
document.getElementById(_74e).readOnly=false;
document.getElementById(id).style.display="none";
}
if(document.getElementById(_74c).checked==true){
document.getElementById(_74e).readOnly=true;
document.getElementById(id).style.display="block";
}
}
function selectDefaultPlan(id){
var _750=document.getElementsByName("selectedPlanId");
for(var i=0;i<_750.length;i++){
if(_750[i].value==document.getElementById(id).value){
_750[i].checked=true;
}
}
}
function checkForSuspendOption(_752,_753,_754,_755){
var _756=document.getElementsByName(_752);
var _757=document.getElementsByName(_753);
var _758=new Array();
var _759=0;
var _75a="";
for(var i=0;i<_756.length;i++){
if(_756[i].checked==true){
_758[_759]=_756[i];
_759=_759+1;
}
}
if(_758.length==1){
for(var j=0;j<_757.length;j++){
if(_758[0].value==_757[j].value){
_75a=_758[0].value;
}
}
}
if(_75a!=""){
Overlay=new popupUrlHandler("/acctmgmt/suspendSubscriptionOption?suspendReasonCode="+_75a+"&actionPath="+_754+"&cancelPage="+_755,"boxPopup","",null);
Overlay.execute();
return false;
}
return true;
}
function showOverlay(id1,id2,id3,id4,id5){
var _762=document.getElementsByName(id2);
for(var i=0;i<_762.length;i++){
if(_762[i].checked==true){
var _764=_762[i].value;
}
}
if(_764==undefined){
_764="";
}
var _765=document.getElementById(id1).value;
var _766=_765.replace(/\n/g,"m1b2k3");
var _767=document.getElementById(id3).value;
var _768=document.getElementById(id4).value;
var _769=document.getElementById(id5).value;
Overlay=new popupUrlHandler("/giftsubscription/buy/previewEcard?message="+_766+"&greeting="+_767+"&plan="+_764+"&toName="+_768+"&fromName="+_769,"boxPopup","",null);
Overlay.execute();
}
function onKeyDown(_76a){
if(_76a.ctrlKey){
_76a.returnValue=false;
var _76b=String.fromCharCode(_76a.keyCode).toLowerCase();
if(_76b=="c"||_76b=="v"){
_76a.returnValue=false;
return false;
}
}
}
function showThankYouOverlay(id){
var _76d=document.getElementById(id).value;
var _76e=_76d.replace(/\n/g,"m1b2k3");
Overlay=new popupUrlHandler("/giftsubscription/redeem/previewThankYouECard?message="+_76e,"boxPopup","",null);
Overlay.execute();
}
function showOutstandingDVDOverlay(url){
Overlay=new popupUrlHandler(url,"boxPopup","",null);
Overlay.execute();
}
function showDeletePaymentOverlay(url){
Overlay=new popupUrlHandler(url,"boxPopup","",null);
Overlay.execute();
}
function showDigitalCopyOverLay(url){
Overlay=new popupUrlHandler(url,"boxPopup","",null);
Overlay.execute();
}
function showHideRateCard(){
showDiv("planLimited");
showDiv("additionalplans");
showDiv("btaCap3");
showDiv("btaCap2");
showDiv("btaCap1");
showDiv("threePlanView");
showDiv("belowRateCardExpanded");
showDiv("rateCardMail3");
showDiv("rateCardMail2");
showDiv("rateCardMail1");
showDiv("helpBTAM");
hideDiv("plans");
hideDiv("signupMbox");
hideDiv("twoPlanView");
hideDiv("belowRateCardDefault");
document.getElementById("rateCardBTA3").style.width="160px";
document.getElementById("rateCardBTA2").style.width="160px";
document.getElementById("rateCardBTA1").style.width="160px";
document.getElementById("rateCardBTALimited12").style.width="160px";
document.getElementById("signupContent").style.width="729px";
document.getElementById("signupContent").style.margin="0px";
document.getElementById("headerImg").style.width="483px";
document.getElementById("plansPromo").style.width="594px";
if(document.getElementById("rpFlowDescription")!=null){
document.getElementById("rpFlowDescription").style.width="45.9%";
document.getElementById("rpFlow").style.width="53.9%";
document.getElementById("rpFlowText").style.width="200px";
}
document.signupModel.showExpandedView.value="true";
}
function showSelectedDiv(_772){
var _773=findSelectedValue(_772.paymentMethod);
if(_773==""){
return;
}
if(_773=="155"){
enableBillingFields();
enableAddressFields();
hideDiv("paymentMethodCC");
showDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckBusiness");
showDiv("paymentMethodCheckPersonal");
hideDiv("businessCheckPhone");
showDiv("personalCheckPhone");
}else{
if(_773=="156"){
hideDiv("paymentMethodCC");
showDiv("paymentMethodCheck");
showDiv("paymentMethodCheckBusiness");
hideDiv("paymentMethodCheckPersonal");
showDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
disableBillingFields();
}else{
enableAddressFields();
showDiv("paymentMethodCC");
hideDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckBusiness");
hideDiv("paymentMethodCheckPersonal");
hideDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
}
}
}
function disableBillingFields(){
document.getElementById("checkAccount.firstName").readOnly=true;
document.getElementById("checkAccount.lastName").readOnly=true;
document.getElementById("checkAccount.routingNumber").readOnly=true;
document.getElementById("checkAccount.clearTextAccountNumber").readOnly=true;
document.getElementById("checkAccount.companyName").readOnly=true;
document.getElementById("checkAccount.phoneAreaCode").readOnly=true;
document.getElementById("checkAccount.phoneNumberPreffix").readOnly=true;
document.getElementById("checkAccount.phoneNumberSuffix").readOnly=true;
document.getElementById("billingAddress.addressLine1").readOnly=true;
document.getElementById("billingAddress.addressLine2").readOnly=true;
document.getElementById("billingAddress.city").readOnly=true;
document.getElementById("billingAddress.stateCode").disabled=true;
document.getElementById("billingAddress.zipCode").readOnly=true;
document.getElementById("billingPhoneNumber.areaCode").readOnly=true;
document.getElementById("billingPhoneNumber.prefix").readOnly=true;
document.getElementById("billingPhoneNumber.suffix").readOnly=true;
}
function enableAddressFields(){
if(document.getElementById("billingAddress.addressLine1").value!=""){
document.getElementById("billingAddress.addressLine1").readOnly=false;
document.getElementById("billingAddress.addressLine2").readOnly=false;
document.getElementById("billingAddress.city").readOnly=false;
document.getElementById("billingAddress.stateCode").disabled=false;
document.getElementById("billingAddress.zipCode").readOnly=false;
document.getElementById("billingPhoneNumber.areaCode").readOnly=false;
document.getElementById("billingPhoneNumber.prefix").readOnly=false;
document.getElementById("billingPhoneNumber.suffix").readOnly=false;
}
}
function enableBillingFields(){
document.getElementById("checkAccount.firstName").readOnly=false;
document.getElementById("checkAccount.lastName").readOnly=false;
document.getElementById("checkAccount.routingNumber").readOnly=false;
document.getElementById("checkAccount.clearTextAccountNumber").readOnly=false;
document.getElementById("checkAccount.phoneAreaCode").readOnly=false;
document.getElementById("checkAccount.phoneNumberPreffix").readOnly=false;
document.getElementById("checkAccount.phoneNumberSuffix").readOnly=false;
}
function fnShowMap(_774){
var _775=null;
if(_775!=null){
_775.close();
_775=null;
}
var URL="/stores/storelocator/storeDetailMap?locationId="+_774;
_775=window.open(URL,"openWin","width=675,height=350,scrollbars=no,topmargin=0,leftmargin=0");
}
function onMouseDown(_777){
if(_777.button==2||_777.button==3){
if(document.getElementById("accountInfo.confirmEmail")){
disableContextMenu(document.getElementById("accountInfo.confirmEmail"));
}
if(document.getElementById("accountInfo.verifyPassword")){
disableContextMenu(document.getElementById("accountInfo.verifyPassword"));
}
if(document.getElementById("registrationRequest.confirmEmail")){
disableContextMenu(document.getElementById("registrationRequest.confirmEmail"));
}
if(document.getElementById("registrationRequest.verifyPassword")){
disableContextMenu(document.getElementById("registrationRequest.verifyPassword"));
}
if(document.getElementById("giftSubscriptionInfo.confirmRecipientEmailAddress")){
disableContextMenu(document.getElementById("giftSubscriptionInfo.confirmRecipientEmailAddress"));
}
if(document.getElementById("giftSubscriptionInfo.recipientName")){
disableContextMenu(document.getElementById("giftSubscriptionInfo.recipientName"));
}
if(document.getElementById("giftSubscriptionInfo.purchaserName")){
disableContextMenu(document.getElementById("giftSubscriptionInfo.purchaserName"));
}
if(document.getElementById("giftSubscriptionInfo.greetingMessage")){
disableContextMenu(document.getElementById("giftSubscriptionInfo.greetingMessage"));
}
}
}
function onKeyDown(_778){
if(_778.ctrlKey){
_778.returnValue=false;
var _779=String.fromCharCode(_778.keyCode).toLowerCase();
if(_779=="c"||_779=="v"){
_778.returnValue=false;
return false;
}
}
}
function disablePassword(_77a){
passwordObj=document.getElementById("accountInfo.password");
verfPasswordObj=document.getElementById("accountInfo.verifyPassword");
emailObj=document.getElementById("accountInfo.email");
confirmEmailObj=document.getElementById("accountInfo.confirmEmail");
if(_77a=="true"){
passwordObj.disabled=false;
verfPasswordObj.disabled=false;
emailObj.readOnly=false;
confirmEmailObj.readOnly=false;
}else{
passwordObj.disabled=true;
verfPasswordObj.disabled=true;
emailObj.readOnly=true;
confirmEmailObj.readOnly=true;
}
}
function submitForm(path){
document.cancelSubscriptionModel.suspendDeclined.value="true";
document.cancelSubscriptionModel.suspendEligible.value="false";
document.cancelSubscriptionModel.action=document.getElementById(path).value;
document.cancelSubscriptionModel.submit();
}
function marquee(_77c,_77d,_77e,_77f){
if(document.location.pathname=="/"||document.location.pathname=="/home"){
var tab;
if(document.getElementById("tabPanel4").getElementsByTagName("div")!=null&&document.getElementById("tabPanel4").getElementsByTagName("div").length>0){
tab="Tab4";
}else{
if(document.getElementById("tabPanel3").getElementsByTagName("div")!=null&&document.getElementById("tabPanel3").getElementsByTagName("div").length>0){
tab="Tab3";
}else{
if(document.getElementById("tabPanel2").getElementsByTagName("div")!=null&&document.getElementById("tabPanel2").getElementsByTagName("div").length>0){
tab="Tab2";
}else{
if(document.getElementById("tabPanel1").getElementsByTagName("div")!=null&&document.getElementById("tabPanel1").getElementsByTagName("div").length>0){
tab="Tab1";
}
}
}
}
}
var _781=document.getElementById(_77c+"MarqueeBox");
var _782=document.getElementById(_77c+"Marquee");
var _783=(_781.style.left==null||_781.style.left=="")?"0px":_781.style.left;
var _784=0;
if(_781.getElementsByTagName("mt").length>0){
_784=_781.getElementsByTagName("mt").length;
}else{
if(_781.getElementsByTagName("mpkg").length>0){
_784=_781.getElementsByTagName("mpkg").length;
}else{
if(_781.getElementsByTagName("mpr").length>0){
_784=_781.getElementsByTagName("mpr").length;
}else{
if(_781.getElementsByTagName("mkt").length>0){
_784=_781.getElementsByTagName("mkt").length/2;
}
}
}
}
if(!_782.innerHTML||_782.innerHTML==="&nbsp;"||_782.innerHTML===" "){
_782.innerHTML=0;
}
var _785=(_784/_77e)*_77f;
var _786=Math.abs(_785)<=(Math.abs(_782.innerHTML)+_77f);
if(_77d=="left"&&_782.innerHTML>=0){
return false;
}else{
if(_77d=="right"&&_786==true){
return false;
}
}
if(_77d=="right"){
_782.innerHTML=parseInt(_782.innerHTML)-_77f;
}else{
_782.innerHTML=parseInt(_782.innerHTML)+_77f;
}
if(_782.innerHTML==0){
Element.addClassName(_77c+"LeftButton","leftDisable");
}else{
Element.removeClassName(_77c+"LeftButton","leftDisable");
new Effect.Move($(_77c+"MarqueeBox"),{x:_782.innerHTML,mode:"absolute",delay:0.5});
}
if(Math.abs(_785)<=(Math.abs(_782.innerHTML)+_77f)){
Element.addClassName(_77c+"RightButton","rightDisable");
}else{
Element.removeClassName(_77c+"RightButton","rightDisable");
new Effect.Move($(_77c+"MarqueeBox"),{x:_782.innerHTML,mode:"absolute",delay:0.5});
}
}
function scroller(_787,_788,_789){
if(window.position==undefined){
position=0;
}
if(_787=="right"){
position=position+4;
if(position>(_788-4)){
position=_788-4;
}
}else{
position=position-4;
if(position<0){
position=0;
}
}
if(position==_788-4){
Element.addClassName("scrollerRightButton","disable");
}else{
Element.removeClassName("scrollerRightButton","disable");
}
if(position==0){
Element.addClassName("scrollerLeftButton","disable");
}else{
Element.removeClassName("scrollerLeftButton","disable");
}
new Effect.Move($("scroller"),{x:-position*_789,mode:"absolute",delay:0.5});
}
function chkLength(evt,len){
var str=document.getElementById("textMessage");
if(str.value.length<len){
document.getElementById("ecardLimit").style.display="none";
showOverlay("textMessage","selectedPlanId","greetingType","recipientFirstName","recipientLastName");
}else{
document.getElementById("ecardLimit").style.display="block";
document.getElementById("textMessage").focus();
}
}
function outLinks(){
var _78d;
if(document.getElementsByClassName("nom")){
for(var i=0;(_78d=document.getElementsByClassName("nom")[i]);i++){
_78d.setAttribute("href","#");
_78d.onclick=new Function("return false;");
}
}
if(document.getElementsByClassName("title")){
for(var i=0;(_78d=document.getElementsByClassName("title")[i]);i++){
_78d.setAttribute("href","#");
_78d.onclick=new Function("return false;");
}
}
}
function showDivEffect(div){
if($(div).style.display=="none"){
Effect.BlindDown(div);
}else{
Effect.BlindUp(div);
}
}
function setCookie(_790,_791,_792){
var _793=new Date();
_793.setTime(_793.getTime()+(_792*24*3600*1000));
document.cookie=_790+"="+escape(_791)+((_792==null)?"":"; expires="+_793);
}
function delCookie(_794){
if(getCookie(_794)){
document.cookie=_794+"="+"; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
}
function getCookie(_795){
if(document.cookie.length>0){
begin=document.cookie.indexOf(_795+"=");
if(begin!=-1){
begin+=_795.length+1;
end=document.cookie.indexOf(";",begin);
if(end==-1){
end=document.cookie.length;
}
return unescape(document.cookie.substring(begin,end));
}
}
return null;
}
function openSection(el,_797){
setCookie(_797+"Cookie","open","1");
Element.addClassName(el,_797+"Display");
}
function closeSection(el,_799){
setCookie(_799+"Cookie","close","1");
Element.removeClassName(el,_799+"Display");
}
function showDiv(div){
document.getElementById(div).style.display="block";
}
function hideDiv(div){
document.getElementById(div).style.display="none";
}
function findSelectedValue(_79c){
for(var i=0;i<_79c.length;i++){
if(_79c[i].selected){
return _79c[i].value;
}
}
return -1;
}
function selectDefaultPlan(_79e){
try{
var _79f;
if(_79e==""){
_79f=document.getElementsByTagName("input");
}else{
rootDiv=document.getElementById(_79e);
if(rootDiv!=null){
_79f=rootDiv.getElementsByTagName("input");
var _7a0=document.getElementsByTagName("input");
for(var i=0;i<_7a0.length;i++){
var _7a2=_7a0[i];
if(_7a2.type=="radio"&&_7a2.name=="selectedPlanId"&&_7a2.checked==true){
planSelected=_7a2.value;
break;
}
}
}else{
_79f=document.getElementsByTagName("input");
}
}
for(var i=0;i<_79f.length;i++){
var _7a2=_79f[i];
if(_7a2.type=="radio"&&_7a2.name=="selectedPlanId"&&_7a2.value==planSelected){
_7a2.checked=true;
_7a2.setAttribute("checked",true);
break;
}
}
}
catch(e){
}
}
function submitOnce(form){
var _7a4=form.getAttribute("alreadySubmitted")?true:false;
if(_7a4){
return false;
}else{
form.setAttribute("alreadySubmitted",true);
return true;
}
}
function disableContextMenu(_7a5){
_7a5.oncontextmenu=function(){
return false;
};
}
function anchorAt(_7a6){
window.location.hash=_7a6;
return false;
}
function countText(_7a7,_7a8,_7a9){
this.textarea=$(_7a7);
if(this.textarea.value.length>_7a9){
this.textarea.value=this.textarea.value.substring(0,_7a9);
}else{
$(_7a8).innerHTML=(_7a9-(this.textarea.value.length));
}
}
function goToUrlOnChange(el,url){
var idx=el.selectedIndex;
var _7ad=el.options[idx].value;
url+="?viewType="+_7ad;
if(url!=null){
window.location.href=url;
}
}
function createCookie(){
var a=document.URL;
var _7af="BB_URL_PATH_COOKIE="+a+"; path=/";
document.cookie=_7af;
}
function changePaymentInformation(_7b0){
if(_7b0=="true"){
showDiv("continuePayPal");
hideDiv("startSubscription");
}else{
showDiv("startSubscription");
hideDiv("continuePayPal");
}
}
function continueWithPayPal(_7b1,_7b2){
if(_7b2){
_7b1.paymentMethod.value="157";
}else{
_7b1.paymentMethod.value="";
}
}
function showPayPalOptions(){
hideDiv("paymentType");
hideDiv("error");
hideDiv("paymentMethodCC");
hideDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckPersonal");
hideDiv("paymentMethodCheckBusiness");
hideDiv("billingAddress");
hideDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
showDiv("paypal");
hideDiv("creditCard");
showDiv("error");
}
function showSelectedOptions(_7b3){
if(_7b3=="155"){
enableBillingFields();
enableAddressFields();
showDiv("paymentType");
hideDiv("paymentMethodCC");
showDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckBusiness");
showDiv("paymentMethodCheckPersonal");
hideDiv("businessCheckPhone");
showDiv("personalCheckPhone");
showDiv("billingAddress");
hideDiv("paypal");
showDiv("auth");
}else{
if(_7b3=="156"){
showDiv("paymentType");
hideDiv("paymentMethodCC");
showDiv("paymentMethodCheck");
showDiv("paymentMethodCheckBusiness");
hideDiv("paymentMethodCheckPersonal");
showDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
disableBillingFields();
showDiv("billingAddress");
hideDiv("paypal");
showDiv("auth");
}else{
if(_7b3=="157"){
hideDiv("paymentType");
hideDiv("paymentMethodCC");
hideDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckPersonal");
hideDiv("paymentMethodCheckBusiness");
hideDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
hideDiv("billingAddress");
showDiv("paypal");
hideDiv("auth");
}else{
enableAddressFields();
enableBillingFields();
showDiv("paymentType");
showDiv("paymentMethodCC");
hideDiv("paymentMethodCheck");
hideDiv("paymentMethodCheckBusiness");
hideDiv("paymentMethodCheckPersonal");
hideDiv("businessCheckPhone");
hideDiv("personalCheckPhone");
showDiv("billingAddress");
hideDiv("paypal");
showDiv("auth");
}
}
}
}
function showSubNewPayment(_7b4){
document.getElementById("errorBundleSection").style.display="block";
if(_7b4!="newDigitalWallet"){
document.getElementById("billing"+_7b4).style.display="none";
document.getElementById("editBilling"+_7b4).style.display="none";
}
document.getElementById("paymentEditSection"+_7b4).style.display="block";
document.getElementById("billingEditSection"+_7b4).style.display="block";
}
function hideSubNewPayment(_7b5){
document.getElementById("errorBundleSection").style.display="none";
if(_7b5!=null){
document.getElementById("paymentEditSection"+_7b5).style.display="none";
document.getElementById("billingEditSection"+_7b5).style.display="none";
}
}
function showNewPayment(_7b6,_7b7){
if(document.getElementById("selectedPayment").value=="NEW"){
document.getElementById("errorBundleSection").style.display="block";
}else{
document.getElementById("errorBundleSection").style.display="none";
}
if(_7b6=="newDigitalWallet"){
document.getElementById("paymentEditSection"+_7b6).style.display="block";
document.getElementById("billingEditSection"+_7b6).style.display="block";
var ca=_7b7;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
document.getElementById("editLink"+c).style.display="none";
document.getElementById("nonEditLink"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
}
}
}
renameControls("NEW",_7b7);
}
function hideNewPayment(_7bb,_7bc){
document.getElementById("errorBundleSection").style.display="none";
document.getElementById("selectedWalletId").value=null;
if(_7bb!=null){
var ca=_7bc;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
if(c==_7bb){
document.getElementById("editLink"+c).style.display="block";
document.getElementById("nonEditLink"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("paymentEditSectionnewDigitalWallet").style.display="none";
document.getElementById("billingEditSectionnewDigitalWallet").style.display="none";
}else{
document.getElementById("editLink"+c).style.display="none";
document.getElementById("nonEditLink"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSectionnewDigitalWallet").style.display="none";
document.getElementById("billingEditSectionnewDigitalWallet").style.display="none";
}
}
}
}
renameControls(_7bb,_7bc);
}
function checkDigitalWallet(_7c0){
var _7c1=document.getElementsByName("defaultWallet");
var c=0;
if(_7c1!=null&&_7c1.length!=null){
for(var i=0;i<_7c1.length;i++){
if(_7c1[i].checked){
c=_7c1[i].value;
break;
}
}
if(c!="NEW"){
checkedWalletId=c.substring(14);
removeOtherWalletOptions(checkedWalletId,_7c0);
}else{
removeOtherWalletOptions(c,_7c0);
}
}
}
function removeOtherWalletOptions(_7c4,_7c5){
var _7c6=_7c5;
var _7c7=0;
var _7c8=0;
if(_7c4!="NEW"){
_7c8=document.getElementById("paymentEditSectionnewDigitalWallet");
_7c8.parentNode.removeChild(_7c8);
_7c8=document.getElementById("billingEditSectionnewDigitalWallet");
_7c8.parentNode.removeChild(_7c8);
}
if(_7c6!=null&&_7c6.length!=null){
for(var i=0;i<_7c6.length;i++){
if(_7c4!=_7c6[i]){
_7c8=document.getElementById("paymentEditSection"+_7c6[i]);
_7c8.parentNode.removeChild(_7c8);
_7c8=document.getElementById("billingEditSection"+_7c6[i]);
_7c8.parentNode.removeChild(_7c8);
}
}
}
}
function showEditPayment(_7ca,_7cb){
document.getElementById("deviceRegistrationModel").reset();
if(document.getElementById("selectedPayment").value=="NOSUBSCRIPTION"+_7ca){
document.getElementById("errorBundleSection").style.display="block";
}else{
document.getElementById("errorBundleSection").style.display="none";
}
document.getElementById("selectedWalletId").value=_7ca;
Wallets=document.getElementsByName("defaultWallet");
for(i=0;i<Wallets.length;i++){
if(Wallets[i].value=="NOSUBSCRIPTION"+_7ca){
Wallets[i].checked=true;
}
}
if(_7ca!=null){
var ca=_7cb;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
if(c==_7ca){
document.getElementById("prepopulation"+c).style.display="none";
document.getElementById("paymentEditSection"+c).style.display="block";
document.getElementById("billingEditSection"+c).style.display="block";
}else{
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
}
}
}
}
}
function enableDefaultEdit(){
var c=document.getElementById("defaultPayment").value;
document.getElementById("editLink"+c).style.display="block";
document.getElementById("nonEditLink"+c).style.display="none";
}
function showAfterValidationErrors(_7d0){
document.getElementById("errorBundleSection").style.display="block";
var _7d1=document.getElementsByName("defaultWallet");
if(_7d1!=null&&_7d1.length!=null){
for(var i=0;i<_7d1.length;i++){
if(_7d1[i].checked){
c=_7d1[i].value;
if(c!="NEW"){
walletId=c.substring(14);
document.getElementById("selectedWalletId").value=walletId;
renameControls(walletId,_7d0);
document.getElementById("prepopulation"+walletId).style.display="none";
document.getElementById("paymentEditSection"+walletId).style.display="block";
document.getElementById("billingEditSection"+walletId).style.display="block";
}else{
if(c=="NEW"){
showNewPayment("newDigitalWallet",_7d0);
}
}
}else{
c=_7d1[i].value;
if(c!="NEW"){
walletId=c.substring(14);
document.getElementById("editLink"+walletId).style.display="none";
document.getElementById("nonEditLink"+walletId).style.display="block";
}
}
}
}
}
function renameControls(_7d3,_7d4){
var ca=_7d4;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
document.getElementById("paymentMethod_"+c).name="paymentMethod1";
document.getElementById("creditCard.firstName_"+c).name="creditCard.firstName1";
document.getElementById("creditCard.lastName_"+c).name="creditCard.lastName1";
document.getElementById("creditCardAccountNumber_"+c).name="creditCardAccountNumber1";
document.getElementById("creditCard.expirationMonth_"+c).name="creditCard.expirationMonth1";
document.getElementById("creditCard.expirationYear_"+c).name="creditCard.expirationYear1";
document.getElementById("creditCard.cid_"+c).name="creditCard.cid1";
document.getElementById("billingAddress.addressLine1_"+c).name="billingAddress.addressLine11";
document.getElementById("billingAddress.addressLine2_"+c).name="billingAddress.addressLine21";
document.getElementById("billingAddress.city_"+c).name="billingAddress.city1";
document.getElementById("billingAddress.stateCode_"+c).name="billingAddress.stateCode1";
document.getElementById("billingAddress.zipCode_"+c).name="billingAddress.zipCode1";
document.getElementById("billingPhoneNumber.areaCode_"+c).name="billingPhoneNumber.areaCode1";
document.getElementById("billingPhoneNumber.prefix_"+c).name="billingPhoneNumber.prefix1";
document.getElementById("billingPhoneNumber.suffix_"+c).name="billingPhoneNumber.suffix1";
if(c!=_7d3){
document.getElementById("paymentMethod_"+c).className=document.getElementById("paymentMethod_"+c).className.replace("error","");
document.getElementById("creditCard.firstName_"+c).className=document.getElementById("creditCard.firstName_"+c).className.replace("error","");
document.getElementById("creditCard.lastName_"+c).className=document.getElementById("creditCard.lastName_"+c).className.replace("error","");
document.getElementById("creditCardAccountNumber_"+c).className=document.getElementById("creditCardAccountNumber_"+c).className.replace("error","");
document.getElementById("creditCard.expirationMonth_"+c).className=document.getElementById("creditCard.expirationMonth_"+c).className.replace("error","");
document.getElementById("creditCard.expirationYear_"+c).className=document.getElementById("creditCard.expirationYear_"+c).className.replace("error","");
document.getElementById("creditCard.cid_"+c).className=document.getElementById("creditCard.cid_"+c).className.replace("error","");
document.getElementById("billingAddress.addressLine1_"+c).className=document.getElementById("billingAddress.addressLine1_"+c).className.replace("error","");
document.getElementById("billingAddress.city_"+c).className=document.getElementById("billingAddress.city_"+c).className.replace("error","");
document.getElementById("billingAddress.stateCode_"+c).className=document.getElementById("billingAddress.stateCode_"+c).className.replace("error","");
document.getElementById("billingAddress.zipCode_"+c).className=document.getElementById("billingAddress.zipCode_"+c).className.replace("error","");
}
}
}
document.getElementById("paymentMethod_NEW").name="paymentMethod1";
document.getElementById("creditCard.firstName_NEW").name="creditCard.firstName1";
document.getElementById("creditCard.lastName_NEW").name="creditCard.lastName1";
document.getElementById("creditCardAccountNumber_NEW").name="creditCardAccountNumber1";
document.getElementById("creditCard.expirationMonth_NEW").name="creditCard.expirationMonth1";
document.getElementById("creditCard.expirationYear_NEW").name="creditCard.expirationYear1";
document.getElementById("creditCard.cid_NEW").name="creditCard.cid1";
document.getElementById("billingAddress.addressLine1_NEW").name="billingAddress.addressLine11";
document.getElementById("billingAddress.addressLine2_NEW").name="billingAddress.addressLine21";
document.getElementById("billingAddress.city_NEW").name="billingAddress.city1";
document.getElementById("billingAddress.stateCode_NEW").name="billingAddress.stateCode1";
document.getElementById("billingAddress.zipCode_NEW").name="billingAddress.zipCode1";
document.getElementById("billingPhoneNumber.areaCode_NEW").name="billingPhoneNumber.areaCode1";
document.getElementById("billingPhoneNumber.prefix_NEW").name="billingPhoneNumber.prefix1";
document.getElementById("billingPhoneNumber.suffix_NEW").name="billingPhoneNumber.suffix1";
if(_7d3!="NEW"){
document.getElementById("paymentMethod_NEW").className=document.getElementById("paymentMethod_NEW").className.replace("error","");
document.getElementById("creditCard.firstName_NEW").className=document.getElementById("creditCard.firstName_NEW").className.replace("error","");
document.getElementById("creditCard.lastName_NEW").className=document.getElementById("creditCard.lastName_NEW").className.replace("error","");
document.getElementById("creditCardAccountNumber_NEW").className=document.getElementById("creditCardAccountNumber_NEW").className.replace("error","");
document.getElementById("creditCard.expirationMonth_NEW").className=document.getElementById("creditCard.expirationMonth_NEW").className.replace("error","");
document.getElementById("creditCard.expirationYear_NEW").className=document.getElementById("creditCard.expirationYear_NEW").className.replace("error","");
document.getElementById("creditCard.cid_NEW").className=document.getElementById("creditCard.cid_NEW").className.replace("error","");
document.getElementById("billingAddress.addressLine1_NEW").className=document.getElementById("billingAddress.addressLine1_NEW").className.replace("error","");
document.getElementById("billingAddress.city_NEW").className=document.getElementById("billingAddress.city_NEW").className.replace("error","");
document.getElementById("billingAddress.stateCode_NEW").className=document.getElementById("billingAddress.stateCode_NEW").className.replace("error","");
document.getElementById("billingAddress.zipCode_NEW").className=document.getElementById("billingAddress.zipCode_NEW").className.replace("error","");
}
document.getElementById("paymentMethod_"+_7d3).name="paymentMethod";
document.getElementById("creditCard.firstName_"+_7d3).name="creditCard.firstName";
document.getElementById("creditCard.lastName_"+_7d3).name="creditCard.lastName";
document.getElementById("creditCardAccountNumber_"+_7d3).name="creditCardAccountNumber";
document.getElementById("creditCard.expirationMonth_"+_7d3).name="creditCard.expirationMonth";
document.getElementById("creditCard.expirationYear_"+_7d3).name="creditCard.expirationYear";
document.getElementById("creditCard.cid_"+_7d3).name="creditCard.cid";
document.getElementById("billingAddress.addressLine1_"+_7d3).name="billingAddress.addressLine1";
document.getElementById("billingAddress.addressLine2_"+_7d3).name="billingAddress.addressLine2";
document.getElementById("billingAddress.city_"+_7d3).name="billingAddress.city";
document.getElementById("billingAddress.stateCode_"+_7d3).name="billingAddress.stateCode";
document.getElementById("billingAddress.zipCode_"+_7d3).name="billingAddress.zipCode";
document.getElementById("billingPhoneNumber.areaCode_"+_7d3).name="billingPhoneNumber.areaCode";
document.getElementById("billingPhoneNumber.prefix_"+_7d3).name="billingPhoneNumber.prefix";
document.getElementById("billingPhoneNumber.suffix_"+_7d3).name="billingPhoneNumber.suffix";
}
function fn_checkPurchasedFrom(){
var _7d7=document.getElementById("placeofPurchase").value;
if(_7d7!="undefined"&&_7d7=="-1"){
document.getElementById("textRetailer").style.display="inline";
}else{
document.getElementById("textRetailer").style.display="none";
}
}
var PageRefresh=Class.create();
PageRefresh.prototype={initialize:function(el,_7d9){
this.el=$(el);
this.success=false;
this.deviceId=null;
this.timerID=null;
this.timerRunning=false;
this.delay=_7d9;
this.url=null;
return this;
},getActivationStatus:function(url,_7db){
this.url=url;
this.deviceId=_7db;
this.url=this.url+this.deviceId;
this.stopTheClock();
this.startTheTimer();
},stopTheClock:function(){
if(this.timerRunning){
window.clearTimeout(this.timerID);
}
this.timerRunning=false;
},startTheTimer:function(){
var obj=this;
if(this.success==true){
this.stopTheClock();
}else{
new BaseHandler().processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
this.timerRunning=true;
this.timerID=window.setTimeout(function(){
obj.startTheTimer();
},obj.delay,obj);
}
},processResponse:function(_7dd){
try{
if(_7dd.deviceActivated=="true"){
this.success=true;
document.getElementById("deviceNameDtls").innerHTML=_7dd.deviceName;
this.displaySuccessMessage();
}
if(_7dd.pinExpired=="true"){
this.success=true;
this.displayPinExpiryMessage();
}
}
catch(e){
this.log("PageRefresh.processResponse(): "+e.message);
}
},displaySuccessMessage:function(){
document.getElementById("successMessage").style.display="inline";
document.getElementById("pinExpiryMessage").style.display="none";
document.getElementById("pinMessage").style.display="none";
document.getElementById("confirmActivationBottom").style.display="none";
},displayPinExpiryMessage:function(){
document.getElementById("pinExpiryMessage").style.display="inline";
document.getElementById("successMessage").style.display="none";
document.getElementById("pinMessage").style.display="none";
document.getElementById("confirmActivationBottom").style.display="none";
},handleError:function(){
this.log("PageRefresh.handleError(): ");
}};
var RentInStore=Class.create();
RentInStore.prototype={initialize:function(el,_7df){
this.el=$(el);
this.url=_7df;
return this;
},log:function(msg){
logger.error(msg);
},displayRent:function(){
try{
new BaseHandler().processAjaxRequest(this.url,"",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
this.log("RentInStore: "+e.message);
return false;
}
},processResponse:function(_7e1){
document.getElementById("rentInstore").innerHTML=_7e1.responseBody;
},handleError:function(){
this.log("RentInStore.handleError(): ");
}};
function showSubNewPaymentForVirtualWallet(_7e2){
document.getElementById("errorBundleSection").style.display="block";
if(_7e2!="newDigitalWallet"){
document.getElementById("billing"+_7e2).style.display="none";
document.getElementById("editBilling"+_7e2).style.display="none";
}
document.getElementById("paymentEditSection"+_7e2).style.display="block";
document.getElementById("billingEditSection"+_7e2).style.display="block";
}
function hideSubNewPaymentForVirtualWallet(_7e3){
document.getElementById("errorBundleSection").style.display="none";
if(_7e3!=null){
document.getElementById("paymentEditSection"+_7e3).style.display="none";
document.getElementById("billingEditSection"+_7e3).style.display="none";
}
}
function showNewPaymentForVirtualWallet(_7e4,_7e5){
if(document.getElementById("downloadCheckoutModel").selectedPayment.value=="NEW"){
document.getElementById("errorBundleSection").style.display="block";
}else{
document.getElementById("errorBundleSection").style.display="none";
}
if(_7e4=="newDigitalWallet"){
document.getElementById("paymentEditSection"+_7e4).style.display="block";
document.getElementById("billingEditSection"+_7e4).style.display="block";
var ca=_7e5;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
document.getElementById("editLink"+c).style.display="none";
document.getElementById("nonEditLink"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
}
}
}
renameControlsForVirtualWallet("NEW",_7e5);
}
function hideNewPaymentForVirtualWallet(_7e9,_7ea){
document.getElementById("errorBundleSection").style.display="none";
document.getElementById("downloadCheckoutModel").selectedWalletId.value=null;
if(_7e9!=null){
var ca=_7ea;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
if(c==_7e9){
document.getElementById("editLink"+c).style.display="block";
document.getElementById("nonEditLink"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("paymentEditSectionnewDigitalWallet").style.display="none";
document.getElementById("billingEditSectionnewDigitalWallet").style.display="none";
}else{
document.getElementById("editLink"+c).style.display="none";
document.getElementById("nonEditLink"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSectionnewDigitalWallet").style.display="none";
document.getElementById("billingEditSectionnewDigitalWallet").style.display="none";
}
}
}
}
renameControlsForVirtualWallet(_7e9,_7ea);
}
function showEditPaymentForVirtualWallet(_7ee,_7ef){
document.getElementById("downloadCheckoutModel").reset();
if(document.getElementById("downloadCheckoutModel").selectedPayment.value=="NOSUBSCRIPTION"+_7ee){
document.getElementById("errorBundleSection").style.display="block";
}else{
document.getElementById("errorBundleSection").style.display="none";
}
document.getElementById("downloadCheckoutModel").selectedWalletId.value=_7ee;
Wallets=document.getElementsByName("defaultWallet");
for(i=0;i<Wallets.length;i++){
if(Wallets[i].value=="NOSUBSCRIPTION"+_7ee){
Wallets[i].checked=true;
}
}
if(_7ee!=null){
var ca=_7ef;
var c=0;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
if(c==_7ee){
document.getElementById("prepopulation"+c).style.display="none";
document.getElementById("paymentEditSection"+c).style.display="block";
document.getElementById("billingEditSection"+c).style.display="block";
}else{
document.getElementById("prepopulation"+c).style.display="block";
document.getElementById("paymentEditSection"+c).style.display="none";
document.getElementById("billingEditSection"+c).style.display="none";
}
}
}
}
}
function enableDefaultEditForVirtualWallet(){
var c=document.getElementById("downloadCheckoutModel").defaultPayment.value;
document.getElementById("editLink"+c).style.display="block";
document.getElementById("nonEditLink"+c).style.display="none";
}
function checkDigitalWallet(_7f4){
var _7f5=document.getElementsByName("defaultWallet");
var c=0;
if(_7f5!=null&&_7f5.length!=null){
for(var i=0;i<_7f5.length;i++){
if(_7f5[i].checked){
c=_7f5[i].value;
break;
}
}
if(c!="NEW"){
checkedWalletId=c.substring(14);
removeOtherWalletOptions(checkedWalletId,_7f4);
}else{
removeOtherWalletOptions(c,_7f4);
}
}
}
function removeOtherWalletOptions(_7f8,_7f9){
var _7fa=_7f9;
var _7fb=0;
var _7fc=0;
if(_7f8!="NEW"){
_7fc=document.getElementById("paymentEditSectionnewDigitalWallet");
_7fc.parentNode.removeChild(_7fc);
_7fc=document.getElementById("billingEditSectionnewDigitalWallet");
_7fc.parentNode.removeChild(_7fc);
}
if(_7fa!=null&&_7fa.length!=null){
for(var i=0;i<_7fa.length;i++){
if(_7f8!=_7fa[i]){
_7fc=document.getElementById("paymentEditSection"+_7fa[i]);
_7fc.parentNode.removeChild(_7fc);
_7fc=document.getElementById("billingEditSection"+_7fa[i]);
_7fc.parentNode.removeChild(_7fc);
}
}
}
}
function enableSelectedEditForVirtualWallet(){
var _7fe=document.getElementsByName("defaultWallet");
if(_7fe!=null&&_7fe.length!=null){
for(var i=0;i<_7fe.length;i++){
if(_7fe[i].checked){
c=_7fe[i].value;
if(c!="NEW"){
walletId=c.substring(14);
document.getElementById("editLink"+walletId).style.display="block";
document.getElementById("nonEditLink"+walletId).style.display="none";
break;
}else{
walletIdList=document.getElementById("downloadCheckoutModel").walletIdList;
showNewPaymentForVirtualWallet("newDigitalWallet",walletIdList);
break;
}
}
}
}
}
function showAfterValidationErrorsForVirtualWallet(_800){
document.getElementById("errorBundleSection").style.display="block";
var _801=document.getElementsByName("defaultWallet");
if(_801!=null&&_801.length!=null){
for(var i=0;i<_801.length;i++){
if(_801[i].checked){
c=_801[i].value;
if(c!="NEW"){
walletId=c.substring(14);
document.getElementById("downloadCheckoutModel").selectedWalletId.value=walletId;
renameControlsForVirtualWallet(walletId,_800);
document.getElementById("prepopulation"+walletId).style.display="none";
document.getElementById("paymentEditSection"+walletId).style.display="block";
document.getElementById("billingEditSection"+walletId).style.display="block";
}else{
if(c=="NEW"){
showNewPaymentForVirtualWallet("newDigitalWallet",_800);
}
}
}else{
c=_801[i].value;
if(c!="NEW"){
walletId=c.substring(14);
document.getElementById("editLink"+walletId).style.display="none";
document.getElementById("nonEditLink"+walletId).style.display="block";
}
}
}
}
}
function renameControlsForVirtualWallet(_803,_804){
var ca=_804;
if(ca!=null&&ca.length!=null){
for(var i=0;i<ca.length;i++){
c=ca[i];
document.getElementById("paymentMethod_"+c).name="paymentMethod1";
document.getElementById("creditCard.firstName_"+c).name="creditCard.firstName1";
document.getElementById("creditCard.lastName_"+c).name="creditCard.lastName1";
document.getElementById("creditCard.expirationMonth_"+c).name="creditCard.expirationMonth1";
document.getElementById("creditCard.expirationYear_"+c).name="creditCard.expirationYear1";
document.getElementById("creditCard.cid_"+c).name="creditCard.cid1";
document.getElementById("billingAddress.addressLine1_"+c).name="billingAddress.addressLine11";
document.getElementById("billingAddress.addressLine2_"+c).name="billingAddress.addressLine21";
document.getElementById("billingAddress.city_"+c).name="billingAddress.city1";
document.getElementById("billingAddress.stateCode_"+c).name="billingAddress.stateCode1";
document.getElementById("billingAddress.zipCode_"+c).name="billingAddress.zipCode1";
document.getElementById("billingPhoneNumber.areaCode_"+c).name="billingPhoneNumber.areaCode1";
document.getElementById("billingPhoneNumber.prefix_"+c).name="billingPhoneNumber.prefix1";
document.getElementById("billingPhoneNumber.suffix_"+c).name="billingPhoneNumber.suffix1";
if(c!=_803){
document.getElementById("paymentMethod_"+c).className=document.getElementById("paymentMethod_"+c).className.replace("error","");
document.getElementById("creditCard.firstName_"+c).className=document.getElementById("creditCard.firstName_"+c).className.replace("error","");
document.getElementById("creditCard.lastName_"+c).className=document.getElementById("creditCard.lastName_"+c).className.replace("error","");
document.getElementById("creditCard.expirationMonth_"+c).className=document.getElementById("creditCard.expirationMonth_"+c).className.replace("error","");
document.getElementById("creditCard.expirationYear_"+c).className=document.getElementById("creditCard.expirationYear_"+c).className.replace("error","");
document.getElementById("creditCard.cid_"+c).className=document.getElementById("creditCard.cid_"+c).className.replace("error","");
document.getElementById("billingAddress.addressLine1_"+c).className=document.getElementById("billingAddress.addressLine1_"+c).className.replace("error","");
document.getElementById("billingAddress.city_"+c).className=document.getElementById("billingAddress.city_"+c).className.replace("error","");
document.getElementById("billingAddress.stateCode_"+c).className=document.getElementById("billingAddress.stateCode_"+c).className.replace("error","");
document.getElementById("billingAddress.zipCode_"+c).className=document.getElementById("billingAddress.zipCode_"+c).className.replace("error","");
}
}
}
document.getElementById("paymentMethod_NEW").name="paymentMethod1";
document.getElementById("creditCard.firstName_NEW").name="creditCard.firstName1";
document.getElementById("creditCard.lastName_NEW").name="creditCard.lastName1";
document.getElementById("creditCardAccountNumber_NEW").name="creditCardAccountNumber1";
document.getElementById("creditCard.expirationMonth_NEW").name="creditCard.expirationMonth1";
document.getElementById("creditCard.expirationYear_NEW").name="creditCard.expirationYear1";
document.getElementById("creditCard.cid_NEW").name="creditCard.cid1";
document.getElementById("billingAddress.addressLine1_NEW").name="billingAddress.addressLine11";
document.getElementById("billingAddress.addressLine2_NEW").name="billingAddress.addressLine21";
document.getElementById("billingAddress.city_NEW").name="billingAddress.city1";
document.getElementById("billingAddress.stateCode_NEW").name="billingAddress.stateCode1";
document.getElementById("billingAddress.zipCode_NEW").name="billingAddress.zipCode1";
document.getElementById("billingPhoneNumber.areaCode_NEW").name="billingPhoneNumber.areaCode1";
document.getElementById("billingPhoneNumber.prefix_NEW").name="billingPhoneNumber.prefix1";
document.getElementById("billingPhoneNumber.suffix_NEW").name="billingPhoneNumber.suffix1";
if(_803!="NEW"){
document.getElementById("paymentMethod_NEW").className=document.getElementById("paymentMethod_NEW").className.replace("error","");
document.getElementById("creditCard.firstName_NEW").className=document.getElementById("creditCard.firstName_NEW").className.replace("error","");
document.getElementById("creditCard.lastName_NEW").className=document.getElementById("creditCard.lastName_NEW").className.replace("error","");
document.getElementById("creditCardAccountNumber_NEW").className=document.getElementById("creditCardAccountNumber_NEW").className.replace("error","");
document.getElementById("creditCard.expirationMonth_NEW").className=document.getElementById("creditCard.expirationMonth_NEW").className.replace("error","");
document.getElementById("creditCard.expirationYear_NEW").className=document.getElementById("creditCard.expirationYear_NEW").className.replace("error","");
document.getElementById("creditCard.cid_NEW").className=document.getElementById("creditCard.cid_NEW").className.replace("error","");
document.getElementById("billingAddress.addressLine1_NEW").className=document.getElementById("billingAddress.addressLine1_NEW").className.replace("error","");
document.getElementById("billingAddress.city_NEW").className=document.getElementById("billingAddress.city_NEW").className.replace("error","");
document.getElementById("billingAddress.stateCode_NEW").className=document.getElementById("billingAddress.stateCode_NEW").className.replace("error","");
document.getElementById("billingAddress.zipCode_NEW").className=document.getElementById("billingAddress.zipCode_NEW").className.replace("error","");
}
document.getElementById("paymentMethod_"+_803).name="paymentMethod";
document.getElementById("creditCard.firstName_"+_803).name="creditCard.firstName";
document.getElementById("creditCard.lastName_"+_803).name="creditCard.lastName";
if(_803=="NEW"){
document.getElementById("creditCardAccountNumber_"+_803).name="creditCardAccountNumber";
}
document.getElementById("creditCard.expirationMonth_"+_803).name="creditCard.expirationMonth";
document.getElementById("creditCard.expirationYear_"+_803).name="creditCard.expirationYear";
document.getElementById("creditCard.cid_"+_803).name="creditCard.cid";
document.getElementById("billingAddress.addressLine1_"+_803).name="billingAddress.addressLine1";
document.getElementById("billingAddress.addressLine2_"+_803).name="billingAddress.addressLine2";
document.getElementById("billingAddress.city_"+_803).name="billingAddress.city";
document.getElementById("billingAddress.stateCode_"+_803).name="billingAddress.stateCode";
document.getElementById("billingAddress.zipCode_"+_803).name="billingAddress.zipCode";
document.getElementById("billingPhoneNumber.areaCode_"+_803).name="billingPhoneNumber.areaCode";
document.getElementById("billingPhoneNumber.prefix_"+_803).name="billingPhoneNumber.prefix";
document.getElementById("billingPhoneNumber.suffix_"+_803).name="billingPhoneNumber.suffix";
}
var custom_var,_sp="%3A\\/\\/",_rp="%3A//",_poE=0,_poX=0,_sH=screen.height,_d=document,_w=window,_ht=_w.location.href,_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width;
function _fC(_u){
_aT=_sp+",\\/,\\.,-,_,"+_rp+",%2F,%2E,%2D,%5F";
_aA=_aT.split(",");
for(i=0;i<5;i++){
eval("_u=_u.replace(/"+_aA[i]+"/g,_aA[i+5])");
}
return _u;
}
function O_LC(){
_w.open("https://secure.opinionlab.com/ccc01/comment_card.asp?time1="+_tm+"&time2="+(new Date()).getTime()+"&prev="+(encodeURIComponent(_hr))+"&referer="+(encodeURIComponent(_ht))+"&height="+_sH+"&width="+_sW+"&custom_var="+custom_var,"comments","width=535,height=192,screenX="+((_sW-535)/2)+",screenY="+((_sH-192)/2)+",top="+((_sH-192)/2)+",left="+((_sW-535)/2)+",resizable=yes,copyhistory=yes,scrollbars=no");
}
function _fPe(){
if(Math.random()>=1-_poE){
O_LC();
_poX=0;
}
}
function _fPx(){
if(Math.random()>=1-_poX){
O_LC();
}
}
window.onunload=_fPx;
function O_GoT(_p){
_d.write("<a href='javascript:O_LC()'>"+_p+"</a>");
_fPe();
}
var AutoComplete=Class.create();
AutoComplete.prototype={initialize:function(_809,oDiv,_80b){
this.oText=_809;
this.oDiv=oDiv;
this.maxSize=_80b;
this.cur=-1;
this.globalData=new Array();
_809.onkeyup=this.keyUp;
_809.onkeydown=this.keyDown;
_809.autoComplete=this;
_809.onblur=this.hideSuggest;
},hideSuggest:function(){
document.getElementById("suggest").style.visibility="hidden";
},selectText:function(_80c,iEnd){
if(this.oText.createTextRange){
var _80e=this.oText.createTextRange();
_80e.moveStart("character",_80c);
_80e.moveEnd("character",iEnd-this.oText.value.length);
_80e.select();
}else{
if(this.oText.setSelectionRange){
}
}
this.oText.focus();
},textComplete:function(_80f){
if(this.oText.createTextRange||this.oText.setSelectionRange){
var _810=this.oText.value.length;
this.selectText(_810,_80f.length);
}
},keyDown:function(_811){
_811=window.event||_811;
iKeyCode=_811.keyCode;
switch(iKeyCode){
case 38:
this.autoComplete.moveUp();
break;
case 40:
this.autoComplete.moveDown();
break;
case 13:
window.focus();
this.autoComplete.oDiv.style.visibility="hidden";
if(document.getElementById("productSearchModel")){
document.getElementById("productSearchModel").submit();
}
break;
}
},moveDown:function(){
if(this.oDiv.childNodes.length>0&&this.cur<(this.oDiv.childNodes.length-1)){
++this.cur;
for(var i=0;i<this.oDiv.childNodes.length;i++){
if(i==this.cur){
this.oDiv.childNodes[i].className="over";
this.oText.value=this.oDiv.childNodes[i].innerHTML;
}else{
this.oDiv.childNodes[i].className="";
}
}
}
},moveUp:function(){
if(this.oDiv.childNodes.length>0&&this.cur>0){
--this.cur;
for(var i=0;i<this.oDiv.childNodes.length;i++){
if(i==this.cur){
this.oDiv.childNodes[i].className="over";
this.oText.value=this.oDiv.childNodes[i].innerHTML;
}else{
this.oDiv.childNodes[i].className="";
}
}
}
},keyUp:function(_814){
_814=_814||window.event;
var _815=_814.keyCode;
if(_815==8||_815==46){
this.autoComplete.onTextChange(false);
}else{
if(_815<32||(_815>=33&&_815<=46)||(_815>=112&&_815<=123)){
}else{
this.autoComplete.onTextChange(true);
}
}
},positionSuggest:function(){
var _816=this.oText;
var x=0,y=_816.offsetHeight;
while(_816.offsetParent&&_816.offsetParent.tagName.toUpperCase()!="BODY"){
x+=_816.offsetLeft;
y+=_816.offsetTop;
_816=_816.offsetParent;
}
x+=_816.offsetLeft;
y+=_816.offsetTop;
this.oDiv.style.top=y+"px";
this.oDiv.style.left=x+"px";
},onTextChange:function(_818){
try{
new AjaxHandler(_818,this.oText.value).processAjaxRequest("/acctmgmt/searchAutocomplete",this.processResponse.bind(this),this.handleError.bind(this));
}
catch(e){
console.log("AutoComplete.onTextChange(): "+e.message);
}
},getMatches:function(str,_81a,_81b,_81c){
for(var i=0;i<_81c.length;i++){
_81a.push(_81c[i]);
if(i==(_81b-1)){
break;
}
}
},processResponse:function(_81e,_81f){
var txt=this.oText.value;
var _821=this;
this.cur=-1;
if(txt.length>0){
while(this.oDiv.hasChildNodes()){
this.oDiv.removeChild(this.oDiv.firstChild);
}
var aStr=new Array();
for(var i=0;i<_81e.length;i++){
aStr.push(_81e[i]);
if(i==(this.maxSize-1)){
break;
}
}
if(!aStr.length){
this.hideSuggest;
return;
}
if(_81f){
this.textComplete(aStr[0]);
}
this.positionSuggest();
for(i=0;i<aStr.length;i++){
var oNew=document.createElement("div");
this.oDiv.appendChild(oNew);
oNew.onmouseover=oNew.onmouseout=oNew.onmousedown=function(_825){
_825=window.event||_825;
oSrcDiv=_825.target||_825.srcElement;
if(_825.type=="mousedown"){
_821.oText.value=this.innerHTML;
}else{
if(_825.type=="mouseover"){
this.className="over";
}else{
if(_825.type=="mouseout"){
this.className="";
}else{
this.oText.focus();
}
}
}
};
oNew.innerHTML=aStr[i];
}
this.oDiv.style.visibility="visible";
}else{
this.oDiv.innerHTML="";
this.oDiv.style.visibility="hidden";
}
},handleError:function(_826){
}};
var AjaxHandler=Class.create();
AjaxHandler.prototype={initialize:function(_827,_828){
this.bTextComplete=_827;
this.query=_828;
},processAjaxRequest:function(url,_82a,_82b){
if(this.bTextComplete!=null&&this.bTextComplete.length>0){
postBody="&bTextComplete="+this.bTextComplete+"&query="+this.query;
}else{
postBody="bTextComplete=false&query="+this.query;
}
this.successMethod=_82a;
this.errorMethod=_82b;
if(this.query!=null&&this.query.length>0){
var _82c=new Ajax.Request(url,{method:"get",parameters:postBody,onComplete:this.processAjaxResponse.bind(this),onFailure:this.processAjaxFailure.bind(this)});
}
},processAjaxResponse:function(_82d){
try{
var _82e=_82d.responseText;
if(_82e!=null&&_82e.length>0){
var _82f=_82e.split(",");
this.successMethod(_82f,this.bTextComplete);
}else{
console.log(_82e);
}
}
catch(e){
console.log("Ajax Handler :: error while handling response :: "+e);
if(this.errorMethod!=null){
this.errorMethod();
}
return;
}
},processAjaxFailure:function(_830){
if(this.errorMethod!=null){
this.errorMethod();
}
},processAjaxTimeout:function(_831){
if(this.errorMethod!=null){
this.errorMethod();
}
}};
function submitSVODAuthenticationCheckLogin(){
new OverlayLoginHandler(function(){
window.location.reload();
}).performAuthenticatedAction();
}
