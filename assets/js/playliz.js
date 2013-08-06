var _dragged;

function Video(entry) {
    "use strict";
    var viewCount, description, excerpt, published, updated, originalAuthor, duration, title, posterURL, thumbURL, shortTitle, id, link, src, type;

    if (Utils.exists(entry.yt$statistics)) {
        viewCount   = Utils.addCommas(entry.yt$statistics.viewCount) + "&nbsp;&nbsp;Views";
    } else {
        viewCount = entry.viewCount;
    }

    if (Utils.exists(entry.id.$t)) {
        id = Utils.getId(entry.id.$t);
    } else {
        id = entry.id;
    }

    if (Utils.exists(entry.link[0].href)) {
        link = entry.link[0].href;
    } else {
        link = entry.link;
    }

    if (Utils.exists(entry.src)) {
        src = entry.src;
    }

    if (Utils.exists(entry.id.$t)) {
        type = entry.id.$t;
    } else {
        type = entry.type;
    }

    if (Utils.exists(entry.duration)) {
        duration = entry.duration;
    }

    if (Utils.exists(entry.description)) {
        description = entry.description;
    }

    if (Utils.exists(entry.excerpt)) {
        excerpt = entry.excerpt;
    }

    if (Utils.exists(entry.published)) {
        published = new Date(entry.published.$t);
    }

    if (Utils.exists(entry.updated)) {
        updated = new Date(entry.updated.$t);
    }

    if (Utils.exists(entry.author)) {
        originalAuthor = entry.author;
    }

    if (Utils.exists(entry.originalAuthor)) {
        originalAuthor = entry.originalAuthor;
    }

    if (Utils.exists(entry.title)) {
        title = entry.title;
    }

    if (Utils.exists(entry.shortTitle)) {
        shortTitle = entry.shortTitle;
    }

    if (Utils.exists(entry.posterURL)) {
        posterURL = entry.posterURL;
    }

    if (Utils.exists(entry.thumbURL)) {
        thumbURL = entry.thumbURL;
    }

    if (Utils.exists(entry.media$group)) {
        if (!Utils.exists(entry.media$group.media$content)) {
            return false;
        }

        if (Utils.exists(entry.media$group.media$content[0])) {
            src = entry.media$group.media$content[0].url;
        }
//        if (Utils.exists(entry.media$group.media$content[1])) {
//            src = entry.media$group.media$content[1].url;
//        }        
//        if (Utils.exists(entry.media$group.media$content[2])) {
//            src = entry.media$group.media$content[2].url;
//        }        
        if (Utils.exists(entry.media$group.yt$duration)) {
            duration    = Utils.timeformat(entry.media$group.yt$duration.seconds);
        }
        if (Utils.exists(entry.media$group.media$description)) {
            description = entry.media$group.media$description.$t.autoLink();
            excerpt     = _.string.humanize(description);
            excerpt     = _.string.clean(excerpt);
            excerpt     = _.string.stripTags(excerpt);
            excerpt     = _.string.prune(excerpt, 140);
        }
        if (Utils.exists(entry.media$group.media$title)) {
            title   = _.string.titleize(entry.media$group.media$title.$t.toLowerCase());
            title   = _.string.stripTags(title);
            shortTitle   = _.string.prune(title, 24);
        }
        if (Utils.exists(entry.media$group.media$thumbnail)) {
            posterURL = entry.media$group.media$thumbnail[0].url;
            thumbURL = entry.media$group.media$thumbnail[1].url;
        }
    }

    this.id              = id;
    this.link            = link;
    this.title           = title;
    this.shortTitle      = shortTitle;
    this.excerpt         = excerpt;
    this.description     = description;
    this.posterURL       = posterURL;
    this.thumbURL        = thumbURL;
    this.src             = src;
    this.viewCount       = viewCount;
    this.duration        = duration;
    this.published       = published;
    this.updated         = updated;
    this.originalAuthor  = originalAuthor;
    this.type            = type;
    this.isSeen          = ko.observable(false);
    this.isPlaylistItem  = ko.observable(false);
    this.isPlaying       = ko.observable(false);
    this.isRepeating     = ko.observable(false);
    this.buttonsEnabled  = ko.observable(false);

    return this;
}

