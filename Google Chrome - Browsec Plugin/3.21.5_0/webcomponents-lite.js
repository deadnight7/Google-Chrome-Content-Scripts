(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.7.19

/** @type {Object} */
var _browser = typeof browser !== 'undefined' ? browser : chrome;

/** @type {Object} */
var door = _browser.extension.getBackgroundPage();

/**
@function
@param {*} arrayLikeThing
@return {Array}*/
var toArray = function toArray(arrayLikeThing) {
  return Array.from ? Array.from(arrayLikeThing) : [].slice.call(arrayLikeThing);
};

(function () {
  window.WebComponents = window.WebComponents || { 'flags': {} };
  var file = 'webcomponents-lite.js';
  var script = document.querySelector('script[src*="' + file + '"]');
  var flags = {};
  if (!flags.noOpts) {
    location.search.slice(1).split('&').forEach(function (option) {
      var parts = option.split('=');
      var match;
      if (parts[0] && (match = parts[0].match(/wc-(.+)/))) {
        flags[match[1]] = parts[1] || true;
      }
    });
    if (script) {
      for (var i = 0; i < script.attributes.length; i++) {
        var _script$attributes$i = script.attributes[i],
            name = _script$attributes$i.name,
            value = _script$attributes$i.value;

        if (name !== 'src') flags[name] = value || true;
      }
    }
    if (flags.log && flags.log.split) {
      var parts = flags.log.split(',');
      flags.log = {};
      parts.forEach(function (f) {
        flags.log[f] = true;
      });
    } else flags.log = {};
  }
  if (flags.register) {
    window.CustomElements = window.CustomElements || { 'flags': {} };
    window.CustomElements.flags.register = flags.register;
  }
  window.WebComponents.flags = flags;
})();

(function (scope) {
  var hasWorkingUrl = false;
  if (!scope.forceJURL) {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      hasWorkingUrl = u.href === 'http://a/c%20d';
    } catch (e) {}
  }
  if (hasWorkingUrl) return;
  var relative = Object.create(null);
  relative['ftp'] = 21;
  relative['file'] = 0;
  relative['gopher'] = 70;
  relative['http'] = 80;
  relative['https'] = 443;
  relative['ws'] = 80;
  relative['wss'] = 443;

  var relativePathDotMapping = Object.create(null);
  relativePathDotMapping['%2e'] = '.';
  relativePathDotMapping['.%2e'] = '..';
  relativePathDotMapping['%2e.'] = '..';
  relativePathDotMapping['%2e%2e'] = '..';

  function isRelativeScheme(scheme) {
    return relative[scheme] !== undefined;
  }

  function invalid() {
    clear.call(this);
    this._isInvalid = true;
  }

  function IDNAToASCII(h) {
    if (h == '') invalid.call(this); // eslint-disable-line eqeqeq
    return h.toLowerCase();
  }

  function percentEscape(c) {
    var unicode = c.charCodeAt(0);
    if (unicode > 32 && unicode < 127 && [34, 35, 60, 62, 63, 96].indexOf(unicode) === -1) {
      return c;
    }
    return encodeURIComponent(c);
  }

  function percentEscapeQuery(c) {
    var unicode = c.charCodeAt(0);
    if (unicode > 32 && unicode < 127 && [34, 35, 60, 62, 96].indexOf(unicode) === -1) {
      return c;
    }
    return encodeURIComponent(c);
  }

  var ALPHA = /[a-zA-Z]/;
  var ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;

  function parse(input, stateOverride, base) {
    function err(message) {
      errors.push(message);
    }
    var state = stateOverride || 'scheme start';
    var cursor = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var errors = [];

    loop: while ((input[cursor - 1] != undefined || cursor === 0) && !this._isInvalid) {
      // eslint-disable-line no-labels, eqeqeq
      var c = input[cursor];
      switch (state) {
        case 'scheme start':
          if (c && ALPHA.test(c)) {
            buffer += c.toLowerCase();
            state = 'scheme';
          } else if (!stateOverride) {
            buffer = '';
            state = 'no scheme';
            continue;
          } else {
            err('Invalid scheme.');
            break loop; // eslint-disable-line no-labels
          }
          break;

        case 'scheme':
          if (c && ALPHANUMERIC.test(c)) {
            buffer += c.toLowerCase();
          } else if (c == ':') {
            // eslint-disable-line eqeqeq
            this._scheme = buffer;
            buffer = '';
            if (stateOverride) {
              break loop; // eslint-disable-line no-labels
            }
            if (isRelativeScheme(this._scheme)) {
              this._isRelative = true;
            }
            if (this._scheme === 'file') {
              state = 'relative';
            } else if (this._isRelative && base && base._scheme == this._scheme) {
              // eslint-disable-line eqeqeq
              state = 'relative or authority';
            } else if (this._isRelative) {
              state = 'authority first slash';
            } else {
              state = 'scheme data';
            }
          } else if (!stateOverride) {
            buffer = '';
            cursor = 0;
            state = 'no scheme';
            continue;
          } else if (undefined == c) {
            // eslint-disable-line eqeqeq
            break loop; // eslint-disable-line no-labels
          } else {
            err('Code point not allowed in scheme: ' + c);
            break loop; // eslint-disable-line no-labels
          }
          break;

        case 'scheme data':
          if (c === '?') {
            this._query = '?';
            state = 'query';
          } else if (c === '#') {
            this._fragment = '#';
            state = 'fragment';
          } else {
            if (undefined != c && c !== '	' && c !== '\n' && c !== '\r') {
              // eslint-disable-line eqeqeq, no-tabs
              this._schemeData += percentEscape(c);
            }
          }
          break;

        case 'no scheme':
          if (!base || !isRelativeScheme(base._scheme)) {
            err('Missing scheme.');
            invalid.call(this);
          } else {
            state = 'relative';
            continue;
          }
          break;

        case 'relative or authority':
          if (c === '/' && input[cursor + 1] === '/') {
            state = 'authority ignore slashes';
          } else {
            err('Expected /, got: ' + c);
            state = 'relative';
            continue;
          }
          break;

        case 'relative':
          this._isRelative = true;
          if (this._scheme !== 'file') this._scheme = base._scheme;
          if (undefined == c) {
            // eslint-disable-line eqeqeq
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._username = base._username;
            this._password = base._password;
            break loop; // eslint-disable-line no-labels
          } else if (c === '/' || c === '\\') {
            if (c === '\\') err('\\ is an invalid code point.');
            state = 'relative slash';
          } else if (c === '?') {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = '?';
            this._username = base._username;
            this._password = base._password;
            state = 'query';
          } else if (c === '#') {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._fragment = '#';
            this._username = base._username;
            this._password = base._password;
            state = 'fragment';
          } else {
            var nextC = input[cursor + 1];
            var nextNextC = input[cursor + 2];
            var condition = this._scheme !== 'file' || !ALPHA.test(c) || nextC !== ':' && nextC !== '|' || undefined != nextNextC && nextNextC !== '/' && nextNextC !== '\\' && // eslint-disable-line eqeqeq
            nextNextC !== '?' && nextNextC !== '#';
            if (condition) {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
              this._path = base._path.slice();
              this._path.pop();
            }
            state = 'relative path';
            continue;
          }
          break;

        case 'relative slash':
          if (c === '/' || c === '\\') {
            if (c === '\\') {
              err('\\ is an invalid code point.');
            }
            if (this._scheme === 'file') {
              state = 'file host';
            } else {
              state = 'authority ignore slashes';
            }
          } else {
            if (this._scheme !== 'file') {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
            }
            state = 'relative path';
            continue;
          }
          break;

        case 'authority first slash':
          if (c === '/') {
            state = 'authority second slash';
          } else {
            err("Expected '/', got: " + c);
            state = 'authority ignore slashes';
            continue;
          }
          break;

        case 'authority second slash':
          state = 'authority ignore slashes';
          if (c !== '/') {
            err("Expected '/', got: " + c);
            continue;
          }
          break;

        case 'authority ignore slashes':
          if (c !== '/' && c !== '\\') {
            state = 'authority';
            continue;
          } else {
            err('Expected authority, got: ' + c);
          }
          break;

        case 'authority':
          if (c === '@') {
            if (seenAt) {
              err('@ already seen.');
              buffer += '%40';
            }
            seenAt = true;
            for (var i = 0; i < buffer.length; i++) {
              var cp = buffer[i];
              if (cp === '	' || cp === '\n' || cp === '\r') {
                // eslint-disable-line no-tabs
                err('Invalid whitespace in authority.');
                continue;
              }
              if (cp === ':' && this._password === null) {
                this._password = '';
                continue;
              }
              var tempC = percentEscape(cp);
              this._password !== null ? this._password += tempC : this._username += tempC;
            }
            buffer = '';
          } else if (undefined == c || c === '/' || c === '\\' || c === '?' || c === '#') {
            // eslint-disable-line eqeqeq
            cursor -= buffer.length;
            buffer = '';
            state = 'host';
            continue;
          } else {
            buffer += c;
          }
          break;

        case 'file host':
          if (undefined == c || c === '/' || c === '\\' || c === '?' || c === '#') {
            // eslint-disable-line eqeqeq
            if (buffer.length === 2 && ALPHA.test(buffer[0]) && (buffer[1] === ':' || buffer[1] === '|')) {
              state = 'relative path';
            } else if (buffer.length === 0) {
              state = 'relative path start';
            } else {
              this._host = IDNAToASCII.call(this, buffer);
              buffer = '';
              state = 'relative path start';
            }
            continue;
          } else if (c === '	' || c === '\n' || c === '\r') {
            // eslint-disable-line no-tabs
            err('Invalid whitespace in file host.');
          } else {
            buffer += c;
          }
          break;

        case 'host':
        case 'hostname':
          if (c === ':' && !seenBracket) {
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'port';
            if (stateOverride === 'hostname') {
              break loop; // eslint-disable-line no-labels
            }
          } else if (undefined == c || c === '/' || c === '\\' || c === '?' || c === '#') {
            // eslint-disable-line eqeqeq
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'relative path start';
            if (stateOverride) {
              break loop; // eslint-disable-line no-labels
            }
            continue;
          } else if (c !== '	' && c !== '\n' && c !== '\r') {
            // eslint-disable-line no-tabs
            if (c === '[') {
              seenBracket = true;
            } else if (c === ']') {
              seenBracket = false;
            }
            buffer += c;
          } else {
            err('Invalid code point in host/hostname: ' + c);
          }
          break;

        case 'port':
          if (/[0-9]/.test(c)) buffer += c;else if (undefined == c || c === '/' || c === '\\' || c === '?' || c === '#' || stateOverride) {
            // eslint-disable-line eqeqeq
            if (buffer != '') {
              // eslint-disable-line eqeqeq
              var temp = parseInt(buffer, 10);
              if (temp != relative[this._scheme]) {
                // eslint-disable-line eqeqeq
                this._port = temp + '';
              }
              buffer = '';
            }
            if (stateOverride) {
              break loop; // eslint-disable-line no-labels
            }
            state = 'relative path start';
            continue;
          } else if (c === '	' || c === '\n' || c === '\r') {
            // eslint-disable-line no-tabs
            err('Invalid code point in port: ' + c);
          } else {
            invalid.call(this);
          }
          break;

        case 'relative path start':
          if (c === '\\') err("'\\' not allowed in path.");
          state = 'relative path';
          if (c !== '/' && c !== '\\') {
            continue;
          }
          break;

        case 'relative path':
          if (undefined == c || c === '/' || c === '\\' || !stateOverride && (c === '?' || c === '#')) {
            // eslint-disable-line eqeqeq
            if (c === '\\') {
              err('\\ not allowed in relative path.');
            }
            var tmp = relativePathDotMapping[buffer.toLowerCase()];

            if (tmp) buffer = tmp;
            if (buffer === '..') {
              this._path.pop();
              if (c !== '/' && c !== '\\') {
                this._path.push('');
              }
            } else if (buffer === '.' && c !== '/' && c !== '\\') {
              this._path.push('');
            } else if (buffer !== '.') {
              if (this._scheme === 'file' && this._path.length === 0 && buffer.length === 2 && ALPHA.test(buffer[0]) && buffer[1] === '|') {
                buffer = buffer[0] + ':';
              }
              this._path.push(buffer);
            }
            buffer = '';
            if (c === '?') {
              this._query = '?';
              state = 'query';
            } else if (c === '#') {
              this._fragment = '#';
              state = 'fragment';
            }
          } else if (c !== '	' && c !== '\n' && c !== '\r') {
            // eslint-disable-line no-tabs
            buffer += percentEscape(c);
          }
          break;

        case 'query':
          if (!stateOverride && c === '#') {
            this._fragment = '#';
            state = 'fragment';
          } else if (undefined != c && c !== '	' && c !== '\n' && c !== '\r') {
            // eslint-disable-line eqeqeq, no-tabs
            this._query += percentEscapeQuery(c);
          }
          break;

        case 'fragment':
          if (undefined != c && c !== '	' && c !== '\n' && c !== '\r') {
            // eslint-disable-line eqeqeq, no-tabs
            this._fragment += c;
          }
          break;
      }
      cursor++;
    }
  }
  function clear() {
    this._scheme = '';
    this._schemeData = '';
    this._username = '';
    this._password = null;
    this._host = '';
    this._port = '';
    this._path = [];
    this._query = '';
    this._fragment = '';
    this._isInvalid = false;
    this._isRelative = false;
  }
  function jURL(url, base) {
    if (base !== undefined && !(base instanceof jURL)) {
      base = new jURL(String(base)); // eslint-disable-line new-cap
    }
    this._url = url;
    clear.call(this);
    var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
    parse.call(this, input, null, base);
  }
  jURL.prototype = {
    'toString': function toString() {
      return this.href;
    },
    get 'href'() {
      if (this._isInvalid) return this._url;
      var authority = '';
      if (this._username != '' || this._password != null) {
        // eslint-disable-line eqeqeq
        authority = this._username + (this._password != null ? ':' + this._password : '') + '@';
      }
      return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
    },
    set 'href'(href) {
      clear.call(this);
      parse.call(this, href);
    },
    get 'protocol'() {
      return this._scheme + ':';
    },
    set 'protocol'(protocol) {
      if (this._isInvalid) return;
      parse.call(this, protocol + ':', 'scheme start');
    },
    get 'host'() {
      return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
    },
    set 'host'(host) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, host, 'host');
    },
    get 'hostname'() {
      return this._host;
    },
    set 'hostname'(hostname) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, hostname, 'hostname');
    },
    get 'port'() {
      return this._port;
    },
    set 'port'(port) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, port, 'port');
    },
    get 'pathname'() {
      return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
    },
    set 'pathname'(pathname) {
      if (this._isInvalid || !this._isRelative) return;
      this._path = [];
      parse.call(this, pathname, 'relative path start');
    },
    get 'search'() {
      return this._isInvalid || !this._query || this._query === '?' ? '' : this._query;
    },
    set 'search'(search) {
      if (this._isInvalid || !this._isRelative) return;
      this._query = '?';
      if (search[0] === '?') search = search.slice(1);
      parse.call(this, search, 'query');
    },
    get 'hash'() {
      return this._isInvalid || !this._fragment || this._fragment === '#' ? '' : this._fragment;
    },
    set 'hash'(hash) {
      if (this._isInvalid) return;
      this._fragment = '#';
      if (hash[0] === '#') hash = hash.slice(1);
      parse.call(this, hash, 'fragment');
    },
    get 'origin'() {
      var host;
      if (this._isInvalid || !this._scheme) {
        return '';
      }
      switch (this._scheme) {
        case 'data':
        case 'file':
        case 'javascript':
        case 'mailto':
          return 'null';
      }
      host = this.host;
      if (!host) {
        return '';
      }
      return this._scheme + '://' + host;
    }
  };
  var OriginalURL = scope.URL;
  if (OriginalURL) {
    jURL.createObjectURL = function (blob) {
      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
    };
    jURL.revokeObjectURL = function (url) {
      OriginalURL.revokeObjectURL(url);
    };
  }
  scope.URL = jURL;
})(self);

