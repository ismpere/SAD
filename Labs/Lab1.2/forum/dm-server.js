var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

// Messages are objects with some specific fields
// the message itself, who sends, destination, whether is private message, timestamp 
function Message(msg, from, to, isPrivate, ts) {
    this.msg = msg; this.from = from; this.isPrivate = isPrivate; this.to = to; this.ts = ts;
}

function Post(msg, from, ts) {
    this.msg = msg; this.from = from; this.ts = ts;
}

var subjects = { id0: 'Introduccion al foro', id1: 'Literatura', id2: 'Futbol' };
var users = {
    Foreador: '1234',
    mudito: '1234',
    troll: '1234',
    josocxe: '1234'
};
var publicMessages = {
    id0: [new Post('primer mensaje', 'Foreador', new Date()),
    new Post('SEGUNDO mensaje', 'Foreador', new Date())],
    id2: [new Post('primer mensaje futbolero', 'josocxe', new Date())]
};

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection

server = net.createServer(function (sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('\nCONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {
        console.log(data.toString());
        var cmd = JSON.parse(data.toString());
        var content;
        switch (cmd.query) {
            case 'userList':
                console.log("We must send the list of users....")
                content = getUserList();
                break;
            case 'subjectList':
                console.log("We must send the list of subjects....")
                content = getSubjectList();
                break;
            // case 'subject':
            //     console.log("We must send the list of subjects....")
            //     content = getSubject(cmd.args);
            //     break;
            case 'login':
                console.log("We must test the login....")
                content = login(cmd.args.user, cmd.args.pass);
                break;
            case 'addPublicMessage':
                console.log("We must add the public message....")
                content = addPublicMessage(cmd.args);
                break;
            case 'addSubject':
                console.log("We must add the subject....")
                content = addSubject(cmd.args);
                break;
            case 'getPublicMessageList':
                console.log("We must sent the message list....")
                content = getPublicMessageList(cmd.args);
                break;
            case 'addUser':
                console.log("We must add the user....")
                content = login(cmd.args.user, cmd.args.pass);
                break;
            default:
                console.log('Argumento erróneo: messages, users, subjects');
                process.exit(1);
        }
        sock.write(content);
        sock.end();

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function (data) {
        console.log('Connection closed');
    });

});

function getSubjectList() { return JSON.stringify(subjects); }
function getUserList() {
    var userlist = [];
    for (var i in users) userlist.push(i);
    return JSON.stringify(userlist);
}
function getSubject(sbj) {
    for (var i in subjects) {
        if (subjects[i] == sbj) return i;
    }
    return -1; // not found
}
function login(u, p) {
    var lower = u.toLowerCase();
    for (var i in users) {
        if (i.toLowerCase() == lower) { return (users[u] == p).toString(); }
    }
    return "false"; // user not found
}

// adds a public message to storage
function addPublicMessage(msg) {
    var post = new Post(msg.msg, msg.from, msg.ts);
    var ml = publicMessages[msg.to];
    if (!ml) publicMessages[msg.to] = [];
    publicMessages[msg.to].push(msg);
    return JSON.stringify(post);
}

function addSubject(s) {
    var lower = s.toLowerCase();
    for (var i in subjects) {
        if (subjects[i].toLowerCase() == lower) { return "-1"; }
    }
    var len = Object.keys(subjects).length;
    var idlen = 'id' + len;
    subjects[idlen] = s;
    return idlen.toString();
}

function getPublicMessageList(sbj) {
    var idx = getSubject(sbj);
    var ml = [];
    if (idx != -1) {
        ml = publicMessages[idx];
    }
    var messageList = publicMessages[sbj];
    if (messageList === undefined) {
        messageList = [];
    }
    return JSON.stringify(messageList);
}

function addUser(u, p) {
    var lower = u.toLowerCase();
    var exists = false;
    for (var i in users) {
        if (i.toLowerCase() == lower) { exists = true; break; }
    }
    if (!exists) users.push({ u: p });
    return (!exists).toString();
}

server.listen(PORT, HOST);
console.log('Server listening on ' + HOST + ':' + PORT);
