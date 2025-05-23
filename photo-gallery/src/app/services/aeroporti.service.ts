import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AeroportiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAeroporti() {
    return this.http.get(`${this.baseUrl}/aeroporti`);
  }
}
