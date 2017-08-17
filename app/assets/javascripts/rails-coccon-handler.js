
function init_coccon_autocomplete(wrapper_selector, input_selector){
    //function for adding autocomplete to a given input
    var add_coccon_autocomplete = function(input_el) {
        input_el.autocomplete({
            source: input_el.data('autocomplete-source')
        });
    }

    //add autocomplete to first coccon input
    add_coccon_autocomplete( $(input_selector) );
    
    //ensure auto-complete is added to all addition coccon-generated inputs
    $(wrapper_selector).on('cocoon:after-insert', function (e, insertedItem) {
        let new_autocomplete_input = insertedItem.find(input_selector)
        add_coccon_autocomplete(new_autocomplete_input);
    });
}
