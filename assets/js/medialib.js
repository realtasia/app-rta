var domain = 'http://rta.casa.net', common = 'http://jjpc.net/common/js', app;
if (location.host.indexOf('casa') > 1)
{
    domain = 'http://rta.casa.net';
    common = 'http://casa.net/common/js';
}

function File(params)
{
    ko.mapping.fromJS(params, {}, this);
    var params = params || {};
    var self = this;

    this.src = ko.observable('/images/135x110.gif');
    this.name = ko.observable(params.name || 'Caption...');
    this.queued = ko.observable(true);
    this.uploading = ko.observable(false);
    this.uploaded = ko.observable(false);
    this.isHovering = ko.observable(false);
    this.editing = ko.observable(false);
    this.stopEditing = function(item, event)
    {
        item.editing(false);
    }
    this.edit = function(item, event)
    {
        item.editing(true);
    }

    this.progress = ko.observable(0);
}

function Lib(data) {
    ko.mapping.fromJS(data, {}, this);
    var self = this;
    this.files = ko.observableArray([]);
    this.isDroppable = ko.observable(false);
    this.uploading = ko.observable(false);
    this.isShowingUpload = ko.observable(false);
    this.progress = ko.observable(0);
    this.droppable = ko.computed(function() {
        return this.isDroppable() && this.files().length === 0;
    }, this);
    //this.counts = ko.mapping.fromJS(data, this);
    this.allMedia = ko.computed(function() {
        return this.counts.pictures() + this.counts.videos() + this.counts.documents();
    }, this);
    this.allAlbums = ko.computed(function() {
        return this.counts.albums.private() + this.counts.albums.public();
    }, this);
    this.showUpload = ko.computed({
        read: function() {
            return self.isShowingUpload();
        },
        write: function(value) {
            self.isShowingUpload(true);
            $('#uploadPopUp').modal({backdrop: 'static', show: true})
            self.uploader.init();
        }
    });
    this.hideUpload = ko.computed({
        read: function() {
            return self.isShowingUpload();
        },
        write: function(value) {
            self.isShowingUpload(false);
            $('#uploadPopUp').modal('hide')
            self.uploader.destroy();
            return self;
        }
    });
    this.uploader = new Uploader(this);
    this.uploader.bind('Init', function(up, pars) {
        if (self.files().length === 0)
        {
            $('#dropzone').css('height', $('#droppable').innerHeight());
        }
        if (typeof FileReader !== 'undefined' && !((pars.runtime === "flash") || (pars.runtime === "silverlight")))
        {
            self.isDroppable(true);
        }
        log(pars.runtime);
    });
}

