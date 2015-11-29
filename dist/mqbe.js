/*!
 * Media Query breakpoints events (MQBE) 1.0.5
 * Small lib that fires events when you enter / leave a CSS mediaquery.
 * 
 * https://github.com/carloscabo/MQBE
 * 
 * Copyright 2015, Carlos Cabo
 * 
 * Licensed under MIT
 * 
 * Released on: November 29, 2015
 */

(function($, undefined) {
  'use strict';

  var $doc = $(document),
      current_state;

  // If state changed sets the data vars and tries to launch the callback (if exists)
  function check_state() {
    var previous_state = current_state;
    current_state = get_current_state();

    if ( previous_state !== current_state) {
      $doc.trigger('mqbe.leave.' + previous_state);
      $doc.trigger('mqbe.enter.' + current_state);
    }
    return current_state;
  }

  // Get state from body:after content
  function get_current_state() {
    var state = window.getComputedStyle(document.body,':after').getPropertyValue('content');
    return state.replace( /["']/g,''); // Firefox / Chrome 43 bugfix
  }

  // Has the browser mediaqueries support?
  function detect_mq_support() {
    return (typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined');
  }

  // Debounced resize
  // https://github.com/louisremi/jquery-smartresize/
  function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250);};return c;}

  if (detect_mq_support()) {
    $(function() {
      check_state();

      // Start listener ASAP if mq are supported
      on_resize(function() {
        check_state();
      });
    });
  }

  window.MQBE = {
    supported: detect_mq_support,
    current_state: get_current_state
  };

})(jQuery);
