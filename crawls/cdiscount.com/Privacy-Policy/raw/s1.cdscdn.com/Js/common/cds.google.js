(function(c,w){var googletag={},isGptLoad=false;googletag.cmd=[];var loadGpt=function(){if(!isGptLoad){cds.loadScript({src:document.location.protocol+"//www.googletagservices.com/tag/js/gpt.js"});isGptLoad=true}},gpt={call:function(tag,blocksList,target){loadGpt();googletag.cmd.push(function(){var ads=googletag.pubads();ads.collapseEmptyDivs();ads.enableSingleRequest();for(var i=0;i<blocksList.length;i++){var b=blocksList[i],s;if(b.type){s=googletag.defineOutOfPageSlot(tag,b.div).addService(ads);s.setTargeting("type",b.type)}else s=googletag.defineSlot(tag,b.size,b.div).addService(ads);b.pos&&s.setTargeting("pos",b.pos)}ads.setTargeting("log",cds.getCookie("ClientId")?"oui":"non");for(key in target)ads.setTargeting(key,target[key]);var comp=c.getCookie("comp").split(","),compCh=[];for(k in comp){var val=comp[k];val&&compCh.push(val)}compCh.length&&ads.setTargeting("nugg",compCh);googletag.enableServices()})},show:function(div,desac){div&&c&&(desac!==true||c.getCookie("sas_rfckex")==="")&&googletag.cmd.push(function(){googletag.display(div)})}};w["googletag"]=googletag;c["gpt"]=gpt;cds.addGoogleBlock||function(){var ggAdsUrl=location.protocol+"//pagead2.googlesyndication.com/pagead/show_ads.js",googleCallback=function(ads){var s="",i;if(ads.length>0){if(ads[0].type==="flash")s='<a href="'+google_info.feedback_url+'" style="color:000000">Annonces Google</a><br/><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="'+google_ad.image_width+'" HEIGHT="'+google_ad.image_height+'"> <PARAM NAME="movie" VALUE="'+google_ad.image_url+'"><PARAM NAME="quality" VALUE="high"><PARAM NAME="AllowScriptAccess" VALUE="never"><EMBED src="'+google_ad.image_url+'" WIDTH="'+google_ad.image_width+'" HEIGHT="'+google_ad.image_height+'" TYPE="application/x-shockwave-flash" AllowScriptAccess="never"  PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';else if(ads[0].type==="image")s='<a href="'+google_info.feedback_url+'" style="color:000000">Annonces Google</a><br/> <a href="'+ads[0].url+'" target="_top" title="afficher la page '+ads[0].visible_url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+ads[0].visible_url+'\';return true"><img border="0" src="'+ads[0].image_url+'"width="'+ads[0].image_width+'"height="'+ads[0].image_height+'"></a>';else if(ads[0].type=="html")s=ads[0].snippet;else if(ads.length===1)s='<a href="'+google_info.feedback_url+'" style="color:000000;font-size:12px">Annonces Google</a><br/> <a style="text-decoration:none" href="'+ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+ads[0].visible_url+'\';return true"> <span style="text-decoration:underline"> <b>'+ads[0].line1+' :</b></span></a> <span style="color:#000000">'+ads[0].line2+"&nbsp;"+ads[0].line3+'</span> <span><a style="color:#008000;text-decoration:none" href="'+ads[0].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+ads[0].visible_url+"';return true\">"+ads[0].visible_url+"</span></a><br/>";else if(ads.length>1){s='<a href="'+google_info.feedback_url+'" style="color:000000;font-size:12px">Annonces Google</a><br/>';for(i=0;i<ads.length;++i)s+='<a style="text-decoration:none" href="'+ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+ads[i].visible_url+'\';return true"> <span style="text-decoration:underline"> <b>'+ads[i].line1+' :</b></span></a> <span style="color:#000000">'+ads[i].line2+" - "+ads[i].line3+'</span> <span><a style="color:#008000;text-decoration:none" href="'+ads[i].url+'" onmouseout="window.status=\'\'" onmouseover="window.status=\'afficher la page '+ads[i].visible_url+"';return true\">"+ads[i].visible_url+"</span></a><br/>"}document.write(s)}},addGoogleBlock=function(chanel,numAds){w["google_ad_request_done"]=googleCallback;w["google_ad_client"]="pub-3902876258354218";w["google_ad_channel"]=chanel;w["google_max_num_ads"]=numAds;w["google_ad_output"]="js";w["google_ad_type"]="text";w["google_feedback"]="on";w["google_language"]="fr";cds.insertScript(ggAdsUrl)};cds.addGoogleBlock=addGoogleBlock}()})(cds,window);