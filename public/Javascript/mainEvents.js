/**
 * Created by dell on 2017/10/12.
 */
var messagesArr = ['操作成功'];
$(document).ready(function() {
    $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 350,
        width: 350,
        modal: true,
        buttons: {
            "create a user": function() {
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
    });
    $('a.addUser').click(function() {
        alert('addUser clicked');
        $('#dialog-form').dialog('open');
    });
    $('a.removeUser').click(function() {
        var id = $(this).attr('id');
        var username = $('.Userslist tr:eq(' + id + ') td:eq(1)').text();
        $.post('/removeUser', { username: username}, function(res) {
            alert(messagesArr[res.retCode]);
            window.location.reload();
        })
    })
});

