import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(private tokenService: TokenService, private http : HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login-cliente`, credentials); 
    
  } 

  register(credentials: Cliente) : Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/registrazione-cliente`, credentials);
  }
}
