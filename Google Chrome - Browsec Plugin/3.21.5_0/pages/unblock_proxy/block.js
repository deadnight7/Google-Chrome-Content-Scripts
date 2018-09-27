'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

{
  // Chrome only page
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  var _browser$extension$ge = _browser.extension.getBackgroundPage(),
      _ = _browser$extension$ge._,
      browsecLink = _browser$extension$ge.browsecLink,
      Browser = _browser$extension$ge.Browser,
      log = _browser$extension$ge.log,
      proxy = _browser$extension$ge.proxy,
      pageLinks = _browser$extension$ge.pageLinks,
      internationalize = _browser$extension$ge['tools'].internationalize;

  /** @type {Object<String>} */


  var translations = _.transform({
    'becauseYourProxySettingsAreBlocked': 'because_your_proxy_settings_are_blocked',
    'browsecIsEnabled': 'browsec_is_enabled',
    'cantSetupSecureConnection': 'cant_setup_secure_connection',
    'contactSupport': 'contact_support',
    'continueUsingBrowsecToOpenWebsites': 'continue_using_browsec_to_open_websites',
    'disableSelectedExtensions': 'disable_selected_extensions',
    'fixProxySettings': 'fix_proxy_settings',
    'pleaseTryAgainOrContactSupport': 'please_try_again_or_contact_support',
    'selectAllowInPopupWindow': 'select_allow_in_popup_window',
    'somethingWentWrong': 'something_went_wrong',
    'tryAgain': 'try_again',
    'yourProxySettingsAreBlocked': 'your_proxy_settings_are_blocked'
  }, function (carry, value, key) {
    carry[key] = internationalize(value);
  }, {});

  /**
  @function
  @return {Promise} */
  var permissionRequest = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var allowed;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                chrome.permissions.request({ 'permissions': ['management'] }, resolve);
              });

            case 2:
              allowed = _context.sent;

              if (allowed) {
                _context.next = 5;
                break;
              }

              throw new Error('Management permission is not granted');

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function permissionRequest() {
      return _ref.apply(this, arguments);
    };
  }();

  Polymer({
    'is': 'main-block',
    'properties': {
      'contactSupportUrl': {
        'type': String,
        'value': browsecLink(pageLinks.contactUs),
        'readOnly': true
      },
      'extensions': {
        'type': Array,
        'value': []
      },
      'hasManagement': {
        'type': Boolean,
        'value': false
      },
      'logoUrl': {
        'type': String,
        'value': browsecLink('https://browsec.com/?utm_source=Chromium+extension&utm_medium=logo_link&utm_campaign=congratulations'),
        'readOnly': true
      },
      'mode': {
        'type': String,
        'value': 'information' // OR 'success' OR 'error'
      },
      'translations': {
        'type': Object,
        'value': translations,
        'readOnly': true
      }
    },

    ready: function ready() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref2, permissions;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Browser.permissions.getAll();

              case 2:
                _ref2 = _context2.sent;
                permissions = _ref2.permissions;

                if (permissions.includes('management')) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return');

              case 6:

                _this.hasManagement = true;
                _this.getExtensionsList(); // lists the extensions to turn off

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))();
    },


    'comparison': function comparison(mode, value) {
      return mode === value;
    },

    // Methods
    disableExtensions: function disableExtensions() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var extensions, promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                /** @type {Array<Object>} */
                extensions = _this2.extensions.filter(function (_ref3) {
                  var checked = _ref3.checked;
                  return checked;
                });

                if (!(extensions.length === 0)) {
                  _context3.next = 4;
                  break;
                }

                if (_this2.extensions.length === 0) {
                  proxy.setState({ 'broken': false });
                  _this2.mode = 'success'; // <- No problem extensions = success
                }
                return _context3.abrupt('return');

              case 4:
                _context3.next = 6;
                return permissionRequest();

              case 6:

                /** Disable every extension, and after all of the selected are disabled,
                proceed to show success page.
                @type {Array<Promise>} */
                promises = extensions.map(function (_ref4) {
                  var id = _ref4.id;
                  return new Promise(function (resolve) {
                    chrome.management.setEnabled(id, false, resolve);
                  });
                });


                Promise.all(promises).then(function () {
                  proxy.setState({ 'broken': false }).then(function () {
                    _this2.mode = 'success';
                    // console.log( 'Unblock proxy page: setBooleanState -> success' );
                    // nodes.warningBox.fadeOut( () => { nodes.successBox.fadeIn(); });
                  }, function () {
                    _this2.mode = 'error';
                    // console.log( 'error' );
                    // nodes.warningBox.fadeOut( () => { nodes.errorBox.fadeIn(); });
                  });
                }, function (error) {
                  _this2.mode = 'error';
                  log.error('Unblock proxy error: ', error);
                  // nodes.warningBox.fadeOut( () => { nodes.errorBox.fadeIn(); });
                });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    },


    /** Checkbox click
    @param {Object} model
    @param {Boolean} checked
    @return {undefined} */
    extensionCheckbox: function extensionCheckbox(_ref5) {
      var model = _ref5.model,
          checked = _ref5['target'].checked;

      /** Actual object of <tr> line
      @type {Object} */
      var extension = model.get('item');

      /** @type {integer} */
      var index = this.extensions.indexOf(extension);

      /** @type {Array<Object>} */
      var extensions = _.cloneDeep(this.extensions);
      extensions[index].checked = checked;

      this.extensions = extensions; // Render here
    },
    getExtensionsList: function getExtensionsList() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var data, extensions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return new Promise(function (resolve) {
                  chrome.management.getAll(resolve);
                });

              case 2:
                data = _context4.sent;


                /** @type {Array<Object>} */
                extensions = _.transform(data, function (extensions, _ref6) {
                  var enabled = _ref6.enabled,
                      icons = _ref6.icons,
                      id = _ref6.id,
                      name = _ref6.name,
                      permissions = _ref6.permissions;

                  var condition = permissions.includes('proxy') && Browser.runtime.id !== id && // Not our extension
                  enabled; // Exclude disabled extensions
                  if (!condition) return;

                  /** @type {Object} */
                  var extension = { 'checked': true, id: id, name: name };

                  /** @type {(String|undefined)} */
                  var iconUrl = _.get(icons[1] || icons[0], 'url');
                  if (iconUrl) {
                    extension.icon = 'chrome://favicon/size/38/chrome-extension://' + id + '/';
                  }

                  extensions.push(extension);
                }, []);


                _this3.extensions = extensions;

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this3);
      }))();
    },


    // First click here
    scanExtensions: function scanExtensions() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var state, makeRequest;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return proxy.getControlState();

              case 2:
                state = _context6.sent;

                /** @function */
                makeRequest = function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return permissionRequest();

                          case 2:

                            if (_this4.mode !== 'information') _this4.mode = 'information';
                            _this4.hasManagement = true;
                            _this4.getExtensionsList();

                          case 5:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this4);
                  }));

                  return function makeRequest() {
                    return _ref7.apply(this, arguments);
                  };
                }();

                if (!state) {
                  _context6.next = 15;
                  break;
                }

                _context6.prev = 5;
                _context6.next = 8;
                return proxy.setState({ 'broken': false });

              case 8:
                _this4.mode = 'success';
                _context6.next = 14;
                break;

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6['catch'](5);

                makeRequest();

              case 14:
                return _context6.abrupt('return');

              case 15:

                // No control over proxy
                makeRequest();

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this4, [[5, 11]]);
      }))();
    }
  });
}