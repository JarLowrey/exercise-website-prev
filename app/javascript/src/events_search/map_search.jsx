import React from 'react';
// import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import scriptLoader from 'react-async-script-loader';
import GoogleMapsWrapper from './GoogleMapsWrapper';

class MapSearch extends React.Component {
    constructor(props) {
        super(props);
        this.wait_after_map_bounds_change_before_searching_db = 800;
        this.search_timer = null;
        this.map = null;
    }

    _passBoundsUp() {
        const bnds = {
            ne_lng: this.map.getBounds().getNorthEast().lng(),
            ne_lat: this.map.getBounds().getNorthEast().lat(),
            sw_lng: this.map.getBounds().getSouthWest().lng(),
            sw_lat: this.map.getBounds().getSouthWest().lat()
        }
        this.props.mapBoundsChanged(bnds);
    }

    componentWillMount() {
        this.setState({
            markers: [],
            onMapMounted: map => {
                this.map = map;
            },
            onBoundsChanged: () => {
                //Wait a little after the user has finished changing the map's window/bounds before triggering a search (for performance reasons)
                if (this.search_timer) {
                    window.clearTimeout(this.search_timer);
                }
                this.search_timer = window.setTimeout(this._passBoundsUp.bind(this), this.wait_after_map_bounds_change_before_searching_db);
            }
        });
    }

    render() {
        //do not load component if Google Maps API is not yet available
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;  
        const not_loaded = !(isScriptLoaded && isScriptLoadSucceed);   
        if (not_loaded){return (<div></div>);}

        return (
            <GoogleMapsWrapper
                ref={(map) => this.map = map}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places" // libraries=geometry,drawing,places
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={12}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                defaultOptions={{
                    styles: [ //Style ref: https://developers.google.com/maps/documentation/javascript/style-reference
                        // {
                        //     featureType: 'poi',
                        //     stylers: [{ visibility: "off" }]
                        // },
                        {
                            featureType: 'transit',
                            elementType: 'labels.icon',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                }}
                onMapMounted={this.state.onMapMounted}
                onBoundsChanged={this.state.onBoundsChanged}
            >
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.props.events.map(event => (
                        <Marker
                            key={event.id}
                            position={{ lat: parseFloat(event.address.latitude), lng: parseFloat(event.address.longitude) }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMapsWrapper>
        );
    }
}


export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places'
)(MapSearch);