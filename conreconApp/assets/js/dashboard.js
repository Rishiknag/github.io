$(function () {
  //
  // Carousel
  //
  $(".counter-carousel").owlCarousel({
    loop: true,
    rtl: true,
    margin: 30,
    mouseDrag: true,
  
    nav: false,

    responsive: {
      0: {
        items: 2,
        loop: true,
      },
      576: {
        items: 2,
        loop: true,
      },
      768: {
        items: 3,
        loop: true,
      },
      1200: {
        items: 5,
        loop: true,
      },
      1400: {
        items: 6,
        loop: true,
      },
    },
  });
});
