// Module version 4
// Reading a file and make a HTTP request with promises in a function that returns a promise
// if the first request fails then it will made another and so on

// in this version chained promises are used
var fs =require('fs');
var q=require('q');
var req = require('request');

function logReq(file) {

	return q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
				console.log('intento 1');
				return q.nfcall(req.post,data)})
			.then(httpcontent => { return httpcontent})
			.fail(err => { 
				console.log('Se ha producido un error',err);
				console.log('intento 2');
				return q.nfcall(req.post,data)})
			.then(httpcontent => { return httpcontent})
			.fail(err => {
				console.log('Se ha producido un error',err);
				console.log('intento 3');
				return q.nfcall(req.post,data)})
			.then(httpcontent => { return httpcontent})
				
		
}



exports.logReq = logReq;
