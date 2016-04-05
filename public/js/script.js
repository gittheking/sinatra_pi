"use strict";

$(document).ready(function() {

  var $body = $('body');
  var $clock = $('.clock');
  var $line456 = $('.ss6');
  var $linel = $('.ssl');
  var $linebdfm = $('.ssf');
  var $currentTemp = $('.current-temp');
  var $weatherIcon = $('.weather-icon');
  var $feelsLike = $('.feels-like');

  var getTrainsStatus = function() {
    $.ajax({
      url: '/trains',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $line456.text(data.train_456.status);
        $linel.text(data.train_l.status);
        $linebdfm.text(data.train_bdfm.status);
      }
    });
  };

  var getWeather = function() {
    $.ajax({
      url: '/weather',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $currentTemp.text("Current Temperature: " + data.current_temp + "°F");
        $feelsLike.text("Feels like: " + data.wind_chill + "°F");
        $('.weather-icon').attr('src',data.icon_url);
        $('.weather-description').text(data.description);
      }
    });
  };

  var getTime = function() {
    var date = new Date();
    var minutes = String(date.getMinutes());
    var hours = date.getHours();
    if(minutes.length == 1) {
      minutes = '0' + minutes;
    }
    if(hours > 12) {
      hours = hours - 12;
    }
    $clock.text(hours + ':' + minutes);
  };

  window.setInterval(getTrainsStatus,20000);
  window.setInterval(getWeather,20000);
  window.setInterval(getTime,1000);
});