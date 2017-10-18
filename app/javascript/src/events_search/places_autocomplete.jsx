import React from 'react';
import scriptLoader from 'react-async-script-loader';

class PlacesAutocomplete extends React.Component {
    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.initAutocomplete();
        }
    }
    componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initAutocomplete();
            }
            else this.props.onError();
        }
    }

    initAutocomplete(input) {
        if (!google || !input) return;
        this.autocomplete = new google.maps.places.Autocomplete(input);
    }

    render() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
        const not_loaded = !(isScriptLoaded && isScriptLoadSucceed);
        if (not_loaded) { return (<div></div>); }

        return (
            <div>
                <input ref={this.initAutocomplete.bind(this)} />
            </div>
        );
    }
}

export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8-5D3mJSXspmJrhSTtt0ToGiA-JLBc&libraries=geometry,drawing,places'
)(PlacesAutocomplete);