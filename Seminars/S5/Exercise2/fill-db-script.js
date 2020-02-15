// Script to add products to db

var MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/";
const DB_NAME = "SPSeminar3";
const PRODUCT_COLLECTION_NAME = "products";

var _db;

fillProducts();

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

function fillProducts() {
  connect(DB_NAME).then(function(db) {
    var product1 = { id: 1, name: "potato", price: "10", stock: 5 };
    var product2 = { id: 2, name: "carrot", price: "7", stock: 1 };
    var product3 = { id: 3, name: "onion", price: "5", stock: 10 };

    var collection = db.collection(PRODUCT_COLLECTION_NAME);

    collection.insertOne(product1);
    collection.insertOne(product2);
    collection.insertOne(product3);

    collection.findOne({ id: 1 }).then(function(result) {
      console.log(result);
    });
  });
}
