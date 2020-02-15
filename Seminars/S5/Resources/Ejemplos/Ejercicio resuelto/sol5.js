// Reading a file and make a HTTP request with promises
var fs =require('fs');
var fs =require('fs');
var q=require('q');
var req = require('request');


q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){

	// the next asynchronous task is a request with the contents of the file
	// but the callback does its job in a diferent sequence
	req.post(data,function(err,response,body) {
		if(err) throw err;
		console.log(response);
		return response;
	})
   }).then(function(response) {
   		console.log('la respuesta es: ',response);
   }).fail(function(err){
		console.log('Se produjo una excepción:',err);
   });
