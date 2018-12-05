$(document).ready(function () {

    // Initial array of moview
    var movies = ["Aristocats", "The Little Mermaid", "Snow White", "Cars"];
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
        })

    }
})