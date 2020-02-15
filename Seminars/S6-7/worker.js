const zmq = require("zeromq/v5-compat");

let req = zmq.socket("req");
req.identity = "Worker1" + process.pid;
req.connect("tcp://localhost:9999");

const cartController = require("./db");

req.on("message", (c, sep, msg) => {
  console.log("Msg received: " + msg);
  var msgJSON = null;
  if (msg) {
    try {
      msgJSON = JSON.parse(msg);
    } catch (e) {
      req.send([c, "", "Error processing the input"]);
    }
  }

  if (msgJSON) {
    switch (msgJSON.operation) {
      case "add":
        cartController
          .add(msgJSON.product)
          .then(function(result) {
            console.log("Product added: " + result);
            req.send([c, "", result]);
          })
          .catch(function(err) {
            console.log("Error: " + err);
            req.send([c, "", err]);
          });
        break;
      case "del":
        cartController
          .del(msgJSON.product)
          .then(function(result) {
            console.log("Product deleted: " + result);
            req.send([c, "", result]);
          })
          .catch(function(err) {
            console.log("Error: " + err);
            req.send([c, "", err]);
          });
        break;
      default:
        req.send([c, "", "Operation not valid"]);
        break;
    }
  }
});
req.send(["", "", ""]);
