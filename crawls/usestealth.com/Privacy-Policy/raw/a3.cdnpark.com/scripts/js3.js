var web2dspl = num_ads;

function getU(name) { 
	var pattern = "[\?&]"+name+"=([^&#]*)"; 
	var regex=new RegExp(pattern); 
	var res=regex.exec(document.location.href); 
	if(res==null){return ""}else{return decodeURIComponent(res[1])}
}

function checkWebsrc() {
	if (reqt == 's' && got_ads) {
		prepWebres();

		if( document.getElementById('webrsc') ) {
			window.setTimeout(function() {
				document.getElementById('webrsc').setAttribute('src', scriptPath + '/scripts/webres.php?max='+encodeURIComponent(web2dspl)+'&c='+encodeURIComponent(country)+'&search='+encodeURIComponent(afs_q)+"&d="+encodeURIComponent(domain));
			}, 200);
		}
	} else {
		window.setTimeout(function() {
			if(document.getElementById('webresults')) document.getElementById('webresults').innerHTML = '';
		}, 100);
	}
}

function prepWebres() {
	if(asset_path == undefined) asset_path = '';
	if(document.getElementById('webresults')) document.getElementById('webresults').innerHTML = '<span id="ajaxloaderHolder"><img src="'+asset_path+'/images/ajax-loader.gif" class="ajax-loader" /></span>';
}

var fallback_done = false;
function afdFallback() {
	if (reqt == 's' && !got_ads && navigator.appVersion.search("WebKit") <= 0) {
//		google_afd_request = { 'adtest': adtest, client: clientIDd, domain_name: domain, num_radlinks: 0, hl: xlang, ad: 'w' + num_ads, 'num_ads': num_ads, token: search_token, kw: keyword, q: afs_q, user_search: is_UserSearch };
		try { 
			window.setTimeout( function() {
				fallbJS = document.createElement('script');
				fallbJS.type = 'text/javascript';
				fallbJS.src = 'http://pagead2.googlesyndication.com/apps/domainpark/show_afd_ads.js?fallback43534534';
//				document.getElementsByTagName('HEAD')[0].appendChild(fallbJS);
			}, 100 );
			fallback_done=true; reqt = 'd'; 
		} catch(e) { };
	}
}

var domdone=false;
function cbonload() {
	domdone=true;
	if (reqt == 's' && !got_ads && navigator.appVersion.search("WebKit") > 0) {
		try { 
			/*fallrJS=document.createElement('script');
			fallrJS.type='text/javascript';
			fallrJS.text="var google_afd_request = { 'adtest': adtest, client: clientIDd, domain_name: 'bademoden247.de', num_radlinks: 0, hl: xlang, ad: 'w10', token: search_token, kw: 'bademoden', q: afs_q, user_search: is_UserSearch };";
			fallbJS=document.createElement('script');
			fallbJS.type='text/javascript';
			fallbJS.src='http://pagead2.googlesyndication.com/apps/domainpark/show_afd_ads.js?fallback43534534';
			document.getElementsByTagName('BODY')[0].appendChild(fallrJS);
			document.getElementsByTagName('BODY')[0].appendChild(fallbJS);*/
			fallback_done=true;
			reqt = 'd';
		} catch(e) { };
//		return;
	}

	if (got_ads && ads) { 
		prnt("ads"); 
		if (xwr) window.setTimeout(function() { checkWebsrc(); }, 10);
	} else if (!got_ads && pop_cats) { 
		if( document.getElementById("ads") ) {
			document.getElementById("ads").innerHTML = pop_cats; 
			document.getElementById('sponsored').innerHTML = 'Popular Categories';
			ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=popcatsdsp&uid=" + encodeURIComponent( uniqueTrackingID ) );
		}
	}

	fixThemedata();

	var rsE = Array();

	var rsX = document.getElementsByTagName('div');
	for(var i=0; i<rsX.length; i++) {
		if( rsX[i].getAttribute('name') == 'rt' ) { rsE.push( rsX[i] );	}
	}

	var rsX = document.getElementsByTagName('td');
	for(var i=0; i<rsX.length; i++) {
		if( rsX[i].getAttribute('name') == 'rt' ) { rsE.push( rsX[i] );	}
	}

	for(var i=0; i<rsE.length; i++) {
		if( rsE[i].getAttribute('data-nr') >= 0 && rsE[i].getAttribute('data-nr') < rel_links.length ) {
			rsE[i].innerHTML = rel_links[rsE[i].getAttribute('data-nr')][rsE[i].getAttribute('data-type')];
		} else {
			rsE[i].innerHTML = '';
		}
	}
	
	//ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=relterms&uid=" + encodeURIComponent( uniqueTrackingID ) + "&rel=" + encodeURIComponent(rel_table.join(',')) + "&l=" + encodeURIComponent(xlang) );

	if (reqt == 's' && web_results) { prnt("webres"); }
	if (pop_cats) { prnt("popcats"); }
}

