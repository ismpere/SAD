var zmq = require('zeromq');

var fs = require('fs');
var util = require('util');
var dm = require ('./dm.js');

var portresponder=process.argv[2];//
var portpublisher=process.argv[3];
var portssubscriber=process.argv[4];
console.log("iniciando server ");

var name="server"+portresponder.substr(portresponder.indexOf(':',4)+1,4);
var log_file = fs.createWriteStream('./debug'+name+'.log', {flags : 'w'});
var log_stdout = process.stdout;

/*console.log = function(d) { //

  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};*/

console.log(name);

/**
 * Responder
 */
var responder = zmq.socket('rep');
responder.on('message', function(data) {
        
        //console.log('request comes in...' + data);
        var str = data.toString();
        var invo = JSON.parse (str);
        var cmd=invo;
        var isasync=false;
        //console.log('request is:' + invo.what + ':' + str);

        var reply = {what:invo.what, invoId:invo.invoId};
        switch (invo.what) {
            // TODO: complete all forum functions
            case 'add user':
                reply.exists = dm.addUser(cmd.u,cmd.p);
			    break;
            case 'add subject':
                reply.id = dm.addSubject(cmd.s);
                break;
            case 'get subject list':
                reply.list = dm.getSubjectList();
                break;
            case 'get user list':
                reply.list = dm.getUserList();
                break;
            case 'login':
                reply.ok = dm.login (cmd.u,cmd.p);
                break;
            case 'add private message':
                isasync=true;
                dm.addPrivateMessage(cmd.msg)
                .then(result=>{
                    responder.send(JSON.stringify(reply));
                });                
                break;
            case 'get private message list':
                reply.list = dm.getPrivateMessageList(cmd.u1,cmd.u2);
                break;
            case 'get subject':
                reply.id = dm.getSubject (cmd.sbj);
                break;
            case 'add public message':
                dm.addPublicMessage(cmd.msg);            
                PublishNewForumMessages(cmd.msg);
                break;
            case 'get public message list':
                reply.list = dm.getPublicMessageList(cmd.sbj);
                break;
        }
       if(!isasync) responder.send(JSON.stringify(reply));
});

responder.bind(portresponder, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on…"+portresponder);
    }
});

/**
 * Publisher
 * 
 */
publisher = zmq.socket('pub');
function PublishNewForumMessages(nuevos){

    publisher.send(['webserver',JSON.stringify(nuevos)]);
    //retardo
    setTimeout(()=>{
        console.log("reportar a subscribers");
        console.log('publicando'+JSON.stringify(nuevos));
        publisher.send(['checkpoint',JSON.stringify(nuevos)]);
    },5);    
}
publisher.bindSync(portpublisher);



/**
 * subscriber
 * 
 */
//console.log(process.argv);
subscriber = zmq.socket('sub');

subscriber.subscribe("checkpoint");
subscriber.on('message', function(data,nuevos) {
    nuevos=nuevos.toString();
    console.log("llegaron mensaje "+nuevos);
    dm.addPublicMessage(JSON.parse(nuevos));
    publisher.send(['webserver',nuevos]);
});
var subscriberconections=[];
if(portssubscriber){
    console.log('suscribiendo..');
    var servers=portssubscriber.split(',');
    servers.forEach(serv => {
        console.log('suscribiendo a '+serv);
        subscriber.connect(serv);
    });    
}




process.on('SIGINT', function() {
    responder.close();
});


function retardo(n) {
    time = new Date().getTime();
    time2 = time + n;
    while (time < time2) {
    time = new Date().getTime();
    }
    }