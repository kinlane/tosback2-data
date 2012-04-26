var jqN = jQuery.noConflict();
var nbcHideMe = Array();

/* breaks custom implementation on vscet
var addthis_config = {
	ui_offset_top: 0,
	ui_offset_left: 0,
	ui_click: true
}
*/

// Annoying bug from Facebook: They'll call the onConnected/onNotConnected & Login callbacks multiple times
//var hasRunFacebookLoginCheck = false;

// BEGIN NBCU FRAMEWORK CONFIGURATION
nbcu.config.addParam("nbcuEnvironment", "production");
domain = document.domain;

if (domain.substring(0, 6) == "stage.") {
	nbcu.config.addParam("nbcuEnvironment", "stage");
} else if (domain.substring(0, 4) == "dev." || domain.indexOf(".dev.") > 1) {
	nbcu.config.addParam("nbcuEnvironment", "dev");
} else if (domain.substring(0, 3) == "qa.") {
	nbcu.config.addParam("nbcuEnvironment", "qa");
}

nbcu.config.addParam("frameworkUrl", "/assets/nbcu");
nbcu.config.addParam("frameworkApiUrl", "/app/api");
nbcu.config.addParam("snasSiteName", "nbc.com");
nbcu.config.addParam("snasSiteDomainName", "my.nbc.com");
nbcu.config.addParam("siteName", "NBC.com");
nbcu.config.addParam("socialNetworkName", "myNBC");
	
if (nbcu.config.getParam("nbcuEnvironment") == "dev" || nbcu.config.getParam("nbcuEnvironment") == "qa") {
	nbcu.config.addParam("snasRestUrl", "http://snasdev1.nbcuni.com")
	if(nbcu.config.getParam("socialNetworkName")!="Dunder Mifflin Sabre") {
		nbcu.config.addParam("socialNetworkUrl", "http://qa.my.nbc.com");
	} else {
		nbcu.config.addParam("socialNetworkUrl", "http://dms.dev.nbc.nbcuni.com/profiles/?u=");
	}
} else {
	nbcu.config.addParam("snasRestUrl", "http://snas.nbcuni.com");
	if(nbcu.config.getParam("socialNetworkName")!="Dunder Mifflin Sabre") {
		nbcu.config.addParam("socialNetworkUrl", "http://my.nbc.com");
	} else {
		nbcu.config.addParam("socialNetworkUrl", "http://dundermifflin-sabre.com/profiles/?u=");
	}
}

// Set Facebook environment variables for FBC enabled domains
if (document.domain.indexOf('nbc.com') != -1 || document.domain.indexOf('nbc.nbcuni.com') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	if (nbcu.config.getParam("nbcuEnvironment") == "dev" || nbcu.config.getParam("nbcuEnvironment") == "qa") {
		nbcu.config.addParam("facebookAPIKey", "1454d8a755ecb0e83b129a35a656fb9e");
		nbcu.config.addParam("videoRatingFeedStoryId", "79354934916");
		nbcu.config.addParam("videoCommentFeedStoryId", "79355924916");
	} else {
		nbcu.config.addParam("facebookAPIKey", "61b68b0702fb928dc0620a836a6a86b0");
		nbcu.config.addParam("videoRatingFeedStoryId", "112120225818");
		nbcu.config.addParam("videoCommentFeedStoryId", "116612985818");
	}
} else if (document.domain.indexOf('latenightwithjimmyfallon') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "32c8cd620aa43f21ea1d4d0cb0c9db47");
	nbcu.config.addParam("videoRatingFeedStoryId", "148081606626");
	nbcu.config.addParam("videoCommentFeedStoryId", "148081221626");
} else if (document.domain.indexOf('thejaylenoshow') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "9983f0110b096e74126c1be8e50a6437");
	nbcu.config.addParam("videoRatingFeedStoryId", "147397997020");
	nbcu.config.addParam("videoCommentFeedStoryId", "147395842020");
} else if (document.domain.indexOf('tonightshowwithconanobrien') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "9462a31304eaadf60bc079b0de38ae04");
	nbcu.config.addParam("videoRatingFeedStoryId", "157444705488");
	nbcu.config.addParam("videoCommentFeedStoryId", "157443990488");
} else if (document.domain.indexOf('thousandandonewords') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "928446ae9a78c245179a2e2e15386f1a");
	nbcu.config.addParam("videoRatingFeedStoryId", "157444705488");
	nbcu.config.addParam("videoCommentFeedStoryId", "157443990488");
} else if (document.domain.indexOf('theparenthoodproject') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "82dcae153d42447698bc9042869baa3a");
	nbcu.config.addParam("videoRatingFeedStoryId", "157444705488");
	nbcu.config.addParam("videoCommentFeedStoryId", "157443990488");
} else if (document.domain.indexOf('jaylenosgarage') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "d739e6969719dbe3874a6d98ff989fd0");
	nbcu.config.addParam("videoRatingFeedStoryId", "160896101841");
	nbcu.config.addParam("videoCommentFeedStoryId", "160897261841");
} else if (document.domain.indexOf('snakeholelounge') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "6df4b2eb45820c5319691b47055792cf");
} else if (document.domain.indexOf('greendalecommunitycollege') != -1) {
	nbcu.config.addParam("facebookConnectEnabled", "true");
	nbcu.config.addParam("facebookAPIKey", "fae1b4e0a08860494537083aa7419676");
} 
// END FRAMEWORK CONFIGURATION


jqN(function(){
	loadMyNBCLogin();
//	jqN('.nav-trigger').click(toggleNav);
	jqN('.nbc-nav-close').bind('click',clearNav);
	jqN('#A-searchform input').hint();
	jqN(document).pngFix();	
	
//	jqN('input#globalLoginPass, input#globalLoginEmail').hint();
	clearSelect("#globalLoginPass");
	clearSelect("#globalLoginEmail");
//	jqN('#mynbcLoginForm form input').hint();
	
	hoverEffectDirect();
	initFacebook();
	xdSync();
	if(jqN.cookie('loudest_fan_challenge')!=null){
		achievementBanner();
	}
});

function clearSelect (arg){
	for (var i=0; i < arg.length; i++) {
		var strVal;
		jqN(arg).mousedown(function() {
			strVal = jqN(this).val();
			jqN(this).attr('value', '');
		})
	};
}

/*
function getWindowHeight() {
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	} else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		} else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return windowHeight;
}

function setFooter() {
	if (document.getElementById) {
		var windowHeight = getWindowHeight();
		if (windowHeight > 0) {
			var contentHeight = jqN('#nbc_masterWrap').offsetHeight;
			var footerElement = document.getElementById('nbc_mastFoot');
			var footerHeight  = footerElement.offsetHeight;
			if (windowHeight - (contentHeight + footerHeight) >= 0) {
				footerElement.style.top = (windowHeight - (contentHeight + footerHeight)) + 'px';
			} else {
				footerElement.style.top = '0px';
			}
		}
	}
}

function setWrapHeight(){
}

window.onload = function() {
	setFooter();
};

window.onresize = function() {
	setFooter();
};
*/

