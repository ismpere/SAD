var zmq = require('zeromq');


var requester = zmq.socket('req');


  
//requester.connect("tcp://localhost:5555");
  
process.on('SIGINT', function() {
	requester.close();
  });

exports.Start = function (host) {
	requester.connect(host);
}
exports.Close=function(){
	
}


var callbacks = {} // hash of callbacks. Key is invoId
var invoCounter = 0; // current invocation number is key to access "callbacks".

//
// When data comes from server. It is a reply from our previous request
// extract the reply, find the callback, and call it.
// Its useful to study "exports" functions before studying this one.
//
requester.on("message", function(data) {
	//console.log ('data comes in: ' + data.toString());
	var reply = JSON.parse (data.toString());
	function CallTheBack(reply,key){
		var cb=callbacks [reply.invoId];
		if(key){
			var value=reply[key];
			cb(value); // call the stored callback, one argument
		}else cb();
		delete callbacks [reply.invoId]; // remove from hash
	}
	
	//console.log ('We received a reply for: ' + reply.what );
	switch (reply.what) {
		// TODO complete list of commands
		case 'add user':
				CallTheBack(reply,'exists');
			break;
		case 'add subject':
				CallTheBack(reply,'id');
			break;
		case 'get subject list':
				CallTheBack(reply,'list');
			break;
		case 'get user list':
				CallTheBack(reply,'list');
			break;
		case 'login':
				CallTheBack(reply,'ok');
			break;
		case 'add private message':
				CallTheBack(reply,null);
			break;
		case 'get private message list':
				CallTheBack(reply,'list');
			break;
		case 'get subject':
				CallTheBack(reply,'id');
			break;
		case 'add public message':							
				CallTheBack(reply,null);
				break;
		case 'get public message list':
				CallTheBack(reply,'list');
			break;
		default:
			console.log ("Panic: we got this: " + reply.what);
			break;
	}
});




//
// on each invocation we store the command to execute (what) and the invocation Id (invoId)
// InvoId is used to execute the proper callback when reply comes back.
//
function Invo (str, cb) {
	this.what = str;
	this.invoId = ++invoCounter;
	callbacks[invoCounter] = cb;
}

//
//
// Exported functions as 'dm'
//
//

exports.getPublicMessageList = function  (sbj, cb) {
	var invo = new Invo ('get public message list', cb);	
	invo.sbj = sbj;
	requester.send(JSON.stringify(invo));
}

exports.getPrivateMessageList = function (u1, u2, cb) {
	invo = new Invo ('get private message list', cb);
	invo.u1 = u1;
	invo.u2 = u2;
	requester.send(JSON.stringify(invo));
}

exports.getSubjectList = function (cb) {
	requester.send(JSON.stringify(new Invo ('get subject list', cb)));
}

// TODO: complete the rest of the forum functions.

// true if already exists
exports.addUser = function (u,p, cb) {
	invo = new Invo ('add user', cb);
	invo.u = u;
	invo.p = p;
	requester.send(JSON.stringify(invo));
}

// Adds a new subject to subject list. Returns -1 if already exists, id on success
exports.addSubject = function (s, cb) {
	invo = new Invo ('add subject', cb);
	invo.s = s;
	requester.send(JSON.stringify(invo));
}


exports.getUserList = function (cb) {
	invo = new Invo ('get user list', cb);
	requester.send(JSON.stringify(invo));
}

// Tests if credentials are valid, returns true on success
exports.login = function (u, p, cb) {
	invo = new Invo ('login', cb);
	invo.u = u;
	invo.p=p;
	requester.send(JSON.stringify(invo));
}

exports.addPrivateMessage = function (msg, cb){
	invo = new Invo ('add private message', cb);
	invo.msg = msg;
	requester.send(JSON.stringify(invo));
}


exports.getSubject = function(sbj, cb) {
	invo = new Invo ('get subject', cb);
	invo.sbj = sbj;
	requester.send(JSON.stringify(invo));
}

// adds a public message to storage
exports.addPublicMessage = function (msg, cb)
{
	invo = new Invo ('add public message', cb);
	invo.msg = msg;
	requester.send(JSON.stringify(invo));
}






