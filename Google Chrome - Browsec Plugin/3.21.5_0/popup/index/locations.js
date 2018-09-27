(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _CharsBuffer = require('tools/CharsBuffer');

var _CharsBuffer2 = _interopRequireDefault(_CharsBuffer);

var _getProperties = require('./locations/getProperties');

var _getProperties2 = _interopRequireDefault(_getProperties);

var _keydownListener = require('./locations/keydownListener');

var _keydownListener2 = _interopRequireDefault(_keydownListener);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}
/**
@typedef {Object} HighlightedCountry
@property {String} code
@property {Boolean} premium

@typedef {Object} NameListItem
@property {String} code
@property {Element} element
@property {String} name
@property {Boolean} premium */

(function () {
  var _browser = typeof window.browser !== 'undefined' ? window.browser : window.chrome;

  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var Polymer = window.Polymer;

  var _ = backgroundPage._,
      actions = backgroundPage.actions,
      Browser = backgroundPage.Browser,
      Counters = backgroundPage.Counters,
      ga = backgroundPage.ga,
      log = backgroundPage.log,
      PolymerRedux = backgroundPage.PolymerRedux,
      proxy = backgroundPage.proxy,
      internationalize = backgroundPage['tools'].internationalize;

  /** @type {Object<String>} */

  var translations = _.transform({ 'virtualLocations': 'virtual_locations' }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  /** Get full country name by 2 letter code
  @function
  @param code - 2 letter code */
  var countryNameByCode = function countryNameByCode(code) {
    var countryName = internationalize('country_name_' + code.toUpperCase());
    if (countryName) return countryName;

    var locale = Browser.i18n.getUILanguage();
    var version = _.get(Browser.runtime.getManifest(), 'version', 'n/a');

    var message = 'failed to look up country name for: ' + code + ' with locale: ' + locale + ' at popup.js';
    log.warn(message);
    ga('error', version, message, 0, false);

    return code.toUpperCase() || 'N/A';
  };

  Polymer({
    'is': 'index-locations',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': (0, _getProperties2.default)(countryNameByCode, translations),
    'observers': ['observeForCountry(domain, proxyCountry, proxyList)'],

    // Lifecycle
    ready: function ready() {
      this.elementHighlight = this.elementHighlight.bind(this);
      this.keydownListener = _keydownListener2.default.bind(this);
    },
    attached: function attached() {
      var _this = this;

      /** @type {PolymerElement} */
      var root = Polymer.dom(this.root);

      this.charsBuffer = new _CharsBuffer2.default();
      document.addEventListener('keydown', this.keydownListener);

      this.forceRenderAndGenerateNamesList();

      /** @type {Element} */
      this.scrollElement = root.children[0];

      this.charsBuffer.addListener(function (word) {
        var match = _this.namesList.find(function (_ref) {
          var name = _ref.name;
          return name.startsWith(word);
        });
        if (!match) return;

        var code = match.code,
            element = match.element,
            premium = match.premium;

        _this.highlightedCountry = { code: code, premium: premium };

        // Scroll to this element
        _this.scrollElement.scrollTop = element.offsetTop - 2;
      });

      var height = root.querySelector('div.Head').offsetHeight;

      root.querySelector('div.Sections').setAttribute('style', 'top:' + height + 'px;');

      if (!this.domain) Counters.increase('popup: location page shows');
    },
    detached: function detached() {
      document.removeEventListener('keydown', this.keydownListener);
    },

    // Computed properties
    /** @method */
    'computeHighlighted': function computeHighlighted(item, highlightedCountry) {
      return Boolean(highlightedCountry && highlightedCountry.code === item.code && highlightedCountry.premium === item.premium);
    },

    /**
    @method
    @param {Object} item
    @param {Boolean} item.premium
    @param {String} item.code
    @param {Boolean} premiumUser
    @param {String} country
    @return {String} */
    'computeMode': function computeMode(item, premiumUser, country) {
      if (item.premium && !premiumUser) return 'premium';
      if (item.code === country) return 'current';
      return 'change';
    },

    // Observers
    /** @method */
    observeCountries: function observeCountries() {
      this.forceRenderAndGenerateNamesList();
    },

    /** @method */
    observeForCountry: function observeForCountry(domain, proxyCountry, proxyList) {
      // Global settings
      if (!domain) {
        this.country = proxyCountry;return;
      }

      // Domain only
      this.country = _.get(proxyList.find(function (item) {
        return item.domain === domain;
      }), 'country') || '';
    },

    // Methods
    /** @method */
    back: function back() {
      this.dispatch({ 'type': 'Page change', 'page': 'index:home' });
    },

    /** @method */
    countryClick: function countryClick(_ref2) {
      var _this2 = this;

      var _ref2$detail = _ref2['detail'],
          mode = _ref2$detail.mode,
          country = _ref2$detail.country;
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var popupPremium;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(mode === 'change')) {
                  _context.next = 14;
                  break;
                }

                if (!_this2.domain) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return proxy.siteFilters.changeCountry({ 'domain': _this2.domain, country: country });

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.next = 8;
                return proxy.setCountry(country);

              case 8:
                ga('extension', 'change_country', country);

              case 9:
                _context.next = 11;
                return new Promise(function (resolve) {
                  setTimeout(resolve, 500);
                });

              case 11:
                _this2.dispatch({ 'type': 'Page change', 'page': 'index:home' });
                _context.next = 23;
                break;

              case 14:
                if (!(mode === 'premium')) {
                  _context.next = 23;
                  break;
                }

                /** @type {Element} */
                popupPremium = document.createElement('popup-premium');

                popupPremium.country = country;
                popupPremium.setAttribute('style', 'top:-100%;');
                // flow ignore next line
                document.body.append(popupPremium);

                ga('premium', 'show');

                _context.next = 22;
                return window.anime({
                  'targets': popupPremium,
                  'top': 0,
                  'duration': 800,
                  'easing': 'linear'
                }).finished;

              case 22:
                popupPremium.removeAttribute('style');

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    },

    /** @method */
    elementHighlight: function elementHighlight(event) {
      var model = event.model;

      var mouseReallyMoved = Boolean('movementX' in event ? event.movementX || event.movementY : event.webkitMovementX || event.webkitMovementY);
      if (!mouseReallyMoved) return;

      var _model$get = model.get('item'),
          premium = _model$get.premium,
          code = _model$get.code;

      var data = { premium: premium, code: code };

      if (_.isEqual(this.highlightedCountry, data)) return;

      this.highlightedCountry = data;
    },

    /** @method */
    favorite: function favorite(_ref3) {
      var _ref3$detail = _ref3['detail'],
          favorited = _ref3$detail.favorited,
          country = _ref3$detail.country;

      actions.favorites[favorited ? 'add' : 'remove'](country);
    },

    /** @method */
    forceRenderAndGenerateNamesList: function forceRenderAndGenerateNamesList() {
      /** @type {PolymerElement} */
      var root = Polymer.dom(this.root);

      /** @type {Element} */
      var domRepeat = root.querySelector('template[is="dom-repeat"]');

      // Force <dom-repeat> render
      domRepeat.render();

      // Merge countries & DOM nodes
      /** @type {Array<NameListItem>} */
      this.namesList = function () {
        /** @type {Array<Object>} */
        var listData = domRepeat.items.map(function (_ref4) {
          var code = _ref4.code,
              name = _ref4.name,
              premium = _ref4.premium;
          return {
            code: code, 'name': name.toLowerCase(), premium: premium
          };
        });

        var elements = Array.from(Polymer.dom(root.querySelector('div.Sections')).children).filter(function (element) {
          return element.tagName.toLowerCase() === 'index-locations-element';
        });

        listData.forEach(function (item, index) {
          item.element = elements[index];
        });

        return listData;
      }();
    },

    /** @method */
    openHelp: function openHelp() {
      var parent = document.querySelector('div.MainContainer');
      if (!parent) return; // Flow crap

      var element = document.createElement('popup-locations-information');
      element.style.cssText = 'opacity:0';

      parent.appendChild(element);
      window.anime({
        'targets': element,
        'opacity': 1,
        'duration': 400,
        'easing': 'linear'
      });
    }
  });
})();

},{"./locations/getProperties":2,"./locations/keydownListener":3,"tools/CharsBuffer":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/** @function */
exports.default = function (countryNameByCode, translations) {
  return {
    'countries': {
      'type': Array,
      'statePath': function statePath(_ref) {
        var ping = _ref.ping,
            favorites = _ref.favorites,
            servers = _ref.servers,
            user = _ref.user;

        var premiumUser = user.premium;

        // List of servers
        var list = Object.keys(servers).reduce(
        /** @function */
        function (carry, countryCode) {
          var countryData = servers[countryCode];
          if (countryData.hidden) return carry;

          var name = countryNameByCode(countryCode);

          // Free servers
          if (!premiumUser) {
            /** @type {Array} */
            var _servers = countryData.servers;

            if (Array.isArray(_servers) && _servers.length) {
              var data = {
                'id': countryCode,
                'code': countryCode,
                name: name,
                'premium': false
              };

              var delayData = ping.find(function (_ref2) {
                var country = _ref2.country,
                    premium = _ref2.premium;
                return country === countryCode && !premium;
              });
              if (delayData) {
                var delay = delayData.delay,
                    mark = delayData.mark;

                Object.assign(data, { delay: delay, mark: mark });
              }

              carry.push(data);
            }
          }

          {
            // Premium servers
            /** @type {Array} */
            var _servers2 = countryData.premium_servers;

            if (Array.isArray(_servers2) && _servers2.length) {
              var _data = {
                'id': countryCode + '_premium',
                'code': countryCode,
                'favorited': false,
                'name': name + ' (Premium)',
                'premium': true
              };

              var _delayData = ping.find(function (_ref3) {
                var country = _ref3.country,
                    premium = _ref3.premium;
                return country === countryCode && premium;
              });
              if (_delayData) {
                var _delay = _delayData.delay,
                    _mark = _delayData.mark;

                Object.assign(_data, { delay: _delay, mark: _mark });
              }

              carry.push(_data);
            }
          }

          return carry;
        }, []).sort(function (a, b) {
          // Premium state
          if (a.premium !== b.premium) return a.premium ? 1 : -1;

          // Name
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        if (premiumUser) {
          favorites.forEach(function (country) {
            list.filter(function (item) {
              return item.code === country;
            }).forEach(function (renderServerData) {
              renderServerData.favorited = true;
            });
          });
        } else {
          list.forEach(function (renderServerData) {
            delete renderServerData.favorited;
          });
        }

        list.sort(function (a, b) {
          // Premium state
          if (a.premium !== b.premium) return a.premium ? 1 : -1;

          // Favorites
          if (a.favorited !== b.favorited) return a.favorited ? -1 : 1;

          // Name
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });

        return list;
      },
      'observer': 'observeCountries'
    },

    /** In case of global locations -> pac.country,
    otherwise selected country in case of proxy filter */
    'country': {
      'type': String,
      'value': null
    },

    /** Used for setup of country for filter */
    'domain': {
      'type': String,
      'value': ''
    },

    'highlightedCountry': {
      'type': Object, /** @type {(HighlightedCountry|null)} */
      'value': null
    },
    'premiumUser': {
      'type': Boolean,
      'statePath': function statePath(_ref4) {
        var premium = _ref4['user'].premium;
        return premium;
      }
    },
    'proxyCountry': {
      'type': String,
      'value': '',
      'statePath': function statePath(_ref5) {
        var _ref5$pac = _ref5['pac'],
            mode = _ref5$pac.mode,
            country = _ref5$pac.country;
        return mode === 'proxy' ? country : '';
      }
    },
    'proxyList': {
      'type': Array,
      'value': [],
      'statePath': function statePath(_ref6) {
        var pac = _ref6.pac;
        return pac.filters.filter(function (_ref7) {
          var disabled = _ref7.disabled,
              proxyMode = _ref7.proxyMode;
          return !disabled && proxyMode;
        });
      }
    },
    'translations': {
      'type': Object,
      'value': translations,
      'readOnly': true
    }
  };
}; /* global PingRating, ProxyServerCountryData, SiteFilter, StoreState */

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (event) {
  var _this = this;

  /** @type {String} */
  var key = event.key;

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    event.preventDefault();

    /** @type {integer} */
    var newHighlightedCountryIndex = function () {
      /** @type {integer} */
      var length = _this.namesList.length;

      if (!_this.highlightedCountry) {
        return key === 'ArrowUp' ? length - 1 : 0;
      }

      /** @type {integer} */
      var index = _this.namesList.findIndex(function (_ref) {
        var code = _ref.code,
            premium = _ref.premium;
        return _this.highlightedCountry.code === code && _this.highlightedCountry.premium === premium;
      });
      index = index + (key === 'ArrowDown' ? 1 : -1);

      return (index + length) % length;
    }();

    /** @type {NameListItem} */
    var data = this.namesList[newHighlightedCountryIndex];

    this.highlightedCountry = {
      'code': data.code,
      'premium': data.premium
    };

    // Scroll whole list if new item is partially or not visible
    /** @type {Number} */
    var topEdge = this.scrollElement.scrollTop;

    /** @type {Number} */
    var screenHeight = this.scrollElement.offsetHeight;

    /** @type {Number} */
    var bottomEdge = topEdge + screenHeight;

    /** @type {Number} */
    var newElementHeight = data.element.offsetHeight;

    /** @type {Number} */
    var newElementTopEdge = data.element.offsetTop;

    /** @type {Number} */
    var newElementBottomEdge = newElementTopEdge + newElementHeight;

    /** @type {Boolean} */
    var visible = newElementTopEdge >= topEdge && newElementBottomEdge <= bottomEdge;
    if (visible) return;

    /** @type {Number} */
    var scrollTop = function () {
      // Hidden item at bottom
      if (newElementTopEdge >= topEdge) {
        return newElementBottomEdge - screenHeight + 4;
      }

      // Hidden item at top
      return newElementTopEdge - 2;
    }();
    this.scrollElement.scrollTop = scrollTop;
    return;
  }
  if (key === 'Enter') {
    if (!this.highlightedCountry) return;

    /** @type {String} */
    var code = this.highlightedCountry.code;

    /** @type {String} */

    var mode = this.computeMode(this.highlightedCountry, this.premiumUser, this.country);

    if (mode === 'current') return;

    this.countryClick({ 'detail': { mode: mode, 'country': code } });
    return;
  }

  this.charsBuffer.keydownListener(event);
};

;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  /** @type {String} */
  this.word = '';

  /** @type {Array<Function>} */
  this.listeners = [];

  // this.lastTimestamp;

  /**
  @method
  @param {String} */
  this.addChar = function (char) {
    /** @type {String} */
    var word = _this.word;

    /** @type {Number} */
    var timestamp = performance.now();

    /** @type {Boolean} */
    var clear = !_this.lastTimestamp ? true : timestamp - _this.lastTimestamp > 700;
    if (clear) word = '';
    word += char;

    _this.lastTimestamp = timestamp;

    if (word === _this.word) return;

    _this.word = word;

    _this.listeners.forEach(function (listener) {
      listener(word);
    });
  };

  /**
  @method
  @param {Function} listener */
  this.addListener = function (listener) {
    _this.listeners.push(listener);
  };

  /**
  @method
  @param {Function} listener */
  this.removeListener = function (listener) {
    _this.listeners = _this.listeners.filter(function (item) {
      return item !== listener;
    });
  };

  /**
  @method */
  this.keydownListener = function (event) {
    var code = event.code,
        key = event.key;

    if (key === ' ') event.preventDefault();

    /** @type {(String|undefined)} */
    var symbol = code ? code.replace(/^key/i, '') : key;
    if (symbol === 'Space') symbol = ' ';
    if (!symbol || symbol.length !== 1 || !/[ a-z]/i.test(symbol)) return;

    symbol = symbol.toLowerCase();

    _this.addChar(symbol);
  };
};

; /** @class */

},{}]},{},[1]);
