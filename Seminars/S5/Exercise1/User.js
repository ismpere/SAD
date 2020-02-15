/**
 * Exercise 1
 * Replace login function callback code with promises
 */

var dbName = "loginExample";
var collectionName = "users";
var usersCollection;

const loginDBController = require("./db");
const validator = require("validator");

// HACK: We need to wait until the db connection finish
loginDBController.collection(dbName, collectionName).then(function(collection) {
  usersCollection = collection;
  // console.log(
  //   "Connected to { DB: " + dbName + " , collection: " + collectionName + " }"
  // );
});

let User = function(data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function() {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  };
};

User.prototype.validate = function() {
  if (this.data.username == "") {
    this.errors.push("You must provide a username.");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username can only contain letters and numbers.");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valid email address.");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.");
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters.");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password cannot exceed 100 characters.");
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("Username must be at least 3 characters.");
  }
  if (this.data.username.length > 30) {
    this.errors.push("Username cannot exceed 30 characters.");
  }
};

// Promise based login method
User.prototype.login = function() {
  var password = this.data.password;

  return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection
      .findOne({ username: this.data.username })
      .then(function(attemptedUser) {
        if (attemptedUser && attemptedUser.password == password) {
          resolve("Congrats! User logged succesfully.");
        } else {
          reject("Invalid username / password.");
        }
      })
      .catch(function(err) {
        reject("Errror processing the query: " + err);
      });
  });
};

// Promise based register method
User.prototype.register = function() {
  return new Promise((resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp();
    this.validate();

    // Step #2: Only if there are no validation errors
    // then save the user data into a database
    if (!this.errors.length) {
      usersCollection
        .insertOne(this.data)
        .then(function() {
          resolve("User registered!");
        })
        .catch(function(err) {
          reject("Error inserting the user");
        });
    } else {
      reject("The user have data errors: " + this.errors);
    }
  });
};

module.exports = User;

// Callback based login method
// User.prototype.login = () => {
//   this.cleanUp();
//   usersCollection.findOne(
//     { username: this.data.username },
//     (err, attemptedUser) => {
//       if (attemptedUser && attemptedUser.password == this.data.password) {
//         callback("Congrats!");
//       } else {
//         callback("Invalid username / password.");
//       }
//     }
//   );
// };

// Callback based register method
// User.prototype.register = function() {
//   // Step #1: Validate user data
//   this.cleanUp()
//   this.validate()

//   // Step #2: Only if there are no validation errors
//   // then save the user data into a database
//   if (!this.errors.length) {
//     usersCollection.insertOne(this.data)
//   }
// }
