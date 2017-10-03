import React from 'react';
import { GoogleMap,withGoogleMap,withScriptjs } from 'react-google-maps';

// https://github.com/tomchentw/react-google-maps/issues/636#issuecomment-333732995

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
  return <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>
}));

export default GoogleMapsWrapper;