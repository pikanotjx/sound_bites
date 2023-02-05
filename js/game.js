$(document).ready(function(){
    $(".logo").hide();
    $("#game").hide();
    $("#game-over").hide();
    $("#countdown").hide();
    $("#start").on("click", function(){
        $("#start").hide();
        $("#countdown").show();
        var countdown = 4;
        var countdownTimer = setInterval(function(){
            if(countdown <= 0){
                clearInterval(countdownTimer);
                $("#countdown").hide();
                $("#game").show();
                $(".logo").show();
                startGame();
            } else{
                $("#countdown-timer").html(countdown);
                countdown--;
            }
        }, 1000);

    });
});