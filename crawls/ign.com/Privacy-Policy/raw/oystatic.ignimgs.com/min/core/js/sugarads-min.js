SugarAds={adDivCssClassName:"sugarad",adDivIdPrefix:"sugarad-",adIframeIdSuffix:"-iframe",analytics:!1,fifurl:"/sugarfif.html?9",urlRandLength:12,urlRandNum:0,adsData:{},adCreatives:{},adJsUrls:{},stitialOverlayId:"sugarad-stitial-overlay",stitialHtmlElementClass:"sugarad-stitial-open",stitialTimeout:18E3,stitialAdType:!1,adServer:"ignadwrapper",dfp:{getUrl:function(a){slot2=slot1="";dfpAdUnit1="IGN";if(a.adsData.channel_id){switch(a.adsData.channel_id){case "58":dfpAdUnit2="homepage";break;case "568":dfpAdUnit2=
"blogs";break;case "472":dfpAdUnit2="bluray";break;case "541":dfpAdUnit2="comics";break;case "72":dfpAdUnit2="dvd";break;case "66":dfpAdUnit2="movies";break;case "241":dfpAdUnit2="music";break;case "566":dfpAdUnit2="my_ign";break;case "59":dfpAdUnit2="pc";break;case "515":dfpAdUnit2="psp";break;case "70":dfpAdUnit2="ps2";break;case "543":dfpAdUnit2="ps3";break;case "557":dfpAdUnit2="stars";break;case "550":dfpAdUnit2="tv";break;case "549":dfpAdUnit2="videos";break;case "547":dfpAdUnit2="wii";break;
case "256":dfpAdUnit2="wireless";break;case "73":dfpAdUnit2="xbox";break;case "542":dfpAdUnit2="xbox_360";break;case "532":dfpAdUnit2="ds";break;case "573":dfpAdUnit2="vita";break;case "544":dfpAdUnit2="xbox_live";break;case "500":dfpAdUnit1="GAMESPY";dfpAdUnit2="Homepage";break;case "508":dfpAdUnit1="GAMESPY";dfpAdUnit2="";break;default:dfpAdUnit2=""}"gamespy"==a.adsData.network&&(dfpAdUnit1="GAMESPY",dfpAdUnit2="");channel_id=a.adsData.channel_id}else dfpAdUnit1="IGN",channel_id=a.adsData.resource?
dfpAdUnit2=a.adsData.resource:dfpAdUnit2=a.adsData.route;if(""!=document.referrer)var b="",b=/(.+)\.ign\.com/.test(document.referrer.split("/")[2])?"ign.com":/(.+)\.gamespy\.com/.test(document.referrer.split("/")[2])?"gamespy.com":escape(document.referrer);else b="none";googletag.pubads().setTargeting("r",b);b=document.location;if(-1!=b.search.indexOf("special"))for(var c=b.search.substr(1).split("&"),b=0,d=c.length;b<d;b++)-1!=c[b].indexOf("special")?(url=c[b].split("=")[1],googletag.pubads().setTargeting("special",
url)):(url=c[b].split("=")[1],googletag.pubads().setTargeting("extras",url));for(k in a.adsData)googletag.pubads().setTargeting(k,a.adsData[k].toString());c=[];b=document.cookie.indexOf("rsi_segs=");if(0<=b&&(b=document.cookie.indexOf("=",b)+1,0<b)){c=document.cookie.indexOf(";",b);if(-1==c)c=document.cookie.length;c=document.cookie.substring(b,c).split("|")}var d=20,e=[];if(c.length<d)d=c.length;for(b=0;b<d;b++)e.push(c[b]);googletag.pubads().setTargeting("rsi_segs",e.join());dfpAdUnits=""!=dfpAdUnit2?
"/5691/"+dfpAdUnit1+"/"+dfpAdUnit2:"/5691/"+dfpAdUnit1;googletag.defineOutOfPageSlot(dfpAdUnits,"sugarad-1x1").addService(googletag.pubads());googletag.defineSlot(dfpAdUnits,[[728,90]],"sugarad-728x90").addService(googletag.pubads()).setTargeting("pos","top");googletag.defineSlot(dfpAdUnits,[[300,250]],"sugarad-300x250").addService(googletag.pubads()).setTargeting("pos","top");googletag.defineSlot(dfpAdUnits,[[300,100]],"sugarad-300x100").addService(googletag.pubads());googletag.defineSlot(dfpAdUnits,
[[300,250]],"sugarad-side300x250").addService(googletag.pubads()).setTargeting("pos","bottom");googletag.defineSlot(dfpAdUnits,[[728,90]],"sugarad-s728x90").addService(googletag.pubads()).setTargeting("pos","bottom");googletag.pubads().enableSyncRendering();googletag.pubads().enableSingleRequest();googletag.enableServices();window.ord||Math.random();if("undefined"==typeof f)var f=Math.floor(1E10*Math.random());var g="undefined"==typeof g?"dcopt=ist;":"";if("undefined"==typeof h)var h=1;else h++;b=
[];switch(channel_id){case "tech":slot1="IGN";slot2="";b[0]="channel_id="+a.adsData.channel_id+";gob_id="+a.adsData.gob_id+";network_id="+a.adsData.network_id+";page_type="+a.adsData.page_type+";pagetype="+a.adsData.pagetype+";";break;case "275":slot1="GAMESTATS";slot2="";b[0]="channel_id="+a.adsData.channel_id+";gob_id="+a.adsData.gob_id+";network_id="+a.adsData.network_id+";page_type="+a.adsData.page_type+";pagetype="+a.adsData.pagetype+";";jQuery("#sugarad-728x90").html('<iframe src="http://ad.doubleclick.net/N5691/adi/'+
slot1+"/"+slot2+";"+b[0]+";sz=728x90;pos=top;tile="+h+";ord="+f+'?" width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>');jQuery("#sugarad-300x250").html('<iframe src="http://ad.doubleclick.net/N5691/adi/'+slot1+"/"+slot2+";"+b[1]+";sz=300x250;pos=top;tile="+h+";ord="+f+'?" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>');break;default:slot1="ugo.ugo.games",
slot2="games-index",b[0]="dev=false;pt=mainpage;river=true;rb=true;"+g,b[1]="dev=false;pt=mainpage;river=true;rb=true;"+g,b[2]="dev=false;pt=mainpage;river=true;rb=true;"+g}},jsonpCallback:function(){return function(){}}},adServers:{ignadwrapper:{getUrl:function(a,b){var c=a.adsData,d="http://wrapper.ign.com/services/ads/pagetype/"+c.pagetype+"/sizes/"+b.toString()+".js?callback=?",e=document.location;if(-1!=e.search.indexOf("special"))for(var f=e.search.substr(1).split("&"),g=0,h=f.length;g<h;g++)-1!=
f[g].indexOf("special")&&(d+="&"+f[g]);""!=e&&(d+="&url="+encodeURIComponent(e));for(var i in c)if("pagetype"!=i)if(e=c[i],a._isArray(e)){g=0;for(h=e.length;g<h;g++)d+="&"+i+"="+encodeURIComponent(e[g])}else d+="&"+i+"="+encodeURIComponent(e);c=document.referrer;""!=c&&(d+="&r="+encodeURIComponent(c));return d},jsonpCallback:function(a,b){return function(c){for(var d=0,e=c.length;d<e;d++)if("stitial"==c[d].size.substr(-7)){var f=/^\s*$/;!1==c[d].impressionTracker&&!0!==f.test(c[d].creative)?(a.stitialAdType=
"prestitial",a.adCreatives.prestitial=c[d].creative):a.adCreatives.prestitial=""}else a.adCreatives[c[d].size]=c[d].creative;a._fetchAdsCallback(b)}}},freewheel:{getUrl:function(a){var b=a.adsData,c="http://1ee2c.v.fwmrm.net//ad//g//1?flag=ptil&nw=126511&pvrn="+Math.floor(1E5*Math.random()),c=c+"&csid=m_ign.com&resp=json&cbfn=?;;ptgt=s&envp=g_js&slau=320x50_Mobile_Display|300x50_Mobile_Display&cd=320,50|300,50slot&w=320&h=50",d;for(d in b){var e=b[d];if(a._isArray(e))for(var f=0,g=e.length;f<g;f++)c+=
"&"+d+"="+encodeURIComponent(e[f]);else c+="&"+d+"="+encodeURIComponent(e)}return c},jsonpCallback:function(a,b){return function(c){if(c.ads.ads[0].creatives[0].creativeRenditions[0].asset.content){var d="",e=c.siteSection.adSlots[0].selectedAds[0].eventCallbacks;if(e)for(var f=0,g=e.length;f<g;f++)if("defaultImpression"==e[f].name){d='var i = new Image();i.src = "'+e[f].url+'";';break}a.adCreatives[b[0]]='<script type="text/javascript">'+c.ads.ads[0].creatives[0].creativeRenditions[0].asset.content+
d+"<\/script>"}a._fetchAdsCallback(b)}}}},renderAds:function(a){"string"==typeof a&&(a=Array(a));!1!=this.adServer?this._renderAdCreatives(a):this._renderAdJsUrls(a)},showStitial:function(){var a=document.getElementsByTagName("html")[0],b=document.getElementById(this.stitialOverlayId);a.className=this.stitialHtmlElementClass;b.style.display="block";this.stitialSetTimeout=setTimeout(function(a){return function(){a.hideStitial()}}(this),this.stitialTimeout)},hideStitial:function(){clearTimeout(this.stitialSetTimeout);
var a=document.getElementsByTagName("html")[0],b=document.getElementById(this.stitialOverlayId);a.className="";b.style.display="none";this.renderAdsDelayedByStitial()},renderAdsDelayedByStitial:function(){},setFifDim:function(a,b,c){if("number"==typeof b&&"number"==typeof c)a.style.cssText+=";width:"+b+"px;height:"+c+"px;",a.parentNode.style.cssText=";width:"+b+"px;height:auto;"+(0==b&&0==c?"display:none;":"")},fifOnload:function(a){var b=(new Date).getTime();this.analytics&&_gaq.push(["_trackEvent",
"Sugar Ads",a.frameElement.adtype,a.frameElement.adjsurl,b-a.sugarTimerStart])},_flushAndPlaceAds:function(a){for(var b=0,c=a.length;b<c;b++){var d=a[b];!1==this.adServer&&!(d in this.adJsUrls)?this._warn('Failed to render sugar ad. No ad js url has been defined for ad type "'+d+'".'):!1!=this.adServer&&!(d in this.adCreatives)?this._warn('Failed to render sugar ad. No ad creative has been defined for ad type "'+d+'".'):this._createAndAppendFriendlyIframe(d)}},_createAndAppendFriendlyIframe:function(a){var b=
this.adDivIdPrefix+a,c=document.getElementById(b);if("undefined"==typeof c||null==c)return this._warn('Failed to render sugar ad. No dom element with id "'+b+'" exists.'),!1;var d=document.getElementById(b+this.adIframeIdSuffix);if("undefined"!=typeof d&&null!=d)c.style.height=d.offsetHeight+"px";c.innerHTML="";if(!1!=this.adServer&&""==this.adCreatives[a])delete this.adCreatives[a];else{b+=this.adIframeIdSuffix;d=document.createElement("iframe");d.id=b;d.name=b;d.src=this.fifurl;d.style.border="none";
d.style.width=c.offsetWidth+"px";d.style.height=c.offsetHeight+"px";d.scrolling="no";d.seamless="seamless";d.adtype=a;!1!=this.adServer?(d.adcreative=this.adCreatives[a],delete this.adCreatives[a]):d.adjsurl=this.adJsUrls[a];if(-1!=navigator.userAgent.indexOf("MSIE"))d.frameBorder="0",d.allowTransparency="true";c.appendChild(d)}},_renderAdCreatives:function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]in this.adCreatives||b.push(a[c]);("undefined"!=typeof this.adsData.channel_id||"undefined"!=typeof this.adsData.route||
"undefined"!=typeof this.adsData.resource)&&"undefined"!=typeof this.adServer&&"freewheel"!=this.adServer?this.dfp.getUrl(this,b):0<b.length?this._jsonp(this.adServers[this.adServer].getUrl(this,b),this.adServers[this.adServer].jsonpCallback(this,a)):this._fetchAdsCallback(a)},_renderAdJsUrls:function(a){this._randomizeAdJsUrls();this._flushAndPlaceAds(a)},_fetchAdsCallback:function(a){if(!1!=this.stitialAdType){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];e!=this.stitialAdType&&b.push(e)}this.renderAdsDelayedByStitial=
function(a){return function(){a._flushAndPlaceAds(b)}}(this);this._flushAndPlaceAds([this.stitialAdType]);this.stitialAdType=!1;this.showStitial()}else this._flushAndPlaceAds(a)},_randomizeAdJsUrls:function(){0==this.urlRandNum?this.urlRandNum=Math.floor(Math.random()*Math.pow(10,this.urlRandLength)):this.urlRandNum++;var a="sugar-rand="+this.urlRandNum,b=RegExp("sugar-rand=\\d{"+this.urlRandLength+"}","g");for(adType in this.adJsUrls){var c=this.adJsUrls[adType],d=c.match(b);null!=d?this.adJsUrls[adType]=
c.replace(d[0],a):(d=c.search(/\?/),this.adJsUrls[adType]=-1!=d?c.replace("?","?"+a+"&"):c.replace(/&*$/,"&"+a))}},_jsonp:function(a,b){if(-1==a.indexOf("=?"))this._warn("The sugar jsonp url must specify the callback function in the query string i.e. callback=?");else if("function"!=typeof b)this._warn("The sugar jsonp callback must be a function");else{var c="jsonp"+Math.floor(1E10*Math.random());window[c]=function(a){b(a);try{delete window[c]}catch(d){window[c]=void 0}};var d=document.createElement("script");
d.src=a.split("=?").join("="+c);document.getElementsByTagName("head")[0].appendChild(d)}},_isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},_warn:function(a){window.console&&console.warn&&console.warn(a)}};
