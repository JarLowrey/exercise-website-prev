import React from 'react';
import { GoogleMap, withGoogleMap } from 'react-google-maps';

// https://github.com/tomchentw/react-google-maps/issues/636#issuecomment-333732995

const GoogleMapsWrapper = withGoogleMap(props => <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>);

export default GoogleMapsWrapper;