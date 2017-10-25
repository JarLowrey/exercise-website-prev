import React from 'react';
import PropTypes from 'prop-types';

import Datetime from 'react-datetime';
import moment from 'moment';
import styles from 'react-datetime/css/react-datetime.css';

import PlacesAutocomplete from './placesAutocomplete';


export default class EventSearchForm extends React.Component {
  static isTodayOrLater(currentDate) {
    const today = moment(new Date());
    return currentDate.isSameOrAfter(today, 'day');
  }

  static isValidEnd(currentDate) {
    try {
      return EventSearchForm.isTodayOrLater(currentDate) && currentDate.isSameOrAfter(this.props.start, 'day');
    } catch (e) {
      return false;
    }
  }

  render() {
    return (
      <div>
        <PlacesAutocomplete
          placeChanged={this.props.searchParamsChanged}
        />
        <Datetime
          className={styles.rdt}
          isValidDate={EventSearchForm.isTodayOrLater}
          defaultValue={this.props.start}
          inputProps={
            {
              placeholder: 'From',
            }
          }
          onChange={this.props.onStartChange}
        />
        <Datetime
          isValidDate={EventSearchForm.isValidEnd}
          defaultValue={this.props.end}
          inputProps={
            {
              placeholder: 'To',
            }
          }
          onChange={this.props.onEndChange}
        />
      </div>
    );
  }
}

EventSearchForm.propTypes = {
  searchParamsChanged: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  onStartChange: PropTypes.func.isRequired,
  start: PropTypes.objectOf(Date).isRequired,
  end: PropTypes.objectOf(Date).isRequired,
};
