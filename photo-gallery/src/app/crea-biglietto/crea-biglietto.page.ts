import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton } from '@ionic/angular/standalone';
import { Tab1Service } from '../tab1/tab1.service';
import { Volo } from '../models/volo.models';
import { SessionStorageService } from '../services/session-storage.service';
import { BigliettiService } from '../services/biglietti.service';

@Component({
  selector: 'app-crea-biglietto',
  templateUrl: './crea-biglietto.page.html',
  styleUrls: ['./crea-biglietto.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CreaBigliettoPage implements OnInit {

  constructor(private tab1Service: Tab1Service, private sessionStorage: SessionStorageService,
    private bigliettiService: BigliettiService) { }

  idVolo = '';
  idCliente = '';
  idPasseggero = '';
  tariffa = '';
  posto = '';
  dataPartenza = '';
  prezzoFinale = 0.0;
  dataAcquisto = '';

  creazioneEsito = '';
  modificaEsito = '';

  passeggeri : number[] = []; //array di lunghezza pari al numero di passeggeri

  bigliettoAndata! : Volo;
  bigliettoRitorno! : Volo;
  sceltaUtente=  ''; 

  ngOnInit() {
    //Recupera i dati dei biglietti scelti dal session storage
    const andata = this.sessionStorage.getItem('biglietto di andata scelto');
    if(andata != null){
      this.bigliettoAndata = andata;
    }

    const ritorno = this.sessionStorage.getItem('biglietto di ritorno scelto');
    if(ritorno != null){
      this.bigliettoRitorno = ritorno;
    }

    const passeggeri = this.sessionStorage.getItem('numero passeggeri');
    if(passeggeri != 0){
      this.passeggeri = Array.from({ length: passeggeri }, (_, i) => i + 1);
    }

    const scelta = this.sessionStorage.getItem('sceltaUtente');
    if(scelta != null){
      this.sceltaUtente = scelta;
    }
  }

  Acquista(){
    const data = new Date(); //Creo la data corrente
    this.dataAcquisto = data.toISOString().split('T')[0]; //la traformo in formato ISO e ricavo solo la prima parte (YYYY-MM-DD)
    //Creazione del biglietto di andata
    const datiAndata = {
      idVolo: this.bigliettoAndata.idVolo,
      idCliente: this.idCliente,
      idPasseggero : this.idPasseggero,
      tariffa: this.tariffa,
      posto: this.posto,
      dataPartenza: this.bigliettoAndata.oraPartenza,
      prezzoFinale: this.bigliettoAndata.prezzo,
      dataAcquisto: this.dataAcquisto
    }

    this.bigliettiService.CreaBiglietto(datiAndata).subscribe({
      next: (response) => {
        console.log('Creation success:', response);
        this.creazioneEsito = response.message;
      },
       error: (err) => {
        console.log('Creation error:', err);
        this.creazioneEsito = err.error.message;
       },
    });

    //Se il cliente ha anche acquistato il biglietto di ritorno
    if(this.sceltaUtente == 'roundtrip'){
      //Creazione biglietto di ritorno
      const datiRitorno = {
        idVolo: this.bigliettoRitorno.idVolo,
        idCliente: this.idCliente,
        idPasseggero : this.idPasseggero,
        tariffa: this.tariffa,
        posto: this.posto,
        dataPartenza: this.bigliettoRitorno.oraPartenza,
        prezzoFinale: this.bigliettoRitorno.prezzo,
        dataAcquisto: this.dataAcquisto
      }

      this.bigliettiService.CreaBiglietto(datiRitorno).subscribe({
        next: (response) => {
          console.log('Creation success:', response);
          this.creazioneEsito = response.message;
        },
         error: (err) => {
          console.log('Creation error:', err);
          this.creazioneEsito = err.error.message;
         },
      });
    }

    //Decremento dei posti disponibili per i voli di cui è stato acquistato un biglietto
    //Decremento per il volo di andata
    const postiNuovi = this.bigliettoAndata.postiDisponibili - 1;
    const datiVolo = {
      idVolo: this.bigliettoAndata.idVolo,
      posti: postiNuovi
    }
    this.bigliettiService.ModificaVolo(datiVolo).subscribe({
      next: (response) => {
        console.log('Modification success:', response);
        this.creazioneEsito = response.message;
      },
       error: (err) => {
        console.log('Modification error:', err);
        this.creazioneEsito = err.error.message;
       },
    });

    //Se il cliente ha anche acquistato il biglietto di ritorno
    if(this.sceltaUtente == 'roundtrip'){
      //Decremento per il volo di ritorno
      const postiNuoviR = this.bigliettoAndata.postiDisponibili - 1;
      const datiVoloR = {
        idVolo: this.bigliettoAndata.idVolo,
        posti: postiNuoviR
      }
      this.bigliettiService.ModificaVolo(datiVoloR).subscribe({
        next: (response) => {
          console.log('Modification success:', response);
          this.modificaEsito = response.message;
        },
         error: (err) => {
          console.log('Modification error:', err);
          this.modificaEsito = err.error.message;
         },
      })
    }
  }
}
