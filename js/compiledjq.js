/*! jQuery UI - v1.10.3 - 2013-07-26
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.autocomplete.js, jquery.ui.datepicker.js, jquery.ui.menu.js, jquery.ui.effect.js, jquery.ui.effect-slide.js
 * Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e, t) {
    function i(t, i) {
        var a, n, r, o = t.nodeName.toLowerCase();
        return"area" === o ? (a = t.parentNode, n = a.name, t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0], !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && s(t);
    }
    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return"hidden" === e.css(this, "visibility");
        }).length;
    }
    var a = 0, n = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {version: "1.10.3", keyCode: {BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38}}), e.fn.extend({focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), s && s.call(t);
                    }, i);
                }) : t.apply(this, arguments);
            };
        }(e.fn.focus), scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return/(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
            }).eq(0) : this.parents().filter(function() {
                return/(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t;
        }, zIndex: function(i) {
            if (i !== t)
                return this.css("zIndex", i);
            if (this.length)
                for (var s, a, n = e(this[0]); n.length && n[0] !== document; ) {
                    if (s = n.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (a = parseInt(n.css("zIndex"), 10), !isNaN(a) && 0 !== a))
                        return a;
                    n = n.parent();
                }
            return 0;
        }, uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++a);
            });
        }, removeUniqueId: function() {
            return this.each(function() {
                n.test(this.id) && e(this).removeAttr("id")
            });
        }}), e.extend(e.expr[":"], {data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return!!e.data(i, t)
            }
        }) : function(t, i, s) {
            return!!e.data(t, s[3])
        }, focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        }, tabbable: function(t) {
            var s = e.attr(t, "tabindex"), a = isNaN(s);
            return(a || s >= 0) && i(t, !a)
        }}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, s) {
        function a(t, i, s, a) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), i
        }
        var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"], r = s.toLowerCase(), o = {innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight};
        e.fn["inner" + s] = function(i) {
            return i === t ? o["inner" + s].call(this) : this.each(function() {
                e(this).css(r, a(this, i) + "px")
            })
        }, e.fn["outer" + s] = function(t, i) {
            return"number" != typeof t ? o["outer" + s].call(this, t) : this.each(function() {
                e(this).css(r, a(this, t, !0, i) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart"in document.createElement("div"), e.fn.extend({disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        }, enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }}), e.extend(e.ui, {plugin: {add: function(t, i, s) {
                var a, n = e.ui[t].prototype;
                for (a in s)
                    n.plugins[a] = n.plugins[a] || [], n.plugins[a].push([i, s[a]])
            }, call: function(e, t, i) {
                var s, a = e.plugins[t];
                if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (s = 0; a.length > s; s++)
                        e.options[a[s][0]] && a[s][1].apply(e.element, i)
            }}, hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow"))
                return!1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop", a = !1;
            return t[s] > 0 ? !0 : (t[s] = 1, a = t[s] > 0, t[s] = 0, a)
        }})
})(jQuery);
(function(e, t) {
    var i = 0, s = Array.prototype.slice, n = e.cleanData;
    e.cleanData = function(t) {
        for (var i, s = 0; null != (i = t[s]); s++)
            try {
                e(i).triggerHandler("remove")
            } catch (a) {
            }
        n(t)
    }, e.widget = function(i, s, n) {
        var a, r, o, h, l = {}, u = i.split(".")[0];
        i = i.split(".")[1], a = u + "-" + i, n || (n = s, s = e.Widget), e.expr[":"][a.toLowerCase()] = function(t) {
            return!!e.data(t, a)
        }, e[u] = e[u] || {}, r = e[u][i], o = e[u][i] = function(e, i) {
            return this._createWidget ? (arguments.length && this._createWidget(e, i), t) : new o(e, i)
        }, e.extend(o, r, {version: n.version, _proto: e.extend({}, n), _childConstructors: []}), h = new s, h.options = e.widget.extend({}, h.options), e.each(n, function(i, n) {
            return e.isFunction(n) ? (l[i] = function() {
                var e = function() {
                    return s.prototype[i].apply(this, arguments)
                }, t = function(e) {
                    return s.prototype[i].apply(this, e)
                };
                return function() {
                    var i, s = this._super, a = this._superApply;
                    return this._super = e, this._superApply = t, i = n.apply(this, arguments), this._super = s, this._superApply = a, i
                }
            }(), t) : (l[i] = n, t)
        }), o.prototype = e.widget.extend(h, {widgetEventPrefix: r ? h.widgetEventPrefix : i}, l, {constructor: o, namespace: u, widgetName: i, widgetFullName: a}), r ? (e.each(r._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete r._childConstructors) : s._childConstructors.push(o), e.widget.bridge(i, o)
    }, e.widget.extend = function(i) {
        for (var n, a, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++)
            for (n in r[o])
                a = r[o][n], r[o].hasOwnProperty(n) && a !== t && (i[n] = e.isPlainObject(a) ? e.isPlainObject(i[n]) ? e.widget.extend({}, i[n], a) : e.widget.extend({}, a) : a);
        return i
    }, e.widget.bridge = function(i, n) {
        var a = n.prototype.widgetFullName || i;
        e.fn[i] = function(r) {
            var o = "string" == typeof r, h = s.call(arguments, 1), l = this;
            return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r, o ? this.each(function() {
                var s, n = e.data(this, a);
                return n ? e.isFunction(n[r]) && "_" !== r.charAt(0) ? (s = n[r].apply(n, h), s !== n && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'")
            }) : this.each(function() {
                var t = e.data(this, a);
                t ? t.option(r || {})._init() : e.data(this, a, new n(r, this))
            }), l
        }
    }, e.Widget = function() {
    }, e.Widget._childConstructors = [], e.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: {disabled: !1, create: null}, _createWidget: function(t, s) {
            s = e(s || this.defaultElement || this)[0], this.element = e(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), s !== this && (e.data(s, this.widgetFullName, this), this._on(!0, this.element, {remove: function(e) {
                    e.target === s && this.destroy()
                }}), this.document = e(s.style ? s.ownerDocument : s.document || s), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        }, _getCreateOptions: e.noop, _getCreateEventData: e.noop, _create: e.noop, _init: e.noop, destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        }, _destroy: e.noop, widget: function() {
            return this.element
        }, option: function(i, s) {
            var n, a, r, o = i;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, n = i.split("."), i = n.shift(), n.length) {
                    for (a = o[i] = e.widget.extend({}, this.options[i]), r = 0; n.length - 1 > r; r++)
                        a[n[r]] = a[n[r]] || {}, a = a[n[r]];
                    if (i = n.pop(), s === t)
                        return a[i] === t ? null : a[i];
                    a[i] = s
                } else {
                    if (s === t)
                        return this.options[i] === t ? null : this.options[i];
                    o[i] = s
                }
            return this._setOptions(o), this
        }, _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        }, _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        }, enable: function() {
            return this._setOption("disabled", !1)
        }, disable: function() {
            return this._setOption("disabled", !0)
        }, _on: function(i, s, n) {
            var a, r = this;
            "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = a = e(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, a = this.widget()), e.each(n, function(n, o) {
                function h() {
                    return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t
                }
                "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/), u = l[1] + r.eventNamespace, c = l[2];
                c ? a.delegate(c, u, h) : s.bind(u, h)
            })
        }, _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        }, _delay: function(e, t) {
            function i() {
                return("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        }, _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                }, mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }})
        }, _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                }, focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }})
        }, _trigger: function(t, i, s) {
            var n, a, r = this.options[t];
            if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a)
                    n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }}, e.each({show: "fadeIn", hide: "fadeOut"}, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, a) {
            "string" == typeof n && (n = {effect: n});
            var r, o = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {}, "number" == typeof n && (n = {duration: n}), r = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), r && e.effects && e.effects.effect[o] ? s[t](n) : o !== t && s[o] ? s[o](n.duration, n.easing, a) : s.queue(function(i) {
                e(this)[t](), a && a.call(s[0]), i()
            })
        }
    })
})(jQuery);
(function(e) {
    var t = !1;
    e(document).mouseup(function() {
        t = !1
    }), e.widget("ui.mouse", {version: "1.10.3", options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0}, _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return!0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined
            }), this.started = !1
        }, _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        }, _mouseDown: function(i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this, n = 1 === i.which, a = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                    return s._mouseMove(e)
                }, this._mouseUpDelegate = function(e) {
                    return s._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), t = !0, !0)) : !0
            }
        }, _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        }, _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        }, _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        }, _mouseDelayMet: function() {
            return this.mouseDelayMet
        }, _mouseStart: function() {
        }, _mouseDrag: function() {
        }, _mouseStop: function() {
        }, _mouseCapture: function() {
            return!0
        }})
})(jQuery);
(function(t, e) {
    function i(t, e, i) {
        return[parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }
    function s(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }
    function n(e) {
        var i = e[0];
        return 9 === i.nodeType ? {width: e.width(), height: e.height(), offset: {top: 0, left: 0}} : t.isWindow(i) ? {width: e.width(), height: e.height(), offset: {top: e.scrollTop(), left: e.scrollLeft()}} : i.preventDefault ? {width: 0, height: 0, offset: {top: i.pageY, left: i.pageX}} : {width: e.outerWidth(), height: e.outerHeight(), offset: e.offset()}
    }
    t.ui = t.ui || {};
    var a, o = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, c = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position;
    t.position = {scrollbarWidth: function() {
            if (a !== e)
                return a;
            var i, s, n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = n.children()[0];
            return t("body").append(n), i = o.offsetWidth, n.css("overflow", "scroll"), s = o.offsetWidth, i === s && (s = n[0].clientWidth), n.remove(), a = i - s
        }, getScrollInfo: function(e) {
            var i = e.isWindow ? "" : e.element.css("overflow-x"), s = e.isWindow ? "" : e.element.css("overflow-y"), n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth, a = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
            return{width: a ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0}
        }, getWithinInfo: function(e) {
            var i = t(e || window), s = t.isWindow(i[0]);
            return{element: i, isWindow: s, offset: i.offset() || {left: 0, top: 0}, scrollLeft: i.scrollLeft(), scrollTop: i.scrollTop(), width: s ? i.width() : i.outerWidth(), height: s ? i.height() : i.outerHeight()}
        }}, t.fn.position = function(e) {
        if (!e || !e.of)
            return f.apply(this, arguments);
        e = t.extend({}, e);
        var a, p, m, g, v, b, _ = t(e.of), y = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(y), x = (e.collision || "flip").split(" "), k = {};
        return b = n(_), _[0].preventDefault && (e.at = "left top"), p = b.width, m = b.height, g = b.offset, v = t.extend({}, g), t.each(["my", "at"], function() {
            var t, i, s = (e[this] || "").split(" ");
            1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]), s[0] = l.test(s[0]) ? s[0] : "center", s[1] = c.test(s[1]) ? s[1] : "center", t = u.exec(s[0]), i = u.exec(s[1]), k[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
        }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), a = i(k.at, p, m), v.left += a[0], v.top += a[1], this.each(function() {
            var n, l, c = t(this), u = c.outerWidth(), d = c.outerHeight(), f = s(this, "marginLeft"), b = s(this, "marginTop"), D = u + f + s(this, "marginRight") + w.width, T = d + b + s(this, "marginBottom") + w.height, C = t.extend({}, v), M = i(k.my, c.outerWidth(), c.outerHeight());
            "right" === e.my[0] ? C.left -= u : "center" === e.my[0] && (C.left -= u / 2), "bottom" === e.my[1] ? C.top -= d : "center" === e.my[1] && (C.top -= d / 2), C.left += M[0], C.top += M[1], t.support.offsetFractions || (C.left = h(C.left), C.top = h(C.top)), n = {marginLeft: f, marginTop: b}, t.each(["left", "top"], function(i, s) {
                t.ui.position[x[i]] && t.ui.position[x[i]][s](C, {targetWidth: p, targetHeight: m, elemWidth: u, elemHeight: d, collisionPosition: n, collisionWidth: D, collisionHeight: T, offset: [a[0] + M[0], a[1] + M[1]], my: e.my, at: e.at, within: y, elem: c})
            }), e.using && (l = function(t) {
                var i = g.left - C.left, s = i + p - u, n = g.top - C.top, a = n + m - d, h = {target: {element: _, left: g.left, top: g.top, width: p, height: m}, element: {element: c, left: C.left, top: C.top, width: u, height: d}, horizontal: 0 > s ? "left" : i > 0 ? "right" : "center", vertical: 0 > a ? "top" : n > 0 ? "bottom" : "middle"};
                u > p && p > r(i + s) && (h.horizontal = "center"), d > m && m > r(n + a) && (h.vertical = "middle"), h.important = o(r(i), r(s)) > o(r(n), r(a)) ? "horizontal" : "vertical", e.using.call(this, t, h)
            }), c.offset(t.extend(C, {using: l}))
        })
    }, t.ui.position = {fit: {left: function(t, e) {
                var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width, r = t.left - e.collisionPosition.marginLeft, h = n - r, l = r + e.collisionWidth - a - n;
                e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left)
            }, top: function(t, e) {
                var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = e.within.height, r = t.top - e.collisionPosition.marginTop, h = n - r, l = r + e.collisionHeight - a - n;
                e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top)
            }}, flip: {left: function(t, e) {
                var i, s, n = e.within, a = n.offset.left + n.scrollLeft, o = n.width, h = n.isWindow ? n.scrollLeft : n.offset.left, l = t.left - e.collisionPosition.marginLeft, c = l - h, u = l + e.collisionWidth - o - h, d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || u > r(s)) && (t.left += d + p + f))
            }, top: function(t, e) {
                var i, s, n = e.within, a = n.offset.top + n.scrollTop, o = n.height, h = n.isWindow ? n.scrollTop : n.offset.top, l = t.top - e.collisionPosition.marginTop, c = l - h, u = l + e.collisionHeight - o - h, d = "top" === e.my[1], p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1];
                0 > c ? (s = t.top + p + f + m + e.collisionHeight - o - a, t.top + p + f + m > c && (0 > s || r(c) > s) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - h, t.top + p + f + m > u && (i > 0 || u > r(i)) && (t.top += p + f + m))
            }}, flipfit: {left: function() {
                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
            }, top: function() {
                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
            }}}, function() {
        var e, i, s, n, a, o = document.getElementsByTagName("body")[0], r = document.createElement("div");
        e = document.createElement(o ? "div" : "body"), s = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"}, o && t.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (a in s)
            e.style[a] = s[a];
        e.appendChild(r), i = o || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", n = t(r).offset().left, t.support.offsetFractions = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
    }()
})(jQuery);
(function(e) {
    e.widget("ui.draggable", e.ui.mouse, {version: "1.10.3", widgetEventPrefix: "drag", options: {addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null}, _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        }, _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        }, _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3}).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        }, _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, this.offset.scroll = !1, e.extend(this.offset, {click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        }, _mouseDrag: function(t, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (this._trigger("drag", t, s) === !1)
                    return this._mouseUp({}), !1;
                this.position = s.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        }, _mouseStop: function(t) {
            var i = this, s = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || e.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", t) !== !1 && i._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1) : !1
        }, _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        }, cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        }, _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        }, _createHelper: function(t) {
            var i = this.options, s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s
        }, _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {left: +t[0], top: +t[1] || 0}), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        }, _getParentOffset: function() {
            var t = this.offsetParent.offset();
            return"absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {top: 0, left: 0}), {top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        }, _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var e = this.element.position();
                return{top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            }
            return{top: 0, left: 0}
        }, _cacheMargins: function() {
            this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
        }, _cacheHelperProportions: function() {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function() {
            var t, i, s, n = this.options;
            return n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === n.containment ? (this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : n.containment.constructor === Array ? (this.containment = n.containment, undefined) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i), undefined) : (this.containment = null, undefined)
        }, _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var s = "absolute" === t ? 1 : -1, n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {top: n.scrollTop(), left: n.scrollLeft()}), {top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s, left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s}
        }, _generatePosition: function(t) {
            var i, s, n, a, o = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = t.pageX, l = t.pageY;
            return this.offset.scroll || (this.offset.scroll = {top: r.scrollTop(), left: r.scrollLeft()}), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), {top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top), left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)}
        }, _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        }, _trigger: function(t, i, s) {
            return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s]), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, s)
        }, plugins: {}, _uiHash: function() {
            return{helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs}
        }}), e.ui.plugin.add("draggable", "connectToSortable", {start: function(t, i) {
            var s = e(this).data("ui-draggable"), n = s.options, a = e.extend({}, i, {item: s.element});
            s.sortables = [], e(n.connectToSortable).each(function() {
                var i = e.data(this, "ui-sortable");
                i && !i.options.disabled && (s.sortables.push({instance: i, shouldRevert: i.options.revert}), i.refreshPositions(), i._trigger("activate", t, a))
            })
        }, stop: function(t, i) {
            var s = e(this).data("ui-draggable"), n = e.extend({}, i, {item: s.element});
            e.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({top: "auto", left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, n))
            })
        }, drag: function(t, i) {
            var s = e(this).data("ui-draggable"), n = this;
            e.each(s.sortables, function() {
                var a = !1, o = this;
                this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (a = !0, e.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (a = !1), a
                })), a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", t), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", t), s.dropped = !1)
            })
        }}), e.ui.plugin.add("draggable", "cursor", {start: function() {
            var t = e("body"), i = e(this).data("ui-draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor")), t.css("cursor", i.cursor)
        }, stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }}), e.ui.plugin.add("draggable", "opacity", {start: function(t, i) {
            var s = e(i.helper), n = e(this).data("ui-draggable").options;
            s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity)
        }, stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._opacity && e(i.helper).css("opacity", s._opacity)
        }}), e.ui.plugin.add("draggable", "scroll", {start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        }, drag: function(t) {
            var i = e(this).data("ui-draggable"), s = i.options, n = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(document).scrollTop() < s.scrollSensitivity ? n = e(document).scrollTop(e(document).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < s.scrollSensitivity && (n = e(document).scrollTop(e(document).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (t.pageX - e(document).scrollLeft() < s.scrollSensitivity ? n = e(document).scrollLeft(e(document).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < s.scrollSensitivity && (n = e(document).scrollLeft(e(document).scrollLeft() + s.scrollSpeed)))), n !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
        }}), e.ui.plugin.add("draggable", "snap", {start: function() {
            var t = e(this).data("ui-draggable"), i = t.options;
            t.snapElements = [], e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = e(this), s = i.offset();
                this !== t.element[0] && t.snapElements.push({item: this, width: i.outerWidth(), height: i.outerHeight(), top: s.top, left: s.left})
            })
        }, drag: function(t, i) {
            var s, n, a, o, r, h, l, u, c, d, p = e(this).data("ui-draggable"), f = p.options, m = f.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, b = i.offset.top, y = b + p.helperProportions.height;
            for (c = p.snapElements.length - 1; c >= 0; c--)
                r = p.snapElements[c].left, h = r + p.snapElements[c].width, l = p.snapElements[c].top, u = l + p.snapElements[c].height, r - m > v || g > h + m || l - m > y || b > u + m || !e.contains(p.snapElements[c].item.ownerDocument, p.snapElements[c].item) ? (p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {snapItem: p.snapElements[c].item})), p.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (s = m >= Math.abs(l - y), n = m >= Math.abs(u - b), a = m >= Math.abs(r - v), o = m >= Math.abs(h - g), s && (i.position.top = p._convertPositionTo("relative", {top: l - p.helperProportions.height, left: 0}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {top: u, left: 0}).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {top: 0, left: r - p.helperProportions.width}).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {top: 0, left: h}).left - p.margins.left)), d = s || n || a || o, "outer" !== f.snapMode && (s = m >= Math.abs(l - b), n = m >= Math.abs(u - y), a = m >= Math.abs(r - g), o = m >= Math.abs(h - v), s && (i.position.top = p._convertPositionTo("relative", {top: l, left: 0}).top - p.margins.top), n && (i.position.top = p._convertPositionTo("relative", {top: u - p.helperProportions.height, left: 0}).top - p.margins.top), a && (i.position.left = p._convertPositionTo("relative", {top: 0, left: r}).left - p.margins.left), o && (i.position.left = p._convertPositionTo("relative", {top: 0, left: h - p.helperProportions.width}).left - p.margins.left)), !p.snapElements[c].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {snapItem: p.snapElements[c].item})), p.snapElements[c].snapping = s || n || a || o || d)
        }}), e.ui.plugin.add("draggable", "stack", {start: function() {
            var t, i = this.data("ui-draggable").options, s = e.makeArray(e(i.stack)).sort(function(t, i) {
                return(parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            s.length && (t = parseInt(e(s[0]).css("zIndex"), 10) || 0, e(s).each(function(i) {
                e(this).css("zIndex", t + i)
            }), this.css("zIndex", t + s.length))
        }}), e.ui.plugin.add("draggable", "zIndex", {start: function(t, i) {
            var s = e(i.helper), n = e(this).data("ui-draggable").options;
            s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex)
        }, stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._zIndex && e(i.helper).css("zIndex", s._zIndex)
        }})
})(jQuery);
(function(t) {
    var e = 0;
    t.widget("ui.autocomplete", {version: "1.10.3", defaultElement: "<input>", options: {appendTo: null, autoFocus: !1, delay: 300, minLength: 1, position: {my: "left top", at: "left bottom", collision: "none"}, source: null, change: null, close: null, focus: null, open: null, response: null, search: null, select: null}, pending: 0, _create: function() {
            var e, i, s, n = this.element[0].nodeName.toLowerCase(), a = "textarea" === n, o = "input" === n;
            this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {keydown: function(n) {
                    if (this.element.prop("readOnly"))
                        return e = !0, s = !0, i = !0, undefined;
                    e = !1, s = !1, i = !1;
                    var a = t.ui.keyCode;
                    switch (n.keyCode) {
                        case a.PAGE_UP:
                            e = !0, this._move("previousPage", n);
                            break;
                        case a.PAGE_DOWN:
                            e = !0, this._move("nextPage", n);
                            break;
                        case a.UP:
                            e = !0, this._keyEvent("previous", n);
                            break;
                        case a.DOWN:
                            e = !0, this._keyEvent("next", n);
                            break;
                        case a.ENTER:
                        case a.NUMPAD_ENTER:
                            this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                            break;
                        case a.TAB:
                            this.menu.active && this.menu.select(n);
                            break;
                        case a.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(n), n.preventDefault());
                            break;
                        default:
                            i = !0, this._searchTimeout(n)
                        }
                }, keypress: function(s) {
                    if (e)
                        return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), undefined;
                    if (!i) {
                        var n = t.ui.keyCode;
                        switch (s.keyCode) {
                            case n.PAGE_UP:
                                this._move("previousPage", s);
                                break;
                            case n.PAGE_DOWN:
                                this._move("nextPage", s);
                                break;
                            case n.UP:
                                this._keyEvent("previous", s);
                                break;
                            case n.DOWN:
                                this._keyEvent("next", s)
                            }
                    }
                }, input: function(t) {
                    return s ? (s = !1, t.preventDefault(), undefined) : (this._searchTimeout(t), undefined)
                }, focus: function() {
                    this.selectedItem = null, this.previous = this._value()
                }, blur: function(t) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(t), this._change(t), undefined)
                }}), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().data("ui-menu"), this._on(this.menu.element, {mousedown: function(e) {
                    e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                        var e = this;
                        this.document.one("mousedown", function(s) {
                            s.target === e.element[0] || s.target === i || t.contains(i, s.target) || e.close()
                        })
                    })
                }, menufocus: function(e, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)))
                        return this.menu.blur(), this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        }), undefined;
                    var s = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", e, {item: s}) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
                }, menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item"), s = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
                        this.previous = s, this.selectedItem = i
                    })), !1 !== this._trigger("select", t, {item: i}) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                }}), this.liveRegion = t("<span>", {role: "status", "aria-live": "polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }})
        }, _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        }, _setOption: function(t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
        }, _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
        }, _initSource: function() {
            var e, i, s = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, s) {
                s(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, n) {
                s.xhr && s.xhr.abort(), s.xhr = t.ajax({url: i, data: e, dataType: "json", success: function(t) {
                        n(t)
                    }, error: function() {
                        n([])
                    }})
            }) : this.source = this.options.source
        }, _searchTimeout: function(t) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
            }, this.options.delay)
        }, search: function(t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : undefined
        }, _search: function(t) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: t}, this._response())
        }, _response: function() {
            var t = this, i = ++e;
            return function(s) {
                i === e && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading")
            }
        }, __response: function(t) {
            t && (t = this._normalize(t)), this._trigger("response", null, {content: t}), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        }, close: function(t) {
            this.cancelSearch = !0, this._close(t)
        }, _close: function(t) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        }, _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {item: this.selectedItem})
        }, _normalize: function(e) {
            return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                return"string" == typeof e ? {label: e, value: e} : t.extend({label: e.label || e.value, value: e.value || e.label}, e)
            })
        }, _suggest: function(e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
        }, _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        }, _renderMenu: function(e, i) {
            var s = this;
            t.each(i, function(t, i) {
                s._renderItemData(e, i)
            })
        }, _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        }, _renderItem: function(e, i) {
            return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
        }, _move: function(t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[t](e), undefined) : (this.search(null, e), undefined)
        }, widget: function() {
            return this.menu.element
        }, _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        }, _keyEvent: function(t, e) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
        }}), t.extend(t.ui.autocomplete, {escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function(e, i) {
            var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e, function(t) {
                return s.test(t.label || t.value || t)
            })
        }}), t.widget("ui.autocomplete", t.ui.autocomplete, {options: {messages: {noResults: "No search results.", results: function(t) {
                    return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }}}, __response: function(t) {
            var e;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
        }})
})(jQuery);
(function(t, e) {
    function i() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: ""}, this._defaults = {showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1}, t.extend(this._defaults, this.regional[""]), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function s(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function() {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            t.datepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function n(e, i) {
        t.extend(e, i);
        for (var s in i)
            null == i[s] && (e[s] = i[s]);
        return e
    }
    t.extend(t.ui, {datepicker: {version: "1.10.3"}});
    var a, r = "datepicker";
    t.extend(i.prototype, {markerClassName: "hasDatepicker", maxRows: 4, _widgetDatepicker: function() {
            return this.dpDiv
        }, setDefaults: function(t) {
            return n(this._defaults, t || {}), this
        }, _attachDatepicker: function(e, i) {
            var s, n, a;
            s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), a = this._newInst(t(e), n), a.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
        }, _newInst: function(e, i) {
            var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return{id: n, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv}
        }, _connectDatepicker: function(e, i) {
            var s = t(e);
            i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, r, i), i.settings.disabled && this._disableDatepicker(e))
        }, _attachments: function(e, i) {
            var s, n, a, r = this._get(i, "appendText"), o = this._get(i, "isRTL");
            i.append && i.append.remove(), r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"), e[o ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({src: a, alt: n, title: n}) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({src: a, alt: n, title: n}) : n)), e[o ? "before" : "after"](i.trigger), i.trigger.click(function() {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        }, _autoSize: function(t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, a = new Date(2009, 11, 20), r = this._get(t, "dateFormat");
                r.match(/[DM]/) && (e = function(t) {
                    for (i = 0, s = 0, n = 0; t.length > n; n++)
                        t[n].length > i && (i = t[n].length, s = n);
                    return s
                }, a.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), t.input.attr("size", this._formatDate(t, a).length)
            }
        }, _inlineDatepicker: function(e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, r, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        }, _dialogDatepicker: function(e, i, s, a, o) {
            var h, l, c, u, d, p = this._dialogInst;
            return p || (this.uuid += 1, h = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], r, p)), n(p.settings, a || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], r, p), this
        }, _destroyDatepicker: function(e) {
            var i, s = t(e), n = t.data(e, r);
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, r), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
        }, _enableDatepicker: function(e) {
            var i, s, n = t(e), a = t.data(e, r);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, a.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({opacity: "1.0", cursor: ""})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }))
        }, _disableDatepicker: function(e) {
            var i, s, n = t(e), a = t.data(e, r);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, a.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({opacity: "0.5", cursor: "default"})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        }, _isDisabledDatepicker: function(t) {
            if (!t)
                return!1;
            for (var e = 0; this._disabledInputs.length > e; e++)
                if (this._disabledInputs[e] === t)
                    return!0;
            return!1
        }, _getInst: function(e) {
            try {
                return t.data(e, r)
            } catch (i) {
                throw"Missing instance data for this datepicker"
            }
        }, _optionDatepicker: function(i, s, a) {
            var r, o, h, l, c = this._getInst(i);
            return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (r = s || {}, "string" == typeof s && (r = {}, r[s] = a), c && (this._curInst === c && this._hideDatepicker(), o = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, "min"), l = this._getMinMaxDate(c, "max"), n(c.settings, r), null !== h && r.dateFormat !== e && r.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && r.dateFormat !== e && r.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), "disabled"in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, o), this._updateAlternate(c), this._updateDatepicker(c)), e)
        }, _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        }, _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        }, _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        }, _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        }, _doKeyDown: function(e) {
            var i, s, n, a = t.datepicker._getInst(e.target), r = !0, o = a.dpDiv.is(".ui-datepicker-rtl");
            if (a._keyEvent = !0, t.datepicker._datepickerShowing)
                switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), r = !1;
                        break;
                    case 13:
                        return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", a.dpDiv), n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]), i = t.datepicker._get(a, "onSelect"), i ? (s = t.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? 1 : -1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? -1 : 1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        r = !1
                }
            else
                36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : r = !1;
            r && (e.preventDefault(), e.stopPropagation())
        }, _doKeyPress: function(i) {
            var s, n, a = t.datepicker._getInst(i.target);
            return t.datepicker._get(a, "constrainInput") ? (s = t.datepicker._possibleChars(t.datepicker._get(a, "dateFormat")), n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e
        }, _doKeyUp: function(e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal)
                try {
                    i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
                } catch (n) {
                }
            return!0
        }, _showDatepicker: function(e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, s, a, r, o, h, l;
                i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), s = t.datepicker._get(i, "beforeShow"), a = s ? s.apply(e, [e, i]) : {}, a !== !1 && (n(i.settings, a), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function() {
                    return r |= "fixed" === t(this).css("position"), !r
                }), o = {left: t.datepicker._pos[0], top: t.datepicker._pos[1]}, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({position: "absolute", display: "block", top: "-1000px"}), t.datepicker._updateDatepicker(i), o = t.datepicker._checkOffset(i, o, r), i.dpDiv.css({position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: o.left + "px", top: o.top + "px"}), i.inline || (h = t.datepicker._get(i, "showAnim"), l = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        }, _updateDatepicker: function(e) {
            this.maxRows = 4, a = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, s = this._getNumberOfMonths(e), n = s[1], r = 17;
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", r * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        }, _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        }, _checkOffset: function(e, i, s) {
            var n = e.dpDiv.outerWidth(), a = e.dpDiv.outerHeight(), r = e.input ? e.input.outerWidth() : 0, o = e.input ? e.input.outerHeight() : 0, h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()), l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - r : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + o ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + o) : 0), i
        }, _findPos: function(e) {
            for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e)); )
                e = e[n ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        }, _hideDatepicker: function(e) {
            var i, s, n, a, o = this._curInst;
            !o || e && o !== t.data(e, r) || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function() {
                t.datepicker._tidyDialog(o)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({position: "absolute", left: "0", top: "-100px"}), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        }, _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        }, _checkExternalClick: function(e) {
            if (t.datepicker._curInst) {
                var i = t(e.target), s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        }, _adjustDate: function(e, i, s) {
            var n = t(e), a = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a))
        }, _gotoToday: function(e) {
            var i, s = t(e), n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        }, _selectMonthYear: function(e, i, s) {
            var n = t(e), a = this._getInst(n[0]);
            a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n)
        }, _selectDay: function(e, i, s, n) {
            var a, r = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (a = this._getInst(r[0]), a.selectedDay = a.currentDay = t("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
        }, _clearDate: function(e) {
            var i = t(e);
            this._selectDate(i, "")
        }, _selectDate: function(e, i) {
            var s, n = t(e), a = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
        }, _updateAlternate: function(e) {
            var i, s, n, a = this._get(e, "altField");
            a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).each(function() {
                t(this).val(n)
            }))
        }, noWeekends: function(t) {
            var e = t.getDay();
            return[e > 0 && 6 > e, ""]
        }, iso8601Week: function(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        }, parseDate: function(i, s, n) {
            if (null == i || null == s)
                throw"Invalid arguments";
            if (s = "object" == typeof s ? "" + s : s + "", "" === s)
                return null;
            var a, r, o, h, l = 0, c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, p = (n ? n.dayNames : null) || this._defaults.dayNames, f = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, m = (n ? n.monthNames : null) || this._defaults.monthNames, g = -1, v = -1, _ = -1, b = -1, y = !1, x = function(t) {
                var e = i.length > a + 1 && i.charAt(a + 1) === t;
                return e && a++, e
            }, k = function(t) {
                var e = x(t), i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2, n = RegExp("^\\d{1," + i + "}"), a = s.substring(l).match(n);
                if (!a)
                    throw"Missing number at position " + l;
                return l += a[0].length, parseInt(a[0], 10)
            }, w = function(i, n, a) {
                var r = -1, o = t.map(x(i) ? a : n, function(t, e) {
                    return[[e, t]]
                }).sort(function(t, e) {
                    return-(t[1].length - e[1].length)
                });
                if (t.each(o, function(t, i) {
                    var n = i[1];
                    return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = i[0], l += n.length, !1) : e
                }), -1 !== r)
                    return r + 1;
                throw"Unknown name at position " + l
            }, D = function() {
                if (s.charAt(l) !== i.charAt(a))
                    throw"Unexpected literal at position " + l;
                l++
            };
            for (a = 0; i.length > a; a++)
                if (y)
                    "'" !== i.charAt(a) || x("'") ? D() : y = !1;
                else
                    switch (i.charAt(a)) {
                        case"d":
                            _ = k("d");
                            break;
                        case"D":
                            w("D", d, p);
                            break;
                        case"o":
                            b = k("o");
                            break;
                        case"m":
                            v = k("m");
                            break;
                        case"M":
                            v = w("M", f, m);
                            break;
                        case"y":
                            g = k("y");
                            break;
                        case"@":
                            h = new Date(k("@")), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
                            break;
                        case"!":
                            h = new Date((k("!") - this._ticksTo1970) / 1e4), g = h.getFullYear(), v = h.getMonth() + 1, _ = h.getDate();
                            break;
                        case"'":
                            x("'") ? D() : y = !0;
                            break;
                        default:
                            D()
                    }
            if (s.length > l && (o = s.substr(l), !/^\s+/.test(o)))
                throw"Extra/unparsed characters found in date: " + o;
            if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)), b > -1)
                for (v = 1, _ = b; ; ) {
                    if (r = this._getDaysInMonth(g, v - 1), r >= _)
                        break;
                    v++, _ -= r
                }
            if (h = this._daylightSavingAdjust(new Date(g, v - 1, _)), h.getFullYear() !== g || h.getMonth() + 1 !== v || h.getDate() !== _)
                throw"Invalid date";
            return h
        }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate: function(t, e, i) {
            if (!e)
                return"";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, a = (i ? i.dayNames : null) || this._defaults.dayNames, r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, o = (i ? i.monthNames : null) || this._defaults.monthNames, h = function(e) {
                var i = t.length > s + 1 && t.charAt(s + 1) === e;
                return i && s++, i
            }, l = function(t, e, i) {
                var s = "" + e;
                if (h(t))
                    for (; i > s.length; )
                        s = "0" + s;
                return s
            }, c = function(t, e, i, s) {
                return h(t) ? s[e] : i[e]
            }, u = "", d = !1;
            if (e)
                for (s = 0; t.length > s; s++)
                    if (d)
                        "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
                    else
                        switch (t.charAt(s)) {
                            case"d":
                                u += l("d", e.getDate(), 2);
                                break;
                            case"D":
                                u += c("D", e.getDay(), n, a);
                                break;
                            case"o":
                                u += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case"m":
                                u += l("m", e.getMonth() + 1, 2);
                                break;
                            case"M":
                                u += c("M", e.getMonth(), r, o);
                                break;
                            case"y":
                                u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                                break;
                            case"@":
                                u += e.getTime();
                                break;
                            case"!":
                                u += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case"'":
                                h("'") ? u += "'" : d = !0;
                                break;
                            default:
                                u += t.charAt(s)
                        }
            return u
        }, _possibleChars: function(t) {
            var e, i = "", s = !1, n = function(i) {
                var s = t.length > e + 1 && t.charAt(e + 1) === i;
                return s && e++, s
            };
            for (e = 0; t.length > e; e++)
                if (s)
                    "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
                else
                    switch (t.charAt(e)) {
                        case"d":
                        case"m":
                        case"y":
                        case"@":
                            i += "0123456789";
                            break;
                        case"D":
                        case"M":
                            return null;
                        case"'":
                            n("'") ? i += "'" : s = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
            return i
        }, _get: function(t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        }, _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null, n = this._getDefaultDate(t), a = n, r = this._getFormatConfig(t);
                try {
                    a = this.parseDate(i, s, r) || n
                } catch (o) {
                    s = e ? "" : s
                }
                t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), t.currentDay = s ? a.getDate() : 0, t.currentMonth = s ? a.getMonth() : 0, t.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(t)
            }
        }, _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        }, _determineDate: function(e, i, s) {
            var n = function(t) {
                var e = new Date;
                return e.setDate(e.getDate() + t), e
            }, a = function(i) {
                try {
                    return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                } catch (s) {
                }
                for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), r = n.getMonth(), o = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l; ) {
                    switch (l[2] || "d") {
                        case"d":
                        case"D":
                            o += parseInt(l[1], 10);
                            break;
                        case"w":
                        case"W":
                            o += 7 * parseInt(l[1], 10);
                            break;
                        case"m":
                        case"M":
                            r += parseInt(l[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(a, r));
                            break;
                        case"y":
                        case"Y":
                            a += parseInt(l[1], 10), o = Math.min(o, t.datepicker._getDaysInMonth(a, r))
                    }
                    l = h.exec(i)
                }
                return new Date(a, r, o)
            }, r = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return r = r && "Invalid Date" == "" + r ? s : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
        }, _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        }, _setDate: function(t, e, i) {
            var s = !e, n = t.selectedMonth, a = t.selectedYear, r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
        }, _getDate: function(t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        }, _attachHandlers: function(e) {
            var i = this._get(e, "stepMonths"), s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {prev: function() {
                        t.datepicker._adjustDate(s, -i, "M")
                    }, next: function() {
                        t.datepicker._adjustDate(s, +i, "M")
                    }, hide: function() {
                        t.datepicker._hideDatepicker()
                    }, today: function() {
                        t.datepicker._gotoToday(s)
                    }, selectDay: function() {
                        return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    }, selectMonth: function() {
                        return t.datepicker._selectMonthYear(s, this, "M"), !1
                    }, selectYear: function() {
                        return t.datepicker._selectMonthYear(s, this, "Y"), !1
                    }};
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        }, _generateHTML: function(t) {
            var e, i, s, n, a, r, o, h, l, c, u, d, p, f, m, g, v, _, b, y, x, k, w, D, T, C, M, S, N, I, P, A, z, H, E, F, O, W, j, R = new Date, L = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())), Y = this._get(t, "isRTL"), B = this._get(t, "showButtonPanel"), J = this._get(t, "hideIfNoPrevNext"), K = this._get(t, "navigationAsDateFormat"), Q = this._getNumberOfMonths(t), V = this._get(t, "showCurrentAtPos"), U = this._get(t, "stepMonths"), q = 1 !== Q[0] || 1 !== Q[1], X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)), G = this._getMinMaxDate(t, "min"), $ = this._getMinMaxDate(t, "max"), Z = t.drawMonth - V, te = t.drawYear;
            if (0 > Z && (Z += 12, te--), $)
                for (e = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - Q[0] * Q[1] + 1, $.getDate())), e = G && G > e?G:e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e; )
                    Z--, 0 > Z && (Z = 11, te--);
            for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - U, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : J ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + U, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : J ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", r = this._get(t, "currentText"), o = this._get(t, "gotoCurrent") && t.currentDay ? X : L, r = K ? this.formatDate(r, o, this._getFormatConfig(t)) : r, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; Q[0] > k; k++) {
                for (w = "", this.maxRows = 4, D = 0; Q[1] > D; D++) {
                    if (T = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), C = " ui-corner-all", M = "", q) {
                        if (M += "<div class='ui-datepicker-group", Q[1] > 1)
                            switch (D) {
                                case 0:
                                    M += " ui-datepicker-group-first", C = " ui-corner-" + (Y ? "right" : "left");
                                    break;
                                case Q[1] - 1:
                                    M += " ui-datepicker-group-last", C = " ui-corner-" + (Y ? "left" : "right");
                                    break;
                                default:
                                    M += " ui-datepicker-group-middle", C = ""
                            }
                        M += "'>"
                    }
                    for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && 0 === k?Y?a:s:"") + (/all|right/.test(C) && 0 === k?Y?s:a:"") + this._generateMonthYearHeader(t, Z, te, G, $, k > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", S = u?"<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>":"", x = 0; 7 > x; x++)
                        N = (x + c) % 7, S += "<th" + ((x + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[N] + "'>" + p[N] + "</span></th>";
                    for (M += S + "</tr></thead><tbody>", I = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), P = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, A = Math.ceil((P + I) / 7), z = q ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = z, H = this._daylightSavingAdjust(new Date(te, Z, 1 - P)), E = 0; z > E; E++) {
                        for (M += "<tr>", F = u?"<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>":"", x = 0; 7 > x; x++)
                            O = g ? g.apply(t.input ? t.input[0] : null, [H]) : [!0, ""], W = H.getMonth() !== Z, j = W && !_ || !O[0] || G && G > H || $ && H > $, F += "<td class='" + ((x + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (j ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + O[1] + (H.getTime() === X.getTime() ? " " + this._currentClass : "") + (H.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : j ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === L.getTime() ? " ui-state-highlight" : "") + (H.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>", H.setDate(H.getDate() + 1), H = this._daylightSavingAdjust(H);
                        M += F + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, te++), M += "</tbody></table>" + (q ? "</div>" + (Q[0] > 0 && D === Q[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), w += M
                }
                y += w
            }
            return y += l, t._keyEvent = !1, y
        }, _generateMonthYearHeader: function(t, e, i, s, n, a, r, o) {
            var h, l, c, u, d, p, f, m, g = this._get(t, "changeMonth"), v = this._get(t, "changeYear"), _ = this._get(t, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = "";
            if (a || !g)
                y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
            else {
                for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++)
                    (!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + o[c] + "</option>");
                y += "</select>"
            }
            if (_ || (b += y + (!a && g && v ? "" : "&#xa0;")), !t.yearshtml)
                if (t.yearshtml = "", a || !v)
                    b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                        var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                        return isNaN(e) ? d : e
                    }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = s?Math.max(f, s.getFullYear()):f, m = n?Math.min(m, n.getFullYear()):m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++)
                        t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                }
            return b += this._get(t, "yearSuffix"), _ && (b += (!a && g && v ? "" : "&#xa0;") + y), b += "</div>"
        }, _adjustInstDate: function(t, e, i) {
            var s = t.drawYear + ("Y" === i ? e : 0), n = t.drawMonth + ("M" === i ? e : 0), a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0), r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
            t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        }, _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min"), s = this._getMinMaxDate(t, "max"), n = i && i > e ? i : e;
            return s && n > s ? s : n
        }, _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        }, _getNumberOfMonths: function(t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        }, _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        }, _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        }, _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay()
        }, _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t), a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
            return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a)
        }, _isInRange: function(t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"), a = this._getMinMaxDate(t, "max"), r = null, o = null, h = this._get(t, "yearRange");
            return h && (i = h.split(":"), s = (new Date).getFullYear(), r = parseInt(i[0], 10), o = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += s), i[1].match(/[+\-].*/) && (o += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!r || e.getFullYear() >= r) && (!o || o >= e.getFullYear())
        }, _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames")}
        }, _formatDate: function(t, e, i, s) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
        }}), t.fn.datepicker = function(e) {
        if (!this.length)
            return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return"string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.3"
})(jQuery);
(function(t) {
    t.widget("ui.menu", {version: "1.10.3", defaultElement: "<ul>", delay: 300, options: {icons: {submenu: "ui-icon-carat-1-e"}, menus: "ul", position: {my: "left top", at: "right top"}, role: "menu", blur: null, focus: null, select: null}, _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({role: this.options.role, tabIndex: 0}).bind("click" + this.eventNamespace, t.proxy(function(t) {
                this.options.disabled && t.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({"mousedown .ui-menu-item > a": function(t) {
                    t.preventDefault()
                }, "click .ui-state-disabled > a": function(t) {
                    t.preventDefault()
                }, "click .ui-menu-item:has(a)": function(e) {
                    var i = t(e.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(e), i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                }, "mouseenter .ui-menu-item": function(e) {
                    var i = t(e.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function(t, e) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    e || this.focus(t, i)
                }, blur: function(e) {
                    this._delay(function() {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                }, keydown: "_keydown"}), this.refresh(), this._on(this.document, {click: function(e) {
                    t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
                }})
        }, _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        }, _keydown: function(e) {
            function i(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var s, n, a, o, r, h = !0;
            switch (e.keyCode) {
                case t.ui.keyCode.PAGE_UP:
                    this.previousPage(e);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    this.nextPage(e);
                    break;
                case t.ui.keyCode.HOME:
                    this._move("first", "first", e);
                    break;
                case t.ui.keyCode.END:
                    this._move("last", "last", e);
                    break;
                case t.ui.keyCode.UP:
                    this.previous(e);
                    break;
                case t.ui.keyCode.DOWN:
                    this.next(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this.collapse(e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                    break;
                case t.ui.keyCode.ENTER:
                case t.ui.keyCode.SPACE:
                    this._activate(e);
                    break;
                case t.ui.keyCode.ESCAPE:
                    this.collapse(e);
                    break;
                default:
                    h = !1, n = this.previousFilter || "", a = String.fromCharCode(e.keyCode), o = !1, clearTimeout(this.filterTimer), a === n ? o = !0 : a = n + a, r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    }), s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (a = String.fromCharCode(e.keyCode), r = RegExp("^" + i(a), "i"), s = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    })), s.length ? (this.focus(e, s), s.length > 1 ? (this.previousFilter = a, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            h && e.preventDefault()
        }, _activate: function(t) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        }, refresh: function() {
            var e, i = this.options.icons.submenu, s = this.element.find(this.options.menus);
            s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role: this.options.role, "aria-hidden": "true", "aria-expanded": "false"}).each(function() {
                var e = t(this), s = e.prev("a"), n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                s.attr("aria-haspopup", "true").prepend(n), e.attr("aria-labelledby", s.attr("id"))
            }), e = s.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex: -1, role: this._itemRole()}), e.children(":not(.ui-menu-item)").each(function() {
                var e = t(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        }, _itemRole: function() {
            return{menu: "menuitem", listbox: "option"}[this.options.role]
        }, _setOption: function(t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
        }, focus: function(t, e) {
            var i, s;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay), i = e.children(".ui-menu"), i.length && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {item: e})
        }, _scrollIntoView: function(e) {
            var i, s, n, a, o, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = e.height(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
        }, blur: function(t, e) {
            e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {item: this.active}))
        }, _startOpening: function(t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(t)
            }, this.delay))
        }, _open: function(e) {
            var i = t.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        }, collapseAll: function(e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                s.length || (s = this.element), this._close(s), this.blur(e), this.activeMenu = s
            }, this.delay)
        }, _close: function(t) {
            t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        }, collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        }, expand: function(t) {
            var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            e && e.length && (this._open(e.parent()), this._delay(function() {
                this.focus(t, e)
            }))
        }, next: function(t) {
            this._move("next", "first", t)
        }, previous: function(t) {
            this._move("prev", "last", t)
        }, isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        }, isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        }, _move: function(t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, s)
        }, nextPage: function(e) {
            var i, s, n;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = t(this), 0 > i.offset().top - s - n
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(e), undefined)
        }, previousPage: function(e) {
            var i, s, n;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = t(this), i.offset().top - s + n > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(e), undefined)
        }, _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        }, select: function(e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {item: this.active};
            this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
        }})
})(jQuery);
(function(t, e) {
    var i = "ui-effects-";
    t.effects = {effect: {}}, function(t, e) {
        function i(t, e, i) {
            var s = u[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
        }
        function s(i) {
            var s = l(), n = s._rgba = [];
            return i = i.toLowerCase(), f(h, function(t, a) {
                var o, r = a.re.exec(i), h = r && a.parse(r), l = a.space || "rgba";
                return h ? (o = s[l](h), s[c[l].cache] = o[c[l].cache], n = s._rgba = o._rgba, !1) : e
            }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, a.transparent), s) : a[i]
        }
        function n(t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }
        var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [{re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(t) {
                    return[t[1], t[2], t[3], t[4]]
                }}, {re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse: function(t) {
                    return[2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                }}, {re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function(t) {
                    return[parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                }}, {re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function(t) {
                    return[parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                }}, {re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function(t) {
                    return[t[1], t[2] / 100, t[3] / 100, t[4]]
                }}], l = t.Color = function(e, i, s, n) {
            return new t.Color.fn.parse(e, i, s, n)
        }, c = {rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}}, hsla: {props: {hue: {idx: 0, type: "degrees"}, saturation: {idx: 1, type: "percent"}, lightness: {idx: 2, type: "percent"}}}}, u = {"byte": {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, d = l.support = {}, p = t("<p>")[0], f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
            e.cache = "_" + t, e.props.alpha = {idx: 3, type: "percent", def: 1}
        }), l.fn = t.extend(l.prototype, {parse: function(n, o, r, h) {
                if (n === e)
                    return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = t(n).css(o), o = e);
                var u = this, d = t.type(n), p = this._rgba = [];
                return o !== e && (n = [n, o, r, h], d = "array"), "string" === d ? this.parse(s(n) || a._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                    p[e.idx] = i(n[e.idx], e)
                }), this) : "object" === d ? (n instanceof l ? f(c, function(t, e) {
                    n[e.cache] && (u[e.cache] = n[e.cache].slice())
                }) : f(c, function(e, s) {
                    var a = s.cache;
                    f(s.props, function(t, e) {
                        if (!u[a] && s.to) {
                            if ("alpha" === t || null == n[t])
                                return;
                            u[a] = s.to(u._rgba)
                        }
                        u[a][e.idx] = i(n[t], e, !0)
                    }), u[a] && 0 > t.inArray(null, u[a].slice(0, 3)) && (u[a][3] = 1, s.from && (u._rgba = s.from(u[a])))
                }), this) : e
            }, is: function(t) {
                var i = l(t), s = !0, n = this;
                return f(c, function(t, a) {
                    var o, r = i[a.cache];
                    return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(t, i) {
                        return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : e
                    })), s
                }), s
            }, _space: function() {
                var t = [], e = this;
                return f(c, function(i, s) {
                    e[s.cache] && t.push(i)
                }), t.pop()
            }, transition: function(t, e) {
                var s = l(t), n = s._space(), a = c[n], o = 0 === this.alpha() ? l("transparent") : this, r = o[a.cache] || a.to(o._rgba), h = r.slice();
                return s = s[a.cache], f(a.props, function(t, n) {
                    var a = n.idx, o = r[a], l = s[a], c = u[n.type] || {};
                    null !== l && (null === o ? h[a] = l : (c.mod && (l - o > c.mod / 2 ? o += c.mod : o - l > c.mod / 2 && (o -= c.mod)), h[a] = i((l - o) * e + o, n)))
                }), this[n](h)
            }, blend: function(e) {
                if (1 === this._rgba[3])
                    return this;
                var i = this._rgba.slice(), s = i.pop(), n = l(e)._rgba;
                return l(t.map(i, function(t, e) {
                    return(1 - s) * n[e] + s * t
                }))
            }, toRgbaString: function() {
                var e = "rgba(", i = t.map(this._rgba, function(t, e) {
                    return null == t ? e > 2 ? 1 : 0 : t
                });
                return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
            }, toHslaString: function() {
                var e = "hsla(", i = t.map(this.hsla(), function(t, e) {
                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                });
                return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
            }, toHexString: function(e) {
                var i = this._rgba.slice(), s = i.pop();
                return e && i.push(~~(255 * s)), "#" + t.map(i, function(t) {
                    return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                }).join("")
            }, toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }}), l.fn.parse.prototype = l.fn, c.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return[null, null, null, t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, a = t[2] / 255, o = t[3], r = Math.max(s, n, a), h = Math.min(s, n, a), l = r - h, c = r + h, u = .5 * c;
            return e = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c), [Math.round(e) % 360, i, u, null == o ? 1 : o]
        }, c.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return[null, null, null, t[3]];
            var e = t[0] / 360, i = t[1], s = t[2], a = t[3], o = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - o;
            return[Math.round(255 * n(r, o, e + 1 / 3)), Math.round(255 * n(r, o, e)), Math.round(255 * n(r, o, e - 1 / 3)), a]
        }, f(c, function(s, n) {
            var a = n.props, o = n.cache, h = n.to, c = n.from;
            l.fn[s] = function(s) {
                if (h && !this[o] && (this[o] = h(this._rgba)), s === e)
                    return this[o].slice();
                var n, r = t.type(s), u = "array" === r || "object" === r ? s : arguments, d = this[o].slice();
                return f(a, function(t, e) {
                    var s = u["object" === r ? t : e.idx];
                    null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
                }), c ? (n = l(c(d)), n[o] = d, n) : l(d)
            }, f(a, function(e, i) {
                l.fn[e] || (l.fn[e] = function(n) {
                    var a, o = t.type(n), h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), c = l[i.idx];
                    return"undefined" === o ? c : ("function" === o && (n = n.call(this, c), o = t.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = c + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                })
            })
        }), l.hook = function(e) {
            var i = e.split(" ");
            f(i, function(e, i) {
                t.cssHooks[i] = {set: function(e, n) {
                        var a, o, r = "";
                        if ("transparent" !== n && ("string" !== t.type(n) || (a = s(n)))) {
                            if (n = l(a || n), !d.rgba && 1 !== n._rgba[3]) {
                                for (o = "backgroundColor" === i?e.parentNode:e; ("" === r || "transparent" === r) && o && o.style; )
                                    try {
                                        r = t.css(o, "backgroundColor"), o = o.parentNode
                                    } catch (h) {
                                    }
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            e.style[i] = n
                        } catch (h) {
                        }
                    }}, t.fx.step[i] = function(e) {
                    e.colorInit || (e.start = l(e.elem, i), e.end = l(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, l.hook(o), t.cssHooks.borderColor = {expand: function(t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                    e["border" + s + "Color"] = t
                }), e
            }}, a = t.Color.names = {aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff"}
    }(jQuery), function() {
        function i(e) {
            var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle, a = {};
            if (n && n.length && n[0] && n[n[0]])
                for (s = n.length; s--; )
                    i = n[s], "string" == typeof n[i] && (a[t.camelCase(i)] = n[i]);
            else
                for (i in n)
                    "string" == typeof n[i] && (a[i] = n[i]);
            return a
        }
        function s(e, i) {
            var s, n, o = {};
            for (s in i)
                n = i[s], e[s] !== n && (a[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n));
            return o
        }
        var n = ["add", "remove", "toggle"], a = {border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1};
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
            t.fx.step[i] = function(t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.effects.animateClass = function(e, a, o, r) {
            var h = t.speed(a, o, r);
            return this.queue(function() {
                var a, o = t(this), r = o.attr("class") || "", l = h.children ? o.find("*").addBack() : o;
                l = l.map(function() {
                    var e = t(this);
                    return{el: e, start: i(this)}
                }), a = function() {
                    t.each(n, function(t, i) {
                        e[i] && o[i + "Class"](e[i])
                    })
                }, a(), l = l.map(function() {
                    return this.end = i(this.el[0]), this.diff = s(this.start, this.end), this
                }), o.attr("class", r), l = l.map(function() {
                    var e = this, i = t.Deferred(), s = t.extend({}, h, {queue: !1, complete: function() {
                            i.resolve(e)
                        }});
                    return this.el.animate(this.diff, s), i.promise()
                }), t.when.apply(t, l.get()).done(function() {
                    a(), t.each(arguments, function() {
                        var e = this.el;
                        t.each(this.diff, function(t) {
                            e.css(t, "")
                        })
                    }), h.complete.call(o[0])
                })
            })
        }, t.fn.extend({addClass: function(e) {
                return function(i, s, n, a) {
                    return s ? t.effects.animateClass.call(this, {add: i}, s, n, a) : e.apply(this, arguments)
                }
            }(t.fn.addClass), removeClass: function(e) {
                return function(i, s, n, a) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {remove: i}, s, n, a) : e.apply(this, arguments)
                }
            }(t.fn.removeClass), toggleClass: function(i) {
                return function(s, n, a, o, r) {
                    return"boolean" == typeof n || n === e ? a ? t.effects.animateClass.call(this, n ? {add: s} : {remove: s}, a, o, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {toggle: s}, n, a, o)
                }
            }(t.fn.toggleClass), switchClass: function(e, i, s, n, a) {
                return t.effects.animateClass.call(this, {add: i, remove: e}, s, n, a)
            }})
    }(), function() {
        function s(e, i, s, n) {
            return t.isPlainObject(e) && (i = e, e = e.effect), e = {effect: e}, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
        }
        function n(e) {
            return!e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }
        t.extend(t.effects, {version: "1.10.3", save: function(t, e) {
                for (var s = 0; e.length > s; s++)
                    null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
            }, restore: function(t, s) {
                var n, a;
                for (a = 0; s.length > a; a++)
                    null !== s[a] && (n = t.data(i + s[a]), n === e && (n = ""), t.css(s[a], n))
            }, setMode: function(t, e) {
                return"toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
            }, getBaseline: function(t, e) {
                var i, s;
                switch (t[0]) {
                    case"top":
                        i = 0;
                        break;
                    case"middle":
                        i = .5;
                        break;
                    case"bottom":
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height
                }
                switch (t[1]) {
                    case"left":
                        s = 0;
                        break;
                    case"center":
                        s = .5;
                        break;
                    case"right":
                        s = 1;
                        break;
                    default:
                        s = t[1] / e.width
                }
                return{x: s, y: i}
            }, createWrapper: function(e) {
                if (e.parent().is(".ui-effects-wrapper"))
                    return e.parent();
                var i = {width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float")}, s = t("<div></div>").addClass("ui-effects-wrapper").css({fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0}), n = {width: e.width(), height: e.height()}, a = document.activeElement;
                try {
                    a.id
                } catch (o) {
                    a = document.body
                }
                return e.wrap(s), (e[0] === a || t.contains(e[0], a)) && t(a).focus(), s = e.parent(), "static" === e.css("position") ? (s.css({position: "relative"}), e.css({position: "relative"})) : (t.extend(i, {position: e.css("position"), zIndex: e.css("z-index")}), t.each(["top", "left", "bottom", "right"], function(t, s) {
                    i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), e.css({position: "relative", top: 0, left: 0, right: "auto", bottom: "auto"})), e.css(n), s.css(i).show()
            }, removeWrapper: function(e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
            }, setTransition: function(e, i, s, n) {
                return n = n || {}, t.each(i, function(t, i) {
                    var a = e.cssUnit(i);
                    a[0] > 0 && (n[i] = a[0] * s + a[1])
                }), n
            }}), t.fn.extend({effect: function() {
                function e(e) {
                    function s() {
                        t.isFunction(a) && a.call(n[0]), t.isFunction(e) && e()
                    }
                    var n = t(this), a = i.complete, r = i.mode;
                    (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), s()) : o.call(n[0], i, s)
                }
                var i = s.apply(this, arguments), n = i.mode, a = i.queue, o = t.effects.effect[i.effect];
                return t.fx.off || !o ? n ? this[n](i.duration, i.complete) : this.each(function() {
                    i.complete && i.complete.call(this)
                }) : a === !1 ? this.each(e) : this.queue(a || "fx", e)
            }, show: function(t) {
                return function(e) {
                    if (n(e))
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "show", this.effect.call(this, i)
                }
            }(t.fn.show), hide: function(t) {
                return function(e) {
                    if (n(e))
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "hide", this.effect.call(this, i)
                }
            }(t.fn.hide), toggle: function(t) {
                return function(e) {
                    if (n(e) || "boolean" == typeof e)
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "toggle", this.effect.call(this, i)
                }
            }(t.fn.toggle), cssUnit: function(e) {
                var i = this.css(e), s = [];
                return t.each(["em", "px", "%", "pt"], function(t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                }), s
            }})
    }(), function() {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
            e[i] = function(e) {
                return Math.pow(e, t + 2)
            }
        }), t.extend(e, {Sine: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, Circ: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            }, Elastic: function(t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            }, Back: function(t) {
                return t * t * (3 * t - 2)
            }, Bounce: function(t) {
                for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }}), t.each(e, function(e, i) {
            t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                return 1 - i(1 - t)
            }, t.easing["easeInOut" + e] = function(t) {
                return.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        });
    }();
})(jQuery);
(function(t) {
    t.effects.effect.slide = function(e, i) {
        var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "width", "height"], o = t.effects.setMode(n, e.mode || "show"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h, u = {};
        t.effects.save(n, a), n.show(), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(n).css({overflow: "hidden"}), r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s), u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s, n.animate(u, {queue: !1, duration: e.duration, easing: e.easing, complete: function() {
                "hide" === o && n.hide(), t.effects.restore(n, a), t.effects.removeWrapper(n), i()
            }})
    }
})(jQuery);

