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

  var getTheTime = function() {
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

  var getBackground = function() {
    $.ajax({
      url: '/background',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        var randomImage = data[Math.floor(Math.random()*data.length)];
        $body.css('background', 'url(' + randomImage + ')');
        $body.css('background-size', 'cover');
        $body.css('background-repeat', 'no-repeat');
        // $body.css('background-position', 'center');
      }
    });
  };

  getBackground();
  getTheTime();
  getWeather();
  getTrainsStatus();
  window.setInterval(getTrainsStatus,200000);
  window.setInterval(getWeather,200000);
  window.setInterval(getTheTime,10000);
  window.setInterval(getBackground(),60000);
});