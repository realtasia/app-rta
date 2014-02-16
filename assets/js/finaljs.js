/* File: assets/js/dependancies.js
   Compiled at: 2014-02-15 08:56:35 
================================ */
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
RT["PubSub"] = function(user){
	
	var self = this, app = RTApp
	, u = user || app.user()
	, socket = io.connect('http://localhost:3000/')
	, cl = app.cl();
	
	self.callbacks = {
		connect: function(data){
			var channel = RTC.GetObsVal(u._id);
			console.log("Connected, listening to: " + channel);
	        socket.emit('subscribe', {channel:channel});
	        if(u.hasOwnProperty('isAdmin') && u.isAdmin()){
	        	socket.emit('adminSubscribe', {channel:channel});
	        }       
	     },
	     disconnect: function(){},
	     message: function(msg){
          if(msg.type === 'private-message'){
			self.processMessage(msg);
          } else {
          	self.processNotify(msg);
          }
               	
	     }
	};
	
	self.processMessage = function(msg){
		var app = RTApp, inbox = app.inbox();
		msg.post_uri = u.uri() + '#conversations/' + msg.doc_id;
		
		if(app.ca() === 'conversations' && inbox && inbox.history().length >= 3){
			// we are in conversation view and we don't need to add the notifier to the
			// new message queue.
			if(inbox.history().history()[2] && inbox.history()[2].hasOwnProperty('messages')){
				
			}
		}
		
          	
          	u.unreadMessages.push(msg);
          	u.counts.newMessages(u.counts.newMessages() + 1);		
	};
	
	self.processNotify = function(msg){
		console.log({"Isupdatable":['comment', 'like', 'subscribe'].indexOf(msg.type) >= 0});
		if(['comment', 'like', 'subscribe'].indexOf(msg.type) >= 0){
			
			var post = ko.utils.arrayFirst(cl, function(item){
				return RTC.GetObsVal(item._id) === msg.doc_id;
			});
			
			if(post){
				console.log({"found a post":post});
				var counter = msg.type === 'comment' ? 'comments' : msg.type + 'rs';
				console.log({"counter":counter});
				if(post.counts[counter]){
					console.log({"count":post.counts[counter]()});
					post.counts[counter]( post.counts[counter]() + 1 );
					msg.type === 'comment' && post.getComment();
				} 
			}
		}
		
		u.newNotifications.push({
			summary: msg.summary.stripTags(),
			timestamp: msg.timestamp,
			excerpt: msg.excerpt,
			post_uri:msg.post_uri,
			iconClass: self.iconClass(msg.type),
			isActiveClass: self.isActiveClass(msg.type)
		});
	};
	
	self.isActiveClass = function(type){
		return type === 'subscribe' || type === 'like';
	};
	
	self.iconClass= function(type){

		switch(type){
			case 'comment': return "icon-comment color-comment";	
			case 'feedback': return "icon-bullhorn color-feedback" ;	
			case 'post': case 'wallpost': return "icon-file-text-alt color-post";	
			case 'listing': return  "icon-map-marker color-listing";	
			case 'testimonial': return  "icon-comment-alt color-testimonial";	
			case 'like': return  "action16 likeSmall";	
			case 'subscribe': return  "action16 subscribe";	
			case 'join_beta': return  "icon-user color-join_beta";	
			case 'approve_testimonial': return "icon-ok color-approve_testimonial";	
		}
	};

	self.init = function(){
		for(var cb in self.callbacks){
			socket.on(cb, self.callbacks[cb]);
		} 		
	};

	
};
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
		return true;
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
            if(!p.hasOwnProperty('messagesPrepended')){
            	p = ko.unwrap(context);
            }
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
                    	var r, c;
                    	if(this.hasOwnProperty('getMessages')){
                    		r = this.getMessages;
                    		c = p.sc.counts.messages();
                    	} else {
                    		r = this.getConversations;
                    		c = this.counts.messages();
                    	}
                    	
                        if (!!d.length) {
                            this.hasOwnProperty('messagesPrepended') && this.messagesPrepended(d[0]._id());
                            if (d.length === c) {
                                return $(e).mCustomScrollbar("scrollTo", 40, {
                                    scrollInertia: 200
                                });
                            }
                        }
                        return r.call(this);
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



RT["Notify"] = function() {
	var self = this, types = [
		'notification', 'newMessage', 'currentUserUpdate'
	];

	self.onCurretnUserUpdate = function(data) {
		var RTC = window.RTC || RT["Com"], currentUser = window.RTApp.user
		// init a new user from given data
		, tu = new RT.User(data), fo = {}, cu, cu_id, cp, cp_id;
		for (var k in currentUser()) {
			if (tu.hasOwnProperty(k)) {
				fo[k] = tu[k];
			} else {
				fo[k] = currentUser()[k];
			}
		}

		currentUser(fo);

		cu = RTC.GetObsVal(currentUser);
		cu_id = cu ? cu._id() : null;
		cp = RTC.GetObsVal(window.RTApp.cp);
		cp_id = cp ? cp._id() : null;

		// if the current page happens to be the current user, then
		// update the current page to be the current user (in any case,
		// this is the logged in user.)
		if (cp_id === cu_id) {
			if (cp.lib) {
				cu.lib = cp.lib;
			}
			window.RTApp.cp(cu);
		}
		RTC.Renew();
	};

};



/**
 *  Runtime Function: jQuery & startup Defaults
 *  Author:	Jason Nathan
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
     * returns bolded text in the list of the ul
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

	//RT PubSub
	(function(q) {
	    var topics = {}, subUid = -1;
	    q.subscribe = function(topic, func) {
	        if (!topics[topic]) {
	            topics[topic] = [];
	        }
	        var token = (++subUid).toString();
	        topics[topic].push({
	            token: token,
	            func: func
	        });
	        return token;
	    };
	 
	    q.publish = function(topic, args) {
	        if (!topics[topic]) {
	            return false;
	        }
	        setTimeout(function() {
	            var subscribers = topics[topic],
	                len = subscribers ? subscribers.length : 0;
	 
	            while (len--) {
	                subscribers[len].func(args);
	            }
	        }, 0);
	        return true;
	 
	    };
	 
	    q.unsubscribe = function(token) {
	        for (var m in topics) {
	            if (topics[m]) {
	                for (var i = 0, j = topics[m].length; i < j; i++) {
	                    if (topics[m][i].token === token) {
	                        topics[m].splice(i, 1);
	                        return token;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	}(RT.PubSub));	

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


/* File: assets/js/app.js
   Compiled at: 2014-02-15 08:56:35 
================================ */
RT.App = function() {"use strict";
	var self, o = "inbox user admin cp cplib ca at st currentForm regForm currentSlideShow Search displayListingsSearch  hasNextPage isGettingNext isGettingNew isResponsiveMenu isEditMode currentPage formParams ajaxStatus ticks displayMobileMediaLibrary autoLogin adminLocations";
	RTC.MakeObsFromArray.call(this, o);
	RTC.MakeObsFromArray.call(this, "postForm ajaxData", {});
	self = this;
	self.ticks.extend({
		throttle : 5 * 60 * 1e3
	});
	self.currentPage(1);
	self.currentSlideShow.subscribe(function(v) {
		return v && v.resize();
	}, self);
	self.formParams(self.Search() && self.Search().formFields);
	self.ajaxStatus("success");
	self.ajaxMessage = ko.computed(function() {
		var d = this.ajaxData();
		return d && d.message || null;
	}, this);
	self.client = ko.computed(function() {
		return !self.user();
	}, self);
	self.isError = ko.computed(function() {
		return "success" !== this.ajaxStatus();
	}, self);
	self.cuIsAdmin = ko.computed(function() {
		return this.user() && this.user().isAdmin();
	}, self);
	self.cpIsCu = ko.computed(function() {
		var t = this;
		if (t.user() && t.cp()) {
			return t.user()._id() === t.cp()._id();
		}
		return !1;
	}, self);
	self.cpIsUser = ko.computed(function() {
		return this.cp() && this.cp().hasOwnProperty("first_name");
	}, self);
	self.cpuIsCu = ko.computed(function() {
		var cp = this.cp() || {}, user = RTC.GetObsVal(cp.user), cu = this.user();
		return user && cu && user.hasOwnProperty("_id") && user._id() === cu._id();
	}, self);
	self.cl = ko.mapping.fromJS([]);
	self.clNotEmpty = ko.computed(function() {
		return this.cl() && !!this.cl().length;
	}, self);
	self.isJSAction = ko.computed(function() {
		var c = this.ca();
		switch (c) {
			case 'edit':
			case 'settings':
			case 'media':
			case 'conversations':
			case 'leads':
				return true;
		}
		return false;
	}, this);
	self.loginRedirect = ko.computed(function() {
		return "/loginbasic?redirect_to=" + window.location;
	}, this);
	self.isJSAction.subscribe(function(v) {
		if (!v)
			return false;
		var a = window.analytics || {};
		switch (this.ca()) {
			case "edit":
				return a.track("Click on edit Profile");
			case 'settings':
				return a.track("Click on Settings");
			case 'media':
				return a.track("Click on Media Library");
			case 'conversations':
				return a.track("Click on Messages");
			case 'leads':
				return a.track("Click on Admin page");
		}
		;
	}, self);
	self.isMobileBrowser = ko.computed(function() {
		var a = navigator.userAgent || navigator.vendor || window.opera;
		return /Mobi/.test(a);
	});
	self.interactors = function() {
		var t = this, a = arguments[0] || {}, u = RTApp.user();
		t.items = ko.observableArray();
		t.interactable = ko.observable();
		t.total = ko.observable();
		t.uri = ko.observable();
		//        t.current = ko.computed(function() {
		//        }, this);
		t.type = ko.observable();
		t.page = ko.computed(function() {
			var T = this;
			return Math.ceil((T.items().length / 10) + .1) || 1;
		}, this);
		t.hasMore = ko.observable();
		t.init = function(type) {
			a.counts && a.counts[type] && (t.total = a.counts[type]);
			t.type(type);
			t.extractUri(a);
			var items = a[type], S;
			if (t.total() > 0) {
				S = ko.utils.extend(RTC.CBSettings, {
					width : "330px",
					href : RTC.getTemplate("interactors"),
					height : "auto",
					onComplete : function() {
						var aa = type.ucfirst();
						ko.applyBindings(t, document.getElementById("interactors"));
						$("#moreInteractors").waypoint(RTC.InteractorHandler, {
							offset : "125%"
						});
						u && a && analytics && analytics.track("Viewing the " + aa + " list of " + a.type(), {
							user_id : u._id(),
							post_id : a._id()
						});
						return $.colorbox.resize();
					}
				});
				typeof items === 'array' && items.remove(function(item) {
					return !item.hasOwnProperty('roles');
				}) && t.items(RTC.GetObsVal(items));

				return $.colorbox(S);
			}
		};
		t.extractUri = function(a) {
			a = ko.toJS(a);
			if (a.hasOwnProperty('roles')) {
				return t.uri(a.uri + '/');
			}
			if (a.hasOwnProperty('type')) {
				switch (a.type) {
					case 'location':
					case 'company':
						return t.uri(a.uri + '/');
					case 'comment':
						return t.uri('/comment?id=' + a._id + '&get=');
					default:
						return t.uri('/post?id=' + a._id + '&get=');
				}
			}
		};
		t.resize = function() {
			return RTC.CB.resize();
		};
		t.get = function(w) {
			if (t.total() !== t.items().length) {
				return RTC.Get({}, {
					url : t.uri() + t.type(),
					page : t.page()
				}).done(function(r) {
					if (RTC.isSuccess(r)) {
						r.data.length > 10 && t.hasMore(!0) && r.data.pop() && w.waypoint("enable") || t.hasMore(!1);
						var tmp = ko.mapping.fromJS(r.data, {
							create : RTC.CreateLoop
						});
						t.items.pushAll(RTC.GetObsVal(tmp));
					}
				});
			}
		};
		t.hide = function() {
			var e = document.getElementById("interactors");
			e && !!e.length && ko.cleanNode(e);
			RTC.CB.close();
		};
	};
	self.viewport = {
		width : ko.observable($(window).width()),
		height : ko.observable($(window).height())
	};

	self.feedback = {
		selectOption : function(d) {
			return RTApp.feedback.reportOne("") && RTApp.feedback.selectedOption(d);
		},
		submit : function() {
			var a = RTApp, n = navigator, e = {
				appCodeName : n.appCodeName,
				appName : n.appName,
				appVersion : n.appVersion,
				cookieEnabled : n.cookieEnabled,
				onLine : n.onLine,
				platform : n.platform,
				userAgent : n.userAgent
			}, p = {
				message : a.feedback.message(),
				url : '/post/feedback',
				user : {
					_id : a.user()._id(),
					name : a.user().name()
				}
			};
			screen && (e.resolution = {
				width : screen.width,
				height : screen.height
			});
			e.auth = a.client() ? 'client' : 'user';
			a.ajaxStatus() !== 'success' && (e.lastAjaxRequest = {
				status : a.ajaxStatus(),
				data : a.ajaxData()
			});
			p.environment = ko.toJSON(e);
			( p = RTC.PostApi({}, p)) && p.done(function(r) {
				a.feedback.visibility(false);
				return $.bootstrapGrowl('<i class="icon-info-sign"></i> We have received your feedback and sent an email to our administrators, Thanks!', {
					type : 'success'
				});
			});
		},
		message : function() {
			var f = RTApp.feedback, m = [f.selectedOption()];
			f.reportOne().length && m.push(f.reportOne());
			f.reportTwo().length && m.push(f.reportTwo());
			f.optionSignout() && m.push("Tried signing out.");
			f.optionRefresh() && m.push("Tried refreshing.");
			return m.join("\n");
		}
	};
	o = "visibility selectedOption reportOne optionSignout optionRefresh reportTwo";
	RTC.MakeObsFromArray.call(self.feedback, o);
	self.feedback.selectedOption('problem');
	self.feedback.reportOne("");
	self.feedback.reportTwo("");

	//self.inbox = ko.observable();

	self.at.subscribe(function() {"use strict";
		var s;
		return self.at() && ( s = new RTC.Get({}, {
			url : "/checkAuth"
		})) && s.done(function(r) {
			return RTC.isSuccess(r) && r.session && self.at(r.session.access_token) && r.session.state && self.st(r.session.state);
		}) || !0;
	}, self);
};
RT.App.prototype = {
	setDefaults : function(c) {
		var t = this;
		switch (c) {
			case "posts":
				return t.ca() === "feed" && t.Search(new RT.Searches.Feed());
			case "people":
				return t.Search(new RT.Searches.People());
			case "locations":
			case "listings":
				return t.Search(new RT.Searches.Locations());
		}
	},
	scanBarCode : function(d) {
		if (d.cp()) {
			return $.get(d.cp().uri() + '/qrcode', function(r) {
				if ( typeof r === "object" && r.status === 'fail') {
					return $.bootstrapGrowl('<h4><i class="icon-info-sign"></i> ' + r.data.message + '</h4>', {
						type : 'warning'
					});
				}
				var s = ko.utils.extend(RT.Com.CBSettings, {
					href : RTC.getTemplate("qrcode"),
					height : "auto",
					width : "auto",
					maxWidth : '95%',
					minWidth : '500px',
					onComplete : function() {
						ko.applyBindings(d, document.getElementById("qrcodeContent"));
						return $.colorbox.resize();
					}
				});
				return $.colorbox(s);
			});
		}
	},
	getVCARD : function(d) {
		if (d.cp()) {
			return $.get(d.cp().uri() + '/vcard', function(r) {
				if ( typeof r === "object" && r.status === 'fail') {
					return $.bootstrapGrowl('<h4><i class="icon-info-sign"></i> ' + r.data.message + '</h4>', {
						type : 'warning'
					});
				}
				return window.location.href = d.cp().uri() + '/vcard';
			});
		}
	},
	initLoginForm : function(d, ev) {"use strict";
		var t = this, e = RTC.elementFromEvent(ev), cf = t.currentForm, C = RTC, P = C.processing, S = ko.utils.extend(C.CBSettings, {
			width : "570px",
			height : "30%",
			href : RTC.getTemplate("login"),
			onComplete : function() {
				cf(new RT.Forms.Login());
				setTimeout(function() {
					ko.applyBindings(cf(), document.getElementById("loginBox"));
				}, 15);
				return $.colorbox.resize();
			},
			onClosed : function() {
				return $(e).find('i').removeClass("icon-spin icon-spinner").addClass("icon-signin");
			}
		});
		if (t.isMobileBrowser()) {
			return window.location.href = t.loginRedirect();
		}
		t.hideListingsSearch();
		return cf(null) && (!t.user() && !P) && ( P = !0) && $.colorbox(S) && $('.nav-collapse').collapse('toggle');
	},
	initRegForm : function() {"use strict";
		var t = this, cf = t.regForm;
		!cf() && cf(new RT.Forms.Registration());
		RTC.setInputWidths();
	},
	initFeedbackForm : function() {"use strict";
		var t = this, trg = $('#feedbackProfileContent'), cf = RTC.getCookie('skipfbAnimate'), f = $('#feedbackButton');

		if (this.user() && t.isTabletOrLarger()) {
			trg.load(RTC.getTemplate("feedback"), function() {
				ko.applyBindings(t.feedback, trg[0]);
				if (!cf) {
					f.css({
						'-webkit-backface-visibility' : 'hidden',
						'-webkit-transition' : 'translate3d(0,0,0)'
					});
					return setTimeout(function() {
						return f.transition({
							rotate : '450deg'
						}, 1500, 'easeInOutQuad').transition({
							perspective : '100px',
							rotateX : '-45deg'
						}, 1500, 'easeInOutQuad');
					}, 1000) && RTC.setCookie('skipfbAnimate', true, 1);
				}
			});
		}
	},
	initEditForm : function() {"use strict";
		var t = this, trg = $("#infoProfileContent"), cf = t.currentForm;
		//ko.cleanNode(trg[0]);
		cf(null);
		if (t.cpIsCu() && !RTC.processing) {
			RTC.processing = !0;
			if (trg.find("#infoBox").length) {
				cf(new RT.Forms.Info());
				cf().init();
				RTC.processing = !1;
				return ko.applyBindings(cf(), trg[0]);
			}
			return trg.load(RTC.getTemplate("info"), function() {
				cf(new RT.Forms.Info());
				cf().init();
				ko.cleanNode(trg[0]);
				RTC.processing = !1;
				return ko.applyBindings(cf(), trg[0]);
			});
		}
		return trg.html("<h3 class='text-error'>403 - Access Denied</h3>") && (RTC.processing = !1);
	},
	initSettingsForm : function() {"use strict";
		var t = this, trg = $("#infoSettingsContent"), cf = t.currentForm;
		//ko.cleanNode(trg[0]);
		cf(null);
		if (t.cpIsCu() && !RTC.processing) {
			RTC.processing = !0;
			if (trg.find("#settingsBox").length) {
				cf(new RT.Forms.Settings());
				RTC.processing = !1;
				return ko.applyBindings(cf(), trg[0]);
			}
			return trg.load(RTC.getTemplate("settings"), function() {
				cf(new RT.Forms.Settings(t.user(), t));
				RTC.processing = !1;
				ko.cleanNode(trg[0]);
				return ko.applyBindings(cf(), trg[0]);
			});
		}
		return trg.html("<h3 class='text-error'>403 - Access Denied</h3>") && (RTC.processing = !1);
	},
	initPostForm : function() {
		return this.cp() && this.user() && this.postForm(new RT.Forms.Post());
	},
	initMediaLibrary : function() {"use strict";
		var t = this, trg = $("#mediaProfileContent"), cf = t.cplib;
		if (t.user() && !RTC.processing) {
			RTC.processing = !0;
			if (trg.find("#libraryMobile").length) {
				cf().history(cf().history.slice(0, 2));
				return cf().currentIndex(1) && (RTC.processing = !1);
			}
			return trg.load(RTC.getTemplate("mediaLibrary"), function() {
				cf(new RT.ControllerLibrary);
				ko.cleanNode(trg[0]);
				RTC.processing = !1;
				return ko.applyBindings(cf(), trg[0]);
			});
		}
		return;
	},
	initConversations : function(e) {"use strict";
		var t = this, trg = e || $("#conversationContent"), cf = t.inbox;
		if (t.user() && !RTC.processing) {
			RTC.processing = !0;
			if (trg.find("#conversationsMobile").length) {
				cf().history(cf().history.slice(0, 2));
				cf().currentIndex(1) && (RTC.processing = !1);
				return cf();
			}
			trg.load(RTC.getTemplate("conversations"), function() {
				cf(new RT.ControllerMessages);
				ko.cleanNode(trg[0]);
				RTC.processing = !1;
				ko.applyBindings(cf(), trg[0]);
				return cf();
			});
		}
		return;
	},
	initListings : function() {"use strict";
		var t = this, cf = t.currentForm, C = RTC, P = C.processing, cp = t.cp(), u = t.user(), S;
		cf(null);
		if (t.isMobileBrowser()) {
			return $.bootstrapGrowl(RTC.Validation.device.noMobileListings, {
				type : 'warning'
			});
		}
		S = ko.utils.extend(C.CBSettings, {
			width : "980px",
			href : RTC.getTemplate("listingWizard"),
			top : 10,
			height : "auto",
			overlayClose : false,
			escKey : false,
			onComplete : function() {
				cf(new RT.Forms.Listing());
				if (cp && C.GetObsVal(cp.type) === 'location') {
					cf().listing.page({
						_id : cp._id(),
						name : cp.name(),
						type : cp.type(),
						subtype : cp.subtype()
					});
					cf().listing.page_parent(cp.parent);
					cf().subtype(cp.subtype());
				}
				ko.applyBindings(cf(), document.getElementById("listingCreationWizard"));
				return cf().resize();
			}
		});
		if (u && !P && u.canPostListings()) {
			P = !0;
			return $.colorbox(S);
		}

	},
	showListingsSearch : function() {
		return this.displayListingsSearch(true);
	},
	hideListingsSearch : function() {
		return this.displayListingsSearch(false);
	},
	initLocations : function() {
		var isA = false, t = this;
		t.admin.subscribe(function(a) {
			if (a && !isA) {
				$.getScript("/js/adminlocations.js", function() {
					return t['adminLocations'](new RT.Admin.AdminLocations) || false;
				});
				return ( isA = true), true;
			}
			return false;
		});
	},
	getQuery : function() {"use strict";
		var t = this, s = jQuery("form.RTASearch"), p, l = window.location, d = t.Search();
		p = d && d.formChanges() || {};
		p.url = s.length ? s.attr("action") : "//" + l.host + l.pathname;
		p.access_token = t.at();
		p.state = t.st();
		p.filter = d && d.filteredBy();
		p.sort = d && d.sortedBy();
		if (p.url === '/listings' && t.cp()) {
			var cp = t.cp(), id = cp._id();
			if (t.cpIsUser()) {
				p.user_id = id;
			} else {
				p.page_id = id;
				if (cp.hasOwnProperty("subtype") && cp.subtype() === "Estate") {
					p.parent_id = id;
				}
			}
		}
		return p;
	},
	getNextPage : function() {"use strict";
		var t = this, p = t.getQuery(), s = {
			beforeSend : function() {
				t.isGettingNext(!0);
			}
		};
		if (!t.hasNextPage())
			return !1;
		t.currentPage(t.currentPage() + 1);
		p.page = t.currentPage();
		( s = new RTC.Get(s, p)) && s.done(function(r) {
			return RTC.isSuccess(r) && t.appendCl(r.data);
		}).always(function() {
			t.isGettingNext(!1);
		});
		return s;
	},
	getKeyword : function(request, response) {"use strict";
		var f = jQuery("form.RTASearch"), l = window.location, u = !!f.length ? f.attr("action") : "http:" + l.host + l.pathname, p = {
			state : jQuery("#RTASearchState").val(),
			s : request.term,
			url : u + '/keyword'
		};
		return ( p = new RTC.Get({}, p)) && p.done(function(r) {
			return RTC.isSuccess(r) && response(r.data);
		});
	},
	resetNewResults : function() {"use strict";
		var t = this, p, args = arguments, newS;

		// bug to fix autocomplete not closing on Search
		if (args && args.length === 2 && args[1] && args[1].hasOwnProperty('type') && args[1].type === 'click') {
			var s = !!$('.ui-autocomplete.ui-widget:visible').length;
			return s && $('#s').autocomplete("close");
		}

		if (args && args.length === 3) {
			newS = args[2].item.value;
			$("#s").val(newS);
			t.Search().formFields.s(newS);
		}

		p = t.getNewResults();
		t.currentPage(1);
		return p && p.done(function() {
			return t.initPager();
		});
	},
	getNewResults : function() {"use strict";
		var t = this, p = t.getQuery();
		p.page = this.currentPage();
		( p = new RTC.Get({
			beforeSend : function() {
				t.isGettingNew(!0);
			}
		}, p)) && p.done(function(r) {
			return RTC.isSuccess(r) && t.filterCl(r.data);
		}).always(function() {
			return t.isGettingNew(false) && window.scrollTo(0, 0);
		});
		return p;
	},
	startEditMode : function() {
		if (location.href.match(/written/g)) {
			return $.bootstrapGrowl('<i class="icon-info-sign"></i> You can only manage testimonials you received. Try clicking on <strong>Testimonials</strong> > <strong>Received</strong>', {
				type : 'info'
			});
		}
		this.isEditMode(!this.isEditMode());
		return RTC.forEach(this.cl(), function(i) {
			i.editMode(!i.editMode());
		});
	},
	animate : {
		fadeIn : function(e) {
			return $(e).fadeIn('fast');
		},
		fadeOut : function(e) {
			return $(e).fadeOut('fast');
		}
	},
	initPager : function() {"use strict";
		var p = jQuery("#nextPage") || {}, exists = p.data && p.data();
		if (exists && !!p.data().waypointsWaypointsIds) {
			this.hasNextPage() ? exists ? p.waypoint("enable") : p.waypoint(RTC.PageHandler, {
				offset : "125%"
			}) : p.waypoint("disable");
		}

	},
	init : function() {"use strict";
		var t = this, handleUser = function(v) {
			if (v) {
				var t = this;
				t.initFeedbackForm();
				!t.autoLogin() && RTC.poll() || window.location.pathname !== "/loginbasic" && (window.location = "/loginbasic?redirect_to=" + encodeURIComponent(window.location) + "&state=" + t.st() + "&access_token=" + t.at());
				t.initPostForm();
				v && analytics && analytics.identify(v._id(), {
					name : v.name(),
					username : v.username(),
					role : v.roles().join(" ")
				});
				return t.cuIsAdmin() && $.getScript("/js/admin.js").done(function() {
					$("#rightbar").on("click", "#adminCountWidget a", function() {
						$("#adminCountWidget a").parent().each(function() {
							$(this).removeClass("active");
						});
						!$(this).hasClass("moreLink") && $(this).parent().addClass("active");
					});
					return t.admin(new RT.Admin()) && t.admin().getCounts();
				});
			}
		}.bind(t);
		t.admin.subscribe(function() {"use strict";
			var trg = $("#adminContent");
			if (!RTC.processing && this.ca() === 'leads') {
				RTC.processing = !0;
				if (!!trg.find("#adminContentSessions").length) {
					return;
				}
				trg.load(RTC.getTemplate("admin/sessions"), function() {
					ko.cleanNode(trg[0]);
					RTC.processing = !1;
					return ko.applyBindings(this, trg[0]);
				});
			}
			return;
		}, this);
		this.load = function(s, p) {
			if (!t.at())
				return !1;
			p.access_token = t.at();
			p.state = t.st();
			s.api = !0;
			return new RTC.Fetch(s, p, t);
		};
		t.filterCl = function(data) {
			t.cl([]);
			data && data.length > 10 && t.hasNextPage(!0) && data.pop() || t.hasNextPage(!1);
			t.currentPage(1);
			return ko.mapping.fromJS(data, {
				create : RTC.CreateLoop
			}, t.cl);
		};
		t.appendCl = function(data) {
			data.length > 10 && t.hasNextPage(!0) && data.pop() || t.hasNextPage(!1);
			var tmp = ko.mapping.fromJS(data, {
				create : RTC.CreateLoop
			});
			return t.cl.pushAll(RTC.GetObsVal(tmp));
		};
		t.performAction = function(action, args, d) {"use strict";
			var a;
			action = arguments[0];
			if (arguments.length === 3) {
				d = arguments[1];
			} else if (arguments.length === 4) {
				d = arguments[2];
				args = arguments[1];
			}
			var a = new RT['Actions'](t);
			return a && a[action](d, args) || $.bootstrapGrowl('<i class="icon-exclamation-sign"></i> Sorry, you don\'t have permission to perfom this action.', {
				type : 'warning'
			});
		};
		(function(RT, RTC) {
			RTC.forEach("Page Testimonial Album Listing Attachment".split(" "), function(i) {
				return RT[i].prototype = new RT.Post;
			});
			RT.cu && t.user(new RT.User(RTC.b64d(RT.cu))) && (RT.cu = null);
			RT.cp && t.cp(new RT.User(RTC.b64d(RT.cp))) && (RT.cp = null);
			RT.at && t.at(RTC.b64d(RT.at)) && (RT.at = null);
			RT.st && t.st(RTC.b64d(RT.st)) && (RT.st = null);
			RT.cl && t.filterCl(RTC.b64d(RT.cl)) && (RT.cl = null);
			RT.ca && t.ca(RT.ca) && (RT.ca = null);
			RT.clt && t.setDefaults(RT.clt);
			RT.autoLogin && t.autoLogin(RT.autoLogin) && (RT.autoLogin = null);
		})(RT, RTC);
		(function(profile, t, RTC) {
			var user = t.user(), interactions = profile ? profile.interactions : null, likers = profile ? profile.likers : null, subscribers = profile ? profile.subscribers : null, needToAdd = !0;
			if (interactions) {
				interactions.like.subscribe(function(v) {
					if (!!v) {
						interactions.subscribe(!0);
						profile.counts.likers(profile.counts.likers() + 1);
						likers().length === 5 && likers.pop();
						likers() && user && RTC.forEach(likers(), function(liker) {
							return liker._id() === user._id() && ( needToAdd = false);
						});
						needToAdd && user && likers.push({
							_id : user._id,
							name : user.name
						});
					} else {
						profile.counts.likers(profile.counts.likers() - 1);
						likers && user && likers.remove(function(liker) {
							return liker._id() === user._id();
						});
					}
					return needToAdd = !0, !0;
				}, t);
				interactions.subscribe.subscribe(function(v) {
					if (!!v) {
						profile.counts.subscribers(profile.counts.subscribers() + 1);
						subscribers().length === 5 && subscribers.pop();
						subscribers() && user && RTC.forEach(subscribers(), function(subscriber) {
							return subscriber._id() === user._id() && ( needToAdd = false);
						});
						needToAdd && user && subscribers.push({
							_id : user._id,
							name : user.name
						});
					} else {
						profile.counts.subscribers(profile.counts.subscribers() - 1);
						subscribers && user && subscribers.remove(function(subscriber) {
							return subscriber._id() === user._id();
						});
					}
					return needToAdd = !0, !0;
				}, t);
			}
		})(t.cp(), t, RTC);
		(function(self) {
			var t = self, v = t.viewport;
			t.isLarge = ko.computed(function() {
				return v.width() >= 1200;
			});
			t.isDefault = ko.computed(function() {
				return !t.isLarge() && v.width() >= 960;
			});
			t.isLargerThanDefault = ko.computed(function() {
				return v.width() >= 960;
			});
			t.isTabletPotrait = ko.computed(function() {
				return v.width() === 768;
			});
			t.isTabletOrLarger = ko.computed(function() {
				return v.width() >= 768;
			});
			t.isSmallerThanTablet = ko.computed(function() {
				return v.width() < 768;
			});
			t.isSmallerThanDefault = ko.computed(function() {
				return v.width() < 980;
			});
			t.isPhone = ko.computed(function() {
				return v.width() <= 480;
			});
			t.isTablet = ko.computed(function() {
				return !t.isPhone() && v.width() <= 767;
			});
			t.centerView = ko.computed(function() {
				var t = this;
				if (t.isSmallerThanTablet()) {
					return 'auto';
				}
				if (t.isTablet()) {
					return t.cp() ? '70px' : 'auto';
				}
				return t.cp() ? '195px' : 'auto';
			}, t);
		})(t);
		t.user.subscribe(handleUser);
		t.user() && t.user.valueHasMutated();
		//$(".pager").hide();

		routie({
			'Register' : function() {
				return $('#registerTab').click();
			},
			'edit' : function() {
				return t.user() && t.ca('edit') && t.user().editProfile() || false;
			},
			'settings' : function() {
				return t.user() && t.ca('settings') && t.user().editSettings() || false;
			},
			'conversations/:id?' : function(id) {				
				if (!t.user()) {
					return false;
				}
				t.ca('conversations');
				t.initConversations();
				if(id){
					
					var handler = function(v){							
						var view = v ? v.history()[1] : null;
						if(view){
							var cHandler = function(conversations){
								if(conversations){
									var c = ko.utils.arrayFirst(conversations, function(f){
										return RTC.GetObsVal(f._id) === id;
									});
									view.selectedConversation(c);
									if (c) {
										view.markConversationRead().always(view.resetUnreadCounts.bind(view));
										v.goTo(new RT.messageView(c), 2);
									}
								}
							}, cArray = view.conversations;
							return !!cArray().length ? cHandler(cArray()) : cArray.subscribe(cHandler);							
						}
						
					}
					, i = RTApp.inbox;
					return i() ? handler( i() ) : i.subscribe(handler);
				}
			},
			'media' : function() {
				t.ca('media');
				return t.initMediaLibrary();
			},
			'leads' : function() {
				t.ca('leads');
			}
		});
	},
	cpIconClass : function(size) {
		var cp = RTApp.cp(), cls = "hovercards ";
		size = size || 150;
		if (cp && cp.hasOwnProperty("subtype")) {
			switch (cp.subtype()) {
				case "Private Apartments":
					return cls + "APT" + size;
				case "Private Landed":
					return cls + "LND" + size;
				case "Serviced Apartments":
					return cls + "SVCAPT" + size;
				case "HDB":
					return cls + "HDB" + size;
				case "Estate":
					return cls + "EST" + size;
			}
		}
		return "";
	},
	getUserHoverCard : function(d) {
		var id = d.user ? d.user._id() : d._id(), name = d.user ? d.user.name() : d.name(), u = ko.toJS(RTApp.user());
		analytics && analytics.track("Viewed a User hovercard", {
			user_id : u ? u._id : "Public",
			viewing : name + "(" + id + ")"
		});
		return 'http://' + window.location.host + "/user?id=" + id || "";
	},
	getLocationHoverCard : function(d) {
		var id = d._id(), u = ko.toJS(RTApp.user());
		analytics && analytics.track("Viewed a Location hovercard", {
			user_id : u ? u._id : "Public",
			viewing : d.name + "(" + id + ")"
		});
		return 'http://' + window.location.host + "/page?id=" + id || "";
	}
};

