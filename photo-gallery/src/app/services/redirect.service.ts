import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Volo } from '../models/volo.models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private bigliettiAndataSource = new BehaviorSubject<Volo[]>([]);
  private bigliettiRitornoSource = new BehaviorSubject<Volo[]>([]);
  private cercaInfoSource = new BehaviorSubject<{
    partenza: string;
    destinazione: string;
    dataPartenza: string;
    dataRitorno: string;
  }>({ partenza: '', destinazione: '', dataPartenza: '', dataRitorno: '' });

  bigliettiAndata$ = this.bigliettiAndataSource.asObservable();
  bigliettiRitorno$ = this.bigliettiRitornoSource.asObservable();
  cercaInfo$ = this.cercaInfoSource.asObservable();

  setSearchResults(andata: Volo[], ritorno: Volo[]) {
    this.bigliettiAndataSource.next(andata);
    this.bigliettiRitornoSource.next(ritorno);
  }

  setSearchInfo(info: { partenza: string; destinazione: string; dataPartenza: string; dataRitorno: string; }) {
    this.cercaInfoSource.next(info);
  }
}
