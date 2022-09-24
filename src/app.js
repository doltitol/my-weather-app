function getCelsiusTemperature() {
  const celsius = document.querySelector('#temperature');
  const celsiusLink = document.querySelector('#celsius-link');
  const fahrenheitLink = document.querySelector('#fahrenheit-link');
  celsius.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
}
function getFahrenheitTemperature() {
  const celsius = document.querySelector('#temperature');
  const celsiusLink = document.querySelector('#celsius-link');
  const fahrenheitLink = document.querySelector('#fahrenheit-link');
  const fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsius.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
}
function renderData(weatherDetails) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(weatherDetails.date * 1000);
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const cityElement = document.querySelector('#city');
  const dayElement = document.querySelector('#day');
  const timeElement = document.querySelector('#time');
  const countryElement = document.querySelector('#country');
  const celsius = document.querySelector('#temperature');
  const pressure = document.querySelector('#pressure');
  const humidity = document.querySelector('#humidity');
  const wind = document.querySelector('#wind');
  const weatherDesc = document.querySelector('#weather-desc');
  const iconCurrent = document.querySelector('#icon-current');
  cityElement.innerHTML = weatherDetails.city;
  countryElement.innerHTML = weatherDetails.country;
  dayElement.innerHTML = day;
  timeElement.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  celsius.innerHTML = weatherDetails.temp;
  pressure.innerHTML = `${weatherDetails.pressure}hPa`;
  humidity.innerHTML = `${weatherDetails.humidity}%`;
  wind.innerHTML = `${weatherDetails.wind}km/h`;
  weatherDesc.innerHTML = weatherDetails.weatherDesc;
  iconCurrent.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${weatherDetails.weatherIcon}@2x.png`
  );
  iconCurrent.setAttribute('alt', weatherDetails.weatherDesc);
}

function getLocationInfo(response) {
  const city = response.data.name;
  const pressure = response.data.main.pressure;
  const humidity = response.data.main.humidity;
  const weatherDesc = response.data.weather[0].description;
  const weatherIcon = response.data.weather[0].icon;
  const wind = Math.round(response.data.wind.speed);
  celsiusTemp = response.data.main.temp;
  const temp = Math.round(celsiusTemp);
  const date = response.data.dt;
  const country = response.data.sys.country;
  const weatherDetails = {
    city,
    pressure,
    humidity,
    weatherDesc,
    weatherIcon,
    wind,
    temp,
    date,
    country,
  };
  renderData(weatherDetails);
}
function searchCurrentTemperature(longitude, latitude) {
  const apiKey = config.k;
  const unit = 'metric';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getLocationInfo);
}
function searchTemperature(city) {
  const apiKey = 'cf25d8eb42806c8d7039bbac5d23b349';
  const unit = 'metric';
  if (city !== '') {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(getLocationInfo);
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
const searchForm = document.querySelector('#search-form');
const celsiusLink = document.querySelector('#celsius-link');
const fahrenheitLink = document.querySelector('#fahrenheit-link');
searchForm.addEventListener('click', handleSearch);
celsiusLink.addEventListener('click', getCelsiusTemperature);
fahrenheitLink.addEventListener('click', getFahrenheitTemperature);
getCurrentLocation();
