RT["Base"] = function() {
    var extenders = [];
    this.extend = function(extender) {
        extenders.push(extender);
    };
    this.init = function() {
        var self = this;
        ko.utils.arrayForEach(extenders, function(extender) {
            extender.call(self);
        });
    };
};

RT["Loop"] = function() {
    ko.mapping.fromJS(arguments[0], {
        key: function(data) {
            return data._id;
        },
        'actions': {
            create: RT.Com.MakeObjPropsObs
        },
        'connections': {
            create: RT.Com.MakeObjPropsObs
        },
        'counts': {
            create: RT.Com.MakeObjPropsObs
        },
        'comments': {
            key: function(data) {
                return data._id;
            },
            create: function(o) {
                return new RT.CreateLoop(o.data);
            }
        },
        'attachments': {
            key: function(data) {
                return data._id;
            },
            create: function(o) {
                return new RT.CreateLoop(o.data);
            }
        }
    }, this);
    this.getAuthorThumb = function() {
        return RT.Com.Avatar.apply(this, arguments);
    };
    this.init();
};
RT["Loop"].prototype = new RT.Base();
RT["Loop"].prototype.extend(function() {
    this.interactable = ko.computed(function() {
        return this.hasOwnProperty("interactions");
    });
    this.isSubscribable = ko.computed(function() {
        return this.interactable() && this.interactions.hasOwnProperty("subscribe");
    });
    this.subscribing = ko.computed(function() {
        return this.isSubscribable() && this.interactions.subscribe();
    });
    this.subscribeTitle = ko.computed(function() {
        return (this.subscribing() ? "Stop subscribing" : "Subscribe") + " to this";
    });
    this.liking = ko.computed(function() {
        return this.interactable() && this.interactions.like();
    });
    this.liking = ko.computed(function() {
        return this.interactable() && this.interactions.like();
    });
    this.likeTitle = ko.computed(function() {
        return (this.liking() ? "Stop liking" : "Like") + " this";
    });
    this.interactable() &&
            (
                this.isLikable() && this.interactions.like.subscribe(function() {
                    if (this.interactions.like() === !0) {
                        this.interactions.subscribe(!0);
                        this.counts.likers(this.counts.likers() + 1);
                    } else {
                        this.counts.likers(this.counts.likers() - 1);
                    }
                }, this),
                this.isSubscribable() && this.interactions.subscribe.subscribe(function() {
                    if (this.interactions.subscribe() === !0) {
                        this.counts.subscribers(this.counts.subscribers() + 1);
                    } else {
                        this.counts.subscribers(this.counts.subscribers() - 1);
                    }
                }, this)
            );
});

RT["Page"] = function(){
    RT.Loop.apply(this, arguments);
    this.iconClass = ko.computed(function() {
        if (this.hasOwnProperty("subtype")) {
            var cls = "hovercards ";
            switch (this.subtype()) {
                case "Private Apartments":
                    return cls + "privateApt";

                case "Private Landed":
                    return cls + "landed";

                case "Serviced Apartments":
                    return cls + "servicedApt";

                case "HDB":
                    return cls + "hdb";

                case "estate":
                    return cls + "estate";
            }
        }
    });
    this.init();
};
RT["Page"].prototype = new RT.Loop();

