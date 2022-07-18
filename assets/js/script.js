// open weather api key
var apiID = "3915bb75e2967e4d45ad85de1463bcf9"

var userInput = document.querySelector("#user-input");
var selectedCity = document.querySelector("#selected-city");
var cityDisplay = document.querySelector("#city-display");
var searchedCity = document.querySelector("#searched-city");
var currentWeather = document.querySelector("#current-weather");
var uvIndex = document.querySelector("#uv-index");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var previousCity = document.getElementById("previous-search")

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
var displayUv = function(lon, lat, city) {
    var uvReq = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiID + "&lat=" + lat + "&lon=" + lon; 

    fetch(uvReq).then(function(response) {
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

    var newCity = document.createElement("ul");
    newCity.className = "prev-search-item";
    newCity.textContent = searchTerm;
    newCity.addEventListener("click", clickHandler);
    previousCity.appendChild(newCity);

 
     var lon = city.coord.lon; 
     var lat = city.coord.lat; 
 
     displayUv ((lon, lat, city));

};

//uv
var requestUV = function(data) {
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
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiID;

    // if response was successful 
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                updatedForecast(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

//5 day display
 var updatedForecast = function(list) {
     for (var i=1; i<= 5; i++) {

        var dayOne = document.querySelector("#day-1")
        var dayOneForecast = moment().add(1, 'day').format('L')
        dayOne.textContent = dayOneForecast;

        var dayTwo = document.querySelector('#day-2')
        var dayTwoForecast = moment().add(2, 'day').format('L')
        dayTwo.textContent = dayTwoForecast;

        var dayThree = document.querySelector('#day-3')
        var dayThreeForecast = moment().add(3, 'day').format('L')
        dayThree.textContent = dayThreeForecast;

        var dayFour = document.querySelector('#day-4')
        var dayFourForecast = moment().add(4, 'day').format('L')
        dayFour.textContent = dayFourForecast;

        var dayFive = document.querySelector('#day-5')
        var dayFiveForecast = moment().add(5, 'day').format('L')
        dayFive.textContent = dayFiveForecast;

        var displayTemp = document.querySelector (`#temp-${i}`)
        var dayTemp = list[i].main.temp + ' °F';
        displayTemp.textContent= dayTemp;

        var displayHumidity = document.querySelector( `#humidity-${i}`)
        var dayHumid = list[i].main.humidity;
        displayHumidity.textContent = dayHumid;

     }
 }

// button functionality
userInput.addEventListener("submit", formSubmitHandler);