function fixThemedata() {
	for(var i=0; i<rel_links.length; i++) {
		if( rel_links[i]["list"].indexOf('&ts=') < 0 ) {
			rel_links[i]["list"] = rel_links[i]["list"].replace(/<a href="(\?keywords=[^"]+)"/g, "<a href=\"$1&ts=" + themedata + "\"");
			rel_links[i]["table"] = rel_links[i]["table"].replace(/<a href="(\?keywords=[^"]+)"/g, "<a href=\"$1&ts=" + themedata + "\"");
		}
	}
	if( pop_cats.indexOf('&ts=') < 0 ) pop_cats = pop_cats.replace(/<a href="(\?keywords=[^"]+)"/g, "<a href=\"$1&ts=" + themedata + "\"");
}

function fixRelated() {
	if (!rel_links || !rel_links[0]) {
		rel_links = Array( Array() ); 
		rel_links[0]["list"] = ''; 
		rel_links[0]["table"] = '';
	}
}

function prnt(t) {
	if (t == "webres" && !p_webres) {
		document.getElementById('webresults').innerHTML = web_results;
		p_webres = true;
	} else if (t == "ads" && !p_ads) {
		if( document.getElementById("ads") ) {
			document.getElementById("ads").innerHTML = ads;
			if( afs_q ) {
				document.getElementById('sponsored').innerHTML = format_feedback(phrase_listings);
				if( adsrep && document.getElementById('ads_repeated') ) document.getElementById('ads_repeated').innerHTML = "<div id='webresultsTerm' class='webresultsTerm'>" + format_feedback(phrase_listings) + "</div>\n" + adsrep;
			} else {
				document.getElementById('sponsored').innerHTML = format_feedback(phrase_listings);
			}
		}
		p_ads = true;
	} else if (t == "popcats" && !p_popcats) {
		if( document.getElementById("popcatsWrapper")) document.getElementById("popcatsWrapper").innerHTML = pop_cats;
		p_popcats = true;
	}
}

function prepareRequest( type ) {
	switch(type) {
		case 'afdafs':
			var clientID = (afs_q != "" ? clientIDs : clientIDd);
			if( x2c ) {
				google_afd_request = { 'adtest': adtest, client: clientID, domain_name: domain, num_radlinks: 0, hl: xlang, ad: 'a0n0', adrep: '0', 'num_ads': 0, token: search_token, kw: keyword, user_search: is_UserSearch, adext: 'as1,sr2' };
			} else {
				google_afd_request = { 'adtest': adtest, client: clientID, domain_name: domain, num_radlinks: 0, hl: xlang, ad: 'n' + num_ads, 'num_ads': num_ads, token: search_token, kw: keyword, user_search: is_UserSearch };			
				if(!isAdult) {
					google_afd_request.ad='a'+num_ads+'n2';
					google_afd_request.adrep='2';
					google_afd_request.adext='as1,sr2';
				}
			}

			if (afs_q != "") google_afd_request['q'] = afs_q;

			if (clientChannel != "" && /_3ph$/.test(clientID)) google_afd_request['channel'] = clientChannel;
			reqt = (afs_q != "" ? 's' : 'd');
			break;
		case 'rs':
			countRs = 0;
			for(var i=0; i<relSplits.length; i++) countRs += relSplits[i];
			if( ownterms ) {
				google_afd_request = { 'adtest': adtest, client: clientIDr, domain_name: domain, num_radlinks: countRs, hl: xlang, 'num_ads':0, token: search_token, kw: keyword, user_search: is_UserSearch, terms: xterms, optimize_terms: 'off' };
			} else {
				google_afd_request = { 'adtest': adtest, client: clientIDr, domain_name: domain, num_radlinks: countRs, hl: xlang, 'num_ads':0, token: search_token, kw: keyword, user_search: is_UserSearch };
			}
			if (afs_q != "") google_afd_request['q'] = afs_q;
			break;
		default:
			console.log('unknown request');
	}
}

