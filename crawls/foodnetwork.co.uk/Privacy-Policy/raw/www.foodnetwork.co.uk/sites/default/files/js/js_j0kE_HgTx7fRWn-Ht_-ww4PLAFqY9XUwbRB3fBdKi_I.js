// jQuery Suckerfish JS for Channel Guide

sfHover = function() {
	var sfEls = jQuery("#guide-dropdown LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);;
function showdiv(div) {
	jQuery("#category" + div).show();
	jQuery("#cat" + div).addClass("current");
}

function hidediv(divarray) {
	//for (x in divarray)
    for (var x=0; x<divarray.length; x++) {
		jQuery("#category" + divarray[x]).hide();
		jQuery("#cat" + divarray[x]).removeClass("current");
	}
}

jQuery(document).ready(function(){
	jQuery("#cat1").click(function () {
		showdiv(1);
		hidediv([2,3,4,5,6,7,8,9]);
	})});
jQuery(document).ready(function(){
	jQuery("#cat2").click(function () {
		showdiv(2);
		hidediv([1,3,4,5,6,7,8,9]);	
	})});
jQuery(document).ready(function(){
	jQuery("#cat3").click(function () {
		showdiv(3);
		hidediv([1,2,4,5,6,7,8,9]);	
	})});
jQuery(document).ready(function(){
	jQuery("#cat4").click(function () {
		showdiv(4);
		hidediv([1,2,3,5,6,7,8,9]);	
	})});
	jQuery(document).ready(function(){
	jQuery("#cat5").click(function () {
		showdiv(5);
		hidediv([1,2,3,4,6,7,8,9]);	
	})});
jQuery(document).ready(function(){
	jQuery("#cat6").click(function () {
		showdiv(6);
		hidediv([1,2,3,4,5,7,8,9]);	
	})});
jQuery(document).ready(function(){
	jQuery("#cat7").click(function () {
		showdiv(7);
		hidediv([1,2,3,4,5,6,8,9]);	
	})});
jQuery(document).ready(function(){
	jQuery("#cat8").click(function () {
		showdiv(8);
		hidediv([1,2,3,4,5,6,7,9]);	
	})});
	jQuery(document).ready(function(){
	jQuery("#cat9").click(function () {
		showdiv(9);
		hidediv([1,2,3,4,5,6,7,8]);	
	})});;
/**
 * General JS file with general purpose functions
 */

jQuery(document).ready(function() {
  //used to hide comment filter
  jQuery('#edit-comment-body-und-0-format').hide();
  jQuery('#edit-comment-body-und-0-format--3').hide();
  jQuery('#edit-field-inappropriate-und').hide();
  
  
  // SEARCH FIELD
  // if text input field value is not empty show the "X" button
    jQuery("#edit-search-block-form--2").keyup(function() {
		jQuery("#edit-search-block-form--2").addClass("grey-head");
		jQuery("#edit-search-block-form--2").removeClass("search-grey");
		jQuery("#x").fadeIn();
        if (jQuery.trim(jQuery("#edit-search-block-form--2").val()) == "") {
            jQuery("#x").fadeOut();
        }
    });

//User profile edit function

	jQuery('#profile-settings').click(function(){
		 jQuery('#edit-profile').show();
		 jQuery('#edit-account').hide(); 
		 jQuery('#profile-settings').addClass('black-no-link');
		 jQuery('#account-settings').removeClass('black-no-link');
	  });
	  jQuery('#account-settings').click(function(){
		 jQuery('#edit-account').show();
		 jQuery('#edit-profile').hide();
		 jQuery('#account-settings').addClass('black-no-link');
		 jQuery('#profile-settings').removeClass('black-no-link');
	  });

	  var localHash = window.location.hash

	  if (localHash) {
	  	if (localHash == '#profile') {
	   		 jQuery('#profile-settings').click();
		} else if (localHash == '#account') {
		    jQuery('#account-settings').click();
		}
	  }


//User profile change password

	jQuery('#change-password-button').click(function(e){
		e.preventDefault();
		 jQuery('#change-password').slideDown(400);
		 jQuery('#change-password-button').hide(); 
	  });	  
    
//Placeholder support for older browsers
	if(!jQuery.support.placeholder) { 

		jQuery("#edit-search-block-form--2").removeClass("grey-head");
		jQuery("#edit-search-block-form--2").addClass("search-grey");

		var active = document.activeElement; 
			
		var $ = jQuery;
		$("input, textarea").each(function(){
			if($(this).val()=="" && $(this).attr("placeholder")!=""){
				$(this).removeClass("grey-head");
				$(this).addClass("search-grey");
				$(this).val($(this).attr("placeholder"));
				$(this).focus(function(){
					if($(this).val()==$(this).attr("placeholder")) $(this).val("");
				});
				$(this).blur(function(){
					if($(this).val()=="") $(this).val($(this).attr("placeholder"));
				});
			}
		});
		
		
	}
	// on click of "X", delete input field value and hide "X"
    jQuery("#x").click(function() {			
		
		jQuery("#edit-search-block-form--2").val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
		jQuery(':text').blur();
		
        jQuery(this).hide();
		jQuery("#edit-search-block-form--2").focus();
		jQuery("#edit-search-block-form--2").removeClass("grey-head");
		jQuery("#edit-search-block-form--2").addClass("search-grey");
    });

    url = window.location.pathname;
    //Change the search box text with the term currently searched
    if (!(typeof searchedKeyword === 'undefined') && url.match(/keyword/)) {
        jQuery('#edit-search-block-form--2').val(searchedKeyword)
            .removeClass("search-grey");
        jQuery("#x").fadeIn();
    }

    jQuery("#comments a[id^='ajax_comment_inappropriate_'], #activity a[id^='ajax_comment_inappropriate_']").click(
    function () {
        id = this.getAttribute('id');
        match = id.match(/\d+$/);
        commentId = parseInt(match);

        data = 'commentId='+commentId+'&form=inappropriateComment';

        successFunction = function(response) {
            if (response.status) {
                //replace text with pending approval
                jQuery('.ajax_comment_content_'+commentId).text('Comment pending approval.');
                jQuery('.ajax_comment_hide_'+commentId).hide();
            }
        };

        fn_ajax_call(data, successFunction, 'fn_general')

    });
});

/**
 * Function to retrieve all (or one, if specified as an argument) url parameters
 **/
function getUrlVars(urlVar) {
    hashes =  window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    urlVars = new Array();

    for(var i=0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        urlVars[hash[0]] = hash[1];
    }

    if (urlVar) {
        if (urlVars[urlVar]) {
            return urlVars[urlVar];
        } else {
            return '';
        }
    } else {
        return urlVars;
    }
}

function refreshBanners(count) {
    if (count%2 == 0) {
		adtypes = [jQuery("iframe[name=UK_BIGBOX_IFRAME]"), jQuery("iframe[name=UK_LEADERBOARD_IFRAME]"), jQuery("iframe[name=UK_TOWER_IFRAME]")]
        //jQuery.each(jQuery("iframe[name=UK_BIGBOX_IFRAME]"), function() {
			jQuery.each(adtypes, function() {
            url = jQuery(this).attr('src');

            //generate random integer/string
            rand = Math.floor(Math.random()*100000);
            replacement = '&ord='+rand+'&tile=';

            oldString = url.match(/&ord=(\d+)&tile=/gi);
            newUrl = url.replace(oldString, replacement);

            jQuery(this).attr('src', newUrl);
        });
    }
}

jQuery(function(){
    jQuery('#changePasswordButton').click(function() {
        changePassword();
    });
});

function changePassword() {
    pass1 = jQuery('#pass1').val();
    pass2 = jQuery('#pass2').val();
    data = 'pass1='+pass1+'&pass2='+pass2+'&form=changePassword';

    successFunction = function(response) {
        if (response.status) {
            //todo

        }
    };

    fn_ajax_call(data, successFunction,'fn_social');
}




// is this still being used?!
function updateUsersWhoLoveThisBlock(nid) {
    data = 'form=updateUsersWhoLoveThisBlock';

    if (!(typeof nid === 'undefined')) {
        data+= '&nid='+nid;
    } else {
        url = window.location.pathname;
        data+= '&url='+url;
    }

    successFunction = function(response) {
        if (response.status) {
            jQuery('#loves-this-ajax-container').html(response.html);
        }
    };

    fn_ajax_call(data, successFunction, 'fn_loved');
}



function signup() {
	sendOmnitureTracking('event43');
    data = jQuery('#user-registration').serialize();
    //form identifier
    data += '&form=signup';

    successFunction = function(response){
            if (response.status) {
                jQuery('#reg-step1, #social_tabs').hide();
                jQuery('#reg-step2').show();
				food.validateBio(); //bio validation
				jQuery.colorbox.resize();
                jQuery('#page-title').text('What else should we know?');
            }
        };
    fn_ajax_call(data, successFunction,'fn_social');
}

function disableAccount() {
    data = 'form=disableAccount';

    successFunction = function (response) {
        if (response.status) {
            window.location.href="/";
        } else {
            alert('Try again later..');
        }
    }

    fn_ajax_call(data, successFunction,'fn_social');
}

function commentLoad(page, opt) {
    data = 'opt='+opt+'&page='+page+'&form=commentPage';

	jQuery('#retrieved-data').html("<img src='/sites/all/themes/foodnetwork/images/ajax-loader.gif' />");
	
    successFunction = function (response) {
        if (response) {
            jQuery('#retrieved-data').html(response);
        } else {
            //alert('Try again later..');
        }
    }

    fn_ajax_call(data, successFunction,'fn_general', 'html');
}

function reportComment(id) {
	data='id='+id+'&form=reportComment';
	successFunction = function (response) {
        if (response) {
            jQuery('#comment'+id).html(response);
        } else {
            //alert('Try again later..');
        }
    }
    fn_ajax_call(data, successFunction,'fn_general', 'html');
}

function deleteComment(id) {
	data='id='+id+'&form=deleteComment';
	successFunction = function (response) {
        if (response) {
            jQuery('#comment'+id).html(response);
        } else {
            //alert('Try again later..');
        }
    }
    fn_ajax_call(data, successFunction,'fn_general', 'html');
}

function publishComment(id) {
	data='id='+id+'&form=publishComment';
	successFunction = function (response) {
        if (response) {
            jQuery('#comment'+id).html(response);
        } else {
            //alert('Try again later..');
        }
    }
    fn_ajax_call(data, successFunction,'fn_general', 'html');
}

function removeComment(id) {
	data='id='+id+'&form=removeComment';
	successFunction = function (response) {
        if (response) {
            jQuery('#comment'+id).html(response);
        } else {
            //alert('Try again later..');
        }
    }
    fn_ajax_call(data, successFunction,'fn_general', 'html');
}


function fn_ajax_call(data, successFunction, module, dType) {

	if (!dType) {
		dType = 'json';
	}

    switch (module) {
        case 'fn_general':
            url = '/sites/all/modules/custom/fn_general/fn_general_ajax.inc.php';
        break;
        case 'fn_social':
            url = '/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php';
        break;
        case 'fn_loved':
            url = '/sites/all/modules/custom/fn_loved/fn_loved_ajax.inc.php';
        break;
    }

    jQuery.ajax({
        url: url,
        type: 'POST',
        dataType: dType,
        data: data,
        success: successFunction
    });
}

function skipForm(popup, url) {
	if(popup == true) {
		if(url) {
			window.top.location = url; //sets the popups url - essestially the same thing here but may want to extend at some point if come from overlay
		} else {
			window.top.location = '/user'; //sets the popups url - essestially the same thing here but may want to extend at some point if come from overlay
		}
	} else {
		if(url) {
			window.location = url; //just sets the windows url
		} else {
			window.location = '/user'; //just sets the windows url
		}
	}
}



// some global vars for the below functionality
var $ = jQuery;	// $ > jQuery :)
var uniqueUN 	// global variable for unique username
var uniquePW 	// global variable for unique password
var popWin		// global variable used for popup windows (physical window)
var whichPop 	// global variable for popup windows (refering to which window)

// Initially for login form can be extended
food = { 
	buildArray : new Array(), // build the function array


////////////////////////////////////////////////////////////////////////////////////////////////////////	
	// Initation Functions, called by food.functionName();
	// eg food.init();
	
	// Social Sign Up specific functions
	init: function(){

		this.hideStart(); 			// hide on load
		this.noFbLogin(); 			// 'no facebook' button toggle
		this.unPreview(); 			// username preview
        this.emailPreview(); 		// email check
		this.isValid(); 			// Sign Up Validation
		this.generalSignUp(); 		// misc
		this.forgotPassword();		// forgotten password
		this.signIn();				// sign in validation
		//this.firstCheck(); 		// check for filled elements // possibly obsolite, could be re-used
		this.connectWithFacebook();	// Fb connect handler
		this.connectWithTwitter();	// TW connect handler

	},

	//edit profile specific functions
	editProfile : function(){

		food.unPreview();			// Username Preview
		food.generalSignUp();		// General Sign up
		food.validateBio();			// Biography Validation

	},

////////////////////////////////////////////////////////////////////////////////////////////////////////	
	//begin function arrays
	
	//hide items when JS kicks in
	hideStart : function (){ 
	 	$('.jshide').hide();
		//alert('moo');
	},
	
	// possibly obsolite, but this checks #name & #mail on load 
	firstCheck : function() {

		// could do with some serious optomisation
		$('#name,#mail').each(function(i,el){
			var val = $(this).val()
			if (val) {  
				$(this).keyup();
			}
		});

	},
	
	//misc functions
	generalSignUp : function() {
		
		//activate character counter
		var el = jQuery('#bio'), 		//declare form element
		 counter = jQuery('#bio-desc'); //show counter
		food.charLimit(el,counter); 	//innit the character limit counter 
		
		// handle twitter preview
		var twitter = jQuery('#twitterName'),
			tw_preview = twitter.parent().find('small .preview');
			
			food.textPreview(twitter,tw_preview); 		//manage preview text

			twitter.focus(function(){
				tw_preview.addClass('typing');
			}).keyup(function(e) {
				food.textPreview(twitter,tw_preview);	//manage preview text
			}).blur(function(){
				tw_preview.removeClass('typing');
			});
		
	},
	
	// social media connections
	connectWithFacebook : function() {

		$('#fb_btn').click(function(){
			popWin = window.open('/fn_social/activity/login/facebook','fn_social_module','menubar=0, resizable=1, width=650, height=350');

            /*windowCheckInterval = self.setInterval(function () {
                if(popWin.closed) {
                    jQuery('#page-title').text('Sign in with Facebook');
                    windowCheckInterval = window.clearInterval(windowCheckInterval);
                }
            }, '500');*/
            
			//win.onunload = food.checkFBdetails; // on close fire the FB form check
			whichPop = 'facebook'; 
			food.checkPopUp(); //fire popup listner
		});
	},
	connectWithTwitter : function() {
		$('#tw_btn').click(function(){
			popWin = window.open('/fn_social/activity/login/twitter','fn_social_module','menubar=0, resizable=1, width=550, height=650');
			// !!! UNRELIABLE //win.onunload = food.checkTWdetails; // on close fire the TW form check
			whichPop = 'twitter'
			food.checkPopUp();
		});
	},



	checkPopUp : function() {
	
	 if(popWin.closed) { 									//if popup closed
	 														
	 		 if (whichPop == 'facebook') {					// see which popup it is
				//	do something							// do something facebook related
	 		 } else if (whichPop == 'twitter') { 
 			 	// do something								// do something twitter related
	 		 }

	 		food.checkPopulated(); 							// Fire validate populated fields function

	   } else { 											//otherwise
		   setTimeout("food.checkPopUp(whichPop);", 500);	//  wait 1/2 second and recheck
	   }

	},

	checkPopulated : function(){							// validate populated fields function
			sendOmnitureTracking('event42');
		$('#sign-up-info').show(1,function(){ 				// show the correct form 

			jQuery.colorbox.resize(); 						// resize the light box (if applicable)

															// validate each element (populated) in the #user-registration form
			$("#user-registration").find('input').not('input[type=submit]').each(function(i,e){
				if( $(e).val().length > 0) {
					$("#user-registration").validate().element(e);
				}
			});

            pageTitle = "You're almost there";				// change the page title
            												// some code written by andy
			if (whichPop=='twitter') {
				if(jQuery('#name').val()) {
                    jQuery('#page-title').text(pageTitle);
                }
			} else if (whichPop=='facebook') {
                if(jQuery('#mail').val()) {
                    jQuery('#page-title').text(pageTitle);
                }
			}

		});

		$('#reg-step1').show();								 // show something (can't remeber what this is).

	},

	//no Facebook login toggle - handles show/hide form states
	noFbLogin : function(){ 
		
		//$('#sign-up-info').prepend('<a id="show_social" href="#edit-fn-social" title="back to facebook login" class="toggle right">Show facebook login </a>');

		$('.social-signin .toggle').bind('click', function(e){ 
		
			e.preventDefault();
			var id = $(this).attr('id');			// get anchor ID
			$('#sign-up-info').toggle();			// toggles something, seems important
	
			if ( id == 'showNoSocialLogIn') {		// show the regular sign up form
				//$('#social_tabs').hide();
				$(this).parent().hide();
			}
			else if ( id == 'show_social') {		// show social signup
				$('#social_tabs').show();
				$('#showNoSocialLogIn').parent().show();
			}
			else if ( id == 'show_signin') {		// show regular login form
				$('#forgottenPassword').hide();
				$('#social_tabs').show();
				$('#sign-in-form').show();
			}
						
			 jQuery.colorbox.resize(); 				//resize the light box (if applicable)

		});

		// NOTE : functionality is duplicated in other functions, could be optimised

		var p = window.location.pathname,			// shows content based on the URL path
			h = window.location.hash;				
					
		if ( (p == '/signup')) { 					// signup form /signup
				
			//show signup form
			$('#sign-in-form').hide();
			var title = $('#sign-in-form .action a:first').attr('title');
			$('#page-title').text(title);

		} else if (( p ==  '/login')){				// login form /login

			//show regular login form
			$('#reg-step1, #reg-step2, #forgottenPassword').hide();
			var title = $('#reg-step1 .action a:first').attr('title');
			$('#page-title').text(title);

		}
		
		// .action is the button at the bottom of the form 'skip for now' etc. Toggles Forms
		$('.action a').live('click',function(e){  
			//note functionality written as below for cross browser & legacy jQuery Library
			//ie7 & jQuery 1.4.4

			e.preventDefault();
			
			var id  = $(this).attr("id"); 
			
			// show relative container dependent on ID
			if  (id == 'showSignIn')  {		// show sign in form
				$('#reg-step1').hide();
				$('#sign-in-form').show();
			} else if (id == 'showStep1') {	// show sign in step 1
				$('#reg-step1').show();
				$('#sign-in-form').hide();				
			} else if (id == 'skipForm') {	// skip form
				skipForm(); //skip the from (function lives somewhere else)
			}

			var title  = $(this).attr("title"); //grab the title of the anchor
			$('#page-title').text(title); // make it the page title

			jQuery.colorbox.resize(); //resize the light box (if applicable)

		});
		
	},



	// forgotten password toggle
	forgotPassword : function(){
		
		//COMBINE THIS WITH
		$('.social-signin .toggle').bind('click', function(e){ 
				e.preventDefault();
	
				var id = $(this).attr('id'), // base toggle on anchor ID
				title = $(this).attr('title'); // for page title
	
			if ( id == 'fg_pw') {
				// show/hide relative containers
				$('#sign-in-form').hide();
				$('#social_tabs').hide();
				$('#forgottenPassword').show();
				$('#page-title').text(title);
			}

			$.colorbox.resize();

		});
		

		// need to check why this is duplicated.
		var p = window.location.pathname,
			h = window.location.hash;
		
		if ( (p == '/signup')) { 
			//show signup form
			$('#forgottenPassword').hide();
			
			var title = $('#sign-in-form .action a:first').attr('title');
			$('#page-title').text(title);
			
		} else if (( p ==  '/login')){
			//show regular login form
			$('#reg-step1, #reg-step2, #forgottonPassword').hide();
			var title = $('#reg-step1 .action a:first').attr('title');
			$('#sign-in-form').show();
			$('#page-title').text(title);
		}
		
		 $('.action a').click(function(e){
		 	e.preventDefault();
			
		 	target  = $(this).attr("href");
		 	title  = $(this).attr("title");
		 	$('.form-state').hide();
		 	$(target).show();
		 	$('#page-title').text(title);

		 });
		// end // need to check why this is duplicated.
		
	},

	//status controls
	showStatus : function (status_el, msg, a){ 
		
		var status = 'status '+ a
		if (a != 'good') {
			status_el.attr('class','').show().addClass(status).text(msg);
		} else {
			this.hideStatus();
		}
		
	},
	
	// fade out status and reset
	hideStatus : function (){
		var status = 'status'
		$('.status').delay(1000).fadeTo(400,0,function(){
			$(this).hide().attr('class','').addClass(status).text('').css({'opacity' : 1}); //.css for jquery 1.4.4
		});
	},
		
	// username functions
	unPreview : function() {
		
		var el = $('#name'), 				// username element
			preview = $('#un-preview'); 	//username preview text
			food.textPreview(el,preview);	//first username Check for cached form Fields
			
			el.parent().append('<span class="status"></span>');	// add loading status element
			var status_el = el.parent().find('.status');		// declare the status element
				status_el.hide();								// hide it for later
				
			el.focus(function(){ 								// on focus
				preview.addClass('typing');						// show user is 'typing'
			}).keyup(function(e) {								// on keyup
				e.preventDefault(); 							
				food.textPreview(el,preview); 					// update preview text
			}).keypress(function(e) {							// if the user presses...
				//if ( e.which == 13 ) { e.preventDefault(); }  // manage return !! not used
				if ( e.which === 32 )  { return false; } 		// disallow space
			}).blur(function(){									// on blur
				preview.removeClass('typing');					// remove 'typing' status
			});
			
		
	},


	
	/*/////////////////////OBSOLITE/legacy
	checkUsername : function() {

		var el  = $('#name'),
			status_el = el.parent().find('.status'),
			name = el.val();
		
		if( name == '') {
			food.hideStatus();
		} else {
			//form identifier
			data = 'name='+name+'&form=checkUsernameAvailability';
			successFunction = function(response){
			
				if (response.status) {
					var msg = "Username OK!",
					   cs = "good";
					  food.showStatus(status_el,msg,cs);
					  el.addClass('unique valid').removeClass('error not_unique');
					   $('#un-preview').addClass('good');
					   $('#un-preview').removeClass('sad');
					 var blong = true
						 return blong

				} else {
					var msg = "username has been taken",
					   cs = "error";
					  food.showStatus(status_el,msg,cs);
					  el.addClass('error not_unique').removeClass('valid unique');
					   $('#un-preview').removeClass('good');
					   $('#un-preview').addClass('sad');
					   var blong = false
						 return blong
				}
			};
			 fn_ajax_call(data, successFunction, 'fn_social');		
		}
	},
	*/


    // email preview functions
	emailPreview : function() {

		var el = $('#mail');									// username element
			el.parent().append('<span class="status"></span>');	// create status element
		var status_el = el.parent().find('.status');			// delare status element
		status_el.hide();										

		el.keypress(function(e) {
			//if ( e.which == 13 ) {	e.preventDefault();	} // manage return
			 if ( e.which === 32 )  { return false; }  //manage space
		});


	},



	/* //////////////////////////// OBSOLITE
	checkEmailAddress : function() {
		var el = $('#mail'),
			status_el = el.parent().find('.status'),
			mail = el.val();
			el.removeClass('valid');
		
			//form identifier
			data = 'mail='+mail+'&form=checkEmailAvailability';

			successFunction = function(response){
					if (response.status) {
						var msg = "Email address OK!",
						cs = "good";
						food.showStatus(status_el,msg,cs); //let the user know its ok to go forward
						 el.addClass('unique valid').removeClass('error not_unique');
						 var blong = true
						 return blong
					} else {
						var msg = "This email address is already in use",
						cs = "error";
						food.showStatus(status_el,msg,cs); //bad news... try again
						el.addClass('error not_unique').removeClass('valid unique');
						 var blong = false
						 return blong
					}
				};
				
		 fn_ajax_call(data, successFunction, 'fn_social');

	},*/


	// inline validation documentation
	// http://docs.jquery.com/Plugins/Validation

	//registration validation
	isValid : function() {
			//validation methods
		$("#user-registration").validate({
			//debug: true, 							// uncomment to stop submission
			onkeyup: false, 						// do not check form on keup
			errorElement: "span", 					// error flash
			errorPlacement: function(error, element) {
				error.appendTo( element.parent() ); // this is where the errror messages are placed
			},
			rules :{								// set validation rules (uses name attribute)
				display_name: {
					required: true,					// makes element required
					minlength: 3,					// sets min length
					maxlength: 30, 					// sets max lenth
                    remote : {						//remote check for username
					  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
    					type : "POST",
    					dataType: 'json',
  						data : {					//post data required by PHP, return must be explicit true/false
						     name : function() {
						      	return $("#display_name").val();
						     },
						     form : 'checkDisplayName'
						},
						complete: function(data){	// when complete
	                        if( data.responseText != "true" ) {			// if not unique
	                            $('#un-preview').attr('class', 'sad');	// sad face
	                         } else {
					   			$('#un-preview').attr('class', 'good');	// happy face
	                        }
                    	}

					  }
				},
				name:{
					required: true,
													 //regex extension on standard Plugin
					regex:"^[A-Za-z][A-Za-z0-9-]+$", // first character A-Z or a-z and rest A-Z,a-z or -
					minlength: 3,
					maxlength: 30,
					remote : {						//remote check for username
					  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
    					type : "POST",
    					dataType: 'json',
  						data : {					//post data required by PHP, return must be explicit true/false
						     name : function() {
						      	return $("#name").val();
						     },
						     form : 'checkUsernameAvailability'
						},						
						complete: function(data){	// when complete
	                        if( data.responseText != "true" ) {			// if not unique
	                            $('#un-preview').attr('class', 'sad');	// sad face
	                         } else {
					   			$('#un-preview').attr('class', 'good');	// happy face
	                        }
                    	}

					  }
				},
				mail: {
					required: true,
					email: true,
					remote : {
					  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
    					type : "POST",
    					dataType: 'json',
						data : {
						     mail : function() {
						      	return $("#mail").val();
						     },
						     form : 'checkEmailAvailability'
						}
					  }
				},
				pass : {
					required: true,
					minlength: 6
				}
			},
			messages: {							//error messages coorelate to the above rules to be optimised
				display_name: {
					required: 'Choose a display name.',		// error for 'required'
					minlength: function(x) {				// error for 'minlength' etc.
									// x parameter declared above
							      	return 'Please enter '+ x +' or more characters.'
							     },
					maxlength: function(x) {
							      	return 'You have entered too many characters ('+ x +' max).'
							    }
				},
				name: {
					required: 'Please choose a user name.',
					regex : 'User name has to start with a letter can only contain alphanumerics or dashes.',
					minlength: function(x) {
							      	return 'Please enter '+ x +' or more characters.'
							     },
					maxlength: function(x) {
							      	return 'You have entered too many characters ('+ x +' max).'
							    },
                    remote : 'This user name is already taken.'

				},
				mail: {
					required: 'Please enter your email address.',
					email : 'Please check your email address.',
					remote : 'This email address is already in use.'
				},
				pass : {
					required: 'Please create a password.',
					minlength: function(x) {
							      	return 'Your password should be '+ x +' or more characters.'
							    }
				}
			},
			success: function(label) {
			 	//this does something....
			},
			submitHandler : function () {
				signup(); // on submit fire signup(); ajax method outside of this array.
			}
		});
		
	},

	// edit account settings validation
 	// validation techniques described on food.isValid();
   accountSettings : function() {

   		$("#edit-account form").validate({
			onkeyup: false,
		 	errorElement: "span",
		 	errorPlacement: function(error, element) {
		 		error.appendTo( element.parent() );
		 	},
			rules :{
					display_name: {
						 required: true,
						 minlength: 3,
						 maxlength: 30,
                         remote : {
						  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
	    					type : "POST",
	    					dataType: 'json',
							data : {
							     name : function() {
							      	return $("#display_name").val();
							     },
							     form : 'checkDisplayName'
							},
							complete: function(data){
		                        if( data.responseText != "true" ) {
		                            $('#un-preview').attr('class', 'sad');
		                         } else {
						   			$('#un-preview').attr('class', 'good');
		                        }
	                    	}

						  }
					},
					name:{
						required: true,
						regex:"^[A-Za-z][A-Za-z0-9-]+$",
						minlength: 3,
						maxlength: 30,
						remote : {
						  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
	    					type : "POST",
	    					dataType: 'json',
							data : {
							     name : function() {
							      	return $("#name").val();
							     },
							     form : 'checkUsernameAvailability'
							},
							complete: function(data){
		                        if( data.responseText != "true" ) {
		                            $('#un-preview').attr('class', 'sad');
		                         } else {
						   			$('#un-preview').attr('class', 'good');
		                        }
	                    	}

						  }
					},
					mail: {
						  required: true,
						  email: true,
						  remote : {
						  	url : "/sites/all/modules/custom/fn_social/fn_social_ajax.inc.php",
	    					type : "POST",
	    					dataType: 'json',
							data : {
							     mail : function() {
							      	return $("#mail").val();
							     },
							     form : 'checkEmailAvailability'
							}

						  }
					},
					pass1: {
			 			minlength: 6
			 		},
	                pass2: {
			 			equalTo: "#pass1"
			 		}

			},

			messages: {
				display_name: {
					required: 'Choose a display name.',
					minlength: function(x) {
							      	return 'Please enter '+ x +' or more characters.'
							     },
					maxlength: function(x) {
							      	return 'You have entered too many characters ('+ x +' max).'
							    }
				},
				name: {
					required: 'Please choose a user name.',
					regex : 'User name has to start with a letter can only contain alphanumerics or dashes.',
					minlength: function(x) {
							      	return 'Please enter '+ x +' or more characters.'
							     },
					maxlength: function(x) {
							      	return 'You have entered too many characters ('+ x +' max).'
							    },
                    remote : 'This user name is already taken.'
				},
				mail: {
					required: 'Please enter your email address.',
					email : 'Please check your email address.',
					remote : 'This email address is already in use.'
				},
				pass1 : {
					minlength: function(x) {
							      	return 'Your password should be '+ x +' or more characters.'
							     }
				},
            	pass2 : {
					equalTo: 'Your passwords do not match.'
				}
			},
			submitHandler: function(form) {
			   form.submit(); // required / form drops save parameter otherwise
			}

			
		});
   
   		// close account content show/hide
   		$('#closeToggle, #close-acc-toggle .cancel').click(function(e){
   			e.preventDefault();
	   		$('#close-acc-toggle').toggle();
   		});
	},

	//character limit function	
	// requires :
	//		el : elment to watch, must have maxlength attribute
	//		counter : display counter element
	charLimit : function(el,counter) {
		
		var cap = el.attr('maxlength'); 					// character count cap
		//el.attr('maxlength',cap+100); 					// to allow extra

		//check on load
		var a = el.val().length								// check length
		
		if( (a <= cap) && (a != 0) ) { 						// if less than cap but not equal to zero
			counter.text(cap - a);// Update Counter
			counter.removeClass('sad').addClass('happy'); 	// show green text
		} else if (a >= cap) { 								// if over then show unhappy
			counter.text(a - cap);
			counter.removeClass('happy').addClass('sad');
		}
		
		//check on keypress
		//this could be extracted to a better function
		el.keydown(function() {
			var b = el.val().length							// check length
			counter.text(cap - b);							// Update Counter

			if( b <= cap) {
				counter.removeClass('sad').addClass('happy'); // if less chars
			} else {
				counter.removeClass('happy').addClass('sad'); // if too many chars
			}

		}).blur(function(e) {					// and on blur... could probably combine these 

			var b = el.val().length
			counter.text(cap - b);// Update Counter
			if( b <= cap) {
				counter.removeClass('sad').addClass('happy'); // if less chars
			} else {
				counter.removeClass('happy').addClass('sad'); // if too many chars
			}

		});
		

	},
	
	// function to 	inform the user they're over character limit
	// requires :
	//		el : elment to watch, must have maxlength attribute
	//		characterlimit : display counter element
	charLimitMessage : function(el,characterlimit) {
		
		var messageLimitCap = el.attr('maxlength'); 					// character count messageLimitCap
		el.attr('maxlength',messageLimitCap+10); 					// to allow extra

		//check on load
		var a = el.val().length								// check length
		
		if( (a <= messageLimitCap) && (a != 0) ) { 						// if less than messageLimitCap but not equal to zero
			//characterlimit.text(messageLimitCap - a);					// Update characterlimit
			//characterlimit.removeClass('sad').addClass('happy'); 	// show green text
		} else if (a >= messageLimitCap) { 								// if over then show unhappy
			characterlimit.text('Comments can only be ' + messageLimitCap + ' characters long');
			/* characterlimit.removeClass('happy').addClass('sad'); */
		}
		
		//check on keypress
		//this could be extracted to a better function
		el.blur, el.keydown(function() {
			var b = el.val().length							// check length
			//characterlimit.text(messageLimitCap - b);							// Update characterlimit
			
			if (b >= messageLimitCap) {
				characterlimit.text('Comments can only be ' + messageLimitCap + ' characters long');
				//characterlimit.removeClass('happy').addClass('sad'); // if too many chars
			} else if (b < messageLimitCap) {
				characterlimit.text('');
			}

		});
		

	},
	
	//handles text preview function
	// requires : 
	//	watching : input element
	//	output	 : preview output 
	textPreview : function(watching,output) {
		
		 	def = watching.defaultValue, 			// default username value
			prev_def = '______________' 			// default preview text (this doesnt really work properly)
			
			var un = watching.val();				
			if ( un == def) { un = prev_def } 		// if default
			output.text(un);						// set the text
	},
	
	// biography validation
	// validation techniques described on food.isValid();
	validateBio : function() { 
		
		$('#user-details').validate({
			//debug: true,
			onfocusout: false, 						// no blur validation
			onkeyup: false,
			errorElement: "span",
			errorPlacement: function(error, element) {
				error.appendTo( element.parent() );
			},
			rules :{
				bio:{
					rangelength: [1, 140]			// range length
				}
			},
			messages: {
				bio: {
				rangelength: function(range, input) {
                        return [
                            'You are only allowed between ',
                            range[0],
                            ' and ',
                            range[1],
                            ' You have typed ',
                            $(input).val().length,
                            ' characters'                                
                        ].join('');

                    }
				}
			},
			success: function(label) {
				//label.addClass("success");
				label.remove();
			}
		});
		
		
	},
	
		
	// Login Form
 	// validation techniques described on food.isValid();
	signIn : function(){
		$("#user-login").validate({
			//debug: true,
			//onfocusout: false,
			onkeyup: false,
			errorElement: "span",
			errorPlacement: function(error, element) {
				error.appendTo( element.parent() );
			},
			rules :{
				name : {
					required: true
				},
				pass : {
					required: true
				}
			},
			messages: {
				name : {
					required: 'Please enter your user name or email address.'
				},
				pass : {
					required: 'Please enter your password.'
				}
			}
		});

		$('#edit-name').keypress(function(e) {
				//if ( e.which == 13 ) {	e.preventDefault();	} //manage return
				if ( e.which === 32 )  { return false; }  //manage space
		});

	},

	// Forgotten Password Validation Form
 	// validation techniques described on food.isValid();
	forgottenPassword : function() {
		//validation methods
		$("#forgotten-password").validate({
			//debug: true,
			onkeyup: false,
			errorElement: "span",
			errorPlacement: function(error, element) {
				error.appendTo( element.parent() );
			},
			rules :{
				emailaddress: {
					required: {
						depends : function(a) {  
								// NEED TO CREATE A CORRECT EMAIL ADDRESS CHECK
									return true;					
							}
						},
					email: true
				}
			},
			messages: {
				emailaddress: {
					required: 'You need enter an email address.',
					email : 'Your email address is invalid.'
				}
			},
			success: function(label) {
				//
			}
		});
		
	},
	
	// Reset Password Form
 	// validation techniques described on food.isValid();
	resetPass : function() {
		//validation methods
		$("#reset-password").validate({
			//debug: true,
			//onfocusout: false, // blur removed due to overriding on the check name/email functions
			onkeyup: false,
			errorElement: "span",
			errorPlacement: function(error, element) {
				error.appendTo( element.parent() );
			},
			rules :{
				newpass: {
					required : true
				},
				confirmnewpass: {
					required : true,
					equalTo: "#newpass"
				}
			},
			messages: {
				confirmnewpass : {
					equalTo: 'Your passwords do not match.'
				}
			},
			success: function(label) {
				label.remove(); // if element is valide remove the label
			}
		});
		
	},

	commentCount : function() {
		
		var el = jQuery('#comment-form textarea'); 									// declare form element
		el.parents('form').prepend('<p id="commentCount" class="characterlimit float-r"></p>');	 	// create counter	
		var characterlimit = jQuery('#commentCount'); 										// show Counter
		el.attr('maxlength', 2000);													// set max length because textarea is burried in drupal
		food.charLimitMessage(el,characterlimit); 												// innit the character limit counter 

	}
	

}; // end food array
	
jQuery(document).ready(function () {

	
	// sign up overlay form add class .colorbox-signup to an element with /login
	// http://www.jacklmoore.com/colorbox/
	jQuery(".colorbox-signup").each(function(){
		
		//mobile check
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {

			//if iphone  || ipod
			var iw = 500,  					//innerWidth
				h =	false,					//height
				t = 100,					//top position
				l = 0						//left position

		} else {

			// everything else
			var iw = 500, 					//innerWidth
				h =	402,					//height
				t = false,					//top position
				l = false					//left position	
		}

		//required to pass query string through form
		var href = jQuery(this).attr('href');

		jQuery(this).colorbox({

			// lightbox config
			href: href + ' #main-wrapper', 	// go to anchor 'href' & AJAX in the div#main-wrapper
			transition: 'fade', 			// can be 'none' but that's boring
			initialWidth : 50, 				// loading width
			initialHeight : 50,				// loading height
			opacity:0.75,					// overlay opacity
			scrolling:false,				// scrollbars on ie7
			fastIframe : false,				// loads the content as it has it, if true, waits till popup loaded.

			// variables dependant on above
			innerWidth : iw,
			height : h,
			top : t,
			left : l,

			onComplete : function() {		// load complete callback

				 $ = jQuery 				// hate using jQuery instead of $
				 food.init(food);			// fire the initiation functions for the login form
				 $.colorbox.resize(); 		// resize lightbox for loaded form
				 $('#user-login').attr('action', href); // super required.
				 sendOmnitureTracking('event41');
			}
		}); // end .colorbox()
	
	}); // end .each()
	

}); // end .ready()

function sendOmnitureTracking(key)
{
    omni = s_gi('scrippsfoodtvuk');
    omni.events=key;
    omni.tl();
};
/*!
 * Tiny Carousel 1.9
 * http://www.baijs.nl/tinycarousel
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 01 / 06 / 2011
 * Depends on library: jQuery
 */
 
(function($){
	$.tiny = $.tiny || { };
	
	$.tiny.carousel = {
		options: {	
			start: 1, // where should the carousel start?
			display: 1, // how many blocks do you want to move at 1 time?
			axis: 'x', // vertical or horizontal scroller? ( x || y ).
			controls: true, // show left and right navigation buttons.
			pager: false, // is there a page number navigation present?
			interval: false, // move to another block on intervals.
			intervaltime: 3000, // interval time in milliseconds.
			rewind: false, // If interval is true and rewind is true it will play in reverse if the last slide is reached.
			animation: true, // false is instant, true is animate.
			duration: 1000, // how fast must the animation move in ms?
			callback: null // function that executes after every move.
		}
	};
	
	$.fn.tinycarousel = function(options) {
		var options = $.extend({}, $.tiny.carousel.options, options);
		this.each(function(){ $(this).data('tcl', new Carousel($(this), options)); });
		return this;
	};
	$.fn.tinycarousel_start = function(){ $(this).data('tcl').start(); };
	$.fn.tinycarousel_stop = function(){ $(this).data('tcl').stop(); };
	$.fn.tinycarousel_move = function(iNum){ $(this).data('tcl').move(iNum-1,true); };
	
	function Carousel(root, options){
		var oSelf = this;
		var oViewport = $('.viewport:first', root);
		var oContent = $('.overview:first', root);
		var oPages = oContent.children();
		var oBtnNext = $('.next:first', root);
		var oBtnPrev = $('.prev:first', root);
		var oPager = $('.pager:first', root);
		var iPageSize, iSteps, iCurrent, oTimer, bPause, bForward = true, bAxis = options.axis == 'x';
		
		function initialize(){
			iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
			var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) -1);
			iSteps = Math.max(1, Math.ceil(oPages.length / options.display) - iLeftover);
			iCurrent = Math.min(iSteps, Math.max(1, options.start)) -2;
			oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length));
			oSelf.move(1);
			setEvents();
			return oSelf;
		};
		function setEvents(){
			if(options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0){
				oBtnPrev.click(function(){oSelf.move(-1); return false;});
				oBtnNext.click(function(){oSelf.move( 1); return false;});
			}
			if(options.interval){ root.hover(oSelf.stop,oSelf.start); }
			if(options.pager && oPager.length > 0){ $('a',oPager).click(setPager); }
		};
		function setButtons(){
			if(options.controls){
				oBtnPrev.toggleClass('prevdisable', !(iCurrent > 0));
				oBtnNext.toggleClass('nextdisable', !(iCurrent +1 < iSteps));
			}
			if(options.pager){
				var oNumbers = $('.pagenum', oPager);
				oNumbers.removeClass('active');
				$(oNumbers[iCurrent]).addClass('active');
			}			
		};
		function setPager(oEvent){
			if($(this).hasClass('pagenum')){ oSelf.move(parseInt(this.rel), true); }
			return false;
		};
		function setTimer(){
			if(options.interval && !bPause){
				clearTimeout(oTimer);
				oTimer = setTimeout(function(){
					iCurrent = iCurrent +1 == iSteps ? -1 : iCurrent;
					bForward = iCurrent +1 == iSteps ? false : iCurrent == 0 ? true : bForward;
					oSelf.move(bForward ? 1 : -1);
				}, options.intervaltime);
			}
		};
		this.stop = function(){ clearTimeout(oTimer); bPause = true; };
		this.start = function(){ bPause = false; setTimer(); };
		this.move = function(iDirection, bPublic){
			iCurrent = bPublic ? iDirection : iCurrent += iDirection;
			if(iCurrent > -1 && iCurrent < iSteps){
				var oPosition = {};
				oPosition[bAxis ? 'left' : 'top'] = -(iCurrent * (iPageSize * options.display));	
				oContent.animate(oPosition,{
					queue: false,
					duration: options.animation ? options.duration : 0,
					complete: function(){
						if(typeof options.callback == 'function')
						options.callback.call(this, oPages[iCurrent], iCurrent);
					}
				});
				setButtons();
				setTimer();
			}
		};
		return initialize();
	};
})(jQuery);;
/**
 * @license                                     
 * jQuery Tools 1.2.6 Dateinput - <input type="date" /> for humans
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/form/dateinput/
 *
 * Since: Mar 2010
 * Date:  
 */
