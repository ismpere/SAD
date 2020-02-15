# Lab 2.2

Backend distribuido. Grupo de servidores <br> Distributed Backend. Server group

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

El runner despliega tres servidores de foros y tres frontend - The runner deploys three forum servers and three frontends:

- Main server listening on http://localhost:10000/

  - Rep/Req address: 127.0.0.1:9000
  - Pub port: 9001
  - Sub port: 9002

- Second server listening on http://localhost:10001/

  - Rep/Req address: 127.0.0.1:9005
  - Pub port: 9006
  - Sub port: 9007

- Third server listening on http://localhost:10002/
  - Rep/Req address: 127.0.0.1:9009
  - Pub port: 9010
  - Sub port: 9011

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
