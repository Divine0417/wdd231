document.addEventListener("DOMContentLoaded", async () => {
    // Fetch and display weather data
    const weatherAPIKey = "662df6608d27989682cde58fcce87ad6"; // Replace with your OpenWeatherMap API key
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Timbuktu&units=metric&appid=${weatherAPIKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Timbuktu&units=metric&appid=${weatherAPIKey}`;

    async function fetchWeather() {
        try {
            const weatherResponse = await fetch(weatherURL);
            const forecastResponse = await fetch(forecastURL);
            if (!weatherResponse.ok || !forecastResponse.ok) throw new Error("Failed to fetch weather data");
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            document.getElementById("current-temp").textContent = `Current Temperature: ${Math.round(weatherData.main.temp)}°C`;
            document.getElementById("weather-description").textContent = `Conditions: ${weatherData.weather.map(w => w.description).join(", ")}`;

            const forecastContainer = document.getElementById("forecast");
            forecastContainer.innerHTML = "";
            forecastData.list.slice(0, 3).forEach((forecast) => {
                const date = new Date(forecast.dt * 1000);
                forecastContainer.innerHTML += `<p>${date.toLocaleDateString()}: ${Math.round(forecast.main.temp)}°C</p>`;
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Fetch and display spotlight members
    async function fetchSpotlights() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to fetch members data");

            const members = await response.json();
            const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const spotlightContainer = document.querySelector(".spotlight-container");
            spotlightContainer.innerHTML = "";
            shuffled.forEach(member => {
                spotlightContainer.innerHTML += `
                    <div class="business-card">
                        <h3>${member.name}</h3>
                        <img src="${member.image}" alt="${member.name}">
                        <p>${member.description}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Membership:</strong> ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error("Error fetching spotlight members:", error);
        }
    }

    await fetchWeather();
    await fetchSpotlights();
});