RT.ControllerLibrary = function() {
	var self = this, o = "selectedAlbum editingAlbum tempAlbum up";
	RTC.MakeObsFromArray.call(self, o);
	self.history([{
		name : 'Home',
		hashURL : RTApp.cp().uri(),
		backLink : {}
	}, new RT.albumsView]);
	self.deleteAlbum = function(d) {
		var t = this, ea = t.editingAlbum && t.editingAlbum() ? t.editingAlbum : ko.observable(d);
		ea() && ea().actions && ea().actions["delete"] && RTApp.performAction('delete', ea(), null);
		return t.selectedAlbum(null) && ea(null) && t.stopEditingAlbum();
	};
	self.createAlbum = function() {"use strict";
		var s = self.editingAlbum, u = self.up;
		return s(new RT.Forms.Album({}, self)) && (u() && u().refresh() || u(new RTC.Uploader(s())) && u().init());
	};
	self.editAlbum = function(data) {"use strict";
		var s = self.editingAlbum, u = self.up;
		self.tempAlbum(data);
		return s(new RT.Forms.Album(data, self)) && (u() && u().refresh() || u(new RTC.Uploader(s())) && u().init());
	};
	self.deleteFile = function(data) {"use strict";
		var sa = self.selectedAlbum, ea = self.editingAlbum;
		data.actions && data.actions['delete'] && RTApp.performAction('delete', data, null);
		sa() && sa().attachments && sa().attachments.remove(function(item) {
			return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
		});
		ea() && ea().attachments.remove(function(item) {
			return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
		});
		return true;
	};
	self.setCurrentItem = function(d) {
		return self.selectedAlbum().setCurrentItem(d);
	};
	self.setSelected = function(data) {
		return self.selectedAlbum(data) && self.getAttachments();
	};
	self.getAttachments = function(force) {"use strict";
		var sa = self.selectedAlbum(), hasA = sa && sa.attachments, a;
		if (!sa || (sa && !force && !sa.hasNextPage())) {
			return;
		}

		a = force ? sa.getAttachments(0) : sa.getAttachments();
		a && a.done(function(r) {
			RTC.isSuccess(r);
			sa.hasNextPage(r.data.length > 10);
			sa.hasNextPage() && r.data.pop();
			if (hasA && sa.attachments() === 0) {
				r.data && ko.mapping.fromJS(r.data, {
					create : RTC.CreateLoop
				}, sa.attachments);
			} else {
				r.data && sa.attachments.pushAll(ko.utils.arrayMap(r.data, RTC.CreateLoop));
			}
			return self.initPager();
		});
		return;
	};
	self.stopEditingAlbum = function() {"use strict";
		var ta = self.tempAlbum, d = self.editingAlbum, sv = d() && d().serverVals;
		if (d()) {
			if (sv()) {
				ta() && ko.mapping.fromJS(sv(), {}, ta()) || ta(new RT.Album(ko.toJS(sv())));
			} else {
				ta() && ta().name(d().name()) && ta().excerpt(d().excerpt()) && ta().counts.attachments(d().counts.attachments()) && ta().privacy.is(d().privacy.is()) || ta(new RT.Album(ko.toJS(d())));
			}
			self.setSelected(ta()) && ta(null);
		}
		self.up() && self.up().destroy() && self.up(null);
		RTC.CB.close();
		return d(null) && self.history()[1].getAlbums(true) && new RTC.Get({}, {
			url : "/media/deletealbumid"
		});
	};
	self.initPager = function() {"use strict";
		var p = $("#loadAttachments"), exists = p.data() && !!p.data().waypointsWaypointsIds;
		//console.log(self.selectedAlbum())
		if (self.selectedAlbum() && self.selectedAlbum().hasNextPage()) {
			return exists && p.waypoint("enable") || p.waypoint(RTC.AlbumHandler.bind(this), {
				offset : 'bottom-in-view'
			});
		}
		return p.waypoint("disable");
	};
	self.editingAlbum.subscribe(function(val) {"use strict";
		var t = this, u = t.up;
		return val && $.colorbox({
			fixed : !0,
			transition : 'fade',
			top : 100,
			open : !0,
			speed : 1,
			href : '#editAlbum',
			inline : !0,
			width : 960,
			maxWidth : '95%',
			maxHeight : '95%',
			onClosed : function() {
				t.editingAlbum(null);
				u() && u().destroy() && u(null);
			},
			onComplete : function() {
				return $.colorbox.resize();
			},
			onOpen : function() {
				u() && u().refresh();
				$(document.body).css({
					overflow : 'hidden'
				});	
				return $.colorbox.resize();
			}
		});
	}, self);
	(function(a) {
		var p = {
			url : a.cp().uri() + '/media'
		};
		return a.cp() && ( p = new RTC.Get({}, p)) && p.done(function(r) {
			RTC.isSuccess(r) && ko.mapping.fromJS(r.data, {}, self);
			self.mediaCount = ko.computed(function() {
				var c = this.counts;
				return c && c.documents() + c.pictures() + c.videos();
			}, self);
			self.albumCount = ko.computed(function() {
				var c = this.counts && this.counts.albums;
				return c && c["private"]() + c["public"]();
			}, self);
		});
	})(RTApp);
};

RT.ControllerLibrary.prototype = new RTC.PageInterface;

RT.albumsView = function() {
	var self = this;
	self.name = "Albums";
	self.hashURL = "#media";
	self.backLink = {
		action : function() {
			return true;
		},
		icon : 'icon-home',
		title : 'Exit',
		uri : RTApp.user().uri()
	};
	self.rightLinks = [{
		action : function() {
			var a = RTApp.cplib(), f = new RT.Forms.Album({
				hashURL : "#media/createAlbum"
			}, a);
			a.isFormPage(!0);
			f.formLabel = "Create new Album";
			return a.createAlbum();
			//return a.goTo(RT.editForm.bind(null, f), 2), true;
		},
		icon : 'icon-plus',
		title : 'Create an Album',
		uri : "#media/createAlbum"
	}];
	self.items = ko.mapping.fromJS([]);

	self.getAlbums = function(force) {
		if (self.items().length === 0 || force) {
			var p = {
				url : RTApp.user().connections.albums()
			};
			return ( p = RTC.GetApi({}, p)) && p.done(function(r) {
				if (RTC.isSuccess(r) && !!r.data.length) {
					RTC.forEach(r.data, function(item) {
						item.seeAlbum = function(d) {
							var a = RTApp.cplib();
							a.selectedAlbum(d);
							a.goTo(RT.singleAlbum.bind(null, d), 2);
							return true;
						};
						item.hashURL = "#media/album?id=" + item._id;
						item.caption = ko.computed(function() {
							var t = this;
							return RTC.Obstract(t, 'excerpt') || RTC.Obstract(t, 'message');
						}, item);
					});
					return ko.mapping.fromJS(r.data, {
						create : RTC.CreateLoop
					}, self.items);
				}
			});
		}
	};
	self.content = {
		name : 'albumsList',
		data : self.items
	};
	self.Search = ko.observable(!0);
	self.getAlbums();
};

RT.singleAlbum = function(album) {
	var seeAttachment = function(d) {
		return RTApp.cplib().goTo(RT.singleAttachment.bind(d, album), 3), true;
	}, deleteDialog = new RT.ConfirmDialog({
		message : "Deleting this album will delete all its pictures including ones that are used in your listings.",
		ok : function() {
			var a = RTApp.cplib();
			return a.deleteAlbum.call(a, album) && a.goBack(), !0;
		}
	});
	album.backLink = {
		action : function() {
			var a = RTApp.cplib();
			return a.selectedAlbum(null) && a.isFormPage(!1) && a.goBack(), true;
		},
		icon : 'icon-chevron-left',
		title : 'Back to Albums',
		uri : '#media'
	};
	album.rightLinks = [{
		action : function() {
			return RTApp.cplib().editAlbum(album);
		},
		icon : 'icon-pencil',
		title : 'Edit this album'
	}, {
		action : function() {
			if (album.isDefaultAlbum()) {
				return ko.bindingHandlers.confirmDialog.init(new RT.ConfirmDialog({
					title : 'Action cannot be completed!',
					message : 'This is a default album that cannot be deleted. To remove a photo, please click on the thumbnail for more options'
				}));
			}
			return ko.bindingHandlers.confirmDialog.init(deleteDialog);
		},
		icon : 'icon-trash',
		title : 'Delete this album'
	}, {
		action : function() {
			return RTApp.cplib().editAlbum(album);
		},
		icon : 'icon-upload-alt',
		title : 'Upload'
	}];
	album.Search = ko.observable(!RTApp.cplib().isFormPage());
	album.getItems = function(force) {"use strict";
		var sa = album, hasA = sa.attachments, a;
		if (!force && !sa.hasNextPage()) {
			return;
		}

		a = (force || sa.hasNextPage()) && sa.getAttachments();
		a && a.done(function(r) {
			if (RTC.isSuccess(r) && !!r.data.length) {
				sa.hasNextPage(r.data.length > 10);
				sa.hasNextPage() && r.data.pop();
				RTC.forEach(r.data, function(item) {
					item.seeAttachment = seeAttachment;
					item.hashURL = "#media/attachment?id=" + item._id;
				});
				if (hasA && album.attachments().length === 0) {
					r.data && ko.mapping.fromJS(r.data, {
						create : RTC.CreateLoop
					}, album.attachments);
				} else {
					r.data && album.attachments.pushAll(ko.utils.arrayMap(r.data, RTC.CreateLoop));
				}
			}
			return RTApp.cplib().initPager();
		});
		return;
	};
	album.getItems();
	album.content = {
		name : 'pictureList',
		data : album.attachments
	};
	ko.computed(function() {
		if ( typeof album.attachments === 'function') {
			if (album.attachments() && !!album.attachments().length) {
				RTC.forEach(album.attachments(), function(i) {
					if (!i.hasOwnProperty("seeAttachment")) {
						i.seeAttachment = seeAttachment;
						i.hashURL = "#media/attachment?id=" + i._id();
					}
					return;
				});
			}
		}
	}, album);
	return album;
};

