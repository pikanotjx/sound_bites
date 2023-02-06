var artist = localStorage.getItem("artist");
var songList = []

setUpGame();
$(document).ready(function () {
    $(".logo").hide();
    $("#game").hide();
    $("#game-over").hide();
    $("#countdown").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        $("#countdown").show();
        var countdown = 4;
        var countdownTimer = setInterval(function () {
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            $("#countdown").hide();
            $("#game").show();
            $(".logo").show();
            startGame();
        } else {
            $("#countdown-timer").html(countdown);
            countdown--;
        }
        }, 1000);
    });
});

function setUpGame() {
    // get song list from database
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://soundbites-8ad9.restdb.io/rest/songs",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        for (let song of response) {
            if (song.SongArtist == artist)
            {
                songList.push(song);
            }
        }
        console.log(songList);
      });
      
}

function playGame() {

}

function calculateScore() {
  var score = Math.floor((correctAnswers / totalQuestions) * 100);
  return score;
}