/* Validate form inputs. If one or more input fields are empty, send alert message.
   Otherwise add a new person with the input field parameters. */
function validateForms() {
    validateName();
    validateGender();
    validateAge();
    if (error) {
        alert("One or more input fields are empty!");
        error = false;
    } else {
        add_person();
    }
}

/* Validate the person's name. If the person's name is empty, set error variable to "true".
   If person's name is "test_me", set test_mode variable to "true". In Test Mode, you can
   quickly add new entries without form validation. */
function validateName() {
    var x = document.forms['add-persons'].name.value;
    if (x === "test_me") {
        test_mode = true;
    } else if (x === null || x === "") {
        error = true;
        return false;
    } else {
        test_mode = false;
    }
}

/* Validate the person's gender. If the person's gender not selected, set error variable to "true".
   If Test Mode is on, ignore this validation. */
function validateGender() {
    var x = document.forms['add-persons'].gender.value;
    if ((x === null || x === "") && !test_mode) {
        error = true;
        return false;
    }
}

/* Validate the person's age. If the person's age is not selected, set error variable to "true".
   If Test Mode is on, ignore this validation. */
function validateAge() {
    var x = document.forms['add-persons'].age.value;
    if ((x === null || x === "") && !test_mode) {
        error = true;
        return false;
    }
}

var error = false,
    test_mode = false;
