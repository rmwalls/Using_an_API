$(document).ready(function() {

    var topics = ["aurora+borealis", "daffy+duck", "seinfeld", "lost", "baby+animals"];	
    var newRequestButton;
    var userTopic;
    var queryUrl;
    var gifRating;
    var gifs;
    var theGifs;
    var results;
    var ratingTextElement;

    // add button for each topic
    function addButtons() { 
        $("#request-buttons").empty(); // prevents repeats when new button is added
        for (var i = 0; i < topics.length; i++) {
            console.log("array length =  " + topics.length);
            newRequestButton = $("<button>").attr("id", "input").attr("data-name", topics[i]).text(topics[i]); 
            $("#request-buttons").append(newRequestButton); 
        } //end for loop
    } //end function

    // Add It button clicked (calls function and adds buttons)
    $("#add-topic").on("click", function() {
        event.preventDefault(); //prevent the button from executing
        userTopic = $("#topic-input").val().trim().toLowerCase(); // get user input, prepare for API
        console.log("userTopic is " + userTopic);
        topics.push(userTopic); //add new topic to array
        addButtons(); // call the function so new button is added
    }) // end jquery

    addButtons(); //initial display of buttons
    });

    // display requested gifs with ratings
    function displayGifsOnPage() {
        userInput = $(this).attr("data-name");
        console.log("userInput =  " + userInput);
        queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=qt7hfQSsEX423SLcRsTU9j0P32dk7E38&limit=10";   

        // Ajax call
        $.ajax({
            url: queryUrl, 
            method: "GET"}).then(function (response) {
            results = response.data; //save response

            for (var i = 0; i < 10; i++) {    
                gifs = $("<div>").addClass("gif-style"); // Create div element to hold gifs, add class for css styles
                theGifs = $("<img>"); // image tag to hold gifs and add needed attributes
                theGifs.attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
                gifs.append(theGifs); // Append gifs
                gifRating = results[i].rating; // Retrieve rating, displays under gifs
                ratingTextElement = $("<p>").text("Gif Rating = " + gifRating);
                gifs.append(ratingTextElement);
                $("#gifs-go-here").prepend(gifs);
            } //end for loop
        }); //end ajax
    } //end displayGifs

    // Function to animate or still gifs
    function animateGif() {          
        // Runs if the gif's data state is still and animates it
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");

        // Runs if the gif's data state is animated and pauses it
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }  //end if else
    } // end animate

    // Calls the functions for displaying and animating the gifs on the page
    $(document).on("click", "#input", displayGifsOnPage);
    $(document).on("click", ".gif", animateGif);
//}; end document ready