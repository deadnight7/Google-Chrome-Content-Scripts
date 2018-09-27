(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _CharsBuffer = require('tools/CharsBuffer');

var _CharsBuffer2 = _interopRequireDefault(_CharsBuffer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
    'browsecOff': 'browsec_off',
    'off': 'off'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  Polymer({
    'is': 'filters-country-list',
    'properties': {
      'country': {
        'type': String,
        'value': null
      },
      'countries': {
        'type': Array, /** @type {Array<Object>} */
        'value': []
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    // Lifecycle
    ready: function ready() {
      this.keydownListener = this.keydownListener.bind(this);
    },
    attached: function attached() {
      var _this = this;

      /** @type {PolymerElement} */
      var root = Polymer.dom(this.root);

      this.charsBuffer = new _CharsBuffer2.default();
      document.addEventListener('keydown', this.keydownListener);

      /** @type {Element} */
      var domRepeat = root.querySelector('template[is="dom-repeat"]');

      // Force <dom-repeat> render
      domRepeat.render();

      /** @type {Array<Object<String>>} */
      var namesData = domRepeat.items.map(function (_ref) {
        var code = _ref.code,
            name = _ref.name;
        return { code: code, 'name': name.toLowerCase() };
      });

      /** @type {Array<NameListElement>} */
      this.namesList = Array.from(root.children).filter(function (element) {
        return element.tagName.toLowerCase() === 'div';
      }).slice(1).map(function (element, index) {
        return Object.assign({ element: element }, namesData[index]);
      });

      // Add OFF element
      this.namesList.unshift({
        'code': null,
        'element': root.querySelector('div.Off > div.E'),
        'name': 'OFF'
      });

      this.charsBuffer.addListener(function (word) {
        /** @type {(Object|undefined)} */
        var match = _this.namesList.find(function (_ref2) {
          var code = _ref2.code,
              name = _ref2.name;
          return code && name.startsWith(word);
        });
        if (!match) return;

        var element = match.element,
            code = match.code;

        _this.country = code;

        // Scroll to this element
        _this.scrollTop = element.offsetTop - 2;
      });
    },
    detached: function detached() {
      document.removeEventListener('keydown', this.keydownListener);
    },

    // Computed properties
    'flagUrl': function flagUrl(flag) {
      return flag ? '/images/flags/' + flag + '.png' : '/images/empty.png';
    },

    'isElementHighlighted': function isElementHighlighted(current, local) {
      local = local || null;
      return current === local ? 'highlighted' : '';
    },

    // Methods
    elementClick: function elementClick(_ref3) {
      var model = _ref3.model;

      /** @type {String} */
      var country = model.get('item.code');

      this.fire('select', country);
      this.remove();
    },
    elementHighlight: function elementHighlight(event) {
      var model = event.model;

      /** @type {Boolean} */

      var mouseReallyMoved = Boolean('movementX' in event ? event.movementX || event.movementY : event.webkitMovementX || event.webkitMovementY);
      if (!mouseReallyMoved) return;

      /** @type {String} */
      var country = model ? model.get('item.code') : null;

      this.country = country;
    },
    keydownListener: function keydownListener(event) {
      var _this2 = this;

      var key = event.key;

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();

        /** @type {integer} */
        var newHighlightedIndex = function () {
          /** @type {integer} */
          var length = _this2.namesList.length;

          /** @type {integer} */
          var index = _this2.namesList.findIndex(function (_ref4) {
            var code = _ref4.code;
            return code === _this2.country;
          });
          index = index + (key === 'ArrowDown' ? 1 : -1);

          return (index + length) % length;
        }();

        /** @type {NameListItem} */
        var data = this.namesList[newHighlightedIndex];

        this.country = data.code;

        // Scroll whole list if new item is partially or not visible
        /** @type {Number} */
        var topEdge = this.scrollTop;

        /** @type {Number} */
        var screenHeight = this.offsetHeight;

        /** @type {Number} */
        var bottomEdge = topEdge + screenHeight;

        /** @type {Number} */
        var newElementHeight = data.element.offsetHeight;

        /** @type {Number} */
        var newElementTopEdge = data.element.offsetTop;

        /** @type {Number} */
        var newElementBottomEdge = newElementTopEdge + newElementHeight;

        /** @type {Boolean} */
        var visible = newElementTopEdge >= topEdge && newElementBottomEdge <= bottomEdge;
        if (visible) return;

        /** @type {Number} */
        var scrollTop = function () {
          // Hidden item at bottom
          if (newElementTopEdge >= topEdge) {
            return newElementBottomEdge - screenHeight + 2;
          }

          // Hidden item at top
          return newElementTopEdge - 2;
        }();
        this.scrollTop = scrollTop;
        return;
      }
      if (key === 'Enter') {
        if (this.country) this.fire('select', this.country);else this.fire('disable');

        this.remove();
        return;
      }

      this.charsBuffer.keydownListener(event);
    },
    offClick: function offClick() {
      this.fire('disable');
      this.remove();
    }
  });
})(); /**
      @typedef {Object} CountryObject
      @property {String} code
      @property {String} name
      
      @typedef {Object} NameListElement
      @property {String} code
      @property {Element} element
      @property {String} name */

},{"tools/CharsBuffer":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  /** @type {String} */
  this.word = '';

  /** @type {Array<Function>} */
  this.listeners = [];

  // this.lastTimestamp;

  /**
  @method
  @param {String} */
  this.addChar = function (char) {
    /** @type {String} */
    var word = _this.word;

    /** @type {Number} */
    var timestamp = performance.now();

    /** @type {Boolean} */
    var clear = !_this.lastTimestamp ? true : timestamp - _this.lastTimestamp > 700;
    if (clear) word = '';
    word += char;

    _this.lastTimestamp = timestamp;

    if (word === _this.word) return;

    _this.word = word;

    _this.listeners.forEach(function (listener) {
      listener(word);
    });
  };

  /**
  @method
  @param {Function} listener */
  this.addListener = function (listener) {
    _this.listeners.push(listener);
  };

  /**
  @method
  @param {Function} listener */
  this.removeListener = function (listener) {
    _this.listeners = _this.listeners.filter(function (item) {
      return item !== listener;
    });
  };

  /**
  @method */
  this.keydownListener = function (event) {
    var code = event.code,
        key = event.key;

    if (key === ' ') event.preventDefault();

    /** @type {(String|undefined)} */
    var symbol = code ? code.replace(/^key/i, '') : key;
    if (symbol === 'Space') symbol = ' ';
    if (!symbol || symbol.length !== 1 || !/[ a-z]/i.test(symbol)) return;

    symbol = symbol.toLowerCase();

    _this.addChar(symbol);
  };
};

; /** @class */

},{}]},{},[1]);
