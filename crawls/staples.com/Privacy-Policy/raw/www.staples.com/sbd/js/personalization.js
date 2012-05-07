var alertPerfForCarousel=true;var alertPageChanger=true;var storedDivObj=new Object();var showMath=false;var showReviews=(propertyValues.reviewsMasterSwitch=="ON")?true:false;var debugMode=strGetCookie("personalizationDebugMode");function loadPersonalized_worker(b){var c=(new Date()).getTime();try{$.ajax({url:b,type:"GET",dataType:"xml",timeout:globalTimeout,error:function(){debugMessages.push("Personalization: timeout or xml parse error on "+b);$("#debug").append("<br />Personalization: timeout or xml parse error on "+b);},success:function(f){processPersonalized(f);var d=(new Date()).getTime();if(alertPerfForCarousel){var e=d-c;$("#debug").append("<br /> PerfForLoadPersonalized ="+e);}}});}catch(a){debugMessages.push("Personalization: invalid return on "+b);$("#debug").append("<br />Personalization: invalid return on "+b);}}function inlinePersonalized_worker(a){var c=$("#"+a).html();c=c.replace(/\<\!\-\-\[CDATA\[/g,"<![CDATA[");c=c.replace(/\]\]\-\-\>/g,"]]>");var b=$.fromXMLString(c);processPersonalized(b);}var featuretemplate="<h4 class='a200'>{HEADLINE}</h4>"+"<div class='perpage'>{PAGES}</div>"+"<div class='b201'>"+"{CURRENTHTML}"+"<div>"+"{CONTENT}"+"</div>"+"</div>";function processPersonalized(c){var b=$(c).find("timestamp").text();showMath=($(c).find("pricingLinkSwitch").text()=="ON")?true:false;if(debugMode!=null&&debugMode=="true"){var a=$(c).find("fragmentsource").text();$("#bmsging > ul").append("<li>Personalization source: "+a+"</li>");}$(c).find("scheme").each(function(){var r=$(this).attr("id");r=r.replace(/_data$/,"");storedDivObj[r]=$("#"+r);var k=storedDivObj[r].html();storedDivObj[r].addClass("hide");if(storedDivObj[r].hasClass("carousel")){var s="<div class='prevButton'><a href='#' onclick='pageChanger(storedDivObj[\""+r+"\"],0,-1); return false;' onmouseover='pageLoader(storedDivObj[\""+r+"\"],0,-1);'>"+propertyValues.previous+"</a></div>"+"<div class='nextButton'><a href='#' onclick='pageChanger(storedDivObj[\""+r+"\"],0,1); return false;' onmouseover='pageLoader(storedDivObj[\""+r+"\"],0,1);'>"+propertyValues.next+"</a></div>"+"<h4 class='a200'>{HEADLINE}</h4>"+"<div class='perpage'></div>"+"<div class='b201'>"+"{CURRENTHTML}"+"{CONTENT}"+"<span class='footline'>{FOOTLINE}</span>"+"</div>"+"<hr /><div class='carouselStatus'></div>";storedDivObj[r].html(templateFiller(s,$(this).find("headline").text(),k,$(this).find("content").text(),$(this).find("footline").text()));prepCarousel_worker(r,showMath);}else{if(storedDivObj[r].hasClass("feature")&&storedDivObj[r].hasClass("hero")){var s="<h4 class='a200'>{HEADLINE}</h4>"+"<div class='b201'>"+"{CURRENTHTML}"+"<div class='heroleft'></div>"+"<div class='heroright'>"+"{CONTENT}"+"</div>"+"</div>";storedDivObj[r].html(templateFiller(s,$(this).find("headline").text(),k,$(this).find("content").text()));storedDivObj[r].find("div.p01:not(:has(h4))").remove();var o=storedDivObj[r].find("div.heroleft:first");o.append(storedDivObj[r].find("div.p01:first"));o.find("img:first").addClass("hero");var j=storedDivObj[r].attr("class").match("c(\\d+)");if(j){storedDivObj[r].data("carwide",parseInt(j[1])-1);}else{storedDivObj[r].data("carwide",1);}var q=storedDivObj[r].find("div.heroright");var p=storedDivObj[r].attr("class").match("r(\\d+)");if(p){storedDivObj[r].data("carrows",parseInt(p[1]));}else{storedDivObj[r].data("carrows",0);}if(storedDivObj[r].data("carwide")>1&&storedDivObj[r].data("carrows")>0){var u=(storedDivObj[r].data("carwide")*storedDivObj[r].data("carrows"))-1;q.find("div.p01:gt("+u+")").remove();}storedDivObj[r].data("p01s",storedDivObj[r].find("div.p01"));storedDivObj[r].data("size",storedDivObj[r].data("p01s").size());q.find("div.p01:nth-child("+(storedDivObj[r].data("carwide"))+"n)").after("<hr />");q.find("hr:last-child").remove();if(storedDivObj[r].data("size")>=1){storedDivObj[r].removeClass("hide");contentLoader(storedDivObj[r],0,-1,0,-1);if(storedDivObj[r].data("carwide")>1){q.data("p01s",q.find("div.p01"));q.data("carwide",storedDivObj[r].data("carwide"));q.data("maxpages",Math.ceil((storedDivObj[r].data("size")-1)/q.data("carwide")));unifyHeightPerRow(q);}}else{debugMessages.push("Personalization: no products on "+r);$("#debug").append("<br />Personalization: no products on "+r);}}else{if(storedDivObj[r].hasClass("feature")&&storedDivObj[r].hasClass("recommended")){var s="<form id='skuForm_"+r+"' method='post' action='' name='skuForm_"+r+"'>"+"<h4 class='a200'>{HEADLINE}</h4>"+"<div class='b201'>";s+="{CURRENTHTML}"+"<div>"+"{CONTENT}"+"</div>"+"</div>"+"</form>";var n="<div class='recommendedaddtocart'><a class='d01' href='#' onclick='addPersonalizedToCart(\"/office/supplies/StaplesAddToCart?ST_viewFrom=sku&langId=-1&storeId=10001&URL=yourorder&catalogId=10051\", \"skuForm_"+r+"\"); return false;'>"+propertyValues.addtocart+"</a></div>";storedDivObj[r].html(templateFiller(s,$(this).find("headline").text(),k,$(this).find("content").text()));storedDivObj[r].find("div.p01:not(:has(h4))").remove();storedDivObj[r].data("p01s",storedDivObj[r].find("div.p01"));storedDivObj[r].data("p01s").wrapInner("<div class='recommendedleft'></div>");storedDivObj[r].data("size",storedDivObj[r].data("p01s").size());var j=storedDivObj[r].attr("class").match("c(\\d+)");if(j){storedDivObj[r].data("carwide",parseInt(j[1])-1);}else{storedDivObj[r].data("carwide",1);}if(storedDivObj[r].data("size")>=1){storedDivObj[r].removeClass("hide");contentLoader(storedDivObj[r],0,-1,0,-1);}else{debugMessages.push("Personalization: no products on "+r);$("#debug").append("<br />Personalization: no products on "+r);}}else{if(storedDivObj[r].hasClass("feature")){var s=featuretemplate;storedDivObj[r].html(templateFiller(s,$(this).find("headline").text(),k,$(this).find("content").text()));storedDivObj[r].find("div.p01:not(:has(h4))").remove();var j=storedDivObj[r].attr("class").match("c(\\d+)");if(j){storedDivObj[r].data("carwide",parseInt(j[1]));}else{storedDivObj[r].data("carwide",1);}var p=storedDivObj[r].attr("class").match("r(\\d+)");if(p){storedDivObj[r].data("carrows",parseInt(p[1]));}else{storedDivObj[r].data("carrows",0);}if(storedDivObj[r].data("carwide")>1&&storedDivObj[r].data("carrows")>0){var u=(storedDivObj[r].data("carwide")*storedDivObj[r].data("carrows"))-1;storedDivObj[r].find("div.p01:gt("+u+")").remove();}storedDivObj[r].data("p01s",storedDivObj[r].find("div.p01"));storedDivObj[r].data("size",storedDivObj[r].data("p01s").size());if(storedDivObj[r].data("carwide")>1){storedDivObj[r].find("div.p01:nth-child("+storedDivObj[r].data("carwide")+"n)").after("<hr />");storedDivObj[r].find("div.b201 hr:last-child").remove();}if(storedDivObj[r].data("size")>=1){storedDivObj[r].removeClass("hide");contentLoader(storedDivObj[r],0,-1,0,-1);if(storedDivObj[r].data("carwide")>1){storedDivObj[r].data("maxpages",Math.ceil(storedDivObj[r].data("size")/storedDivObj[r].data("carwide")));unifyHeightPerRow(storedDivObj[r]);}}else{debugMessages.push("Personalization: no products on "+r);$("#debug").append("<br />Personalization: no products on "+r);}}else{var s="{CONTENT}";if(storedDivObj[r].find("div.productdetail").size()>0){if(storedDivObj[r].find("div.productdetail").text().length>0){storedDivObj[r].find("div.p01").empty();}}if(storedDivObj[r].find("div.notfounderror").text().length>0){storedDivObj[r].empty();}storedDivObj[r].append(templateFiller(s,null,null,null,$(this).find("content").text()));if(storedDivObj[r].find("div.productdetail").size()>0){var t=r.split("_");var g="item"+t[1];var h="li"+t[1];if(($.trim(storedDivObj[r].find("div.productdetail").text()).length)==0){storedDivObj[r].find("div.p01").empty();storedDivObj[r].empty();var s='<div class="notfounderror">'+"Item Not Found"+"</div>";storedDivObj[r].append(templateFiller(s,null,null,$(this).find("content").text()));var f=$("#"+g).attr("name").split("_");var d=f[0]+"_"+f[1]+"_error";$("#"+g).attr("name",d);$("#"+h).removeClass("prodempty");$("#"+h).addClass("prodnotfound");}else{if(storedDivObj[r].find("div.mathstory dl:first dd:first b:first i:first").text()=="$9,999,999.99"){storedDivObj[r].find("div.p01").empty();storedDivObj[r].empty();var s='<div class="notfounderror">'+"Item Not Found"+"</div>";storedDivObj[r].append(templateFiller(s,null,null,$(this).find("content").text()));var f=$("#"+g).attr("name").split("_");var d=f[0]+"_"+f[1]+"_error";$("#"+g).attr("name",d);$("#"+h).removeClass("prodempty");$("#"+h).addClass("prodnotfound");}else{storedDivObj[r].data("p01s",storedDivObj[r].find("div.p01"));storedDivObj[r].data("size",storedDivObj[r].data("p01s").size());showMath="ON";contentLoader(storedDivObj[r],0,-1,0,-1);var f=$("#"+g).attr("name").split("_");var d=f[0]+"_"+f[1]+"_success";$("#"+g).attr("name",d);$("#"+h).removeClass("prodempty");$("#"+h).removeClass("prodnotfound");}}}storedDivObj[r].removeClass("hide");}}}}if(debugMode!=null&&debugMode=="true"){if(storedDivObj[r].data("p01s")!=undefined){storedDivObj[r].data("p01s").each(function(){var e=$(this).find("div.timestamp").text();if(e!=""&&e>b){$(this).css("background-color","#fee");}});}}var i=storedDivObj[r].find("a");if(propertyValues.analyticsSwitch=="ON"){i.click(function(){openProductRecDetails(r);});}i.attr("target","_parent");if(isMsie7){try{var l=storedDivObj[r][0].offsetTop;}catch(m){}}});}function prepCarousel_worker(h,g){var k=(new Date()).getTime();showMath=g;storedDivObj[h]=$("#"+h);if(!storedDivObj[h]){storedDivObj[h]=$("#"+h);var d="";}var c=storedDivObj[h].attr("class").match("c(\\d+)");if(c){storedDivObj[h].data("carwide",parseInt(c[1]));}else{storedDivObj[h].data("carwide",1);}if(typeof(anchoredPage)!="undefined"){if(anchoredPage!=undefined&&anchoredPage!=""){storedDivObj[h].data("currentpage",parseInt(anchoredPage));}else{storedDivObj[h].data("currentpage",1);}}else{storedDivObj[h].data("currentpage",1);}storedDivObj[h].find("div.p01:not(:has(h4))").remove();storedDivObj[h].find("div.p01:nth-child("+storedDivObj[h].data("carwide")+"n)").after("<hr />");storedDivObj[h].find("div.b201 hr:last-child").remove();storedDivObj[h].data("p01s",storedDivObj[h].find("div.p01"));storedDivObj[h].data("pageStatus",storedDivObj[h].find("div.perpage:first"));storedDivObj[h].data("prevButton",storedDivObj[h].find("div.prevButton a:first"));storedDivObj[h].data("nextButton",storedDivObj[h].find("div.nextButton a:first"));storedDivObj[h].data("carouselStatus",storedDivObj[h].find("div.carouselStatus:first"));storedDivObj[h].data("b201",storedDivObj[h].find("div.b201:first"));storedDivObj[h].data("size",storedDivObj[h].data("p01s").size());storedDivObj[h].data("maxpages",Math.ceil(storedDivObj[h].data("size")/storedDivObj[h].data("carwide")));if(storedDivObj[h].data("maxpages")<=1&&storedDivObj[h].data("size")>=1){var i=featuretemplate;var l=$(this).find("headline").text();l=l?l:storedDivObj[h].find("h4.a200").html();var a=storedDivObj[h].find("div.p01").length;var j;if(a===1){j=" item";}else{j=" items";}if(storedDivObj[h].find("h4.a200").html()==null||storedDivObj[h].find("h4.a200").html()==""){l="<span>"+a+j+"</span>";}var d=d?d:"";var b="<span class='note'>"+a+j+"</span>";storedDivObj[h].empty().html(templateFiller(i,l,b,d,""));storedDivObj[h].find("div.b201:first").append(storedDivObj[h].data("p01s"));storedDivObj[h].removeClass("carousel").addClass("feature").removeClass("hide");contentLoader(storedDivObj[h],0,-1,0,-1);unifyHeightPerRow(storedDivObj[h]);}else{if(storedDivObj[h].data("size")>=1){if(storedDivObj[h].hasClass("feature")){storedDivObj[h].removeClass("feature").addClass("carousel");prepCarousel(h,true);}storedDivObj[h].removeClass("hide");pageChanger(storedDivObj[h],0,0);}else{debugMessages.push("Personalization: no products on "+h);$("#debug").append("<br />Personalization: no products on "+h);}}var f=(new Date()).getTime();if(alertPerfForCarousel){var e=f-k;$("#debug").append("<br /> PerfForPrepCarousel ="+e);}}function contentHider(a){a.data("p01s").each(function(){hideProduct($(this));});}function contentLoader(e,g,c,f,b){var a=e.data("p01s");if(g<0){g=0;}if(g>e.data("size")-1){g=e.data("size")-1;}if(c<0||c>e.data("size")-1){c=e.data("size")-1;}if(b<0){b=e.data("size")-1;}for(var d=g;d<=c;d++){loadPersonalizationImages(a.eq(d),e.attr("id"));if(!isReadyProduct(a.eq(d))){if(showMath){loadMath(a.eq(d),e.attr("id"),d,e.data("carwide"));}else{readyProduct(a.eq(d));}}if(showReviews){loadReviews(a.eq(d));}if(d>=f&&d<=b){showProduct(a.eq(d));}}}function templateFiller(d,c,b,a,f,e){d=d.replace(/\{HEADLINE\}/,c);d=d.replace(/\{PAGES\}/,b);d=d.replace(/\{CURRENTHTML\}/,a);var f=f?f:"";d=d.replace(/\{CONTENT\}/,f);var e=e?e:"";d=d.replace(/\{FOOTLINE\}/,e);d=d.replace(/\{FOOTLINE\}/,e);return d;}function readyProduct(a){a.addClass("ready");a.attr("class");}function isReadyProduct(a){return a.hasClass("ready");}function showProduct(a){a.removeClass("hide");a.addClass("show");}function hideProduct(a){a.removeClass("show");a.addClass("hide");}function addCartUrl(b,c){var a=$(b).siblings("input").val();if(a){a=parseInt(a.replace(/[^0-9]/,""));}else{a=1;}c=c.replace(/(quantity_(\d+)=)\d*/,"$1"+a+"&cmArea_$2="+$(b).attr("cmArea"));$(b).siblings("input").val(a);$(b).attr("href",c);window.parent.location=c;return false;}function loadMath(d,h,b,a){var c=d.find("a.mathstoryurl:first");var i=d.find("div.mathstory:first");if(c[0]){var f=c[0].href;c.remove();try{$.ajax({url:f,type:"GET",dataType:"html",timeout:globalTimeout,error:function(){readyProduct(d);},success:function(e){i.html(e);processMath(d,i,h,b,a);}});}catch(g){readyProduct(d);}}if(i[0]){processMath(d,i,h,b,a);}else{readyProduct(d);}}function processMath(f,d,c,i,e){f.find("div.details").remove();f.append(f.find("div.recommendedleft label.note"));f.append(f.find("div.recommendedleft input.text3"));f.append(f.find("div.recommendedleft a.d01"));d.find("input[name^=cmArea]").attr("value",c);d.find("a").attr("cmArea",c);var l=d.find("div.mathflyout");var j=l.parents("div").filter(".pricenew");var k=d.find("a.psavelink > b > i");if(k[0]){var h=k.text().replace(/[^0-9\.\,]/g,"").split(".",2);var b;for(b in h){if(h[0]==""){h[b]="0";}}loadPersonalizationImages(f,c,h);}d.find("dd.psave").hover(function(){j.css("zIndex",8010);l.removeClass("hide");return false;},function(){j.css("zIndex",0);l.addClass("hide");return false;}).children("a.psavelink:not(.spic)").each(function(){disableLink($(this));});if(isOverlay){f.find("a.spic").each(function(){disableLink($(this));});}var g=(i%e)+1;var a=Math.ceil(e/2);if(g>a||e==1||pageId=="orderbycat"){l.addClass("left");l.children("img.mfoarrow").attr("src","/sbd/img/ico/ico_mfoarrow_left.png");}else{l.removeClass("left");l.children("img.mfoarrow").attr("src","/sbd/img/ico/ico_mfoarrow.png");}if(pageId=="orderbycat"){f.find("a").each(function(){disableLink($(this));});}readyProduct(f);}function loadPersonalizationImages(a,c,b){a.find("img:first").each(function(){var d=$(this).attr("src");var f=d.indexOf("/sbd/img/bg/blank.gif");if(f!==-1||b){if(!a.data("image")){a.data("image",$(this).attr("name"));$(this).removeAttr("name");}var e=propertyValues.s7nonsecure;if(isSecure){if(isKiosk){e=propertyValues.s7kiosksecure;}else{e=propertyValues.s7secure;}}if(b){e+=propertyValues.s7reddotpath;e=e.replace(/\{0\}/g,escape("is{Staples/"+a.data("image")+"_sc7}"));e=e.replace(/\{1\}/g,escape(b[0]));e=e.replace(/\{2\}/g,escape(b[1]));}else{e+=propertyValues.s7path+"?{3}";e=e.replace(/\{0\}/g,a.data("image"));}if($(this).hasClass("hero")){e=e.replace(/\{3\}/g,"$hero$");}else{if(pageId=="home"||c.match(/_rr$/)||pageId=="samhome"){e=e.replace(/\{3\}/g,"$small$");}else{if(c=="samoverlay"){e=e.replace(/\{3\}/g,"$smaller$");}else{if(pageId=="orderbycat"){e=e.replace(/\{3\}/g,"$thb$");}else{e=e.replace(/\{3\}/g,"$lnk$");}}}}$(this).attr("src",e);}});}function loadReviews(a){if(typeof(pr_merchant_group_id)!="undefined"){a.find("div.reviewsprodmod:not(:has(div))").each(function(){var i=$(this).attr("id");var f=i.match("^pwr(.*?)-");var h=f[1];pr_page_id=h;pr_snippet_id=i;pr_snippet_min_reviews=parseInt(propertyValues.reviewsFeaturedItemsThreshold);var c=$("#prSnippet"+pr_page_id);if(c.length>0){var e=$(this);var b=setInterval(function(){pollSnippet(e,c,b);},100);setTimeout(function(){clearPollSnippet(e,b);},globalTimeout*5);}else{$(this).append("<div id='prSnippet"+pr_page_id+"'></div>");var g;$(this).append("<iframe id='prIframe_"+pr_page_id+"' src='' class='hide'></iframe>");var d=$("#prIframe_"+pr_page_id+"")[0];g=d.contentWindow.document;g.open();g.write=postLoadWriter;snippet(g);g.close();}});}}function pollSnippet(d,c,b){if(c.html()!=""){var a=c.clone();a.removeAttr("id");d.html($(a));clearInterval(b);}}function clearPollSnippet(b,a){if(b.find("div").length==0){b.append("<div></div>");}clearInterval(a);}function postLoadWriter(a){$("#"+pr_snippet_id).append(a);}function postLoadWriterPrTab(a){if($("#prTabIframe_"+pr_page_id)){$("#prTabIframe_"+pr_page_id).load(function(){$("#prTabIframe_"+pr_page_id).contents().find("html body").html(a);});}}function pageLoader(e,i,d){var b=e.data("carwide");var a=e.data("currentpage");var f=0;if(i>=1){f=i;}if(d!=0){if(i>=1){f+=d;}else{f=a+d;}}if(f<0){a=0;}else{if(f>e.data("maxpages")){f=e.data("maxpages");}}var h=(b*a)-1;var j=h-b+1;if(h>e.data("size")-1){h=e.data("size")-1;}if(j<0){j=0;}if(f>0){var c=(b*f)-1;var g=h-b+1;if(c>e.data("size")-1){c=e.data("size")-1;}if(g<0){g=0;}}else{if(d==0){var c=e.data("size")-1;var g=0;}}if(f>0||d==0){contentLoader(e,g,c,j,h);}}function pageChanger(l,g,b){var y=(new Date()).getTime();var j=l.attr("id");var u=1;if(pageId=="home"){u=0;}if(g!=0||b!=0){var C=l.data("b201").superWidth();var v=l.data("b201").superHeight();var B="min-width:"+C+"px;"+"width:auto !important;"+"width:"+C+"px;"+"min-height:"+v+"px;"+"height:auto !important;"+"height:"+v+"px;";l.data("b201").css("cssText",B);}var D=l.data("carwide");var m=l.data("currentpage");if(g>0){m=g;}m+=b;if(m<1){m=1;}else{if(m>l.data("maxpages")){m=l.data("maxpages");}}if(g==0&&b==0&&l.data("initialized")!=undefined){l.data("b201").removeClass("expanded");}else{if(g!=0&&b==0){}else{if(g==0&&b>0){}else{if(g==0&&b<0){}}}}l.data("initialized",true);l.data("currentpage",m);var z=(D*m)-1;var k=z-D+1;if(z>l.data("size")-1){z=l.data("size")-1;}if(k<0){k=0;}var d=z+(D*u);var s=k-(D*u);if(d>l.data("size")-1){d=l.data("size")-1;}if(s<0){s=0;}contentHider(l);contentLoader(l,s,d,k,z);if(!l.data("h4height")){l.data("h4height",0);}if(!l.data("mathheight")){l.data("mathheight",0);}l.data("p01s").each(function(){if($(this).hasClass("show")){var i=$(this).children("h4");var G=i.totalHeight();if(G>l.data("h4height")){l.data("h4height",G);}var F=$(this).find("div.mathstory");var E=F.superHeight();if(E>l.data("mathheight")){l.data("mathheight",E);}}});l.data("p01s").each(function(){if($(this).hasClass("show")){var i=$(this).children("h4");i.css("height",l.data("h4height"));var E=$(this).find("div.mathstory");E.css("height",l.data("mathheight"));}});var o="<ul>";var w=1,p=l.data("maxpages"),r=1,n=p,h=parseInt(n-7),A,x;if(w==m){o+="<li class='first active'><a href='#' onclick='return false;'>"+w+"</a></li>";}else{o+='<li class="first"><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}if(p<=10){for(w=2;w<=p;w++){if(w==m){o+="<li class='active'><a href='#' onclick='return false;'>"+w+"</a></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}}if(p>10){for(w=2;w<=p;w++){if(m<=4){if(w>=2&&w<=7){if(w==m){o+="<li class='active'><a href='#' onclick='return false;'>"+w+"</a></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}if(w>7&&w<=p){}if(w==p){o+='<li><a href="javascript:void(0);" title="" class="interval">...'+"</a></li>";o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}if(m>4&&m<n){if(h<5){if(w==n-7){o+='<li><span class="interval">...'+"</span></li>";}if(w>=n-7&&w<=n){if(w==m){o+="<li class='active'><span>"+w+"</span></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}}if(h>=5){A=parseInt(m-1);x=parseInt(m+1);if(m>4&&m<=n-7){if(w==m){o+="<li class='active'><span>"+w+"</span></li>";}else{if(w>2&&w<A){}else{if(w<n&&w>x){}else{if(w==2){o+='<li><span class="interval">...'+"</span></li>";}else{if(w==n){o+='<li><span class="interval">...'+"</span></li>";o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}}}}}if(m>n-7&&m<=n){if(w==m){o+="<li class='active'><span>"+w+"</span></li>";}else{if(w>2&&w<n-7){}else{if(w==2){o+='<li><span class="interval">...'+"</span></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}}}}}if(m==n){A=parseInt(p-7);if(w>=r+1&&w<=A){}if(w==parseInt(A-1)){o+='<li><a href="javascript:void(0);" title="" class="interval">...'+"</a></li>";}if(w>=A){if(w==m){o+="<li class='active'><a href='#' onclick='return false;'>"+w+"</a></li>";}else{o+='<li><a href="#" onclick="pageChanger(storedDivObj[\''+j+"'],"+w+',0); return false;" onmouseover="pageLoader(storedDivObj[\''+j+"'],"+w+',0);">'+w+"</a></li>";}}}}}var c;if(j==="item_box"){var q;if(l.data("size")===1){q=" item";}else{q=" items";}c=(l.data("size")+q);}else{c=propertyValues.carouselitemcounter;c=c.replace(/\{0\}/g,(k+1));c=c.replace(/\{1\}/g,(z+1));c=c.replace(/\{2\}/g,l.data("size"));}o+='</ul><span class="note">'+c+"</span>";l.data("pageStatus").html(o);l.data("carouselStatus").html('<a href="javascript:void(0);" onclick="showAll(storedDivObj[\''+j+"']); return false;\" onmouseover=\"pageLoader(storedDivObj['"+j+"'],0,0);\">"+propertyValues.expand+'<img src="/sbd/img/bg/bg_expand.gif" alt="Expand to See All" /></a>');l.data("nextButton").show();l.data("prevButton").show();var f=$("#"+j).find("li.pageNext");var e=$("#"+j).find("li.pagePrev");if(m>1){l.data("prevButton").removeClass("inactive");e.show();}else{l.data("prevButton").addClass("inactive");e.hide();}if(m<l.data("maxpages")){l.data("nextButton").removeClass("inactive");f.show();}else{l.data("nextButton").addClass("inactive");f.hide();}var a=(new Date()).getTime();if(alertPageChanger){var t=a-y;$("#debug").append("<br /> PerfForPageChanger ="+t);}}function showAll(b){var a=b.attr("id");b.data("b201").css("width",b.data("b201").superWidth());b.data("b201").addClass("expanded");contentLoader(b,0,-1,0,-1);unifyHeightPerRow(b);var a=b.attr("id");var c=propertyValues.carouselitemtotal;c=c.replace(/\{0\}/g,b.data("size"));b.data("pageStatus").html('<ul><li>&nbsp;</li></ul><span class="note">'+c+"</span>");b.data("carouselStatus").html('<a href="javascript:void(0);" onclick="javascript:window.scrollTo(0,findPos( document.getElementById(\''+a+"')));pageChanger(storedDivObj['"+a+"'],0,0);\">"+propertyValues.collapse+'<img src="/sbd/img/bg/bg_collapse.gif" alt="Collapse" /></a> ');b.data("prevButton").hide();b.data("nextButton").hide();}function unifyHeightPerRow(a){for(var f=1;f<=a.data("maxpages");f++){var e=0;var h=0;for(var g=1;g<=a.data("carwide");g++){var j=(g+((f-1)*a.data("carwide")))-1;var d=a.data("p01s").eq(j).children("h4");var c=a.data("p01s").eq(j).find("div.mathstory");var b=d.totalHeight();if(b>e){e=b;}var i=c.superHeight();if(i>h){h=i;}}for(var g=1;g<=a.data("carwide");g++){var j=(g+((f-1)*a.data("carwide")))-1;var d=a.data("p01s").eq(j).children("h4");var c=a.data("p01s").eq(j).find("div.mathstory");d.css("height",e);c.css("height",h);}}}if(personalizationUrlStr!=""){loadPersonalized_worker(personalizationUrlStr);personalizationUrlStr="";}if(personalizationDataDivId!=""){inlinePersonalized_worker(personalizationDataDivId);personalizationDataDivId="";}if(carouselPrep[1]!=undefined){prepCarousel_worker(carouselPrep[0],carouselPrep[1]);personalizationDivId="";}function openProductRecDetails(d){var c="";if(typeof(variantPartnumber)!="undefined"){c="variant_"+d+"_"+variantPartnumber;}var b=document.getElementById(c);var a="0";if((typeof(b)!="undefined")&&(null!=b)){a=b.value;}variantPartnumber="";if(typeof(parentSku)!="undefined"){s_prodAffinity(parentSku,"Recommendations",d,a);}else{s_findMethod("Recommendations",d,a);}}