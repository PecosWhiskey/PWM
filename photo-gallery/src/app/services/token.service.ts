import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
// import { Drivers } from '@ionic/storage';
// import CordovaSQLiteDriver  from 'localforage-cordovasqlitedriver'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // private inizializzazione: Promise<void>;
  // private storage_: Storage | null = null;
  private TOKEN_KEY = "access token"; //chiave a cui viene associato il token
  private CLIENT_KEY = "client info"; //chiave a cui vengono associate le info del cliente presenti nel payload del token
  private ADMIN_KEY = "admin info";

  constructor() { //qui c'era private storage: Storage
    // this.inizializzazione = this.init();
   }

  //inizializza lo storage 
  // async init(): Promise<void>{
  //   //Registrazione del driver
  //   // const store = new Storage({
  //   //   driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
  //   // });
  //   // await this.storage.defineDriver(CordovaSQLiteDriver);
  //   this.storage_ = await this.storage.create();
  // } 

  // //Inserimento del token nello storage locale (IndexedDB per browser, SQLite nativo per mobile)
  // //utilizza il miglior motore di archiviazione disponibile sulla piattaforma senza dover interagire direttamente con esso 
  // async setToken(token: string): Promise<void> {
  //   await this.inizializzazione;
  //   await this.storage_?.set(this.TOKEN_KEY, token); //viene inserito solo se lo storage non è null
  // }

   setToken(token: string){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // //Recupero del token
  // async getToken(): Promise<string | null> {
  //   await this.inizializzazione;
  //   return await this.storage_?.get(this.TOKEN_KEY) || null;
  // }

  getToken(): any{
    return localStorage.getItem(this.TOKEN_KEY);
  }


  //Funzione di logout
  // async logout(): Promise<void> {
  //   if (this.storage_) {
  //     await Promise.all([
  //       this.storage_.remove(this.TOKEN_KEY),
  //       this.storage_.remove(this.ADMIN_KEY),
  //       this.storage_.remove(this.CLIENT_KEY)
  //     ]);
  //   }
  // }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CLIENT_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
  }

  //Inserimento delle informazioni recuperate dal payload del token nello storage locale
  // async setClientInfo(clientInfo: any): Promise<void> {
  //   await this.storage_?.set(this.CLIENT_KEY, clientInfo);
  // }

  setClientInfo(clientInfo: any){
    localStorage.setItem(this.CLIENT_KEY, JSON.stringify(clientInfo));
  }

  // async setAdminInfo(adminInfo: any): Promise<void> {
  //   await this.storage_?.set(this.ADMIN_KEY, adminInfo);
  // }

  setAdminInfo(adminInfo: any){
    localStorage.setItem(this.ADMIN_KEY, JSON.stringify(adminInfo));
  }

  //Recupero delle informazione del cliente
  // async getClientInfo(): Promise<any> {
  //   return await this.storage_?.get(this.CLIENT_KEY) || null;
  // }

  getClientInfo(): any{
    const info = localStorage.getItem(this.CLIENT_KEY);
    return info ? JSON.parse(info) : null;
  }

  //Recupero delle informazione dell'amministratore
  // async getAdminInfo(): Promise<any> {
  //   return await this.storage_?.get(this.ADMIN_KEY) || null;
  // }

  getAdminInfo(): any {
    const info = localStorage.getItem(this.ADMIN_KEY);
    return info ? JSON.parse(info) : null;
  }

  //Verifica se l'utente è loggato
  // async isLogged(): Promise<boolean> {
  //   const isExpired = await this.isTokenExpired();
  //   return !isExpired;
  // }

  isLogged(){
    const isExpired = this.isTokenExpired();
    return !isExpired;
  }

  //Verifica se il token è scaduto
  // async isTokenExpired(): Promise<boolean> {
  //   const token = await this.getToken();
  //   // console.log("Token in isTokenExpired: ", token);
  //   if (!token) return true;

  //   try {
  //     //Divide il token nelle sue tre parti: header, payload e signature e ricava solo il payload decodificandolo e ricreando
  //     const payload = JSON.parse(atob(token.split('.')[1])); //l'oggetto originale dove troviamo la data di scadenza
  //     console.log("Payload del tokan: ", payload);
  //     const currentTime = Math.floor(Date.now() / 1000); //tempo attuale in secondi
  //     // console.log("Data odierna: ", currentTime);
  //     // console.log("Data token: ", payload.exp);
  //     return payload.exp < currentTime; //confronta il tempo attuale con la data di scadenza del token (restituisce true se il token è scaduto)
  //   } catch (error) {
  //     console.error('Errore nel parsing del token:', error);
  //     return true; //se si è verificato un errore in qualsiasi caso il token non può essere valido
  //   }
  // }

  isTokenExpired(){
    const token = this.getToken();
    // console.log("Token in isTokenExpired: ", token);
    if (!token) return true;

    try {
      //Divide il token nelle sue tre parti: header, payload e signature e ricava solo il payload decodificandolo e ricreando
      const payload = JSON.parse(atob(token.split('.')[1])); //l'oggetto originale dove troviamo la data di scadenza
      console.log("Payload del tokan: ", payload);
      const currentTime = Math.floor(Date.now() / 1000); //tempo attuale in secondi
      // console.log("Data odierna: ", currentTime);
      // console.log("Data token: ", payload.exp);
      return payload.exp < currentTime; //confronta il tempo attuale con la data di scadenza del token (restituisce true se il token è scaduto)
    } catch (error) {
      console.error('Errore nel parsing del token:', error);
      return true; //se si è verificato un errore in qualsiasi caso il token non può essere valido
    }
  }

  //Estrae le informazioni del cliente dal payload del token
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
    const decodedInfo = JSON.parse(decoded);

    //Crea l'oggetto che contine solo le informazioni sul cliente contenute nel payload
    const clientInfo = {idCliente: decodedInfo.idCliente, email: decodedInfo.email, role: decodedInfo.role};
    
    return clientInfo;
    
  } catch (error) {
    console.error('Errore nella decodifica del token:', error);
    throw new Error('Impossibile estrarre le informazioni del cliente dal token');
  }
}

//Estrae le informazioni dell'amministratore dal payload del token
getAdminInfoFromToken(token: string): any {
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
    const decodedInfo = JSON.parse(decoded);

    //Crea l'oggetto che contine solo le informazioni sull'amministratore contenute nel payload
    const adminInfo = {idCliente: decodedInfo.idCliente, email: decodedInfo.email, role: decodedInfo.role};
    
    return adminInfo;
    
  } catch (error) {
    console.error('Errore nella decodifica del token:', error);
    throw new Error("Impossibile estrarre le informazioni dell'admin dal token");
  }
}

}