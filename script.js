const cityInput = document.getElementById('city');
const icon = document.getElementById('icon');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const rain = document.getElementById('rain');
const hideOnClick = document.getElementById('hideOnClick');
const WeatherCard = document.getElementById('WeatherCard');
const errorElement = document.createElement('p');
const time = document.getElementById('time');
const cloud = document.getElementById('cloud');
const max_min = document.getElementById('max_min');
WeatherCard.appendChild(errorElement);

errorElement.style.fontSize = "larger";

document.getElementById('btn').addEventListener('click', function () {
    let cityName = cityInput.value.trim();

    if (cityName.toLowerCase() === 'delhi') {
        cityName = 'New Delhi';
    } else if (cityName.toLowerCase() === 'gorakhpur') {
        cityName = 'Gorakhpur, Uttar Pradesh';
    }

    if (cityName) {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b5d8378b6amsh733816c1e61700bp1bccc2jsn311ea19123c7',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        async function fetchWeather() {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                // console.log(result);

                locationElement.textContent = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
                time.textContent = `Local Time: ${result.location.localtime}, ${result.current.is_day ? 'Day' : 'Night'}`;
                temperatureElement.textContent = `Temperature: ${result.current.temp_c} °C Feels like: ${result.current.feelslike_c}`;
                conditionElement.textContent = `Condition: ${result.current.condition.text}`;
                cloud.textContent = `Cloud: ${result.current.cloud}%, Wind Speed: ${result.current.wind_kph} Kph (${result.current.wind_dir})`;
                max_min.textContent = `Humidity: ${result.current.humidity}%`;
                rain.textContent = `Possible Rain: ${result.current.precip_mm} mm`;
                icon.src = result.current.condition.icon;
                icon.classList.remove('hidden');
                errorElement.textContent = ''; // Clear any previous error messages
            } catch (error) {
                console.log('Error fetching weather data:', error);
                errorElement.textContent = 'Error fetching weather data. Please try again later.';
            }
        }

        fetchWeather();
    } else {
        errorElement.textContent = 'Please enter a valid city.'; // Show an error message if the input is invalid
    }

    cityInput.value = ''; // Clear the input field
});
