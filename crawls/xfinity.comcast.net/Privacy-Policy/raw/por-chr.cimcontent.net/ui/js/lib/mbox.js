var mboxCopyright = "&copy; 2003-2009. Omniture, Inc. All rights reserved.";
// Fix 12-17-2009



mboxUrlBuilder = function(a, b) {
 this.a = a;
 this.b = b;
 this.c = new Array();
 this.d = function(e) { return e; };
 this.f = null;
};


mboxUrlBuilder.prototype.addParameter = function(g, h) {
 var i = new RegExp('(\'|")');
 if (i.exec(g)) {
 throw "Parameter '" + g + "' contains invalid characters";
 }

 for (var j = 0; j < this.c.length; j++) {
 var k = this.c[j];
 if (k.name == g) {
 k.value = h;
 return this;
 }
 }
 var l = new Object();
 l.name = g;
 l.value = h;
 this.c[this.c.length] = l;
 return this;
};


mboxUrlBuilder.prototype.addParameters = function(c) {
 if (!c) {
 return this;
 }
 for (var j = 0; j < c.length; j++) {
 var m = c[j].indexOf('=');
 if (m == -1 || m == 0) {
 continue;
 }
 this.addParameter(c[j].substring(0, m),
 c[j].substring(m + 1, c[j].length));
 }
 return this;
};

mboxUrlBuilder.prototype.setServerType = function(n) {
 this.o = n;
};

mboxUrlBuilder.prototype.setBasePath = function(f) {
 this.f = f;
};


mboxUrlBuilder.prototype.setUrlProcessAction = function(p) {
 this.d = p;
};

mboxUrlBuilder.prototype.buildUrl = function() {
 var q = this.f ? this.f :
 '/m2/' + this.b + '/mbox/' + this.o;

 var r = document.location.protocol == 'file:' ? 'http:' :
 document.location.protocol;

 var e = r + "//" + this.a + q;

 var s = e.indexOf('?') != -1 ? '&' : '?';
 for (var j = 0; j < this.c.length; j++) {
 var k = this.c[j];
 e += s + encodeURIComponent(k.name) + '=' +
 encodeURIComponent(k.value);
 s = '&';
 }
 return this.t(this.d(e));
};


mboxUrlBuilder.prototype.getParameters = function() {
 return this.c;
};

mboxUrlBuilder.prototype.setParameters = function(c) {
 this.c = c;
};

mboxUrlBuilder.prototype.clone = function() {
 var u = new mboxUrlBuilder(this.a, this.b);
 u.setServerType(this.o);
 u.setBasePath(this.f);
 u.setUrlProcessAction(this.d);
 for (var j = 0; j < this.c.length; j++) {
 u.addParameter(this.c[j].name,
 this.c[j].value);
 }
 return u;
};

mboxUrlBuilder.prototype.t = function(v) {
 return v.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');
};


mboxStandardFetcher = function() { };

mboxStandardFetcher.prototype.getType = function() {
 return 'standard';
};

mboxStandardFetcher.prototype.fetch = function(w) {
 w.setServerType(this.getType());

 document.write('<' + 'scr' + 'ipt src="' + w.buildUrl() +
 '" language="JavaScript"><' + '\/scr' + 'ipt>');
};

mboxStandardFetcher.prototype.cancel = function() { };


mboxAjaxFetcher = function() { };

mboxAjaxFetcher.prototype.getType = function() {
 return 'ajax';
};

mboxAjaxFetcher.prototype.fetch = function(w) {
 w.setServerType(this.getType());
 var e = w.buildUrl();

 this.x = document.createElement('script');
 this.x.src = e;

 document.getElementById('track').appendChild(this.x);
};

mboxAjaxFetcher.prototype.cancel = function() { };


mboxMap = function() {
 this.y = new Object();
 this.z = new Array();
};

mboxMap.prototype.put = function(A, h) {
 if (!this.y[A]) {
 this.z[this.z.length] = A;
 }
 this.y[A] = h;
};