var afsRequest = false; 
var search_token = '';
try { search_token = getU('token'); } catch(e) { }
var feedback_url = ''; 
var ads = ''; 
var adsrep = '';
var pop_cats = ''; 
var rel_links = Array(); 
var web_results = '';
var is_UserSearch=false;
var afs_q="";
var got_related=false;
var p_webres=false;
var p_ads=false;
var p_popcats=false;

if( getU("keywords") ) { 
	afs_q = getU("keywords")
} else if( getU("search") ) { 
	afs_q = getU("search");
	is_UserSearch=true;
}
afs_q = afs_q.replace(/["\|]/g, "");

var got_ads=false;
function google_afd_ad_request_done(g_ar) { google_handler(g_ar); }
function adsl(str) { return (str + '').replace(/[\\\"\']/g, '\\$&').replace(/\u0000/g, '\\0'); }
function checkFeedback() { }
function format_links( linkType, links, blockID, blockType ) { 
	var result = ""; 
	
	switch (linkType) {
		case "webres" :
		case "ads" :
			if( !blockID || reqt == 'd' ) { blockID = false; }

			if( blockID == true ) {
				web2dspl = 0; web2dspl2 = 0;
				for(var i=0; i<links.length; i++) {
					if( links[i].position == 'Top' ) {
						web2dspl ++;
					} else {
						web2dspl2 ++;
					}
				}
				web2dspl = Math.max(web2dspl, web2dspl2);
			}			

			for(var i=0; i<links.length; i++) {
				if( blockID == false || ( blockID === true && links[i].position == 'Top' ) || ( blockID == 'rep' && links[i].position != 'Top') ) {
					if( links[i].line2 != undefined && links[i].line3 != undefined ) {
						links[i].line2 = links[i].line2 + ' ' + links[i].line3;
						links[i].line3 = null;
					}
					result += '<div class="linkrahmen">';
					result += '<div id="linktitle"><a href="' + links[i].url + '"';
					if( linkType == 'webres' ) {
						result += ' onClick="track_websearch(\'' + adsl(encodeURIComponent( links[i].url )) + '\')" target="_blank">';
					} else {
						result += ' onClick="track_onclick(\'' + adsl(encodeURIComponent( links[i].url )) + '\')" target="_blank">';
					}
					result += links[i].line1 + '</a></div>';
					result += '<div id="linkdescription">' + links[i].line2 + (links[i].line3 != undefined ? '<br>' + links[i].line3 : '') + '</div>';
					if( links[i].seller_ratings ) {
						var srText = links[i].seller_ratings.text;
						var srTextLink1 = "<a href=\""+links[i].seller_ratings.source_url+"\" target='_blank'>";
						var srTextLink2 = "</a>";
						var srRating = "";
						srRating += "<div class='asset_star1'></div>";
						srRating += "<div class='asset_star1'></div>";
						srRating += "<div class='asset_star1'></div>";
						srRating += "<div class='asset_star1'></div>";
						if( links[i].seller_ratings.rating == 4 ) {
							srRating += "<div class='asset_star0'></div>";
						} else if( links[i].seller_ratings.rating == 4.5 ) {
							srRating += "<div class='asset_starH'></div>";
						} else {
							srRating += "<div class='asset_star1'></div>";
						}
						srText = srText.replace(/\{\{LINK_START\}\}/, srTextLink1);
						srText = srText.replace(/\{\{LINK_END\}\}/, srTextLink2);
						srText = srText.replace(/\{\{RATING\}\}/, srRating);
						result += "<div class='sellerRatings'>" + srText + "</div>";
					}

					result += '<div id="showurl"><a target="_blank" href="' + links[i].url + '"';
					if( linkType == 'webres' ) {
						result += ' onClick="track_websearch(\'' + adsl(encodeURIComponent( links[i].url )) + '\')">';
					} else {
						result += ' onClick="track_onclick(\'' + adsl(encodeURIComponent( links[i].url )) + '\')">';
					}
					result += links[i].visible_url + '</a></div>';

					if( links[i].sitelinks ) {
						result += "<table class='sitelinkHolder'>";
						result += "<tr>";
						for(var is=0; is<links[i].sitelinks.length; is++) {
							result += "<td class='sitelink'><a target='_blank' href=\""+links[i].sitelinks[is].url+"\" onClick=\"track_onclick('"+adsl(encodeURIComponent(links[i].sitelinks[is].url))+"');\">"+links[i].sitelinks[is].link_text+"</a></td>";
							if( is%2 ) {
								result += "</tr></tr>";
							}
						}
						result += "</tr>";
						result += "</table>";
					}

					result += '</div>';
				}
			}   
		break;
		
		case "popular" :
			result += '<ul id="popcats">';
			for(var i=0; i<links.length; i++) {
				result += '<li><a href="?keywords=' + links[i].term + '&token=' + links[i].token + '">';
				result += links[i].term + '</a>';
				if (links[i].subcategories) {
					result += '<ul>';
					for (var j=0; j<links[i].subcategories.length; j++) {
						result += '<li><a href="?keywords=' + links[i].subcategories[j].term + '&token=' + links[i].subcategories[j].token + '">';
						result += links[i].subcategories[j].term + '</a></li>';
					}
					result += '</ul>';
				}
				result += '</li>';
			} 
			result += '</ul>';  
		break;
		
		case "related" :
	    switch (blockType) {
			case "list" :
				result += '<div id="related">' + format_feedback(phrase_related) + '</div><ul>';
				for(var i=0; i<links.length; i++) {
				if (i%2 == 0) {
					result += '<li class="even no' + i + '">';
				}
				else {
					result += '<li class="odd no' + i + '">';
				}
				result += '<a href="?keywords=' + links[i].term + '&token=' + links[i].token + '">';
				result += links[i].term + '</a></li>';
				}
				result += '</ul>';
			break;
	
			case "table" :
				result += '<table border="0"><tr>';
				for(var i=0; i<links.length; i++) {
				if (i%2 == 0) {
					result += '<td class="even no' + i + '">';
				}
				else {
					result += '<td class="odd no' + i + '">';
				}
				result += '<a href="?keywords=' + links[i].term + '&token=' + links[i].token + '">';
				result += links[i].term + '</a></td>';
				}
				result += '</tr></table>';
			break;
	    }
		break;
	}
 
	return result;
}


function format_feedback( text ) {
	if( feedback_url ) return "<a href=\"" + feedback_url + "\" target='_blank'>" + text + "</a>";
	return text;
}

function ajaxQuery(url) { xmlHttp = getXMLhttp(); xmlHttp.open( "GET", url, false ); return xmlHttp.send( null ); }
//function ajaxQuery(url) { jsparkLoadTracker(url); }

ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=browserjs&uid=" + encodeURIComponent( uniqueTrackingID ) );

function track_onclick( link ) {
	ajaxQuery( scriptPath + "/track.php?click=" + encodeURIComponent( link ) + "&domain=" + encodeURIComponent( domain ) + "&uid=" + encodeURIComponent( uniqueTrackingID ) + "&ts=" + encodeURIComponent( themedata )  + "&kw=" + encodeURIComponent( xkw ) + "&search=" + encodeURIComponent( xsearch) + "&pcat=" + encodeURIComponent( xpcat ) + "&rxid=" + encodeURIComponent(rxid) + "&bucket=" + encodeURIComponent(bucket) + "&clientID=" + encodeURIComponent(clientIDs) + "&adtest=" + encodeURIComponent(adtest) );
}

function track_websearch( link ) {
	ajaxQuery( scriptPath + "/track.php?ws=" + encodeURIComponent( link ) + "&domain=" + encodeURIComponent( domain ) + "&uid=" + encodeURIComponent( uniqueTrackingID ) + "&ts=" + encodeURIComponent( themedata )  + "&kw=" + encodeURIComponent( xkw ) + "&search=" + encodeURIComponent( xsearch) + "&pcat=" + encodeURIComponent( xpcat ) + "&rxid=" + encodeURIComponent(rxid) + "&bucket=" + encodeURIComponent(bucket) + "&clientID=" + encodeURIComponent(clientIDs) + "&adtest=" + encodeURIComponent(adtest) );
}

function getXMLhttp() {
	var xmlHttp=null;
	try {
		xmlHttp=new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}
function pcrewFallbackRequest() {
	if(fallbackfeed) return;
	fallbackfeed=true;
	if(domdone) {
		var ns=document.createElement('script');
		ns.setAttribute('src',scriptPath+'/scripts/fallbackfeed.php?max='+encodeURIComponent(web2dspl)+'&c='+encodeURIComponent(country)+'&search='+encodeURIComponent(afs_q)+"&d="+encodeURIComponent(domain));
		ns.setAttribute('type','text/javascript');
		document.getElementsByTagName('head')[0].appendChild(ns);
	} else {
		document.write('<script src="'+scriptPath+'/scripts/fallbackfeed.php?max='+encodeURIComponent(web2dspl)+'&c='+encodeURIComponent(country)+'&search='+encodeURIComponent(afs_q)+"&d="+encodeURIComponent(domain));
	}
}
var rel_table=[];
var fallbackfeed=!1;
function google_handler(g_ar) {
	only_related = (g_ar.client && g_ar.client.substr(-3) == '-rs'?true:!1);
	
	if(g_ar.faillisted || g_ar.blocked) {
		ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=block&reason=" + encodeURIComponent( g_ar.faillist_reason) + "&uid=" + encodeURIComponent( uniqueTrackingID ) );
//		pcrewFallbackRequest();
		return;
	}	

	if(g_ar.adult=="true" && isAdult==false ) {
		ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=adult&uid=" + encodeURIComponent( uniqueTrackingID ) );
//		pcrewFallbackRequest();
		return;		
	}

	if(g_ar.feedback_url&&!feedback_url) feedback_url = g_ar.feedback_url;
	
	if(got_related == false && g_ar.link_units && !g_ar.ads ) {
		var last = 0;
		for(var i=0; i<g_ar.link_units.length; i++) rel_table.push(g_ar.link_units[i].term);
		for(var i=0; i<relSplits.length; i++) {
			var relCurrent = g_ar.link_units.slice(last, relSplits[i]+last);
			rel_links[i] = Array();
			rel_links[i]["list"] = format_links( "related", relCurrent, i, "list" );
			rel_links[i]["table"] = format_links( "related", relCurrent, i, "table" );
			last += relSplits[i];
			got_related = true;
		}

		if( last == 0 ) phrase_related = '';
	}
	
	if(g_ar.error_code) ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&toggle=errorcode&uid=" + encodeURIComponent(uniqueTrackingID) + "&code=" + encodeURIComponent(g_ar.error_code));

	if(g_ar.categories) pop_cats = format_links( "popular", g_ar.categories, 0 );
	
	if(g_ar.search_token) search_token = g_ar.search_token;

	if(only_related) return;

	if(g_ar.needsreview) ajaxQuery( scriptPath + "/track.php?domain=" + encodeURIComponent( domain ) + "&toggle=needsreview&uid=" + encodeURIComponent( uniqueTrackingID ) );

	if(g_ar.ads) {
		ads = format_links( "ads", g_ar.ads, true );
		adsrep = format_links( "ads", g_ar.ads, 'rep' );
		if( !ads && adsrep ) {
			ads = adsrep;
			adsrep = "";
		}
		got_ads = true;
	}

	if(fallback_done) cbonload();
}
