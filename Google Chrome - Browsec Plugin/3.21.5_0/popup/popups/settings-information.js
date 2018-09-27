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
    'title': 'what_is_webrtc_title',
    'text1': 'what_is_webrtc_text_1',
    'text2': 'what_is_webrtc_text_2',
    'text3': 'what_is_webrtc_text_3'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'popup-settings-information',
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
                _this.remove();

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