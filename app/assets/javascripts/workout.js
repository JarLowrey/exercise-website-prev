let exercise_name_input = '.event_workouts_exercise_name input';

$(document).ready(function () {
    init_exercise_autocomplete();

    $('#workout-fields').on('cocoon:after-insert', function (e, insertedItem) {
        let new_search_input = insertedItem.find(exercise_name_input)
        init_exercise_autocomplete(new_search_input);
    });
});

function init_exercise_autocomplete(input_el = $(exercise_name_input)) {
    input_el.autocomplete({
        source: input_el.data('autocomplete-source')
    });
}