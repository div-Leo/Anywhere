import React from 'react';
// import { connect } from 'react-redux';
// import { actions } from '../actions';
import './Counter.css';
import minusArr from '../icon/minus.png'
import plusArr from '../icon/plus.png'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: 1,
    };
  }
  oneMore() {
    if (this.state.people < 6) {
      this.setState({
        people: this.state.people +1,
      })
    }
  }

  oneLess() {
    if (this.state.people > 1) {
      this.setState({
        people: this.state.people -1,
      })
    }
  }

  render() {
    return (
      <div className="counterComp">
        <span className="textCounter">Select passenger n°:  </span>
        <div className="counter">
          <img src={plusArr} className="arrow_counter" onClick={() => this.oneMore()}></img>
          <span className="number">{this.state.people}</span>
          <img src={minusArr} className="arrow_counter" onClick={() => this.oneLess()}></img>
        </div>
      </div>
    );
  }
}

export default Counter;
