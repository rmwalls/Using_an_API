// This listener handles event to add a topicbutton when Add it button clicked
   $("#add-topic").on("click", function(event) {
    event.preventDefault(); //prevent the button from executing
   var newTopic = $("#topic-input").val().trim().toLowerCase(); // Grab the input from the textbox
    console.log("got the newTopic " + newTopic);
    //need to append a new button to the screen
    // this IS appending a button, but not assigning the topic correctly
    //var b = $("<button>");
    //$(b).addClass("topicButtons");
    //$(b).adddataTopic(newTopic);
    var newButton = $("<button class = 'topicButtons' id=" + newTopic + ">" + newTopic + "</button>");
    //newButton.attr = $("id=" + newTopic);  
    $("#buttons-view").append(newButton);
  });


  // Adding click event listen listener to buttons
  $(".topicButtons").on("click", function() {
  // Grabbing and storing the data-topic property value from the button
   var topic = $(this).attr("id");
  console.log("line 22 topic " + topic); //working


  // Constructing a queryURL using the topic name
  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=qt7hfQSsEX423SLcRsTU9j0P32dk7E38&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  // After data comes back from the request
  .then(function(response) {
    console.log("queryURL being sent " + queryURL); //working

    console.log(response); //working
  // storing the data from the AJAX request in the results variable
  var results = response.data;
  console.log("results variable has " + results); //working

  // Looping through each of the 10 result items
  for (var i = 0; i < results.length; i++) {
    var topicDiv = $("<div>");     // Creating and storing a div tag
    var topicImage = $("<img>");   // Creating and storing an image tag
    topicImage.attr("src", results[i].images.fixed_height.url); // Setting the src attribute of the image to a property pulled off the result item
    var p = $("<p>").text("Rating: " + results[i].rating); // Creating a paragraph tag with the result item's rating
    topicDiv.append(topicImage);  // Appending the paragraph and image tag to the topicDiv
    topicDiv.append(p);
    $("#gifs-go-here").prepend(topicDiv); // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
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