mboxMap.prototype.get = function(A) {
 return this.y[A];
};

mboxMap.prototype.remove = function(A) {
 this.y[A] = undefined;
};

mboxMap.prototype.each = function(p) {
 for (var j = 0; j < this.z.length; j++ ) {
 var A = this.z[j];
 var h = this.y[A];
 if (h) {
 p(A, h);
 }
 }
};


mboxFactory = function(B, b, C) {
 this.D = false;
 this.B = B;
 this.C = C;
 this.E = new mboxList();

 mboxFactories.put(C, this);

 
 
 this.F =
 typeof document.createElement('div').replaceChild != 'undefined' &&
 (function() { return true; })() &&
 typeof document.getElementById != 'undefined' &&
 typeof (window.attachEvent || document.addEventListener ||
 window.addEventListener) != 'undefined' &&
 typeof encodeURIComponent != 'undefined';
 this.G = this.F &&
 mboxGetPageParameter('mboxDisable') == null;

 var H = C == 'default';
 
 
 
 this.I = new mboxCookieManager(
 'mbox' +
 (H ? '' : ('-' + C)),
 (function() { return mboxCookiePageDomain(); })());

 
 
 this.G = this.G && this.I.isEnabled() &&
 (this.I.getCookie('disable') == null);
 
 if (this.isAdmin()) {
 this.enable();
 }

 this.J = mboxGenerateId();
 this.K = new mboxSession(this.J,
 'mboxSession',
 'session', 31 * 60, this.I);
 this.L = new mboxPC('PC',
 1209600, this.I);

 this.w = new mboxUrlBuilder(B, b);
 this.M(this.w, H);

 this.N = new Date().getTime();
 this.O = this.N;

 var P = this;
 this.addOnLoad(function() { P.O = new Date().getTime(); });
 if (this.F) {
 
 
 this.addOnLoad(function() {
 P.D = true;
 P.getMboxes().each(function(Q) {
 Q.setFetcher(new mboxAjaxFetcher());
 Q.finalize(); });
 });

 this.limitTraffic(100, 10368000);

 if (this.G) {
 this.R();
 this.S = new mboxSignaler(function(T, c) {
 return P.create(T, c);
 }, this.I);
 }

 }
};





mboxFactory.prototype.isEnabled = function() {
 return this.G;
};


mboxFactory.prototype.getDisableReason = function() {
 return this.I.getCookie('disable');
};


mboxFactory.prototype.isSupported = function() {
 return this.F;
};


mboxFactory.prototype.disable = function(U, V) {
 if (typeof U == 'undefined') {
 U = 60 * 60;
 }

 if (typeof V == 'undefined') {
 V = 'unspecified';
 }

 if (!this.isAdmin()) {
 this.G = false;
 this.I.setCookie('disable', V, U);
 }
};

mboxFactory.prototype.enable = function() {
 this.G = true;
 this.I.deleteCookie('disable');
};

mboxFactory.prototype.isAdmin = function() {
 return document.location.href.indexOf('mboxEnv') != -1;
};


mboxFactory.prototype.limitTraffic = function(W, U) {

};


mboxFactory.prototype.addOnLoad = function(p) {
 if (window.addEventListener) {
 window.addEventListener('load', p, false);
 } else if (document.addEventListener) {
 document.addEventListener('load', p, false);
 } else if (document.attachEvent) {
 window.attachEvent('onload', p);
 }
};

mboxFactory.prototype.getEllapsedTime = function() {
 return this.O - this.N;
};

mboxFactory.prototype.getEllapsedTimeUntil = function(X) {
 return X - this.N;
};


mboxFactory.prototype.getMboxes = function() {
 return this.E;
};


mboxFactory.prototype.get = function(T, Y) {
 return this.E.get(T).getById(Y || 0);
};