RT.singleAttachment = function(currentAlbum) {
	var self = this;
	self.parent = currentAlbum;
	self.editing = ko.observable(false);
	self.startEdit = function() {
		return self.editing(true);
	};
	self.deleteDialog = new RT.ConfirmDialog({
		ok : function() {
			RTApp.cplib().deleteFile(self);
			return RTApp.cplib().goBack(), !0;
		}
	});
	self.backLink = {
		action : function() {
			return RTApp.cplib().goBack(), !0;
		},
		icon : 'icon-chevron-left',
		uri : "#media/album?id=" + currentAlbum._id()
	};
	self.rightLinks = [{
		action : function() {
			return ko.bindingHandlers.confirmDialog.init(self.deleteDialog);
		},
		icon : 'icon-trash',
		title : 'Delete this item',
		uri : "#media/album?id=" + currentAlbum._id() + "/Delete"
	}];
	self.Search = ko.observable(!RTApp.cplib().isFormPage());
	self.pagination = ko.computed(function() {
		var a = this.parent.attachments, i = a.indexOf(this);
		return i + 1 + " of " + a().length;
	}, self);
	self.caption = ko.computed(function() {
		var t = this;
		return RTC.Obstract(t, 'name') || RTC.Obstract(t, 'excerpt') || RTC.Obstract(t, 'message');
	}, self);
	self.previous = function(d) {
		var a = d.parent.attachments, l = RTApp.cplib(), i = a.indexOf(d), e = a()[i > 0 ? i - 1 : a().length - 1];
		return l.history.pop() && l.goTo(RT.singleAttachment.bind(e, d.parent), 3);
	};
	self.next = function(d) {
		var a = d.parent.attachments, l = RTApp.cplib(), i = a.indexOf(d), e = a()[i === a().length - 1 ? 0 : i + 1];
		return l.history.pop() && l.goTo(RT.singleAttachment.bind(e, d.parent), 3);
	};
	self.content = {
		name : 'pictureView',
		data : self
	};
	// throttle the subscription so as not to fire ajax indefinitely.
	self.name.extend({
		throttle : 650
	});
	//the method that actually updates the attachment.
	self.name.subscribe(function(v) {
		var t = this, p = {
			album_id : t.page && RTC.GetObsVal(t.page._id) || currentAlbum && RTC.GetObsVal(currentAlbum._id),
			message : v,
			url : '/post/update/' + t._id(),
			request_type : 'update_attachment'
		};
		return RTC.PostApi({}, p);
	}, self);

	//    self.slideShow = new RT.Modal({
	//        items: currentAlbum.items,
	//        currentItem: self,
	//        total: currentAlbum.items().length,
	//        //loadMore:
	//    });
	return self;
};

RT.ControllerMessages = function() {
	var self = this;
	RTC.MakeObsFromArray.call(self, "newMessage hasMoreMessages messageCurrentPage");
	self.getPost = function() {
	};
	self.newMessage.subscribe(function(v) {
		return v && $.colorbox({
			fixed : !0,
			transition : 'fade',
			top : 100,
			open : !0,
			speed : 1,
			href : '#newConversation',
			inline : !0,
			width : 960,
			maxWidth : '95%',
			maxHeight : '95%',
			onClosed : function() {
				self.newMessage(null);
			},
			onComplete : function() {
				return $.colorbox.resize();
			}
		});
	}, self);
	self.history([{
		name : 'Home',
		hashURL : RTApp.cp().uri(),
		backLink : {}
	}, new RT.conversationView]);
};

RT.ControllerMessages.prototype = new RTC.PageInterface;

RT.conversationView = function() {
	var self = this;
	self.conversations = ko.mapping.fromJS([]);
	self.unreadConversations = ko.mapping.fromJS([]);
	RTC.MakeObsFromArray.call(self, "conversationCurrentPage hasMoreConversations selectedConversation");
	self.conversationCurrentPage(0);
	self.hasMoreConversations(!0);
	self.name = "Messages";
	self.hashURL = "#conversations";
	self.backLink = {
		action : function() {
			return true;
		},
		icon : 'icon-home',
		title : 'Exit',
		uri : RTApp.user().uri()
	};
	self.rightLinks = [{
		action : function() {
			return RTApp.inbox().newMessage(new RT.newConversationForm(self));
		},
		icon : 'icon-plus',
		title : 'Create a Message',
		uri : "#conversations/createMessage"
	}];
	self.content = {
		name : 'conversationList',
		data : self.conversations
	};
	self.getConversations = function(force) {"use strict";
		var t = this, m = t.conversations, p, u = RTApp.user(), cp = t.conversationCurrentPage, hm = t.hasMoreConversations, f = [];
		if ((!hm() || !u) && !force) {
			return false;
		}
		p = {
			url : u.connections['conversations'](),
			skip : force ? 0 : cp() * 10
		};
		return ( p = RTC.GetApi({}, p)) && p.done(function(r) {
			if (RTC.isSuccess(r)) {
				cp(cp() + 1);
				r.data.length > 10 && (hm(!0) && r.data.pop()) || hm(!1);
				if (force) {
					return m(RTC.GetObsVal(ko.mapping.fromJS(r.data, {
						create : RTC.CreateLoop
					})));
				}
				return m.pushAll(RTC.GetObsVal(ko.mapping.fromJS(r.data, {
					create : RTC.CreateLoop
				})));
			}
		});
	};
	self.selectConversation = function(v) {
		return true;
		self.selectedConversation(v);
		if (v) {
			self.markConversationRead().always(self.resetUnreadCounts.bind(self));
			RTApp.inbox().goTo(new RT.messageView(v), 2);
			window.location.href = window.location.href + '/' + v._id();
			return false;
		}
		return false;
	};
	self.markConversationRead = function() {"use strict";
		var t = this, sc = t.selectedConversation(), p = {
			url : "/post/update/" + RTC.GetObsVal(sc._id),
			request_type : 'clear_unread'
		};
		if (sc) {
			p = RTC.PostApi({}, p);
			return p.done(function() {
				return RTC.Renew();
			});
		}
		return $.Deferred.reject().promise();

	};
	self.resetUnreadCounts = function() {"use strict";
		var t = this, sc = t.selectedConversation(), p = {
			url : '/user/resetunread/' + RTApp.user()._id()
		};
		if (sc) {
			p = RTC.GetApi({}, p);
			return p.done(function() {
				return RTC.Renew();
			});
		}
		return $.Deferred.reject().promise();
	};
	self.getConversations();
};

RT.messageView = function(currentConversation) {
	var self = this;
	RTC.MakeObsFromArray.call(self, "message _processing messagesPrepended");
	currentConversation && (self.sc = currentConversation);
	self.messageLimit = 10;
	self.backLink = {
		action : function() {
			var i = RTApp.inbox(), cv = i.history()[1];
			return i.goBack() && cv.getConversations(!0), !0;
		},
		icon : 'icon-chevron-left',
		title : 'Back to Messages',
		uri : '#conversations'
	};
	self.rightLinks = [];
	self.conversationWith = ko.computed(function() {
		var u = ko.toJS(RTApp.user()._id), to = ko.toJS(this.sc.to), from = ko.toJS(this.sc.user);
		return u === to._id ? from.name : to.name;
	}, self);
	self.name = self.conversationWith();
	self.hashURL = "#conversations/" + self.sc._id();
	self.messages = ko.mapping.fromJS([]);
	self.currentMessageCount = ko.computed(function() {
		return this.messages().length || 0;
	}, this);
	self.currentMessageLimit = ko.computed(function() {
		if (!this.messages()) {
			return false;
		}
		var total = this.sc.counts.messages(), current = this.currentMessageCount(), diff = total - current, cl = this.messageLimit;
		if (diff > cl) {
			return cl;
		}
		return diff;
	}, this);
	self.currentMessageSkip = ko.computed(function() {
		if (!this.messages()) {
			return false;
		}
		var total = this.sc.counts.messages(), current = this.currentMessageCount(), diff = total - current, cl = this.messageLimit;
		if (diff > cl) {
			return total - cl - current;
		}
		return 0;
	}, this);
	self.hasMoreMessages = ko.computed(function() {
		return this.currentMessageCount() < this.sc.counts.messages();
	}, this);
	self.isRetrievingMessages = ko.computed(function() {
		return this.hasMoreMessages() && this._processing();
	}, self);
	self.getMessages = function() {"use strict";
		var t = this, m = t.messages, p, sc = t.sc, current = t.currentMessageCount(), u = RTApp.user(), total = sc.counts.messages(), hm = t.hasMoreMessages();
		console.log({
			current : current,
			total : total
		});

		if (!hm || t._processing()) {
			return false;
		}
		t._processing(true);
		p = {
			url : u.connections['messages']() + '/' + sc._id(),
			skip : t.currentMessageSkip(),
			limit : t.currentMessageLimit()
		};

		return ( p = RTC.GetApi({}, p)) && p.done(function(r) {
			if (RTC.isSuccess(r)) {
				return m.insertAll(RTC.GetObsVal(ko.mapping.fromJS(r.data)));
			}
		}).always(function() {
			return t._processing(false);
		});
	};
	self.getMessages();

	self.canPostMessage = ko.computed(function() {
		return !!this.message();
	}, self).extend({
		throttle : 300
	});
	self.reply = function() {
		var t = self, sc = t.sc, u = ko.toJS(RTApp.user()._id), to = ko.toJS(sc.to), from = ko.toJS(sc.user), m = t.message, p = {}, c = t.messages;

		t.canPostMessage() && t._processing(!0);
		p.to_id = (u === to._id) ? from._id : to._id;
		p.message = m();
		p.url = '/post/message';

		p = RTC.PostApi({}, p);

		p.done(function(r) {
			if (RTC.isSuccess(r)) {
				c.push(ko.mapping.fromJS(r.data.message));
				m(null);
			}
		});

		p.always(function() {
			return self._processing(!1);
		});
	};
	self.messages.subscribe(function(v) {
		var id = this.messagesPrepended, e = $("#message-window"), cb;
		if (id()) {
			cb = function() {
				e.mCustomScrollbar("update");
				return e.mCustomScrollbar("scrollTo", '#message' + id(), {
					scrollInertia : 200
				});
			};
		} else {
			id(null);
			cb = function() {
				e.mCustomScrollbar("update");
				return e.mCustomScrollbar("scrollTo", "last");
			};
		}
		return setTimeout(cb, 100);
	}, self);
	self.content = {
		name : 'messageListT',
		data : self
	};
};

RT.newConversationForm = function(conversations) {
	var self = this;
	self.name = "New Message";

	RTC.MakeObsFromArray.call(self, "receipient message currentConversation _processing");
	conversations && (self.parent = conversations);
	self.setReceipient = function(context, event, ui) {
		if (ui && ui.item.value) {
			context.receipient(new RT.User(ui.item.value));
		}
	};
	self.receipient.subscribe(function(v) {
		return v && setTimeout(function() {
			return $.colorbox.resize();
		}, 1);
	});
	self.getReceipients = function(request, response) {
		var url = '/user/index/' + RTApp.user()._id(), a = RTC.GetApi({}, {
			url : url,
			request_type : 'search_message_receipient',
			s : request.term
		});
		return a.done(function(r) {
			return RTC.isSuccess(r) && response(r.data);
		});
	};
	self.canPostMessage = ko.computed(function() {
		var r = this.receipient(), m = this.message();
		if ((r && !r.hasOwnProperty('_id')) || (!r) || (!m)) {
			return false;
		}
		;
		return true;
	}, self).extend({
		throttle : 300
	});
	self.sendMessage = function() {
		var r = self.receipient(), m = self.message(), p = {};

		self.canPostMessage() && self._processing(!0);
		p.to_id = r._id();
		p.message = m;
		p.url = '/post/message';

		p = RTC.PostApi({}, p);

		p.done(function(r) {
			if (RTC.isSuccess(r)) {
				var p = self.parent, c = p && p.conversations, d = ko.mapping.fromJS(r.data);
				c.addToSet(d);
				return p.selectConversation(d) && RTC.CB.close();
			}
		});

		p.always(function() {
			return self._processing(!1);
		});
	};
};

RT.Actions = function(t) {
	var self = this;
	self.submit = function(p, d, noOpaque) {
		var s = {
			beforeSend : function() {
				!noOpaque && $("#" + d._id()).addClass("opaque");
			}
		};
		s = RTC.PostApi(s, p);
		s && s.always(function() {
			$("#" + d._id()).removeClass("opaque");
		}).done(function(r) {
			if (!RTC.isSuccess(r)) {
				return $.bootstrapGrowl('<p>Oops, we could not complete that action.<br><small>The object might no longer exists. Please provide feedback if you think this is an error.</small>', {
					type : 'warning'
				});
			}
		});
		return s;
	};
	self.comment = function(d) {
		var c = d.commentText(), p = {
			url : d.actions['comment'](),
			user : {
				_id : ko.toJS(t.user()._id),
				name : ko.toJS(t.user().name)
			},
			post : {
				_id : d._id(),
				type : d.type()
			},
			message : c,
			status : 'active'
		};
		return c && ( c = self.submit(p, d, true)) && c.done(function(r) {
			if (RTC.isSuccess(r)) {
				c = new RT.Comment(r.data);
				c.hasMore(true);
				d.comments.push(c);
				d.commentSubmit(false);
				d.commentText(null);
				d.counts.comments(d.counts.comments() + 1);
				$(".commentInput").css("height", "25px");
				analytics && analytics.track("Commented on a " + p.post.type, {
					user_id : p.user._id,
					post_id : p.post._id,
					data : c
				});
			}
		}) || $.bootstrapGrowl('<i class="icon-exclamation-sign"></i> Please type in a comment.', {
			type : 'warning'
		});
		;
	};
	self["delete"] = function(d) {
		var c, p = {
			url : d.actions['delete']()
		};
		c = self.submit(p, d);
		c.done(function(r) {
			if (RTC.isSuccess(r)) {
				if (d.hasOwnProperty('isTestimonial') && d.isTestimonial()) {
					var tw = t.user().counts.testimonials.written;
					RTC.Renew();
					d.isWritten() && d.user._id() === t.user._id() && tw(tw() - 1);
				}
				analytics && analytics.track("Deleted a " + RTC.GetObsVal(d.type), {
					user_id : RTC.GetObsVal(d.user && d.user._id),
					post_id : RTC.GetObsVal(d && d._id)
				});
				return $("#" + d._id()).slideUp(500, function() {
					return t.cl.remove(d);
				});
			}

		});
		return c;
	};
	self.privacy = function(d, a) {
		var c = true, p = {
			url : d.actions['privacy']()
		};
		d.privacy.is() !== a ? p.privacy = {
			is : a
		} : c = false;
		return c && ( c = self.submit(p, d)) && c.done(function(r) {
			if (RTC.isSuccess(r)) {
				analytics && analytics.track("Changed a " + d.type() + "privacy settings", {
					user_id : d.user._id(),
					post_id : d._id(),
					data : a
				});
				return a === "PUBLIC" ? d.setPublic() : d.setPrivate();
			}

		}).always(function() {

		});
	};
	self.message = function(d) {
		var c = d.commentText(), p = {
			url : d.actions['message'](),
			user : {
				_id : ko.toJS(t.user()._id),
				name : ko.toJS(t.user().name)
			},
			message : d.commentText(),
			status : 'active',
			to_id : RTC.GetObsVal(d.recipient)
		};
		d.type() !== 'conversation' && (p.post_id = d._id());
		return c && ( c = self.submit(p, d)) && c.done(function(r) {
			if (RTC.isSuccess(r)) {
				d.commentSubmit(false);
				d.commentText(null);
				d.counts.comments(d.counts.comments() + 1);
				$(".commentInput").css("height", "25px");
				analytics && analytics.track("Created a private message in " + p.post.type, {
					user_id : p.user._id,
					post_id : p.post._id,
					data : c
				});
				return setTimeout(function() {
					$.bootstrapGrowl('<p>Your message was succesfully sent.<br><small>This conversation continues in your inbox</small></p>', {
						type : 'success'
					});
				}, 500);
			}
		});
	};
};
RT.User = function() {"use strict";
	var t = this, a = arguments[0] || {}, o = "ajaxStatus ajaxData currentEdit";
	ko.mapping.fromJS(a, {}, this);
	t.unreadMessages = ko.observableArray();
	t.newNotifications = ko.observableArray();
	t.showNotifications = ko.computed(function(){
		var n = this.newNotifications();
		return !!n.length ? n.length : false;
	}, t);
	RTC.MakeObsFromArray.call(this, o);
	t.interactions = a.interactions ? ko.mapping.fromJS(a.interactions) : null;
	t.isAdmin = ko.computed(function() {
		return t.roles && t.roles() && -1 !== t.roles.indexOf("admin");
	}, t);
	t.isAgent = ko.computed(function() {
		return t.roles && t.roles() && -1 !== t.roles.indexOf("agent");
	}, t);
	t.canPostListings = ko.computed(function() {
		return this.isAdmin() || this.isAgent();
	}, t).extend({
		throttle : 1
	});
	t.ajaxStatus("success");
	t.ajaxData({});
	t.currentEdit("picture");
	t.clearMessageCount = function() {
		var c = this.counts.newMessages;
		setTimeout(function() {
			c(0);
		}, 1e3);
	};
};
RT.User.prototype = {
	editProfile : function() {
		var a = window.RTApp, trg = document.getElementById('infoProfileContent');
		if (!!ko.dataFor(trg)) {
			trg && ko.cleanNode(trg);
		}
		a.initEditForm();
		return true;
	},
	editSettings : function() {
		var a = window.RTApp, trg = document.getElementById('infoSettingsContent');
		if (!!ko.dataFor(trg)) {
			trg && ko.cleanNode(trg);
		}
		//return a.ca('settings') && a.initSettingsForm() && (window.location = a.cp().uri() + "#settings");
		a.initSettingsForm();
		return true;
	}
};

