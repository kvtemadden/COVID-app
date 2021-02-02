$(document).ready(function () {
  // Get local storage
  $(function getLocal() {
    let searchCity = localStorage.getItem("city");
    searchHistory.unshift(searchCity);
    covidLocal();
  })

  // Grab search item and store it in a variable
  function userSearch() {
    let search = $("#enter-city").val().trim();
    return search
  }

  // Shows modal when triggered
  function showModal(param) {
    $("#" + param + "").show();
  }

  // Hides modal when triggered 
  function hideModal(param) {
    $(".close-alert").click(function() {
      $("#" + param + "").hide();
    })  
  }

  // On click event for submit button calls API
  $("#search-btn").click(function (e) {
      if ($("input").val() != "") {
        e.preventDefault();
        let searchItem = userSearch();
        localStorage.setItem("city", searchItem);
          if (searchItem === searchHistory[0]) {
            showModal("modal-data");
            hideModal("modal-data");
            $("#enter-city").val("");
            preventDefault();
          }
        searchHistory.unshift(searchItem);
        covidLocal();
        $("#enter-city").val("");
      }
      else if ($("input").val() === "") {
        showModal("modal-entercity");
        hideModal("modal-entercity");
        e.preventDefault();
      }
  })

  // Array to store searches
  var searchHistory = [];

  // Function to create url
  function urlLocal() {
    const parameters = {
      "date":"date",
      "areaName":"areaName",
      "newCasesBySpecimenDate":"newCasesBySpecimenDate",
      "cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate",
      "cumCasesBySpecimenDate":"cumCasesBySpecimenDate"
    }
    let city = searchHistory[0];
    let url = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla;areaName=' + 
    city + '&structure=' + JSON.stringify(parameters);
    return url;
  }

  function urlNational() {
    const parameters = {
      "date":"date",
      "hospitalCases":"hospitalCases",
      "newAdmissions":"newAdmissions",
      "covidOccupiedMVBeds":"covidOccupiedMVBeds",
      "newCasesByPublishDate":"newCasesByPublishDate",
      "cumCasesByPublishDate":"cumCasesByPublishDate",
      "cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate",
      "covidOccupiedMVBeds":"covidOccupiedMVBeds"
    }
    let url = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure=' + 
    JSON.stringify(parameters);
    return url;
  }

  // Function and AJAX to call API
  function covidLocal() {
    let covidURL = urlLocal();
    console.log(covidURL);
    $.ajax({
      url: covidURL,
      type: "GET",      
      success: function (response) {
        // Retrieve JSON response
        let area = response.data[2].areaName;
        let newCases = response.data[2].newCasesBySpecimenDate;
        let deaths = response.data[2].cumDeaths28DaysByPublishDate;
        let totalCases = response.data[2].cumCasesBySpecimenDate;
        
        // Dynamically add local stats
        $("#results").html("");
        $("#results").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>Displaying Figures for: " + area + "</h4><h5>Data last updated 48hrs ago</h5></div>");
        $("#results").append("<div class='col s3 cases green darken-1 white-text z-depth-2' id='cases'>" + "New Cases: " + newCases + "</div>");
        $("#results").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='total'>" + "Total Cases: " + totalCases + "</div>");
        $("#results").append("<div class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2' id='deaths'>" + "Total Deaths: " + deaths + "</div>");

        // Make second API call
        covidNational();
      }
    })
  }

  function covidNational() {
    let covidURL = urlNational();
    console.log(covidURL);
    $.ajax({
      url: covidURL,
      type: "GET",      
      success: function (response) {
        // Retrieve JSON response
        let casesNat = response.data[3].newCasesByPublishDate;
        let totalCasesNat = response.data[3].cumCasesByPublishDate;
        let deathsNat = response.data[2].cumDeaths28DaysByPublishDate;
        let hospital = response.data[3].hospitalCases;
        let admissions = response.data[3].newAdmissions;
        let beds = response.data[3].covidOccupiedMVBeds;

        // Dynamically add national stats
        $("#results2").html("");
        $("#results2").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>Comparison to National Figures</h4><h5>Data last updated 48hrs ago</h5></div>");
        $("#results2").append("<div class='col s3 hospital green darken-1 white-text z-depth-2' id='cases-national'>" + "New Cases: " + casesNat + " </div>");
        $("#results2").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='total-national'>" + "Total Cases: " + totalCasesNat + "</div>");
        $("#results2").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='deaths-national'>" + "Total Deaths: " + deathsNat + "</div>");

        // Dynamically add hospital stats
        $("#results3").html("");
        $("#results3").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>Hospital Data for England</h4><h5>Data last updated 48hrs ago</h5></div>");
        $("#results3").append("<div class='col s3 hospital green darken-1 white-text z-depth-2' id='admissions'>" + "New Hospital Admissions: " + admissions + "</div>");
        $("#results3").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='hospital'>" + "Current Hospital Cases: " + hospital + "</div>");
        $("#results3").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='beds'>" + "Patients on Ventilators: " + beds + "</div>");
      }
    })
  }
})



