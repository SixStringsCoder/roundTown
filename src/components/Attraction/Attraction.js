import React, { Component} from 'react';
import './Attraction.css'

class Attraction extends Component {
  render() {
    const { name,
            pic,
            category,
            rating,
            hours,
            address,
            city,
            state,
            country,
            postalCode,
            website } = this.props.venue;
    return (
        <div className="venue" id="venue-{this.props.venue.name}">
          <div className="topInfo">
            <h2>{ name }</h2>
            <img className="venueimage" src={ pic } alt={ name } />
            <h4>{ category } <br />Rating: { rating }&nbsp; &#10084;</h4>
            <p><strong>Hours:</strong> { hours } </p>
          </div>
          <div className="bottomInfo">
            <p>{ address }<br />
            { city }, { state }<br />
            { country } { postalCode }</p>
            <button id="venueMap"><a href={ website } target="_blank" rel="noopener noreferrer">Website</a></button>
          </div>
        </div>
    );
  }
}

export default Attraction;
