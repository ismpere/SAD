// Reading a file and make a HTTP request with promises in a function that returns a promise
var fs =require('fs');
var q=require('q');
var req = require('request');

function logReq(file) {

	return q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
			return q.nfcall(req.post,data);
   	})
	
}


logReq('file.txt').then(console.log);