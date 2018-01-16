import React from 'react';
import moment from 'moment'
import flightPathIcon from '../icons/flight.png'
import './Flight.css';
import mockData from '../mockDataPresentation.js'

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDelta(d, depart, obj) {
    if (depart) {
      var startdate = moment(obj.depart_date + ':00Z');
    } else{
      var startdate = moment(obj.return_date + ':00Z');
    }
    var arrival = moment(startdate).add(Number(d[0]), 'h').add(Number(d[1]), 'm');
    return arrival.utc().format('H:mm');
  }

  createFlightCard = (obj, i) => {
    let goingDay = obj.depart_date.split('T')[0].split('-')
    let goingHours = obj.depart_date.split('T')[1]
    let returnDay = obj.return_date.split('T')[0].split('-')
    let returnHours = obj.return_date.split('T')[1]
    let flightDuration = obj.duration.split(':')

    return (
    <div key={i} className="flight_card">
      <div className="flight_destination">
        {obj.city_name}
      </div>
      <div className="flight">
        <div className="flight_path">
          {obj.origin} - {obj.destination}
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
            <span className="flight_details_hour" >{this.getDelta(flightDuration, true, obj)}</span>
            <span className="flight_details_day" >{moment([goingDay[0], goingDay[1], goingDay[2]]).format('MMM D')}</span>
          </div>
        </div>
      </div>
      <div className="flight">
        <div className="flight_path">
          {obj.destination} - {obj.origin}
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
            <span className="flight_details_hour">{this.getDelta(flightDuration, false, obj)}</span>
            <span className="flight_details_day" >{moment([returnDay[0], returnDay[1], returnDay[2]]).format('MMM D')}</span>
          </div>
        </div>
      </div>
      <span className="flight_line"></span>
      <div className="flight_end">
        <div className="flight_price">
          {obj.price} €
        </div>
        <div className="flight_book">
          book
        </div>
      </div>
    </div>
  )}

  render() {
    return (
      <div className="flights_container">
        {mockData.map((obj, i) => this.createFlightCard(obj, i))}
      </div>
    );
  }
}

export default Flight;
