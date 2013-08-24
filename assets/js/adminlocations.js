function Searcher() {
    var self, estatecache = [], childcache = [], buildingcache = [], o =
            'ajaxStatus ajaxData s sector building estate child locality property_type locationForm showEstateForm showAdvanced';
    RTC.MakeObsFromArray.call(this, o);
    self = this;
    self.ajaxStatus('success');
    self.ajaxData({});
    self.isError = ko.computed(function() {
        return "success" !== this.ajaxStatus();
    }, this);
    self.sector('01');
    self.singpostType = ko.observableArray();
    self.getEstates = function(request, response) {
        if (request) {
            if (request.term in estatecache) {
                return response(estatecache[ request.term ]);
            }
            return RTC.GetApi({}, {url: '/locations/estates/', term: request.term}).done(function(r) {
                if (RTC.isSuccess(r) && r.data.length > 0) {
                    estatecache[ request.term ] = r.data;
                    return response(r.data);
                }
            });
        }
    };
    self.addEstate = function(e, ui) {
        if (ui && ui.item) {
            self.estate(ui.item.value);
        }
        return !1;
    };
    self.getChildren = function(request, response) {
        if (request.term in childcache) {
            return response(childcache[ request.term ]);
        }
        return RTC.GetApi({}, {url: '/locations/child/', term: request.term}).done(function(r) {
            if (RTC.isSuccess(r) && r.data.length > 0) {
                childcache[ request.term ] = r.data;
                return response(r.data);
            }
        });
    };
    self.addChild = function(e, ui) {
        if (ui.item) {
            self.child(ui.item.value);
        }
        return !1;
    };
    self.getBuilding = function(request, response) {
        if (request.term in buildingcache) {
            return response(buildingcache[ request.term ]);
        }
        return RTC.GetApi({}, {url: '/locations/building/', term: request.term}).done(function(r) {
            if (RTC.isSuccess(r) && r.data.length > 0) {
                buildingcache[ request.term ] = r.data;
                return response(r.data);
            }
        });
    };
    self.addBuilding = function(e, ui) {
        if (ui.item) {
            self.building(ui.item.value);
        }
        return !1;
    };
    self.results = ko.mapping.fromJS([]);
    self.search = function() {
        return RTC.GetApi({}, {
            url: '/locations/search/',
            sector: self.sector(),
            child: self.child(),
            estate: self.estate(),
            building: self.building(),
            singpostType: self.singpostType(),
            locality: self.locality(),
            property_type: self.property_type(),
            s: self.s()
        }).done(function(r) {
            self.results([]);
            self.selected([]);
            if (RTC.isSuccess(r) && r.data.length > 0) {
                return ko.mapping.fromJS(r.data, {create: function(o) {
                        return new Row(o.data);
                    }}, self.results);
            }
        });
    };
    self.toggleAdvancedSearch = function() {
        return self.showAdvanced(!self.showAdvanced());
    }
    self.selected = ko.observableArray();
    self.addId = function(d, e) {
        var s = self.selected;
        return e.target.checked ? s.push(d._id()) : s.remove(d._id());
    };
    self.addIds = function(d, e) {
        $(e.target).closest('table').find('input:checkbox').prop('checked', e.target.checked);
        return ko.utils.arrayForEach(self.results(), function(i) {
            return self.addId(i, e);
        }), !0;
    };
    self.modifyEstate = function() {
        return RTC.GetApi({}, {
            url: '/locations/modifyestate/',
            estate: self.estate(),
            sectors: self.sector(),
            s: self.s()
        }).done(function(r) {
            return RTC.isSuccess(r) && ko.utils.arrayForEach(self.selected(), function(id) {
                var match = ko.utils.arrayFirst(self.results(), function(item) {
                    return id === item._id();
                });
                match.estate(self.estate());
                $('.ui-dialog-titlebar-close').trigger('click');
            });
        });
    };
    self.createEstate = function() {
//        if (self.results().length === 0) {
//            return alert('The table is empty. Try searching first');
//        }
//        if (self.selectedEntries() === 0) {
//            return alert('Please select rows to apply this update to.');
//        }
        var vm = self, S = ko.utils.extend(RTC.CBSettings, {
            width: "480px", href: "/assets/admin/createEstate.html", height: "auto",
            onComplete: function() {
                ko.applyBindings(vm, document.getElementById('estateForm'));
                return $.colorbox.resize();
            }
        });
        return $.colorbox(S);
    };
    self.selectedEntries = ko.computed(function() {
        return self.selected().length;
    });
    self.createLocation = function(d) {
        self.locationForm(new Location(ko.toJS(d)));
        var S = ko.utils.extend(RTC.CBSettings, {
            width: "480px", href: '/assets/admin/createLocation.html', height: "auto",
            onComplete: function() {
                ko.applyBindings(self.locationForm(), document.getElementById('locationForm'));
                return $.colorbox.resize();
            }
        });
        return $.colorbox(S);
    };
    self.saveLocation = function(d) {
        return RTC.PostApi({}, {
            url: '/locations/createlocation/',
            data: ko.toJS(d),
            ids: self.selected(),
            sectors: self.sector(),
            s: self.s()
        }).done(function(r) {
            return RTC.isSuccess(r) && $('.ui-dialog-titlebar-close').trigger('click') && self.selected([]);
        });
    };
}

