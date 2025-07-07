import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonModal,
  IonTitle,
  IonButtons
} from '@ionic/angular/standalone';
import { RouterModule, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, listOutline, addCircleOutline, personOutline, ticketOutline, airplaneOutline,
  calendarOutline, timeOutline, peopleOutline, cardOutline, locationOutline, calendar, pricetagOutline,
  informationCircleOutline, searchOutline, checkmarkCircleOutline, checkmarkDoneOutline, close, mapOutline,
  arrowDownOutline, checkmarkCircle, closeCircle, airplane, location } from 'ionicons/icons';
import { BigliettiService } from '../services/biglietti.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonAlert,
    IonModal,
    IonTitle,
    IonButtons,
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink
  ]
})
export class CheckInPage implements OnInit {

  constructor(private bigliettiService: BigliettiService) {
    addIcons({informationCircleOutline, createOutline, listOutline, addCircleOutline, personOutline, ticketOutline, airplaneOutline,
      calendarOutline, timeOutline, peopleOutline, cardOutline, locationOutline, calendar, pricetagOutline, searchOutline,
      checkmarkCircleOutline, checkmarkDoneOutline, close, mapOutline, arrowDownOutline, checkmarkCircle, closeCircle, airplane, location});
  }

  //Dati necessari per la ricerca del biglietto di cui l'utente desisera fare il check-in
  idPasseggero = '';
  idBiglietto = 0;

  //Variabili il cui valore dipende dalle risposte alle richieste inviate al server
  bigliettoTrovato!: Biglietto;
  richiestaEsito = '';
  found = false; //Permette la prosecuzione del check-in se il biglietto è stato trovato

  // Capienza fissa di tutti i voli: 132 posti
  readonly CAPIENZA_AEREO = 132;
  postiLettere = ['A', 'B', 'C', 'D'];
  postiTotali: string[] = [];
  postiOccupati: any[] = [];
  idVolo = '';
  bigliettoModificato: any;
  occupied = false; //Non permette di proseguire con il completamento del check-in se il posto scelto è già occupato
  founded = false; //Non permette di proseguire con il check-in se l'utente sceglie un posto non presente sull'aereo

  //Dati necessari per il check-in
  sceltaPosto = '';
  tariffa = '';
  //Prezzo finale del biglietto calcolato in base alla tariffa scelta
  prezzo = 0.0;

  //Variabili che gestiscono l'apertura della modale per mostrare il biglietto modificato
  isModalOpen = false;

  //Variabili che gestiscono l'apertura della modale per la mappa dei posti
  isSeatMapOpen = false;

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Funzioni per gestire l'apertura della modale per la mappa dei posti
  openSeatMap() {
    this.isSeatMapOpen = true;
  }

  closeSeatMap() {
    this.isSeatMapOpen = false;
  }

  //Funzione per calcolare il numero di posti disponibili
  getPostiDisponibili(): number {
    return this.CAPIENZA_AEREO - this.postiOccupati.length;
  }

  // //Funzione per ottenere la lista dei posti occupati come stringa
  // getPostiOccupatiList(): string {
  //   if (this.postiOccupati.length === 0) {
  //     return "Nessun posto occupato";
  //   }
  //   return this.postiOccupati.map(posto => posto.posto).join(', ');
  // }

