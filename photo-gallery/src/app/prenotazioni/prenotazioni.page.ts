import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GestioneVoliService } from '../gestione-voli/gestione-voli.service';
import { Biglietto } from '../models/biglietto.models';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, RouterModule, RouterLink]
})
export class PrenotazioniPage implements OnInit {

  biglietti: Biglietto[] = [];
  
  constructor(private gestioneVoliService: GestioneVoliService) {}
  
  ngOnInit(): void {
    //Caricamento dei biglietti
    this.caricaPrenotazioni();
  }
  
  //Funzione che permette di ottenere le prenotazioni dei voli ricevute direttamente dal database 
  caricaPrenotazioni(){
    this.gestioneVoliService.CercaBigliettiAcquistati().subscribe({
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