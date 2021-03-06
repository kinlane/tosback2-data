
if (typeof(WCMMode) !== "undefined" && WCMMode === "DISABLED") {
	var crtg_nid="1180"; 
	var crtg_cookiename="cto_was"; 
	function crtg_getCookie(c_name){var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}return'';} var crtg_content=crtg_getCookie(crtg_cookiename);var crtg_rnd=Math.floor(Math.random()*99999999999);var crtg_url='http://rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);crtg_url+='&cookieName='+escape(crtg_cookiename);crtg_url+='&rnd='+crtg_rnd;crtg_url+='&varName=crtg_content';var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);
}

SG_Utils = {};
SG_Utils.loadScript = function(src, async) {
	var po = document.createElement('script');
    po.type = 'text/javascript';
    if (typeof(async) !== "undefined" && async) {
	    po.async = true;
	}
    po.src = src;
	document.getElementsByTagName("head")[0].appendChild(po);
};

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.7.2
 *
 */
(function($, window) {

    $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var last_check = 0;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            delay           : 0
        };

        function update() {
            var counter = 0;
      
            if (settings.delay > 0) {
                var current_time = (new Date()).getTime();
                if (last_check + settings.delay > current_time) {
                    return;
                } else {
                    last_check = current_time;
                }
            }

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function(event) {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });

        /* Force initial check if images should appear. */
        update();
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $container.offset().top + $container.height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $container.offset().left + $container.width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $container.offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $container.offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && 
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0, container: window}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0, container: window}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}); },
        "in-viewport"    : function(a) { return !$.inviewport(a, {threshold : 0, container: window}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0, container: window}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}); }
    });

})(jQuery, window);
/*
* JS Redirection Mobile
*
* Copyright (c) 2011-2012 Sebastiano Armeli-Battana (http://www.sebastianoarmelibattana.com)
*
* By Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
* Licensed under the MIT license.
* https://github.com/sebarmeli/JS-Redirection-Mobile-Site/blob/master/MIT-LICENSE.txt
*
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site
* @author Sebastiano Armeli-Battana
* @date 29/10/2012
* @version 1.0.0
*
*/
;window.SA||(window.SA={}),SA.redirection_mobile=function(e){var t=function(e){var t=new Date;return t.setTime(t.getTime()+e),t},n=function(e){if(!e)return;var t=document.location.search,n=t&&t.substring(1).split("&"),r=0,i=n.length;for(;r<i;r++){var s=n[r],o=s&&s.substring(0,s.indexOf("="));if(o===e)return s.substring(s.indexOf("=")+1,s.length)}},r=navigator.userAgent.toLowerCase(),i="false",s="true",o=e||{},u=o.redirection_param||"mobile_redirect",a=o.mobile_prefix||"m",f=o.mobile_url,l=o.mobile_scheme?o.mobile_scheme+":":document.location.protocol,c=document.location.host,h=n(u),p=f||a+"."+(c.match(/^www\./i)?c.substring(4):c),d=o.cookie_hours||1,v=o.keep_path||!1,m=o.keep_query||!1,g=o.append_referrer||!1,y=o.append_referrer_key||"original_referrer",b=o.tablet_host||p,w=!1,E=!1;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))w=!0;if(document.referrer.indexOf(p)>=0||h===i)window.sessionStorage?window.sessionStorage.setItem(u,i):document.cookie=u+"="+i+";expires="+t(36e5*d).toUTCString();var S=window.sessionStorage?window.sessionStorage.getItem(u)===i:!1,x=document.cookie?document.cookie.indexOf(u)>=0:!1;!r.match(/(iPad|SCH-I800|xoom|NOOK|silk|kindle|GT-P7510)/i)||(E=o.tablet_redirection!==s&&!o.tablet_host?!1:!0,w=!1);if((E||w)&&!x&&!S){if(o.beforeredirection_callback&&!o.beforeredirection_callback.call(this))return;var T="";v&&(T+=document.location.pathname),m&&(T+=document.location.search),g&&document.referrer&&(T.indexOf("?")===-1?T+="?":T+="&",T+=y+"="+encodeURIComponent(document.referrer)),E?document.location.href=l+"//"+b+T:w&&(document.location.href=l+"//"+p+T)}};
//OpenFlash to be phased out.  Use renderSwf(below) instead. 
function OpenFlash(flashfile, width, height, flashVars) {document.write("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='" + width + "' height='" + height + "'><param name='allowScriptAccess' value='sameDomain' /><param name='allowFullScreen' value='false' /><param name='movie' value='" + flashfile + "' /><param name='flashVars' value='" + flashVars + "' /><param name='loop' value='false' /><param name='quality' value='high' /><param name='wmode' value='transparent' /><param name='bgcolor' value='#ffffff' /><embed src='" + flashfile + "' flashVars='"+flashVars+"' loop='false' quality='high' wmode='transparent' bgcolor='#ffffff' width='" + width + "' height='" + height + "' name='Test' allowScriptAccess='sameDomain' allowFullScreen='false' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed></object>"); }