(function($, undefined) {	
		
	/* TODO: 
		 preserve today highlighted
	*/
	
	$.tools = $.tools || {version: '1.2.6'};
	
	var instances = [], 
		 tool, 
		 
		 // h=72, j=74, k=75, l=76, down=40, left=37, up=38, right=39
		 KEYS = [75, 76, 38, 39, 74, 72, 40, 37],
		 LABELS = {};
	
	tool = $.tools.dateinput = {
		
		conf: { 
			format: 'mm/dd/yy',
			selectors: false,
			yearRange: [-5, 5],
			lang: 'en',
			offset: [0, 0],
			speed: 0,
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			min: undefined,
			max: undefined,
			trigger: 0,
			toggle: 0,
			editable: 0,
			
			css: {
				
				prefix: 'cal',
				input: 'date',
				
				// ids
				root: 0,
				head: 0,
				title: 0, 
				prev: 0,
				next: 0,
				month: 0,
				year: 0, 
				days: 0,
				
				body: 0,
				weeks: 0,
				today: 0,		
				current: 0,
				
				// classnames
				week: 0, 
				off: 0,
				sunday: 0,
				focus: 0,
				disabled: 0,
				trigger: 0
			}  
		},
		
		localize: function(language, labels) {
			$.each(labels, function(key, val) {
				labels[key] = val.split(",");		
			});
			LABELS[language] = labels;	
		}
		
	};
	
	tool.localize("en", {
		months: 		 'January,February,March,April,May,June,July,August,September,October,November,December', 
		shortMonths: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',  
		days: 		 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', 
		shortDays: 	 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'	  
	});

	
//{{{ private functions
		

	// @return amount of days in certain month
	function dayAm(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}
 
	function zeropad(val, len) {
		val = '' + val;
		len = len || 2;
		while (val.length < len) { val = "0" + val; }
		return val;
	}  
	
	// thanks: http://stevenlevithan.com/assets/misc/date.format.js 
	var Re = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, tmpTag = $("<a/>");
	
	function format(date, fmt, lang) {
		
	  var d = date.getDate(),
			D = date.getDay(),
			m = date.getMonth(),
			y = date.getFullYear(),

			flags = {
				d:    d,
				dd:   zeropad(d),
				ddd:  LABELS[lang].shortDays[D],
				dddd: LABELS[lang].days[D],
				m:    m + 1,
				mm:   zeropad(m + 1),
				mmm:  LABELS[lang].shortMonths[m],
				mmmm: LABELS[lang].months[m],
				yy:   String(y).slice(2),
				yyyy: y
			};

		var ret = fmt.replace(Re, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
		
		// a small trick to handle special characters
		return tmpTag.html(ret).html();
		
	}
	
	function integer(val) {
		return parseInt(val, 10);	
	} 

	function isSameDay(d1, d2)  {
		return d1.getFullYear() === d2.getFullYear() && 
			d1.getMonth() == d2.getMonth() &&
			d1.getDate() == d2.getDate(); 
	}

	function parseDate(val) {
		
		if (val === undefined) { return; }
		if (val.constructor == Date) { return val; } 
		
		if (typeof val == 'string') {
			
			// rfc3339?
			var els = val.split("-");		
			if (els.length == 3) {
				return new Date(integer(els[0]), integer(els[1]) -1, integer(els[2]));
			}	
			
			// invalid offset
			if ( !(/^-?\d+$/).test(val) ) { return; }
			
			// convert to integer
			val = integer(val);
		}
		
		var date = new Date;
		date.setDate(date.getDate() + val);
		return date; 
	}
	
//}}}
		 
	
	function Dateinput(input, conf)  { 

		// variables
		var self = this,  
			 now = new Date,
			 yearNow = now.getFullYear(),
			 css = conf.css,
			 labels = LABELS[conf.lang],
			 root = $("#" + css.root),
			 title = root.find("#" + css.title),
			 trigger,
			 pm, nm, 
			 currYear, currMonth, currDay,
			 value = input.attr("data-value") || conf.value || input.val(), 
			 min = input.attr("min") || conf.min,  
			 max = input.attr("max") || conf.max,
			 opened,
			 original;

		// zero min is not undefined 	 
		if (min === 0) { min = "0"; }
		
		// use sane values for value, min & max		
		value = parseDate(value) || now;  
		
		min   = parseDate(min || new Date(yearNow + conf.yearRange[0], 1, 1));
		max   = parseDate(max || new Date( yearNow + conf.yearRange[1]+ 1, 1, -1));
		
		
		// check that language exists
		if (!labels) { throw "Dateinput: invalid language: " + conf.lang; }
		
		// Replace built-in date input: NOTE: input.attr("type", "text") throws exception by the browser
		if (input.attr("type") == 'date') {
			var original = input.clone(),
          def = original.wrap("<div/>").parent().html(),
          clone = $(def.replace(/type/i, "type=text data-orig-type"));
          
			if (conf.value) clone.val(conf.value);   // jquery 1.6.2 val(undefined) will clear val()
			
			input.replaceWith(clone);
			input = clone;
		}
		
		input.addClass(css.input);
		
		var fire = input.add(self);
			 
		// construct layout
		if (!root.length) {
			
			// root
			root = $('<div><div><a/><div/><a/></div><div><div/><div/></div></div>')
				.hide().css({position: 'absolute'}).attr("id", css.root);			
						
			// elements
			root.children()
				.eq(0).attr("id", css.head).end() 
				.eq(1).attr("id", css.body).children()
					.eq(0).attr("id", css.days).end()
					.eq(1).attr("id", css.weeks).end().end().end()
				.find("a").eq(0).attr("id", css.prev).end().eq(1).attr("id", css.next);		 				  
			
			// title
			title = root.find("#" + css.head).find("div").attr("id", css.title);
			
			// year & month selectors
			if (conf.selectors) {				
				var monthSelector = $("<select/>").attr("id", css.month),
					 yearSelector = $("<select/>").attr("id", css.year);				
				title.html(monthSelector.add(yearSelector));
			}						
			
			// day titles
			var days = root.find("#" + css.days); 
			
			// days of the week
			for (var d = 0; d < 7; d++) { 
				days.append($("<span/>").text(labels.shortDays[(d + conf.firstDay) % 7]));
			}
			
			$("body").append(root);
		}	
		
				
		// trigger icon
		if (conf.trigger) {
			trigger = $("<a/>").attr("href", "#").addClass(css.trigger).click(function(e)  {
				conf.toggle ? self.toggle() : self.show();
				return e.preventDefault();
			}).insertAfter(input);	
		}
		
		
		// layout elements
		var weeks = root.find("#" + css.weeks);
		yearSelector = root.find("#" + css.year);
		monthSelector = root.find("#" + css.month);
			 
		
//{{{ pick
			 			 
		function select(date, conf, e) {  
			
			// current value
			value 	 = date;
			currYear  = date.getFullYear();
			currMonth = date.getMonth();
			currDay	 = date.getDate();				
			
			
			// beforChange
			e = e || $.Event("api");
			e.type = "beforeChange";
			
			fire.trigger(e, [date]);
			if (e.isDefaultPrevented()) { return; }
			
			// formatting			
			input.val(format(date, conf.format, conf.lang));
			
      // change
			e.type = "change";
			fire.trigger(e);
              
			// store value into input
			input.data("date", date);
			
			self.hide(e); 
		}
//}}}
		
		
//{{{ onShow

		function onShow(ev) {
			
			ev.type = "onShow";
			fire.trigger(ev);
			
			$(document).bind("keydown.d", function(e) {
					
				if (e.ctrlKey) { return true; }				
				var key = e.keyCode;			 
				
				// backspace clears the value
				if (key == 8) {
					input.val("");
					return self.hide(e);	
				}
				
				// esc or tab key
				if (key == 27 || key == 9) { return self.hide(e); }						
					
				if ($(KEYS).index(key) >= 0) {
					
					if (!opened) { 
						self.show(e); 
						return e.preventDefault();
					} 
					
					var days = $("#" + css.weeks + " a"), 
						 el = $("." + css.focus),
						 index = days.index(el);
					 
					el.removeClass(css.focus);
					
					if (key == 74 || key == 40) { index += 7; }
					else if (key == 75 || key == 38) { index -= 7; }							
					else if (key == 76 || key == 39) { index += 1; }
					else if (key == 72 || key == 37) { index -= 1; }
					
					
					if (index > 41) {
						 self.addMonth();
						 el = $("#" + css.weeks + " a:eq(" + (index-42) + ")");
					} else if (index < 0) {
						 self.addMonth(-1);
						 el = $("#" + css.weeks + " a:eq(" + (index+42) + ")");
					} else {
						 el = days.eq(index);
					}
					
					el.addClass(css.focus);
					return e.preventDefault();
					
				}
			 
				// pageUp / pageDown
				if (key == 34) { return self.addMonth(); }
				if (key == 33) { return self.addMonth(-1); }
				
				// home
				if (key == 36) { return self.today(); }
				
				// enter
				if (key == 13) {
					if (!$(e.target).is("select")) {
						$("." + css.focus).click();
					}
				}
				
				return $([16, 17, 18, 9]).index(key) >= 0;  				
			});
			
			
			// click outside dateinput
			$(document).bind("click.d", function(e) {					
				var el = e.target;
				
				if (!$(el).parents("#" + css.root).length && el != input[0] && (!trigger || el != trigger[0])) {
					self.hide(e);
				}
				
			}); 
		}
//}}}


		$.extend(self, {

      
			/**
			*   @public
			*   Show the calendar
			*/					
			show: function(e) {
				
				if (input.attr("readonly") || input.attr("disabled") || opened) { return; }
				
				// onBeforeShow
				e = e || $.Event();
				e.type = "onBeforeShow";
				fire.trigger(e);
				if (e.isDefaultPrevented()) { return; }
			
				$.each(instances, function() {
					this.hide();	
				});
				
				opened = true;
				
				// month selector
				monthSelector.unbind("change").change(function() {
					self.setValue(yearSelector.val(), $(this).val());		
				});
				
				// year selector
				yearSelector.unbind("change").change(function() {
					self.setValue($(this).val(), monthSelector.val());		
				});
				
				// prev / next month
				pm = root.find("#" + css.prev).unbind("click").click(function(e) {
					if (!pm.hasClass(css.disabled)) {	
					  self.addMonth(-1);
					}
					return false;
				});
				
				nm = root.find("#" + css.next).unbind("click").click(function(e) {
					if (!nm.hasClass(css.disabled)) {
						self.addMonth();
					}
					return false;
				});	 
				
				// set date
				self.setValue(value);				 
				
				// show calendar
				var pos = input.offset();

				// iPad position fix
				if (/iPad/i.test(navigator.userAgent)) {
					pos.top -= $(window).scrollTop();
				}
				
				root.css({ 
					top: pos.top + input.outerHeight({margins: true}) + conf.offset[0], 
					left: pos.left + conf.offset[1] 
				});
				
				if (conf.speed) {
					root.show(conf.speed, function() {
						onShow(e);			
					});	
				} else {
					root.show();
					onShow(e);
				}
				
				return self;
			}, 

      /**
      *   @public
      *
      *   Set the value of the dateinput
      */
			setValue: function(year, month, day)  {
				
				var date = integer(month) >= -1 ? new Date(integer(year), integer(month), integer(day == undefined || isNaN(day) ? 1 : day)) : 
					year || value;				

				if (date < min) { date = min; }
				else if (date > max) { date = max; }

				// date given as ISO string
				if (typeof year == 'string') { date = parseDate(year); }
				
				year = date.getFullYear();
				month = date.getMonth();
				day = date.getDate(); 
				
				
				// roll year & month
				if (month == -1) {
					month = 11;
					year--;
				} else if (month == 12) {
					month = 0;
					year++;
				} 
				
				if (!opened) { 
					select(date, conf);
					return self; 
				} 				
				
				currMonth = month;
				currYear = year;
				currDay = day;

				// variables
				var tmp = new Date(year, month, 1 - conf.firstDay), begin = tmp.getDay(),
					 days = dayAm(year, month),
					 prevDays = dayAm(year, month - 1),
					 week;	 
				
				// selectors
				if (conf.selectors) { 
					
					// month selector
					monthSelector.empty();
					$.each(labels.months, function(i, m) {					
						if (min < new Date(year, i + 1, 1) && max > new Date(year, i, 0)) {
							monthSelector.append($("<option/>").html(m).attr("value", i));
						}
					});
					
					// year selector
					yearSelector.empty();		
					var yearNow = now.getFullYear();
					
					for (var i = yearNow + conf.yearRange[0];  i < yearNow + conf.yearRange[1]; i++) {
						if (min < new Date(i + 1, 0, 1) && max > new Date(i, 0, 0)) {
							yearSelector.append($("<option/>").text(i));
						}
					}		
					
					monthSelector.val(month);
					yearSelector.val(year);
					
				// title
				} else {
					title.html(labels.months[month] + " " + year);	
				} 	   
					 
				// populate weeks
				weeks.empty();				
				pm.add(nm).removeClass(css.disabled); 
				
				// !begin === "sunday"
				for (var j = !begin ? -7 : 0, a, num; j < (!begin ? 35 : 42); j++) { 
					
					a = $("<a/>");
					
					if (j % 7 === 0) {
						week = $("<div/>").addClass(css.week);
						weeks.append(week);			
					}					
					
					if (j < begin)  { 
						a.addClass(css.off); 
						num = prevDays - begin + j + 1;
						date = new Date(year, month-1, num);
						
					} else if (j >= begin + days)  {
						a.addClass(css.off);	
						num = j - days - begin + 1;
						date = new Date(year, month+1, num);
						
					} else  { 
						num = j - begin + 1;
						date = new Date(year, month, num);  
						
						// current date
						if (isSameDay(value, date)) {
							a.attr("id", css.current).addClass(css.focus);
							
						// today
						} else if (isSameDay(now, date)) {
							a.attr("id", css.today);
						}	 
					}
					
					// disabled
					if (min && date < min) {
						a.add(pm).addClass(css.disabled);						
					}
					
					if (max && date > max) {
						a.add(nm).addClass(css.disabled);						
					}
					
					a.attr("href", "#" + num).text(num).data("date", date);					
					
					week.append(a);
				}
				
				// date picking					
				weeks.find("a").click(function(e) {
					var el = $(this); 
					if (!el.hasClass(css.disabled)) {  
						$("#" + css.current).removeAttr("id");
						el.attr("id", css.current);	 
						select(el.data("date"), conf, e);
					}
					return false;
				});

				// sunday
				if (css.sunday) {
					weeks.find(css.week).each(function() {
						var beg = conf.firstDay ? 7 - conf.firstDay : 0;
						$(this).children().slice(beg, beg + 1).addClass(css.sunday);		
					});	
				} 
				
				return self;
			}, 
	//}}}
	
			setMin: function(val, fit) {
				min = parseDate(val);
				if (fit && value < min) { self.setValue(min); }
				return self;
			},
		
			setMax: function(val, fit) {
				max = parseDate(val);
				if (fit && value > max) { self.setValue(max); }
				return self;
			}, 
			
			today: function() {
				return self.setValue(now);	
			},
			
			addDay: function(amount) {
				return this.setValue(currYear, currMonth, currDay + (amount || 1));		
			},
			
			addMonth: function(amount) {
			  var targetMonth        = currMonth + (amount || 1),
            daysInTargetMonth  = dayAm(currYear, targetMonth),
            targetDay          = currDay <= daysInTargetMonth ? currDay : daysInTargetMonth;
       
        return this.setValue(currYear, targetMonth, targetDay);
			},
			
			addYear: function(amount) {
				return this.setValue(currYear + (amount || 1), currMonth, currDay);	
			},						
			
			destroy: function() {
				input.add(document).unbind("click.d").unbind("keydown.d");
				root.add(trigger).remove();
				input.removeData("dateinput").removeClass(css.input);
				if (original)  { input.replaceWith(original); }
			},
			
			hide: function(e) {				 
				
				if (opened) {  
					
					// onHide 
					e = $.Event();
					e.type = "onHide";
					fire.trigger(e);
					
					$(document).unbind("click.d").unbind("keydown.d");
					
					// cancelled ?
					if (e.isDefaultPrevented()) { return; }
					
					// do the hide
					root.hide();
					opened = false;
				}
				
				return self;
			},
			
			toggle: function(){
			  return self.isOpen() ? self.hide() : self.show();
			},
			
			getConf: function() {
				return conf;	
			},
			
			getInput: function() {
				return input;	
			},
			
			getCalendar: function() {
				return root;	
			},
			
			getValue: function(dateFormat) {
				return dateFormat ? format(value, dateFormat, conf.lang) : value;	
			},
			
			isOpen: function() {
				return opened;	
			}
			
		}); 
		
		// callbacks	
		$.each(['onBeforeShow','onShow','change','onHide'], function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods				
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});

		if (!conf.editable) {
			
			// show dateinput & assign keyboard shortcuts
			input.bind("focus.d click.d", self.show).keydown(function(e) {
	
				var key = e.keyCode;
		
				// open dateinput with navigation keyw
				if (!opened &&  $(KEYS).index(key) >= 0) {
					self.show(e);
					return e.preventDefault();
				} 
				
				// allow tab
				return e.shiftKey || e.ctrlKey || e.altKey || key == 9 ? true : e.preventDefault();   
				
			});
		}
		
		// initial value 		
		if (parseDate(input.val())) {
			select(value, conf);
		}
		
	} 
	
	$.expr[':'].date = function(el) {
		var type = el.getAttribute("type");
		return type && type == 'date' || !!$(el).data("dateinput");
	};
	
	
	$.fn.dateinput = function(conf) {   
		
		// already instantiated
		if (this.data("dateinput")) { return this; } 
		
		// configuration
		conf = $.extend(true, {}, tool.conf, conf);		
		
		// CSS prefix
		$.each(conf.css, function(key, val) {
			if (!val && key != 'prefix') { 
				conf.css[key] = (conf.css.prefix || '') + (val || key);
			}
		});		
	
		var els;
		
		this.each(function() {									
			var el = new Dateinput($(this), conf);
			instances.push(el);
			var input = el.getInput().data("dateinput", el);
			els = els ? els.add(input) : input;	
		});		
	
		return els ? els : this;		
	}; 
	
	
}) (jQuery);
 
	
/**
 * @license 
 * jQuery Tools 1.2.6 Overlay - Overlay base. Extend it.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/overlay/
 *
 * Since: March 2008
 * Date:  
 */
(function($) { 

	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.overlay = {
		
		addEffect: function(name, loadFn, closeFn) {
			effects[name] = [loadFn, closeFn];	
		},
	
		conf: {  
			close: null,	
			closeOnClick: true,
			closeOnEsc: true,			
			closeSpeed: 'fast',
			effect: 'default',
			
			// since 1.2. fixed positioning not supported by IE6
			fixed: !$.browser.msie || $.browser.version > 6, 
			
			left: 'center',		
			load: false, // 1.2
			mask: null,  
			oneInstance: true,
			speed: 'normal',
			target: null, // target element to be overlayed. by default taken from [rel]
			top: '10%'
		}
	};

	
	var instances = [], effects = {};
		
	// the default effect. nice and easy!
	$.tools.overlay.addEffect('default', 
		
		/* 
			onLoad/onClose functions must be called otherwise none of the 
			user supplied callback methods won't be called
		*/
		function(pos, onLoad) {
			
			var conf = this.getConf(),
				 w = $(window);				 
				
			if (!conf.fixed)  {
				pos.top += w.scrollTop();
				pos.left += w.scrollLeft();
			} 
				
			pos.position = conf.fixed ? 'fixed' : 'absolute';
			this.getOverlay().css(pos).fadeIn(conf.speed, onLoad); 
			
		}, function(onClose) {
			this.getOverlay().fadeOut(this.getConf().closeSpeed, onClose); 			
		}		
	);		

	
	function Overlay(trigger, conf) {		
		
		// private variables
		var self = this,
			 fire = trigger.add(self),
			 w = $(window), 
			 closers,            
			 overlay,
			 opened,
			 maskConf = $.tools.expose && (conf.mask || conf.expose),
			 uid = Math.random().toString().slice(10);		
		
			 
		// mask configuration
		if (maskConf) {			
			if (typeof maskConf == 'string') { maskConf = {color: maskConf}; }
			maskConf.closeOnClick = maskConf.closeOnEsc = false;
		}			 
		 
		// get overlay and trigger
		var jq = conf.target || trigger.attr("rel");
		overlay = jq ? $(jq) : null || trigger;	
		
		// overlay not found. cannot continue
		if (!overlay.length) { throw "Could not find Overlay: " + jq; }
		
		// trigger's click event
		if (trigger && trigger.index(overlay) == -1) {
			trigger.click(function(e) {				
				self.load(e);
				return e.preventDefault();
			});
		}   			
		
		// API methods  
		$.extend(self, {

			load: function(e) {
				
				// can be opened only once
				if (self.isOpened()) { return self; }
				
				// find the effect
		 		var eff = effects[conf.effect];
		 		if (!eff) { throw "Overlay: cannot find effect : \"" + conf.effect + "\""; }
				
				// close other instances?
				if (conf.oneInstance) {
					$.each(instances, function() {
						this.close(e);
					});
				}
				
				// onBeforeLoad
				e = e || $.Event();
				e.type = "onBeforeLoad";
				fire.trigger(e);				
				if (e.isDefaultPrevented()) { return self; }				

				// opened
				opened = true;
				
				// possible mask effect
				if (maskConf) { $(overlay).expose(maskConf); }				
				
				// position & dimensions 
				var top = conf.top,					
					 left = conf.left,
					 oWidth = overlay.outerWidth({margin:true}),
					 oHeight = overlay.outerHeight({margin:true}); 
				
				if (typeof top == 'string')  {
					top = top == 'center' ? Math.max((w.height() - oHeight) / 2, 0) : 
						parseInt(top, 10) / 100 * w.height();			
				}				
				
				if (left == 'center') { left = Math.max((w.width() - oWidth) / 2, 0); }

				
		 		// load effect  		 		
				eff[0].call(self, {top: top, left: left}, function() {					
					if (opened) {
						e.type = "onLoad";
						fire.trigger(e);
					}
				}); 				

				// mask.click closes overlay
				if (maskConf && conf.closeOnClick) {
					$.mask.getMask().one("click", self.close); 
				}
				
				// when window is clicked outside overlay, we close
				if (conf.closeOnClick) {
					$(document).bind("click." + uid, function(e) { 
						if (!$(e.target).parents(overlay).length) { 
							self.close(e); 
						}
					});						
				}						
			
				// keyboard::escape
				if (conf.closeOnEsc) { 

					// one callback is enough if multiple instances are loaded simultaneously
					$(document).bind("keydown." + uid, function(e) {
						if (e.keyCode == 27) { 
							self.close(e);	 
						}
					});			
				}

				
				return self; 
			}, 
			
			close: function(e) {

				if (!self.isOpened()) { return self; }
				
				e = e || $.Event();
				e.type = "onBeforeClose";
				fire.trigger(e);				
				if (e.isDefaultPrevented()) { return; }				
				
				opened = false;
				
				// close effect
				effects[conf.effect][1].call(self, function() {
					e.type = "onClose";
					fire.trigger(e); 
				});
				
				// unbind the keyboard / clicking actions
				$(document).unbind("click." + uid).unbind("keydown." + uid);		  
				
				if (maskConf) {
					$.mask.close();		
				}
				 
				return self;
			}, 
			
			getOverlay: function() {
				return overlay;	
			},
			
			getTrigger: function() {
				return trigger;	
			},
			
			getClosers: function() {
				return closers;	
			},			

			isOpened: function()  {
				return opened;
			},
			
			// manipulate start, finish and speeds
			getConf: function() {
				return conf;	
			}			
			
		});
		
		// callbacks	
		$.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) { 
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});
		
		// close button
		closers = overlay.find(conf.close || ".close");		
		
		if (!closers.length && !conf.close) {
			closers = $('<a class="close"></a>');
			overlay.prepend(closers);	
		}		
		
		closers.click(function(e) { 
			self.close(e);  
		});	
		
		// autoload
		if (conf.load) { self.load(); }
		
	}
	
	// jQuery plugin initialization
	$.fn.overlay = function(conf) {   
		
		// already constructed --> return API
		var el = this.data("overlay");
		if (el) { return el; }	  		 
		
		if ($.isFunction(conf)) {
			conf = {onBeforeLoad: conf};	
		}

		conf = $.extend(true, {}, $.tools.overlay.conf, conf);
		
		this.each(function() {		
			el = new Overlay($(this), conf);
			instances.push(el);
			$(this).data("overlay", el);	
		});
		
		return conf.api ? el: this;		
	}; 
	
})(jQuery);

