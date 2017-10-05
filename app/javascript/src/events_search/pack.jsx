import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MapSearch from './map_search'
import EventListingsHandler from './event_listings_handler'
import queryString from 'query-string'

class EventSearchPack extends React.Component {
    constructor(props) {
        super(props);
        // this.search();
        this.state = ({
            events: []
        });
    }

    search_for_events() {
        let url = '/events/search?' + queryString.stringify(this.state);
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
                <EventListingsHandler events={this.state.events}/>
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
