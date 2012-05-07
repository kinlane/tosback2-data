if(typeof CE2=="undefined"){CE2={}}CE2.ignoredElements=[];CE2.clickCaptors=[];CE2.d=document;CE2.w=window;CE2.n=navigator;CE2.ignore=function(b){CE2.ignoredElements.push(b);if(CE2.tracker){CE2.tracker.ignoredElements.push(b)}};CE2.capture=function(b){CE2.clickCaptors.push(b);if(CE2.tracker){CE2.tracker.clickCaptors.push(b)}};CE2.findMatchingSnapshot=function(){var d,c=[];CE2.each(CE2.snapshots,function(b,a){b.id=a;c.push(b)});c.sort(function(g,h){var b,a;if(!(g.u&&h.u)){return 0}b=g.u.path?(g.u.path.length||1):(g.u.length||1);a=h.u.path?(h.u.path.length||1):(h.u.length||1);return a-b});CE2.each(c,function(a){if(CE2.matchURL(a,CE2.w.location.href)){d=a;return false}});return d};CE2.startTracking=function(d){CE2.testID=d.id;CE2.testVersion=d.v||1;var e=CE2.d.createElement("script");var f=CE2.w.location.protocol=="https:"?CE2.TRACKING_SCRIPT_SECURE:CE2.TRACKING_SCRIPT;if(CE2.ie){f=f.replace(/t(\.prerelease)?\.js/,"tu$1.js")}e.src=f+"?s="+d.id+"&t="+(new Date().getTime());e.type="text/javascript";CE2.d.body.appendChild(e)};CE2.unescape=function(d){try{return decodeURIComponent(d)}catch(c){return unescape(d)}};CE2.qs2obj=function(h){if(h==null||/^\s*$/.test(h)){return null}var i={},k=null,j=h.replace(/\+/g," ").split("&");for(var l=0,g=j.length;l<g;l++){k=j[l].split("=");i[CE2.unescape(k[0])]=k[1]?CE2.unescape(k[1]):null}return i};CE2.b=(function(){var b=CE2.n.userAgent;if(/\bMSIE\b/.test(b)){CE2.ie=1;CE2.ieVersion=parseInt(/MSIE (\d+)\.\d+/.exec(b)[1],10);CE2.ieQuirksMode=(CE2.d.compatMode=="BackCompat")}})();CE2.each=function(j,l,h){if(!j){return}var k;if(typeof j.length=="number"&&typeof j.concat=="function"){for(var m=0,i=j.length;m<i;m++){k=j[m];if(l.call(h,k,m)===false){break}}}else{var n;for(n in j){k=j[n];if(k!==Object.prototype[n]){if(l.call(h,k,n)===false){break}}}}};CE2.listen=CE2.addListener=function(f,e,d){if(f.addEventListener){f.addEventListener(e,d,true)}else{f.attachEvent("on"+e,d)}};CE2.removeListener=function(f,e,d){if(f.removeEventListener){f.removeEventListener(e,d,true)}else{f.detachEvent("on"+e,d)}};CE2.userData={};CE2.set=function(d,c){d=parseInt(d,10);if(1<=d&&d<=5){CE2.userData[d]=String(c)}};if(typeof CE2=="undefined"){CE2={}}CE2.READY_STATE_PATTERN=/complete|loaded/;CE2.autoStart=(typeof CE_MANUAL_START=="undefined"||!CE_MANUAL_START);CE2.domReady=(document.readyState&&CE2.READY_STATE_PATTERN.test(document.readyState));CE2.domReadyListeners=[];CE2.onDOMReady=function(b){if(CE2.domReady){return setTimeout(b,1)}CE2.domReadyListeners.push(b)};CE2.domReadySetup=function(){var c=function(g){var b,h;var a=CE2.domReadyListeners;while(a.length>0){a.pop().call()}CE2.domReady=true};if(CE2.domReady){c()}CE2.listen(window,"load",c);if(document.addEventListener){CE2.listen(document,"DOMContentLoaded",c)}if(document.readyState){var d=CE2.READY_STATE_PATTERN;(function(){if(d.test(document.readyState)){c()}else{setTimeout(arguments.callee,10)}})()}};if(CE2.autoStart){CE2.domReadySetup()}if(typeof CE2=="undefined"){CE2={}}CE2.matchURL=function(x,G){if(!(x&&G)){return false}var M=new CE2.URI(G.toLowerCase());x.o=x.o||"";if(/[re]/.test(x.o)){return new RegExp(x.u,"i").test(G)}if(/h/.test(x.o)&&((x.u.protocol)!=M.protocol)){return false}var i=M.domain,B=M.host,I=x.u.domain,N=x.u.host;if(/w/.test(x.o)&&B!=N){return false}if(i!=I||B.replace(/^www\./,"")!=N.replace(/^www\./,"")){return false}var K;if(!x.u.path){K="/"}else{K=x.u.path}var A=M.path;if(K!=A){if(/\//.test(x.o)){return false}var L=K.split("/");var w=A.split("/");var D=/(home|default|index)($|\..*)/i;for(var y=0,z=Math.max(L.length,w.length);y<z;y++){if(!L[y]){L[y]=""}if(!w[y]){w[y]=""}if(y==z-1){L[y]=L[y].replace(D,"");w[y]=w[y].replace(D,"")}if(L[y]!=w[y]){return false}}}var H=M.qs;var l=/\?/.test(x.o);var F=x.u.qs||"";if((l&&H&&!F)||(!H&&F)){return false}var E=false;CE2.each(F,function(a,b){if(H[b]!==a){E=true;return false}});if(E){return false}if(l){CE2.each(H,function(a,b){if(a!=F[b]){return(E=true)}});if(E){return false}}var C=x.u.hash||"";var J=M.hash||"";var l=/#/.test(x.o);if((l||C)&&C!=J){return false}return true};if(typeof CE2=="undefined"){CE2={}}CE2.getDomain=function(d){var c;if(c=/[a-z0-9-]+\.[a-z]{2,3}\.[a-z]{2}$/i.exec(d)){return c[0]}else{if(c=/[a-z0-9-]+\.[a-z]{2,}$/i.exec(d)){return c[0]}else{return d}}};if(typeof(CE2.URI)=="undefined"){CE2.URI=function(c){this.src=c;this.protocol=this.host=this.port=this.path=this.qs=this.hash=null;if(c){var d=typeof(c);if(d=="string"){this.initWithString(c)}else{if(d=="object"){this.initWithURI(c)}}}};CE2.URI.pattern=/^\s*([\S]+?:\/\/)?([^\s\/]+?@)?([a-z0-9\.-]+)?(\:\d+)?(\/?[^#\?\s]*)?([\?][^#\s]*)?([#]\S+)?/i;CE2.URI.prototype={initWithString:function(k){var l,i,m,j,n,o;var p=CE2.URI.pattern.exec(k);if(!p[1]&&k.charAt(0)!="/"){this.path=CE2.unescape((p[3]||"")+(p[5]||""))}else{if(l=p[1]){this.protocol=l.substr(0,l.indexOf(":"))}if(this.host=p[3]||null){this.domain=CE2.getDomain(this.host)}if(i=p[4]){this.port=Number(i.substr(1))}if(m=p[5]){this.path=CE2.unescape(m)}else{if(this.host){this.path="/"}}}if(j=p[6]){this.qs=CE2.qs2obj(j.substr(1))}if(n=p[7]){this.hash=CE2.unescape(n.substr(1))}},initWithURI:function(b){CE2.each(b,function(d,a){this[a]=d},this)},isAbsolute:function(){return this.isURL()||(this.path&&this.path.charAt(0)=="/")},isURL:function(){return this.protocol&&this.host}}}CE2.TRACKING_SCRIPT="http://trk.cetrk.com/t.js";CE2.TRACKING_SCRIPT_SECURE="https://s3.amazonaws.com/trk.cetrk.com/t.js";CE2.TRACKING_DEST="http://trk.cetrk.com/";CE2.TRACKING_DEST_SECURE="https://s3.amazonaws.com/trk.cetrk.com/";CE2.uid=110349;CE2.snapshots={"258507":{u:{path:"/food/recipes/buttermilk-coffee-cake/",host:"www.pbs.org",protocol:"http",domain:"pbs.org"},v:2}};CE2.dontTrack=function(){if(typeof CE2.w.external!="undefined"){try{if(CE2.w.external.InPrivateFilteringEnabled()==true){return true}}catch(c){}}var d=CE2.d.doNotTrack||CE2.n.doNotTrack||CE2.n.msDoNotTrack;return(d=="1"||d=="yes")};CE2.userMain=function(){if(CE2.dontTrack()){return}CE2.testID=CE2.testVersion=null;var b=function(){try{var a=CE2.findMatchingSnapshot();if(a){if(a.id!=CE2.testID){CE2.startTracking(a)}}else{CE2.testID=CE2.testVersion=null;if(CE2.tracker){CE2.tracker.cleanup();CE2.tracker=null}}}catch(d){}};b();if(CE2.autoStart){CE2.monitorInterval=setInterval(b,1000)}};if(CE2.autoStart){CE2.onDOMReady(CE2.userMain)}if(typeof CE_READY=="function"){CE2.onDOMReady(CE_READY)}else{if(typeof CE_READY=="object"){CE2.onDOMReady(function(){CE2.each(CE_READY,function(b){if(typeof b=="function"){b()}})})}};