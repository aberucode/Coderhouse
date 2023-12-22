const prompt = require("prompt-sync")();
const pause = () => prompt("(press ENTER to contine...)");
console.clear();

class user {
  #name;
  #lastname;
  #username;
  #email;
  #password;
  constructor(_name, _lastname, _username, _email, _password) {
    this.#name = _name;
    this.#lastname = _lastname;
    this.#username = _username;
    this.#email = _email;
    this.#password = _password;
  }
  setName(_name) {
    this.#name = _name;
  }
  setLastname(_lastname) {
    this.#lastname = _lastname;
  }
  setUsername(_username) {
    this.#username = _username;
  }
  setEmail(_email) {
    this.#email = _email;
  }
  setPassword(_password) {
    this.#password = _password;
  }
  getUser() {
    return {
      name: this.#name,
      lastname: this.#lastname,
      username: this.#username,
      email: this.#email,
      password: this.#password,
    };
  }
}

class product {
  #id;
  #name;
  #price;
  #cant;
  constructor(_id, _name, _price, _cant) {
    this.#id = _id;
    this.#name = _name;
    this.#price = _price;
    this.#cant = _cant;
  }
  setId(_id) {
    this.#id = _id;
  }
  setNombre(_id) {
    this.#id = _id;
  }
  setId(_id) {
    this.#id = _id;
  }
  setId(_id) {
    this.#id = _id;
  }
  getProduct() {
    return {
      id: this.#id,
      name: this.#name,
      price: this.#price,
      cant: this.#cant,
    };
  }
}

function menu_acceso() {
  let bucle = false;
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
