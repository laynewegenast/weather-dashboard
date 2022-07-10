// open weather api key
var apiID = "3915bb75e2967e4d45ad85de1463bcf9"

var userInput = document.querySelector("#user-input");
var selectedCity = document.querySelector("#selected-city");
var cityDisplay = document.querySelector("#city-display");
var searchedCity = document.querySelector("#searched-city");
var currentWeather = document.querySelector("#current-weather");
var uvIndex = document.querySelector("#uv-index");
var fiveDayForecast = document.querySelector("#five-day-forecast");

var citiesArray = [];

//search for a city

//previously searched city data

//request weather

//request uv
var requestUV = function(lon, lat, city) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                displayCurrentUv(lon, lat, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
        })
        
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
    })
};


//this displays the current weather for a city
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

//uv

//5 day forecast

//5 day display

// button functionality
userFormEl.addEventListener("submit", formSubmitHandler);