/*
 * jQuery Mobile Events
 * by Ben Major (www.ben-major.co.uk)
 *
 * Copyright 2011, Ben Major
 * Licensed under the MIT License:
 * */
(function(e) {
    function d() {
        var e = o();
        if (e !== u) {
            u = e;
            i.trigger("orientationchange")
        }
    }
    function E(t, n, r, i) {
        var s = r.type;
        r.type = n;
        e.event.dispatch.call(t, r, i);
        r.type = s
    }
    e.attrFn = e.attrFn || {};
    var t = navigator.userAgent.toLowerCase(), n = t.indexOf("chrome") > -1 && (t.indexOf("windows") > -1 || t.indexOf("macintosh") > -1 || t.indexOf("linux") > -1) && t.indexOf("chrome") < 0, r = {swipe_h_threshold: 50, swipe_v_threshold: 50, taphold_threshold: 750, doubletap_int: 500, touch_capable: "ontouchstart"in document.documentElement && !n, orientation_support: "orientation"in window && "onorientationchange"in window, startevent: "ontouchstart"in document.documentElement && !n ? "touchstart" : "mousedown", endevent: "ontouchstart"in document.documentElement && !n ? "touchend" : "mouseup", moveevent: "ontouchstart"in document.documentElement && !n ? "touchmove" : "mousemove", tapevent: "ontouchstart"in document.documentElement && !n ? "tap" : "click", scrollevent: "ontouchstart"in document.documentElement && !n ? "touchmove" : "scroll", hold_timer: null, tap_timer: null};
    e.isTouchCapable = function() {
        return r.touch_capable
    };
    e.getStartEvent = function() {
        return r.startevent
    };
    e.getEndEvent = function() {
        return r.endevent
    };
    e.getMoveEvent = function() {
        return r.moveevent
    };
    e.getTapEvent = function() {
        return r.tapevent
    };
    e.getScrollEvent = function() {
        return r.scrollevent
    };
    e.each(["tapstart", "tapend", "tap", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(t, n) {
        e.fn[n] = function(e) {
            return e ? this.bind(n, e) : this.trigger(n)
        };
        e.attrFn[n] = true
    });
    e.event.special.tapstart = {setup: function() {
            var t = this, n = e(t);
            n.bind(r.startevent, function(e) {
                n.data("callee", arguments.callee);
                if (e.which && e.which !== 1) {
                    return false
                }
                var i = e.originalEvent, s = {position: {x: r.touch_capable ? i.touches[0].screenX : e.screenX, y: r.touch_capable ? i.touches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? i.touches[0].pageX - i.touches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? i.touches[0].pageY - i.touches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                E(t, "tapstart", e, s);
                return true
            })
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee)
        }};
    e.event.special.tapend = {setup: function() {
            var t = this, n = e(t);
            n.bind(r.endevent, function(e) {
                n.data("callee", arguments.callee);
                var i = e.originalEvent;
                var s = {position: {x: r.touch_capable ? i.changedTouches[0].screenX : e.screenX, y: r.touch_capable ? i.changedTouches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? i.changedTouches[0].pageX - i.changedTouches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? i.changedTouches[0].pageY - i.changedTouches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                E(t, "tapend", e, s);
                return true
            })
        }, remove: function() {
            e(this).unbind(r.endevent, e(this).data.callee)
        }};
    e.event.special.taphold = {setup: function() {
            var t = this, n = e(t), i, s, o = {x: 0, y: 0};
            n.bind(r.startevent, function(e) {
                if (e.which && e.which !== 1) {
                    return false
                } else {
                    n.data("tapheld", false);
                    i = e.target;
                    var s = e.originalEvent;
                    var u = (new Date).getTime(), a = {x: r.touch_capable ? s.touches[0].screenX : e.screenX, y: r.touch_capable ? s.touches[0].screenY : e.screenY}, f = {x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY};
                    o.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    o.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                    r.hold_timer = window.setTimeout(function() {
                        var l = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, c = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                        if (e.target == i && o.x == l && o.y == c) {
                            n.data("tapheld", true);
                            var h = (new Date).getTime(), p = {x: r.touch_capable ? s.touches[0].screenX : e.screenX, y: r.touch_capable ? s.touches[0].screenY : e.screenY}, d = {x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY};
                            duration = h - u;
                            var v = {startTime: u, endTime: h, startPosition: a, startOffset: f, endPosition: p, endOffset: d, duration: duration, target: e.target};
                            n.data("callee1", arguments.callee);
                            E(t, "taphold", e, v)
                        }
                    }, r.taphold_threshold);
                    return true
                }
            }).bind(r.endevent, function() {
                n.data("callee2", arguments.callee);
                n.data("tapheld", false);
                window.clearTimeout(r.hold_timer)
            })
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee1).unbind(r.endevent, e(this).data.callee2)
        }};
    e.event.special.doubletap = {setup: function() {
            var t = this, n = e(t), i, s, o, u;
            n.bind(r.startevent, function(e) {
                if (e.which && e.which !== 1) {
                    return false
                } else {
                    n.data("doubletapped", false);
                    i = e.target;
                    n.data("callee1", arguments.callee);
                    u = e.originalEvent;
                    o = {position: {x: r.touch_capable ? u.touches[0].screenX : e.screenX, y: r.touch_capable ? u.touches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? u.touches[0].pageX - u.touches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? u.touches[0].pageY - u.touches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                    return true
                }
            }).bind(r.endevent, function(e) {
                var a = (new Date).getTime();
                var f = n.data("lastTouch") || a + 1;
                var l = a - f;
                window.clearTimeout(s);
                n.data("callee2", arguments.callee);
                if (l < r.doubletap_int && l > 0 && e.target == i && l > 100) {
                    n.data("doubletapped", true);
                    window.clearTimeout(r.tap_timer);
                    var c = {position: {x: r.touch_capable ? u.touches[0].screenX : e.screenX, y: r.touch_capable ? u.touches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? u.touches[0].pageX - u.touches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? u.touches[0].pageY - u.touches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                    var h = {firstTap: o, secondTap: c, interval: c.time - o.time};
                    E(t, "doubletap", e, h)
                } else {
                    n.data("lastTouch", a);
                    s = window.setTimeout(function(e) {
                        window.clearTimeout(s)
                    }, r.doubletap_int, [e])
                }
                n.data("lastTouch", a)
            })
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee1).unbind(r.endevent, e(this).data.callee2)
        }};
    e.event.special.singletap = {setup: function() {
            var t = this, n = e(t), i = null, s = null, o = {x: 0, y: 0};
            n.bind(r.startevent, function(e) {
                if (e.which && e.which !== 1) {
                    return false
                } else {
                    s = (new Date).getTime();
                    i = e.target;
                    n.data("callee1", arguments.callee);
                    o.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    o.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                    return true
                }
            }).bind(r.endevent, function(e) {
                n.data("callee2", arguments.callee);
                if (e.target == i) {
                    end_pos_x = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;
                    end_pos_y = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY;
                    r.tap_timer = window.setTimeout(function() {
                        if (!n.data("doubletapped") && !n.data("tapheld") && o.x == end_pos_x && o.y == end_pos_y) {
                            var i = e.originalEvent;
                            var s = {position: {x: r.touch_capable ? i.changedTouches[0].screenX : e.screenX, y: r.touch_capable ? i.changedTouches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? i.changedTouches[0].pageX - i.changedTouches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? i.changedTouches[0].pageY - i.changedTouches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                            E(t, "singletap", e, s)
                        }
                    }, r.doubletap_int)
                }
            })
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee1).unbind(r.endevent, e(this).data.callee2)
        }};
    e.event.special.tap = {setup: function() {
            var t = this, n = e(t), i = false, s = null, o, u = {x: 0, y: 0};
            n.bind(r.startevent, function(e) {
                n.data("callee1", arguments.callee);
                if (e.which && e.which !== 1) {
                    return false
                } else {
                    i = true;
                    u.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX;
                    u.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY;
                    o = (new Date).getTime();
                    s = e.target;
                    return true
                }
            }).bind(r.endevent, function(e) {
                n.data("callee2", arguments.callee);
                var a = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX, f = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY;
                if (s == e.target && i && (new Date).getTime() - o < r.taphold_threshold && u.x == a && u.y == f) {
                    var l = e.originalEvent;
                    var c = {position: {x: r.touch_capable ? l.changedTouches[0].screenX : e.screenX, y: r.touch_capable ? l.changedTouches[0].screenY : e.screenY}, offset: {x: r.touch_capable ? l.changedTouches[0].pageX - l.changedTouches[0].target.offsetLeft : e.offsetX, y: r.touch_capable ? l.changedTouches[0].pageY - l.changedTouches[0].target.offsetTop : e.offsetY}, time: (new Date).getTime(), target: e.target};
                    E(t, "tap", e, c)
                }
            })
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee1).unbind(r.endevent, e(this).data.callee2)
        }};
    e.event.special.swipe = {setup: function() {
            function f(t) {
                n = e(t.target);
                n.data("callee1", arguments.callee);
                o.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX;
                o.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY;
                u.x = o.x;
                u.y = o.y;
                i = true;
                var s = t.originalEvent;
                a = {position: {x: r.touch_capable ? s.touches[0].screenX : t.screenX, y: r.touch_capable ? s.touches[0].screenY : t.screenY}, offset: {x: r.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : t.offsetX, y: r.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : t.offsetY}, time: (new Date).getTime(), target: t.target};
                var f = new Date;
                while (new Date - f < 100) {
                }
            }
            function l(t) {
                n = e(t.target);
                n.data("callee2", arguments.callee);
                u.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX;
                u.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY;
                window.clearTimeout(r.hold_timer);
                var f;
                var l = n.data("xthreshold"), c = n.data("ythreshold"), h = typeof l !== "undefined" && l !== false && parseInt(l) ? parseInt(l) : r.swipe_h_threshold, p = typeof c !== "undefined" && c !== false && parseInt(c) ? parseInt(c) : r.swipe_v_threshold;
                if (o.y > u.y && o.y - u.y > p) {
                    f = "swipeup"
                }
                if (o.x < u.x && u.x - o.x > h) {
                    f = "swiperight"
                }
                if (o.y < u.y && u.y - o.y > p) {
                    f = "swipedown"
                }
                if (o.x > u.x && o.x - u.x > h) {
                    f = "swipeleft"
                }
                if (f != undefined && i) {
                    o.x = 0;
                    o.y = 0;
                    u.x = 0;
                    u.y = 0;
                    i = false;
                    var d = t.originalEvent;
                    endEvnt = {position: {x: r.touch_capable ? d.touches[0].screenX : t.screenX, y: r.touch_capable ? d.touches[0].screenY : t.screenY}, offset: {x: r.touch_capable ? d.touches[0].pageX - d.touches[0].target.offsetLeft : t.offsetX, y: r.touch_capable ? d.touches[0].pageY - d.touches[0].target.offsetTop : t.offsetY}, time: (new Date).getTime(), target: t.target};
                    var v = Math.abs(a.position.x - endEvnt.position.x), m = Math.abs(a.position.y - endEvnt.position.y);
                    var g = {startEvnt: a, endEvnt: endEvnt, direction: f.replace("swipe", ""), xAmount: v, yAmount: m, duration: endEvnt.time - a.time};
                    s = true;
                    n.trigger("swipe", g).trigger(f, g)
                }
            }
            function c(t) {
                n = e(t.target);
                var o = "";
                n.data("callee3", arguments.callee);
                if (s) {
                    var u = n.data("xthreshold"), f = n.data("ythreshold"), l = typeof u !== "undefined" && u !== false && parseInt(u) ? parseInt(u) : r.swipe_h_threshold, c = typeof f !== "undefined" && f !== false && parseInt(f) ? parseInt(f) : r.swipe_v_threshold;
                    var h = t.originalEvent;
                    endEvnt = {position: {x: r.touch_capable ? h.changedTouches[0].screenX : t.screenX, y: r.touch_capable ? h.changedTouches[0].screenY : t.screenY}, offset: {x: r.touch_capable ? h.changedTouches[0].pageX - h.changedTouches[0].target.offsetLeft : t.offsetX, y: r.touch_capable ? h.changedTouches[0].pageY - h.changedTouches[0].target.offsetTop : t.offsetY}, time: (new Date).getTime(), target: t.target};
                    if (a.position.y > endEvnt.position.y && a.position.y - endEvnt.position.y > c) {
                        o = "swipeup"
                    }
                    if (a.position.x < endEvnt.position.x && endEvnt.position.x - a.position.x > l) {
                        o = "swiperight"
                    }
                    if (a.position.y < endEvnt.position.y && endEvnt.position.y - a.position.y > c) {
                        o = "swipedown"
                    }
                    if (a.position.x > endEvnt.position.x && a.position.x - endEvnt.position.x > l) {
                        o = "swipeleft"
                    }
                    var p = Math.abs(a.position.x - endEvnt.position.x), d = Math.abs(a.position.y - endEvnt.position.y);
                    var v = {startEvnt: a, endEvnt: endEvnt, direction: o.replace("swipe", ""), xAmount: p, yAmount: d, duration: endEvnt.time - a.time};
                    n.trigger("swipeend", v)
                }
                i = false;
                s = false
            }
            var t = this, n = e(t), i = false, s = false, o = {x: 0, y: 0}, u = {x: 0, y: 0}, a;
            n.bind(r.startevent, f);
            n.bind(r.moveevent, l);
            n.bind(r.endevent, c)
        }, remove: function() {
            e(this).unbind(r.startevent, e(this).data.callee1).unbind(r.moveevent, e(this).data.callee2).unbind(r.endevent, e(this).data.callee3)
        }};
    e.event.special.scrollstart = {setup: function() {
            function o(e, n) {
                i = n;
                E(t, i ? "scrollstart" : "scrollend", e)
            }
            var t = this, n = e(t), i, s;
            n.bind(r.scrollevent, function(e) {
                n.data("callee", arguments.callee);
                if (!i) {
                    o(e, true)
                }
                clearTimeout(s);
                s = setTimeout(function() {
                    o(e, false)
                }, 50)
            })
        }, remove: function() {
            e(this).unbind(r.scrollevent, e(this).data.callee)
        }};
    var i = e(window), s, o, u, a, f, l = {0: true, 180: true};
    if (r.orientation_support) {
        var c = window.innerWidth || e(window).width(), h = window.innerHeight || e(window).height(), p = 50;
        a = c > h && c - h > p;
        f = l[window.orientation];
        if (a && f || !a && !f) {
            l = {"-90": true, 90: true}
        }
    }
    e.event.special.orientationchange = s = {setup: function() {
            if (r.orientation_support) {
                return false
            }
            u = o();
            i.bind("throttledresize", d);
            return true
        }, teardown: function() {
            if (r.orientation_support) {
                return false
            }
            i.unbind("throttledresize", d);
            return true
        }, add: function(e) {
            var t = e.handler;
            e.handler = function(e) {
                e.orientation = o();
                return t.apply(this, arguments)
            }
        }};
    e.event.special.orientationchange.orientation = o = function() {
        var e = true, t = document.documentElement;
        if (r.orientation_support) {
            e = l[window.orientation]
        } else {
            e = t && t.clientWidth / t.clientHeight < 1.1
        }
        return e ? "portrait" : "landscape"
    };
    e.event.special.throttledresize = {setup: function() {
            e(this).bind("resize", m)
        }, teardown: function() {
            e(this).unbind("resize", m)
        }};
    var v = 250, m = function() {
        b = (new Date).getTime();
        w = b - g;
        if (w >= v) {
            g = b;
            e(this).trigger("throttledresize")
        } else {
            if (y) {
                window.clearTimeout(y)
            }
            y = window.setTimeout(d, v - w)
        }
    }, g = 0, y, b, w;
    e.each({scrollend: "scrollstart", swipeup: "swipe", swiperight: "swipe", swipedown: "swipe", swipeleft: "swipe", swipeend: "swipe"}, function(t, n, r) {
        e.event.special[t] = {setup: function() {
                e(this).bind(n, e.noop)
            }}
    })
})(jQuery);

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.3.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
!function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else{factory(jQuery)}}(function($){$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp)}else if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp))}else if(typeof timestamp==="number"){return inWords(new Date(timestamp))}else{return inWords($.timeago.datetime(timestamp))}};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:6e4,allowFuture:false,localeTitle:false,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(distanceMillis){var $l=this.settings.strings;var prefix=$l.prefixAgo;var suffix=$l.suffixAgo;if(this.settings.allowFuture){if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow}}var seconds=Math.abs(distanceMillis)/1e3;var minutes=seconds/60;var hours=minutes/60;var days=hours/24;var years=days/365;function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction;var value=$l.numbers&&$l.numbers[number]||number;return string.replace(/%d/i,value)}var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<42&&substitute($l.day,1)||days<30&&substitute($l.days,Math.round(days))||days<45&&substitute($l.month,1)||days<365&&substitute($l.months,Math.round(days/30))||years<1.5&&substitute($l.year,1)||substitute($l.years,Math.round(years));var separator=$l.wordSeparator||"";if($l.wordSeparator===undefined){separator=" "}return $.trim([prefix,words,suffix].join(separator))},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/\.\d+/,"");s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");s=s.replace(/([\+\-]\d\d)$/," $100");return new Date(s)},datetime:function(elem){var iso8601=$t.isTime(elem)?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601)},isTime:function(elem){return $(elem).get(0).tagName.toLowerCase()==="time"}});var functions={init:function(){var refresh_el=$.proxy(refresh,this);refresh_el();var $s=$t.settings;if($s.refreshMillis>0){this._timeagoInterval=setInterval(refresh_el,$s.refreshMillis)}},update:function(time){var parsedTime=$t.parse(time);$(this).data("timeago",{datetime:parsedTime});if($t.settings.localeTitle)$(this).attr("title",parsedTime.toLocaleString());refresh.apply(this)},updateFromDOM:function(){$(this).data("timeago",{datetime:$t.parse($t.isTime(this)?$(this).attr("datetime"):$(this).attr("title"))});refresh.apply(this)},dispose:function(){if(this._timeagoInterval){window.clearInterval(this._timeagoInterval);this._timeagoInterval=null}}};$.fn.timeago=function(action,options){var fn=action?functions[action]:functions.init;if(!fn){throw new Error("Unknown function name '"+action+"' for timeago")}this.each(function(){fn.call(this,options)});return this};function refresh(){var data=prepareData(this);var $s=$t.settings;if(!isNaN(data.datetime)){if($s.cutoff==0||distance(data.datetime)<$s.cutoff){$(this).text(inWords(data.datetime))}}return this}function prepareData(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if($t.settings.localeTitle){element.attr("title",element.data("timeago").datetime.toLocaleString())}else if(text.length>0&&!($t.isTime(element)&&element.attr("title"))){element.attr("title",text)}}return element.data("timeago")}function inWords(date){return $t.inWords(distance(date))}function distance(date){return(new Date).getTime()-date.getTime()}document.createElement("abbr");document.createElement("time")});
/**
 * Bootstrap.js by @fat & @mdo
 * plugins: bootstrap-transition.js, bootstrap-dropdown.js, bootstrap-alert.js, bootstrap-collapse.js, bootstrap-carousel.js
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
!function(a) {
    a(function() {
        a.support.transition = function() {
            var a = function() {
                var a = document.createElement("bootstrap"), b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"}, c;
                for (c in b)
                    if (a.style[c] !== undefined)
                        return b[c]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function(a) {
    function d() {
        a(".dropdown-backdrop").remove(), a(b).each(function() {
            e(a(this)).removeClass("open")
        })
    }
    function e(b) {
        var c = b.attr("data-target"), d;
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")), d = c && a(c);
        if (!d || !d.length)
            d = b.parent();
        return d
    }
    var b = "[data-toggle=dropdown]", c = function(b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function() {
            c.parent().removeClass("open")
        })
    };
    c.prototype = {constructor: c, toggle: function(b) {
            var c = a(this), f, g;
            if (c.is(".disabled, :disabled"))
                return;
            return f = e(c), g = f.hasClass("open"), d(), g || ("ontouchstart"in document.documentElement && a('<div class="dropdown-backdrop"/>').insertBefore(a(this)).on("click", d), f.toggleClass("open")), c.focus(), !1
        }, keydown: function(c) {
            var d, f, g, h, i, j;
            if (!/(38|40|27)/.test(c.keyCode))
                return;
            d = a(this), c.preventDefault(), c.stopPropagation();
            if (d.is(".disabled, :disabled"))
                return;
            h = e(d), i = h.hasClass("open");
            if (!i || i && c.keyCode == 27)
                return c.which == 27 && h.find(b).focus(), d.click();
            f = a("[role=menu] li:not(.divider):visible a", h);
            if (!f.length)
                return;
            j = f.index(f.filter(":focus")), c.keyCode == 38 && j > 0 && j--, c.keyCode == 40 && j < f.length - 1 && j++, ~j || (j = 0), f.eq(j).focus()
        }};
    var f = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("dropdown");
            e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.dropdown.Constructor = c, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = f, this
    }, a(document).on("click.dropdown.data-api", d).on("click.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.dropdown.data-api", b, c.prototype.toggle).on("keydown.dropdown.data-api", b + ", [role=menu]", c.prototype.keydown)
}(window.jQuery), !function(a) {
    var b = '[data-dismiss="alert"]', c = function(c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function(b) {
        function f() {
            e.trigger("closed").remove()
        }
        var c = a(this), d = c.attr("data-target"), e;
        d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), e = a(d), b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger(b = a.Event("close"));
        if (b.isDefaultPrevented())
            return;
        e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.on(a.support.transition.end, f) : f()
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("alert");
            e || d.data("alert", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
        return a.fn.alert = d, this
    }, a(document).on("click.alert.data-api", b, c.prototype.close)
}(window.jQuery), !function(a) {
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.prototype = {constructor: b, dimension: function() {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height"
        }, show: function() {
            var b, c, d, e;
            if (this.transitioning || this.$element.hasClass("in"))
                return;
            b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (d && d.length) {
                e = d.data("collapse");
                if (e && e.transitioning)
                    return;
                d.collapse("hide"), e || d.data("collapse", null)
            }
            this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), a.support.transition && this.$element[b](this.$element[0][c])
        }, hide: function() {
            var b;
            if (this.transitioning || !this.$element.hasClass("in"))
                return;
            b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0)
        }, reset: function(a) {
            var b = this.dimension();
            return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[a !== null ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function(b, c, d) {
            var e = this, f = function() {
                c.type == "show" && e.reset(), e.transitioning = 0, e.$element.trigger(d)
            };
            this.$element.trigger(c);
            if (c.isDefaultPrevented())
                return;
            this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f()
        }, toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }};
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("collapse"), f = a.extend({}, a.fn.collapse.defaults, d.data(), typeof c == "object" && c);
            e || d.data("collapse", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c, this
    }, a(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c = a(this), d, e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), f = a(e).data("collapse") ? "toggle" : c.data();
        c[a(e).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), a(e).collapse(f)
    })
}(window.jQuery), !function(a) {
    var b = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.options.pause == "hover" && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.prototype = {cycle: function(b) {
            return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
        }, getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        }, to: function(b) {
            var c = this.getActiveIndex(), d = this;
            if (b > this.$items.length - 1 || b < 0)
                return;
            return this.sliding ? this.$element.one("slid", function() {
                d.to(b)
            }) : c == b ? this.pause().cycle() : this.slide(b > c ? "next" : "prev", a(this.$items[b]))
        }, pause: function(b) {
            return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        }, next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        }, prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        }, slide: function(b, c) {
            var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = b == "next" ? "left" : "right", h = b == "next" ? "first" : "last", i = this, j;
            this.sliding = !0, f && this.pause(), e = e.length ? e : this.$element.find(".item")[h](), j = a.Event("slide", {relatedTarget: e[0], direction: g});
            if (e.hasClass("active"))
                return;
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                var b = a(i.$indicators.children()[i.getActiveIndex()]);
                b && b.addClass("active")
            }));
            if (a.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(j);
                if (j.isDefaultPrevented())
                    return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), this.$element.one(a.support.transition.end, function() {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                        i.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(j);
                if (j.isDefaultPrevented())
                    return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }};
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("carousel"), f = a.extend({}, a.fn.carousel.defaults, typeof c == "object" && c), g = typeof c == "string" ? c : f.slide;
            e || d.data("carousel", e = new b(this, f)), typeof c == "number" ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c, this
    }, a(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
        var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), c.data()), g;
        e.carousel(f), (g = c.attr("data-slide-to")) && e.data("carousel").pause().to(g).cycle(), b.preventDefault()
    })
}(window.jQuery);

/**
 * jquery.Jcrop.min.js v0.9.12 (build:20130202)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */
