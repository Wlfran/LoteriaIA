$(document).ready(function() {
    var owl = $('.portfolio_section .owl-carousel');
    owl.owlCarousel({
        margin: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    })
})

$(document).ready(function() {
    var owl = $('.testimonials_section .owl-carousel');
    owl.owlCarousel({
        margin: 30,
        nav: true,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    })
})