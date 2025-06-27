import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonSelectOption, IonInput,
  IonSelect, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRadio, IonLabel, IonChip } from '@ionic/angular/standalone';
import { BigliettiService } from '../services/biglietti.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  imports: [IonChip, IonLabel, IonRadio, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonInput, IonSelect, IonSelectOption, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CheckInPage implements OnInit {

  constructor(private bigliettiService: BigliettiService) { }

  //Dati necessari per la ricerca del biglietto di cui l'utente desisera fare il check-in
  idPasseggero = '';
  idBiglietto = 0;

  bigliettoTrovato!: Biglietto;
  found = false;
  numPosti = 10;
  postiDisponibili = Array.from({ length: this.numPosti}, (_, i) => i + 1);
  postiLettere = ['A', 'B', 'C', 'D', 'E', 'F'];
  postiTotali: string[] = [];

  //Dati necessari per il check-in
  sceltaPosto = '';
  tariffa = '';
  //Prezzo finale del biglietto calcolato in base alla tariffa scelta
  prezzo = 0.0;

  ngOnInit() {
    for(let i=0; i<this.postiDisponibili.length; i++){
      const lettera = this.postiLettere[i % this.postiLettere.length]; //'%' permette di ciclare le lettere quando finiscono
      this.postiTotali.push(lettera + (i+1));
    }

    console.log("Posti disponibili: ", this.postiDisponibili);
    console.log("Posti Totali: ", this.postiTotali);
  }

  Cerca(){
    const dati = {
      idPasseggero: this.idPasseggero,
      idBiglietto: this.idBiglietto
    }

    this.bigliettiService.CercaBiglietto(dati).subscribe({
      next: (response) => {
        console.log('Search success: ', response);
        this.found = true;
        this.bigliettoTrovato = response.data;
      },
       error: (err)=> {
        console.log('Search error: ', err);
        this.found = false;
       }
    })
  }

  CheckIn(){
    //Modifica del prezzo in base alla tariffa scelta
    switch (this.tariffa){
      case 'standard':
        this.prezzo = this.bigliettoTrovato.prezzoFinale * 1;
        break;
      case 'flex':
        this.prezzo = this.bigliettoTrovato.prezzoFinale * 1.5;
        break;
      case 'plus':
        this.prezzo = this.bigliettoTrovato.prezzoFinale * 2;
        break;  
      default:
        this.prezzo = this.bigliettoTrovato.prezzoFinale;
        break;  
    }
    //Creo l'oggetto per inviare i dati al back-end
    const data = {
      idBiglietto: this.idBiglietto,
      tariffa: this.tariffa,
      posto: this.sceltaPosto,
      prezzoFinale: this.prezzo
    }
    //Modifica del biglietto con inserimento dei nuovi dati dopo il check-in
    this.bigliettiService.ModificaBiglietto(data).subscribe({
      next: (response) => {
        console.log("Modification success: ", response);
      },
       error: (err) => {
        console.log("Modification error: ", err);
       }
    })
  }

}
