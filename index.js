const prompt = require("prompt-sync")();
const fs = require("fs");
const pause = () => prompt("(press ENTER to contine...)");
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

  static getInstance(_data) {
    return new user(
      _data.name,
      _data.lastname,
      _data.username,
      _data.email,
      _data.password,
      _data.rol,
    );
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

  static getInstance(_data) {
    return new product(_data.id, _data.name, _data.price, _data.cant);
  }
}

// Recover data - users
const pClients = [];
const pManagers = [];
JSON.parse(fs.readFileSync("./data/users/clients.json", "utf-8")).forEach((e) =>
  pClients.push(user.getInstance(e)),
);
JSON.parse(fs.readFileSync("./data/users/managers.json", "utf-8")).forEach(
  (e) => pManagers.push(user.getInstance(e)),
);

// Recover data - products
const pProducts = [];
JSON.parse(fs.readFileSync("./data/products.json", "utf-8")).forEach((e) =>
  pProducts.push(product.getInstance(e)),
);

// MENUS
signup = () => {
  let bucle = false;
  let name;
  let lastname;
  let username;
  let password;
  let email;
  let confirm;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |---ONLINE MARKETS -  SIGN UP---|
       *-------------------------------*
      `,
    );
    name = prompt(` --> Name: `);
    lastname = prompt(` --> Lastname: `);
    username = prompt(` --> Username: `);
    email = prompt(` --> Email: `);
    password = prompt(` --> Password: `);
    console.log("\n (Elementos guardados) ");
    confirm = prompt(` Confirmar nuevo usuario? 1(yes)/0(not) --> `);
    if (confirm == 1) {
      pClients.push(new user(name, lastname, username, email, password, 0));
      const jsonData = JSON.stringify(
        pClients.map((e) => e.getUser()),
        null,
        2,
      );
      fs.writeFileSync("./data/users/clients.json", jsonData, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });
      bucle = true;
      return true;
    } else {
      console.clear();
    }
  }
};

login = (tUser) => {
  let bucle = false;
  let username;
  let password;
  let opcion;
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
    if (tUser) {
      if (
        pManagers.some(
          (e) => e.getUsername() === username && e.getPassword() === password,
        )
      ) {
        bucle = true;
        return true;
      } else {
        console.log("\n (Error al digitar el usuario o la contrasena)");
        opcion = prompt(` Desea continuar? 1(yes)/0(not) --> `);
        if (opcion == 1) console.clear();
        else if (opcion == 0) return false;
        else return false;
      }
    } else {
      if (
        pClients.some(
          (e) => e.getUsername() === username && e.getPassword() === password,
        )
      ) {
        bucle = true;
        return true;
      } else {
        console.log("\n (Error al digitar el usuario o la contrasena)");
        opcion = prompt(` Desea continuar? 1(yes)/0(not) --> `);
        if (opcion == 1) console.clear();
        else if (opcion == 0) return false;
        else return false;
      }
    }
  }
};

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
       |     4. Return                 |                    
       *-------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        if (login(0)) {
          console.log("Inicio de sesion exitoso");
          pause();
        } else {
          console.log("No se pudo iniciar sesion");
          pause();
        }
        break;
      case 2:
        if (signup()) {
          console.log("Bienvendio :)");
          pause();
        } else {
          console.log("Raios :(");
          pause();
        }
        break;
      case 3:
        console.log("hola 3");
        pause();
        break;
      case 4:
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
       |     3. Return                 |                    
       *-------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        login(1);
        break;
      case 2:
        console.log("hola 2");
        pause();
        break;
      case 3:
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
        manager_menu();
        break;
      case 2:
        client_menu();
        break;
      case 3:
        console.log("Usted a salido del programa\n");
        pause();
        bucle = true;
        break;
      default:
        console.log("Opcion incorrecta\n");
        break;
    }
    console.clear();
  }
}

access_menu();