function navInit(){
	jqN('.nav-trigger').click(toggleNav);
	/* Load the subnav content on click */
	jqN("#nbc-nav-shows").click(function() {
  		jqN("#nbc-nav-shows-content").load("/assets/includes/v14/header-subnav-shows.shtml");
		linktrack('nbc-nav-shows');
	});
	jqN("#nbc-nav-video").click(function() {
  		jqN("#nbc-nav-video-content").load("/assets/includes/v14/header-subnav-video.shtml");
		linktrack('nbc-nav-video');
	});
	jqN("#nbc-nav-news").click(function() {
 	 	jqN("#nbc-nav-news-content").load("/assets/includes/v14/header-subnav-news.shtml");
		linktrack('nbc-nav-news');
	});
	jqN("#nbc-nav-schedule").click(function() {
  		jqN("#nbc-nav-schedule-content").load("/assets/includes/v14/header-subnav-schedule.shtml");
		linktrack('nbc-nav-schedule');
	});
	jqN("#nbc-nav-mobile").click(function() {
  		jqN("#nbc-nav-mobile-content").load("/assets/includes/v14/header-subnav-mobile.shtml");
		linktrack('nbc-nav-mobile');
	});
	jqN("#nbc-nav-community").click(function() {
  		jqN("#nbc-nav-community-content").load("/assets/includes/v14/header-subnav-community.shtml");
		linktrack('nbc-nav-community');
	});
	jqN("#nbc-nav-photos").click(function() {
  		jqN("#nbc-nav-photos-content").load("/assets/includes/v14/header-subnav-photos.shtml");
		linktrack('nbc-nav-photos');
	});
	jqN("#nbc-nav-games").click(function() {
  		jqN("#nbc-nav-games-content").load("/assets/includes/v14/header-subnav-games.shtml");
		linktrack('nbc-nav-games');
	});
	jqN("#nbc-nav-shop").click(function() {
  		jqN("#nbc-nav-shop-content").load("/assets/includes/v14/header-subnav-shop.shtml");
		linktrack('nbc-nav-shop');
	});
	jqN("#nbc-nav-extras").click(function() {
  		jqN("#nbc-nav-extras-content").load("/assets/includes/v14/header-subnav-extras.shtml");
		linktrack('nbc-nav-extras');
	});
}

function toggleNav(){	
	jqN('.nbc-nav-close').bind('click',clearNav);
	if(!jqN(this).hasClass('selected')){
		jqN('.nav-trigger').removeClass('selected');
		var index = jqN('.nav-trigger').index(this);
		jqN(this).addClass('selected');
		jqN('.nbc-subnav').css('display','none');
		jqN('.nbc-subnav').eq(index).css('display','block');
		hideVisible('#companion_Ad', 1);
		hideVisible('#nbcAd300x250', 1);
		hideVisible('#nbc-728',1);
		nbcToggleEl(nbcHideMe, "hide");
		jqN('.opa-spotlight embed').hide();
	}else{
		clearNav();
	}
	return;
}

function clearNav(){
	jqN('.nav-trigger').removeClass('selected');
	jqN('.nbc-subnav').css('display','none');
	hideVisible('#companion_Ad', 0);
	hideVisible('#nbcAd300x250', 0);
	hideVisible('#nbc-728',0);
	nbcToggleEl(nbcHideMe, "show");
	jqN('.opa-spotlight embed').show();
}

function globalNav(){
	jqN('#NBC_videoWatch, #nbc_shows, .global_drop').hide()
	
	jqN('ul#A-mast-nav li').hover(function() {
		jqN(this).children('.global_drop').show();
		jqN(this).addClass('activeNavItem');
		hideVisible('#nbcAd300x250', 1);
			nbcToggleEl(nbcHideMe, "hide");
		jqN('#OPA_Spotlight_holder embed').hide();
	}, function() {
		jqN(this).children('.global_drop').toggle();
		jqN(this).toggleClass('activeNavItem');
		hideVisible('#nbcAd300x250', 0);
			nbcToggleEl(nbcHideMe, "show");
			jqN('#OPA_Spotlight_holder embed').show();
	})
}

function globalNavPressDown(openclose){
	jqN('#NBC_videoWatch, #nbc_shows, .global_drop').hide()
	jqN('#A-nav-shows, #A-nav-video, #A-nav-schedule, #A_nav_news, #A_nav_mobile, #A_nav_comm, #A_nav_photo, #A_nav_games, #A_nav_shop, #A_nav_extras').attr('href', '#');
	jqN('#A-nav-shows, #A-nav-video, #A-nav-schedule, #A_nav_news, #A_nav_mobile, #A_nav_comm, #A_nav_photo, #A_nav_games, #A_nav_shop, #A_nav_extras').click(function() {
		if (jqN(this).siblings('.global_drop').css('display') == "none") 
		{
			globalCloseDropState(1);
			jqN(this).siblings('.global_drop').show();			
			jqN(this).parent().addClass('activeNavItem');
			// hideVisible('#nbcAd300x250', 1);
				nbcToggleEl(nbcHideMe, "hide");
			jqN('#OPA_Spotlight_holder embed').hide();
						
		}else if(jqN(this).siblings('.global_drop').css('display') == "block"){
			globalCloseDropState(1);
			jqN('#OPA_Spotlight_holder embed').show();
		}
	})
	jqN('.clkCloseDROP , .dd_options').click(function() {
		globalCloseDropState(1);
		jqN('#OPA_Spotlight_holder embed').show();
		
	})
}

function globalCloseDropState(trig){
	if (trig ==1) {
		jqN('.global_drop').hide();
		jqN('ul#A-mast-nav li.activeNavItem').toggleClass('activeNavItem');
		nbcToggleEl(nbcHideMe, "show");
	}
/*
	jqN('.global_drop').hide();
	jqN('ul#A-mast-nav li').toggleClass('activeNavItem');
	jqN(this).siblings('.global_drop').toggle();
	jqN(this).parent().toggleClass('activeNavItem');
	hideVisible('#nbcAd300x250', 0);
	nbcToggleEl(nbcHideMe, "show");
	jqN('#OPA_Spotlight_holder embed').show();
*/
}

function nbcDropDown(id){
	jqN(function(){
		jqN(id).superfish({
			pathClass : 'current',
			animation : {height: 'toggle'},
			delay : 0,
			speed : "fast"
		})
	})
}

function nbcMainDrop (id){
	// jqN("ul#A-mast-nav li div.sub-navi").css({top: "20px"})
	jqN(id+"> li").hover(function() {
		jqN(this+" div.sub-navi").css({top: "20px"})
	},
	function() {
		jqN("div.sub-navi").css({top: "-999em"})
	})
}

function hideVisible (hideThis, trig){
	if(trig == 1){
	jqN(hideThis).css('visibility','hidden');
	}else{
		jqN(hideThis).css('visibility','visible');
	}
}

