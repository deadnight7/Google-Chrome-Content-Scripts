'use strict';

{
  var _browser = typeof browser !== 'undefined' ? browser : chrome;

  /** Get data from locales through chrome.i18n.getMessage
  @param {String} key
  @return {String} */
  var internationalize = function internationalize(key) {
    try {
      return _browser.i18n.getMessage(key) || key;
    } catch (error) {
      // Firefox
      return key;
    }
  };

  /** @type {String} */
  var text = internationalize('browsec_can_work_in_private_mode');

  Polymer({
    'is': 'popup-private-mode',

    // Lifecycle
    ready: function ready() {
      /** @type {Element} */
      var textElement = Polymer.dom(this.root).querySelector('[data-role="text"]');

      /** @type {Array<Node>} */
      var nodes = text.split(/\n/).reduce(function (carry, string, index, array) {
        if (string) carry.push(document.createTextNode(string));
        if (index !== array.length - 1) {
          carry.push(document.createElement('br'));
        }

        return carry;
      }, []);

      nodes.forEach(function (node) {
        textElement.appendChild(node);
      });
    }
  });
}