RTC.Loop.prototype.extend(function() {
	var self = this, i = self.interactions, c = self.counts;
	self.interactable = ko.computed(function() {
		return this.hasOwnProperty("interactions");
	}, self);
	self.isSubscribable = ko.computed(function() {
		return this.interactable() && this.interactions.hasOwnProperty("subscribe");
	}, self);
	self.subscribing = ko.computed(function() {
		return this.isSubscribable() && this.interactions.subscribe();
	}, self);
	self.subscribeTitle = ko.computed(function() {
		return (this.subscribing() ? "Stop subscribing" : "Subscribe") + " to this";
	}, self);
	self.liking = ko.computed(function() {
		return this.interactable() && this.interactions.like();
	}, self);
	self.liking = ko.computed(function() {
		return this.interactable() && this.interactions.like();
	}, self);
	self.isLikable = ko.computed(function() {
		return this.interactable() && this.interactions.hasOwnProperty("like");
	}, self);
	self.likeTitle = ko.computed(function() {
		return (this.liking() ? "Stop liking" : "Like") + " this";
	}, self);
	if (self.interactable()) {
		self.isLikable() && i.like.subscribe(function(v) {
			c.likers(c.likers() + (!!v ? 1 : -1));
			!!v && i.subscribe(!0);
		}, self), self.isSubscribable() && i.subscribe.subscribe(function(v) {
			c.subscribers(c.subscribers() + (!!v ? 1 : -1));
		}, self);
	}
});
RT.Post = function() {
	var t = this;
	t.setPublic = function() {
		return this.privacy.is("PUBLIC");
	};
	t.setPrivate = function() {
		return this.privacy.is("PRIVATE");
	};
	t.showPostSettings = function() {
		return this.postSettings(!0);
	};
	t.hidePostSettings = function() {
		return this.postSettings(!1);
	};
	t.getTemplate = function() {
		return this.type() === "wallpost" ? "post" : this.type();
	};
	t.isPost = function() {
		return this.hasOwnProperty("comments");
	};
	t.canComment = function() {
		return RTApp.user() && this.isPost() && !this.isTestimonial();
	};
	t.showCommentSubmit = function() {
		return this.commentSubmit(!0);
	};
	t.getComments = function() {"use strict";
		var self = this, s, counts = this.counts.comments(), current = self.currentCommentCount();
		return (counts > 2 && current < counts) && ( s = new RTC.GetApi({}, {
			skip : this.currentCommentSkip(),
			limit : this.currentCommentLimit(),
			url : self.connections.comments()
		})) && s.done(function(r) {
			if (RTC.isSuccess(r)) {
				return self.comments.insertAll(ko.utils.arrayMap(r.data, function(c) {
					return new RT.Comment(c);
				}));
			}
		});
	};
	t.getComment = function() {
		"use strict";
		console.log('getting comments');
		var self = this, s = new RTC.GetApi({}, {
			skip : self.counts.comments() - 1,
			limit : 1,
			url : self.connections.comments()
		});
		s.done(function(r) {
			console.log(r);
			if (RTC.isSuccess(r)) {
				return self.comments.pushAll(ko.utils.arrayMap(r.data, function(c) {
					return new RT.Comment(c);
				}));
			}
		});
	};	
	t.hide = function(d) {"use strict";
		//return RTC.log(ko.toJS(d));
		var p = {
			url : d && d.actions && d.actions["hide"] && d.actions["hide"]()
		}, t = this;
		return ( p = RTC.PostApi({}, p)) && p.done(function(r) {
			return t.isHidden(true) && t.hasHidden(true);
		});
	};
	t.report = function(d) {"use strict";
		//return RTC.log(ko.toJS(d));
		var p = {
			url : d && d.actions && d.actions["report"] && d.actions["report"]()
		}, t = this;
		return ( p = RTC.PostApi({}, p)) && p.done(function(r) {
			return t.isReported(true) && t.hasReported(true);
		});
	};
	t.unreport = function(d) {"use strict";
		//return RTC.log(ko.toJS(d));
		var p = {
			url : d && d.actions && d.actions["unreport"] && d.actions["unreport"]()
		}, t = this;
		return ( p = RTC.PostApi({}, p)) && p.done(function(r) {
			return t.isReported(false);
		});
	};
	t.unhide = function(d) {"use strict";
		//return RTC.log(ko.toJS(d));
		var p = {
			url : d && d.actions && d.actions["unhide"] && d.actions["unhide"]()
		}, t = this;
		return ( p = RTC.PostApi({}, p)) && p.done(function(r) {
			return t.isHidden(false);
		});
	};
	t.confirmDelete = function(d) {
		var ok = function() {
			return RTApp.performAction('delete', d, null);
		}, m;
		switch(RTC.GetObsVal(d.type)) {
			case 'listing':
				m = "Deleting a listing will not delete attachments. Delete attachments in your Media Library. Continue?";
				break;
			case 'album':
				m = "Warning! If you have listings that have attachments from this album, they will be removed. To hide this album instead, change it's privacy by clicking on the <i class='icon-eye-close'></i> privacy button. Continue?";
				break;
			default:
				m = "Deleting this post is permanent!";
				break;
		}
		return ko.bindingHandlers.confirmDialog.init(new RT.ConfirmDialog({
			message : m,
			ok : ok
		}));
	};
	t.deleteComment = function(d) {
		var ok = function() {
			return RTApp.performAction('delete', d, null);
		};
		return ko.bindingHandlers.confirmDialog.init(new RT.ConfirmDialog({
			message : "Deleting this comment is permanent.",
			ok : ok
		}));
	};
	t.deleteComment = function(d) {
		var ok = function() {
			var promise = RTApp.performAction('delete', d, null);
			return promise && promise.done(function(r) {
				return RTC.isSuccess(r) && t.comments.remove(d) && t.counts.comments(t.counts.comments() - 1);
			});
		};
		return ko.bindingHandlers.confirmDialog.init(new RT.ConfirmDialog({
			message : "Deleting this comment is permanent.",
			ok : ok
		}));
	};
	t.destroyComment = function() {
		return this.commentSubmit(false) && this.commentText(null);
	};
	t.getThumbnail = RTC.GetThumbnail;
	t.getVideoThumbnail = function() {"use strict";
		var img = $(RTC.NewDom("img"));
		img.css({
			"background-image" : "url(" + this.picture() + ")",
			"background-repeat" : "repeat",
			"background-position" : "center center",
			"background-size" : "440px 300px",
			height : 247,
			width : 440
		});
		img.attr("src", "/img/play_button.png");
		return img[0].outerHTML;
	};
	t.getRichThumbnail = function() {
		var i = jQuery(RTC.NewDom("i"));
		i.addClass(this.getRichCss()).css('font-size', '110px');
		return i[0].outerHTML;
		//<i class="attachment" data-bind="css:getRichCss"></i>
	};
	t.embedVideo = function() {"use strict";
		if (this.hasVideo()) {
			var iframe = $(RTC.NewDom("iframe"));
			iframe.attr(ko.toJS(this.mediainfo));
			iframe.css('border', 'none');
			return this.isEmbeddedVideo(iframe);
		}
	};
	t.embedDoc = function() {
		if (this.hasRich()) {
			var iframe = $(RTC.NewDom("iframe"));
			iframe.attr(ko.toJS(this.mediainfo));
			iframe.css('border', 'none');
			iframe.css('width', '100%');
			return this.isEmbeddedRich(iframe);
		}
		return "";
	};
	t.canPM = function() {
		return this.hasOwnProperty("is_owner") && !this.is_owner();
	};
	t.createMessage = function(d, e) {
		if (!this.canPM() || !u) {
			return false;
		}
		return RTApp.createMessage.call(t);
	};
	t.getSubscribers = function() {
		//console.log(this);
	};
	RTC.Loop.apply(t, arguments);
};
RT.Post.prototype = new RTC.Loop;
RT.Post.prototype.extend(function() {
	var o = "hasRich hasVideo postSettings editMode isHidden isReported message isTrashed hasHidden isEmbeddedVideo isEmbeddedRich isLoadingIframe commentSubmit commentText";
	RTC.MakeObsFromArray.call(this, o);
	this.commentLimit = 50;
	this.hasDetails = ko.computed(function() {"use strict";
		var link = RTC.GetObsVal(this.link);
		return link && link.hasOwnProperty("src") || false;
	}, this);
	this.providerInfo = ko.computed(function() {
		var t = this, hl = !!t.hasDetails(), i = RTC.NewDom('img'), s = $(RTC.NewDom('span')), u, p = hl && t.link.provider;
		if (hl && p) {
			u = p.url().match(/uri=/) ? p.url().replace(/^[^=]*=/, '') : p.url();
			i.width = "16";
			i.height = "16";
			i.src = "https://plus.google.com/_/favicon?domain=" + u;
			i = $(i).addClass('favicon');
			$(s).text(p.name()).prepend(i);
			return $(s).html();
		}
		return false;
	}, this);
	this.hasVideo(this.hasDetails() && this.link.type() === "video" || false);
	this.hasRich(this.hasDetails() && this.link.type() === "rich" || false);
	this.editingTemplate = ko.computed(function() {
		if (this.editMode() && this.isTestimonial() && this.isReceived()) {
			return "testimonialEditMode";
		}
		if (this.editMode() && this.type() === "listing") {
			return "listingEditMode";
		}
		if (this.isHidden() || this.isReported() || this.isTrashed()) {
			return "undoTemplate";
		}
		return "regular";
	}, this);
	this.isPostDeleteable = ko.computed(function() {
		var t = this;
		if (window.RTApp && window.RTApp.user() && window.RTApp.user().isAdmin()) {
			return !0;
		}
		if (t.isPost() && t.is_owner()) {
			return !0;
		}
		if (t.isPost() && t.is_page_owner()) {
			return !t.isTestimonial();
		}
		return !1;
	}, this);
	this.isPostHideable = ko.computed(function() {
		var t = this;
		// if this is a post and current user does not own it but owns the current
		// page, he/she can hide this post.
		return (t.isPost() && (!t.is_owner() && t.is_page_owner())) ? !0 : !1;
	}, this);
	this.isTestimonial = ko.computed(function() {
		return this.hasOwnProperty("type") && this.type() === "testimonial";
	}, this);
	this.showCommentBox = ko.computed(function() {
		return this.canComment() && (this.comments().length >= 1 || this.interactable());
	}, this);
	this.subscriberCount = ko.computed(function() {
		var c = this.counts, s = c ? c.subscribers() : 0;
		return typeof s === 'function' ? s() : s;
	}, this);
	this.likesCount = ko.computed(function() {
		var c = this.counts, s = c ? c.likers() : 0;
		return typeof s === 'function' ? s() : s;
	}, this);
	this.totalCommentCount = ko.computed(function() {
		var c = this.counts, cc = c && typeof c.comments === 'function' ? c.comments() : 0;
		return typeof cc === 'function' ? cc() : cc;
	}, this);
	this.currentCommentCount = ko.computed(function() {
		return this.isPost() && this.comments && this.comments().length || 0;
	}, this);
	this.currentCommentLimit = ko.computed(function() {
		if (!this.isPost() || !this.comments) {
			return false;
		}
		var total = this.counts.comments(), current = this.currentCommentCount(), diff = total - current, cl = this.commentLimit;
		if (diff > cl) {
			return cl;
		}
		return diff;
	}, this);
	this.currentCommentSkip = ko.computed(function() {
		if (!this.isPost() || !this.comments) {
			return false;
		}
		var total = this.counts.comments(), current = this.currentCommentCount(), diff = total - current, cl = this.commentLimit;
		if (diff > cl) {
			return total - cl - current;
		}
		return 0;
	}, this);

	this.getRichCss = ko.computed(function() {
		if (this.hasRich()) {
			var ext = RTC.GetObsVal(this.link.src).split(".");
			ext && ( ext = ext.pop().toLowerCase());
			switch (ext) {
				case "doc":
				case "docx":
				case "odt":
				case "fodt":
					return "file-word";
				case "pptx":
				case "ppt":
				case "odp":
				case "fodp":
					return "file-ppt";
				case "pdf":
					return "file-pdf";
				case "xls":
				case "xlsx":
				case "ods":
				case "fods":
					return "file-xls";
			}
		}
	}, this);
	this.isActive = ko.computed(function() {
		return this.status && this.status() === "active";
	}, this);
	this.content = ko.computed(function() {
		var t = this;
		if (!t.message && !t.excerpt)
			return "";
		if (t.message && t.message())
			return t.message();
		if (t.excerpt && t.excerpt())
			return t.excerpt();
	}, this);
	this.getHoverCard = ko.computed(function() {
		return this.uri ? 'http://' + location.host + this.uri() : "";
	}, this);
});
RT.Page = function() {
	this.iconClass = ko.computed(function() {
		if (this.hasOwnProperty("subtype")) {
			var cls = "hovercards ";
			switch (this.subtype()) {
				case "Private Apartments":
					return cls + "APT90";
				case "Private Landed":
					return cls + "LND90";
				case "Serviced Apartments":
					return cls + "SVCAPT90";
				case "HDB":
					return cls + "HDB90";
				case "estate":
					return cls + "EST90";
			}
		}
	}, this);
	this.hasCompany = function() {
		return this.hasOwnProperty("company") && RTC.GetObsVal(this.company).hasOwnProperty("_id");
	};
	this.hasDesignation = function() {
		return this.hasOwnProperty("designation") && RTC.GetObsVal(this.designation);
	};
	this.hasLicense = function() {
		return this.hasOwnProperty("license") && RTC.GetObsVal(this.license);
	};
	RT.Post.apply(this, arguments);
};
RT.Testimonial = function() {
	this.trash = function() {
		var t = this, s = t.status, p = {
			url : '/post/update/' + t._id(),
			request_type : 'update_testimonial'
		}, status;
		status = s() === "trash" ? "pending" : "trash";
		p.status = status;
		( p = RTC.PostApi({}, p)) && p.done(function(r) {
			t.isTrashed(status === 'trash');
			return s(status);
		});
	};
	this.archive = function() {
		var t = this, s = t.status, p = {
			url : '/post/update/' + t._id(),
			request_type : 'update_testimonial'
		}, status;
		status = "archive";
		p.status = status;
		( p = RTC.PostApi({}, p)) && p.done(function(r) {
			s(status);
		});
	};
	this.approval = function() {
		var t = this, s = t.status, p = {
			url : '/post/update/' + t._id(),
			request_type : 'update_testimonial'
		}, status;
		status = s() === "active" ? "pending" : "active";
		p.status = status;
		( p = RTC.PostApi({}, p)) && p.done(function(r) {
			s(status);
		});
	};
	this.isReceived = ko.computed(function() {
		return this.isTestimonial() && this.page._id() === RTApp.cp()._id();
	}, this);
	this.isWritten = ko.computed(function() {
		return this.isTestimonial() && this.user._id() === RTApp.cp()._id();
	}, this);
	this.cssParentClassesForReceived = ko.computed(function() {
		if (this.status) {
			switch (this.status()) {
				case "active":
					return "Approved successBGColor";
				case "pending":
					return "unApproved infoBorderColor";
				case "trash":
					return "unApproved warningBorderColor";
				case "archive":
					return "unApproved";
				default:
					return "";
			}
		}
	}, this);
	this.cssOptionsClassesForReceived = ko.computed(function() {
		if (this.status) {
			switch (this.status()) {
				case "active":
					return "successBorderColor successBGColor";
				case "pending":
					return "infoBGColor infoBorderColor";
				case "trash":
					return "warningBGColor warningBorderColor";
				default:
					return "";
			}
		}
	}, this);
	this.currentStateLabel = ko.computed(function() {
		if (this.status) {
			switch (this.status()) {
				case "active":
					return "Approved";
				case "pending":
					return "Pending Approval";
				case "trash":
					return "Trashed";
				case "archive":
					return "Archived";
			}
		}
	}, this);
	this.currentStateCss = ko.computed(function() {
		if (this.status) {
			switch (this.status()) {
				case "active":
					return "alert-success";
				case "pending":
					return "alert-info";
				case "trash":
					return "";
				case "archive":
					return "";
			}
		}
	}, this);
	RT.Post.apply(this, arguments);
};
RT.Album = function() {
	RT.Post.apply(this, arguments);
	var t = this;
	this.isDefaultAlbum = ko.computed(function() {
		return this.isPost() && this.type() === "album" && (this.name() === "Private Uploads" || this.name() === "Profile Pictures");
	}, this);
	this.currentItem = ko.observable();
	this.setCurrentItem = function(d) {
		return t.currentItem(d) && RTC.log('settingCurrentItem', t.currentItem());
		;
	};
	this.currentPage = ko.observable(1);
	this.hasNextPage = ko.observable(this.attachments && this.attachments().length <= this.counts.attachments());
	this.getAttachments = function() {
		//"use strict";
		//console.trace();
		var arg = arguments[0], p = {
			url : RTC.GetObsVal(this.connections.attachments),
			// since the album itself always has the first six attachments.
			skip : arg ? arg : ((this.currentPage() - 1) * 10) + 6
		}, a = t.hasNextPage() && p.url ? RTC.GetApi({}, p) : false;
		a && a.done(function(r) {
			if (RTC.isSuccess(r)) {
				t.hasNextPage(r.data.length > 10);
				t.hasNextPage() && t.currentPage(t.currentPage() + 1);
			}
		}) || t.hasNextPage(!1);
		return a;
	};
	this.slideShow = new RT.Modal({
		items : this.attachments,
		currentItem : this.currentItem,
		total : this.counts.attachments,
		loadMore : this.getAttachments.bind(this)
	});
};
RT.Listing = function() {
	RT.Post.apply(this, arguments);
	var t = this;
	t.currentItem = ko.observable();
	t.setCurrentItem = function() {
		t.currentItem(t.attachments()[0]);
	};
	t.currentPage = ko.observable(1);
	t.displayComments = ko.observable(false);
	t.canRenew = ko.computed(function() {
		return new Date(t.expiry() * 1000).getTime() < new Date().getTime();
	}, t);
	t.hasNextPage = ko.observable(t.addedMedia && t.addedMedia().length <= t.counts.attachments());
	t.getAttachments = function() {"use strict";
		var a = t.attachments, am = t.addedMedia, total = am().length, fetched = a().length, p = {
			url : RTC.GetObsVal(t.connections.attachments)
		}, ids = [], toGet = (total - fetched) >= 10 ? 11 : total - fetched;
		ids = am.splice(0, toGet);
		p._ids = ids;
		a = t.hasNextPage() && p.url ? RTC.GetApi({}, p) : false;
		a && a.done(function(r) {
			if (RTC.isSuccess(r)) {
				t.hasNextPage(r.data.length > 10);
				t.hasNextPage() && t.currentPage(t.currentPage() + 1);
			}
		}) || t.hasNextPage(!1);
		return a;
	};
	t.attachmentCountLabel = ko.computed(function() {
		var c = this.counts, a = c.attachments();
		if ( typeof a === 'function') {
			a = a();
		}
		return a + ' attachments';
	}, t);
	t.showComments = function() {
		return t.showCommentBox() && t.displayComments(true);
	};
	t.slideShow = new RT.Modal({
		items : t.attachments,
		currentItem : t.currentItem,
		total : t.counts.attachments,
		loadMore : t.getAttachments.bind(t),
		hasListing : t
	});
	t.populateAddedMedia = function() {
		var am = t.addedMedia, p = {};
		if (!!am().length) {
			p.include_ids = am();
			p.url = RTC.GetObsVal(t.connections.attachments);
			p.limit = am().length;
			p = RTC.GetApi({}, p);
			if (p) {
				p.done(function(r) {
					if (RTC.isSuccess(r)) {
						ko.mapping.fromJS(r.data, {
							create : RTC.CreateLoop
						}, am);
					}
				});
				return p;
			}
		} else if (!!t.attachments().length) {
			am(t.attachments());
		}
		return $.Deferred().resolve();
	};
	t.fullContent = function() {
		var js = ko.toJS(this), u = js.connections ? js.connections.fullContent : false;
		u && ( u = RTC.GetApi({}, {
			url : u
		})) && u.done(function(r) {
			t.message(r.data);
		});
	};
	t.startEditing = function() {"use strict";
		var t = this, cf = RTApp.currentForm, C = RTC, P = C.processing, u = RTApp.user(), S, promise;
		cf(null);
		if (RTApp.isMobileBrowser()) {
			return $.bootstrapGrowl(RTC.Validation.device.noMobileListings, {
				type : 'warning'
			});
		}
		S = ko.utils.extend(C.CBSettings, {
			width : "980px",
			href : RTC.getTemplate("listingWizard"),
			top : 10,
			height : "auto",
			overlayClose : false,
			escKey : false
		})
		t.fullContent();
		if (u && !P && u.canPostListings() && u._id() === t.user._id()) {
			P = !0;
			// populate addedMedia to full objects -> it returns a deferred
			promise = t.populateAddedMedia();
			// when populated, define the onComplete and start colorbox
			promise.done(function() {
				S.onComplete = function() {
					var fl, f, tl = t.listing, unit = tl.unit(), uarray;
					uarray = unit.split("-");
					// declare a new listing form
					cf(new RT.Forms.Listing());
					// populate shorthand vars
					f = cf(), fl = f.listing;
					f.serverVals(t);
					t.message.subscribe(function(v) {
						return v && fl.message(v);
					});

					// this must be set to true
					f.editing(true);
					// add the populated attachments to form
					f.addedMedia(t.addedMedia());
					// set the subtype
					f.subtype(t.page.subtype());

					// add listing details
					RTC.forEach(['rooms', 'price', 'cov', 'cobroke', 'baths', 'valuation', 'property_type'], function(i) {
						fl[i](tl[i]());
					});

					fl.builtSize(tl.built_size());
					fl.landSize(tl.land_size());
					fl.address(t.address());
					fl.page(ko.toJS(t.page));
					fl.page_parent(ko.toJS(t.page_parent));
					// this is an array if the property for this listing is not landed
					if (uarray.length > 1) {
						fl.unit.floor(uarray[0]);
						fl.unit.stack(uarray[1]);
					} else {
						fl.unitIsAddress(true);
					}
					// other properties
					f.showAddress(t.showAddress());
					f.hasChanges(false);

					ko.applyBindings(cf(), document.getElementById("listingCreationWizard"));
					return cf().resize();
				};
				return $.colorbox(S);
			});
		}
	};
};
RT.Attachment = function() {
	RT.Post.apply(this, arguments);
	this.dimensions = ko.computed(function() {
		var i = this.mediainfo, v = RTApp.viewport, w = i.width(), h = i.height(), m = v.width() < 1200 ? .9 : .65;
		if (this.hasRich()) {
			w *= 3;
			h = h / (w / 3) * w;
		}
		return RTC.AspectRatioFit(w, h, v.width() * m, v.height() * .95, m);
	}, this);
	this.isSelected = ko.observable(false);
	this.getFullPreview = function() {"use strict";
		var i, t = this, d = t.dimensions(), el = t._id() && $("fullPreview" + t._id());
		if (!el.length) {
			if (t.hasRich() || t.hasVideo()) {
				i = jQuery(RTC.NewDom("iframe")).attr({
					src : t.mediainfo.src(),
					frameborder : 0,
					width : d.width,
					height : d.height,
					id : "fullPreview-" + t._id()
				}).css({
					'max-width' : '100%',
					width : 'auto !important'
				});
			} else if (t.hasOwnProperty("picture") && t.picture()) {
				i = jQuery(RTC.NewDom("img"));
				i.attr({
					src : "//" + t.picture(),
					alt : t.excerpt() || t.name() || "Picture",
					id : "fullPreview-" + t._id()
				});
			}
			return i;
		}
		return el;
	};
	this.getAttachmentThumb = function() {"use strict";
		// can be 150, defaults to 110
		var t = this, as = [35, 40, 90, 150], a = parseInt(arguments[0]) || "", s = as.indexOf(a) >= 0 ? a : 110, e, i, el = t._id() && document.getElementById(t._id() + s);
		if (!el) {
			if (t.hasRich()) {
				e = RTC.GetObsVal(t.link.src).split(".");
				e && ( e = e.pop().toLowerCase());
				i = $(RTC.NewDom("i")).attr('id', t._id() + s).css('font-size', s + 'px');
				switch (e) {
					case "doc":
					case "docx":
					case "odt":
					case "fodt":
						i.addClass("file-word");
						break;
					case "pptx":
					case "ppt":
					case "odp":
					case "fodp":
						i.addClass("file-ppt");
						break;
					case "pdf":
						i.addClass("file-pdf");
						break;
					case "xls":
					case "xlsx":
					case "ods":
					case "fods":
						i.addClass("file-xls");
						break;
				}
				i.attr({
					role : 'img',
					'aria-labelledby' : 'Placeholder Image'
				});
			} else if (t.hasOwnProperty("picture") && t.picture()) {
				var p = t.picture();
				i = $(RTC.NewDom("img"));
				a.length === 0 && ( a = 110);
				i.css({
					height : a,
					width : a
				});
				i.attr({
					src : "//" + p.replace(t.user._id(), t.user._id() + "/" + a),
					alt : t.excerpt() || t.name() || "Attachment Thumbnail",
					height : a,
					width : a,
					id : t._id()
				});
				if (this.hasVideo()) {
					i.attr('src', '/img/play_button.png');
					i.css({
						"background-image" : "url(" + t.picture() + ")",
						"background-repeat" : "repeat",
						"background-position" : "center center",
						"background-size" : a + "px " + a + "px"
					});
				}
			}
			return i[0].outerHTML;
		}
		return el.outerHTML;
	};
	this.description = ko.computed(function() {
		return this.excerpt() || this.name();
	}, this);
};
RT.Conversation = function(p) {"use strict";
	p = p || {};
	ko.mapping.fromJS(p, {}, this);
	this.isUnread = ko.computed(function() {
		return this.unread() === RTApp.user()._id();
	}, this);
	this.lastMsgIsCu = ko.computed(function() {
		return this.lastMessage._id() === RTApp.user()._id();
	}, this);
};
RT.Comment = function(p) {"use strict";
	p = p || {};
	ko.mapping.fromJS(p, {}, this);
	this.interactions && this.interactions.like.subscribe(function(val) {
		if (val) {
			this.counts.likers(this.counts.likers() + 1);
		} else {
			this.counts.likers(this.counts.likers() - 1);
		}
	}, this);
	RTC.MakeObsFromArray.call(this, "commentOptions hasMore message");
	this.message(p.message);
	this.content = ko.computed(function() {
		var t = this;
		if (!t.message && !t.excerpt)
			return "";
		if (t.message && t.message())
			return t.message();
		if (t.excerpt && t.excerpt())
			return t.excerpt();
	}, this);
};
RT.Comment.prototype = {
	canDelete : function() {"use strict";
		var c = this.hasOwnProperty("is_owner") && this.is_owner();
		!c && ( c = this.hasOwnProperty("is_post_owner") && this.is_post_owner());
		!c && ( c = this.hasOwnProperty("is_user_page") && this.is_user_page());
		return c;
	},
	showCommentOptions : function() {
		return this.canDelete() && this.commentOptions(!0);
	},
	hideCommentOptions : function() {
		return this.canDelete() && this.commentOptions(!1);
	}
};

