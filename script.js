const apiKey = '6a7d129e228a926c04e4041ec473b50c'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
        getForecastData(city);
    } else {
        alert('Please enter a city name');
    }
}

function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                getAirQuality(data.coord.lat, data.coord.lon);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    document.getElementById('weatherInfo').classList.remove('hidden');
    document.getElementById('city').innerText = `City: ${data.name}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

function getAirQuality(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const aqi = data.list[0].main.aqi;
            document.getElementById('airQuality').innerText = `Air Quality Index: ${aqi}`;
        })
        .catch(error => console.error('Error fetching air quality data:', error));
}

function getForecastData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) { // Every 8th entry for daily forecast
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecastItem';
        const date = new Date(data.list[i].dt_txt);
        forecastItem.innerHTML = `
            <div>${date.toLocaleDateString()}</div>
            <div>${data.list[i].main.temp} °C</div>
            <div>${data.list[i].weather[0].description}</div>
        `;
        forecastDiv.appendChild(forecastItem);
    }
}