if (typeof WeakMap === 'undefined') {
  (function () {
    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;
    var WeakMap = function WeakMap() {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
    };
    WeakMap.prototype = {
      'set': function set(key, value) {
        var entry = key[this.name];
        if (entry && entry[0] === key) entry[1] = value;else {
          defineProperty(key, this.name, {
            'value': [key, value],
            'writable': true
          });
        }
        return this;
      },
      'get': function get(key) {
        var entry;
        return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
      },
      'delete': function _delete(key) {
        var entry = key[this.name];
        if (!entry || entry[0] !== key) return false;
        entry[0] = entry[1] = undefined;
        return true;
      },
      'has': function has(key) {
        var entry = key[this.name];
        if (!entry) return false;
        return entry[0] === key;
      }
    };
    window.WeakMap = WeakMap;
  })();
}

(function (global) {
  if (global.JsMutationObserver) {
    return;
  }
  var registrationsTable = new WeakMap();
  var setImmediate;
  if (/Trident|Edge/.test(navigator.userAgent)) {
    setImmediate = setTimeout;
  } else if (window.setImmediate) {
    setImmediate = window.setImmediate;
  } else {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener('message', function (e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function (func) {
          func();
        });
      }
    });
    setImmediate = function setImmediate(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, '*');
    };
  }
  var isScheduled = false;
  var scheduledObservers = [];
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }
  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
  }
  function dispatchCallbacks() {
    isScheduled = false;
    var observers = scheduledObservers;
    scheduledObservers = [];
    observers.sort(function (o1, o2) {
      return o1.uid_ - o2.uid_;
    });
    var anyNonEmpty = false;
    observers.forEach(function (observer) {
      var queue = observer.takeRecords();
      removeTransientObserversFor(observer);
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });
    if (anyNonEmpty) dispatchCallbacks();
  }
  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function (node) {
      var registrations = registrationsTable.get(node);
      if (!registrations) return;
      registrations.forEach(function (registration) {
        if (registration.observer === observer) registration.removeTransientObservers();
      });
    });
  }
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);
      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;
          if (node !== target && !options.subtree) continue;
          var record = callback(options);
          if (record) registration.enqueue(record);
        }
      }
    }
  }
  var uidCounter = 0;
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }
  JsMutationObserver.prototype = {
    'observe': function observe(target, options) {
      target = wrapIfNeeded(target);
      var condition = !options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData;
      if (condition) throw new SyntaxError();

      var registrations = registrationsTable.get(target);
      if (!registrations) registrationsTable.set(target, registrations = []);
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }
      registration.addListeners();
    },
    'disconnect': function disconnect() {
      this.nodes_.forEach(function (node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
      this.records_ = [];
    },
    'takeRecords': function takeRecords() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }
  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  }
  var currentRecord, recordWithOldValue;
  function getRecord(type, target) {
    currentRecord = new MutationRecord(type, target);
    return currentRecord;
  }
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue) return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }
  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord) return lastRecord;
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
    return null;
  }
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }
  Registration.prototype = {
    'enqueue': function enqueue(record) {
      var records = this.observer.records_;
      var length = records.length;
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }
      records[length] = record;
    },
    'addListeners': function addListeners() {
      this.addListeners_(this.target);
    },
    'addListeners_': function addListeners_(node) {
      var options = this.options;
      if (options.attributes) node.addEventListener('DOMAttrModified', this, true);
      if (options.characterData) node.addEventListener('DOMCharacterDataModified', this, true);
      if (options.childList) node.addEventListener('DOMNodeInserted', this, true);
      if (options.childList || options.subtree) node.addEventListener('DOMNodeRemoved', this, true);
    },
    'removeListeners': function removeListeners() {
      this.removeListeners_(this.target);
    },
    'removeListeners_': function removeListeners_(node) {
      var options = this.options;
      if (options.attributes) node.removeEventListener('DOMAttrModified', this, true);
      if (options.characterData) node.removeEventListener('DOMCharacterDataModified', this, true);
      if (options.childList) node.removeEventListener('DOMNodeInserted', this, true);
      if (options.childList || options.subtree) node.removeEventListener('DOMNodeRemoved', this, true);
    },
    'addTransientObserver': function addTransientObserver(node) {
      if (node === this.target) return;
      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations) registrationsTable.set(node, registrations = []);
      registrations.push(this);
    },
    'removeTransientObservers': function removeTransientObservers() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];
      transientObservedNodes.forEach(function (node) {
        this.removeListeners_(node);
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
    },
    'handleEvent': function handleEvent(e) {
      e.stopImmediatePropagation();
      switch (e.type) {
        case 'DOMAttrModified':
          var name = e.attrName;
          var namespace = e.relatedNode.namespaceURI;
          var target = e.target;
          var record = new getRecord('attributes', target); // eslint-disable-line new-cap
          record.attributeName = name;
          record.attributeNamespace = namespace;
          var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function (options) {
            if (!options.attributes) return;
            var condition = options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1;
            if (condition) return;

            if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
            return record;
          });
          break;

        case 'DOMCharacterDataModified':
          {
            var _target = e.target;
            var _record = getRecord('characterData', _target);
            var _oldValue = e.prevValue;
            forEachAncestorAndObserverEnqueueRecord(_target, function (options) {
              if (!options.characterData) return;
              if (options.characterDataOldValue) return getRecordWithOldValue(_oldValue);
              return _record;
            });
            break;
          }

        case 'DOMNodeRemoved':
          this.addTransientObserver(e.target);

        case 'DOMNodeInserted':
          {
            // eslint-disable-line no-fallthrough
            var changedNode = e.target;
            var addedNodes = void 0,
                removedNodes = void 0;
            if (e.type === 'DOMNodeInserted') {
              addedNodes = [changedNode];
              removedNodes = [];
            } else {
              addedNodes = [];
              removedNodes = [changedNode];
            }
            var previousSibling = changedNode.previousSibling;
            var nextSibling = changedNode.nextSibling;
            var _record2 = getRecord('childList', e.target.parentNode);
            _record2.addedNodes = addedNodes;
            _record2.removedNodes = removedNodes;
            _record2.previousSibling = previousSibling;
            _record2.nextSibling = nextSibling;
            forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function (options) {
              if (!options.childList) return;
              return _record2;
            });
          }
      }
      clearRecords();
    }
  };
  global.JsMutationObserver = JsMutationObserver;
  if (!global.MutationObserver) {
    global.MutationObserver = JsMutationObserver;
    JsMutationObserver._isPolyfilled = true;
  }
})(self);

