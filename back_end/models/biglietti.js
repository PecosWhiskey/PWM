const db = require('C:\\Users\\sarag\\Documents\\UNIPA\\PROGRAMMAZIONE WEB E MOBILE\\prog_prova_server\\database\\dbBiglietti.js');
const bcrypt = require('bcryptjs');

class Biglietti {

    static async creaVolo({idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo}){
        console.log('creaVolo: ',idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo);
        return new Promise((resolve,reject)=>{
            db.run(`INSERT INTO Volo (idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo) VALUES (?,?,?,?,?,?)`, 
                [idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo],
                function (err){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve({idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo});
                }
            );
        });
    }

    static async modificaVolo({idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo}){
            return new Promise((resolve,reject)=>{
                db.run('UPDATE Volo SET partenza=?, destinazione=?, oraPartenza=?, oraArrivo=?, prezzo=? WHERE idVolo = ?', 
                    [partenza, destinazione, oraPartenza, oraArrivo, prezzo, idVolo], function(err){
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve({idVolo, partenza, destinazione, oraPartenza, oraArrivo, prezzo});
                    });
            });
    }

    static async verificaEsistenzaVolo({idAeroportoPartenza, idAeroportoDestinazione, oraPartenza, oraArrivo}){
        return new Promise((resolve,reject)=>{
            db.get(`SELECT COUNT(*) as count FROM Volo WHERE partenza = ? AND destinazione = ?
                AND oraPartenza = ? AND oraArrivo = ?`, [idAeroportoPartenza, idAeroportoDestinazione, oraPartenza, oraArrivo],
                (err,row)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(row.count);
                });
        });
    }

    static async ricercaVolo({partenza, destinazione, oraPartenza}){
        const oraInizio = oraPartenza + " 00:00:00";
        const oraFine = oraPartenza + " 23:59:59";
        return new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM Volo WHERE oraPartenza>=? AND oraPartenza<=? AND partenza IN 
                (SELECT idAeroporto FROM Aeroporto WHERE idPosizione IN (
                SELECT idPosizione FROM Posizione WHERE citta = ?)) AND destinazione IN (
                SELECT idAeroporto FROM Aeroporto WHERE idPosizione IN(
                SELECT idPosizione FROM Posizione WHERE citta=?))`, 
                [oraInizio, oraFine, partenza, destinazione], (err,rows)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(rows);
                }
            )
        })
    }

    static async findByIdVolo(idVolo){
        console.log('ID VOLO arrivato in findiByIdVolo: ', idVolo);
        return new Promise((resolve,reject)=>{
            db.get('SELECT * FROM Volo WHERE idVolo = ?', [idVolo], (err,row)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async findByIdAeroportoPartenza(idAeroporto){
        console.log('findByIdAeroportoPartenza: ', idAeroporto);
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Volo WHERE partenza = ?', [idAeroporto], (err,rows)=>{
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findByIdAeroportoDestinazione(idAeroporto){
        console.log('findByIdAeroportoDestinazione: ', idAeroporto);
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Volo WHERE destinazione = ?', [idAeroporto], (err,rows)=>{
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findByOraPartenza(ora){
        console.log('findiByOraPartenza: ', ora);
        const oraInizio = ora + " 00:00:00";
        const oraFine = ora + " 23:59:59";
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Volo WHERE oraPartenza >= ? AND oraPartenza <= ?', [oraInizio, oraFine], (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static async findByOraArrivo(ora){
        console.log('findiByOraArrivo: ', ora);
        const oraInizio = ora + " 00:00:00";
        const oraFine = ora + " 23:59:59";
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Volo WHERE oraArrivo >= ? AND oraArrivo <= ?', [oraInizio, oraFine], (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
    
    static async findByCittaPartenza(citta){
        console.log('findByCittaPartenza: ', citta, idAeroporto);
        return new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM Volo WHERE partenza IN 
                (SELECT idAeroporto FROM Aeroporto WHERE idPosizione IN (
                SELECT idPosizione FROM Posizione WHERE citta = ?))`, [citta], (err,rows)=>{
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findByCittaDestinazione(citta){
        console.log('findByCittaDestinazione: ', citta);
        return new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM Volo WHERE destinazione IN 
                (SELECT idAeroporto FROM Aeroporto WHERE idPosizione IN (
                SELECT idPosizione FROM Posizione WHERE citta = ?`, [citta], (err,rows)=>{
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async findByPrezzo(prezzo){
        console.log('findByPrezzo: ', prezzo);
        return new Promise((resolve,reject)=>{
            db.get('SELECT * FROM Volo WHERE prezzo = ?', [prezzo], (err,row)=>{
                if(err){
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    static async creaBiglietto({idVolo, idCliente, idPasseggero, numeroPosto, tariffa, dataAcquisto}){
        console.log('creaBiglietto: ',idVolo, idCliente, idPasseggero, numeroPosto, tariffa, dataAcquisto);
        return new Promise((resolve,reject)=>{
            db.run(`INSERT INTO Biglietto (idVolo, idCliente, idPasseggero, numeroPosto, tariffa, dataAcquisto) VALUES (?,?,?,?,?,?)`, 
                [idVolo, idCliente, idPasseggero, numeroPosto, tariffa, dataAcquisto],
                function (err){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve({idBiglietto:this.lastID, idVolo, idCliente, idPasseggero, numeroPosto, tariffa, dataAcquisto});
                }
            );
        });
    }
    //Trova biglietti usando l'ID del cliente che li ha acquistati
    static async restituisciBiglietti(idCliente){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Biglietto WHERE idCliente=?', [idCliente], (err,rows)=>{
                if(err){
                    reject (err);
                    return;
                }
                resolve(rows);
            })
        })
    }
    //Trova il biglietto per id passeggero e id volo
    static async trovaBiglietto(idPasseggero, idVolo){
        return new Promise((resolve,reject)=>{
            db.get('SELECT * FROM Biglietto WHERE idPasseggero=? AND idVolo=?', [idPasseggero, idVolo], (err,row)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(row);
            })
        })
    }
     
    static async creaPasseggero({idPasseggero, nome, cognome, dataNascita, docIdentità}){
        console.log('creaPasseggero: ',idPasseggero, nome, cognome, dataNascita, docIdentità);
        return new Promise((resolve,reject)=>{
            db.run(`INSERT INTO Passeggero (idPasseggero, nome, cognome, dataNascita, documentoID) VALUES (?,?,?,?,?,?)`, 
                [idPasseggero, nome, cognome, dataNascita, docIdentità],
                function (err){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve({idPasseggero, nome, cognome, dataNascita, docIdentità});
                }
            );
        });
    }

    static async cercaPasseggero(idPasseggero){
        return new Promise((resolve,reject)=>{
            db.get('SELECT * FROM Passeggero WHERE idPasseggero=?', [idPasseggero], (err,row)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(row);
            })
        })
    }

   //Funzione per inserire un nuovo Cliente
   static async creaCliente({id, nome, cognome, dataN, documentoID, sesso, nazionalita, stato, citta, CAP, indirizzo, civico, email, password}){
        console.log('creaCliente: ',id, nome, cognome, dataN, documentoID, sesso, nazionalita, stato, citta, CAP, indirizzo, civico, email, password);
        //Hashing della password prima di inserirla nel database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //Promise che inserisce i dati nella tabella e resituisce l'oggetto con tutti i dati inseriti, eccetto la password
        return new Promise((resolve,reject)=>{
            db.run(`INSERT INTO Cliente (idCliente, nome, cognome, dataNascita, documentoID, sesso, nazionalita, 
                stato, citta, CAP, indirizzo, numeroCivico, email, password) VALUES (?,?,?,?,?,?)`, 
                [id, nome, cognome, dataN, documentoID, sesso, nazionalita, stato, citta, CAP, indirizzo, civico, email, hashedPassword],
                function (err){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve({id, nome, cognome, dataN, documentoID, sesso, nazionalita, stato, citta, CAP, indirizzo, civico, email, password});
                }
            );
        });
    } 
    //Ricerca del cliente tramite email
    static async findByEmail(email) {
     console.log("findbyEmail", email);
     return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Cliente WHERE email = ?', [email], (err, row) => {
          if (err){
            return reject(err);
          }
          resolve(row);
        });
      }); 
  }

    //Funzione di ricerca del Cliente utilizzando il suo ID
    static async findByIdCliente(idCliente) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT idCliente, nome, cognome, dataNascita, documentoID, sesso, nazionalita, 
                stato, citta, CAP, indirizzo, numeroCivico, email FROM Cliente WHERE idCliente = ?`, [idCliente], (err, row) => {
        if (err){
          return reject(err);
        } 
        resolve(row);
      });
    });
  }

    //Funzione che verifica la correttezza della password inserita nel login
    static async comparePassword(candidatePassword, hash) {
        return bcrypt.compare(candidatePassword, hash);
      }
}

module.exports = Biglietti;