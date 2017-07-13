var autocomplete;

document.addEventListener("DOMContentLoaded", initialize_address);


function initialize_address() {
    //init autocomplete
    let addr = get_address_input();
    if (addr) {
        //disable enter key from submitting form
        addr.onkeypress = (e) => {
            if (e.keyCode == 13) {
                return false;
            }
        }
        //initialize google autocomplete
        autocomplete = new google.maps.places.Autocomplete(addr);
    }
}

function get_address_input() {
    let inputs = document.getElementsByTagName("input");
    //search each input for an element whose ID contains "address"
    for (input of inputs) {
        if (input.id.includes("address")) return input
    }
}