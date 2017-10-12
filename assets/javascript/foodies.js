$(document).ready(function() {

    $(window).scroll(function() {
        var wScroll = $(this).scrollTop();

        if (wScroll > $("#both").offset().top) {

            $("footer").addClass("showing");
        }
    });

   var $sticky = $('#sticky-div'),
       Top = $sticky.offset().top;

   $(window).scroll(function() {
        $sticky.toggleClass('sticky', $(window).scrollTop() > Top);
    });

});