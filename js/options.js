/* Create a list from 1 to 100 for the 'age' dropdown list. */
var ageDdl = document.getElementById('age'),
    options = '';

for (i = 1; i <= 100; i++) {
    options += '<option value="' + i + '">' + i + '</option>';

}

ageDdl.innerHTML += options;
