/* OnlineOpinion (F3cS v3.1) */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
var custom_var,O_tmoff=360000,_sp='%3A\\/\\/',_rp='%3A//',_poE=0.0, _poX=0.0,_fb=0,_xs,_ys,_sticky=0,_sticky_x=0,_sticky_y=0,_top=0,_stop=0,_sH=screen.height,_d=document,_w=window,_ua=navigator.userAgent.toLowerCase(),_uav=0,_ht=escape(_w.location.href),_hr=_d.referrer,_tm=(new Date()).getTime(),_kp=0,_sW=screen.width,_vS='visible',_vH='hidden',_hdn=0,_rz=0,O_pxc,O_pyc,_ofx=-50+_d.all?-10:-65+(_ua.indexOf('safari')>-1?31-24:15+5),_ofy=-70,_alk='<a href=\'javascript:{_fW(_ht,1);O_LC();_Sh(\"O_c\",0)}\' onMouseOver=\'_Ps(\"O_c\",_Gd(\"O_o\",0)-91-25,_Gd(\"O_o\",1)-39);_Sh(\"O_o\",1);_Sh(\"O_c\",0)\' onMouseOut=\'_Sh(\"O_c\",0);_Sh(\"O_o\",1);return 1\'>';_w.onresize=O_Rz;
function O_Rz(){O_Move(1)};
function _fC(_u){_aT=_sp+',\\/,\\.,-,_,'+_rp+',%2F,%2E,%2D,%5F';_aA=_aT.split(',');for(i=0;i<5;i++){eval('_u=_u.replace(/'+_aA[i]+'/g,_aA[i+5])')}return _u};
function O_LC(){_w.open('https://secure.opinionlab.com/ccc01/comment_card.asp?time1='+_tm+'&time2='+(new Date()).getTime()+'&prev='+_fC(escape(_hr))+'&referer='+_fC(_ht)+'&height='+_sH+'&width='+_sW+'&custom_var='+custom_var,'comments','width=535,height=192,screenX='+((_sW-535)/2)+',screenY='+((_sH-192)/2)+',top='+((_sH-192)/2)+',left='+((_sW-535)/2)+',resizable=yes,copyhistory=yes,scrollbars=no')};
function _fPe(){if(Math.random()>=1.0-_poE && _fR(_MD4(_ht))==''){_fW(_ht,1);O_LC();_poX=0.0}};
function _fPx(){if(Math.random()>=1.0-_poX && _fR(_MD4(_ht))==''){_fW(_ht,1);O_LC()}};window.onunload=_fPx;
function _Pd(i){return _d.getElementById?_d.getElementById(i):(_d.all?_d.all[i]:(_d.layers?_d.layers[i]:null))};if(_d.all){_b=_d.body;strict=false;var _td=document.doctype;strict=(document.compatMode=='CSS1Compat');strict=(_td&&_td.systemId?(_td.systemId.indexOf('strict')>-1?true:(_td.publicId.indexOf('transitional')>-1?true:false)):(_td&&_td.publicId.indexOf('transitional')==-1?true:strict));strict=(_td&&_td.name.indexOf('.dtd')>-1)?true:strict;if(strict)_b=_d.documentElement};
function _Gd(i,s){g=_Pd(i);if(g){if(s){return g.offsetTop}else{return g.offsetLeft+(_uav<1?1:0)+(_uav<=1.4?10:0)+(_uav==1.4?-1:0)}}};
function _Sh(i,s){g=_Pd(i);if(g){i=s?(_hdn?_vH:_vS):_vH;_d.getElementById?(g.style.visibility=i):(_d.all?g.style.display=i:(_d.layers?g.visibility=i:null))}};
function _Ps(i,x,y){var g=_Pd(i);if(g){_d.getElementById?(g.style.left=x+'px')&&(g.style.top=y+'px'):(_d.all?(g.style.left=x)&&(g.style.top=y):(_d.layers?(g.left=x)&&(g.top=y):null))}};
function O_PosW(O_fst,O_ly){ly_w=0;if(!_d.all){return (_sticky&&_sticky_x!=-1?_sticky_x:(_w.innerWidth+self.pageXOffset))+O_fst-ly_w}else{return (_sticky&&_sticky_x!=-1?_sticky_x:(_b.clientWidth+_b.scrollLeft))+O_fst}};
function O_PosH(O_fst,O_ly){ly_h=0;if(!_d.all){return (_sticky&&_sticky_y!=-1?_sticky_y:(_w.innerHeight+self.pageYOffset))+O_fst-ly_h}else{return (_sticky&&_sticky_y!=-1?_sticky_y:(_b.clientHeight+_b.scrollTop))+O_fst}};
function O_Moved(){if(_d.all){O_rc=((_b.scrollLeft!=O_pxc)||(_b.scrollTop!=O_pyc));O_pxc=_b.scrollLeft;O_pyc=_b.scrollTop;return O_rc}else{O_rc=((self.pageXOffset!=O_pxc)||(self.pageYOffset!=O_pyc));O_pxc=self.pageXOffset;O_pyc=self.pageYOffset;return O_rc}};
function O_Move(O_fr){if(O_Moved()||O_fr){_Ps('O_o', O_PosW((_fb?-10+_ofx+25:_ofx),_d.O_o),O_PosH(_ofy, _d.O_o));}otimerID=setTimeout('O_Move(0)',100)};
function O_GoC(_p){if(_ua.indexOf('gecko')){_uav=parseFloat(_ua.substr(_ua.indexOf('; rv:')+5,_ua.indexOf(') gecko/')-_ua.indexOf('; rv:')+5))};if((navigator.userAgent.indexOf('Opera 6')!=-1)||(navigator.userAgent.indexOf('Opera/6')!=-1)||(navigator.appVersion.indexOf('MSIE 4.')!=-1)||document.layers||(_ua.indexOf("mac_powerpc")>-1&&_ua.indexOf("msie")>-1))return;_xs=_top?91:(_fb?91+25:219);_ys=_top?0:39;if(!_d.layers){if(_fR(_MD4(escape(_w.location.href)))==''){_d.write('<div id=\'O_o\' style=\'position:absolute;z-index:999;visibility:'+(_hdn?_vH:_vS)+'\' onMouseOver=\'_Ps(\"O_c\",_Gd(\"O_o\",0)-'+_xs+',_Gd(\"O_o\",1)-'+_ys+');if(!_stop){_Sh(\"O_o\",1);_Sh(\"O_c\",0)}\'>'+_p+'</td></tr></table></div>');O_Move(1)}}};var hex_chr='0123456789abcdef',_c=_d.cookie;
function rhex(num){var _s='';for(var j=0;j<=3;j++)_s+=hex_chr.charAt((num>>(j*8+4))&0x0F)+hex_chr.charAt((num>>(j*8))&0x0F);return _s};
function str2blks_MD5(_s){var nblk=((_s.length+8)>>6)+1,blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(var i=0;i<_s.length;i++)blks[i>>2]|=_s.charCodeAt(i)<<((i%4)*8);blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=_s.length*8;return blks};
function _fSa(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)};
function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))};
function cmn(q,a,b,x,s,t){return _fSa(rol(_fSa(_fSa(a,q),_fSa(x,t)),s),b)};
function _fF(a,b,c,d,x,s){return cmn((b&c)|((~b)&d),a,0,x,s,0)};
function _fG(a,b,c,d,x,s){return cmn((b&c)|(b&d)|(c&d),a,0,x,s,1518500249)};
function _fH(a,b,c,d,x,s){return cmn(b^c^d,a,0,x,s,1859775393)};
function _MD4(_s){var x=str2blks_MD5(_s),a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=_fF(a,b,c,d,x[i+0],3);d=_fF(d,a,b,c,x[i+1],7);c=_fF(c,d,a,b,x[i+2],11);b=_fF(b,c,d,a,x[i+3],19);a=_fF(a,b,c,d,x[i+4],3);d=_fF(d,a,b,c,x[i+5],7);c=_fF(c,d,a,b,x[i+6],11);b=_fF(b,c,d,a,x[i+7],19);a=_fF(a,b,c,d,x[i+8],3);d=_fF(d,a,b,c,x[i+9],7);c=_fF(c,d,a,b,x[i+10],11);b=_fF(b,c,d,a,x[i+11],19);a=_fF(a,b,c,d,x[i+12],3);d=_fF(d,a,b,c,x[i+13],7);c=_fF(c,d,a,b,x[i+14],11);b=_fF(b,c,d,a,x[i+15],19);a=_fG(a,b,c,d,x[i+0],3);d=_fG(d,a,b,c,x[i+4],5);c=_fG(c,d,a,b,x[i+8],9);b=_fG(b,c,d,a,x[i+12],13);a=_fG(a,b,c,d,x[i+1],3);d=_fG(d,a,b,c,x[i+5],5);c=_fG(c,d,a,b,x[i+9],9);b=_fG(b,c,d,a,x[i+13],13);a=_fG(a,b,c,d,x[i+2],3);d=_fG(d,a,b,c,x[i+6],5);c=_fG(c,d,a,b,x[i+10],9);b=_fG(b,c,d,a,x[i+14],13);a=_fG(a,b,c,d,x[i+3],3);d=_fG(d,a,b,c,x[i+7],5);c=_fG(c,d,a,b,x[i+11],9);b=_fG(b,c,d,a,x[i+15],13);a=_fH(a,b,c,d,x[i+0],3);d=_fH(d,a,b,c,x[i+8],9);c=_fH(c,d,a,b,x[i+4],11);b=_fH(b,c,d,a,x[i+12],15);a=_fH(a,b,c,d,x[i+2],3);d=_fH(d,a,b,c,x[i+10],9);c=_fH(c,d,a,b,x[i+6],11);b=_fH(b,c,d,a,x[i+14],15);a=_fH(a,b,c,d,x[i+1],3);d=_fH(d,a,b,c,x[i+9],9);c=_fH(c,d,a,b,x[i+5],11);b=_fH(b,c,d,a,x[i+13],15);a=_fH(a,b,c,d,x[i+3],3);d=_fH(d,a,b,c,x[i+11],9);c=_fH(c,d,a,b,x[i+7],11);b=_fH(b,c,d,a,x[i+15],15);a=_fSa(a,olda);b=_fSa(b,oldb);c=_fSa(c,oldc);d=_fSa(d,oldd);}return rhex(a)+rhex(b)+rhex(c)+rhex(d)};
function _fR(n){i=0;while(i<_c.length){j=i+n.length;if(_c.substring(i,j)==n){k=_c.indexOf(';',j);return unescape(_c.substring(j+1,(k==-1)?_c.length:k))}i++}return ''};
function _fW(n,v){_d.cookie='oo_r='+_fR('oo_r').replace(eval('/'+escape(_MD4(n))+'~1:/g'),'')+escape(_MD4(n))+'~'+escape(v)+':;path=/;expires='+(new Date((new Date()).getTime()+O_tmoff)).toGMTString()}

