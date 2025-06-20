import { Component } from '@angular/core';
import {IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,IonButton,IonCard,
  IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, IonSelectOption, IonSelect} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader,IonToolbar,IonTitle,IonContent,ExploreContainerComponent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,
    IonButton,IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, FormsModule, IonSelectOption, IonSelect],
})
export class Tab3Page {
  constructor() {}

  idCliente = ''; //codice fiscale del cliente che prendiamo come id
  nome = '';
  cognome = '';
  dataNascita = '';
  documentoID = '';
  sesso = '';
  nazionalita = '';
  stato = '';
  citta= '';
  CAP = '';
  indirizzo = '';
  numCivico = 0;
  disabile = 0;
  email = '';
  password= '';

  form= 'Login'; //di default assume valore 'login' se l'utente clicca sul bottone 'Registrati' cambai in 'registrazione
//                 e viene mostrato il form per la registrazione

  changeForm(){
    this.form = 'Registrazione';
  }

  back(){
    this.form = 'Login';
  }

  Registrazione(){
    console.log('registrato');
  }

  Login(){
    console.log('accesso effetuato');
  }
}
