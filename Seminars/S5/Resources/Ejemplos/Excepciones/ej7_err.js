var http = require('http');

http.createServer(function (rq,rs) {
	throw new Error('Esta excepción se capturará');
}).listen(3000);

process.on('uncaughtException', function(err) {
	console.error('la capturé!:' +err);
	process.exit(1);
});
