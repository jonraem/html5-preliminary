/* Create a jQuery UI dialog window to confirm deletion of entry. */
$(function() {
    $('#dialog-confirm').dialog({
        resizable: false,
        autoOpen: false,
        width: 650,
        modal: true,
        responsive: true,
        buttons: {
            CANCEL: function() {
                $(this).dialog('close');
            },
            YES: function() {
                remove_person($(this).data('button_id'));
                $(this).dialog('close');
            }
        },
        open: function() { // When dialog window is opened, customize "YES" button.
            $('.ui-dialog-buttonpane').find('button:contains("YES")').addClass('yesButtonClass');
        }
    });
    $('#insert-to-table').on ('click', '.removebutton', function() { // Pass remove button id to dialog box.
        $('#dialog-confirm').data('button_id', this.id).dialog('open');
    });
});
