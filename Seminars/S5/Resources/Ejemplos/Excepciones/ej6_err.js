var http = require('http');

try {
http.createServer(function httpHandler(rq,rs) {
	throw new Error('Esta excepción se capturará');
}).listen(3000);

} catch (excep) {
	console.log('se ha producido una excepción');
}
