import React from 'react';

import Datetime from 'react-datetime';
import moment from 'moment';
// import styled from 'styled-components';
// import '../css/react-datetime.css';

export default class EventSearchForm extends React.Component {

  componentWillMount(){
    //set default state
    this.setState({
      start: Datetime.moment(),
      end: Datetime.moment().add(1,'week')
    });
  }

  _isTodayOrLater(currentDate) {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return currentDate.isAfter(yesterday);
  }
  _isValidEnd(currentDate) {
    try {
      return this._isTodayOrLater(currentDate) && currentDate.isSameOrAfter(this.state.start);
    } catch (e) {
      return false;
    }
  }
  
  render() {
    return (
      <div>
        <Datetime
          isValidDate={this._isTodayOrLater}
          defaultValue={this.state.start}
          inputProps={
            {
              placeholder: "From"
            }
          }
          onChange={(date) => { this.setState({ start: date }) }} />
        <Datetime
          isValidDate={this._isValidEnd.bind(this)}
          defaultValue={this.state.end}
          inputProps={
            {
              placeholder: "To"
            }
          }
          onChange={(date) => { this.setState({ end: date }) }} />
      </div>
    );
  }
}
