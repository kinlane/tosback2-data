(function($){function isNumber(obj,min,max){return typeof obj=="number"&&(isNumber(min)?obj>=min:true)&&(isNumber(max)?obj<=max:true)}function isString(obj,minLength){return typeof obj=="string"&&(isNumber(minLength)?obj.length>=minLength:true)}var $isArray=$.isArray;$.extend({isNumber:isNumber,isString:isString,isObject:function(obj){return typeof obj=="object"&&obj!==null},isDefined:function(obj){return typeof obj!="undefined"},isArray:function(obj,minLength){return $isArray(obj)&&(isNumber(minLength)?obj.length>=minLength:true)}})})(jQuery);(function(){String.prototype.getCookie=function(){var re=new RegExp("\\b"+this+"\\s*=\\s*([^;]*)","i"),match=re.exec(document.cookie);return match&&match.length>1?match[1]:""}})();(function(){String.prototype.setCookie=function(value,expiryDays,domain,path,secure){var builder=[this,"=",value];if(expiryDays){var date=new Date;date.setTime(date.getTime()+expiryDays*86400000);builder.push(";expires=");builder.push(date.toUTCString())}if(domain){builder.push(";domain=");builder.push(domain)}if(path){builder.push(";path=");builder.push(path)}if(secure)builder.push(";secure");document.cookie=builder.join("")};String.prototype.delCookie=function(){document.cookie=this+"=; expires=Fri, 31 Dec 1999 23:59:59 GMT;"}})();(function($){$.fireAndForget=function(url){if(url){var img=new Image;img.onload=img.onerror=function(){img.onload=img.onerror=null};img.src=url.replace(/&amp;/gi,"&")}}})(jQuery);(function($){var silverlightDefaults={silverlightVersions:["5.0","4.0","3.0","2.0"],silverlightMimeType:"application/x-silverlight-2"};function silverlightVersion(options){var opts=$.extend(true,{},silverlightDefaults,options),win=window,silverlightPlugin;if(!$.isArray(opts.silverlightVersions,1))return 0;var installedVersion=0;try{var nav=win.navigator,plugins=nav.plugins;if(plugins&&plugins.length){silverlightPlugin=plugins["Silverlight Plug-In"];if(silverlightPlugin)installedVersion=/^\d+\.\d+/.exec(silverlightPlugin.description)[0];silverlightPlugin=0}else if(win.ActiveXObject){var control=new ActiveXObject("AgControl.AgControl");if(control){installedVersion=1;var obj=$("<OBJECT/>")[0];obj.codeType=opts.silverlightMimeType;if(typeof obj.IsVersionSupported!="undefined")for(var version,idx=0;version=opts.silverlightVersions[idx];++idx)if(obj.IsVersionSupported(version)){installedVersion=version;break}obj=0}}}catch(e){}return installedVersion}$.silverlight=silverlightVersion;$.silverlight.version=silverlightVersion();$.silverlight.defaults=silverlightDefaults})(jQuery);(function(){String.prototype.format=function(){for(var fmt=this,ndx=0;ndx<arguments.length;++ndx)fmt=fmt.replace(new RegExp("\\{"+ndx+"\\}","g"),arguments[ndx]);return fmt};String.prototype.findKey=function(keyToFind,itemSeparator,keyAndValueSeparator){itemSeparator=itemSeparator||"|";keyAndValueSeparator=keyAndValueSeparator||":";var result=null,items=this.split(itemSeparator);if(items)for(var i=0;i<items.length;i++){var keyValue=items[i].split(keyAndValueSeparator);if(keyValue[0]==keyToFind){result=keyValue[1];break}}return result}})();(function($){var doc=document,win=window,loc=win.location,ridkey,trackDefaults={evtType:"click",spinTimeout:150,trackInfoOpts:{notrack:"notrack",cmSeparator:">",defaultModule:"body",defaultFormHeadline:"[form submit]",piitxt:"piitxt",piiurl:"piiurl",wrapperId:"wrapper",defaultConnectionType:"LAN",smpCookie:"Sample",smpExp:182,MUIDCookie:"MUID",event:{},sitePage:{},userStatic:{}}};function trackFn(options){var opts=$.extend(true,{},trackDefaults,options);trackFn.recipients=[];trackFn["trackInfo"]=new trackInfoFn(opts.trackInfoOpts);trackFn.register=function(){trackFn.recipients=trackFn.recipients.concat(Array.prototype.slice.call(arguments));return trackFn};trackFn.trackEvent=function(event,element,destination,headline,module,index,campaign){trackFn.trackInfo.event=event;if(trackFn.trackInfo.createReport(element,destination,headline,module,index,campaign))callEachImplementation("getEventTrackingUrl",true)};trackFn.trackPage=function(){callEachImplementation("getPageViewTrackingUrl",false)};trackFn.genericTrackUrl=function(index){trackFn.trackInfo.incrementEventNumber();var impl=trackFn.recipients[index];if($.isFunction(impl["getPageViewTrackingUrl"]))return impl["getPageViewTrackingUrl"](trackFn.trackInfo)};$.fn.trackForms=function(){return this.each(function(){var $forms=$(this);$forms=!$forms.is("form")?$("form",$forms):$forms;$forms.bind("submit",onSubmitHandler)})};function callEachImplementation(methodName,spinNeeded){trackFn.trackInfo.incrementEventNumber();for(var ndx in trackFn.recipients){var impl=trackFn.recipients[ndx];if($.isFunction(impl[methodName]))$.fireAndForget(impl[methodName](trackFn.trackInfo))}if(spinNeeded&&!trackFn.trackInfo.client.isIE()){var stopTime=opts.spinTimeout+new Date;while(stopTime>+new Date);}}function onClick(event){if(event&&event.target&&event.button!=2){var $element=$(event.target),$href=$element.filter("*[href]:first");if(!$href.length)$href=$element.closest("*[href]");if($href.length)trackFn.trackEvent(event,$href[0])}}function onSubmitHandler(event){trackFn.trackEvent(event)}$(document).bind(opts.evtType,onClick).bind("impr",trackFn.trackEvent);$(window).bind("load unload scroll",trackFn.trackEvent);$(function(){$("body").trackForms()});return trackFn}$.track=trackFn;function trackInfoFn(options){var s=screen,fn=trackInfoFn.prototype,opts=$.extend(true,{},options);fn.sitePage=opts.sitePage;fn.userStatic=opts.userStatic;var browserHeight,browserWidth,isIEBrowser,sampleValue=-1,timezoneValue,clientIdValue;fn.client=$.extend({screenResolution:function(){return s.width+"x"+s.height},clientId:function(){if(!clientIdValue){var MUIDCookieValue=opts.MUIDCookie.getCookie();clientIdValue=MUIDCookieValue?MUIDCookieValue:$.track.trackInfo.userStatic.requestId}return clientIdValue},colorDepth:s.colorDepth,cookieSupport:function(){return doc.cookie?"Y":"N"},height:function(){if(!browserHeight)getBrowserSize();return browserHeight},width:function(){if(!browserWidth)getBrowserSize();return browserWidth},isIE:function(){if(!$.isDefined(isIEBrowser))isIEBrowser=$.isDefined(win.ActiveXObject);return isIEBrowser},connectionType:function(){return opts.defaultConnectionType},pageUrl:loc.href,referrer:doc.referrer,getAllPgId:function(){if(typeof setprop47Var!="undefined"&&setprop47Var!=null)return setprop47Var();else return ""},getQParam:function(){var key="q";key=key.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+key+"=([^&#]*)"),qs=regex.exec(window.location.href);return qs?qs[1]:""},sample:function(){if(sampleValue==-1){var cookieValue=opts.smpCookie.getCookie();sampleValue=parseInt(cookieValue);sampleValue=!isNaN(sampleValue)?sampleValue%100:Math.floor(Math.random()*100);var topDomain=location.hostname.match(/([^.]+\.[^.]*)$/),cookieDomain=topDomain?topDomain[0]:"";opts.smpCookie.setCookie(sampleValue,opts.smpExp,cookieDomain)}return sampleValue},timezone:function(){if(!timezoneValue){var now=new Date,later=new Date;later.setMonth(now.getMonth()+6);var x=Math.round(now.getTimezoneOffset()/60)*-1,y=Math.round(later.getTimezoneOffset()/60)*-1;timezoneValue=x<y?x:y}return timezoneValue}},fn.client);fn.createReport=function(element,destination,headline,module,index,campaign){var report,trackInfo=this;if(!element&&trackInfo.event&&trackInfo.event.target)element=trackInfo.event.target;if(element&&!$(element).attr(opts.notrack)){var $element=$(element);report={destinationUrl:destination,campaignId:"",contentElement:index,contentModule:module,headline:headline,sourceIndex:element.sourceIndex?element.sourceIndex:"",nodeName:element.nodeName};if(!destination){var piiUrl=element.href||element.action;report.destinationUrl=$element.attr(opts.piiurl)||piiUrl||""}if(!headline){headline=$element.attr(opts.piitxt);if(!headline)if($element.filter("form").length)headline=opts.defaultFormHeadline;else try{headline=$element.text()||$element.attr("alt")||$("[alt]",$element).attr("alt")}catch(exp){headline=""}report.headline=headline}report.campaignId=campaign||getCampaign(report.destinationUrl);var $parentWithId=$element.parents("[id]");if(!report.contentModule){var modules=[];for(var parent,ndx=0;parent=$parentWithId[ndx];++ndx){var id=parent.id;if(id==opts.wrapperId)break;modules.splice(0,0,id)}report.contentModule=modules.join(opts.cmSeparator);if(!report.contentModule)report.contentModule=opts.defaultModule}if(!report.contentElement){var count=0;if($element.attr("id"))count=1;else if($parentWithId.length)count=findNavigableElementIndex($parentWithId[0],element,-1);report.contentElement=count}}trackInfo.report=report;return report};fn.report={};fn.incrementEventNumber=function(){this.userDynamic.eventNumber++};fn.isSampled=function(samplingRate){return !(fn.client.sample()>samplingRate)};fn.generateUrl=function(baseUrl,common,commonMap,params,paramMap){var url="",allparams=$.extend(true,{},params,common);paramMap=$.extend(true,{},commonMap,paramMap);if(paramMap)for(var mapProperty in paramMap)if(this[mapProperty]){var trackInfoParams=createParamArray(paramMap[mapProperty],this[mapProperty]);allparams=$.extend(true,{},trackInfoParams,allparams)}var queryString=$.param(allparams);if(queryString.length>0)url=baseUrl+queryString;return url};function createParamArray(map,propertySource){var resultArray={};if(map&&propertySource)for(var param in map){var propertySelector=map[param],propertyValue=propertySource[propertySelector];if(propertyValue)resultArray[param]=$.isFunction(propertyValue)?propertyValue():propertyValue}return resultArray}function findNavigableElementIndex(parentNode,element,count){if(!count)count=-1;var $children=$(parentNode).children();for(var childNode,ndx=0;count<0&&(childNode=$children[ndx]);++ndx){if(childNode==element)return -count;var $childNode=$(childNode);if(!$childNode.attr("id")){if($childNode.attr("href")&&!$childNode.attr(opts.notrack))--count;count=findNavigableElementIndex(childNode,element,count)}}return count}function getCampaign(url){var match=/\bGT1=(\d+)/i.exec(url);return match?match[1]:""}function getBrowserSize(){if($.isNumber(win.innerWidth)){browserWidth=win.innerWidth;browserHeight=win.innerHeight}else{var documentElement=doc.documentElement;if(documentElement&&documentElement.clientWidth){browserWidth=documentElement.clientWidth;browserHeight=documentElement.clientHeight}else if(documentElement.offsetWidth){browserWidth=documentElement.offsetWidth;browserHeight=documentElement.offsetHeight}}}}trackInfoFn.prototype.client={};trackInfoFn.prototype.userDynamic={isHomePage:function(){var documentElement=doc.documentElement,retVal=0;if($.isDefined(documentElement.addBehavior)&&documentElement.addBehavior("#default#homePage"))try{retVal=documentElement.isHomePage(loc.href)?"Y":"N"}catch(e){}return retVal},anid:function(){return "ANON".getCookie()},timeStamp:function(){return +new Date},requestId:function(){if($.track.trackInfo.userStatic.requestId)return $.track.trackInfo.userStatic.requestId;else{var s=[],hexDigits="0123456789ABCDEF";for(var i=0;i<32;i++)s[i]=hexDigits.substr(Math.floor(Math.random()*16),1);s[12]="4";s[16]=hexDigits.substr(s[16]&3|8,1);var uuid=s.join("");ridkey=uuid;$.track.trackInfo.userStatic.requestId=ridkey;return uuid}},eventNumber:0};trackFn.trackInfo=trackInfoFn})(jQuery);(function($){function initCheckFn(options){var fn=this,opts=fn.opts=$.extend(true,{},options),implementations=$.track.recipients;fn.getTrackInfoPropertyList=function(trackInfo,excludeList){var trackInfoPropertyList=[],trackInfoPropertyName,trackInfoProperty;excludeList=excludeList||[];for(trackInfoPropertyName in trackInfo)if($.inArray(trackInfoPropertyName,excludeList)==-1){trackInfoProperty=trackInfo[trackInfoPropertyName];for(var trackInfoSubPropertyName in trackInfoProperty){var fullPropertyName=trackInfoPropertyName+"."+trackInfoSubPropertyName,propertyValue=trackInfoProperty[trackInfoSubPropertyName];if($.inArray(fullPropertyName,excludeList)==-1&&$.isDefined(propertyValue))trackInfoPropertyList.push(fullPropertyName)}}return trackInfoPropertyList};fn.missingProperties=function checkAllMappedPropertiesArePresent(trackInfo,paramMap){var results=[];for(var trackInfoPropertyName in paramMap){var trackInfoProperty=trackInfo[trackInfoPropertyName];if(!$.isDefined(trackInfoProperty)){results.push("missing trackInfo."+trackInfoPropertyName);continue}var map=paramMap[trackInfoPropertyName];for(var param in map){var propertySelector=map[param],propertyValue=trackInfoProperty[propertySelector];if(!$.isDefined(propertyValue)){var msg=["missing trackInfo.",trackInfoPropertyName,".",propertySelector," which maps to ",param];results.push(msg.join(""))}}}return results};fn.duplicateProperties=function checkDuplicateMapping(trackInfo,paramMap){var results=[],paramSet=[];for(var trackInfoPropertyName in paramMap){var trackInfoProperty=trackInfo[trackInfoPropertyName];if($.isDefined(trackInfoProperty)){var map=paramMap[trackInfoPropertyName];for(var param in map){var propertySelector=trackInfoPropertyName+"."+map[param];if($.inArray(propertySelector,paramSet)!=-1){var msg=["duplicate use of trackInfo.",propertySelector," which maps to ",param];results.push(msg.join(""))}paramSet.push(propertySelector)}}}return results};fn.unusedProperties=function checkUnusedProperties(trackInfo,paramMap){var results=[],trackInfoPropertyList=fn.getTrackInfoPropertyList(trackInfo,opts.excludeTrackInfoProperties),trackInfoPropertyName,trackInfoProperty;for(trackInfoPropertyName in paramMap){trackInfoProperty=trackInfo[trackInfoPropertyName];if($.isDefined(trackInfoProperty)){var map=paramMap[trackInfoPropertyName];for(var param in map){var propertySelector=trackInfoPropertyName+"."+map[param],arrayPosition=$.inArray(propertySelector,trackInfoPropertyList);if(arrayPosition!=-1)trackInfoPropertyList[arrayPosition]=""}}}results=$.map(trackInfoPropertyList,function(unusedPropertyName){if(unusedPropertyName.length>0)return "unused property "+unusedPropertyName});return results};fn.requiredProperties=function checkRequiredProperties(trackInfo){var results=[],trackInfoPropertyList=fn.getTrackInfoPropertyList(trackInfo);for(var ndx in opts.requiredPropertyList){var fullPropertyName=opts.requiredPropertyList[ndx];if($.inArray(fullPropertyName,trackInfoPropertyList)==-1)results.push("required property missing "+fullPropertyName)}return results};function getCombinedMap(item){var combinedMap;if($.isObject(item))for(var itemName in item){var option=item[itemName],map=itemName.match("Map")?option:getCombinedMap(option);combinedMap=$.extend(true,combinedMap,map)}return combinedMap}function getResults(trackInfo){var results=[],individualImplCheckFunctionNames=opts.individualChecks,combinedChecks=opts.combinedChecks,nonImplementationChecks=opts.nonImplementationChecks;callChecksAndMergeResults(trackInfo,results,{},nonImplementationChecks);if($.isArray(individualImplCheckFunctionNames)||$.isArray(combinedChecks)){var combinedMap;for(var ndx in implementations){var impl=implementations[ndx],implCombinedMap=getCombinedMap(impl.opts);callChecksAndMergeResults(trackInfo,results,implCombinedMap,individualImplCheckFunctionNames);combinedMap=$.extend(true,combinedMap,implCombinedMap)}callChecksAndMergeResults(trackInfo,results,combinedMap,combinedChecks)}return results}function callChecksAndMergeResults(trackInfo,results,paramMap,checkFunctionNames){if(paramMap&&checkFunctionNames)$.map(checkFunctionNames,function(checkFunctionName){var checkFunction=fn[checkFunctionName];if($.isFunction(checkFunction))results=$.merge(results,checkFunction(trackInfo,paramMap))});return results}fn.getEventTrackingUrl=function(trackInfo){var url="";if(trackInfo.event.type=="checks")initCheckFn.results=getResults(trackInfo);return url}}initCheckFn.urlLength=function checkUrlLength(maxUrlLength){var results=[],max=-1,$currentElement,oldFireAndForget=$.fireAndForget;$.fireAndForget=function(url){if(url.length>max)max=url.length;if(url.length>maxUrlLength){results.push(url);if($currentElement)$currentElement.attr({style:"border: 2px solid red"})}};function preventDefault(event){event.preventDefault()}function triggerAction(selector,eventType){$("body").bind(eventType,preventDefault);$(selector).each(function(){$currentElement=$(this);$currentElement.unbind(eventType).trigger(eventType)});$("body").unbind(eventType,preventDefault)}triggerAction("a[notrack!=1]","click");triggerAction("form","submit");$.fireAndForget=oldFireAndForget;results.push("Max url.length="+max);return results};var defaults={messageAttr:{style:"text-align: center; width: 100%; border: solid 1px Red;"},nonImplementationChecks:["requiredProperties"],individualChecks:["duplicateProperties"],combinedChecks:["missingProperties","unusedProperties"],excludeTrackInfoProperties:["event","client.isIE","client.sample","userStatic.defaultSlotTrees","userStatic.userGroup","userStatic.optKey"],requiredPropertyList:["sitePage.sourceUrl","sitePage.pageName","userStatic.requestId"],maxUrlLength:2083};$.runCheck=function(options){var opts=$.extend(true,defaults,options),$body=$("body"),resultMarkup=[];if($.track){var result=$.track.initCheck.urlLength(opts.maxUrlLength);$.track.register(new $.track.initCheck(opts));$(document).bind("checks",$.track.trackEvent);$body.trigger("checks");result=$.merge(result,$.track.initCheck.results);resultMarkup=$.map(result,function(result){return "<div>"+result+"</div>"})}else resultMarkup.push("$.track is not defined");var $message=$(".initCheck");if($message.length==0){$message=$("<div/>").attr("class","initCheck").attr(opts.messageAttr).text("");$body.prepend($message)}$message.html(resultMarkup.join(""))};if($.track)$.track.initCheck=initCheckFn})(jQuery);(function($){if($.track&&$.track.trackInfo){var trackInfoPrototype=$.track.trackInfo.prototype,client=trackInfoPrototype.client;if(client){var flightKeyValue,groupAssignmentValue,optKeyValue;function getUserGroup(){return trackInfoPrototype.userStatic&&trackInfoPrototype.userStatic.userGroup}client=$.extend(client,{flightKey:function(){if(!flightKeyValue){var userGroup=getUserGroup();flightKeyValue=userGroup&&userGroup.substring(0,userGroup.indexOf(":"))||"default"}return flightKeyValue},groupAssignment:function(){if(!groupAssignmentValue){var userGroup=getUserGroup();groupAssignmentValue=userGroup&&parseInt(userGroup.substring(userGroup.indexOf(":")+1))?"S":"P"}return groupAssignmentValue},optKey:function(){if(!optKeyValue)optKeyValue=trackInfoPrototype.userStatic.optKey||"default";return optKeyValue}})}}})(jQuery);(function($){if($.track&&$.track.trackInfo){var client=$.track.trackInfo.prototype.client,silverlightVersionValue=-1;if(client){function silverlightVersion(){if(silverlightVersionValue==-1)silverlightVersionValue=$.silverlight&&$.silverlight.version?$.silverlight.version:"";return silverlightVersionValue}client.silverlightVersion=silverlightVersion;client.silverlightEnabled=function(){return Number(silverlightVersion()>0)}}}})(jQuery);(function($){var date=new Date,omniDefaults={base:"",linkTrack:1,samplingRate:100,common:{v:"Y",j:"1.3"},commonMap:{client:{c:"colorDepth"}},page:{v1:date.getMonth()+1+"/"+date.getFullYear(),v2:date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear(),t:timeStampParam()},pageMap:{sitePage:{c3:"pageVersion"}},link:{t:timeStampParam(),ndh:1,pidt:1,pe:"lnk_o"},linkMap:{sitePage:{c38:"pageVersion"}},eventList:["click","mouseenter","mouseleave","submit"]};$.track.omniTracking=function(options){var fn=this,opts=fn.opts=$.extend(true,{},omniDefaults,options);fn.getEventTrackingUrl=function(trackInfo){var url="";if(trackInfo.isSampled(opts.samplingRate)){var eventType=trackInfo.event?trackInfo.event.type:"";if(opts.linkTrack&&$.inArray(eventType,opts.eventList)!=-1){var link=$.extend(true,{},opts.link,{c11:eventType=="mouseenter"||eventType=="mouseleave"?"hover":eventType,events:"events4"}),queryString=trackInfo.generateUrl("",opts.common,opts.commonMap,link,opts.linkMap);url=opts.base.format(trackInfo.userDynamic.timeStamp(),queryString)}}return url};fn.getPageViewTrackingUrl=function(trackInfo){var pageTrackingUrl="";if(trackInfo.isSampled(opts.samplingRate)){var queryString=trackInfo.generateUrl("",opts.common,opts.commonMap,opts.page,opts.pageMap);pageTrackingUrl=opts.base.format(trackInfo.userDynamic.timeStamp(),queryString)}return pageTrackingUrl}};function timeStampParam(){var timestampArray=[date.getDate(),"/",date.getMonth(),"/",date.getFullYear()," ",date.getHours(),":",date.getMinutes(),":",date.getSeconds()," ",date.getDay()," ",date.getTimezoneOffset()];return timestampArray.join("")}$.track.omniTracking.defaults=omniDefaults})(jQuery);(function($){var genericDefaults={base:"",samplingRate:100,eventAlias:{submit:"click",mouseenter:"click",mouseleave:"click"}};$.track.genericTracking=function(options){var fn=this,opts=fn.opts=$.extend(true,{},genericDefaults,options);fn.getEventTrackingUrl=function(trackInfo,eventName){var url="";if(trackInfo.isSampled(opts.samplingRate)){eventName=eventName?eventName:trackInfo.event.type;var eventDictionary=opts[eventName];if(!$.isDefined(eventDictionary)&&$.isDefined(opts.eventAlias[eventName]))eventDictionary=opts[opts.eventAlias[eventName]];if($.isDefined(eventDictionary)){var condition=eventDictionary.condition;if(!$.isDefined(condition)||$.isNumber(condition)&&condition||$.isFunction($[condition])&&$[condition].call()){var baseurl=opts.base+(eventDictionary.url?eventDictionary.url:"");url=trackInfo.generateUrl(baseurl,opts.common,opts.commonMap,eventDictionary.param,eventDictionary.paramMap)}}}return url};fn.getPageViewTrackingUrl=function(trackInfo){return fn.getEventTrackingUrl(trackInfo,"impr")}}})(jQuery)