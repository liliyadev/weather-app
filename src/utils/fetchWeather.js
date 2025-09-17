export const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const data = await res.json();
    console.log("3-hour forecast data:", data);

    if (!data.list || data.list.length === 0) throw new Error("No forecast data");

    // Group by day
    const groupedByDay = data.list.reduce((acc, entry) => {
      const date = entry.dt_txt.split(" ")[0]; // e.g., "2025-09-17"
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {});

    // Convert to array of days
    const forecast = Object.entries(groupedByDay).map(([date, entries]) => {
      const temps = entries.map(e => e.main.temp);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

      return {
        date,
        avgTemp: Math.round(avgTemp),
        icon: entries[0].weather[0].icon,
        description: entries[0].weather[0].description,
        wind: entries[0].wind.speed,
        rain: entries[0].rain?.["3h"] ?? 0,
      };
    });

    return {
      city: data.city.name,
      forecast,
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};
