$(document).ready(function () {

    var userGenre = [];
    var length = userGenre.length + 1;

    $("input[type=checkbox]").prop("checked", false); //forces checkboxes unchecked on page load

    $("input[type=checkbox]").on("click", function () { //if checkbox is checked...
        preventFive();
        var clickedGenre = $(this).attr("id");
        var i = 0;

        if (jQuery.inArray(clickedGenre, userGenre) == -1) { // if value doesn't exist in array
            if ($(this).is(":checked")) { // and they've clicked a checkbox
                userGenre.push(clickedGenre); // add the genre of the checkbox to the array
            }
        }
        else if (jQuery.inArray(clickedGenre, userGenre) !== -1) { // else if the value does exist in the array, don't do add the genre if the user has "checked" the box as it already exists...
            if ($(this).not(":checked")) { // but if they have "unchecked" the box, remove from array
                for (i; i < userGenre.length; i++) { // loop through array values...
                    if (clickedGenre == userGenre[i]) { // if value is in list
                        userGenre.splice(i, 1); // remove value
                    }
                }
            }
        }
        console.log(userGenre); // testing purposes, log what's currently in user genre selection
        preventFive(); // repeated in order to update after the userGenre array has updated
    });

    $("#movie-search").on("click", function (event) {

        event.preventDefault(); //prevents default button event
        if ($("#move-search").text("Search")) {
        $("h5").text("Here's our recommendations...");
        $("#movie-search").text("Select Other Genres");
        for (var j = 0; j < userGenre.length; j++) {
            var currentFilm = userGenre[j];
            //api info
            var apiURL = "https://netflix-unofficial.p.rapidapi.com/api/search?genre=" + currentFilm;
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": apiURL,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "65462b90a2msha45c78653a0b714p1594f9jsnb99b8a6c5fd2",
                    "x-rapidapi-host": "netflix-unofficial.p.rapidapi.com"
                }
            };


            //Calling api
            $.ajax(settings).done(function (response) {
                 console.log(response);
            });
        }
    }
    else if ($("#movie-search").text("Select Other Genres")) {
        $("#movie-search").text("Search");
        $("h5").text("Use our generator to find movies or shows to watch!");
    }
    });

    function preventFive() { //stops users being able to select more than 5 genres at a time
        if (userGenre.length == 5) {
            if ($("input:checkbox:not(:checked)")) {
                var uncheckedBox = $("input:checkbox:not(:checked)");
                uncheckedBox.prop("disabled", true);
            }
        }
        else { 
            $("input:checkbox").prop("disabled", false);
        }
    }


});