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

@Component({
  selector: 'app-voli-disponibili',
  templateUrl: './voli-disponibili.page.html',
  styleUrls: ['./voli-disponibili.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonIcon,
    IonButton,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink
  ]
})
export class VoliDisponibiliPage implements OnInit {

  voli: Volo[] = [];

  constructor(private gestioneVoliService: GestioneVoliService) { }

  ngOnInit() {
    //Caricamento dei voli disponibili
    this.caricaVoli();
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
       }
    })
  }

}