/**
* Make sure we're ready to communicate with Facebook
**/
function initFacebook() {
	try {
		if (nbcu.config.getParam("facebookConnectEnabled") == "true") {
			jqN('body').append('<div id="fb-root"></div>');
//			FB.init(nbcu.config.getParam("facebookAPIKey"), "/xd_receiver.htm", {"ifUserConnected":onFacebookConnected, "ifUserNotConnected":onFacebookNotConnected});
			FB.init({appId: nbcu.config.getParam("facebookAPIKey"), status: true, cookie: true, xfbml: true});
//			jqN('#fb_global_login').html('<a href="#" title="Log in using Facebook" id="fb_logon_btn" onclick="hideUnhideVideo(true);FB.Connect.requireSession(facebookOnLoginReady); return false;">Log in using facebook</a>');
			jqN('#fb_global_login').html(
				jqN('<a />', {'id': 'fb_logon_btn', 'href': 'javascript: void(0);', 'title': 'Log in using Facebook'})
					.html('Log in using facebook')
					.click(function(e) {
						hideUnhideVideo(true);
						FB.login(function(response) {
							if (response.session) {
								facebookOnLoginReady();
							} else {
								// user cancelled login
							}
						});
						return false;
					})
			);
			FB.Event.subscribe('auth.login', function(response) {
				onFacebookConnected();
			});
			FB.Event.subscribe('auth.logout', function(response) {
				onFacebookNotConnected();
			});
			// insure backward compatibility
			FB.Connect = {
				requireSession: function(callbackFn) {
					FB.login(function(response) {
						if (response.session) {
							if (typeof callbackFn == 'function') {
								callbackFn();
							}
						} else {
							// user cancelled login
						}
					});
				}
			};
		}
	} catch(e) {}
}

/**
* Facebook will do a callback to this method if the user is currently logged in to their platform
**/
function onFacebookConnected() {
	FB.getLoginStatus(function(response) {
		if (response.session) {
			// logged in and connected user, someone you know
			// if we think the user isn't logged in
			if (nbcu.sn.session.isLoggedInToExternalPlatform('facebook')) {
				// Forcifully log the user in
				facebookOnLoginReady();
			}
		} else {
			// no user session available, someone you dont know
		}
	});
}

/**
* Called after the user authorizes the site with Facebook Connect
**/
function facebookOnLoginReady() {
	hideUnhideVideo(false);

	FB.getLoginStatus(function(response) {
		if (response.session) {
			// logged in and connected user, someone you know
			if (!nbcu.sn.session.isLoggedInToExternalPlatform('facebook')) {
				return nbcu.api.call("facebookLogin", {}, "sn", "account", "PROXY", "POST", loadMyNBCLogin);
			}
		} else {
			// no user session available, someone you dont know
		}
	});
}


/**
* Facebook will do a callback to this method if the user is currently NOT logged in to their platform
**/
function onFacebookNotConnected() {
	FB.getLoginStatus(function(response) {
		if (response.session) {
			// logged in and connected user, someone you know
			if (nbcu.sn.session.isLoggedInToExternalPlatform('facebook')) {
				//Logging the user out completely
				handleFacebookLogout();
			}
		} else {
			// no user session available, someone you dont know
		}
	});
}

/**
* Called when the user clicks the 'logout' link. This abides to Facebook's TOS to log
* the user out of both NBC.com and Facebook.com
**/
function handleFacebookLogout(redirectUrl) {
	redirectUrl = redirectUrl || document.location.href;
	hideUnhideVideo(true);

	if (nbcu.sn.session.isLoggedInToExternalPlatform("facebook")) {
		nbcu.sn.session.logoutExternalPlatform();

		FB.getLoginStatus(function(response) {
			if (response.session) {
				// logged in and connected user, someone you know
				FB.logout(function(response) {
					// user is now logged out
				});
			} else {
				// no user session available, someone you dont know
			}
		});
	}
	
	window.location = 'http://'+document.domain+'/app/socnet/accounts/logout?redirectUrl=' + redirectUrl;
}

/*
 * Convienence function to refresh the dom whenever a new XFBML tag is placed
 * onto the page
 */
function refreshXFBML() {
	FB.XFBML.parse();
}

/*
 * Show the feed form. This would be typically called in response to the onclick
 * handler of a "Publish" button, or in the onload event after the user submits
 * a form with info that should be published.
 * These paraemters match the available options here: http://developers.facebook.com/docs/reference/api/
 * 
 */
function facebook_stream_publish(message, picture, link, name, caption, description, source) {
	FB.getLoginStatus(function(response) {
		if (response.session) {
			// Handling undefined cases with default values
			var params = {
				message: typeof user_message == 'string' ? jqN.trim(user_message) : '',
				picture: typeof picture == 'string' ? jqN.trim(picture) : '',
				link: typeof link == 'string' ? jqN.trim(link) : '',
				name: typeof name == 'string' ? jqN.trim(name) : '',
				caption: typeof caption == 'string' ? jqN.trim(caption) : '',
				description: typeof description == 'string' ? jqN.trim(description) : '',
				source: typeof source == 'string' ? jqN.trim(source) : ''
			};
		
			FB.api('/me/feed', 'post', params, function(response) {
				if (!response || response.error) {
					return 'error';
				} else {
					return response.id;
				}
			});
		} else {
			// no user session available, someone you dont know
		}
	});
}

/*
 * Show the feed form. This would be typically called in response to the onclick
 * handler of a "Publish" button, or in the onload event after the user submits
 * a form with info that should be published.
 * 
 * DO NOT USE!!!!
 */
 function facebook_publish_feed_story(form_bundle_id, template_data, userMessage, userMessagePrompt, callback) {
/*
	// For some reason Facebook wants an object with a single property 'value'
	// For convience we'll just take a string for now and convert it for you
	var user_message = null;
	if (typeof userMessage != 'undefined' && userMessage != '') {
		user_message = {
			value : userMessage
		};
	}
	
	// Default user message prompt if you don't pass one in
	if (typeof userMessagePrompt == 'undefined' || userMessagePrompt == '') {
		userMessagePrompt = "What's on your mind?";
	}

	FB.ensureInit(function() {
		FB.Connect.showFeedDialog(form_bundle_id, template_data, null, null, null, FB.RequireConnect.promptConnect, callback, userMessagePrompt, user_message);
	});
*/
}

/* Causes bug where fb user re-logged in after logout
var checkUserIntervalId = setInterval('checkUserLoggedIn()', 5000);

function checkUserLoggedIn() {
	if (nbcu.sn.session.isLoggedIn()) {
		try {
			clearInterval(checkUserIntervalId);
			if (jqN('#fb_global_login').length > 0) {
				loadMyNBCLogin();
			}
		}catch(e){}
	}	
}
*/

