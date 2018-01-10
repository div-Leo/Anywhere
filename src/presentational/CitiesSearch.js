import React from 'react';
// import { connect } from 'react-redux';
// import { actions } from '../actions';
import './CitiesSearch.css';

class CitiesSearch extends React.Component {

  render() {
    return (
      <div>
        <input className="searchBar" type="text" name="city" placeholder="From where would you like to leave"/>
      </div>
    );
  }
}

export default CitiesSearch;
