# Seminario 10 - Seminar 10

Blockchain

---

### Prerequisitos - Prerequisites

El software necesario para ejecutar el seminarios es:

The neccessary software to run the seminar is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used
- [MongoDB](https://www.mongodb.com) - La base de datos utilizada - The database used
- [Multichain](https://www.multichain.com/) - El framework de blockchain utilizado - The blockchain framework used

---

### Trabajo realizado - Work done

Para instalar y ejecutar el seminario los pasos necesarios son:

To install and execute the exercises the necessary steps are:

1. Se installo multichain y se creo el archivo para desplique runnerblockchain.sh, para que creara el bloque y el nodo correspondiente

2. Posteriormente se hizo el archivo blockchain.js, donde se especifican las funciones que usan multichain-node

3. Por último se remplazo el moodo de AddPrivateMessage en el archivo dm, apra que utilizara promesas y asi mismo, crear un stream donde publicar los datos de la conversación

---

### Bibliografía - Bibliography

- ["MultiChain Private Blockchain". Date visited: 22/01/2020.](https://www.multichain.com/download/MultiChain-White-Paper.pdf)
- ["Multichain for Developers". Date visited: 22/01/2020.](https://www.multichain.com/developers/)

---

# Seminario 11 - Seminar 11

### Prerequisitos - Prerequisites

El software necesario para ejecutar el seminarios es:

The neccessary software to run the seminar is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used
- [MongoDB](https://www.mongodb.com) - La base de datos utilizada - The database used
- [Docker](https://www.docker.com/) - El sistema de contenedores utilizado- The container system used

---

### Instalar y ejecutar - Installing and executing

Para instalar y ejecutar el seminario los pasos necesarios son:

To install and execute the exercises the necessary steps are:

1. Crear y levantar el contenedor - Create and up the container

```
docker-compose up --build
```

---

### Trabajo realizado - Work done

Los pasos realizados han sido:

- Se contenirizó el código de Laboratorio
- Se crearon 3 contenedores que desplieguen el foro y su servidor
- Para mayor versatilidad se creó el archivo runner.js para levantar fácilmente la aplicación
- Posteriomente se configuró el Docker-compose.yml

```
services:
  forone:
    build:
      context: ./forum/
      args:
        otherhost: "tcp://forotwo:1016,tcp://forotree:1016"
    ports:
    - "1000:1000"
    - "1011:1011"
    - "1016:1016"
  forotwo:
    build:
      context: ./forum/
      args:
        otherhost: "tcp://forone:1016,tcp://forotree:1016"
    ports:
    - "1001:1000"
    - "1012:1011"
    - "1017:1016"
  forotree:
    build:
      context: ./forum/
      args:

```

### Bibliografía - Bibliography

- ["Docker". Date visited: 22/01/2020.](https://www.docker.com/)
