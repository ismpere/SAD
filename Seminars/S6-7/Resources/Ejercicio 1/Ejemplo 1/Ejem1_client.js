var zmq = require("zmq");  
var socket = zmq.socket("req");  

function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Received message: " + message.toString("utf8"));
    process.exit(0);
});

socket.connect('tcp://127.0.0.1:9998');  

socket.send("it doesn't matter");