if (typeof HTMLTemplateElement === 'undefined') {
  (function () {
    var TEMPLATE_TAG = 'template';
    var contentDoc = document.implementation.createHTMLDocument('template');
    var canDecorate = true;
    HTMLTemplateElement = function HTMLTemplateElement() {}; // eslint-disable-line no-global-assign
    HTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);
    HTMLTemplateElement.decorate = function (template) {
      if (template.content) {
        return;
      }
      template.content = contentDoc.createDocumentFragment();
      var child;
      while (child = template.firstChild) {
        template.content.appendChild(child);
      }
      if (canDecorate) {
        try {
          Object.defineProperty(template, 'innerHTML', {
            'get': function get() {
              var o = '';
              for (var e = this.content.firstChild; e; e = e.nextSibling) {
                o += e.outerHTML || escapeData(e.data);
              }
              return o;
            },
            'set': function set(text) {
              contentDoc.body.innerHTML = text;
              HTMLTemplateElement.bootstrap(contentDoc);
              while (this.content.firstChild) {
                this.content.removeChild(this.content.firstChild);
              }
              while (contentDoc.body.firstChild) {
                this.content.appendChild(contentDoc.body.firstChild);
              }
            },
            'configurable': true
          });
        } catch (err) {
          canDecorate = false;
        }
      }
      HTMLTemplateElement.bootstrap(template.content);
    };
    HTMLTemplateElement.bootstrap = function (doc) {
      var templates = doc.querySelectorAll(TEMPLATE_TAG);
      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        HTMLTemplateElement.decorate(t);
      }
    };
    document.addEventListener('DOMContentLoaded', function () {
      HTMLTemplateElement.bootstrap(document);
    });
    var createElement = document.createElement;
    document.createElement = function () {
      'use strict';

      var el = createElement.apply(document, arguments);
      if (el.localName === 'template') {
        HTMLTemplateElement.decorate(el);
      }
      return el;
    };
    var escapeDataRegExp = /[&\u00A0<>]/g;
    function escapeReplace(c) {
      switch (c) {
        case '&':
          return '&amp;';

        case '<':
          return '&lt;';

        case '>':
          return '&gt;';

        case ' ':
          return '&nbsp;';
      }
    }
    function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    }
  })();
}

