//window.onerror = function(message, file, line) {
//  setTimeout(function() {
//    RT.Trace.notify({
//      message : message,
//      stack   : '()@' + file + ':' + line
//    });
//  }, 100);
//  console.trace();
//  return true;
//};

/**
 *  Lib:        Common Utilities
 *  Author:     Jason Nathan
 */
RT.Com = {
    /**
     * @param s hash for settings
     * @param p hash for params to send
     */
    Get: function(s, p) {
        var a = window["RTApp"];
        s.type || (s.type = "GET");
        s.api = !1;
        p.access_token = a.at();
        p.state = a.st();
        return new RT.Com.Fetch(s, p, a);
    },
    Post: function(s, p) {
        s.type || (s.type = 'POST');
        return RT.Com.Get(s, p);
    },
    GetApi: function(s, p) {
        s.type || (s.type = "GET");
        return window["RTApp"].load(s, p);
    },
    PostApi: function(s, p) {
        s.type || (s.type = "POST");
        return window["RTApp"].load(s, p);
    },
    Renew: function() {
        return RT.Com.Post({}, {url: "/renew"});
    },
    CheckUnique: function(l, v, o, t) {
        var s = {loading: l},
        p = {type: t, request_type: "is_unique", url: "/user/update/" + v};
        s = RT.Com.PostApi(s, p);
        return o && o(!0) && s && s.done(function(r) {
            return r.status && r.status === "fail" && o(!1);
        }) && s || s;
    },
    GetCompany: function(t, res) {
        var s = new RT.Com.GetApi({}, {url: '/user/index/', request_type: 'get_company', term: t.term});
        return s && s.done(function(r) {
            return r.data && r.data.length > 0 && res(r.data);
        });
    },
    MobileVerify: function(t, l) {
        return RT.Com.Post({loading: l}, {url: '/get_verification', token: t});
    },
    ThousandSep: function(val) {
        return val && String(val).split("").reverse().join("").replace(/(\d{3}\B)/g, "$1,").split("").reverse().join("") || null;
    },
    RemoveCommas: function(val) {
        return val ? val.toString().replace(/,/g, '') : val;
    },
    MakePrice: function(str) {
        "use strict";
        str = String(str);
        var u = RT.Com, d = u.RemoveCommas(str), num = parseFloat(d), r = null,
                unit = d.replace(num, '').toLowerCase(), units = ['k', 'm', 'b', 't'];
        if (units.indexOf(unit) !== -1) {
            (unit === 'k' || unit === 't') && (r = num * 1e3);
            unit === 'm' && (r = num * 1e6);
            unit === 'b' && (r = num * 1e9);
            return r ? u.ThousandSep(r) : str;
        }
        return str.lastIndexOf(".") === str.length - 1 ? str : u.ThousandSep(num) || str;
    },
    colorAdjust: function(hex, lum) {
// validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = (hex[0] * 2) + (hex[1] * 2) + (hex[2] * 2);
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    },
    /**
     * Checks to see if a variable is an observable and returns it or creates
     * and returns and observable of it.
     *
     * @param p mixed the variable to check
     * @returns Observable an observable
     */
    MakeObs: function(p) {
        return ko.isObservable(p) ? p : ko.observable(p);
    },
    MakeObsFromArray: function(arr, val) {
        var t = this;
        typeof arr === 'string' && (arr = arr.split(" "));
        return ko.utils.arrayForEach(arr, function(i) {
            t[i] = ko.observable(val);
        });
    },
    /**
     * Retrieves the underlying value from an observable, if it is an observable
     * If not just returns the var
     *
     * @param p {mixed} the variable to check
     * @returns mixed the underlying value
     */
    GetObsVal: function(p) {
        return ko.isObservable(p) ? p() : p;
    },
    GetThumbnail: function() {
        "use strict";
        var s = arguments[0] || 110, i, getPicBySize = function(s) {
            if (this.hasOwnProperty("picture") && this.picture()) {
                return "http://" + this.picture().replace(this.user._id(), this.user._id() + "/" + s);
            }
            return null;
        },found = getPicBySize.call(this, s);
        if(found){
            i = new Image();
            i.width = s;
            i.height = s;
            i.alt = "Album Thumbnails";
            i.src = found;
            return $(i)[0].outerHTML;
        }
        i = $(RT.Com.NewDom('div'));
        i.css({
            width: (s-20) + 'px',
            height: (s-20) + 'px',
            padding:"10px",
            textAlign:"center",
            backgroundColor: "#ccc",
            color:"#333",
            textShadow: '1px 1px 1px #EEE'
        }).attr({
            role: 'img',
            'aria-labelledby': 'Placeholder Image - No Preview'
        });
        return i.text("No Preview Available")[0].outerHTML;

    },
    Uploader: function(VM) {
        return new plupload.Uploader(VM.uploadSettings());
    },
    Avatar: function() {
        var u = ko.toJS(this.user) || ko.toJS(arguments[0]) || {},
                avatar = u.avatar, id = u._id, url = 'http://';
        return avatar
                ? url + avatar.replace(id, id + '/' + arguments[1])
                : url + RT.Com.api + 'avatar/' + id + '/' + arguments[1];
    },
    Fetch: function(a, c, d) {
        "use strict";
        var o = {
            url: a.api ? "/api" : c.url, type: a.type || "GET",
            crossDomain: !1, dataType: "json", data: c,
            dataFilter: function(data) {
                return a.dataFilter && "function" === typeof a.dataFilter && a.dataFilter.apply(this, arguments) || data;
            },
            beforeSend: function() {
                a.beforeSend && "function" === typeof a.beforeSend && a.beforeSend();
                a.loading && jQuery(a.loading).show();
            },
            complete: function() {
                a.complete && "function" === typeof a.complete && a.complete.call();
            }
        };
        a.timeout && (o.timeout = a.timeout);
        return c && c.url && jQuery.ajax(o)
                .done(function(a) {
            a && window.RTApp.ajaxStatus(a.status) && window.RTApp.ajaxData(a.data);
            a && ((a.data && a.data.message === 'Access Denied' && d && !d.user() && window.location.reload()) || (a.session && a.session.access_token && d && d.hasOwnProperty('at') && d.at(a.session.access_token)));
        })
                .always(function() {
            a.loading && jQuery(a.loading).hide();
        })
                .fail(function(a) {
            RTApp.ajaxStatus('error');
            RTApp.ajaxData(a);
        }) || $.Deferred().reject().promise();
    },
    Field: function() {
        this.icon = $(RTC.NewDom('i'));
    },
    SocialField: function() {
        var cls = 'social26 ', self = this;
        this.socialTypes = ko.observableArray([
            {icon: cls + 'facebook', name: 'Facebook'},
            {icon: cls + 'flickr', name: 'Flickr'},
            {icon: cls + 'gplus', name: 'Google Plus'},
            {icon: cls + 'linkedin', name: 'LinkedIn'},
            {icon: cls + 'picasa', name: 'Picasa'},
            {icon: cls + 'youtube', name: 'YouTube'},
            {icon: cls + 'twitter', name: 'Twitter'},
            {icon: null, name: 'Other Website'}
        ]);
        this.selectedType = ko.observable({icon: cls + 'facebook', name: 'Facebook'});
        this.selectType = function(data) {
            self.selectedType(data);
        };
        this.isWebsite = ko.computed(function() {
            return this.selectedType() && this.selectedType().name === 'Other Website';
        }, this);
        this.link = ko.observable();
        this.toJS = function() {
            return {name: self.selectedType().name, link: self.link()};
        };
    },
    DualField: function(params) {
        return params && (ko.isObservable(params) ? params : ko.observableArray(params)) || {date: ko.observable(''), value: ko.observable('')};
    },
    nl2br: function(s, is_xhtml) {
        var br = is_xhtml ? '<br />' : '<br>';
        return (s + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + br + '$2');
    },
    setInputWidths: function() {
        return true;
    },
    PageHandler: function(direction) {
        "use strict";
        var $this, ajax, a = ko.dataFor(this);
        if (direction === "down" || direction === "right") {
            $this = $(this);
            $this.waypoint("disable");
            return a && (ajax = a.getNextPage()) && ajax.done(function() {
                return a.hasNextPage() && $this.waypoint("enable");
            });
        }
    },
    InteractorHandler: function(direction) {
        "use strict";
        var a = ko.dataFor(this);
        if (direction === "down" || direction === "right") {
            var t = $(this);
            t.waypoint("disable");
            return a.get(t);
        }
    },
    AlbumHandler: function(direction) {
        "use strict";
        var lib = ko.dataFor(this) || this;
        return lib.getAttachments();
//        var $this, ajax, a = RTApp;
//        if (direction === "down" || direction === "right") {
//            $this = $(this);
//            $this.waypoint("disable");
//            return (ajax = a.getNextPage()) && ajax.done(function() {
//                return a.hasNextPage() && $this.waypoint("enable");
//            });
//        }
    },
    CreateLoop: function() {
        var data = arguments[0].skip && arguments[0].data ? arguments[0].data : arguments[0];
        switch (data.type) {
            case 'post':
            case 'wallpost':
                return new RT.Post(data);
            case 'album':
                return new RT.Album(data);
            case 'attachment':
                return new RT.Attachment(data);
            case 'testimonial':
                return new RT.Testimonial(data);
            case 'listing':
                return new RT.Listing(data);
            case 'conversation':
                return new RT.Conversation(data);
            default:
                return new RT.Page(data);
        }

    },
    parseGets: function(k) {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, k, value) {
            vars[k] = value;
        });
        return vars[k];
    },
    elementFromEvent: function(event) {
        var target = event.target || event.srcElement;
        // safari bug
        target = target.nodeType === 3 ? target.parentNode : target;
        return target;
    },
    NewDom: function(d) {
        return document.createElement(d);
    },
    DateFormat: function() {
        var j = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, k = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, s = /[^-+\dA-Z]/g, d = function(a, c) {
            a = String(a);
            for (c = c || 2; a.length < c; )
                a = "0" + a;
            return a;
        };
        return function(a, c, h) {
            var f = RT.Com.DateFormat;
            1 === arguments.length && ("[object String]" === Object.prototype.toString.call(a) && !/\d/.test(a)) && (c = a, a = void 0);
            a = a ? new Date(a) : new Date;
            if (isNaN(a))
                throw SyntaxError("invalid date");
            c = String(f.masks[c] || c || f.masks["default"]);
            "UTC:" === c.slice(0, 4) && (c = c.slice(4), h = !0);
            var b = h ? "getUTC" : "get", g = a[b + "Date"](), m = a[b + "Day"](), i = a[b + "Month"](), n = a[b + "FullYear"](), e = a[b + "Hours"](), p = a[b + "Minutes"](), q = a[b + "Seconds"](), b = a[b + "Milliseconds"](), l = h ? 0 : a.getTimezoneOffset(), r = {d: g, dd: d(g), ddd: f.i18n.dayNames[m], dddd: f.i18n.dayNames[m + 7], m: i + 1, mm: d(i + 1), mmm: f.i18n.monthNames[i], mmmm: f.i18n.monthNames[i + 12], yy: String(n).slice(2), yyyy: n, h: e % 12 || 12, hh: d(e % 12 || 12), H: e, HH: d(e), M: p, MM: d(p), s: q, ss: d(q), l: d(b, 3), L: d(99 < b ? Math.round(b / 10) : b), t: 12 > e ? "a" : "p", tt: 12 > e ? "am" : "pm", T: 12 > e ? "A" : "P", TT: 12 > e ? "AM" : "PM", Z: h ? "UTC" : (String(a).match(k) || [""]).pop().replace(s, ""), o: (0 < l ? "-" : "+") + d(100 * Math.floor(Math.abs(l) / 60) + Math.abs(l) % 60, 4), S: ["th", "st", "nd", "rd"][3 < g % 10 ? 0 : (10 != g % 100 - g % 10) * g % 10]};
            return c.replace(j, function(a) {
                return a in r ? r[a] : a.slice(1, a.length - 1);
            });
        };
    }(),
    /**
     * Ensures the state of a Like or Subscribe link and it's icon or text reflects
     * the actual state of the interaction
     *
     * @param {string} element
     * @param {string} i
     * @param {Object} VM
     * @returns {Boolean|void}
     */
    Interaction: function(element, i, VM) {
        VM = RT.Com.GetObsVal(VM); // in case it is an observable
        var e = jQuery(element), // the element, normally anchor tag
                span = e.find('span:not(.badge)'), // if this element has a named label
                I = i || span && span.text && span.text().toLowerCase(), // either given or extracted from the label
                actions = RT.Com.GetObsVal(VM.actions);
        // if there is an interactions object in VM, then this equates to true
        this.canInteract = RT.Com.GetObsVal(VM.interactions);

        // the current state of the interaction. If the property doesn't exist,
        // this equates to false (negative interaction, i.e. 'unlike' or 'unsubscribe'
        this.state = this.canInteract ? this.canInteract.hasOwnProperty(I) && this.canInteract[I]() : false;

        // extract URl from actions
        this.url = actions[this.state ? 'un' + I : I]();

        this.modifyElement = function() {
            // the label text should reflect a new action, not the current one
            if (span)
                span.text((this.state ? I : 'un' + I).ucfirst());

            return e.attr('href', this.url || null);
        };

        return this;


    },
    MakeObjPropsObs: function() {
        if (arguments[0]) {
            var a = arguments[0], data = (a.parent && a.parent.__ko_mapping__ && a.data) ? a.data : a;
            for (var prop in data) {
                typeof data[prop] === 'array' && (data[prop] = ko.observableArray(data[prop])) ||
                        (data[prop] = ko.observable(data[prop]));
            }
            return data;
        }
    },
    AspectRatioFit: function(srcWidth, srcHeight, maxWidth, maxHeight, f) {
        var sw = parseInt(srcWidth), sh = parseInt(srcHeight), ratio, ml;
        if (f && f === .9) {
            ml = -(sw * .23);
        } else {
            ml = -(sw * .25) - 30;
        }

        if (sw <= maxWidth && sh <= maxHeight) {
            return {width: sw, height: sh, 'margin-left': ml, 'margin-top': -(sh / 2)};
        }
        ratio = Math.min(maxWidth / sw, maxHeight / sh);
        if (f && f === 0.9) {
            ml = -(sw * ratio * .23);
        } else {
            ml = -(sw * ratio * .25) - 30;
        }
        return {width: sw * ratio, height: sh * ratio, 'margin-left': ml, 'margin-top': -(sh * ratio / 2)};
        //return { width:srcWidth*ratio, height:srcHeight*ratio};
    },
    Step: function(id, name, template) {
        var self = this;
        self.id = ko.observable(id);
        self.name = ko.observable(name);
        self.isComplete = ko.observable(false);
        self.isEditable = ko.observable(true);
        self.template = template;
        self.getTemplate = function() {
            return self.template;
        };
    },
    CBSettings: {transition: "none", speed: 1, top: '10%', open: !0, maxWidth: '95%', maxHeight: '95%', height: "30%", trapFocus:false,
        onClosed: function() {
            return RTApp.currentForm(null) && (RTC.processing = !1); //ko.cleanNode(document.getElementById(id));
        },
        onCleanup: function() {
            return $(document.body).css({overflow:''});
        },
        onOpen: function() {
            return $(document.body).css({overflow:'hidden'});
        }},
    CB: {
        _get: function() {
            var e = document.getElementById('colorbox');
            return (e && e.style.display !== "none") ? e : null;
        },
        resize: function() {
            return RT.Com.CB._get() && $.colorbox.resize();
        },
        close: function() {
            return RT.Com.CB._get() && $.colorbox.close();
        }
    },
    qtipPlacement: function(element) {
        var d = "top", e = $(element);
        if (e.hasClass('tipsRight')) {
            return 'right';
        }
        if (e.hasClass('tipsLeft')) {
            return 'left';
        }
        if (e.hasClass('tipsBottom')) {
            return 'bottom';
        }
        return "top";
    },
    b64d: function(data) {
// http://kevin.vanzonneveld.net
// +   original by: Tyler Akins (http://rumkin.com)
// +   improved by: Thunder.m
// +      input by: Aman Gupta
// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   bugfixed by: Onno Marsman
// +   bugfixed by: Pellentesque Malesuada
// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +      input by: Brett Zamir (http://brett-zamir.me)
// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
// *     returns 1: 'Kevin van Zonneveld'
// mozilla has this native
// - but breaks in 2.0.0.12!
        if (typeof window['atob'] === 'function') {
            try {
                return $.parseJSON(atob(data));
            }
            catch (e) {
                return atob(data);
            }
        }
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
                ac = 0,
                dec = "",
                tmp_arr = [];
        if (!data) {
            return data;
        }

        data += '';
        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
            if (h3 === 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 === 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
        dec = tmp_arr.join('');
        try {
            return $.parseJSON(dec);
        }
        catch (e) {
            return dec;
        }
    },
    poll: function() {
        var p = {url: '/poll'}, s = {}, data, RTC = RT["Com"],
                cu = RTC.GetObsVal(window.RTApp.user),
                cp = RTC.GetObsVal(window.RTApp.cp), i = [];
        //RTC.log('at', p);
        (s = new RTC.Get(s, p)) && s.done(function(r) {
            if (RTC.isSuccess(r)) {
                data = r.data || {};
                //RTC.log('server', r.data);
                //ko.mapping.fromJS(r.data, {create:RTC.CreateLoop}, t.user);
                for (var p in r.data.counts) {
                    //RTC.log('property', p)
                    if ('testimonials' === p) {
                        for (var a in r.data.counts[p]) {
                            cu.counts[p][a](r.data.counts[p][a]);
                        }
                    } else {
                        cu.counts[p](r.data.counts[p]);
                    }

                }
                RT["Com"].forEach(r.data.subscribers, function(u) {
                    i.push(RTC.MakeObjPropsObs(u));
                });
                cu.subscribers(i);
                i = [];
                RT["Com"].forEach(r.data.likers, function(u) {
                    i.push(RTC.MakeObjPropsObs(u));
                });
                cu.likers(i);
                if (cp && cp._id && cp._id() === cu._id()) {
                    if (cp.lib) {
                        cu.lib = cp.lib;
                    }
                    window.RTApp.cp(cu);
                }
                RTC.Renew();

            }
            //return RTC.log('polls', ko.toJS(cu));
        }).always(function() {
//            window['console']['log'] = function() {
//            };
            return cu && setTimeout(RTC.poll, 3e4);
        });
    },
    arrGet: function($arr, $key, $default) {
        // likely this isn't an array but an object :-)
        if ($arr.hasOwnProperty($key)) {
            return $arr[$key];
        }
        // so it doesn't return undefined.
        return $default || null;
    },
    forEach: ko.utils.arrayForEach,
    debug: true,
    log: function(k, d) {
        "use strict";
        var m = ["log", "debug", "warn", "info", "dir", "dirxml", "trace", "profile"], i, v;
        //!window.console && (window.console = {});
        if (RT.Com.debug) {
            v = {data: d};
            v[k] = true;
            return console.log && console.log(v) || !1;
        }
        for (i = 0; i < m.length; i++) {
            console[m[i]] = function() {
            };
        }
        return;
    },
    processing: false,
    timeouts: [],
    api: RT.API_SERVER + '/',
    templates: '/assets/templates/',
    getTemplate: function(d){ return RT.Com.templates + d + '.html'},
    resources: 'http://' + RT.COM_SERVER,
    isSuccess: function(r) {
        return r && r.hasOwnProperty("status") && r.status === 'success';
    },
    isFailure: function(r) {
        return r && r.hasOwnProperty("status") && r.status === 'fail';
    },
    setCookie: function(key, val, nDays) {
        var today = new Date(), expire = new Date();
        nDays === null || nDays === 0 && (nDays = 1);
        expire.setTime(today.getTime() + 36e5 * 24 * nDays);
        document.cookie = key + "=" + escape(val) + ";expires=" + expire.toGMTString();
    },
    getCookie: function(key) {
        var c = " " + document.cookie, ind = c.indexOf(" " + key + "="), ind1;
        ind === -1 && (ind = c.indexOf(";" + key + "="));
        if (ind === -1 || key === "") {
            return "";
        }
        ind1 = c.indexOf(";", ind + 1);
        ind1 === -1 && (ind1 = c.length);
        return unescape(c.substring(ind + key.length + 2, ind1));
    },
    responsiveIconLinks: function(v) {
        var e = $(".responsiveIconLink"), i = e.find("i"), c = "centerBlock",
                s = "icon-2x", ac = "addClass", rc = "removeClass";
        return v ? e[ac](c) && i[ac](s) : e[rc](c) && i[rc](s);
    },
    cards: {/*Empty object on purpose. Not very useful when not persisting*/},
    Base: function() {
        var extenders = [];
        this.extend = function(extender) {
            extenders.push(extender);
        };
        this.init = function() {
            var self = this;
            RTC.forEach(extenders, function(extender) {
                extender.call(self);
            });
        };
    },
    Loop: function() {
        ko.mapping.fromJS(arguments[0], {
            'actions': {create: RTC.MakeObjPropsObs},
            'connections': {create: RTC.MakeObjPropsObs},
            'counts': {create: RTC.MakeObjPropsObs},
            'comments': {create: function(o) {
                    return o && new RT.Comment(o.data);
                }},
            'attachments': {create: function(o) {
                    return o && new RTC.CreateLoop(o.data);
                }}
        }, this);
        return this.init();
    },
    PageInterface: function() {
        var self = this;
        self.history = ko.observableArray([]);
        self.isFormPage = ko.observable(!1);
        self.currentIndex = ko.observable(1);
        self.currentPage = ko.computed(function() {
            return this.history()[this.currentIndex()];
        }, self);
        self.goBack = function(page, dontDeleteHistory) {
            var ci = self.currentIndex;
            page = page || 1;
            !dontDeleteHistory && self.history.pop();
            return ci() - page > 0 ? ci(ci() - page) : ci(0);
        };
        self.goTo = function(cb, page) {
            var ci = self.currentIndex, h = self.history;
            page = page || 1;
            typeof cb === 'function' && h.push(cb()) || h.push(cb);
            return ci(page);
        };
        self.init();
    },
    Obstract: function(o, k) {
        return RT.Com.GetObsVal(RT.Com.arrGet(o, k));
    },
    locationArrays: {
        subtypes: ["HDB", "Private Apartments", "Serviced Apartments", "Private Landed"],
        hdbTypes: ["2I", "2S (Standard)", "3A", "3A Modified", "3NG", "3NG Modified", "3I", "3I Modified", "3S (Simplified)", "3STD (Standard)", "4A", "4NG", "4S (Simplified)", "4I", "4STD (Standard)", "5A", "5I", "5S", "EA", "EM", "Other"],
        aptTypes: ['Condominium', 'Walkup', 'Apartment'],
        landedTypes: ["Bungalow", "Bungalow (Good Class)", "Detached", "Semi-Detached", "Terraced", "Corner-Terrace", "Town House", "Shop House", "Conservation House", "Clustered Housing"]
    },
    Validation: {
        username: {
            restricted: {
                rule: "admin|^realtasia|^support|^rta|^customer|^member|people|^location|^listing|^usernam|^post|^album|^attachment|^comment|^fuck|^moderat|^help|^finance",
                message: "Sorry, your username contains restricted words. Please try again."
            },
            invalid: {
                rule: "^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$",
                message: 'Your username can be seperated with a dot(.), a hyphen(-) or an underscore(_). e.g. "user-name" or "UserName" is VALID but "username-" or "-username" IS NOT. Please try again.'
            },
            notUnique: {
                message: "This username is taken, please try another."
            }
        },
        mobile: {
            invalid: {message: "Please enter a valid Singapore Mobile number"},
            notUnique: {message: "This number has already been registered."}
        },
        device: {
            noMobileListings: '<p><i class="icon-lightbulb"></i> Oops!<br><small><b>Edit</b> or <b>Create</b> listings on your Desktop or Notebook computer.</small></p>'
        }
    }
};
window["RTC"] = RT["Com"];
RTC["DateFormat"]["masks"] = {"default": "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};
RTC["DateFormat"]["i18n"] = {dayNames: "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), monthNames: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")};
RTC["PageInterface"].prototype = new RTC.Base;
RTC["Loop"].prototype = new RTC.Base;

