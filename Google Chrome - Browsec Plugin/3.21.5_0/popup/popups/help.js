'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      internationalize = backgroundPage['tools'].internationalize;

  /** @type {Object<String>} */

  var translations = _.transform({
    'okIGotIt': 'ok_i_got_it',
    'smartSettingsControl': 'smart_settings_allow_you_to_control',
    'smartSettingsFeatures1': 'smart_settings_features_1',
    'smartSettingsFeatures2': 'smart_settings_features_2',
    'smartSettingsFeatures3': 'smart_settings_features_3',
    'withSmartSettingsYouCan': 'with_smart_settings_you_can'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'popup-help',
    'properties': {
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    // Methods
    close: function close() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return window.anime({
                  'targets': _this,
                  'opacity': 0,
                  'duration': 400,
                  'easing': 'linear'
                }).finished;

              case 2:
                _this.style.cssText = 'display:none';
                // this.remove();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  });
})();