function OpenOmnitureFlash(VideoID,PlayerID,Width,Height,AdServer,AutoStart) {	document.write("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='" + Width + "' height='" + Height + "' id='omniturePlayer' align='middle'><param name='allowScriptAccess' value='always' /><param name='movie' value='http://www.slate.com/video/omniturePlayer.swf?actionSourcePath=http://www.slate.com/video/&adServerURL=" + AdServer + "&videoId=" + VideoID + "&videoRef=null&lineupId=null&playerTag=null&autoStart=" + AutoStart + "&pwidth=" + Width + "&pheight=" + Height + "&playerId=" + PlayerID + "&flashId=omniturePlayer' /><param name='quality' value='high' /><param name='bgcolor' value='#FFFFFF' /><embed src='http://www.slate.com/video/omniturePlayer.swf?actionSourcePath=http://www.slate.com/video/&adServerURL=" + AdServer + "&videoId=" + VideoID + "&videoRef=null&lineupId=null&playerTag=null&autoStart=" + AutoStart + "&pwidth=" + Width + "&pheight=" + Height + "&playerId=" + PlayerID + "&flashId=omniturePlayer' quality='high' bgcolor='#FFFFFF' width='" + Width + "' height='" + Height + "' name='omniturePlayer' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>"); 
}
function insertAudioPlayer(soundfile, extFile) { document.write('<object width="244" height="46" align="middle" id="audioplayer" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="sameDomain" name="allowScriptAccess"></param><param value="http://www.slate.com/apps/audioplayer.swf?soundfile='+soundfile+'&externalFile='+extFile+'" name="movie"></param><param value="high" name="quality"></param><param value="#ffffff" name="bgcolor"></param><embed width="244" height="46" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="sameDomain" name="audioplayer" bgcolor="#ffffff" quality="high" src="http://www.slate.com/apps/audioplayer.swf?soundfile='+soundfile+'&externalFile='+extFile+'"></embed></object>') 
}
function OpenSurroundVideo(file, width, height, filepath){if (width == null || width == "")width="320"; if (height==null || height =="")height="240";  myvideo = "<object classid='clsid:928626A3-6B98-11CF-90B4-00AA00A4011F' type='application/x-oleobject' id='Surround1'" + " codebase='" + filepath+ "apps/svj/MSSurVid.cab#Version=1,2,0,20' width='" +width + "' height='" + height + "'>" + "<param name='SurroundRect' value='0,0,320,240' /><param name='Image' value='"+file+"'></param></object>";  document.write(myvideo); 
}
function OpenWindowsMedia(file){document.write("<embed type='application/x-mplayer2' name='MediaPlayer' autostart='true'  src='" + file + "'></embed>"); 
}
function OpenQuickTime(file, width, height){document.write("<embed PLUGINSPAGE='http:/" + "/www.apple.com/quicktime/download/' src='"+ file +"' width='"+width+"' height='"+height+"'></embed>"); }
// Above are functions for activex components