function loadMyNBCLogin(){
	jqN('#mynbc_login_out').click(function(){
		if(jqN(this).attr('class') != 'logout'){
			jqN('#mynbcLoginForm').fadeIn('fast').show();
//			jqN('#mynbc_login_out').toggle();
			// new OPA requirement doesnt need to hide these elements hideVisible('#A-searchform',1);
//			hideVisible('#nbc_MastLogo',1);
		}
	});
	
	jqN('#globalLoginclose').click(function(){
		jqN('#mynbcLoginForm').hide('slow');
		hideVisible('#A-searchform',0);
		hideVisible('#nbc_MastLogo',0);
//		jqN('#mynbc_login_out').toggle();
	});
	
	var platform = nbcu.sn.session.getExternalPlatform();
	if (nbcu.sn.session.isLoggedInToExternalPlatform(platform) && nbcu.config.getParam("facebookConnectEnabled") == "true") {
		// Need to figure out the platform and output the right XFBML / HTML
		var externalUserId = nbcu.sn.session.getExternalPlatformUserId();
		var username =  nbcu.sn.session.getAccountInfo('userName');
		if (platform == 'facebook' && username == externalUserId) {
			jqN('#fb_global_login').hide();
			jqN('#myNBC_log_status').html('<p>Hello, <span><fb:name uid=\"' + externalUserId + '\"  firstnameonly=\"false\" useyou=\"false\" linked=\"true\"></fb:name></span></p>');
		} else {
			jqN('#fb_global_login').hide();
			jqN('#myNBC_log_status').html('<p><a href=\"http://my.nbc.com/'+username+'\" title=\"'+username+'\">Hello, <span>'+username+'</span></a></p>');	
		}
		jqN('#mynbc_login_out').addClass('logout');
		jqN('#mynbc_login_out').attr('href', '');
		jqN('#mynbc_login_out').click(function () {
			handleFacebookLogout();
			return false;
		});
		refreshXFBML();
	} else if (nbcu.sn.session.isLoggedIn()){
		jqN('#fb_global_login').hide();
		jqN('#myNBC_log_status').html('<p><a href=\"http://my.nbc.com/'+nbcu.sn.session.getUserName()+'\" title=\"'+nbcu.sn.session.getUserName()+'\">Hello, <span>'+nbcu.sn.session.getUserName()+'</span></a></p>');
		jqN('#mynbc_login_out').addClass('logout');
		jqN('a#mynbc_login_out').html("<span>log out</span>");
		jqN('.logout').click(function(){
			if (document.domain == "www.nbc.com") {
				jqN(this).attr('href', 'http://my.nbc.com/accounts/logout?redirectUrl=' + window.location.href)
			} else {	
				jqN(this).attr('href', 'http://'+document.domain+'/app/socnet/accounts/logout?redirectUrl=' + window.location.href)
			}	
/*	
			jqN.ajax({
				type:"POST",
				url:"/app/sn/api/sso/",
				data:"remember=0",
				dataType:"xml",
				error: function() {alert("logout not happening")},
				success: function() {alert("logged out")},
			});
			jqN.post({
				url:"http:my.nbc.com/accounts/logout?success=1",
				callback: function(){alert('loggit out')},
				type: "http"
			});
*/
		});
	}
	
	jqN('#globalLoginSubmitBtn').click(function(){	
		callToLogin();
	});
	jqN('#mynbcLoginForm form').submit(function() {
		callToLogin();		
	});
}

function callToLogin(){
	var loginForm = jqN('#mynbcLoginForm form');
	var emailSub = jqN('#globalLoginEmail').val();
	var passSub = jqN('#globalLoginPass').val();
	
	// var theQuery = "method=login&email="+emailSub+".com&password="+passSub+"&remember=0"
	var theQuery = "method=login&email="+emailSub+"&password="+passSub+"&remember=0";
	var logState = 1;
		jqN.ajax({
			type:"POST",
			url:"/app/api/sn/account/",
			data: theQuery,
			dataType:"xml",
			error: function(){
				jqN('#mynbcLoginForm').append('<div id=\"response-text\">Sorry can\'t login from here.</div>');
				var currentLocation = window.location;
				window.location = 'http://my.nbc.com/accounts/login?redirectUrl='+currentLocation+'';
			},
			success: function(msg){
				if(jqN('status', msg).text() == '0'){
					var response = jqN('msg', msg).text();
				jqN('#mynbcLoginForm').append('<div id=\"response-text\">'+response+' <span>X</span></div>');
				jqN('#response-text').fadeIn('slow').animate({opacity:1.0},3000).fadeOut('slow');
				setTimeout("jqN('#response-text').remove()", 5000);
				jqN('#response-text span').click(function() {jqN('#response-text').remove()})
				}
				
				if(jqN('status', msg).text() == '1'){
					if(logState==1){
							jqN('#mynbcLoginForm').hide('slow');
				hideVisible('#A-searchform',0);
				hideVisible('#nbc_MastLogo',0);
						jqN('#fb_global_login').hide();
						var userName = jqN('userName', msg).text();
						var openIdRedirectUri = jqN('openIdRedirectUri', msg).text();
						jqN('#myNBC_log_status').html('<p><a href=\"http://my.nbc.com/'+userName+'\" title=\"'+userName+'\">Hello, <span>'+userName+'</a></p>');
						jqN('#mynbc_login_out').addClass('logout');
						jqN('a#mynbc_login_out').html("<span>log out</span>");
						jqN('.logout').click(function(){
							  if (document.domain == "www.nbc.com") {	
							  	jqN(this).attr('href', 'http://my.nbc.com/accounts/logout?redirectUrl=' + window.location.href)
							  } else {	
							  	jqN(this).attr('href', 'http://'+document.domain+'/app/socnet/accounts/logout?redirectUrl=' + window.location.href)
							  }	
	
						});
						jqN('#mynbc_login_out').show();
						logState = 1;
						xdSync("initServerLogin");
						addHiddenFrame(openIdRedirectUri);
					}else{return false;}
				}
			}
		})
}
function nbcHideItem(anArray) {
	for (var i=0; i < anArray.length; i++) {
		// nbcHideMe[i] = anArray[i];
		nbcHideMe.push(anArray[i])
	};
};
function showsDropDown(hoverEl, id){
	// Not in use anymore
	var el = jqN(hoverEl);
	jqN(id).hide();
	var theID = jqN(id);
	el.hover(function(){theID.toggle();
		nbcToggleEl(nbcHideMe, "hide")
		},
		function(){
			var renderOut = theID.hide();
			nbcToggleEl(nbcHideMe, "show")
			}
	);
}
function nbcToggleEl (arr, set){
	if(set == "hide"){
		for (var i=0; i < arr.length; i++) {
			// document.getElementById(arr[i]).style.visibility = 'hidden';
			jqN(arr[i]).css('visibility','hidden');
			// jqN(arr[i]).css('display','none');
		};
	}else if(set == "show"){
			for (var i=0; i < arr.length; i++) {
				// document.getElementById(arr[i]).style.visibility = 'visible';
				jqN(arr[i]).css('visibility','visible');
				// jqN(arr[i]).css('display','block');
			}
	}
}
function nbcToggleElShow (arr){
		for (var i=0; i < arr.length; i++) {
			document.getElementById(arr[i]).style.visibility = 'visible';
			// document.getElementById(arr[i]).style.display = 'block';
		}
}
function tabThis (navContainer, holder){
	jqN(navContainer+" a").each(function() {
		var divContainers = jqN(this).attr("href");
		jqN(divContainers).hide();
	});
	jqN(navContainer+" a").click(function() {
		jqN(holder).hide();
		jqN(jqN(this).attr("href")).show();
		return false;	
	});			
}
function loadShowNav(){
	jqN.ajax({
	type:"GET",
	url:"/www.assets/xml/nav_shows.xml",
	dataType:"xml",
	timeout: 40000,
	error:function(){
		jqN('body').append("<b>Shows nav failed to load</b>")
		},
	success:function(xml){
		var isShow = jqN('show', xml);	
			var htmlUL = '<ul class=\"showlistlink\"></ul>';
			var htmlULLast = '<ul class=\"showlistlink\" style=\"margin:0; width:160px; background:none\"></ul>';
			jqN('#A-sub-show').append(htmlUL+htmlUL+htmlUL+htmlULLast);
		isShow.each(function(i){
			var isTitle = jqN('name', this).text();
			var isUrl = jqN('link', this).text();
			var ifFull = jqN('full', this).text();
			var htmlLI = '<li><a href=\"'+isUrl+'\" title=\"'+isTitle+'\">'+isTitle+'</a></li>';
				if(i<=8){	
				jqN('ul.showlistlink:eq(0)').append(htmlLI);
				}
				if(i>=9 && i<=17){
					jqN('ul.showlistlink:eq(1)').append(htmlLI);				
				}
				if(i>=18 && i<=26){
					jqN('ul.showlistlink:eq(2)').append(htmlLI);
				}
				if(i>=27 && i<=35){
					jqN('ul.showlistlink:eq(3)').append(htmlLI);
				}
				if(i>=36 && i<=48){
					jqN('ul.showlistlink:eq(4)').append(htmlLI);
				}
			})	
				
		}
	});
}
function hoverEffectDirect(){
	jqN('.hasFullEpisode').hover(function() {
		jqN(this).css('color','#FDB913')
	}, function() {
		jqN(this).css('color','#fcffff')
	})
	jqN('.nbc_directable').hover(function() {
		jqN(this).siblings().css('color','#FDB913')
	},
	function() {
		jqN(this).siblings().css('color','#fcffff');
	}
	);
}
function newWin(){
	jqN("a.moreToit").setAttribute("target","_blank");
}
function browserSniff(){
	var browserSpec = navigator.userAgent;
	return browserSpec;
		// if(jqN.browser.msie){
		// 	jqN('body').append(navigator.userAgent)
		// }
		// if(jqN.browser.safari){
		// 	jqN('body').append(navigator.userAgent)
		// }
		// if(jqN.browser.mozilla){
		// 	jqN('body').append(navigator.userAgent);
		// }
		// if(jqN.browser.opera){
		// 	jqN('body').append(navigator.userAgent)
		// }
}
function linktrack(myname) { 
        var s=s_gi(s_account);s.linkTrackVars='prop10,campaign';s.campaign=myname;s.tl(true,'o',myname) ;
} 
function linkHunt(myname) { 
        var s=s_gi(s_account); s.tl(true,'o','FrontDoor|'+myname);
	//	return false;
}


