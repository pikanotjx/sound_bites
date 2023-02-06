document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
          "body").style.visibility = "hidden";
        document.querySelector(
          "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
          "#loader").style.visibility = "hidden";
        document.querySelector(
          "body").style.visibility = "visible";
    }
};

    // navigation bar
$(".nav-link span").hide();
$(".nav-link").on("mouseenter", function(){
    $(this).find("span").show();
    $(this).find("i").hide();
});
$(".nav-link").on("mouseleave", function(){
    $(this).find("span").hide();
    $(this).find("i").show();
});

// navigation bar - show menu on click
var navbarHeight = $("header").height();

$("#menu-button").on("click", function(event){
    $("#navbarSupportedContent").toggleClass("show menuOpen");
    $("#navbarSupportedContent").css("top", navbarHeight);
});
    // !- navigation bar - show menu on click

$(document).ready(function(){
    // check if local storage has current account
    var currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
    if (currentAccount == null && window.location.pathname != "/login.html" && window.location.pathname != "/register.html" && window.location.pathname != "/index.html" && window.location.pathname != "/leaderboard.html") {
        window.location.href = "login.html";
    } else if (currentAccount != null){
        $("#username").html(currentAccount.Username);
        $("#highest-score").html(currentAccount.HighScore);
        $("#latest-score").html(currentAccount.LatestScore);
        $("#about").html(currentAccount.About);
    }
    // !- check if local storage has current account
    
    // accessing database
    const APIKEY = "63df95363bc6b255ed0c46aa";
    $("#register-account").on("click", function(event){
        
        var username = $("#username").val();
        var password = $("#password").val();

        if (username === "" || password === "") {
            alert("Please fill in all fields");
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://soundbites-8ad9.restdb.io/rest/accounts",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for(let account of response) {
                if (username === account.Username) {
                    alert("Username already taken");
                } else {
                    alert("Account created");
                    window.location.href = "login.html";
                    return;
                }
            }
        });

        var jsondata = {"Username": username,"Password": password, "HighScore": 0, "LatestScore": 0};
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://soundbites-8ad9.restdb.io/rest/accounts",
            "method": "POST",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
                },
            "processData": false,
            "data": JSON.stringify(jsondata)
            }
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    });

    $("#login-account").on("click", function(event){
        var username = $("#username").val();
        var password = $("#password").val();

        if (username === "" || password === "") {
            alert("Please fill in all fields");
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://soundbites-8ad9.restdb.io/rest/accounts",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for(let account of response) {
                if (username === account.Username) {
                    if (password === account.Password) {
                        currentAccount = account;
                        alert("Login Successful!");
                        // save account to local storage
                        localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
                        return;
                    } 
                    else {
                        alert("Incorrect Password");
                        return;
                    }
                } 
                else {
                    alert("Username not found");
                }
            }
        });
    });

    $("#logout-account").on("click", function(){
        localStorage.removeItem("currentAccount");
        window.location.href = "login.html";
    });

    // !- accessing database

    // selecting artist
    $(".play-btn").on("click", function(){
        var artist = $(this).attr("data-artist");
    });
    // !- selecting artist
});