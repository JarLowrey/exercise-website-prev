import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class MapSearch extends React.Component {
    componentWillMount() {
        this.setState({ markers: [] })
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join("")

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }

    render() {
        return (
            <GoogleMapsWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=places" // libraries=geometry,drawing,places
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={3}
                defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.photo_id}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMapsWrapper>
        );
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("ASDASD");
    ReactDOM.render(
        <MapSearch name="React" />,
        document.body.appendChild(document.createElement('div')),
    )
})
