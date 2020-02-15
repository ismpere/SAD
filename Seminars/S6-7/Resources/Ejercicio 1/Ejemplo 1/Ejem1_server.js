var zmq = require("zmq");  
var socket = zmq.socket("rep");  
var counter = 0; 

function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

function sendMessage (message) {  
    logToConsole("Sending: " + message);
    socket.send(message);
}

socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Received message: " + message.toString("utf8"));
    sendMessage(new Date().toLocaleTimeString());
});

socket.bind("tcp://*:9998", function (error) {  
    if (error) {
        logToConsole("Failed to bind socket: " + error.message);
        process.exit(0);
    }
    else {
        logToConsole("Server listening on port 9998");
    }
});
