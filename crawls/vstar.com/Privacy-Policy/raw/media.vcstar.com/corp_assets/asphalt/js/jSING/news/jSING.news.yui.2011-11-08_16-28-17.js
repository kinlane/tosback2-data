var jSingNews={navigation:{superfish:function(){var path="current";var navContainer=$("ul#site_nav");if(navContainer.length){var current_nav=navContainer.attr("class").match(/nav_[a-z]*/);if(current_nav==null||current_nav[0]=="nav_"){if(jSINGconf.theme.SITE_ABBR=="oaw"||jSINGconf.theme.SITE_ABBR=="gve"){$("ul#site_nav li#nav_football").addClass(path);$("ul#site_nav li#nav_football > ul.secondary_nav").css("display","block")}else{$("ul#site_nav li#nav_news").addClass(path)}}else{$("ul#site_nav li#"+current_nav[0]).addClass(path);$("ul#site_nav li#"+current_nav[0]+" > ul.secondary_nav").css("display","block")
}$("ul#site_nav").superfish({pathClass:path,hoverClass:"hover",pathLevels:2,delay:1500,speed:"fastest",autoArrows:true,dropShadows:false})}},navPosition:function(){var wrapper_offset=$("#page_wrapper").offset(),nav_offset=844+wrapper_offset.left;$("ul.tertiary_nav").each(function(){var offset=$(this).offset();if(offset.left>nav_offset){$(this).addClass("shift_left")}});$("ul.quaternary_nav").each(function(){var offset=$(this).offset();if(offset.left>nav_offset){$(this).addClass("pop_left")}})},init:function(){this.navPosition();this.superfish()}},cellar:{doCellarLinks:function(dlSelector,promptText,showText,hideText){var dl=$(dlSelector),dtSelector=dlSelector+"_prompt",ddSelector=dlSelector+"_links";
if(dl.length){var dt=$(dtSelector),dd=$(ddSelector);dd.hide();dt.append('<a href="'+dlSelector+'">'+promptText+"</a>");var dtToggle=$(dtSelector+" a");dtToggle.click(function(clickEvent){clickEvent.preventDefault();var a=$(this);var t=a.text();dd.toggle();if(t.search(showText)>=0){a.text(t.replace(" "+showText," "+hideText))}else{a.text(t.replace(" "+hideText," "+showText))}})}},init:function(){var self=this;self.doCellarLinks("#business_directory"," See directory links","See","Hide");self.doCellarLinks("#jobs_by_city","(click to expand)","expand","hide");self.doCellarLinks("#jobs_by_cat","(click to expand)","expand","hide");
self.doCellarLinks("#jobs_by_popular","(click to expand)","expand","hide")}},popmenus:{doPlugin:function(){$.fn.popmenu=function(options){var defaults={menu:".popmenu",activeClass:false,time:1500,speed:"",effect:""};var options=$.extend(defaults,options);var active_menu=null;var timeout;return this.each(function(){var button=$(this);var menu=$(this).next();button.click(function(e){clearTimeout(timeout);if(menu.is(":hidden")){$(""+options.menu+":visible").each(function(){$(this).hide(options.speed);$(this).prev().removeClass(options.activeClass)});menu.show(options.speed);if(options.activeClass!=false){button.addClass(options.activeClass)
}}else{menu.hide(options.speed);if(options.activeClass!=false){button.removeClass(options.activeClass)}}active_menu=menu.index(menu);return false});button.mouseover(function(){clearTimeout(timeout);active_menu=menu.index(menu)});menu.mouseover(function(){clearTimeout(timeout);active_menu=menu.index(menu)});button.mouseout(function(){timeout=setTimeout(function(){if(options.activeClass!=false){button.removeClass(options.activeClass)}menu.hide(options.speed)},options.time);active_menu=null});menu.mouseout(function(){timeout=setTimeout(function(){if(options.activeClass!=false){button.removeClass(options.activeClass)
}menu.hide(options.speed)},options.time);active_menu=null});$(document).click(function(e){if(active_menu==null){$(options.menu+":visible").each(function(){$(this).hide(options.effect,options.speed);$(this).prev().removeClass(options.activeClass)})}})})}},init:function(){var self=this,popMenus=$(".popmenu_button");if(popMenus.length){self.doPlugin();popMenus.popmenu({activeClass:"active"})}}},carousels:{alertBarkCarousel:{doAlertBarCarousel:function(carousel){var controls='<div id="alert_bark_controls"><a id="alert_bark_prev" class="alert_bark_control alert_bark_prev" href="#alert_bark_carousel">Previous</a><div id="alert_bark_counter"><span id="alert_bark_counter_current">1</span> of <span id="alert_bark_counter_total">'+carousel.size()+'</span></div><a id="alert_bark_next" class="alert_bark_control alert_bark_next" href="#alert_bark_carousel">Next</a></div>';
$("#alert_bark_clipper").after(controls);$("#alert_bark_prev").bind("click",function(){carousel.prev();carousel.startAuto(0);return false});$("#alert_bark_next").bind("click",function(){carousel.next();carousel.startAuto(0);return false});jSING.carousels.utils.pauseAutoScrollOnHover(carousel)},alertBarOnSlide:function(carousel,item,current_page,state){$("#alert_bark_counter_current").text(current_page)},init:function(){var alertBar=$("#alert_bark_carousel");if(alertBar.children().size()>1){alertBar.jcarousel({vertical:false,auto:6,animation:250,easing:"swing",scroll:1,wrap:"both",initCallback:this.doAlertBarCarousel,itemFirstInCallback:this.alertBarOnSlide,buttonNextHTML:null,buttonPrevHTML:null});
$("#alert_bark_wrapper").hover(function(){$("#alert_bark_controls").stop(false,true).fadeTo(100,1)},function(){$("#alert_bark_controls").stop(false,true).hide(150,0)})}}},blacktopCarousel:{doBlacktopCarousel:function(carousel){var controls='<div id="btop_carousel_controls"><a id="btop_carousel_prev" class="btop_carousel_control btop_carousel_prev" href="#btop_carousel">Previous</a><div id="btop_carousel_counter">Contested Race <span id="btop_carousel_counter_current">1</span> of <span id="btop_carousel_counter_total">'+carousel.size()+'</span></div><a id="btop_carousel_next" class="btop_carousel_control btop_carousel_next" href="#btop_carousel">Next</a></div>';
$("#btop_carousel_clipper").after(controls);$("#btop_carousel_prev").bind("click",function(){carousel.prev();carousel.startAuto(0);return false});$("#btop_carousel_next").bind("click",function(){carousel.next();carousel.startAuto(0);return false});jSING.carousels.utils.pauseAutoScrollOnHover(carousel)},blacktopOnSlide:function(carousel,item,current_page,state){$("#btop_carousel_counter_current").text(current_page)},init:function(){var btopCarousel=$("#btop_carousel");if(btopCarousel.children().size()>1){btopCarousel.jcarousel({vertical:false,auto:6,animation:250,easing:"swing",scroll:1,wrap:"both",initCallback:this.doBlacktopCarousel,itemFirstInCallback:this.blacktopOnSlide,buttonNextHTML:null,buttonPrevHTML:null});
$("#btop_carousel_wrapper").hover(function(){$("#btop_carousel_controls").stop(false,true).fadeTo(100,1)},function(){$("#btop_carousel_controls").stop(false,true).hide(150,0)})}}},init:function(){var self=this;self.alertBarkCarousel.init();self.blacktopCarousel.init()}},dispatch:{dispatchCheck:function(jSonUrl){var dispatchCounter=0;var dispatchDisplayLink="";var docTitle="knoxnews NOW - "+jSINGconf.theme.SITE_NAME+" Local "+jSINGconf.theme.REGION+", "+jSINGconf.theme.STATE+" News Delivered Throughout the Day";window.setTimeout(waitCheck,5000,true);function waitCheck(){var firstActivity=$(".dispatch_activity:first").attr("id");
var topTweetId=parseInt(firstActivity.substring(6));$.getJSON(jSonUrl,function(data){$.each(data.items,function(key,value){if(value.service_data.id>topTweetId){dispatchCounter++}});if(dispatchCounter>0){if($("#dispatch_refresh_bar").length){$("#dispatch_refresh_bar").replaceWith("<div id='dispatch_refresh_bar'><p id='dispatchCount'><a href='#' id='dispatchDisplay'>Show "+dispatchCounter+" new updates</a></p></div>");dispatchDisplayLink=$("#dispatchDisplay").parent()}else{$("#dispatch_title_bar").after("<div id='dispatch_refresh_bar' style='display:none;'><p id='dispatchCount'><a href='#' id='dispatchDisplay'>Show "+dispatchCounter+" new updates</a></p></div>");
dispatchDisplayLink=$("#dispatchDisplay");$("#dispatch_refresh_bar").fadeIn(500)}document.title="("+dispatchCounter+" updates) "+docTitle}else{var dispatchDisplayLink=$("#dispatchDisplay").parent()}var data=data;dispatchDisplayLink.click(function(e){e.preventDefault();if($(".dispatch_homepage_widget").length){jSingNews.dispatch.dispatchDisplay(topTweetId,data)}else{jSingNews.dispatch.dispatchDisplayInside(topTweetId,data)}document.title=docTitle})});jSingNews.dispatch.dispatchCheck(jSonUrl)}},dispatchDisplayInside:function(topTweetId,data){var newActivity="";$.each(data.items,function(key,value){if(value.service_data.id>topTweetId){var publishTime=jSING.utils.stringTime(value.object.published,"time");
if(value.object.embeds.length){var dispatchImg="<div class='dispatch_attachment'><img src='"+value.object.embeds[0].url+"' /></div>"}else{var dispatchImg=""}if(value.object.author.is_staff){var authorName=value.object.author.displayName}else{var authorName="@"+value.service_data.user.screen_name}newActivity+="<div id='tweet_"+value.service_data.id+"' class='dispatch_activity'><div id='left_column'><div class='dispatch_time'>"+publishTime+"</div><img width='38' src='"+value.object.author.image.url+"' alt='"+authorName+" on Twitter' class='dispatch_avatar' /><div class='dispatch_person'><a title='View "+authorName+" on Twitter' href='"+value.object.author.url+"'>"+authorName+"</a></div></div><div id='right_column'><div class='dispatch_content'>"+dispatchImg+"<p>"+value.object.content+"</p></div></div></div>"
}});$("#dispatchCount").remove();$(".dispatch_activity:first").before(newActivity)},dispatchDisplay:function(topTweetId,data){var newActivity="";$.each(data.items,function(key,value){if(value.service_data.id>topTweetId){var publishTime=jSING.utils.stringTime(value.object.published,"time");if(value.object.embeds.length){var dispatchImg="<div class='dispatch_attachment'><img src='"+value.object.embeds[0].url+"' /></div>"}else{var dispatchImg=""}if(value.object.author.is_staff){var authorName=value.object.author.displayName}else{var authorName="@"+value.service_data.user.screen_name}newActivity+="<div id='tweet_"+value.service_data.id+"' class='dispatch_activity'><div class='dispatch_time'>"+publishTime+"</div><div class='dispatch_content'>"+dispatchImg+"<p>"+value.object.content+"</p><div class='dispatch_person'>Posted by <a href='"+value.object.author.url+"' title='View "+authorName+" on Twitter'>"+authorName+"</a></div></div></div>"
}});$("#dispatchCount").remove();$(".dispatch_activity:first").before(newActivity)},init:function(jSonUrl){var self=this;var dispatchDisplayLink;self.dispatchCheck(jSonUrl)}},init:function(pageType){var self=this;self.navigation.init();self.cellar.init();self.popmenus.init();self.carousels.init()}};jSingNews.init();