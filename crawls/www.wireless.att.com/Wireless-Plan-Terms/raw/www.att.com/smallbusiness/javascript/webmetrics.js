
WebMetrics = {
	DCS: {
		dcsuri: window.location.pathname,
		dcsref: document.referrer
	},
	
	Overlay: {
		DCS: {
			dcsuri: "",
			dcsref: window.location
		},
		
		DCSext: {
			wtNoHit: "0",
			wtSuccessFlag: "1"
		}
	},
	
	DCSext: {
		wtNoHit: "1",
		wtSuccessFlag: "1"
	},
	
	init: function() {
		var wtSuccessFlag = WebMetrics.getMetaTagValue("wtSuccessFlag");
		if(wtSuccessFlag != "")
			WebMetrics.DCSext.wtSuccessFlag = wtSuccessFlag;
		
		$('a').each(function(){
			var href = $(this).attr('href');
			var wtPN = WebMetrics.getMetaTagValue('DCSext.wtPN');
			if(href!=undefined)
			if(href.indexOf("wtPN") != -1 && wtPN != ""){
				wtPN =escape(wtPN);
				$(this).attr('href', href.replace(/wtPN/g,wtPN));
			}
		});
		
		$('a.externalLink',$('div#trayContent')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_TerNav',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'1');
			}
    	});
		
		$('a',$('.SocialMedia')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_SocialMedia',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'2');
			}
    	});
		
		$('a.externalLink',$('.linkFarmContainer')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_GlobalLinks',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'2');
			}
    	});
		
		$('a.externalLink',$('#Support')).click(function(){
    		if(window.WebMetrics){
    			var pageName = WebMetrics.getMetaTagValue('DCSext.wtPN');
    			dcsMultiTrack('DCSext.wtLinkLoc' , pageName+'_GlobalLinks',
						'DCSext.wtLinkName' ,pageName + "_" + $(this).attr('rel'),
						'DCSext.svl' ,'4');
			}
    	});
	},
	
	dispatchReport: function(wtEvent) {
		var wtArgs = "'DCSext.wtEvent', '"+wtEvent+"', ";
		
		for(DCSname in WebMetrics.DCS) {
			if(WebMetrics.DCS[DCSname] != undefined && WebMetrics.DCS[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCS." + DCSname + "', '" + this.DCS[DCSname] + "', "
			}
		}
		
		for(DCSname in WebMetrics.DCSext) {
			if(WebMetrics.DCSext[DCSname] != undefined && WebMetrics.DCSext[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCSext." + DCSname + "', '" + this.DCSext[DCSname] + "', "
			}
		}
		
		execute = "dcsMultiTrack(" + wtArgs.substr(0,wtArgs.length-2) + ")";
		
		window.eval(execute);
		
		//RESET ELIGIBLE VARIABLES FOR NEXT REPORT ON SAME PAGE.
		for(DCSname in WebMetrics.DCSext) {
			if(WebMetrics.DCSext[DCSname] != undefined && WebMetrics.DCSext[DCSname] != "" ) {
				WebMetrics.DCSext[DCSname] = "";
			}
		}
		
		this.defaults();
		
		var timeoutInterval = setTimeout(function() { //EVENTS ARE NOT GENERATING FOR CHECKOUT PAGES SO DELAYING CLICK CONTINUE

			},1000);
	},
	
	//REQUEST PROCESSED PAGE NAME
	getMetaTagValue: function(pName) {
		var rv="";
		var mName="";
		$("meta").each(function(){
			mName = $(this).attr('name');
			if(mName == pName) {
				rv = $(this).attr("content");
			}
		});
		
		return rv.replace(/ /g,'');
	},
	
	//REQUEST UNPROCESSED PAGE NAME
	getPageName: function() {
		var rv="";
		var mName="";
		$("meta").each(function(){
			mName = $(this).attr('name');
			if(mName == 'DCSext.wtPN') {
				rv = $(this).attr("content");
			}
		});
		return rv;
	},
	
	overlayLoadPage: function(pn){
		/*dcsMultiTrack("DCSext.wtPN",pn,"DCSext.wtLinkName",ln,"DCSext.wtLinkLoc",ll);*/
		dcsMultiTrack("DCSext.wtPN",pn);
	},
	
	overlayPageDispatch: function(wtPN) {
		var wtArgs = "'DCSext.wtPN', '"+wtPN+"', ";
		for(DCSname in WebMetrics.Overlay.DCS) {
			if(WebMetrics.Overlay.DCS[DCSname] != undefined && WebMetrics.Overlay.DCS[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCS." + DCSname + "', '" + this.Overlay.DCS[DCSname] + "', "
			}
		}
		
		for(DCSname in WebMetrics.Overlay.DCSext) {
			if(WebMetrics.Overlay.DCSext[DCSname] != undefined && WebMetrics.Overlay.DCSext[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCSext." + DCSname + "', '" + this.Overlay.DCSext[DCSname] + "', "
			}
		}
		
		execute = "dcsMultiTrack(" + wtArgs.substr(0,wtArgs.length-2) + ")";
		
		window.eval(execute);
		
		WebMetrics.Overlay.DCS.dcsuri = "";
		
		//CLEAR ALL SETTING IN CURRENT EVENT AND ADDING DEFAULTS
		for(DCSname in WebMetrics.Overlay.DCSext) {
			if(WebMetrics.Overlay.DCSext[DCSname] != undefined && WebMetrics.Overlay.DCSext[DCSname] != "" ) {
				WebMetrics.Overlay.DCSext[DCSname] = "";
			}
		}
		
		this.Overlay.DCSext.wtNoHit = "0";
		this.Overlay.DCSext.wtSuccessFlag = "1";
	},
	
	overlayEventDispatch: function(wtEvent) {
		var wtArgs = "'DCSext.wtEvent', '"+wtEvent+"', ";
		this.Overlay.DCSext.wtNoHit = "1";
		
		for(DCSname in WebMetrics.Overlay.DCS) {
			if(WebMetrics.Overlay.DCS[DCSname] != undefined && WebMetrics.Overlay.DCS[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCS." + DCSname + "', '" + this.Overlay.DCS[DCSname] + "', "
			}
		}
		
		for(DCSname in WebMetrics.Overlay.DCSext) {
			if(WebMetrics.Overlay.DCSext[DCSname] != undefined && WebMetrics.Overlay.DCSext[DCSname] != "" ) {
				wtArgs  = wtArgs  + "'DCSext." + DCSname + "', '" + this.Overlay.DCSext[DCSname] + "', "
			}
		}
		
		execute = "dcsMultiTrack(" + wtArgs.substr(0,wtArgs.length-2) + ")";
		
		window.eval(execute);
		
		WebMetrics.Overlay.DCS.dcsuri = "";
		
		//CLEAR ALL SETTING IN CURRENT EVENT AND ADDING DEFAULTS
		for(DCSname in WebMetrics.Overlay.DCSext) {
			if(WebMetrics.Overlay.DCSext[DCSname] != undefined && WebMetrics.Overlay.DCSext[DCSname] != "" ) {
				WebMetrics.Overlay.DCSext[DCSname] = "";
			}
		}
		
		this.Overlay.DCSext.wtNoHit = "0";
		this.Overlay.DCSext.wtSuccessFlag = "1";
	},
	defaults: function() {
		this.DCSext.wtNoHit = "1";
		this.DCSext.wtSuccessFlag = "1"
	}
}

$(document).ready(function(){
	WebMetrics.init();
});