/**
 * @license 
 * jQuery Tools 1.2.6 / Overlay Apple effect. 
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/overlay/apple.html
 *
 * Since: July 2009
 * Date:  
 */
(function($) { 

	// version number
	var t = $.tools.overlay,
		 w = $(window); 
		
	// extend global configuragion with effect specific defaults
	$.extend(t.conf, { 
		start: { 
			top: null,
			left: null
		},
		
		fadeInSpeed: 'fast',
		zIndex: 9999
	});			
	
	// utility function
	function getPosition(el) {
		var p = el.offset();
		return {
			top: p.top + el.height() / 2, 
			left: p.left + el.width() / 2
		}; 
	}
	
//{{{ load 

	var loadEffect = function(pos, onLoad) {
		
		var overlay = this.getOverlay(),
			 conf = this.getConf(),
			 trigger = this.getTrigger(),
			 self = this,
			 oWidth = overlay.outerWidth({margin:true}),
			 img = overlay.data("img"),
			 position = conf.fixed ? 'fixed' : 'absolute';  
		
		
		// growing image is required.
		if (!img) { 
			var bg = overlay.css("backgroundImage");
			
			if (!bg) { 
				throw "background-image CSS property not set for overlay"; 
			}
			
			// url("bg.jpg") --> bg.jpg
			bg = bg.slice(bg.indexOf("(") + 1, bg.indexOf(")")).replace(/\"/g, "");
			overlay.css("backgroundImage", "none");
			
			img = $('<img src="' + bg + '"/>');
			img.css({border:0, display:'none'}).width(oWidth);			
			$('body').append(img); 
			overlay.data("img", img);
		}
		
		// initial top & left
		var itop = conf.start.top || Math.round(w.height() / 2), 
			 ileft = conf.start.left || Math.round(w.width() / 2);
		
		if (trigger) {
			var p = getPosition(trigger);
			itop = p.top;
			ileft = p.left;
		} 
		
		// put overlay into final position
		if (conf.fixed) {
			itop -= w.scrollTop();
			ileft -= w.scrollLeft();
		} else {
			pos.top += w.scrollTop();
			pos.left += w.scrollLeft();				
		}
			
		// initialize background image and make it visible
		img.css({
			position: 'absolute',
			top: itop, 
			left: ileft,
			width: 0,
			zIndex: conf.zIndex
		}).show();
		
		pos.position = position;
		overlay.css(pos);
		
		// begin growing
		img.animate({			
			top: overlay.css("top"), 
			left: overlay.css("left"), 
			width: oWidth}, conf.speed, function() {
			
			// set close button and content over the image
			overlay.css("zIndex", conf.zIndex + 1).fadeIn(conf.fadeInSpeed, function()  { 
					
				if (self.isOpened() && !$(this).index(overlay)) {	
					onLoad.call(); 
				} else {
					overlay.hide();	
				} 
			});
			
		}).css("position", position);
		
	};
//}}}
	
	
	var closeEffect = function(onClose) {

		// variables
		var overlay = this.getOverlay().hide(), 
			 conf = this.getConf(),
			 trigger = this.getTrigger(),
			 img = overlay.data("img"),
			 
			 css = { 
			 	top: conf.start.top, 
			 	left: conf.start.left, 
			 	width: 0 
			 };
		
		// trigger position
		if (trigger) { $.extend(css, getPosition(trigger)); }
		
		
		// change from fixed to absolute position
		if (conf.fixed) {
			img.css({position: 'absolute'})
				.animate({ top: "+=" + w.scrollTop(), left: "+=" + w.scrollLeft()}, 0);
		}
		 
		// shrink image		
		img.animate(css, conf.closeSpeed, onClose);	
	};
	
	
	// add overlay effect	
	t.addEffect("apple", loadEffect, closeEffect); 
	
})(jQuery);	
		
/**
 * @license 
 * jQuery Tools 1.2.6 Rangeinput - HTML5 <input type="range" /> for humans
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/rangeinput/
 *
 * Since: Mar 2010
 * Date:  
 */
(function($) {
	 
	$.tools = $.tools || {version: '1.2.6'};
	 
	var tool;
	
	tool = $.tools.rangeinput = {
		                            
		conf: {
			min: 0,
			max: 100,		// as defined in the standard
			step: 'any', 	// granularity of the value. a non-zero float or int (or "any")
			steps: 0,
			value: 0,			
			precision: undefined,
			vertical: 0,
			keyboard: true,
			progress: false,
			speed: 100,
			
			// set to null if not needed
			css: {
				input:		'range',
				slider: 		'slider',
				progress: 	'progress',
				handle: 		'handle'					
			}

		} 
	};
	
//{{{ fn.drag
		
	/* 
		FULL featured drag and drop. 0.7 kb minified, 0.3 gzipped. done.
		Who told d'n'd is rocket science? Usage:
		
		$(".myelement").drag({y: false}).bind("drag", function(event, x, y) {
			// do your custom thing
		});
		 
		Configuration: 
			x: true, 		// enable horizontal drag
			y: true, 		// enable vertical drag 
			drag: true 		// true = perform drag, false = only fire events 
			
		Events: dragStart, drag, dragEnd. 
	*/
	var doc, draggable;
	
	$.fn.drag = function(conf) {
		
		// disable IE specialities
		document.ondragstart = function () { return false; };
		
		conf = $.extend({x: true, y: true, drag: true}, conf);
	
		doc = doc || $(document).bind("mousedown mouseup", function(e) {
				
			var el = $(e.target);  
			
			// start 
			if (e.type == "mousedown" && el.data("drag")) {
				
				var offset = el.position(),
					 x0 = e.pageX - offset.left, 
					 y0 = e.pageY - offset.top,
					 start = true;    
				
				doc.bind("mousemove.drag", function(e) {  
					var x = e.pageX -x0, 
						 y = e.pageY -y0,
						 props = {};
					
					if (conf.x) { props.left = x; }
					if (conf.y) { props.top = y; } 
					
					if (start) {
						el.trigger("dragStart");
						start = false;
					}
					if (conf.drag) { el.css(props); }
					el.trigger("drag", [y, x]);
					draggable = el;
				}); 
				
				e.preventDefault();
				
			} else {
				
				try {
					if (draggable) {  
						draggable.trigger("dragEnd");  
					}
				} finally { 
					doc.unbind("mousemove.drag");
					draggable = null; 
				}
			} 
							
		});
		
		return this.data("drag", true); 
	};	

//}}}
	

	
	function round(value, precision) {
		var n = Math.pow(10, precision);
		return Math.round(value * n) / n;
	}
	
	// get hidden element's width or height even though it's hidden
	function dim(el, key) {
		var v = parseInt(el.css(key), 10);
		if (v) { return v; }
		var s = el[0].currentStyle; 
		return s && s.width && parseInt(s.width, 10);	
	}
	
	function hasEvent(el) {
		var e = el.data("events");
		return e && e.onSlide;
	}
	
	function RangeInput(input, conf) {
		
		// private variables
		var self = this,  
			 css = conf.css, 
			 root = $("<div><div/><a href='#'/></div>").data("rangeinput", self),	
			 vertical,		
			 value,			// current value
			 origo,			// handle's start point
			 len,				// length of the range
			 pos;				// current position of the handle		
		 
		// create range	 
		input.before(root);	
		
		var handle = root.addClass(css.slider).find("a").addClass(css.handle), 	
			 progress = root.find("div").addClass(css.progress);
		
		// get (HTML5) attributes into configuration
		$.each("min,max,step,value".split(","), function(i, key) {
			var val = input.attr(key);
			if (parseFloat(val)) {
				conf[key] = parseFloat(val, 10);
			}
		});			   
		
		var range = conf.max - conf.min, 
			 step = conf.step == 'any' ? 0 : conf.step,
			 precision = conf.precision;
			 
		if (precision === undefined) {
			try {
				precision = step.toString().split(".")[1].length;
			} catch (err) {
				precision = 0;	
			}
		}  
		
		// Replace built-in range input (type attribute cannot be changed)
		if (input.attr("type") == 'range') {			
			var def = input.clone().wrap("<div/>").parent().html(),
				 clone = $(def.replace(/type/i, "type=text data-orig-type"));
				 
			clone.val(conf.value);
			input.replaceWith(clone);
			input = clone;
		}
		
		input.addClass(css.input);
			 
		var fire = $(self).add(input), fireOnSlide = true;

		
		/**
		 	The flesh and bone of this tool. All sliding is routed trough this.
			
			@param evt types include: click, keydown, blur and api (setValue call)
			@param isSetValue when called trough setValue() call (keydown, blur, api)
			
			vertical configuration gives additional complexity. 
		 */
		function slide(evt, x, val, isSetValue) { 

			// calculate value based on slide position
			if (val === undefined) {
				val = x / len * range;  
				
			// x is calculated based on val. we need to strip off min during calculation	
			} else if (isSetValue) {
				val -= conf.min;	
			}
			
			// increment in steps
			if (step) {
				val = Math.round(val / step) * step;
			}

			// count x based on value or tweak x if stepping is done
			if (x === undefined || step) {
				x = val * len / range;	
			}  
			
			// crazy value?
			if (isNaN(val)) { return self; }       
			
			// stay within range
			x = Math.max(0, Math.min(x, len));  
			val = x / len * range;   

			if (isSetValue || !vertical) {
				val += conf.min;
			}
			
			// in vertical ranges value rises upwards
			if (vertical) {
				if (isSetValue) {
					x = len -x;
				} else {
					val = conf.max - val;	
				}
			}	
			
			// precision
			val = round(val, precision); 
			
			// onSlide
			var isClick = evt.type == "click";
			if (fireOnSlide && value !== undefined && !isClick) {
				evt.type = "onSlide";           
				fire.trigger(evt, [val, x]); 
				if (evt.isDefaultPrevented()) { return self; }  
			}				
			
			// speed & callback
			var speed = isClick ? conf.speed : 0,
				 callback = isClick ? function()  {
					evt.type = "change";
					fire.trigger(evt, [val]);
				 } : null;
			
			if (vertical) {
				handle.animate({top: x}, speed, callback);
				if (conf.progress) { 
					progress.animate({height: len - x + handle.height() / 2}, speed);	
				}				
				
			} else {
				handle.animate({left: x}, speed, callback);
				if (conf.progress) { 
					progress.animate({width: x + handle.width() / 2}, speed); 
				}
			}
			
			// store current value
			value = val; 
			pos = x;			 
			
			// se input field's value
			input.val(val);

			return self;
		} 
		
		
		$.extend(self, {  
			
			getValue: function() {
				return value;	
			},
			
			setValue: function(val, e) {
				init();
				return slide(e || $.Event("api"), undefined, val, true); 
			}, 			  
			
			getConf: function() {
				return conf;	
			},
			
			getProgress: function() {
				return progress;	
			},

			getHandle: function() {
				return handle;	
			},			
			
			getInput: function() {
				return input;	
			}, 
				
			step: function(am, e) {
				e = e || $.Event();
				var step = conf.step == 'any' ? 1 : conf.step;
				self.setValue(value + step * (am || 1), e);	
			},
			
			// HTML5 compatible name
			stepUp: function(am) { 
				return self.step(am || 1);
			},
			
			// HTML5 compatible name
			stepDown: function(am) { 
				return self.step(-am || -1);
			}
			
		});
		
		// callbacks
		$.each("onSlide,change".split(","), function(i, name) {
				
			// from configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;	
			};
		}); 
			

		// dragging		                                  
		handle.drag({drag: false}).bind("dragStart", function() {
		
			/* do some pre- calculations for seek() function. improves performance */			
			init();
			
			// avoid redundant event triggering (= heavy stuff)
			fireOnSlide = hasEvent($(self)) || hasEvent(input);
			
				
		}).bind("drag", function(e, y, x) {        
			
			if (input.is(":disabled")) { return false; } 
			slide(e, vertical ? y : x); 
			
		}).bind("dragEnd", function(e) {
			if (!e.isDefaultPrevented()) {
				e.type = "change";
				fire.trigger(e, [value]);	 
			}
			
		}).click(function(e) {
			return e.preventDefault();	 
		});		
		
		// clicking
		root.click(function(e) { 
			if (input.is(":disabled") || e.target == handle[0]) { 
				return e.preventDefault(); 
			}				  
			init(); 
			var fix = vertical ? handle.height() / 2 : handle.width() / 2;
			slide(e, vertical ? len-origo-fix + e.pageY  : e.pageX -origo -fix);  
		});

		if (conf.keyboard) {
			
			input.keydown(function(e) {
		
				if (input.attr("readonly")) { return; }
				
				var key = e.keyCode,
					 up = $([75, 76, 38, 33, 39]).index(key) != -1,
					 down = $([74, 72, 40, 34, 37]).index(key) != -1;					 
					 
				if ((up || down) && !(e.shiftKey || e.altKey || e.ctrlKey)) {
				
					// UP: 	k=75, l=76, up=38, pageup=33, right=39			
					if (up) {
						self.step(key == 33 ? 10 : 1, e);
						
					// DOWN:	j=74, h=72, down=40, pagedown=34, left=37
					} else if (down) {
						self.step(key == 34 ? -10 : -1, e); 
					} 
					return e.preventDefault();
				} 
			});
		}
		
		
		input.blur(function(e) {	
			var val = $(this).val();
			if (val !== value) {
				self.setValue(val, e);
			}
		});    
		
		
		// HTML5 DOM methods
		$.extend(input[0], { stepUp: self.stepUp, stepDown: self.stepDown});
		
		
		// calculate all dimension related stuff
		function init() { 
		 	vertical = conf.vertical || dim(root, "height") > dim(root, "width");
		 
			if (vertical) {
				len = dim(root, "height") - dim(handle, "height");
				origo = root.offset().top + len; 
				
			} else {
				len = dim(root, "width") - dim(handle, "width");
				origo = root.offset().left;	  
			} 	  
		}
		
		function begin() {
			init();	
			self.setValue(conf.value !== undefined ? conf.value : conf.min);
		} 
		begin();
		
		// some browsers cannot get dimensions upon initialization
		if (!len) {  
			$(window).load(begin);
		}
	}
	
	$.expr[':'].range = function(el) {
		var type = el.getAttribute("type");
		return type && type == 'range' || !!$(el).filter("input").data("rangeinput");
	};
	
	
	// jQuery plugin implementation
	$.fn.rangeinput = function(conf) {

		// already installed
		if (this.data("rangeinput")) { return this; } 
		
		// extend configuration with globals
		conf = $.extend(true, {}, tool.conf, conf);		
		
		var els;
		
		this.each(function() {				
			var el = new RangeInput($(this), $.extend(true, {}, conf));		 
			var input = el.getInput().data("rangeinput", el);
			els = els ? els.add(input) : input;	
		});		
		
		return els ? els : this; 
	};	
	
	
}) (jQuery);

/**
 * @license 
 * jQuery Tools 1.2.6 Scrollable - New wave UI design
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/scrollable.html
 *
 * Since: March 2008
 * Date:  
 */
(function($) { 

	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.scrollable = {
		
		conf: {	
			activeClass: 'active',
			circular: false,
			clonedClass: 'cloned',
			disabledClass: 'disabled',
			easing: 'swing',
			initialIndex: 0,
			item: '> *',
			items: '.items',
			keyboard: true,
			mousewheel: false,
			next: '.next',   
			prev: '.prev', 
			size: 1,
			speed: 400,
			vertical: false,
			touch: true,
			wheelSpeed: 0
		} 
	};
					
	// get hidden element's width or height even though it's hidden
	function dim(el, key) {
		var v = parseInt(el.css(key), 10);
		if (v) { return v; }
		var s = el[0].currentStyle; 
		return s && s.width && parseInt(s.width, 10);	
	}

	function find(root, query) { 
		var el = $(query);
		return el.length < 2 ? el : root.parent().find(query);
	}
	
	var current;		
	
	// constructor
	function Scrollable(root, conf) {   
		
		// current instance
		var self = this, 
			 fire = root.add(self),
			 itemWrap = root.children(),
			 index = 0,
			 vertical = conf.vertical;
				
		if (!current) { current = self; } 
		if (itemWrap.length > 1) { itemWrap = $(conf.items, root); }
		
		
		// in this version circular not supported when size > 1
		if (conf.size > 1) { conf.circular = false; } 
		
		// methods
		$.extend(self, {
				
			getConf: function() {
				return conf;	
			},			
			
			getIndex: function() {
				return index;	
			}, 

			getSize: function() {
				return self.getItems().size();	
			},

			getNaviButtons: function() {
				return prev.add(next);	
			},
			
			getRoot: function() {
				return root;	
			},
			
			getItemWrap: function() {
				return itemWrap;	
			},
			
			getItems: function() {
				return itemWrap.find(conf.item).not("." + conf.clonedClass);	
			},
							
			move: function(offset, time) {
				return self.seekTo(index + offset, time);
			},
			
			next: function(time) {
				return self.move(conf.size, time);	
			},
			
			prev: function(time) {
				return self.move(-conf.size, time);	
			},
			
			begin: function(time) {
				return self.seekTo(0, time);	
			},
			
			end: function(time) {
				return self.seekTo(self.getSize() -1, time);	
			},	
			
			focus: function() {
				current = self;
				return self;
			},
			
			addItem: function(item) {
				item = $(item);
				
				if (!conf.circular)  {
					itemWrap.append(item);
					next.removeClass("disabled");
					
				} else {
					itemWrap.children().last().before(item);
					itemWrap.children().first().replaceWith(item.clone().addClass(conf.clonedClass)); 						
				}
				
				fire.trigger("onAddItem", [item]);
				return self;
			},
			
			
			/* all seeking functions depend on this */		
			seekTo: function(i, time, fn) {	
				
				// ensure numeric index
				if (!i.jquery) { i *= 1; }
				
				// avoid seeking from end clone to the beginning
				if (conf.circular && i === 0 && index == -1 && time !== 0) { return self; }
				
				// check that index is sane				
				if (!conf.circular && i < 0 || i > self.getSize() || i < -1) { return self; }
				
				var item = i;
			
				if (i.jquery) {
					i = self.getItems().index(i);	
					
				} else {
					item = self.getItems().eq(i);
				}  
				
				// onBeforeSeek
				var e = $.Event("onBeforeSeek"); 
				if (!fn) {
					fire.trigger(e, [i, time]);				
					if (e.isDefaultPrevented() || !item.length) { return self; }			
				}  
	
				var props = vertical ? {top: -item.position().top} : {left: -item.position().left};  
				
				index = i;
				current = self;  
				if (time === undefined) { time = conf.speed; }   
				
				itemWrap.animate(props, time, conf.easing, fn || function() { 
					fire.trigger("onSeek", [i]);		
				});	 
				
				return self; 
			}					
			
		});
				
		// callbacks	
		$.each(['onBeforeSeek', 'onSeek', 'onAddItem'], function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) { 
				$(self).bind(name, conf[name]); 
			}
			
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});  
		
		// circular loop
		if (conf.circular) {
			
			var cloned1 = self.getItems().slice(-1).clone().prependTo(itemWrap),
				 cloned2 = self.getItems().eq(1).clone().appendTo(itemWrap);

			cloned1.add(cloned2).addClass(conf.clonedClass);
			
			self.onBeforeSeek(function(e, i, time) {
				
				if (e.isDefaultPrevented()) { return; }
				
				/*
					1. animate to the clone without event triggering
					2. seek to correct position with 0 speed
				*/
				if (i == -1) {
					self.seekTo(cloned1, time, function()  {
						self.end(0);		
					});          
					return e.preventDefault();
					
				} else if (i == self.getSize()) {
					self.seekTo(cloned2, time, function()  {
						self.begin(0);		
					});	
				}
				
			});

			// seek over the cloned item

			// if the scrollable is hidden the calculations for seekTo position
			// will be incorrect (eg, if the scrollable is inside an overlay).
			// ensure the elements are shown, calculate the correct position,
			// then re-hide the elements. This must be done synchronously to
			// prevent the hidden elements being shown to the user.

			// See: https://github.com/jquerytools/jquerytools/issues#issue/87

			var hidden_parents = root.parents().add(root).filter(function () {
				if ($(this).css('display') === 'none') {
					return true;
				}
			});
			if (hidden_parents.length) {
				hidden_parents.show();
				self.seekTo(0, 0, function() {});
				hidden_parents.hide();
			}
			else {
				self.seekTo(0, 0, function() {});
			}

		}
		
		// next/prev buttons
		var prev = find(root, conf.prev).click(function(e) { e.stopPropagation(); self.prev(); }),
			 next = find(root, conf.next).click(function(e) { e.stopPropagation(); self.next(); }); 
		
		if (!conf.circular) {
			self.onBeforeSeek(function(e, i) {
				setTimeout(function() {
					if (!e.isDefaultPrevented()) {
						prev.toggleClass(conf.disabledClass, i <= 0);
						next.toggleClass(conf.disabledClass, i >= self.getSize() -1);
					}
				}, 1);
			});
			
			if (!conf.initialIndex) {
				prev.addClass(conf.disabledClass);	
			}			
		}
			
		if (self.getSize() < 2) {
			prev.add(next).addClass(conf.disabledClass);	
		}
			
		// mousewheel support
		if (conf.mousewheel && $.fn.mousewheel) {
			root.mousewheel(function(e, delta)  {
				if (conf.mousewheel) {
					self.move(delta < 0 ? 1 : -1, conf.wheelSpeed || 50);
					return false;
				}
			});			
		}
		
		// touch event
		if (conf.touch) {
			var touch = {};
			
			itemWrap[0].ontouchstart = function(e) {
				var t = e.touches[0];
				touch.x = t.clientX;
				touch.y = t.clientY;
			};
			
			itemWrap[0].ontouchmove = function(e) {
				
				// only deal with one finger
				if (e.touches.length == 1 && !itemWrap.is(":animated")) {			
					var t = e.touches[0],
						 deltaX = touch.x - t.clientX,
						 deltaY = touch.y - t.clientY;
	
					self[vertical && deltaY > 0 || !vertical && deltaX > 0 ? 'next' : 'prev']();				
					e.preventDefault();
				}
			};
		}
		
		if (conf.keyboard)  {
			
			$(document).bind("keydown.scrollable", function(evt) {

				// skip certain conditions
				if (!conf.keyboard || evt.altKey || evt.ctrlKey || evt.metaKey || $(evt.target).is(":input")) { 
					return; 
				}
				
				// does this instance have focus?
				if (conf.keyboard != 'static' && current != self) { return; }
					
				var key = evt.keyCode;
			
				if (vertical && (key == 38 || key == 40)) {
					self.move(key == 38 ? -1 : 1);
					return evt.preventDefault();
				}
				
				if (!vertical && (key == 37 || key == 39)) {					
					self.move(key == 37 ? -1 : 1);
					return evt.preventDefault();
				}	  
				
			});  
		}
		
		// initial index
		if (conf.initialIndex) {
			self.seekTo(conf.initialIndex, 0, function() {});
		}
	} 

		
	// jQuery plugin implementation
	$.fn.scrollable = function(conf) { 
			
		// already constructed --> return API
		var el = this.data("scrollable");
		if (el) { return el; }		 

		conf = $.extend({}, $.tools.scrollable.conf, conf); 
		
		this.each(function() {			
			el = new Scrollable($(this), conf);
			$(this).data("scrollable", el);	
		});
		
		return conf.api ? el: this; 
		
	};
			
	
})(jQuery);
/**
 * @license 
 * jQuery Tools 1.2.6 / Scrollable Autoscroll
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/scrollable/autoscroll.html
 *
 * Since: September 2009
 * Date:  
 */
(function($) {		

	var t = $.tools.scrollable; 
	
	t.autoscroll = {
		
		conf: {
			autoplay: true,
			interval: 3000,
			autopause: true
		}
	};	
	
	// jQuery plugin implementation
	$.fn.autoscroll = function(conf) { 

		if (typeof conf == 'number') {
			conf = {interval: conf};	
		}
		
		var opts = $.extend({}, t.autoscroll.conf, conf), ret;
		
		this.each(function() {		
				
			var api = $(this).data("scrollable"),
			    root = api.getRoot(),
			    // interval stuff
    			timer, stopped = false;

	    /**
      *
      *   Function to run autoscroll through event binding rather than setInterval
      *   Fixes this bug: http://flowplayer.org/tools/forum/25/72029
      */
      function scroll(){        
        timer = setTimeout(function(){
          api.next();
        }, opts.interval);
      }
			    
			if (api) { ret = api; }
			
			api.play = function() { 
				
				// do not start additional timer if already exists
				if (timer) { return; }
				
				stopped = false;
				
        root.bind('onSeek', scroll);
        scroll();
			};	

			api.pause = function() {
				timer = clearTimeout(timer);  // clear any queued items immediately
        root.unbind('onSeek', scroll);
			};
			
			// resume playing if not stopped
			api.resume = function() {
				stopped || api.play();
			};
			
			// when stopped - mouseover won't restart 
			api.stop = function() {
			  stopped = true;
				api.pause();
			};
		
			/* when mouse enters, autoscroll stops */
			if (opts.autopause) {
				root.add(api.getNaviButtons()).hover(api.pause, api.resume);
			}
			
			if (opts.autoplay) {
				api.play();				
			}

		});
		
		return opts.api ? ret : this;
		
	}; 
	
})(jQuery);		
/**
 * @license 
 * jQuery Tools 1.2.6 / Scrollable Navigator
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/scrollable/navigator.html
 *
 * Since: September 2009
 * Date:  
 */
(function($) {
		
	var t = $.tools.scrollable; 
	
	t.navigator = {
		
		conf: {
			navi: '.navi',
			naviItem: null,		
			activeClass: 'active',
			indexed: false,
			idPrefix: null,
			
			// 1.2
			history: false
		}
	};		
	
	function find(root, query) {
		var el = $(query);
		return el.length < 2 ? el : root.parent().find(query);
	}
	
	// jQuery plugin implementation
	$.fn.navigator = function(conf) {

		// configuration
		if (typeof conf == 'string') { conf = {navi: conf}; } 
		conf = $.extend({}, t.navigator.conf, conf);
		
		var ret;
		
		this.each(function() {
				
			var api = $(this).data("scrollable"),
				 navi = conf.navi.jquery ? conf.navi : find(api.getRoot(), conf.navi), 
				 buttons = api.getNaviButtons(),
				 cls = conf.activeClass,
				 hashed = conf.history && !!history.pushState,
				 size = api.getConf().size;
				 

			// @deprecated stuff
			if (api) { ret = api; }
			
			api.getNaviButtons = function() {
				return buttons.add(navi);	
			}; 
			
			
			if (hashed) {
				history.pushState({i: 0});
				
				$(window).bind("popstate", function(evt) {
					var s = evt.originalEvent.state;
					if (s) { api.seekTo(s.i); }
				});					
			}
			
			function doClick(el, i, e) {
				api.seekTo(i);
				e.preventDefault(); 
				if (hashed) { history.pushState({i: i}); }
			}
			
			function els() {
				return navi.find(conf.naviItem || '> *');	
			}
			
			function addItem(i) {  
				
				var item = $("<" + (conf.naviItem || 'a') + "/>").click(function(e)  {
					doClick($(this), i, e);					
				});
				
				// index number / id attribute
				if (i === 0) {  item.addClass(cls); }
				if (conf.indexed)  { item.text(i + 1); }
				if (conf.idPrefix) { item.attr("id", conf.idPrefix + i); }
				
				return item.appendTo(navi);
			}
			
			
			// generate navigator
			if (els().length) {
				els().each(function(i) { 
					$(this).click(function(e)  {
						doClick($(this), i, e);		
					});
				});
				
			} else {				
				$.each(api.getItems(), function(i) {
					if (i % size == 0) addItem(i); 
				});
			}   
			
			// activate correct entry
			api.onBeforeSeek(function(e, index) {
				setTimeout(function() {
					if (!e.isDefaultPrevented()) {	
						var i = index / size,
							 el = els().eq(i);
							 
						if (el.length) { els().removeClass(cls).eq(i).addClass(cls); }
					}
				}, 1);
			}); 
			
			// new item being added
			api.onAddItem(function(e, item) {
				var i = api.getItems().index(item);
				if (i % size == 0) addItem(i);
			});
			
		});		
		
		return conf.api ? ret : this;
		
	};
	
})(jQuery);			
/**
 * @license 
 * jQuery Tools 1.2.6 Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 *
 * Since: November 2008
 * Date:  
 */  
(function($) {
		
	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.tabs = {
		
		conf: {
			tabs: 'a',
			current: 'current',
			onBeforeClick: null,
			onClick: null, 
			effect: 'default',
			initialIndex: 0,			
			event: 'click',
			rotate: false,
			
      // slide effect
      slideUpSpeed: 400,
      slideDownSpeed: 400,
			
			// 1.2
			history: false
		},
		
		addEffect: function(name, fn) {
			effects[name] = fn;
		}
		
	};
	
	var effects = {
		
		// simple "toggle" effect
		'default': function(i, done) { 
			this.getPanes().hide().eq(i).show();
			done.call();
		}, 
		
		/*
			configuration:
				- fadeOutSpeed (positive value does "crossfading")
				- fadeInSpeed
		*/
		fade: function(i, done) {		
			
			var conf = this.getConf(),
				 speed = conf.fadeOutSpeed,
				 panes = this.getPanes();
			
			if (speed) {
				panes.fadeOut(speed);	
			} else {
				panes.hide();	
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);	
		},
		
		// for basic accordions
		slide: function(i, done) {
		  var conf = this.getConf();
		  
			this.getPanes().slideUp(conf.slideUpSpeed);
			this.getPanes().eq(i).slideDown(conf.slideDownSpeed, done);			 
		}, 

		/**
		 * AJAX effect
		 */
		ajax: function(i, done)  {			
			this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done);	
		}		
	};   	
	
	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	*/
	
	var
	  /**
	  *   @type {Boolean}
	  *
	  *   Mutex to control horizontal animation
	  *   Disables clicking of tabs while animating
	  *   They mess up otherwise as currentPane gets set *after* animation is done
	  */
	  animating,
	  /**
	  *   @type {Number}
	  *   
	  *   Initial width of tab panes
	  */
	  w;
	 
	$.tools.tabs.addEffect("horizontal", function(i, done) {
	  if (animating) return;    // don't allow other animations
	  
	  var nextPane = this.getPanes().eq(i),
	      currentPane = this.getCurrentPane();
	      
		// store original width of a pane into memory
		w || ( w = this.getPanes().eq(0).width() );
		animating = true;
		
		nextPane.show(); // hidden by default
		
		// animate current pane's width to zero
    // animate next pane's width at the same time for smooth animation
    currentPane.animate({width: 0}, {
      step: function(now){
        nextPane.css("width", w-now);
      },
      complete: function(){
        $(this).hide();
        done.call();
        animating = false;
     }
    });
    // Dirty hack...  onLoad, currentPant will be empty and nextPane will be the first pane
    // If this is the case, manually run callback since the animation never occured, and reset animating
    if (!currentPane.length){ 
      done.call(); 
      animating = false;
    }
	});	

	
	function Tabs(root, paneSelector, conf) {
		
		var self = this, 
			 trigger = root.add(this),
			 tabs = root.find(conf.tabs),
			 panes = paneSelector.jquery ? paneSelector : root.children(paneSelector),			 
			 current;
			 
		
		// make sure tabs and panes are found
		if (!tabs.length)  { tabs = root.children(); }
		if (!panes.length) { panes = root.parent().find(paneSelector); }
		if (!panes.length) { panes = $(paneSelector); }
		
		
		// public methods
		$.extend(this, {				
			click: function(i, e) {
			  
				var tab = tabs.eq(i);
				
				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}
								
				if (conf.rotate) {
					var last = tabs.length -1; 
					if (i < 0) { return self.click(last, e); }
					if (i > last) { return self.click(0, e); }						
				}
				
				if (!tab.length) {
					if (current >= 0) { return self; }
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}				
				
				// current tab is being clicked
				if (i === current) { return self; }
				
				// possibility to cancel click action				
				e = e || $.Event();
				e.type = "onBeforeClick";
				trigger.trigger(e, [i]);				
				if (e.isDefaultPrevented()) { return; }

				// call the effect
				effects[conf.effect].call(self, i, function() {
					current = i;
					// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [i]);
				});			
				
				// default behaviour
				tabs.removeClass(conf.current);	
				tab.addClass(conf.current);				
				
				return self;
			},
			
			getConf: function() {
				return conf;	
			},

			getTabs: function() {
				return tabs;	
			},
			
			getPanes: function() {
				return panes;	
			},
			
			getCurrentPane: function() {
				return panes.eq(current);	
			},
			
			getCurrentTab: function() {
				return tabs.eq(current);	
			},
			
			getIndex: function() {
				return current;	
			}, 
			
			next: function() {
				return self.click(current + 1);
			},
			
			prev: function() {
				return self.click(current - 1);	
			},
			
			destroy: function() {
				tabs.unbind(conf.event).removeClass(conf.current);
				panes.find("a[href^=#]").unbind("click.T"); 
				return self;
			}
		
		});

		// callbacks	
		$.each("onBeforeClick,onClick".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) {
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;	
			};
		});
	
		
		if (conf.history && $.fn.history) {
			$.tools.history.init(tabs);
			conf.event = 'history';
		}	
		
		// setup click actions for each tab
		tabs.each(function(i) { 				
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});			
		});
		
		// cross tab anchor link
		panes.find("a[href^=#]").bind("click.T", function(e) {
			self.click($(this).attr("href"), e);		
		}); 
		
		// open initial tab
		if (location.hash && conf.tabs == "a" && root.find("[href=" +location.hash+ "]").length) {
			self.click(location.hash);

		} else {
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		}				
		
	}
	
	
	// jQuery plugin implementation
	$.fn.tabs = function(paneSelector, conf) {
		
		// return existing instance
		var el = this.data("tabs");
		if (el) { 
			el.destroy();	
			this.removeData("tabs");
		}

		if ($.isFunction(conf)) {
			conf = {onBeforeClick: conf};
		}
		
		// setup conf
		conf = $.extend({}, $.tools.tabs.conf, conf);		
		
		
		this.each(function() {				
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("tabs", el); 
		});		
		
		return conf.api ? el: this;		
	};		
		
}) (jQuery); 


