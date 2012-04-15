(function(cds,win,$){var doc=win.document;$.extend($.support,{touch:"ontouchstart" in doc});$.extend($.support,{fonts:{}});$.fn.bindUl=function(eventType,handler){return $(this).bind(eventType,function(event){var target=event.target,$li=target.nodeName==="li"?$(target):$(target).parents("li");return $li.length&&handler($li,event)})};$.fn.bindTouchStart=function(callback){$(this).bind("touchstart",function(event){callback(event.originalEvent.touches[0]||event.originalEvent.changedTouches[0])})};$.fn.bindTouchMouve=function(callback){$(this).bind("touchmove",function(event){event.preventDefault();callback(event.originalEvent.touches[0]||event.originalEvent.changedTouches[0])})};var ui={popUp:function(pUrl,pName,width,height,screenx,screeny,scrollbar,resize,toolbar,status,menubar,location,directories){var pFeatures="scrollbars="+(scrollbar?"yes":"no")+",resize="+(resize?"yes":"no")+",toolbar="+(toolbar?"yes":"no")+",status="+(status?"yes":"no")+",menubar="+(menubar?"yes":"no")+",location="+(location?"yes":"no")+",directories="+(directories?"yes":"no")+(width?",width="+parseInt(width,10):"")+(height?",height="+parseInt(height,10):"")+(screenx?",screenx="+parseInt(screenx,10):"")+(screeny?",screeny="+parseInt(screeny,10):"");return win.open(pUrl,pName,pFeatures)},showOverlay:function(){var $p=$("#page");return $("<div id='overlayPopin' style=\"background:#808080;position:absolute;top:0;left:0;z-index:1001\">").width($p.width()).height($p.height()).fadeTo(0,.5).prependTo("body")},closeAllPopin:function(){cds.ui.getOverlay().remove();$("#divOverLayerBackground").hide();$("div.popin-wrapper-absolute").remove();$("div.popin-wrapper").remove()},getOverlay:function(){return $("#overlayPopin")},closePopIn:function($div){$div.fadeOut("fast",function(){cds.ui.getOverlay().remove();$div.remove()})},loadPopIn:function(url,callback){var $ov=this.showOverlay(),$div=$('<div class="popin-wrapper-absolute">').prependTo("body").load(url,function(response,status){if(status==="success"){$div.fadeIn("slow");$("input.close, span.close, span.popin-close, span.sf_txtclose, button.close",$div).add(cds.ui.getOverlay()).one("click",function(){cds.ui.closePopIn($div)})}else{$ov.remove();$div&&$div.remove()}callback&&callback($div)}).hide();return $div},loadPopInShipping:function(url,callback){var $ov=this.showOverlay(),$div=$("div.popinMasterContent").prependTo("body").load(url,function(response,status){if(status==="success"){$div.fadeIn("slow");$div.css("z-index",parseInt($("#overlayPopin").css("z-index"))+1);$("input.close, span.close, span.popin-close, span.sf_txtclose, button.close",$div).add(cds.ui.getOverlay()).one("click",function(){cds.ui.closePopIn($div)})}else{$ov.remove();$div.remove()}callback&&callback($div)}).hide();return $div},showPopIn:function(html){var $div;if(html){var $ov=this.showOverlay();$div=$('<div class="popin-wrapper-absolute">').html(html).hide();$(".close, .popin-close:not('.noClose'), .sf_txtclose",$div).one("click",function(){cds.ui.closePopIn($div)})}return $div?$div.prependTo("body").fadeIn("slow"):null}};$.fn.getFormData=function(){for(var form=this[0],els=form.elements,data="",i=0;i<els.length;i++){var el=els[i],name=el.name,val="";if(name&&!el.disabled){switch(el.type){case "checkbox":case "radio":el.checked&&(val=el.value);break;case "submit":el.value==="1"&&(val=el.value);break;case "select-one":var sval=el.options[el.selectedIndex].value;sval!=="-1"&&(val=sval);break;default:val=el.value}val!==""&&(data+=name+"="+val+"&")}}return data};$.fn.hideElement=function(){var $this=$(this),hidePos="-10000px",cssProp={position:$this.css("position"),top:$this.css("top"),left:$this.css("left")};if($this.css("top")!==hidePos){$this.data("cssProp",cssProp);$this.css({position:"absolute",top:hidePos,left:hidePos})}return $this};$.fn.showElement=function(){var $this=$(this);$this.data("cssProp")&&$this.css($this.data("cssProp"));return $this};(function(){var $fontSpan,wdh,hgt,isFontAvailable=function(fName){if(!$fontSpan){$fontSpan=$("<span>").css({visibility:"hidden",position:"absolute",top:"-10000px",left:"-10000px"}).html("abcdefghijklmnopqrstuvwxyz").appendTo(doc.body);wdh=$fontSpan.css("font-family","FAKEFONT").width();hgt=$fontSpan.height()}$.support.fonts[fName]=wdh!==$fontSpan.css("font-family",fName).width()||hgt!==$fontSpan.height();return $.support.fonts[fName]};ui["isFontAvailable"]=isFontAvailable})();$.fn.fixZIndex=function(){if($.browser.msie==true&&$.browser.version<=8){var zIndexNumber=10;$(this).each(function(){$(this).css("zIndex",zIndexNumber);zIndexNumber-=10})}};$.fn.picHover=function(options){var OVER_CSS_SUFFIX="_over",OVER_IMG_SUFFIX="-over",settings={imgOverSrc:"",overClass:""};options=options||{};$.extend(settings,options);$(this).each(function(){var $this=$(this);if($this.is("input:image, img"))changeImgSrc($this);else changeCss($this)});function changeImgSrc($element){var imgSrc=$element.attr("src"),indexExt=imgSrc.lastIndexOf("."),imgOverSrc=settings.imgOverSrc==""?imgSrc.substring(0,indexExt)+OVER_IMG_SUFFIX+imgSrc.substring(indexExt,imgSrc.length):settings.imgOverSrc;$element.hover(function(){$element.attr("src",imgOverSrc)},function(){$element.attr("src",imgSrc)})}function changeCss($element){var className=$element.attr("class").split(" ")[0],classOverName=settings.overClass==""?className+OVER_CSS_SUFFIX:settings.overClass;$element.hover(function(){$element.addClass(classOverName)},function(){$element.removeClass(classOverName);return false})}};$.fn.htmlPrice=function(price,size,isRebate){var isCharSplitFound=false;price+="";var htmlPrice='<div class="priceContainer">';function getCssUnitPrice(){return "<div>€"}function getHiddenPrice(price){return '<span style="display:none;">'+price+" &euro;</span>"}htmlPrice+='<div class="price price-'+size.toLowerCase();if(typeof isRebate==="boolean")if(isRebate)htmlPrice+=" price-rebate";htmlPrice+='">';for(var i=0;i<price.length;i++)if(price.charAt(i)>="0"&&price.charAt(i)<="9")htmlPrice+=price.charAt(i);else if(!isCharSplitFound){isCharSplitFound=true;htmlPrice+="<div>€"}if(!isCharSplitFound)htmlPrice+=getCssUnitPrice(size);htmlPrice+="</div></div></div>";htmlPrice+=getHiddenPrice(price);return $(this).html(htmlPrice)};$.fn.htmlEconomy=function(economyText,economyAmount,isSolding){var htmlEconomy="",containerClassSuffix="";if(isSolding)containerClassSuffix="  splashEconomySales";function getEconomyTextHtml(economyText){return '<span class="productSplashEconomyText">'+economyText+"</span>"}function getEconomyAmountHtml(economyAmount){return '<span class="productSplashEconomyAmount">'+economyAmount+"</span>"}htmlEconomy='<span class="splashEconomyContainer'+containerClassSuffix+'">';if(economyAmount=="")htmlEconomy+=getEconomyAmountHtml(economyText);else if(isSolding){htmlEconomy+=getEconomyTextHtml(economyText);htmlEconomy+=getEconomyAmountHtml(economyAmount)}else{htmlEconomy+=getEconomyAmountHtml(economyAmount);htmlEconomy+=getEconomyTextHtml(economyText)}htmlEconomy+='</span><span class="vspace"></span>';return $(this).html(htmlEconomy)};$.fn.updateSaving=function(economyText,economyAmount,isSolding,isFromPrice){var headerTextFromPrice="Jusqu'€",headerTextSales="Soldes";function getHeaderTextHtml(){if(!isFromPrice&&!isSolding)return "";var headerText="";if(isSolding){headerText=headerTextSales;if(isFromPrice)headerText+="<br/>"+headerTextFromPrice.toLowerCase()}else if(isFromPrice)headerText=headerTextFromPrice;return '<div class="eHeader">'+headerText+"</div>"}function getAmountTextHtml(economyAmount){return '<div class="eDecot">'+economyAmount+"</div>"}function getFooterTextHtml(economyText){if(isSolding||(!economyText||0===economyText.length))return "";return '<div class="eFooter">'+economyText+"</div>"}var $this=$(this);if(!economyText&&!economyAmount)$this.hide();else $this.show();var newClass="";if(isFromPrice)if(isSolding)newClass="eVarSales";else newClass="eVar";else if(isSolding)newClass="eSales";$this.removeClass("eVar eVarSales eSales");$this.addClass(newClass);var htmlEconomy=getHeaderTextHtml()+getAmountTextHtml(economyAmount)+getFooterTextHtml(economyText);return $this.html(htmlEconomy)};$.fn.slideToAnchor=function(options){var $this=$(this),default_options={speed:"slow",anchorLink:$this.attr("href")};options=options||{};$.extend(default_options,options);var $scrollTop=$this.attr("href")=="#"?0:$(default_options.anchorLink).offset()?$(default_options.anchorLink).offset().top:0;function addSlideEffect(){$("html,body").animate({scrollTop:$scrollTop},default_options.speed,"swing");return false}$this.click(function(){return addSlideEffect()})};$.fn.carousel=function(options){var _$carousel=this,_$pagerUl=$([]),_cWidth=_$carousel.css("width"),_cHeight=_$carousel.css("height"),_cLength=0,_cCurrentIndex=0,_cTimer=null,_isAnimated=false,_c={next:function(){return nextSlide()&&stopTimer()},previous:function(){return previousSlide()&&stopTimer()},scroll:function(index){return scrollSlide(index)&&stopTimer()},getCurrentIndex:function(){return _cCurrentIndex},setTimer:function(delai){setTimer(delai)},stop:function(){stopTimer()}},settings={orientation:"horizontal",speed:300,cssStartEffect:{},cssEndEffect:{},touch:true,timer:5e3,timerFunction:null,callback:null,pagerUl:null,classPager:"carouselPageSelected"};settings=$.extend({},settings,options);settings.touch=settings.touch&&$.support.touch;settings.speed=typeof settings.speed==="string"?$.fx.speeds[settings.speed]:settings.speed;if(settings.pagerUl)_$pagerUl=settings.pagerUl;var loadImgs=function($imgsToLoad,animationFunction){var count=$imgsToLoad.length;if(!count)animationFunction();else $imgsToLoad.each(function(){$img=$(this);$img.load(function(){!--count&&animationFunction()}).attr("src",$img.attr("data-src")).removeAttr("data-src")})};swfobjectLoad=0;var loadSwfs=function($swfsToLoad,animationFunction){!swfobjectLoad&&cds.loadScript({src:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"});swfobjectLoad=1;var count=$swfsToLoad.length;if(!count)animationFunction();else{var flashvars={JsNextStep:"nextStep"},params={menu:"true",wmode:"transparent",allowscriptaccess:"always"};$swfsToLoad.each(function(){$swf=$(this);$.extend(params,{quality:$swf.attr("data-quality"),loop:$swf.attr("data-loop"),play:$swf.attr("data-play"),scale:$swf.attr("data-scale")});attributes={name:$swf.attr("data-name")};swfobject.embedSWF($swf.attr("data-src"),$swf.attr("id"),$swf.attr("data-width"),$swf.attr("data-height"),"9",$swf.attr("data-expinstall"),flashvars,params,attributes);count--;animationFunction()})}},preLoadImgs=function(){_$carousel.find(">ul li:eq(1) img[data-src], >ul li:last img[data-src]").each(function(){$img=$(this);$img.attr("src",$img.attr("data-src")).removeAttr("data-src")})},animateCallback=function($e0){if(!$e0.index()){_isAnimated=false;_cCurrentIndex=$e0.data("index");settings.callback&&settings.callback(_cCurrentIndex);_$pagerUl.find("li").removeClass(settings.classPager).filter(":eq("+_cCurrentIndex+")").addClass(settings.classPager);!$.isEmptyObject(settings.cssEndEffect)&&$e0.css(settings.cssEndEffect);preLoadImgs()}},previousSlide=function(){var $items=_$carousel.find(">ul li");if(!_isAnimated){_isAnimated=true;loadImgs($items.last().find("img[data-src]"),function(){if(settings.orientation==="horizontal"){$items.css("left","-"+_cWidth).filter(":first").before($items.filter(":last"));$items.animate($.extend(settings.cssStartEffect,{left:"+="+_cWidth}),settings.speed,function(){animateCallback($(this))})}else{$items.css("top","-"+_cHeight).filter(":first").before($items.filter(":last"));$items.animate($.extend(settings.cssStartEffect,{top:"+="+_cHeight}),settings.speed,function(){animateCallback($(this))})}return true});return false}},nextSlide=function(){var $items=_$carousel.find(">ul li");$items.eq(1).find("img[data-src]");if(!_isAnimated){_isAnimated=true;loadImgs($items.eq(1).find("img[data-src]"),function(){if(settings.orientation==="horizontal")$items.animate($.extend(settings.cssStartEffect,{left:"-="+_cWidth}),settings.speed,function(){$items.css({left:"0px"}).filter(":last").after($items.filter(":first"));animateCallback($(this))});else $items.animate($.extend(settings.cssStartEffect,{top:"-="+_cHeight}),settings.speed,function(){$items.css({top:"0px"}).filter(":last").after($items.filter(":first"));animateCallback($(this))});return true});loadSwfs($items.eq(1).find("div[name=swfObject]"),function(){});return false}},scrollSlide=function(index){var $items=_$carousel.find(">ul li");if(!_isAnimated&&index<_cLength&&index!==_cCurrentIndex){_isAnimated=true;var $item=_$carousel.find(">ul li").filter(function(){return $(this).data("index")===index}),gap=index-_cCurrentIndex,elt=function(){if(settings.orientation==="horizontal")if(gap<0){gap=Math.abs(gap);var slideWidth=parseInt(_cWidth,10)*gap+"px";$items.css("left","-"+slideWidth).filter(":gt("+(_cLength-gap-1)+")").insertBefore($items.filter(":first"));$items.animate($.extend(settings.cssStartEffect,{left:"+="+slideWidth}),settings.speed,function(){animateCallback($(this))})}else{var slideWidth=parseInt(_cWidth,10)*gap+"px";$items.animate($.extend(settings.cssStartEffect,{left:"-="+slideWidth}),settings.speed,function(){$items.css({left:"0px"}).filter(":lt("+gap+")").insertAfter($items.filter(":last"));animateCallback($(this))})}else if(gap<0){gap=Math.abs(gap);var slideHeight=parseInt(_cHeight,10)*gap+"px";$items.css("top","-"+slideHeight).filter(":gt("+(_cLength-gap-1)+")").insertBefore($items.filter(":first"));$items.animate($.extend(settings.cssStartEffect,{top:"+="+slideHeight}),settings.speed,function(){animateCallback($(this))})}else{var slideHeight=parseInt(_cHeight,10)*gap+"px";$items.animate($.extend(settings.cssStartEffect,{top:"-="+slideHeight}),settings.speed,function(){$items.css({top:"0px"}).filter(":lt("+gap+")").insertAfter($items.filter(":last"));animateCallback($(this))})}};if($items.slice(_cCurrentIndex,index+1).find("div[name=swfObject]").length)loadSwfs($items.slice(_cCurrentIndex,index+1).find("div[name=swfObject]"),function(){elt()});else loadImgs($items.slice(_cCurrentIndex,index+1).find("img[data-src]"),function(){elt()});return true}return false},setTimer=function(delai){if(delai){_cTimer&&_c.stop();settings.speed=delai<=settings.speed?delai:settings.speed;var funct=settings.timerFunction?function(){settings.timerFunction();nextSlide()}:nextSlide;_cTimer=win.setInterval(funct,delai)}},stopTimer=function(){if(_cTimer){win.clearInterval(_cTimer);_cTimer=null}return true};(function(){_$carousel.find(">ul li").each(function(idx){$(this).data("index",idx);_cLength++});if(_cLength>1){_$pagerUl.bindUl("click",function($li){_c.scroll($li.index())});if(settings.touch){preLoadImgs();var touchStartPos,touchMove,getPos=function(event){return settings.orientation==="horizontal"?event.pageX:event.pageY};_$carousel.bindTouchStart(function(touch){preLoadImgs();touchStartPos=getPos(touch);touchMove=true});_$carousel.bindTouchMouve(function(touch){if(touchMove){touchStartPos-getPos(touch)>0?nextSlide():previousSlide();touchMove=false;stopTimer()}})}_c.setTimer(settings.timer)}})();return _c};$.fn.loadImg=function(isEffect){var $img=$(this);if($img.is("[data-src]")){isEffect&&$img.css("opacity","0.1");$img.attr("src",$img.attr("data-src")).removeAttr("data-src").load(function(){isEffect&&$img.animate({opacity:"1"},"fast")})}};$.fn.lazyLoad=function(options){var $imgs=this,$win=$(win),settings={thresholdX:0,thresholdY:200,isEffect:false};settings=$.extend({},settings,options);var isInViewport=function($img){var wX=$win.width()+$win.scrollLeft(),wY=$win.height()+$win.scrollTop();return wX+settings.thresholdX>$img.offset().left&&wY+settings.thresholdY>$img.offset().top},updateViewport=function(){$imgs=$imgs.filter("img[data-src]");$imgs.each(function(){var $this=$(this);isInViewport($this)&&$this.loadImg(settings.isEffect)});!$imgs.length&&$win.unbind("scroll",updateViewport)};$win.scroll(updateViewport);updateViewport();return this};$.fn.valueReset=function(){$(this).bind("click",function(){$(this).attr("value","")})};$.fn.delegate=function(options){var options_default={hashPattern:/tar-hash-([a-zA-Z0-9\/=]+)/,validationPattern:/tar-validation-([a-zA-Z0-9\/=]+)/,hover:false,hoverClassName:"hovered",idPattern:/target-id-([^\s$]+)/,linkParameterKey:"partnerId",linkMap:{},onRedirectClick:function(uri){win.location.href=uri},parametersPattern:/delegate-param-([^\s]+)--([^\s]+|$)/g,redirectUri:""};options=$.extend({},options_default,options);if(options.hover===true){var hoverClassName=options.hoverClassName;this.bind("mouseenter",function(){$(this).addClass("hover")}).bind("mouseleave",function(){$(this).removeClass("hover")})}this.live($.support.touch?"touchstart":"click",!options.redirectUri?delegateClick:redirectClick);function validation($this){var validationFunc;true===options.validationPattern.test($this.attr("class"))&&$this.attr("class").replace(options.validationPattern,function(m,validation){validationFunc=new Function($.base64Decode(validation))});return typeof validationFunc==="undefined"||validationFunc()}function delegateClick(){var uri,$this=$(this);if(validation($this)){if(true===options.hashPattern.test($this.attr("class")))$this.attr("class").replace(options.hashPattern,function(m,hash){uri=$.base64Decode(hash)});else $this.attr("class").replace(options.idPattern,function(m,id){uri=$("#"+id).trigger("click").attr("href")});uri&&options.onRedirectClick.call(this,uri)}}function redirectClick(){var $this=$(this),parameters=getStringArguments($this.attr("class"),options.parametersPattern),lm=options.linkMap,uri;if(validation($this)){if(options.linkParameterKey&&(lm[parameters[options.linkParameterKey]]||false))uri=lm[parameters[options.linkParameterKey]];else uri=replaceStringPattern(options.redirectUri,parameters);options.onRedirectClick.call(this,uri)}}function getStringArguments(string,pattern){var params={};string.replace(pattern,function(m,key,value){params[key]=value});return params}function replaceStringPattern(string,replacements){return string.replace(/%([^%]+)%/g,function(m,key){return typeof replacements[key]!=="undefined"?replacements[key]:""})}};(function(){var keyString="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",uTF8Decode=function(input){var string="",i=0,c=c1=c2=0;while(i<input.length){c=input.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if(c>191&&c<224){c2=input.charCodeAt(i+1);string+=String.fromCharCode((c&31)<<6|c2&63);i+=2}else{c2=input.charCodeAt(i+1);c3=input.charCodeAt(i+2);string+=String.fromCharCode((c&15)<<12|(c2&63)<<6|c3&63);i+=3}}return string};$.extend({base64Decode:function(input){var output="",chr1,chr2,chr3,enc1,enc2,enc3,enc4,i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=keyString.indexOf(input.charAt(i++));enc2=keyString.indexOf(input.charAt(i++));enc3=keyString.indexOf(input.charAt(i++));enc4=keyString.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64)output=output+String.fromCharCode(chr2);if(enc4!=64)output=output+String.fromCharCode(chr3)}output=uTF8Decode(output);return output}})})();$.fn.button=function(){var $this=$(this);if(!$this.data("init")){var content=$this.html(),bType=$this.attr("type");table=$("<table>")[0],tr=table.insertRow(-1),td_1=tr.insertCell(-1),td_2=tr.insertCell(-1),td_3=tr.insertCell(-1);$(td_1).addClass("buttonLeft");$(td_2).addClass("buttonContent");$(td_2).append(content);$(td_3).addClass("buttonRight");!bType&&$this.attr("type","button");$this.empty().addClass("button"+bType.capitalize()).append(table).data("init",true)}};$.fn.cdsZoom=function($zoomZone,$cursorZone){var _$aHref=this,_mImg=_$aHref.find("img")[0],_zMainLeft,_zMainTop,_lImg=new Image,_zRatioW=0,_zRatioH=0,_zCurCenterW=$cursorZone.width()/2,_zCurCenterH=$cursorZone.height()/2,_zLimits={left:0,top:0,right:0,bottom:0};_lImg.onload=function(){var t=this;_zRatioW=t.width/_mImg.width;_zRatioH=t.height/_mImg.height;$zoomZone.html(t)};var moveZoomPos=function(e){var x=e.pageX,y=e.pageY;if(x>=_zLimits.right)x=_zLimits.right;else if(x<=_zLimits.left)x=_zLimits.left;if(y>=_zLimits.bottom)y=_zLimits.bottom;else if(y<=_zLimits.top)y=_zLimits.top;zx=(_zCurCenterW-x+_zMainLeft)*_zRatioW;zy=(_zCurCenterH-y+_zMainTop)*_zRatioH;$(_lImg).css({left:zx,top:zy});cx=x-_zCurCenterW-_zMainLeft;cy=y-_zCurCenterH-_zMainTop;$cursorZone.css({left:cx,top:cy})};(function(){$(_lImg).css("position","absolute");var loadLImg=function(){var $t=$(this);_zMainLeft=$t.offset().left;_zMainTop=$t.offset().top;_zLimits={left:_zMainLeft+_zCurCenterW,top:_zMainTop+_zCurCenterH,right:_zMainLeft+$t.width()-_zCurCenterW,bottom:_zMainTop+$t.height()-_zCurCenterH};_$aHref.hover(function(){var lImgUrl=_$aHref.attr("href");_lImg.src!==lImgUrl&&(_lImg.src=lImgUrl);$zoomZone.show();$cursorZone.show()},function(){$zoomZone.hide();$cursorZone.hide()}).mousemove(moveZoomPos)};if(_mImg.width>0)loadLImg.call(_mImg);else $(_mImg).one("load",loadLImg)})();return _$aHref};$.fn.marquee=function(){var $that=this,pw=$that.parent().width(),slide=function(){$that.css("left",pw).animate({left:"-="+(pw+$that.width())},15000,"linear",slide)};slide();return $that};$.fn.countDown=function(options){var $this=this,timer=null,settings={fTimer:"Plus que %s",fDay:"%dj ",fHour:"%dh ",fMinute:"%02dmin ",fSecond:"%02ds",timeoutText:"Trop tard",hasSlideEffect:false};settings=$.extend({},settings,options);this.each(function(){var $that=$(this),d=new Date,dTimer=$that.attr("data-timer")||"",dEndDate=$that.attr("data-enddate")||"",remainingTime=0;remainingTime=dEndDate?dEndDate.toNumber()-d.getTime()/1e3+d.getTimezoneOffset()*60:dTimer.toNumber()||0;if(remainingTime<0)remainingTime=0;$that.data("rTime",remainingTime).removeAttr("data-timer").removeAttr("data-enddate")});timer=setInterval(function(){$this.each(function(){var $that=$(this),remainingTime=$that.data("rTime"),str="";if(remainingTime>0){var days=remainingTime--/60/60/24,rDays=Math.floor(days),hours=(days-rDays)*24,rHours=Math.floor(hours),minutes=(hours-rHours)*60,rMinutes=Math.floor(minutes),seconds=(minutes-rMinutes)*60,rSecond=Math.round(seconds);if(rDays>0)str=settings.fDay.sprintf(rDays);if(rHours>0||str)str+=settings.fHour.sprintf(rHours);if(rMinutes>0||str)str+=settings.fMinute.sprintf(rMinutes);if(rSecond>0||str)str+=settings.fSecond.sprintf(rSecond);str=settings.fTimer.sprintf(str)}else if(remainingTime===0){str=settings.timeoutText;$this=$this.filter(function(){return $(this).data("rTime")!=0});$that.stop().css("left","0px").parent().css("text-align","center");!$this.length&&win.clearInterval(timer);remainingTime--}$that.data("rTime",remainingTime).text(str)})},1e3);settings.hasSlideEffect&&$this.each(function(){var $that=$(this),pw=$that.parent().width(),slide=function(){$that.css("left",pw).animate({left:"-="+(pw+$that.width())},15000,"linear",slide)};slide()});return $this};var r2AddToBasket=function(buttonId){var btn=$("#"+buttonId),$form=btn.parents("form"),$productPopIn=$("#productPopIn");btn.val("1");$.ajax({type:"POST",url:"/AddToBasket.html",data:$form.getFormData(),success:function(response){if(response)if(/redirect\|/.test(response))response.replace(/.*redirect\|(.*)/,function($0,$1){d.location.href=$1});else if($productPopIn&&$productPopIn.find(".AddSubmitedResponseArea")&&response.search("AddSubmitedResponseText")!=-1){$productPopIn.find(".AddSubmitedResponseArea").html(response);$productPopIn.find(".AddSubmitedResponseArea").show()}else{cds.ui.closeAllPopin();cds.ui.showPopIn(response)}else $productPopIn&&cds.ui.closeAllPopin($productPopIn)}});btn.val("0");return false};win["r2AddToBasket"]=r2AddToBasket;cds["ui"]=ui})(cds,window,jQuery);