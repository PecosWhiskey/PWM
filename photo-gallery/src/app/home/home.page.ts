import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput, IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPopover,
  IonHeader, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, CommonModule, FormsModule]
})
export class HomePage {

  constructor() {}

  ngOnInit(): void {
  }
}
