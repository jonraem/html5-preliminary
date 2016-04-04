$(function() {
    $('#dialog-confirm').dialog({
        resizable: false,
        autoOpen: false,
        width: 650,
        modal: true,
        buttons: {
            CANCEL: function() {
                $(this).dialog('close');
            },
            YES: function() {
                remove_person($(this).data('button_id'));
                $(this).dialog('close');
            }
        },
        open: function() {
            $('.ui-dialog-buttonpane').find('button:contains("YES")').addClass('yesButtonClass');
        }
    });
    $('#insert-to-table').on ('click', '.removebutton', function() {
        $('#dialog-confirm').data('button_id', this.id).dialog('open'); // Pass remove button id to dialog box
    });
});
