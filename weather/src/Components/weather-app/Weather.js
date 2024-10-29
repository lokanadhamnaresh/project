// Weather.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";

const Weather = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '982374451d319e79f20c4ca3463ef7b8'; // Replace with your OpenWeatherMap API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        setError('Could not retrieve your location.');
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${city},us&mode=json&appid=${API_KEY}`);
      //console.log(response.data);
      setForecast(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    }
  };

  return (
    <div className="container">
        <h2 className="text-center">Weather in your City</h2>          
          <form className="row justify-content-md-center g-3" onSubmit={fetchWeather}>
            <div className="col-auto">
              <input type="text" className="form-control form-control-warning"  id="searchinput" value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-warning mb-3"><i class="bi bi-search"></i> Search</button>
            </div>
          </form>
          <div className="col-lg-12">{error && <p className="error">{error}</p>}</div>
          <div class="row g-2">
           
          
          {forecast && (
            <div class="col-lg-2 col-sm-12">
          <table class="table table-bordered">
            <thead>
           
                
                  <tr>
                  {forecast.list.map((item, index) => {
              if (index % 8 === 0) { // Get forecast for every 24 hours
                    return (
                    <th colSpan="2"  key={item.dt}>{new Date(item.dt * 1000).toLocaleDateString()}</th>
                );
                
              }
              return <></>;
            })}
            </tr>
            <tr>
                  {forecast.list.map((item, index) => {
              if (index % 8 === 0) { // Get forecast for every 24 hours
                    return (
                    <th colSpan="2"  key={item.dt}>Temprature</th>
                );
                
              }
              return <></>;
            })}
            </tr>
            </thead>
            <tbody>
              
              
                <tr>
                {forecast.list.map((item, index) => {
              if (index % 8 === 0) { // Get forecast for every 24 hours
                return (
                  <>
                  <td>Min:{item.main.temp_min}°C</td>
                  <td>Max:{item.main.temp_max}°C</td>
                  
                
                                </>

                );
                }
                return <></>;
                })}
                </tr>
                <tr>
                {forecast.list.map((item, index) => {
              if (index % 8 === 0) { // Get forecast for every 24 hours
                return (
                  <>
                  <td>humidity</td>
                  <td>{item.main.humidity}</td>
                  
                
                                </>

                );
                }
                return <></>;
                })}
                </tr>
                <tr>
                {forecast.list.map((item, index) => {
              if (index % 8 === 0) { // Get forecast for every 24 hours
                return (
                  <>
                  <td>pressure</td>
                  <td>{item.main.pressure}°C</td>
                  
                
                                </>

                );
                }
                return <></>;
                })}
                </tr>
                
            </tbody>
          </table>
          
          </div>
          )}
        </div>
    </div>
  );
};

export default Weather;
