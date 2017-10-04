import React from 'react'
import PropTypes from 'prop-types'

import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

export default class MapSearch extends React.Component {
    constructor(props){
        super(props);
        this.wait_after_map_bounds_change_before_searching_db = 800;
        this.search_timer = null;     
        this.map = null;   
    }

    _passBoundsUp(){
        const bnds = {
            ne_lng: this.map.getBounds().getNorthEast().lng(),
            ne_lat: this.map.getBounds().getNorthEast().lat(),
            sw_lng: this.map.getBounds().getSouthWest().lng(),
            sw_lat: this.map.getBounds().getSouthWest().lat()
        }
        this.props.mapBoundsChanged( bnds ); 
    }

    componentWillMount() {
        this.setState({
            markers: [],
            onMapMounted: map => {
                this.map = map;
            },
            onBoundsChanged: () => {
                //Wait a little after the user has finished changing the map's window/bounds before triggering a search (for performance reasons)
                if (search_timer) {
                    window.clearTimeout(search_timer);
                }
                search_timer = window.setTimeout(this._passBoundsUp.bind(this), this.wait_after_map_bounds_change_before_searching_db);
            }
        });
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
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places" // libraries=geometry,drawing,places
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={12}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                onMapMounted={this.state.onMapMounted}
                onBoundsChanged={this.state.onBoundsChanged}
            >
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
