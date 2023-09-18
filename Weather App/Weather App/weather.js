const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayResults(weather) {
  let warning = document.querySelector(".warning");
  warning.style.display = "none";

  if (weather.cod === "404") {
    // City not found, display warning
    warning.innerText = "City not found. Please enter a valid city name.";
    warning.style.display = "block";

    // Reset other elements
    let city = document.querySelector(".location .city");
    let date = document.querySelector(".location .date");
    let temp = document.querySelector(".current .temp");
    let weather_el = document.querySelector(".current .weather");
    let hilow = document.querySelector(".hi-low");

    city.innerText = "";
    date.innerText = "";
    temp.innerHTML = "";
    weather_el.innerText = "";
    hilow.innerText = "";
    
    return;
  }

  // City found, clear any previous warning and display the weather information
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}


function dateBuilder(d) {
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
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
