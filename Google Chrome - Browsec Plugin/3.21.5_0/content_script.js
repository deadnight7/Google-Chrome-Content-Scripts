require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var proxySettings = {
  'version': 56,
  'countries': {
    'at': {
      'premium_servers': [{ 'host': 'at1.lunrac.com', 'port': 443 }, { 'host': 'at2.lunrac.com', 'port': 443 }, { 'host': 'at3.lunrac.com', 'port': 443 }, { 'host': 'at4.lunrac.com', 'port': 443 }, { 'host': 'at5.lunrac.com', 'port': 443 }, { 'host': 'at6.lunrac.com', 'port': 443 }, { 'host': 'at7.lunrac.com', 'port': 443 }]
    },
    'au': {
      'premium_servers': [{ 'host': 'au2.lunrac.com', 'port': 443 }, { 'host': 'au3.lunrac.com', 'port': 443 }]
    },
    'be': {
      'premium_servers': [{ 'host': 'be1.lunrac.com', 'port': 443 }, { 'host': 'be2.lunrac.com', 'port': 443 }, { 'host': 'be3.lunrac.com', 'port': 443 }, { 'host': 'be4.lunrac.com', 'port': 443 }, { 'host': 'be5.lunrac.com', 'port': 443 }, { 'host': 'be6.lunrac.com', 'port': 443 }, { 'host': 'be7.lunrac.com', 'port': 443 }]
    },
    'bg': {
      'premium_servers': [{ 'host': 'bg1.lunrac.com', 'port': 443 }, { 'host': 'bg2.lunrac.com', 'port': 443 }]
    },
    'ca': {
      'premium_servers': [{ 'host': 'ca1.lunrac.com', 'port': 443 }]
    },
    'ch': {
      'premium_servers': [{ 'host': 'ch1.lunrac.com', 'port': 443 }]
    },
    'de': {
      'premium_servers': [{ 'host': 'de1.lunrac.com', 'port': 443 }, { 'host': 'de2.lunrac.com', 'port': 443 }, { 'host': 'de3.lunrac.com', 'port': 443 }]
    },
    'dk': {
      'premium_servers': [{ 'host': 'dk1.lunrac.com', 'port': 443 }, { 'host': 'dk2.lunrac.com', 'port': 443 }]
    },
    'es': {
      'premium_servers': [{ 'host': 'es1.lunrac.com', 'port': 443 }]
    },
    'fi': {
      'premium_servers': [{ 'host': 'fi1.lunrac.com', 'port': 443 }, { 'host': 'fi2.lunrac.com', 'port': 443 }, { 'host': 'fi3.lunrac.com', 'port': 443 }, { 'host': 'fi4.lunrac.com', 'port': 443 }]
    },
    'fr': {
      'premium_servers': [{ 'host': 'fr1.lunrac.com', 'port': 443 }, { 'host': 'fr2.lunrac.com', 'port': 443 }]
    },
    'hk': {
      'premium_servers': [{ 'host': 'hk1.lunrac.com', 'port': 443 }, { 'host': 'hk2.lunrac.com', 'port': 443 }, { 'host': 'hk3.lunrac.com', 'port': 443 }, { 'host': 'hk4.lunrac.com', 'port': 443 }, { 'host': 'hk5.lunrac.com', 'port': 443 }]
    },
    'ie': {
      'premium_servers': [{ 'host': 'ie1.lunrac.com', 'port': 443 }, { 'host': 'ie2.lunrac.com', 'port': 443 }]
    },
    'in': {
      'premium_servers': [{ 'host': 'in1.lunrac.com', 'port': 443 }, { 'host': 'in2.lunrac.com', 'port': 443 }]
    },
    'it': {
      'premium_servers': [{ 'host': 'it3.lunrac.com', 'port': 443 }]
    },
    'jp': {
      'premium_servers': [{ 'host': 'jp1.lunrac.com', 'port': 443 }, { 'host': 'jp2.lunrac.com', 'port': 443 }, { 'host': 'jp3.lunrac.com', 'port': 443 }, { 'host': 'jp4.lunrac.com', 'port': 443 }, { 'host': 'jp5.lunrac.com', 'port': 443 }, { 'host': 'jp6.lunrac.com', 'port': 443 }, { 'host': 'jp7.lunrac.com', 'port': 443 }, { 'host': 'jp8.lunrac.com', 'port': 443 }]
    },
    'kr': {
      'premium_servers': [{ 'host': 'kr1.lunrac.com', 'port': 443 }]
    },
    'lt': {
      'premium_servers': [{ 'host': 'lt1.lunrac.com', 'port': 443 }, { 'host': 'lt2.lunrac.com', 'port': 443 }]
    },
    'lu': {
      'premium_servers': [{ 'host': 'lu1.lunrac.com', 'port': 443 }]
    },
    'lv': {
      'premium_servers': [{ 'host': 'lv1.lunrac.com', 'port': 443 }]
    },
    'mx': {
      'premium_servers': [{ 'host': 'mx1.lunrac.com', 'port': 443 }]
    },
    'nl': {
      'servers': [{ 'host': 'nl1.postls.com', 'port': 443 }, { 'host': 'nl2.postls.com', 'port': 443 }, { 'host': 'nl3.postls.com', 'port': 443 }, { 'host': 'nl4.postls.com', 'port': 443 }, { 'host': 'nl5.postls.com', 'port': 443 }, { 'host': 'nl6.postls.com', 'port': 443 }, { 'host': 'nl7.postls.com', 'port': 443 }, { 'host': 'nl8.postls.com', 'port': 443 }, { 'host': 'nl9.postls.com', 'port': 443 }, { 'host': 'nl10.postls.com', 'port': 443 }, { 'host': 'nl11.postls.com', 'port': 443 }, { 'host': 'nl12.postls.com', 'port': 443 }, { 'host': 'nl13.postls.com', 'port': 443 }, { 'host': 'nl14.postls.com', 'port': 443 }, { 'host': 'nl15.postls.com', 'port': 443 }, { 'host': 'nl16.postls.com', 'port': 443 }, { 'host': 'nl17.postls.com', 'port': 443 }, { 'host': 'nl18.postls.com', 'port': 443 }, { 'host': 'nl19.postls.com', 'port': 443 }, { 'host': 'nl20.postls.com', 'port': 443 }, { 'host': 'nl21.postls.com', 'port': 443 }, { 'host': 'nl22.postls.com', 'port': 443 }, { 'host': 'nl23.postls.com', 'port': 443 }, { 'host': 'nl26.postls.com', 'port': 443 }, { 'host': 'nl27.postls.com', 'port': 443 }, { 'host': 'nl28.postls.com', 'port': 443 }, { 'host': 'nl29.postls.com', 'port': 443 }, { 'host': 'nl30.postls.com', 'port': 443 }, { 'host': 'nl31.postls.com', 'port': 443 }, { 'host': 'nl32.postls.com', 'port': 443 }, { 'host': 'nl33.postls.com', 'port': 443 }, { 'host': 'nl34.postls.com', 'port': 443 }, { 'host': 'nl35.postls.com', 'port': 443 }, { 'host': 'nl36.postls.com', 'port': 443 }, { 'host': 'nl37.postls.com', 'port': 443 }, { 'host': 'nl38.postls.com', 'port': 443 }, { 'host': 'nl39.postls.com', 'port': 443 }, { 'host': 'nl40.postls.com', 'port': 443 }, { 'host': 'nl41.postls.com', 'port': 443 }, { 'host': 'nl42.postls.com', 'port': 443 }, { 'host': 'nl43.postls.com', 'port': 443 }, { 'host': 'nl44.postls.com', 'port': 443 }, { 'host': 'nl45.postls.com', 'port': 443 }],
      'premium_servers': [{ 'host': 'nl1.lunrac.com', 'port': 443 }, { 'host': 'nl2.lunrac.com', 'port': 443 }, { 'host': 'nl3.lunrac.com', 'port': 443 }, { 'host': 'nl4.lunrac.com', 'port': 443 }, { 'host': 'nl5.lunrac.com', 'port': 443 }, { 'host': 'nl6.lunrac.com', 'port': 443 }, { 'host': 'nl7.lunrac.com', 'port': 443 }, { 'host': 'nl8.lunrac.com', 'port': 443 }]
    },
    'no': {
      'premium_servers': [{ 'host': 'no1.lunrac.com', 'port': 443 }, { 'host': 'no2.lunrac.com', 'port': 443 }]
    },
    'nz': {
      'premium_servers': [{ 'host': 'nz1.lunrac.com', 'port': 443 }]
    },
    'ro': {
      'premium_servers': [{ 'host': 'ro1.lunrac.com', 'port': 443 }, { 'host': 'ro2.lunrac.com', 'port': 443 }]
    },
    'ru': {
      'premium_servers': [{ 'host': 'ru6.lunrac.com', 'port': 443 }, { 'host': 'ru7.lunrac.com', 'port': 443 }, { 'host': 'ru8.lunrac.com', 'port': 443 }, { 'host': 'ru9.lunrac.com', 'port': 443 }, { 'host': 'ru10.lunrac.com', 'port': 443 }, { 'host': 'ru11.lunrac.com', 'port': 443 }, { 'host': 'ru12.lunrac.com', 'port': 443 }, { 'host': 'ru13.lunrac.com', 'port': 443 }, { 'host': 'ru14.lunrac.com', 'port': 443 }]
    },
    'se': {
      'premium_servers': [{ 'host': 'se1.lunrac.com', 'port': 443 }, { 'host': 'se2.lunrac.com', 'port': 443 }, { 'host': 'se3.lunrac.com', 'port': 443 }, { 'host': 'se4.lunrac.com', 'port': 443 }]
    },
    'sg': {
      'servers': [{ 'host': 'sg1.postls.com', 'port': 443 }, { 'host': 'sg2.postls.com', 'port': 443 }, { 'host': 'sg3.postls.com', 'port': 443 }, { 'host': 'sg4.postls.com', 'port': 443 }, { 'host': 'sg5.postls.com', 'port': 443 }, { 'host': 'sg6.postls.com', 'port': 443 }, { 'host': 'sg7.postls.com', 'port': 443 }, { 'host': 'sg8.postls.com', 'port': 443 }, { 'host': 'sg9.postls.com', 'port': 443 }, { 'host': 'sg10.postls.com', 'port': 443 }, { 'host': 'sg11.postls.com', 'port': 443 }, { 'host': 'sg12.postls.com', 'port': 443 }, { 'host': 'sg13.postls.com', 'port': 443 }],
      'premium_servers': [{ 'host': 'sg1.lunrac.com', 'port': 443 }, { 'host': 'sg2.lunrac.com', 'port': 443 }, { 'host': 'sg3.lunrac.com', 'port': 443 }, { 'host': 'sg4.lunrac.com', 'port': 443 }]
    },
    'tr': {
      'premium_servers': [{ 'host': 'tr1.lunrac.com', 'port': 443 }, { 'host': 'tr2.lunrac.com', 'port': 443 }, { 'host': 'tr3.lunrac.com', 'port': 443 }, { 'host': 'tr4.lunrac.com', 'port': 443 }, { 'host': 'tr5.lunrac.com', 'port': 443 }, { 'host': 'tr6.lunrac.com', 'port': 443 }]
    },
    'ua': {
      'premium_servers': [{ 'host': 'ua1.lunrac.com', 'port': 443 }]
    },
    'uk': {
      'servers': [{ 'host': 'uk1.postls.com', 'port': 443 }, { 'host': 'uk2.postls.com', 'port': 443 }, { 'host': 'uk4.postls.com', 'port': 443 }, { 'host': 'uk5.postls.com', 'port': 443 }, { 'host': 'uk6.postls.com', 'port': 443 }, { 'host': 'uk7.postls.com', 'port': 443 }, { 'host': 'uk8.postls.com', 'port': 443 }, { 'host': 'uk9.postls.com', 'port': 443 }, { 'host': 'uk10.postls.com', 'port': 443 }, { 'host': 'uk11.postls.com', 'port': 443 }, { 'host': 'uk12.postls.com', 'port': 443 }, { 'host': 'uk13.postls.com', 'port': 443 }, { 'host': 'uk14.postls.com', 'port': 443 }, { 'host': 'uk15.postls.com', 'port': 443 }, { 'host': 'uk16.postls.com', 'port': 443 }, { 'host': 'uk17.postls.com', 'port': 443 }, { 'host': 'uk18.postls.com', 'port': 443 }, { 'host': 'uk19.postls.com', 'port': 443 }, { 'host': 'uk20.postls.com', 'port': 443 }, { 'host': 'uk21.postls.com', 'port': 443 }],
      'premium_servers': [{ 'host': 'uk1.lunrac.com', 'port': 443 }, { 'host': 'uk2.lunrac.com', 'port': 443 }, { 'host': 'uk3.lunrac.com', 'port': 443 }, { 'host': 'uk4.lunrac.com', 'port': 443 }, { 'host': 'uk5.lunrac.com', 'port': 443 }, { 'host': 'uk6.lunrac.com', 'port': 443 }, { 'host': 'uk7.lunrac.com', 'port': 443 }, { 'host': 'uk8.lunrac.com', 'port': 443 }, { 'host': 'uk9.lunrac.com', 'port': 443 }, { 'host': 'uk10.lunrac.com', 'port': 443 }, { 'host': 'uk11.lunrac.com', 'port': 443 }]
    },
    'us': {
      'servers': [{ 'host': 'us1.postls.com', 'port': 443 }, { 'host': 'us2.postls.com', 'port': 443 }, { 'host': 'us3.postls.com', 'port': 443 }, { 'host': 'us4.postls.com', 'port': 443 }, { 'host': 'us5.postls.com', 'port': 443 }, { 'host': 'us6.postls.com', 'port': 443 }, { 'host': 'us7.postls.com', 'port': 443 }, { 'host': 'us8.postls.com', 'port': 443 }, { 'host': 'us9.postls.com', 'port': 443 }, { 'host': 'us10.postls.com', 'port': 443 }, { 'host': 'us11.postls.com', 'port': 443 }, { 'host': 'us13.postls.com', 'port': 443 }, { 'host': 'us14.postls.com', 'port': 443 }, { 'host': 'us15.postls.com', 'port': 443 }, { 'host': 'us16.postls.com', 'port': 443 }, { 'host': 'us17.postls.com', 'port': 443 }, { 'host': 'us18.postls.com', 'port': 443 }, { 'host': 'us19.postls.com', 'port': 443 }, { 'host': 'us20.postls.com', 'port': 443 }, { 'host': 'us21.postls.com', 'port': 443 }, { 'host': 'us22.postls.com', 'port': 443 }, { 'host': 'us23.postls.com', 'port': 443 }, { 'host': 'us27.postls.com', 'port': 443 }, { 'host': 'us31.postls.com', 'port': 443 }, { 'host': 'us32.postls.com', 'port': 443 }],
      'premium_servers': [{ 'host': 'us3.lunrac.com', 'port': 443 }, { 'host': 'us4.lunrac.com', 'port': 443 }, { 'host': 'us5.lunrac.com', 'port': 443 }, { 'host': 'us6.lunrac.com', 'port': 443 }, { 'host': 'us8.lunrac.com', 'port': 443 }, { 'host': 'us9.lunrac.com', 'port': 443 }]
    },
    'usw': {
      'premium_servers': [{ 'host': 'usw10.lunrac.com', 'port': 443 }, { 'host': 'usw11.lunrac.com', 'port': 443 }, { 'host': 'usw12.lunrac.com', 'port': 443 }, { 'host': 'usw13.lunrac.com', 'port': 443 }, { 'host': 'usw14.lunrac.com', 'port': 443 }, { 'host': 'usw15.lunrac.com', 'port': 443 }]
    },
    'za': {
      'premium_servers': [{ 'host': 'za1.lunrac.com', 'port': 443 }]
    }
  }
};

