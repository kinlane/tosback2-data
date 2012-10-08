/*
	ColorBox v1.1 - a full featured, light-weight, customizable lightbox based on jQuery 1.3
	(c) 2009 Jack Moore - www.colorpowered.com - jack@colorpowered.com
	Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/

(function($){
var clone, loadedWidth, loadedHeight, interfaceHeight, interfaceWidth, index, related, closeModal, loadingElement, modal, modalWrap, modalOverlay, modalLoadingOverlay, modalContent, loaded, modalClose, btc, bml, bmr, bbc;
function setModalOverlay(){
	$([modalOverlay]).css({"position":"absolute", width:$(window).width(), height:$(window).height(), top:$(window).scrollTop(), left:$(window).scrollLeft()});
}
function keypressEvents(e){
	if(e.keyCode == 37){
		$(document).unbind('keydown', keypressEvents);
		$("a#contentPrevious").click();
	}
	else if(e.keyCode == 39){
		$(document).unbind('keydown', keypressEvents);
		$("a#contentNext").click();
	}
}
closeModal = function(){
	$("embed").css({display:'block'});
	if($("#colorboxInlineTemp").length > 0){
		$(loaded).children().insertAfter("#colorboxInlineTemp");
	}
	$([modalOverlay, modal]).css({cursor:"auto"}).fadeOut("fast", function(){
		$(loaded).remove();
		$(modal).removeData("open");
	});
	if(loadingElement){$(loadingElement).remove();}
	$(document).unbind('keydown', keypressEvents);
	$(window).unbind('resize scroll', setModalOverlay);
};
// Convert % values to pixels
function setSize(size, dimension){
	return (typeof size == 'string') ? (size.match(/%/) ? (dimension/100)*parseInt(size, 10) : parseInt(size, 10)) : size;
}

//Initialize the modal: store common calculations, preload the interface graphics, append the html.
$(function(){
	$("body").append(
		$([
			modalOverlay = $('<div id="modalBackgroundOverlay" />')[0], 
			modal = $('<div id="colorbox" />')[0]
		]).hide()
	);
	$(modal).append(
		$([
			modalWrap = $('<div id="modalWrap" />')[0]
		])
	);
	$(modalWrap).append(
		$([
			$('<div><div id="borderTopLeft"></div><div id="borderTopCenter"></div><div id="borderTopRight"></div></div>')[0],
			bml = $('<div id="borderMiddleLeft" />')[0],
			modalContent = $('<div id="modalContent" />')[0],
			bmr = $('<div id="borderMiddleRight" />')[0],
			$('<div><div id="borderBottomLeft"></div><div id="borderBottomCenter"></div><div id="borderBottomRight"></div></div>')[0]
		])
	);
	$(modalContent).append(
		$([
			loaded = $('<div id="modalLoadedContent"><a id="contentPrevious" href="#"></a><a id="contentNext" href="#"></a><span id="contentCurrent"></span><br id="modalInfoBr"/><span id="contentTitle"></span><div id="preloadPrevious"></div><div id="preloadNext"></div><div id="preloadClose"></div></div>')[0], 
			modalLoadingOverlay = $('<div id="modalLoadingOverlay" />')[0],
			modalClose = $('<a id="modalClose" href="#"></a>')[0]
		])
	);
	$(modalClose).click(function(){
		closeModal();
		return false;
	});
	
	btc = $("#borderTopCenter")[0];
	bbc = $("#borderBottomCenter")[0];
	
	$(document).bind('keydown', function(e){if(e.keyCode == 27){closeModal();}});

	$(modal).css("opacity", 0).show();

	interfaceHeight = $(btc).height()+$(bbc).height()+$(modalContent).outerHeight(true) - $(modalContent).height();//Subtraction needed for IE6
	interfaceWidth = $(bml).width()+$(bmr).width()+$(modalContent).outerWidth(true) - $(modalContent).width();

	loadedHeight = $(loaded).outerHeight(true);
	loadedWidth = $(loaded).outerWidth(true);
	$(loaded).empty();
	$(modal).css({"padding-bottom":interfaceHeight,"padding-right":interfaceWidth}).hide();//the padding removes the need to do size conversions during the animation step.
});

$.fn.colorbox = function(settings, callback) {

	settings = $.extend({}, $.fn.colorbox.settings, settings);

	//sets the position of the modal on screen.  A transition speed of 0 will result in no animation.
	function modalPosition(mWidth, mHeight, speed, loadedCallback){

		var winHeight = document.documentElement.clientHeight;
		var posTop = winHeight/2 - mHeight/2 + $(window).scrollTop();
		var posLeft = document.documentElement.clientWidth/2 - mWidth/2 + $(window).scrollLeft();
		//keeps the box from expanding to an inaccessible area offscreen.
		if(mHeight > winHeight){posTop -=(mHeight - winHeight);}
		if(posTop < 0){posTop = 0;} 
		if(posLeft < 0){posLeft = 0;}

		mWidth = mWidth - interfaceWidth;
		mHeight = mHeight - interfaceHeight;

		function modalDimensions(that){
			modalContent.style.width = btc.style.width = bbc.style.width = that.style.width;
			modalContent.style.height = bml.style.height = bmr.style.height = that.style.height;
		}
		$(modal).animate({height:mHeight, width:mWidth, top:posTop, left:posLeft}, {duration: speed,
			complete: function(){
				if (loadedCallback) {loadedCallback();}
				modalDimensions(this);
				$(document).bind('keydown', keypressEvents);
				if ($.browser.msie && $.browser.version < 7) {setModalOverlay();}
			},
			step: function(){
				modalDimensions(this);		
			}
		});
	}
	var preloads = [];
	function preload(){
		if(settings.preloading !== false && related.length>1){
			var previous, next;
			previous = index > 0 ? related[index-1].href : related[related.length-1].href;
			next = index < related.length-1 ? related[index+1].href : related[0].href;
			return [$("<img />").attr("src", next), $("<img />").attr("src", previous)];
		}
	}
	function centerModal(object, contentInfo){
		var speed = settings.transition=="none" ? 0 : settings.transitionSpeed;
		$(loaded).remove();
		loaded = $(object)[0];

		$(loaded).hide().appendTo('body').css({width:(settings.fixedWidth)?settings.fixedWidth - loadedWidth - interfaceWidth:$(loaded).width()}).css({height:(settings.fixedHeight)?settings.fixedHeight - loadedHeight - interfaceHeight:$(loaded).height()})
		.attr({id:"modalLoadedContent"}).append(contentInfo).prependTo($(modalContent));

		function setPosition(s){
			modalPosition(parseInt(loaded.style.width)+loadedWidth+interfaceWidth, parseInt(loaded.style.height)+loadedHeight+interfaceHeight, s, function(){
				$(loaded).show();
				$(modalLoadingOverlay).hide();
				if (callback) {callback();}
				if (settings.transition == "fade"){$(modal).animate({"opacity":1}, speed);}
			});
		}
		if (settings.transition == "fade") {
			$(modal).animate({"opacity":0}, speed, function(){setPosition(0);});
		} else {
			setPosition(speed);
		}
		var preloads = preload();
	}

	function buildGallery(that){
		var href = settings.href ? settings.href : that.href;
		var contentInfo = "<p id='contentTitle'>"+that.title+"</p>";

		if(related.length>1){
			contentInfo += "<span id='contentCurrent'> " + settings.contentCurrent + "</span>";
			contentInfo = contentInfo.replace(/\{current\}/, index+1).replace(/\{total\}/, related.length);
			contentInfo += "<a id='contentPrevious' href='#'>"+settings.contentPrevious+"</a> ";
			contentInfo += "<a id='contentNext' href='#'>"+settings.contentNext+"</a> ";
		}

		if (settings.inline) {
			loadingElement = $('<div id="colorboxInlineTemp" />').hide().insertBefore($(href)[0]);
			clone = $(href).clone(true);
			centerModal($(href).wrapAll("<div></div>").parent(), contentInfo);
		} else if (settings.iframe) {
			centerModal($("<div><iframe  frameborder=0 src =" + href + "></iframe></div>"), contentInfo);
		} else if (href.match(/.(gif|png|jpg|jpeg|bmp|tif)$/i)){
			loadingElement = $("<img />").load(function(){
				centerModal($("<div style='display: table-cell; vertical-align: middle; position: static;'><img id='modalPhoto' "+((related.length > 1)?"style='cursor:pointer;' class='modalPhoto'":"")+" src='"+href+"' alt='' /></div>"), contentInfo);
			}).attr("src",href);
		}else {
			loadingElement = $('<div></div>').load(href, function(data, textStatus){
				if(textStatus == "success"){
					centerModal($(this), contentInfo);
				} else {
					centerModal($("<p>Request unsuccessful.</p>"));
				}
			});
		}
	}

	function contentNav(){
		$(modalLoadingOverlay).show();
		if($(this).attr("id") == "contentPrevious"){
			index = index > 0 ? index-1 : related.length-1;
		} else {
			index = index < related.length-1 ? index+1 : 0;
		}
		buildGallery(related[index]);
		return false;	
	}

	$(this).bind("click.colorbox", function () {
		if ($(modal).data("open") !== true) {
			$("embed").css({display:'none'})
			$(modal).data("open", true);

			if(settings.fixedWidth){ settings.fixedWidth = setSize(settings.fixedWidth, document.documentElement.clientWidth);}
			if(settings.fixedHeight){ settings.fixedHeight = setSize(settings.fixedHeight, document.documentElement.clientHeight);}
			$(modalClose).html(settings.modalClose);
			$(modalOverlay).css({"opacity": settings.bgOpacity});
			$([modal, modalLoadingOverlay, modalOverlay]).show();
			modalPosition(setSize(settings.initialWidth, document.documentElement.clientWidth), setSize(settings.initialHeight, document.documentElement.clientHeight), 0);
			if (this.rel) {
				related = $("a[rel='" + this.rel + "']");
				index = $(related).index(this);
			}
			else {
				related = $(this);
				index = 0;
			}
			$(modal).css({"opacity":1});
			buildGallery(related[index]);
			$("a#contentPrevious, a#contentNext, .modalPhoto").die().live("click", contentNav);
			$(document).bind('keydown', keypressEvents);
			if ($.browser.msie && $.browser.version < 7) {
				$(window).bind("resize scroll", setModalOverlay);
			}
		}
		if(settings.overlayClose!==false){
			$(modalOverlay).css({"cursor":"pointer"}).click(function(){closeModal();});
		}
		return false;
	});


	if(settings.open!==false && $(modal).data("open")!==true){
		$(this).triggerHandler('click.colorbox');
	}

	return this.each(function() { 
	});
};

/*
	ColorBox Default Settings.
	
	The colorbox() function takes one argument, an object of key/value pairs, that are used to initialize the modal.
	
	Please do not change these settings here, instead overwrite these settings when attaching the colorbox() event to your anchors.
	Example (Global)	: $.fn.colorbox.settings.transition = "fade"; //changes the transition to fade for all colorBox() events proceeding it's declaration.
	Example (Specific)	: $("a[href='http://www.google.com']").colorbox({fixedWidth:"90%", fixedHeight:"450px", iframe:true});
*/
$.fn.colorbox.settings = {
	transition : "elastic", // Transition types: "elastic", "fade", or "none".
	transitionSpeed : 350, // Sets the speed of the fade and elastic transitions, in milliseconds.
	initialWidth : "400", // Set the initial width of the modal, prior to any content being loaded.
	initialHeight : "400", // Set the initial height of the modal, prior to any content being loaded.
	fixedWidth : "false", // Set a fixed width for div#loaded.  Example: "500px"
	fixedHeight : false, // Set a fixed height for div#modalLoadedContent.  Example: "500px"
	inline : false, // Set this to the selector of inline content to be displayed.  Example "#myHiddenDiv" or "body p".
	iframe : false, // If 'true' specifies that content should be displayed in an iFrame.
	href : false, // This can be used as an alternate anchor URL for ColorBox to use, or can be used to assign a URL for non-anchor elments such as images or form buttons.
	bgOpacity : 0.85, // The modalBackgroundOverlay opacity level. Range: 0 to 1.
	preloading : true, // Allows for preloading of 'Next' and 'Previous' content in a shared relation group (same values for the 'rel' attribute), after the current content has finished loading.  Set to 'false' to disable.
	contentCurrent : "Image {current} of {total}", // the format of the contentCurrent information
	contentPrevious : "previous", // the anchor text for the previous link in a shared relation group (same values for 'rel').
	contentNext : "next", // the anchor text for the next link in a shared relation group (same 'rel' attribute').
	modalClose : "close", // the anchor text for the close link.  Esc will also close the modal.
	open : false, //Automatically opens ColorBox. (fires the click.colorbox event without waiting for user input).
	overlayClose : true  //If true, enables closing ColorBox by clicking on the background overlay.
};

})(jQuery);

