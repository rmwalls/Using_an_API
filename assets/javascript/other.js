$(document).ready(function() {

    // Declares global variables
    var topics = ["Captain America", "Captain Marvel", "Iron Man", "Hulk"]; 
    var newAvengersTermButton = "";
    var userInput = "";
    var queryUrl = "";
    var gifRating = "";
    var gifs = "";
    var pic = "";
    var ajaxCallResults = "";
    var ratingTextElement = "";


    
    function addInputButtons() {      
        $("#avengers-term-buttons").empty();     
        for (var i = 0; i < topics.length; i++) {
            newAvengersTermButton = $("<button>").attr("id", "input").attr("data-name", topics[i]).text(topics[i]);               $("#avengers-term-buttons").append(newAvengersTermButton); 
        }
    }

   
    $("#submit-button").on("click", function() {
       event.preventDefault();
       userInput = $("#user-input").val();
       topics.push(userInput);
       addInputButtons();
   })

    addInputButtons();
  });

   
    function displayGifsOnPage() {
        userInput = $(this).attr("data-name");
        queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=hxmXc4CHTf97A3TVRHX6keVGo8wZ24PW";   

        // Ajax call
        $.ajax({url: queryUrl, method: "GET"}).then(function (response) {

            ajaxCallResults = response.data;

            // Loop that goes through each gif
            for (var i = 0; i < 10; i++) {    

                // Creates a div element to hold gifs structure and adds a class to it for styles
                gifs = $("<div>").addClass("gif-position");
                
                // Creates an image tag to hold the pics and adds necessary attributes
                pic = $("<img>");
                pic.attr("src", ajaxCallResults[i].images.fixed_height_still.url).attr("data-still", ajaxCallResults[i].images.fixed_height_still.url).attr("data-animate", ajaxCallResults[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");

                // Appends gifs to the pic variable
                gifs.append(pic);

                // Retrieves the rating and places it under the gifs
                gifRating = ajaxCallResults[i].rating;
                ratingTextElement = $("<p>").text("Gif Rating = " + gifRating);
                gifs.append(ratingTextElement);
                $("#show-gifs-here").append(gifs);
            }
        });
    }

    // Function to animate or pause a gif depending on the gif's data state
    function animateGif() {          

        // Runs if the gif's data state is still and animates it
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");

        // Runs if the gif's data state is animated and pauses it
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }   
    }


    // Calls the functions for displaying and animating the gifs on the page
    $(document).on("click", "#input", displayGifsOnPage);
    $(document).on("click", ".gif", animateGif);