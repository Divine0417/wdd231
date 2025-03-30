document.addEventListener("DOMContentLoaded", function () {
    // Dropdown Menu Functionality
    document.querySelector(".more-button").addEventListener("click", function (event) {
        event.stopPropagation();
        document.querySelector(".more-nav").classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        let dropdown = document.querySelector(".more-nav");
        if (!event.target.closest(".more")) {
            dropdown.classList.remove("show");
        }
    });

    // Display Current Year and Last Modified Date
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    document.getElementById("currentyear").textContent = currentYear;
    document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        const ariaExpanded = navMenu.classList.contains("active") ? "true" : "false";
        navMenu.setAttribute("aria-expanded", ariaExpanded);
    });

    // Update Weather Information
    const temperature = 5; // Example temperature (°C)
    const windSpeed = 10; // Example wind speed (km/h)
    updateWeatherInformation(temperature, windSpeed);

    function calculateWindChill(temp, wind) {
        return (
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(wind, 0.16) +
            0.3965 * temp * Math.pow(wind, 0.16)
        );
    }

    function updateWeatherInformation(temp, wind) {
        let windChillFactor = "N/A";
        if (temp <= 10 && wind > 4.8) {
            windChillFactor = calculateWindChill(temp, wind).toFixed(2) + " °C";
        }

        document.querySelector(".weather").innerHTML += `<p>Windchill: ${windChillFactor}</p>`;
    }

    // Weather and Forecast Details
    const weatherDetails = {
        temperature: "75°F",
        condition: "Partly Cloudy",
        high: "85°F",
        low: "52°F",
        humidity: "34%",
        sunrise: new Date().toLocaleTimeString(),
        sunset: new Date().toLocaleTimeString(),
    };

    const forecastDetails = getForecastDetails();

    appendWeatherDetails(weatherDetails);
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
        forecast.forEach((f) => {
            forecastElement.innerHTML += `<p>${f.day}: <strong>${f.temperature}</strong></p>`;
        });
    }

    function getForecastDetails() {
        const today = new Date();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return [
            { day: "Today", temperature: "90°F" },
            { day: daysOfWeek[(today.getDay() + 1) % 7], temperature: "85°F" },
            { day: daysOfWeek[(today.getDay() + 2) % 7], temperature: "80°F" },
        ];
    }

    // Grid/List Toggle Functionality
    document.getElementById("gridView").addEventListener("click", () => {
        fetchData().then((data) => displayMembers(data, "grid"));
    });

    document.getElementById("listView").addEventListener("click", () => {
        fetchData().then((data) => displayMembers(data, "list"));
    });

    async function fetchData() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            return data; // Return data for further use
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayMembers(data, view) {
        const container = document.querySelector(".business-listings");
        container.className = `business-listings ${view}`; // Switch view class
        container.innerHTML = ""; // Clear existing content
        data.forEach((member) => {
            const card = document.createElement("div");
            card.className = "business-card";
            card.innerHTML = `
                <div class="business-info">
                    <h3>${member.name}</h3>
                    <p>${member.membershipLevel} Member</p>
                </div>
                <div class="business-contact">
                    <img src="${member.image}" alt="${member.name}">
                    <div>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Initial data fetch and default view setup
    fetchData().then((data) => displayMembers(data, "grid")); // Default to grid view
});
