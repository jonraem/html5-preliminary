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
    console.log(sorted);

    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
    for (i=0;i<persons.length;i++){
        console.log(persons[i].id);
    }
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
console.log(sorted);
for (i=0;i<persons.length;i++){
    console.log(persons[i].id);
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
console.log(sorted);
for (i=0;i<persons.length;i++){
    console.log(persons[i].id);
}
    localStorage.setItem('person', JSON.stringify(persons));
    render_entries(pagenumber);
}

var sorted = 'id';
