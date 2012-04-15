usingNamespace("Biz.Search")["AutoFilledKeywords"]={IframeKeyWordsEnable:null,json:null,xml:null,index:0,key:"",nValue : 0,keywordsUrl:"Common/Ajax/AutoFilledKeywords.aspx",url:function(){var afk=Biz.Search.AutoFilledKeywords;var p=afk.keywordsUrl;switch(Web.Environment.Protocol()){case Web.Enum.Protocol.http:var loc=document.location.toString().toLowerCase();if(loc.indexOf("secure")==-1){return Web.UI.ResourceManager.Url.www(p);}else{return Web.UI.ResourceManager.Url.shopper(p);};case Web.Enum.Protocol.https:return Web.UI.ResourceManager.Url.secure(p);default:return p;};},clear:function() {var afk=Biz.Search.AutoFilledKeywords;afk.abort();var o=$("autofilledview");if (o){Web.UI.Control.replaceInnerHTML(o,"");afk.hide();};afk.index=0;},abort:function(){var afk=Biz.Search.AutoFilledKeywords;if(afk.xml){afk.xml.abort();};},fill:function(el) {var text;if(IframeKeyWordsEnable=="True"){text = Web.UI.IFrame.getIFrameBody($("iframeKeywords")).innerHTML;}else{if(Web.Utility.isRequestSucceeded(el)){text = el.responseText;};};Biz.Search.AutoFilledKeywords.renderText(text);},renderText : function(responseText){var json=Object.fromJSON(responseText);var afk=Biz.Search.AutoFilledKeywords;if(json){var o=$("autofilledview");var html=[];afk.key=$("haQuickSearchBox")["value"].trim();if($("haQuickSearchStore") && $("haQuickSearchStore") != null){afk.nValue = $("haQuickSearchStore")["value"].trim();}else{afk.nValue = -1;}for(var i=0;i<json.newegg.length;i++){html.add('<div id="linehtml'+(i+1)+'" class="line">');var keyword = null;if(Web.Config.Environment.AutoFillBold.Enable || Web.Config.Environment.AutoFillBold.UseContentPage){keyword = '<span class="bold">' +afk.key + '</span>' + json.newegg[i].keyword.substring(afk.key.length);}else{keyword = json.newegg[i].keyword;}html.add('<span id="keywordshtml'+(i+1)+'" class="keywords">'+ keyword.trim() + '</span>');if(afk.nValue == -1 && json.newegg[i].storeName != null){html.add('<span class="store"> ' + Web.Lang["in"] + ' '+json.newegg[i].storeName + '</span>');html.add('<input type="hidden" value="'+json.newegg[i].nValue + '" />');}html.add('</div>');html.add('<div  id="line'+(i+1)+'" class="line" style="display:none">');html.add('<span id="keywords'+(i+1)+'" class="keywords">'+  json.newegg[i].keyword.trim() + '</span>');html.add('</div>');}Web.UI.Control.replaceInnerHTML(o,html.join(""));if (o&&html.length>0){afk.show();}else{afk.hide();};};},WWWCallback : function(responseText){Biz.Search.AutoFilledKeywords.renderText(responseText);},query:function(){var afk=Biz.Search.AutoFilledKeywords;var o=window.event.srcElement;var keyCode=window.event.keyCode;switch(keyCode) {case 13:break;case 27:afk.clear();break;case 37:break;case 38:if ($("autofilledview").innerHTML.length>0){afk.show();var lastId=afk.index;if (lastId<=1){afk.index=$("autofilledview").childNodes.length /2;} else {--afk.index;};$("haQuickSearchBox")["value"]=$("line"+afk.index).childNodes[0].innerHTML.decodeHtml();afk.highlight(afk.index, lastId);}break;case 39:break;case 40:if ($("autofilledview").innerHTML.length>0){afk.show();var lastId=afk.index;if (lastId>=$("autofilledview").childNodes.length /2){afk.index=1;}else{++afk.index;};$("haQuickSearchBox")["value"]=$("line"+afk.index).childNodes[0].innerHTML.decodeHtml();afk.highlight(afk.index, lastId);};break;default:if (o) {var key=o["value"];if (key==""){afk.clear();afk.key="";return;};var igonreKeys=[9,16,17,19,20,33,34,35,36,37,38,39,40,45,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,144,145];if (!igonreKeys.contains(keyCode)){var n = -1;if($("haQuickSearchStore") && $("haQuickSearchStore") != null){n = $("haQuickSearchStore")["value"].trim();}if(IframeKeyWordsEnable=="True"){$("iframeKeywords").src=(afk.url()+"?q="+key.encodeURI()+"&n=" + n +"&rdm="+ (new Date()).toString().encodeURI());$("iframeKeywords").attachEvent("onload",afk.fill);}else if(Web.Config.Environment.AutoFillBold.UseContentPage){afk.WWWQuery(key.encodeURI());}else{var wnr=Web.Enum.Network.Request;afk.abort();afk.xml=Web.Network.createRequest(wnr.Type.XML,afk.url()+"?q="+key.encodeURI()+"&n=" + n + "&rdm="+ (new Date()).toString().encodeURI(),"",afk.fill,wnr.Method.Get);afk.xml.execute();}};};};},show:function(){var wuc=Web.UI.Control;var ov=$("autofilledview");wuc.setAttribute(ov,{"style.display":"block"});if (Web.Environment.Browser.isIE()){var f=$("commonIframe");if(f){wuc.setAttribute(f,{"style.zIndex":"100"});wuc.setAttribute(f,{"style.top":ov.offsetTop});wuc.setAttribute(f,{"style.left":ov.offsetLeft});wuc.setAttribute(f,{"style.width":ov.offsetWidth});wuc.setAttribute(f,{"style.height":ov.offsetHeight});wuc.setAttribute(f,{"style.filter":"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"});wuc.setAttribute(f,{"style.position":"absolute"});wuc.setAttribute(f,{"style.display":"block"});};};},hide:function(o){var wuc=Web.UI.Control;wuc.setAttribute($("autofilledview"),{"style.display":"none"});wuc.setAttribute($("commonIframe"),{"style.display":"none"});},search:function(){Biz.Common.QuickSearch.submitPagehHeader2011();Web.UI.Form.submit("haFormQuickSearch");},highlight:function(id,lastId){var wuc=Web.UI.Control;if (id) {var o=$("linehtml"+id);var k=$("keywordshtml"+id);if (o){wuc.setAttribute(o,{"style.color":"#555"});wuc.setAttribute(o,{"style.backgroundColor":"#d3e3f9"});};};if (lastId) {var lasto=$("linehtml"+lastId);var lastk=$("keywordshtml"+lastId);if (lasto){wuc.setAttribute(lasto,{"style.color":"#555"});wuc.setAttribute(lasto,{"style.backgroundColor":"#fff"});};};},autoCompleteKeywords:function() {var afk=Biz.Search.AutoFilledKeywords;var o=window.event.srcElement;if (o){if (o.nodeName=="SPAN"){o=o.parentNode;};if (o.className=="line"){var lastId=afk.index;afk.index=o["id"].replace(/[a-z]/ig,"");if (lastId==0||lastId!=afk.index) {afk.highlight(afk.index,lastId);};};};},getIFrameEnable:function(enable){IframeKeyWordsEnable = enable;},WWWQuery: function(key){var afk=Biz.Search.AutoFilledKeywords;var p=afk.keywordsUrl;var reqUrl = Web.Config.Environment.Url.Content + p;var n= -1;if($("haQuickSearchStore") && $("haQuickSearchStore") != null){n = $("haQuickSearchStore")["value"];}var name = Web.Config.SiteCookieInfo.bizUnit;var script = $("autoFillKeywordAjaxJs");if(script && script != null){document.getElementsByTagName('head')[0].removeChild(script);}script=document.createElement("script");script.type = "text/javascript";script.id= 'autoFillKeywordAjaxJs';script.src= reqUrl +"?q="+key+"&sType=Outer&n=" + n + "&name=" + name;document.getElementsByTagName('head')[0].appendChild(script);},setKeywords: function(index){$("haQuickSearchBox")["value"]=$("line"+index).childNodes[0].innerHTML.decodeHtml();var cline = document.getElementById("linehtml"+index);var taginputs= cline.getElementsByTagName("input");var cinput = null;if(taginputs != null && taginputs.length > 0){cinput = taginputs[0];}var n = cinput != null ? cinput.value : -1;if($("N") && $("N")!=null){$("N")["value"] = n;}}};window.attachEvent("onload",(function(){var afk=Biz.Search.AutoFilledKeywords;if(document.haFormQuickSearch){document.haFormQuickSearch.attachEvent("onsubmit",(function(e){if($("line"+afk.index)){afk.setKeywords(afk.index);};}));};if($("haSubmitQuickSearch")){$("haSubmitQuickSearch").attachEvent("onclick",(function(){afk.index=0;}));};if($("autofilledview")){$("autofilledview").attachEvent("onmouseover",afk.autoCompleteKeywords);$("autofilledview").attachEvent("onclick",(function(){afk.setKeywords(afk.index);afk.search();}));};if($("haQuickSearchBox")){$("haQuickSearchBox").attachEvent("onkeyup",afk.query);};window.document.body.attachEvent("onclick",(function(){var o=window.event.srcElement;if (o["id"]!="autofilledview"&&o["id"]!="haQuickSearchBox") {afk.hide();};}));}));