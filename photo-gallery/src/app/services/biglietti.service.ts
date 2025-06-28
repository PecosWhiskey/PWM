//Service legato alla pagina crea-biglietto.page.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biglietto } from '../models/biglietto.models';
import { Passeggero } from '../models/passeggero.models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigliettiService {

  private baseUrl = 'http://localhost:3000';

  private numBigliettiCreati = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  CreaBiglietto(credentials: Biglietto): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/creazione-biglietto`, credentials);
  }

  CreaPasseggero(credentials: Passeggero): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/inserimento-passeggero`, credentials);
  }

  ModificaVolo(credentials: {idVolo: string, posti: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/decremento-posti`, credentials);
  }

  CercaBiglietto(credentials: {idPasseggero:string, idBiglietto: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/cerca-biglietto`, credentials);
  }

  ModificaBiglietto(credentials: {idBiglietto: number, tariffa:string, posto: string, prezzoFinale: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/modifica-biglietto`, credentials);
  }

  setnumBigliettiCreati(numero: number) {
    this.numBigliettiCreati.next(numero);
  }
  
  getnumBigliettiCreati(): Observable<number>{
    return this.numBigliettiCreati.asObservable();
  }
}
