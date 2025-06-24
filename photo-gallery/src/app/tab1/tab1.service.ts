import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volo } from '../models/volo.models';
import { RicercaInfo } from '../models/ricercaInfo.models';
import { BehaviorSubject } from 'rxjs'; //permette di memorizzare lo stato corrente e aggiornare gli altri tab quando i dati cambiano

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {

  private baseUrl = 'http://localhost:3000';
  private ricercaInfo = new BehaviorSubject<RicercaInfo>({partenza:'', destinazione: '', dataPartenza: '', dataRitorno: ''}) // private voliTrovatiAndata = false; //indica se sono stati trovati i voli cercati dall'utente
  private bigliettiAndata = new BehaviorSubject<Volo[]>([]);
  private bigliettiRitorno = new BehaviorSubject<Volo[]>([]);
  private voliTrovatiAndata = new BehaviorSubject<boolean>(false);
  private voliTrovatiRitorno = new BehaviorSubject<boolean>(false);
  private sceltaUtente = new BehaviorSubject<string>('nessun selezionato'); //cambia valore in base all'opzione scelta dall'utente
  //tra andate e ritorno, solo andata o nessun selezionato (in questo caso assume il valore di default)

  constructor(private http: HttpClient) {}

  CercaVolo(credentials: { partenza: string, destinazione: string, oraPartenza: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/ricerca-volo`, credentials);

  }

  setRicercaInfo(info: RicercaInfo) {
    this.ricercaInfo.next(info);
  }

  getRicercaInfo(): Observable<RicercaInfo>{
    return this.ricercaInfo.asObservable();
  }

  setBigliettiAndata(biglietti: Volo[]){
    this.bigliettiAndata.next(biglietti);
  }

  getBigliettiAndata(): Observable<Volo[]>{
    return this.bigliettiAndata.asObservable();
  }

  setBigliettiRitorno(biglietti: Volo[]){
    this.bigliettiRitorno.next(biglietti);
  }

  getBigliettiRitorno(): Observable<Volo[]>{
    return this.bigliettiRitorno.asObservable();
  }

  setVoliTrovatiAndata(founded: boolean) {
    this.voliTrovatiAndata.next(founded);
  }

  getVoliTrovatiAndata(): Observable<boolean>{
    return this.voliTrovatiAndata.asObservable();
  }

  setVoliTrovatiRitorno(founded: boolean) {
    this.voliTrovatiRitorno.next(founded);;
  }

  getVoliTrovatiRitorno(): Observable<boolean>{
    return this.voliTrovatiRitorno.asObservable();
  }

  setSceltaUtente(scelta: string){
    this.sceltaUtente.next(scelta);
  }

  getSceltaUtente(): Observable<string>{
    return this.sceltaUtente.asObservable();
  }
}