function Playlist(entry){
    var videos, name, privacy;
    if(Utils.exists(entry)){
        if(typeof entry.currentPlaylist == 'function'){
            videos = entry.currentPlaylist().videos();
            name = entry.name()
            privacy = entry.currentPlaylist().isPrivate();
        }else{
            videos = entry.videos;
            name = entry.name;
            privacy = entry.isPrivate;
        }
    }
    return{
        name : name,
        owner : ko.observable(),
        videos : ko.observableArray(ko.utils.arrayMap(videos, function(entry){
            var video = new Video(entry);
            video.isPlaylistItem(true);
            return video;
        })),
        isPrivate : ko.observable(privacy),
        collaborators : ko.observableArray()
    }
}

function Player(video, flag){

    flag = !Utils.exists(flag);

    jwplayer('ytplayer')
    .setup({
        flashplayer: '/js/player.swf',
        file: video.src,
        height: playlizApp.player.height,
        width: playlizApp.player.width,
        skin : '/css/beelden.zip',
        controlbar: {
            position: "bottom"
        },
        plugins: {
            "ova-jw": {
                "player": {
                    "modes": {
                        "linear": {
                            "controls": {
                                "enableFullscreen": false,
                                "enablePlay": false,
                                "enablePause": false,
                                "enableMute": true,
                                "enableVolume": true
                            }
                        }
                    }
                }
            }
        }
    })
    .onComplete(function() {
        if(video.isRepeating()){
            return Player(video);
        }
        video.isSeen(video.isSeen()+1);
        if(video.isPlaylistItem()){
            return playLists.playQueue();
        }
    })
    .play(flag);
}

function SearchLists(){
    this.videos = ko.observableArray([]);
    this.searchPlaceholder = ko.observable('Search Videos');
    this.add = function(){
        return playLists.add
    }
    this.dragging = ko.observable();
    this.slideDirectionOut = ko.observable(false);
    this.slideDirectionIn = ko.observable(false);
    this.searchKeyword = ko.observable();
    this.ajaxMessage = ko.observable('<h1 class="alert alert-info">Retrieving Videos&hellip;</h1>');
    this.isSearching = ko.observable(false);
    this.enableButtons = function(video){
        video.buttonsEnabled(true);
    };
    this.disableButtons = function(video){
        video.buttonsEnabled(false);
    };
    this.showRelated = function(video){};
    this.isSeen = function(video){};
    this.trash = function(video){
        searchLists.videos.remove(video);
    };
    this.play = function(video){
        if(video.isPlaying()){
            video.isPlaying(false);
            if(video.isRepeating()){
                video.isRepeating(false);
            }
            return new Player(video, false);
        }
        flagVideos(video);
        playlizApp.log('Playing: ' + video.shortTitle);
        document.title = 'Playing: ' + video.shortTitle;
        return new Player(video);
    };
    this.repeat = function(video){
        if(video.isPlaying()){
            if(video.isRepeating()){
                video.isRepeating(false);
            }else{
                $.each(searchLists.videos(), function() {
                    this.isRepeating(false);
                });
                video.isRepeating(true);
            }
        }
        return this;
    };
    this.related = function(id){
        return {
            url   : searchLists.keyword.url + id + '/related?alt=json',
            label : 'Related Videos &hellip;'
        }
    };
    this.showVideo = function(elem, idx, item){
        if (elem.nodeType === 1){
            $(elem).hide().fadeIn(2500);
        }; 
    };
    this.hideVideo = function(elem, idx, item){
        if (elem.nodeType === 1){
            $(elem).hide(function(){
                $(elem).remove()
            });
        }        
    }
    this.get = function(type, id, options){
        var params = {}, historyObj = {};
        jQuery( '#search' ).autocomplete( "close" );
        sType = searchLists.hasOwnProperty(type) ? type : 'keyword';
        switch(sType){
            case 'keyword':
                params = Utils.exists(options) ? jQuery.extend(searchLists.params, options) : searchLists.params;
                type = searchLists[sType];
                if(Utils.exists(params.q)){
                    searchLists.searchKeyword(params.q)
                    historyObj.name = 'Search Results for "'+params.q+'"';
                    historyObj.q = params.q;
                }
                break;
            case 'related':
                type = searchLists.related(id);
                historyObj.name = _.string.capitalize(sType) + ' Videos for "'+id+'"';
                break;
            default:
                type = searchLists[sType];
                historyObj.name = _.string.capitalize(sType) + ' Videos';
        }
        if(Utils.exists(params.q)){
            searchLists.searchKeyword(params.q)
            historyObj.name = 'Search Results for "'+params.q+'"';
        }

        return $.ajax({
            url : type.url,
            data : params,
            dataType : 'json',
            beforeSend : function(){
                searchLists.videos([]);
                searchLists.isSearching(true);
            },
            success : function(data){
                searchLists.ajaxMessage('<h1 class="alert alert-success">Successful&hellip;</h1>');
                var mapped = ko.utils.arrayMap(data.feed.entry, function(entry){
                    return new Video(entry);
                });
                historyObj.videos = mapped;
                searchLists.videos(mapped);
            },
            complete : function(){
                hist.add(historyObj);
                searchLists.ajaxMessage('<h1 class="alert alert-info">Retrieving Videos&hellip;</h1>');
                searchLists.isSearching(false);
            },
            error : function(){
                searchLists.ajaxMessage('<h1 class="alert alert-error">Sorry, server returned an error, please try again&hellip;</h1>');
            }
        });
    }
    this.params = {
        'max-results': 50,
        'start-index': 1,
        format       : 5,
        lang         : 'EN',
        alt          : 'json',
        restriction  : 'us',
        orderby      : 'relevance',
        v:2
    };
    this.popular = {
        url   : 'https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?alt=json',
        label : 'Popular Videos &hellip;'
    };
    this.keyword = {
        url   : 'http://gdata.youtube.com/feeds/api/videos/',
        label : 'Search Results &hellip;'
    };
}

