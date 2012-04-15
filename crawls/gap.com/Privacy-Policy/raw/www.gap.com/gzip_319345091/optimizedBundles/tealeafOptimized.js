/*
* Copyright   1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* This is the configuration for the main UI Client Event Capture JavaScript.
* It contains versioning information and the the flag thant turns 
* the JavaScript into a true SDK.  
*
* @version 2010.12.22.1
*
*/
if (typeof TeaLeaf === "undefined") {
  TeaLeaf = {};
  TeaLeaf.Private = {};
  TeaLeaf.tlStartLoad = new Date();

  if (!TeaLeaf.Configuration) {
    TeaLeaf.Configuration = {
      "tlversion" :                 "2010.12.22.1",
      "tlinit" :                    false,
      "tlSDK" :                     false,

      "tlSetGUID":                  false,
      /* Sample GUID cookie config (only used when tlSetGUID is true) */
      "tlGUIDCookie":               {
                                      name: "TLGUID",
                                      // The following are optional
                                      valueLength: 32,
                                      valueSet: "0123456789ABCDEF",
                                      path: "",
                                      domain: "",
                                      expires: 0,    // minutes; 0 implies a session cookie
                                      secure: false
                                    },

      "tlurl"                     : "/browse/tealeaf.do",
      "tlsecureurl"               : "/profile/tealeaf.do",
      "xhrAsync":                   true,

      /* Cross-domain configuration (if any) */
      "xd_CommonDomain":            "",
      "xd_iframeID":                "",
      "xd_iframeSrcURL":            "",
      "xd_iframeSrcURLSecure":      ""
    };
  }
}
/*
* Copyright   1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* This is the main UI Client Event Capture JavaScript file that is  
* used by other JavaScript to register their onload routines.
*
* @requires 
* TeaLeafCfg.js
*
* @version 2010.12.22.1
*
*/

if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Configuration &&
    !TeaLeaf.Configuration.tlinit)
{
  TeaLeaf.Configuration.tlinit = true;
  if (!TeaLeaf.tlBrowser) {
    // tlBrowser contains the detected browser. This is determined after the
    // page loads. See PageSetup() for implementation details.
    TeaLeaf.tlBrowser = { "UNKNOWN": true };
  }
  if (!TeaLeaf.$C) {

    TeaLeaf.$C = function(attr) {
      return attr;
    };
  }

  if (!Array.prototype.push) {
    Array.prototype.stackEnd = 0;
    /**
     * Add push if the browser does not supply
     * them with the Array object (IE6 and earlier)
     * @addon
     */
    Array.prototype.push = function(obj) {
      this[this.stackEnd] = obj;
      this.stackEnd++;
    };
  }
  if (!Array.prototype.pop) {
    /**
     * Add pop if the browser does not supply
     * them with the Array object (IE6 and earlier)
     * @addon
     */
    Array.prototype.pop = function(obj) {
      this.stackEnd--;
      return this[this.stackEnd];
    };
  }

  /* XHR Factory (Singleton)
   * Provides the interface for creating and requesting XMLHttpRequests
   *
   * createXHRObject()
   * Creates and returns a new XMLHttpRequest object.
   *
   * xhrRequest(reqMethod, reqUrl, reqHeaders, reqData, reqAsync, callback, xhr)
   * Makes an XMLHttpRequest and also returns the XMLHttpRequest object.
   * @param reqMethod
   *        "GET" or "POST"   
   * @param reqUrl
   *        The request URL.
   * @param reqHeaders
   *        Optional array of HTTP header objects in the form of {name, value} pairs.
   * @param reqData
   *        Optional request data.
   * @param reqAsync
   *        Optional true or false. Default 'false'
   * @param callback
   *        Optional callback object {loaded, success, failure}
   * @param xhr
   *        Optional XHR object to use. If not provided, a new XHR object is created.
   */
  TeaLeaf.XHRFactory = (function () {
    var MAX_XHR_WAIT_TIME;
    
    // Private properties.
    /* Timeout for XHR requests (milliseconds)
     */
    MAX_XHR_WAIT_TIME = 60000;

    // Private methods.
    function HTTP_SUCCESS(statusCode) {
      if ((statusCode >= 200 && statusCode < 300) ||
          statusCode === 304)
      {
        return true;
      }
      return false;
    }
  
    // The public interface object.
    return {
      "createXHRObject": function() {
        var i,
            methods,
            xhr;

        methods = [
          // All modern browsers
          function () { return new XMLHttpRequest(); },
          // IE 6 (on some platforms)
          function () { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); },
          // IE 5.5, IE 6 (on some platforms)
          function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
        ];

        for (i = 0; i < methods.length; i++) {
          try {
            // Try each of the functions
            xhr = methods[i]();
          }
          catch (e) {
            // Did not work
            continue;
          }

          if (xhr) {
            // Success! Memoize for the future
            this.createXHRObject = methods[i];
            return xhr;
          }
        }
        // None of the methods works!
        return null;
      },

      "xhrRequest": function(reqMethod, reqUrl, reqHeaders, reqData, reqAsync, callback, xhr) {
        var i,
            timeoutID;

        if (!reqMethod || !reqUrl) {
          return null;
        }
        reqMethod = reqMethod.toUpperCase();

        if (!xhr) {
          xhr = this.createXHRObject();
        }
        if (!xhr) {
          return null;
        }
        // Setup the callbacks but only if this is going to be an asynchronous request
        if (reqAsync) {
          xhr.onreadystatechange = function() {
            var status,
                statusText;

            try {
              switch (xhr.readyState) {
                case 0:  // UNSENT
                  break;
                case 1:  // OPENED
                  break;
                case 2:  // HEADERS_RECEIVED
                  if (callback && callback.loaded) {
                    /* Per W3C, status and statusText should exist as this state is triggered
                     * after HTTP response headers have been received. However, we ignore this
                     * callback as all browsers do not seem to implement it correctly.
                     */
                    try {
                      status = xhr.status;
                      statusText = xhr.statusText;
                    }
                    catch (e) {
                      // Set default values
                      if (!status) {
                        status = 0;
                      }
                      if (!statusText) {
                        statusText = "None";
                      }
                    }
                    finally {
                      callback.loaded(status, statusText);
                    }
                  }
                  break;
                case 3:  // LOADING
                  break;
                case 4:  // DONE
                  if (HTTP_SUCCESS(xhr.status)) {
                    if (callback && callback.success) {
                      callback.success(xhr.responseText, xhr.responseXML);
                    }
                  }
                  else {
                    if (callback && callback.failure) {
                      callback.failure(xhr.status, xhr.statusText);
                    }
                  }
                  break;
                default:  // UNKNOWN
                  break;
              }
            } catch (e) {
              // Ignore unhandled exceptions in callback routines.
            }
          };
        }

        xhr.open(reqMethod, reqUrl, reqAsync);
        if (reqHeaders) {
          for (i = 0; i < reqHeaders.length; i++) {
            xhr.setRequestHeader(reqHeaders[i].name, reqHeaders[i].value);
          }
        }
        // Send the request along with POST data (if any)
        if (reqMethod !== "POST" || !reqData) {
          reqData = null;
        }
        xhr.send(reqData);

        try {
          // Finally, schedule the cleanup.
          timeoutID = setTimeout(function () { 
                                   TeaLeaf.XHRFactory.deleteXHRObj(xhr);
                                 }, MAX_XHR_WAIT_TIME);
          xhr.timeoutID = timeoutID;
        } catch (e) {
          // Expected when using an ActiveX object.
        }
        return xhr;
      },

      "deleteXHRObj": function(xhr) {
        if (xhr && xhr.readyState !== 4) {
          if (xhr.abort) {
            xhr.abort();
          }
        }
        // Cancel any pending timeout.
        if (xhr.timeoutID) {
          clearTimeout(xhr.timeoutID);
          xhr.timeoutID = null;
        }
        // Cleanup
        xhr.onreadystatechange = function () {};
        xhr = null;
      }
    };
  })();

  /* Request API
   *
   */
  TeaLeaf.Request = function () {
    var data,
        headers,
        method,
        url;

    // Private properties
    data = headers = url = null;
    method = "POST";

    // Privileged methods
    this.getUrl = function () {
      // Get the appropriate URL
      var TCfg,
          tmpPath,
          tmpUrl,
          windowLocation,
          windowProtocol;

      if (url) {
        return url;
      }
      TCfg = TeaLeaf.Configuration;
      windowLocation = window.location;
      windowProtocol = windowLocation.protocol;
      tmpUrl = windowProtocol + "//" + windowLocation.host;
      if (windowProtocol == "http:") {
        tmpPath = TCfg.tlurl;
      }
      else {
        tmpPath = TCfg.tlsecureurl;
      }
      // Is this a site-root relative vs. page relative path
      if (tmpPath.substr(0, 1) == "/") {
        // site-root relative
        tmpUrl += tmpPath;
      }
      else {
        // page relative
        tmpUrl += windowLocation.pathname.substr(0, windowLocation.pathname.lastIndexOf("/")+1) + tmpPath;
      }

      return tmpUrl;
    };

    this.setUrl = function (newUrl) {
      url = newUrl;
    };

    this.getMethod = function () {
      return method;
    };

    this.setMethod = function (newMethod) {
      method = newMethod;
    };

    this.getData = function () {
      return data;
    };

    this.setData = function (newData) {
      var length;

      data = newData;
      if (data) {
        length = TeaLeaf.Request.totalDataLength || 0;
        length += data.length;
        TeaLeaf.Request.totalDataLength = length;
      }
    };

    this.getHeaders = function () {
      return headers;
    };

    this.setHeaders = function(newHeaders) {
      headers = newHeaders;  
    };

    this.clear = function () {
      data = headers = url = null;
    };
  };

  TeaLeaf.Request.prototype = {
    send: function(callback) {
      var iframeNode,
          iframeWindow,
          thatRequest,
          thatTealeaf,
          TCfg,
          xhr;

      TCfg = TeaLeaf.Configuration;

      // Check configuration
      if (!TCfg.xd_iframeID) {
        // Use direct XHR
        xhr = TeaLeaf.XHRFactory.xhrRequest(this.getMethod(), this.getUrl(), this.getHeaders(), this.getData(), TCfg.xhrAsync, callback);
        if (!xhr) {
          if (callback && callback.failure) {
            callback.failure(0, "XHR request failed!");
          }
          return;
        }
      }
      else {
        // Use TeaLeaf.Request API of the target iframe
        try {
          iframeNode = document.getElementById(TCfg.xd_iframeID);
          if (!iframeNode || !iframeNode.contentWindow) {
            if (callback && callback.failure) {
              callback.failure(0, "Could not retrive cross-domain iframe target!");
            }
            return;
          }

          iframeWindow = iframeNode.contentWindow;
          if (iframeWindow.postMessage && window.JSON && 0) {
            // TODO: Use postMessage API (JSON stringify)
            alert("Not implemented!");
          }
          else {
            thatTealeaf = iframeWindow.TeaLeaf;
            if (thatTealeaf && thatTealeaf.Request) {
              thatRequest = new thatTealeaf.Request();
              thatRequest.clear();
              this.setUrl(thatRequest.getUrl());
              thatRequest.setHeaders(this.getHeaders());
              thatRequest.setData(this.getData());
              thatRequest.send(callback);
            }
          }
        }
        catch (e) {
          if (callback && callback.failure) {
            callback.failure(0, (e.name ? (e.name + ": " + e.message) : e.toString()));
          }
          return;
        }
      }
    }
  };

  TeaLeaf.Request.GetTotalDataLength = function() {
    var length;

    length = TeaLeaf.Request.totalDataLength || 0;
    return length;
  };

  /**
   * Set TeaLeaf UI Client Event Capture as an SDK.
   * The default behavior is not set as an SDK
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.settlSDK = function () {
    TeaLeaf.Configuration.tlSDK = true;
  };

  /**
   * Reset TeaLeaf UI Client Event Capture not to act as an SDK.
   * The default behavior is not set as an SDK
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.resettlSDK = function () {
    TeaLeaf.Configuration.tlSDK = false;
  };

  /**
   * Set the url where TeaLeaf posts.
   */
  TeaLeaf.tlSetPostURL = function(tlvalue) { 
    TeaLeaf.Configuration.tlurl = tlvalue;
  }
  /**
   * Get the url where TeaLeaf posts.
   */
  TeaLeaf.tlGetPostURL = function() {
    return TeaLeaf.Configuration.tlurl;
  }

  /**
   * Random string generator
   */
  TeaLeaf.makeRandomString = function(length, inputSet) {
    var i, j,
        rv;

    if (!length || length <= 0) {
      return;
    }

    if (!inputSet) {
      // The default input set from which random characters will be chosen to create the string.
      inputSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^+-?";
    }
    rv = "";
    for (i = 0; i < length; i++) {
      j = Math.floor(Math.random() * inputSet.length);
      rv += inputSet.charAt(j);
    }
    return rv;
  };

  /**
   * Array to store all the object that need to be loaded after the page is rendered.
   * NOTE: This will not be used if the UI Client Event Capture is used as an SDK.
   */
  TeaLeaf.tLoadObjs = [];
  /**
   * This function is used for the other javascript files to register their
   * onload functions to be called
   * @param obj object that is registered from other JavaScript to be loaded
   * @param functionName object function that is registered from other JavaScript to be loaded
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.addOnLoad = function(obj, functionName) {
    if (arguments.length === 1) {
      TeaLeaf.tLoadObjs.push(obj);
    }
    else if (arguments.length > 1) {
      TeaLeaf.tLoadObjs.push(obj[functionName]);
    }
  };

  /**
   * tlSetCookie: Sets the cookie value. Automatically creates the cookie if
   *              it doesn't already exist.
   * @param name
   *        cookie name.
   * @param value
   *        cookie value.
   * @param expires (optional) Date object
   *        cookie expiration. Default is null, which indicates a
   *        session cookie.
   * @param path (optional)
   *        cookie path. Default is root "/"
   * @param domain (optional)
   *        cookie domain, pages on a domain made up of more than one
   *        server can share cookie info. Default is same domain as that
   *        of the current page.
   * @param secure (optional) boolean
   *        Set to true if the stored info. should only be accessible from
   *        a secure environment (e.g. https) Default is false.
   */
  TeaLeaf.tlSetCookie = function(name, value, expires, path, domain, secure) {
    if (!name) {
      return;
    }
    document.cookie = name + "=" + value +
                      (expires ? (";expires=" + expires.toUTCString()) : "") +
                      ";path=" + (path ? path : "/") +
                      (domain ? (";domain=" + domain) : "") +
                      (secure ? ";secure" : "");
  };

  /**
   * tlGetCookieValue: Returns the cookie value if it exists.
   * @param name
   *        cookie name.
   * @addon
   */
  TeaLeaf.tlGetCookieValue = function(name) {
    var i, j,
        c,
        cookies,
        value,
        nameEQ;

    nameEQ = name + "=";
    value = null;
    cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
      c = cookies[i];
      // Remove any leading whitespace
      for (j = 0; c.charAt(j) == ' '; j++) {
        ;
      }
      if (j) {
        c = c.substring(j, c.length);
      }
      // Compare the name
      if (c.indexOf(nameEQ) === 0) {
        value = c.substring(nameEQ.length, c.length);
        break;
      }
    }
	  return value;
  };

  /**
   * tlEraseCookie: Deletes the cookie if it exists.
   * @param name
   *        cookie name.
   * @addon
   */
  TeaLeaf.tlEraseCookie = function (name) {
    var expires;
    expires = new Date(1970, 1, 1);
	  TeaLeaf.tlSetCookie(name, "", expires);
  };

  /**
   * Browser sniffing functions.
   * CAUTION: Do not use these unless absolutely justified! For
   *          most cases where you would think about using these,
   *          object and functionality detection can be employed.
   */ 
  TeaLeaf.tlBrowserIsIE = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB["MSIE"];
    }
    return false;
  }

  TeaLeaf.tlBrowserIsMozilla = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB["MOZILLA"];
    }
    return false;
  }

  TeaLeaf.tlBrowserIsWebKit = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB["WEBKIT"];
    }
    return false;
  }

  TeaLeaf.tlBrowserIsOpera = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB["OPERA"];
    }
    return false;
  }

  TeaLeaf.tlBrowserIsUnknown = function () {
    var TB;
    TB = TeaLeaf.tlBrowser;
    if (TB) {
      return !!TB["UNKNOWN"];
    }
    return false;
  }

  /**
   * This function is used to load UI Client Event Capture or the
   * UI Client Event Capture SDK.
   * @requires
   * TeaLeafCfg.js
   * @addon
   */
  TeaLeaf.PageSetup = function () {
    var i,
        cValue,
        expires,
        iframeNode,
        iframeSrc,
        now,
        T,
        TCfg,
        TCfgGUIDCookie,
        ua;

    // Note: FF versions prior to 3.6 do not support document.readyState
    if (document.readyState && document.readyState !== "complete") {
      // Page has not been loaded yet!
      return;
    }

    T = TeaLeaf;
    TCfg = T.Configuration;
    TCfgGUIDCookie = TCfg.tlGUIDCookie;

    if (T.PageSetup.Complete) {
      // Being called more than one time.
      return;
    }
    T.PageSetup.Complete = true;

    // Cleanup callback (if one exists)
    if (T.PageSetup.Cleanup) {
      T.PageSetup.Cleanup();
    }

    // Browser detection based on the User Agent
    T.tlBrowser["UNKNOWN"] = false;
    ua = navigator.userAgent.toLowerCase();
    if (/opera|presto/.test(ua)) {
      T.tlBrowser["OPERA"] = true;
    }
    else if (/(apple)?webkit|safari|chrome/.test(ua)) {
      T.tlBrowser["WEBKIT"] = true;
    }
    else if (/msie|trident/.test(ua)) {
      T.tlBrowser["MSIE"] = true;
    }
    else if (/^(?=.*?\b(mozilla|gecko|firefox)\b)((?!compatible).)*$/.test(ua)) {
      T.tlBrowser["MOZILLA"] = true;
    }
    else {
      T.tlBrowser["UNKNOWN"] = true;
    }

    // Cross domain initialization and iframe creation (optional)
    if (TCfg.xd_CommonDomain) {
      try {
        document.domain = TCfg.xd_CommonDomain;
      }
      catch (e) {
      }
    }
    if (TCfg.xd_iframeID) {
      try {
        // check if the cross-domain iframe exists
        iframeNode = document.getElementById(TCfg.xd_iframeID);
        if (!iframeNode) {
          // create the iframe
          iframeSrc = ((window.location.protocol === "http:") ? TCfg.xd_iframeSrcURL : TCfg.xd_iframeSrcURLSecure);
          if (iframeSrc) {
            iframeNode = document.createElement("IFRAME");
            if (iframeNode) {
              iframeNode.id = TCfg.xd_iframeID;
              iframeNode.src = iframeSrc;
              iframeNode.style.display = "none"
              iframeNode.style.visibility = "hidden";
              document.body.appendChild(iframeNode);
            }
          }
        }
      }
      catch (e) {
      }
    }

    // The SDK GUID
    if (TCfg.tlSetGUID) {
      if (!TCfgGUIDCookie || !TCfgGUIDCookie.name) {
      }
      else {
        // Check for optional members and assign defaults wherever applicable
        if (!TCfgGUIDCookie.valueLength) {
          TCfgGUIDCookie.valueLength = 32;
        }
        if (!TCfgGUIDCookie.valueSet) {
          TCfgGUIDCookie.valueSet = "0123456789ABCDEF";
        }

        cValue = T.tlGetCookieValue(TCfgGUIDCookie.name);
        if (!cValue) {
          now = new Date();
          cValue = T.makeRandomString(TCfgGUIDCookie.valueLength, TCfgGUIDCookie.valueSet);
          expires = TCfgGUIDCookie.expires ? new Date(now.getTime() + TCfgGUIDCookie.expires * 60 * 1000) : null;
          // Create a new cookie
          T.tlSetCookie(TCfgGUIDCookie.name, cValue, expires, TCfgGUIDCookie.path, TCfgGUIDCookie.domain, TCfgGUIDCookie.secure);
        }
      }
    }
    if (!TCfg.tlSDK) {
      for (i=0; i < T.tLoadObjs.length; i++) {
        T.tLoadObjs[i]();
      }
    }
    T.EndLoad = new Date();
  };

  if (document.readyState === "complete") {
    // Page is already initialized!
    TeaLeaf.PageSetup();
  }
  else if (document.addEventListener) {
    // Mozilla, Opera and Webkit
    document.addEventListener("DOMContentLoaded", TeaLeaf.PageSetup, false);
    // fallback
    window.addEventListener("load", TeaLeaf.PageSetup, false);
    TeaLeaf.PageSetup.Cleanup = function () {
      var T;

      T = TeaLeaf;
      document.removeEventListener("DOMContentLoaded", T.PageSetup, false);
      window.removeEventListener("load", T.PageSetup, false);
    }
  }
  else if (document.attachEvent) {
    // IE
    document.attachEvent("onreadystatechange", TeaLeaf.PageSetup);
    // fallback
    window.attachEvent("onload", TeaLeaf.PageSetup);
    TeaLeaf.PageSetup.Cleanup = function () {
      var T;
      
      T = TeaLeaf;
      document.detachEvent("onreadystatechange", T.PageSetup);
      window.detachEvent("onload", T.PageSetup);
    }
  }
  else {
    // others
    if (typeof window.onload === "function" ) {
      TeaLeaf.OnLoad = window.onload;
    }
    else {
      TeaLeaf.OnLoad = null;
    }
    window.onload = function() {
      var T;

      T = TeaLeaf;
      T.PageSetup();
      window.onload = T.OnLoad;
      if (T.OnLoad) {
        T.OnLoad();
      }
    };
  }
}
/*
* Copyright 1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* Configuration file for TeaLeafEvent.js   
*
* @version 2010.12.22.1
*
*/

