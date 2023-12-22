const prompt = require("prompt-sync")();
console.clear();

class product {
  #id;
  #nombre;
  #precio;
  #cantidad;
  constructor(_id, _nombre, _precio, _cantidad) {
    this.#id = _id;
    this.#nombre = _nombre;
    this.#precio = _precio;
    this.#cantidad = _cantidad;
  }
}

function menu_acceso() {
  let bucle = false;
  const pause = () => prompt("(press ENTER to contine...)");
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |--BIENVENIDO A ONLINE MARKETS--|
       *-------------------------------*
       |     1. Iniciar Sesion         |
       |     2. Registrarse            |
       |     3. Creditos               |
       |     4. Salir                  |                    
       *-------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        console.log("hola");
        pause();
        break;
      case 2:
        console.log("hola 2");
        pause();
        break;
      case 3:
        console.log("hola 3");
        pause();
        break;
      case 4:
        console.log("salir");
        pause();
        bucle = true;
        break;
      default:
        break;
    }
    console.clear();
  }
}

menu_acceso();