function Updater() {
}

function HistoryViewer() {
}

function Row(p) {
    p = p || {};
    ko.mapping.fromJS(p, {}, this);
    var self = this;
    self.fullAdd = ko.computed(function() {
        return self.number() + ' ' + self.street();
    });
    self.isChildLocation = ko.computed(function() {
        return ko.isObservable(self.child);
    });
}

function Location(p) {
    p = p || {};
    var self, o = 'id name estate type subtype content property_type';
    RTC.MakeObsFromArray.call(this, o);
    self = this;
    self.name(p.child ? p.child : p.building);
    if(!self.name())
        self.name(p.name);
    self.estate(p.estate);
    self.property_type(p.property_type);
    self.type('location');
    self.subtype(p.subtype);
    self.subtypes = ["HDB", "Private Apartments", "Serviced Apartments", "Private Landed"];
    self.hdbTypes = ["2I", "2S (Standard)", "3A", "3A Modified", "3NG", "3NG Modified", "3I", "3I Modified", "3S (Simplified)", "3STD (Standard)", "4A", "4NG", "4S (Simplified)", "4I", "4STD (Standard)", "5A", "5I", "5S", "EA", "EM", "Other"];
    self.aptTypes = ['Condominium', 'Walkup', 'Apartment'];
    self.landedTypes = ["Bungalow", "Bungalow (Good Class)", "Detached", "Semi-Detached", "Terraced", "Corner-Terrace", "Town House", "Shop House", "Conservation House"];
    self.propertyTypes = ko.computed(function() {
        var t = this, s = t.subtype();
        switch (s) {
            case 'Private Apartments':
            case 'Serviced Apartments':
                return t.aptTypes;
            case 'Private Landed':
                return t.landedTypes;
        }
        return null;
    }, self);
    self.create = null;

}

