//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.

var map;
var placeService;
var autcomplete;
var geocoder;

document.addEventListener("DOMContentLoaded", initialize);



async function initialize() {
    //init autocomplete
    // let start = document.getElementById('location');
    // autcomplete = new google.maps.places.Autocomplete(start);
    geocoder = new google.maps.Geocoder();
    let zoom = 3;
    let pos = {
        'lat': 0,
        'lng': 0
    };
    if (navigator.geolocation) {
        zoom = 14;
        pos = await get_current_pos();
    }
    //init map with current location
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: pos
    });
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