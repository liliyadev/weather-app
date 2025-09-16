import React from "react";
import Plot from "react-plotly.js";


const HourlyChart = ({ hourly }) => {
  const hours = hourly.slice(0, 24).map(h =>
    new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })
  );
  const temps = hourly.slice(0, 24).map(h => h.temp);

  console.log("Hourly data:", hourly);

  return (
    <div className="max-w-xl mx-auto mt-8">
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
            `${new Date(h.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric" })} — ${Math.round(h.temp)}°C — ${h.weather[0]?.description ?? "No description"}`
            ),
            hoverinfo: "text", // ensures only your custom text shows on hover
        }]}
        layout={{
            title: "Hourly Temperature",
            paper_bgcolor: "transparent",
            font: { color: "#374151" },
        }}
        />

    </div>
  );
};

export default HourlyChart;
