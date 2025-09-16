export const fetchWeather = async (city) => {
  try {
    // Step 1: Get coordinates from city name
    const geoRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const geoData = await geoRes.json();
    console.log("Geo data:", geoData);

    if (!geoData.coord) throw new Error("Invalid city or missing coordinates");

    const { lat, lon } = geoData.coord;

    // Step 2: Get forecast using One Call API
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );
    const forecastData = await forecastRes.json();
    console.log("Forecast data:", forecastData);

    // Step 3: Return combined data
    return {
      ...geoData,
      forecast: forecastData.daily || [],
      hourly: forecastData.hourly || [],
    };
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
};
