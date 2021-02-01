$(document).ready(function () {
  // Grab search item and store it in a variable
  function userSearch() {
    let search = $("#enter-city").val().trim();
    return search
  }

  // On click event for submit button calls API
  $("#search-btn").click(function (e) {
      if ($("input").val() != "") {
      e.preventDefault();
      let searchItem = userSearch();
        if (searchItem === searchHistory[0]) {
          alert("Data for " + searchItem + " is already showing");
          $("#enter-city").val("");
          preventDefault();
        }
        searchHistory.unshift(searchItem);
        covidLocal();
        covidNational();
        $("#enter-city").val("");
      }
      else if ($("input").val() === "") {
        alert("Please enter a city");
        e.preventDefault();
      }
  })

  // Array to store searches
  var searchHistory = [];

  // Function to create url
  function urlBuild() {
    let city = searchHistory[0];
    let url = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla;areaName=' + city +
    '&structure={"date":"date","areaName":"areaName","newCasesBySpecimenDate":"newCasesBySpecimenDate","newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate","cumCasesBySpecimenDate":"cumCasesBySpecimenDate"}'
    return url;
  }
  
  // Function and AJAX to call API
  function covidLocal() {
    let covidURL = urlBuild();
    console.log(covidURL)
    $.ajax({
      url: covidURL,
      type: "GET",      
      success: function (response) {
        console.log(response);
        let area = response.data[2].areaName;
        let newCases = response.data[2].newCasesBySpecimenDate;
        let totalCases = response.data[2].cumCasesBySpecimenDate;
        let deaths = response.data[2].newDeaths28DaysByPublishDate;

        $(".results").html("");
        $(".results").css({"border":"2px solid red", "margin-bottom":"30px"})
        $(".results").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>Displaying Figures for: " + area + "</h4><h5>Data last updated 48hrs ago</h5></div>");
        $(".results").append("<h5 id='cases' class='col s3 cases green darken-1 white-text z-depth-2 center-align'>New cases: </h5>");
        $("#cases").append(newCases);
        $(".results").append("<h5 id='deaths' class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2 center-align'>Deaths: </h5>");
        $(".deaths").append(deaths);
        $(".results").append("<h5 id='total' class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2 center-align'>Total cases to date: </h5>");
        $("#total").append(totalCases); 
      }
    })
  }

  function covidNational() {
    $.ajax({
      url: 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","hospitalCases":"hospitalCases","newAdmissions":"newAdmissions","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate","cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate"}',
      type: "GET",      
      success: function (response) {
        console.log(response);
        let newCasesNational = response.data[3].newCasesByPublishDate;
        let totalCasesNational = response.data[3].cumCasesByPublishDate;
        let deathsNational = response.data[3].cumDeaths28DaysByPublishDate;
        let hospitalNational = response.data[3].hospitalCases;
        let admissionsNational  = response.data[3].newAdmissions;

        $(".national").css({"border":"2px solid red", "margin-bottom":"30px"})
        $(".national").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>National Figures: </h4><h5>Data last updated 48hrs ago</h5></div>");
        $(".national").append("<h5 id='casesNat' class='col s3 cases green darken-1 white-text z-depth-2 center-align'>New cases: </h5>");
        $("#casesNat").append(newCasesNational);
        $(".national").append("<h5 id='deathsNat' class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2 center-align'>Deaths: </h5>");
        $("#deathsNat").append(deathsNational);
        $(".national").append("<h5 id='totalNat' class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2 center-align'>Total cases to date: </h5>");
        $("#totalNat").append(totalCasesNational);
      }
    })
  }
})


