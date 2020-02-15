// Reading a file with promises
var fs =require('fs');
var q=require('q');

// in rhis sentence we define and use the promise
q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
	console.log(data);
   }).fail(function(err){
	console.log('Se produjo una excepción:',err);
   });

