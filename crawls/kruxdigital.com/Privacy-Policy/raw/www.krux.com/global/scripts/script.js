/* 
  Sign up form

	AutoclearField and SignUp track the state of each field by 
	setting its class to edited, error, or no class.  No class
	indicates the default state when nothing is entered.  The 
	color of the text field in each state is determined by the CSS. 
*/

var AutoclearField2 = {
	setup: function(field, defaultText) {
		var field = $(field);
		field.value = defaultText;
		field.defaultText = defaultText;  
		field.observe('focus', AutoclearField2.onFocus);
		field.observe('blur', AutoclearField2.onBlur);
	},
	
	onFocus: function(event) {
		var field = event.element();
		if (field.className != 'edited') {
			field.className = 'edited';
			field.clear(); 
		}
	}, 
	
	onBlur: function(event) {
		var field = event.element();
		if (!field.present()) {
			field.className = ''; 
			field.value = field.defaultText; 
		}	
	}
};

var whitepaper = {
	setup: function() {
        $('whitepaper').observe('submit', this.onSubmit);
		AutoclearField2.setup('first_name', 'First Name');
		AutoclearField2.setup('last_name', 'Last Name');
		AutoclearField2.setup('company', 'Company');
		AutoclearField2.setup('email', 'Email');
		AutoclearField2.setup('phone', 'Phone');
	}, 
	
	onSubmit: function(event) {
        if (!whitepaper.validate()) {
            event.stop(); 
        }
	}, 
	
	validate: function() {		
		if (whitepaper.isEmpty('first_name')) {
			window.alert("Please enter your first name");
			return false; 
		} 
		
		if (whitepaper.isEmpty('last_name')) {
			window.alert("Please enter your last name");
			return false; 
		}
		
		if (whitepaper.isEmpty('company')) {
			window.alert("Please enter company");
			return false; 
		}
		
		if (whitepaper.isEmpty('email')) {
			window.alert("Please enter your email");
			return false; 
		} else if (whitepaper.isInvalidEmail('email')) {
			window.alert("Please enter a valid email");
			return false; 
		}
		
		return true; 	
	}, 
	
	isEmpty: function(field) {
		field = $(field);
		return field.className != 'edited' || !field.present(); 
	}, 
	
	isInvalidEmail: function(field) {
		field = $(field);
		var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return !filter.test(field.value);
	}
}

/*  -----------------------------------------------------------  */

var AutoclearField = {
	setup: function(field, defaultText) {
		field.value = defaultText;
		field.defaultText = defaultText;  
		field.observe('focus', AutoclearField.onFocus);
		field.observe('blur', AutoclearField.onBlur);
	},
	
	onFocus: function(event) {
		var field = event.element();
		if (!field.edited) {
			field.edited = true; 
			field.clear(); 
		}
	}, 
	
	onBlur: function(event) {
		var field = event.element();
		if (!field.present()) {
			field.edited = false; 
			field.value = field.defaultText; 
		}		
	}
};

var Resources = {
	unlock: function() {
		Cookie.set('resources_unlocked', 'true', 30, '/');
	}, 
	
	isUnlocked: function() {
		return Cookie.get('resources_unlocked') == 'true'; 
	}, 
	
	showUnlockNotice: function() {
		if (Cookie.get('show_unlock_notice')) {
			Cookie.remove('show_unlock_notice', '/');		
			$('notice').show(); 
		}
	}, 

	updateResourceLock: function(level) {
		if ($$('.lock_icon').length == 0 || $$('a.protected').length == 0) return; 
		
		if (Resources.isUnlocked()) {
			$$('.lock_icon').each(function(i) { i.hide(); }); 
			Resources.showUnlockNotice();
		} else {
			$$('a.protected').each(function(a) {
	     	a.href = General.pathPrefix(level)  + "unlock.php";
				a.onclick = Resources.setReturnURL; 				
			});
		}
	}, 
	
	setReturnURL: function() {
		Cookie.set('return_url', window.location, null, '/')
	}
};

var Newsletter = {
  SpamList: [ 'gmail.com', 'yahoo.com', 'hotmail.com' ], 
  
	validate: function(event) {
		var email = $$("#newsletter form")[0].email.value; 
		if (!email || email.match(/^\s*$/)) {
			alert("Please enter your email"); 
			event.stop(); 
		} else if (!Contact.checkemail(email)) {
			alert("Please enter a valid email");
			event.stop(); 
    } else if (Newsletter.isSpam(email)) {
      alert("Sorry, we do not accept sign ups from free email providers. Please use another email address.");
      event.stop();
    }
  }, 
	
  // Returns true if the email address is using a free service provider. 
	isSpam: function(email) {
    return this.SpamList.any(function(domain) { 
      return email.indexOf('@' + domain) != -1; 
    }); 
  }
}; 

