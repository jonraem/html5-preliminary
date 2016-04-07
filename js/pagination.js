// ------------ PAGINATION ------------

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

/* Restrict the amount of page buttons on the screen. Divides the pages into
   sections of 4. */
function paginate_pagenumbers(pagenumbers) {
    sections = [];

    for (j = 0; j < pagenumbers.length; j += pagebuttons) {
        sections.push(pagenumbers.slice(j, pagebuttons + j));
    }
    //console.log(sections);
    return sections;
}

// ------------ DISPLAY PAGINATION ------------

/* Iterate through the list of pages and for each page create a pagebutton element.
   Then add an event listener to each pagebutton to call the change_page_with_button() method. */
function display_pagebuttons(page_section) {
    var sections = paginate_pagenumbers(pages);

    var html = '';

    if (page_section > 0) { // If pagenumber is bigger than the amount of pagebuttons, we're on another section
        html += '<li><a class="sectionbutton" id="change_section_left">...</a></li>';
    }
    for (l = 0; l < sections[page_section].length; l++) { // Render pagebuttons (4 per section)
        html += '<li><a class="pagebutton" id="' + (l + page_section * 4) + '">' + (l + 1 + page_section * 4) + '</a></li>';
    }
    if (sections.length > 1 && (sections.length - 1) !== page_section) { // If there are more sections than one, add sectionbutton
        html += '<li><a class="sectionbutton" id="change_section_right">...</a></li>';
    }

    document.getElementById('pagination-numbers').innerHTML = html;

    var pagebuttons = document.getElementsByClassName('pagebutton');
    for (k = 0; k < pagebuttons.length; k++) {
        pagebuttons[k].addEventListener('click', change_page_with_button);
    }

    if (document.getElementsByClassName('sectionbutton') !== null) {
        var sectionbuttons = document.getElementsByClassName('sectionbutton');
        for (l = 0; l < sectionbuttons.length; l++) {
            sectionbuttons[l].addEventListener('click', change_section);
        }
    }
}

// ------------ CHANGE PAGE ------------

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

    for (j = 0; j < numbers.childNodes.length; j++) { // Remove active classes from all li elements
        numbers.childNodes[j].classList.remove('active');
    }
    for (x = 0; x < numbers.childNodes.length; x++) { // Set active page to page with id determined by method argument
        if (numbers.childNodes[x].childNodes[0].getAttribute('id') === number.toString()) {
            numbers.childNodes[x].classList.add('active');
        }
    }
}

/* Changes the section to right or left, depending on button pressed. When you are at
   section 1-4, pressing change_section_right means moving to section 5-8 (if those pages exist). */
function change_section() {
    if (this.id === 'change_section_left') {
        section -= 1;
    } else if (this.id === 'change_section_right') {
        section += 1;
    }
    display_pagebuttons(section);
}

/* When changing the active page with pagebuttons, use the button's id. */
function change_page_with_button() {
    change_page(this.id);
}

// ------------ VARIABLES AND SETTINGS ------------

var pages = [],
    pagesize = 7,
    pagebuttons = 4;
