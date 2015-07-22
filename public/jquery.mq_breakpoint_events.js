/*
Mediaquery breakpoint event
Small lib that fires events when you enter / leave a CSS mediaquery. by Carlos Cabo (@putuko) 01 / 21015
https://github.com/carloscabo/MQBE

*/

var MQBE = {

  v: '1.03',

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

  // Event queue
  events: {
    enter: {},
    leave: {}
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
      if (typeof this.events.leave[this.data.previous_state] !== 'undefined' && this.events.leave[this.data.previous_state].length > 0 && this.data.previous_state !== null) {
        // Launch all events in queue
        for (i = 0, len = this.events.leave[this.data.previous_state].length; i < len; i++) {
          this.events.leave[this.data.previous_state][i]();
        }
      }
      if (typeof this.events.enter[this.data.current_state] !== 'undefined' && this.events.enter[this.data.current_state].length > 0) {
        // Launch all events in queue
        for (i = 0, len = this.events.enter[this.data.current_state].length; i < len; i++) {
          this.events.enter[this.data.current_state][i]();
        }
      }
      this.data.previous_state = this.data.current_state;
    }
  },

  get_current_state: function () {
    var state = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    state = state.replace( /["']/g,''); // Firefox / Chrome 43 bugfix
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
  },

  // Add evento to the queue!
  on: function( action, state, code) {
    if (typeof this.events[action][state] === 'undefined') {
      this.events[action][state] = [];
    }
    this.events[action][state].push(code);
    return this;
  },

  // Clear event for state evento to the queue!
  off: function( action, state, code) {
    if (typeof this.events[action][state] !== 'undefined') {
      this.events[action][state].length = 0;
    }
    return this;
  }

}; //MQBE

/*
MQBE.on('enter', 'tablet', function() {
  console.log('Enter mediaquery: '+this.data.current_state);
});

MQBE.on('enter', 'tablet', function() {
  console.log('Leave mediaquery: '+this.data.current_state);
});

$(document).ready(function() {
  // La magia aquí!
  MQBE.init();
});
*/
