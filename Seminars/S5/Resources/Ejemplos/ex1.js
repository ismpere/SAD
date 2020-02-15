// synchronize multiple callbacks

var Barrera = 3;
function bajaBarrera() { 
		Barrera--; 
		if (!Barrera)  {
			process.emit('barreraBajo');
		}
}
setTimeout(function uno() {console.log("funcion uno"); bajaBarrera();},1000);
setTimeout(function dos() {console.log("funcion dos"); bajaBarrera();},2000);
setTimeout(function tres() {console.log("funcion tres"); bajaBarrera();},3000);


process.on('barreraBajo', function() {console.log('se terminaron los tres');})