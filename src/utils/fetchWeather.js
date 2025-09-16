export const fetchWeather = async (city) => {
  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const geoData = await geoRes.json();
    console.log("Geo data:", geoData); // ✅ Safe here

    if (!geoData.coord) throw new Error("Invalid city or missing coordinates");

    const { lat, lon } = geoData.coord;

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const forecastData = await forecastRes.json();
    console.log("Forecast data:", forecastData); // ✅ Safe here

    return {
      ...geoData,
      forecast: forecastData.daily || [],
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};
