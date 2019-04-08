import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import WeatherList from '../WeatherList/WeatherList';
import AttractionList from '../AttractionList/AttractionList';
import { Destination } from '../Destination/Destination';
import ApiCalls from '../../utility/Api';

const bizName = "'round-Town";

class App extends Component {
  state = {
    forecast: [],
    venue: [],
    location: "",
  }

  searchApi = (location) => {
    ApiCalls.getForecast(location).then(forecast => {
      // console.log(forecast);
      this.setState({
        forecast: forecast, // the key name from the JSON
      });
    });

    ApiCalls.getVenues(location).then(response => {
      // Location's displayString to set location and show full name on DOM
      const displayName = response.geocode.displayString;
      // JSON details for Venues
      const details = response.groups[0].items.map(place => {
        const picPrefix = "https://igx.4sqi.net/img/general/150x200";
        return ({
          name: place.venue.name,
          pic: 'undefined' ? "No Photo Loading" : picPrefix + place.venue.photos.groups[0].items[0].suffix,
          category: place.venue.categories[0].name,
          rating: place.venue.rating,
          hours: place.venue.hours ? place.venue.hours.status : "Not Available",
          address: place.venue.location.address,
          city: place.venue.location.city,
          state: place.venue.location.state,
          country: place.venue.location.country,
          postalcode: place.venue.location.postalCode,
          website: place.venue.url,
        })
      }); // end of .map

      this.setState({
        venue: details,
        location: displayName
      });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="logoCompany">
            <img className="logo" src={require("./images/Eyes_Emoji_grande.png")} alt="eyes logo" />
            <span className="companyName">{bizName}</span>
          </div>
        </header>

        <main>
          <SearchBar search={this.searchApi} />
        </main>

        <Destination locDisplayName={this.state.location} />

        <div className="container">
          <WeatherList forecast={this.state.forecast} />
          <AttractionList venue={this.state.venue} />
        </div>

        <footer>
          <p id="copyright">&copy; 2018 Steve Hanlon</p>
        </footer>
      </div>
    );
  }
}

export default App;
