'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      PolymerRedux = backgroundPage.PolymerRedux,
      internationalize = backgroundPage['tools'].internationalize,
      webrtc = backgroundPage.webrtc;

  /** @type {Object<String>} */

  var translations = _.transform({
    'useBrowsecForWebrtcConnections': 'use_browsec_for_webrtc_connections',
    'webrtcSettingsControlledByAnotherExtension': 'webrtc_settings_controlled_by_another_extension'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'index-settings',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      },
      'webrtcBlocked': {
        'type': Boolean,
        'value': Boolean(webrtc.get())
      },
      'webrtcDisabled': {
        'type': Boolean,
        'value': false
      }
    },

    ready: function ready() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var controlState;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return webrtc.getControlState();

              case 2:
                controlState = _context.sent;


                if (!controlState) _this.webrtcDisabled = true;

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },


    // Methods
    webrtcChange: function webrtcChange() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var blocked;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.webrtcDisabled) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:

                /** @type {Boolean} */
                blocked = !_this2.webrtcBlocked;
                _context2.prev = 3;
                _context2.next = 6;
                return webrtc[blocked ? 'enable' : 'disable']();

              case 6:
                _this2.webrtcBlocked = blocked;
                _context2.next = 11;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](3);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[3, 9]]);
      }))();
    },
    showInformationPopup: function showInformationPopup() {
      /** @type {Element} */
      var parent = document.querySelector('div.MainContainer');

      /** @type {Element} */
      var element = document.createElement('popup-settings-information');
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