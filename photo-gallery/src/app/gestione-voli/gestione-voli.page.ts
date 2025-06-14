import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonDatetime, IonInput } from '@ionic/angular/standalone';
import { GestioneVoliService } from './gestione-voli.service';

@Component({
  selector: 'app-gestione-voli',
  templateUrl: './gestione-voli.page.html',
  styleUrls: ['./gestione-voli.page.scss'],
  standalone: true,
  imports: [IonInput, IonDatetime, IonButton, IonItem, IonButton, IonContent, CommonModule, FormsModule]
})
export class GestioneVoliPage{

  constructor(private gestioneVoliService: GestioneVoliService){}

  idVolo = '';
  partenza = '';
  destinazione = '';
  data = '';
  oraPartenza = '';
  oraArrivo = '';
  prezzo = 0.0;
  creaVoloEsito = '';

  formattaData(dataRicevuta:string, ora:string){
    console.log("Data: ", dataRicevuta);
    const dataStringa = dataRicevuta.split('T')[0]; //..[0] corrisponde alla data [1] al resto della stringa dopo T
//    const ora = data.split('T')[1].split('.')[0]; //tolgo millisecondi ne fuso orario
    console.log("Data Stringa: ", dataStringa);
    const dataFormattata = dataStringa + ' ' + ora;
    console.log("Data formattata: ", dataFormattata);
    return dataFormattata;
  }

  CreaVolo(){
    const oraP = this.formattaData(this.data, this.oraPartenza);
    const oraA = this.formattaData(this.data, this.oraArrivo);
    const datiVolo = {
      idVolo: this.idVolo,
      partenza: this.partenza,
      destinazione: this.destinazione,
      oraPartenza: oraP,
      oraArrivo: oraA,
      prezzo: this.prezzo
    }
    this.gestioneVoliService.Crea(datiVolo).subscribe({
        next: (response) => {
        console.log('Creation success:', response);
        this.creaVoloEsito= response.message;
       },
       error: (err) => {
        console.log('Creation error:', err);
        this.creaVoloEsito = err.error.message;
       },
      });
  }

  ModificaVolo(){
    const oraP = this.formattaData(this.data, this.oraPartenza);
    const oraA = this.formattaData(this.data, this.oraArrivo);
    const datiVolo = {
      idVolo: this.idVolo,
      partenza: this.partenza,
      destinazione: this.destinazione,
      oraPartenza: oraP,
      oraArrivo: oraA,
      prezzo: this.prezzo
    }
    this.gestioneVoliService.Modifica(datiVolo).subscribe({
        next: (response) => {
        console.log('Creation success:', response);
        this.creaVoloEsito= response.message;
       },
       error: (err) => {
        console.log('Creation error:', err);
        console.log('Impossibile modificare il volo, perché assente nel database!');
        this.creaVoloEsito = err.error.message;
       },
      });
  }
}
