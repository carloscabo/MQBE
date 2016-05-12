var counter = 0;

$(document)
  .on('enter.desktop.mqbe', function() {
    $('body').prepend('<p>'+counter+'. Entered desktop</p>');
    counter++;
  })
  .on('enter.small_desktop.mqbe', function() {
    $('body').prepend('<p>'+counter+'. Entered small-desktop</p>');
    counter++;
  })
  .on('enter.tablet.mqbe', function() {
    $('body').prepend('<p>'+counter+'. Entered tablet</p>');
    counter++;
  })
  .on('enter.mobile.mqbe', function() {
    $('body').prepend('<p>'+counter+'. Entered mobile</p>');
    counter++;
  })
  .on('leave.desktop.mqbe', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved desktop</p>');
    counter++;
  })
  .on('leave.small_desktop.mqbe', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved small-desktop</p>');
    counter++;
  })
  .on('leave.tablet.mqbe', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved tablet</p>');
    counter++;
  })
  .on('leave.mobile.mqbe', function() {
    $('body').prepend('<p>'+counter+'. --- > Leaved mobile</p>');
    counter++;
  })
  .on('mqbe', function() {
    console.log('Media Query Breakpoint Event');
  });
