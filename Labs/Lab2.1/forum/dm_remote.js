var net = require("net");
var zmq = require("zeromq");

var zmqReq = zmq.socket("req");

exports.Start = function(host, port, cb) {
  var fullUrl = "tcp://" + host + ":" + port;
  zmqReq.connect(fullUrl);
  console.log("Connected to: " + fullUrl);
  if (cb != null) cb();
};

var callbacks = {}; // hash of callbacks. Key is invoId
var invoCounter = 0; // current invocation number is key to access "callbacks".

//
// When data comes from server. It is a reply from our previous request
// extract the reply, find the callback, and call it.
// Its useful to study "exports" functions before studying this one.
//
zmqReq.on("message", function(data) {
  console.log("data comes in: " + data);
  var datas = [data];
  if (data.includes("}{")) {
    datas = data
      .toString()
      .replace("}{", "}\n{")
      .split("\n");
  }
  console.log("Datas to process: [ " + datas + " ]");

  datas.forEach(data => processData(data));
});

function processData(data) {
  var reply = JSON.parse(data.toString());
  console.log(
    "We received a reply for: " +
      reply.what +
      ":" +
      reply.invoId +
      "\n" +
      "\n###################################################################\n"
  );
  switch (reply.what) {
    case "login":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "add user":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "add subject":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "get private message list":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "get public message list":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "get user list":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "get subject list":
      callbacks[reply.invoId](reply.obj); // call the stored callback, one argument
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "add public message":
      callbacks[reply.invoId](); // call the stored callback, no arguments
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "add private message":
      callbacks[reply.invoId](); // call the stored callback, no arguments
      delete callbacks[reply.invoId]; // remove from hash
      break;
    case "publish public message":
      callbacks[reply.invoId](); // call the stored callback, no arguments
      delete callbacks[reply.invoId]; // remove from hash
      break;
    default:
      console.log("Panic: we got this: " + reply.what);
      break;
  }
}

// Add a 'close' event handler for the client socket
zmqReq.on("close", function() {
  console.log("Connection closed");
});

//
// on each invocation we store the command to execute (what) and the invocation Id (invoId)
// InvoId is used to execute the proper callback when reply comes back.
//
function Invo(str, cb) {
  this.what = str;
  this.invoId = ++invoCounter;
  callbacks[invoCounter] = cb;
}

//
//
// Exported functions as 'dm'
//
//

// true if already exists
exports.addUser = function(u, p, cb) {
  invo = new Invo("add user", cb);
  user = { u: u, p: p };
  invo.user = user;
  zmqReq.send(JSON.stringify(invo));
};

// Adds a new subject to subject list. Returns -1 if already exists, id on success
exports.addSubject = function(sbj, cb) {
  var invo = new Invo("add subject", cb);
  invo.sbj = sbj;
  zmqReq.send(JSON.stringify(invo));
};

// adds a public message to storage
exports.addPublicMessage = function(msg, cb) {
  var invo = new Invo("add public message", cb);
  invo.msg = msg;
  zmqReq.send(JSON.stringify(invo));
};

// publish a public message to forums
exports.publishPublicMessage = function(msg, cb) {
  var invo = new Invo("publish public message", cb);
  invo.msg = msg;
  zmqReq.send(JSON.stringify(invo));
};

// adds a private message to storage
exports.addPrivateMessage = function(msg, cb) {
  var invo = new Invo("add private message", cb);
  invo.msg = msg;
  zmqReq.send(JSON.stringify(invo));
};

exports.getPublicMessageList = function(sbj, cb) {
  var invo = new Invo("get public message list", cb);
  invo.sbj = sbj;
  zmqReq.send(JSON.stringify(invo));
};

exports.getPrivateMessageList = function(u1, u2, cb) {
  invo = new Invo("get private message list", cb);
  invo.u1 = u1;
  invo.u2 = u2;
  zmqReq.send(JSON.stringify(invo));
};

exports.getSubjectList = function(cb) {
  zmqReq.send(JSON.stringify(new Invo("get subject list", cb)));
};

exports.getUserList = function(cb) {
  console.log("Llega");
  zmqReq.send(JSON.stringify(new Invo("get user list", cb)));
};

// Tests if credentials are valid, returns true on success
exports.login = function(u, p, cb) {
  invo = new Invo("login", cb);
  user = { u: u, p: p };
  invo.user = user;
  zmqReq.send(JSON.stringify(invo));
};
