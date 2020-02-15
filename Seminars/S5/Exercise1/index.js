/**
 * Index to test login functionality with promises
 */
const User = require("./User");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Insert your username: ", function(username) {
  rl.question("Insert your password: ", function(password) {
    rl.question("Insert your email: ", function(email) {
      var data = { username: username, password: password, email: email };
      var user = new User(data);
      rl.question("Select 0 to register or 1 to login: ", function(option) {
        switch (option) {
          case "0":
            register(user);
            break;
          case "1":
            login(user);
            break;
          default:
            console.log("Invalid option");
            rl.close();
        }
      });
    });
  });
});

function login(user) {
  user
    .login()
    .then(function(msg) {
      console.log(msg);
      rl.close();
    })
    .catch(function(err) {
      console.log("Error: " + err);
      rl.close();
    });
}

function register(user) {
  user
    .register()
    .then(function(msg) {
      console.log(msg);
      rl.close();
    })
    .catch(function(err) {
      console.log("Error: " + err);
      rl.close();
    });
}

rl.on("close", function() {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
