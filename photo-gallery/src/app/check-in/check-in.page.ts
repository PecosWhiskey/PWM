import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonSelectOption, IonInput,
  IonSelect, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRadio, IonLabel, IonChip, IonAlert, IonModal } from '@ionic/angular/standalone';
import { BigliettiService } from '../services/biglietti.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  imports: [IonModal, IonAlert, IonChip, IonLabel, IonRadio, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonInput, IonSelect, IonSelectOption, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
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
  postiOccupati: any[] = [];
  idVolo = '';
  bigliettoModificato: any;
  occupied = false;

  //Dati necessari per il check-in
  sceltaPosto = '';
  tariffa = '';
  //Prezzo finale del biglietto calcolato in base alla tariffa scelta
  prezzo = 0.0;

  //Variabili che gestiscono l'apertura della modale per mostrare il biglietto modificato
  isModalOpen = false;

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.bigliettiService.getBigliettoModificato().subscribe(biglietto => {
      this.bigliettoModificato = biglietto;
      console.log("BIGLIETTO MODIFICATO NGONINIT: ", this.bigliettoModificato);
    });

    for(let i=0; i<this.postiDisponibili.length; i++){
      const lettera = this.postiLettere[i % this.postiLettere.length]; //'%' permette di ciclare le lettere quando finiscono
      this.postiTotali.push(lettera + (i+1));
    }

    console.log("Posti disponibili: ", this.postiDisponibili);
    console.log("Posti Totali: ", this.postiTotali);
  }

  //Variabili e funzione che gestiscono la comparsa dell'alert se il posto scelto dl cliente è già occupato
  isAlertOpen = false;
  alertButtons = ['Chiudi'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
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
       
        //Ricerca dei posti già prenotati per il volo per cui è stato acquistato il biglietto
        this.idVolo = this.bigliettoTrovato.idVolo;
        console.log("ID VOLO: ", this.idVolo);
        this.bigliettiService.OttieniPostiOccupati({idVolo : this.idVolo}).subscribe({
          next: (response)=>{
            console.log('Search success: ', response);
            this.postiOccupati = response.data;
          },error: (err)=>{
            console.log("Search error: ", err);
          }
        })
      },
       error: (err)=> {
        console.log('Search error: ', err);
        this.found = false;
       }
    })
  }

  CheckIn(){
    //Inizializzo la variabile a faòse prima di iniziare il ciclo per sovrascrivere il valore precedente 
    this.occupied = false;
    //Verifica che il posto non sia già stato prenotato
    for(let i=0; i<this.postiOccupati.length; i++){
      console.log("posto occupato: ", this.postiOccupati[i].posto);
      console.log("posto scelto: ", this.sceltaPosto);
      if(this.sceltaPosto == this.postiOccupati[i].posto){
        this.setOpen(true);
        this.occupied = true;
        break;
      }
    }
    //Se il posto scelto è già occupato mostra l'alert ed esci dalla funzione per non continuare con la modifica del biglietto
    if(this.occupied){
      return;
    }
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
        this.bigliettoModificato = response.data;
        console.log("BIGLIETTO MODIFICATO: ", this.bigliettoModificato);
        this.bigliettiService.setBigliettoModificato(this.bigliettoModificato);
        this.setModalOpen(true);
      },
       error: (err) => {
        console.log("Modification error: ", err);
       }
    })
  }

}
