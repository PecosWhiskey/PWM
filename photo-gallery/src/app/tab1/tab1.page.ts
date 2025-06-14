import { Component } from '@angular/core';
import {IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,IonButton,
  IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, IonPopover, IonDatetime, IonCardHeader, IonCardTitle} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tab1Service } from './tab1.service';
import { Volo } from '../models/volo.models';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, RouterLink} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterModule, IonPopover, IonHeader,IonToolbar,IonTitle,IonContent,ExploreContainerComponent,IonTabs,IonTabBar,IonTabButton,
    IonIcon,IonLabel,IonButton,IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, FormsModule, IonDatetime, IonPopover, IonCardHeader, IonCardTitle],
})
export class Tab1Page {
  constructor(private tab1Service: Tab1Service){}
  
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

    CampiValidi(){
      return this.partenza && this.destinazione && this.dataInseritaP && this.dataInseritaR;
    }
  
    Cerca(){
      this.dataPartenza = this.dataInseritaP.split('T')[0];
      this.dataRitorno = this.dataInseritaR.split('T')[0];
      const datiVoloPartenza = {
        partenza: this.partenza,                  //COME FACCIO A FARE IN MODO CHE NON CAMBI QUANDO IL CLIENTE DIGITA UN'ALTRA CITTA'?
        destinazione : this.destinazione,
        oraPartenza : this.dataPartenza
      }
      //Ricerca dei voli per la data di partenza
      this.tab1Service.CercaVolo(datiVoloPartenza).subscribe({ 
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
        this.tab1Service.CercaVolo(datiVoloRitorno).subscribe({ 
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
}
