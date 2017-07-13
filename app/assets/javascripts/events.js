//= require address


//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.

var map;
var placeService;
var geocoder;
var marker;

document.addEventListener("DOMContentLoaded", initialize_events);

function placeMarker(position, map) {
    //clear marker if it exists
    if (marker) {
        marker.setMap(null);
    }
    //create a new marker where the user clicked
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
}

async function initialize_events() {
    //init map with current location
    let zoom = 3;
    let pos = {
        'lat': 0,
        'lng': 0
    };
    if (navigator.geolocation) {
        zoom = 14;
        pos = await get_current_pos();
    }
    let map_el = document.getElementById('map');
    if (map_el) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: pos
        });
        map.addListener('click', function (e) {
            placeMarker(e.latLng, map);
        });
    }

    geocoder = new google.maps.Geocoder();
}


async function get_current_pos() {
    let not_found = {
        'lat': 0,
        'lng': 0
    };

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            //query for pos and input use it to initMap when found
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        'lat': pos.coords.latitude,
                        'lng': pos.coords.longitude
                    })
                },
                (err) => {
                    resolve(not_found);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 4000,
                    maximumAge: 0
                });
        } else {
            resolve(not_found);
        }
    });
}