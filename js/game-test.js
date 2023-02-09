// get artist from local storage
var artist = localStorage.getItem("artist");

let songCounter = 0;
let currentSong;
let availableSongs = [];
let availableOptions = [];

$(document).ready(function () {
    // $("#artist-name").html(artist);
    startGame();
});

async function startGame() {
    await setAvailableSongs();
    getNewSong();
}

function setAvailableSongs() {
    return new Promise (resolve => {
    Papa.parse("src/csv/" + 'zhou_shen' + ".csv", {
        download: true,
        header: true,
        complete: function (results) {
            for (let i=0; i<results.data.length; i++){
                availableSongs.push(results.data[i]);
            }
        },
    });
    resolve();
    });
}

async function getNewSong() {
    // set available options
    let allOptions = availableSongs;

    console.log(availableSongs);
    console.log(allOptions);

    // set song
    // get random song
    const songIndex = availableSongs[Math.floor(Math.random() * availableSongs.length)];
    currentSong = availableSongs[songIndex];

    // remove currentSong from availableSongs to prevent duplication of question
    availableSongs.splice(availableSongs.indexOf(songIndex), 1);

    // remove currentSong from allOptions to prevent duplication of options
    allOptions.splice(allOptions.indexOf(songIndex), 1);

    // set options 
    // get random options
    await shuffleSongs(allOptions);

    while (availableOptions.length < 3) {
        let optionIndex = Math.floor(Math.random() * allOptions.length);
        while (availableOptions.includes(allOptions[optionIndex])) {
            optionIndex = Math.floor(Math.random() * allOptions.length);
        }
        availableOptions.push(allOptions[optionIndex]);
    }
    availableOptions.push(currentSong);
    shuffleSongs(availableOptions);

    // display options
    for (let i=0; i<availableOptions.length; i++) {
        const option = document.createElement("div");
        console.log(availableOptions[i])
        option.innerHTML = availableOptions[i].SongName;
        option.classList.add("option");
        optionContainer.append(option);
    }
    
    var songName = currentSong.SongName;
    var songFile = "../src/mp3/" + currentSong.SongArtist + "/" + currentSong.FileName;
    // play song
    var audio = new Audio(songFile);
    audio.play();

    songCounter++;
}

function next() {
    if (songCounter == songList.length) {
        console.log("game over");
    }
    else {
        getNewSong();
    }
}


function startQuestion() {
    var song = songList[Math.floor(Math.random() * songList.length)];
    while (playedSongs.includes(song)) {
        song = songList[Math.floor(Math.random() * songList.length)];
    }
    playedSongs.push(song);
    var songName = song.SongName;
    var songFile = "../src/mp3/" + song.SongArtist + "/" + song.FileName;
    // play song
    var audio = new Audio(songFile);
    audio.play();
    // randomise options
    var options = [songName];
    while (options.length < 4) {
        var randomSong = songList[Math.floor(Math.random() * songList.length)];
        if (!options.includes(randomSong.SongName)) {
            options.push(randomSong.SongName);
        }
    }
    // shuffle options
    shuffleSongs(options);
    // display options
    displayOptions(options);
    // check if answer is correct
    $(".option").on("click", function () {
        audio.pause();
        if ($(this).html() == songName) {
            alert("Correct!");
            return true;
        } else {
            alert("Wrong!");
            return false;
        }
    });
}

function calculateScore() {
  var score = Math.floor((correctAnswers / totalQuestions) * 100);
  return score;
}

function shuffleSongs(arr) {
    return new Promise (resolve => {
        arr[Math.floor (Math.random() * arr.length)];
resolve();
});
}

function displayOptions(arr) {
    for (let i = 0; i < arr.length; i++) {
        $("#option" + i).html(arr[i]);
    }
}

function checkHighScore(score) {
    localStorage.removeItem("artist");
    var highScore = currentAccount["HighScore"];
    if (highScore == null || score > highScore) {
        updateLeaderboard(score);
    }
}

// function updateLeaderboard(score) {
//     var jsondata = {
//         "HighScore": score
//     };

//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: "https://soundbites-8ad9.restdb.io/rest/accounts",
//         method: "PUT",
//         headers: {
//           "content-type": "application/json",
//           "x-apikey": APIKEY,
//           "cache-control": "no-cache",
//         },
//         processData: false,
//         data: JSON.stringify(jsondata),
//       };

//       $.ajax(settings).done(function (response) {
//         alert("Congratulations on your new high score of " + score + "!");
//         // save account to local storage
//         currentAccount = response;
//         localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
//       });
// }