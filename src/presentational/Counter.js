import React from 'react';
import './Counter.css';
import minusArr from '../icons/minus.png'
import plusArr from '../icons/plus.png'
import animation from '../animation'


class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: this.props.people,
    };
  }

  oneMore() {
    if (this.state.people < 6) {
      this.props.updateData('people', this.state.people +1);
      this.setState({
        people: this.state.people +1,
      })
    }
  }

  oneLess() {
    if (this.state.people > 1) {
      this.props.updateData('people', this.state.people -1);
      this.setState({
        people: this.state.people -1,
      })
    }
  }

  componentDidMount () {
    const el = this.counter;
    animation.inCounter(el);
  }

  render() {
    return (
      <div ref={c => this.counter = c} className="counterComp">
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