/**
 * @license 
 * jQuery Tools 1.2.6 Slideshow - Extend it.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/slideshow.html
 *
 * Since: September 2009
 * Date:  
 */
(function($) {
	
	var tool;
	
	tool = $.tools.tabs.slideshow = { 

		conf: {
			next: '.forward',
			prev: '.backward',
			disabledClass: 'disabled',
			autoplay: false,
			autopause: true,
			interval: 3000, 
			clickable: true,
			api: false
		}
	};  
	
	function Slideshow(root, conf) {
	
		var self = this,
			 fire = root.add(this),
			 tabs = root.data("tabs"),
			 timer, 
			 stopped = true;
		
		// next / prev buttons
		function find(query) {
			var el = $(query);
			return el.length < 2 ? el : root.parent().find(query);	
		}	
		
		var nextButton = find(conf.next).click(function() {
			tabs.next();		
		});
		
		var prevButton = find(conf.prev).click(function() {
			tabs.prev();		
		}); 

    /**
    *
    *   Similar fix for autoscroll animation queue problem
    */
    function next(){
      timer = setTimeout(function(){
        tabs.next();
      }, conf.interval);
    }

		// extend the Tabs API with slideshow methods			
		$.extend(self, {
				
			// return tabs API
			getTabs: function() {
				return tabs;	
			},
			
			getConf: function() {
				return conf;	
			},
				
			play: function() {
	
				// do not start additional timer if already exists
				if (timer) { return self; }	
				
				// onBeforePlay
				var e = $.Event("onBeforePlay");
				fire.trigger(e);				
				if (e.isDefaultPrevented()) { return self; }				
				
				stopped = false;				
				
				// onPlay
				fire.trigger("onPlay");				
				
				fire.bind('onClick', next);
				next();
				
				return self;
			},
		
			pause: function() {
				
				if (!timer) { return self; }

				// onBeforePause
				var e = $.Event("onBeforePause");
				fire.trigger(e);					
				if (e.isDefaultPrevented()) { return self; }		
				
				timer = clearTimeout(timer);
				
				// onPause
				fire.trigger("onPause");	
				
				fire.unbind('onClick', next);
				
				return self;
			},
			
			// resume playing if not stopped
			resume: function() {
				stopped || self.play();
			},
			
			// when stopped - mouseover won't restart 
			stop: function() {					
				self.pause();
				stopped = true;	
			}
			
		});

		// callbacks	
		$.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods				
			self[name] = function(fn) {
				return $(self).bind(name, fn);
			};
		});	
		
	
		/* when mouse enters, slideshow stops */
		if (conf.autopause) {
			tabs.getTabs().add(nextButton).add(prevButton).add(tabs.getPanes()).hover(self.pause, self.resume);
		} 
		
		if (conf.autoplay) {
			self.play();	
		}
		
		if (conf.clickable) {
			tabs.getPanes().click(function()  {
				tabs.next();
			});
		} 
		
		// manage disabling of next/prev buttons
		if (!tabs.getConf().rotate) {
			
			var disabled = conf.disabledClass;
			
			if (!tabs.getIndex()) {
				prevButton.addClass(disabled);
			}
			
			tabs.onBeforeClick(function(e, i)  { 
				prevButton.toggleClass(disabled, !i);
				nextButton.toggleClass(disabled, i == tabs.getTabs().length -1); 
			});
		}  
	}
	
	// jQuery plugin implementation
	$.fn.slideshow = function(conf) {
	
		// return existing instance
		var el = this.data("slideshow");
		if (el) { return el; }
 
		conf = $.extend({}, tool.conf, conf);
		
		this.each(function() {
			el = new Slideshow($(this), conf);
			$(this).data("slideshow", el); 			
		});	
		
		return conf.api ? el : this;
	};
	
})(jQuery); 

/**
 * @license 
 * jQuery Tools 1.2.6 / Expose - Dim the lights
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/expose.html
 *
 * Since: Mar 2010
 * Date:  
 */
(function($) { 	

	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	var tool;
	
	tool = $.tools.expose = {
		
		conf: {	
			maskId: 'exposeMask',
			loadSpeed: 'slow',
			closeSpeed: 'fast',
			closeOnClick: true,
			closeOnEsc: true,
			
			// css settings
			zIndex: 9998,
			opacity: 0.8,
			startOpacity: 0,
			color: '#fff',
			
			// callbacks
			onLoad: null,
			onClose: null
		}
	};

	/* one of the greatest headaches in the tool. finally made it */
	function viewport() {
				
		// the horror case
		if ($.browser.msie) {
			
			// if there are no scrollbars then use window.height
			var d = $(document).height(), w = $(window).height();
			
			return [
				window.innerWidth || 							// ie7+
				document.documentElement.clientWidth || 	// ie6  
				document.body.clientWidth, 					// ie6 quirks mode
				d - w < 20 ? w : d
			];
		} 
		
		// other well behaving browsers
		return [$(document).width(), $(document).height()]; 
	} 
	
	function call(fn) {
		if (fn) { return fn.call($.mask); }
	}
	
	var mask, exposed, loaded, config, overlayIndex;		
	
	
	$.mask = {
		
		load: function(conf, els) {
			
			// already loaded ?
			if (loaded) { return this; }			
			
			// configuration
			if (typeof conf == 'string') {
				conf = {color: conf};	
			}
			
			// use latest config
			conf = conf || config;
			
			config = conf = $.extend($.extend({}, tool.conf), conf);

			// get the mask
			mask = $("#" + conf.maskId);
				
			// or create it
			if (!mask.length) {
				mask = $('<div/>').attr("id", conf.maskId);
				$("body").append(mask);
			}
			
			// set position and dimensions 			
			var size = viewport();
				
			mask.css({				
				position:'absolute', 
				top: 0, 
				left: 0,
				width: size[0],
				height: size[1],
				display: 'none',
				opacity: conf.startOpacity,					 		
				zIndex: conf.zIndex 
			});
			
			if (conf.color) {
				mask.css("backgroundColor", conf.color);	
			}			
			
			// onBeforeLoad
			if (call(conf.onBeforeLoad) === false) {
				return this;
			}
			
			// esc button
			if (conf.closeOnEsc) {						
				$(document).bind("keydown.mask", function(e) {							
					if (e.keyCode == 27) {
						$.mask.close(e);	
					}		
				});			
			}
			
			// mask click closes
			if (conf.closeOnClick) {
				mask.bind("click.mask", function(e)  {
					$.mask.close(e);		
				});					
			}			
			
			// resize mask when window is resized
			$(window).bind("resize.mask", function() {
				$.mask.fit();
			});
			
			// exposed elements
			if (els && els.length) {
				
				overlayIndex = els.eq(0).css("zIndex");

				// make sure element is positioned absolutely or relatively
				$.each(els, function() {
					var el = $(this);
					if (!/relative|absolute|fixed/i.test(el.css("position"))) {
						el.css("position", "relative");		
					}					
				});
			 
				// make elements sit on top of the mask
				exposed = els.css({ zIndex: Math.max(conf.zIndex + 1, overlayIndex == 'auto' ? 0 : overlayIndex)});			
			}	
			
			// reveal mask
			mask.css({display: 'block'}).fadeTo(conf.loadSpeed, conf.opacity, function() {
				$.mask.fit(); 
				call(conf.onLoad);
				loaded = "full";
			});
			
			loaded = true;			
			return this;				
		},
		
		close: function() {
			if (loaded) {
				
				// onBeforeClose
				if (call(config.onBeforeClose) === false) { return this; }
					
				mask.fadeOut(config.closeSpeed, function()  {					
					call(config.onClose);					
					if (exposed) {
						exposed.css({zIndex: overlayIndex});						
					}				
					loaded = false;
				});				
				
				// unbind various event listeners
				$(document).unbind("keydown.mask");
				mask.unbind("click.mask");
				$(window).unbind("resize.mask");  
			}
			
			return this; 
		},
		
		fit: function() {
			if (loaded) {
				var size = viewport();				
				mask.css({width: size[0], height: size[1]});
			}				
		},
		
		getMask: function() {
			return mask;	
		},
		
		isLoaded: function(fully) {
			return fully ? loaded == 'full' : loaded;	
		}, 
		
		getConf: function() {
			return config;	
		},
		
		getExposed: function() {
			return exposed;	
		}		
	};
	
	$.fn.mask = function(conf) {
		$.mask.load(conf);
		return this;		
	};			
	
	$.fn.expose = function(conf) {
		$.mask.load(conf, this);
		return this;			
	};


})(jQuery);
/**
 * @license
 * jQuery Tools 1.2.6 / Flashembed - New wave Flash embedding
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/toolbox/flashembed.html
 *
 * Since : March 2008
 * Date  : 
 */
(function() {

	var IE = document.all,
		 URL = 'http://www.adobe.com/go/getflashplayer',
		 JQUERY = typeof jQuery == 'function',
		 RE = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
		 GLOBAL_OPTS = {
			// very common opts
			width: '100%',
			height: '100%',
			id: "_" + ("" + Math.random()).slice(9),

			// flashembed defaults
			allowfullscreen: true,
			allowscriptaccess: 'always',
			quality: 'high',

			// flashembed specific options
			version: [3, 0],
			onFail: null,
			expressInstall: null,
			w3c: false,
			cachebusting: false
	};

	// version 9 bugfix: (http://blog.deconcept.com/2006/07/28/swfobject-143-released/)
	if (window.attachEvent) {
		window.attachEvent("onbeforeunload", function() {
			__flash_unloadHandler = function() {};
			__flash_savedUnloadHandler = function() {};
		});
	}

	// simple extend
	function extend(to, from) {
		if (from) {
			for (var key in from) {
				if (from.hasOwnProperty(key)) {
					to[key] = from[key];
				}
			}
		}
		return to;
	}

	// used by asString method
	function map(arr, func) {
		var newArr = [];
		for (var i in arr) {
			if (arr.hasOwnProperty(i)) {
				newArr[i] = func(arr[i]);
			}
		}
		return newArr;
	}

	window.flashembed = function(root, opts, conf) {

		// root must be found / loaded
		if (typeof root == 'string') {
			root = document.getElementById(root.replace("#", ""));
		}

		// not found
		if (!root) { return; }

		if (typeof opts == 'string') {
			opts = {src: opts};
		}

		return new Flash(root, extend(extend({}, GLOBAL_OPTS), opts), conf);
	};

	// flashembed "static" API
	var f = extend(window.flashembed, {

		conf: GLOBAL_OPTS,

		getVersion: function()  {
			var fo, ver;

			try {
				ver = navigator.plugins["Shockwave Flash"].description.slice(16);
			} catch(e) {

				try  {
					fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
					ver = fo && fo.GetVariable("$version");

				} catch(err) {
                try  {
                    fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    ver = fo && fo.GetVariable("$version");
                } catch(err2) { }
				}
			}

			ver = RE.exec(ver);
			return ver ? [ver[1], ver[3]] : [0, 0];
		},

		asString: function(obj) {

			if (obj === null || obj === undefined) { return null; }
			var type = typeof obj;
			if (type == 'object' && obj.push) { type = 'array'; }

			switch (type){

				case 'string':
					obj = obj.replace(new RegExp('(["\\\\])', 'g'), '\\$1');

					// flash does not handle %- characters well. transforms "50%" to "50pct" (a dirty hack, I admit)
					obj = obj.replace(/^\s?(\d+\.?\d*)%/, "$1pct");
					return '"' +obj+ '"';

				case 'array':
					return '['+ map(obj, function(el) {
						return f.asString(el);
					}).join(',') +']';

				case 'function':
					return '"function()"';

				case 'object':
					var str = [];
					for (var prop in obj) {
						if (obj.hasOwnProperty(prop)) {
							str.push('"'+prop+'":'+ f.asString(obj[prop]));
						}
					}
					return '{'+str.join(',')+'}';
			}

			// replace ' --> "  and remove spaces
			return String(obj).replace(/\s/g, " ").replace(/\'/g, "\"");
		},

		getHTML: function(opts, conf) {

			opts = extend({}, opts);

			/******* OBJECT tag and it's attributes *******/
			var html = '<object width="' + opts.width +
				'" height="' + opts.height +
				'" id="' + opts.id +
				'" name="' + opts.id + '"';

			if (opts.cachebusting) {
				opts.src += ((opts.src.indexOf("?") != -1 ? "&" : "?") + Math.random());
			}

			if (opts.w3c || !IE) {
				html += ' data="' +opts.src+ '" type="application/x-shockwave-flash"';
			} else {
				html += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
			}

			html += '>';

			/******* nested PARAM tags *******/
			if (opts.w3c || IE) {
				html += '<param name="movie" value="' +opts.src+ '" />';
			}

			// not allowed params
			opts.width = opts.height = opts.id = opts.w3c = opts.src = null;
			opts.onFail = opts.version = opts.expressInstall = null;

			for (var key in opts) {
				if (opts[key]) {
					html += '<param name="'+ key +'" value="'+ opts[key] +'" />';
				}
			}

			/******* FLASHVARS *******/
			var vars = "";

			if (conf) {
				for (var k in conf) {
					if (conf[k]) {
						var val = conf[k];
						vars += k +'='+ encodeURIComponent(/function|object/.test(typeof val) ? f.asString(val) : val) + '&';
					}
				}
				vars = vars.slice(0, -1);
				html += '<param name="flashvars" value=\'' + vars + '\' />';
			}

			html += "</object>";

			return html;
		},

		isSupported: function(ver) {
			return VERSION[0] > ver[0] || VERSION[0] == ver[0] && VERSION[1] >= ver[1];
		}

	});

	var VERSION = f.getVersion();

	function Flash(root, opts, conf) {

		// version is ok
		if (f.isSupported(opts.version)) {
			root.innerHTML = f.getHTML(opts, conf);

		// express install
		} else if (opts.expressInstall && f.isSupported([6, 65])) {
			root.innerHTML = f.getHTML(extend(opts, {src: opts.expressInstall}), {
				MMredirectURL: location.href,
				MMplayerType: 'PlugIn',
				MMdoctitle: document.title
			});

		} else {

			// fail #2.1 custom content inside container
			if (!root.innerHTML.replace(/\s/g, '')) {
				root.innerHTML =
					"<h2>Flash version " + opts.version + " or greater is required</h2>" +
					"<h3>" +
						(VERSION[0] > 0 ? "Your version is " + VERSION : "You have no flash plugin installed") +
					"</h3>" +

					(root.tagName == 'A' ? "<p>Click here to download latest version</p>" :
						"<p>Download latest version from <a href='" + URL + "'>here</a></p>");

				if (root.tagName == 'A') {
					root.onclick = function() {
						location.href = URL;
					};
				}
			}

			// onFail
			if (opts.onFail) {
				var ret = opts.onFail.call(this);
				if (typeof ret == 'string') { root.innerHTML = ret; }
			}
		}

		// http://flowplayer.org/forum/8/18186#post-18593
		if (IE) {
			window[opts.id] = document.getElementById(opts.id);
		}

		// API methods for callback
		extend(this, {

			getRoot: function() {
				return root;
			},

			getOptions: function() {
				return opts;
			},


			getConf: function() {
				return conf;
			},

			getApi: function() {
				return root.firstChild;
			}

		});
	}

	// setup jquery support
	if (JQUERY) {

		// tools version number
		jQuery.tools = jQuery.tools || {version: '1.2.6'};

		jQuery.tools.flashembed = {
			conf: GLOBAL_OPTS
		};

		jQuery.fn.flashembed = function(opts, conf) {
			return this.each(function() {
				jQuery(this).data("flashembed", flashembed(this, opts, conf));
			});
		};
	}

})();

/**
 * @license 
 * jQuery Tools 1.2.6 History "Back button for AJAX apps"
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/history.html
 * 
 * Since: Mar 2010
 * Date:  
 */
(function($) {
		
	var hash, iframe, links, inited;		
	
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.history = {
	
		init: function(els) {
			
			if (inited) { return; }
			
			// IE
			if ($.browser.msie && $.browser.version < '8') {
				
				// create iframe that is constantly checked for hash changes
				if (!iframe) {
					iframe = $("<iframe/>").attr("src", "javascript:false;").hide().get(0);
					$("body").prepend(iframe);
									
					setInterval(function() {
						var idoc = iframe.contentWindow.document, 
							 h = idoc.location.hash;
					
						if (hash !== h) {						
							$(window).trigger("hash", h);
						}
					}, 100);
					
					setIframeLocation(location.hash || '#');
				}

				
			// other browsers scans for location.hash changes directly without iframe hack
			} else { 
				setInterval(function() {
					var h = location.hash;
					if (h !== hash) {
						$(window).trigger("hash", h);
					}						
				}, 100);
			}

			links = !links ? els : links.add(els);
			
			els.click(function(e) {
				var href = $(this).attr("href");
				if (iframe) { setIframeLocation(href); }
				
				// handle non-anchor links
				if (href.slice(0, 1) != "#") {
					location.href = "#" + href;
					return e.preventDefault();		
				}
				
			}); 
			
			inited = true;
		}	
	};  
	

	function setIframeLocation(h) {
		if (h) {
			var doc = iframe.contentWindow.document;
			doc.open().close();	
			doc.location.hash = h;
		}
	} 
		 
	// global histroy change listener
	$(window).bind("hash", function(e, h)  { 
		if (h) {
			links.filter(function() {
			  var href = $(this).attr("href");
			  return href == h || href == h.replace("#", ""); 
			}).trigger("history", [h]);	
		} else {
			links.eq(0).trigger("history", [h]);	
		}

		hash = h;

	});
		
	
	// jQuery plugin implementation
	$.fn.history = function(fn) {
			
		$.tools.history.init(this);

		// return jQuery
		return this.bind("history", fn);		
	};	
		
})(jQuery); 

/**
 * @license 
 * jQuery Tools 1.2.6 Mousewheel
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/mousewheel.html
 * 
 * based on jquery.event.wheel.js ~ rev 1 ~ 
 * Copyright (c) 2008, Three Dub Media
 * http://threedubmedia.com 
 *
 * Since: Mar 2010
 * Date:  
 */
(function($) { 
	
	$.fn.mousewheel = function( fn ){
		return this[ fn ? "bind" : "trigger" ]( "wheel", fn );
	};

	// special event config
	$.event.special.wheel = {
		setup: function() {
			$.event.add( this, wheelEvents, wheelHandler, {} );
		},
		teardown: function(){
			$.event.remove( this, wheelEvents, wheelHandler );
		}
	};

	// events to bind ( browser sniffed... )
	var wheelEvents = !$.browser.mozilla ? "mousewheel" : // IE, opera, safari
		"DOMMouseScroll"+( $.browser.version<"1.9" ? " mousemove" : "" ); // firefox

	// shared event handler
	function wheelHandler( event ) {
		
		switch ( event.type ) {
			
			// FF2 has incorrect event positions
			case "mousemove": 
				return $.extend( event.data, { // store the correct properties
					clientX: event.clientX, clientY: event.clientY,
					pageX: event.pageX, pageY: event.pageY
				});
				
			// firefox	
			case "DOMMouseScroll": 
				$.extend( event, event.data ); // fix event properties in FF2
				event.delta = -event.detail / 3; // normalize delta
				break;
				
			// IE, opera, safari	
			case "mousewheel":				
				event.delta = event.wheelDelta / 120;
				break;
		}
		
		event.type = "wheel"; // hijack the event	
		return $.event.handle.call( this, event, event.delta );
	}
	
})(jQuery); 

/**
 * @license 
 * jQuery Tools 1.2.6 Tooltip - UI essentials
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tooltip/
 *
 * Since: November 2008
 * Date:  
 */
(function($) { 	
	// static constructs
	$.tools = $.tools || {version: '1.2.6'};
	
	$.tools.tooltip = {
		
		conf: { 
			
			// default effect variables
			effect: 'toggle',			
			fadeOutSpeed: "fast",
			predelay: 0,
			delay: 30,
			opacity: 1,			
			tip: 0,
            fadeIE: false, // enables fade effect in IE
			
			// 'top', 'bottom', 'right', 'left', 'center'
			position: ['top', 'center'], 
			offset: [0, 0],
			relative: false,
			cancelDefault: true,
			
			// type to event mapping 
			events: {
				def: 			"mouseenter,mouseleave",
				input: 		"focus,blur",
				widget:		"focus mouseenter,blur mouseleave",
				tooltip:		"mouseenter,mouseleave"
			},
			
			// 1.2
			layout: '<div/>',
			tipClass: 'tooltip'
		},
		
		addEffect: function(name, loadFn, hideFn) {
			effects[name] = [loadFn, hideFn];	
		} 
	};
	
	
	var effects = { 
		toggle: [ 
			function(done) { 
				var conf = this.getConf(), tip = this.getTip(), o = conf.opacity;
				if (o < 1) { tip.css({opacity: o}); }
				tip.show();
				done.call();
			},
			
			function(done) { 
				this.getTip().hide();
				done.call();
			} 
		],
		
		fade: [
			function(done) {
				var conf = this.getConf();
				if (!$.browser.msie || conf.fadeIE) {
					this.getTip().fadeTo(conf.fadeInSpeed, conf.opacity, done);
				}
				else {
					this.getTip().show();
					done();
				}
			},
			function(done) {
				var conf = this.getConf();
				if (!$.browser.msie || conf.fadeIE) {
					this.getTip().fadeOut(conf.fadeOutSpeed, done);
				}
				else {
					this.getTip().hide();
					done();
				}
			}
		]		
	};   

		
	/* calculate tip position relative to the trigger */  	
	function getPosition(trigger, tip, conf) {	

		
		// get origin top/left position 
		var top = conf.relative ? trigger.position().top : trigger.offset().top, 
			 left = conf.relative ? trigger.position().left : trigger.offset().left,
			 pos = conf.position[0];

		top  -= tip.outerHeight() - conf.offset[0];
		left += trigger.outerWidth() + conf.offset[1];
		
		// iPad position fix
		if (/iPad/i.test(navigator.userAgent)) {
			top -= $(window).scrollTop();
		}
		
		// adjust Y		
		var height = tip.outerHeight() + trigger.outerHeight();
		if (pos == 'center') 	{ top += height / 2; }
		if (pos == 'bottom') 	{ top += height; }
		
		
		// adjust X
		pos = conf.position[1]; 	
		var width = tip.outerWidth() + trigger.outerWidth();
		if (pos == 'center') 	{ left -= width / 2; }
		if (pos == 'left')   	{ left -= width; }	 
		
		return {top: top, left: left};
	}		

	
	
	function Tooltip(trigger, conf) {

		var self = this, 
			 fire = trigger.add(self),
			 tip,
			 timer = 0,
			 pretimer = 0, 
			 title = trigger.attr("title"),
			 tipAttr = trigger.attr("data-tooltip"),
			 effect = effects[conf.effect],
			 shown,
				 
			 // get show/hide configuration
			 isInput = trigger.is(":input"), 
			 isWidget = isInput && trigger.is(":checkbox, :radio, select, :button, :submit"),			
			 type = trigger.attr("type"),
			 evt = conf.events[type] || conf.events[isInput ? (isWidget ? 'widget' : 'input') : 'def']; 
		
		
		// check that configuration is sane
		if (!effect) { throw "Nonexistent effect \"" + conf.effect + "\""; }					
		
		evt = evt.split(/,\s*/); 
		if (evt.length != 2) { throw "Tooltip: bad events configuration for " + type; } 
		
		
		// trigger --> show  
		trigger.bind(evt[0], function(e) {

			clearTimeout(timer);
			if (conf.predelay) {
				pretimer = setTimeout(function() { self.show(e); }, conf.predelay);	
				
			} else {
				self.show(e);	
			}
			
		// trigger --> hide
		}).bind(evt[1], function(e)  {
			clearTimeout(pretimer);
			if (conf.delay)  {
				timer = setTimeout(function() { self.hide(e); }, conf.delay);	
				
			} else {
				self.hide(e);		
			}
			
		}); 
		
		
		// remove default title
		if (title && conf.cancelDefault) { 
			trigger.removeAttr("title");
			trigger.data("title", title);			
		}		
		
		$.extend(self, {
				
			show: function(e) {  

				// tip not initialized yet
				if (!tip) {
					
					// data-tooltip 
					if (tipAttr) {
						tip = $(tipAttr);

					// single tip element for all
					} else if (conf.tip) { 
						tip = $(conf.tip).eq(0);
						
					// autogenerated tooltip
					} else if (title) { 
						tip = $(conf.layout).addClass(conf.tipClass).appendTo(document.body)
							.hide().append(title);

					// manual tooltip
					} else {	
						tip = trigger.next();  
						if (!tip.length) { tip = trigger.parent().next(); } 	 
					}
					
					if (!tip.length) { throw "Cannot find tooltip for " + trigger;	}
				} 
			 	
			 	if (self.isShown()) { return self; }  
				
			 	// stop previous animation
			 	tip.stop(true, true); 			 	
			 	
				// get position
				var pos = getPosition(trigger, tip, conf);			
		
				// restore title for single tooltip element
				if (conf.tip) {
					tip.html(trigger.data("title"));
				}

				// onBeforeShow
				e = $.Event();
				e.type = "onBeforeShow";
				fire.trigger(e, [pos]);				
				if (e.isDefaultPrevented()) { return self; }
		
				
				// onBeforeShow may have altered the configuration
				pos = getPosition(trigger, tip, conf);
				
				// set position
				tip.css({position:'absolute', top: pos.top, left: pos.left});					
				
				shown = true;
				
				// invoke effect 
				effect[0].call(self, function() {
					e.type = "onShow";
					shown = 'full';
					fire.trigger(e);		 
				});					

	 	
				// tooltip events       
				var event = conf.events.tooltip.split(/,\s*/);

				if (!tip.data("__set")) {
					
					tip.unbind(event[0]).bind(event[0], function() { 
						clearTimeout(timer);
						clearTimeout(pretimer);
					});
					
					if (event[1] && !trigger.is("input:not(:checkbox, :radio), textarea")) { 					
						tip.unbind(event[1]).bind(event[1], function(e) {
	
							// being moved to the trigger element
							if (e.relatedTarget != trigger[0]) {
								trigger.trigger(evt[1].split(" ")[0]);
							}
						}); 
					} 
					
					// bind agein for if same tip element
					if (!conf.tip) tip.data("__set", true);
				}
				
				return self;
			},
			
			hide: function(e) {

				if (!tip || !self.isShown()) { return self; }
			
				// onBeforeHide
				e = $.Event();
				e.type = "onBeforeHide";
				fire.trigger(e);				
				if (e.isDefaultPrevented()) { return; }
	
				shown = false;
				
				effects[conf.effect][1].call(self, function() {
					e.type = "onHide";
					fire.trigger(e);		 
				});
				
				return self;
			},
			
			isShown: function(fully) {
				return fully ? shown == 'full' : shown;	
			},
				
			getConf: function() {
				return conf;	
			},
				
			getTip: function() {
				return tip;	
			},
			
			getTrigger: function() {
				return trigger;	
			}		

		});		

		// callbacks	
		$.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name])) { 
				$(self).bind(name, conf[name]); 
			}

			// API
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});
		
	}
		
	
	// jQuery plugin implementation
	$.fn.tooltip = function(conf) {
		
		// return existing instance
		var api = this.data("tooltip");
		if (api) { return api; }

		conf = $.extend(true, {}, $.tools.tooltip.conf, conf);
		
		// position can also be given as string
		if (typeof conf.position == 'string') {
			conf.position = conf.position.split(/,?\s/);	
		}
		
		// install tooltip for each entry in jQuery object
		this.each(function() {
			api = new Tooltip($(this), conf); 
			$(this).data("tooltip", api); 
		});
		
		return conf.api ? api: this;		 
	};
		
}) (jQuery);

		

/**
 * @license 
 * jQuery Tools 1.2.6 / Tooltip Dynamic Positioning
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tooltip/dynamic.html
 *
 * Since: July 2009
 * Date:  
 */
(function($) { 

	// version number
	var t = $.tools.tooltip;
	
	t.dynamic = {
		conf: {
			classNames: "top right bottom left"
		}
	};
		
	/* 
	 * See if element is on the viewport. Returns an boolean array specifying which
	 * edges are hidden. Edges are in following order:
	 * 
	 * [top, right, bottom, left]
	 * 
	 * For example following return value means that top and right edges are hidden
	 * 
	 * [true, true, false, false]
	 * 
	 */
	function getCropping(el) {
		
		var w = $(window); 
		var right = w.width() + w.scrollLeft();
		var bottom = w.height() + w.scrollTop();		
		
		return [
			el.offset().top <= w.scrollTop(), 						// top
			right <= el.offset().left + el.width(),				// right
			bottom <= el.offset().top + el.height(),			// bottom
			w.scrollLeft() >= el.offset().left 					// left
		]; 
	}
	
	/*
		Returns true if all edges of an element are on viewport. false if not
		
		@param crop the cropping array returned by getCropping function
	 */
	function isVisible(crop) {
		var i = crop.length;
		while (i--) {
			if (crop[i]) { return false; }	
		}
		return true;
	}
	
	// dynamic plugin
	$.fn.dynamic = function(conf) {
		
		if (typeof conf == 'number') { conf = {speed: conf}; }
		
		conf = $.extend({}, t.dynamic.conf, conf);
		
		var confOrigin = $.extend(true,{},conf),
		    cls = conf.classNames.split(/\s/), 
		    orig;
			
		this.each(function() {		
				
			var api = $(this).tooltip().onBeforeShow(function(e, pos) {				

				// get nessessary variables
				var tip = this.getTip(), tipConf = this.getConf();  

				/*
					We store the original configuration and use it to restore back to the original state.
				*/					
				if (!orig) {
					orig = [
						tipConf.position[0], 
						tipConf.position[1], 
						tipConf.offset[0], 
						tipConf.offset[1], 
						$.extend({}, tipConf)
					];
				}
				
				/*
					display tip in it's default position and by setting visibility to hidden.
					this way we can check whether it will be on the viewport
				*/
				$.extend(tipConf, orig[4]);
				tipConf.position = [orig[0], orig[1]];
				tipConf.offset = [orig[2], orig[3]];

				tip.css({
					visibility: 'hidden',
					position: 'absolute',
					top: pos.top,
					left: pos.left 
				}).show(); 
				
				var conf = $.extend(true,{},confOrigin),
				
				    // now let's see for hidden edges
				    crop = getCropping(tip);		
								
				// possibly alter the configuration
				if (!isVisible(crop)) {
					
					// change the position and add class
					if (crop[2]) { $.extend(tipConf, conf.top);		tipConf.position[0] = 'top'; 		tip.addClass(cls[0]); }
					if (crop[3]) { $.extend(tipConf, conf.right);	tipConf.position[1] = 'right'; 	tip.addClass(cls[1]); }					
					if (crop[0]) { $.extend(tipConf, conf.bottom); 	tipConf.position[0] = 'bottom';	tip.addClass(cls[2]); } 
					if (crop[1]) { $.extend(tipConf, conf.left);		tipConf.position[1] = 'left'; 	tip.addClass(cls[3]); }					
					
					// vertical offset
					if (crop[0] || crop[2]) { tipConf.offset[0] *= -1; }
					
					// horizontal offset
					if (crop[1] || crop[3]) { tipConf.offset[1] *= -1; }
				}  
				
				tip.css({visibility: 'visible'}).hide();
		
			});
			
			// restore positioning as soon as possible
			api.onBeforeShow(function() {
				var c = this.getConf(), tip = this.getTip();		 
				setTimeout(function() { 
					c.position = [orig[0], orig[1]];
					c.offset = [orig[2], orig[3]];
				}, 0);
			});
			
			// remove custom class names and restore original effect
			api.onHide(function() {
				var tip = this.getTip(); 
				tip.removeClass(conf.classNames);
			});
				
			ret = api;
			
		});
		
		return conf.api ? ret : this;
	};	
	
}) (jQuery);
/**
 * @license 
 * jQuery Tools 1.2.6 / Tooltip Slide Effect
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tooltip/slide.html
 *
 * Since: September 2009
 * Date:  
 */
(function($) { 

	// version number
	var t = $.tools.tooltip;
		
	// extend global configuragion with effect specific defaults
	$.extend(t.conf, { 
		direction: 'up', // down, left, right 
		bounce: false,
		slideOffset: 10,
		slideInSpeed: 200,
		slideOutSpeed: 200, 
		slideFade: !$.browser.msie
	});			
	
	// directions for slide effect
	var dirs = {
		up: ['-', 'top'],
		down: ['+', 'top'],
		left: ['-', 'left'],
		right: ['+', 'left']
	};
	
	/* default effect: "slide"  */
	t.addEffect("slide", 
		
		// show effect
		function(done) { 

			// variables
			var conf = this.getConf(), 
				 tip = this.getTip(),
				 params = conf.slideFade ? {opacity: conf.opacity} : {}, 
				 dir = dirs[conf.direction] || dirs.up;

			// direction			
			params[dir[1]] = dir[0] +'='+ conf.slideOffset;
			
			// perform animation
			if (conf.slideFade) { tip.css({opacity:0}); }
			tip.show().animate(params, conf.slideInSpeed, done); 
		}, 
		
		// hide effect
		function(done) {
			
			// variables
			var conf = this.getConf(), 
				 offset = conf.slideOffset,
				 params = conf.slideFade ? {opacity: 0} : {}, 
				 dir = dirs[conf.direction] || dirs.up;
			
			// direction
			var sign = "" + dir[0];
			if (conf.bounce) { sign = sign == '+' ? '-' : '+'; }			
			params[dir[1]] = sign +'='+ offset;			
			
			// perform animation
			this.getTip().animate(params, conf.slideOutSpeed, function()  {
				$(this).hide();
				done.call();		
			});
		}
	);  
	
})(jQuery);	
		
