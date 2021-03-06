String.prototype.wiFormat = function () {
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function (capture) {
        return args[capture.match(/\d+/)];
    });
};

if (!window.Wibiya) {
    // Create Wibiya object
    window.Wibiya = {};

    // Wibiya framework
    Wibiya.framework = {
        events:{
            documentIsReady:false,
            documentReadyHandler:function (fn) {
                if (!Wibiya.framework.events.documentIsReady) {
                    Wibiya.framework.events.documentIsReady = true;
                    if (document.addEventListener) {
                        document.removeEventListener("DOMContentLoaded", function () {
                            Wibiya.framework.events.documentReadyHandler(fn);
                        }, false);
                    }
                    else if (document.attachEvent) {
                        if (document.readyState == "complete") {
                            document.detachEvent("onreadystatechange", function () {
                                Wibiya.framework.events.documentReadyHandler(fn);
                            });
                        }
                    }

                    fn();
                }
            },
            documentReady:function (fn) {
                // Mozilla, Opera and webkit nightlies currently support this event
                if (document.addEventListener) {
                    // Use the handy event callback
                    document.addEventListener("DOMContentLoaded", function () {
                        Wibiya.framework.events.documentReadyHandler(fn);
                    }, false);

                    // A fallback to window.onload, that will always work
                    window.addEventListener("load", function () {
                        Wibiya.framework.events.documentReadyHandler(fn);
                    }, false);

                    // If IE event model is used
                } else if (document.attachEvent) {
                    // ensure firing before onload,
                    // maybe late but safe also for iframes
                    document.attachEvent("onreadystatechange", function () {
                        Wibiya.framework.events.documentReadyHandler(fn);
                    });

                    // A fallback to window.onload, that will always work
                    window.attachEvent("onload", function () {
                        Wibiya.framework.events.documentReadyHandler(fn);
                    });

                    // If IE and not a frame
                    // continually check to see if the document is ready
                    var toplevel = false;

                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {
                    }

                    if (document.documentElement.doScroll && toplevel) {
                        Wibiya.framework.events.doScrollCheck(function () {
                            Wibiya.framework.events.documentReadyHandler(fn);
                        });
                    }
                }
            },
            doScrollCheck:function (fn) {
                if (Wibiya.framework.events.documentIsReady) {
                    return;
                }

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    document.documentElement.doScroll("left");
                } catch (error) {
                    window.setTimeout(function () {
                        Wibiya.framework.events.doScrollCheck(fn);
                    }, 1);
                    return;
                }

                fn();
            },
            bodyReadyTryCounter:0,
            bodyReady:function (fn) {
                var bodyRef = document.getElementsByTagName("body");
                if (bodyRef.length == 0) {
                    Wibiya.framework.events.bodyReadyTryCounter++;
                    if (Wibiya.framework.events.bodyReadyTryCounter <= 10) {
                        window.setTimeout(function () {
                            Wibiya.framework.events.bodyReady(fn);
                        }, 500);
                    }
                }
                else {
                    fn();
                }
            },
            libraryReady:function (fn) {
                if (!Wibiya.libraryReady) {
                    window.setTimeout(function () {
                        Wibiya.framework.events.libraryReady(fn)
                    }, 100);
                }
                else {
                    fn();
                }
            }
        },
        utils:{
            // Check if any of the elements in the array could be found inside a string
            // and return the array index of the matching element. return -1 if not found
            inArrayRegex:function (arr, str) {
                if (typeof(arr) == 'object' && arr.length) {
                    var regExp;
                    for (var i = 0; i < arr.length; i++) {
                        regExp = new RegExp(arr[i], "i");
                        if (regExp.test(str)) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            // attach a file to tag
            attachFile:function (fileref, toTagName) {
                document.getElementsByTagName(toTagName)[0].appendChild(fileref);
            },
            // attach a js to tag
            attachJs:function (url, toTagName) {
                var fileref = document.createElement("script");
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", url);
                Wibiya.framework.utils.attachFile(fileref, toTagName);
            },
            // attach a css to tag
            attachCss:function (url, toTagName) {
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", url);
                Wibiya.framework.utils.attachFile(fileref, toTagName);
            },
            // Get a query param by it's given name
            getQueryParam:function (name) {
                var p, params = new Array(), qString = window.location.search.substring(1).split("&");
                for (var i = 0; i < qString.length; i++) {
                    p = qString[i].split("=");
                    params[p[0]] = p[1];
                }
                return params[name] || '';
            },
            // Check if the url contains the specified hashtag
            hasHashTag:function (name) {
                return RegExp("#" + name).test(window.location.hash);
            },
            // Check if the browser is IE6
            isIE6:function () {
                var bmatch = /(msie) ([\w.]+)/i.exec(navigator.userAgent) || [];
                return bmatch.length > 1 && parseInt(bmatch[2]) == 6;
            },
            setCookie:function (c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = c_name + "=" + c_value;
            },
            getCookie:function (c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
                return null;
            }
        },
        analytics:{
            // The stats server url
            loadUrlFormat:"http://wstat.wibiya.com/{0}.jpg?t={1}",
            // Types of different loads (impressions)
            loadType:{
                // Toolbar load
                toolbar:'t',
                // Unsupported mobile load
                mobile:'m',
                // Iphone wibiya bar load
                mobileLive:'ml'
            },
            // Set a load (impression) for a container
            setLoad:function (loadType, containerId) {
                var img = new Image(1, 1);
                img.src = Wibiya.framework.analytics.loadUrlFormat.wiFormat(loadType, containerId);
            }
        }
    };

    // Load all wibiya containers to the page
    Wibiya.loadContainers = function () {
        if (Wibiya.data.mobileAgent) {
            if (Wibiya.data.mobileAgent == 'iphone' && Wibiya.data.containers.iphone != '') {
                Wibiya.framework.utils.attachJs(Wibiya.data.containers.iphone, "body");
            }
            else {
                Wibiya.framework.analytics.setLoad(Wibiya.framework.analytics.loadType.mobile, Wibiya.data.site.id);
            }
        }
        else {
            if (Wibiya.data.containers.toolbar != '') {
                Wibiya.framework.utils.attachJs(Wibiya.data.containers.toolbar, "body");
            }

            if (Wibiya.data.containers.box != '') {
                Wibiya.framework.utils.attachJs(Wibiya.data.containers.box, "body");
            }

            Wibiya.framework.utils.getAttributes = function(obj){
    var attr = "", _attrList = ["height","width","classid"];
    for(var i=0;i<obj.attributes.length;i++){
        if($wibilib.inArray(obj.attributes[i].name, _attrList) > -1){
            attr += ' ' + obj.attributes[i].name + '="' + obj.attributes[i].value + '"';
        }
    }
    return attr;
};

Wibiya.framework.utils.getParams = function(obj){
    var _paramAttr, _newParams = "", _params = $wibilib(obj).children("param");
    $wibilib.each(_params, function(i){
        _paramAttr = "";
        for(var j=0;j<_params[i].attributes.length;j++){
            _paramAttr += ' ' + _params[i].attributes[j].name + '="' + _params[i].attributes[j].value + '"';
        }
        _newParams += "<param" + _paramAttr + "/>";
    });
    var _embedAttr = "", _embed = $wibilib(obj).children("embed");
    if(_embed.length > 0){
        for(var i=0;i<_embed[0].attributes.length;i++){
            _embedAttr+= ' ' + _embed[0].attributes[i].name + '="' + _embed[0].attributes[i].value + '"';
        }
    }

    return _newParams+"<embed " +_embedAttr + "></embed>";
};

Wibiya.framework.utils.flashFix = function(){
    var _embed, _oldEmbeds = $wibilib("embed[wmode!=\"opaque\"][wmode!=\"transparent\"]");
    $wibilib.each(_oldEmbeds,function(i){
        _embed = $wibilib(_oldEmbeds[i]).clone();
        _embed.attr("wmode","opaque");
        $wibilib(_oldEmbeds[i]).after(_embed);
        $wibilib(_oldEmbeds[i]).remove();
    });

    if($wibilib.browser.msie || $wibilib.browser.safari){
        var _params, _objects = $wibilib("object");
        $wibilib.each(_objects, function(i){
            _params = $wibilib(_objects[i]).children('param[name="wmode"]');
            if(_params.length===0){
                $wibilib(_objects[i]).after('<object ' + Wibiya.framework.utils.getAttributes(_objects[i]) + '>' + Wibiya.framework.utils.getParams(_objects[i]) + '<param name="wmode" value="opaque" />' + '</object>');
                $wibilib(_objects[i]).remove();
            }
            else if(_params.val().toLowerCase() == "window"){
                $wibilib(_objects[i]).after('<object ' + Wibiya.framework.utils.getAttributes(_objects[i]) + '>' + $wibilib(_objects[i]).html().toLowerCase().replace('window', 'opaque') + '</object>');
                $wibilib(_objects[i]).remove();
            }
        });
    }

    Wibiya.options.flashFixRetries++;
    if(Wibiya.options.flashFixRetries>=3){
        window.clearInterval(Wibiya.options.flashFixInterval);
    }
};


Wibiya.framework.utils.flashFixInit = function(){
    Wibiya.framework.utils.flashFix();
    Wibiya.options.flashFixInterval = window.setInterval(Wibiya.framework.utils.flashFix, 3333);
}

Wibiya.options.flashFixRetries = 0;
Wibiya.framework.events.libraryReady(Wibiya.framework.utils.flashFixInit);
        }
    };

    // Init wibiya loading proccess
    Wibiya.init = function () {

        //if noredirectday set cookie no redirect for one day
        if (Wibiya.framework.utils.getQueryParam("noredirectday") != '') {
            Wibiya.framework.utils.setCookie("noredirectday", 'noredirect', 1);
        }

        var noRedirectDaily = Wibiya.framework.utils.getCookie('noredirectday') !== null;
        Wibiya.options.noRedirect = (Wibiya.framework.utils.getQueryParam("noredirect") != '' || Wibiya.framework.utils.hasHashTag("noredirect") || noRedirectDaily);


        // if prevent load or run mode set to hide and not overriden by showbar param - exit
        if (Wibiya.options.preventLoad || (Wibiya.options.runMode == 'hidden' && Wibiya.framework.utils.getQueryParam('showbar') == '')) {
            return;
        }

        // If the run mode set to debug and widebug param does not exists - exit
        if (Wibiya.options.runMode == 'debug' && Wibiya.framework.utils.getQueryParam('widebug') == '') {
            return;
        }

        var mobileDevice = false, mobileDeviceIndex;
        mobileDeviceIndex = Wibiya.framework.utils.inArrayRegex(Wibiya.options.mobileDevices.supported, navigator.userAgent);
        if (mobileDeviceIndex > -1) {
            mobileDevice = 1;
            Wibiya.data.mobileAgent = Wibiya.options.mobileDevices.supported[mobileDeviceIndex];
        }
        else {
            mobileDeviceIndex = Wibiya.framework.utils.inArrayRegex(Wibiya.options.mobileDevices.notSupported, navigator.userAgent);
            if (mobileDeviceIndex > -1) {
                mobileDevice = 0;
                Wibiya.data.mobileAgent = Wibiya.options.mobileDevices.supported[mobileDeviceIndex];
            }
        }

        // Redirect to mobile site
        if (Wibiya.options.hasMobile && mobileDevice === 1 && Wibiya.options.mobileUrl && !Wibiya.options.noRedirect) {
            var url = window.location.href != Wibiya.data.site.pages.main ? window.location.href : '';
            window.location.href = Wibiya.options.mobileUrlFormat.wiFormat(Wibiya.options.mobileUrl, url, Wibiya.data.site.cms);
        }

        // if unsupported mobile device - set mobile load and exit 
        if (mobileDevice === 0) {
            Wibiya.framework.analytics.setLoad(Wibiya.framework.analytics.loadType.mobile, Wibiya.data.siteId);
            return;
        }

        // if IE6 - exit
        if (Wibiya.framework.utils.isIE6()) {
            return;
        }

        if (Wibiya.options.loadOnDocumentReady) {
            Wibiya.framework.events.documentReady(Wibiya.loadContainers);
        }
        else {
            Wibiya.framework.events.bodyReady(Wibiya.loadContainers);
        }
    };

    // Create or extend wibiya options
    Wibiya.options = window.wibiya_options || {};

    // Determine if to prevent loading containers
    Wibiya.options.preventLoad = Wibiya.options.preventLoad || false;

    // Determine if to supress redirect (default = false)
    Wibiya.options.noRedirect = Wibiya.options.noRedirect || false;

    // Decide if to load the containers after the document is ready or before (when the body is ready)
    Wibiya.options.loadOnDocumentReady = true;

    // Determine if the site has a mobile version
    Wibiya.options.hasMobile = false;

    // Set the mobile version url, set to empty when there is no mobile site
    Wibiya.options.mobileUrl = '';
    Wibiya.options.mobileUrlFormat = "{0}?url={1}&cms={2}&timestamp=1334060720";

    // Determine the run mode (debug, hide, etc.)
    Wibiya.options.runMode = 'standard';

    // List of supported and unsupported mobile devices
    Wibiya.options.mobileDevices = {
        supported:["iphone", "android", "ipod", "windows phone"],
        notSupported:["windows ce", "ipad", "series60", "symbian", "palm", "avantgo", "docomo", "vodafone", "j-phone", "xv6850", "lg;", "lge", "mot", "nintendo", "blackberry", "nokia", "samsung", "sonyericsson"]
    };


    // Data on the wibiya site
    Wibiya.data = {
        userId:50421,
        containers:{
            toolbar:'http://cdn.wibiya.com/Toolbars/dir_0233/Toolbar_233701/toolbar_233701_4f8426b08d97e.js',
            iphone:'',
            box:''
        },
        site:{
            id:233701,
            cms:'',
            pages:{
                main:'http://www.jpost.com',
                filter:null
            }
        }
    };

    Wibiya.init();
}

//Stuff for backwards compatibility
window.loadjscssfile = function (filename, filetype, where) {
    switch (filetype) {
        case 'js':
            Wibiya.framework.utils.attachJs(filename, where);
            break;
        case 'css':
            Wibiya.framework.utils.attachCss(filename, where);
            break;
    }
};

window.getQueryParam = function (name) {
    return Wibiya.framework.utils.getQueryParam(name);
};

window.wibiyaToolbar = {};
wibiyaToolbar.id = 233701;
wibiyaToolbar.referrer = document.referrer;
wibiyaToolbar.framework = {};
window.WIBIYA = {
    Mobile:{}
};