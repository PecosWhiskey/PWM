import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BigliettiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBiglietti() {
    return this.http.get(`${this.baseUrl}/biglietti`);
  }
}