function SlatePopup(div) { var win = window.open("","win","directories=no,height=400,width=550,menubar=no,resizeable=no,scrollbars=no,status=no,toolbar=no"); win.document.write("<html><head><title>Slate Popup</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/css/popups.css\" /></head><body></body></html>"); win.document.body.innerHTML = div.innerHTML; win.document.close(); win.focus(); return;
}
function toolAction(action, id, tocid) {var title; var windowParam; if (id==''){var url = window.location.href; var idPos = url.indexOf("id="); if (idPos != -1){var ampPos = url.indexOf("&"); if (ampPos != -1)id = url.substring(idPos+3,ampPos); else id = url.substr(idPos+3); }}var URLParam = "?action="+action+"&id="+id; if (id=='toc')URLParam += "&tocid="+tocid; switch (action) {case 'print':title=''; windowParam = 'toolbar=no,location=no,directories=no,menubar=yes,status=no,resizable=yes,scrollbars=yes,'; window.open("/toolbar.aspx"+URLParam, title, windowParam); break; case 'email':title='Email'; windowParam = 'toolbar=no,location=no,directories=no,menubar=no,status=no,resizable=yes,scrollbars=no,width=490,height=470'; window.open("/toolbar.aspx"+URLParam, title, windowParam); break; }
}
function showHideSidebar(){if(document.all)var iWidth = document.body.clientWidth; document.all.sidebarshell.style.display = (iWidth > 913 ? '' : 'none'); document.all.sidebarshell.style.height = document.body.scrollHeight - 1; 
}
function LoadIframe(el){var n = el.name; var h = document.frames(n).document.body.scrollHeight; el.height = h; window.focus(); 
}
function readCookie(name) { var nameEQ = name + "="; var ca = document.cookie.split(';'); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); } return null; }

var mediaPlayerOpen = 0;

//renderSwf to replace OpenFlash
function renderSwf(file, width, height, flashVars, id, wmode, bgcolor, scriptAccess)
{
	if (file == undefined || width == undefined || height == undefined)
	{
		alert("A file, width, and height must be specified.");
		return false;
	}	
	if(file.indexOf(".swf") > -1)
	{
		alert("Please remove the .swf extension from the filename.");
		return false;
	}	
	if(id==undefined)
	{
		var id = "flashMovie";
	}
	if(wmode==undefined)
	{
		var wmode = "window";
	}
	if(bgcolor==undefined)
	{
		var bgcolor = "#ffffff";
	}
	if(scriptAccess==undefined)
	{
		var scriptAccess = "sameDomain";
	}
	if (AC_FL_RunContent == 0) {
		alert("This page requires AC_RunActiveContent.js.");
	} else {
		AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
			'flashVars', flashVars,
			'width', width,
			'height', height,
			'src', file,
			'quality', 'high',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'wmode', wmode,
			'devicefont', 'false',
			'id', id,
			'bgcolor', bgcolor,
			'name', id,
			'menu', 'true',
			'allowFullScreen', 'false',
			'allowScriptAccess',scriptAccess,
			'movie', file,
			'salign', ''
			); //end AC code
	}
}

var adsOpen = new Array();

//called from the new player.  Right now this will just call the old showCompanion function, but would like to smoooth it out with JQuery at some point
function handleCompanion(bannerURL, clickThroughURL, primaryVideoID, action)
{
	if(action == "open")
	{
		showCompanion(0,251,80,bannerURL,clickThroughURL,"article_player_"+primaryVideoID,"article_ad_companion_"+primaryVideoID);
	}
	else
	{
		showCompanion(251,0,80,bannerURL,clickThroughURL,"article_player_"+primaryVideoID,"article_ad_companion_"+primaryVideoID);
	}
}