mboxFactory.prototype.update = function(T, c) {
 if (!this.isEnabled()) {
 return;
 }
 if (this.E.get(T).length() == 0) {
 throw "Mbox " + T + " is not defined";
 }
 this.E.get(T).each(function(Q) {
 Q.getUrlBuilder()
 .addParameter('mboxPage', mboxGenerateId());
 Q.load(c);
 });
};


mboxFactory.prototype.create = function(
 T, c, Z) {

 if (!this.isSupported()) {
 return null;
 }
 var e = this.w.clone();
 e.addParameter('mboxCount', this.E.length() + 1);
 e.addParameters(c);

 var Y = this.E.get(T).length();
 var _ = this.C + '-' + T + '-' + Y;
 var ab;

 if (Z) {
 ab = new mboxLocatorNode(Z);
 } else {
 if (this.D) {
 throw 'The page has already been loaded, can\'t write marker';
 }
 ab = new mboxLocatorDefault(_);
 }

 try {
 var P = this;
 var bb = 'mboxImported-' + _;
 var Q = new mbox(T, Y, e, ab, bb);
 if (this.G) {
 Q.setFetcher(this.D ? new mboxAjaxFetcher() :
 new mboxStandardFetcher());
 }

 Q.setOnError(function(cb, n) {
 Q.setMessage(cb);
 Q.activate();
 if (!Q.isActivated()) {
 P.disable(60 * 60, cb);
 window.location.reload(false);
 }


 });
 this.E.add(Q);
 } catch (db) {
 this.disable();
 throw 'Failed creating mbox "' + T + '", the error was: ' + db;
 }

 var eb = new Date();
 e.addParameter('mboxTime', eb.getTime() -
 (eb.getTimezoneOffset() * 60000));

 return Q;
};

mboxFactory.prototype.getCookieManager = function() {
 return this.I;
};

mboxFactory.prototype.getPageId = function() {
 return this.J;
};

mboxFactory.prototype.getPCId = function() {
 return this.L;
};

mboxFactory.prototype.getSessionId = function() {
 return this.K;
};

mboxFactory.prototype.getSignaler = function() {
 return this.S;
};

mboxFactory.prototype.getUrlBuilder = function() {
 return this.w;
};

mboxFactory.prototype.M = function(e, H) {
 e.addParameter('mboxHost', document.location.hostname)
 .addParameter('mboxSession', this.K.getId());
 if (!H) {
 e.addParameter('mboxFactoryId', this.C);
 }
 if (this.L.getId() != null) {
 e.addParameter('mboxPC', this.L.getId());
 }
 e.addParameter('mboxPage', this.J);



 e.setUrlProcessAction(function(e) {

 e += '&mboxURL=' + encodeURIComponent(document.location);
 var fb = encodeURIComponent(document.referrer);
 if (e.length + fb.length < 2000) {
 e += '&mboxReferrer=' + fb;
 }

 e += '&mboxVersion=' + mboxVersion;
 return e;
 });
};

mboxFactory.prototype.gb = function() {
 return "";
};


mboxFactory.prototype.R = function() {
 document.write('<style>.' + 'mboxDefault'
 + ' { visibility:hidden; }</style>');
};

mboxFactory.prototype.isDomLoaded = function() {
 return this.D;
};


mboxSignaler = function(hb, I) {
 this.I = I;
 var ib =
 I.getCookieNames('signal-');
 for (var j = 0; j < ib.length; j++) {
 var jb = ib[j];
 var kb = I.getCookie(jb).split('&');
 var Q = hb(kb[0], kb);
 Q.load();
 I.deleteCookie(jb);
 }
};


mboxSignaler.prototype.signal = function(lb, T ) {
 this.I.setCookie('signal-' +
 lb, mboxShiftArray(arguments).join('&'), 45 * 60);
};


mboxList = function() {
 this.E = new Array();
};

mboxList.prototype.add = function(Q) {
 if (Q != null) {
 this.E[this.E.length] = Q;
 }
};


