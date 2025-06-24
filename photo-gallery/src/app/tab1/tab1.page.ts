import { Component } from '@angular/core';
import {IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,IonButton,
  IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, IonPopover, IonDatetime, IonCardHeader, IonCardTitle} from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Tab1Service } from './tab1.service';
import { Volo } from '../models/volo.models';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterModule, IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,
    IonIcon,IonLabel,IonButton,IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, FormsModule, IonDatetime, IonPopover, IonCardHeader, IonCardTitle],
})
export class Tab1Page {
  constructor(private tab1Service: Tab1Service, private sessionStorageService: SessionStorageService){}

  partenza = ''; //città di partenza
  destinazione = ''; //città di destinazione
  dataInseritaP = ''; //recupera la data di partenza inserita dall'utente con fuso e ora
  dataInseritaR = ''; //recupera la data di destinazione inserita dall'utente con fuso e ora
  dataPartenza = ''; //data di partenza senza fuso e ora
  dataRitorno = ''; //data di ritorno senza fuso e ora
  numPasseggeri = 1;
  cercaVoloEsito = ''; //esito della ricerca sei voli

  trovati = false;//serve per visualizzare i biglietti trovati
  bigliettiAndata: Volo[] = []; //array dei biglietti di partenza trovati
  bigliettiRitorno: Volo[] = []; //array dei biglietti di ritorno trovati

  form= ''; //variabile che viene settata su 'Login' o 'Registrazione' per stabilire quale form mostrare

  scelta = 'nessun selezionato'; //assume il valore corrispondente alla scelta tra andata e ritorno o solo andata


  CampiValidi(){
    if(this.scelta == 'oneway'){
      return this.partenza && this.destinazione && this.dataInseritaP
    }else{
      return this.partenza && this.destinazione && this.dataInseritaP && this.dataInseritaR;
    }
  }

  Cerca(){
    this.dataPartenza = this.dataInseritaP.split('T')[0];
    this.dataRitorno = this.dataInseritaR.split('T')[0];
    //Oggetto con i dati che devono essere invaiti al server per la ricerca dei voli
    const datiVoloPartenza = {
      partenza: this.partenza,                 
      destinazione : this.destinazione,
      oraPartenza : this.dataPartenza
    }
    //Oggetto con le informazioni sulla ricerca da mostrare nel tab2
    const ricercaInfo = {
      partenza : this.partenza,
      destinazione : this.destinazione,
      dataPartenza : this.dataPartenza,
      dataRitorno : this.dataRitorno
    }
    //Memorizza le informazioni sulla ricerca dell'utente nel session storage e nel service del tab1
    this.sessionStorageService.setItem('ricercaInfo', ricercaInfo);
    this.sessionStorageService.setItem('numero passeggeri', this.numPasseggeri);
    this.tab1Service.setRicercaInfo(ricercaInfo);
    //Ricerca dei voli per la data di partenza
    this.tab1Service.CercaVolo(datiVoloPartenza).subscribe({ 
        next: (response) => {
        console.log('Search success:', response);
        this.cercaVoloEsito= response.message;
        this.trovati = true;
        //Memorizza il risultato della ricerca true o false in base che i voli siano stati trovato o no
        this.tab1Service.setVoliTrovatiAndata(this.trovati);
        //Memorizza temporaneamente il risultato della ricerca dei voli di andata
        this.sessionStorageService.setItem('voliAndataTrovati', this.trovati);
        this.bigliettiAndata = response.data;
        //Memorizza i biglietti trovati nel service a cui accederà l'altro tab per mostrarli
        this.tab1Service.setBigliettiAndata(this.bigliettiAndata);
        //Memorizza temporaneamente i biglietti di andata trovati nel Session Storage
        this.sessionStorageService.setItem('bigliettiAndata', this.bigliettiAndata);
       },
       error: (err) => {
        console.log('Search error:', err);
        this.cercaVoloEsito = err.error.message;
       },
      }); 
      //Se la scelta è stata andata e ritorno oppure nessuna scelta allora vengono cercati anche i voli di ritorno
      if(this.scelta == 'roundtrip' || this.scelta == 'nessun selezionato'){
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
            //Memorizza il risultato della ricerca true o false in base che i voli siano stati trovato o no
            this.tab1Service.setVoliTrovatiRitorno(this.trovati);
            //Memorizza temporaneamente il risultato della ricerca dei voli di ritorno
            this.sessionStorageService.setItem('voliRitornoTrovati', this.trovati);
            this.bigliettiRitorno = response.data;
            //Memorizza i biglietti trovati nel service a cui accederà l'altro tab per mostrarli
            this.tab1Service.setBigliettiRitorno(this.bigliettiRitorno);
            //Memorizza temporaneamente i biglietti di ritorno trovati nel Session Storage
            this.sessionStorageService.setItem('bigliettiRitorno', this.bigliettiRitorno);
          },
          error: (err) => {
            console.log('Search error:', err);
            this.cercaVoloEsito = err.error.message;
          },
        }); 
      } 
  }

  onClick(){
    console.log("Click su ", this.scelta);
    //Memorizza la scelta dell'utente tra andata e ritorno o solamente andata per effettuare la ricerca dei voli
    this.tab1Service.setSceltaUtente(this.scelta);
    this.sessionStorageService.setItem('sceltaUtente', this.scelta);
  }
}
