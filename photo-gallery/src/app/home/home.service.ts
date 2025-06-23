import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login-cliente`, credentials); 
    
  } 

  register(credentials: Cliente) : Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/registrazione-cliente`, credentials);
  }
}
