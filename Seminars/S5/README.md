# Seminario 5 - Seminar 5

Promesas - Promises

---

### Prerequisitos - Prerequisites

El software necesario para ejecutar el seminarios es:

The neccessary software to run the seminar is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used
- [MongoDB](https://www.mongodb.com) - La base de datos utilizada - The database used

---

### Instalar y ejecutar - Installing and executing

Para instalar y ejecutar el seminario los pasos necesarios son:

To install and execute the exercises the necessary steps are:

#### Ejercicio 1 - Exercise 1

1. Instalar - Install

```
npm install
```

2. Ejecutar - Execute

```
node index.js
```

3. Probar el seminario - Test the seminar

&emsp; Loguearse por linea de comandos - Login by command line

<!-- 3. Probar el seminario - Test the seminar

&emsp;[http://localhost:3000/](http://localhost:3000/) -->

#### Ejercicio 2 - Exercise 2

1. Instalar - Install

```
npm install
```

2. Rellenar la BD - Fill DB

```
node fill-db-script.js
```

3. Ejecutar - Execute

```
node index.js
```

4. Probar el seminario - Test the seminar

&emsp; Enviar peticiones REST - Send REST requests:

- Añadir producto al carrito - Add product to cart <br>
  http://localhost:3000/add/{productId}
- Eliminar producto del carrito - Detele product from cart <br>
  http://localhost:3000/del/{productId}

---

### Tarea principal - Main task

Realizar sobre el código las siguientes modificaciones:

Make the following modifications on the code:

##### - Se proporciona un código de un módulo User.js. Dentro de este módulo, cambiarla función login del módulo User para que utilice promesas en lugar de callbacks. En la medida de los posible, cambiar también todas las funciones asincrónicas que usa esta función a promesas <br> - A code from a User.js module is provided. Within this module, change the login function of the User module so that it uses promises instead of callbacks. To the extent possible, also change all asynchronous functions that this function uses to promises:

This have been done i diferent steps:

- First, the database connection done previously is changed to use primises instead of callbacks. <br> The db module to obtain the desired collection first wait to connect to the db (the connect promise is resolved) and then return the collection:

```
loginDBController.collection = (dbName, collectionName) => {
  return new Promise((resolve, reject) => {
    connect(dbName).then(function(db) {
      var collection = db.collection(collectionName);
      resolve(collection);
    });
  });
};

```

&emsp; The db connect function is also done with promises to follow the same development style:

```
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
```

- After obtain the collection, the login method create a new promise to obtain the user, and also uses the promise params from the findOne method of the collection to follow the development style:

```
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
```

In this exercise the _index.js_ allows to test the login by command line.

##### - En el carrito de la compra anteriormente desarrollado, realizar un módulo de acceso a la base de datos implementada con mongodb. Este módulo realizará la comprobación de stock al añadir productos al carrito. Usar promesas para realizar las operaciones asincrónicas en lugar de los callbacks, cuando sea posible. <br> - In the shopping cart previously developed, perform a module to access the database implemented with mongodb. This module will check the stock when adding products to the cart. Use promises to perform asynchronous operations instead of callbacks, when possible.

The db module connection is yet promise based, so is only necessary to change the other methods.<br>
To add and delete products, the behaviour is the following:

- First, a new promise is created to return the result of the query.

```
return new Promise((resolve, reject) => { ...
```

- Then, the products collection is obtained in order to execute the query.

```
var products = _db.collection(PRODUCT_COLLECTION_NAME);
```

- The first step is try to get the product and check that exists, this is donde with the findOne method:

```
var products = _db.collection(PRODUCT_COLLECTION_NAME);
    products
      .findOne({ id: product.id })
      .then(function(result) {
        if (result) {
            ...
```

- If the product exists, the stock is checked before changing the product stock:

```
if (result.stock <= 0) {
            reject(
              "The product with id: " +
                product.id +
                " do not have stock avaliable."
            );
          } else {
              ...
```

- Finally, if we have stock the stock data is updated with a new query:

```
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
    ...
```

- As we have changed de db style to promises, in the _index.js_ file the db calls are promise based too. <br>
  When a request is received, the product object is created and then calls the db module to return a response, returning a new promise using the db promise returns:

```
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
```

- The REST service is created with Express, listening in port 3000 by default as usual:

```
var PORT = process.env.PORT || 3000;
service.listen(PORT, () => {
  console.log("Server ready on port: " + PORT);
});
```

### Bibliografía - Bibliography

- [Zellwk. "Converting callbacks to promises". Date visited: 04/01/2020.](https://zellwk.com/blog/converting-callbacks-to-promises/)
- [Medium. "Creating & Connecting a MongoDB Database and Node.js Server to a Front End". Date visited: 04/01/2020.](https://medium.com/swlh/creating-connecting-a-mongodb-database-and-node-js-server-to-a-front-end-6a53d400ae6a)
- [Guru99. "Node.js MongoDB Tutorial with Examples". Date visited: 04/01/2020.](https://www.guru99.com/node-js-mongodb.html)
- [CloudBoost. "Waiting for DB connections before app-listen in node". Date visited: 04/01/2020.](https://blog.cloudboost.io/waiting-for-db-connections-before-app-listen-in-node-f568af8b9ec9)
- [MDN Developer Mozilla. "Promise". Date visited: 04/01/2020.](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise)
- [MongoDB. "Inserting and updating". Date visited: 04/01/2020.](https://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html)
