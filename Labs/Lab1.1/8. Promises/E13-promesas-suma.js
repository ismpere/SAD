var Q = require("q");


// fbind() generates a function B that eventually

// executes the function received as parameter,

// returning a promise for B.

var eventualAdd = Q.fbind(function(a,b) {

    return a+b;

});


// Prints its argument on screen.

function print(a) {

  console.log("Result: " + a);

}


// p1, p2, p3 and p4 are promises.

var p1 = eventualAdd(1,1);

var p2 = eventualAdd(1,3);

var p3 = eventualAdd(2,5);

var p4 = eventualAdd(3,6);


// Checks whether p1 is still pending.

function message() {

  console.log( "Is p1 still pending? "
   + p1.isPending() );

}



message();

p1.then(print);

message();

p4.then(print);

p3.then(print);

p2.then(print);


console.log("Intermediate message.");


setTimeout( message, 100 );

