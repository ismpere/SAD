# Lab 2.2

Backend distribuido. Grupo de servidores <br> Distributed Backend. Server group

### Prerequisitos - Prerequisites

El software necesario para ejecutar este ejercicio es:

The neccessary software to run this exercise is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Angular](https://angular.io) - El framework web utilizado- The web framework used
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
node dmserver.js ['host:port' (rep address)] [Port (pub port)] ['host:port,...' (sub servers)]
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
node dmserver.js ['host:port' (rep port)] [Port (pub port)]
```

3. Ejecutar dmclient - Run dmclient

```
node dmclient.js 'operation' [arg1 ...]

Ex:
node dmclient.js "publish public message" '{"msg":"Test dmClient","from":"mudito","isPrivate":false,"to":"id0","ts":"2020-01-18T20:10:33.896Z"}'
```

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
