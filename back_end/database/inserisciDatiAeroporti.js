const { modificaBiglietto } = require('../models/biglietti');
const db = require('./dbBiglietti');

async function inserisciPosizione(citta, stato, latitudine, longitudine){
    try{
       return new Promise((resolve,reject)=>{
        db.run('INSERT INTO Posizione (citta, stato, latitudine, longitudine) VALUES (?, ?, ?, ?)',
            [citta, stato, latitudine, longitudine], function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve({idPosizione:this.lastID, citta, stato, latitudine, longitudine});
                console.log("Posizione creata con successo!");
                console.log({idPosizione:this.lastID, citta, stato, latitudine, longitudine})
            }
        );
       }); 
    }catch(err){
        console.log('Errore nella creazione della posizione; ', err.message);
    }
}


async function inserisciAeroporto(idAeroporto, nome, idPosizione){
    try{
        return new Promise((resolve,reject)=>{
            db.run('INSERT INTO Aeroporto VALUES (?,?,?)', [idAeroporto, nome, idPosizione], function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve({idAeroporto, nome, idPosizione});
                console.log("Aeroporto inserito con successo!");
                console.log({idAeroporto, nome, idPosizione});
            })
        })
    }catch(err){
        console.log("Errrore nell'inserimento dell'aeroporto: ", err.message);
    }
}


async function eliminaPosizione(id){
    try{
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM Posizione WHERE idPosizione=?',[id], (err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve({idPosizione:id});
                console.log("Eliminazione avvenuta con successo!");
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}
async function eliminaAeroporto(id){
    try{
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM Aeroporto WHERE idAeroporto=?',[id], (err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve({idAeroporto:id});
                console.log("Eliminazione avvenuta con successo!");
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function eliminaPasseggero(id){
    try{
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM Passeggero WHERE idPasseggero=?',[id], (err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve({idPasseggero:id});
                console.log("Eliminazione avvenuta con successo!");
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function eliminaBiglietto(id){
    try{
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM Biglietto WHERE idPasseggero=?',[id], (err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve({idBiglietto:id});
                console.log("Eliminazione avvenuta con successo!");
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function eliminaPasseggero(id){
    try{
        return new Promise((resolve,reject)=>{
            db.run('DELETE FROM Passeggero WHERE idPasseggero=?',[id], (err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve({idPasseggero:id});
                console.log("Eliminazione avvenuta con successo: ", id);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaPosizione(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Posizione', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaAeroporto(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Aeroporto', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaVoli(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Volo', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaClienti(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Cliente', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaBiglietti(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Biglietto', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function visualizzaBigliettiID(idPasseggero){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Biglietto WHERE idPasseggero=?', [idPasseggero], (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

async function modificaPasseggero({idPasseggeroCorrente, idPasseggeroModificato, nome, cognome, dataNascita, documentoID}){
            return new Promise((resolve,reject)=>{
                db.run('UPDATE Passeggero SET idPasseggero=?, nome=?, cognome=?, dataNascita=?, documentoID=? WHERE idPasseggero = ?', 
                    [idPasseggeroModificato, nome, cognome, dataNascita, documentoID, idPasseggeroCorrente], function(err){
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve({idPasseggero, nome, cognome, dataNascita, documentoID});
                    });
            });
    }

async function modificaBigliettoPosto({idVolo, idPasseggero, posto}){
            return new Promise((resolve,reject)=>{
                db.run('UPDATE Biglietto SET posto=? WHERE idVolo = ? AND idPasseggero=?', 
                    [posto, idVolo, idPasseggero], function(err){
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve({idVolo, idPasseggero, posto});
                    });
            });
    }    

async function visualizzaPasseggeri(){
    try{
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM Passeggero', (err,rows)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(rows);
                console.log(rows);
            })
        })
    }catch(err){
        console.log("Errore: ", err.message);
    }
}

// inserisciPosizione("ROMA", "Italia", "41°47′44.16″N", "12°14′59.64″E");
// inserisciPosizione("MILANO", "Italia", "45°37′48″N", "8°43′23″E");
// inserisciPosizione("MILANO", "Italia", "45°27′39.24″N", "9°16′48″E");
// inserisciPosizione("BOLOGNA", "Italia", "44°31′48″N", "11°17′36″E");
// inserisciPosizione("PARIGI", "Francia", "49°00′35″N", "2°32′52″E");
// inserisciPosizione("PARIGI", "Francia", "48°43′24″N", "2°22′46″E");
// inserisciPosizione("PARIGI", "Francia", "49°27′16″N", "2°06′46″E");
// inserisciPosizione("LONDRA", "Regno Unito", "51°08′53″N", "0°11′25″W");
// inserisciPosizione("BARCELLONA", "Spagna", "41°17′49″N", "2°04′42″E");
// inserisciPosizione("AMSTERDAM", "Paesi Bassi", "52°18′29″N", "4°45′51″E");
// inserisciPosizione("PALERMO", "Italia", "38°10′55″N", "13°05′58″E");
// inserisciPosizione("BARI", "Italia", "41°08′19.88″N", "16°45′38.14″E");
// inserisciPosizione("ATENE", "Grecia", "37°56′11″N", "23°56′35″E");
// inserisciPosizione("VIENNA", "Austria", "48°06′37″N", "16°34′11″E");

// inserisciAeroporto("VIE", "Vienna-Schwechat", 18);
//inserisciAeroporto("ATH", " Atene-Eleftherios Venizelos", 17);
// inserisciAeroporto("BRI", "Bari-Palese", 16);
// inserisciAeroporto("PMO", "Punta Raisi", 15);
// inserisciAeroporto("AMS", "Schiphol", 14);
// inserisciAeroporto("BCN","Barcellona-El Prat", 13);
// inserisciAeroporto("SEN", " Southend", 12);
// inserisciAeroporto("LGW", "Londra-Gatwick", 10);
// inserisciAeroporto("BVA", 'Beauvais', 9 );
// inserisciAeroporto("ORY", "Orly", 8);
// inserisciAeroporto("CDG", "Charles de Gaulle", 7);
// inserisciAeroporto("BLQ", "Guglielmo Marconi", 6);
// inserisciAeroporto("FCO", "Fiumicino", 5);
// inserisciAeroporto("MXP", "Malpensa", 3);
// inserisciAeroporto("LIN", "Linate", 4);

// visualizzaPasseggeri();