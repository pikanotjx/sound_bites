var artist = localStorage.getItem("artist");
var songList = []

$(document).ready(function () {
    setUpGame();
    $(".logo").hide();
    $("#game").hide();
    $("#game-over").hide();
    $("#countdown").hide();
    $("#start").on("click", function () {
        $("#start").hide();
        $("#countdown").show();
        var countdown = 2;
        var countdownTimer = setInterval(function () {
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            $("#countdown").hide();
            $("#game").show();
            $(".logo").show();
            playGame();
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
    var song = songList[Math.floor(Math.random() * songList.length)];
    var songName = song.SongName;
    var songFile = "../src/mp3/" + song.SongArtist + "/" + song.FileName;
    // play song
    var audio = new Audio(songFile);
    console.log(songFile);
    audio.play();
    // randomise options
    var options = [songName];
    while (options.length <= 4) {
        options.push(songName);
        var randomSong = songList[Math.floor(Math.random() * songList.length)];
        if (!options.includes(randomSong.SongName)) {
            options.push(randomSong.SongName);
        }
    }
    // shuffle options
    shuffleSongs(options);
    // display options
    for (let i = 0; i < options.length; i++) {
        $("#option" + i).html(options[i]);
    }
    // check if answer is correct
    $(".option").on("click", function () {
        audio.pause();
        if ($(this).html() == songName) {
            alert("Correct!");
            correct += 1;
        } else {
            alert("Wrong!");
            wrong += 1;
        }
        options = [];
        playGame();
    });
}

function calculateScore() {
  var score = Math.floor((correctAnswers / totalQuestions) * 100);
  return score;
}

function shuffleSongs(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }