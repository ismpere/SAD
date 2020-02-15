var fs =require('fs');
var q=require('q');


try {
q.nfcall(fs.readFile,'file.txt','utf-8').then(function(data){
	return q.nfcall(fs.readFile,'file2.txt','utf-8')
    }).then(function(response) {
   		console.log('la respuesta es: ',response);
   		throw new Error('eat this!');
   }).catch(function(err){
		console.log('Se produjo una excepción:',err,'fin');
		throw new Error(err);
   }).done();
} catch (Ex) {
	console.log('capturada');
}
/*
process.on('uncaughtException',(err) => {
	console.log('Capturada una uncaughException');
});

*/

process.on('unhandledRejection',(err) => {
	console.log('Capturada una unhandledRejection');
});