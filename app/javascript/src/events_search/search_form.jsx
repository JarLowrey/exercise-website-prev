import React from 'react';

import Datetime from 'react-datetime';
import moment from 'moment';
import styles from 'react-datetime/css/react-datetime.css'


export default class EventSearchForm extends React.Component {
  _isTodayOrLater(currentDate) {
    let today = moment(new Date());
    return currentDate.isSameOrAfter(today, 'day');
  }
  _isValidEnd(currentDate) {
    try {
      return this._isTodayOrLater(currentDate) && currentDate.isSameOrAfter(this.props.start, 'day');
    } catch (e) {
      return false;
    }
  }
  render() {

    return (
      <div>
        <Datetime
          className={styles['rdt']}
          isValidDate={this._isTodayOrLater}
          defaultValue={this.props.start}
          inputProps={
            {
              placeholder: "From"
            }
          }
          onChange={this.props.onStartChange} />
        <Datetime
          isValidDate={this._isValidEnd.bind(this)}
          defaultValue={this.props.end}
          inputProps={
            {
              placeholder: "To"
            }
          }
          onChange={this.props.onEndChange} />
      </div>
    );
  }
}