function showCompanion(startHeight, endHeight, speed, imgSrc, clickURL, targetId, divId, lbHeight) //speed = milliseconds for animation
{	
	if(startHeight==0 && adsOpen.length > 0)
	{
		removeAd(divId);
	}
	var count = 0;
	var intrv;
	var parentDiv = document.getElementById(targetId);
	var adDiv;

	if(document.getElementById(divId))
	{
		adDiv = document.getElementById(divId);
	}
	else
	{
		adDiv = document.createElement("div");	
		parentDiv.appendChild(adDiv);
	}
	with(adDiv)
	{
		id = divId;
		with(style)
		{
			height=startHeight+"px";
			overflow="hidden";
			position="relative";
			textAlign = "center";
		}
	}
	function adIsOpen(divId)//checks for open ad divs
	{
		for (var i=0; i<adsOpen.length; i++)
		{
			if (adsOpen[i]==divId)
			{
				return true;
			}				
		}
		return false;
	}	
	
	function removeAd(divId)
	{
		for (var i=0; i<adsOpen.length; i++)
		{
			if (adsOpen[i]==divId)
			{
				adsOpen.splice(i,1);
				break;
			}				
		}
	}		
	if(adIsOpen(divId))
	{		
		intrv = setInterval(collapseDiv,speed);
		count = parseInt(adDiv.style.height);
		removeAd(divId);
	}
	else
	{	
		appendAd();
		intrv = setInterval(expandDiv,speed);
		adsOpen.push(divId);
	}
	
	function expandDiv()
	{
		adDiv.style.height = count + "px";
		count += 10;
		var stopPoint = (lbHeight != undefined) ? lbHeight : endHeight;
		if(count >= stopPoint) clearInterval(intrv);
	}
	function collapseDiv()
	{
		adDiv.style.height = count + "px";
		count -= 10;
		if(parseInt(adDiv.style.height) <= 10) 
		{
			clearInterval(intrv);
			parentDiv.removeChild(document.getElementById(divId));
			if(targetId.indexOf("todays_media_player") >= 0)
			{
				document.getElementById('homepagePlayer').enableTabs();
			}
			/*if(imgSrc != undefined)//handle leave-behind
			{
				count = 0;
				intrv = setInterval(expandDiv,speed);
				adOpen = true;
			}*/
		}
	}
	
	function appendAd()
	{
		if(document.getElementById(divId + "_ad_link")) adDiv.removeChild(document.getElementById(divId + "_ad_link"));
		
		var imgAnc = document.createElement("a");
		imgAnc.id = divId + "_ad_link";
		imgAnc.href = clickURL;
		imgAnc.setAttribute('target', '_blank');
		adDiv.appendChild(imgAnc);

		var adImg = document.createElement("img");
		adImg.style.margin = "0px";
		adImg.src = imgSrc;
		imgAnc.appendChild(adImg);
	}
}

function showOmniVars()
{
	var txt = "\nserver=" + s.server;
			txt += "\npageName=" + s.pageName;
			txt += "\nchannel=" + s.channel;
	
	for (var prop in s)
	{	
		if (typeof(s[prop]) != "function")
		{
			if(prop.indexOf("prop") == 0 || prop.indexOf("hier") == 0)
			{
				txt += "\n" + prop + "=" + s[prop];
			}
		}
	}
	alert(txt)
}

function createIpadAd(){
	var isipad = navigator.userAgent.match(/iPad/i) != null;
	if(isipad){  //check to see if user is browsing with iPad
		
		if (typeof(localStorage) == 'undefined' ){  //Check to see if localStorage is a feature
			alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		} else {
			try {
				var key = localStorage.getItem("ipadAd");
				
				if (key == null){  //check to see if ad has not been closed
					ipadAdNode();
				}
			} catch (e){
				alert(e);
			}
		}			
	}
}
	
