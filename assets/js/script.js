/*

// UTILITIES:
    API key weatherapp = "6ee75339838f57228cbda7f75505c443"
    API key Default= "f9994fb5e34a2dcdfcbb911a1360f838"

// For eventually calling with lon/lat data from searchCity return:
    https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    coord.lon
    coord.lat

// Elements tracked:
    <button id="search"> | #search
    <div id="resultCard"> | #resultCard
    <div id="populateResult"> | #populateResult

*/

$(document).ready(function () {

    function getResult(event) {
        event.preventDefault();

        $('#populateResult').empty();

        var searchCity = $('input').val();
        

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=6ee75339838f57228cbda7f75505c443",
            type: "GET",
        }).then(function (response) {
                console.log(response);

                var results = response;
                var name = results.name;
                var temperature = results.main.temp;
                var humidity = results.main.humidity;
                var windSpeed = results.wind.speed;
                var date = moment().format('L');
                var weatherIcon = results.weather[0].icon;
                var cardImage = $('<img>').attr({ 'src': 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png', 'alt': 'condition icon' });
                


                $('<h3>').attr('id', 'cardTitle').text(name).appendTo('#populateResult');
                $('<h6>').attr('id', 'day').text(date).appendTo('#cardTitle');
                $(cardImage).appendTo('#populateResult');
                $('<hr>').appendTo('#populateResult');
                $('<p>').attr('class', 'cardData').text('Temperature: ' + temperature + '°F').appendTo('#populateResult');
                $('<p>').attr('class', 'cardData').text('Humidity: ' + humidity + '%').appendTo('#populateResult');
                $('<p>').attr('class', 'cardData').text('Wind Speed: ' + windSpeed + 'mph').appendTo('#populateResult');




                var lat = response.coord.lat;
                var lon = response.coord.lon;

                
                  

            })

    }

    $('#search').on('click', getResult)



});
