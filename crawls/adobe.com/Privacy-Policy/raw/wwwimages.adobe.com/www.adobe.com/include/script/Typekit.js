/*{"created":"2010-12-09T18:07:53Z","mac":"1:a3633d55dad2658d9a114b5bf94560adcd4438d5d24db83968e70fc7ac84bf94","k":"0.7.20","version":"1344172"}*/
;(function(window,document,undefined){
function n(a){return function(){return this[a]}}var p;function q(a,b){var c=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){c.push.apply(c,arguments);return b.apply(a,c)}}function r(a,b){this.p=a;this.i=b}p=r.prototype;p.createElement=function(a,b,c){a=this.p.createElement(a);if(b)for(var d in b)if(b.hasOwnProperty(d))if(d=="style"&&this.i.getName()=="MSIE")a.style.cssText=b[d];else a.setAttribute(d,b[d]);c&&a.appendChild(this.p.createTextNode(c));return a};
p.insertInto=function(a,b){a=this.p.getElementsByTagName(a)[0];if(!a)a=document.documentElement;if(a&&a.lastChild){a.insertBefore(b,a.lastChild);return true}return false};p.whenBodyExists=function(a){function b(){document.body?a():setTimeout(b,0)}b()};p.removeElement=function(a){if(a.parentNode){a.parentNode.removeChild(a);return true}return false};p.createCssLink=function(a){return this.createElement("link",{rel:"stylesheet",href:a})};
p.appendClassName=function(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return;c.push(b);a.className=c.join(" ").replace(/^\s+/,"")};p.removeClassName=function(a,b){for(var c=a.className.split(/\s+/),d=[],e=0,g=c.length;e<g;e++)c[e]!=b&&d.push(c[e]);a.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")};function s(a,b,c,d,e,g,i,h){this.oa=a;this.Aa=b;this.ea=c;this.da=d;this.ta=e;this.sa=g;this.ca=i;this.Ba=h}p=s.prototype;p.getName=n("oa");p.getVersion=n("Aa");
p.getEngine=n("ea");p.getEngineVersion=n("da");p.getPlatform=n("ta");p.getPlatformVersion=n("sa");p.getDocumentMode=n("ca");function t(a,b){this.i=a;this.s=b}var aa=new s("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",undefined,false);t.prototype.parse=function(){return this.i.indexOf("MSIE")!=-1?ba(this):this.i.indexOf("Opera")!=-1?ca(this):this.i.indexOf("AppleWebKit")!=-1?da(this):this.i.indexOf("Gecko")!=-1?ea(this):aa};
function u(a){var b=v(a,a.i,/(iPod|iPad|iPhone|Android)/,1);if(b!="")return b;a=v(a,a.i,/(Linux|Mac_PowerPC|Macintosh|Windows)/,1);if(a!=""){if(a=="Mac_PowerPC")a="Macintosh";return a}return"Unknown"}function w(a){var b=v(a,a.i,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(b)return b;if(b=v(a,a.i,/(iPhone )?OS ([\d_]+)/,2))return b;if(a=v(a,a.i,/Linux ([i\d]+)/,1))return a;return"Unknown"}
function ba(a){var b=v(a,a.i,/(MSIE [\d\w\.]+)/,1);if(b!=""){var c=b.split(" ");b=c[0];c=c[1];return new s(b,c,b,c,u(a),w(a),x(a,a.s),y(a,c)>=6)}return new s("MSIE","Unknown","MSIE","Unknown",u(a),w(a),x(a,a.s),false)}
function ca(a){var b="Unknown",c="Unknown",d=v(a,a.i,/(Presto\/[\d\w\.]+)/,1);if(d!=""){c=d.split("/");b=c[0];c=c[1]}else{if(a.i.indexOf("Gecko")!=-1)b="Gecko";d=v(a,a.i,/rv:([^\)]+)/,1);if(d!="")c=d}if(a.i.indexOf("Version/")!=-1){d=v(a,a.i,/Version\/([\d\.]+)/,1);if(d!="")return new s("Opera",d,b,c,u(a),w(a),x(a,a.s),y(a,d)>=10)}d=v(a,a.i,/Opera[\/ ]([\d\.]+)/,1);if(d!="")return new s("Opera",d,b,c,u(a),w(a),x(a,a.s),y(a,d)>=10);return new s("Opera","Unknown",b,c,u(a),w(a),x(a,a.s),false)}
function da(a){var b=u(a),c=w(a),d=v(a,a.i,/AppleWebKit\/([\d\.\+]+)/,1);if(d=="")d="Unknown";var e="Unknown";if(a.i.indexOf("Chrome")!=-1)e="Chrome";else if(a.i.indexOf("Safari")!=-1)e="Safari";else if(a.i.indexOf("AdobeAIR")!=-1)e="AdobeAIR";var g="Unknown";if(a.i.indexOf("Version/")!=-1)g=v(a,a.i,/Version\/([\d\.\w]+)/,1);else if(e=="Chrome")g=v(a,a.i,/Chrome\/([\d\.]+)/,1);else if(e=="AdobeAIR")g=v(a,a.i,/AdobeAIR\/([\d\.]+)/,1);var i=false;if(e=="AdobeAIR"){i=v(a,g,/\d+\.(\d+)/,1);i=y(a,g)>2||
y(a,g)==2&&parseInt(i,10)>=5}else{i=v(a,d,/\d+\.(\d+)/,1);i=y(a,d)>=526||y(a,d)>=525&&parseInt(i,10)>=13}return new s(e,g,"AppleWebKit",d,b,c,x(a,a.s),i)}
function ea(a){var b="Unknown",c="Unknown",d=false;if(a.i.indexOf("Firefox")!=-1){b="Firefox";var e=v(a,a.i,/Firefox\/([\d\w\.]+)/,1);if(e!=""){d=v(a,e,/\d+\.(\d+)/,1);c=e;d=e!=""&&y(a,e)>=3&&parseInt(d,10)>=5}}else if(a.i.indexOf("Mozilla")!=-1)b="Mozilla";e=v(a,a.i,/rv:([^\)]+)/,1);if(e=="")e="Unknown";else if(!d){d=y(a,e);var g=parseInt(v(a,e,/\d+\.(\d+)/,1),10),i=parseInt(v(a,e,/\d+\.\d+\.(\d+)/,1),10);d=d>1||d==1&&g>9||d==1&&g==9&&i>=2||e.match(/1\.9\.1b[123]/)!=null||e.match(/1\.9\.1\.[\d\.]+/)!=
null}return new s(b,c,"Gecko",e,u(a),w(a),x(a,a.s),d)}function y(a,b){a=v(a,b,/(\d+)/,1);if(a!="")return parseInt(a,10);return-1}function v(a,b,c,d){if((a=b.match(c))&&a[d])return a[d];return""}function x(a,b){if(b.documentMode)return b.documentMode}function fa(a,b,c,d){this.j=a;this.l=b;this.K=c;this.o=d||ga;this.n=new z("-")}var ga="wf";function A(a){a.j.removeClassName(a.l,a.n.m(a.o,"loading"));a.j.appendClassName(a.l,a.n.m(a.o,"inactive"));C(a,"inactive")}
function ha(a){a.j.removeClassName(a.l,a.n.m(a.o,"loading"));a.j.appendClassName(a.l,a.n.m(a.o,"active"));C(a,"active")}function C(a,b,c,d){a.K[b]&&a.K[b](c,d)}function D(a,b,c,d,e){this.j=a;this.v=b;this.w=c;this.q=d;this.G=e;this.M=0;this.aa=this.U=false}
D.prototype.watch=function(a,b,c,d){for(var e=a.length,g=0;g<e;g++){var i=a[g];b[i]||(b[i]=["n4"]);this.M+=b[i].length}if(d)this.U=d;for(g=0;g<e;g++){i=a[g];d=b[i];for(var h=c[i],f=0,k=d.length;f<k;f++){var m=d[f],o=this.v,j=i;o.j.appendClassName(o.l,o.n.m(o.o,j,m,"loading"));C(o,"fontloading",j,m);o=q(this,this.fa);j=q(this,this.ga);new E(o,j,this.j,this.w,this.q,this.G,i,m,h)}}};
D.prototype.fa=function(a,b){var c=this.v;c.j.removeClassName(c.l,c.n.m(c.o,a,b,"loading"));c.j.appendClassName(c.l,c.n.m(c.o,a,b,"active"));C(c,"fontactive",a,b);this.aa=true;F(this)};D.prototype.ga=function(a,b){var c=this.v;c.j.removeClassName(c.l,c.n.m(c.o,a,b,"loading"));c.j.appendClassName(c.l,c.n.m(c.o,a,b,"inactive"));C(c,"fontinactive",a,b);F(this)};function F(a){if(--a.M==0&&a.U)a.aa?ha(a.v):A(a.v)}
function E(a,b,c,d,e,g,i,h,f){this.ba=a;this.ja=b;this.j=c;this.w=d;this.q=e;this.G=g;this.na=new G;this.ia=new H;this.P=i;this.O=h;this.ha=f||ia;this.qa=I(this,J);this.ra=I(this,K);this.Y=L(this,J);this.Z=L(this,K);this.za=g();this.L()}var J="arial,'URW Gothic L',sans-serif",K="Georgia,'Century Schoolbook L',serif",ia="BESs";E.prototype.L=function(){var a=this.w.H(this.Y),b=this.w.H(this.Z);if(this.qa!=a||this.ra!=b)M(this,this.ba);else this.G()-this.za<5E3?ja(this):M(this,this.ja)};
function ja(a){a.q(function(b,c){return function(){c.call(b)}}(a,a.L),50)}function M(a,b){a.j.removeElement(a.Y);a.j.removeElement(a.Z);b(a.P,a.O)}function I(a,b){b=L(a,b,true);var c=a.w.H(b);a.j.removeElement(b);return c}function L(a,b,c){var d=a.ia.expand(a.O);b=a.j.createElement("span",{style:"position:absolute;top:-999px;font-size:300px;font-family:"+(c?"":a.na.quote(a.P)+",")+b+";"+d},a.ha);a.j.insertInto("body",b);return b}function z(a){this.la=a||ka}var ka="-";
z.prototype.m=function(){for(var a=[],b=0;b<arguments.length;b++)a.push(arguments[b].replace(/[\W_]+/g,"").toLowerCase());return a.join(this.la)};function G(){this.X='"'}G.prototype.quote=function(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");d.indexOf(" ")==-1?b.push(d):b.push(this.X+d+this.X)}return b.join(",")};function H(){this.W=la;this.z=ma}
var la=["font-style","font-weight"],ma={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"],["4","normal"],["7","bold"]]};function N(a,b,c){this.ka=a;this.ua=b;this.z=c}N.prototype.expand=function(a,b){for(var c=0;c<this.z.length;c++)if(b==this.z[c][0]){a[this.ka]=this.ua+":"+this.z[c][1];return}};
H.prototype.expand=function(a){if(a.length!=2)return null;for(var b=[null,null],c=0,d=this.W.length;c<d;c++){var e=this.W[c],g=a.substr(c,1);(new N(c,e,this.z[e])).expand(b,g)}return b[0]&&b[1]?b.join(";")+";":null};function O(a,b){this.p=a;this.i=b}O.prototype=r.prototype;O.prototype.isHttps=function(){return this.p.location.protocol=="https:"};
O.prototype.loadScript=function(a,b){var c=this.p.getElementsByTagName("head")[0];if(c){var d=this.p.createElement("script");d.src=a;var e=false;d.onload=d.onreadystatechange=function(){if(!e&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){e=true;b&&b();d.onload=d.onreadystatechange=null;d.parentNode.tagName=="HEAD"&&c.removeChild(d)}};c.appendChild(d)}};
O.prototype.createStyle=function(a){var b=this.p.createElement("style");b.setAttribute("type","text/css");if(b.styleSheet)b.styleSheet.cssText=a;else b.appendChild(document.createTextNode(a));return b};function na(a){for(var b=a.xa.join(","),c=[],d=0;d<a.N.length;d++){var e=a.N[d];c.push(e.name+":"+e.value+";")}return b+"{"+c.join("")+"}"}function P(a,b){this.A=a;this.Q=b}
P.prototype.watch=function(a,b,c){var d=[],e={};d.push(this.A);e[this.A]=this.Q[b.getStylesheetFormatId()]||[];a.watch(d,e,{},c)};function Q(a,b,c){this.ya=a;this.I=b;this.va=c}Q.prototype.buildUrl=function(a,b){a=this.ya&&a?"https:":"http:";var c=typeof this.I=="function"?this.I(a):this.I;return a+"//"+c+this.va+b};
function oa(a,b,c){if(a.R){var d=function(){try{b._gat._getTracker("UA-8850781-3")._trackPageview();b.tkKitsTracked||(b.tkKitsTracked=0);b.tkKitsTracked++}catch(e){}};if(b._gat)d();else{a=a.R.buildUrl(c.isHttps(),"/ga.js");c.loadScript(a,d)}}}function R(a,b,c){this.u=a;this.$=b;this.T=c}R.prototype.getId=n("u");R.prototype.getStylesheetFormatId=n("$");
R.prototype.isUserAgent=function(a){return this.T?this.T(a.getName(),a.getVersion(),a.getEngine(),a.getEngineVersion(),a.getPlatform(),a.getPlatformVersion(),a.getDocumentMode()):false};R.prototype.buildCssUrl=function(a,b,c,d){c="/"+c+"-"+this.$+".css";if(d)c+="?"+d;return b.buildUrl(a,c)};function S(){this.r=[]}S.prototype.addBrowser=function(a){this.getBrowserById(a.getId())||this.r.push(a)};S.prototype.getBrowserById=function(a){for(var b=0;b<this.r.length;b++){var c=this.r[b];if(a===c.getId())return c}return null};
S.prototype.findBrowser=function(a){for(var b=0;b<this.r.length;b++){var c=this.r[b];if(c.isUserAgent(a))return c}return null};S.prototype.addBrowsersToBrowserSet=function(a){for(var b=0;b<this.r.length;b++)a.addBrowser(this.r[b])};function T(a){this.u=a;this.D=new S;this.t=[];this.F=[]}p=T.prototype;p.getId=n("u");p.setSecurityToken=function(a){this.wa=a};p.setNestedUrl=function(a){this.pa=a};p.setKitOptions=function(a){this.B=a};p.addBrowser=function(a){this.D.addBrowser(a)};p.addFontFamily=function(a){this.t.push(a)};
p.addCssRule=function(a){this.F.push(a)};p.supportsBrowser=function(a){return!!this.D.getBrowserById(a.getId())};p.addBrowsersToBrowserSet=function(a){this.D.addBrowsersToBrowserSet(a)};p.init=function(a){for(var b=[],c=0;c<this.F.length;c++)b.push(na(this.F[c]));a.insertInto("head",a.createStyle(b.join("")))};
p.load=function(a,b,c,d){var e=c.buildCssUrl(a.isHttps(),this.pa,this.u,this.wa);a.insertInto("head",a.createCssLink(e));b&&a.whenBodyExists(function(g,i,h,f){return function(){for(var k=0;k<g.t.length;k++)g.t[k].watch(i,h,f&&k==g.t.length-1)}}(this,b,c,d))};p.collectFontFamilies=function(a,b,c){for(var d=0;d<this.t.length;d++){var e=this.t[d];b.push(e.A);c[e.A]=e.Q[a.getStylesheetFormatId()]||[]}};
p.performOptionalActions=function(a,b,c){this.B&&c.whenBodyExists(function(d,e,g,i){return function(){oa(d.B,e,i);var h=d.B,f=d.u;if(h.V){h=h.V.buildUrl(i.isHttps(),"/"+f+".js?"+ +new Date);i.loadScript(h)}f=d.B;h=d.u;if(f.J){f=f.J.m(h,g,i);f.setAttribute("id","typekit-badge-"+h);i.insertInto("body",f)}}}(this,a,b,c))};function U(a,b,c,d,e){this.ma=a;this.j=b;this.i=c;this.l=d;this.q=e;this.k=[]}U.prototype.C=function(a){this.k.push(a)};
U.prototype.load=function(a,b){a=a;var c=b||{};if(typeof a=="string")a=[a];else if(a&&a.length)a=a;else{c=a||{};a=[]}if(a.length){var d=this,e=a.length;for(b=0;b<a.length;b++)pa(this,a[b],function(){--e==0&&V(d,c)})}else V(this,c)};function pa(a,b,c){a.j.loadScript(a.ma.buildUrl(a.j.isHttps(),"/"+b+".js"),c)}
function V(a,b){if(b.userAgent)a.i=(new t(b.userAgent,document)).parse();b=new fa(a.j,a.l,b);for(var c=new S,d=0;d<a.k.length;d++)a.k[d].addBrowsersToBrowserSet(c);c=c.findBrowser(a.i);for(d=0;d<a.k.length;d++)a.k[d].init(a.j);if(c){b.j.appendClassName(b.l,b.n.m(b.o,"loading"));C(b,"loading");qa(a,c,b)}else A(b);a.k=[]}
function qa(a,b,c){c=new D(a.j,c,{H:function(g){return g.offsetWidth}},a.q,function(){return+new Date});for(var d=0;d<a.k.length;d++){var e=a.k[d];if(e.supportsBrowser(b)){e.load(a.j,c,b,d==a.k.length-1);e.performOptionalActions(window,a.i,a.j)}}}function W(a,b,c){this.S=a;this.j=b;this.q=c;this.k=[]}W.prototype.C=function(a){this.k.push(a)};
W.prototype.load=function(){var a=this.S.__webfonttypekitmodule__;if(a)for(var b=0;b<this.k.length;b++){var c=this.k[b],d=a[c.getId()];if(d){var e=this.j,g=this.q;d(function(i,h,f){var k=new S;c.addBrowsersToBrowserSet(k);h=[];var m={};if(k=k.findBrowser(i)){c.init(e);c.load(e,null,k,g);c.collectFontFamilies(k,h,m);c.performOptionalActions(window,i,e,g)}f(!!k,h,m)})}}};var X=new S;
X.addBrowser(new R("ff36-linux-osx-win2003-win7-winvista-winxp","e",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,
e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return function(f,k,m,o){if(m=="Gecko")if(k=/([0-9]+.[0-9]+)(.([0-9]+)|)/.exec(o)){f=parseFloat(k[1]);k=parseInt(k[3],10);return f>1.9||f>=1.9&&k>1}return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("air-linux-osx-win","b",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=h||(e=="Windows"&&g=="Unknown"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return function(f,k){if(f=="AdobeAIR")if(f=/([0-9]+.[0-9]+)/.exec(k))return parseFloat(f[1])>=
2.5;return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("chrome6-linux-osx","d",function(a,b,c,d,e,g,i){var h=false;h=(h=h||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return function(f,k){if(f=="Chrome")if(f=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(k))if(parseFloat(f[1])>=6)return true}(a,b,
c,d,e,g,i)}));
X.addBrowser(new R("chrome-linux-osx-win2003-win7-winvista-winxp","b",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,
d,e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return function(f,k){if(f=="Chrome"){var m=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(k);if(m){f=parseFloat(m[1]);k=parseInt(m[2],10);m=parseInt(m[3],10);if(f>=6)return false;else if(f>4)return true;else if(f==4&&k>249)return true;else if(f==4&&k==249&&m>=4)return true}}return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("chrome6-win2003-win7-winvista-winxp","e",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false);if(!h)return false;return function(f,k){if(f=="Chrome")if(f=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(k))if(parseFloat(f[1])>=6)return true}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("ff35-linux-osx-win2003-win7-winvista-winxp","b",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,
e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return function(f,k,m,o){if(m=="Gecko"){f=/1.9.1b[1-3]{1}/;return/1.9.1/.test(o)&&!f.test(o)}return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("opera-linux-osx-win2003-win7-winvista-winxp","b",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,
e,g,i))||(e=="Ubuntu"||e=="Linux"?true:false);if(!h)return false;return a=="Opera"?parseFloat(b)>=10.54:false}));
X.addBrowser(new R("safari-osx-win2003-win7-winvista-winxp","b",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false))||function(f,k,m,o,j,l){f=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(j=="Macintosh"&&f){j=parseInt(f[1],10);l=parseInt(f[3],10);if(j==10)return l>3;else if(j>10)return true}else return j=="Macintosh"&&l=="Unknown"?true:false}(a,b,c,d,e,g,i);
if(!h)return false;return function(f,k,m,o,j){if(f=="Safari"&&m=="AppleWebKit"||f=="Unknown"&&m=="AppleWebKit"&&(j=="iPhone"||j=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(o))return parseFloat(f[1])>=525.13;return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("ie9-winvista","h",function(a,b,c,d,e,g,i){var h=false;h=h||(e=="Windows"&&g=="6.0"?true:false);if(!h)return false;return function(f,k,m,o,j,l,B){if(f=="MSIE"){if(f=/([0-9]+.[0-9]+)/.exec(k))return parseFloat(f[1])>=9&&B>=9;return false}}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("safari-android","a",function(a,b,c,d,e,g,i){var h=false;h=h||function(f,k,m,o,j,l){f=/([0-9]+).([0-9]+)/.exec(l);if(j=="Android"&&f){j=parseInt(f[1]);f=parseInt(f[2]);return j>2||j==2&&f>=2}else return false}(a,b,c,d,e,g,i);if(!h)return false;return function(f,k,m,o,j){if(f=="Safari"&&m=="AppleWebKit"||f=="Unknown"&&m=="AppleWebKit"&&(j=="iPhone"||j=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(o))return parseFloat(f[1])>=525.13;return false}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("ie9-win7","g",function(a,b,c,d,e,g,i){var h=false;h=h||(e=="Windows"&&g=="6.1"?true:false);if(!h)return false;return function(f,k,m,o,j,l,B){if(f=="MSIE"){if(f=/([0-9]+.[0-9]+)/.exec(k))return parseFloat(f[1])>=9&&B>=9;return false}}(a,b,c,d,e,g,i)}));
X.addBrowser(new R("ie-win2003-win7-winvista-winxp","c",function(a,b,c,d,e,g,i){var h=false;h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?true:false))||(e=="Windows"&&g=="5.2"?true:false))||(e=="Windows"&&g=="6.0"?true:false))||(e=="Windows"&&g=="6.1"?true:false);if(!h)return false;return function(f,k,m,o,j,l,B){if(f=="MSIE"){if(f=/([0-9]+.[0-9]+)/.exec(k))return parseFloat(f[1])>=6&&(B===undefined||B<9);return false}}(a,b,c,d,e,g,i)}));
if(!window.Typekit){var ra=new Q(true,"use.typekit.com","/"),sa=(new t(navigator.userAgent,document)).parse(),ta=new O(document,sa),ua=function(a,b){setTimeout(a,b)},Y=new U(ra,ta,sa,document.documentElement,ua),Z=new W(window,ta,ua);window.Typekit=Y;window.Typekit.load=Y.load;window.Typekit.addKit=Y.C}var va,wa,$;va=new Q(true,"use.typekit.com","/k");wa=new function(a,b,c){this.J=a;this.R=b;this.V=c}(null,null,null);$=new T("sdp6zwe");$.setSecurityToken("3bb2a6e53c9684ffdc9a98f6135b2a62e9fd3f37bbbb30d58844c72ca54eee1674e6d7d0642d87ae69298317c8948cb0fcfb63c647dca0104a4244a3f4ef2893a09510b24155e6ee7bc22d0dd662116a81411d63f68d56763366900c294418728cc2fa56007a86dbd1abde62b3e37de5fec56f55811e2a6b481f1c0ccd4a20da7fa38735cfef4183cf8ac5e3dbb3de007d473ad2ab6ceae6658b598bf095767497dbc6e7788f242284b422a73a528a5f174572db76707f7eb0b824ac900d5d255689dd3a3612844e7b0e86e82ec20bcdbd");
$.setNestedUrl(va);$.setKitOptions(wa);$.addFontFamily(new P('"myriad-pro-1","myriad-pro-2"',{a:["n3","n4","i4","n6"],b:["n3","n4","i4","n6"],c:["n4","i4","n6"],d:["n3","n4","i4","n6"],e:["n3","n4","i4","n6"],f:["n3","n4","i4","n6"],g:["n3","n4","i4","n6"],h:["n3","n4","i4","n6"]}));$.addCssRule(new function(a,b){this.xa=a;this.N=b}([".Text"],[{value:'"myriad-pro-1","myriad-pro-2","Helvetica","Arial",sans-serif',name:"font-family"}]));$.addBrowser(X.getBrowserById("air-linux-osx-win"));$.addBrowser(X.getBrowserById("chrome-linux-osx-win2003-win7-winvista-winxp"));
$.addBrowser(X.getBrowserById("chrome6-linux-osx"));$.addBrowser(X.getBrowserById("chrome6-win2003-win7-winvista-winxp"));$.addBrowser(X.getBrowserById("ff35-linux-osx-win2003-win7-winvista-winxp"));$.addBrowser(X.getBrowserById("ff36-linux-osx-win2003-win7-winvista-winxp"));$.addBrowser(X.getBrowserById("ie-win2003-win7-winvista-winxp"));$.addBrowser(X.getBrowserById("ie9-win7"));$.addBrowser(X.getBrowserById("ie9-winvista"));$.addBrowser(X.getBrowserById("opera-linux-osx-win2003-win7-winvista-winxp"));
$.addBrowser(X.getBrowserById("safari-android"));$.addBrowser(X.getBrowserById("safari-osx-win2003-win7-winvista-winxp"));if(Z&&Z.S.__webfonttypekitmodule__){Z.C($);Z.load()}else window.Typekit.addKit($);
})(this,document);
