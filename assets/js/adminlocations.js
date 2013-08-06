(function(ko, $) {
    function Searcher() {
        var self = this, estatecache = childcache = localitycache = buildingcache = [];
        this.ajaxStatus = ko.observable('success');
        this.ajaxData = ko.observable({});
        this.isError = ko.computed(function() {
            return "success" !== this.ajaxStatus();
        }, this);
        this.s = ko.observable();
        this.sector = ko.observable('01');
        this.building = ko.observable();
        this.estate = ko.observable();
        this.child = ko.observable();
        this.locality = ko.observable();
        this.property_type = ko.observable();
        this.singpostType = ko.observableArray();
        this.auth = function() {
            return {access_token: at || window['RTApp'].at(), state: st || window['RTApp'].st()};
        };
        this.getEstates = function(request, response) {
            if (request) {
                var settings = {type: 'GET', loading: '#', api: true}, params = self.auth();
                params.url = '/locations/estates/';
                params.term = request.term;
                if (request.term in estatecache) {
                    return response(estatecache[ request.term ]);
                }
                new Fetch(settings, params, self).done(function(r) {
                    if (r.data && r.data.length > 0) {
                        estatecache[ request.term ] = r.data;
                        return response(r.data);
                    }
                });
            }
        };
        this.addEstate = function(event, ui) {
            if (ui && ui.item) {
                self.estate(ui.item.value);
            }
            return !1;
        };
        this.getChildren = function(request, response) {
            var settings = {type: 'GET', loading: '#', api: true}, params = self.auth();
            params.url = '/locations/child/';
            params.term = request.term;
            if (request.term in childcache) {
                return response(childcache[ request.term ]);
            }
            new Fetch(settings, params, self).done(function(r) {
                if (r.data && r.data.length > 0) {
                    childcache[ request.term ] = r.data;
                    return response(r.data);
                }
            });
        };
        this.addChild = function(event, ui) {
            if (ui.item) {
                self.child(ui.item.value);
            }
            return !1;
        };
        this.getBuilding = function(request, response) {
            var settings = {type: 'GET', loading: '#', api: true}, params = self.auth();
            params.url = '/locations/building/';
            params.term = request.term;
            if (request.term in buildingcache) {
                return response(buildingcache[ request.term ]);
            }
            new Fetch(settings, params, self).done(function(r) {
                if (r.data && r.data.length > 0) {
                    buildingcache[ request.term ] = r.data;
                    return response(r.data);
                }
            });
        };
        this.addBuilding = function(event, ui) {
            if (ui.item) {
                self.building(ui.item.value);
            }
            return !1;
        };
        this.results = ko.mapping.fromJS([]);
        this.search = function() {
            var settings = {type: 'GET', loading: '#', api: true}, params = self.auth();
            params.url = '/locations/search/';
            params.sector = self.sector();
            params.child = self.child();
            params.estate = self.estate();
            params.building = self.building();
            params.singpostType = self.singpostType();
            params.locality = self.locality();
            params.property_type = self.property_type();
            params.s = self.s();
            new Fetch(settings, params, self).done(function(r) {
                self.results([]);
                self.selected([]);
                if (r.data && r.data.length > 0) {
                    return ko.mapping.fromJS(r.data, {create: function(o) {
                            return new Row(o.data);
                        }}, self.results);
                }
            });
        };
        this.selected = ko.observableArray();
        this.addId = function(d, e) {
            e.currentTarget.checked ? self.selected.push(d._id()) : self.selected.remove(d._id());
            return true;
        };
        this.addIds = function(d, e) {
            $(e.currentTarget).closest('table').find('input:checkbox').prop('checked', e.currentTarget.checked);
            ko.utils.arrayForEach(self.results(), function(i) {
                e.currentTarget.checked ? self.selected.push(i._id()) : self.selected.remove(i._id());
            });
            return true;
        };
        this.modifyEstate = function() {
            var settings = {type: 'POST', loading: '#', api: true}, params = self.auth();
            params.url = '/locations/modifyestate/';
            //params.ids = self.selected();
            params.estate = self.estate();
            params.sector = self.sector();
            new Fetch(settings, params, self).done(function(r) {
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
        this.createEstate = function() {
//        if (self.results().length === 0) {
//            return alert('The table is empty. Try searching first');
//        }
//        if (self.selectedEntries() === 0) {
//            return alert('Please select rows to apply this update to.');
//        }
            var form = $('#estateForm');
            form.dialog({
                minWidth: 600,
                close: function() {
                    ko.cleanNode(form[0]);
                }
            });
            ko.applyBindings(self, form[0]);
        };
        this.selectedEntries = ko.computed(function() {
            return self.selected().length;
        });
        this.locationForm = ko.observable(null);
        this.createLocation = function(d, e) {
            var form = $('#locationForm');
            self.locationForm(new Location(ko.toJS(d)));
            form.unbind();
            ko.cleanNode(form[0]);
            form.dialog({
                minWidth: 600,
                close: function() {
                    ko.cleanNode(form[0]);
                }
            });

            ko.applyBindings(self, form[0]);
        };
        this.saveLocation = function(d, e) {
            var settings = {type: 'POST', loading: '#', api: true}, params = self.auth();
            params.url = '/locations/createlocation/';
            params.data = ko.toJS(d);
            params.ids = self.selected();
            params.sectors = self.sector();
            new Fetch(settings, params, self).done(function(r) {
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
    }

    $(document).ready(function() {
        window['searcher'] = new Searcher();
        var al = $('#adminlocations').get(0);
        ko.cleanNode(al);
        ko.applyBindings(window['searcher'], al);
    });
})(jQuery, ko);