//= require address
//= require workout
//= require social_profiles


//Place all the behaviors and hooks related to the matching controller here.
//All this logic will automatically be available in application.js.

var map;
var placeService;
var geocoder;
var markers = {};
var search_timer = null;
var wait_after_map_bounds_change_before_searching_db = 800;

document.addEventListener("DOMContentLoaded", initialize_events);

function placeEventMarker(event) {
    //check if marker has already been placed, if so stop execution
    if (markers[event.id]) {
        return;
    }

    //create a new marker at the given position
    markers[event.id] = new google.maps.Marker({
        position: { lat: event.latitude, lng: event.longitude },
        map: map
    });
}

function search_events() {
    //Call backend to find events in the map's given area
    $.ajax({
        url: "/events/search",
        type: "get", //send it through get method
        data: {
            ne_lng: map.getBounds().getNorthEast().lng(),
            ne_lat: map.getBounds().getNorthEast().lat(),
            
            sw_lng: map.getBounds().getSouthWest().lng(),
            sw_lat: map.getBounds().getSouthWest().lat()
        },
        success: function (response) {
            for (event of response) {
                placeEventMarker(event);
            }
        },
        error: function (xhr) {
            //Do Something to handle error
        }
    });
}

function reset_search_timeout() {
    //Wait a little after the user has finished changing the map's window/bounds before triggering a search (for performance reasons)
    if (search_timer) {
        window.clearTimeout(search_timer);
    }
    search_timer = window.setTimeout(search_events, wait_after_map_bounds_change_before_searching_db);
}

async function initialize_events() {
    //initialize map
    let map_el = document.getElementById('map');
    if (map_el) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: await get_current_pos(),
            styles: [ //Style ref: https://developers.google.com/maps/documentation/javascript/style-reference
                {
                    featureType: 'poi',
                    stylers: [{ visibility: "off" }]
                },
                {
                  featureType: 'transit',
                  elementType: 'labels.icon',
                  stylers: [{visibility: 'off'}]
                }                
            ]
        });
    }

    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, "bounds_changed", reset_search_timeout);
}


async function get_current_pos() {
    let not_found = {
        lat: 37.7749,
        lng: -122.4194
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
                    timeout: 1000,
                    maximumAge: 0
                });
        } else {
            resolve(not_found);
        }
    });
}