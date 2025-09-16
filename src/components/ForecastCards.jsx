import React from "react";

const ForecastCards = ({ forecast }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {forecast.slice(0, 7).map((day, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="font-semibold text-indigo-600 dark:text-indigo-300">
            {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="icon"
            className="mx-auto"
          />
          <p>{Math.round(day.temp.min)}°C → {Math.round(day.temp.max)}°C</p>
          <p>💨 {day.wind_speed} m/s</p>
          <p>🌧️ {Math.round(day.pop * 100)}%</p>
          <p>🌅 {new Date(day.sunrise * 1000).toLocaleTimeString()}</p>
          <p>🌇 {new Date(day.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