function PlayLists(){
    this.tempName = ko.observable('Untitled Playlist');
    this.repeatType = ko.observable(false);
    this.currentPlaylist = ko.observable(new Playlist());
    this.currentPlaying = ko.observable('');
    this.playlists = ko.observableArray([]);
    this.sharing = ko.observable(false);
    this.removeMessage = ko.observable(false);
    this.isUnsaved = ko.observable(false);
    this.isShowingPlayLists = ko.observable(false);
    this.editing = ko.observable(false);
    
    this.multiFriendRequest = function(){
        FB.ui({
            method: 'apprequests',
            message: 'Collaborate this playlist with your friends!',
            title : 'Collaborate on PlayLiz.com',
            data: {
                playlistID : 'this is the id', 
                meta : 'some other meta'
            }
        }, this.requestCallback);
      
    };
    this.requestCallback = function(response){
        playlizApp.log(response);
    };  
    
    
    
    this.mustConfirm = ko.observable(false);
    this.toRemove = ko.observable(false);
    this.confirmToRemove = function(){
        if(this.toRemove()){
            this.playlists.remove(this.toRemove());
            this.playlists.push(ko.toJS(new Playlist(this)));
            Utils.save(ko.toJSON(this.playlists()));
            this.isUnsaved(false);
            this.mustConfirm(false);
        }

    };
    this.cancelToRemove = function(){
        this.toRemove(false);
        this.editing(true);
        this.mustConfirm(false);
        return this;
    };

    this.share = function() {
        this.sharing(true);
        jQuery('#linkSelector').select();
    };
    this.edit = function() {
        this.editing(true);
        jQuery('#playlistNamer').select();
    };
    this.play = function(video){
        if(video.isPlaying()){
            video.isPlaying(false);
            return new Player(video, false);
        }
        flagVideos(video);
        playlizApp.log('Playing: ' + video.shortTitle);
        document.title = 'Playing: ' + video.shortTitle;
        return new Player(video);
    };

    this.repeatplayList = function(){
        this.repeatType(! this.repeatType())
        if(this.repeatType()){
            this.currentPlaylist().videos().forEach(function(vid){
                if(vid.isSeen()){
                    vid.isSeen(false);
                }
            }, this);
            return this.playQueue();
        }
        return this;
    };
    this.loadPlaylist = function(item){
        playLists.name(item.name);
        playLists.currentPlaylist(new Playlist(item));
        playLists.isShowingPlayLists(false);
    };
    this.getNextVideoIndex = function(index, iterator){
        var count = playLists.currentPlaylist().videos().length - 1;
        if(iterator == -1){
            if(index -1 == -1) {
                return 0;
            }
        }
        if(iterator == 1){
            if(index + 1 > count){
                return 0
            }
        }
        return index + iterator;
    };
    this.trashPlaylist = function(item){
        playLists.playlists.remove(item);

        Utils.save(ko.toJSON(playLists.playlists()));
        playLists.isUnsaved(false);
    };
    this.trashCurrentPlaylist = function(){
        this.isUnsaved(true);
        this.currentPlaylist(new Playlist());
        this.removeMessage(true);
    };
    this.playQueue = function(iterator){
        var idx, video, videos = this.currentPlaylist().videos();
        if(Utils.exists(iterator)){
            idx = this.getNextVideoIndex(this.currentPlaylist().videos().indexOf(this.currentPlaying()), iterator);
            return this.play(this.currentPlaylist().videos()[idx]);
        }
        if(this.repeatType()){
            idx = this.getNextVideoIndex(this.currentPlaylist().videos().indexOf(this.currentPlaying()), 1);
            return this.play(this.currentPlaylist().videos()[idx]);
        }
        for (i=0; i < videos.length; i++){
            if(! videos[i].isSeen()){
                video = videos[i];
            }
        }
        return this.play(video);

    };
    this.trash = function(video){
        // remove the video
        playLists.currentPlaylist().videos.remove(video);
        // set the unsaved flag
        playLists.isUnsaved(true);
        playLists.removeMessage(playLists.currentPlaylist().videos().length);
    };
    this.emptyPlaylist = function(){
        this.currentPlaylist().videos([]);
        this.removeMessage(false);
    };
    this.save = function(){
        if(this.isUnsaved()){
            var data = new Playlist(this);

            for(var i=0; i<this.playlists().length;i++){
                if(this.playlists()[i].name == data.name){
                    this.mustConfirm(true);
                    this.toRemove(this.playlists()[i]);
                    return;
                //this.playlists.remove(this.playlists()[i]);
                }
            }
            this.playlists.push(ko.toJS(data));
            //
            Utils.save(ko.toJSON(this.playlists()));
            this.isUnsaved(false);
        }
    };
    this.showLoad = function(){
        if(this.isShowingPlayLists()){
            return this.cancelLoad();
        }
        this.isShowingPlayLists(true);
        this.removeMessage(this.playlists().length);
        return this;
    };
    this.cancelLoad = function(){
        this.isShowingPlayLists(false);
        this.removeMessage(this.currentPlaylist().videos().length);
    };
    this.togglePrivacy = function(){
        this.currentPlaylist().isPrivate(!this.currentPlaylist().isPrivate());
    };
    this.shuffle = function(){
        // if an item is currently playing, make sure it remains at the beginning of the list.
        var currentlyPlaying; // only set if exists
        // loop true videos and see if any is currently playing.
        $.each(this.currentPlaylist().videos(), function(key, vid){
            if(vid.isPlaying()){
                currentlyPlaying = vid;
            }
        });
        // next, randomly sort all videos.
        this.currentPlaylist().videos.sort(function(){
            return Math.random()-0.5;
        });

        //check if there is a currently playing item
        if(Utils.exists(currentlyPlaying)){
            this.currentPlaylist().videos.remove(currentlyPlaying);
            this.currentPlaylist().videos.unshift(currentlyPlaying);
        }

        // set the unsaved flag
        this.isUnsaved(true);
    };
    this.reCue = function(video){
        video.isSeen(false);
    };

    // COMPUTED METHODS
    this.add = ko.computed({
        read: function() {
            return this.currentPlaylist().videos() ? this.currentPlaylist().videos()[0] : "";
        },
        write: function(value) {
            // check for duplicates
            this.currentPlaylist().videos.remove(function(item) {
                playlizApp.log({
                    'itemID' : item.id, 
                    'valueID' : value.id
                });
                return item.id === value.id
            });
            // remove it from the searchlist to avoid confusing duplicates.
            searchLists.videos.remove(value);
            // set the playlist flag
            value.isPlaylistItem(true);
            // add the video
            this.currentPlaylist().videos.push(value);
            // make sure the unsaved flag is set
            this.isUnsaved(true);
            this.removeMessage(this.currentPlaylist().videos().length);
        },
        owner: this
    });
    this.name = ko.computed({
        read : function(){
            return this.tempName();
        },
        write : function(value){
            this.tempName(value);
            if(this.currentPlaylist().videos().length >= 1){
                this.isUnsaved(true);
            }
        },
        owner : this
    });
    ko.computed(function(){
        var playlists = Utils.load();
        //playlizApp.log(playlists)
        if(Utils.exists(playlists) && playlists.length >=1){
            //playlizApp.log(playlists)
            this.playlists(jQuery.parseJSON(playlists));
        }
    }, this);
}

