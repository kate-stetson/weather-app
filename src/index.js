// Update Weekday, HH:MM
let now = new Date();
function getWeekdayTime() {
  let h2 = document.querySelector("h2");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  h2.innerHTML = `${currentDay}, ${currentHours}:${currentMinutes}`;
}

// Update Month + Day, Year
function getMonthDayYear() {
  let h3 = document.querySelector("h3");
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();
  h3.innerHTML = `${currentMonth} ${currentDate}, ${currentYear}`;
}

// Forecast Results
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
         src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
         alt=""
         width="40"
      />
      <div class="forecast-temperatures">
        <span class="forecast-temp-max">18°</span>
       <span class="forecast-temp-min">12°</span>
    </div>
   </div>
   `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "880159dc4a3e968e542dca97965934f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// Searched Location Results
function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function displaySearch(city) {
  let apiKey = "880159dc4a3e968e542dca97965934f7";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  displaySearch(city);
}

// Current Location Results
function currentLocation(position) {
  let apiKey = "880159dc4a3e968e542dca97965934f7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(geolocationUrl).then(showTemperature);
}

function retrieveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", retrieveCurrentLocation);

// Celsius Link
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  // remove the active class from the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

// Fahrenheit Link
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  // remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

getWeekdayTime();
getMonthDayYear();
displaySearch("Atlanta");