mboxList.prototype.get = function(T) {
 var mb = new mboxList();
 for (var j = 0; j < this.E.length; j++) {
 var Q = this.E[j];
 if (Q.getName() == T) {
 mb.add(Q);
 }
 }
 return mb;
};

mboxList.prototype.getById = function(nb) {
 return this.E[nb];
};

mboxList.prototype.length = function() {
 return this.E.length;
};


mboxList.prototype.each = function(p) {
 if (typeof p != 'function') {
 throw 'Action must be a function, was: ' + typeof(p);
 }
 for (var j = 0; j < this.E.length; j++) {
 p(this.E[j]);
 }
};





mboxLocatorDefault = function(g) {
 this.g = 'mboxMarker-' + g;

 document.write('<div id="' + this.g +
 '" style="visibility:hidden;display:none">&nbsp;</div>');
};

mboxLocatorDefault.prototype.locate = function() {
 var ob = document.getElementById(this.g);
 while (ob != null) {
 
 if (ob.nodeType == 1) {
 if (ob.className == 'mboxDefault') {
 return ob;
 }
 }
 ob = ob.previousSibling;
 }

 return null;
};

mboxLocatorDefault.prototype.force = function() {
 
 var pb = document.createElement('div');
 pb.className = 'mboxDefault';

 var qb = document.getElementById(this.g);
 qb.parentNode.insertBefore(pb, qb);

 return pb;
};

mboxLocatorNode = function(rb) {
 this.ob = rb;
};

mboxLocatorNode.prototype.locate = function() {
 return typeof this.ob == 'string' ?
 document.getElementById(this.ob) : this.ob;
};

mboxLocatorNode.prototype.force = function() {
 return null;
};


mboxCreate = function(T ) {
 var Q = mboxFactoryDefault.create( T, mboxShiftArray(arguments));

 if (Q) {
 Q.load();
 }
 return Q;
};


mboxDefine = function(Z, T ) {
 var Q = mboxFactoryDefault.create(T,
 mboxShiftArray(mboxShiftArray(arguments)), Z);

 return Q;
};

mboxUpdate = function(T ) {
 mboxFactoryDefault.update(T, mboxShiftArray(arguments));
};


mbox = function(g, sb, w, tb, bb) {
 this.ub = null;
 this.vb = 0;
 this.ab = tb;
 this.bb = bb;
 this.wb = null;

 this.xb = new mboxOfferContent();
 this.pb = null;
 this.w = w;

 
 this.message = '';
 this.yb = new Object();
 this.zb = 0;

 this.sb = sb;
 this.g = g;

 this.Ab();

 w.addParameter('mbox', g)
 .addParameter('mboxId', sb);

 this.Bb = function() {};
 this.Cb = function() {};

 this.Db = null;
};

mbox.prototype.getId = function() {
 return this.sb;
};

mbox.prototype.Ab = function() {
 if (this.g.length > 250) {
 throw "Mbox Name " + this.g + " exceeds max length of "
 + "250 characters.";
 } else if (this.g.match(/^\s+|\s+$/g)) {
 throw "Mbox Name " + this.g + " has leading/trailing whitespace(s).";
 }
};

mbox.prototype.getName = function() {
 return this.g;
};


mbox.prototype.getParameters = function() {
 var c = this.w.getParameters();
 var mb = new Array();
 for (var j = 0; j < c.length; j++) {
 
 if (c[j].name.indexOf('mbox') != 0) {
 mb[mb.length] = c[j].name + '=' + c[j].value;
 }
 }
 return mb;
};


mbox.prototype.setOnLoad = function(p) {
 this.Cb = p;
 return this;
};

mbox.prototype.setMessage = function(cb) {
 this.message = cb;
 return this;
};


mbox.prototype.setOnError = function(Bb) {
 this.Bb = Bb;
 return this;
};

mbox.prototype.setFetcher = function(Eb) {
 if (this.wb) {
 this.wb.cancel();
 }
 this.wb = Eb;
 return this;
};

