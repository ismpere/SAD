// Archivo para manejar la conexión a la base de datos


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var dbo;

var db;

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;

  db = db
  dbo = db.db("sadDB"); // Crea la base de datos

  
  

   
  

});


// Cart controller 
const cartController = {}


/* ----------------
  Agregar documento de la base de datos 
  ------------------- */ 
cartController.add = async (document) => {

    dbo.collection("products").insertOne(document, function(err, res) {
        if (err) throw err;
        console.log(document.desc + " insertado con éxito");
        //db.close();
        
      });

}

/* ----------------
  Borrar documento de la base de datos 
  ------------------- */ 
cartController.del = async (desc) => {
    var query = { desc: desc };
    dbo.collection("products").deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log(query.desc + " borrado correctamente");
        //db.close();
    });
}

module.exports = cartController;

