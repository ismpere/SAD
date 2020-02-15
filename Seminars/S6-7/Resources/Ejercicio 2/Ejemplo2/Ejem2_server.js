

// Currency update server in node.js
// Binds PUB socket to tcp://*:5556
// Publishes random currency updates

var zmq = require('zmq')
  , publisher = zmq.socket('pub');
  
var currencies = [ { Name:'US Dollar', Abreviation:'USD', Rate: 1.10},
                   { Name:'British Pound', Abreviation:'GBP', Rate: 0.71},
                   { Name:'Canadian Dollar', Abreviation:'CAD', Rate: 1.44},
                   { Name:'Australian Dollar', Abreviation:'AUD', Rate: 1.54},
                   { Name:'Swiss Franc', Abreviation:'CHF', Rate: 1.09}];
                   

publisher.bindSync("tcp://*:5556");


function rand(upper, extra) {
  var num = Math.abs(Math.round(Math.random() * upper));
  return num + (extra || 0);
};


// Sends the inicial rate
currencies.forEach(function(elem) {
   publisher.send(elem.Abreviation, zmq.ZMQ_SNDMORE);
   publisher.send(elem.Rate.toString());
});
while (true) {
   var selected = rand(currencies.length-1);
   console.log ('valor:'+selected+' - '+currencies[selected].Abreviation);
   console.log ('valor:'+selected+' - '+currencies[selected].Rate);
   variation = (0.5 - Math.random())/10;
   currencies[selected].Rate *= (1+variation); 
   console.log ('valor:'+selected+' - '+currencies[selected].Rate);
   publisher.send(currencies[selected].Abreviation, zmq.ZMQ_SNDMORE);
   publisher.send(currencies[selected].Rate.toString());
   
}
