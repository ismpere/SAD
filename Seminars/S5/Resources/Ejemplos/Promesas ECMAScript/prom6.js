

const efn= require('./eat_prom.js');


// Using promises

async function run_ops(){
	try {
		await efn.eatBreakfast()
		await efn.eatLunch()
		await efn.eatDinner()
		efn.eatDessert();
	} catch(err) {
		console.log(err);
	}
} 

run_ops();