module.exports = proxySettings;

},{}],2:[function(require,module,exports){
'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _browser = typeof browser !== 'undefined' ? browser : chrome;

window.addEventListener('message', function (event) {
  var sourceDomain = function () {
    try {
      return new URL(event.origin).origin;
    } catch (e) {}
  }();
  if (!sourceDomain) return;

  var targetDomain = new URL(_config2.default.baseUrl).origin;
  if (sourceDomain !== targetDomain) return;

  _browser.runtime.sendMessage(event.data);
});

},{"config":"config"}],"browserConfig":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'name': 'chrome'
};

},{}],"config":[function(require,module,exports){
'use strict';

var proxySettings = require('./proxySettings');

module.exports = {
  'type': 'production',
  'name': 'Browsec VPN - Free and Unlimited VPN',
  'shortName': 'Browsec',
  'apiServerUrls': ['https://browsec.com/api/v1', 'https://drah7iczdw1tu.cloudfront.net/v1'],
  'baseUrl': 'https://browsec.com',
  'ga': {
    'enabled': true,
    'extension_id': ['omghfjlpggmjjaagoclmmobgdodcjboh', 'dknfpcdpbkjijldegonllfnnfhabjpde', '05908b89-695d-4687-aa36-6d87f42a464d' // NOTE temporary
    ],
    'tracking_id': 'UA-43024042-1',
    'chance': 0.01,
    'firstPremiumBuy': 'UA-43024042-2'
  },
  'auth': {
    // When disabled, users can't login/register
    'enabled': true
  },
  'proxy': {
    'defaultCountry': 'nl',
    'settings': proxySettings
  }
};

},{"./proxySettings":1}]},{},[2]);
