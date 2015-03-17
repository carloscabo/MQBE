/*
Mediaquery breakpoint event
Small lib that fires events when you enter / leave a CSS mediaquery. by Carlos Cabo (@putuko) 01 / 21015
https://github.com/carloscabo/MQBE

*/

var MQBE = {

  data: {
    mq_supported: false,
    previous_state: null,
    current_state: null
  },

  init: function() {
    if (this.detect_mq_support()) {
      this.check_state();
      this.start_listener();
    }
  },

  // Start listening window resizes
  start_listener: function() {
    $(window).on('resize orientationchange', function() {
      MQBE.check_state();
    });
  },

  // If state changed sets the data vars and tries to launch the callback (if exists)
  check_state: function () {
    this.data.current_state = this.get_current_state();
    if ( this.data.previous_state !== this.data.current_state) {
      // On leave state it' only fired when previous_state !== null
      // So it's never fired on first run
      if (typeof MQBE['onleave_'+this.data.previous_state] !== 'undefined' && this.data.previous_state !== null) {
        MQBE['onleave_'+this.data.previous_state]();
      }
      if (typeof MQBE['onenter_'+this.data.current_state] !== 'undefined') {
        MQBE['onenter_'+this.data.current_state]();
      }
      this.data.previous_state = this.data.current_state;
    }
  },

  get_current_state: function () {
    var state = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    state = state.replace( /"/g,''); // Firefox bugfix
    return state;
  },

  // Has the browser mediaqueries support?
  detect_mq_support: function() {
    if (typeof this.data.mq_support === 'undefined') {
      if( typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined') {
        this.data.mq_support = true;
      }
      return this.data.mq_support;
    }
  }

}; //MQBE

/*MQBE.onenter_tablet = function() {
  console.log('Enter mediaquery: '+this.data.current_state);
};

MQBE.onleave_tablet = function() {
  console.log('Leave mediaquery: '+this.data.current_state);
};*/

// Party begins!
/*$(document).ready(function() {
  // La magia aquí!
  MQBE.init();
});*/
