'use strict';

Polymer({
  'is': 'head-logo',
  'properties': {
    'premium': {
      'type': Boolean,
      'observer': 'premiumObserver'
    }
  },
  premiumObserver: function premiumObserver(newValue, oldValue) {
    this.toggleClass('stPremium', newValue);
  }
});