RT["Admin"] = function() {
    "use strict";
    var self = this, counts = "activations activity all pending presentation signup".split(" "),
            o = "usersType session sessionType counts countPreferences";
    RTC.MakeObsFromArray.call(self, o);
    self.getCounts = function(type, token) {
        "use strict";
        for (var i = 0; i < RTC.timeouts.length; i++) {
            clearTimeout(RTC.timeouts[i]);
        }
        RTC.timeouts = [];
        if (self.countPreferences()) {
            var s = {
                loading: "#rtAdminCountLoader"
            }, p = {
                request_type: "admin_get_users",
                url: "/user/update/" + RTApp.user()._id()
            };
            p.type = type || !0;
            token && (p.token = token);
            (s = RTC.GetApi(s, p)) && s.hasOwnProperty("done") && s.done(function(r) {
                return RTC.isSuccess(r) && self.counts(r.data);
            });
            RTC.timeouts.push(setTimeout(function() {
                return self.getCounts(type);
            }, 5e3));
        }
        return true;
    };
    self.hideCounts = function(data, event) {
        "use strict";
        var showOrNot = !self.countPreferences();
        self.countPreferences(showOrNot);
        var e = $(event.currentTarget);
        e.text(showOrNot ? "HIDE COUNTS" : "SHOW COUNTS");
    };
    self.searchUsers = function() {
        return self.session() ? self.refreshUsers(self.usersType(), self.session()) : self.refreshUsers(self.usersType());
    };
    self.refreshUsers = function(type, token) {
        "use strict";
        var s = {
            loading: "#rtAdminCountLoader"
        }, p = self.getQuery();
        p.token = token;
        type && self.usersType(type) && (p.type = type) || (p.type = !0);
        return (s = RTC.GetApi(s, p)) && s.done(function(r) {
            if (RTC.isSuccess(r)) {
                var field;
                for (field in r.data) {
                    if (r.data[field].hasOwnProperty("cl")) {
                        return RTApp.filterCl(r.data[field]["cl"]);
                    }
                }
            }
        });
    };
    self.activation = function(data) {
        "use strict";
        var s = {loading: "#adminUALoader"}, p = self.getQuery();
        p.url = "/user/update/" + data._id();
        p.request_type = "admin_change_status";
        p.status = data.status() === "active" ? "pending" : "active";
        return (s = RTC.PostApi(s, p)) && s.done(function(r) {
            return RTC.isSuccess(r) && data.status(p.status) && $.bootstrapGrowl('User activated successfully', {type: 'success'});
        });
    };
    self.makeAdmin = function(data, event) {
        return self.changeRole(data, event, "admin");
    };
    self.makeUser = function(data, event) {
        return self.changeRole(data, event, "user");
    };
    self.makeAgent = function(data, event) {
        return self.changeRole(data, event, "agent");
    };
    self.usersType("all");
    self.counts((function() {
        var c = counts, r = {};
        RTC.forEach(c, function(i) {
            return r[i] = {counts: 0};
        });
        return r;
    })());
    self.session.subscribe(self.refreshTokenUsers, self);
    self.countPreferences.subscribe(self.getCounts, self);
};
RT["Admin"].prototype = {
    getQuery: function() {
        "use strict";
        var s = $("form.RTASearch"), a = RTApp, p;
        p = s.length ? s.formParams() : {};
        p.request_type = "admin_get_users";
        p.url = "/user/update/" + a.user()._id();
        p.access_token = a.at();
        p.state = a.st();
        return p;
    },
    getAll: function() {
        return RTApp.ca("leads") && this.refreshUsers("all");
    },
    getPending: function() {
        return RTApp.ca("leads") && this.refreshUsers("pending");
    },
    getActivity: function() {
        return RTApp.ca("leads") && this.refreshUsers("activity");
    },
    getActivations: function() {
        return RTApp.ca("leads") && this.refreshUsers("activations");
    },
    getPresentations: function() {
        return RTApp.ca("leads") && this.refreshUsers("presentation");
    },
    getSignups: function() {
        return RTApp.ca("leads") && this.refreshUsers("signup");
    },
    adminPost: function(loading, params) {
        "use strict";
        var s = {loading: loading, type: "POST"};
        params.url = params.url || "/user/update/" + RTApp.user()._id();
        return RTC.PostApi(s, params);
    },
    createSession: function(type) {
        "use strict";
        var self = this, l = "#adminTokenLoader",
                p = {request_type: "admin_create_session", type: type};
        return this.session()
                ? alert("Please delete previous token before creating a new one")
                : this.session() || this.adminPost(l, p).done(function(r) {
            return r && r.data && r.data.session && self.session(r.data.session.token) && self.sessionType(r.data.session.type);
        });
    },
    createSignupSession: function() {
        return this.createSession('signup');
    },
    createPresentationSession: function() {
        return this.createSession('presentation');
    },
    deleteSession: function() {
        "use strict";
        var self = this, p = {
            request_type: "admin_delete_session",
            url: "/user/update/" + this.session()
        };
        return !this.session() || this.adminPost("#rtAdminSessionLoader", p).done(function(r) {
            return r && r.data && self.session(null) && self.sessionType(null);
        });
    },
    refreshTokenUsers: function() {
        if (this.session()) {
            return this.refreshUsers("token", this.session());
        }
    },
    changeRole: function(data, event, role) {
        "use strict";
        var a;
        return (a = this.adminPost("#adminUALoader", {
            url: "/user/update/" + data._id(),
            request_type: "admin_change_role",
            role: role
        })) && a.done(function(r) {
            return RTC.isSuccess(r) && data.roles([role]) && $.bootstrapGrowl('User role updated to ' + role, {type: 'success'});
        });
    },
    terminateUser: function(data) {
        "use strict";
        var a;
        return (a = this.adminPost("#adminUALoader", {
            url: "/user/update/" + data._id(),
            request_type: "admin_change_status",
            status: "terminated"
        })) && a.done(function(r) {
            return RTC.isSuccess(r) && data.status("terminated") && $.bootstrapGrowl('User status is now terminated', {type: 'success'});
        });
    }
};