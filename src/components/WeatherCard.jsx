import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.main || !weather.weather || !weather.name) return null;

  const { name, main, weather: details } = weather;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
      <p className="text-gray-500 dark:text-gray-300 capitalize">{details[0]?.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-5xl font-light text-blue-500">{Math.round(main.temp)}°C</span>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Humidity: {main.humidity}%</p>
          <p>Feels like: {Math.round(main.feels_like)}°C</p>
        </div>
      </div>
    </div>
  );
};


export default WeatherCard;
