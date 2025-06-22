import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private inizializzazione: Promise<void>;
  private storage_: Storage | null = null;
  private TOKEN_KEY = "access token"; //chiave a cui viene associato il token
  private CLIENT_KEY = "client info"; //chiave a cui vengono associate le info del cliente presenti nel payload del token
  private ADMIN_KEY = "admin info";

  constructor(private storage: Storage) {
    this.inizializzazione = this.init();
   }

  //inizializza lo storage 
  async init(): Promise<void>{
    this.storage_ = await this.storage.create();
  } 

  //Inserimento del token nello storage locale (IndexedDB per browser, SQLite nativo per mobile)
  async setToken(token: string): Promise<void> {
    await this.inizializzazione;
    await this.storage_?.set(this.TOKEN_KEY, token); //viene inserito solo se lo storage non è null
  }

  //Recupero del token
  async getToken(): Promise<string | null> {
    await this.inizializzazione;
    return await this.storage_?.get(this.TOKEN_KEY) || null;
  }

  //Rimozione del token e di tutti i dati memorizzati nello storage quando vine effettuato il logout
  async logout(): Promise<void> {
    await this.storage_?.remove(this.TOKEN_KEY);
    await this.storage_?.remove(this.CLIENT_KEY);
  }

  //Inserimento delle informazioni recuperate dal payload del token nello storage locale
  async setClientInfo(clientInfo: any): Promise<void> {
    await this.storage_?.set(this.ADMIN_KEY, clientInfo);
//    await this.storage_?.set(this.CLIENT_KEY, clientInfo);
  }

  //Recupero delle informazione del cliente
  async getClientInfo(): Promise<any> {
      return await this.storage_?.get(this.ADMIN_KEY) || null;
    // return await this.storage_?.get(this.CLIENT_KEY) || null;
  }

  //Verifica se l'utente è loggato
  async isLogged(): Promise<boolean> {
//    const token = await this.getToken();
//    return token != null && token != '';
      const isExpired = await this.isTokenExpired();
      return !isExpired;
  }

  //Verifica se il token è scaduto
  async isTokenExpired(): Promise<boolean> {
    const token = await this.getToken();
    // console.log("Token in isTokenExpired: ", token);
    if (!token) return true;

    try {
      //Divide il token nelle sue tre parti: header, payload e signature e ricava solo il payload decodificandolo e ricreando
      const payload = JSON.parse(atob(token.split('.')[1])); //l'oggetto originale dove troviamo la data di scadenza
      console.log("Payload del tokan: ", payload);
      const currentTime = Math.floor(Date.now() / 1000); //tempo attuale in secondi
      console.log("Data odierna: ", currentTime);
      console.log("Data token: ", payload.exp);
      return payload.exp < currentTime; //confronta il tempo attuale con la data di scadenza del token (restituisce true se il token è scaduto)
    } catch (error) {
      console.error('Errore nel parsing del token:', error);
      return true; //se si è verificato un errore in qualsiasi caso il token non può essere valido
    }
  }

  //Estrare le informazioni del cliente dal payload del token
  getClientInfoFromToken(token: string): any {
  try {
    if (!token) {
      throw new Error('Token non fornito');
    }

    //Divide il token nelle sue parti (header.payload.signature)
    const tokenArray = token.split('.');
    
    //Se l'array ottenuto ha meno di 3 elementi il token non è valido
    if (tokenArray.length !== 3) {
      throw new Error('Formato del token non valido');
    }

    //Ricava il payload
    const payload = tokenArray[1];
    
    //Decodifica da Base64 e ottiene una stringa
    const decoded = atob(payload);
    
    //Ricava l'oggetto originario
    const clientInfo = JSON.parse(decoded);
    
    return clientInfo;
    
  } catch (error) {
    console.error('Errore nella decodifica del token:', error);
    throw new Error('Impossibile estrarre le informazioni del cliente dal token');
  }
}



}
