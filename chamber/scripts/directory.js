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
