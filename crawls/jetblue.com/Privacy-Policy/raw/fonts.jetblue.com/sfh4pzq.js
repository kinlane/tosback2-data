/*{"k":"0.10.0","mac":"1:3cd7a926f96e892b7deaab69d7b45575c0e5938bec3716e4b54832018542b4d0","version":"6831448","created":"2011-12-01T21:30:53Z"}*/
;(function(window,document,undefined){
var j=true,o=null,q=false;function r(a){return function(c){this[a]=c}}function s(a){return function(){return this[a]}}var t;function u(a,c){var b=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){b.push.apply(b,arguments);return c.apply(a,b)}}function v(a,c){this.p=a;this.f=c}t=v.prototype;
t.createElement=function(a,c,b){a=this.p.createElement(a);if(c)for(var d in c)if(c.hasOwnProperty(d))if(d=="style"&&this.f.getName()=="MSIE")a.style.cssText=c[d];else a.setAttribute(d,c[d]);b&&a.appendChild(this.p.createTextNode(b));return a};t.insertInto=function(a,c){var b=this.p.getElementsByTagName(a)[0];if(!b)b=document.documentElement;if(b&&b.lastChild){b.insertBefore(c,b.lastChild);return j}return q};t.whenBodyExists=function(a){function c(){document.body?a():setTimeout(c,0)}c()};
t.removeElement=function(a){if(a.parentNode){a.parentNode.removeChild(a);return j}return q};t.createCssLink=function(a){return this.createElement("link",{rel:"stylesheet",href:a})};t.appendClassName=function(a,c){for(var b=a.className.split(/\s+/),d=0,e=b.length;d<e;d++)if(b[d]==c)return;b.push(c);a.className=b.join(" ").replace(/^\s+/,"")};
t.removeClassName=function(a,c){for(var b=a.className.split(/\s+/),d=[],e=0,g=b.length;e<g;e++)b[e]!=c&&d.push(b[e]);a.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")};t.hasClassName=function(a,c){for(var b=a.className.split(/\s+/),d=0,e=b.length;d<e;d++)if(b[d]==c)return j;return q};function w(a,c,b,d,e,g,k,h){this.R=a;this.Sa=c;this.Aa=b;this.za=d;this.La=e;this.Ka=g;this.ya=k;this.Wa=h}t=w.prototype;t.getName=s("R");t.getVersion=s("Sa");t.getEngine=s("Aa");t.getEngineVersion=s("za");
t.getPlatform=s("La");t.getPlatformVersion=s("Ka");t.getDocumentMode=s("ya");function x(a,c){this.f=a;this.u=c}var aa=new w("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",undefined,q);
x.prototype.parse=function(){var a;if(this.f.indexOf("MSIE")!=-1){a=y(this,this.f,/(MSIE [\d\w\.]+)/,1);if(a!=""){var c=a.split(" ");a=c[0];c=c[1];a=new w(a,c,a,c,z(this),A(this),B(this,this.u),C(this,c)>=6)}else a=new w("MSIE","Unknown","MSIE","Unknown",z(this),A(this),B(this,this.u),q)}else{if(this.f.indexOf("Opera")!=-1)a:{c=a="Unknown";var b=y(this,this.f,/(Presto\/[\d\w\.]+)/,1);if(b!=""){c=b.split("/");a=c[0];c=c[1]}else{if(this.f.indexOf("Gecko")!=-1)a="Gecko";b=y(this,this.f,/rv:([^\)]+)/,
1);if(b!="")c=b}if(this.f.indexOf("Version/")!=-1){b=y(this,this.f,/Version\/([\d\.]+)/,1);if(b!=""){a=new w("Opera",b,a,c,z(this),A(this),B(this,this.u),C(this,b)>=10);break a}}b=y(this,this.f,/Opera[\/ ]([\d\.]+)/,1);a=b!=""?new w("Opera",b,a,c,z(this),A(this),B(this,this.u),C(this,b)>=10):new w("Opera","Unknown",a,c,z(this),A(this),B(this,this.u),q)}else{if(this.f.indexOf("AppleWebKit")!=-1){a=z(this);c=A(this);b=y(this,this.f,/AppleWebKit\/([\d\.]+)/,1);if(b=="")b="Unknown";var d="Unknown";
if(this.f.indexOf("Chrome")!=-1)d="Chrome";else if(this.f.indexOf("Safari")!=-1)d="Safari";else if(this.f.indexOf("AdobeAIR")!=-1)d="AdobeAIR";var e="Unknown";if(this.f.indexOf("Version/")!=-1)e=y(this,this.f,/Version\/([\d\.\w]+)/,1);else if(d=="Chrome")e=y(this,this.f,/Chrome\/([\d\.]+)/,1);else if(d=="AdobeAIR")e=y(this,this.f,/AdobeAIR\/([\d\.]+)/,1);var g=q;if(d=="AdobeAIR"){g=y(this,e,/\d+\.(\d+)/,1);g=C(this,e)>2||C(this,e)==2&&parseInt(g,10)>=5}else{g=y(this,b,/\d+\.(\d+)/,1);g=C(this,b)>=
526||C(this,b)>=525&&parseInt(g,10)>=13}a=new w(d,e,"AppleWebKit",b,a,c,B(this,this.u),g)}else{if(this.f.indexOf("Gecko")!=-1){c=a="Unknown";d=q;if(this.f.indexOf("Firefox")!=-1){a="Firefox";b=y(this,this.f,/Firefox\/([\d\w\.]+)/,1);if(b!=""){d=y(this,b,/\d+\.(\d+)/,1);c=b;d=b!=""&&C(this,b)>=3&&parseInt(d,10)>=5}}else if(this.f.indexOf("Mozilla")!=-1)a="Mozilla";b=y(this,this.f,/rv:([^\)]+)/,1);if(b=="")b="Unknown";else if(!d){d=C(this,b);e=parseInt(y(this,b,/\d+\.(\d+)/,1),10);g=parseInt(y(this,
b,/\d+\.\d+\.(\d+)/,1),10);d=d>1||d==1&&e>9||d==1&&e==9&&g>=2||b.match(/1\.9\.1b[123]/)!=o||b.match(/1\.9\.1\.[\d\.]+/)!=o}a=new w(a,c,"Gecko",b,z(this),A(this),B(this,this.u),d)}else a=aa;a=a}a=a}a=a}return a};function z(a){var c=y(a,a.f,/(iPod|iPad|iPhone|Android)/,1);if(c!="")return c;a=y(a,a.f,/(Linux|Mac_PowerPC|Macintosh|Windows)/,1);if(a!=""){if(a=="Mac_PowerPC")a="Macintosh";return a}return"Unknown"}
function A(a){var c=y(a,a.f,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(c)return c;if(c=y(a,a.f,/(iPhone )?OS ([\d_]+)/,2))return c;if(a=y(a,a.f,/Linux ([i\d]+)/,1))return a;return"Unknown"}function C(a,c){var b=y(a,c,/(\d+)/,1);if(b!="")return parseInt(b,10);return-1}function y(a,c,b,d){if((a=c.match(b))&&a[d])return a[d];return""}function B(a,c){if(c.documentMode)return c.documentMode}function ba(a,c,b,d){this.c=a;this.j=c;this.U=b;this.n=d||"wf";this.l=new D("-")}
function E(a){a.c.removeClassName(a.j,a.l.k(a.n,"loading"));a.c.hasClassName(a.j,a.l.k(a.n,"active"))||a.c.appendClassName(a.j,a.l.k(a.n,"inactive"));F(a,"inactive")}function F(a,c,b,d){a.U[c]&&a.U[c](b,d)}function G(a,c,b,d,e){this.c=a;this.A=c;this.C=b;this.s=d;this.N=e;this.X=0;this.ta=this.ga=q}
G.prototype.watch=function(a,c,b,d){for(var e=a.length,g=0;g<e;g++){var k=a[g];c[k]||(c[k]=["n4"]);this.X+=c[k].length}if(d)this.ga=d;for(g=0;g<e;g++){k=a[g];d=c[k];for(var h=b[k],f=0,l=d.length;f<l;f++){var n=d[f],p=this.A,i=k,m=n;p.c.appendClassName(p.j,p.l.k(p.n,i,m,"loading"));F(p,"fontloading",i,m);p=u(this,this.Ba);i=u(this,this.Ca);new H(p,i,this.c,this.C,this.s,this.N,k,n,h)}}};
G.prototype.Ba=function(a,c){var b=this.A;b.c.removeClassName(b.j,b.l.k(b.n,a,c,"loading"));b.c.removeClassName(b.j,b.l.k(b.n,a,c,"inactive"));b.c.appendClassName(b.j,b.l.k(b.n,a,c,"active"));F(b,"fontactive",a,c);this.ta=j;I(this)};G.prototype.Ca=function(a,c){var b=this.A;b.c.removeClassName(b.j,b.l.k(b.n,a,c,"loading"));b.c.hasClassName(b.j,b.l.k(b.n,a,c,"active"))||b.c.appendClassName(b.j,b.l.k(b.n,a,c,"inactive"));F(b,"fontinactive",a,c);I(this)};
function I(a){if(--a.X==0&&a.ga)if(a.ta){a=a.A;a.c.removeClassName(a.j,a.l.k(a.n,"loading"));a.c.removeClassName(a.j,a.l.k(a.n,"inactive"));a.c.appendClassName(a.j,a.l.k(a.n,"active"));F(a,"active")}else E(a.A)}
function H(a,c,b,d,e,g,k,h,f){this.va=a;this.Fa=c;this.c=b;this.C=d;this.s=e;this.N=g;this.Ja=new J;this.Ea=new ca;this.aa=k;this.$=h;this.Da=f||"BESs";this.ia=da(this,"arial,'URW Gothic L',sans-serif");this.ja=da(this,"Georgia,'Century Schoolbook L',serif");this.ea=this.ia;this.fa=this.ja;this.oa=K(this,"arial,'URW Gothic L',sans-serif");this.pa=K(this,"Georgia,'Century Schoolbook L',serif");this.Qa=g();this.V()}
H.prototype.V=function(){var a=this.C.O(this.oa),c=this.C.O(this.pa);if((this.ia!=a||this.ja!=c)&&this.ea==a&&this.fa==c)ea(this,this.va);else if(this.N()-this.Qa>=5E3)ea(this,this.Fa);else{this.ea=a;this.fa=c;fa(this)}};function fa(a){a.s(function(c,b){return function(){b.call(c)}}(a,a.V),25)}function ea(a,c){a.c.removeElement(a.oa);a.c.removeElement(a.pa);c(a.aa,a.$)}function da(a,c){var b=K(a,c,j),d=a.C.O(b);a.c.removeElement(b);return d}
function K(a,c,b){var d=a.Ea.expand(a.$);c=a.c.createElement("span",{style:"position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;font-family:"+(b?"":a.Ja.quote(a.aa)+",")+c+";"+d},a.Da);a.c.insertInto("body",c);return c}function D(a){this.Ha=a||"-"}D.prototype.k=function(){for(var a=[],c=0;c<arguments.length;c++)a.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return a.join(this.Ha)};
function J(){this.na="'"}J.prototype.quote=function(a){var c=[];a=a.split(/,\s*/);for(var b=0;b<a.length;b++){var d=a[b].replace(/['"]/g,"");d.indexOf(" ")==-1?c.push(d):c.push(this.na+d+this.na)}return c.join(",")};function ca(){this.la=ga;this.D=ha}var ga=["font-style","font-weight"],ha={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"],["4","normal"],["7","bold"]]};
function ia(a,c,b){this.Ga=a;this.Ma=c;this.D=b}ia.prototype.expand=function(a,c){for(var b=0;b<this.D.length;b++)if(c==this.D[b][0]){a[this.Ga]=this.Ma+":"+this.D[b][1];break}};ca.prototype.expand=function(a){if(a.length!=2)return o;for(var c=[o,o],b=0,d=this.la.length;b<d;b++){var e=this.la[b];(new ia(b,e,this.D[e])).expand(c,a.substr(b,1))}return c[0]&&c[1]?c.join(";")+";":o};function L(a,c){this.p=a;this.f=c}L.prototype=v.prototype;
L.prototype.isHttps=function(){return this.p.location.protocol=="https:"};L.prototype.getHostName=function(){return this.p.location.hostname};L.prototype.loadScript=function(a,c){var b=this.p.getElementsByTagName("head")[0];if(b){var d=this.p.createElement("script");d.src=a;var e=q;d.onload=d.onreadystatechange=function(){if(!e&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){e=j;c&&c();d.onload=d.onreadystatechange=o;d.parentNode.tagName=="HEAD"&&b.removeChild(d)}};b.appendChild(d)}};
L.prototype.createStyle=function(a){var c=this.p.createElement("style");c.setAttribute("type","text/css");if(c.styleSheet)c.styleSheet.cssText=a;else c.appendChild(document.createTextNode(a));return c};function ja(a){for(var c=a.Oa.join(","),b=[],d=0;d<a.Y.length;d++){var e=a.Y[d];b.push(e.name+":"+e.value+";")}return c+"{"+b.join("")+"}"}function N(a,c,b,d){this.B=a;this.H=c;this.v=b;this.Va=d;this.ba={};this.Z={}}
N.prototype.w=function(a){return a?(this.ba[a.getStylesheetFormatId()]||this.H).slice(0):this.H.slice(0)};N.prototype.getId=s("v");function ka(a,c,b){for(var d=[],e=a.B.split(",")[0].replace(/"|'/g,""),g=a.w(),k,h=[],f={},l=0;l<g.length;l++){k=g[l];if(k.length>0&&!f[k]){f[k]=j;h.push(k)}}b=b.ma?b.ma(e,h,d):h;c=c.getStylesheetFormatId();a.ba[c]=b;a.Z[c]=d}N.prototype.watch=function(a,c,b){var d=[],e={};la(this,c,d,e);a.watch(d,e,{},b)};
function la(a,c,b,d){b.push(a.B);d[a.B]=a.w(c);a=a.Z[c.getStylesheetFormatId()]||[];for(c=0;c<a.length;c++){for(var e=a[c],g=e.B,k=q,h=0;h<b.length;h++)if(b[h]==g)k=j;if(!k){b.push(g);d[g]=e.w()}}}function ma(a,c){this.B=a;this.H=c}ma.prototype.w=s("H");function O(a,c,b){this.Pa=a;this.P=c;this.qa=b}O.prototype.buildUrl=function(a,c){var b=this.Pa&&a?"https:":"http:",d=typeof this.P=="function"?this.P(b):this.P;return b+"//"+d+(this.qa=="/"?"":this.qa)+c};
function na(a,c){var b=new Image(1,1);b.src=c;b.onload=function(){b.onload=o}}function P(a,c,b){this.v=a;this.sa=c;this.da=b}P.prototype.getId=s("v");P.prototype.getStylesheetFormatId=s("sa");P.prototype.isUserAgent=function(a){return this.da?this.da(a.getName(),a.getVersion(),a.getEngine(),a.getEngineVersion(),a.getPlatform(),a.getPlatformVersion(),a.getDocumentMode()):q};P.prototype.buildCssUrl=function(a,c,b,d){b="/"+b+"-"+this.sa+".css";if(d)b+="?"+d;return c.buildUrl(a,b)};
function Q(){this.t=[]}Q.prototype.addBrowser=function(a){this.getBrowserById(a.getId())||this.t.push(a)};Q.prototype.getBrowserById=function(a){for(var c=0;c<this.t.length;c++){var b=this.t[c];if(a===b.getId())return b}return o};Q.prototype.findBrowser=function(a){for(var c=0;c<this.t.length;c++){var b=this.t[c];if(b.isUserAgent(a))return b}return o};Q.prototype.addBrowsersToBrowserSet=function(a){for(var c=0;c<this.t.length;c++)a.addBrowser(this.t[c])};
function oa(a){this.v=a;this.J=new Q;this.m=[];this.K=[];this.M=this.W=this.z=o}t=oa.prototype;t.getId=s("v");t.setSecurityToken=r("ra");t.setNestedUrl=r("ha");t.setFontFilterSet=r("M");t.setKitOptions=r("Q");t.addBrowser=function(a){this.J.addBrowser(a)};t.addFontFamily=function(a){this.m.push(a)};t.addCssRule=function(a){this.K.push(a)};t.supportsBrowser=function(a){return!!this.J.getBrowserById(a.getId())};t.addBrowsersToBrowserSet=function(a){this.J.addBrowsersToBrowserSet(a)};
t.init=function(a){for(var c=[],b=0;b<this.K.length;b++)c.push(ja(this.K[b]));a.insertInto("head",a.createStyle(c.join("")))};
t.load=function(a,c,b,d){if(this.M)for(var e=pa(this.M,b.getStylesheetFormatId()),g=0;g<this.m.length;g++)ka(this.m[g],b,e);if(this.z&&this.W){this.z.wa(new qa(b.getStylesheetFormatId()));g=new ra(a,this.F,this.m);e=sa(this.W,b.getStylesheetFormatId(),g);for(g=0;g<e.length;g++)this.z.wa(e[g]);this.z.Ua(this.ra);g=this.z.buildUrl(a.isHttps(),this.ha)}else g=b.buildCssUrl(a.isHttps(),this.ha,this.v,this.ra);a.insertInto("head",a.createCssLink(g));c&&a.whenBodyExists(function(k,h,f,l){return function(){for(var n=
0;n<k.m.length;n++)k.m[n].watch(h,f,l&&n==k.m.length-1)}}(this,c,b,d))};t.collectFontFamilies=function(a,c,b){for(var d=0;d<this.m.length;d++)la(this.m[d],a,c,b)};t.performOptionalActions=function(a,c,b){this.Q&&b.whenBodyExists(function(d,e,g,k){return function(){var h=d.Q;h.ka&&na(h,h.ka.buildUrl(k.isHttps()));var f=d.Q;h=d.v;if(f.T){f=f.T.k(h,g,k);f.setAttribute("id","typekit-badge-"+h);k.insertInto("body",f)}}}(this,a,c,b))};
function R(a,c,b,d,e){this.Ia=a;this.c=c;this.f=b;this.j=d;this.s=e;this.o=[]}R.prototype.I=function(a){this.o.push(a)};R.prototype.load=function(a,c){var b=a,d=c||{};if(typeof b=="string")b=[b];else if(b&&b.length)b=b;else{d=b||{};b=[]}if(b.length)for(var e=this,g=b.length,k=0;k<b.length;k++)this.ua(b[k],function(){--g==0&&e.S(d)});else this.S(d)};R.prototype.ua=function(a,c){this.c.loadScript(this.Ia.buildUrl(this.c.isHttps(),"/"+a+".js"),c)};
R.prototype.S=function(a){if(a.userAgent)this.f=(new x(a.userAgent,document)).parse();a=new ba(this.c,this.j,a);for(var c=new Q,b=0;b<this.o.length;b++)this.o[b].addBrowsersToBrowserSet(c);c=c.findBrowser(this.f);for(b=0;b<this.o.length;b++)this.o[b].init(this.c);if(c){a.c.appendClassName(a.j,a.l.k(a.n,"loading"));F(a,"loading");ta(this,c,a)}else E(a);this.o=[]};
function ta(a,c,b){b=new G(a.c,b,{O:function(g){return g.offsetWidth}},a.s,function(){return+new Date});for(var d=0;d<a.o.length;d++){var e=a.o[d];if(e.supportsBrowser(c)){e.load(a.c,b,c,d==a.o.length-1);e.performOptionalActions(window,a.f,a.c)}}}function S(a,c,b){this.ca=a;this.c=c;this.s=b;this.o=[]}S.prototype.I=function(a){this.o.push(a)};
S.prototype.load=function(){var a=this.ca.__webfonttypekitmodule__;if(a)for(var c=0;c<this.o.length;c++){var b=this.o[c],d=a[b.getId()];if(d){var e=this.c,g=this.s;d(function(k,h,f){var l=new Q;b.addBrowsersToBrowserSet(l);h=[];var n={};if(l=l.findBrowser(k)){b.init(e);b.load(e,o,l,g);b.collectFontFamilies(l,h,n);b.performOptionalActions(window,k,e,g)}f(!!l,h,n)})}}};function T(a,c){this.R=a;this.ma=c}T.prototype.getName=s("R");
function U(a,c){for(var b=0;b<a.G.length;b++){var d=a.G[b];if(c===d.getName())return d}return o}function pa(a,c){var b=a.q[c];return b?U(a,b):o}function sa(a,c,b){var d=[];a=a.r[c]||[];for(c=0;c<a.length;c++){var e;a:switch(a[c]){case "observeddomain":e=new ua(b.c);break a;case "fontmask":e=new va(b.F,b.m);break a;default:e=o}e&&d.push(e)}return d}function ra(a,c,b){this.c=a;this.F=c;this.m=b}function qa(a){this.Ra=a}qa.prototype.toString=s("Ra");function ua(a){this.c=a}
ua.prototype.toString=function(){var a;a=this.c.getHostName?this.c.getHostName():document.location.hostname;return encodeURIComponent(a)};function va(a,c){this.F=a;this.m=c}va.prototype.toString=function(){for(var a=[],c=0;c<this.m.length;c++){var b=this.m[c],d=b.w();b=b.w(this.F);for(var e=0;e<d.length;e++){var g;a:{for(g=0;g<b.length;g++)if(d[e]===b[g]){g=j;break a}g=q}a.push(g?1:0)}}a=a.join("");a=a.replace(/^0+/,"");c=[];for(d=a.length;d>0;d-=4){b=a.slice(d-4<0?0:d-4,d);c.unshift(parseInt(b,2).toString(16))}return c.join("")};
function wa(a,c,b){this.Na=a;this.L=c;this.xa=b||function(){return+new Date}}wa.prototype.buildUrl=function(a){for(var c=[],b=0,d=this.L.length;b<d;b+=2)c.push(this.L[b]+"="+this.L[b+1]);c.push("_="+this.xa());return this.Na.buildUrl(a,"")+"?"+c.join("&")};var V=new Q;
V.addBrowser(new P("opera-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;a=a=="Opera"?parseFloat(c)>=10.54:q;return a}));
V.addBrowser(new P("ff36plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],
10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l,n,p){if(n=="Gecko")if(l=/([0-9]+.[0-9]+)(.([0-9]+)|)/.exec(p)){f=parseFloat(l[1]);l=parseInt(l[3],10);return f>1.9||f>=1.9&&l>1}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("opera-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;a=a=="Opera"?parseFloat(c)>=10.54:q;return a}));
V.addBrowser(new P("ie9plus-win7plus-winvista","d",function(a,c,b,d,e,g,k){var h=q;h=(h=h||function(l,n,p,i,m,M){l=/^([0-9]+).([0-9]+)/.exec(M);if(m=="Windows"&&l){m=parseInt(l[1],10);l=parseInt(l[2],10);return m>6||m==6&&l>=1}else return q}(a,c,b,d,e,g,k))||(e=="Windows"&&g=="6.0"?j:q);if(!h)return q;var f;if(a=="MSIE")f=k>=9;return f}));
V.addBrowser(new P("ie6to8-win2003-win7plus-winvista-winxp","i",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i,m,M){if(f=="MSIE"){if(f=/([0-9]+.[0-9]+)/.exec(l))return parseFloat(f[1])>=6&&(M===undefined||
M<9);return q}}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],
10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l){if(f=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(l);if(n){var p=parseFloat(n[1]),i=parseInt(n[2],10);n=parseInt(n[3],10);if(p>=6)return q;else if(p>4)return j;else if(p==4&&i>249)return j;else if(p==4&&i==249&&n>=4)return j}}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("air-linux-osx-win","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q))||(e=="Windows"&&g=="Unknown"?j:q);if(!h)return q;return function(f,l){if(f=="AdobeAIR"){var n=/([0-9]+.[0-9]+)/.exec(l);if(n)return parseFloat(n[1])>=2.5}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("safari-android-ipad-iphone-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/([0-9]+).([0-9]+)/.exec(m);if(i=="Android"&&f){i=parseInt(f[1]);f=parseInt(f[2]);
return i>2||i==2&&f>=2}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){if(i=="iPad")if(l=/^([0-9]+)_([0-9]+)/.exec(m)){f=parseInt(l[1],10);l=parseInt(l[2],10);return f>4||f==4&&l>=2}else return q;else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){if(i=="iPhone"||i=="iPod")if(l=/^([0-9]+)_([0-9]+)/.exec(m)){f=parseInt(l[1],10);l=parseInt(l[2],10);return f>4||f==4&&l>=2}else return q;else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i){if(f=="Safari"&&n=="AppleWebKit"||f==
"Unknown"&&n=="AppleWebKit"&&(i=="iPhone"||i=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(f[1])>=525.13;return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("ff35-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l,n,p){if(n=="Gecko"){f=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&
!f.test(p)}return q}(a,c,b,d,e,g,k)}));V.addBrowser(new P("ff35-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p){if(n=="Gecko"){f=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&!f.test(p)}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("chrome6plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],
10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l){if(f=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(l);if(n)if(parseFloat(n[1])>=6)return j}}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("safari-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i){if(f=="Safari"&&n=="AppleWebKit"||f=="Unknown"&&n=="AppleWebKit"&&(i=="iPhone"||i=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(f[1])>=525.13;return q}(a,c,b,d,e,g,k)}));
var W=new function(){this.G=[];this.q={}},xa=new T("AllFonts",function(a,c){return c});U(W,xa.getName())||W.G.push(xa);
var ya=new T("DefaultFourFontsWithSingleFvdFamilies",function(a,c,b){for(var d=0;d<c.length;d++){var e=c[d],g=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+e;b.push(new ma(g,[e]))}a={};for(e=0;e<c.length;e++){b=c[e];d=b.charAt(1);(a[d]||(a[d]=[])).push(b)}b=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];d=[];for(e=0;e<b.length;e++){g=b[e];for(var k=0;k<g.length;k++){var h=g[k];if(a[h]){d=d.concat(a[h]);break}}}b=d;d={};a=[];for(e=0;e<b.length;e++){g=b[e];if(!d[g]){d[g]=j;a.push(g)}}b=[];for(d=0;d<c.length;d++){e=
c[d];for(g=0;g<a.length;g++){k=a[g];k==e&&b.push(k)}}return b});U(W,ya.getName())||W.G.push(ya);W.q.a="AllFonts";W.q.b="AllFonts";W.q.d="AllFonts";W.q.e="AllFonts";W.q.g="AllFonts";W.q.h="AllFonts";W.q.i="DefaultFourFontsWithSingleFvdFamilies";var X=new function(){this.r={}};X.r.a=[];X.r.b=[];X.r.d=[];X.r.e=[];X.r.g=["observeddomain"];X.r.h=["observeddomain"];X.r.i=["observeddomain","fontmask"];
if(!window.Typekit){var za=new O(j,"fonts.jetblue.com","/"),Aa=(new x(navigator.userAgent,document)).parse(),Ba=new L(document,Aa),Ca=function(a,c){setTimeout(a,c)},Y=new R(za,Ba,Aa,document.documentElement,Ca),Z=new S(window,Ba,Ca);window.Typekit=Y;window.Typekit.load=Y.load;window.Typekit.addKit=Y.I}var Da,Ea=o,Fa=o,Ga,$;Da=new O(j,"fonts.jetblue.com","/k");Ea=new O(j,"use.typekit.com","/s.gif");Fa=new wa(Ea,["a","514496","f","14331,14333,14335,14337,14338","ht","sh","k","sfh4pzq"]);
Ga=new function(a,c,b){this.T=a;this.Ta=o;this.ka=b}(o,o,Fa);$=new oa("sfh4pzq");$.setSecurityToken("3bb2a6e53c9684ffdc9a99f71d5b2a62d9c86262f6f33f54f782cc3094d11df2f53a7c7868bea7f833fbebbf0b91b54b870ad16d56a61057bb3bdcb086687872f604fbbc904fd849e337ee5a801c4405129ae51551135a0e0a5d3466a8beaac71467f307a85e92d9e389ffc519fc3aff85d43768617fa7fdea045840ddcb1154e234762b910076baa912bb814ee358ff53a52618213bc533f43a52d522a2999048176b727eea64a8ef1c581883bfbd5a2db633fe2d35a4081a9e63d0f1dab8ba8aa562d9716d46f2c97c7515ec40feb8d22df95c1aea8db30d372a185a56bd3cd933fdcc66fccee695d15efaca70b2adfe4964126b961cd53bcf71f7cb426c75abd9fe0bc61a0796a9ef16a7793186089370c6aa306a1973a314c43a88fe04060977b4e019d7158fea5b21c2bcc060a97c3bdc77077a6b807aa2094417");
$.setNestedUrl(Da);$.setKitOptions(Ga);$.addFontFamily(new N("din-web-jetblue",["n3","n4","n5","n7","n9"]));$.addCssRule(new function(a,c){this.Oa=a;this.Y=c}([".tk-din-web-jetblue"],[{name:"font-family",value:'din-web-jetblue,"Arial","Helvetica",sans-serif'}]));$.addBrowser(V.getBrowserById("air-linux-osx-win"));$.addBrowser(V.getBrowserById("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("chrome6plus-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ff35-linux-win2003-win7plus-winvista-winxp"));
$.addBrowser(V.getBrowserById("ff35-osx"));$.addBrowser(V.getBrowserById("ff36plus-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie6to8-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie9plus-win7plus-winvista"));$.addBrowser(V.getBrowserById("opera-linux-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("opera-osx"));$.addBrowser(V.getBrowserById("safari-android-ipad-iphone-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("safari-osx"));
$.setFontFilterSet(W);if(Z&&Z.ca.__webfonttypekitmodule__){Z.I($);Z.load()}else window.Typekit.addKit($);
})(this,document);