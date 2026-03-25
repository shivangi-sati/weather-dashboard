# Weather Dashboard

A responsive weather dashboard built using **ReactJS** that provides real-time and historical weather insights using the Open-Meteo API.

---

## Live Demo

---

## Features

- Automatically detects user location using browser GPS
- Fetches localized weather data instantly

---

## Page 1: Current Weather & Hourly Forecast

### Weather Metrics

- Current, Minimum, Maximum Temperature
- Humidity
- Precipitation & Precipitation Probability
- UV Index
- Sunrise & Sunset
- Wind Speed

### Air Quality Metrics

- PM10
- PM2.5
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO2)
- Sulphur Dioxide (SO2)
- AQI (approximated using PM2.5)
- CO2 (Not available via API → shown as N/A)

---

### Hourly Charts

- Temperature (°C / °F toggle)
- Humidity
- Precipitation
- Visibility
- Wind Speed (10m)
- PM10 & PM2.5 (combined chart)

---

### Date Selection

- Users can select a date using a calendar
- Restricted to valid forecast range (today to next 7 days)

---

## Page 2: Historical Weather

### Date Range Selection

- Users can select a custom date range (max 2 years)
- Validation prevents exceeding limit

---

### Historical Charts

- Temperature (Min, Max, Mean)
- Precipitation (daily total)
- Wind Speed (max)
- Wind Direction (dominant)
- Sunrise & Sunset (IST display)

---

## UI & UX Features

- Modern dark theme
- Fully responsive (mobile-first design)
- Skeleton loaders for better UX
- Interactive charts using Recharts
- Smooth transitions & clean layout

---

## Tech Stack

- ReactJS
- Tailwind CSS
- Recharts
- Day.js
- React DatePicker
- Open-Meteo API

---

## API Used

- Weather Forecast API
- Historical Weather API
- Air Quality API

https://open-meteo.com/

---

## Performance

- Optimized data fetching
- Lightweight UI rendering
- Skeleton loaders improve perceived performance

---

## Installation

git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev

---

## Project Structure

```
src/
 ├── components/
 │    └── WeatherChart.jsx
 ├── pages/
 │    ├── CurrentWeather.jsx
 │    └── Historical.jsx
 ├── hooks/
 │    └── useLocation.js
 ├── utils/
 │    └── api.js
 └── App.jsx
```

---

## Known Limitations

- CO2 data is not provided by Open-Meteo API
- AQI is approximated using PM2.5 values
- Forecast API does not support past dates (handled via UI restriction)

---

## Notes

This project was built as part of a frontend assignment to demonstrate:

- API integration
- Data visualization
- Responsive UI design
- Clean React architecture

---
