
var SCROLL=0,TYPEWRITER=1,STATIC=2;var SCROLLDELAY=20;var CHANGEDELAY=3000;var BLINKDELAY=500;var TYPEDELAY=100;var SEPARATOR="&nbsp;....&nbsp;&nbsp;&nbsp;";function Ticker(tickerId){var tickerId=tickerId;var theTickerDiv=document.getElementById(tickerId);var theHeaderDiv;var theOutroDiv;var theDivs=theTickerDiv.getElementsByTagName("div");for(var d=0;d<theDivs.length;d++){var theDiv=theDiv=theDivs[d];if(theDiv.getAttribute(CLASS)=="title"){theHeaderDiv=theDiv;}else if(theDiv.getAttribute(CLASS)=="outro"){theOutroDiv=theDiv;}}
var theTickerUl=(theTickerDiv)?theTickerDiv.getElementsByTagName("ul")[0]:null;var theTickerListItems=theTickerUl.getElementsByTagName("li");var theAnchors=(theTickerUl)?theTickerUl.getElementsByTagName("a"):null;var theSpans=(theTickerUl)?theTickerUl.getElementsByTagName("span"):null;var timer;var startPos;var tickerLength=0;var theTickerDivWidth;var currItem=0;var typeInt;var typeCount=0;var typeStr="";var typeEl;var mode=TYPEWRITER;if((is.mac&&is.ie5)||(is.opera6)||((is.win98||is.winnt)&&is.ie5&&!is.ie5_5)){mode=SCROLL;}
if(!(is.mac&&is.ie5)){swapClass(theTickerDiv.parentNode.parentNode,/nojs/,"js");}
theTickerDivWidth=theTickerDiv.offsetWidth;theTickerUl.style.width="1000%";if(theHeaderDiv){theTickerUl.style.left=theHeaderDiv.offsetWidth+"px";}
for(var i=0;i<theTickerListItems.length;i++){var theItem=theTickerListItems[i];tickerLength+=theItem.offsetWidth;}
this.scrollTicker=function(){if(document.styleSheets&&document.styleSheets[0].disabled){for(var i=0;i<theTickerListItems.length;i++){pause();theTickerListItems[i].style.display="block";return false;}}
switch(mode){case SCROLL:if(is.mac&&is.ie5){if(document.body.outerHTML.toLowerCase().indexOf("/body")>=0){theTickerUl.style.left=(theTickerUl.offsetLeft-7)+"px";if(theTickerUl.style.left.substring&&theTickerUl.style.left.substring(0,theTickerUl.style.left.length-2)<-tickerLength){theTickerUl.style.left=theTickerDivWidth+"px";}
timer=setTimeout(tickerId+".scrollTicker()",SCROLLDELAY);}else{timer=setTimeout(tickerId+".scrollTicker()",1000);}}else{theTickerUl.style.left=(theTickerUl.offsetLeft-1)+"px";if(theTickerUl.style.left.substring&&theTickerUl.style.left.substring(0,theTickerUl.style.left.length-2)<-tickerLength){theTickerUl.style.left=theTickerDivWidth+"px";}
timer=setTimeout(tickerId+".scrollTicker()",SCROLLDELAY);}
break;case TYPEWRITER:case STATIC:var len=0;for(var i=0;i<theTickerListItems.length;i++){if(i!=currItem){theTickerListItems[i].style.display="none";len+=theTickerListItems[i].offsetWidth;}else{theTickerListItems[currItem].style.left=-len+"px";theTickerListItems[currItem].style.display="block";}}
if(mode==STATIC){timer=setTimeout(tickerId+".scrollTicker()",CHANGEDELAY);}else{typewriter(theTickerListItems[currItem].firstChild.innerHTML,theTickerListItems[currItem].firstChild);}
(currItem<theTickerListItems.length-1)?currItem++:currItem=0;startPos=null;break;}}
function pause(){switch(mode){case SCROLL:case STATIC:clearTimeout(timer);break;case TYPEWRITER:clearInterval(typeInt);clearTimeout(timer);clearInterval(this.dashTimer);clearTimeout(this.dashTimer2);this.dashTimer=null;typewriter(typeStr,typeEl,true);restart();break;}}
function restart(){switch(mode){case SCROLL:eval(tickerId+".scrollTicker()");break;case STATIC:timer=setTimeout(tickerId+".scrollTicker()",CHANGEDELAY);break;case TYPEWRITER:typewriter(typeStr,typeEl,false,true);break;}}
this.dashTimer=null;this.dashTimer2=null;function typewriter(str,el,showAll,dontScroll){str=str.replace(/_$/g,"");typeStr=str;typeEl=el;if(!startPos){startPos=el.style.left;}
if(showAll&&el){el.innerHTML=str;typeCount=str.length;}else{if(!showAll&&!dontScroll){el.innerHTML="";}
typeInt=setInterval(function(){var newStr=str.substring(0,typeCount);var endTypeCount=typeCount+1;if(str.charAt(typeCount)=="<"){endTypeCount=str.substring(typeCount,str.length).indexOf(">")+typeCount+1;newStr+=str.substring(typeCount,endTypeCount);}else if(str.charAt(typeCount)=="&"){endTypeCount=str.substring(typeCount,str.length).indexOf(";")+typeCount+1;newStr+=str.substring(typeCount,endTypeCount);}
el.innerHTML=newStr+"_";typeCount=endTypeCount;var calculatedWidth=theTickerDivWidth;if(theHeaderDiv){calculatedWidth-=theHeaderDiv.offsetWidth;}
if(theOutroDiv){calculatedWidth-=theOutroDiv.offsetWidth;}
if(!showAll&&!dontScroll&&el.offsetWidth>calculatedWidth){el.style.left=(el.style.left.substring(el.style.left,(el.style.left).indexOf("px"))-6)+"px"}
if(typeCount>str.length){clearInterval(typeInt);typeCount=0;if(!this.dashTimer){this.dashTimer=setInterval(function(){if(el.innerHTML.length>str.length){el.innerHTML=str;}else{el.innerHTML=str+"_";}},BLINKDELAY)}
timer=setTimeout(function(){clearInterval(this.dashTimer);this.dashTimer=null;this.dashTimer2=setTimeout(function(){el.innerHTML=str},1);el.style.left=startPos;eval(tickerId+".scrollTicker()");},CHANGEDELAY);}},TYPEDELAY);}}
this.init=function(){if(mode==TYPEWRITER){for(var i=0;i<theTickerListItems.length;i++){theTickerListItems[i].style.display="block";}}else if(mode==SCROLL){for(var i=0;i<theTickerListItems.length-1;i++){theTickerListItems[i].innerHTML+=SEPARATOR;}}
for(var l=0;l<theTickerListItems.length;l++){var el=theTickerListItems[l];el.innerHTML=el.innerHTML.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"");elListener(el,"mouseover",pause);}
this.scrollTicker();}
this.setMode=function(m){mode=m;}}