(function (scope) {
  'use strict';

  if (!window.performance) {
    var start = Date.now();
    window.performance = {
      'now': function now() {
        return Date.now() - start;
      }
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function () {
      return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
        clearTimeout(id);
      };
    }();
  }
  var workingDefaultPrevented = function () {
    var e = document.createEvent('Event');
    e.initEvent('foo', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();
  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function () {
      if (!this.cancelable) return;

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        'get': function get() {
          return true;
        },
        'configurable': true
      });
    };
  }

  if (!window.CustomEvent) {
    window.CustomEvent = function (inType, params) {
      params = params || {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
      return e;
    };
    window.CustomEvent.prototype = window.Event.prototype;
  }
  if (!window.Event) {
    var origEvent = window.Event;
    window.Event = function (inType, params) {
      params = params || {};
      var e = document.createEvent('Event');
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
      return e;
    };
    window.Event.prototype = origEvent.prototype;
  }
})(window.WebComponents);

window.HTMLImports = window.HTMLImports || {
  'flags': {}
};

(function () {
  var scope = window.HTMLImports;
  var IMPORT_LINK_TYPE = 'import';
  var useNative = Boolean(IMPORT_LINK_TYPE in document.createElement('link'));
  var hasShadowDOMPolyfill = Boolean(window.ShadowDOMPolyfill);

  /** @function */
  var wrap = function wrap(node) {
    return hasShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(node) : node;
  };
  var rootDocument = wrap(document);
  var currentScriptDescriptor = {
    'get': function get() {
      var script = window.HTMLImports.currentScript || document.currentScript || (document.readyState !== 'complete' ? document.scripts[document.scripts.length - 1] : null);
      return wrap(script);
    },
    'configurable': true
  };
  Object.defineProperty(document, '_currentScript', currentScriptDescriptor);
  Object.defineProperty(rootDocument, '_currentScript', currentScriptDescriptor);

  var whenReady = function whenReady(callback) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rootDocument;

    whenDocumentReady(function () {
      watchImportsLoad(callback, doc);
    }, doc);
  };

  /**
  @function
  @param doc
  @return {Boolean} */
  var isDocumentReady = function isDocumentReady(doc) {
    return doc.readyState === 'complete' || doc.readyState === 'interactive';
  };

  /**
  @function */
  function whenDocumentReady(callback, doc) {
    if (isDocumentReady(doc)) {
      if (callback) callback();
      return;
    }

    /** @function */
    var checkReady = function checkReady() {
      if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
        doc.removeEventListener('readystatechange', checkReady);
        whenDocumentReady(callback, doc);
      }
    };
    doc.addEventListener('readystatechange', checkReady);
  }

  /**
  @function
  @param {Object} event */
  var markTargetLoaded = function markTargetLoaded(event) {
    event.target.__loaded = true;
  };

  /** @function */
  function watchImportsLoad(callback, doc) {
    var imports = doc.querySelectorAll('link[rel=import]');
    var parsedCount = 0;
    var importCount = imports.length;
    var newImports = [];
    var errorImports = [];

    /** @function */
    var checkDone = function checkDone() {
      if (parsedCount !== importCount || !callback) return;

      callback({ // eslint-disable-line standard/no-callback-literal
        'allImports': imports,
        'loadedImports': newImports,
        'errorImports': errorImports
      });
    };

    /** @function */
    var loadedImport = function loadedImport(e) {
      markTargetLoaded(e);
      newImports.push(this);
      parsedCount++;
      checkDone();
    };

    /** @function */
    var errorLoadingImport = function errorLoadingImport(e) {
      errorImports.push(this);
      parsedCount++;
      checkDone();
    };

    if (!importCount) {
      checkDone();return;
    }

    Array(importCount).join().split(',').forEach(function (x, index) {
      var imp = imports[index];

      if (!isImportLoaded(imp)) {
        imp.addEventListener('load', loadedImport);
        imp.addEventListener('error', errorLoadingImport);
        return;
      }

      parsedCount++;
      checkDone();
    });
  };

  function isImportLoaded(link) {
    return useNative ? link.__loaded || link.import && link.import.readyState !== 'loading' : link.__importParsed;
  }
  if (useNative) {
    var handleImports = function handleImports(nodes) {
      // eslint-disable-line no-inner-declarations
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        if (isImport(n)) handleImport(n);
      }
    };

    var isImport = function isImport(element) {
      // eslint-disable-line no-inner-declarations
      return element.localName === 'link' && element.rel === 'import';
    };

    var handleImport = function handleImport(element) {
      // eslint-disable-line no-inner-declarations
      var loaded = element.import;
      if (loaded) markTargetLoaded({ 'target': element });else {
        element.addEventListener('load', markTargetLoaded);
        element.addEventListener('error', markTargetLoaded);
      }
    };

    new MutationObserver(function (mxns) {
      for (var i = 0, l = mxns.length, m; i < l && (m = mxns[i]); i++) {
        if (m.addedNodes) handleImports(m.addedNodes);
      }
    }).observe(document.head, {
      'childList': true
    });

    if (document.readyState === 'loading') {
      /** @type {Array<Element>} */
      var imports = toArray(document.querySelectorAll('link[rel=import]'));
      imports.forEach(function (imp) {
        handleImport(imp);
      });
    }
  }
  whenReady(function (detail) {
    window.HTMLImports.ready = true;
    window.HTMLImports.readyTime = new Date().getTime();

    var event = rootDocument.createEvent('CustomEvent');
    event.initCustomEvent('HTMLImportsLoaded', true, true, detail);
    rootDocument.dispatchEvent(event);
  });
  scope.IMPORT_LINK_TYPE = IMPORT_LINK_TYPE;
  scope.useNative = useNative;
  scope.rootDocument = rootDocument;
  scope.whenReady = whenReady;
})();

(function () {
  var scope = window.HTMLImports;

  /** @type {Array<Function>} */
  var modules = [];

  /**
  @method
  @param {Function} module
  @return {undefined} */
  scope.addModule = function (module) {
    modules.push(module);
  };

  /** @method */
  scope.initializeModules = function () {
    modules.forEach(function (module) {
      module(scope);
    });
  };
})();