function Hist(){
    this.items = ko.observableArray([]);
    this.newType = ko.observable('');
    this.body = ko.observable('content');
    this.currentItem = ko.observable(false);
    this.currentLabel = ko.observable(false);
    this.toggleNone = function(){
        return this.currentLabel(false);
    };
    this.toggleBack = function(){
        var idx = this.getRealIndex(false);
        if(idx !== false){
            return this.currentLabel("Back to " + this.items()[idx].name);
        }
        return this.currentLabel(false);
    };
    this.toggleForward = function(){
        var idx = this.getRealIndex();
        if(idx !== false){
            return this.currentLabel("Forward to " + this.items()[idx].name);
        }
        return this.currentLabel(false);
    };
    this.add = function(obj){
        hist.currentItem(obj)
        hist.newType('');
        hist.items.push(obj);
        hist.setWindowProperties();
        return hist;
    };
    this.setWindowProperties = function(){
        if(this.currentItem()){
            document.title = this.currentItem().name;
            if(Utils.exists(this.currentItem().q)){
                $( '#search' ).val(this.currentItem().q);
            }else{
                $( '#search' ).val('');
            }
        }
    }
    this.currentIndex = ko.computed(function(){
        if(this.currentItem()){
            return this.items.indexOf(this.currentItem());
        }
        return 0;
    }, this);
    this.getRealIndex = function(positive){
        var total = hist.items().length - 1, current = hist.currentIndex();

        positive = ! Utils.exists(positive);

        if(positive){
            return (current == total || current + 1 > total) ? false : current + 1;
        }
        return (current == 0 || current - 1 < 0) ? false : current -1;
    };
    this.previous = function(){
        var newIdx = this.getRealIndex(false);
        if(newIdx !== false){
            this.currentItem(this.items()[newIdx]);
        }
        searchLists.slideDirectionIn('right');
        searchLists.videos(this.currentItem().videos);
        this.setWindowProperties();
        return this.toggleBack();
    };
    this.next = function(){
        var newIdx = this.getRealIndex();
        if(newIdx !== false){
            this.currentItem(this.items()[newIdx]);
        }
        searchLists.slideDirectionIn('left');
        searchLists.videos(this.currentItem().videos);
        this.setWindowProperties();
        return this.toggleForward();
    };
    this.showForwardBtn = function(){
        var total = this.items().length, current = this.currentIndex();
        return !(current == total || current == total - 1);
    };
    this.showBackBtn = function(){
        return ! this.currentIndex() == 0;
    }
    ko.computed(function(){
        if(!this.showBackBtn() || !this.showForwardBtn()){
            return this.currentLabel(false);
        }
        return this;
    }, this)
    return this;
}

