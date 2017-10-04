import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MapSearch from './map_search'
import queryString from 'query-string'
import { GoogleMap } from 'react-google-maps';

class EventSearchPack extends React.Component {
    constructor(props) {
        super(props);
        this.search();
    }

    search(params) {
        // let params = {
        //     ne_lng: map.getBounds().getNorthEast().lng(),
        //     ne_lat: map.getBounds().getNorthEast().lat(),

        //     sw_lng: map.getBounds().getSouthWest().lng(),
        //     sw_lat: map.getBounds().getSouthWest().lat()
        // };
        fetch('/events/search' + queryString.stringify(params))
            .then(response => response.json())
            .then(data => {
                // this.setState({ markers: data.photos });
            });
    }

    render() {
        return (
            <MapSearch />
        );

    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("ASDASD");
    ReactDOM.render(
        <EventSearchPack />,
        document.body.appendChild(document.createElement('div')),
    )
})
