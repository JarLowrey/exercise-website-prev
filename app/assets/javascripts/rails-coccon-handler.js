
var autocomplete_selecter = ".search_autocomplete";


function add_coccon_autocomplete(input_el) {
    input_el.autocomplete({
        source: input_el.data('autocomplete-source'),
        autoFocus: true,
        minLength: 0,
        messages: {
            noResults: '',
            results: function() {}
        }
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}

$(document).ready(function () {
    //add autocomplete to form inputs
    let autocomplete_inputs = $(autocomplete_selecter);
    for (let dom_node of autocomplete_inputs) {
        add_coccon_autocomplete($(dom_node));
    }
});


function init_coccon_autocomplete(wrapper_selector) {
    $(wrapper_selector).on('cocoon:after-insert', function (e, insertedItem) {
        //ensure auto-complete is added to all additional coccon-generated inputs
        let new_autocomplete_input = insertedItem.find(autocomplete_selecter)
        add_coccon_autocomplete(new_autocomplete_input);
    });
}


function init_coccon_validation(wrapper_selector) {
    //enable validation on all inserted input elements
    $(wrapper_selector).on('cocoon:after-insert', function (e, insertedItem) {
        insertedItem.find('input').enableClientSideValidations();
    });
}
