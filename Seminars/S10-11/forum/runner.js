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

///consisten hashing.. implementar numero de servidores * numero de nodos

//crear dos foros
runClient("foro1",1000,'tcp://127.0.0.1:1011','tcp://127.0.0.1:1016' );
runClient("foro2",1001,'tcp://127.0.0.1:1012','tcp://127.0.0.1:1017' );
runClient("foro3",1002,'tcp://127.0.0.1:1013','tcp://127.0.0.1:1018' );
 
//crear servers
runServer("server1",'tcp://*:1011','tcp://127.0.0.1:1016', 'tcp://127.0.0.1:1017,tcp://127.0.0.1:1018'  );
runServer("server2",'tcp://*:1012','tcp://127.0.0.1:1017', 'tcp://127.0.0.1:1016,tcp://127.0.0.1:1018' );
runServer("server3",'tcp://*:1013','tcp://127.0.0.1:1018', 'tcp://127.0.0.1:1016,tcp://127.0.0.1:1017'  );



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
rl.question('exit?  ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you : ${answer}`);

  rl.close();
});*/