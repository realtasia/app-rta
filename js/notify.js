RT.Trace = {
    VERSION: '0.1.0',
    NOTICE_XML: '<?xml version="1.0" encoding="UTF-8"?><notice><url>http://realtasia.com</url><error><class>EXCEPTION_CLASS</class><message>EXCEPTION_MESSAGE</message><backtrace>BACKTRACE_LINES</backtrace></error><request><url>REQUEST_URL</url><component>REQUEST_COMPONENT</component><action>REQUEST_ACTION</action></request><server-environment><project-root>PROJECT_ROOT</project-root><environment-name>production</environment-name></server-environment></notice>',
    ROOT: window.location.protocol + '//' + window.location.host,
    BACKTRACE_MATCHER: /^(.*)\@(.*)\:(\d+)$/,
    backtrace_filters: [/notifier\.js/],
    notify: function(error) {
        var xml = escape(RT.Trace.generateXML(error)),
                host = 'feedback.jjpc.net',
                url = '//' + host + '/notify/log?data=' + xml,
                request = document.createElement('iframe');

        request.style.width = '1px';
        request.style.height = '1px';
        request.style.display = 'none';
        request.src = url;

        document.getElementsByTagName('head')[0].appendChild(request);
    },
    setEnvironment: function(value) {
        var matcher = /<environment-name>.*<\/environment-name>/;

        return RT.Trace.NOTICE_XML = RT.Trace.NOTICE_XML.replace(matcher,
                '<environment-name>' +
                value +
                '</environment-name>');
    },
    setHost: function(value) {
        return RT.Trace.host = value;
    },
    setKey: function(value) {
        var matcher = /<api-key>.*<\/api-key>/;

        return RT.Trace.NOTICE_XML = RT.Trace.NOTICE_XML.replace(matcher,
                '<api-key>' +
                value +
                '</api-key>');
    },
    setErrorDefaults: function(value) {
        return RT.Trace.errorDefaults = value;
    },
    generateXML: function(errorWithoutDefaults) {
        var error = RT.Trace.mergeDefault(RT.Trace.errorDefaults, errorWithoutDefaults),
                xml = RT.Trace.NOTICE_XML,
                baseUrl = error.url || '',
                hash = location.hash || '',
                url = RT.Trace.escapeText((baseUrl + hash) || ''),
                component = RT.Trace.escapeText(error.component || ''),
                action = RT.Trace.escapeText(error.action || ''),
                errorType = RT.Trace.escapeText(error.type || 'Error'),
                message = RT.Trace.escapeText(error.message || 'Unknown error.'),
                backtrace = RT.Trace.generateBacktrace(error),
                data, cgi_data, i, type, methods;


        if (!RT.Trace.trim(url).length && !RT.Trace.trim(component).length) {
            xml = xml.replace(/<request>.*<\/request>/, '');
        } else {
            data = '';

            cgi_data = error['cgi-data'] || {};
            cgi_data["HTTP_USER_AGENT"] = navigator.userAgent;
            data += '<cgi-data>';
            data += RT.Trace.generateVariables(cgi_data);
            data += '</cgi-data>';

            methods = ['params', 'session'];

            for (i = 0; i < 2; i++) {
                type = methods[i];

                if (error[type]) {
                    data += '<' + type + '>';
                    data += RT.Trace.generateVariables(error[type]);
                    data += '</' + type + '>';
                }
            }

            xml = xml.replace('</request>', data + '</request>')
                    .replace('REQUEST_URL', url)
                    .replace('REQUEST_ACTION', action)
                    .replace('REQUEST_COMPONENT', component);
        }

        return xml.replace('PROJECT_ROOT', RT.Trace.ROOT)
                .replace('EXCEPTION_CLASS', errorType)
                .replace('EXCEPTION_MESSAGE', message)
                .replace('BACKTRACE_LINES', backtrace.join(''));
    },
    generateBacktrace: function(error) {
        error = error || {};

        if (typeof (error.stack).toLowerCase() !== 'string') {
            try {
                (0)();
            } catch (e) {
                error.stack = e.stack;
            }
        }

        var backtrace = [],
                stacktrace = RT.Trace.getStackTrace(error),
                i, line, matches, file;

        for (i = 0, l = stacktrace.length; i < l; i++) {
            line = stacktrace[i];
            matches = line.match(RT.Trace.BACKTRACE_MATCHER);

            if (matches && RT.Trace.validBacktraceLine(line)) {

                file = matches[2].replace(RT.Trace.ROOT, '[PROJECT_ROOT]');
                i === 0 && matches[2].match(document.location.href)
                        && backtrace.push('<line method="" file="internal: " number=""/>');
                backtrace.push('<line method="' + RT.Trace.escapeText(matches[1]) +
                        '" file="' + RT.Trace.escapeText(file) +
                        '" number="' + matches[3] + '" />');
            }
        }

        return backtrace;
    },
    getStackTrace: function(error) {
        var stacktrace = printStackTrace({e: error, guess: false}), i, l;

        for (i = 0, l = stacktrace.length; i < l; i++) {
            if (stacktrace[i].match(/\:\d+$/)) {
                continue;
            }
            stacktrace[i].indexOf('@') === -1 && (stacktrace[i] += '@unsupported.js');
            stacktrace[i] += ':0';
        }

        return stacktrace;
    },
    validBacktraceLine: function(line) {
        for (var i = 0; i < RT.Trace.backtrace_filters.length; i++) {
            if (line.match(RT.Trace.backtrace_filters[i])) {
                return false;
            }
        }
        return true;
    },
    generateVariables: function(parameters) {
        var key, result = '';

        for (key in parameters) {
            result += '<var key="' + RT.Trace.escapeText(key) + '">' +
                    RT.Trace.escapeText(parameters[key]) +
                    '</var>';
        }

        return result;
    },
    escapeText: function(text) {
        return text.replace(/&/g, '&#38;')
                .replace(/</g, '&#60;')
                .replace(/>/g, '&#62;')
                .replace(/'/g, '&#39;')
                .replace(/"/g, '&#34;');
    },
    trim: function(text) {
        return text.toString().replace(/^\s+/, '').replace(/\s+$/, '');
    },
    mergeDefault: function(defaults, hash) {
        var cloned = {}, key;

        for (key in hash) {
            cloned[key] = hash[key];
        }

        for (key in defaults) {
            !cloned.hasOwnProperty(key) && (cloned[key] = defaults[key]);
        }

        return cloned;
    }
};




// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Ã˜yvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)
//
// Information and discussions
// http://jspoker.pokersource.info/skin/test-printstacktrace.html
// http://eriwen.com/javascript/js-stack-trace/
// http://eriwen.com/javascript/stacktrace-update/
// http://pastie.org/253058
//
// guessFunctionNameFromLines comes from firebug
//
// Software License Agreement (BSD License)
//
// Copyright (c) 2007, Parakey Inc.
// All rights reserved.
//
// Redistribution and use of this software in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above
//   copyright notice, this list of conditions and the
//   following disclaimer.
//
// * Redistributions in binary form must reproduce the above
//   copyright notice, this list of conditions and the
//   following disclaimer in the documentation and/or other
//   materials provided with the distribution.
//
// * Neither the name of Parakey Inc. nor the names of its
//   contributors may be used to endorse or promote products
//   derived from this software without specific prior
//   written permission of Parakey Inc.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
// IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
// OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
function printStackTrace(a) {
    a = a || {guess: !0};
    var b = a.e || null;
    a = !!a.guess;
    var d = new printStackTrace.implementation, b = d.run(b);
    return a ? d.guessAnonymousFunctions(b) : b
}
"undefined" !== typeof module && module.exports && (module.exports = printStackTrace);
printStackTrace.implementation = function() {
};
printStackTrace.implementation.prototype = {run: function(a, b) {
        a = a || this.createException();
        b = b || this.mode(a);
        return"other" === b ? this.other(arguments.callee) : this[b](a)
    }, createException: function() {
        try {
            this.undef()
        } catch (a) {
            return a
        }
    }, mode: function(a) {
        return a.arguments && a.stack ? "chrome" : a.stack && a.sourceURL ? "safari" : a.stack && a.number ? "ie" : "string" === typeof a.message && "undefined" !== typeof window && window.opera ? !a.stacktrace || -1 < a.message.indexOf("\n") && a.message.split("\n").length > a.stacktrace.split("\n").length ? "opera9" : !a.stack ? "opera10a" : 0 > a.stacktrace.indexOf("called from line") ? "opera10b" : "opera11" : a.stack ? "firefox" : "other"
    }, instrumentFunction: function(a, b, d) {
        a = a || window;
        var c = a[b];
        a[b] = function() {
            d.call(this, printStackTrace().slice(4));
            return a[b]._instrumented.apply(this, arguments)
        };
        a[b]._instrumented = c
    }, deinstrumentFunction: function(a, b) {
        a[b].constructor === Function && (a[b]._instrumented && a[b]._instrumented.constructor === Function) && (a[b] = a[b]._instrumented)
    }, chrome: function(a) {
        a = (a.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
        a.pop();
        return a
    }, safari: function(a) {
        return a.stack.replace(/\[native code\]\n/m, "").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n")
    }, ie: function(a) {
        return a.stack.replace(/at Anonymous function /gm, "{anonymous}()@").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^.*at (\w+) \(([^\)]+)\)$/gm, "$1@$2").split("\n")
    }, firefox: function(a) {
        return a.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^[\(@]/gm, "{anonymous}()@").split("\n")
    }, opera11: function(a) {
        var b = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
        a = a.stacktrace.split("\n");
        for (var d = [], c = 0, f = a.length; c < f; c += 2) {
            var e = b.exec(a[c]);
            if (e) {
                var g = e[4] + ":" + e[1] + ":" + e[2], e = e[3] || "global code", e = e.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, "{anonymous}");
                d.push(e + "@" + g + " -- " + a[c + 1].replace(/^\s+/, ""))
            }
        }
        return d
    }, opera10b: function(a) {
        var b = /^(.*)@(.+):(\d+)$/;
        a = a.stacktrace.split("\n");
        for (var d = [], c = 0, f = a.length; c < f; c++) {
            var e = b.exec(a[c]);
            e && d.push((e[1] ? e[1] + "()" : "global code") + "@" + e[2] + ":" + e[3])
        }
        return d
    }, opera10a: function(a) {
        var b = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        a = a.stacktrace.split("\n");
        for (var d = [], c = 0, f = a.length; c < f; c += 2) {
            var e = b.exec(a[c]);
            e && d.push((e[3] || "{anonymous}") + "()@" + e[2] + ":" + e[1] + " -- " + a[c + 1].replace(/^\s+/, ""))
        }
        return d
    }, opera9: function(a) {
        var b = /Line (\d+).*script (?:in )?(\S+)/i;
        a = a.message.split("\n");
        for (var d = [], c = 2, f = a.length; c < f; c += 2) {
            var e = b.exec(a[c]);
            e && d.push("{anonymous}()@" + e[2] + ":" + e[1] + " -- " + a[c + 1].replace(/^\s+/, ""))
        }
        return d
    }, other: function(a) {
        for (var b = /function\s*([\w\-$]+)?\s*\(/i, d = [], c, f; a && a.arguments && 10 > d.length; )
            c = b.test(a.toString()) ? RegExp.$1 || "{anonymous}" : "{anonymous}", f = Array.prototype.slice.call(a.arguments || []), d[d.length] = c + "(" + this.stringifyArguments(f) + ")", a = a.caller;
        return d
    }, stringifyArguments: function(a) {
        for (var b = [], d = Array.prototype.slice, c = 0; c < a.length; ++c) {
            var f = a[c];
            void 0 === f ? b[c] = "undefined" : null === f ? b[c] = "null" : f.constructor && (f.constructor === Array ? b[c] = 3 > f.length ? "[" + this.stringifyArguments(f) + "]" : "[" + this.stringifyArguments(d.call(f, 0, 1)) + "..." + this.stringifyArguments(d.call(f, -1)) + "]" : f.constructor === Object ? b[c] = "#object" : f.constructor === Function ? b[c] = "#function" : f.constructor === String ? b[c] = '"' + f + '"' : f.constructor === Number && (b[c] = f))
        }
        return b.join(",")
    }, sourceCache: {}, ajax: function(a) {
        var b = this.createXMLHTTPObject();
        if (b)
            try {
                return b.open("GET", a, !1), b.send(null), b.responseText
            } catch (d) {
            }
        return""
    }, createXMLHTTPObject: function() {
        for (var a, b = [function() {
                return new XMLHttpRequest
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }], d = 0; d < b.length; d++)
            try {
                return a = b[d](), this.createXMLHTTPObject = b[d], a
            } catch (c) {
            }
    }, isSameDomain: function(a) {
        return"undefined" !== typeof location && -1 !== a.indexOf(location.hostname)
    }, getSource: function(a) {
        a in this.sourceCache || (this.sourceCache[a] = this.ajax(a).split("\n"));
        return this.sourceCache[a]
    }, guessAnonymousFunctions: function(a) {
        for (var b = 0; b < a.length; ++b) {
            var d = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/, c = a[b], f = /\{anonymous\}\(.*\)@(.*)/.exec(c);
            if (f) {
                var e = d.exec(f[1]);
                e && (d = e[1], f = e[2], e = e[3] || 0, d && (this.isSameDomain(d) && f) && (d = this.guessAnonymousFunction(d, f, e), a[b] = c.replace("{anonymous}", d)))
            }
        }
        return a
    }, guessAnonymousFunction: function(a, b) {
        var d;
        try {
            d = this.findFunctionName(this.getSource(a), b)
        } catch (c) {
            d = "getSource failed with url: " + a + ", exception: " + c.toString()
        }
        return d
    }, findFunctionName: function(a, b) {
        for (var d = /function\s+([^(]*?)\s*\(([^)]*)\)/, c = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, f = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, e = "", g, k = Math.min(b, 20), h, j = 0; j < k; ++j)
            if (g = a[b - j - 1], h = g.indexOf("//"), 0 <= h && (g = g.substr(0, h)), g)
                if (e = g + e, (g = c.exec(e)) && g[1] || (g = d.exec(e)) && g[1] || (g = f.exec(e)) && g[1])
                    return g[1];
        return"(?)"
    }};