window.HTMLImports.addModule(function (scope) {
  var CSS_URL_REGEXP = /(url\()([^)]*)(\))/g;
  var CSS_IMPORT_REGEXP = /(@import[\s]+(?!url\())([^;]*)(;)/g;
  var path = {
    'resolveUrlsInStyle': function resolveUrlsInStyle(style, linkUrl) {
      var doc = style.ownerDocument;
      var resolver = doc.createElement('a');
      style.textContent = this.resolveUrlsInCssText(style.textContent, linkUrl, resolver);
      return style;
    },
    'resolveUrlsInCssText': function resolveUrlsInCssText(cssText, linkUrl, urlObj) {
      var r = this.replaceUrls(cssText, urlObj, linkUrl, CSS_URL_REGEXP);
      r = this.replaceUrls(r, urlObj, linkUrl, CSS_IMPORT_REGEXP);
      return r;
    },
    'replaceUrls': function replaceUrls(text, urlObj, linkUrl, regexp) {
      return text.replace(regexp, function (m, pre, url, post) {
        var urlPath = url.replace(/["']/g, '');
        if (linkUrl) {
          urlPath = new URL(urlPath, linkUrl).href;
        }
        urlObj.href = urlPath;
        urlPath = urlObj.href;
        return pre + "'" + urlPath + "'" + post;
      });
    }
  };
  scope.path = path;
});

window.HTMLImports.addModule(function (scope) {
  var xhr = {
    'async': true,

    /**
    @method
    @param {Object} request
    @param {integer} request.status
    @return {Boolean} */
    'ok': function ok(_ref) {
      var status = _ref.status;
      return status >= 200 && status < 300 || status === 304 || status === 0;
    },

    /**
    @method
    @param {*} url
    @param {Function} next
    @param {*} nextContext */
    load: function load(url, next, nextContext) {
      // Firefox
      if (typeof browser !== 'undefined') {
        var urls = Object.keys(door.htmlImports);
        var text = door.htmlImports[urls.find(function (ownUrl) {
          return url.endsWith(ownUrl);
        })];

        if (text) {
          // If file text exist
          next.call(nextContext, false, text, null);
          return;
        }
      }

      // Very old Chrome
      var request = new XMLHttpRequest();
      if (scope.flags.debug || scope.flags.bust) url += '?' + Math.random();

      request.open('GET', url, xhr.async);
      request.addEventListener('readystatechange', function (e) {
        if (request.readyState !== 4) return;

        var redirectedUrl = null;
        try {
          var locationHeader = request.getResponseHeader('Location');
          if (locationHeader) {
            redirectedUrl = locationHeader.substr(0, 1) === '/' ? location.origin + locationHeader : locationHeader;
          }
        } catch (e) {
          console.error(e.message);
        }
        next.call(nextContext, !xhr.ok(request) && request, request.response || request.responseText, redirectedUrl);
      });
      request.send();

      return request;
    },
    loadDocument: function loadDocument(url, next, nextContext) {
      this.load(url, next, nextContext).responseType = 'document';
    }
  };
  scope.xhr = xhr;
});

window.HTMLImports.addModule(function (scope) {
  var xhr = scope.xhr;
  var flags = scope.flags;

  var Loader = function Loader(onLoad, onComplete) {
    this.cache = {};
    this.onload = onLoad;
    this.oncomplete = onComplete;
    this.inflight = 0;
    this.pending = {};
  };

  Loader.prototype = {
    addNodes: function addNodes(nodes) {
      this.inflight += nodes.length;
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        this.require(n);
      }
      this.checkDone();
    },
    addNode: function addNode(node) {
      this.inflight++;
      this.require(node);
      this.checkDone();
    },
    require: function require(elt) {
      var url = elt.src || elt.href;
      elt.__nodeUrl = url;
      if (!this.dedupe(url, elt)) this.fetch(url, elt);
    },

    /** @method */
    dedupe: function dedupe(url, elt) {
      if (this.pending[url]) {
        this.pending[url].push(elt);
        return true;
      }

      if (this.cache[url]) {
        this.onload(url, elt, this.cache[url]);
        this.tail();
        return true;
      }
      this.pending[url] = [elt];
      return false;
    },

    /** @method */
    fetch: function fetch(url, elt) {
      var _this = this;

      if (flags.load) console.log('fetch', url, elt);

      if (!url) {
        setTimeout(function () {
          _this.receive(url, elt, {
            'error': 'href must be specified'
          }, null);
        }, 0);
      } else if (url.match(/^data:/)) {
        var _url$split = url.split(','),
            _url$split2 = _slicedToArray(_url$split, 2),
            header = _url$split2[0],
            body = _url$split2[1];

        body = header.indexOf(';base64') > -1 ? atob(body) : decodeURIComponent(body);

        setTimeout(function () {
          _this.receive(url, elt, null, body);
        }, 0);
      } else {
        xhr.load(url, function (err, resource, redirectedUrl) {
          _this.receive(url, elt, err, resource, redirectedUrl);
        });
      }
    },

    /** @method */
    receive: function receive(url, elt, err, resource, redirectedUrl) {
      this.cache[url] = resource;
      var $p = this.pending[url];
      for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
        this.onload(url, p, resource, err, redirectedUrl);
        this.tail();
      }
      this.pending[url] = null;
    },
    tail: function tail() {
      --this.inflight;
      this.checkDone();
    },
    checkDone: function checkDone() {
      if (!this.inflight) this.oncomplete();
    }
  };
  scope.Loader = Loader;
});

window.HTMLImports.addModule(function (scope) {
  var Observer = function Observer(addCallback) {
    this.addCallback = addCallback;
    this.mo = new MutationObserver(this.handler.bind(this));
  };
  Observer.prototype = {
    handler: function handler(mutations) {
      for (var i = 0, l = mutations.length, m; i < l && (m = mutations[i]); i++) {
        if (m.type === 'childList' && m.addedNodes.length) {
          this.addedNodes(m.addedNodes);
        }
      }
    },

    /**
    @method
    @param nodes */
    addedNodes: function addedNodes(nodes) {
      var _this2 = this;

      if (this.addCallback) this.addCallback(nodes);

      toArray(nodes).forEach(function (n) {
        if (n.children && n.children.length) _this2.addedNodes(n.children);
      });
    },
    observe: function observe(root) {
      this.mo.observe(root, {
        'childList': true,
        'subtree': true
      });
    }
  };
  scope.Observer = Observer;
});

window.HTMLImports.addModule(function (scope) {
  var path = scope.path;
  var rootDocument = scope.rootDocument;
  var flags = scope.flags;
  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
  var IMPORT_SELECTOR = 'link[rel=' + IMPORT_LINK_TYPE + ']';
  var importParser = {
    'documentSelectors': IMPORT_SELECTOR,

    /** @type {String} */
    'importsSelectors': [IMPORT_SELECTOR, 'link[rel=stylesheet]:not([type])', 'style:not([type])', 'script:not([type])', 'script[type="application/javascript"]', 'script[type="text/javascript"]'].join(','),

    'map': {
      'link': 'parseLink',
      'script': 'parseScript',
      'style': 'parseStyle'
    },
    'dynamicElements': [],

    /** @method */
    parseNext: function parseNext() {
      var next = this.nextToParse();
      if (next) this.parse(next);
    },

    /** @method */
    parse: function parse(elt) {
      if (this.isParsed(elt)) {
        flags.parse && console.log('[%s] is already parsed', elt.localName);
        return;
      }

      var fn = this[this.map[elt.localName]];
      if (fn) {
        this.markParsing(elt);
        fn.call(this, elt);
      }
    },

    /** @method */
    parseDynamic: function parseDynamic(elt, quiet) {
      this.dynamicElements.push(elt);
      if (!quiet) this.parseNext();
    },

    'markParsing': function markParsing(elt) {
      flags.parse && console.log('parsing', elt);
      this.parsingElement = elt;
    },
    'markParsingComplete': function markParsingComplete(elt) {
      elt.__importParsed = true;
      this.markDynamicParsingComplete(elt);
      if (elt.__importElement) {
        elt.__importElement.__importParsed = true;
        this.markDynamicParsingComplete(elt.__importElement);
      }
      this.parsingElement = null;
      flags.parse && console.log('completed', elt);
    },

    /** @method */
    markDynamicParsingComplete: function markDynamicParsingComplete(elt) {
      var i = this.dynamicElements.indexOf(elt);
      if (i >= 0) this.dynamicElements.splice(i, 1);
    },

    /** @method */
    parseImport: function parseImport(elt) {
      elt.import = elt.__doc;
      if (window.HTMLImports.__importsParsingHook) {
        window.HTMLImports.__importsParsingHook(elt);
      }
      if (elt.import) elt.import.__importParsed = true;

      this.markParsingComplete(elt);

      if (elt.__resource && !elt.__error) {
        elt.dispatchEvent(new CustomEvent('load', {
          'bubbles': false
        }));
      } else {
        elt.dispatchEvent(new CustomEvent('error', {
          'bubbles': false
        }));
      }

      if (elt.__pending) {
        var fn;
        while (elt.__pending.length) {
          fn = elt.__pending.shift();
          if (fn) fn({ 'target': elt });
        }
      }

      this.parseNext();
    },

    /**
    @method
    @param linkElt */
    parseLink: function parseLink(linkElt) {
      if (nodeIsImport(linkElt)) {
        this.parseImport(linkElt);return;
      }

      linkElt.href = linkElt.href;
      this.parseGeneric(linkElt);
    },

    /** @method */
    parseStyle: function parseStyle(elt) {
      var src = elt;
      elt = cloneStyle(elt);
      src.__appliedElement = elt;
      elt.__importElement = src;
      this.parseGeneric(elt);
    },

    /** @method */
    parseGeneric: function parseGeneric(elt) {
      this.trackElement(elt);
      this.addElementToDocument(elt);
    },

    /** @method */
    'rootImportForElement': function rootImportForElement(elt) {
      var n = elt;

      while (n.ownerDocument.__importLink) {
        n = n.ownerDocument.__importLink;
      }return n;
    },

    /** @method */
    addElementToDocument: function addElementToDocument(elt) {
      var port = this.rootImportForElement(elt.__importElement || elt);
      port.parentNode.insertBefore(elt, port);
    },

    /** @method */
    trackElement: function trackElement(elt, callback) {
      var _this3 = this;

      /** @function */
      var done = function done(e) {
        elt.removeEventListener('load', done);
        elt.removeEventListener('error', done);
        if (callback) callback(e);
        _this3.markParsingComplete(elt);
        _this3.parseNext();
      };
      elt.addEventListener('load', done);
      elt.addEventListener('error', done);
    },

    /** @method */
    parseScript: function parseScript(scriptElt) {
      /** @type {Element} */
      var script = document.createElement('script');

      script.__importElement = scriptElt;
      script.src = scriptElt.src || generateScriptDataUrl(scriptElt);
      scope.currentScript = scriptElt;
      this.trackElement(script, function (e) {
        if (script.parentNode) script.parentNode.removeChild(script);
        scope.currentScript = null;
      });
      this.addElementToDocument(script);
    },

    /** @method */
    nextToParse: function nextToParse() {
      this._mayParse = [];

      return !this.parsingElement && (this.nextToParseInDoc(rootDocument) || this.nextToParseDynamic());
    },

    /** @method */
    'nextToParseInDoc': function nextToParseInDoc(doc, link) {
      if (doc && this._mayParse.indexOf(doc) < 0) {
        this._mayParse.push(doc);
        var nodes = doc.querySelectorAll(this.parseSelectorsForNode(doc));
        for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
          if (!this.isParsed(n)) {
            if (this.hasResource(n)) {
              return nodeIsImport(n) ? this.nextToParseInDoc(n.__doc, n) : n;
            } else return;
          }
        }
      }
      return link;
    },
    'nextToParseDynamic': function nextToParseDynamic() {
      return this.dynamicElements[0];
    },
    'parseSelectorsForNode': function parseSelectorsForNode(node) {
      var doc = node.ownerDocument || node;
      return doc === rootDocument ? this.documentSelectors : this.importsSelectors;
    },
    'isParsed': function isParsed(node) {
      return node.__importParsed;
    },
    'needsDynamicParsing': function needsDynamicParsing(elt) {
      return this.dynamicElements.indexOf(elt) >= 0;
    },
    'hasResource': function hasResource(node) {
      if (nodeIsImport(node) && node.__doc === undefined) return false;
      return true;
    }
  };
  function nodeIsImport(elt) {
    return elt.localName === 'link' && elt.rel === IMPORT_LINK_TYPE;
  }
  function generateScriptDataUrl(script) {
    var scriptContent = generateScriptContent(script);
    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(scriptContent);
  }
  function generateScriptContent(script) {
    return script.textContent + generateSourceMapHint(script);
  }
  function generateSourceMapHint(script) {
    var owner = script.ownerDocument;
    owner.__importedScripts = owner.__importedScripts || 0;
    var moniker = script.ownerDocument.baseURI;
    var num = owner.__importedScripts ? '-' + owner.__importedScripts : '';
    owner.__importedScripts++;
    return '\n//# sourceURL=' + moniker + num + '.js\n';
  }
  function cloneStyle(style) {
    var clone = style.ownerDocument.createElement('style');
    clone.textContent = style.textContent;
    path.resolveUrlsInStyle(clone);
    return clone;
  }
  scope.parser = importParser;
  scope.IMPORT_SELECTOR = IMPORT_SELECTOR;
});