mbox.prototype.getFetcher = function() {
 return this.wb;
};


mbox.prototype.load = function(c) {
 if (this.wb == null) {
 return this;
 }

 this.setEventTime("load.start");
 this.cancelTimeout();
 this.vb = 0;

 var w = (c && c.length > 0) ?
 this.w.clone().addParameters(c) : this.w;
 this.wb.fetch(w);

 var P = this;
 this.Fb = setTimeout(function() {
 P.Bb('browser timeout', P.wb.getType());
 }, 15000);

 this.setEventTime("load.end");

 return this;
};


mbox.prototype.loaded = function() {
 this.cancelTimeout();
 if (!this.activate()) {
 var P = this;
 setTimeout(function() { P.loaded(); }, 100);
 }
};


mbox.prototype.activate = function() {
 if (this.vb) {
 return this.vb;
 }
 this.setEventTime('activate' + ++this.zb + '.start');
 if (this.show()) {
 this.cancelTimeout();
 this.vb = 1;
 }
 this.setEventTime('activate' + this.zb + '.end');
 return this.vb;
};


mbox.prototype.isActivated = function() {
 return this.vb;
};


mbox.prototype.setOffer = function(xb) {
 if (xb && xb.show && xb.setOnLoad) {
 this.xb = xb;
 } else {
 throw 'Invalid offer';
 }
 return this;
};

mbox.prototype.getOffer = function() {
 return this.xb;
};


mbox.prototype.show = function() {
 this.setEventTime('show.start');
 var mb = this.xb.show(this);
 this.setEventTime(mb == 1 ? "show.end.ok" : "show.end");

 return mb;
};


mbox.prototype.showContent = function(Gb) {
 if (Gb == null) {
 
 return 0;
 }
 
 
 if (this.pb == null || !this.pb.parentNode) {
 this.pb = this.getDefaultDiv();
 if (this.pb == null) {
 
 return 0;
 }
 }

 if (this.pb != Gb) {
 this.Hb(this.pb);
 this.pb.parentNode.replaceChild(Gb, this.pb);
 this.pb = Gb;
 }

 this.Ib(Gb);

 this.Cb();

 
 return 1;
};


mbox.prototype.hide = function() {
 this.setEventTime('hide.start');
 var mb = this.showContent(this.getDefaultDiv());
 this.setEventTime(mb == 1 ? 'hide.end.ok' : 'hide.end.fail');
 return mb;
};


mbox.prototype.finalize = function() {
 this.setEventTime('finalize.start');
 this.cancelTimeout();

 if (this.getDefaultDiv() == null) {
 if (this.ab.force() != null) {
 this.setMessage('No default content, an empty one has been added');
 } else {
 this.setMessage('Unable to locate mbox');
 }
 }

 if (!this.activate()) {
 this.hide();
 this.setEventTime('finalize.end.hide');
 }
 this.setEventTime('finalize.end.ok');
};

mbox.prototype.cancelTimeout = function() {
 if (this.Fb) {
 clearTimeout(this.Fb);
 }
 if (this.wb != null) {
 this.wb.cancel();
 }
};

mbox.prototype.getDiv = function() {
 return this.pb;
};


mbox.prototype.getDefaultDiv = function() {
 if (this.Db == null) {
 this.Db = this.ab.locate();
 }
 return this.Db;
};

mbox.prototype.setEventTime = function(Jb) {
 this.yb[Jb] = (new Date()).getTime();
};

mbox.prototype.getEventTimes = function() {
 return this.yb;
};

mbox.prototype.getImportName = function() {
 return this.bb;
};

mbox.prototype.getURL = function() {
 return this.w.buildUrl();
};

mbox.prototype.getUrlBuilder = function() {
 return this.w;
};

mbox.prototype.Kb = function(pb) {
 return pb.style.display != 'none';
};

