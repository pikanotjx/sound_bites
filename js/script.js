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
    // navigation bar - show menu on click
    var navbarHeight = $("header").height();

    $("#menu-button").on("click", function(event){
        $("#navbarSupportedContent").toggleClass("show menuOpen");
        $("#navbarSupportedContent").css("top", navbarHeight);
    });
    // !- navigation bar - show menu on click

    // accessing database
    // 
    const APIKEY = "63df95363bc6b255ed0c46aa";
    $("#update-user-container").hide();
    $("#add-update-msg").hide();
    
    // create submit form listener
    $("#register-submit").on("click", function(e){
        e.preventDefault();

        let username = $("#username").val();
        let password = $("#password").val();

        let jsondata = {
            "username": username,
            "password": password
        };

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://soundbites-8ad9.restdb.io/rest/users",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function(){
                $("#register-submit").html("Loading...");
                $("#register-submit").prop("disabled", true);
                console.log(`${username}, ${password}`);
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            $("#register-submit").prop("disabled", false);
            $("#add-update-msg").shouw().fadeOut(3000);
            getUser();
        });
    });
    });