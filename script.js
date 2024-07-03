const cityInput = document.getElementById('city');
const icon = document.getElementById('icon');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const rain = document.getElementById('rain');
const hideOnClick = document.getElementById('hideOnClick');
const WeatherCard = document.getElementById('WeatherCard');

document.createAttribute('p').innerHTML = "Error while getting countr"

document.getElementById('btn').addEventListener('click', function () {
    const cityName = cityInput.value;
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b5d8378b6amsh733816c1e61700bp1bccc2jsn311ea19123c7', // Ideally, replace this with an environment variable
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    
    if(cityName){
        async function fetchWeather() {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
    
                // Update the weather information in the UI
                if(cityName === "Delhi" || "delhi"){
                    result.location.region = "India"
                }
                locationElement.textContent = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
                temperatureElement.textContent = `Temperature: ${result.current.temp_c} °C Feels like: ${result.current.feelslike_c}`;
                conditionElement.textContent = `Condition: ${result.current.condition.text}`;
                rain.textContent = `Humidity: ${result.current.humidity}
                                    Cloud: ${result.current.cloud},
                                    Wind: ${result.current.wind_kph}, ${result.current.wind_dir}
                                    Heat Index: ${result.current.heatindex_c}`
                icon.src = result.current.condition.icon;
                icon.classList.remove('hidden');
            } catch (error) {
                console.log('Error fetching weather data:', error);
            }
        }
    
        fetchWeather();
    }else{
        WeatherCard.innerHTML = "Please Enter a valid city"
    }


    cityInput.value = null;
});


