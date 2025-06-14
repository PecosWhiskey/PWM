import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput, IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPopover, IonHeader } from '@ionic/angular/standalone';
//import { CercaBigliettoService } from './home-service.service';
import { HomeService } from './home.service';
import { Volo } from '../models/volo.models';
import { RouterModule, RouterOutlet, RouterLink} from '@angular/router';
//import { AccountService } from '../account-cliente/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterModule, IonHeader, RouterModule, IonPopover, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonDatetime, IonInput, IonButton, IonItem, IonContent, CommonModule, FormsModule]
})
export class HomePage {

  constructor(private homeService: HomeService){}

  partenza = ''; //città di partenza
  destinazione = ''; //città di destinazione
  dataInseritaP = ''; //recupera la data di partenza inserita dall'utente con fuso e ora
  dataInseritaR = ''; //recupera la data di destinazione inserita dall'utente con fuso e ora
  dataPartenza = ''; //data di partenza senza fuso e ora
  dataRitorno = ''; //data di ritorno senza fuso e ora
  cercaVoloEsito = ''; //esito della ricerca sei voli

  trovati = false;//serve per visualizzare i biglietti trovati
  bigliettiAndata: Volo[] = []; //array dei biglietti di partenza trovati
  bigliettiRitorno: Volo[] = []; //array dei biglietti di ritorno trovati

  form= ''; //variabile che viene settata su 'Login' o 'Registrazione' per stabilire quale form mostrare

  Cerca(){
    this.dataPartenza = this.dataInseritaP.split('T')[0];
    this.dataRitorno = this.dataInseritaR.split('T')[0];
    const datiVoloPartenza = {
      partenza: this.partenza,                  //COME FACCIO A FARE IN MODO CHE NON CAMBI QUANDO IL CLIENTE DIGITA UN'ALTRA CITTA'?
      destinazione : this.destinazione,
      oraPartenza : this.dataPartenza
    }
    //Ricerca dei voli per la data di partenza
    this.homeService.CercaVolo(datiVoloPartenza).subscribe({ 
        next: (response) => {
        console.log('Search success:', response);
        this.cercaVoloEsito= response.message;
        this.trovati = true;
        this.bigliettiAndata = response.data;
       },
       error: (err) => {
        console.log('Search error:', err);
        this.cercaVoloEsito = err.error.message;
       },
      }); 
      //Ricerca dei voli per la data di ritorno
      const datiVoloRitorno = {
      partenza: this.destinazione,
      destinazione : this.partenza,
      oraPartenza : this.dataRitorno
    }
      this.homeService.CercaVolo(datiVoloRitorno).subscribe({ 
        next: (response) => {
        console.log('Search success:', response);
        this.cercaVoloEsito= response.message;
        this.trovati = true;
        this.bigliettiRitorno = response.data;
       },
       error: (err) => {
        console.log('Search error:', err);
        this.cercaVoloEsito = err.error.message;
       },
      }); 
  }
/*
  cambiaForm(form: string){
    this.accountService.setForm(form);
    console.log("L'utente ha cliccato su ", form);
  }
*/    
}