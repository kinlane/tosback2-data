//tealium universal tag - utag.loader ut4.0.201205042223, Copyright 2012 Tealium.com Inc. All Rights Reserved. 
var utag_condload=false;

if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"pacsun.main",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      ft: 0,
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\./.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d) {
        utag.DB('WQ:' + utag.loader.wq.length);
        c = true;
        try {
          utag.loader.GET()
        } catch (e) {};
        var lq = [];
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load > 0) {
            if (b.send) {
              c = false;
              utag.send[b.id] = b;
              this.f[b.id] = 0;
            }
            lq.push(b);
          }
        }
        if (c) {
          d = false;
          for (b in utag.loader.GV(utag.send)) d = true;
          if (c && d) this.LOAD('WAIT_FORCE');
        }
        this.wq = [];
        for (a = 0; a < lq.length; a++) {
          utag.DB('utag.loader.WAIT: loading ' + lq[a].id);
          utag.loader.AS(lq[a])
        }
        if(lq.length==0)utag.handler.INIT();
      },
      AS: function(a, b, c, d) {
        utag.sender[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
        }
        if (utag.cfg.v) a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + utag.cfg.v;
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        if (a.load == 2) {
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
        } else {
          if (b.createElement) {
            c = 'utag_pacsun.main_'+a.id;
            if (!b.getElementById(c)) {
              if (a.load == 3) {
                d = b.createElement('iframe');
                d.setAttribute('height', '1');
                d.setAttribute('width', '1');
                d.setAttribute('style', 'display:none');
                d.setAttribute('src', a.src)
              } else {
                d = b.createElement('script');
                d.language = 'javascript';
                d.type = 'text/javascript';
                d.src = a.src
              }
 	      d.id = c;
              b.getElementsByTagName('head')[0].appendChild(d)
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      RD: function(o, a, b, c, d, e, f, g) {
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          if (a[b].name && a[b].name != "") o["meta." + a[b].name.toLowerCase()] = a[b].content.toLowerCase();
        }
        a = location.search.toLowerCase();
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            o["qp." + c[0]] = unescape(c[1])
          }
        }
        a = (new Date()).getTime();
        b = utag.loader.RC();
        c = a + parseInt(utag.cfg.session_timeout);
        d = a + (Math.ceil(Math.random() * 1000000));
        if ((b.utag_main && (typeof b.utag_main._st == "undefined" || (typeof b.utag_main._st != "undefined" && parseInt(b.utag_main._st) < a))) || !b.utag_main) {
          if (b.utag_main) {
            b.utag_main._st = c;
            b.utag_main.ses_id = d;
          } else {
            b.utag_main = {
              _st: c,
              ses_id: d
            }
          }
          utag.loader.SC("utag_main", {
            "_st": c,
            "ses_id": d + ";exp-session"
          });
        } else {
          utag.loader.SC("utag_main", {
            "_st": c
          })
        }
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
        o["dom.referrer"] = eval("document." + "referrer");
        o["dom.title"] = "" + document.title;
        o["dom.domain"] = "" + location.hostname;
        o["dom.query_string"] = "" + (location.search).substring(1);
        o["dom.url"] = "" + document.URL;
        o["dom.pathname"] = "" + location.pathname;
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        for (c = 0; c < b.length; c++) {
          if (b[c].match(/^(.*?)=(.*)$/)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = decodeURIComponent(cv);
          if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
            e = e.split("$");
            g = [];
            j = {};
            for (f = 0; f < e.length; f++) {
              g = e[f].split(":");
              if (g.length > 2) {
                g[1] = g.slice(1).join(":");
              }
              v = "";
              if (("" + g[1]).indexOf("~") == 0) {
                h = g[1].substring(1).split("|");
                for (i = 0; i < h.length; i++) h[i] = decodeURIComponent(h[i]);
                v = h
              } else v = decodeURIComponent(g[1]);
              j[g[0]] = v
            }
            o[ck] = {};
            e = (new Date()).getTime();
            for (f in utag.loader.GV(j)) {
              if (j[f] instanceof Array) {
                n = [];
                for (m = 0; m < j[f].length; m++) {
                  if (j[f][m].match(/^(.*);exp-(.*)$/)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                    if (k > e) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                  }
                }
                j[f] = n.join("|");
              } else {
                j[f] = "" + j[f];
                if (j[f].match(/^(.*);exp-(.*)$/)) {
                  k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                  j[f] = (k < e) ? null : (x == 0 ? j[f] : RegExp.$1);
                }
              }
              if (j[f]) o[ck][f] = j[f];
            }
          } else if (utag.cl[ck] || utag.cl['_all_']) {
            o[ck] = e
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        v = "";
        x = "Thu, 31 Dec 2099 00:00:00 GMT";
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = (new Date()).getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push(g + ":" + encodeURIComponent(d[g]))
          };
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        utag.DB('utag.loader.LOAD:' + a);
        if (this.f[a] == 0) {
          utag.DB('utag.loader.LOAD:add sender-' + a);
          this.f[a] = 1;
          if (utag.loader.wq.length > 0) return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0) return
          };
          utag.DB('CLEAR FORCE');
          clearTimeout(utag.loader.ft);
          utag.DB('utag.handler.INIT');
          utag.handler.INIT()
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if (document.readyState === "complete") setTimeout(c, 1);
          else {
            var RH;
            if (document.addEventListener) {
              RH = function() {
                document.removeEventListener("DOMContentLoaded", RH, false);
                c()
              };
              document.addEventListener("DOMContentLoaded", RH, false);
              window.addEventListener("load", c, false);
            } else if (document.attachEvent) {
              RH = function() {
                if (document.readyState === "complete") {
                  document.detachEvent("onreadystatechange", RH);
                  c()
                }
              }
              document.attachEvent("onreadystatechange", RH);
              window.attachEvent("onload", c);
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      }
    },
    DB: function(a, b) {
      try {
        b = document.cookie;
        if (b.indexOf('utagdb=true') >= 0) console.log(a)
      } catch (e) {}
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]));
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')));
      }
    },
    view: function(a,c) {
      this.handler.trigger('view', a)
      if(c)try{c()}catch(e){}
      return true;
    },
    link: function(a,c) {
      this.handler.trigger('link', a)
      if(c)try{c()}catch(e){}
      return true;
    },
    track: function(a,b,c) {
      this.handler.trigger(a,b)
      if(c)try{c()}catch(e){}
      return true;
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b)
          }
        }
	if(utag.cfg.noview!=true)utag.handler.trigger('view', utag.data);
      },
      test: function() {
        return 1
      },
      trigger: function(a, b, c, d) {
        b = b || {};
        if (!this.iflag) {
          utag.loader.q.push({
            a: a,
            b: b
          });
          return;
        }
        for (c in utag.loader.GV(this.df)) {
          if (typeof this.df[c] != "function" && typeof b[c] == "undefined") b[c] = this.df[c]
        }
        for (c = 0; c < this.extend.length; c++) {
          try {
            this.extend[c](a, b);
            utag.rpt['ex_' + c] = 0
          } catch (e) {
            utag.rpt['ex_' + c] = 1
          }
        };
        for (c in utag.loader.GV(utag.send)) {
          if (typeof utag.sender[c] != "undefined") {
            try {
              utag.sender[c].send(a, utag.handler.C(b));
              utag.rpt['s_' + c] = 0
            } catch (e) {
              utag.rpt['s_' + c] = 1
            };
            utag.rpt.ts['s'] = new Date();
            utag.RP(utag.rpt);
          }
        }
        c = this.base.split(",");
        for (d = 0; d < c.length; d++) {
          if (typeof b[c[d]] != "undefined") this.df[c[d]] = b[c[d]]
        };
	for(d in utag.loader.GV(b)){if(d.indexOf('dom.')==0)this.df[d]=b[d]};
        this.o = b
      },
      C: function(a, b, c, d) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if (typeof a[c] != "function") b[c] = a[c]
        }
        return b
      }
    }
  };
  utag.o['pacsun.main']=utag;
  utag.cfg = {
    v: "ut4.0.201205042223",
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    forcetimeout: 3000,
    domain: utag.loader.lh(),
    path: "//tealium.hs.llnwd.net/o43/utag/pacsun/main/prod/",
    utid: "pacsun/main/201205021846"
  };utag.cond={3:0,2:0};
