/**
* JB.StartNavigation Function.
* This function starts all the tricks and coolness of the main navigation.
* @function JB.StartNavigation
* @param {String} selector The id or class selector of the primary nav. Example: "#jb-primary-links"
* @require
*/

JB.StartNavigation = function (selector) {
    var options = {
        speed: 330,
        delay: 660
    };
    var jQueryprimaryNav = jQuery(selector);
    jQueryprimaryNav.items = jQueryprimaryNav.children("li");
    jQuerysubNavBlind = jQuery("#jb-backdrop");
    jQuerysubNavBlind.isOpen = false;

    jQueryprimaryNav.items.hover(function (e) {
        if (!(!!(jQuery(this).addClass("hover").has("div.jb-secondary-links").addClass("active").length)) || (jQuerysubNavBlind.queue().length > 2)) return;
        var jQueryitem = jQuery(this).children("div.jb-secondary-links");
        if (jQuerysubNavBlind.isOpen) {
            clearTimeout(jQuerysubNavBlind.closeTimeout);
            if (jQueryitem.queue().length < 2) jQueryitem.fadeIn(options.speed);
            return;
        }
        jQuerysubNavBlind.openTimeout = setTimeout(function () {
            jQuerysubNavBlind.slideDown(options.speed, function () {
                jQueryitem.fadeIn(options.speed);
                jQuerysubNavBlind.isOpen = true;
            });
        }, options.delay);
    }, function (e) {
        if (jQuerysubNavBlind.openTimeout) clearTimeout(jQuerysubNavBlind.openTimeout);
        if (!(!!(jQuery(this).removeClass("hover").has("div.jb-secondary-links").removeClass("active").length)) || (jQuerysubNavBlind.queue().length > 2)) return;
        var jQueryitem = jQuery(this).children("div.jb-secondary-links");
        if (jQuerysubNavBlind.isOpen) {
            clearTimeout(jQuerysubNavBlind.openTimeout);
            if (jQueryitem.queue().length < 2) jQueryitem.fadeOut(options.speed);
        }
        jQuerysubNavBlind.closeTimeout = setTimeout(function () {
            jQueryitem.fadeOut(options.speed);
            jQuerysubNavBlind.slideUp(options.speed, function () {
                jQuerysubNavBlind.isOpen = false;
            });
        }, options.delay);
    });
};


JB.StartStickyNav = function (selector) {
    var jQueryel = jQuery(selector),
			pageNav = jQuery('#page-nav'),
			sectionDropdown = jQueryel.find('div.section-dropdown');
    var top = jQueryel.offset().top;
    jQuery(window).bind('scroll', function () {
        var yPos = jQuery(this).scrollTop();
        if (yPos >= top) {
            jQuery('body').addClass('fixed-nav-enabled');
        } else {
            jQuery('body').removeClass('fixed-nav-enabled');
        }
    });
    jQuery('#back-to-top').bind('click', function () {
        var scrollTarget = jQuery(this).attr('href');
        jQuery.scrollTo(scrollTarget, 510);
        return false;
    });

    if (pageNav.length) {
        pageNav.find('a').bind('click', function () {
            var scrollTarget = jQuery(this).attr('href'),
					offsetValue;
            if (jQuery('body').hasClass('reset-offset')) {
                var bodyClass = jQuery('body').attr('class');
                var offsetValue = parseInt('-' + (bodyClass.match(/[\d\.]+/g)));
            } else {
                var offsetValue = -140;
            }
            if (jQuery('body').hasClass('fixed-nav-enabled')) {
                if (jQuery(this).parent().index() > 0) {
                    jQuery.scrollTo(scrollTarget, 510, { offset: { top: offsetValue} });
                } else {
                    jQuery.scrollTo(scrollTarget, 510, { offset: { top: (offsetValue + 18)} });
                }
            } else {
                jQuery.scrollTo(scrollTarget, 510, { offset: { top: (offsetValue)} });
            }
            return false;
        });
    }
    if (sectionDropdown.hasClass('also-jumplinks')) {
        sectionDropdown.find('a').bind('click', function () {
            var scrollTarget = jQuery(this).attr('href'),
					offsetValue;
            if (jQuery('body').hasClass('reset-offset')) {
                var bodyClass = jQuery('body').attr('class');
                var offsetValue = parseInt('-' + (bodyClass.match(/[\d\.]+/g)));
            } else {
                var offsetValue = -140;
            }
            jQuery.scrollTo(scrollTarget, 510, { offset: { top: offsetValue} });
            sectionDropdown.children('div.section-nav').hide();
            return false;
        });
    }
    if (sectionDropdown.length) {
        sectionDropdown.children('h5').bind('click', function (e) {
            jQueryel = jQuery(e.target);

            jQuery(this).siblings('div.section-nav').show();
            sectionDropdown.offclick(function () {
              jQueryel.siblings('div.section-nav').hide();
            }, true);
            return false;
        });
    }
};


/**
* JetBlue Ready Function.
* This function executes all the necessary javascript to start the site.
* @function JB.Ready
*/

