/*Copyright 2000-2010,Coremetrics 4.7.4 $Revision: 1.28 $*/
if (!cGB) {
    var cGB = true;
    if (!cm_ClientID) {
        var cm_ClientID = "99999999";
    }
    if (!cm_HOST) {
        var cm_HOST = "test.coremetrics.com/cm?";
    }
    if (!cm_ClientTS) {
        var dt = new Date();
        var cm_ClientTS = dt.getTime();
    }
    if (!cm_TrackLink) {
        var cm_TrackLink = "A";
    }
    if (!cm_DelayHandlerReg) {
        var cm_DelayHandlerReg = "";
    }
    if (!cm_SkipHandlerReg) {
        var cm_SkipHandlerReg = "RS";
    }
    if (!cm_TrackTime) {
        var cm_TrackTime = false;
    }
    if (!cm_TrackImpressions) {
        var cm_TrackImpressions = "";
    }
    if (!cm_SecureTags || cm_SecureTags == null) {
        var cm_SecureTags = "|2|3|";
    }
    if (!cm_FirstPartyDetect) {
        var cm_FirstPartyDetect = false;
    }
    if (!cm_DownloadExtensions) {
        var cm_DownloadExtensions = null;
    }
    if (!cm_UseUTF8) {
        var cm_UseUTF8 = true;
    }
    if (!cm_FormError) {
        var cm_FormError = "";
    }
    if (!cm_FormPageID) {
        var cm_FormPageID = false;
    }
    if (cm_UseCookie == null) {
        var cm_UseCookie = true;
    }
    if (!cm_TimeoutSecs) {
        var cm_TimeoutSecs = 15;
    }
    if (!cm_UseDOMScriptLoad) {
        var cm_UseDOMScriptLoad = false;
    }
    if (!cm_OffsiteImpressionsEnabled) {
        var cm_OffsiteImpressionsEnabled = false;
    }
    if (!cm_AvidHost) {
        var cm_AvidHost = "data.cmcore.com/cookie-id.js?fn=cmSetAvid";
    }
    var cm_AvidLoadTimedOut = false;
    if (!cm_JSFEnabled) {
        var cm_JSFEnabled = false;
    }
    if (!cm_JSFPCookieDomain) {
        var cm_JSFPCookieDomain = null;
    }
    if (!cm_JSFTrackClients) {
        var cm_JSFTrackClients = true;
    }
    if (!cm_JSFPCookieMigrate) {
        var cm_JSFPCookieMigrate = false;
    }
    if (!cm_JSFPForceMigrateCookies) {
        var cm_JSFPForceMigrateCookies = false;
    }
    if (!cm_JSFPCookieMigrateVisitorID) {
        var cm_JSFPCookieMigrateVisitorID = "cm_mc_uid";
    }
    if (!cm_JSFPCookieMigrateSessionID) {
        var cm_JSFPCookieMigrateSessionID = "cm_mc_sid";
    }
    if (!cm_JSFPMigrationDomainWhitelist) {
        var cm_JSFPMigrationDomainWhitelist = null;
    }
    if (!cm_JSFPMigrationDomainBlacklist) {
        var cm_JSFPMigrationDomainBlacklist = null;
    }
    if (!cm_JSFPMigrationPathWhitelist) {
        var cm_JSFPMigrationPathWhitelist = null;
    }
    if (!cm_JSFPMigrationOtherCookies) {
        var cm_JSFPMigrationOtherCookies = null;
    }
    if (!cm_JSFPMigrationOtherCookiesExpireTimes) {
        var cm_JSFPMigrationOtherCookiesExpireTimes = {};
    }
    if (!cm_JSFMigrationEnabled) {
        var cm_JSFMigrationEnabled = 0;
    }
    if (!cm_JSFSessionType) {
        var cm_JSFSessionType = "I";
    }
    if (!cm_JSFSessionTimeout) {
        var cm_JSFSessionTimeout = 1800;
    }
    if (!cm_JSFCoreCookieName) {
        var cm_JSFCoreCookieName = "CoreID6";
    }
    if (!cm_JSFSpecCookieNames) {
        var cm_JSFSpecCookieNames = [];
    }
    if (!cmUA) {
        var cmUA = {};
        cmUA["MSIE"] = 2083;
    }
    if (!cmDefaultLimit) {
        var cmDefaultLimit = 8197;
    }
    if (cGQ == null) {
        var cGQ = true;
    }
    if (!cGO) {
        var cGO = 1024;
    }
    if (!cGR) {
        var cGR = 600000;
    }
    if (!encodeURIComponent) {
        var encodeURIComponent = null;
    }
    var cG8;
    var cG8Index;
    var cG6 = document;
    var cGT;
    var cG7 = new _cG7();
    cG6.cmTagCtl = cG7;
    var CI = cmStartTagSet;
    var CJ = cmSendTagSet;
    var cG1 = 0;
    var cG0 = ["vn1","vn2","st","pi","rs","ec","rf","ul"];
    var cmLastPageID = null;
    var cGA = null;
    var cmMigrationDisabled = 0;
    var cmMigrationFrom1p_CM = 1;
    var cmMigrationFrom1p_SA = 2;
    var cmValidFlag_SessionContinue = 1;
    var cmValidFlag_NewSession = 2;
    var cmValidFlag_NewVisitor = 4;
    var cmValidFlag_SessionReset = 32;
    var cmSACookieName = "sauid";
    var cmCore_JSFParamEnabled = "cjen";
    var cmCore_JSFParamUserID = "cjuid";
    var cmCore_JSFParamSessionID = "cjsid";
    var cmCore_JSFParamValidFlag = "cjvf";
    var cmCore_JSFParamSpecCookiesCount = "cjscc";
    var cmCore_JSFParamSpecCookiesNames = "cjscn";
    var cmCore_JSFParamSpecCookiesValues = "cjscv";
    var cmSpecCookieNames = "";
    var cmSpecCookieValues = "";
    var cmSpecCookiesCount = 0;
    if (!cG4) {
        var cG4 = 5000;
    }
    if (!cG5) {
        var cG5 = 200;
    }
    var cG2 = {};
    var cG3 = {};
    var cGM = navigator.appVersion;
    var cGN = navigator.userAgent;
    var cGS = cGN.indexOf("Opera") >= 0;
    var cGU = cGN.indexOf("Safari") >= 0;
    var cmT2 = -1;
    var cmT3 = -1;
    var cGC = "";
    var cGD = "";
    var cGE = "";
    var cGF = "";
    var cGG = "";
    var cGH = "";
    var cmSubmitFlag = false;
    var cmFormC1 = "submitbuttonreset";
    var cmFormC2 = "textpasswordtextarea";
    var cmFormC3 = "select-oneselect-multiple";
    var cGI = "";
    var cGJ = "";
    var cGK = "";
    var cGL = "";
    var chost = null;
    var cci = null;
    var _cm_CMRules = {};
    var _cm_isNew = true;
    if (!cm_PartnerDataClientIDs) {
        var cm_PartnerDataClientIDs = "";
    }
    var cm_Avid;
    var cmCookieExpDate;
    var cm_AvidLoadTimer;
    var cm_IOEnabled = false;
    var cm_ATEnabled = false;
}
function cmLoad() {
    CI();
    for (var cmSpecCookieIndex = 0; cmSpecCookieIndex < cm_JSFSpecCookieNames.length; cmSpecCookieIndex++) {
        var currSpecCookieName = cm_JSFSpecCookieNames[cmSpecCookieIndex];
        var currSpecCookieValue = cI(cm_JSFSpecCookieNames[cmSpecCookieIndex]);
        if (currSpecCookieValue == null)continue;
        if (currSpecCookieValue.length == 0)continue;
        cmSpecCookieNames = cmSpecCookieNames + (cmSpecCookieNames != "" ? "|" : "") + escape(currSpecCookieName);
        cmSpecCookieValues = cmSpecCookieValues + (cmSpecCookieValues != "" ? "|" : "") + escape(currSpecCookieValue);
        cmSpecCookiesCount++;
    }
    var dt = new Date();
    var cmYearOffset = 0;
    if (dt.getFullYear)cmYearOffset = dt.getFullYear(); else {
        cmYearOffset = dt.getYear();
        if (cmYearOffset < 1900)cmYearOffset += 1900;
    }
    dt.setYear(cmYearOffset + 15);
    cmCookieExpDate = dt.toGMTString();
    if (cm_UseCookie) {
        var pi = cI("cmRS", "pi", "");
        if (pi != "")cmLastPageID = pi;
        chost = cm_HOST;
        cm_HOST = cI("cmRS", "ho", chost);
        cci = cm_ClientID;
        cm_ClientID = cI("cmRS", "ci", cci);
        var cT3 = cI("cmRS", "t3", "");
        if (cT3 != "") {
            cGA = cT3;
        }
        var jsfpdata = cI("cmRS", "cjen", "");
        if (jsfpdata != "") {
            cm_JSFEnabled = true;
        }
        var cT1 = cI("cmRS", "t1", "");
        if (cT1 != "" && (!cGA || cm_ClientTS - cGA < cGR)) {
            cmAddShared("st", cT1);
            var ul = cI("cmRS", "ul", "");
            var rf = cI("cmRS", "rf", "");
            var cT2 = cI("cmRS", "t2", "");
            var cT4 = cI("cmRS", "t4", "");
            if (cm_TrackTime)cN(cT1, cT2, cT3, cT4, true, pi);
            var hr = cI("cmRS", "hr", "");
            if (hr != "") {
                var ti = cI("cmRS", "lti", "");
                if (cm_ClientTS - ti < cGR) {
                    var nm = cI("cmRS", "ln", "");
                    cM(cT1, ti, nm, hr, true, pi, ul, rf);
                }
            }
            var cV6 = cI("cmRS", "ac", "");
            var cV7 = cI("cmRS", "fd", "");
            if ((cV6 != "") || (cV7 != "")) {
                var ti = cI("cmRS", "fti", "");
                if (cm_ClientTS - ti < cGR) {
                    var cV9 = cI("cmRS", "fn", "");
                    var cV0 = cI("cmRS", "fu", "");
                    cL(cT1, ti, cV9, cV6, cV0, cV7, true, pi, ul, rf);
                }
            }
            var cError = unescape(cI("cmRS", "uer", ""));
            CH(cT1, cT3, cError, true, pi);
        }
        CC("cmRS");
    }
    if (!cGS && (cF(4) || CD(5))) {
        cmAddNewEvent(window, "load", cY);
        cmAddNewEvent(window, "unload", cZ);
        if (cm_DelayHandlerReg.indexOf("L") == -1)window.cX("main");
        if (cm_DelayHandlerReg.indexOf("F") == -1)cU();
    }
    CJ(1);
    if (cm_OffsiteImpressionsEnabled) {
        cm_Avid = cI("CMAVID");
        if (cm_Avid == null) {
            _cmPartnerUtils.loadScript(C8(null) + "//" + cm_AvidHost);
            cm_AvidLoadTimer = setTimeout("cm_AvidLoadTimedOut=true", 2000);
        }
    }
    if (chost)cm_HOST = chost;
    if (cci)cm_ClientID = cci;
    var rules_HOST = cm_Production_HOST;
    if (cm_ATEnabled) {
        if (!cI("CMDisabled") && (cI("CMOptout") ? cI("CMOptout").toUpperCase() != "OPT_OUT" : true) && (cI("ID") ? cI("ID").toUppercase() != "OPT_OUT" : true) && (cI("CMOptout") ? cI("CMOptout").toUpperCase() != "ANONYMOUS" : true)) {
            if (typeof(_cm_CMRulesLoaded) == "undefined") {
                var splitCIds = cm_ClientID.split(";");
                for (var n = 0; n < splitCIds.length; n++) {
                    if (cm_PartnerDataClientIDs.indexOf(splitCIds[n]) != -1) {
                        if (cI("CorePartnerMode") == "TEST")_cmPartnerUtils.loadScript(C8(null) + '//' + rules_HOST + '/at/rules_' + splitCIds[n] + 'test.js'); else _cmPartnerUtils.loadScript(C8(null) + '//' + rules_HOST + '/at/rules_' + splitCIds[n] + '.js');
                    }
                }
                cG6._cm_CMRulesLoaded = 1;
            }
        }
    }
    if (cm_IOEnabled) {
        _cmPartnerUtils.loadScript(C8(null) + '//libs.coremetrics.com/io.js');
    }
}
var cI = cI;
var cE = cE;
function cmStartTagSet() {
    if (cG8)return;
    cG8 = [];
    cG8[0] = new _cm();
    cG8Index = 1;
}
function cmAddShared(nm, val) {
    if (cG8)cG8[0][nm] = val;
}
function cmSendTagSet() {
    var request;
    var cG8_tmp = cG8;
    while ((request = C7(arguments[0])) != null) {
        c9(request, cG8_tmp[0].ci);
    }
    cG8 = null;
}
function CQ(pl, host, qs) {
    this.pl = pl;
    this.hosts = host.split(",");
    if (qs)this.qs = qs;
    this.cM5 = CR;
}
function CR() {
    var a = arguments;
    var h = a[0] ? a[0] : this.hosts[0];
    return this.pl + "//" + h + (this.qs ? this.qs : "");
}
function _cG7() {
    this.cM0 = {};
    this.uls = {};
    this.rfs = {};
    this.cTI = [];
    this.cPE = 0;
    this.normalizeURL = c2;
    this.getPageID = c1;
    this.getPluginPageID = cmGetPluginPageID;
}
function cmGetPluginPageID(cVA) {
    splitClientIDs = cm_ClientID.split(";");
    finalClientID = cVA;
    for (var n = 0; n < splitClientIDs.length; n++) {
        if (splitClientIDs[n] == cVA) {
            finalClientID = cm_ClientID;
            break;
        }
    }
    return this.getPageID(finalClientID);
}
function c1(cVA) {
    var pi = cG7.cM0[cVA];
    return pi ? pi : "";
}
function CS(cVA) {
    var ul = cG7.uls[cVA];
    if (!ul)ul = window.location.href;
    return ul ? ul : "";
}
function CT(cVA) {
    var rf = cG7.rfs[cVA];
    if (!rf)rf = cG6.referrer;
    return rf ? rf : "";
}
function CP(href) {
    var h = cGT;
    if (!h)h = cGT = cG7.normalizeURL(window.location.href, false);
    var a = href.indexOf("#");
    if (a >= 0 && a <= h.length) {
        var ha = h.indexOf("#");
        if (ha < 0)ha = h.length;
        if (href.substring(0, a) == h.substring(0, ha))return href.substring(a);
    }
    return href;
}
function c2(url, isHref) {
    if (isHref) {
        url = CP(url);
        var pfx = window.location.protocol + "//" + window.location.host;
        if (url.indexOf(pfx) == 0)url = url.substring(pfx.length);
    }
    return cD(url);
}
function c4() {
    for (var b in cmUA)if (cGM.indexOf(b) != -1)return cmUA[b];
    return cmDefaultLimit;
}
function C0(n) {
    if (cG7) {
        if (cG7.cTI && cG7.cTI[n]) {
            cG7.cTI[n].cmLD = true;
            if (cG7.cTI[n].ci) {
                cmJSFSetValidFlagValue(cmValidFlag_SessionContinue, false, cG7.cTI[n].ci);
                cmJSFSetSessionCookies(false, cG7.cTI[n].ci);
            }
        }
        cG7.cPE--;
        if (cG7.onResponse)cG7.onResponse(n);
    }
    window.dontExit = false;
}
function CN(n) {
    if (cG7) {
        cG7.cPE--;
        var img = null;
        if (cG7.cTI && cG7.cTI[n]) {
            img = cG7.cTI[n];
            img.cmLD = true;
        }
        if (cG7.onError && (!img || !img.cmTO))cG7.onError(3, img);
    }
}
function c6(host, n) {
    if (cG3)cG3[host] = true;
    C0(n);
}
function CO(n) {
    if (cG7 && cG7.cTI && cG7.cTI[n] && !(cG7.cTI[n].cmLD)) {
        var img = cG7.cTI[n];
        img.cmTO = img.src;
        if (cG7.onError)cG7.onError(4, img.cmTO);
    }
}
function c8(host) {
    if (!cG3 || cG3[host])return true;
    var dt = new Date();
    if ((dt.getTime() - cG2[host]) > cG4)return true;
    return false;
}
function CV(host, url, cVBH) {
    if (!cVBH)cVBH = cm_ClientID;
    if ((!cG2[host] || c8(host)) && (cm_OffsiteImpressionsEnabled == false || cm_Avid != null || cm_AvidLoadTimedOut)) {
        var img = new Image();
        var i = cG1;
        cG7.cTI[cG1++] = img;
        if (!cG2[host]) {
            var dt = new Date();
            cG2[host] = dt.getTime();
            img.onload = new Function("if(c6)c6('" + host + "'," + i + ");");
        } else {
            img.onload = new Function("if(C0)C0(" + i + ");");
        }
        img.onerror = new Function("if(CN)CN(" + i + ");");
        if (cm_OffsiteImpressionsEnabled && (cm_Avid != null) && (cm_Avid != "none")) {
            url += "&avid=" + cm_Avid;
        }
        var limit = c4();
        if (url.length > limit) {
            url = url.substring(0, limit - 6) + "&err=O";
        }
        if (cG7.onTagSent)cG7.onTagSent(url, i);
        img.src = url;
        img.ci = cVBH;
        setTimeout('if(CO)CO(' + i + ');', cm_TimeoutSecs * 1000);
    } else {
        setTimeout('if(CV)CV("' + host + '","' + url + '","' + cVBH + '");', cG5);
    }
}
function c9(img, ci) {
    if (cI("CMDisabled") || (cI("CMOptout") ? cI("CMOptout").toUpperCase() == "OPT_OUT" : false) || (cI("ID") ? cI("ID").toUpperCase() == "OPT_OUT" : false))return;
    for (var h = 0; h < img.hosts.length; h++) {
        var url = img.cM5(img.hosts[h]);
        cG7.cPE++;
        CV(img.hosts[h], url, ci);
    }
}
function cC() {
    var result = null;
    if (!this.ul) {
        if (this.tid == "8" || (this.tid == "9" || this.tid == "10")) {
            this.ul = window.location.protocol + "//" + window.location.hostname;
        } else {
            this.ul = window.location.href;
        }
    }
    if (cG8) {
        cG8[cG8Index++] = this;
    } else {
        var request = this.getImgSrc(arguments[0], 1);
        c9(request, this.ci);
        result = request;
    }
    return result;
}
function cmLogError(e) {
}
function C4(src, tgt, compact) {
    if (!compact) {
        if (!src.rf) {
            if (!document.referrer)tgt.rf = ""; else tgt.rf = document.referrer;
        } else if (src != tgt)tgt.rf = src.rf;
        if (!src.ul || src.ul == "" || src.ul == "(none)")tgt.ul = window.location.href; else if (src != tgt)tgt.ul = src.ul;
        var ul = cG7.normalizeURL(tgt.ul, false);
        if (ul != "")tgt.ul = ul;
    }
}
function C5(tgt, compact) {
    if (cm_FirstPartyDetect && !compact) {
        if (cI("cmRS") || cI("TestSess")) {
            tgt.ts = "Y";
        } else {
            CB("TestSess", "Y");
            tgt.ts = cI("TestSess");
        }
        tgt.tp = cI("TestPerm");
        if (tgt.tp != "Y") {
            dt.setHours(dt.getHours() + 5);
            CB("TestPerm", "Y", dt.toGMTString());
            tgt.tp = cI("TestPerm");
        }
    }
}
function C6(tag, cV3, skipJSFParams) {
    var qs = "";
    if (tag.tid)qs += "tid=" + tag.tid;
    var isPV = (tag.tid == 1 || (tag.pc && tag.pc.charAt(0) == 'Y'));
    if (!tag.lp && isPV)tag.lp = cmLastPageID;
    for (var cOb in tag) {
        if (cOb == "qs" || cOb == "tid" || cOb == "topline")continue;
        if (!tag[cOb] || tag[cOb] == "" || tag[cOb].constructor == Function)continue;
        if (cV3 && cV3[cOb] && cV3[cOb] == tag[cOb])continue;
        if (qs != "")qs += "&";
        qs += cD(cOb) + "=" + cE(cD(tag[cOb]));
    }
    if (!tag.rs && tag.ci) {
        if (tag.pi && isPV)cG7.cM0[tag.ci] = tag.pi;
        if (tag.ul)cG7.uls[tag.ci] = tag.ul;
        if (tag.rf)cG7.rfs[tag.ci] = tag.rf;
    }
    if (cV3 && cm_SecureTags.indexOf("|" + tag.tid + "|") != -1)cV3.protocol = "https:";
    if (cm_JSFEnabled && !skipJSFParams) {
        cmJSFSetSessionCookies(false, tag.ci);
        qs += (qs != "" ? "&" : "") + cmCore_JSFParamEnabled + "=1";
        var userIdParamValue = cI(cm_JSFCoreCookieName);
        if (userIdParamValue) {
            userIdParamValue = userIdParamValue.split("&", 2)[0];
            if (userIdParamValue == "anonymous" || (cI("CMOptout") ? cI("CMOptout").toUpperCase() == "ANONYMOUS" : false)) {
                userIdParamValue = "1000000000000003";
            }
        }
        qs += "&" + cmCore_JSFParamUserID + "=" + (userIdParamValue != null ? userIdParamValue : "");
        qs += "&" + cmCore_JSFParamSessionID + "=" + cmJSFGetSessionValue(tag.ci);
        if (cmSpecCookiesCount > 0) {
            qs += "&" + cmCore_JSFParamSpecCookiesCount + "=" + cmSpecCookiesCount;
            qs += "&" + cmCore_JSFParamSpecCookiesNames + "=" + cmSpecCookieNames;
            qs += "&" + cmCore_JSFParamSpecCookiesValues + "=" + cmSpecCookieValues;
        }
        qs += "&" + cmCore_JSFParamValidFlag + "=" + cmJSFGetValidFlagValue(tag.ci);
    }
    if (cm_PartnerDataClientIDs && tag.tid) {
        try {
            var newTag = {};
            for (var key in tag) {
                var val = tag[key];
                if (typeof(val) != "function" && typeof(val) != "undefined")newTag[key] = val;
            }
            if (cV3) {
                for (var key in cV3) {
                    var val = cV3[key];
                    if (typeof(val) != "function" && typeof(val) != "undefined")newTag[key] = val;
                }
            }
            newTag.calculateTopLineAndReturnSegments = tag.calculateTopLineAndReturnSegments;
            var segmentsToSend = newTag.calculateTopLineAndReturnSegments();
            var partnerReqArray = _cmPartnerUtils.cmGetPartnerRequestArray(newTag, segmentsToSend);
            for (var i = 0; i < partnerReqArray.length; i++)c9(partnerReqArray[i]);
        } catch(e) {
        }
    }
    return qs;
}
function C8(cV3) {
    var cm_pl = location.protocol;
    if (cV3 && cV3.protocol)cm_pl = cV3.protocol;
    if (cm_pl != "http:" && cm_pl != "https:")cm_pl = "http:";
    return cm_pl;
}
function c0() {
    var a = arguments;
    C4(this, this, a[0]);
    C5(this, a[0]);
    var cV3 = {};
    var qs = C6(this, cV3);
    var req = new CQ(C8(cV3), cm_HOST, qs);
    return a[1] ? req : req.cM5();
}
function C7() {
    var cV3,first,p,a,pl,lim,len,l,i,tq;
    if (!cG8 || cG8.length < 2)return null;
    cV3 = cG8[0];
    first = cG8[1];
    cV3.ci = first.ci;
    for (i = 1; i < cG8.length; i++) {
        if (cV3.ci.indexOf(cG8[i].ci) == -1) {
            cV3.ci += ";" + cG8[i].ci;
        }
        if (cm_SecureTags.indexOf("|" + cG8[i].tid + "|") != -1)cV3.protocol = "https:";
    }
    for (i = 0; i < cG0.length; i++) {
        p = cG0[i];
        if (!cV3[p])cV3[p] = first[p];
    }
    a = arguments;
    C4(first, cV3, a[0]);
    C5(cV3, a[0]);
    pl = C8(cV3);
    img = new CQ(pl, cm_HOST);
    img.qs = C6(cV3);
    lim = c4();
    len = 0;
    for (var h = 0; h < img.hosts.length; h++) {
        l = pl.length + img.hosts[h].length + img.qs.length;
        if (l > len)len = l;
    }
    for (i = 1; i < cG8.length; i++) {
        tq = C6(cG8[i], cV3, true);
        if (i > 1 && len + tq.length + 1 > lim) {
            for (j = 1; j < cG8.length - i + 1; j++)cG8[j] = cG8[j + i - 1];
            cG8.length = cG8.length - i + 1;
            break;
        }
        len += tq.length + 1;
        img.qs += "&" + tq;
    }
    if (i == cG8.length)cG8 = null;
    return img;
}
function _cm() {
    var i,a = arguments;
    this.ci = cm_ClientID;
    for (i = 0; i < a.length; i++)this[a[i]] = a[++i];
    this.write = cC;
    this.getImgSrc = c0;
    this.writeImg = cC;
    this.st = cm_ClientTS;
    this.vn1 = "4.7.4";
    if (cF(5.5) || !cF(0)) {
        var ec = (cm_UseUTF8 && encodeURIComponent) || cGU ? "utf-8" : cG6.charset;
        if (!ec)ec = cG6.defaultCharset;
        if (!ec)ec = cG6.characterSet;
        this.ec = ec;
    }
    this.topline = [];
}
function cD(s) {
    var z = "";
    s = z + (!s ? "" : s);
    return s.split("'").join(z).split("\"").join(z).split("\r").join(z).split("\n").join(z);
}
function cE(s) {
    var i = 0,j;
    while (s.charAt(i) == " " && i != s.length)i++;
    j = s.length - 1;
    while (s.charAt(j) == " " && j != 0)j--;
    s = s.substring(i, j + 1);
    if (cm_UseUTF8 && encodeURIComponent)s = encodeURIComponent(s); else {
        s = preEscape(s);
        s = escape(s);
        var regularExpression = new RegExp("%25u00", "g");
        s = s.replace(regularExpression, "%u00");
    }
    s = s.split("+").join("%2B");
    return s;
}
function preEscape(str) {
    for (var i = 160; i < 256; i++) {
        var regularExpression = new RegExp(String.fromCharCode(i), "g");
        str = str.replace(regularExpression, "%u00" + i.toString(16));
    }
    return str;
}
function cF(ver) {
    var i = cGM.indexOf("MSIE");
    if (i != -1)return(parseFloat(cGM.substring(i + 5)) >= ver);
    return false;
}
function CD(ver) {
    return(cGN.indexOf("Gecko") != -1 && parseInt(cGM) >= ver);
}
function cI(nm, skey, cV5) {
    var dc = cG6.cookie;
    var cV4 = cJ(nm, dc, ";");
    if (!skey || !cV4) {
        if (!cV4 && cV5 != null) {
            return cV5;
        }
        return cV4;
    }
    cV4 = cJ(skey, cV4, "&");
    if (!cV4 && cV5 != null) {
        return cV5;
    }
    return unescape(cV4);
}
function CL() {
    var cookies,dc,nv,i,c = 0;
    dc = cG6.cookie;
    if (dc) {
        cookies = dc.split(";");
        c = cookies.length;
        for (i = 0; i < cookies.length; i++) {
            nv = cookies[i].split("=");
            if (nv.length < 2 || nv[1] == null || nv[1] == "") {
                c--;
            }
        }
    }
    return c;
}
function CB(nm, val, expires, domain) {
    var err,len,v,dc = cG6.cookie;
    err = null;
    len = val.length + 1;
    if (!cI(nm)) {
        len += nm.length;
    }
    if (len > 4096)err = 1; else if (dc) {
        if (CL() >= 50)err = 2;
    }
    if (err) {
        if (cG7.onError)cG7.onError(err, name);
        return false;
    }
    v = nm + "=" + val + ";path=/";
    if (domain)v += ";domain=" + domain;
    if (expires)v += ";expires=" + expires;
    cG6.cookie = v;
    return true;
}
function cmSetSubCookie(nm, skey, value, expires, domain) {
    var currentCookieVal = cI(nm);
    var newCookieVal;
    if (!currentCookieVal) {
        newCookieVal = skey + "=" + value;
    } else {
        var sep = '&';
        var pfx = skey + "=";
        var begin = currentCookieVal.indexOf(pfx);
        if (begin >= 0) {
            if (begin > 0 && currentCookieVal.charAt(begin - 1) != sep) {
                begin = currentCookieVal.indexOf(sep + pfx);
                if (begin >= 0) {
                    begin++;
                }
            }
        }
        if (begin >= 0) {
            var valueOffset = begin + skey.length + 1;
            var end = currentCookieVal.indexOf(sep, valueOffset);
            if (end < 0) {
                end = currentCookieVal.length;
            }
            newCookieVal = currentCookieVal.substring(0, valueOffset) + value + currentCookieVal.substring(end);
        } else {
            newCookieVal = currentCookieVal + sep + skey + "=" + value;
        }
    }
    CB(nm, newCookieVal, expires, domain);
}
function CC(nm, domain) {
    var v = cI(nm);
    if (v != null) {
        var dt = new Date();
        dt.setYear(1973);
        var v = nm + "=;path=/;expires=" + dt.toGMTString();
        if (domain)v += ";domain=" + domain;
        cG6.cookie = v;
    }
    return v;
}
function cJ(nm, src, sep) {
    var pfx,s,begin,end,obj = null;
    pfx = nm + "=";
    s = sep + ' ';
    begin = src.indexOf(s + pfx);
    if (begin == -1) {
        s = sep;
        begin = src.indexOf(s + pfx);
    }
    if (begin == -1) {
        begin = src.indexOf(pfx);
        if (begin != 0) {
            return null;
        }
    } else {
        begin += s.length;
    }
    end = src.indexOf(s, begin);
    if (end == -1) {
        end = src.length;
    }
    return src.substring(begin + pfx.length, end);
}
function cK(elt, type, handle, fName, f) {
    if (handle) {
        var event = handle.toString();
        var tempFName = fName.substring(0, fName.indexOf("("));
        if (event.indexOf(tempFName) == -1) {
            if (cGU && event.indexOf("function " + "(") == 0) {
                if (type == "onload") {
                    fName = event.substring(event.indexOf("{"), event.length) + ";" + fName + ";";
                } else {
                    fName = fName + ";" + event.substring(event.indexOf("{"), event.length);
                }
            } else {
                elt["_c_" + type] = handle;
                if (type == "onload") {
                    fName = "if(!e)var e=null;var ret=this._c_" + type + "(" + (cF(5) ? "" : "e") + ");" + fName + ";return ret;"
                } else {
                    fName = "if(!e)var e=null;var tempReturn=this._c_" + type + "(" + (cF(5) ? "" : "e") + ");" + fName + ";return tempReturn";
                }
            }
            var newfunc = new Function("e", fName);
            return newfunc;
        } else {
            return handle;
        }
    } else {
        return f;
    }
}
function CG(e) {
    var e;
    if (cF(4)) {
        if (window.event) {
            e = window.event.srcElement;
        } else {
            return null;
        }
    } else if (e) {
        if (CD(5)) {
            e = e.currentTarget;
        } else {
            e = e.target;
        }
    }
    return e;
}
function CU(cm, cVBH, pi, dest, ref) {
    var ul,rf;
    cm.pi = pi ? pi : c1(cVBH);
    if (cGQ) {
        if (dest || ref) {
            cm.ul = dest ? dest : "";
            cm.rf = ref ? ref : "";
        } else {
            ul = CS(cVBH);
            rf = CT(cVBH);
            if (cm.pi == "" || ul.indexOf("cm_") > 0 || (rf != "" && rf.indexOf(window.location.protocol + "//" + window.location.host) != 0)) {
                cm.ul = ul;
                cm.rf = rf;
            }
        }
    }
}
function cL(t1, t3, fname, cVB, url, field, resent, pi, dest, ref) {
    var cm = new _cm("tid", "10");
    CU(cm, cm.ci, pi, dest, ref);
    cm.st = t1;
    cm.ti = t3;
    cm.fo = fname;
    cm.ac = cVB;
    cm.hr = url;
    cm.fi = field;
    if (resent)cm.rs = "Y";
    cm.write(1);
}
function cM(t1, ti, name, href, resent, pi, dest, ref) {
    var cm = new _cm("tid", "8");
    CU(cm, cm.ci, pi, dest, ref);
    cm.st = t1;
    cm.ti = ti;
    cm.nm = name;
    cm.hr = href;
    var cm_crIndex = href.indexOf("cm_cr=");
    var cm_meIndex = href.indexOf("cm_me=");
    if (cm_crIndex > -1) {
        var tempIndex = href.indexOf("&", cm_crIndex);
        if (tempIndex == -1) {
            cm.cm_cr = href.substring(cm_crIndex + 6);
        } else {
            cm.cm_cr = href.substring(cm_crIndex + 6, tempIndex);
        }
    }
    if (cm_meIndex > -1) {
        var tempIndex = href.indexOf("&", cm_meIndex);
        if (tempIndex == -1) {
            cm.cm_me = href.substring(cm_meIndex + 6);
        } else {
            cm.cm_me = href.substring(cm_meIndex + 6, tempIndex);
        }
    }
    if (resent)cm.rs = "Y";
    cm.write(1);
}
function cN(t1, t2, cx, t4, resent, pi) {
    var cm = new _cm("tid", "11");
    cm.pi = pi ? pi : c1(cm.ci);
    cm.st = t1;
    cm.lc = t2;
    cm.lx = t4;
    cm.cx = cx;
    if (resent)cm.rs = "Y";
    cm.write(1);
}
function CM(href) {
    var n,len,a,q;
    if ((n = href.indexOf("?")) == -1)n = href.lastIndexOf("/");
    if (n != -1) {
        len = href.indexOf("#", n);
        if (len == -1)len = href.length;
        while (n != -1 && n < len) {
            n = href.indexOf("cm_", n);
            if (n != -1) {
                a = href.indexOf("&", n);
                if (a == -1)a = len;
                q = href.indexOf("=", n);
                if (q != -1 && q < a)this[href.substring(n, q)] = href.substring(q + 1, a);
                n = a;
            }
        }
    }
}
function CK(href, trackSP, trackRE, trackCR, trackME) {
    var cm,link,sp,re,cr,me;
    if ((trackSP || trackRE || trackCR || trackME) && href) {
        cm = new _cm("tid", "9");
        link = new CM(CP(href));
        if (trackSP) {
            sp = cm.cm_sp_o = link.cm_sp_o;
            if (!sp)sp = cm.cm_sp = link.cm_sp;
        }
        if (trackRE) {
            re = cm.cm_re_o = link.cm_re_o;
            if (!re)re = cm.cm_re = link.cm_re;
        }
        if (trackCR) {
            if (href.indexOf("#") == -1) {
                cr = cm.cm_cr = link.cm_cr;
            }
        }
        if (trackME) {
            me = cm.cm_me = link.cm_me;
        }
        if (sp || re || cr || me) {
            cm.pi = c1(cm.ci);
            cm.st = cm_ClientTS;
            if (typeof cmCheckIgnoreImpression == 'function') {
                if (cmCheckIgnoreImpression(sp, re, cr, me)) {
                    cm.write(1);
                }
            } else {
                cm.write(1);
            }
        }
    }
}
function CH(t1, ti, msg, resent, pi) {
    if (msg != cGL) {
        var cm = new _cm("tid", "12");
        cm.pi = pi ? pi : c1(cm.ci);
        cm.st = t1;
        cm.ti = ti;
        if (resent)cm.rs = "Y";
        cm.er = msg;
        cm.write(1);
        cGL = cm_FormError;
    }
}
function cmFormBlurRecord(e) {
    if (e.cmFormEleMemValue != cmFormElementValue(e) && e.cmFormEleMemValue != null) {
        cmFormReportInteraction(e);
    }
    e.form.cmEleValue = -1;
}
function cmFormElementOnclickEvent() {
    try {
        var q;
        var cFE = cmFormElementValue(this);
        if ((cmFormC1.indexOf(this.type) >= 0) || (this.cmFormEleMemValue != cFE)) {
            if (this.type == "radio") {
                for (q = 0; q < this.form.elements.length; q++) {
                    if (this.form.elements[q].cM2 == this.cM2) {
                        this.form.elements[q].cmFormEleMemValue = null;
                    }
                }
            }
            this.cmFormEleMemValue = cFE;
            cmFormReportInteraction(this);
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cX) {
            return this.cX();
        }
    } catch(e) {
        cmLogError(e);
    }
}
function cmFormElementOnfocusEvent() {
    try {
        this.form.cmEleValue = this.cM2;
        this.cmFormEleMemValue = cmFormElementValue(this);
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cmOnFocus) {
            return this.cmOnFocus();
        }
    } catch(e) {
        cmLogError(e);
    }
}
function cmFormElementOnblurEvent() {
    try {
        cmFormBlurRecord(this);
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cmOnBlur) {
            return this.cmOnBlur();
        }
    } catch(e) {
        cmLogError(e);
    }
}
function cmFormElementOnchangeEvent() {
    try {
        cmFormReportInteraction(this);
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cmOnChange) {
            return this.cmOnChange();
        }
    } catch(e) {
        cmLogError(e);
    }
}
function cmFormElementValue(e) {
    var x;
    if (e.type == "checkbox")return e.checked; else if ((cmFormC3.indexOf(e.type) >= 0) && e.options) {
        var sel_val = "";
        for (x = 0; x < e.options.length; x++) {
            if (e.options[x].selected == true)sel_val = sel_val + e.options[x].index;
        }
        return sel_val;
    } else if (cmFormC2.indexOf(e.type) >= 0 || e.type == "file" || e.type == "radio") {
        return e.value;
    } else {
        return null;
    }
}
function cO(cVC, cVB) {
    var dt,url,x,cFa = "";
    var cF = null;
    cVB = cVC + ":" + cVB;
    if (cVC != -1) {
        if (cG6.forms[cVC]) {
            cF = cG6.forms[cVC];
            var cFa = cF.attributes;
            url = cF.action ? cF.action : cFa.action.nodeValue ? cFa.action.nodeValue : cFa.getNamedItem('action').value ? cFa.getNamedItem('action').value : "";
        }
    }
    cGD = cG6.cmTagCtl.normalizeFORM(cGD);
    var pgID = c1(cm_ClientID);
    if (cm_FormPageID && pgID != "") {
        var frmAr = cGD.split(";");
        cGD = "";
        for (x = 0; x < frmAr.length - 1; x++) {
            cGD += pgID.split(":").join("").split(";").join("") + "_" + frmAr[x] + ";";
        }
        cm_FormPageID = false;
    }
    if (cV(url) && (cVC != "-1" || (cVC == "-1" && cmSubmitFlag == false))) {
        dt = new Date();
        cGH = dt.getTime();
        cGF = cVB;
        cGE = cG7.normalizeURL(url, true);
        cL(cm_ClientTS, cGH, cGD, cGF, cGE, cGC, false);
        cGG = cGC;
        cGC = "";
        if ((cF) && (typeof cmCustomFormSubmitHandler == 'function')) {
            cmCustomFormSubmitHandler(cF, cVB);
        }
    } else {
        cGF = "";
    }
}
function cmFormOnresetEvent() {
    var x;
    try {
        cO(this.cM1, "R");
    } catch(e) {
        cmLogError(e);
    }
    try {
        for (x = 0; x < cG6.forms[this.cM1].elements.length; x++) {
            cG6.forms[this.cM1].elements[x].cmFormEleMemValue = false;
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cQ) {
            return this.cQ();
        }
    } catch(e) {
        cmLogError(e);
    }
}
function cmFormOnsubmitEvent(e2) {
    try {
        if (this.cmEleValue > -1) {
            cmFormBlurRecord(this.elements[this.cmEleValue]);
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cM1 >= 0 && this.cmSubmitIndex == false) {
            cmSubmitFlag = true;
            this.cmSubmitIndex = true;
            cO(this ? this.cM1 : -1, "S");
            CE();
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cP) {
            return this.cP();
        }
    } catch(e) {
        cmLogError(e);
    }
    cmJSFPMigrateLink(this, "action");
}
function cmFormReportInteraction(e) {
    var cmElementName = cG6.cmTagCtl.normalizeFIELDS(e.name ? e.name : e.id ? e.id : "");
    var cmTempFieldSeq = cGC + e.form.cM1 + ":" + e.cM2 + ":" + cmElementName.split(":").join("|").split(";").join("|") + ";";
    if (cmTempFieldSeq.length < 1000) {
        cGC = cmTempFieldSeq;
    }
}
function cmFormSubmit() {
    cmJSFPMigrateLink(this, "action");
    try {
        if (this.cmEleValue > -1) {
            cmFormBlurRecord(this.elements[this.cmEleValue]);
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        if (this.cM1 >= 0 && this.cmSubmitIndex == false) {
            cmSubmitFlag = true;
            this.cmSubmitIndex = true;
            cO(this ? this.cM1 : -1, "S");
            CE();
        }
    } catch(e) {
        cmLogError(e);
    }
    try {
        this.cmSubmit();
    } catch(e) {
        cmLogError(e);
    }
}
cG6.cmTagCtl.normalizeFORM = function(form) {
    return form;
};
cG6.cmTagCtl.normalizeFIELDS = function(field) {
    return field;
};
function cU() {
    if (cm_SkipHandlerReg.indexOf("F") == -1) {
        var i,form,cV9,j,e,rdname,ei;
        for (i = 0; i < cG6.forms.length; i++) {
            form = cG6.forms[i];
            ei = 0;
            if (!form.cM1 && !form.cmEleValue && !form.cmSubmitIndex) {
                form.cM1 = i;
                form.cmEleValue = -1;
                form.cmSubmitIndex = false;
                form.radiogroup = {"key":"value"};
                try {
                    if (cF(5) && !cF(8)) {
                        var cm_FA = form.attributes;
                        cV9 = cm_FA.name ? cm_FA.name.nodeValue : cm_FA.id ? cm_FA.id.nodeValue : "UNDEFINED";
                    } else if (form.attributes.getNamedItem) {
                        cV9 = form.attributes.getNamedItem('name').value;
                    } else {
                        cV9 = form.name;
                    }
                } catch(e) {
                    cV9 = "UNDEFINED";
                    cmLogError(e);
                }
                cGD += cV9 + ":" + i + ";";
                try {
                    form.cmSubmit = form.submit;
                    form.submit = cmFormSubmit;
                } catch(e) {
                    cmLogError(e);
                }
                try {
                    if (form.onsubmit && typeof(form.onsubmit) == "function") {
                        form.cP = form.onsubmit;
                    }
                    form.onsubmit = cmFormOnsubmitEvent
                } catch(e) {
                    cmLogError(e);
                }
                try {
                    if (form.onreset && typeof(form.onreset) == "function") {
                        form.cQ = form.onreset;
                    }
                    form.onreset = cmFormOnresetEvent;
                } catch(e) {
                    cmLogError(e);
                }
                for (j = 0; j < form.elements.length; j++) {
                    e = form.elements[j];
                    if (!e.cM1 && !e.cM2 && !e.cmFormEleMemValue) {
                        e.cM1 = i;
                        e.cM2 = ei;
                        e.cmFormEleMemValue = null;
                        ei++;
                        if (e.type == "radio") {
                            rdname = e.name ? e.name : e.id ? e.id : "";
                            if (rdname != "") {
                                if (form.radiogroup[rdname]) {
                                    e.cM2 = form.radiogroup[rdname];
                                } else {
                                    form.radiogroup[rdname] = e.cM2;
                                }
                            }
                        }
                        if (cmFormC1.indexOf(e.type) >= 0 || e.type == "checkbox" || e.type == "radio") {
                            try {
                                if (e.onclick && typeof(e.onclick) == "function") {
                                    e.cX = e.onclick;
                                }
                                e.onclick = cmFormElementOnclickEvent;
                            } catch(e) {
                                cmLogError(e);
                            }
                        }
                        if (cmFormC2.indexOf(e.type) >= 0 || cmFormC3.indexOf(e.type) >= 0) {
                            try {
                                if (e.onfocus && typeof(e.onfocus) == "function") {
                                    e.cmOnFocus = e.onfocus;
                                }
                                e.onfocus = cmFormElementOnfocusEvent;
                                if (e.onblur && typeof(e.onblur) == "function") {
                                    e.cmOnBlur = e.onblur;
                                }
                                e.onblur = cmFormElementOnblurEvent;
                            } catch(e) {
                                cmLogError(e);
                            }
                        }
                        if (e.type == "file") {
                            try {
                                if (e.onchange && typeof(e.onchange) == "function") {
                                    e.cmOnChange = e.onchange;
                                }
                                e.onchange = cmFormElementOnchangeEvent;
                            } catch(e) {
                                cmLogError(e);
                            }
                        }
                    }
                }
            }
        }
    }
}
function cV(path) {
    if (cm_TrackLink == true || cm_TrackLink == "A")return true; else {
        if (cm_TrackLink == "E" && path.indexOf("/") != 0)return true;
        var de;
        if ((de = cm_DownloadExtensions) != null) {
            var p = path.lastIndexOf(".");
            if (p != -1) {
                var ext = path.substring(p);
                for (var e = 0; e < de.length; e++) {
                    if (ext == de[e])return true;
                }
            }
        }
        return false;
    }
}
function cW(e) {
    CI();
    var e = CG(e);
    if (e)C9(e);
    CA(1);
    CJ(1);
    CE();
}
function C9(e) {
    cGI = "";
    cGJ = "";
    cGK = "";
    var type = e.tagName.toUpperCase();
    if (type == "AREA") {
        cGJ = e.href ? e.href : "";
        var p = e.parentElement ? e.parentElement : e.parentNode;
        if (p != null)cGI = p.name ? p.name : "";
    } else {
        while (type != "A" && type != "HTML") {
            if (!e.parentElement)e = e.parentNode; else e = e.parentElement;
            if (e)type = e.tagName.toUpperCase();
        }
        if (type == "A") {
            cGJ = e.href ? e.href : "";
            cGI = e.name ? e.name : "";
        }
    }
    if (e.getAttribute) {
        var man_cm_re = e.getAttribute("manual_cm_re");
        if (man_cm_re) {
            cGJ = cGJ.split("#");
            cGJ[0] = cGJ[0] + ((cGJ[0].indexOf("?") > -1) ? "&" : "?") + "cm_re=" + man_cm_re;
            cGJ = cGJ.join("#");
        }
        var man_cm_sp = e.getAttribute("manual_cm_sp");
        if (man_cm_sp) {
            cGJ = cGJ.split("#");
            cGJ[0] = cGJ[0] + ((cGJ[0].indexOf("?") > -1) ? "&" : "?") + "cm_sp=" + man_cm_sp;
            cGJ = cGJ.join("#");
        }
    }
    cGJ = cG7.normalizeURL(cGJ, true);
    if (cV(cGJ) == true) {
        var dt = new Date();
        cGK = dt.getTime();
        if (typeof cmCustomLinkClickHandler == 'function') {
            cmCustomLinkClickHandler(e);
        }
        cM(cm_ClientTS, cGK, cGI, cGJ, false);
    } else {
        cGJ = "";
    }
    cmJSFPMigrateLink(e, "href");
}
function cmAddNewEvent(obj, type, fn) {
    if (obj.attachEvent && (obj['e' + type + fn] === undefined)) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() {
            obj['e' + type + fn](window.event);
        };
        obj.attachEvent('on' + type, obj[type + fn]);
    } else if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    }
}
function cX(phase) {
    CI();
    var i,lnk,imp,trackSP,trackRE,trackCR,trackME;
    imp = cm_TrackImpressions;
    trackSP = (imp.indexOf("S") != -1);
    trackRE = (imp.indexOf("R") != -1);
    trackCR = (imp.indexOf("C") != -1);
    trackME = (imp.indexOf("C") != -1);
    for (i = 0; i < cG6.links.length; i++) {
        lnk = cG6.links[i];
        if (cm_SkipHandlerReg.indexOf("L") == -1) {
            cmAddNewEvent(lnk, "click", cW);
        }
        if (phase == "onload") {
            var tempLinkHref = lnk.href;
            if (lnk.getAttribute("manual_cm_re")) {
                tempLinkHref = tempLinkHref.split("#");
                tempLinkHref[0] = tempLinkHref[0] + ((tempLinkHref[0].indexOf("?") > -1) ? "&" : "?") + "cm_re=" + lnk.getAttribute("manual_cm_re");
                tempLinkHref = tempLinkHref.join("#");
            }
            if (lnk.getAttribute("manual_cm_sp")) {
                tempLinkHref = tempLinkHref.split("#");
                tempLinkHref[0] = tempLinkHref[0] + ((tempLinkHref[0].indexOf("?") > -1) ? "&" : "?") + "cm_sp=" + lnk.getAttribute("manual_cm_sp");
                tempLinkHref = tempLinkHref.join("#");
            }
            if (!lnk.cmImpressionSent) {
                CK(tempLinkHref, trackSP, trackRE, trackCR, trackME);
                lnk.cmImpressionSent = 1;
            }
        }
    }
    CJ(1);
}
function cY(e) {
    var dt = new Date();
    cmT2 = dt.getTime();
    CH(cm_ClientTS, cmT2, cm_FormError, false);
    if (!cGS && (cF(4) || CD(5))) {
        window.cX("onload");
        cU();
    }
    cGB = null;
}
function cZ(e) {
    cG3 = null;
    CI();
    delay = false;
    for (x = 0; x < document.forms.length; x++) {
        try {
            if (cG6.forms[x].cmEleValue > -1) {
                cmFormBlurRecord(document.forms[x].elements[document.forms[x].cmEleValue]);
            }
        } catch(e) {
            cmLogError(e);
        }
        try {
            if (cGC != "") {
                delay = true;
                cO(-1, "U");
            }
        } catch(e) {
            cmLogError(e);
        }
    }
    CA(0);
    CH(cm_ClientTS, cmT3, cm_FormError, false);
    CJ(1);
    if (delay) {
        window.dontExit = true;
        var d1 = new Date();
        var d2 = new Date();
        for (; window.dontExit && (d2 - d1 < 1000);) {
            d2 = new Date();
        }
    }
    CE();
    if (cm_UseCookie && cG7.cPE == 0) {
        var pi = escape(c1(cm_ClientID));
        CB("cmRS", "t3=" + cmT3 + "&pi=" + pi);
    }
    if (cG7.onUnload)cG7.onUnload();
    if (cF(5) && !cF(5.5) && window.parent != window)cG7.cTI = null; else {
        if (!cGU) {
            for (var i = 0; i < cG7.cTI.length; i++) {
                cG7.cTI[i].onload = null;
                cG7.cTI[i].onerror = null;
            }
        }
    }
}
function CA(force) {
    var dt = new Date();
    var cx = dt.getTime();
    if (cm_TrackTime && (cmT3 == -1 || force == 1 || (cx - cmT3) > 10000)) {
        cN(cm_ClientTS, cmT2, cx, cGA, false);
    }
    cmT3 = cx;
}
function CE() {
    if (cm_UseCookie) {
        var cVF,cVG,pg,cVD,cVE = "";
        cVF = cGA ? "&t4=" + cGA : "";
        cVG = (cGJ != "") ? "&lti=" + cGK + "&ln=" + escape(cGI) + "&hr=" + escape(cGJ) : "";
        pg = {};
        CU(pg, cm_ClientID);
        var jsfpdata = "";
        if (cm_JSFEnabled) {
            jsfpdata = "&cjen=1";
        }
        cVD = "&t1=" + cm_ClientTS + "&t2=" + cmT2 + "&t3=" + cmT3 + cVF + cVG + "&fti=" + cGH + "&fn=" + escape(cGD) + "&ac=" + cGF + "&fd=" + escape(cGG) + "&uer=" + escape(cm_FormError) + "&fu=" + escape(cGE) + "&pi=" + escape(pg.pi) + "&ho=" + escape(cm_HOST) + "&ci=" + escape(cm_ClientID);
        if (pg.ul && pg.rf && pg.ul.length + pg.rf.length < cGO)cVE = "&ul=" + escape(pg.ul) + "&rf=" + escape(pg.rf);
        if (!CB("cmRS", cVD + cVE + jsfpdata))if (!CB("cmRS", cVD + jsfpdata))CB("cmRS", "t3=" + cmT3 + "&pi=" + escape(pg.pi) + jsfpdata);
    }
}
function cmSetAvid(id) {
    clearTimeout(cm_AvidLoadTimer);
    if (id) {
        cm_Avid = id;
    } else {
        cm_Avid = "none";
    }
    CB("CMAVID", cm_Avid);
    cm_AvidLoadTimedOut = false;
}
function cmJSFConvertSAtoCM(value) {
    var len = value.length;
    var lenSA = 22;
    var lenCM = 23;
    if (len < 19)return null;
    if (value.charAt(0) != "U" && value.charAt(0) != "u")return null;
    if (len < lenSA) {
        value = value + value.substring(len - (lenSA - len), len);
    }
    var result = "99";
    result = result + value.substring(1, lenCM - 1);
    return result;
}
function cmJSFSetSessionCookies(reset, cVBHs) {
    if (!cm_JSFEnabled)return;
    var splitClientIDs = cVBHs.split(";");
    for (var n = 0; n < splitClientIDs.length; n++) {
        cmJSFSetSingleSessionCookie(reset, splitClientIDs[n]);
    }
}
function debugReadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function cmJSFSetSingleSessionCookie(reset, cVBH, noRecurse) {
    if (!cm_JSFEnabled)return;
    if (cI("CMDisabled") || (cI("CMOptout") ? cI("CMOptout").toUpperCase() == "OPT_OUT" : false) || (cI("ID") ? cI("ID").toUpperCase() == "OPT_OUT" : false))return;
    var fpCookieVal = cI(cm_JSFCoreCookieName);
    if (fpCookieVal == null) {
        if (!cmJSFDoMigrateCookies()) {
            fpCookieVal = cmJSFCreateUserId();
            if (cm_JSFTrackClients) {
                fpCookieVal += "&ci=" + cVBH;
            }
            CB(cm_JSFCoreCookieName, fpCookieVal, cmCookieExpDate, cm_JSFPCookieDomain);
        }
        if (!noRecurse) {
            cmJSFSetSingleSessionCookie(true, cVBH, true);
        }
        cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession, false, cVBH);
        cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor, true, cVBH);
        return;
    }
    if (cm_JSFTrackClients) {
        var knownClientIds = cJ("ci", fpCookieVal, "&");
        knownClientIds = knownClientIds && unescape(knownClientIds);
        if (knownClientIds && knownClientIds.indexOf(cVBH) < 0) {
            cmSetSubCookie(cm_JSFCoreCookieName, "ci", knownClientIds + "," + cVBH, cmCookieExpDate, cm_JSFPCookieDomain);
            knownClientIds = cJ("ci", fpCookieVal, "&");
            knownClientIds = knownClientIds && unescape(knownClientIds);
            if (knownClientIds.indexOf(cVBH) >= 0) {
                if (!noRecurse) {
                    cmJSFSetSingleSessionCookie(true, cVBH, true);
                }
                cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession, false, cVBH);
                cmJSFSetValidFlagSingleValue(cmValidFlag_NewVisitor, true, cVBH);
                return;
            }
        }
    }
    var sessionCookieExists = (cmJSFGetSessionLoginCookieValue(cVBH) != null);
    if (!sessionCookieExists) {
        if (cmJSFCombineSessionCookies(cVBH)) {
            sessionCookieExists = (cmJSFGetSessionLoginCookieValue(cVBH) != null);
        }
    }
    if (!sessionCookieExists && !reset) {
        if (!noRecurse) {
            cmJSFSetSingleSessionCookie(true, cVBH, true);
        }
        cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession, true, cVBH);
        return;
    }
    var dt = new Date();
    var cmSessionTime = dt.getTime();
    var cmSessionExpTime = cmSessionTime + cm_JSFSessionTimeout * 1000;
    var isSessionExpired = cmJSFIsSessionExpired(cmJSFGetSessionExpireCookieValue(cVBH));
    if ((reset != null && reset == true) || isSessionExpired) {
        var cmTimeoutStr = cmSessionTime.toString();
        if (cmTimeoutStr.length < 10) {
            while (cmTimeoutStr.length < 10)cmTimeoutStr = "0" + cmTimeoutStr;
        } else cmTimeoutStr = cmTimeoutStr.substring(0, 10);
        cmJSFSetSessionLoginCookieValue(cVBH, cmTimeoutStr);
        if (isSessionExpired)cmJSFSetValidFlagSingleValue(cmValidFlag_SessionReset, true, cVBH); else cmJSFSetValidFlagSingleValue(cmValidFlag_NewSession, true, cVBH);
        if (cm_JSFSessionType == "T")cmJSFSetSessionExpiresCookieValue(cVBH, cmSessionExpTime.toString());
    }
    if (cm_JSFSessionType == "I")cmJSFSetSessionExpiresCookieValue(cVBH, cmSessionExpTime.toString());
}
function cmJSFIsSessionExpired(cookieExpValue) {
    if (cookieExpValue == null)return false;
    var dt = new Date();
    if (dt.getTime() > cookieExpValue)return true; else return false;
}
function cmJSFCreateUserId() {
    var currDate = new Date();
    var rand1 = Math.random();
    if (rand1 == 0)rand1 = Math.random();
    var rand2 = Math.random();
    if (rand2 == 0)rand2 = Math.random();
    var userId = rand1.toString().substring(2, 4) + rand2.toString().substring(2, 12) + currDate.getTime().toString();
    var len = userId.length;
    var lenCM = 23;
    if (len < lenCM) {
        userId = userId + userId.substring(len - (lenCM - len), len);
    }
    if (len > lenCM) {
        userId = userId.substring(0, lenCM);
    }
    return userId;
}
function cmJSFSetValidFlagValue(value, append, cVBHs) {
    if (!cm_JSFEnabled)return;
    var splitClientIDs = cVBHs.split(";");
    for (var n = 0; n < splitClientIDs.length; n++) {
        cmJSFSetValidFlagSingleValue(value, append, splitClientIDs[n]);
    }
}
function cmJSFSetValidFlagSingleValue(value, append, cVBH) {
    var validFlag = null;
    var validFlagValueStr = cmJSFGetSessionValidFlagCookieValue(cVBH);
    if (validFlagValueStr) {
        var validFlagValue = parseInt(validFlagValueStr);
        if (!isNaN(validFlagValue))validFlag = validFlagValue;
    }
    if (validFlag == null)validFlag = cmValidFlag_SessionContinue;
    if (append) {
        if (value == cmValidFlag_NewSession)validFlag &= ~cmValidFlag_SessionReset;
        if (value == cmValidFlag_SessionReset)validFlag &= ~cmValidFlag_NewSession;
        validFlag |= value;
    } else {
        validFlag = value;
    }
    validFlag |= cmValidFlag_SessionContinue;
    cmJSFSetSessionValidFlagCookieValue(cVBH, validFlag);
}
function cmJSFCreateCombinedSessionCookieName(cVBH) {
    return cVBH + "_clogin";
}
function cmJSFCombineSessionCookies(cVBH) {
    var loginValue = cI(cVBH + "_login");
    var expiresValue = cI(cVBH + "_expires");
    var validFlagValue = cI(cVBH + "_valid");
    if (loginValue != null && expiresValue != null & validFlagValue != null) {
        var combinedCookieStr = "l=" + loginValue + "&e=" + expiresValue + "&v=" + validFlagValue;
        CB(cmJSFCreateCombinedSessionCookieName(cVBH), combinedCookieStr, null, cm_JSFPCookieDomain);
        CC(cVBH + "_login", cm_JSFPCookieDomain);
        CC(cVBH + "_expires", cm_JSFPCookieDomain);
        CC(cVBH + "_valid", cm_JSFPCookieDomain);
        return true;
    }
    return false;
}
function cmJSFSetSessionLoginCookieValue(cVBH, value) {
    cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH), "l", value, null, cm_JSFPCookieDomain);
}
function cmJSFSetSessionExpiresCookieValue(cVBH, value) {
    cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH), "e", value, null, cm_JSFPCookieDomain);
}
function cmJSFSetSessionValidFlagCookieValue(cVBH, value) {
    cmSetSubCookie(cmJSFCreateCombinedSessionCookieName(cVBH), "v", value, null, cm_JSFPCookieDomain);
}
function cmJSFGetSessionLoginCookieValue(cVBH) {
    return cI(cmJSFCreateCombinedSessionCookieName(cVBH), "l");
}
function cmJSFGetSessionExpireCookieValue(cVBH) {
    return cI(cmJSFCreateCombinedSessionCookieName(cVBH), "e");
}
function cmJSFGetSessionValidFlagCookieValue(cVBH) {
    return cI(cmJSFCreateCombinedSessionCookieName(cVBH), "v");
}
function cmJSFGetSessionValue(cVBHs) {
    var value = "";
    var delimiter = "";
    var splitClientIDs = cVBHs.split(";");
    for (var n = 0; n < splitClientIDs.length; n++) {
        var cVBH = splitClientIDs[n];
        if (cVBH == "")continue;
        var currValue = cmJSFGetSessionLoginCookieValue(cVBH);
        value += delimiter + (currValue != null ? currValue : "");
        if (delimiter == "")delimiter = "|";
    }
    return value;
}
function cmJSFGetValidFlagValue(cVBHs) {
    var value = "";
    var delimiter = "";
    var splitClientIDs = cVBHs.split(";");
    for (var n = 0; n < splitClientIDs.length; n++) {
        var cVBH = splitClientIDs[n];
        if (cVBH == "")continue;
        var currValue = cmJSFGetSessionValidFlagCookieValue(cVBH);
        value += delimiter + (currValue != null ? currValue : "");
        if (delimiter == "")delimiter = "|";
    }
    return value;
}
function cmJSFDoMigrateCookies() {
    if (cm_JSFMigrationEnabled == cmMigrationFrom1p_SA) {
        if (cI(cm_JSFCoreCookieName) == null) {
            var cmSACookieValue = cI(cmSACookieName);
            if (cmSACookieValue) {
                cmSACookieValue = cmJSFConvertSAtoCM(cmSACookieValue);
                if (cmSACookieValue != null) {
                    CB(cm_JSFCoreCookieName, cmSACookieValue, cmCookieExpDate, cm_JSFPCookieDomain);
                    return true;
                }
            }
        }
    }
    return false;
}
_cm.prototype.addTP = function() {
    var tp = new cmTP(new cmApp());
    for (var o in tp) {
        if (tp[o] == null || tp[o] == "" || tp[o].toString().indexOf("function ") == 0)continue;
        this[o] = cE(cD(tp[o]));
    }
    return this;
};
function cmApp() {
    var n = navigator,b = n.appName,c = this;
    if (b == "Netscape") {
        c.b = "ns"
    } else if (b == "Microsoft Internet Explorer") {
        c.b = "ie"
    } else {
        c.b = b
    }
    c.v = parseInt(n.appVersion);
}
function cmTP(c) {
    var n = navigator,w = window.screen;
    this.jv = cmJv;
    if (c.b == "ns" && c.v >= 3)for (var i = 0; i < n.plugins.length; i++)eval('this.np' + i + '=n.plugins[' + i + '].name');
    if (c.v > 3) {
        if (c.v >= 4 && (c.b == "ns" || c.b == "ie")) {
            this.je = (n.javaEnabled() == true) ? "y" : "n";
        }
        if (c.b == "ie") {
            this.ce = n.cookieEnabled;
            this.cp = n.cpuClass;
        }
        this.sw = w.width;
        this.sh = w.height;
        this.pd = w.colorDepth;
        if (this.pd == 0) {
            this.pd = w.pixelDepth;
        }
        var fs = w.fontSmoothingEnabled;
        if (fs) {
            this.fs = fs ? "y" : "n";
        }
    }
    var tz = new Date();
    if (tz.getTimezoneOffset() == 0) {
        this.tz = "0";
    } else {
        this.tz = tz.getTimezoneOffset() / 60;
    }
}
function cmJSFPMigrateCookies(visitorID, sessionIDList, otherCookieList) {
    if (visitorID && sessionIDList && cm_JSFEnabled && cm_JSFPCookieMigrate) {
        var tempVisitor = cI(cm_JSFCoreCookieName);
        if (!tempVisitor || cm_JSFPForceMigrateCookies) {
            CB(cm_JSFCoreCookieName, visitorID + (cm_JSFTrackClients ? "&ci=" + cm_ClientID.split(";").join(",") : ""), cmCookieExpDate, cm_JSFPCookieDomain);
            var dt = new Date();
            var cmSessionExpTime = (dt.getTime() + cm_JSFSessionTimeout * 1000).toString();
            var cVAArray = cm_ClientID.split(";");
            for (var i = 0; i < cVAArray.length; ++i) {
                if (sessionIDList[cVAArray[i]] !== undefined) {
                    cmJSFSetSessionLoginCookieValue(cVAArray[i], sessionIDList[cVAArray[i]]);
                    cmJSFSetSessionExpiresCookieValue(cVAArray[i], cmSessionExpTime);
                    cmJSFSetSessionValidFlagCookieValue(cVAArray[i], "1");
                }
            }
        }
    }
    if (cm_JSFPCookieMigrate && cm_JSFPMigrationOtherCookies !== null) {
        var cookieList = cm_JSFPMigrationOtherCookies.split(",");
        for (var j = 0; j < cookieList.length; ++j) {
            if (otherCookieList[cookieList[j]] !== undefined) {
                var tempExpires = cm_JSFPMigrationOtherCookiesExpireTimes[cookieList[j]];
                if (tempExpires) {
                    var dt = new Date();
                    dt.setTime(dt.getTime() + parseInt(tempExpires));
                    dt = dt.toGMTString();
                } else {
                    var dt = null;
                }
                CB(cookieList[j], otherCookieList[cookieList[j]], dt, cm_JSFPCookieDomain);
            }
        }
    }
}
function cmJSFPMigrateLink(e, type) {
    if (cm_JSFPCookieMigrate) {
        var pageDomain = cm_JSFPCookieDomain;
        var linkDomainRE = /:\/\/([a-z0-9_\-\.]+)/i;
        var linkDomain = linkDomainRE.exec(e[type]);
        if (linkDomain) {
            linkDomain = linkDomain[1];
        }
        if (linkDomain && ((linkDomain.indexOf(pageDomain) === -1) && (e[type].toLowerCase().indexOf("javascript") !== 0) && ((cm_JSFPMigrationDomainWhitelist !== null && cmTextMatchList(linkDomain.toLowerCase(), cm_JSFPMigrationDomainWhitelist.split(","))) || (cm_JSFPMigrationDomainBlacklist !== null && !(cmTextMatchList(linkDomain.toLowerCase(), cm_JSFPMigrationDomainBlacklist.split(",")))))) || (cm_JSFPMigrationPathWhitelist !== null && cmTextMatchList(e[type].toLowerCase(), cm_JSFPMigrationPathWhitelist.split(",")))) {
            if (cm_JSFEnabled) {
                var tempVisitorID = cI(cm_JSFCoreCookieName);
                if (tempVisitorID) {
                    tempVisitorID = tempVisitorID.split("&", 2)[0];
                }
                var tempClientIDList = cm_ClientID.split(";");
                var tempSessionParameters = "";
                for (var i = 0; i < tempClientIDList.length; ++i) {
                    tempSessionParameters += "&" + cm_JSFPCookieMigrateSessionID + "_" + tempClientIDList[i] + "=" + cmJSFGetSessionLoginCookieValue(tempClientIDList[i]);
                }
                e[type] += (e[type].indexOf("?") > -1 ? "&" : "?") + cm_JSFPCookieMigrateVisitorID + "=" + tempVisitorID + tempSessionParameters;
            }
            if (cm_JSFPMigrationOtherCookies !== null) {
                var cookieList = cm_JSFPMigrationOtherCookies.split(",");
                var otherCookieParameters = "";
                for (var j = 0; j < cookieList.length; ++j) {
                    var tempCookie = cI(cookieList[j]);
                    if (tempCookie) {
                        otherCookieParameters += "&cm_mc_" + cookieList[j] + "=" + tempCookie;
                    }
                }
                otherCookieParameters = (e[type].indexOf("?") > -1 ? "&" : "?") + otherCookieParameters.substring(1);
                e[type] += otherCookieParameters;
            }
        }
    }
}
function cmTextMatchList(input, matchArray) {
    for (var i = 0; i < matchArray.length; ++i) {
        if (input.indexOf(matchArray[i]) > -1) {
            return true;
        }
    }
    return false;
}
/**** AdTarget additions start here ******//** new funcion attached to _cm **/
_cm.prototype.calculateTopLineAndReturnSegments = function cmCalculateTopLineAndReturnSegments() {
    var segmentsToSend = [];
    var cmCtCookieVals = _cmPartnerUtils.getContactCookieValues();
    var newCmCtCookieVals = new Ctck();
    var referrerURL = "";
    if (document.referrer)referrerURL = document.referrer;
    var destinationURL = "";
    if (window.location.href)destinationURL = window.location.href;
    var rulesPresent = false;
    for (var k in _cm_CMRules) {
        var cmRule = _cm_CMRules[k];
        if (typeof(cmRule) != "object" || typeof(cmRule.cid) == "undefined")continue;
        if (!this.topline[cmRule.cid])this.topline[cmRule.cid] = {};
        this.topline[cmRule.cid].pgct = cmCtCookieVals.getPgCt(cmRule.cid);
        this.topline[cmRule.cid].osshct = cmCtCookieVals.getOsshCt(cmRule.cid);
        this.topline[cmRule.cid].orders = cmCtCookieVals.getOrders(cmRule.cid);
        this.topline[cmRule.cid].sales = cmCtCookieVals.getSales(cmRule.cid);
        this.topline[cmRule.cid].itcartct = cmCtCookieVals.getItCartCt(cmRule.cid);
        this.topline[cmRule.cid].itpurct = cmCtCookieVals.getItPurCt(cmRule.cid);
        this.topline[cmRule.cid].pvct = cmCtCookieVals.getPvCt(cmRule.cid);
        this.topline[cmRule.cid].evpts = cmCtCookieVals.getEvPts(cmRule.cid);
        this.topline[cmRule.cid].evcomct = cmCtCookieVals.getEvComCt(cmRule.cid);
        this.topline[cmRule.cid].evinict = cmCtCookieVals.getEvIniCt(cmRule.cid);
        this.topline[cmRule.cid].elvct = cmCtCookieVals.getElvCt(cmRule.cid);
        var isFirstPage = true;
        if (cmCtCookieVals.getFpFlag(cmRule.cid))isFirstPage = false; else __cm_firstPageFlag = true;
        this.topline[cmRule.cid].startTime = cmCtCookieVals.getStTime(cmRule.cid);
        if (this.topline[cmRule.cid].startTime == 0)this.topline[cmRule.cid].startTime = ((new Date()).getTime() / 1000) | 0;
        this.topline[cmRule.cid].slen = (((new Date()).getTime() / 1000) | 0) - this.topline[cmRule.cid].startTime;
        this.topline[cmRule.cid].n_r = "";
        this.topline[cmRule.cid].mkchnl = "";
        this.topline[cmRule.cid].mkpgm = "";
        this.topline[cmRule.cid].mkv = "";
        this.topline[cmRule.cid].mkc = "";
        this.topline[cmRule.cid].mkp = "";
        this.topline[cmRule.cid].mki = "";
        this.topline[cmRule.cid].cmguid = "";
        this.topline[cmRule.cid].natscheng = "";
        this.topline[cmRule.cid].natschtm = "";
        this.topline[cmRule.cid].refurl = "";
        this.topline[cmRule.cid].refsite = "";
        this.topline[cmRule.cid].enpg = "";
        if (isFirstPage) {
            this.topline[cmRule.cid].mkchnl = (new Crur()).DIRECT_LOAD_CHANNEL;
            if (this.pn)this.topline[cmRule.cid].enpg = this.pn;
            this.topline[cmRule.cid].n_r = 'NEW';
            if (!_cm_isNew)this.topline[cmRule.cid].n_r = 'REPEAT';
            var vcpiArr = _cmPartnerUtils.parseVCPI(destinationURL);
            if (!vcpiArr)vcpiArr = _cmPartnerUtils.parseVCPI(referrerURL);
            var refUrlObj = _cmPartnerUtils.parseReferralURL(referrerURL);
            if (vcpiArr && vcpiArr.length > 0) {
                this.topline[cmRule.cid].mkchnl = refUrlObj.MARKETING_PROGRAMS;
                this.topline[cmRule.cid].mkpgm = vcpiArr[0];
                this.topline[cmRule.cid].mkv = vcpiArr[1];
                this.topline[cmRule.cid].mkc = vcpiArr[2];
                this.topline[cmRule.cid].mkp = vcpiArr[3];
                this.topline[cmRule.cid].mki = vcpiArr[4];
                this.topline[cmRule.cid].cmguid = vcpiArr[5];
            } else {
                this.topline[cmRule.cid].mkchnl = refUrlObj.channel;
            }
            this.topline[cmRule.cid].refsite = refUrlObj.refName;
            this.topline[cmRule.cid].natscheng = refUrlObj.natSearchEngine;
            this.topline[cmRule.cid].natschtm = refUrlObj.natSearchWord;
            this.topline[cmRule.cid].refurl = referrerURL;
        }
        if (typeof(__cm_firstPageFlag) != "undefined" && __cm_firstPageFlag && !this.topline[cmRule.cid].enpg && this.pn) {
            this.topline[cmRule.cid].enpg = this.pn;
        }
        this.topline[cmRule.cid].tzloc = "";
        var sampleDate = new Date(2009, 0, 15);
        var hourDiff = Math.floor(sampleDate.getTimezoneOffset() / 60);
        if (hourDiff == 8) {
            this.topline[cmRule.cid].tzloc = "LOS ANGELES";
        } else if (hourDiff == 7) {
            this.topline[cmRule.cid].tzloc = "DENVER";
        } else if (hourDiff == 6) {
            this.topline[cmRule.cid].tzloc = "CHICAGO";
        } else if (hourDiff == 5) {
            this.topline[cmRule.cid].tzloc = "NEW YORK";
        }
        if (this.tid != 1) {
            if (this.tid == 6 || (this.pc && (this.pc.indexOf('y') == 0 || this.pc.indexOf('Y') == 0))) {
                this.topline[cmRule.cid].pgct++;
                if (this.se && this.se.replace(/^\s*/, "").replace(/\s*$/, ""))this.topline[cmRule.cid].osshct++;
            }
        }
        if (this.tid == "1") {
            this.topline[cmRule.cid].pgct++;
            if (this.se && this.se.replace(/^\s*/, "").replace(/\s*$/, ""))this.topline[cmRule.cid].osshct++;
        } else if (this.tid == "3") {
            this.topline[cmRule.cid].orders++;
            if (this.tr && parseFloat(this.tr) != NaN)this.topline[cmRule.cid].sales += parseFloat(this.tr);
        } else if (this.tid == "4") {
            if (this.at && this.at == '5' && this.qt && parseFloat(this.qt) != NaN)this.topline[cmRule.cid].itcartct += parseFloat(this.qt);
            if (this.at && this.at == '9' && this.qt && parseFloat(this.qt) != NaN)this.topline[cmRule.cid].itpurct += parseFloat(this.qt);
        } else if (this.tid == "5") {
            this.topline[cmRule.cid].pvct++;
        } else if (this.tid == "14") {
            if (this.cpt && parseFloat(this.cpt) != NaN)this.topline[cmRule.cid].evpts += parseFloat(this.cpt);
            if (this.cat && this.cat == '2')this.topline[cmRule.cid].evcomct++;
            if (this.cat && this.cat == '1')this.topline[cmRule.cid].evinict++;
        } else if (this.tid == "15") {
            this.topline[cmRule.cid].elvct++;
        }
        newCmCtCookieVals.setPgCt(cmRule.cid, this.topline[cmRule.cid].pgct);
        newCmCtCookieVals.setOsshCt(cmRule.cid, this.topline[cmRule.cid].osshct);
        newCmCtCookieVals.setOrders(cmRule.cid, this.topline[cmRule.cid].orders);
        newCmCtCookieVals.setSales(cmRule.cid, this.topline[cmRule.cid].sales);
        newCmCtCookieVals.setItCartCt(cmRule.cid, this.topline[cmRule.cid].itcartct);
        newCmCtCookieVals.setItPurCt(cmRule.cid, this.topline[cmRule.cid].itpurct);
        newCmCtCookieVals.setPvCt(cmRule.cid, this.topline[cmRule.cid].pvct);
        newCmCtCookieVals.setEvPts(cmRule.cid, this.topline[cmRule.cid].evpts);
        newCmCtCookieVals.setEvComCt(cmRule.cid, this.topline[cmRule.cid].evcomct);
        newCmCtCookieVals.setEvIniCt(cmRule.cid, this.topline[cmRule.cid].evinict);
        newCmCtCookieVals.setElvCt(cmRule.cid, this.topline[cmRule.cid].elvct);
        newCmCtCookieVals.setFpFlag(cmRule.cid, "1");
        newCmCtCookieVals.setStTime(cmRule.cid, this.topline[cmRule.cid].startTime);
        rulesPresent = true;
    }
    for (var k in _cm_CMRules) {
        var cmRule = _cm_CMRules[k];
        if (typeof(cmRule) != "object" || typeof(cmRule.cid) == "undefined")continue;
        var segmentRulesMetStr = cmCtCookieVals.getSegRulesMet(cmRule.cid);
        for (var j = 0; j < cmRule.segmentRules.length; j++) {
            var segRule = cmRule.segmentRules[j];
            if (segmentRulesMetStr.indexOf(segRule.id + "_") == 0 || segmentRulesMetStr.indexOf("_" + segRule.id + "_") != -1)continue;
            var functionRetVal = false;
            try {
                functionRetVal = segRule.fn(this, this.topline[cmRule.cid])
            } catch(e) {
            }
            if (functionRetVal)segmentRulesMetStr += segRule.id + "_";
        }
        newCmCtCookieVals.setSegRulesMet(cmRule.cid, segmentRulesMetStr);
        var segmentsMetStr = cmCtCookieVals.getSegsMet(cmRule.cid);
        for (var s = 0; s < cmRule.segments.length; s++) {
            var segment = cmRule.segments[s];
            if (segmentsMetStr.indexOf(segment.id + "_") == 0 || segmentsMetStr.indexOf("_" + segment.id + "_") != -1)continue;
            var allMatched = true;
            for (var r = 0; r < segment.rules.length; r++) {
                var ruleid = segment.rules[r];
                if (!(segmentRulesMetStr.indexOf(ruleid + "_") == 0 || segmentRulesMetStr.indexOf("_" + ruleid + "_") != -1)) {
                    allMatched = false;
                    break;
                }
            }
            if (allMatched) {
                if (!segmentsToSend[cmRule.cid])segmentsToSend[cmRule.cid] = "";
                segmentsToSend[cmRule.cid] += segment.id + "_";
                segmentsMetStr += segment.id + "_";
            }
        }
        newCmCtCookieVals.setSegsMet(cmRule.cid, segmentsMetStr);
    }
    if (rulesPresent)_cmPartnerUtils.setContactCookieValues(newCmCtCookieVals);
    return segmentsToSend;
};
/*** Set of utility functions,all namespaced to _cmPartnerUtils **/
var _cmPartnerUtils = {};
_cmPartnerUtils.loadScript = function(s) {
    if (cm_UseDOMScriptLoad) {
        try {
            var h = cG6.getElementsByTagName('head').item(0);
            var js = cG6.createElement('script');
            js.setAttribute('language', 'javascript');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', s);
            h.appendChild(js);
        } catch(e) {
        }
    } else {
        cG6.write('<script language="javascript1.1" src="' + s + '"></script>');
    }
};
_cmPartnerUtils.cmGetPartnerRequestArray = function(cmObj, segmentsToSend) {
    var reqArray = [];
    if (!cmObj.ci)return reqArray;
    var referrerURL = "";
    if (cmObj.rf)referrerURL = cmObj.rf; else if (document.referrer)referrerURL = document.referrer;
    var destinationURL = "";
    if (cmObj.ul)destinationURL = cmObj.ul; else if (window.location.href)destinationURL = window.location.href;
    for (var i in _cm_CMRules) {
        var cmRule = _cm_CMRules[i];
        if (typeof(cmRule) != "object")continue;
        if ((cmRule.cid + '').indexOf(cmObj.ci) == -1)continue;
        if (cmRule.version > 1001)continue;
        var shuffledPartnerIndexArr = _cmPartnerUtils.getShuffledIndexArray(cmRule.partners.length - 1);
        for (var j = 0; j < shuffledPartnerIndexArr.length; j++) {
            var pi = shuffledPartnerIndexArr[j];
            var partner = cmRule.partners[pi];
            if (pi < 0 || pi >= cmRule.tags.length)continue;
            var tagList = cmRule.tags[pi];
            var pTags = [];
            for (var t = 0; t < tagList.length; t++) {
                var tagId = tagList[t];
                if (tagId == "1") {
                    if (cmObj.tid == "1" || cmObj.tid == "6" || (cmObj.pc && (cmObj.pc.indexOf('y') == 0 || cmObj.pc.indexOf('Y') == 0))) {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "1";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [ "pi","pn","cg","pv_a1","pv_a2","pv_a3","pv_a4","pv_a5","pv_a6","pv_a7","pv_a8","pv_a9","pv_a10","pv_a11","pv_a12","pv_a13","pv_a14","pv_a15" ]);
                        pTags.push(pTag);
                    }
                } else if (tagId == "2") {
                    if (cmObj.tid == "5") {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "2";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [ "pr","pm","cg","pr_a1","pr_a2","pr_a3","pr_a4","pr_a5","pr_a6","pr_a7","pr_a8","pr_a9","pr_a10","pr_a11","pr_a12","pr_a13","pr_a14","pr_a15" ]);
                        pTags.push(pTag);
                    }
                } else if (tagId == "3") {
                    if (cmObj.tid == "4" && cmObj.at && cmObj.at == '5') {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "3";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);
                        pTags.push(pTag);
                    }
                } else if (tagId == "4") {
                    if (cmObj.tid == "4" && cmObj.at && cmObj.at == '9') {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "4";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [ "pr","pm","cg","qt","bp",["s_a1","pr_a1"],["s_a2","pr_a2"],["s_a3","pr_a3"],["s_a4","pr_a4"],["s_a5","pr_a5"],["s_a6","pr_a6"],["s_a7","pr_a7"],["s_a8","pr_a8"],["s_a9","pr_a9"],["s_a10","pr_a10"],["s_a11","pr_a11"],["s_a12","pr_a12"],["s_a13","pr_a13"],["s_a14","pr_a14"],["s_a15","pr_a15"] ]);
                        pTag.tr = cmObj.tr;
                        pTag.on = cmObj.on;
                        pTags.push(pTag);
                    }
                } else if (tagId == "5") {
                    if (cmObj.tid == "3") {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "5";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [ "on",["tr","ov"],"ct","sa","zp","o_a1","o_a2","o_a3","o_a4","o_a5","o_a6","o_a7","o_a8","o_a9","o_a10","o_a11","o_a12","o_a13","o_a14","o_a15" ]);
                        pTags.push(pTag);
                    }
                } else if (tagId == "6") {
                    if (cmObj.topline[cmRule.cid] && cmObj.topline[cmRule.cid].natscheng) {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "6";
                        pTag.en = cmObj.topline[cmRule.cid].natscheng;
                        pTag.se = cmObj.topline[cmRule.cid].natschtm;
                        if (cmObj.topline[cmRule.cid].mkchnl == (new Crur()).MARKETING_PROGRAMS)pTag.st = 'PAID'; else pTag.st = 'NATURAL';
                        pTags.push(pTag);
                    } else if (cmObj.tid == "1" || cmObj.tid == "6" || (cmObj.pc && (cmObj.pc.indexOf('y') == 0 || cmObj.pc.indexOf('Y') == 0))) {
                        if (cmObj.se && cmObj.se.replace(/^\s*/, "").replace(/\s*$/, "")) {
                            var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                            pTag.tid = "6";
                            pTag.en = "ONSITE";
                            pTag.se = cmObj.se;
                            pTag.sr = cmObj.sr;
                            pTags.push(pTag);
                        }
                    }
                } else if (tagId == "7") {
                    if (cmObj.tid == "14") {
                        var pTag = new Cptg(partner.key, referrerURL, destinationURL);
                        pTag.tid = "7";
                        _cmPartnerUtils.copyTagParms(cmObj, pTag, [
                            ["cid","eid"],
                            ["ccid","cat"],
                            ["cat","at"],
                            "cpt",
                            "c_a1",
                            "c_a2",
                            "c_a3",
                            "c_a4",
                            "c_a5",
                            "c_a6",
                            "c_a7",
                            "c_a8",
                            "c_a9",
                            "c_a10",
                            "c_a11",
                            "c_a12",
                            "c_a13",
                            "c_a14",
                            "c_a15"
                        ]);
                        pTags.push(pTag);
                    }
                }
            }
            if (partner.type == 'I') {
                for (var pti = 0; pti < pTags.length; pti++) {
                    var req = _cmPartnerUtils.c0_Partner(pTags[pti], partner);
                    reqArray.push(req);
                }
            } else if (partner.type == 'S') {
                for (var pti = 0; pti < pTags.length; pti++) {
                    try {
                        partner._cm_ConnectCallback(pTags[pti]);
                    } catch(e) {
                        var errorTag = new Cpse(cmRule.cid + '', destinationURL, p);
                        var cmErrorMsg = _cmPartnerUtils.c0_CMError(errorTag);
                        reqArray.push(cmErrorMsg);
                    }
                }
            }
        }
        var segmentsToSendList = segmentsToSend[cmRule.cid];
        if (segmentsToSendList) {
            for (var s = 0; s < cmRule.segments.length; s++) {
                var segment = cmRule.segments[s];
                if (segmentsToSendList.indexOf(segment.id) != -1) {
                    var pTag = new Cptg("", referrerURL, destinationURL);
                    pTag.tid = "99";
                    pTag.sid = segment.id;
                    var shuffledIndexArr = _cmPartnerUtils.getShuffledIndexArray(segment.p.length - 1);
                    for (var j = 0; j < shuffledIndexArr.length; j++) {
                        var pi = shuffledIndexArr[j];
                        if (segment.p[pi] < 0 || segment.p[pi] >= cmRule.partners.length)continue;
                        var partner = cmRule.partners[segment.p[pi]];
                        pTag.ckey = partner.key;
                        if (partner.type == 'I') {
                            var req = _cmPartnerUtils.c0_Partner(pTag, partner);
                            reqArray.push(req);
                        } else if (partner.type == 'S') {
                            try {
                                partner._cm_ConnectCallback(pTag);
                            } catch(e) {
                                var errorTag = new Cpse(cmRule.cid + '', destinationURL, pi);
                                var cmErrorMsg = _cmPartnerUtils.c0_CMError(errorTag);
                                reqArray.push(cmErrorMsg);
                            }
                        }
                    }
                }
            }
        }
    }
    return reqArray;
};
_cmPartnerUtils.copyTagParms = function(src, dest, parms) {
    for (var i = 0; i < parms.length; i++) {
        var t = typeof(parms[i]);
        if (t == "string") {
            dest[parms[i]] = src[parms[i]];
        } else if (t == "object") {
            dest[parms[i][1]] = src[parms[i][0]];
        }
    }
};
_cmPartnerUtils.c0_Partner = function(cmObj, partner) {
    var qs = _cmPartnerUtils.C6_Partner(cmObj);
    var req = null;
    if (C8(null) == 'https:') {
        req = new CQ('https:', partner.surl.indexOf("://") == -1 ? partner.surl : partner.surl.substring(partner.surl.indexOf("://") + 3), qs);
    } else {
        req = new CQ('http:', partner.url.indexOf("://") == -1 ? partner.url : partner.url.substring(partner.url.indexOf("://") + 3), qs);
    }
    return req;
};
_cmPartnerUtils.c0_CMError = function(cmObj) {
    var qs = _cmPartnerUtils.C6_Partner(cmObj);
    var req = null;
    if (C8(null) == 'https:') {
        req = new CQ('https:', cm_HOST, qs);
    } else {
        req = new CQ('http:', cm_HOST, qs);
    }
    return req;
};
_cmPartnerUtils.C6_Partner = function(tag) {
    var qs = "";
    if (tag.tid)qs += "tid=" + tag.tid;
    for (var cOb in tag) {
        if (!tag[cOb] || tag[cOb] == "" || tag[cOb].constructor == Function || cOb == "tid")continue;
        if (qs != "")qs += "&";
        qs += cD(cOb) + "=" + cE(cD(tag[cOb]));
    }
    return qs;
};
_cmPartnerUtils.setContactRule = function(contactRule) {
    var cid = contactRule.cid;
    _cm_CMRules[cid] = contactRule;
    for (var p = 0; p < contactRule.partners.length; p++) {
        var partner = contactRule.partners[p];
        if (partner.type == 'S') {
            partner._cm_ConnectCallback = function empty() {
            };
            partner.callbackFunctionSet = false;
            var scripturl = partner.url;
            if (C8(null) == 'https:')scripturl = partner.surl;
            scripturl = scripturl.indexOf("://") == -1 ? scripturl : scripturl.substring(scripturl.indexOf("://") + 3);
            _cmPartnerUtils.loadScript(C8(null) + '//' + scripturl);
        }
    }
    if (!cI("CoreAt")) {
        var cmhost_root = cm_Production_HOST;
        if (contactRule.usesNewRepeat) {
            if (cm_JSFEnabled) {
                cmSetNRFlag(cI(cm_JSFCoreCookieName));
            } else {
                _cmPartnerUtils.loadScript(C8(null) + '//' + cmhost_root + '/cookie-id.js?fn=cmSetNRFlag');
            }
        }
    }
};
function _cm_registerCallback(partner_id, callback) {
    if (!partner_id)return;
    if (typeof(callback) != 'function')return;
    for (var k in _cm_CMRules) {
        var cmRule = _cm_CMRules[k];
        if (typeof(cmRule) != "object" || typeof(cmRule.cid) == "undefined")continue;
        for (var p = 0; p < cmRule.partners.length; p++) {
            var partner = cmRule.partners[p];
            if (partner.pid == partner_id && !partner.callbackFunctionSet) {
                partner._cm_ConnectCallback = callback;
                partner.callbackFunctionSet = true;
            }
        }
    }
}
function cmSetNRFlag(cookieval) {
    if (cookieval)_cm_isNew = false;
}
_cmPartnerUtils.getContactCookieValues = function() {
    var externalizeVersion = 1;
    var cmCtCookieVals = new Ctck();
    var cV4 = cI("CoreAt");
    if (!cV4) {
        return cmCtCookieVals;
    }
    var stringvals = cV4.split("&");
    var keyvalstring,cid,val,sepindex;
    for (var i = 0; i < stringvals.length; i++) {
        keyvalstring = stringvals[i];
        sepindex = keyvalstring.indexOf("=");
        if (sepindex != -1) {
            var cid = keyvalstring.substring(0, sepindex);
            var val = null;
            if (keyvalstring.length > sepindex + 1)val = keyvalstring.substring(sepindex + 1);
            if (cid && val) {
                var splitvals = unescape(val).split(/\|/);
                if (splitvals && splitvals.length > 0) {
                    if (splitvals[0] && parseInt(splitvals[0]) <= externalizeVersion) {
                        if (splitvals[1])cmCtCookieVals.setPgCt(cid, splitvals[1]);
                        if (splitvals[2])cmCtCookieVals.setOsshCt(cid, splitvals[2]);
                        if (splitvals[3])cmCtCookieVals.setOrders(cid, splitvals[3]);
                        if (splitvals[4])cmCtCookieVals.setSales(cid, splitvals[4]);
                        if (splitvals[5])cmCtCookieVals.setItCartCt(cid, splitvals[5]);
                        if (splitvals[6])cmCtCookieVals.setItPurCt(cid, splitvals[6]);
                        if (splitvals[7])cmCtCookieVals.setPvCt(cid, splitvals[7]);
                        if (splitvals[8])cmCtCookieVals.setEvPts(cid, splitvals[8]);
                        if (splitvals[9])cmCtCookieVals.setEvComCt(cid, splitvals[9]);
                        if (splitvals[10])cmCtCookieVals.setEvIniCt(cid, splitvals[10]);
                        if (splitvals[11])cmCtCookieVals.setElvCt(cid, splitvals[11]);
                        if (splitvals[12])cmCtCookieVals.setFpFlag(cid, splitvals[12]);
                        if (splitvals[13])cmCtCookieVals.setStTime(cid, splitvals[13]);
                        if (splitvals[14])cmCtCookieVals.setSegRulesMet(cid, splitvals[14]);
                        if (splitvals[15])cmCtCookieVals.setSegsMet(cid, splitvals[15]);
                    }
                }
            }
        }
    }
    return cmCtCookieVals;
};
_cmPartnerUtils.setContactCookieValues = function(cmCtCookieVals) {
    var externalizeVersion = 1;
    var val = "";
    for (var cid in cmCtCookieVals.holder) {
        if (cid.length != 8 || typeof(cmCtCookieVals.holder[cid]) == "function")continue;
        val += cid + "=" + externalizeVersion + "|" + cmCtCookieVals.getPgCt(cid) + "|" + cmCtCookieVals.getOsshCt(cid) + "|" + cmCtCookieVals.getOrders(cid) + "|" + cmCtCookieVals.getSales(cid) + "|" + cmCtCookieVals.getItCartCt(cid) + "|" + cmCtCookieVals.getItPurCt(cid) + "|" + cmCtCookieVals.getPvCt(cid) + "|" + cmCtCookieVals.getEvPts(cid) + "|" + cmCtCookieVals.getEvComCt(cid) + "|" + cmCtCookieVals.getEvIniCt(cid) + "|" + cmCtCookieVals.getElvCt(cid) + "|" + cmCtCookieVals.getFpFlag(cid) + "|" + cmCtCookieVals.getStTime(cid) + "|" + cmCtCookieVals.getSegRulesMet(cid) + "|" + cmCtCookieVals.getSegsMet(cid) + "&";
    }
    CB("CoreAt", val, "", cm_JSFPCookieDomain);
};
/* parse and return following properties in refurl * marketingChannel,referringSite,naturalSearchEngine,naturalSearchWord */
_cmPartnerUtils.parseReferralURL = function(referralUrl) {
    var result = new Crur();
    if (!referralUrl)return result;
    var domainName = this.extractDomainName(referralUrl);
    if (domainName.getPartsCount() == 0)return result;
    if (domainName.url.search(/^[0-9]+(\.[0-9]+){3}$/) >= 0) {
        result.channel = result.REFERRAL_CHANNEL;
        result.refName = domainName.url;
        return result;
    }
    var searchEngines = [
        ['GOOGLE.COM','q'],
        ['YAHOO.COM','SEARCH.YAHOO.COM','p'],
        ['MSN.COM','SEARCH.MSN.COM',['q','MT']],
        ['AOL.COM','SEARCH.AOL.COM',['aps_terms','query','encquery','q']],
        ['AOL.COM',['AOLSEARCH.AOL.COM','AOLSEARCHT.AOL.COM'],'query'],
        ['ASK.COM',['q','ask']],
        ['ASK.COM',['ASKGEEVES.COM','ASKJEEVES.COM','ASKJEEVS.COM'],'ask'],
        ['BING.COM','q'],
        ['LYCOS.COM','HOTBOT.LYCOS.COM','MT'],
        ['LYCOS.COM','query'],
        ['ALTAVISTA.COM','q'],
        ['ALTAVISTA.COM',['PARTNERS.ALTAVISTA.COM','ALTA-VISTA.COM'],'q'],
        ['NETSCAPE.COM','SEARCH.NETSCAPE.COM',['search','query']],
        ['WEBSEARCH.CNN.COM','query'],
        ['LOOKSMART.COM','key'],
        ['ABOUT.COM','terms'],
        ['MAMMA.COM','query='],
        ['ALLTHEWEB.COM',['query','q']],
        ['VOILA.COM','kw'],
        ['VIRGILIO.IT','SEARCH.VIRGILIO.IT','qs'],
        ['LIVE.COM','SEARCH.LIVE.COM','q'],
        ['BAIDU.COM',['word','wd']],
        ['SEARCH.ALICE.IT','qs'],
        ['YANDEX.RU','text'],
        ['CLUB-INTERNET.FR','q'],
        ['SEARCH.SEZNAM.CZ','q'],
        ['SEARCH.SEZNAM.CZ','w'],
        ['SEARCH.COM',['q','what','QUERY','OLDQUERY']],
        ['SEARCH.YAM.COM','k'],
        ['GOOGLE.PCHOME.COM.TW','q']
    ];
    var matchedSearchList = [];
    for (var i = domainName.getPartsCount(); matchedSearchList.length == 0 && i >= 2; i--) {
        var dm = domainName.getLast(i);
        for (var j = 0; j < searchEngines.length; j++) {
            var se = searchEngines[j];
            var sedms = (se.length > 2) ? se[1] : se[0];
            sedms = (typeof(sedms) == "string") ? [ sedms ] : sedms;
            for (var k = 0; k < sedms.length; k++) {
                if (sedms[k] == dm)matchedSearchList.push(se);
            }
        }
    }
    if (matchedSearchList.length > 0) {
        result.channel = result.NATURAL_SEARCH_CHANNEL;
        result.natSearchEngine = matchedSearchList[0][0];
        result.refName = domainName.url;
        for (var i = 0; i < matchedSearchList.length; i++) {
            var se = matchedSearchList[i];
            var params = (se.length > 2) ? se[2] : se[1];
            var params = (typeof(params) == "string") ? [ params ] : params;
            for (var j = 0; j < params.length; j++) {
                var re = new RegExp("[&?]" + params[j] + "=([^&]+)");
                var a = referralUrl.match(re);
                if (a) {
                    var term = _cmPartnerUtils.urlDecode(a[1]);
                    if (term.search(/^[^a-zA-Z0-9]*$/) == -1) {
                        result.natSearchWord = term.replace(/\+/g, " ");
                        break;
                    }
                }
            }
        }
    } else {
        result.channel = result.REFERRAL_CHANNEL;
        result.refName = domainName.url;
    }
    return result;
};
_cmPartnerUtils.urlDecode = function(s) {
    if (typeof(decodeURIComponent) == 'function') {
        try {
            return decodeURIComponent(s);
        } catch(e) {
        }
    }
    return unescape(s);
};
_cmPartnerUtils.extractDomainName = function(url) {
    var a = url.match(/:\/*([^\/\?]+)/);
    var authority = a ? a[1] : "";
    authority = authority.toUpperCase();
    a = authority.match(/^(?:WWW\d*\.)?([^:]+)/);
    if (a)authority = a[1];
    var lastCharacter = authority.length - 1;
    var lastDot = authority.lastIndexOf('.');
    if (lastDot == -1) {
        return new Cspd();
    } else if (lastDot == lastCharacter) {
        authority = authority.substring(0, lastCharacter);
    }
    return new Cspd(authority);
};
_cmPartnerUtils.parseVCPI = function(url) {
    if (!url)return "";
    var a = url.match(/[&?]cm_mmc(_o)?=([^&]+)/);
    if (!a)return "";
    var mmcval = a[1] ? deObfuscate(a[2]) : a[2];
    var splitmmcvals = mmcval.split(/\-_\-|\*/);
    if (!splitmmcvals || splitmmcvals.length != 4)return "";
    var index = splitmmcvals[3].indexOf("|-|");
    if (index != -1) {
        splitmmcvals[3] = splitmmcvals[3].substring(0, index);
    }
    splitmmcvals[0] = _cmPartnerUtils.urlDecode(splitmmcvals[0]).replace(/\+/g, " ");
    splitmmcvals[1] = _cmPartnerUtils.urlDecode(splitmmcvals[1]).replace(/\+/g, " ");
    splitmmcvals[2] = _cmPartnerUtils.urlDecode(splitmmcvals[2]).replace(/\+/g, " ");
    splitmmcvals[3] = _cmPartnerUtils.urlDecode(splitmmcvals[3]).replace(/\+/g, " ");
    var b = url.match(/[&?]cm_guid=([^&]+)/);
    var guid = (b && b[1]) ? _cmPartnerUtils.urlDecode(b[1]) : "";
    return [ splitmmcvals[0] + "*" + splitmmcvals[1] + "*" + splitmmcvals[2] + "*" + splitmmcvals[3],splitmmcvals[0],splitmmcvals[1],splitmmcvals[2],splitmmcvals[3],guid ];
};
_cmPartnerUtils.deObfuscate = function(encodedStr) {
    if (!encodedStr)return "";
    var ENCODED = "-P2KHd7ZG3s14WRVhqmaJe8rQUz_gpwuTtbXLkFEB56ylfAMc0YOCjvnNSDxIo9i";
    var DECODED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_1234567890";
    var MIN_CHAR_VALUE = 45;
    var MAX_CHAR_VALUE = 122;
    var lookupArray = [];
    for (var i = 0; i < ENCODED.length; i++) {
        var c = ENCODED.charCodeAt(i);
        lookupArray[c - 45] = DECODED.charAt(i);
    }
    var decodedStr = "";
    try {
        for (var i = 0; i < encodedStr.length; i++) {
            var encodedCharacter = encodedStr.charAt(i);
            var encodedCharacterInt = encodedStr.charCodeAt(i);
            if (encodedCharacterInt < MIN_CHAR_VALUE || encodedCharacterInt > MAX_CHAR_VALUE) {
                decodedStr += encodedCharacter;
            } else {
                var decodedCharacter = lookupArray[encodedCharacterInt - 45];
                if (decodedCharacter == null) {
                    decodedStr += encodedCharacter;
                } else {
                    decodedStr += decodedCharacter;
                }
            }
        }
    } catch(e) {
    }
    return decodedStr;
};
_cmPartnerUtils.getShuffledIndexArray = function(maxIndex) {
    var indexArr = [];
    for (var i = 0; i <= maxIndex; i++) {
        indexArr.push(i);
    }
    for (var i = 0; i < indexArr.length; i++) {
        var randIndex = Math.floor(Math.random() * (indexArr.length));
        var temp = indexArr[i];
        indexArr[i] = indexArr[randIndex];
        indexArr[randIndex] = temp;
    }
    return indexArr;
};
_cmPartnerUtils.startsWith = function(field, parameter) {
    return(field.toUpperCase().indexOf(parameter) == 0);
};
_cmPartnerUtils.endsWith = function(field, parameter) {
    return((field.toUpperCase().lastIndexOf(parameter) != -1) && (field.toUpperCase().lastIndexOf(parameter) + parameter.length == field.length));
};
_cmPartnerUtils.contains = function(field, parameter) {
    return(field.toUpperCase().indexOf(parameter) != -1);
};
/**** new objects *****/
function Ctck() {
    this.holder = {};
    this.getIntValue = function(cid, key) {
        if (!this.holder[cid])return 0;
        var i = this.holder[cid][key] ? parseInt(this.holder[cid][key]) : 0;
        i = (i == NaN) ? 0 : i;
        return i;
    };
    this.getFloatValue = function(cid, key) {
        if (!this.holder[cid])return 0;
        var i = this.holder[cid][key] ? parseFloat(this.holder[cid][key]) : 0;
        i = (i == NaN) ? 0 : i;
        return i;
    };
    this.getStringValue = function(cid, key) {
        if (!this.holder[cid])return "";
        return this.holder[cid][key] ? this.holder[cid][key] : "";
    };
    this.setFloatValue = function(cid, key, val) {
        if (!this.holder[cid])this.holder[cid] = {};
        if (key && val && parseFloat(val) != NaN) {
            if (typeof(val) == "number")this.holder[cid][key] = val.toFixed(2) + ''; else this.holder[cid][key] = val;
        }
    };
    this.setIntValue = function(cid, key, val) {
        if (!this.holder[cid])this.holder[cid] = {};
        if (key && val && parseInt(val) != NaN)this.holder[cid][key] = val + '';
    };
    this.setStringValue = function(cid, key, val) {
        if (!this.holder[cid])this.holder[cid] = [];
        if (key && val)this.holder[cid][key] = val;
    };
    this.getPgCt = function(cid) {
        return this.getIntValue(cid, "pgct");
    };
    this.setPgCt = function(cid, val) {
        this.setIntValue(cid, "pgct", val);
    };
    this.getOsshCt = function(cid) {
        return this.getIntValue(cid, "osshct");
    };
    this.setOsshCt = function(cid, val) {
        this.setIntValue(cid, "osshct", val);
    };
    this.getOrders = function(cid) {
        return this.getIntValue(cid, "orders");
    };
    this.setOrders = function(cid, val) {
        this.setIntValue(cid, "orders", val);
    };
    this.getSales = function(cid) {
        return this.getFloatValue(cid, "sales");
    };
    this.setSales = function(cid, val) {
        this.setFloatValue(cid, "sales", val);
    };
    this.getItCartCt = function(cid) {
        return this.getFloatValue(cid, "itcartct");
    };
    this.setItCartCt = function(cid, val) {
        this.setFloatValue(cid, "itcartct", val);
    };
    this.getItPurCt = function(cid) {
        return this.getFloatValue(cid, "itpurct");
    };
    this.setItPurCt = function(cid, val) {
        this.setFloatValue(cid, "itpurct", val);
    };
    this.getPvCt = function(cid) {
        return this.getIntValue(cid, "pvct");
    };
    this.setPvCt = function(cid, val) {
        this.setIntValue(cid, "pvct", val);
    };
    this.getEvPts = function(cid) {
        return this.getFloatValue(cid, "evpts");
    };
    this.setEvPts = function(cid, val) {
        this.setFloatValue(cid, "evpts", val);
    };
    this.getEvIniCt = function(cid) {
        return this.getIntValue(cid, "evinict");
    };
    this.setEvIniCt = function(cid, val) {
        this.setIntValue(cid, "evinict", val);
    };
    this.getEvComCt = function(cid) {
        return this.getIntValue(cid, "evcomct");
    };
    this.setEvComCt = function(cid, val) {
        this.setIntValue(cid, "evcomct", val);
    };
    this.getElvCt = function(cid) {
        return this.getIntValue(cid, "elvct");
    };
    this.setElvCt = function(cid, val) {
        this.setIntValue(cid, "elvct", val);
    };
    this.getFpFlag = function(cid) {
        return this.getIntValue(cid, "fp");
    };
    this.setFpFlag = function(cid, val) {
        this.setIntValue(cid, "fp", val);
    };
    this.getStTime = function(cid) {
        return this.getIntValue(cid, "st");
    };
    this.setStTime = function(cid, val) {
        this.setIntValue(cid, "st", val);
    };
    this.getSegRulesMet = function(cid) {
        return this.getStringValue(cid, "segrules");
    };
    this.setSegRulesMet = function(cid, val) {
        this.setStringValue(cid, "segrules", val);
    };
    this.getSegsMet = function(cid) {
        return this.getStringValue(cid, "segs");
    };
    this.setSegsMet = function(cid, val) {
        this.setStringValue(cid, "segs", val);
    };
}
function Cpse(cid, ul1, pindex1) {
    this.ci = cid;
    this.tid = '21';
    this.ul = (ul1) ? ul1 : "";
    this.pindex = pindex1;
}
function Cptg(ckey1, rf1, ul1) {
    this.ckey = (ckey1) ? ckey1 : "";
    this.rf = (rf1) ? rf1 : "";
    this.ul = (ul1) ? ul1 : "";
}
function Crur() {
    this.DIRECT_LOAD_CHANNEL = 'DIRECT LOAD';
    this.REFERRAL_CHANNEL = 'REFERRING SITES';
    this.NATURAL_SEARCH_CHANNEL = 'NATURAL SEARCH';
    this.MARKETING_PROGRAMS = 'MARKETING PROGRAMS';
    this.DIRECT_LOAD_REFERRAL_NAME = 'DL';
    this.channel = this.DIRECT_LOAD_CHANNEL;
    this.refName = this.DIRECT_LOAD_REFERRAL_NAME;
    this.natSearchEngine = "";
    this.natSearchWord = "";
}
function Cspd(url1) {
    this.url = (url1) ? url1 : "";
    this.splitUrl = this.url.split("\.");
    this.getPartsCount = function() {
        return this.splitUrl.length;
    };
    this.getLast = function(index) {
        var dm = "";
        for (var i = index; i >= 1; i--) {
            if (this.splitUrl.length >= i) {
                if (dm)dm += ".";
                dm += this.splitUrl[this.splitUrl.length - i]
            }
        }
        return dm;
    };
}