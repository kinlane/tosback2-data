//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

Fx.Scroll=new Class({Extends:Fx,options:{offset:{'x':0,'y':0},wheelStops:true},initialize:function(element,options){this.element=this.subject=$(element);this.parent(options);var cancel=this.cancel.bind(this,false);if($type(this.element)!='element')this.element=$(this.element.getDocument().body);var stopper=this.element;if(this.options.wheelStops){this.addEvent('start',function(){stopper.addEvent('mousewheel',cancel);},true);this.addEvent('complete',function(){stopper.removeEvent('mousewheel',cancel);},true);}},set:function(){var now=Array.flatten(arguments);this.element.scrollTo(now[0],now[1]);},compute:function(from,to,delta){var now=[];var x=2;x.times(function(i){now.push(Fx.compute(from[i],to[i],delta));});return now;},start:function(x,y){if(!this.check(arguments.callee,x,y))return this;var offsetSize=this.element.getSize(),scrollSize=this.element.getScrollSize();var scroll=this.element.getScroll(),values={x:x,y:y};for(var z in values){var max=scrollSize[z]-offsetSize[z];if($chk(values[z]))values[z]=($type(values[z])=='number')?values[z].limit(0,max):max;else values[z]=scroll[z];values[z]+=this.options.offset[z];}
return this.parent([scroll.x,scroll.y],[values.x,values.y]);},toTop:function(){return this.start(false,0);},toLeft:function(){return this.start(0,false);},toRight:function(){return this.start('right',false);},toBottom:function(){return this.start(false,'bottom');},toElement:function(el){var position=$(el).getPosition(this.element);return this.start(position.x,position.y);}});var Asset=new Hash({javascript:function(source,properties){properties=$extend({onload:$empty,document:document,check:$lambda(true)},properties);var script=new Element('script',{'src':source,'type':'text/javascript'});var load=properties.onload.bind(script),check=properties.check,doc=properties.document;delete properties.onload;delete properties.check;delete properties.document;script.addEvents({load:load,readystatechange:function(){if(['loaded','complete'].contains(this.readyState))load();}}).setProperties(properties);if(Browser.Engine.webkit419)var checker=(function(){if(!$try(check))return;$clear(checker);load();}).periodical(50);return script.inject(doc.head);},css:function(source,properties){return new Element('link',$merge({'rel':'stylesheet','media':'screen','type':'text/css','href':source},properties)).inject(document.head);},image:function(source,properties){properties=$merge({'onload':$empty,'onabort':$empty,'onerror':$empty},properties);var image=new Image();var element=$(image)||new Element('img');['load','abort','error'].each(function(name){var type='on'+name;var event=properties[type];delete properties[type];image[type]=function(){if(!image)return;if(!element.parentNode){element.width=image.width;element.height=image.height;}
image=image.onload=image.onabort=image.onerror=null;event.delay(1,element,element);element.fireEvent(name,element,1);};});image.src=element.src=source;if(image&&image.complete)image.onload.delay(1);return element.setProperties(properties);},images:function(sources,options){options=$merge({onComplete:$empty,onProgress:$empty},options);if(!sources.push)sources=[sources];var images=[];var counter=0;sources.each(function(source){var img=new Asset.image(source,{'onload':function(){options.onProgress.call(this,counter,sources.indexOf(source));counter++;if(counter==sources.length)options.onComplete();}});images.push(img);});return new Elements(images);}});