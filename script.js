//value of input
var city = $("#searchTerm").val();

//store API
var apiKey = "&appid=af2ff77aed8aed6e2fddf4fb660a9548";

var date = newDate();

$("#searchTerm").keypress(function(event){

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});


$("#searchBtn").on("click", function() {

    $('#forecastH5').addClass('show');
  
    // get the value of the input from user
    city = $("#searchTerm").val();
    
    // clear input box
    $("#searchTerm").val("");

//url to call api
var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

$.ajax({
    url: queryUrl,
    method: "GET"
})

.then(function(response) {
    console.log(response)
    console.log(response.name)

    console.log(response.weather[0].icon)
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF))

    console.log(response.main.humidity)

    console.log(response.wind.speed)

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
});
