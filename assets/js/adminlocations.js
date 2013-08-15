function Searcher() {
    var self, estatecache = [], childcache = [], localitycache = [], buildingcache = [], o =
            'ajaxStatus ajaxData s sector building estate child locality property_type locationForm showEstateForm';
    RTC.MakeObsFromArray.call(this, o);
    self = this;
    self.ajaxStatus('success');
    self.ajaxData({});
    self.isError = ko.computed(function() {
        return "success" !== this.ajaxStatus();
    }, this);
    self.sector('01');
    self.singpostType = ko.observableArray();
    self.auth = function() {
        return {access_token: window['RTApp'].at(), state: window['RTApp'].st()};
    };
    self.getEstates = function(request, response) {
        if (request) {
            var params = self.auth();
            params.url = '/locations/estates/';
            params.term = request.term;
            if (request.term in estatecache) {
                return response(estatecache[ request.term ]);
            }
            return RTC.GetApi({}, params).done(function(r) {
                if (r.data && r.data.length > 0) {
                    estatecache[ request.term ] = r.data;
                    return response(r.data);
                }
            });
        }
    };
    self.addEstate = function(event, ui) {
        if (ui && ui.item) {
            self.estate(ui.item.value);
        }
        return !1;
    };
    self.getChildren = function(request, response) {
        var params = self.auth();
        params.url = '/locations/child/';
        params.term = request.term;
        if (request.term in childcache) {
            return response(childcache[ request.term ]);
        }
        return RTC.GetApi({}, params).done(function(r) {
            if (r.data && r.data.length > 0) {
                childcache[ request.term ] = r.data;
                return response(r.data);
            }
        });
    };
    self.addChild = function(event, ui) {
        if (ui.item) {
            self.child(ui.item.value);
        }
        return !1;
    };
    self.getBuilding = function(request, response) {
        var params = self.auth();
        params.url = '/locations/building/';
        params.term = request.term;
        if (request.term in buildingcache) {
            return response(buildingcache[ request.term ]);
        }
        return RTC.GetApi({}, params).done(function(r) {
            if (r.data && r.data.length > 0) {
                buildingcache[ request.term ] = r.data;
                return response(r.data);
            }
        });
    };
    self.addBuilding = function(event, ui) {
        if (ui.item) {
            self.building(ui.item.value);
        }
        return !1;
    };
    self.results = ko.mapping.fromJS([]);
    self.search = function() {
        var params = self.auth();
        params.url = '/locations/search/';
        params.sector = self.sector();
        params.child = self.child();
        params.estate = self.estate();
        params.building = self.building();
        params.singpostType = self.singpostType();
        params.locality = self.locality();
        params.property_type = self.property_type();
        params.s = self.s();
        return RTC.GetApi({}, params).done(function(r) {
            self.results([]);
            self.selected([]);
            if (r.data && r.data.length > 0) {
                return ko.mapping.fromJS(r.data, {create: function(o) {
                        return new Row(o.data);
                    }}, self.results);
            }
        });
    };
    self.selected = ko.observableArray();
    self.addId = function(d, e) {
        e.currentTarget.checked ? self.selected.push(d._id()) : self.selected.remove(d._id());
        return true;
    };
    self.addIds = function(d, e) {
        $(e.currentTarget).closest('table').find('input:checkbox').prop('checked', e.currentTarget.checked);
        ko.utils.arrayForEach(self.results(), function(i) {
            e.currentTarget.checked ? self.selected.push(i._id()) : self.selected.remove(i._id());
        });
        return true;
    };
    self.modifyEstate = function() {
        var params = self.auth();
        params.url = '/locations/modifyestate/';
        //params.ids = self.selected();
        params.estate = self.estate();
        params.sector = self.sector();
        return RTC.GetApi({}, params).done(function(r) {
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
    self.createLocation = function(d, e) {
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
    self.saveLocation = function(d, e) {
        var params = self.auth();
        params.url = '/locations/createlocation/';
        params.data = ko.toJS(d);
        params.ids = self.selected();
        params.sectors = self.sector();
        return RTC.PostApi({}, params).done(function(r) {
            if (r && r.status === 'success') {
                $('.ui-dialog-titlebar-close').trigger('click');
                self.selected([]);
            }
        });
    };
}

function Row(params) {
    params = params || {};
    ko.mapping.fromJS(params, {}, this);
    var self = this;
    this.fullAdd = ko.computed(function() {
        return self.number() + ' ' + self.street();
    });
    this.isChildLocation = ko.computed(function() {
        return ko.isObservable(self.child);
    });
}

function Location(params) {
    params = params || {};
    var self = this;
    this.id = ko.observable();
    this.name = ko.observable(params.child ? params.child : params.building);
    this.estate = ko.observable(params.estate || null);
    this.property_type = ko.observable(params.property_type || null);
    this.type = ko.observable('location');
    this.subtype = ko.observable(params.property_type || null);
    this.content = ko.observable();
    this.subtypes = ["HDB", "Private Apartments", "Serviced Apartments", "Private Landed"];
    this.hdbTypes = ["2I", "2S (Standard)", "3A", "3A Modified", "3NG", "3NG Modified", "3I", "3I Modified", "3S (Simplified)", "3STD (Standard)", "4A", "4NG", "4S (Simplified)", "4I", "4STD (Standard)", "5A", "5I", "5S", "EA", "EM", "Other"];
    this.aptTypes = ['Condominium', 'Walkup', 'Apartment'];
    this.landedTypes = ["Bungalow", "Bungalow (Good Class)", "Detached", "Semi-Detached", "Terraced", "Corner-Terrace", "Town House", "Shop House", "Conservation House"];
    this.propertyTypes = ko.computed(function() {
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
        return [];
    }, this);

}

$(document).ready(function() {
    window.RTApp['adminLocations'](new Searcher());
//        var al = $('#adminlocations').get(0);
//        ko.unapplyBindings(al);
//        ko.applyBindings(window['searcher'], al);
});