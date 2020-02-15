// Module version 2
// Reading a file and make a HTTP request with promises in a function that returns a promise
// if the first request fails then it will made another and on
var fs =require('fs');
var q=require('q');
var req = require('request');

function logReq(file) {

	return q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
		    console.log('intento 1');
			return q.nfcall(req.post,data).fail(function(err) {
				console.log('Se ha producido un error',err);
				console.log('intento 2');
				return q.nfcall(req.post,data).fail(function(err) {
					console.log('Se ha producido un error',err);
					console.log('intento 3');
					return q.nfcall(req.post,data).fail(function(err) {
						// el ultimo produjo un error, pero lo 'limpiamos aqui'
						return 'limpito';
					});
				});
			});
   	})
	
}


exports.logReq = logReq;