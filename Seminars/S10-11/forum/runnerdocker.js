const {exec,spawn} = require('child_process');
const readline = require('readline');



function runScript(scriptPath,parameters, callback) {
	
	parameters=parameters||[];
	parameters.splice(0,0,scriptPath);
	spawn('node',parameters);
	//spawn("cmd.exe")
}

function runServer(name,linkrequest,linksubscribe,linksothers){
	// execute  servers
	console.log("iniciando server "+name);
	runScript('./dmserverzmq.js',[linkrequest,linksubscribe,linksothers], function (err) {
		if (err) throw err;
		console.log('finished running server '+name);
	});
}

function runClient(name,port,serverrequest,serversubscribe){
	// execute  clients
	console.log("iniciando "+name);
	runScript('./forum.js',[port,serverrequest,serversubscribe], function (err) {
		if (err) throw err;
		console.log('finished running '+name);
	});
}


var serverstosubscribe=process.argv[2];
console.log("... se suscribira a los servidores "+serverstosubscribe);
//crear  foro (nombre,puertoescucha,puertoreq,puertosubs)
runClient("*foro1",1000,'tcp://127.0.0.1:1011','tcp://127.0.0.1:1016' );

//crear server (nombre,puertoescucha,puertopub,puertosubs)
runServer("*server1",'tcp://*:1011','tcp://*:1016', serverstosubscribe  );



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

