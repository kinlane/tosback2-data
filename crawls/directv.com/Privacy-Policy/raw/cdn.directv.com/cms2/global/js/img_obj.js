var img_cookie=Class.create({global_var:{content_width:980,view_port_thres:998},createCookie:function(c,e,f){if(c=="img_welcome_lbx"){var d=this.readCookie("img_welcome_lbx");if(d!=null){document.cookie=c+"="+e+"; expires=; path=/";e=d+"|"+e}}if(f){var b=new Date();b.setTime(b.getTime()+(f*24*60*60*1000));var a="; expires="+b.toUTCString()}else{var a=""}document.cookie=c+"="+e+a+"; path=/"},readCookie:function(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null},eraseCookie:function(a){this.createCookie(a,"",-1)},getVersion:function(b){var a=this.readCookie("img_welcome_lbx");if(a=="true"||a==null){this.eraseCookie("img_welcome_lbx");return false}return a.indexOf(b)>-1},create_div:function create_div(b,e,d){var a=document.createElement(b);Element.extend(a);if(e!=""){a.writeAttribute("id",e)}if(d!=""){a.writeAttribute("class",d)}return a},get_content_center:function(b,c){var d=this.get_content_left(""),a=d+((this.global_var.content_width-b)/2);return(c!="")?a.toString()+c:a},get_content_left:function(a){var b=((document.viewport.getWidth()-this.global_var.content_width)/2);return(a!="")?b.toString()+a:b}});var img_attr_icon={local:{img_float:0,img_duration:1},init:function(c){var b,a=c.create_div("div","img_attraction","");$("dtv_topnav_sections_nav").appendChild(a);b=c.create_div("div","","close-btn");a.appendChild(b);setTimeout(img_attr_icon.keepfloating,1000);Event.observe(b,"click",img_attr_icon.close_attr)},keepfloating:function(){var b=8;if(img_attr_icon.local.img_float!=0&&!img_attr_icon.isEven(img_attr_icon.img_float)){img_attr_icon.local.img_duration++}var a=(img_attr_icon.isEven(img_attr_icon.local.img_float))?b+img_attr_icon.local.img_float:-b;if(++img_attr_icon.local.img_float<5){new Effect.Move("img_attraction",{x:0,y:a,mode:"relative",duration:img_attr_icon.local.img_duration/10,afterFinish:img_attr_icon.keepfloating})}else{setTimeout(img_attr_icon.close_attr,5000)}},isEven:function(a){a=parseFloat(a);return a%2==0},close_attr:function(){$("img_attraction").fade()}};(function(){var b=new img_cookie(),a=b.readCookie("img_instrd");if(a!=null){b.eraseCookie("img_instrd");window.location=a}Event.observe(window,"load",function(){var c=b.readCookie("img_attraction_icon"),d=($$('#ctl_header .static-breadcrumbs a[href="/entertainment/"]').length>0);if(c==null&&!d&&$$("body")[0].hasClassName("customer")){img_attr_icon.init(b);b.createCookie("img_attraction_icon","at:01;",0.25)}})})();