JB.Ready = function () {
    JB.Config.debug = true;
    JB.Session.countryCode = "cUS";
    JB.Session.isBrowser = JB.Fn.getIsBrowserMatrix(); // Stores Browser Check in Session (for IE browser check purpose.)

    JB.Fn.getAllPageDimensions(); // Set Page Dimensions in Session
    JB.StartNavigation("#jb-primary-links"); // Start Navigation Event Handlers

    try {
        if (JB.Session.isBrowser.isIE) jQuery("input[placeholder]").onFocusClear();
    } catch (err) {}

    // Jump Link
    if (!!jQuery("a.scrollingjumplink").length) {
        jQuery("a.scrollingjumplink").bind('click', function () {
            var scrollTarget = jQuery(this).attr('href');
            jQuery.scrollTo(scrollTarget, 510, { offset: { top: -110} });
            return false;
        });
    }

    JB.Session.sizer = {
        countTotal: 1,
        countCurrent: 2
    };
    // Please do not stack window resize event handlers, as all functions will be triggered.
    jQuery(window).resize(function () {
        JB.Session.sizer.countTotal += 1;
        var resizeDelay = function () {
            if (JB.Session.sizer.countCurrent >= JB.Session.sizer.countTotal) {
                JB.Fn.getAllPageDimensions();
                JB.Session.sizer.countTotal = 1;
                JB.Session.sizer.countCurrent = 2;
            } else {
                JB.Session.sizer.countCurrent += 1;
            }
        };
        setTimeout(resizeDelay, 500);
    });

    // Smart Init
    jQuery("body div[id], body a[id]").each(function (i, el) {
        switch (el.id) {
            case "sticky-nav":
                JB.StartStickyNav("#sticky-nav"); // Start Sticky Nav
                break;
            case "tooltip-pick-me-up":
                jQuery("#tooltip-pick-me-up").tooltip();
//                new JB.Class.Modal({
//                    openTogglers: "#tooltip-pick-me-up",
//                    url: "/partials/modal.pick-me-up.html",
//                    onLoad: function (e, instance) {
//                        var jQuerymodal = instance.modal;
//                    }
//                });
                break;
            case "tooltip-confirmation-num":
                jQuery('#tooltip-confirmation-num').tooltip();
                break;
            case "trueblue":
                new JB.Class.TrueBlue('#trueblue', {});
                break;
            case "booker":
                new JB.Class.Booker("#booker", { countryCode: JB.Session.countryCode });
                break;
            case "booker-mini":
                JB.Session.miniBookerInstance = new JB.Class.Booker("#booker-mini", { mini: true, countryCode: JB.Session.countryCode });
                break;
            case "check-flight-status":
                new JB.Class.CheckFlightStatus("#check-flight-status");
                break;
            case "flights-timetable":
                new JB.Class.Timetable("#flights-timetable", { countryCode: JB.Session.countryCode });
                break;
            case "getaways-cities-list":
                jQuery("#getaways-cities-list").find("p.expander span").bind("click", function () {
                    var jQuerytarget = jQuery(this);
                    var jQuerymoreCities = jQuerytarget.closest("#getaways-cities-list");
                    if (jQuerymoreCities.hasClass("hide-cities")) jQuerytarget.text("Show fewer cities");
                    else jQuerytarget.text("Show more cities");
                    jQuerymoreCities.toggleClass("hide-cities");
                });
                break;
            /*case "group-submission-form":
            var jQuerygroupTravelForm = jQuery("#group-submission-form form");
            jQuerygroupTravelForm.find("select, input").enhance({classNamePrefix: "jb"});
            // Adding a custom phone number validation method to the validator.
            jQuery.validator.addMethod("phoneUS", function(phone_number, element){
            phone_number = phone_number.replace(/\s+/g, ""); 
            return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}jQuery/);
            }, "Please specify a valid phone number");
            // Form Validation
            jQuerygroupTravelForm.validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            focusInvalid: false,
            rules: {
            emailaddress: {
            required: true,
            email: true
            },
            fullname: {
            required: true
            },
            phonenumber: {
            required: true,
            phoneUS: true
            },
            organizationname: {
            required: true
            },
            grouptype: {
            required: true
            },
            numberoftravelers: {
            required: true
            },
            roundtriporoneway: {
            required: true
            },
            travelfrom: {
            required: true
            },
            outbounddate: {
            required: true,
            date: true
            },
            outbounddaytime: {
            required: true
            },
            destination: {
            required: true
            },
            returndate: {
            required: true,
            date: true
            },
            returndaytime: {
            required: true
            }
            },
            messages: {
            emailaddress: {
            required: "email required",
            email: "please enter valid email"
            },
            fullname: {
            required: "full name required"
            },
            phonenumber: {
            required: "phone number required",
            phoneUS: "please enter a valid phone number"
            },
            organizationname: {
            required: "organization name required"
            },
            grouptype: {
            required: "group type required"
            },
            numberoftravelers: {
            required: "number of travelers required"
            },
            roundtriporoneway: {
            required: "round trip or oneway required"
            },
            travelfrom: {
            required: "travel from required"
            },
            outbounddate: {
            required: "outbound date",
            date: "enter valid outbound date"
            },
            outbounddaytime: {
            required: "select outbound daytime"
            },
            destination: {
            required: "destinations required"
            },
            returndate: {
            required: "return date required",
            date: "please enter valid return date"
            },
            returndaytime: {
            required: "please select return daytime"
            }
            },
            showErrors: function(errorMap, errorList){
            if(!!(errorList.length)){
            var errors = "";
            for(var i = 0; i < errorList.length; i++){
            errors += errorList[i].message + "\n";
            }
            alert(errors);
            }
            },
            invalidHandler: function(form, validator){
            },
            submitHandler: function(form){
            }
            });
            break;*/ 
        }
    });

    if (!!jQuery("#container.flights-landing").length) new JB.Class.FaresBrowser("#container.flights-landing", { bookerInstance: JB.Session.miniBookerInstance });
};

JB.Ready();