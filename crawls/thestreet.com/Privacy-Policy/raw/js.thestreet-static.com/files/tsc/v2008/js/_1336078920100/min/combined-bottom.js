var expandableDiv={init:function(){var c={success:this.drawDirectory,failure:this.handleDirectoryFailure,scope:this,argument:null};var b=new String(window.location);if(b.indexOf("secure")===-1){var a=YAHOO.util.Connect.asyncRequest("GET",TSCM.cfg.contextRoot+"/jsp/fragments/proxy.jsp?filename=directory.xml",c,null)}else{var a=YAHOO.util.Connect.asyncRequest("GET",TSCM.cfg.commerceBaseUrl+"/tsc/commerce/js/proxy/directory.xml",c,null)}},drawDirectory:function(c){var a=YAHOO.util.Dom.get("directory");try{a.innerHTML=c.responseText}catch(b){throw"oh noes!"}if(TSCM.postitionFooterLinks){TSCM.postitionFooterLinks()}},handleDirectoryFailure:function(){}};function setPucCookie(){try{var b=this.className;var h=/pucedLink pucValue-([\w]+)/i;var g=h.exec(b);var f=g[1];var a=new Date();a.setSeconds(a.getSeconds()+10);var c=a+"--"+f;YAHOO.util.Cookie.set("pucCookie",c,{path:"/",domain:"thestreet.com"})}catch(d){}}var pucedLinks=YAHOO.util.Dom.getElementsByClassName("pucedLink","a");YAHOO.util.Event.on(pucedLinks,"click",setPucCookie);