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
    response.data.weather[0].main;
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

getWeekdayTime();
getMonthDayYear();
displaySearch("Atlanta");