RT.Sorter = function() {"use strict";
	var p = arguments[0] || {}, t = this, ff = "priceLow priceHigh builtLow builtHigh roomsLow roomsHigh s";
	this.sorters = p.sorters || ["Popular", "Newest"];
	this.sortedBy = p.sortedBy || ko.observable(this.sorters[0]);
	this.filters = p.filters || ["All Activity"];
	this.filteredBy = p.filteredBy || ko.observable(this.filters[0]);
	this.showingMobileSearch = ko.observable(false);
	this.update = function(d, e) {
		$(e.currentTarget).parent().parent(".dropdown-menu").toggle();
		return RTApp.getNewResults();
	};
	this.updateFilter = function(d, e) {
		RTApp.Search().filteredBy(d);
		return t.update(d, e);
	};
	this.updateSorter = function(d, e) {
		RTApp.Search().sortedBy(d);
		return t.update(d, e);
	};
	this.showDropdown = function(d, e) {
		return $(e.currentTarget).next(".dropdown-menu").toggle();
	};
	this.formFields = {
		updateObswithEl : function(o, e) {
			if (e) {
				var $e = $(e.currentTarget).text();
				return o($e);
			}
		},
		type : ko.observable("Sale"),
		updateType : function(d, e) {
			var ff = t.formFields;
			return ff.updateObswithEl(ff.type, e);
		},
		updateBuiltHigh : function(d, e) {
			var ff = t.formFields;
			return ff.updateObswithEl(ff.builtHigh, e);
		},
		updateBuiltLow : function(d, e) {
			var ff = t.formFields;
			return ff.updateObswithEl(ff.builtLow, e);
		},
		updateRoomsLow : function(d, e) {
			var ff = t.formFields;
			return ff.updateObswithEl(ff.roomsLow, e);
		},
		updateRoomsHigh : function(d, e) {
			var ff = t.formFields;
			return ff.updateObswithEl(ff.roomsHigh, e);
		}
	};
	RTC.MakeObsFromArray.call(this.formFields, ff);
	RTC.forEach(ff.split(" "), function(n) {
		var tff = t.formFields;
		return (n !== 's') && tff[n].subscribe(function(v) {
			return tff[n](RTC.MakePrice(v));
		}, t);
	});
	this.keywordText = ko.computed(function() {
		var s = ko.toJS(this.formFields.s);
		return s && s.length > 1 && s || null;
	}, this);
	this.formChanges = ko.computed(function() {
		// This evaluation logic is exactly the same as before
		var f = ko.toJS(this.formFields) || {};
		f["s"] = this.keywordText();
		RTC.forEach("updateBuiltHigh updateBuiltLow updateObswithEl updateRoomsHigh updateRoomsLow updateType".split(" "), function(i) {
			return f.hasOwnProperty(i) &&
			delete f[i];
		});
		return f;
	}, this);
	this.throttledChanges = ko.computed(function() {
		return this.formChanges();
	}, this).extend({
		throttle : 1000
	});
	this.throttledChanges.subscribe(function(v) {
		return v && RTApp.resetNewResults.call(RTApp);
	});
	this.toggleMobileListingSearch = function() {
		var s = t.showingMobileSearch;
		if (s()) {
			setTimeout(function() {
				return RTApp.resetNewResults.call(RTApp);
			}, 500);
		}
		return s(!s());
	};
};
RT.Searches = {
	Feed : function() {"use strict";
		var a = RTApp, p = {
			filters : ["All Activity"]
		};
		(a.cpIsCu() && a.user() && p.filters.push("Only Your Posts")) || a.cpIsUser() && p.filters.push("Only " + a.cp().first_name() + "'s Posts");
		ko.mapping.fromJS(new RT.Sorter(p), {}, this);
	},
	People : function() {
		ko.mapping.fromJS(new RT.Sorter({
			sorters : ["Last Active", "Newest", "Alphabetical"],
			sortedBy : ko.observable("Last Active"),
			filters : ["All", "Agents", "Users", "Staff"],
			filteredBy : ko.observable("All")
		}), {}, this);
	},
	Locations : function() {
		ko.mapping.fromJS(new RT.Sorter({
			sorters : ["Last Active", "Newest", "Alphabetical"],
			sortedBy : ko.observable("Last Active"),
			filters : ["All", "Private Apartments", "Serviced Apartments", "Private Landed", "HDB"],
			filteredBy : ko.observable("All")
		}), {}, this);
	},
	Listings : function() {
		ko.mapping.fromJS(new RT.Sorter({
			sorters : ["Last Active", "Newest", "Alphabetical"],
			sortedBy : ko.observable("Last Active"),
			filters : ["All", "Private Apartments", "Serviced Apartments", "Private Landed", "HDB"],
			filteredBy : ko.observable("All")
		}), {}, this);
	}
};
RT.Library = function(params) {"use strict";
	params = params || {};
	ko.mapping.fromJS(params, {}, this);
	var o = "selectedAlbum editingAlbum tempAlbum up";
	RTC.MakeObsFromArray.call(this, o);
	var self = this;
	self.mediaCount = ko.computed(function() {
		var c = this.counts, ret = 0;
		RTC.forEach(['documents', 'pictures', 'videos'], function(k) {
			if (c.hasOwnProperty(k) && typeof c[k] === 'function') {
				ret += c[k]();
			}
		});
		return ret;
	}, self);
	self.albumCount = ko.computed(function() {
		var c = this.counts && this.counts.albums;
		return c && c["private"]() + c["public"]();
	}, self);
	self.albums = ko.mapping.fromJS([]);
	self.getAlbums = function(force) {
		if (self.albums().length === 0 || force) {
			var p = {
				url : RTApp.user().connections.albums()
			};
			return ( p = RTC.GetApi({}, p)) && p.done(function(r) {
				if (RTC.isSuccess(r) && !!r.data.length) {
					return ko.mapping.fromJS(r.data, {
						create : RTC.CreateLoop
					}, self.albums);
				}
			}).always(function() {
				return RTC.CB.resize();
			});
		}
	};
	self.getThumbnail = function(data) {"use strict";
		var id = RTApp.user()._id(), pic = RTC.GetObsVal(data.picture);
		return pic ? "http://" + pic.replace(id, id + "/150") : "http://" + RT.BUCKET + "/avatars/nothumb150.png";
	};
	self.setSelected = function(data) {
		return self.selectedAlbum(data) && self.getAttachments();
	};
	self.getAttachments = function(force) {"use strict";
		var sa = self.selectedAlbum(), hasA = sa.attachments, a;
		if (!force && !sa.hasNextPage()) {
			return;
		}

		a = force ? sa.getAttachments(0) : sa.getAttachments();
		a && a.done(function(r) {
			RTC.isSuccess(r);
			sa.hasNextPage(r.data.length > 10);
			sa.hasNextPage() && r.data.pop();
			if (hasA && sa.attachments() === 0) {
				r.data && ko.mapping.fromJS(r.data, {
					create : RTC.CreateLoop
				}, sa.attachments);
			} else {
				r.data && sa.attachments.pushAll(ko.utils.arrayMap(r.data, RTC.CreateLoop));
			}
			return self.initPager();
		});
		return;
	};
	self.showAlbums = function() {
		return self.selectedAlbum(null);
	};
	self.createAlbum = function() {"use strict";
		var s = self.editingAlbum, u = self.up;
		return s(new RT.Forms.Album({}, self)) && (u() && u().refresh() || u(new RTC.Uploader(s())) && u().init());
	};
	self.editAlbum = function(data) {"use strict";
		var s = self.editingAlbum, u = self.up;
		self.tempAlbum(data);
		return s(new RT.Forms.Album(data, self)) && (u() && u().refresh() || u(new RTC.Uploader(s())) && u().init());
	};
	self.deleteFile = function(data) {"use strict";
		var sa = self.selectedAlbum, ea = self.editingAlbum;
		data.actions && data.actions['delete'] && RTApp.performAction('delete', data, null);
		sa() && sa().attachments && sa().attachments.remove(function(item) {
			return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
		});
		ea() && ea().attachments.remove(function(item) {
			return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
		});
		return true;
	};
	self.setCurrentItem = function(d) {
		return self.selectedAlbum().setCurrentItem(d);
	};
	self.stopEditingAlbum = function() {"use strict";
		var ta = self.tempAlbum, d = self.editingAlbum, sv = d() && d().serverVals;
		if (d()) {
			if (sv()) {
				ta() && ko.mapping.fromJS(sv(), {}, ta()) || ta(new RT.Album(ko.toJS(sv())));
			} else {
				ta() && ta().name(d().name()) && ta().excerpt(d().excerpt()) && ta().counts.attachments(d().counts.attachments()) && ta().privacy.is(d().privacy.is()) || ta(new RT.Album(ko.toJS(d())));
			}
			self.setSelected(ta()) && ta(null);
		}
		self.up() && self.up().destroy() && self.up(null);
		RTC.CB.close();
		return d(null) && self.getAlbums(true) && new RTC.Get({}, {
			url : "/media/deletealbumid"
		});
	};
	self.initPager = function() {"use strict";
		var p = jQuery("#loadAttachments"), exists = p.data() && !!p.data().waypointsWaypointsIds;
		if (self.selectedAlbum() && self.selectedAlbum().hasNextPage()) {
			return exists && p.waypoint("enable") || p.waypoint(RTC.AlbumHandler.bind(this), {
				offset : 'bottom-in-view'
			});
		}
		return p.waypoint("disable");
	};
	self.getAlbums();
	self.editingAlbum.subscribe(function(val) {"use strict";
		var t = this, u = t.up;
		return val && $.colorbox({
			fixed : !0,
			transition : 'fade',
			top : 100,
			open : !0,
			speed : 1,
			href : '#editAlbum',
			inline : !0,
			width : 960,
			maxWidth : '95%',
			maxHeight : '95%',
			onClosed : function() {
				t.editingAlbum(null);
				u() && u().destroy() && u(null);
			},
			onComplete : function() {
				return $.colorbox.resize();
			},
			onOpen : function() {
				u() && u().refresh();
				$(document.body).css({
					overflow : 'hidden'
				});
				return $.colorbox.resize();
			}
		});
	}, self);
};
RT.Library.prototype.deleteAlbum = function() {
	var t = this, ea = t.editingAlbum;
	ea() && ea().actions && ea().actions["delete"] && RTApp.performAction('delete', ea(), null);
	return t.selectedAlbum(null) && ea(null) && t.stopEditingAlbum();
};