/**
 * @license 
 * jQuery Tools Validator 1.2.6 - HTML5 is here. Now use it.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/form/validator/
 * 
 * Since: Mar 2010
 * Date:  
 */
/*jslint evil: true */ 
(function($) {	

	$.tools = $.tools || {version: '1.2.6'};
		
	// globals
	var typeRe = /\[type=([a-z]+)\]/, 
		numRe = /^-?[0-9]*(\.[0-9]+)?$/,
		dateInput = $.tools.dateinput,
		
		// http://net.tutsplus.com/tutorials/other/8-regular-expressions-you-should-know/
		emailRe = /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,
		urlRe = /^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#&+_\?\/\w \.\-=]*$/i,
		v;
		 
	v = $.tools.validator = {
		
		conf: {   
			grouped: false, 				// show all error messages at once inside the container 
			effect: 'default',			// show/hide effect for error message. only 'default' is built-in
			errorClass: 'invalid',		// input field class name in case of validation error		
			
			// when to check for validity?
			inputEvent: null,				// change, blur, keyup, null 
			errorInputEvent: 'keyup',  // change, blur, keyup, null
			formEvent: 'submit',       // submit, null

			lang: 'en',						// default language for error messages 
			message: '<div/>',
			messageAttr: 'data-message', // name of the attribute for overridden error message
			messageClass: 'error',		// error message element's class name
			offset: [0, 0], 
			position: 'center right',
			singleError: false, 			// validate all inputs at once
			speed: 'normal'				// message's fade-in speed			
		},


		/* The Error Messages */
		messages: {
			"*": { en: "Please correct this value" }		
		},
		
		localize: function(lang, messages) { 
			$.each(messages, function(key, msg)  {
				v.messages[key] = v.messages[key] || {};
				v.messages[key][lang] = msg;		
			});
		},
		
		localizeFn: function(key, messages) {
			v.messages[key] = v.messages[key] || {};
			$.extend(v.messages[key], messages);
		},
		
		/** 
		 * Adds a new validator 
		 */
		fn: function(matcher, msg, fn) {
			
			// no message supplied
			if ($.isFunction(msg)) { 
				fn = msg; 
				
			// message(s) on second argument
			} else {
				if (typeof msg == 'string') { msg = {en: msg}; }
				this.messages[matcher.key || matcher] = msg;
			}

			// check for "[type=xxx]" (not supported by jQuery)
			var test = typeRe.exec(matcher);                                    
			if (test) { matcher = isType(test[1]); }				
			
			// add validator to the arsenal
			fns.push([matcher, fn]);		 
		},

		/* Add new show/hide effect */
		addEffect: function(name, showFn, closeFn) {
			effects[name] = [showFn, closeFn];
		}
		
	};
	
	/* calculate error message position relative to the input */  	
	function getPosition(trigger, el, conf) {	
		
		// get origin top/left position 
		var top = trigger.offset().top, 
			 left = trigger.offset().left,	 
			 pos = conf.position.split(/,?\s+/),
			 y = pos[0],
			 x = pos[1];
		
		top  -= el.outerHeight() - conf.offset[0];
		left += trigger.outerWidth() + conf.offset[1];
		
		
		// iPad position fix
		if (/iPad/i.test(navigator.userAgent)) {
			top -= $(window).scrollTop();
		}
		
		// adjust Y		
		var height = el.outerHeight() + trigger.outerHeight();
		if (y == 'center') 	{ top += height / 2; }
		if (y == 'bottom') 	{ top += height; }
		
		// adjust X
		var width = trigger.outerWidth();
		if (x == 'center') 	{ left -= (width  + el.outerWidth()) / 2; }
		if (x == 'left')  	{ left -= width; }	 
		
		return {top: top, left: left};
	}	
	

	
	// $.is("[type=xxx]") or $.filter("[type=xxx]") not working in jQuery 1.3.2 or 1.4.2
	function isType(type) { 
		function fn() {
			return this.getAttribute("type") == type;  	
		} 
		fn.key = "[type=" + type + "]";
		return fn;
	}	

	
	var fns = [], effects = {
		
		'default' : [
			
			// show errors function
			function(errs) {
				
				var conf = this.getConf();
				
				// loop errors
				$.each(errs, function(i, err) {
						
					// add error class	
					var input = err.input;					
					input.addClass(conf.errorClass);
					
					// get handle to the error container
					var msg = input.data("msg.el"); 
					
					// create it if not present
					if (!msg) { 
						msg = $(conf.message).addClass(conf.messageClass).appendTo(document.body);
						input.data("msg.el", msg);
					}  
					
					// clear the container 
					msg.css({visibility: 'hidden'}).find("p").remove();
					
					// populate messages
					$.each(err.messages, function(i, m) { 
						$("<p/>").html(m).appendTo(msg);			
					});
					
					// make sure the width is not full body width so it can be positioned correctly
					if (msg.outerWidth() == msg.parent().width()) {
						msg.add(msg.find("p")).css({display: 'inline'});		
					} 
					
					// insert into correct position (relative to the field)
					var pos = getPosition(input, msg, conf); 
					 
					msg.css({ visibility: 'visible', position: 'absolute', top: pos.top, left: pos.left })
						.fadeIn(conf.speed);     
				});
						
				
			// hide errors function
			}, function(inputs) {

				var conf = this.getConf();				
				inputs.removeClass(conf.errorClass).each(function() {
					var msg = $(this).data("msg.el");
					if (msg) { msg.css({visibility: 'hidden'}); }
				});
			}
		]  
	};

	
	/* sperial selectors */
	$.each("email,url,number".split(","), function(i, key) {
		$.expr[':'][key] = function(el) {
			return el.getAttribute("type") === key;
		};
	});
	

	/* 
		oninvalid() jQuery plugin. 
		Usage: $("input:eq(2)").oninvalid(function() { ... });
	*/
	$.fn.oninvalid = function( fn ){
		return this[fn ? "bind" : "trigger"]("OI", fn);
	};
	
	
	/******* built-in HTML5 standard validators *********/
	
	v.fn(":email", "Please enter a valid email address", function(el, v) {
		return !v || emailRe.test(v);
	});
	
	v.fn(":url", "Please enter a valid URL", function(el, v) {
		return !v || urlRe.test(v);
	});
	
	v.fn(":number", "Please enter a numeric value.", function(el, v) {
		return numRe.test(v);			
	});
	
	v.fn("[max]", "Please enter a value no larger than $1", function(el, v) {
			
		// skip empty values and dateinputs
		if (v === '' || dateInput && el.is(":date")) { return true; }	
		
		var max = el.attr("max");
		return parseFloat(v) <= parseFloat(max) ? true : [max];
	});
	
	v.fn("[min]", "Please enter a value of at least $1", function(el, v) {

		// skip empty values and dateinputs
		if (v === '' || dateInput && el.is(":date")) { return true; }

		var min = el.attr("min");
		return parseFloat(v) >= parseFloat(min) ? true : [min];
	});
	
	v.fn("[required]", "Please complete this mandatory field.", function(el, v) {
		if (el.is(":checkbox")) { return el.is(":checked"); }
		return !!v; 			
	});
	
	v.fn("[pattern]", function(el) {
		var p = new RegExp("^" + el.attr("pattern") + "$");  
		return p.test(el.val()); 			
	});

	
	function Validator(inputs, form, conf) {		
		
		// private variables
		var self = this, 
			 fire = form.add(self);

		// make sure there are input fields available
		inputs = inputs.not(":button, :image, :reset, :submit");			 
		
    // Prevent default Firefox validation
    form.attr("novalidate", "novalidate");

		// utility function
		function pushMessage(to, matcher, returnValue) {
			
			// only one message allowed
			if (!conf.grouped && to.length) { return; }
			
			// the error message
			var msg;
			
			// substitutions are returned
			if (returnValue === false || $.isArray(returnValue)) {
				msg = v.messages[matcher.key || matcher] || v.messages["*"];
				msg = msg[conf.lang] || v.messages["*"].en;

				// substitution
				var matches = msg.match(/\$\d/g);
				
				if (matches && $.isArray(returnValue)) {
					$.each(matches, function(i) {
						msg = msg.replace(this, returnValue[i]);
					});
				} 					 
				
			// error message is returned directly
			} else {
				msg = returnValue[conf.lang] || returnValue;
			}
			
			to.push(msg);
		}
		
		
		// API methods  
		$.extend(self, {

			getConf: function() {
				return conf;	
			},
			
			getForm: function() {
				return form;		
			},
			
			getInputs: function() {
				return inputs;	
			},		
			
			reflow: function() {
				inputs.each(function()  {
					var input = $(this),
						 msg = input.data("msg.el");
						 
					if (msg) {						
						var pos = getPosition(input, msg, conf);
						msg.css({ top: pos.top, left: pos.left });
					}
				});
				return self;
			},
			
			/* @param e - for internal use only */
			invalidate: function(errs, e) {
				
				// errors are given manually: { fieldName1: 'message1', fieldName2: 'message2' }
				if (!e) {
					var errors = [];
					$.each(errs, function(key, val) {
						var input = inputs.filter("[name='" + key + "']");
						if (input.length) {
							
							// trigger HTML5 ininvalid event
							input.trigger("OI", [val]);
							
							errors.push({ input: input, messages: [val]});				
						}
					});

				  	errs = errors; 
					e = $.Event();
				}
				
				// onFail callback
				e.type = "onFail";					
				fire.trigger(e, [errs]); 
				
				// call the effect
				if (!e.isDefaultPrevented()) {						
					effects[conf.effect][0].call(self, errs, e);													
				}
				
				return self;
			},
			
			reset: function(els) {
				els = els || inputs;
				els.removeClass(conf.errorClass).each(function()  {
					var msg = $(this).data("msg.el");
					if (msg) {
						msg.remove();
						$(this).data("msg.el", null);
					}
				}).unbind(conf.errorInputEvent || '');
				return self;
			},
			
			destroy: function() { 
				form.unbind(conf.formEvent + ".V").unbind("reset.V"); 
				inputs.unbind(conf.inputEvent + ".V").unbind("change.V");
				return self.reset();	
			}, 
			
			
//{{{  checkValidity() - flesh and bone of this tool
						
			/* @returns boolean */
			checkValidity: function(els, e) {
				
				els = els || inputs;    
				els = els.not(":disabled");
				if (!els.length) { return true; }

				e = e || $.Event();

				// onBeforeValidate
				e.type = "onBeforeValidate";
				fire.trigger(e, [els]);				
				if (e.isDefaultPrevented()) { return e.result; }				
					
				// container for errors
				var errs = [];
 
				// loop trough the inputs
				els.not(":radio:not(:checked)").each(function() {
						
					// field and it's error message container						
					var msgs = [], 
						 el = $(this).data("messages", msgs),
						 event = dateInput && el.is(":date") ? "onHide.v" : conf.errorInputEvent + ".v";					
					
					// cleanup previous validation event
					el.unbind(event);
					
					
					// loop all validator functions
					$.each(fns, function() {
						var fn = this, match = fn[0]; 
					
						// match found
						if (el.filter(match).length)  {  
							
							// execute a validator function
							var returnValue = fn[1].call(self, el, el.val());
							
							
							// validation failed. multiple substitutions can be returned with an array
							if (returnValue !== true) {								
								
								// onBeforeFail
								e.type = "onBeforeFail";
								fire.trigger(e, [el, match]);
								if (e.isDefaultPrevented()) { return false; }
								
								// overridden custom message
								var msg = el.attr(conf.messageAttr);
								if (msg) { 
									msgs = [msg];
									return false;
								} else {
									pushMessage(msgs, match, returnValue);
								}
							}							
						}
					});
					
					if (msgs.length) { 
						
						errs.push({input: el, messages: msgs});  
						
						// trigger HTML5 ininvalid event
						el.trigger("OI", [msgs]);
						
						// begin validating upon error event type (such as keyup) 
						if (conf.errorInputEvent) {							
							el.bind(event, function(e) {
								self.checkValidity(el, e);		
							});							
						} 					
					}
					
					if (conf.singleError && errs.length) { return false; }
					
				});
				
				
				// validation done. now check that we have a proper effect at hand
				var eff = effects[conf.effect];
				if (!eff) { throw "Validator: cannot find effect \"" + conf.effect + "\""; }
				
				// errors found
				if (errs.length) {					 
					self.invalidate(errs, e); 
					return false;
					
				// no errors
				} else {
					
					// call the effect
					eff[1].call(self, els, e);
					
					// onSuccess callback
					e.type = "onSuccess";					
					fire.trigger(e, [els]);
					
					els.unbind(conf.errorInputEvent + ".v");
				}
				
				return true;				
			}
//}}} 
			
		});
		
		// callbacks	
		$.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","), function(i, name) {
				
			// configuration
			if ($.isFunction(conf[name]))  {
				$(self).bind(name, conf[name]);	
			}
			
			// API methods				
			self[name] = function(fn) {
				if (fn) { $(self).bind(name, fn); }
				return self;
			};
		});	
		
		
		// form validation
		if (conf.formEvent) {
			form.bind(conf.formEvent + ".V", function(e) {
				if (!self.checkValidity(null, e)) { 
					return e.preventDefault(); 
				}
				// Reset event type and target
				e.target = form;
				e.type = conf.formEvent;
			});
		}
		
		// form reset
		form.bind("reset.V", function()  {
			self.reset();			
		});
		
		// disable browser's default validation mechanism
		if (inputs[0] && inputs[0].validity) {
			inputs.each(function()  {
				this.oninvalid = function() { 
					return false; 
				};		
			});
		}
		
		// Web Forms 2.0 compatibility
		if (form[0]) {
			form[0].checkValidity = self.checkValidity;
		}
		
		// input validation               
		if (conf.inputEvent) {
			inputs.bind(conf.inputEvent + ".V", function(e) {
				self.checkValidity($(this), e);
			});	
		} 
	
		// checkboxes, selects and radios are checked separately
		inputs.filter(":checkbox, select").filter("[required]").bind("change.V", function(e) {
			var el = $(this);
			if (this.checked || (el.is("select") && $(this).val())) {
				effects[conf.effect][1].call(self, el, e); 
			}
		});		
		
		var radios = inputs.filter(":radio").change(function(e) {
			self.checkValidity(radios, e);
		});
		
		// reposition tooltips when window is resized
		$(window).resize(function() {
			self.reflow();		
		});
	}

	
	// jQuery plugin initialization
	$.fn.validator = function(conf) { 
		
		var instance = this.data("validator");
		
		// destroy existing instance
		if (instance) { 
			instance.destroy();
			this.removeData("validator");
		} 
		
		// configuration
		conf = $.extend(true, {}, v.conf, conf);		
		
		// selector is a form		
		if (this.is("form")) {
			return this.each(function() {			
				var form = $(this); 
				instance = new Validator(form.find(":input"), form, conf);	 
				form.data("validator", instance);
			});
			
		} else {
			instance = new Validator(this, this.eq(0).closest("form"), conf);
			return this.data("validator", instance);
		}     
		
	};   
		
})(jQuery);
			

;
/*
 * DC Mega Menu - jQuery mega menu
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */
(function($){

	//define the defaults for the plugin and how to call it	
	$.fn.dcMegaMenu = function(options){
		//set default options  
		var defaults = {
			classParent: 'dc-mega',
			classContainer: 'sub-container',
			classSubParent: 'mega-hdr',
			classSubLink: 'mega-hdr',
			classWidget: 'dc-extra',
			rowItems: 3,
			speed: 'fast',
			effect: 'fade',
			event: 'hover',
			fullWidth: false,
			onLoad : function(){},
            beforeOpen : function(){},
			beforeClose: function(){}
		};

		//call in the default otions
		var options = $.extend(defaults, options);
		var $dcMegaMenuObj = this;

		//act upon the element that is passed into the design    
		return $dcMegaMenuObj.each(function(options){

			var clSubParent = defaults.classSubParent;
			var clSubLink = defaults.classSubLink;
			var clParent = defaults.classParent;
			var clContainer = defaults.classContainer;
			var clWidget = defaults.classWidget;
			
			megaSetup();
			
			function megaOver(){
				var subNav = $('.sub',this);
				$(this).addClass('mega-hover');
				if(defaults.effect == 'fade'){
					$(subNav).fadeIn(defaults.speed);
				}
				if(defaults.effect == 'slide'){
					$(subNav).show(defaults.speed);
				}
				// beforeOpen callback;
				defaults.beforeOpen.call(this);
			}
			function megaAction(obj){
				var subNav = $('.sub',obj);
				$(obj).addClass('mega-hover');
				$(obj).addClass('mega-hover');
				if(defaults.effect == 'fade'){
					$(subNav).fadeIn(defaults.speed);
				}
				if(defaults.effect == 'slide'){
					$(subNav).show(defaults.speed);
				}
				// beforeOpen callback;
				defaults.beforeOpen.call(this);
			}
			function megaOut(){
				var subNav = $('.sub',this);
				$(this).removeClass('mega-hover');
				$(subNav).hide();
				// beforeClose callback;
				defaults.beforeClose.call(this);
			}
			function megaActionClose(obj){
				var subNav = $('.sub',obj);
				$(obj).removeClass('mega-hover');
				$(subNav).hide();
				// beforeClose callback;
				defaults.beforeClose.call(this);
			}
			function megaReset(){
				$('li',$dcMegaMenuObj).removeClass('mega-hover');
				$('.sub',$dcMegaMenuObj).hide();
			}

			function megaSetup(){
				$arrow = '<span class="dc-mega-icon"></span>';
				var clParentLi = clParent+'-li';
				var menuWidth = $dcMegaMenuObj.outerWidth();
				$('> li',$dcMegaMenuObj).each(function(){
					//Set Width of sub
					var $mainSub = $('> ul',this);
					var $primaryLink = $('> a',this);
					if($mainSub.length){
						$primaryLink.addClass(clParent).append($arrow);
						$mainSub.addClass('sub').wrap('<div class="'+clContainer+'" />');
						
						var pos = $(this).position();
						pl = pos.left;
							
						if($('ul',$mainSub).length){
							$(this).addClass(clParentLi);
							$('.'+clContainer,this).addClass('mega');
							$('> li',$mainSub).each(function(){
								if(!$(this).hasClass(clWidget)){
									$(this).addClass('mega-unit');
									if($('> ul',this).length){
										$(this).addClass(clSubParent);
										$('> a',this).addClass(clSubParent+'-a');
									} else {
										$(this).addClass(clSubLink);
										$('> a',this).addClass(clSubLink+'-a');
									}
								}
							});

							// Create Rows
							var hdrs = $('.mega-unit',this);
							rowSize = parseInt(defaults.rowItems);
							for(var i = 0; i < hdrs.length; i+=rowSize){
								hdrs.slice(i, i+rowSize).wrapAll('<div class="row" />');
							}

							// Get Sub Dimensions & Set Row Height
							$mainSub.show();
							
							// Get Position of Parent Item
							var pw = $(this).width();
							var pr = pl + pw;
							
							// Check available right margin
							var mr = menuWidth - pr;
							
							// // Calc Width of Sub Menu
							var subw = $mainSub.outerWidth();
							var totw = $mainSub.parent('.'+clContainer).outerWidth();
							var cpad = totw - subw;
							
							if(defaults.fullWidth == true){
								var fw = menuWidth - cpad;
								$mainSub.parent('.'+clContainer).css({width: fw+'px'});
								$dcMegaMenuObj.addClass('full-width');
							}
							var iw = $('.mega-unit',$mainSub).outerWidth(true);
							var rowItems = $('.row:eq(0) .mega-unit',$mainSub).length;
							var inneriw = iw * rowItems;
							var totiw = inneriw + cpad;
							
							// Set mega header height
							$('.row',this).each(function(){
								$('.mega-unit:last',this).addClass('last');
								var maxValue = undefined;
								$('.mega-unit > a',this).each(function(){
									var val = parseInt($(this).height());
									if (maxValue === undefined || maxValue < val){
										maxValue = val;
									}
								});
								$('.mega-unit > a',this).css('height',maxValue+'px');
								$(this).css('width',inneriw+'px');
							});
							
							// Calc Required Left Margin incl additional required for right align
							
							if(defaults.fullWidth == true){
								params = {left: 0};
							} else {
								
								var ml = mr < ml ? ml + ml - mr : (totiw - pw)/2;
								var subLeft = pl - ml;

								// If Left Position Is Negative Set To Left Margin
								var params = {left: pl+'px', marginLeft: -ml+'px'};
								
								if(subLeft < 0){
									params = {left: 0};
								}else if(mr < ml){
									params = {right: 0};
								}
							}
							$('.'+clContainer,this).css(params);
							
							// Calculate Row Height
							$('.row',$mainSub).each(function(){
								var rh = $(this).height();
								$('.mega-unit',this).css({height: rh+'px'});
								$(this).parent('.row').css({height: rh+'px'});
							});
							$mainSub.hide();
					
						} else {
							$('.'+clContainer,this).addClass('non-mega').css('left',pl+'px');
						}
					}
				});
				// Set position of mega dropdown to bottom of main menu
				var menuHeight = $('> li > a',$dcMegaMenuObj).outerHeight(true);
				$('.'+clContainer,$dcMegaMenuObj).css({top: menuHeight+'px'}).css('z-index','400');
				
				if(defaults.event == 'hover'){
					// HoverIntent Configuration
					var config = {
						sensitivity: 2,
						interval: 100,
						over: megaOver,
						timeout: 400,
						out: megaOut
					};
					$('li',$dcMegaMenuObj).hoverIntent(config);
				}
				
				if(defaults.event == 'click'){
				
					$('body').mouseup(function(e){
						if(!$(e.target).parents('.mega-hover').length){
							megaReset();
						}
					});

					$('> li > a.'+clParent,$dcMegaMenuObj).click(function(e){
						var $parentLi = $(this).parent();
						if($parentLi.hasClass('mega-hover')){
							megaActionClose($parentLi);
						} else {
							megaAction($parentLi);
						}
						e.preventDefault();
					});
				}
				
				// onLoad callback;
				defaults.onLoad.call(this);
			}
		});
	};
})(jQuery);;
/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
*	interval: 50,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 100,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @return    The object (aka "this") that called hoverIntent, and the event object
* @author    Brian Cherne <brian@cherne.net>
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);;
/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			var inputsAndButtons = this.find("input, button");

			// allow suppresing validation by adding a cancel class to the submit button
			inputsAndButtons.filter(".cancel").click(function () {
				validator.cancelSubmit = true;
			});

			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				inputsAndButtons.filter(":submit").click(function () {
					validator.submitButton = this;
				});
			}

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();

				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 )
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event);
			}
			$(this.currentForm)
			       .validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'] ",
						"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() == 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;

			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();

			return meta && meta.messages && meta.messages[method];
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},

		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},

		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;
			// If .prop exists (jQuery >= 1.6), use it to get true/false for required
			if (method === 'required' && typeof $.fn.prop === 'function') {
				value = $element.prop(method);
			} else {
				value = $element.attr(method);
			}
			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	metadataRules: function(element) {
		if (!$.metadata) return {};

		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param == "string" && {url:param} || param;

			if ( this.pending[element.name] ) {
				return "pending";
			}
			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only spaces, digits and dashes
			if (/[^0-9 -]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);

// regex for alphanumerics
jQuery.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var check = false;
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Some of the Characters you have entered are not supported."
);

//regex for first letter NOT a number
jQuery.validator.addMethod("uidValid", function(uid, element) {
        return (this.optional(element) || uid.match(/^[a-z][a-z0-9]*$/i));
    }, "Please specify a valid user id");
;
/**
 * @preserve Galleria v 1.2.5 2011-08-03
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */

/*global jQuery, navigator, Galleria:true, Image */

