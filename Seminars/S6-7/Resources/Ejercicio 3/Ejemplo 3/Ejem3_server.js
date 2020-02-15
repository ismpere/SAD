var zmq = require("zmq");  
var socket = zmq.socket("push");  
var counter = 0; 

function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

function sendMessage (message) {  
    logToConsole("Sending: " + message);
    socket.send(message);
}

socket.bind("tcp://*:9998", function (error) {  
    if (error) {
        logToConsole("Failed to bind socket: " + error.message);
        process.exit(0);
    }
    else {
        logToConsole("Server listening on port 9998");

        // Increment the counter and send the value to the clients every second.
        setInterval(function () { sendMessage(new Date().toLocaleTimeString()+ ' ' +counter++); }, 1000);
    }
});
