(function(a){if(a){a.searchsuggest={acListTotal:0,acListCurrent:-1,acDelay:300,acURL:null,acFormId:null,acSearchId:null,acAdvSearchId:null,acResultsId:null,acSearchField:null,acResultsDiv:null,fieldDefault:null,suggestionsJson:null,init:function(g,d,f,c,e,b){a.searchsuggest.acFormId="#"+g;a.searchsuggest.acSearchId="#"+d;a.searchsuggest.acResultsId="#"+c;if(b!=null){a.searchsuggest.acAdvSearchId="#"+b}a.searchsuggest.acURL=e;a.searchsuggest.fieldDefault=f;a.util.disableAutoComplete(d);jQuery("body").append('<div id="'+c+'"></div>');a.searchsuggest.acSearchField=jQuery(a.searchsuggest.acSearchId);a.searchsuggest.acResultsDiv=jQuery(a.searchsuggest.acResultsId);a.searchsuggest.repositionResultsDiv();a.searchsuggest.acSearchField.blur(function(){setTimeout("app.searchsuggest.clear()",200)});a.searchsuggest.acSearchField.keyup(function(k){var j=k.keyCode||window.event.keyCode;var h=a.searchsuggest.acSearchField.val();if(a.searchsuggest.updownArrow(j)){return}if(j==13||j==27){a.searchsuggest.clear();return}setTimeout(function(){a.searchsuggest.suggest(h)},a.searchsuggest.acDelay)});a.searchsuggest.acSearchField.focus(function(){var h=a.searchsuggest.acSearchField.val();if(h==a.searchsuggest.fieldDefault){a.searchsuggest.acSearchField.val("")}});jQuery(a.searchsuggest.acFormId).submit(function(){var j=jQuery(a.searchsuggest.acFormId).attr("action");var h=a.searchsuggest.acSearchField.val();var k="";if(a.searchsuggest.acAdvSearchId!=null){var k=jQuery(a.searchsuggest.acAdvSearchId).val()}var l=a.util.appendParamToURL(j,"q",h);if(k.length>0){window.location=a.util.appendParamToURL(l,"cgid",k)}else{window.location=l}return false})},suggest:function(d){var c=a.searchsuggest.acSearchField.val();if(c==""){a.searchsuggest.clear();return}if(d!=c){return}var b=a.util.appendParamToURL(a.searchsuggest.acURL,"q",c);jQuery.getJSON(b,function(f){var e=a.searchsuggest.acListTotal=f.suggestions.length;if(e>0){var h="";for(i=0;i<e;i++){h+='<div class="unselected"><div class="suggestionterm">'+f.suggestions[i].suggestion+"</div></div>"}a.searchsuggest.suggestionsJson=f.suggestions;a.searchsuggest.acResultsDiv.html(h);a.searchsuggest.acResultsDiv.css("display","block");a.searchsuggest.repositionResultsDiv();var g=jQuery(a.searchsuggest.acResultsId+" > div");g.mouseover(function(){g.each(function(){this.className="unselected"});this.className="selected"});g.each(function(j){jQuery(this).click(function(){a.searchsuggest.acSearchField.val(a.searchsuggest.suggestionsJson[j].suggestion);a.searchsuggest.clear();jQuery(a.searchsuggest.acFormId).submit()})})}else{a.searchsuggest.clear()}})},clear:function(){a.searchsuggest.acResultsDiv.html("");a.searchsuggest.acResultsDiv.css("display","none")},repositionResultsDiv:function(){var f=a.searchsuggest.acSearchField.offset();var e=f.top;var c=f.left;var d=a.searchsuggest.acSearchField.height();var b=a.searchsuggest.acSearchField.width();a.searchsuggest.acResultsDiv.addClass("suggestions");a.searchsuggest.acResultsDiv.css("position","absolute");a.searchsuggest.acResultsDiv.css("left",c+1);a.searchsuggest.acResultsDiv.css("top",e+d+3);a.searchsuggest.acResultsDiv.css("width",b*2.5);a.searchsuggest.acResultsDiv.css("z-index","7777")},updownArrow:function(b){if(b==40||b==38){if(b==38){if(a.searchsuggest.acListCurrent==0||a.searchsuggest.acListCurrent==-1){a.searchsuggest.acListCurrent=a.searchsuggest.acListTotal-1}else{a.searchsuggest.acListCurrent--}}else{if(a.searchsuggest.acListCurrent==a.searchsuggest.acListTotal-1){a.searchsuggest.acListCurrent=0}else{a.searchsuggest.acListCurrent++}}a.searchsuggest.acResultsDiv.children().each(function(c){if(c==a.searchsuggest.acListCurrent){a.searchsuggest.acSearchField.val(a.searchsuggest.suggestionsJson[c].suggestion);this.className="selected"}else{this.className="unselected"}});return true}else{a.searchsuggest.acListCurrent=-1;return false}}}}else{alert("app namespace is not loaded yet!")}})(app);