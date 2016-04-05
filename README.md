Nord Software HTML5 Preliminary Test
-
Author: Joni Rämö

About
-
There are some custom changes in the library and framework source files:
* Custom change in _tables.scss (padding-left).
* Custom changes in _pagination.scss.
* Custom changes in scss/_customVariables.scss.
* Custom changes in jquery-ui.css.

Technologies used:
* Bootstrap
* jQuery
* jQuery UI
* SCSS

Instructions
-
* Installation should require no effort. Just download the ZIP and open index.html.
* Table entries are saved into localStorage as JSON, so no virtual servers are required.
* Write "test_me" into the name field to enable Test Mode:
 * Test Mode allows you to add new entries without form validation and remove these entries without the modal dialog box. Entries without "test_me" in the name field are still removed with a modal dialog box.

Status
-
There are still a few things missing from the perfect version.
* Sorting of table entries by name, gender or age.
* Enhanced responsivity. Responsive modal dialog box.
* Code refactoring. Optimization.
