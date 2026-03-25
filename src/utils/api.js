const BASE_URL = "https://api.open-meteo.com/v1";

export const fetchWeatherData = async (lat, lon) => {
  const weatherURL = `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=auto`;

  const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide&timezone=auto`;

  const [weatherRes, airRes] = await Promise.all([
    fetch(weatherURL),
    fetch(airURL),
  ]);

  if (!weatherRes.ok || !airRes.ok) {
    throw new Error("API error");
  }

  const weatherData = await weatherRes.json();
  const airData = await airRes.json();

  return {
    weather: weatherData,
    air: airData,
  };
};