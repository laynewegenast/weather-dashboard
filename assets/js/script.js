// open weather api key
var apiID = "3915bb75e2967e4d45ad85de1463bcf9"

var userInput = document.querySelector("#user-input");
var selectedCity = document.querySelector("#selected-city");
var cityDisplay = document.querySelector("#city-display");
var currentWeather = document.querySelector("#current-weather");
var uvIndex = document.querySelector("#uv-index");
var fiveDayForecast = document.querySelector("#5-day-forecast");

var citiesArray = [];

var displayCurrentWeather = function(city, searchTerm) {
    cityContainerEl.textContent = '';
    citySearchTerm.textContent = searchTerm;

    var displayCurrentDate = document.querySelector("#current-date");
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(L)");


    var displayTemp = document.querySelector("#temp");
    var currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    var displayHumidity = document.querySelector("#humidity");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 
 
    var displayWind = document.querySelector("#wind");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    var newCityEl = document.createElement("li");
    newCityEl.className = "list-group-item";
    newCityEl.textContent = searchTerm;
    newCityEl.addEventListener("click", clickHandler);
    previousCityEl.appendChild(newCityEl);

 
     var lon = city.coord.lon; 
     var lat = city.coord.lat; 
 
     searchCityUV(lon, lat, city);

};