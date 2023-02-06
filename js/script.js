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

$(document).ready(function(){
    var currentAccount = null;
    // navigation bar - show menu on click
    var navbarHeight = $("header").height();

    $("#menu-button").on("click", function(event){
        $("#navbarSupportedContent").toggleClass("show menuOpen");
        $("#navbarSupportedContent").css("top", navbarHeight);
    });
    // !- navigation bar - show menu on click

    // accessing database
    const APIKEY = "63df95363bc6b255ed0c46aa";
    $("#register-account").on("click", function(event){
        var username = $("#username").val();
        var password = $("#password").val();
        var dateJoined = new Date();

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
                }
            }
        });

        var jsondata = {"Username": username,"Password": password, "DateJoined": dateJoined, "HighScore": 0, "LatestScore": 0};
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

        alert("Registration Successful! Proceed to Login!")
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

    // !- accessing database

    // selecting artist
    $(".play-btn").on("click", function(event){
        var artist = $(this).attr("data-artist");
    });
    // !- selecting artist
});