var autocomplete;
var lat;
var lng;

document.addEventListener("DOMContentLoaded", initialize_address);


function initialize_address() {
    lat = get_latitude_input();
    lng = get_longitude_input();
    let addr = get_address_input();

    //init autocomplete
    if (addr) {
        //disable enter key from submitting form
        addr.onkeypress = (e) => {
            if (e.keyCode == 13) {
                return false;
            }
        }

        //initialize google autocomplete
        autocomplete = new google.maps.places.Autocomplete(addr);

        //save lat,lng when user finalizes his place
        autocomplete.addListener('place_changed', () => {
            try {
                let place = autocomplete.getPlace();
                lat.value = place.geometry.location.lat();
                lng.value = place.geometry.location.lng();
            } catch (e) { //a place was not selected
                lat.value = "";
                lng.value = "";
            }
        });
    }
}

function get_address_input() {
    let inputs = document.getElementsByTagName("input");
    //search each input for an element whose ID contains "address"
    for (input of inputs) {
        if (input.id.includes("address")) return input
    }
}


function get_longitude_input() {
    let inputs = document.getElementsByTagName("input");
    //search each input for an element whose ID contains "address"
    for (input of inputs) {
        if (input.id.includes("longitude")) return input
    }
}

function get_latitude_input() {
    let inputs = document.getElementsByTagName("input");
    //search each input for an element whose ID contains "address"
    for (input of inputs) {
        if (input.id.includes("latitude")) return input
    }
}