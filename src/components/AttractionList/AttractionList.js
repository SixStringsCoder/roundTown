import React, { Component} from 'react';
import './AttractionList.css';
import Attraction from '../Attraction/Attraction';

class AttractionList extends Component {
  render() {
    return(
      <section className="venuesSection">

        <div className="attractionTitle">
          <h2>Top Attractions</h2>
        </div>

        <div id="venues">
          {
            this.props.venue.map((venue, index) => {
              return <Attraction venue={venue} key={index} />
            })
          }
        </div>
      </section>
    );
  }
}

export default AttractionList;
