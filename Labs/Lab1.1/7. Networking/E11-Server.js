// Server code.
var net = require('net');
var server = net.createServer(
  function(c) { //'connection' listener
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  // Send "Hello" to the client.
  c.write('Hello\r\n');
  // With pipe() we "echo" what is
  // received in the incoming Stream; 
  // i.e., we write to Socket 'c' what
  // is read from 'c'.
  c.pipe(c);
});
server.listen(9000, 
  function() { //'listening' listener
  console.log('server bound');
});
