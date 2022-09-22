function dayTimeFunc() {
  const today = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const minutes = today.getMinutes();
  const hours = today.getHours();
  return {
    day: days[today.getDay()],
    time: `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`,
  };
}

function renderData(weatherDetails) {
  const cityElement = document.querySelector('#city');
  const celsius = document.querySelector('#temperature');
  const pressure = document.querySelector('#pressure');
  const humidity = document.querySelector('#humidity');
  const wind = document.querySelector('#wind');
  const weatherDesc = document.querySelector('#weather-desc');
  cityElement.innerHTML = weatherDetails.city;
  celsius.innerHTML = weatherDetails.temp;
  pressure.innerHTML = `${weatherDetails.pressure}hPa`;
  humidity.innerHTML = `${weatherDetails.humidity}%`;
  wind.innerHTML = `${weatherDetails.wind}m/s`;
  weatherDesc.innerHTML = weatherDetails.weatherDesc;
}

function getLocationInfo(response) {
  const city = response.data.name;
  const pressure = response.data.main.pressure;
  const humidity = response.data.main.humidity;
  const weatherDesc = response.data.weather[0].main;
  const weatherIcon = response.data.weather[0].icon;
  const wind = Math.round(response.data.wind.speed);
  const temp = Math.round(response.data.main.temp);
  const weatherDetails = {
    city,
    pressure,
    humidity,
    weatherDesc,
    weatherIcon,
    wind,
    temp,
  };
  renderData(weatherDetails);
}
function getTemperature(lon, lat, city) {
  const apiKey = config.API_KEY;
  const unit = 'metric';
  if (city === '') {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(getLocationInfo);
  } else {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(getLocationInfo);
  }
}
function getLocation(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  getTemperature(longitude, latitude, '');
}
function findTemp(event) {
  event.preventDefault();
  event.stopPropagation();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function getSearchTemp(event) {
  event.preventDefault();
  const search = document.querySelector('#search');
  getTemperature('', '', search.value);
}

const locationEle = document.querySelector('.btn.loc');
const dayOfTheWeek = document.querySelector('#day-of-the-week');
const time = document.querySelector('#time');
const searchForm = document.querySelector('#search-form');
if (searchForm) {
  searchForm.addEventListener('submit', getSearchTemp);
}

dayOfTheWeek.innerHTML = dayTimeFunc().day;
time.innerHTML = dayTimeFunc().time;

if (locationEle) {
  locationEle.addEventListener('click', findTemp);
}
