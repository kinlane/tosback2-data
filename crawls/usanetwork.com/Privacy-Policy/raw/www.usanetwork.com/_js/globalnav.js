/* global navigation */
var usa_menuOpen = '';
var usa_t;
var usa_baseUrlDomain = 'http://www.usanetwork.com';
var usa_originalAdBannerBgColor = '';
var usa_newAdBannerBgColor = '';
var usa_setMainClose = function ()
{
	//console.log('usa_setMainClose: ');
	if (usa_menuOpen != '')
	{
		$('#usa_globalNav #usa_menu_' + usa_menuOpen).removeClass('selected');
		$('#usa_globalHeaderSubNav_' + usa_menuOpen).fadeOut('fast', function() {
			$('#usa_globalSubNavContainer').hide();
		});
		usa_menuOpen = '';
	}
	else
	{
		//$('body').unbind('click', usa_setMainClose);
	}
};
function usa_showMenu(id)
{
	/*if (usa_originalAdBannerBgColor == '')
	{
		usa_originalAdBannerBgColor = $('#usa_desktop.active').css('background-color');
	}
	if (usa_newAdBannerBgColor == '')
	{
		usa_newAdBannerBgColor = $('.globalHeaderSubNavContents').css('background-color');
	}*/
	
	clearTimeout(usa_t);
	if (usa_menuOpen == id)
	{
		usa_hideMenu(id);
	}
	else
	{
		if (id == 'schedule')
		{
			usa_showSchedule();
		}
		usa_hideMenuAll();
		$('#usa_globalSubNavContainer').show();
		$('#usa_globalNav #usa_menu_' + id).addClass('selected');
		$('#usa_globalHeaderSubNav_' + id).fadeIn('fast');
		
		$('#usa_desktop.active').addClass('navActive');
		//$('#usa_desktop.active').css('background-color', usa_newAdBannerBgColor);
		//$('#usa_ad_728x90').css('background-color', usa_newAdBannerBgColor);
		usa_menuOpen = id;
		
		//usa_t = setTimeout("$('body').bind('click', usa_setMainClose);", 1000);
	}
}

function usa_hideMenuAll()
{
	//console.log('usa_hideMenuAll: ');
	clearTimeout(usa_t);
	usa_menuOpen = '';
	$('#usa_globalHeaderSubNav_shows').css('display', 'none');
	$('#usa_globalHeaderSubNav_videos').css('display', 'none');
	$('#usa_globalHeaderSubNav_featured').css('display', 'none');
	$('#usa_globalHeaderSubNav_schedule').css('display', 'none');
	$('#usa_globalNav #usa_menu_shows').removeClass('selected');
	$('#usa_globalNav #usa_menu_videos').removeClass('selected');
	$('#usa_globalNav #usa_menu_featured').removeClass('selected');
	$('#usa_globalNav #usa_menu_schedule').removeClass('selected');
	$('#usa_globalSubNavContainer').hide();
	$('#usa_desktop.active').removeClass('navActive');
	//$('#usa_desktop.active').css('background-color', usa_originalAdBannerBgColor);
	//$('#usa_ad_728x90').css('background-color', usa_originalAdBannerBgColor);
	//$('body').unbind('click', usa_setMainClose);
}

function usa_hideMenu(id)
{
	//console.log('usa_hideMenu: ' + id);
	if (usa_menuOpen != '')
	{
		$('#usa_globalHeaderSubNav_' + id).fadeOut('fast', function(){
			$('#usa_globalSubNavContainer').hide();
			$('#usa_desktop.active').removeClass('navActive');
			//$('#usa_desktop.active').css('background-color', usa_originalAdBannerBgColor);
			//$('#usa_ad_728x90').css('background-color', usa_originalAdBannerBgColor);
		});
		$('#usa_globalNav #usa_menu_' + id).removeClass('selected');
		usa_menuOpen = '';
		//$('body').unbind('click', usa_setMainClose);
	}
}

