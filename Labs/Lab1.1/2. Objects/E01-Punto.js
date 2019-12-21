// Constructor para Punto.
function Punto(x,y) {
  this.x = x;
  this.y = y;
}

var punto1 = new Punto(10,0);

// También se puede utilizar un bucle "for/in".
for(var p in punto1) {
  console.log( "Propiedad " + p + ". Valor: " + punto1[p] );
}
