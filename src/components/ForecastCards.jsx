import React from "react";

const ForecastCards = ({ forecast }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
      {forecast.map((day, i) => (
        <div key={i} className="bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] rounded-xl p-4 shadow-[0_0_20px_rgba(0,255,224,0.3)] hover:scale-105 transition-transform text-center text-white">
          <p className="text-[#00ffe0] font-semibold text-lg mb-2">
            {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="weather icon"
            className="mx-auto w-16 h-16 mb-2"
          />
            <p className="text-[#ff6ec7] text-2xl font-bold mb-1">{day.avgTemp}°C</p>
            <p className="text-sm text-[#c0c0c0] italic mb-2">{day.description}</p>
            <div className="text-xs text-[#999] space-y-1">
                <p>💨 Wind: {day.wind} m/s</p>
                <p>🌧️ Rain: {day.rain} mm</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
