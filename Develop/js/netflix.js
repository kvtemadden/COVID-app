$(document).ready(function () {

    var userGenre = [];
    var movieCollections = [];
    var movies = {
        "Action": ["Black Panther", "Mission: Impossible - Fallout", "Mad Max: Fury Road", "Spider-Man: Into the Spider-Verse", "Wonder Woman", "Dunkirk", "Baby Driver", "Thor: Ragnarok", "The Bourne Identity", "Incredibles 2"],
        "Classics": ["Stand By Me", "The Breakfast Club", "Shawshank Redemption", "Rebel Without a Cause", "Gone With the Wind", "The Wizard of Oz", "Psycho", "Grease", "Dirty Dancing", "Footloose"],
        "Comedies": ["Superbad", " Can't Hardly Wait", "Cloudy with a Chance of Meatballs", "50 First Dates", "Easy A", "Hail Caesar", "The Other Guys", "Scott Pilgrim vs. the World", "Wine Country", "Get Him to the Greek"],
        "Documentaries": ["Blue Planet", "The Last Dance", "My Octopus Teacher", "American Murder: The Family Next Door", "Tiger King", "Louis Theroux: Savile", "Unsolved Mysteries", "The Disappearance of Madeleine McCann", "The Confession Killer", "Jeffrey Epstein: Filthy Rich"],
        "Dramas": ["The Dig", "365 Days", "Rebecca", "The Green Mile", "Warrior", "Ava", "Bird Box", "Falling Down", "Twilight", "The Hunger Games"],
        "Horror": ["Sinister", "Annabelle", "Insidious", "The Exorcist", "The Ring", "The Grudge", "Thirteen", "The Babadook", "Eden Lake", "Final Destination"],
        "International": ["Parasite", "The Wailing", "Death Note", "Bleach", "Train to Busan", "Monsoon Wedding", "Woman at War", "The Salesman", "Ida", "Roma"],
        "Musicals": ["Mamma Mia!", "Les Miserablés", "Hairspray", "Hamilton", "Little Shop of Horrors", "The Sound of Music", "The Rocky Horror Picture Show", "Willy Wonka & the Chocolate Factor", "Cats", "Bohemian Rhapsody"],
        "Romance": ["Blended", "Bridget Jones's Diary", "The Notebook", "Fifty Shades of Grey", "Five Feet Apart", "The Proposal", "Her", "Titanic", "Romeo and Juliet", "Crazy Rich Asians"]
    };
    var movieContent = $("<div class='row center'></div>");


    $("input[type=checkbox]").prop("checked", false); //forces checkboxes unchecked on page load

    $("input[type=checkbox]").on("click", function () { //if checkbox is checked...
        preventFive();
        var clickedGenre = $(this).attr("id"); // gets the selected genre
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

        var l = 0;
        var fillArray = 5 - userGenre.length;
        if (userGenre.length < 5) { // if user selects less than 5 genres, fill array with their chosen genres
            while (l < fillArray) {
                userGenre.push(userGenre[l]);
                l++;
            }
        }

        if ($(this).hasClass("return") == true) { // returns to search view
            $(this).removeClass("return");
            $(this).text("Search");
            $("#search-desc").text("Search by Genre");
            $("#page-title").show();
            $("#page-desc").show();
            $(".show").show();
            $(".r").remove();
            $("input[type=checkbox]").prop("checked", false);
            $("input:checkbox").prop("disabled", false);
            userGenre = [];
            a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }

        else {
            r = [];
            $(this).addClass("return");
            $(this).text("Return to Search");
            $("#page-title").hide();
            $("#page-desc").hide();
            $(".show").hide();
            $("#content").append(movieContent);

            $("#search-desc").text("Here's our recommendations...");
            // ranNum(); // generates non repeating random number


            for (j = 0; j < userGenre.length; j++) {
                ranNum(); // generates non repeating random number
                // var currentFilm = userGenre[j];
                // selectFilm = movies[currentFilm][randomNum];
                genMovie(j);
                console.log(selectFilm);

                //api info
                var queryURL = "https://www.omdbapi.com/?t=" + selectFilm + "&apikey=trilogy";
                selectFilm = "";
                //Calling api
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    saveMovInfo(response);
                });
            };

            x = 0;
        }
    });
    var j = 0;
    var x = 1;
    var currentFilm;
    var selectFilm;

    function genMovie() {
        currentFilm = userGenre[j];
        // selectFilm = movies[currentFilm][Math.floor(Math.random() * 10)];
        selectFilm = movies[currentFilm][r[j]]; // generates film
        movieCollections.push(selectFilm); // pushes to film selection
    }

    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var r = [];

    function ranNum() {
        var i = Math.floor(Math.random() * 10); // generate random number up to 10
        for (var z = 0; z < r.length; z++) { // loop through r array...
            if (a[i] == r[z]) { // if integer exist, generate new number
                i = Math.floor(Math.random() * 10)
            }
        }
        r.push(a[i]); // push new random number to array for later comparison
    }

    function saveMovInfo(response) {
        if (userGenre.length == 5) {
            if (x <= 2) { // for the first three movies...
                // build out movie header, description and images
                var colEl = $("<div class='col s12 m4 r' id='mov-" + x + "'></div>");
                var imgEl = $("<img class='mov-poster r' src='" + response.Poster + "'/>");
                var movHEl = $("<p class='mov-header r'>" + response.Title + "</p>");
                var movDescEl = $("<p class='mov-desc-t r'>" + response.Plot + "</p>");

                // push to html
                $(movieContent).append(colEl);
                $(colEl).append(imgEl);
                $(colEl).append(movHEl);
                $(colEl).append(movDescEl);
            }
            else if (x > 2) { // for the last two...
                var colEl = $("<div class='col s12 m6 r' id='mov-" + x + "'></div>");
                var imgEl = $("<img class='mov-poster r' src='" + response.Poster + "'/>");
                var movHEl = $("<p class='mov-header r'>" + response.Title + "</p>");
                var movDescEl = $("<p class='mov-desc r'>" + response.Plot + "</p>");

                $(movieContent).append(colEl);
                $(colEl).append(imgEl);
                $(colEl).append(movHEl);
                $(colEl).append(movDescEl);
            }
            x++;
        }
    }



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