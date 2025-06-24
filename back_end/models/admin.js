const db = require('../database/dbAdmin.js');
const bcrypt = require('bcryptjs'); //per il confronto delle password

class Admin {

//metodo per trovare un utente in base all'email
  static async findByEmail(email) {
     console.log("findbyEmail", email);
     return new Promise((resolve, reject) => {
        db.get('SELECT * FROM admin WHERE email = ?', [email], (err, row) => {
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
      db.get('SELECT id, email FROM admin WHERE id = ?', [id], (err, row) => {
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