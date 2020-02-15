var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

var clients = [];

const getClients = () => {
  return Array.from(new Set(clients));
};

io.on("connection", function(socket) {
  var addedUser = false;

  socket.on("add user", username => {
    if (addedUser) return;

    var preexist = clients.includes(username);

    // Store the username in the socket session for this client
    socket.username = username;
    clients.push(username);
    console.log("New user connected: " + socket.username);
    console.log("Clients: " + clients);

    addedUser = true;
    socket.emit("login", {
      clients: getClients()
    });

    // This send broadcast to all clients
    // io.sockets.emit("broadcast", {
    //   description: clients + " clients connected!"
    // });

    // If the user was not connected with another browser, send the connect message
    if (!preexist) {
      // This send broadcast to all clients except sender
      socket.broadcast.emit("user connected", {
        username: socket.username,
        users: getClients().length
      });
    }
  });

  socket.on("disconnect", function() {
    if (addedUser) {
      clients.splice(clients.indexOf(socket.username), 1);
      console.log("user " + socket.username + " disconnected");
      console.log("Clients: " + clients);

      // This send broadcast to all clients
      // io.sockets.emit("broadcast", {
      //   description: "Client disconnect: " + clients + " clients connected!"
      // });

      // If the is not connected with another browser, send the disconnect message
      if (!clients.includes(socket.username)) {
        // This send broadcast to all clients except sender
        socket.broadcast.emit("user disconnected", {
          username: socket.username,
          users: getClients().length
        });
      }
    }
  });

  socket.on("chat message", function(msg) {
    var msjJson = {
      username: socket.username,
      msg: msg
    };
    console.log("message: " + JSON.stringify(msjJson));

    // This send broadcast to all clients except sender
    socket.broadcast.emit("chat message", msjJson);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