RT["handlers"] = {
    reverse: {
        init: function(e, vA, allBindingsAccessor, context) {
            var obs = vA(), rev = function() {
                return function() {
                    return obs(!obs());
                };
            };
            return ko.bindingHandlers.click.init(e, rev, allBindingsAccessor, context);
        }
    },
    map: {
            init: function (element, valueAccessor) {
                if(typeof google === 'undefined')
                    return;
                google.maps.visualRefresh = true;
                var mapObj = ko.unwrap(valueAccessor()),
                        latLng = new google.maps.LatLng( ko.unwrap(mapObj.lat),ko.unwrap(mapObj.lon)),
                        mapOptions = { center: latLng, zoom: 12, mapTypeId: google.maps.MapTypeId.ROADMAP};

                this.googleMap = new google.maps.Map(element, mapOptions);

                this.marker = new google.maps.Marker({
                    map: this.googleMap,
                    position: latLng,
                    title: 'address', //mapObj.address(),
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                });

                this.onChangedCoord = function(newValue) {
                    var latLng = new google.maps.LatLng( ko.unwrap(mapObj.lat), ko.unwrap(mapObj.lon));
                        this.marker.setPosition(latLng);
                        this.googleMap.setCenter(latLng);
                }.bind(this);

                this.onMarkerMoved = function(dragEnd) {
                    var latLng = this.marker.getPosition();
                    mapObj.lat(latLng.lat());
                    mapObj.lon(latLng.lng());
                }.bind(this);

                    mapObj.lat && mapObj.lat.subscribe(this.onChangedCoord);
                    mapObj.lon && mapObj.lon.subscribe(this.onChangedCoord);


                google.maps.event.addListener(this.marker, 'dragend', this.onMarkerMoved);

                //$(element).data("mapObj",mapObj);
            }
        },
    flash: {
        update: function(a, b) {
            var show = ko.unwrap(b());
            return !!show ? jQuery(a).fadeIn(500) : jQuery(a).hide();
        }
    },
    alertminate: {
        update: function(ele, v) {
            return ko.unwrap(v()) && setTimeout(function() {
                return $(ele).transition({scale: 1.5}).transition({scale: 1});
            }, 1000);
        }
    },
    slideIn: {
        update: function(a, b) {
            return ko.unwrap(b()) && $(a).hide().slideDown("fast", 'swing').effect("highlight", {color: "rgb(255, 251, 242)"}, 1e3);
        }},
    slideToggle: {
        init: function(element, b) {
            var e = $(element);
            ko.unwrap(b()) && e.slideDown('fast', 'swing') || e.hide('fast', 'swing');
        },
        update: function(element, b) {
            var e = jQuery(element);
            ko.unwrap(b()) && e.slideDown('fast', 'swing') || e.hide('fast', 'swing');
        }
    },
    getHtml: {
        init: function(element, vA, allBindingsAccessor, viewModel) {
            var d = ko.unwrap(vA());
            viewModel.isLoadingIframe(true);
            d.bind('load', function() {
                viewModel.isLoadingIframe(false);
            });
            d.bind('error', function() {
                viewModel.isLoadingIframe(false);
                $(this).html('<span class="alert alert-error">Sorry, we encountered and error showing this file. Please download it instad.</span>');
            });
            $(element).append(d);
        }
    },
    serverForEach: {
        init: function(element, vA) {
            ko.virtualElements.emptyNode(element);
            return ko.bindingHandlers.template.init(element, vA);
        },
        update: function(element, vA, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.template.update.apply(viewModel, arguments);
        }
    },
    datepicker: {
        init: function(element, vA, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options.prevText = options.nextText = "";
            jQuery(element).datepicker(options);
            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function() {
                var observable = vA();
                observable(jQuery(element).datepicker("getDate"));
            });
            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                jQuery(element).datepicker("destroy");
            });
        },
        update: function(element, vA) {
            var value = ko.unwrap(vA()),
                    current = jQuery(element).datepicker("getDate");
            if (value - current !== 0) {
                jQuery(element).datepicker("setDate", value);
            }
        }
    },
    autoComplete: {
        init: function(element, params) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                jQuery(element).autocomplete("destroy");
            });
            jQuery(element).autocomplete(params());
        },
        update: function(element, params) {
            jQuery(element).autocomplete("option", "source", params().source);
        }
    },
    timeago: {
        update: function(element, vA) {
            var value = new Date(ko.unwrap(vA()) * 1000).format('isoDateTime'),
                    $ = window.jQuery,
                    e = $(element);
            e.attr('title', value);
            e.attr('datetime', value);
            if (e.data('timeago')) {
                var datetime = $.timeago.datetime(e),
                        distance = (new Date().getTime() - datetime.getTime()),
                        inWords = $.timeago.inWords(distance);
                return e.data('timeago', {datetime: datetime}) && e.text(inWords);
            }
            return e.timeago();
        }
    },
    clickWithParams: {
        init: function(element, vA, allBindingsAccessor, context) {
            var options = vA();
            var newvA = function() {
                return function() {
                    options.action.apply(context, options.params);
                };
            };
            ko.bindingHandlers.click.init(element, newvA, allBindingsAccessor, context);
        }
    },
    dateText: {
        update: function(element, vA, allBindingsAccessor) {
            var value = new Date(ko.unwrap(vA()) * 1000),
                    allBindings = allBindingsAccessor(),
                    pattern = allBindings.datePattern || 'dS mmm yy, h.MMtt';
            jQuery(element).text(value.format(pattern));
        }
    },
    dateISO: {
        update: function(element, vA, allBindingsAccessor) {
            var value = new Date(ko.unwrap(vA()) / 1000),
                    allBindings = allBindingsAccessor(),
                    pattern = allBindings.datePattern || 'isoDateTime';
            jQuery(element).text(value.format(pattern));
        }
    },
    checkedButtons: {
        init: function(element, vA) {
            var type = element.getAttribute('data-toggle') || 'radio';
            var updateHandler = function() {
                var valueToWrite;
                var isActive = !!~element.className.indexOf('active');
                var dataValue = element.getAttribute('data-value');
                if (type === "checkbox") {
                    valueToWrite = !isActive;
                } else if (type === "radio" && !isActive) {
                    valueToWrite = dataValue;
                } else {
                    return; // "checkedButtons" binding only responds to checkbox and radio data-toggle attribute
                }

                var modelValue = vA();
                if ((type === "checkbox") && (ko.unwrap(modelValue) instanceof Array)) {
                    // For checkboxes bound to an array, we add/remove the checkbox value to that array
                    // This works for both observable and non-observable arrays
                    var existingEntryIndex = ko.utils.arrayIndexOf(ko.unwrap(modelValue), dataValue);
                    if (!isActive && (existingEntryIndex < 0))
                        modelValue.push(dataValue);
                    else if (isActive && (existingEntryIndex >= 0))
                        modelValue.splice(existingEntryIndex, 1);
                } else {
                    if (modelValue() !== valueToWrite) {
                        modelValue(valueToWrite);
                    }
                }
            };
            ko.utils.registerEventHandler(element, "click", updateHandler);
        },
        update: function(element, vA) {
            var value = ko.unwrap(vA());
            var type = element.getAttribute('data-toggle') || 'radio';
            if (type === "checkbox") {
                if (value instanceof Array) {
                    // When bound to an array, the checkbox being checked represents its value being present in that array
                    if (ko.utils.arrayIndexOf(value, element.getAttribute('data-value')) >= 0) {
                        ko.utils.toggleDomNodeCssClass(element, 'active', true);
                    }
                    else {
                        ko.utils.toggleDomNodeCssClass(element, 'active', false);
                    }

                } else {
                    // When bound to anything other value (not an array), the checkbox being checked represents the value being trueish
                    ko.utils.toggleDomNodeCssClass(element, 'active', value);
                }
            } else if (type === "radio") {
                ko.utils.toggleDomNodeCssClass(element, 'active', element.getAttribute('data-value') === value);
            }
        }
    },
    title: {
        init: function(e, vA, binds) {
            if (!binds().qtip && ko.unwrap(vA())) {
                var b = ko.unwrap(binds()), position = b.position || "top";
                $(e).tooltipster({
                    content: ko.unwrap(vA()),
                    arrow: false,
                    animation: "grow",
                    position: position,
                    offsetY: 30,
                    touchDevices: false
                });
                ko.utils.domNodeDisposal.addDisposeCallback(e, function() {
                    $(e).tooltipster("destroy");
                });
            }
        },
        update: function(e, vA, binds) {
            return !binds().qtip && ko.unwrap(vA()) && $(e).tooltipster("update", ko.unwrap(vA()));
        }
    },
    helpText: {
        init: function(element, vA, binds, vm) {
            var e = $(element);
            // Add a class so we can search for all elements that have a Qtip
            e.addClass('generated_qtip');
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                return $(element).qtip("hide").qtip("destroy").removeClass('generated_qtip');
            });
            var content = ko.unwrap(vA()),
                    p = RT.Com.qtipPlacement(element),
                    e = $(element);
            e.qtip({
                content: {text: '<div class="centralize">' + content + '</div>'},
                show: {when: 'click', delay: 0},
                hide: {
                    delay: 100,
                    fixed: true, // <--- add this
                    effect: function() {
                        $(this).fadeOut(250);
                    }
                },
                position: {
                    corner: {
                        target: p.target,
                        tooltip: p.tooltip
                    },
                    adjust: {
                        resize: true,
                        scroll: true
                    }
                },
                style: {
                    padding: 5,
                    border: {width: 2, radius: 1, color: '#999'},
                    tip: p.tooltip,
                    name: 'dark'
                }
            });
        },
        update: function(element, vA, binds) {
            var title = ko.unwrap(vA()), e = $(element);
            element.title = title;
            e.qtip("option", "content", {text: title});
        }
    },
    getAvatar: {
        init: function(element, vA) {
            var options = vA(), avatar = RT.Com.Avatar.apply(null, [ko.unwrap(options.context), options.size]);
            jQuery(element).attr('src', avatar);
        }
    },
    expand: {
        init: function(element, va) {
            va = ko.unwrap(va) || 25;
            $(element).css('height', va).autosize().trigger('autosize.resize');
        },
        update: function(element) {
            $(element).trigger('autosize.resize');
        }
    },
    colorbox: {
        init: function(element, vA) {
            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                //return $.colorbox.remove();
            });
            return $(element).colorbox(ko.unwrap(vA()) || {});
        }
    },
    scroll: {
        init: function(e) {
            return $(e).addClass("customScroll").mCustomScrollbar({
                enable: true,
                theme: "dark-thick",
                contentTouchScroll: true,
                autoHideScrollbar: true,
                scrollInertia: 200,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true
                }
            });

        }
    },
    scrollMessages: {
        init: function(e, va, allBindings, vm, context) {
            var d = ko.unwrap(va()), p = ko.unwrap(context).$parent;
            console.log(d);
            return $(e).addClass("customScroll").mCustomScrollbar({
                enable: true,
                theme: "dark-thick",
                contentTouchScroll: true,
                autoHideScrollbar: true,
                scrollInertia: 200,
//                advanced: {
//                    updateOnContentResize: true,
//                    updateOnBrowserResize: true
//                },
                callbacks: {
                    onTotalScrollBackOffset: 30,
                    onTotalScrollBack: function() {
                        if (!!d.length) {
                            this.messagesPrepended(d[0]._id());
                            if (d.length === p.sc.counts.messages()) {
                                return $(e).mCustomScrollbar("scrollTo", 40, {
                                    scrollInertia: 200
                                });
                            }
                        }
                        return this.getMessages.call(this);
                    }.bind(p)
                }
            });

        }
    },
    qtip: {
        init: function(element, vA, binds, vm) {
            //return true;
            var e = $(element), delay = 0;
            e.click(function(i) {
                i.preventDefault();
            });
//        // Add a class so we can search for all elements that have a Qtip
            e.addClass('generated_tipster');
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                return $(element).tooltipster("destroy").removeClass('generated_tipster');
            });
            var content = ko.unwrap(vA()),
                    e = $(element),
                    cssClass = e.hasClass('large') ? 'large' : 'regular',
                    csswidth = cssClass === 'large' ? 420 : 380;
            e.tooltipster({
                content: '<div class="centralize icon-2x"><i class="icon-spinner icon-spin"></i></div>',
                theme: ".tooltipster-hovercard",
                fixedWidth: csswidth,
                maxWidth: csswidth,
                interactive: true,
                offsetY: 35,
                updateAnimation: false,
                animation: "fade",
                position: RT.Com.qtipPlacement(element),
                functionReady: function(origin) {
                    if (delay === 0) {
                        delay = setTimeout(function() {
                            var key = content.call(null, vm);
                            if (RT.Com.cards[key]) {
                                return origin.tooltipster('update', RT.Com.cards[key]);
                            }
                            return $.get(key, function(r) {
                                RT.Com.cards[key] = r;
                                return origin.tooltipster('update', r);
                            });
                        }, 500);
                    }
                    return;
                },
                functionAfter: function() {
                    return clearTimeout(delay) && (delay = 0);
                }
            });
        }
    },
    feedbackAnimate: {
        update: function(ele, val) {
            var v = ko.unwrap(val()), e = $(ele),
                    bg = e.find('#feedbackBG'), f = e.find('#feedbackForm');
            if (v) {
                bg.fadeIn();
                f.transition({marginRight: '0%'}, 500, 'easeInOutQuad');
            } else {
                bg.fadeOut();
                f.transition({marginRight: '-75%'}, 500, 'easeInOutQuad');
            }
        }
    },
    valueWithInit: {
        init: function(element, valueAccessor, allBindingsAccessor, context) {
            var observable = valueAccessor(), value = element.value, e = $(element);
            observable(value || null);
            e.closest('form').listenForChange();
            e.change(ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, context));
            ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor, context);
        },
        update: function(element, valueAccessor, allBindingsAccessor, context) {
            var observable = valueAccessor(), value = element.value;
            observable(value || observable());
            ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor, context);
        }
    },
    toggleColorbox: {
        update: function(element, vA) {
            return $(element).colorbox[ko.unwrap(vA()) ? "open" : "close"]();
        }
    },
    hoverClass: {
        update: function(element, vA) {
            var css = vA();
            ko.utils.registerEventHandler(element, "mouseover", function(event) {
                event.cancelBubble = true;
                event.stopPropagation && event.stopPropagation();
                return ko.utils.toggleDomNodeCssClass(element, ko.unwrap(css), true);
            });
            ko.utils.registerEventHandler(element, "mouseout", function(event) {
                event.cancelBubble = true;
                event.stopPropagation && event.stopPropagation();
                return ko.utils.toggleDomNodeCssClass(element, ko.unwrap(css), false);
            });
        }
    },
    growl: {
        init: function(element, vA, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            return setTimeout(function() {
                $.bootstrapGrowl(ko.unwrap(vA()), options);
            }, 1000);
        }
    },
    RTAValidationMsg: {// individual error message, if modified or post binding
        update: function(element, valueAccessor) {
            var obsv = valueAccessor(),
                    i = $(RTC.NewDom('i')), d = $(RTC.NewDom('div')),
                    success = function() {
                var c = i.clone();
                return d.empty().append(c.addClass('icon-ok')).html() + "&nbsp;" + ($(element).data('title') || element.title);
            },
                    error = function() {
                var c = i.clone();
                return d.empty().append(c.addClass('icon-warning-sign')).html() + "&nbsp;" + obsv.error();
            },
                    info = function() {
                var c = i.clone();
                return d.empty().append(c.addClass('icon-spinner icon-spin')).html() + "&nbsp;";
            },
                    isModified = false,
                    isValid = false;
            obsv.extend({validatable: true});
            isModified = obsv.isModified();
            isValid = obsv.isValid();
            // create a handler to correctly return message
            var errorMsgAccessor = function() {
                if (isModified) {
                    return isValid ? success() : error();
                }
                if (obsv.isValidating()) {
                    return info();
                }
                return null;
            };
            // hide if no changes.
            var visiblityAccessor = function() {
                return !!isModified;
            };
            ko.bindingHandlers.html.update(element, errorMsgAccessor);
            ko.bindingHandlers.visible.update(element, visiblityAccessor);
        }
    },
    RTAValidationEle: {
        update: function(element, valueAccessor) {
            var obsv = valueAccessor(),
                    isModified = false,
                    isValid = false,
                    cssSettingsAccessor, toggleClasses, origTitle, elementTitle,
                    errorMsgTitleAccessor;
            obsv.extend({validatable: true});
            isModified = obsv.isModified();
            isValid = obsv.isValid();
            // create an evaluator function that will return something like:
            // css: { validationElement: true }
            cssSettingsAccessor = function() {
                var css = {success: false, error: false, info: false};
                if (isModified) {
                    if (isValid) {
                        toggleClasses('success', css);
                    } else if (obsv.isValidating()) {
                        toggleClasses('info', css);
                    } else {
                        toggleClasses('error', css);
                    }
                }
                return css;
            };
            toggleClasses = function(cls, obj) {
                for (var p in obj) {
                    obj[p] = (p === cls);
                }
            };
            //add or remove class on the element;
            ko.bindingHandlers.css.update(element, cssSettingsAccessor);
            origTitle = $(element).data('orig-title');
            elementTitle = element.title;
            errorMsgTitleAccessor = function() {
                if (isModified) {
                    if (!isValid) {
                        return {title: obsv.error, 'data-orig-title': origTitle || elementTitle};
                    } else {
                        return {title: origTitle || elementTitle, 'data-orig-title': null};
                    }
                }
            };
            return ko.bindingHandlers.attr.update(element, errorMsgTitleAccessor);
        }
    },
    animateActive: {
        init: function(element, va) {
            return !ko.unwrap(va()) && $(element).hide();
        },
        update: function(element, va) {
            return ko.unwrap(va()) && $(element).slideDown({duration: 200, easing: 'easeOutQuad'}) || $(element).fadeOut(100);
        }
    },
    slideTemplate: {
        init: ko.bindingHandlers.template.init,
        update: function(element, valueAccessor, allBindingsAccessor, vm, context) {
            var args = arguments, e = $(element);
            e.hide();
            ko.bindingHandlers.template.update.apply(null, args);
            return e.fadeIn(100);
        }
    },
    checkedRadioToBool: {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var observable = valueAccessor(),
                    interceptor = ko.computed({
                read: function() {
                    return observable().toString();
                },
                write: function(newValue) {
                    observable(newValue === "true");
                },
                owner: this
            });
            ko.applyBindingsToNode(element, {checked: interceptor});
        }
    },
    href: {
        init: function(element, va) {
            return element.href = ko.unwrap(va());
        }
    },
    log: {
        init: function(e, v) {
            return console.log(ko.unwrap(v()));
        }
    },
    radioButton: {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor(), e = $(element), nv = ko.unwrap(allBindingsAccessor().value),
                    handler = function() {
                return function() {
                    e.parent().children().each(function() {
                        return $(this).removeClass("active");
                    });
                    return e.addClass("active") && value(nv);
                };
            };
            value() === nv && e.addClass('active');
            return ko.bindingHandlers.click.init(element, handler, allBindingsAccessor);
        }
    },
    switchClass: {
        init: function(element, valueAccessor) {
            var v = ko.unwrap(valueAccessor()), e = $(element), c = v.removeAdd;
            return v.val() ? e.switchClass(c[1], c[0]) : e.switchClass(c[0], c[1]);
        },
        update: function(element, valueAccessor) {
            var v = ko.unwrap(valueAccessor()), e = $(element), c = v.removeAdd;
            return v.val() ? e.switchClass(c[1], c[0]) : e.switchClass(c[0], c[1]);
        }
    }
};

