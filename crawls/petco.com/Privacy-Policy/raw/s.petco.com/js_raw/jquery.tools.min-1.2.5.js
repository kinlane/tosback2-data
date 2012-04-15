﻿/*
* jQuery Tools 1.2.5 - The missing UI library for the Web
* 
* [tabs, tooltip, overlay, scrollable]
* 
* NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
* 
* http://flowplayer.org/tools/
* 
* File generated: Wed Sep 22 06:12:55 GMT 2010
*/
(function (c) {
    function p(d, b, a) {
        var e = this, l = d.add(this), h = d.find(a.tabs), i = b.jquery ? b : d.children(b), j; h.length || (h = d.children()); i.length || (i = d.parent().find(b)); i.length || (i = c(b)); c.extend(this, { click: function (f, g) {
            var k = h.eq(f); if (typeof f == "string" && f.replace("#", "")) { k = h.filter("[href*=" + f.replace("#", "") + "]"); f = Math.max(h.index(k), 0) } if (a.rotate) { var n = h.length - 1; if (f < 0) return e.click(n, g); if (f > n) return e.click(0, g) } if (!k.length) { if (j >= 0) return e; f = a.initialIndex; k = h.eq(f) } if (f === j) return e;
            g = g || c.Event(); g.type = "onBeforeClick"; l.trigger(g, [f]); if (!g.isDefaultPrevented()) { o[a.effect].call(e, f, function () { g.type = "onClick"; l.trigger(g, [f]) }); j = f; h.removeClass(a.current); k.addClass(a.current); return e } 
        }, getConf: function () { return a }, getTabs: function () { return h }, getPanes: function () { return i }, getCurrentPane: function () { return i.eq(j) }, getCurrentTab: function () { return h.eq(j) }, getIndex: function () { return j }, next: function () { return e.click(j + 1) }, prev: function () { return e.click(j - 1) }, destroy: function () {
            h.unbind(a.event).removeClass(a.current);
            i.find("a[href^=#]").unbind("click.T"); return e
        } 
        }); c.each("onBeforeClick,onClick".split(","), function (f, g) { c.isFunction(a[g]) && c(e).bind(g, a[g]); e[g] = function (k) { k && c(e).bind(g, k); return e } }); if (a.history && c.fn.history) { c.tools.history.init(h); a.event = "history" } h.each(function (f) { c(this).bind(a.event, function (g) { e.click(f, g); return g.preventDefault() }) }); i.find("a[href^=#]").bind("click.T", function (f) { e.click(c(this).attr("href"), f) }); if (location.hash && a.tabs == "a" && d.find("[href=" + location.hash + "]").length) e.click(location.hash);
        else if (a.initialIndex === 0 || a.initialIndex > 0) e.click(a.initialIndex)
    } c.tools = c.tools || { version: "1.2.5" }; c.tools.tabs = { conf: { tabs: "a", current: "current", onBeforeClick: null, onClick: null, effect: "default", initialIndex: 0, event: "click", rotate: false, history: false }, addEffect: function (d, b) { o[d] = b } }; var o = { "default": function (d, b) { this.getPanes().hide().eq(d).show(); b.call() }, fade: function (d, b) { var a = this.getConf(), e = a.fadeOutSpeed, l = this.getPanes(); e ? l.fadeOut(e) : l.hide(); l.eq(d).fadeIn(a.fadeInSpeed, b) }, slide: function (d,
b) { this.getPanes().slideUp(200); this.getPanes().eq(d).slideDown(400, b) }, ajax: function (d, b) { this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"), b) } 
    }, m; c.tools.tabs.addEffect("horizontal", function (d, b) { m || (m = this.getPanes().eq(0).width()); this.getCurrentPane().animate({ width: 0 }, function () { c(this).hide() }); this.getPanes().eq(d).animate({ width: m }, function () { c(this).show(); b.call() }) }); c.fn.tabs = function (d, b) {
        var a = this.data("tabs"); if (a) { a.destroy(); this.removeData("tabs") } if (c.isFunction(b)) b =
{ onBeforeClick: b }; b = c.extend({}, c.tools.tabs.conf, b); this.each(function () { a = new p(c(this), d, b); c(this).data("tabs", a) }); return b.api ? a : this
    } 
})(jQuery);
(function (f) {
    function p(a, b, c) { var h = c.relative ? a.position().top : a.offset().top, d = c.relative ? a.position().left : a.offset().left, i = c.position[0]; h -= b.outerHeight() - c.offset[0]; d += a.outerWidth() + c.offset[1]; if (/iPad/i.test(navigator.userAgent)) h -= f(window).scrollTop(); var j = b.outerHeight() + a.outerHeight(); if (i == "center") h += j / 2; if (i == "bottom") h += j; i = c.position[1]; a = b.outerWidth() + a.outerWidth(); if (i == "center") d -= a / 2; if (i == "left") d -= a; return { top: h, left: d} } function u(a, b) {
        var c = this, h = a.add(c), d, i = 0, j =
0, m = a.attr("title"), q = a.attr("data-tooltip"), r = o[b.effect], l, s = a.is(":input"), v = s && a.is(":checkbox, :radio, select, :button, :submit"), t = a.attr("type"), k = b.events[t] || b.events[s ? v ? "widget" : "input" : "def"]; if (!r) throw 'Nonexistent effect "' + b.effect + '"'; k = k.split(/,\s*/); if (k.length != 2) throw "Tooltip: bad events configuration for " + t; a.bind(k[0], function (e) { clearTimeout(i); if (b.predelay) j = setTimeout(function () { c.show(e) }, b.predelay); else c.show(e) }).bind(k[1], function (e) {
    clearTimeout(j); if (b.delay) i =
setTimeout(function () { c.hide(e) }, b.delay); else c.hide(e)
}); if (m && b.cancelDefault) { a.removeAttr("title"); a.data("title", m) } f.extend(c, { show: function (e) {
    if (!d) { if (q) d = f(q); else if (b.tip) d = f(b.tip).eq(0); else if (m) d = f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m); else { d = a.next(); d.length || (d = a.parent().next()) } if (!d.length) throw "Cannot find tooltip for " + a; } if (c.isShown()) return c; d.stop(true, true); var g = p(a, d, b); b.tip && d.html(a.data("title")); e = e || f.Event(); e.type = "onBeforeShow";
    h.trigger(e, [g]); if (e.isDefaultPrevented()) return c; g = p(a, d, b); d.css({ position: "absolute", top: g.top, left: g.left }); l = true; r[0].call(c, function () { e.type = "onShow"; l = "full"; h.trigger(e) }); g = b.events.tooltip.split(/,\s*/); if (!d.data("__set")) { d.bind(g[0], function () { clearTimeout(i); clearTimeout(j) }); g[1] && !a.is("input:not(:checkbox, :radio), textarea") && d.bind(g[1], function (n) { n.relatedTarget != a[0] && a.trigger(k[1].split(" ")[0]) }); d.data("__set", true) } return c
}, hide: function (e) {
    if (!d || !c.isShown()) return c;
    e = e || f.Event(); e.type = "onBeforeHide"; h.trigger(e); if (!e.isDefaultPrevented()) { l = false; o[b.effect][1].call(c, function () { e.type = "onHide"; h.trigger(e) }); return c } 
}, isShown: function (e) { return e ? l == "full" : l }, getConf: function () { return b }, getTip: function () { return d }, getTrigger: function () { return a } 
}); f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (e, g) { f.isFunction(b[g]) && f(c).bind(g, b[g]); c[g] = function (n) { n && f(c).bind(g, n); return c } })
    } f.tools = f.tools || { version: "1.2.5" }; f.tools.tooltip =
{ conf: { effect: "toggle", fadeOutSpeed: "fast", predelay: 0, delay: 30, opacity: 1, tip: 0, position: ["top", "center"], offset: [0, 0], relative: false, cancelDefault: true, events: { def: "mouseenter,mouseleave", input: "focus,blur", widget: "focus mouseenter,blur mouseleave", tooltip: "mouseenter,mouseleave" }, layout: "<div/>", tipClass: "tooltip" }, addEffect: function (a, b, c) { o[a] = [b, c] } }; var o = { toggle: [function (a) { var b = this.getConf(), c = this.getTip(); b = b.opacity; b < 1 && c.css({ opacity: b }); c.show(); a.call() }, function (a) {
    this.getTip().hide();
    a.call()
} ], fade: [function (a) { var b = this.getConf(); this.getTip().fadeTo(b.fadeInSpeed, b.opacity, a) }, function (a) { this.getTip().fadeOut(this.getConf().fadeOutSpeed, a) } ]
}; f.fn.tooltip = function (a) { var b = this.data("tooltip"); if (b) return b; a = f.extend(true, {}, f.tools.tooltip.conf, a); if (typeof a.position == "string") a.position = a.position.split(/,?\s/); this.each(function () { b = new u(f(this), a); f(this).data("tooltip", b) }); return a.api ? b : this } 
})(jQuery);
(function (a) {
    function t(d, b) {
        var c = this, j = d.add(c), o = a(window), k, f, m, g = a.tools.expose && (b.mask || b.expose), n = Math.random().toString().slice(10); if (g) { if (typeof g == "string") g = { color: g }; g.closeOnClick = g.closeOnEsc = false } var p = b.target || d.attr("rel"); f = p ? a(p) : d; if (!f.length) throw "Could not find Overlay: " + p; d && d.index(f) == -1 && d.click(function (e) { c.load(e); return e.preventDefault() }); a.extend(c, { load: function (e) {
            if (c.isOpened()) return c; var h = q[b.effect]; if (!h) throw 'Overlay: cannot find effect : "' + b.effect +
'"'; b.oneInstance && a.each(s, function () { this.close(e) }); e = e || a.Event(); e.type = "onBeforeLoad"; j.trigger(e); if (e.isDefaultPrevented()) return c; m = true; g && a(f).expose(g); var i = b.top, r = b.left, u = f.outerWidth({ margin: true }), v = f.outerHeight({ margin: true }); if (typeof i == "string") i = i == "center" ? Math.max((o.height() - v) / 2, 0) : parseInt(i, 10) / 100 * o.height(); if (r == "center") r = Math.max((o.width() - u) / 2, 0); h[0].call(c, { top: i, left: r }, function () { if (m) { e.type = "onLoad"; j.trigger(e) } }); g && b.closeOnClick && a.mask.getMask().one("click",
c.close); b.closeOnClick && a(document).bind("click." + n, function (l) { a(l.target).parents(f).length || c.close(l) }); b.closeOnEsc && a(document).bind("keydown." + n, function (l) { l.keyCode == 27 && c.close(l) }); return c
        }, close: function (e) { if (!c.isOpened()) return c; e = e || a.Event(); e.type = "onBeforeClose"; j.trigger(e); if (!e.isDefaultPrevented()) { m = false; q[b.effect][1].call(c, function () { e.type = "onClose"; j.trigger(e) }); a(document).unbind("click." + n).unbind("keydown." + n); g && a.mask.close(); return c } }, getOverlay: function () { return f },
            getTrigger: function () { return d }, getClosers: function () { return k }, isOpened: function () { return m }, getConf: function () { return b } 
        }); a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (e, h) { a.isFunction(b[h]) && a(c).bind(h, b[h]); c[h] = function (i) { i && a(c).bind(h, i); return c } }); k = f.find(b.close || ".close"); if (!k.length && !b.close) { k = a('<a class="close"></a>'); f.prepend(k) } k.click(function (e) { c.close(e) }); b.load && c.load()
    } a.tools = a.tools || { version: "1.2.5" }; a.tools.overlay = { addEffect: function (d,
b, c) { q[d] = [b, c] }, conf: { close: null, closeOnClick: true, closeOnEsc: true, closeSpeed: "fast", effect: "default", fixed: !a.browser.msie || a.browser.version > 6, left: "center", load: false, mask: null, oneInstance: true, speed: "normal", target: null, top: "10%"}
    }; var s = [], q = {}; a.tools.overlay.addEffect("default", function (d, b) { var c = this.getConf(), j = a(window); if (!c.fixed) { d.top += j.scrollTop(); d.left += j.scrollLeft() } d.position = c.fixed ? "fixed" : "absolute"; this.getOverlay().css(d).fadeIn(c.speed, b) }, function (d) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)
    }); a.fn.overlay = function (d) { var b = this.data("overlay"); if (b) return b; if (a.isFunction(d)) d = { onBeforeLoad: d }; d = a.extend(true, {}, a.tools.overlay.conf, d); this.each(function () { b = new t(a(this), d); s.push(b); a(this).data("overlay", b) }); return d.api ? b : this } 
})(jQuery);
(function (e) {
    function p(f, c) { var b = e(c); return b.length < 2 ? b : f.parent().find(c) } function u(f, c) {
        var b = this, n = f.add(b), g = f.children(), l = 0, j = c.vertical; k || (k = b); if (g.length > 1) g = e(c.items, f); e.extend(b, { getConf: function () { return c }, getIndex: function () { return l }, getSize: function () { return b.getItems().size() }, getNaviButtons: function () { return o.add(q) }, getRoot: function () { return f }, getItemWrap: function () { return g }, getItems: function () { return g.children(c.item).not("." + c.clonedClass) }, move: function (a, d) {
            return b.seekTo(l +
a, d)
        }, next: function (a) { return b.move(1, a) }, prev: function (a) { return b.move(-1, a) }, begin: function (a) { return b.seekTo(0, a) }, end: function (a) { return b.seekTo(b.getSize() - 1, a) }, focus: function () { return k = b }, addItem: function (a) { a = e(a); if (c.circular) { g.children("." + c.clonedClass + ":last").before(a); g.children("." + c.clonedClass + ":first").replaceWith(a.clone().addClass(c.clonedClass)) } else g.append(a); n.trigger("onAddItem", [a]); return b }, seekTo: function (a, d, h) {
            a.jquery || (a *= 1); if (c.circular && a === 0 && l == -1 && d !==
0) return b; if (!c.circular && a < 0 || a > b.getSize() || a < -1) return b; var i = a; if (a.jquery) a = b.getItems().index(a); else i = b.getItems().eq(a); var r = e.Event("onBeforeSeek"); if (!h) { n.trigger(r, [a, d]); if (r.isDefaultPrevented() || !i.length) return b } i = j ? { top: -i.position().top} : { left: -i.position().left }; l = a; k = b; if (d === undefined) d = c.speed; g.animate(i, d, c.easing, h || function () { n.trigger("onSeek", [a]) }); return b
        } 
        }); e.each(["onBeforeSeek", "onSeek", "onAddItem"], function (a, d) {
            e.isFunction(c[d]) && e(b).bind(d, c[d]); b[d] = function (h) {
                h &&
e(b).bind(d, h); return b
            } 
        }); if (c.circular) { var s = b.getItems().slice(-1).clone().prependTo(g), t = b.getItems().eq(1).clone().appendTo(g); s.add(t).addClass(c.clonedClass); b.onBeforeSeek(function (a, d, h) { if (!a.isDefaultPrevented()) if (d == -1) { b.seekTo(s, h, function () { b.end(0) }); return a.preventDefault() } else d == b.getSize() && b.seekTo(t, h, function () { b.begin(0) }) }); b.seekTo(0, 0, function () { }) } var o = p(f, c.prev).click(function () { b.prev() }), q = p(f, c.next).click(function () { b.next() }); if (!c.circular && b.getSize() > 1) {
            b.onBeforeSeek(function (a,
d) { setTimeout(function () { if (!a.isDefaultPrevented()) { o.toggleClass(c.disabledClass, d <= 0); q.toggleClass(c.disabledClass, d >= b.getSize() - 1) } }, 1) }); c.initialIndex || o.addClass(c.disabledClass)
        } c.mousewheel && e.fn.mousewheel && f.mousewheel(function (a, d) { if (c.mousewheel) { b.move(d < 0 ? 1 : -1, c.wheelSpeed || 50); return false } }); if (c.touch) {
            var m = {}; g[0].ontouchstart = function (a) { a = a.touches[0]; m.x = a.clientX; m.y = a.clientY }; g[0].ontouchmove = function (a) {
                if (a.touches.length == 1 && !g.is(":animated")) {
                    var d = a.touches[0], h =
m.x - d.clientX; d = m.y - d.clientY; b[j && d > 0 || !j && h > 0 ? "next" : "prev"](); a.preventDefault()
                } 
            } 
        } c.keyboard && e(document).bind("keydown.scrollable", function (a) { if (!(!c.keyboard || a.altKey || a.ctrlKey || e(a.target).is(":input"))) if (!(c.keyboard != "static" && k != b)) { var d = a.keyCode; if (j && (d == 38 || d == 40)) { b.move(d == 38 ? -1 : 1); return a.preventDefault() } if (!j && (d == 37 || d == 39)) { b.move(d == 37 ? -1 : 1); return a.preventDefault() } } }); c.initialIndex && b.seekTo(c.initialIndex, 0, function () { })
    } e.tools = e.tools || { version: "1.2.5" }; e.tools.scrollable =
{ conf: { activeClass: "active", circular: false, clonedClass: "cloned", disabledClass: "disabled", easing: "swing", initialIndex: 0, item: null, items: ".items", keyboard: true, mousewheel: false, next: ".next", prev: ".prev", speed: 400, vertical: false, touch: true, wheelSpeed: 0} }; var k; e.fn.scrollable = function (f) { var c = this.data("scrollable"); if (c) return c; f = e.extend({}, e.tools.scrollable.conf, f); this.each(function () { c = new u(e(this), f); e(this).data("scrollable", c) }); return f.api ? c : this } 
})(jQuery);