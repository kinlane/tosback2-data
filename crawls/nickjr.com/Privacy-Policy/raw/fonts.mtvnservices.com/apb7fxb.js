/*{"k":"0.11.0","mac":"1:57c1f06072fd6b2d19866bf7d8113c6681f1541952550a0493b9da83cf91c131","version":"9692178","created":"2012-02-22T16:29:43Z"}*/
;(function(window,document,undefined){
var j=true,o=null,q=false;function r(a){return function(c){this[a]=c}}function s(a){return function(){return this[a]}}var t;function u(a,c){var b=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){b.push.apply(b,arguments);return c.apply(a,b)}}function v(a,c){this.q=a;this.j=c}t=v.prototype;
t.createElement=function(a,c,b){a=this.q.createElement(a);if(c)for(var d in c)if(c.hasOwnProperty(d))if(d=="style"){var e=a,g=c[d];if(this.j.getName()=="MSIE")e.style.cssText=g;else e.setAttribute("style",g)}else a.setAttribute(d,c[d]);b&&a.appendChild(this.q.createTextNode(b));return a};t.insertInto=function(a,c){var b=this.q.getElementsByTagName(a)[0];if(!b)b=document.documentElement;if(b&&b.lastChild){b.insertBefore(c,b.lastChild);return j}return q};
t.whenBodyExists=function(a){function c(){document.body?a():setTimeout(c,0)}c()};t.removeElement=function(a){if(a.parentNode){a.parentNode.removeChild(a);return j}return q};t.createCssLink=function(a){return this.createElement("link",{rel:"stylesheet",href:a})};t.appendClassName=function(a,c){for(var b=a.className.split(/\s+/),d=0,e=b.length;d<e;d++)if(b[d]==c)return;b.push(c);a.className=b.join(" ").replace(/^\s+/,"")};
t.removeClassName=function(a,c){for(var b=a.className.split(/\s+/),d=[],e=0,g=b.length;e<g;e++)b[e]!=c&&d.push(b[e]);a.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")};t.hasClassName=function(a,c){for(var b=a.className.split(/\s+/),d=0,e=b.length;d<e;d++)if(b[d]==c)return j;return q};function w(a,c,b,d,e,g,k,h){this.S=a;this.Ta=c;this.Ba=b;this.Aa=d;this.Ma=e;this.La=g;this.za=k;this.Xa=h}t=w.prototype;t.getName=s("S");t.getVersion=s("Ta");t.getEngine=s("Ba");t.getEngineVersion=s("Aa");
t.getPlatform=s("Ma");t.getPlatformVersion=s("La");t.getDocumentMode=s("za");function x(a,c){this.j=a;this.v=c}var aa=new w("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",undefined,q);
x.prototype.parse=function(){var a;if(this.j.indexOf("MSIE")!=-1){a=y(this,this.j,/(MSIE [\d\w\.]+)/,1);if(a!=""){var c=a.split(" ");a=c[0];c=c[1];a=new w(a,c,a,c,z(this),A(this),B(this,this.v),C(this,c)>=6)}else a=new w("MSIE","Unknown","MSIE","Unknown",z(this),A(this),B(this,this.v),q)}else{if(this.j.indexOf("Opera")!=-1)a:{c=a="Unknown";var b=y(this,this.j,/(Presto\/[\d\w\.]+)/,1);if(b!=""){c=b.split("/");a=c[0];c=c[1]}else{if(this.j.indexOf("Gecko")!=-1)a="Gecko";b=y(this,this.j,/rv:([^\)]+)/,
1);if(b!="")c=b}if(this.j.indexOf("Version/")!=-1){b=y(this,this.j,/Version\/([\d\.]+)/,1);if(b!=""){a=new w("Opera",b,a,c,z(this),A(this),B(this,this.v),C(this,b)>=10);break a}}b=y(this,this.j,/Opera[\/ ]([\d\.]+)/,1);a=b!=""?new w("Opera",b,a,c,z(this),A(this),B(this,this.v),C(this,b)>=10):new w("Opera","Unknown",a,c,z(this),A(this),B(this,this.v),q)}else{if(this.j.indexOf("AppleWebKit")!=-1){a=z(this);c=A(this);b=y(this,this.j,/AppleWebKit\/([\d\.]+)/,1);if(b=="")b="Unknown";var d="Unknown";
if(this.j.indexOf("Chrome")!=-1||this.j.indexOf("CrMo")!=-1)d="Chrome";else if(this.j.indexOf("Safari")!=-1)d="Safari";else if(this.j.indexOf("AdobeAIR")!=-1)d="AdobeAIR";var e="Unknown";if(this.j.indexOf("Version/")!=-1)e=y(this,this.j,/Version\/([\d\.\w]+)/,1);else if(d=="Chrome")e=y(this,this.j,/(Chrome|CrMo)\/([\d\.]+)/,2);else if(d=="AdobeAIR")e=y(this,this.j,/AdobeAIR\/([\d\.]+)/,1);var g=q;if(d=="AdobeAIR"){g=y(this,e,/\d+\.(\d+)/,1);g=C(this,e)>2||C(this,e)==2&&parseInt(g,10)>=5}else{g=y(this,
b,/\d+\.(\d+)/,1);g=C(this,b)>=526||C(this,b)>=525&&parseInt(g,10)>=13}a=new w(d,e,"AppleWebKit",b,a,c,B(this,this.v),g)}else{if(this.j.indexOf("Gecko")!=-1){c=a="Unknown";d=q;if(this.j.indexOf("Firefox")!=-1){a="Firefox";b=y(this,this.j,/Firefox\/([\d\w\.]+)/,1);if(b!=""){d=y(this,b,/\d+\.(\d+)/,1);c=b;d=b!=""&&C(this,b)>=3&&parseInt(d,10)>=5}}else if(this.j.indexOf("Mozilla")!=-1)a="Mozilla";b=y(this,this.j,/rv:([^\)]+)/,1);if(b=="")b="Unknown";else if(!d){d=C(this,b);e=parseInt(y(this,b,/\d+\.(\d+)/,
1),10);g=parseInt(y(this,b,/\d+\.\d+\.(\d+)/,1),10);d=d>1||d==1&&e>9||d==1&&e==9&&g>=2||b.match(/1\.9\.1b[123]/)!=o||b.match(/1\.9\.1\.[\d\.]+/)!=o}a=new w(a,c,"Gecko",b,z(this),A(this),B(this,this.v),d)}else a=aa;a=a}a=a}a=a}return a};function z(a){var c=y(a,a.j,/(iPod|iPad|iPhone|Android)/,1);if(c!="")return c;a=y(a,a.j,/(Linux|Mac_PowerPC|Macintosh|Windows)/,1);if(a!=""){if(a=="Mac_PowerPC")a="Macintosh";return a}return"Unknown"}
function A(a){var c=y(a,a.j,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(c)return c;if(c=y(a,a.j,/(iPhone )?OS ([\d_]+)/,2))return c;if(a=y(a,a.j,/Linux ([i\d]+)/,1))return a;return"Unknown"}function C(a,c){var b=y(a,c,/(\d+)/,1);if(b!="")return parseInt(b,10);return-1}function y(a,c,b,d){if((a=c.match(b))&&a[d])return a[d];return""}function B(a,c){if(c.documentMode)return c.documentMode}function ba(a,c,b,d){this.c=a;this.k=c;this.V=b;this.o=d||"wf";this.m=new D("-")}
function E(a){a.c.removeClassName(a.k,a.m.l(a.o,"loading"));a.c.hasClassName(a.k,a.m.l(a.o,"active"))||a.c.appendClassName(a.k,a.m.l(a.o,"inactive"));G(a,"inactive")}function G(a,c,b,d){a.V[c]&&a.V[c](b,d)}function H(a,c,b,d,e){this.c=a;this.B=c;this.D=b;this.t=d;this.J=e;this.Y=0;this.ua=this.ha=q}
H.prototype.watch=function(a,c,b,d,e){for(var g=a.length,k=0;k<g;k++){var h=a[k];c[h]||(c[h]=["n4"]);this.Y+=c[h].length}if(e)this.ha=e;for(k=0;k<g;k++){h=a[k];e=c[h];for(var f=b[h],l=0,n=e.length;l<n;l++){var p=e[l],i=this.B,m=h,F=p;i.c.appendClassName(i.k,i.m.l(i.o,m,F,"loading"));G(i,"fontloading",m,F);i=u(this,this.Ca);m=u(this,this.Da);(new d(i,m,this.c,this.D,this.t,this.J,h,p,f)).start()}}};
H.prototype.Ca=function(a,c){var b=this.B;b.c.removeClassName(b.k,b.m.l(b.o,a,c,"loading"));b.c.removeClassName(b.k,b.m.l(b.o,a,c,"inactive"));b.c.appendClassName(b.k,b.m.l(b.o,a,c,"active"));G(b,"fontactive",a,c);this.ua=j;I(this)};H.prototype.Da=function(a,c){var b=this.B;b.c.removeClassName(b.k,b.m.l(b.o,a,c,"loading"));b.c.hasClassName(b.k,b.m.l(b.o,a,c,"active"))||b.c.appendClassName(b.k,b.m.l(b.o,a,c,"inactive"));G(b,"fontinactive",a,c);I(this)};
function I(a){if(--a.Y==0&&a.ha)if(a.ua){a=a.B;a.c.removeClassName(a.k,a.m.l(a.o,"loading"));a.c.removeClassName(a.k,a.m.l(a.o,"inactive"));a.c.appendClassName(a.k,a.m.l(a.o,"active"));G(a,"active")}else E(a.B)}
function J(a,c,b,d,e,g,k,h,f){this.wa=a;this.Ga=c;this.c=b;this.D=d;this.t=e;this.J=g;this.Ka=new K;this.Fa=new ca;this.ba=k;this.aa=h;this.Ea=f||"BESbswy";this.ja=da(this,"arial,'URW Gothic L',sans-serif");this.ka=da(this,"Georgia,'Century Schoolbook L',serif");this.fa=this.ja;this.ga=this.ka;this.pa=L(this,"arial,'URW Gothic L',sans-serif");this.qa=L(this,"Georgia,'Century Schoolbook L',serif")}J.prototype.start=function(){this.Ra=this.J();this.W()};
J.prototype.W=function(){var a=this.D.P(this.pa),c=this.D.P(this.qa);if((this.ja!=a||this.ka!=c)&&this.fa==a&&this.ga==c)ea(this,this.wa);else if(this.J()-this.Ra>=5E3)ea(this,this.Ga);else{this.fa=a;this.ga=c;fa(this)}};function fa(a){a.t(function(c,b){return function(){b.call(c)}}(a,a.W),25)}function ea(a,c){a.c.removeElement(a.pa);a.c.removeElement(a.qa);c(a.ba,a.aa)}function da(a,c){var b=L(a,c,j),d=a.D.P(b);a.c.removeElement(b);return d}
function L(a,c,b){c=a.c.createElement("span",{style:ga(a,c,a.aa,b)},a.Ea);a.c.insertInto("body",c);return c}function ga(a,c,b,d){b=a.Fa.expand(b);return"position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;font-family:"+(d?"":a.Ka.quote(a.ba)+",")+c+";"+b}function D(a){this.Ia=a||"-"}D.prototype.l=function(){for(var a=[],c=0;c<arguments.length;c++)a.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return a.join(this.Ia)};
function K(){this.oa="'"}K.prototype.quote=function(a){var c=[];a=a.split(/,\s*/);for(var b=0;b<a.length;b++){var d=a[b].replace(/['"]/g,"");d.indexOf(" ")==-1?c.push(d):c.push(this.oa+d+this.oa)}return c.join(",")};function ca(){this.ma=ha;this.F=ia}var ha=["font-style","font-weight"],ia={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"],["4","normal"],["7","bold"]]};
function ja(a,c,b){this.Ha=a;this.Na=c;this.F=b}ja.prototype.expand=function(a,c){for(var b=0;b<this.F.length;b++)if(c==this.F[b][0]){a[this.Ha]=this.Na+":"+this.F[b][1];break}};ca.prototype.expand=function(a){if(a.length!=2)return o;for(var c=[o,o],b=0,d=this.ma.length;b<d;b++){var e=this.ma[b];(new ja(b,e,this.F[e])).expand(c,a.substr(b,1))}return c[0]&&c[1]?c.join(";")+";":o};function M(a,c){this.q=a;this.j=c}M.prototype=v.prototype;
M.prototype.isHttps=function(){return this.q.location.protocol=="https:"};M.prototype.getHostName=function(){return this.q.location.hostname};M.prototype.loadScript=function(a,c){var b=this.q.getElementsByTagName("head")[0];if(b){var d=this.q.createElement("script");d.src=a;var e=q;d.onload=d.onreadystatechange=function(){if(!e&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){e=j;c&&c();d.onload=d.onreadystatechange=o;d.parentNode.tagName=="HEAD"&&b.removeChild(d)}};b.appendChild(d)}};
M.prototype.createStyle=function(a){var c=this.q.createElement("style");c.setAttribute("type","text/css");if(c.styleSheet)c.styleSheet.cssText=a;else c.appendChild(document.createTextNode(a));return c};function ka(a,c){this.Pa=a;this.Z=c}function la(a){for(var c=a.Pa.join(","),b=[],d=0;d<a.Z.length;d++){var e=a.Z[d];b.push(e.name+":"+e.value+";")}return c+"{"+b.join("")+"}"}function N(a,c,b,d){this.C=a;this.I=c;this.w=b;this.Wa=d;this.ca={};this.$={}}
N.prototype.z=function(a){return a?(this.ca[a.getStylesheetFormatId()]||this.I).slice(0):this.I.slice(0)};N.prototype.getId=s("w");function ma(a,c,b){for(var d=[],e=a.C.split(",")[0].replace(/"|'/g,""),g=a.z(),k,h=[],f={},l=0;l<g.length;l++){k=g[l];if(k.length>0&&!f[k]){f[k]=j;h.push(k)}}b=b.na?b.na(e,h,d):h;c=c.getStylesheetFormatId();a.ca[c]=b;a.$[c]=d}N.prototype.watch=function(a,c,b){var d=[],e={};na(this,c,d,e);a(d,e,b)};
function na(a,c,b,d){b.push(a.C);d[a.C]=a.z(c);a=a.$[c.getStylesheetFormatId()]||[];for(c=0;c<a.length;c++){for(var e=a[c],g=e.C,k=q,h=0;h<b.length;h++)if(b[h]==g)k=j;if(!k){b.push(g);d[g]=e.z()}}}function oa(a,c){this.C=a;this.I=c}oa.prototype.z=s("I");function O(a,c,b){this.Qa=a;this.Q=c;this.ra=b}O.prototype.buildUrl=function(a,c){var b=this.Qa&&a?"https:":"http:",d=typeof this.Q=="function"?this.Q(b):this.Q;return b+"//"+d+(this.ra=="/"?"":this.ra)+c};
function pa(a,c){var b=new Image(1,1);b.src=c;b.onload=function(){b.onload=o}}function P(a,c,b){this.w=a;this.ta=c;this.ea=b}P.prototype.getId=s("w");P.prototype.getStylesheetFormatId=s("ta");P.prototype.isUserAgent=function(a){return this.ea?this.ea(a.getName(),a.getVersion(),a.getEngine(),a.getEngineVersion(),a.getPlatform(),a.getPlatformVersion(),a.getDocumentMode()):q};P.prototype.buildCssUrl=function(a,c,b,d){b="/"+b+"-"+this.ta+".css";if(d)b+="?"+d;return c.buildUrl(a,b)};
function Q(){this.u=[]}Q.prototype.addBrowser=function(a){this.getBrowserById(a.getId())||this.u.push(a)};Q.prototype.getBrowserById=function(a){for(var c=0;c<this.u.length;c++){var b=this.u[c];if(a===b.getId())return b}return o};Q.prototype.findBrowser=function(a){for(var c=0;c<this.u.length;c++){var b=this.u[c];if(b.isUserAgent(a))return b}return o};Q.prototype.addBrowsersToBrowserSet=function(a){for(var c=0;c<this.u.length;c++)a.addBrowser(this.u[c])};
function qa(a){this.w=a;this.L=new Q;this.n=[];this.M=[];this.O=this.X=this.A=o}t=qa.prototype;t.getId=s("w");t.setSecurityToken=r("sa");t.setNestedUrl=r("ia");t.setFontFilterSet=r("O");t.setKitOptions=r("R");t.addBrowser=function(a){this.L.addBrowser(a)};t.addFontFamily=function(a){this.n.push(a)};t.addCssRule=function(a){this.M.push(a)};t.supportsBrowser=function(a){return!!this.L.getBrowserById(a.getId())};t.addBrowsersToBrowserSet=function(a){this.L.addBrowsersToBrowserSet(a)};
t.init=function(a){for(var c=[],b=0;b<this.M.length;b++)c.push(la(this.M[b]));a.insertInto("head",a.createStyle(c.join("")))};
t.load=function(a,c,b,d){if(this.O)for(var e=ra(this.O,b.getStylesheetFormatId()),g=0;g<this.n.length;g++)ma(this.n[g],b,e);if(this.A&&this.X){this.A.xa(new sa(b.getStylesheetFormatId()));g=new ta(a,this.G,this.n);e=ua(this.X,b.getStylesheetFormatId(),g);for(g=0;g<e.length;g++)this.A.xa(e[g]);this.A.Va(this.sa);g=this.A.buildUrl(a.isHttps(),this.ia)}else g=b.buildCssUrl(a.isHttps(),this.ia,this.w,this.sa);a.insertInto("head",a.createCssLink(g));c&&a.whenBodyExists(function(k,h,f,l){return function(){for(var n=
0;n<k.n.length;n++)k.n[n].watch(h,f,l&&n==k.n.length-1)}}(this,c,b,d))};t.collectFontFamilies=function(a,c,b){for(var d=0;d<this.n.length;d++)na(this.n[d],a,c,b)};t.performOptionalActions=function(a,c,b){this.R&&b.whenBodyExists(function(d,e,g,k){return function(){var h=d.R;h.la&&pa(h,h.la.buildUrl(k.isHttps()));var f=d.R;h=d.w;if(f.U){f=f.U.l(h,g,k);f.setAttribute("id","typekit-badge-"+h);k.insertInto("body",f)}}}(this,a,c,b))};
function R(a,c,b,d,e){this.Ja=a;this.c=c;this.j=b;this.k=d;this.t=e;this.p=[]}R.prototype.K=function(a){this.p.push(a)};R.prototype.load=function(a,c){var b=a,d=c||{};if(typeof b=="string")b=[b];else if(b&&b.length)b=b;else{d=b||{};b=[]}if(b.length)for(var e=this,g=b.length,k=0;k<b.length;k++)this.va(b[k],function(){--g==0&&e.T(d)});else this.T(d)};R.prototype.va=function(a,c){this.c.loadScript(this.Ja.buildUrl(this.c.isHttps(),"/"+a+".js"),c)};
R.prototype.T=function(a){if(a.userAgent)this.j=(new x(a.userAgent,document)).parse();a=new ba(this.c,this.k,a);for(var c=new Q,b=0;b<this.p.length;b++)this.p[b].addBrowsersToBrowserSet(c);c=c.findBrowser(this.j);for(b=0;b<this.p.length;b++)this.p[b].init(this.c);if(c){a.c.appendClassName(a.k,a.m.l(a.o,"loading"));G(a,"loading");va(this,c,a)}else E(a);this.p=[]};
function va(a,c,b){function d(k,h,f){e.watch(k,h,{},J,f)}var e=new H(a.c,b,{P:function(k){return k.offsetWidth}},a.t,function(){return+new Date});for(b=0;b<a.p.length;b++){var g=a.p[b];if(g.supportsBrowser(c)){g.load(a.c,d,c,b==a.p.length-1);g.performOptionalActions(window,a.j,a.c)}}}function S(a,c,b){this.da=a;this.c=c;this.t=b;this.p=[]}S.prototype.K=function(a){this.p.push(a)};
S.prototype.load=function(){var a=this.da.__webfonttypekitmodule__;if(a)for(var c=0;c<this.p.length;c++){var b=this.p[c],d=a[b.getId()];if(d){var e=this.c,g=this.t;d(function(k,h,f){var l=new Q;b.addBrowsersToBrowserSet(l);h=[];var n={};if(l=l.findBrowser(k)){b.init(e);b.load(e,o,l,g);b.collectFontFamilies(l,h,n);b.performOptionalActions(window,k,e,g)}f(!!l,h,n)})}}};function T(a,c){this.S=a;this.na=c}T.prototype.getName=s("S");
function U(a,c){for(var b=0;b<a.H.length;b++){var d=a.H[b];if(c===d.getName())return d}return o}function ra(a,c){var b=a.r[c];return b?U(a,b):o}function ua(a,c,b){var d=[];a=a.s[c]||[];for(c=0;c<a.length;c++){var e;a:switch(a[c]){case "observeddomain":e=new wa(b.c);break a;case "fontmask":e=new xa(b.G,b.n);break a;default:e=o}e&&d.push(e)}return d}function ta(a,c,b){this.c=a;this.G=c;this.n=b}function sa(a){this.Sa=a}sa.prototype.toString=s("Sa");function wa(a){this.c=a}
wa.prototype.toString=function(){var a;a=this.c.getHostName?this.c.getHostName():document.location.hostname;return encodeURIComponent(a)};function xa(a,c){this.G=a;this.n=c}xa.prototype.toString=function(){for(var a=[],c=0;c<this.n.length;c++){var b=this.n[c],d=b.z();b=b.z(this.G);for(var e=0;e<d.length;e++){var g;a:{for(g=0;g<b.length;g++)if(d[e]===b[g]){g=j;break a}g=q}a.push(g?1:0)}}a=a.join("");a=a.replace(/^0+/,"");c=[];for(d=a.length;d>0;d-=4){b=a.slice(d-4<0?0:d-4,d);c.unshift(parseInt(b,2).toString(16))}return c.join("")};
function ya(a,c,b){this.Oa=a;this.N=c;this.ya=b||function(){return+new Date}}ya.prototype.buildUrl=function(a){for(var c=[],b=0,d=this.N.length;b<d;b+=2)c.push(this.N[b]+"="+this.N[b+1]);c.push("_="+this.ya());return this.Oa.buildUrl(a,"")+"?"+c.join("&")};var V=new Q;
V.addBrowser(new P("ff36plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],
10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l,n,p){if(n=="Gecko")if(l=/([0-9]+.[0-9]+)(.([0-9]+)|)/.exec(p)){f=parseFloat(l[1]);l=parseInt(l[3],10);return f>1.9||f>=1.9&&l>1}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("safari-android3plus","f",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/([0-9]+).([0-9]+)/.exec(m);if(i=="Android"&&f){i=parseInt(f[1]);f=parseInt(f[2]);return i==3&&f>=1||i>3}else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i){if(f=="Safari"&&n=="AppleWebKit"||f=="Unknown"&&n=="AppleWebKit"&&(i=="iPhone"||i=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(f[1])>=525.13;return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("air-linux-osx-win","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q))||(e=="Windows"&&g=="Unknown"?j:q);if(!h)return q;return function(f,l){if(f=="AdobeAIR"){var n=/([0-9]+.[0-9]+)/.exec(l);if(n)return parseFloat(n[1])>=2.5}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("ff35-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l,n,p){if(n=="Gecko"){f=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&
!f.test(p)}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("chrome6plus-android3plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],
10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q))||function(f,l,n,p,i,m){f=/([0-9]+).([0-9]+)/.exec(m);if(i=="Android"&&f){i=parseInt(f[1]);f=parseInt(f[2]);return i==3&&f>=1||i>3}else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l){if(f=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(l);if(n)if(parseFloat(n[1])>=6)return j}}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("safari-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i){if(f=="Safari"&&n=="AppleWebKit"||f=="Unknown"&&n=="AppleWebKit"&&(i=="iPhone"||i=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(f[1])>=525.13;return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],
10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;return function(f,l){if(f=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(l);if(n){var p=parseFloat(n[1]),i=parseInt(n[2],10);n=parseInt(n[3],10);if(p>=6)return q;else if(p>4)return j;else if(p==4&&i>249)return j;else if(p==4&&i==249&&n>=4)return j}}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("ie6to8-win2003-win7plus-winvista-winxp","i",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i,m,F){if(f=="MSIE"){if(f=/([0-9]+.[0-9]+)/.exec(l))return parseFloat(f[1])>=6&&(F===undefined||
F<9);return q}}(a,c,b,d,e,g,k)}));V.addBrowser(new P("opera-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;a=a=="Opera"?parseFloat(c)>=10.54:q;return a}));
V.addBrowser(new P("safari-android2to3-ipad-iphone-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){f=/([0-9]+).([0-9]+)/.exec(m);if(i=="Android"&&f){i=parseInt(f[1]);f=parseInt(f[2]);
return i==2&&f>=2||i==3&&f<1}else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){if(i=="iPad")if(l=/^([0-9]+)_([0-9]+)/.exec(m)){f=parseInt(l[1],10);l=parseInt(l[2],10);return f>4||f==4&&l>=2}else return q;else return q}(a,c,b,d,e,g,k))||function(f,l,n,p,i,m){if(i=="iPhone"||i=="iPod")if(l=/^([0-9]+)_([0-9]+)/.exec(m)){f=parseInt(l[1],10);l=parseInt(l[2],10);return f>4||f==4&&l>=2}else return q;else return q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p,i){if(f=="Safari"&&n=="AppleWebKit"||
f=="Unknown"&&n=="AppleWebKit"&&(i=="iPhone"||i=="iPad"))if(f=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(f[1])>=525.13;return q}(a,c,b,d,e,g,k)}));V.addBrowser(new P("ie9plus-win7plus-winvista","d",function(a,c,b,d,e,g,k){var h=q;h=(h=h||function(l,n,p,i,m,F){l=/^([0-9]+).([0-9]+)/.exec(F);if(m=="Windows"&&l){m=parseInt(l[1],10);l=parseInt(l[2],10);return m>6||m==6&&l>=1}else return q}(a,c,b,d,e,g,k))||(e=="Windows"&&g=="6.0"?j:q);if(!h)return q;var f;if(a=="MSIE")f=k>=9;return f}));
V.addBrowser(new P("ff35-osx","b",function(a,c,b,d,e,g,k){var h=q;h=h||function(f,l,n,p,i,m){f=/^([0-9]+)(_|.)([0-9]+)/.exec(m);if(i=="Macintosh"&&f){i=parseInt(f[1],10);m=parseInt(f[3],10);return i>10||i==10&&m>=4}else return i=="Macintosh"&&m=="Unknown"?j:q}(a,c,b,d,e,g,k);if(!h)return q;return function(f,l,n,p){if(n=="Gecko"){f=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&!f.test(p)}return q}(a,c,b,d,e,g,k)}));
V.addBrowser(new P("opera-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,d,e,g,k){var h=q;h=(h=(h=(h=(h=h||(e=="Windows"&&g=="5.1"?j:q))||(e=="Windows"&&g=="5.2"?j:q))||(e=="Windows"&&g=="6.0"?j:q))||function(f,l,n,p,i,m){f=/^([0-9]+).([0-9]+)/.exec(m);if(i=="Windows"&&f){i=parseInt(f[1],10);f=parseInt(f[2],10);return i>6||i==6&&f>=1}else return q}(a,c,b,d,e,g,k))||(e=="Ubuntu"||e=="Linux"?j:q);if(!h)return q;a=a=="Opera"?parseFloat(c)>=10.54:q;return a}));
var W=new function(){this.H=[];this.r={}},za=new T("AllFonts",function(a,c){return c});U(W,za.getName())||W.H.push(za);
var Aa=new T("DefaultFourFontsWithSingleFvdFamilies",function(a,c,b){for(var d=0;d<c.length;d++){var e=c[d],g=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+e;b.push(new oa(g,[e]))}a={};for(e=0;e<c.length;e++){b=c[e];d=b.charAt(1);(a[d]||(a[d]=[])).push(b)}b=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];d=[];for(e=0;e<b.length;e++){g=b[e];for(var k=0;k<g.length;k++){var h=g[k];if(a[h]){d=d.concat(a[h]);break}}}b=d;d={};a=[];for(e=0;e<b.length;e++){g=b[e];if(!d[g]){d[g]=j;a.push(g)}}b=[];for(d=0;d<c.length;d++){e=
c[d];for(g=0;g<a.length;g++){k=a[g];k==e&&b.push(k)}}return b});U(W,Aa.getName())||W.H.push(Aa);W.r.a="AllFonts";W.r.b="AllFonts";W.r.d="AllFonts";W.r.e="AllFonts";W.r.f="AllFonts";W.r.g="AllFonts";W.r.h="AllFonts";W.r.i="DefaultFourFontsWithSingleFvdFamilies";var X=new function(){this.s={}};X.s.a=[];X.s.b=[];X.s.d=[];X.s.e=[];X.s.f=["observeddomain"];X.s.g=["observeddomain"];X.s.h=["observeddomain"];X.s.i=["observeddomain","fontmask"];
if(!window.Typekit){var Ba=new O(j,"fonts.mtvnservices.com","/"),Ca=(new x(navigator.userAgent,document)).parse(),Da=new M(document,Ca),Ea=function(a,c){setTimeout(a,c)},Y=new R(Ba,Da,Ca,document.documentElement,Ea),Z=new S(window,Da,Ea);window.Typekit=Y;window.Typekit.load=Y.load;window.Typekit.addKit=Y.K}var Fa,Ga=o,Ha=o,Ia,$;Fa=new O(j,"fonts.mtvnservices.com","/k");Ga=new O(j,"use.typekit.com","/s.gif");Ha=new ya(Ga,["a","559811","f","265,1144,1145,7986,7988,7996","ht","sh","k","apb7fxb"]);
Ia=new function(a,c,b){this.U=a;this.Ua=o;this.la=b}(o,o,Ha);$=new qa("apb7fxb");$.setSecurityToken("3bb2a6e53c9684ffdc9a9bfe135b2a62619e5c28019a937bcbf0d7e0a58584da4ece38718b7c40cac339d24b47b761cbece6e588246e965004a9dc3b3ea49d0ba291cb842646653f2abc37bc041b6f7dd4998483e6f5d2b0b57f47ce569031a5a38b6bed4981242060f0eef5ff78432e418bbda616eab84964cf906bb6f68f17814e6ae18d3365431a00d83b81133e195a04074008ce89bae21904859bf4eeeb0510ecfd4bb83e96e22b6c9b829fae23ae849cafd072dcb05509efb9be");$.setNestedUrl(Fa);
$.setKitOptions(Ia);$.addFontFamily(new N("omnes-pro",["n4","n5","n7"]));$.addFontFamily(new N("report",["n4","n6","n7"]));$.addCssRule(new ka([".tk-omnes-pro"],[{name:"font-family",value:'"omnes-pro","Arial","Helvetica",sans-serif'}]));$.addCssRule(new ka([".tk-report"],[{name:"font-family",value:'"report",sans-serif'}]));$.addBrowser(V.getBrowserById("air-linux-osx-win"));$.addBrowser(V.getBrowserById("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("chrome6plus-android3plus-linux-osx-win2003-win7plus-winvista-winxp"));
$.addBrowser(V.getBrowserById("ff35-linux-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ff35-osx"));$.addBrowser(V.getBrowserById("ff36plus-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie6to8-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie9plus-win7plus-winvista"));$.addBrowser(V.getBrowserById("opera-linux-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("opera-osx"));$.addBrowser(V.getBrowserById("safari-android2to3-ipad-iphone-win2003-win7plus-winvista-winxp"));
$.addBrowser(V.getBrowserById("safari-android3plus"));$.addBrowser(V.getBrowserById("safari-osx"));$.setFontFilterSet(W);if(Z&&Z.da.__webfonttypekitmodule__){Z.K($);Z.load()}else window.Typekit.addKit($);
})(this,document);