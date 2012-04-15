(function(l,r,c){var s=l.Sys,e=l.$addHandler,d=l.$removeHandler;var b="javascript:void(0);",p=l.Function.createDelegate,q=s.Browser;var h=s.UI.DomElement,f=s.CultureInfo,a=l.Date,i=s.Net.UrlResolver;l.Type.registerNamespace("CF");var j=CF.ScriptTask=function(u){this.url=u;this.callback=null;this._script=null;this._completed=false};j.prototype={ensureLoaded:function(w){var v=this._completed;this.callback=w;if(!v&&!this._script){var u=this._script=document.createElement("script");u.type="text/javascript";u.src=i?i.resolveUrl(this.url):this.url;document.body.appendChild(u)}return v},notifyComplete:function(){if(!this._completed){this._completed=true;if(this.callback){this.callback()}}}};var o=CF.StandardBehaviorExtScriptTask=new j(s.Net.UrlResolver.resolveStaticsUrl("/scripts/StandardBehaviorsExt-CpyRog.js"));var t=CF.StandardBehavior=function(u){t.initializeBase(this,[u]);this._labelElement=null};t.prototype={initialize:function(){t.callBaseMethod(this,"initialize")},dispose:function(){t.callBaseMethod(this,"dispose")},get_labelText:function(){var u=this._getLabelElement();if(u){return(u.innerText||u.textContent)}return""},set_labelText:function(v){var u=this._getLabelElement();if(u){u.innerHTML=v}},get_visible:function(){return this.get_container().style.display!=="none"},set_visible:function(u){this.get_container().style.display=(u?"":"none")},get_container:function(){return this.get_element().parentNode},resolveUrl:function(u){return i?i.resolveUrl(u):u},_getLabelElement:function(){if(!this._labelElement){var u=this.get_element().id;var v=this.get_container().getElementsByTagName("label");if(v&&v.length>0){for(var w=0;w<v.length;w++){if(v[w].htmlFor===u){this._labelElement=v[w];break}}}}return this._labelElement}};r(t,"CF.StandardBehavior",s.UI.Behavior);var k=CF.RegionTextBoxBehavior=function(u){k.initializeBase(this,[u]);this._listAllLink=null;this._recentSearchesLink=null;this._onKeyDown$=p(this,this._onKeyDown);this._onKeyUp$=p(this,this._onKeyUp);this._onFocus$=p(this,this._onFocus);this._onBlur$=p(this,this._onBlur);this._onChange$=p(this,this._onChange);this._onListAllLinkClick$=p(this,this._onListAllLinkClick);this._showSuggestions$=p(this,this._showSuggestions);this._recentSearches=null;this._onRecentSearchesLinkClick$=null;this._suggestions=null;this._originsOnly=false;this._productType="flights";this._onBlurCallback$=null;this._select$=null;this._regionCodeInput=null;this._text=null;this._pairedRegionTextBox=null;this._tabReorderComponent=null;this._suggestionsClassName=null};k.prototype={initialize:function(){var u=this.get_element();u.setAttribute("autocomplete","off");this._text=u.value;var w=this.get_container().getElementsByTagName("a");if(w&&w.length>0){var v=w[w.length-1],y=s.UI.DomElement.containsCssClass(v,"cf-rtb-recent-searches");if(!y||w.length>1){var x=this._listAllLink=w[0];x.href=b;e(x,"click",this._onListAllLinkClick$)}if(y){var z=this._recentSearchesLink=v;z.href=b;this._onRecentSearchesLinkClick$=p(this,this._onRecentSearchesLinkClick);e(z,"click",this._onRecentSearchesLinkClick$)}}e(u,"keydown",this._onKeyDown$);e(u,"keyup",this._onKeyUp$);e(u,"focus",this._onFocus$);e(u,"blur",this._onBlur$);e(u,"change",this._onChange$);k.callBaseMethod(this,"initialize")},dispose:function(){var u=this.get_element();d(u,"keydown",this._onKeyDown$);d(u,"keyup",this._onKeyUp$);d(u,"focus",this._onFocus$);d(u,"blur",this._onBlur$);d(u,"change",this._onChange$);if(this._listAllLink){d(this._listAllLink,"click",this._onListAllLinkClick$)}if(this._recentSearchesLink){d(this._recentSearchesLink,"click",this._onRecentSearchesLinkClick$)}k.callBaseMethod(this,"dispose")},get_originsOnly:function(){return this._originsOnly},set_originsOnly:function(u){this._originsOnly=u},get_productType:function(){return this._productType},set_productType:function(u){this._productType=u;if(this._suggestions){this._suggestions.set_productType(u)}},get_suggestionsClassName:function(){return this._suggestionsClassName},set_suggestionsClassName:function(u){this._suggestionsClassName=u},get_text:function(){return this.get_element().value},set_text:function(v){var u=this.get_element();this._text=v;if(u.value!=v){u.value=v;this.raisePropertyChanged("text")}},get_regionCode:function(){if(this.get_text()===this._text){return this._getRegionCodeInput().value}return""},set_regionCode:function(v){var u=this._getRegionCodeInput();if(u.value!=v){u.value=v;this.raisePropertyChanged("regionCode")}},get_value:function(){var u=this.get_text();if(u){return{RegionCode:this.get_regionCode(),Text:u}}return null},set_value:function(u){if(u){this.set_regionCode(u.regionCode||u.RegionCode);this.set_text(u.text||u.Text)}else{this.set_regionCode("");this.set_text("")}},get_listAllLink:function(){return this._listAllLink},get_pairedRegionTextBox:function(){return this._tabReorderComponent},set_pairedRegionTextBox:function(u){if(u){if(typeof u=="string"){u=s.UI.Behavior.getBehaviorByName(u,"BookingEngineRegionTextBoxBehavior")}this._pairedRegionTextBox=u;this._tabReorderComponent=new CF.TabReorderComponent();this._tabReorderComponent.addElements([this._pairedRegionTextBox.get_element(),this.get_element()]);this._tabReorderComponent.addElements(this._pairedRegionTextBox.get_element().parentNode.getElementsByTagName("a"));this._tabReorderComponent.addElements(this.get_element().parentNode.getElementsByTagName("a"));this._tabReorderComponent.initialize()}},_getRegionCodeInput:function(){if(!this._regionCodeInput){var v=this.get_element(),w="_RegionCode";var u=this._regionCodeInput=document.getElementById(v.id+w);if(!u){u=this._regionCodeInput=document.createElement("input");u.type="hidden";u.id=v.id+w;u.name=v.name+w;this.get_container().appendChild(u)}}return this._regionCodeInput},_getSelectHandler:function(){if(!this._select$){this._select$=p(this,this._select)}return this._select$},_onKeyDown:function(u){if(this._suggestions){this._suggestions.handleKeyDown(u)}},_onKeyUp:function(u){if(!this.get_regionCode()){this._showSuggestions()}},_onFocus:function(u){this.get_element().select();if(!this.get_regionCode()){this._showSuggestions()}},_onBlur:function(u){if(!this._onBlurCallback$){this._onBlurCallback$=p(this,this._onBlurCallback)}window.setTimeout(this._onBlurCallback$,300)},_onChange:function(u){this.raisePropertyChanged("text")},_onBlurCallback:function(u){if(this._suggestions){this._suggestions.hide()}if(this._recentSearches){this._recentSearches.hide()}},_select:function(u,v){this.set_text(v);this.set_regionCode(u)},_onListAllLinkClick:function(x){var w=(this.get_originsOnly()?"cf_departures":"cf_destinations");var u="/workers/listall.aspx?deponly="+(this.get_originsOnly()?"true":"false")+"&textsize=0&referrer="+escape(window.location.href);if(l.baseUrl){var v='javascript:"<html><s';v+="cript type='text/javascript' src='"+this.resolveUrl(u)+"&json=1'></script></html>\"";u=v}window.open(u,w,"scrollbars=yes,status=yes,menubar=no,toolbar=no,location=no,titlebar=no,width=590,height=588,top=100,left=200");window[(this.get_originsOnly()?"departures":"destinations")+"SelectRegion"]=this._getSelectHandler()},_showSuggestions:function(){if(!o.ensureLoaded(this._showSuggestions$)){return}var u=this._suggestions;if(!u){var v=document.createElement("div");if(this._suggestionsClassName){v.className=this._suggestionsClassName}document.body.appendChild(v);u=this._suggestions=l.$create(CF.SuggestionsBehavior,{refElement:this.get_element(),selectFunc:this._getSelectHandler(),originsOnly:this.get_originsOnly(),productType:this.get_productType()},null,null,v)}u.display(this.get_text())},_onRecentSearchesLinkClick:function(v){if(v){v.preventDefault()}if(!o.ensureLoaded(this._onRecentSearchesLinkClick$)){return}var w=this._recentSearches;if(!w){var u=document.createElement("div");document.body.appendChild(u);w=this._recentSearches=l.$create(CF.RecentSearchesBehavior,{refElement:this._recentSearchesLink,selectFunc:this._getSelectHandler(),clearFunc:p(this,function(){this._recentSearchesLink.style.display="none"})},null,null,u);w.show()}else{w.toggle()}}};r(k,"CF.RegionTextBoxBehavior",t);CF.TabReorderComponent=function(){CF.TabReorderComponent.initializeBase(this);this._elements=[];this._onKeydownHandler=p(this,this._onKeydown)};CF.TabReorderComponent.prototype={initialize:function(){CF.TabReorderComponent.callBaseMethod(this,"initialize");if(this._elements){for(var u=0;u<this._elements.length;u++){e(this._elements[u],"keydown",this._onKeydownHandler)}}},dispose:function(){if(this._elements){for(var u=0;u<this._elements.length;u++){e(this._elements[u],"keydown",this._onKeydownHandler)}}CF.TabReorderComponent.callBaseMethod(this,"dispose")},addElements:function(u){if(u){for(var v=0;v<u.length;v++){if(u[v]){this._elements.push(u[v])}}}},_onKeydown:function(w){if(w.keyCode===s.UI.Key.tab){var u=l.Array.indexOf(this._elements,w.target);if(u>=0){u+=(w.shiftKey?-1:1);while(u>=0&&u<this._elements.length){var v=this._elements[u];if(v.parentNode&&v.tabIndex>=0){try{v.focus();w.preventDefault();break}catch(w){}}u+=(w.shiftKey?-1:1)}}}}};r(CF.TabReorderComponent,"CF.TabReorderComponent",s.Component);var n=CF.DateTextBoxBehavior=function(u){n.initializeBase(this,[u]);this._onFocus$=p(this,this._onFocus);this._onBlur$=p(this,this._onBlur);this._onChange$=p(this,this._onChange);this._calendarLink=null;this._onCalendarLinkClick$=p(this,this._onCalendarLinkClick);this._calendar=null;this._onCalendarPropertyChanged$=null;this._dateFormat=null;this._enableWatermark=true;this._watermarkText=null;this._minValue=null;this._maxValue=null};n.prototype={initialize:function(){var w=this.get_element();e(w,"focus",this._onFocus$);e(w,"blur",this._onBlur$);e(w,"change",this._onChange$);var u=w.parentNode.getElementsByTagName("a");if(u&&u.length===1){var v=this._calendarLink=u[0];e(v,"click",this._onCalendarLinkClick$)}n.callBaseMethod(this,"initialize")},dispose:function(){var u=this.get_element();d(u,"focus",this._onFocus$);d(u,"blur",this._onBlur$);d(u,"change",this._onChange$);if(this._calendarLink){d(this._calendarLink,"click",this._onCalendarLinkClick$)}n.callBaseMethod(this,"dispose")},get_text:function(){return(this._getIsWatermarked()?"":this.get_element().value)},set_text:function(v){var u=this.get_element();if(v||!this.get_enableWatermark()){u.value=v;h.removeCssClass(this.get_element(),"cf-watermark")}else{u.value=this.get_watermarkText();h.addCssClass(this.get_element(),"cf-watermark")}this.raisePropertyChanged("text")},get_value:function(){var x=this.get_text();if(x){var u=x.indexOf(".",0)>-1?".":"/";var w=x.split(u);if(!isNaN(w[2])&&w[2].length==2){x=w[0]+u+w[1]+u+"20"+w[2]}}var v=a.parseLocale(x);return v},set_value:function(u){var v=this.get_value();var x=(u!=null?u.getTime():-1);var w=(v!=null?v.getTime():-1);if(x!==w){this._updateText(u);this.raisePropertyChanged("value")}},get_minValue:function(){return this._minValue},set_minValue:function(u){this._minValue=u},get_maxValue:function(){return this._maxValue},set_maxValue:function(u){this._maxValue=u},get_dateFormat:function(){return this._dateFormat||"d"},set_dateFormat:function(u){this._dateFormat=u},get_enableWatermark:function(){return this._enableWatermark},set_enableWatermark:function(u){this._enableWatermark=u},get_watermarkText:function(){return this._watermarkText||CF.StandardBehaviorsResources.DateTextBoxWatermarkText},set_watermarkText:function(u){this._watermarkText=u},get_container:function(){return this.get_element().parentNode.parentNode},_getIsWatermarked:function(){return h.containsCssClass(this.get_element(),"cf-watermark")},_onCalendarLinkClick:function(y){if(y){y.preventDefault()}if(!o.ensureLoaded(this._onCalendarLinkClick$)){return}var x=this._calendar;var u=(x==null||!x.get_visible());if(!x){var w=document.createElement("div");document.body.appendChild(w);x=this._calendar=l.$create(CF.CalendarBehavior,{refElement:this._calendarLink},null,null,w);this._onCalendarPropertyChanged$=p(this,this._onCalendarPropertyChanged);x.add_propertyChanged(this._onCalendarPropertyChanged$)}if(u){var v=this.get_value();if(v){x.set_value(v)}x.set_minValue(this.get_minValue());x.set_maxValue(this.get_maxValue());x.show()}else{x.hide()}},_updateText:function(u){var v="";if(u){v=a.localeFormat?a.localeFormat(u,this.get_dateFormat()):u.localeFormat(this.get_dateFormat())}this.set_text(v)},_onCalendarPropertyChanged:function(v,u){if(u.get_propertyName()==="value"){this.set_value(v.get_value())}},_onFocus:function(u){if(this._getIsWatermarked()){this.get_element().value="";h.removeCssClass(this.get_element(),"cf-watermark")}},_onBlur:function(u){this._updateText(this.get_value())},_onChange:function(u){this.raisePropertyChanged("value")}};r(n,"CF.DateTextBoxBehavior",t);var m=CF.HoverCssClassBehavior=function(u){m.initializeBase(this,[u]);this._className="cf-hover";this._onMouseOver$=p(this,this._onMouseOver);this._onMouseOut$=p(this,this._onMouseOut)};m.prototype={initialize:function(){e(this.get_element(),"mouseover",this._onMouseOver$);e(this.get_element(),"mouseout",this._onMouseOut$);m.callBaseMethod(this,"initialize")},dispose:function(){d(this.get_element(),"mouseover",this._onMouseOver$);d(this.get_element(),"mouseout",this._onMouseOut$);m.callBaseMethod(this,"dispose")},get_className:function(){return this._className},set_className:function(u){this._className=u},_onMouseOver:function(u){h.addCssClass(this.get_element(),this.get_className())},_onMouseOut:function(u){h.removeCssClass(this.get_element(),this.get_className())}};r(m,"CF.HoverCssClassBehavior",s.UI.Behavior);var g=CF.FormSubmitter=function(){};g.submit=function(v,E,w,D){var y=document.createElement("form"),x=document.body;y.action=w;y.method=E;y.target=D;for(var B in v){var u=v[B];if(typeof(u)!=="function"){var z=document.createElement("input");z.name=B;z.type="hidden";z.value=s.Serialization.JavaScriptSerializer.serialize(u);y.appendChild(z)}}var A=navigator.userAgent.toLowerCase();if(/webkit/.test(A)&&(y.target!=null&&y.target!="")){var C=Math.floor(Math.random()*10000);if(y.action.indexOf("?")>0){y.action=y.action+"&"+C}else{y.action=y.action+"?"+C}}x.appendChild(y);y.submit();x.removeChild(y);y=null}}).apply(window,typeof CF=="object"&&CF.Sys?[CF,CF.Type.registerClass,CF.Type.registerEnum]:[window,function(b,c,a){b.registerClass(c,a)},function(b,c,a){b.registerEnum(c,a)}]);CF.StandardBehaviorsResources={RecentSearchesClearSearchesLinkText:"Clear recent searches",CancelLinkText:"Cancel",PreviousMonthAltText:"Previous Month",DateTextBoxWatermarkText:"mm/dd/yyyy",UILanguageCode:"",RecentSearchesTitleText:"My recent searches",RecentSearchesCloseLinkText:"Close",NextMonthAltText:"Next Month"};