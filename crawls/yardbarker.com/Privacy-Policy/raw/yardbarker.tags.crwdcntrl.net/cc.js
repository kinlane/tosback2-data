(function(){var userAgent=navigator.userAgent.toLowerCase(),domain=document.domain,test=false,bcpDomain='',autoFire=false,loaded=false,async_props={async:false,asyncBehaviors:{},asyncOpportunityIds:[],asyncOpportunities:[]},behaviors={},urls={},sep="/",version="4",delim="|",bcpd_callback=null,pv="pv=y",dobcp=false,placementOpps={p:[],pt:[]};var client=1; ;var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var addEvent=(function(){if(document.addEventListener){return function(obj,sEvent,func){obj.addEventListener(sEvent,func,false);return true}}else{if(document.attachEvent){return function(obj,sEvent,func){obj.attachEvent("on"+sEvent,func);return true}}else{return function(obj,sEvent,func){return false}}}})();if(!client)return false;var ns,running=document.getElementById('LOTCC_'+client);if(running){var qs=parseQuery(running.src.replace(/^[^\?]+\??/,''));ns=qs['ns']||('LOTCC_'+client);autoFire=!!(qs['autobcp']||false);delete qs['ns'];delete qs['autobcp'];for(var type in qs){if(isArray(qs[type])){for(var i=0,beh;beh=qs[type][i++];){add(type,beh)}}}}else{ns=('LOTCC_'+client);}if(!(ns in window))window[ns]={};for(prop in async_props){if(prop in window[ns]){async_props[prop]=window[ns][prop]}else if(('LOTCC'in window)&&(typeof LOTCC==='object')&&(prop in LOTCC)){async_props[prop]=LOTCC[prop]}}window[ns].enableDiv=function(){};window[ns].enableNamedDiv=function(){};window[ns].fillDiv=function(){};window[ns].add=add;window[ns].addBehavior=addBehavior;window[ns].addInterest=addInterest;window[ns].addAction=addAction;window[ns].addMedia=addMedia;window[ns].bcp=bcp;window[ns].bcpd=bcpd;window[ns].bcpw=bcpw;window[ns].bcpdpv=bcpdpv;window[ns].pvdone=false;LOTCC=window[ns];addEvent(window,"load",doneload);addEvent(window,"load",loadAsync);if(autoFire){bcp()}function flash(msg){if(div=document.getElementById('LOTCC.status'))div.innerHTML=msg}function isArray(v){return v&&typeof v==='object'&&typeof v.length==='number'&&!(v.propertyIsEnumerable('length'))}function add(name,id){if(behaviors[name]==null){behaviors[name]=new Array()}var entry=behaviors[name];var encodedId=encodeURIComponent(id);entry[entry.length]=encodedId.replace(/%2F/g,"/")}function addBehavior(id){add("b",id)}function addAction(id){add("act",id)}function addInterest(id){add("int",id)}function addMedia(id){add("med",id)}function addMemberId(id){}function addContentId(id){}function addOpportunityId(id){placementOpps.p.push(id)}function addOpportunity(tag){placementOpps.pt.push(tag)}function appendInternal(url,vals,vr){if((typeof(vals)!="undefined")&&(vals.length>0)){var vn=delim+vr+"=";for(var i=0;i<vals.length;i++){url+=vn+vals[i]}}return url}function append(url,val,vr){if((typeof(val)!="undefined")&&(val.length>0)){var vals;if(isArray(val)){vals=val}else{vals=val.split(",")}var vn=delim+vr+"=";for(var i=0;i<vals.length;i++){url+=vn+vals[i]}}return url}function appendAll(url){for(var type in behaviors){url=appendInternal(url,behaviors[type],type)}for(var pl_type in placementOpps){url=appendInternal(url,placementOpps[pl_type],pl_type)}if(placementOpps.p.length>0||placementOpps.pt.length>0){url=appendInternal(url,'y','dp')}if(async_props.async){url=appendInternal(url,'y','async')}return url}function baseURL(is_pv){is_pv=!window[ns].pvdone;var min=100000000;var max=999999999;var randomnumber=Math.floor(min+(max-min)*Math.random());var prefix=((document.location.protocol=='https:')?'https:':'http:')+'//';var url=prefix+getDomain()+"/"+version+sep+"c="+client+delim+"rand="+randomnumber;if(is_pv){url+=delim+pv}if(typeof(group)!="undefined"){url+=delim+"brg="+group}return url}function getDomain(){return(test)?'bcp.test.lotame.com':'bcp.crwdcntrl.net'}function bcp(){if(client=="15"||/fotolog/i.test(domain)){var foundUS=false;var ints=behaviors["int"]||[];for(var i=0;i<ints.length;i++){if(decodeURIComponent(ints[i]).toLowerCase()=="country:us"||decodeURIComponent(ints[i]).toLowerCase()=="country:ca"){foundUS=true}}if(!foundUS){return}}bcpinternal()}function bcpinternal(){(loaded)?firebcp():dobcp=true}function bcpdpv(){var pvbak=window[ns].pvdone;window[ns].pvdone=true;bcpd();window[ns].pvdone=pvbak}function bcpd(cb){var url=appendAll(baseURL(false));pixel(url,cb)}function bcpw(){var len=arguments.length;if(len>0){for(var i=0;i<len;i+=2){if(i+1<len){add(arguments[i],arguments[i+1])}}}bcpd()}function pixel(url,cb){var pi=new Image();pi.onload=img_done;pi.onerror=img_done;pi.onabort=img_done;bcpd_callback=cb;reset(url);pi.src=url}function img_done(url){if(bcpd_callback)bcpd_callback()}function reset(url){behaviors={};if(typeof(lotbcp)!="undefined")lotbcp="";if(typeof(lotact)!="undefined")lotact="";if(typeof(lotint)!="undefined")lotint="";if(typeof(lotmed)!="undefined")lotmed="";if(url&&url.indexOf(pv)>0){window[ns].pvdone=true}}function firebcp(){ addTrigger({act: ["Click on Facebook Link"], location: "([a-zA-Z0-9_+%-]+)", element: "{{a[href*=facebook]}}", event: "click", opr: 7648}); addTrigger({act: ["Click on Youtube Link"], location: "([a-zA-Z0-9_+%-]+)", element: "{{a[href*=youtube]}}", event: "click", opr: 12263});bindTriggers();;var url=appendAll(baseURL(true));if(typeof(lotbcp)!="undefined")url=append(url,lotbcp,"b");if(typeof(lotact)!="undefined")url=append(url,lotact,"act");if(typeof(lotint)!="undefined")url=append(url,lotint,"int");if(typeof(lotmed)!="undefined")url=append(url,lotmed,"med");try{var tempIFrame=document.createElement('iframe');tempIFrame.setAttribute('id','LOTCCFrame'+new Date());url=append(url,"ifr","rt");tempIFrame.setAttribute('src',url.replace(/'/g,"%27"));tempIFrame.style.border='0px';tempIFrame.style.width='0px';tempIFrame.style.height='0px';tempIFrame.style.display='block';document.body.appendChild(tempIFrame)}catch(exception){var pixel=new Image(1,1);pixel.src=url.replace(/'/g,"%27")}reset(url)}function doneload(){if(dobcp){firebcp();dobcp=false}loaded=true}function loadAsync(){if(async_props.async){try{with(async_props){for(type in asyncBehaviors){for(var i=0,b;b=asyncBehaviors[type][i++];){add(type,b)}}for(var i=0,id;id=asyncOpportunityIds[i++];){addOpportunityId(asyncOpportunityIds[id])}for(var i=0,tag;tag=asyncOpportunities[i++];){addOpportunity(asyncOpportunities[tag])}}bcp()}catch(e){console.log(e)}}}function parseQuery(query){var params={};if(!query)return params;var pairs=query.split(/[;&]/);for(var i=0;i<pairs.length;i++){var key_val=pairs[i].split('=');if(!key_val||key_val.length!=2)continue;var key=unescape(key_val[0]);var val=unescape(key_val[1]);val=val.replace(/\+/g,' ');(params[key]&&params[key].push)?params[key].push(val):params[key]=[val]}return params}var GTKPR_INCLUDE_INVIEW;var rule_document=document,current_href=window.location.href,reg_selector=/\{\{([^}}]*)\}\}(\.([a-zA-Z0-9\._-]+))?/g,opt_rules=[],hpx_rules=[],pl_rules=[],bustIframe=true,filterSpecial=true,filterQuotes=true,liveEvents=[],addTrigger=addOptimusRule,query=function(){};function addOptimusRule(rule){if(!isValidOptRule(rule))return false;addRule(rule,opt_rules);return true}function addHapaxRule(rule){if(!isValidHpxRule(rule))return false;addRule(rule,hpx_rules);return true}function addPlacementRule(rule){if(!isValidPlRule(rule))return false;addRule(rule,pl_rules);return true}function addRule(rule,basket){basket.push(rule)}function bindTriggers(){processOptimusRules(opt_rules);processHapaxRules(hpx_rules);processPlacementRules(pl_rules);for(var i=0,arr;arr=addEventRule.elements[i++];){var el=arr[0];var handlers=arr[1];for(var ev in handlers){addEvent(el,ev,(function(h){return function(evt){for(var j=0,callback;callback=h[j++];){callback(evt)}var b_count=0;for(var type in behaviors){b_count++}if(b_count>0)bcpw()}})(handlers[ev]))}}}function processOptimusRules(opt_rules){for(var i=0,opt;opt=opt_rules[i++];){var loc_matches=getLocationMatches(opt.location);if(loc_matches==false)continue;if("element"in opt){var elements=getElements(opt.element);if(elements.length>0){if("event"in opt){for(var j=0;j<elements.length;j++){addEventRule(elements[j],opt.event,(function(rule,matches){return function(){populateBehaviors(rule,matches)}})(opt,loc_matches))}}else{populateBehaviors(opt,loc_matches)}}else{if("event"in opt&&opt.event=='click'){addEventRule(rule_document,'click',(function(rule,matches){return function(ev){els=getElements(rule.element);for(var i=0,el;el=els[i++];){if(el===ev.target)populateBehaviors(rule,matches)}}}(opt,loc_matches)))}}}else{populateBehaviors(opt,loc_matches)}}}function processHapaxRules(hpx_rules){for(var i=0,hpx;hpx=hpx_rules[i++];){var loc_matches=getLocationMatches(hpx.location);if(loc_matches==false)continue;var elements=getElements(hpx.element);if(elements.length>0){for(var j=0,e;e=elements[j++];){addEventRule(e,hpx.event,hpxCallback(hpx))}}else if(hpx.event==='click'){addEventRule(rule_document,'click',(function(rule,matches){return function(ev){els=getElements(rule.element);for(var i=0,el;el=els[i++];){if(el===ev.target)hpxCallback(rule)()}}}(hpx,loc_matches)))}}function hpxCallback(h){return function(){var ugc_behaviors=[];for(var i=0,behavior;behavior=h.ug[i++];){var matched_element=getElements(behavior);ugc_behaviors.push(matched_element[0].value)}var ugc_behavior_string=ugc_behaviors.join(' ');if(ugc_behavior_string!=''){add("ugc",("opr"in h)?formatOptimusBehavior(h.opr,ugc_behavior_string):ugc_behavior_string)}}}}function processPlacementRules(pl_rules){var pl_sent=[];pl_rules.sort(function(a,b){var regex=/^#/;if(regex.test(a.element)&&!regex.test(b.element))return-1;if(!regex.test(a.element)&&regex.test(b.element))return 1;return 0});for(var i=0,pl;pl=pl_rules[i++];){var els=query(pl.element,rule_document);var found=false;if(els.length>0){for(var j=0;j<pl_sent.length;j++){if(compareArray(els,pl_sent[j]))found=true}if(found)continue;for(var k=0;k<els.length;k++){if(pl.placement_id){addOpportunityId(pl.placement_id)}else if(pl.placement){addOpportunity(pl.placement)}}pl_sent.push(els)}}}function compareArray(arr1,arr2){if(arr1.length!=arr2.length)return false;for(var i=0;i<arr1.length;i++){if(arr1[i]!==arr2[i])return false}return true}function formatOptimusBehavior(opr,b){return("#OpR#"+opr+"#"+b)}function getLocationMatches(loc){var currUrl=window.location.href;if(window.top!==window){try{var currUrl=window.top.location.href}catch(err){}}var matches,re;try{re=new RegExp(loc);matches=re.exec(current_href)}catch(e){add("opterr","location-match");matches=null}return(matches!=null)?matches:false}function getElements(el){var domelements;if(!isSelector(el)){el='{{#'+el+'}}'}var expr_els=getElementsBySelector(el);domelements=(expr_els.length>0)?expr_els[0][1]:[];return domelements}function getElementsBySelector(expression){var matches=[],results,expr,selector,property,els;if(!isSelector(expression))return[];try{while((results=reg_selector.exec(expression))!=null){expr=results[0];selector=results[1];property=results[3]||'value';els=query(selector,rule_document);if(els.length>0)matches.push([expr,els,property])}}catch(e){add("opterr","get-elements-by-selector");matches=[]}return matches}function isSelector(expression){var result;try{result=reg_selector.test(expression);reg_selector.lastIndex=0}catch(e){add("opterr","selector-match");result=false}return result}function populateBehaviors(behaviors,loc_matches){for(var bt in behaviors){if(!isArray(behaviors[bt]))continue;for(var i=0,b;b=behaviors[bt][i++];){b=replaceSelectors(b);b=replacePlaceholders(b,loc_matches);if(b!==''){add(bt,("opr"in behaviors)?formatOptimusBehavior(behaviors.opr,b):b);}}}}function replaceSelectors(b){if(!isSelector(b))return b;var matches=getElementsBySelector(b);if(matches.length>0){for(var i=0,m;m=matches[i++];){var el_vals=[],selector=m[0],els=m[1],property=m[2];for(var j=0,el;el=els[j++];){properties=property.split('.');var p=0;while(el[properties[p]]!==undefined){el=el[properties[p]];p++}el_vals.push((p==properties.length)?filterContent(el.toString()):'')}b=b.replace(selector,el_vals.join(','))}if(isSelector(b))b=b.replace(reg_selector,'')}else{b=b.replace(reg_selector,'')}return b}function filterContent(c){if(filterSpecial){c=c.replace(/\<\/?[^>]+\/?\>/gi,'');c=c.replace(/\n|\t|\r/gi,' ');c=c.replace(/\s{2,}/g,' ');}if(filterQuotes)c=c.replace(/\[quote\][\s\S]*\[\/quote\]/gi,'');return c}function replacePlaceholders(b,loc_matches){if(loc_matches.length<2)return b;for(var i=0;i<loc_matches.length;i++){var sub_regex=new RegExp("\\$"+i.toString()+"\\b");b=b.replace(sub_regex,loc_matches[i])}return b}function isValidOptRule(rule){var valid=true;if(!("location"in rule)||((rule.location=='')||(rule.location==null)))valid=false;if(("element"in rule)&&(rule.element==''||rule.element==null))valid=false;if(("event"in rule)&&(!("element"in rule)||(rule.event==''||rule.event==null)))valid=false;return valid}function isValidHpxRule(rule){var valid=true;if(!("location"in rule)||((rule.location=='')||(rule.location==null)))valid=false;if(!("element"in rule)||(rule.element==''||rule.element==null))valid=false;if(!("event"in rule)||(rule.event==''||rule.event==null))valid=false;if(!("ug"in rule)||(rule.ug==''||rule.ug==null))valid=false;return valid}function isValidPlRule(rule){var valid=true;if(!("placement"in rule)&&!("placement_id"in rule))valid=false;if(!("element"in rule)||(rule.element==''||rule.element==null))valid=false;if(("placement"in rule)&&(rule.placement==''||rule.placement==null))valid=false;if(("placement_id"in rule)&&(rule.placement_id==''||rule.placement_id==null))valid=false;return valid}function searchArray(arr,str){if(!isArray(arr))return false;if(!Array.prototype.indexOf){for(var i=0;i<arr.length;i++){if(arr[i]==str)return true}}else{if(arr.indexOf(str)>=0)return true}return false}var addEventRule=function(elm,event,callback){var func=arguments.callee;for(var i=0,arr_elm;arr_elm=func.elements[i++];){if(!isArray(arr_elm))continue;var cached_element=arr_elm[0];var handler_obj=arr_elm[1];if(elm===cached_element){if(!(event in handler_obj))handler_obj[event]=[];handler_obj[event].push(callback);return}}var new_elm=[elm,{}];new_elm[1][event]=[callback];func.elements.push(new_elm)};addEventRule.elements=[];if(bustIframe){(function(){if(window.top!=window){try{if(window.top.location)current_href=window.top.location.href;if(window.top.document)rule_document=window.top.document;}catch(err){current_href=document.referrer}}})()}(function(){var doc=rule_document;var isIE=/(?!.*?opera.*?)msie(?!.*?opera.*?)/i.test(navigator.userAgent);var isWebKit=/webkit/i.test(navigator.userAgent);var cache={};var cacheOn=!isIE&&!isWebKit;var persistCache={};var _uid=0;var reg={trim:/^\s+|\s+$/g,quickTest:/^[^:\[>+~ ,]+$/,typeSelector:/(^[^\[:]+?)(?:\[|\:|$)/,tag:/^(\w+|\*)/,id:/^(\w*|\*)#/,classRE:/^(\w*|\*)\./,attributeName:/(\w+)(?:[!+~*\^$|=])|\w+/,attributeValue:/(?:[!+~*\^$|=]=*)(.+)(?:\])/,pseudoName:/(\:[^\(]+)/,pseudoArgs:/(?:\()(.+)(?:\))/,nthParts:/([+-]?\d)*(n)([+-]\d+)*/i,combinatorTest:/[+>~ ](?![^\(]+\)|[^\[]+\])/,combinator:/\s*[>~]\s*(?![=])|\s*\+\s*(?![0-9)])|\s+/g,recursive:/:(not|has)\((\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*(\s*,\s*(\w+|\*)?([#.](\w|\d)+)*(\:(\w|-)+(\([^\)]+\))?|\[[^\}]+\])*)*\)/gi};var arrayIt=function(a){if(!!(window.attachEvent&&!window.opera)){return function(a){if(a instanceof Array)return a;for(var i=0,result=[],m;m=a[i++];)result[result.length]=m;return result}}else{return function(a){return Array.prototype.slice.call(a)}}}();function filter(a,tag){var r=[],uids={};if(tag)tag=new RegExp("^"+tag+"$","i");for(var i=0,ae;ae=a[i++];){ae.uid=ae.uid||_uid++;if(!uids[ae.uid]&&(!tag||ae.nodeName.search(tag)!==-1)){r[r.length]=uids[ae.uid]=ae}}return r}function getAttribute(e,a){if(!e)return null;if(a==="class"||a==="className")return e.className;if(a==="for")return e.htmlFor;return e.getAttribute(a)||e[a]}function getByClass(selector,selectorRE,root,includeRoot,cacheKey,tag,flat){var result=[];if(!!flat){return selectorRE.test(root.className)?[root]:[]}if(root.getElementsByClassName){result=arrayIt(root.getElementsByClassName(selector));if(!!includeRoot){if(selectorRE.test(root.className))result[result.length]=root}if(tag!="*")result=filter(result,tag);cache[cacheKey]=result.slice(0);return result}else if(doc.getElementsByClassName){result=arrayIt(doc.getElementsByClassName(selector));if(tag!="*")result=filter(result,tag);cache[cacheKey]=result.slice(0);return result}var es=(tag=="*"&&root.all)?root.all:root.getElementsByTagName(tag);if(!!includeRoot)es[es.length]=root;for(var index=0,e;e=es[index++];){if(selectorRE.test(e.className)){result[result.length]=e}}return result}function getById(selector,root,includeRoot,cacheKey,tag,flat){var rs,result=[];if(!!flat){return getAttribute(root,"id")===selector?[root]:[]}if(root.getElementById){rs=root.getElementById(selector)}else{rs=doc.getElementById(selector)}if(rs&&getAttribute(rs,"id")===selector){result[result.length]=rs;cache[cacheKey]=result.slice(0);return result}var es=root.getElementsByTagName(tag);if(!!includeRoot)es[es.length]=root;for(var index=0,e;e=es[index++];){if(getAttribute(e,"id")===selector){result[result.length]=e;break}}return result}function getContextFromSequenceSelector(selector,roots,includeRoot,flat){var context,tag,contextType="",result=[],tResult=[],root,rootCount,rootsLength;reg.id.lastIndex=reg.typeSelector.lastIndex=reg.classRE.lastIndex=0;if(!reg.tag.test(selector))selector="*"+selector;context=reg.typeSelector.exec(selector)[1];roots=roots instanceof Array?roots.slice(0):[roots];rootsLength=roots.length;rootCount=rootsLength-1;if(reg.id.test(context)){contextType="id";tag=(tag=context.match(/^\w+/))?tag[0]:"*";context=context.replace(reg.id,"")}else if(reg.classRE.test(context)){contextType="class";tag=(tag=context.match(reg.tag))?tag[0]:"*";context=context.replace(reg.tag,"");contextRE=persistCache[context+"RegExp"]||(persistCache[context+"RegExp"]=new RegExp("(?:^|\\s)"+context.replace(/\./g,"\\s*")+"(?:\\s|$)"));context=context.replace(/\./g," ")}while(rootCount>-1){root=roots[rootCount--];root.uid=root.uid||_uid++;var cacheKey=selector+root.uid;if(cacheOn&&cache[cacheKey]){result=result.concat(cache[cacheKey]);continue}if(contextType==="id"){tResult=getById(context,root,includeRoot,cacheKey,tag,flat)}else if(contextType==="class"){tResult=getByClass(context,contextRE,root,includeRoot,cacheKey,tag,flat)}else{tResult=arrayIt(root.getElementsByTagName(context));if(!!includeRoot&&(root.nodeName.toUpperCase()===context.toUpperCase()||context==="*"))tResult[tResult.length]=root}result=rootsLength>1?result.concat(tResult):tResult;cache[cacheKey]=result.slice(0)}return result}peppy={query:function(selectorGroups,root,includeRoot,recursed,flat){var elements=[];if(!recursed){selectorGroups=selectorGroups.replace(reg.trim,"").replace(/(\[)\s+/g,"$1").replace(/\s+(\])/g,"$1").replace(/(\[[^\] ]+)\s+/g,"$1").replace(/\s+([^ \[]+\])/g,"$1").replace(/(\()\s+/g,"$1").replace(/(\+)([^0-9])/g,"$1 $2").replace(/['"]/g,"").replace(/\(\s*even\s*\)/gi,"(2n)").replace(/\(\s*odd\s*\)/gi,"(2n+1)");}if(typeof root==="string"){root=(root=getContextFromSequenceSelector(root,doc)).length>0?root:undefined}root=root||doc;root.uid=root.uid||_uid++;var cacheKey=selectorGroups+root.uid;if(cacheOn&&cache[cacheKey])return cache[cacheKey];reg.quickTest.lastIndex=0;if(reg.quickTest.test(selectorGroups)){elements=getContextFromSequenceSelector(selectorGroups,root,includeRoot,flat);return(cache[cacheKey]=elements.slice(0))}var groupsWorker,groups,selector,parts=[],part;groupsWorker=selectorGroups.split(/\s*,\s*/g);groups=groupsWorker.length>1?[""]:groupsWorker;for(var gwi=0,tc=0,gi=0,g;groupsWorker.length>1&&(g=groupsWorker[gwi++])!==undefined;){tc+=(((l=g.match(/\(/g))?l.length:0)-((r=g.match(/\)/g))?r.length:0));groups[gi]=groups[gi]||"";groups[gi]+=(groups[gi]===""?g:","+g);if(tc===0)gi++}var gCount=0;while((selector=groups[gCount++])!==undefined){reg.quickTest.lastIndex=0;if(reg.quickTest.test(selector)){result=getContextFromSequenceSelector(selector,root,includeRoot,flat);elements=groups.length>1?elements.concat(result):result;continue}reg.combinatorTest.lastIndex=0;if(reg.combinatorTest.test(selector)){var parts,pLength,pCount=0,combinators,cLength,cCount=0,result;parts=selector.split(reg.combinator);pLength=parts.length;combinators=selector.match(reg.combinator)||[""];cLength=combinators.length;while(pCount<pLength){var c,part1,part2;c=combinators[cCount++].replace(reg.trim,"");part1=result||peppy.query(parts[pCount++],root,includeRoot,true,flat);part2=peppy.query(parts[pCount++],c==""||c==">"?part1:root,c==""||c==">",true,flat);result=peppy.queryCombinator(part1,part2,c)}elements=groups.length>1?elements.concat(result):result;result=undefined}else{result=peppy.querySelector(selector,root,includeRoot,flat);elements=groups.length>1?elements.concat(result):result}}if(groups.length>1)elements=filter(elements);return(cache[cacheKey]=elements.slice(0))},queryCombinator:function(l,r,c){var result=[],uids={},proc={},succ={},fail={},combinatorCheck=peppy.simpleSelector.combinator[c];for(var li=0,le;le=l[li++];){le.uid=le.uid||_uid++;uids[le.uid]=le}for(var ri=0,re;re=r[ri++];){re.uid=re.uid||_uid++;if(!proc[re.uid]&&combinatorCheck(re,uids,fail,succ)){result[result.length]=re}proc[re.uid]=re}return result},querySelector:function(selector,root,includeRoot,flat){var context,passed=[],count,totalCount,e,first=true,localCache={};context=getContextFromSequenceSelector(selector,root,includeRoot,flat);count=context.length;totalCount=count-1;var tests,recursive;if(/:(not|has)/i.test(selector)){recursive=selector.match(reg.recursive);selector=selector.replace(reg.recursive,"")}if(!(tests=selector.match(/:(\w|-)+(\([^\(]+\))*|\[[^\[]+\]/g)))tests=[];if(recursive)tests=tests.concat(recursive);var aTest;while((aTest=tests.pop())!==undefined){var pc=persistCache[aTest],testFuncScope,testFunc,testFuncKey,testFuncArgs=[],isTypeTest=false,isCountTest=false;passed=[];if(pc){testFuncKey=pc[0];testFuncScope=pc[1];testFuncArgs=pc.slice(2);testFunc=testFuncScope[testFuncKey]}else if(!/^:/.test(aTest)){var n=aTest.match(reg.attributeName);var v=aTest.match(reg.attributeValue);testFuncArgs[1]=n[1]||n[0];testFuncArgs[2]=v?v[1]:"";testFuncKey=""+aTest.match(/[~!+*\^$|=]/);testFuncScope=peppy.simpleSelector.attribute;testFunc=testFuncScope[testFuncKey];persistCache[aTest]=[testFuncKey,testFuncScope].concat(testFuncArgs)}else{var pa=aTest.match(reg.pseudoArgs);testFuncArgs[1]=pa?pa[1]:"";testFuncKey=aTest.match(reg.pseudoName)[1];testFuncScope=peppy.simpleSelector.pseudos;if(/nth-(?!.+only)/i.test(aTest)){var a,b,nArg=testFuncArgs[1],nArgPC=persistCache[nArg];if(nArgPC){a=nArgPC[0];b=nArgPC[1]}else{var nParts=nArg.match(reg.nthParts);if(nParts){a=parseInt(nParts[1],10)||0;b=parseInt(nParts[3],10)||0;if(/^\+n|^n/i.test(nArg)){a=1}else if(/^-n/i.test(nArg)){a=-1}testFuncArgs[2]=a;testFuncArgs[3]=b;persistCache[nArg]=[a,b]}}}else if(/^:contains/.test(aTest)){var cArg=testFuncArgs[1];var cArgPC=persistCache[cArg];if(cArgPC){testFuncArgs[1]=cArgPC}else{testFuncArgs[1]=persistCache[cArg]=new RegExp(cArg)}}testFunc=testFuncScope[testFuncKey];persistCache[aTest]=[testFuncKey,testFuncScope].concat(testFuncArgs)}isTypeTest=/:(\w|-)+type/i.test(aTest);isCountTest=/^:(nth[^-]|eq|gt|lt|first|last)/i.test(aTest);if(isCountTest)testFuncArgs[3]=totalCount;var cLength=context.length,cCount=cLength-1;while(cCount>-1){e=context[cCount--];if(first){e.peppyCount=cCount+1}var pass=true;testFuncArgs[0]=e;if(isCountTest)testFuncArgs[2]=e.peppyCount;if(!testFunc.apply(testFuncScope,testFuncArgs)){pass=false}if(pass){passed.push(e)}}context=passed;first=false}return passed},simpleSelector:{attribute:{"null":function(e,a,v){return!!getAttribute(e,a)},"=":function(e,a,v){return getAttribute(e,a)==v},"~":function(e,a,v){return getAttribute(e,a).match(new RegExp('\\b'+v+'\\b'))},"^":function(e,a,v){return getAttribute(e,a).indexOf(v)===0},"$":function(e,a,v){var attr=getAttribute(e,a);return attr.lastIndexOf(v)===attr.length-v.length},"*":function(e,a,v){return getAttribute(e,a).indexOf(v)!=-1},"|":function(e,a,v){return getAttribute(e,a).match('^'+v+'-?(('+v+'-)*('+v+'$))*')},"!":function(e,a,v){return getAttribute(e,a)!==v}},pseudos:{":root":function(e){return e===doc.getElementsByTagName("html")[0]?true:false},":nth-child":function(e,n,a,b,t){if(!e.nodeIndex){var node=e.parentNode.firstChild,count=0,last;for(;node;node=node.nextSibling){if(node.nodeType==1){last=node;node.nodeIndex=++count}}last.IsLastNode=true;if(count==1)last.IsOnlyChild=true}var position=e.nodeIndex;if(n=="first")return position==1;if(n=="last")return!!e.IsLastNode;if(n=="only")return!!e.IsOnlyChild;return(!a&&!b&&position==n)||((a==0?position==b:a>0?position>=b&&(position-b)%a==0:position<=b&&(position+b)%a==0))},":nth-last-child":function(e,n){return this[":nth-child"](e,n,a,b)},":nth-of-type":function(e,n,t){return this[":nth-child"](e,n,a,b,t)},":nth-last-of-type":function(e,n,t){return this[":nth-child"](e,n,a,b,t)},":first-child":function(e){return this[":nth-child"](e,"first")},":last-child":function(e){return this[":nth-child"](e,"last")},":first-of-type":function(e,n,t){return this[":nth-child"](e,"first",null,null,t)},":last-of-type":function(e,n,t){return this[":nth-child"](e,"last",null,null,t)},":only-child":function(e){return this[":nth-child"](e,"only")},":only-of-type":function(e,n,t){return this[":nth-child"](e,"only",null,null,t)},":empty":function(e){for(var node=e.firstChild,count=0;node!==null;node=node.nextSibling){if(node.nodeType===1||node.nodeType===3)return false}return true},":not":function(e,s){return peppy.query(s,e,true,true,true).length===0},":has":function(e,s){return peppy.query(s,e,true,true,true).length>0},":selected":function(e){return e.selected},":hidden":function(e){return e.type==="hidden"||e.style.display==="none"},":visible":function(e){return e.type!=="hidden"&&e.style.display!=="none"},":input":function(e){return e.nodeName.search(/input|select|textarea|button/i)!==-1},":radio":function(e){return e.type==="radio"},":checkbox":function(e){return e.type==="checkbox"},":text":function(e){return e.type==="text"},":header":function(e){return e.nodeName.search(/h\d/i)!==-1},":enabled":function(e){return!e.disabled&&e.type!=="hidden"},":disabled":function(e){return e.disabled},":checked":function(e){return e.checked},":contains":function(e,s){return s.test((e.textContent||e.innerText||""))},":parent":function(e){return!!e.firstChild},":odd":function(e){return this[":nth-child"](e,"2n+2",2,2)},":even":function(e){return this[":nth-child"](e,"2n+1",2,1)},":nth":function(e,s,i){return s==i},":eq":function(e,s,i){return s==i},":gt":function(e,s,i){return i>s},":lt":function(e,s,i){return i<s},":first":function(e,s,i){return i==0},":last":function(e,s,i,end){return i==end}},combinator:{"":function(r,u,f,s){var rUID=r.uid;while((r=r.parentNode)!==null&&!f[r.uid]){if(!!u[r.uid]||!!s[r.uid]){return(s[rUID]=true)}}return(f[rUID]=false)},">":function(r,u,f,s){return r.parentNode&&u[r.parentNode.uid]},"+":function(r,u,f,s){while((r=r.previousSibling)!==null&&!f[r.uid]){if(r.nodeType===1)return r.uid in u}return false},"~":function(r,u,f,s){var rUID=r.uid;while((r=r.previousSibling)!==null&&!f[r.uid]){if(!!u[r.uid]||!!s[r.uid]){return(s[rUID]=true)}}return(f[rUID]=false)}}}};if(doc.querySelectorAll){(function(){var oldpeppy=peppy.query;peppy.query=function(sel,context){context=context||doc;if(context===doc){try{return context.querySelectorAll(sel)}catch(e){}}return oldpeppy.apply(oldpeppy,arrayIt(arguments))}})()}else{var aEvent=doc.addEventListener||doc.attachEvent;function clearCache(){cache={}}aEvent("DOMAttrModified",clearCache,false);aEvent("DOMNodeInserted",clearCache,false);aEvent("DOMNodeRemoved",clearCache,false)}query=function(){try{return peppy.query.apply(peppy,arguments)}catch(e){if(typeof console!='undefined'){console.log("Error processing selector: "+arguments[0])}return[]}}})();;var GTKPR_AUTO_FIRE})();
