/* Iterate through the persons Array, slicing and pushing entry values
   into a pages Array. This creates the page structure. Pages Array is
   emptied every time the function is called to avoid stacking. */
function paginate(persons) {
    pages = [];

    for (i = 0; i < persons.length; i += pagesize) {
        pages.push(persons.slice(i, pagesize + i));
    }
    //console.log(pages);
    return pages;
}

/* Change the page to the one determined by the method argument by first setting
   active page in pagination and then show the persons on the requested page. */
function change_page(number) {
    pagenumber = number;
    set_active_page(pagenumber);
    render_entries(pagenumber);
}

/* Gets the ul element with the id "pagination-numbers" from the document. It then iterates
   through all of its child nodes removing the "active" class and reapplying it to the
   child node in the index determined by the method argument. */
function set_active_page(number) {
    var numbers = document.getElementById('pagination-numbers');

    for (j = 0; j < numbers.childNodes.length; j++) {
        numbers.childNodes[j].classList.remove('active');
    }

    numbers.childNodes[number].classList.add('active');
}

/* Iterate through the list of pages and for each page create a pagebutton element.
   Then add an event listener to each pagebutton to call the change_page_with_button() method. */
function display_pagebuttons() {
    var html = '';

    for (l = 0; l < pages.length; l++) {
        html += '<li><a class="pagebutton" id="' + l + '">' + (l + 1) + '</a></li>';
    }

    document.getElementById('pagination-numbers').innerHTML = html;

    var pagebuttons = document.getElementsByClassName('pagebutton');
    for (k = 0; k < pagebuttons.length; k++) {
        pagebuttons[k].addEventListener('click', change_page_with_button);
    }
}

/* When changing the active page with pagebuttons, use the button's id. */
function change_page_with_button() {
    change_page(this.id);
}

var pages = [],
    pagesize = 7;
