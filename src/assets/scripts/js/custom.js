$(".has_submenu> a").on("click", function (e) {
    e.preventDefault();
    $(this).siblings("ul").slideToggle();
    $(this).parent().toggleClass("active")
});


$(".hamberger").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("menu_collapse_ar");
});