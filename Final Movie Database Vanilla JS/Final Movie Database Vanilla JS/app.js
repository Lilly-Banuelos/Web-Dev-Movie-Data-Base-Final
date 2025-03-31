/*
Name: Lilly Jarvis (Banuelos)
Date: 05/05/2023
Program Purpose: This allows a user to select and buy movie tickets based on the movies they add to their "cart"
*/

// Global Variables
// this keeps track of the number of movies to display
var numMovies = 3;
// this is my personal api key needed to use the movieDB API
var apiKey = "79d88030eb379f11aec114b40ab499fb";
// this initiates a variable that keeps track of the poster path
var image;
// this variable will keep track of the title of the movie given from the api
var title;
// this variable will keep track of the summary of the movie given from the api
var summary;
// This is a counter
var numClicks = -1;
// this is a regex that is the pattern for the credit card number to match. it requires 4 sets of 4 numbers between 0 and 9
var cardPattern = /^(\d{4})(\d{4})(\d{4})(\d{4})$/;

// this gets the movieOption object and stores it in the movieOption variable
var movieOption = document.getElementById('movieOption');
// this gets the form1 object and stores it in the form variable
var form = document.getElementById('form1');
// this gets the form2 object and stores it in the form2 variable
var form2 = document.getElementById('form2');

// this is an array that will hold the movies chosen in the multiple select option and the number of tickets per movie the user enters
let selectedMovies = [];

// this only runs if form1 is on the document
if (document.body.contains(form))
{


  // API STUFF
  // Function that calls the API into the program for the movie data
  function loadXMLDoc() {
      // Creates a new XMLHTTP request and stores it in the function xhttp
      var xhttp = new XMLHttpRequest();
      // if block that runs only if the data was found and the response to the API request was a success
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // this stores the json response text string in the movieAPI variable
          movieAPI =
          this.responseText;
          // this converts the json response text string stored in the movieAPI variable into an object
          movieAPIObj = JSON.parse(movieAPI);

          // this creates an input object
          var submitBtn = document.createElement('input');
          // this sets the type of the input object to a submit button
          submitBtn.type= "submit";
          // this sets the id for the submit button
          submitBtn.id = "submitBtn1"
          // this sets the words displayed inside the button to "Proceed to Purchase"
          submitBtn.value = "Proceed to Purchase";

          // this runs for the number of movies called by the api chosen by the numMovies variable
          for (i= 0; i < numMovies; i++)
          {
            // this sets the title variable to a movie title based on the iteration number
            title = movieAPIObj.results[i].title
            // this sets the summary variable to a movie summary paragraph based on the iteration number
            summary = movieAPIObj.results[i].overview
            // this sets the image variable to a movie poster path based on the iteration number
            image = movieAPIObj.results[i].poster_path

            // this creates an h1 object
            var titleDisplay = document.createElement('h1');
            // this sets the words displayed inside the h1 to the movie title based on iteration
            titleDisplay.innerHTML = title;
            // this adds a class name to the title displayed for styling purposes
            titleDisplay.className = "title"
            // this appends the title displayed based on iteration number to the document
            document.body.appendChild(titleDisplay);

            // this creates an img object
            var movies = document.createElement('img');
            // this adds an id to the movie image element based in iteration number
            movies.id = "movie" + [i +1];
            // this adds a class name to the img element for styling purposes
            movies.className = "movies"
            // this sets the source file of the image displayed to the moviedb website url and the poster path for the movie based on iteration number
            movies.src = "https://image.tmdb.org/t/p/original/" + image;
            // this appends the title displayed based on iteration number to the document
            document.body.appendChild(movies);

            // this creates an h2 element
            var summaryDisplay = document.createElement('h2');
            // this sets the h2 element's words displayed to the movie summary based on the iteration
            summaryDisplay.innerHTML = summary;
            // this adds a class name to the h2 element for the purpose of styling
            summaryDisplay.className = "summary"
            // this appends the h2 element to the page based on iteration number
            document.body.appendChild(summaryDisplay);

            // this only runs if the page has the form1 form on it
            if (document.body.contains(form))
            {
              // this creates an option element
              var option = document.createElement('option');
              // this adds a value based on the movie title and loop iteration to the option element
              option.value = title;
              // this sets the option element for the multiple movie selection input based on the title of the movie grabbed by the iteration of the loop and displays it for the user to select
              option.innerHTML = title;
              // this appends the movie option to the movieOption selection box based on iteration
              movieOption.appendChild(option);
            }

            // this function runs only after an option from the movieOption selection box is selected, taking the clicked object and page properties as a parameter
            function tickets(e)
            {
              // this updates the numClicks counter
              numClicks += 1;

              // this creates an h2 element
              var titleMovie = document.createElement('h2');
              // this sets the inner display of the h2 to the clicked object's innerHTML, in this case a movie title
              titleMovie.innerHTML = e.target.innerHTML;
              // this appends the h2 element to the page after a movie option is selected
              form.appendChild(titleMovie);

              // this creates a label object
              var movieLabel = document.createElement('label');
              // this says what element this label goes with, in this case for movieTickets
              movieLabel.for = "movieTickets";
              // this sets the display of the movie label to "Number of Tickets"
              movieLabel.innerHTML = "Number of Tickets";
              // this appends the label object to the page after a movie option has been selected
              form.appendChild(movieLabel);

              // this creates a variable that holds an input object
              var movieTickets = document.createElement('input');
              // this sets the type of input box to numbers
              movieTickets.type = "number";
              // this adds a default value of 0 to tickets to purchase so that if a user didn't mean to buy tickets for a particular movie they won't be charged
              movieTickets.defaultValue = "0";
              // this sets the name for the label object's reference based on the loop iteration
              movieTickets.name = "movieNum" + i;
              // this adds an id to the number input object based on the numClicks counter
              movieTickets.id = "movieTickets" + numClicks;
              // this appends the number object to the page so the user can enter th enumber of movies they want to buy for the movie they selected/clicked on
              form.appendChild(movieTickets);

              // this appends the submit button for form 1 to the page
              form.appendChild(submitBtn);
            }
  
            // this adds a click event listener that will run only once after an option from the movie options selection box has been clicked on and calls the tickets function
            option.addEventListener("click", tickets, {once : true})
          }
        }
      };
      // creates a request to send to the website server for the moviedb API for the movie values
      xhttp.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=en-US", true);
      // sends the request above to the moviedb API website server
      xhttp.send();
  }
  // this runs the loadXMLDoc function, but only if the page has form1 on it
  loadXMLDoc();
}
// this only runs if the page has form2 on it
if (document.body.contains(form2))
{
  // this gets the button element from the form2 form and adds a click event listener that will run the orderSummary function after clicked
  document.getElementById('confirmButton').addEventListener("click", orderSummary); 

  // this calls the printQuery function which gets information from the search bar and adds it to an array
  printQuery()
}