var Contact = {	
	init: function() {
		var form = document.getElementById('contact_form');
		form.retURL.value = Cookie.get("return_url");		
	},
	
	/**
	 * Set isToUnlock to true if the contact form is sent to unlock a resource.  By default 
	 * it's set to false, which means the user simply clicked the Contact Us link on top 
	 * of the page. 
	 */
	validateForm: function(isToUnlock) {
		var form = document.getElementById("contact_form");
		
		var first_name = form.first_name.value;
		var last_name = form.last_name.value;
		var title = form.title.value;
		var company = form.company.value;
		var email = form.email.value;

		if (!first_name) {
			window.alert("Please enter your first name");
			return false;
    } else if(!last_name) {
      window.alert("Please enter your last name");
      return false;
		} else if(!company) {
			window.alert("Please enter your company / organization");
			return false;
		} else if(!email) {
			window.alert("Please enter your email address");
			return false;
		} else if (!Contact.checkemail(email))	{
		  window.alert("Please enter a valid email address");
			return false;
		} else {
			Resources.unlock();
			if (isToUnlock) Cookie.set('show_unlock_notice', 'true', null, '/');
		}
	}, 
		
	checkemail: function(str) {
		var testresults=true;
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var emailPat=/^(.+)@(.+)$/; 
		var matchArray=str.match(emailPat); 
		if (matchArray==null) {	testresults=false; }
		if (!filter.test(str)) { testresults=false; }

		return testresults;
	}
};

