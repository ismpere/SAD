
const efn= require('./eat_prom.js');


// Using promises

efn.eatBreakfast()
	.then(() => efn.eatLunch())
	.then(() => efn.eatDinner())
	.then(() => efn.eatDessert())
	.catch(function(err){
		console.log(err)
	})