RT["Post"] = function() {
    RT.Loop.apply(this, arguments);
    this.postSettings = ko.observable(false);
    this.isEmbeddedVideo = ko.observable(false);
    this.isEmbeddedRich = ko.observable(false);
    this.hasVideo = ko.observable(this.hasDetails() && this.link.type() === "video");
    this.hasRich = ko.observable(this.hasDetails() && this.link.type() === "rich");
    this.setPublic = function() {
        return this.privacy.is("PUBLIC");
    };
    this.setPrivate = function() {
        return this.privacy.is("PRIVATE");
    };
    this.showPostSettings = function() {
        return this.postSettings(!0);
    };
    this.hidePostSettings = function() {
        return this.postSettings(!1);
    };
    this.getTemplate = function() {
        return this.type() === "wallpost" ? "post" : this.type();
    };
    this.isPost = function() {
        return this.hasOwnProperty("comments");
    };
    this.canComment = function() {
        return this.isPost() && !this.isTestimonial();
    };
    this.showCommentSubmit = function() {
        return this.commentSubmit(!0);
    };
    this.getComments= function() {
        "use strict";
        var self = this, s;
        return this.counts.comments() > 2 && (s = new RT.Com.GetApi({}, {
            skip: this.currentCommentCount(),
            limit: 50,
            url: this.connections.comments()
        })) && s.done(function(r) {
            if (r && r.status && r.status === "success") {
                return self.comments.insertAll(ko.utils.arrayMap(r.data, function(c) {
                    return new RT.Comment(c);
                }));
            }
        });
    };
    this.deleteComment = function() {
        "use strict";
        var t = this,
            d = arguments[0],
            p = {url: d.actions && d.actions["delete"] && d.actions["delete"] && d.actions["delete"]()},
            a;
        return (a = RT.Com.PostApi({}, p)) && a.done(function(r) {
            return r && r.status && r.status === "success" && t.comments.remove(d) && t.counts.comments(t.counts.comments() - 1);
        });
    };
    this.destroyComment= function() {
        return this.commentSubmit(false) && this.commentText(null);
    };
    this.getThumbnail = function() {
        "use strict";
        var img = new Image();
        img.width = 110;
        img.alt = "Album Thumbnails";
        img.src = getPicBySize.apply(this, arguments);
        return jQuery(img)[0].outerHTML;
        function getPicBySize() {
            if (this.hasOwnProperty("picture") && this.picture()) {
                return "//" + this.picture().replace(this.user._id(), this.user._id() + "/" + (arguments[0] || "150"));
            }
            return "//"+RT.BUCKET+"/avatars/nothumb" + (arguments[0] || "150") + ".png";
        };
    };
    this.getVideoThumbnail = function() {
        "use strict";
        var img = $(document.createElement("img"));
        img.css({
            "background-image": "url(" + this.picture() + ")",
            "background-repeat": "repeat",
            "background-position": "center center",
            "background-size": "440px 300px",
            height: 247,
            width: 440
        });
        img.attr("src", "/img/play_button.png");
        return img[0].outerHTML;
    };
    this.getRichThumbnail = function(){
        var i = jQuery(document.createElement("i"));
        i.addClass("attachment");
        i.addClass(this.getRichCss());
        return i[0].outerHTML;
        //<i class="attachment" data-bind="css:getRichCss"></i>
    }
    this.embedVideo = function() {
        "use strict";
        var iframe = $(document.createElement("iframe"));
        iframe.attr(ko.toJS(this.mediainfo));
        iframe.css('border', 'none');
        return this.isPlayingVideo(iframe[0].outerHTML);
    };
    this.embedDoc = function() {
        if (this.hasRich()) {
            var iframe = $(document.createElement("iframe"));
            iframe.attr(ko.toJS(this.mediainfo));
            iframe.css('border', 'none');
            return this.isEmbeddedRich(iframe[0].outerHTML);
        }
        return "";
    };
    this.init();
};
RT["Post"].prototype = new RT.Loop();
RT["Post"].prototype.extend(function() {
    this.isPostDeleteable = ko.computed(function() {
        if (RTApp && RTApp.user() && RTApp.user().isAdmin()) {
            return !0;
        }
        if (this.isPost() && this.is_owner()) {
            return !0;
        }
        if (this.isPost() && this.is_page_owner()) {
            return !this.isTestimonial();
        }
    });
    this.isTestimonial = ko.computed(function() {
        return this.hasOwnProperty("type") && this.type() === "testimonial";
    });
    this.showCommentBox = ko.computed(function() {
        return this.canComment() && (this.comments().length >= 1 || this.interactable());
    });
    this.commentSubmit = ko.observable(false);
    this.commentText = ko.observable(false);
    this.currentCommentCount = ko.computed(function() {
        return this.isPost() && this.comments && this.comments().length;
    });
    this.hasDetails = ko.computed(function() {
        "use strict";
        var link = RT.Com.GetObsVal(this.link);
        return link && link.hasOwnProperty("src");
    });
    this.getRichCss = ko.computed(function() {
        if (this.hasRich()) {
            var ext = RT.Com.GetObsVal(this.link.src).split(".");
            ext && (ext = ext.pop().toLowerCase());
            switch (ext) {
                case "doc":
                case "docx":
                    return "DOC";
                case "pptx":
                case "ppt":
                    return "PPT";
                case "pdf":
                    return "PDF";
                case "xls":
                case "xlsx":
                    return "XLS";
            }
        }
    });
    this.isActive = ko.computed(function() {
        return this.status && this.status() === "active";
    });
});

RT["Testimonial"] = function(){
    RT.Loop.apply(this, arguments);
    this.editMode = ko.observable(false);
    this.trash = function() {
        return this.status() === "trash" ? this.status("pending") : this.status("trash");
    };
    this.archive = function() {
        return this.status("archive");
    };
    this.approval = function() {
        return this.status() === "active" ? this.status("pending") : this.status("active");
    };
    this.isReceived = ko.computed(function() {
        return this.isTestimonial() && this.page._id() === RTApp.cp()._id();
    });
    this.isWritten = ko.computed(function() {
        return this.isTestimonial() && this.user._id() === RTApp.cp()._id();
    });
    this.editingTemplate = ko.computed(function() {
        return this.editMode() && this.isReceived() ? "editMode" : "regular";
    });
    this.cssParentClassesForReceived = ko.computed(function() {
        if (this.status) {
            switch (this.status()) {
                case "active":
                    return "Approved infoBorderColor";

                case "pending":
                    return "unApproved warningBorderColor";

                case "trash":
                    return "unApproved inverseBorderColor";

                case "archive":
                    return "unApproved";

                default:
                    return "";
            }
        }
    });
    this.cssOptionsClassesForReceived = ko.computed(function() {
        if (this.status) {
            switch (this.status()) {
                case "active":
                    return "infoBGColor infoBorderColor";

                case "pending":
                    return "warningBGColor warningBorderColor";

                case "trash":
                    return "inverseBGColor inverseBorderColor";

                default:
                    return "";
            }
        }
    });
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
    });
    this.currentStateCss = ko.computed(function() {
        if (this.status) {
            switch (this.status()) {
                case "active":
                    return "label-info";

                case "pending":
                    return "label-warning";

                case "trash":
                    return "label-inverse";

                case "archive":
                    return "";
            }
        }
    });
    this.init();
};
RT["Testimonial"].prototype = new RT.Post();

RT["Album"] = function(){
    RT.Loop.apply(this, arguments);
    this.isDefaultAlbum = ko.computed(function() {
        //console.log(this);
        return this.isPost() && this.type() === "album" && (this.name() === "Private Uploads" || this.name() === "Profile Pictures");
    });
    this.init();
};
RT["Album"].prototype = new RT.Post();

RT["Attachment"] = function(){
    RT.Loop.apply(this, arguments);
    this.getPictureThumb = ko.computed(function() {
        if (this.hasOwnProperty("picture") && this.picture()) {
                return "//" + this.picture().replace(this.user._id(), this.user._id() + "/" + (arguments[0] || "150"));
            }
    });
    this.init();
};
RT["Attachment"].prototype = new RT.Post();