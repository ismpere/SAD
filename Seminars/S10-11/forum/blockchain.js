let multichain = require("multichain-node")({
    port: 7741,
    host: '127.0.0.1',
    user: "sadcahin",
    pass: "sadcahin"
});

module.export ={
    CreateRoom:function(nombre,details){
        return new Promise((resolve,reject)=>{ 
            console.log("creating Room "+nombre);           
                multichain.create({type:"stream",name:nombre,open:true,details:details||{}})
                .then(stream=>{
                    resolve(true,stream);
                })
                .catch(error=>{
                    reject(error);
                })
            
        });
    },
    SubscribeRoom:function(roomname){
        return multichain.subscribe({stream:roomname});
    },
    PublishMessage:function(roomname,id,message){
        onsole.log("publicando en Room "+roomname+"-"+message);   
        return multichain.publish({stream:roomname, key:id,data:{text:message}});
    },
    UnsubscribeRoom:function(roomname,remove=false){
        return multichain.unsubscribe({stream:roomname,purge=remove});
    }
}

