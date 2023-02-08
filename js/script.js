const APIKEY = "63df95363bc6b255ed0c46aa";
var currentAccount;

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.visibility = "hidden";
    document.querySelector("body").style.visibility = "visible";
  }
};

// navigation bar
$(".nav-link span").hide();
$(".nav-link").on("mouseenter", function () {
  $(this).find("span").show();
  $(this).find("i").hide();
});
$(".nav-link").on("mouseleave", function () {
  $(this).find("span").hide();
  $(this).find("i").show();
});

// navigation bar - show menu on click
var navbarHeight = $("header").height();

$("#menu-button").on("click", function (event) {
  $(".nav-link").removeClass(".toggle-word");
  $("#navbarSupportedContent").toggleClass("show menuOpen");
  $("#navbarSupportedContent").css("top", navbarHeight);
});

// get artist to play
$(".play-btn").on("click", function () {
    artist = $(this).attr('id');
    localStorage.setItem("artist", artist);
    window.location.href = "game.html";
});

$(document).ready(function () {
  // check if local storage has current account
  currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
  if (currentAccount == null) {
    $(".account-nav").attr("href", "/login.html");
    $(".play-nav").attr("href", "/login.html");
  } else {
    $("#username").html(currentAccount.Username);
  }

  if (window.location.pathname === "/leaderboard.html") {

    // get leaderboard
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://soundbites-8ad9.restdb.io/rest/accounts",
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },
      };
    
      $.ajax(settings).done(function (response) {
        var accounts = response;
        // sort accounts by high score
        accounts.sort((a, b) => (a.HighScore < b.HighScore ? 1 : -1));
        for (let i = 0; i < accounts.length; i++) {
            // append account to leaderboard
          $("#leaderboard").append(
            `<tr>
                <td>${i + 1}</td>
                <td>${account.Username}</td>
                <td>${account.HighArtist}</td>
                <td>${account.HighScore}</td>
            </tr>`
          );
        }
      });
    }

  // register new account
  $("#register-account").on("click", function () {
    // clear old notice
    $("#login-notice").html("");

    // disable button
    $("#register-account").attr("disabled", true);

    // get username and password from form
    var username = $("#username").val();
    var password = $("#password").val();

    // check if username and password are filled in
    if (username === "" || password === "") {
      $("#login-notice").html("Please fill in all fields");
        $("#register-account").attr("disabled", false);
    }

    // check if username is already taken
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://soundbites-8ad9.restdb.io/rest/accounts",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
      for (let account of response) {
        if (username === account.Username) {
          $("#login-notice").html("Username already taken");
            $("#register-account").attr("disabled", false);
          return;
        }
      }
    });

    // create new account
    var jsondata = {
      Username: username,
      Password: password,
      HighScore: 0,
      LatestScore: 0,
    };
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://soundbites-8ad9.restdb.io/rest/accounts",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
    };
    $.ajax(settings).done(function (response) {
      $("#success").html("Account created successfully");
      // save account to local storage
      currentAccount = response;
      localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
      // redirect to index page
      window.location.href = "index.html";
    });
  });

  // login account
  $("#login-account").on("click", function () {
    // clear old notice
    $("#login-notice").html("");
    
    // disable button
    $("#login-account").attr("disabled", true);

    // get username and password from form
    var username = $("#username").val();
    var password = $("#password").val();

    // check if username and password are filled in
    if (username === "" || password === "") {
      $("#login-notice").html("Please fill in all fields");
      $("#login-account").attr("disabled", false);
        return;
    }

    // check if username and password are correct
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://soundbites-8ad9.restdb.io/rest/accounts",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };

    $.ajax(settings).done(function (response) {
      for (let account of response) {
        if (username === account.Username) {
          if (password === account.Password) {
            currentAccount = account;
            $("#success").html("Login successful");
            // save account to local storage
            localStorage.setItem(
              "currentAccount",
              JSON.stringify(currentAccount)
            );
            // redirect to account page
            window.location.href = "account.html";
            return;
          } else {
            $("#login-notice").html("Incorrect Password");
            $("#login-account").attr("disabled", false);
            return;
          }
        } else {
          $("#login-notice").html("Username not found");
            $("#login-account").attr("disabled", false);
        }
      }
    });
  });

  // logout account
  $("#logout-account").on("click", function () {
    localStorage.removeItem("currentAccount");
    window.location.href = "index.html";
  });

  // !- accessing database

  // selecting artist
  $(".play-btn").on("click", function () {
    var artist = $(this).attr("data-artist");
  });
  // !- selecting artist
});
