var ttBgColor="#e6ecff";var ttBgImg="";var ttBorderColor="#003399";var ttBorderWidth=1;var ttDelay=500;var ttFontColor="#000066";var ttFontFace="arial,helvetica,sans-serif";var ttFontSize="11px";var ttFontWeight="normal";var ttOffsetX=8;var ttOffsetY=19;var ttPadding=3;var ttShadowColor="";var ttShadowWidth=0;var ttTitleColor="#ffffff";var ttWidth=300;var tt_tags=new Array("a","area","b","big","caption","center","code","dd","div","dl","dt","em","h1","h2","h3","h4","h5","h6","i","img","input","li","map","ol","p","pre","s","small","span","strike","strong","sub","sup","table","td","th","tr","tt","u","var","ul","layer");var tt_obj,tt_objW=0,tt_objH=0,tt_objX=0,tt_objY=0,tt_offX=0,tt_offY=0,xlim=0,ylim=0,tt_above=false,tt_static=false,tt_sticky=false,tt_wait=false,tt_vis=false,tt_dwn=false,tt_u="undefined",tt_inputs=new Array();var tt_db=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body?document.body:null,tt_n=navigator.userAgent.toLowerCase();var tt_op=!!(window.opera&&document.getElementById),tt_op6=tt_op&&!document.defaultView,tt_ie=tt_n.indexOf("msie")!=-1&&document.all&&tt_db&&!tt_op,tt_n4=(document.layers&&typeof document.classes!="undefined"),tt_n6=(!tt_op&&document.defaultView&&typeof document.defaultView.getComputedStyle!="undefined"),tt_w3c=!tt_ie&&!tt_n6&&!tt_op&&document.getElementById;tt_n="";function tt_Int(b){var a;return isNaN(a=parseInt(b))?0:a}function wzReplace(b,a){var d="",c=this,e;while((e=c.indexOf(b))!=-1){d+=c.substring(0,e)+a;c=c.substring(e+b.length)}return d+c}String.prototype.wzReplace=wzReplace;function tt_N4Tags(b,e,a){e=e||document;a=a||new Array();var c=(b=="a")?e.links:e.layers;for(var d=c.length;d--;){a[a.length]=c[d]}for(var d=e.layers.length;d--;){a=tt_N4Tags(b,e.layers[d].document,a)}return a}function tt_GetSelects(){if(!tt_op6&&!tt_ie){return}var b=tt_op6?"input":"select";if(document.all){var a=document.all.tags(b).length;while(a--){tt_inputs[a]=document.all.tags(b)[a]}}else{if(document.getElementsByTagName){var a=document.getElementsByTagName(b).length;while(a--){tt_inputs[a]=document.getElementsByTagName(b)[a]}}}var a=tt_inputs.length;while(a--){tt_inputs[a].x=0;tt_inputs[a].y=0;var c=tt_inputs[a];while(c){tt_inputs[a].x+=c.offsetLeft||0;tt_inputs[a].y+=c.offsetTop||0;c=c.offsetParent}}}function tt_Htm(a,j,k){var q=(typeof a.T_BGCOLOR!=tt_u)?a.T_BGCOLOR:ttBgColor,r=(typeof a.T_BGIMG!=tt_u)?a.T_BGIMG:ttBgImg,b=(typeof a.T_BORDERCOLOR!=tt_u)?a.T_BORDERCOLOR:ttBorderColor,o=(typeof a.T_BORDERWIDTH!=tt_u)?a.T_BORDERWIDTH:ttBorderWidth,h=(typeof a.T_FONTFACE!=tt_u)?a.T_FONTFACE:ttFontFace,i=(typeof a.T_FONTCOLOR!=tt_u)?a.T_FONTCOLOR:ttFontColor,p=(typeof a.T_FONTSIZE!=tt_u)?a.T_FONTSIZE:ttFontSize,n=(typeof a.T_FONTWEIGHT!=tt_u)?a.T_FONTWEIGHT:ttFontWeight,c=(typeof a.T_PADDING!=tt_u)?a.T_PADDING:ttPadding,m=(typeof a.T_SHADOWCOLOR!=tt_u)?a.T_SHADOWCOLOR:(ttShadowColor||0),g=(typeof a.T_SHADOWWIDTH!=tt_u)?a.T_SHADOWWIDTH:(ttShadowWidth||0),d=(typeof a.T_TITLE!=tt_u)?a.T_TITLE:"",l=(typeof a.T_TITLECOLOR!=tt_u)?a.T_TITLECOLOR:ttTitleColor,t=(typeof a.T_WIDTH!=tt_u)?a.T_WIDTH:ttWidth;if(m||g){m=m||"#cccccc";g=g||3}if(tt_n4&&(p=="10px"||p=="11px")){p="12px"}var s='<div id="'+j+'" style="position:absolute;z-index:300000;';s+="left:0px;top:0px;width:"+(t+g)+"px;visibility:"+(tt_n4?"hide":"hidden")+';">';s+='<table border="0" cellpadding="0" cellspacing="0"'+(b?(' bgcolor="'+b+'"'):"")+' width="'+t+'">';if(d){s+='<tr><td style="padding-left:3px;"><font color="'+l+'" face="'+h+'" ';s+='style="color:'+l+";font-family:"+h+";font-size:"+p+';"><b>';s+=d+"</b></font></td></tr>"}s+='<tr><td><table border="0" cellpadding="'+c+'" cellspacing="'+o+'" width="100%">';s+="<tr><td"+(q?(' bgcolor="'+q+'"'):"")+(r?' background="'+r+'"':"");if(tt_n6){s+=' style="padding:'+c+'px;"'}s+='><font color="'+i+'" face="'+h+'"';s+=' style="color:'+i+";font-family:"+h+";font-size:"+p+";font-weight:"+n+';">';if(n=="bold"){s+="<b>"}s+=k;if(n=="bold"){s+="</b>"}s+="</font></td></tr></table></td></tr></table>";if(g){var f=Math.round(g*1.3);if(tt_n4){s+='<layer bgcolor="'+m+'" left="'+t+'" top="'+f+'" width="'+g+'" height="0"></layer>';s+='<layer bgcolor="'+m+'" left="'+f+'" align="bottom" width="'+(t-f)+'" height="'+g+'"></layer>'}else{var e=tt_n6?"-moz-opacity:0.85;":tt_ie?"filter:Alpha(opacity=85);":"";s+='<div id="'+j+'R" style="position:absolute;background:'+m+";left:"+t+"px;top:"+f+"px;width:"+g+"px;height:1px;overflow:hidden;"+e+'"></div>';s+='<div style="position:relative;background:'+m+";left:"+f+"px;top:0px;width:"+(t-f)+"px;height:"+g+"px;overflow:hidden;"+e+'"></div>'}}s+="</div>";return s}function tt_Init(){if(!(tt_op||tt_n4||tt_n6||tt_ie||tt_w3c)){return}var f=tt_n4?'<div style="position:absolute;"></div>':"",e,c,h,b="return escape(";var g=tt_tags.length;while(g--){e=tt_ie?(document.all.tags(tt_tags[g])||1):document.getElementsByTagName?(document.getElementsByTagName(tt_tags[g])||1):(!tt_n4&&tt_tags[g]=="a")?document.links:1;if(tt_n4&&(tt_tags[g]=="a"||tt_tags[g]=="layer")){e=tt_N4Tags(tt_tags[g])}var d=e.length;while(d--){if(typeof(c=e[d]).onmouseover=="function"&&c.onmouseover.toString().indexOf(b)!=-1&&!tt_n6||tt_n6&&(h=c.getAttribute("onmouseover"))&&h.indexOf(b)!=-1){if(h){c.onmouseover=new Function(h)}var a=unescape(c.onmouseover());f+=tt_Htm(c,"tOoLtIp"+g+""+d,a.wzReplace("& ","&"));c.onmouseover=new Function("e",'tt_Show(e,"tOoLtIp'+g+""+d+'",'+(typeof c.T_ABOVE!=tt_u)+","+((typeof c.T_DELAY!=tt_u)?c.T_DELAY:ttDelay)+","+((typeof c.T_FIX!=tt_u)?'"'+c.T_FIX+'"':'""')+","+(typeof c.T_LEFT!=tt_u)+","+((typeof c.T_OFFSETX!=tt_u)?c.T_OFFSETX:ttOffsetX)+","+((typeof c.T_OFFSETY!=tt_u)?c.T_OFFSETY:ttOffsetY)+","+(typeof c.T_STATIC!=tt_u)+","+(typeof c.T_STICKY!=tt_u)+");");c.onmouseout=tt_Hide;if(c.alt){c.alt=""}if(c.title){c.title=""}}}}document.write(f)}function tt_EvX(c){var a=tt_Int(c.pageX||c.clientX||0)+tt_Int(tt_ie?tt_db.scrollLeft:0)+tt_offX;if(a>xlim){a=xlim}var b=tt_Int(window.pageXOffset||(tt_db?tt_db.scrollLeft:0)||0);if(a<b){a=b}return a}function tt_EvY(b){var a=tt_Int(b.pageY||b.clientY||0)+tt_Int(tt_ie?tt_db.scrollTop:0);if(tt_above){a-=(tt_objH+tt_offY-(tt_op?31:15))}else{if(a>ylim||!tt_dwn&&a>ylim-24){a-=(tt_objH+5);tt_dwn=false}else{a+=tt_offY;tt_dwn=true}}return a}function tt_ReleasMov(){if(document.onmousemove==tt_Move){if(document.releaseEvents){document.releaseEvents(Event.MOUSEMOVE)}document.onmousemove=null}}function tt_HideInput(){if(!(tt_ie||tt_op6)||!tt_inputs){return}var b;var a=tt_inputs.length;while(a--){b=tt_inputs[a];if(tt_vis&&tt_objX+tt_objW>b.x&&tt_objX<b.x+b.offsetWidth&&tt_objY+tt_objH>b.y&&tt_objY<b.y+b.offsetHeight){b.style.visibility="hidden"}else{b.style.visibility="visible"}}}function tt_GetDiv(a){return(tt_n4?(document.layers[a]||null):tt_ie?(document.all[a]||null):(document.getElementById(a)||null))}function tt_GetDivW(){return(tt_n4?tt_obj.clip.width:tt_obj.style.pixelWidth?tt_obj.style.pixelWidth:tt_obj.offsetWidth)}function tt_GetDivH(){return(tt_n4?tt_obj.clip.height:tt_obj.style.pixelHeight?tt_obj.style.pixelHeight:tt_obj.offsetHeight)}function tt_SetDivZ(){var a=tt_obj.style||tt_obj;if(window.dd&&dd.z){a.zIndex=Math.max(dd.z+1,a.zIndex)}}function tt_SetDivPos(b,a){var d=tt_obj.style||tt_obj;var c=(tt_op6||tt_n4)?"":"px";d.left=(tt_objX=b)+c;d.top=(tt_objY=a)+c;tt_HideInput()}function tt_ShowDiv(a){if(tt_n4){tt_obj.visibility=a?"show":"hide"}else{tt_obj.style.visibility=a?"visible":"hidden"}tt_vis=a;tt_HideInput()}function tt_Show(i,d,l,e,f,g,k,j,n,c){if(tt_obj){tt_Hide()}var a=document.onmousemove||null;if(window.dd&&(window.DRAG&&a==DRAG||window.RESIZE&&a==RESIZE)){return}var b=document.onmouseup||null;if(a&&b){b(i)}tt_obj=tt_GetDiv(d);if(tt_obj){tt_dwn=!(tt_above=l);tt_static=n;tt_sticky=c;tt_objW=tt_GetDivW();tt_objH=tt_GetDivH();tt_offX=g?-(tt_objW+k):k;tt_offY=j;if(tt_op){tt_offY+=21}if(tt_n4){if(tt_obj.document.layers.length){var m=tt_obj.document.layers[0];m.clip.height=tt_objH-Math.round(m.clip.width*1.3)}}else{var m=tt_GetDiv(d+"R");if(m){var h=tt_objH-tt_Int(m.style.pixelTop||m.style.top||0);if(typeof m.style.pixelHeight!=tt_u){m.style.pixelHeight=h}else{m.style.height=h+"px"}}}tt_GetSelects();xlim=tt_Int((tt_db&&tt_db.clientWidth)?tt_db.clientWidth:window.innerWidth)+tt_Int(window.pageXOffset||(tt_db?tt_db.scrollLeft:0)||0)-tt_objW-(tt_n4?21:0);ylim=tt_Int(window.innerHeight||tt_db.clientHeight)+tt_Int(window.pageYOffset||(tt_db?tt_db.scrollTop:0)||0)-tt_objH-tt_offY;tt_SetDivZ();i=i||window.event;if(f){tt_SetDivPos(tt_Int((f=f.split(","))[0]),tt_Int(f[1]))}else{tt_SetDivPos(tt_EvX(i),tt_EvY(i))}window.tt_rdl=window.setTimeout("if (tt_sticky){tt_ReleasMov();window.tt_upFunc = document.onmouseup || null;if (document.captureEvents) document.captureEvents(Event.MOUSEUP);document.onmouseup = new Function(\"window.setTimeout('tt_Hide();', 10);\");}else if (tt_static) tt_ReleasMov();tt_ShowDiv('true');",e);if(!f){if(document.captureEvents){document.captureEvents(Event.MOUSEMOVE)}document.onmousemove=tt_Move}}}var tt_area=false;function tt_Move(a){if(!tt_obj){return}if(tt_n6||tt_w3c){if(tt_wait){return}tt_wait=true;setTimeout("tt_wait = false;",5)}var b=a||window.event;tt_SetDivPos(tt_EvX(b),tt_EvY(b));if(tt_op6){if(tt_area&&b.target.tagName!="AREA"){tt_Hide()}else{if(b.target.tagName=="AREA"){tt_area=true}}}}function tt_Hide(){if(window.tt_obj){if(window.tt_rdl){window.clearTimeout(tt_rdl)}if(!tt_sticky||tt_sticky&&!tt_vis){tt_ShowDiv(false);tt_SetDivPos(-tt_objW,-tt_objH);tt_obj=null;if(typeof window.tt_upFunc!=tt_u){document.onmouseup=window.tt_upFunc}}tt_sticky=false;if(tt_op6&&tt_area){tt_area=false}tt_ReleasMov();tt_HideInput()}}tt_Init();