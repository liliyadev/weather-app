import React from "react";
import Plot from "react-plotly.js";

const ForecastChart = ({ forecast }) => {
  const days = forecast.map((day) =>
    new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
  );
  const temps = forecast.map((day) => day.temp.day);

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Plot
        data={[
          {
            x: days,
            y: temps,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          title: "7-Day Forecast",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#374151" },
        }}
      />
    </div>
  );
};

export default ForecastChart;
