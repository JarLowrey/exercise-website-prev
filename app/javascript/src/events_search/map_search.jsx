import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import scriptLoader from 'react-async-script-loader';
import GoogleMapsWrapper from './GoogleMapsWrapper';
import { EventPropType } from '../CustomPropTypes';

class MapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.mapSearchDelay = 800;
    this.searchDelayTimer = null;
    this.map = null;
    this.passBoundsUp = this.passBoundsUp.bind(this);
  }

  componentWillMount() {
    this.setState({
      onMapMounted: (map) => {
        this.map = map;
      },
      onBoundsChanged: () => {
        // Wait a little after the user has finished changing the map's
        // bounds before triggering a search (for performance reasons)
        if (this.searchDelayTimer) {
          window.clearTimeout(this.searchDelayTimer);
        }
        this.searchDelayTimer = window.setTimeout(this.passBoundsUp, this.mapSearchDelay);
      },
    });
  }

  passBoundsUp() {
    const bnds = {
      ne_lng: this.map.getBounds().getNorthEast().lng(),
      ne_lat: this.map.getBounds().getNorthEast().lat(),
      sw_lng: this.map.getBounds().getSouthWest().lng(),
      sw_lat: this.map.getBounds().getSouthWest().lat(),
    };
    this.props.mapBoundsChanged(bnds);
  }

  render() {
    // do not load component if Google Maps API is not yet available
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    const notLoaded = !(isScriptLoaded && isScriptLoadSucceed);
    if (notLoaded) { return (<div />); }

    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        defaultZoom={12}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultOptions={{
          styles: [ // Style ref: https://developers.google.com/maps/documentation/javascript/style-reference
            // {
            //     featureType: 'poi',
            //     stylers: [{ visibility: 'off' }]
            // },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }],
            },
          ],
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
              position={{
                lat: parseFloat(event.address.latitude),
                lng: parseFloat(event.address.longitude),
              }}
            />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    );
  }
}


export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places')(MapSearch);


MapSearch.propTypes = {
  mapBoundsChanged: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(EventPropType).isRequired,
  isScriptLoaded: PropTypes.bool.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
};
