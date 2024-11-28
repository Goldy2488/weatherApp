apikey = "d3311bdc5c05e90d2270126095ea8879";
const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const formEl = document.querySelector("form");

const iconEl = document.getElementById("icon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("discription");
const detailsContainer = document.querySelector(".details");
const details = document.querySelector(".details");

// Handle theme toggle
const themeRadios = document.querySelectorAll('input[name="theme"]');
const savedTheme = localStorage.getItem("theme") || "light";

// console.log(themeRadios)
// console.log(savedTheme);

// // Apply saved theme on page load
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  // themeRadios.defultValue = "dark";
  
  document.querySelectorAll(".container, form, #weather-data").forEach(el => el.classList.add("dark-mode"));
}

// Set default radio button state
document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;

themeRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedTheme = event.target.value;
    if (selectedTheme === "dark") {
      document.body.classList.add("dark-mode");
      document.querySelectorAll(".container, form, #weather-data").forEach(el => el.classList.add("dark-mode"));
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelectorAll(".container, form, #weather-data").forEach(el => el.classList.remove("dark-mode"));
      localStorage.setItem("theme", "light");
    }
  });
});

// Fetch weather data
async function getWeatherData(city) {
  try {
   
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    );
    console.log(response)
    if (!response.ok) throw new Error("City not found");

   
    const data = await response.json();
  
    // Update weather data
    const { temp, feels_like, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];

    temperatureEl.textContent = `${temp}°C`;
    descriptionEl.textContent = description;
    iconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    details.innerHTML = `
      <div>Feels Like: ${feels_like}°C</div>
      <div>Humidity: ${humidity}%</div>
      <div>Wind Speed: ${speed}m/s</div>
    `;

    weatherData.style.display = "block";
  } catch (error) {
    alert(error.message);
    weatherData.style.display = "none";
  }
}


// Handle form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityVal = cityInput.value.trim();
    if (cityVal) {
        getWeatherData(cityVal);
    } else {
        alert("Please enter a city name!");
    }
});