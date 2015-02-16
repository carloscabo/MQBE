$(document).ready(function() {
  // La magia aquí!

  // //////////////////////////////////
  // MQ Responsive breakpoints
  // //////////////////////////////////

  MQBE.onenter_mobile = function() {
    // Especial flexsliders
    $('.flexslider-mobile-only').flexslider({
        animation: "slide",
        controlNav: false
    });
    // Filter groups
    $('.list-filters > .title').on('click', function() {
      $(this).parent().toggleClass('expanded');
    });
    // Nested flexslider
  };

  MQBE.onleave_mobile = function() {
    //flexdestroy('.flexslider-mobile-only');
    $('.list-filters').removeClass('expanded').find('> .title').off('click');
  };

  MQBE.init();

});

