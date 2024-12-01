$('.click-scroll').each(function (index) {
    $(this).click(function (e) {
        var href = $(this).attr('href');

        // Si el href no empieza con #, es un enlace externo
        if (!href.startsWith('#')) {
            return; // Permitir la navegación normal
        }

        // Si el href empieza con #, prevenir el comportamiento por defecto y hacer scroll
        e.preventDefault();
        var offsetClick = $(href).offset().top - 83;

        $('html, body').animate({
            scrollTop: offsetClick
        }, 300);
    });
});

$(document).ready(function () {
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});
