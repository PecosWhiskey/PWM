const biglietti = require('../../models/biglietti.js');

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
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
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
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async decrementaPosti(dati){
        try{
            const volo= await biglietti.findByIdVolo(dati.idVolo);
            if(!volo){
                throw new Error("Volo per l'aggiornamento dei posti disponibili inesistente");
            }
            return await biglietti.decrementaPostiDisponibili(dati);
        }catch(err){
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
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
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
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
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
            throw err;
        }
    }

    static async loginCliente(credenziali){
        try{
            const cliente = await biglietti.findByEmail(credenziali.email);
            
            //Se il cliente non viene trovato le credenziali non sono sicuramente valide e non è neccessario proseguire oltre
            if(!cliente){
                throw new Error('Credenziali non valide!');
            }

            const pass = await biglietti.comparePassword(credenziali.password, cliente.password);

            if(!pass){
                throw new Error('Credenziali non valide!');
            }

            return cliente;
        }catch(err){
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
            throw err;
        }
    }

    static async createBiglietto(datiBiglietto){
        try{
            const exist = await biglietti.trovaBiglietto(datiBiglietto.idPasseggero, datiBiglietto.idVolo);

            if(exist){
                throw new Error('Biglietto per questo passeggero e per questo volo già acquistato!');
            }

            return await biglietti.creaBiglietto(datiBiglietto);
        }catch(err){
            console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
            throw err;
        }
    }

    static async modificaTicket(dati){
        try{
            console.log("service modificaTicket: ", dati);
            const biglietto = await biglietti.findTicketById(dati.idBiglietto);

            if(!biglietto){
                throw new Error('Nessun biglietto da modificare trovato')
            }

            const modificato = await biglietti.modificaBiglietto(dati);

            if(!modificato){
                throw new Error('Errore nella modifica del biglietto');
            }

            const partenza = await biglietti.trovaCittàPartenza(biglietto.idVolo);
            const destinazione = await biglietti.trovaCittàDestinazione(biglietto.idVolo);
            const aeroportoPartenza = await biglietti.trovaAeroportoPartenza(biglietto.idVolo);
            const aeroportoDestinazione = await biglietti.trovaAeroportoDestinazione(biglietto.idVolo);

            const risultato = {
                idBiglietto: modificato.idBiglietto, 
                idVolo: biglietto.idVolo, 
                partenza: partenza.citta,
                destinazione: destinazione.citta,
                aeroportoPartenza: aeroportoPartenza,
                aeroportoDestinazione : aeroportoDestinazione,
                tariffa: modificato.tariffa,
                posto: modificato.posto,
                dataPartenza: biglietto.dataPartenza,
                prezzoFinale: modificato.prezzoFinale
            }

            console.log("RISULTATO: ", risultato);
            return risultato;
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async getPostiOccupati(dati){
        try{
            console.log("ID VOLO AUTHSERVICE: ", dati.idVolo);
            const numero = await biglietti.findTicketsByIdVolo(dati.idVolo);

            if(numero == 0){
                throw new Error("Non sono stati acquistati biglietti per questo volo!");
            }

            return await biglietti.ottieniPostiOccupati(dati.idVolo);
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    // static async returnTicket(idBiglietto){
    //     try{
    //         const biglietto = await biglietti.findTicketById(idBiglietto);

    //         if(!biglietto){
    //             throw new Error("Non è stato acquistato nessun biglietto con questo id");
    //         }
    //         return biglietto;
    //     }catch(err){
    //         console.log("ERRORE SERVICE BIGLIETTI: ", err.message);
    //         throw err;
    //     }
    // }

    static async returnBiglietti(idCliente){
        try{
            console.log("Service returnBiglietto: ", idCliente);
            const exist = await biglietti.restituisciBiglietti(idCliente);

            if(!exist){
                throw new Error('Non ci sono biglietti acquistati per questo cliente!');
            }

            return exist;
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async returnBigliettiAdmin(){
        try{
            const exist = await biglietti.restituisciBigliettiAdmin();

            if(!exist){
                throw new Error('Non ci sono biglietti acquistati!');
            }

            return exist;
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async returnForAdmin(){
        try{
            const exist = await biglietti.findForAdmin();

            if(!exist){
                throw new Error('Non ci sono voli disponibili');
            }

            return exist;
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async returnForCheckIn(dati){
        try{
            console.log("service returnForCheckIn: ", dati);
            const exist = await biglietti.findForCheckIn(dati);

            if(!exist){
                throw new Error('Non ci sono biglietti acquistati!');
            }

            //Se la tariffa e il posto sono stati già cambiati viene restituito un errore
            if(exist.posto != '' || exist.tariffa != ''){
                throw new Error('Check-in già fatto!');
            }

            return exist;
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }

    static async createPasseggero(datiPasseggero){
        try{
            console.log("AUTHSERVICE PASSEGGERO: ", datiPasseggero);
            const exist = await biglietti.cercaPasseggero(datiPasseggero);

            if(exist){
                //Se il passeggero è stato già memorizzato con i suoi dati nel database vengono restituiti i dati presenti
                return exist; 
            }                 

            return await biglietti.creaPasseggero(datiPasseggero);
        }catch(err){
            console.log('ERRORE SERVICE BIGLIETTI: ', err.message);
            throw err;
        }
    }
}

module.exports = AuthServiceBiglietti;