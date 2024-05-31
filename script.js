const apiKey = '6a7d129e228a926c04e4041ec473b50c'; // Replace with your AccuWeather API key

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getCityKey(city).then(cityKey => {
            if (cityKey) {
                getCurrentConditions(cityKey).then(weatherData => {
                    displayWeather(weatherData);
                });
            } else {
                alert('City not found');
            }
        });
    } else {
        alert('Please enter a city name');
    }
}

async function getCityKey(city) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.length > 0 ? data[0].Key : null;
}

async function getCurrentConditions(cityKey) {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
}

function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
        <div class="weatherDetail">Temperature: ${weatherData.Temperature.Metric.Value} °C</div>
        <div class="weatherDetail">Weather: ${weatherData.WeatherText}</div>
    `;
}
