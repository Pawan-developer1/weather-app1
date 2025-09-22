const apiKey = "ab00d72791064dd7a3f194057252209"; // Replace with your WeatherAPI.com key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultDiv.innerHTML = `<p>❌ ${data.error.message}</p>`;
      } else {
        resultDiv.innerHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
          <p>☁️ Condition: ${data.current.condition.text}</p>
          <img src="https:${data.current.condition.icon}" alt="Weather icon">
          <p>💧 Humidity: ${data.current.humidity}%</p>
          <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
        `;
      }
    })
    .catch(error => {
      console.error(error);
      resultDiv.innerHTML = "<p>⚠️ Error fetching weather data.</p>";
    });
});
