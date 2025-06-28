import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ClientiService } from '../services/clienti.service';
import { TokenService } from '../services/token.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-biglietti-acquistati',
  templateUrl: './biglietti-acquistati.page.html',
  styleUrls: ['./biglietti-acquistati.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BigliettiAcquistatiPage implements OnInit {

  isLogged = false;
  idCliente = '';
  clientInfo!: any;
  biglietti: Biglietto[] = [];

  constructor(private clientiService: ClientiService, private tokenService: TokenService) { }

  // async ngOnInit(){
  //   this.isLogged = await this.tokenService.isLogged();
  //   if(this.isLogged){
  //     await this.caricaBiglietti();
  //   }
  //   }
  ngOnInit(){
   this.isLogged = this.tokenService.isLogged();
   if(this.isLogged){
     this.caricaBiglietti();
    }
  }
  
  caricaBiglietti(){ //PRIMA C'ERA ASYNC

  //  this.clientInfo = await this.tokenService.getClientInfo();
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