RT.Forms = {
	Login : function() {"use strict";
		this.username = ko.observable(null).extend({
			required : !0
		});
		this.password = ko.observable(null).extend({
			required : !0
		});
		this.errors = ko.validation.group(this);
	},
	Registration : function() {"use strict";
		var self = this, o = "company license designation rep _id companyLabel first_name last_name isUser isAgent ajaxLoaded isKeyAuthenticated isAgentForm creating currentState user_type message birthday".split(" ");
		self.cache = {};
		self.regFields = 'mobile first_name last_name username email password confirmPassword gender agreedTerms'.split(" ");
		self.VM = RTApp;
		RTC.MakeObsFromArray.call(this, o.concat(self.regFields));
		RTC.MakeObsFromArray.apply(this, ["isUniqueUsername isUniquePhone isUniqueEmail", !0]);
		self.currentState("reg");
		self.gender("male");
		self.gender.extend({
			required : !0
		});
		self.user_type("user");
		self.message.extend({
			maxLength : 10e3
		});
		self.birthday(new Date("01/01/1981"));
		self.birthday.extend({
			date : !0
		});
		self.isAgentForm.subscribe(function() {
			return $.colorbox.resize();
		});
		self.agreedTerms.extend({
			validation : {
				validator : function(val) {
					return val === true;
				},
				message : "You must agree to the terms of use & privacy policy to continue."
			}
		});
		self.username.extend({
			throttle : 600
		});
		self.username.subscribe(self.checkUniqueUsername, self);
		self.username.extend({
			required : !0,
			minLength : 3,
			pattern : {
				params : RTC.Validation.username.invalid.rule,
				message : RTC.Validation.username.invalid.message
			},
			validation : {
				validator : function() {
					return self.isUniqueUsername();
				},
				message : RTC.Validation.username.notUnique.message
			}
		});
		self.username.extend({
			validation : {
				validator : function(v) {
					var splits = v.split("."), valid = true;
					splits = splits.concat(v.split("-"));
					splits = splits.concat(v.split("_"));

					if (!!splits.length) {
						RTC.forEach(splits, function(split) {
							return split.match(RTC.Validation.username.restricted.rule) && valid && ( valid = !1);
						});
						return valid;
					}
					return !v.match(RTC.Validation.username.restricted.rule);
				},
				message : RTC.Validation.username.restricted.message
			}
		});
		self.mobile.extend({
			throttle : 600
		});
		self.mobile.extend({
			number : !0,
			minLength : {
				message : RTC.Validation.mobile.invalid.message,
				params : 8
			},
			maxLength : {
				message : RTC.Validation.mobile.invalid.message,
				params : 8
			},
			min : {
				message : RTC.Validation.mobile.invalid.message,
				params : 8e7
			},
			required : !0,
			validation : {
				validator : function() {
					return self.isUniquePhone();
				},
				message : RTC.Validation.mobile.notUnique.message
			}
		});
		self.mobile.subscribe(self.validateMobile, self);
		self.email.extend({
			throttle : 600
		});
		self.email.extend({
			required : !0,
			email : !0,
			validation : {
				validator : function() {
					return self.isUniqueEmail();
				},
				message : "This email has already been registered. Please try logging in."
			}
		});
		self.email.subscribe(self.checkUniqueEmail, self);
		self.company.extend({
			required : !0,
			validation : {
				validator : function() {
					return typeof self.company() === "object";
				},
				message : "Please choose a valid company name from the list."
			}
		});
		self.first_name.extend({
			required : !0,
			pattern : {
				params : "^[a-zA-Z]+$",
				message : "Please use only letters (A-z)"
			}
		});
		self.last_name.extend({
			required : !0,
			pattern : {
				params : "^[a-zA-Z]+$",
				message : "Please use only letters (A-z)"
			}
		});
		self.fullName = ko.computed(function() {
			if (this.first_name.isModified() && this.last_name.isModified()) {
				return this.populateUsername();
			}
		}, this).extend({
			throttle : 500
		});
		self.password.extend({
			minLength : 6,
			required : !0
		});
		self.confirmPassword.extend({
			equal : self.password,
			required : !0
		});
		self.checkUser = ko.computed({
			read : function() {
				return this.user_type() !== "user";
			},
			write : function() {
				this.user_type(this.user_type() === "user" ? "agent" : "user");
			},
			owner : self
		}, self);
		self.license.extend({
			required : !0,
			minLength : {
				params : 8,
				message : "Please enter a Valid CEA license"
			},
			maxLength : {
				params : 8,
				message : "Please enter a Valid CEA license"
			},
			pattern : {
				params : "^[a-zA-Z]{1}[0-9]{6}[a-zA-Z]{1}",
				message : "Please enter a Valid CEA license"
			}
		});
		self.designation.extend({
			required : !0
		});
		self.errors = ko.validation.group(self);
		self.addCompany = function(e, ui) {
			ui.item && self.company(ui.item.value) && self.companyLabel(ui.item.label);
			return !1;
		};
		self.resetCompany = function(e, ui) {
			return !ui.item && self.company([]);
		};
		self.validateRegistration = ko.computed(function() {
			var t = this, f = t.regFields, v = true;
			RTC.forEach(f, function(i) {
				return t[i].isValid() || ( v = !1);
			});
			return v;
		}, this).extend({
			throttle : 500
		});
		self.validateAgent = ko.computed(function() {
			var f = ['company', 'license'], v = true, t = this;
			RTC.forEach(f, function(i) {
				return t[i].isValid() || ( v = !1);
			});
			return v;
		}, this).extend({
			throttle : 500
		});
		self.validateToSaveChanges = ko.computed(function() {
			var t = this;
			return t.user_type() && t._id() && t.company.isValid() && t.license.isValid();
		}, self);
		self.validateToSaveChanges.subscribe(function(v) {
			return v && self.saveExtras.call(self);
		});
	},
	Info : function() {"use strict";
		var self = this, A = RTApp, user = A.user(), vcard = user.vcard && user.vcard() || [], o = "isSaving checkUser smsVerify mobileVerify companyLabel changePassword dimensions uploadStatus uploadProgress uploadMessage tempUpload originalWidth originalHeight savingCrop userType uploadSettings saveCompleted";
		RTC.MakeObsFromArray.call(self, o);
		RTC.MakeObsFromArray.apply(self, ["isUniqueUsername isUniqueEmail isUniquePhone isOldPasswordValid", !0]);
		self.autoSaveMessage = ko.computed(function() {
			switch (true) {
				case self.isSaving():
					return 'Saving &hellip;';
				case !self.isSaving() && self.saveCompleted():
					return "Saved";
				default:
					return "Save";
			}
		}, self);
		self.avatar = RTC.MakeObs(user.avatar);
		self.currentEdit = A.cp().currentEdit;
		self.changeEdit = A.cp().changeEdit;
		self.userType(user.roles()[0]);
		self.jCrop = null;
		self.logs = ko.observableArray();
		self.uploadSettings({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : "uploadAvatar",
			container : "uploadContainer",
			multipart : false,
			multi_selection : false,
			max_file_size : "20mb",
			url : "/media/avatar",
			flash_swf_url : RTC.resources + "/common/js/plupload/Moxie.swf",
			silverlight_xap_url : RTC.resources + "/common/js/plupload/Moxie.xap",
			filters : [{
				title : "Images",
				extensions : "jpg,gif,png,jpeg"
			}],
			init : {
				UploadProgress : function(up, file) {
					self.uploadProgress(file.percent);
					self.uploadStatus("uploading");
				},
				FilesAdded : function(up) {
					up.start();
				},
				FileUploaded : function(up, file, info) {
					self.uploadProgress(100);
					self.uploadStatus("uploaded");
					if (info.response) {
						var r = jQuery.parseJSON(info.response);
						self.uploadMessage(r);
						self.originalWidth(r.data.width);
						self.originalHeight(r.data.height);
						self.tempUpload(r.data.url);
					}
				},
				ChunkUploaded : function(up, file) {
					self.currentFile(file).progress(file.percent);
					self.uploadProgress(up.total.percent);
				},
				Error : function(up, args) {
					self.uploadStatus("error");
					self.uploadMessage(args);
				}
			}
		});
		self.uploader = new RTC.Uploader(self);
		self.editables = {
			aboutme : RTC.MakeObs(user.message),
			first_name : user.first_name,
			last_name : user.last_name,
			uri : user.uri,
			username : ko.validateIfChanged(user.uri().substr(1, user.uri().length)),
			email : ko.validateIfChanged(user.email()),
			company : ko.validateIfChanged(RTC.GetObsVal(user.company)),
			designation : ko.validateIfChanged(user.designation()),
			license : ko.validateIfChanged(user.license()),
			info : {
				telephone : {
					mobile : ko.validateIfChanged(user.info.telephone.mobile().substr(3))
				},
				birthday : ko.observable(new Date(user.info.birthday() * 1e3)),
				gender : user.info.gender,
				languages : user.info.languages,
				achievements : new RTC.DualField(user.info.achievements),
				education : new RTC.DualField(user.info.education),
				social : RTC.MakeObs(user.info.social)
			},
			smstoken : ko.observable(null),
			password : ko.observable(""),
			currentPassword : ko.observable("").extend({
				throttle : 600
			}),
			confirmPassword : ko.observable(""),
			roles : ko.observableArray(user.roles()),
			vcard : ko.observableArray()
		};
		self.editables.showUriButUpdateUsername = ko.computed({
			read : function() {
				var u = this.uri();
				// remove the "/" from the URI. This is done because the URL
				// can have caps, but not the username
				return u.substr(1, u.length);
			},
			write : function(v) {
				var u = this.username, i = u.initial();
				if ((v.toLowerCase() !== i.toLowerCase())) {
					return u(v);
				}
				return u.revert();
			},
			owner : self.editables
		});
		self.editables.vcard([{
			value : 'mobile',
			enable : true,
			checked : ko.observable(false),
			label : 'Mobile',
			title : null
		}, {
			value : 'email',
			enable : true,
			checked : ko.observable(false),
			label : 'Email',
			title : null
		}, {
			value : 'uri',
			enable : true,
			checked : ko.observable(false),
			label : 'RealtAsia Profile Page',
			title : "Selecting this will make: <br> <strong>http://" + RT.APP_SERVER + user.uri() + '/</strong> <br>your website address in your VCARD'
		}, {
			value : 'company',
			enable : !!self.editables.company(),
			checked : ko.observable(false),
			label : 'Agency / Company',
			title : null
		}, {
			value : 'designation',
			enable : !!self.editables.designation(),
			checked : ko.observable(false),
			label : 'Designation',
			title : null
		}, {
			value : 'birthday',
			enable : !!self.editables.info.birthday(),
			checked : ko.observable(false),
			label : 'Birthday',
			title : !self.editables.info.birthday() && 'You have not updated your birthday.'
		}, {
			value : 'about',
			enable : !!self.editables.aboutme(),
			checked : ko.observable(false),
			label : 'About Me',
			title : null
		}]);
		if (!!vcard.length) {
			RTC.forEach(vcard, function(c) {
				var f = ko.utils.arrayFirst(self.editables.vcard(), function(i) {
					return i.value === c;
				}), m = f && self.editables.vcard()[self.editables.vcard().indexOf(f)] || null;
				return m && m.checked(true);
			});
		}
	},
	Settings : function() {"use strict";
		var self = this;
		ko.mapping.fromJS(RTApp.user(), {}, self);
		ko.editable(self.settings);
		self.isSaving = ko.observable(false);
		self.saveCompleted = ko.observable(false);
		self.autoSaveMessage = ko.computed(function() {
			switch (true) {
				case self.isSaving():
					return 'Saving &hellip;';
				case !self.isSaving() && self.saveCompleted():
					return "Saved";
				default:
					return "Save";
					;
			}
		}, self);
		self.settings.beginEdit();
		self.currentEdit = RTApp.cp().currentEdit;
		self.currentEdit("notifications");
		self.isSavable = ko.computed(function() {
			return this.settings.hasChanges();
		}, self).extend({
			throttle : 1000
		});
		self.isSavable.subscribe(function(v) {
			if (v && this.saveCompleted())
				return this.saveCompleted(false);
		}, self);
	},
	Post : function() {"use strict";
		var o = "showButtons postAreaButton message external loading externalFields hasVideo hasRich richFrame hasLink log isCreating postType privacy";
		RTC.MakeObsFromArray.call(this, o);
		this.postType("postStatus");
		this.privacy("PUBLIC");
		this.prompt = ko.computed(function() {
			if (this.postType() === "postStatus") {
				return "Share an update";
			}
			return RTApp.cpIsUser() ? "Write a testimonial" : "Write a review";
		}, this);
		this.message.extend({
			maxLength : 10e3
		});
		this.hasLink.extend({
			throttle : 600
		});
		this.providerInfo = ko.computed(function() {
			var t = this, hl = !!t.externalFields(), i = RTC.NewDom('img'), s = $(RTC.NewDom('span')), u, p = hl && t.externalFields().link.provider;
			if (hl && p) {
				u = p.url.match(/uri=/) ? p.url.replace(/^[^=]*=/, '') : p.url;
				i.width = "16";
				i.height = "16";
				i.src = "https://plus.google.com/_/favicon?domain=" + u;
				i = $(i).addClass('favicon');
				$(s).text(p.name).prepend(i);
				return $(s).html();
			}
			return false;
		}, this);
		this.canSubmit = ko.computed(function() {
			return this.message() && this.message().length >= 1;
		}, this);
		this.postBoxHeight = ko.computed(function() {
			return this.showButtons() ? '70px' : '35px';
		}, this);
		this.canPost = ko.computed(function() {
			if (RTApp.cpIsCu())
				return !0;
			var b = RTApp.cp();
			return b && b.settings && ( b = ko.toJS(b.settings.privacy)) && b.wallposts && b.wallposts.others_posts ? "PUBLIC" === b.wallposts.others_posts.is : !1;
		});
	},
	Album : function(params, lib) {"use strict";
		params = params || {};
		var o = "choiceMode isSaved autoSaveMessage serverVals isEditingName isEditingExcerpt viewSlideShow", self, R = RTC;
		R.MakeObsFromArray.call(this, o);
		self = this;
		self.actions = params.actions;
		self.connections = params.connections;
		self.type = "album";
		self._id = R.MakeObs(params._id);
		self.logs = ko.observableArray();
		self.uri = params.uri || ko.observable();
		self.hashURL = params.hashURL;
		self.counts = params.count || {
			attachments : ko.observable(0)
		};
		self.page = params.page || {
			_id : lib._id,
			name : lib.name,
			type : "library"
		};
		self.message = ko.validateIfChanged(R.GetObsVal(params.message));
		self.message.extend({
			throttle : 500
		}).extend({
			maxLength : 10e3
		});
		self.excerpt = ko.validateIfChanged(R.GetObsVal(params.excerpt));
		self.excerpt.extend({
			throttle : 500
		}).extend({
			maxLength : 10e3
		});
		self.name = ko.validateIfChanged(R.GetObsVal(params.name));
		self.name.extend({
			throttle : 500
		});
		self.privacy = params.privacy ? {
			is : ko.validateIfChanged(ko.toJS(params.privacy.is))
		} : {
			is : ko.validateIfChanged("PUBLIC")
		};
		self.getThumbnail = ko.computed(function() {"use strict";
			var id = RTApp.cp()._id(), pic = RTC.GetObsVal(this.picture), link = this.link && RTC.GetObsVal(this.link.src);
			if (pic) {
				return "http://" + pic.replace(id, id + "/110");
			}
			if (link) {
				// placeholder for link post types
			}
			return "http://" + RT.BUCKET + "/avatars/nothumb110.png";
		}, self);
		self.user = lib.user;
		self.status = "active";
		self.picture = params.picture || ko.observable(null);
		self.isDefaultAlbum = params.isDefaultAlbum || null;
		self.attachments = ko.observableArray([]);
		self.showAddFiles = ko.computed(function() {
			return !!this.attachments().length;
		}, self);
		self.isSavable = ko.computed(function() {
			this.isSaved() && this.autoSaveMessage("Saved") || this.autoSaveMessage(null);
			return !this.isSaved();
		}, self);
		self.update = function(pars) {
			self._id(pars._id);
			self.name(pars.name);
			self.uri(pars.uri);
			self.message(pars.message);
			self.excerpt(pars.excerpt);
			self.actions = ko.mapping.fromJS(pars.actions);
			self.connections = ko.mapping.fromJS(pars.connections);
			self.serverVals(pars);
			return self;
		};
		self.currentFile = function(file) {
			return ko.utils.arrayFirst(self.attachments(), function(i) {
				return file.id === i._id();
			});
		};
		self.uploadParams = ko.computed(function() {"use strict";
			var t = this;
			if (t._id && t._id()) {
				return {
					album_id : t._id(),
					access_token : RTApp.at(),
					state : RTApp.st()
				};
			}
			return {
				create_album : ko.toJSON({
					name : t.name(),
					excerpt : t.excerpt(),
					message : t.message(),
					privacy : ko.toJS(t.privacy),
					access_token : RTApp.at(),
					state : RTApp.st()
				})
			};
		}, self);
		self.uploadParams.subscribe(function() {
			return lib.up() && (lib.up().settings.multipart_params = this.uploadParams());
		}, self);
		self.uploadSettings = ko.computed(function() {"use strict";
			var t = this, log = function(k, v) {
				return;
				//console.log({k: v});
			};
			return {
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : "browseButton",
				container : "libraryMobile",
				multipart : false,
				multipart_params : t.uploadParams(),
				max_file_size : "20mb",
				url : "/media/upload",
				flash_swf_url : RTC.resources + "/common/js/plupload/Moxie.swf",
				silverlight_xap_url : RTC.resources + "/common/js/plupload/Moxie.xap",
				filters : [{
					title : "Images",
					extensions : "jpg,gif,png,jpeg,JPG,PNG"
				}, {
					title : "Documents",
					extensions : "doc,docx,xls,xlsx,ppt,pptx,odt,fodt,odp,fodp,ods,fods,pdf"
				}],
				init : {
					Refresh : function(up) {
						log('[Refresh]');
					},
					StateChanged : function(up) {
						log('[StateChanged]', up.state === plupload.STARTED ? "STARTED" : "STOPPED");
						up.state === plupload.STARTED && (up.settings.multipart_params = t.uploadParams());
					},
					UploadProgress : function(up, file) {
						log('[UploadProgress]', 'File:', file, "Total:", up.total);
						t.currentFile(file).percent(file.percent);
					},
					FilesAdded : function(up, upFiles) {"use strict";
						log('[FilesAdded]');
						var processed = [];
						up.settings.multipart_params = t.uploadParams();
						RTC.forEach(upFiles, function(f) {
							f = new RT.Forms.Attachment(f, t);
							f.isUploading(true);
							processed.push(f);
						});
						t.attachments.pushAll(processed);
						return up.start();
					},
					FilesRemoved : function(up, upFiles) {
						log('[FilesRemoved]');
						up.settings.multipart_params = t.uploadParams();
						RTC.forEach(upFiles, function(file) {
							t.currentFile(file).removeFile(file, t);
						});
					},
					FileUploaded : function(up, file, info) {
						log('[FileUploaded] File:', file, "Info:", info);
						up.settings.multipart_params = t.uploadParams();
						var found = t.currentFile(file), req, doc;
						found.percent(100);
						found.isUploading(false);
						if (info.response) {
							req = jQuery.parseJSON(info.response);
							doc = req.data;
							RTC.isSuccess(req) && found.update(doc) && t.update(doc.page);
						}
					},
					ChunkUploaded : function(up, file, info) {
						log('[ChunkUploaded] File:', file, "Info:", info);
						t.currentFile(file).progress(file.percent);
					},
					Error : function(up, args) {
						log('[error] ', args);
					},
					QueueChanged : function(up) {
						// Called when the files in queue are changed by adding/removing files
						log('[QueueChanged]');
					}
				}
			};
		}, self);
		self.isEditingName.subscribe(this.autoSave, this);
		self.isEditingExcerpt.subscribe(this.autoSave, this);
		self.privacy.is.subscribe(this.autoSave.bind(this, false));
		self.attachments.subscribe(function() {
			return RTC.CB.resize();
		});
	},
	Attachment : function(params, album, lib) {"use strict";
		//console.log(ko.toJS(params));
		var self = this, page, id;
		params = params || {};
		id = params._id || params.id;
		album = album && ( page = {
			_id : album._id,
			name : album.name,
			uri : album.uri,
			type : "album"
		}) || {};
		lib = lib || {};
		var o = "isSelected isUploading isHovering editing percent queued size name";
		RTC.MakeObsFromArray.call(this, o);
		self.type = "attachment";
		self._id = RTC.MakeObs(id);
		self.actions = params.actions;
		self.uri = params.uri;
		self.connections = params.connections;
		self.subtype = RTC.MakeObs(params.subtype);
		self.mediainfo = params.mediainfo || {
			size : ko.observable()
		};
		self.link = {
			type : ko.observable(),
			src : ko.observable()
		};
		self.picture = RTC.MakeObs(params.picture);
		self.page = page || {};
		self.page_parent = album.page || {
			_id : lib._id,
			name : lib.name,
			type : "library"
		};
		self.name(RTC.GetObsVal(params.name));
		self.message = RTC.MakeObs(params.message).extend({
			maxLength : 10e3
		});
		self.excerpt = RTC.MakeObs(params.excerpt).extend({
			maxLength : 10e3
		});
		self.user = lib.user;
		self.isPicture = ko.computed(function() {
			return !!RTC.GetObsVal(this.picture);
		}, self);
		self.getThumbSrc = ko.computed(function() {"use strict";
			var id = RTApp.cp()._id(), pic = RTC.GetObsVal(this.picture);
			if (pic) {
				return "//" + pic.replace(id, id + "/110");
			}
			return "/img/nothumb110.png";
		}, self);
		self.getThumbPlaceHolder = ko.computed(function() {"use strict";
			var t = this, s = "110px", e, i, link;
			link = t['link'];
			if (link && link.hasOwnProperty('type') && link.type() === "rich") {
				e = RTC.GetObsVal(t.link.src).split(".");
				e && ( e = e.pop().toLowerCase());
				i = $(RTC.NewDom("i")).attr('id', t._id() + s).css('font-size', s);
				switch (e) {
					case "doc":
					case "docx":
					case "odt":
					case "fodt":
						i.addClass("file-word");
						break;
					case "pptx":
					case "ppt":
					case "odp":
					case "fodp":
						i.addClass("file-ppt");
						break;
					case "pdf":
						i.addClass("file-pdf");
						break;
					case "xls":
					case "xlsx":
					case "ods":
					case "fods":
						i.addClass("file-xls");
						break;
				}
				return i[0].outerHTML;
			}
			return '<i class="icon-spin icon-spinner" style="vertical-align:middle;text-align:middle;font-size:15px"></i>';
		}, self).extend({
			throttle : 100
		});
		self.percent(params.percent);
		self.queued(params.queued);
		self.size(params.size);
		self.removeFile = function(data, album) {
			return album && album.attachments.remove(data);
		};
		self.update = function(pars) {
			self._id(pars._id);
			self.page = pars.page;
			self.name(pars.name);
			self.actions = ko.mapping.fromJS(pars.actions);
			self.connections = ko.mapping.fromJS(pars.connections);
			pars.picture && self.picture(pars.picture);
			pars.mediainfo && (self.mediainfo = pars.mediainfo);
			if (pars.link) {
				self.link.type(pars.link.type);
				self.link.src(pars.link.src);
			}
		};
		self.updateAttachment = function() {
			var t = this, s, p = {
				album_id : t.page && RTC.GetObsVal(t.page._id) || album && RTC.GetObsVal(album._id),
				message : t.message(),
				name : t.name(),
				url : '/post/update/' + t._id(),
				request_type : 'update_attachment'
			};
			return ( s = RTC.PostApi({}, p)) && s.done(function(r) {
				if (RTC.isSuccess(r)) {
					return t.update(r.data) && t.isSaved(true);
				}
			});
		};
		self.editing.subscribe(function(v) {
			return !v && this.updateAttachment();
		}, self);
		self.uploadingText = ko.computed(function() {
			return (self.percent() >= 98) ? 'Processing...' : 'Uploading...';
		}, self);
	},
	Listing : function() {
		var T = this, C = RTC;
		T.defaults = {};
		var o = "confirmCancel isCancelled showMediaMenu priceFormat hasChanges hasValuation hasLand serverVals tempAlbum uploadAlbum currentStep subtype showSubType showAddress editing queued size name picture mediaLib selectFromAlbum uploadNew isSaving";
		C.MakeObsFromArray.call(T, o);
		T.hide = function() {
			if (!T.isSaving()) {
				return T.currentIndex() === 5 ? window.location.reload() : RTC.CB.close();
			}
			return T.isSaving.subscribe(function(v) {
				return !v && (T.currentIndex() === 5 ? window.location.reload() : RTC.CB.close());
			});
		};
		T.steps = ko.observableArray([new C.Step(1, 'Location Details', 'locationDetailsT'), new C.Step(2, 'Listing Details', 'listingDetailsT'), new C.Step(3, 'Finish', 'listingAttachmentT'), new C.Step(4, 'Media', 'mediaAttachT'), new C.Step(5, 'Upload', 'editAlbumT'), new C.Step(6, 'Status', 'postStatusT')]);
		T.currentStep(this.steps()[0]);
		T.editing.subscribe(function(v) {
			return v && T.currentStep(this.steps()[1]);
		}, T);
		T.currentIndex = ko.computed(function() {
			return T.steps.indexOf(T.currentStep());
		}, this);
		T.subTypes = RTC.locationArrays.subtypes;
		T.showAddress(true);
		T.hdbTypes = RTC.locationArrays.hdbTypes;
		T.aptTypes = RTC.locationArrays.aptTypes;
		T.landedTypes = RTC.locationArrays.landedTypes;
		T.propertyTypeCaption = ko.computed(function() {
			var s = this.subtype();
			switch (s) {
				case 'Private Apartments':
				case 'Serviced Apartments':
					return 'Please provide the closest match to what property type this is. Condominiums generally have facilities.';
				case 'Private Landed':
					return 'Please provide the closest match to what property type this is.';
				case 'HDB':
					return 'Please choose a HDB flat type';
			}
		}, this);
		T.leaseSpaceTypes = ["Whole Unit", "Master Room", "Common Room"];
		T.propertyTypes = ko.computed(function() {
			var t = this, s = t.subtype();
			switch (s) {
				case 'Private Apartments':
				case 'Serviced Apartments':
					return t.aptTypes;
				case 'Private Landed':
					return t.landedTypes;
				case 'HDB':
					return t.hdbTypes;
			}
		}, this);
		T.subtype.subscribe(function() {
			return T.listing.property_type(null);
		});
		T.getTemplate = function() {
			return T.currentStep().template;
		};
		T.completedSteps = ko.observableArray();
		T.isStepComplete = function(step) {
			return T.completedSteps.indexOf(step) >= 0;
		};
		var d = "message unitIsAddress type page page_parent property_type address rooms baths price valuation cov builtSize landSize cobroke availability", tD;
		C.MakeObsFromArray.call(T.defaults, d, "");
		tD = T.defaults;
		C.forEach(["property_type", "rooms", "baths", "price", "message", "builtSize"], function(i) {
			return tD[i].extend({
				required : !0
			});
		});
		tD.type("Sale");
		tD.page({
			_id : '',
			name : ''
		});
		tD.page_parent({
			_id : '',
			name : ''
		});
		tD.unitIsAddress(!1);
		tD.rooms.extend({
			number : true
		});
		tD.baths.extend({
			number : true
		});
		tD.price.extend({
			throttle : 100
		});
		tD.valuation.extend({
			throttle : 100
		});
		tD.cov.extend({
			throttle : 500
		});
		tD.builtSize.extend({
			throttle : 100
		});
		tD.message.extend({
			maxLength : 1e4
		});
		tD.unit = {
			floor : ko.observable("").extend({
				required : !0
			}),
			stack : ko.observable("").extend({
				required : !0
			})
		};
		T.defaults = tD;
		T.listing = T.defaults;
		T.locationDetails = ko.computed(function() {
			var l = T.listing, p = l.page();
			return {
				name : C.GetObsVal(p.name),
				genType : ko.computed(function() {
					return RTC.GetObsVal(T.subtype) + " - " + (RTC.GetObsVal(l.property_type) || "");
				}),
				subtype : C.GetObsVal(T.subtype),
				address : C.GetObsVal(l.address)
			};
		}, T);
		T.queryLocation = function(term) {
			return new C.GetApi({}, {
				url : '/listing/keyword/',
				s : term
			});
		};
		T.searchPostal = function(req, res) {
			var s = T.queryLocation(req.term);
			return s && s.done(function(r) {
				return r.data && r.data.length > 0 && res(r.data);
			});
		};
		T.noAutocomplete = function(d, e) {
			var l = T.listing, s, v = $(e.currentTarget).val();
			if (l.page()._id.length === 0) {
				s = T.queryLocation(v);
				s && s.done(function(r) {
					if (RTC.isSuccess(r) && r.data) {
						if (r.data instanceof Array && r.data.length === 1) {
							return T.chooseLocation(null, {
								item : r.data[0]
							});
						}
					}
					return T.chooseLocation(null, {
						item : r.data
					});
				});
			}
			return false;
		};
		T.chooseLocation = function(e, ui) {
			var i = ui && ui.item || {}, c = i && i.child, l = T.listing;
			return c && c._id && l.address(i.address) && C.GetApi({}, {
				url : '/page/index/' + c._id
			}).done(function(r) {
				if (RTC.isSuccess(r) && r.data) {
					T.showSubType(false);
					l.page({
						_id : r.data._id,
						name : r.data.name,
						type : r.data.type,
						subtype : r.data.subtype,
						uri : r.data.uri

					});
					l.page_parent(r.data.parent);
					return T.subtype(r.data.subtype);
				}
				return T.listing.page({
					_id : c._id
				});
			}) || T.subtype('') && T.showSubType(true);
		};
		T.resetSteps = function() {
			this.listing = this.defaults;
			this.listing.page({
				_id : '',
				name : ''
			});
			this.subtype(null);
			this.currentStep(this.steps()[0]);
			return !1;
		};
		T.goToStep = function(data) {
			if (data.id() !== 1) {
				if (!T.steps()[0].isComplete()) {
					//return false;
				}
			}

			return T.currentStep(data);
		};
		T.selectedCoverId = ko.computed(function() {
			return this.picture() ? this.picture()._id() : "";
		}, T);
		T.selectCover = function(d) {
			return T.picture(d);
		};
		T.addedMedia = ko.observableArray();
		T.addedMediaCaption = ko.computed(function() {
			return "<span style='font-size:1.1em'>" + this.addedMedia().length + " </span> item(s) selected";
		}, this);
		T.addToSelected = function(d) {
			var am = T.addedMedia, added = am.addToSet(d, true);
			d.isSelected(added);
			return T.picture( added ? d : am()[0]);
		};
		T.selectAllAttachments = function() {
			var am = T.addedMedia, l = T.mediaLib(), s = l ? l.selectedAlbum() : false, a = s ? s.attachments() : false;
			return a && RTC.forEach(a, function(i) {
				i.isSelected(true);
				T.picture(i);
				return am.push(i);
			});
		};
		T.removeAttachment = function(d) {
			d.isSelected(false);
			return T.addedMedia.remove(d);
		};
		T.albumNavText = ko.computed(function() {
			var t = this, l = t.mediaLib, sa = l && l() ? l().selectedAlbum : false;
			if (sa && sa()) {
				return "Viewing <strong style='color:#666'>" + sa().name() + "</strong>";
			}
			return "Choose album to select files";
		}, T);
		T.removeAllAttachments = function() {
			var l = T.mediaLib(), s = l && l.selectedAlbum(), a = s ? s.attachments() : false;
			a && RTC.forEach(a, function(i) {
				return i.isSelected(false);
			});
			return T.addedMedia([]);
		};
		T.uploadOptionText = ko.computed(function() {
			var t = this, l = t.mediaLib, sa = l && l() ? l().selectedAlbum : false, i = $(RTC.NewDom('i')), s = $(RTC.NewDom('span'));
			if (sa && sa()) {
				i.addClass("icon-upload");
				s.text(" Upload more files").prepend(i);
				return s.html();
			}
			i.addClass("icon-plus-sign");
			s.text(" Create new").prepend(i);
			return s.html();
		}, this);
		T.goToMediaLib = function() {"use strict";
			var cp = RTApp.user(), p = {
				url : cp.uri() + '/media'
			};
			return cp && ( p = new RTC.Get({}, p)) && p.done(function(r) {
				if (RTC.isSuccess(r)) {
					return T.mediaLib(new RT.Library(r.data)) && T.goToStep(T.steps()[3]) || !1;
				}
			});
		};
		T.selectFromAlbum(true);
		T.createAlbum = function() {"use strict";
			var l = T.mediaLib(), s = l && T.uploadAlbum;
			l && s(new RT.Forms.Album({}, l));
			return T.goToStep(T.steps()[4]);
		};
		T.initUploader = function() {
			var l = T.mediaLib(), s = l ? T.uploadAlbum : !1, u = l && l.up;
			return s && s() && (u() && u().refresh() || u(new RTC.Uploader(s())) && u().init());
		};
		T.deleteAlbum = function() {
			var ea = T.uploadAlbum, l = T.mediaLib();
			ea() && ea().actions && ea().actions["delete"]() && RTApp.performAction('delete', ea(), null);
			l.up() && l.up().destroy() && l.up(null);
			return l.selectedAlbum(null) && ea(null) && T.stopEditingAlbum();
		};
		T.deleteFile = function(data) {"use strict";
			var l = T.mediaLib(), sa = l.selectedAlbum, ua = T.uploadAlbum;
			data.actions && data.actions['delete'] && RTApp.performAction('delete', data, null);
			sa() && sa().attachments && sa().attachments.remove(function(item) {
				return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
			});
			ua() && ua().attachments.remove(function(item) {
				return RTC.GetObsVal(item._id) === RTC.GetObsVal(data._id);
			});
			return true;
		};
		T.stopEditingAlbum = function() {"use strict";
			var ta = T.tempAlbum, d = T.uploadAlbum, sv = d() && d().serverVals, l = T.mediaLib(), u = l && l.up;
			if (d()) {
				if (sv()) {
					ta() && ko.mapping.fromJS(sv(), {}, ta()) || ta(new RT.Album(ko.toJS(sv())));
				} else {
					ta() && ta().name(d().name()) && ta().excerpt(d().excerpt()) && ta().counts.attachments(d().counts.attachments()) && ta().privacy.is(d().privacy.is()) || ta(new RT.Album(ko.toJS(d())));
				}
				d() && d()._id() && l.setSelected(ta()) && ta(null);
			}
			u() && u().destroy && u(null);
			T.currentStep(T.steps()[3]);
			return d(null) && l.getAlbums(true) && new RTC.Get({}, {
				url : "/media/deletealbumid"
			});
		};
		T.checkAttachments = function() {
			var t = this, l = t.mediaLib(), s = l ? l.selectedAlbum() : false, a = s ? s.attachments() : false, m = t.addedMedia(), f;
			if (a && !!m.length) {
				return RTC.forEach(a, function(item) {
					f = ko.utils.arrayFirst(m, function(i) {
						return RTC.GetObsVal(i._id) === RTC.GetObsVal(item._id);
					});
					return f && f.isSelected(true);
				});
			}
		};
		T.save = function(d, e) {"use strict";
			var p = {
				JSON : ko.toJSON(T.toJS())
			}, sv = T.serverVals, a = RTApp, is = T.isSaving, hs = T.hasChanges;
			if (!sv())
				return false;
			p.request_type = "update_listing";
			p._id = ko.toJS(sv()._id);
			p.url = "/post/update/";
			is(true);
			p = RTC.PostApi({}, p);
			p.done(function(r) {
				if (RTC.isSuccess(r)) {
					RTC.Renew();
					sv(RTC.CreateLoop(r.data));
					if (a.cp()) {
						if (r.data.user._id === RTC.GetObsVal(a.cp()._id)) {
							a.cp().counts.listings(a.cp().counts.listings() + 1);
							var d = new RT.Listing(r.data);
							console.log(d)
							a.cl.replaceOrAdd(d);
						}
					}
				}
			}).always(function() {
				return is(false) && hs(false) && setTimeout(function() {
					return RTC.CB.resize();
				}, 1);
			})
			return p;
		};
		T.publish = function(d, e) {"use strict";
			var p = {
				JSON : ko.toJSON(T.toJS())
			}, sv = T.serverVals, a = RTApp, l = a.user().counts.listings, is = T.isSaving, hs = T.hasChanges;
			p.request_type = "create_listing";
			p.url = "/post/update/";
			if (!!sv())
				return T.save(d, e).done(function() {
					return T.currentStep((T.steps()[5]));
				});

			is(true);
			return ( p = RTC.PostApi({}, p)) && p.done(function(r) {
				if (RTC.isSuccess(r)) {
					RTC.Renew();
					sv(RTC.CreateLoop(r.data));
					T.currentStep((T.steps()[5]));
					l(l() + 1);
					if (a.cp()) {
						if (r.data.user._id === RTC.GetObsVal(a.cp()._id)) {
							a.cp().counts.listings(a.cp().counts.listings() + 1);
							return a.cl.unshift(new RT.Listing(r.data));
						}
					}
				}
			}).always(function() {
				return is(false) && hs(false);
			});
		};
		T.cancel = function(d, e) {
			if (!T.hasChanges()) {
				return T.hide();
			}
			return T.confirmCancel(!T.confirmCancel());
		};
		T.confirmCancel.subscribe(function() {
			return setTimeout(function() {
				return RTC.CB.resize();
			}, 1);
		}, T);
		T.progressStep = function() {
			var t = this, cs = t.currentStep, cps = cs() + 1;
			return cps <= t.totalSteps && cs(cps) && t.completedSteps.push(cps);
		};
		T.resize = function() {
			var pc = $("#listingCreationContent"), pp = $("#listingCreationWizard"), iH = pp.innerHeight(), o = pp.offset().top, w = RTApp.viewport.height, wmb = $('.windowMenuBar td'), nH;
			if (w() >= iH) {
				return RTC.CB.resize() && wmb.width('20%');
			}
			nH = w() - (o / 2);

			pc.css("maxHeight", nH);
			pp.css("maxHeight", nH);
			RTC.CB.resize({
				height : nH
			}) && wmb.width('20%');
		};

		T.reload = function() {
			return $.fn.colorbox.load();
		};
		T.hasLand.subscribe(function(v) {"use strict";
			var l = T.listing.landSize;
			return v && l.extend({
				required : !0
			}) || l("") && l.rules([]);
		});
		T.hasValuation.subscribe(function(v) {"use strict";
			var p = T.listing.valuation;
			return v && p.extend({
				required : !0
			}) || p("") && p.rules([]);
		});
		T.listing.type.subscribe(function(v) {"use strict";
			var s = T.listing.leaseSpace;
			return v === 'Rent' && s.extend({
				required : !0
			}) || s("") && s.rules([]);
		});
		T.toJS = ko.computed(function() {
			var l = ko.toJS(this.listing), am = this.addedMedia(), RC = RTC.RemoveCommas;
			l.addedMedia = [];
			if (am.length > 0) {
				RTC.forEach(am, function(a) {
					l.addedMedia.push(ko.toJS(a._id));
				});
			}
			if (this.picture()) {
				l.picture = RTC.GetObsVal(this.picture().picture) || "";
			}
			l.rooms = parseInt(l.rooms);
			l.built_size = parseFloat(RC(l.builtSize));
			delete l.builtSize;
			l.land_size = parseFloat(RC(l.landSize)) || 0;
			delete l.landSize;
			l.price = parseFloat(RC(l.price));
			l.cov = parseFloat(RC(l.cov));
			l.valuation = parseFloat(RC(l.valuation)) || 0;
			l.showAddress = this.showAddress();
			return l;
		}, T);
		T.toJS.subscribe(function(v) {
			return this.hasChanges(!!v);
		}, T);
		T.hasChanges.extend({
			throttle : 100
		});
		T.savedButHasChanges = ko.computed(function() {
			return (this.serverVals() && this.hasChanges());
		}, T);
		T.exitLabel = ko.computed(function() {
			return this.savedButHasChanges() ? "Exit" : "Cancel";
		}, T);
		T.publishLabel = ko.computed(function() {
			return this.savedButHasChanges() ? "Save" : "Finish";
		}, T);
		T.completedLabel = ko.computed(function() {
			return this.currentIndex() && this.currentIndex() + " of " + this.steps().length;
		}, T);
		T.listing.property_type.subscribe(function(v) {
			if (v) {
				var types = T.propertyTypes(), s = T.steps()[0];
				return types.indexOf(v) >= 0 && s.isComplete(true);
			}
		}, T);
		T.errors = ko.validation.group(this.listing, {
			deep : !0
		});
		T.goNext = function() {
			return T.canGoNext() && T.currentStep(T.steps()[T.currentIndex() + 1]);
		};
		T.canGoBack = ko.computed(function() {
			return T.editing() ? T.currentIndex() > 1 : T.currentIndex() > 0;
		});
		T.goBack = function() {
			var ni = T.currentIndex() - 1;
			if (ni === 4 || ni === 3) {
				ni = 3;
				T.stopEditingAlbum();
			}
			return T.canGoBack() && T.currentStep(T.steps()[ni]);
		};
		T.canGoNext = ko.computed(function() {
			var ci = T.currentIndex();
			switch (ci) {
				case 0:
					return T.listing.property_type() && ci < T.steps().length - 1;
				case 1:
					return T.errors().length === 0;
				case 3:
				case 4:
					return !1;
			}
			return ci < T.steps().length - 1;
		});
		T.getSelectedPicture = ko.computed(function() {
			var t = this, p = t.picture() ? t.picture().picture : t.picture;
			return RTC.GetThumbnail.call({
				picture : p,
				user : RTApp.user()
			}, 150);
		}, T).extend({
			throttle : 1
		});
		T.picture.subscribe(function(v) {
			var t = this, sv = t.serverVals();
			if (!sv)
				return false;

			return v && t.save();
		}, this);
		var l = T.mediaLib(), s = l && l.selectedAlbum(), a = s ? s.attachments() : !1;
		a && T.checkAttachments.call(T);
		C.forEach(['price', 'valuation', 'cov', 'landSize', 'builtSize'], function(n) {
			if (n === 'valuation' || n === 'price') {
				T.listing[n].subscribe(function() {
					var p = T.listing.price(), v = T.listing.valuation(), rc = C.RemoveCommas, ts = C.ThousandSep;
					return T.listing.cov(ts(parseInt(rc(p), 10) - parseInt(rc(v), 10)) || 0);
				}, T);
			}

			return T.listing[n].subscribe(function(v) {
				return T.listing[n](C.MakePrice(v));
			}, T);
		});
	}
};
RT.Forms.Album.prototype = {
	setPublic : function() {
		return this.privacy.is("PUBLIC");
	},
	setPrivate : function() {
		return this.privacy.is("PRIVATE");
	},
	saveAlbum : function() {"use strict";
		var t = this, s, d = {
			name : t.name(),
			message : t.excerpt() || "",
			privacy : ko.toJS(t.privacy)
		}, p = {};
		t.isSaved(false);
		if (t._id()) {
			p = d;
			p.request_type = "update_album";
		} else {
			p.create_album = ko.toJSON(d);
			p.request_type = "create_album";
		}
		p.url = "/post/update/" + t._id();
		return ( s = RTC.PostApi({}, p)) && s.done(function(r) {
			if (RTC.isSuccess(r)) {
				t.update(r.data) && t.isSaved(true);
				return RTC.Post({}, {
					album_id : t._id(),
					url : "/media/updatealbumid"
				});
			}
		});
	},
	autoSave : function(val) {
		var t = this;
		if (!val) {
			switch (true) {
				case !t.isEditingName() && t.name.hasChanged():
				case !t.isEditingExcerpt() && t.excerpt.hasChanged():
				case t.privacy.is.hasChanged():
					return t.saveAlbum();
			}
		}
		return t.isSaved();
	},
	editName : function() {
		return this.isEditingName(true);
	},
	editExcerpt : function() {
		return this.isEditingExcerpt(true);
	},
	checkAlbum : function() {
		var t = this;
		!t._id() && t.saveAlbum();
		return true;
	}
};
RT.Forms.Attachment.prototype = {
	edit : function() {
		return this.editing(true);
	}
};
RT.Forms.Info.prototype = {
	cancelChangePassword : function() {"use strict";
		var t = this, e = t.editables;
		t.changePassword(false);
		e.currentPassword("");
		e.currentPassword.rules([]);
		e.password("");
		e.password.rules([]);
		e.confirmPassword("");
		e.confirmPassword.rules([]);
	},
	cancelAndExit : function() {
		return window.location = RTApp.user().uri();
	},
	saveAndExit : function() {
		var s, t = this, p = t.toJS(), logout = !!p.password;
		if (t.isSavable() && !t.isSaving()) {
			t.isSaving(!0);
			p.request_type = "update_info";
			return ( s = RTC.PostApi({}, {
				JSON : ko.toJSON(p),
				url : "/user/update/" + ko.toJS(RTApp.user()._id)
			})) && s.done(function(r) {
				if (RTC.isSuccess(r)) {
					t.saveCompleted(true);
					t.editables.commit();
					t.editables.beginEdit("UserInfo");
					for (var i in t.editables) {
						t.editables[i].hasOwnProperty("isModified") && t.editables[i].isModified(false);
					}
					RTC.Renew() && logout && (location.href = "/logout");
					return $.bootstrapGrowl('<p>Changes Saved!<br><small>Your changes have been successfully saved. Hit the "Exit" button to return to your profile page.</small></p>', {
						type : 'success'
					});
				}

				if (RTC.isFailure(r)) {
					for (var i in t.editables) {
						if (r.data.hasOwnProperty(i)) {
							t.editables[i].setError(r.data[i][0]);
							t.editables[i].serverInvalidated = true;
						}
					}
				}
			}).always(function() {
				return t.isSaving(false);
			});
		}
	},
	makeYear : function() {"use strict";
		var l = [], cd = new Date(), i;
		for ( i = 1950; i <= cd.getFullYear(); i++) {
			l.push(i);
		}
		return l;
	},
	cancelCheckUser : function() {"use strict";
		var t = this, e = t.editables;
		t.checkUser(false);
		e.company(this.editables.company.initial());
		e.company.rules([]);
		e.designation(this.editables.designation.initial());
		e.designation.rules([]);
		e.license(this.editables.license.initial());
		e.license.rules([]);
	},
	checkMobileVerify : function() {"use strict";
		//removing mobile validation
		var t = this, c = RTC.MobileVerify(t.editables.smstoken());
		return c && c.done(function(r) {
			return RTC.isFailure(r) && t.smsVerify(!1) || t.smsVerify(!0) && t.mobileVerify(!1);
		}) && c;
	},
	addSocial : function() {
		this.editables.info.social.push(new RTC.SocialField());
	},
	regenerateVcard : function() {
		var s, t = this;
		console.log("vCard generating: " + t.vcardsIsGenerating());
		if (!t.vcardsIsGenerating()) {
			t.vcardsIsGenerating(!0);
			return ( s = RTC.PostApi({}, {
				request_type : "regenerate_vcard",
				vcard : ko.toJS(t.vcardSelected()),
				url : "/user/update/" + ko.toJS(RTApp.user()._id)
			})) && s.done(function(r) {
				if (RTC.isSuccess(r)) {
					RTC.Renew();
					//console.log({html : r.data.html});
				}
			}).always(function() {
				return t.vcardsIsGenerating(!1);
			});
		}
	},
	cancel : function() {"use strict";
		var t = this, p = {
			url : "/media/delete/",
			file : t.tempUpload()
		};
		return ( p = new RTC.Post({}, p)) && p.done(function() {
			t.jCrop.destroy();
			t.tempUpload(null);
			t.uploadStatus(null);
		});
	},
	saveAvatar : function() {"use strict";
		var s, t = this, p = t.dimensions(), $ = jQuery;
		if (!p)
			return false;
		p.url = "/media/crop/";
		p.file = t.tempUpload();
		t.savingCrop(!0);
		return ( s = new RTC.Post({}, p)) && s.done(function(r) {
			var bpp = $("#bigProfilePhoto"), mpp = $("#mobileProfilePhoto");
			t.tempUpload(null);
			t.uploadStatus(null);
			r.data && r.data["150"] && bpp.attr("src", "//" + r.data["150"]) && mpp.attr("src", "//" + r.data["90"]) && $("#navBarProfilePhoto").attr("src", "//" + r.data["16"]);
			t.savingCrop(false);
		});
	},
	getCompany : RTC.GetCompany,
	sourceLang : function(request, response) {
		Languages && response($.ui.autocomplete.filter(Languages, request.term.split(/,\s*/).pop()));
	},
	toJS : function() {"use strict";
		var t = this, tmp = ko.toJS(t.editables), itm, i, j;
		tmp.name = t.name();
		tmp.info.birthday = new Date(tmp.info.birthday).toString();
		if (tmp.password === "") {
			tmp.password = null;
			tmp.confirmPassword = null;
			tmp.currentPassword = null;
		} else {
			tmp.currentPassword = null;
		}
		RTC.forEach(tmp.vcard, function(i) {
			tmp.vcard[tmp.vcard.indexOf(i)] = [{
				value : i.value,
				checked : i.checked
			}];
		});
		//        for (i = 0, j = tmp.info.education.length; i < j; i++) {
		//            itm = tmp.info.education[i];
		//            tmp.info.education[i] = item;
		//        }
		//        for (i = 0, j = tmp.info.achievements.length; i < j; i++) {
		//            itm = tmp.info.achievements[i];
		//            tmp.info.achievements[i] = item;
		//        }
		tmp._id = ko.toJS(t.id);
		tmp.roles = [t.userType()];
		RTC.forEach(["smsVerify", "hasChanges", "errors", "smstoken", "rollback", "isValid", "commit", "beginEdit", "addEditable", "isAnyMessageShown"], function(n) {
			return tmp.hasOwnProperty(n) &&
			delete tmp[n];
		});
		return tmp;
	},
	init : function() {"use strict";
		var self = this, user = RTApp.user(), se = self.editables;
		self.uploader.init();
		self.uploader.refresh();
		ko.editable(se, {
			enable : true,
			scope : "UserInfo"
		});
		se.beginEdit("UserInfo");
		//console.log(se);
		se.smsVerify = ko.observable(!0).extend({
			throttle : 600
		});
		se.smstoken.extend({
			throttle : 600
		});
		self.errors = ko.validatedObservable(this.editables, {
			deep : !0
		});
		self.vcardsIsGenerating = ko.observable(false);
		self.vcardSelected = ko.computed(function() {
			var t = this, e = t.editables, v = e && e.vcard, ret = [];
			if (!v || typeof v !== 'function') {
				return false;
			}
			RTC.forEach(v(), function(item) {
				item.checked() && ret.push(item.value);
			});
			return ret;
		}, self);
		self.name = ko.computed(function() {
			return this.editables.first_name().ucfirst() + " " + this.editables.last_name().ucfirst();
		}, self);
		self.extractCompanyIfAvailable = ko.computed(function() {"use strict";
			var t = this, e = t.editables, co = e.company(), name = co.name && RTC.GetObsVal(co.name);
			if (e.company.hasChanged()) {
				e.company.extend({
					required : !0,
					validation : {
						validator : function() {
							return typeof e.company() === "object";
						},
						message : "Please choose a valid company name from the list."
					}
				});
			} else {
				if ( typeof e.company.isModified === "function") {
					e.company.rules([]);
				}
			}
			t.companyLabel(name);
			return name;
		}, self);
		self.uploading = ko.computed(function() {
			return this.uploadStatus() === "uploading";
		}, self);
		self.uploaded = ko.computed(function() {
			return this.uploadStatus() === "uploaded";
		}, self);
		self.isSavable = ko.computed(function() {
			return this.editables.hasChanges() && this.errors.isValid();
		}, self).extend({
			throttle : 1000
		});
		self.isSavable.subscribe(function(v) {
			if (v && this.saveCompleted())
				return this.saveCompleted(false);
		}, self);
		self.checkUniqueUsername = function(val) {
			return RTC.CheckUnique("#usernameLoading", val, self.isUniqueUsername, 'username');
		};
		self.checkUniqueEmail = function(val) {
			return RTC.CheckUnique("#emailLoading", val, self.isUniqueEmail, 'email');
		};
		self.checkUniquePhone = function(val) {
			if (val.length === 8 && val > 8e7) {
				var s = RTC.CheckUnique("#phoneLoading", val, self.isUniquePhone, 'mobile');
				return s && s.done(function() {
					return self.sendMobileVerify(val);
				});
			}
		};
		self.sendMobileVerify = function(val) {"use strict";
			var s = {
				loading : "#phoneLoading",
				beforeSend : function() {
					se.smstoken("");
				}
			}, p = {
				url : "/verify_sms",
				to : val
			};
			return ( s = RTC.Post(s, p)) && s.done(function(b) {
				return RTC.isSuccess(b) && self.mobileVerify(!0);
			}).always(function() {
				se.smstoken("");
			}) && s;
		};
		self.addCompany = function(event, ui) {
			if (ui.item) {
				se.company(ui.item.value);
				self.companyLabel(ui.item.label);
				return !1;
			}
			se.company([]);
			return !1;
		};
		self.resetCompany = function(event, ui) {
			if (!ui.item) {
				se.company([]);
			}
		};
		self.addLang = function(event, ui) {"use strict";
			var terms = this.value.split(/,\s*/);
			terms.pop();
			terms.push(ui.item.value);
			se.info.languages(terms);
			terms.push("");
			this.value = terms.join(", ");
			return false;
		};
		self.checkEmptyLang = function(data, event) {
			if ($(event.currentTarget).val().length === 0) {
				se.info.languages([]);
			}
		};
		self.addAchievement = function(d, e) {
			switch (e.type) {
				case "click":
					return se.info.achievements.push(new RTC.DualField());
				default:
					var key = e.keyCode || e.which;
					return key === 13 && se.info.achievements.push(new RTC.DualField()) || !0;
			}
		};
		self.removeAchievement = function(achievement) {
			se.info.achievements.remove(achievement);
		};
		self.addEducation = function(d, e) {
			switch (e.type) {
				case "click":
					return se.info.education.push(new RTC.DualField());
				default:
					var key = e.keyCode || e.which;
					return key === 13 && se.info.education.push(new RTC.DualField()) || !0;
			}
		};
		self.removeEducation = function(achievement) {
			se.info.education.remove(achievement);
		};
		self.removeSocial = function(social) {
			se.info.social.remove(social);
		};
		self.showPreview = function(coords) {"use strict";
			var rx = 120 / coords.w, ry = 120 / coords.h, css = {
				width : Math.round(rx * self.originalWidth()) + "px",
				height : Math.round(ry * self.originalHeight()) + "px",
				marginLeft : "-" + Math.round(rx * coords.x) + "px",
				marginTop : "-" + Math.round(ry * coords.y) + "px"
			};
			self.dimensions(coords);
			jQuery("#avatarPreview").css(css);
		};
		self.checkEnter = function(d, e) {"use strict";
			var k = e.keyCode || e.which;
			return k === 13 && self.saveAndExit() || !0;
		};
		// removing mobile sms verification
		//        se.info.telephone.mobile.subscribe(function() {
		//            if (se.info.telephone.mobile.hasChanged()) {
		//                se.smstoken.extend({
		//                    number: !0,
		//                    minLength: 4,
		//                    maxLength: 4,
		//                    required: !0,
		//                    validation: {
		//                        validator: function() {
		//                            return self.smsVerify();
		//                        },
		//                        message: "This SMS token is invalid, please try again."
		//                    }
		//                });
		//            } else {
		//                se.smstoken.rules([]);
		//            }
		//        });
		//        se.smstoken.subscribe(this.checkMobileVerify, this);
		se.info.telephone.mobile.subscribe(function() {
			if (se.info.telephone.mobile.hasChanged()) {
				self.checkUniquePhone(se.info.telephone.mobile());
				se.info.telephone.mobile.extend({
					number : !0,
					minLength : {
						message : RTC.Validation.mobile.invalid.message,
						params : 8
					},
					maxLength : {
						message : RTC.Validation.mobile.invalid.message,
						params : 8
					},
					min : {
						message : RTC.Validation.mobile.invalid.message,
						params : 8e7
					},
					required : !0,
					validation : {
						validator : function() {
							return self.isUniquePhone();
						},
						message : RTC.Validation.mobile.invalid.message
					}
				});
			} else {
				se.info.telephone.mobile.rules([]);
			}
		}, self);
		se.info.telephone.mobile.extend({
			throttle : 500
		});
		se.info.gender.extend({
			required : !0
		});
		se.email.extend({
			throttle : 500
		});
		se.email.subscribe(function() {
			if (se.email.hasChanged()) {
				self.checkUniqueEmail(se.email());
				se.email.extend({
					required : !0,
					email : !0,
					validation : {
						validator : function() {
							return self.isUniqueEmail();
						},
						message : "This email has already been registered."
					}
				});
			} else {
				se.email.rules([]);
			}
		}, self);
		se.first_name.extend({
			required : !0
		});
		se.last_name.extend({
			required : !0
		});
		se.username.extend({
			throttle : 500
		});
		se.username.subscribe(function() {
			if (se.username.hasOwnProperty("serverInvalidated")) {
				se.username.clearError();
			}
			if (se.username.hasChanged()) {
				self.checkUniqueUsername(se.username());
				se.username.extend({
					required : !0,
					minLength : 3,
					pattern : {
						params : RTC.Validation.username.invalid.rule,
						message : RTC.Validation.username.invalid.message
					},
					validation : {
						validator : function() {
							return self.isUniqueUsername();
						},
						message : RTC.Validation.username.notUnique.message
					}
				});
				se.username.extend({
					validation : {
						validator : function() {
							var splits = se.username().split("."), valid = true;
							splits = splits.concat(se.username().split("-"));
							splits = splits.concat(se.username().split("_"));

							if (!!splits.length) {
								RTC.forEach(splits, function(split) {
									return split.match(RTC.Validation.username.restricted.rule) && valid && ( valid = !1);
								});
								return valid;
							}

							return !se.username().match(RTC.Validation.username.restricted.rule + "|^" + se.info.telephone.mobile());
						},
						message : RTC.Validation.username.restricted.message
					}
				});
				se.uri("/" + se.username());
			} else {
				se.username.revert();
				se.username.rules([]);
			}
		}, self);
		self.checkUser.subscribe(function() {
			if (self.checkUser()) {
				se.company.extend({
					required : {
						message : "Please choose a valid company name from the list."
					}
				});
				se.designation.extend({
					required : !0
				});
				se.license.extend({
					required : !0,
					minLength : {
						params : 8,
						message : "Please enter a Valid CEA license"
					},
					maxLength : {
						params : 8,
						message : "Please enter a Valid CEA license"
					},
					pattern : {
						params : "^[a-zA-Z]{1}[0-9]{6}[a-zA-Z]{1}",
						message : "Please enter a Valid CEA license"
					}
				});
				self.userType("agent");
			} else {
				self.userType("user");
			}
		}, self);
		self.tempUpload.subscribe(function() {"use strict";
			var cb = $("#cropBox"), ow = self.originalWidth(), oh = self.originalHeight(), getSelect = function() {
				if (ow >= 150 && oh >= 150) {
					var x, y, x2, y2;
					x = (ow - 150) / 2;
					x2 = x + 150;
					y = (oh - 150) / 2;
					y2 = y + 150;
					return [x, y, x2, y2];
				}
				return null;
			};
			self.jCrop && self.jCrop.destroy();
			cb.css({
				width : "auto",
				height : "auto"
			}).attr("src", self.tempUpload()).Jcrop({
				onChange : self.showPreview,
				onSelect : self.showPreview,
				trueSize : [ow, oh],
				minSize : [150],
				aspectRatio : 1,
				setSelect : getSelect()
			}, function() {
				self.jCrop = this;
			}).parent().css({
				width : "auto",
				height : "auto"
			});
		}, self);
		self.changePassword.subscribe(function(v) {"use strict";
			var t = this, e = t.editables;
			if (v) {
				e.currentPassword.extend({
					required : !0,
					validation : {
						validator : function() {
							return t.isOldPasswordValid();
						},
						message : "Your password does not match the one in our records."
					}
				});
				e.currentPassword.subscribe(function(val) {"use strict";
					var p = {
						type : "username",
						request_type : "validate_password",
						url : "/user/update/" + val
					};
					return t.isOldPasswordValid(!0) && ( p = RTC.PostApi({
						loading : "#passwordLoading"
					}, p)) && p.done(function(r) {
						return t.isOldPasswordValid(!(RTC.isFailure(r)));
					});
				});
				return e.password.extend({
					required : !0
				}) && e.confirmPassword.extend({
					equal : e.password
				});
			}
		}, self);
		self.extractCompanyIfAvailable();
	}
};
RT.Forms.Login.prototype = {
	hide : function() {
		var e = document.getElementById("loginBox");
		e && !!e.length && ko.cleanNode(e);
		RTC.CB.close();
	},
	show : function() {
	},
	login : function() {"use strict";
		var t = this, a = RTApp, s, $ = window.jQuery, l = "#rtLoginLoader", p = {
			url : "/login",
			username : t.username(),
			password : t.password(),
			remember : $("#login_remember").is(":checked")
		}, redirect = RTC.parseGets('redirect_to');
		if (0 !== t.errors().length)
			return t.errors.showAllMessages(), !1;

		return ( s = RTC.Post({
			loading : l
		}, p)) && s.done(function(r) {
			if (RTC.isSuccess(r)) {
				r.session && r.session.access_token && a.at(r.session.access_token);
				$.bootstrapGrowl('<p>Login Successful! <small>Please wait while page reloads...</small></p>', {
					type : 'success'
				});
				if (redirect) {
					return window.location = decodeURIComponent(redirect);
				}
				return window.location.reload();
			}
			return a.isError();
		});
	},
	auto_login : function() {"use strict";
		var t = this, a = RTApp, loc = window.location, s, $ = window.jQuery, l = "#rtLoginLoader", p = {
			url : "/login",
			username : RTApp.user().username(),
			password : t.password(),
			remember : $("#login_remember").is(":checked")
		}, redirect = RTC.parseGets('redirect_to');
		//console.log(redirect);
		if (!t.password.isValid())
			return t.errors.showAllMessages(), !1;
		return ( s = RTC.Post({
			loading : l
		}, p)) && s.done(function(r) {
			if (RTC.isSuccess(r)) {
				r.session && r.session.access_token && a.at(r.session.access_token);
				if (redirect) {
					return loc = decodeURIComponent(redirect);
				}
				//return loc.reload();
			}
			return a.isError();
		});
	}
};
RT.Forms.Settings.prototype = {
	cancelAndExit : function() {
		return window.location = RTApp.user().uri();
	},
	saveAndExit : function() {
		var s, p = this.toJS(), self = this, l = window.location, t = self;
		t.isSaving(!0);
		p.request_type = "update_settings";
		p = {
			JSON : ko.toJSON(p),
			url : "/user/update/" + ko.toJS(this._id)
		};
		return ( s = RTC.PostApi({}, p)) && s.done(function(r) {
			return RTC.isSuccess(r) && ( s = RTC.Renew()) && s.done(function() {
				t.isSaving(!1);
				t.saveCompleted(true);
				t.settings.commit();
				t.settings.beginEdit();
				t.isSaving(!1) && RTC.Renew();
				return $.bootstrapGrowl('<p>Changes Saved!<br><small>Your changes have been successfully saved. Hit the "Exit" button to return to your profile page.</small></p>', {
					type : 'success'
				});
			});
		});
	},
	toJS : function() {"use strict";
		var temp = ko.toJS(this.settings);
		if (temp.notifications.email === "") {
			delete temp.notifications.email;
		}
		return temp;
	}
};
RT.Forms.Post.prototype = {
	setPublic : function() {
		return this.privacy("PUBLIC");
	},
	setPrivate : function() {
		return this.privacy("PRIVATE");
	},
	createStatus : function() {
		return this.postType("postStatus");
	},
	createTestimonial : function() {
		return this.postType("postTestimonial");
	},
	togglePostType : function() {
		return this.postType() === 'postStatus' ? this.createTestimonial() : this.createStatus();
	},
	closePreview : function() {
		this.hasLink(false);
		this.external(null);
		this.externalFields(null);
	},
	detect : function(text) {
		return text && text.match(/(((ht|f)tp(s?):\/\/)|([\w]\.[^ \[\]\(\)\n\r\t]+)|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})\/)([^ \[\]\(\),;&quot;'&lt;&gt;\n\r\t]+)([^\. \[\]\(\),;&quot;'&lt;&gt;\n\r\t])|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})/);
	},
	videoThumb : function() {"use strict";
		var img = $(RTC.NewDom("img"));
		img.css({
			"background-image" : "url(" + this.externalFields().picture + ")",
			"background-repeat" : "repeat",
			"background-position" : "center center",
			"background-size" : "440px 300px",
			height : 247,
			width : 440
		});
		img.attr("src", "/img/play_button.png");
		return img[0].outerHTML;
	},
	createNew : function() {"use strict";
		var t = this, s, p = t.toJS(), a = RTApp, model = p.type === 'post' ? 'Post' : 'Testimonial';
		if (!t.message())
			return false;
		t.isCreating(!0);
		p.url = a.cp().actions.post();
		p.request_type = "create_" + p.type;
		return ( s = RTC.PostApi({}, p)) && s.done(function(r) {
			if (RTC.isSuccess(r)) {
				$("#statusFormTextarea").css("height", "25px");
				a.cl.unshift(new RT[model](r.data));
				t.isCreating(!1);
				t.destroy();
				RTC.Renew();
				p.type === "testimonial" && a.user().counts.testimonials.written(a.user().counts.testimonials.written() + 1);
			}
		});
	},
	toJS : function() {"use strict";
		var t = this, tmp = t.externalFields() || {}, a = RTApp, u = a.user(), c = u.hasOwnProperty("company") && ko.toJS(u.company), cp = a.cp(), pt = cp.hasOwnProperty("type") && cp.type() || null, pr = cp && cp.hasOwnProperty("parent") && ko.toJS(cp.parent);
		tmp.type = t.postType() === "postStatus" ? "post" : "testimonial";
		if (cp && cp.roles) {
			tmp.type = tmp.type === "post" ? "wallpost" : tmp.type;
			pt = "user";
		}
		tmp.privacy = {
			is : t.privacy
		};
		tmp.message = t.message();
		tmp.user = {
			_id : u._id,
			name : u.name
		};
		cp && (tmp.page = {
			_id : cp._id,
			name : cp.name,
			type : pt
		}) && pr && ( typeof pr._id === "string" && (tmp.page_parent = pr));
		c && typeof c._id === "string" && (tmp.company = c);
		return ko.toJS(tmp);
	},
	destroy : function() {
		this.showButtons(!1);
		this.postAreaButton(!1);
		this.message(null);
		this.closePreview();
	},
	init : function() {"use strict";
		var self = this;
		self.showButtons(!0);
		self.postAreaButton(!0);
		self.message.subscribe(function(val) {
			self.postType() === "postStatus" && self.hasLink(self.detect(val));
		}, this);
		self.external.subscribe(function(val) {"use strict";
			var obj = {}, html;
			obj.link = {};
			if (val && val.hasOwnProperty("type") && val.type) {
				obj.link.type = val.type;
				if (val.thumbnail_url) {
					obj.picture = val.thumbnail_url;
					obj.mediainfo = {
						width : val.thumbnail_width,
						height : val.thumbnail_height
					};
				}
				if (val.type === "video") {
					html = jQuery(val.html);
					obj.mediainfo = {
						src : html.attr("src"),
						width : val.width,
						height : val.height,
						frameborder : html.attr("frameborder") || null
					};
					obj.link.name = val.title;
					obj.link.src = "/external?uri=" + val.url;
					obj.link.provider = {
						name : val.provider_name || null,
						url : val.provider_url || null
					};
					obj.link.description = val.description && val.description.prune(250, "...");
				}
				if (val.type === "link") {
					obj.link.name = val.title;
					obj.link.src = "/external?uri=" + val.url;
					obj.link.provider = {
						name : val.provider_name || null,
						url : "/external?uri=" + val.provider_url || null
					};
					obj.link.description = val.description && val.description.prune(250, "...");
				}
				if (val.type === "rich") {
					html = jQuery(val.html);
					obj.mediainfo = {
						src : html.attr("src"),
						width : val.width,
						height : 250
					};
					obj.link.src = "/external?uri=" + val.url;
				}
				if (val.type === "photo") {
					obj.picture = val.url;
					obj.link.src = "/external?uri=" + val.url;
					obj.link.provider = {
						name : val.provider_name || null,
						url : "/external?uri=" + val.provider_url || null
					};
					obj.mediainfo = {
						width : val.width,
						height : val.height
					};
				}
				return this.externalFields(obj);
			}
		}, self);
		this.externalFields.subscribe(function() {"use strict";
			var e = self.externalFields();
			if (!e) {
				return false;
			}
			e.link.type === 'video' && self.hasVideo(!0);
			if (e.link.type === "rich") {
				self.hasRich(!0);
				var i = RTC.NewDom("iframe"), info = e.mediainfo;
				i.width = info.width;
				i.height = info.height;
				i.frameborder = "0";
				i.src = info.src;
				self.richFrame($(i)[0].outerHTML);
			}
		}, this);
		this.hasLink.subscribe(function(val) {
			if (val && val.length >= 3) {
				if (self.external())
					return;
				self.loading(!0);
				$.getJSON("/parseurl", {
					text : decodeURIComponent(self.message())
				}, function(data) {
					self.loading(false);
					self.external(data);
				});
			} else {
				self.external(null);
			}
		}, this);
	}
};
RT.Forms.Registration.prototype = {
	populateUsername : function() {"use strict";
		var a = this, b = function(c) {
			return c.trim().toLowerCase().replace(/\s/g, "-");
		};
		!a.first_name() && !a.last_name() && a.username("");
		a.first_name() && a.last_name() && a.username(b(a.first_name()) + "-" + b(a.last_name()));
		a.first_name() && !a.last_name() && a.username(b(a.first_name()));
		a.last_name() && !a.first_name() && a.username(b(a.last_name()));
	},
	checkUniqueUsername : function() {"use strict";
		var t = this;
		!t.ajaxLoaded() && t.username() && t.username.isValid() && RTC.CheckUnique("#usernameLoading", t.username(), t.isUniqueUsername, 'username');
		return t.isUniqueUsername(!0);
	},
	checkUniquePhone : function() {
		if ("token" !== this.currentState()) {
			var l = "interest" === this.currentState() ? "#iphoneLoading" : "#phoneLoading", t = this;
			return RTC.CheckUnique(l, t.mobile(), null, 'mobile');
		}
	},
	checkUniqueEmail : function() {"use strict";
		var t = this;
		!t.ajaxLoaded() && t.email.isValid() && RTC.CheckUnique("#emailLoading", t.email(), t.isUniqueEmail, 'email');
		return t.isUniqueEmail(!0);
	},
	getUserByMobile : function() {
		return RTC.GetApi({
			loading : "#phoneLoading"
		}, {
			url : "/user/index/" + this.mobile(),
			request_type : "get_by_mobile"
		});
	},
	getRole : function(roles) {
		if (-1 !== roles.indexOf("admin")) {
			return "admin";
		}
		if (-1 !== roles.indexOf("agent")) {
			return "agent";
		}
		if (-1 !== roles.indexOf("user")) {
			return "user";
		}
	},
	getCompany : RTC.GetCompany,
	validateMobile : function() {"use strict";
		var a, s = this;
		s.mobile().length === 8 && ( a = s.getUserByMobile());
		a && a.done(function(r) {
			if (r && r.data && r.data.mobile) {
				s._id(r.data._id || null);
				if (r.data.name) {
					var names = r.data.name.split(" ");
					if (names.length === 2) {
						s.first_name(names[0]);
						s.last_name(names[1]);
					}
				}
				s.user_type("agent");
				s.email(r.data.email || null);
				s.mobile(r.data.mobile.substr(3) || null);
				s.designation(r.data.designation || null);
				return s.isUniquePhone(!0) && s.ajaxLoaded(!0);
			} else if (RTC.isFailure(r)) {
				return s.isUniquePhone(!1);
			}
			return s.isUniquePhone(!0);
		});
	},
	submit : function(r, l) {"use strict";
		var p = this.toJS();
		p.request_type = r;
		p.url = "/user/update/";
		return RTC.PostApi({
			loading : l
		}, p);
	},
	toJS : function() {"use strict";
		var t = this, ret = {
			first_name : t.first_name(),
			last_name : t.last_name(),
			username : t.username(),
			user_type : t.user_type(),
			email : t.email(),
			info : {}
		};
		t._id() && (ret._id = t._id());
		t.gender() && (ret.info.gender = t.gender());
		t.mobile() && (ret.info.telephone = {
			mobile : t.mobile()
		});
		t.company() && (ret.company = t.company());
		t.license() && (ret.license = t.license());
		t.designation() && (ret.designation = t.designation());
		t.message() && (ret.message = t.message());
		t.password() && (ret.password = t.password());
		t.rep() && (ret.rep = t.rep());
		return ret;
	},
	toggleIsUser : function() {
		var t = this;
		return t.isAgent(!1) && t.isUser(!t.isUser()) && t.user_type('user');
	},
	toggleIsAgent : function() {
		var t = this;
		return t.isUser(!1) && t.isAgent(!t.isAgent()) && t.user_type('agent');
	},
	createAccount : function() {
		var t = this, f = t.regFields, a;
		if (!t.validateRegistration()) {
			RTC.forEach(f, function(i) {
				return t[i].isValid() || t[i].isModified(!0);
			});
			return !1;
		}
		t.creating(true);
		return ( a = t.submit('registration')) && a.done(function(r) {
			return RTC.isSuccess(r) && setTimeout(function() {
				t._id(r.data._id);
				t.currentState('payment');
				return $.bootstrapGrowl('<p>Your account was successfully created. We sent you an email.</p>', {
					type : 'success'
				});
			}, 1000);
		}).always(function() {
			t.creating(false);
		});
	},
	saveExtras : function(n) {
		var e = $(n), p = e.serialize(), f = ['company', 'license'], t = this, a;
		if (n && t.user_type === 'agent' && !t.validateAgent()) {
			RTC.forEach(f, function(i) {
				return t[i].isValid() || t[i].isModified(!0);
			});
			return false;
		}
		return ( a = this.submit('save_details')) && a.done(function(r) {
			if (n) {
				return ko.cleanNode(n) && $(n).submit();
			}
			if (RTC.isSuccess(r)) {
				return setTimeout(function() {
					return $.bootstrapGrowl('<p>Your changes were saved.</p>', {
						type : 'success'
					});
				}, 500);
			}
		});
	}
};

