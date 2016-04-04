// ------------ GETTER FUNCTION ------------

/* Get the list of names from localStorage. If no names are found, return an empty Array.
   If names are found, parse them from JSON and return them. */
function get_persons() {
    var persons = [];
    var persons_str = localStorage.getItem('person');
    if (persons_str !== null) {
        persons = JSON.parse(persons_str);
    }
    return persons;
}

// ------------ ADD PERSON INTO LOCALSTORAGE ------------

/* Adds an entry from input field values. Person is added to the Array and then stringified in the JSON file.
   We then call the show_person() function to show the person that was just saved in the table. */
function add_person() {
    var person_name = document.getElementById('name').value;
    var genderDdl = document.getElementById('gender');
    var person_gender = genderDdl.options[genderDdl.selectedIndex].value;
    var person_age = document.getElementById('age').value;

    var persons = get_persons();

    var person_id = counter.toString(); // This counter creates person IDs.
    counter++;

    persons.push({'id': person_id, 'name': person_name, 'gender': person_gender, 'age': person_age});
    localStorage.setItem('person', JSON.stringify(persons));

    if (document.forms['add-persons'].name.value !== "test_me") { // If Test Mode is on, don't reset form.
        document.getElementById("add-persons").reset();
    }

    show_person();

    return false;
}

// ------------ DISPLAY PERSON IN THE DOCUMENT ------------

/* Shows the persons in the JSON object. Creates a HTML snippet to wrap the person entries into the document.
   Also a remove button is added next to each entry. Each remove button is added an event listener to call the
   confirm_removal() function to remove the entry from the document. */
function show_person() {
    var persons = get_persons();

    var html = '';

    for(var i = 0; i < persons.length; i++) {
        html += '<tr id="tablerow_' + i + '">';
        html += '<td>' + persons[i].name + '</td>';
        html += '<td>' + persons[i].gender + '</td>';
        html += '<td>' + persons[i].age + '</td>';
        html += '<td align="right"><a class="removebutton" id="' + i  + '"><i class="fa fa-times"></i></a></td>';
        html += '</tr>';
    }

    document.getElementById('insert-to-table').innerHTML = html;

    var buttons = document.getElementsByClassName('removebutton');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener('click', confirm_removal);
    }
}

// ------------ REMOVE PERSON FROM THE DOCUMENT ------------

/* Gets the id of the table entry which had its remove button clicked as a parameter.
   Then removes the person from the JSON and it is no longer rendered on the table. */
function remove_person(id) {
    var persons = get_persons();

    persons.splice(id, 1);
    localStorage.setItem('person', JSON.stringify(persons));

    show_person();

    return false;
}

/* Opens a modal dialog box to confirm removal of entry. */
function confirm_removal() {
    $("#dialog-confirm").dialog('open');
}

// ------------ + BUTTON FUNCTIONALITY ------------

/* Add event listener to + button. Calls the validateForms function in validateforms.js.
   If there are no errors, validateforms.js calls add_person();. */
document.getElementById('addbutton').addEventListener('click', validateForms);

/* Initialization for person ID creation. Counter helps with that. */
var person_id = '0';
var counter = 0;

show_person();
