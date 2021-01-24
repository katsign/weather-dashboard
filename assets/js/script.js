$(document).ready(function () {
  var history = JSON.parse(localStorage.getItem('history')) || [];
  function getResult(searchCity) {
    $('#populateResult').empty();
    // Calls to OpenWeatherMap, logs response and builds card elements in html
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&units=imperial&appid=6ee75339838f57228cbda7f75505c443',
      type: 'GET',
    }).then(function (response) {
      console.log(response);
      // Sets up saved search history functionality
      if (history.indexOf(searchCity) ===-1) {
        history.push(response.name);
        localStorage.setItem('history', JSON.stringify(history));
        makeRow(response.name);
      }
      var results = response;
      var name = results.name;
      var temperature = results.main.temp;
      var humidity = results.main.humidity;
      var windSpeed = results.wind.speed;
      var date = moment().format('L');
      var weatherIcon = results.weather[0].icon;
      var cardImage = $('<img>').attr({ 'src': 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png', 'alt': 'condition icon' });
      $('<h2>').attr('id', 'cardTitle').text(name).appendTo('#populateResult');
      $('<h6>').attr('id', 'day').text(date).attr('class','label').appendTo('#cardTitle');
      $(cardImage).appendTo('#populateResult');
      $('<hr>').appendTo('#populateResult');
      $('<p>').attr('class', 'cardData').text('Temperature: ' + temperature + '°F').appendTo('#populateResult');
      $('<p>').attr('class', 'cardData').text('Humidity: ' + humidity + '%').appendTo('#populateResult');
      $('<p>').attr('class', 'cardData').attr('id', 'wsAnchor').text('Wind Speed: ' + windSpeed + 'mph').appendTo('#populateResult');

      // Sets up key and next call to OpenWeatherMap
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial' + '&appid=f9994fb5e34a2dcdfcbb911a1360f838';

      // Gets UV index reading based on data from initial call and generates badge to display in html
      $.ajax({
        url: forecastURL,
        method: 'GET'
      }).then(function (forecastResponse) {
        console.log(forecastResponse);
        var forecastResults = forecastResponse;
        var uvi = forecastResults.current.uvi
        $('<span>').attr('class', 'new badge').attr('id', 'uvBadge').attr('data-badge-caption', '').text('UV Index: ' + uvi).appendTo('#wsAnchor');

        // Conditions for changing the color of the UV index badge
        if (uvi < 3) {
          $('#uvBadge').css('background-color', 'darkseagreen');
        } else if (uvi < 6) {
          $('#uvBadge').css('background-color', 'goldenrod');
        } else if (uvi < 8) {
          $('#uvBadge').css('background-color', 'coral');
        } else if (uvi < 15) {
          $('#uvBadge').css('background-color', 'crimson');
        } else {
          $('uvBadge').css('background-color', 'linen');
        }

        //Creates the Daily Forecast blurbs
        $('#Forecast').empty();
        for (var i = 1; i < 6; i++) {
          var forecastCard = $('<div>').attr('id', 'forecastCard').attr('class', 'col s2 m1 l1');
          var readableDate = new Date(forecastResults.daily[i].dt * 1000).toLocaleDateString("en-US");
          var dailyIcon = forecastResults.daily[i].weather[0].icon;
          var icon = $('<img>').attr({ 'src': 'http://openweathermap.org/img/wn/' + dailyIcon + '@2x.png', 'alt': 'condition icon' });
          var dailyTemp = forecastResults.daily[i].temp.max;
          var dailyHumidity = forecastResults.daily[i].humidity;
          $(forecastCard).appendTo('#displayForecast');
          $('<label>').attr('class', 'forecastData').text(readableDate).appendTo(forecastCard);
          $(icon).attr('class', 'forecastDat').appendTo(forecastCard);
          $('<p>').attr('class', 'forecastData').text('Temperature: ' + dailyTemp + '°F').appendTo(forecastCard);
          $('<p>').attr('class', 'forecastData').text('Humidity: ' + dailyHumidity + '%').appendTo(forecastCard);
        };
      });
    });
  };

  // Populates Search History
  function makeRow(text) {
    var li = $('<button>').attr({'class':'waves-effect blue-grey lighten-1 btn-small','id':'past-search','type':'button'}).text(text);
    var br = $('<br>');
    $('#history').prepend(li, br);
  };
  $(document).on('click', '#past-search', function(event){
    event.preventDefault();
    getResult($(this).text());
  })
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      makeRow(history[i]);
    };
    getResult(history[history.length - 1]);
  };
  $('#search').on('click', function (event) {
    event.preventDefault();
    var searchCity = $('input').val();
    getResult(searchCity);
  }
);
 
  // Clear History Button
  $('#clearHistory').on('click', function(event){
    localStorage.clear();
    location.reload();
})
});