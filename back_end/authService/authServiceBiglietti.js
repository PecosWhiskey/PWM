const biglietti = require('../models/biglietti');

class AuthServiceBiglietti {
    
    static async generaVolo(datiVolo){
        try{
            const data = {
                idAeroportoPartenza: datiVolo.partenza,
                idAeroportoDestinazione: datiVolo.destinazione,
                oraPartenza: datiVolo.oraPartenza,
                oraArrivo: datiVolo.oraArrivo,
            }
            const exist = await biglietti.verificaEsistenzaVolo(data);

            if(exist > 0){
                throw new Error('Volo già presente!');
            }
            return await biglietti.creaVolo(datiVolo);
        }catch (err){
            console.log("Errore AuthServiceBiglietti : ", err.message);
            throw err;
        }
    }

    static async modificaVoli(datiVolo){
        try{
            const volo = await biglietti.findByIdVolo(datiVolo.idVolo);
            if(!volo){
                throw new Error('Volo per la modifica non presente nel database!');
            }
            return await biglietti.modificaVolo(datiVolo);
        }catch(err){
            console.log('Errore AuthServiceBiglietti: ', err.message);
            throw err;
        }
    }

    static async cercaVolo(datiVolo){
        try{
           const exist = await biglietti.ricercaVolo(datiVolo);

           if(!exist){
            throw new Error('Nessun volo trovato in cercaVolo!');
           }
           return exist; 
        }catch(err){
            console.log("Errore AuthServiceBiglietti : ", err.message);
            throw err;
        } 
    }

    static async registrazioneCliente(datiCliente){
        try{
            const exist= await biglietti.findByEmail(datiCliente.email);

            if(exist){
                throw new Error('Email già in uso!');
            }
            
            return await biglietti.creaCliente(datiCliente);
        }catch(err){
            console.log("ERRORE generaCliente authService: ", err.message);
            throw err;
        }
    }

    static async loginCliente(email, password){
        try{
            const cliente = await biglietti.findByEmail(email);
            const pass = await biglietti.comparePassword(password, cliente.password);
            if(!cliente || !pass){
                throw new Error('Credenziali non valide!');
            }
            return cliente;
        }catch(err){
            console.log("ERRORE login authServiceBiglietti: ", err.message);
            throw err;
        }
    }

    static async createBiglietto(datiBiglietto){
        try{
            const exist = await biglietti.trovaBiglietto(datiBiglietto.idPasseggero, datiBiglietto.idVolo);

            if(exist){
                throw new Error('Biglietto per questo passeggero per questo volo già acquistato!');
            }

            return await biglietti.creaBiglietto(datiBiglietto);
        }catch(err){
            console.log("ERRORE creaBiglietto service: ", err.message);
            throw err;
        }
    }

    static async returnBiglietti(idCliente){
        try{
            const exist = await biglietti.restituisciBiglietti(idCliente);

            if(!exist){
                throw new Error('Non ci sono biglietti acquistati!');
            }

            return exist;
        }catch(err){
            console.log('ERRORE returnBiglietto service: ', err.message);
            throw err;
        }
    }

    static async createPasseggero(datiPasseggero){
        try{
            const exist = await biglietti.cercaPasseggero(datiPasseggero.idPasseggero);

            if(exist){
                throw new Error('Passeggero già presente nel database');
            }

            return exist;
        }catch(err){
            console.log('ERRORE createPassenger: ', err.message);
            throw err;
        }
    }
}

module.exports = AuthServiceBiglietti;