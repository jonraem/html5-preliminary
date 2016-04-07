// ------------ DETERMINE SORTING ------------

/* Called by sorting button. Determines sort method by the button pressed.
   Afterwards sets graphical representation of sorting in the icon. */
function set_sorting() {
    if (this.parentNode.innerHTML.search('Name') !== -1) {
        sort_by_name();
    } else if (this.parentNode.innerHTML.search('Gender') !== -1) {
        sort_by_gender();
    } else if (this.parentNode.innerHTML.search('Age') !== -1) {
        sort_by_age();
    }
    set_active_sorting(this);
    //console.log(sorted);
}

// ------------ DEFAULT SORTING ------------

/* Sort by id. This is the order in which the entries were added in the table. */
function sort_by_id() {
    persons.sort(function(a, b){
        return a.id - b.id;
    });
    sorted = 'id';
    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
}

// ------------ SPECIAL SORTING ------------

/* Sort by name. By default sort in ascending (alphabetical) order. If already
   in alphabetical order, sort in descending (inverted alphabetical) order. If
   already in descending order, sort by id (order in which entries were added). */
function sort_by_name() {
    if (sorted === 'name_asc') {
        persons.sort(function(a, b){
            return a.name.toLowerCase() < b.name.toLowerCase();
        });
        sorted = 'name_dsc';
    } else if (sorted === 'name_dsc') {
        sort_by_id();
    } else {
        persons.sort(function(a, b){
            return a.name.toLowerCase() > b.name.toLowerCase();
        });
        sorted = 'name_asc';
    }
    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
}

/* Sort by gender. By default sort in ascending (alphabetical) order. If already
   in alphabetical order, sort in descending (inverted alphabetical) order. If
   already in descending order, sort by id (order in which entries were added). */
function sort_by_gender() {
    if (sorted === 'gender_asc') {
        persons.sort(function(a, b){
            return a.name.toLowerCase() > b.name.toLowerCase();
        });
        persons.sort(function(a, b){
            return a.gender < b.gender;
        });
        sorted = 'gender_dsc';
    } else if (sorted === 'gender_dsc') {
        sort_by_id();
    } else {
        persons.sort(function(a, b){
            return a.name.toLowerCase() > b.name.toLowerCase();
        });
        persons.sort(function(a, b){
            return a.gender > b.gender;
        });
        sorted = 'gender_asc';
    }
    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
}

/* Sort by age. By default sort in ascending order. If already in ascending order,
   sort in descending order. If already in descending order, sort by id (order
   in which entries were added). */
function sort_by_age() {
    if (sorted === 'age_asc') {
        persons.sort(function(a, b){
            return parseFloat(a.age) + parseFloat(b.age);
        });
        sorted = 'age_dsc';
    } else if (sorted === 'age_dsc') {
        sort_by_id();
    } else {
        persons.sort(function(a, b){
            return parseFloat(a.age) - parseFloat(b.age);
        });
        sorted = 'age_asc';
    }
    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
}

// ------------ GRAPHICAL REPRESENTATION ------------

/* Display sorting graphically on the table headers based on what sorting type is. First removes
   all 'asc' or 'dsc' definitions from classes, then adds one to the relevant one. */
function set_active_sorting(button_pressed) {
    for (x = 0; x < sortbuttons.length; x++) {
        if (sortbuttons[x].classList.contains('asc')) {
            sortbuttons[x].classList.toggle('asc');
        }
        if (sortbuttons[x].classList.contains('dsc')) {
            sortbuttons[x].classList.toggle('dsc');
        }
    }

    if (sorted === 'name_asc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Name') !== -1) {
                button_pressed.classList.add('asc');
            }
        }
    } else if (sorted === 'name_dsc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Name') !== -1) {
                button_pressed.classList.add('dsc');
            }
        }
    } else if (sorted === 'gender_asc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Gender') !== -1) {
                button_pressed.classList.add('asc');
            }
        }
    } else if (sorted === 'gender_dsc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Gender') !== -1) {
                button_pressed.classList.add('dsc');
            }
        }
    } else if (sorted === 'age_asc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Age') !== -1) {
                button_pressed.classList.add('asc');
            }
        }
    } else if (sorted === 'age_dsc') {
        for (x = 0; x < sortbuttons.length; x++) {
            if (sortbuttons[x].parentNode.innerHTML.search('Age') !== -1) {
                button_pressed.classList.add('dsc');
            }
        }
    }
}

// ------------ VARIABLES AND SETTINGS ------------

var sortbuttons = document.getElementsByClassName('sort_icon');
for (x = 0; x < sortbuttons.length; x++) {
    sortbuttons[x].addEventListener('click', set_sorting);
}

var sorted = 'id';
