var net = require("net");

// Extract the host and port args if exists
var input = process.argv[2];
var inputPort;
var inputHost;
if (input && input.includes(":")) {
  inputHost = input.split(":")[0];
  inputPort = input.split(":")[1];
}

// Set port and host values depending on the input args
const PORT = process.env.PORT || inputPort || 9000;
const HOST = inputHost || "127.0.0.1";

var dm = require("./dm.js");

// Create the server socket, on client connections, bind event handlers
server = net.createServer(function(sock) {
  // We have a connection - a socket object is assigned to the connection automatically
  console.log("Conected: " + sock.remoteAddress + ":" + sock.remotePort);

  // Add a 'data' event handler to this instance of socket
  sock.on("data", function(data) {
    console.log("request comes in..." + data);
    var str = data.toString();
    var invo = JSON.parse(str);
    console.log("request is:" + invo.what + ":" + str);

    var reply = { what: invo.what, invoId: invo.invoId };
    switch (invo.what) {
      case "get subject list":
        reply.obj = dm.getSubjectList();
        console.log("Send subject list: " + reply.obj);
        break;
      case "get user list":
        reply.obj = dm.getUserList();
        console.log("Send user list: " + reply.obj);
        break;
      case "get public message list":
        reply.obj = dm.getPublicMessageList(invo.sbj);
        console.log("Send public message list");
        break;
      case "get private message list":
        reply.obj = dm.getPrivateMessageList(invo.u1, invo.u2);
        console.log("Send private message list");
        break;
      case "login":
        console.log("Send login");
        reply.obj = dm.login(invo.user.u, invo.user.p);
        break;
      case "add user":
        console.log("Send add user");
        reply.obj = dm.addUser(invo.user.u, invo.user.p);
        break;
      case "add subject":
        console.log("Send add subject");
        reply.obj = dm.addSubject(invo.sbj);
        break;
      case "add public message":
        dm.addPublicMessage(invo.msg);
        console.log("Add public message");
        break;
      case "add private message":
        dm.addPrivateMessage(invo.msg);
        console.log("Add private message");
        break;
    }
    sock.write(JSON.stringify(reply));
  });

  // Add a 'close' event handler to this instance of socket
  sock.on("close", function(data) {
    console.log("Connection closed");
  });
});

server.listen(PORT, HOST, function() {
  console.log("Server listening on " + HOST + ":" + PORT);
});