mbox.prototype.Ib = function(pb) {
 this.Lb(pb, true);
};

mbox.prototype.Hb = function(pb) {
 this.Lb(pb, false);
};

mbox.prototype.Lb = function(pb, Mb) {
 pb.style.visibility = Mb ? "visible" : "hidden";
 pb.style.display = Mb ? "block" : "none";
};

mboxOfferContent = function() {
 this.Cb = function() {};
};

mboxOfferContent.prototype.show = function(Q) {
 var mb = Q.showContent(document.getElementById(Q.getImportName()));
 if (mb == 1) {
 this.Cb();
 }
 return mb;
};

mboxOfferContent.prototype.setOnLoad = function(Cb) {
 this.Cb = Cb;
};


mboxOfferAjax = function(Gb) {
 this.Gb = Gb;
 this.Cb = function() {};
};

mboxOfferAjax.prototype.setOnLoad = function(Cb) {
 this.Cb = Cb;
};

mboxOfferAjax.prototype.show = function(Q) {
 var Nb = document.createElement('div');

 Nb.id = Q.getImportName();
 Nb.innerHTML = this.Gb;

 var mb = Q.showContent(Nb);
 if (mb == 1) {
 this.Cb();
 }
 return mb;
};


mboxOfferDefault = function() {
 this.Cb = function() {};
};

mboxOfferDefault.prototype.setOnLoad = function(Cb) {
 this.Cb = Cb;
};

mboxOfferDefault.prototype.show = function(Q) {
 var mb = Q.hide();
 if (mb == 1) {
 this.Cb();
 }
 return mb;
};

mboxCookieManager = function mboxCookieManager(g, Ob) {
 this.g = g;
 
 this.Ob = Ob == '' || Ob.indexOf('.') == -1 ? '' :
 '; domain=' + Ob;
 this.Pb = new mboxMap();
 this.loadCookies();
};

mboxCookieManager.prototype.isEnabled = function() {
 this.setCookie('check', 'true', 60);
 this.loadCookies();
 return this.getCookie('check') == 'true';
};


mboxCookieManager.prototype.setCookie = function(g, h, U) {
 if (typeof g != 'undefined' && typeof h != 'undefined' &&
 typeof U != 'undefined') {
 var Qb = new Object();
 Qb.name = g;
 Qb.value = escape(h);
 
 Qb.expireOn = Math.ceil(U + new Date().getTime() / 1000);
 this.Pb.put(g, Qb);
 this.saveCookies();
 }
};

mboxCookieManager.prototype.getCookie = function(g) {
 var Qb = this.Pb.get(g);
 return Qb ? unescape(Qb.value) : null;
};

mboxCookieManager.prototype.deleteCookie = function(g) {
 this.Pb.remove(g);
 this.saveCookies();
};

mboxCookieManager.prototype.getCookieNames = function(Rb) {
 var Sb = new Array();
 this.Pb.each(function(g, Qb) {
 if (g.indexOf(Rb) == 0) {
 Sb[Sb.length] = g;
 }
 });
 return Sb;
};

mboxCookieManager.prototype.saveCookies = function() {

 var Tb = new Array();
 var Ub = 0;
 this.Pb.each(function(g, Qb) {
 Tb[Tb.length] = g + '#' + Qb.value + '#' +
 Qb.expireOn;
 if (Ub < Qb.expireOn) {
 Ub = Qb.expireOn;
 }
 });

 var Vb = new Date(Ub * 1000);
 document.cookie = this.g + '=' + Tb.join('|') +
 
 '; expires=' + Vb.toGMTString() +
 '; path=/' + this.Ob;

};

