function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}
function showTemperature(response) {
  let data = response.data;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let dateTimeElement = document.querySelector("#date-time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let temperature = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}`;
  dateTimeElement.innerHTML = formatDate(data.time);
  descriptionElement.innerHTML = data.condition.description;
  humidityElement.innerHTML = `${data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(data.wind.speed)} km/h`;
}
function searchCity(city) {
  let apiKey = "3dfefaofbc33edd4c68fae7t3005c4aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value.trim());
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
