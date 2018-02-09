import React, { Component } from 'react';
import './App.css';
import World from '../presentational/World.js';
import CitiesSearch from '../presentational/CitiesSearch.js';
import Bookmarks from '../presentational/Bookmarks.js';
import Calendar from '../presentational/Calendar.js';
import Counter from '../presentational/Counter.js';
import Flight from '../presentational/Flight.js';
import Menu from '../presentational/Menu.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      page: 0,
      title: ['Anywhere', 'Origin', 'Trip dates', 'Passanger', 'Destination'],
      airport: null,
      worls: null,
      objDays: { going: {d:null, m:null}, return: {d:null, m:null} },
      selectedDays: [],
      people: 1,
      menu: false,
      destination: null,
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

  updateData = (key, value, flag=false) => {
    if (flag) {
      value = Object.assign(this.state.objDays, value)
    }
    this.setState({
      [key]: value
    })
  }

  compToShow(){
    const components = [
      <div className="heading"><h3>No matter where. Just go!</h3> </div>,
      <CitiesSearch updateData={this.updateData} airport={this.state.airport}/>,
      <Calendar updateData={this.updateData} selectedDays={this.state.selectedDays} going={this.state.objDays.going} return={this.state.objDays.return}/>,
      <Counter updateData={this.updateData} people={this.state.people}/>,
      <Flight updateData={this.updateData}/>
    ]
    return components[this.state.page]
  }

  getZState() {
    const map = [-300, 1800, 3300, 4800, 6200];
    return map[this.state.page];
  }

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  updatePage = (key) => {
    this.setState({
      page: key
    })
  }

  showDates() {
    if(this.state.objDays.going.d === null || this.state.objDays.return.d === null) return null;
    return `From ${this.state.objDays.going.d}.${this.state.objDays.going.m}  - To ${this.state.objDays.return.d}.${this.state.objDays.return.m}`;
  }

  render() {
    return (
      <div id="viewport">
          <Menu
            updateWorld={this.updatePage}
            open={this.state.menu}
            toggleMenu={this.toggleMenu}
            details={{
                Home: 'Anywhere',
                Origin:this.state.airport,
                Dates: this.showDates(),
                People: this.state.people,
                Destination: this.state.destination,
              }}
              page={this.state.page}
            />
          <Bookmarks page={this.state.page} details={[
              'Wherever ',
              this.state.airport,
              this.showDates(),
              this.state.people,
              this.state.destination,
            ]}
            pageName={this.state.title[this.state.page]}/>
          <World
            updateWorld={this.updatePage}
            zState={this.getZState()}
            title={this.state.title[this.state.page]}/>
          {this.compToShow()}
      </div>
    );
  }
}


export default App;
