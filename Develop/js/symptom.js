$(document).ready(function () {

    $("input[type=checkbox]").prop("checked", false); //forces checkboxes unchecked on page load

    $('.modal').modal();
    $('.tooltipped').tooltip();
    var numCheckedBoxes = 0;
    var userSelectedSymptoms = [];
    var userSymptoms = "";

    function checkedCount() {
        numCheckedBoxes = $("input:checked").length;
    }

    $("input[type=checkbox]").on("click", function () {
        var clickedSymptom = $(this).next().text().slice(0, -2);
        if (jQuery.inArray(clickedSymptom, userSelectedSymptoms) == -1) { // if value doesn't exist in array
            if ($(this).is(":checked")) { // and they've clicked a checkbox
            userSelectedSymptoms.push(clickedSymptom);
        }
        }
        else if (jQuery.inArray(clickedSymptom, userSelectedSymptoms) !== -1) { // else if the value does exist in the array, don't do add the Symptom if the user has "checked" the box as it already exists...
            if ($(this).not(":checked")) { // but if they have "unchecked" the box, remove from array
                for (var i = 0; i < userSelectedSymptoms.length; i++) { // loop through array values...
                    if (clickedSymptom == userSelectedSymptoms[i]) { // if value is in list
                        userSelectedSymptoms.splice(i, 1); // remove value
                    }
                }
            }
        }
        checkedCount();
        console.log(numCheckedBoxes);
        console.log(userSelectedSymptoms);
    });

    $("#get-advice").on("click", function () {
        var modalHeader = $("#modal-header");
        var modalContent = $("#modal-text-content");
        getSymptoms();
        if (numCheckedBoxes == 0) {
            modalHeader.text("What to do if you have symptoms");
            modalContent.html("<p>If you have any of the main symptoms of coronavirus:</p><ol><li>Get a test to check if you have coronavirus as soon as possible.</li><li>You and anyone you live with should stay at home and not have visitors until you get your test result – only leave your home to have a test.</li></ol><p>Anyone in your support bubble should also stay at home if you have been in close contact with them since your symptoms started or during the 48 hours before they started.</p>");
        }
        else if (numCheckedBoxes > 0) {
            modalHeader.text("What to do next");
            modalContent.html("<p>You've told us you have " + userSymptoms + ".</p><p>Based on this information, we suggest that you book yourself in for a Coronavirus test using the NHS service. You can <a href='https://www.gov.uk/get-coronavirus-test'>book yourself a test on this page</a>.</p><p>In the meantime, you should self-isolate until you receive the results of your test.</p>");
        }

    });

    $(document).on("click", function() {
        if ($("#modal1").hasClass("modal-open")) {

        }
        else {
            userSymptoms = "";
        }
    });

    $(".modal-close").on("click", function () {
        userSymptoms = "";
    });

    function getSymptoms() {
        for (var i = 0; i < userSelectedSymptoms.length; i++) {
            if (userSelectedSymptoms.length == 1) {
                userSymptoms = userSymptoms + (userSelectedSymptoms[i]).toLowerCase();
            }
            else {
                if (userSymptoms.length > 1) {
                    userSymptoms = userSymptoms + ((userSelectedSymptoms.length == 2) ? " and " : (i == 1) ? ", " : " and ") + (userSelectedSymptoms[i]).toLowerCase();
                }
                else {
                    userSymptoms = userSymptoms + (userSelectedSymptoms[i]).toLowerCase();
                }
            }
        }

    }

    $('.sidenav').sidenav();

});