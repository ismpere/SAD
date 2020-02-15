
var fs =require('fs');
var q=require('q');



q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
	return q.nfcall(fs.readFile,'file2.txt','utf-8').then(function(data2){
		console.log(data2,data);
	});
   }).then(function(response) {
   		console.log('la respuesta es: ',response);
   }).fail(function(err){
		console.log('Se produjo una excepción:',err);
   });
