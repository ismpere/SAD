# Seminario 6-7 - Seminar 6-7

ZeroMQ

---

### Prerequisitos - Prerequisites

El software necesario para ejecutar el seminarios es:

The neccessary software to run the seminar is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used
- [MongoDB](https://www.mongodb.com) - La base de datos utilizada - The database used
- [ZeroMQ](https://zeromq.org/) - La librería de paso de mensajes utilizada - The messaging library used

---

### Instalar y ejecutar - Installing and executing

Para instalar y ejecutar el seminario los pasos necesarios son:

To install and execute the exercises the necessary steps are:

1. Instalar - Install

```
npm install zeromq
npm install
```

2. Arrancar broker - Start broker

```
node broker.js
```

3. Arrancar workers - Start workers

```
node worker.js
...
```

4. Arrancar clientes - Start clients

```
node client.js
...
```

5. Probar el seminario - Test the seminar

&emsp; Enviar peticiones REST - Send REST requests:

- Añadir producto al carrito - Add product to cart <br>
  http://localhost:3000/add/{productId}
- Eliminar producto del carrito - Detele product from cart <br>
  http://localhost:3000/del/{productId}

---

### Tarea principal - Main task

Realizar sobre el código las siguientes modificaciones:

Make the following modifications on the code:

##### - Implementar el carrito de la compra como componente comunicado por ZeroMQ. Cada carrito realiza las mismas operaciones pero las peticiones llegan por medio de mensajes usando el middleware ZeroMQ. Desarrollar un broker (con los sockets ZeroMQ adecuados). <br> Este broker recibirá como mensaje las peticiones de introducir o eliminar un producto. Si es la primera operación que se pide (es decir, si la petición se origina desde un componente con un identificador que es nuevo para el broker) se le asignará un carrito. <br> El broker debe tener la capacidad de registrar los carritos y decida a cuál de ellos (que no tenga ya una asignación) asignar una petición (balanceado de carga). También debe llevar la cuenta de qué componente (cliente) usa que carrito, hasta que el componente que origina la petición decide cerrar el uso del carrito (operación close o finish). En ese momento se elimina al cliente que usa el carrito y se lleva al carrito al estado vacío y listo para usar. <br> - Implement the shopping cart as a component communicated by ZeroMQ. Each cart performs the same operations but the requests arrive through messages using the ZeroMQ middleware. Develop a broker (with the appropriate ZeroMQ sockets). <br> This broker will receive as a message requests to introduce or remove a product. If it is the first operation requested (that is, if the request originates from a component with an identifier that is new to the broker), a cart will be assigned. <br> The broker must have the ability to register the carts and decide to which one (which does not already have an assignment) assign a request (load balancing). You should also keep track of which component (customer) your cart uses, until the component that originates the request decides to close the use of the cart (close or finish operation). At that time the customer using the cart is removed and the cart is taken to the empty state and ready to use:

According to the specifications of the changes, the the most appropriate implementation of ZeroMQ is a _router-router_ implementation. This will allow us to manage the list of workers and clients with a broker component.

Following the specifications, the main changes are:

- The client message sent to the broker has three arguments:
  - c: Client identity
  - '': Empty value
  - m: Client message

&emsp; This allows us to identify the client messages and assign a new worker to that client and save the request in the client requests list:

```
sc.on("message", (c, sep, m) => {
  if (workers.length == 0) {
    cli.push(c);
    req.push(m);
  } else {
    sw.send([workers.shift(), "", c, "", m]);
  }
});
```

- The worker messages sent to the broker have four arguments:
  - w: Worker identity
  - '': Empty value
  - c: Client identity
  - '': Empty value
  - r: Response from worker job

When we identity a worker message in the broker, the broker asigns a new job to the worker and if exist jobs to do, the broker send a new job to the new broker:

```
sw.on("message", (w, sep, c, sep2, r) => {
  if (c == "") {
    workers.push(w);
    return;
  }
  if (cli.length > 0) {
    sw.send([w, "", cli.shift(), "", req.shift()]);
  } else {
    workers.push(w);
  }
  sc.send([c, "", r]);
});
```

To identify when a worker is sending a register request, all the message params unless the worker identity are empty values. This allows us to identity the register message and add the worker to the workers list. The worker identity is added by ZeroMQ, so the message in the worker is like that:

```
req.send(["", "", ""]);
```

In the worker code, the message have two arguments:

- operation
- product

This give us information to complete the needed job. The worker process this data and returns by ZeroMQ the result of the job using the promises from the db module done in the previous seminars:

```
req.on("message", (c, sep, msg) => {
  console.log("Msg received: " + msg);
  var msgJSON = null;
  if (msg) {
    try {
      msgJSON = JSON.parse(msg);
    } catch (e) {
      req.send([c, "", "Error processing the input"]);
    }
  }

  if (msgJSON) {
    switch (msgJSON.operation) {
      case "add":
        cartController
          .add(msgJSON.product)
          .then(function(result) {
            console.log("Product added: " + result);
            req.send([c, "", result]);
          })
          .catch(function(err) {
            console.log("Error: " + err);
            req.send([c, "", err]);
          });
        break;
      ...
      default:
        req.send([c, "", "Operation not valid"]);
        break;
    }
  }
});
```

In the client side, when a REST request is received, the client send a message to the broker with the job to do and wait the response from the ZeroMQ socket:

```
service.put("/add/:id", (req, res, next) => {
  let reqZMQ = zmq.socket("req");
  reqZMQ.connect("tcp://localhost:9998");

  reqZMQ.on("message", msg => {
    console.log("resp:" + msg);
    res.send(msg);
  });

  var product = { id: Number(req.params.id) };
  var msg = { operation: "add", product: product };

  reqZMQ.send(JSON.stringify(msg));
});
```

The message sent have the two arguments processed by the worker.

#### - ¿Podría usarse el broker implementado con ZeroMQ y los carritos con REST y conectarse de alguna manera? <br> - Could the broker implemented with ZeroMQ and carts with REST be used and connected in some way?

Yes, the proportionate code already implements a version with REST carts.

This has been developed simply by creating a 'req' socket for each request to the REST service.

Once the request is received, the message is sent to the broker by ZeroMQ and the response is waited with socket.on.

#### - ¿Proporciona esta solución alguna ventaja? <br> - Does this solution provide any advantage?

The main advantage is to have a load balancer for our REST requests, but the processing time increases.

---

### Tarea opcional - Optional task

Realizar sobre el código las siguientes modificaciones:

Make the following modifications on the code:

- [ ] Proporcionar un mecanismo (usando Zeromq) que permita determinar si el carritocontinua funcionando con normalidad.<br> En caso contrario usar el mecanismo del circuit breaker (proxy de estado fallido) para evitar que se produzca un error en cascada que colapse el sistema. <br>
      Provide a mechanism (using Zeromq) to determine if the cart continues to function normally. <br> Otherwise use the mechanism of the circuit breaker (failed state proxy) to prevent a cascading error from collapsing the system.

---

### Bibliografía - Bibliography

- [UPV - TSR. "TSR - Documentación de referencia sobre0MQ". Date visited: 06/01/2020.](https://poliformat.upv.es/access/content/group/DOC_33435_2019/Seminars/Sem06/RefZMQ-cas1920.pdf)
- [ZeroMQ. "NodeJS". Date visited: 06/01/2020.](https://zeromq.org/languages/nodejs/)
- [ZeroMQ. "Javascript client for ZeroMQ/NetMQ". Date visited: 06/01/2020.](https://github.com/zeromq/JSMQ)
- [Rastating. "Using ZeroMQ with Node.js". Date visited: 06/01/2020.](https://rastating.github.io/using-zeromq-with-node-js/)
