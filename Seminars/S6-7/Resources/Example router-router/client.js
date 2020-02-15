const zmq = require("zeromq/v5-compat");
let req = zmq.socket("req");
req.connect("tcp://localhost:9998");
req.on("message", msg => {
  console.log("resp:" + msg);
  process.exit(0);
});
req.send("hola");
