/* global google */

import React from 'react';
import PropTypes from 'prop-types';

import scriptLoader from 'react-async-script-loader';

class PlacesAutocomplete extends React.Component {
  constructor() {
    super();
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.placeChanged = this.placeChanged.bind(this);
  }

  // componentDidMount() {
  //   const { isScriptLoaded, isScriptLoadSucceed } = this.props;
  //   if (isScriptLoaded && isScriptLoadSucceed) {
  //     this.initAutocomplete();
  //   }
  // }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.initAutocomplete();
      } else this.props.onError();
    }
  }

  initAutocomplete(input) {
    if (!google || !input) return;
    this.autocomplete = new google.maps.places.Autocomplete(input);
    this.autocomplete.addListener('place_changed', this.placeChanged);
  }

  placeChanged() {
    const place = this.autocomplete.getPlace();
    this.props.mapBoundsChanged({
      sw: place.geometry.viewport.getSouthWest().toJSON(),
      ne: place.geometry.viewport.getNorthEast().toJSON(),
    });
  }

  render() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    const notLoaded = !(isScriptLoaded && isScriptLoadSucceed);
    if (notLoaded) { return (<div />); }

    return (
      <div>
        <input ref={this.initAutocomplete} />
      </div>
    );
  }
}

PlacesAutocomplete.propTypes = {
  mapBoundsChanged: PropTypes.func,
  isScriptLoaded: PropTypes.bool.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
  onError: PropTypes.func,
};

PlacesAutocomplete.defaultProps = {
  onError: () => { },
  mapBoundsChanged: () => { },
};


export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places')(PlacesAutocomplete);
