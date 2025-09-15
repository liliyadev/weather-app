import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import { fetchWeather } from "./utils/fetchWeather";

function App() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    const data = await fetchWeather(city);
    setWeather(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <SearchBar onSearch={handleSearch} />
      {weather && <WeatherCard weather={weather} />}
      {<ForecastChart forecast={weather.forecast} />}
    </div>
  );
}

export default App;