// Legacy -------->
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{	// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 	// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};
BrowserDetect.init();
// -- GET URL STRING INFORMATION -- //
function QueryString(key)
{
	var value = null;
	for (var i=0;i<QueryString.keys.length;i++)
	{
		if (QueryString.keys[i]==key)
		{
			value = QueryString.values[i];
			break;
		}
	}
	return value;
	
}
QueryString.keys = new Array();
QueryString.values = new Array();
function QueryString_Parse()
{
	var query = window.location.search.substring(1);
	var pairs = query.split("&");
	
	for (var i=0;i<pairs.length;i++)
	{
		var pos = pairs[i].indexOf('=');
		if (pos >= 0)
		{
			var argname = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			QueryString.keys[QueryString.keys.length] = argname;
			QueryString.values[QueryString.values.length] = value;		
		}
	}

}
// Steady on states for drop downs
function switchNav(nav,action){
	sNav = document.getElementById(nav);
	
	switch(nav){
		case "showsImg": //Shows
			switch(action){
				case "show":	
					sNav.src="/www.assets/images/nav/nav_shows_on.jpg";
				break
				case "hide":	
					sNav.src="/www.assets/images/nav/nav_shows_off.jpg";
				break
			}
		break
		case "fansImg": //For Fans
			switch(action){
				case "show":
					sNav.src="/www.assets/images/nav/nav_for_fans_on.jpg";
				break
				case "hide":					
					sNav.src="/www.assets/images/nav/nav_for_fans_off.jpg";
				break
			}
		break
		case "fullepisodesImg": //Full Episodes
			switch(action){
				case "show":
					sNav.src="/www.assets/images/nav/nav_watch_episodes_on.jpg";
				break
				case "hide":					
					sNav.src="/www.assets/images/nav/nav_watch_episodes_off.jpg";
				break
			}
		break
	}
	mfbSwitch(action);
}
function mfbSwitch(ac){
	try{
	if(navigator.appVersion.indexOf("Mac")!=-1){ // for mac flash/DHTML issues.
		if(ac == "show"){
			document.getElementById('mfb').style.visibility="hidden";		
		}else{
			document.getElementById('mfb').style.visibility="visible";
		}
	}	
	}catch(e){/*ignore*/}
}
// Sub-Nav rollovers and MyNBC Add selector viewer for the list..
function vis(loc, act, sid){
	try{
		var tag = loc;
		var addTag = "Add"+sid;
		addTag = document.getElementById(addTag);
		if(act == 'show'){
			tag.style.backgroundColor = "#666666";
			addTag.style.backgroundImage = "url('/www.assets/images/nav/selector.jpg')";		
		}else{
			tag.style.backgroundColor = "";
			addTag.style.backgroundImage = "";	
		}
	}catch(e){/* ignore */}
}
// Global DropDown Script
function navDD(dd){

	jqN(function(){
			jqN(dd+'> li').hover(function(){
				jqN(this).addClass('over');
			},function(){
				jqN(this).removeClass('over')
			})
	})
}
function navPop(div){
	Effect.Appear(div, {duration:0.5, from:0.0, to:1.0});	
}

function navFade(div){
	Effect.Fade(div, {duration:0.5, from:1.0, to:0.0});	
}
function thisMovie(movieName,id) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName]
    }
    else {
        return document[movieName]
    }
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
function hideUnhideVideo(state)
{
	if(state)
	{
		try
		{
			embeddedPlayerManager.getPlayer().hidePlayer()
		} catch (e) {}
	} else {
		try
		{
			embeddedPlayerManager.getPlayer().unHidePlayer()
		} catch (e) {}
	}
		
}
// preload images
var myimages=new Array()
function preloadimages(){
	for (i=0;i<preloadimages.arguments.length;i++){
		myimages[i]=new Image();
		myimages[i].src=preloadimages.arguments[i];
	}
}
var randDARTNumber=0;
function genSetRandDARTNumber()
{
 randDARTNumber = Math.round(Math.random()*1000000000000);
}
genSetRandDARTNumber();

function xdSync(action) {
	if (document.domain.indexOf('.nbc.com') == -1) {
		var action = action || "sync";
		/*var full = window.location.host
		var parts = full.split('.')
		var subdomain = parts[0];
		
		if (subdomain != "stage") {
			subdomain = "www";
		}*/
		subdomain = "www";
		
		addHiddenFrame("http://" + subdomain + ".nbc.com/assets/nbcu/frames/xd/server/?a=" + action + "&i=" + ((nbcu.sn.session.isLoggedIn()) ? "1&cb=" + Math.floor(Math.random()*1000000000000000) : "0") + "&d=" + document.domain);
	}
}