// this is a function that gets information from the search bar, turns it into a more readable format, and ads the values to an array
function printQuery()
  {
    // this creates a variables that stores the substring at index 1 from the browser bar
    var query = window.location.search.substring(1);
    // this creates an array that stores the substring from the browser bar but splits it into pieces whenever & is in the string
    var vars = query.split("&");

    // this runs for the length of the number of items the string was split into
    for (var i = 0; i < vars.length; i++)
    {
      // this splits the vars array based on iteration into more substrings based on wherever = is in the string
      var pair = vars[i].split("=");

      // this adds the 1st index of the pair array to the end of the selectedMovies array, replacing any + characters with a blank space and any %27 areas in the string with an apostrophe
      selectedMovies.push(pair[1].replaceAll("+", " ").replaceAll("%27", "'"))
    }
  }

// this is a function that takes a parameter and runs after the confirm button is clicked on form2 and updates the page using the DOM
function orderSummary(e)
{
  // this stops the form from submiting like it normally would
  e.preventDefault();

  // this creates a variable that gets the value entered by the user in the credit card section and stores it
  var card = document.getElementById('cardNum').value;

  // if name wrong but credit card good. name is less than 5 characters and the card number entered by the user matches the pattern stored in the cardPattern variable
  if (document.getElementById('name').value.length < 5 && cardPattern.test(card) == true)
  {
    // adds an error message to form 2
    form2.innerHTML += '<br>Invalid Submission. Name must be at least 5 characters long.'
  }
  // if name right but credit card wrong. name is more than or equal to 5 characters and the card number entered by the user doesn't match the pattern stored in the cardPattern variable
  else if (document.getElementById('name').value.length >= 5 && cardPattern.test(card) == false)
  {
    // adds an error message to form 2
    form2.innerHTML += '<br>Invalid Submission. Card number must be 16 digits long and only contain numbers.'
  }
  // if name right and credit card right. name is more than or equal to 5 characters and the card number entered by the user matches the pattern stored in the cardPattern variable
  else if (document.getElementById('name').value.length >= 5 && cardPattern.test(card) == true)
  {
    // changes the form2's display to the purchase summary including the user entered name and credit card number by getting the elements by their ids
    // gets the last four characters of the user entered credit card number by creating a substring of the length minus 4
    form2.innerHTML = "PURCHASE SUMMARY<br><br>Name: " + document.getElementById('name').value + "<br>Credit Card Number: xxxx-xxxx-xxxx-" + document.getElementById('cardNum').value.substr(document.getElementById('cardNum').value.length - 4) + "<br><br>";
    
    // runs for the length of the first half of the selectedMovies array
    for (i = 0; i < selectedMovies.length/2; i++)
    {
      // adds a description for the name of the movies the user purchashed
      form2.innerHTML += "Movie Purchased:<br>"
      // adds the name of the first movie the user bought based on itereation to form2
      form2.innerHTML += selectedMovies[i] + "<br>"
      form2.innerHTML += "Tickets:<br>"
      // adds the number of tickets the user bought for the movie displayed above based on itereation to form2
      form2.innerHTML += selectedMovies[i + selectedMovies.length / 2] + "<br><br>"
    }

  }
  // if name wrong and credit card wrong. name is less than 5 characters and the card number entered by the user doesn't match the pattern stored in the cardPattern variable
  else if (document.getElementById('name').value.length < 5 && cardPattern.test(card) == false)
  {
    // adds an error message to form 2
    form2.innerHTML += '<br>Invalid Submission. Name must be at least 5 characters long. Card number must be 16 digits long and only contain numbers.'
  }
}