import React from 'react';
import PropTypes from 'prop-types';
import EventListing from './event_listing';
import { EventPropType } from '../CustomPropTypes';

export default class EventListingsHandler extends React.Component {
  render() {
    let listings = null;
    if (this.props.events.length === 0) {
      listings = (
        <div>
          <h1>No Results</h1>
          <p>Try changing up your search</p>
        </div>
      );
    } else {
      listings = (
        <div>
          {
            this.props.events.map(evt =>
              (<EventListing
                key={evt.id}
                event={evt}
              />))
          }
        </div>
      );
    }

    return listings;
  }
}

EventListingsHandler.propTypes = {
  events: PropTypes.arrayOf(EventPropType).isRequired,
};
