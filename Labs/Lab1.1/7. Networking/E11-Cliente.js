// Client code.
var net = require('net');

// We assume that the server is in our
// same machine.
var client = net.connect({port: 9000},
    function() { //'connect' listener
  console.log('client connected');
  // This will be echoed by the server.
  client.write('world!\r\n');
});
client.on('data', function(data) {
  // Write the received data on stdout.
  console.log(data.toString());
  // Inherited from Writable Stream...
  // It says that no more data will be
  // written to the Stream.
  client.end();
});
client.on('end', function() {
  console.log('client disconnected');
});
