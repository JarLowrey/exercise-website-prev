//= require address
//= require workout
//= require social_profiles


//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.

var map;
var placeService;
var geocoder;
var marker;
var markerPos = null;

document.addEventListener("DOMContentLoaded", initialize_events);

function placeMarker(position) {
    //create a new marker at the given position
    marker = new google.maps.Marker({
        position: position,
        map: map
    });
    // console.log(marker.position.lat(), position);
}

function initialize_events() {
    //decide upon map's initial position
    let zoom = 3;
    let pos = {
        'lat': 0,
        'lng': 0
    };
    if (markerPos) {
        zoom = 14;
        pos = markerPos;
    }

    //initialize map
    let map_el = document.getElementById('map');
    if (map_el) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: pos
        });

        if(markerPos){
            placeMarker(markerPos);
        }
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