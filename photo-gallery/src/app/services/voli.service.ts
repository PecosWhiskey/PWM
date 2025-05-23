import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoliService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVoli() {
    return this.http.get(`${this.baseUrl}/voli`);
  }
}
