// ------------ GETTER FUNCTION ------------

/* Get the list of names from localStorage. If no names are found, return an empty Array.
   If names are found, parse them from JSON and return them. */
function get_persons() {
    var persons_array = [];
    var persons_str = localStorage.getItem('person');
    if (persons_str !== null) {
        persons_array = JSON.parse(persons_str);
    }
    return persons_array;
}

// ------------ ADD PERSON ------------

/* Adds an entry from input field values. Person is added to the Array and then stringified in the JSON file.
   We then call the render_entries() function to show the person that was just saved in the table. */
function add_person() {
    var person_name = document.getElementById('name').value,
        genderDdl = document.getElementById('gender'),
        person_gender = genderDdl.options[genderDdl.selectedIndex].value,
        person_age = document.getElementById('age').value;

    person_id = counter; // This counter creates person IDs.
    counter++;

    persons.push({
        'id': person_id,
        'name': person_name,
        'gender': person_gender,
        'age': person_age
    });
    localStorage.setItem('person', JSON.stringify(persons));

    if (document.forms['add-persons'].name.value !== "test_me") { // If Test Mode is on, don't reset form.
        document.getElementById("add-persons").reset();
    }

    render_entries(pagenumber);

    return false;
}


// ------------ ID INITIALIZATION ------------

/* Initialize the id for person. This also makes sure the person ids are always from 0 to x. */
function initialize_id(){
    for (i = 0; i < persons.length; i++) {
        persons[i].id = i;
    }
}

// ------------ REMOVE PERSON ------------

/* Gets the id of the table entry which had its remove button clicked as a parameter.
   Then removes the person from the JSON and it is no longer rendered on the table.
   If the person was the last one on the page, change the page to the one on the left
   (current pagenumber - 1). Otherwise render table normally on current pagenumber. */
function remove_person(id) {
    persons.splice(id, 1);
    localStorage.setItem('person', JSON.stringify(persons));

    if (document.getElementById('insert-to-table').childNodes.length === 1 && persons.length !== 0) {
        change_page(pagenumber - 1);
    } else {
        render_entries(pagenumber);
    }
    initialize_id();

    return false;
}

/* Opens a modal dialog box to confirm removal of entry. If entry has the name
   "test_me", remove entry without modal dialog. */
function confirm_removal() {
    if (this.parentNode.parentNode.childNodes[0].innerHTML === "test_me") {
        remove_person(this.id); // Gets the id of the button clicked, which is the same as the person's index.
    } else {
        $("#dialog-confirm").dialog('open');
    }
}

// ------------ DISPLAY PERSONS ------------

/* Shows the persons in the JSON object. Creates a HTML snippet to wrap the person entries into
   the document. Shows at most 7 entries on the page that is passed as a parameter (pagenumber).
   Also a remove button is added next to each entry. Each remove button is added an event listener
   to call the confirm_removal() function to remove the entry from the document. Pagebuttons are
   displayed on the bottom of the page.*/
function render_entries(pagenumber) {
    persons_on_page = paginate(persons);

    var html = '';

    if (persons.length !== 0) {
        for (var i = 0; i < persons_on_page[pagenumber].length; i++) {
            html += '<tr id="tablerow_' + i + '">';
            html += '<td>' + persons_on_page[pagenumber][i].name + '</td>';
            html += '<td>' + persons_on_page[pagenumber][i].gender + '</td>';
            html += '<td>' + persons_on_page[pagenumber][i].age + '</td>';
            html += '<td align="right"><a class="removebutton" id="' + (i + pagenumber * 7) + '"><i class="fa fa-times"></i></a></td>';
            html += '</tr>';
        }
    }
    document.getElementById('insert-to-table').innerHTML = html;

    var removebuttons = document.getElementsByClassName('removebutton');
    for (var j = 0; j < removebuttons.length; j++) {
        removebuttons[j].addEventListener('click', confirm_removal);
    }

    if (persons.length !== 0) { // Display pagebuttons and set one of them active based on current pagenumber.
        display_pagebuttons(section);
        set_active_page(pagenumber);
    }
}

// ------------ + BUTTON FUNCTIONALITY ------------

/* Add event listener to + button. Calls the validateForms function in validateforms.js.
   If there are no errors, validateforms.js calls add_person();. */
document.getElementById('addbutton').addEventListener('click', validateForms);

/* Add event listener to add-persons form. Now when enter key (keycode 13) is pressed,
   it acts as if the + button was pressed. Makes things easier. */
document.getElementById('add-persons').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) { validateForms(); }
});

// ------------ VARIABLES AND SETTINGS ------------

/* Initialization for person ID creation. Counter helps with that. */
var person_id = '0',
    counter = 0;

var pagenumber = 0,
    section = 0;

var persons = get_persons();

render_entries(pagenumber);
