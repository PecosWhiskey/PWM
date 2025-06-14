import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  CercaVolo(credentials: { partenza: string, destinazione: string, oraPartenza: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/ricerca-volo`, credentials); 
    
  } 
}
