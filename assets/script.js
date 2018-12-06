$(document).ready(function () {

    // Initial array of movie
    var movies = ["Aladdin", "Snow White", "Beauty and the Beast", "Little Mermaid"];
    var a;

    // Call the renderButtons function to have initial buttons on the page
    renderButtons();

    // Function for printing the buttons to the page
    function renderButtons() {

        // Deleting the movies prior to adding new movies is necessary otherwise we will have repeat buttons
        $("#buttons-view").empty();

        // Loop through the array of movies
        for (var i = 0; i < movies.length; i++) {

            // Dynamically generate buttons for each movie in the array
            a = $("<button>");

            // Add a class of movie to our button
            a.addClass("movie");

            // Add a data-attribute
            a.attr("data-name", movies[i]);

            // Providing the initial button text
            a.text(movies[i]);

            // Printint buttons to the HTML
            $("#buttons-view").append(a);
        }
    }

    // A click event function for the Submit button
    $("#add-movie").on("click", function (event) {

        // Prevent the button from submitting a form
        event.preventDefault();

        // Grab the input from the textbox
        var userInput = $("#userInput").val().trim();

        // If the user doesn't type anything, but hits the submit button, alert that they didn't type anything!
        if (userInput === "") {
            $("#userInput").val("Type a Movie Here!");

        // Clear out input box if they press submit after previous if statement
        } else if (userInput === "Type a Movie Here!") {
            $("#userInput").val("");

        // Only add to the array if it's not already in the array
        } else if (movies.includes(userInput) === false) {

            // Add the movie from the textbox to our array
            movies.push(userInput);

            // Calling our renderButtons function to print the new movie array
            renderButtons();

            // Clear the user input
            $("#userInput").val("");

        // If userInput is already a part of the movie array, clear the userInput text.
        } else {
            $("#userInput").val("");
        }
    })

    // Function that runs the API Call
    function getAPIData(movie) {

        // Variable for API Key
        var apiKey = "lNrcuWVzgpolH5AD0pc4lmBaZc6pmTKl";

        // Variable for query URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=disney " + movie + "&api_key=" + apiKey + "&limit=10";

        // API Call
        $.ajax({
            url: queryURL,
            method: "GET"

            // Wait until we get response from API call, then run the following response
        }).then(function (response) {

            // Grab the response.data and store it in a variable
            var gifs = response.data;
            console.log(response.data);

            // Clear out the html of any gifs already there
            $("#gif-view").empty();
            $(".gifbox").addClass("border border-dark");

            // For loop to go through all the of the GIFS
            for (var i = 0; i < gifs.length; i++) {

                // If the rating is NOT r or pg-13
                if (gifs[i].rating !== "r" && gifs[i].rating !== "pg-13") {

                    // Create a var to hold the rating
                    var rating = gifs[i].rating;

                    // Var to store gif image
                    var disneyMovie = $("<img>");

                    // Var to store gif info
                    var gifInfo = $("<p>").text("Rated: " + rating);

                    // Give the gifs attributes from the API results
                    disneyMovie.addClass("gif");
                    disneyMovie.attr("src", gifs[i].images.fixed_height_small_still.url);

                    // Data attributes to store in the HTML for later use when clicked to play & pause
                    disneyMovie.attr("data-state", "still");
                    disneyMovie.attr("data-animate", gifs[i].images.fixed_height_small.url);
                    disneyMovie.attr("data-still", gifs[i].images.fixed_height_small_still.url);

                    // Appending image & rating to HTML w/ instructions to play the gif
                    $("#instructions").text("Click the image to play the Gif!");
                    $("#gif-view").prepend(gifInfo);
                    $("#gif-view").prepend(disneyMovie);
                }
            }
        });
    }

    // On click event for when a Movie name button is clicked
    $("#buttons-view").on("click", ".movie", function (event) {

        // Store the movie name with the attribute data-name
        var movie = $(this).attr("data-name");

        // Get the API data from the movie this this data-name
        getAPIData(movie);

        // Take the selected class off of all the buttons
        $('button').removeClass('selected');

        // Add the selected class to the button that is clicked (for CSS styling)
        $(this).addClass('selected');
    });

    // On click event for when a gif is clicked
    $("#gif-view").on("click", ".gif", function (event) {

        // Grab the state of the gif and store it in a variable
        var state = $(this).attr("data-state");

        // if the state is still...
        if (state === "still") {

            // Change the image source to the data-animate attribute url
            $(this).attr("src", $(this).attr("data-animate"));

            // Change the data-state attribute of the image to animate
            $(this).attr("data-state", "animate");

            // if the state is not still (if it is "animate")
        } else {

            // Change the image source to the data-still attribute url 
            $(this).attr("src", $(this).attr("data-still"));

            // Change the data-state attribute of the image to still
            $(this).attr("data-state", "still");
        }
    });
})
