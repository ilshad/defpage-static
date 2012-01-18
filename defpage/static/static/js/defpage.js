/* (c) defpage.com */

$(function () {

    $("#ajax_loader").ajaxStart(function () {
	$(this).show();
	$(".maybe_dim").css("opacity", 0.3);
    }).ajaxStop(function () {
	$(this).hide();
	$(".maybe_dim").css("opacity", 1);
    });

    $("#back-top").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    $('#back-top a').click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
        return false;
    });

    $("#usertitle").click(function (e) {
	$(e.srcElement.parentNode).toggleClass('personal_menu_activated');
	return false;
    });
    $(document).click(function (e) {
	$("#personal_menu").toggleClass('personal_menu_activated');
    });

});
