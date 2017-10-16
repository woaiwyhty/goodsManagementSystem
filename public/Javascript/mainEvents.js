/**
 * Created by dell on 2017/10/12.
 */
var messagesArr = ['Successful!'];
$(document).ready(function() {
    var username = $('input.Username'), password = $('input.Password'),
        divisionName = $('input.divisionName');
    var allFields = $([]).add(username).add(password).add(divisionName);

    var newUserForm = $('div.newUserForm'),
        newDivisionForm = $('div.newDivisionForm'),
        newStockForm = $('div.newStorageForm');
    var formFields = $([]).add(newUserForm).add(newDivisionForm).add(newStockForm);
    var nowPage;
    $( "#dialog-form" ).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Create": function() {
                if(typeof nowPage == undefined) {
                    $( this ).dialog( "close" );
                } else {
                    if(nowPage == 0) {
                        $.post('/newUser', {
                            username: username.val(), password: password.val(),
                            department: $('select.department').find("option:selected").text(), role: $('select.Authority').val()
                        }, function(res) {
                            //alert(messagesArr[res.retCode]);
                            window.location.reload();
                        })
                    } else if(nowPage == 1) {
                        $.post('/newDivision', {
                            name: divisionName.val()
                        }, function(res) {
                            //alert(messagesArr[res.retCode]);
                            window.location.reload();
                        })
                    }
                }
                $( this ).dialog( "close" );
            },

            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val('');
        }
    });





    $('a.addUser').click(function() {
        $('#dialog-form').dialog('open').dialog('option', 'title', 'New User');
        formFields.hide();
        $('div.newUserForm').show();
        //$('div.newDivisionForm').hide();
        nowPage = 0;

    });
    $('a.removeUser').click(function() {
        var id = $(this).attr('id');
        var username = $('.Userslist tr:eq(' + id + ') td:eq(1)').text();
        $.post('/removeUser', { username: username}, function(res) {
            //alert(messagesArr[res.retCode]);
            window.location.reload();
        })
    });
    $('a.updateUser').click(function() {

    });
    $('div.addDivision').click(function() {
        //$('#dialog-form-new-division').dialog('open');
        $('#dialog-form').dialog('open').dialog('option', 'title', 'New Division');
        formFields.hide();
        newDivisionForm.show();
        nowPage = 1;
    });
    $('div.addStock').click(function() {
        $('#dialog-form').dialog('open').dialog('option', 'title', 'New Stock');
        formFields.hide();
        newStockForm.show();
        nowPage = 2;
    })
});

