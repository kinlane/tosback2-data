                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(!window.__td){window.__MT=100;window.__ti=0;window.__td=[];window.__td.length=window.__MT;window.__noTrace=false;}

if(typeof(vp)=="undefined"){
var vp={};
}

if(typeof(vp.sales)=="undefined"){
vp.sales={};
}


vp.sales.Taxonomy=new(function $vpfn_NgZZdzBHQMz88icnwrk6$Q12$25(){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var me=this;

this.tracked=$();
this.TrackPanelOpen=function $vpfn_cMxQb8ez6s8WctqlSGzk_g16$26(e){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
var toTrack=e.$panel.not(me.tracked);


if(!toTrack||!toTrack.size()){
return;
}

me.tracked=me.tracked.add(toTrack);

var dataVersion=toTrack.attr("data-version-id");
var dataControl=toTrack.attr("data-control-id");

if(dataVersion&&dataControl){
var prefix=dataVersion+"|"+dataControl;
me.TrackElements(toTrack.find("a:visible"),prefix);
}
};

this.TrackElements=function $vpfn_2obEiJ5BTxXbNnxjX9tSaw35$25(elements,prefix){if(!window.__noTrace){__td[__ti]=arguments;__ti=__ti>=__MT?0:__ti+1;}
vp.analytics.Logger.enableHoverTrackingOnElements(1,prefix,elements);
vp.analytics.Logger.enableClickTracking(1,prefix,elements);
};

});