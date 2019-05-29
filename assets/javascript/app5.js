$(document).ready(function() { //1
	var topics = ["aurora+borealis", "daffy+duck", "seinfeld", "lost", "baby+animals"];	
	var newRequestButton;
	//var newButton;
	var newTopic;
	var topic;
	var queryURL; 
	var results;  
	
	
	console.log(topics.length); //WORKING
	console.log("At the start"); //WORKING
	//function generateButtons() { //2
		$("#request-buttons").empty(); //prevent repeats
			for (var i=0; i < topics.length; i++) { //3
				newRequestButton = $("<button>").attr("id", "myTopic").attr("data-name", topics[i]).text(topics[i]);
				$("#request-buttons").append(newRequestButton);
				console.log(i); //WORKING
			} //end for loop - 3
	//} //end generateButtons - 2

	$("#add-topic").on("click", function() { //4
    	event.preventDefault(); //prevent the button from executing
   		newTopic = $("#topic-input").val().trim().toLowerCase(); // Grab the input from the textbox
    	console.log("got the newTopic " + newTopic); //WORKING
		topics.push(newTopic);
	//	generateButtons();
	}) //4 

	//generateButtons(); //when page loads, show the buttons
	console.log("end 1st function"); //WORKING

	$("#myTopic").on("click", function() { //5 Adding click event listener to buttons
	console.log("button clicked");
  	topic = $(this).attr("data-name"); // Grabbing and storing the data-name value from the button
  	console.log("line 34 topic " + topic); 
	
	// getTheGifs();
	//function getTheGifs() { //6
	// Constructing a queryURL using the topic name
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=qt7hfQSsEX423SLcRsTU9j0P32dk7E38&limit=10";

	// Performing an AJAX request with the queryURL
	$.ajax({ //7
		url: queryURL,
	  	method: "GET"
  	}) //7
	  
	// After data comes back from the request
	.then(function(response) { //8
    console.log("queryURL being sent " + queryURL); 

	console.log(response); 
  	results = response.data; // storing the data from the AJAX request in the results variable
  	console.log("results variable has " + results); 

	// Looping through each of the 10 result items to display with rating
  	for (var i = 0; i < results.length; i++) {
    	var topicDiv = $("<div>");     // Creating and storing a div tag
    	var topicImage = $("<img>");   // Creating and storing an image tag
    	topicImage.attr("src", results[i].images.fixed_height_still.url); // Setting the src attribute of the image to a property pulled off the result item
   		var p = $("<p>").text("Rating: " + results[i].rating); // Creating a paragraph tag with the result item's rating
    	topicDiv.append(topicImage);  // Appending the paragraph and image tag to the topicDiv
    	topicDiv.append(p);
    	$("#gifs-go-here").prepend(topicDiv); // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
  	} //end for loop

}) //5
}) //6

}) //8

	function toggleGif() { //9
		// Code for the still <--> animated swapping
  		$(".gif").on("click", function() { //10
   	 		// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    		var state = $(this).attr("data-state");
   	 		// If the clicked image's state is still, update its src attribute to what its data-animate value is.
  	  		// Then, set the image's data-state to animate
   	 		// Else set src to the data-still value
   	 			if (state === "still") { //11
      				$(this).attr("src", $(this).attr("data-animate"));
     				$(this).attr("data-state", "animate");
   			 		} else { //11 and 12
      					$(this).attr("src", $(this).attr("data-still"));
      					$(this).attr("data-state", "still");
   	 			} //12 end if else
		}); //end 10
}; //end 1

