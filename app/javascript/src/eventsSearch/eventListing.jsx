import React from 'react';
import styled from 'styled-components';
import { EventPropType } from '../propTypes';

// eslint-disable-next-line react/prefer-stateless-function
export default class EventListing extends React.Component {
  render() {
    const { event } = this.props;
    const d = new Date(event.start);
    const Listing = styled.div`
        color:red;
    `;
    return (
      <Listing>
        <h3>{event.name}</h3>

        <time>{d.toLocaleString()}</time>
        <p>{event.address.street_address}</p>
        <a href="/events/{event.id}"> See full event info</a>
      </Listing>
    );
  }
}

EventListing.propTypes = {
  // eslint-disable-next-line react/no-typos
  event: EventPropType.isRequired,
};

