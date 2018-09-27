'use strict';

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
    'on': 'on',
    'off': 'off'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'c-switch',
    'properties': {
      'on': {
        'type': Boolean,
        'notify': true,
        'observer': 'observeOn'
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    // Property observers
    observeOn: function observeOn(newValue, oldValue) {
      this.toggleClass('on', newValue);
    }
  });
})();