function addHiddenFrame(uri) {
	frame = document.createElement("IFRAME");
	frame.setAttribute("src", uri);
	frame.style.display = "none";
	frame.style.width = "1px";
	frame.style.height = "1px";	
	document.body.appendChild(frame);
}

function checkSubmit(form){
	jqN('#searchString').focus(function(){searchField()});
	if(form.searchString.value == '' || form.searchString.value == 'Search NBC.com'){
		jqN('.header-search-error').slideDown('fast');
		return false;
	}
}
function searchField(){
	jqN('.header-search-error').slideUp('fast');
}

function sitePerformedInvite(id){
var r = /(REMO_INVITE)=([^;]*)/gi.exec(document.cookie);
return (r && unescape(r[2]));

}
function siteInvited(id){
id != undefined || ( id = '1');
var ex = new Date(new Date().getTime() + (86400000*30));
document.cookie = 'REMO_INVITE' + '=' + escape(id) + ((!ex || !(ex instanceof Date))? '' : ('; expires=' + ex.toGMTString()))+ ';path=/; domain=NBC.com';


}
// tracking for home page
function __a(link) {
	var __source = 'front-door';
	var __module = link.name;
	var __t="__source="+__source+"|"+__module;
	var objRegExp = /(\?)/i;
	if (s_prop10 =="Front Door") {
        	if (objRegExp.test(link)) {
        	link=link +"&"+__t;
        	} else {
        	link=link +"?"+__t;
        	}
	
	} 
	return (link);
}
	
function stringToXML(string){
	try {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(string);
		return xmlDoc;
	}	catch(e) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(string,"text/xml");
		return xmlDoc;
	}
}	

/*v deprecated (replacement jquery.nbc.twitter.js v*/
function getSiteTweets(siteID,limit){
	document.write('<div class="twitter-wrap"></div>');
	jqN.ajax({
		type:"GET",
		url:"/assets/esp/twitter/twitter/getStatuses/siteId/"+siteID+"/limitBy/"+limit+".xml",
		success: tweetXMLLoaded
	});
}


function tweetXMLLoaded(xml){
	var url = window.location.href;
	var nohttp = url.replace('http://','');
	var urlArray = nohttp.split('/');//[1];
	var showURI = '';
	//debug(nohttp);
	//debug(urlArray);
	
	if(urlArray[0] == 'www.nbc.com' || urlArray[0] == 'dev.nbc.nbcuni.com' )
		showURI = '/'+urlArray[1];
	
	//debug(showURI);
	//debug(xml);
	var tweetItems = [];
	jqN('status',xml).each(function(){
		var obj={};
		obj.statusId		= jqN('statusId',this).text();
		obj.avatarUri		= jqN('avatarUri',this).text();
		obj.username		= jqN('username',this).text();
		obj.text				= jqN('text',this).text();
		obj.published		= jqN('published',this).text();
		tweetItems.push(obj);
	});
	var tweetOutput='';
	for(i=0;i<tweetItems.length;i++)
	{
		tweetOutput+='<div class="tweet-wrap '+(i%2?'even':'odd')+'">\n';
		tweetOutput+='<a class="tweet-avatar" href="'+showURI+'/twitter/#tweetIDnum'+tweetItems[i].statusId+'"><img src="'+tweetItems[i].avatarUri+'" alt="'+tweetItems[i].username+'" /></a>\n';
		tweetOutput+='<a class="tweet-title" href="'+showURI+'/twitter/#tweetIDnum'+tweetItems[i].statusId+'">'+tweetItems[i].username+'</a>\n';
		tweetOutput+='<p class="tweet-text">'+tweetItems[i].text+'</p>\n';
		tweetOutput+='<p class="tweet-published">'+tweetItems[i].published+'</p>\n';
		tweetOutput+='</div>\n';
	}
	jqN('.twitter-wrap').html(tweetOutput);
}
/*^ deprecated ^*/

function debug(e){
	if(window.console && window.console.log)
		console.log(e);
}

/**
 * Search autocomplete code
 */
function searchAutocompleteInit(){
    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = '/assets/js/search/autocomplete.css';
    document.getElementsByTagName('head')[0].appendChild(css);

    insertJavascript('/assets/js/jquery/autocomplete/jquery.autocomplete.js');
    insertJavascript('/assets/js/search/autocomplete.js');
}

function insertJavascript(url){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	jqN(document).ready(function() {
		document.body.appendChild(script);
	});
}
/**
 * End Search autocomplete code
 */


function __ab(thisLink) {
var rand_no = Math.floor((3-1)*Math.random());
var href=thisLink.href;
var __d = new Date();
var __t = __d.getTime();

if (rand_no==1) {
        thisLink='http://www.nbcuniversalstore.com/?v=nbc_the-office&ecid=PRF-TV2-101614&pa=PRF-TV2-101614';
        } else {
        thisLink='http://www.nbc.com/The_Office/shop/index.shtml?r=gd&t=' + __t;
        }
        document.location=thisLink;
        return false;
}

/**
 * tracks module links and reports events to omniture
 * 
 * @returns void: incurs omniture event
 */
var trackModuleEvents = function(){
	var moduleID = jqN(this).closest(".module").attr("id"); 
	var hitTrack = s_prop10.toLowerCase().replace(" ", "_") + "|" + jqN("body").attr("id") + "|" + moduleID ;

	if( moduleID != jqN(this).closest("div[id]").attr("id") ){
		hitTrack += "|" + jqN(this).closest("div[id]").attr("id"); 
	}
	
	if(jqN(this).attr("class") != "") {
		hitTrack += "|" + jqN(this).attr("class");
	}
	else {
		hitTrack += "|more_link" ; 
	}
	
	//alert(  hitTrack  );
	s.linkTrackVars = 'campaign';
	s.linkTrackEvents = 'none';
	s.campaign = hitTrack;
	s.tl(this,'o', hitTrack);
}

