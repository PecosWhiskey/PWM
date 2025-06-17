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

//inserisciPosizione("Roma", "Italia", 41.789830174, 12.250665664);
//inserisciPosizione("Milano", "Italia", 45.633333, 8.733333 );

//inserisciAeroporto("FCO", "Fiumicino", 1);
//inserisciAeroporto("MXP", "Malpensa", 2);

visualizzaPosizione();
visualizzaAeroporto();
visualizzaVoli();