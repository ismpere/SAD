
// currency update client in node.js
// connects SUB socket to tcp://localhost:5556
// collects currency updates until it reaches 10 total updates

var zmq = require('zmq');

console.log("Collecting updates from currency server…");

// Socket to talk to server
var subscriber = zmq.socket('sub');

// Subscribe to currency code, default is 'USD'
var filter = null;
if (process.argv.length > 2) {
	var c = 0;
	for (var args in process.argv) {
	  if (c>1) {
		filter = process.argv[args];
	    console.log(filter);
	    subscriber.subscribe(filter);
	   }
	  c++;
    }
  
} else {
  filter = "USD";
  console.log(filter);
  subscriber.subscribe(filter);

}

// process 10 updates
var total_upd = 0
  , temps      = 0;
subscriber.on('message', function() {
  for (var q in arguments ) {
	  console.log('Part ' + q + ': '+arguments[q]);
   }
  //console.log('recepción: '+total_upd+ ' '+data[0]);
  total_upd += 1;
  if (total_upd === 10) {
    console.log("This is the end");
    process.exit(0);
    process.exit(0);
    //throw new Error();

  }
});

subscriber.connect("tcp://localhost:5556");