(function(a) {
    a.Jcrop = function(b, c) {
        function i(a) {
            return Math.round(a) + "px"
        }
        function j(a) {
            return d.baseClass + "-" + a
        }
        function k() {
            return a.fx.step.hasOwnProperty("backgroundColor")
        }
        function l(b) {
            var c = a(b).offset();
            return[c.left, c.top]
        }
        function m(a) {
            return[a.pageX - e[0], a.pageY - e[1]]
        }
        function n(b) {
            typeof b != "object" && (b = {}), d = a.extend(d, b), a.each(["onChange", "onSelect", "onRelease", "onDblClick"], function(a, b) {
                typeof d[b] != "function" && (d[b] = function() {
                })
            })
        }
        function o(a, b, c) {
            e = l(D), bc.setCursor(a === "move" ? a : a + "-resize");
            if (a === "move")
                return bc.activateHandlers(q(b), v, c);
            var d = _.getFixed(), f = r(a), g = _.getCorner(r(f));
            _.setPressed(_.getCorner(f)), _.setCurrent(g), bc.activateHandlers(p(a, d), v, c)
        }
        function p(a, b) {
            return function(c) {
                if (!d.aspectRatio)
                    switch (a) {
                        case"e":
                            c[1] = b.y2;
                            break;
                        case"w":
                            c[1] = b.y2;
                            break;
                        case"n":
                            c[0] = b.x2;
                            break;
                        case"s":
                            c[0] = b.x2
                    }
                else
                    switch (a) {
                        case"e":
                            c[1] = b.y + 1;
                            break;
                        case"w":
                            c[1] = b.y + 1;
                            break;
                        case"n":
                            c[0] = b.x + 1;
                            break;
                        case"s":
                            c[0] = b.x + 1
                    }
                _.setCurrent(c), bb.update()
            }
        }
        function q(a) {
            var b = a;
            return bd.watchKeys
                    (), function(a) {
                _.moveOffset([a[0] - b[0], a[1] - b[1]]), b = a, bb.update()
            }
        }
        function r(a) {
            switch (a) {
                case"n":
                    return"sw";
                case"s":
                    return"nw";
                case"e":
                    return"nw";
                case"w":
                    return"ne";
                case"ne":
                    return"sw";
                case"nw":
                    return"se";
                case"se":
                    return"nw";
                case"sw":
                    return"ne"
                }
        }
        function s(a) {
            return function(b) {
                return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = l(D), W = !0, o(a, m(b)), b.stopPropagation(), b.preventDefault(), !1)
            }
        }
        function t(a, b, c) {
            var d = a.width(), e = a.height();
            d > b && b > 0 && (d = b, e = b / a.width() * a.height()), e > c && c > 0 && (e = c, d = c / a.height() * a.width()), T = a.width() / d, U = a.height() / e, a.width(d).height(e)
        }
        function u(a) {
            return{x: a.x * T, y: a.y * U, x2: a.x2 * T, y2: a.y2 * U, w: a.w * T, h: a.h * U}
        }
        function v(a) {
            var b = _.getFixed();
            b.w > d.minSelect[0] && b.h > d.minSelect[1] ? (bb.enableHandles(), bb.done()) : bb.release(), bc.setCursor(d.allowSelect ? "crosshair" : "default")
        }
        function w(a) {
            if (d.disabled)
                return!1;
            if (!d.allowSelect)
                return!1;
            W = !0, e = l(D), bb.disableHandles(), bc.setCursor("crosshair");
            var b = m(a);
            return _.setPressed(b), bb.update(), bc.activateHandlers(x, v, a.type.substring
                    (0, 5) === "touch"), bd.watchKeys(), a.stopPropagation(), a.preventDefault(), !1
        }
        function x(a) {
            _.setCurrent(a), bb.update()
        }
        function y() {
            var b = a("<div></div>").addClass(j("tracker"));
            return g && b.css({opacity: 0, backgroundColor: "white"}), b
        }
        function be(a) {
            G.removeClass().addClass(j("holder")).addClass(a)
        }
        function bf(a, b) {
            function t() {
                window.setTimeout(u, l)
            }
            var c = a[0] / T, e = a[1] / U, f = a[2] / T, g = a[3] / U;
            if (X)
                return;
            var h = _.flipCoords(c, e, f, g), i = _.getFixed(), j = [i.x, i.y, i.x2, i.y2], k = j, l = d.animationDelay, m = h[0] - j[0], n = h[1] - j[1], o = h[2] - j[2], p = h[3] - j[3], q = 0, r = d.swingSpeed;
            c = k[0], e = k[1], f = k[2], g = k[3], bb.animMode(!0);
            var s, u = function() {
                return function() {
                    q += (100 - q) / r, k[0] = Math.round(c + q / 100 * m), k[1] = Math.round(e + q / 100 * n), k[2] = Math.round(f + q / 100 * o), k[3] = Math.round(g + q / 100 * p), q >= 99.8 && (q = 100), q < 100 ? (bh(k), t()) : (bb.done(), bb.animMode(!1), typeof b == "function" && b.call(bs))
                }
            }();
            t()
        }
        function bg(a) {
            bh([a[0] / T, a[1] / U, a[2] / T, a[3] / U]), d.onSelect.call(bs, u(_.getFixed())), bb.enableHandles()
        }
        function bh(a) {
            _.setPressed([a[0], a[1]]), _.setCurrent([a[2],
                a[3]]), bb.update()
        }
        function bi() {
            return u(_.getFixed())
        }
        function bj() {
            return _.getFixed()
        }
        function bk(a) {
            n(a), br()
        }
        function bl() {
            d.disabled = !0, bb.disableHandles(), bb.setCursor("default"), bc.setCursor("default")
        }
        function bm() {
            d.disabled = !1, br()
        }
        function bn() {
            bb.done(), bc.activateHandlers(null, null)
        }
        function bo() {
            G.remove(), A.show(), A.css("visibility", "visible"), a(b).removeData("Jcrop")
        }
        function bp(a, b) {
            bb.release(), bl();
            var c = new Image;
            c.onload = function() {
                var e = c.width, f = c.height, g = d.boxWidth, h = d.boxHeight;
                D.width(e).height(f), D.attr("src", a), H.attr("src", a), t(D, g, h), E = D.width(), F = D.height(), H.width(E).height(F), M.width(E + L * 2).height(F + L * 2), G.width(E).height(F), ba.resize(E, F), bm(), typeof b == "function" && b.call(bs)
            }, c.src = a
        }
        function bq(a, b, c) {
            var e = b || d.bgColor;
            d.bgFade && k() && d.fadeTime && !c ? a.animate({backgroundColor: e}, {queue: !1, duration: d.fadeTime}) : a.css("backgroundColor", e)
        }
        function br(a) {
            d.allowResize ? a ? bb.enableOnly() : bb.enableHandles() : bb.disableHandles(), bc.setCursor(d.allowSelect ? "crosshair" : "default"), bb
                    .setCursor(d.allowMove ? "move" : "default"), d.hasOwnProperty("trueSize") && (T = d.trueSize[0] / E, U = d.trueSize[1] / F), d.hasOwnProperty("setSelect") && (bg(d.setSelect), bb.done(), delete d.setSelect), ba.refresh(), d.bgColor != N && (bq(d.shade ? ba.getShades() : G, d.shade ? d.shadeColor || d.bgColor : d.bgColor), N = d.bgColor), O != d.bgOpacity && (O = d.bgOpacity, d.shade ? ba.refresh() : bb.setBgOpacity(O)), P = d.maxSize[0] || 0, Q = d.maxSize[1] || 0, R = d.minSize[0] || 0, S = d.minSize[1] || 0, d.hasOwnProperty("outerImage") && (D.attr("src", d.outerImage), delete d.outerImage), bb.refresh()
        }
        var d = a.extend({}, a.Jcrop.defaults), e, f = navigator.userAgent.toLowerCase(), g = /msie/.test(f), h = /msie [1-6]\./.test(f);
        typeof b != "object" && (b = a(b)[0]), typeof c != "object" && (c = {}), n(c);
        var z = {border: "none", visibility: "visible", margin: 0, padding: 0, position: "absolute", top: 0, left: 0}, A = a(b), B = !0;
        if (b.tagName == "IMG") {
            if (A[0].width != 0 && A[0].height != 0)
                A.width(A[0].width), A.height(A[0].height);
            else {
                var C = new Image;
                C.src = A[0].src, A.width(C.width), A.height(C.height)
            }
            var D = A.clone().removeAttr("id").
                    css(z).show();
            D.width(A.width()), D.height(A.height()), A.after(D).hide()
        } else
            D = A.css(z).show(), B = !1, d.shade === null && (d.shade = !0);
        t(D, d.boxWidth, d.boxHeight);
        var E = D.width(), F = D.height(), G = a("<div />").width(E).height(F).addClass(j("holder")).css({position: "relative", backgroundColor: d.bgColor}).insertAfter(A).append(D);
        d.addClass && G.addClass(d.addClass);
        var H = a("<div />"), I = a("<div />").width("100%").height("100%").css({zIndex: 310, position: "absolute", overflow: "hidden"}), J = a("<div />").width("100%").height("100%").css("zIndex", 320), K = a("<div />").css({position: "absolute", zIndex: 600}).dblclick(function() {
            var a = _.getFixed();
            d.onDblClick.call(bs, a)
        }).insertBefore(D).append(I, J);
        B && (H = a("<img />").attr("src", D.attr("src")).css(z).width(E).height(F), I.append(H)), h && K.css({overflowY: "hidden"});
        var L = d.boundary, M = y().width(E + L * 2).height(F + L * 2).css({position: "absolute", top: i(-L), left: i(-L), zIndex: 290}).mousedown(w), N = d.bgColor, O = d.bgOpacity, P, Q, R, S, T, U, V = !0, W, X, Y;
        e = l(D);
        var Z = function() {
            function a() {
                var a = {}, b = ["touchstart"
                            , "touchmove", "touchend"], c = document.createElement("div"), d;
                try {
                    for (d = 0; d < b.length; d++) {
                        var e = b[d];
                        e = "on" + e;
                        var f = e in c;
                        f || (c.setAttribute(e, "return;"), f = typeof c[e] == "function"), a[b[d]] = f
                    }
                    return a.touchstart && a.touchend && a.touchmove
                } catch (g) {
                    return!1
                }
            }
            function b() {
                return d.touchSupport === !0 || d.touchSupport === !1 ? d.touchSupport : a()
            }
            return{createDragger: function(a) {
                    return function(b) {
                        return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = l(D), W = !0, o(a, m(Z.cfilter(b)), !0), b.stopPropagation(), b.preventDefault(), !1)
                    }
                }, newSelection: function(a) {
                    return w(Z.cfilter(a))
                }, cfilter: function(a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, a
                }, isSupported: a, support: b()}
        }(), _ = function() {
            function h(d) {
                d = n(d), c = a = d[0], e = b = d[1]
            }
            function i(a) {
                a = n(a), f = a[0] - c, g = a[1] - e, c = a[0], e = a[1]
            }
            function j() {
                return[f, g]
            }
            function k(d) {
                var f = d[0], g = d[1];
                0 > a + f && (f -= f + a), 0 > b + g && (g -= g + b), F < e + g && (g += F - (e + g)), E < c + f && (f += E - (c + f)), a += f, c += f, b += g, e += g
            }
            function l(a) {
                var b = m();
                switch (a) {
                    case"ne":
                        return[
                            b.x2, b.y];
                    case"nw":
                        return[b.x, b.y];
                    case"se":
                        return[b.x2, b.y2];
                    case"sw":
                        return[b.x, b.y2]
                    }
            }
            function m() {
                if (!d.aspectRatio)
                    return p();
                var f = d.aspectRatio, g = d.minSize[0] / T, h = d.maxSize[0] / T, i = d.maxSize[1] / U, j = c - a, k = e - b, l = Math.abs(j), m = Math.abs(k), n = l / m, r, s, t, u;
                return h === 0 && (h = E * 10), i === 0 && (i = F * 10), n < f ? (s = e, t = m * f, r = j < 0 ? a - t : t + a, r < 0 ? (r = 0, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b) : r > E && (r = E, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b)) : (r = c, u = l / f, s = k < 0 ? b - u : b + u, s < 0 ? (s = 0, t = Math.abs((s - b) * f), r = j < 0 ? a - t : t + a) : s > F && (s = F, t = Math.abs(s - b) * f, r = j < 0 ? a - t : t + a)), r > a ? (r - a < g ? r = a + g : r - a > h && (r = a + h), s > b ? s = b + (r - a) / f : s = b - (r - a) / f) : r < a && (a - r < g ? r = a - g : a - r > h && (r = a - h), s > b ? s = b + (a - r) / f : s = b - (a - r) / f), r < 0 ? (a -= r, r = 0) : r > E && (a -= r - E, r = E), s < 0 ? (b -= s, s = 0) : s > F && (b -= s - F, s = F), q(o(a, b, r, s))
            }
            function n(a) {
                return a[0] < 0 && (a[0] = 0), a[1] < 0 && (a[1] = 0), a[0] > E && (a[0] = E), a[1] > F && (a[1] = F), [Math.round(a[0]), Math.round(a[1])]
            }
            function o(a, b, c, d) {
                var e = a, f = c, g = b, h = d;
                return c < a && (e = c, f = a), d < b && (g = d, h = b), [e, g, f, h]
            }
            function p() {
                var d = c - a, f = e - b, g;
                return P && Math.abs(d) > P && (c = d > 0 ? a + P : a - P), Q && Math.abs
                        (f) > Q && (e = f > 0 ? b + Q : b - Q), S / U && Math.abs(f) < S / U && (e = f > 0 ? b + S / U : b - S / U), R / T && Math.abs(d) < R / T && (c = d > 0 ? a + R / T : a - R / T), a < 0 && (c -= a, a -= a), b < 0 && (e -= b, b -= b), c < 0 && (a -= c, c -= c), e < 0 && (b -= e, e -= e), c > E && (g = c - E, a -= g, c -= g), e > F && (g = e - F, b -= g, e -= g), a > E && (g = a - F, e -= g, b -= g), b > F && (g = b - F, e -= g, b -= g), q(o(a, b, c, e))
            }
            function q(a) {
                return{x: a[0], y: a[1], x2: a[2], y2: a[3], w: a[2] - a[0], h: a[3] - a[1]}
            }
            var a = 0, b = 0, c = 0, e = 0, f, g;
            return{flipCoords: o, setPressed: h, setCurrent: i, getOffset: j, moveOffset: k, getCorner: l, getFixed: m}
        }(), ba = function() {
            function f(a, b) {
                e.left.css({height: i(b)}), e.right.css({height: i(b)})
            }
            function g() {
                return h(_.getFixed())
            }
            function h(a) {
                e.top.css({left: i(a.x), width: i(a.w), height: i(a.y)}), e.bottom.css({top: i(a.y2), left: i(a.x), width: i(a.w), height: i(F - a.y2)}), e.right.css({left: i(a.x2), width: i(E - a.x2)}), e.left.css({width: i(a.x)})
            }
            function j() {
                return a("<div />").css({position: "absolute", backgroundColor: d.shadeColor || d.bgColor}).appendTo(c)
            }
            function k() {
                b || (b = !0, c.insertBefore(D), g(), bb.setBgOpacity(1, 0, 1), H.hide(), l(d.shadeColor || d.bgColor, 1), bb.
                        isAwake() ? n(d.bgOpacity, 1) : n(1, 1))
            }
            function l(a, b) {
                bq(p(), a, b)
            }
            function m() {
                b && (c.remove(), H.show(), b = !1, bb.isAwake() ? bb.setBgOpacity(d.bgOpacity, 1, 1) : (bb.setBgOpacity(1, 1, 1), bb.disableHandles()), bq(G, 0, 1))
            }
            function n(a, e) {
                b && (d.bgFade && !e ? c.animate({opacity: 1 - a}, {queue: !1, duration: d.fadeTime}) : c.css({opacity: 1 - a}))
            }
            function o() {
                d.shade ? k() : m(), bb.isAwake() && n(d.bgOpacity)
            }
            function p() {
                return c.children()
            }
            var b = !1, c = a("<div />").css({position: "absolute", zIndex: 240, opacity: 0}), e = {top: j(), left: j().height(F), right: j().height(F), bottom: j()};
            return{update: g, updateRaw: h, getShades: p, setBgColor: l, enable: k, disable: m, resize: f, refresh: o, opacity: n}
        }(), bb = function() {
            function k(b) {
                var c = a("<div />").css({position: "absolute", opacity: d.borderOpacity}).addClass(j(b));
                return I.append(c), c
            }
            function l(b, c) {
                var d = a("<div />").mousedown(s(b)).css({cursor: b + "-resize", position: "absolute", zIndex: c}).addClass("ord-" + b);
                return Z.support && d.bind("touchstart.jcrop", Z.createDragger(b)), J.append(d), d
            }
            function m(a) {
                var b = d.handleSize, e = l(a, c++
                        ).css({opacity: d.handleOpacity}).addClass(j("handle"));
                return b && e.width(b).height(b), e
            }
            function n(a) {
                return l(a, c++).addClass("jcrop-dragbar")
            }
            function o(a) {
                var b;
                for (b = 0; b < a.length; b++)
                    g[a[b]] = n(a[b])
            }
            function p(a) {
                var b, c;
                for (c = 0; c < a.length; c++) {
                    switch (a[c]) {
                        case"n":
                            b = "hline";
                            break;
                        case"s":
                            b = "hline bottom";
                            break;
                        case"e":
                            b = "vline right";
                            break;
                        case"w":
                            b = "vline"
                    }
                    e[a[c]] = k(b)
                }
            }
            function q(a) {
                var b;
                for (b = 0; b < a.length; b++)
                    f[a[b]] = m(a[b])
            }
            function r(a, b) {
                d.shade || H.css({top: i(-b), left: i(-a)}), K.css({top: i(b), left: i(a)})
            }
            function t(a, b) {
                K.width(Math.round(a)).height(Math.round(b))
            }
            function v() {
                var a = _.getFixed();
                _.setPressed([a.x, a.y]), _.setCurrent([a.x2, a.y2]), w()
            }
            function w(a) {
                if (b)
                    return x(a)
            }
            function x(a) {
                var c = _.getFixed();
                t(c.w, c.h), r(c.x, c.y), d.shade && ba.updateRaw(c), b || A(), a ? d.onSelect.call(bs, u(c)) : d.onChange.call(bs, u(c))
            }
            function z(a, c, e) {
                if (!b && !c)
                    return;
                d.bgFade && !e ? D.animate({opacity: a}, {queue: !1, duration: d.fadeTime}) : D.css("opacity", a)
            }
            function A() {
                K.show(), d.shade ? ba.opacity(O) : z(O, !0), b = !0
            }
            function B
                    () {
                F(), K.hide(), d.shade ? ba.opacity(1) : z(1), b = !1, d.onRelease.call(bs)
            }
            function C() {
                h && J.show()
            }
            function E() {
                h = !0;
                if (d.allowResize)
                    return J.show(), !0
            }
            function F() {
                h = !1, J.hide()
            }
            function G(a) {
                a ? (X = !0, F()) : (X = !1, E())
            }
            function L() {
                G(!1), v()
            }
            var b, c = 370, e = {}, f = {}, g = {}, h = !1;
            d.dragEdges && a.isArray(d.createDragbars) && o(d.createDragbars), a.isArray(d.createHandles) && q(d.createHandles), d.drawBorders && a.isArray(d.createBorders) && p(d.createBorders), a(document).bind("touchstart.jcrop-ios", function(b) {
                a(b.currentTarget).hasClass("jcrop-tracker") && b.stopPropagation()
            });
            var M = y().mousedown(s("move")).css({cursor: "move", position: "absolute", zIndex: 360});
            return Z.support && M.bind("touchstart.jcrop", Z.createDragger("move")), I.append(M), F(), {updateVisible: w, update: x, release: B, refresh: v, isAwake: function() {
                    return b
                }, setCursor: function(a) {
                    M.css("cursor", a)
                }, enableHandles: E, enableOnly: function() {
                    h = !0
                }, showHandles: C, disableHandles: F, animMode: G, setBgOpacity: z, done: L}
        }(), bc = function() {
            function f(b) {
                M.css({zIndex: 450}), b ? a(document).bind("touchmove.jcrop"
                        , k).bind("touchend.jcrop", l) : e && a(document).bind("mousemove.jcrop", h).bind("mouseup.jcrop", i)
            }
            function g() {
                M.css({zIndex: 290}), a(document).unbind(".jcrop")
            }
            function h(a) {
                return b(m(a)), !1
            }
            function i(a) {
                return a.preventDefault(), a.stopPropagation(), W && (W = !1, c(m(a)), bb.isAwake() && d.onSelect.call(bs, u(_.getFixed())), g(), b = function() {
                }, c = function() {
                }), !1
            }
            function j(a, d, e) {
                return W = !0, b = a, c = d, f(e), !1
            }
            function k(a) {
                return b(m(Z.cfilter(a))), !1
            }
            function l(a) {
                return i(Z.cfilter(a))
            }
            function n(a) {
                M.css("cursor", a)
            }
            var b = function() {
            }, c = function() {
            }, e = d.trackDocument;
            return e || M.mousemove(h).mouseup(i).mouseout(i), D.before(M), {activateHandlers: j, setCursor: n}
        }(), bd = function() {
            function e() {
                d.keySupport && (b.show(), b.focus())
            }
            function f(a) {
                b.hide()
            }
            function g(a, b, c) {
                d.allowMove && (_.moveOffset([b, c]), bb.updateVisible(!0)), a.preventDefault(), a.stopPropagation()
            }
            function i(a) {
                if (a.ctrlKey || a.metaKey)
                    return!0;
                Y = a.shiftKey ? !0 : !1;
                var b = Y ? 10 : 1;
                switch (a.keyCode) {
                    case 37:
                        g(a, -b, 0);
                        break;
                    case 39:
                        g(a, b, 0);
                        break;
                    case 38:
                        g(a, 0, -b);
                        break;
                    case 40:
                        g(a, 0, b);
                        break;
                    case 27:
                        d.allowSelect && bb.release();
                        break;
                    case 9:
                        return!0
                }
                return!1
            }
            var b = a('<input type="radio" />').css({position: "fixed", left: "-120px", width: "12px"}).addClass("jcrop-keymgr"), c = a("<div />").css({position: "absolute", overflow: "hidden"}).append(b);
            return d.keySupport && (b.keydown(i).blur(f), h || !d.fixedSupport ? (b.css({position: "absolute", left: "-20px"}), c.append(b).insertBefore(D)) : b.insertBefore(D)), {watchKeys: e}
        }();
        Z.support && M.bind("touchstart.jcrop", Z.newSelection), J.hide(), br(!0);
        var bs = {setImage: bp, animateTo: bf, setSelect: bg, setOptions: bk, tellSelect: bi, tellScaled: bj, setClass: be, disable: bl, enable: bm, cancel: bn, release: bb.release, destroy: bo, focus: bd.watchKeys, getBounds: function() {
                return[E * T, F * U]
            }, getWidgetSize: function() {
                return[E, F]
            }, getScaleFactor: function() {
                return[T, U]
            }, getOptions: function() {
                return d
            }, ui: {holder: G, selection: K}};
        return g && G.bind("selectstart", function() {
            return!1
        }), A.data("Jcrop", bs), bs
    }, a.fn.Jcrop = function(b, c) {
        var d;
        return this.each(function() {
            if (a(this).data("Jcrop")) {
                if (
                        b === "api")
                    return a(this).data("Jcrop");
                a(this).data("Jcrop").setOptions(b)
            } else
                this.tagName == "IMG" ? a.Jcrop.Loader(this, function() {
                    a(this).css({display: "block", visibility: "hidden"}), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d)
                }) : (a(this).css({display: "block", visibility: "hidden"}), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d))
        }), this
    }, a.Jcrop.Loader = function(b, c, d) {
        function g() {
            f.complete ? (e.unbind(".jcloader"), a.isFunction(c) && c.call(f)) : window.setTimeout(g, 50)
        }
        var e = a(b), f = e[0];
        e.bind("load.jcloader", g).bind("error.jcloader", function(b) {
            e.unbind(".jcloader"), a.isFunction(d) && d.call(f)
        }), f.complete && a.isFunction(c) && (e.unbind(".jcloader"), c.call(f))
    }, a.Jcrop.defaults = {allowSelect: !0, allowMove: !0, allowResize: !0, trackDocument: !0, baseClass: "jcrop", addClass: null, bgColor: "black", bgOpacity: .6, bgFade: !1, borderOpacity: .4, handleOpacity: .5, handleSize: null, aspectRatio: 0, keySupport: !0, createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"], createDragbars: ["n", "s", "e", "w"], createBorders: ["n", "s", "e", "w"], drawBorders: !0, dragEdges
                : !0, fixedSupport: !0, touchSupport: null, shade: null, boxWidth: 0, boxHeight: 0, boundary: 2, fadeTime: 400, animationDelay: 20, swingSpeed: 3, minSelect: [0, 0], maxSize: [0, 0], minSize: [0, 0], onChange: function() {
        }, onSelect: function() {
        }, onDblClick: function() {
        }, onRelease: function() {
        }}
