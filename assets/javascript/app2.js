$(document).ready(function() {
  var topics = ["aurora borealis", "daffy duck", "seinfeld", "lost", "baby animals"];

  // Function for displaying topics buttons
 // function renderButtons() {
    // Deleting the topics prior to adding new topics
    $("#buttons-view").empty();
    console.log("in renderButtons");
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>"); // Then dynamicaly generating buttons for each topic in the array
      a.addClass("topic-btn"); // Adding a class of topic-btn to our button
      a.attr("data-name", topics[i]); // Adding a data-attribute
      a.text(topics[i]); // Providing the initial button text
      $("#buttons-view").append(a); // Adding each button to the buttons-view div
    } //end for
 // }; //end renderButtons

  // This listener handles event to add a topicbutton when Add it button clicked
  $("#add-topic").on("click", function(event) {
    event.preventDefault(); //prevent the button from executing
    var topic = $("#topic-input").val().trim(); // Grab the input from the textbox
    topics.push(topic); // Adding topic from the textbox to our array
    console.log("near end of add topic activity")
    // Calling renderButtons which makes a button for each topic in topics array
   // renderButtons();
  });

  // displayTopicInfo function re-renders the HTML to display the appropriate content
  function displayTopicInfo() {
    console.log("in displayTopicInfo");
    var topic = $(this).attr("data-name");
    console.log("topic = " + topic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?l=10&q=" + topic + "&api_key=qt7hfQSsEX423SLcRsTU9j0P32dk7E38";

    // Creating the AJAX call for the specific topic button being clicked and storing the response
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("response is " + response);
      // storing the data from the AJAX request in the results variable
     // var results = response.data;
      console.log("response is " + response);

      var topicDiv = $("<div class='topic'>"); // Creating div to hold the topic
      $(".rating").text("Rating: " + response.rating);
      $(".images").text("Humidity: " + response.main.humidity);

     // let rating = results.data.rating; // Storing the rating data
     // console.log(results.data.rating);

      // Creating an element to display rating 
      //let pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
     // topicDiv.append(pOne);

      // Putting the entire topic above the previous topics
      $("#topics-view").prepend(topicDiv);
    }); //store ajax call

  }; //end displayTopicInfo

    
      // Adding a click event listener to all elements with a class of 'topic-btn'
    $(document).on("click", ".topic-btn", displayTopicInfo());
}); // end doc ready