const efn= require('./eat.js');


// Using callbacks

efn.eatBreakfast(function(){
	efn.eatLunch(function(){
		efn.eatDinner(function(){
			efn.eatDessert();
		});
		});	
});