window.HTMLImports.addModule(function (scope) {
  var flags = scope.flags;
  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
  var IMPORT_SELECTOR = scope.IMPORT_SELECTOR;
  var rootDocument = scope.rootDocument;
  var Loader = scope.Loader;
  var Observer = scope.Observer;
  var parser = scope.parser;

  var importer = {
    'documents': {},
    'documentPreloadSelectors': IMPORT_SELECTOR,

    /** @type {String} */
    'importsPreloadSelectors': [IMPORT_SELECTOR].join(','),

    /** @method */
    'loadNode': function loadNode(node) {
      importLoader.addNode(node);
    },

    /** @method */
    loadSubtree: function loadSubtree(parent) {
      var nodes = this.marshalNodes(parent);
      importLoader.addNodes(nodes);
    },

    /** @method */
    marshalNodes: function marshalNodes(parent) {
      return parent.querySelectorAll(this.loadSelectorsForNode(parent));
    },

    /**
    @method
    @param node
    @return {String} */
    loadSelectorsForNode: function loadSelectorsForNode(node) {
      var doc = node.ownerDocument || node;
      return doc === rootDocument ? this.documentPreloadSelectors : this.importsPreloadSelectors;
    },

    /** @method */
    loaded: function loaded(url, elt, resource, err, redirectedUrl) {
      if (flags.load) console.log('loaded', url, elt);
      elt.__resource = resource;
      elt.__error = err;
      if (isImportLink(elt)) {
        var doc = this.documents[url];
        if (doc === undefined) {
          doc = err ? null : makeDocument(resource, redirectedUrl || url);
          if (doc) {
            doc.__importLink = elt;
            this.bootDocument(doc);
          }
          this.documents[url] = doc;
        }
        elt.__doc = doc;
      }
      parser.parseNext();
    },

    /** @method */
    bootDocument: function bootDocument(doc) {
      this.loadSubtree(doc);
      this.observer.observe(doc);
      parser.parseNext();
    },

    'loadedAll': function loadedAll() {
      parser.parseNext();
    }
  };
  var importLoader = new Loader(importer.loaded.bind(importer), importer.loadedAll.bind(importer));
  importer.observer = new Observer();

  /** @function */
  var isImportLink = function isImportLink(elt) {
    return isLinkRel(elt, IMPORT_LINK_TYPE);
  };

  function isLinkRel(elt, rel) {
    return elt.localName === 'link' && elt.getAttribute('rel') === rel;
  }

  /**
  @function
  @param {*} doc
  @return {Boolean} */
  var hasBaseURIAccessor = function hasBaseURIAccessor(doc) {
    return Boolean(Object.getOwnPropertyDescriptor(doc, 'baseURI'));
  };

  function makeDocument(resource, url) {
    var doc = document.implementation.createHTMLDocument(IMPORT_LINK_TYPE);
    doc._URL = url;
    var base = doc.createElement('base');
    base.setAttribute('href', url);
    if (!doc.baseURI && !hasBaseURIAccessor(doc)) {
      Object.defineProperty(doc, 'baseURI', { 'value': url });
    }
    var meta = doc.createElement('meta');
    meta.setAttribute('charset', 'utf-8');
    doc.head.appendChild(meta);
    doc.head.appendChild(base);
    doc.body.innerHTML = resource;
    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
      HTMLTemplateElement.bootstrap(doc);
    }

    return doc;
  }

  if (!document.baseURI) {
    var baseURIDescriptor = {
      'get': function get() {
        var base = document.querySelector('base');
        return base ? base.href : window.location.href;
      },
      'configurable': true
    };
    Object.defineProperty(document, 'baseURI', baseURIDescriptor);
    Object.defineProperty(rootDocument, 'baseURI', baseURIDescriptor);
  }
  scope.importer = importer;
  scope.importLoader = importLoader;
});

window.HTMLImports.addModule(function (scope) {
  /** @function */
  var matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;

  var parser = scope.parser;
  var importer = scope.importer;
  var dynamic = {
    'added': function added(nodes) {
      var owner, parsed, loading;
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        if (!owner) {
          owner = n.ownerDocument;
          parsed = parser.isParsed(owner);
        }
        loading = this.shouldLoadNode(n);
        if (loading) importer.loadNode(n);
        if (this.shouldParseNode(n) && parsed) {
          parser.parseDynamic(n, loading);
        }
      }
    },
    'shouldLoadNode': function shouldLoadNode(node) {
      return node.nodeType === 1 && matches.call(node, importer.loadSelectorsForNode(node));
    },
    'shouldParseNode': function shouldParseNode(node) {
      return node.nodeType === 1 && matches.call(node, parser.parseSelectorsForNode(node));
    }
  };
  importer.observer.addCallback = dynamic.added.bind(dynamic);
});

(function () {
  var scope = window.HTMLImports;

  /** @type {Function} */
  var initializeModules = scope.initializeModules;
  if (scope.useNative) return;

  initializeModules();
  var rootDocument = scope.rootDocument;

  /** @function */
  var bootstrap = function bootstrap() {
    window.HTMLImports.importer.bootDocument(rootDocument);
  };
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootstrap();
  } else document.addEventListener('DOMContentLoaded', bootstrap);
})();

