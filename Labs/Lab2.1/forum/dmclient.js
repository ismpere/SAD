var dm = require("./dm_remote.js");

var args = process.argv.slice(2);

// Extract the host and port args if exists
var input = process.argv[2];
var inputPort;
var inputHost;
if (input && input.includes(":")) {
  inputHost = input.split(":")[0];
  inputPort = input.split(":")[1];
  args = process.argv.slice(3);
}

// Set port and host values depending on the input args
const PORT = process.env.PORT || inputPort || 9000;
const HOST = inputHost || "127.0.0.1";

dm.Start(HOST, PORT, function() {
  // Write the command to the server
  switch (args[0]) {
    case "get subject list":
      dm.getSubjectList(function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "get user list":
      dm.getUserList(function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "get public message list":
      dm.getPublicMessageList(args[1], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "get private message list":
      dm.getPrivateMessageList(args[1], args[2], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "login":
      dm.login(args[1], args[2], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "add user":
      dm.addUser(args[1], args[2], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "add subject":
      dm.addSubject(args[1], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "add public message":
      dm.addPublicMessage(args[1], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "publish public message":
      dm.publishPublicMessage(args[1], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    case "add private message":
      dm.addPrivateMessage(args[1], function(ml) {
        console.log("here it is:");
        console.log(JSON.stringify(ml));
      });
      break;
    default:
      console.log("Invalid option");
      break;
  }
});
