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

    search(params) {
        // let params = {
        //     ne_lng: map.getBounds().getNorthEast().lng(),
        //     ne_lat: map.getBounds().getNorthEast().lat(),

        //     sw_lng: map.getBounds().getSouthWest().lng(),
        //     sw_lat: map.getBounds().getSouthWest().lat()
        // };
        console.log('/events/search' + queryString.stringify(this.state), this.state)
        fetch('/events/search' + queryString.stringify(this.state))
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
                        console.log(bnds); this.setState({ bounds: bnds })
                    }
                } />
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
