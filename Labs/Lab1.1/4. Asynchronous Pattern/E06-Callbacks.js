function extensa(a, b, c) {
  // Se asume que esta funci�n realizar�a alguna tarea
  // prolongada y compleja.
  var y = 1;
  for (var i=1; i<100000000; i++) {
    y = y * i;
  }
  console.log(y);

  // Cuando termine, invoca la funci�n c(), comunicando
  // el resultado.
  c(a+b);
}

extensa(4,5, function(x) {
  console.log("El resultado de 'extensa' "
  + "ha sido: " + x);
})

console.log("Terminamos");