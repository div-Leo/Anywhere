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
        going: {d:null, m:null },
        return: {d:null, m:null },
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
    let arrDays = [];
    if ((!this.state.objDays.going['d']
    || this.state.objDays.going['d'] > day
    || this.state.objDays.return['d'] === day
    )&& this.state.objDays.going['m'] >= m) {
      this.state.objDays.going = {m:m, d:day};
      arrDays.push([m,day])
    } else {
      this.state.objDays.return = {m:m, d:day};
    }

    if (this.state.objDays.going['m'] < this.state.objDays.return['m']) {
      for (var i = this.state.objDays.going['d']; i < 32; i++) {
        arrDays.push([this.state.objDays.going['m'],i])
      }
      for (var i = 1; i < this.state.objDays.return['d']+1; i++) {
        arrDays.push([this.state.objDays.return['m'],i])
      }
    } else {
      for (var i = this.state.objDays.going['d']; i < this.state.objDays.return['d']+1; i++) {
        arrDays.push([m,i])
      }
    }
    this.setState({
      selectedDays: arrDays,
    })
    console.log(this.state.objDays);
    console.log(arrDays);
  }

  resetPick() {
    this.setState({
      objDays: {
        going: {d:null, m:null },
        return: {d:null, m:null },
      },
      selectedDays: [],
    })
  }

  dayClass(i, m, y){
    let classList = 'day'
    this.state.selectedDays.map((el) => {
      if (el[0] === m && el[1] === i) {
        classList += " selectedDay"
      }
    })
    if (i === this.state.currDay[0] && m === this.state.currDay[1] && y === this.state.currDay[2]) {
      classList += " currDay"
    }
    return classList
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
      monthDays.push(<span id={m+'/'+i} onClick={(e) => this.selectDay(e.target, m)} className={this.dayClass(i, m, y)}>{i}</span>);
    }
    return (
      <div id="calendar">
        <div className="monthTitle">
          <img src={prevArr} className="arrow" onClick={() => this.prevMonth(m, y)}></img>
          {moment([y, m, 1]).format('MMMM YYYY')}
          <img src={nextArr} className="arrow" onClick={() => this.nextMonth(m, y)}></img>
        </div>
        <div className="dates">
          <span className="showDate going">From:
             {this.state.objDays.going['d'] ?
              '  ' + this.state.objDays.going['d'] + ' - ' + moment([y, this.state.objDays.going['m'], 1]).format('MMM') : ''}
           </span>
          <span className="showDate return">To:
             {this.state.objDays.return['d'] ?
              '  ' + this.state.objDays.return['d'] + ' - ' + moment([y, this.state.objDays.return['m'], 1]).format('MMM') : ''}
           </span>
        </div>
        <div className="weekDays">
          {weekDays.map(day => <span className="weekDay">{day}</span>)}
        </div>
        <div className="days">
          {monthDays}
        </div>
        <div onClick={() => this.resetPick()}>cancel</div>
      </div>
    );
  }
}

export default Calendar;