;}
)(jQuery);

/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);


/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(this,function(t){var n,s;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck"};s=function(t,n){t.wrap(n.wrapper);return t.parent()};t.waypoints("extendFn","sticky",function(e){var i,r,a;r=t.extend({},t.fn.waypoint.defaults,n,e);i=s(this,r);a=r.handler;r.handler=function(n){var s,e;s=t(this).children(":first");e=n==="down"||n==="right";s.toggleClass(r.stuckClass,e);i.height(e?s.outerHeight():"");if(a!=null){return a.call(this,n)}};i.waypoint(r);return this.data("stuckClass",r.stuckClass)});return t.waypoints("extendFn","unsticky",function(){this.parent().waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);

/*!
	Colorbox v1.4.37 - 2014-02-11
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(j+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function s(e,t){return e.photo||e.photoRegex.test(t)}function l(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),st.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),j=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),j=k.index(N),-1===j&&(k=k.add(N),j=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(x):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(lt,"LoadedContent","width:0; height:0; overflow:hidden"),x.css({width:"",height:""}).append(H),O=y.height()+C.height()+x.outerHeight(!0)-x.height(),_=b.width()+T.width()+x.outerWidth(!0)-x.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),st.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&st.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(lt).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(lt,"Overlay").hide(),W=e([o(lt,"LoadingOverlay")[0],o(lt,"LoadingGraphic")[0]]),v=o(lt,"Wrapper"),x=o(lt,"Content").append(L=o(lt,"Title"),S=o(lt,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),W),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(lt).append(o(lt,"TopLeft"),y=o(lt,"TopCenter"),o(lt,"TopRight")),o(lt,!1,"clear:left").append(b=o(lt,"MiddleLeft"),x,T=o(lt,"MiddleRight")),o(lt,!1,"clear:left").append(o(lt,"BottomLeft"),C=o(lt,"BottomCenter"),o(lt,"BottomRight"))).find("div div").css({"float":"left"}),F=o(lt,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,F)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,z=!1,N=k[j],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){W.show()},100),B.inline?(a=o(lt).hide().insertBefore(e(n)[0]),st.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):s(B,n)?(n=l(B,n),z=t.createElement("img"),e(z).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(lt,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&z.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(z.height=z.height/i.devicePixelRatio,z.width=z.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){z.height-=z.height*t,z.width-=z.width*t},B.mw&&z.width>B.mw&&(t=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(t=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.mh-z.height,0)/2+"px"),k[1]&&(B.loop||k[j+1])&&(z.style.cursor="pointer",z.onclick=function(){Q.next()}),z.style.width=z.width+"px",z.style.height=z.height+"px",setTimeout(function(){u(z)},1))}),setTimeout(function(){z.src=n},1)):n&&F.load(n,B.data,function(t,i){f===at&&u("error"===i?o(lt,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,x,y,b,T,C,k,E,H,F,W,L,S,M,R,I,K,P,B,O,_,D,A,N,j,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",st=e("<a/>"),lt="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[j+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(l).one(l,o),st.bind(ot,t).bind(it,e),g.removeClass(s+"off").addClass(s+"on")}function o(){e(),st.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(l).one(l,function(){Q.next(),i()}),g.removeClass(s+"on").addClass(s+"off")}function n(){r=!1,M.hide(),e(),st.unbind(ot,t).unbind(it,e),g.removeClass(s+"off "+s+"on")}var r,h,s=Z+"Slideshow_",l="click."+Z;return function(){r?B.slideshow||(st.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,st.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){y[0].style.width=C[0].style.width=x[0].style.width=parseInt(g[0].style.width,10)-_+"px",x[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,s,l,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),s=E.scrollTop(),l=E.scrollLeft(),B.fixed?(c.top-=s,c.left-=l,g.css({position:"fixed"})):(a=s,d=l,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,function(){Q.position()})},1),e.isFunction(i)&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(lt,"LoadedContent").append(i),H.hide().appendTo(F.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(x),F.hide(),e(z).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),W.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",j+1).replace("{total}",a)).show(),R[B.loop||a-1>j?"show":"hide"]().html(B.next),I[B.loop||j?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&s(r,i)&&(i=l(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),st.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[j+1])&&(j=r(1),u(k[j]))},Q.prev=function(){!$&&k[1]&&(B.loop||j)&&(j=r(-1),u(k[j]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);

/**
 * jQuery Form Params
 */
!function(e) {
    var t = /radio|checkbox/i, a = /[^\[\]]+/g, r = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?$/, n = function(e) {
        return"number" == typeof e ? !0 : "string" != typeof e ? !1 : e.match(r)
    }
    e.fn.extend({formParams: function(e) {
            return"form" === this[0].nodeName.toLowerCase() && this[0].elements ? jQuery(jQuery.makeArray(this[0].elements)).getParams(e) : jQuery("input[name], textarea[name], select[name]", this[0]).getParams(e)
        }, getParams: function(e) {
            var r, o = {}
            return e = void 0 === e ? !0 : e, this.each(function() {
                var i = this, s = i.type && i.type.toLowerCase()
                if ("submit" !== s && i.name) {
                    var u, m = i.name, c = jQuery.data(i, "value") || jQuery.fn.val.call([i]), h = t.test(i.type), f = m.match(a), y = !h || !!i.checked
                    e && (n(c) ? c = parseFloat(c) : ("true" === c || "false" === c) && (c = Boolean(c))), r = o
                    for (var l = 0; l < f.length - 1; l++)
                        r[f[l]] || (r[f[l]] = {}), r = r[f[l]]
                    u = f[f.length - 1], u in r && "checkbox" === s ? (jQuery.isArray(r[u]) || (r[u] = void 0 === r[u] ? [] : [r[u]]), y && r[u].push(c)) : (y || !r[u]) && (r[u] = y ? c : void 0)
                }
            }), o
        }})
}(jQuery);

/**
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * @link http://ricostacruz.com/jquery.transit
 * @link http://github.com/rstacruz/jquery.transit
 */
!function(t) {
    function e(t) {
        if (t in c.style)
            return t
        var e = ["Moz", "Webkit", "O", "ms"], n = t.charAt(0).toUpperCase() + t.substr(1)
        if (t in c.style)
            return t
        for (var i = 0; i < e.length; ++i) {
            var a = e[i] + n
            if (a in c.style)
                return a
        }
    }
    function n() {
        return c.style[p.transform] = "", c.style[p.transform] = "rotateY(90deg)", "" !== c.style[p.transform]
    }
    function i(t) {
        return"string" == typeof t && this.parse(t), this
    }
    function a(t, e, n) {
        e === !0 ? t.queue(n) : e ? t.queue(e, n) : n()
    }
    function r(e) {
        var n = []
        return t.each(e, function(e) {
            e = t.camelCase(e), e = t.transit.propertyMap[e] || t.cssProps[e] || e, e = u(e), -1 === t.inArray(e, n) && n.push(e)
        }), n
    }
    function o(e, n, i, a) {
        var o = r(e)
        t.cssEase[i] && (i = t.cssEase[i])
        var s = "" + d(n) + " " + i
        parseInt(a, 10) > 0 && (s += " " + d(a))
        var u = []
        return t.each(o, function(t, e) {
            u.push(e + " " + s)
        }), u.join(", ")
    }
    function s(e, n) {
        n || (t.cssNumber[e] = !0), t.transit.propertyMap[e] = p.transform, t.cssHooks[e] = {get: function(n) {
                var i = t(n).css("transit:transform")
                return i.get(e)
            }, set: function(n, i) {
                var a = t(n).css("transit:transform")
                a.setFromString(e, i), t(n).css({"transit:transform": a})
            }}
    }
    function u(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return"-" + t.toLowerCase()
        })
    }
    function l(t, e) {
        return"string" != typeof t || t.match(/^[\-0-9\.]+$/) ? "" + t + e : t
    }
    function d(e) {
        var n = e
        return t.fx.speeds[n] && (n = t.fx.speeds[n]), l(n, "ms")
    }
    t.transit = {version: "0.9.9", propertyMap: {marginLeft: "margin", marginRight: "margin", marginBottom: "margin", marginTop: "margin", paddingLeft: "padding", paddingRight: "padding", paddingBottom: "padding", paddingTop: "padding"}, enabled: !0, useTransitionEnd: !1}
    var c = document.createElement("div"), p = {}, f = navigator.userAgent.toLowerCase().indexOf("chrome") > -1
    p.transition = e("transition"), p.transitionDelay = e("transitionDelay"), p.transform = e("transform"), p.transformOrigin = e("transformOrigin"), p.transform3d = n()
    var m = {transition: "transitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", WebkitTransition: "webkitTransitionEnd", msTransition: "MSTransitionEnd"}, h = p.transitionEnd = m[p.transition] || null
    for (var g in p)
        p.hasOwnProperty(g) && void 0 === t.support[g] && (t.support[g] = p[g])
    c = null, t.cssEase = {_default: "ease", "in": "ease-in", out: "ease-out", "in-out": "ease-in-out", snap: "cubic-bezier(0,1,.5,1)", easeOutCubic: "cubic-bezier(.215,.61,.355,1)", easeInOutCubic: "cubic-bezier(.645,.045,.355,1)", easeInCirc: "cubic-bezier(.6,.04,.98,.335)", easeOutCirc: "cubic-bezier(.075,.82,.165,1)", easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)", easeInExpo: "cubic-bezier(.95,.05,.795,.035)", easeOutExpo: "cubic-bezier(.19,1,.22,1)", easeInOutExpo: "cubic-bezier(1,0,0,1)", easeInQuad: "cubic-bezier(.55,.085,.68,.53)", easeOutQuad: "cubic-bezier(.25,.46,.45,.94)", easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)", easeInQuart: "cubic-bezier(.895,.03,.685,.22)", easeOutQuart: "cubic-bezier(.165,.84,.44,1)", easeInOutQuart: "cubic-bezier(.77,0,.175,1)", easeInQuint: "cubic-bezier(.755,.05,.855,.06)", easeOutQuint: "cubic-bezier(.23,1,.32,1)", easeInOutQuint: "cubic-bezier(.86,0,.07,1)", easeInSine: "cubic-bezier(.47,0,.745,.715)", easeOutSine: "cubic-bezier(.39,.575,.565,1)", easeInOutSine: "cubic-bezier(.445,.05,.55,.95)", easeInBack: "cubic-bezier(.6,-.28,.735,.045)", easeOutBack: "cubic-bezier(.175, .885,.32,1.275)", easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"}, t.cssHooks["transit:transform"] = {get: function(e) {
            return t(e).data("transform") || new i
        }, set: function(e, n) {
            var a = n
            a instanceof i || (a = new i(a)), e.style[p.transform] = "WebkitTransform" !== p.transform || f ? "" + a : a.toString(!0), t(e).data("transform", a)
        }}, t.cssHooks.transform = {set: t.cssHooks["transit:transform"].set}, t.fn.jquery < "1.8" && (t.cssHooks.transformOrigin = {get: function(t) {
            return t.style[p.transformOrigin]
        }, set: function(t, e) {
            t.style[p.transformOrigin] = e
        }}, t.cssHooks.transition = {get: function(t) {
            return t.style[p.transition]
        }, set: function(t, e) {
            t.style[p.transition] = e
        }}), s("scale"), s("translate"), s("rotate"), s("rotateX"), s("rotateY"), s("rotate3d"), s("perspective"), s("skewX"), s("skewY"), s("x", !0), s("y", !0), i.prototype = {setFromString: function(t, e) {
            var n = "string" == typeof e ? e.split(",") : e.constructor === Array ? e : [e]
            n.unshift(t), i.prototype.set.apply(this, n)
        }, set: function(t) {
            var e = Array.prototype.slice.apply(arguments, [1])
            this.setter[t] ? this.setter[t].apply(this, e) : this[t] = e.join(",")
        }, get: function(t) {
            return this.getter[t] ? this.getter[t].apply(this) : this[t] || 0
        }, setter: {rotate: function(t) {
                this.rotate = l(t, "deg")
            }, rotateX: function(t) {
                this.rotateX = l(t, "deg")
            }, rotateY: function(t) {
                this.rotateY = l(t, "deg")
            }, scale: function(t, e) {
                void 0 === e && (e = t), this.scale = t + "," + e
            }, skewX: function(t) {
                this.skewX = l(t, "deg")
            }, skewY: function(t) {
                this.skewY = l(t, "deg")
            }, perspective: function(t) {
                this.perspective = l(t, "px")
            }, x: function(t) {
                this.set("translate", t, null)
            }, y: function(t) {
                this.set("translate", null, t)
            }, translate: function(t, e) {
                void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== t && void 0 !== t && (this._translateX = l(t, "px")), null !== e && void 0 !== e && (this._translateY = l(e, "px")), this.translate = this._translateX + "," + this._translateY
            }}, getter: {x: function() {
                return this._translateX || 0
            }, y: function() {
                return this._translateY || 0
            }, scale: function() {
                var t = (this.scale || "1,1").split(",")
                return t[0] && (t[0] = parseFloat(t[0])), t[1] && (t[1] = parseFloat(t[1])), t[0] === t[1] ? t[0] : t
            }, rotate3d: function() {
                for (var t = (this.rotate3d || "0,0,0,0deg").split(","), e = 0; 3 >= e; ++e)
                    t[e] && (t[e] = parseFloat(t[e]))
                return t[3] && (t[3] = l(t[3], "deg")), t
            }}, parse: function(t) {
            var e = this
            t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(t, n, i) {
                e.setFromString(n, i)
            })
        }, toString: function(t) {
            var e = []
            for (var n in this)
                if (this.hasOwnProperty(n)) {
                    if (!p.transform3d && ("rotateX" === n || "rotateY" === n || "perspective" === n || "transformOrigin" === n))
                        continue
                    "_" !== n[0] && (t && "scale" === n ? e.push(n + "3d(" + this[n] + ",1)") : t && "translate" === n ? e.push(n + "3d(" + this[n] + ",0)") : e.push(n + "(" + this[n] + ")"))
                }
            return e.join(" ")
        }}, t.fn.transition = t.fn.transit = function(e, n, i, r) {
        var s = this, u = 0, l = !0
        "function" == typeof n && (r = n, n = void 0), "function" == typeof i && (r = i, i = void 0), void 0 !== e.easing && (i = e.easing, delete e.easing), void 0 !== e.duration && (n = e.duration, delete e.duration), void 0 !== e.complete && (r = e.complete, delete e.complete), void 0 !== e.queue && (l = e.queue, delete e.queue), void 0 !== e.delay && (u = e.delay, delete e.delay), void 0 === n && (n = t.fx.speeds._default), void 0 === i && (i = t.cssEase._default), n = d(n)
        var c = o(e, n, i, u), f = t.transit.enabled && p.transition, m = f ? parseInt(n, 10) + parseInt(u, 10) : 0
        if (0 === m) {
            var g = function(t) {
                s.css(e), r && r.apply(s), t && t()
            }
            return a(s, l, g), s
        }
        var b = {}, v = function(n) {
            var i = !1, a = function() {
                i && s.unbind(h, a), m > 0 && s.each(function() {
                    this.style[p.transition] = b[this] || null
                }), "function" == typeof r && r.apply(s), "function" == typeof n && n()
            }
            m > 0 && h && t.transit.useTransitionEnd ? (i = !0, s.bind(h, a)) : window.setTimeout(a, m), s.each(function() {
                m > 0 && (this.style[p.transition] = c), t(this).css(e)
            })
        }, y = function(t) {
            this.offsetWidth, v(t)
        }
        return a(s, l, y), this
    }, t.transit.getTransitionValue = o
}(window.jQuery || window.Zepto);

