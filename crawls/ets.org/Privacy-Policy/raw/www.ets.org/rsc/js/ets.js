var curvyCornersVerbose=false;var curve4_settings={tl:{radius:4},tr:{radius:4},bl:{radius:4},br:{radius:4},antiAlias:true};var curve6_settings={tl:{radius:6},tr:{radius:6},bl:{radius:6},br:{radius:6},antiAlias:true};var curve8_settings={tl:{radius:8},tr:{radius:8},bl:{radius:8},br:{radius:8},antiAlias:true};var curve10_settings={tl:{radius:10},tr:{radius:10},bl:{radius:10},br:{radius:10},antiAlias:true};var curve12_settings={tl:{radius:12},tr:{radius:12},bl:{radius:12},br:{radius:12},antiAlias:true};var random_18687=Math.floor(Math.random()*(9));$(document).ready(function(){if($('link[href^="/rsc/css/lang/"]').length!=0){$("div#site-search").remove()}$('#page-contents a[href^="http"]').each(function(){openNewWindow($(this))});$('#page-contents a[href^="/bin/getprogram.cgi?test=gre"]').each(function(){openNewWindow($(this))});$('#page-contents a[href^="/gre/rrc"]').each(function(){openNewWindow($(this))});$('div.container-280 a[href^="http"]').each(function(){openNewWindow($(this))});$('#top-navigation a[href^="http"]').each(function(){openNewWindow($(this))});$('#top-navigation a[href^="/store"]').each(function(){openNewWindow($(this))});$('#corp-links a[href^="/survey"]').each(function(){openNewWindow($(this))});$('#site-tools a[href^="/survey"]').each(function(){openNewWindow($(this))});$('#section-navigation a[href^="http"]').each(function(){openNewWindow($(this))});$('a[href$=".pdf"]').each(function(){$(this).filter(function(b){return $("img",this).length==0}).filter(function(b){return $(this).hasClass("make-pretty-button")==false}).append(" (PDF)");$(this).attr("title","This link opens in a new window");$(this).unbind();$(this).click(function(b){b.preventDefault();$(this).bind("click",function(){return false});window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})});$('a[href$=".txt"]').each(function(){$(this).append(" (Text)");if(!(/^http/.test($(this).attr("href")))&&!(/popup/i.test($(this).attr("class")))){$(this).click(function(b){b.preventDefault();window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}});$('a[href$=".doc"]').each(function(){$(this).append(" (Word)");if(!(/^http/.test($(this).attr("href")))&&!(/popup/i.test($(this).attr("class")))){$(this).click(function(b){b.preventDefault();window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}});$('a[href$=".xls"]').each(function(){$(this).append(" (Excel)");if(!(/^http/.test($(this).attr("href")))&&!(/popup/i.test($(this).attr("class")))){$(this).click(function(b){b.preventDefault();window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}});$('a[href$=".swf"]').each(function(){$(this).append(" (Flash)");if(!(/^http/.test($(this).attr("href")))&&!(/popup/i.test($(this).attr("class")))){$(this).click(function(b){b.preventDefault();window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}});$('a[href$=".ppt"]').each(function(){$(this).append(" (PowerPoint)");if(!(/^http/.test($(this).attr("href")))&&!(/popup/i.test($(this).attr("class")))){$(this).click(function(b){b.preventDefault();window.open($(this).attr("href"),"etsOpenWindow","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}});$("a[name]").filter(function(){return $(this).html()==="&nbsp;"}).each(function(){$(this).html("")});$("div#site-nav ul#site-nav-top li:last-child").addClass("last");$("div#section-navigation ul#section-nav li:last").addClass("last");$("div#section-navigation ul.subnav li:last").addClass("last");$("div#corp-links ul li:last").addClass("last");$(".important-update p:last-child").addClass("last");$(".feature p:last-child").addClass("last");$(".ad-banner p:last-child").addClass("last");$(".news-blurb p:last-child").addClass("last");$(".home-right-blurb p:last-child").addClass("last");$(".promo p:last-child").addClass("last");$(".promo:last-child").css("margin-bottom","0.8em");$("#site-nav-top li").hover(function(){$("ul",this).fadeIn("fast")},function(){$("ul",this).fadeOut("")});if(document.all){$("#site-nav-top li").hoverClass("sfHover")}$("#section-navigation li").hover(function(){$("ul",this).fadeIn("fast")},function(){$("ul",this).fadeOut("slow")});if(document.all){$("#section-navigation li").hoverClass("sfHover")}$(".rounded-border").addClass("{transparent}").corners("4px");$(".rounded-noborder").addClass("{transparent}").corners("4px");$(".important-update").addClass("{transparent}").corners("10px");$(".content-box").addClass("{transparent}").corners("10px");$(".banner-box").addClass("{transparent}").corners("10px");$(".feature").addClass("{transparent}").corners("10px");$(".ad-banner").addClass("{transparent}").corners("10px");balance2Divs("column-box-1-left","column-box-1-right");if($.browser.msie){$("div.container-760 div.content-box-nofiller div.column-box-1-left").css("width","328px");$("div.container-760 div.content-box-nofiller div.column-box-1-right").css("width","328px");$("div.container-640 div.content-box-nofiller div.column-box-1-left").css("width","278px");$("div.container-640 div.content-box-nofiller div.column-box-1-right").css("width","278px");$("div.container-560 div.content-box-nofiller div.column-box-1-left").css("width","238px");$("div.container-560 div.content-box-nofiller div.column-box-1-right").css("width","238px")}$("div.content-box-nofiller .column-box-1-left").addClass("{transparent}").corners("10px");$("div.content-box-nofiller .column-box-1-right").addClass("{transparent}").corners("10px");$(".nav-box").addClass("{transparent}").corners("10px");$(".nav-box ul.subnav li:last").addClass("last");$("#main-navigation li span.has-arrow").parent().addClass("{transparent}").corners("8px").addClass("white-bkgrnd");if($.browser.safari){$(".go-button").css("padding","3px")}if($.browser.msie){$("a.action-button td").css("font-weight","bold");$("a.action-button td").css("line-height","1em");try{curvyCorners(curve12_settings,document.getElementById("promo-wrap-1"))}catch(a){}try{curvyCorners(curve12_settings,document.getElementById("promo-wrap-2"))}catch(a){}}else{$(".promo-wrap").addClass("{transpaernt}").corners("10px")}$("dl.faq-topic-list > dd").hide();$("dl.faq-topic-list > dt").addClass("close").css("cursor","pointer").hover(function(){$(this).css("text-decoration","underline")},function(){$(this).css("text-decoration","none")});$("dl.faq-topic-list > dt").click(function(){var b=$(this).attr("class");if(b=="close"){$(this).removeClass("close").addClass("open");$(this).next("dd").show()}else{$(this).removeClass("open").addClass("close");$(this).next("dd").hide()}});$("#faq-topic-list-show-all").addClass("faq-topic-control").click(function(){$("dl.faq-topic-list > dt").removeClass("close").removeClass("open").addClass("open");$("dl.faq-topic-list > dd").show()});$("#faq-topic-list-hide-all").addClass("faq-topic-control").click(function(){$("dl.faq-topic-list > dt").removeClass("close").removeClass("open").addClass("close");$("dl.faq-topic-list > dd").hide()});$("a.bookmarkfunction").each(function(b){$(this).click(function(d){d.preventDefault();url=window.location;title=jQuery("title").html();if(window.sidebar){try{window.sidebar.addPanel(title,url,"")}catch(c){alert("To bookmark this page in Mozilla, use CTRL + D")}}else{if(window.external){try{window.external.AddFavorite(url,title)}catch(c){alert("To bookmark this page in Internet Explorer, use CTRL + D")}}else{if(window.opera&&window.print){try{return true}catch(c){alert("To bookmark this page in Opera, use CTRL + T")}}}}})});$("a.popup").each(function(b){$(this).click(function(e){e.preventDefault();if($(this).attr("class")){var c=800;var h=600;var d=$(this).attr("class");var f=/(h-\d+|w-\d+)/gi;var g=d.match(f);if(g!=null){g.forEach(function(j,i){if(/w-\d+/.test(j)){c=j.substr(2)}if(/h-\d+/.test(j)){h=j.substr(2)}})}}$(this).attr("title","This link opens in a new window");pop_url=$(this).attr("href");pop_window=window.open(pop_url,"ets_pop","location=1,resizable=1,scrollbars=1,status=1,width="+c+",height="+h)})})});function addProgramContact(a,b){$('div.skip:contains("Skip to site search")').after('<div class="skip"><a href="'+b+'">'+a+"</a></div>")}function tweakSkipText(){$('div.skip a:contains("Skip to main content")').html("Skip to content");$('div.skip a:contains("Skip to site search")').html("Skip to search")}function openNewWindow(a){if(!/popup/i.test($(a).attr("class"))){if(!/search.ets.org/i.test($(a).attr("href"))&&!/http:\/\/ets.pereless.com\/careers\//i.test($(a).attr("href"))&&!/(http:\/\/)?etscrs.submit4jobs.com/i.test($(a).attr("href"))&&!/(http:\/\/|http:\/\/www\.|www\.|http:\/\/mygre\.|https:\/\/mygre\.)?ets.org/i.test($(a).attr("href"))||/(http:\/\/|http:\/\/www\.|www\.|https:\/\/www\.|)?ets.org\/portal\/site\/iserpraxis\//i.test($(a).attr("href"))){$(a).attr("title","This link opens in a new window");$(a).click(function(b){b.preventDefault();window.open($(a).attr("href"),"","status=1,toolbar=1,location=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=800,height=600")})}}}function isBrowserIe(){try{return !(Array.prototype.slice.call(document.forms,0) instanceof Array)}catch(a){return !(false)}}$.fn.hoverClass=function(a){return this.each(function(){$(this).hover(function(){$(this).addClass(a)},function(){$(this).removeClass(a)})})};function balance2Divs(d,c){if($("#"+d).length!=0&&$("#"+c).length!=0){var f=$("#"+d).height();var g=$("#"+c).height();var e=f;if(f<g){e=g}$("#"+d).height(e);$("#"+c).height(e)}}if(!Array.prototype.forEach){Array.prototype.forEach=function(b){var a=this.length>>>0;if(typeof b!="function"){throw new TypeError()}var d=arguments[1];for(var c=0;c<a;c++){if(c in this){b.call(d,this[c],c,this)}}}};