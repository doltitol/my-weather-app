//function dayTimeFunc() {
//  const today = new Date();
//  const days = [
//    'Sunday',
//    'Monday',
//    'Tuesday',
//    'Wednesday',
//    'Thursday',
//    'Friday',
//    'Saturday',
//  ];
//  const minutes = today.getMinutes();
//  const hours = today.getHours();
//  return {
//    day: days[today.getDay()],
//    time: `${hours < 10 ? `0${hours}` : hours}:${
//      minutes < 10 ? `0${minutes}` : minutes
//    }`,
//  };
//}

//function renderData(weatherDetails) {
//  const cityElement = document.querySelector('#city');
//  const celsius = document.querySelector('#temperature');
//  const pressure = document.querySelector('#pressure');
//  const humidity = document.querySelector('#humidity');
//  const wind = document.querySelector('#wind');
//  const weatherDesc = document.querySelector('#weather-desc');
//  cityElement.innerHTML = weatherDetails.city;
//  celsius.innerHTML = weatherDetails.temp;
//  pressure.innerHTML = `${weatherDetails.pressure}hPa`;
//  humidity.innerHTML = `${weatherDetails.humidity}%`;
//  wind.innerHTML = `${weatherDetails.wind}m/s`;
//  weatherDesc.innerHTML = weatherDetails.weatherDesc;
//}

//function getLocationInfo(response) {
//  const city = response.data.name;
//  const pressure = response.data.main.pressure;
//  const humidity = response.data.main.humidity;
//  const weatherDesc = response.data.weather[0].main;
//  const weatherIcon = response.data.weather[0].icon;
//  const wind = Math.round(response.data.wind.speed);
//  const temp = Math.round(response.data.main.temp);
//  const weatherDetails = {
//    city,
//    pressure,
//    humidity,
//    weatherDesc,
//    weatherIcon,
//    wind,
//    temp,
//  };
//  renderData(weatherDetails);
//}
//function getTemperature(lon, lat, city) {
//  const apiKey = config.k;
//  const unit = 'metric';
//  if (city === '') {
//    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
//    axios.get(apiUrl).then(getLocationInfo);
//  } else {
//    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
//    axios.get(apiUrl).then(getLocationInfo);
//  }
//}
//function getLocation(position) {
//  const longitude = position.coords.longitude;
//  const latitude = position.coords.latitude;
//  getTemperature(longitude, latitude, '');
//}
//function findTemp(event) {
//  event.preventDefault();
//  event.stopPropagation();
//  navigator.geolocation.getCurrentPosition(getLocation);
//}
//function getSearchTemp(event) {
//  event.preventDefault();
//  const search = document.querySelector('#search');
//  getTemperature('', '', search.value);
//}

//const locationEle = document.querySelector('.btn.loc');
//const dayOfTheWeek = document.querySelector('#day-of-the-week');
//const time = document.querySelector('#time');
//const searchForm = document.querySelector('#search-form');
//if (searchForm) {
//  searchForm.addEventListener('submit', getSearchTemp);
//}

//dayOfTheWeek.innerHTML = dayTimeFunc().day;
//time.innerHTML = dayTimeFunc().time;

//if (locationEle) {
//  locationEle.addEventListener('click', findTemp);
//}

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
  const celsiusTemp = response.data.main.temp;
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

const celsiusTemp = '';
const searchForm = document.querySelector('#search-form');
const celsiusLink = document.querySelector('#celsius');
const fahrenheitLink = document.querySelector('#fahrenheit');
searchForm.addEventListener('click', handleSearch);
celsiusLink.addEventListener('click', getCelsiusTemperature);
fahrenheitLink.addEventListener('click', getFahrenheitTemperature);
getCurrentLocation();
