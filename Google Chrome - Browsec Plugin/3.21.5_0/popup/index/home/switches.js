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

  var translations = _.transform({ 'otherWebsites': 'other_websites' }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'index-home-switches',
    'properties': {
      'proxyEnabled': {
        'type': Boolean,
        'notify': true
      },
      'proxyCountry': {
        'type': String,
        'notify': true
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      },
      'view': {
        'type': Object,
        'notify': true
      }
    },

    // Computed properties
    'flagUrl': function flagUrl(flag) {
      return flag ? '/images/flags/' + flag + '.png' : '/images/empty.png';
    },

    // Methods
    proxySwitch: function proxySwitch() {
      this.fire('proxyswitch');
    },
    domainProxySwitch: function domainProxySwitch() {
      this.fire('domainproxyswitch');
    },
    countryChange: function countryChange() {
      this.fire('countrychange');
    },
    domainCountryChange: function domainCountryChange() {
      this.fire('domaincountrychange');
    }
  });
})();