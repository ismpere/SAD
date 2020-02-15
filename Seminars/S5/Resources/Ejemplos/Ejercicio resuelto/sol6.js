// Reading a file and make a HTTP request with promises
var fs =require('fs');
var q=require('q');
var req = require('request');


q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
	return q.nfcall(req.post,data);
   }).then(function(response) {
   		console.log('la respuesta es: ',response);
   }).fail(function(err){
		console.log('Se produjo una excepción:',err);
   });
