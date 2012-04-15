var domUtils={getViewportWidth:function(){if(window.YAHOO){return YAHOO.util.Dom.getViewportWidth()}else{if(window.jQuery){return $(window).width()}else{throw"YAHOO and jQuery not available"}}},getViewportHeight:function(){if(window.YAHOO){return YAHOO.util.Dom.getViewportHeight()}else{if(window.jQuery){return $(window).height()}else{throw"YAHOO and jQuery not available"}}},getDocumentScrollTop:function(){if(window.YAHOO){return YAHOO.util.Dom.getDocumentScrollTop()}else{if(window.jQuery){return $(document).scrollTop()
}else{throw"YAHOO and jQuery not available"}}},setStyle:function(c,a,b){if(window.YAHOO){return YAHOO.util.Dom.setStyle(c,a,b)}else{if(window.jQuery){return $(c).css(a,b)}else{throw"YAHOO and jQuery not available"}}},getByClass:function(h,f,a){var e=new Array();if(f==null){f=document}if(a==null){a="*"}var d=f.getElementsByTagName(a);var b=d.length;var g=new RegExp("(^|\\s)"+h+"(\\s|$)");for(var c=0;c<b;c++){if(g.test(d[c].className)){e.push(d[c])}}return e},centerDiv:function(g,f,b){var e=[];if(!c){var c=document.getElementById(g)
}if(c.offsetHeight>0&&b<1){f=c.offsetHeight}if(c.offsetWidth>0&&f<1){f=c.offsetWidth}if(f<domUtils.getViewportWidth()){c.style.left=(domUtils.getViewportWidth()-f)/2+"px"}else{c.style.left="0px"}if(b<domUtils.getViewportHeight()){c.style.top=((domUtils.getViewportHeight()-b)/2+domUtils.getDocumentScrollTop())+"px"}else{var d=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;var a=(document.all)?d.scrollTop:window.scrollY;c.style.top=a+"px"}e.push(parseInt(c.style.left));
e.push(parseInt(c.style.top));return e},trackActivity:function(c){var b=new Date().getTime();c=c.indexOf("?")>-1?c+"&hlUnique="+b:c+"?hlUnique="+b;var a=null;if(document.getElementById("trackingFrame"+b)){document.body.removeChild(document.getElementById("trackingFrame"+b))}a=document.createElement("IMG");a.id="trackingFrame"+b;a.style.display="none";a.style.height="1px";a.src=c;a.onload=function(){document.body.removeChild(document.getElementById("trackingFrame"+b))};document.body.appendChild(a)},toggleAllTogether:function(c,b,e){var a=domUtils.getByClass(b),d=null;
if(!a||a.length==0){a=document.getElementById(b)}if(!a){return false}if(c.innerHTML.toLowerCase()=="show all"){for(d in a){if(a[d].className.indexOf(e)>-1){a[d].className=a[d].className.replace(e,"")}}c.innerHTML="Collapse All"}else{for(d in a){a[d].className=a[d].className+" "+e}c.innerHTML="Show All"}},toggleAllIndividually:function(b,d){var a=domUtils.getByClass(b),c=null;if(!a||a.length==0){a=document.getElementById(b)}if(!a){return false}for(c in a){if(a[c].className.indexOf(d)>-1){a[c].className=a[c].className.replace(d,"")
}else{a[c].className=a[c].className+" "+d}}},popUp:function(e,d,c,a){var b="";if(d=="news"){b="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+a+",width="+c+",top=100,left=100"}else{if(d=="symptomsearchresult"){b="toolbar,menubar,scrollbars,resizable,location,status,titlebar,height="+a+",width="+c+",top=100,left=100"}}window.open(e,"newWin",b)},createTransport:function(){if(typeof XMLHttpRequest!="undefined"){var d=new XMLHttpRequest();if(d.overrideMimeType){d.overrideMimeType("text/xml")
}return d}else{if(typeof ActiveXObject!="undefined"){var a=null;try{a=new ActiveXObject("MSXML2.XmlHttp.6.0");return a}catch(b){try{a=new ActiveXObjct("MSXML2.XmlHttp.3.0");return a}catch(c){try{a=new ActiveXObject("Msxml2.XMLHTTP");return a}catch(f){try{a=new ActiveXObject("Microsoft.XMLHTTP");return a}catch(f){}}throw Error("Cannot create XMLHttp object.")}}}}},makeParamStr:function(c){var e=this.buildFieldList(c,["input","textarea","select"]);var a="";for(var b=0;b<e.length;b++){switch(e[b].tagName.toUpperCase()){case"INPUT":switch(e[b].type.toUpperCase()){case"HIDDEN":a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&";
break;case"TEXT":a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&";break;case ("CHECKBOX"||"RADIO"):a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&";break;default:a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&"}break;case"TEXTAREA":a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&";break;case"SELECT":var d=e[b];a+=d.name+"="+encodeURIComponent(d.options[d.selectedIndex].value)+"&";break;default:a+=e[b].name+"="+encodeURIComponent(e[b].value)+"&"}}a=a.substr(0,a.length-1);return a},buildFieldList:function(f,c){var g=new Array();
var b=(document.getElementById(f))?document.getElementById(f):f;if(b.hasChildNodes()){for(var d=0;d<c.length;d++){var a=b.getElementsByTagName(c[d]);for(var e=0;e<a.length;e++){g.push(a[e])}}}else{g.push(b)}return g},get_nextsibling:function(a){x=a.nextSibling;while(x.nodeType!=1){x=x.nextSibling}return x}};var buildOverlayPop={init:function(a,b,g,h){var i=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;var d=(document.all)?i.scrollTop:window.scrollY;if(document.getElementById("frameOverlayBg")){var f=document.getElementById("frameOverlayBg")
}else{var f=document.createElement("DIV");f.id="frameOverlayBg"}f.style.position="fixed";f.style.top="0px";f.style.left="0px";f.style.height="100%";f.style.width="100%";f.style.background="#000";f.style.zIndex="2147483640";domUtils.setStyle(f,"opacity",".7");document.body.appendChild(f);if(h){if(document.getElementById("overlayCloseBtn")){var e=document.getElementById("overlayCloseBtn")}else{var e=document.createElement("SPAN");e.id="overlayCloseBtn"}e.style.position="absolute";if(navigator.userAgent.toString().toLowerCase().indexOf("msie 6")>-1){e.style.background="transparent url(/images/hl_close.gif) no-repeat scroll 0 0"
}else{e.style.background="transparent url(/images/hl_close.png) no-repeat scroll 0 0"}e.style.height="25px";e.style.outline="0";e.style.border="0 none";e.style.cursor="pointer";e.style.width="25px";e.style.zIndex="2147483642";e.style.display="none";document.body.appendChild(e);e.onmouseover=function(){this.style.backgroundPosition="0 -29px"};e.onmouseout=function(){this.style.backgroundPosition="0 0"};e.onclick=function(){document.body.removeChild(f);document.body.removeChild(c);document.body.removeChild(e)}
}if(typeof(a)=="string"){if(document.getElementById("fullAdFrame")){var c=document.getElementById("fullAdFrame")}else{var c=document.createElement("IFRAME");c.id="fullAdFrame"}c.style.display="none";c.style.padding="0";document.body.appendChild(c);c.frameBorder="no";c.scrolling="no";c.setAttribute("name","iFrameOverlay");c.src=a}else{if(document.getElementById("fullAdFrame")){var c=document.getElementById("fullAdFrame")}else{var c=document.createElement("DIV");c.id="fullAdFrame"}c.style.display="none";c.style.padding=10+"px";
document.body.appendChild(c);c.innerHTML+=a.innerHTML}c.setAttribute("style","margin:0; -moz-box-shadow: 3px 3px 4px #000; -webkit-box-shadow: 3px 3px 4px #000; box-shadow: 3px 3px 4px #000; -ms-filter: \"progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')\"; filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');");c.style.position="absolute";c.style.background="#fff";if(c.style.MozBorderRadius!==undefined){c.style.MozBorderRadius=15+"px"
}else{if(c.style.webkitBorderRadius!==undefined){c.style.webkitBorderRadius=15+"px"}}c.style.zIndex="2147483641";c.style.margin=0;c.style.width=b+"px";c.style.height=g+"px";var j=domUtils.centerDiv("fullAdFrame",b,g);c.style.top=j[1]+"px";c.style.left=j[0]+"px";if(h){e.style.top=(j[1]-11)+"px";e.style.left=(j[0]+b-13)+"px";e.style.display=""}c.style.display=""},close:function(){document.body.removeChild(document.getElementById("frameOverlayBg"));document.body.removeChild(document.getElementById("fullAdFrame"));
if(document.getElementById("overlayCloseBtn")){document.body.removeChild(document.getElementById("overlayCloseBtn"))}}};printWin=null;var hlPrinter={pickPrintType:function(a){var b=location.pathname;if(!a){a="hl"}if(b.indexOf("/galecontent")>-1||b.indexOf("/adamcontent")>-1||b.indexOf("/hlc")>-1||b.indexOf("/sw/")>-1||b.indexOf("/elseviercontent")>-1){hlPrinter.PrintArticle()}else{try{window.print()}catch(c){hlPrinter.PopForPrint(null)}return false}},PrintArticle:function(){if(printWin!=null){printWin.close();
printWin=null}var a=location.protocol+"//"+location.host+location.pathname;if(location.search){a+=location.search+"&print=true"}else{a+="?print=true"}printWin=window.open(a,"_blank","location=0,resizable=1,status=0,scrollbars=1,menubar=0,titlebar=0,width=400,height=600");printWin.focus()},PopForPrint:function(b){if(printWin!=null){printWin.close();printWin=null}var a=location.href;if(a.indexOf(b)==-1){if(location.search){a+="&"+b}else{a+="?"+b}}printWin=window.open(a,"_blank","location=0,resizable=1,status=0,scrollbars=1,menubar=0,titlebar=0,width=1000,height=600");
printWin.focus()}};var hlFormValidator={checklength:function(d,a,c){if(d.value.length>=a){d.value=d.value.substring(0,a)}var b=(document.getElementById(c))?document.getElementById(c):c;b.innerHTML=a-d.value.length},validemail:function(b){var a=new RegExp("^[a-z0-9][a-z0-9_.-]*[a-z0-9_]@[a-z0-9][a-z0-9-]*[a-z0-9](\\.[a-z0-9][a-z0-9-]*[a-z0-9])+\\.?$","i");return a.test(b)},validscreenname:function(b){if(b.length<3){return false}var a=new RegExp("[<>&\\\\]","i");return !a.test(b)},validzip:function(b){var a=new RegExp("^[0-9]{5}$","i");
return a.test(b)},validfield:function(b){var a=new RegExp("[^ \t\n]");return a.test(b)},validname:function(b){var a=new RegExp("[<>&\\\\]","i");return !a.test(b)},validphone:function(a){return(/\([0-9]{3}\)\s?[0-9]{3}\-[0-9]{4}/.test(a))},validdate:function(c){var b=c.split("-");if((b.length<1)||(b.length>3)){return false}for(var a=0;a<b.length;a++){if(isNaN(b[a])){return false}}return true},is_all_ws:function(a){return !(/[^\t\n\r ]/.test(a.data))},is_ignorable:function(a){return(a.nodeType==8)||((a.nodeType==3)&&this.is_all_ws(a))
},node_parent:function(a){return(a.parentElement!=undefined)?a.parentElement:a.parentNode},node_before:function(a){while((a=a.previousSibling)){if(!this.is_ignorable(a)){return a}}return null},node_after:function(a){while((a=a.nextSibling)){if(!this.is_ignorable(a)){return a}}return null},last_child:function(b){var a=b.lastChild;while(a){if(!this.is_ignorable(a)){return a}a=a.previousSibling}return null},first_child:function(b){var a=b.firstChild;while(a){if(!this.is_ignorable(a)){return a}a=a.nextSibling}return null
},data_of:function(a){var b=a.data;b=b.replace(/[\t\n\r ]+/g," ");if(b.charAt(0)==" "){b=b.substring(1,b.length)}if(b.charAt(b.length-1)==" "){b=b.substring(0,b.length-1)}return b},are_valid:function(a){var g=(document.getElementById(a))?document.getElementById(a):a;var d=domUtils.buildFieldList(g,["input","textarea","select"]);var i=[];for(var c=0;c<d.length;c++){var h=hlFormValidator.validateField(d[c]);if(h!=""){var b="unknown";try{b=(d[c].id)?d[c].id:d[c].name}catch(f){}i.push({field:b,msg:h})}}if(i.length>0){return i
}else{return""}},is_valid:function(a){var d=(document.getElementById(a))?document.getElementById(a):a;var c=domUtils.buildFieldList(d,["input","textarea","select"]);for(var b=0;b<c.length;b++){var e=hlFormValidator.validateField(c[b]);if(e!=""){return e}}return""},validateField:function(j){var b=j.className;if(b){b.toLowerCase();var c="";switch(j.tagName.toUpperCase()){case"INPUT":switch(j.type.toUpperCase()){case"HIDDEN":c=j.value;break;case"TEXT":c=j.value;break;case ("CHECKBOX"||"RADIO"):c=j.checked;break;
default:c=j.value}break;case"TEXTAREA":c=j.value;break;case"SELECT":c=j.options[j.selectedIndex].value;break}var h=c.replace(/(^\s+)|(\s+$)/g,"");if(b.indexOf("required")>-1){if(h.length==0||h.length==undefined||!h.length||h.length==null){return"Field Cannot Be Empty"}}if(b.indexOf("phone")>-1){if(!this.validphone(h)){return'"'+h+'" is not a phone number'}}if(b.indexOf("name")>-1){if(!this.validname(h)){return'"'+h+'" is not a name'}}if(b.indexOf("zip")>-1){if(!this.validzip(h)){return'"'+h+'" is not a zipcode'
}}if(b.indexOf("date")>-1){if(!this.validdate(h)){return'"'+h+'" is not a date'}}if(b.indexOf("email")>-1){if(!this.validemail(h)){return'"'+h+'" is not a valid email address'}}if(b.indexOf("is_numeric")>-1){if(!parseInt(h)&&parseInt(h)!==0){return'"'+h+'" is not an integer'}}if(b.indexOf("AnyIsChecked")>-1){var l=j.form;var d=l[j.name];var k=false;for(var f=0;f<d.length;f++){if(d[f].checked){k=true}}if(!k){return'One of the "'+j.name+'" radio buttons must be checked'}}if(b.indexOf("lt#")>-1){var g=b.split("lt#");
var e=(g[1].indexOf(" "))?g[1].substring(0,g[1].indexOf(" ")):g[1].substring(0,g[1].length);if(parseInt(h)>parseInt(e)){return'"'+h+'" must be less than '+e}}if(b.indexOf("gt#")>-1){var g=b.split("gt#");var a=(g[1].indexOf(" "))?g[1].substring(0,g[1].indexOf(" ")):g[1].substring(0,g[1].length);if(parseInt(h)<parseInt(a)){return'"'+h+'" must be greater than '+a}}}return""}};