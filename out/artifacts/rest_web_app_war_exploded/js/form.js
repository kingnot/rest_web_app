/*
* This is where the scripts to control form
* Created on Oct. 29, 2018
*/

$(document).ready(function() {
// The root URL for the RESTful services
    var rootURLMessage = "http://localhost:8080/rest_web_app_war_exploded/rest/messages";
    var rootURLUser = "http://localhost:8080/rest_web_app_war_exploded/rest/users"
    /*
    $('#btnSave').click(function () {
        var inputString = $("#msgContent").val();
        if (inputString != '')
            addMessage();
    });
    */
    $('#btnSave').click(function () {
        var inputFirstName = $("#firstName").val();
        var inputLastName = $("#lastName").val();
        var inputEmail = $("#emailAddress").val();
        var inputCity = $("#city").val();
        var inputCountry = $("#country").val();
        if ((inputFirstName != '') && (inputLastName != '') && (inputEmail != '')
            && (inputCity != '') && (inputCountry != ''))
            addUser();
    });

    function addMessage() {
        console.log('addMessage');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURLMessage,
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

    function addUser() {
        console.log('addUser');
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: rootURLUser,
            dataType: "json",
            data: formToJSON(),
            success: function () {
                var inputFirstName = $("#firstName").val();
                var inputLastName = $("#lastName").val();
                var inputEmail = $("#emailAddress").val();
                var inputCity = $("#city").val();
                var inputCountry = $("#country").val();
                $('#message').html("Hi " + inputFirstName + " " + inputLastName + ". "
                    + "Your email address is " + inputEmail + ". " + "You are from "
                    + inputCity + ", " + inputCountry + ".");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#message').html(textStatus);
            }
        });
    }

// Helper function to serialize all the form fields into a JSON string
    function formToJSON() {
        return JSON.stringify({
            'firstName': $('#firstName').val(),
            'lastName': $('#lastName').val(),
            'emailAddress': $('#emailAddress').val(),
            'city': $('#city').val(),
            'country': $('#country').val(),
            'message': $('#msgContent').val()
        });
    }

/*
// Helper function to serialize all the form fields into a JSON string
    function formToJSON() {
        return JSON.stringify({
            'content': $('#msgContent').val()
        });
    }
*/
});