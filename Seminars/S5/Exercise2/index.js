// Import modules
const express = require("express");
const service = express();

//
const cartController = require("./db");

// Config
var PORT = process.env.PORT || 3000;

// Add to cart
service.put("/add/:id", (req, res, next) => {
  var product = { id: Number(req.params.id) };
  cartController
    .add(product)
    .then(function(result) {
      console.log("Product added: " + result);
      res.send(result);
    })
    .catch(function(err) {
      console.log("Error: " + err);
      res.send(err);
    });
});

// Delete from cart
service.put("/delete/:id", (req, res, next) => {
  var product = { id: Number(req.params.id) };
  cartController
    .del(product)
    .then(function(result) {
      console.log("Product deleted: " + result);
      res.send(result);
    })
    .catch(function(err) {
      console.log("Error: " + err);
      res.send(err);
    });
});

// Starting server
service.listen(PORT, () => {
  console.log("Server ready on port: " + PORT);
});
