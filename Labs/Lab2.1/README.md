# Lab 2.1

Desarrollo de un Foro. Cliente/Servidor <br> Forum Development. Client/Server

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

2. Arrancar dmserver - Run dmserver

```
node dmserver.js ['host:port' (rep address)] [Port (pub port)]
```

2. Arrancar forum - Run forum

```
node forum.js ['host:port' (req address)] [Port (sub port)]
```

3. Probar el laboratorio - Test the lab

&emsp;[http://localhost:10000/](http://localhost:10000/)

#### Test the server

1. Instalar - Install

```
npm install
```

2. Arrancar dmserver - Run dmserver

```
node dmserver.js ['host:port' (rep port)] [Port (pub port)]
```

3. Ejecutar dmclient - Run dmclient

```
node dmclient.js 'operation' [arg1 ...]

Ex:
node dmclient.js "publish public message" '{"msg":"Test dmClient","from":"mudito","isPrivate":false,"to":"id0","ts":"2020-01-18T20:10:33.896Z"}'
```
