function changeHeightFireFox(){var a;for(a=0;a<(document.getElementById("tblRight").childNodes[1].rows.length-8);a++){if((a>1&&a<13)&&a%2==0){document.getElementById("tblRight").childNodes[1].rows[a].setAttribute("class","alternate")}document.getElementById("tblRight").childNodes[1].rows[a].setAttribute("style","height:"+document.getElementById("tblMain").childNodes[1].rows[a].clientHeight+"px")}for(a=0;a<(document.getElementById("tblRight").childNodes[1].rows.length);a++){if(document.getElementById("tblMain").childNodes[1].rows[a].clientHeight<document.getElementById("tblRight").childNodes[1].rows[a].clientHeight){document.getElementById("tblMain").childNodes[1].rows[a].setAttribute("style","height:"+document.getElementById("tblRight").childNodes[1].rows[a].clientHeight+"px")}else{document.getElementById("tblRight").childNodes[1].rows[a].setAttribute("style","height:"+document.getElementById("tblMain").childNodes[1].rows[a].clientHeight+"px")}}}function changeHeightIE(){var a;for(a=0;a<(document.all("tblRight").rows.length-8);a++){if((a>1&&a<13)&&a%2==0){document.all("tblRight").rows[a].className="alternate"}}for(a=0;a<(document.all("tblRight").rows.length);a++){if(document.all("tblMain").rows[a].clientHeight!=document.all("tblRight").rows[a].clientHeight){if(document.all("tblMain").rows[a].clientHeight<document.all("tblRight").rows[a].clientHeight){document.all("tblMain").rows[a].cells[0].style.height=(document.all("tblRight").rows[a].cells[0].clientHeight-10)+"px"}else{document.all("tblRight").rows[a].cells[0].style.height=(document.all("tblMain").rows[a].cells[0].clientHeight-10)+"px"}}}}function changeHeight(){if(navigator.appName=="Netscape"){changeHeightFireFox()}if(navigator.appName=="Microsoft Internet Explorer"){changeHeightIE()}}function ProgressBarControl(b){var g=0;var e=(screen.height/2)-84;var i=(screen.width/2)-170;var j=document.body.id;var h=(navigator.appName.indexOf("Netscape")!=-1);var f=document;var k=document.layers?"":"px";var c=f.getElementById?f.getElementById(b):f.all?f.all[b]:f.layers[b];window[b+"_obj"]=c;if(f.layers){c.style=c}c.cx=c.sx=i;c.cy=c.sy=g+e;c.sP=function(a,d){this.style.left=a+k;this.style.top=d+k};c.flt=function(){var d,a;d=(this.sx>=0)?0:h?innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;a=h?pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;if(this.sy<0){a+=h?innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight}this.cy+=(a+this.sy-this.cy)/8;this.sP(this.cx,this.cy);setTimeout(this.id+"_obj.flt()",40)};return c}function FullImageDisplay(a,b){document.getElementById("imgGeneral").src=a;for(var c=1;c<=4;c++){if(b.id==("imgThumb"+c)){b.className="imgGalleryOver"}else{if(document.getElementById("imgThumb"+c)!=null){document.getElementById("imgThumb"+c).className="imgGalleryOut"}}}}function TransferNumber(){var a;a=window.location.pathname+window.location.search;if(a.toLowerCase()=="/shop/phones/"){this.window.location="/switch/default.aspx?referrer="+a}else{if(a.toLowerCase()=="/shop/plans/"){this.window.location="/switch/default.aspx?referrer="+a}else{this.window.location="/switch/default.aspx?referrer="+a}}a=null}function PortingNumber(){var a;a=window.location.pathname;if(a.toLowerCase()=="/shop/phones/"||a.toLowerCase()=="/shop/phones/default.aspx"){window.open("/switch/default.aspx?referrer=/shop/phones/","_blank","width=850,height=660,screenX=568,screenY=400,left=50,top=50,toolbar=no,location=no,menubar=no,status=no,resizable,scrollbars")}else{if(a.toLowerCase()=="/shop/phones/cell-phone-detail.aspx"){window.open("/switch/default.aspx?referrer=/shop/phones/","_blank","width=850,height=660,screenX=568,screenY=400,left=50,top=50,toolbar=no,location=no,menubar=no,status=no,resizable,scrollbars")}else{if(a.toLowerCase()=="/shop/plans/cell-phone-plans.aspx"){window.open("/switch/default.aspx?referrer=/shop/phones/","_blank","width=850,height=660,screenX=568,screenY=400,left=50,top=50,toolbar=no,location=no,menubar=no,status=no,resizable,scrollbars")}else{if(a.toLowerCase()=="/shop/plans/cell-phone-plans-detail.aspx"){window.open("/switch/default.aspx?referrer=/shop/phones/","_blank","width=850,height=660,screenX=568,screenY=400,left=50,top=50,toolbar=no,location=no,menubar=no,status=no,resizable,scrollbars")}else{a=a+window.location.search;window.open("/switch/default.aspx?referrer="+a+"","_blank","width=850,height=660,screenX=568,screenY=400,left=50,top=50,toolbar=no,location=no,menubar=no,status=no,resizable,scrollbars")}}}}a=null}function isIe5(){if((navigator.userAgent.indexOf("IE")>=0)&&(navigator.appVersion.indexOf("MSIE 5")>=0)){return true}else{return false}}var footerSet=false;function setFooter(f,i){if(!isIe5()||!footerSet){var a=getWindowHeight();var b=document.getElementById("footer");var g=document.getElementById("masthead");var d=document.getElementById("body");var e=document.getElementById("bodyfiller");if(a-(f+i)>=0&&(b!=null&&e!=null)){var c=e.offsetTop;var h=a-c-i;e.style.display="none";if(h>=0){e.style.display="block";e.style.height=h+"px";if(navigator.userAgent.indexOf("Firefox")!=-1){b.style.top=document.documentElement.offsetHeight-i+"px"}else{b.style.top=(a-i)+"px"}}}footerSet=true}}function getWindowHeight(){var a=0;if(typeof(window.innerHeight)=="number"){a=window.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){a=document.documentElement.clientHeight}else{if(document.body&&document.body.clientHeight){a=document.body.clientHeight}}}return a}function createAsyncMbox(b,a){mboxDefine(b,a);mboxUpdate(a)}function makeMBoxVisibleForAJAX(){var b=document.getElementsByTagName("div");for(var a=0;a<b.length;a++){if(b[a].className=="mboxDefault"){b[a].style.display="block";b[a].style.visibility="visible"}}}function loadJSInclude(b,d){var a=document.createElement("SCRIPT");a.type="text/javascript";a.src=b;var c=document.getElementsByTagName("HEAD");if(c[0]!=null){c[0].appendChild(a)}if(d!=null){a.onreadystatechange=function(){if(a.readyState=="loaded"){d()}};a.onload=d}}function createCountdown(b,c,a,d,f){var g=function(){if(document.getElementById(d)){if(f.indexOf("startDate")==-1){f+="&startDate="+serverDate}if(f.indexOf("startTime")==-1){f+="&startTime="+serverTime}var h=new SWFObject(b,"flashcounter",c,a,9,"#FFF");h.addParam("id","counter");h.addParam("allowScriptAccess","Always");h.addParam("loop","false");h.addParam("FlashVars",f);h.write(d);document.getElementById(d).style.display="block"}};var e=function(){if(typeof(Sys)!="undefined"){Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(g)}else{g()}};if(typeof(SWFObject)=="undefined"){loadJSInclude("/js/swfObject.js",e)}else{e()}}function spotlighttag(){var c=Math.random()+"";var b=c*10000000000000;document.write("<iframe src='http://fls.doubleclick.net/activityi;src=998766;type=windo262;cat=mobil665;ord="+b+"?' width='1' height='1' frameborder='0'></iframe>")}function closepopup(){$("#UpgradeMainDiv").hide()}function readCookie(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}var maxDemoWindowSize="resizable=1,scrollbars=1,status=1,toolbar=1,menubar=1,location=1,screenX=1,screenY=1,left=1,top=1,width="+screen.availWidth+",height="+screen.availHeight;function wishlist(){$(document).ready(function(){$("#body").pngFix();$("div.colorChangeButton > div > img").click(function(){var b=$(this).parent().parent().find("div").not(".secondary");$(this).parent().parent().find("div").addClass("secondary");$(this).parent().removeClass("secondary");var a=$(this).parent().parent().find("div").not(".secondary");if(b[0]!==a[0]){$(this).parent().parent().parent().find("div:first").find("img").toggleClass("togglePhone")}$(this).parent().parent().parent().find("div.details").find("a.buynow")[0].href="/shop/phones/Cell-Phone-Detail.aspx?cell-phone="+$(this).parent().attr("id")})})}function unescapeHTML(a){return a.replace(/&amp;/g,"&").replace(/&amp;/g,"&")}function SentioFloodlighttag(){var d=new String(window.parent.document.location);if(d.indexOf("https://")!=-1){var c=Math.random()+"";var b=c*10000000000000;document.write("<iframe src='https://fls.doubleclick.net/activityi;ssrc=998766;type=109pb363;cat=dr_lg224;ord="+b+"?' width='1' height='1' frameborder='0'></iframe>")}else{var c=Math.random()+"";var b=c*10000000000000;document.write("<iframe src='http://fls.doubleclick.net/activityi;src=998766;type=109pb363;cat=dr_lg616;ord="+b+"?' width='1' height='1' frameborder='0'></iframe>")}}function createCookie(c,d,e){var a;if(e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));a="; expires="+b.toGMTString()}else{a=""}document.cookie=c+"="+d+a+"; path=/"}function eraseCookie(a){createCookie(a,"",-1)}var hashes=window.location.href;var FromPhone="0";var url=hashes.toLowerCase();if(url.indexOf("/shop/Phones/cell-phone-detail.aspx")>-1){FromPhone="1"}if(FromPhone=="0"){eraseCookie("TMobileShopDetail")}if(readCookie("SpecialPromoTracking")!=null){SetSpecialPromoFloodLightTag();eraseCookie("SpecialPromoTracking")}function SetSpecialPromoFloodLightTag(){var e=new String(window.parent.document.location);var d=Math.random()+"";var b=d*10000000000000;var c=unescape(readCookie("SpecialPromoTracking"));if(e.indexOf("https://")!=-1){if(c.indexOf("https://")==-1){c=c.replace("http://","https://")}}else{if(c.indexOf("http://")==-1){c=c.replace("https://","http://")}}document.write('<iframe src="'+c+b+'?" width="1" height="1" frameborder="0" style="display:none"></iframe>')}var checkCookie=null;function ShowDowntimeMessage(){var b=false;if(checkCookie==null){var a=readCookie("TMobileCommon");if(a!=null){if(a.indexOf("&SplashMessageDisplayed=true")==-1){a=a+"&SplashMessageDisplayed=true";document.cookie="TMobileCommon="+a+";path=/;domain=.t-mobile.com;"}else{b=true}}}if(!b){if(typeof jQuery.blockUI=="undefined"){$.getScript("http://www.t-mobile.com/assets/scripts/jquery.blockUI.js",function(){CallDowntimeMessage()})}else{CallDowntimeMessage()}}}function CallDowntimeMessage(){CoreMetrics.AddPageViewTag("WWW:ERROR:ONLINE SHOPPING:TMO","WWW:ERROR","","",null);var a=(window.screen.width-602)/2;showPackagesCss={padding:0,margin:0,top:"25%",left:a,textAlign:"left",position:"fixed",color:"#000",border:"0px solid #aaa",backgroundColor:"#fff",cursor:"auto",overflow:"hidden",width:"600px"};showPackagesoverlayCSS={backgroundColor:"#000",opacity:"0.3",cursor:"default"};$.blockUI({message:$("#dvDowntimeSplashMsg").html(),css:showPackagesCss,overlayCSS:showPackagesoverlayCSS});$(".blockOverlay").click(function(){$.unblockUI()})}function CheckShowDowntimeMsg(){$.unblockUI();if($("#dvDowntimeSplashMsg")!=null&&$("#dvDowntimeSplashMsg").length>0){checkCookie=true;ShowDowntimeMessage(true)}};