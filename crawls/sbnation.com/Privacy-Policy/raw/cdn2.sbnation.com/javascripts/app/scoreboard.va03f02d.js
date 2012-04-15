BoxScores=Class.create();BoxScores.prototype={initialize:function(b,c,a){this.options=Object.extend({count:10},a||{});this.league=c;this.scoreboard=b;this.container=$(c);this.boxscores=[];this.carousel=new Carousel($("scoreboard_"+c),$$("#"+c+" .game"),[],{duration:1,afterMove:this.bindHoverEvents.bind(this),beforeMove:this.unbindHoverEvents.bind(this),wheel:false});this.selector=$(c+"_scoreselect");this.nextControl=$("next_control");this.prevControl=$("prev_control");this.active=this.container.visible();if(this.active){this.disabled=false}else{this.disabled=true}this.container.immediateDescendants().each(function(d){var f=d.id.sub("game_","");var e={globalId:f,gameBox:d,gameDetails:$("game_details_"+f),updateHash:d.updateHash,dirtyDirtyPosition:true,homeScore:false,awayScore:false};this.boxscores.push(e)}.bind(this));this.bindHoverEvents();this.nextControl.observe("click",this.scroll.bindAsEventListener(this,"next"));this.prevControl.observe("click",this.scroll.bindAsEventListener(this,"prev"));this.selector.observe("click",this.selectorClick.bindAsEventListener(this))},bindHoverEvents:function(){this.boxscores.each(function(a){if(!a.boxScoreHover){a.boxScoreHover=this.boxscoreHover.bindAsEventListener(this,a)}a.gameBox.observe("mouseover",a.boxScoreHover);a.gameDetails.observe("mouseover",a.boxScoreHover);if(!a.boxScoreOut){a.boxScoreOut=this.boxscoreOut.bindAsEventListener(this,a)}a.gameBox.observe("mouseout",a.boxScoreOut);a.gameDetails.observe("mouseout",a.boxScoreOut);if(!a.boxScoreClick){a.boxScoreClick=this.boxscoreClick.bindAsEventListener(this,a)}a.gameBox.observe("click",a.boxScoreClick)}.bind(this))},unbindHoverEvents:function(){this.boxscores.each(function(a){a.gameBox.stopObserving("mouseover",a.boxScoreHover);a.gameDetails.stopObserving("mouseover",a.boxScoreHover);a.gameBox.stopObserving("mouseout",a.boxScoreOut);a.gameDetails.stopObserving("mouseout",a.boxScoreOut);a.gameBox.stopObserving("click",a.boxScoreClick)}.bind(this))},show:function(){this.selector.up("li").addClassName("here");this.carousel.disabled=false;this.disabled=false;this.container.show();this.scroll()},hide:function(){this.container.hide();this.selector.up("li").removeClassName("here");this.carousel.disabled=true;this.active=false;this.scroll()},select:function(){this.scoreboard.boxScores.each(function(a){a.value.hide()}.bind(this));this.active=true;this.show();return true},selectorClick:function(a){this.select();Event.stop(a);return false},updateHashes:function(){var b=this.boxscores.findAll(function(c){return c.updateHash!=null});var a=b.map(function(c){return c.updateHash});return a},updateBoxscorePosition:function(a){a.gPco=Position.cumulativeOffset(a.gameBox);a.gPos=Position.page(a.gameBox);a.gDim=a.gameBox.getDimensions();a.dPos=Position.cumulativeOffset(a.gameDetails);a.dDim=a.gameDetails.getDimensions();a.dirtyDirtyPosition=false;return a},boxscoreHover:function(b,d){this.boxscores.each(function(e){this.hideHover(e)}.bind(this));this.updateBoxscorePosition(d);if(d.gameDetails==null){return(false)}if(!d.gameDetails.visible()){this.boxscoreOut(b,d);d.gameBox.addClassName("boxscore-on");if(this.carousel.current){var c=this.carousel.current._index;var a=this.carousel.slides.indexOf(d.gameBox)}else{var c=0;var a=this.carousel.slides.indexOf(d.gameBox)}if((a-c)>=(this.options.count/2+1)){d.gameDetails.setStyle({left:d.gPos[0]-d.dDim.width+d.gDim.width+"px",top:d.gPco[1]+d.gDim.height+"px"});d.gameDetails.addClassName("game_details_right")}else{d.gameDetails.setStyle({left:d.gPos[0]+"px",top:d.gPco[1]+d.gDim.height+"px"})}d.gameDetails.show()}return true},classifyHandles:function(){var b=this.carousel.current;var a=this.carousel.slides;if(a.length<=this.options.count){this.nextControl.addClassName("disabled");this.prevControl.addClassName("disabled");return}if(!b||b._index==0){this.prevControl.addClassName("disabled")}else{this.prevControl.removeClassName("disabled")}if((b&&b._index>this.options.count-1)&&((a.length-b._index)<this.options.count)){this.nextControl.addClassName("disabled")}else{this.nextControl.removeClassName("disabled")}},scroll:function(f,h){if(this.carousel.disabled||this.disabled){return true}var e=this.options.count;var d=this.carousel.slides;var c=Math.ceil(d.length/e);var g=this.carousel.current;var b=g?g._index:0;var a=Math.ceil((b+1)/e);if(h=="next"){if(a<c){this.moveTo(d[b+e]);a++}}if(h=="prev"){if(a>1){this.moveTo(d[b-e]);a--}}if(a==c){this.nextControl.addClassName("disabled")}else{this.nextControl.removeClassName("disabled")}if(a==1){this.prevControl.addClassName("disabled")}else{this.prevControl.removeClassName("disabled")}if(f){Event.stop(f)}return false},moveTo:function(a){this.boxscores.each(function(b){b.dirtyDirtyPosition=true});this.carousel.moveTo($(a));this.scroll()},hideHover:function(a){if(!a.gameBox.hasClassName("boxscore-on")){return true}a.gameBox.removeClassName("boxscore-on");if(a.gameDetails){a.gameDetails.hide()}a.gameDetails.removeClassName("game_details_right")},boxscoreOut:function(a,b){this.hideHover(b)},boxscoreClick:function(b,c){var a=c.gameDetails.down(".boxscore_event a").readAttribute("href");if(a){window.location=a}},updateGamestate:function(a,c){var b=c.gameBox;if(c.gamestate==null){["in_progress","final","postponed","suspended","cancelled","delayed"].each(function(d){if(b.hasClassName("game_"+d)){c.gamestate=d}})}if(c.gamestate!=a){b.removeClassName("game_"+c.gamestate);b.addClassName("game_"+a);c.gamestate=a}},addUpdate:function(g,f){try{var f=this.boxscores.find(function(e){if(e.globalId.toString()==g.globalId.toString()){return true}else{return false}});f.updateHash=g.updateHash;var c=$(document.createElement("div"));c.update(g.gameBox+" "+g.gameDetails);var a=$(c).childElements().first();var d=$(c).childElements().last();f.update=g;f.gameBox.update(a.innerHTML);f.gameDetails.update(d.innerHTML);this.updateGamestate(g.gamestate,f);if(f.homeScore!=false&&g.homeScore!=null){if(g.homeScore!=f.homeScore){f.gameBox.down(".home_team").addClassName("team_scored");f.gameBox.down(".home_team").down(".score").addClassName("scored")}if(g.awayScore!=f.awayScore&&g.awayScore!=null){f.gameBox.down(".visiting_team").addClassName("team_scored");f.gameBox.down(".visiting_team").down(".score").addClassName("scored")}}f.homeScore=g.homeScore;f.awayScore=g.awayScore}catch(b){}}};Scoreboard=Class.create();Scoreboard.prototype={initialize:function(a,b){this.options=Object.extend({interval:30,leagues:[]},b||{});this.polling=false;this.focused=true;this.boxScores=new Hash();this.container=$(a);this.options.leagues.each(function(c){this.boxScores.set(c,new BoxScores(this,c));if(c=="cfb"||c=="cbk"){this.boxScores.get(c).options.count=7}}.bind(this))},windowFocus:function(a){if(!this.focused){this.focused=true;this.pollServer()}},windowBlur:function(a){this.focused=false},processUpdate:function(a){var b=a.responseText.evalJSON();b.each(function(c){c[1].each(function(d){this.boxScores.get(c[0]).addUpdate(d)}.bind(this))}.bind(this));this.applyHighlights()},applyHighlights:function(){$$(".team_scored").each(function(a){new Effect.Highlight(a,{duration:3});a.removeClassName("team_scored")});setTimeout(function(){$$(".scored").each(function(a){a.removeClassName("scored")})},13000)},updateHashes:function(){return this.boxScores.map(function(a){return a.value.updateHashes()}).flatten()},activeBoxscore:function(){return this.boxScores.detect(function(a){return a.active})},pollServer:function(){if(document.location.search.substring(1).toQueryParams().scoreboard=="false"){return}if(!this.polling){this.polling=true;try{var c={"leagues[]":this.options.leagues,"update_hashes[]":this.updateHashes()};var a=window.location.search.parseQuery();if(a._scoreboard_date){c._scoreboard_date=a._scoreboard_date}new Ajax.Request("/scoreboard",{method:"post",onSuccess:this.processUpdate.bind(this),parameters:c})}catch(b){this.polling=false}this.polling=false}return true},stop:function(){this.poller.stop()},startPolling:function(){this.poller=new PeriodicalExecuter(this.pollServer.bind(this),this.options.interval)}};