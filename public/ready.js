$(document).ready(function() {
  // La magia aquí!

  // //////////////////////////////////
  // MQ Responsive breakpoints
  // //////////////////////////////////

  MQBE.onenter_desktop = function() {
    $('body').prepend('<p>Entered desktop</p>')
  };

  MQBE.onenter_small_desktop = function() {
    $('body').prepend('<p>Entered small-desktop</p>')
  };

  MQBE.onenter_tablet = function() {
    $('body').prepend('<p>Entered tablet</p>')
  };

  MQBE.onenter_mobile = function() {
    $('body').prepend('<p>Entered mobile</p>')
  };

  MQBE.onleave_desktop = function() {
    $('body').prepend('<p>Leaved desktop</p>')
  };

  MQBE.onleave_small_desktop = function() {
    $('body').prepend('<p>Leaved small-desktop</p>')
  };

  MQBE.onleave_tablet = function() {
    $('body').prepend('<p>Leaved tablet</p>')
  };

  MQBE.onleave_mobile = function() {
    $('body').prepend('<p>Leaved mobile</p>')
  };

  MQBE.init();

});

