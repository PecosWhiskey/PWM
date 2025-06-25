import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volo } from '../models/volo.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private voli = new BehaviorSubject<Volo[]>([]);

  setVolo(founded: Volo[]) {
    this.voli.next(founded);
  }
  
  getVolo(): Observable<Volo[]>{
    return this.voli.asObservable();
  }
}
