/*
Mediaquery breakpoint event (MQBE)
Small lib that fires events when you enter / leave a CSS mediaquery. by Carlos Cabo (@putuko) 01 / 21015
https://github.com/carloscabo/MQBE

*/

var MQBE = {

  v: '1.04',

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
      // On leave state it's only fired when previous_state !== null
      // So it's never fired on first run
      if (typeof this.events.leave[this.data.previous_state] !== 'undefined' && this.events.leave[this.data.previous_state].length > 0 && this.data.previous_state !== null) {
        // Launch all events in queue
        for (var i = 0, len = this.events.leave[this.data.previous_state].length; i < len; i++) {
          this.events.leave[this.data.previous_state][i].code();
        }
      }
      if (typeof this.events.enter[this.data.current_state] !== 'undefined' && this.events.enter[this.data.current_state].length > 0) {
        // Launch all events in queue
        for (var j = 0, len = this.events.enter[this.data.current_state].length; j < len; j++) {
          this.events.enter[this.data.current_state][j].code();
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
    var ev = {
      fired: false,
      code: code
    };
    this.events[action][state].push(ev);
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

// http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }
      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(obj, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize orientationchange', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

// Start listener ASAP
$(document).ready(function() {
  $(window).on('smartresize', function() {
    MQBE.check_state();
  });
});

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