function Uploader(VM) {
    var self = this;

    this.files = VM.files();
    this.logs = ko.observableArray();
    this.currentFile = function(file){
        return ko.utils.arrayFirst(self.files, function(i){
            return file.id === ko.isObservable(i) ? i.id() : i.id;
        });
    };

    return new plupload.Uploader({
        runtimes: 'html5,flash,silverlight',
        browse_button: 'pickfiles',
        container: 'uploadArea',
        multipart: false,
        drop_element: 'dropzone',
        max_file_size: '20mb',
        chunk_size: '2mb',
        url: domain + '/media/upload',
        flash_swf_url: domain + '/js/plupload.flash.swf',
        silverlight_xap_url: domain + '/js/plupload.silverlight.xap',
        filters: [
            {title: "Images", extensions: "jpg,gif,png,jpeg"},
            {title: "Documents", extensions: "pdf"}
        ],
        init: {
            Refresh: function(up) {
                self.logs.push({'[Refresh] Uploader:': up});
            },
            StateChanged: function(up) {
                self.logs.push({'[StateChanged] Uploader:': up});
                var uploading = (up.state === plupload.STARTED);
                VM.uploading(uploading);
            },
            QueueChanged: function(up) {
                self.logs.push({'[QueueChanged] Uploader:': up});
            },
            UploadProgress: function(up, file) {
                self.logs.push({'[UploadProgress] Uploader:': up, "File:": file});
                self.currentFile(file).progress(file.percent);
                VM.progress(up.total.percent);
            },
            FilesAdded: function(up, upFiles) {
                self.logs.push({'[FilesAdded] Uploader:': up, "Files:": upFiles});
                ko.utils.arrayForEach(upFiles, function(item) {
                    var fileParams = {
                        id : item.id, name : item.name, size : plupload.formatSize(item.size)
                    },
                    new_file = new File(fileParams);
                    new_file.uploading(true);
                    new_file.queued(true);
                    VM.files.push(new_file);
                });
                up.refresh(); // Reposition Flash/Silverlight
                $('#dropzone').removeClass('hover').addClass('uploadMenu');
                up.start();
            },
            FilesRemoved: function(up, upFiles) {
                self.logs.push({'[FilesRemoved] Uploader:': up, "Files:": upFiles});
                if (VM.files().length === 0)
                {
                    $('#dropzone').removeClass('uploadMenu');
                }

                plupload.each(upFiles, function(file) {
                    log('  File:', file);
                });
            },
            FileUploaded: function(up, file, info) {
                self.logs.push({'[FileUploaded] File:': file, "Info:": info});

                var found = self.currentFile(file);

                found.progress(100);
                found.uploaded(true);
                found.uploading(false);
                found.queued(false);
                if (info.response){
                    found.src('http://' + info.response);
                }

            },
            ChunkUploaded: function(up, file, info) {
                self.logs.push({'[ChunkUploaded] File:': file, "Info:": info});
                self.currentFile(file).progress(file.percent);
                VM.progress(up.total.percent);
            },
            Error: function(up, args) {
                self.logs.push({'[ERROR] Uploader:': up, "Args:": args});
            }
        }
    });

}

var dat = {
    counts: {
        pictures: 0,
        videos: 0,
        documents: 0,
        albums: {
            private: 0,
            public: 0
        }
    }
};
function log() {
    var str = "";

    plupload.each(arguments, function(arg) {
        var row = "";

        if (typeof(arg) != "string") {
            plupload.each(arg, function(value, key) {
                // Convert items in File objects to human readable form
                if (arg instanceof plupload.File) {
                    // Convert status to human readable
                    switch (value) {
                        case plupload.QUEUED:
                            value = 'QUEUED';
                            break;

                        case plupload.UPLOADING:
                            value = 'UPLOADING';
                            break;

                        case plupload.FAILED:
                            value = 'FAILED';
                            break;

                        case plupload.DONE:
                            value = 'DONE';
                            break;
                    }
                }

                if (typeof(value) != "function") {
                    row += (row ? ', ' : '') + key + '=' + value;
                }
            });

            str += row + " ";
        } else {
            str += arg + " ";
        }
    });

    $('#log').append(str + "<br>");
}

$(document).ready(function() {
    var lib = new Lib(dat);

    ko.applyBindings(lib);
    //lib.uploader.init();

    $(".thumbnails").delegate(".deleteFile", "click", function() {
        //retrieve the context
        var file = ko.dataFor(this);
        if (file.uploaded()){
            log("File uploaded. Send request to server for deletion");
        }else{
            log("Removing file " + file.id + " from queue");
            lib.uploader.splice(file.id, 1)
            lib.files.remove(file);
        }

        return false;
    });
    $(".imageItem").live({
        mouseenter: function() {
            ko.dataFor(this).isHovering(true);
        }, mouseleave: function() {
            ko.dataFor(this).isHovering(false);
        }
    });

    $('#dropzone')
            .live('dragover drop', function(e) {
        $(this).addClass('hover');
        e.preventDefault();
    })
            .live('dragexit dragleave', function(e) {
        $(this).removeClass('hover');
        e.preventDefault();
    });

//    lib.files.push(new File());
//    lib.files.push(new File());
//    lib.files.push(new File());

});
