
var _wsodSymbolHover;(function(){var mh=new MouseHover();_wsodSymbolHover=mh;mh.eventManager.add(window,"load",function(){mh.setParent(Element.create("div",{"id":"wsodSymbolHover"},null,document.body));mh.addTarget(Element.parseSelector("a[symbol]"));});mh.initSymbolHover=function(){this.cache={};this.cdr=new CrossDomainRequestor();this.cdr.setGlobalContext("window._wsodSymbolHover")};mh.getShowEvent().addListener(function(type,el){var symbol=el.getAttribute("symbol");if(this.cache[symbol]){this.updateContent(symbol,this.cache[symbol]);return;}
this.clearContent();Element.create("div",{"class":"wsodLoading"},null,this.getContent());this.cdr.abortRequests();this.cdr.load({url:"http://markets.ft.com/markets/data/getSymbolHover.asp",data:{s:symbol,callback:"updateContent"},contentType:"text/javascript"});},mh);mh.updateContent=function(symbol,content){this.cache[symbol]=content;if(this.getCurrentTarget()&&symbol!=this.getCurrentTarget().getAttribute("symbol")){this.getShowEvent().fire(this.getCurrentTarget());return;}
this.getContent().innerHTML=this.cache[symbol];this.size=Element.getSize(this.getContainer());Element.setSize(this.getIframeShim(),this.size.width,this.size.height);var pos=Element.getXY(this.getContainer());this.move({nativeEvent:{clientX:pos.x-this.MARGIN,clientY:pos.y-this.MARGIN}});};mh.initSymbolHover();}());