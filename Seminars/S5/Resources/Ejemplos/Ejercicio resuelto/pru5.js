var fs =require('fs');
var q=require('q');

function readFile(name){
	return new Promise(function(resolve,reject){
		fs.readFile(name,'utf-8',(err,res)=> {
			if(err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}


readFile('file3.txt')
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log(error);
		throw error;
	})


process.on('unhandledRejection',(err) => {
	console.log('Capturada una unhandledRejection');
});