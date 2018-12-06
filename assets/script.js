$(document).ready(function () {

    // Initial array of movie
    var movies = ["Aladdin", "Snow White", "Beauty and the Beast", "Little Mermaid"];
    var a;

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

        // Add the movie from the textbox to our array
        movies.push(userInput);

        // Calling our renderButtons function to print the new movie array
        renderButtons();

        // Clear the user input
        $("#userInput").val("");
    })


    function getAPIData(movie) {
        var apiKey = "lNrcuWVzgpolH5AD0pc4lmBaZc6pmTKl";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=disney " + movie + "&api_key=" + apiKey + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var gifs = response.data;
            console.log(response.data);

            // Clear out the html of any gifs already there
            $("#gif-view").empty();

            // For loop to go through all the of the GIFS
            for (var i = 0; i < gifs.length; i++) {

                if (gifs[i].rating !== "r" && gifs[i].rating !== "pg-13") {

                    // Create a var to hold the rating
                    var rating = gifs[i].rating;
                    
                    // Var to store gif image
                    var disneyMovie = $("<img>");

                    // Var to store gif info
                    var gifInfo = $("<p>").text("Rated: " + rating);

                    // Give the gifs attributes from the API results
                    disneyMovie.addClass("gif");
                    disneyMovie.attr("src", gifs[i].images.original_still.url);

                    // Data attributes
                    disneyMovie.attr("data-state", "still");
                    disneyMovie.attr("data-animate", gifs[i].images.original.url);
                    disneyMovie.attr("data-still", gifs[i].images.original_still.url);

                    // Appending image & rating
                    $("#gif-view").prepend(gifInfo);
                    $("#gif-view").prepend(disneyMovie);
                }
            }
        });
    }

    $("#buttons-view").on("click", ".movie", function (event) {
        var movie = $(this).attr("data-name");
        getAPIData(movie);
    });

    $("#gif-view").on("click", ".gif", function(event) {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
})