let workout_class = '.event_workouts_exercise_name';

$(document).ready(init_exercise_autocomplete);


$(workout_class).on('cocoon:after-insert', function(e, insertedItem) {
    breakpoint
});

function init_exercise_autocomplete(){
    var ex_name_search_el = $(workout_class + ' input'); //attach to input child
    ex_name_search_el.autocomplete({
        source: ex_name_search_el.data('autocomplete-source')
    });
}