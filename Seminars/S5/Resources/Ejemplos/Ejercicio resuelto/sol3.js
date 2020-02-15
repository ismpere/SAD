// Reading a file with promises
var fs =require('fs');
var q=require('q');

var p = q.nfcall(fs.readFile,'file.txt','utf-8');

p.then(function(data){
	console.log(data);
	throw new Error('eat this');
   }).fail(function(err){
   	// If the file doesn't exists for example. But also if a new exception is thrown in a then section
	console.log('Se produjo una excepción:',err);
   });

