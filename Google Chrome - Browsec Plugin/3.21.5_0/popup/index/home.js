'use strict';

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  /** @type {Boolean} */
  var webrtcAvailable = function () {
    if (typeof browser !== 'undefined') return true;

    try {
      new ImageData(100, 100);
      return true;
    } catch (error) {
      return false;
    }
  }();

  var _ = backgroundPage._,
      config = backgroundPage.config,
      PolymerRedux = backgroundPage.PolymerRedux,
      proxy = backgroundPage.proxy,
      punycode = backgroundPage.punycode,
      internationalize = backgroundPage['tools'].internationalize;

  /** @type {string} */

  var defaultCountry = config.proxy.defaultCountry || 'nl';

  /** @type {object<string>} */
  var translations = _.transform({
    'change': 'change',
    'connectionsNotEncrypted': 'your_browsers_connections_are_not_encrypted',
    'privacyProtected': 'your_privacy_is_protected',
    'protectionDisabled': 'privacy_protection_disabled',
    'protectMe': 'protect_me'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'index-home',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'countries': {
        'type': Array,
        'value': [],
        'statePath': function statePath(_ref) {
          var servers = _ref.servers,
              premium = _ref['user'].premium;
          return _.transform(servers, function (carry, value, country) {
            var servers = value[premium ? 'premium_servers' : 'servers'];
            if (!servers) return;

            carry.push(country);
          }, []);
        }
      },
      'country': {
        'type': String,
        'statePath': function statePath(_ref2) {
          var country = _ref2['pac'].country;
          return country;
        }
      },
      'countryName': {
        'type': String,
        'computed': 'computeCountryName(country)'
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      },
      'proxyEnabled': {
        'type': Boolean,
        'statePath': function statePath(_ref3) {
          var mode = _ref3['pac'].mode;
          return mode === 'proxy';
        },
        'observer': 'observeProxyEnabled'
      },
      'webrtcAvailable': {
        'type': Boolean,
        'value': webrtcAvailable,
        'readOnly': true
      },
      'withPromo': {
        'type': Boolean,
        'value': false,
        'notify': true,
        'observer': 'observeWithPromo'
      },

      // Show double controls for ON/OFF
      'complexView': {
        'type': Object,
        'statePath': function statePath(state) {
          var domain = state.domain,
              _state$pac = state['pac'],
              pacCountry = _state$pac['country'],
              filters = _state$pac.filters,
              ping = state.ping,
              servers = state.servers,
              premiumUser = state['user']['premium'];

          /** @type {(integer|undefined)} */

          var rating = function () {
            if (!ping.length || !pacCountry) return;

            /** @type {(Object|undefined)} */
            var delayData = ping.find(function (_ref4) {
              var country = _ref4.country,
                  premium = _ref4.premium;
              return country === pacCountry && premium === premiumUser;
            });
            if (!delayData) return;

            return delayData.mark;
          }();

          if (!domain) return { 'enabled': false, rating: rating };

          /** @type {(Object|undefined)} */
          var filter = filters.find(function (_ref5) {
            var disabled = _ref5.disabled,
                ownDomain = _ref5['domain'];
            return !disabled && domain.endsWith(ownDomain);
          });
          if (!filter) {
            return { 'enabled': false, rating: rating };
          }

          var country = filter.country,
              proxyMode = filter.proxyMode;
          domain = filter.domain;

          var view = punycode.toUnicode(domain);

          // Direct filter
          if (!proxyMode) {
            return { domain: domain, 'enabled': true, 'on': false, view: view };
          }

          // Proxy filter
          /** @type {Array<String>} */
          var countries = _.transform(servers, function (carry, value, country) {
            var servers = value[premiumUser ? 'premium_servers' : 'servers'];
            if (!servers) return;

            carry.push(country);
          }, []);

          return {
            'country': countries.includes(country) ? country : defaultCountry,
            domain: domain,
            'enabled': true,
            'on': true,
            view: view
          };
        }
      }
    },

    // Lifecycle
    ready: function ready() {
      var _this = this;

      var root = Polymer.dom(this.root);
      var promo = root.querySelector('index-home-promo');
      this.withPromo = promo.visible;

      promo.addEventListener('visible', function (_ref6) {
        var visible = _ref6['detail'].visible;

        _this.withPromo = visible;
      });

      // Removing useless text nodes
      (function (parent) {
        Array.from(parent.childNodes).forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) return;
          parent.removeChild(node);
        });
      })(Polymer.dom(root.querySelector('div.Active_Country')));
    },


    // Computed properties
    'computeCountryName': function computeCountryName(country) {
      return country ? internationalize('country_name_' + country.toUpperCase()) : '';
    },

    'flagUrl': function flagUrl(flag) {
      return flag ? '/images/flags/' + flag + '.png' : '/images/empty.png';
    },

    /**
    @param {Boolean} complexView
    @return {String} */
    'computeTransition': function computeTransition(complexView) {
      return complexView ? '' : 'transition';
    },

    // Obersvers
    observeWithPromo: function observeWithPromo(withPromo) {
      this.toggleClass('withPromo', withPromo);
    },
    observeProxyEnabled: function observeProxyEnabled(enabled) {
      this.toggleClass('proxyEnabled', enabled);
    },


    // Methods
    proxySwitch: function proxySwitch() {
      proxy[!this.proxyEnabled ? 'enable' : 'disable']();
    },
    domainProxySwitch: function domainProxySwitch() {
      var domain = this.complexView.domain;

      proxy.siteFilters.toggle(domain);
    },
    countryChange: function countryChange() {
      this.dispatch({ 'type': 'Page change', 'page': 'index:locations' });
    },
    domainCountryChange: function domainCountryChange() {
      var domain = this.complexView.domain;

      this.dispatch({
        'type': 'Page change', 'page': 'index:locations:' + domain
      });
    },
    enableProxy: function enableProxy() {
      proxy.enable();
    },
    openLocations: function openLocations() {
      this.dispatch({ 'type': 'Page change', 'page': 'index:locations' });
    },
    openSettings: function openSettings() {
      this.dispatch({ 'type': 'Page change', 'page': 'index:settings' });
    }
  });
})();