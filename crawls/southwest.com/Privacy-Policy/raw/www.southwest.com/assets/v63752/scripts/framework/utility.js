if(!String.prototype.startsWith){String.prototype.startsWith=function(a){return !this.indexOf(a)
}
}swa.getNameValuePairValue=function(d,c){var a=null;
if((arguments.length==2)&&(d!="")&&(c!="")){var b=new RegExp(c+"=([\\w|-]+)");
a=d.match(b);
if((a!=null)&&(a.length>1)){a=a[1]
}}return a
};