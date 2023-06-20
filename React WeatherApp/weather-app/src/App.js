import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "e9a3efe3511f6c53e309ab54449af61d";
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        });
    }
  };

  const convertToFahrenheit = (temp) => {
    return Math.round((temp - 32) * (5 / 9));
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      {!weatherData.name ? (
        <div>
          <p>Welcome to the weather app! Enter a city to get the weather.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{convertToFahrenheit(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}
      {weatherData.cod === "404" && <p>City not found.</p>}
    </div>
  );
}

export default App;
