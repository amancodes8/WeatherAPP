document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city');
    const icon = document.getElementById('icon');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const rain = document.getElementById('rain');
    const time = document.getElementById('time');
    const cloud = document.getElementById('cloud');
    const maxMin = document.getElementById('max_min');
    const WeatherCard = document.getElementById('WeatherCard');
    const errorElement = document.createElement('p');
    const btn = document.getElementById('btn');
    const API_KEY = 'b5d8378b6amsh733816c1e61700bp1bccc2jsn311ea19123c7';
    const API_HOST = 'weatherapi-com.p.rapidapi.com';

    WeatherCard.appendChild(errorElement);
    errorElement.style.fontSize = "larger";

    btn.addEventListener('click', handleWeatherRequest);

    /**
     * Handles the weather request when the button is clicked.
     */
    function handleWeatherRequest() {
        const cityName = formatCityName(cityInput.value.trim());

        if (cityName) {
            fetchWeather(cityName)
                .then(updateWeatherUI)
                .catch(handleError);
        } else {
            displayError('Please enter a valid city.');
        }

        cityInput.value = ''; // Clear the input field
    }

    /**
     * Formats the city name for special cases.
     * @param {string} cityName - The name of the city.
     * @returns {string} - The formatted city name.
     */
    function formatCityName(cityName) {
        const lowerCity = cityName.toLowerCase();
        if (lowerCity === 'delhi') return 'New Delhi';
        if (lowerCity === 'gorakhpur') return 'Gorakhpur, Uttar Pradesh';
        return cityName;
    }

    /**
     * Fetches weather data from the API.
     * @param {string} cityName - The name of the city.
     * @returns {Promise<Object>} - The weather data.
     */
    async function fetchWeather(cityName) {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    /**
     * Updates the weather UI with the fetched data.
     * @param {Object} result - The weather data.
     */
    function updateWeatherUI(result) {
        locationElement.textContent = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        time.textContent = `Local Time: ${result.location.localtime}, ${result.current.is_day ? 'Day' : 'Night'}`;
        temperatureElement.textContent = `Temperature: ${result.current.temp_c} °C Feels like: ${result.current.feelslike_c}`;
        conditionElement.textContent = `Condition: ${result.current.condition.text}`;
        cloud.textContent = `Cloud: ${result.current.cloud}%, Wind Speed: ${result.current.wind_kph} Kph (${result.current.wind_dir})`;
        maxMin.textContent = `Humidity: ${result.current.humidity}%`;
        rain.textContent = `Possible Rain: ${result.current.precip_mm} mm`;
        icon.src = result.current.condition.icon;
        icon.classList.remove('hidden');
        errorElement.textContent = ''; // Clear any previous error messages
    }

    /**
     * @param {Error} error 
     */
    function handleError(error) {
        console.error('Error fetching weather data:', error);
        displayError('Error fetching weather data. Please try again later.');
    }

    /**
     * @param {string} message - The error message.
     */
    function displayError(message) {
        errorElement.textContent = message;
    }
});
