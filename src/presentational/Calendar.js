import React from 'react';
import moment from 'moment'
import prevArr from '../icon/prev.png'
import nextArr from '../icon/next.png'

import './Calendar.css';

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currDay: [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()],
      month: new Date(),
      objDays: {
        going: null,
        return: null,
      },
      selectedDays: [],
    };
  }

  prevMonth(m, y) {
    m=m-1;
    this.setState({
      month: new Date(Date.UTC(y, m, 1))
    })
  }

  nextMonth(m, y) {
    m=m+1;
    this.setState({
      month: new Date(Date.UTC(y, m, 1))
    })
  }

  selectDay(d, m) {
    let day = Number(d.id.split('/')[1])
    if (!this.state.selectedDays[0]) {
      this.state.selectedDays[0] = day;
    } else {
      this.state.selectedDays[1] = day;
    }
    this.state.selectedDays.sort((a, b) => {
      return a - b;
    })
    console.log(this.state.selectedDays);
    let dRange = this.state.selectedDays;
    for (var i = dRange[0]; i < dRange[dRange.length-1]+1; i++) {
      document.getElementById(`${m+'/'+i}`).classList.add("selectDay")
    }


  }

  render() {
    let weekDays = ['S','M','T','W','T','F','S'];
    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    var d = this.state.month
    let m = d.getMonth();
    let y = d.getFullYear();
    let firstDay = new Date(Date.UTC(y, m, 1));
    let wd = firstDay.getDay();
    let monthDays = [];
    for (let i = 0; i < wd; i++) {
      monthDays.push(<span className="day">{' '}</span>);
    }
    for (let i = 1; i < daysInMonth[m]+1; i++) {
      if (i === this.state.currDay[0] && m === this.state.currDay[1] && y === this.state.currDay[2]) {
        monthDays.push(<span id={m+'/'+i} onClick={(e) => this.selectDay(e.target, m)} className="day currDay">{i}</span>);
      } else monthDays.push(<span id={m+'/'+i} onClick={(e) => this.selectDay(e.target, m)} className="day">{i}</span>);
    }
    return (
      <div id="calendar">
        <div className="monthTitle">
          <img src={prevArr} className="arrow" onClick={() => this.prevMonth(m, y)}></img>
          {moment([y, m, 1]).format('MMMM YYYY')}
          <img src={nextArr} className="arrow" onClick={() => this.nextMonth(m, y)}></img>
        </div>
        <div className="weekDays">
          {weekDays.map(day => <span className="weekDay">{day}</span>)}
        </div>
        <div className="days">
          {monthDays}
        </div>
      </div>
    );
  }
}

export default Calendar;
