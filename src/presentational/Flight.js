import React from 'react';
import moment from 'moment'
import flightPathIcon from '../icons/flight.png'
import './Flight.css';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 24.94,
      destination: 'Milan',
      dest: 'MXP',
      orig: 'BCN',
      return_date: '2018-01-22T21:30',
      depart_date: '2018-01-18T14:45',
      duration: '1:20',
    };
  }

  getDelta(d, depart) {
    if (depart) {
      var startdate = moment(this.state.depart_date + ':00Z');
    } else{
      var startdate = moment(this.state.return_date + ':00Z');
    }
    var arrival = moment(startdate).add(Number(d[0]), 'h').add(Number(d[1]), 'm');
    return arrival.utc().format('H:mm');
  }

  render() {
    let goingDay = this.state.depart_date.split('T')[0].split('-')
    let goingHours = this.state.depart_date.split('T')[1]

    let returnDay = this.state.return_date.split('T')[0].split('-')
    let returnHours = this.state.return_date.split('T')[1]

    let flightDuration = this.state.duration.split(':')

    return (
      <div className="flight_card">
        <div className="flight_destination">
          {this.state.destination}
        </div>
        <div className="flight">
          <div className="flight_path">
            {this.state.orig} - {this.state.dest}
          </div>
          <div className="flight_details">
            <div className="flight_details_date">
              <span className="flight_details_hour" >{goingHours}</span>
              <span className="flight_details_day" >{moment([goingDay[0], goingDay[1], goingDay[2]]).format('MMM D')}</span>
            </div>
            <div className="flight_track">
              <span className="flight_track_duration" >{flightDuration[0] + 'h' + flightDuration[1] + 'm'}</span>
              <img src={flightPathIcon} className="flight_path_icon"></img>
            </div>
            <div className="flight_details_date">
              <span className="flight_details_hour" >{this.getDelta(flightDuration, true)}</span>
              <span className="flight_details_day" >{moment([goingDay[0], goingDay[1], goingDay[2]]).format('MMM D')}</span>
            </div>
          </div>
        </div>
        <div className="flight">
          <div className="flight_path">
            {this.state.dest} - {this.state.orig}
          </div>
          <div className="flight_details">
            <div className="flight_details_date">
              <span className="flight_details_hour" >{returnHours}</span>
              <span className="flight_details_day" >{moment([returnDay[0], returnDay[1], returnDay[2]]).format('MMM D')}</span>
            </div>
            <div className="flight_track">
              <span className="flight_track_duration" >{flightDuration[0] + 'h' + flightDuration[1] + 'm'}</span>
              <img src={flightPathIcon} className="flight_path_icon"></img>
            </div>
            <div className="flight_details_date">
              <span className="flight_details_hour">{this.getDelta(flightDuration, false)}</span>
              <span className="flight_details_day" >{moment([returnDay[0], returnDay[1], returnDay[2]]).format('MMM D')}</span>
            </div>
          </div>
        </div>
        <span className="flight_line"></span>
        <div className="flight_end">
          <div className="flight_price">
            {this.state.value} €
          </div>
          <div className="flight_book">
            book
          </div>
        </div>
      </div>
    );
  }
}

export default Flight;
