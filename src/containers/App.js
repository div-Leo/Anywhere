import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { actions } from './actions';
import './App.css';
import World from '../presentational/World.js';
import CitiesSearch from '../presentational/CitiesSearch.js';
import Calendar from '../presentational/Calendar.js';
import Counter from '../presentational/Counter.js';
import Flight from '../presentational/Flight.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      <World/> {/*world contains clouds and main title, trigger the event to call an other component and regenrate it self.*/}
      <CitiesSearch/>
      <Calendar/>
      <Counter/>
      <Flight/>
      </div>
    );
  }
}

export default App;
