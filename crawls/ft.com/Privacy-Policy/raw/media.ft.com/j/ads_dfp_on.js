
FT=window.FT||{};FT.env=FT.env||{};var FT=FT||{};FT.Properties=FT.Properties||{};FT.Properties.extend=function(opts){for(var o in opts){this[o]=opts[o];}};FT.Properties.extend({APP:"global",ENV:"local",BCReadAPIToken:"JPqBh6fm9xN8DI8Fx-r4q3UKCW2My5bxA6_zDYKIUZzODRDB3wZIFg..",CM_REQUEST_HTML_PATH:"/m/html/cm_request.htm",CORPORATE_BARRIER_BASE:"http://www.ft.com/m/registration.ft.com/corporate/ns/cb/"});FT.Properties.extend({Bitly:{login:'ftshare',baseURl:'http://api.bitly.com/v3/',apiKey:'R_2b14237f91d76519080dd5c0faf84cb7'}});FT.Properties.extend({TagContainer:{url:"//s4.test.media.ft.com/opentag/opentag-27295-31201.js",fallbackUrl:"//d3c3cq33003psk.cloudfront.net/opentag-27295-31201.js",loaded:false}});FT.Properties.extend({ENV:"p",BCReadAPIToken:"8LjOvl7btdZiTFL3E5a3gPq9uLBIDGp7qTnXnHM0mQ5G_Tjp2GIPfQ..",SCRIPT_BASE:"http://s2.media.ft.com/m/js/",IMG_BASE:"http://im.media.ft.com/m/img/",CORPORATE_BARRIER_BASE:"http://www.ft.com/m/registration.ft.com/corporate/ns/cb/",ASSANKA_ANNOTATION_HOST:"mbanewslines.ft.com"});FT.Properties.extend({TagContainer:{url:"//s4.media.ft.com/opentag/opentag-27295-31253.js",fallbackUrl:"//d3c3cq33003psk.cloudfront.net/opentag-27295-31253.js",loaded:false}});var FT=FT||{};FT.lib={type:function(unk){function arrayLike(o){return(typeof o.length==='number'&&!(o.propertyIsEnumerable('length')));}
function type(o){return(Object.prototype.toString.apply(o)).match(/\[object (\w+)\]/)[1].toLowerCase();}
var t=type(unk);return unk===undefined?"undefined":unk===null?"null":t==="object"&&arrayLike(unk)?"arraylike":t==="arguments"?"arraylike":t;},iterator:function(context,f){for(var ct=0;ct<context.length&&f.call(context,context[ct],ct)!==false;ct++){}},trim:function(str){return String(str).replace(/^\s+|\s+$/g,"");},index:function(obj,f){for(var key in obj){if(f.call(obj,key,obj[key])===false){break;}}},constrain:function(val,min,max){return+val<min||+val>max?Math.max(min,Math.min(val,max)):val;},addCssRule:function(selector,style){var ss=document.styleSheets[0];if(ss.addRule){ss.addRule(selector,style);}else{ss.insertRule(selector+"{"+style+"}",0);}},hash:function(str,delimiter,pairing){var hash={};FT.lib.iterator(str.split(delimiter),function(value){var pair=value.split(pairing);if(pair.length>1){hash[FT.lib.trim(pair[0])]=Array.prototype.slice.call(pair,1).join(pairing);}});return hash;},delimit:function(obj,delimiter,pairing){var first="";var str="";for(var i in obj){if(obj.hasOwnProperty(i)){str+=first+i+pairing+obj[i];first=delimiter;}}
return str;},extend:function(){var f=arguments.callee,o={};function second_loop(k,i){var cast=FT.lib.type(i);if(cast==="object"){o[k]=f(i);}else if(cast==="array"||cast==="arraylike"){o[k]=Array.prototype.slice.call(i,0);}else{o[k]=i;}}
function main_loop(item){FT.lib.index(item,second_loop);}
FT.lib.iterator(arguments,main_loop);return o;},hashCookies:function(fakeCookies){FT.cookies=FT.lib.hash(fakeCookies||document.cookie,";","=");return FT.cookies;},hashQueryString:function(fakeQueryString){FT.queryString=FT.lib.hash(fakeQueryString||window.location.search,/[?&]/,"=");return FT.queryString;},isSecure:function(doc){var d=doc||document;return(d.location.protocol=='https:');},writeScript:function(url){if(document.readyState!=="complete"||typeof QUnit==="object"){document.write('<scr'+'ipt src="'+url+'"></scr'+'ipt>');}},writeScriptAsynchronous:function(scriptSrc){var se=document.createElement('script');se.async="async";se.type="text/javascript";se.src=scriptSrc;document.getElementsByTagName('head')[0].appendChild(se);},getElementsByClassName:function(oElm,strTagName,strClassName){var arrElements=(strTagName=="*"&&oElm.all)?oElm.all:oElm.getElementsByTagName(strTagName);var arrReturnElements=[];strClassName=strClassName.replace(/\-/g,"\\-");var oRegExp=new RegExp("(^|\\s)"+strClassName+"(\\s|$)");var oElement;for(var i=0;i<arrElements.length;i++){oElement=arrElements[i];if(oRegExp.test(oElement.className)){arrReturnElements.push(oElement);}}
return(arrReturnElements);},addClassName:function(oElm,strClassName){if(oElm){this.removeClassName(oElm,strClassName);oElm.className+=" "+strClassName;}},removeClassName:function(oElm,strClassName){if(oElm){oElm.className=oElm.className.replace(new RegExp(" ?"+strClassName),"");}},clearSelection:function(){if(document.selection&&document.selection.empty){document.selection.empty();}else if(window.getSelection){var sel=window.getSelection();sel.removeAllRanges();}}};FT.lib.hashCookies();FT.lib.hashQueryString();var FT=FT||{};FT.PreInit=function(){this.distributeNavItems=function(nav){var childNodes=nav.childNodes;var navItems=[];for(var i=0;i<childNodes.length;i++){var node=childNodes[i];if(node.tagName=="LI"&&node.className.indexOf("dummy")<0){navItems.push(node);}}
var numItems=navItems.length;if(numItems>0){var availableWidth=navItems[0].parentNode.offsetWidth;var unpaddedWidth=14;for(var i=0;i<navItems.length;i++){var n=navItems[i];n.style.paddingLeft=0;n.style.paddingRight=0;n.style.marginLeft=0;n.style.marginRight=0;unpaddedWidth+=n.offsetWidth;}
var remainingWidth=availableWidth-unpaddedWidth;var paddingPerItem=Math.floor(remainingWidth/numItems);for(var i=0;i<navItems.length;i++){var n=navItems[i];if(i==0){n.style.paddingLeft="14px";}
n.style.paddingRight=paddingPerItem+"px";var anchors=n.getElementsByTagName("A");for(var a=0;a<anchors.length;a++){var anc=anchors[a];anc.style.visibility="visible";}}}};this.renderWsodMarketsHome=function(url){var urlBits=url.split("?");var urlLocation=urlBits[0];var urlQs="";if(urlBits.length>1){urlQs+="&"+urlBits[1].replace("?","&");}
if(!urlQs.match(/&id=([^&])*/)){urlQs="?id=wsodMarketsHomePlaceholder"+urlQs;}else{urlQs=urlQs.replace("&","?");}
if(!urlQs.match(/edition=([^&])*/)){if(FT.cookies.AYSC){var aysc14=FT.cookies.AYSC.match(/.*_14([^_]*)/)?RegExp.$1:null;var aysc28=FT.cookies.AYSC.match(/.*_28([^_]*)/)?RegExp.$1:null;}
var ayscEdition=aysc28?aysc28:aysc14?(aysc14=="GBR"?"uk":""):"uk";urlQs+="&edition="+ayscEdition;}
var ph=document.getElementById("wsodMarketsHomePlaceholder");if(ph){ph.innerHTML="";}
FT.lib.writeScript(urlLocation+urlQs);};this.removeNojsClassFromBody=function(){FT.lib.removeClassName(document.body,"nojs");};this.addOSClassToBody=function(nav){if(/Mac/.test(nav.platform)&&(/Chrome|Firefox/.test(nav.userAgent)||/Apple/.test(nav.vendor)||window.opera)){FT.lib.addClassName(document.body,"OS_Mac");}};this.addRenderingEngineClassToBody=function(nav){var c="";if(/MSIE/.test(nav.userAgent)){c="trident";}else if(/Gecko\//.test(nav.userAgent)){c="gecko";}else if(/WebKit\//.test(nav.userAgent)){c="webkit";}else if(/Presto\//.test(nav.userAgent)){c="presto";}
if(c){FT.lib.addClassName(document.body,c);}};this.setBodyClass=function(nav){this.removeNojsClassFromBody();this.addOSClassToBody(nav);this.addRenderingEngineClassToBody(nav);},this.initialiseBrightcove=function(){if(typeof runMobileCompatibilityScript==="function"){runMobileCompatibilityScript('myExperience','anId');}
FT.lib.writeScriptAsynchronous("http://admin.brightcove.com/js/BrightcoveExperiences.js");};this.hideSearchboxAd=function(){var el=document.getElementById('searchbox');if(el){el.style.display='none';}};this.attachHideSearchboxAdFunctionality=function(){var el=document.getElementById('simpleSearchField');if(el){if(el.addEventListener){el.addEventListener('focus',this.hideSearchboxAd,false);}else if(el.attachEvent){el.attachEvent('onfocus',this.hideSearchboxAd);}}};this._chain=function(args){return function(){for(var i=0;i<args.length;i++){args[i]();}}};this.addToChain=function(originalFnStr,fn){window[originalFnStr]=typeof(window[originalFnStr])!='function'?fn:this._chain([window[originalFnStr],fn]);};};FT.preInit=new FT.PreInit();FT.HTMLAds=function(){this.HTMLAdData={'urlStem':'http://media.ft.com/adimages/banner/','injectionParentDiv':'banlb','injectionLegacyParentDiv':'ad-placeholder-banlb','injectionDiv':'corppop_overlay','injectionClass':'corppop_single_occurence','timeOutCookieName':'FT_AM','timeOutCookieVal':'Check','timeOutCookieLife':'21600000','urlStemClassicAMO':'http://media.ft.com/m/registration.ft.com/corporate/ns/amo/'};};FT.HTMLAds.prototype.buildAdURL=function(AYSC,regex){var userType='anon/';var fileName='';var urlStemNewAMO;var a=AYSC.match(/(_98)([^_]+)/);var val98='';if(a){val98=a[2];}
var m=AYSC.match(/(_22)([^_]+)/);var val22='';if(m){val22=m[2];}else{userType='anon/';}
var n=AYSC.match(/(_27)([^_]+)/);var val27='';if(n){val27=n[2];}
if((val22.match(regex.cor))||(val22.match(regex.lv1))||(val22.match(regex.lv2))){userType='subscribed/';}else if((val22.match(regex.reg))){userType='registered/';}
if(val98===''||(val98.match(/PVT/))){val27=val27.toUpperCase();fileName=this.HTMLAdData.urlStem+val27+'.js';}
else{if((typeof(FT.Properties.CORPORATE_AMO_BASE)==="undefined")||(FT.Properties.CORPORATE_AMO_BASE==='')){urlStemNewAMO=this.HTMLAdData.urlStemClassicAMO;}
else{urlStemNewAMO=FT.Properties.CORPORATE_AMO_BASE;}
fileName=urlStemNewAMO+userType+val27;}
return fileName;};FT.HTMLAds.prototype.getHTMLAd=function(adType,inj,fileName){var js='<script src="'+fileName+'" type="text/javascript">';js=js+'/* Do not remove comment */';js=js+'</script>';inj.style.display="block";var CorppopDiv=document.getElementById(this.HTMLAdData.injectionDiv);var CorppopDivName=this.HTMLAdData.injectionDiv;if(CorppopDiv===null){CorppopDiv=document.createElement("div");}
CorppopDiv.setAttribute("id",CorppopDivName);CorppopDiv.className=this.HTMLAdData.injectionClass;var Script1=document.createElement('script');Script1.type='text/javascript';Script1.src=fileName;try{inj.appendChild(CorppopDiv);var corppopDivAgain=document.getElementById(CorppopDivName);corppopDivAgain.appendChild(Script1);}catch(er2){clientAds.log(er2);}};FT.HTMLAds.prototype.corpCookieMatch=function(AYSC,regex){if(typeof(AYSC)==="undefined"){return 0;}
var c=AYSC.match(/(_97)([^_]+)/);var val97='';if(c){val97=c[2];}
var a=AYSC.match(/(_98)([^_]+)/);var val98='';if(a){val98=a[2];}
var m=AYSC.match(/(_22)([^_]+)/);var val22='';if(m){val22=m[2];}
var n=AYSC.match(/(_27)([^_]+)/);var val27='';if(n){val27=n[2];}
else{return 0;}
if(val98===''||(val98.match(/PVT/))){if((val22.match(/[<>]/))||(val27.match(/[<>]/))||(val27.match(/RES/))||(val27.match(/PVT/))){return 0;}
else if((!val27.match(/[0-9A-Za-z]/))||(val22.match(regex.cor))||(val22.match(regex.lv1))||(val22.match(regex.lv2))){return 0;}}else if(val98.match(/A/)&&!val98.match(/IA/)){if((val22.match(/[<>]/))||(val27.match(/[<>]/))||(val27.match(/RES/))||(val27.match(/PVT/))){return 0;}
else if((!val27.match(/[0-9A-Za-z]/))){return 0;}
else if(val97.match(/c/)){return 0;}}else{return 0;}
return 1;};FT.HTMLAds.prototype.createCorppopCookie=function(timeoutTime){if(typeof(timeoutTime)==="undefined"){timeoutTime=this.HTMLAdData.timeOutCookieLife;}
var name=this.HTMLAdData.timeOutCookieName;var val=this.HTMLAdData.timeOutCookieVal;var date=new Date();date.setTime(date.getTime()+(timeoutTime));var expires="; expires="+date.toGMTString();document.cookie=name+"="+val+expires+"; domain=.ft.com; path=/";};FT.HTMLAds.prototype.timeOut=function(corppopTimeoutCookie,corppopOldTimeoutCookie){if((typeof(corppopTimeoutCookie)==="undefined")&&(typeof(corppopOldTimeoutCookie)==="undefined")){return 1;}
return 0;};FT.Advertising=function(){this.baseAdvert={};this.CONST={};this.CONST.AD_SERVERS=/^((a[lutre])|(b[rsgaye])|(c[nohazl])|(d[ke])|(e[gse])|(f[ri])|(g[rt])|(h[ukr])|(i[stlne])|(j[p])|(k[wr])|(l[uvt])|(m[yxaekd])|(n[olz])|(p[lthk])|(r[suo])|(s[gekai])|(t[rhw])|(u[kas])|(v[e])|(z[a]))$/i;this.CONST.AdFormat={'intro':{'sz':'1x1'},'banlb':{'sz':'468x60,728x90','dcopt':'ist'},'newssubs':{'sz':'239x90'},'tlbxrib':{'sz':'336x60'},'marketingrib':{'sz':'336x60'},'lhn':{'sz':'136x64'},'tradcent':{'sz':'336x260'},'mktsdata':{'sz':'88x31,75x25'},'hlfmpu':{'sz':'300x600,336x850,300x250,336x280'},'doublet':{'sz':'342x200'},'refresh':{'sz':'1x1'},'mpu':{'sz':'300x250,336x280'},'mpusky':{'sz':'300x250,336x280,160x60'},'wdesky':{'sz':'160x600'},'video':{'sz':'592x333'},'minivid':{'sz':'400x225'},'vidbut1':{'sz':'120x29'},'vidbut2':{'sz':'100x50'},'vidbut3':{'sz':'200x50'},'searchbox':{'sz':'200x28'},'-':{}};this.CONST.KeyOrder=['sz','dcopt','07','a','06','05','27','eid','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','19','20','21','slv','02','14','cn','01','kw','u','pos','bht','tile','ord'];this.CONST.KeyOrderVideo=['sz','dcopt','pos'];this.CONST.KeyOrderVideoExtra=['dcopt','brand','section','playlistid','playerid','07','a','06','slv','eid','05','19','21','27','20','02','14','cn','01','u'];this.CONST.KeyOrderVideoSync=['sz','dcopt'];this.CONST.uKeyOrder=['eid','uuid','auuid','ts'];this.CONST.exclusions=['key=03','key=04','key=08','key=09','key=10','key=11','key=12','key=13','key=15','key=16','key=17','key=18','key=22','key=23','key=24','key=25','key=26','key=28','key=29','key=30'];this.CONST.leading_zero_key_names=['19','21'];this.CONST.remove_exes={'02':1,'05':1,'06':1,'07':1,'19':1,'20':1,'21':1};this.CONST.remove_res_pvt={'14':1,'cn':1,'27':1};this.CONST.regex_key_names=['22'];this.CONST.SubsLevelReplaceLookup={'edt':/^edit$/,'int':/^Ftemp$/,'cor':/^[PL][01][PL]*[1]*[PL][12][A-Za-z][A-Za-z]/,'lv1':/^[PL]1[A-Za-z][A-Za-z]/,'lv2':/^[PL]2[A-Za-z][A-Za-z]/,'reg':/^[PL]0[A-Za-z][A-Za-z]/};this.CONST.substr_key_names=['24=0=3=cn'];this.CONST.proxy_div_prefixes=['','ad-placeholder-','ad-container-'];this.CONST.audSciMax=20;this.CONST.audSciInitial=20;this.CONST.uParamMax=253;this.CONST.urlMax=511;this.CONST.urlThresholdMax=2000000;this.CONST.urlThreshold=10000;this.CONST.trackUrl="http://track.ft.com/track/dfp_error.gif";};if(FT.lib){FT.ads=new FT.Advertising();}
if(FT.HTMLAds){FT.corppop=new FT.HTMLAds();}
FT.Advertising.prototype.request=function(pos)
{FT.env.isLegacyAPI=false;clientAds.log("FT.Advertising.prototype.request("+pos+")");this.initDFP();this.requestDFP(pos);};FT.Advertising.prototype.getVideoAdverts=function()
{var Ads=[];this.foreach(this.adverts,function(pos)
{if((this.adverts[pos].callType==='video')||(this.adverts[pos].callType==='minivid'))
{Ads.push(pos);}});return Ads;};FT.Advertising.prototype.getVideoSyncAdverts=function()
{var Ads=[];this.foreach(this.adverts,function(pos)
{if(this.adverts[pos].callType==='videoSync')
{Ads.push(pos);}});return Ads;};FT.Advertising.prototype.getNormalAdverts=function()
{var Ads=[];this.foreach(this.adverts,function(pos)
{if(this.adverts[pos].callType==='normal')
{Ads.push(pos);}});return Ads;};FT.Advertising.prototype.register=function(pos)
{clientAds.log("FT.Advertising.prototype.register("+pos+")");if(!FT.ads.hasCalledInitDFP)
{FT.env.isLegacyAPI=false;this.initDFP();}
this.adverts[pos]=this.adverts[pos]||{};this.adverts[pos].callType='videoSync';if(!this.videoAdverts){this.videoAdverts=[];}
this.videoAdverts.push(pos);};FT.Advertising.prototype.beginVideo=function()
{this.beginNewPage();};FT.Advertising.prototype.requestDFP=function(pos)
{var URL='';if(pos==='corppop'){var location=document.location.href;if(!location.match(/Authorised=false/)){if(typeof FT.cookies.AYSC==='undefined')
FT.cookies=FT.lib.hashCookies();var ASYC_OK=FT.corppop.corpCookieMatch(FT.cookies.AYSC,FT.ads.CONST.SubsLevelReplaceLookup);var TIME_OK=FT.corppop.timeOut(FT.cookies.FT_AM,FT.cookies.CorpPopTimeout);var injectionPoint=(FT.env.isLegacyAPI)?FT.corppop.HTMLAdData.injectionLegacyParentDiv:FT.corppop.HTMLAdData.injectionParentDiv;var inj=document.getElementById(injectionPoint);if((ASYC_OK)&&(TIME_OK)&&(inj!==null))
{URL=FT.corppop.buildAdURL(FT.cookies.AYSC,FT.ads.CONST.SubsLevelReplaceLookup);FT.corppop.getHTMLAd(pos,inj,URL);}}}
else{clientAds.log("FT.Advertising.requestDFP("+pos+")");this.setInitialAdState(pos);URL=this.buildURL(pos);if(URL){var self=this;FT.lib.writeScript(URL);if(this.adverts[pos].state.alwaysHide)
{this.collapse(pos);}
else
{clientAds.log("setting up anon_timeout("+pos+") "+this.timeoutTolerance);this.timeouts[pos]=setTimeout(function(){clientAds.log("called anon_timeout("+pos+")");self.collapsePositionIfNoAd(pos);},this.timeoutTolerance);}}}
this.addDiagnostic(pos,{"requestUrl":URL});};FT.Advertising.prototype.foreach=function(obj,func)
{if(!obj||typeof obj==="function")
{return;}
if(obj.length)
{for(var idx=0,length=obj.length;idx<length;idx++)
{var value=typeof obj==="string"?obj.charAt(idx):obj[idx];if(func.call(this,value,idx)===false)
{break;}}}
else
{for(var prop in obj)
{if(obj.hasOwnProperty(prop))
{var what=FT.lib.type(obj[prop]);if(!what.match(/^function$/))
{if(func.call(this,prop,obj[prop])===false)
{break;}}}}}};FT.Advertising.prototype.getCookie=function(cookieName)
{var cookie=FT.cookies[cookieName];if(cookie)
{return cookie.replace(/%3D/g,"=");}
return undefined;};FT.Advertising.prototype.getAdFormat=function(pos)
{var rFormat;if(this.CONST.AdFormat[pos])
{rFormat=this.CONST.AdFormat[pos];}
else if(/\d+$/.test(pos))
{var posStem=pos.replace(/\d+$/,"");if(this.CONST.AdFormat[posStem])
{rFormat=this.CONST.AdFormat[posStem];}}
return rFormat;};FT.Advertising.prototype.setInitialAdState=function(pos,callType)
{callType=callType||'normal';this.adverts[pos]=this.adverts[pos]||{};this.adverts[pos].callType=callType;this.adverts[pos].state={'state':'init','hasDiv':false,'alwaysHide':false,'requestsInterstitial':false,'hasInterstitial':false,'isSystemDefault':false,'isEmptyAd':false,'initialHTML':''};if(pos==='refresh')
{this.adverts[pos].state.alwaysHide=true;}
var adHTML=this.getAdInnerHTML(pos);if(typeof adHTML!=='undefined')
{this.adverts[pos].state.hasDiv=true;this.adverts[pos].state.initialHTML=adHTML;}};FT.Advertising.prototype.isAdStateEmpty=function(state)
{var empty=false;if(state.isSystemDefault||state.isEmptyAd)
{if(!state.hasInterstitial)
{empty=true;}}
return empty;};FT.Advertising.prototype.shouldAdBeZeroHeight=function(state)
{var beZero=false;if(state.isSystemDefault||state.isEmptyAd)
{if(state.hasInterstitial)
{beZero=true;}}
return beZero;};FT.Advertising.prototype.createAdRequestFromVideoUrl=function(pos,url)
{this.clearBaseAdvert();this.prepareBaseAdvert(pos);var URL=this.buildURLFromBaseAdvert('videoSync');URL=URL.replace(/\?$/,'');var requestURL=url.replace(/;pos=\w+/,';pos='+pos);requestURL=requestURL.replace(/^[^\s]+;sz=\d+x\d+(,\d+x\d+){0,3}(;dcopt=ist)?/,URL);requestURL=requestURL.replace(/;tile=(\d{1,2})/,';tile='+this.baseAdvert.tile);return requestURL;};FT.Advertising.prototype.insertAdIntoIFrame=function(pos,requestURL)
{var el=this.getAdContainer(pos).div;if(!el)
{return undefined;}
var iframeId=pos+'_iframe';var html=['<iframe id="',iframeId,'"',' width="',el.clientWidth,'"',' height="',el.clientHeight,'"></iframe>'].join('');el.innerHTML=html;document.getElementById(iframeId).src=requestURL;};FT.Advertising.prototype.requestVideoSync=function(pos,url)
{if(!this.getAdFormat(pos))
{this.addDiagnostic(pos,{'requestVideoSync':'ad position not valid'});return undefined;}
this.setInitialAdState(pos);var requestURL=this.createAdRequestFromVideoUrl(pos,url);this.adverts[pos].callType='videoSync';this.addDiagnostic(pos,{inputUrl:url,requestUrl:requestURL});this.insertAdIntoIFrame(pos,requestURL);return requestURL;};FT.Advertising.prototype.endVideo=function(){return;};FT.Advertising.prototype.handleRefreshLogic=function(obj,timeout)
{clientAds.log("FT.Advertising.prototype.handleRefreshLogic("+obj.name+", "+timeout+")");timeout=timeout||30*60*1000;if((obj.name==='refresh')&&(FT.env.asset==='page'))
{obj.refreshTimer=timeout;}};FT.Advertising.prototype.checkAdState=function(pos)
{clientAds.log("FT.Advertising.prototype.checkAdState("+pos+")");this.adverts[pos]=this.adverts[pos]||{'state':{}};var rState=this.adverts[pos].state;var adHTML=this.getAdInnerHTML(pos);if(typeof adHTML!=='undefined')
{rState.hasDiv=true;rState.innerHTML=adHTML;if(rState.innerHTML!==rState.initialHTML)
{rState.state='changed';}
if(rState.state==='changed')
{if(/817-grey/.test(rState.innerHTML))
{rState.isSystemDefault=true;}
if(/ft-no-ad-/.test(rState.innerHTML))
{rState.isEmptyAd=true;}
var rRegex=new RegExp("<!--\\s*Begin Interstitial Ad\\s*-->");if(rRegex.test(rState.innerHTML))
{rState.hasInterstitial=true;}}}
clientAds.log("FT.Advertising.prototype.checkAdState("+pos+") "+[rState.state,"hasDiv: "+rState.hasDiv,"isSystemDefault: "+rState.isSystemDefault,"isEmptyAd: "+rState.isEmptyAd,"requestsInterstitial: "+rState.requestsInterstitial,"hasInterstitial: "+rState.hasInterstitial].join(", "));};FT.Advertising.prototype.collapsePositionIfNoAd=function(pos)
{clientAds.log("FT.Advertising.prototype.collapsePositionIfNoAd("+pos+")");this.checkAdState(pos);var rState=this.adverts[pos].state;if(this.shouldAdBeZeroHeight(rState))
{this.collapse(pos,true);}
else if(this.isAdStateEmpty(rState))
{this.collapse(pos);}
else if(rState.state==='init')
{this.collapse(pos);this.watchAdPosition(pos);}
else
{this.expand(pos);}};FT.Advertising.prototype.expandPositionIfAd=function(pos)
{clientAds.log("FT.Advertising.prototype.expandPositionIfAd("+pos+")");this.checkAdState(pos);var rState=this.adverts[pos].state;if(!this.isAdStateEmpty(rState))
{clientAds.log("clearing anon_interval("+pos+") - is interstitial or not system default");this.expand(pos);clearInterval(this.intervals[pos]);}};FT.Advertising.prototype.watchAdPosition=function(adPos)
{clientAds.log("FT.Advertising.prototype.watchAdPosition("+adPos+")");var self=this;var pos=adPos;clientAds.log("setting up anon_interval("+pos+") "+self.timeIntervalTolerance);self.intervals[pos]=setInterval(function()
{clientAds.log("called anon_interval("+pos+")");self.expandPositionIfAd(pos);},self.timeIntervalTolerance);};FT.Advertising.prototype.clearAllTimeouts=function()
{clientAds.log("FT.Advertising.prototype.clearAllTimeouts()");this.foreach(this.timeouts,function(pos,id){clearTimeout(id);});};FT.Advertising.prototype.clearAllIntervals=function()
{clientAds.log("FT.Advertising.prototype.clearAllIntervals()");this.foreach(this.intervals,function(pos,id){clearInterval(id);});};FT.Advertising.prototype.clearTimer=function()
{clientAds.log("FT.Advertising.prototype.clearTimer()");};FT.Advertising.prototype.complete=function()
{clientAds.log("FT.ads.complete() "+this.isComplete);if(!this.isComplete)
{if(this.adverts['refresh'])
{this.legacyAdCollapse('refresh',false);}
this.injectUnclassifiedTrackCall();this.injectUrlTrackCall();}
this.isComplete=true;};FT.Advertising.prototype.callback=function(rResponse)
{if(!rResponse||typeof rResponse!=="object"||!rResponse.name)
{clientAds.log("FT.Advertising.callback("+rResponse+") - improper");return false;}
clientAds.log("FT.Advertising.callback("+[rResponse.name,rResponse.type,rResponse.adName].join(", ")+")");this.checkAdState(rResponse.name);this.storeResponse(rResponse);if(rResponse.addNewAttributes)
{this.extendBaseAdvert(rResponse.addNewAttributes);}
if(rResponse.insertAdRequest)
{this.insertNewAd(rResponse.insertAdRequest);}
var radix;if(parseInt(rResponse.refreshTimer,radix)>0)
{this.startRefreshTimer(rResponse.refreshTimer);}
if(rResponse.type)
{switch(rResponse.type)
{case"empty":if(!this.adverts[rResponse.name].state.requestsInterstitial)
{clientAds.log("anon_timeout("+rResponse.name+") is being cancelled");clearTimeout(this.timeouts[rResponse.name]);}
this.collapse(rResponse.name);this.addDiagnostic(rResponse.name,{"collapsed":"emptyAd"});break;case"imageclick":this.renderImage(rResponse);break;default:break;}}};FT.Advertising.prototype.storeResponse=function(rResponse)
{clientAds.log("FT.Advertising.storeResponse("+[rResponse.name,rResponse.type,rResponse.adName].join(", ")+")");if(FT.lib.type(rResponse)!=="object")
{return false;}
if(FT.lib.type(this.adverts[rResponse.name])!=="object")
{this.adverts[rResponse.name]={};}
this.adverts[rResponse.name].response=rResponse;};FT.Advertising.prototype.getKeys=function(rResponse)
{var Keys=[];if(FT.lib.type(rResponse)==='object')
{this.foreach(rResponse,function(prop)
{Keys.push(prop);});}
return Keys.sort();};FT.Advertising.prototype.hasClassName=function(fullClass,className)
{var matcher=className.constructor===RegExp?className:new RegExp('^'+className+'$');var Classes=fullClass.split(' ');for(var idx=0;idx<Classes.length;++idx)
{if(Classes[idx].match(matcher)!==null)
{return true;}}
return false;};FT.Advertising.prototype.addDiagnostic=function(pos,rDiagObj)
{if(!pos)
{pos='_anonymous';}
if(FT.lib.type(pos)!=="string"||FT.lib.type(rDiagObj)!=="object")
{return false;}
clientAds.log("FT.Advertising.addDiagnostic("+pos+", "+this.getKeys(rDiagObj).join(", ")+")");if(!this.adverts[pos])
{this.adverts[pos]={"diagnostics":{}};}
this.adverts[pos].diagnostics=FT.lib.extend(this.adverts[pos].diagnostics,rDiagObj);};FT.Advertising.prototype.extendBaseAdvert=function(rResponse)
{clientAds.log("FT.Advertising.extendBaseAdvert("+rResponse+")");this.baseAdvert=FT.lib.extend(this.baseAdvert,rResponse);};FT.Advertising.prototype.insertNewAd=function(pos)
{clientAds.log("FT.Advertising.insertNewAd("+pos+")");this.extraAds.unshift(pos);this.addDiagnostic(pos,{"inserted":true});};FT.Advertising.prototype.setDefaultSiteZone=function()
{FT.env.dfp_site="ftcom.5887.unclassified";FT.env.dfp_zone="unclassified";};FT.Advertising.prototype.isUnclassified=function()
{var result=false;if((FT.env.dfp_site==="ftcom.5887.unclassified"||FT.env.dfp_site==="test.5887.unclassified")&&FT.env.dfp_zone==="unclassified")
{result=true;}
return result;};FT.Advertising.prototype.checkSiteZone=function(pos)
{var ok='default';var fix=true;var reason_why;var rFormat=this.getAdFormat(pos);var site=this.getDFPSite();if(!rFormat)
{reason_why="invalid ad slot name";fix=false;ok='invalid';}
else if(!this.detectDFPTargeting())
{reason_why="dfp_site/zone are invalid";}
else if(site.length>31)
{reason_why="DFP site name too long: "+site;}
else if(FT.env.dfp_zone.length>32)
{reason_why="DFP zone name too long: "+FT.env.dfp_zone;}
else if(site.match(/^X+$/i))
{reason_why="DFP site name is default methode metadata";}
else if(FT.env.dfp_zone.match(/^X+$/i))
{reason_why="DFP zone name is default methode metadata";}
else if(!site.match(/^\w+\.5887\.[\-\w]+$/))
{reason_why="DFP site name is not the FT network: "+site;}
else
{ok='ok';fix=false;}
if(ok!=='ok')
{this.addDiagnostic(pos,{"checkSiteZone":reason_why});}
if(fix)
{this.setDefaultSiteZone();}
return ok;};FT.Advertising.prototype.clearBaseAdvert=function()
{for(var idx=0;idx<this.CONST.KeyOrder.length;idx++)
{var keyname=this.CONST.KeyOrder[idx];if((keyname!=='tile')&&(keyname!=='ord'))
{delete this.baseAdvert[keyname];}}};FT.Advertising.prototype.prepareAdVars=function(AllVars)
{AllVars=this.stripLeadingZeros(this.CONST.leading_zero_key_names,AllVars);AllVars=this.fieldRegex(this.CONST.regex_key_names,AllVars);AllVars=this.fieldSubstr(this.CONST.substr_key_names,AllVars);AllVars=this.detectERights(AllVars);return AllVars;};FT.Advertising.prototype.erightsID=function()
{if(!FT.cookies.FT_U){return undefined;}else{var eid=FT.cookies.FT_U.match(/_EID\=(\d+)_/i);if(eid[1]){return eid[1].replace(/^0*/,"");}else{return undefined;}}};FT.Advertising.prototype.prepareUParams=function()
{var uValue='';var uOrder=this.CONST.uKeyOrder;this.foreach(uOrder,function(key){var value=this.baseAdvert[key];if(value){uValue+=!value?'':key+'='+value+',';}});var initial,remaining;var rsiSegs=this.baseAdvert.a;if(rsiSegs){initial='a='+rsiSegs.slice(0,this.CONST.audSciInitial).join(',a=')+',';remaining=rsiSegs.slice(this.CONST.audSciInitial,this.CONST.audSciMax);uValue+=initial;if(remaining.length){remaining='a='+remaining.join(',a=')+',';uValue+=remaining;}}
if(uValue!==''){uValue=uValue.slice(0,-1);if(uValue.length>this.CONST.uParamMax){this.addDiagnostic(this.baseAdvert.pos,{'uParamSizeException':'Maximum length of u ('+this.CONST.uParamMax+') exceeded. Got '+uValue.length});this.addDiagnostic(this.baseAdvert.pos,{'uParamDataLoss':'u parameter data loss ['+uValue.slice(this.CONST.uParamMax)+']'});}
return uValue;}
return undefined;};FT.Advertising.prototype.duplicateEID=function(eid)
{if(eid){var u="eid="+eid;if(u.length>this.CONST.uParamMax){this.addDiagnostic(this.baseAdvert.pos,{'uParamSizeException':'Maximum length of u ('+this.CONST.uParamMax+') exceeded. Got '+u.length});this.addDiagnostic(this.baseAdvert.pos,{'uParamDataLoss':'u parameter data loss ['+u.slice(this.CONST.uParamMax)+']'});}
return"eid="+eid;}
return undefined;};FT.Advertising.prototype.rsiSegs=function(){if(!this.suppressAudSci&&FT.cookies.rsi_segs){var results=[];this.foreach(FT.cookies.rsi_segs.split('|'),function(value){results.push(this.encodeAudSci(value));});return results;}
return undefined;};FT.Advertising.prototype.getAyscVars=function(obj){var out={};if(FT.cookies.AYSC!==undefined){var q=FT.cookies.AYSC.split("_");FT.lib.iterator(q,function(item){if(!!item)
{var m=item.match(/^(\d\d)([^_]+)/);if(m){var key=m[1];var val=m[2];out[key]=val;}}});}
return FT.lib.extend(obj,out);};FT.Advertising.prototype.prepareBaseAdvert=function(pos)
{var AllVars=this.prepareAdVars(this.getAyscVars({}));this.baseAdvert.pos=pos;this.baseAdvert.ad_server=this.adServerCountry(AllVars['15'],pos);AllVars=this.excludeFields(this.CONST.exclusions,AllVars);this.foreach(AllVars,function(ayscName,ayscVal)
{if(!ayscVal)
{return true;}
if(this.CONST.remove_exes[ayscName]&&/^x+$/i.test(ayscVal))
{return true;}
if(this.CONST.remove_res_pvt[ayscName]&&/^pvt|res$/i.test(ayscVal))
{return true;}
this.baseAdvert[ayscName]=ayscVal.toString().toLowerCase();});this.baseAdvert.a=this.rsiSegs();var rFormat=this.getAdFormat(pos);this.baseAdvert.sz=rFormat.sz;if(rFormat.dcopt){if(this.baseAdvert.hasInterstitial){this.addDiagnostic(pos,{"buildURLIst":"multiple interstitials on page, ignoring "+pos});}
else{this.baseAdvert.hasInterstitial=true;this.baseAdvert.dcopt=rFormat.dcopt;this.adverts[pos].state.requestsInterstitial=true;}}
this.baseAdvert.eid=this.erightsID();this.baseAdvert.uuid=FT.env.dfp_zone;this.baseAdvert.auuid=false;this.baseAdvert.bht=this.behaviouralFlag();if(typeof pageUUID!=='undefined')
{if(pageUUID!==null&&pageUUID!==''){this.baseAdvert.uuid=pageUUID;}}else{if(typeof getUUIDFromString==='function'){var docUUID=getUUIDFromString(document.location.toString());if(docUUID!==null&&docUUID!==''){this.baseAdvert.uuid=docUUID;}}}
if(typeof articleUUID!=='undefined')
{if(articleUUID!==null&&articleUUID!==''){this.baseAdvert.auuid=articleUUID;}}
this.baseAdvert.ts=this.getTimestamp();this.baseAdvert.u=this.prepareUParams();this.baseAdvert.dfp_site=this.getDFPSite();FT.env.dfp_site=this.baseAdvert.dfp_site;this.baseAdvert.dfp_zone=FT.env.dfp_zone;this.baseAdvert.dfp_targeting=this.getDFPTargeting();};FT.Advertising.prototype.getDFPTargeting=function(){var dfpTargeting='';if(typeof FT.env.dfp_targeting!=='undefined'){var targeting=FT.env.dfp_targeting.replace(/^;/,'').replace(/;$/,'').replace(/;;+/,';').toLowerCase();if(targeting!==''&&!/^x+$/.test(targeting)){dfpTargeting=targeting;}}
if(this.isArticle(document.location.toString())){if(!/^.*;pt=.*$/.test(FT.env.dfp_targeting)){dfpTargeting+=(dfpTargeting!=='')?';pt=art':'pt=art';}
var referrer=this.getReferrer();if(referrer!==undefined&&referrer!==''){dfpTargeting+=(dfpTargeting!=='')?';rf='+referrer:'rf='+referrer;}}
if(dfpTargeting!==''){return dfpTargeting;}
return undefined;};FT.Advertising.prototype.getReferrer=function()
{var match=null;var referrer=document.referrer;if(referrer!==''){var hostRegex=/^.*?:\/\/.*?(\/.*)$/;match=hostRegex.exec(referrer)[1];}
if(match!==null){return match.substring(1);}
return undefined;};FT.Advertising.prototype.isArticle=function(urlParam)
{var classicArticleRegex=/^.*\/cms\/s\/\d\/[0-9a-fA-F]+-[0-9a-fA-F]+-[0-9a-fA-F]+-[0-9a-fA-F]+-[0-9a-fA-F]+.html.*$/;var falconArticleRegex=/^.*;pt=art.*$/;return(classicArticleRegex.test(urlParam)||falconArticleRegex.test(FT.env.dfp_targeting));};FT.Advertising.prototype.getTimestamp=function()
{var dateToFormat=new Date();var month=dateToFormat.getMonth()+1;var day=dateToFormat.getDate();var hours=dateToFormat.getHours();var minutes=dateToFormat.getMinutes();var seconds=dateToFormat.getSeconds();if(month<10){month="0"+month;}
if(day<10){day="0"+day;}
if(hours<10){hours="0"+hours;}
if(minutes<10){minutes="0"+minutes;}
if(seconds<10){seconds="0"+seconds;}
var dateFormatted=dateToFormat.getFullYear()+""+month+""+day+""+hours+""+minutes+""+seconds;return dateFormatted;};FT.Advertising.prototype.prepareKeywordsParam=function(pos)
{var url;if(FT.env.url_location)
{url=FT.env.url_location;}
var keywords=this.getKeywordsParam(url);if(keywords)
{this.baseAdvert.kw=keywords;}};FT.Advertising.prototype.encodeBaseAdvertProperties=function(mode,vidKV)
{var results='',initial,remaining;var rsiSegs=this.baseAdvert.a;if(rsiSegs)
{initial='a='+rsiSegs.slice(0,this.CONST.audSciInitial).join(';a=');remaining=rsiSegs.slice(this.CONST.audSciInitial,this.CONST.audSciMax);if(remaining.length)
{remaining='a='+remaining.join(';a=');}}
var Order=this.CONST.KeyOrder;if(mode==='video')
{Order=this.CONST.KeyOrderVideo;}
else if(mode==='videoExtra')
{Order=this.CONST.KeyOrderVideoExtra;}
else if(mode==='videoSync')
{Order=this.CONST.KeyOrderVideoSync;}
this.foreach(Order,function(key){var value;if(typeof(this.baseAdvert[key])!='undefined')
{value=this.baseAdvert[key];}
else if((typeof(vidKV)!='undefined')&&(typeof(vidKV[key])!='undefined'))
{value=vidKV[key];}
if(key==='u'&&this.baseAdvert.dfp_targeting)
{results+=this.baseAdvert.dfp_targeting+';';}
if(rsiSegs&&key==='a')
{results+=initial+';';}
else
{results+=!value?'':key+'='+value+';';if(rsiSegs&&key==='u'&&remaining.length)
{results+=remaining+';';}}});return results.replace(/;$/,'');};FT.Advertising.prototype.cleanKeywords=function(keywords)
{keywords=unescape(keywords).toLowerCase();keywords=keywords.replace(/[';\^\+]/g,' ');keywords=keywords.replace(/\s+/g,' ');keywords=keywords.replace(/^\s+/,'');keywords=keywords.replace(/\s+$/,'');keywords=escape(keywords);keywords=keywords.replace(/\./g,'%2E');return keywords;};FT.Advertising.prototype.getKeywordsParam=function(url)
{url=url||document.location.search;var keywords="";if(url.indexOf('?')>=0)
{url=url.replace(/^[^\?]*\?/,'');var Params=url.split('&');for(var idx=0;keywords===""&&idx<Params.length;++idx)
{var Match=Params[idx].match(/^(q|s|query|queryText|searchField)=(.+)$/);if(Match)
{keywords=this.cleanKeywords(Match[2]);}}}
return keywords;};FT.Advertising.prototype.buildURLFromBaseAdvert=function(mode)
{mode=mode||'normal';var type=(mode==='video')?"/pfadx/":"/adj/";type=(mode==='videoSync')?"/adi/":type;var URL="http://"+this.baseAdvert.ad_server+type+this.baseAdvert.dfp_site+"/"+this.baseAdvert.dfp_zone+";";URL+=this.encodeBaseAdvertProperties(mode);if(mode!=='video')
{URL=URL+'?';if(this.baseAdvert.tile>16)
{this.addDiagnostic(this.baseAdvert.pos,{"buildURLFromBaseAdvert":"too many ads, exceeds maximum tile"});URL=undefined;}
this.baseAdvert.tile++;}
return URL;};FT.Advertising.prototype.buildURL=function(pos)
{var URL;clientAds.log("FT.Advertising.buildURL("+pos+")");if(this.checkSiteZone(pos)==='invalid')
{return URL;}
this.clearBaseAdvert();this.prepareBaseAdvert(pos);this.prepareKeywordsParam();URL=this.buildURLFromBaseAdvert();return URL;};FT.Advertising.prototype.buildURLForVideo=function(zone,pos,vidKV)
{pos=pos||'video';vidKV=vidKV||{};var mode='video';var URL;FT.env.dfp_zone=zone;if(this.checkSiteZone(pos)==='invalid')
{return URL;}
this.adverts[pos]=this.adverts[pos]||{};this.adverts[pos].callType=mode;this.clearBaseAdvert();this.prepareBaseAdvert(pos);URL=this.buildURLFromBaseAdvert(mode);var result={urlStem:URL,additionalAdTargetingParams:this.encodeBaseAdvertProperties('videoExtra',vidKV)};this.addDiagnostic(pos,result);return result;};FT.Advertising.prototype.requestInsertedAds=function()
{clientAds.log("FT.Advertising.requestInsertedAds()");var advert=this.extraAds.shift();while(advert)
{this.request(advert);advert=this.extraAds.shift();}};FT.Advertising.prototype.requestNewssubs=function()
{this.request('newssubs');};FT.Advertising.prototype.collapse=function(pos,zeroHeight)
{var why=zeroHeight?"no ad booked but interstitial present":"no ad booked";why=this.adverts[pos].state.alwaysHide?'position is always hidden':why;clientAds.log("FT.Advertising.collapse("+pos+", "+zeroHeight+") - "+why);var doCollapse=this.legacyAdCollapse(pos,zeroHeight);if(doCollapse)
{var adContainer=this.getAdContainer(pos);if(adContainer.div)
{if(zeroHeight)
{adContainer.div.style.display="block";}
else
{adContainer.div.style.display="none";}
if(typeof(FT.lib.addClassName)!=="function")
{$(document.body).addClass("no-"+adContainer.name);}
else
{FT.lib.addClassName(document.body,"no-"+adContainer.name);}}}
else
{why="collapse prevented by legacy handler";}
this.addDiagnostic(pos,{"collapsed":why});};FT.Advertising.prototype.setZeroHeight=function(pos,id)
{var rDiv=document.getElementById(id);if(rDiv)
{rDiv.style.height='0px';rDiv.style.padding='0px';}
else
{clientAds.log("FT.Advertising.setZeroHeight("+id+") - div not found");this.addDiagnostic(pos,{"setZeroHeight":"div not found: "+id});}};FT.Advertising.prototype.legacyAdCollapse=function(pos,zeroHeight)
{var doCollapse=true;if(FT.env.isLegacyAPI)
{if(this.adverts[pos].state.alwaysHide)
{clientAds.log("FT.Advertising.legacyAdCollapse("+pos+", "+zeroHeight+") for "+this.library+" always hide");var rDiv=document.getElementById('ad-container-'+pos);if(rDiv)
{rDiv.style.display='none';}}
if(pos==='lhn')
{doCollapse=false;}
if(pos==='banlb')
{clientAds.log("FT.Advertising.legacyAdCollapse("+pos+", "+zeroHeight+") for "+this.library);var rLeaderBoard=document.getElementById('leaderboard');if(rLeaderBoard)
{rLeaderBoard.style.minHeight=0;}
var Divs=['ad-placeholder-banlb','page-header-ad'];for(var idx=0;idx<Divs.length;++idx)
{this.setZeroHeight(pos,Divs[idx]);}}}
if(!doCollapse)
{clientAds.log("FT.Advertising.legacyAdCollapse("+pos+", "+zeroHeight+") for "+this.library+" ad position collapse prevented");}
return doCollapse;};FT.Advertising.prototype.legacyAdFixup=function(pos,adContainer)
{if(this.library==='ftcombase'&&adContainer.div.id==='ad-placeholder-hlfmpu')
{clientAds.log("FT.Advertising.legacyAdFixup("+pos+", "+adContainer.div.id+") for "+this.library);adContainer.div.style.padding="14px 0 14px 0";adContainer.div.style.marginBottom=15+"px";adContainer.div.style.border="solid 1px #999";}
if(this.library==='phoenix'&&adContainer.div.id==='ad-placeholder-hlfmpu')
{clientAds.log("FT.Advertising.legacyAdFixup("+pos+", "+adContainer.div.id+") for "+this.library);adContainer.div.style.padding="14px 0 14px 0";adContainer.div.style.marginBottom=15+"px";adContainer.div.style.marginLeft=0;adContainer.div.style.paddingLeft=0;}
if(this.library==='ftcombase'&&adContainer.div.id==='ad-placeholder-tradcent')
{clientAds.log("FT.Advertising.legacyAdFixup("+pos+", "+adContainer.div.id+") for "+this.library);adContainer.div.style.marginBottom=15+"px";}
if(this.library==='ftcombase'&&adContainer.div.id==='ad-placeholder-tlbxrib')
{clientAds.log("FT.Advertising.legacyAdFixup("+pos+", "+adContainer.div.id+") for "+this.library);adContainer.div.style.marginBottom=15+"px";}
if(this.library==='ftcombase'&&adContainer.div.id==='ad-placeholder-marketingrib')
{clientAds.log("FT.Advertising.legacyAdFixup("+pos+", "+adContainer.div.id+") for "+this.library);adContainer.div.className="";adContainer.div.style.marginBottom=15+"px";}};FT.Advertising.prototype.expand=function(pos)
{clientAds.log("FT.Advertising.expand("+pos+")");var adContainer=this.getAdContainer(pos);if(adContainer.div)
{this.legacyAdFixup(pos,adContainer);if(!adContainer.div.className.match(/\bhidden\b/))
{adContainer.div.style.display="block";}
if(typeof(FT.lib.removeClassName)!=="function")
{$(document.body).removeClass("no-"+adContainer.name);}
else
{FT.lib.removeClassName(document.body,"no-"+adContainer.name);}}};FT.Advertising.prototype.getNamedAdContainer=function(idDiv,pos)
{clientAds.log("FT.Advertising.getNamedAdContainer("+idDiv+") -- looking");var rDiv=document.getElementById(idDiv);clientAds.log("FT.Advertising.getNamedAdContainer("+idDiv+") -- got -- "+rDiv);if(rDiv)
{clientAds.log("FT.Advertising.getNamedAdContainer("+idDiv+")");var ancestorLimit=3;var ancestorCount=0;var el=rDiv;var rOriginalDiv=rDiv;while(ancestorCount<=ancestorLimit&&typeof el.className==="string"&&this.hasAdClass(el,pos)===false)
{el=el.parentNode;ancestorCount++;}
rDiv=(el.className&&this.hasAdClass(el,pos)===true)?el:rOriginalDiv;}
return rDiv;};FT.Advertising.prototype.getAdContainer=function(pos)
{var AdContainers=this.getAdContainers(pos);if(AdContainers.length===0)
{this.addDiagnostic(pos,{"getAdContainer":'div not found'});AdContainers=[{'div':null,'name':null}];}
return AdContainers[0];};FT.Advertising.prototype.getAdContainers=function(pos)
{var AdContainers=[];var stop=FT.env.isLegacyAPI?this.CONST.proxy_div_prefixes.length:1;for(var idx=0;idx<stop;++idx)
{var idDiv=this.CONST.proxy_div_prefixes[idx]+pos;if(FT.env.isLegacyAPI&&idDiv==='lhn')
{continue;}
var adElement=this.getNamedAdContainer(idDiv,pos);if(adElement)
{AdContainers.push({'div':adElement,'name':idDiv});}}
return AdContainers;};FT.Advertising.prototype.getAdInnerHTML=function(pos)
{var html=undefined;var AdContainers=this.getAdContainers(pos);if(AdContainers.length!==0)
{html='';this.foreach(AdContainers,function(rAdContainer)
{if(html.length)
{html=html+"\n";}
html=html+"<!-- "+rAdContainer.name+" -->\n"+rAdContainer.div.innerHTML;});}
else
{this.addDiagnostic(pos,{"getAdInnerHTML":'div not found'});}
return html;};FT.Advertising.prototype.hasAdClass=function(rElement,pos)
{clientAds.log("FT.Advertising.hasAdClass("+rElement+")");if(FT.env.isLegacyAPI)
{if(this.hasClassName(rElement.className,new RegExp('^ad-(container|placeholder)(-'+pos+')?$')))
{return true;}}
else if(this.hasClassName(rElement.className,'advertising'))
{return true;}
return false;};FT.Advertising.prototype.startRefreshTimer=function(delay)
{clientAds.log("FT.Advertising.startRefreshTimer("+delay+")");this.refreshTimer=setTimeout(function(){clientAds.log("refreshTimer callback()");doTrackRefresh(delay);},delay);};FT.Advertising.prototype.renderImage=function(rResponse)
{clientAds.log("FT.Advertising.renderImage("+rResponse+")");if(FT.lib.type(rResponse)!=="object"||!rResponse.content||!rResponse.content.clickURL||!rResponse.content.imageURL)
{this.addDiagnostic(rResponse.name,{"noImageClickContent":true});return false;}
var rDiv=document.getElementById(rResponse.name);if(!rDiv)
{this.addDiagnostic(rResponse.name,{"noTargetDiv":true});return false;}
var link=document.createElement("a");link.href=rResponse.content.clickURL;link.target="_blank";var img=document.createElement("img");if(rResponse.content.altText)
{img.alt=rResponse.content.altText;}
if(rResponse.content.width)
{img.width=rResponse.content.width;}
if(rResponse.content.height)
{img.height=rResponse.content.height;}
img.src=rResponse.content.imageURL;link.appendChild(img);var imageclickPlaceholderId=rResponse.name+"_imageclick_placeholder";var doc=document;doc.write('<span style="display:none" id="'+imageclickPlaceholderId+'"></span>');var imageclickPlaceholderDiv=document.getElementById(imageclickPlaceholderId);if(imageclickPlaceholderDiv.parentNode.insertBefore(link,imageclickPlaceholderDiv))
{this.addDiagnostic(rResponse.name,{"rendered":"fromJSON"});}
imageclickPlaceholderDiv.parentNode.removeChild(imageclickPlaceholderDiv);if(rResponse.content.height&&img.height<rDiv.offsetHeight)
{link.style.marginTop=((rDiv.offsetHeight-img.height)/2)+"px";link.style.display="block";this.addDiagnostic(rResponse.name,{"verticallyAligned":true});}
this.expand(rResponse.name);};FT.Advertising.prototype.toBase36=function(value)
{return parseInt(value,10).toString(36);};FT.Advertising.prototype.fromBase36=function(value)
{return parseInt(value,36);};FT.Advertising.prototype.encodeAudSci=function(value)
{var rsiSeg=value.match(/^([A-L]\d{5})_(\d{5})$/i);if(rsiSeg){var segment=parseInt(rsiSeg[2],10)-10000;if(/^J07717$/i.test(rsiSeg[1])){return'z'+segment;}else{return rsiSeg[1].charAt(0).toLowerCase()+this.toBase36(segment+rsiSeg[1].substring(1));}}
return value.toUpperCase();};FT.Advertising.prototype.decodeAudSci=function(value)
{if(value.charAt(0).toLowerCase()==='z')
{return"J07717_"+(parseInt(value.substring(1),10)+10000);}
else
{var rsiSeg=this.fromBase36(value.substring(1)).toString();var segment=parseInt(rsiSeg.slice(0,-5),10)+10000;var clientId=value.charAt(0).toUpperCase()+rsiSeg.substring(rsiSeg.length-5);return clientId+'_'+segment;}};FT.Advertising.prototype.beginNewPage=function(env)
{clientAds.log("FT.Advertising.beginNewPage()");env=env||FT.env;this.baseAdvert={};this.baseAdvert.ord=Math.floor(Math.random()*1E16);this.baseAdvert.tile=1;this.extraAds=[];var VideoAds=this.getVideoAdverts();var VideoSyncAds=this.getVideoSyncAdverts();if(VideoAds.length||VideoSyncAds.length)
{this.foreach(VideoAds,function(pos){delete this.adverts[pos];});this.foreach(VideoSyncAds,function(pos){delete this.adverts[pos];});}
else
{this.adverts={};}
this.isComplete=false;this.timeouts={};this.intervals={};this.runinterval=undefined;this.refreshTimer=null;this.timeoutTolerance=FT.env.timeoutTolerance||25;this.timeIntervalTolerance=FT.env.timeIntervalTolerance||300;this.suppressAudSci=false;var cookie=this.getCookie('FTQA');if(cookie)
{var Match=cookie.match(/timeout=(\d+)/);if(Match)
{this.timeoutTolerance=Match[1];}
Match=cookie.match(/interval=(\d+)/);if(Match)
{this.timeIntervalTolerance=Match[1];}
Match=cookie.match(/longest_url=(\d+)-(\d+)/);if(Match)
{this.CONST.urlThreshold=Match[1];this.CONST.urlThresholdMax=Match[2];}
Match=cookie.match(/ord=(\d+)/);if(Match)
{this.baseAdvert.ord=Match[1];}
Match=cookie.match(/noaudsci/);if(Match)
{this.suppressAudSci=true;}
clientAds.log("Configured from Cookies:");clientAds.log("timeoutTolerance: "+this.timeoutTolerance);clientAds.log("timeIntervalTolerance: "+this.timeIntervalTolerance);clientAds.log("urlThreshold: "+this.CONST.urlThreshold);clientAds.log("urlThresholdMax: "+this.CONST.urlThresholdMax);clientAds.log("ord: "+this.baseAdvert.ord);clientAds.log("noaudsci: "+this.suppressAudSci);}
this.baseAdvert.hasInterstitial=false;this.submitToTrack=false;this.useDFP=true;this.library="ftcombase";env.useDFP=true;};FT.Advertising.prototype.resetLibrary=function()
{this.beginNewPage();this.adverts={};};FT.Advertising.prototype.checkAdServerCountry=function(iso2)
{return this.CONST.AD_SERVERS.test(iso2);};FT.Advertising.prototype.adServerCountry=function(code,pos)
{var server='';if(code)
{code=code.toLowerCase();if(this.checkAdServerCountry(code))
{code=code.toLowerCase();server=code+'.';}
else if(code==='gb'||code==='gg'||code==='im'||code==='je')
{server='uk.';}
else
{this.addDiagnostic(pos,{"adServerCountry":"Unsupported ad server: "+code});}}
return'ad.'+server+'doubleclick.net';};FT.Advertising.prototype.detectERights=function(obj)
{if(FT.cookies.FT_U!==undefined)
{var erights=FT.cookies.FT_U.split("=");var keyname=erights[0];var val=erights[1];if((keyname!==undefined)&&(val===undefined))
{obj[keyname]=val;obj.u=erights;}}
return obj;};FT.Advertising.prototype.behaviouralFlag=function()
{var flag=(typeof(this.rsiSegs())==="undefined")?"false":"true";return flag;}
FT.Advertising.prototype.excludeFields=function(exclusions,obj)
{this.foreach(obj,function(prop)
{for(var idx=0;idx<exclusions.length;idx++)
{var keyvalsplit=exclusions[idx].split("=");if(((keyvalsplit[0]==="key")&&(prop===keyvalsplit[1]))||((keyvalsplit[0]==="val")&&(obj[prop]===keyvalsplit[1])))
{delete obj[prop];}}});return obj;};FT.Advertising.prototype.stripLeadingZeros=function(KeysToStrip,obj)
{for(var idx=0,length=KeysToStrip.length;idx<length;idx++)
{if(obj[KeysToStrip[idx]])
{obj[KeysToStrip[idx]]=obj[KeysToStrip[idx]].replace(/^0+/,"");}}
return obj;};FT.Advertising.prototype.fieldRegex=function(RegexKeyNames,obj)
{this.foreach(RegexKeyNames,function(keyName)
{var value=obj[keyName];if(value!==undefined)
{this.foreach(this.CONST.SubsLevelReplaceLookup,function(replaceValue,regex)
{if(value.match(regex)){obj.slv=replaceValue;}});}});return obj;};FT.Advertising.prototype.fieldSubstr=function(SubStrKeyNames,obj)
{this.foreach(SubStrKeyNames,function(keyName)
{var SubStrItems=keyName.split("=");var ayscField=SubStrItems[0];var val=obj[ayscField];if(val!==undefined)
{var newField=SubStrItems[3];obj[newField]=val.substring(SubStrItems[1],SubStrItems[2]);}});return obj;};FT.Advertising.prototype.getDFPSite=function()
{var site=FT.env.dfp_site;if(FT.Properties&&FT.Properties.ENV)
{var env=FT.Properties.ENV.toLowerCase();var cookie=this.getCookie('FTQA');if(cookie)
{if(cookie.match(/env=live/))
{env='live';clientAds.log("FTQA cookie has set ads from live environment");this.addDiagnostic(this.baseAdvert.pos,{"getDFPSite":"using FTQA cookie to set ads from live environment"});}
if(cookie.match(/env=nolive/))
{env='ci';clientAds.log("using FTQA cookie has set ads from non-live environment");this.addDiagnostic(this.baseAdvert.pos,{"getDFPSite":"using FTQA cookie to set ads from non-live environment"});}}
if(env!=='p'&&!env.match(/^live/))
{site=site.replace(/^\w+\./,"test.");}}
return site;};FT.Advertising.prototype.showDiagnostics=function(pos)
{var FullDiagnosis=["FT.ads.showDiagnostics:\n"];var AdPositions=this.getKeys(this.adverts);this.foreach(AdPositions,function(adPos)
{var thisAdvert=this.adverts[adPos];if(typeof thisAdvert==='object'&&(!pos||adPos===pos))
{var Diagnosis=[];if(thisAdvert.diagnostics)
{var rDiagnostics=thisAdvert.diagnostics;var Topics=this.getKeys(rDiagnostics);this.foreach(Topics,function(topic)
{if(typeof rDiagnostics[topic]!=='function')
{Diagnosis.push("   "+topic+": "+rDiagnostics[topic]);}});}
var diagnosis=Diagnosis.join("\n");if(diagnosis.length)
{if(!adPos.match(/^_/))
{adPos=adPos+" Ad Call";if(thisAdvert.response&&thisAdvert.response.adName)
{diagnosis="   "+thisAdvert.response.adName+"\n"+diagnosis;}}
FullDiagnosis.push(adPos+":\n"+diagnosis+"\n");}}});return FullDiagnosis.join("\n");};FT.Advertising.prototype.breakout=function(rResponse)
{var pause=true;var cookie=this.getCookie('FTQA');if(cookie){if(rResponse&&rResponse.name)
{pause=false;var break_if='breakout='+rResponse.name;if(cookie&&(cookie.match(/breakout=all/)||cookie.indexOf(break_if)>=0))
{pause=true;}}
if(pause)
{debugger;}}};FT.Advertising.prototype.detectDFPTargeting=function(env)
{env=env||FT.env;return env.dfp_site&&env.dfp_zone?true:false;};FT.Advertising.prototype.detectAdMode=function(env)
{env=env||FT.env;env.useDFP=true;return env.useDFP;};FT.Advertising.prototype.initDFP=function(env)
{clientAds.log("FT.Advertising.initDFP() - top");env=env||FT.env;this.hasCalledInitDFP=true;if(typeof(env.useDFP)!=='undefined')
{this.beginNewPage(env);}
else
{env.useDFP=true;clientAds.log("FT.ads.initDFP() - setup DFP");FT.Advertising.prototype.request=FT.Advertising.prototype.requestDFP;this.beginNewPage(env);}};FT.Advertising.prototype.getLongestUrl=function()
{var AdPositions=this.getKeys(this.adverts);var longestRequestUrl;var longestRequestUrlLength=0;this.foreach(AdPositions,function(pos)
{var thisAdvert=this.adverts[pos];if(typeof(thisAdvert)==='object')
{var rDiagnostics=thisAdvert.diagnostics;if(rDiagnostics&&rDiagnostics.requestUrl)
{var requestUrl=rDiagnostics.requestUrl.replace(/^http:\/\/[^\/]+\.net/,'');if(requestUrl.length>longestRequestUrlLength)
{longestRequestUrlLength=requestUrl.length;longestRequestUrl=requestUrl;}}}});return longestRequestUrl;};FT.Advertising.prototype.shouldSubmitToTrack=function()
{if(!this.submitToTrack)
{var rnd=Math.floor(Math.random()*this.CONST.urlThresholdMax);if(rnd<this.CONST.urlThreshold)
{this.submitToTrack=true;}}
return this.submitToTrack;};FT.Advertising.prototype.checkSubmitLongestUrl=function()
{if(this.shouldSubmitToTrack())
{return this.getLongestUrl();}
else
{return undefined;}};FT.Advertising.prototype.injectUrlTrackCall=function()
{var url=this.checkSubmitLongestUrl();if(url&&document.createElement)
{clientAds.log("Injecting call to track long URL:"+url);var rImg=document.createElement("img");rImg.src=this.CONST.trackUrl+"?long_url="+url;rImg.id="injectUrlTrackCall";rImg.setAttribute("style","display:none");document.getElementsByTagName("body")[0].appendChild(rImg);}
return url;};FT.Advertising.prototype.injectUnclassifiedTrackCall=function()
{var url;if(this.isUnclassified())
{if(this.shouldSubmitToTrack()&&document.createElement)
{url=document.location;clientAds.log("Injecting call to track unclassified page URL:"+url);var rImg=document.createElement("img");rImg.src=this.CONST.trackUrl+"?unclassified="+url;rImg.id="injectUnclassifiedTrackCall";rImg.setAttribute("style","display:none");document.getElementsByTagName("body")[0].appendChild(rImg);}}
return url;};var AD_BANLB='banlb';var AD_NEWSSUBS='newssubs';var AD_MPU='mpu';var AD_HLFMPU="hlfmpu";var AD_MPUSKY="mpusky";var AD_OOB='oob';var AD_CORPPOP='corppop';var AD_REFRESH='refresh';var AD_TLBXRIB="tlbxrib";var AD_MARKETINGRIB="marketingrib";var AD_INTRO="intro";var AD_TRADCENT="tradcent";var AD_DOUBLET="doublet";var AD_WDESKY="wdesky";var AD_LHN="lhn";var AD_MACROAD="deadA";var AD_HMMPU="deadB";var AD_MARKETING="deadC";var AD_NRWSKY="deadD";var AD_ARTBOX="deadE";var AD_FTHBOX="deadF";var AD_TLBX="deadG";var AD_FMBUT2="deadH";var AD_MKTBX="deadI";var AD_POP="deadJ";var AD_BXBAR="deadK";var AD_DKTALRT="deadL";var AD_DSKTICK="deadM";var AD_PRNT="deadN";var AD_INV="deadO";var AD_MBATOP="deadP";var AD_MBABOT="deadQ";var AD_MBALINK="deadR";var AD_SBHEAD="deadS";var AD_FTNT="deadT";var AD_1x1="deadU";var AD_CURRCON="deadV";var AD_CURRBOX="deadW";clientAds={'debug':null,'render':function(pos)
{if(pos)
{this.log('clientAds.render('+pos+') = NOP');}
else
{this.log('clientAds.render('+pos+') = FT.ads.requestInsertedAds() '+(FT.env.useDFP?'[DFP]':'[DE]'));FT.ads.requestInsertedAds();FT.ads.complete();}},'fetch':function(pos)
{this.log('clientAds.fetch('+pos+') = NOP');},'log':function(msg){if(this.debug===null)
{this.debug=false;if(FT.cookies.FTQA&&FT.cookies.FTQA.match(/debug/))
{this.debug=true;}}
if(this.debug)
{if(window.console&&window.console.log)
{window.console.log(msg);}
else if(window.opera)
{window.opera.postError(msg);}}},'showCookies':function(reKeys)
{return"Cookies:\n"+document.cookie.split(';').sort().join(";\n");}};function Advert(pos)
{clientAds.log('new Advert('+pos+')');FT.env.isLegacyAPI=true;var obj={'name':pos,'init':function()
{clientAds.log('Advert.init('+this.name+') = FT.ads.request('+this.name+') '+(FT.env.useDFP?'[DFP]':'[DE]'));FT.ads.request(this.name);}};if(!FT.ads.hasCalledInitDFP)
{FT.ads.initDFP();}
return obj;}
FT.Advertising.prototype.VERSION="Live $Rev: 97578 $";FT.Advertising.prototype.library="ftcombase";clientAds.log("DFP Ads: "+FT.Advertising.prototype.library.toUpperCase()+" "+FT.Advertising.prototype.VERSION);