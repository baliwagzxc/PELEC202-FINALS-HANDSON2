import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const API_KEY = 'a4a0d49f4c07421e6fa2155aa67ae862'; 

const fetchWeather = async (e) => {
  e.preventDefault();
  if (!city) return;

  setLoading(true);
  setError(null);
  
  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    setWeather(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1>Weather Finder</h1>
        
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="Enter Your City.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="status">Loading...</p>}
        
        {error && <p className="status error">{error}</p>}

        {weather && (
          <div className="result">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <p className="condition">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;