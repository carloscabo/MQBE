$(document).ready(function() {
  // La magia aquí!

  // //////////////////////////////////
  // MQ Responsive breakpoints
  // //////////////////////////////////

  MQBE.off('enter', 'desktop').
    on('enter', 'desktop', function() {
      $('body').prepend('<p>Entered desktop</p>')
    }).on('enter', 'desktop', function() {
      console.log('Secondary event added to the very state!');
    });

  MQBE.on('enter', 'small_desktop', function() {
    $('body').prepend('<p>Entered small-desktop</p>')
  }).on('leave', 'small_desktop', function() {
    $('body').prepend('<p>Leaved small-desktop</p>')
  });

  MQBE.on('enter', 'tablet', function() {
    $('body').prepend('<p>Entered tablet</p>')
  });

  MQBE.on('enter', 'mobile', function() {
    $('body').prepend('<p>Entered mobile</p>')
  });

  MQBE.on('leave', 'desktop', function() {
    $('body').prepend('<p>Leaved desktop</p>')
  });


  MQBE.on('leave', 'tablet', function() {
    $('body').prepend('<p>Leaved tablet</p>')
  });

  MQBE.on('leave', 'mobile', function() {
    $('body').prepend('<p>Leaved mobile</p>')
  });

  MQBE.init();

});

