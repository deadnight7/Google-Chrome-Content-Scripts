(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _slide = require('tools/slide');

var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

var _browser = typeof browser !== 'undefined' ? browser : chrome;

var _browser$extension$ge = _browser.extension.getBackgroundPage(),
    _ = _browser$extension$ge._,
    internationalize = _browser$extension$ge['tools'].internationalize;

/** @type {Object<String>} */

var translations = _.transform({
  // 1st block
  'enableForSelectedSites': 'enable_browsec_only_for_selected_sites',
  'enableForSelectedSitesDescription1': 'enable_browsec_only_for_selected_sites_description_1',
  'enableForSelectedSitesDescription2': 'enable_browsec_only_for_selected_sites_description_2',
  'enableForSelectedSitesDescription3': 'enable_browsec_only_for_selected_sites_description_3',

  // 2nd block
  'enableForAllSitesExcludingSelected': 'enable_browsec_for_all_sites_excluding_selected_sites',
  'enableForAllSitesExcludingSelectedDescription1': 'enable_browsec_for_all_sites_excluding_selected_sites_description_1',
  'enableForAllSitesExcludingSelectedDescription2': 'enable_browsec_for_all_sites_excluding_selected_sites_description_2',
  'enableForAllSitesExcludingSelectedDescription3': 'enable_browsec_for_all_sites_excluding_selected_sites_description_3',

  // 3rd block
  'useDifferentLocationsForDifferentSites': 'use_different_locations_for_different_sites',
  'useDifferentLocationsForDifferentSitesDescription1': 'use_different_locations_for_different_sites_description_1',
  'useDifferentLocationsForDifferentSitesDescription2': 'use_different_locations_for_different_sites_description_2',
  'useDifferentLocationsForDifferentSitesDescription3': 'use_different_locations_for_different_sites_description_3',

  'howToUseSmartSettings': 'how_to_use_smart_settings',
  'iWantTo': 'i_want_to'

  /*
  'enableForAllSitesExcludingSelected':
    'enable_browsec_for_all_sites_excluding_selected_sites',
  'enableForSelectedSites': 'enable_browsec_only_for_selected_sites',
  'howToUseSmartSettings': 'how_to_use_smart_settings',
  'iWantTo': 'i_want_to'*/
}, function (carry, value, key) {
  carry[key] = internationalize(value);
}, {});

/** Translations with images in code
@type {Object<String>} */
var imageTranslations = _.transform({
  'enableForAllSitesExcludingSelectedDescription': 'enable_browsec_for_all_sites_excluding_selected_sites_description',
  'enableForSelectedSitesDescription': 'enable_browsec_only_for_selected_sites_description',
  'useAnotherLocationForSelectedSitesDescription': 'use_another_location_for_selected_sites_description'
}, function (carry, value, key) {
  carry[key] = internationalize(value).replace(/IMG/, '<img src="/images/help/plus.png" width="23" height="13" alt="" />');
}, {});

_.assign(translations, imageTranslations);

Polymer({
  'is': 'main-block',
  'properties': {
    'freeze': {
      'type': Boolean,
      'value': false
    },
    'translations': {
      'type': Object,
      'value': translations,
      'readOnly': true
    }
  },

  // Lifecycle
  ready: function ready() {
    var _this = this;

    /** All nodes with image replacement */
    _.toArray(Polymer.dom(this.root).querySelectorAll('[data-role="with image"]')).forEach(function (element) {
      /** @type {String} */
      var text = element.textContent.trim();

      /** @type {Array<Array<Node>>} */
      var parts = text.split('IMG').map(function (text, index) {
        if (!index) return [document.createTextNode(text)];

        /** @type {Element} */
        var img = _.transform({
          'src': '/images/help/plus.png',
          'width': '23',
          'height': '13',
          'alt': ''
        }, function (img, value, attribute) {
          img.setAttribute(attribute, value);
        }, document.createElement('img'));

        return [img, document.createTextNode(text)];
      });

      /** @type {Array<Node>} */
      var nodes = _.flatten(parts);

      // Removing all nodes inside element
      _.toArray(element.childNodes).forEach(function (node) {
        element.removeChild(node);
      });
      nodes.forEach(function (node) {
        element.appendChild(node);
      });
    });

    /** @type {Array<Object>} */
    var objects = _.toArray(Polymer.dom(this.root).querySelectorAll('[data-role="section"]')).map(function (element, index) {
      /** @type {Object} */
      var elements = {
        /** @type {PolymerElement} */
        'parent': Polymer.dom(element),

        /** @type {Element} */
        'trigger': element.querySelector('[data-click="trigger"]'),

        /** @type {Element} */
        'information': element.querySelector('div.Section_Information')
      };

      elements.trigger.addEventListener('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var currentObject, otherIndexes, promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this.freeze) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:

                _this.freeze = true;

                /** @type {Object} */
                currentObject = objects[index];

                /** @type {Array<integer>} */

                otherIndexes = _.without(indexes, index).filter(function (index) {
                  return objects[index].visible;
                });

                /** @type {Array<Promise>} */

                promises = otherIndexes.map(function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
                    var elements;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            /** @type {Object<Element>} */
                            elements = objects[index].elements;

                            elements.information.style.cssText = 'display:block;overflow:hidden';
                            _context.next = 4;
                            return window.anime({
                              'targets': elements.information,
                              'height': 0,
                              'duration': 700,
                              'easing': 'linear'
                            }).finished;

                          case 4:

                            elements.parent.classList.remove('open');
                            elements.information.style.cssText = '';
                            objects[index].visible = false;

                          case 7:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());

                promises.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var action;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return (0, _slide2.default)(window.anime, currentObject.visible ? 'up' : 'down', currentObject.elements.information, {
                            'duration': 700,
                            'easing': 'linear'
                          }).finished;

                        case 2:

                          /** @type {String} */
                          action = currentObject.visible ? 'remove' : 'add';

                          currentObject.elements.parent.classList[action]('open');
                          currentObject.elements.information.style.cssText = '';
                          currentObject.visible = !currentObject.visible;

                        case 6:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                }))());

                _context3.next = 9;
                return Promise.all(promises);

              case 9:

                _this.freeze = false;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      })));

      return { elements: elements, 'visible': false };
    });

    /** @type {Array<integer>} */
    var indexes = objects.map(function (x, index) {
      return index;
    });
  }
});

},{"tools/slide":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
@function
@param {Function} anime
@param {String} direction
@param {Element} element
@param {Object} properties
@return {Object} */
exports.default = function (anime, direction, element) {
  var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  /** @type {Object} */
  var targetProperties = {};
  if (direction === 'up') {
    // Hide
    Object.assign(targetProperties, {
      'border-top-width': 0,
      'border-bottom-width': 0,
      'padding-top': 0,
      'padding-bottom': 0,
      'height': 0
    });

    element.style.cssText = 'overflow:hidden;';
  } else {
    // Show
    element.style.cssText = 'display:block;';
    /** @type {CSSStyleDeclaration} */
    var style = getComputedStyle(element);

    Object.assign(targetProperties, {
      'border-top-width': style['border-top-width'],
      'border-bottom-width': style['border-bottom-width'],
      'padding-top': style['padding-top'],
      'padding-bottom': style['padding-bottom'],
      'height': style['height']
    });

    element.style.cssText = ['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom', 'height'].reduce(function (carry, property) {
      return carry + (property + ':0px;');
    }, 'overflow:hidden;display:block;');
  }

  return anime(Object.assign({ 'targets': element }, targetProperties, properties));
};

},{}]},{},[1]);
