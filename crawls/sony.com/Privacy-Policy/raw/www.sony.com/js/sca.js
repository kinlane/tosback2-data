//fix iOS scaling bug
//http://filamentgroup.com/examples/iosScaleBug/
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
		document.body.addEventListener('gesturestart', function() {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}

// Hide URL Bar for iOS
// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
/mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
	window.scrollTo(0, 1);
}, 1000);

var controler = (function(){
	var $body,
		$nav
	
	/****** public methods ******/
	return{
		size:'l',
		windowWidth: $(window).width(),
		init:function(){
			
			$body = $('body');
			
			$(window).resize(function(){
				resizeWindow();
			});
			
			resizeWindow();
			
			setSearch()
			supplimentHTML();
			nav.init();
		}
		
	}
	/****** private methods ******/
	function resizeWindow(){
		controler.windowWidth = $(window).width();
		
		// If width width is below 600px, switch to the mobile stylesheet
		if(controler.windowWidth < 740){
			controler.size = 's';
			$body.addClass('s').removeClass('m').removeClass('l');
		}else if(controler.windowWidth >= 740 && controler.windowWidth < 960){
			controler.size = 'm';
			$body.addClass('m').addClass('l').removeClass('s');
		}else if(controler.windowWidth >= 960){
			controler.size = 'l';
			$body.addClass('l').removeClass('m').removeClass('s');
		}
	}
	function supplimentHTML(){
		
		$('#footer').appendTo('body > .container');
		footer.init();	
		
	}

	function setSearch(){		
		$search = $('#search-input');
		
		$search.addClass('empty').attr('value', 'Search');
		
		$search.focus(function(){
			if($search.attr('value') == "Search"){
				$search.removeClass('empty').attr('value', '');
			}
		});
		$search.blur(function(){
			if($search.attr('value') == ""){
				$search.addClass('empty').attr('value', 'Search');
			}
		});
	};
	
})();

var footer = (function(){
	var $footerWrapper,
		$corpBtn,
		$corpInfo;
	
	/****** public methods ******/
	return{
		init:function(){
			$footerWrapper = $('#footer');
			
			buildFooter();
		}
	}
	/****** private methods ******/
	
	function buildFooter(){
		$corpInfo = $footerWrapper.find('.corporate-info');
		$corpBtn = $footerWrapper.find('.corp-btn').find('a');
		
		$corpInfo.hover(
			function(){
				if($corpInfo.hasClass('clicked') == false){
					$corpInfo.addClass('hover');
				}
			}, 
			function(){
				if($corpInfo.hasClass('clicked') == false){
					$corpInfo.removeClass('hover');
				}
			}
		);
		
		
		
		$corpBtn.click(function(){
			if($corpInfo.hasClass('clicked')){
				$corpInfo.removeClass('clicked').removeClass('hover');
			}else{
				$corpInfo.addClass('clicked');
			}
			
			return false;
		});
		
	}

	
})();

