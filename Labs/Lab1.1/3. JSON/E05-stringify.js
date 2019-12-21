// Constructor de la clase PolígonoRegular.

function PoligonoRegular(nl,ll) {

  this.numLados = nl;

  this.longitudLado = ll;

}


// Método perimetro() para todo PolígonoRegular.

PoligonoRegular.prototype.perimetro = function() {

  return this.numLados * this.longitudLado;

}


// El constructor para la clase Cuadrado.

function Cuadrado(ll) {

  this.numLados = 4;

  this.longitudLado = ll;

}


// Heredamos todos los atributos y métodos de PolígonoRegular

Cuadrado.prototype = Object.create(PoligonoRegular.prototype);

Cuadrado.prototype.constructor = Cuadrado;


// Creamos una instancia de Cuadrado, con lado 6.

ejemplo2 = new Cuadrado(6);


// La clase Cuadrado tendrá, además, el método superficie().

Cuadrado.prototype.superficie = function() {

  return this.longitudLado * this.longitudLado;

}


// Comprobamos que todo funcione correctamente.

console.log( "El perímetro de un cuadrado de lado 6 es: " +

  ejemplo2.perimetro() 
);

console.log( "y su superficie es: " + ejemplo2.superficie() );


var s = JSON.stringify(ejemplo2);
console.log(s);