mboxCookieManager.prototype.loadCookies = function() {
 this.Pb = new mboxMap();
 var Wb = document.cookie.indexOf(this.g + '=');
 if (Wb != -1) {
 var Xb = document.cookie.indexOf(';', Wb);
 if (Xb == -1) {
 Xb = document.cookie.indexOf(',', Wb);
 if (Xb == -1) {
 Xb = document.cookie.length;
 }
 }
 var Yb = document.cookie.substring(
 Wb + this.g.length + 1, Xb).split('|');

 var Zb = Math.ceil(new Date().getTime() / 1000);
 for (var j = 0; j < Yb.length; j++) {
 var Qb = Yb[j].split('#');
 if (Zb <= Qb[2]) {
 var _b = new Object();
 _b.name = Qb[0];
 _b.value = Qb[1];
 _b.expireOn = Qb[2];
 this.Pb.put(_b.name, _b);
 }
 }
 }
};


mboxSession = function(ac, bc, jb, cc,
 I) {
 this.bc = bc;
 this.jb = jb;
 this.cc = cc;
 this.I = I;

 this.dc = false;

 this.sb = typeof mboxForceSessionId != 'undefined' ?
 mboxForceSessionId : mboxGetPageParameter(this.bc);

 if (this.sb == null || this.sb.length == 0) {
 this.sb = I.getCookie(jb);
 if (this.sb == null || this.sb.length == 0) {
 this.sb = ac;
 this.dc = true;
 }
 }

 I.setCookie(jb, this.sb, cc);
};


mboxSession.prototype.getId = function() {
 return this.sb;
};

mboxSession.prototype.forceId = function(ec) {
 this.sb = ec;

 this.I.setCookie(this.jb, this.sb, this.cc);
};


mboxPC = function(jb, cc, I) {
 this.jb = jb;
 this.cc = cc;
 this.I = I;

 this.sb = typeof mboxForcePCId != 'undefined' ?
 mboxForcePCId : I.getCookie(jb);
 if (this.sb != null) {
 I.setCookie(jb, this.sb, cc);
 }

};


mboxPC.prototype.getId = function() {
 return this.sb;
};


mboxPC.prototype.forceId = function(ec) {
 if (this.sb != ec) {
 this.sb = ec;
 this.I.setCookie(this.jb, this.sb, this.cc);
 return true;
 }
 return false;
};

mboxGetPageParameter = function(g) {
 var mb = null;
 var fc = new RegExp(g + "=([^\&]*)");
 var gc = fc.exec(document.location);

 if (gc != null && gc.length >= 2) {
 mb = gc[1];
 }
 return mb;
};

mboxSetCookie = function(g, h, U) {
 return mboxFactoryDefault.getCookieManager().setCookie(g, h, U);
};

mboxGetCookie = function(g) {
 return mboxFactoryDefault.getCookieManager().getCookie(g);
};

mboxCookiePageDomain = function() {
 var Ob = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1];
 var hc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

 if (!hc.exec(Ob)) {
 var ic =
 (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(Ob);
 if (ic) {
 Ob = ic[0];
 }
 }

 return Ob ? Ob: "";
};

mboxShiftArray = function(jc) {
 var mb = new Array();
 for (var j = 1; j < jc.length; j++) {
 mb[mb.length] = jc[j];
 }
 return mb;
};

mboxGenerateId = function() {
 return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);
};

if (typeof mboxVersion == 'undefined') {
 var mboxVersion = 38;
 var mboxFactories = new mboxMap();
 var mboxFactoryDefault = new mboxFactory('comcast.tt.omtrdc.net', 'comcast',
 'default');
};

if (mboxGetPageParameter("mboxDebug") != null ||
 mboxFactoryDefault.getCookieManager()
 .getCookie("debug") != null) {
 setTimeout(function() {
 if (typeof mboxDebugLoaded == 'undefined') {
 alert('Could not load the remote debug.\nPlease check your connection'
 + ' to Test&amp;Target servers');
 }
 }, 60*60);
 document.write('<' + 'scr' + 'ipt language="Javascript1.2" src='
 + '"http://admin9.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=comcast.tt.omtrdc.net'
 + '&clientCode=comcast"><' + '\/scr' + 'ipt>');
};