var breakingNews =
{
	"item": [{
		"targetDevice" : "web",	"startTime" : "1334025000", "endTime" : "1334026800", "timeType" : "primetime",
		"headline" : "Get ready to VOTE, plus get insider content and connect with fans. Download the free NBC Live App now!",
		"link": {
			"href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1334025000", "endTime" : "1334026800",	"timeType" : "primetime",
		"headline" : "Get ready to VOTE, plus get insider content and connect with fans. Download the free NBC Live App now!",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"


		}},{
		"targetDevice" : "web",	"startTime" : "1334026800", "endTime" : "1334033100", "timeType" : "primetime",
		"headline" : "Get ready to VOTE, plus get insider content and connect with fans with the free NBC Live App now!",
		"link": {
			"href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1334026800", "endTime" : "1334033100", "timeType" : "primetime",
		"headline" : "Get ready to VOTE, plus get insider content and connect with fans with the free NBC Live App now!",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"



		}},{
		"targetDevice" : "web",	"startTime" : "1334033100", "endTime" : "1334034000", "timeType" : "primetime",
		"headline" : "Join Christina Milian and the artists for The Voice Aftershow, coming up at 10/9c only online! Click to learn more.",
		"link": {
			"href" : "http://www.nbc.com/the-voice/social-media-feed/?section=after-show&__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1334033100", "endTime" : "1334034000", "timeType" : "primetime",
		"headline" : "Join Christina Milian and the artists for The Voice Aftershow, coming up at 10/9c only online! Click to learn more.",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"
	
	
			
			
		}},{
		"targetDevice" : "web",	"startTime" : "1335242700", "endTime" : "1335243600", "timeType" : "primetime",
		"headline" : "Watch the live Voice After Show coming up at 10pm on nbc.com.",
		"link": {
			"href" : "http://www.nbc.com/the-voice/social-media-feed/?section=after-show&__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1335242700", "endTime" : "1335243600", "timeType" : "primetime",
		"headline" : "Watch the live Voice After Show coming up at 10pm on nbc.com.",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"			
			
		}},{
		"targetDevice" : "web",	"startTime" : "1335243600", "endTime" : "1335244500", "timeType" : "primetime",
		"headline" : "Watch the live Voice After Show now on nbc.com. Click here.",
		"link": {
			"href" : "http://www.nbc.com/the-voice/social-media-feed/?section=after-show&__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1335243600", "endTime" : "1335244500", "timeType" : "primetime",
		"headline" : "Watch the live Voice After Show now on nbc.com. Click here.",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"


		}},{
		"targetDevice" : "web",	"startTime" : "1335244500", "endTime" : "1335276000", "timeType" : "primetime",
		"headline" : "Vote for your Favorite Voice Artists Now.",
		"link": {
            "href" : "http://www.nbc.com/the-voice/vote/?__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1335244500", "endTime" : "1335276000", "timeType" : "primetime",
		"headline" : "Vote for your Favorite Voice Artists Now.",
		"link": {
			"href" : "http://www.nbc.com/the-voice/vote/?__source=breaking-news-bar",
			"target" : "_self"
			
			
                        

                        
        }},{
        "targetDevice" : "web", "startTime" : "1332816300", "endTime" : "1332817200", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Voice. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1332816300", "endTime" : "1332817200",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Voice. Download the app.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"

                        
        }},{
        "targetDevice" : "web", "startTime" : "1332817200", "endTime" : "1332824400", "timeType" : "primetime",
        "headline" : "The Voice NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Join Now!",
        "link": {
            "href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1332817200", "endTime" : "1332824400",  "timeType" : "primetime",
        "headline" : "The Voice NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Download the app!",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"



                            




                        
        }},{
        "targetDevice" : "web", "startTime" : "1334717100", "endTime" : "1334718000", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Biggest Loser. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334717100", "endTime" : "1334718000",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Biggest Loser. Download the app.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"

                        
        }},{
        "targetDevice" : "web", "startTime" : "1334718000", "endTime" : "1334720700", "timeType" : "primetime",
        "headline" : "The Biggest Loser NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Join Now!",
        "link": {
            "href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334718000", "endTime" : "1334720700",  "timeType" : "primetime",
        "headline" : "The Biggest Loser NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Download the app!                                      ",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"



                        
        }},{
        "targetDevice" : "web", "startTime" : "1335207600", "endTime" : "1335235500", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Voice tonight. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1335207600", "endTime" : "1335235500",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during The Voice tonight. Click here to learn more.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"

                        
        }},{
        "targetDevice" : "web", "startTime" : "1335235500", "endTime" : "1335242700", "timeType" : "primetime",
        "headline" : "Connect with fans as you watch The Voice. Join NBC Live now.",
        "link": {
            "href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1335235500", "endTime" : "1335242700",  "timeType" : "primetime",
        "headline" : "Connect with fans as you watch The Voice. Join NBC Live now.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"




                        
        }},{
        "targetDevice" : "web", "startTime" : "1335294000", "endTime" : "1335321900", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during tonight's shows. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1335294000", "endTime" : "1335321900",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during tonight's shows. Click here to learn more.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"



                        
        }},{
        "targetDevice" : "web", "startTime" : "1334717100", "endTime" : "1334718000", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during Fashion Star. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334717100", "endTime" : "1334718000",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during Fashion Star. Download the app.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"

                        
        }},{
        "targetDevice" : "web", "startTime" : "1334718000", "endTime" : "1334721600", "timeType" : "primetime",
        "headline" : "The Fashion Star Live event is on NOW! Connect with fans plus trivia, polls and more. Join Now!",
        "link": {
            "href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334718000", "endTime" : "1334721600",  "timeType" : "primetime",
        "headline" : "The Fashion Star Live event is on NOW! Connect with fans plus trivia, polls and more. Download the app!",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"




                        
        }},{
        "targetDevice" : "web", "startTime" : "1334979900", "endTime" : "1334980800", "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during Grimm. Click here to learn more.",
        "link": {
            "href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334979900", "endTime" : "1334980800",  "timeType" : "primetime",
        "headline" : "Connect with fans on NBC Live during Grimm. Download the app.",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"

                        
        }},{
        "targetDevice" : "web", "startTime" : "1334980800", "endTime" : "1334986200", "timeType" : "primetime",
        "headline" : "The Grimm Live event is on NOW! Connect with fans plus trivia, polls and more. Join Now!",
        "link": {
            "href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
            "target" : "_self"
        }},{
        "targetDevice" : "ipad", "startTime" : "1334980800", "endTime" : "1334986200",  "timeType" : "primetime",
        "headline" : "The Grimm Live event is on NOW! Connect with fans plus trivia, polls and more. Download the app!",
        "link": {
            "href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
            "target" : "_self"




    
	
						
		}},{
		"targetDevice" : "web",	"startTime" : "1323405000", "endTime" : "1323406800", "timeType" : "primetime",
		"headline" : "Connect with fans on NBC Live during The Office. Click here to learn more.",
		"link": {
			"href" : "http://www.nbc.com/nbc-live/?__source=breaking-news-bar",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1323405000", "endTime" : "1323406800",	"timeType" : "primetime",
		"headline" : "Connect with fans on NBC Live during The Office. Download the app.",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"

			
		}},{
		"targetDevice" : "web",	"startTime" : "1323406800", "endTime" : "1323408600", "timeType" : "primetime",
		"headline" : "The Office NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Join Now!",
		"link": {
			"href" : "javascript:void(window.open('/nbc-live/flash/?__source=breaking-news-bar','nbclive','width=1024,height=748,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,top=0,left=0'));",
			"target" : "_self"
		}},{
		"targetDevice" : "ipad", "startTime" : "1323406800", "endTime" : "1323408600", "timeType" : "primetime",
		"headline" : " The Office NBC Live event is on NOW! Connect with fans plus trivia, polls and more. Download the app!",
		"link": {
			"href" : "http://itunes.apple.com/us/app/nbc-live/id424728329?mt=8",
			"target" : "_self"
			
		}}
	],
	"template" : '<div class="nbclive-news">' + 
					 '<div class="inner">' + 
						 '<span class="blink"></span><a href="#link#" target="#target#"><span class="more">#content#</span></a>' + 
						 '<div class="nbclive-news-close">Close</div>' + 
					 '</div>' + 
				 '</div>'
};

