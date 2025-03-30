document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!"); // Debugging Log

    // Dropdown Menu Functionality
    const moreButton = document.querySelector(".more-button");
    const dropdownMenu = document.querySelector(".more-nav");

    if (moreButton && dropdownMenu) {
        moreButton.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".more")) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Display Current Year and Last Modified Date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            navMenu.setAttribute("aria-expanded", navMenu.classList.contains("active").toString());
        });
    }

    // Weather & Wind Chill Calculation
    function calculateWindChill(temp, wind) {
        return temp <= 10 && wind > 4.8
            ? (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(2) + " °C"
            : "N/A";
    }

    function updateWeatherInformation(temp, wind) {
        const windChillFactor = calculateWindChill(temp, wind);
        const weatherElement = document.querySelector(".weather");

        if (weatherElement) {
            weatherElement.innerHTML += `<p>Windchill: ${windChillFactor}</p>`;
        }
    }

    updateWeatherInformation(5, 10); // Example data

    // Fetch Weather Details
    function getForecastDetails() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date().getDay();

        return [
            { day: "Today", temperature: "90°F" },
            { day: daysOfWeek[(today + 1) % 7], temperature: "85°F" },
            { day: daysOfWeek[(today + 2) % 7], temperature: "80°F" }
        ];
    }

    function appendWeatherDetails(details) {
        const weatherElement = document.querySelector(".weather");
        if (!weatherElement) return;

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
        if (!forecastElement) return;

        forecast.forEach((f) => {
            forecastElement.innerHTML += `<p>${f.day}: <strong>${f.temperature}</strong></p>`;
        });
    }

    appendWeatherDetails({
        temperature: "75°F",
        condition: "Partly Cloudy",
        high: "85°F",
        low: "52°F",
        humidity: "34%",
        sunrise: new Date().toLocaleTimeString(),
        sunset: new Date().toLocaleTimeString(),
    });

    appendForecastDetails(getForecastDetails());

    // 🌟 Grid/List Toggle Functionality
    const gridViewButton = document.getElementById("gridView");
    const listViewButton = document.getElementById("listView");
    const container = document.querySelector(".business-listings");

    if (!gridViewButton || !listViewButton || !container) {
        console.error("Grid/List buttons or container missing!");
        return;
    }

    async function fetchData() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            console.log("Fetched Data:", data);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    function displayMembers(data, view) {
        container.className = `business-listings ${view}`;
        container.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = "<p>No members found.</p>";
            return;
        }

        data.forEach((member) => {
            const card = document.createElement("div");
            card.className = "business-card";
            card.innerHTML = `
                <div class="business-info">
                    <h3>${member.name}</h3>
                    <p>${member.membershipLevel === 3 ? "🥇Gold" : member.membershipLevel === 2 ? "🥈Silver" : ""} Member</p>
                    <p>${member.description}</p>
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

    gridViewButton.addEventListener("click", async () => {
        console.log("Grid View Clicked");
        const data = await fetchData();
        displayMembers(data, "grid");
    });

    listViewButton.addEventListener("click", async () => {
        console.log("List View Clicked");
        const data = await fetchData();
        displayMembers(data, "list");
    });

    // Initial Fetch & Default View
    fetchData().then((data) => {
        console.log("Initial Load: Displaying Grid View");
        displayMembers(data, "grid");
    });
});
