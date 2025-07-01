import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ClientiService } from '../services/clienti.service';
import { TokenService } from '../services/token.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-biglietti-acquistati',
  templateUrl: './biglietti-acquistati.page.html',
  styleUrls: ['./biglietti-acquistati.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, CommonModule, FormsModule]
})
export class BigliettiAcquistatiPage implements OnInit {

  //Informazioni del cliente che accede alla pagina memorizzate nel LocalStorage
  idCliente = '';
  clientInfo!: any;
  //Array dei biglietti acquistati dal cliente
  biglietti: Biglietto[] = [];

  constructor(private clientiService: ClientiService, private tokenService: TokenService) { }

  ngOnInit(){
    //Caricamento dei biglietti acquistati
    this.caricaBiglietti();
  }

  //Funzione che permette di ottenere i biglietti acquistati direttamente dal database 
  caricaBiglietti(){
    //Ottengo l'idCliente che serve per inviare la richiesta al servers
    this.clientInfo = this.tokenService.getClientInfo();
    this.idCliente = this.clientInfo.idCliente;

    this.clientiService.CercaBiglietti({idCliente : this.idCliente}).subscribe({
      next: (response) => {
        console.log("Search success: ", response);
        this.biglietti = response.data;
      },
       error: (err) => {
        console.log("Search error: ", err);
       }
    })
  }
}
