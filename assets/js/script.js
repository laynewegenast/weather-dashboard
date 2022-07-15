// open weather api key
var apiID = "3915bb75e2967e4d45ad85de1463bcf9"

var userInput = document.querySelector("#user-input");
var selectedCity = document.querySelector("#selected-city");
var cityDisplay = document.querySelector("#city-display");
var searchedCity = document.querySelector("#searched-city");
var currentWeather = document.querySelector("#current-weather");
var uvIndex = document.querySelector("#uv-index");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var previousCity = document.getElementById("#previous-search")

var cityArray = [];

//search for a city
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = selectedCity.value.trim();

    if (city) {
        getCurrentWeather(city);
        requestForecast(city);

        cityArray.push(city);
        localStorage.setItem("city", JSON.stringify(cityArray));

        selectedCity.value = "";

     } else {
        alert("Please enter a valid name");
    }
};

//previously searched city data
var clickHandler = function (event) {

    var clickCity = event.currentTarget.textContent;

    getCurrentWeather(clickCity);
    requestForecast(clickCity);
};

//request API
var getCurrentWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiID;

    // if response was successful 
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })

}

//request uv
var requestUV = function(lon, lat, city) {
    var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                requestUV(lon, lat, city);
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
   cityDisplay.textContent = '';
    searchedCity.textContent = searchTerm;

    var currentDateDisplay = document.querySelector("#current-date");
    var currentDate = moment();
    currentDateDisplay.textContent = currentDate.format("(L)");


    var displayTemp = document.querySelector("#temp");
    var currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    var displayHumidity = document.querySelector("#humidity");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 
 
    var displayWind = document.querySelector("#wind");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    var newCity = document.createElement("li");
    newCity.className = "list-group-item";
    newCity.textContent = searchTerm;
    newCity.addEventListener("click", clickHandler);
    previousCity.appendChild(newCity);

 
     var lon = city.coord.lon; 
     var lat = city.coord.lat; 
 
     requestUV(lon, lat, city);

};

//uv
var uvDisplay = function(data) {
    var uv = data.value;
        if (uv >= 6) {
            uvIndex.innerHTML=" " + uv + " ";
        } else if (uv > 3 ) {
            uvIndex.innerHTML=" " + uv + " ";
        } else {
            uvIndex.innerHTML=" " + uv + " ";
        }
};


//5 day forecast
var requestForecast = function(city) {
    var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + apiID;

    fetch(forecast).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                updatedForecast(data.list);
            });
        } else {
            alert("error");
        }
    })
};

//5 day display
 var updatedForecast = function(list) {
     for (var i=1; i<= 5; i++) {

     }
 }

// button functionality
userInput.addEventListener("submit", formSubmitHandler);