function ipadAdNode(){
	var adWrapper = $("<div />").attr({
		"id" : "ipadAdWrapper"
	});
	var bgWrapper = $("<div />").attr({
		"class" : "bgWrapper"
	});
	var adDiv = $("<div />").attr({
		"class" : "ipadAd"
	});
	var logoDiv = $("<div />").text("Slate").attr({
		"class" : "logo"
	});				
	var adTxt = $("<p />").html("Try <strong><em>Slate's</em> FREE</strong> iPad app.").attr({
		"class" : "text"
	});
	var adLink = $("<a />").text("DOWNLOAD FOR FREE").attr({
		"class" : "link",
		"href" : "http://itunes.apple.com/us/app/slate-magazine/id384914589?mt=8"
	});

	var innerWrapper = $("<div />").attr({
		"class" : "innerWrapper"
	});
	var touchDiv = $("<div />").attr({
		"class" : "touchAd"
	});
	var touchLink = $("<a />").html('Or try the "beta" version of <b>our touch-optimized website<b>.').attr({
		"class" : "link",
		"href" : "http://touch.slate.com"
	});
	var closeDiv = $("<div />").text("X").attr({
		"class" : "close"
	});
	var clearingDiv = $("<div />").attr({
		"class" : "clearing"
	});
	$("#main_body_wrapper").before(adWrapper);
		bgWrapper.appendTo(adWrapper);
			innerWrapper.appendTo(bgWrapper);	
				adDiv.appendTo(innerWrapper);	
	logoDiv.appendTo(adDiv);
	adTxt.appendTo(adDiv);
						adLink.appendTo(adTxt);	
				touchDiv.appendTo(innerWrapper);
					touchLink.appendTo(touchDiv);	
					closeDiv.appendTo(touchDiv);
				clearingDiv.appendTo(innerWrapper);
	
	//redirect on click of ad text
	adTxt.click(function(){
		$(location).attr("href", "http://itunes.apple.com/us/app/slate-magazine/id384914589?mt=8");
	});
	
	//fade out ad on close
	closeDiv.click(function(){
		$("#ipadAdWrapper").fadeOut();
		localStorage.setItem("ipadAd", "x"); //saves to the storage, "key", "value"
	});
	
	//$(".ipadAd").delay(1500).slideToggle();
}

function commentLoad(){
	var d = $("<div />");
	var p = $("<p />");
	
	d.attr({
		"id" : "load-comments-wrapper"
	});
	
	p.text("If comments do not automatically load, click here.").attr({
		"class" : "load-comments"
	}).appendTo(d);
	
	d.appendTo("#js_kit_cntr");
	
	$(".load-comments").click(function(){
		$(this).fadeOut();
		reloadComments();
	});
}

function reloadComments(){
	jQuery(document).ready(function() {
		var jskitscript = document.createElement('script');
		jskitscript.type='text/javascript';
		jskitscript.src='http://cdn.js-kit.com/scripts/comments.js';
		document.body.appendChild(jskitscript);
	});
}

// Cross-browser methods for DOM functions
var SlateDom = {};
// ELEMENT FUNCTIONS
SlateDom.getTarget = function(evt)//event
{
	var tar;
	if(!evt) var e = window.event;
	if(evt.target) tar = evt.target;
	else if(evt.srcElement) tar = evt.srcElement;
	if (tar.nodeType==3) tar = tar.parentNode;//for Safari bug
	
	return tar;
}

SlateDom.newElement = function(tagName,contents,id,className)
{
	var elm = document.createElement(tagName);
	if (id)	elm.id = id;
	if (className)	elm.className = className;
	if (contents) elm.innerHTML = contents;
	return elm;
}

SlateDom.addListener = function(obj,type,handler) //object,string,function 
{	
	if(typeof document.addEventListener != "undefined")
	{
		if(type.indexOf("on") == 0)
		{
			type = type.substr(2);
		}
		obj.addEventListener(type,handler,true);
	}
	else if(document.attachEvent != "undefined")
	{
		if(type.indexOf("on") != 0)
		{
			type = "on" + type;
		}
		obj.attachEvent(type,handler)
	}
	else
	{
		throw("[SLATE DOM ERROR] can't add listener");
	}
}

SlateDom.dropListener = function(obj,type,handler) //object,string,function 
{	
	if(typeof document.removeEventListener != "undefined")
	{
		if(type.indexOf("on") == 0)
		{
			type = type.substr(2);
		}
		obj.removeEventListener(type,handler,true);
	}
	else if(document.detachEvent != "undefined")
	{
		if(type.indexOf("on") != 0)
		{
			type = "on" + type;
		}
		obj.detachEvent(type,handler)
	}
	else
	{
		throw("[SLATE DOM ERROR] can't drop listener");
	}
}

SlateDom.dispatchEvent = function(obj,type)
{
	var evt;
	
	if(typeof document.dispatchEvent != "undefined")
	{
		if(type.indexOf("on") == 0)
		{
			type = type.substr(2);
		}
		evt = document.createEvent("MouseEvents");
		evt.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		obj.dispatchEvent(evt);
	}
	else if(document.fireEvent != "undefined")
	{
		if(type.indexOf("on") != 0)
		{
			type = "on" + type;
		}
		obj.fireEvent(type);
	}
	else
	{
		throw("[SLATE DOM ERROR] can't dispatch event");
	}
}

