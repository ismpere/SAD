// Reading a file and make a HTTP request with promises in a function that returns a promise
// use of Module version 2
var sol = require('./sol10.js');


sol.logReq('file.txt').then(console.log).fail(function(err){ console.log('se ha producido un error',err)});