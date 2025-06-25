import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput, IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPopover, 
  IonHeader, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//import { CercaBigliettoService } from './home-service.service';
import { HomeService } from './home.service';
import { RouterModule, RouterOutlet, RouterLink} from '@angular/router';
import { Volo } from '../models/volo.models';
import { GestioneVoliService } from '../gestione-voli/gestione-voli.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterModule, IonHeader, RouterModule, IonPopover, IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
    IonDatetime, IonInput, IonButton, IonItem, IonContent, CommonModule, FormsModule, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar]
})
export class HomePage {

  voli: Volo[] = [];

  constructor(private gestioneVoliService: GestioneVoliService) {}

  ngOnInit(): void {
    this.caricaVoli();
  }

  caricaVoli(){
    this.gestioneVoliService.CercaVoliDisponibili().subscribe({
      next: (response) => {
        console.log("Search success: ", response);
        this.voli = response.data;
      },
       error: (err) => {
        console.log("Search error: ", err);
       }
    })
  }
}