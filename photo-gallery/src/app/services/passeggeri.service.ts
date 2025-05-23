import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassegeriService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPassegeri() {
    return this.http.get(`${this.baseUrl}/passeggeri`);
  }
}
