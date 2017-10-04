import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MapSearch from './map_search'
import queryString from 'query-string'

class EventSearchPack extends React.Component {
    constructor(props) {
        super(props);
        // this.search();
    }

    search_for_events() {
        // let params = {
        //     ne_lng: map.getBounds().getNorthEast().lng(),
        //     ne_lat: map.getBounds().getNorthEast().lat(),

        //     sw_lng: map.getBounds().getSouthWest().lng(),
        //     sw_lat: map.getBounds().getSouthWest().lat()
        // };
        let url = '/events/search?' + queryString.stringify(this.state);
        fetch(url, {
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // this.setState({ markers: data.photos });
            }).catch(ex => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        return (
            <MapSearch
                mapBoundsChanged={
                    (bnds) => {
                        this.setState({
                            ne_lng: bnds.ne_lng,
                            ne_lat: bnds.ne_lat,
                            sw_lng: bnds.sw_lng,
                            sw_lat: bnds.sw_lat
                        });
                        this.search_for_events();
                    }
                } />
        );

    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <EventSearchPack />,
        document.body.appendChild(document.createElement('div')),
    )
})
