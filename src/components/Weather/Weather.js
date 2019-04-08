import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {
  render() {
    const { thisDay,
            icon,
            condition,
            fHigh,
            wind,
            fLow,
            humidity
          } = this.props.day;
    return (
      <section className="weather" id={ thisDay }>
          <div className="weatherLeft">
            <h2>{ thisDay }</h2>
            <img src={ icon } alt={ condition } className="weathericon" />
            <p>{ condition }</p>
          </div>

          <div className="weatherRight">
            <h2><span>High:</span> { fHigh }F</h2>
            <h2><span>Wind:</span> { wind }mph</h2>
            <h2><span>Low:</span> { fLow }F</h2>
            <h2><span>Humidity:</span> { humidity }</h2>
          </div>
      </section>
    );
  }
}

export default Weather;
