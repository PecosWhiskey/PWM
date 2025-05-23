import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getClienti() {
    return this.http.get(`${this.baseUrl}/clienti`);
  }
}
