import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const WeatherChart = ({ data, lines, title, xKey = "time" }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-2xl shadow-md mb-4">
      <h2 className="text-sm sm:text-lg font-semibold mb-3">{title}</h2>

      <div className="w-full h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 10 }}
              stroke="#ccc"
            />

            <YAxis stroke="#ccc" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Legend />

            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;