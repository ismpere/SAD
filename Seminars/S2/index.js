// Import modules
//const cartController  = require('./cart');
const cartController = require("./db");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

var cod = 1;

readline.question(
  `\n Introduce 1 para agregar un producto: \n Introduce 2 para borrar un producto: \n`,
  accion => {
    if (accion == 1) {
      readline.question(
        `\n ¿Qué producto deseas agregar al carrito? `,
        desc => {
          var document = { cod: cod, desc: desc };
          console.log(document);
          cartController.add(document);
          cod++;
          readline.close();
        }
      );
    } else {
      readline.question(
        `\n ¿Qué producto deseas borrar del carrito? `,
        desc => {
          cartController.del(desc);
          cod++;
          readline.close();
        }
      );
    }
  }
);

readline.on("close", function() {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
