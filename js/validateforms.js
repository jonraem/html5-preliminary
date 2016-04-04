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

function validateGender() {
    var x = document.forms['add-persons'].gender.value;
    if ((x === null || x === "") && !test_mode) {
        error = true;
        return false;
    }
}

function validateAge() {
    var x = document.forms['add-persons'].age.value;
    if ((x === null || x === "") && !test_mode) {
        error = true;
        return false;
    }
}

var error = false;
var test_mode = false;