SlateDom.getCurrentStyle = function(elm,prop)
{
	var style;
	if(window.getComputedStyle)
	{
		style = window.getComputedStyle(elm,null).getPropertyValue(prop);
	}
	else if(elm.currentStyle)
	{
		style = elm.currentStyle[prop];	
	}
	return style;
}

SlateDom.getElementsByClassName = function(nodeList, className)//nodeList, string
{
	var nodes, qname, cnames, matches;
	
	nodes = nodeList;
	qname = className;
	matches = [];	
	
	for(var i=0; i<nodes.length; i++)
	{
		cnames = nodes[i].className.split(" ");
		
		for(var j=0; j<cnames.length; j++)
		{
			if(cnames[j]==qname)
			{
				matches.push(nodes[i]);
			}
		}
	}
	return matches;
}

SlateDom.hideElement = function(elm)//element
{
	elm.style.display = "none";
}

//FORM FUNCTIONS
SlateDom.newInputElement = function(type,name,value)
{
	var input;
	input = document.createElement("input");
	input.setAttribute("type",type);
	input.setAttribute("name",name);
	input.setAttribute("value",value);

	return input;
}
//INTERACTIVITY AND ANIMATION
SlateDom.setAsButton = function(elm,bool)
{
	if(bool)
	{
		elm.style.cursor="pointer";
	}
	else
	{
		elm.style.cursor="default";	
	}
}
SlateDom.tweenProperty = function(id,p,um,st,end,dur,cb)
{
	var elmId = id;//string or object. id of the element to tween, or the element itself
	var unitOfMeasure = um;//string.
	var prop = p;//string. css property to tween, must be a propert with a numeric value
	var startVal = st;//integer
	var endVal = end;//integer
	var duration = dur;//integer. number of seconds the tween takes
	var callback = cb;//string, opt. function to call when the tween is finished	
	var count=startVal;
	var intrv;
	var elm;
	var incrementVal;
	
	var INTERVAL_VALUE = 100;//milliseconds
			
	if(typeof elmId == "string")
	{
		elm = document.getElementById(elmId);
	}
	else 
	{
		elm = elmId;
	}
	
	if(prop=="top" || prop=="right" || prop=="bottom" || prop=="left")
	{
		elm.style.position = "relative";
	}
	
	intrv = setInterval(runTween,INTERVAL_VALUE)
	
	function runTween()
	{		
		var intervalSecs = INTERVAL_VALUE/1000;
		var loopCount = duration/intervalSecs;		
		
		incrementVal = Math.abs(startVal - endVal) / loopCount;			
		elm.style[prop] = count + unitOfMeasure;
		if(endVal > startVal) 
		{
			count = count + incrementVal;
			if(count >= endVal) 
			{	
				haltTween();
			}
		}
		else 
		{
			count = count - incrementVal;
			if(count <= endVal) 
			{
				haltTween();
			}
		}		
	}
	function haltTween()
	{
		elm.style[prop] = endVal + unitOfMeasure;
		clearInterval(intrv);		
		if(callback)
		{
			try
			{
				eval(callback);	
			}
			catch(e)
			{
				throw("[SLATE DOM ERROR] tween could not perform callback.");	
			}
		}	
	}
}