utag.pre=function(){utag.data=(typeof utag_data!='undefined')?utag_data:{};try{utag.loader.RD(utag.data);try{utag.cond[3]|=(utag.data['dom.pathname'].indexOf('/checkout/receipt.jsp')>-1)}catch(e){};try{utag.cond[2]|=(utag.data['dom.url'].indexOf('http:')==0)||(utag.data['dom.pathname'].indexOf('/checkout/')>-1&&utag.data['dom.pathname'].indexOf('receipt.jsp')<0)}catch(e){};}catch(e){}};
utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){
b.product_brand=[];b.product_id=[];b.product_price=[];b.product_quantity=[];b.product_sku=[];
for(i=0;i<orderItems.length;i++){
    b.product_brand[i]=orderItems[i].brand;
    b.product_id[i]=orderItems[i].mpi;
    b.product_price[i]=orderItems[i].price;
    b.product_quantity[i]=orderItems[i].quantity;
    b.product_sku[i]=orderItems[i].style;
}

b.product_name=[];
var arr=new Object();
arr=document.getElementsByTagName('span');
for(i=0;i<arr.length;i++) {
    if(arr[i].className=="product_name"){
        b.product_name.push(arr[i].innerHTML);
    }
}
},
function(a,b){
var arr=new Object();
arr=document.getElementsByTagName('li');
for(i=0;i<arr.length;i++) {
    if(arr[i].className=="brand" || arr[i].className=="product_name" || arr[i].className=="note item_number"){
        var p=arr[i].parentElement;
        while(p.tagName!="BODY"){
            if(p.id=="itemsTable" && arr[i].className=="brand"){
                b.product_brand.push(arr[i].innerHTML);
                break;
            }else if(p.id=="itemsTable" && arr[i].className=="product_name"){
                b.product_name.push(arr[i].innerHTML);
                break;
            }else if(p.id=="itemsTable" && arr[i].className=="note item_number"){
                b.product_sku.push(arr[i].innerHTML);
                break;
            }else{
                p=p.parentElement;
            }
        }
    }
}

var arr2=new Object();
arr2=document.getElementsByTagName('p');
for(i=0;i<arr2.length;i++) {
    if(arr2[i].className=="price"){
        var p=arr2[i].parentElement;
        while(p.tagName!="BODY"){
            if(p.id=="itemsTable" && arr2[i].className=="price"){
                b.product_price.push(arr2[i].innerHTML);
                break;
            }else{
                p=p.parentElement;
            }
        }
    }
}
},
function(a,b){
if(b['product_id'].length==0){
  try{
    b['product_id'].push(s.products.substring(1,14));
  }
  catch(e){}
}
},
function(a,b,c,d,e,f,g){d=b['dom.pathname'];if(typeof d=='undefined')return;c=[{'Hurley':'Hurley'},{'Rvca':'Rvca'},{'Billabong':'Billabong'},{'Volcom':'Volcom'},{'fox':'Fox'},{'Vans':'Vans'},{'Oneill':'Oneill'},{'modern-amusement':'Modern Amusement'},{'Nike':'Nike'},{'Roxy':'Roxy'},{'Young-and-Reckless':'Young & Reckless'},{'DC-Shoes':'DC Shoes'},{'Quiksilver':'Quiksilver'},{'Element':'Element'},{'Bullhead':'Bullhead'},{'Enjoi':'Enjoi'},{'Insight':'Insight'},{'On-the-byas':'On The Byas'},{'Nollie':'Nollie'},{'Zoo-York':'Zoo York'},{'Matix':'Matix'},{'bullhead-black':'Bullhead Black'},{'Levis':'Levis'},{'Reff':'Reef'},{'Ezekiel':'Ezekiel'},{'Electric':'Electric'},{'Metal-Mulisha':'Metal Mulisha'},{'Nixon':'Nixon'},{'Kirra':'Kirra'},{'With-Love-From-California':'With Love From CA'},{'Sound-~-~-Matter':'Sound & Matter'},{'Ambiguous':'Ambiguous'},{'Black-Poppy':'Black Poppy'},{'Alpinestarts':'Alpinestarts'},{'check-and-stripe':'Check and Stripe'},{'Famous-S':'Famous Stars and Straps'},{'O-Neill':'Oneill'},{'Modern-Amusement':'Modern Amusement'},{'Young-Reckless':'Young & Reckless'},{'On-the-byas':'On The Byas'},{'Bullhead-Black':'Bullhead Black'},{'Levi-s':'Levis'},{'Etnies':'Metal Mulisha'},{'With-Love-From-CA':'With Love From CA'},{'Sound-Matter':'Sound & Matter'},{'Check-and-Stripe':'Check and Stripe'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.indexOf(f)>-1){b['product_brand']=c[e][f];m=true};};if(m)break};if(!m)b['product_brand']='none';},
function(a,b,c,d){
  b._ccustid='';
  b._ctype='';
  b._csubtotal=(typeof b['orderMerchTotal']!='undefined')?b['orderMerchTotal']:'';
  b._ccurrency='';
  b._ccountry='';
  b._ccity='';
  b._czip='';
  b._ctax=(typeof b['orderTax']!='undefined')?b['orderTax']:'';
  b._cstore='';
  b._cship=(typeof b['orderShipping']!='undefined')?b['orderShipping']:'';
  b._corder=(typeof b['orderId']!='undefined')?b['orderId']:'';
  b._cstate='';
  b._ctotal=(typeof b['orderTotal']!='undefined')?b['orderTotal']:'';
  b._cpromo=(typeof b['orderPromoCode']!='undefined')?b['orderPromoCode']:'';
  b._cprod=(typeof b['product_id']!='undefined'&&b['product_id'].length>0)?b['product_id']:[];
  b._cprodname=(typeof b['product_name']!='undefined'&&b['product_name'].length>0)?b['product_name']:[];
  b._cbrand=(typeof b['product_brand']!='undefined'&&b['product_brand'].length>0)?b['product_brand']:[];
  b._ccat=(typeof b['product_category']!='undefined'&&b['product_category'].length>0)?b['product_category']:[];
  b._ccat2=(typeof b['product_subcategory']!='undefined'&&b['product_subcategory'].length>0)?b['product_subcategory']:[];
  b._cquan=(typeof b['product_quantity']!='undefined'&&b['product_quantity'].length>0)?b['product_quantity']:[];
  b._cprice=(typeof b['product_price']!='undefined'&&b['product_price'].length>0)?b['product_price']:[];
  b._csku=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku']:[];
  b._cpdisc=(typeof b['orderDiscountTotal']!='undefined'&&b['orderDiscountTotal'].length>0)?b['orderDiscountTotal']:[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b){b['previous_page_name']=b['cp.utag_main__prevpage'];utag.loader.SC('utag_main',{'_prevpage':b['s.pageName']+';exp-1h'})}];
  utag.loader.cfg={"1":{load:utag.cond[2],send:1,wait:1},"2":{load:utag.cond[3],send:1,wait:1}};
}

  if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i];};
  utag.loader.SETFORCE = function(a) {
    utag.DB('SETFORCE:' + a);
    if (utag.loader.ft > 0) clearTimeout(utag.loader.ft);
    utag.loader.ft = (utag.cfg.forcetimeout != 0) ? setTimeout(utag.loader.FORCE, utag.cfg.forcetimeout) : 0
  }
  utag.loader.FORCE = function(a, b, c, d) {
    a = utag.sender;
    b = utag.loader.f;
    utag.DB('FORCE');
    for (c in utag.loader.GV(b)) {
      d = a[c].id;
      if (typeof b[c] != 'undefined' && b[c] == 0) {
        utag.DB('FORCEERROR:' + d);
        utag.rpt['f_' + d] = 1;
        delete utag.sender[d];
        delete utag.send[d];
        utag.loader.LOAD(d)
      }
    }
  }
  utag.loader.INIT = function(a, b, c, d) {
    if (this.ol == 1) return -1;
    else this.ol = 1;
    utag.rpt.ts['i'] = new Date();
    if (!utag.cfg.noload) {
      try {
        this.GET()
      } catch (e) {};
      var lq = [];
      for (a in this.GV(this.cfg)) {
        b = this.cfg[a];
        b.id = a;
        if (b.wait == 1) {
          this.wq.push(b)
        } else if (b.load > 0) {
          if (b.send) {
            utag.send[b.id] = b;
            this.f[b.id] = 0
          }
          lq.push(b);
        }
      }
      for (a = 0; a < lq.length; a++) {
        utag.DB('utag.loader.INIT: loading ' + b.id);
        utag.loader.AS(lq[a])
      }
      if (utag.loader.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
	if(utag.loader.rf==0){
	  utag.loader.rf=1;
	  utag.loader.WQ();
	  utag.loader.SETFORCE('WAIT')
	}
      });
      else if(lq.length==0)utag.handler.INIT();
      else utag.loader.SETFORCE('INIT')
    }
    return 1
  };
  

  utag.cfg.readywait ? utag.loader.EV('', 'ready', function(a) {
    if(utag.loader.rf==0){
      utag.loader.rf=1;
      utag.DB('READY');
      utag.loader.INIT()
    }
  }) : utag.loader.INIT();
}
