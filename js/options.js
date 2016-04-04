var ageDdl = document.getElementById('age');
var options = '';

for (i = 1; i <= 100; i++) {
    options += '<option value="' + i + '">' + i + '</option>';

}

ageDdl.innerHTML += options;
