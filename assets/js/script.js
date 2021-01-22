/*
// UTILITIES:
    API key weatherapp = "6ee75339838f57228cbda7f75505c443"
    API key Default= "f9994fb5e34a2dcdfcbb911a1360f838"

// Elements tracked:
    <button id="search">
    <div id="resultCard">
    <div id="populateResult">

*/

$(document).ready(function () {

    function getResult(event) {
        event.preventDefault();

        $('#populateResult').empty();

        var searchCity = $('input').val();
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=6ee75339838f57228cbda7f75505c443",
            type: "GET",
        }).done(function(data){
            console.log(data);
        })
        /*
            .then(function (response) {
                console.log(response);

                for (let i = 0; i < response.results.length; i++) {
                }


            }) */
    }

    $('#search').on('click', getResult)

});