import React from 'react';
import { connect } from 'react-redux';
// import { actions } from '../actions';
import moment from 'moment'

import './Calendar.css';

class Calendar extends React.Component {

  render() {
    return (
      <div>
        <div id="calendar"></div>
      </div>
    );
  }
}

export default Calendar;
