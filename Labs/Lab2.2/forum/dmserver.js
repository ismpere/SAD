var zmq = require("zeromq");
var dm = require("./dm.js");

var i;
var inputPort;
var inputPortPub;
var inputPortSub;
var inputHost;
var servers;
var pubZmqSockets = [];
var zmqRep = zmq.socket("rep");
var zmqPubForum = zmq.socket("pub");
var zmqSubServers = zmq.socket("sub");

// Process the input args
if (process.argv.length > 2) {
  for (i = 2; i < process.argv.length; i++) {
    var input = process.argv[i];

    if (input.includes("tcp://")) {
      servers = input.split(",");
    } else if (input.includes("-ps")) {
      inputPortSub = parseInt(input.replace("-ps", ""));
    } else if (input.includes("-pp")) {
      inputPortPub = parseInt(input.replace("-pp", ""));
    } else if (input.includes(":")) {
      inputHost = input.split(":")[0];
      inputPort = input.split(":")[1];
    }
  }
}

// Set port and host values depending on the input args
const PORT = process.env.PORT || inputPort || 9000;
const PORT_PUB = inputPortPub || 9001;
const PORT_SUB = inputPortSub || 9002;
const HOST = inputHost || "127.0.0.1";
const URL = "tcp://" + HOST + ":" + PORT;
const URL_PUB_FORUM = "tcp://" + HOST + ":" + PORT_PUB;
const URL_SUB_SERVERS = "tcp://" + HOST + ":" + PORT_SUB;
const TOPIC = "checkpoint";
const SERVERS = servers ? servers : [];

console.log("Suscriber server list: " + SERVERS);

zmqRep.bind(URL, function(err) {
  if (err) {
    console.error("Listening replier error: " + err + ": " + URL);
  } else {
    console.log("Listening replier on " + URL + "...");

    zmqPubForum.bind(URL_PUB_FORUM, function(err2) {
      if (err2) {
        console.error(
          "Listening forum publisher error: " + err + ": " + URL_PUB_FORUM
        );
      } else {
        console.log("Binded forum publisher on " + URL_PUB_FORUM + "...");

        zmqSubServers.bind(URL_SUB_SERVERS, function(err3) {
          if (err3) {
            console.error(
              "Listening servers suscriber error: " +
                err +
                ": " +
                URL_SUB_SERVERS
            );
          } else {
            console.log(
              "Listening servers suscriber on " + URL_SUB_SERVERS + "...\n"
            );
            zmqSubServers.subscribe(TOPIC);

            if (SERVERS.length === 0) {
              startServer();
            } else {
              connectPublishSocketsAnsStart();
            }
          }
        });
      }
    });
  }
});

function connectPublishSocketsAnsStart() {
  for (i = 0; i < SERVERS.length; i++) {
    var url = SERVERS[i];
    var zmqPub = zmq.socket("pub");
    zmqPub.connect(url);
    console.log("Connected publisher on " + url + "..." + "\n");
    pubZmqSockets.push(zmqPub);
    // Start server when every socket is connected
    if (pubZmqSockets.length === SERVERS.length) {
      console.log();
      startServer();
    }
  }
}

function startServer() {
  console.log("Starting server...\n");
  startReqSocket();
  startServersSubSocket();
  // Add a 'close' event handler to this instance of socket
  pubZmqSockets.forEach(zmqPub => closeSocket(zmqPub));
}

function startServersSubSocket() {
  zmqSubServers.on("message", function(topic, msg) {
    var msgStr;
    var msgJson;
    if (msg) {
      msgStr = msg.toString();
      try {
        msgJson = JSON.parse(msgStr);
      } catch (e) {
        console.log("Error parsing msg: " + e);
      }
    }
    if (msgJson) {
      console.log(
        "received a message related to:",
        topic.toString(),
        "containing message:",
        msgStr + "\n"
      );
      publishForumMessage(msgJson);
    }
  });
}

function startReqSocket() {
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
        publishForumMessage(invo.msg);
        pubZmqSockets.forEach(zmqPub => publishMessage(zmqPub, invo.msg));
        break;
      case "add private message":
        dm.addPrivateMessage(invo.msg);
        console.log("Add private message");
        break;
    }
    console.log(
      "\n###################################################################\n"
    );

    zmqRep.send(JSON.stringify(reply));
  });

  // Add a 'close' event handler to this instance of socket
  zmqRep.on("close", function(data) {
    console.log("Connection closed");
  });
}

function publishForumMessage(msg) {
  dm.addPublicMessage(msg);
  console.log("Add public message");
  publishMessage(zmqPubForum, msg);
}

function publishMessage(zmqPub, msg) {
  zmqPub.send([TOPIC, JSON.stringify(msg)]);
  console.log("Publish data in " + TOPIC + ": " + JSON.stringify(msg) + "\n");
}

function closeSocket(zmqSock) {
  zmqSock.on("close", function(data) {
    console.log("Connection closed");
  });
}
