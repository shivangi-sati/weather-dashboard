import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Historical from "./pages/Historical";

function Navbar() {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white shadow mb-4">
      <div className="w-full px-3 sm:px-4 md:px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <h1 className="font-bold text-lg text-center sm:text-left">
          🌦️ Weather Dashboard
        </h1>


        <div className="flex justify-center sm:justify-end gap-6 text-sm sm:text-base">
          <Link
            to="/"
            className={`hover:text-blue-400 ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Current
          </Link>

          <Link
            to="/historical"
            className={`hover:text-blue-400 ${
              location.pathname === "/historical"
                ? "text-blue-400 font-semibold"
                : ""
            }`}
          >
            Historical
          </Link>
        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/historical" element={<Historical />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
