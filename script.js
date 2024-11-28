const apikey = "d3311bdc5c05e90d2270126095ea8879";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const formEl = document.querySelector("form");



const iconEl = document.getElementById("icon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("discription");
const detailsContainer = document.querySelector(".details");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityVal = cityInput.value.trim();
    if (cityVal) {
        getWeatherData(cityVal);
    } else {
        alert("Please enter a city name!");
    }
    getWeatherData(cityVal)

})

// Event listener for checking if the input is empty
cityInput.addEventListener("input", () => {
    if (!cityInput.value.trim()) {
        weatherData.style.display = "none";
    }
});

async function getWeatherData(cityVal){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apikey}&units=metric`);
        
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
      
        const temperature = Math.round(data.main.temp);
        const discription = data.weather[0].description;
        const icon = data.weather[0].icon;
       
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind Speed: ${data.wind.speed}`
        ]
        // weatherData.getElementById("icon").innerHTML =`<img id="icon" src="http://openweathermap.org/img/wn/${icon}.png" alt="error..">`;
        console.log(iconEl)
        iconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        temperatureEl.innerHTML = `${temperature}°C`;
        descriptionEl.innerHTML = discription;
        detailsContainer.innerHTML = details.map(detail => `<div>${detail}</div>`).join("");

        weatherData.style.display = "block";
        // console.log(weatherData)
    }catch(error){
        console.error("Error fetching weather data:", error);
        weatherData.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;

    }
}


// mode change

// Select the theme radio buttons
const themeRadios = document.querySelectorAll('input[name="theme"]');

// Check and apply the saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark-mode", savedTheme === "dark");

// Preselect the correct radio button based on the saved theme
themeRadios.forEach((radio) => {
    radio.checked = radio.value === savedTheme;
});

// Add event listeners to switch theme
themeRadios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
        const selectedTheme = event.target.value;

        if (selectedTheme === "dark") {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});
