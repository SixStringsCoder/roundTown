import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends Component {
  state = {
    location: ""
  }

  // location typed in the input field
  handleTermChange = (event) => {
    this.setState({
      location: event.target.value
    });
  }

  // Search button click handler
  handleClick = (event) => {
    event.preventDefault();
    this.props.search(this.state.location)
  }

  render() {
    return (
      <form>
        <input onChange={this.handleTermChange} type="text" id="city" placeholder="Enter City/Town or PostalCode" />
        <button onClick={this.handleClick} id="button" type="submit">Search</button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired
}

export default SearchBar;