/**
 *  Runtime Function: jQuery & startup Defaults
 *  Author:     Jason Nathan
 *
 *  Sets some plugin defaults and some basic support checks
 *
 *  @param $ jQuery
 */
(function($) {
    /**
     * autocomplete highlight results
     *
     * @param u the UL object to manipulate
     * @param i the item
     *
     * returns bolded text in the lis of the ul
     */
    $.ui.autocomplete.prototype._renderItem = function(u, i) {
        "use strict";
        var t = this.term.split(' ').join('|'), n = i.label.replace(new RegExp("(" + t + ")", "gi"), "<b>$1</b>");
        return $(RTC.NewDom('li')).data("item.autocomplete", i).append("<a>" + n + "</a>").appendTo(u);
    };
    !$.support.transition && ($.fn.transition = $.fn.animate);
    $.fn.listenForChange = function(options) {
        settings = $.extend({
            interval: 200 // in microseconds
        }, options);
        var jquery_object = this;
        var current_focus = null;
        jquery_object.filter(":input").add(":input", jquery_object).focus(function() {
            current_focus = this;
        }).blur(function() {
            current_focus = null;
        });
        setInterval(function() {
// allow
            jquery_object.filter(":input").add(":input", jquery_object).each(function() {
// set data cache on element to input value if not yet set
                if ($(this).data('change_listener') === undefined) {
                    $(this).data('change_listener', $(this).val());
                    return;
                }
// return if the value matches the cache
                if ($(this).data('change_listener') === $(this).val()) {
                    return;
                }
// ignore if element is in focus (since change event will fire on blur)
                if (this === current_focus) {
                    return;
                }
// if we make it here, manually fire the change event and set the new value
                $(this).trigger('change');
                $(this).data('change_listener', $(this).val());
            });
        }, settings.interval);
        return this;
    };
    function defaultToWhiteSpace(characters) {
        return characters ? characters.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') : '\\s';
    }
    ;
    !String.prototype.trim && (String.prototype.trim = function(characters) {
        characters = defaultToWhiteSpace(characters);
        return this ? this.replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '') : '';
    });
    !String.prototype.ltrim && (String.prototype.ltrim = function(characters) {
        characters = defaultToWhiteSpace(characters);
        return this ? this.replace(new RegExp('^' + characters + '+'), '') : '';
    });
    !String.prototype.rtrim && (String.prototype.rtrim = function(characters) {
        characters = defaultToWhiteSpace(characters);
        return this ? this.replace(new RegExp(characters + '+$'), '') : '';
    });
    !String.prototype.prune && (String.prototype.prune = function(length, pruneStr) {
        var str = this;
        if (str === null)
            return '';
        str = String(str);
        length = ~~length;
        pruneStr = pruneStr !== null ? String(pruneStr) : '...';
        if (str.length <= length)
            return str;
        var tmpl = function(c) {
            return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
        }, template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

        if (template.slice(template.length - 2).match(/\w\w/))
            template = template.replace(/\s*\S+$/, '');
        else
            template = template.slice(0, template.length - 1).rtrim();
        return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
    });
    !String.prototype.ucfirst && (String.prototype.ucfirst = function() {
        var l = this.toLowerCase();
        return l.charAt(0).toUpperCase() + l.slice(1);
    });
    !String.prototype.ucwords && (String.prototype.ucwords = function() {
        var t = this.toLowerCase().split(" ");
        RTC.forEach(t, function(i) {
            return t[t.indexOf(i)] = i.ucfirst();
        });
        return t.join(" ");
    });
    !String.prototype.stripTags && (String.prototype.stripTags = function(allowed) {
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return this.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    });
    !String.prototype.escapeText && (String.prototype.escapeText = function() {
        return RTC.NewDom('div').appendChild(document.createTextNode(this)).innerHTML;
    });
    !Array.prototype.indexOf && (Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    });
    !Object.prototype.hasOwnProperty && (Object.prototype.hasOwnProperty = function(name) {
        return name in this;
    });
    !Date.prototype.format && (Date.prototype.format = function(j, k) {
        return RT.Com.DateFormat(this, j, k);
    });
    !Function.prototype.bind && (Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {
        },
                fBound = function() {
            return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    });
})(jQuery);

