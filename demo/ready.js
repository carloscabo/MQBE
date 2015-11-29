$(document).ready(function() {
  // La magia aquí!

  var counter = 0;

  // //////////////////////////////////
  // MQ Responsive breakpoints
  // //////////////////////////////////

  MQBE.off('enter', 'desktop').
    on('enter', 'desktop', function() {
      $('body').prepend('<p>'+counter+'. Entered desktop</p>');
      counter++;
    }).on('enter', 'desktop', function() {
      console.log('Secondary event added to the same state!');
    });

  MQBE.on('enter', 'small_desktop', function() {
    $('body').prepend('<p>'+counter+'. Entered small-desktop</p>');
    counter++;
  }).on('leave', 'small_desktop', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved small-desktop</p>');
    counter++;
  });

  MQBE.on('enter', 'tablet', function() {
    $('body').prepend('<p>'+counter+'. Entered tablet</p>');
    counter++;
  });

  MQBE.on('enter', 'mobile', function() {
    $('body').prepend('<p>'+counter+'. Entered mobile</p>');
    counter++;
  });

  MQBE.on('leave', 'desktop', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved desktop</p>');
    counter++;
  });

  MQBE.on('leave', 'tablet', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved tablet</p>');
    counter++;
  });

  MQBE.on('leave', 'mobile', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved mobile</p>');
    counter++;
  });

});
