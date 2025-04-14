$(document).ready(function() {
    if($(window).width() < 768) {
        $("#menu-icon").addClass("bx-menu").removeClass("bx-x")
        $('header nav').slideUp();
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        sendMail(event);
    });
})

let index;

$('#menu-icon').on('click',function() {
    $(this).toggleClass("bx-menu").toggleClass("bx-x")
    $('header nav').slideToggle("slow");
});

$(".resume-btn").on("click", function() {
    index = $(this).index('.resume-btn');
    $(".resume-btn").removeClass('active');
    
    $(this).addClass('active');
    $(".resume-detail").removeClass('active').eq(index).addClass('active');
});

let slideIndex = 0;

const activePortfolio = () => {
    const $imgSlide = $('.portfolio-carousel .img-slide');
    $imgSlide.css('transform', `translateX(calc(${slideIndex * -100}% - ${slideIndex * 2}rem))`);

    $(".portfolio-detail").removeClass('active').eq(slideIndex).addClass('active');
};

$('.portfolio-box .navigation .arrow-right').on('click', function () {
    if (slideIndex < 4) {
        slideIndex++;
        $('.portfolio-box .navigation .arrow-left').removeClass('disabled')
    } else {
        slideIndex = 5;
        $('.portfolio-box .navigation .arrow-right').addClass('disabled')
    }
    activePortfolio();
});


$('.portfolio-box .navigation .arrow-left').on('click', function () {
    if (slideIndex > 1) {
        slideIndex--;
        $('.portfolio-box .navigation .arrow-right').removeClass('disabled')
    } else {
        slideIndex = 0;
        $('.portfolio-box .navigation .arrow-left').addClass('disabled')
    }
    activePortfolio();
});

let navIndex;

$("header nav a").on("click", function() {
    if (!$(this).hasClass("active")) {
        navIndex = $(this).index("header nav a");
        
        if($(window).width() < 768) {
            $("#menu-icon").addClass("bx-menu").removeClass("bx-x")
            $('header nav').slideUp();
        }
        
        $("header").removeClass('active');
        $("section").removeClass('active');
        
        setTimeout(() => {
            $("header").addClass('active');
            $("section").eq(navIndex).addClass('active');
        }, 1000);

        $("header nav a").removeClass('active');
        $(this).addClass('active');

        $(".bars-box").removeClass('active');
        setTimeout(() => {
            $(".bars-box").addClass('active');
        }, 1000);
    }
});

$(".emailLink").on("click", function() {
    $('.contactLink').click();
})

function sendMail() {
    console.log("sendMail function triggered");

    emailjs.init("3w0CiewtN9V6V20cj");
    console.log("EmailJS initialized");

    const params = {
        name: $("#name").val(),
        telegram: $("#telegram").val(),
        email: $("#email").val(),
        subject: $("#subject").val(),
        message: $("#message").val()
    };

    console.log("Params:", params);

    const serviceID = "service_e7gtlb4";
    const templateID = "template_30ql4lf";

    emailjs.send(serviceID, templateID, params)
        .then(() => {
            alertify.success("Message sent successfully!");
            console.log("Email sent");
        })
        .catch((err) => {
            alertify.error("Failed to send the message.");
            console.error("Email sending error:", err);
        });
}
