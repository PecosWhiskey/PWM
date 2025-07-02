import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Volo } from '../models/volo.models';

@Injectable({
  providedIn: 'root'
})
export class GestioneVoliService {

  private baseUrl = 'http://localhost:3000';

  private datiVolo = new BehaviorSubject<Volo>({
    idVolo: '', 
    partenza: '',
    destinazione: '',
    oraPartenza: '',
    oraArrivo: '',
    prezzo: 0.0,
    postiDisponibili: 0
  });

  constructor(private http: HttpClient) {}

  Crea(credentials: { idVolo: string, partenza: string, destinazione: string, oraPartenza: string, oraArrivo: string, prezzo: number, postiDisponibili: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/creazione-volo`, credentials,);

  }

  Modifica(credentials: { idVolo: string, partenza: string, destinazione: string, oraPartenza: string, oraArrivo: string, prezzo: number, postiDisponibili: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/modifica-volo`, credentials);
  }

  CercaVoliDisponibili(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/voli-disponibili`);
  }

  CercaBigliettiAcquistati(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/auth/prenotazioni-ricevute`);
  }

  setDatiVolo(volo: Volo){
    this.datiVolo.next(volo);
  }

  getDatiVolo(){
    return this.datiVolo.asObservable();
  }
}
