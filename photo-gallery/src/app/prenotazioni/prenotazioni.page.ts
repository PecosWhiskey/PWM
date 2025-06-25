import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardHeader, IonCard, IonCardTitle } from '@ionic/angular/standalone';
import { GestioneVoliService } from '../gestione-voli/gestione-voli.service';
import { Biglietto } from '../models/biglietto.models';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrenotazioniPage implements OnInit {

  biglietti: Biglietto[] = [];
  
    constructor(private gestioneVoliService: GestioneVoliService) {}
  
    ngOnInit(): void {
      this.caricaPrenotazioni();
    }
  
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
