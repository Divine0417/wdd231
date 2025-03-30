// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherDesc = document.querySelector('#weather-desc');
const feelsLike = document.querySelector('#feels-like'); // New element for "feels like" temperature

// Declare the URL with parameters for the API call
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=662df6608d27989682cde58fcce87ad6';

// Define an asynchronous function to fetch the API data
async function apiFetch() {
    try {
        console.log('Fetching weather data...'); // Debugging log
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json(); // Parse response as JSON
            console.log('Weather data fetched successfully:', data); // Debugging log
            displayResults(data); // Call the function to display results
        } else {
            console.error('API response error:', response.status, response.statusText); // Log response error
            throw Error(await response.text()); // Handle non-OK responses
        }
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log fetch error
    }
}

// Call the API fetch function
apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    feelsLike.innerHTML = data.main.feels_like 
        ? `${data.main.feels_like}&deg;C` 
        : 'N/A'; // Handle missing "feels like" data
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.textContent = desc;
}

