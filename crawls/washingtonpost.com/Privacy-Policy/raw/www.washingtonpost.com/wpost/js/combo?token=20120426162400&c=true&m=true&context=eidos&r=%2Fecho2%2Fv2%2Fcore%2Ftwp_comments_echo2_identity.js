function editAvatar(E){var D=TWP.Objs.modal;var A=jQuery(E.target).parent().attr("href");var B=jQuery("#modal_bar");var C=jQuery("#modal_close");D.showModal({content:"iframe",url:A,width:600,height:300,clone:false,ads:true,skin:"email",callback:function(){cssObj={"display":"block","background-color":"#ffffff"};B.css(cssObj);closeCssObj={"right":-34,"top":-52};jQuery("img",B).remove();C.css(closeCssObj);C.click(function(){TWP.Modules.Action.objs.modal.closeModal();});}});}wp_e2={allow_comments:true,allow_links:true,allow_photos:false,allow_videos:false,apiBaseURL:"http://echoapi.wpdigital.net",echoSubmissionProxyURL:"http://apps.echoenabled.com/v2/esp/activity",appkey:"dev.washpost.com",backplaneSettings:{serverBaseURL:"http://api.js-kit.com/v1",busName:"washpost.com"},bookmarkletUrl:"https://testapp12b:7001/bookmarklet/edit-comment.html",commentMaxLength:3000,counterTarget:".echo-counter",debug:false,default_items:15,defaultTab:"top",display_ugc_photos:false,display_more:true,displayPhotoGalleryPluginArray:[{"name":"TWP_UGC_Gallery"}],environment:{"dev":{logOutURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=admin/registration/login&destination=logout&nextstep=confirm",logInURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",profileURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",proxyURL:"http://bunsen.wapolabs.com/identity/1.4.1/js/wapo_jskit_login_redirect.js",identityjsUrl:"http://bunsen.wapolabs.com/identity/post/iddev/1.4.1/js/wapo_identity.js",twp_echojsUrl:"/rw/sites/twpweb/js/echo2/v2/core/twp_comments_echo2.js",metaUrl:"http://iddev.digitalink.com/identity/public/visitor/submit_metadata.json",bookmarkletUrl:"https://testapp12b:7001/bookmarklet/edit-comment.html",appkey:"dev.washpost.com"},"qa":{logOutURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=admin/registration/login&destination=logout&nextstep=confirm",logInURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",profileURL:"http://testweb8c.digitalink.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",proxyURL:"http://bunsen.wapolabs.com/identity/1.4.1/js/wapo_jskit_login_redirect.js",identityjsUrl:"http://bunsen.wapolabs.com/identity/post/regtest/1.4.1/js/wapo_identity.js",twp_echojsUrl:"/rw/sites/twpweb/js/echo2/v2/core/twp_comments_echo2.js",metaUrl:"http://id.regtest.digitalink.com/identity/public/visitor/submit_metadata.json",bookmarkletUrl:"https://testapp12b:7001/bookmarklet/edit-comment.html",appkey:"dev.washpost.com"},"stage":{logOutURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=admin/registration/login&destination=logout&nextstep=confirm",logInURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",profileURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",proxyURL:"http://bunsen.wapolabs.com/identity/1.4.1/js/wapo_jskit_login_redirect.js",identityjsUrl:"http://bunsen.wapolabs.com/identity/post/prod/1.4.1/js/wapo_identity.js",twp_echojsUrl:"/rw/sites/twpweb/js/echo2/v2/core/twp_comments_echo2.js",metaUrl:"http://idstg.washingtonpost.com/identity/public/visitor/submit_metadata.json",bookmarkletUrl:"https://testapp12b:7001/bookmarklet/edit-comment.html",appkey:"prod.washpost.com"},"prod":{logOutURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=admin/registration/login&destination=logout&nextstep=confirm",logInURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",profileURL:"http://www.washingtonpost.com/ac2/wp-dyn?node=profile/create&target=weighIn&url=",proxyURL:"http://bunsen.wapolabs.com/identity/1.4.1/js/wapo_jskit_login_redirect.js",identityjsUrl:"http://bunsen.wapolabs.com/identity/post/prod/1.4.1/js/wapo_identity.js",twp_echojsUrl:"/rw/sites/twpweb/js/echo2/v2/core/twp_comments_echo2.js",metaUrl:"http://id.washingtonpost.com/identity/public/visitor/submit_metadata.json",bookmarkletUrl:"https://liveadmin.washingtonpost.com/bookmarklet/edit-comment.html",appkey:"prod.washpost.com"}},guid:window.location.href,identityjsUrl:"",isAllComments:false,liveUpdatesTimeout:{counter:{"default":20,"closed":0,"no_webtype":60},stream:{"default":20,"closed":0,"no_webtype":0}},logOutURL:"",logInURL:"",markerDisplay:{"top_commenter":"Post Forum Member","top_local":"Washingtologist","top_sports":"SuperFan","staff":"Post Writer","fact_checker":"Fact Checker","post_recommended":"Post Recommended","world_watcher":"World Watcher","culture_connoisseur":"Culture Connoisseur"},max_items_to_display:0,maxItemsTop:3,maxItems:15,metaUrl:"",moderation_required:false,pageURL:window.location.href,photoCommentMaxLength:500,profileURL:"",proxyURL:"",sectionId:"",source:"washpost.com",streamPluginArray:[{"name":"Whirlpools","after":0,"clickable":true}],streamSettings:{defaults:{appkey:"dev.washpost.com",target:"#comment-stream",apiBaseURL:"",children:{additionalItemsPerPage:10,moreButtonSlideTimeout:400,itemsSlideTimeout:400},childrenItemsPerPage:10,childrenSortOrder:"chronological",plugins:[],truncateReplies:{after:0,clickable:true},streamStateLabel:{icon:true,text:true},viaLabel:{icon:true,text:true},reTag:false,streamStateToggleBy:"button",maxBodyCharacters:3000,aggressiveSanitization:false,openLinksInNewWindow:false,sortOrder:"reverseChronological",reply:false,request:"childrenof",allowedItemStates:["Untouched","CommunityFlagged","ModeratorApproved"],allowedUserStates:["ModeratorApproved"],safeHTML:"aggressive",childrenMaxDepth:1}},streamTabs:{all:{active:false,userMarkers:[""],childrenMaxDepth:1,childrenItemsPerPage:3,childrenSortOrder:"chronological",maxBodyCharacters:3000,title:"All Comments"},top:{active:false,userMarkers:["top_commenter","top_local","top_sports","staff"],itemMarkers:["post_recommended"],title:"Top Comments",childrenMaxDepth:1,childrenItemsPerPage:1,childrenSortOrder:"chronological",tabUrl:"",maxBodyCharacters:500,request:"childrenof"}},submitPluginArray:[],streamClient:null,streamId:"",streamTarget:"#echo_comment_stream",submitTarget:"#comment-box",topicCommentMaxLength:140,twp_echojsUrl:"",uploadPhotoPluginArray:[{"name":"FileUpload","thumbnailRes":[90,60],"previewRes":[300,200],"webRes":[610,407],"showDefaultInputs":false,"fileSizeMax":5120,"fileSizeMin":0,"filesMax":1,"storageServer":"http://s3.amazonaws.com/twp_echo_ugc","authorName":""}]};(function(C){wp_e2.createDataObject=function(G){var F={};if(typeof G.attr("data")!=="undefined"&&G.attr("data").length>0){var D=G.attr("data").split("&");for(var E=0;E<D.length;E++){if(D[E]!=""){valArry=D[E].split("=");F[valArry[0].toLowerCase()]=(valArry[1]=="true")?true:(valArry[1])=="false"?false:valArry[1];}}}else{var D=G[0].attributes;for(var E=0;E<D.length;E++){F[D[E].nodeName.toLowerCase()]=(D[E].nodeValue=="true")?true:(D[E].nodeValue)=="false"?false:D[E].nodeValue;}}return F;};wp_e2.initDataObject=function(E){var D=(typeof E!="undefined")?E:C(".comment-vars");D.each(function(H,F){var I=C(F);data=wp_e2.createDataObject(I);var G=I.attr("id");wp_e2[G]={};wp_e2[G].allCommentsURL=data.articleurlfacet;wp_e2[G].allow_comments=(typeof data.allow_comments!=="undefined"&&data.allow_comments!=="")?data.allow_comments:wp_e2.allow_comments;wp_e2[G].allow_links=(typeof data.allow_links!=="undefined"&&data.allow_links!=="")?data.allow_links:wp_e2.allow_links;wp_e2[G].allow_photos=(typeof data.allow_photos!=="undefined"&&data.allow_photos!=="")?data.allow_photos:wp_e2.allow_photos;wp_e2[G].allow_videos=(typeof data.allow_videos!=="undefined"&&data.allow_videos!=="")?data.allow_videos:wp_e2.allow_videos;wp_e2[G].defaultTab=(typeof data.defaulttab!=="undefined"&&data.defaulttab!="")?data.defaulttab:wp_e2.defaultTab;wp_e2.streamSettings.defaults.sortOrder=(typeof data.defaultsort!=="undefined"&&data.defaultsort!="")?data.defaultsort:wp_e2.streamSettings.defaults.sortOrder;wp_e2[G].display_more=(typeof data.display_more!=="undefined"&&data.display_more!="")?wp_e2.display_more:data.display_more;wp_e2[G].display_ugc_photos=(typeof data.display_ugc_photos!=="undefined"&&data.display_ugc_photos!=="")?data.display_ugc_photos:wp_e2.display_ugc_photos;
wp_e2[G].guid=data.guid;wp_e2[G].includetabs=(typeof data.includetabs=="undefined")?true:data.includetabs;wp_e2[G].includesorts=(typeof data.includesorts=="undefined")?true:data.includesorts;wp_e2[G].includereply=(typeof data.includereply=="undefined")?true:data.includereply;wp_e2[G].includereport=(typeof data.includereport=="undefined")?true:data.includereport;wp_e2[G].includerecommend=(typeof data.includerecommend=="undefined")?true:data.includerecommend;wp_e2[G].isAllComments=(typeof data.isallcomments!=="undefined"&&data.isallcomments!=="")?data.isallcomments:wp_e2.isAllComments;wp_e2[G].itemMarkersTop=data.markers;wp_e2[G].itemMarkers=data.markersall;wp_e2[G].itemUrl=data.itemurl;wp_e2[G].markerDisplay=(typeof data.markerdisplay!=="undefined"&&data.markerdisplay!="")?jQuery.parseJSON("{"+data.markerdisplay.replace(/'/g,'"')+"}"):wp_e2.markerDisplay;wp_e2.streamTabs.all.maxItems=(typeof data.maxitems!=="undefined"&&data.maxitems!="")?data.maxitems:wp_e2.maxItems;wp_e2[G].moderation_required=(typeof data.moderationrequired!=="undefined"&&data.moderationrequired!=="")?data.moderationrequired:wp_e2.moderation_required;wp_e2[G].sectionId=data.sectionid;wp_e2[G].source=(typeof data.commentssource!=="undefined"&&data.commentssource!=="")?data.commentssource:wp_e2.source;wp_e2[G].streamId=data.streamid;wp_e2[G].userMarkersTop=data.usermarkers;wp_e2[G].userMarkers=data.usermarkersall;wp_e2[G].webType=(typeof data.webtype=="undefined")?"article_story":data.webtype;if(wp_e2[G].includetabs==true){wp_e2[G].streamTabs=C.extend(true,{},wp_e2.streamTabs);}else{wp_e2[G].streamTabs={};wp_e2[G].streamTabs[wp_e2[G].defaultTab]={};wp_e2[G].streamTabs[wp_e2[G].defaultTab]=C.extend(true,{},wp_e2.streamTabs[wp_e2[G].defaultTab]);}if(wp_e2[G].streamTabs.top){wp_e2[G].streamTabs.top.maxItems=(typeof data.maxitemstop!=="undefined"&&data.maxitemstop!="")?data.maxitemstop:wp_e2.maxItemsTop;}if(wp_e2[G].streamTabs.all){wp_e2[G].streamTabs.all.maxItems=(typeof data.maxitems!=="undefined"&&data.maxitems!="")?data.maxitems:wp_e2.maxItems;if(typeof data.markersall!=="undefined"&&data.markersall!=""){wp_e2[G].streamTabs.all.itemMarkers=wp_e2[G].itemMarkers.split(",");}if(typeof data.usermarkersall!=="undefined"&&data.usermarkersall!=""){wp_e2[G].streamTabs.all.userMarkers=wp_e2[G].userMarkers.split(",");}if(wp_e2[G].streamTabs.top&&(parseInt(wp_e2[G].streamTabs.all.maxItems)<=parseInt(wp_e2[G].streamTabs.top.maxItems))){wp_e2[G].streamTabs.all.maxItems=wp_e2.maxItems;}}if(wp_e2[G].defaultTab=="all"){wp_e2[G].streamTabs.all.active=true;}if(wp_e2[G].defaultTab=="top"){wp_e2[G].streamTabs.top.active=true;if(typeof data.usermarkers!=="undefined"&&data.usermarkers!=""){wp_e2[G].streamTabs.top.userMarkers=wp_e2[G].userMarkersTop.split(",");}if(typeof data.markers!=="undefined"&&data.markers!=""){wp_e2[G].streamTabs.top.itemMarkers=wp_e2[G].itemMarkersTop.split(",");}}if(wp_e2[G].allow_photos||wp_e2[G].allow_videos){wp_e2.streamSettings.defaults.safeHTML="false";}if(!data.isallcomments&&data.maxitems>0){wp_e2[G].max_items_to_display=data.maxitems;if((wp_e2[G].webType).toLowerCase().indexOf("blogstory")<0&&(wp_e2[G].webType).toLowerCase().indexOf("discussion_story")<0){wp_e2[G].streamTabs.top=C.extend(true,{},wp_e2[G].streamTabs.top,{tabUrl:data.articleurlfacet+"?ctab=top_&#comments"});wp_e2[G].streamTabs.all=C.extend(true,{},wp_e2[G].streamTabs.all,{tabUrl:data.articleurlfacet+"?ctab=all_&#comments"});}}if((wp_e2[G].webType).toLowerCase().indexOf("discussion_story")>=0){wp_e2[G].streamTabs.top.title="Top Posts";wp_e2[G].streamTabs.all.title="All Posts";}if((wp_e2[G].webType).toLowerCase().indexOf("topic_story")>=0){wp_e2[G].commentMaxLength=wp_e2.topicCommentMaxLength;}else{wp_e2[G].commentMaxLength=wp_e2.commentMaxLength;}if(jQuery("#ugc-photo-gallery").length>0){wp_e2[G].commentMaxLength=wp_e2.photoCommentMaxLength;}});};C(".echo_container").not(".processed").buildecho();wp_e2.initDataObject();wp_e2.streamSettings.defaults.apiBaseURL=wp_e2.apiBaseURL;var A=((typeof TWP==="undefined")||(typeof TWP.Data==="undefined")||(typeof TWP.Data.environment)==="undefined")?"dev":TWP.Data.environment;var B=(typeof eidosBase!=="undefined"&&eidosBase!=="")?eidosBase:"";wp_e2.logOutURL=wp_e2.environment[A].logOutURL;wp_e2.logInURL=wp_e2.environment[A].logInURL;wp_e2.profileURL=wp_e2.environment[A].profileURL;wp_e2.proxyURL=wp_e2.environment[A].proxyURL;wp_e2.identityjsUrl=wp_e2.environment[A].identityjsUrl;wp_e2.twp_echojsUrl=B+wp_e2.environment[A].twp_echojsUrl;wp_e2.metaUrl=wp_e2.environment[A].metaUrl;wp_e2.appkey=wp_e2.environment[A].appkey;wp_e2.bookmarkletUrl=wp_e2.environment[A].bookmarkletUrl;if(window.location.href.indexOf("echodebug=true",0)>0){wp_e2.debug=true;}if(typeof TWP_Debug=="undefined"||TWP_Debug==""){TWP_Debug={};}if(!TWP_Debug.initialTime){TWP_Debug.initialTime=new Date();}wp_e2.debug&&window.console&&console.log&&console.log("["+(new Date()-TWP_Debug.initialTime)/1000+"]"+"echo2/v2/core/twp_comments_echo2_identity.js - Starting Identity Load");})(jQuery);