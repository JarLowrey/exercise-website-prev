var ex_name_search_el = $('.event_workouts_exercise_name input')
ex_name_search_el.autocomplete({
    source:ex_name_search_el.data('autocomplete-source')
});