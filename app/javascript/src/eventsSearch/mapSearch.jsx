/* global google */

import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import scriptLoader from 'react-async-script-loader';
import GoogleMapsWrapper from './GoogleMapsWrapper';
import { EventPropType, LatLngPropType } from '../propTypes';

class MapSearch extends React.Component {
  constructor(props) {
    super(props);

    // bind functions
    this.registerBoundsChanged = this.registerBoundsChanged.bind(this);
    this.boundsChanged = this.boundsChanged.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
    this.toggleSearchMapOnDrag = this.toggleSearchMapOnDrag.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    // initialize vars
    this.mapSearchDelay = 800;
    this.searchDelayTimer = null;
    this.map = null;
    this.state = {
      searchMapOnDrag: true,
    };
  }


  componentWillReceiveProps(nextProps) {
    // Use potentially updated Southwest/Northeast bounds to update the map's bounds
    this.setMapLocation(nextProps.sw, nextProps.ne);
  }

  onMapMounted(map) {
    this.map = map;
    this.setMapLocation();
  }

  setMapLocation(sw = this.props.sw, ne = this.props.ne) {
    if (this.map) {
      let shouldUpdateBounds = true; // default to true, as bounds may be set after map first loads
      const mapBounds = this.map.getBounds();

      // only update map if bounds are different than current values
      // Using fitBounds with the same bounds causes the map to move
      // getBounds() may return undefined when map is first loading,
      // which would make it impossible to compare to maps current SW/NE vals
      if (mapBounds) {
        const currSW = mapBounds.getSouthWest().toJSON();
        const currNE = mapBounds.getNorthEast().toJSON();

        const diffNEval = currNE.lat !== ne.lat || currNE.lng !== ne.lng;
        const diffSWval = currSW.lat !== sw.lat || currSW.lng !== sw.lng;

        shouldUpdateBounds = diffNEval || diffSWval;
      }

      if (shouldUpdateBounds) {
        const newBnds = new google.maps.LatLngBounds(sw, ne);
        this.map.fitBounds(newBnds);
      }
    }
  }

  registerBoundsChanged() {
    this.props.searchParamsChanged({
      sw: this.map.getBounds().getSouthWest().toJSON(),
      ne: this.map.getBounds().getNorthEast().toJSON(),
    });
  }

  boundsChanged() {
    // Wait a little after the user has finished changing the map's
    // bounds before triggering a search (for performance reasons)
    if (this.searchDelayTimer) {
      window.clearTimeout(this.searchDelayTimer);
    }
    if (this.state.searchMapOnDrag) {
      this.searchDelayTimer = window.setTimeout(this.registerBoundsChanged, this.mapSearchDelay);
    }
  }

  toggleSearchMapOnDrag() {
    this.setState({ searchMapOnDrag: !this.state.searchMapOnDrag });
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.toggleSearchMapOnDrag();
    }
  }

  render() {
    // do not load component if Google Maps API is not yet available
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    const notLoaded = !(isScriptLoaded && isScriptLoadSucceed);
    if (notLoaded) { return (<div />); }

    return (
      <div style={{
        position: 'relative',
      }}
      >
        <GoogleMapsWrapper
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
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
            fullscreenControl: false,
            streetViewControl: false,
          }}
          onMapMounted={this.onMapMounted}
          onBoundsChanged={this.boundsChanged}
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

        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'white',
            boxSizing: 'border-box',
            border: '1px solid transparent',
            padding: '6px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
          onClick={this.toggleSearchMapOnDrag}
          role="button"
          tabIndex={0}
          onKeyPress={this.handleKeyPress}
        >
          <input
            type="checkbox"
            checked={this.state.searchMapOnDrag}
            onChange={this.toggleSearchMapOnDrag}
          />
          <span>Search as I move the map</span>
        </div>
      </div>
    );
  }
}

export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places')(MapSearch);

MapSearch.propTypes = {
  sw: LatLngPropType,
  ne: LatLngPropType,
  searchParamsChanged: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(EventPropType).isRequired,
  isScriptLoaded: PropTypes.bool.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
};

MapSearch.defaultProps = {
  sw: { lat: 37.70339999999999, lng: -122.52699999999999 }, // Bounds of San Francisco
  ne: { lat: 37.812, lng: -122.34820000000002 },
};
