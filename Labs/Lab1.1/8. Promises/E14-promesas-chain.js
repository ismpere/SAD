var Q = require("q");



var eventualAdd = Q.fbind(function(a,b) {

    return a+b;

});


// Prints its argument on screen.

// Returns also the printed argument.
function print(a) {

  console.log("Result: " + a);

  return a;
}



// Prints the square of its argument.
// Returns also that result.
function print2(a) {
  var i = a*a;
  console.log("The square of " + a +
    " is " + i);
  return i;
}

// p1 and p2 are promises.

var p1 = eventualAdd(2,1);

var p2 = eventualAdd(1,6);


p1.then(print).then(print2);

p2.then(print2).then(print);




console.log("A message. When is it printed??");