/*
== malihu jquery custom scrollbars plugin ==
version: 2.8.2
author: malihu (http://manos.malihu.gr)
plugin home: http://manos.malihu.gr/jquery-custom-content-scroller
*/

/*
Copyright 2010-2013 Manos Malihutsakis

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program. If not, see http://www.gnu.org/licenses/lgpl.html.
*/
(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,snapAmount:null,snapOffset:0,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"mcsEaseOut",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,snapAmount:e.snapAmount,snapOffset:e.snapOffset,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=true}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}y.css("display","none");q.addClass("mCS_no_scrollbar");n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(h,p,m,j,w,e,A,v){var k=c(this);if(!k.data("bindEvent_scrollbar_drag")){var n,o;if(c.support.msPointer){j.bind("MSPointerDown",function(H){H.preventDefault();k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");var G=c(this),J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;if(F<G.width()&&F>0&&I<G.height()&&I>0){n=I;o=F}});c(document).bind("MSPointerMove."+k.data("mCustomScrollbarIndex"),function(H){H.preventDefault();if(k.data("on_drag")){var G=j,J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;D(n,o,I,F)}}).bind("MSPointerUp."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}else{j.bind("mousedown touchstart",function(H){H.preventDefault();H.stopImmediatePropagation();var G=c(this),K=G.offset(),F,J;if(H.type==="touchstart"){var I=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0];F=I.pageX-K.left;J=I.pageY-K.top}else{k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");F=H.pageX-K.left;J=H.pageY-K.top}if(F<G.width()&&F>0&&J<G.height()&&J>0){n=J;o=F}}).bind("touchmove",function(H){H.preventDefault();H.stopImmediatePropagation();var K=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0],G=c(this),J=G.offset(),F=K.pageX-J.left,I=K.pageY-J.top;D(n,o,I,F)});c(document).bind("mousemove."+k.data("mCustomScrollbarIndex"),function(H){if(k.data("on_drag")){var G=j,J=G.offset(),F=H.pageX-J.left,I=H.pageY-J.top;D(n,o,I,F)}}).bind("mouseup."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}k.data({bindEvent_scrollbar_drag:true})}function D(G,H,I,F){if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",(j.position().left-(H))+F,{moveDragger:true,trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",(j.position().top-(G))+I,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&k.data("contentTouchScroll")){if(!k.data("bindEvent_content_touch")){var l,B,r,s,u,C,E;p.bind("touchstart",function(x){x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this);r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;C=s;E=u});p.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this).parent();r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",E-u,{trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",C-s,{trigger:"internal"})}})}}if(!k.data("bindEvent_scrollbar_click")){m.bind("click",function(F){var x=(F.pageY-m.offset().top)*k.data("scrollAmount"),y=c(F.target);if(k.data("horizontalScroll")){x=(F.pageX-m.offset().left)*k.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){k.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});k.data({bindEvent_scrollbar_click:true})}if(k.data("mouseWheel")){if(!k.data("bindEvent_mousewheel")){h.bind("mousewheel",function(H,J){var G,F=k.data("mouseWheelPixels"),x=Math.abs(p.position().top),I=j.position().top,y=m.height()-j.height();if(k.data("normalizeMouseWheelDelta")){if(J<0){J=-1}else{J=1}}if(F==="auto"){F=100+Math.round(k.data("scrollAmount")/2)}if(k.data("horizontalScroll")){I=j.position().left;y=m.width()-j.width();x=Math.abs(p.position().left)}if((J>0&&I!==0)||(J<0&&I!==y)){H.preventDefault();H.stopImmediatePropagation()}G=x-(J*F);k.mCustomScrollbar("scrollTo",G,{trigger:"internal"})});k.data({bindEvent_mousewheel:true})}}if(k.data("scrollButtons_enable")){if(k.data("scrollButtons_scrollType")==="pixels"){if(k.data("horizontalScroll")){v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_x:false});if(!k.data("bindEvent_buttonsPixels_x")){v.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)+k.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_x:true})}}else{e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_y:false});if(!k.data("bindEvent_buttonsPixels_y")){e.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)+k.data("scrollButtons_scrollAmount"))});w.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_y:true})}}function q(x){if(!j.data("preventAction")){j.data("preventAction",true);k.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(k.data("horizontalScroll")){v.add(A).unbind("click");k.data({bindEvent_buttonsPixels_x:false});if(!k.data("bindEvent_buttonsContinuous_x")){v.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollRight:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var i=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollRight"))};v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",i);A.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollLeft:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollLeft"))};A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",g);k.data({bindEvent_buttonsContinuous_x:true})}}else{e.add(w).unbind("click");k.data({bindEvent_buttonsPixels_y:false});if(!k.data("bindEvent_buttonsContinuous_y")){e.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollDown:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var t=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollDown"))};e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",t);w.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollUp:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var f=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollUp"))};w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",f);k.data({bindEvent_buttonsContinuous_y:true})}}function z(){var x=k.data("scrollButtons_scrollSpeed");if(k.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((k.data("scrollInertia")+100)/40)}return x}}}if(k.data("autoScrollOnFocus")){if(!k.data("bindEvent_focusin")){h.bind("focusin",function(){h.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var G=p.position().top,y=x.position().top,F=h.height()-x.outerHeight();if(k.data("horizontalScroll")){G=p.position().left;y=x.position().left;F=h.width()-x.outerWidth()}if(G+y<0||G+y>F){k.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});k.data({bindEvent_focusin:true})}}if(k.data("autoHideScrollbar")){if(!k.data("bindEvent_autoHideScrollbar")){h.bind("mouseenter",function(x){h.addClass("mCS-mouse-over");d.showScrollbar.call(h.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){h.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(h.children(".mCSB_scrollTools"))}});k.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(e,f){var i=c(this),o={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:i.data("scrollInertia"),scrollEasing:i.data("scrollEasing")},f=c.extend(o,f),p,g=i.children(".mCustomScrollBox"),k=g.children(".mCSB_container"),r=g.children(".mCSB_scrollTools"),j=r.children(".mCSB_draggerContainer"),h=j.children(".mCSB_dragger"),t=draggerSpeed=f.scrollInertia,q,s,m,l;if(!k.hasClass("mCS_no_scrollbar")){i.data({mCS_trigger:f.trigger});if(i.data("mCS_Init")){f.callbacks=false}if(e||e===0){if(typeof(e)==="number"){if(f.moveDragger){p=e;if(i.data("horizontalScroll")){e=h.position().left*i.data("scrollAmount")}else{e=h.position().top*i.data("scrollAmount")}draggerSpeed=0}else{p=e/i.data("scrollAmount")}}else{if(typeof(e)==="string"){var v;if(e==="top"){v=0}else{if(e==="bottom"&&!i.data("horizontalScroll")){v=k.outerHeight()-g.height()}else{if(e==="left"){v=0}else{if(e==="right"&&i.data("horizontalScroll")){v=k.outerWidth()-g.width()}else{if(e==="first"){v=i.find(".mCSB_container").find(":first")}else{if(e==="last"){v=i.find(".mCSB_container").find(":last")}else{v=i.find(e)}}}}}}if(v.length===1){if(i.data("horizontalScroll")){e=v.position().left}else{e=v.position().top}p=e/i.data("scrollAmount")}else{p=e=v}}}if(i.data("horizontalScroll")){if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.width()-k.outerWidth()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollLeft"));if(!s){q=true}}else{if(p>=j.width()-h.width()){p=j.width()-h.width();e=g.width()-k.outerWidth();clearInterval(i.data("mCSB_buttonScrollRight"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"left",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"left",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().left>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().left<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}else{if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.height()-k.outerHeight()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollUp"));if(!s){q=true}}else{if(p>=j.height()-h.height()){p=j.height()-h.height();e=g.height()-k.outerHeight();clearInterval(i.data("mCSB_buttonScrollDown"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"top",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"top",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().top>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().top<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}if(i.data("mCS_Init")){i.data({mCS_Init:false})}}}function u(w){this.mcs={top:k.position().top,left:k.position().left,draggerTop:h.position().top,draggerLeft:h.position().left,topPct:Math.round((100*Math.abs(k.position().top))/Math.abs(k.outerHeight()-g.height())),leftPct:Math.round((100*Math.abs(k.position().left))/Math.abs(k.outerWidth()-g.width()))};switch(w){case"onScrollStart":i.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(i,this.mcs);break;case"whileScrolling":i.data("whileScrolling_Callback").call(i,this.mcs);break;case"onScroll":i.data("onScroll_Callback").call(i,this.mcs);break;case"onTotalScrollBack":i.data("onTotalScrollBack_Callback").call(i,this.mcs);break;case"onTotalScroll":i.data("onTotalScroll_Callback").call(i,this.mcs);break}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.msPointer=window.navigator.msPointerEnabled;var a=("https:"==document.location.protocol)?"https:":"http:";c.event.special.mousewheel||document.write('<script src="'+a+'//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);


/**
 * Boostrap Growl
 * @link https://github.com/ifightcrime/bootstrap-growl
 */
!function() {
    !function(t) {
        return t.bootstrapGrowl = function(e, i) {
            var n, a, r
            switch (i = t.extend( {
                }, t.bootstrapGrowl.default_options, i), n = t("<div>"), n.attr("class", "bootstrap-growl alert"), i.type && n.addClass("alert-" + i.type), i.allow_dismiss && n.append('<a class="close" data-dismiss="alert" href="#">&times;</a>'), n.append(e), i.top_offset && (i.offset = {from: "top", amount: i.top_offset}), r = i.offset.amount, t(".bootstrap-growl").each(function() {
                    return r = Math.max(r, parseInt(t(this).css(i.offset.from)) + t(this).outerHeight() + i.stackup_spacing)
                }), a = {position: "body" === i.ele ? "fixed" : "absolute", margin: 0, "z-index": "9999", display: "none"}, a[i.offset.from] = r + "px", n.css(a), "auto" !== i.width && n.css("width", i.width + "px"), t(i.ele).append(n), i.align){case"center":
                    n.css({left: "50%", "margin-left": "-" + n.outerWidth() / 2 + "px"})
                    break
                case"left":
                    n.css("left", "20px")
                    break
                default:
                    n.css("right", "20px")
            }
            return n.fadeIn(), i.delay > 0 ? n.delay(i.delay).fadeOut(function() {
                return t(this).remove()
            }) : void 0
        }, t.bootstrapGrowl.default_options = {ele: "body", type: null, offset: {from: "top", amount: 20}, align: "right", width: 250, delay: 4e3, allow_dismiss: !0, stackup_spacing: 10}
    }(jQuery)
}.call(this);

/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2013
 * MIT License
 */
(function(n) {
    var e = [], t = {}, r = "routie", o = n[r], i = function(n, e) {
        this.name = e, this.path = n, this.keys = [], this.fns = [], this.params = {}, this.regex = a(this.path, this.keys, !1, !1)
    };
    i.prototype.addHandler = function(n) {
        this.fns.push(n)
    }, i.prototype.removeHandler = function(n) {
        for (var e = 0, t = this.fns.length; t > e; e++) {
            var r = this.fns[e];
            if (n == r)
                return this.fns.splice(e, 1), void 0
        }
    }, i.prototype.run = function(n) {
        for (var e = 0, t = this.fns.length; t > e; e++)
            this.fns[e].apply(this, n)
    }, i.prototype.match = function(n, e) {
        var t = this.regex.exec(n);
        if (!t)
            return!1;
        for (var r = 1, o = t.length; o > r; ++r) {
            var i = this.keys[r - 1], a = "string" == typeof t[r] ? decodeURIComponent(t[r]) : t[r];
            i && (this.params[i.name] = a), e.push(a)
        }
        return!0
    }, i.prototype.toURL = function(n) {
        var e = this.path;
        for (var t in n)
            e = e.replace("/:" + t, "/" + n[t]);
        if (e = e.replace(/\/:.*\?/g, "/").replace(/\?/g, ""), -1 != e.indexOf(":"))
            throw Error("missing parameters for url: " + e);
        return e
    };
    var a = function(n, e, t, r) {
        return n instanceof RegExp ? n : (n instanceof Array && (n = "(" + n.join("|") + ")"), n = n.concat(r ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(n, t, r, o, i, a) {
            return e.push({name: o, optional: !!a}), t = t || "", "" + (a ? "" : t) + "(?:" + (a ? t : "") + (r || "") + (i || r && "([^/.]+?)" || "([^/]+?)") + ")" + (a || "")
        }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"), RegExp("^" + n + "$", t ? "" : "i"))
    }, s = function(n, r) {
        var o = n.split(" "), a = 2 == o.length ? o[0] : null;
        n = 2 == o.length ? o[1] : o[0], t[n] || (t[n] = new i(n, a), e.push(t[n])), t[n].addHandler(r)
    }, h = function(n, e) {
        if ("function" == typeof e)
            s(n, e), h.reload();
        else if ("object" == typeof n) {
            for (var t in n)
                s(t, n[t]);
            h.reload()
        } else
            e === void 0 && h.navigate(n)
    };
    h.lookup = function(n, t) {
        for (var r = 0, o = e.length; o > r; r++) {
            var i = e[r];
            if (i.name == n)
                return i.toURL(t)
        }
    }, h.remove = function(n, e) {
        var r = t[n];
        r && r.removeHandler(e)
    }, h.removeAll = function() {
        t = {}, e = []
    }, h.navigate = function(n, e) {
        e = e || {};
        var t = e.silent || !1;
        t && l(), setTimeout(function() {
            window.location.hash = n, t && setTimeout(function() {
                p()
            }, 1)
        }, 1)
    }, h.noConflict = function() {
        return n[r] = o, h
    };
    var f = function() {
        return window.location.hash.substring(1)
    }, c = function(n, e) {
        var t = [];
        return e.match(n, t) ? (e.run(t), !0) : !1
    }, u = h.reload = function() {
        for (var n = f(), t = 0, r = e.length; r > t; t++) {
            var o = e[t];
            if (c(n, o))
                return
        }
    }, p = function() {
        n.addEventListener ? n.addEventListener("hashchange", u, !1) : n.attachEvent("onhashchange", u)
    }, l = function() {
        n.removeEventListener ? n.removeEventListener("hashchange", u) : n.detachEvent("onhashchange", u)
    };
    p(), n[r] = h
})(window);

/*

 Tooltipster 2.1.4 | 6/1/13
 A rockin' custom tooltip jQuery plugin

 Developed by: Caleb Jacob - calebjacob.com
 Copyright (C) 2013 Caleb Jacob

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
;
(function(d, f, g, b) {
    var e = "tooltipster", c = {animation: "fade", arrow: true, arrowColor: "", content: "", delay: 200, fixedWidth: 0, maxWidth: 0, functionBefore: function(m, n) {
            n()
        }, functionReady: function(m, n) {
        }, functionAfter: function(m) {
        }, icon: "(?)", iconDesktop: false, iconTouch: false, iconTheme: ".tooltipster-icon", interactive: false, interactiveTolerance: 350, offsetX: 0, offsetY: 0, onlyOne: true, position: "top", speed: 350, timer: 0, theme: ".tooltipster-default", touchDevices: true, trigger: "hover", updateAnimation: true};
    function j(n, m) {
        this.element = n;
        this.options = d.extend({}, c, m);
        this._defaults = c;
        this._name = e;
        this.init()
    }
    function k() {
        return !!("ontouchstart" in f)
    }
    function a() {
        var m = g.body || g.documentElement;
        var o = m.style;
        var q = "transition";
        if (typeof o[q] == "string") {
            return true
        }
        v = ["Moz", "Webkit", "Khtml", "O", "ms"], q = q.charAt(0).toUpperCase() + q.substr(1);
        for (var n = 0; n < v.length; n++) {
            if (typeof o[v[n] + q] == "string") {
                return true
            }
        }
        return false
    }
    var l = true;
    if (!a()) {
        l = false
    }
    var h = k();
    d(f).on("mousemove.tooltipster", function() {
        h = false;
        d(f).off("mousemove.tooltipster")
    });
    j.prototype = {init: function() {
            var s = d(this.element);
            var o = this;
            var r = true;
            if ((o.options.touchDevices == false) && (h)) {
                r = false
            }
            if (g.all && !g.querySelector) {
                r = false
            }
            if (r == true) {
                if ((this.options.iconDesktop == true) && (!h) || ((this.options.iconTouch == true) && (h))) {
                    var n = s.attr("title");
                    s.removeAttr("title");
                    var q = o.options.iconTheme;
                    var p = d('<span class="' + q.replace(".", "") + '" title="' + n + '">' + this.options.icon + "</span>");
                    p.insertAfter(s);
                    s.data("tooltipsterIcon", p);
                    s = p
                }
                var m = d.trim(o.options.content).length > 0 ? o.options.content : s.attr("title");
                s.data("tooltipsterContent", m);
                s.removeAttr("title");
                if ((this.options.touchDevices == true) && (h) && ((this.options.trigger == "click") || (this.options.trigger == "hover"))) {
                    s.bind("touchstart", function(u, t) {
                        o.showTooltip()
                    })
                } else {
                    if (this.options.trigger == "hover") {
                        s.on("mouseenter.tooltipster", function() {
                            o.showTooltip()
                        });
                        if (this.options.interactive == true) {
                            s.on("mouseleave.tooltipster", function() {
                                var u = s.data("tooltipster");
                                var w = false;
                                if ((u !== b) && (u !== "")) {
                                    u.mouseenter(function() {
                                        w = true
                                    });
                                    u.mouseleave(function() {
                                        w = false
                                    });
                                    var t = setTimeout(function() {
                                        if (w == true) {
                                            u.mouseleave(function() {
                                                o.hideTooltip()
                                            })
                                        } else {
                                            o.hideTooltip()
                                        }
                                    }, o.options.interactiveTolerance)
                                } else {
                                    o.hideTooltip()
                                }
                            })
                        } else {
                            s.on("mouseleave.tooltipster", function() {
                                o.hideTooltip()
                            })
                        }
                    }
                    if (this.options.trigger == "click") {
                        s.on("click.tooltipster", function() {
                            if ((s.data("tooltipster") == "") || (s.data("tooltipster") == b)) {
                                o.showTooltip()
                            } else {
                                o.hideTooltip()
                            }
                        })
                    }
                }
            }
        }, showTooltip: function(n) {
            var o = d(this.element);
            var m = this;
            if (o.data("tooltipsterIcon") !== b) {
                o = o.data("tooltipsterIcon")
            }
            if (!o.hasClass("tooltipster-disable")) {
                if ((d(".tooltipster-base").not(".tooltipster-dying").length > 0) && (m.options.onlyOne == true)) {
                    d(".tooltipster-base").not(".tooltipster-dying").not(o.data("tooltipster")).each(function() {
                        d(this).addClass("tooltipster-kill");
                        var p = d(this).data("origin");
                        p.data("plugin_tooltipster").hideTooltip()
                    })
                }
                o.clearQueue().delay(m.options.delay).queue(function() {
                    m.options.functionBefore(o, function() {
                        if ((o.data("tooltipster") !== b) && (o.data("tooltipster") !== "")) {
                            var y = o.data("tooltipster");
                            if (!y.hasClass("tooltipster-kill")) {
                                var u = "tooltipster-" + m.options.animation;
                                y.removeClass("tooltipster-dying");
                                if (l == true) {
                                    y.clearQueue().addClass(u + "-show")
                                }
                                if (m.options.timer > 0) {
                                    var r = y.data("tooltipsterTimer");
                                    clearTimeout(r);
                                    r = setTimeout(function() {
                                        y.data("tooltipsterTimer", b);
                                        m.hideTooltip()
                                    }, m.options.timer);
                                    y.data("tooltipsterTimer", r)
                                }
                                if ((m.options.touchDevices == true) && (h)) {
                                    d("body").bind("touchstart", function(D) {
                                        if (m.options.interactive == true) {
                                            var F = d(D.target);
                                            var E = true;
                                            F.parents().each(function() {
                                                if (d(this).hasClass("tooltipster-base")) {
                                                    E = false
                                                }
                                            });
                                            if (E == true) {
                                                m.hideTooltip();
                                                d("body").unbind("touchstart")
                                            }
                                        } else {
                                            m.hideTooltip();
                                            d("body").unbind("touchstart")
                                        }
                                    })
                                }
                            }
                        } else {
                            d("body").css("overflow-x", "hidden");
                            var z = o.data("tooltipsterContent");
                            var x = m.options.theme;
                            var A = x.replace(".", "");
                            var u = "tooltipster-" + m.options.animation;
                            var t = "-webkit-transition-duration: " + m.options.speed + "ms; -webkit-animation-duration: " + m.options.speed + "ms; -moz-transition-duration: " + m.options.speed + "ms; -moz-animation-duration: " + m.options.speed + "ms; -o-transition-duration: " + m.options.speed + "ms; -o-animation-duration: " + m.options.speed + "ms; -ms-transition-duration: " + m.options.speed + "ms; -ms-animation-duration: " + m.options.speed + "ms; transition-duration: " + m.options.speed + "ms; animation-duration: " + m.options.speed + "ms;";
                            var p = m.options.fixedWidth > 0 ? "width:" + m.options.fixedWidth + "px;" : "";
                            var B = m.options.maxWidth > 0 ? "max-width:" + m.options.maxWidth + "px;" : "";
                            var w = m.options.interactive == true ? "pointer-events: auto;" : "";
                            var y = d('<div class="tooltipster-base ' + A + " " + u + '" style="' + p + " " + B + " " + w + " " + t + '"></div>');
                            var s = d('<div class="tooltipster-content"></div>');
                            s.html(z);
                            y.append(s);
                            y.appendTo("body");
                            o.data("tooltipster", y);
                            y.data("origin", o);
                            m.positionTooltip();
                            m.options.functionReady(o, y);
                            if (l == true) {
                                y.addClass(u + "-show")
                            } else {
                                y.css("display", "none").removeClass(u).fadeIn(m.options.speed)
                            }
                            var C = z;
                            var q = setInterval(function() {
                                var D = o.data("tooltipsterContent");
                                if (d("body").find(o).length == 0) {
                                    y.addClass("tooltipster-dying");
                                    m.hideTooltip()
                                } else {
                                    if ((C !== D) && (D !== "")) {
                                        C = D;
                                        y.find(".tooltipster-content").html(D);
                                        if (m.options.updateAnimation == true) {
                                            if (a()) {
                                                y.css({width: "", "-webkit-transition": "all " + m.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms", "-moz-transition": "all " + m.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms", "-o-transition": "all " + m.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms", "-ms-transition": "all " + m.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms", transition: "all " + m.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");
                                                setTimeout(function() {
                                                    y.removeClass("tooltipster-content-changing");
                                                    setTimeout(function() {
                                                        y.css({"-webkit-transition": m.options.speed + "ms", "-moz-transition": m.options.speed + "ms", "-o-transition": m.options.speed + "ms", "-ms-transition": m.options.speed + "ms", transition: m.options.speed + "ms"})
                                                    }, m.options.speed)
                                                }, m.options.speed)
                                            } else {
                                                y.fadeTo(m.options.speed, 0.5, function() {
                                                    y.fadeTo(m.options.speed, 1)
                                                })
                                            }
                                        }
                                        m.positionTooltip()
                                    }
                                }
                                if ((d("body").find(y).length == 0) || (d("body").find(o).length == 0)) {
                                    clearInterval(q)
                                }
                            }, 200);
                            if (m.options.timer > 0) {
                                var r = setTimeout(function() {
                                    y.data("tooltipsterTimer", b);
                                    m.hideTooltip()
                                }, m.options.timer + m.options.speed);
                                y.data("tooltipsterTimer", r)
                            }
                            if ((m.options.touchDevices == true) && (h)) {
                                d("body").bind("touchstart", function(D) {
                                    if (m.options.interactive == true) {
                                        var F = d(D.target);
                                        var E = true;
                                        F.parents().each(function() {
                                            if (d(this).hasClass("tooltipster-base")) {
                                                E = false
                                            }
                                        });
                                        if (E == true) {
                                            m.hideTooltip();
                                            d("body").unbind("touchstart")
                                        }
                                    } else {
                                        m.hideTooltip();
                                        d("body").unbind("touchstart")
                                    }
                                })
                            }
                            y.mouseleave(function() {
                                m.hideTooltip()
                            })
                        }
                    });
                    o.dequeue()
                })
            }
        }, hideTooltip: function(n) {
            var q = d(this.element);
            var m = this;
            if (q.data("tooltipsterIcon") !== b) {
                q = q.data("tooltipsterIcon")
            }
            var p = q.data("tooltipster");
            if (p == b) {
                p = d(".tooltipster-dying")
            }
            q.clearQueue();
            if ((p !== b) && (p !== "")) {
                var r = p.data("tooltipsterTimer");
                if (r !== b) {
                    clearTimeout(r)
                }
                var o = "tooltipster-" + m.options.animation;
                if (l == true) {
                    p.clearQueue().removeClass(o + "-show").addClass("tooltipster-dying").delay(m.options.speed).queue(function() {
                        p.remove();
                        q.data("tooltipster", "");
                        d("body").css("verflow-x", "");
                        m.options.functionAfter(q)
                    })
                } else {
                    p.clearQueue().addClass("tooltipster-dying").fadeOut(m.options.speed, function() {
                        p.remove();
                        q.data("tooltipster", "");
                        d("body").css("verflow-x", "");
                        m.options.functionAfter(q)
                    })
                }
            }
        }, positionTooltip: function(P) {
            var B = d(this.element);
            var ac = this;
            if (B.data("tooltipsterIcon") !== b) {
                B = B.data("tooltipsterIcon")
            }
            if ((B.data("tooltipster") !== b) && (B.data("tooltipster") !== "")) {
                var ai = B.data("tooltipster");
                ai.css("width", "");
                var aj = d(f).width();
                var C = B.outerWidth(false);
                var ah = B.outerHeight(false);
                var am = ai.outerWidth(false);
                var n = ai.innerWidth() + 1;
                var N = ai.outerHeight(false);
                var ab = B.offset();
                var aa = ab.top;
                var w = ab.left;
                var z = b;
                if (B.is("area")) {
                    var U = B.attr("shape");
                    var ag = B.parent().attr("name");
                    var Q = d('img[usemap="#' + ag + '"]');
                    var o = Q.offset().left;
                    var M = Q.offset().top;
                    var X = B.attr("coords") !== b ? B.attr("coords").split(",") : b;
                    if (U == "circle") {
                        var O = parseInt(X[0]);
                        var s = parseInt(X[1]);
                        var E = parseInt(X[2]);
                        ah = E * 2;
                        C = E * 2;
                        aa = M + s - E;
                        w = o + O - E
                    } else {
                        if (U == "rect") {
                            var O = parseInt(X[0]);
                            var s = parseInt(X[1]);
                            var r = parseInt(X[2]);
                            var K = parseInt(X[3]);
                            ah = K - s;
                            C = r - O;
                            aa = M + s;
                            w = o + O
                        } else {
                            if (U == "poly") {
                                var y = [];
                                var af = [];
                                var I = 0, H = 0, ae = 0, ad = 0;
                                var ak = "even";
                                for (i = 0; i < X.length; i++) {
                                    var G = parseInt(X[i]);
                                    if (ak == "even") {
                                        if (G > ae) {
                                            ae = G;
                                            if (i == 0) {
                                                I = ae
                                            }
                                        }
                                        if (G < I) {
                                            I = G
                                        }
                                        ak = "odd"
                                    } else {
                                        if (G > ad) {
                                            ad = G;
                                            if (i == 1) {
                                                H = ad
                                            }
                                        }
                                        if (G < H) {
                                            H = G
                                        }
                                        ak = "even"
                                    }
                                }
                                ah = ad - H;
                                C = ae - I;
                                aa = M + H;
                                w = o + I
                            } else {
                                ah = Q.outerHeight(false);
                                C = Q.outerWidth(false);
                                aa = M;
                                w = o
                            }
                        }
                    }
                }
                if (ac.options.fixedWidth == 0) {
                    ai.css({width: n + "px", "padding-left": "0px", "padding-right": "0px"})
                }
                var t = 0, W = 0;
                var Y = parseInt(ac.options.offsetY);
                var Z = parseInt(ac.options.offsetX);
                var q = "";
                function x() {
                    var ao = d(f).scrollLeft();
                    if ((t - ao) < 0) {
                        var an = t - ao;
                        t = ao;
                        ai.data("arrow-reposition", an)
                    }
                    if (((t + am) - ao) > aj) {
                        var an = t - ((aj + ao) - am);
                        t = (aj + ao) - am;
                        ai.data("arrow-reposition", an)
                    }
                }
                function u(ao, an) {
                    if (((aa - d(f).scrollTop() - N - Y - 12) < 0) && (an.indexOf("top") > -1)) {
                        ac.options.position = ao;
                        z = an
                    }
                    if (((aa + ah + N + 12 + Y) > (d(f).scrollTop() + d(f).height())) && (an.indexOf("bottom") > -1)) {
                        ac.options.position = ao;
                        z = an;
                        W = (aa - N) - Y - 12
                    }
                }
                if (ac.options.position == "top") {
                    var R = (w + am) - (w + C);
                    t = (w + Z) - (R / 2);
                    W = (aa - N) - Y - 12;
                    x();
                    u("bottom", "top")
                }
                if (ac.options.position == "top-left") {
                    t = w + Z;
                    W = (aa - N) - Y - 12;
                    x();
                    u("bottom-left", "top-left")
                }
                if (ac.options.position == "top-right") {
                    t = (w + C + Z) - am;
                    W = (aa - N) - Y - 12;
                    x();
                    u("bottom-right", "top-right")
                }
                if (ac.options.position == "bottom") {
                    var R = (w + am) - (w + C);
                    t = w - (R / 2) + Z;
                    W = (aa + ah) + Y + 12;
                    x();
                    u("top", "bottom")
                }
                if (ac.options.position == "bottom-left") {
                    t = w + Z;
                    W = (aa + ah) + Y + 12;
                    x();
                    u("top-left", "bottom-left")
                }
                if (ac.options.position == "bottom-right") {
                    t = (w + C + Z) - am;
                    W = (aa + ah) + Y + 12;
                    x();
                    u("top-right", "bottom-right")
                }
                if (ac.options.position == "left") {
                    t = w - Z - am - 12;
                    myLeftMirror = w + Z + C + 12;
                    var L = (aa + N) - (aa + B.outerHeight(false));
                    W = aa - (L / 2) - Y;
                    if ((t < 0) && ((myLeftMirror + am) > aj)) {
                        var p = parseFloat(ai.css("border-width")) * 2;
                        var m = (am + t) - p;
                        ai.css("width", m + "px");
                        N = ai.outerHeight(false);
                        t = w - Z - m - 12 - p;
                        L = (aa + N) - (aa + B.outerHeight(false));
                        W = aa - (L / 2) - Y
                    } else {
                        if (t < 0) {
                            t = w + Z + C + 12;
                            ai.data("arrow-reposition", "left")
                        }
                    }
                }
                if (ac.options.position == "right") {
                    t = w + Z + C + 12;
                    myLeftMirror = w - Z - am - 12;
                    var L = (aa + N) - (aa + B.outerHeight(false));
                    W = aa - (L / 2) - Y;
                    if (((t + am) > aj) && (myLeftMirror < 0)) {
                        var p = parseFloat(ai.css("border-width")) * 2;
                        var m = (aj - t) - p;
                        ai.css("width", m + "px");
                        N = ai.outerHeight(false);
                        L = (aa + N) - (aa + B.outerHeight(false));
                        W = aa - (L / 2) - Y
                    } else {
                        if ((t + am) > aj) {
                            t = w - Z - am - 12;
                            ai.data("arrow-reposition", "right")
                        }
                    }
                }
                if (ac.options.arrow == true) {
                    var J = "tooltipster-arrow-" + ac.options.position;
                    if (ac.options.arrowColor.length < 1) {
                        var S = ai.css("background-color")
                    } else {
                        var S = ac.options.arrowColor
                    }
                    var al = ai.data("arrow-reposition");
                    if (!al) {
                        al = ""
                    } else {
                        if (al == "left") {
                            J = "tooltipster-arrow-right";
                            al = ""
                        } else {
                            if (al == "right") {
                                J = "tooltipster-arrow-left";
                                al = ""
                            } else {
                                al = "left:" + al + "px;"
                            }
                        }
                    }
                    if ((ac.options.position == "top") || (ac.options.position == "top-left") || (ac.options.position == "top-right")) {
                        var V = parseFloat(ai.css("border-bottom-width"));
                        var A = ai.css("border-bottom-color")
                    } else {
                        if ((ac.options.position == "bottom") || (ac.options.position == "bottom-left") || (ac.options.position == "bottom-right")) {
                            var V = parseFloat(ai.css("border-top-width"));
                            var A = ai.css("border-top-color")
                        } else {
                            if (ac.options.position == "left") {
                                var V = parseFloat(ai.css("border-right-width"));
                                var A = ai.css("border-right-color")
                            } else {
                                if (ac.options.position == "right") {
                                    var V = parseFloat(ai.css("border-left-width"));
                                    var A = ai.css("border-left-color")
                                } else {
                                    var V = parseFloat(ai.css("border-bottom-width"));
                                    var A = ai.css("border-bottom-color")
                                }
                            }
                        }
                    }
                    if (V > 1) {
                        V++
                    }
                    var F = "";
                    if (V !== 0) {
                        var D = "";
                        var T = "border-color: " + A + ";";
                        if (J.indexOf("bottom") !== -1) {
                            D = "margin-top: -" + V + "px;"
                        } else {
                            if (J.indexOf("top") !== -1) {
                                D = "margin-bottom: -" + V + "px;"
                            } else {
                                if (J.indexOf("left") !== -1) {
                                    D = "margin-right: -" + V + "px;"
                                } else {
                                    if (J.indexOf("right") !== -1) {
                                        D = "margin-left: -" + V + "px;"
                                    }
                                }
                            }
                        }
                        F = '<span class="tooltipster-arrow-border" style="' + D + " " + T + ';"></span>'
                    }
                    ai.find(".tooltipster-arrow").remove();
                    q = '<div class="' + J + ' tooltipster-arrow" style="' + al + '">' + F + '<span style="border-color:' + S + ';"></span></div>';
                    ai.append(q)
                }
                ai.css({top: W + "px", left: t + "px"});
                if (z !== b) {
                    ac.options.position = z
                }
            }
        }};
    d.fn[e] = function(n) {
        if (typeof n === "string") {
            var p = this;
            var m = arguments[1];
            if (p.data("plugin_tooltipster") == b) {
                var o = p.find("*");
                p = d();
                o.each(function() {
                    if (d(this).data("plugin_tooltipster") !== b) {
                        p.push(d(this))
                    }
                })
            }
            p.each(function() {
                switch (n.toLowerCase()) {
                    case"show":
                        d(this).data("plugin_tooltipster").showTooltip();
                        break;
                    case"hide":
                        d(this).data("plugin_tooltipster").hideTooltip();
                        break;
                    case"disable":
                        d(this).addClass("tooltipster-disable");
                        break;
                    case"enable":
                        d(this).removeClass("tooltipster-disable");
                        break;
                    case"destroy":
                        d(this).data("plugin_tooltipster").hideTooltip();
                        d(this).data("plugin_tooltipster", "").attr("title", p.data("tooltipsterContent")).data("tooltipsterContent", "").data("plugin_tooltipster", "").off("mouseenter.tooltipster mouseleave.tooltipster click.tooltipster");
                        break;
                    case"update":
                        if (d(this).data("tooltipsterIcon") == b) {
                            d(this).data("tooltipsterContent", m)
                        } else {
                            var q = d(this).data("tooltipsterIcon");
                            q.data("tooltipsterContent", m)
                        }
                        break;
                    case"reposition":
                        d(this).data("plugin_tooltipster").positionTooltip();
                        break
                    }
            });
            return this
        }
        return this.each(function() {
            if (!d.data(this, "plugin_" + e)) {
                d.data(this, "plugin_" + e, new j(this, n))
            }
            var q = d(this).data("plugin_tooltipster").options;
            if ((q.iconDesktop == true) && (!h) || ((q.iconTouch == true) && (h))) {
                var r = d(this).data("plugin_tooltipster");
                d(this).next().data("plugin_tooltipster", r)
            }
        })
    };
    if (h) {
        f.addEventListener("orientationchange", function() {
            if (d(".tooltipster-base").length > 0) {
                d(".tooltipster-base").each(function() {
                    var m = d(this).data("origin");
                    m.data("plugin_tooltipster").hideTooltip()
                })
            }
        }, false)
    }
    d(f).on("resize.tooltipster", function() {
        var m = d(".tooltipster-base").data("origin");
        if ((m !== null) && (m !== b)) {
            m.tooltipster("reposition")
        }
    })
})(jQuery, window, document);

/*!
	Autosize v1.17.6 - 2013-08-27
	Automatically adjust textarea height based on user input.
	(c) 2013 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals: jQuery or jQuery-like library, such as Zepto
		factory(window.jQuery || window.$);
	}
}(function ($) {
	var
	defaults = {
		className: 'autosizejs',
		append: '',
		callback: false,
		resizeDelay: 100
	},

	// border:0 is unnecessary, but avoids a bug in FireFox on OSX
	copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

	// line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
	typographyStyles = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent'
	],

	// to keep track which textarea is being mirrored when adjust() is called.
	mirrored,

	// the mirror element, which is used to calculate what size the mirrored element should be.
	mirror = $(copy).data('autosize', true)[0];

	// test that line-height can be accurately copied.
	mirror.style.lineHeight = '99px';
	if ($(mirror).css('lineHeight') === '99px') {
		typographyStyles.push('lineHeight');
	}
	mirror.style.lineHeight = '';

	$.fn.autosize = function (options) {
		options = $.extend({}, defaults, options || {});

		if (mirror.parentNode !== document.body) {
			$(document.body).append(mirror);
		}

		return this.each(function () {
			var
			ta = this,
			$ta = $(ta),
			maxHeight,
			minHeight,
			boxOffset = 0,
			callback = $.isFunction(options.callback),
			originalStyles = {
				height: ta.style.height,
				overflow: ta.style.overflow,
				overflowY: ta.style.overflowY,
				wordWrap: ta.style.wordWrap,
				resize: ta.style.resize
			},
			timeout,
			width = $ta.width();

			if ($ta.data('autosize')) {
				// exit if autosize has already been applied, or if the textarea is the mirror element.
				return;
			}
			$ta.data('autosize', true);

			if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
				boxOffset = $ta.outerHeight() - $ta.height();
			}

			// IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
			minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

			$ta.css({
				overflow: 'hidden',
				overflowY: 'hidden',
				wordWrap: 'break-word', // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
				resize: ($ta.css('resize') === 'none' || $ta.css('resize') === 'vertical') ? 'none' : 'horizontal'
			});

			// The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
			function setWidth() {
				var style, width;

				if ('getComputedStyle' in window) {
					style = window.getComputedStyle(ta);
					width = ta.getBoundingClientRect().width;

					$.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
						width -= parseInt(style[val],10);
					});

					mirror.style.width = width + 'px';
				}
				else {
					// window.getComputedStyle, getBoundingClientRect returning a width are unsupported and unneeded in IE8 and lower.
					mirror.style.width = Math.max($ta.width(), 0) + 'px';
				}
			}

			function initMirror() {
				var styles = {};

				mirrored = ta;
				mirror.className = options.className;
				maxHeight = parseInt($ta.css('maxHeight'), 10);

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				$.each(typographyStyles, function(i,val){
					styles[val] = $ta.css(val);
				});
				$(mirror).css(styles);

				setWidth();

				// Chrome-specific fix:
				// When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
				// made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
				if (window.chrome && 'setSelectionRange' in ta) {
					var cursorIndex = ta.selectionStart;
					ta.value += ' ';
					ta.value = ta.value.slice(0,-1);
					ta.setSelectionRange(cursorIndex,cursorIndex);
				}
			}

			// Using mainly bare JS in this function because it is going
			// to fire very often while typing, and needs to very efficient.
			function adjust() {
				var height, original;

				if (mirrored !== ta) {
					initMirror();
				} else {
					setWidth();
				}

				mirror.value = ta.value + options.append;
				mirror.style.overflowY = ta.style.overflowY;
				original = parseInt(ta.style.height,10);

				// Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
				mirror.scrollTop = 0;

				mirror.scrollTop = 9e4;

				// Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
				height = mirror.scrollTop;

				if (maxHeight && height > maxHeight) {
					ta.style.overflowY = 'scroll';
					height = maxHeight;
				} else {
					ta.style.overflowY = 'hidden';
					if (height < minHeight) {
						height = minHeight;
					}
				}

				height += boxOffset;

				if (original !== height) {
					ta.style.height = height + 'px';
					if (callback) {
						options.callback.call(ta,ta);
					}
				}
			}

			function resize () {
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					var newWidth = $ta.width();

					if (newWidth !== width) {
						width = newWidth;
						adjust();
					}
				}, parseInt(options.resizeDelay,10));
			}

			if ('onpropertychange' in ta) {
				if ('oninput' in ta) {
					// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
					// so binding to onkeyup to catch most of those occasions.  There is no way that I
					// know of to detect something like 'cut' in IE9.
					$ta.on('input.autosize keyup.autosize', adjust);
				} else {
					// IE7 / IE8
					$ta.on('propertychange.autosize', function(){
						if(event.propertyName === 'value'){
							adjust();
						}
					});
				}
			} else {
				// Modern Browsers
				$ta.on('input.autosize', adjust);
			}

			// Set options.resizeDelay to false if using fixed-width textarea elements.
			// Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

			if (options.resizeDelay !== false) {
				$(window).on('resize.autosize', resize);
			}

			// Event for manual triggering if needed.
			// Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
			$ta.on('autosize.resize', adjust);

			// Event for manual triggering that also forces the styles to update as well.
			// Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
			$ta.on('autosize.resizeIncludeStyle', function() {
				mirrored = null;
				adjust();
			});

			$ta.on('autosize.destroy', function(){
				mirrored = null;
				clearTimeout(timeout);
				$(window).off('resize', resize);
				$ta
					.off('autosize')
					.off('.autosize')
					.css(originalStyles)
					.removeData('autosize');
			});

			// Call adjust in case the textarea already contains text.
			adjust();
		});
	};
}));