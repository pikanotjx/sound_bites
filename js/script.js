// show menu on click

var navbarHeight = $("header").height();

$("#menu-button").on("click", function(event){
    $("#navbarSupportedContent").toggleClass("show menuOpen");
    $("#navbarSupportedContent").css("top", navbarHeight);
});