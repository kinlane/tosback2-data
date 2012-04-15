window.Modernizr=function(v,n,F){function u(){q.input=function(a){for(var c=0,f=a.length;c<f;c++)G[a[c]]=a[c]in o;return G}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));q.inputtypes=function(a){for(var c=0,f,g,j,r=a.length;c<r;c++){o.setAttribute("type",g=a[c]);(f=o.type!=="text")&&(o.value=x,o.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(g)&&o.style.WebkitAppearance!==F?(y.appendChild(o),j=n.defaultView,f=j.getComputedStyle&&
j.getComputedStyle(o,null).WebkitAppearance!=="textfield"&&o.offsetHeight!==0,y.removeChild(o)):/^(search|tel)$/.test(g)||(/^(url|email)$/.test(g)?f=o.checkValidity&&o.checkValidity()===false:/^color$/.test(g)?(y.appendChild(o),f=o.value!=x,y.removeChild(o)):f=o.value!=x));E[a[c]]=!!f}return E}("search tel url email datetime date month week time datetime-local number range color".split(" "))}function Q(a,c){var f=a.charAt(0).toUpperCase()+a.substr(1);f=(a+" "+M.join(f+" ")+f).split(" ");return N(f,
c)}function N(a,c){for(var f in a)if(J[a[f]]!==F)return c=="pfx"?a[f]:true;return false}var q={},y=n.documentElement;n.head||n.getElementsByTagName("head");var w=n.createElement("modernizr"),J=w.style,o=n.createElement("input"),x=":)",D=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),M="Webkit Moz O ms Khtml".split(" ");w={};var E={},G={},O=[],H=function(a,c,f,g){var j,r=n.createElement("div");if(parseInt(f,10))for(;f--;){j=n.createElement("div");j.id=g?g[f]:"modernizr"+(f+1);r.appendChild(j)}f=["&shy;<style>",
a,"</style>"].join("");r.id="modernizr";r.innerHTML+=f;y.appendChild(r);a=c(r,a);r.parentNode.removeChild(r);return!!a},K,S={}.hasOwnProperty,e;typeof S!==F&&typeof S.call!==F?e=function(a,c){return S.call(a,c)}:e=function(a,c){return c in a&&typeof a.constructor.prototype[c]===F};(function(a,c){var f=a.join(""),g=c.length;H(f,function(j){j=j.childNodes;for(var r={};g--;)r[j[g].id]=j[g];q.touch="ontouchstart"in v||r.touch.offsetTop===9;q.csstransforms3d=r.csstransforms3d.offsetLeft===9},g,c)})([,
["@media (",D.join("touch-enabled),("),"modernizr){#touch{top:9px;position:absolute}}"].join(""),["@media (",D.join("transform-3d),("),"modernizr){#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"touch","csstransforms3d"]);w.touch=function(){return q.touch};w.geolocation=function(){return!!navigator.geolocation};w.cssanimations=function(){return Q("animationName")};w.csstransforms3d=function(){var a=!!N(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);
a&&"webkitPerspective"in y.style&&(a=q.csstransforms3d);return a};w.csstransitions=function(){return Q("transitionProperty")};w.localstorage=function(){try{return!!localStorage.getItem}catch(a){return false}};for(var l in w)e(w,l)&&(K=l.toLowerCase(),q[K]=w[l](),O.push((q[K]?"":"no-")+K));q.input||u();J.cssText="";w=o=null;v.attachEvent&&function(){var a=n.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,c){function f(k){for(var i=-1;++i<L;)k.createElement(r[i])}
a.iepp=a.iepp||{};var g=a.iepp,j=g.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",r=j.split("|"),L=r.length,R=RegExp("(^|\\s)("+j+")","gi"),z=RegExp("<(/*)("+j+")","gi"),b=/^\s*[\{\}]\s*$/,h=RegExp("(^|[^\\n]*?\\s)("+j+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),p=c.createDocumentFragment(),B=c.documentElement;j=B.firstChild;var A=c.createElement("body"),t=c.createElement("style"),P=/print|all/,
d;g.getCSS=function(k,i){if(k+""===F)return"";for(var s=-1,C=k.length,m,I=[];++s<C;){m=k[s];if(!m.disabled){i=m.media||i;P.test(i)&&I.push(g.getCSS(m.imports,i),m.cssText);i="all"}}return I.join("")};g.parseCSS=function(k){for(var i=[],s;(s=h.exec(k))!=null;)i.push(((b.exec(s[1])?"\n":s[1])+s[2]+s[3]).replace(R,"$1.iepp_$2")+s[4]);return i.join("\n")};g.writeHTML=function(){var k=-1;for(d=d||c.body;++k<L;)for(var i=c.getElementsByTagName(r[k]),s=i.length,C=-1;++C<s;)i[C].className.indexOf("iepp_")<
0&&(i[C].className+=" iepp_"+r[k]);p.appendChild(d);B.appendChild(A);A.className=d.className;A.id=d.id;A.innerHTML=d.innerHTML.replace(z,"<$1font")};g._beforePrint=function(){t.styleSheet.cssText=g.parseCSS(g.getCSS(c.styleSheets,"all"));g.writeHTML()};g.restoreHTML=function(){A.innerHTML="";B.removeChild(A);B.appendChild(d)};g._afterPrint=function(){g.restoreHTML();t.styleSheet.cssText=""};f(c);f(p);g.disablePP||(j.insertBefore(t,j.firstChild),t.media="print",t.className="iepp-printshim",a.attachEvent("onbeforeprint",
g._beforePrint),a.attachEvent("onafterprint",g._afterPrint))}(v,n);q._version="2.0.6";q._prefixes=D;q._domPrefixes=M;q.mq=function(a){if(v.matchMedia)return matchMedia(a).matches;var c;H("@media "+a+" { #modernizr { position: absolute; } }",function(f){c=(v.getComputedStyle?getComputedStyle(f,null):f.currentStyle).position=="absolute"});return c};q.testProp=function(a){return N([a])};q.testAllProps=Q;q.testStyles=H;y.className=y.className.replace(/\bno-js\b/,"")+(" js "+O.join(" "));return q}(this,
this.document);
(function(v,n){function F(){H(true)}v.respond={};respond.update=function(){};respond.mediaQueriesSupported=n;if(!n){var u=v.document,Q=u.documentElement,N=[],q=[],y=[],w={},J=u.getElementsByTagName("head")[0]||Q,o=J.getElementsByTagName("link"),x=[],D=function(){for(var e=o.length,l=0,a,c,f;l<e;l++){a=o[l];c=a.href;f=a.media;a=a.rel&&a.rel.toLowerCase()==="stylesheet";c&&a&&!w[c]&&(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(c)||c.replace(RegExp.$1,"").split("/")[0]===v.location.host?x.push({href:c,media:f}):
w[c]=true)}M()},M=function(){if(x.length){var e=x.shift();K(e.href,function(l){E(l,e.href,e.media);w[e.href]=true;M()})}},E=function(e,l,a){var c=e.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),f=c&&c.length||0;l=l.substring(0,l.lastIndexOf("/"));var g=function(p){return p.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+l+"$2$3")},j=!f&&a,r=0,L,R,z,b,h;l.length&&(l+="/");for(j&&(f=1);r<f;r++){L=0;j?(R=a,q.push(g(e))):(R=c[r].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,q.push(RegExp.$2&&
g(RegExp.$2)));b=R.split(",");for(h=b.length;L<h;L++){z=b[L];N.push({media:z.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:q.length-1,minw:z.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:z.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}}H()},G,O,H=function(e){var l=Q.clientWidth,a=u.compatMode==="CSS1Compat"&&l||u.body.clientWidth||l;l={};var c=u.createDocumentFragment(),f=o[o.length-1],g=(new Date).getTime();if(e&&G&&g-G<30){clearTimeout(O);
O=setTimeout(H,30)}else{G=g;for(var j in N){e=N[j];if(!e.minw&&!e.maxw||(!e.minw||e.minw&&a>=e.minw)&&(!e.maxw||e.maxw&&a<=e.maxw)){l[e.media]||(l[e.media]=[]);l[e.media].push(q[e.rules])}}for(j in y)y[j]&&y[j].parentNode===J&&J.removeChild(y[j]);for(j in l){e=u.createElement("style");a=l[j].join("\n");e.type="text/css";e.media=j;e.styleSheet?e.styleSheet.cssText=a:e.appendChild(u.createTextNode(a));c.appendChild(e);y.push(e)}J.insertBefore(c,f.nextSibling)}},K=function(e,l){var a=S();if(a){a.open("GET",
e,true);a.onreadystatechange=function(){a.readyState==4&&(a.status==200||a.status==304)&&l(a.responseText)};a.readyState!=4&&a.send()}},S=function(){for(var e=false,l=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest}],a=l.length;a--;){try{e=l[a]()}catch(c){continue}break}return function(){return e}}();D();respond.update=D;v.addEventListener?v.addEventListener("resize",F,false):v.attachEvent&&v.attachEvent("onresize",F)}})(this,Modernizr.mq("only all"));
(function(v,n,F){function u(){for(var b=1,h=-1;E.length-++h;)if(E[h].s&&!(b=E[h].r))break;b&&q()}function Q(b){var h=n.createElement("script"),p;h.src=b.s;h.onreadystatechange=h.onload=function(){!p&&(!h.readyState||h.readyState=="loaded"||h.readyState=="complete")&&(p=1,u(),h.onload=h.onreadystatechange=null)};x(function(){p||(p=1,u())},z.errorTimeout);b.e?h.onload():D.parentNode.insertBefore(h,D)}function N(b){var h=n.createElement("link"),p;h.href=b.s;h.rel="stylesheet";h.type="text/css";if(!b.e&&
(e||O)){var B=function(A){x(function(){if(!p)try{A.sheet.cssRules.length?(p=1,u()):B(A)}catch(t){t.code==1E3||t.message=="security"||t.message=="denied"?(p=1,x(function(){u()},0)):B(A)}},0)};B(h)}else{h.onload=function(){p||(p=1,x(function(){u()},0))};b.e&&h.onload()}x(function(){p||(p=1,u())},z.errorTimeout);!b.e&&D.parentNode.insertBefore(h,D)}function q(){var b=E.shift();G=1;b?b.t?x(function(){b.t=="c"?N(b):Q(b)},0):(b(),u()):G=0}function y(b,h,p,B,A,t){function P(){!k&&(!d.readyState||d.readyState==
"loaded"||d.readyState=="complete")&&(i.r=k=1,!G&&u(),d.onload=d.onreadystatechange=null,x(function(){K.removeChild(d)},0))}var d=n.createElement(b),k=0,i={t:p,s:h,e:t};d.src=d.data=h;!H&&(d.style.display="none");d.width=d.height="0";b!="object"&&(d.type=p);d.onload=d.onreadystatechange=P;b=="img"?d.onerror=P:b=="script"&&(d.onerror=function(){i.e=i.r=1;q()});E.splice(B,0,i);K.insertBefore(d,H?null:D);x(function(){k||(K.removeChild(d),i.r=i.e=k=1,u())},z.errorTimeout)}function w(b,h,p){var B=h=="c"?
c:a;G=0;h=h||"j";g(b)?y(B,b,h,this.i++,o,p):(E.splice(this.i++,0,b),E.length==1&&q());return this}function J(){var b=z;b.loader={load:w,i:0};return b}var o=n.documentElement,x=v.setTimeout,D=n.getElementsByTagName("script")[0],M={}.toString,E=[],G=0,O="MozAppearance"in o.style,H=O&&!!n.createRange().compareNode,K=H?o:D.parentNode,S=v.opera&&M.call(v.opera)=="[object Opera]",e="webkitAppearance"in o.style,l=e&&"async"in n.createElement("script"),a=O?"object":S||l?"img":"script",c=e?"img":a,f=Array.isArray||
function(b){return M.call(b)=="[object Array]"},g=function(b){return typeof b=="string"},j=function(b){return M.call(b)=="[object Function]"},r=[],L={},R,z;z=function(b){function h(d){d=d.split("!");var k=r.length,i=d.pop(),s=d.length;i={url:i,origUrl:i,prefixes:d};var C,m;for(m=0;m<s;m++)(C=L[d[m]])&&(i=C(i));for(m=0;m<k;m++)i=r[m](i);return i}function p(d,k,i,s,C){var m=h(d),I=m.autoCallback;if(!m.bypass){k&&(k=j(k)?k:k[d]||k[s]||k[d.split("/").pop().split("?")[0]]);if(m.instead)return m.instead(d,
k,i,s,C);i.load(m.url,m.forceCSS||!m.forceJS&&/css$/.test(m.url)?"c":F,m.noexec);(j(k)||j(I))&&i.load(function(){J();k&&k(m.origUrl,C,s);I&&I(m.origUrl,C,s)})}}function B(d,k){function i(T){if(g(T))p(T,m,k,0,s);else if(Object(T)===T)for(I in T)T.hasOwnProperty(I)&&p(T[I],m,k,I,s)}var s=!!d.test,C=d.load||d.both,m=d.callback,I;i(s?d.yep:d.nope);i(C);d.complete&&k.load(d.complete)}var A,t,P=this.yepnope.loader;if(g(b))p(b,0,P,0);else if(f(b))for(A=0;A<b.length;A++){t=b[A];g(t)?p(t,0,P,0):f(t)?z(t):
Object(t)===t&&B(t,P)}else Object(b)===b&&B(b,P)};z.addPrefix=function(b,h){L[b]=h};z.addFilter=function(b){r.push(b)};z.errorTimeout=1E4;n.readyState==null&&n.addEventListener&&(n.readyState="loading",n.addEventListener("DOMContentLoaded",R=function(){n.removeEventListener("DOMContentLoaded",R,0);n.readyState="complete"},0));v.yepnope=J()})(this,this.document);Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