function DST() {
	var today = new Date(),
		yr = today.getFullYear(),
		dst_start = new Date("March 14, " + yr + " 02:00:00"),// 2nd Sunday in March can't occur after the 14th
		dst_end = new Date("November 07, " + yr + " 02:00:00"),// 1st Sunday in November can't occur after the 7th
		day = dst_start.getDay(); // day of week of 14th
	
		dst_start.setDate(14 - day); // Calculate 2nd Sunday in March of this year
		day = dst_end.getDay(); // day of the week of 7th
		dst_end.setDate(7 - day); // Calculate first Sunday in November of this year
	
	if (today >= dst_start && today < dst_end) { //does today fall inside of DST period?
		return true; //if so then return true
	} else {
		return false; //if not then return false
	}
}

function fixBackground(closePressed) {
	
	var bgPosFix = '50% 35px',
		bgPos = jqN('body').css('backgroundPosition');
	
		
	
	if(closePressed === true){
		jqN('body').css({backgroundPosition: jqN.data(document.body, 'breaking-news-bar-bgposition')});
	} else {
		jqN('body').css({backgroundPosition: bgPosFix});
		jqN.data(document.body, 'breaking-news-bar-bgposition', bgPos);		
	}
}

function currentUserTime() {
	var d = new Date(),
		gmtOffset = -d.getTimezoneOffset() / 60,
		isDST = DST(),
		epoch = (d.getTime() - d.getMilliseconds()) / 1000,
		currentAdjustedTime = epoch;
		
	if (DST()) {
    	gmtOffset--;
    }
    
	//nbcu.log("OFFSET: " + gmtOffset);
	// If time offset is GMT -5 through -10 (USA)
	if (gmtOffset >= -8 && gmtOffset <= -5) {
		//	nbcu.log('Is within the DST area');
		// Minus one hour from cst
		if (gmtOffset === -6 || gmtOffset === -7) {
			currentAdjustedTime += 3600;
			//	nbcu.log('Is central time');
		}
		// Add an hour for DST 
		if (DST === true) { 
			currentAdjustedTime += (gmtOffset + 7) * 3600;
			//if (gmtOffset == -5) {
			//	currentAdjustedTime += 3600;
			//}
		}
		currentAdjustedTime += (gmtOffset + 8) * 3600;
	}
	//nbcu.log('currentAdjustedTime (Cleaned): ' + currentAdjustedTime);
	return currentAdjustedTime;

}
function outputNewsBar(item, startTime) {
	
	var content = breakingNews.template
							  .replace('#link#', breakingNews.item[item].link.href)
							  .replace('#target#', breakingNews.item[item].link.target)
							  .replace('#content#', breakingNews.item[item].headline);
/*							  .replace('#more#', breakingNews.item[item].link.text);*/

		// Insert content
		jqN(content).prependTo('body');
		
		// Fix background image offset
		fixBackground();
		
		// Close button
		jqN('.nbclive-news-close').bind('click', function () {
			
			jqN('.nbclive-news:eq(0)').slideUp();
			if (jqN('.nbclive-news:eq(1)').length > 0) {
				jqN('.nbclive-news:eq(1)').fadeOut();
			}
			// Set cookie
			fixBackground(true);
			
			//jqN.cookie('breaking-news-bar', startTime);
			jqN.cookie('breaking-news-bar', startTime, { expires: 7, path: '/', domain: 'nbc.com' });
			
		});
}
function determineMessage(epoch) {
	var data = breakingNews.item,
		totalRecords = breakingNews.item.length,
		startTime = 0, 
		endTime = 0,
		breakingNewsBarCookie = jqN.cookie('breaking-news-bar'),
		userDevice = nbcu.util.common.getDevice(),
		i;
		
		var d = new Date(),
		gmtOffset = -d.getTimezoneOffset() / 60;
		
    if (DST()) {
    	gmtOffset--;
    }				

	for (i = 0; i < totalRecords; i++) {
		startTime = data[i].startTime;
		endTime = data[i].endTime;
		targetDevice = data[i].targetDevice;

		//nbcu.log(epoch+'-'+startTime);

		if (userDevice == targetDevice && epoch >= startTime && epoch <= endTime && startTime > breakingNewsBarCookie && gmtOffset >= -8 && gmtOffset <= -5) {
		// nbcu.log('outputNewsBar('+i+',' +startTime+')');
			outputNewsBar(i, startTime);
			break;
		}
		
	}

}
function initNewsBar() {
	var currentTime = currentUserTime();
	determineMessage(currentTime);
}

function initFallPreviewNav() {
	return;
}

var loginInterval;
var loginCallback;

function showLoginPrompt(callback) {
	if (!nbcu.sn.session.isLoggedIn()) {
		jqN.fancybox({
			"type" : "iframe",
			"href" : "/assets/core/themes/2011/nbc/includes/login_overlay.html",
			"width" : 583,
			"height" : 496,
			"scrolling" : "no",
			"padding" : 0,
			"centerOnScroll" : true
		});

		loginCallback = callback;
		window.clearInterval(loginInterval);
		loginInterval = self.setInterval("detectLogin(loginCallback)", 1000);		
	} else {
		callback();
	}
}

function detectLogin(callback) {
	if (nbcu.sn.session.isLoggedIn()) {
		window.clearInterval(loginInterval);
		callback();
	}
}

function achievementBanner(){
	var loudestFanMetaData = jqN.cookie('loudest_fan_challenge');
	var loudestFanMetaDataArray = loudestFanMetaData.split('|');
	var loudestFanIframeUrl;
	if(loudestFanMetaDataArray[1]=='challenge') {
		loudestFanIframeUrl = '/assets/esp/social/fanitFeed/getChallengeBanner/?campaignName=site-441&challengeId='+loudestFanMetaDataArray[0]+'&type='+loudestFanMetaDataArray[1];
	} else {
		loudestFanIframeUrl = '/assets/esp/social/fanitFeed/getChallengeBanner/?campaignName=site-441&productId='+loudestFanMetaDataArray[0]+'&type='+loudestFanMetaDataArray[1];
	}
	var loudestFanIframeOutput = '<iframe id="challengeBanner" width="100%"  height="201" style="position: fixed; top:0; left:0; z-index: 10000;" src="'+loudestFanIframeUrl+'"></iframe>'
	if(jqN('#challengeBanner').length == 0){
			jqN('head').prepend('<link rel="stylesheet" href="/the-voice/css/banner.css" type="text/css" media="screen" id="bannerCSS"/>');
			jqN("body").prepend(loudestFanIframeOutput).fadeIn("fast",function() {	// NBC(frames['challengeBanner'].document).contents().find('#banner-wrap').slideDown('slow')
			});		
	}else{
		// NBC('#banner-wrap').slideUp('fast',function() {NBC(this).remove()});
		jqN('#challengeBanner').slideUp('fast', function() {NBC('#challengeBanner').remove();})
		jqN('#bannerCSS').remove();
	}
}