window.CustomElements = window.CustomElements || { 'flags': {} };

(function (scope) {
  var flags = scope.flags;
  var modules = [];

  /** @function */
  var addModule = function addModule(module) {
    modules.push(module);
  };

  /** @function */
  var initializeModules = function initializeModules() {
    modules.forEach(function (module) {
      module(scope);
    });
  };

  scope.addModule = addModule;
  scope.initializeModules = initializeModules;
  scope.hasNative = Boolean(document.registerElement);
  scope.useNative = !flags.register && scope.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
})(window.CustomElements);

window.CustomElements.addModule(function (scope) {
  /** @type {String} */
  var IMPORT_LINK_TYPE = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : 'none';

  function forSubtree(node, cb) {
    findAllElements(node, function (e) {
      if (cb(e)) return true;
      forRoots(e, cb);
    });
    forRoots(node, cb);
  }
  function findAllElements(node, find, data) {
    var e = node.firstElementChild;
    if (!e) {
      e = node.firstChild;
      while (e && e.nodeType !== Node.ELEMENT_NODE) {
        e = e.nextSibling;
      }
    }
    while (e) {
      if (find(e, data) !== true) findAllElements(e, find, data);
      e = e.nextElementSibling;
    }
    return null;
  }
  function forRoots(node, cb) {
    var root = node.shadowRoot;
    while (root) {
      forSubtree(root, cb);
      root = root.olderShadowRoot;
    }
  }
  function forDocumentTree(doc, cb) {
    _forDocumentTree(doc, cb, []);
  }
  function _forDocumentTree(doc, cb, processingDocuments) {
    doc = window.wrap(doc);
    if (processingDocuments.indexOf(doc) >= 0) return;

    processingDocuments.push(doc);
    var imports = doc.querySelectorAll('link[rel=' + IMPORT_LINK_TYPE + ']');
    for (var i = 0, l = imports.length, n; i < l && (n = imports[i]); i++) {
      if (n.import) _forDocumentTree(n.import, cb, processingDocuments);
    }
    cb(doc);
  }
  scope.forDocumentTree = forDocumentTree;
  scope.forSubtree = forSubtree;
});

window.CustomElements.addModule(function (scope) {
  var flags = scope.flags;
  var forSubtree = scope.forSubtree;
  var forDocumentTree = scope.forDocumentTree;

  function addedNode(node, isAttached) {
    return added(node, isAttached) || addedSubtree(node, isAttached);
  }
  function added(node, isAttached) {
    if (scope.upgrade(node, isAttached)) return true;
    if (isAttached) attached(node);
  }
  function addedSubtree(node, isAttached) {
    forSubtree(node, function (e) {
      if (added(e, isAttached)) return true;
    });
  }
  var hasThrottledAttached = window.MutationObserver._isPolyfilled && flags['throttle-attached'];
  scope.hasPolyfillMutations = hasThrottledAttached;
  scope.hasThrottledAttached = hasThrottledAttached;
  var isPendingMutations = false;
  var pendingMutations = [];
  function deferMutation(fn) {
    pendingMutations.push(fn);
    if (!isPendingMutations) {
      isPendingMutations = true;
      setTimeout(takeMutations);
    }
  }
  function takeMutations() {
    isPendingMutations = false;
    var $p = pendingMutations;
    for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
      p();
    }
    pendingMutations = [];
  }
  function attached(element) {
    if (hasThrottledAttached) {
      deferMutation(function () {
        _attached(element);
      });
    } else _attached(element);
  }
  function _attached(element) {
    if (element.__upgraded__ && !element.__attached) {
      element.__attached = true;
      if (element.attachedCallback) {
        element.attachedCallback();
      }
    }
  }
  function detachedNode(node) {
    detached(node);
    forSubtree(node, function (e) {
      detached(e);
    });
  }
  function detached(element) {
    if (hasThrottledAttached) {
      deferMutation(function () {
        _detached(element);
      });
    } else _detached(element);
  }
  function _detached(element) {
    if (element.__upgraded__ && element.__attached) {
      element.__attached = false;
      if (element.detachedCallback) element.detachedCallback();
    }
  }
  function inDocument(element) {
    var p = element;
    var doc = window.wrap(document);
    while (p) {
      if (p == doc) return true; // eslint-disable-line eqeqeq
      p = p.parentNode || p.nodeType === Node.DOCUMENT_FRAGMENT_NODE && p.host;
    }
  }
  function watchShadow(node) {
    if (node.shadowRoot && !node.shadowRoot.__watched) {
      flags.dom && console.log('watching shadow-root for: ', node.localName);
      var root = node.shadowRoot;
      while (root) {
        observe(root);
        root = root.olderShadowRoot;
      }
    }
  }
  function handler(root, mutations) {
    if (flags.dom) {
      var mx = mutations[0];
      if (mx && mx.type === 'childList' && mx.addedNodes) {
        if (mx.addedNodes) {
          var d = mx.addedNodes[0];
          while (d && d !== document && !d.host) {
            d = d.parentNode;
          }var u = d && (d.URL || d._URL || d.host && d.host.localName) || '';
          u = u.split('/?').shift().split('/').pop();
        }
      }
      console.group('mutations (%d) [%s]', mutations.length, u || '');
    }
    var isAttached = inDocument(root);
    mutations.forEach(function (mx) {
      if (mx.type === 'childList') {
        forEach(mx.addedNodes, function (n) {
          if (!n.localName) return;
          addedNode(n, isAttached);
        });
        forEach(mx.removedNodes, function (n) {
          if (!n.localName) return;
          detachedNode(n);
        });
      }
    });
    flags.dom && console.groupEnd();
  }
  function takeRecords(node) {
    node = window.wrap(node);
    if (!node) node = window.wrap(document);
    while (node.parentNode) {
      node = node.parentNode;
    }var observer = node.__observer;
    if (observer) {
      handler(node, observer.takeRecords());
      takeMutations();
    }
  }
  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  function observe(inRoot) {
    if (inRoot.__observer) return;
    var observer = new MutationObserver(handler.bind(this, inRoot));
    observer.observe(inRoot, {
      'childList': true,
      'subtree': true
    });
    inRoot.__observer = observer;
  }
  function upgradeDocument(doc) {
    doc = window.wrap(doc);
    flags.dom && console.group('upgradeDocument: ', doc.baseURI.split('/').pop());
    var isMainDocument = doc === window.wrap(document);
    addedNode(doc, isMainDocument);
    observe(doc);
    flags.dom && console.groupEnd();
  }
  function upgradeDocumentTree(doc) {
    forDocumentTree(doc, upgradeDocument);
  }
  var originalCreateShadowRoot = Element.prototype.createShadowRoot;
  if (originalCreateShadowRoot) {
    Element.prototype.createShadowRoot = function () {
      var root = originalCreateShadowRoot.call(this);
      window.CustomElements.watchShadow(this);
      return root;
    };
  }
  scope.watchShadow = watchShadow;
  scope.upgradeDocumentTree = upgradeDocumentTree;
  scope.upgradeDocument = upgradeDocument;
  scope.upgradeSubtree = addedSubtree;
  scope.upgradeAll = addedNode;
  scope.attached = attached;
  scope.takeRecords = takeRecords;
});

window.CustomElements.addModule(function (scope) {
  var flags = scope.flags;
  function upgrade(node, isAttached) {
    if (node.localName === 'template') {
      if (window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(node);
      }
    }
    if (!node.__upgraded__ && node.nodeType === Node.ELEMENT_NODE) {
      var is = node.getAttribute('is');
      var definition = scope.getRegisteredDefinition(node.localName) || scope.getRegisteredDefinition(is);
      if (definition) {
        if (is && definition.tag == node.localName || !is && !definition.extends) {
          // eslint-disable-line eqeqeq
          return upgradeWithDefinition(node, definition, isAttached);
        }
      }
    }
  }
  function upgradeWithDefinition(element, definition, isAttached) {
    flags.upgrade && console.group('upgrade:', element.localName);
    if (definition.is) element.setAttribute('is', definition.is);

    implementPrototype(element, definition);
    element.__upgraded__ = true;
    created(element);
    if (isAttached) scope.attached(element);
    scope.upgradeSubtree(element, isAttached);
    flags.upgrade && console.groupEnd();

    return element;
  }
  function implementPrototype(element, definition) {
    element.__proto__ = definition.prototype; // eslint-disable-line no-proto
  }

  function created(element) {
    if (element.createdCallback) element.createdCallback();
  }
  scope.upgrade = upgrade;
  scope.upgradeWithDefinition = upgradeWithDefinition;
  scope.implementPrototype = implementPrototype;
});

