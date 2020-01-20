// Constructor para Punto.
function Punto(x,y) {
  this.x = x;
  this.y = y;
}

// Constructor para Segmento.
function Segmento(p1,p2) {
  this.p1 = p1;
  this.p2 = p2;
}

// Utilizamos su prototipo para
// añadir el método longitud().
// Este método no tiene parámetros.
Segmento.prototype.longitud = function() {
  var xd, yd;
  xd = this.p2.x - this.p1.x;
  yd = this.p2.y - this.p1.y;
  return Math.sqrt( xd*xd + yd*yd );
}

var punto1 = new Punto(10,0);
var punto2 = new Punto(5,5);
var se1 = new Segmento(punto1,punto2);
var punto3 = new Punto(3,6);
var se2 = new Segmento(punto2,punto3);

console.log("La longitud del segmento 'se1' es: " + se1.longitud() );
console.log("La longitud del segmento 'se2' es: " + se2.longitud() );