var RTApp = new RT.App;
delete RT.App;
jQuery(document).ready(function($) {"use strict";
	var w = window, ril = RTC.responsiveIconLinks;
	//!w["RTC"] && (w["RTC"] = RT.Com);
	RTApp.init();
	ko.applyBindings(RTApp);
	// subscription
	RTApp.isSmallerThanTablet.subscribe(ril);
	//run it the first time
	ril(RTApp.isSmallerThanTablet());
	$(document.body).on("click", ".subscribe-link, .like-link", function(e) {
		e.preventDefault();
		var t = this, a = ko.dataFor(t), r = RTC, isLike = $(t).hasClass('like-link'), s, performSub = function(noElementChange) {
			var j, l = r.Interaction(t, "subscribe", a);
			return ( j = r.PostApi({}, {
				url : l.url
			})) && j.done(function() {
				a.interactions.subscribe(!a.interactions.subscribe());
				if (!noElementChange) {
					return l.modifyElement();
				}
				return;
			}).always(function() {
				var i = l.state ? "Subscribed " : "Stop subscribing ", u = RTApp.user();
				analytics && analytics.track(i + " to " + a.type(), {
					user_id : u._id(),
					post_id : a._id()
				});
			});
		}, performLike = function() {
			var j, l = r.Interaction(t, "like", a);
			return ( j = r.PostApi({}, {
				url : l.url
			})) && j.done(function() {
				a.interactions.like(!a.interactions.like());
				return l.modifyElement();
			}).always(function() {
				var i = l.state ? "Liked " : "Unliked ", u = RTApp.user();
				analytics && analytics.track(i + "a " + a.type(), {
					user_id : u._id(),
					post_id : a._id()
				});
			});

			return l;
		};

		if (isLike) {
			s = performLike().state;
			if (s) {
				//return performSub(true);
			}
			return;
		}
		return performSub();

	}).on("click", ".subscriberHoverCard", function(e) {
		e.preventDefault();
		return new RTApp.interactors(ko.dataFor(this)).init('subscribers');
	}).on("click", ".likerHoverCard", function(e) {
		e.preventDefault();
		return new RTApp.interactors(ko.dataFor(this)).init('likers');
	}).on("click", '.post_read_more, .comment_read_more', function(e) {
		var data = ko.dataFor(this), js = ko.toJS(data), u = js.connections ? js.connections.fullContent : false;
		u && ( u = RTC.GetApi({}, {
			url : u
		})) && u.done(function(r) {
			data.message(r.data);
			return false;
		});
		return false;
	}).on("click", '#mainSubMenu > li > a', function() {
		var t = $(this);
		t.closest('ul').find('li').each(function() {
			$(this).removeClass('active');
		});
		t.parent().addClass('active');
		return true;
	}).on("click", ".person-info-guide > .close", function() {
		$(this).parent().fadeOut();
	}).on("mouseenter", '.carousel', function() {
		$(this).find('.carousel-control').fadeIn();
	}).on("mouseleave", '.hasHoverButtons', function() {
		$(this).find('.imageBar').hide();
	}).on("mouseleave", '.carousel', function() {
		$(this).find('.carousel-control').fadeOut();
	}).on('keypress', function(e) {
		var t = RTApp.currentSlideShow(), k = e.keyCode || e.which, ct = t && t.currentItem, tl = t && t.isLoading;
		if ( typeof ct === 'function' && ct()) {
			switch(k) {
				// Escape
				case 27:
					return t.closeSlideshow();
				// Right
				case 39:
					return t.nextThing();
				// Left
				case 37:
					return t.previousThing();
			}
		}
	}).on('keypress', '.commentInput', function(e) {
		var k = e.keyCode, p = $(e.target || e.currentTarget).parent("form");
		if (k === 13 && !e.shiftKey) {
			e.preventDefault();
			return RTApp.performAction('comment', ko.dataFor(this), null), true;
		}
		return true;
	}).on('submit', '.comment-form', function(e) {
		e.preventDefault();
		return RTApp.performAction.bind(ko.dataFor(this), 'comment');
	}).removeClass("no-js");
	$('#theLoop').on("mouseenter", ".getHoverCardUser", function(e) {
		ko.applyBindingsToNode(this, {
			qtip : RTApp.getUserHoverCard.bind(RTApp, ko.dataFor(this))
		});
	});
	$(w).resize(function() {
		return setTimeout(function() {
			RTApp.viewport.width($(w).innerWidth());
			RTApp.viewport.height($(w).innerHeight());
			RTApp.currentSlideShow() && RTApp.currentSlideShow().resize();
			return RTC.CB.resize();
		}, 1);
	});
	$(".RTASearch").waypoint("sticky", {
		wrapper : '<div class="sticky-wrapper" />',
		stuckClass : "fixed",
		offset : 44
	});
	$("#nextPage").waypoint(RTC.PageHandler, {
		offset : "125%"
	});
	$("#loadAttachments").waypoint(RTC.AlbumHandler, {
		offset : 'bottom-in-view'
	});

	$('header .nav-collapse > ul.nav > li > a:not(".dropdown-toggle")').click(function() {
		var e = $(this);
		e.closest("ul").find("li").removeClass('active');
		e.parent().addClass('active');
		e.find('i').remove();
		e.prepend('<i class="icon-spinner icon-spin"></i>&nbsp;');
		return true;
	});
	if(RTApp.user()){
		var r = new RT.PubSub(RTApp.user());	
		r.init();
	}
	
}); 

