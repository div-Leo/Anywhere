import React from 'react';
import { connect } from 'react-redux';
import { updateCities } from '../actions';
import _ from 'lodash'
import $ from "jquery";
import './CitiesSearch.css';

class CitiesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      closestAirport: ''
    };
    this.openDialog = this.openDialog.bind(this);
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
        let closestAirport = [{
          label: data[0].airport_name,
        }]
        this.props.updateCities(closestAirport)
      });
    }
  }

  searchQuery = debounceEvent((e) => {
    if (e.target.value.length > 0) {
      this.setState({
        airport: e.target.value
      });
      let url = 'https://api.sandbox.amadeus.com/v1.2/airports/autocomplete'
      fetch(`${url}?apikey=iCjQ7fLhfy1E3oM1YJO3kJppZtWPTA2L&term=${e.target.value}`)
      .then(response => response.json())
      .then(data => {
        let cities = [];
        let i = 0;
        while (i < data.length && i < 5) {
          cities.push(data[i]);
          i++;
        }
        this.props.updateCities(cities)
      });
    }
    else this.props.updateCities([])
  }, 400)

  openDialog() {
    this.setState({
      dialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }


  render() {
    return (
      // <div onClick={this.closeDialog}>
       <div className="autocomplete">
         <input
           type="text"
           placeholder="From where would you like to leave?"
           // onClick={(e) => {
           //   this.openDialog();
           //   e.stopPropagation();
           // }}
           onChange={this.searchQuery}/>
         {/* {cancel} */}
         <div className={this.props.cities[0] ? 'dialog open' : 'dialog'} onClick={(e) => this.onType(e.target.textContent, true)}>
           {this.props.cities.map(val => <div>{JSON.stringify(val.label)}</div>)}
         </div>
       </div>
     //</div>
    );
  }
}

function debounceEvent(fn, delay){
  let timeoutID;
  return function(event) {
    const ctx = this;
    event.persist();
    timeoutID && clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.call(this, event);
    }, delay)
  }
}

const mapStateToProps = (state) => ({
  cities: state.citiesList,
});

const mapDispatchToProps = (dispatch) => ({
  updateCities: (data) => dispatch(updateCities(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearch);
