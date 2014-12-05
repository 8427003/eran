(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require('./lib/zepto.js'),
    Touch = require('./module/Touch.js'),
    Slide = require('./module/Slide.js'),
    WXShare = require('./module/WXShare.js');

var slide = new Slide({
    targetElement: $('.page-wrap'),
    pageClassName: 'page'
});

var TouchCallback = {
    upTouchHandler: function() {
        if (slide.hasNextPage()) {
            slide.nextPage();
        }
    },
    downTouchHandler: function() {

        if (slide.hasPrevPage()) {
            slide.prevPage();
        }
    },
    moveTouchHandler: function() {}
}
new Touch({
    bindDom: 'body',
    callbacks: {
        up: TouchCallback.upTouchHandler,
        down: TouchCallback.downTouchHandler,
        move: TouchCallback.moveTouchHandler
    }
});

(function() {
    $(window).on('resize', resizeHandler());

    function resizeHandler() {
        var timer,
            doc = $('html'),
            win = $(window),
            MAX_WIDHT = 540;

        return function() {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(function() {
                var width = win.width();
                width = width > MAX_WIDHT ? MAX_WIDHT: width; 
                var scale = width / 320; 
                var fontSize = 16 * scale;
                doc.css('fontSize',fontSize + "px");
            }, 50);
        }
    }
    setTimeout(resizeHandler(),0);

}());


(function(silde){
    $('.g-arrow').on('click',function(){
        if(slide.hasNextPage()){
            slide.nextPage();
        }
    });
}(slide));

(function(){
    var wxshare = new WXShare({
        title:'#前台最大牌，邀你住酒店#去哪儿网携手暖男佟大为，女神柳岩为你提供贴心服务，名额有限，先到先得',
        img_url:'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141203/wxshare.jpg',
        img_width:200,
        img_height:200,
        link:window.location.href,
    });
    wxshare.init();
}());

},{"./lib/zepto.js":2,"./module/Slide.js":3,"./module/Touch.js":4,"./module/WXShare.js":5}],2:[function(require,module,exports){
var Zepto = function() {    function e(e) {        return null == e ? String(e) : V[$.call(e)] || "object"    }    function t(e) {        return "[object Function]" == $.call(e)    }    function n(e) {        return e instanceof Object    }    function r(e) {        return n(e) && e.__proto__ == Object.prototype    }    function i(e) {        return e instanceof Array    }    function s(e) {        return "number" == typeof e.length    }    function o(e) {        return L.call(e, function(e) {            return e !== w && null !== e        })    }    function u(e) {        return e.length > 0 ? S.fn.concat.apply([], e) : e    }    function a(e) {        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()    }    function f(e) {        return e in M ? M[e] : M[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")    }    function l(e, t) {        return "number" != typeof t || D[a(e)] ? t : t + "px"    }    function c(e) {        var t, n;        return O[e] || (t = A.createElement(e), A.body.appendChild(t), n = _(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), O[e] = n), O[e]    }    function h(e) {        return "children" in e ? k.call(e.children) : S.map(e.childNodes, function(e) {            return 1 == e.nodeType ? e : void 0        })    }    function p(e, t, n) {        for (E in t) n && r(t[E]) ? (r(e[E]) || (e[E] = {}), p(e[E], t[E], n)) : t[E] !== w && (e[E] = t[E])    }    function d(e, t) {        return t === w ? S(e) : S(e).filter(t)    }    function v(e, n, r, i) {        return t(n) ? n.call(e, r, i) : n    }    function m(e, t, n) {        null == n ? e.removeAttribute(t) : e.setAttribute(t, n)    }    function g(e, t) {        var n = e.className,            r = n && n.baseVal !== w;        return t === w ? r ? n.baseVal : n : (r ? n.baseVal = t : e.className = t, void 0)    }    function y(e) {        var t;        try {            return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? S.parseJSON(e) : e : t) : e        } catch (n) {            return e        }    }    function b(e, t) {        t(e);        for (var n in e.childNodes) b(e.childNodes[n], t)    }    var w, E, S, x, T, N, C = [],        k = C.slice,        L = C.filter,        A = window.document,        O = {},        M = {},        _ = A.defaultView.getComputedStyle,        D = {            "column-count": 1,            columns: 1,            "font-weight": 1,            "line-height": 1,            opacity: 1,            "z-index": 1,            zoom: 1        },        P = /^\s*<(\w+|!)[^>]*>/,        H = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,        B = /^(?:body|html)$/i,        j = ["val", "css", "html", "text", "data", "width", "height", "offset"],        F = ["after", "prepend", "before", "append"],        I = A.createElement("table"),        q = A.createElement("tr"),        R = {            tr: A.createElement("tbody"),            tbody: I,            thead: I,            tfoot: I,            td: q,            th: q,            "*": A.createElement("div")        },        U = /complete|loaded|interactive/,        z = /^\.([\w-]+)$/,        W = /^#([\w-]*)$/,        X = /^[\w-]+$/,        V = {},        $ = V.toString,        J = {},        K = A.createElement("div");    return J.matches = function(e, t) {        var n, r, i, s;        return e && 1 === e.nodeType ? (n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector) ? n.call(e, t) : (i = e.parentNode, s = !i, s && (i = K).appendChild(e), r = ~J.qsa(i, t).indexOf(e), s && K.removeChild(e), r) : !1    }, T = function(e) {        return e.replace(/-+(.)?/g, function(e, t) {            return t ? t.toUpperCase() : ""        })    }, N = function(e) {        return L.call(e, function(t, n) {            return e.indexOf(t) == n        })    }, J.fragment = function(e, t, n) {        e.replace && (e = e.replace(H, "<$1></$2>")), t === w && (t = P.test(e) && RegExp.$1), t in R || (t = "*");        var i, s, o = R[t];        return o.innerHTML = "" + e, s = S.each(k.call(o.childNodes), function() {            o.removeChild(this)        }), r(n) && (i = S(s), S.each(n, function(e, t) {            j.indexOf(e) > -1 ? i[e](t) : i.attr(e, t)        })), s    }, J.Z = function(e, t) {        return e = e || [], e.__proto__ = arguments.callee.prototype, e.selector = t || "", e    }, J.isZ = function(e) {        return e instanceof J.Z    }, J.init = function(e, s) {        if (e) {            if (t(e)) return S(A).ready(e);            if (J.isZ(e)) return e;            var u;            if (i(e)) u = o(e);            else if (n(e)) u = [r(e) ? S.extend({}, e) : e], e = null;            else if (P.test(e)) u = J.fragment(e.trim(), RegExp.$1, s), e = null;            else {                if (s !== w) return S(s).find(e);                u = J.qsa(A, e)            }            return J.Z(u, e)        }        return J.Z()    }, S = function(e, t) {        return J.init(e, t)    }, S.extend = function(e) {        var t, n = k.call(arguments, 1);        return "boolean" == typeof e && (t = e, e = n.shift()), n.forEach(function(n) {            p(e, n, t)        }), e    }, J.qsa = function(e, t) {        var n;        return e === A && W.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : k.call(z.test(t) ? e.getElementsByClassName(RegExp.$1) : X.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))    }, S.contains = function(e, t) {        return e !== t && e.contains(t)    }, S.type = e, S.isFunction = t, S.isObject = n, S.isArray = i, S.isPlainObject = r, S.inArray = function(e, t, n) {        return C.indexOf.call(t, e, n)    }, S.camelCase = J.camelize = T, S.trim = function(e) {        return e.trim()    }, S.uuid = 0, S.support = {}, S.expr = {}, S.map = function(e, t) {        var n, r, i, o = [];        if (s(e))            for (r = 0; r < e.length; r++) n = t(e[r], r), null != n && o.push(n);        else            for (i in e) n = t(e[i], i), null != n && o.push(n);        return u(o)    }, S.each = function(e, t) {        var n, r;        if (s(e)) {            for (n = 0; n < e.length; n++)                if (t.call(e[n], n, e[n]) === !1) return e        } else            for (r in e)                if (t.call(e[r], r, e[r]) === !1) return e; return e    }, S.grep = function(e, t) {        return L.call(e, t)    }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {        V["[object " + t + "]"] = t.toLowerCase()    }), S.fn = {        forEach: C.forEach,        reduce: C.reduce,        push: C.push,        sort: C.sort,        indexOf: C.indexOf,        concat: C.concat,        map: function(e) {            return S(S.map(this, function(t, n) {                return e.call(t, n, t)            }))        },        slice: function() {            return S(k.apply(this, arguments))        },        ready: function(e) {            return U.test(A.readyState) ? e(S) : A.addEventListener("DOMContentLoaded", function() {                e(S)            }, !1), this        },        get: function(e) {            return e === w ? k.call(this) : this[e]        },        toArray: function() {            return this.get()        },        size: function() {            return this.length        },        remove: function() {            return this.each(function() {                null != this.parentNode && this.parentNode.removeChild(this)            })        },        each: function(e) {            return this.forEach(function(t, n) {                e.call(t, n, t)            }), this        },        filter: function(e) {            return t(e) ? this.not(this.not(e)) : S(L.call(this, function(t) {                return J.matches(t, e)            }))        },        add: function(e, t) {            return S(N(this.concat(S(e, t))))        },        is: function(e) {            return this.length > 0 && J.matches(this[0], e)        },        not: function(e) {            var n, r = [];            return t(e) && e.call !== w ? this.each(function(t) {                e.call(this, t) || r.push(this)            }) : (n = "string" == typeof e ? this.filter(e) : s(e) && t(e.item) ? k.call(e) : S(e), this.forEach(function(e) {                n.indexOf(e) < 0 && r.push(e)            })), S(r)        },        has: function(e) {            return this.filter(function() {                return n(e) ? S.contains(this, e) : S(this).find(e).size()            })        },        eq: function(e) {            return -1 === e ? this.slice(e) : this.slice(e, +e + 1)        },        first: function() {            var e = this[0];            return e && !n(e) ? e : S(e)        },        last: function() {            var e = this[this.length - 1];            return e && !n(e) ? e : S(e)        },        find: function(e) {            var t;            return t = 1 == this.length ? S(J.qsa(this[0], e)) : this.map(function() {                return J.qsa(this, e)            })        },        closest: function(e, t) {            for (var n = this[0]; n && !J.matches(n, e);) n = n !== t && n !== A && n.parentNode;            return S(n)        },        parents: function(e) {            for (var t = [], n = this; n.length > 0;) n = S.map(n, function(e) {                return (e = e.parentNode) && e !== A && t.indexOf(e) < 0 ? (t.push(e), e) : void 0            });            return d(t, e)        },        parent: function(e) {            return d(N(this.pluck("parentNode")), e)        },        children: function(e) {            return d(this.map(function() {                return h(this)            }), e)        },        contents: function() {            return this.map(function() {                return k.call(this.childNodes)            })        },        siblings: function(e) {            return d(this.map(function(e, t) {                return L.call(h(t.parentNode), function(e) {                    return e !== t                })            }), e)        },        empty: function() {            return this.each(function() {                this.innerHTML = ""            })        },        pluck: function(e) {            return S.map(this, function(t) {                return t[e]            })        },        show: function() {            return this.each(function() {                "none" == this.style.display && (this.style.display = null), "none" == _(this, "").getPropertyValue("display") && (this.style.display = c(this.nodeName))            })        },        replaceWith: function(e) {            return this.before(e).remove()        },        wrap: function(e) {            var n, r, i = t(e);            return this[0] && !i && (n = S(e).get(0), r = n.parentNode || this.length > 1), this.each(function(t) {                S(this).wrapAll(i ? e.call(this, t) : r ? n.cloneNode(!0) : n)            })        },        wrapAll: function(e) {            if (this[0]) {                S(this[0]).before(e = S(e));                for (var t;                    (t = e.children()).length;) e = t.first();                S(e).append(this)            }            return this        },        wrapInner: function(e) {            var n = t(e);            return this.each(function(t) {                var r = S(this),                    i = r.contents(),                    s = n ? e.call(this, t) : e;                i.length ? i.wrapAll(s) : r.append(s)            })        },        unwrap: function() {            return this.parent().each(function() {                S(this).replaceWith(S(this).children())            }), this        },        clone: function() {            return this.map(function() {                return this.cloneNode(!0)            })        },        hide: function() {            return this.css("display", "none")        },        toggle: function(e) {            return this.each(function() {                var t = S(this);                (e === w ? "none" == t.css("display") : e) ? t.show(): t.hide()            })        },        prev: function(e) {            return S(this.pluck("previousElementSibling")).filter(e || "*")        },        next: function(e) {            return S(this.pluck("nextElementSibling")).filter(e || "*")        },        html: function(e) {            return e === w ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {                var n = this.innerHTML;                S(this).empty().append(v(this, e, t, n))            })        },        text: function(e) {            return e === w ? this.length > 0 ? this[0].textContent : null : this.each(function() {                this.textContent = e            })        },        attr: function(e, t) {            var r;            return "string" == typeof e && t === w ? 0 == this.length || 1 !== this[0].nodeType ? w : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(r = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : r : this.each(function(r) {                if (1 === this.nodeType)                    if (n(e))                        for (E in e) m(this, E, e[E]);                    else m(this, e, v(this, t, r, this.getAttribute(e)))            })        },        removeAttr: function(e) {            return this.each(function() {                1 === this.nodeType && m(this, e)            })        },        prop: function(e, t) {            return t === w ? this[0] ? this[0][e] : w : this.each(function(n) {                this[e] = v(this, t, n, this[e])            })        },        data: function(e, t) {            var n = this.attr("data-" + a(e), t);            return null !== n ? n : w        },        val: function(e) {            return e === w ? this.length > 0 ? this[0].multiple ? S(this[0]).find("option").filter(function() {                return this.selected            }).pluck("value") : this[0].value : w : this.each(function(t) {                this.value = v(this, e, t, this.value)            })        },        offset: function() {            if (0 == this.length) return null;            var e = this[0].getBoundingClientRect();            return {                left: e.left + window.pageXOffset,                top: e.top + window.pageYOffset,                width: e.width,                height: e.height            }        },        css: function(e, t) {            if (arguments.length < 2 && "string" == typeof e) return 0 == this.length ? w : this[0].style[T(e)] || _(this[0], "").getPropertyValue(e);            var n = "";            for (E in e) e[E] || 0 === e[E] ? n += a(E) + ":" + l(E, e[E]) + ";" : this.each(function() {                this.style.removeProperty(a(E))            });            return "string" == typeof e && (t || 0 === t ? n = a(e) + ":" + l(e, t) : this.each(function() {                this.style.removeProperty(a(e))            })), this.each(function() {                this.style.cssText += ";" + n            })        },        index: function(e) {            return e ? this.indexOf(S(e)[0]) : this.parent().children().indexOf(this[0])        },        hasClass: function(e) {            return this.length < 1 ? !1 : f(e).test(g(this[0]))        },        addClass: function(e) {            return this.each(function(t) {                x = [];                var n = g(this),                    r = v(this, e, t, n);                r.split(/\s+/g).forEach(function(e) {                    S(this).hasClass(e) || x.push(e)                }, this), x.length && g(this, n + (n ? " " : "") + x.join(" "))            })        },        removeClass: function(e) {            return this.each(function(t) {                return e === w ? g(this, "") : (x = g(this), v(this, e, t, x).split(/\s+/g).forEach(function(e) {                    x = x.replace(f(e), " ")                }), g(this, x.trim()), void 0)            })        },        toggleClass: function(e, t) {            return this.each(function(n) {                var r = v(this, e, n, g(this));                (t === w ? !S(this).hasClass(r) : t) ? S(this).addClass(r): S(this).removeClass(r)            })        },        scrollTop: function() {            return this.length ? "scrollTop" in this[0] ? this[0].scrollTop : this[0].scrollY : void 0        },        position: function() {            if (this.length) {                var e = this[0],                    t = this.offsetParent(),                    n = this.offset(),                    r = B.test(t[0].nodeName) ? {                        top: 0,                        left: 0                    } : t.offset();                return n.top -= parseFloat(S(e).css("margin-top")) || 0, n.left -= parseFloat(S(e).css("margin-left")) || 0, r.top += parseFloat(S(t[0]).css("border-top-width")) || 0, r.left += parseFloat(S(t[0]).css("border-left-width")) || 0, {                    top: n.top - r.top,                    left: n.left - r.left                }            }        },        offsetParent: function() {            return this.map(function() {                for (var e = this.offsetParent || A.body; e && !B.test(e.nodeName) && "static" == S(e).css("position");) e = e.offsetParent;                return e            })        }    }, ["width", "height"].forEach(function(e) {        S.fn[e] = function(t) {            var n, r = e.replace(/./, function(e) {                return e[0].toUpperCase()            });            return t === w ? this[0] == window ? window["inner" + r] : this[0] == A ? A.documentElement["offset" + r] : (n = this.offset()) && n[e] : this.each(function(n) {                var r = S(this);                r.css(e, v(this, t, n, r[e]()))            })        }    }), F.forEach(function(e, t) {        var r = t % 2;        S.fn[e] = function() {            var e, i = S.map(arguments, function(e) {                    return n(e) ? e : J.fragment(e)                }),                s = this.length > 1;            return i.length < 1 ? this : this.each(function(n, o) {                e = r ? o : o.parentNode, o = 0 == t ? o.nextSibling : 1 == t ? o.firstChild : 2 == t ? o : null, i.forEach(function(t) {                    if (s) t = t.cloneNode(!0);                    else if (!e) return S(t).remove();                    b(e.insertBefore(t, o), function(e) {                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)                    })                })            })        }, S.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {            return S(t)[e](this), this        }    }), J.Z.prototype = S.fn, J.uniq = N, J.deserializeValue = y, S.zepto = J, S}();window.Zepto = Zepto, "$" in window || (window.$ = Zepto),    function(e) {        function t(e) {            return e._zid || (e._zid = d++)        }        function n(e, n, s, o) {            if (n = r(n), n.ns) var u = i(n.ns);            return (p[t(e)] || []).filter(function(e) {                return !(!e || n.e && e.e != n.e || n.ns && !u.test(e.ns) || s && t(e.fn) !== t(s) || o && e.sel != o)            })        }        function r(e) {            var t = ("" + e).split(".");            return {                e: t[0],                ns: t.slice(1).sort().join(" ")            }        }        function i(e) {            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")        }        function s(t, n, r) {            e.isObject(t) ? e.each(t, r) : t.split(/\s/).forEach(function(e) {                r(e, n)            })        }        function o(n, i, o, u, a, f) {            f = !!f;            var l = t(n),                c = p[l] || (p[l] = []);            s(i, o, function(t, i) {                var s = a && a(i, t),                    o = s || i,                    l = function(e) {                        var t = o.apply(n, [e].concat(e.data));                        return t === !1 && e.preventDefault(), t                    },                    h = e.extend(r(t), {                        fn: i,                        proxy: l,                        sel: u,                        del: s,                        i: c.length                    });                c.push(h), n.addEventListener(h.e, l, f)            })        }        function u(e, r, i, o) {            var u = t(e);            s(r || "", i, function(t, r) {                n(e, t, r, o).forEach(function(t) {                    delete p[u][t.i], e.removeEventListener(t.e, t.proxy, !1)                })            })        }        function a(t) {            var n = e.extend({                originalEvent: t            }, t);            return e.each(h, function(e, r) {                n[e] = function() {                    return this[r] = l, t[e].apply(t, arguments)                }, n[r] = c            }), n        }        function f(e) {            if (!("defaultPrevented" in e)) {                e.defaultPrevented = !1;                var t = e.preventDefault;                e.preventDefault = function() {                    this.defaultPrevented = !0, t.call(this)                }            }        }        var l, c, h, p = (e.zepto.qsa, {}),            d = 1,            v = {};        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", e.event = {            add: o,            remove: u        }, e.proxy = function(n, r) {            if (e.isFunction(n)) {                var i = function() {                    return n.apply(r, arguments)                };                return i._zid = t(n), i            }            if ("string" == typeof r) return e.proxy(n[r], n);            throw new TypeError("expected function")        }, e.fn.bind = function(e, t) {            return this.each(function() {                o(this, e, t)            })        }, e.fn.unbind = function(e, t) {            return this.each(function() {                u(this, e, t)            })        }, e.fn.one = function(e, t) {            return this.each(function(n, r) {                o(this, e, t, null, function(e, t) {                    return function() {                        var n = e.apply(r, arguments);                        return u(r, t, e), n                    }                })            })        }, l = function() {            return !0        }, c = function() {            return !1        }, h = {            preventDefault: "isDefaultPrevented",            stopImmediatePropagation: "isImmediatePropagationStopped",            stopPropagation: "isPropagationStopped"        }, e.fn.delegate = function(t, n, r) {            var i = !1;            return ("blur" == n || "focus" == n) && (e.iswebkit ? n = "blur" == n ? "focusout" : "focus" == n ? "focusin" : n : i = !0), this.each(function(s, u) {                o(u, n, r, t, function(n) {                    return function(r) {                        var i, s = e(r.target).closest(t, u).get(0);                        return s ? (i = e.extend(a(r), {                            currentTarget: s,                            liveFired: u                        }), n.apply(s, [i].concat([].slice.call(arguments, 1)))) : void 0                    }                }, i)            })        }, e.fn.undelegate = function(e, t, n) {            return this.each(function() {                u(this, t, n, e)            })        }, e.fn.live = function(t, n) {            return e(document.body).delegate(this.selector, t, n), this        }, e.fn.die = function(t, n) {            return e(document.body).undelegate(this.selector, t, n), this        }, e.fn.on = function(t, n, r) {            return void 0 == n || e.isFunction(n) ? this.bind(t, n) : this.delegate(n, t, r)        }, e.fn.off = function(t, n, r) {            return void 0 == n || e.isFunction(n) ? this.unbind(t, n) : this.undelegate(n, t, r)        }, e.fn.trigger = function(t, n) {            return "string" == typeof t && (t = e.Event(t)), f(t), t.data = n, this.each(function() {                "dispatchEvent" in this && this.dispatchEvent(t)            })        }, e.fn.triggerHandler = function(t, r) {            var i, s;            return this.each(function(o, u) {                i = a("string" == typeof t ? e.Event(t) : t), i.data = r, i.target = u, e.each(n(u, t.type || t), function(e, t) {                    return s = t.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0                })            }), s        }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(t) {            e.fn[t] = function(e) {                return this.bind(t, e)            }        }), ["focus", "blur"].forEach(function(t) {            e.fn[t] = function(e) {                if (e) this.bind(t, e);                else if (this.length) try {                    this.get(0)[t]()                } catch (n) {}                return this            }        }), e.Event = function(e, t) {            var n, r = document.createEvent(v[e] || "Events"),                i = !0;            if (t)                for (n in t) "bubbles" == n ? i = !!t[n] : r[n] = t[n];            return r.initEvent(e, i, !0, null, null, null, null, null, null, null, null, null, null, null, null), r        }    }(Zepto),    function(e) {        function t(e) {            var t = this.os = {},                n = this.browser = {},                r = e.match(/WebKit\/([\d.]+)/),                i = e.match(/(Android).*?([\d.]+)/) || /HTC/.test(e),                s = e.match(/(iPad).*OS\s([\d_]+)/),                o = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),                u = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),                a = u && e.match(/TouchPad/),                f = e.match(/Kindle\/([\d.]+)/),                l = e.match(/Silk\/([\d._]+)/),                c = e.match(/(BlackBerry).*Version\/([\d.]+)/);            (n.webkit = !!r) && (n.version = r[1]), i && (t.android = !0, t.version = i[2]), o && (t.ios = t.iphone = !0, t.version = o[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), u && (t.webos = !0, t.version = u[2]), a && (t.touchpad = !0), c && (t.blackberry = !0, t.version = c[2]), f && (t.kindle = !0, t.version = f[1]), l && (n.silk = !0, n.version = l[1]), !l && t.android && e.match(/Kindle Fire/) && (n.silk = !0)        }        t.call(e, navigator.userAgent), e.__detect = t    }(Zepto),    function(e, t) {        function n(e) {            return e.toLowerCase()        }        function r(e) {            return i ? i + e : n(e)        }        var i, s = "",            o = {                "": "",                Webkit: "webkit",                Moz: "",                O: "o",                ms: "MS"            },            u = window.document,            a = u.createElement("div"),            f = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,            l = {};        e.each(o, function(e, r) {            return a.style[e + "TransitionProperty"] !== t ? (s = "-" + n(e) + "-", i = r, !1) : void 0        }), e.prefix = s, l[s + "transition-property"] = l[s + "transition-duration"] = l[s + "transition-timing-function"] = l[s + "animation-name"] = l[s + "animation-duration"] = "", e.fx = {            off: i === t && a.style.transitionProperty === t,            cssPrefix: s,            transitionEnd: r("TransitionEnd"),            animationEnd: r("AnimationEnd")        }, e.fn.animate = function(t, n, r, i) {            return e.isObject(n) && (r = n.easing, i = n.complete, n = n.duration), n && (n /= 1e3), this.anim(t, n, r, i)        }, e.fn.anim = function(n, r, i, o) {            var u, a, h, p = {},                d = this,                v = e.fx.transitionEnd;            if (r === t && (r = .4), e.fx.off && (r = 0), "string" == typeof n) p[s + "animation-name"] = n, p[s + "animation-duration"] = r + "s", v = e.fx.animationEnd;            else {                for (a in n) f.test(a) ? (u || (u = []), u.push(a + "(" + n[a] + ")"), delete n[a]) : p[a] = n[a];                u && (p[s + "transform"] = u.join(" "), n.transform = "transform"), e.fx.off || "object" != typeof n || (p[s + "transition-property"] = Object.keys(n).join(", "), p[s + "transition-duration"] = r + "s", p[s + "transition-timing-function"] = i || "linear")            }            return h = function(t) {                if ("undefined" != typeof t) {                    if (t.target !== t.currentTarget) return;                    e(t.target).unbind(v, arguments.callee)                }                e(this).css(l), o && o.call(this)            }, r > 0 && this.bind(v, h), setTimeout(function() {                d.css(p), 0 >= r && setTimeout(function() {                    d.each(function() {                        h.call(this)                    })                }, 0)            }, 0), this        }, a = null    }(Zepto),    function(a) {        function l(e, t, n) {            var r = a.Event(t);            return a(e).trigger(r, n), !r.defaultPrevented        }        function m(e, t, n, r) {            return e.global ? l(t || c, n, r) : void 0        }        function n(e) {            e.global && 0 === a.active++ && m(e, null, "ajaxStart")        }        function o(e) {            e.global && !--a.active && m(e, null, "ajaxStop")        }        function p(e, t) {            var n = t.context;            return t.beforeSend.call(n, e, t) === !1 || m(t, n, "ajaxBeforeSend", [e, t]) === !1 ? !1 : (m(t, n, "ajaxSend", [e, t]), void 0)        }        function q(e, t, n) {            var r = n.context,                i = "success";            n.success.call(r, e, i, t), m(n, r, "ajaxSuccess", [t, n, e]), s(i, t, n)        }        function r(e, t, n, r) {            var i = r.context;            r.error.call(i, n, t, e), m(r, i, "ajaxError", [n, r, e]), s(t, n, r)        }        function s(e, t, n) {            var r = n.context;            n.complete.call(r, t, e), m(n, r, "ajaxComplete", [t, n]), o(n)        }        function t() {}        function u(e) {            return e && (e = e.split(";", 2)[0]), e && (e == j ? "html" : e == i ? "json" : g.test(e) ? "script" : h.test(e) && "xml") || "text"        }        function v(e, t) {            return (e + "&" + t).replace(/[&?]{1,2}/, "?")        }        function w(e) {            e.processData && e.data && "string" != a.type(e.data) && (e.data = a.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = v(e.url, e.data))        }        function x(e, t, n, r) {            var i = !a.isFunction(t);            return {                url: e,                data: i ? t : void 0,                success: i ? a.isFunction(n) ? n : void 0 : t,                dataType: i ? r || n : n            }        }        function z(e, t, n, r) {            var i, s = a.isArray(t);            a.each(t, function(t, o) {                i = a.type(o), r && (t = n ? r : r + "[" + (s ? "" : t) + "]"), !r && s ? e.add(o.name, o.value) : "array" == i || !n && "object" == i ? z(e, o, n, t) : e.add(t, o)            })        }        var d, e, y, b = 0,            c = window.document,            f = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,            g = /^(?:text|application)\/javascript/i,            h = /^(?:text|application)\/xml/i,            i = "application/json",            j = "text/html",            k = /^\s*$/;        a.active = 0, a.ajaxJSONP = function(e) {            if (!("type" in e)) return a.ajax(e);            var n, i = "jsonp" + ++b,                s = c.createElement("script"),                o = function() {                    clearTimeout(n), a(s).remove(), delete window[i]                },                u = function(n) {                    o(), n && "timeout" != n || (window[i] = t), r(null, n || "abort", f, e)                },                f = {                    abort: u                };            return p(f, e) === !1 ? (u("abort"), !1) : (window[i] = function(t) {                o(), q(t, f, e)            }, s.onerror = function() {                u("error")            }, s.src = e.url.replace(/=\?/, "=" + i), a("head").append(s), e.timeout > 0 && (n = setTimeout(function() {                u("timeout")            }, e.timeout)), f)        }, a.ajaxSettings = {            type: "GET",            beforeSend: t,            success: t,            error: t,            complete: t,            context: null,            global: !0,            xhr: function() {                return new window.XMLHttpRequest            },            accepts: {                script: "text/javascript, application/javascript",                json: i,                xml: "application/xml, text/xml",                html: j,                text: "text/plain"            },            crossDomain: !1,            timeout: 0,            processData: !0,            cache: !1        }, a.ajax = function(b) {            var f, g, m, h, i, j, l, o, c = a.extend({}, b || {});            for (d in a.ajaxSettings) void 0 === c[d] && (c[d] = a.ajaxSettings[d]);            if (n(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host), c.url || (c.url = window.location.toString()), w(c), c.cache === !1 && (c.url = v(c.url, "_=" + Date.now())), f = c.dataType, g = /=\?/.test(c.url), "jsonp" == f || g) return g || (c.url = v(c.url, "callback=?")), a.ajaxJSONP(c);            h = c.accepts[f], i = {}, j = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol, l = c.xhr(), c.crossDomain || (i["X-Requested-With"] = "XMLHttpRequest"), h && (i.Accept = h, h.indexOf(",") > -1 && (h = h.split(",", 2)[0]), l.overrideMimeType && l.overrideMimeType(h)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && (i["Content-Type"] = c.contentType || "application/x-www-form-urlencoded"), c.headers = a.extend(i, c.headers || {}), l.onreadystatechange = function() {                if (4 == l.readyState) {                    l.onreadystatechange = t, clearTimeout(m);                    var b, d = !1;                    if (l.status >= 200 && l.status < 300 || 304 == l.status || 0 == l.status && "file:" == j) {                        f = f || u(l.getResponseHeader("content-type")), b = l.responseText;                        try {                            "script" == f ? (1, eval)(b) : "xml" == f ? b = l.responseXML : "json" == f && (b = k.test(b) ? null : a.parseJSON(b))                        } catch (e) {                            d = e                        }                        d ? r(d, "parsererror", l, c) : q(b, l, c)                    } else r(null, l.status ? "error" : "abort", l, c)                }            }, o = "async" in c ? c.async : !0, l.open(c.type, c.url, o);            for (e in c.headers) l.setRequestHeader(e, c.headers[e]);            return p(l, c) === !1 ? (l.abort(), !1) : (c.timeout > 0 && (m = setTimeout(function() {                l.onreadystatechange = t, l.abort(), r(null, "timeout", l, c)            }, c.timeout)), l.send(c.data ? c.data : null), l)        }, a.get = function() {            return a.ajax(x.apply(null, arguments))        }, a.post = function() {            var e = x.apply(null, arguments);            return e.type = "POST", a.ajax(e)        }, a.getJSON = function() {            var e = x.apply(null, arguments);            return e.dataType = "json", a.ajax(e)        }, a.fn.load = function(e, t, n) {            if (!this.length) return this;            var r, i = this,                s = e.split(/\s/),                o = x(e, t, n),                u = o.success;            return s.length > 1 && (o.url = s[0], r = s[1]), o.success = function(e) {                i.html(r ? a("<div>").html(e.replace(f, "")).find(r) : e), u && u.apply(i, arguments)            }, a.ajax(o), this        }, y = encodeURIComponent, a.param = function(e, t) {            var n = [];            return n.add = function(e, t) {                this.push(y(e) + "=" + y(t))            }, z(n, e, t), n.join("&").replace(/%20/g, "+")        }    }(Zepto),    function(e) {        e.fn.serializeArray = function() {            var t, n = [];            return e(Array.prototype.slice.call(this.get(0).elements)).each(function() {                t = e(this);                var r = t.attr("type");                "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({                    name: t.attr("name"),                    value: t.val()                })            }), n        }, e.fn.serialize = function() {            var e = [];            return this.serializeArray().forEach(function(t) {                e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))            }), e.join("&")        }, e.fn.submit = function(t) {            if (t) this.bind("submit", t);            else if (this.length) {                var n = e.Event("submit");                this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()            }            return this        }    }(Zepto),    function(e) {        function t(e) {            return "tagName" in e ? e : e.parentNode        }        function n(e, t, n, r) {            var i = Math.abs(e - t),                s = Math.abs(n - r);            return i >= s ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"        }        function r() {            o = null, u.last && (u.el.trigger("longTap"), u = {})        }        function i() {            o && clearTimeout(o), o = null        }        var s, o, u = {},            a = 750;        e.compatEvent = {            touchstart: "touchstart",            touchmove: "touchmove",            touchend: "touchend"        }, e(document).ready(function() {            var l, p;            e(document.body).bind("touchstart", function(n) {                l = Date.now(), p = l - (u.last || l), u.el = e(t(n.touches[0].target)), s && clearTimeout(s), u.x1 = n.touches[0].pageX, u.y1 = n.touches[0].pageY, p > 0 && 250 >= p && (u.isDoubleTap = !0), u.last = l, o = setTimeout(r, a)            }).bind("touchmove", function(e) {                i(), u.x2 = e.touches[0].pageX, u.y2 = e.touches[0].pageY            }).bind("touchend", function() {                i(), u.isDoubleTap ? (u.el.trigger("doubleTap"), u = {}) : u.x2 && Math.abs(u.x1 - u.x2) > 30 || u.y2 && Math.abs(u.y1 - u.y2) > 30 ? (u.el.trigger("swipe") && u.el.trigger("swipe" + n(u.x1, u.x2, u.y1, u.y2)), u = {}) : "last" in u && (u.el.trigger("tap"), s = setTimeout(function() {                    s = null, u.el.trigger("singleTap"), u = {}                }, 250))            }).bind("touchcancel", function() {                s && clearTimeout(s), o && clearTimeout(o), o = s = null, u = {}            })        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) {            e.fn[t] = function(e) {                return this.bind(t, e)            }        })    }(Zepto)module.exports = Zepto;
},{}],3:[function(require,module,exports){
var $ = require('../lib/zepto.js');

/*
 * @params targetelement: slide panel, zepto object
 * @params slideheight:  default is body's height 
 * @params pageClassName: caculate count of page
 * @params animate: default {timingfunction:'ease-out',duration:400}
 */
function Slide(setting) {
    this.targetElement = setting.targetElement;
    this.pageOffset = setting.pageOffset;
    this.pageClassName = setting.pageClassName;
    this.isHoriz = setting.isHoriz;
    this.animate = setting.animate || {
        timingFunction: 'ease-out',
        duration: 400
    };
    this._init();
}

Slide.prototype = {
    constructor: Slide,

    _init: function() {
        this._curIndexOfPage = 0;//current page index
        this._pageCount = this._getPageCount();//get total page count
        this.pageOffset = this._getPageOffset();
        this._bind();
    },
    _bind:function(){
        var _this = this;
    },
    _getPageOffset:function(){
       if(this.isHoriz){
           this.targetElement.width();
       }else{
            return this.targetElement.height(); 
       }
    },
    _setPageOffset:function(offset) {
        alert(this.pageOffset+":"+offset);
        this.pageOffset = offset;
    },
    _getPageCount: function() {
        if (this.targetElement && this.targetElement.length > 0) {
            return this.targetElement.find('.' + this.pageClassName).length;
        } else {
            throw 'targetElement is not defined !';
        }
    },
    /*
     * A public method
     * @params callback, if exist,call!
     */
    nextPage: function(callback) {
        if (!this.hasNextPage()) {
            return;
        }
        var offsetY = this._getPageOffset()* (++this._curIndexOfPage);
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
     /*
     * A public method
     * @params callback, if exist,call!
     */
    prevPage: function(callback) {
        if (!this.hasPrevPage()) {
            return;
        }
        var offsetY = this._getPageOffset()* (--this._curIndexOfPage);
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
    hasPrevPage: function() {
        return this._curIndexOfPage > 0 ? true : false;
    },
    hasNextPage: function() {
        return this._curIndexOfPage < this._pageCount - 1 ? true : false;
    },
    pageMoveTo: function(subY,callback) {
        var subY = subY || 0;
        var offsetY = this._getPageOffset()* this._curIndexOfPage + subY;
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
    getCurIndexOfPage: function() {
        return this._curIndexOfPage;
    }
}
module.exports = Slide;

},{"../lib/zepto.js":2}],4:[function(require,module,exports){
    var $ = require('../lib/zepto.js');

    var Touch = function(args) {
        this.bindDom = $(args.bindDom) || $('body');
        this.touchRange = args.touchRange || 50;
        this.callbacks = args.callbacks;
        this._changedTouches = {};
        this.init();
    }
    Touch.prototype = {
        init: function() {
            this._bind();
        },
        _bind: function() {
            var _this = this;
            if (this.bindDom.length === 0) {
                return;
            }
            this.bindDom.on({
                touchstart: function(e) {
                    _this._touchstartWrap(e);
                },
                touchend: function(e) {
                    _this._touchendWrap(e);
                },
                touchmove: function(e) {
                    _this._touchmoveWrap(e);
                }
            });
        },
        _touchstartWrap: function(e) {
            if (e.changedTouches) {
                this._changedTouches.sY = e.changedTouches[0].clientY;
            }
        },
        _touchendWrap: function(e) {
            if (e.changedTouches) {
                this._changedTouches.eY = e.changedTouches[0].clientY;
                this._afterTouchend();
            }
        },
        _touchmoveWrap: function(e) {
            e.preventDefault();
            if (e.changedTouches) {
                this._changedTouches.mY = e.changedTouches[0].clientY;
            }
            if (this.callbacks && this.callbacks.move && typeof this.callbacks.move === 'function') {
                setTimeout(this.callbacks.move, 0, this._changedTouches);
            }
        },
        _getSubY: function() {

            var ey = this._changedTouches.eY || 0,
                sy = this._changedTouches.sY || 0;
            return ey - sy;
        },
        _afterTouchend: function() {
            var subY = this._getSubY();
            if (subY < -this.touchRange) {
                if (this.callbacks && this.callbacks.up && typeof this.callbacks.up === 'function') {
                    setTimeout(this.callbacks.up, 0, this._changedTouches)
                }
            } else if (subY > this.touchRange) {
                if (this.callbacks && this.callbacks.down && typeof this.callbacks.down === 'function') {
                    setTimeout(this.callbacks.down, 0, this._changedTouches);
                }
            }
        }
    }
    module.exports = Touch;

},{"../lib/zepto.js":2}],5:[function(require,module,exports){
var $ = require('../lib/zepto.js');


function WXShare (setting) {
    this.img_url = setting.img_url;
    this.img_width= setting.img_width || 120;
    this.img_height= setting.img_height|| 120;
    this.link = setting.link;
    this.title = setting.title;
    this.desc= setting.desc;
}

WXShare.prototype = {
    constructor: WXShare,
    init: function() {
        this.desc = this.desc || this.title;
        this._bind();
    },
    _bind: function() {
        var _this = this;
        $(document).on('WeixinJSBridgeReady', function onBridgeReady(){
           _this._sendMessage(); 
        });
    },
    //初始化分享内容的函数
    _sendMessage: function() {
        var _this = this;
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid": "", //appid 设置为空
                "img_url": _this.img_url, //分享图片路径
                "img_width": _this.img_width, //图片宽度
                "img_height": _this.img_height, //图片高度 
                "link": _this.link, //源链接地址
                "desc": _this.desc, //分享内容介绍
                "title":_this.title 
            }, function(res) {
                /*** 回调函数，最好设置为空 ***/
            });
        });
    }
}
module.exports = WXShare;

},{"../lib/zepto.js":2}]},{},[1])