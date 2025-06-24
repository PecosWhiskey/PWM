import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biglietto } from '../models/biglietto.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigliettiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  CreaBiglietto(credentials: Biglietto): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/ricerca-volo`, credentials);
  }

  ModificaVolo(credentials: {idVolo: string, posti: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/decremento-posti`, credentials);
  }
  
}
