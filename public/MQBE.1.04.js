/*
Mediaquery breakpoint event (MQBE)
Small lib that fires events when you enter / leave a CSS mediaquery. by Carlos Cabo (@putuko) 01 / 21015
https://github.com/carloscabo/MQBE

*/

var MQBE = {

  v: '1.04',

  data: {
    mq_supported: false,
    current_state: null,
    previous_state: null
  },

  init: function() {
    this.detect_mq_support();
    this.data.current_state = this.get_current_state();
    this.data.previous_state = this.data.current_state;
  },

  // Event queue
  events: {
    enter: {},
    leave: {}
  },

  // If state changed sets the data vars and tries to launch the callback (if exists)
  check_state: function () {
    this.data.current_state = this.get_current_state();
    if ( this.data.previous_state !== this.data.current_state) {
      // If there are on-leave actions fire them
      if ( typeof this.events.leave[this.data.previous_state] !== 'undefined' && this.events.leave[this.data.previous_state] !== null && this.events.leave[this.data.previous_state].length > 0) {
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
    if(typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined') {
      this.data.mq_supported = true;
    }
    return this.data.mq_supported;
  },

  // Add evento to the queue!
  on: function( action, state, code) {
    if (typeof this.events[action][state] === 'undefined') {
      this.events[action][state] = [];
    }
    // If event added in current state and "enter"
    if (state === this.data.current_state && action === 'enter') {
      code();
    }
    this.events[action][state].push(code);
    return this;
  },

  // Clear event for state evento to the queue!
  off: function( action, state) {
    if (typeof this.events[action][state] !== 'undefined') {
      this.events[action][state].length = 0;
    }
    return this;
  }

}; //MQBE

// Self init IE9+ $.documentready
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', function(event) {
    // La magia aquí!
    MQBE.init();

    // Start listener ASAP if mq are supported
    if (MQBE.data.mq_supported) {
      debounced_resize(function() {
        MQBE.check_state();
      });
    }
  });
}

// Debounced resize
// https://github.com/louisremi/jquery-smartresize/
function debounced_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100);};return c;}

/*
MQBE.on('enter', 'tablet', function() {
  console.log('Enter mediaquery: '+this.data.current_state);
});

MQBE.on('enter', 'tablet', function() {
  console.log('Leave mediaquery: '+this.data.current_state);
});
*/