if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Event)
{
	//	Constructor for the Event
    TeaLeaf.Event = function(type, subtype, source) {    
	    this.date = new Date();
	    if( subtype ) {
		    this.EventType    = type;
		    this.EventSubType = subtype;
		    if( source ) {
			    this.EventSource = source;
		    }
		    else{
		        //default is empty string
		        this.EventSource ="";
		    }
	    }
	    else {
		    this.EventType    = "CUSTOM";
		    this.EventSubType = type;
	    }
    }
    
   if(typeof TeaLeaf.Event.Configuration == "undefined"){  
        TeaLeaf.Event.Configuration = {
            "tlinit"                    : false,
            "tlqueueevents"             : true,
            "tlqueueeventstimer"        : 30000,
            "tlqueueeventsmaxsz"        : 8192,
            "tlshowexceptions"          : false,
            "tleventcount"              : 0,
            "tlexceptioncount"          : 0,
            "tlpageid"                  : "", 
            "tlinitflag"                : false,
            "tlbeforeunloadflag"        : false,
            "tlusetopqueue"             : false,
            "tllastdwelltime"           : "",
            "tlidoflastvisitedcontrol"  : "",
            "tleventunloadflag"         : true,
            "tleventbeforeunloadflag"   : true,
            "tlcatcherrors"             : true,
            /* tlcatchpopups
             * Set this to 'true' if you want the SDK to report on window.open() status.
             * Used to determine if popup windows were blocked on the client.
             */
            "tlcatchpopups"             : false,
            /* tlCatchAlerts
             * Set this to 'true' if you want the SDK to report on window.alert(),
             * window.confirm() and window.prompt() calls.
             */
            "tlCatchAlerts"             : false,
            "tlignoresendfailure"       : true,
            "tlasync"                   : true,
            "tlvisitorder"              : "",
            "t1970"                     : 0,
            "tlXP"                      : "",
		    "tlXPCount"                 : 0,
		    "tlXPTable"                 : "",
		    "tlmaxeventcount"           : 300,
		    "tlmaxeventexception"       : 10,


            tlResolution:[
                {"width": 799,       "height": 599,     "type": 0,  "displayText": "small"},
                {"width": 800,       "height": 600,     "type": 1,  "displayText": "800x600"},
                {"width": 1024,      "height": 760,     "type": 2,  "displayText": "1024x760"},
                {"width": 1280,      "height": 1024,    "type": 3,  "displayText": "1280x1024"},
                {"width": 1000000,   "height": 1000000, "type": 4,  "displayText": "large"}
            ],		             
            //This is the list of HTTP headers that are static and are
		    tlHTTPRequestHeadersSet:[
		        {"tlreqhttpheadername": "Content-Type",                     "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetContentType()"},
			    {"tlreqhttpheadername": "X-TeaLeafType",                    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventType()"},
			    {"tlreqhttpheadername": "X-TeaLeafSubType",                 "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlEventSubType()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Url",               "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetUrlPath()"},
                {"tlreqhttpheadername": "X-TeaLeaf-UIEventCapture-Version", "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetJSVersion()"}
		    ],   
		    //This is the list of HTTP headers that have the eval value at the time of POST
		    tlHTTPRequestHeadersEvalInit:[
			    {"tlreqhttpheadername": "X-TeaLeaf-Screen-Res",         "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionType(screen.width ,screen.height)"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Browser-Res",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlResolutionTypeBrowser()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Render",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetRenderTime()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Objects",       "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetElementCount(\"object\")"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Img-Fail",      "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlBadImageCount()"}
		    ],  
		    tlHTTPRequestHeadersEvalBeforeUnload:[
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Events",    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetEventCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Bytes",     "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Request.GetTotalDataLength()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Cui-Exceptions","tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetExceptionCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Alert-Count",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetAlertCount()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Dwell",         "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetDwellTime()"},
			    {"tlreqhttpheadername": "X-TeaLeaf-Page-Last-Field",    "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetLastVisitedElementID()"},   
			    {"tlreqhttpheadername": "X-TeaLeaf-Visit-Order",        "tlsethttpheader": true,    "tlreqhttpheadervalue": "TeaLeaf.Event.tlGetVisitOrder()"}   
		    ]   
        };  
    }   
}

/*
* Copyright 1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* Event and communication setup.   
*
* @requires 
* TeaLeaf.js
* TeaLeafEventCfg.js
*
* @version 2010.12.22.1
*
*/
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Event &&
    TeaLeaf.Event.Configuration)
{
	try{
	    if(typeof TeaLeaf_PageID == "undefined"){
			TeaLeaf_PageID = null;
		}
	}
	catch(e){
		TeaLeaf_PageID = null;
	}
    
    TeaLeaf.Event.tlQueuedXML = "";
    TeaLeaf.Event.tlQueuedXPXML = "";
    TeaLeaf.Event.tlWindowObjects = [{"tlWindowName": "", "tlWindowObject":""}];
    
    /**
    * Get TeaLeaf UI Client Event content type that 
    * is sent in the HTTP headers of the TeaLeaf AJAX POST
    * that delivers the XML with the UI Cient Events to the 
    * capture device. 
    * @addon
    */
    TeaLeaf.Event.tlGetContentType = function(){
        var contentType = "text/xml";
        return contentType;
    }
    /**
    * Get TeaLeaf UI Client Event XEvent that 
    * is sent in the HTTP headers of the TeaLeaf AJAX POST
    * that delivers the XML with the UI Cient Events to the 
    * capture device. 
    * @addon
    */
    TeaLeaf.Event.tlGetTeaLeafXEvent = function(){
        var teaLeafXEvent = TeaLeaf.$C("ClientEvent");
        return teaLeafXEvent;
    }
    /**
    * Get TeaLeaf UI Client Event type set during
    * TeaLeaf event definition.
    * @addon
    */    
    TeaLeaf.Event.tlEventType = function() {
      var eventType;
      eventType = TeaLeaf.Event.SetType;
      // XXX: Need a better way to accomplish this.
      TeaLeaf.Event.SetType = "";
      return eventType;
    }
    /**
    * Get TeaLeaf UI Client Event sub type set during
    * TeaLeaf event definition.
    * @addon
    */        
    TeaLeaf.Event.tlEventSubType = function() {
      var subType;
      subType = TeaLeaf.Event.SetSubType;
      // XXX: Need a better way to accomplish this.
      TeaLeaf.Event.SetSubType = "";
      return subType;
    }
    /**
    * Get the path relative to the host.
    * @addon
    */            
    TeaLeaf.Event.tlGetUrlPath = function(){
        var strpath = window.location.pathname;
        return strpath;
    }
    /**
    * Get TeaLeaf UI Client Event version that 
    * is sent in the HTTP headers of the TeaLeaf AJAX POST
    * that delivers the XML with the UI Cient Events to the 
    * capture device. 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlGetJSVersion = function(){
        return TeaLeaf.Configuration.tlversion;
    }
    /**
    * Get the resolution type (0-4) based on the resolution defined in 
    * the configuration file. 
    * @param width 
    * @param height 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlResolutionType = function(width, height){ 
        var res = TeaLeaf.Event.Configuration.tlResolution;
        for(var i=0; i<res.length; i++)
        {
            if(width <= res[i].width || height <= res[i].height)
            {
                return res[i].type;
            }
        }
        return res[res.length-1].type;        
    }
    /**
    * Get the browser resolution type. 
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */
    TeaLeaf.Event.tlResolutionTypeBrowser = function(){
        var winWidth = 0;
        var winHeight = 0;  
        if(window.innerWidth){
            winWidth = window.innerWidth;
            winHeight = window.innerHeight;
        }
        else if(document.documentElement && document.documentElement.clientWidth){   
            winWidth = document.documentElement.clientWidth;
            winHeight = document.documentElement.clientHeight;
        }
        else if(document.body && document.body.clientWidth){
            winWidth = document.body.clientWidth;
            winHeight = document.body.clientHeight;
        }
        else{
            var elems = document.getElementsByTagName("body"); 
            if(elems.length > 0){
                winWidth = elems[0].clientWidth;
                winHeight = elems[0].clientHeight;
            }
        }                
        var retType = TeaLeaf.Event.tlResolutionType(winWidth, winHeight);  
        return retType;
    }
    /**
    * Get the page render time. 
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js
    * @addon
    */    
    TeaLeaf.Event.tlGetRenderTime = function(){
        return TeaLeaf.Event.PageLoadMilliSecs;
    }
    /**
    * Get element count. 
    * @param element DOM element name 
    * @addon
    */        
    TeaLeaf.Event.tlGetElementCount = function(element){
        return document.getElementsByName(element).length;		   	
    }
  /**
   * Count the broken images.
   * @addon
   */
  TeaLeaf.Event.tlBadImageCount = function() {
    var	i,
        bad_image_count,
        documentImages,
        img,
        total_images;

    bad_image_count = 0;
    documentImages = document.images;    
    total_images = documentImages.length;

    for (i = 0; i < total_images; i++) {
      img = documentImages[i];

      if ((!img) ||
          (typeof img.complete === "boolean" && !img.complete) ||
          // img.complete is true if the image has been downloaded, decoded and found to be valid.
          (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0))
          // If the naturalWidth (intrinsic width of the image) exists and is zero, indicates an invalid image
      {
        bad_image_count++;
        continue;
      }
    }
    return bad_image_count;
  }

    /**
    * Send Flash UI event. 
    * @addon
    */            	
	TeaLeaf.Event.tlFlashSend=function(tlType,tlSubType,tlData,tlDelimeter){
       var tlevt=new TeaLeaf.Event(tlType,tlSubType);
       tlevt.tlAddData(tlData.split(tlDelimeter));
       tlevt.tlSend();
    }
    /**
    * Display Flash Debug in a popup Window. 
    * @addon
    */   
    TeaLeaf.Event.tlShowFlashDebug=function(tlWindowName,tlDebugMessage){
      tlDebugMessage+="<BR>";
      for(i=0;i<TeaLeaf.Event.tlWindowObjects.length;i++){
        if(TeaLeaf.Event.tlWindowObjects[i].tlWindowName==tlWindowName){
          if(TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.closed){
            TeaLeaf.Event.tlWindowObjects[i].tlWindowObject=window.open("",tlWindowName,"width=600,height=300,scrollbars=yes,resizable=yes");
          }
          TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.document.writeln(tlDebugMessage.fontsize(2));
		  TeaLeaf.Event.tlWindowObjects[i].tlWindowObject.scrollTo(0,50000);
          return;
        }
      }
      var tlNewWindowObject=window.open("",tlWindowName,"width=600,height=300,scrollbars=yes,resizable=yes");
      TeaLeaf.Event.tlWindowObjects.push({"tlWindowName":tlWindowName,"tlWindowObject":tlNewWindowObject});
      tlNewWindowObject.document.writeln(tlDebugMessage.fontsize(2));
    }

    /**
    * Set TeaLeaf current event count. 
    * @addon
    */            	
	TeaLeaf.Event.tlSetEventCount = function(tleventcount){
        TeaLeaf.Event.Configuration.tleventcount = tleventcount;		   	
    }
	
    /**
    * Get TeaLeaf current event count. 
    * @addon
    */            	
	TeaLeaf.Event.tlGetEventCount = function(){
        return TeaLeaf.Event.Configuration.tleventcount;		   	
    }
    /**
    * Get sent sting length. 
    * @param sendStr get lenght of sendStr
    * @addon
    */            	
    TeaLeaf.Event.tlGetSendStringBytes = function(sendStr){
        return sendStr.length;		   	
    }
    
   /**
    * Get TeaLeaf current exception event count. 
    * @addon
    */            	
    TeaLeaf.Event.tlGetExceptionCount = function() {
        return (TeaLeaf.Event.Configuration.tlcatcherrors ? TeaLeaf.Event.Configuration.tlexceptioncount : null);
    }
    
    /**
    * Get user dwell time on a page.
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js 
    * @addon
    */            	
    TeaLeaf.Event.tlGetDwellTime = function(){
        return TeaLeaf.Event.tlDateDiff(TeaLeaf.tlStartLoad, TeaLeaf.Event.Configuration.tllastdwelltime);
    }
    /**
    * Get the ID of the last visited DOM element that we have listeners attached.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	    
    TeaLeaf.Event.tlGetLastVisitedElementID = function(){
        return TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol;
    }
    /**
    * Get the date difference between two values.
    * @param v1 first time value 
    * @param v2 second time value 
    * @addon
    */            	        
    TeaLeaf.Event.tlDateDiff = function(v1, v2) {
		return Math.abs(v1-v2);
	}
    /**
    * Get the XForm path string with ids or names in fill out order.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	    	
	TeaLeaf.Event.tlGetVisitOrder= function(){
	    return TeaLeaf.Event.Configuration.tlvisitorder;
	}
    /**
    * Re-format the XML.
    * @param Str containing XML to be re-formated 
    * @addon
    */            	        
    TeaLeaf.Event.tlFormatXML = function(Str) {
        if (Str) {
			if( Str.replace ) {
            	return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			}
			return Str;
		}
        return "";
    }
    /**
    * Get cookie value.
    * @param name cookie name 
    * @addon
    */            	            
    TeaLeaf.Event.tlGetCookie = function(name){
	    var dc = document.cookie;
	    var prefix = name + "=";
	    var begin = dc.indexOf("; " + prefix);
	    if (begin == -1) {
		    begin = dc.indexOf(prefix);
		    if (begin != 0) {
			    return "";
		    }
	    }
	    else {
		    begin += 2;
	    }
	    var end = document.cookie.indexOf(";", begin);
	    if (end == -1) {
		    end = dc.length;
	    }
	    return unescape(dc.substring(begin + prefix.length, end));
    }  
  /**
   *  Return the HTTP headers.
   * @param tlreq XMLHTTPRequest object
   * @param tlheaderconfig JSON array with the HTTP header field values.
   * @requires
   * TeaLeaf.js
   * TeaLeafCfg.js
   * TeaLeafEventCfg.js
   * @addon
   */
  TeaLeaf.Event.tlGetHTTPHeaders = function(tlheaderconfig) {
    var i,
        headers,
        value;
        
    headers = [];
    for (i=0; i < tlheaderconfig.length; i++) {
      if (tlheaderconfig[i].tlsethttpheader) {
        value = eval(tlheaderconfig[i].tlreqhttpheadervalue);
        if (value) {
          headers.push({"name": tlheaderconfig[i].tlreqhttpheadername, "value": value});
        }
      }
    }
    return headers;
  }
    /**
    * Get TeaLeaf page id.
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js 
    * @addon
    */            	    
    TeaLeaf.Event.tlGetPageId = function(){
	    //	Have we already calculated this?
	    if(TeaLeaf.Event.Configuration.tlpageid) {
		    return TeaLeaf.Event.Configuration.tlpageid;
	    }
      // Look for the page id variable that will be
      // set by javascript outside of TeaLeaf.js
      if (TeaLeaf_PageID) {
        TeaLeaf.Event.Configuration.tlpageid = TeaLeaf_PageID;
        return TeaLeaf.Event.Configuration.tlpageid;
      }
    
	    //	Neither of the above options, go ahead and generate the
	    //	page id from a time stamp.
	    TeaLeaf.Event.Configuration.tlpageid = "ID" + TeaLeaf.tlStartLoad.getHours() + "H" +
		    			TeaLeaf.tlStartLoad.getMinutes() + "M" +
			    		TeaLeaf.tlStartLoad.getSeconds() + "S" +
				    	TeaLeaf.tlStartLoad.getMilliseconds()+ "R"+
				    	Math.random();
	    return TeaLeaf.Event.Configuration.tlpageid;
    }
    /**
    * Send failure message.
    * @param url url 
    * @param failedUrl url where failure occured 
    * @param message failure message 
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js 
    * @addon
    */            	    
    TeaLeaf.Event.tlSendFailure = function(url, failedUrl, message){
	    var t1970,
	        tlnow,
	        tlsendStr,
	        tltimeDur;
	        
	    tlnow = new Date();
	    t1970 = Date.UTC(tlnow.getUTCFullYear(),tlnow.getUTCMonth(),tlnow.getUTCDate(), tlnow.getUTCHours(),tlnow.getUTCMinutes(),tlnow.getUTCSeconds(), tlnow.getUTCMilliseconds());
    
	    if( TeaLeaf.tlStartLoad ) {
		    tltimeDur = TeaLeaf.Event.tlDateDiff(tlnow, TeaLeaf.tlStartLoad);
	    }

	    TeaLeaf.Event.Configuration.tleventcount++;
	    TeaLeaf.Event.Configuration.tlexceptioncount++;
      tlsendStr = '<' + TeaLeaf.$C("ClientEvent") + ' '  +
                  TeaLeaf.$C("Count")             + '="' + TeaLeaf.Event.Configuration.tleventcount +	'" ' +
                  TeaLeaf.$C("Type")              + '="' + TeaLeaf.$C("INFO") + '" ' +
                  TeaLeaf.$C("SubType")           + '="' + TeaLeaf.$C("EXCEPTION") + '" ' +
                  TeaLeaf.$C("FailedUrl")         + '="' + TeaLeaf.Event.tlFormatXML(failedUrl) + '" ' +
                  TeaLeaf.$C("Message")           + '="' + TeaLeaf.Event.tlFormatXML(message) + '" ' +
                  TeaLeaf.$C("TimeDuration")      + '="' + tltimeDur + '" ' +
                  TeaLeaf.$C("DateSince1970")     + '="' +
                  t1970 + '" ' +
                  TeaLeaf.$C("PageId")            + '="' + TeaLeaf.Event.tlGetPageId() + '" ' +
                  ' />\r\n';

	    //	Send the request
	    try {
	        TeaLeaf.Event.Configuration.tlasync = true;
        var tlExceptionEvent = new TeaLeaf.Event(TeaLeaf.$C("INFO"), TeaLeaf.$C("EXCEPTION"));
		    tlExceptionEvent.tlSendXML(tlsendStr,true);
	    }   
	    catch(exc) {
	        if( TeaLeaf.Event.Configuration.tlshowexceptions ) {
			    alert(exc.name + ": " + exc.message + "\r\n\r\nPos 4");
			}
	    }
    }   
    /**
    * Create the XMLHTTPRequest transport object.
    * @addon
    */            	                      
    TeaLeaf.Event.tlGetTransport = function(){
	    var	tlreq;
	    if(window.XMLHttpRequest) {
		    try {
			    tlreq = new XMLHttpRequest();
		    }
		    catch(e) {
			    tlreq = null;
		    }
	    }
	    else if(window.ActiveXObject) {
		    try {
			    tlreq = new ActiveXObject("Msxml2.XMLHTTP");
		    }
		    catch(e) {
			    try {
			    	tlreq = new ActiveXObject("Microsoft.XMLHTTP");
			    }
			    catch(e) {
				    tlreq = null;
			    }
		    }
	    }
	    return tlreq;
    }

    TeaLeaf.Event.TransportArray = [];
    
    /**
    * Get the XMLHTTPRequest transport object from the Transport Array if not create one.
    * @addon
    */            	                      
    TeaLeaf.Event.tlXMLHTTPObj = function(){   
 	    var i = 0;
	    for(; i < TeaLeaf.Event.TransportArray.length; i++) {
    		if( TeaLeaf.Event.TransportArray[i] && TeaLeaf.Event.TransportArray[i].readyState > 0 ) {
			    if( TeaLeaf.Event.TransportArray[i].readyState == 4 ) {
    				TeaLeaf.Event.TransportArray[i].abort();
    				TeaLeaf.Event.TransportArray[i].onreadystatechange = new function() {};
				    return TeaLeaf.Event.TransportArray[i];
			    }
		    }
		    else {
    			TeaLeaf.Event.TransportArray[i] = TeaLeaf.Event.tlGetTransport();
    			return TeaLeaf.Event.TransportArray[i];
		    }
	    }
	    //	Nope, we need another
    	TeaLeaf.Event.TransportArray[i] = TeaLeaf.Event.tlGetTransport();
    	return TeaLeaf.Event.TransportArray[i];
    }  
    /**
    * Clean the XMLHTTPRequest Transport Array.
    * @addon
    */            	                          
    TeaLeaf.Event.tlCleanXMLHTTPObj = function(obj){
	    //	Zap this one!
	    var i = 0;
	    for(; i < TeaLeaf.Event.TransportArray.length; i++) {
		    if( obj == TeaLeaf.Event.TransportArray[i] ) {
    			TeaLeaf.Event.TransportArray[i] = null;
		    }
	    }   
    }
    /**
     * Add event handler.
     * @param tlitem element that we attach a listener
     * @param tlevt event that we listen for
     * @param tlhandler event handler
     * @addon
     */
    TeaLeaf.Event.tlAddHandler = function(tlitem, tlevt, tlhandler, tlcapture) {
      try {
        if (!tlitem) {
          return;
        }
        if (tlitem.addEventListener) {
          // DOM Level 2 compliant browsers (FF, Safari, Chrome etc.)
          tlitem.addEventListener(tlevt, tlhandler, tlcapture);
        }
        else if (tlitem.attachEvent) {
          // IE
          tlitem.attachEvent('on'+tlevt, tlhandler);
        }
        else {
          // XXX - debug / diagnostic message here
        }
      }
      catch  (exc) {
        /* This usually happens when we're trying to attach to
         * frames where there is a domain / protocol / port mismatch.
         * The browser does not allow access in such cases.
         */
        if (TeaLeaf.Event.Configuration.tlshowexceptions) {
          alert(exc.name + ": " + exc.message + "\r\n\r\nPos 4");
        }
      }
    }
    /**
     * Remove event handler.
     * @param tlitem element that we attached a listener
     * @param tlevt event that we listened
     * @param tlhandler event handler
     * @addon
     */            	                              
    TeaLeaf.Event.tlRemoveHandler = function(tlitem, tlevt, tlhandler, tlcapture) {
      try {
        if (!tlitem) {
          return;
        }
        if (tlitem.removeEventListener) {
          tlitem.removeEventListener(tlevt, tlhandler, tlcapture);
        }
        else if (tlitem.detachEvent) {
          tlitem.detachEvent('on'+tlevt, tlhandler);
        }
      }
      catch (exc) {
        /* This usually happens when we're trying to detach from
         * frames where there is a domain / protocol / port mismatch.
         * The browser does not allow access in such cases.
         */
        if (TeaLeaf.Event.Configuration.tlshowexceptions) {
          alert(exc.name + ": " + exc.message + "\r\n\r\nPos 5");
        }
      }
    }
    /**
    * Flush the event queue.
    * @param force forces the flush if true
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js 
    * TeaLeafEventCfg.js 
    * @addon
    */            	                              
	TeaLeaf.Event.tlFlushQueue = function(force) {
		var	dataToSend = null;
		var	queueTime = TeaLeaf.Event.Configuration.tlqueueeventstimer;
		var maxTime = queueTime * 3;
		//	Nothing to send
		if(TeaLeaf.Event.Configuration.tlusetopqueue) {
			var now = new Date();
			var diff = (now - top.TeaLeaf.Event.TimeSent);		
			//	If we have queued data, let's send it if appropriate
			if( top.TeaLeaf.Event.tlQueuedXML ) {
				if( force || diff >= queueTime ) {
					dataToSend = top.TeaLeaf.Event.tlQueuedXML;
					top.TeaLeaf.Event.tlQueuedXML = "";
					top.TeaLeaf.Event.TimeSent = now;
				}
			}
			//	Nothing to send
			if( ! dataToSend ) {
				if( ! force && diff < (queueTime / 2) ) {
					//	A little heuristics here--If the time is less than
					//	1/2 the standard time, then assume another frame
					//	is handling the send.  Slow down the transmission
					//	time for this frame.
					
					// we need to do this so we do not end up waiting infinately.
					if(queueTime >= maxTime){
					    queueTime = maxTime;
					}
					else{
					    queueTime = (queueTime * 3) / 2;
					}
				}
				return queueTime;
			}
		}
		else {
			if( ! TeaLeaf.Event.tlQueuedXML ) {
				return queueTime;
			}
			dataToSend = TeaLeaf.Event.tlQueuedXML;
			TeaLeaf.Event.tlQueuedXML = "";
		}
		
		//	Get the Event
    var evt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("QUEUED"));
		evt.tlSendXML(dataToSend);
		return queueTime;

    }
    /**
    * Push XML on the stack.
    * @param tag tag name
    * @addon
    */            	                              
    TeaLeaf.Event.prototype.tlPushXML = function(tag, tlXPath){
	    if( ! this.XMLStack ) {
		    this.XMLStack = [];
    	}
	    if(tlXPath){
	    }
	    else{
	        var strTag = "  <" + tag + " ";
	        if(this.XMLData){
	            this.XMLData += strTag;
	        }
	        else{
	            this.XMLData = strTag;
	        }
	    }
    }    
    /**
    * Pop XML from the stack.
    * @param tag tag name
    * @addon
    */            	                              
    TeaLeaf.Event.prototype.tlPopXML = function(){
        if(this.XMLData){
	        this.XMLData += "/>\r\n";
	    }
	    else{
            return false;
	    }
    }  
    /**
    * Add data tot he XML stack.
    * @param name0 name of the XML attribute.
    * @param value0 value of the XML attribute.
    * @addon
    */            	                              
    TeaLeaf.Event.prototype.tlAddData = function(nameValueArray){
	    var offset = "";
	    if( this.XMLStack ) {
		    for(var ind = 0; ind < this.XMLStack.length; ind++) {
			    offset += "  ";
		    }		    
	    }	    

      var parts = [];
      for (var ind = 0; ind < nameValueArray.length; ind += 2) {
        var tlName = nameValueArray[ind];
        var tlValue = TeaLeaf.Event.tlFormatXML(nameValueArray[ind+1]);
        if (tlName && tlValue) {
          parts[parts.length] = offset + tlName + "=" + '"' + tlValue + '" ';
        }
      }

      if (!this.XMLData) {
        this.XMLData = "";
      }
      this.XMLData += parts.join("");
      nameValueArray = null;
    }

  /**
   * Send the XML with the UI Client Events including the HTTP headers if set.
   * @param tlsendStr XML message
   * @requires
   * TeaLeafEventCfg.js
   * @addon
   */
  TeaLeaf.Event.prototype.tlSendXML = function(tlsendStr, ignoreSendFailure) {
    var callback,
        headers,
        tlreq;
    try {
      tlreq = new TeaLeaf.Request();
      if (!tlreq) {
        // Error: Cannot make request.
        return;
      }
      tlreq.clear();

      // Set the data
      var tlposttime = new Date();
      var tlpostmilisec = Date.UTC(tlposttime.getUTCFullYear(),tlposttime.getUTCMonth(),tlposttime.getUTCDate(), tlposttime.getUTCHours(),tlposttime.getUTCMinutes(),tlposttime.getUTCSeconds(), tlposttime.getUTCMilliseconds());
      var tlPostTimeStamp = '<' + TeaLeaf.$C("ClientEventSet") + ' ' +
                            TeaLeaf.$C("PostTimeStamp") + '="' + tlpostmilisec + '" >';
      tlsendStr = tlPostTimeStamp + tlsendStr + '</' + TeaLeaf.$C("ClientEventSet") + '>';
      TeaLeaf.Event.Configuration.tlignoresendfailure = ignoreSendFailure;
      tlreq.setData(tlsendStr);

      // Get and set the headers
      headers = [ {"name": "X-TeaLeaf", "value": "ClientEvent"} ];
      headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet));
      if (TeaLeaf.Event.Configuration.tlinitflag && !TeaLeaf.Event.InitHeadersSent) {
        headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit));
        TeaLeaf.Event.InitHeadersSent = true;
      }
      if (TeaLeaf.Event.Configuration.tlbeforeunloadflag && !TeaLeaf.Event.UnloadHeadersSent) {
        headers = headers.concat(TeaLeaf.Event.tlGetHTTPHeaders(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload));
        TeaLeaf.Event.UnloadHeadersSent = true;
      }
      tlreq.setHeaders(headers);

      callback = {
        "loaded": function(statusCode, statusText) {
          /* Clear the queued xml stored in the cookie.
           * Done on readyState == 2, which means data has been sent
           * and is waiting on a server response.
           */
          if (TeaLeaf.tlGetCookieValue("tlQueuedXML")) {
            TeaLeaf.tlEraseCookie("tlQueuedXML");
          }
        },

        "failure": function(statusCode, statusText) {
          if (!TeaLeaf.Event.Configuration.tlignoresendfailure) {
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
            TeaLeaf.Event.tlSendFailure(tlreq.getUrl(), tlreq.getUrl(), "Status " + statusCode + ": " + statusText);
          }
        },

        "success": function(respText, respXML) {
          // Do nothing!
          TeaLeaf.Event.Configuration.tlignoresendfailure = false;
        }
      };
      // Send the request
      tlreq.send(callback);
    }
    catch(e) {
      var theUrl;
      theUrl = tlreq ? tlreq.getUrl() : "none";
      if (TeaLeaf.Event.Configuration.tlshowexceptions) {
        if (e.name) {
          alert(e.name + ": " + e.message + "\r\n\r\nURL: " + theUrl + "\r\n\r\nPos 3 ");
        }
        else {
          alert(e + "\r\n\r\nURL: " + theUrl + "\r\n\r\nPos 3 ");
        }
      }
      if (!TeaLeaf.Event.Configuration.tlignoresendfailure) {
        TeaLeaf.Event.Configuration.tlignoresendfailure = true;
        TeaLeaf.Event.tlSendFailure(theUrl, theUrl, e.name ? (e.name + ": " + e.message) : e.toString());
      }
    }
  };


    /**
    * Depending on the configuration settings send the XML or queue the XML message.
    * @requires
    * TeaLeaf.js
    * TeaLeafCfg.js
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                  
    TeaLeaf.Event.prototype.tlSend = function(bRoot){
        TeaLeaf.Event.Configuration.tleventcount++;
      
	    //	Pop everything on the queue
	    if( this.XMLStack ) {
		    while( this.XMLStack.length > 0 ) {
			    this.tlPopXML()
		    }
	    }
	    if(TeaLeaf.Event.Configuration.tleventcount > TeaLeaf.Event.Configuration.tlmaxeventcount){
	        TeaLeaf.Event.tlFlushQueue();
	        return;
	    }

	    var	t1970 = Date.UTC(this.date.getUTCFullYear(),this.date.getUTCMonth(),this.date.getUTCDate(), 
	                    this.date.getUTCHours(),this.date.getUTCMinutes(),this.date.getUTCSeconds(), this.date.getUTCMilliseconds());

	    
      sendStr = '<' + TeaLeaf.$C("ClientEvent") + ' '  +
                TeaLeaf.$C("Count")             + '="' + TeaLeaf.Event.Configuration.tleventcount + '" ' +
                TeaLeaf.$C("Type")              + '="' + this.EventType + '" ' +
                TeaLeaf.$C("SubType")           + '="' + this.EventSubType + '" ';
			  
      if (this.EventSource) {
        sendStr += TeaLeaf.$C("Source") + '="' + this.EventSource+ '" ';
      }

      if (!bRoot) {
        sendStr += this.XMLData;
      }

      if (TeaLeaf.tlStartLoad) {
        sendStr += TeaLeaf.$C("TimeDuration") + '="'  + TeaLeaf.Event.tlDateDiff(this.date, TeaLeaf.tlStartLoad) + '" ';
      }

      sendStr += TeaLeaf.$C("DateSince1970") + '="' +
                 t1970 +
                 '" ';

      sendStr += TeaLeaf.$C("PageId") + '="' + TeaLeaf.Event.tlGetPageId() + '" ';    

      if (bRoot) {
        sendStr += '>\r\n' + this.XMLData + '</' + TeaLeaf.$C("ClientEvent") + '>\r\n';
      }
      else {
        sendStr += '/>\r\n';
      }
	    //	Queue the event
	    if( TeaLeaf.Event.Configuration.tlqueueevents ) {
			if( TeaLeaf.Event.Configuration.tlusetopqueue ) {
				if( top.TeaLeaf.Event.tlQueuedXML ) {
					top.TeaLeaf.Event.tlQueuedXML += sendStr;
				}
				else {
					top.TeaLeaf.Event.tlQueuedXML = sendStr;
				}
			}
			else {
				if( TeaLeaf.Event.tlQueuedXML ) {
					TeaLeaf.Event.tlQueuedXML += sendStr;	
				}
				else {
					TeaLeaf.Event.tlQueuedXML = sendStr;
				}
			}
			//	Check the size of the XML.  IF it is getting too
			//	big, send it
			if( TeaLeaf.Event.Configuration.tlqueueeventsmaxsz < TeaLeaf.Event.tlQueuedXML.length ) {	    	
	    		TeaLeaf.Event.tlFlushQueue();
			}
			return;
	    }
	    //	Send the request
	    try {
		    this.tlSendXML(sendStr);
		    this.XMLData = "";
	    }
    	catch(exp) {
	    }
	    this.XMLData = "";
    }

    /**
    * Encode a string to be suitable for an XML attribute.
    * @param str
    * @addon
    */            	                              
    TeaLeaf.Event.tlXMLEncode = function(str){
	    if(str == null) return str;
	    str = str.replace(/&/g, "&#38;");
	    str = str.replace(/"/g, "&#34;");
	    str = str.replace(/'/g, "&#39;");
	    str = str.replace(/:/g, "&#58;");
	    return str;
    }   

    /**
    * Decode a string encoded with tlXMLEncode.
    * @param str
    * @addon
    */            	                              
    TeaLeaf.Event.tlXMLDecode = function(str){
	    if(str == null) return str;
	    str = str.replace(/&#58;/g, ":");
	    str = str.replace(/&#39;/g, "'");
	    str = str.replace(/&#34;/g, "\"");
	    str = str.replace(/&#38;/g, "&");
	    return str;
    }

    /**
    * Enable HTTP Headers defined in the TeaLeafEventCfg.js.
    * @param obj determines what set of HTTP headers to be set. 
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlEnableAllHTTPHeaders = function(obj) {         
        if(obj){
            if(obj == "info"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, "all");            
            }
            else if(obj == "init"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, "all");
            }
            else if(obj == "beforeunload"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, "all");
            } 
        } 
        else{
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, "all");            
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, "all");        
        }        
    }
    /**
    * Enable HTTP Headers defined in the TeaLeafEventCfg.js.
    * @param obj determines what set of HTTP headers to be set. 
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlEnableHTTPHeader = function(obj, headerName) { 
        if(obj == "info"){
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, true, headerName);            
        }
        else if(obj == "init"){
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, true, headerName);
        }
        else if(obj == "beforeunload"){
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, true, headerName);
        } 
    }
    /**
    * Disable HTTP Headers defined in the TeaLeafEventCfg.js.
    * @param obj determines what set of HTTP headers to be set. 
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlDisableAllHTTPHeaders = function(obj) {         
        if(obj){
            if(obj == "info"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, false, "all");            
            }
            else if(obj == "init"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, false, "all");
            }
            else if(obj == "beforeunload"){
                TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, false, "all");
            } 
        } 
        else{
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersSet, false, "all");            
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalInit, false, "all");
            TeaLeaf.Event.tlEventJSONCfgUtil(TeaLeaf.Event.Configuration.tlHTTPRequestHeadersEvalBeforeUnload, false, "all");        
        }        
    }    
    /**
    * Enable queuing of events.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlEnableQueueEvents = function() { 
        TeaLeaf.Event.Configuration.tlqueueevents = true; 
    }  
    /**
    * Disable queuing of events.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlDisableQueueEvents = function() { 
        TeaLeaf.Event.Configuration.tlqueueevents = false; 
    }   
    /**
    * Enable showing of exception in an alert message.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                   
    TeaLeaf.Event.tlEnableShowExceptions = function() { 
        TeaLeaf.Event.Configuration.tlshowexceptions = true; 
    }
    /**
    * Disable showing of exception in an alert message.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlDisableShowExceptions = function() { 
        TeaLeaf.Event.Configuration.tlshowexceptions = false; 
    } 
    /**
    * Set queue event flush time.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlSetQueueEventTime = function(tlvalue) { 
    
        TeaLeaf.Event.Configuration.tlqueueeventstimer = tlvalue; 
    }  
    /**
    * Get queue event flush time.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlGetQueueEventTime = function() { 
        return TeaLeaf.Event.Configuration.tlqueueeventstimer; 
    }
    /**
    * Set queue event maximum size.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlSetQueueEventMaxSize = function(tlvalue) { 
        TeaLeaf.Event.Configuration.tlqueueeventsmaxsz = tlvalue; 
    }    
    /**
    * Get queue event maximum size.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlGetQueueEventMaxSize = function() { 
        return TeaLeaf.Event.Configuration.tlqueueeventsmaxsz; 
    }

    /* Returns the number of alert, prompt and confirm
     * dialogs shown to the user.
     *
     * Also see, TeaLeaf.Event.Configuration.tlCatchAlerts
     */
    TeaLeaf.Event.tlGetAlertCount = function() {
      var T,
          TE,
          alertCount;

      T = TeaLeaf;
      TE = T.Event;

      alertCount = TE.getAlertCount ? TE.getAlertCount() : 0;
      return alertCount;
    }

    /**
    * JSON configuration utility allowing to enable/disable certain DOM events
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
    TeaLeaf.Event.tlEventJSONCfgUtil = function(tlJSONConfig, tlEnable, domEventName) {         
        for(var i = 0; i<tlJSONConfig.length; i++){
            if(domEventName == "all"){
                tlJSONConfig[i].load = tlEnable;
            }
            else if (domEventName == tlJSONConfig[i].domevent){
                tlJSONConfig[i].load = tlEnable;
            }
        }  
    }  
    /**
    * Error handler.
    * @param message error 
    * @param url url
    * @param line line where error occured
    * @requires   
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
	TeaLeaf.Event.tlErrorHandler = function(message, url, line) {	
		TeaLeaf.Event.Configuration.tlexceptioncount++;
		if(TeaLeaf.Event.Configuration.tlexceptioncount > TeaLeaf.Event.Configuration.tlmaxeventexception){  
            return; 
        }
		if ((typeof message !== "string") && !url) {
			/* If "message" and "url" is not specified then
			 * the data is not all that useful.
			 */
			return false;
		}

		var	now = new Date();
		if (!line) {
			line = "-";
		}
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("INFO"), TeaLeaf.$C("EXCEPTION"));
    var tlAddNameValueArray = [TeaLeaf.$C("Message"), message, 
                               TeaLeaf.$C("URL"), escape(url),
                               TeaLeaf.$C("Line"), line];
        tlevt.tlAddData(tlAddNameValueArray);
        TeaLeaf.Event.Configuration.tlasync = true;
		tlevt.tlSend();
		TeaLeaf.Event.tlFlushQueue();
		return false;
	}	
	/**
    * Handle the before unload event and flush the queue of events.
    *
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */            	                                                                			
	TeaLeaf.Event.tlBeforeUnload = function(){
	    if(TeaLeaf.Event.Configuration.tleventbeforeunloadflag == true){ 
            TeaLeaf.Event.Configuration.tleventunloadflag = false;   
		    //	Send in the notice
        var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("BeforeUnload"));
		    TeaLeaf.Event.SetType = tlevt.EventType;

		    if(TeaLeaf.Event.SetSubType == ""){
                TeaLeaf.Event.SetSubType = tlevt.EventSubType;
            }
            else{
                TeaLeaf.Event.SetSubType += "; " + tlevt.EventSubType;
            }                    
            TeaLeaf.Event.Configuration.tlbeforeunloadflag = true;
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
 	        TeaLeaf.Event.Configuration.tlasync = false;
 		    tlevt.tlSend();  
		    TeaLeaf.Event.tlFlushQueue(true);
		}	
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false);
	}
	/**
    * Handle the unload event and flush the queue of events.
    *
    * @requires 
    * TeaLeafEventCfg.js
    * @addon
    */            	                                                                				
	TeaLeaf.Event.tlUnload = function(){
        if(TeaLeaf.Event.Configuration.tleventunloadflag ){         
            TeaLeaf.Event.Configuration.tllastdwelltime = new Date();
            TeaLeaf.Event.Configuration.tleventbeforeunloadflag = false;

		    //	Send in the notice
        var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("Unload"));
		    TeaLeaf.Event.SetType = tlevt.EventType;
		    
		    if(TeaLeaf.Event.SetSubType == ""){
                TeaLeaf.Event.SetSubType = tlevt.EventSubType;
            }
            else{
                TeaLeaf.Event.SetSubType += "; " + tlevt.EventSubType;
            }
            TeaLeaf.Event.Configuration.tlignoresendfailure = true;
            TeaLeaf.Event.Configuration.tlasync = false;
		    tlevt.tlSend();
		    TeaLeaf.Event.tlFlushQueue(true);
        }  
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false);
	}
	
    /**
    * Event setup.
    * @requires
    * TeaLeafEventCfg.js 
    * @addon
    */            	                                       
  TeaLeaf.Event.EventSetup = function() {
    var T,
        TE,
        TECfg;

    T = TeaLeaf;
    TE = T.Event;
    TECfg = TE.Configuration;
        
    if (TECfg.tlCatchAlerts) {
      (function() {
        var alertCount,
            originalAlert,
            originalConfirm,
            originalPrompt;

        // This will hold the count for alert(), confirm() and prompt() calls
        alertCount = 0;

        if (window.alert && window.alert.apply) {
          originalAlert = window.alert;
          window.alert = function() {
            var retVal;

            retVal = originalAlert.apply(window, arguments);
            alertCount++;
            // TODO: POST the alert message as an INFO event
            return retVal;
          };
        }

        if (window.confirm && window.confirm.apply) {
          originalConfirm = window.confirm;
          window.confirm = function() {
            var retVal;

            retVal = originalConfirm.apply(window, arguments);
            alertCount++;
            // TODO: POST the confirm message and user response as an INFO event
            return retVal;
          }
        }

        if (window.prompt && window.prompt.apply) {
          originalPrompt = window.prompt;
          window.prompt = function() {
            var retVal;

            retVal = originalPrompt.apply(window, arguments);
            alertCount++;
            // TODO: POST the prompt message, optional value and user response as an INFO event
            return retVal;  
          }
        }

        TE.getAlertCount = function() {
          return alertCount;
        }
      })();
    }

        //Handle Errors
        if(TeaLeaf.Event.Configuration.tlcatcherrors){
            // If there is no error handler registered only then we attach ours.
            if (typeof window.onerror !== "function") {
              /* Use direct assignment instead of the normal event handler API.
               * If you use the latter to attach to onerror, Firefox will pass an
               * event object in the callback instead of the message, url, and line number.
               */
              window.onerror = TeaLeaf.Event.tlErrorHandler;
            }
        }
        if(!TeaLeaf.Client){
            TeaLeaf.Event.tlAddHandler(window, "beforeunload", eval(TeaLeaf.Event.tlBeforeUnload), false);
            TeaLeaf.Event.tlAddHandler(window, "unload", eval(TeaLeaf.Event.tlUnload), false);
        }
		//	If we are queueing events, set up the timer
		if( TeaLeaf.Event.Configuration.tlqueueevents ) {
			TeaLeaf.Event.tlTimerRoutine = function() {
				//	Amount of time until the next timeout
				var	timeAmount = TeaLeaf.Event.Configuration.tlqueueeventstimer;
				try {
					timeAmount = TeaLeaf.Event.tlFlushQueue();
				}
				catch(exc) {
					if( TeaLeaf.Event.Configuration.tlshowexceptions ) {
						alert(exc.name + ": " + exc.message + "\r\n\r\nPos 7");
					}
				}
				//NOTE:  Use setTimeout instead of setInterval since
				//	setInterval is only JS 1.2 and later
				setTimeout('TeaLeaf.Event.tlTimerRoutine()', timeAmount);
			}
			setTimeout('TeaLeaf.Event.tlTimerRoutine()', TeaLeaf.Event.Configuration.tlqueueeventstimer);
		}
		
		var tlnow = new Date();
        var t1970 = Date.UTC(tlnow.getUTCFullYear(),tlnow.getUTCMonth(),
        tlnow.getUTCDate(), tlnow.getUTCHours(),tlnow.getUTCMinutes(),tlnow.getUTCSeconds(), tlnow.getUTCMilliseconds());
        TeaLeaf.Event.Configuration.t1970 = t1970;

        

    	TeaLeaf.Event.Loaded = true;
	}

  /*  tlAddCustomEvent
   *  Helper function to create and add a custom XML event to the
   *  Tealeaf stream.
   *
   *  eventName - string value that is used for the UI event "SubType" property
   *  nameValueObj - Object containing name-value pairs
   *                 e.g.  {
   *                         elementName: "zipcode",
   *                         errorType: "validation",
   *                         errorMessage: "Please enter a valid zipcode."
   *                       }
   */
  TeaLeaf.Event.tlAddCustomEvent = function(eventName, nameValueObj) {
    var i,
        memberName,
        memberValue,
        nameValueArray,
        te;

    // Input validation
    if (!eventName || typeof eventName !== "string") {
      eventName = "custom";
    }
    if (!nameValueObj || typeof nameValueObj !== "object") {
      return;
    }

    te = new TeaLeaf.Event(TeaLeaf.$C("CUSTOM"), eventName);
    // Create the name-value pair array
    i = 0;
    nameValueArray = [];
    for (memberName in nameValueObj) {
      if (memberName && nameValueObj.hasOwnProperty(memberName)) {
        // Ensure the name-value pairs are XML safe.
        nameValueArray[i++] = TeaLeaf.Event.tlXMLEncode(memberName);
        nameValueArray[i++] = nameValueObj[memberName].toString();
      }
    }
    te.tlAddData(nameValueArray);
    te.tlSend();
  }

	if(TeaLeaf.Event.Configuration.tlinit == false){
	    TeaLeaf.Event.Configuration.tlinit = true;
        TeaLeaf.Event.prototype.XMLData = "";  
        TeaLeaf.addOnLoad(TeaLeaf.Event.EventSetup); 
    }
}
/*
* Copyright 1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* This is the configuration file for capturing Client Events that 
* happen on the rendered DOM. It proviedes the capabilty to block fields
* and turn off an on events on the Window and Document object. 
*
* @version 2010.12.22.1
*
*/
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Client)
{
    TeaLeaf.Client = {};

    if(typeof TeaLeaf.Client.Configuration == "undefined"){
	    TeaLeaf.Client.Configuration = {
	        "tlinit" : false,
		    "tlpassword"         : 1,		// 1 no capture, 2 don't send value
		    "tlsendfocus"        : false,
		    "tlsendblur"         : true,
		    "tlunloadflag"       : true,
		    "tlactiontype"       : "No Submit",
		    "tlbeforeunloadflag" : true,
		    "tlcontrolsattached" : false,
		    "tlassignTLID"       : false,   
		    "tlscanupdate"       : 0,
		    "tlIEhref"           : false,
		    "tlEnableAttr"       : false,
		    "tlDiscardInvalidXPath"  : false,
		    "tlUniqueIDCheckEnabled" : false,

		    //	tlScheduledScan controls whether or not to periodically scan the DOM
		    //	for changes (and tag the appropriate nodes) at the interval defined by
		    //	tlscanupdate
		    tlScheduledScan : false,

		    //  tlExcludeTags controls whether to explicitly exclude or include the
		    //  tags listed in tlNodeTags when attaching to descendent elements using
		    //  TeaLeaf.Client.tlProcessNode(). See TeaLeaf.Client.tlTagNameAllowed()
		    tlExcludeTags : true,

		    //	If events are being cancelled, the document object will not catch events
		    //	since they are not being bubbled up. In order to combat this, we can attach
		    //	to every relevant item (see tlExcludeTags and tlNodeTags), except this may
		    //	result in duplicate events being captured.
		    tlUniversalAttach : false,

		    //  Option to store the xml of queued events on a page unload in a cookie, so
		    //  that it may be sent up with the next page's events. Since this may interfere
		    //  with the existing cookies on the site, this is disabled by default.
		    tlStoreQueueInCookie : false,

        //	This is where input fields can be globally blocked.  A few examples are shown
        //	below. Add or remove fields as appropriate. The parameters are
        //    name and/or id: JavaScript regular expression to match against the name and/or id of the field
        //    caseinsensitive (optional): the above regex match will be case insensitive.
        //    exclude (optional): If true, no value is sent (equivalent to setting the EmptyMask)
        //    mask: Callback function used to mask the element value. This can be a 3rd party custom function.
        //          The following masking functions are provided by default:
        //            PreserveMask(): Preserves the character type and value length according to the tlPrivacyMask setting below.
        //            BasicMask(): Returns a fixed string "XXXXXX" regardless of the element value.
        //            EmptyMask(): Returns the empty string "" regardless of the element value.
        //
        //  Note: The block rules are applied in the order they appear in the tlFieldBlock array.
        tlFieldBlock:[
        /* Sample block rules:
          // Mask all field names that have "creditcard" or "password" substrings using the PreserveMask() function.
          {"name": "creditcard|password", "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.PreserveMask.apply(this, arguments); }}
          // Mask all field ids that match pvt0, pvt1 ... pvt9 using the EmptyMask() function.
          {"id": "^pvt[0-9]$",           "caseinsensitive": true,  "exclude": false, "mask": function () { return TeaLeaf.Client.EmptyMask.apply(this, arguments); }}
          // Paranoid mode: Mask all name and id values with the BasicMask() function.
          {"id": ".*", "name": ".*",     "caseinsensitive": false, "exclude": true,  "mask": function () { return TeaLeaf.Client.BasicMask.apply(this, arguments); }}
        */
        ],

	      // The mask used by the PreserveMask() masking function.
		    tlPrivacyMask: {
		      "upperChar":   "X",
		      "lowerChar":   "x",
		      "numericChar": "9",
		      "symbolChar":  "#"
		    },
		
		    //	This is the list of events we catch off of the window object
		    tlWindowHandlers:[
			    {"domevent": "resize",          "load": false,  "tlhandler": "TeaLeaf.Client.tlQueueResize"},
			    {"domevent": "focus",           "load": true,  "tlhandler": "TeaLeaf.Client.tlSetFocusTime"},
			    {"domevent": "help",            "load": true,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "scroll",          "load": false,  "tlhandler": "TeaLeaf.Client.tlQueueScroll"},
			    {"domevent": "beforeprint",     "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "afterprint",      "load": false,  "tlhandler": "TeaLeaf.Client.tlAddEvent"}
		    ],

		    //	This is the list of events we catch off of the document object
		    tlDocumentHandlers:[
			    {"domevent": "click",        "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "dblclick",     "load": true,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "keyup",        "load": true,     "tlhandler": "TeaLeaf.Client.tlQueueKey"},
			    {"domevent": "mousedown",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseup",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseover",    "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domevent": "mouseout",      "load": false,     "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    //	This event is only caught once and turned off.  This is used to 
			    //	detect robots, since a robot will never have mouse movement.
			    {"domevent": "mousemove",    "load": false,     "tlhandler": "TeaLeaf.Client.tlUserMovement"}
		    ],
		    
		    tlSingleAttach:[
			    {"domelementID": "",    "domevent": "mousedown",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseup",      "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseover",    "tlhandler": "TeaLeaf.Client.tlAddEvent"},
			    {"domelementID": "",    "domevent": "mouseout",     "tlhandler": "TeaLeaf.Client.tlAddEvent"}
		    ],

            tlAttributeCapture:[
                {"tltagname":"a", "tlattributename":"href", "tlevent":"click"},
                {"tltagname":"button", "tlattributename":"value", "tlevent":"click"}
            ],
            

            tlIDBlackList:[
                /* Insert blacklist strings (JavaScript regular expressions) as a comma
                 * separated list here. Leave this empty for default behavior.
                 *
                 * WARNING: Use the blacklist with caution as any id that is matched by
                 * the blacklist will be ignored!
                 * Example:
                "random",
                "jQuery",
                "^gwt",
                "^GWT"
                */
            ],

            tlIDWhiteList:[
                /* Insert whitelist strings (JavaScript regular expressions) as a comma
                 * separated list here. Leave this empty for default behavior.
                 *
                 * WARNING: Use the whitelist with caution as any id that is NOT matched by
                 * the whitelist will be ignored!
                 * Example:
                "static$",
                "^unique"
                */
            ],

		    /*  tlNodeTags by default includes a list of tag names that are "unimportant"
		     *  or not rendered. The associated true/false value is used in conjunction with
		     *  tlExcludeTags - e.g. if tlExcludeTags is true and a node tag is true, it will
		     *  be excluded; if tlExcludeTags is true and a node tag is false, the tag will be
		     *  included. Similarly if tlExcludeTags is false (meaning to explicitly include the
		     *  listed node tags, those with "true" with be excluded.
		     */
		    tlNodeTags : {
		        "APPLET"    : true,
		        "ATTRIBUTE" : true,
			"B"	    : true,
		        "BASE"      : true,
			"BODY"	    : true,
		        "BR"        : true,
		        "CENTER"    : true,
		        "COL"       : true,
		        "COLGROUP"  : true,
		        "COMMENT"   : true,
			"DIV"	    : true,
		        "DEFAULT"   : true,
		        "DEL"       : true,
		        "EVENT"     : true,
		        "FONT"      : true,
			"FORM"	    : true,
			"HEAD"	    : true,
		        "HISTORY"   : true,
		        "HR"        : true,
		        "HTML"      : true,
		        "I"         : true,
		        "INS"       : true,
		        "LINK"      : true,
		        "MAP"       : true,
		        "META"      : true,
		        "NAMESPACE" : true,
		        "NAVIGGATOR" : true,
		        "NOBR"      : true,
		        "OPTION"    : true,
		        "P"         : true,
		        "PARAM"     : true,
		        "S"         : true,
		        "SCRIPT"    : true,
		        "SMALL"     : true,
		        "STRIKE"    : true,
		        "STRONG"    : true,
		        "STYLE"     : true,
		        "SUB"       : true,
		        "SUP"       : true,
		        "TH"        : true,
		        "TITLE"     : true,
		        "THEAD"     : true,
		        "TFOOT"     : true,
		        "TR"        : true,
		        "U"         : true
		    },

		    /*  tlSpecialChildNodeTags represents tags with a special
		     *  situation where the event that fires is attached to a
		     *  non-visual item that is inside the actual UI element.
                 *  Example would be a menu with a <nobr> tag inside to
                 *  keep the visual text of the menu on one line. The <nobr>
                 *  fires the event when we really want the parent menu.
		     */

		    tlSpecialChildNodeTags : {
		        "NOBR" : true,
		        "P"    : true
		    }
	    };
	    	
	    TeaLeaf.Client.Configuration.tlIdCounter = [];
    }
}
/*
* Copyright 1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* This is the main UI Client Event Capture JavaScript file that is  
* used by other JavaScript to register their onload routines.
*
* @requires 
* TeaLeaf.js
* TeaLeafEvent.js
* TeaLeafClientCfg.js
*
* @version 2010.12.22.1
*
*/
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Client &&
    TeaLeaf.Client.Configuration)
{
	
	TeaLeaf.Client.tlTimeoutID = -1;
	/**
    * Enable all event handlers specified in the configuration.
    * @param obj parameter that determines to enable handlers to the window or document object or both.
    * @requires
    * TeaLeafClientCfg.js 
    * @addon
    */            	                                           
    TeaLeaf.Client.tlEnableAllEventHandlers = function(obj) {         
        if(obj){
            if(obj == window){
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, "all");
            }
            else if(obj == document){
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, "all");
            }
        } 
        else{
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, "all");
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, "all");        
        }        
    }
	/**
    * Enable a specific event handler defined in the configuration.
    * @param obj parameter that determines to enable handlers to the window or document object.
    * @param domEventName name of the event to enable.
    * @requires
    * TeaLeafClientCfg.js 
    * @addon
    */            	                                               
    TeaLeaf.Client.tlEnableEventHandler = function(obj, domEventName) { 
        if(obj == window){  
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, true, domEventName); 
        }
        else{
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, true, domEventName); 
        }        
    }
	/**
    * Disable all event handlers specified in the configuration.
    * @param obj parameter that determines to disable handlers to the window or document object or both.
    * @requires
    * TeaLeafClientCfg.js 
    * @addon
    */            	                                           
    TeaLeaf.Client.tlDisableAllEventHandlers = function(obj) { 
        if(obj){
            if(obj == window){
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, "all");
            }
            else if(obj == document){
                TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, "all");
            }
        } 
        else{
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, "all");
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, "all");        
        }        
    }
	/**
    * Disable a specific event handler defined in the configuration.
    * @param obj parameter that determines to disable handlers to the window or document object.
    * @param domEventName name of the event to enable.
    * @requires
    * TeaLeafClientCfg.js 
    * @addon
    */            	                                                   
    TeaLeaf.Client.tlDisableEventHandlers = function(obj, domEventName) { 
        if(obj == window){                
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlWindowHandlers, false, domEventName); 
        }
        else{
            TeaLeaf.Client.tlClientJSONCfgUtil(TeaLeaf.Client.Configuration.tlDocumentHandlers, false, domEventName); 
        }        
    }    
	/**
    * Utility that helps enabling or disabling of event handlers.
    * @param tlJSONConfig configuration array.
    * @param tlEnable enable (true or false flag).
    * @param domEventName event name to enable or disable.
    * @addon
    */            	                                                       
    TeaLeaf.Client.tlClientJSONCfgUtil = function(tlJSONConfig, tlEnable, domEventName) {         
        for(var i = 0; i<tlJSONConfig.length; i++){
            if(domEventName == "all"){
                tlJSONConfig[i].load = tlEnable;
            }
            else if (domEventName == tlJSONConfig[i].domevent){
                tlJSONConfig[i].load = tlEnable;
            }
        }  
    }  
	TeaLeaf.Client.tlHasUserMovement = false;
	/**
    * Detect user movement.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                           
	TeaLeaf.Client.tlUserMovement = function() {
		TeaLeaf.Client.tlHasUserMovement = true;
		TeaLeaf.Event.tlRemoveHandler(document, "mousemove", TeaLeaf.Client.tlUserMovement, false);
	}
	/**
    * Add a unique Id to a DOM element.
    * @param itemSource DOM element that needs an id.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                
    TeaLeaf.Client.tlAddIdToControl = function(itemSource) {  	    
	    if ((itemSource.id && itemSource.id != "") || (itemSource.name && itemSource.name != "")) {
		    return;
	    }
	    var idTag = itemSource.tagName;

	    var thereYet = TeaLeaf.Client.Configuration.tlIdCounter[idTag];
	    if (thereYet == undefined)
		    TeaLeaf.Client.Configuration.tlIdCounter[idTag] = 0;

        var idElement = "_TL_" + idTag + "_"
            + TeaLeaf.Client.Configuration.tlIdCounter[idTag];
        var item  = document.getElementById(idElement);
        var baseId = idElement;
        
        if(item){
            //loop through to check if there are items with such ids
            while(document.getElementById("_TL_" + idTag + "_"
                + TeaLeaf.Client.Configuration.tlIdCounter[idTag]++));
        }
        
        itemSource.id = baseId;
        TeaLeaf.Client.Configuration.tlIdCounter[idTag]++;
	}  

	/**
    * Loops through a JSON array to find the elemement if exists.
    * @param name or id of element.
    * @param JSON.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                
	TeaLeaf.Client.tlFindinJSON = function(tlElement, tlJSON) {        
        var tlNameorId = TeaLeaf.Client.tlGetName(tlElement);
        if(tlNameorId){
            for(var i=0; i<tlJSON.length; i++){ 
                if(tlNameorId == tlJSON[i].tlfieldname){  
                    return tlJSON[i];
                }
            }
        }
    }

  TeaLeaf.Client.EmptyMask = function(elem) {
    return "";
  }

  TeaLeaf.Client.BasicMask = function(elem) {
    if (!elem || !elem.value) {
      return null;
    }

    return "XXXXXX";
  }

  TeaLeaf.Client.PreserveMask = function(elem) {
    var PM,
        maskedValue;

    if (!elem || !elem.value) {
      return null;
    }

    PM = TeaLeaf.Client.Configuration.tlPrivacyMask;
    maskedValue = elem.value;
    maskedValue = maskedValue.replace(/[A-Z]/g, PM.upperChar);
    maskedValue = maskedValue.replace(/[a-z]/g, PM.lowerChar);
    maskedValue = maskedValue.replace(/[0-9]/g, PM.numericChar);
    maskedValue = maskedValue.replace(/[^A-Za-z0-9]/g, PM.symbolChar);

    return maskedValue;
  }

  TeaLeaf.Client.getFieldBlockMatch = function(elem) {
    var i,
        FB;

    FB = TeaLeaf.Client.Configuration.tlFieldBlock;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return null;
    }

    for (i=0; i < FB.length; i++) {
      if (FB[i].id) {
        if (!FB[i].idRE) {
          FB[i].idRE = new RegExp(FB[i].id, (FB[i].caseinsensitive ? "i" : ""));
        }
        if (FB[i].idRE.test(elem.id)) {
          return FB[i];
        }
      }
      if (FB[i].name) {
        if (!FB[i].nameRE) {
          FB[i].nameRE = new RegExp(FB[i].name, (FB[i].caseinsensitive ? "i" : ""));
        }
        if (FB[i].nameRE.test(elem.name)) {
          return FB[i];
        }
      }
    }
    return null;
  }

  /**
   * Check if element is silent.
   * @param element or id of element.
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlIsReplace = function(elem) {
    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return false;
    }

    if (TeaLeaf.Client.getFieldBlockMatch(elem)) {
      return true;
    }

    if (elem.type === "password") {
      return TeaLeaf.Client.Configuration.tlpassword === 2;
    }

    return false;
  }

  /**
   * Replace element with dummy value, needed in some cases
   * when there is client validation.
   * @param element or id of element
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlReplaceValue = function(elem) {
    var blockObj;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return null;
    }

    blockObj = TeaLeaf.Client.getFieldBlockMatch(elem);
    if (blockObj) {
      return blockObj.mask(elem);
    }
    return elem.value;
  }

  /**
   * Check if element is excluded from capture.
   * @param element or id of element.
   * @requires
   * TeaLeafClientCfg.js
   * @addon
   */
  TeaLeaf.Client.tlIsExcluded = function(elem) {
    var blockObj;

    // If elem is not an object
    if (typeof elem === "string") {
      elem = document.getElementById(elem);
    }
    if (!elem) {
      return false;
    }

    blockObj = TeaLeaf.Client.getFieldBlockMatch(elem);
    if (blockObj) {
      return blockObj.exclude;
    }

    if (elem.type === "password") {
      return TeaLeaf.Client.Configuration.tlpassword === 2;
    }

    return false;
  }

	/**
    * Get the name from a DOM node.
    * @param theNode DOM element.
    * @addon
    */            	                                                                
	TeaLeaf.Client.tlGetName = function(theNode) {
		if( theNode == null ) {
			return null;
		}
		var		id = theNode.id;
		if( id && id != "" ) {
			return id;
		}
		var		name = theNode.name;
		if( name && name != "" ) {
			return name;
		}
		return null;
	}
  /**
   * Get event source DOM element.
   * @param theEvent DOM event.
   * @addon
   */
  TeaLeaf.Client.tlGetEventSource = function(theEvent) {
    var	itemSource;

    itemSource = null;
    if (!theEvent) {
      return null;
    }

    if (theEvent.srcElement) {
      // IE
      itemSource = theEvent.srcElement;
    }
    else {
      // W3C
      itemSource = theEvent.target;
      if (!itemSource) {
        // XXX: Mozilla only (non-standard)
        itemSource = theEvent.explicitOriginalTarget;
      }
      if (!itemSource) {
        // XXX: Mozilla only (non-standard)
        itemSource = theEvent.originalTarget;
      }
    }

    if (itemSource && !itemSource.name) {
      // If an Anchor or link, I can look info up in the list
      if (itemSource.parentNode && itemSource.parentNode.tagName) {
        if (itemSource.parentNode.tagName == "A" ||
            itemSource.parentNode.tagName == "LINK" )
        {
          itemSource = itemSource.parentNode;
        }
      }
    }
    if (!itemSource || !itemSource.tagName) {
      itemSource = window.document.body;
    }
    return itemSource;
  }
	/**
    * If we don't have an name, get the index from either the anchors
    * or the links collection.
    * @param theNode DOM element.
    * @param full XML format.
    * @addon
    */            	                                                                
	TeaLeaf.Client.tlGetAnchor = function(theNode, full) {
		if( theNode == null ) {
			return null;
		}
		if( theNode.name && theNode.name != "" ) {
			return null;
		}
		var		idx;
		for(idx = 0; idx < document.anchors.length; idx++) {
			if( document.anchors[idx] == theNode ) {
				if( full ) {
					return "<AnchorElement>" + idx + "</AnchorElement>\r\n";
				}
				else {
					return "Anchor-" + idx;
				}
			}
		}
		for(idx = 0; idx < document.links.length; idx++) {
			if( document.links[idx] == theNode ) {
				if( full ) {
					return "<LinkElement>" + idx + "</LinkElement>\r\n";
				}
				else {
					return "Link-" + idx;
				}
			}
		}	
		return null;
	}

	/**
	 * Check if element is of type input
	 */
	TeaLeaf.Client.checkIsInput = function(elem) {
	    if(typeof(elem) == "string") elem = document.getElementById(elem);
	
            switch(elem.tagName) 
	    {
		case "INPUT":
		case "SELECT":
		case "TEXTAREA":
		    return true;
	    }

	    return false;
	}


	/**
    * If we don't have an name, get the index from either the anchors
    * or the links collection.
    * @param str XML string.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                	
	TeaLeaf.Event.tlFormatXMLName = function(str) {
		//	Nothing handed in
		if( ! str || str.length <= 0 )
			return null;

		var	rtn = "";
		if( ! TeaLeaf.Event.tlNameStartChar(str.charCodeAt(0)) ) {
			rtn = "_";
		}
		var	max = str.length;
		var	ind;
		for(ind = 0; ind < max; ind++) {
			if( TeaLeaf.Event.tlNameChar(str.charCodeAt(ind)) ) {
				rtn = rtn + str.charAt(ind);
			}
			else {
				rtn = rtn + "_";
			}
		}
		return rtn;
	}
	/**
	* Utility function to help format the XML.
    * @param chr character.
    * @addon
    */            	                                                                	
    TeaLeaf.Event.tlNameStartChar = function(chr) {
		//	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] |
		//	[#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] |
		//	[#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
		//	[#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD]
		//	Note:  ":" was removed because it is only valid when a namespace
		//	is defined
		return (chr >= 0x41 && chr <= 0x5A) || chr == 0x5F ||
			(chr >= 0x61   && chr <= 0x7A)   || (chr >= 0xC0   && chr <= 0xD6)   ||
			(chr >= 0xD8   && chr <= 0xF6)   || (chr >= 0xF8   && chr <= 0x2FF)  ||
			(chr >= 0x370  && chr <= 0x37D)  || (chr >= 0x37F  && chr <= 0x1FFF) ||
			(chr >= 0x200C && chr <= 0x200D) || (chr >= 0x2070 && chr <= 0x218F) ||
			(chr >= 0x2C00 && chr <= 0x2FEF) || (chr >= 0x3001 && chr <= 0xD7FF) ||
			(chr >= 0xF900 && chr <= 0xFDCF) || (chr >= 0xFDF0 && chr <= 0xFFFD);
	}
	/**
	* Utility function to help format the XML.
    * @param chr character.
    * @addon
    */            	                                                                	
    TeaLeaf.Event.tlNameChar = function(chr) {
		//	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
		return TeaLeaf.Event.tlNameStartChar(chr) || chr == 0x2D || chr == 0x2E ||
			(chr >= 0x30 && chr <= 0x39) || chr == 0xB7  ||
			(chr >= 0x0300 && chr <= 0x036F) || (chr >= 0x203F && chr <= 0x2040);
	}

  TeaLeaf.Client.tlQueuedKeys = "";

  /*
   * Returns the normalized (to IE) key code
   * @param theEvent DOM key event.
   */
  TeaLeaf.Client.getNormalizedKeyCode = function(theEvent) {
    var keyCodeStr;

    if (!theEvent || !theEvent.keyCode ||
        // Discard all control characters except backspace and Caps lock.
        (theEvent.keyCode < 0x20 && theEvent.keyCode !== 0x8 && theEvent.keyCode !== 0x14))
    {
      return null;
    }
    keyCodeStr = "";
    // build the normalized string
    if (theEvent.ctrlKey) {
      keyCodeStr += "c-";
    }
    if (theEvent.altKey) {
      keyCodeStr += "a-";
    }
    if (theEvent.shiftKey) {
      keyCodeStr += "s-";
    }

    if (!TeaLeaf.tlBrowserIsIE()) {
      // Standardize to IE values
      switch (theEvent.keyCode) {
        case 59:     // ;: - FF, Opera
          keyCodeStr += 186;
          break;

        default:
          keyCodeStr += theEvent.keyCode;
          break;
      }
    }
    else {
      // IE key codes are simply passed through.
      keyCodeStr += theEvent.keyCode;
    }

    return keyCodeStr;
  }

  /*
   * Queues the keys
   * @param theEvent DOM event.
   * @requires
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.tlQueueKey = function(theEvent) {
    var itemName,
        itemSource,
        keyCode,
        T,
        TC,
        TCCfg;
    
    T = TeaLeaf;
    TC = T.Client;
    TCCfg = TC.Configuration;
    // Flush the resize and scroll events (if any)
    TC.tlSendResize();
    TC.tlSendScroll();

    if (!theEvent) {
      theEvent = window.event;
    }

    // Residual keys to send in? Save the source for next time around
    itemSource = TC.tlGetEventSource(theEvent);
    if (!itemSource) {
      return;
    }


    // We only need to set the onFocus time for the first key invocation.
    if (!itemSource.TeaLeafFocusTime) {
      itemSource.TeaLeafFocusTime = new Date();
    }
    if (TC.tlQueuedKeySource) {
      if (TC.tlQueuedKeySource != itemSource) {
        // This key belongs to a different element. Flush any queued keystrokes.
        if (TC.tlQueuedKeys && TC.tlQueuedKeys.length > 0) {
          TC.tlSendKeys();
        }
        TC.tlQueuedKeySource = itemSource;
      }
    }
    else {
      TC.tlQueuedKeySource = itemSource;
    }
    // Get the name/anchor where the key happened. If both are null, don't worry about logging.
    itemName = TC.tlGetName(itemSource);
    if (!itemName) {
      // No name, try the XPath.
      itemName = TC.tlGetXPathFromNode(itemSource);
      if (!itemName) {
        if (!TC.tlGetAnchor(itemSource, false)) {
          TC.tlQueuedKeySource = null;
        }
        return;
      }
      else {
        TC.tlQueuedKeySource = itemSource;
      }
    }
    else {
      if (TC.tlIsReplace(itemSource)) {
        TC.tlQueuedKeysCount++;
        return;
      }
      if (TC.tlIsExcluded(itemSource)) {
        TC.tlQueuedKeys = null;
        TC.tlQueuedKeysCount++;
        return;
      }
    }

    keyCode = TC.getNormalizedKeyCode(theEvent);
    if (keyCode) {
      // Put in the seperator if we need it
      if (TC.tlQueuedKeys && TC.tlQueuedKeys.length > 0) {
        TC.tlQueuedKeys += ";";
      }
      TC.tlQueuedKeys += keyCode;
    }
  }
	/**
    * Send the keys.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                	
	TeaLeaf.Client.tlSendKeys = function() {
	  var TC = TeaLeaf.Client,
	      tlNodeID,
	      qSourceXPath;

    if (!TC.tlQueuedKeySource || (!TC.tlQueuedKeys && !TC.tlQueuedKeysCount)) {
      return;
    }

    // Save the values to temp variables and empty the queue variables
    var	qSource = TC.tlQueuedKeySource;
    var	qKeys   = TC.tlQueuedKeys;
    var	qCount  = TC.tlQueuedKeysCount;
    TC.tlQueuedKeySource = null;
    TC.tlQueuedKeys      = "";
    TC.tlQueuedKeysCount = 0;

    qSourceXPath = TC.tlGetXPathFromNode(qSource);
    if (!qSourceXPath && TC.Configuration.tlDiscardInvalidXPath) {
      return;
    }

    var tlreplace = false; 
		if( TeaLeaf.Client.tlIsReplace(qSource) ) {		
			tlreplace = true;
			return;
		}
		var	excluded = false;
 		if( TeaLeaf.Client.tlIsExcluded(qSource) ) {
			excluded = true;
			qKeys = null;
		}
		//	Get the name/anchor where the key happened.  If both are null,
		//	don't worry about logging
		var	name  = TeaLeaf.Client.tlGetName(qSource);
		var	lev = null;

    tlNodeID = qSource.id;

    if (!TeaLeaf.Client.CheckIfIdValid(qSource)) {
      tlNodeID = "";
    }

    // The Reporting Event
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("KeyUp"));
    var tlAddNameValueArray = [TeaLeaf.$C("Name"), qSource.name,
                               TeaLeaf.$C("Id"), tlNodeID,
                               TeaLeaf.$C("Lev"), lev,
                               TeaLeaf.$C("ElementType"), qSource.type,
                               TeaLeaf.$C("TagName"), qSource.tagName,
                               TeaLeaf.$C("XPath"), qSourceXPath,
                               TeaLeaf.$C("KeyCount"), qCount];
    tlevt.tlAddData(tlAddNameValueArray);

    if (excluded) {
      tlevt.tlAddData([TeaLeaf.$C("Excluded"), TeaLeaf.$C("True")]);
    }
    else if (tlreplace) {
      var tlRepValue = TeaLeaf.Client.tlGetReplaceValue(qSource);
      var tlAddNameValueArrayReplaceName = [TeaLeaf.$C("ValueIn"), name,
                                            name, tlRepValue,
                                            TeaLeaf.$C("KeyCode"), qKeys];
      tlevt.tlAddData(tlAddNameValueArrayReplaceName);
    }
    else {
      var	tlManualName = TeaLeaf.Event.tlFormatXMLName(name);
     			
    if (!tlManualName) {
      tlManualName = qSourceXPath;
      tlManualName = TeaLeaf.Event.tlFormatXMLName(tlManualName);
    }
      var tlAddNameValueArrayManualName = [TeaLeaf.$C("ValueIn"), tlManualName,
                                           tlManualName, qSource.value,
                                           TeaLeaf.$C("KeyCode"), qKeys];
      tlevt.tlAddData(tlAddNameValueArrayManualName);
    }
    // Now send the data in
    tlevt.tlSend();
  }

  /* Send resize event.
   * @requires 
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */            	                                                                	
  TeaLeaf.Client.tlSendResize = function() {
    if (!TeaLeaf.Client.ResizeClientX && !TeaLeaf.Client.ResizeClientY) {
      return;
    }
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("Resize"));
    var tlAddNameValueArray = [TeaLeaf.$C("ClientX"), TeaLeaf.Client.ResizeClientX,
                               TeaLeaf.$C("ClientY"), TeaLeaf.Client.ResizeClientY,
                               TeaLeaf.$C("ScreenX"), TeaLeaf.Client.ResizeScreenX,
                               TeaLeaf.$C("ScreenY"), TeaLeaf.Client.ResizeScreenY];
    tlevt.tlAddData(tlAddNameValueArray);
    TeaLeaf.Client.ResizeClientX = null;
    TeaLeaf.Client.ResizeClientY = null;
    TeaLeaf.Client.ResizeScreenX = null;
    TeaLeaf.Client.ResizeScreenY = null;
    // Now send the data in
    tlevt.tlSend();
  }

	/**
    * Queue scroll event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	
    TeaLeaf.Client.tlQueueScroll = function(tlEvent) {

	    TeaLeaf.Client.tlSendKeys();
	    TeaLeaf.Client.tlSendResize();

	    if( ! tlEvent ) {
		    tlEvent = window.event;
	    }
	    
	    if( tlEvent.clientX ) {
		    //	IE
		    TeaLeaf.Client.ScrollClientX = tlEvent.clientX;
		    TeaLeaf.Client.ScrollClientY = tlEvent.clientY;
		    TeaLeaf.Client.ScrollScreenX = tlEvent.screenX;
		    TeaLeaf.Client.ScrollScreenY = tlEvent.screenY;
	    }
	    else {
		    //	Other
		    TeaLeaf.Client.ScrollHeight = tlEvent.target.scrollHeight;
		    TeaLeaf.Client.ScrollWidth  = tlEvent.target.scrollWidth;
		    TeaLeaf.Client.ScrollTop    = tlEvent.target.scrollTop;
		    TeaLeaf.Client.ScrollLeft   = tlEvent.target.scrollLeft;
	    }
    }

  /* Send scroll event.
   * @requires 
   * TeaLeafClientCfg.js
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Client.tlSendScroll = function() {
    if (!TeaLeaf.Client.ScrollClientX && !TeaLeaf.Client.ScrollHeight) {
      return;
    }
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("Scroll"));
    var tlAddNameValueArray = [TeaLeaf.$C("ClientX"), TeaLeaf.Client.ScrollClientX,
                               TeaLeaf.$C("ClientY"), TeaLeaf.Client.ScrollClientY,
                               TeaLeaf.$C("ScreenX"), TeaLeaf.Client.ScrollScreenX,
                               TeaLeaf.$C("ScreenY"), TeaLeaf.Client.ScrollScreenY,
                               TeaLeaf.$C("ScrollHeight"), TeaLeaf.Client.ScrollHeight,
                               TeaLeaf.$C("ScrollWidth"), TeaLeaf.Client.ScrollWidth,
                               TeaLeaf.$C("ScrollTop"), TeaLeaf.Client.ScrollTop,
                               TeaLeaf.$C("ScrollLeft"), TeaLeaf.Client.ScrollLeft];
    tlevt.tlAddData(tlAddNameValueArray);
    TeaLeaf.Client.ScrollClientX = TeaLeaf.Client.ScrollClientY = null;
    TeaLeaf.Client.ScrollScreenX = TeaLeaf.Client.ScrollScreenY = null;
    TeaLeaf.Client.ScrollHeight  = TeaLeaf.Client.ScrollWidth   = null;
    TeaLeaf.Client.ScrollTop     = TeaLeaf.Client.ScrollLeft    = null;
    // Now send the data in
    tlevt.tlSend();
  }

    /**
    * Find the nearest ancestor for a DOM node of the given type
    * @param node The original node
    * @param tag The tag to match on
    * @addon
    */  
	TeaLeaf.Client.tlFindAncestorByTag = function(node, tag)
    {
        var cur_node = node.parentNode;
        while(cur_node && cur_node != window.document)
        {
            if(cur_node.nodeType != 1) continue;
            if(cur_node.tagName == tag) break;
            else cur_node = cur_node.parentNode;
        }
        
        return cur_node;
    }

    /**
     * Checks the ID black list and ignores those IDs
     * @param id of the node captured
     * @addon
     */
    TeaLeaf.Client.tlCheckBlackList = function(tlid) {
      var i,
          regExMatched,
          tlIDRegEx;

      if (!TeaLeaf.Client.Configuration.tlIDBlackList ||
          !TeaLeaf.Client.Configuration.tlIDBlackList.length)
      {
        // No blacklist defined.
        return false;
      }

      if (tlid) {
        for (i=0; i < TeaLeaf.Client.Configuration.tlIDBlackList.length; i++) {
          tlIDRegEx = new RegExp(TeaLeaf.Client.Configuration.tlIDBlackList[i], "g");
          regExMatched = tlid.match(tlIDRegEx);
          if (regExMatched) {
            return true;
          }
        }
      }
      return false;
    }


    /**
     * Checks the ID white list and includes those IDs
     * @param id of the node captured 
     * @addon
     */
    TeaLeaf.Client.tlCheckWhiteList = function(tlid) {
      var i,
          regExMatched,
          tlIDRegEx;

      if (!TeaLeaf.Client.Configuration.tlIDWhiteList ||
          !TeaLeaf.Client.Configuration.tlIDWhiteList.length)
      {
        // No whitelist defined
        return true;
      }
      if (tlid) {
        for (i=0; i < TeaLeaf.Client.Configuration.tlIDWhiteList.length; i++) {
          tlIDRegEx = new RegExp(TeaLeaf.Client.Configuration.tlIDWhiteList[i], "g");
          regExMatched = tlid.match(tlIDRegEx);
          if (regExMatched) {
            return true;
          }
        }
      }
      return false;
    }

  /**
   * Generate an XPath for the node, consumable by TeaLeaf.Client.tlGetNodeFromXPath
   * @param node The starting node
   * @param tag The tag to match on
   * @addon
   */
  TeaLeaf.Client.tlGetXPathFromNode = function(node) {
    if (!node) {
      return null;
    }
        var xpath = [];
        var cur_node = node;
        var nodes_arr = null;
        var parent_node = null;

	 // Hack fix to handle tags that are not normally visual elements
	 for(var i in TeaLeaf.Client.Configuration.tlSpecialChildNodeTags)
	 {
		if(cur_node.tagName.toString()==i)
			cur_node = cur_node.parentNode;
	 }
       var idValid = false;
        
       for(idValid = TeaLeaf.Client.CheckIfIdValid(cur_node); cur_node != window.document && (!idValid); idValid = TeaLeaf.Client.CheckIfIdValid(cur_node))
       {
            nodes_arr = null;
            parent_node = null;
            switch(cur_node.tagName)
            {
                case "TD":
                    if(parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "TR"))
                        nodes_arr = parent_node.cells;
                    break;
                case "TR":
                    if(parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "TABLE"))
                        nodes_arr = parent_node.rows;
                    break;
	        	case "OPTION":
		            if(parent_node = TeaLeaf.Client.tlFindAncestorByTag(cur_node, "SELECT"))
		                nodes_arr = parent_node.options;
		    		break;
                default:
                    parent_node = cur_node.parentNode;
		            if(!parent_node) parent_node = window.document;
		            nodes_arr = parent_node.childNodes;
		            break;
            }
            if(nodes_arr == null) return null;
            var j=0;
            for(var i=0; i<nodes_arr.length; i++)
            {
	            if(nodes_arr[i].nodeType == 1 && nodes_arr[i].tagName == cur_node.tagName)
                {
                    if(nodes_arr[i] == cur_node)
                    {
                        xpath[xpath.length] = [cur_node.tagName.toUpperCase(), j];
                        break;
                    }
                    
                    j++;
                }
            }
	    	cur_node = parent_node;
        }


        if(idValid) xpath[xpath.length] = [cur_node.id];

        if (!xpath.length) {
          // XXX - Is returning null the best thing here?
          return null;
        }
        var parts = [];
        for(var i=xpath.length-1; i>=0; i--)
        {
            if(xpath[i].length > 1)
                parts[parts.length] = "['"+xpath[i][0]+"',"+xpath[i][1]+"]";
            else
                parts[parts.length] = "['"+xpath[i][0].toString().replace(/'/g, "\\'")+"']";
        }
        
        return "["+parts.join(",")+"]";
    }
	
	/**
    * Check the if the node has a valid id attribute for TeaLeaf.Client.tlGetNodeFromXPath
    * @param node The node to be tested
    * @addon
    */
	
  TeaLeaf.Client.CheckIfIdValid = function(node) {
    var oldId;

    if (!node || !node.id || typeof(node.id) != "string") {
      return false;
    }

    if (TeaLeaf.Client.tlCheckBlackList(node.id) === true) {
      // node.id matched with blacklist
      return false;
    }

    if (TeaLeaf.Client.tlCheckWhiteList(node.id) === false) {
      // node.id did not match with whitelist
      return false;
    }
    
    if (!TeaLeaf.Client.Configuration.tlUniqueIDCheckEnabled) {
      // Uniqueness check is disabled.
      return true;
    }

    oldId = node.id;
    node.id = (new Date()).getTime() + "_TeaLeaf";
    try {
      if (!document.getElementById(oldId)) {
        // id is unique
        node.id = oldId;
        return true;
      }
      else {
        // id is non-unique
        node.id = oldId;
        return false;
      }
    }
    catch(e) {
      return false;
    }
    finally {
      node.id = oldId;
    }
  }

    /**
    * Find a node specified by an XPath generated by TeaLeaf.Client.tlGetXPathFromNode
    * @param path The XPath
    * @addon
    */      
    TeaLeaf.Client.tlGetNodeFromXPath = function(path, decode)
    {
        if(path == null) return null;
	if(decode) path = TeaLeaf.Event.tlXMLDecode(path);
        var xpath = eval(path);
        if(xpath == null) return null;
        var cur_node = window.document;
        
        for(var i=0; i<xpath.length; i++)
        {
	        found = false;
            if(xpath[i].length == 1)
            {
                cur_node = document.getElementById(xpath[i]);
                if(cur_node == null) return null; 
            }
            else
            {
                k = 0;
	            switch(cur_node.tagName)
	            {
		            case "TABLE": children = cur_node.rows; break;
		            case "TR": children = cur_node.cells; break;
		            case "SELECT": children = cur_node.options; break;
		            default: children = cur_node.childNodes; break;
	            }

                for(var j=0; j<children.length; j++)
                {
	                if(children[j].nodeType != 1) continue;
                    if(children[j].tagName.toUpperCase() == xpath[i][0])
                    {
                        if(k == xpath[i][1])
                        {
                            cur_node = children[j];
		                    found = true;
                            break;
                        }
                        
                        k++;
                    }
                }

	            if(!found) return null;
            }
        }
       
        return cur_node;
    }

    // Added to have a globally accessible version (not under TeaLeaf namespace)
    window.TeaLeaf_Client_tlGetNodeFromXPath = TeaLeaf.Client.tlGetNodeFromXPath;

  TeaLeaf.Private.tlPrevEvent;
  TeaLeaf.Private.setLastProcessedEvent = function(e) {
    var TP = TeaLeaf.Private,
        UNDEFINED;
    
    if (!e) {
      return;
    }
    if (!TP.tlPrevEvent) {
      TP.tlPrevEvent = {};
    }
    // Copy the relevant parts
    TP.tlPrevEvent.type = e.type;
    TP.tlPrevEvent.button = e.button;
    TP.tlPrevEvent.clientX = e.clientX;
    TP.tlPrevEvent.clientY = e.clientY;
    
    if (typeof e.keyCode !== "undefined") {
      TP.tlPrevEvent.keyCode = e.keyCode;
    }
    else {
      TP.tlPrevEvent.keyCode = UNDEFINED;
    }

    if (typeof e.charCode !== "undefined") {
      TP.tlPrevEvent.charCode = e.charCode;
    }
    else {
      TP.tlPrevEvent.charCode = UNDEFINED;
    }

    if (typeof e.timeStamp !== "undefined") {
      if (e.timeStamp.getTime) {
        TP.tlPrevEvent.timeStamp = e.timeStamp.getTime();
      }
      else {
        TP.tlPrevEvent.timeStamp = e.timeStamp;
      }
    } else {
      TP.tlPrevEvent.timeStamp = new Date().getTime();
    }

    if (typeof e.target !== "undefined") {
      TP.tlPrevEvent.target = e.target;
    }
    else {
      TP.tlPrevEvent.target = UNDEFINED;
    }

    if (typeof e.srcElement !== "undefined") {
      TP.tlPrevEvent.srcElement = e.srcElement;
    }
    else {
      TP.tlPrevEvent.srcElement = UNDEFINED;
    }
  }
  
  TeaLeaf.Private.getLastProcessedEvent = function() {
    return TeaLeaf.Private.tlPrevEvent;
  }
  
  /* Return true or false */
  TeaLeaf.Client.isDuplicateEvent = function(currEvent) {
    var TP = TeaLeaf.Private,
        prevEvent = TP.getLastProcessedEvent();

    if (!prevEvent || !currEvent) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for event type
    if (prevEvent.type !== currEvent.type) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for event target
    if (prevEvent.target !== currEvent.target) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }
    if (prevEvent.srcElement !== currEvent.srcElement) {
      // IE does not have event.target
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for mouse button value
    if (prevEvent.button !== currEvent.button) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // check for X, Y co-ordinates
    if (prevEvent.clientX !== currEvent.clientX ||
        prevEvent.clientY !== currEvent.clientY)
    {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }
    
    // check for keycode
    if (prevEvent.keyCode !== currEvent.keyCode) {
      TP.setLastProcessedEvent(currEvent);
      return false;
    }

    // TODO: check for charcode

    // TODO: check for shift / alt / ctrl key press state
    
    // finally, check for timestamp
    if (typeof currEvent.timeStamp !== "undefined") {
      var currTimeStamp = currEvent.timeStamp.getTime ? currEvent.timeStamp.getTime() : currEvent.timeStamp;
      if (prevEvent.timeStamp !== currTimeStamp) {
        TP.setLastProcessedEvent(currEvent);
        return false;
      }
    }
    else {
      currEvent.timeStamp = new Date().getTime();
      /* XXX - need a better way to do this */
      if (Math.abs(currEvent.timeStamp - prevEvent.timeStamp) > 300) {
        TP.setLastProcessedEvent(currEvent);
        return false;
      }
    }

    /* XXX - does re-setting this help or hurt? 
     * We may need this so the timestamp heuristic works in a lengthy event chain in IE
     */
    TP.setLastProcessedEvent(currEvent);
    return true;
  }

	/**
    * Check attributes if they need to be captured.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                	
    TeaLeaf.Client.tlCheckAttributes = function(itemSource, theEvent){
        var tlRetAttr=[];
        var tldomelmattributes = TeaLeaf.Client.Configuration.tlAttributeCapture;

        for(var i=0; i<tldomelmattributes.length; i++){
            if(tldomelmattributes[i].tlevent == theEvent.type){
                var tlTagN = tldomelmattributes[i].tltagname.toLowerCase();
                var tlItemTag = itemSource.tagName.toLowerCase();
                
                if(tlTagN == tlItemTag){
                    var tlattrb = itemSource.getAttribute(tldomelmattributes[i].tlattributename);
                    if(tlattrb){
                        tlRetAttr.push(tldomelmattributes[i].tlattributename, escape(tlattrb));
                    }
                }
            }
        }
        
        return tlRetAttr;
    }

  TeaLeaf.Client.tlAddEvent = function(theEvent) {
    var T = TeaLeaf,
        TC = T.Client,
        TCC = TC.Configuration,
        i,
        itemSource,
        now,
        tlAddNameValueArray,
        tlAddNameValueArrayManualName,
        tlattr,
        tlcheck,
        tlevt,
        tlhrefstr,
        tljsstr,
        tlManualName,
        tlName,
        tlNodeID,
        tlRepValue,
        tlXpath;

    if (!theEvent) {
      // IE does not pass the event object
      theEvent = window.event;
    }


    // Get the target - If we have no way to identify then discard
    itemSource = TC.tlGetEventSource(theEvent);
    if (!itemSource) {
      return;
    }
    tlXpath = TC.tlGetXPathFromNode(itemSource);
    if (!tlXpath && TCC.tlDiscardInvalidXPath) {
      return;
    }
    tlattr = [];
    if (TCC.tlEnableAttr) {
      tlattr = TC.tlCheckAttributes(itemSource, theEvent);
    }

    // Send in any queued keys and resizes
    TC.tlSendKeys();
    TC.tlSendResize();
    TC.tlSendScroll();

    // Do we need to set the onFocus time?
    if (!itemSource.TeaLeafFocusTime) {
      switch (theEvent.type.toLowerCase()) {
        case "keyup":
        case "change":
        case "click":
        case "dblclick":
        case "mousedown":
          itemSource.TeaLeafFocusTime = new Date();
          break;
      }
    }

    // Ignore flash for blur
    if (theEvent.type.toLowerCase() === "blur" && itemSource.type && itemSource.type.toLowerCase() === "application/x-shockwave-flash") {
      return;
    }

    if (theEvent.type.toLowerCase() === "click" && TC.checkIsInput(itemSource)) {
      T.Event.Configuration.tlidoflastvisitedcontrol = TC.tlGetName(itemSource);
    }

    if (theEvent.type.toLowerCase() === "click" && (itemSource.tagName.toUpperCase() === "A") && T.tlBrowserIsIE()) {
      TCC.tlIEhref = false;
      tlhrefstr = itemSource.href;

      if (tlhrefstr === "#") {
        TCC.tlIEhref = true;
      }
      else {
        // TODO: Optimize this.
        tljsstr = "javascript:";
        tlcheck = tlhrefstr.substr(0, tljsstr.length);
        if (tlcheck.toLowerCase() == tljsstr) {
          TCC.tlIEhref = true;
        }
      }
    }

    // The Reporting Event
    tlevt = new T.Event(T.$C("GUI"), theEvent.type);

    // Start the node tag
    tlName = TC.tlGetName(itemSource);


    tlNodeID = itemSource.id;
    if (!TC.CheckIfIdValid(itemSource)) {
      // DO NOT pass a non-unique or blacklisted id.
      tlNodeID = "";
    }

    tlAddNameValueArray = [T.$C("Name"), itemSource.name,
                           T.$C("Id"), tlNodeID,
                           T.$C("ElementType"), itemSource.type,
                           T.$C("TagName"), itemSource.tagName,
                           T.$C("AltKey"), theEvent.altKey ? T.$C("True") : null,
                           T.$C("CtrlKey"), theEvent.ctrlKey ? T.$C("True") : null,
                           T.$C("ShiftKey"), theEvent.shiftKey ? T.$C("True") : null,
                           T.$C("XPath"), tlXpath];
    tlevt.tlAddData(tlAddNameValueArray);

    if (TCC.tlEnableAttr && tlattr && tlattr.length > 0) {
      tlevt.tlAddData(tlattr);
    }

    if (theEvent.type.toLowerCase() === "blur" && itemSource.TeaLeafFocusTime) {
      now = new Date();
      tlevt.tlAddData([T.$C("TimeInControl"), T.Event.tlDateDiff(now, itemSource.TeaLeafFocusTime)]);
      itemSource.TeaLeafFocusTime = null;
    }

    if (TC.tlIsExcluded(itemSource)) {
      tlevt.tlAddData([T.$C("Excluded"), T.$C("True")]);
    }
    else {
      tlRepValue = null;
      tlManualName = null;
      tlAddNameValueArrayManualName = [];

      if (!itemSource.value && theEvent.type.toLowerCase() === "change" &&
          itemSource.tagName.toUpperCase() === "SELECT")
      {
        i = itemSource.selectedIndex;

        if (i >= 0 && i < itemSource.options.length) {
          /* Option text does not go through privacy blocking as it is not user input. */
          tlRepValue = escape(itemSource.options[i].text);
        }
      }
      else {
        tlRepValue = TC.tlReplaceValue(itemSource);
      }

      if (tlRepValue) {
        tlManualName = T.Event.tlFormatXMLName(tlName);

        if (!tlManualName) {
          // Default to deriving the "ValueIn" attribute value from the Xpath
          tlManualName = tlXpath;
          tlManualName = T.Event.tlFormatXMLName(tlManualName);
        }
        tlAddNameValueArrayManualName = [T.$C("ValueIn"), tlManualName, tlManualName, tlRepValue];
      }

      /* Special processing for checkbox and radio button input types
       * to indicate their checked/unchecked state
       */
      if (itemSource.type && (itemSource.type.toLowerCase() === "checkbox" ||
          itemSource.type.toLowerCase() === "radio"))
      {
        tlAddNameValueArrayManualName.push(T.$C("Checked"), itemSource.checked ? T.$C("True") : T.$C("False"));
      }
      tlevt.tlAddData(tlAddNameValueArrayManualName);
    }
   tlevt.tlSend();
  }
  /* Send all the form field values with the form submit.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
	TeaLeaf.Client.tlHandleFormSubmit = function(theEvent) {
		//	Log that we did a submit - this will be send in the unload
		TeaLeaf.Client.Configuration.tlactiontype = "Submit";	
		//	Send in any queued keys and resizes
        TeaLeaf.Client.tlSendKeys();
        TeaLeaf.Client.tlSendResize();
        TeaLeaf.Client.tlSendScroll();

		//	Check for a null
		if( ! theEvent ) {
			theEvent = window.event;
		}
		//	Get the target - If we have no way to identify then discard
		var	itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
		if( ! itemSource ) {
			return;
		}
		//	If item Source.name is not definded, let's make one up
		var	i;
		if( ! itemSource.name ) {
			var	forms = document.forms;
			for(i = 0; i < forms.length; i++) {
				if( forms[i] == itemSource ) {
					itemSource.name = "Ordinal-" + i;
					break;
				}
			}
		}
		//	We have no name - forget it.
		if( ! itemSource.name ) {
			return;
		}
    // Is this one of our silent controls
    if (TeaLeaf.Client.tlIsReplace(itemSource)) {
      var tlRepValue = TeaLeaf.Client.tlGetReplaceValue(itemSource);
      var name = TeaLeaf.Client.tlGetName(itemSource);
      var tlAddNameValueArrayReplaceName = [TeaLeaf.$C("ValueIn"), name,
                                            name, tlRepValue];

      tlevt.tlAddData(tlAddNameValueArrayReplaceName);
    }
    // The Reporting Event
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), theEvent.type);
    // Start the node tag
    var tlAddNameValueArray = [TeaLeaf.$C("Name"), itemSource.name,
                               TeaLeaf.$C("Id"), itemSource.id,
                               TeaLeaf.$C("ElementType"), itemSource.type,
                               TeaLeaf.$C("TagName"), itemSource.tagName,
                               TeaLeaf.$C("AltKey"), theEvent.altKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("CtrlKey"), theEvent.ctrlKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("ShiftKey"), theEvent.shiftKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("NodeName"), theEvent.nodeName,
                               TeaLeaf.$C("NodeValue"), theEvent.nodeValue,
                               TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder];
    tlevt.tlAddData(tlAddNameValueArray);
    var	children = itemSource.getElementsByTagName("INPUT");
    tlevt.tlAddData([TeaLeaf.$C("InputFieldCount"), children.length]);
    
    tlevt.tlPushXML(TeaLeaf.$C("InputFields"));
    // Go through the children
    for (i = 0; i < children.length; i++) {
      var	child = children[i];
      // No name, skip
      if (!child.name) {
        continue;
      }
      // Put the field tag in
      tlevt.tlPushXML(TeaLeaf.$C("Field") + i);
      var tlAddNameValueArrayNode = [TeaLeaf.$C("Name"), child.name,
                                     TeaLeaf.$C("Id"), child.id,
                                     TeaLeaf.$C("ElementType"), child.type,
                                     TeaLeaf.$C("TagName"), child.tagName];
      tlevt.tlAddData(tlAddNameValueArrayNode);

      if (TeaLeaf.Client.tlIsExcluded(name)) {
        tlevt.tlAddData([TeaLeaf.$C("Excluded"), TeaLeaf.$C("True")]);
      }
      else if (TeaLeaf.Client.tlIsReplace(child.name)) {
        // Is this one of our silent controls
        var tlRepValue = TeaLeaf.Client.tlGetReplaceValue(child);
        var name = TeaLeaf.Client.tlGetName(child);
        var tlAddNameValueArrayReplaceName = [TeaLeaf.$C("ValueIn"), name,
                                              name,   tlRepValue];

        tlevt.tlAddData(tlAddNameValueArrayReplaceName);
      }
      else {
        var	tlManualName = TeaLeaf.Event.tlFormatXMLName(child.name);
        var tlAddNameValueArrayManualName = [TeaLeaf.$C("ValueIn"), tlManualName,
                                             tlManualName, child.value];
        tlevt.tlAddData(tlAddNameValueArrayManualName);
      }
      tlevt.tlPopXML();
    }
    tlevt.tlPopXML();
    tlevt.tlSend();
    TeaLeaf.Event.Configuration.tlvisitorder = "";
  }
	/**
    * Handle the resize event.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
	TeaLeaf.Client.tlQueueResize = function(tlEvent) {
		TeaLeaf.Client.tlSendKeys();
		TeaLeaf.Client.tlSendScroll();
		if( ! tlEvent ) {
			tlEvent = window.event;
		}
		if( tlEvent.clientX) {
			TeaLeaf.ResizeClientX = tlEvent.clientX;
			TeaLeaf.ResizeClientY = tlEvent.clientY;
			TeaLeaf.ResizeScreenX = tlEvent.screenX;
			TeaLeaf.ResizeScreenY = tlEvent.screenY;
		}
		else {
			TeaLeaf.ResizeClientX = tlEvent.target.width;
			TeaLeaf.ResizeClientY = tlEvent.target.height;
		}
	}
	/**
    * Handle the form reset event.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
	TeaLeaf.Client.tlHandleFormReset = function(theEvent) {
		//	Send in any queued keys and resizes
		TeaLeaf.Client.tlSendKeys();
		TeaLeaf.Client.tlSendResize();
		TeaLeaf.Client.tlSendScroll();
		//	Check for a null
		if( ! theEvent ) {
			theEvent = window.event;
		}
		//	Get the target - If we have no way to identify then discard
		var	itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
		if( ! itemSource ) {
			return;
		}
		//	If item Source.name is not definded, let's make one up
		var	i;
		if( ! itemSource.name ) {
			var	forms = document.forms;
			for(i = 0; i < forms.length; i++) {
				if( forms[i] == itemSource ) {
					itemSource.name = "Ordinal-" + i;
					break;
				}
			}
		}
        // We have no name - forget it.
        if (!itemSource.name) {
            return;
        }
    // Is this one of our silent controls
    if (TeaLeaf.Client.tlIsReplace(itemSource)) {
      var tlRepValue = TeaLeaf.Client.tlGetReplaceValue(itemSource);
      var tlname = TeaLeaf.Client.tlGetName(itemSource);
      var tlAddNameValueArrayReplaceName = [TeaLeaf.$C("ValueIn"), tlname,
                                            tlname, tlRepValue];
      tlevt.tlAddData(tlAddNameValueArrayReplaceName);
    }
    // The Reporting Event
    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), theEvent.type);
    // Start the node tag
    var tlAddNameValueArray = [TeaLeaf.$C("Name"), itemSource.name,
                               TeaLeaf.$C("Id"), itemSource.id,
                               TeaLeaf.$C("ElementType"), itemSource.type,
                               TeaLeaf.$C("TagName"), itemSource.tagName,
                               TeaLeaf.$C("AltKey"), theEvent.altKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("CtrlKey"), theEvent.ctrlKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("ShiftKey"), theEvent.shiftKey ? TeaLeaf.$C("True") : null,
                               TeaLeaf.$C("NodeName"), theEvent.nodeName,
                               TeaLeaf.$C("NodeValue"), theEvent.nodeValue,
                               TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder];
    tlevt.tlAddData(tlAddNameValueArray);
    tlevt.tlSend();
    TeaLeaf.tlVisitOrder = "";
  }

  /* Handle the before unload event and flush the queue of events client events captured.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
  TeaLeaf.Client.tlBeforeUnload = function() {
    // Only let this fire once
    if (TeaLeaf.Client.tlBeforeUnloadFired) {
      return;
    }
    if (TeaLeaf.Client.Configuration.tlIEhref) {
      TeaLeaf.Client.Configuration.tlIEhref = false;
      return;
    }
    TeaLeaf.Client.tlBeforeUnloadFired = true;
    if (!TeaLeaf.Configuration.xhrAsyncOnUnload) {
      // Switch to synchronous communication.
      // IE has a bug when asynchronous connections are open while
      // the page is unloaded. These connections are not cleaned up
      // correctly and end up rendering the browser unusable after
      // a few tries. This only happens when the browser has been
      // opened as a child window i.e. using window.open() or
      // if the anchor tag specifies target="_blank".
      TeaLeaf.Configuration.xhrAsync = false;
    }

    // If configured to do so, store the current event queue xml in a cookie
    // so if it fails to send up it can be sent with the next page's events
    if (TeaLeaf.Client.Configuration.tlStoreQueueInCookie) {
      var d = new Date();
      d.setTime(d.getTime()+300000);
      var cookie_val = TeaLeaf.Event.tlQueuedXML.replace(/(\r|\n)/g, "").replace(/;/g, "%3B");
      TeaLeaf.tlSetCookie("tlQueuedXML", cookie_val, d, "/");
    }
        if(TeaLeaf.Client.Configuration.tlbeforeunloadflag == true){ 
            TeaLeaf.Event.Configuration.tllastdwelltime = new Date();
            TeaLeaf.Client.Configuration.tlunloadflag = false;   
		 
		    //	Send in the notice
		    var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("PERFORMANCE"), TeaLeaf.$C("BeforeUnload"));	
		    TeaLeaf.Event.SetType = tlevt.EventType;

		    if(!TeaLeaf.Event.SetSubType){
                TeaLeaf.Event.SetSubType = tlevt.EventSubType;
            }
            else{
                TeaLeaf.Event.SetSubType += "; " + tlevt.EventSubType;
            }                    
            TeaLeaf.Event.Configuration.tlbeforeunloadflag = true;
            var tlAddNameValueArray = [TeaLeaf.$C("MouseMove"), TeaLeaf.Client.tlHasUserMovement ? TeaLeaf.$C("True") : TeaLeaf.$C("False"),
                                       TeaLeaf.$C("Action"), TeaLeaf.Client.Configuration.tlactiontype,
                                       TeaLeaf.$C("VisitOrder"), TeaLeaf.Event.Configuration.tlvisitorder,
                                       TeaLeaf.$C("Alerts"), TeaLeaf.Event.tlGetAlertCount()];
            tlevt.tlAddData(tlAddNameValueArray);
            TeaLeaf.Event.Configuration.tlasync = false;        		
		    tlevt.tlSend();
	
		    TeaLeaf.Event.tlFlushQueue(true);
		    TeaLeaf.Event.Configuration.tlvisitorder = "";
		}
    // Set callback timer to reset the flags in case this is not a real unload.
    setTimeout(function () {
                 TeaLeaf.Client.tlBeforeUnloadFired = false;
                 TeaLeaf.Configuration.xhrAsync = true;
               }, 1000);
	}
	/**
    * Handle the unload event and flush the queue of events client events captured.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                				
  TeaLeaf.Client.tlUnload = function(){
    var T,
        TC,
        TCCfg,
        TE,
        TECfg,
        tlAddNameValueArray,
        tlevt;

    T = TeaLeaf;
    TC = T.Client;
    TCCfg = TC.Configuration;
    TE = T.Event;
    TECfg = TE.Configuration;
    TC.tlDetachFromAllControls();
    if (!TC.tlBeforeUnloadFired && TCCfg.tlunloadflag) {
      TECfg.tllastdwelltime = new Date();
      TCCfg.tlbeforeunloadflag = false;

      //	Send in the notice
      tlevt = new TE(T.$C("PERFORMANCE"), T.$C("Unload"));
      TE.SetType = tlevt.EventType;

      if (!TE.SetSubType) {
        TE.SetSubType = tlevt.EventSubType;
      }
      else {
        TE.SetSubType += "; " + tlevt.EventSubType;
      }
      tlAddNameValueArray = [T.$C("MouseMove"), TC.tlHasUserMovement ? T.$C("True") : T.$C("False"),
                             T.$C("Action"), TCCfg.tlactiontype,
                             T.$C("VisitOrder"), TECfg.tlvisitorder];
      tlevt.tlAddData(tlAddNameValueArray);
      T.Configuration.xhrAsync = false;
      tlevt.tlSend();
      TE.tlFlushQueue(true);
      TECfg.tlvisitorder = "";
    }
  }
  /**
    * Attach listeners to all controls including controls in frames.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
  TeaLeaf.Client.tlAttachToAllControls = function() {
    TeaLeaf.Client.Configuration.tlcontrolsattached = true;
    // Attach to the main window
    TeaLeaf.Event.tlAddHandler(window, "beforeunload", eval(TeaLeaf.Client.tlBeforeUnload), false);
    TeaLeaf.Event.tlAddHandler(window, "unload", eval(TeaLeaf.Client.tlUnload), false);
    TeaLeaf.Client.tlAttachToControls(window);

    // Attach to the frame controls
    try {
      var	ind;
      for (ind=0; ind < window.frames.length; ind++) {
        if (window == window.frames[ind]) {
          continue;
        }
        TeaLeaf.Client.tlAttachToControls(window.frames[ind]);
      }
    }
    catch(e) {
      // XXX Debug here
    }
  }
	
	/**
    * Attach listeners for specified events to specified controls.
    * 
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
	TeaLeaf.Client.tlSingleAttach = function() {	
	    var tldomsingleelements = TeaLeaf.Client.Configuration.tlSingleAttach;
	
        for(var i=0; i<tldomsingleelements.length; i++){      
            if(tldomsingleelements[i].domelementID
                    && tldomsingleelements[i].domelementID !=""){                
                var tlelement = document.getElementById(tldomsingleelements[i].domelementID);
                if(tlelement){
                    var func = eval(tldomsingleelements[i].tlhandler);
                    TeaLeaf.Event.tlAddHandler(tlelement, tldomsingleelements[i].domevent, func, false);   
                }            
            }
        }
	}

  /**
    * Attach listeners to controls based on the configuration.
    * @param win window object.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
  TeaLeaf.Client.tlAttachToControls = function(win) {
    try {
      // Attach to all listeners for all the window and document controls.
      var handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
      for (var i=0; i < handlers.length; i++) {
        if (handlers[i].load) {
          var func = eval(handlers[i].tlhandler);
          TeaLeaf.Event.tlAddHandler(win, handlers[i].domevent, func, false);
        }
      }

      handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
      for (var i=0; i < handlers.length; i++) {
        if (handlers[i].load) {
          var func = eval(handlers[i].tlhandler);
          TeaLeaf.Event.tlAddHandler(win.document, handlers[i].domevent, func, false);
        }
      }

      // Look for the individual controls
      TeaLeaf.Client.tlProcessNode(win.document.body);
    }
    catch (e) {
      // XXX Debug here
    }
  }
	/**
    * Check if a handler is attached to a control, otherwhise,
    * if the control is INPUT or SELECT attach focus, blur and change 
    * @param control control to check.
    * @requires 
    * TeaLeafEvent.js
    * @addon
    */            	                                                                				
    TeaLeaf.Client.tlCheckAttach = function(control) {
        var i,
            handlers,
            item_name,
            lower_item_name;

        // Already got this control
        if (control.TeaLeaf || control.TeaLeafExclude) {
            return;
        }
        control.TeaLeaf = true;

        if (TeaLeaf.Client.Configuration.tlassignTLID) {
            TeaLeaf.Client.tlAddIdToControl(control);
        }

        // Double check for the listed tagnames. If it matches, attach
        // for focus, blur and change, since the document object won't see these
        switch (control.tagName) {
            case "INPUT":
            case "SELECT":
            case "TEXTAREA":
                TeaLeaf.Event.tlAddHandler(control, 'focus', TeaLeaf.Client.tlSetFocusTime, false);
                TeaLeaf.Event.tlAddHandler(control, 'blur', TeaLeaf.Client.tlHandleBlur, false);
                TeaLeaf.Event.tlAddHandler(control, 'change', TeaLeaf.Client.tlAddEvent, false);
                break;
        }

        if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
            handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
            for (i=0; i < handlers.length; i++) {
                if (handlers[i].load) {
                    TeaLeaf.Event.tlAddHandler(control, handlers[i].domevent, eval(handlers[i].tlhandler), false);
                }
            }
        }
    }
	/**
    * Attach to INPUT and SELECT. 
    * @param win window object.
    * @addon
    */            	                                                                					
	TeaLeaf.Client.tlCheckIndControls = function(win) {
            try{
                if(win.document){  
                    var items = win.document.getElementsByTagName("INPUT");				    
                    for(var i = 0; i < items.length; i++) {			
                        TeaLeaf.Client.tlCheckAttach(items[i]);
                    }	
                    items = win.document.getElementsByTagName("SELECT");
                    for(var i = 0; i < items.length; i++) {
                        TeaLeaf.Client.tlCheckAttach(items[i]);
                    }
                    items = win.document.getElementsByTagName("BODY"); 
                    if(items.length>0){		
                        items = items[0].getElementsByTagName("*");		       
                        for(var i = 0; i < items.length; i++) {
                            TeaLeaf.Client.tlCheckAttach(items[i]);
                        }
                    }
                }
            }
            catch(e) { }
        }
      
  /**
   * Attach to the given DOM node and all descendants
   * @param obj (Optional) DOM object or element id. If obj is null or
   *                       an invalid id string then tlProcessNode defaults
   *                       to using document body.
   * @param ignore_descendants (Optional) boolean to ignore child nodes
   * @addon
   */
  TeaLeaf.Client.tlProcessNode = function(obj, ignore_descendants) {
    var i, j,
        explicit_tags,
        items;

    if (typeof(obj) === "string") {
      obj = document.getElementById(obj);
    }
    if (!obj) {
      obj = window.document.body;
    }
        try {
            switch (obj.tagName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    TeaLeaf.Client.tlCheckAttach(obj);
                    break;
                default:
                    if (TeaLeaf.Client.Configuration.tlUniversalAttach &&
                        TeaLeaf.Client.tlTagNameAllowed(obj.tagName))
                    {
                        TeaLeaf.Client.tlCheckAttach(obj);
                    }
                    break;
            }

            if (!ignore_descendants) {
                explicit_tags = ["INPUT","SELECT","TEXTAREA"];
                for (i=0; i < explicit_tags.length; i++) {
                    items = obj.getElementsByTagName(explicit_tags[i]);
                    for (j=0; j < items.length; j++) {
                        TeaLeaf.Client.tlCheckAttach(items[j]);
                    }
                }

                if (TeaLeaf.Client.Configuration.tlUniversalAttach) {
                    if (TeaLeaf.Client.Configuration.tlExcludeTags) {
                        items = obj.getElementsByTagName("*");
                        for (i=0; i < items.length; i++) {
                            if (TeaLeaf.Client.tlTagNameAllowed(items[i].tagName)) {
                                TeaLeaf.Client.tlCheckAttach(items[i]);
                            }
                        }
                    }
                    else {
                        for (i in TeaLeaf.Client.Configuration.tlNodeTags) {
                            items = obj.getElementsByTagName(i);
                            for (j=0; j < items.length; j++) {
                                TeaLeaf.Client.tlCheckAttach(items[j]);
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            /* TODO: Report on any exception here for debugging */
        }
    }
	/**
    * Handle focus event.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                						
	TeaLeaf.Client.tlSetFocusTime = function(theEvent) {
		//	Check for a null
		if( ! theEvent ) {
			theEvent = window.event;
		}
		//	We need the item source.  Ignore flash
		var	itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
		if( ! itemSource || itemSource.type == "application/x-shockwave-flash" ) {
			return;
		}
		//	Get the target - If we have no way to identify then discard
		var	itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
		if( ! itemSource ) {
			return;
		}
		if( ! itemSource.TeaLeafFocusTime ) {
			itemSource.TeaLeafFocusTime = new Date();
		}
		//	If we are sending the focus event, then send it!
		if(TeaLeaf.Client.Configuration.tlsendfocus ) {
			TeaLeaf.Client.tlAddEvent(theEvent);
		}
	}	
	/**
    * Handle blur event.
    * @param theEvent DOM event.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                						
	TeaLeaf.Client.tlHandleBlur = function(theEvent) {
		//	Check for a null
		if( ! theEvent ) {
			theEvent = window.event;
		}
		//	We need the item source.  Ignore flash
		var	itemSource = TeaLeaf.Client.tlGetEventSource(theEvent);
		if( ! itemSource || itemSource.type == "application/x-shockwave-flash" ) {
			return;
		}
		TeaLeaf.Client.tlEndVisit(itemSource);
		if(TeaLeaf.Client.checkIsInput(itemSource))
			TeaLeaf.Event.Configuration.tlidoflastvisitedcontrol = TeaLeaf.Client.tlGetName(itemSource);
		//	Send the event?
		if( TeaLeaf.Client.Configuration.tlsendblur ) {
			TeaLeaf.Client.tlAddEvent(theEvent);
		}
		itemSource.TeaLeafFocusTime = null;
	}
	/**
    * Last element visited.
    * @param itemSource DOM element.
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                						
	TeaLeaf.Client.tlEndVisit = function(itemSource) {
		if( itemSource.TeaLeafFocusTime ) {
			var name = TeaLeaf.Client.tlGetName(itemSource);
			if( ! name ) {
				name = TeaLeaf.Client.tlGetAnchor(itemSource, false);
				if( name ) {
					name = "LEVEL" + name;
				}
				else {
					name = "unnamed";
				}
			}
			var diff = TeaLeaf.Event.tlDateDiff(itemSource.TeaLeafFocusTime, new Date());
			var entry = name + ':' + diff;

			if( TeaLeaf.Event.Configuration.tlvisitorder != "")
				TeaLeaf.Event.Configuration.tlvisitorder = TeaLeaf.Event.Configuration.tlvisitorder + ";" + entry;
			else
				TeaLeaf.Event.Configuration.tlvisitorder = entry;
		}
	}
	/**
    * Detach from all controls including frames.
    *
    * @requires 
    * TeaLeafClientCfg.js
    * @addon
    */            	                                                                						
	TeaLeaf.Client.tlDetachFromAllControls = function() {
		//	Mark as not attached
		TeaLeaf.Client.Configuration.tlcontrolsattached = false;

		//	Attach to this window
		TeaLeaf.Client.tlDetachFromControls(window);

		//	Do the frames
		try{
			var	ind;
			for(ind = 0; ind < window.frames.length; ind++) {
				var	w = window.frames[ind];
				TeaLeaf.Client.tlDetachFromControls(w);
			}
		}
		catch(e){}
	}
	/**
    * Detach listeners to controls based on the configuration. 
    * @param win window object.
    * @requires 
    * TeaLeafClientCfg.js
    * TeaLeafEvent.js
    * @addon
    */            	                                                                			
	TeaLeaf.Client.tlDetachFromControls = function(win) {
	try{
	    var handlers = TeaLeaf.Client.Configuration.tlWindowHandlers;
	    for(var i=0; i<handlers.length; i++) {
	        var func = eval(handlers[i].tlhandler);
	        TeaLeaf.Event.tlRemoveHandler(win, handlers[i].domevent, func, false);
	    }
	    handlers = TeaLeaf.Client.Configuration.tlDocumentHandlers;
	    for(var i=0; i<handlers.length; i++) {
	        var func = eval(handlers[i].tlhandler);
	        TeaLeaf.Event.tlRemoveHandler(win.document, handlers[i].domevent, func, false);
	    }

	    // Detach from Individual Items
	    var items = win.document.getElementsByTagName("INPUT");
	    var i;
	    for(i = 0; i < items.length; i++) {
	        TeaLeaf.Event.tlRemoveHandler(items[i], 'change', TeaLeaf.Client.tlAddEvent, false);
            TeaLeaf.Event.tlRemoveHandler(items[i], 'blur',   TeaLeaf.Client.tlHandleBlur, false);
	        items[i].TeaLeaf = false;
	    }
	    items = win.document.getElementsByTagName("SELECT");
	    for(i = 0; i < items.length; i++) {
	        TeaLeaf.Event.tlRemoveHandler(items[i], 'change', TeaLeaf.Client.tlAddEvent, false);
            TeaLeaf.Event.tlRemoveHandler(items[i], 'blur',   TeaLeaf.Client.tlHandleBlur, false);
	        items[i].TeaLeaf = false;
	    }
	} 
	catch(e) { }
  }
  /**
  * Attach a listener to a specific control. 
  * @param domelement DOM element.
  * @param eventtype TeaLeaf Event type.
  * @param eventHandler Event handler.
  * @requires 
  * TeaLeafEvent.js
  * @addon
  */            	                                                                			  
  TeaLeaf.Client.tlAttachToControl = function(domelement, eventtype, eventHandler) {
    if(eventHandler){
        TeaLeaf.Event.tlAddHandler(domelement, eventtype, eventHandler, false);
    }
    else{
        TeaLeaf.Event.tlAddHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false);
    }
  }
  /**
  * Detach a listener to a specific control. 
  * @param domelement DOM element.
  * @param eventtype TeaLeaf Event type.
  * @param eventHandler Event handler.
  * @requires 
  * TeaLeafEvent.js
  * @addon
  */            	                                                                			  
  TeaLeaf.Client.tlDetachFromControl = function(domelement, eventtype, eventHandler) {
    if(eventHandler){
        TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eventHandler, false);
    }
    else{
        TeaLeaf.Event.tlRemoveHandler(domelement, eventtype, eval(TeaLeaf.Client.tlAddEvent), false);
    }
  }

  /**
  * Scan the DOM based on a timer set in the configuration and attach
  * to controls that might have been rendered due to a DOM update. 
  *
  * @requires 
  * TeaLeafClientCfg.js
  * @addon
  */            	                                                                			  
   TeaLeaf.Client.tlScanForAdditions = function() {
	   	if(!TeaLeaf.Client.Configuration.tlScheduledScan) return;

		//	Attach to the main window
		//TeaLeaf.Client.tlCheckIndControls(window);
		TeaLeaf.Client.tlProcessNode(document.body);
		//	attach to the frames
		try{
			for(var i=0; i<window.frames.length; i++) {
				var w = window.frames[i];
				TeaLeaf.Client.tlProcessNode(w.document.body);
				//TeaLeaf.Client.tlCheckIndControls(w);
			}			
		}
		catch(e){}	
		
		window.clearTimeout(TeaLeaf.Client.tlTimeoutID);	
		TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate);		
	}

	TeaLeaf.Client.tlTagNameAllowed = function(tag) {
	    if(tag == null) 
	        return false;
	    var tagVal = TeaLeaf.Client.Configuration.tlNodeTags[tag];	    
	    if(tagVal == null) 
	        tagVal = false; 
	    if(TeaLeaf.Client.Configuration.tlExcludeTags) 
	        return !tagVal;
	    else 
	        return tagVal;
	}

  /**
  * Start registering DOM listeners based on the config options. 
  * NOTE: This function is ment to be used in SDK mode. 
  *
  * @requires 
  * TeaLeafClientCfg.js
  * @addon
  */            	                                                                			  
   TeaLeaf.Client.tlStartListeners = function() {
   		//	Get the lists we want to get
		TeaLeaf.Client.tlAttachToAllControls();	
		TeaLeaf.Client.tlSingleAttach();
   }

  /**
  * Unregister DOM listeners based on the config options. 
  * NOTE: This function is ment to be used in SDK mode. 
  *
  * @requires 
  * TeaLeafClientCfg.js
  * @addon
  */            	                                                                			  
   TeaLeaf.Client.tlEndListeners = function() {
   		TeaLeaf.Event.tlFlushQueue(true);
        TeaLeaf.Client.tlDetachFromAllControls();
   }

  /**
  * Sends the value of the specified element. 
  * NOTE: This function is ment to be used explicitly. 
  *
  * @requires 
  * TeaLeafClientCfg.js
  * @addon
  */            	                                                                			 
  TeaLeaf.Client.tlSendValueChange = function(tlElement, tleventtosend) {
    var tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), tleventtosend);
    // Start the node tag
    var tlAddNameValueArray = [TeaLeaf.$C("Name"), tlElement.name,
                               TeaLeaf.$C("Id"), tlElement.id,
                               TeaLeaf.$C("ElementType"), tlElement.type];
    tlevt.tlAddData(tlAddNameValueArray);
      var tlName = TeaLeaf.Client.tlGetName(tlElement);
      var tlManualName = TeaLeaf.Event.tlFormatXMLName(tlName);
      var tlRepValue = TeaLeaf.Client.tlReplaceValue(tlElement);
    var tlAddNameValueArrayManualName = [TeaLeaf.$C("ValueIn"), tlManualName,
                                         tlManualName, tlRepValue ];
    tlevt.tlAddData(tlAddNameValueArrayManualName);
    tlevt.tlSend();
  }
	
  /**
  * Setup function that attaches to all the controls on the page. 
  * @addon
  */            	                                           
  TeaLeaf.Client.tlSetup = function() {
    // If a previous event queue was stored in the cookie, apply it to the current queue
    var queuedXML = TeaLeaf.tlGetCookieValue("tlQueuedXML");
    if (queuedXML) {
      TeaLeaf.Event.tlQueuedXML += queuedXML.replace(/%3B/g, ";");
    }

		//	Get the lists we want to get
		TeaLeaf.Client.tlAttachToAllControls();	
		TeaLeaf.Client.tlSingleAttach();

    if (TeaLeaf.Event.Configuration.tlcatchpopups) {
      // Hook on to window.open()
      TeaLeaf.SavedWindowOpen = window.open;
      window.open = function(url, name, features, replace) {
        var status = "blocked";
        var subWin;
        if (typeof TeaLeaf.SavedWindowOpen == "function") {
          // FF and other DOM compliant browsers
          subWin = TeaLeaf.SavedWindowOpen.apply(this, arguments);
        }
        else {
          // The rest
          url = url ? url : "";
          name = name ? name : "";
          features = features ? features : "";
          subWin = TeaLeaf.SavedWindowOpen(url, name, features, replace);
        }
        try {
          if (!subWin.closed) {
            status = "visible";
          }
        }
        catch(exc) {
          if( TeaLeaf.Event.Configuration.tlshowexceptions ) {
            alert(exc.name + ": " + exc.message + "\r\n\r\nPos 8");
          }
        };

        var	tlevt = new TeaLeaf.Event(TeaLeaf.$C("GUI"), TeaLeaf.$C("WindowOpen"));
        var tlAddNameValueArray = [TeaLeaf.$C("Status"), status,
                                   TeaLeaf.$C("URL"), escape(url),
                                   TeaLeaf.$C("Name"), name,
                                   TeaLeaf.$C("Features"), features,
                                   TeaLeaf.$C("Replace"), replace];
        tlevt.tlAddData(tlAddNameValueArray);
        tlevt.tlSend();

        return subWin;
      };
    }
		
		//	At this point, lets scan periodically for added controls
		window.clearTimeout(TeaLeaf.Client.tlTimeoutID);
		
		if(TeaLeaf.Client.Configuration.tlscanupdate >0 ){
            TeaLeaf.Client.tlTimeoutID = window.setTimeout(TeaLeaf.Client.tlScanForAdditions, TeaLeaf.Client.Configuration.tlscanupdate);
        }
        

    }		
	/**
    * Initialize the call to tlSetup UI Client Event
    * Capture is not used as an SDK.
    * @requires
    * TeaLeafEvent.js
    * @addon
    */            	                                           
	TeaLeaf.Client.CallInit = function() {	
        TeaLeaf.Event.tlRemoveHandler(window, "beforeunload", eval(TeaLeaf.Client.tlBeforeUnload), false);
        TeaLeaf.Event.tlRemoveHandler(window, "unload", eval(TeaLeaf.Client.tlUnload), false);
    	TeaLeaf.addOnLoad(TeaLeaf.Client.tlSetup);
	}
    if(TeaLeaf.Client.Configuration.tlinit == false){
        TeaLeaf.Client.Configuration.tlinit = true;
	    TeaLeaf.Client.CallInit();		
	}
}
/*
* Copyright 1999-2010 TeaLeaf Technology, Inc.  
* All rights reserved.
*
* THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' 
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, 
* BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE DISCLAIMED.  
* IN NO EVENT SHALL TEALEAF BE LIABLE FOR ANY DIRECT, INDIRECT, 
* INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
* THE POSSIBILITY OF SUCH DAMAGE.
*
* @fileoverview 
* This is the configuration for TeaLeafEnv.js  
*
* @version 2010.12.22.1
*
*/
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    !TeaLeaf.Env)
{
	TeaLeaf.Env = {};

    if(typeof TeaLeaf.Env.Configuration == "undefined"){
        TeaLeaf.Env.Configuration = {
            "tlinit" : false,
            "tlinitpost" : true,
            
            tlPlugins : [
		        {"tlIEplugin": "ShockwaveFlash.ShockwaveFlash.1",         "tlpluginname": "Shockwave Flash",      "tlversion":"1.0",    "tlenable": false},    
		        {"tlIEplugin": "MediaPlayer.MediaPlayer.1",               "tlpluginname": "Windows Media Player", "tlversion":"",    "tlenable": false},
		        {"tlIEplugin": "PDF.PdfCtrl.1",                           "tlpluginname": "Adobe Acrobat",        "tlversion":"",     "tlenable": false},
		        {"tlIEplugin": "QuickTimeCheckObject.QuickTimeCheck.1",   "tlpluginname": "QuickTime",            "tlversion":"",     "tlenable": false}
			]
        };
    }
}
/*
 * Copyright 1999-2010 TeaLeaf Technology, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY TEALEAF ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NON-INFRINGEMENT ARE DISCLAIMED.  IN NO EVENT SHALL TEALEAF
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @fileoverview
 * This file sends Summary about Window, Document, Navigator and
 * Screen objects rendered on the page.
 *
 * @requires
 * TeaLeaf.js
 * TeaLeafEnvCfg.js
 * TeaLeafEvent.js
 *
 * @version 2010.12.22.1
 *
 */
