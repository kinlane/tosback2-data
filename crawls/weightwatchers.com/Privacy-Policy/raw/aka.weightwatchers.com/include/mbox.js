var mboxCopyright = "Copyright 1996-2009. Adobe Systems Incorporated. All rights reserved";mboxUrlBuilder = function(a, b) { this.a = a; this.b = b; this.c = new Array(); this.d = function(e) { return e; }; this.f = null;};mboxUrlBuilder.prototype.addParameter = function(g, h) { var i = new RegExp('(\'|")'); if (i.exec(g)) { throw "Parameter '" + g + "' contains invalid characters"; } for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; if (k.name == g) { k.value = h; return this; } } var l = new Object(); l.name = g; l.value = h; this.c[this.c.length] = l; return this;};mboxUrlBuilder.prototype.addParameters = function(c) { if (!c) { return this; } for (var j = 0; j < c.length; j++) { var m = c[j].indexOf('='); if (m == -1 || m == 0) { continue; } this.addParameter(c[j].substring(0, m), c[j].substring(m + 1, c[j].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(n) { this.o = n;};mboxUrlBuilder.prototype.setBasePath = function(f) { this.f = f;};mboxUrlBuilder.prototype.setUrlProcessAction = function(p) { this.d = p;};mboxUrlBuilder.prototype.buildUrl = function() { var q = this.f ? this.f : '/m2/' + this.b + '/mbox/' + this.o; var r = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var e = r + "//" + this.a + q; var s = e.indexOf('?') != -1 ? '&' : '?'; for (var j = 0; j < this.c.length; j++) { var k = this.c[j]; e += s + encodeURIComponent(k.name) + '=' + encodeURIComponent(k.value); s = '&'; } return this.t(this.d(e));};mboxUrlBuilder.prototype.getParameters = function() { return this.c;};mboxUrlBuilder.prototype.setParameters = function(c) { this.c = c;};mboxUrlBuilder.prototype.clone = function() { var u = new mboxUrlBuilder(this.a, this.b); u.setServerType(this.o); u.setBasePath(this.f); u.setUrlProcessAction(this.d); for (var j = 0; j < this.c.length; j++) { u.addParameter(this.c[j].name, this.c[j].value); } return u;};mboxUrlBuilder.prototype.t = function(v) { return v.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');};mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + w.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = w.buildUrl(); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.y = new Object(); this.z = new Array();};mboxMap.prototype.put = function(A, h) { if (!this.y[A]) { this.z[this.z.length] = A; } this.y[A] = h;};mboxMap.prototype.get = function(A) { return this.y[A];};mboxMap.prototype.remove = function(A) { this.y[A] = undefined;};mboxMap.prototype.each = function(p) { for (var j = 0; j < this.z.length; j++ ) { var A = this.z[j]; var h = this.y[A]; if (h) { var B = p(A, h); if (B === false) { break; } } }};mboxFactory = function(C, b, D) { this.E = false; this.C = C; this.D = D; this.F = new mboxList(); mboxFactories.put(D, this); this.G = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.H = this.G && mboxGetPageParameter('mboxDisable') == null; var I = D == 'default'; this.J = new mboxCookieManager( 'mbox' + (I ? '' : ('-' + D)), (function() { return mboxCookiePageDomain(); })()); this.H = this.H && this.J.isEnabled() && (this.J.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.K = mboxGenerateId(); this.L = mboxScreenHeight(); this.M = mboxScreenWidth(); this.N = mboxBrowserWidth(); this.O = mboxBrowserHeight(); this.P = mboxScreenColorDepth(); this.Q = mboxBrowserTimeOffset(); this.R = new mboxSession(this.K, 'mboxSession', 'session', 31 * 60, this.J); this.S = new mboxPC('PC', 1209600, this.J); this.w = new mboxUrlBuilder(C, b); this.T(this.w, I); this.U = new Date().getTime(); this.V = this.U; var W = this; this.addOnLoad(function() { W.V = new Date().getTime(); }); if (this.G) { this.addOnLoad(function() { W.E = true; W.getMboxes().each(function(X) { X.setFetcher(new mboxAjaxFetcher()); X.finalize(); }); }); this.limitTraffic(100, 10368000); if (this.H) { this.Y(); this.Z = new mboxSignaler(function(_, c) { return W.create(_, c); }, this.J); } }};mboxFactory.prototype.isEnabled = function() { return this.H;};mboxFactory.prototype.getDisableReason = function() { return this.J.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.G;};mboxFactory.prototype.disable = function(ab, bb) { if (typeof ab == 'undefined') { ab = 60 * 60; } if (typeof bb == 'undefined') { bb = 'unspecified'; } if (!this.isAdmin()) { this.H = false; this.J.setCookie('disable', bb, ab); }};mboxFactory.prototype.enable = function() { this.H = true; this.J.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(cb, ab) {};mboxFactory.prototype.addOnLoad = function(p) { if (window.addEventListener) { window.addEventListener('load', p, false); } else if (document.addEventListener) { document.addEventListener('load', p, false); } else if (document.attachEvent) { window.attachEvent('onload', p); }};mboxFactory.prototype.getEllapsedTime = function() { return this.V - this.U;};mboxFactory.prototype.getEllapsedTimeUntil = function(db) { return db - this.U;};mboxFactory.prototype.getMboxes = function() { return this.F;};mboxFactory.prototype.get = function(_, eb) { return this.F.get(_).getById(eb || 0);};mboxFactory.prototype.update = function(_, c) { if (!this.isEnabled()) { return; } if (this.F.get(_).length() == 0) { throw "Mbox " + _ + " is not defined"; } this.F.get(_).each(function(X) { X.getUrlBuilder() .addParameter('mboxPage', mboxGenerateId()); X.load(c); });};mboxFactory.prototype.create = function( _, c, fb) { if (!this.isSupported()) { return null; } var e = this.w.clone(); e.addParameter('mboxCount', this.F.length() + 1); e.addParameters(c); var eb = this.F.get(_).length(); var gb = this.D + '-' + _ + '-' + eb; var hb; if (fb) { hb = new mboxLocatorNode(fb); } else { if (this.E) { throw 'The page has already been loaded, can\'t write marker'; } hb = new mboxLocatorDefault(gb); } try { var W = this; var ib = 'mboxImported-' + gb; var X = new mbox(_, eb, e, hb, ib); if (this.H) { X.setFetcher(this.E ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } X.setOnError(function(jb, n) { X.setMessage(jb); X.activate(); if (!X.isActivated()) { W.disable(60 * 60, jb); window.location.reload(false); } }); this.F.add(X); } catch (kb) { this.disable(); throw 'Failed creating mbox "' + _ + '", the error was: ' + kb; } var lb = new Date(); e.addParameter('mboxTime', lb.getTime() - (lb.getTimezoneOffset() * 60000)); return X;};mboxFactory.prototype.getCookieManager = function() { return this.J;};mboxFactory.prototype.getPageId = function() { return this.K;};mboxFactory.prototype.getPCId = function() { return this.S;};mboxFactory.prototype.getSessionId = function() { return this.R;};mboxFactory.prototype.getSignaler = function() { return this.Z;};mboxFactory.prototype.getUrlBuilder = function() { return this.w;};mboxFactory.prototype.T = function(e, I) { e.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.R.getId()); if (!I) { e.addParameter('mboxFactoryId', this.D); } if (this.S.getId() != null) { e.addParameter('mboxPC', this.S.getId()); } e.addParameter('mboxPage', this.K); e.addParameter('screenHeight', this.L); e.addParameter('screenWidth', this.M); e.addParameter('browserWidth', this.N); e.addParameter('browserHeight', this.O); e.addParameter('browserTimeOffset', this.Q); e.addParameter('colorDepth', this.P); e.addParameter('mboxXDomain', "enabled"); e.setUrlProcessAction(function(e) { e += '&mboxURL=' + encodeURIComponent(document.location); var mb = encodeURIComponent(document.referrer); if (e.length + mb.length < 2000) { e += '&mboxReferrer=' + mb; } e += '&mboxVersion=' + mboxVersion; return e; });};mboxFactory.prototype.nb = function() { return "";};mboxFactory.prototype.Y = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.E;};mboxSignaler = function(ob, J) { this.J = J; var pb = J.getCookieNames('signal-'); for (var j = 0; j < pb.length; j++) { var qb = pb[j]; var rb = J.getCookie(qb).split('&'); var X = ob(rb[0], rb); X.load(); J.deleteCookie(qb); }};mboxSignaler.prototype.signal = function(sb, _ ) { this.J.setCookie('signal-' + sb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.F = new Array();};mboxList.prototype.add = function(X) { if (X != null) { this.F[this.F.length] = X; }};mboxList.prototype.get = function(_) { var B = new mboxList(); for (var j = 0; j < this.F.length; j++) { var X = this.F[j]; if (X.getName() == _) { B.add(X); } } return B;};mboxList.prototype.getById = function(tb) { return this.F[tb];};mboxList.prototype.length = function() { return this.F.length;};mboxList.prototype.each = function(p) { if (typeof p != 'function') { throw 'Action must be a function, was: ' + typeof(p); } for (var j = 0; j < this.F.length; j++) { p(this.F[j]); }};mboxLocatorDefault = function(g) { this.g = 'mboxMarker-' + g; document.write('<div id="' + this.g + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var ub = document.getElementById(this.g); while (ub != null) { if (ub.nodeType == 1) { if (ub.className == 'mboxDefault') { return ub; } } ub = ub.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var vb = document.createElement('div'); vb.className = 'mboxDefault'; var wb = document.getElementById(this.g); wb.parentNode.insertBefore(vb, wb); return vb;};mboxLocatorNode = function(xb) { this.ub = xb;};mboxLocatorNode.prototype.locate = function() { return typeof this.ub == 'string' ? document.getElementById(this.ub) : this.ub;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(_ ) { var X = mboxFactoryDefault.create( _, mboxShiftArray(arguments)); if (X) { X.load(); } return X;};mboxDefine = function(fb, _ ) { var X = mboxFactoryDefault.create(_, mboxShiftArray(mboxShiftArray(arguments)), fb); return X;};mboxUpdate = function(_ ) { mboxFactoryDefault.update(_, mboxShiftArray(arguments));};mbox = function(g, yb, w, zb, ib) { this.Ab = null; this.Bb = 0; this.hb = zb; this.ib = ib; this.Cb = null; this.Db = new mboxOfferContent(); this.vb = null; this.w = w; this.message = ''; this.Eb = new Object(); this.Fb = 0; this.yb = yb; this.g = g; this.Gb(); w.addParameter('mbox', g) .addParameter('mboxId', yb); this.Hb = function() {}; this.Ib = function() {}; this.Jb = null;};mbox.prototype.getId = function() { return this.yb;};mbox.prototype.Gb = function() { if (this.g.length > 250) { throw "Mbox Name " + this.g + " exceeds max length of " + "250 characters."; } else if (this.g.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.g + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.g;};mbox.prototype.getParameters = function() { var c = this.w.getParameters(); var B = new Array(); for (var j = 0; j < c.length; j++) { if (c[j].name.indexOf('mbox') != 0) { B[B.length] = c[j].name + '=' + c[j].value; } } return B;};mbox.prototype.setOnLoad = function(p) { this.Ib = p; return this;};mbox.prototype.setMessage = function(jb) { this.message = jb; return this;};mbox.prototype.setOnError = function(Hb) { this.Hb = Hb; return this;};mbox.prototype.setFetcher = function(Kb) { if (this.Cb) { this.Cb.cancel(); } this.Cb = Kb; return this;};mbox.prototype.getFetcher = function() { return this.Cb;};mbox.prototype.load = function(c) { if (this.Cb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Bb = 0; var w = (c && c.length > 0) ? this.w.clone().addParameters(c) : this.w; this.Cb.fetch(w); var W = this; this.Lb = setTimeout(function() { W.Hb('browser timeout', W.Cb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var W = this; setTimeout(function() { W.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Bb) { return this.Bb; } this.setEventTime('activate' + ++this.Fb + '.start'); if (this.show()) { this.cancelTimeout(); this.Bb = 1; } this.setEventTime('activate' + this.Fb + '.end'); return this.Bb;};mbox.prototype.isActivated = function() { return this.Bb;};mbox.prototype.setOffer = function(Db) { if (Db && Db.show && Db.setOnLoad) { this.Db = Db; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Db;};mbox.prototype.show = function() { this.setEventTime('show.start'); var B = this.Db.show(this); this.setEventTime(B == 1 ? "show.end.ok" : "show.end"); return B;};mbox.prototype.showContent = function(Mb) { if (Mb == null) { return 0; } if (this.vb == null || !this.vb.parentNode) { this.vb = this.getDefaultDiv(); if (this.vb == null) { return 0; } } if (this.vb != Mb) { this.Nb(this.vb); this.vb.parentNode.replaceChild(Mb, this.vb); this.vb = Mb; } this.Ob(Mb); this.Ib(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var B = this.showContent(this.getDefaultDiv()); this.setEventTime(B == 1 ? 'hide.end.ok' : 'hide.end.fail'); return B;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.hb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.Lb) { clearTimeout(this.Lb); } if (this.Cb != null) { this.Cb.cancel(); }};mbox.prototype.getDiv = function() { return this.vb;};mbox.prototype.getDefaultDiv = function() { if (this.Jb == null) { this.Jb = this.hb.locate(); } return this.Jb;};mbox.prototype.setEventTime = function(Pb) { this.Eb[Pb] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Eb;};mbox.prototype.getImportName = function() { return this.ib;};mbox.prototype.getURL = function() { return this.w.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.w;};mbox.prototype.Qb = function(vb) { return vb.style.display != 'none';};mbox.prototype.Ob = function(vb) { this.Rb(vb, true);};mbox.prototype.Nb = function(vb) { this.Rb(vb, false);};mbox.prototype.Rb = function(vb, Sb) { vb.style.visibility = Sb ? "visible" : "hidden"; vb.style.display = Sb ? "block" : "none";};mboxOfferContent = function() { this.Ib = function() {};};mboxOfferContent.prototype.show = function(X) { var B = X.showContent(document.getElementById(X.getImportName())); if (B == 1) { this.Ib(); } return B;};mboxOfferContent.prototype.setOnLoad = function(Ib) { this.Ib = Ib;};mboxOfferAjax = function(Mb) { this.Mb = Mb; this.Ib = function() {};};mboxOfferAjax.prototype.setOnLoad = function(Ib) { this.Ib = Ib;};mboxOfferAjax.prototype.show = function(X) { var Tb = document.createElement('div'); Tb.id = X.getImportName(); Tb.innerHTML = this.Mb; var B = X.showContent(Tb); if (B == 1) { this.Ib(); } return B;};mboxOfferDefault = function() { this.Ib = function() {};};mboxOfferDefault.prototype.setOnLoad = function(Ib) { this.Ib = Ib;};mboxOfferDefault.prototype.show = function(X) { var B = X.hide(); if (B == 1) { this.Ib(); } return B;};mboxCookieManager = function mboxCookieManager(g, Ub) { this.g = g; this.Ub = Ub == '' || Ub.indexOf('.') == -1 ? '' : '; domain=' + Ub; this.Vb = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(g, h, ab) { if (typeof g != 'undefined' && typeof h != 'undefined' && typeof ab != 'undefined') { var Wb = new Object(); Wb.name = g; Wb.value = escape(h); Wb.expireOn = Math.ceil(ab + new Date().getTime() / 1000); this.Vb.put(g, Wb); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(g) { var Wb = this.Vb.get(g); return Wb ? unescape(Wb.value) : null;};mboxCookieManager.prototype.deleteCookie = function(g) { this.Vb.remove(g); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(Xb) { var Yb = new Array(); this.Vb.each(function(g, Wb) { if (g.indexOf(Xb) == 0) { Yb[Yb.length] = g; } }); return Yb;};mboxCookieManager.prototype.saveCookies = function() { var Zb = new Array(); var _b = 0; this.Vb.each(function(g, Wb) { Zb[Zb.length] = g + '#' + Wb.value + '#' + Wb.expireOn; if (_b < Wb.expireOn) { _b = Wb.expireOn; } }); var ac = new Date(_b * 1000); document.cookie = this.g + '=' + Zb.join('|') + '; expires=' + ac.toGMTString() + '; path=/' + this.Ub;};mboxCookieManager.prototype.loadCookies = function() { this.Vb = new mboxMap(); var bc = document.cookie.indexOf(this.g + '='); if (bc != -1) { var cc = document.cookie.indexOf(';', bc); if (cc == -1) { cc = document.cookie.indexOf(',', bc); if (cc == -1) { cc = document.cookie.length; } } var dc = document.cookie.substring( bc + this.g.length + 1, cc).split('|'); var ec = Math.ceil(new Date().getTime() / 1000); for (var j = 0; j < dc.length; j++) { var Wb = dc[j].split('#'); if (ec <= Wb[2]) { var fc = new Object(); fc.name = Wb[0]; fc.value = Wb[1]; fc.expireOn = Wb[2]; this.Vb.put(fc.name, fc); } } }};mboxSession = function(gc, hc, qb, ic, J) { this.hc = hc; this.qb = qb; this.ic = ic; this.J = J; this.jc = false; this.yb = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.hc); if (this.yb == null || this.yb.length == 0) { this.yb = J.getCookie(qb); if (this.yb == null || this.yb.length == 0) { this.yb = gc; this.jc = true; } } J.setCookie(qb, this.yb, ic);};mboxSession.prototype.getId = function() { return this.yb;};mboxSession.prototype.forceId = function(kc) { this.yb = kc; this.J.setCookie(this.qb, this.yb, this.ic);};mboxPC = function(qb, ic, J) { this.qb = qb; this.ic = ic; this.J = J; this.yb = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : J.getCookie(qb); if (this.yb != null) { J.setCookie(qb, this.yb, ic); }};mboxPC.prototype.getId = function() { return this.yb;};mboxPC.prototype.forceId = function(kc) { if (this.yb != kc) { this.yb = kc; this.J.setCookie(this.qb, this.yb, this.ic); return true; } return false;};mboxGetPageParameter = function(g) { var B = null; var lc = new RegExp(g + "=([^\&]*)"); var mc = lc.exec(document.location); if (mc != null && mc.length >= 2) { B = mc[1]; } return B;};mboxSetCookie = function(g, h, ab) { return mboxFactoryDefault.getCookieManager().setCookie(g, h, ab);};mboxGetCookie = function(g) { return mboxFactoryDefault.getCookieManager().getCookie(g);};mboxCookiePageDomain = function() { var Ub = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var nc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!nc.exec(Ub)) { var oc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(Ub); if (oc) { Ub = oc[0]; } } return Ub ? Ub: "";};mboxShiftArray = function(pc) { var B = new Array(); for (var j = 1; j < pc.length; j++) { B[B.length] = pc[j]; } return B;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;}; if (typeof mboxVersion == 'undefined') { var mboxVersion = 39; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('weightwatchers.tt.omtrdc.net', 'weightwatchers', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"http://admin12.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=weightwatchers.tt.omtrdc.net' + '&clientCode=weightwatchers"><' + '\/scr' + 'ipt>');};mboxScPluginFetcher = function(b, qc) { this.b = b; this.qc = qc;};mboxScPluginFetcher.prototype.rc = function(w) { w.setBasePath('/m2/' + this.b + '/sc/standard'); this.sc(w); var e = w.buildUrl(); e += '&scPluginVersion=1'; return e;};mboxScPluginFetcher.prototype.sc = function(w) { var tc = [ "dynamicVariablePrefix","visitorID","vmk","ppu","charSet", "visitorNamespace","cookieDomainPeriods","cookieLifetime","pageName", "currencyCode","variableProvider","channel","server", "pageType","transactionID","purchaseID","campaign","state","zip","events", "products","linkName","linkType","resolution","colorDepth", "javascriptVersion","javaEnabled","cookiesEnabled","browserWidth", "browserHeight","connectionType","homepage","pe","pev1","pev2","pev3", "visitorSampling","visitorSamplingGroup","dynamicAccountSelection", "dynamicAccountList","dynamicAccountMatch","trackDownloadLinks", "trackExternalLinks","trackInlineStats","linkLeaveQueryString", "linkDownloadFileTypes","linkExternalFilters","linkInternalFilters", "linkTrackVars","linkTrackEvents","linkNames","lnk","eo" ]; for (var j = 0; j < tc.length; j++) { this.uc(tc[j], w); } for (var j = 1; j <= 50; j++) { this.uc('prop' + j, w); this.uc('eVar' + j, w); this.uc('hier' + j, w); }};mboxScPluginFetcher.prototype.uc = function(g, w) { var h = this.qc[g]; if (typeof(h) === 'undefined' || h === null || h === '') { return; } w.addParameter(g, h);};mboxScPluginFetcher.prototype.cancel = function() { };mboxStandardScPluginFetcher = function(b, qc) { mboxScPluginFetcher.call(this, b, qc);};mboxStandardScPluginFetcher.prototype = new mboxScPluginFetcher;mboxStandardScPluginFetcher.prototype.getType = function() { return 'standard';};mboxStandardScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.rc(w); document.write('<' + 'scr' + 'ipt src="' + e + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxAjaxScPluginFetcher = function(b, qc) { mboxScPluginFetcher.call(this, b, qc);};mboxAjaxScPluginFetcher.prototype = new mboxScPluginFetcher;mboxAjaxScPluginFetcher.prototype.fetch = function(w) { w.setServerType(this.getType()); var e = this.rc(w); this.x = document.createElement('script'); this.x.src = e; document.body.appendChild(this.x);};mboxAjaxScPluginFetcher.prototype.getType = function() { return 'ajax';};function mboxLoadSCPlugin(qc) { if (!qc) { return null; } qc.m_tt = function(qc) { var vc = qc.m_i('tt'); vc.H = true; vc.b = 'weightwatchers'; vc['_t'] = function() { if (!this.isEnabled()) { return; } var X = this.xc(); if (X) { var Kb = mboxFactoryDefault.isDomLoaded() ? new mboxAjaxScPluginFetcher(this.b, this.s) : new mboxStandardScPluginFetcher(this.b, this.s); X.setFetcher(Kb); X.load(); } }; vc.isEnabled = function() { return this.H && mboxFactoryDefault.isEnabled(); }; vc.xc = function() { var _ = this.yc(); var vb = document.createElement('DIV'); return mboxFactoryDefault.create(_, new Array(), vb); }; vc.yc = function() { var zc = this.s.events && this.s.events.indexOf('purchase') != -1; return 'SiteCatalyst: ' + (zc ? 'purchase' : 'event'); }; }; return qc.loadModule('tt');};
