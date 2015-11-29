(function() {
  var counter = 0;

  // //////////////////////////////////
  // MQ Responsive breakpoints
  // //////////////////////////////////

  $(document)
    .on('mqbe.enter.desktop', function() {
      $('body').prepend('<p>'+counter+'. Entered desktop</p>');
      counter++;
    })
    .on('mqbe.enter.small_desktop', function() {
      $('body').prepend('<p>'+counter+'. Entered small-desktop</p>');
      counter++;
    })
    .on('mqbe.enter.tablet', function() {
      $('body').prepend('<p>'+counter+'. Entered tablet</p>');
      counter++;
    })
    .on('mqbe.enter.mobile', function() {
      $('body').prepend('<p>'+counter+'. Entered mobile</p>');
      counter++;
    })
    .on('mqbe.leave.desktop', function() {
      $('body').prepend('<p>'+counter+'. --- > Leaved desktop</p>');
      counter++;
    })
    .on('mqbe.leave.small_desktop', function() {
      $('body').prepend('<p>'+counter+'. --- > Leaved small-desktop</p>');
      counter++;
    })
    .on('mqbe.leave.tablet', function() {
      $('body').prepend('<p>'+counter+'. --- > Leaved tablet</p>');
      counter++;
    })
    .on('mqbe.leave.mobile', function() {
      $('body').prepend('<p>'+counter+'. --- > Leaved mobile</p>');
      counter++;
    });

})();
