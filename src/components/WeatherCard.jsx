import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.main || !weather.weather || !weather.name) return null;

  const { name, main, weather: details } = weather;

  return (
    <div className="bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-6 max-w-md mx-auto text-white border border-[#00ffe0]">
      <h2 className="text-3xl font-bold text-[#00ffe0]">{name}</h2>
      <p className="text-[#c0c0c0] capitalize">{details[0]?.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-6xl font-bold text-[#ff6ec7]">{Math.round(main.temp)}°C</span>
        <div className="text-sm text-[#c0c0c0] space-y-1">
          <p>💧 Humidity: {main.humidity}%</p>
          <p>🌡️ Feels like: {Math.round(main.feels_like)}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>☁️ Clouds: {weather.clouds.all}%</p>
          <p>🌧️ Rain: {weather.rain?.["1h"] ?? 0} mm</p>
        </div>
      </div>
    </div>

  );
};


export default WeatherCard;
