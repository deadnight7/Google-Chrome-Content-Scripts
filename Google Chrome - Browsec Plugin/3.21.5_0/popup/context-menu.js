'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      Browser = backgroundPage.Browser,
      Counters = backgroundPage.Counters,
      ga = backgroundPage.ga,
      siteFilters = backgroundPage['proxy'].siteFilters,
      PolymerRedux = backgroundPage.PolymerRedux,
      punycode = backgroundPage.punycode,
      internationalize = backgroundPage['tools'].internationalize;

  /** @type {Object<String>} */

  var translations = _.transform({
    'help': 'help',
    'addSettingFor': 'add_smart_setting_for_X',
    'deleteSettingFor': 'delete_smart_setting_for_X',
    'editSmartSettings': 'edit_smart_settings'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'context-menu',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'containsFilter': {
        'type': Boolean,
        'value': null
      },
      'domain': {
        'type': String,
        'value': '',
        'notify': true
      },
      'showEditSmartSettings': {
        'type': Boolean,
        'statePath': function statePath(_ref) {
          var page = _ref.page;

          var parts = page.split(':');
          return parts[0] !== 'index' || parts[1] !== 'filters';
        }
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    'conditionState': function conditionState(domain, containsFilter, value) {
      return !domain ? false : containsFilter === Boolean(value);
    },

    // Computed properties
    'domainTextTranslation': function domainTextTranslation(property, domain) {
      domain = punycode.toUnicode(domain);
      return translations[property].replace(/XXX/g, domain);
    },

    /// Methods
    addFilter: function addFilter() {
      var _getState = this.getState(),
          filters = _getState['pac'].filters,
          premiumUser = _getState['user']['premium'];

      if (premiumUser || !filters.length) {
        // Moving to filters page with specific domain
        this.dispatch({
          'type': 'Page change', 'page': 'index:filters:' + this.domain
        });
      } else this.showPremiumPopup();

      this.remove();
    },
    removeFilter: function removeFilter() {
      siteFilters.remove(this.domain);
      this.remove();
    },
    editSettings: function editSettings() {
      Counters.increase('popup: smart settings: open list');

      this.dispatch({ 'type': 'Page change', 'page': 'index:filters' });
      this.remove();
    },
    openHelp: function openHelp() {
      Counters.increase('popup: smart settings: open help');

      Browser.tabs.create('/pages/help/help.html');

      this.remove();
    },
    showPremiumPopup: function showPremiumPopup() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var popupPremium;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                popupPremium = document.createElement('popup-premium-onerule');

                popupPremium.setAttribute('style', 'top:-100%;');
                document.body.append(popupPremium);

                ga('premium', 'show');

                _context.next = 6;
                return window.anime({
                  'targets': popupPremium,
                  'top': 0,
                  'duration': 800,
                  'easing': 'linear'
                }).finished;

              case 6:
                popupPremium.removeAttribute('style');

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  });
})();