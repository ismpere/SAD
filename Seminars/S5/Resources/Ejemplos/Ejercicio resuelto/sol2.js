// Reading a file with promises
var fs =require('fs');
var q=require('q');

var p = q.nfcall(fs.readFile,'file.txt','utf-8');

p.then(function(data){
	console.log(data);
   }, function(err){
   	// If the file doesn't exists for example
	console.log('Se ha producido una excepción', err);
});

