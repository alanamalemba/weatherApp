const locationName = document.querySelector("[data-location-name]");
const locationRegion = document.querySelector("[data-location-region]");
const locationCountry = document.querySelector("[data-location-country]");
const lastUpdated = document.querySelector("[data-last-updated]");
const currentTemperature = document.querySelector("[data-current-temperature]");
const webpageBody = document.querySelector("body");
const currentWeatherIcon = document.querySelector(
  "[data-current-weather-icon]"
);
const currentWeatherText = document.querySelector(
  "[data-current-weather-text]"
);
const allDomElements = document.querySelectorAll("*");
const searchForm = document.querySelector("[data-search-form]");
const searchInput = document.querySelector("[data-search-input]");
const tempUnitButton = document.querySelector("[data-temp-unit-button]");
const loadingGif = document.querySelector("[data-loading-gif]");

let locationSearchName = "Nairobi";

let isDay = 1;
let isCelsius = true;
let currentWeatherInfo;

renderLocationWeather();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadingGif.style.display = "block";
  if (searchInput.value == "" || searchInput.value == null) return;
  locationSearchName = searchInput.value;
  renderLocationWeather();
});

tempUnitButton.addEventListener("click", () => {
  toggleTempUnits();
});

function toggleTempUnits() {
  isCelsius = !isCelsius;
  renderCurrentTempUnit();
}

function renderCurrentTempUnit() {
  if (isCelsius) {
    currentTemperature.innerHTML =
      currentWeatherInfo.current.temp_c + "<sup>&#8451;</sup>";
  } else {
    currentTemperature.innerHTML =
      currentWeatherInfo.current.temp_f + "<sup>&#8457;</sup>";
  }
}

function renderLocationWeather() {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=609a84e8018d4809a96114229230505&q=" +
      locationSearchName,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherInfo) => {
      currentWeatherInfo = weatherInfo;
      locationName.innerText = weatherInfo.location.name;
      locationRegion.innerText = weatherInfo.location.region + ", ";
      locationCountry.innerText = weatherInfo.location.country;
      lastUpdated.innerText = weatherInfo.current.last_updated;

      if (isCelsius) {
        currentTemperature.innerHTML =
          weatherInfo.current.temp_c + "<sup>&#8451;</sup>";
      } else {
        currentTemperature.innerHTML =
          weatherInfo.current.temp_f + "<sup>&#8457;</sup>";
      }

      isDay = weatherInfo.current.is_day;
      if (isDay == 1) {
        webpageBody.style.backgroundImage = "url(./images/day.jpg)";
      } else {
        webpageBody.style.backgroundImage = "url(./images/night.jpg)";
        allDomElements.forEach((element) => {
          element.style.color = "#ffffff";
        });
        searchInput.style.color = "#000";
      }

      currentWeatherText.innerText = weatherInfo.current.condition.text;
      currentWeatherIcon.src = weatherInfo.current.condition.icon;

      // console.log("Wind speed in kph: " + weatherInfo.current.wind_kph);
      // console.log(
      //   "Wind direction: " +
      //     weatherInfo.current.wind_dir +
      //     ", " +
      //     weatherInfo.current.wind_degree +
      //     " degrees"
      // );
      // console.log("pressure: " + weatherInfo.current.pressure_mb);

      loadingGif.style.display = "none";
      searchInput.value = "";
    })
    .catch((error) => {
      alert("OOPS... ERROR!!: " + error);
      loadingGif.style.display = "none";
      searchInput.value = "";
    });
}

/* location.name,region,country
  current.last_updated,temp_c,temp_f,is_day,
  condition{text,icon}, 
  wind_kph,wind_dir,pressure_mb
   */
