/**
 * converted stringify() to jQuery plugin.
 * serializes a simple object to a JSON formatted string.
 * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements

 * UPDATES:
 *      Added a fix to skip over Object.prototype members added by the prototype.js library
 * USAGE:
 *  jQuery.ajax({
 *	    data : {serialized_object : jQuery.stringify (JSON_Object)},
 *		success : function (data) {
 *
 *		}
 *   });
 *
 * CREDITS: http://blogs.sitepointstatic.com/examples/tech/json-serialization/json-serialization.js
 */
jQuery.extend({
    stringify  : function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});var fog = {

	init : function() {

	},

	user : {
		uid : 0
	},

	message : function(object){

		var str = object.message;
		var type = object.type;
		var container = object.container;

		if (!type) {
			type = 'info';
		}

		var title = '';

		if (object.title !== false)
		{
			switch (type) {
				case 'danger':
					title = 'Oops, something went wrong'
					break;
				case 'success':
					title = 'Yay! Success!';
					break;
				case 'info':
				default:
					title = 'Here\'s the low down';
					break;
			}

			title = '<h4>'+title+'</h4>';
		}

		if ($(document.body).find('.js-alert')) {
			$('.js-alert').remove();
		}

		var alert = $('<div />');
		alert.addClass('cl js-alert alert-block alert alert-' + type);
		alert.html('<button type="button" class="close" data-dismiss="alert">x</button>'+title+'<p>'+str+'</p>');

		if (!container)	{
			container = document.body;
			alert.css({
				position : 'fixed',
				top   : 144,
				right     : 50
			});
		}

		$(container).prepend(alert);
		alert.fadeIn(fog.normalSpeed);

		if (type === 'success' || type === 'info') {
			setTimeout(function(){
				alert.fadeOut(fog.normalSpeed);
			}, 5000);
		}
	},

	request : function(url, data, callback){

		var baseUrl = '/ajax/call/';

		$.post(baseUrl + url, {
			data : data
		}, function(r){

			r = JSON.parse(r);
			if (!r.error) {
				if (callback) {
					callback(r);
				}
			} else {
				fog.message(r);
			}
		});

	},

	cdnServer   : 'http://freeonlinegames.com',
	slowSpeed   : 200,
	normalSpeed : 500,
	fastSpeed   : 1000,

	buttons : {

		addFavorite : '[data-method="add-favorite"]',
		removeFavorite : '[data-method="remove-favorite"]'

	},
	switchElement : function (element, data, current, callback) {
		$.ajax({
			url : '/ajax/create_element',
			type : 'post',
			data : {
				element : element,
				data    : data
			},
			async : false,
			success : function(rendered) {
				$(current).replaceWith(rendered);
				fog.timeago();

				if (typeof callback === 'function') {
					callback();
				}

			}
		});

	},
	createElement : function(element, data, container, replace, callback, append) {
		$.ajax({
			url : '/ajax/create_element',
			type : 'post',
			data : {
				element : element,
				data    : data
			},
			async : false,
			success : function(rendered) {
				if (replace === true) {
					$(container).html(rendered);
				} else {
					if (append) {
						$(container).append(rendered);
					} else {
						$(container).prepend(rendered);
					}
				}
				fog.timeago();
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	},
	addFavorite : function(el, gameId) {
		el.attr('disabled', true);
		var gameId = parseInt(gameId, 10);
		fog.request('/favorites/add_favorite', {
			game_id : gameId
		}, function(){
			if (el.hasClass('btn-success')) {

				if (fog.user.fbid) {

					// Wait for facebook init
					fbEnsureInit(function() {
						FB.api('/me/og.likes','post', {
							object : fog.url,
						}, function(response){
						
							console.log(response);

						});
					});
				}


				el.removeClass('btn-success')
				.addClass('btn-danger')
				.attr('data-callback', 'fog.removeFavorite')
				.text('Remove Favorite');
			} else {
				el.attr('data-callback', 'fog.removeFavorite')
				.removeClass('icon-thumbs-up')
				.addClass('icon-thumbs-down')
				.attr('data-original-title', 'Remove from favorites');
			}
		});
		el.attr('disabled', false);
	},

	removeFavorite : function(el, gameId) {
		el.attr('disabled', true);
		var gameId = parseInt(gameId, 10);
		fog.request('/favorites/remove_favorite', {
			game_id : gameId
		}, function(){
			if (el.hasClass('btn-danger')) {
				el.removeClass('btn-danger')
				.addClass('btn-success')
				.attr('data-callback', 'fog.addFavorite')
				.text('Add Favorite');
			} else {
				el.attr('data-callback', 'fog.addFavorite')
				.removeClass('icon-thumbs-down')
				.addClass('icon-thumbs-up')
				.attr('data-original-title', 'Add to favorites');
			}
		});
		el.attr('disabled', false);
	},

	addComment : function(el, gameId) {
		el.attr('disabled', true);
		var gameId = parseInt(gameId, 10);
		var comment = el.prev().prev().val();

		if (comment.length < 10) {
			el.attr('disabled', false);
			return fog.message({
				message : 'Your comment must be longer than 10 characters',
				type : 'danger',
				container : '#create-comment'
			});
		}

		fog.request('/comments/add_comment', {
			game_id : gameId,
			comment : comment
		}, function(comment_id){
			el.prev().prev().val('');
			$('.character-count span').text('100');

			if ($('#game-comments-wrapper article').length == 0) {
				$('#game-comments-wrapper').empty();
			}

			fog.createElement('game/comments', {
				comment : comment,
				username : fog.user.username,
				timestamp : new Date().getTime() / 1000,
				id : comment_id,
				flags : 0,
				likes : 0,
				data : {
					u_email : fog.user.email,
					u_avatar :  fog.user.avatar,
					u_avatar_type :  fog.user.avatar_type
				}
			}, '#game-comments-wrapper');
		});
		el.attr('disabled', false);
	},

	characterCount : function(el, maxLength) {
		var chars = el.val().length;

		if (maxLength-chars <= 0) {
			$('.character-count span').css('color', '#f00');
			$('.character-count span').html(0);
		} else {
			$('.character-count span').css('color', '#888');
			$('.character-count span').html(maxLength-chars);
		}
	},

	loadGameComments : function (gameId, offset, limit) {
		var container = '#game-comments-wrapper';

		$('#load-more-comments').text('Loading...').attr('disabled', true);

		if (!offset) {
			offset = 0;
		}

		if (!limit) {
			limit = 3;
		}

		fog.request('/comments/find_by_game', {
			game_id : gameId,
			limit   : limit,
			offset  : offset,
			json 	: 'true'
		}, function(data){

			var comments = data.comments;

			if (!comments || comments.length === 0 && offset === 0) {
				$(container).html('<div class="alert alert-warn"><h4>No comments made yet.</h4>Be the first to comment on this game</div>');
				
				return false;
			} else {

				var append = true;
				if ($(container).find('.loading').length) {
					comments.reverse();
					$(container).empty();
					append = false;
				}

				$('#load-more-comments').text('Load more').removeAttr('disabled');

				if(comments.length !== 0)
				{
					$.each(comments, function(k, v){

						fog.createElement('/game/comments', {
							username : v.u_username,
							comment : v.comment,
							timestamp : v.timestamp,
							id 		: v.cid,
							flags   : v.flags,
							likes   : v.likes,
							data 	: v
						}, container, false, {}, append);
					});

					$('.timeago').timeago();

					if (data.more) {
						$('#load-more-comments').fadeIn();
					} else {
						$('#load-more-comments').remove();
					}
				}
				else
				{
					$('#load-more-comments').remove();
				}			
			}
		});
	},

	deleteComment : function(el, commentId) {
		if (!commentId) {
			return false;
		}

		fog.request('/comments/delete_comment', {
			comment_id : commentId
		}, function(r) {
			if (!r.error) {
				$('#warn-modal').modal('show');
				$('#warn-modal input[type=hidden]').val(r.user_id);
				var container = el.parent().parent().find('p')[0];
				$('#warn-modal textarea').val(
					'This is a warning about the comment you made on ' + fog.game.title + "\n" + 
					'Please refrain from posting comments such as this. The comment is below:' + "\n" + 
					r.comment
					);

				if ($('#game-comments-wrapper article').length == 1) {
					$('#game-comments-wrapper').html('<div class="alert alert-warn"><h4>No comments made yet.</h4>Be the first to comment on this game</div>');
				} else {
					el.parent().parent().parent().remove();
				}
			} else {
				return fog.message(r);
			}
		});
	},

	warnUser : function(el) {
		var user_id = parseInt($('#warn-modal input[name="user_id"]').val(), 10);
		var warning = $('#warn-modal textarea').val();

		fog.request('/users/warn_user', {
			user_id : user_id,
			warning : warning
		}, function(r){
			fog.message(r);
			$('#warn-modal').modal('hide');

			/*if (typeof server !== 'undefined') {
				server.emit('notification', {
					message : warning,
					user_id : user_id
				});	
			}*/
		});
	},

	flagComment : function(el, commentId) {
		if (!commentId) {
			return false;
		}

		fog.request('/comments/flag_comment', {
			comment_id : commentId
		}, function(r) {
			fog.message(r);
		});
	},

	likeComment : function(el, commentId) {
		if (!commentId) {
			return false;
		}

		if (!fog.user.uid) {
			return false;
		}

		fog.request('/comments/like_comment', {
			comment_id : commentId
		}, function(r) {
			if (!r.error) {
				var currentLikes = parseInt($('#comment-'+commentId).find('.comment-likes').find('span').text(), 10);
				$('#comment-'+commentId).find('.comment-likes').find('span').text(currentLikes + 1);
				/*server.emit('notification', {
					message : '<a href="/user/'+fog.user.uid+'">'+fog.user.username+'</a> likes your comment'
				});*/
			} else {
				fog.message(r);
			}
		});
	},

	toggleFlaggedComment : function(el, commentId) {
		if (!commentId){
			return false;
		}

		var showHide = $(el).text() === 'Show' ? 'Hide' : 'Show';

		$('#comment-'+commentId+' div').toggleClass('hide');
		$(el).text(showHide);
	},

	rateGame : function (el, params) {
		var rating = params[0],
		gameId = params[1];

		if (!rating || !gameId) {
			return false;
		}

		fog.request('/ratings/add', {
			game_id : gameId,
			rating  : rating
		}, function(r) {
			el.addClass('active');

			var index = el.index();

			for (var i=index; i>=0; --i) {
				$('.star').eq(i).addClass('active');
			}

			for (var i=index+1; i<=5; ++i) {
				$('.star').eq(i).removeClass('active');
			}

			// If the user has a facebook account, then share their rating on Facebook
			if (fog.user.fbid) {

				// Wait for facebook init
				fbEnsureInit(function() {
					FB.api('/me/fogconnect:rate','post', {
						game : fog.url,
						rating : rating
					}, function(response){
					
						console.log(response);

					});
				});
			}

			fog.message({
				message : 'Thankyou for your rating',
				type : 'success'
			});
		})
	},

	timeago : function() {
		$('time.timeago').timeago();
	},

	addPlaylater : function(el, gameId) {
		if (!gameId){
			return false;
		}

		fog.request('/playlater/add_playlater', {
			game_id : gameId
		}, function(r){
			if (!r.error) {
				$(el).removeClass('icon-plus-sign')
				.addClass('icon-minus-sign')
				.attr('data-original-title', 'Remove from playlater')
				.attr('data-callback', 'fog.removePlaylater');

				if ($('#playlater-banner li').length == 11) {
					$('#playlater-banner li:last').remove();
				}

				fog.createElement('/playlater/game', {
					title : $(el).parent().find('h6 > a').text().trim(),
					game_id : gameId,
					url   : $(el).parent().find('h6 > a').attr('href').replace('/game/', '')
				}, '#playlater-banner');

				$('[rel="tooltip"]').tooltip();
			} else {
				fog.message(r);
			}
		});
	},

	removePlaylater : function(el, gameId) {
		if (!gameId){
			return false;
		}

		fog.request('/playlater/remove_playlater', {
			game_id : gameId
		}, function(r){
			if (!r.error) {
				if ($(el).hasClass('icon-minus-sign')) {
					$(el).removeClass('icon-minus-sign')
					.addClass('icon-plus-sign')
					.attr('data-original-title', 'Add to playlater')
					.attr('data-callback', 'fog.addPlaylater');
				}
				$('#playlater-'+gameId).remove();
			} else {
				fog.message(r);
			}
		});
	},

	leaveGroup : function(el, groupId) {
		if (!groupId){
			return false;
		}

		fog.request('/groups/leave', {
			group_id : groupId
		}, function(r){
			if (r.error){
				return fog.message(r);
			}

			if (fog.page === 'groups' && fog.action) {
				location.href = '/groups';
			}
		});
	},

	joinGroup : function(el, groupId) {
		if (!groupId){
			return false;
		}

		fog.request('/groups/join', {
			group_id : groupId
		}, function(r){
			if (r.error){
				return fog.message(r);
			}
		});
	},

	createGroup : function (el) {
		var p = $('input[name="private"]').is(':checked') ? 1 : 0;
		fog.request('/groups/create', {
			owner : fog.user.uid,
			icon  : $('input[name="icon"]:checked').val(),
			'private' : p,
			title : $('input[name="title"]').val()
		}, function(r){
			location.href = '/groups/' + r;
		});
	},

	editGroup : function(el, groupId) {

		var p = $('input[name="status"]:checked').val();
		fog.request('/groups/edit', {
			owner : fog.user.uid,
			icon  : $('input[name="icon"]:checked').val(),
			status : p,
			title : $('input[name="title"]').val(),
			group_id : groupId
		}, function(r){
			fog.message(r);
		});
	},

	addGroupMember : function(el, groupId) {
		fog.request('/groups/add_members', {
			group_id : groupId,
			members : $('select[name="members"] option:selected').val()
		}, function(r) {
			/*if (typeof server !== 'undefined') {
				server.emit('notification', {
					message : 'You have been invited to a <a href="/group/'+groupId+'">Group</a>'
				});
			}*/
			location.reload();
		});
	},

	removeGroupMember : function(el, params) {
		var groupId = params[0];
		var userId  = params[1];

		fog.request('/groups/remove_member', {
			user_id : userId,
			group_id : groupId
		}, function(r){
			$(el).parent().remove();
		});
	},

	followUser : function(el, userId) {
		if (!userId) {
			return false;
		}

		fog.request('/relationships/follow', {
			user_id : userId
		}, function(r){
			el.removeClass('btn-success')
			.addClass('btn-danger')
			.text('Unfollow')
			.attr('data-callback', 'fog.unfollowUser');
		});
	},

	unfollowUser : function(el, userId) {
		if (!userId) {
			return false;
		}

		fog.request('/relationships/unfollow', {
			user_id : userId
		}, function(r){
			el.removeClass('btn-danger')
			.addClass('btn-success')
			.text('Follow')
			.attr('data-callback', 'fog.followUser');
		});
	},

	acceptGroupInvite : function(el, groupId) {
		fog.request('groups/accept_invite', {
			group_id : groupId
		}, function(r){			
			var notif_id = el.parent().attr('id');
			fog.markNotificationRead(el, notif_id);

			if (fog.action === 'group' && fog.page === 'groups') {
				window.location.reload();
				return;
			}

		});
	},

	declineGroupInvite : function(el, groupId) {
		fog.request('groups/decline_invite', {
			group_id : groupId
		}, function(r){			
			var notif_id = el.parent().attr('id');
			fog.markNotificationRead(el, notif_id);

			if (fog.action === 'group' && fog.page === 'groups') {
				window.location.reload();
				return;
			}

		});
	},

	markNotificationRead : function(el, notifId) {
		fog.request('notifications/mark_read', {
			notif_id : notifId
		}, function(r){
			el.parent().parent().parent().removeClass('unread');

			$('#mark-read-'+notifId).remove();
			$('#options-'+notifId).remove();
			
			

			if ($('#unread-count')) {
				var count = parseInt($('#unread-count').text().trim(), 10);
				count--;

				if (count <= 0) {
					$('#unread-count').remove();
				} else {
					$('#unread-count').text(count);
				}
			}
		});
	},

	ad : {
		showGame : function() {
			$('#game-wrap').css({display: 'block'});
			$('#preroll').remove();
		},
		countdown : function (element, timer) {
			--timer;

			if (timer <= 0) {
				fdjs.game.adComplete = true;
				fdjs.game.showGame();
			} else {
				if (element != 0)
				{
					$(element).html(timer);
				}
			}
			setTimeout('fog.ad.countdown', 1000, element, timer);
		},
		drawSkin: function(url, image_url, background_color, top_margin) {
			var id = 'adskin';
			var ad = $(document.createElement('a')).attr('id', id).attr('href', url).attr('target', '_blank');
			ad.css({
				'display': 'block',
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'z-index': '1',
				'width': '100%',
				'height': '100%',
				'background': 'transparent'
			});
			
			$('body').css('background', 'url(' + image_url + ') 50% 75px no-repeat');
			
			if(typeof background_color != 'undefined') {
				$('body').css('background-color', '#' + background_color);
			}
			
			if(typeof top_margin != 'undefined') {
				$('#main-container').css('margin-top', top_margin);
			}
			
			$('body').append(ad);
		}
	},

	oAuth : {
		fb : {
			appId : 202834586920
		}
	},

	checkBadge : function(badge, param) {
		fog.request('badge/check', {
			badge : badge,
			param : param
		}, function (r){
			if (r.level) {
				/*server.emit('new_badge', {
					user_id : fog.user.id,
					message : 'You have recieved the ' + r.level + ' ' + r.badge + ' badge! (' + r.xp + 'XP)',
					badge : r.badge,
					level : r.level,
					description : r.description
				});*/

				fog.request('Xp/add', {
					amount : r.xp,
					user_id : fog.user.id
				}, function(){
					var i = r.xp;
					var width = $('.bar').width();
					var parentWidth = 200;
					var percent = Math.ceil(100*width/parentWidth);

					var interval = setInterval(function(){
						++percent;
						--i;

						if (percent === 100) {
							percent = 0;
							var curLevel = $('#level-progress h4 > span').text().trim();
							$('#level-progress h4 > span').text(parseInt(curLevel, 10) + 1);
						}

						$('.bar').css({
							width : (percent) + '%'
						});

						if (i <= 0) {
							clearInterval(interval);
						}
					}, 100);
				});
			}
		});
	},

	badgePopup : function(data) {
		$('.achi').html('<div class="badge_level_' + data.level + '_small"></div>'
			+ '<div class="'+data.badge.replace(' ', '_').toLowerCase()+'_small"></div>'
			);

		$('#popup-text').text(data.description);
		$('.popup-container').animate({
			bottom : 0
		});
	},

	sendChat : function(message) {
		user = false;

		if (!message) {
			$('input[data-callback="fog.sendChat"]').attr('disabled', true);
			message = $('input[name="chat"]').val();
			user = true;
			if (message.length === 0) {
				return false;
			}
		}

		var data = {
			gameId : fog.game.id,
			user : fog.user,
			chat : message
		}
		if (typeof socket != 'undefined') {
			socket.emit('chat', data);
		}
		if (user) {
			$('input[name="chat"]').val('');			
		}

	},
	leaveChat : function() {
		socket.emit('leaveChat', fog.user, fog.game.id);
	},
	toggleChatUsers : function() {
		var el = $('#toggleRoom');

		if ($('#room-wrapper ul').hasClass('hide')) {
			$('#room-wrapper ul').removeClass('hide');
			
		} else {
			
			$('#room-wrapper ul').addClass('hide');
			
		}
	},
	getUser : function() {
		return fog.user;
	}/*,
	getUserData:function(){
		return this.user;
	},
	user:{
		'ID':'Guest',
		'Name':'Guest',
		'Thumb':'',
		'HighScore': 0
	},
	_updateUserComp:function(u){

		this.ID = u.uid;
		this.Name = u.username
	}
	
	*/
}

/*function animate() {
	var pos = ['left','right','top','bottom'];
	var aniArgs = {};

	aniArgs[pos[Math.round(Math.random() * (pos.length - 1))]] = Math.round(Math.random() * 100); 

	$(document.body).animate(
		aniArgs, 10
	);
}
	*/
$(document).ready(function(){
	/*$(document.body).css({'position':'absolute',top:0,left:0});
	setInterval('animate()', 10);*/
});

var FogApi = function(base){
	$.extend(this, {
		server : base + '/api/2/',
		polltime : 60000,
		debug : false,
		fb_post_id : 0,
		game : {
			adComplete : false,
			gameComplete: false,
			showGame : function() {
				if (this.adComplete === true && this.gameComplete === true) {
					showGame();
					$('#game-preloader-swf').remove();
				}	
			},
			loadComplete : function(){
				this.gameComplete = true;
				this.showGame();
			},
			connect :function() {
				console.log("Connect.");
			}
		},
		connectfl : function(){
			if (this.debug){
				console.log("Connected to Flash.")
			}
			fog.scoreboard.timeout = false;
			return true;
		},
		
		call : function(func, var1, var2) {
			if (this.debug){
				console.log("Calling function " + func+"("+var1+")");
			}
			var f = func.split('.');
			var t = this;
			for (var i=0;i<f.length;i++){
				t = t[f[i]];
			}
			if (t) {
				if (this.debug){
					console.log("Found function " + func+"("+var1+")");
				}
				return t.bind(this, var1, var2)();
			}
			else {
				if (this.debug){
					console.error("Function " + func + " does not exist!");
				}
				return false;
			}
		},
		request : function(method, func, data){
			if (this.debug){
				console.log("Ajax Request: "+method+"/"+func+"\nData: "+$.stringify(data));
			}

			var success = false;
			$.ajax({
				url : this.server + method + '/' + func,
				dataType : 'json',
				async : false,
				type : 'get',
				data: data,
				success : function(ret){
					if (this.debug){
						console.log('Success');
					}
					success = ret;
				},
				error : function(ret){
					if (this.debug){
						console.log('Error');
					}
					success = ret;
				}
			});

			if (this.debug)
			{
				console.log("Server Response: " + $.stringify(success));
			}

			return success;

		},
		scores : {
			dataPoll : function(){
				console.log('fuu');
			},
			dataPollFunc : function(){
				console.log('fuu2');
			},
			refresh: function (score, message) {
				fog.scoreboard.board();

				if (message.type == "success"){
					fog.sendChat("I Just got my highest score ("+score+")! Can you beat it?");
					fog.scoreboard.user();
				}

				if (message.type == 'success' || message.type == 'error'){
					message.container = '#scores_update';
					message.title = false;
					fog.message(message);
				}
				
			},
			update : function(score){
				
				if (this.debug){
					console.log("scores.update called, Game " + fog.game.id + " Score: " + score);
				}
				
				var request = this.request('scores', 'submit', {
					gid : fog.game.id,
					score: score,
					period : fog.scoreboard.data.period,
					group: fog.scoreboard.data.group
				});

				if (typeof request != 'undefined') {
						

					fog.scoreboard.board();

					if (request.type == "success"){

						fog.sendChat("I Just got my highest score ("+score+")! Can you beat it?");

						// If the user has a facebook account, then share their scores on Facebook
						if (fog.user.fbid) {

							// The ID of the local storage key
							var fb_post_id = fog.url + ':fb_post_id';

							// Wait for facebook init
							fbEnsureInit(function() {
								FB.api('/me/fogconnect:score','post', {
									game : fog.url,
									score : score
								}, function(response){
								
									// If a score has been submitted to Facebook before, then delete the old post so that we do not have loads of duplicates
									if (localStorage.getItem(fb_post_id)) {

										// Delete the old post
										FB.api('/' + localStorage.getItem(fb_post_id), 'delete', function(del_response){});
									}

									// Update local storage with the new post id
									localStorage.setItem(fb_post_id, response.id);

								});
							});
						}

						fog.scoreboard.user();
					}

					if (request.type === 'success' || request.type === 'error') {

						request.container = '#scores_update';
						request.title = false;
						fog.message(request);
					}

					
					return true;
				}
				return false;
			}
		}
	});
};

if (!fog) {
	var fog = {};
}

var __FogDevJS = FogApi;
var fdjs = new __FogDevJS(domain);
var FogDevJS = fdjs;

fog.api = {
	fdjs : new FogApi(domain),
	connect:function(){
		return this.fdjs.connectfl();
	},
	scores:{
		update:function(s){
			return fog.api.fdjs.call('scores.update', s);
		},
		getHighScore:function(){
			return fog.api.fdjs.call('scores.getHighScore');
		}
	},
	getUserData:function(){
		return this.user;
	},
	user:{
		'ID':'Guest',
		'Name':'Guest',
		'Thumb':'',
		'HighScore': 0
	},
	_updateUserComp:function(u){
		this.ID = u.uid;
		this.Name = u.username
	}
};$(document).ready(function() {

	fog.timeago();



	if (fog.user.uid) {

		level_percent =  Math.ceil(fog.user.xp / 10);

		if(level_percent > 100)
		{
			level_percent =  Math.ceil(fog.user.xp / 100);
		}

		$('.bar').css('width', level_percent + '%');
	}

	$(document.body).delegate('[data-handle="click"]', 'click', function(){
		var callback = $(this).attr('data-callback');
		if (callback) {
			var parts = callback.split('.');
			var method = window;

			$(parts).each(function(){
				method = method[this];
			});

			var params = $(this).attr('data-params');

			if (params) {
				if (params.indexOf(',') !== -1) {
					params = params.split(',');
				}
			} else {
				params = {};
			}

			method($(this), params);
		}
	});

	$(document.body).delegate('[data-handle="keyup"]', 'keyup', function(){
		var callback = $(this).attr('data-callback');
		if (callback) {
			var parts = callback.split('.');
			var method = window;

			$(parts).each(function(){
				method = method[this];
			});

			var params = $(this).attr('data-params');
			if (params && params.indexOf(',') !== -1) {
				params = params.split(',');
			}

			method($(this), params);
		}
	});

	$('#navbar ul li').mouseover(function() {
		if ($(this).hasClass("divider")) {
			return;
		}

		if ($(this).next().find('.dropdown').length > 0) {
			$(this).addClass('hover');
		}
	});

	$('#navbar ul li').mouseout(function() {
		if ($(this).hasClass("divider")) {
			return;
		}

		if (!$(this).find('.dropdown')) {
			return;
		}

		$(this).removeClass('hover');
	});

	$('#featured-container').slider({
		sliderId: 'featured-slider',
		pagination: true,
		paginationClass: 'featured-pagination',
		autoSlide : true,
		autoSpeed : 5000,
		captions  : true,
		keyboard  : true
	});

	$('.dropdown-toggle').dropdown();

	/*Module Navigations Start*/
	$('.module .module-left').click(function() {
		var currentGames = $(this).parent().parent().parent().find('.sub-module:visible')
		var nextGames = currentGames.prev('.sub-module');

		if(nextGames.length == 0) {
			nextGames = $(this).parent().parent().parent().find('.sub-module').last();
		}

		var tabNumber = nextGames.index();
		var totalTabs = nextGames.parent().find('div.sub-module').length;
		$(this).parent().find('span').text(tabNumber + ' / ' + totalTabs);

		currentGames.hide();
		nextGames.show();
	});

	$('.module .module-right').click(function() {
		var currentGames = $(this).parent().parent().parent().find('.sub-module:visible')
		var nextGames = currentGames.next('.sub-module');

		if(nextGames.length == 0) {
			nextGames = $(this).parent().parent().parent().find('.sub-module').first();
		}

		var tabNumber = nextGames.index();
		var totalTabs = nextGames.parent().find('div.sub-module').length;
		$(this).parent().find('span').text(tabNumber + ' / ' + totalTabs);

		currentGames.hide();
		nextGames.show();
	});

	/*Module Navigations End*/

	$('img').error(function() {
		$(this).attr('data-original', $(this).attr('src'));
		$(this).attr('src', '/images/icons/noimage.png');
	});
	/* Image Loading End */

	$('[rel="tooltip"]').each(function(k, el){
		$(el).tooltip({
			title : $(this).attr('title')
		});
	});

	$('[rel="popover"]').popover();
	$('[rel="popover-hover"]').popover({
		trigger: 'hover'
	});

	$('form[data-ajax="true"]').submit(function(e){
		e.preventDefault();
	});
	$('#dim-button, #lights-out').off('click').on('click', function(){
		if ($('#lights-out').hasClass('active')) {
			$('#lights-out').removeClass('active');
		} else {
			$('#lights-out').addClass('active');
		}
	})

	$(document.body).off('click.scoreboard').on('click.scoreboard','.scoreboard-link:not(.active)', function(){
		$('.group-title-name').html($(this).data('name'));
		fog.scoreboard.data.group = $(this).prop('id').replace('sg-', '');
		$('.active', '#sb-icons').removeClass('active');
		$(this).addClass('active');
		fog.scoreboard.board();
		fog.scoreboard.user();
	}).off('click.period').on('click.period', '#sb-period a', function(){
		$('.active', '#sb-period').removeClass('active');
		$(this).addClass('active');
		fog.scoreboard.board();
		fog.scoreboard.user();
	});

	$('.module-toggle h2').click(function(){
		$(this).parent().children('.hide').stop(true,true).slideToggle();
	});
	
	if (fog.game.scoreboard == true && fog.user.uid != 0){
		fog.scoreboard = new scoreboard();
	}
});

$(window).load(function(){
	fog.init();
});

function fbEnsureInit(callback) {
	if(!window.fbApiInit) {
		setTimeout(function() {
			fbEnsureInit(callback);
		}, 50);
	} else {
		if(callback) {
			FB.getLoginStatus(function(response){
				callback();
			});
		}
	}
}

var showGame = fog.ad.showGame;/*
* Slider, A banner slider plugin for jQuery
* Intructions: http://cjmarkham.com/jQuery-slider
* By: Carl Markham, http://cjmarkham.com
* Version: 1.0
* Updated: 28th July 2012
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

$.fn.slider = function(options){
	
	options  		= $.extend({}, $.fn.slider.options, options);
	var el 			= $(this);
	var left       	= $(options.left);
	var right      	= $(options.right);
	var container	= el.find('#' + options.sliderId);
	var numSlides  	= container.find('li').length;
	var slider  	= container.find('ul');
	var slideWidth 	= slider.find('li').outerWidth();
	var slideHeight = slider.find('li').outerHeight();
	var current	   	= 0;
	var prev		= 0;
	var next		= 0;
	var position	= 0;
	var direction	= 0;
	var start		= options.start || current;
	var autoSpeed	= options.autoSpeed;
	var interval;
	var sliding		= false;
	
	if (options.captions) {
		slider.children().each(function(i){
			var caption = $(this).find('.caption');
			caption.css('bottom', -200);
		});

		slider.children(':eq('+current+')').find('.caption').stop().animate({
			bottom : 0
		});
	}
	
	slider.children().css({
		position: 'absolute',
		top: 0, 
		left: slider.children().outerWidth(),
		zIndex: 0,
		display: 'none'
	 });
	
	slider.css({
		position: 'relative',
		width: (slideWidth * 3),
		height: slideHeight,
		minHeight : 250,
		left: -slideWidth
	});
	
	slider.children(':eq('+start+')').css({
		display: 'block'
	});
	
	if (options.autoSlide) {
		play();	
		
		if (options.pauseHover) {
			slider.bind('mouseover', function(){pause()});
			slider.bind('mouseleave', function(){play()});
		}
	}
	
	function play(){
		interval = setInterval(function(){
			animate('next');
		}, options.autoSpeed);
	}
	
	function pause(){
		clearInterval(interval);
	}
	
	if (options.pagination) {
		$('.' + options.paginationClass + ' li').each(function(i){
			if (i == start) {
				$(this).addClass('current');
			}
			$(this).attr('id', '#'+(i));
		});
		
		$('.' + options.paginationClass + ' li').click(function(){
			var page = $(this).attr('id');
			paginate(page);
		});
	}
	
	function paginate(page){
		animate('pagination', page);
	}
	
	if (options.prevNext) {
		right.click(function(){
			animate('next');
		});
		
		left.click(function(){
			animate('prev');
		});
	}
	
	if (options.keyboard) { 
		$(window).keydown(function(e){
			var code = e.which ? e.which : e.keyCode;
			if (code == 37) {
				animate('prev');
			}
			if (code == 39) {
				animate('next');
			}
		});

	}
	
	function animate(direction, page) {
		if (!sliding) {
			sliding = true;
			switch (direction) {
				case 'next':
					prev      = current;
					next      = current + 1;
					next	  = numSlides === next ? 0 : next;
					position  = (options.direction === 'horizontal' ? slideWidth : slideHeight) * 2;
					direction = -(options.direction === 'horizontal' ? slideWidth : slideHeight) * 2;
					current   = next;
				break;
				case 'prev':
					prev      = current;
					next      = current - 1;
					next 	  = next === -1 ? numSlides-1 : next;			
					position  = 0;
					direction = 0;
					current   = next;
				break;
				case 'pagination':
					next = parseInt(page.replace('#', ''));

					prev = parseInt($('.' + options.paginationClass + ' li.current').attr('id').match('[^#/]+$'), 10);
					
					if (next > prev) {
						position = (options.direction === 'horizontal' ? slideWidth : slideHeight) * 2;
						direction = -(options.direction === 'horizontal' ? slideWidth : slideHeight) * 2;
					} else if (next < prev) {
						position = 0;
						direction = 0;
					} else {
						
					}
					
					current = next;
				break;
			}
			
			options.slideStart(next);
			sliding = true;
			if (options.direction === 'horizontal') { 
				slider.children(':eq('+next+')').css({
					left : position,
					display : 'block'
				});
			} else {
				slider.children(':eq('+next+')').css({
					top : position,
					display : 'block'
				});
			}
			
			if (options.captions) {
				slider.children().each(function(i){
					var caption = $(this).find('.caption');
					caption.css('bottom', -200);
				});
				
				slider.children(':eq('+next+')').find('.caption').stop().animate({
					bottom : 0
				});
			}
			if (options.direction === 'horizontal') {
				slider.stop().animate({
					left : direction
				}, options.slideSpeed, function(){
					slider.css({
						left : -slideWidth
					});
					slider.children(':eq('+next+')').css({
						left : slideWidth,
						zIndex : 5
					});
					slider.children(':eq('+prev+')').css({
						left : slideWidth,
						display : 'block',
						zIndex : 0
					});
					options.slideEnd(next+1);
					sliding = false;	
				});	
			} else {
				slider.stop().animate({
					top : direction
				}, options.slideSpeed, function(){
					slider.css({
						top : -slideHeight
					});
					slider.children(':eq('+next+')').css({
						top : slideHeight,
						zIndex : 5
					});
					slider.children(':eq('+prev+')').css({
						top : slideHeight,
						display : 'none',
						zIndex : 0
					});
					options.slideEnd(next+1);
					sliding = false;
				});	
			}
			
			if (options.pagination) {
				$('.' + options.paginationClass + ' li.current').removeClass('current');
				$('.' + options.paginationClass + ' li:eq('+next+')').addClass('current');
			}
		}
	}
};
	
$.fn.slider.options = {
	sliderId   : 'slider',
	direction  : 'horizontal',
	prevNext   : true,
	left 	   : '#left',
	right 	   : '#right',
	keyboard   : false,
	autoSlide  : false,
	pagination : true,
	pauseHover : true,
	autoSpeed  : 3000,
	slideSpeed : 500,
	paginationClass : 'slide-pagination',
	slideStart : function() { },
	slideEnd   : function() { }
};var scoreboard = function(){
	this.data = {};

	this.setData = function(){
		this.data = {
			group : $('.scoreboard-link.active').prop('id').replace('sg-', ''),
			game_id : fog.game.id,
			period : $('.score-period.active').text()
		};
	};

	this.board = function()
	{
		this.setData();
		this.refresh('data', '#sb-content');
	};

	this.resize = function(){
		$('.sb-userscore').each(function(){
			$('.sb-name', this).width($(this).innerWidth() - ($('.sb-avatar', this).outerWidth() + $('.sb-score', this).outerWidth() + 12));
		});
	};

	this.user = function(){
		this.setData();
		this.refresh('my', '#sb-you');
	};

	this.reload = function(){
		var t = this;
		if (this.timeout == true) {
			t.board();
			t.user();
			setTimeout(function(){
				t.reload();
			}, 20000);
		}
	};

	this.refresh = function(url, target){
		fog.createElement('game/scoreboard/' + url, this.data, target, true);
		this.resize();
	};

	this.timeout = true;
	this.reload();
};var populated = false;
var hideGameTypes = ['unity3d', 'dir', 'dcr'];

$(document.body).ready(function(){
	$('.switch-register-modal').off('click.modal-2-modal').on('click.modal-2-modal', function(){
		$('#login-modal').modal('hide');
		$('#register-modal').modal('show');
	});

	if($.inArray(fog.game.type, hideGameTypes) > -1){
		$('#game-holder-game').css({
			width: fog.game.width,
			height: fog.game.height,
			overflow: 'hidden'
		});

		$('.modal').on('show', function(){
			$('#game-holder-game').css({
				width : 0,
				height: 0
			});
		});

		$('.modal').on('hidden', function(){
			$('#game-holder-game').css({
				width: fog.game.width,
				height: fog.game.height
			});
		});

	}
	$('.modal form').off('submit.ajax').on('submit.ajax', function(e){
		e.preventDefault();
		var t = this;
		$('.btn', this).prop('disabled', 'disabled');
		var success_text = $('.btn-success', this).html();
		$('.btn-success', this).html('<img src="/images/ajax-loader-white.gif"> '+ success_text);
		
		var data = {};
		data.type = $(this).data('type');
		data.username = $('[name=username]', this).val();
		data.password = $('[name=password]', this).val();

		if (data.type === 'register'){
			data.email = $('[name=email]', this).val();
			data.fbid = $('[name=fbid]', this).val();
		}

		$.ajax({
			'url' : '/ajax/auth/',
			'data' : data,
			'dataType' : 'json',
			'type' : 'post',
			'success' : function(response){

				if (response.u_uid){
						fog.user = {
							uid : response.u_uid,
							username : response.u_username,
							avatar : response.u_avatar,
							avatar_type : response.u_avatar_type,
							email : response.u_email
						};
						rerender_page();
				} else {
					response.container = '#' + $('.status-message', t).attr('id');
					response.title = false;
					fog.message(response);
					$('.btn', t).removeProp('disabled');
				$('.btn-success', t).text(success_text);

				}
			}
			
		});

	})

	$('.facebook-login').off('click.fb').on('click.fb', function(){
		$t = $(this);
		$icon = $('.icon', this);

		$icon = $icon.length > 0 ? $icon : $('.icon');

		$icon.html('<img src="/images/ajax-loader-white.gif" class="fb-ajax-loader">');
		$icon.css('background-position', '-14px -14px');

		$('#login-with-facebook-text').text('Logging in...');
		$('#other-login-head').attr('disabled', 'true');
		$t.attr('disabled', 'true');


		FB.login(function(response) {
			if (response.authResponse) {
				FB.api('/me', function(response) {

					$.ajax({
						url : '/ajax/oauth',
						data : {
							fb_id : response.id,
							fb_user : response.username,
							fb_email : response.email,
							fb_token : FB.getAuthResponse()['accessToken']
						},
						type: 'post',
						success: function(data)
						{
							$('.fb-ajax-loader').remove();
							$icon.css('background-position', 'center center');
							$('#login-with-facebook-text').text('Login with Facebook');
							$('#other-login-head').removeAttr('disabled');
							$t.removeAttr('disabled');

							if (data.loggedin == 'true') {
								rerender_page();
								$('.modal').modal('hide');
							
							} else {
								if (data.reason == 'specify_username') {
									$('.modal').modal('hide');
									$('#register-modal').modal('show');
									if (populated != true) {
										$('#register-modal .info-message').html("Please choose a password for your new FOG account.");
										$('.info-message').show();
										$('#register-modal input[name=email]').val(response.email).after('<input type="hidden" name="fbid" value="'+response.id+'">');
										$('#register-modal .facebook-login').hide();
										populated = true;
									}
								} else {
									$('.modal').modal('hide');
									fog.message({message : 'There was a problem logging you in.', type : 'error'});
								}
							}
						}
					});
				});
			} else {
				$('#login-with-facebook-text').text('Login with Facebook');
				$('#other-login-head').removeAttr('disabled');
				$t.removeAttr('disabled');
				$('.fb-ajax-loader').remove();
				$icon.css('background-position', 'center center');
			}

		},{
			scope: 'email,user_birthday,user_hometown,user_location,user_website,read_friendlists,publish_stream,create_event,rsvp_event,publish_actions,user_games_activity'
		});
	})
});

var rerender_page = function(){


	if (fog.action === 'group' && fog.page === 'groups') {
		window.location.reload();
		return;
	}

	fog.switchElement('/global/navmenu', {}, '.navbar.navbar-inverse.navbar-static-top', function(){
		
		if (fog.game.id != 0)
		{
			if (fog.game.scoreboard == true) {

				fog.switchElement('/game/scoreboard/holder', {
					'game_id' : fog.game.id
				}, '.scoreboard-element', function(){
					
						fog.scoreboard = new scoreboard();
					
				});

			} else {
				$('.scoreboard-element').remove();
			}
		
			fog.switchElement('/game/ratings', {
				'game_id' : fog.game.id
				}, '#game-rating-module');


			$('#addcomment').removeAttr('disabled').attr('placeholder', 'Please leave a comment...');
			$('#addcomment_submit').removeAttr('disabled');
			$('#create-comment').slideDown();
		}

		$('.modal').modal('hide');
		fog.message({
			message: "You\'ve been logged in!",
			type: 'success'
		});
	});
}