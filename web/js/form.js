/*
* This is where the scripts to control form
* Created on Oct. 29, 2018
*/

$(document).ready(function() {
// The root URL for the RESTful services
    var rootURL = "http://localhost:8080/rest_web_app_war_exploded/rest/messages";

    $('#btnSave').click(function () {
        var inputString = $("#msgContent").val();
        if (inputString != '')
            addMessage();
    });

    function addMessage() {
        console.log('addMessage');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURL,
            dataType: "json",
            data: formToJSON(),
            success: function () {
                var inputString = $("#msgContent").val();
                $('#message').html(inputString);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#message').html(textStatus);
            }
        });
    }

// Helper function to serialize all the form fields into a JSON string
    function formToJSON() {
        return JSON.stringify({
            'content': $('#msgContent').val()
        });
    }

});