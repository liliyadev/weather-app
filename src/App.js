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
  console.log("Hourly forecast:", weather?.hourly);
  console.log("Grouped forecast:", weather?.dailyGrouped);
  console.log("Forecast:", weather?.forecast);
  console.log("One Call forecast:", weather?.forecast);
  console.log("Grouped forecast:", weather?.forecast);
  console.log("7-day forecast:", weather?.forecast);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1a1f2f] to-[#0f0f0f] text-white p-4">

      {/* 🌤️ Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-6xl font-extrabold text-[#00ffe0] tracking-wide drop-shadow-lg">Sky Symphony</h1>
        <p className="text-lg italic text-[#c0c0c0] mt-2">
          “Forecasts with feeling—explore the sky’s mood in motion.”
        </p>
      </div>


      {/* 🔍 Search */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
  <p className="text-center text-gray-500 mt-4">Fetching the sky’s secrets...</p>
      )}

      {weather?.current && (
        <div className="mb-10">
          <WeatherCard weather={weather.current} />
        </div>
      )}
  <div className="h-1 w-full max-w-md mx-auto bg-gradient-to-r from-[#00ffe0] via-[#ff6ec7] to-[#00ffe0] rounded-full my-8"></div>

      {weather && (
        <div className="mb-8">
          <ViewToggle view={view} setView={setView} />
        </div>
      )}
  
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
    <section className="px-4 md:px-12 lg:px-24">
      {view === "daily" && (
        Array.isArray(weather?.forecast) && weather.forecast.length > 0 ? (
          <ForecastCards forecast={weather.forecast} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No daily forecast available.</p>
        )
      )}
    </section>
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
      <footer className="mt-12 text-center text-sm text-[#c0c0c0]">
        <p className="text-[#00ffe0] font-semibold">Designed & coded by Liliya Vildanova</p>
        <div className="flex justify-center gap-6 mt-2 text-[#c0c0c0]">
          <a href="https://github.com/liliyadev" className="hover:text-[#00ffe0] transition">GitHub</a>
          <a href="https://blog.liliyadev.ca" className="hover:text-[#00ffe0] transition">Blog</a>
          <a href="https://www.linkedin.com/in/liliya-vildanovadev/" className="hover:text-[#00ffe0] transition">LinkedIn</a>
        </div>
      </footer>
    
    </div>
  );
}

export default App;
