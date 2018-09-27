'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  /** @type {Object} */
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** @type {(Object|null)} */
  var backgroundPage = _browser.extension.getBackgroundPage();
  if (!backgroundPage) return;

  var _ = backgroundPage._,
      actions = backgroundPage.actions,
      browsecLink = backgroundPage.browsecLink,
      PolymerRedux = backgroundPage.PolymerRedux,
      pageLinks = backgroundPage.pageLinks,
      internationalize = backgroundPage['tools'].internationalize;

  /**
  @param {Object} data
  @return {Object} */

  var transform = function transform(data) {
    return _.transform(data, function (carry, value, key) {
      carry[key] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? transform(value) : internationalize(value);
    }, {});
  };

  /** @type {object<string>} */
  var translations = transform({
    'dontHaveAnAccount': 'dont_have_an_account',
    'email': 'email',
    'forgotYourPassword': 'forgot_your_password',
    'logIn': 'log_in',
    'password': 'password',
    'signIn': 'sign_in',
    'signUp': 'sign_up',
    'welcomeBack': 'welcome_back',
    'errors': {
      'incorrectEmailOrPassword': 'incorrect_email_or_password',
      'noConnection': 'authentication_error_no_connection'
    }
  });

  Polymer({
    'is': 'main-login',
    'behaviors': [PolymerRedux(Polymer)],
    'properties': {
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      },
      'links': {
        'type': Object,
        'statePath': function statePath(_ref) {
          var days = _ref['daysAfterInstall'];
          return {
            'resetPassword': browsecLink(pageLinks.resetPassword),
            'signUp': browsecLink(pageLinks.newUser)
          };
        }
      },
      'pageLinks': {
        'type': Object,
        'value': pageLinks,
        'readOnly': true
      },
      'error': {
        'type': String,
        'notify': true
      },
      'notice': {
        'type': String,
        'notify': true
      }
    },

    // Lifecycle
    ready: function ready() {
      var root = Polymer.dom(this.root);

      // Nodes
      var $ = function $(selector) {
        return root.querySelector(selector);
      };
      this.nodes = {
        'mail': $('input[type="text"][name="email"]'),
        'password': $('input[type="password"][name="password"]'),
        'if': {
          'error': $('#ifError'),
          'notice': $('#ifNotice')
        }
      };

      // Popup close after link click for FF and early Chrome
      root.querySelectorAll('a').forEach(function (node) {
        node.addEventListener('click', function () {
          setTimeout(function () {
            if (window && window.close) window.close();
          }, 50);
        });
      });
    },
    attached: function attached() {
      this.nodes.mail.focus();
    },


    // Conditional rendering
    'conditionInputClass': function conditionInputClass(error) {
      return error ? 'invalid' : '';
    },

    // Methods
    formSubmit: function formSubmit(event) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var email, password, status, property, errorView;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();
                _this.error = null;
                _this.notice = null;

                /** @type {String} */
                email = _this.nodes.mail.value;

                /** @type {String} */

                password = _this.nodes.password.value;
                _context2.prev = 5;
                _context2.next = 8;
                return actions.login({ email: email, password: password });

              case 8:

                _this.notice = translations.welcomeBack;
                _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var noticeView;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this.nodes.if.notice.render();

                          /** @type {Element} */
                          noticeView = Polymer.dom(_this.root).querySelector('div.Notice');


                          noticeView.setAttribute('style', 'opacity: 0');
                          _context.next = 5;
                          return window.anime({
                            'targets': noticeView,
                            'opacity': 1,
                            'duration': 200,
                            'easing': 'linear'
                          }).finished;

                        case 5:
                          noticeView.removeAttribute('style');

                        case 6:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }))();

                setTimeout(function () {
                  _this.dispatch({ 'type': 'Page change', 'page': 'index:home' });
                }, 1000);
                _context2.next = 25;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](5);

                /** @type {(integer|undefined)} */
                status = _context2.t0.status;

                /** @type {String} */

                property = status === 401 ? 'incorrectEmailOrPassword' : 'noConnection';

                _this.error = translations.errors[property];
                if (status === 401) _this.nodes.password.value = '';

                _this.nodes.if.error.render();

                /** @type {Element} */
                errorView = Polymer.dom(_this.root).querySelector('div.Error');


                errorView.setAttribute('style', 'opacity: 0');
                _context2.next = 24;
                return window.anime({
                  'targets': errorView,
                  'opacity': 1,
                  'duration': 200
                }).finished;

              case 24:
                errorView.removeAttribute('style');

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[5, 13]]);
      }))();
    },
    onAnimationComplete: function onAnimationComplete() {
      this.nodes.mail.focus();
    }
  });
})();