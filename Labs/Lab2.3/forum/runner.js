const { exec } = require("child_process");

initForums();
console.log("Forums running...");

function initForums() {
  // Main forum in localhost:10000
  executeCommandLine(
    "node dmserver.js 'tcp://127.0.0.1:9007,tcp://127.0.0.1:9011'"
  );
  executeCommandLine("node forum.js");

  // Second forum in localhost:10001
  executeCommandLine(
    "node dmserver.js 127.0.0.1:9005 -pp9006 -ps9007 'tcp://127.0.0.1:9002,tcp://127.0.0.1:9011'"
  );
  executeCommandLine("node forum.js 127.0.0.1:9005 9006 -p10001");

  // Third forum in localhost:10002
  executeCommandLine(
    "node dmserver.js 127.0.0.1:9009 -pp9010 -ps9011 'tcp://127.0.0.1:9002,tcp://127.0.0.1:9007'"
  );
  executeCommandLine("node forum.js 127.0.0.1:9009 9010 -p10002");
}

function executeCommandLine(command) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log("Error: " + err);
      return;
    } else {
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}
