function getCelsiusTemperature() {
  isCelsius = true;
  const searchInput = document.querySelector('#search');
  if (searchInput.value === '') {
    getCurrentLocation();
  } else {
    searchTemperature(city);
  }
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
}
function getFahrenheitTemperature() {
  isCelsius = false;
  const searchInput = document.querySelector('#search');
  if (searchInput.value === '') {
    getCurrentLocation();
  } else {
    searchTemperature(city);
  }
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
}
function formatDay(time) {
  const date = new Date(time * 1000);
  const day = date.getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[day];
}
function getForecastDetails(daily) {
  const forecast = daily;
  let renderForecast = '';
  let weatherForecastElement = document.querySelector('#weather-forecast');
  forecast.forEach(function (dayOfForecast, index) {
    if (index < 5) {
      renderForecast =
        renderForecast +
        `<div class="col-md col-sm-4 py-2">
              <div class="card next-day">
                <div class="card-body">
                  <h3>${formatDay(dayOfForecast.dt)}</h3>
                  <img src="http://openweathermap.org/img/wn/${
                    dayOfForecast.weather[0].icon
                  }@2x.png" alt="Clear" class="icon" />
                  <p><span id="lower-temp">${Math.round(
                    dayOfForecast.temp.min
                  )}°${
          isCelsius ? 'C' : 'F'
        }</span>| <span id="higher-temp">${Math.round(
          dayOfForecast.temp.max
        )}°${isCelsius ? 'C' : 'F'}</span></p>
                </div>
              </div>
            </div>`;
    }
  });
  weatherForecastElement.innerHTML = renderForecast;
}
function renderData(weatherDetails) {
  const cityElement = document.querySelector('#city');
  const countryElement = document.querySelector('#country');
  const celsius = document.querySelector('#temperature');
  const pressure = document.querySelector('#pressure');
  const humidity = document.querySelector('#humidity');
  const wind = document.querySelector('#wind');
  const weatherDesc = document.querySelector('#weather-desc');
  const iconCurrent = document.querySelector('#icon-current');
  const dayElement = document.querySelector('#day');
  const timeElement = document.querySelector('#time');
  cityElement.innerHTML = weatherDetails.city;
  countryElement.innerHTML = weatherDetails.country;
  celsius.innerHTML = weatherDetails.temp;
  pressure.innerHTML = `${weatherDetails.pressure}hPa`;
  humidity.innerHTML = `${weatherDetails.humidity}%`;
  wind.innerHTML = isCelsius
    ? `${weatherDetails.wind}metre/sec`
    : `${weatherDetails.wind}miles/hour`;
  weatherDesc.innerHTML = weatherDetails.weatherDesc;
  iconCurrent.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${weatherDetails.weatherIcon}@2x.png`
  );
  iconCurrent.setAttribute('alt', weatherDetails.weatherDesc);
  dayElement.innerHTML = weatherDetails.day;
  timeElement.innerHTML = `${
    weatherDetails.hours < 10
      ? `0${weatherDetails.hours}`
      : weatherDetails.hours
  }:${
    weatherDetails.minutes < 10
      ? `0${weatherDetails.minutes}`
      : weatherDetails.minutes
  }`;
  getForecastDetails(weatherDetails.daily);
}
function getCityCoord(response) {
  const lon = response.data.coord.lon;
  const lat = response.data.coord.lat;
  searchCurrentTemperature(lon, lat);
}
function getCityInfo(response) {
  city = response.data.name;
  country = response.data.sys.country;

  const countryElement = document.querySelector('#country');
  const cityElement = document.querySelector('#city');

  cityElement.innerHTML = city;
  countryElement.innerHTML = country;
}
function getLocationInfo(response) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(response.data.current.dt * 1000);
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const pressure = response.data.current.pressure;
  const humidity = response.data.current.humidity;
  const weatherDesc = response.data.current.weather[0].description;
  const weatherIcon = response.data.current.weather[0].icon;
  const wind = Math.round(response.data.current.wind_speed);
  const daily = response.data.daily;
  celsiusTemp = response.data.current.temp;
  const temp = Math.round(celsiusTemp);
  const weatherDetails = {
    city,
    country,
    pressure,
    humidity,
    weatherDesc,
    weatherIcon,
    wind,
    temp,
    day,
    hours,
    minutes,
    daily,
  };
  renderData(weatherDetails);
}
function searchCurrentTemperature(longitude, latitude) {
  const apiKey = config.k;
  const unit = isCelsius ? 'metric' : 'imperial';
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  const apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getLocationInfo);
  axios.get(apiUrl2).then(getCityInfo);
}
function searchTemperature(city) {
  const apiKey = 'cf25d8eb42806c8d7039bbac5d23b349';
  const unit = isCelsius ? 'metric' : 'imperial';
  if (city !== '') {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(getCityCoord);
  }
}

function getLocation(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  searchCurrentTemperature(longitude, latitude);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
function handleSearch(e) {
  e.preventDefault();
  const searchInput = document.querySelector('#search');
  searchTemperature(searchInput.value);
}

let celsiusTemp = null;
let isCelsius = true;
let city = '';
let country = '';
const searchForm = document.querySelector('#search-form');
const celsiusLink = document.querySelector('#celsius-link');
const fahrenheitLink = document.querySelector('#fahrenheit-link');
searchForm.addEventListener('click', handleSearch);
celsiusLink.addEventListener('click', getCelsiusTemperature);
fahrenheitLink.addEventListener('click', getFahrenheitTemperature);
getCurrentLocation();
