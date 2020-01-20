var ev = require('events');
var emitter = new ev.EventEmitter;
// Names of the events.
var e1 = "print";
var e2 = "read";
// Auxiliary variables.
var num1 = 0;
var num2 = 0;

// Listener functions are registered on 
// the event emitter.
emitter.on(e1, function() {
   console.log( "Event " + e1 + " has " + 
     "happened " + ++num1 + " times.")});
emitter.on(e2, function() {
   console.log( "Event " + e2 + " has " +
     "happened " + ++num2 + " times.")});
// There might be more than one listener 
// for the same event.
emitter.on(e1, function() {console.log(
  "Something has been printed!!");});

// Generate the events periodically...
// First event generated every 2 seconds.
setInterval( function() {
    emitter.emit(e1);}, 2000 );
// Second event generated every 3 seconds.
setInterval( function() {
    emitter.emit(e2);}, 3000 );


