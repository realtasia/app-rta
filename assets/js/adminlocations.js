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
                if (r.data && r.data.length > 0) {
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
            if (r.data && r.data.length > 0) {
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
            if (r.data && r.data.length > 0) {
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
            if (r.data && r.data.length > 0) {
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
            if (r && r.status === 'success') {
                ko.utils.arrayForEach(self.selected(), function(id) {
                    var match = ko.utils.arrayFirst(self.results(), function(item) {
                        return id === item._id();
                    });
                    match.estate(self.estate());
                    $('.ui-dialog-titlebar-close').trigger('click');
                });
            }
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
            if (r && r.status === 'success') {
                $('.ui-dialog-titlebar-close').trigger('click');
                self.selected([]);
            }
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

}

function AdminLocations() {
    var self, o = 'updater searcher history selected locationName name1 name2 locationSubtype';
    RTC.MakeObsFromArray.call(this, o);
    self = this;

    self.searcher(new Searcher);
    self.location = new Location;
    self.tabs = ko.observableArray([
        {vm: self.updater(), view: 'Updater', name: 'To Research'},
        {vm: self.history(), view: 'History', name: 'Your History'},
        {vm: self.searcher(), view: 'Searcher', name: 'RealT Search'}
    ]);
    self.selected(self.tabs()[0]);

    self.name1("Reflections@Keppel Bay");
    self.name2("Reflections @ Keppel Bay");

    self.locationNameEditor = new editableTemplate({
        isEditing:true, fieldsTemplate: 'locationName', text:self.locationName,
        content:{
            name1: self.name1, name2: self.name2, editableValue:self.locationName
        }
    });

    self.locationSubtypeEditor = new editableTemplate({
        isEditing:true, fieldsTemplate: 'locationSubtype', text:self.locationSubtype,
        content:{
            subtypes: self.location.subtypes, editableValue:self.locationSubtype
        }
    });
}

function editableTemplate(params){
    params = params || {};
    var self = this;
    self.content = ko.observable(params.content);
    self.isEditing = ko.observable(params.isEditing);
    self.fieldsTemplate = params.fieldsTemplate;
    self.text = params.text;
    self.toggleEditing = function(){
        return self.isEditing(!self.isEditing());
    };
    self.text.subscribe(function(v){return v && self.isEditing(false);});
}

$(document).ready(function() {
    return window.RTApp['adminLocations'](new AdminLocations);
});