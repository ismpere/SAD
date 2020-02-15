var net = require('net');

net.createServer(function (connection) {
	connection.on('error', function (err) {
		console.log(err);
	});
	
}).listen(400);