//This is the global variable that sends IDs over to adsonar.
ASL = {
cfg :
{
    test: false,
    pid : -1, // from the jsp
    type : "0",
    k : "", //the page url, from the jsp
    placements :
            [
            ]
}
}
var commentCounter = {
    items: {},
    repeatItems: [],
    count: 0,
    appKey: 'dev.slate.com',
    addUrl : function(url, element) {
        if (!this.items[url]) {
            this.items[url] = [];
        }
        this.items[url].push(element);
        this.count++;
    },
    // repeat items are when we display the comment count twice for one doc,
    //in these cases
    // need an array to hold the url and element, but we only query with the
    //initial items list, then look
    // at those results to populate this
    addRepeatUrl : function(url, element) {
        this.addUrl(url, element);
    },
    load : function() {
        var that = this;
        var count = 0;
        var bundle = {}
        // Chrome crashes if we send more than 5 urls at a time.
        // The request length should be less than 5k chars. o
        for (var url in this.items) {
            bundle[url] = url;
            count++;
            if (count % 5 == 0) {
                // Package items and run ajax
                this.run(this.createArray(bundle));
                bundle = {};
            }
        }
        // This is the end of the loop for you, buddy!
        if(this.isEmpty(bundle) ==false) {
            this.run(this.createArray(bundle));
        }
    },
    isEmpty: function(obj) {
        for(var i in obj)
        { 
            return false;
        }
        return true;
    },
    run : function(requests) {
      //  console.log({"requests": requests});
      // console.log(JSON.stringify(requests));
        var that = this;
        $.ajax({
            url: 'http://echoapi.slate.com/v1/mux',
            type: 'POST',
            data: {
                'appkey': this.appKey,
                'requests': JSON.stringify(requests)
            },
            dataType: 'jsonp',
            success: function(results) {
                for (var url in that.items) {
                	if (results[url] != undefined) {
                    if (results[url] && parseInt(results[url]['count']) > -1) {
                        for (var elm in that.items[url]) {
                        //sometimes a function makes it's way into this urls object. When older IEs
                        //try to apply $.text() to a function object, the whole page explodes. It's 
                        //related to swfs calling JS via ExternalInterface, but for now, just using
                        //a typeof conditional.
                            if(typeof that.items[url][elm] == 'object')
                            {
                                if($(that.items[url][elm]).attr('class') == "comment-count") {
                                    var commentText = "Comment";
                                    if(parseInt(results[url]['count']) > 1) {
                                        commentText+="s";
                                    }
                                    if(parseInt(results[url]['count']) > 0) {
                                        $(that.items[url][elm]).html("<span>" +
                                        		results[url]['count'] + "</span> " + commentText);
                                    } else {
                                        $(that.items[url][elm]).html("<br/>" + commentText);
                                    }
                                } else {
                                    $(that.items[url][elm]).text(results[url]['count']);
                                }
                            }
                        }
                    } else if (results[url]['errorCode']== 'more_than'){
                        //console.log(" in failure function");
                        var num = results[url]['errorMessage']/1000;
                        results['count'] = num +'k+';
	                    for (var elm in that.items[url]) {
	                    	if(typeof that.items[url][elm] == 'object') {
		                    	$(that.items[url][elm]).text(results['count']);
		                    }
	                    }
                    } 
                	}
                }
            }
        }); 
    },
    createArray : function(items) {
        var returnVals = [];
        for (var url in items) {
            returnVals.push({
                'id':url,
                'method':'count',
                'q':'childrenof:' + url + ' type:comment -source:Twitter source:slate.com'+ 
                ' sortOrder:reverseChronological (state:ModeratorApproved OR'+
                ' (state:Untouched -user.state:ModeratorBanned,ModeratorDeleted))'+
                ' children:3 (state:ModeratorApproved OR (state:Untouched'+
                ' -user.state:ModeratorBanned,ModeratorDeleted)) '
            });
        }
        return returnVals;
    }
};

function loadCounts() {
    //var self = this;
    // used by post pages and listing pages
    $('.sl-article-tools-comments-count').each(function() {
        commentCounter.addUrl($(this).attr('uniq'), $(this));
    });
    // used by tag pages
    $('.comment-count').each(function() {
        commentCounter.addUrl($(this).attr('uniq'), $(this));
    });
    // used by post pages in second spot, for these, we just store a repeat
    //url since we fetch data above for this page
    $('.sl-chunky-comments-inner').each(function() {
        commentCounter.addRepeatUrl($(this).attr('uniq'), $(this));
    });
    
    //used by floating toolbar
    $('.sl-comment-count').each(function() {
        commentCounter.addUrl($(this).attr('uniq'), $(this));
    });

    // used by chunky buttons.
    $('.sl-chunky-comm-count').each(function() {
        commentCounter.addRepeatUrl($(this).attr('uniq'), $(this));
    });
    
    commentCounter.load();
}

$(document).ready(function() {
    loadCounts();
});
