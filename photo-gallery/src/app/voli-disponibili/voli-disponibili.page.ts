import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GestioneVoliService } from '../gestione-voli/gestione-voli.service';
import { Volo } from '../models/volo.models';

@Component({
  selector: 'app-voli-disponibili',
  templateUrl: './voli-disponibili.page.html',
  styleUrls: ['./voli-disponibili.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, RouterModule, RouterLink]
})
export class VoliDisponibiliPage implements OnInit {
  
  voli: Volo[] = [];

  constructor(private gestioneVoliService: GestioneVoliService) { }

  ngOnInit() {
    this.caricaVoli();
  }

  caricaVoli(){
    this.gestioneVoliService.CercaVoliDisponibili().subscribe({
      next: (response) => {
        console.log("Searche success: ", response);
        this.voli = response.data;
      },
       error: (err)=>{
        console.log("Search error: ", err);
       }
    })
  }

}
