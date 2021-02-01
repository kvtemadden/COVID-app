$(document).ready(function () {

    var userGenre = [];

    $("input[type=checkbox]").prop("checked", false); //forces checkboxes unchecked on page load
    
    //api info
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://netflix-unofficial.p.rapidapi.com/api/search?genre=" + userGenre,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "65462b90a2msha45c78653a0b714p1594f9jsnb99b8a6c5fd2",
            "x-rapidapi-host": "netflix-unofficial.p.rapidapi.com"
        }
    };

    $("input[type=checkbox]").on("click", function () { //if checkbox is checked...
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
    });

    $("#movie-search").on("click", function (event) {
        event.preventDefault(); //prevents default button event

        //Calling api
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });

});