//Preloader
$(window).on('load', function () {
  $('.loader').fadeOut(); // fade out the loading animation
  $('.preloader').delay(350).fadeOut('slow'); // fade out the white DIV that covers the website.
  $('body').delay(350).css({
    'overflow': 'hide'
  });
});

$(document).ready(function () {
  // Text-Resize - Start here
  var originalSize = $('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,legend,input,.form-control,.btn').css('font-size');
  // reset
  $("#lnkNormal").click(function () {
    $('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,input,legend,.form-control,.btn').css('font-size', originalSize);
  });
  //Increase
  $('#lnkIncrease').click(function () {
    curSize = parseInt($('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,legend,input,.form-control,.btn').css('font-size')) + 1;
    if (curSize <= 18)
      $('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,legend,input,.form-control,.btn').css('font-size', curSize);
  });
  //Decrease
  $('#lnkDecrease').click(function () {
    curSize = parseInt($('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,legend,input,.form-control,.btn').css('font-size')) - 1;
    if (curSize >= 9)
      $('div,ul li,a,h1,h2,h3,h4,h5,h6,p,span,input,legend,.form-control,.btn').css('font-size', curSize);
  });
});