var Cookie = {
	// expires is in days
	set: function(name, value, expires, path, domain, secure) {
		var today = new Date();
		if (expires) expires = expires * 1000 * 60 * 60 * 24;
		var expiresDate = new Date(today.getTime() + expires);

		document.cookie = name + "=" + encodeURIComponent(value) +
		( expires ? "; expires=" + expiresDate.toGMTString() : "" ) + 
		( path    ? "; path=" + path : "" ) + 
		( domain  ? "; domain=" + domain : "" ) +
		( secure  ? "; secure" : "" );
	}, 
	
	remove: function(name, path, domain) {
		document.cookie = name + "=" +
		( path   ? "; path=" + path : "" ) +
		( domain ? "; domain=" + domain : "" ) +
		"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	},
	
	// Returns value of named cookie.  Returns null if cookie can't be found. 
	get: function(name) {
	    var allcookies = document.cookie;

	    if (allcookies == "") return null;

	    var cookies = allcookies.split('; ');
	    var cookie = null;
	    for(var i = 0; i < cookies.length; i++) {
	        if (cookies[i].substring(0, name.length+1) == (name + "=")) {
	            cookie = cookies[i];
	            break;
	        }
	    }
	
	    if (cookie == null) return null;
		
		return decodeURIComponent(cookie.substring(name.length+1));
	}

}


$(document).ready(function(){
   $("#commentform input#submit").hover(function() {
       $(".success").fadeIn();
   });
});



(function(a){a("a[data-reveal-id]").live("click",function(c){c.preventDefault();var b=a(this).attr("data-reveal-id");a("#"+b).reveal(a(this).data())});a.fn.reveal=function(b){var c={animation:"fadeAndPop",animationSpeed:300,closeOnBackgroundClick:true,dismissModalClass:"close-reveal-modal",open:a.noop,opened:a.noop,close:a.noop,closed:a.noop};b=a.extend({},c,b);return this.each(function(){var m=a(this),g=parseInt(m.css("top"),10),i=m.height()+g,h=false,e=a(".reveal-modal-bg"),d;if(e.length===0){e=a('<div class="reveal-modal-bg" />').insertAfter(m);e.fadeTo("fast",0.8)}function j(){h=false}function n(){h=true}function k(){if(!h){n();if(b.animation==="fadeAndPop"){m.css({top:a(document).scrollTop()-i,opacity:0,visibility:"visible"});e.fadeIn(b.animationSpeed/2);m.delay(b.animationSpeed/2).animate({top:a(document).scrollTop()+g+"px",opacity:1},b.animationSpeed,function(){m.trigger("reveal:opened")})}if(b.animation==="fade"){m.css({opacity:0,visibility:"visible",top:a(document).scrollTop()+g});e.fadeIn(b.animationSpeed/2);m.delay(b.animationSpeed/2).animate({opacity:1},b.animationSpeed,function(){m.trigger("reveal:opened")})}if(b.animation==="none"){m.css({visibility:"visible",top:a(document).scrollTop()+g});e.css({display:"block"});m.trigger("reveal:opened")}}}m.bind("reveal:open.reveal",k);function f(){if(!h){n();if(b.animation==="fadeAndPop"){m.animate({top:a(document).scrollTop()-i+"px",opacity:0},b.animationSpeed/2,function(){m.css({top:g,opacity:1,visibility:"hidden"})});e.delay(b.animationSpeed).fadeOut(b.animationSpeed,function(){m.trigger("reveal:closed")})}if(b.animation==="fade"){m.animate({opacity:0},b.animationSpeed,function(){m.css({opacity:1,visibility:"hidden",top:g})});e.delay(b.animationSpeed).fadeOut(b.animationSpeed,function(){m.trigger("reveal:closed")})}if(b.animation==="none"){m.css({visibility:"hidden",top:g});e.css({display:"none"});m.trigger("reveal:closed")}}}function l(){m.unbind(".reveal");e.unbind(".reveal");a("."+b.dismissModalClass).unbind(".reveal");a("body").unbind(".reveal")}m.bind("reveal:close.reveal",f);m.bind("reveal:opened.reveal reveal:closed.reveal",j);m.bind("reveal:closed.reveal",l);m.bind("reveal:open.reveal",b.open);m.bind("reveal:opened.reveal",b.opened);m.bind("reveal:close.reveal",b.close);m.bind("reveal:closed.reveal",b.closed);m.trigger("reveal:open");d=a("."+b.dismissModalClass).bind("click.reveal",function(){m.trigger("reveal:close")});if(b.closeOnBackgroundClick){e.css({cursor:"pointer"});e.bind("click.reveal",function(){m.trigger("reveal:close")})}a("body").bind("keyup.reveal",function(o){if(o.which===27){m.trigger("reveal:close")}})})}}(jQuery));(function(b){b.fn.findFirstImage=function(){return this.first().find("img").andSelf().filter("img").first()};var a={defaults:{animation:"horizontal-push",animationSpeed:600,timer:true,advanceSpeed:4000,pauseOnHover:false,startClockOnMouseOut:false,startClockOnMouseOutAfter:1000,directionalNav:true,directionalNavRightText:"Right",directionalNavLeftText:"Left",captions:true,captionAnimation:"fade",captionAnimationSpeed:600,bullets:false,bulletThumbs:false,bulletThumbLocation:"",afterSlideChange:b.noop,fluid:true,centerBullets:true},activeSlide:0,numberSlides:0,orbitWidth:null,orbitHeight:null,locked:null,timerRunning:null,degrees:0,wrapperHTML:'<div class="orbit-wrapper" />',timerHTML:'<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>',captionHTML:'<div class="orbit-caption"></div>',directionalNavHTML:'<div class="slider-nav"><span class="right"></span><span class="left"></span></div>',bulletHTML:'<ul class="orbit-bullets"></ul>',init:function(f,e){var c,g=0,d=this;this.clickTimer=b.proxy(this.clickTimer,this);this.addBullet=b.proxy(this.addBullet,this);this.resetAndUnlock=b.proxy(this.resetAndUnlock,this);this.stopClock=b.proxy(this.stopClock,this);this.startTimerAfterMouseLeave=b.proxy(this.startTimerAfterMouseLeave,this);this.clearClockMouseLeaveTimer=b.proxy(this.clearClockMouseLeaveTimer,this);this.rotateTimer=b.proxy(this.rotateTimer,this);this.options=b.extend({},this.defaults,e);if(this.options.timer==="false"){this.options.timer=false}if(this.options.captions==="false"){this.options.captions=false}if(this.options.directionalNav==="false"){this.options.directionalNav=false}this.$element=b(f);this.$wrapper=this.$element.wrap(this.wrapperHTML).parent();this.$slides=this.$element.children("img, a, div");this.$element.bind("orbit.next",function(){d.shift("next")});this.$element.bind("orbit.prev",function(){d.shift("prev")});this.$element.bind("orbit.goto",function(i,h){d.shift(h)});this.$element.bind("orbit.start",function(i,h){d.startClock()});this.$element.bind("orbit.stop",function(i,h){d.stopClock()});c=this.$slides.filter("img");if(c.length===0){this.loaded()}else{c.bind("imageready",function(){g+=1;if(g===c.length){d.loaded()}})}},loaded:function(){this.$element.addClass("orbit").css({width:"1px",height:"1px"});this.$slides.addClass("orbit-slide");this.setDimentionsFromLargestSlide();this.updateOptionsIfOnlyOneSlide();this.setupFirstSlide();if(this.options.timer){this.setupTimer();this.startClock()}if(this.options.captions){this.setupCaptions()}if(this.options.directionalNav){this.setupDirectionalNav()}if(this.options.bullets){this.setupBulletNav();this.setActiveBullet()}},currentSlide:function(){return this.$slides.eq(this.activeSlide)},setDimentionsFromLargestSlide:function(){var d=this,c;d.$element.add(d.$wrapper).width(this.$slides.first().width());d.$element.add(d.$wrapper).height(this.$slides.first().height());d.orbitWidth=this.$slides.first().width();d.orbitHeight=this.$slides.first().height();c=this.$slides.first().findFirstImage().clone();this.$slides.each(function(){var e=b(this),g=e.width(),f=e.height();if(g>d.$element.width()){d.$element.add(d.$wrapper).width(g);d.orbitWidth=d.$element.width()}if(f>d.$element.height()){d.$element.add(d.$wrapper).height(f);d.orbitHeight=d.$element.height();c=b(this).findFirstImage().clone()}d.numberSlides+=1});if(this.options.fluid){if(typeof this.options.fluid==="string"){c=b('<img src="http://placehold.it/'+this.options.fluid+'" />')}d.$element.prepend(c);c.addClass("fluid-placeholder");d.$element.add(d.$wrapper).css({width:"inherit"});d.$element.add(d.$wrapper).css({height:"inherit"});b(window).bind("resize",function(){d.orbitWidth=d.$element.width();d.orbitHeight=d.$element.height()})}},lock:function(){this.locked=true},unlock:function(){this.locked=false},updateOptionsIfOnlyOneSlide:function(){if(this.$slides.length===1){this.options.directionalNav=false;this.options.timer=false;this.options.bullets=false}},setupFirstSlide:function(){var c=this;this.$slides.first().css({"z-index":3}).fadeIn(function(){c.$slides.css({display:"block"})})},startClock:function(){var c=this;if(!this.options.timer){return false}if(this.$timer.is(":hidden")){this.clock=setInterval(function(){c.$element.trigger("orbit.next")},this.options.advanceSpeed)}else{this.timerRunning=true;this.$pause.removeClass("active");this.clock=setInterval(this.rotateTimer,this.options.advanceSpeed/180)}},rotateTimer:function(){var c="rotate("+this.degrees+"deg)";this.degrees+=2;this.$rotator.css({"-webkit-transform":c,"-moz-transform":c,"-o-transform":c});if(this.degrees>180){this.$rotator.addClass("move");this.$mask.addClass("move")}if(this.degrees>360){this.$rotator.removeClass("move");this.$mask.removeClass("move");this.degrees=0;this.$element.trigger("orbit.next")}},stopClock:function(){if(!this.options.timer){return false}else{this.timerRunning=false;clearInterval(this.clock);this.$pause.addClass("active")}},setupTimer:function(){this.$timer=b(this.timerHTML);this.$wrapper.append(this.$timer);this.$rotator=this.$timer.find(".rotator");this.$mask=this.$timer.find(".mask");this.$pause=this.$timer.find(".pause");this.$timer.click(this.clickTimer);if(this.options.startClockOnMouseOut){this.$wrapper.mouseleave(this.startTimerAfterMouseLeave);this.$wrapper.mouseenter(this.clearClockMouseLeaveTimer)}if(this.options.pauseOnHover){this.$wrapper.mouseenter(this.stopClock)}},startTimerAfterMouseLeave:function(){var c=this;this.outTimer=setTimeout(function(){if(!c.timerRunning){c.startClock()}},this.options.startClockOnMouseOutAfter)},clearClockMouseLeaveTimer:function(){clearTimeout(this.outTimer)},clickTimer:function(){if(!this.timerRunning){this.startClock()}else{this.stopClock()}},setupCaptions:function(){this.$caption=b(this.captionHTML);this.$wrapper.append(this.$caption);this.setCaption()},setCaption:function(){var d=this.currentSlide().attr("data-caption"),c;if(!this.options.captions){return false}if(d){c=b(d).html();this.$caption.attr("id",d).html(c);switch(this.options.captionAnimation){case"none":this.$caption.show();break;case"fade":this.$caption.fadeIn(this.options.captionAnimationSpeed);break;case"slideOpen":this.$caption.slideDown(this.options.captionAnimationSpeed);break}}else{switch(this.options.captionAnimation){case"none":this.$caption.hide();break;case"fade":this.$caption.fadeOut(this.options.captionAnimationSpeed);break;case"slideOpen":this.$caption.slideUp(this.options.captionAnimationSpeed);break}}},setupDirectionalNav:function(){var c=this,d=b(this.directionalNavHTML);d.find(".right").html(this.options.directionalNavRightText);d.find(".left").html(this.options.directionalNavLeftText);this.$wrapper.append(d);this.$wrapper.find(".left").click(function(){c.stopClock();c.$element.trigger("orbit.prev")});this.$wrapper.find(".right").click(function(){c.stopClock();c.$element.trigger("orbit.next")})},setupBulletNav:function(){this.$bullets=b(this.bulletHTML);this.$wrapper.append(this.$bullets);this.$slides.each(this.addBullet);this.$element.addClass("with-bullets");if(this.options.centerBullets){this.$bullets.css("margin-left",-this.$bullets.width()/2)}},addBullet:function(g,e){var d=g+1,h=b("<li>"+(d)+"</li>"),c,f=this;if(this.options.bulletThumbs){c=b(e).attr("data-thumb");if(c){h.addClass("has-thumb").css({background:"url("+this.options.bulletThumbLocation+c+") no-repeat"})}}this.$bullets.append(h);h.data("index",g);h.click(function(){f.stopClock();f.$element.trigger("orbit.goto",[h.data("index")])})},setActiveBullet:function(){if(!this.options.bullets){return false}else{this.$bullets.find("li").removeClass("active").eq(this.activeSlide).addClass("active")}},resetAndUnlock:function(){this.$slides.eq(this.prevActiveSlide).css({"z-index":1});this.unlock();this.options.afterSlideChange.call(this,this.$slides.eq(this.prevActiveSlide),this.$slides.eq(this.activeSlide))},shift:function(d){var c=d;this.prevActiveSlide=this.activeSlide;if(this.prevActiveSlide==c){return false}if(this.$slides.length=="1"){return false}if(!this.locked){this.lock();if(d=="next"){this.activeSlide++;if(this.activeSlide==this.numberSlides){this.activeSlide=0}}else{if(d=="prev"){this.activeSlide--;if(this.activeSlide<0){this.activeSlide=this.numberSlides-1}}else{this.activeSlide=d;if(this.prevActiveSlide<this.activeSlide){c="next"}else{if(this.prevActiveSlide>this.activeSlide){c="prev"}}}}this.setActiveBullet();this.$slides.eq(this.prevActiveSlide).css({"z-index":2});if(this.options.animation=="fade"){this.$slides.eq(this.activeSlide).css({opacity:0,"z-index":3}).animate({opacity:1},this.options.animationSpeed,this.resetAndUnlock)}if(this.options.animation=="horizontal-slide"){if(c=="next"){this.$slides.eq(this.activeSlide).css({left:this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({left:-this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock)}}if(this.options.animation=="vertical-slide"){if(c=="prev"){this.$slides.eq(this.activeSlide).css({top:this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock)}if(c=="next"){this.$slides.eq(this.activeSlide).css({top:-this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock)}}if(this.options.animation=="horizontal-push"){if(c=="next"){this.$slides.eq(this.activeSlide).css({left:this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({left:-this.orbitWidth},this.options.animationSpeed)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({left:-this.orbitWidth,"z-index":3}).animate({left:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({left:this.orbitWidth},this.options.animationSpeed)}}if(this.options.animation=="vertical-push"){if(c=="next"){this.$slides.eq(this.activeSlide).css({top:-this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({top:this.orbitHeight},this.options.animationSpeed)}if(c=="prev"){this.$slides.eq(this.activeSlide).css({top:this.orbitHeight,"z-index":3}).animate({top:0},this.options.animationSpeed,this.resetAndUnlock);this.$slides.eq(this.prevActiveSlide).animate({top:-this.orbitHeight},this.options.animationSpeed)}}this.setCaption()}}};b.fn.orbit=function(c){return this.each(function(){var d=b.extend({},a);d.init(this,c)})}})(jQuery);
