// declare variables
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
var currentAccount = JSON.parse(localStorage.getItem("currentAccount"));

// when document is ready
$(document).ready(function () {
    // check if user is logged in
    if (currentAccount === null) {
        // if not logged in, warn user that score will not be saved
        $("#db-down span").html("<strong>No account!</strong> Please <a href=\"login.html\">login</a> to save your score.");
        $("#db-down").show();
        dbDown = true;
    }

    // set artist name in header
    $("#artist-name").html(artist.split("_").join(" "));

    // set available songs
    setAvailableSongs()
        .then(() => {
            // start timer on clicking start button, hide home box and show quiz box and set first question
            $("#start-game").on("click", function () {
                startTime = new Date();
                $(".home-box").addClass("hide");
                $(".quiz-box").removeClass("hide");
                setQuestion();
            });
        }
    );
});

// when user clicks on play again at the end of the game
$("#play-again").on("click", function () {
    location.reload();
});

// when user clicks on return at the end of the game, go to select artist
$("#return").on("click", function () {
    window.location.href = "select-artist.html";
});

// get songlist from artist.csv file using Papa Parse
// credit: https://www.papaparse.com/
async function setAvailableSongs() {
    // wait for Papa.parse to finish
    await Papa.parse("src/csv/" + artist + ".csv", {
        download: true,
        header: true,
        complete: function (results) {
            // add songs to songList and allSongs
            for (let i=0; i<results.data.length; i++){
                songList.push(results.data[i]);
                allSongs.push(results.data[i]);
            }
            // shuffle songs
            shuffleSongs(songList);
            // show number of questions
            $(".total-questions").html(songList.length);
        },
    });
}

function setQuestion() {
    // get song from by index (list has already been shuffled previously)
    let song = songList[songCounter];
    let songName = song.SongName;
    // get song file
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
    // shuffle options (if not anwer will always be first option)
    shuffleSongs(options);
    // display options
    for (let i=0; i<options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = options[i];
        option.classList.add("option");
        optionContainer.append(option);
    }

    // on selecting of any option
    $(".option").on("click", function () {
        // check if answer is correct
        if ($(this).html() == songName) {
            // if correct, increment correct answers and change background color to green
            correctAnswers ++;
            $(this).css("background-color", "green");
        } else {
            // if incorrect, change background color to red
            $(this).css("background-color", "red");
            for (let i=0; i<$(".option").length; i++) {
                // change background color of correct answer to green
                if ($(".option")[i].innerHTML == songName) {
                    $(".option")[i].style.backgroundColor = "green";
                }
            }
        }
        // increment song counter and check if there are more songs
        songCounter ++;
        if (songCounter < songList.length) {
            // if there are more songs, disable options and set next question after 1 second
            $(".option").css("pointer-events", "none");
            setTimeout(() => {
                // stop song
                audio.pause();
                $(".option").remove();
                setQuestion();
            }, 1000);
        }
        else {
            // if no more songs, stop song, hide quiz box and show result box
            audio.pause();
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

// function to get random item from array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// function to calculate score
function calculateScore() {
  var timeTaken = (endTime - startTime) / 1000;
  console.log(timeTaken)
  var score = Math.floor(((correctAnswers / songList.length) * 10000) / (timeTaken / songList.length));
  return score;
}

// function to shuffle array
function shuffleSongs(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
}

// function to save score to database
function saveScore() {
    var settings = {
        async: true,
        crossDomain: true,
        url: DBURL,
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
                url: "https://soundbites-31d5.restdb.io/rest/accounts/" + accounts[i]._id,
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