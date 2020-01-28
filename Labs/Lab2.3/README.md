# Lab 2.3

Backend distribuido. Consistencia <br> Distributed Backend. Consistency

### Prerequisitos - Prerequisites

El software necesario para ejecutar este ejercicio es:

The neccessary software to run this exercise is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used
- [ZeroMQ](https://zeromq.org/) - La librería de paso de mensajes utilizada - The messaging library used

---

### Installing and executing

Para instalar y ejecutar el ejercicio los pasos necesarios son:

To install and execute the exercise the necessary steps are:

#### Test the forum

1. Instalar - Install

```
npm install
```

2. Arrancar runner - Run runner

```
node runner.js
```

3. Probar el laboratorio - Test the lab

El runner despliega tres foros - The runner deploys three forums:

- Main server listening on http://localhost:10000/

  - Rep/Req address: 127.0.0.1:9000
  - Pub/Sub port: 9001

- Second server listening on http://localhost:10001/

  - Rep/Req address: 127.0.0.1:9005
  - Pub/Sub port: 9006

- Third server listening on http://localhost:10002/
  - Rep/Req address: 127.0.0.1:9008
  - Pub/Sub port: 9009

---

#### Test the forum manually

1. Instalar - Install

```
npm install
```

2. Arrancar dmserver - Run dmserver

```
node dmserver.js ['host:port' (rep address)] [-ppXXXX (pub port)] [-psXXXX (sub port)] ['host:port,...' (sub servers)]
```

2. Arrancar forum - Run forum

```
node forum.js ['host:port' (req address)] [Port (sub port)] [-pPort (server listen port)]
```

3. Probar el laboratorio - Test the lab

&emsp;[http://localhost:10000/](http://localhost:10000/) <br>
&emsp;http://localhost:port/...

---

#### Test the server

1. Instalar - Install

```
npm install
```

2. Arrancar dmserver - Run dmserver

```
node dmserver.js ['host:port' (rep port)] [-ppXXXX (pub port)] [-psXXXX (sub port)]
```

3. Ejecutar dmclient - Run dmclient

```
node dmclient.js 'operation' [arg1 ...]

Ex:
node dmclient.js "add public message" '{"msg":"Test dmClient","from":"mudito","isPrivate":false,"to":"id0","ts":"2020-01-18T20:10:33.896Z"}'
```

---

### Lab Tests

#### Prueba convencional del software - Conventional Software Test

Para ejecutar esta prueba hay dos opciones - To run this test there are two options:

1. Ejecutar runner.js - Run runner.js

```
node runner.js
```

2. Ejecutar tester.js - Run tester.js

```
node tester.js "base"
```

3. Probar los foros - Test forums

   - Forum1: [http://localhost:10000/](http://localhost:10000/)
   - Forum2: [http://localhost:10001/](http://localhost:10001/)
   - Forum3: [http://localhost:10002/](http://localhost:10002/)

<!-- El foro se comporta de manera esperada y los mensajes se propagan adecuadamente por el resto de servidores y foros.<br>
The forum behaves as expected and the messages are properly propagated to other servers and forums. -->

---

#### Pruebas de consistencia - Consistency tests

##### Consistencia FIFO - FIFO consistency

Para ejecutar estas pruebas se utiliza el tester - To run this tests we use the tester:

1. Ejecutar test - Run test

- FIFO sin retraso- FIFO without delay:

<!-- &emsp;En esta prueba se despliega el dmserver y forum en las rutas por defecto y se publica los mensaje mediante dmclient.<br>
&emsp;In this test, the dmserver and forum are deployed on the default routes and the messages are published using dmclient.

&emsp;Para ejecutar esta prueba se utiliza el tester - To run this test we use the tester: -->

```
node tester.js 1.1
```

<!-- &emsp;Se puede observar que los mensajes en algunos casos llegan desordenados, por lo que no se puede garantizar una consistencia FIFO en el sistema.<br>
&emsp;It can be seen that messages in some cases arrive messy, so a FIFO consistency in the system cannot be guaranteed. -->

- FIFO con retraso- FIFO with delay:

<!-- &emsp;Para ejecutar esta prueba se utiliza el tester - To run this test we use the tester: -->

```
node tester.js 1.2
```

<!-- &emsp;Al igual que en el caso anterior, se puede observar que los mensajes en algunos casos llegan desordenados, por lo que no se puede garantizar una consistencia FIFO en el sistema. A partir de un retardo en la publicación del mensaje de 3 segundos, algunos mensajes empiezan a perderse, aumentando esta posibilidad cuando mayor sea el retardo.<br>
&emsp;As in the previous case, it can be seen that the messages in some cases arrive messy, so a FIFO consistency in the system cannot be guaranteed. After a delay in the publication of the message of 3 seconds, some messages begin to get lost, increasing this possibility when the delay is greater. -->

2. Observar el resultado del test - See the test result

&emsp;[localhost:10000/](localhost:10000/)

---

##### Consistencia casual - Casual consistency

Para ejecutar esta prueba se utiliza el tester - To run this test we use the tester:

1. Ejecutar test - Run test

```
node tester.js 2
```

2. Observar el resultado del test - See the test result

   - Forum1: [http://localhost:10000/](http://localhost:10000/)
   - Forum2: [http://localhost:10001/](http://localhost:10001/)
   - Forum3: [http://localhost:10002/](http://localhost:10002/)

---

##### Consistencia secuencial - Sequential consistency

Para ejecutar esta prueba se utiliza el tester - To run this test we use the tester:

1. Ejecutar test - Run test

```
node tester.js 3
```

2. Observar el resultado del test - See the test result

&emsp;[localhost:10000/](localhost:10000/)

---

## Authors

- **Ismael Pérez Martín** - _Full Stack Developer_ - [GitHub - ismpere](https://github.com/ismpere)

Consulte también la lista de [contribuidores](https://github.com/ismpere/SAD/graphs/contributors) que participaron en este proyecto.

See also the list of [contributors](https://github.com/ismpere/SAD/graphs/contributors) who participated in this project.

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc -->
