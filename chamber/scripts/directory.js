document.querySelector(".more-button").addEventListener("click", function(event) {
    event.stopPropagation();
    document.querySelector(".more-nav").classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.querySelector(".more-nav");
    if (!event.target.closest(".more")) {
        dropdown.classList.remove("show");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById("currentyear").textContent = currentYear;
    document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
  
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const ariaExpanded = navMenu.classList.contains('active') ? 'true' : 'false';
        navMenu.setAttribute('aria-expanded', ariaExpanded);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Static values for temperature (in Celsius) and wind speed (in km/h)
    const temperature = 5; // e.g., 5°C
    const windSpeed = 10; // e.g., 10 km/h

    // Update weather information
    updateWeatherInformation(temperature, windSpeed);

    function calculateWindChill(temp, wind) {
        return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
    }

    function updateWeatherInformation(temp, wind) {
        let windChillFactor = "N/A";
        if (temp <= 10 && wind > 4.8) {
            windChillFactor = calculateWindChill(temp, wind).toFixed(2) + " °C";
        }

        document.querySelector(".weather").innerHTML += `<p>Windchill: ${windChillFactor}</p>`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Static values for weather details
    const weatherDetails = {
        temperature: "75°F",
        condition: "Partly Cloudy",
        high: "85°C",
        low: "52°C",
        humidity: "34%",
        sunrise: new Date().toLocaleTimeString(),
        sunset: new Date().toLocaleTimeString()
    };

    const forecastDetails = getForecastDetails();

    // Append weather details
    appendWeatherDetails(weatherDetails);

    // Append forecast details
    appendForecastDetails(forecastDetails);

    function appendWeatherDetails(details) {
        const weatherElement = document.querySelector(".weather");
        weatherElement.innerHTML += `
            <p>Temperature: ${details.temperature}</p>
            <p>Condition: ${details.condition}</p>
            <p>High: ${details.high}, Low: ${details.low}</p>
            <p>Humidity: ${details.humidity}</p>
            <p>Sunrise: ${details.sunrise}</p>
            <p>Sunset: ${details.sunset}</p>
        `;
    }

    function appendForecastDetails(forecast) {
        const forecastElement = document.querySelector(".forecast");
        forecast.forEach(f => {
            forecastElement.innerHTML += `<p>${f.day}: <strong>${f.temperature}</strong></p>`;
        });
    }

    function getForecastDetails() {
        const today = new Date();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const forecast = [
            { day: "Today", temperature: "90°F" },
            { day: daysOfWeek[(today.getDay() + 1) % 7], temperature: "85°F" }, // Tomorrow
            { day: daysOfWeek[(today.getDay() + 2) % 7], temperature: "80°F" }  // Two Days Later
        ];

        return forecast;
    }
});
