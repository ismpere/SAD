
var fs =require('fs');
var q=require('q');



q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
	return data;
   }).then(function(response) {
   		console.log('la respuesta es: ',response);
   }).fail(function(err){
		console.log('Se produjo una excepción:',err);
   });
