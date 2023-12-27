const prompt = require("prompt-sync")();
const fs = require("fs");
const pause = () => prompt("(press ENTER to contine...)");
console.clear();
let user_idx = 0;
let user_id = "";

class history {
  #name;
  #lastname;
  #currentdate;
  #operation;
  #product;
  constructor(_name, _lastname, _currentdate, _operation, _product) {
    this.#name = _name;
    this.#lastname = _lastname;
    this.#currentdate = _currentdate;
    this.#operation = _operation;
    this.#product = _product;
  }

  // Getters
  getName() {
    return this.#name;
  }
  getLastname() {
    return this.#lastname;
  }
  getCurrentdate() {
    return this.#currentdate;
  }
  getOperation() {
    return this.#operation;
  }
  getProduct() {
    return this.#product;
  }

  getHistory() {
    return {
      name: this.#name,
      lastname: this.#lastname,
      currentdate: this.#currentdate,
      operation: this.#operation,
      product: this.#product,
    };
  }

  static getInstance(_data) {
    return new history(
      _data.name,
      _data.lastname,
      new Date(_data.currentdate),
      _data.operation,
      _data.product,
    );
  }
}

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
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  getPrice() {
    return this.#price;
  }
  getCant() {
    return this.#cant;
  }

  // Setters
  setId(_id) {
    this.#id = _id;
  }
  setName(_name) {
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

// Recover data - specific client
let pClientHistory = [];
let pClientFavs = [];
let pClientCart = [];
try {
  // prettier-ignore
  JSON.parse(fs.readFileSync("./data/users/clients.json", "utf-8")).forEach((e) => 
    pClients.push(user.getInstance(e)),
  );
} catch (error) {
  console.log("Sin clientes registrados");
}
try {
  // prettier-ignore
  JSON.parse(fs.readFileSync("./data/users/managers.json", "utf-8")).forEach((e) => 
    pManagers.push(user.getInstance(e)),
  );
} catch (error) {
  console.log("Sin managers creados");
}

function client_recover_data() {
  try {
    // prettier-ignore
    JSON.parse(fs.readFileSync(`./data/users/sales/cart/${pClients[user_idx].getUsername()}.json`, "utf-8")).forEach((e) => 
      pClientCart.push(product.getInstance(e)),
    );
  } catch (error) {
    console.log("Sin productos en el carrito");
  }
  try {
    // prettier-ignore
    JSON.parse(fs.readFileSync(`./data/users/sales/favs/${pClients[user_idx].getUsername()}.json`, "utf-8")).forEach((e) => 
      pClientFavs.push(product.getInstance(e)),
    );
  } catch (error) {
    console.log("Sin productos favoritos");
  }
  try {
    // prettier-ignore
    JSON.parse(fs.readFileSync(`./data/users/sales/history/${pClients[user_idx].getUsername()}.json`, "utf-8")).forEach((e) => 
      pClientHistory.push(history.getInstance(e)),
    );
  } catch (error) {
    console.log("Aun no realizas una compra");
  }
}

// Recover data - products
const pProducts = [];
try {
  JSON.parse(fs.readFileSync("./data/products.json", "utf-8")).forEach((e) =>
    pProducts.push(product.getInstance(e)),
  );
} catch (error) {
  console.log("Inventario de productos vacio");
}

//Recover data - change history
const pChangeHistory = [];
try {
  // prettier-ignore
  JSON.parse(fs.readFileSync("./data/users/changehistory.json", "utf-8")).forEach((e) =>
    pChangeHistory.push(history.getInstance(e)),
  );
} catch (error) {
  console.log("Historial de cambios vacio");
}

// MENUS

// prettier-ignore
const modifyaccount = () => {
  let bucle = false;
  let name;
  let lastname;
  let username;
  let email;
  let password;

  let confirm;
  while (!bucle) {
    console.log(
      `
       *------------------------------------*
       |--ONLINE MARKETS -  MODIFY ACCOUNT--|
       *------------------------------------*
        Preserve data? Enter -1

      `,
    );
    name = prompt(` --> New account name: `);
    lastname = prompt(` --> New account lastname: `);
    email = prompt(` --> New account email: `);
    password = prompt(` --> New account password: `);

    console.log("\n (Elementos guardados) ");
    confirm = prompt(` Confirmar cambios? 1(yes)/0(not) --> `);
    if (confirm == 1) {
      name === "-1"?0:pClients[user_idx].setName(name);
      lastname === "-1"?0:pClients[user_idx].setLastname(lastname);
      email === "-1"?0:pClients[user_idx].setEmail(email);
      password === "-1"?0:pClients[user_idx].setPassword(password);

      const jsonData = JSON.stringify(pClients.map((e) => e.getUser()), null,2);

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
      confirm = prompt( ` Reiniciar? 1(yes)/0(not) --> `);
      if(confirm == 1) {
        console.clear();
      }else{
        bucle = true;
        return false;
      }
    }
  }
}

// prettier-ignore
const deleteproduct = (id) => {
  let bucle = false;
  let confirm;
  while (!bucle) {
    console.log(
      `
       *------------------------------------*
       |--ONLINE MARKETS -  DELETE PRODUCT--|
       *------------------------------------*
        - Product id: ${pProducts[id-1].getId()}
        - Product name: ${pProducts[id-1].getName()}
        - Product price: $/ ${pProducts[id-1].getPrice()}
        - Product cant: ${pProducts[id-1].getCant()} units
      `,
    );
    console.log("\n (Elemento identificado) ");
    confirm = prompt(` Confirmar eliminacion? 1(yes)/0(not) --> `);
    if (confirm == 1) {
      // Save in changehistory
      pChangeHistory.push(new history(
        pManagers[user_idx].getName(),
        pManagers[user_idx].getLastname(),
        new Date(),
        "DELETE product",
        pProducts[id-1].getProduct() 
      )); 

      pProducts.splice(id-1, 1);
      pProducts.forEach((e,i) => {
        if(e.getId() - i > 1){
          e.setId(i + 1);
        }
      })
      
      const jsonData = JSON.stringify(pProducts.map((e) => e.getProduct()), null,2);
      const jsonDataHistory = JSON.stringify(pChangeHistory.map((e) => e.getHistory()), null, 2);

      fs.writeFileSync("./data/users/changehistory.json", jsonDataHistory, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      fs.writeFileSync("./data/products.json", jsonData, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      bucle = true;
      return true;
    } else {
        bucle = true;
        return false;
    }
  }
}
// prettier-ignore
const modifyproduct = (id) => {
  let bucle = false;
  let name;
  let price;
  let cant;
  let confirm;
  while (!bucle) {
    console.log(
      `
       *------------------------------------*
       |--ONLINE MARKETS -  MODIFY PRODUCT--|
       *------------------------------------*
        Preserve data? Enter -1

      `,
    );
    name = prompt(` --> New product name: `);
    price = prompt(` --> New product price: `);
    cant = prompt(` --> New product cant: `);
    console.log("\n (Elementos guardados) ");
    confirm = prompt(` Confirmar cambios? 1(yes)/0(not) --> `);
    if (confirm == 1) {
      pChangeHistory.push(new history(
        pManagers[user_idx].getName(),
        pManagers[user_idx].getLastname(),
        new Date(),
        "MODIFY product",
        pProducts[id-1].getProduct() 
      )); 

      name === "-1"?0:pProducts[id-1].setName(name);
      price === "-1"?0:pProducts[id-1].setPrice(parseFloat(price));
      cant === "-1"?0:pProducts[id-1].setCant(parseInt(cant));

      const jsonData = JSON.stringify(pProducts.map((e) => e.getProduct()), null,2);
      const jsonDataHistory = JSON.stringify(pChangeHistory.map((e) => e.getHistory()), null, 2);

      fs.writeFileSync("./data/users/changehistory.json", jsonDataHistory, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      fs.writeFileSync("./data/products.json", jsonData, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      bucle = true;
      return true;
    } else {
      confirm = prompt( ` Reiniciar? 1(yes)/0(not) --> `);
      if(confirm == 1) {
        console.clear();
      }else{
        bucle = true;
        return false;
      }
    }
  }
}

// prettier-ignore
const addproduct = () => {
  let bucle = false;
  let name;
  let price;
  let cant;
  let confirm;
  while (!bucle) {
    console.log(
      `
       *---------------------------------*
       |--ONLINE MARKETS -  ADD PRODUCT--|
       *---------------------------------*
      `,
    );
    name = prompt(` --> Product name: `);
    price = parseFloat(prompt(` --> Product price: `));
    cant = parseInt(prompt(` --> Product cant: `));
    console.log("\n (Elementos guardados) ");
    confirm = prompt(` Confirmar nuevo producto? 1(yes)/0(not) --> `);
    if (confirm == 1) {
      const longarr = pProducts.length + 1;
      pProducts.push(new product(longarr, name, price, cant));
      const jsonData = JSON.stringify(pProducts.map((e) => e.getProduct()), null,2);
      fs.writeFileSync("./data/products.json", jsonData, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      pChangeHistory.push(new history(
        pManagers[user_idx].getName(),
        pManagers[user_idx].getLastname(),
        new Date(),
        "ADD product",
        pProducts[pProducts.length - 1].getProduct() 
      )); 
      const jsonDataHistory = JSON.stringify(pChangeHistory.map((e) => e.getHistory()), null, 2);
      fs.writeFileSync("./data/users/changehistory.json", jsonDataHistory, (error) => {
        if (error) {
          console.log(`error: ${error}`);
        } else {
          console.log("Sin errores");
        }
      });

      bucle = true;
      return true;
    } else {
      confirm = prompt( ` Reiniciar? 1(yes)/0(not) --> `);
      if(confirm == 1) {
        console.clear();
      }else{
        bucle = true;
        return false;
      }
    }
  }
};

// prettier-ignore
const signup = () => {
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
      const jsonData = JSON.stringify(pClients.map((e) => e.getUser()), null,2);
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
      confirm = prompt( ` Reiniciar? 1(yes)/0(not) --> `);
      if(confirm == 1) {
        console.clear();
      }else{
        bucle = true;
        return false;
      }
    }
  }
};

// prettier-ignore
const recoveraccunt = () => {
  let auxUser;
  let bucle = false;
  let email;
  let name;
  let username;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *----------------------------------------*
       |----ONLINE MARKETS - RECOVER ACCOUNT----|
       *----------------------------------------*
      `,
    );
    email = prompt(` --> Email: `);
    console.log("\n Preguntas de seguridad")
    name = prompt(` Cual es su nombre? `);
    username = prompt(` Cual es su nombre de usuario? `);
    if (pManagers.some((e) => {
      if(e.getEmail() === email && e.getName() === name && e.getUsername() === username){
        auxUser = e.getUser(); 
        return true;
      }
      return false;
    })) {
      bucle = true;
      return auxUser;
    } else {
       console.log("\n (Error al digitar o cuenta no encontrada)");
       opcion = prompt(` Desea continuar? 1(yes)/0(not) --> `);
       if (opcion == 1) console.clear();
       else if (opcion == 0) return false;
       else return false;
    }
  }
}

// prettier-ignore
const login = (tUser) => {
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
      if (pManagers.some((e, i) => {
          if (e.getUsername() === username && e.getPassword() === password) {
            user_idx = i;
            user_id = e.getEmail();
            return true;
          }
          return false;
        })
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
      if (pClients.some((e, i) => {
          if (e.getUsername() === username && e.getPassword() === password) {
            user_idx = i;
            user_id = e.getEmail();
            return true;
          }
          return false;
        })
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

// prettier-ignore
function client_productMenu() {
  let bucle = false;
  let opc1,opc2;

  let aO, bO, cO;
  let aN, bN, cN;
  let aP, bP, cP;
  let aC, bC, cC;
  while(!bucle) {
    console.log(
      `
       Client: ${pClients[user_idx].getName()} ${pClients[user_idx].getLastname()} 

       *--------------------------------------------------------------------------------------------*
       |---------------------------------ONLINE MARKETS - PRODUCTS----------------------------------|
       *--------------------------------------------------------------------------------------------*`);
    for (let i = 0; i < pProducts.length; i += 3) {
      if( i === pProducts.length - 1){
        console.log(
`       | Option: ${String(i+1).padEnd(21," ")}|
       | Product: ${(pProducts[i].getName().toString()).padEnd(20," ")}|
       | Price: $/ ${(pProducts[i].getPrice().toString()).padEnd(19," ")}|
       | Cant: ${pProducts[i].getCant() + " units".padEnd(23-(pProducts[i].getCant().toString().length)," ")}|
       *------------------------------*`);
        break;
      }
      if( i === pProducts.length - 2){
        aO = (i+1).toString();
        aN = pProducts[i].getName();
        aP = pProducts[i].getPrice().toString();
        aC = pProducts[i].getCant().toString();
        bO = (i+2).toString();
        bN = pProducts[i+1].getName();
        bP = pProducts[i+1].getPrice().toString();
        bC = pProducts[i+1].getCant().toString();
        console.log(
`       | Option: ${aO.padEnd(21," ")}| Option: ${bO.padEnd(21," ")}|  
       | Product: ${aN.padEnd(20," ")}| Product: ${bN.padEnd(20," ")}|
       | Price: $/ ${aP.padEnd(19," ")}| Price: $/ ${bP.padEnd(19," ")}|
       | Cant: ${aC + " units".padEnd(23-aC.length," ")}| Cant: ${bC + " units".padEnd(23-bC.length," ")}|
       *-------------------------------------------------------------*`);
        break;
      }
      aO = (i+1).toString();
      aN = pProducts[i].getName();
      aP = pProducts[i].getPrice().toString();
      aC = pProducts[i].getCant().toString();
      bO = (i+2).toString();
      bN = pProducts[i+1].getName();
      bP = pProducts[i+1].getPrice().toString();
      bC = pProducts[i+1].getCant().toString();
      cO = (i+3).toString();
      cN = pProducts[i+2].getName();
      cP = pProducts[i+2].getPrice().toString();
      cC = pProducts[i+2].getCant().toString();
      console.log(
`       | Option: ${aO.padEnd(21," ")}| Option: ${bO.padEnd(21," ")}| Option: ${cO.padEnd(21," ")}|  
       | Product: ${aN.padEnd(20," ")}| Product: ${bN.padEnd(20," ")}| Product: ${cN.padEnd(20," ")}|       
       | Price: $/ ${aP.padEnd(19," ")}| Price: $/ ${bP.padEnd(19," ")}| Price: $/ ${cP.padEnd(19," ")}|
       | Cant: ${aC + " units".padEnd(23-aC.length," ")}| Cant: ${bC + " units".padEnd(23-bC.length," ")}| Cant: ${cC + " units".padEnd(23-cC.length, " ")}|
       *--------------------------------------------------------------------------------------------*`);
    }
    console.log(`
        (Enter "0" to exit)

        Select an option to  (exm: option? 1           )
        add to cart or favs: (     1:(cart)/2:(favs)? 2)
      `);
    opc1 = parseInt(prompt(`         Option --> `));
    if(opc1 > 0 && opc1 <= pProducts.length){
      opc2 = parseInt(prompt(`         1:(cart)/2:(favs) --> `));
      if(opc2 === 1){
        const longarr = pClientCart.length + 1;
        pClientCart.push(new product(opc1, pProducts[opc1-1].getName(), pProducts[opc1-1].getPrice(), 1));
        const jsonData = JSON.stringify(pClientCart.map((e) => e.getProduct()), null,2);
        pClientHistory.push(new history(
          pClients[user_idx].getName(),
          pClients[user_idx].getLastname(),
          new Date(),
          "ADD product to cart",
          pProducts[opc1-1].getProduct() 
        )); 
        const jsonDataHistory = JSON.stringify(pClientHistory.map((e) => e.getHistory()), null, 2);

        fs.writeFileSync(`./data/users/sales/history/${pClients[user_idx].getUsername()}.json`, jsonDataHistory, (error) => {
          if (error) {
            console.log(`error: ${error}`);
          } else {
            console.log("Sin errores");
          }
        });
        fs.writeFileSync(`./data/users/sales/cart/${pClients[user_idx].getUsername()}.json`, jsonData, (error) => {
          if (error) {
            console.log(`error: ${error}`);
          } else {
            console.log("Sin errores");
          }
        });
        console.log("\nProducto agregado al carrito correctamente");
        pause();
      }
      else if(opc2 === 2){
        const longarr = pClientFavs.length + 1;
        pClientFavs.push(new product(opc1, pProducts[opc1-1].getName(), pProducts[opc1-1].getPrice(), 1));
        const jsonData = JSON.stringify(pClientFavs.map((e) => e.getProduct()), null,2);
        fs.writeFileSync(`./data/users/sales/favs/${pClients[user_idx].getUsername()}.json`, jsonData, (error) => {
          if (error) {
            console.log(`error: ${error}`);
          } else {
            console.log("Sin errores");
          }
        });
        console.log("\nProducto agregado a favoritos correctamente");
        pause();
      }
      else {
        console.log("\nOperacion no completada");
        pause();
      }
    } else if(opc1 === 0){
      bucle = true;
    } else {
      bucle = true;
    }
    console.clear();
  }
}

// prettier-ignore
function client_dashboard() {
  console.clear();
  let bucle = false;
  let opcion;
  let deleteconfirm;
  while (!bucle) {
    console.log(
      `
       Client: ${pClients[user_idx].getName()} ${pClients[user_idx].getLastname()} 

       *-----------------------------------*
       |------ONLINE MARKETS - CLIENTS-----|
       *-----------------------------------*
       |   1. Empezar a comprar            |
       |                                   |
       |   Compras                         |
       |    2. Visualizar historial        |
       |    3. Carrito de compras          |
       |    4. Productos favoritos         |
       |                                   |
       |   Cuenta                          |
       |    5. Visualizar datos            |
       |    6. Modificar datos             |
       |    7. Eliminar cuenta             |
       |                                   |
       |   8. Return                       |                    
       *-----------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        client_productMenu();
        break;
      case 2:
        console.log("hola 2");
        if(pClientHistory.length === 0) {
          console.log("\nNo registra compras en el historial");
        } else {
          console.log(
            `
            *-------------------------------------------*
            |-----ONLINE MARKETS - PURCHASES HISTORY----|
            *-------------------------------------------*`);
            pClientHistory.forEach((e) => {
            console.log(
`              - Date: ${(e.getCurrentdate()).toDateString()}
              - Time: ${(e.getCurrentdate()).getHours()}H:${(e.getCurrentdate()).getMinutes()}M:${(e.getCurrentdate()).getSeconds()}S
              - Author: ${e.getName()} ${e.getLastname()}
              - Operation: ${e.getOperation()} 
              - Product: ${(e.getProduct()).name}
                -> Price: $/ ${(e.getProduct()).price}
                -> Cant: ${(e.getProduct()).cant} unit
            *----------------------------------------*`);
          })
        }
        console.log("\n");
        pause();
        break;
      case 3:
        console.log("hola 3");
        pause();
        break;
      case 4:
        if(pClientFavs.length === 0) {
          console.log("\nNo cuenta con productos favoritos");
        } else {
          console.log(
            `
            *----------------------------------------*
            |------ONLINE MARKETS - FAVS PRODUCTS-----|
            *----------------------------------------*`);
          pClientFavs.forEach((e) => {
            console.log(
`              - Product Id: ${e.getId()}
              - Product Name: ${e.getName()}
              - Product Price: ${e.getPrice()}
              - Product Cant: ${e.getCant()} unit
            *----------------------------------------*
            `);
          })
        }
        pause();
        break;
      case 5:
          console.log(
            `
            *----------------------------------------*
            |------ONLINE MARKETS - ACCOUNT DATA-----|
            *----------------------------------------*`);
          console.log(
`              - Full Name: ${pClients[user_idx].getName()} ${pClients[user_idx].getLastname()}
              - Username: ${pClients[user_idx].getUsername()}
              - Email: ${pClients[user_idx].getEmail()}
              - Password: ${pClients[user_idx].getPassword()}
            *----------------------------------------*
            `);
        pause();
        break;
      case 6:
        if(modifyaccount()) {
          console.log("\n Modificacion de datos Exitosa");
          pause();
        }
        break;
      case 7:
        console.log(
          `
           *----------------------------------------*
           |-----ONLINE MARKETS - DELETE ACCOUNT----|
           *----------------------------------------*`);
        console.log(
`             - Full Name: ${pClients[user_idx].getName()} ${pClients[user_idx].getLastname()}
             - Username: ${pClients[user_idx].getUsername()}
             - Email: ${pClients[user_idx].getEmail()}
             - Password: ${pClients[user_idx].getPassword()}
           *----------------------------------------*
            `);
        console.log(" Para eliminar la cuenta digite --> Eliminar cuenta");
        deleteconfirm = prompt(` ---------------------------------> `); 
        if(deleteconfirm === "Eliminar cuenta"){
          pClients.splice(user_idx, 1);
          const jsonData = JSON.stringify(pClients.map((e) => e.getUser()), null,2);
          fs.writeFileSync("./data/users/clients.json", jsonData, (error) => {
            if (error) {
              console.log(`error: ${error}`);
            } else {
              console.log("Sin errores");
            }
          });

          bucle = true; 
          console.log("\n Esperamos verte pronto :)"); 
        } else {
          console.log("\n Error al digitar 'Eliminar cuenta'");
        }
        pause();
        break;
      case 8:
        bucle = true;
        break;
      default:
        break;
    }
    console.clear();
  }
  
}

// prettier-ignore
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
          console.log("\nInicio de sesion exitoso");
          pause();
          client_recover_data();         
          client_dashboard();
        } else {
          console.log("\nNo se pudo iniciar sesion");
          pause();
        }
        break;
      case 2:
        if (signup()) {
          console.log("\nRegistro de cuenta exitoso");
          pause();
        }
        break;
      case 3:
        console.log(
          `
            Copyright (c) 2023 Abel Ortega 
            
            Permission is hereby granted, free of chaneg, to any person obtaining
            a copy of this software and associated documentation files (the 
            "Software"), to deal in the Software without restriction, including
            without limitation the rights to use, copy, modify, merge, publish,
            distribute, sublicense, and/or sell copies of the Software, and to
            permit persons to whom the Software is furnished to do so, subject to
            the following conditions:

            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
            MONINFRINGEMENT, IN NO EVENT SHALL THE AUTHOR OR COPYRIGHT HOLDERS BE 
            LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
            OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
            WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            
          `);
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

// prettier-ignore
function manager_dashboard() {
  console.clear();
  let bucle = false;
  let auxid = 0;
  let opcion;
  while (!bucle) {
    console.log(
      `
       Manager: ${pManagers[user_idx].getName()} ${pManagers[user_idx].getLastname()} 

       *-----------------------------------*
       |-----ONLINE MARKETS - MANAGERS ----|
       *-----------------------------------*
       |   Ventas                          |
       |    1. Historial de ventas         |
       |    2. Productos mas vendidos      |
       |    3. Productos menos vendidos    |
       |    4. Clientes destacados         |
       |                                   |
       |   Almacen                         |
       |    5. Listar productos            |
       |    6. Agregar un producto         |
       |    7. Modificar un producto       |
       |    8. Eliminar un producto        |
       |                                   |
       |   9. Historial de cambios         |
       |                                   |
       |   10. Return                      |                    
       *-----------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        console.log("hola 1");
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
        console.log("hola 4");
        pause();
        break;
      case 5:
          console.log(
            `
            *----------------------------------------*
            |-----ONLINE MARKETS - INVENTORY LIST----|
            *----------------------------------------*`);
        pProducts.forEach((e) => {
          console.log(
`              - Product Id: ${e.getId()}
              - Product Name: ${e.getName()}
              - Product Price: $/ ${e.getPrice()}
              - Product Cant: ${e.getCant()} units
            *----------------------------------------*`);
        })
        pause();
        break;
      case 6:
        if (addproduct()) {
          console.log("\nRegistro de producto exitoso");
          pause();
        }
        break;
      case 7:
        auxid = parseInt(prompt(` Enter the product ID: `));
        if(pProducts.some((e) => e.getId() === auxid)) {
          if(modifyproduct(auxid)){
            console.log("\n Modifico el producto correctamente");
            pause();
          }
        } else {
          console.log("\n (El ID no existe, vuelva a intentarlo)");
          pause();
        }
        break;
      case 8:
        auxid = parseInt(prompt(` Enter the product ID: `));
        if(pProducts.some((e) => e.getId() === auxid)) {
          if(deleteproduct(auxid)){
            console.log("\n Elimino el producto correctamente");
            pause();
          }
        } else {
          console.log("\n (El ID no existe, vuelva a intentarlo)");
          pause();
        }
        break;
      case 9:
        if(pChangeHistory.length === 0) {
          console.log("\nNo se realizaron cambios");
        } else {
          console.log(
            `
            *----------------------------------------*
            |-----ONLINE MARKETS - CHANGE HISTORY----|
            *----------------------------------------*`);
          pChangeHistory.forEach((e) => {
            console.log(
`              - Date: ${(e.getCurrentdate()).toDateString()}
              - Time change: ${(e.getCurrentdate()).getHours()}H:${(e.getCurrentdate()).getMinutes()}M:${(e.getCurrentdate()).getSeconds()}S
              - Author: ${e.getName()} ${e.getLastname()}
              - Operation: ${e.getOperation()} 
              - Product: ${(e.getProduct()).name}
                -> Price: $/ ${(e.getProduct()).price}
                -> Cant: ${(e.getProduct()).cant} units
            *----------------------------------------*`);
          })
        }
        console.log("\n");
        pause();
        break;
      case 10:
        bucle = true;
        break;
      default:
        break;
    }
    console.clear();
  }
}

// prettier-ignore
function manager_menu() {
  let userAux = null;
  let bucle = false;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |---ONLINE MARKETS - MANAGERS --|
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
        if (login(1)) {
          console.log("\nInicio de sesion exitoso");
          pause();
          manager_dashboard();
        } else {
          console.log("\nNo se pudo iniciar sesion");
          pause();
        }
        break;
      case 2:
        userAux = recoveraccunt();
        if(userAux === false){
          console.log("\nNo se pudo encontrar la cuenta");
          pause();
        } else {
          console.log("\n Cuenta Recuperada: ")
          console.log(
            `
             Name: ${userAux.name}
             Lastname: ${userAux.lastname}
             Username: ${userAux.username}
             Email: ${userAux.email}
             Password: ${userAux.password}

            `)
          pause();
        }
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

// prettier-ignore
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
