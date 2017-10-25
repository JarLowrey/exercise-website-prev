import React from 'react';
import ReactDOM from 'react-dom';

import queryString from 'query-string';
import moment from 'moment';
import MapSearch from './mapSearch';
import EventListingsHandler from './eventListings';
import EventSearchForm from './searchForm';

class EventSearchPack extends React.Component {
  constructor(props) {
    super(props);
    this.updateStateAndSearch = this.updateStateAndSearch.bind(this);

    this.state = {
      events: [],
      start: moment(new Date()),
      end: moment(new Date()).add(1, 'week'),
    };
  }

  updateStateAndSearch(bnds) {
    this.setState(bnds);
    this.searchForEvents();
  }

  searchForEvents() {
    // extract relevant vars search param vars from this.state
    const searchParams = {
      start: this.state.start.unix(),
      end: this.state.end.unix(),
      ne_lat: this.state.ne.lat,
      ne_lng: this.state.ne.lng,
      sw_lat: this.state.sw.lat,
      sw_lng: this.state.sw.lng,
    };

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
          searchParamsChanged={this.updateStateAndSearch}
        />
        <EventListingsHandler events={this.state.events} />
        <MapSearch
          searchParamsChanged={this.updateStateAndSearch}
          events={this.state.events}
          sw={this.state.sw}
          ne={this.state.ne}
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
