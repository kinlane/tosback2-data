samestrap=function(a){function g(){var a=j.css,b;if(a){for(b=m.length;--b>=0;)if(m[b].href===a.urls[0]){c("css");break}k+=1,a&&(k<200?setTimeout(g,50):c("css"))}}function f(a){var b;try{b=!!a.sheet.cssRules}catch(d){k+=1,k<200?setTimeout(function(){f(a)},50):b&&c("css");return}c("css")}function e(e,k,m,o,q){var r=function(){c(e)},v=e==="css",x=[],y,z,A,B;h||d();if(k)if(k=typeof k=="string"?[k]:k.concat(),v||h.async||h.gecko||h.opera)l[e].push({urls:k,callback:m,obj:o,context:q});else{y=0;for(z=k.length;y<z;++y)l[e].push({urls:[k[y]],callback:y===z-1?m:null,obj:o,context:q})}if(!j[e]&&(B=j[e]=l[e].shift())){i||(i=a.head||a.getElementsByTagName("head")[0]),k=B.urls,y=0;for(z=k.length;y<z;++y)m=k[y],v?A=h.gecko?b("style"):b("link",{href:m,rel:"stylesheet"}):(A=b("script",{src:m}),A.async=!1),A.className="lazyload",A.setAttribute("charset","utf-8"),h.ie&&!v?A.onreadystatechange=function(){/loaded|complete/.test(A.readyState)&&(A.onreadystatechange=null,r())}:v&&(h.gecko||h.webkit)?h.webkit?(B.urls[y]=A.href,g()):(A.innerHTML='@import "'+m+'";',f(A)):A.onload=A.onerror=r,x.push(A);y=0;for(z=x.length;y<z;++y)i.appendChild(x[y])}}function d(){var b=navigator.userAgent;h={async:a.createElement("script").async===!0},(h.webkit=/AppleWebKit\//.test(b))||(h.ie=/MSIE/.test(b))||(h.opera=/Opera/.test(b))||(h.gecko=/Gecko\//.test(b))||(h.unknown=!0)}function c(a){var b=j[a],c,d;b&&(c=b.callback,d=b.urls,d.shift(),k=0,d.length||(c&&c.call(b.context,b.obj),j[a]=null,l[a].length&&e(a)))}function b(b,c){var d=a.createElement(b),e;for(e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);return d}var h,i,j={},k=0,l={css:[],js:[]},m=a.styleSheets;return{css:function(a,b,c,d){e("css",a,b,c,d)},js:function(a,b,c,d){e("js",a,b,c,d)}}}(this.document)