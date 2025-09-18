import React from "react";
import Plot from "react-plotly.js";
import { motion } from "framer-motion";


const HourlyChart = ({ hourly }) => {
  const hours = hourly.slice(0, 24).map(h =>
    new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })
  );
  const temps = hourly.slice(0, 24).map(h => h.temp);

  const [metric, setMetric] = React.useState("temp");

  const [chartType, setChartType] = React.useState("lines");

  if (!hourly || hourly.length === 0) return <p className="text-center text-gray-500">No hourly data available.</p>;
  if (!hours.length || !temps.length) return <p className="text-center text-gray-500">No hourly temperature data available.</p>;

  return (
    <div className="mt-12">
        <div className="flex flex-col items-center gap-4 mb-6">
            {/* Chart Type Toggle */}
            <div className="flex justify-center gap-4">
                {["lines", "bar"].map(type => (
                <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`relative px-4 py-2 rounded-lg border overflow-hidden ${
                    chartType === type ? "bg-[#00ffe0] text-black" : "bg-[#1e1e2f] text-[#c0c0c0]"
                    } hover:scale-105 transition`}
                >
                    <span className="relative z-10">
                    {type === "lines" ? "📈 Line" : "📊 Bar"}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00ffe0] via-[#ff6ec7] to-[#00ffe0] opacity-20 animate-pulse"></span>
                </button>
                ))}
            </div>

            {/* Metric Toggle */}
            <div className="flex justify-center gap-4">
                {["temp", "wind", "rain"].map(type => (
                <button
                    key={type}
                    onClick={() => setMetric(type)}
                    className={`px-4 py-2 rounded-lg border ${
                    metric === type ? "bg-[#ff6ec7] text-black" : "bg-[#1e1e2f] text-[#c0c0c0]"
                    } hover:scale-105 transition`}
                >
                    {type === "temp" ? "🌡️ Temp" : type === "wind" ? "💨 Wind" : "🌧️ Rain"}
                </button>
                ))}
            </div>
            </div>


        {/* 📈 Chart */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] rounded-xl p-6 shadow-[0_0_20px_rgba(0,255,224,0.3)]"
            >
            <Plot
                style={{ display: "block", margin: "0 auto" }}
                className="w-full"
                data={[{
                x: hours,
                y: hourly.slice(0, 24).map(h =>
                    metric === "temp" ? h.temp : metric === "wind" ? h.wind : h.rain
                ),
                type: chartType === "bar" ? "bar" : "scatter",
                mode: chartType === "lines" ? "lines+markers" : undefined,
                line: { shape: "spline", color: "#00ffe0", width: 3 },
                marker: { color: "#ff6ec7", size: 8 },
                fill: "tozeroy",
                fillcolor: "rgba(0,255,224,0.2)",
                text: hourly.slice(0, 24).map(h => {
                    const value =
                    metric === "temp" ? `${Math.round(h.temp)}°C` :
                    metric === "wind" ? `${h.wind} m/s` :
                    `${h.rain} mm`;
                    return `${new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })} — ${value} — ${h.description}`;
                }),
                hoverinfo: "text",
                }]}
                layout={{
                title: {
                    text: metric === "temp" ? "Hourly Temperature" : metric === "wind" ? "Hourly Wind Speed" : "Hourly Rainfall",
                    font: { color: "#00ffe0", size: 24 },
                },
                paper_bgcolor: "rgba(30,30,47,0.8)",
                plot_bgcolor: "rgba(30,30,47,0.6)",
                font: { color: "#c0c0c0" },
                margin: { t: 50, b: 50, l: 40, r: 40 },
                }}
            />
            </motion.div>

        <div className="h-1 w-full max-w-md mx-auto bg-gradient-to-r from-[#00ffe0] via-[#ff6ec7] to-[#00ffe0] rounded-full my-12"></div>

        {/* 🕒 Hourly Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6 mt-12">
            {hourly.slice(0, 8).map((hour, i) => (
                <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1e1e2f] bg-opacity-80 backdrop-blur-md border border-[#00ffe0] rounded-xl p-4 shadow-[0_0_20px_rgba(0,255,224,0.3)] hover:scale-105 transition-transform text-center text-white"
                >
                <p className="text-[#00ffe0] font-semibold text-lg mb-2">
                    {new Date(hour.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
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
                </motion.div>
            ))}
            </div>

        </div>

  );
};

export default HourlyChart;
