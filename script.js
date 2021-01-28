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

function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  
function getCurrentConditions(response){

    //temp to farenheit
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $("#currentCity").empty();

        // get and set the content 
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var city = $("<h4>").addClass("card-title").text(response.name);
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
        var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    
        // add to page
        city.append(cityDate, image)
        cardBody.append(city, temperature, humidity, wind);
        card.append(cardBody);
        $("#currentCity").append(card)


}