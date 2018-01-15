import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import World from '../presentational/World.js';
import CitiesSearch from '../presentational/CitiesSearch.js';
import Calendar from '../presentational/Calendar.js';
import Counter from '../presentational/Counter.js';
import Flight from '../presentational/Flight.js';
import Item from '../Item.js';
import { updateCities } from '../actions';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      page: 0,
      title: ['Wherever', 'Origin', 'Trip dates', 'Passanger', 'Destination'],
      airport: '',
      worls: null,
      objDays: { going: {d:null, m:null}, return: {d:null, m:null} },
      selectedDays: [],
      people: 1,
    };
    (this.getLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.closestAirport);
      }
    })();
  }

  closestAirport = (position) => {
    if (position) {
      let url = 'https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant'
      fetch(`${url}?apikey=iCjQ7fLhfy1E3oM1YJO3kJppZtWPTA2L&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          airport: data[0].airport_name,
        })
      });
    }
  }

  updatePage(...args){
    this.setState({
      page: args[1]
    })
  }

  updateData = (key, value, flag=false) => {
    if (flag) {
      value = Object.assign(this.state.objDays, value)
    }
    this.setState({
      [key]: value
    })
  }

  compToShow(){
    if (this.state.page === 0) {
      return <div className="heading"><h3>No matter where just go!</h3> </div>
    }
    else if (this.state.page === 1) {
      return <CitiesSearch updateData={this.updateData} airport={this.state.airport}/>;
    }
    else if (this.state.page === 2) {
      return <Calendar updateData={this.updateData} selectedDays={this.state.selectedDays} going={this.state.objDays.going} return={this.state.objDays.return}/>;
    }
    else if (this.state.page === 3) {
      return <Counter updateData={this.updateData} people={this.state.people}/>;
    }
    else if (this.state.page === 4) {
      return <Flight query={{origin:this.state.airport,}}/>;
    }
  }

  getZState() {
    const map = [-300, 1800, 3300, 4800, 6000];
    return map[this.state.page];
  }

  render() {
    return (
      <div id="viewport">
          <World
            updateWorld={this.updatePage.bind(this, arguments)}
            zState={this.getZState()}
            title={this.state.title[this.state.page]}/>
        {this.compToShow()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.citiesList,
});

const mapDispatchToProps = (dispatch) => ({
  updateCities: (data) => dispatch(updateCities(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
