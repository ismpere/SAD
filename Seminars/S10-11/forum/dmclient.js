var dm = require ('./dm_remote.js');

var args=process.argv.slice(2);

var srvstring=args[0].split(':');
var HOST = srvstring[0];
var PORT = srvstring[1];

var funckey=args[1];
var params=args.slice(2);

function Finish(){
	dm.Close();
}

var funcdic={
	'add user':'addUser',
	'add subject':'addSubject',
	'get subject list':'getSubjectList',
	'get user list':'getUserList',
	'login':'login',
	'add private message':'addPrivateMessage',
	'get private message list':'getPrivateMessageList',
	'get subject':'getSubject',
	'add public message':'addPublicMessage',
	'get public message list':''
};



dm.Start(HOST, PORT, function () {
		// Write te command to the server 
		var func=funcdic[funckey]||funckey;
		console.log("calling "+func+ "["+typeof(dm[func])+"]");
		
	if(dm[func] && typeof(dm[func])=='function'){
		params.push(()=>{
			console.log (func+"->here it is:")
			console.log (JSON.stringify(arguments));
			Finish();	
		});
		dm[func].apply(dm,params);
	}else Finish();
});
