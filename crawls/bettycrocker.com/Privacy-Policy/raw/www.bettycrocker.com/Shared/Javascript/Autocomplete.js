function getDataSourceType(a){var b=a.id,c=a.getAttribute("DataSource"),h=a.getAttribute("DataValue"),i=a.getAttribute("MethodParameters"),e=a.getAttribute("MinChars"),g=a.getAttribute("ServiceCallExceptionMessages"),f=a.getAttribute("OnClientSelectedIndexChanging"),d=i.split(",");if(a.getAttribute("DataSourceType")=="XML")$(function(){$.ajax({url:c,dataType:"xml",success:function(a){var c=$(h,a).map(function(){return{value:$(this).text()}}).get();$("#"+b).autocomplete({source:c,minLength:e}).data("autocomplete")._renderItem=function(b,a){a.label=a.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+$.ui.autocomplete.escapeRegex(this.term)+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");return $("<li></li>").data("item.autocomplete",a).append($("<a></a>").html(a.label)).appendTo(b)}},error:function(a){ConsoleLog("Error: "+a.statusText)}})});else a.getAttribute("DataSourceType")=="WebService"&&jQuery(function(){jQuery("#"+b).autocomplete({select:function(c,a){jQuery("#"+b).val(a.item.value);eval(f)},source:function(f,m){for(var e={},j=0,h=0;h<d.length;h++){var b=d[h];if(b.match("SearchText")){b=b.replace("SearchText","");e[b]=f.term+"*"}else if(b.match("SearchQuery")){b=b.replace("SearchQuery","");e[b]=f.term}else if(b.match("SearchLimit")){b=b.replace("SearchLimit","");e[b.split(":")[0]]=b.split(":")[1];j=b.split(":")[1]}else if(b.match("SearchTime")){b=b.replace("SearchTime","");e[b]=(new Date).getTime().toString()}else e[b]=d[h]}var k=f.term.toLowerCase(),n=this.element,i=this.element.data("autocompleteCache")||{},l=false;result=[];jQuery.each(i,function(c,b){if(k.indexOf(c)===0&&b.length>0){jQuery.each(b,function(c,a){var b=a.toLowerCase();b.indexOf(k)===0&&result.push(a)});m(jQuery.map(parseAutoCompleteResultsByLimit(result,j,false),function(b){return{label:a(b,f.term),value:b.data}}));l=true;return}});if(l)return;jQuery.ajax({url:c,data:e,dataType:"json",contentType:"application/json; charset=utf-8",dataFilter:function(a){return a},success:function(b){i[k]=b[1];n.data("autocompleteCache",i);m(jQuery.map(parseAutoCompleteResultsByLimit(b,j,true),function(b){return{label:a(b,f.term),value:b.data}}))},error:function(b,e){var a=g.split("|");if(b.status==0)ConsoleLog(a[0]);else if(b.status==404)ConsoleLog(a[1]);else if(b.status==500){var d=/(.*?)<\/title>/.exec(b.responseText),f=d?d[1]:"";ConsoleLog(a[2]+f)}else if(e=="parsererror")ConsoleLog(a[3]);else if(e=="timeout")ConsoleLog(a[4]);else ConsoleLog(a[5]+" "+b.status+" "+b.statusText+" - "+c)}})},minLength:e}).data("autocomplete")._renderItem=function(b,a){return jQuery("<li></li>").data("item.autocomplete",a).append(jQuery("<a></a>").html(a.label)).appendTo(b)};function a(b,c){var a=new RegExp("("+jQuery.ui.autocomplete.escapeRegex(c)+")","ig");return b.value.replace(a,"<strong>$1</strong>")}})}function parseAutoCompleteResultsByLimit(e,c,f){var a;if(f)a=e[1];else a=e;var d=[];if(c==0||c>a.length)c=a.length;for(var b=0;b<c;b++)d[b]={data:[a[b]],value:a[b],result:[a[b]]};return d}function setWaterMarkText(d,b){var a=d.id,c=document.getElementById(a).value;if(c==b||c.length==0)document.getElementById(a).value=b}function removeWaterMarkText(c,b){var a=c.id;if(document.getElementById(a).value==b)document.getElementById(a).value=""}function OnClientSelectedIndexChanging(a){var b=document.getElementById(a).getAttribute("href");eval(b)};