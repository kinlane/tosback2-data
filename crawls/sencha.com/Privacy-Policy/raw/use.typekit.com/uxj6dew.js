/*{"version":"7084766","mac":"1:2b177bf7f280bc473b4f80fde0cb5b9fbcba83538c6c24528a703852db37ec34","k":"0.12.0","created":"2012-04-10T15:42:05Z"}*/
;(function(window,document,undefined){
var j=true,o=null,q=false;function r(a){return function(c){this[a]=c}}function s(a){return function(){return this[a]}}var t;function u(a,c){var b=arguments.length>2?Array.prototype.slice.call(arguments,2):[];return function(){b.push.apply(b,arguments);return c.apply(a,b)}}function v(a,c){this.q=a;this.j=c}t=v.prototype;
t.createElement=function(a,c,b){a=this.q.createElement(a);if(c)for(var e in c)if(c.hasOwnProperty(e))if(e=="style"){var f=a,g=c[e];if(this.j.getName()=="MSIE")f.style.cssText=g;else f.setAttribute("style",g)}else a.setAttribute(e,c[e]);b&&a.appendChild(this.q.createTextNode(b));return a};t.insertInto=function(a,c){var b=this.q.getElementsByTagName(a)[0];if(!b)b=document.documentElement;if(b&&b.lastChild){b.insertBefore(c,b.lastChild);return j}return q};
t.whenBodyExists=function(a){function c(){document.body?a():setTimeout(c,0)}c()};t.removeElement=function(a){if(a.parentNode){a.parentNode.removeChild(a);return j}return q};t.createCssLink=function(a){return this.createElement("link",{rel:"stylesheet",href:a})};t.appendClassName=function(a,c){for(var b=a.className.split(/\s+/),e=0,f=b.length;e<f;e++)if(b[e]==c)return;b.push(c);a.className=b.join(" ").replace(/^\s+/,"")};
t.removeClassName=function(a,c){for(var b=a.className.split(/\s+/),e=[],f=0,g=b.length;f<g;f++)b[f]!=c&&e.push(b[f]);a.className=e.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")};t.hasClassName=function(a,c){for(var b=a.className.split(/\s+/),e=0,f=b.length;e<f;e++)if(b[e]==c)return j;return q};function w(a,c,b,e,f,g,k,h){this.R=a;this.Qa=c;this.za=b;this.ya=e;this.Ka=f;this.Ja=g;this.xa=k;this.Ua=h}t=w.prototype;t.getName=s("R");t.getVersion=s("Qa");t.getEngine=s("za");t.getEngineVersion=s("ya");
t.getPlatform=s("Ka");t.getPlatformVersion=s("Ja");t.getDocumentMode=s("xa");function x(a,c){this.j=a;this.v=c}var aa=new w("Unknown","Unknown","Unknown","Unknown","Unknown","Unknown",undefined,q);
x.prototype.parse=function(){var a;if(this.j.indexOf("MSIE")!=-1){a=y(this,this.j,/(MSIE [\d\w\.]+)/,1);if(a!=""){var c=a.split(" ");a=c[0];c=c[1];a=new w(a,c,a,c,z(this),A(this),B(this,this.v),C(this,c)>=6)}else a=new w("MSIE","Unknown","MSIE","Unknown",z(this),A(this),B(this,this.v),q)}else{if(this.j.indexOf("Opera")!=-1)a:{c=a="Unknown";var b=y(this,this.j,/(Presto\/[\d\w\.]+)/,1);if(b!=""){c=b.split("/");a=c[0];c=c[1]}else{if(this.j.indexOf("Gecko")!=-1)a="Gecko";b=y(this,this.j,/rv:([^\)]+)/,
1);if(b!="")c=b}if(this.j.indexOf("Version/")!=-1){b=y(this,this.j,/Version\/([\d\.]+)/,1);if(b!=""){a=new w("Opera",b,a,c,z(this),A(this),B(this,this.v),C(this,b)>=10);break a}}b=y(this,this.j,/Opera[\/ ]([\d\.]+)/,1);a=b!=""?new w("Opera",b,a,c,z(this),A(this),B(this,this.v),C(this,b)>=10):new w("Opera","Unknown",a,c,z(this),A(this),B(this,this.v),q)}else{if(this.j.indexOf("AppleWebKit")!=-1){a=z(this);c=A(this);b=y(this,this.j,/AppleWebKit\/([\d\.]+)/,1);if(b=="")b="Unknown";var e="Unknown";
if(this.j.indexOf("Chrome")!=-1||this.j.indexOf("CrMo")!=-1)e="Chrome";else if(this.j.indexOf("Safari")!=-1)e="Safari";else if(this.j.indexOf("AdobeAIR")!=-1)e="AdobeAIR";var f="Unknown";if(this.j.indexOf("Version/")!=-1)f=y(this,this.j,/Version\/([\d\.\w]+)/,1);else if(e=="Chrome")f=y(this,this.j,/(Chrome|CrMo)\/([\d\.]+)/,2);else if(e=="AdobeAIR")f=y(this,this.j,/AdobeAIR\/([\d\.]+)/,1);var g=q;if(e=="AdobeAIR"){g=y(this,f,/\d+\.(\d+)/,1);g=C(this,f)>2||C(this,f)==2&&parseInt(g,10)>=5}else{g=y(this,
b,/\d+\.(\d+)/,1);g=C(this,b)>=526||C(this,b)>=525&&parseInt(g,10)>=13}a=new w(e,f,"AppleWebKit",b,a,c,B(this,this.v),g)}else{if(this.j.indexOf("Gecko")!=-1){c=a="Unknown";e=q;if(this.j.indexOf("Firefox")!=-1){a="Firefox";b=y(this,this.j,/Firefox\/([\d\w\.]+)/,1);if(b!=""){e=y(this,b,/\d+\.(\d+)/,1);c=b;e=b!=""&&C(this,b)>=3&&parseInt(e,10)>=5}}else if(this.j.indexOf("Mozilla")!=-1)a="Mozilla";b=y(this,this.j,/rv:([^\)]+)/,1);if(b=="")b="Unknown";else if(!e){e=C(this,b);f=parseInt(y(this,b,/\d+\.(\d+)/,
1),10);g=parseInt(y(this,b,/\d+\.\d+\.(\d+)/,1),10);e=e>1||e==1&&f>9||e==1&&f==9&&g>=2||b.match(/1\.9\.1b[123]/)!=o||b.match(/1\.9\.1\.[\d\.]+/)!=o}a=new w(a,c,"Gecko",b,z(this),A(this),B(this,this.v),e)}else a=aa;a=a}a=a}a=a}return a};function z(a){var c=y(a,a.j,/(iPod|iPad|iPhone|Android)/,1);if(c!="")return c;a=y(a,a.j,/(Linux|Mac_PowerPC|Macintosh|Windows)/,1);if(a!=""){if(a=="Mac_PowerPC")a="Macintosh";return a}return"Unknown"}
function A(a){var c=y(a,a.j,/(OS X|Windows NT|Android) ([^;)]+)/,2);if(c)return c;if(c=y(a,a.j,/(iPhone )?OS ([\d_]+)/,2))return c;if(a=y(a,a.j,/Linux ([i\d]+)/,1))return a;return"Unknown"}function C(a,c){var b=y(a,c,/(\d+)/,1);if(b!="")return parseInt(b,10);return-1}function y(a,c,b,e){if((a=c.match(b))&&a[e])return a[e];return""}function B(a,c){if(c.documentMode)return c.documentMode}function ba(a,c,b,e){this.c=a;this.k=c;this.U=b;this.o=e||"wf";this.m=new D("-")}
function E(a){a.c.removeClassName(a.k,a.m.l(a.o,"loading"));a.c.hasClassName(a.k,a.m.l(a.o,"active"))||a.c.appendClassName(a.k,a.m.l(a.o,"inactive"));G(a,"inactive")}function G(a,c,b,e){a.U[c]&&a.U[c](b,e)}function H(a,c,b,e,f){this.c=a;this.B=c;this.D=b;this.t=e;this.J=f;this.X=0;this.ta=this.ga=q}
H.prototype.watch=function(a,c,b,e,f){for(var g=a.length,k=0;k<g;k++){var h=a[k];c[h]||(c[h]=["n4"]);this.X+=c[h].length}if(f)this.ga=f;for(k=0;k<g;k++){h=a[k];f=c[h];for(var d=b[h],m=0,n=f.length;m<n;m++){var p=f[m],i=this.B,l=h,F=p;i.c.appendClassName(i.k,i.m.l(i.o,l,F,"loading"));G(i,"fontloading",l,F);i=u(this,this.Aa);l=u(this,this.Ba);(new e(i,l,this.c,this.D,this.t,this.J,h,p,d)).start()}}};
H.prototype.Aa=function(a,c){var b=this.B;b.c.removeClassName(b.k,b.m.l(b.o,a,c,"loading"));b.c.removeClassName(b.k,b.m.l(b.o,a,c,"inactive"));b.c.appendClassName(b.k,b.m.l(b.o,a,c,"active"));G(b,"fontactive",a,c);this.ta=j;I(this)};H.prototype.Ba=function(a,c){var b=this.B;b.c.removeClassName(b.k,b.m.l(b.o,a,c,"loading"));b.c.hasClassName(b.k,b.m.l(b.o,a,c,"active"))||b.c.appendClassName(b.k,b.m.l(b.o,a,c,"inactive"));G(b,"fontinactive",a,c);I(this)};
function I(a){if(--a.X==0&&a.ga)if(a.ta){a=a.B;a.c.removeClassName(a.k,a.m.l(a.o,"loading"));a.c.removeClassName(a.k,a.m.l(a.o,"inactive"));a.c.appendClassName(a.k,a.m.l(a.o,"active"));G(a,"active")}else E(a.B)}
function J(a,c,b,e,f,g,k,h,d){this.va=a;this.Ea=c;this.c=b;this.D=e;this.t=f;this.J=g;this.Ia=new K;this.Da=new ca;this.aa=k;this.$=h;this.Ca=d||"BESbswy";this.ia=da(this,"arial,'URW Gothic L',sans-serif");this.ja=da(this,"Georgia,'Century Schoolbook L',serif");this.ea=this.ia;this.fa=this.ja;this.oa=L(this,"arial,'URW Gothic L',sans-serif");this.pa=L(this,"Georgia,'Century Schoolbook L',serif")}J.prototype.start=function(){this.Oa=this.J();this.V()};
J.prototype.V=function(){var a=this.D.O(this.oa),c=this.D.O(this.pa);if((this.ia!=a||this.ja!=c)&&this.ea==a&&this.fa==c)ea(this,this.va);else if(this.J()-this.Oa>=5E3)ea(this,this.Ea);else{this.ea=a;this.fa=c;fa(this)}};function fa(a){a.t(function(c,b){return function(){b.call(c)}}(a,a.V),25)}function ea(a,c){a.c.removeElement(a.oa);a.c.removeElement(a.pa);c(a.aa,a.$)}function da(a,c){var b=L(a,c,j),e=a.D.O(b);a.c.removeElement(b);return e}
function L(a,c,b){c=a.c.createElement("span",{style:ga(a,c,a.$,b)},a.Ca);a.c.insertInto("body",c);return c}function ga(a,c,b,e){b=a.Da.expand(b);return"position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;font-family:"+(e?"":a.Ia.quote(a.aa)+",")+c+";"+b}function D(a){this.Ga=a||"-"}D.prototype.l=function(){for(var a=[],c=0;c<arguments.length;c++)a.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return a.join(this.Ga)};
function K(){this.na="'"}K.prototype.quote=function(a){var c=[];a=a.split(/,\s*/);for(var b=0;b<a.length;b++){var e=a[b].replace(/['"]/g,"");e.indexOf(" ")==-1?c.push(e):c.push(this.na+e+this.na)}return c.join(",")};function ca(){this.la=ha;this.F=ia}var ha=["font-style","font-weight"],ia={"font-style":[["n","normal"],["i","italic"],["o","oblique"]],"font-weight":[["1","100"],["2","200"],["3","300"],["4","400"],["5","500"],["6","600"],["7","700"],["8","800"],["9","900"],["4","normal"],["7","bold"]]};
function ja(a,c,b){this.Fa=a;this.La=c;this.F=b}ja.prototype.expand=function(a,c){for(var b=0;b<this.F.length;b++)if(c==this.F[b][0]){a[this.Fa]=this.La+":"+this.F[b][1];break}};ca.prototype.expand=function(a){if(a.length!=2)return o;for(var c=[o,o],b=0,e=this.la.length;b<e;b++){var f=this.la[b];(new ja(b,f,this.F[f])).expand(c,a.substr(b,1))}return c[0]&&c[1]?c.join(";")+";":o};function M(a,c){this.q=a;this.j=c}M.prototype=v.prototype;
M.prototype.isHttps=function(){return this.q.location.protocol=="https:"};M.prototype.getHostName=function(){return this.q.location.hostname};M.prototype.loadScript=function(a,c){var b=this.q.getElementsByTagName("head")[0];if(b){var e=this.q.createElement("script");e.src=a;var f=q;e.onload=e.onreadystatechange=function(){if(!f&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){f=j;c&&c();e.onload=e.onreadystatechange=o;e.parentNode.tagName=="HEAD"&&b.removeChild(e)}};b.appendChild(e)}};
M.prototype.createStyle=function(a){var c=this.q.createElement("style");c.setAttribute("type","text/css");if(c.styleSheet)c.styleSheet.cssText=a;else c.appendChild(document.createTextNode(a));return c};function ka(a){for(var c=a.Ma.join(","),b=[],e=0;e<a.Y.length;e++){var f=a.Y[e];b.push(f.name+":"+f.value+";")}return c+"{"+b.join("")+"}"}function N(a,c,b,e){this.C=a;this.I=c;this.w=b;this.Ta=e;this.ba={};this.Z={}}
N.prototype.z=function(a){return a?(this.ba[a.getStylesheetFormatId()]||this.I).slice(0):this.I.slice(0)};N.prototype.getId=s("w");function la(a,c,b){for(var e=[],f=a.C.split(",")[0].replace(/"|'/g,""),g=a.z(),k,h=[],d={},m=0;m<g.length;m++){k=g[m];if(k.length>0&&!d[k]){d[k]=j;h.push(k)}}b=b.ma?b.ma(f,h,e):h;c=c.getStylesheetFormatId();a.ba[c]=b;a.Z[c]=e}N.prototype.watch=function(a,c,b){var e=[],f={};ma(this,c,e,f);a(e,f,b)};
function ma(a,c,b,e){b.push(a.C);e[a.C]=a.z(c);a=a.Z[c.getStylesheetFormatId()]||[];for(c=0;c<a.length;c++){for(var f=a[c],g=f.C,k=q,h=0;h<b.length;h++)if(b[h]==g)k=j;if(!k){b.push(g);e[g]=f.z()}}}function na(a,c){this.C=a;this.I=c}na.prototype.z=s("I");function O(a,c,b){this.Na=a;this.P=c;this.qa=b}O.prototype.buildUrl=function(a,c){var b=this.Na&&a?"https:":"http:",e=typeof this.P=="function"?this.P(b):this.P;return b+"//"+e+(this.qa=="/"?"":this.qa)+c};
function oa(a,c){var b=new Image(1,1);b.src=c;b.onload=function(){b.onload=o}}function P(a,c,b){this.w=a;this.sa=c;this.da=b}P.prototype.getId=s("w");P.prototype.getStylesheetFormatId=s("sa");P.prototype.isUserAgent=function(a){return this.da?this.da(a.getName(),a.getVersion(),a.getEngine(),a.getEngineVersion(),a.getPlatform(),a.getPlatformVersion(),a.getDocumentMode()):q};P.prototype.buildCssUrl=function(a,c,b,e){b="/"+b+"-"+this.sa+".css";if(e)b+="?"+e;return c.buildUrl(a,b)};
function Q(){this.u=[]}Q.prototype.addBrowser=function(a){this.getBrowserById(a.getId())||this.u.push(a)};Q.prototype.getBrowserById=function(a){for(var c=0;c<this.u.length;c++){var b=this.u[c];if(a===b.getId())return b}return o};Q.prototype.findBrowser=function(a){for(var c=0;c<this.u.length;c++){var b=this.u[c];if(b.isUserAgent(a))return b}return o};Q.prototype.addBrowsersToBrowserSet=function(a){for(var c=0;c<this.u.length;c++)a.addBrowser(this.u[c])};
function pa(a){this.w=a;this.L=new Q;this.n=[];this.M=[];this.N=this.W=this.A=o}t=pa.prototype;t.getId=s("w");t.setSecurityToken=r("ra");t.setNestedUrl=r("ha");t.setFontFilterSet=r("N");t.setKitOptions=r("Q");t.addBrowser=function(a){this.L.addBrowser(a)};t.addFontFamily=function(a){this.n.push(a)};t.addCssRule=function(a){this.M.push(a)};t.supportsBrowser=function(a){return!!this.L.getBrowserById(a.getId())};t.addBrowsersToBrowserSet=function(a){this.L.addBrowsersToBrowserSet(a)};
t.init=function(a){for(var c=[],b=0;b<this.M.length;b++)c.push(ka(this.M[b]));a.insertInto("head",a.createStyle(c.join("")))};
t.load=function(a,c,b,e){if(this.N)for(var f=qa(this.N,b.getStylesheetFormatId()),g=0;g<this.n.length;g++)la(this.n[g],b,f);if(this.A&&this.W){this.A.wa(new ra(b.getStylesheetFormatId()));g=new sa(a,this.G,this.n);f=ta(this.W,b.getStylesheetFormatId(),g);for(g=0;g<f.length;g++)this.A.wa(f[g]);this.A.Sa(this.ra);g=this.A.buildUrl(a.isHttps(),this.ha)}else g=b.buildCssUrl(a.isHttps(),this.ha,this.w,this.ra);a.insertInto("head",a.createCssLink(g));c&&a.whenBodyExists(function(k,h,d,m){return function(){for(var n=
0;n<k.n.length;n++)k.n[n].watch(h,d,m&&n==k.n.length-1)}}(this,c,b,e))};t.collectFontFamilies=function(a,c,b){for(var e=0;e<this.n.length;e++)ma(this.n[e],a,c,b)};t.performOptionalActions=function(a,c,b){this.Q&&b.whenBodyExists(function(e,f,g,k){return function(){var h=e.Q;h.ka&&oa(h,h.ka.buildUrl(k.isHttps()));var d=e.Q;h=e.w;if(d.T){d=d.T.l(h,g,k);d.setAttribute("id","typekit-badge-"+h);k.insertInto("body",d)}}}(this,a,c,b))};
function R(a,c,b,e,f){this.Ha=a;this.c=c;this.j=b;this.k=e;this.t=f;this.p=[]}R.prototype.K=function(a){this.p.push(a)};R.prototype.load=function(a,c){var b=a,e=c||{};if(typeof b=="string")b=[b];else if(b&&b.length)b=b;else{e=b||{};b=[]}if(b.length)for(var f=this,g=b.length,k=0;k<b.length;k++)this.ua(b[k],function(){--g==0&&f.S(e)});else this.S(e)};R.prototype.ua=function(a,c){this.c.loadScript(this.Ha.buildUrl(this.c.isHttps(),"/"+a+".js"),c)};
R.prototype.S=function(a){if(a.userAgent)this.j=(new x(a.userAgent,document)).parse();a=new ba(this.c,this.k,a);for(var c=new Q,b=0;b<this.p.length;b++)this.p[b].addBrowsersToBrowserSet(c);c=c.findBrowser(this.j);for(b=0;b<this.p.length;b++)this.p[b].init(this.c);if(c){a.c.appendClassName(a.k,a.m.l(a.o,"loading"));G(a,"loading");ua(this,c,a)}else E(a);this.p=[]};
function ua(a,c,b){function e(k,h,d){f.watch(k,h,{},J,d)}var f=new H(a.c,b,{O:function(k){return k.offsetWidth}},a.t,function(){return+new Date});for(b=0;b<a.p.length;b++){var g=a.p[b];if(g.supportsBrowser(c)){g.load(a.c,e,c,b==a.p.length-1);g.performOptionalActions(window,a.j,a.c)}}}function S(a,c,b){this.ca=a;this.c=c;this.t=b;this.p=[]}S.prototype.K=function(a){this.p.push(a)};
S.prototype.load=function(){var a=this.ca.__webfonttypekitmodule__;if(a)for(var c=0;c<this.p.length;c++){var b=this.p[c],e=a[b.getId()];if(e){var f=this.c,g=this.t;e(function(k,h,d){var m=new Q;b.addBrowsersToBrowserSet(m);h=[];var n={};if(m=m.findBrowser(k)){b.init(f);b.load(f,o,m,g);b.collectFontFamilies(m,h,n);b.performOptionalActions(window,k,f,g)}d(!!m,h,n)})}}};function T(a,c){this.R=a;this.ma=c}T.prototype.getName=s("R");
function U(a,c){for(var b=0;b<a.H.length;b++){var e=a.H[b];if(c===e.getName())return e}return o}function qa(a,c){var b=a.r[c];return b?U(a,b):o}function ta(a,c,b){var e=[];a=a.s[c]||[];for(c=0;c<a.length;c++){var f;a:switch(a[c]){case "observeddomain":f=new va(b.c);break a;case "fontmask":f=new wa(b.G,b.n);break a;default:f=o}f&&e.push(f)}return e}function sa(a,c,b){this.c=a;this.G=c;this.n=b}function ra(a){this.Pa=a}ra.prototype.toString=s("Pa");function va(a){this.c=a}
va.prototype.toString=function(){var a;a=this.c.getHostName?this.c.getHostName():document.location.hostname;return encodeURIComponent(a)};function wa(a,c){this.G=a;this.n=c}wa.prototype.toString=function(){for(var a=[],c=0;c<this.n.length;c++){var b=this.n[c],e=b.z();b=b.z(this.G);for(var f=0;f<e.length;f++){var g;a:{for(g=0;g<b.length;g++)if(e[f]===b[g]){g=j;break a}g=q}a.push(g?1:0)}}a=a.join("");a=a.replace(/^0+/,"");c=[];for(e=a.length;e>0;e-=4){b=a.slice(e-4<0?0:e-4,e);c.unshift(parseInt(b,2).toString(16))}return c.join("")};
var V=new Q;V.addBrowser(new P("ie9plus-win7plus-winvista","d",function(a,c,b,e,f,g,k){var h=q;h=(h=h||function(m,n,p,i,l,F){m=/^([0-9]+).([0-9]+)/.exec(F);if(l=="Windows"&&m){l=parseInt(m[1],10);m=parseInt(m[2],10);return l>6||l==6&&m>=1}else return q}(a,c,b,e,f,g,k))||(f=="Windows"&&g=="6.0"?j:q);if(!h)return q;var d;if(a=="MSIE")d=k>=9;return d}));
V.addBrowser(new P("ff35-osx","b",function(a,c,b,e,f,g,k){var h=q;h=h||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m,n,p){if(n=="Gecko"){d=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&!d.test(p)}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],
10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;return function(d,m){if(d=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(m);if(n){var p=parseFloat(n[1]),i=parseInt(n[2],10);n=parseInt(n[3],10);if(p>=6)return q;else if(p>4)return j;else if(p==4&&i>249)return j;else if(p==4&&i==249&&n>=4)return j}}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("air-linux-win","a",function(a,c,b,e,f,g,k){var h=q;h=(h=h||(f=="Windows"&&g=="Unknown"?j:q))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;return function(d,m){if(d=="AdobeAIR"){var n=/([0-9]+.[0-9]+)/.exec(m);if(n)return parseFloat(n[1])>=2.5}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("safari5plus-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],10);
return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m,n,p){if(d=="Safari"&&n=="AppleWebKit")if(d=/([0-9]+.[0-9]+)/.exec(p))return parseFloat(d[1])>=534.5;return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("ie6to8-win2003-win7plus-winvista-winxp","i",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m,n,p,i,l,F){if(d=="MSIE"){if(d=/([0-9]+.[0-9]+)/.exec(m))return parseFloat(d[1])>=6&&(F===undefined||
F<9);return q}}(a,c,b,e,f,g,k)}));V.addBrowser(new P("safariany-android3plus","f",function(a,c,b,e,f,g,k){var h=q;h=h||function(d,m,n,p,i,l){d=/([0-9]+).([0-9]+)/.exec(l);if(i=="Android"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i==3&&d>=1||i>3}else return q}(a,c,b,e,f,g,k);if(!h)return q;a=a=="Safari"&&b=="AppleWebKit"||a=="Unknown"&&b=="AppleWebKit"&&(f=="iPhone"||f=="iPad")?j:q;return a}));
V.addBrowser(new P("safariany-ipad5plus-iphone5plus","d",function(a,c,b,e,f,g,k){var h=q;h=(h=h||function(d,m,n,p,i,l){if(i=="iPad")return(d=/^([0-9]+)_([0-9]+)/.exec(l))?parseInt(d[1],10)>=5:q;else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){if(i=="iPhone"||i=="iPod")return(d=/^([0-9]+)_([0-9]+)/.exec(l))?parseInt(d[1],10)>=5:q;else return q}(a,c,b,e,f,g,k);if(!h)return q;a=a=="Safari"&&b=="AppleWebKit"||a=="Unknown"&&b=="AppleWebKit"&&(f=="iPhone"||f=="iPad")?j:q;return a}));
V.addBrowser(new P("safari3to5-osx","b",function(a,c,b,e,f,g,k){var h=q;h=h||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m,n,p){if(d=="Safari"&&n=="AppleWebKit")if(d=/([0-9]+.[0-9]+)/.exec(p)){d=parseFloat(d[1]);return d>=525.13&&d<534.5}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("ff35-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;return function(d,m,n,p){if(n=="Gecko"){d=/1.9.1b[1-3]{1}/;return/1.9.1/.test(p)&&
!d.test(p)}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("opera10-linux-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;return function(d,m){if(d=="Opera"){var n=parseFloat(m);return n>=10.54&&n<
11.1}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("chrome6plus-android3plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],
10);l=parseInt(d[3],10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q))||function(d,m,n,p,i,l){d=/([0-9]+).([0-9]+)/.exec(l);if(i=="Android"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i==3&&d>=1||i>3}else return q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m){if(d=="Chrome"){var n=/([0-9]+.[0-9]+).([0-9]+).([0-9]+)/.exec(m);if(n)if(parseFloat(n[1])>=6)return j}}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("opera10-osx","b",function(a,c,b,e,f,g,k){var h=q;h=h||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m){if(d=="Opera"){var n=parseFloat(m);return n>=10.54&&n<11.1}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("safari3to5-win2003-win7plus-winvista-winxp","a",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m,n,p){if(d=="Safari"&&n=="AppleWebKit")if(d=/([0-9]+.[0-9]+)/.exec(p)){d=parseFloat(d[1]);return d>=
525.13&&d<534.5}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("ff36plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],
10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;return function(d,m,n,p){if(n=="Gecko")if(m=/([0-9]+.[0-9]+)(.([0-9]+)|)/.exec(p)){d=parseFloat(m[1]);m=parseInt(m[3],10);return d>1.9||d>=1.9&&m>1}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("air-osx","b",function(a,c,b,e,f,g,k){var h=q;h=h||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k);if(!h)return q;return function(d,m){if(d=="AdobeAIR"){var n=/([0-9]+.[0-9]+)/.exec(m);if(n)return parseFloat(n[1])>=2.5}return q}(a,c,b,e,f,g,k)}));
V.addBrowser(new P("safariany-android2to3-ipad4-iphone4","a",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=h||function(d,m,n,p,i,l){d=/([0-9]+).([0-9]+)/.exec(l);if(i=="Android"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i==2&&d>=2||i==3&&d<1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){if(i=="iPad")if(d=/^([0-9]+)_([0-9]+)/.exec(l)){m=parseInt(d[2],10);return parseInt(d[1],10)==4&&m>=2}else return q;else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){if(i=="iPhone"||i=="iPod")if(d=/^([0-9]+)_([0-9]+)/.exec(l)){m=
parseInt(d[2],10);return parseInt(d[1],10)==4&&m>=2}else return q;else return q}(a,c,b,e,f,g,k);if(!h)return q;a=a=="Safari"&&b=="AppleWebKit"||a=="Unknown"&&b=="AppleWebKit"&&(f=="iPhone"||f=="iPad")?j:q;return a}));
V.addBrowser(new P("opera11plus-linux-osx-win2003-win7plus-winvista-winxp","d",function(a,c,b,e,f,g,k){var h=q;h=(h=(h=(h=(h=(h=h||(f=="Windows"&&g=="5.1"?j:q))||(f=="Windows"&&g=="5.2"?j:q))||(f=="Windows"&&g=="6.0"?j:q))||function(d,m,n,p,i,l){d=/^([0-9]+).([0-9]+)/.exec(l);if(i=="Windows"&&d){i=parseInt(d[1],10);d=parseInt(d[2],10);return i>6||i==6&&d>=1}else return q}(a,c,b,e,f,g,k))||function(d,m,n,p,i,l){d=/^([0-9]+)(_|.)([0-9]+)/.exec(l);if(i=="Macintosh"&&d){i=parseInt(d[1],10);l=parseInt(d[3],
10);return i>10||i==10&&l>=4}else return i=="Macintosh"&&l=="Unknown"?j:q}(a,c,b,e,f,g,k))||(f=="Ubuntu"||f=="Linux"?j:q);if(!h)return q;a=a=="Opera"?parseFloat(c)>=11.1:q;return a}));var W=new function(){this.H=[];this.r={}},xa=new T("AllFonts",function(a,c){return c});U(W,xa.getName())||W.H.push(xa);
var ya=new T("DefaultFourFontsWithSingleFvdFamilies",function(a,c,b){for(var e=0;e<c.length;e++){var f=c[e],g=a.replace(/(-1|-2)$/,"").slice(0,28)+"-"+f;b.push(new na(g,[f]))}a={};for(f=0;f<c.length;f++){b=c[f];e=b.charAt(1);(a[e]||(a[e]=[])).push(b)}b=[[4,3,2,1,5,6,7,8,9],[7,8,9,6,5,4,3,2,1]];e=[];for(f=0;f<b.length;f++){g=b[f];for(var k=0;k<g.length;k++){var h=g[k];if(a[h]){e=e.concat(a[h]);break}}}b=e;e={};a=[];for(f=0;f<b.length;f++){g=b[f];if(!e[g]){e[g]=j;a.push(g)}}b=[];for(e=0;e<c.length;e++){f=
c[e];for(g=0;g<a.length;g++){k=a[g];k==f&&b.push(k)}}return b});U(W,ya.getName())||W.H.push(ya);W.r.a="AllFonts";W.r.b="AllFonts";W.r.d="AllFonts";W.r.e="AllFonts";W.r.f="AllFonts";W.r.g="AllFonts";W.r.h="AllFonts";W.r.i="DefaultFourFontsWithSingleFvdFamilies";var X=new function(){this.s={}};X.s.a=[];X.s.b=[];X.s.d=[];X.s.e=[];X.s.f=["observeddomain"];X.s.g=["observeddomain"];X.s.h=["observeddomain"];X.s.i=["observeddomain","fontmask"];
if(!window.Typekit){var za=new O(j,"use.typekit.com","/"),Aa=(new x(navigator.userAgent,document)).parse(),Ba=new M(document,Aa),Ca=function(a,c){setTimeout(a,c)},Y=new R(za,Ba,Aa,document.documentElement,Ca),Z=new S(window,Ba,Ca);window.Typekit=Y;window.Typekit.load=Y.load;window.Typekit.addKit=Y.K}var Da,Ea,$;Da=new O(j,"use.typekit.com","/k");Ea=new function(a,c,b){this.T=a;this.Ra=o;this.ka=b}(o,o,o);$=new pa("uxj6dew");$.setSecurityToken("3bb2a6e53c9684ffdc9a99f4135b2a624aa28342259dba49397052f641bc9faae6b8df2294ffd420ac6fece5ee693597873a3454f79aebdbd35d85fad3046aa4fc71149e59a921a1c89f0457b8e0352fd1ea137104333f834f75f225e5611ba3265b5c15b46afb18749b1a35bd555f1e64820671764249f78f310ad42eb9b30ef02fd1e25c5c9edd37f5524326be4bf4defe01df76b0ab07b4525f26c9ae4c309c349c0976d426c2a15ba053a5a506b4efda0e02ee7eb6f639c0f5853fdf58d62031a05ca57cb320e08a0157ba06ed32001853f0bcd07e8ccff1ffaaf0c68c9ddd34471313104f51a9e17f5da2b04172ee46e4e9b980e6d3ea9e16e3991e31ce8293a52f5c7270d6ddbc7b7a0541a06e12b1c298da8478658f450fdf1c4c60edaf86c68090a3e5f02d6c5be64f32fc096e909259951099adeaff784b1c381f73b3252532aec8fe7a0d");
$.setNestedUrl(Da);$.setKitOptions(Ea);$.addFontFamily(new N("klavika-web-1,klavika-web-2",["n3"]));$.addCssRule(new function(a,c){this.Ma=a;this.Y=c}([".tk-klavika-web"],[{value:'"klavika-web-1","klavika-web-2",sans-serif',name:"font-family"}]));$.addBrowser(V.getBrowserById("air-linux-win"));$.addBrowser(V.getBrowserById("air-osx"));$.addBrowser(V.getBrowserById("chrome4to5-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("chrome6plus-android3plus-linux-osx-win2003-win7plus-winvista-winxp"));
$.addBrowser(V.getBrowserById("ff35-linux-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ff35-osx"));$.addBrowser(V.getBrowserById("ff36plus-linux-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie6to8-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("ie9plus-win7plus-winvista"));$.addBrowser(V.getBrowserById("opera10-linux-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("opera10-osx"));$.addBrowser(V.getBrowserById("opera11plus-linux-osx-win2003-win7plus-winvista-winxp"));
$.addBrowser(V.getBrowserById("safari3to5-osx"));$.addBrowser(V.getBrowserById("safari3to5-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("safari5plus-osx-win2003-win7plus-winvista-winxp"));$.addBrowser(V.getBrowserById("safariany-android2to3-ipad4-iphone4"));$.addBrowser(V.getBrowserById("safariany-android3plus"));$.addBrowser(V.getBrowserById("safariany-ipad5plus-iphone5plus"));$.setFontFilterSet(W);if(Z&&Z.ca.__webfonttypekitmodule__){Z.K($);Z.load()}else window.Typekit.addKit($);
})(this,document);