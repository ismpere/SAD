const { exec } = require("child_process");

var option;
var i;

const MSG_TEST_1 = {
  msg: "Test dmClient 1",
  from: "mudito",
  isPrivate: false,
  to: "id0",
  ts: "2020-01-18T20:10:33.896Z"
};
const MSG_TEST_2 = {
  msg: "Test dmClient 2",
  from: "mudito",
  isPrivate: false,
  to: "id0",
  ts: "2020-01-18T20:10:33.896Z"
};

const INIT_FORUM_DELAY = 1500;
const SERVER_DELAY = 3000;
const SEQUENTIAL_TESTS = 10;

const SERVER_ADDRESS_2 = "127.0.0.1:9005";

// Process the input args
if (process.argv.length > 2) {
  option = process.argv[2];
}

// Process the test
if (option) {
  executeTest(option);
} else {
  console.log("Error: Insert test");
}

function executeTest(option) {
  switch (option) {
    case "base":
      executeCommandLine("node runner.js");
      break;
    case "1.1":
      console.log("FIFO Test without delay\n");
      initBaseForum(false);
      testClient("publish public message", JSON.stringify(MSG_TEST_1));
      testClient("publish public message", JSON.stringify(MSG_TEST_2));
      break;
    case "1.2":
      console.log("FIFO Test with delay\n");
      initBaseForum(true);
      testClient("publish public message", JSON.stringify(MSG_TEST_1));
      testClient("publish public message", JSON.stringify(MSG_TEST_2));
      break;
    case "2":
      casualTest();
      break;
    case "3":
      sequentialTest();
      break;
    default:
      console.log("Error: Invalid test option");
      break;
  }
}

function sequentialTest() {
  initBaseForum();

  for (i = 0; i < SEQUENTIAL_TESTS; i++) {
    testClient("publish public message", JSON.stringify(MSG_TEST_1));
    testClient("publish public message", JSON.stringify(MSG_TEST_2));
  }
}

function casualTest() {
  console.log("Casual Test\n");
  // Main forum in localhost:10000 with a delay of 1000 milliseconds
  executeCommandLine(
    "node dmserver.js 'tcp://127.0.0.1:9006,tcp://127.0.0.1:9009' -r1000"
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

  // Wait to forums init
  delay(INIT_FORUM_DELAY);

  // Send first message to S1
  testClient("publish public message", JSON.stringify(MSG_TEST_1));

  // Send second message to S2
  testClient(
    "publish public message",
    JSON.stringify(MSG_TEST_2),
    SERVER_ADDRESS_2
  );
}

function testClient(operation, args, address) {
  var command;
  if (address) {
    command =
      "node dmclient.js " + address + " '" + operation + "' '" + args + "'";
  } else {
    command = "node dmclient.js '" + operation + "' '" + args + "'";
  }
  executeCommandLine(command, function(msg) {
    console.log(msg);
  });
}

function initBaseForum(withDelay) {
  if (withDelay) {
    executeCommandLine("node dmserver.js -r" + SERVER_DELAY);
  } else {
    executeCommandLine("node dmserver.js");
  }
  executeCommandLine("node forum.js");
  delay(INIT_FORUM_DELAY);
}

function executeCommandLine(command, callback) {
  console.log("Execute: " + command);
  var process = exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log("Error: " + err);
      return;
    }
  });
  // To log the command output
  // process.stdout.on("data", function(data) {
  //   if (data.includes("get public message list")) {
  //     console.log(data.toString());
  //   }
  // });
}

function delay(n) {
  if (n) {
    console.log("Starting delay of " + n + " milliseconds...");
    time = new Date().getTime();
    time2 = time + n;
    while (time < time2) {
      time = new Date().getTime();
    }
    console.log("End delay");
  }
}
