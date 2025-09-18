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
    <div className="mt-12">
        {/* 📈 Chart */}
        <div className="w-full flex justify-center mt-12 px-4">
            <div className="w-full max-w-4xl mx-auto bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] rounded-xl p-6 shadow-[0_0_20px_rgba(0,255,224,0.3)]">
            <Plot
                className="block mx-auto"
                data={[{
                    x: hours,
                    y: temps,
                    type: "scatter",
                    mode: "lines+markers",
                    line: { shape: "spline", color: "#00ffe0", width: 3 },
                    marker: { color: "#ff6ec7", size: 8 },
                    fill: "tozeroy",
                    fillcolor: "rgba(0,255,224,0.2)",
                    text: hourly.slice(0, 24).map(h =>
                    `${new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })} — ${Math.round(h.temp)}°C — ${h.description}`
                    ),
                    hoverinfo: "text",
                }]}
                layout={{
                    title: {
                    text: "Hourly Temperature",
                    font: { color: "#00ffe0", size: 24 },
                    },
                    paper_bgcolor: "rgba(30,30,47,0.8)",
                    plot_bgcolor: "rgba(30,30,47,0.6)",
                    font: { color: "#c0c0c0" },
                    margin: { t: 50, b: 50, l: 40, r: 40 },
                }}
                />
            </div>
        </div>

        {/* 🕒 Hourly Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6 mt-12">
            {hourly.slice(0, 8).map((hour, i) => (
            <div
                key={i}
                className="bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] rounded-xl p-4 shadow-[0_0_20px_rgba(0,255,224,0.3)] hover:scale-105 transition-transform text-center text-white"
            >
                <p className="text-[#00ffe0] font-semibold text-lg mb-2">
                {new Date(hour.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })}
                </p>
                <img
                src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                alt="weather icon"
                className="mx-auto w-16 h-16 mb-2"
                />
                <p className="text-[#ff6ec7] text-2xl font-bold mb-1">{Math.round(hour.temp)}°C</p>
                <p className="text-sm text-[#c0c0c0] italic mb-2">{hour.description}</p>
                <div className="text-xs text-[#999] space-y-1">
                <p>💨 Wind: {hour.wind} m/s</p>
                <p>🌧️ Rain: {hour.rain} mm</p>
                </div>
            </div>
            ))}
        </div>
        </div>

  );
};

export default HourlyChart;
