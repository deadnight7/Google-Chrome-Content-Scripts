'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      browsecLink = backgroundPage.browsecLink,
      ga = backgroundPage.ga,
      PolymerRedux = backgroundPage.PolymerRedux,
      premiumLink = backgroundPage['pageLinks']['premium'],
      internationalize = backgroundPage['tools'].internationalize;

  /** @type {String} */

  var price = '3.33';

  /** @type {Object<String>} */
  var translations = _.transform({
    'accessInternet': 'access_internet_via_premium_locations',
    'browsecPremium': 'browsec_premium',
    'dedicatedLanes': 'dedicated_traffic_lanes',
    'getPremiumNow': 'get_premium_now',
    'moneyBackGuarantee': '7_days_money_back_guarantee',
    'premiumLocations': 'premium_locations',
    'premiumServers': 'premium_servers',
    'performanceGuaranteed': 'top_performance_guaranteed',
    'turboSpeed': 'turbo_speed'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});
  translations.onlyPricePerMonth = internationalize('only_X_per_month').replace(/XXX/g, price);

  Polymer({
    'is': 'popup-premium',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'country': {
        'type': String,
        'value': ''
      },
      'premiumLink': {
        'type': String,
        'computed': 'computePremiumLink(country, withPrice)'
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      },
      'withPrice': {
        'type': Boolean,
        'value': false,
        'observer': 'observeWithPrice'
      }
    },

    // Lifecycle
    ready: function ready() {
      if (Math.floor(Math.random() * 2) === 1) this.withPrice = true;
    },


    // Computed properties
    'computePremiumLink': function computePremiumLink(country, withPrice) {
      return browsecLink(premiumLink, function (search) {
        return Object.assign(search, {
          'utm_source': 'Chromium extension',
          'utm_medium': 'premium_div',
          'utm_campaign': 'premium_div-' + country,
          'utm_term': withPrice ? 'Get Premium now! only $3.33 per month' : 'Get Premium now!'
        });
      });
    },
    observeWithPrice: function observeWithPrice(withPrice) {
      Polymer.dom(this).classList[withPrice ? 'add' : 'remove']('withPrice');
    },


    // Methods
    linkClick: function linkClick() {
      ga('premium', 'click');

      // for FF and early Chrome
      setTimeout(function () {
        if (window && window.close) window.close();
      }, 50);
    },
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
                  'top': '-100%',
                  'duration': 800,
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