/**
 *  Runtime Function: KO defaults & defs
 *  Author:     Jason Nathan
 *
 *@param ko knockout
 *@param RT RT object
 *@param $ jQuery
 */
(function(ko, RT, $) {
    ko.utils.extend(ko.bindingHandlers, RT.handlers);
    delete RT.handlers;
    ko["validateIfChanged"] = function(value) {
        //private variables
        var changedVal = ko.observable(value), initialValue = value,
                //act exactly like a regular observable
                result = ko.computed({
            //return the changed observable
            read: function() {
                return changedVal();
            },
            //store new value in changed observable
            write: function(newValue) {
                changedVal(newValue);
            }
        });
        // method to revert back to the original
        result.revert = function() {
            changedVal(initialValue);
            return changedVal();
        };
        // method to retrieve the initial value
        result.initial = function() {
            return initialValue;
        };
        // a method to check if the value has been changed from the original
        result.hasChanged = function() {
            return initialValue !== changedVal();
        };
        return result;
    };
    ko["validation"].configure({decorateElement: !0, errorElementClass: "error", insertMessages: !1});
    ko["virtualElements"]["allowedBindings"]["serverForEach"] = true;
    // Insert items at beginning of the array
    ko.observableArray.fn["insertAll"] = function(items) {
        this.unshift.apply(this, items);
    };
    // Push all items to the end of the array
    ko.observableArray.fn["pushAll"] = function(items) {
        this.push.apply(this, items);
    };

    ko.observableArray.fn["addToSet"] = function(item, remove, key) {
        if (!key) {
            key = '_id';
        }
        var go = RTC.GetObsVal, f = ko.utils.arrayFirst(this(), function(i) {
            return go(i[key]) === go(item[key]);
        });

        if (!f) {
            this.unshift(item);
            return true;
        }
        remove && this.remove(item);
        return false;
    };
    ko.observableArray.fn["replaceOrAdd"] = function(item, remove, key) {
        if (!key) {
            key = '_id';
        }
        var go = RTC.GetObsVal, f = ko.utils.arrayFirst(this(), function(i) {
            return go(i[key]) === go(item[key]);
        });

        if (!f) {
            this.unshift(item);
            return true;
        }
        remove && this.remove(item) || this.replace(f, item);
        return false;
    };
    ko.unapplyBindings = function(node, remove) {
        var $node = $(node);
        // unbind events
        $node.find("*").each(function() {
            $(this).unbind();
        });

        // Remove KO subscriptions and references
        if (remove) {
            ko.removeNode($node[0]);
        } else {
            ko.cleanNode($node[0]);
        }
    };

    //RT Modal && ko binding RTModal
    (function() {
        RT.Modal = function(options) {
            var self = this, o = "isLoading direction showMap isSlideShow";
            RTC.MakeObsFromArray.call(self, o);
            self.items = options.items || [];
            self.total = options.total || ko.observable(RT.Com.GetObsVal(this.items).length);
            self.totalLabel = options.totalLabel || 'items';
            self.currentItem = options.currentItem;
            self.currentIndex = ko.computed(function() {
                return this.items.indexOf(this.currentItem());
            }, self);
            self.totalText = ko.computed(function() {
                return (this.currentIndex() + 1) + " of " + this.total() + " " + this.totalLabel;
            }, self);
            self.loadMore = options.loadMore;
            self.isSlideShow(options.isSlideShow || self);
            self.isModal = options.isModal || self;
            self.hasListing = options.hasListing || null;
            self.closeSlideshow = function() {
                $('#rtModal').fadeOut('fast', function() {
                    self.currentItem(null);
                });
            };
            self.setCurrentItem = function(item) {
                self.currentItem(item) && self.isLoading(true) && self.resize();
            };
            self.slideToggle = function(d, e) {
                return e.currentTarget.id === 'slidePrev' ? self.previousThing() : self.nextThing();
            };
            self.slideRight = function(d, e) {
                return self.previousThing();
            };
            self.slideLeft = function(d, e) {
                return self.nextThing();
            };
            self.previousThing = function() {
                "use strict";
                var t = this, ci = t.currentIndex(); //, prevIndex;
                if (t.isSlideShow() && ci !== 0) {
                    self.isLoading(true);
                    //prevIndex = t.currentIndex() === 0 ? t.total() - 1 : t.currentIndex() - 1;
                    t.direction("right");
                    return t.currentItem(t.items()[ci - 1]);
                }
                return false;
            };
            self.nextThing = function() {
                "use strict";
                var t = this, ci = t.currentIndex(); //, nextIndex;
                if (t.isSlideShow() && (ci + 1 < t.total())) {
                    self.isLoading(true);
                    //nextIndex = t.currentIndex() === t.total() - 1 ? 0 : t.currentIndex() + 1;
                    t.direction("left");
                    return t.currentItem(t.items()[ci + 1]);
                }
                return false;
            };
            self.resize = function(cb) {
                "use strict";
                var t = this, sl = function() {
                    if (typeof(cb) === 'function') {
                        cb.call();
                    }
                    return this.isLoading(false);
                }.bind(t);
                if (t.isSlideShow()) {
                    return $('#rtModalBox').animate(t.currentItem().dimensions(), {
                        duration: 500,
                        easing: 'easeInOutQuart',
                        complete: sl
                    });
                }

                return true;
            };
            self.style = ko.computed(function() {
                var b = this.currentItem() && this.currentItem().dimensions(), g = '';
                for (var p in b) {
                    g += p + ": " + b[p] + 'px;';
                }
                return g;
            }, self);
            self.displayMap = function() {
                //self.currentItem("");
                self.showMap(true);
            };
            self.currentItem.subscribe(function(v) {
                return RTApp.currentSlideShow(v ? this : null);
            }, self);
            self.currentIndex.subscribe(function(v) {
                var t = this, currentTotal = typeof t.items === 'function' && t.items().length || 0,
                        v1 = v === currentTotal, v2 = (v + 1) === currentTotal, v3 = v === 0;
                if (currentTotal !== t.total() && (v1 || v2 || v3)) {
                    var ajax = typeof t.loadMore === 'function' && t.loadMore();
                    ajax && ajax.done(function(r) {
                        r.data.length > 10 && r.data.pop();
                        r.data && t.items.pushAll(ko.utils.arrayMap(r.data, RT.Com.CreateLoop));
                    });
                }
            }, self);
        };
        // Templates used to render the grid
        var te = new ko.nativeTemplateEngine();
        te.addTemplate = function(templateName, templateMarkup) {
            if (!document.getElementById(templateName)) {
                document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup.replace("/n", "") + "<" + "/script>");
            }
        };
        te.addTemplate("rt_modal", "<div id=\"rtModal\" data-bind=\"event:{swipeleft:slideLeft, swiperight:slideRight}\">\
                <div id=\"rtModalOverlay\"></div>\
                <div id=\"slideshow\">\
                    <div data-bind=\"visible:!isLoading()\" id=slideshowNav>\
                        <div style=\"position:absolute;right:5px;top:3px;background:#000;\">\
                            <a href=\"#\" data-bind=\"click:closeSlideshow,event:{singletap:closeSlideshow}\" style=\"font-size:3em;color:#fff;\">×</a>\
                        </div>\
                        <div class=\"visible-desktop\" style=\"position:absolute;left:5px;bottom:45%; opacity: .9\">\
                            <a href=\"#\" data-bind=\"click:slideToggle\" id=\"slidePrev\" style=\"font-size:3.5em;color:#fff;\">&lsaquo;</a></div>\
                        <div class=\"visible-desktop\" style=\"position:absolute;right:5px;bottom:45%; opacity: .9\">\
                            <a href=\"#\" data-bind=\"click:slideToggle\" id=\"slideRight\" style=\"font-size:3.5em;color:#fff;\">&rsaquo;</a></div>\
                    </div>\
                    <div id=\"rtModalBox\"class=\"clearfix\" >\
                    <div data-bind=\"visible:isLoading\" id=\"rtModalLoadingGraphic\">\
                                <i class=\"icon-spinner icon-spin icon-3x\" data-bind=\"css:{inverted:isSlideShow}\" ></i></div>\
                        <div id=\"rtModalLoadedContent\" data-bind=\"visible:!isLoading()\">\
                            <p id=\"slideshowTotalCount\" data-bind=\"visible:isSlideShow,text:totalText\"></p>\
                            <div data-bind=\"foreach:items\">\
                                <div class=\"draggable\" data-bind=\"getHtml:$data.getFullPreview.bind($data),visible:$data === $parent.currentItem() && !$parent.isLoading() && !$parent.showMap()\"></div>\
                            </div>\
                        </div>\
                    </div>\
                    <div style=\"width:25%;position:fixed;right:30px;top:5%;bottom:5%;\" class=\"outerBox visible-desktop\" data-bind=\"with:currentItem\">\
                        <div style=\"position:absolute;top:0;bottom:0;left:0;right:0;\" class=\"contentArea contentBox\">\
                        <div class=\"media\" data-bind=\"ifnot:$parent.hasListing\">\
                            <span class=\"pull-left\">\
                                <a href=\"#\" data-bind=\"attr:{title:user.name}\" style=\"width:40px\">\
                                    <img alt=\"Author\" class=\"img-polaroid\"  data-bind=\"getAvatar : {context:$data.user, size:40}\" width=\"40\" height=\"40\">\
                                </a>\
                            </span>\
                            <div class=\"media-body postTitle\">\
                                <a data-bind=\"attr:{href: '/' + user._id()}, title: 'View ' + user.name() + '\\\'s Profile', text: user.name\" class=\"personHoverCard\"></a>\
                                <p data-bind=\"text:description\"></p><small data-bind=\"timeago:created\" class=\"muted\"></small>\
                            </div>\
                        </div>\
                        <div data-bind=\"with:$parent.hasListing\" class=\"relative\">\
                            <h3 class=\"media-heading\" style=\"line-height:20px\">\
                                <a href=\"#\" data-bind=\"attr:{href : page.uri}, title:\'Go to \' + page.name() + \'\\\'s Profile\', text:page.name\"></a>\
                                <a href=\"#\"><small class=\"muted\" data-bind=\"text:listing.property_type() + '- for ' + listing.type()\"></small></a>\
                            </h3>\
                            <p data-bind=\"html:excerpt\" style=\"margin:10px 0 0 10px\"></p>\
                            <table class=\"table table-condensed\" style=\"margin:10px 5px 5px 5px\">\
                                <tr data-bind=\"if: listing.leaseSpace\"><th>Renting</th><td data-bind=\"text: listing.leaseSpace\"></td></tr>\
                                <tr><th>Asking</th><td data-bind=\"text: '$' + RTC.ThousandSep.call(null, listing.price())\"></td></tr>\
                                <tr data-bind=\"if: listing.valuation\"><th>Valuation</th><td data-bind=\"text: listing.valuation\"></td></tr>\
                                <tr data-bind=\"if: listing.cov\"><th>COV</th><td data-bind=\"text: listing.cov\"></td></tr>\
                                <tr><th>Built Size</th><td data-bind=\"text: listing.built_size\"></td></tr>\
                                <tr data-bind=\"if: listing.land_size\"><th>Land Size</th><td data-bind=\"text: listing.land_size\"></td></tr>\
                                <tr><th>Rooms</th><td data-bind=\"text: listing.rooms\"></td></tr>\
                                <tr data-bind=\"if:RTApp.user() && (RTApp.user().isAgent() || RTApp.user().isAdmin())\"><th>Cobroke Notes</th><td class=\"text-warning\"  data-bind=\"html:listing.cobroke\"></td></tr>\
                            </table>\
                            <ul class=\"nav nav-pills\" style=\"margin-bottom:0\">\
                                <!--<li><a href=\"#\">Attachments</a></li>\
                                <li class=\"divider\"></li>-->\
                                <li><a href=\"#\" data-bind=\"title:'This feature is not enabled yet.'\">Map</a></li>\
                                <li><a href=\"#\" data-bind=\"click:showComments\">Comments</a></li>\
                            </ul>\
                            <!--ko template:{name:'postActionLinks'}--><!--/ko-->\
                            <!--ko template:{name:'postComments',if:displayComments()}--><!--/ko-->\
                        </div>\
                        <!--ko template:{name:'postActionLinks', if:!$parent.hasListing}--><!--/ko-->\
                        <!--ko template:{name:'postComments',if:showCommentBox() && !$parent.hasListing}--><!--/ko-->\
                    </div>\
                </div>\
            </div>\
        </div>");
        ko["bindingHandlers"]["RTModal"] = {
            init: function() {
                return {'controlsDescendantBindings': true};
            },
            update: function(e, Accessor) {
                "use strict";
                var vm = Accessor(), uw = ko.unwrap(vm),
                        d = document, show = !!uw.currentItem(), n = d.getElementById('rtModal'),
                        p = d.getElementById('rtModalContainer');
                if (show) {
                    uw.isLoading(true);
                    if (!n) {
                        if (!p) {
                            p = d.createElement("DIV");
                        }
                        p.setAttribute("id", "rtModalContainer");
                        n = p.appendChild(d.createElement("DIV"));
                        ko.renderTemplate("rt_modal", vm, {templateEngine: te}, n, "replaceNode");
                        d.getElementsByTagName('body')[0].appendChild(p);
                        return uw.resize();
                    }
                    return $(p).fadeIn('fast', function() {
                        return uw.resize.call(uw, function() {
                            //$(p).find('.draggable img').draggable({axis: "x", revert: true, delay: 0});
                        });
                    });
                }

//                if(p){
//                    a[direction] = uw.currentItem().dimensions.width;
//                    return $(p).animate(a, {duration:'slow', complete: function(){
//                        return ko.virtualElements.emptyNode(p);
//                    }});
//
//                }
                return p && ko.virtualElements.emptyNode(p);
            }
        };
    })();
    //RT ConfirmDialog
    (function() {
        /**
         *
         * colorbox - with onComplete bind of a simple VM with ok and cancel functions
         *
         * @param {Object} options
         * @returns {void};
         */
        RT.ConfirmDialog = function(options) {
            options = options || {};
            this.title = options.title || "Are you sure?";
            this.message = options.message || "This action cannot be reversed.";
            this.ok = function() {
                typeof options.ok === 'function' && options.ok();
                return $.colorbox.close();
            };
            this.cancel = function() {
                typeof options.cancel === 'function' && options.cancel();
                return $.colorbox.close();
            };
        };

        ko["bindingHandlers"]["confirmDialog"] = {
            init: function(vm) {
                //return console.log(vm);
                var s = ko.utils.extend(RT.Com.CBSettings, {
                    href: RTC.getTemplate('dialog'), height: "auto", width: "35%", maxWidth: '95%', minWidth: '400px',
                    onComplete: function() {
                        ko.applyBindings(vm, document.getElementById("dialogContent"));
                        return $.colorbox.resize();
                    }
                });
                return $.colorbox(s);
            }
        };

    })();
    // simple method to keep the footer fixed to the bottom
    (function() {
        var w = $(window), fixFooter = function() {
            var $footer = $("#mainFooter"),
                    fHeight = $footer.height(),
                    fTop = (w.scrollTop() + w.height() - fHeight) + "px";

            return ($(document.body).height() + fHeight) < w.height()
                    ? $footer.css({position: "absolute"}).animate({top: fTop})
                    : $footer.css({position: "static"});
        };
        fixFooter();
        w.scroll(fixFooter).resize(fixFooter);
    })();
    // ko binding tick (for clocks) - currently not used
    (function() {
        var mins = new Date().getMinutes(), secs = mins * 60,
                minSpan = $(RTC.NewDom('span')).css('padding', '5px 10px'),
                secSpan = $(RTC.NewDom('span')).css('padding', '5px 10px'),
                t = this;
        t.minutes = function() {
            var m = Math.floor(secs % 3600 / 60);
            return m < 10 ? "0" + m : m;
        };
        t.seconds = function() {
            var s = Math.ceil(secs % 3600 % 60);
            return s < 10 ? "0" + s : s;
        };
        t.decrement = function() {
            if (secs >= 0) {
                secSpan.text(t.seconds());
                minSpan.text(t.minutes());
                secs--;
                setTimeout(t.decrement.bind(t), 1000);
            }
        };
        ko["bindingHandlers"]["tick"] = {
            init: function() {
                t.decrement.call(t);
                return {'controlsDescendantBindings': true};
            },
            update: function(e, Accessor) {
                "use strict";
                //var vm = Accessor(), uw = ko.unwrap(vm);
                $(e).append(minSpan).append(":").append(secSpan);
            }
        };
    });
//    // google maps loading
//    (function(){
//        var script = document.createElement("script");
//        script.type = "text/javascript";
//        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyC6-y0MkWb9eaFLz_HWMQlWhtgo-HAtDEE&sensor=true";
//        document.body.appendChild(script);
//    })();
})(ko, RT, jQuery);