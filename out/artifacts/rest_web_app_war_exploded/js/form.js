/*
* This is where the scripts to control form
* Created on Oct. 29, 2018
*/
$(document).ready(function() {
    $('#submitbutton').click(function(){
        var inputString = $("input#simpleinput").val();
        $.ajax({
            type: "GET",
            url: "/",
            data: inputString,
            success: function() {
                $('#message').html(inputString);
            },
            error: function (e) {
                $('#message').html(e);
            }
        });
    });
});