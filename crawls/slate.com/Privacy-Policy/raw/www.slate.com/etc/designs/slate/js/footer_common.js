// buzzfeed
var BF_NO_QS = true;
(function( ){
    BF_WIDGET_JS=document.createElement('script'); BF_WIDGET_JS.type="text/javascript";
    BF_WIDGET_SRC="http://ct.buzzfeed.com/wd/UserWidget?u=slate&to=1&or=vb&wid=1&cb=" + (new Date()).getTime();
    jQuery(document).ready(function () {
        setTimeout(function() {document.getElementById('BF_WIDGET_1').appendChild(BF_WIDGET_JS);BF_WIDGET_JS.src=BF_WIDGET_SRC},1);
    });
})();
//MSN Header Handler 
(function(){
	if(document.referrer.indexOf('msn.com') >= 0 && !$.cookie('sl-msn-referrer')){
		$.cookie('sl-msn-referrer', 'true', {path:'/'});
	}
	if($.cookie('sl-msn-referrer')){
		$.getScript('http://az29590.vo.msecnd.net/prod/slate/en-us/enusslimheader', function () {
			$("#divmsn_enusslimheader").html(msn_enusslimheader().markup);
		});
		$('.sl-ssgal').css('display','block');
	}
})();

// twitter loader
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");