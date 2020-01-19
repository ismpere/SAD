var zmq = require("zeromq");
var dm = require("./dm.js");

var input = process.argv[2];
var inputPort;
var inputPortPub;
var inputHost;
var zmqRep = zmq.socket("rep");
var zmqPub = zmq.socket("pub");

// Process the input args
if (process.argv.length > 2) {
  for (i = 2; i < process.argv.length; i++) {
    var input = process.argv[i];

    if (input.includes(":")) {
      inputHost = input.split(":")[0];
      inputPort = input.split(":")[1];
    } else {
      inputPortPub = input;
    }
  }
}

// Set port and host values depending on the input args
const PORT = process.env.PORT || inputPort || 9000;
const PORT_PUB = process.env.PORT || inputPortPub || 9001;
const HOST = inputHost || "127.0.0.1";
const URL = "tcp://" + HOST + ":" + PORT;
const URL_PUB = "tcp://" + HOST + ":" + PORT_PUB;
const TOPIC = "Public message";

zmqRep.bind(URL, function(err) {
  if (err) {
    console.error("Listening replier error: " + err + ": " + URL);
  } else {
    console.log("Listening replier on " + URL + "...");

    zmqPub.bind(URL_PUB, function(err2) {
      if (err2) {
        console.error("Listening publisher error: " + err + ": " + URL_PUB);
      } else {
        console.log("Listening publisher on " + URL_PUB + "..." + "\n");

        // Listen client connections
        zmqRep.on("message", function(data) {
          console.log("request comes in..." + data);
          var str = data.toString();
          var invo = JSON.parse(str);
          console.log("request is:" + invo.what + ":" + str + "\n");

          var reply = { what: invo.what, invoId: invo.invoId };

          // Switch for rep options
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
          console.log(
            "\n###################################################################\n"
          );

          // Switch to pub options
          switch (invo.what) {
            case "publish public message":
              zmqPub.send([TOPIC, JSON.stringify(invo.msg)]);
              console.log(
                "Publish data in " +
                  TOPIC +
                  ": " +
                  JSON.stringify(invo.msg) +
                  "\n"
              );
              break;
          }

          zmqRep.send(JSON.stringify(reply));
        });

        // Add a 'close' event handler to this instance of socket
        zmqRep.on("close", function(data) {
          console.log("Connection closed");
        });

        // Add a 'close' event handler to this instance of socket
        zmqPub.on("close", function(data) {
          console.log("Connection closed");
        });
      }
    });
  }
});