function Straylocations() {
    var self, o = 'debug debugData foundSingpostIds showSingpost singpost record updater strayName postalName strayAddress postalAddress currentPage postalIDs currentMessage processing total googleQuery siteQuery showRecordDetail skip locationForm strayStatus strayComments';
    RTC.MakeObsFromArray.call(this, o);
    self = this;
    self.debug(false);
    self.skip(0);
    self.strayStatus("SUCCESS");
    self.googleOptions = ko.observableArray();
    self.f = "name address estate subtype";
    self.siteQuery("site:condo.singaporeexpats.com");
    self.subtypes = new Location().subtypes;
    self.getSingpost = function(v) {
        if (!v)
            return false;

        self.processing(true);

        var url = '/locations/searchsingpost';
        return RTC.GetApi({}, {
            url: url, name: v.name, street: v.street, postal: v.postal
        }).done(function(r) {
            if(RTC.isSuccess(r)){
                self.singpost(r.data);
            }
            return r.data.debugData && self.debugData(ko.toJSON(r.data.debugData, null, 2))
        }).always(function(){return self.processing(false);});
    }
    self._get = function(url, skip) {
        return RTC.GetApi({}, {
            url: url,
            skip: skip || 0
        });
    }
    self.processingMessages = "Searching SingPost for match...";
    self.currentMessage(self.processingMessages);
    self.processing(true);
    self.currentPage(1);
    self.hasSingpost = ko.computed(function(){return !!this.singpost();}, self);
    self.final = {};
    RTC.MakeObsFromArray.call(self.final, self.f);

    self.reset = function(){
        var setNull = function(o, k){
            return o.hasOwnProperty(k) && typeof o[k] === 'function' && o[k](null);
        },
            obs = 'record singpost strayName postalName';
        self.currentMessage(self.processingMessages);
        self.locationNameEditor.isEditing(true);
        self.locationSubtypeEditor.isEditing(true);
        RTC.forEach(obs.split(" "), function(i) {
            return setNull(self, i);
        });
        RTC.forEach(self.f.split(" "), function(i) {
            return setNull(self.final, i);
        });
        return true;
    };
    self.searchExternal = function(){
        var url = 'http://www.google.com.sg/search?hl=en&q=', q = self.googleQuery() + ' ' + self.siteQuery();
        return window.open(url + escape(q));
    };
    self.popupLocation = function() {
        self.locationForm(new Location(ko.toJS(self.final)));
        self.locationForm().create = self.createLocation.bind(self);
        var S = ko.utils.extend(RTC.CBSettings, {
            width: "480px", href: '/assets/admin/createLocation.html', height: "auto",
            onComplete: function() {
                ko.applyBindings(self.locationForm(), document.getElementById('locationForm'));
                return $.colorbox.resize();
            }
        });
        return $.colorbox(S);
    };
    self.createLocation = function(){
        self.processing(true);
        return RTC.PostApi({}, {
            url: '/locations/createlocation/',
            data: ko.toJS(self.final),
            ids: self.foundSingpostIds()
        }).done(function(r) {
            if(RTC.isSuccess(r)){
                var msg = "Yay! Location created. " + r.data.postal_updated + " postal code(s) were updated to reflect this;";
                return $.bootstrapGrowl(msg, {type: 'success'});
            }
        }).error(function(r) {
            return RTC.isSuccess(r) && $.bootstrapGrowl('Oops something went wrong. If this keeps happening, call me... I love you.', {type: 'error'});
        }).always(function(){return self.processing(false) && $.colorbox.close();});
    };
    self.updateStray = function(){

//        updatestray
        if(!self.record())
            return false;

        return RTC.PostApi({}, {
            url: '/locations/updatestray/',
            id: self.record()._id,
            status: self.strayStatus(),
            message: self.strayComments()
        }).done(function(r) {
            return RTC.isSuccess(r) && $.bootstrapGrowl('Thanks! This record has been updated.', {type: 'success'});
        }).error(function(r) {
            return RTC.isSuccess(r) && $.bootstrapGrowl('Oops something went wrong. If this keeps happening, call me... I love you.', {type: 'error'});
        });
    }
    self.toggleDebug = function(){return self.debug(!self.debug());};
    self.toggleRecordDetail = function(){return self.showRecordDetail(!self.showRecordDetail());};
    self.recordHasDetails = ko.computed(function(){
        var possibilities = 'top type tenure developer', r = self.record(), t;
        if(!r)
            return false;
        console.log({hasrecord: !!r});
        RTC.forEach(possibilities.split(" "), function(i){
            if(r.hasOwnProperty(i)){
                console.log({hasMore: true});
                return t = true;
            }
        });

        return t ? true : false;

    }, self);

    self.toggleSingpost = function(){
        return self.showSingpost(!self.showSingpost());
    };

    self.getCount = function() {
        return self._get('/locations/countstrays/').done(function(r) {
            return RTC.isSuccess(r) && self.total(r.data.total);
        });
    };

    self.next = function() {
        self.skip(self.currentPage() === self.total() ? 0 : self.currentPage());
        var np = self.currentPage() === self.total() ? 1 : self.currentPage() + 1;
        return self.currentPage(np);
    };

    self.previous = function() {
        self.skip(self.currentPage() - 2 >= 0 ? self.currentPage() - 2 : self.total() - 1);
        var s = self.skip(), np = s === self.total() - 1 ? self.total() : s + 1;
        return self.currentPage(np);
    };

    self.init = function() {
        self.getCount();
        self._get('/locations/getstray').done(function(r) {
            return RTC.isSuccess(r) && self.record(r.data);
        });
    };

    /**
     * Form
     */
    self.locationNameEditor = new editableTemplate({
        isEditing: true, fieldsTemplate: 'locationName', text: self.final.name,
        content: {
            strayName: self.strayName, postalName: self.postalName, editableValue: self.final.name
        }
    });

    self.locationAddressEditor = new editableTemplate({
        isEditing: true, fieldsTemplate: 'locationName', text: self.final.address,
        content: {
            strayAddress: self.strayAddress, postalAddress: self.postalAddress, editableValue: self.final.address
        }
    });

    self.locationSubtypeEditor = new editableTemplate({
        isEditing: true, fieldsTemplate: 'locationSubtype', text: self.final.subtype,
        content: {
            subtypes: self.subtypes, editableValue: self.final.subtype
        }
    });

    /**
     * Subscriptionss
     */
    self.skip.subscribe(function(v){
        var t = self;
        console.log({
            ltt: v < t.total(),
            zom: v >= 0,
            lgc: !!(v && (v >= 0) && (v < t.total()))
        })
        return typeof v === 'number' && v >= 0 && v < t.total() && t.reset() && t._get('/locations/getstray', v).done(function(r) {
            return RTC.isSuccess(r) && t.record(r.data);
        }) || false;
    });
    self.record.subscribe(self.getSingpost);
    self.record.subscribe(function(v) {
        if (!v)
            return false;

        self.strayName(v.name);
        self.googleOptions([v.name, v.street]);
        v.postal && self.googleOptions.push('Singapore ' +  v.postal);
        v.type && self.final.subtype(v.type);
    }, self);
    self.singpost.subscribe(function(v) {
        if (!v)
            return false;
        var row = v.data || {}, msg, sEdit = self.locationSubtypeEditor.isEditing;

        v.namefound && (self.final.name(self.strayName()) && self.locationNameEditor.isEditing(false)) || self.final.name(null);;
        row.type && (self.final.subtype(row.type) && sEdit(false)) || self.final.subtype(null) && sEdit(true);

        row.estate && self.final.estate(row.estate) && (row.estateUrl = "/location/estate/" + row.estate.toLowerCase());

        self.postalName(typeof row.child === 'string' ? row.child.ucfirst() : row.building && row.building.ucfirst());

        if(row.source){
            row.colorbox = {iframe:true, href:row.source, width:"99%", height:600, top:0,fastIframe:true};
        }

        if(row.other_name){
            var s = self.strayName() || "", t;
            row.other_name = row.other_name.toLowerCase() === s.toLowerCase() ? null : row.other_name;
            if(row.other_name){
                t = row.other_name.split(" ");
                RTC.forEach(t, function(i){return t[t.indexOf(i)] = i.ucfirst()});
                row.other_name = t.join(" ");
                if(!self.postalName()){
                    self.postalName(row.other_name);
                }
            }
        }

        self.postalName() && self.googleOptions.push(self.postalName());

        if(v.ids){
            self.foundSingpostIds(v.ids);
        }

        msg = '<span class="text-info">'+v.total+'</span>&nbsp;matches(s) found in SingPost';
        self.currentMessage(msg);
    });
    self.changePage = ko.observable().extend({throttle:750});
    self.changePage.subscribe(function(v){
        if(v <= 0 || v > self.total())
            return false;

        self.skip(v-1);
        self.currentPage(v);
    });

    return this;

}

function AdminLocations() {
    var self, o = 'strays searcher history selected locationName name1 name2 locationSubtype';
    RTC.MakeObsFromArray.call(this, o);
    self = this;

    self.searcher(new Searcher);
    self.location = new Location;
    self.strays(new Straylocations);
    self.strays().init();
    self.tabs = ko.observableArray([
        {vm: self.strays(), view: 'Updater', name: 'To Research'},
        {vm: self.history(), view: 'History', name: 'Your History'},
        {vm: self.searcher(), view: 'Searcher', name: 'RealT Search'}
    ]);
    self.selected(self.tabs()[0]);
}

function editableTemplate(params) {
    params = params || {};
    var self = this;
    self.content = ko.observable(params.content);
    self.isEditing = ko.observable(params.isEditing);
    self.fieldsTemplate = params.fieldsTemplate;
    self.text = params.text;
    self.toggleEditing = function() {
        return self.isEditing(!self.isEditing());
    };
    self.stopEditing = function() {
        return self.isEditing(false);
    };
    self.text.subscribe(function(v) {
        return v && self.stopEditing();
    });
}