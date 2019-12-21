var Q = require("q");

// Version with "spread()".
function eventualAdd(a,b) {
    return Q.spread([a,b], function (a,b) {
	return a+b;
    } );
}


// Version with "defer()".
/*
function eventualAdd(a,b) {
  var deferred = Q.defer();

  deferred.resolve(a+b);
  return deferred.promise;
}
*/

function print(a) {
  console.log("Result: " + a);
}

var p1 = eventualAdd(1,1);
var p2 = eventualAdd(1,3);
var p3 = eventualAdd(2,5);
var p4 = eventualAdd(3,6);

function message() {
  console.log( "Is p1 still pending? " + p1.isPending() );
}

message();
p1.then(print);
message();
p4.then(print);
p3.then(print);
p2.then(print);

console.log("Intermediate message.");

setTimeout( message, 100 );

