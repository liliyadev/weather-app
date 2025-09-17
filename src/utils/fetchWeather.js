export const fetchWeather = async (city) => {
  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const currentData = await currentRes.json();

    const { lat, lon } = currentData.coord;

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const forecastData = await forecastRes.json();

    // Extract first 8 entries (next 24 hours in 3-hour intervals)
    const hourlySimulated = forecastData.list.slice(0, 8).map(entry => ({
      dt: new Date(entry.dt_txt).getTime() / 1000,
      temp: entry.main.temp,
      weather: entry.weather,
    }));
    
    const oneCallRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const oneCallData = await oneCallRes.json();

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

    return {
      current: currentData, 
      hourly:  hourlySimulated,
      daily: oneCallData.daily?.slice(1, 8) || [],
      forecast: dailyGrouped,
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};

