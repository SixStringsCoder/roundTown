import React, { Component } from 'react';
import './WeatherList.css';
import Weather from '../Weather/Weather';

class WeatherList extends Component {
  render() {
    return (
      <section className="weatherSection">

        <div className="sectiontitle">
          <h2>Weather</h2>
        </div>

        <div id="weather">
          {
            this.props.forecast.map((day, index) => {
              return <Weather day={day} key={index} />
            })
          }
        </div>
      </section>
    );
  }
}

export default WeatherList;
