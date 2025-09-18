import React from "react";
import Plot from "react-plotly.js";

const HourlyChart = ({ hourly }) => {
  const hours = hourly.slice(0, 24).map(h =>
    new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })
  );
  const temps = hourly.slice(0, 24).map(h => h.temp);

  if (!hourly || hourly.length === 0) return <p className="text-center text-gray-500">No hourly data available.</p>;
  if (!hours.length || !temps.length) return <p className="text-center text-gray-500">No hourly temperature data available.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* 📈 Chart */}
      <Plot
        data={[{
          x: hours,
          y: temps,
          type: "scatter",
          mode: "lines+markers",
          line: { shape: "spline", smoothing: 1.3 },
          marker: { color: "orange" },
          fill: "tozeroy",
          fillcolor: "rgba(255,165,0,0.2)",
          text: hourly.slice(0, 24).map(h =>
            `${new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })} — ${Math.round(h.temp)}°C — ${h.weather?.[0]?.description ?? "No description"}`
          ),
          hoverinfo: "text",
        }]}
        layout={{
          title: "Hourly Temperature",
          paper_bgcolor: "transparent",
          font: { color: "#374151" },
        }}
      />

      {/* 🕒 Hourly Breakdown */}
      <div className="max-w-5xl mx-auto mt-8 p-6 rounded-xl bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] shadow-lg">
        {hourly.slice(0, 8).map((hour, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="font-semibold text-indigo-600 dark:text-indigo-300">
              {new Date(hour.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              alt="icon"
              className="mx-auto"
            />
            <p className="text-lg">{Math.round(hour.temp)}°C</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{hour.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">💨 {hour.wind} m/s</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">🌧️ {hour.rain} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyChart;
