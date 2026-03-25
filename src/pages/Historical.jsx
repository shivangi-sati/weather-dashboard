import { useState } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import WeatherChart from "../components/WeatherChart";

const Historical = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistorical = async () => {
    const diff = dayjs(endDate).diff(dayjs(startDate), "year");

    if (diff > 2) {
      alert("Max range is 2 years");
      return;
    }

    const lat = 28.6139;
    const lon = 77.2090;

    const start = dayjs(startDate).format("YYYY-MM-DD");
    const end = dayjs(endDate).format("YYYY-MM-DD");

    try {
      setLoading(true);

      const weatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset&timezone=auto`;

      const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=pm10,pm2_5&timezone=auto`;

      const [weatherRes, airRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(airUrl),
      ]);

      const weatherJson = await weatherRes.json();
      const airJson = await airRes.json();

      setData(weatherJson);
      setAirData(airJson);

    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const formatData = () => {
    if (!data || !data.daily) return [];

    return data.daily.time.map((time, i) => ({
      date: dayjs(time).format("MMM D"),

      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      mean: data.daily.temperature_2m_mean[i],

      precipitation: data.daily.precipitation_sum[i],

      wind: data.daily.wind_speed_10m_max[i],
      windDir: data.daily.wind_direction_10m_dominant[i],

      sunrise: dayjs(data.daily.sunrise[i]).format("HH:mm"), 
      sunset: dayjs(data.daily.sunset[i]).format("HH:mm"),
    }));
  };

  const formatAirData = () => {
    if (!airData || !airData.hourly) return [];

    return airData.hourly.time.map((time, i) => ({
      date: dayjs(time).format("MMM D"),
      pm10: airData.hourly.pm10[i],
      pm25: airData.hourly.pm2_5[i],
    }));
  };

  const chartData = formatData();
  const airChartData = formatAirData();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Historical Weather</h1>
          <p className="text-sm text-gray-400">
            Analyze trends over a selected date range
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          />

          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          />

          <button
            onClick={fetchHistorical}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Fetch Data
          </button>
        </div>

        {loading && (
          <p className="text-blue-400 mb-4">Loading data...</p>
        )}

        {chartData.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-6 flex flex-wrap gap-6 justify-between">
            <div>
              <p className="text-xs text-gray-400">Sunrise (IST)</p>
              <p>{chartData[0].sunrise}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Sunset (IST)</p>
              <p>{chartData[0].sunset}</p>
            </div>
          </div>
        )}

        {data && data.daily && !loading && (
          <div className="grid md:grid-cols-2 gap-4">

            <WeatherChart
              title="Temperature Trends"
              data={chartData}
              xKey="date"
              lines={[
                { dataKey: "max", color: "#ef4444" },
                { dataKey: "min", color: "#3b82f6" },
                { dataKey: "mean", color: "#10b981" },
              ]}
            />

            <WeatherChart
              title="Precipitation (Daily Total)"
              data={chartData}
              xKey="date"
              lines={[
                { dataKey: "precipitation", color: "#6366f1" },
              ]}
            />

            <WeatherChart
              title="Wind Speed"
              data={chartData}
              xKey="date"
              lines={[
                { dataKey: "wind", color: "#f59e0b" },
              ]}
            />

            <WeatherChart
              title="Wind Direction"
              data={chartData}
              xKey="date"
              lines={[
                { dataKey: "windDir", color: "#22c55e" },
              ]}
            />

            <WeatherChart
              title="Air Quality (PM10 & PM2.5)"
              data={airChartData}
              xKey="date"
              lines={[
                { dataKey: "pm10", color: "#ef4444" },
                { dataKey: "pm25", color: "#8b5cf6" },
              ]}
            />

          </div>
        )}

      </div>
    </div>
  );
};

export default Historical;