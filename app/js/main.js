$(document).ready(function () {
    if (navigator.userAgent.match(/(\(iPod|\(iPhone|\(iPad)/)) {
        $('#mapLink').attr('href', 'http://maps.apple.com/?ll=41.067405,28.8615668');
    }
});

$(window).resize(function () {
    if ($(window).width() > 969) {
        if ($('#mobileMenu').is(':visible'))
            closeMobileMenu();
    }
});

function closeMobileMenu() {
    $('#mobileMenu').slideUp({
        duration: 700
    });
    $('#closeMenuButton').slideUp({
        duration: 700
    });
}

function openMobileMenu() {
    $('#mobileMenu').slideDown({
        duration: 700
    });
    $('#closeMenuButton').slideDown({
        duration: 700
    });
}