export const fetchWeather = async (city) => {
  try {
    // 🌤️ Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const currentData = await currentRes.json();
    const { lat, lon } = currentData.coord;

    // 🕒 3-hour forecast (used for hourly + dailyGrouped)
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const forecastData = await forecastRes.json();

    // Simulated hourly: next 24 hours
    const hourlySimulated = forecastData.list.slice(0, 8).map(entry => ({
      dt: new Date(entry.dt_txt).getTime() / 1000,
      temp: entry.main.temp,
      weather: entry.weather,
    }));

    // Group 3-hour data into daily summaries
    const groupedByDay = forecastData.list.reduce((acc, entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {});

    const dailyGrouped = Object.entries(groupedByDay)
      .slice(0, 7)
      .map(([date, entries]) => {
        const temps = entries.map(e => e.main.temp);
        const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
        return {
          date,
          avgTemp,
          icon: entries[0].weather[0].icon,
          description: entries[0].weather[0].description,
          wind: entries[0].wind.speed,
          rain: entries[0].rain?.["3h"] ?? 0,
        };
      });

    // 📅 One Call API for true 7-day forecast
    const oneCallRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const oneCallData = await oneCallRes.json();

    const forecast = oneCallData.daily?.slice(0, 7).map(day => ({
      date: new Date(day.dt * 1000).toISOString().split("T")[0],
      avgTemp: Math.round(day.temp.day),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
      wind: day.wind_speed,
      rain: day.rain ?? 0,
    })) || [];

    console.log("Simulated dailyGrouped:", dailyGrouped.length);
    console.log("True forecast:", forecast.length);

    return {
      current: currentData,
      hourly: hourlySimulated,
      dailyGrouped, // from /forecast
      forecast,     // from One Call
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};
