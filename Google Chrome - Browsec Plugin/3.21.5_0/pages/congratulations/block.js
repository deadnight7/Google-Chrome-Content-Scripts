'use strict';

{
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  var _browser$extension$ge = _browser.extension.getBackgroundPage(),
      _ = _browser$extension$ge._,
      browsecLink = _browser$extension$ge.browsecLink,
      PolymerRedux = _browser$extension$ge.PolymerRedux,
      pageLinks = _browser$extension$ge.pageLinks,
      internationalize = _browser$extension$ge['tools'].internationalize;

  /** @type {object<string>} */


  var translations = _.transform({
    'accessPremiumLocations': 'access_internet_via_premium_locations',
    'activated': 'browsec_activated',
    'checkPremiumPlans': 'check_browsec_premium_plans',
    'clickToolbarIconAndTurnOn': 'click_icon_on_toolbar_and_turn_on_protection',
    'dedicatedLanes': 'dedicated_traffic_lanes',
    'getMoreWithPremium': 'get_more_with_browsec_premium',
    'performanceGuaranteed': 'top_performance_guaranteed',
    'premiumLocations': 'premium_locations',
    'premiumServers': 'premium_servers',
    'surfingSecured': 'congratulations_securing_your_browsing',
    'turboSpeed': 'turbo_speed'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'main-block',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'premiumLink': {
        'type': String,
        'statePath': function statePath(_ref) {
          var days = _ref['daysAfterInstall'];
          return browsecLink(pageLinks.premium, function (search) {
            return _.assign(search, {
              'utm_source': 'Chromium extension',
              'utm_medium': 'congratulations_page',
              'utm_campaign': 'congratulations_page'
            });
          });
        }
      },
      'mainLink': {
        'type': String,
        'statePath': function statePath(_ref2) {
          var days = _ref2['daysAfterInstall'];
          return browsecLink(pageLinks.base, function (search) {
            return _.assign(search, {
              'utm_source': 'Chromium extension',
              'utm_medium': 'logo_link',
              'utm_campaign': 'congratulations'
            });
          });
        }
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    }
  });
}