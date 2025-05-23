const db = require('./dbAdmin'); //importo il database degli Admin
const bcrypt = require('bcryptjs'); //per eseguire l'hashing della password prima di essere salvata nel database

async function inserisciAdmin(username, email, password) {
  try{
    //genero un seme casuale per l'hashing della password
    const salt = await bcrypt.genSalt(10);
    //eseguo l'hashing della password prima di inserirla nel database
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO admin (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) { //definisco la callback
        if (err){
          reject(err);
          return;
        }
        console.log("Admin creato con successo!");
        resolve({id: this.lastID, username, email});
      });
    });
  } catch(err) {
      console.log("Errore nella creazione dell'Admin ", err);
    }
}