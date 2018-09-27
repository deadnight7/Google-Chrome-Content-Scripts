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
    'browsecPremium': 'browsec_premium',
    'moneyBackGuarantee': '7_days_money_back_guarantee',
    'oneSmartSettingDescription1': 'one_smart_setting_description_1',
    'oneSmartSettingDescription2': 'one_smart_setting_description_2',
    'oneSmartSettingDescriptionList1': 'one_smart_setting_description_list_1',
    'oneSmartSettingDescriptionList2': 'one_smart_setting_description_list_2',
    'upgradeToPremium': 'upgrade_to_premium',
    'youCanHaveOnlyOneSmartSetting': 'you_can_have_only_1_smart_setting'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});
  translations.onlyPricePerMonth = internationalize('only_X_per_month').replace(/XXX/, price);

  Polymer({
    'is': 'popup-premium-onerule',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'premiumLink': {
        'type': String,
        'value': browsecLink(premiumLink, function (search) {
          return Object.assign(search, {
            'utm_source': 'Chromium extension',
            'utm_medium': 'premium_div',
            'utm_campaign': 'premium_div_smartlocations',
            'utm_term': 'Upgrade to Premium. Only $3.33 per month'
          });
        })
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
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