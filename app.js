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
  
    let apiKey = "o7ae8422tbf7a3d6181c62ca5104de1d";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  function displayTemperature(response) {
    let cityTemp = Math.round(response.data.temperature.current);
    let cityName = response.data.city;
    let conditionDescription = response.data.condition.description;
    let humidityTemp =Math.round(response.data.temperature.humidity);
    let windTemp=Math.round(response.data.wind.speed);
    let tempDescription = response.data.condition.description;

  
    let cityElement = document.querySelector("#current-city");
    let temperatureElement = document.querySelector(".current-temperature-value");
    let emojiElement = document.querySelector (".current-temperature-emoji");
    let humidityElement = document.querySelector(".humidity-temp");
    let windElement = document.querySelector(".wind-temp");
    let descriptionElement = document.querySelector(".temp-description");
  
    cityElement.innerHTML = `${cityName}`;
    temperatureElement.innerHTML = `${cityTemp} °C`;
    emojiElement.innerHTML = getWeatherEmoji(conditionDescription);
    humidityElement.innerHTML = `${humidityTemp}%`
    windElement.innerHTML = `${windTemp} km/h`
    descriptionElement.innerHTML = `${tempDescription}`;

  }
  
  function getWeatherEmoji(description) {
    description = description.toLowerCase();

    if (description.includes("cloud")) return "☁";
    if (description.includes("rain")) return "🌧";
    if (description.includes("clear")) return "☀";
    if (description.includes("thunderstorm")) return "⛈";
    if (description.includes("fog") || description.includes ("mist")) return "🌫";

  };