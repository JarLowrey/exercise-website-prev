import React from 'react';

import Datetime from 'react-datetime';
import moment from 'moment';

export default class EventSearchForm extends React.Component {
  _isTodayOrLater(currentDate) {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return currentDate.isAfter(yesterday);
  }
  _isValidEnd(currentDate) {
    try {
      return this._isTodayOrLater(currentDate) && currentDate.isSameOrAfter(this.props.start);
    } catch (e) {
      return false;
    }
  }
  render() {
    return (
      <div>
        <Datetime
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
