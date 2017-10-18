import React from 'react';
import EventListing from './event_listing';

export default class EventListingsHandler extends React.Component {

    render() {
        let listings = null;
        if (this.props.events.length == 0) {
            listings = (
                <div>
                    <h1>No Results</h1>
                    <p>Try changing up your search</p>
                </div>
            );
        } 
        else {
            listings = (
                <div>
                    {this.props.events.map((event) =>
                        <EventListing key={event.id}
                            event={event} />
                    )}
                </div>
            );
        }

        return listings;
    }
}
