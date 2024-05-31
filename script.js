const apiKey = '6a7d129e228a926c04e4041ec473b50c'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a city name');
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfoDiv = document.getElementById('weatherInfo');
        weatherInfoDiv.innerHTML = `
            <div class="weatherDetail">City: ${data.name}</div>
            <div class="weatherDetail">Temperature: ${data.main.temp} °C</div>
            <div class="weatherDetail">Weather: ${data.weather[0].description}</div>
        `;
    } else {
        alert('City not found');
    }
}