(function( $ ) {

// some references
var undef,
    window = this,
    doc    = window.document,
    $doc   = $( doc ),
    $win   = $( window ),

// internal constants
    VERSION = 1.25,
    DEBUG = true,
    TIMEOUT = 30000,
    DUMMY = false,
    NAV = navigator.userAgent.toLowerCase(),
    HASH = window.location.hash.replace(/#\//, ''),
    IE = (function() {

        var v = 3,
            div = doc.createElement( 'div' ),
            all = div.getElementsByTagName( 'i' );

        do {
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
        } while ( all[0] );

        return v > 4 ? v : undef;

    }() ),
    DOM = function() {
        return {
            html:  doc.documentElement,
            body:  doc.body,
            head:  doc.getElementsByTagName('head')[0],
            title: doc.title
        };
    },

    // list of Galleria events
    _eventlist = 'data ready thumbnail loadstart loadfinish image play pause progress ' +
              'fullscreen_enter fullscreen_exit idle_enter idle_exit rescale ' +
              'lightbox_open lightbox_close lightbox_image',

    _events = (function() {

        var evs = [];

        $.each( _eventlist.split(' '), function( i, ev ) {
            evs.push( ev );

            // legacy events
            if ( /_/.test( ev ) ) {
                evs.push( ev.replace( /_/g, '' ) );
            }
        });

        return evs;

    }()),

    // legacy options
    // allows the old my_setting syntax and converts it to camel case

    _legacyOptions = function( options ) {

        var n;

        if ( typeof options !== 'object' ) {

            // return whatever it was...
            return options;
        }

        $.each( options, function( key, value ) {
            if ( /^[a-z]+_/.test( key ) ) {
                n = '';
                $.each( key.split('_'), function( i, k ) {
                    n += i > 0 ? k.substr( 0, 1 ).toUpperCase() + k.substr( 1 ) : k;
                });
                options[ n ] = value;
                delete options[ key ];
            }
        });

        return options;
    },

    _patchEvent = function( type ) {

        // allow 'image' instead of Galleria.IMAGE
        if ( $.inArray( type, _events ) > -1 ) {
            return Galleria[ type.toUpperCase() ];
        }

        return type;
    },

    // the internal timeouts object
    // provides helper methods for controlling timeouts
    _timeouts = {

        trunk: {},

        add: function( id, fn, delay, loop ) {
            loop = loop || false;
            this.clear( id );
            if ( loop ) {
                var old = fn;
                fn = function() {
                    old();
                    _timeouts.add( id, fn, delay );
                };
            }
            this.trunk[ id ] = window.setTimeout( fn, delay );
        },

        clear: function( id ) {

            var del = function( i ) {
                window.clearTimeout( this.trunk[ i ] );
                delete this.trunk[ i ];
            }, i;

            if ( !!id && id in this.trunk ) {
                del.call( _timeouts, id );

            } else if ( typeof id === 'undefined' ) {
                for ( i in this.trunk ) {
                    if ( this.trunk.hasOwnProperty( i ) ) {
                        del.call( _timeouts, i );
                    }
                }
            }
        }
    },

    // the internal gallery holder
    _galleries = [],

    // the internal instance holder
    _instances = [],

    // flag for errors
    _hasError = false,

    // canvas holder
    _canvas = false,

    // instance pool, holds the galleries until themeLoad is triggered
    _pool = [],

    // themeLoad trigger
    _themeLoad = function( theme ) {
        Galleria.theme = theme;

        // run the instances we have in the pool
        $.each( _pool, function( i, instance ) {
            instance._init.call( instance );
        });
    },

    // the Utils singleton
    Utils = (function() {

        return {

            array : function( obj ) {
                return Array.prototype.slice.call(obj, 0);
            },

            create : function( className, nodeName ) {
                nodeName = nodeName || 'div';
                var elem = doc.createElement( nodeName );
                elem.className = className;
                return elem;
            },

            getScriptPath : function( src ) {

                // the currently executing script is always the last
                src = src || $('script:last').attr('src');
                var slices = src.split('/');

                if (slices.length == 1) {
                    return '';
                }

                slices.pop();

                return slices.join('/') + '/';
            },

            // CSS3 transitions, added in 1.2.4
            animate : (function() {

                // detect transition
                var transition = (function( style ) {
                    var props = 'transition WebkitTransition MozTransition OTransition'.split(' '),
                        i;

                    // disable css3 animations in opera until stable
                    if ( window.opera ) {
                        return false;
                    }

                    for ( i = 0; props[i]; i++ ) {
                        if ( typeof style[ props[ i ] ] !== 'undefined' ) {
                            return props[ i ];
                        }
                    }
                    return false;
                }(( doc.body || doc.documentElement).style ));

                // map transitionend event
                var endEvent = {
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    WebkitTransition: 'webkitTransitionEnd',
                    transition: 'transitionend'
                }[ transition ];

                // map bezier easing conversions
                var easings = {
                    _default: [0.25, 0.1, 0.25, 1],
                    galleria: [0.645, 0.045, 0.355, 1],
                    galleriaIn: [0.55, 0.085, 0.68, 0.53],
                    galleriaOut: [0.25, 0.46, 0.45, 0.94],
                    ease: [0.25, 0, 0.25, 1],
                    linear: [0.25, 0.25, 0.75, 0.75],
                    'ease-in': [0.42, 0, 1, 1],
                    'ease-out': [0, 0, 0.58, 1],
                    'ease-in-out': [0.42, 0, 0.58, 1]
                };

                // function for setting transition css for all browsers
                var setStyle = function( elem, value, suffix ) {
                    var css = {};
                    suffix = suffix || 'transition';
                    $.each( 'webkit moz ms o'.split(' '), function() {
                        css[ '-' + this + '-' + suffix ] = value;
                    });
                    elem.css( css );
                };

                // clear styles
                var clearStyle = function( elem ) {
                    setStyle( elem, 'none', 'transition' );
                    if ( Galleria.WEBKIT && Galleria.TOUCH ) {
                        setStyle( elem, 'translate3d(0,0,0)', 'transform' );
                        if ( elem.data('revert') ) {
                            elem.css( elem.data('revert') );
                            elem.data('revert', null);
                        }
                    }
                };

                // various variables
                var change, strings, easing, syntax, revert, form, css;

                // the actual animation method
                return function( elem, to, options ) {

                    // extend defaults
                    options = $.extend({
                        duration: 400,
                        complete: function(){},
                        stop: false
                    }, options);

                    // cache jQuery instance
                    elem = $( elem );

                    if ( !options.duration ) {
                        elem.css( to );
                        options.complete.call( elem[0] );
                        return;
                    }

                    // fallback to jQuery's animate if transition is not supported
                    if ( !transition ) {
                        elem.animate(to, options);
                        return;
                    }

                    // stop
                    if ( options.stop ) {
                        // clear the animation
                        elem.unbind( endEvent );
                        clearStyle( elem );
                    }

                    // see if there is a change
                    change = false;
                    $.each( to, function( key, val ) {
                        css = elem.css( key );
                        if ( Utils.parseValue( css ) != Utils.parseValue( val ) ) {
                            change = true;
                        }
                        // also add computed styles for FF
                        elem.css( key, css );
                    });
                    if ( !change ) {
                        window.setTimeout( function() {
                            options.complete.call( elem[0] );
                        }, options.duration );
                        return;
                    }

                    // the css strings to be applied
                    strings = [];

                    // the easing bezier
                    easing = options.easing in easings ? easings[ options.easing ] : easings._default;

                    // the syntax
                    syntax = ' ' + options.duration + 'ms' + ' cubic-bezier('  + easing.join(',') + ')';

                    // add a tiny timeout so that the browsers catches any css changes before animating
                    window.setTimeout(function() {

                        // attach the end event
                        elem.one(endEvent, (function( elem ) {
                            return function() {
                                // clear the animation
                                clearStyle(elem);

                                // run the complete method
                                options.complete.call(elem[0]);
                            };
                        }( elem )));

                        // do the webkit translate3d for better performance on iOS
                        if( Galleria.WEBKIT && Galleria.TOUCH ) {

                            revert = {};
                            form = [0,0,0];

                            $.each( ['left', 'top'], function(i, m) {
                                if ( m in to ) {
                                    form[ i ] = ( Utils.parseValue( to[ m ] ) - Utils.parseValue(elem.css( m )) ) + 'px';
                                    revert[ m ] = to[ m ];
                                    delete to[ m ];
                                }
                            });

                            if ( form[0] || form[1]) {

                                elem.data('revert', revert);

                                strings.push('-webkit-transform' + syntax);

                                // 3d animate
                                setStyle( elem, 'translate3d(' + form.join(',') + ')', 'transform');
                            }
                        }

                        // push the animation props
                        $.each(to, function( p, val ) {
                            strings.push(p + syntax);
                        });

                        // set the animation styles
                        setStyle( elem, strings.join(',') );

                        // animate
                        elem.css( to );

                    },1 );
                };
            }()),

            removeAlpha : function( elem ) {
                if ( IE < 9 && elem ) {

                    var style = elem.style,
                        currentStyle = elem.currentStyle,
                        filter = currentStyle && currentStyle.filter || style.filter || "";

                    if ( /alpha/.test( filter ) ) {
                        style.filter = filter.replace( /alpha\([^)]*\)/i, '' );
                    }
                }
            },

            forceStyles : function( elem, styles ) {
                elem = $(elem);
                if ( elem.attr( 'style' ) ) {
                    elem.data( 'styles', elem.attr( 'style' ) ).removeAttr( 'style' );
                }
                elem.css( styles );
            },

            revertStyles : function() {
                $.each( Utils.array( arguments ), function( i, elem ) {

                    elem = $( elem );
                    elem.removeAttr( 'style' );

                    elem.attr('style',''); // "fixes" webkit bug

                    if ( elem.data( 'styles' ) ) {
                        elem.attr( 'style', elem.data('styles') ).data( 'styles', null );
                    }
                });
            },

            moveOut : function( elem ) {
                Utils.forceStyles( elem, {
                    position: 'absolute',
                    left: -10000
                });
            },

            moveIn : function() {
                Utils.revertStyles.apply( Utils, Utils.array( arguments ) );
            },

            elem : function( elem ) {
                if (elem instanceof $) {
                    return {
                        $: elem,
                        dom: elem[0]
                    };
                } else {
                    return {
                        $: $(elem),
                        dom: elem
                    };
                }
            },

            hide : function( elem, speed, callback ) {

                callback = callback || function(){};

                var el = Utils.elem( elem ),
                    $elem = el.$;

                elem = el.dom;

                // save the value if not exist
                if (! $elem.data('opacity') ) {
                    $elem.data('opacity', $elem.css('opacity') );
                }

                // always hide
                var style = { opacity: 0 };

                if (speed) {

                    var complete = IE < 9 && elem ? function() {
                        Utils.removeAlpha( elem );
                        elem.style.visibility = 'hidden';
                        callback.call( elem );
                    } : callback;

                    Utils.animate( elem, style, {
                        duration: speed,
                        complete: complete,
                        stop: true
                    });
                } else {
                    if ( IE < 9 && elem ) {
                        Utils.removeAlpha( elem );
                        elem.style.visibility = 'hidden';
                    } else {
                        $elem.css( style );
                    }
                }
            },

            show : function( elem, speed, callback ) {

                callback = callback || function(){};

                var el = Utils.elem( elem ),
                    $elem = el.$;

                elem = el.dom;

                // bring back saved opacity
                var saved = parseFloat( $elem.data('opacity') ) || 1,
                    style = { opacity: saved };

                // animate or toggle
                if (speed) {

                    if ( IE < 9 ) {
                        $elem.css('opacity', 0);
                        elem.style.visibility = 'visible';
                    }

                    var complete = IE < 9 && elem ? function() {
                        if ( style.opacity == 1 ) {
                            Utils.removeAlpha( elem );
                        }
                        callback.call( elem );
                    } : callback;

                    Utils.animate( elem, style, {
                        duration: speed,
                        complete: complete,
                        stop: true
                    });
                } else {
                    if ( IE < 9 && style.opacity == 1 && elem ) {
                        Utils.removeAlpha( elem );
                        elem.style.visibility = 'visible';
                    } else {
                        $elem.css( style );
                    }
                }
            },


            // enhanced click for mobile devices
            // we bind a touchend and hijack any click event in the bubble
            // then we execute the click directly and save it in a separate data object for later
            optimizeTouch: (function() {

                var node,
                    evs,
                    fakes,
                    travel,
                    evt = {},
                    handler = function( e ) {
                        e.preventDefault();
                        evt = $.extend({}, e, true);
                    },
                    attach = function() {
                        this.evt = evt;
                    },
                    fake = function() {
                        this.handler.call(node, this.evt);
                    };

                return function( elem ) {

                    $(elem).bind('touchend', function( e ) {

                        node = e.target;
                        travel = true;

                        while( node.parentNode && node != e.currentTarget && travel ) {

                            evs =   $(node).data('events');
                            fakes = $(node).data('fakes');

                            if (evs && 'click' in evs) {

                                travel = false;
                                e.preventDefault();

                                // fake the click and save the event object
                                $(node).click(handler).click();

                                // remove the faked click
                                evs.click.pop();

                                // attach the faked event
                                $.each( evs.click, attach);

                                // save the faked clicks in a new data object
                                $(node).data('fakes', evs.click);

                                // remove all clicks
                                delete evs.click;

                            } else if ( fakes ) {

                                travel = false;
                                e.preventDefault();

                                // fake all clicks
                                $.each( fakes, fake );
                            }

                            // bubble
                            node = node.parentNode;
                        }
                    });
                };
            }()),

            addTimer : function() {
                _timeouts.add.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            clearTimer : function() {
                _timeouts.clear.apply( _timeouts, Utils.array( arguments ) );
                return this;
            },

            wait : function(options) {
                options = $.extend({
                    until : function() { return false; },
                    success : function() {},
                    error : function() { Galleria.raise('Could not complete wait function.'); },
                    timeout: 3000
                }, options);

                var start = Utils.timestamp(),
                    elapsed,
                    now,
                    fn = function() {
                        now = Utils.timestamp();
                        elapsed = now - start;
                        if ( options.until( elapsed ) ) {
                            options.success();
                            return false;
                        }

                        if (now >= start + options.timeout) {
                            options.error();
                            return false;
                        }
                        window.setTimeout(fn, 10);
                    };

                window.setTimeout(fn, 10);
            },

            toggleQuality : function( img, force ) {

                if ( ( IE !== 7 && IE !== 8 ) || !img ) {
                    return;
                }

                if ( typeof force === 'undefined' ) {
                    force = img.style.msInterpolationMode === 'nearest-neighbor';
                }

                img.style.msInterpolationMode = force ? 'bicubic' : 'nearest-neighbor';
            },

            insertStyleTag : function( styles ) {
                var style = doc.createElement( 'style' );
                DOM().head.appendChild( style );

                if ( style.styleSheet ) { // IE
                    style.styleSheet.cssText = styles;
                } else {
                    var cssText = doc.createTextNode( styles );
                    style.appendChild( cssText );
                }
            },

            // a loadscript method that works for local scripts
            loadScript: function( url, callback ) {

                var done = false,
                    script = $('<scr'+'ipt>').attr({
                        src: url,
                        async: true
                    }).get(0);

               // Attach handlers for all browsers
               script.onload = script.onreadystatechange = function() {
                   if ( !done && (!this.readyState ||
                       this.readyState === 'loaded' || this.readyState === 'complete') ) {

                       done = true;

                       // Handle memory leak in IE
                       script.onload = script.onreadystatechange = null;

                       if (typeof callback === 'function') {
                           callback.call( this, this );
                       }
                   }
               };

               DOM().head.appendChild( script );
            },

            // parse anything into a number
            parseValue: function( val ) {
                if (typeof val === 'number') {
                    return val;
                } else if (typeof val === 'string') {
                    var arr = val.match(/\-?\d|\./g);
                    return arr && arr.constructor === Array ? arr.join('')*1 : 0;
                } else {
                    return 0;
                }
            },

            // timestamp abstraction
            timestamp: function() {
                return new Date().getTime();
            },

            // this is pretty crap, but works for now
            // it will add a callback, but it can't guarantee that the styles can be fetched
            // using getComputedStyle further checking needed, possibly a dummy element
            loadCSS : function( href, id, callback ) {

                var link,
                    ready = false,
                    length;

                // look for manual css
                $('link[rel=stylesheet]').each(function() {
                    if ( new RegExp( href ).test( this.href ) ) {
                        link = this;
                        return false;
                    }
                });

                if ( typeof id === 'function' ) {
                    callback = id;
                    id = undef;
                }

                callback = callback || function() {}; // dirty

                // if already present, return
                if ( link ) {
                    callback.call( link, link );
                    return link;
                }

                // save the length of stylesheets to check against
                length = doc.styleSheets.length;

                // add timestamp if DEBUG is true
                if ( DEBUG ) {
                    href += '?' + Utils.timestamp();
                }

                // check for existing id
                if( $('#'+id).length ) {
                    $('#'+id).attr('href', href);
                    length--;
                    ready = true;
                } else {
                    link = $( '<link>' ).attr({
                        rel: 'stylesheet',
                        href: href,
                        id: id
                    }).get(0);

                    window.setTimeout(function() {
                        var styles = $('link[rel="stylesheet"], style');
                        if ( styles.length ) {
                            styles.get(0).parentNode.insertBefore( link, styles[0] );
                        } else {
                            DOM().head.appendChild( link );
                        }

                        if ( IE ) {

                            // IE has a limit of 31 stylesheets in one document
                            if( length >= 31 ) {
                                Galleria.raise( 'You have reached the browser stylesheet limit (31)', true );
                                return;
                            }

                            // todo: test if IE really needs the readyState
                            link.onreadystatechange = function(e) {
                                if ( !ready && (!this.readyState ||
                                    this.readyState === 'loaded' || this.readyState === 'complete') ) {
                                    ready = true;
                                }
                            };
                        } else {
                            // final test via ajax if not local
                            if ( !( new RegExp('file://','i').test( href ) ) ) {
                                $.ajax({
                                    url: href,
                                    success: function() {
                                        ready = true;
                                    },
                                    error: function(e) {
                                        // pass if origin is rejected in chrome for some reason
                                        if( e.isRejected() && Galleria.WEBKIT ) {
                                            ready = true;
                                        }
                                    }
                                });
                            } else {
                                ready = true;
                            }
                        }
                    }, 10);
                }

                if ( typeof callback === 'function' ) {

                    Utils.wait({
                        until: function() {
                            return ready && doc.styleSheets.length > length;
                        },
                        success: function() {
                            window.setTimeout( function() {
                                callback.call( link, link );
                            }, 100);
                        },
                        error: function() {
                            Galleria.raise( 'Theme CSS could not load', true );
                        },
                        timeout: 10000
                    });
                }
                return link;
            }
        };
    }()),

    // the transitions holder
    _transitions = (function() {

        var _slide = function(params, complete, fade, door) {

            var easing = this.getOptions('easing'),
                distance = this.getStageWidth(),
                from = { left: distance * ( params.rewind ? -1 : 1 ) },
                to = { left: 0 };

            if ( fade ) {
                from.opacity = 0;
                to.opacity = 1;
            }

            $(params.next).css(from);

            Utils.animate(params.next, to, {
                duration: params.speed,
                complete: (function( elems ) {
                    return function() {
                        complete();
                        elems.css({
                            left: 0
                        });
                    };
                }( $( params.next ).add( params.prev ) )),
                queue: false,
                easing: easing
            });

            if (door) {
                params.rewind = !params.rewind;
            }

            if (params.prev) {

                from = { left: 0 };
                to = { left: distance * ( params.rewind ? 1 : -1 ) };

                if ( fade ) {
                    from.opacity = 1;
                    to.opacity = 0;
                }

                $(params.prev).css(from);
                Utils.animate(params.prev, to, {
                    duration: params.speed,
                    queue: false,
                    easing: easing,
                    complete: function() {
                        $(this).css('opacity', 0);
                    }
                });
            }
        };

        return {

            fade: function(params, complete) {
                $(params.next).css('opacity',0).show();
                Utils.animate(params.next, {
                    opacity: 1
                },{
                    duration: params.speed,
                    complete: complete
                });
                if (params.prev) {
                    $(params.prev).css('opacity',1).show();
                    Utils.animate(params.prev, {
                        opacity: 0
                    },{
                        duration: params.speed
                    });
                }
            },

            flash: function(params, complete) {
                $(params.next).css('opacity', 0);
                if (params.prev) {
                    Utils.animate( params.prev, {
                        opacity: 0
                    },{
                        duration: params.speed/2,
                        complete: function() {
                            Utils.animate( params.next, {
                                opacity:1
                            },{
                                duration: params.speed,
                                complete: complete
                            });
                        }
                    });
                } else {
                    Utils.animate( params.next, {
                        opacity: 1
                    },{
                        duration: params.speed,
                        complete: complete
                    });
                }
            },

            pulse: function(params, complete) {
                if (params.prev) {
                    $(params.prev).hide();
                }
                $(params.next).css('opacity', 0).show();
                Utils.animate(params.next, {
                    opacity:1
                },{
                    duration: params.speed,
                    complete: complete
                });
            },

            slide: function(params, complete) {
                _slide.apply( this, Utils.array( arguments ) );
            },

            fadeslide: function(params, complete) {
                _slide.apply( this, Utils.array( arguments ).concat( [true] ) );
            },

            doorslide: function(params, complete) {
                _slide.apply( this, Utils.array( arguments ).concat( [false, true] ) );
            }
        };
    }());

/**
    The main Galleria class

    @class
    @constructor

    @example var gallery = new Galleria();

    @author http://aino.se

    @requires jQuery

*/

Galleria = function() {

    var self = this;

    // the theme used
    this._theme = undef;

    // internal options
    this._options = {};

    // flag for controlling play/pause
    this._playing = false;

    // internal interval for slideshow
    this._playtime = 5000;

    // internal variable for the currently active image
    this._active = null;

    // the internal queue, arrayified
    this._queue = { length: 0 };

    // the internal data array
    this._data = [];

    // the internal dom collection
    this._dom = {};

    // the internal thumbnails array
    this._thumbnails = [];

    // the internal layers array
    this._layers = [];

    // internal init flag
    this._initialized = false;

    // internal firstrun flag
    this._firstrun = false;

    // global stagewidth/height
    this._stageWidth = 0;
    this._stageHeight = 0;

    // target holder
    this._target = undef;

    // instance id
    this._id = Math.random();

    // add some elements
    var divs =  'container stage images image-nav image-nav-left image-nav-right ' +
                'info info-text info-title info-description ' +
                'thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right ' +
                'loader counter tooltip',
        spans = 'current total';

    $.each( divs.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId );
    });

    $.each( spans.split(' '), function( i, elemId ) {
        self._dom[ elemId ] = Utils.create( 'galleria-' + elemId, 'span' );
    });

    // the internal keyboard object
    // keeps reference of the keybinds and provides helper methods for binding keys
    var keyboard = this._keyboard = {

        keys : {
            'UP': 38,
            'DOWN': 40,
            'LEFT': 37,
            'RIGHT': 39,
            'RETURN': 13,
            'ESCAPE': 27,
            'BACKSPACE': 8,
            'SPACE': 32
        },

        map : {},

        bound: false,

        press: function(e) {
            var key = e.keyCode || e.which;
            if ( key in keyboard.map && typeof keyboard.map[key] === 'function' ) {
                keyboard.map[key].call(self, e);
            }
        },

        attach: function(map) {

            var key, up;

            for( key in map ) {
                if ( map.hasOwnProperty( key ) ) {
                    up = key.toUpperCase();
                    if ( up in keyboard.keys ) {
                        keyboard.map[ keyboard.keys[up] ] = map[key];
                    } else {
                        keyboard.map[ up ] = map[key];
                    }
                }
            }
            if ( !keyboard.bound ) {
                keyboard.bound = true;
                $doc.bind('keydown', keyboard.press);
            }
        },

        detach: function() {
            keyboard.bound = false;
            keyboard.map = {};
            $doc.unbind('keydown', keyboard.press);
        }
    };

    // internal controls for keeping track of active / inactive images
    var controls = this._controls = {

        0: undef,

        1: undef,

        active : 0,

        swap : function() {
            controls.active = controls.active ? 0 : 1;
        },

        getActive : function() {
            return controls[ controls.active ];
        },

        getNext : function() {
            return controls[ 1 - controls.active ];
        }
    };

    // internal carousel object
    var carousel = this._carousel = {

        // shortcuts
        next: self.$('thumb-nav-right'),
        prev: self.$('thumb-nav-left'),

        // cache the width
        width: 0,

        // track the current position
        current: 0,

        // cache max value
        max: 0,

        // save all hooks for each width in an array
        hooks: [],

        // update the carousel
        // you can run this method anytime, f.ex on window.resize
        update: function() {
            var w = 0,
                h = 0,
                hooks = [0];

            $.each( self._thumbnails, function( i, thumb ) {
                if ( thumb.ready ) {
                    w += thumb.outerWidth || $( thumb.container ).outerWidth( true );
                    hooks[ i+1 ] = w;
                    h = Math.max( h, thumb.outerHeight || $( thumb.container).outerHeight( true ) );
                }
            });

            self.$( 'thumbnails' ).css({
                width: w,
                height: h
            });

            carousel.max = w;
            carousel.hooks = hooks;
            carousel.width = self.$( 'thumbnails-list' ).width();
            carousel.setClasses();

            self.$( 'thumbnails-container' ).toggleClass( 'galleria-carousel', w > carousel.width );

            // one extra calculation
            carousel.width = self.$( 'thumbnails-list' ).width();

            // todo: fix so the carousel moves to the left
        },

        bindControls: function() {

            var i;

            carousel.next.bind( 'click', function(e) {
                e.preventDefault();

                if ( self._options.carouselSteps === 'auto' ) {

                    for ( i = carousel.current; i < carousel.hooks.length; i++ ) {
                        if ( carousel.hooks[i] - carousel.hooks[ carousel.current ] > carousel.width ) {
                            carousel.set(i - 2);
                            break;
                        }
                    }

                } else {
                    carousel.set( carousel.current + self._options.carouselSteps);
                }
            });

            carousel.prev.bind( 'click', function(e) {
                e.preventDefault();

                if ( self._options.carouselSteps === 'auto' ) {

                    for ( i = carousel.current; i >= 0; i-- ) {
                        if ( carousel.hooks[ carousel.current ] - carousel.hooks[i] > carousel.width ) {
                            carousel.set( i + 2 );
                            break;
                        } else if ( i === 0 ) {
                            carousel.set( 0 );
                            break;
                        }
                    }
                } else {
                    carousel.set( carousel.current - self._options.carouselSteps );
                }
            });
        },

        // calculate and set positions
        set: function( i ) {
            i = Math.max( i, 0 );
            while ( carousel.hooks[i - 1] + carousel.width >= carousel.max && i >= 0 ) {
                i--;
            }
            carousel.current = i;
            carousel.animate();
        },

        // get the last position
        getLast: function(i) {
            return ( i || carousel.current ) - 1;
        },

        // follow the active image
        follow: function(i) {

            //don't follow if position fits
            if ( i === 0 || i === carousel.hooks.length - 2 ) {
                carousel.set( i );
                return;
            }

            // calculate last position
            var last = carousel.current;
            while( carousel.hooks[last] - carousel.hooks[ carousel.current ] <
                   carousel.width && last <= carousel.hooks.length ) {
                last ++;
            }

            // set position
            if ( i - 1 < carousel.current ) {
                carousel.set( i - 1 );
            } else if ( i + 2 > last) {
                carousel.set( i - last + carousel.current + 2 );
            }
        },

        // helper for setting disabled classes
        setClasses: function() {
            carousel.prev.toggleClass( 'disabled', !carousel.current );
            carousel.next.toggleClass( 'disabled', carousel.hooks[ carousel.current ] + carousel.width >= carousel.max );
        },

        // the animation method
        animate: function(to) {
            carousel.setClasses();
            var num = carousel.hooks[ carousel.current ] * -1;

            if ( isNaN( num ) ) {
                return;
            }

            Utils.animate(self.get( 'thumbnails' ), {
                left: num
            },{
                duration: self._options.carouselSpeed,
                easing: self._options.easing,
                queue: false
            });
        }
    };

    // tooltip control
    // added in 1.2
    var tooltip = this._tooltip = {

        initialized : false,

        open: false,

        init: function() {

            tooltip.initialized = true;

            var css = '.galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3' +
                      'opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}';

            Utils.insertStyleTag(css);

            self.$( 'tooltip' ).css('opacity', 0.8);
            Utils.hide( self.get('tooltip') );

        },

        // move handler
        move: function( e ) {
            var mouseX = self.getMousePosition(e).x,
                mouseY = self.getMousePosition(e).y,
                $elem = self.$( 'tooltip' ),
                x = mouseX,
                y = mouseY,
                height = $elem.outerHeight( true ) + 1,
                width = $elem.outerWidth( true ),
                limitY = height + 15;

            var maxX = self.$( 'container').width() - width - 2,
                maxY = self.$( 'container').height() - height - 2;

            if ( !isNaN(x) && !isNaN(y) ) {

                x += 10;
                y -= 30;

                x = Math.max( 0, Math.min( maxX, x ) );
                y = Math.max( 0, Math.min( maxY, y ) );

                if( mouseY < limitY ) {
                    y = limitY;
                }

                $elem.css({ left: x, top: y });
            }
        },

        // bind elements to the tooltip
        // you can bind multiple elementIDs using { elemID : function } or { elemID : string }
        // you can also bind single DOM elements using bind(elem, string)
        bind: function( elem, value ) {

            // todo: revise if alternative tooltip is needed for mobile devices
            if (Galleria.TOUCH) {
                return;
            }

            if (! tooltip.initialized ) {
                tooltip.init();
            }

            var hover = function( elem, value) {

                tooltip.define( elem, value );

                $( elem ).hover(function() {

                    Utils.clearTimer('switch_tooltip');
                    self.$('container').unbind( 'mousemove', tooltip.move ).bind( 'mousemove', tooltip.move ).trigger( 'mousemove' );
                    tooltip.show( elem );

                    Galleria.utils.addTimer( 'tooltip', function() {
                        self.$( 'tooltip' ).stop().show().animate({
                            opacity:1
                        });
                        tooltip.open = true;

                    }, tooltip.open ? 0 : 500);

                }, function() {

                    self.$( 'container' ).unbind( 'mousemove', tooltip.move );
                    Utils.clearTimer( 'tooltip' );

                    self.$( 'tooltip' ).stop().animate({
                        opacity: 0
                    }, 200, function() {

                        self.$( 'tooltip' ).hide();

                        Utils.addTimer('switch_tooltip', function() {
                            tooltip.open = false;
                        }, 1000);
                    });
                });
            };

            if ( typeof value === 'string' ) {
                hover( ( elem in self._dom ? self.get( elem ) : elem ), value );
            } else {
                // asume elemID here
                $.each( elem, function( elemID, val ) {
                    hover( self.get(elemID), val );
                });
            }
        },

        show: function( elem ) {

            elem = $( elem in self._dom ? self.get(elem) : elem );

            var text = elem.data( 'tt' ),
                mouseup = function( e ) {

                    // attach a tiny settimeout to make sure the new tooltip is filled
                    window.setTimeout( (function( ev ) {
                        return function() {
                            tooltip.move( ev );
                        };
                    }( e )), 10);

                    elem.unbind( 'mouseup', mouseup );

                };

            text = typeof text === 'function' ? text() : text;

            if ( ! text ) {
                return;
            }

            self.$( 'tooltip' ).html( text.replace(/\s/, '&nbsp;') );

            // trigger mousemove on mouseup in case of click
            elem.bind( 'mouseup', mouseup );
        },

        define: function( elem, value ) {

            // we store functions, not strings
            if (typeof value !== 'function') {
                var s = value;
                value = function() {
                    return s;
                };
            }

            elem = $( elem in self._dom ? self.get(elem) : elem ).data('tt', value);

            tooltip.show( elem );

        }
    };

    // internal fullscreen control
    // added in 1.195
    // still kind of experimental
    var fullscreen = this._fullscreen = {

        scrolled: 0,

        crop: self._options.imageCrop,

        active: false,

        keymap: self._keyboard.map,

        enter: function(callback) {

            fullscreen.active = true;

            // hide the image until rescale is complete
            Utils.hide( self.getActiveImage() );

            self.$( 'container' ).addClass( 'fullscreen' );

            fullscreen.scrolled = $win.scrollTop();

            // begin styleforce
            Utils.forceStyles(self.get('container'), {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10000
            });

            var htmlbody = {
                    height: '100%',
                    overflow: 'hidden',
                    margin:0,
                    padding:0
                },

                data = self.getData();

            Utils.forceStyles( DOM().html, htmlbody );
            Utils.forceStyles( DOM().body, htmlbody );

            // temporarily attach some keys
            // save the old ones first in a cloned object
            fullscreen.keymap = $.extend({}, self._keyboard.map);

            self.attachKeyboard({
                escape: self.exitFullscreen,
                right: self.next,
                left: self.prev
            });

            if ( self._options.fullscreenCrop !== undef ) {
                self._options.imageCrop = self._options.fullscreenCrop;
            }

            // swap to big image if it's different from the display image

            if ( data && data.big && data.image !== data.big ) {
                var big    = new Galleria.Picture(),
                    cached = big.isCached( data.big ),
                    index  = self.getIndex(),
                    thumb  = self._thumbnails[ index ];

                self.trigger( {
                    type: Galleria.LOADSTART,
                    cached: cached,
                    rewind: false,
                    index: index,
                    imageTarget: self.getActiveImage(),
                    thumbTarget: thumb
                });

                big.load( data.big, function( big ) {
                    self._scaleImage( big, {
                        complete: function( big ) {
                            self.trigger({
                                type: Galleria.LOADFINISH,
                                cached: cached,
                                index: index,
                                rewind: false,
                                imageTarget: big.image,
                                thumbTarget: thumb
                            });
                            var image = self._controls.getActive().image;
                            if ( image ) {
                                $( image ).width( big.image.width ).height( big.image.height )
                                    .attr( 'style', $( big.image ).attr('style') )
                                    .attr( 'src', big.image.src );
                            }
                        }
                    });
                });
            }

            // init the first rescale and attach callbacks
            self.rescale(function() {

                Utils.addTimer('fullscreen_enter', function() {
                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if (typeof callback === 'function') {
                        callback.call( self );
                    }

                }, 100);

                self.trigger( Galleria.FULLSCREEN_ENTER );
            });

            // bind the scaling to the resize event
            $win.resize( function() {
                fullscreen.scale();
            } );
        },

        scale : function() {
            self.rescale();
        },

        exit: function(callback) {

            fullscreen.active = false;

            Utils.hide( self.getActiveImage() );

            self.$('container').removeClass( 'fullscreen' );

            // revert all styles
            Utils.revertStyles( self.get('container'), DOM().html, DOM().body );

            // scroll back
            window.scrollTo(0, fullscreen.scrolled);

            // detach all keyboard events and apply the old keymap
            self.detachKeyboard();
            self.attachKeyboard( fullscreen.keymap );

            if ( self._options.fullscreenCrop !== undef ) {
                self._options.imageCrop = fullscreen.crop;
            }

            self.rescale(function() {
                Utils.addTimer('fullscreen_exit', function() {

                    // show the image after 50 ms
                    Utils.show( self.getActiveImage() );

                    if ( typeof callback === 'function' ) {
                        callback.call( self );
                    }

                }, 50);

                self.trigger( Galleria.FULLSCREEN_EXIT );
            });

            $win.unbind('resize', fullscreen.scale);
        }
    };

    // the internal idle object for controlling idle states
    var idle = this._idle = {

        trunk: [],

        bound: false,

        add: function(elem, to) {
            if (!elem) {
                return;
            }
            if (!idle.bound) {
                idle.addEvent();
            }
            elem = $(elem);

            var from = {},
                style;

            for ( style in to ) {
                if ( to.hasOwnProperty( style ) ) {
                    from[ style ] = elem.css( style );
                }
            }
            elem.data('idle', {
                from: from,
                to: to,
                complete: true,
                busy: false
            });
            idle.addTimer();
            idle.trunk.push(elem);
        },

        remove: function(elem) {

            elem = jQuery(elem);

            $.each(idle.trunk, function(i, el) {
                if ( el.length && !el.not(elem).length ) {
                    self._idle.show(elem);
                    self._idle.trunk.splice(i, 1);
                }
            });

            if (!idle.trunk.length) {
                idle.removeEvent();
                Utils.clearTimer('idle');
            }
        },

        addEvent : function() {
            idle.bound = true;
            self.$('container').bind('mousemove click', idle.showAll );
        },

        removeEvent : function() {
            idle.bound = false;
            self.$('container').unbind('mousemove click', idle.showAll );
        },

        addTimer : function() {
            Utils.addTimer('idle', function() {
                self._idle.hide();
            }, self._options.idleTime );
        },

        hide : function() {

            if ( !self._options.idleMode ) {
                return;
            }

            self.trigger( Galleria.IDLE_ENTER );

            $.each( idle.trunk, function(i, elem) {

                var data = elem.data('idle');

                if (! data) {
                    return;
                }

                elem.data('idle').complete = false;

                Utils.animate( elem, data.to, {
                    duration: self._options.idleSpeed
                });
            });
        },

        showAll : function() {

            Utils.clearTimer('idle');

            $.each(self._idle.trunk, function( i, elem ) {
                self._idle.show( elem );
            });
        },

        show: function(elem) {

            var data = elem.data('idle');

            if (!data.busy && !data.complete) {

                data.busy = true;

                self.trigger( Galleria.IDLE_EXIT );

                Utils.clearTimer( 'idle' );

                Utils.animate( elem, data.from, {
                    duration: self._options.idleSpeed/2,
                    complete: function() {
                        $(this).data('idle').busy = false;
                        $(this).data('idle').complete = true;
                    }
                });

            }
            idle.addTimer();
        }
    };

    // internal lightbox object
    // creates a predesigned lightbox for simple popups of images in galleria
    var lightbox = this._lightbox = {

        width : 0,

        height : 0,

        initialized : false,

        active : null,

        image : null,

        elems : {},

        keymap: false,

        init : function() {

            // trigger the event
            self.trigger( Galleria.LIGHTBOX_OPEN );

            if ( lightbox.initialized ) {
                return;
            }
            lightbox.initialized = true;

            // create some elements to work with
            var elems = 'overlay box content shadow title info close prevholder prev nextholder next counter image',
                el = {},
                op = self._options,
                css = '',
                abs = 'position:absolute;',
                prefix = 'lightbox-',
                cssMap = {
                    overlay:    'position:fixed;display:none;opacity:'+op.overlayOpacity+';filter:alpha(opacity='+(op.overlayOpacity*100)+
                                ');top:0;left:0;width:100%;height:100%;background:'+op.overlayBackground+';z-index:99990',
                    box:        'position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991',
                    shadow:     abs+'background:#000;width:100%;height:100%;',
                    content:    abs+'background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden',
                    info:       abs+'bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px',
                    close:      abs+'top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999',
                    image:      abs+'top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;',
                    prevholder: abs+'width:50%;top:0;bottom:40px;cursor:pointer;',
                    nextholder: abs+'width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;',
                    prev:       abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif',
                    next:       abs+'top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000',
                    title:      'float:left',
                    counter:    'float:right;margin-left:8px;'
                },
                hover = function(elem) {
                    return elem.hover(
                        function() { $(this).css( 'color', '#bbb' ); },
                        function() { $(this).css( 'color', '#444' ); }
                    );
                },
                appends = {};

            // IE8 fix for IE's transparent background event "feature"
            if ( IE === 8 ) {
                cssMap.nextholder += 'background:#000;filter:alpha(opacity=0);';
                cssMap.prevholder += 'background:#000;filter:alpha(opacity=0);';
            }

            // create and insert CSS
            $.each(cssMap, function( key, value ) {
                css += '.galleria-'+prefix+key+'{'+value+'}';
            });

            Utils.insertStyleTag( css );

            // create the elements
            $.each(elems.split(' '), function( i, elemId ) {
                self.addElement( 'lightbox-' + elemId );
                el[ elemId ] = lightbox.elems[ elemId ] = self.get( 'lightbox-' + elemId );
            });

            // initiate the image
            lightbox.image = new Galleria.Picture();

            // append the elements
            $.each({
                    box: 'shadow content close prevholder nextholder',
                    info: 'title counter',
                    content: 'info image',
                    prevholder: 'prev',
                    nextholder: 'next'
                }, function( key, val ) {
                    var arr = [];
                    $.each( val.split(' '), function( i, prop ) {
                        arr.push( prefix + prop );
                    });
                    appends[ prefix+key ] = arr;
            });

            self.append( appends );

            $( el.image ).append( lightbox.image.container );

            $( DOM().body ).append( el.overlay, el.box );

            Utils.optimizeTouch( el.box );

            // add the prev/next nav and bind some controls

            hover( $( el.close ).bind( 'click', lightbox.hide ).html('&#215;') );

            $.each( ['Prev','Next'], function(i, dir) {

                var $d = $( el[ dir.toLowerCase() ] ).html( /v/.test( dir ) ? '&#8249;&nbsp;' : '&nbsp;&#8250;' ),
                    $e = $( el[ dir.toLowerCase()+'holder'] );

                $e.bind( 'click', function() {
                    lightbox[ 'show' + dir ]();
                });

                // IE7 and touch devices will simply show the nav
                if ( IE < 8 || Galleria.TOUCH ) {
                    $d.show();
                    return;
                }

                $e.hover( function() {
                    $d.show();
                }, function(e) {
                    $d.stop().fadeOut( 200 );
                });

            });
            $( el.overlay ).bind( 'click', lightbox.hide );

            // the lightbox animation is slow on ipad
            if ( Galleria.IPAD ) {
                self._options.lightboxTransitionSpeed = 0;
            }

        },

        rescale: function(event) {

            // calculate
             var width = Math.min( $win.width()-40, lightbox.width ),
                height = Math.min( $win.height()-60, lightbox.height ),
                ratio = Math.min( width / lightbox.width, height / lightbox.height ),
                destWidth = Math.round( lightbox.width * ratio ) + 40,
                destHeight = Math.round( lightbox.height * ratio ) + 60,
                to = {
                    width: destWidth,
                    height: destHeight,
                    'margin-top': Math.ceil( destHeight / 2 ) *- 1,
                    'margin-left': Math.ceil( destWidth / 2 ) *- 1
                };

            // if rescale event, don't animate
            if ( event ) {
                $( lightbox.elems.box ).css( to );
            } else {
                $( lightbox.elems.box ).animate( to, {
                    duration: self._options.lightboxTransitionSpeed,
                    easing: self._options.easing,
                    complete: function() {
                        var image = lightbox.image,
                            speed = self._options.lightboxFadeSpeed;

                        self.trigger({
                            type: Galleria.LIGHTBOX_IMAGE,
                            imageTarget: image.image
                        });

                        $( image.container ).show();

                        Utils.show( image.image, speed );
                        Utils.show( lightbox.elems.info, speed );
                    }
                });
            }
        },

        hide: function() {

            // remove the image
            lightbox.image.image = null;

            $win.unbind('resize', lightbox.rescale);

            $( lightbox.elems.box ).hide();

            Utils.hide( lightbox.elems.info );

            self.detachKeyboard();
            self.attachKeyboard( lightbox.keymap );

            lightbox.keymap = false;

            Utils.hide( lightbox.elems.overlay, 200, function() {
                $( this ).hide().css( 'opacity', self._options.overlayOpacity );
                self.trigger( Galleria.LIGHTBOX_CLOSE );
            });
        },

        showNext: function() {
            lightbox.show( self.getNext( lightbox.active ) );
        },

        showPrev: function() {
            lightbox.show( self.getPrev( lightbox.active ) );
        },

        show: function(index) {

            lightbox.active = index = typeof index === 'number' ? index : self.getIndex();

            if ( !lightbox.initialized ) {
                lightbox.init();
            }

            // temporarily attach some keys
            // save the old ones first in a cloned object
            if ( !lightbox.keymap ) {

                lightbox.keymap = $.extend({}, self._keyboard.map);

                self.attachKeyboard({
                    escape: lightbox.hide,
                    right: lightbox.showNext,
                    left: lightbox.showPrev
                });
            }

            $win.unbind('resize', lightbox.rescale );

            var data = self.getData(index),
                total = self.getDataLength();

            Utils.hide( lightbox.elems.info );

            lightbox.image.load( data.big || data.image, function( image ) {

                lightbox.width = image.original.width;
                lightbox.height = image.original.height;

                $( image.image ).css({
                    width: '100.5%',
                    height: '100.5%',
                    top: 0,
                    zIndex: 99998
                });

                Utils.hide( image.image );

                lightbox.elems.title.innerHTML = data.title || '';
                lightbox.elems.counter.innerHTML = (index + 1) + ' / ' + total;
                $win.resize( lightbox.rescale );
                lightbox.rescale();
            });

            $( lightbox.elems.overlay ).show();
            $( lightbox.elems.box ).show();
        }
    };

    return this;
};

// end Galleria constructor

Galleria.prototype = {

    // bring back the constructor reference

    constructor: Galleria,

    /**
        Use this function to initialize the gallery and start loading.
        Should only be called once per instance.

        @param {HTMLElement} target The target element
        @param {Object} options The gallery options

        @returns Instance
    */

    init: function( target, options ) {

        var self = this;

        options = _legacyOptions( options );

        // save the original ingredients
        this._original = {
            target: target,
            options: options,
            data: null
        };

        // save the target here
        this._target = this._dom.target = target.nodeName ? target : $( target ).get(0);

        // push the instance
        _instances.push( this );

        // raise error if no target is detected
        if ( !this._target ) {
             Galleria.raise('Target not found.', true);
             return;
        }

        // apply options
        this._options = {
            autoplay: false,
            carousel: true,
            carouselFollow: true,
            carouselSpeed: 400,
            carouselSteps: 'auto',
            clicknext: false,
            dataConfig : function( elem ) { return {}; },
            dataSelector: 'img',
            dataSource: this._target,
            debug: undef,
            dummy: undef, /* 1.2.5 */
            easing: 'galleria',
            extend: function(options) {},
            fullscreenCrop: undef, // 1.2.5
            fullscreenDoubleTap: true, // 1.2.4 toggles fullscreen on double-tap for touch devices
            fullscreenTransition: undef, // 1.2.5
            height: 'auto',
            idleMode: true, // 1.2.4 toggles idleMode
            idleTime: 3000,
            idleSpeed: 200,
            imageCrop: false,
            imageMargin: 0,
            imagePan: false,
            imagePanSmoothness: 12,
            imagePosition: '50%',
            imageTimeout: undef, // 1.2.5
            initialTransition: undef, // 1.2.4, replaces transitionInitial
            keepSource: false,
            layerFollow: true, // 1.2.5
            lightbox: false, // 1.2.3
            lightboxFadeSpeed: 200,
            lightboxTransitionSpeed: 200,
            linkSourceImages: true,
            maxScaleRatio: undef,
            minScaleRatio: undef,
            overlayOpacity: 0.85,
            overlayBackground: '#0b0b0b',
            pauseOnInteraction: true,
            popupLinks: false,
            preload: 2,
            queue: true,
            show: 0,
            showInfo: true,
            showCounter: true,
            showImagenav: true,
            swipe: true, // 1.2.4
            thumbCrop: true,
            thumbEventType: 'click',
            thumbFit: true,
            thumbMargin: 0,
            thumbQuality: 'auto',
            thumbnails: true,
            touchTransition: undef, // 1.2.5
            transition: 'fade',
            transitionInitial: undef, // legacy, deprecate in 1.3. Use initialTransition instead.
            transitionSpeed: 400,
            useCanvas: false, // 1.2.4
            width: 'auto'
        };

        // legacy support for transitionInitial
        this._options.initialTransition = this._options.initialTransition || this._options.transitionInitial;

        // turn off debug
        if ( options && options.debug === false ) {
            DEBUG = false;
        }

        // set timeout
        if ( options && typeof options.imageTimeout === 'number' ) {
            TIMEOUT = options.imageTimeout;
        }

        // set dummy
        if ( options && typeof options.dummy === 'string' ) {
            DUMMY = options.dummy;
        }

        // hide all content
        $( this._target ).children().hide();

        // now we just have to wait for the theme...
        if ( typeof Galleria.theme === 'object' ) {
            this._init();
        } else {
            // push the instance into the pool and run it when the theme is ready
            _pool.push( this );
        }

        return this;
    },

    // this method should only be called once per instance
    // for manipulation of data, use the .load method

    _init: function() {
        var self = this;
        if ( this._initialized ) {
            Galleria.raise( 'Init failed: Gallery instance already initialized.' );
            return this;
        }

        this._initialized = true;

        if ( !Galleria.theme ) {
            Galleria.raise( 'Init failed: No theme found.' );
            return this;
        }

        // merge the theme & caller options
        $.extend( true, this._options, Galleria.theme.defaults, this._original.options );

        // check for canvas support
        (function( can ) {

            if ( !( 'getContext' in can ) ) {
                can = null;
                return;
            }

            _canvas = _canvas || {
                elem: can,
                context: can.getContext( '2d' ),
                cache: {},
                length: 0
            };

        }( doc.createElement( 'canvas' ) ) );

        // bind the gallery to run when data is ready
        this.bind( Galleria.DATA, function() {

            // save the new data
            this._original.data = this._data;

            // lets show the counter here
            this.get('total').innerHTML = this.getDataLength();

            // cache the container
            var $container = this.$( 'container' );

            // the gallery is ready, let's just wait for the css
            var num = { width: 0, height: 0 };
            var testHeight = function() {
                return self.$( 'stage' ).height();
            };

            // check container and thumbnail height
            Utils.wait({
                until: function() {

                    // keep trying to get the value
                    $.each(['width', 'height'], function( i, m ) {

                        // first check if options is set

                        if ( self._options[ m ] && typeof self._options[ m ] === 'number' ) {
                            num[ m ] = self._options[ m ];
                        } else {

                            // else extract the measures from different sources and grab the highest value
                            num[ m ] = Math.max(
                                Utils.parseValue( $container.css( m ) ),         // 1. the container css
                                Utils.parseValue( self.$( 'target' ).css( m ) ), // 2. the target css
                                $container[ m ](),                               // 3. the container jQuery method
                                self.$( 'target' )[ m ]()                        // 4. the container jQuery method
                            );
                        }

                        // apply the new measures
                        $container[ m ]( num[ m ] );

                    });
                    return testHeight() && num.width && num.height > 10;

                },
                success: function() {

                    // for some strange reason, webkit needs a single setTimeout to play ball
                    if ( Galleria.WEBKIT ) {
                        window.setTimeout( function() {
                            self._run();
                        }, 1);
                    } else {

                        self._run();
                    }
                },
                error: function() {

                    // Height was probably not set, raise hard errors

                    if ( testHeight() ) {
                        Galleria.raise('Could not extract sufficient width/height of the gallery container. Traced measures: width:' + num.width + 'px, height: ' + num.height + 'px.', true);
                    } else {
                        Galleria.raise('Could not extract a stage height from the CSS. Traced height: ' + testHeight() + 'px.', true);
                    }
                },
                timeout: 2000
            });
        });

        // build the gallery frame
        this.append({
            'info-text' :
                ['info-title', 'info-description'],
            'info' :
                ['info-text'],
            'image-nav' :
                ['image-nav-right', 'image-nav-left'],
            'stage' :
                ['images', 'loader', 'counter', 'image-nav'],
            'thumbnails-list' :
                ['thumbnails'],
            'thumbnails-container' :
                ['thumb-nav-left', 'thumbnails-list', 'thumb-nav-right'],
            'container' :
                ['stage', 'thumbnails-container', 'info', 'tooltip']
        });

        Utils.hide( this.$( 'counter' ).append(
            this.get( 'current' ),
            ' / ',
            this.get( 'total' )
        ) );

        this.setCounter('&#8211;');

        Utils.hide( self.get('tooltip') );

        // add a notouch class on the container to prevent unwanted :hovers on touch devices
        this.$( 'container' ).addClass( Galleria.TOUCH ? 'touch' : 'notouch' );

        // add images to the controls
        $.each( new Array(2), function( i ) {

            // create a new Picture instance
            var image = new Galleria.Picture();

            // apply some styles, create & prepend overlay
            $( image.container ).css({
                position: 'absolute',
                top: 0,
                left: 0
            }).prepend( self._layers[i] = $( Utils.create('galleria-layer') ).css({
                position: 'absolute',
                top:0, left:0, right:0, bottom:0,
                zIndex:2
            })[0] );

            // append the image
            self.$( 'images' ).append( image.container );

            // reload the controls
            self._controls[i] = image;

        });

        // some forced generic styling
        this.$( 'images' ).css({
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        });

        this.$( 'thumbnails, thumbnails-list' ).css({
            overflow: 'hidden',
            position: 'relative'
        });

        // bind image navigation arrows
        this.$( 'image-nav-right, image-nav-left' ).bind( 'click', function(e) {

            // tune the clicknext option
            if ( self._options.clicknext ) {
                e.stopPropagation();
            }

            // pause if options is set
            if ( self._options.pauseOnInteraction ) {
                self.pause();
            }

            // navigate
            var fn = /right/.test( this.className ) ? 'next' : 'prev';
            self[ fn ]();

        });

        // hide controls if chosen to
        $.each( ['info','counter','image-nav'], function( i, el ) {
            if ( self._options[ 'show' + el.substr(0,1).toUpperCase() + el.substr(1).replace(/-/,'') ] === false ) {
                Utils.moveOut( self.get( el.toLowerCase() ) );
            }
        });

        // load up target content
        this.load();

        // now it's usually safe to remove the content
        // IE will never stop loading if we remove it, so let's keep it hidden for IE (it's usually fast enough anyway)
        if ( !this._options.keep_source && !IE ) {
            this._target.innerHTML = '';
        }

        // re-append the errors, if they happened before clearing
        if ( this.get( 'errors' ) ) {
            this.appendChild( 'target', 'errors' );
        }

        // append the gallery frame
        this.appendChild( 'target', 'container' );

        // parse the carousel on each thumb load
        if ( this._options.carousel ) {
            var count = 0,
                show = this._options.show;
            this.bind( Galleria.THUMBNAIL, function() {
                this.updateCarousel();
                if ( ++count == this.getDataLength() && typeof show == 'number' && show > 0 ) {
                    this._carousel.follow( show );
                }
            });
        }

        // bind swipe gesture
        if ( this._options.swipe ) {

            (function( images ) {

                var swipeStart = [0,0],
                    swipeStop = [0,0],
                    limitX = 30,
                    limitY = 100,
                    multi = false,
                    tid = 0,
                    data,
                    ev = {
                        start: 'touchstart',
                        move: 'touchmove',
                        stop: 'touchend'
                    },
                    getData = function(e) {
                        return e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                    },
                    moveHandler = function( e ) {

                        if ( e.originalEvent.touches && e.originalEvent.touches.length > 1 ) {
                            return;
                        }

                        data = getData( e );
                        swipeStop = [ data.pageX, data.pageY ];

                        if ( !swipeStart[0] ) {
                            swipeStart = swipeStop;
                        }

                        if ( Math.abs( swipeStart[0] - swipeStop[0] ) > 10 ) {
                            e.preventDefault();
                        }
                    },
                    upHandler = function( e ) {

                        images.unbind( ev.move, moveHandler );

                        // if multitouch (possibly zooming), abort
                        if ( ( e.originalEvent.touches && e.originalEvent.touches.length ) || multi ) {
                            multi = !multi;
                            return;
                        }

                        if ( Utils.timestamp() - tid < 1000 &&
                             Math.abs( swipeStart[0] - swipeStop[0] ) > limitX &&
                             Math.abs( swipeStart[1] - swipeStop[1] ) < limitY ) {

                            e.preventDefault();
                            self[ swipeStart[0] > swipeStop[0] ? 'next' : 'prev' ]();
                        }

                        swipeStart = swipeStop = [0,0];
                    };

                images.bind(ev.start, function(e) {

                    if ( e.originalEvent.touches && e.originalEvent.touches.length > 1 ) {
                        return;
                    }

                    data = getData(e);
                    tid = Utils.timestamp();
                    swipeStart = swipeStop = [ data.pageX, data.pageY ];
                    images.bind(ev.move, moveHandler ).one(ev.stop, upHandler);

                });

            }( self.$( 'images' ) ));

            // double-tap/click fullscreen toggle

            if ( this._options.fullscreenDoubleTap ) {

                this.$( 'stage' ).bind( 'touchstart', (function() {
                    var last, cx, cy, lx, ly, now,
                        getData = function(e) {
                            return e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                        };
                    return function(e) {
                        now = Galleria.utils.timestamp();
                        cx = getData(e).pageX;
                        cy = getData(e).pageY;
                        if ( ( now - last < 500 ) && ( cx - lx < 20) && ( cy - ly < 20) ) {
                            self.toggleFullscreen();
                            e.preventDefault();
                            self.$( 'stage' ).unbind( 'touchend', arguments.callee );
                            return;
                        }
                        last = now;
                        lx = cx;
                        ly = cy;
                    };
                }()));
            }

        }

        // optimize touch for container
        Utils.optimizeTouch( this.get( 'container' ) );

        return this;
    },

    // Creates the thumbnails and carousel
    // can be used at any time, f.ex when the data object is manipulated

    _createThumbnails : function() {

        this.get( 'total' ).innerHTML = this.getDataLength();

        var i,
            src,
            thumb,
            data,

            $container,

            self = this,
            o = this._options,

            // get previously active thumbnail, if exists
            active = (function() {
                var a = self.$('thumbnails').find('.active');
                if ( !a.length ) {
                    return false;
                }
                return a.find('img').attr('src');
            }()),

            // cache the thumbnail option
            optval = typeof o.thumbnails === 'string' ? o.thumbnails.toLowerCase() : null,

            // move some data into the instance
            // for some reason, jQuery cant handle css(property) when zooming in FF, breaking the gallery
            // so we resort to getComputedStyle for browsers who support it
            getStyle = function( prop ) {
                return doc.defaultView && doc.defaultView.getComputedStyle ?
                    doc.defaultView.getComputedStyle( thumb.container, null )[ prop ] :
                    $container.css( prop );
            },

            fake = function(image, index, container) {
                return function() {
                    $( container ).append( image );
                    self.trigger({
                        type: Galleria.THUMBNAIL,
                        thumbTarget: image,
                        index: index
                    });
                };
            },

            onThumbEvent = function( e ) {

                // pause if option is set
                if ( o.pauseOnInteraction ) {
                    self.pause();
                }

                // extract the index from the data
                var index = $( e.currentTarget ).data( 'index' );
                if ( self.getIndex() !== index ) {
                    self.show( index );
                }

                e.preventDefault();
            },

            onThumbLoad = function( thumb ) {

                // scale when ready
                thumb.scale({
                    width:    thumb.data.width,
                    height:   thumb.data.height,
                    crop:     o.thumbCrop,
                    margin:   o.thumbMargin,
                    canvas:   o.useCanvas,
                    complete: function( thumb ) {

                        // shrink thumbnails to fit
                        var top = ['left', 'top'],
                            arr = ['Width', 'Height'],
                            m,
                            css;

                        // calculate shrinked positions
                        $.each(arr, function( i, measure ) {
                            m = measure.toLowerCase();
                            if ( (o.thumbCrop !== true || o.thumbCrop === m ) && o.thumbFit ) {
                                css = {};
                                css[ m ] = thumb[ m ];
                                $( thumb.container ).css( css );
                                css = {};
                                css[ top[ i ] ] = 0;
                                $( thumb.image ).css( css );
                            }

                            // cache outer measures
                            thumb[ 'outer' + measure ] = $( thumb.container )[ 'outer' + measure ]( true );
                        });

                        // set high quality if downscale is moderate
                        Utils.toggleQuality( thumb.image,
                            o.thumbQuality === true ||
                            ( o.thumbQuality === 'auto' && thumb.original.width < thumb.width * 3 )
                        );

                        // trigger the THUMBNAIL event
                        self.trigger({
                            type: Galleria.THUMBNAIL,
                            thumbTarget: thumb.image,
                            index: thumb.data.order
                        });
                    }
                });
            };

        this._thumbnails = [];

        this.$( 'thumbnails' ).empty();

        // loop through data and create thumbnails
        for( i = 0; this._data[ i ]; i++ ) {

            data = this._data[ i ];

            if ( o.thumbnails === true ) {

                // add a new Picture instance
                thumb = new Galleria.Picture(i);

                // get source from thumb or image
                src = data.thumb || data.image;

                // append the thumbnail
                this.$( 'thumbnails' ).append( thumb.container );

                // cache the container
                $container = $( thumb.container );

                thumb.data = {
                    width  : Utils.parseValue( getStyle( 'width' ) ),
                    height : Utils.parseValue( getStyle( 'height' ) ),
                    order  : i
                };

                // grab & reset size for smoother thumbnail loads
                if ( o.thumbFit && o.thumbCrop !== true ) {
                    $container.css( { width: 0, height: 0 } );
                } else {
                    $container.css( { width: thumb.data.width, height: thumb.data.height } );
                }

                // load the thumbnail
                thumb.load( src, onThumbLoad );

                // preload all images here
                if ( o.preload === 'all' ) {
                    thumb.preload( data.image );
                }

            // create empty spans if thumbnails is set to 'empty'
            } else if ( optval === 'empty' || optval === 'numbers' ) {

                thumb = {
                    container:  Utils.create( 'galleria-image' ),
                    image: Utils.create( 'img', 'span' ),
                    ready: true
                };

                // create numbered thumbnails
                if ( optval === 'numbers' ) {
                    $( thumb.image ).text( i + 1 );
                }

                this.$( 'thumbnails' ).append( thumb.container );

                // we need to "fake" a loading delay before we append and trigger
                // 50+ should be enough

                window.setTimeout( ( fake )( thumb.image, i, thumb.container ), 50 + ( i*20 ) );

            // create null object to silent errors
            } else {
                thumb = {
                    container: null,
                    image: null
                };
            }

            // add events for thumbnails
            // you can control the event type using thumb_event_type
            // we'll add the same event to the source if it's kept

            $( thumb.container ).add( o.keepSource && o.linkSourceImages ? data.original : null )
                .data('index', i).bind( o.thumbEventType, onThumbEvent );

            if (active === src) {
                $( thumb.container ).addClass( 'active' );
            }

            this._thumbnails.push( thumb );
        }
    },

    // the internal _run method should be called after loading data into galleria
    // makes sure the gallery has proper measurements before postrun & ready
    _run : function() {

        var self = this;

        self._createThumbnails();

        // make sure we have a stageHeight && stageWidth

        Utils.wait({

            until: function() {

                // Opera crap
                if ( Galleria.OPERA ) {
                    self.$( 'stage' ).css( 'display', 'inline-block' );
                }

                self._stageWidth  = self.$( 'stage' ).width();
                self._stageHeight = self.$( 'stage' ).height();

                return( self._stageWidth &&
                        self._stageHeight > 50 ); // what is an acceptable height?
            },

            success: function() {

                // save the instance
                _galleries.push( self );

                // postrun some stuff after the gallery is ready

                // show counter
                Utils.show( self.get('counter') );

                // bind carousel nav
                if ( self._options.carousel ) {
                    self._carousel.bindControls();
                }

                // start autoplay
                if ( self._options.autoplay ) {

                    self.pause();

                    if ( typeof self._options.autoplay === 'number' ) {
                        self._playtime = self._options.autoplay;
                    }

                    self.trigger( Galleria.PLAY );
                    self._playing = true;
                }
                // if second load, just do the show and return
                if ( self._firstrun ) {
                    if ( typeof self._options.show === 'number' ) {
                        self.show( self._options.show );
                    }
                    return;
                }

                self._firstrun = true;

                // bind clicknext
                if ( self._options.clicknext && !Galleria.TOUCH ) {
                    $.each( self._data, function( i, data ) {
                        delete data.link;
                    });
                    self.$( 'stage' ).css({ cursor : 'pointer' }).bind( 'click', function(e) {
                        // pause if options is set
                        if ( self._options.pauseOnInteraction ) {
                            self.pause();
                        }
                        self.next();
                    });
                }

                // initialize the History plugin
                if ( Galleria.History ) {

                    // bind the show method
                    Galleria.History.change(function( value ) {

                        // if ID is NaN, the user pressed back from the first image
                        // return to previous address
                        if ( isNaN( value ) ) {
                            window.history.go(-1);

                        // else show the image
                        } else {
                            self.show( value, undef, true );
                        }
                    });
                }

                // Trigger Galleria.ready
                $.each( Galleria.ready.callbacks, function() {
                    this.call( self, self._options );
                });

                self.trigger( Galleria.READY );

                // call the theme init method
                Galleria.theme.init.call( self, self._options );

                // call the extend option
                self._options.extend.call( self, self._options );

                // show the initial image
                // first test for permalinks in history
                if ( /^[0-9]{1,4}$/.test( HASH ) && Galleria.History ) {
                    self.show( HASH, undef, true );

                } else if( self._data[ self._options.show ] ) {
                    self.show( self._options.show );
                }
            },

            error: function() {
                Galleria.raise('Stage width or height is too small to show the gallery. Traced measures: width:' + self._stageWidth + 'px, height: ' + self._stageHeight + 'px.', true);
            }

        });
    },

    /**
        Loads data into the gallery.
        You can call this method on an existing gallery to reload the gallery with new data.

        @param {Array|string} source Optional JSON array of data or selector of where to find data in the document.
        Defaults to the Galleria target or dataSource option.

        @param {string} selector Optional element selector of what elements to parse.
        Defaults to 'img'.

        @param {Function} [config] Optional function to modify the data extraction proceedure from the selector.
        See the data_config option for more information.

        @returns Instance
    */

    load : function( source, selector, config ) {

        var self = this;

        // empty the data array
        this._data = [];

        // empty the thumbnails
        this._thumbnails = [];
        this.$('thumbnails').empty();

        // shorten the arguments
        if ( typeof selector === 'function' ) {
            config = selector;
            selector = null;
        }

        // use the source set by target
        source = source || this._options.dataSource;

        // use selector set by option
        selector = selector || this._options.dataSelector;

        // use the data_config set by option
        config = config || this._options.dataConfig;

        // if source is a true object, make it into an array
        if( /^function Object/.test( source.constructor ) ) {
            source = [source];
        }

        // check if the data is an array already
        if ( source.constructor === Array ) {
            if ( this.validate( source ) ) {

                this._data = source;
                this._parseData().trigger( Galleria.DATA );

            } else {
                Galleria.raise( 'Load failed: JSON Array not valid.' );
            }
            return this;
        }

        // loop through images and set data
        $( source ).find( selector ).each( function( i, img ) {
            img = $( img );
            var data = {},
                parent = img.parent(),
                href = parent.attr( 'href' ),
                rel  = parent.attr( 'rel' );

            if ( href ) {
                data.image = data.big = href;
            }
            if ( rel ) {
                data.big = rel;
            }

            // mix default extractions with the hrefs and config
            // and push it into the data array
            self._data.push( $.extend({

                title:       img.attr('title') || '',
                thumb:       img.attr('src'),
                image:       img.attr('src'),
                big:         img.attr('src'),
                description: img.attr('alt') || '',
                link:        img.attr('longdesc'),
                original:    img.get(0) // saved as a reference

            }, data, config( img ) ) );

        });
        // trigger the DATA event and return
        if ( this.getDataLength() ) {
            this.trigger( Galleria.DATA );
        } else {
            Galleria.raise('Load failed: no data found.');
        }
        return this;

    },

    // make sure the data works properly
    _parseData : function() {

        var self = this;

        $.each( this._data, function( i, data ) {
            // copy image as thumb if no thumb exists
            if ( 'thumb' in data === false ) {
                self._data[ i ].thumb = data.image;
            }
            // copy image as big image if no biggie exists
            if ( !'big' in data ) {
                self._data[ i ].big = data.image;
            }
        });

        return this;
    },

    /**
        Adds and/or removes images from the gallery
        Works just like Array.splice
        https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice

        @example this.splice( 2, 4 ); // removes 4 images after the second image

        @returns Instance
    */

    splice: function() {
        Array.prototype.splice.apply( this._data, Utils.array( arguments ) );
        return this._parseData()._createThumbnails();
    },

    /**
        Append images to the gallery
        Works just like Array.push
        https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/push

        @example this.push({ image: 'image1.jpg' }); // appends the image to the gallery

        @returns Instance
    */

    push: function() {
        Array.prototype.push.apply( this._data, Utils.array( arguments ) );
        return this._parseData()._createThumbnails();
    },

    _getActive: function() {
        return this._controls.getActive();
    },

    validate : function( data ) {
        // todo: validate a custom data array
        return true;
    },

    /**
        Bind any event to Galleria

        @param {string} type The Event type to listen for
        @param {Function} fn The function to execute when the event is triggered

        @example this.bind( 'image', function() { Galleria.log('image shown') });

        @returns Instance
    */

    bind : function(type, fn) {

        // allow 'image' instead of Galleria.IMAGE
        type = _patchEvent( type );

        this.$( 'container' ).bind( type, this.proxy(fn) );
        return this;
    },

    /**
        Unbind any event to Galleria

        @param {string} type The Event type to forget

        @returns Instance
    */

    unbind : function(type) {

        type = _patchEvent( type );

        this.$( 'container' ).unbind( type );
        return this;
    },

    /**
        Manually trigger a Galleria event

        @param {string} type The Event to trigger

        @returns Instance
    */

    trigger : function( type ) {

        type = typeof type === 'object' ?
            $.extend( type, { scope: this } ) :
            { type: _patchEvent( type ), scope: this };

        this.$( 'container' ).trigger( type );

        return this;
    },

    /**
        Assign an "idle state" to any element.
        The idle state will be applied after a certain amount of idle time
        Useful to hide f.ex navigation when the gallery is inactive

        @param {HTMLElement|string} elem The Dom node or selector to apply the idle state to
        @param {Object} styles the CSS styles to apply

        @example addIdleState( this.get('image-nav'), { opacity: 0 });
        @example addIdleState( '.galleria-image-nav', { top: -200 });

        @returns Instance
    */

    addIdleState: function( elem, styles ) {
        this._idle.add.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Removes any idle state previously set using addIdleState()

        @param {HTMLElement|string} elem The Dom node or selector to remove the idle state from.

        @returns Instance
    */

    removeIdleState: function( elem ) {
        this._idle.remove.apply( this._idle, Utils.array( arguments ) );
        return this;
    },

    /**
        Force Galleria to enter idle mode.

        @returns Instance
    */

    enterIdleMode: function() {
        this._idle.hide();
        return this;
    },

    /**
        Force Galleria to exit idle mode.

        @returns Instance
    */

    exitIdleMode: function() {
        this._idle.showAll();
        return this;
    },

    /**
        Enter FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */

    enterFullscreen: function( callback ) {
        this._fullscreen.enter.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Exits FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied.

        @returns Instance
    */

    exitFullscreen: function( callback ) {
        this._fullscreen.exit.apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Toggle FullScreen mode

        @param {Function} callback the function to be executed when the fullscreen mode is fully applied or removed.

        @returns Instance
    */

    toggleFullscreen: function( callback ) {
        this._fullscreen[ this.isFullscreen() ? 'exit' : 'enter'].apply( this, Utils.array( arguments ) );
        return this;
    },

    /**
        Adds a tooltip to any element.
        You can also call this method with an object as argument with elemID:value pairs to apply tooltips to (see examples)

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @example this.bindTooltip( this.get('thumbnails'), 'My thumbnails');
        @example this.bindTooltip( this.get('thumbnails'), function() { return 'My thumbs' });
        @example this.bindTooltip( { image_nav: 'Navigation' });

        @returns Instance
    */

    bindTooltip: function( elem, value ) {
        this._tooltip.bind.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Note: this method is deprecated. Use refreshTooltip() instead.

        Redefine a tooltip.
        Use this if you want to re-apply a tooltip value to an already bound tooltip element.

        @param {HTMLElement} elem The DOM Node to attach the event to
        @param {string|Function} value The tooltip message. Can also be a function that returns a string.

        @returns Instance
    */

    defineTooltip: function( elem, value ) {
        this._tooltip.define.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Refresh a tooltip value.
        Use this if you want to change the tooltip value at runtime, f.ex if you have a play/pause toggle.

        @param {HTMLElement} elem The DOM Node that has a tooltip that should be refreshed

        @returns Instance
    */

    refreshTooltip: function( elem ) {
        this._tooltip.show.apply( this._tooltip, Utils.array(arguments) );
        return this;
    },

    /**
        Open a pre-designed lightbox with the currently active image.
        You can control some visuals using gallery options.

        @returns Instance
    */

    openLightbox: function() {
        this._lightbox.show.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Close the lightbox.

        @returns Instance
    */

    closeLightbox: function() {
        this._lightbox.hide.apply( this._lightbox, Utils.array( arguments ) );
        return this;
    },

    /**
        Get the currently active image element.

        @returns {HTMLElement} The image element
    */

    getActiveImage: function() {
        return this._getActive().image || undef;
    },

    /**
        Get the currently active thumbnail element.

        @returns {HTMLElement} The thumbnail element
    */

    getActiveThumb: function() {
        return this._thumbnails[ this._active ].image || undef;
    },

    /**
        Get the mouse position relative to the gallery container

        @param e The mouse event

        @example

var gallery = this;
$(document).mousemove(function(e) {
    console.log( gallery.getMousePosition(e).x );
});

        @returns {Object} Object with x & y of the relative mouse postion
    */

    getMousePosition : function(e) {
        return {
            x: e.pageX - this.$( 'container' ).offset().left,
            y: e.pageY - this.$( 'container' ).offset().top
        };
    },

    /**
        Adds a panning effect to the image

        @param img The optional image element. If not specified it takes the currently active image

        @returns Instance
    */

    addPan : function( img ) {

        if ( this._options.imageCrop === false ) {
            return;
        }

        img = $( img || this.getActiveImage() );

        // define some variables and methods
        var self   = this,
            x      = img.width() / 2,
            y      = img.height() / 2,
            destX  = parseInt( img.css( 'left' ), 10 ),
            destY  = parseInt( img.css( 'top' ), 10 ),
            curX   = destX || 0,
            curY   = destY || 0,
            distX  = 0,
            distY  = 0,
            active = false,
            ts     = Utils.timestamp(),
            cache  = 0,
            move   = 0,

            // positions the image
            position = function( dist, cur, pos ) {
                if ( dist > 0 ) {
                    move = Math.round( Math.max( dist * -1, Math.min( 0, cur ) ) );
                    if ( cache !== move ) {

                        cache = move;

                        if ( IE === 8 ) { // scroll is faster for IE
                            img.parent()[ 'scroll' + pos ]( move * -1 );
                        } else {
                            var css = {};
                            css[ pos.toLowerCase() ] = move;
                            img.css(css);
                        }
                    }
                }
            },

            // calculates mouse position after 50ms
            calculate = function(e) {
                if (Utils.timestamp() - ts < 50) {
                    return;
                }
                active = true;
                x = self.getMousePosition(e).x;
                y = self.getMousePosition(e).y;
            },

            // the main loop to check
            loop = function(e) {

                if (!active) {
                    return;
                }

                distX = img.width() - self._stageWidth;
                distY = img.height() - self._stageHeight;
                destX = x / self._stageWidth * distX * -1;
                destY = y / self._stageHeight * distY * -1;
                curX += ( destX - curX ) / self._options.imagePanSmoothness;
                curY += ( destY - curY ) / self._options.imagePanSmoothness;

                position( distY, curY, 'Top' );
                position( distX, curX, 'Left' );

            };

        // we need to use scroll in IE8 to speed things up
        if ( IE === 8 ) {

            img.parent().scrollTop( curY * -1 ).scrollLeft( curX * -1 );
            img.css({
                top: 0,
                left: 0
            });

        }

        // unbind and bind event
        this.$( 'stage' ).unbind( 'mousemove', calculate ).bind( 'mousemove', calculate );

        // loop the loop
        Utils.addTimer('pan', loop, 50, true);

        return this;
    },

    /**
        Brings the scope into any callback

        @param fn The callback to bring the scope into
        @param scope Optional scope to bring

        @example $('#fullscreen').click( this.proxy(function() { this.enterFullscreen(); }) )

        @returns {Function} Return the callback with the gallery scope
    */

    proxy : function( fn, scope ) {
        if ( typeof fn !== 'function' ) {
            return function() {};
        }
        scope = scope || this;
        return function() {
            return fn.apply( scope, Utils.array( arguments ) );
        };
    },

    /**
        Removes the panning effect set by addPan()

        @returns Instance
    */

    removePan: function() {

        // todo: doublecheck IE8

        this.$( 'stage' ).unbind( 'mousemove' );

        Utils.clearTimer( 'pan' );

        return this;
    },

    /**
        Adds an element to the Galleria DOM array.
        When you add an element here, you can access it using element ID in many API calls

        @param {string} id The element ID you wish to use. You can add many elements by adding more arguments.

        @example addElement('mybutton');
        @example addElement('mybutton','mylink');

        @returns Instance
    */

    addElement : function( id ) {

        var dom = this._dom;

        $.each( Utils.array(arguments), function( i, blueprint ) {
           dom[ blueprint ] = Utils.create( 'galleria-' + blueprint );
        });

        return this;
    },

    /**
        Attach keyboard events to Galleria

        @param {Object} map The map object of events.
        Possible keys are 'UP', 'DOWN', 'LEFT', 'RIGHT', 'RETURN', 'ESCAPE', 'BACKSPACE', and 'SPACE'.

        @example

this.attachKeyboard({
    right: this.next,
    left: this.prev,
    up: function() {
        console.log( 'up key pressed' )
    }
});

        @returns Instance
    */

    attachKeyboard : function( map ) {
        this._keyboard.attach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Detach all keyboard events to Galleria

        @returns Instance
    */

    detachKeyboard : function() {
        this._keyboard.detach.apply( this._keyboard, Utils.array( arguments ) );
        return this;
    },

    /**
        Fast helper for appending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be appended
        @param {string} childID the element ID that should be appended

        @example this.addElement('myElement');
        this.appendChild( 'info', 'myElement' );

        @returns Instance
    */

    appendChild : function( parentID, childID ) {
        this.$( parentID ).append( this.get( childID ) || childID );
        return this;
    },

    /**
        Fast helper for prepending galleria elements that you added using addElement()

        @param {string} parentID The parent element ID where the element will be prepended
        @param {string} childID the element ID that should be prepended

        @example

this.addElement('myElement');
this.prependChild( 'info', 'myElement' );

        @returns Instance
    */

    prependChild : function( parentID, childID ) {
        this.$( parentID ).prepend( this.get( childID ) || childID );
        return this;
    },

    /**
        Remove an element by blueprint

        @param {string} elemID The element to be removed.
        You can remove multiple elements by adding arguments.

        @returns Instance
    */

    remove : function( elemID ) {
        this.$( Utils.array( arguments ).join(',') ).remove();
        return this;
    },

    // a fast helper for building dom structures
    // leave this out of the API for now

    append : function( data ) {
        var i, j;
        for( i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                if ( data[i].constructor === Array ) {
                    for( j = 0; data[i][j]; j++ ) {
                        this.appendChild( i, data[i][j] );
                    }
                } else {
                    this.appendChild( i, data[i] );
                }
            }
        }
        return this;
    },

    // an internal helper for scaling according to options
    _scaleImage : function( image, options ) {

        image = image || this._controls.getActive();

        var self = this,

            complete,

            scaleLayer = function( img ) {
                $( img.container ).children(':first').css({
                    top: Math.max(0, Utils.parseValue( img.image.style.top )),
                    left: Math.max(0, Utils.parseValue( img.image.style.left )),
                    width: Utils.parseValue( img.image.width ),
                    height: Utils.parseValue( img.image.height )
                });
            };

        options = $.extend({
            width:    this._stageWidth,
            height:   this._stageHeight,
            crop:     this._options.imageCrop,
            max:      this._options.maxScaleRatio,
            min:      this._options.minScaleRatio,
            margin:   this._options.imageMargin,
            position: this._options.imagePosition
        }, options );

        if ( this._options.layerFollow && this._options.imageCrop !== true ) {

            if ( typeof options.complete == 'function' ) {
                complete = options.complete;
                options.complete = function() {
                    complete.call( image, image );
                    scaleLayer( image );
                };
            } else {
                options.complete = scaleLayer;
            }

        } else {
            $( image.container ).children(':first').css({ top: 0, left: 0 });
        }

        image.scale( options );
        return this;
    },

    /**
        Updates the carousel,
        useful if you resize the gallery and want to re-check if the carousel nav is needed.

        @returns Instance
    */

    updateCarousel : function() {
        this._carousel.update();
        return this;
    },

    /**
        Rescales the gallery

        @param {number} width The target width
        @param {number} height The target height
        @param {Function} complete The callback to be called when the scaling is complete

        @returns Instance
    */

    rescale : function( width, height, complete ) {

        var self = this;

        // allow rescale(fn)
        if ( typeof width === 'function' ) {
            complete = width;
            width = undef;
        }

        var scale = function() {

            // set stagewidth
            self._stageWidth = width || self.$( 'stage' ).width();
            self._stageHeight = height || self.$( 'stage' ).height();

            // scale the active image
            self._scaleImage();

            if ( self._options.carousel ) {
                self.updateCarousel();
            }

            self.trigger( Galleria.RESCALE );

            if ( typeof complete === 'function' ) {
                complete.call( self );
            }
        };

        if ( Galleria.WEBKIT && !width && !height ) {
            Utils.addTimer( 'scale', scale, 10 );// webkit is too fast
        } else {
            scale.call( self );
        }

        return this;
    },

    /**
        Refreshes the gallery.
        Useful if you change image options at runtime and want to apply the changes to the active image.

        @returns Instance
    */

    refreshImage : function() {
        this._scaleImage();
        if ( this._options.imagePan ) {
            this.addPan();
        }
        return this;
    },

    /**
        Shows an image by index

        @param {number|boolean} index The index to show
        @param {Boolean} rewind A boolean that should be true if you want the transition to go back

        @returns Instance
    */

    show : function( index, rewind, _history ) {

        // do nothing if index is false or queue is false and transition is in progress
        if ( index === false || ( !this._options.queue && this._queue.stalled ) ) {
            return;
        }

        index = Math.max( 0, Math.min( parseInt( index, 10 ), this.getDataLength() - 1 ) );

        rewind = typeof rewind !== 'undefined' ? !!rewind : index < this.getIndex();

        _history = _history || false;

        // do the history thing and return
        if ( !_history && Galleria.History ) {
            Galleria.History.set( index.toString() );
            return;
        }

        this._active = index;

        Array.prototype.push.call( this._queue, {
            index : index,
            rewind : rewind
        });
        if ( !this._queue.stalled ) {
            this._show();
        }

        return this;
    },

    // the internal _show method does the actual showing
    _show : function() {

        // shortcuts
        var self = this,
            queue = this._queue[ 0 ],
            data = this.getData( queue.index );

        if ( !data ) {
            return;
        }

        var src = this.isFullscreen() && 'big' in data ? data.big : data.image, // use big image if fullscreen mode
            active = this._controls.getActive(),
            next = this._controls.getNext(),
            cached = next.isCached( src ),
            thumb = this._thumbnails[ queue.index ];

        // to be fired when loading & transition is complete:
        var complete = (function( data, next, active, queue, thumb ) {

            return function() {

                var win;

                // remove stalled
                self._queue.stalled = false;

                // optimize quality
                Utils.toggleQuality( next.image, self._options.imageQuality );

                // remove old layer
                self._layers[ self._controls.active ].innerHTML = '';

                // swap
                $( active.container ).css({
                    zIndex: 0,
                    opacity: 0
                }).show();

                $( next.container ).css({
                    zIndex: 1
                }).show();

                self._controls.swap();

                // add pan according to option
                if ( self._options.imagePan ) {
                    self.addPan( next.image );
                }

                // make the image link or add lightbox
                // link takes precedence over lightbox if both are detected
                if ( data.link || self._options.lightbox ) {

                    $( next.image ).css({
                        cursor: 'pointer'
                    }).bind( 'mouseup', function() {

                        // popup link
                        if ( data.link ) {
                            if ( self._options.popupLinks ) {
                                win = window.open( data.link, '_blank' );
                            } else {
                                window.location.href = data.link;
                            }
                            return;
                        }

                        self.openLightbox();

                    });
                }

                // remove the queued image
                Array.prototype.shift.call( self._queue );

                // if we still have images in the queue, show it
                if ( self._queue.length ) {
                    self._show();
                }

                // check if we are playing
                self._playCheck();

                // trigger IMAGE event
                self.trigger({
                    type: Galleria.IMAGE,
                    index: queue.index,
                    imageTarget: next.image,
                    thumbTarget: thumb.image
                });
            };
        }( data, next, active, queue, thumb ));

        // let the carousel follow
        if ( this._options.carousel && this._options.carouselFollow ) {
            this._carousel.follow( queue.index );
        }

        // preload images
        if ( this._options.preload ) {

            var p, i,
                n = this.getNext(),
                ndata;

            try {
                for ( i = this._options.preload; i > 0; i-- ) {
                    p = new Galleria.Picture();
                    ndata = self.getData( n );
                    p.preload( this.isFullscreen() && 'big' in ndata ? ndata.big : ndata.image );
                    n = self.getNext( n );
                }
            } catch(e) {}
        }

        // show the next image, just in case
        Utils.show( next.container );

        // add active classes
        $( self._thumbnails[ queue.index ].container )
            .addClass( 'active' )
            .siblings( '.active' )
            .removeClass( 'active' );

        // trigger the LOADSTART event
        self.trigger( {
            type: Galleria.LOADSTART,
            cached: cached,
            index: queue.index,
            rewind: queue.rewind,
            imageTarget: next.image,
            thumbTarget: thumb.image
        });

        // begin loading the next image
        next.load( src, function( next ) {

            // add layer HTML
            $( self._layers[ 1-self._controls.active ] ).html( data.layer || '' ).hide();

            self._scaleImage( next, {

                complete: function( next ) {

                    // toggle low quality for IE
                    if ( 'image' in active ) {
                        Utils.toggleQuality( active.image, false );
                    }
                    Utils.toggleQuality( next.image, false );

                    // stall the queue
                    self._queue.stalled = true;

                    // remove the image panning, if applied
                    // TODO: rethink if this is necessary
                    self.removePan();

                    // set the captions and counter
                    self.setInfo( queue.index );
                    self.setCounter( queue.index );

                    // show the layer now
                    if ( data.layer ) {
                        $( self._layers[ 1-self._controls.active ] ).show();
                    }

                    // trigger the LOADFINISH event
                    self.trigger({
                        type: Galleria.LOADFINISH,
                        cached: cached,
                        index: queue.index,
                        rewind: queue.rewind,
                        imageTarget: next.image,
                        thumbTarget: self._thumbnails[ queue.index ].image
                    });

                    var transition = self._options.transition;

                    // can JavaScript loop through objects in order? yes.
                    $.each({
                        initial: active.image === null,
                        touch: Galleria.TOUCH,
                        fullscreen: self.isFullscreen()
                    }, function( type, arg ) {
                        if ( arg && self._options[ type + 'Transition' ] !== undef ) {
                            transition = self._options[ type + 'Transition' ];
                            return false;
                        }
                    });

                    // validate the transition
                    if ( transition in _transitions === false ) {
                        complete();
                    } else {
                        var params = {
                            prev: active.container,
                            next: next.container,
                            rewind: queue.rewind,
                            speed: self._options.transitionSpeed || 400
                        };

                        // call the transition function and send some stuff
                        _transitions[ transition ].call(self, params, complete );

                    }
                }
            });
        });
    },

    /**
        Gets the next index

        @param {number} base Optional starting point

        @returns {number} the next index, or the first if you are at the first (looping)
    */

    getNext : function( base ) {
        base = typeof base === 'number' ? base : this.getIndex();
        return base === this.getDataLength() - 1 ? 0 : base + 1;
    },

    /**
        Gets the previous index

        @param {number} base Optional starting point

        @returns {number} the previous index, or the last if you are at the first (looping)
    */

    getPrev : function( base ) {
        base = typeof base === 'number' ? base : this.getIndex();
        return base === 0 ? this.getDataLength() - 1 : base - 1;
    },

    /**
        Shows the next image in line

        @returns Instance
    */

    next : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getNext(), false );
        }
        return this;
    },

    /**
        Shows the previous image in line

        @returns Instance
    */

    prev : function() {
        if ( this.getDataLength() > 1 ) {
            this.show( this.getPrev(), true );
        }
        return this;
    },

    /**
        Retrieve a DOM element by element ID

        @param {string} elemId The delement ID to fetch

        @returns {HTMLElement} The elements DOM node or null if not found.
    */

    get : function( elemId ) {
        return elemId in this._dom ? this._dom[ elemId ] : null;
    },

    /**
        Retrieve a data object

        @param {number} index The data index to retrieve.
        If no index specified it will take the currently active image

        @returns {Object} The data object
    */

    getData : function( index ) {
        return index in this._data ?
            this._data[ index ] : this._data[ this._active ];
    },

    /**
        Retrieve the number of data items

        @returns {number} The data length
    */
    getDataLength : function() {
        return this._data.length;
    },

    /**
        Retrieve the currently active index

        @returns {number|boolean} The active index or false if none found
    */

    getIndex : function() {
        return typeof this._active === 'number' ? this._active : false;
    },

    /**
        Retrieve the stage height

        @returns {number} The stage height
    */

    getStageHeight : function() {
        return this._stageHeight;
    },

    /**
        Retrieve the stage width

        @returns {number} The stage width
    */

    getStageWidth : function() {
        return this._stageWidth;
    },

    /**
        Retrieve the option

        @param {string} key The option key to retrieve. If no key specified it will return all options in an object.

        @returns option or options
    */

    getOptions : function( key ) {
        return typeof key === 'undefined' ? this._options : this._options[ key ];
    },

    /**
        Set options to the instance.
        You can set options using a key & value argument or a single object argument (see examples)

        @param {string} key The option key
        @param {string} value the the options value

        @example setOptions( 'autoplay', true )
        @example setOptions({ autoplay: true });

        @returns Instance
    */

    setOptions : function( key, value ) {
        if ( typeof key === 'object' ) {
            $.extend( this._options, key );
        } else {
            this._options[ key ] = value;
        }
        return this;
    },

    /**
        Starts playing the slideshow

        @param {number} delay Sets the slideshow interval in milliseconds.
        If you set it once, you can just call play() and get the same interval the next time.

        @returns Instance
    */

    play : function( delay ) {

        this._playing = true;

        this._playtime = delay || this._playtime;

        this._playCheck();

        this.trigger( Galleria.PLAY );

        return this;
    },

    /**
        Stops the slideshow if currently playing

        @returns Instance
    */

    pause : function() {

        this._playing = false;

        this.trigger( Galleria.PAUSE );

        return this;
    },

    /**
        Toggle between play and pause events.

        @param {number} delay Sets the slideshow interval in milliseconds.

        @returns Instance
    */

    playToggle : function( delay ) {
        return ( this._playing ) ? this.pause() : this.play( delay );
    },

    /**
        Checks if the gallery is currently playing

        @returns {Boolean}
    */

    isPlaying : function() {
        return this._playing;
    },

    /**
        Checks if the gallery is currently in fullscreen mode

        @returns {Boolean}
    */

    isFullscreen : function() {
        return this._fullscreen.active;
    },

    _playCheck : function() {
        var self = this,
            played = 0,
            interval = 20,
            now = Utils.timestamp(),
            timer_id = 'play' + this._id;

        if ( this._playing ) {

            Utils.clearTimer( timer_id );

            var fn = function() {

                played = Utils.timestamp() - now;
                if ( played >= self._playtime && self._playing ) {
                    Utils.clearTimer( timer_id );
                    self.next();
                    return;
                }
                if ( self._playing ) {

                    // trigger the PROGRESS event
                    self.trigger({
                        type:         Galleria.PROGRESS,
                        percent:      Math.ceil( played / self._playtime * 100 ),
                        seconds:      Math.floor( played / 1000 ),
                        milliseconds: played
                    });

                    Utils.addTimer( timer_id, fn, interval );
                }
            };
            Utils.addTimer( timer_id, fn, interval );
        }
    },

    /**
        Modify the slideshow delay

        @param {number} delay the number of milliseconds between slides,

        @returns Instance
    */

    setPlaytime: function( delay ) {
        this._playtime = delay;
        return this;
    },

    setIndex: function( val ) {
        this._active = val;
        return this;
    },

    /**
        Manually modify the counter

        @param {number} index Optional data index to fectch,
        if no index found it assumes the currently active index

        @returns Instance
    */

    setCounter: function( index ) {

        if ( typeof index === 'number' ) {
            index++;
        } else if ( typeof index === 'undefined' ) {
            index = this.getIndex()+1;
        }

        this.get( 'current' ).innerHTML = index;

        if ( IE ) { // weird IE bug

            var count = this.$( 'counter' ),
                opacity = count.css( 'opacity' );

            if ( parseInt( opacity, 10 ) === 1) {
                Utils.removeAlpha( count[0] );
            } else {
                this.$( 'counter' ).css( 'opacity', opacity );
            }

        }

        return this;
    },

    /**
        Manually set captions

        @param {number} index Optional data index to fectch and apply as caption,
        if no index found it assumes the currently active index

        @returns Instance
    */

    setInfo : function( index ) {

        var self = this,
            data = this.getData( index );

        $.each( ['title','description'], function( i, type ) {

            var elem = self.$( 'info-' + type );

            if ( !!data[type] ) {
                elem[ data[ type ].length ? 'show' : 'hide' ]().html( data[ type ] );
            } else {
               elem.empty().hide();
            }
        });

        return this;
    },

    /**
        Checks if the data contains any captions

        @param {number} index Optional data index to fectch,
        if no index found it assumes the currently active index.

        @returns {boolean}
    */

    hasInfo : function( index ) {

        var check = 'title description'.split(' '),
            i;

        for ( i = 0; check[i]; i++ ) {
            if ( !!this.getData( index )[ check[i] ] ) {
                return true;
            }
        }
        return false;

    },

    jQuery : function( str ) {

        var self = this,
            ret = [];

        $.each( str.split(','), function( i, elemId ) {
            elemId = $.trim( elemId );

            if ( self.get( elemId ) ) {
                ret.push( elemId );
            }
        });

        var jQ = $( self.get( ret.shift() ) );

        $.each( ret, function( i, elemId ) {
            jQ = jQ.add( self.get( elemId ) );
        });

        return jQ;

    },

    /**
        Converts element IDs into a jQuery collection
        You can call for multiple IDs separated with commas.

        @param {string} str One or more element IDs (comma-separated)

        @returns jQuery

        @example this.$('info,container').hide();
    */

    $ : function( str ) {
        return this.jQuery.apply( this, Utils.array( arguments ) );
    }

};

// End of Galleria prototype

// Add events as static variables
$.each( _events, function( i, ev ) {

    // legacy events
    var type = /_/.test( ev ) ? ev.replace( /_/g, '' ) : ev;

    Galleria[ ev.toUpperCase() ] = 'galleria.'+type;

} );

$.extend( Galleria, {

    // Browser helpers
    IE9:     IE === 9,
    IE8:     IE === 8,
    IE7:     IE === 7,
    IE6:     IE === 6,
    IE:      IE,
    WEBKIT:  /webkit/.test( NAV ),
    SAFARI:  /safari/.test( NAV ),
    CHROME:  /chrome/.test( NAV ),
    QUIRK:   ( IE && doc.compatMode && doc.compatMode === "BackCompat" ),
    MAC:     /mac/.test( navigator.platform.toLowerCase() ),
    OPERA:   !!window.opera,
    IPHONE:  /iphone/.test( NAV ),
    IPAD:    /ipad/.test( NAV ),
    ANDROID: /android/.test( NAV ),
    TOUCH:   ('ontouchstart' in doc)

});

// Galleria static methods

/**
    Adds a theme that you can use for your Gallery

    @param {Object} theme Object that should contain all your theme settings.
    <ul>
        <li>name - name of the theme</li>
        <li>author - name of the author</li>
        <li>css - css file name (not path)</li>
        <li>defaults - default options to apply, including theme-specific options</li>
        <li>init - the init function</li>
    </ul>

    @returns {Object} theme
*/

Galleria.addTheme = function( theme ) {

    // make sure we have a name
    if ( !theme.name ) {
        Galleria.raise('No theme name specified');
    }

    if ( typeof theme.defaults !== 'object' ) {
        theme.defaults = {};
    } else {
        theme.defaults = _legacyOptions( theme.defaults );
    }

    var css = false,
        reg;

    if ( typeof theme.css === 'string' ) {

        // look for manually added CSS
        $('link').each(function( i, link ) {
            reg = new RegExp( theme.css );
            if ( reg.test( link.href ) ) {

                // we found the css
                css = true;

                // the themeload trigger
                _themeLoad( theme );

                return false;
            }
        });

        // else look for the absolute path and load the CSS dynamic
        if ( !css ) {

            $('script').each(function( i, script ) {

                // look for the theme script
                reg = new RegExp( 'galleria\\.' + theme.name.toLowerCase() + '\\.' );
                if( reg.test( script.src )) {

                    // we have a match
                    css = script.src.replace(/[^\/]*$/, '') + theme.css;

                    Utils.addTimer( "css", function() {
                        Utils.loadCSS( css, 'galleria-theme', function() {

                            // the themeload trigger
                            _themeLoad( theme );

                        });
                    }, 1);

                }
            });
        }

        if ( !css ) {
            Galleria.raise('No theme CSS loaded');
        }
    } else {

        // pass
        _themeLoad( theme );
    }
    return theme;
};

/**
    loadTheme loads a theme js file and attaches a load event to Galleria

    @param {string} src The relative path to the theme source file

    @param {Object} [options] Optional options you want to apply
*/

Galleria.loadTheme = function( src, options ) {

    var loaded = false,
        length = _galleries.length,
        err = window.setTimeout( function() {
            Galleria.raise( "Theme at " + src + " could not load, check theme path.", true );
        }, 5000 );

    // first clear the current theme, if exists
    Galleria.theme = undef;

    // load the theme
    Utils.loadScript( src, function() {

        window.clearTimeout( err );

        // check for existing galleries and reload them with the new theme
        if ( length ) {

            // temporary save the new galleries
            var refreshed = [];

            // refresh all instances
            // when adding a new theme to an existing gallery, all options will be resetted but the data will be kept
            // you can apply new options as a second argument
            $.each( Galleria.get(), function(i, instance) {

                // mix the old data and options into the new instance
                var op = $.extend( instance._original.options, {
                    data_source: instance._data
                }, options);

                // remove the old container
                instance.$('container').remove();

                // create a new instance
                var g = new Galleria();

                // move the id
                g._id = instance._id;

                // initialize the new instance
                g.init( instance._original.target, op );

                // push the new instance
                refreshed.push( g );
            });

            // now overwrite the old holder with the new instances
            _galleries = refreshed;
        }

    });
};

/**
    Retrieves a Galleria instance.

    @param {number} [index] Optional index to retrieve.
    If no index is supplied, the method will return all instances in an array.

    @returns Instance or Array of instances
*/

Galleria.get = function( index ) {
    if ( !!_instances[ index ] ) {
        return _instances[ index ];
    } else if ( typeof index !== 'number' ) {
        return _instances;
    } else {
        Galleria.raise('Gallery index ' + index + ' not found');
    }
};

/**
    Creates a transition to be used in your gallery

    @param {string} name The name of the transition that you will use as an option

    @param {Function} fn The function to be executed in the transition.
    The function contains two arguments, params and complete.
    Use the params Object to integrate the transition, and then call complete when you are done.

*/

Galleria.addTransition = function( name, fn ) {
    _transitions[name] = fn;
};

/**
    The Galleria utilites
*/

Galleria.utils = Utils;

/**
    A helper metod for cross-browser logging.
    It uses the console log if available otherwise it falls back to alert

    @example Galleria.log("hello", document.body, [1,2,3]);
*/

Galleria.log = (function() {
    if( 'console' in window && 'log' in window.console ) {
        return window.console.log;
    } else {
        return function() {
            window.alert( Utils.array( arguments ).join(', ') );
        };
    }
}());

/**
    A ready method for adding callbacks when a gallery is ready
    Each method is call before the extend option for every instance

    @param {function} callback The function to call
*/

Galleria.ready = function( fn ) {
    $.each( _galleries, function( i, gallery ) {
        fn.call( gallery, gallery._options );
    });
    Galleria.ready.callbacks.push( fn );
};

Galleria.ready.callbacks = [];

/**
    Method for raising errors

    @param {string} msg The message to throw

    @param {boolean} [fatal] Set this to true to override debug settings and display a fatal error
*/

Galleria.raise = function( msg, fatal ) {

    var type = fatal ? 'Fatal error' : 'Error',

        self = this,

        echo = function( msg ) {

            var html = '<div style="padding:4px;margin:0 0 2px;background:#' +
                ( fatal ? '811' : '222' ) + '";>' +
                ( fatal ? '<strong>' + type + ': </strong>' : '' ) +
                msg + '</div>';

            $.each( _instances, function() {

                var cont = this.$( 'errors' ),
                    target = this.$( 'target' );

                if ( !cont.length ) {

                    target.css( 'position', 'relative' );

                    cont = this.addElement( 'errors' ).appendChild( 'target', 'errors' ).$( 'errors' ).css({
                        color: '#fff',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 100000
                    });
                }

                cont.append( html );

            });
        };

    // if debug is on, display errors and throw exception if fatal
    if ( DEBUG ) {
        echo( msg );
        if ( fatal ) {
            throw new Error(type + ': ' + msg);
        }

    // else just echo a silent generic error if fatal
    } else if ( fatal ) {
        if ( _hasError ) {
            return;
        }
        _hasError = true;
        fatal = false;
        echo( 'Image gallery could not load.' );
    }
};

// Add the version
Galleria.version = VERSION;

/**
    A method for checking what version of Galleria the user has installed and throws a readable error if the user needs to upgrade.
    Useful when building plugins that requires a certain version to function.

    @param {number} version The minimum version required

    @param {string} [msg] Optional message to display. If not specified, Galleria will throw a generic error.
*/

Galleria.requires = function( version, msg ) {
    msg = msg || 'You need to upgrade Galleria to version ' + version + ' to use one or more components.';
    if ( Galleria.version < version ) {
        Galleria.raise(msg, true);
    }
};

/**
    Adds preload, cache, scale and crop functionality

    @constructor

    @requires jQuery

    @param {number} [id] Optional id to keep track of instances
*/

Galleria.Picture = function( id ) {

    // save the id
    this.id = id || null;

    // the image should be null until loaded
    this.image = null;

    // Create a new container
    this.container = Utils.create('galleria-image');

    // add container styles
    $( this.container ).css({
        overflow: 'hidden',
        position: 'relative' // for IE Standards mode
    });

    // saves the original measurements
    this.original = {
        width: 0,
        height: 0
    };

    // flag when the image is ready
    this.ready = false;

    // placeholder for the timeout
    this.tid = null;

};

Galleria.Picture.prototype = {

    // the inherited cache object
    cache: {},

    // show the image on stage
    show: function() {
        Utils.show( this.image );
    },

    // hide the image
    hide: function() {
        Utils.moveOut( this.image );
    },

    clear: function() {
        this.image = null;
    },

    /**
        Checks if an image is in cache

        @param {string} src The image source path, ex '/path/to/img.jpg'

        @returns {boolean}
    */

    isCached: function( src ) {
        return !!this.cache[src];
    },

    /**
        Preloads an image into the cache

        @param {string} src The image source path, ex '/path/to/img.jpg'

        @returns Galleria.Picture
    */

    preload: function( src ) {
        $( new Image() ).load((function(src, cache) {
            return function() {
                cache[ src ] = src;
            };
        }( src, this.cache ))).attr( 'src', src );
    },

    /**
        Loads an image and call the callback when ready.
        Will also add the image to cache.

        @param {string} src The image source path, ex '/path/to/img.jpg'
        @param {Function} callback The function to be executed when the image is loaded & scaled

        @returns The image container (jQuery object)
    */

    load: function(src, callback) {

        // set a load timeout for debugging
        this.tid = window.setTimeout( (function(src) {
            return function() {
                Galleria.raise('Image not loaded in ' + Math.round( TIMEOUT/1000 ) + ' seconds: '+ src);
            };
        }( src )), TIMEOUT );

        this.image = new Image();

        var i = 0,
            reload = false,

            // some jquery cache
            $container = $( this.container ),
            $image = $( this.image ),

            // the onload method
            onload = (function( self, callback, src ) {

                return function() {

                    var complete = function() {

                        // save the original size
                        self.original = {
                            height: this.height,
                            width: this.width
                        };

                        self.cache[ src ] = src; // will override old cache

                        // clear the debug timeout
                        window.clearTimeout( self.tid );

                        if (typeof callback == 'function' ) {
                            window.setTimeout(function() {
                                callback.call( self, self );
                            },1);
                        }
                    };

                    // Delay the callback to "fix" the Adblock Bug
                    // http://code.google.com/p/adblockforchrome/issues/detail?id=3701
                    if ( ( !this.width || !this.height ) ) {
                        window.setTimeout( (function( img ) {
                            return function() {
                                if ( img.width && img.height ) {
                                    complete.call( img );
                                } else {
                                    Galleria.raise('Could not extract width/height from image: ' + img.src +
                                        '. Traced measures: width:' + img.width + 'px, height: ' + img.height + 'px.');
                                }
                            };
                        }( this )), 2);
                    } else {
                        complete.call( this );
                    }
                };
            }( this, callback, src ));

        // remove any previous images
        $container.find( 'img' ).remove();

        // append the image
        $image.css( 'display', 'block').appendTo( this.container );

        // hide it for now
        Utils.hide( this.image );

        if ( this.cache[ src ] ) {

            // no need to load if the image is cached, just call onload and set source
            this.image.src = src;

            onload.call( this.image );
            return this.container;
        }

        // begin load and insert in cache when done
        $( this.image ).load( onload ).error( function() {
            if ( !reload ) {
                reload = true;
                // reload the image with a timestamp
                window.setTimeout((function(image, src) {
                    return function() {
                        image.attr('src', src + '?' + Utils.timestamp() );
                    };
                }( $(this), src )), 50);
            } else {
                // apply the dummy image if it exists
                if ( DUMMY ) {
                    $( this ).attr( 'src', DUMMY );
                } else {
                    Galleria.raise('Image not found: ' + src);
                }
            }
        }).attr( 'src', src );

        // return the container
        return this.container;
    },

    /**
        Scales and crops the image

        @param {Object} options The method takes an object with a number of options:

        <ul>
            <li>width - width of the container</li>
            <li>height - height of the container</li>
            <li>min - minimum scale ratio</li>
            <li>max - maximum scale ratio</li>
            <li>margin - distance in pixels from the image border to the container</li>
            <li>complete - a callback that fires when scaling is complete</li>
            <li>position - positions the image, works like the css background-image property.</li>
            <li>crop - defines how to crop. Can be true, false, 'width' or 'height'</li>
            <li>canvas - set to true to try a canvas-based rescale</li>
        </ul>

        @returns The image container object (jQuery)
    */

    scale: function( options ) {

        // extend some defaults
        options = $.extend({
            width: 0,
            height: 0,
            min: undef,
            max: undef,
            margin: 0,
            complete: function() {},
            position: 'center',
            crop: false,
            canvas: false
        }, options);

        // return the element if no image found
        if (!this.image) {
            return this.container;
        }

        // store locale variables
        var width,
            height,
            self = this,
            $container = $( self.container ),
            data;

        // wait for the width/height
        Utils.wait({
            until: function() {
                width  = options.width ||
                         $container.width() ||
                         Utils.parseValue( $container.css('width') );

                height = options.height ||
                         $container.height() ||
                         Utils.parseValue( $container.css('height') );

                return width && height;
            },
            success: function() {
                // calculate some cropping
                var newWidth = ( width - options.margin * 2 ) / self.original.width,
                    newHeight = ( height - options.margin * 2 ) / self.original.height,
                    cropMap = {
                        'true'  : Math.max( newWidth, newHeight ),
                        'width' : newWidth,
                        'height': newHeight,
                        'false' : Math.min( newWidth, newHeight )
                    },
                    ratio = cropMap[ options.crop.toString() ],
                    canvasKey = '';

                // allow max_scale_ratio
                if ( options.max ) {
                    ratio = Math.min( options.max, ratio );
                }

                // allow min_scale_ratio
                if ( options.min ) {
                    ratio = Math.max( options.min, ratio );
                }

                $.each( ['width','height'], function( i, m ) {
                    $( self.image )[ m ]( self[ m ] = self.image[ m ] = Math.round( self.original[ m ] * ratio ) );
                });

                $( self.container ).width( width ).height( height );

                if ( options.canvas && _canvas ) {

                    _canvas.elem.width = self.width;
                    _canvas.elem.height = self.height;

                    canvasKey = self.image.src + ':' + self.width + 'x' + self.height;

                    self.image.src = _canvas.cache[ canvasKey ] || (function( key ) {

                        _canvas.context.drawImage(self.image, 0, 0, self.original.width*ratio, self.original.height*ratio);

                        try {

                            data = _canvas.elem.toDataURL();
                            _canvas.length += data.length;
                            _canvas.cache[ key ] = data;
                            return data;

                        } catch( e ) {
                            return self.image.src;
                        }

                    }( canvasKey ) );

                }

                // calculate image_position
                var pos = {},
                    mix = {},
                    getPosition = function(value, measure, margin) {
                        var result = 0;
                        if (/\%/.test(value)) {
                            var flt = parseInt( value, 10 ) / 100,
                                m = self.image[ measure ] || $( self.image )[ measure ]();

                            result = Math.ceil( m * -1 * flt + margin * flt );
                        } else {
                            result = Utils.parseValue( value );
                        }
                        return result;
                    },
                    positionMap = {
                        'top': { top: 0 },
                        'left': { left: 0 },
                        'right': { left: '100%' },
                        'bottom': { top: '100%' }
                    };

                $.each( options.position.toLowerCase().split(' '), function( i, value ) {
                    if ( value === 'center' ) {
                        value = '50%';
                    }
                    pos[i ? 'top' : 'left'] = value;
                });

                $.each( pos, function( i, value ) {
                    if ( positionMap.hasOwnProperty( value ) ) {
                        $.extend( mix, positionMap[ value ] );
                    }
                });

                pos = pos.top ? $.extend( pos, mix ) : mix;

                pos = $.extend({
                    top: '50%',
                    left: '50%'
                }, pos);

                // apply position
                $( self.image ).css({
                    position : 'absolute',
                    top :  getPosition(pos.top, 'height', height),
                    left : getPosition(pos.left, 'width', width)
                });

                // show the image
                self.show();

                // flag ready and call the callback
                self.ready = true;
                options.complete.call( self, self );

            },
            error: function() {
                Galleria.raise('Could not scale image: '+self.image.src);
            },
            timeout: 1000
        });
        return this;
    }
};

// our own easings
$.extend( $.easing, {

    galleria: function (_, t, b, c, d) {
        if ((t/=d/2) < 1) {
            return c/2*t*t*t + b;
        }
        return c/2*((t-=2)*t*t + 2) + b;
    },

    galleriaIn: function (_, t, b, c, d) {
        return c*(t/=d)*t + b;
    },

    galleriaOut: function (_, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }

});

// the plugin initializer
$.fn.galleria = function( options ) {

    return this.each(function() {
        $( this ).data( 'galleria', new Galleria().init( this, options ) );
    });

};

// phew

}( jQuery ) );;
