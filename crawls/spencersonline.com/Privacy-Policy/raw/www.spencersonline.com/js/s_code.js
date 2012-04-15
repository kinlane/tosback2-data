﻿
/* SiteCatalyst code version: H.9.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
Plugins
*/
/* Specify the Report Suite ID(s) to track here */
var s_account = "spgftspencersonlinecom"
var s = s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* E-commerce Config */
s.currencyCode = "USD"
/* Link Tracking Config */
s.trackDownloadLinks = true
s.trackExternalLinks = true
s.trackInlineStats = true
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters = "javascript:,spencersonline.com"
s.linkLeaveQueryString = false
s.linkTrackVars = "None"
s.linkTrackEvents = "None"

//alert('cookie='+document.cookie); //debug

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    //	alert('getCookie name='+name+'; value='+setStr);
    return (setStr);
}

function set_cookie(name, value, expires) {
    if (!expires) {
        expires = new Date();
    }
    //    alert('set_cookie '+name + "=" + escape(value) + "; expires=" + expires.toGMTString() +  "; path=/")
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}


/* Plugin Config */
s.usePlugins = true
function s_doPlugins(s) {
    /* Add calls to plugins here */
    /* External Campaign Tracking */
    if (!s.campaign) {
        //    alert('1 s.campaign='+s.campaign);
        s.campaign = getCookie('UTM_campaign'); //s.getQueryParam('utm_campaign')
        set_cookie('UTM_campaign');
        //	alert('2 s.campaign='+s.campaign);
        s.campaign = s.getValOnce(s.campaign, 's_campaign', 0)
        //	alert('3 s.campaign='+s.campaign);
    }
    /* Lowercase variables */
    if (s.prop1)
        s.prop1 = s.prop1.toLowerCase()
    if (s.eVar3)
        s.eVar3 = s.eVar3.toLowerCase();

    /* Set search term variables */
    if (s.prop1) {
        s.eVar1 = s.prop1

        /* Set non-search variable */
        if (s.eVar3 && s.eVar3 != 'search')
            s.eVar1 = 'non-search'
    }

}
s.doPlugins = s_doPlugins
/************************** PLUGINS SECTION *************************/
/*
* Plugin: getQueryParam 2.0 - return query string parameter(s)
*/
s.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:''+s.wd.loc"
+ "ation);u=u=='f'?''+s.gtfs().location:u;while(p){i=p.indexOf(',');i="
+ "i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u);if(t)v+=v?d+t:t;p=p.su"
+ "bstring(i==p.length?i:i+1)}return v");
s.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return ''");
/*
* Plugin: getValOnce 0.2 - get a value once per session or number of days
*/
s.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("L", "v", "d", "u", ""
+ "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)L=L?L+d+v:v;return L");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "spencergifts"
s.trackingServer = "metric.spencersonline.com"
s.trackingServerSecure = "metrics.spencersonline.com"
s.dc = 112

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID; function s_c2fe(f) {
    var x = '', s = 0, e, a, b, c; while (1) {
        e =
f.indexOf('"', s); b = f.indexOf('\\', s); c = f.indexOf("\n", s); if (e < 0 || (b >=
0 && b < e)) e = b; if (e < 0 || (c >= 0 && c < e)) e = c; if (e >= 0) {
            x += (e > s ? f.substring(s, e) :
'') + (e == c ? '\\n' : '\\' + f.substring(e, e + 1)); s = e + 1
        } else return x
+ f.substring(s)
    } return f
} function s_c2fa(f) {
    var s = f.indexOf('(') + 1, e =
f.indexOf(')'), a = '', c; while (s >= 0 && s < e) {
        c = f.substring(s, s + 1); if (c == ',')
            a += '","'; else if (("\n\r\t ").indexOf(c) < 0) a += c; s++
    } return a ? '"' + a + '"' :
a
} function s_c2f(cc) {
    cc = '' + cc; var fc = 'var f=new Function(', s =
cc.indexOf(';', cc.indexOf('{')), e = cc.lastIndexOf('}'), o, a, d, q, c, f, h, x
    fc += s_c2fa(cc) + ',"var s=new Object;'; c = cc.substring(s + 1, e); s =
c.indexOf('function'); while (s >= 0) {
        d = 1; q = ''; x = 0; f = c.substring(s); a =
s_c2fa(f); e = o = c.indexOf('{', s); e++; while (d > 0) {
            h = c.substring(e, e + 1); if (
q) { if (h == q && !x) q = ''; if (h == '\\') x = x ? 0 : 1; else x = 0 } else {
                if (h == '"' || h == "'"
) q = h; if (h == '{') d++; if (h == '}') d--
            } if (d > 0) e++
        } c = c.substring(0, s)
+ 'new Function(' + (a ? a + ',' : '') + '"' + s_c2fe(c.substring(o + 1, e)) + '")'
+ c.substring(e + 1); s = c.indexOf('function')
    } fc += s_c2fe(c) + ';return s");'
    eval(fc); return f
} function s_gi(un, pg, ss) {
    var c = "function s_c(un,pg,s"
+ "s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+ "wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+ "d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+ "ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+ "eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+ "ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+ "(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+ "))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o);wh"
+ "ile(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.index"
+ "Of(o,i+n.length)}return x};s.ape=function(x){var s=this,i;x=x?s.rep"
+ "(escape(''+x),'+','%2B'):x;if(x&&s.charSet&&s.em==1&&x.indexOf('%u'"
+ ")<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(('89ABC"
+ "DEFabcdef').indexOf(x.substring(i,i+1))>=0)return x.substring(0,i)+"
+ "'u00'+x.substring(i);i=x.indexOf('%',i)}}return x};s.epa=function(x"
+ "){var s=this;return x?unescape(s.rep(''+x,'+',' ')):x};s.pt=functio"
+ "n(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.l"
+ "ength:y;t=t.substring(0,y);r=s.m(f)?s[f](t,a):f(t,a);if(r)return r;"
+ "z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''"
+ "};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,"
+ "c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)}"
+ ";s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fs"
+ "g!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s."
+ "pt(x,',','fsf',f);return s.fsg};s.c_d='';s.c_gdf=function(t,a){var "
+ "s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this"
+ ",d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.coo"
+ "kieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.last"
+ "IndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--"
+ "}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s"
+ ".c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.ind"
+ "exOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring"
+ "(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=functi"
+ "on(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''"
+ "+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseI"
+ "nt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if"
+ "(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+"
+ "(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+"
+ "d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s"
+ "=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.e"
+ "hl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0)"
+ "{n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:"
+ "o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function("
+ "f,a,t,o,b){var s=this,r;if(s.apv>=5&&(!s.isopera||s.apv>=7))eval('t"
+ "ry{r=s.m(f)?s[f](a):f(a)}catch(e){r=s.m(t)?s[t](e):t(e)}');else{if("
+ "s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s.m(b)?s[b](a):b(a);else{s.eh(s"
+ ".wd,'onerror',0,o);r=s.m(f)?s[f](a):f(a);s.eh(s.wd,'onerror',1)}}re"
+ "turn r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new "
+ "Function('e','var s=s_c_il['+s._in+'];s.eh(window,\"onerror\",1);s."
+ "etfs=1;var c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsf"
+ "b=function(a){return window};s.gtfsf=function(w){var s=this,p=w.par"
+ "ent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.ho"
+ "st){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){v"
+ "ar s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tf"
+ "s,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.ca=function(){var s=t"
+ "his,imn='s_i_'+s.fun;if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7"
+ ")&&(s.ns6<0||s.apv>=6.1)){s.ios=1;if(!s.d.images[imn]&&(!s.isns||(s"
+ ".apv<4||s.apv>=5))){s.d.write('<im'+'g name=\"'+imn+'\" height=1 wi"
+ "dth=1 border=0 alt=\"\">');if(!s.d.images[imn])s.ios=0}}};s.mr=func"
+ "tion(sess,q,ta){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackin"
+ "gServerSecure,ns=s.visitorNamespace,unc=s.rep(s.fun,'_','-'),imn='s"
+ "_i_'+s.fun,im,b,e,rs='http'+(s.ssl?'s':'')+'://'+(t1?(s.ssl&&t2?t2:"
+ "t1):((ns?ns:(s.ssl?'102':unc))+'.'+(s.dc?s.dc:112)+'.2o7.net'))+'/b"
+ "/ss/'+s.un+'/1/H.9-Pdvu-2/'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'"
+ "')+'&[AQE]';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else"
+ " rs=s.fl(rs,2047)}if(s.ios||s.ss){if (!s.ss)s.ca();im=s.wd[imn]?s.w"
+ "d[imn]:s.d.images[imn];if(!im)im=s.wd[imn]=new Image;im.src=rs;if(r"
+ "s.indexOf('&pe=')>=0&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta"
+ "==s.wd.name))){b=e=new Date;while(e.getTime()-b.getTime()<500)e=new"
+ " Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 "
+ "border=0 alt=\"\">'};s.gg=function(v){var s=this;return s.wd['s_'+v"
+ "]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);v"
+ "ar s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;s.pt(v"
+ ",',','glf',0)};s.gv=function(v){var s=this;return s['vpm_'+v]?s['vp"
+ "v_'+v]:(s[v]?s[v]:'')};s.havf=function(t,a){var s=this,b=t.substrin"
+ "g(0,4),x=t.substring(4),n=parseInt(x),k='g_'+t,m='vpm_'+t,q=t,v=s.l"
+ "inkTrackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if(s.lnk||s.eo){v=v?v"
+ "+','+s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]='';if(t=='events'&&e"
+ ")s[k]=s.fs(s[k],e)}s[m]=0;if(t=='visitorID')q='vid';else if(t=='pag"
+ "eURL')q='g';else if(t=='referrer')q='r';else if(t=='vmk')q='vmt';el"
+ "se if(t=='charSet'){q='ce';if(s[k]&&s.em==2)s[k]='UTF-8'}else if(t="
+ "='visitorNamespace')q='ns';else if(t=='cookieDomainPeriods')q='cdp'"
+ ";else if(t=='cookieLifetime')q='cl';else if(t=='variableProvider')q"
+ "='vvp';else if(t=='currencyCode')q='cc';else if(t=='channel')q='ch'"
+ ";else if(t=='campaign')q='v0';else if(s.num(x)) {if(b=='prop')q='c'"
+ "+n;else if(b=='eVar')q='v'+n;else if(b=='hier'){q='h'+n;s[k]=s.fl(s"
+ "[k],255)}}if(s[k]&&t!='linkName'&&t!='linkType')s.qav+='&'+q+'='+s."
+ "ape(s[k]);return ''};s.hav=function(){var s=this;s.qav='';s.pt(s.vl"
+ "_t,',','havf',0);return s.qav};s.lnf=function(t,h){t=t?t.toLowerCas"
+ "e():'';h=h?h.toLowerCase():'';var te=t.indexOf('=');if(t&&te>0&&h.i"
+ "ndexOf(t.substring(te+1))>=0)return t.substring(0,te);return ''};s."
+ "ln=function(h){var s=this,n=s.linkNames;if(n)return s.pt(n,',','lnf"
+ "',h);return ''};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.t"
+ "oLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;i"
+ "f(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s"
+ ".ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';i"
+ "f(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this"
+ ",lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkIn"
+ "ternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();"
+ "if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if("
+ "s.trackExternalLinks&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&("
+ "!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Funct"
+ "ion('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.c"
+ "o(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new"
+ " Function('e','var s=s_c_il['+s._in+'],f;if(s.d&&s.d.all&&s.d.all.c"
+ "ppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;eval(\"try{"
+ "if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}"
+ "catch(f){}\");s.eo=0');s.ot=function(o){var a=o.type,b=o.tagName;re"
+ "turn (a&&a.toUpperCase?a:b&&b.toUpperCase?b:o.href?'A':'').toUpperC"
+ "ase()};s.oid=function(o){var s=this,t=s.ot(o),p=o.protocol,c=o.oncl"
+ "ick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||"
+ "p.toLowerCase().indexOf('javascript')<0))n=o.href;else if(c){n=s.re"
+ "p(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ',''"
+ ");x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o.value;x=3}els"
+ "e if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x"
+ "}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),"
+ "u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf(','+un+',')>"
+ "=0?s.epa(t.substring(e+1)):''};s.rq=function(un){var s=this,c=un.in"
+ "dexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);"
+ "return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.inde"
+ "xOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt("
+ "t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s="
+ "this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s"
+ ".c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,"
+ "'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)s.sqq[s.squ"
+ "[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&s.sqq[x]&&(x="
+ "=q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,"
+ "0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s"
+ ".wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length"
+ ";i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexO"
+ "f(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)"
+ "s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;"
+ "if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)"
+ "s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s"
+ ".b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s"
+ ".wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitor"
+ "SamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y="
+ "e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if("
+ "!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf"
+ "=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf="
+ "function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var "
+ "n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))ret"
+ "urn n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelec"
+ "tion,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un.toLowe"
+ "rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+"
+ "m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)"
+ "s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa"
+ "=function(un){s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').in"
+ "dexOf(un)<0)s.oun+=','+un;s.uns()};s.t=function(){var s=this,trk=1,"
+ "tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000"
+ "000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+"
+ "sed,yr=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(yr<1900?"
+ "yr+1900:yr)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds"
+ "()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tfs=s.gtfs(),ta='',q="
+ "'',qs='';s.uns();if(!s.q){var tl=tfs.location,x='',c='',v='',p='',b"
+ "w='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn="
+ "0,ps;if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isop"
+ "era){if(s.apv>=3){j='1.1';v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){"
+ "j='1.2';c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight;"
+ "if(s.apv>=4.06)j='1.3'}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>="
+ "4){v=s.n.javaEnabled()?'Y':'N';j='1.2';c=screen.colorDepth;if(s.apv"
+ ">=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offs"
+ "etHeight;j='1.3';if(!s.ismac&&s.b){s.b.addBehavior('#default#homePa"
+ "ge');hp=s.b.isHomePage(tl)?\"Y\":\"N\";s.b.addBehavior('#default#cl"
+ "ientCaps');ct=s.b.connectionType}}}else r=''}if(s.pl)while(pn<s.pl."
+ "length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+"
+ "=ps;pn++}s.q=(x?'&s='+s.ape(x):'')+(c?'&c='+s.ape(c):'')+(j?'&j='+j"
+ ":'')+(v?'&v='+v:'')+(k?'&k='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:"
+ "'')+(ct?'&ct='+s.ape(ct):'')+(hp?'&hp='+hp:'')+(p?'&p='+s.ape(p):''"
+ ")}if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document"
+ ".referrer;if(!s.pageURL)s.pageURL=s.fl(l?l:'',255);if(!s.referrer)s"
+ ".referrer=s.fl(r?r:'',255);if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if"
+ "(!o)return '';var p=s.gv('pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s"
+ "_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parent"
+ "Element?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s."
+ "oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_g"
+ "s(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return"
+ " ''}ta=n?o.target:1;h=o.href?o.href:'';i=h.indexOf('?');h=s.linkLea"
+ "veQueryString||i<0?h:h.substring(0,i);l=s.linkName?s.linkName:s.ln("
+ "h);t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&"
+ "pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?"
+ "'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p=s."
+ "gv('pageURL');w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n="
+ "s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+("
+ "w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+ "'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';if(s.p_r)s.p_r()"
+ ";var code='';if(trk&&s.vs(sed))code=s.mr(sess,(vt?'&t='+s.ape(vt):'"
+ "')+s.hav()+q+(qs?qs:s.rq(s.un)),ta);s.sq(trk?'':qs);s.lnk=s.eo=s.li"
+ "nkName=s.linkType=s.wd.s_objectID=s.ppu='';return code};s.tl=functi"
+ "on(o,t,n){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t()}"
+ ";s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s"
+ ".d=document;s.b=s.d.body;s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u."
+ "indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
+ "exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o"
+ ">0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=("
+ "apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac"
+ "')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s."
+ "apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}el"
+ "se if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv="
+ "parseFloat(v);s.em=0;if(String.fromCharCode){i=escape(String.fromCh"
+ "arCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s"
+ ".sa(un);s.vl_l='visitorID,vmk,ppu,charSet,visitorNamespace,cookieDo"
+ "mainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode,p"
+ "urchaseID';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType"
+ ",campaign,state,zip,events,products,linkName,linkType';for(var n=1;"
+ "n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n;s.vl_g=s.vl_t+',trac"
+ "kDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQuerySt"
+ "ring,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,"
+ "linkNames';if(pg)s.gl(s.vl_g);s.ss=ss;if(!ss){s.wds();s.ca()}}",
l = window.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf(
'MSIE '), m = u.indexOf('Netscape6/'), a, i, s; if (l) for (i = 0; i < l.length; i++) {
        s = l[i]; if (s.oun == un) return s; else if (s.fs(s.oun, un)) {
            s.sa(un); return s
        } 
    } if (e > 0) { a = parseInt(i = v.substring(e + 5)); if (a > 3) a = parseFloat(i) }
    else if (m > 0) a = parseFloat(u.substring(m + 10)); else a = parseFloat(v); if (a
>= 5 && v.indexOf('Opera') < 0 && u.indexOf('Opera') < 0) {
        eval(c); return new 
s_c(un, pg, ss)
    } else s = s_c2f(c); return s(un, pg, ss)
}

