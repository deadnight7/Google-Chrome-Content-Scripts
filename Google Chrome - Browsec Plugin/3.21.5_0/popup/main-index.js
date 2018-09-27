'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global StoreState */
(function () {
  var _browser = typeof window.browser !== 'undefined' ? window.browser : window.chrome;

  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      Browser = backgroundPage.Browser,
      config = backgroundPage.config,
      Counters = backgroundPage.Counters,
      DelayRecord = backgroundPage.DelayRecord,
      PolymerRedux = backgroundPage.PolymerRedux,
      proxy = backgroundPage.proxy,
      internationalize = backgroundPage['tools'].internationalize;

  var Polymer = window.Polymer;

  /** @type {Object<String>} */
  var translations = _.transform({ 'help': 'help' }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  var defaultCountry = config.proxy.defaultCountry || 'nl';

  Polymer({
    'is': 'main-index',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'switchOn': {
        'type': Boolean,
        'statePath': function statePath(_ref) {
          var pac = _ref.pac;
          return pac.mode === 'proxy';
        }
      },
      'switchVisible': {
        'type': Boolean,
        'statePath': function statePath(_ref2) {
          var domain = _ref2.domain,
              filters = _ref2['pac'].filters,
              page = _ref2.page;

          var parts = page.split(':');
          if (parts[0] === 'index' && parts[1] === 'filters') {
            return false;
          }
          if (!domain) return true;

          var domains = _.transform(filters, function (carry, _ref3) {
            var disabled = _ref3.disabled,
                domain = _ref3.domain;

            if (disabled) return;
            carry.push(domain);
          }, []);

          return !domains.includes(domain);
        }
      },
      'helpVisible': {
        'type': Boolean,
        'statePath': function statePath(_ref4) {
          var page = _ref4.page;

          var parts = page.split(':');
          return parts[0] === 'index' && parts[1] === 'filters';
        }
      },
      'page': {
        'type': String,
        'statePath': function statePath(_ref5) {
          var page = _ref5.page;
          return page;
        },
        'observer': 'observePage'
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    // Lifecycle
    ready: function ready() {
      var _this = this;

      /** @type {Element} */
      this.switchElement = Polymer.dom(this.root).querySelector('div.Switch');

      /** @type {PolymerElement} */
      this.switch = Polymer.dom(this.switchElement);

      // Removing empty nodes
      var nodes = Array.from(this.switch.childNodes);
      nodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) return;
        _this.switch.removeChild(node);
      });
    },


    // Observers
    observePage: function observePage() {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _args$map, _args$map2, newPage, oldPage, mode, direction, sameElement, oldElement, domain, name, newElement;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (args[1]) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                // Initial redux call

                _args$map = args.map(function (item) {
                  return item.split(':');
                }), _args$map2 = _slicedToArray(_args$map, 2), newPage = _args$map2[0], oldPage = _args$map2[1];

                if (!(newPage[0] !== 'index')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                // This will remove this element

                mode = _this2.getState().pac.mode;

                // Removing first elements (they 'index' anyway)

                newPage.shift();
                oldPage.shift();

                direction = newPage[0] === 'home' ? 'left' : 'right';
                sameElement = newPage[0] === oldPage[0];

                /** @type {Element} */

                oldElement = _this2.switch.firstChild;

                if (!sameElement) {
                  _context.next = 15;
                  break;
                }

                if (newPage[0] === 'filters' && newPage[1]) {
                  domain = newPage[1];


                  oldElement.domain = domain;
                  oldElement.country = mode === 'proxy' ? null : defaultCountry;
                  oldElement.selectedDomain = null;
                }
                _context.next = 26;
                break;

              case 15:
                name = function () {
                  switch (newPage[0]) {
                    case 'filters':
                      return 'index-filters';
                    case 'home':
                      return 'index-home';
                    case 'locations':
                      return 'index-locations';
                    case 'settings':
                      return 'index-settings';
                  }
                }();

                if (name) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt('return');

              case 18:

                /** @type {Element} */
                newElement = document.createElement(name);

                if (newPage[0] === 'locations' && newPage[1]) {
                  newElement.domain = newPage[1];
                }
                if (newPage[0] === 'filters' && newPage[1]) {
                  newElement.domain = newPage[1];
                  newElement.country = mode === 'proxy' ? null : defaultCountry;
                }

                if (direction === 'left') {
                  _this2.switch.insertBefore(newElement, oldElement);
                  _this2.switchElement.style.cssText = 'margin-left:-100%;';
                } else {
                  _this2.switch.appendChild(newElement);
                }

                _context.next = 24;
                return window.anime({
                  'targets': _this2.switchElement,
                  'margin-left': direction === 'left' ? ['-100%', '0%'] : ['0%', '-100%'],
                  'duration': 250,
                  'easing': 'linear'
                }).finished;

              case 24:

                _this2.switch.removeChild(oldElement);
                _this2.switchElement.style.cssText = '';

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }))();
    },


    // Methods
    openHelp: function openHelp() {
      Counters.increase('popup: smart settings: open help');

      Browser.tabs.create('/pages/help/help.html');
    },
    switchClick: function switchClick() {
      var property = 'Big switch from ' + (this.switchOn ? 'on' : 'off');
      var delay = new DelayRecord(property);

      proxy[!this.switchOn ? 'enable' : 'disable']().then(function () {
        delay.end();
      });
    }
  });
})();