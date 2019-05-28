$(document).ready(function() {
    
  //var data-topic = ["aurora borealis", "daffy duck", "seinfeld", "lost", "baby animals"];

  // Adding click event listen listener to all buttons
  $("button").on("click", function() {
  // Grabbing and storing the data-topic property value from the button
  var topic = $(this).attr("data-topic");

  // Constructing a queryURL using the topic name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=qt7hfQSsEX423SLcRsTU9j0P32dk7E38&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  // After data comes back from the request
  .then(function(response) {
    console.log("queryURL " + queryURL);

    console.log(response);
  // storing the data from the AJAX request in the results variable
  var results = response.data;

  // Looping through each result item
  for (var i = 0; i < results.length; i++) {
    // Creating and storing a div tag
    var topicDiv = $("<div>");
    // Creating and storing an image tag
    var topicImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    topicImage.attr("src", results[i].images.fixed_height.url);
    // Creating a paragraph tag with the result item's rating
    var p = $("<p>").text("Rating: " + results[i].rating);
    // Appending the paragraph and image tag to the topicDiv
    topicDiv.append(topicImage);
    topicDiv.append(p);
    // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
    $("#gifs-go-here").prepend(topicDiv);
  } //end for loop
  });
  });


  // Code for the still <--> animated swapping
  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    } //if else
});
});