function App (){
    this.isLoggedIn = ko.observable(false);
    this.loginBtnText = ko.observable('Login');
    this.me = ko.observable();
    this.accessToken = ko.observable();
    this.loggedInPic = ko.observable();
    this.log = function(msg){
        if (typeof console !== "undefined" || typeof console.log !== "undefined") {
            return console.log(msg);
        }
        return false;
    };
    this.login = function(){
        FB.login(function(response) {
            if (response.authResponse) {
                playlizApp.loginBtnText('Fetching');
                FB.api('/me', function(response) {
                    playlizApp.me(response);
                    playlizApp.loggedInPic('http://graph.facebook.com/' + playlizApp.me().id + '/picture?type=normal');
                    playlizApp.isLoggedIn(true);
                    playlizApp.log(response);
                });
            }
            else {
                playlizApp.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'email,publish_actions'
        })        
    };
    this.logout = function(){};
    this.player = {
        height : 320,
        width  : 240
    };
    this.isCanvas = ko.computed(function(){
        return window.name == "";
    });
    
    this.resize = function(){
        var h = function(w){
            w *= 1;
            return Math.round((w/16)*9);
        },
        r = function(w){
            $('#ytplayer, #ytplayer_wrapper').css({
                width:w,
                height:h(w)
            });
            playlizApp.player.height = h(w);
            playlizApp.player.width = w;
            return true;
        }
        return r(($('#video-dock').width()-150));
    };
}

var Utils = {
    timeformat : function(time){
        var minutes = Math.floor(time / 60);

        var seconds = time - minutes * 60;
        return _.string.lpad(minutes, 2, '0') + ":" + _.string.lpad(seconds, 2, '0');
    },
    popOverPlacement : function(pop, dom_el) {
        var width = window.innerWidth, height = window.innerHeight,
        left = $(dom_el).offset().left, top = $(dom_el).offset().top;
        switch(true){
            case (width < 500) :
            case (height - top >= 400) :
                return 'bottom';
            case (width - left > 400) :
                return 'right';
            default:
                return 'left'
        }
    },
    GET : function(k){
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return typeof vars[k] !== 'undefined' ? vars[k] : false;
    },
    getId : function(id){
        id = id.substr(id.lastIndexOf("/"), id.length).replace('/', '');
        if(!id.indexOf('?') === false){
            return id.substr(0);
        }
        return id.substr(0, id.indexOf('?'));
    },
    exists : function(property){
        var undefined;
        return property !== undefined && property != null;
    },
    addCommas : function(nStr)
    {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },
    save : function(value){
        if(typeof localStorage !== 'undefined'){
            return localStorage.setItem('playlists', value);
        }
        return jQuery.data(document.body, 'playlists', value)

    },
    load : function(){
        if(typeof localStorage !== 'undefined'){
            //localStorage.removeItem('playlists')
            return localStorage.getItem('playlists');
        }
        return jQuery.data(document.body, 'playlists')
    }
};

function flagVideos(video){
    $.each(searchLists.videos(), function() {
        this.isRepeating(false);
        return this.isPlaying(false);
    });
    $.each(playLists.currentPlaylist().videos(), function() {
        this.isRepeating(false);
        return this.isPlaying(false);
    });
    video.isPlaying(true);
    playLists.currentPlaying(video);
}

ko.bindingHandlers.popover = {
    init: function(element, valueAccessor) {
        var options = valueAccessor() || {}, links = $(element), defaultWidth = links.width();
        options.placement = Utils.popOverPlacement;
        options.trigger = 'manual';
        options.html = true;
        links.popover(options)
        links.mouseenter(function (event) {
    
            var link = $(this);
            link.popover('show').width(180);
    
            $('.popover').mouseleave(function () {
                link.popover('hide').width(defaultWidth);
            });   
        });
        
        links.mouseleave(function (event) {
            if (event.toElement === document.body) {
                $(this).popover('hide').width(defaultWidth);
            }           
        });
    }
};
ko.bindingHandlers.tooltip = {
    init: function(element, valueAccessor) {
        var options = valueAccessor() || {};
        options.placement = 'right';
        $(element).tooltip(options);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).tooltip('hide');
        });
    }
};
ko.bindingHandlers.drag = {
    init: function(element, valueAccessor) {
        var dragElement = $(element);
        var dragOptions = {
            helper: 'original',
            revert: true,
            appendTo: 'body',
            scroll: false,
            revertDuration: 0,
            start: function() {
                _dragged = ko.utils.unwrapObservable(valueAccessor().value);
            },
            cursor: 'default'
        };
        dragElement.draggable(dragOptions).disableSelection();
    }
};
ko.bindingHandlers.drop = {
    init: function(element, valueAccessor) {
        var dropElement = $(element);
        var dropOptions = {
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            tolerance : 'touch',
            drop: function(event, ui) {
                valueAccessor().value(_dragged);
            }
        };
        dropElement.droppable(dropOptions);
    }
};

ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor(), $ele = $(element);
        ko.utils.unwrapObservable(value) ? $ele.animate({
            left: parseInt($ele.css('left'),10) == 0 ? - $ele.outerWidth() : 0
        }) : $(element).fadeOut();
    }
};

