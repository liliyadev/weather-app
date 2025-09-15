export const fetchWeather = async (city) => {
  const geoRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
  );
  const geoData = await geoRes.json();

  const { lat, lon } = geoData.coord;

  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
  );
  const forecastData = await forecastRes.json();

  return {
    ...geoData,
    forecast: forecastData.daily || [], // fallback to empty array
  };
};
