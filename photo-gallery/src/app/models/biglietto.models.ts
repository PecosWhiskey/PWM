export class Biglietto{
    idVolo: string;
    idCliente: string;
    idPasseggero : string;
    tariffa: string;
    posto: string;
    dataPartenza: string;
    prezzoFinale: number;
    dataAcquisto: string;

    constructor(idVolo='', idC = '', idP = '', tariffa = '', posto='', dataP= '', prezzo= 0.0, dataA= ''){
        this.idVolo=idVolo;
        this.idCliente = idC;
        this.idPasseggero = idP;
        this.tariffa = tariffa;
        this.posto = posto;
        this.dataPartenza = dataP;
        this.prezzoFinale = prezzo;
        this.dataAcquisto = dataA;
    }
}