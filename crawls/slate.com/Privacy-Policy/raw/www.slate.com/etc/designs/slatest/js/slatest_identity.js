// don't do any of this in edit mode
if (typeof(WCMMode) == "undefined" || WCMMode != "EDIT") {
	var currentURL = window.location + "";
	if (typeof(echo_path) != "undefined") {
		currentURL = echo_path;
	} else if (typeof(post_path) != "undefined") {
		currentURL = post_path + ".html"
	}
	if (currentURL.substring(0,1) == '/') {
		currentURL = slate_public_url + currentURL;
	}
	var showAllQuery = "childrenof:" + currentURL + " type:comment -source:Twitter " +
	"source:slate.com (state:ModeratorApproved OR (state:Untouched " +
	"-user.state:ModeratorBanned,ModeratorDeleted -user.id:http://js-kit.com/ECHO/user/fake_user)) sortOrder:reverseChronological" +
	" children:3 (state:ModeratorApproved OR (state:Untouched " +
	"-user.state:ModeratorBanned,ModeratorDeleted -user.id:http://js-kit.com/ECHO/user/fake_user)) itemsPerPage:10 " +
	"childrenSortOrder:chronological childrenItemsPerPage:3";
	(function($) {
	    var plugin = Echo.createPlugin({
		"name": "WaPoAuth",
		"applications": ["Submit"],
		"init": function(plugin, application) {
		    plugin.extendRenderer("Submit", "postButton", plugin.postButtonRenderer);
		    //plugin.extendRenderer("Submit", "container", plugin.containerRenderer);
		}
	    });
	    
	    plugin.postButtonRenderer = function(element, dom) {
			var application = this;
			application.parentRenderer("postButton", arguments);
			if (wapoIdentity.echo_username === "") {
		    	this.config.set("submissionProxyURL", "http://bunsen.wapolabs.com/identity/1.5.1/js/wapo_jskit_login_redirect.js");
			}
		};

		var showAllPlugin = Echo.createPlugin({
			"name": "ShowAllComments",
			"applications": ["Stream"],
			"init": function(showAllPlugin, application) {
					showAllPlugin.extendRenderer("Stream", "showall",
							showAllPlugin.showAllRenderer);
					showAllPlugin.extendTemplate("Stream", showAllPlugin.showAllTpl
                    , "insertBefore", "echo-stream-header");
			}
	    });
		showAllPlugin.showAllTpl = '<div class="echo-application-message echo-stream-showall-container" style="margin-top:10px">' +
                '<input class="echo-stream-showall" type="button" value="Show All Comments" ' +
                'style="border:0;background:none;font-weight:bold;" /></div>';
		showAllPlugin.showAllRenderer = function(element, dom) {
            var application = this;
            element.one("click", function() {
                application.disablePlugin("ShowAllComments");
                application.config.set("query", showAllQuery);
				application.refresh();
            });
        };
	})(jQuery); 
	
		Backplane.init({
		"serverBaseURL" : "http://api.echoenabled.com/v1",
		"busName": "slate.com" <!-- will always be WaPo -->
		});
		var echoQuery = showAllQuery;
		var streamTarget = document.getElementById("echo-stream");
		var enableShowAll = false;
		function loadEcho() {
			var singleCommentId = s.getQueryParam('commentId');
			if (singleCommentId.length > 0) {
				echoQuery = "url:" + singleCommentId + " children source:slate.com " +
						"(state:ModeratorApproved OR (state:Untouched " +
				"-user.state:ModeratorBanned,ModeratorDeleted)) sortOrder:reverseChronological";
				enableShowAll = true;
			}
			new Echo.Stream({
			"target": this,
			"appkey": appkey, //Mandatory. Request your own Echo appkey.
			//query can also show top commenter
			"query": echoQuery,
			"children": {
				"additionalItemsPerPage": 10,
				"moreButtonSlideTimeout": 400,
				"itemsSlideTimeout": 400
			},
			"streamStateToggleBy": "button",
			"streamStateLabel": {
				"icon": true,
				"text": true
			},
			"viaLabel": {
				"icon": false,
				"text": true
			},
			"plugins": [{
		        	"name": "Reply",
		        	"actionString": "Write reply here...",
		        	"nestedPlugins": [{
		        		"name": "FormAuth",
		        		"nestedPlugins": [{
		        			"name": "WaPoAuth"
		        		}]
		        	}]
				},
				{"name": "ItemPermalink", "format": $("meta[property=\"og:url\"]").attr("content") + "?commentId=[ID]"},
				{"name": "ItemSanitization"},
				{"name": "Like"},
				{"name": "CommunityFlag"},
				{"name": "Curation"},
				{"name": "UserBan"},
				{"name": "Edit"},
				{"name": "ShowAllComments",
				 "enabled": enableShowAll}
			],
			"reTag": false,
			"maxBodyCharacters": 10000,
			"aggressiveSanitization": true,
			"openLinksInNewWindow": false //No comma after the last parameter.
		    });
		}
	
		if (streamTarget) {
			$(document).ready(function() {
				$(streamTarget).lazyload({appear: loadEcho });
			});
		}

		var submitTarget = document.getElementById("echo-submit");
		//console.log(submitTarget);
		if (submitTarget) {
			new Echo.Submit({
				"target": submitTarget,
				"appkey": appkey,
				"targetURL": currentURL,
				"plugins": [{"name": "FormAuth",
			        		 "nestedPlugins": [{
			            		"name": "WaPoAuth"
			        		  }]
			        		},
                            {"name": "SubmitTextCounter",
                             "limit": 5000,
                             "label": "Length: {typed} characters (Max: {limit})"
                            }]
			});
			 
			$wpjQ(window).bind('echoLoginStateChange',
				function(e, loginStatus) {
					//console.log("echoLoginStateChange");  
					initEchoSubmitWidget(submitTarget, loginStatus); 
					});
			
			function initEchoSubmitWidget(target, loginStatus) {
			//if a user is logged out or doesn't belong to the commenting group
			//then we need to setup the Echo Submit widget for anonymously commenting 
			//then forwarding to login/registration 
			//console.log("at initEchoSubmitWidget");
			if(loginStatus === "logout" || wapoIdentity.isMemberOfCommentingGroup() === false) {
				var origRenderer = Echo.Submit.prototype.post;
				//console.log("registering function with postButton");
                //save the original echo submit function
                var origEchoSubmitFunction = Echo.Submit.prototype.post;
                Echo.Submit.prototype.post = function() {
                    //if user is not logged in
                   if ($wpjQ('#wapolabs_wrapperLoginStatus a .lnk_login').text() == 'Log in')  {
                        this.config.set("submissionProxyURL","http://bunsen.wapolabs.com/identity/1.5.1/js/wapo_jskit_login_redirect.js");
                        origRenderer.call(this);
                    } else {
                        //if they are logged in, set the echo button to behave normally
                        origEchoSubmitFunction.call(this);
                  }
                };
				//console.log("Echo.Submit.prototype.renderers.postButton = "+Echo.Submit.prototype.renderers.postButton);
 
				new Echo.Submit(target,
								{"appkey": appkey,
								"targetURL": currentURL});
				}
				//if the user isn't logged in then fill in comment submission login name with "Guest"
				if(loginStatus === "logout")
				{
				//check if Submit widget is ready for display name
				var submissionLoginInput = $wpjQ("input.echo-submit-anonymousUserInfoName");
				if(submissionLoginInput !== null) {
		  		submissionLoginInput.val("Guest");
				}
				//also in case jskit re-renders the widget then make sure that\
				//the display name gets reset to Guest
				Echo.Broadcast.subscribe('Submit.onRender', 
		  		function(target, targetURL, data) {
		  			var submissionLoginInput = $wpjQ("input.echo-submit-anonymousUserInfoName");
		  			if(submissionLoginInput !== null) {
		  				submissionLoginInput.val("Guest");
		  			}
		  		});
				}
			}		
		}
		
		// streamer
		if (jQuery("#echo-stream-slate")) {
			new Echo.Stream({
				"target": document.getElementById("echo-stream-slate"),
				"appkey": appkey,
				"query": "(childrenof:http://slate.com/* OR childrenof:http://slatest.slate.com/*) provider:SlateStreamer type:status itemsPerPage:12 children:0",
				"streamStateLabel": {"icon": false, "text": false },
				"viaLabel": {"icon": false, "text": false},
				"aggressiveSanitization": false,
				"openLinksInNewWindow": true,
				"plugins":[
					{
						"name": "slateStreamer"
					}
				  ] 
			});
		}		
		
$(document).ready(function() {
	// Use setTimeout to wait until Login/Register link is ready
	setTimeout(function() {
		$("#echo-submit .echo-submit-anonymousUserInfoUrlContainer").css("display", "none");
		if ($wpjQ('#wapolabs_wrapperLoginStatus a .lnk_login').text() == 'Log in') {
			$wpjQ('#wapolabs_wrapperLoginStatus').children().clone(true,true).appendTo('#login-dup');
			$("#echo-submit .echo-submit-anonymousUserInfoName").attr("disabled", "true");
			$("#echo-submit textarea").attr("disabled", "true").val("Please log in to comment.");
			$(".echo-ui .echo-button .ui-button").detach();
			var domain = '';
			if (slate_public_url.indexOf("dev") != -1 || slate_public_url.indexOf("local") != -1) {
				domain = 'iddev.dev.slate.com';
			} else if (slate_public_url.indexOf("stage") != -1) {
				domain = 'id.stage.slate.com';
			 } else {
				domain = 'id.slate.com';
			}
			$(".echo-ui .echo-button").html('<a class="thickbox" href="http://' + 
					domain + '/identity/public/login/options?next_url=' + 
					escape(window.location + '#article_comment_box') + 
					'&target=comment&KeepThis=true&TB_iframe=true&height=464&width=undefined&modal=true"><div class="ui-button">Post</div></a>');
			//tb_remove();
			tb_init('a.thickbox, area.thickbox, input.thickbox', function() { });
		}
	}, 2000);
});
}