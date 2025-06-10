
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector(".current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  searchCity(city)

}

function searchCity (city) {
  let apiKey = "o7ae8422tbf7a3d6181c62ca5104de1d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(forecastUrl).then(response => displayForecast(response.data));

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");


function displayTemperature(response) {
  let cityTemp = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
  let humidityTemp =Math.round(response.data.temperature.humidity);
  let windTemp=Math.round(response.data.wind.speed);
  let tempDescription = response.data.condition.description;


  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let iconElement = document.querySelector("#temperature-icon");
  let humidityElement = document.querySelector(".humidity-temp");
  let windElement = document.querySelector(".wind-temp");
  let descriptionElement = document.querySelector(".temp-description");

  cityElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${cityTemp}°C`;
  humidityElement.innerHTML = `${humidityTemp}%`
  windElement.innerHTML = `${windTemp} km/h`
  descriptionElement.innerHTML = `${tempDescription}`;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);


}

function displayForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = ""; 

  forecast.daily.slice(0, 3).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let options = { weekday: 'short' };
    let dayName = date.toLocaleDateString(undefined, options);

    forecastElement.innerHTML += `
      <div class="forecast-day">
        <div><strong>${dayName}</strong></div>
        <img src="${day.condition.icon_url}" alt="${day.condition.description}" width="50"/>
        <div>${Math.round(day.temperature.maximum)}° / ${Math.round(day.temperature.minimum)}°</div>
      </div>
      
    `;
  });
}

