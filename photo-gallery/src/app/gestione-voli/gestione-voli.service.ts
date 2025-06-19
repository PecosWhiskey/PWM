import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestioneVoliService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  Crea(credentials: { idVolo: string, partenza: string, destinazione: string, oraPartenza: string, oraArrivo: string, prezzo: number, postiDisponibili: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/creazione-volo`, credentials);

  }

  Modifica(credentials: { idVolo: string, partenza: string, destinazione: string, oraPartenza: string, oraArrivo: string, prezzo: number, postiDisponibili: number}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/modifica-volo`, credentials);
  }
}
