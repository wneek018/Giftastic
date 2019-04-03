// array of strings
var topics = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Neville Longbottom", "Ginny Weasley", "Snape", "Sirius", "McGonagall", "Dumbledore", "Voldemort", "Malfoy", "Hagrid"];

// this function re-renders the HTML to display the appropriate content
function displayCharacterInfo() {

  var character = $(this).attr('data-character');
  var APIKey = "akyrp3X2ypaJluATUZ1D5tSvN4r2dXbN";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + '&api_key=' + APIKey + '&limit=10';

  // Creating an ajax call for the specific character button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Create a div to hold the character
    var characterDiv = $("<div class='character'>");

    for (var i = 0; i < response.data.length; i++) {
      // Store the rating data
      var rating = response.data[i].rating;
      // Retrieve the still URL for the giphy
      var stillGiphyURL = response.data[i].images.original_still.url;
      var animateGiphyURL = response.data[i].images.original.url;

      // Create an element to have the rating displayed
      var displayRating = $('<p>').text('Rating: ' + rating);
      // Display the rating
      //characterDiv.prepend(displayRating);

      // Create an element to hold the giphy
      var giph = $('<img>').attr('src', stillGiphyURL);
      giph.attr('data-still', stillGiphyURL);
      giph.attr('data-animate', animateGiphyURL);
      giph.attr("alt", "giphy image");
      giph.attr("class", "gif");
      // Set giphy state to still
      giph.attr("data-state", "still");

      // creating new div to keep giphy and paragraph together
      var imgContainer = $('<div class="img-container">')
      imgContainer.append(giph);
      imgContainer.append(displayRating);
      
      // Append the giphys
      characterDiv.prepend(imgContainer);

      // Put the entire giphy click info above the previous giphy searches
      $('#giphy-container').prepend(characterDiv);
    }

    // on giphy click, call animate giphy function
    $(".gif").on("click", animateGiphy);
  });
}

// Create a function for displaying the HP character data
function makeButtons() {

  // Delete the characters prior to adding new characters (so you don't have repeat buttons)
  $('#button-view').empty();

  // Loop through the array of HP characters
  for (var i = 0; i < topics.length; i++) {

    // Then dynamically generate buttons for each character in the array. This code $('<button>') is all jQuery needs to create the beginning and end tag.
    var newButton = $('<button type="button" class="btn btn-warning">');
    // Adding a class of character-btn to our button
    newButton.addClass('character-btn');
    // Adding a data-attribute
    newButton.attr('data-character', topics[i]);
    // Providing the initial button text
    newButton.text(topics[i]);
    // Adding the button to the buttons-container div
    $('#button-view').append(newButton);
  }
}

function animateGiphy() {
  // when the user clicks on a giphy

  var state = $(this).attr("data-state");

  // if the state is still, change the data-state attribute to animate
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    // if the state is anything else, change the data-state attribute to still
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}


$(document).ready(function () {

  // This function handles events where a character button is clicked
  $('#add-character').on('click', function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var character = $('#character-input').val().trim();

    // Adding character from the input box to our array
    topics.push(character);

    // Calling makeButtons which handles the processing of our character array
    makeButtons();
  });


  // Adding a click event listener to all elements with a class of 'character-btn'
  $(document).on('click', '.character-btn', displayCharacterInfo);


  // Calling the makeButtons function to display the initial buttons
  makeButtons();

});

