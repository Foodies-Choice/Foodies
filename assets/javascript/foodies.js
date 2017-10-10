$(document).ready(function() {
    $('#advancedOptions').hide();
    $('.advanced').click(function() {
        if ($('#advancedOptions').is(':hidden')) {
            $('#advancedOptions').slideDown();
        } else {
            $('#advancedOptions').slideUp();
        }
    });



    $(window).scroll(function() {
        var wScroll = $(this).scrollTop();

        if (wScroll > $("#both").offset().top) {

            $("footer").addClass("showing");
        }
    });
});