const { exec } = require("child_process");

initForums();
console.log("Forums running...");

function initForums() {
  // Main forum in localhost:10000
  executeCommandLine(
    "node dmserver.js 'tcp://127.0.0.1:9006,tcp://127.0.0.1:9009'"
  );
  executeCommandLine("node forum.js");

  // Second forum in localhost:10001
  executeCommandLine(
    "node dmserver.js 127.0.0.1:9005 9006 'tcp://127.0.0.1:9001,tcp://127.0.0.1:9009'"
  );
  executeCommandLine("node forum.js 127.0.0.1:9005 9006 -p10001");

  // Third forum in localhost:10002
  executeCommandLine(
    "node dmserver.js 127.0.0.1:9008 9009 'tcp://127.0.0.1:9001,tcp://127.0.0.1:9006'"
  );
  executeCommandLine("node forum.js 127.0.0.1:9008 9009 -p10002");
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
