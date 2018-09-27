'use strict';

Polymer({
  'is': 'checkbox-switch',
  'properties': {
    'checked': {
      'type': Boolean,
      'notify': true,
      'observer': 'observeOn'
    }
  },

  // Property observers
  observeOn: function observeOn(newValue, oldValue) {
    this.toggleClass('checked', newValue);
  }
});