# Seminario 4 - Seminar 4

Express & Websockets

---

### Prerequisitos - Prerequisites

El software necesario para ejecutar el seminarios es:

The neccessary software to run the seminar is:

- [Node](https://nodejs.org) - El entorno de ejecución utilizado - The execution environment used
- [Express](https://expressjs.com) - La infraestructura web utilizada - The web infraestructure used

---

### Instalar y ejecutar - Installing and executing

Para instalar y ejecutar el seminario los pasos necesarios son:

To install and execute the exercises the necessary steps are:

1. Instalar - Install

```
npm install
```

2. Ejecutar - Execute

```
node index.js
```

3. Probar el seminario - Test the seminar

&emsp;[http://localhost:3000/](http://localhost:3000/)

---

### Tarea principal - Main task

Realizar sobre el código las siguientes modificaciones:

Make the following modifications on the code:

##### - Transmitir un mensaje a los usuarios conectados cuando alguien se conecta o desconecta <br> - Broadcast a message to connected users when someone connects or disconnects:

This have been done replacing the broadcast line, using the way to broadcast the message to the rest of users. The socket.broadcast way avoid sending the message to the sending user.

```
io.sockets.emit -> socket.broadcast.emit
```

---

##### - Añadir soporte para nombres de usuario <br> - Add support for nicknames

This have been done in two steps:

- Adding a login page before showing the message command line. In this step we save the username in a socket variable inside the login method:

```
socket.username = username;
```

- Adding the login in the message properties. This allows to show the nickname in the received message:

```
socket.on("chat message", function(msg) {
    var msjJson = {
      username: socket.username,
      msg: msg
    };
    ...
    socket.broadcast.emit("chat message", msjJson);
});
```

---

##### - No envíe el mismo mensaje al usuario que lo envió él mismo. En su lugar, agregue el mensaje directamente tan pronto como presione enter <br> - Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter

This have been done in two steps:

- Using the same way than in the first task, replacing the message sending line to avoid send the message to the sender:

```
io.sockets.emit("chat message", msjJson); -> socket.broadcast.emit("chat message", msjJson);


socket.on("chat message", function(msg) {
    ...
    socket.broadcast.emit("chat message", msjJson);
});
```

- Adding the message directly when you press send before sending the chat message. This add a new row in the message list.

```
$("form").submit(function(e) {
    ...
    addMessage(data);
    socket.emit("chat message", msgStr);
    $("#m").val("");
    ...
}

const addMessage = data => {
    var typingClass = data.typing ? "typing" : "";
    var strMsg = data.typing ? "is typing..." : data.msg;
    $("#messages").append(
        $('<li class="message">')
        .text(data.username + ": " + strMsg)
        .data("username", data.username)
        .addClass(typingClass)
    );
};
```

---

### Tarea opcional - Optional task

Realizar sobre el código las siguientes modificaciones:

Make the following modifications on the code:

##### Add “{user} is typing” functionality

This have been made in two parts:

- In index.html, we add a listener to the input message:

```
$inputMessage.on("input", () => {
    updateTyping();
});
```

- Before that, we manage the updates to input and send the necessary messages to index.js. <br>
  When the user starts typing, a typing signal is sent. After a certain time, the method send the stop typing signal.

```
const TYPING_TIMER_LENGTH = 400;

const updateTyping = () => {
    if (!typing) {
        typing = true;
        socket.emit("typing");
    }
    lastTypingTime = new Date().getTime();

    setTimeout(() => {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
            socket.emit("stop typing");
            typing = false;
        }
    }, TYPING_TIMER_LENGTH);
};
```

- In index.js, we recieve this signals and process it:

```
socket.on("typing", () => {
    socket.broadcast.emit("typing", {
        username: socket.username
    });
});


socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
        username: socket.username
    });
});
```

- Finally, again in index.html, we manage the typing messges to add or remove the typing message from the message list:

```
socket.on("typing", data => {
    addChatTyping(data);
});

socket.on("stop typing", data => {
    removeChatTyping(data.username);
});


const addChatTyping = data => {
    if (getTypingMessages(data.username).length == 0) {
        data["typing"] = true;
        addMessage(data);
    }
};

const removeChatTyping = username => {
    getTypingMessages(username).fadeOut(function() {
        $(this).remove();
    });
};

const getTypingMessages = username => {
    return $(".typing").filter(function(i) {
        return $(this).data("username") === username;
    });
};
```

---

#### Show who’s online

We can divide the work in different parts:

- First of all, when a new client is connected, the username is stored using an array of clients:

```
var clients = [];

socket.on("add user", username => {
    if (addedUser) return;
    ...
    clients.push(username);
    ...
}
```

- Before that, we create a new column on the html to show the user list:

```
.column {
    float: left;
    width: 50%;
}

.row:after {
    content: "";
    display: table;
    clear: both;
}

<div class="chatArea">
    <div class="row">
        <h2 class="title" id="lblUsername"></h2>
    </div>
    <div class="row">
        <div class="column">
            <h2 class="title">Messages</h2>
            <ul class="custom-list" id="messages"></ul>
        </div>
        <div class="column">
            <h2 class="title" id="lblUsers"></h2>
            <ul class="custom-list" id="users"></ul>
        </div>
    </div>
</div>
```

- When a new user login, we recieved the user list (without repeated usernames) and fill the user column:

```
// index.js part
const getClients = () => {
    return Array.from(new Set(clients));
};

socket.on("add user", username => {
    ...
    socket.emit("login", {
      clients: getClients()
    });
    ...
}

// index.html part
socket.on("login", data => {
    data.clients.forEach(client => addUser(client));
    updateUsersLabel(data.clients.length);
});

const addUser = username => {
    $("#users").append(
        $("<li>")
        .text(username)
        .data("username", username)
        .addClass("user")
    );
};

function updateUsersLabel(users) {
    document.getElementById("lblUsers").innerHTML =
        "Users ( " + users + " )";
}
```

- Then, in index.js, we manage the connected/disconnected users sending the signals to the html.<br>
  This functions manage if some user is connected with more than one browser (same username), the signals are only sent when he disconects from all browsers or connects from the first browser:

```
socket.on("add user", username => {
    if (addedUser) return;

    var preexist = clients.includes(username);
    ...
    socket.username = username;
    clients.push(username);
    ...

    if (!preexist) {
        socket.broadcast.emit("user connected", {
            username: socket.username,
            users: getClients().length
        });
    }
});

socket.on("disconnect", function() {
    if (addedUser) {
        clients.splice(clients.indexOf(socket.username), 1);
        ...

        if (!clients.includes(socket.username)) {
            socket.broadcast.emit("user disconnected", {
                username: socket.username,
                users: getClients().length
            });
        }
    }
});

```

- Finally, when the signal of connect/disconnect is sent, the signal is processed on index.html to inform from the connection events:

```
socket.on("user connected", function(data) {
    if (data.username !== username) {
        addUser(data.username);
        updateUsersLabel(data.users);
        $("#messages").append(
            $("<li>").text(data.username + " is now connected!")
        );
    }
});

socket.on("user disconnected", function(data) {
    if (data.username !== username) {
        deleteUser(data.username);
        updateUsersLabel(data.users);
        $("#messages").append(
            $("<li>").text(data.username + " is disconnected")
        );
    }
});
```

---

#### Add private messaging

Not completed

---

### Bibliografía - Bibliography

- [TutorialsPoint. "Socket.IO - Broadcasting". Date visited: 01/01/2020.](https://www.tutorialspoint.com/socket.io/socket.io_broadcasting.htm)
- [Socket.io. "Socket.IO - Chat". Date visited: 01/01/2020.](https://socket.io/demos/chat/)
- [StackOverflow. "Stop form refreshing page on submit". Date visited: 01/01/2020.](https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit)
- [StackOverflow. "Get data by socket.io in html page". Date visited: 01/01/2020.](https://stackoverflow.com/questions/40426435/get-data-by-socket-io-in-html-page)
