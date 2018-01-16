import React from 'react';
import { connect } from 'react-redux';
// import { updateCities } from '../actions';
import './CitiesSearch.css';
import x from '../icons/X.png'

class CitiesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      isEmpty: false,
      text: this.props.airport,
      cities: [],
    };
  }

  searchQuery = debounceEvent((e) => {
    if (e.target.value.length > 0) {
      let url = 'https://api.sandbox.amadeus.com/v1.2/airports/autocomplete'
      fetch(`${url}?apikey=iCjQ7fLhfy1E3oM1YJO3kJppZtWPTA2L&term=${e.target.value}`)
      .then(response => response.json())
      .then(data => {
        let newCities = [];
        let i = 0;
        while (i < data.length && i < 5) {
          newCities.push(data[i]);
          i++;
        }
        this.setState({
          cities: newCities
        })
      });
    }
    else {
      this.setState({
        text: e.target.value,
        isEmpty: true,
        cities: []
      })
    }
  }, 400)

  openDialog() {
    this.setState({
      dialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false,
      cities: []
    });
  }

  clearText() {
    this.setState({
      isEmpty: true,
      text: '',
      cities: []
    });
  }

  render() {
    let cancel = !this.state.isEmpty ?
        <img
          src={x}
          className="cancel"
          onClick={() => {
            this.clearText();
          }}></img> : null;

    return (
       <div className="autocomplete">
         <input
           type="text"
           placeholder="From where would you like to leave?"
           value={this.state.text}
           onChange={(e) => {this.setState({text: e.target.value, isEmpty: false}); this.searchQuery(e);}}/>
           {cancel}
         <div
           className={this.state.cities[0] ? 'dialog open' : 'dialog'}
           onClick={(e) => {
             this.setState({text: e.target.textContent});
             this.props.updateData('airport', e.target.textContent)
             this.closeDialog()
           }}>
           {this.state.cities.map(val =>
             <div key={val.value}>{
               JSON.stringify(val.label).slice(1, -1)
             }</div>)}
         </div>
       </div>
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

export default CitiesSearch;