  ngOnInit() {
    //Recupero del biglietto modificato dopo il check-in per mostrarlo all'utente
    this.bigliettiService.getBigliettoModificato().subscribe(biglietto => {
      this.bigliettoModificato = biglietto;
      console.log("BIGLIETTO MODIFICATO NGONINIT: ", this.bigliettoModificato);
    });

    //Recupero dei posti totali dal Local Storage
    const posti = localStorage.getItem('posti totali');
    console.log("POSTI: ", posti);
    //Verifica se i dati sono presenti
    if(posti != null){
      //Se presenti viene eseguito il parsing dei dati per ottenere l'array originale
      this.postiTotali = JSON.parse(posti);
      console.log("POSTI TOTALI OTTENUTI DAL LOCAL STORAGE: ", this.postiTotali);
    }else{
      //Se non presente viene ricreato l'array
      for(let i = 1; i <= this.CAPIENZA_AEREO; i++) {
        //Calcolo il numero di riga del posto
        const riga = Math.ceil(i / this.postiLettere.length);
        //Calcolo l'indice della lettera
        const letteraIndex = (i - 1) % this.postiLettere.length;
        //Trovo la lettere corrispondente all'indice calcolato
        const lettera = this.postiLettere[letteraIndex];
        this.postiTotali.push(riga + lettera);
      }
      console.log("POSTI TOTALI GENERATI DOPO IL CICLO FOR: ", this.postiTotali);
      //Memorizzo nuovamente i posti nel LocalStorage
      localStorage.setItem("posti totali", JSON.stringify(this.postiTotali));
    }

    console.log(`Aereo con capienza: ${this.CAPIENZA_AEREO} posti`);
  }

  //Variabili e funzioni che gestiscono la comparsa dell'alert se il posto scelto dal cliente è già occupato
  isAlertOpen = false;
  alertButtons = ['Chiudi'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  isFoundedAlertOpen= false;
  alertFoundedButtons = ['OK'];

  setOpenNotFounded(isOpen: boolean){
    this.isFoundedAlertOpen = isOpen;
  }

  //Funzione che ricerca il biglietto con idBiglietto e idPasseggero inseriti dall'utente
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
            this.richiestaEsito = err.error.message;
           }
        })
      },
       error: (err)=> {
        console.log('Search error: ', err);
        this.richiestaEsito = err.error.message;
        this.found = false;
        if(this.richiestaEsito =="Check-in già fatto!"){
          this.setOpen(true);
        }else if(this.richiestaEsito != "Non ci sono biglietti acquistati!"){
          this.richiestaEsito = "ERRORE: Dati non validi!";
        }
       }
    })
  }

  //Funzione che gestisce il completamento del check-in
  CheckIn(){
    //Inizializzo la variabile a false prima di iniziare il ciclo per sovrascrivere il valore precedente
    this.founded = false;
    //Verifica che il posto scelto dall'utente sia presente nell'aereo
    for(let i=0; i<this.postiTotali.length; i++){
      if(this.sceltaPosto.toUpperCase() == this.postiTotali[i]){
        //Se presente non è necessario proseguire oltre nel ciclo
        this.founded = true;
        break;
      }
    }
    //Se il posto non è presente mostra l'alert ed esce dalla funzione
    if(!this.founded){
      this.setOpenNotFounded(true);
      return;
    }

    //Inizializzo la variabile a false prima di iniziare il ciclo per sovrascrivere il valore precedente
    this.occupied = false;
    //Verifica che il posto non sia già stato prenotato
    for(let i=0; i<this.postiOccupati.length; i++){
      console.log("posto occupato: ", this.postiOccupati[i].posto);
      console.log("posto scelto: ", this.sceltaPosto);
      if(this.sceltaPosto.toUpperCase() == this.postiOccupati[i].posto){
        this.setOpen(true);
        //Essendo occupato il posto la variabile cambia il suo valore in true
        this.occupied = true;
        break;
      }
    }
    //Se il posto scelto è già occupato mostra l'alert ed esce dalla funzione per non continuare con la modifica del biglietto
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
      posto: this.sceltaPosto.toUpperCase(),
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
        this.richiestaEsito = err.error.message;
        if(this.richiestaEsito != 'Nessun biglietto da modificare trovato' && this.richiestaEsito != 'Errore nella modifica del biglietto'){
          this.richiestaEsito = "ERRORE: Dati non validi!";
        }
       }
    })
  }

  //Funzione che approssima il prezzo finale del biglietto modificato mostrato
  Approssima(prezzo: number): number {
    return Math.round(prezzo * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  //Funzione per chiudere la modale
  closeModal() {
    this.setModalOpen(false);
  }
}
