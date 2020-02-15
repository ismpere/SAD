// Module version 3: INCORRECT
// Reading a file and make a HTTP request with promises in a function that returns a promise
// if the first request fails then it will made another and on
var fs =require('fs');
var q=require('q');
var req = require('request');

function logReq(file) {

	return q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
			var resul={};
			var errL = null;
			console.log('intento 1');
			q.nfcall(req.post,data).then(function(data){
				resul=data;
			},function(err){
				console.log('el intento 1 dejo un error:',err);
				errL=err;
			});
			if (errL) {
				console.log('lanzo el error');
				throw errL;	
			} 
			return resul;
   	})
	
}


exports.logReq = logReq;