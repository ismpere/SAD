// Import modules
const express = require('express');
const service = express();

const ServiceRegistry = require('./ServiceRegistry');
const serviceRegistry = new ServiceRegistry();

// 
const cartController = require('./db');

// Config
var PORT = process.env.PORT || 3000;
  

// Global variables
var cod = 1;


// Add to cart
service.get('/add/:id', (req, res, next) => {   
    
    var document = { cod : cod, desc: req.params.id}
    console.log(document)
    cartController.add(document) 
    cod++;

    // Register service
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    const serviceKey = serviceRegistry.register("cart", "2.0", serviceip, "27017");
    console.log("service key:" + serviceKey)

    return res.json({ result: serviceKey });
});


// Delete from cart
service.get('/delete/:id', (req, res, next) => { 

    cartController.del(req.params.id) 
    cod++;

    // Delete service
    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    const serviceKey = serviceRegistry
      .unregister("cart", "2.0", serviceip, "27017");
    console.log("Deleted service " + serviceKey)

    return res.json({ result: serviceKey });
});

// Starting server
service.listen(PORT, () => {
    console.log('Server ready on port: ' + PORT)
});



