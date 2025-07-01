import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { Volo } from '../models/volo.models';
import { SessionStorageService } from '../services/session-storage.service';
import { BigliettiService } from '../services/biglietti.service';

@Component({
  selector: 'app-crea-biglietto',
  templateUrl: './crea-biglietto.page.html',
  styleUrls: ['./crea-biglietto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class CreaBigliettoPage implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private sessionStorage: SessionStorageService,
    private bigliettiService: BigliettiService
  ) {}

  //Dati richiesti in fase di acquisto del biglietto
  idVolo = '';
  idPasseggero = '';
  nome = '';
  cognome = '';
  dataNascita = '';
  documentoID = '';
  tariffa = '';
  posto = '';
  dataPartenza = '';
  prezzoFinale = 0.0;
  dataAcquisto = '';

  //Variabili il cui valore cambia in base alle risposte del server alle richieste inviate
  creazioneEsito = '';
  bigliettoCreato = false;
  modificaEsito = '';
  passeggeroCreato = false;
  numBigliettiCreatiAndata = 0; //Tiene traccia del numero di biglietti creati
  numBigliettiCreatiRitorno = 0;

  numPasseggeri = 0; //numero di passeggeri selezionato dall'utente in fase di ricerca dei voli
  numeroPasseggeri : number[] = []; //array di lunghezza pari al numero di passeggeri, che viene utilizzato per il primo ciclo for presente nell'html
  passeggeri: any[] = []; //array che conterrà i dati dei passeggeri per cui verrà creato il biglietto

  //Dati ottenuti dal SessionStorage
  bigliettoAndata! : Volo;
  bigliettoRitorno! : Volo;
  sceltaUtente=  '';

  //Array che memorizza ogni biglietto che viene inserito nel database
  bigliettiCreati: any[] = [];

  ngOnInit() {
    //Recupera i dati dei biglietti scelti dal session storage
    const andata = this.sessionStorage.getItem('biglietto di andata scelto');
    if(andata != null){
      this.bigliettoAndata = andata;
      console.log(this.bigliettoAndata);
    }

    const ritorno = this.sessionStorage.getItem('biglietto di ritorno scelto');
    if(ritorno != null){
      this.bigliettoRitorno = ritorno;
      console.log(this.bigliettoRitorno);
    }

    const passeggeri = this.sessionStorage.getItem('numero passeggeri');
    if(passeggeri != 0){
      this.numPasseggeri = passeggeri;
      this.numeroPasseggeri = Array.from({ length: passeggeri }, (_, i) => i + 1);
      //Richiamo alla funzione che inizializza l'array di oggetti, con i dati dei passeggeri, con valori nulli
      this.inizializzaPasseggeri();
    }

    const scelta = this.sessionStorage.getItem('sceltaUtente');
    if(scelta != null){
      this.sceltaUtente = scelta;
    }

    this.bigliettiService.getnumBigliettiCreatiAndata().subscribe(numero => {
      this.numBigliettiCreatiAndata = numero;
    });

    this.bigliettiService.getnumBigliettiCreatiRitorno().subscribe(numero => {
      this.numBigliettiCreatiRitorno = numero;
    });
  }

  //Funzione che inizializza un array di lunghezza pari al numero di passeggeri con i dati da inserire nel form a valori nulli
  inizializzaPasseggeri() {
    // Svuota l'array prima di inizializzare
    this.passeggeri = [];

    for (let i = 0; i < this.numPasseggeri; i++) {
      this.passeggeri.push({
        idPasseggero: '',
        nome: '',
        cognome: '',
        dataNascita: '',
        documentoID: '',
      });
    }
  }

  //Funzione che permette di creare il biglietto, ricevendo in input i dati del passeggero di cui viene confermata la creazione del biglietto
  Acquista(passeggero: any){
    console.log(passeggero);
    //Memorizzazione dei dati del passeggero nel database
    this.bigliettiService.CreaPasseggero(passeggero).subscribe({
      next: (response) => {
        console.log('Creation success:', response);
        this.creazioneEsito = response.message;
        this.passeggeroCreato= true;
        this.idPasseggero = response.data.idPasseggero;

        //Creato il passeggero procedo a creare il biglietto
        //Ottengo la data corrente
        const data = new Date();
        this.dataAcquisto = data.toISOString().split('T')[0]; //la traformo in formato ISO e ricavo solo la prima parte (YYYY-MM-DD)
        //Creazione del biglietto di andata
        const datiAndata = {
          idVolo: this.bigliettoAndata.idVolo,
          idPasseggero : this.idPasseggero,
          tariffa: this.tariffa,
          posto: this.posto,
          dataPartenza: this.bigliettoAndata.oraPartenza + " "+this.bigliettoAndata.oraArrivo.split(' ')[1],
          prezzoFinale: this.bigliettoAndata.prezzo,
          dataAcquisto: this.dataAcquisto
        }

        this.bigliettiService.CreaBiglietto(datiAndata).subscribe({
          next: (response) => {
            console.log('Creation success:', response);
            this.creazioneEsito = response.message;
            //Memorizza il numero di biglietti creati nel BigliettiService
            this.numBigliettiCreatiAndata++;
            this.bigliettiService.setnumBigliettiCreatiAndata(this.numBigliettiCreatiAndata);
            this.bigliettiCreati.push(response.data);
            console.log(this.bigliettiCreati);
            this.bigliettoCreato = true;


            //Creato il biglietto decremento dei posti disponibili per i voli di cui è stato acquistato un biglietto
            //Decremento per il volo di andata
            const postiNuovi = this.bigliettoAndata.postiDisponibili - this.numBigliettiCreatiAndata;
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
          },
           error: (err) => {
            console.log('Creation error:', err);
            this.creazioneEsito = err.error.message;
           },
        });

        //Se il cliente ha anche acquistato il biglietto di ritorno
        if((this.sceltaUtente == 'roundtrip' || this.sceltaUtente == 'nessun selezionato') && this.bigliettoRitorno){
        //Creazione biglietto di ritorno
          const datiRitorno = {
            idVolo: this.bigliettoRitorno.idVolo,
            idPasseggero : this.idPasseggero,
            tariffa: this.tariffa,
            posto: this.posto,
            dataPartenza: this.bigliettoRitorno.oraPartenza + " "+this.bigliettoRitorno.oraArrivo.split(' ')[1],
            prezzoFinale: this.bigliettoRitorno.prezzo,
            dataAcquisto: this.dataAcquisto
          }

          this.bigliettiService.CreaBiglietto(datiRitorno).subscribe({
            next: (response) => {
              console.log('Creation success:', response);
              this.creazioneEsito = response.message;
              //Memorizza il numero di biglietti creati nel BigliettiService
              this.numBigliettiCreatiRitorno++;
              this.bigliettiService.setnumBigliettiCreatiRitorno(this.numBigliettiCreatiRitorno);
              this.bigliettiCreati.push(response.data);
              this.bigliettoCreato = true;

              //Decremento per il volo di ritorno
              const postiNuoviR = this.bigliettoRitorno.postiDisponibili - this.numBigliettiCreatiRitorno;
              const datiVoloR = {
                idVolo: this.bigliettoRitorno.idVolo,
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
            },
             error: (err) => {
              console.log('Creation error:', err);
              this.creazioneEsito = err.error.message;
            },
          });
        }
      },
       error: (err) => {
        console.log('Creation error:', err);
        this.creazioneEsito = err.error.message;
        this.passeggeroCreato = false;
       },
    });
  }

  // Metodo per tornare indietro
  goBack() {
    this.location.back();
  }
}