ko.bindingHandlers.sortableList = {
    _dataItemKey: "data-ko-collectionItem",

    // Detects when an HTML from a JQuery UI Sortabe has been moved
    // and applies the same move to the ViewModel collection item
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).sortable({
            update: function (event, ui) {
                var newIndex = $(element).children().index(ui.item);

                var collection = ko.utils.unwrapObservable(valueAccessor());
                var collectionItem = $(ui.item).data(ko.bindingHandlers.sortableList._dataItemKey);
                var oldIndex = collection.indexOf(collectionItem);

                // move the item from the old index to the new index in the collection.
                collection.splice(oldIndex, 1);
                collection.splice(newIndex, 0, collectionItem);
                valueAccessor().valueHasMutated();
            }
        });
    }
};

ko.bindingHandlers.sortableItem = {
    // Uses Jquery.data() to associate the collection item object
    // with the HTML element.
    init: function (element, valueAccessor, allBindingsAccessor) {
        var collectionItem = ko.utils.unwrapObservable(valueAccessor());
        $(element).data(ko.bindingHandlers.sortableList._dataItemKey, collectionItem);
    }
};

//knockout-sortable | (c) 2012 Ryan Niemeyer | http://www.opensource.org/licenses/mit-license
(function(ko, $, undefined) {
    var ITEMKEY = "ko_sortItem",
    LISTKEY = "ko_sortList",
    PARENTKEY = "ko_parentList";

    //internal afterRender that adds meta-data to children
    var addMetaDataAfterRender = function(elements, data) {
        ko.utils.arrayForEach(elements, function(element) {
            if (element.nodeType === 1) {
                ko.utils.domData.set(element, ITEMKEY, data);
                ko.utils.domData.set(element, PARENTKEY, ko.utils.domData.get(element.parentNode, LISTKEY));
            }
        });
    };

    //prepare the proper options for the template binding
    var prepareTemplateOptions = function(valueAccessor) {
        var result = {},
        options = ko.utils.unwrapObservable(valueAccessor()),
        actualAfterRender;

        //build our options to pass to the template engine
        if (options.data) {
            result.foreach = options.data;
            result.name = options.template;
        } else {
            result.foreach = valueAccessor();
        }

        ko.utils.arrayForEach(["afterAdd", "afterRender", "beforeRemove", "includeDestroyed", "templateEngine", "templateOptions"], function (option) {
            result[option] = options[option] || ko.bindingHandlers.sortable[option];
        });

        //use an afterRender function to add meta-data
        if (result.afterRender) {
            //wrap the existing function, if it was passed
            actualAfterRender = result.afterRender;
            result.afterRender = function(element, data) {
                addMetaDataAfterRender.call(data, element, data);
                actualAfterRender.call(data, element, data);
            };
        } else {
            result.afterRender = addMetaDataAfterRender;
        }

        //return options to pass to the template binding
        return result;
    };

    //connect items with observableArrays
    ko.bindingHandlers.sortable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var $element = $(element),
            value = ko.utils.unwrapObservable(valueAccessor()) || {},
            templateOptions = prepareTemplateOptions(valueAccessor),
            sortable = {},
            startActual, updateActual;

            //remove leading/trailing text nodes from anonymous templates
            ko.utils.arrayForEach(element.childNodes, function(node) {
                if (node && node.nodeType === 3) {
                    node.parentNode.removeChild(node);
                }
            });

            //build a new object that has the global options with overrides from the binding
            $.extend(true, sortable, ko.bindingHandlers.sortable);
            if (value.options && sortable.options) {
                ko.utils.extend(sortable.options, value.options);
                delete value.options;
            }
            ko.utils.extend(sortable, value);

            //if allowDrop is an observable or a function, then execute it in a computed observable
            if (sortable.connectClass && (ko.isObservable(sortable.allowDrop) || typeof sortable.allowDrop == "function")) {
                ko.computed({
                    read: function() {
                        var value = ko.utils.unwrapObservable(sortable.allowDrop),
                        shouldAdd = typeof value == "function" ? value.call(this, templateOptions.foreach) : value;
                        ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, shouldAdd);
                    },
                    disposeWhenNodeIsRemoved: element
                }, this);
            } else {
                ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, sortable.allowDrop);
            }

            //wrap the template binding
            ko.bindingHandlers.template.init(element, function() {
                return templateOptions;
            }, allBindingsAccessor, data, context);

            //keep a reference to start/update functions that might have been passed in
            startActual = sortable.options.start;
            updateActual = sortable.options.update;

            //initialize sortable binding after template binding has rendered in update function
            setTimeout(function() {
                $element.sortable(ko.utils.extend(sortable.options, {
                    start: function(event, ui) {
                        //make sure that fields have a chance to update model
                        ui.item.find("input:focus").change();
                        if (startActual) {
                            startActual.apply(this, arguments);
                        }
                    },
                    update: function(event, ui) {
                        var sourceParent, targetParent, targetIndex, arg,
                        el = ui.item[0],
                        item = ko.utils.domData.get(el, ITEMKEY);

                        if (item) {
                            //identify parents
                            sourceParent = ko.utils.domData.get(el, PARENTKEY);
                            targetParent = ko.utils.domData.get(el.parentNode, LISTKEY);
                            targetIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), el);

                            if (sortable.beforeMove || sortable.afterMove) {
                                arg = {
                                    item: item,
                                    sourceParent: sourceParent,
                                    sourceParentNode: el.parentNode,
                                    sourceIndex: sourceParent.indexOf(item),
                                    targetParent: targetParent,
                                    targetIndex: targetIndex,
                                    cancelDrop: false
                                };
                            }

                            if (sortable.beforeMove) {
                                sortable.beforeMove.call(this, arg, event, ui);
                                if (arg.cancelDrop) {
                                    $(arg.sourceParent === arg.targetParent ? this : ui.sender).sortable('cancel');
                                    return;
                                }
                            }

                            if (targetIndex >= 0) {
                                sourceParent.remove(item);
                                targetParent.splice(targetIndex, 0, item);
                            }

                            //rendering is handled by manipulating the observableArray; ignore dropped element
                            ko.utils.domData.set(el, ITEMKEY, null);
                            ui.item.remove();

                            //allow binding to accept a function to execute after moving the item
                            if (sortable.afterMove) {
                                sortable.afterMove.call(this, arg, event, ui);
                            }
                        }

                        if (updateActual) {
                            updateActual.apply(this, arguments);
                        }
                    },
                    connectWith: sortable.connectClass ? "." + sortable.connectClass : false
                }));

                //handle enabling/disabling sorting
                if (sortable.isEnabled !== undefined) {
                    ko.computed({
                        read: function() {
                            $element.sortable(ko.utils.unwrapObservable(sortable.isEnabled) ? "enable" : "disable");
                        },
                        disposeWhenNodeIsRemoved: element
                    });
                }
            }, 0);

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $element.sortable("destroy");
            });

            return {
                'controlsDescendantBindings': true
            };
        },
        update: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var templateOptions = prepareTemplateOptions(valueAccessor);

            //attach meta-data
            ko.utils.domData.set(element, LISTKEY, templateOptions.foreach);

            //call template binding's update with correct options
            ko.bindingHandlers.template.update(element, function() {
                return templateOptions;
            }, allBindingsAccessor, data, context);
        },
        connectClass: 'cartList',
        allowDrop: true,
        afterMove: null,
        beforeMove: null,
        options: {
            placeholder: "ui-state-highlight",
            items: 'li',
            tolerance : 'touch'
        }
    };
})(ko, jQuery);