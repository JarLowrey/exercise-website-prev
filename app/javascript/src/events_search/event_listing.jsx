import React from 'react'
import styled from 'styled-components';

const Listing = styled.div`
    color:red;
`;

export default class EventListing extends React.Component {

    render() {
        let event = this.props.event;
        let d = new Date(event.start);
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
