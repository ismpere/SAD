// Archivo para manejar la conexión a la base de datos

var MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/";
const DB_NAME = "SPSeminar3";
const PRODUCT_COLLECTION_NAME = "products";

var _db;

// If the db not exists previously, is created
MongoClient.connect(URL, { useUnifiedTopology: true })
  .then(function(db) {
    _db = db.db(DB_NAME);
    console.log("Connected");
  })
  .catch(function(err) {
    console.log("Error in db connection");
  });

// Cart controller
const cartController = {};

/* ----------------
  Add product to shopping cart 
  ------------------- */

cartController.add = async product => {
  return new Promise((resolve, reject) => {
    var products = _db.collection(PRODUCT_COLLECTION_NAME);
    products
      .findOne({ id: product.id })
      .then(function(result) {
        if (result) {
          // Check if the product have avaliable stock
          if (result.stock <= 0) {
            reject(
              "The product with id: " +
                product.id +
                " do not have stock avaliable."
            );
          } else {
            var stock = result.stock - 1;
            products
              .updateOne({ id: product.id }, { $set: { stock: stock } })
              .then(function() {
                resolve(
                  "Product with id: " +
                    product.id +
                    " added to cart. Actual stock: " +
                    stock
                );
              })
              .catch(function(err) {
                reject("Error processing the update query: " + err);
              });
          }
        } else {
          reject("Product with id: " + product.id + " not found.");
        }
      })
      .catch(function(err) {
        reject("Error processing the find query: " + err);
      });
  });
};

/* ----------------
  Delete product from shopping cart 
  ------------------- */

cartController.del = async product => {
  return new Promise((resolve, reject) => {
    var products = _db.collection(PRODUCT_COLLECTION_NAME);
    products
      .findOne({ id: product.id })
      .then(function(result) {
        if (result) {
          var stock = result.stock + 1;
          products
            .updateOne({ id: product.id }, { $set: { stock: stock } })
            .then(function() {
              resolve(
                "Product with id: " +
                  product.id +
                  " removed from cart. Actual stock: " +
                  stock
              );
            })
            .catch(function(err) {
              reject("Error processing the update query: " + err);
            });
        } else {
          reject("Product with id: " + product.id + " not found.");
        }
      })
      .catch(function(err) {
        reject("Error processing the find query: " + err);
      });
  });
};

module.exports = cartController;
