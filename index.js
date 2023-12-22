const prompt = require("prompt-sync")();
const fs = require("fs");
const pause = () => prompt("(press ENTER to contine...)");

// recover data - users
//const clients = JSON.parse(
//  fs.readFileSync("./data/users/clients.json", "utf-8"),
//);
//const managers = JSON.parse(
//  fs.readFileSync("./data/users/managers.json", "utf-8"),
//);
//
//// recover data - products
//const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

console.clear();

class user {
  #name;
  #lastname;
  #username;
  #email;
  #password;
  #rol;
  constructor(_name, _lastname, _username, _email, _password, _rol) {
    this.#name = _name;
    this.#lastname = _lastname;
    this.#username = _username;
    this.#email = _email;
    this.#password = _password;
    this.#rol = _rol;
  }
  // Getters
  getName() {
    return this.#name;
  }
  getLastname() {
    return this.#lastname;
  }
  getUsername() {
    return this.#username;
  }
  getEmail() {
    return this.#email;
  }
  getPassword() {
    return this.#password;
  }

  // Setters
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
      rol: this.#rol,
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
  // Getters
  getId() {
    this.#id;
  }
  getName() {
    this.#name;
  }
  getPrice() {
    this.#price;
  }
  getCant() {
    this.#cant;
  }

  // Setters
  setId(_id) {
    this.#id = _id;
  }
  setNombre(_name) {
    this.#name = _name;
  }
  setPrice(_price) {
    this.#price = _price;
  }
  setCant(_cant) {
    this.#cant = _cant;
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

//----->const arreglo = [
//----->  new user("Abel", "Ortega", "aberu029", "abelangel2001@outlook.com", "123", 0),
//----->  new user(
//----->    "Angel",
//----->    "Fuentes",
//----->    "angel029",
//----->    "angelfuentes@outlook.com",
//----->    "123",
//----->    0,
//----->  ),
//----->  new user(
//----->    "Eduardo",
//----->    "Holgado",
//----->    "eduardo029",
//----->    "eduardoholgado2001@outlook.com",
//----->    "123",
//----->    0,
//----->  ),
//----->  new user(
//----->    "Mario",
//----->    "Escudero",
//----->    "mario029",
//----->    "marioescudero2001@outlook.com",
//----->    "123",
//----->    0,
//----->  ),
//----->];
//----->
//----->arreglo.forEach((e) => console.log(e.getName()));

// MENUS

function login_menu() {
  let bucle = false;
  let username;
  let password;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |----ONLINE MARKETS - LOG IN----|
       *-------------------------------*
      `,
    );
    username = prompt(` --> Username: `);
    password = prompt(` --> Password: `);
  }
}

function client_menu() {
  let bucle = false;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |---WELCOME TO ONLINE MARKETS---|
       *-------------------------------*
       |     1. Log In                 |
       |     2. Sign Up                |
       |     3. Credits                |
       |     4. Exit                   |                    
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

function manager_menu() {
  let bucle = false;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |--ONLINE MARKETS - MANAGERS S--|
       *-------------------------------*
       |     1. Log In                 |
       |     2. Recover Account        |
       |     3. Exit                   |                    
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

function access_menu() {
  let bucle = false;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |---ONLINE MARKETS - ACCESS ----|
       *-------------------------------*
       |     1. Managers Access        |
       |     2. Clients Access         |
       |     3. Exit                   |                    
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

// test
// leer archivos
//const fs = require("fs");
//const datos = fs.readFileSync("./data/users/clients.json", "utf-8");
//const personas = JSON.parse(datos);
////console.log(personas);
//
//// escritura
//const persona = {
//  name: "Leonardo",
//  lastname: "Gabriel",
//  username: "Leo",
//  email: "leonardo29@outlook.com",
//  password: "clavekdkd3",
//  rol: 0,
//};
//personas.push(persona);
//const jsonData = JSON.stringify(personas, null, 2);
//fs.writeFileSync("./data/users/clients.json", jsonData, (error) => {
//  if (error) {
//    console.log(`error: ${error}`);
//  } else {
//    console.log("Archivo json generado correctamente");
//  }
//});
