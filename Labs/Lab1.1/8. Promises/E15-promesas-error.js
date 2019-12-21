var Q = require("q");



var evDivide = Q.fbind(function(a,b) {

    var i=a/b;

    if (b==0) throw new Error("Divide by zero!!");
    return i;
});


// Prints its argument on screen.

// Returns also the printed argument.
function print(a) {

  console.log("Result: " + a);

  return a;
}



// Rejection handler.
function onError(a) {
  console.log("Exception raised: " + a);
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

var p1 = evDivide(2,1);

var p2 = evDivide(6,0);


p1.then(print).then(print2);

p2.then(print2).then(print,onError);




console.log("A message. When is it printed??");