var nav = (function(){
	var $menuBtn,
		$nav,
		$navContent,
		$navList,
		$navListItems,
		$allNavListItems,
		$allNavLinks,
		$firstDropdownLists,
		$dropdownList,
		$subNavs,
		$dropdownListitems,
		$dropdownLinks,
		navTracker = 0,
		navHeight;
	
	/****** public methods ******/
	return{
		init:function(obj){
			$nav = $('#nav');
			
			$nav.wrapInner('<div class="content"></div>');
			
			$nav.before('<p class="closed" id="menu-btn"><a href="#">Menu</a></p>');
			$menuBtn = $('#menu-btn a');
			
			$menuBtn.click(function() {
				var $this = $(this);
				
				if($this.parent().hasClass("closed")){
					animateMenu("show");
				}else{
					animateMenu("hide");
				}
				return false;
			});
			
			buildNav();
		}
	}
	/****** private methods ******/
	function buildNav(){
		
		$('#nav').find('.sub').each(function(){
			$(this).children('ul').prepend('<li class="title"><a href="#"><span>'+$(this).children('a').children('span').text()+'</span></a></li>');
		});
		
		
		$navContent = $nav.children('.content'),
		$navList = $navContent.children('ul');
		$navListItems = $navList.children('li');
		$allNavListItems = $navList.find('li');
		$allNavLinks = $navListItems.find('a');
		$firstDropdownLists = $navListItems.children('li');
		$dropdownList = $navListItems.find('ul');
		$dropdownListItems = $navListItems.find('li');
		$dropdownLinks = $dropdownList.find('a');
		navHeight = $navList.height();
		
		
		
		

		$navList.addClass('current');
		
		//add active class to links when clicked
		$allNavLinks.click(function(){
			var $this = $(this),
				$parent = $this.parent();
				
			//if ther is a sub menu
			if($parent.hasClass('sub')){
				//if it is small view
				if(controler.size == 's'){
					//label next level and make it visible
					//$this.next("ul").addClass("next-nav").css("display", "block");
					slideNav('forward');
					$parent.addClass('current');
				//if it is not small view
				}else{
					if($parent.hasClass('top') && $parent.hasClass('hover')){
						deActivateDropdowns();
					}else{
						activateDropdown($this);
					}
				}
				return false;
				
			}else if($parent.hasClass('title') == true){
				$this.html('title');
				slideNav("back");
				$parent.parent().parent().addClass('previous');
				return false;
			}
				
			
		});
		
		$allNavListItems.hover(
			function(){
				if(controler.size != 's'){
					$(this).addClass('hover');
					//adjustDropdown($(this).children('ul'));
				}
			},
			function(){
				if(controler.size != 's'){
					$(this).removeClass('hover');
					//adjustDropdown($(this).children('ul'));
				}
		});
		
		$(window).resize(function(){
			resize();
		});
		
		if(controler.size == 's'){
			resize();
		}
		
	};
	
	function resize(){
		if(controler.size == 's'){
			var newWidth;
			if(controler.windowWidth > 480){
				newWidth = 480;
			}else{
				newWidth = controler.windowWidth;
			}
			$navList.width(newWidth);
			$dropdownList.width(newWidth).css('left', newWidth);
			if($menuBtn.parent().hasClass('open')){
				$navContent.css('left', -(navTracker*newWidth));
			}
			$navContent.addClass('mobile');
		}else{
			if($navContent.hasClass('mobile')){
				//close the mobile menu if it is showing
				$menuBtn.parent().removeClass('open').addClass('closed');
				$navContent.find('.current').removeClass('current');
				$navContent.attr('style','').removeAttr('style');
				$navList.attr('style','').removeAttr('style');
				$dropdownList.attr('style','').removeAttr('style');
			}
			
		}
	};
	
	function animateMenu(showOrHide){
		if(showOrHide == 'show'){
			$menuBtn.parent().removeClass('closed').addClass('open');
			
			$navContent.css({'left': 0});
			
		}else if(showOrHide == 'hide'){
			$menuBtn.parent().removeClass('open').addClass('closed');
			$navContent.css({'left': 480});
			navTracker = 0;
		}
	};
	
	function slideNav(direction){
		var contentWidth,
			navMargin = $navContent.css('left');
		
		navMargin = parseInt(navMargin.replace('px',''));
		
		if(controler.windowWidth > 480){
			contentWidth = 480;
		}else{
			contentWidth = controler.windowWidth;
		}
		 
		if(direction == 'forward'){			
			navTracker++;
			
			$navContent.stop().animate({
				'left': navMargin - contentWidth
			}, 300, function(){
				
			});
		}else if(direction == 'back'){
			navTracker--;
			$navContent.stop().animate({
				'left': navMargin + contentWidth
			}, 300, function(){
				$navContent.find('.previous').removeClass('previous').removeClass('current');
			});
		}
	};
	
	function activateDropdown(link){
		var $link = $(link),
			$parent = $link.parent(),
			$siblings = $parent.siblings(),
			$activeChildren;
		
		//if the clicked link is active
		if($parent.hasClass('hover')){
			//make it not active
			$parent.removeClass('hover');
			//make children not active
			$activeChildren = $parent.find('.hover');
			$activeChildren.removeClass('hover');
			
		//if the clicked link is not active
		}else{
			//make it active
			$parent.addClass('hover');
			//remove active states from siblings 
			$siblings.each(function(){
				var $this = $(this);
				if($this.hasClass('hover')){
					$activeChildren = $this.find('.hover');
					$this.removeClass('hover');
					$activeChildren.removeClass('hover');
				}
			});
			
			//adjustDropdown($parent.children('ul'));
			
		}
	};
	function deActivateDropdowns(){
		var $active = $navList.find('.hover');
		
		$active.removeClass('hover');
		$firstDropdownLists.css('left', -9999);
	};
	
	function adjustDropdown(list){
		var $list = $(list),
			$activeTab = $navList.children('.hover'),
			$otherLists = $navList.children('li:not(.hover)').children('ul'),
			$activeDropdown = $activeTab.children('ul'),
			offset = $list.offset().left + 235,
			windowWidth = $(window).width(),
			currentLeft = parseInt($activeDropdown.css('left').replace('px',''));
		
		$otherLists.css('left', -9999);
		/*
		if(offset > windowWidth){
			$activeDropdown.css('left', currentLeft-(offset - windowWidth));
		}else{
			$activeDropdown.css('left', 'auto');
		}*/
		
	};

})();

$(document).ready(function(){
	controler.init();
});