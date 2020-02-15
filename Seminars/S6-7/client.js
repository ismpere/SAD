// Import modules
const express = require("express");
const zmq = require("zeromq/v5-compat");
const service = express();

// Config
var PORT = process.env.PORT || process.argv[2] || 3000;

// Add to cart
service.put("/add/:id", (req, res, next) => {
  let reqZMQ = zmq.socket("req");
  reqZMQ.connect("tcp://localhost:9998");

  reqZMQ.on("message", msg => {
    console.log("resp:" + msg);
    res.send(msg);
  });

  var product = { id: Number(req.params.id) };
  var msg = { operation: "add", product: product };

  reqZMQ.send(JSON.stringify(msg));
});

// Delete from cart
service.put("/delete/:id", (req, res, next) => {
  let reqZMQ = zmq.socket("req");
  reqZMQ.connect("tcp://localhost:9998");

  reqZMQ.on("message", msg => {
    console.log("resp:" + msg);
    res.send(msg);
  });

  var product = { id: Number(req.params.id) };
  var msg = { operation: "del", product: product };

  reqZMQ.send(JSON.stringify(msg));
});

// Starting server
service.listen(PORT, () => {
  console.log("Server ready on port: " + PORT);
});
