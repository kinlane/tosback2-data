
var miEntryPage={renderFunction:function(){var $this=$(this);if($('.dealsLightPagination').length>0){var itemLenth,itemWidth,leftValue,itemVisible;$('.dealsLightPagination').each(function(){var item=$(this).parents('.deals-container').find('.deals-component-wrapper');itemLenth=item.length;itemWidth=item.parents('.deals-container').find('.deals-container-data').outerWidth();leftValue=itemWidth*(-1);itemVisible=1;$(this).parents('.deals-container').find('.deals-light-pagination-active').text(itemVisible);$(this).parents('.deals-container').find('.deals-light-pagination-last').text(itemLenth);$(item).each(function(){$(this).width(itemWidth);$(this).parents('.deals-container').find('.deals-component-list').width(itemWidth*itemLenth);});});$('.deals-light-pagination-button').click(function(){var dealsLightPaginationNextClick=false;var dealsLightPaginationPrevClick=false;if($(this).hasClass("deals-light-pagination-next")){dealsLightPaginationNextClick=true;}
if($(this).hasClass("deals-light-pagination-prev")){dealsLightPaginationPrevClick=true;}
if(dealsLightPaginationNextClick)
{if(leftValue=="0")
{leftValue=itemWidth*(-1);}}
if(dealsLightPaginationPrevClick)
{if(itemVisible=="1")
{leftValue=leftValue-itemWidth;}
else
{leftValue=leftValue+itemWidth;$(this).parents('.deals-container').find('.deals-light-pagination-next').show();}}
$(this).parents('.deals-container').find('.deals-component-list').animate({left:leftValue},200,function(){});if(dealsLightPaginationNextClick)
{itemVisible=itemVisible+1;if(itemLenth!=itemVisible)
{leftValue=leftValue-itemWidth;}
if(itemVisible==itemLenth)
{$(this).parents('.deals-container').find('.deals-light-pagination-next').hide();if(itemVisible==2)
{$(this).parents('.deals-container').find('.deals-light-pagination-prev').show();}}
else
{$(this).parents('.deals-container').find('.deals-light-pagination-prev').show();}}
if(dealsLightPaginationPrevClick)
{itemVisible=itemVisible-1;if(itemVisible=="1")
{$(this).parents('.deals-container').find('.deals-light-pagination-prev').hide();}}
$(this).parents('.deals-container').find('.deals-light-pagination-active').text(itemVisible);return false;});}
if($('#recordsPerPage').length>0){$("#recordsPerPage").change(function(){window.location=this.value;});}
if($('#flash-card-container').length>0){var flashCardAttributes=new Array();$('#flash-card-container').addClass("loaded");if($('#flash-card-container .flash-card').length===4){$('#flash-card-container .flash-card-4').addClass('flash-card-6').removeClass('flash-card-4');}
$('#flash-card-container .flash-card:first-child').addClass('front-card');var i=1;$('#flash-card-container .flash-card').each(function(){if($(this).children('input.fc-text-color').attr('value')){$(this).css('color',$(this).children('input.fc-text-color').attr('value'));}
if($(this).hasClass('fc-layout-4')||$(this).hasClass('fc-layout-5')||$(this).hasClass('fc-layout-6')){$(this).children('.card-content').css({'margin-top':(354-$(this).children('.card-content').height()-$(this).children('h2').height())/2+'px'});}
else if($(this).hasClass('fc-layout-7')||$(this).hasClass('fc-layout-8')||$(this).hasClass('fc-layout-9')){$(this).children('.card-content').css({'margin-top':354-$(this).children('.card-content').height()-$(this).children('h2').height()+'px'});}
if(i===1||i===2||i===4){$(this).data('header-align','card-header-1');$(this).find('h2').addClass('card-header-1');}else if(i===3||i===5){$(this).data('header-align','card-header-2');$(this).find('h2').addClass('card-header-2');}
flashCardAttributes["flash-card-"+i]=new Object();flashCardAttributes["flash-card-"+i].pos={top:$(this).position().top,left:$(this).position().left};flashCardAttributes["flash-card-"+i].grown={top:$(this).position().top-10,left:$(this).position().left-10};flashCardAttributes["flash-card-"+i].zIndex=$(this).css('zIndex');i++;});function eatMe(){if(!$(this).hasClass('front-card')){$(this).dequeue().animate({top:flashCardAttributes[$(this).attr("id")].pos.top-5},200);}}
function drinkMe(){if(!$(this).hasClass('front-card')){$(this).dequeue().animate(flashCardAttributes[$(this).attr("id")].pos,200);}}
function killLink(event){event.preventDefault();}
$('#flash-card-container .flash-card a').click(killLink);$('#flash-card-container .front-card a').unbind('click',killLink);function cardSwapper(event){$('#flash-card-container .flash-card').unbind('mouseenter',eatMe);$('#flash-card-container .flash-card').unbind('mouseleave',drinkMe);$('#flash-card-container .flash-card').dequeue();if(!$(this).hasClass('front-card')){var clickedCard=$(this);var clickedCardAtts=flashCardAttributes[clickedCard.attr('id')];var currentFrontCard=$(this).siblings('.front-card');var currentFrontCardAtts=flashCardAttributes[currentFrontCard.attr('id')];$.blockUI.defaults.message=null;$.blockUI.defaults.overlayCSS.opacity=0;$.blockUI.defaults.overlayCSS.cursor='pointer';if($(clickedCard).position().left>310){$(currentFrontCard).find('div.card-content').css("text-align","right");$(currentFrontCard).find('h2').removeClass().addClass('card-header-2');}
flashCardAttributes[clickedCard.attr('id')]=currentFrontCardAtts;flashCardAttributes[currentFrontCard.attr('id')]=clickedCardAtts;if($(currentFrontCard).hasClass('search-flash-card')){$(currentFrontCard).find('h3.active').each(function(){$(this).data('toggle-state','open');}).click();}
clickedCard.css('zIndex',flashCardAttributes[clickedCard.attr('id')].zIndex).animate(flashCardAttributes[clickedCard.attr('id')].pos,600,function(){if($(clickedCard).hasClass('search-flash-card')){$('.search-card .search-swappable-tabs, #search-saved').unblock();}
$(clickedCard).find('h3.toggle').each(function(){if($(this).data("toggle-state")==="open"){$(this).click();$(this).data("toggle-state")==="";}});});currentFrontCard.css('zIndex',flashCardAttributes[currentFrontCard.attr("id")].zIndex).animate(flashCardAttributes[currentFrontCard.attr('id')].pos,600,function(){if($(currentFrontCard).hasClass('search-flash-card')){$('.search-card .search-swappable-tabs, #search-saved').block();}
$('#flash-card-container .flash-card').mouseenter(eatMe);$('#flash-card-container .flash-card').mouseleave(drinkMe);});$(currentFrontCard).removeClass('front-card');$(clickedCard).addClass('front-card');$(clickedCard).find('div.card-content').css("text-align","left");$(clickedCard).find('h2').removeClass().addClass('card-header-1');$('#flash-card-container .flash-card a').click(killLink);$('#flash-card-container .front-card a').unbind('click',killLink);}else{if($(this).children('.fc-link').length===1){window.location=$(this).children('.fc-link').attr('href');}}}
$('#homepage #layout-body').css('background','none');$('#homepage #layout-body-container').css('background','none');if(document.getElementById("homepage")){$('.flash-card').animate(flashCardAttributes[$('.front-card').attr("id")].pos,0,function(){$('#flash-card-container').css('display','none');$('#flash-card-container').css('left','0');});if(jQuery.support.opacity){$('#flash-card-container:hidden').fadeIn(1500,function(){$('.flash-card').each(function(){$(this).animate(flashCardAttributes[$(this).attr("id")].pos,1700,function(){$('#flash-card-container .flash-card').mouseenter(eatMe);$('#flash-card-container .flash-card').mouseleave(drinkMe);$('#flash-card-container .flash-card').click(cardSwapper);});});});}
else{$('#flash-card-container').css('display','block');$('.flash-card').each(function(){$(this).animate(flashCardAttributes[$(this).attr("id")].pos,1700,function(){$('#flash-card-container .flash-card').mouseenter(eatMe);$('#flash-card-container .flash-card').mouseleave(drinkMe);$('#flash-card-container .flash-card').click(cardSwapper);});});}}
else{$('#flash-card-container').css('left','0');$('#flash-card-container .flash-card').mouseenter(eatMe);$('#flash-card-container .flash-card').mouseleave(drinkMe);$('#flash-card-container .flash-card').click(cardSwapper);}
if(typeof(DD_belatedPNG)!=='undefined'){DD_belatedPNG.fix('.flash-card.search-flash-card');}}
$('#carousel-container-outer #carousel-container').css('left','0');if($('#carousel-container-outer #carousel-container ul li').length>4){$('#carousel-container').jCarouselLite({btnNext:"#carousel-next",btnPrev:"#carousel-prev",circular:true,visible:4,scroll:4});$('#carousel-container-outer #carousel-container').css('left','45px');}
$('#carousel-container-outer #carousel-container .carousel-content').hide();$('#carousel-container-outer #carousel-container li').hover(function(){$(this).find('.carousel-image').stop().animate({height:122,width:74});$(this).find('.carousel-content-container').stop().animate({left:88});if(jQuery.support.opacity){$(this).find('.carousel-content').fadeIn(300);}else{$(this).find('.carousel-content').show();}},function(){$(this).find('.carousel-image').stop().animate({height:61,width:37});$(this).find('.carousel-content-container').stop().animate({left:45});if(jQuery.support.opacity){$(this).find('.carousel-content').fadeOut(100);}else{$(this).find('.carousel-content').hide();}});$('#carousel-prev').hover(function(){$(this).addClass('hover-prev');},function(){$(this).removeClass('hover-prev');});$('#carousel-next').hover(function(){$(this).addClass('hover-next');},function(){$(this).removeClass('hover-next');});if($('#carousel-container-outer-272X100 #carousel-container ul li').length>2){var carouselCircularVal=true;if($('#carousel-container-outer-272X100 #carousel-container ul li').length<4){carouselCircularVal=false;}
$('#carousel-container-outer-272X100 #carousel-container').jCarouselLite({btnNext:"#carousel-next",btnPrev:"#carousel-prev",circular:carouselCircularVal,visible:3,scroll:3});$('#carousel-container-outer-272X100 #carousel-container').css('left','8px');$('#carousel-container-outer-272X100 #carousel-container').css('width','842px');}
$('#carousel-container-outer-272X100 #carousel-container li').hover(function(){$(this).find('.carousel-content-container').stop().animate({top:0},400);},function(){$(this).find('.carousel-content-container').stop().animate({top:100},400);});$('#carousel-container-outer-272X100 #carousel-next').click(function(){loadHpCarouselImages(3)});$('#carousel-container-outer-272X100 #carousel-prev').click(function(){loadHpCarouselImages(6)});function loadHpCarouselImages(numberOfImages){var nextOrPrev=numberOfImages;var carouselSlot4=$('#carousel-container-outer-272X100 .carousel-item-4 img').attr('src');var carouselSlot4iURL=$('.carousel-item-4 input').val();var carouselSlot7=$('#carousel-container-outer-272X100 .carousel-item-7 img').attr('src');var carouselSlot7iURL=$('.carousel-item-7 input').val();$('#carousel-container-outer-272X100 li a img').removeClass('hidden');if(nextOrPrev==6&&carouselSlot7==carouselSlot7iURL&&carouselSlot4!=carouselSlot4iURL){nextOrPrev=3;}else if(nextOrPrev==3&&carouselSlot4==carouselSlot4iURL){nextOrPrev=6;}
if(carouselSlot4!=carouselSlot4iURL||carouselSlot7!=carouselSlot7iURL){for(var x=nextOrPrev+1;x<=(nextOrPrev+3);x++){var iURL=$('.carousel-item-'+x+' input').val();$('#carousel-container-outer-272X100 #carousel-container .carousel-item-'+x+' img').attr('src',iURL);}}}
if($('#billboard > ul > li').length>=3){$('#billboard').miCarousel();}
$(".accordion").accordion({autoHeight:false,header:"h2",icons:{'header':'ui-icon-up','headerSelected':'ui-icon-down'}});$('.accordion-panel').prepend("<span class='panel-top png-fix'>&nbsp;</span>");$('.accordion-panel').append("<span class='panel-bottom png-fix'>&nbsp;</span>");$('.ui-accordion-header').attr('tabindex','0');$('.accordion-panel .layout-5 img, .accordion-panel .layout-6 img').each(function(){var floatedElement=($(this).parent().is('a'))?$(this).parent():$(this);var floatedElementWrapperWidth=$(this).attr('width')+parseInt($(this).css("marginLeft"))+parseInt($(this).css("marginRight"));var panel=$(this).closest('.accordion-panel');var panelContent=panel.find('.panel-content');var panelUnstretchedWidth=panel.prev('.ui-accordion-header').width();var contentWrapperWidth=panelUnstretchedWidth-parseInt(panelContent.css("paddingLeft"))-parseInt(panelContent.css("paddingRight"))-floatedElementWrapperWidth;var floatDirection=$(this).css('float');var floatedElementWrapperStyle="float:"+floatDirection+"; width:"+floatedElementWrapperWidth+"px;"+"margin-"+(floatDirection=='left'?'right':'left')+":-"+(floatedElementWrapperWidth+1)+"px;";var contentWrapperStyle="overflow:hidden; padding-"+floatDirection+":"+floatedElementWrapperWidth+"px;";floatedElement.siblings().wrapAll('<div style="'+contentWrapperStyle+'"></div>');floatedElement.wrap('<div style="'+floatedElementWrapperStyle+'"></div>');});$('.article-content.layout-5 img, .article-content.layout-6 img').each(function(){var floatedElement=($(this).parent().is('a'))?$(this).parent():$(this);if(floatedElement.closest('div').hasClass('article-content')){var floatedElementWrapperWidth=$(this).prop('width')+parseInt($(this).css("marginLeft"))+parseInt($(this).css("marginRight"));var articleContainer=$(this).closest('.article-content');var contentWrapperWidth=articleContainer.width()-parseInt(articleContainer.css("paddingLeft"))-parseInt(articleContainer.css("paddingRight"))-floatedElementWrapperWidth;var floatDirection=$(this).css('float');var floatedElementWrapperStyle="float:"+floatDirection+"; width:"+floatedElementWrapperWidth+"px;"+"margin-"+(floatDirection=='left'?'right':'left')+":-"+(floatedElementWrapperWidth+1)+"px;";var contentWrapperStyle="overflow:hidden; padding-"+floatDirection+":"+floatedElementWrapperWidth+"px;";floatedElement.siblings().wrapAll('<div style="'+contentWrapperStyle+'"></div>');floatedElement.wrap('<div style="'+floatedElementWrapperStyle+'"></div>');}});$('.column .flash-wrapper > object').each(function(){$(this).parent().height($(this).attr('height')+'px');});$('.page-section').each(function(){$(this).children('.column').filter(function(){return $(".accordion",this).length==0;}).height($(this).height());});$('input.column-bg-color').each(function(){if($(this).attr('value')!=''){$(this).parent().css("background-color",$(this).attr('value'));$(this).parent().prev().children('.article-content').css("padding-right","10px");$(this).siblings('.article-content').css("padding-right","10px");}
if($(this).children('.article-content').length==0){$(this).parent().prev().children('.article-content').css("padding-right","10px");}});$('input.column-text-color').each(function(){$(this).parent().css("color",$(this).attr('value'));});$('input.column-invert-links').each(function(){if($(this).attr('value')=='1'){$(this).parent().addClass('link-set-2');}});$('.component-head').click(function(){$(this).next('div').slideToggle();$(this).parent('.closable-panel').toggleClass('closed');});$('.closable-panel').each(function(){$('.article-content.layout-7 img').addClass('closable-panel-img');$('.article-content.layout-3 img').addClass('closable-panel-img');});if(document.getElementById("leftNoWrap-border-2")){$('img#leftNoWrap-border-2').each(function(){var imageHeight=$('div img#leftNoWrap-border-2').height();$(".article-content.layout-5.leftNoWrap-border").animate({height:imageHeight},"fast");});}
if($('div.article-container').hasClass('left-column')){$('.left-column').wrapAll("<div class='placement-left'></div>");}
if($('div.article-container').hasClass('right-column')){$('.right-column').wrapAll("<div class='placement-right'></div>");}
if($('div.article-container').hasClass('leftside-column')){$('.leftside-column').wrapAll("<div class='placement-leftside'></div>");}
if($('div.article-container').hasClass('rightside-column')){$('.rightside-column').wrapAll("<div class='placement-rightside'></div>");}
if($('div.article-container').hasClass('leftmost-column')){$('.leftmost-column').wrapAll("<div class='placement-leftmost'></div>");}
if($('div.article-container').hasClass('middle-column')){$('.middle-column').wrapAll("<div class='placement-middle'></div>");}
if($('div.article-container').hasClass('rightmost-column')){$('.rightmost-column').wrapAll("<div class='placement-rightmost'></div>");}}}
jQuery(document).ready(function($){miEntryPage.renderFunction();});