// Archivo para manejar la conexión a la base de datos

const URL = "mongodb://localhost:27017/";

var MongoClient = require("mongodb").MongoClient;
var _db;

function connect(dbName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, { useUnifiedTopology: true })
      .then(function(db) {
        // <- db as first argument
        _db = db.db(dbName);
        resolve(_db);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

const loginDBController = {};

loginDBController.collection = (dbName, collectionName) => {
  return new Promise((resolve, reject) => {
    connect(dbName).then(function(db) {
      var collection = db.collection(collectionName);
      resolve(collection);
    });
  });
};

module.exports = loginDBController;
