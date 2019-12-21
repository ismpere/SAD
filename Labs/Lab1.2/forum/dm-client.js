var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

exports.getPublicMessageList = function (to, callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "getPublicMessageList", "args": to };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var messageList = data.toString();
		callback(messageList);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.addSubject = function (sbjStr, callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "addSubject", "args": sbjStr };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var id = data.toString();
		callback(id);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.getSubjectList = function (callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "subjectList", "args": "" };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var elems = data.toString().split('\n');
		for (i = 0; i < elems.length; i++) {
			console.log(elems[i]);
		}
		callback(elems);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.getUserList = function (callback) {

	var client = new net.Socket();

	// Connect to get user list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "userList", "args": "" };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var elems = data.toString().split('\n');
		for (i = 0; i < elems.length; i++) {
			console.log(elems[i]);
		}
		callback(elems);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.getSubject = function (sbj, callback) {

	var client = new net.Socket();

	// Connect to get user list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "subject", "args": sbj };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var elems = data.toString().split('\n');
		for (i = 0; i < elems.length; i++) {
			console.log(elems[i]);
		}
		console.log('Data: ' + data);
		console.log('Elems: ' + elems);
		callback(elems);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.login = function (u, p, callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "login", "args": { "user": u, "pass": p } };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var loginSuccess = (data == 'true');
		callback(loginSuccess);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.addPublicMessage = function (msgStr, callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "addPublicMessage", "args": msgStr };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		callback();
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}

exports.login = function (u, p, callback) {

	var client = new net.Socket();

	// Connect to get subject list
	client.connect(PORT, HOST, function () {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// Write the command to the server 
		var msg = { "query": "addUser", "args": { "user": u, "pass": p } };
		client.write(JSON.stringify(msg));
	});

	// Add a 'data' event handler for the client socket
	// data is what the server sent to this socket
	client.on('data', function (data) {
		var addUserSuccess = (data == 'true');
		callback(addUserSuccess);
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function () {
		console.log('Connection closed');
	});
}