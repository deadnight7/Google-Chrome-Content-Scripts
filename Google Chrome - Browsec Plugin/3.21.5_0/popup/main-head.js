'use strict';

{
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();

  var polymerSettings = {
    'is': 'main-head',

    // Methods
    back: function back() {
      this.dispatch({ 'type': 'Page change', 'page': 'index:home' });
    },
    login: function login() {
      this.dispatch({ 'type': 'Page change', 'page': 'login' });
    }
  };

  if (!backgroundPage) {
    // Private mode Firefox
    polymerSettings.properties = {
      'user': {
        'type': Object,
        'value': { 'guest': true, 'premium': false }
      },
      'indexPage': {
        'type': Boolean,
        'value': true
      },
      'translations': {
        'type': Object,
        'value': {}
      }
    };

    polymerSettings.logout = function () {}; // Empty function
  } else {
    // Normal cases
    var _ = backgroundPage._,
        actions = backgroundPage.actions,
        PolymerRedux = backgroundPage.PolymerRedux,
        internationalize = backgroundPage['tools'].internationalize;

    /** @type {Object<String>} */

    var translations = _.transform({
      'goBack': 'go_back',
      'signIn': 'sign_in',
      'signOut': 'sign_out'
    }, function (carry, value, key) {
      carry[key] = internationalize(value);
    }, {});

    polymerSettings.behaviors = [PolymerRedux(Polymer)];
    polymerSettings.properties = {
      'user': {
        'type': Object,
        'statePath': function statePath(_ref) {
          var user = _ref.user;
          return user;
        }
      },
      'indexPage': {
        'type': Boolean,
        'statePath': function statePath(_ref2) {
          var page = _ref2.page;
          return page.split(':')[0] === 'index';
        }
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    };

    polymerSettings.logout = function () {
      actions.logout();
    };
  }

  Polymer(polymerSettings);
}