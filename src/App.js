import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
//import ForecastChart from "./components/ForecastChart";
import ForecastCards from "./components/ForecastCards"; 
import HourlyChart from "./components/HourlyChart";
import { fetchWeather } from "./utils/fetchWeather";
import ViewToggle from "./components/ViewToggle";

function App() {
  const [weather, setWeather] = useState(null);
  const [view, setView] = useState("daily");

  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    const data = await fetchWeather(city);
    setWeather(data);
    setLoading(false);
  };

  console.log("Current weather:", weather?.current);
  console.log("Current view:", view);
  console.log("Hourly:", weather?.hourly);
  console.log("Forecast:", weather?.forecast);
  console.log("One Call forecast:", weather?.forecast);
  console.log("Grouped forecast:", weather?.forecast);
  console.log("7-day forecast:", weather?.forecast);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 p-4 text-gray-800 dark:text-gray-100">

      {/* 🌤️ Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-4">Sky Symphony</h1>
        <p className="text-lg italic text-gray-600 dark:text-gray-400">
          “Forecasts with feeling—explore the sky’s mood in motion.”
        </p>
      </div>

      {/* 🔍 Search */}
      <SearchBar onSearch={handleSearch} />

      {loading && (
  <p className="text-center text-gray-500 mt-4">Fetching the sky’s secrets...</p>
      )}

      {weather?.current && <WeatherCard weather={weather.current} />}

      {weather && <ViewToggle view={view} setView={setView} />}

      {view === "hourly" && (
        Array.isArray(weather?.hourly) && weather.hourly.length > 0 ? (
          <HourlyChart hourly={weather.hourly} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No hourly data available.</p>
        )
      )}

      {view === "dailyGrouped" && weather?.dailyGrouped.length > 0 && (
        <ForecastCards forecast={weather.dailyGrouped} />
      )}

      {view === "daily" && (
        Array.isArray(weather?.forecast) && weather.forecast.length > 0 ? (
          <ForecastCards forecast={weather.forecast} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No daily forecast available.</p>
        )
      )}

     {/*} {view === "daily" && (
        Array.isArray(weather?.forecast) && weather.forecast.length > 0 ? (
          <>
            <ForecastChart forecast={weather.forecast} />
            <ForecastCards forecast={weather.forecast} />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-4">No daily forecast available.</p>
        )
      )}*/}



      {/* 💤 Empty States */}
      {Array.isArray(weather?.forecast) && weather.forecast.length === 0 && (
        <p className="text-center text-gray-500 mt-4">The sky is quiet. No forecast available yet.</p>
      )}

      {!weather && (
        <p className="text-center text-gray-500 mt-8">Enter a city to reveal the sky’s secrets...</p>
      )}

      {/* 🧭 Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Designed & coded by Liliya Vildanova — Front-End Developer & Designer</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://github.com/liliyadev" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://blog.liliyadev.ca" target="_blank" rel="noopener noreferrer" className="hover:underline">Blog</a>
          <a href="https://www.linkedin.com/in/liliya-vildanovadev/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
