const weather = document.querySelector(".js-weather");

const API_KEY = "3ed528c7e31939012b04dbcdaa0279bf";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // console.log(response.json);
      return response.json();
    })
    .then(function (json) {
      // console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  // const template = document.querySelector("div");
  // template.innerText = `api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}`;

  saveCoords(coordsObj);

  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("업서 못가져와 그런거업서");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
