import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MapSearch from './map_search'
import EventListingsHandler from './event_listings_handler'
import EventSearchForm from './search_form'
import queryString from 'query-string'
import moment from 'moment';

class EventSearchPack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            start: moment(new Date()),
            end: moment(new Date()).add(1, 'week')
        };
    }

    search_for_events() {
        //select only the search params from this.state
        let search_params = (({ start, end, ne_lng, ne_lat, sw_lng, sw_lat }) => ({ start, end, ne_lng, ne_lat, sw_lng, sw_lat }))(this.state);
        //preprocess data before sending
        search_params.start = search_params.start.unix();
        search_params.end = search_params.end.unix();
        
        let url = '/events/search?' + queryString.stringify(search_params);
        fetch(url, {
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ events: data });
            }).catch(ex => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        return (
            <div>
                <EventSearchForm
                    start={this.state.start}
                    end={this.state.end}
                    onStartChange={(date) => { this.setState({ start: date }) }}
                    onEndChange={(date) => { this.setState({ end: date }) }} />
                <EventListingsHandler events={this.state.events} />
                <MapSearch
                    mapBoundsChanged={
                        (bnds) => {
                            this.setState(bnds);
                            this.search_for_events();
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
    )
})
