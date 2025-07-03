import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';
import { GestioneVoliService } from '../gestione-voli/gestione-voli.service';
import { Volo } from '../models/volo.models';
import { RouterModule, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, listOutline, addCircleOutline, personOutline, ticketOutline, airplaneOutline,
  calendarOutline, timeOutline, peopleOutline, cardOutline, locationOutline,
  searchOutline, informationCircleOutline} from 'ionicons/icons';

@Component({
  selector: 'app-voli-disponibili',
  templateUrl: './voli-disponibili.page.html',
  styleUrls: ['./voli-disponibili.page.scss'],
  standalone: true,
  imports: [
    IonBadge, IonIcon, IonButton, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonContent, IonHeader, IonToolbar, CommonModule,
    FormsModule, RouterModule, RouterLink]
})
export class VoliDisponibiliPage implements OnInit {

  voli: Volo[] = [];

  richiestaEsito = '';

  constructor(private gestioneVoliService: GestioneVoliService) {
    addIcons({ createOutline, listOutline, addCircleOutline, personOutline, ticketOutline, airplaneOutline,
      calendarOutline, timeOutline, peopleOutline, cardOutline, locationOutline, searchOutline, informationCircleOutline});
  }

  ngOnInit() {
    //Caricamento dei voli disponibili
    this.caricaVoli();
  }

  //Rende inattivi tutti gli elementi quando si esce dalla pagina
  ionViewWillLeave() {
    //Rimuove il focus da qualsiasi elemento attivo
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }

  //Funzione che permette di ottenere i voli disponibili direttamente dal database
  caricaVoli(){
    this.gestioneVoliService.CercaVoliDisponibili().subscribe({
      next: (response) => {
        console.log("Searche success: ", response);
        this.voli = response.data;
      },
       error: (err)=>{
        console.log("Search error: ", err);
        this.richiestaEsito = err.error.message;
        if(this.richiestaEsito != 'Non ci sono voli disponibili'){
          this.richiestaEsito = 'ERRORE: Non è possibile visualizzare i voli disponibili!';
        }
      }
    })
  }

  Modifica(volo: Volo){
    this.gestioneVoliService.setDatiVolo(volo);
  }

}