if (typeof TeaLeaf !== "undefined" &&
    ((typeof TeaLeaf.replay === "function") ? !TeaLeaf.replay() : !TeaLeaf.replay) &&
    TeaLeaf.Env &&
    TeaLeaf.Env.Configuration)
{
  /*
   * Send a page summary about Window, Document, Navigator and Screen
   * object when the page is loaded.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */            	                                       
  TeaLeaf.Env.tlSendPageSummary = function() {
    var T,
        TC,
        TEnv,
        TEvent,
        TEnvCfg,
        TEventCfg,
        tlevt;
        
    T = TeaLeaf;
    TC = T.Configuration;
    TEnv = T.Env;
    TEvent = T.Event;
    TEnvCfg = TEnv.Configuration;
    TEventCfg = TEvent.Configuration;
    if (TC.tlSDK || !TEnvCfg.tlinitpost) {
      return;
    }

    TEnvCfg.tlinitpost = false;
    tlevt = new TEvent(T.$C("PERFORMANCE"), T.$C("INIT"));
    TEvent.PageLoadMilliSecs = TEvent.tlDateDiff(T.tlStartLoad, tlevt.date);
    TEvent.SetType = tlevt.EventType;

    if (!TEvent.SetSubType) {
      TEvent.SetSubType = tlevt.EventSubType;
    }
    else {
      TEvent.SetSubType += "; " + tlevt.EventSubType;
    }
    TEventCfg.tlinitflag = true;
    TEnv.tlInfo(tlevt);
    TEnv.tlDOMDocumentInfo(tlevt);
    TEnv.tlDOMWindowInfo(tlevt);
    TEnv.tlDOMScreenInfo(tlevt);
    TEnv.tlPluginInfo(tlevt);
    tlevt.tlSend(true);
  }

  /* Gather Basic Info.
   * @param tlevt TeaLeaf event used for reporting on the Document object.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */            	                                           
  TeaLeaf.Env.tlInfo = function(tlevt) {
    tlevt.tlPushXML(TeaLeaf.$C("Info"));
    var tlAddNameValueArray = [TeaLeaf.$C("PageLoadMilliSecs"), TeaLeaf.Event.tlGetRenderTime(),
                               TeaLeaf.$C("Version"), TeaLeaf.Event.tlGetJSVersion(),
                               TeaLeaf.$C("TimezoneOffset"), tlevt.date.getTimezoneOffset()];
    tlevt.tlAddData(tlAddNameValueArray);
    tlevt.tlPopXML();
  }

  /* Gather Information about the Document object.
   * @param tlevt TeaLeaf event used for reporting on the Document object.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Env.tlDOMDocumentInfo = function(tlevt) {
    var tlAddNameValueArray1,
        tlAddNameValueArray2,
        T;
    T = TeaLeaf;
    tlevt.tlPushXML(T.$C("Document"));
    tlAddNameValueArray1 = [T.$C("Title"), document.title,
                            T.$C("Referer"), document.referer,
                            T.$C("ContentType"), document.contentType,
                            T.$C("LastModified"), document.lastModified,
                            T.$C("CharacterSet"), document.characterSet,
                            T.$C("Height"), document.height,
                            T.$C("Width"), document.width];
    tlevt.tlAddData(tlAddNameValueArray1);
    tlAddNameValueArray2 = [T.$C("Anchors"), document.anchors.length,
                            T.$C("Applets"), document.applets.length,
                            T.$C("Embeds"), document.embeds.length,
                            T.$C("Forms"), document.forms.length,
                            T.$C("Images"), document.images.length,
                            T.$C("BadImages"), (T.tlBrowserIsWebKit() ? 0 : T.Event.tlBadImageCount()),
                            T.$C("Links"), document.links.length,
                            T.$C("Plugins"), document.plugins.length];
    // Bad images cannot be counted for WebKit based browsers during the onload event as Webkit triggers onload before images are decoded.
    tlevt.tlAddData(tlAddNameValueArray2);
    tlevt.tlPopXML();
  }

  /* Gather Information about the Window object.
   * @param tlevt TeaLeaf event used for reporting on the Window object.
   * @requires
   * TeaLeafEvent.js 
   * @addon
   */            	                                           
  TeaLeaf.Env.tlDOMWindowInfo = function(tlevt) {
    var T,
        tlAddNameValueArray,
        tlAddNameValueArrayScreen,
        tlWindowId;

    T = TeaLeaf;
    tlevt.tlPushXML(T.$C("Window"));
    tlAddNameValueArray = [T.$C("WindowHref"), escape(window.location.href),
                           T.$C("WindowProtocol"), window.location.protocol,
                           T.$C("WindowHost"), window.location.host,
                           T.$C("WindowHostName"), window.location.hostname,
                           T.$C("WindowPort"), window.location.port,
                           T.$C("WindowPathName"), window.location.pathname];
    tlevt.tlAddData(tlAddNameValueArray);
    if (window.innerHeight && window.innerWidth) {
      tlevt.tlAddData([T.$C("ClientSize"), (window.innerHeight + "x" + window.innerWidth)]);
    }
    else if (document.body) {
      if (document.body.clientWidth && document.body.clientHeight) {
        tlevt.tlAddData([T.$C("ClientSize"), (document.body.clientHeight + "x" + document.body.clientWidth)]);
      }
    }

    tlAddNameValueArrayScreen = [T.$C("FullScreen"), navigator.fullScreen,
                                 T.$C("Frames"), window.frames.length];

    if (typeof window.sessionStorage === "object") {
      try {
        tlWindowId = window.sessionStorage.TLTWID;
        if (tlWindowId == null) {
          // Create a new window Id
          tlWindowId = T.makeRandomString(6);
          window.sessionStorage.TLTWID = tlWindowId;
        }
      }
      catch (e) {
        // Ignore exceptions and reset the window Id to null.
        tlWindowId = null;
      }
      finally {
        tlevt.tlAddData([T.$C("WindowId"), tlWindowId]);
      }
    }

    tlevt.tlAddData(tlAddNameValueArrayScreen);
    tlevt.tlPopXML();
  }

  /* Gather Information about the Navigator object.
   * @param tlevt TeaLeaf event used for reporting on the Navigator object.
   * @requires
   * TeaLeafEvent.js 
   * @addon
   */            	                                           
  TeaLeaf.Env.tlDOMNavigatorInfo = function(tlevt) {
    tlevt.tlPushXML(TeaLeaf.$C("Navigator"));
    // Navigator Info
    var tlAddNameValueArray = [TeaLeaf.$C("AppCodeName"), navigator.appCodeName,
                               TeaLeaf.$C("AppName"), navigator.appName,
                               TeaLeaf.$C("AppVersion"), navigator.appVersion,
                               TeaLeaf.$C("BrowserLanguage"), navigator.browserLanguage,
                               TeaLeaf.$C("CookieEnabled"), navigator.cookieEnabled,
                               TeaLeaf.$C("CPUClass"), navigator.cpuClass,
                               TeaLeaf.$C("Language"), navigator.language,
                               TeaLeaf.$C("OSCPU"), navigator.oscpu,
                               TeaLeaf.$C("Platform"), navigator.platform,
                               TeaLeaf.$C("Product"), navigator.product,
                               TeaLeaf.$C("SystemLanguage"), navigator.systemLanguage,
                               TeaLeaf.$C("UserAgent"), navigator.userAgent,
                               TeaLeaf.$C("UserLanguage"), navigator.userLanguage,
                               TeaLeaf.$C("Vendor"), navigator.vendor,
                               TeaLeaf.$C("VendorSub"), navigator.vendorSub];
    tlevt.tlAddData(tlAddNameValueArray);
    tlevt.tlPopXML();
  }

  /* Gather Information about the Screen object.
   * @param tlevt TeaLeaf event used for reporting on the Navigator object.
   * @requires
   * TeaLeafEvent.js 
   * @addon
   */            	                                           
  TeaLeaf.Env.tlDOMScreenInfo = function(tlevt) {
    tlevt.tlPushXML(TeaLeaf.$C("Screen"));
    // Screen Info
    var tlAddNameValueArray = [TeaLeaf.$C("AvailHeight"), screen.availHeight,
                               TeaLeaf.$C("AvailLeft"), screen.availLeft,
                               TeaLeaf.$C("AvailTop"), screen.availTop,
                               TeaLeaf.$C("AvailWidth"), screen.availWidth,
                               TeaLeaf.$C("BufferDepth"), screen.bufferDepth,
                               TeaLeaf.$C("ColorDepth"), screen.colorDepth,
                               TeaLeaf.$C("DeviceXDPI"), screen.deviceXDPI,
                               TeaLeaf.$C("DeviceYDPI"), screen.deviceYDPI,
                               TeaLeaf.$C("FontSmoothingEnabled"), screen.fontSmoothingEnabled,
                               TeaLeaf.$C("Height"), screen.height,
                               TeaLeaf.$C("Left"), screen.left,
                               TeaLeaf.$C("LogicalXDPI"), screen.logicalXDPI,
                               TeaLeaf.$C("LogicalYDPI"), screen.logicalYDPI,
                               TeaLeaf.$C("Top"), screen.top,
                               TeaLeaf.$C("UpdateInterval"), screen.updateInterval,
                               TeaLeaf.$C("Width"), screen.width];
    tlevt.tlAddData(tlAddNameValueArray);
    tlevt.tlPopXML();
  }

  /* Gather Information about the available plugins.
   * @param tlevt TeaLeaf event used for reporting on available plugins.
   * @requires
   * TeaLeafEvent.js
   * @addon
   */
  TeaLeaf.Env.tlPluginInfo = function(tlevt) {
    if (window.ActiveXObject) {
      for (var i = 0; i < TeaLeaf.Env.Configuration.tlPlugins.length; i++) {
        if (!TeaLeaf.Env.Configuration.tlPlugins[i].tlenable) {
          continue;
        }
        var tlPlugin = TeaLeaf.Env.Configuration.tlPlugins[i].tlIEplugin;
        try {
          var tlActiveX = new ActiveXObject(tlPlugin);
          if (tlActiveX) {
            tlevt.tlPushXML(TeaLeaf.$C("Plugin"));
            var tlAddNameValueArray = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[i].tlpluginname,
                                       TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[i].tlversion];
            tlevt.tlAddData(tlAddNameValueArray);
            tlevt.tlPopXML();
          }
        }
        catch(e) {
          // Do nothing
        }
      }
    }
    else {
      for (var i = 0; i < navigator.plugins.length; i++) {
        for (var j = 0; j < TeaLeaf.Env.Configuration.tlPlugins.length; j++) {
          if (!TeaLeaf.Env.Configuration.tlPlugins[j].tlenable) {
            continue;
          }
          var tlnavpluginname = navigator.plugins[i].name.substr(0, TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname.length);
          if (tlnavpluginname == TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname) {
            TeaLeaf.Env.Configuration.tlPlugins[j].tlenable = false;
            tlevt.tlPushXML(TeaLeaf.$C("Plugin"));
            var tlAddNameValueArray = [TeaLeaf.$C("Pluginname"), TeaLeaf.Env.Configuration.tlPlugins[j].tlpluginname,
                                       TeaLeaf.$C("Version"), TeaLeaf.Env.Configuration.tlPlugins[j].tlversion];
            tlevt.tlAddData(tlAddNameValueArray);
            tlevt.tlPopXML();
          }
        }
      }
    }
  }

  /* Initialize the call to tlSendPageSummary when UI Client Event
   * Capture is not used as an SDK.
   * @addon
   */
  TeaLeaf.Env.CallInit = function() {
    TeaLeaf.addOnLoad(TeaLeaf.Env.tlSendPageSummary);
  }

  if (TeaLeaf.Env.Configuration.tlinit == false) {
    TeaLeaf.Env.Configuration.tlinit = true;
    TeaLeaf.Env.CallInit();
  }
}
