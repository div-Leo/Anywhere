import React from 'react';
import { connect } from 'react-redux';
import { updateCities } from '../actions';
import './CitiesSearch.css';

class CitiesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      text: this.props.airport,
    };
  }

  searchQuery = debounceEvent((e) => {
    if (e.target.value.length > 0) {
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
    this.props.updateCities([])
    this.setState({
      dialogOpen: false
    });
  }

  render() {
    return (
       <div className="autocomplete">
         <input
           type="text"
           placeholder="From where would you like to leave?"
           value={this.state.text}
           onChange={(e) => {this.setState({text: e.target.value}); this.searchQuery(e);}}/>
         {/* {cancel} */}
         <div
           className={this.props.cities[0] ? 'dialog open' : 'dialog'}
           onClick={(e) => {this.setState({text: e.target.textContent}); this.closeDialog()}}>
           {this.props.cities.map(val => <div key={val.value}>{JSON.stringify(val.label)}</div>)}
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

const mapStateToProps = (state) => ({
  cities: state.citiesList,
});

const mapDispatchToProps = (dispatch) => ({
  updateCities: (data) => dispatch(updateCities(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearch);
