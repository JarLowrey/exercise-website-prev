import React from 'react';
import ReactDOM from 'react-dom';

import queryString from 'query-string';
import moment from 'moment';
import MapSearch from './map_search';
import EventListingsHandler from './event_listings_handler';
import EventSearchForm from './search_form';

class EventSearchPack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      start: moment(new Date()),
      end: moment(new Date()).add(1, 'week'),
    };
  }

  searchForEvents() {
    // extract relevant vars search param vars from this.state
    const searchParams = (({
      start, end, ne_lng, ne_lat, sw_lng, sw_lat,
    }) => ({
      start, end, ne_lng, ne_lat, sw_lng, sw_lat,
    }))(this.state);

    // preprocess data before sending
    searchParams.start = searchParams.start.unix();
    searchParams.end = searchParams.end.unix();

    const url = `/events/search?${queryString.stringify(searchParams)}`;
    fetch(url, {
      credentials: 'same-origin',
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ events: data });
      }).catch((ex) => {
        console.log('parsing failed', ex);
      });
  }

  render() {
    return (
      <div>
        <EventSearchForm
          start={this.state.start}
          end={this.state.end}
          onStartChange={(date) => { this.setState({ start: date }); }}
          onEndChange={(date) => { this.setState({ end: date }); }}
        />
        <EventListingsHandler events={this.state.events} />
        <MapSearch
          mapBoundsChanged={
            (bnds) => {
              this.setState(bnds);
              this.searchForEvents();
            }
          }
          events={this.state.events}
        />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EventSearchPack />,
    document.body.appendChild(document.createElement('div')),
  );
});
