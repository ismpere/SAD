function fibonacci(n) {
    return (n<2) ? 1 : fibonacci(n-2) + fibonacci(n-1);
}

console.log("Iniciando ejecución...");

// Esperar 10 ms para escribir un mensaje.
setTimeout( function() {
  console.log( "M1: Quiero escribir esto..." );
}, 10 );

// A esta función le cuesta más de 1 segundo
// ejecutarse...
var j = fibonacci(40);

function otroMensaje(m,u) {
    console.log( m + ": El resultado es: " + u );
}

// Pero M2 se escribe antes que M1 porque el 
// hilo "principal" rara vez se suspende...
otroMensaje("M2",j);

// M3 ya se escribe tras M1. 
setTimeout( function() {
 otroMensaje("M3",j);
}, 1 );

