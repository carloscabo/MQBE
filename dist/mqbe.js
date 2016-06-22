/*!
 * Media Query breakpoints events (MQBE) 2.0.3
 * Small JS lib that fires events when you enter / leave a CSS mediaquery.
 *
 * https://github.com/carloscabo/MQBE
 *
 * Copyright 2016, Carlos Cabo
 *
 * Licensed under MIT
 *
 * Released on: June 22, 2016
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
      $doc.trigger('mqbe');
      $doc.trigger('leave.' + previous_state + '.mqbe');
      $doc.trigger('enter.' + current_state + '.mqbe');
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
  function on_resize(c,t){
    window.onresize = function(){
      clearTimeout(t);
      t = setTimeout(c,250);
    };
    return c;
  }

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