window.CustomElements.addModule(function (scope) {
  var upgradeDocumentTree = scope.upgradeDocumentTree;
  var upgradeAll = scope.upgradeAll;
  var upgradeWithDefinition = scope.upgradeWithDefinition;
  var implementPrototype = scope.implementPrototype;

  function register(name, options) {
    var definition = options || {};
    if (!name) {
      throw new Error('document.registerElement: first argument `name` must not be empty');
    }
    if (name.indexOf('-') < 0) {
      throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(name) + "'.");
    }
    if (isReservedTag(name)) {
      throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(name) + "'. The type name is invalid.");
    }
    if (getRegisteredDefinition(name)) {
      throw new Error("DuplicateDefinitionError: a type with name '" + String(name) + "' is already registered");
    }
    if (!definition.prototype) {
      definition.prototype = Object.create(HTMLElement.prototype);
    }
    definition.__name = name.toLowerCase();
    definition.lifecycle = definition.lifecycle || {};
    definition.ancestry = ancestry(definition.extends);
    resolveTagName(definition);
    overrideAttributeApi(definition.prototype);
    registerDefinition(definition.__name, definition);

    definition.ctor = generateConstructor(definition);
    definition.ctor.prototype = definition.prototype;
    definition.prototype.constructor = definition.ctor;
    if (scope.ready) upgradeDocumentTree(document);

    return definition.ctor;
  }
  function overrideAttributeApi(prototype) {
    if (prototype.setAttribute._polyfilled) return;

    var setAttribute = prototype.setAttribute;
    prototype.setAttribute = function (name, value) {
      changeAttribute.call(this, name, value, setAttribute);
    };
    var removeAttribute = prototype.removeAttribute;
    prototype.removeAttribute = function (name) {
      changeAttribute.call(this, name, null, removeAttribute);
    };
    prototype.setAttribute._polyfilled = true;
  }
  function changeAttribute(name, value, operation) {
    name = name.toLowerCase();
    var oldValue = this.getAttribute(name);
    operation.apply(this, arguments);
    var newValue = this.getAttribute(name);
    if (this.attributeChangedCallback && newValue !== oldValue) {
      this.attributeChangedCallback(name, oldValue, newValue);
    }
  }
  function isReservedTag(name) {
    for (var i = 0; i < reservedTagList.length; i++) {
      if (name === reservedTagList[i]) return true;
    }
  }

  /** @type {Array<String>} */
  var reservedTagList = ['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph'];
  function ancestry(extnds) {
    var extendee = getRegisteredDefinition(extnds);
    if (extendee) {
      return ancestry(extendee.extends).concat([extendee]);
    }
    return [];
  }

  function resolveTagName(definition) {
    var baseTag = definition.extends;
    for (var i = 0, a; a = definition.ancestry[i]; i++) {
      baseTag = a.is && a.tag;
    }
    definition.tag = baseTag || definition.__name;
    if (baseTag) definition.is = definition.__name;
  }

  function instantiate(definition) {
    return upgradeWithDefinition(domCreateElement(definition.tag), definition);
  }
  var registry = {};

  /**
  @function
  @param {String} name
  @return {*} */
  var getRegisteredDefinition = function getRegisteredDefinition(name) {
    return name ? registry[name.toLowerCase()] : undefined;
  };

  function registerDefinition(name, definition) {
    registry[name] = definition;
  }

  /** @function */
  var generateConstructor = function generateConstructor(definition) {
    return function () {
      return instantiate(definition);
    };
  };

  function createElementNS(namespace, tag, typeExtension) {
    if (namespace === 'http://www.w3.org/1999/xhtml') {
      return createElement(tag, typeExtension);
    } else return domCreateElementNS(namespace, tag);
  }
  function createElement(tag, typeExtension) {
    if (tag) tag = tag.toLowerCase();
    if (typeExtension) typeExtension = typeExtension.toLowerCase();
    var definition = getRegisteredDefinition(typeExtension || tag);
    if (definition) {
      if (tag == definition.tag && typeExtension == definition.is) {
        // eslint-disable-line eqeqeq
        return new definition.ctor(); // eslint-disable-line new-cap
      }
      if (!typeExtension && !definition.is) {
        return new definition.ctor(); // eslint-disable-line new-cap
      }
    }
    var element;
    if (typeExtension) {
      element = createElement(tag);
      element.setAttribute('is', typeExtension);
      return element;
    }
    element = domCreateElement(tag);
    if (tag.indexOf('-') >= 0) {
      implementPrototype(element, HTMLElement);
    }
    return element;
  }
  var domCreateElement = document.createElement.bind(document);
  var domCreateElementNS = document.createElementNS.bind(document);

  /**
  @function
  @param {*} obj
  @param {*} base
  @return {Boolean} */
  var isInstance = function isInstance(obj, base) {
    return obj instanceof base;
  };

  function wrapDomMethodToForceUpgrade(obj, methodName) {
    var orig = obj[methodName];
    obj[methodName] = function () {
      var n = orig.apply(this, arguments);
      upgradeAll(n);
      return n;
    };
  }
  wrapDomMethodToForceUpgrade(Node.prototype, 'cloneNode');
  wrapDomMethodToForceUpgrade(document, 'importNode');

  document.registerElement = register;
  document.createElement = createElement;
  document.createElementNS = createElementNS;
  scope.registry = registry;
  scope.instanceof = isInstance;
  scope.reservedTagList = reservedTagList;
  scope.getRegisteredDefinition = getRegisteredDefinition;
  document.register = document.registerElement;
});

(function () {
  var scope = window.CustomElements;
  var useNative = scope.useNative;
  var initializeModules = scope.initializeModules;

  if (useNative) {
    /** @function */
    var nop = function nop() {};

    scope.watchShadow = nop;
    scope.upgrade = nop;
    scope.upgradeAll = nop;
    scope.upgradeDocumentTree = nop;
    scope.upgradeSubtree = nop;
    scope.takeRecords = nop;

    /**
    @method
    @param obj
    @param base
    @return {Boolean} */
    scope.instanceof = function (obj, base) {
      return obj instanceof base;
    };
  } else initializeModules();

  var upgradeDocumentTree = scope.upgradeDocumentTree;
  var upgradeDocument = scope.upgradeDocument;
  if (!window.wrap) {
    if (window.ShadowDOMPolyfill) {
      window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
      window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
    } else {
      /** @function */
      window.wrap = window.unwrap = function (node) {
        return node;
      };
    }
  }
  if (window.HTMLImports) {
    window.HTMLImports.__importsParsingHook = function (elt) {
      if (elt.import) upgradeDocument(window.wrap(elt.import));
    };
  }

  /** @function */
  var bootstrap = function bootstrap() {
    upgradeDocumentTree(window.wrap(document));
    window.CustomElements.ready = true;

    window.requestAnimationFrame(function () {
      setTimeout(function () {
        window.CustomElements.readyTime = Date.now();
        if (window.HTMLImports) {
          window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
        }
        document.dispatchEvent(new CustomEvent('WebComponentsReady', {
          'bubbles': true
        }));
      });
    });
  };

  if (document.readyState === 'complete' || scope.flags.eager) {
    bootstrap();
  } else if (document.readyState === 'interactive' && (!window.HTMLImports || window.HTMLImports.ready)) {
    bootstrap();
  } else {
    /** @type {String} */
    var loadEvent = window.HTMLImports && !window.HTMLImports.ready ? 'HTMLImportsLoaded' : 'DOMContentLoaded';
    window.addEventListener(loadEvent, bootstrap);
  }
})();

(function () {
  var style = document.createElement('style');
  style.textContent = '' + 'body {' + 'transition: opacity ease-in 0.2s;' + ' } \n' + 'body[unresolved] {' + 'opacity: 0; display: block; overflow: hidden; position: relative;' + ' } \n';

  var head = document.querySelector('head');
  head.insertBefore(style, head.firstChild);
})();

},{}]},{},[1]);
