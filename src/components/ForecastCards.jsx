import React from "react";

const ForecastCards = ({ forecast }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {forecast.map((day, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <p className="font-semibold text-indigo-600 dark:text-indigo-300">
            {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="icon"
            className="mx-auto"
          />
          <p>{day.avgTemp}°C</p>
          <p>{day.description}</p>
          <p>💨 {day.wind} m/s</p>
          <p>🌧️ {day.rain} mm</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
