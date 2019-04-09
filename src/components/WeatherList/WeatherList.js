import React from 'react';
import './WeatherList.css';
import Weather from '../Weather/Weather';

const WeatherList = props => {
    return (
      <section className="weatherSection">
        <div className="sectiontitle">
          <h2>Weather</h2>
          <div class="weather-btn-container">
            <button class="forecast-btn" id="forecast-3">3-Day</button>
            <button class="forecast-btn" id="forecast-5">5-Day</button>
            <button class="forecast-btn" id="forecast-7">7-Day</button>
          </div>
        </div>

        <div id="weather">
          {
            props.forecast.map((day, index) => {
              return <Weather day={day} key={index} />
            })
          }
        </div>
      </section>
    );
}

export default WeatherList;