function nga(){
	if((document.all?_b.clientWidth:_w.innerWidth)>1024){_sticky=1;_sticky_x=(document.all?_b.clientWidth:_w.innerWidth)-(document.all?35:15);_sticky_y=-1}else{_sticky=1;_sticky_x=1018-(document.all?45:6);_sticky_y=-1;}
	_sticky_x+=-(_ua.indexOf('safari')>-1?31:0);
	O_Move(1);
}
window.onresize=nga;
nga();

/* OnlineOpinion (F3cS v3.1, en-US) */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */
var O_pth='/onlineopinionF3cS/',O_color='black',O_tmoff=3600000;
_aLg=new Array("en-US","Click here to give us feedback about this page","Comments?","0");
O_lang=_aLg[4];
O_pth+=_aLg[0]+'/';
O_pth+=O_color;
_top=0;
_fb=1;
O_GoC('<table cellspacing="0" cellpadding="0" border="0" id="rateThisPage"><tr><td align="center"><a href="javascript:O_LC()" onMouseOver="_stop=0" onMouseOut="_stop=1;_Sh(\'O_c\',0);_Sh(\'O_o\',1);return 1"><img src="'+O_pth+'_oo.gif" border="0" width="19" height="17" alt="'+_aLg[1]+'" title="'+_aLg[1]+'"></a></td></tr><tr><td align="center"><a href="#" onMouseOver="_stop=1" onMouseOut="_stop=1;_Sh(\'O_c\',0);_Sh(\'O_o\',1);return 1"><img src="'+O_pth+'_fb_'+_aLg[0]+'.gif" border="0"></a></td></tr></table></div><br><div id="O_c" style="position:absolute;top:0px;left:0px;visibility:hidden;z-index:999"><table cellpadding="0" cellspacing="0" border="0" valign="top" align="left" width="138"><tr><td>'+_alk+'<img src="'+O_pth+'_popns_'+_aLg[0]+'.gif" alt="'+_aLg[2]+'" title="'+_aLg[2]+'" border="0" width="115" height="56"></a>'+_alk+'<img src="'+O_pth+'_dot.gif" alt="" title="" width="4" height="17" border="0"><img src="'+O_pth+'_comment.gif" alt="'+_aLg[3]+'" title="'+_aLg[3]+'" border="0" width="19" height="17"></a>');


	var clean_page_name;
	try{
      clean_page_name=escape(s.pageName.replace(/\|/g,'\/').replace(/\s/g,'_'));
	} catch(e) {
      clean_page_name = 'undefined';
	}
	var full_page_name=window.location.href+'/'+clean_page_name;
	_ht=full_page_name.replace(/(\.[a-z]{3}\?)|(\?)|(=&)|(=)|(&)/g,'\/') +'.htm'