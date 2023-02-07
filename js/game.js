var artist = localStorage.getItem("artist");


const optionContainer = $(".option-container");
let songCounter = 0;
let currentSong;
let availableSongs = [];
let songList = [];
let allOptions = [];
let availableOptions = [];

$(document).ready(function () {
    $("#artist-name").html(artist);
    setAvailableSongs();
    getNewSong();
});

function setAvailableSongs() {
    // get song list from database
    var settings = {
        "async": false,
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
                availableSongs.push(song);
            }
        }
      });
}

function getNewSong() {
    // set available options
    // allOptions = [];
    // for (let song of songList) {
    //     allOptions.push(song);
    // }

    songList.forEach(song => {
        allOptions.push(song);
    });

    console.log(allOptions);

    // shuffle songs
    shuffleSongs(songList);
    shuffleSongs(availableSongs);

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
    shuffleSongs(allOptions);
    while (availableOptions.length < 3) {
        const optionIndex = Math.floor(Math.random() * allOptions.length);
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
        optionContainer.appendChild(option);
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


async function startQuestion() {
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
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function displayOptions(arr) {
    for (let i = 0; i < arr.length; i++) {
        $("#option" + i).html(arr[i]);
    }
}