const db = require('../database/dbAdmin.js');
const bcrypt = require('bcryptjs'); //per il confronto delle password

class Admin {

//metodo per trovare un utente in base all'username
  static async findByUsername(username) {
     console.log("findbyusername", username);
     return new Promise((resolve, reject) => {
        db.get('SELECT * FROM admin WHERE username = ?', [username], (err, row) => {
          if (err){
            return reject(err);
          }
          resolve(row);
        });
      }); 
  }

// metodo per ricercare l'admin per id
  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, username, email FROM admin WHERE id = ?', [id], (err, row) => {
        if (err){
          return reject(err);
        } 
        resolve(row);
      });
    });
  }


// confronta la password inserita con quella salvata nel db
  static async comparePassword(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
  }
}
// bcrypt.compare() non crea un nuovo hash, ma verifica se la password inserita avrebbe generato 
// lo stesso hash che è stato salvato, garantendo sicurezza senza dover ripetere il processo di hashing.

module.exports = Admin;