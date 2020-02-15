var sonoff = require('./sonoff.js')();
var wifi= require('wifi-control');

sonoff.init();
console.log('llego por aui');
//sonoff.pair('nose','Fiona','chichomanteca');

//wifi.connectToAP( {ssid: 'Fiona', password: "chichomanteca"}, function(err,response) {
//          console.log('conectado de nuevo a fiona');
//        });
console.log(sonoff._knownDevices);
//var action = false;
//var int1 = setInterval(function() {sonoff.powerState({id:'100013e8c0'},action); action = !action;},10000);
//setTimeout(function() {clearInterval(int1);},50000);