mboxScPluginFetcher = function(b, kc) {
 this.b = b;
 this.kc = kc;
};


mboxScPluginFetcher.prototype.lc = function(w) {
 w.setBasePath('/m2/' + this.b + '/sc/standard');
 this.mc(w);

 var e = w.buildUrl();
 e += '&scPluginVersion=1';
 return e;
};


mboxScPluginFetcher.prototype.mc = function(w) {
 var nc = [
 "dynamicVariablePrefix","visitorID","vmk","ppu","charSet",
 "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName",
 "currencyCode","variableProvider","channel","server",
 "pageType","transactionID","purchaseID","campaign","state","zip","events",
 "products","linkName","linkType","resolution","colorDepth",
 "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth",
 "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3",
 "visitorSampling","visitorSamplingGroup","dynamicAccountSelection",
 "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks",
 "trackExternalLinks","trackInlineStats","linkLeaveQueryString",
 "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters",
 "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ];

 for (var j = 0; j < nc.length; j++) {
 this.oc(nc[j], w);
 }

 for (var j = 1; j <= 50; j++) {
 this.oc('prop' + j, w);
 this.oc('eVar' + j, w);
 this.oc('hier' + j, w);
 }
};

mboxScPluginFetcher.prototype.oc = function(g, w) {
 var h = this.kc[g];
 if (typeof(h) === 'undefined' || h === null || h === '') {
 return;
 }
 w.addParameter(g, h);
};

mboxScPluginFetcher.prototype.cancel = function() { };


mboxStandardScPluginFetcher = function(b, kc) {
 mboxScPluginFetcher.call(this, b, kc);
};
mboxStandardScPluginFetcher.prototype = new mboxScPluginFetcher;

mboxStandardScPluginFetcher.prototype.getType = function() {
 return 'ajax';
};

mboxStandardScPluginFetcher.prototype.fetch = function(w) {
 w.setServerType(this.getType());
 var e = this.lc(w);

 document.write('<' + 'scr' + 'ipt src="' + e +'" language="JavaScript"><' + '\/scr' + 'ipt>');
};


mboxAjaxScPluginFetcher = function(b, kc) {
 mboxScPluginFetcher.call(this, b, kc);
};
mboxAjaxScPluginFetcher.prototype = new mboxScPluginFetcher;

mboxAjaxScPluginFetcher.prototype.fetch = function(w) {
 w.setServerType(this.getType());
 var e = this.lc(w);

 this.x = document.createElement('script');
 this.x.src = e;

 document.getElementById('track').appendChild(this.x);
};

mboxAjaxScPluginFetcher.prototype.getType = function() {
 return 'ajax';
};



function mboxLoadSCPlugin(kc) {
 if (!kc) {
 return null;
 }
 kc.m_tt = function(kc) {

 var pc = kc.m_i('tt');

 pc.G = true;
 pc.b = 'comcast';

 
 pc['_t'] = function() {
 if (!this.isEnabled()) {
 return;
 }

 var Q = this.rc();
 if (Q) {
 
 var Eb = new mboxAjaxScPluginFetcher(this.b, this.s);
 /*var Eb = mboxFactoryDefault.isDomLoaded() ?
 new mboxAjaxScPluginFetcher(this.b, this.s) :
 new mboxStandardScPluginFetcher(this.b, this.s);*/
 Q.setFetcher(Eb);
 Q.load();
 }
 };

 pc.isEnabled = function() {
 return this.G && mboxFactoryDefault.isEnabled();
 };

 pc.rc = function() {
 var T = this.sc();
 var pb = document.createElement('DIV');
 return mboxFactoryDefault.create(T, new Array(), pb);
 };

 pc.sc = function() {
 var tc = this.s.events && this.s.events.indexOf('purchase') != -1;
 return 'SiteCatalyst: ' + (tc ? 'purchase' : 'event');
 };
 };

 return kc.loadModule('tt');
};

