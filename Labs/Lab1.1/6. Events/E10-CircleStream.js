var st = require('../5. Modules/E08-Circle');

console.log("Radius of the circle: ");

// Needed for initiating the reads 
// from stdin.
process.stdin.resume();
// Needed for reading strings.
process.stdin.setEncoding("utf8");

// Implemented as an endless loop.
// Every time we read a radius, its 
// circumference is printed and a new 
// radius is requested.
process.stdin.on("data", function(str) {
  // Remove the trailing endline.
  var rd = str.slice(0,str.length-1);
  console.log("Circumference for radius " + 
    rd + " is " + st.circumference(rd));
  console.log(" ");
  console.log("Radius of the circle: ");
});

process.stdin.on("end", function() {
  console.log("Terminating...");
});
