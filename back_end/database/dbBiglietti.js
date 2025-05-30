const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("database\\dbBiglietti.sqlite", (err) => {
    if (err) {
      console.error('Errore connessione al database BIGLIETTI:', err.message);
    } else {
      console.log('Connesso al database BIGLIETTI sqlite avvenuta con successo'); 
      db.run("PRAGMA foreign_keys=ON", (err) => { //attiva i vincoli di integrità referenziale
            if (err) {
                console.error("Errore nell'attivazione dei FOREIGN KEYS:", err.message);
            } else {
                console.log("Vincoli di chiave esterna attivati!");
            }
        });
      //TABELLA POSIZIONI
      db.run(`CREATE TABLE IF NOT EXISTS Posizione(
        idPosizione INTEGER PRIMARY KEY AUTOINCREMENT,
        citta TEXT NOT NULL,
        stato TEXT NOT NULL,
        latitudine REAL UNIQUE,
        longitudine REAL UNIQUE
      )`);
      //TABELLA AEROPORTI
      db.run(`CREATE TABLE IF NOT EXISTS Aeroporto(
        idAeroporto TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        idPosizione INTEGER, 
        FOREIGN KEY (idPosizione) REFERENCES Posizione(idPosizione) ON UPDATE CASCADE ON DELETE SET NULL
      )`);
      //TABELLA VOLI
      db.run(`CREATE TABLE IF NOT EXISTS Volo(
        idVolo TEXT PRIMARY KEY NOT NULL,
        partenza TEXT NOT NULL,
        destinazione TEXT NOT NULL,
        oraPartenza TEXT NOT NULL,
        oraArrivo TEXT NOT NULL,
        prezzo REAL NOT NULL, 
        FOREIGN KEY (partenza) REFERENCES Aeroporto(idAeroporto) ON UPDATE CASCADE ON DELETE NO ACTION
        FOREIGN KEY (destinazione) REFERENCES Aeroporto(idAeroporto) ON UPDATE CASCADE ON DELETE NO ACTION
      )`);
      //TABELLA CLIENTI
      db.run(`CREATE TABLE IF NOT EXISTS Cliente(
        idCliente TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        dataNascita TEXT NOT NULL,
        documentoID TEXT NOT NULL,
        sesso TEXT,
        nazionalita TEXT NOT NULL,
        stato TEXT NOT NULL,
        citta TEXT NOT NULL,
        CAP TEXT NOT NULL,
        indirizzo TEXT,
        numeroCivico INTEGER,      
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL UNIQUE
      )`);
      //TABELLA PASSEGGERI
      db.run(`CREATE TABLE IF NOT EXISTS Passeggero(
        idPasseggero TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        dataNascita TEXT NOT NULL,
        documentoID TEXT NOT NULL
      )`);
      //TABELLA BIGLIETTI
      db.run(`CREATE TABLE IF NOT EXISTS Biglietto(
        idBiglietto INTEGER PRIMARY KEY AUTOINCREMENT,
        idVolo TEXT NOT NULL,
        idCliente TEXT NOT NULL,
        idPasseggero TEXT NOT NULL,
        numeroPosto TEXT NOT NULL,
        tariffa TEXT,
        dataAcquisto TEXT,
        FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
        FOREIGN KEY (idPasseggero) REFERENCES Passeggero(idPasseggero),
        FOREIGN KEY (idVolo) REFERENCES Volo(idVolo) 
      )`);
    }
});

module.exports = db;