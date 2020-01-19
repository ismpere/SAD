var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var dm = require("./dm_remote.js");
var zmq = require("zeromq");

var inputPort;
var inputPortPub;
var inputHost;

// Extract the host and port args if exists
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
const PORT_SUB = process.env.PORT || inputPortPub || 9001;
const HOST = inputHost || "127.0.0.1";
const URL_SUB = "tcp://" + HOST + ":" + PORT_SUB;
const TOPIC = "Public message";

var zmqSub = zmq.socket("sub");

var viewsdir = __dirname + "/views";
app.set("views", viewsdir);

// called on connection
function get_page(req, res) {
  console.log("Serving request " + req.params.page);
  res.sendFile(viewsdir + "/" + req.params.page);
}

// Called on server startup
function on_startup() {
  console.log("Starting: server current directory:" + __dirname);
  dm.Start(HOST, PORT);
  zmqSub.connect(URL_SUB);
  zmqSub.subscribe(TOPIC);
  console.log("Subscriber connected to " + URL_SUB + "...\n");
}

// serve static css as is
app.use("/css", express.static(__dirname + "/css"));

// serve static html files
app.get("/", function(req, res) {
  req.params.page = "index.html";
  get_page(req, res);
});

app.get("/:page", function(req, res) {
  get_page(req, res);
});

zmqSub.on("message", function(topic, msg) {
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
    dm.addPublicMessage(msgJson, function() {
      io.emit("message", msgStr);
    });
  }
});

// Add a 'close' event handler to this instance of socket
zmqSub.on("close", function(data) {
  console.log("Connection closed");
});

io.on("connection", function(sock) {
  console.log("Event: client connected\n");
  sock.on("disconnect", function() {
    console.log("Event: client disconnected\n");
  });

  // on messages that come from client, store them, and send them to every
  // connected client
  // TODO: We better optimize message delivery using rooms.
  sock.on("message", function(msgStr) {
    console.log("Event: message: " + msgStr);
    var msg = JSON.parse(msgStr);
    msg.ts = new Date(); // timestamp
    if (msg.isPrivate) {
      dm.addPrivateMessage(msg, function() {
        io.emit("message", JSON.stringify(msg));
      });
    } else {
      dm.publishPublicMessage(msg, function() {
        console.log("Msg: " + JSON.stringify(msg) + " published succesfully\n");
      });
    }
  });

  // New subject added to storage, and broadcasted
  sock.on("new subject", function(sbj) {
    dm.addSubject(sbj, function(id) {
      console.log("Event: new subject: " + sbj + "-->" + id);
      if (id == -1) {
        sock.emit("new subject", "err", "El tema ya existe", sbj);
      } else {
        sock.emit("new subject", "ack", id, sbj);
        io.emit("new subject", "add", id, sbj);
      }
    });
  });

  // New subject added to storage, and broadcasted
  sock.on("new user", function(usr, pas) {
    dm.addUser(usr, pas, function(exists) {
      console.log("Event: new user: " + usr + "(" + pas + ")");
      if (exists) {
        sock.emit("new user", "err", usr, "El usuario ya existe");
      } else {
        sock.emit("new user", "ack", usr);
        io.emit("new user", "add", usr);
      }
    });
  });

  // Client ask for current user list
  sock.on("get user list", function() {
    dm.getUserList(function(list) {
      console.log("Event: get user list");
      sock.emit("user list", list);
    });
  });

  // Client ask for current subject list
  sock.on("get subject list", function() {
    dm.getSubjectList(function(list) {
      console.log("Event: get subject list");
      sock.emit("subject list", list);
    });
  });

  // Client ask for message list
  sock.on("get message list", function(from, to, isPriv) {
    console.log(
      "Event: get message list: " + from + ":" + to + "(" + isPriv + ")"
    );
    if (isPriv) {
      dm.getPrivateMessageList(from, to, function(list) {
        sock.emit("message list", from, to, isPriv, list);
      });
    } else {
      dm.getPublicMessageList(to, function(list) {
        sock.emit("message list", from, to, isPriv, list);
      });
    }
  });

  // Client authenticates
  // TODO: session management and possible single sign on
  sock.on("login", function(u, p) {
    console.log("Event: user logs in");
    dm.login(u, p, function(ok) {
      if (!ok) {
        console.log("Wrong user credentials: " + u + "(" + p + ")");
        sock.emit("login", "err", "Credenciales incorrectas");
      } else {
        console.log("User logs in: " + u + "(" + p + ")");
        sock.emit("login", "ack", u);
      }
    });
  });
});

// Listen for connections !!
http.listen(10000, on_startup);
