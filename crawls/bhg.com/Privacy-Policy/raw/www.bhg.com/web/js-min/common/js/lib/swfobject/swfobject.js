if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(f,d,m,g,j,l,n,i,a,e){if(!document.getElementById){return;
}this.DETECT_KEY=e?e:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(f){this.setAttribute("swf",f);}if(d){this.setAttribute("id",d);}if(m){this.setAttribute("width",m);}if(g){this.setAttribute("height",g);
}if(j){this.setAttribute("version",new deconcept.PlayerVersion(j.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(l){this.addParam("bgcolor",l);}var b=n?n:"high";this.addParam("quality",b);
this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var k=(i)?i:window.location;this.setAttribute("xiRedirectUrl",k);this.setAttribute("redirectUrl","");if(a){this.setAttribute("redirectUrl",a);}};deconcept.SWFObject.prototype={useExpressInstall:function(a){this.xiSWFPath=!a?"expressinstall.swf":a;
this.setAttribute("useExpressInstall",true);},setAttribute:function(a,b){this.attributes[a]=b;},getAttribute:function(a){return this.attributes[a];},addParam:function(a,b){this.params[a]=b;},getParams:function(){return this.params;},addVariable:function(a,b){this.variables[a]=b;},getVariable:function(a){return this.variables[a];
},getVariables:function(){return this.variables;},getVariablePairs:function(){var a=new Array();var b;var c=this.getVariables();for(b in c){a[a.length]=b+"="+c[b];}return a;},getSWFHTML:function(){var d="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");
this.setAttribute("swf",this.xiSWFPath);}d='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';d+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';
var c=this.getParams();for(var a in c){d+=[a]+'="'+c[a]+'" ';}var b=this.getVariablePairs().join("&");if(b.length>0){d+='flashvars="'+b+'"';}d+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}d='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';
d+='<param name="movie" value="'+this.getAttribute("swf")+'" />';var c=this.getParams();for(var a in c){d+='<param name="'+a+'" value="'+c[a]+'" />';}var b=this.getVariablePairs().join("&");if(b.length>0){d+='<param name="flashvars" value="'+b+'" />';}d+="</object>";}return d;},write:function(a){if(this.getAttribute("useExpressInstall")){var b=new deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(b)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);
}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var c=(typeof a=="string")?document.getElementById(a):a;c.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));
}}return false;},instantWrite:function(){if(this.getAttribute("useExpressInstall")){var a=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(a)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){document.write(this.getSWFHTML());return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));
}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var c=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var a=navigator.plugins["Shockwave Flash"];if(a&&a.description){c=new deconcept.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var d=1;var b=3;while(d){try{b++;d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+b);c=new deconcept.PlayerVersion([b,0,0]);}catch(f){d=null;}}}else{try{var d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(f){try{var d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
c=new deconcept.PlayerVersion([6,0,21]);d.AllowScriptAccess="always";}catch(f){if(c.major==6){return c;}}try{d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(f){}}if(d!=null){c=new deconcept.PlayerVersion(d.GetVariable("$version").split(" ")[1].split(","));}}}return c;};deconcept.PlayerVersion=function(a){this.major=a[0]!=null?parseInt(a[0]):0;
this.minor=a[1]!=null?parseInt(a[1]):0;this.rev=a[2]!=null?parseInt(a[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(a){if(this.major<a.major){return false;}if(this.major>a.major){return true;}if(this.minor<a.minor){return false;}if(this.minor>a.minor){return true;}if(this.rev<a.rev){return false;
}return true;};deconcept.util={getRequestParameter:function(d){var c=document.location.search||document.location.hash;if(d==null){return c;}if(c){var b=c.substring(1).split("&");for(var a=0;a<b.length;a++){if(b[a].substring(0,b[a].indexOf("="))==d){return b[a].substring((b[a].indexOf("=")+1));}}}return"";
}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var c=document.getElementsByTagName("OBJECT");for(var b=c.length-1;b>=0;b--){c[b].style.display="none";for(var a in c[b]){if(typeof c[b][a]=="function"){c[b][a]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};
__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(a){return document.all[a];
};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;