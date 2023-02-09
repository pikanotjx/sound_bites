var artist = localStorage.getItem("artist");

const optionContainer = $(".option-container");
var songCounter = 0;
let correctAnswers = 0;
let currentSong;
let songList = [];
let allSongs = [];
var startTime;
var endTime;
var dbDown = false;

$(document).ready(function () {
    $("#artist-name").html(artist.split("_").join(" "));
    setAvailableSongs()
        .then(() => {
            $("#start-game").on("click", function () {
                startTime = new Date();
                $(".home-box").addClass("hide");
                $(".quiz-box").removeClass("hide");
                setQuestion();
            });
        }
    );
});

$("#play-again").on("click", function () {
    location.reload();
});

$("#return").on("click", function () {
    window.location.href = "select-artist.html";
});

async function setAvailableSongs() {
    await Papa.parse("src/csv/" + artist + ".csv", {
        download: true,
        header: true,
        complete: function (results) {
            for (let i=0; i<results.data.length; i++){
                songList.push(results.data[i]);
                allSongs.push(results.data[i]);
            }
            songList = shuffleSongs(songList);
            $(".total-questions").html(songList.length);
        },
    });
}

function setQuestion() {
    let song = songList[songCounter];
    let songName = song.SongName;
    let file = "src/mp3/" + artist + "/" + song.FileName;
    // play song
    var audio = new Audio(file);
    audio.play();
    // set options
    let options = [songName];
    while (options.length < 4) {
        let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
        if (!options.includes(randomSong.SongName)) {
            options.push(randomSong.SongName);
        }
    }
    options = shuffleSongs(options);
    // display options
    for (let i=0; i<options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = options[i];
        option.classList.add("option");
        optionContainer.append(option);
    }

    // check if answer is correct
    $(".option").on("click", function () {
        audio.pause();
        $(".option").remove();
        if ($(this).html() == songName) {
            correctAnswers ++;
        }
        songCounter ++;
        if (songCounter < songList.length) {
            setQuestion();
        }
        else {
            endTime = new Date();
            $(".quiz-box").addClass("hide");
            $(".result-box").removeClass("hide");
            $(".score").html(calculateScore());
            $(".correct-answers").html(correctAnswers);
            $(".total-question").html(songList.length);
            $(".time-taken").html((endTime - startTime) / 1000 + "s");
            if (!dbDown) {
                saveScore();
            }
        }
    });
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function calculateScore() {
  var timeTaken = (endTime - startTime) / 1000;
  console.log(timeTaken)
  var score = Math.floor(((correctAnswers / songList.length) * 10000) / timeTaken);
  return score;
}

function shuffleSongs(arr) {
    return arr.sort((a, b) => 0.5 - Math.random());
}

function saveScore() {
    var settings = {
        async: true,
        crossDomain: true,
        url: DBLINK,
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };
    
      $.ajax(settings).done(function (accounts) {
        // sort accounts by high score
        accounts.sort((a, b) => (a.HighScore < b.HighScore ? 1 : -1));
        for (let i = 0; i < accounts.length; i++) {
          // update account page
          if (accounts[i].Username === currentAccount.Username) {
            if (calculateScore() > accounts[i].HighScore) {
              accounts[i].HighScore = calculateScore();
              if (accounts[i].HighestRank > i + 1) {
                accounts[i].HighestRank = i + 1;
              }
            }

            // update database
            var settings = {
                async: true,
                crossDomain: true,
                url: DBLINK + accounts[i]._id,
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "x-apikey": APIKEY,
                    "cache-control": "no-cache",
                },
                processData: false,
                data: JSON.stringify(accounts[i]),
            };
            $.ajax(settings).done(function (response) {
                $("#score-update").addClass("show");
            });

        }
    }
});
}