function usa_setOpenMenu(id)
{
	//console.log('usa_setOpenMenu: ' + id);
	usa_menuOpen = id;
	clearTimeout(usa_t);
}

function usa_beginHideMenu(id)
{
	//console.log('usa_beginHideMenu: ' + id);
	usa_t = setTimeout("usa_hideMenu(\'" + id + "\')", 1000);
}

function usa_buildGlobalMenu()
{
	// lvl 1 nav items
	var html = '';
	for (var lvl1obj=0 ; lvl1obj < usa_globalMenu.menu.length; lvl1obj++)
	{
		var title = usa_globalMenu.menu[lvl1obj].title;
		var url = usa_globalMenu.menu[lvl1obj].url;
		if (typeof title != 'undefined')
		{
			var id = title.toLowerCase();
		}
		
		var aTagClass = '';
		if (lvl1obj == 0)
		{
			aTagClass = ' first';
		}
		else if (lvl1obj == usa_globalMenu.menu.length - 1)
		{
			aTagClass = ' last';
		}
		
		if (typeof usa_globalMenu.menu[lvl1obj].subMenu != 'undefined')
		{
			if (usa_globalMenu.menu[lvl1obj].subMenu.length > 0)
			{
				//html += '<a href="'+url+'" id="usa_menu_'+id+'" class="sub'+aTagClass+'" onclick="usa_showMenu(\'' + id + '\')" onmouseover="usa_showMenu(\'' + id + '\')" onmouseout="usa_beginHideMenu(\'' + id + '\')"><span>'+title+'</span><span class="sub"></span></a>';
				html += '<a href="'+url+'" id="usa_menu_'+id+'" class="sub'+aTagClass+'">'+title+'</a>';
			}
			else
			{
				html += '<a href="'+url+'" id="usa_menu_'+id+'" class="nosub'+aTagClass+'">'+title+'</a>';
			}
		}
		else
		{
			html += '<a href="'+url+'" id="usa_menu_'+id+'" class="nosub'+aTagClass+'">'+title+'</a>';
		}
	}
	$('#usa_globalNav').html(html);
	
	// lvl 2 sub navs
	html = '';
	for (var lvl1obj=0 ; lvl1obj<usa_globalMenu.menu.length ; lvl1obj++)
	{
		var title = usa_globalMenu.menu[lvl1obj].title;
		if (typeof title != 'undefined')
		{
			var id = title.toLowerCase();
		}
		
		if (typeof usa_globalMenu.menu[lvl1obj].subMenu != 'undefined')
		{
			if (usa_globalMenu.menu[lvl1obj].subMenu.length > 0)
			{
				// we have a submenu
				html += '<div id="usa_globalHeaderSubNav_'+id+'" class="globalHeaderSubNav"><div class="globalHeaderSubNavContents">';
				
				for (var lvl2obj=0 ; lvl2obj<usa_globalMenu.menu[lvl1obj].subMenu.length ; lvl2obj++)
				{
					// what type is it?
					if (usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type == 'list')
					{
						var title = usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].title;
						html += '<div class="lvl'+(String(parseInt(lvl2obj)+1))+' '+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type+'"><ul>';
						
						if (typeof title != 'undefined')
						{
							if (title.length > 0)
							{
								html += '<li class="header">'+title+'</li>';
							}
						}
						
						html += '<li>';
						
						var minPerCol = Math.floor(usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length / 4);
						var maxPerCol = Math.ceil(usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length / 4);
						var colCounter = 0;
						
						var maxPerColNum = usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length - 4;
						var currentColumnIndex = 0;
						
						while (maxPerColNum > usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length)
						{
							maxPerColNum = maxPerColNum - 4;
						}
						
						for (var lvl2itemobj=0; lvl2itemobj < usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length ; lvl2itemobj++)
						{
							if (lvl2itemobj == 0)
							{
								html += '<ul>';
							}
							else if (colCounter == maxPerCol || currentColumnIndex > (maxPerColNum - 1))
							{
								html += '</ul><ul>';
								colCounter = 0;
								currentColumnIndex++;
							}
							html += '<li><a href="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].url+'"><span>'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].title+'</span></a></li>';
							colCounter++;
							
							
							
							if (lvl2itemobj == usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length - 1)
							{
								html += '</ul>';
							}
						}
						
						html += '</li></ul><div class="clear"></div></div>';
					}
					else if (usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type == 'feature')
					{
						var title = usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].title;
						html += '<div class="lvl'+(String(parseInt(lvl2obj)+1))+' '+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type+'"><ul>';
						
						for (var lvl2itemobj=0; lvl2itemobj < usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length ; lvl2itemobj++)
						{
							html += '<li><a href="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].url+'"><span class="img"><img src="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].img+'" /></span>';
							
							if (typeof usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].title != 'undefined')
							{
								html += '<span class="title">'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].title+'</span>';
							}
							if (typeof usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].tuneIn != 'undefined')
							{
								html += '<span class="tuneIn">'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].tuneIn+'</span>'
							}
							html += '</a></li>';
						}
						
						html += '</ul><div class="clear"></div></div>';
					}
					else if (usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type == 'video_feature')
					{
						var title = usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].title;
						html += '<div class="lvl'+(String(parseInt(lvl2obj)+1))+' '+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].type+'"><ul>';
						
						if (typeof title != 'undefined')
						{
							if (title.length > 0)
							{
								html += '<li class="header">'+title+'</li><div class="clear"></div>';
							}
						}
						
						for (var lvl2itemobj=0; lvl2itemobj < usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items.length ; lvl2itemobj++)
						{
							html += '<li><a href="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].url+'"><span class="img"><img src="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].img+'" /></span><span class="title">'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].title+'</span>';
							
							if (typeof usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].subtitle != 'undefined')
							{
								html += '<span class="subtitle">'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].subtitle+'</span>';
							}
							
							if (typeof usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].tuneIn != 'undefined')
							{
								html += '<span class="tuneIn">'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].items[lvl2itemobj].tuneIn+'</span>';
							}
							
							html += '</a></li>';
						}
						
						html += '</ul>';
						
						if (typeof usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].moreButton != 'undefined')
						{
							html += '<div class="clear"></div><a href="'+usa_globalMenu.menu[lvl1obj].subMenu[lvl2obj].moreButton.url+'" class="moreButton"><span>More</span></a>';
						}
						
						html += '<div class="clear"></div></div>';
					}
				}
				
				html += '</div><div class="globalHeaderFooter">';
				
				if (typeof usa_globalMenu.menu[lvl1obj].footerMoreButton != 'undefined')
				{
					html += '<a href="'+usa_globalMenu.menu[lvl1obj].footerMoreButton.url+'" class="moreButton"><span>More</span></a>';
				}
				
				html += '</div><div class="globalHeaderFooterShadow"></div></div>';
			}
		}
	}
	
	$('#usa_globalSubNavContainer').html(html);
	
	
	$('#usa_globalNav a.sub').mouseover(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_showMenu(id);
	});
	
	$('#usa_globalNav a.sub').mouseout(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_beginHideMenu(id);
	});
	
	$('#usa_globalNav a#usa_menu_schedule').mouseover(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_showMenu(id);
	});
	
	$('#usa_globalNav a#usa_menu_schedule').mouseout(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_beginHideMenu(id);
	});
	
	$('#usa_globalNav a.sub').click(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_showMenu(id);
	});
	
	$('#usa_globalNav a#usa_menu_schedule').click(function(event){
		var id = ($(this).attr('id')).replace('usa_menu_', '');
		usa_showMenu(id);
	});
	
	
	$('.globalHeaderSubNav').mouseenter(function(event){
		var id = $(this).attr('id').replace('usa_globalHeaderSubNav_', '');
		usa_setOpenMenu(id);
	});
	
	$('.globalHeaderSubNav').mouseleave(function(event){
		var id = $(this).attr('id').replace('usa_globalHeaderSubNav_', '');
		usa_beginHideMenu(id);
	});
	
}

var usa_globalMenu = {
	"menu" : [
		/* Menu Slot 1 - SHOWS */
		{
			"title" : "Shows",
			"url" : "#shows",
			"subMenu": [
				{
					/* USA ORIGINALS */
					"type" : "list",
					"title" : "USA Originals",
					"items" : [
						{
							"title" : "Burn Notice",
							"url" : usa_baseUrlDomain + "/series/burnnotice/"
						},
						{
							"title" : "Common Law",
							"url" : usa_baseUrlDomain + "/series/commonlaw/"
						},
						{
							"title" : "Covert Affairs",
							"url" : usa_baseUrlDomain + "/series/covertaffairs/"
						},
						{
							"title" : "Fairly Legal",
							"url" : usa_baseUrlDomain + "/series/fairlylegal/"
						},
						{
							"title" : "In Plain Sight",
							"url" : usa_baseUrlDomain + "/series/inplainsight/"
						},					
						{
							"title" : "Necessary Roughness",
							"url" : usa_baseUrlDomain + "/series/necessaryroughness/",
							"new" : true
						},
						{
							"title" : "Psych",
							"url" : usa_baseUrlDomain + "/series/psych/"
						},
						{
							"title" : "Royal Pains",
							"url" : usa_baseUrlDomain + "/series/royalpains/"
						},
						{
							"title" : "Suits",
							"url" : usa_baseUrlDomain + "/series/suits/",
							"new" : true
						},
						{
							"title" : "White Collar",
							"url" : usa_baseUrlDomain + "/series/whitecollar/"
						},
						{
							"title" : "WWE Raw",
							"url" : usa_baseUrlDomain + "/sports/wwe/"
						},
						{
							"title" : "WWE Tough Enough",
							"url" : usa_baseUrlDomain + "/series/toughenough/"
						}
					]
				},
				{
					/* SHOW FEATURED ITEMS */
					"type" : "feature",
					"title" : "",
					"items" : [
						/* Featured Slot */
						{
							"title" : "Common Law",
							"url" : usa_baseUrlDomain + "/series/commonlaw/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/shows_commonlaw.png",
							"tuneIn" : "FRIDAY MAY 11 10/9C"
						},
						/* Featured Slot */
						{
							"title" : "Fairly Legal",
							"url" : usa_baseUrlDomain + "/series/fairlylegal/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/shows_3.png",
							"tuneIn" : "FRIDAYS 9/8C"
						},
						/* Featured Slot */
						{
							"title" : "In Plain Sight",
							"url" : usa_baseUrlDomain + "/series/inplainsight/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/shows_4.png",
							"tuneIn" : "FRIDAYS 10/9C"
						},
						/* Featured Slot  - LAST */
						{
							"title" : "WWE RAW",
							"url" : usa_baseUrlDomain + "/sports/wwe/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/shows_wwe.png",
							"tuneIn" : "MONDAYS 9/8C"
						}

					]
				},
				{
					/* ACQUIRED SERIES */
					"type" : "list",
					"title" : "Acquired Series",
					"items" : [
						{
							"title" : "WESTMINSTER KENNEL CLUB DOG SHOW",
							"url" : usa_baseUrlDomain + "/sports/westminsterdogshow/"
						},
						{
							"title" : "CSI: Crime Scene Investigation",
							"url" : usa_baseUrlDomain + "/series/csi/"
						},
						{
							"title" : "House",
							"url" : usa_baseUrlDomain + "/series/house/"
						},
						{
							"title" : "Law &amp; Order: CI",
							"url" : usa_baseUrlDomain + "/series/criminalintent/"
						},
						{
							"title" : "Law &amp; Order: SVU",
							"url" : usa_baseUrlDomain + "/series/svu2/"
						},
						{
							"title" : "NCIS",
							"url" : usa_baseUrlDomain + "/series/ncis/"
						},
						{
							"title" : "NCIS: Los Angeles",
							"url" : usa_baseUrlDomain + "/series/ncisla/"
						}
					]
				}
			],
			"footerMoreButton" : {
				"url" : usa_baseUrlDomain + "/series/"
			}
		},
		
		/* Menu Slot 2 - VIDEOS */
		{
			"title" : "Videos",
			"url" : "#videos",
			"subMenu": [
				
				{
					/* FEATURED VIDEO ITEMS */
					"type" : "list",
					"title" : "Full Episodes Available Now",
					"items" : [
						/* Featured Slot 1 */
						{
							"title" : "Burn Notice",
							"url" : usa_baseUrlDomain + "/videos/Burn%20Notice/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_bn.png",*/
							/*"tuneIn" : "Tuesdays 10/9C"*/
						},
						/* Featured Slot 2 */
						{
							"title" : "Covert Affairs",
							"url" : usa_baseUrlDomain + "/videos/Covert%20Affairs/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_ca.png",*/
							/*"tuneIn" : "Tuesdays 9/8C"*/
						},
						/* Featured Slot 3 */
						{
							"title" : "Fairly Legal",
							"url" : usa_baseUrlDomain + "/videos/Fairly%20Legal/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_fl.png",*/
							/*"tuneIn" : "Sundays 10/9C"*/
						},
						/* Featured Slot 4 */
						{
							"title" : "In Plain Sight",
							"url" : usa_baseUrlDomain + "/videos/In%20Plain%20Sight/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_ips.png",*/
							/*"tuneIn" : "Tune In Time"*/
						},
						/* Featured Slot 5 */
						{
							"title" : "Necessary Roughness",
							"url" : usa_baseUrlDomain + "/videos/Necessary%20Roughness/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_nr.png",*/
							/*"tuneIn" : "Wednesdays 9/8C"*/
						},
						/* Featured Slot 6 */
						{
							"title" : "Psych",
							"url" : usa_baseUrlDomain + "/videos/Psych/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_psych.png",*/
							/*"tuneIn" : "Tune In Time"*/
						},
						/* Featured Slot 7 */
						{
							"title" : "Royal Pains",
							"url" : usa_baseUrlDomain + "/videos/Royal%20Pains/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_rp.png",*/
							/*"tuneIn" : "Tune In Time"*/
						},
						/* Featured Slot 8 */
						{
							"title" : "Suits",
							"url" : usa_baseUrlDomain + "/videos/Suits/Full%20Episodes"
							/*"img" : usa_baseUrlDomain + "/_img/globalheader/videos_suits.png",*/
							/*"tuneIn" : "Tune In Time"*/
						}
					],
					"moreButton" : {
						"url" : usa_baseUrlDomain + "/videos/All-full-episodes"
					}
				},
				{
					/* EXCLUSIVES */
					"type" : "video_feature",
					"title" : "Exclusives",
					"items" : [
						{
							"title" : "DAILY KATE VIDEOS",
							"url" : "http://www.usanetwork.com/series/fairlylegal/features/dailykate/index.html",
							"img" : usa_baseUrlDomain + "/_img/globalheader/videos_5.png"
						},
						{
							"title" : "CHECK OUT COMMON LAW",
							"url" : "http://www.usanetwork.com/series/commonlaw",
							"img" : usa_baseUrlDomain + "/_img/globalheader/videos_6.png"
						},
						{
							"title" : "SEASON 5 CAST INTERVIEWS",
							"url" : "http://www.usanetwork.com/videos/In%20Plain%20Sight/Season%20Five%20Interviews",
							"img" : usa_baseUrlDomain + "/_img/globalheader/videos_7.png"
						},
						{
							"title" : "NEW PSYCH-OUTS",
							"url" : "http://www.usanetwork.com/series/psych/video/psychouts/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/videos_8.png"
						}
					]
				}
			],
			"footerMoreButton" : {
				"url" : "http://www.usanetwork.com/videos/"
			}
		},
		
		/* Menu Slot 3 - FEATURED */
		{
			"title" : "Featured",
			"url" : "#featured",
			"subMenu": [
				{
					/* CHARACTERS WELCOME */
					"type" : "list",
					"title" : "Characters Welcome",
					"items" : [
						{
							"title" : "American Character",
							"url" : usa_baseUrlDomain + "/highway50/"
						},
						{
							"title" : "Character Approved",
							"url" : usa_baseUrlDomain + "/characterapproved/"
						},
						{
							"title" : "Character Approved Blog",
							"url" : "http://www.characterblog.com/"
						},
						{
							"title" : "Character Project",
							"url" : "http://characterproject.usanetwork.com/"
						},
						{
							"title" : "Characters Unite",
							"url" : "http://www.charactersunite.com/"
						},
						{
							"title" : "Characters Unite Town Hall",
							"url" : "http://www.charactersunite.com/town-hall"
						},
						{
							"title" : "Green is Welcome Here",
							"url" : usa_baseUrlDomain + "/greenusa/"
						}
					]
				},
				{
					/* FEATURED  ITEMS */
					"type" : "feature",
					"title" : "",
					"items" : [
						/* Featured Slot 1 */
						{
							"title" : "SEE WHO IS CHARACTER APPROVED",
							"url" : usa_baseUrlDomain + "/characterapproved/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/featured_1.png"
						},
						/* Featured Slot 2 */
						{
							"title" : "WATCH THE CHARACTERS UNITE PSA",
							"url" : "http://www.charactersunite.com/video/tsbpsa",
							"img" : usa_baseUrlDomain + "/_img/globalheader/featured_2.png"
						},
						/* Featured Slot 3 */
						{
							"title" : "VISIT THE CHARACTER APPROVED BLOG",
							"url" : "http://www.characterblog.com/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/featured_3.png"
						},
						/* Featured Slot 4 */
						{
							"title" : "GO GREEN WITH USA",
							"url" : usa_baseUrlDomain + "/greenusa/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/featured_4.png"
						}
					]
				},
				{
					/* MOVIES & SPECIALS */
					"type" : "video_feature",
					"title" : "Movies &amp; Specials",
					"items" : [
						{
							"title" : "THE GAME PLAN",
							"subtitle" : "SATURDAY APRIL 28 11/10C",
							"url" : usa_baseUrlDomain + "/movies/thegameplan/",
							"img" : usa_baseUrlDomain + "/_img/globalheader/movies_thegameplan.png"
						},
						{
							"title" : "INSIDE MAN",
							"subtitle" : "SATURDAY APRIL 28 1/12C",
							"url" : usa_baseUrlDomain + "/movies/insideman",
							"img" : usa_baseUrlDomain + "/_img/globalheader/movies_insideman.png"
						},
						{
							"title" : "GOOD LUCK CHUCK",
							"subtitle" : "SUNDAY APRIL 29 1:30/12:30C",
							"url" : usa_baseUrlDomain + "/movies/goodluckchuck",
							"img" : usa_baseUrlDomain + "/_img/globalheader/movies_goodluckchuck.png"
						},
						{
							"title" : "FAST & FURIOUS",
							"subtitle" : "MONDAY APRIL 30 11:05/10:05C",
							"url" : usa_baseUrlDomain + "/movies/fastandfurious",
							"img" : usa_baseUrlDomain + "/_img/globalheader/movies_fastandfurious.png"
						}
						
					]
				}
			],
			"footerMoreButton" : {
				"url" : usa_baseUrlDomain + "/movies/"
			}
		},
		
		/* Menu Slot 4 - SCHEDULE */
		{
			"title" : "Schedule",
			//"url" : usa_baseUrlDomain + "/schedules/sched.php",
			"url" : "javascript:usa_showSchedule();",
			"subMenu": []
		}
	]
};

$(document).ready(function() {
	usa_buildGlobalMenu();
	
	// smurfs welcome
	$('#usa_globalHeaderContents').prepend('<div id="usa_mainLogoExtra"><a href="#"><span></span></a></div>');
});
