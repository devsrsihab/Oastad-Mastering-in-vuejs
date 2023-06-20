const apiKey = 'd6c3fa7a15384efc97073333232006';
const apiUrl = 'http://api.weatherapi.com/v1/current.json?aqi=yes&q=';

const searchBox       = document.querySelector('.search input')
const searchBtn       = document.querySelector('.search button')
const weatherIcon     = document.querySelector('.weather-icon')
const error           = document.querySelector('.error')
const weather         = document.querySelector('.weather')
const weatherCity     = document.querySelector('.city')
const weatherTemp     = document.querySelector('.temp')
const weatherHumidity = document.querySelector('.humidity')
const weatherWind     = document.querySelector('.wind')
const weatherCountry  = document.querySelector('.country')

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&key=${apiKey}`);

  if (response.status == 404 || response.status == 400) {
    error.style.display   = 'block';
    weather.style.display = 'none';
  } else {
    error.style.display   = 'none';
    weather.style.display = 'block';

    const data = await response.json();
    console.log(data);

    // assign api value
    weatherCity.innerHTML     = data.location.name;
    weatherCountry.innerHTML     = data.location.country ;
    weatherTemp.innerHTML     = data.current.temp_c + '°';
    weatherHumidity.innerHTML = data.current.humidity + '%';
    weatherWind.innerHTML     = data.current.wind_kph + ' km/h';
    weatherIcon.src           = data.current.condition.icon;
  }
}


// click event
searchBtn.addEventListener('click', () => {
  const city = searchBox.value;
  console.log(city);
  checkWeather(city);
});

// enter event
searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = searchBox.value;
    checkWeather(city);
  }
});


