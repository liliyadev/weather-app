import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import { fetchWeather } from "./utils/fetchWeather";

function App() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
  const data = await fetchWeather(city);
  if (data) {
    setWeather(data);
  } else {
    alert("Could not fetch weather. Try another city.");
  }
};

  console.log("Weather data:", weather);
  console.log("Forecast:", weather?.forecast);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <SearchBar onSearch={handleSearch} />
      {weather && <WeatherCard weather={weather} />}

{Array.isArray(weather?.forecast) && weather.forecast.length > 0 && (
  <ForecastChart forecast={weather.forecast} />
)}

{Array.isArray(weather?.forecast) && weather.forecast.length === 0 && (
  <p className="text-center text-gray-500 mt-4">
    The sky is quiet. No forecast available yet.
  </p>
)}

{!weather && (
  <p className="text-center text-gray-500 mt-8">
    Enter a city to reveal the sky’s secrets...
  </p>
)}     

    </div>
  );
  
}

export default App;
