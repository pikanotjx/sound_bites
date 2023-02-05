$(document).ready(function(){
    $(".logo").hide();
    $("#game").hide();
    $("#game-over").hide();
    $("#score").hide();
    $("#start").on("click", function(){
        $("#start").hide();
        $("#game").show();
        $("#score").show();
        $(".logo").show();
    });
});