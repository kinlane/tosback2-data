function CciHttpStatus(req){this.resp=req;this.successful=function(){return(this.resp.status==200)};this.getStatusMessage=function(){return this.resp.statusText};this.getStatusCode=function(){return this.resp.status};this.getContentAsString=function(){return this.resp.responseText};this.getHeaders=function(){return this.resp.getAllResponseHeaders()};this.parseJSON=function(){return eval("("+this.resp.responseText+")")}}function CciAjaxObject(){this.supportsAjax=function(){if(window.XMLHttpRequest){return true}else{if(window.ActiveXObject){return true}}return false};this._addRandomNumberToQueryString=function(B){var A="_pf="+(new Date()).getTime()+"."+Math.floor(Math.random()*32767);if(B.indexOf("?")<0){return B+"?"+A}else{return B+"&"+A}};this.doGet=function(C,D){var B=false;if(window.XMLHttpRequest){B=new XMLHttpRequest()}else{if(window.ActiveXObject){try{B=new ActiveXObject("Msxml2.XMLHTTP")}catch(E){}try{B=new ActiveXObject("Microsoft.XMLHTTP")}catch(E){}}}if(B){try{B.open("GET",this._addRandomNumberToQueryString(C),true);B.setRequestHeader("Connection","close");B.setRequestHeader("Referer",window.location);B.setRequestHeader("User-Agent",navigator.userAgent);B.onreadystatechange=function(){if(B.readyState==4){try{var F=new CciHttpStatus(B);if(D){D(F)}}catch(G){}}};B.send("");return true}catch(A){}}return false};this.doPost=function(D,B,E){var C=false;if(window.XMLHttpRequest){C=new XMLHttpRequest()}else{if(window.ActiveXObject){try{C=new ActiveXObject("Msxml2.XMLHTTP")}catch(F){}try{C=new ActiveXObject("Microsoft.XMLHTTP")}catch(F){}}}if(C){try{C.open("POST",this._addRandomNumberToQueryString(D),true);C.setRequestHeader("Content-type","application/x-www-form-urlencoded");if((B)&&(B.length>0)){C.setRequestHeader("Content-length",B.length)}else{C.setRequestHeader("Content-length","0")}C.setRequestHeader("Connection","close");C.setRequestHeader("Referer",window.location);C.setRequestHeader("User-Agent",navigator.userAgent);C.onreadystatechange=function(){if(C.readyState==4){try{var G=new CciHttpStatus(C);if(E){E(G)}}catch(H){}}};if((B)&&(B.length>0)){C.send(B)}else{C.send("")}return true}catch(A){}}return false};this.getFormDataAndDoPost=function(E,C){try{var A="";for(i=0;i<E.elements.length;++i){if((!E.elements[i].disabled)&&(E.elements[i].tagName.toUpperCase()=="INPUT")){if(E.elements[i].type.toLowerCase()=="checkbox"){if(E.elements[i].checked){A+="&"+E.elements[i].name+"="+E.elements[i].value}}else{if(E.elements[i].type.toLowerCase()=="radio"){if(E.elements[i].checked){A+="&"+E.elements[i].name+"="+E.elements[i].value}}else{if(E.elements[i].name){A+="&"+E.elements[i].name+"="+E.elements[i].value}}}}else{if((!E.elements[i].disabled)&&(E.elements[i].tagName.toUpperCase()=="SELECT")){for(s=0;s<E.elements[i].options.length;++s){var F=E.elements[i].options[s];if(F.selected){var D=F.value;if(!D){D=F.text}A+="&"+E.elements[i].name+"="+D}}}}}if((E.method)&&(E.method.toLowerCase()=="post")){if(A.length>0){return this.doPost(C,A.substring(1),mycallback)}else{return this.doPost(C,null,mycallback)}}else{if(A.length>0){if(C.indexOf("?")>=0){return this.doGet(C+A,mycallback)}else{return this.doGet(C+"?"+A.substring(1),mycallback)}}else{return this.doGet(C,mycallback)}}}catch(B){return false}}}function CciGetElementById(A){return CciCommon.getElementByIdForParent(document,A)}function getElementById(A){return CciCommon.getElementByIdForParent(document,A)}function getDomain(){return CciCommon.getDomain()}function CciFlyoverObject(){if(!(document.all&&document.getElementById&&!window.opera&&navigator.userAgent.toLowerCase().indexOf("mac")==-1)){this.Apply=function(){};this.Discard=function(){};return }var I=false;var E=false;var C=null;var D=true;var H=this;this.Apply=function(K,L,J){if(D){B()}if(I&&(oIframe=A(K,L,J))){oIframe.style.visibility="visible"}else{if(C!=null){C.style.visibility="hidden"}}};this.Discard=function(J,K){if(I&&(oIframe=A(J,K,false))){oIframe.style.visibility="hidden"}else{if(C!=null){C.style.visibility="visible"}}};function A(K,O,L){var J=G(K);var Q=((oTmp=G(O))?oTmp:document.getElementsByTagName("body")[0]);if(!J||!Q){return }if(J.id==""){J.id="flyid"+(new Date()).getTime()}var N=document.getElementById("flyhider"+J.id);if(!N){var M=(E)?"filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);":"";var P=J.style.zIndex;if(P==""){P=J.currentStyle.zIndex}P=parseInt(P);if(isNaN(P)){return null}if(P<2){return null}P--;var R="flyhider"+J.id;Q.insertAdjacentHTML("afterBegin",'<iframe class="flyiframe" src="javascript:false;" id="'+R+'" scroll="no" frameborder="0" style="position:absolute;visibility:hidden;'+M+"border:0;top:0;left;0;width:0;height:0;background-color:#ccc;z-index:"+P+';"></iframe>');N=document.getElementById(R);F(N,J)}else{if(L){F(N,J)}}return N}function F(K,J){K.style.width=J.offsetWidth+"px";K.style.height=J.offsetHeight+"px";K.style.left=J.offsetLeft+"px";K.style.top=J.offsetTop+"px"}function G(K){var J=null;switch(typeof (K)){case"object":J=K;break;case"string":J=document.getElementById(K);break}return J}function B(){I=(typeof (document.body.contentEditable)!="undefined");E=(typeof (document.compatMode)!="undefined");if(!I){if(document.styleSheets.length==0){document.createStyleSheet()}var J=document.styleSheets[0];J.addRule(".flyhider","visibility:visible");C=J.rules(J.rules.length-1)}D=false}}var CciCommonObject=function(){this.startFlyover=function(){if(document.all&&document.getElementById){var E=this.getElementsByClassNameForParentAndTagName(document,"ul","pf-leftrail-menu");if(!E){return }var A,D,C,G,B,F;for(D=0;D<E.length;D++){A=E[D].getElementsByTagName("li");for(C=0;C<A.length;C++){G=A[C];B=G.getElementsByTagName("ul");if(B&&B.length){G.UL=B[0];F=G.getElementsByTagName("a");if(F&&F.length){G.A=F[0]}G.onmouseenter=function(){this.className+=" flyhover";this.UL.className+=" flyhoverUL";if(this.A){this.A.className+=" flyhoverA"}if(CciFlyover){CciFlyover.Apply(this.UL,this,true)}};G.onmouseleave=function(){this.className=this.className.replace(/flyhover/,"");this.UL.className=this.UL.className.replace(/flyhoverUL/,"");if(this.A){this.A.className=this.A.className.replace(/flyhoverA/,"")}if(CciFlyover){CciFlyover.Discard(this.UL,this)}}}}}}};this.init=function(){try{document.execCommand("BackgroundImageCache",false,false)}catch(C){}var F=new Date();if(CciAjax.supportsAjax()){F.setTime(F.getTime()+2678400000);document.cookie="cox-javascript=ajax; domain="+this.getDomain()+"; path=/; expires="+F.toGMTString()}else{F.setTime(F.getTime()+2678400000);document.cookie="cox-javascript=true; domain="+this.getDomain()+"; path=/; expires="+F.toGMTString()}var E=CciCommon.getElementsByTagName("object");for(o=0;(E)&&(o<E.length);++o){if(!E[o].style.zIndex){E[o].style.zIndex=1}var A=E[o].innerHTML;if((A)&&!(/wmode/i.test(A))){var B=document.createElement("param");B.setAttribute("name","wmode");B.setAttribute("value","transparent");E[o].appendChild(B)}}var D=CciCommon.getElementsByTagName("embed");for(e=0;(D)&&(e<D.length);++e){if(!D[e].style.zIndex){D[e].style.zIndex=1}D[e].setAttribute("wmode","transparent")}};this.focus=function(){if(document.getElementsByTagName){var A=document.getElementsByTagName("input");for(i=0;(A)&&(i<A.length);++i){if((!A[i].disabled)&&((A[i].type=="text")||(A[i].type=="TEXT"))&&(A[i].name=="username")){A[i].focus();return }else{if((!A[i].disabled)&&((A[i].type=="password")||(A[i].type=="PASSWORD"))&&(A[i].name=="password")){A[i].focus();return }}}}};this.getTextFieldById=function(A){if(document.forms){for(x=0;x<document.forms.length;++x){for(y=0;y<document.forms[x].elements.length;++y){if(document.forms[x].elements[y].id==A){return document.forms[x].elements[y]}else{if(document.forms[x].elements[y].name==A){return document.forms[x].elements[y]}}}}}return null};this.setClientCookie=function(B,D,C,A){var E=new Date();E.setTime(E.getTime()+(A*1000));document.cookie=B+"="+D+"; path=/; domain="+C+"; expires="+E.toGMTString()};this.getElementByIdForParent=function(A,C){if(A&&A.getElementById){var B=A.getElementById(C);if(B!=null){return B}}if(document.getElementById){var B=document.getElementById(C);if(B!=null){return B}}if(document.layers){var B=document.layers(C);if(B!=null){return B}}if(document.all){var B=document.all(C);if(B!=null){return B}}return document[C]};this.getElementById=function(A){return this.getElementByIdForParent(document,A)};this.getElementsByTagNameForParent=function(B,A){if(B&&B.getElementsByTagName){return B.getElementsByTagName(A)}else{if(document.getElementsByTagName){return document.getElementsByTagName(A)}else{if(document.all){return document.all.tags(A)}else{return null}}}};this.getElementsByTagName=function(A){return this.getElementsByTagNameForParent(document,A)};this.getElementsByClassNameForParentAndTagName=function(D,B,E){var G=new Array();var C=new RegExp("\\b"+E+"\\b");if(!D){D=document}if(!B){B="*"}var F=this.getElementsByTagNameForParent(D,B);if(F){for(var A=0;A<F.length;++A){if(F[A].className.search(C)!=-1){G[G.length]=F[A]}}}return G};this.getElementsByClassNameForTagName=function(A,B){return this.getElementsByClassNameForParentAndTagName(document,A,B)};this.getElementsByClassName=function(A){return this.getElementsByClassNameForParentAndTagName(document,null,A)};this.sleep=function(B){var C=new Date().getTime();var A=C;while(A-C<B){A=new Date().getTime()}};this.getDomain=function(){var A=location.href;if(A.indexOf("/",9)>0){A=A.substring(0,A.indexOf("/",9))}if(A.indexOf("://")>0){A=A.substring(A.indexOf("://")+3)}if(A.indexOf(":")>0){A=A.substring(0,A.indexOf(":"))}if(A.indexOf(".")>0){return A.substring(A.indexOf("."))}return""};this.setSizeStyle=function(A){var B=["small","medium","large"];var G=["pf-style-font-small","pf-style-font-medium","pf-style-font-large"];var F=["pf-text-size pf-text-small pf-text-active","pf-text-size pf-text-medium pf-text-active","pf-text-size pf-text-large pf-text-active"];var C=["pf-text-size pf-text-small","pf-text-size pf-text-medium","pf-text-size pf-text-large"];var E=["1.0em","1.125em","1.25em"];for(var D=0;D<G.length;D++){if(A==G[D]){this.getElementById(G[D]).setAttribute("class",F[D]);this.getElementById(G[D]).className=F[D];if(this.getElementById("container")){this.getElementById("container").style.fontSize=E[D]}var H=new Date();H.setTime(H.getTime()+2678400000);document.cookie="cox-fontsize="+B[D]+"; domain="+this.getDomain()+"; path=/; expires="+H.toGMTString()}else{this.getElementById(G[D]).setAttribute("class",C[D]);this.getElementById(G[D]).className=C[D]}}}};var CciFlyover=new CciFlyoverObject();function CciAdjustDropDown(D,E){var G=CciCommon.getElementsByTagNameForParent(document.getElementById(D),"table")[0];if(!(G.style.display=="none")&&G.style.marginTop){return false}if(/pf-titlebar-overlay-placer/.test(E.parentNode.className)){E=E.parentNode}if(G.style.display=="none"){CciLocationForm.updateCityList(CciGetElementById("pf-location-zipcode-form"));E.parentNode.className=postfixClasses(E.parentNode.className,"active","add")}else{E.parentNode.className=postfixClasses(E.parentNode.className,"active","remove")}if(G.style.display){G.style.display="";G.style.marginTop=-G.offsetHeight+"px"}var H=parseInt(G.style.marginTop)||0;var A=G.style.marginTop?0:-G.offsetHeight;var C=CciCommon.getElementsByClassNameForParentAndTagName(document.getElementById(D),"*","pf-overlay-inner")[0];var F=new Date();var B=window.setInterval(function(){var I=(new Date()-F)/600;if(I>1){I=1}var J=Math.round(H+(A-H)*I);G.style.marginTop=J?(J+"px"):"";if(!window.XMLHttpRequest){CciFlyover.Apply(D,D,true)}if(I==1){window.clearInterval(B);if(J){G.style.display="none"}}},20);return false}var postfixClasses=function(C,B,D){var A=C.replace(new RegExp(" ?[^ ]*---"+B,"g"),"").replace(/\s*$/,"");if(D=="add"){return A+" "+(A+" ").replace(/ ?[^ ]*---\w+/g,"").replace(/\s+/g,"---"+B+" ")}else{return A}};function CciEffectsObject(A){this.prefix=A;var E=new Array();var C=new Array();var D=new Array();var B=new Array();this._getCoordinates=function(J,G,F){var K=J;var I=0;var H=0;if(G){I=G}if(F){H=F}if(J.offsetParent){I+=J.offsetLeft;H+=J.offsetTop;while(J=J.offsetParent){I+=(J.offsetLeft-J.scrollLeft+J.clientLeft);H+=(J.offsetTop-J.scrollTop+J.clientTop)}}return{left:I,top:H,width:K.offsetWidth,height:K.offsetHeight}};this._calculateLeftPosition=function(F){if(F.offsetParent){var G=0;while(true){G+=F.offsetLeft;if(!F.offsetParent){return G}F=F.offsetParent}}else{if(F.x){return F.x}}return 0};this._calculateTopPosition=function(G){if(G.offsetParent){var F=0;while(true){F+=G.offsetTop;if(!G.offsetParent){return F}G=G.offsetParent}}else{if(G.y){return G.y}}return 0};this._getLoadboxHtml=function(M,G){if(G=="none"){return""}else{if(G&&G!="default"){return G(M)}}var L=150;var J=80;var I=this.prefix+"/img/cci/default/background.gif";var H=Math.floor((M.offsetHeight-J)/2);var Q=Math.floor((M.offsetWidth-L)/2);var R='<div align="center" style="text-align:center;position:absolute;top:'+H+"px;left:"+Q+'px;z-index:9991;margin:0px;padding:0px;display:inline-block;"><img src="'+I+'" width="'+L+'" height="'+J+'" alt="" border="0"/></div>';var K=16;var P=16;var O=this.prefix+"/img/cci/default/color-spinner.gif";var N=Math.floor((M.offsetHeight-P)/2);var S=Math.floor((M.offsetWidth-K)/2);var F='<div align="center" style="text-align:center;position:absolute;top:'+N+"px;left:"+S+'px;z-index:9999;margin:0px;padding:0px;"><img src="'+O+'" width="'+K+'" height="'+P+'" alt="" border="0"/></div>';return R+F};this._decorateZoneForLoading=function(G,L,J,I){if(!G){return }var H=this._getLoadboxHtml(G,L);if((H)&&(H!="")){var K=CciEffects._getCoordinates(G);var F=document.createElement("div");F.id="cci-load-box-"+G.id;F.name="cci-load-box-"+G.id;F.style.zIndex="9990";F.style.width=G.offsetWidth+"px";F.style.height=G.offsetHeight+"px";F.style.textAlign="center";F.style.visibility="visible";F.style.position="absolute";if(G.offsetLeft&&G.offsetLeft>50){if(J){F.style.left=(G.offsetLeft+J)+"px"}else{F.style.left=G.offsetLeft+"px"}if(I){F.style.top=(G.offsetTop+I)+"px"}else{F.style.top=G.offsetTop+"px"}}else{if(J){F.style.left=J+"px"}else{F.style.left="0px"}if(I){F.style.top=I+"px"}else{F.style.top="0px"}}F.innerHTML=H;G.appendChild(F)}};this._engageZoneAfterLoading=function(F){if(F){var G=CciCommon.getElementsByTagNameForParent(F,"div");for(i=0;(G)&&(i<G.length);++i){if(G[i].id&&G[i].id.indexOf("cci-load-box-")==0){if(G[i].parentElement){G[i].parentElement.removeChild(G[i])}else{if(G[i].parentNode){G[i].parentNode.removeChild(G[i])}}}}}};this._adjustSlideObject=function(K,J,G){var F=(new Date()).getTime()-C[K];if(F>600){clearInterval(E[K]);if(J&&(G=="up")){D[K].style.display="none";D[K].style.height=B[K]+"px"}else{if(!J&&(G=="down")){D[K].style.display="none";D[K].style.height=B[K]+"px"}else{D[K].style.height=B[K]+"px";D[K].style.display="block"}}delete (E[K]);delete (C[K]);delete (B[K]);delete (D[K])}else{var I=(F*B[K]);var H=Math.round(I/600);if(J&&(G=="up")){H=B[K]-H}else{if(!J&&(G=="down")){H=B[K]-H}}D[K].style.height=H+"px";D[K].style.display="block"}return };this.toggleInTopDownMotionLikeShade=function(F){if(D[F]){return }D[F]=CciGetElementById(F);B[F]=parseInt(D[F].style.height);C[F]=(new Date()).getTime();if(CciGetElementById(F).style.display=="none"){D[F].style.height="1px";D[F].style.display="block";E[F]=setInterval("CciEffects._adjustSlideObject('"+F+"',true,'down');",5)}else{E[F]=setInterval("CciEffects._adjustSlideObject('"+F+"',true,'up');",5)}};this.toggleInBottomUpMotionLikeShade=function(F){if(D[F]){return }D[F]=CciGetElementById(F);B[F]=parseInt(D[F].style.height);C[F]=(new Date()).getTime();if(CciGetElementById(F).style.display=="none"){D[F].style.height="1px";D[F].style.display="block";E[F]=setInterval("CciEffects._adjustSlideObject('"+F+"',false,'up');",5)}else{E[F]=setInterval("CciEffects._adjustSlideObject('"+F+"',false,'down');",5)}};this.loadContentForForm=function(L,H,F,K,J){var I=CciGetElementById(L);this._decorateZoneForLoading(I,K);var G=function(M){if(M&&M.successful()){I.innerHTML=M.getContentAsString();if(J){J(I,M)}}else{if(M){I.innerHTML='<FONT SIZE=4 COLOR="#AA0000">ERROR ('+M.getStatusCode()+"):"+M.getStatusMessage()+"</FONT><BR><PRE><SMALL>"+M.getHeaders()+"</SMALL></PRE>"+M.getContentAsString()}}this._engageZoneAfterLoading(I)};return CciAjax.getFormDataAndDoPost(H,F,G)};this.loadContentAndCover=function(K,J,H,M,L){var G=CciGetElementById(K);var F=CciGetElementById(J);this._decorateZoneForLoading(G,M);var I=function(N){if(N&&N.successful()){z.innerHTML=N.getContentAsString();if(L){L(z,N)}}else{if(N){z.innerHTML='<FONT SIZE=4 COLOR="#AA0000">ERROR ('+N.getStatusCode()+"):"+N.getStatusMessage()+"</FONT><BR><PRE><SMALL>"+N.getHeaders()+"</SMALL></PRE>"+N.getContentAsString()}}this._engageZoneAfterLoading(G)};return CciAjax.doGet(H,I)};this.loadContent=function(K,F,J,I){var H=CciGetElementById(K);this._decorateZoneForLoading(H,J);var G=function(L){if(L&&L.successful()){H.innerHTML=L.getContentAsString();if(I){I(H,L)}}else{if(L){H.innerHTML='<FONT SIZE=4 COLOR="#AA0000">ERROR ('+L.getStatusCode()+"):"+L.getStatusMessage()+"</FONT><BR><PRE><SMALL>"+L.getHeaders()+"</SMALL></PRE>"+L.getContentAsString()}}this._engageZoneAfterLoading(H)};return CciAjax.doGet(F,G)}}var CciFontObject=function(B,A,C){this.fontFamily=B;this.fontSize=A;this.fontWeight=C;this.getStringWidth=function(G){var F=CciGetElementById("pf-fontwidth-div");if(!F){return -1}try{F.style.fontFamily=this.fontFamily;F.style.fontWeight=this.fontWeight;F.style.fontSize=this.fontSize;F.innerHTML=G;var D=F.offsetWidth;F.innerHTML="";return D}catch(E){return -1}};this.shrink=function(E,D){var G=this.getStringWidth(E);if(G<=D){return E}for(var F=E.length-1;F>=0;--F){var H=E.substring(0,F)+"...";G=this.getStringWidth(H);if((G>0)&&(G<=D)){return H}}return null}};var CciGoogleObject=function(A){this.initial=A;this.validate=function(C){if(C&&C.term){var B=C.term.value;B=B.replace(/^\s*|\s*$/g,"");if(B.length!=0){return(!(B==this.initial))}}return false};this.clear=function(C){if(C&&C.term){var B=C.term.value;B=B.replace(/^\s*|\s*$/g,"");if(B==this.initial){C.term.value=""}}};this.reset=function(C){if(C&&C.term){var B=C.term.value;B=B.replace(/^\s*|\s*$/g,"");if(B.length==0){C.term.value=this.initial}}}};function CciLocationFormObject(A){this._hide=function(B){if(B){B.style.visibility="hidden";B.style.display="none"}};this._show=function(B,C){if(B){B.innerHTML=C;B.style.visibility="visible";B.style.display="block"}};this._validateZipCode=function(E){var D="0123456789";if(E.length!=5){return false}for(var C=0;C<E.length;C++){var B=""+E.charAt(C);if(D.indexOf(B)<0){return false}}return true};this._isVisible=function(B){if(B&&B.style){if(B.style.display&&B.style.display=="none"){return false}else{if(B.style.visibility&&B.style.visibility=="hidden"){return false}}}if(B.tagName!="html"&&B.tagName!="body"){if(B.parentElement){return this._isVisible(B.parentElement)}if(B.parentNode){return this._isVisible(B.parentNode)}}return true};this._getErrorTags=function(B){return CciCommon.getElementsByClassNameForParentAndTagName(B,null,"error")};this._getErrorTag=function(C){var B=this._getErrorTags(C);if(!B||B.length==0){return null}return B[0]};this.validateLocationForm=function(C,F){if(!C){return false}else{var B=this._getErrorTags(C);for(var D=0;B&&D<B.length;++D){this._hide(B[D])}}var E=this._getErrorTag(C);if(C.elements.zipcode.value==""){if((C.elements.state.selectedIndex>0)&&(C.elements.city.selectedIndex>0)){this._hide(E);if(this._isVisible(C)){CciEffects._decorateZoneForLoading(C,null,0,C.offsetTop/2)}return true}this._show(E,"Please enter a zip code");return false}else{if(this._validateZipCode(C.elements.zipcode.value)){this._hide(E);if((C.elements.state.selectedIndex>0)||(C.elements.city.selectedIndex>0)){this.clearZipCode()}if(this._isVisible(C)){CciEffects._decorateZoneForLoading(C,null,0,C.offsetTop/2)}return true}else{if(F){this._show(E,F)}else{this._show(E,"Invalid zip code")}}}return false};this.updateCityList=function(B){if(!B){return false}else{var G=this._getErrorTags(B);for(var J=0;G&&J<G.length;++J){this._hide(G[J])}}this.clearZipCode();var F=this._getErrorTag(B);var K=B.elements.state;var I=B.elements.city;if(I&&K&&K.selectedIndex==0){I.innerHTML="";I.style.display="none";return }else{if(!K){return }}var C=K[K.selectedIndex].value;if(A){var D=A+"/presentation/rest/3.0/locations/cities/"+C}else{var D="/presentation/rest/3.0/locations/cities/"+C}var H=null;if(this._isVisible(B)){H=B}if(H){CciEffects._decorateZoneForLoading(H,null,0,H.offsetTop/2)}var E=function(M){try{if(M&&M.successful()){var N=M.parseJSON();if(N&&N.servicable&&N.servicable.locations){I.innerHTML="";I.options.add(new Option("Choose a City",""));if(N.servicable.locations.length){for(var L=0;L<N.servicable.locations.length;++L){I.options.add(new Option(N.servicable.locations[L].name,N.servicable.locations[L].id))}}else{I.options.add(new Option(N.servicable.locations.name,N.servicable.locations.id))}I.style.display="block"}else{I.style.display="none"}}else{this._show(F,"Could not load cities")}}catch(O){}CciEffects._engageZoneAfterLoading(H)};if(!CciAjax.doGet(D,E)){this._show(F,"Could not load cities");CciEffects._engageZoneAfterLoading(H)}};this.clearZipCode=function(){var C=CciGetElementById("splash-zipcode");var B=CciGetElementById("zipcode");if(C){C.value=""}if(B){B.value=""}}}function CciLoginFormObject(){this._hide=function(B){if(B){B.innerHTML="";B.style.visibility="hidden";B.style.display="none"}};this._show=function(B,C){if(B){B.innerHTML+=C;B.style.visibility="visible";B.style.display="block"}};this._trim=function(B){return B.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g,"")};this.validateLoginForm=function(B){var D=CciGetElementById("pf-login-error");var F=this._trim(B.elements.username.value);var C=this._trim(B.elements.password.value);var E=B.elements.rememberme.checked;if(F==""||C==""){this._hide(D);if(F==""){this._show(D,"<p>Please enter a User ID.</p>")}if(C==""){this._show(D,"<p>Please enter a Password.</p>")}return false}else{this._hide(D);this._validateRememberme(F,E)}};var A={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(D){var B="";var K,I,G,J,H,F,E;var C=0;D=A._utf8_encode(D);while(C<D.length){K=D.charCodeAt(C++);I=D.charCodeAt(C++);G=D.charCodeAt(C++);J=K>>2;H=((K&3)<<4)|(I>>4);F=((I&15)<<2)|(G>>6);E=G&63;if(isNaN(I)){F=E=64}else{if(isNaN(G)){E=64}}B=B+this._keyStr.charAt(J)+this._keyStr.charAt(H)+this._keyStr.charAt(F)+this._keyStr.charAt(E)}return B},decode:function(D){var B="";var K,I,G;var J,H,F,E;var C=0;D=D.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(C<D.length){J=this._keyStr.indexOf(D.charAt(C++));H=this._keyStr.indexOf(D.charAt(C++));F=this._keyStr.indexOf(D.charAt(C++));E=this._keyStr.indexOf(D.charAt(C++));K=(J<<2)|(H>>4);I=((H&15)<<4)|(F>>2);G=((F&3)<<6)|E;B=B+String.fromCharCode(K);if(F!=64){B=B+String.fromCharCode(I)}if(E!=64){B=B+String.fromCharCode(G)}}B=A._utf8_decode(B);return B},_utf8_encode:function(C){C=C.replace(/\r\n/g,"\n");var B="";for(var E=0;E<C.length;E++){var D=C.charCodeAt(E);if(D<128){B+=String.fromCharCode(D)}else{if((D>127)&&(D<2048)){B+=String.fromCharCode((D>>6)|192);B+=String.fromCharCode((D&63)|128)}else{B+=String.fromCharCode((D>>12)|224);B+=String.fromCharCode(((D>>6)&63)|128);B+=String.fromCharCode((D&63)|128)}}}return B},_utf8_decode:function(B){var C="";var D=0;var E=c1=c2=0;while(D<B.length){E=B.charCodeAt(D);if(E<128){C+=String.fromCharCode(E);D++}else{if((E>191)&&(E<224)){c2=B.charCodeAt(D+1);C+=String.fromCharCode(((E&31)<<6)|(c2&63));D+=2}else{c2=B.charCodeAt(D+1);c3=B.charCodeAt(D+2);C+=String.fromCharCode(((E&15)<<12)|((c2&63)<<6)|(c3&63));D+=3}}}return C}};this._validateRememberme=function(F,E){var D=new Date();D.setTime(D.getTime()+(365*24*60*60*1000));var C="; expires="+D.toGMTString();var B="; expires="+new Date(0).toGMTString();if(E==true){if(navigator.cookieEnabled){document.cookie="cox-rememberme-user="+A.encode(F)+C+"; path=/"}}else{document.cookie="cox-rememberme-user="+A.encode(F)+B+"; path=/"}}}var CciPrintObject=function(A,B){this.dialogEleId=A;this.frameEleId=B;this.keypress="";this.print=function(){var C=CciGetElementById(this.frameEleId);if(!C){return true}try{window.frames[this.frameEleId].focus();window.frames[this.frameEleId].print();return false}catch(D){return true}};this.show=function(){this.keypress=document.onkeypress;var D=CciGetElementById(this.dialogEleId);var F=CciGetElementById(this.frameEleId);if(!D||!F||!window.frames||!window.frames.length){return true}var E=document.getElementById("pf-underlayment");if(!E){E=document.createElement("div");E.id="pf-underlayment";E.style.zIndex=9999;E.style.height=document.body.offsetHeight+"px";E.className="no-print";E.innerHTML='<div style="z-index:9999;width:100%;height:'+document.body.offsetHeight+'px" onMouseUp="CciPrint.hide()"></div>';document.body.appendChild(E)}E.style.display="block";var C=parseInt(document.body.offsetWidth);D.style.position="absolute";D.style.top="35px";if(C>850){D.style.left=Math.round((C-850)/2)+"px"}else{D.style.left="0px"}window.scroll(0,0);D.style.zIndex=10000;D.style.display="block";try{var J=window.frames[this.frameEleId].document;var G=CciGetElementById("pf-container").innerHTML;var H=G.replace(/(<css3-container.*?\/css3-container>)/g,"");J.body.innerHTML='<div id="pf-print-container">'+H+"</div>"}catch(I){this.hide();return true}document.onkeypress=CciPrint.checkKeyPress;return false};this.hide=function(){var D=document.getElementById("pf-underlayment");if(D){D.style.display="none"}var C=CciGetElementById(this.dialogEleId);if(C){C.style.display="none"}document.onkeypress=this.keypress;return false};this.checkKeyPress=function(E){var C=null;if(E){C=E.which}else{if(event){C=event.keyCode}}if(C){var D=String.fromCharCode(C).toLowerCase();if(D=="x"){CciPrint.hide()}}}}