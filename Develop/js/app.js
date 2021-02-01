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
    let url = 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=utla;areaName=' + city + '&structure={"date":"date","areaName":"areaName","newCasesBySpecimenDate":"newCasesBySpecimenDate","newDeaths28DaysByPublishDate":"newDeaths28DaysByPublishDate","cumCasesBySpecimenDate":"cumCasesBySpecimenDate"}'
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

        $(".results").append("<div class='row' style='padding-bottom:15px; text-align:center'><h4>Displaying Figures for: " + area + "</h4><h5>Data last updated 48hrs ago</h5></div>");

        $(".results").append("<div class='col s3 cases green darken-1 white-text z-depth-2' id='cases'>Cases: </div>");
        $("#cases").append(newCases);

        $(".results").append("<div class='col s3 deaths green darken-1 white-text offset-s1 z-depth-2' id='deaths'>Deaths: </div>");
        $("#deaths").append(deaths);

        $(".results").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='total'>Total cases to date: </div>");
        $("#total").append(totalCases); 

        covidNational();
      }
    })
  }

  function covidNational() {
    $.ajax({
      url: 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","hospitalCases":"hospitalCases","newAdmissions":"newAdmissions","covidOccupiedMVBeds":"covidOccupiedMVBeds","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate","cumDeaths28DaysByPublishDate":"cumDeaths28DaysByPublishDate"}',
      type: "GET",      
      success: function (resp) {
        console.log(resp);
        let casesNat = resp.data[3].newCasesByPublishDate;
        let hospital = resp.data[3].hospitalCases;
        let admissions = resp.data[3].newAdmissions;

        $(".results").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='cases-national'>New cases national: </div>");
        $("#cases-national").append(casesNat); 
        $(".results").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='hospital'>New hospital cases: </div>");
        $("#hospital").append(hospital); 
        $(".results").append("<div class='col s3 hospital green darken-1 white-text offset-s1 z-depth-2' id='admissions'>New hospital admissions: </div>");
        $("#admissions").append(admissions);
      }
    })
  }







})







