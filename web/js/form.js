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

// Function to save the user's form inputs as Json and send to Java User class
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
                $('#message').html("Hi, " + inputFirstName + " " + inputLastName + ". "
                    + "Your email address is " + inputEmail + ". " + "You are from "
                    + inputCity + ", " + inputCountry + ".");
                cityToLatLng(inputCity, inputCountry)
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

// Function to return Latitude and Longitude from city and country by using Google Geocode API
    function cityToLatLng(city, country) {
        var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=AIzaSyDh2B_89m0UN1CsHzeGaCYuRGQdD8u1H1I`
        fetch(geocodeUrl).then(response => {
            return response.json()
        }).then(data => {
            if(data.status == 'OK') {
                var lat = data.results[0].geometry.location.lat
                var lng = data.results[0].geometry.location.lng
                $('#coordinates').html("Your city's coordinates: Latitude(" + lat +") Longitude(" + lng + ")")
                getWeather(lat, lng)
            }
            else {
                $('#coordinates').html("Sorry, we are not able to find your city. Please double check if your input is correct.")
            }
        }).catch(err => {console.log(err)})
    }

// Function to return current weather and temperature Latitude and Longitude by using Open Weather Map API
    function getWeather(lat, lng) {
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=172c823ecb710320d9fe119152e941a8`
        fetch(weatherUrl).then(response => {
            return response.json()
        }).then(data => {
            if(data.cod == '200') {
                var weather = data.weather[0].main
                var temperature = data.main.temp
                $('#weather').html("Current weather is " + weather + ", temperature is " + temperature + " degree Celsius")
            }
            else {
                $('#weather').html("Sorry, the current weather is not available.")
            }
        }).catch(err => {console.log(err)})
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