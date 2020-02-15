const efn= require('./eat_prom.js');


// Using callbacks

efn.eatBreakfast().then(function() {
	return efn.eatLunch();
}).then(function(){
	return efn.eatDinner();
}).then(function(){
	return efn.eatDessert();
})

