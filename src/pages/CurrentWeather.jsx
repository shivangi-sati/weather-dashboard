import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { useLocation } from "../hooks/useLocation";
import { fetchWeatherData } from "../utils/api";
import WeatherChart from "../components/WeatherChart";

const CurrentWeather = () => {
  const { coords } = useLocation();
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!coords) return;
    fetchWeatherData(coords.lat, coords.lon).then(setData);
  }, [coords]);

  if (!data)
    return (
      <div className="p-4 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 animate-pulse">
          <div className="bg-gray-800 h-28 rounded-2xl mb-6"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded-xl"></div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-62.5 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );

  const { weather, air } = data;

  const convertTemp = (t) =>
    unit === "C" ? t : (t * 9) / 5 + 32;

  const formatTime = (t) => t.split("T")[1].slice(0, 5);

  const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  const filterByDate = (arr) =>
    weather.hourly.time
      .map((time, i) => ({
        time,
        value: arr[i],
      }))
      .filter((item) => item.time.startsWith(selectedDateStr))
      .map((item) => ({
        time: formatTime(item.time),
        value: item.value,
      }));

  const tempData = weather.hourly.time
    .map((time, i) => ({
      time,
      value: convertTemp(weather.hourly.temperature_2m[i]),
    }))
    .filter((item) => item.time.startsWith(selectedDateStr))
    .map((item) => ({
      time: formatTime(item.time),
      value: item.value,
    }));

  const humidityData = filterByDate(weather.hourly.relative_humidity_2m);
  const precipitationData = filterByDate(weather.hourly.precipitation);
  const visibilityData = filterByDate(weather.hourly.visibility);
  const windData = filterByDate(weather.hourly.wind_speed_10m);

  const pmData = weather.hourly.time
    .map((time, i) => ({
      time,
      pm10: air?.hourly?.pm10?.[i],
      pm25: air?.hourly?.pm2_5?.[i],
    }))
    .filter((item) => item.time.startsWith(selectedDateStr))
    .map((item) => ({
      time: formatTime(item.time),
      pm10: item.pm10,
      pm25: item.pm25,
    }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-gray-800 p-6 rounded-2xl mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">
              {convertTemp(weather.current_weather.temperature)}°{unit}
            </h2>
            <p className="text-gray-400">Current Temperature</p>
          </div>

          <div className="text-right text-sm">
            <p>Wind: {weather.current_weather.windspeed} km/h</p>
            <p>Humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">

          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="px-4 py-2 bg-blue-500 rounded-lg"
          >
            Switch to °{unit === "C" ? "F" : "C"}
          </button>

          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            minDate={new Date()}
            maxDate={dayjs().add(7, "day").toDate()}
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6 flex flex-wrap gap-6 justify-between">

          <div><p className="text-xs text-gray-400">Max</p><p>{convertTemp(weather.daily.temperature_2m_max[0])}°</p></div>
          <div><p className="text-xs text-gray-400">Min</p><p>{convertTemp(weather.daily.temperature_2m_min[0])}°</p></div>
          <div><p className="text-xs text-gray-400">Precip</p><p>{weather.hourly.precipitation[0]} mm</p></div>
          <div><p className="text-xs text-gray-400">Precip Prob</p><p>{weather.daily.precipitation_probability_max[0]}%</p></div>
          <div><p className="text-xs text-gray-400">UV</p><p>{weather.daily.uv_index_max[0]}</p></div>
          <div><p className="text-xs text-gray-400">Sunrise</p><p>{formatTime(weather.daily.sunrise[0])}</p></div>
          <div><p className="text-xs text-gray-400">Sunset</p><p>{formatTime(weather.daily.sunset[0])}</p></div>
          <div><p className="text-xs text-gray-400">AQI</p><p>{air?.hourly?.pm2_5?.[0]} (approx)</p></div>
          <div><p className="text-xs text-gray-400">PM10</p><p>{air?.hourly?.pm10?.[0]}</p></div>
          <div><p className="text-xs text-gray-400">PM2.5</p><p>{air?.hourly?.pm2_5?.[0]}</p></div>
          <div><p className="text-xs text-gray-400">CO</p><p>{air?.hourly?.carbon_monoxide?.[0]}</p></div>
          <div><p className="text-xs text-gray-400">CO2</p><p>N/A</p></div>
          <div><p className="text-xs text-gray-400">NO2</p><p>{air?.hourly?.nitrogen_dioxide?.[0]}</p></div>
          <div><p className="text-xs text-gray-400">SO2</p><p>{air?.hourly?.sulphur_dioxide?.[0]}</p></div>

        </div>

        <h2 className="text-lg mb-4">
          Hourly Trends ({dayjs(selectedDate).format("MMM D")})
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <WeatherChart title="Temperature" data={tempData} lines={[{ dataKey: "value", color: "#3b82f6" }]} />
          <WeatherChart title="Humidity" data={humidityData} lines={[{ dataKey: "value", color: "#10b981" }]} />
          <WeatherChart title="Precipitation" data={precipitationData} lines={[{ dataKey: "value", color: "#6366f1" }]} />
          <WeatherChart title="Visibility" data={visibilityData} lines={[{ dataKey: "value", color: "#f59e0b" }]} />
          <WeatherChart title="Wind Speed" data={windData} lines={[{ dataKey: "value", color: "#ef4444" }]} />
          <WeatherChart
            title="PM10 & PM2.5"
            data={pmData}
            lines={[
              { dataKey: "pm10", color: "#ef4444" },
              { dataKey: "pm25", color: "#8b5cf6" },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default CurrentWeather;