import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importazione aggiunta

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton, IonIcon, IonLabel,
  IonList, IonBadge, IonText, IonSpinner, IonModal, IonButtons, IonSelectOption, IonSelect, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket, star,
  personCircle, notifications, settings, helpCircle, chevronForward
} from 'ionicons/icons';

import { TokenService } from '../services/token.service';
import { AutenticazioneService } from '../services/autenticazione.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButtons, IonModal, 
    CommonModule, // *** AGGIUNTO QUI ***
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton,
    IonIcon, IonLabel, IonList, IonBadge, IonText, IonSpinner,
    ReactiveFormsModule, FormsModule, IonSelectOption, IonSelect
  ],
})
 export class Tab3Page implements OnInit{

  constructor(private autenticazioneService: AutenticazioneService, 
    private tokenService: TokenService, private router: Router){
    addIcons({
      person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket,
       star, personCircle, notifications, settings, helpCircle, chevronForward
     });
  }

  form='Login';
  
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

  isLogged = false;

  async ngOnInit() {
    this.isLogged = await this.tokenService.isLogged();
  }
 
  //Variabili che gestiscono la comparsa del pop up al click su "Notifiche"
  isAlertOpen = false;
  alertButtons = ['Chiudi'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  //Variabili che gestiscono l'apertura della modale al click su "Aiuto & Supporto"
   isModalOpen = false;

  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  changeForm(){
    this.form = 'Registrazione';
  } 

  VaiABigliettiAcquistati(){
    this.router.navigate(['/biglietti-acquistati']);
  }

  LoginCliente(){
    this.autenticazioneService.loginClient({email:this.email, password:this.password}).subscribe({ 
      next: async (response) => {
        console.log('Login success:', response);
          if(response.token){
          try{
            //Salva il token ricevuto
            await this.tokenService.setToken(response.token);
          
            //Salva le info del cliente contenute nel token
            const userInfo = this.tokenService.getClientInfoFromToken(response.token);
            await this.tokenService.setClientInfo(userInfo);
          
            const token = await this.tokenService.getToken();
            const clientInfo = await this.tokenService.getClientInfo();
            console.log('Token e dati del cliente salvati con successo', token);
            console.log('Client info: ', clientInfo);

            this.isLogged = await this.tokenService.isLogged();
            console.log("Loggato: ", this.isLogged);

          }catch(err){
            console.log("Errore nel salvare i dati");
            this.isLogged = false;
          }

         }else{
          console.log("Nessun token ricevuto");
          this.isLogged = false;
         }
        },
        error: (err) => {
         console.log('Login error:', err);
         this.isLogged = false;
        },
     });
  }

  Registrazione(){
    //creo l'oggetto che contiene i dati da inviare al server
    const data= { 
      idCliente: this.idCliente,
      nome: this.nome,
      cognome: this.cognome,
      dataNascita: this.dataNascita,
      documentoID: this.documentoID,
      sesso: this.sesso,
      nazionalita: this.nazionalita,
      stato: this.stato,
      citta: this.citta,
      CAP: this.CAP,
      indirizzo: this.indirizzo,
      numCivico: this.numCivico,
      email: this.email,
      password: this.password,
    }

    // console.log("Dati inseriti per la registrazione: ", data);

    this.autenticazioneService.register(data).subscribe({ 
        next: async (response) => {
         console.log('Registration success:', response);
         console.log(response.data.email);

         if(response.token){
          try{
            //Salva il token ricevuto
            await this.tokenService.setToken(response.token);
          
            //Salva le info del cliente contenute nel token
            const userInfo = this.tokenService.getClientInfoFromToken(response.token);
            await this.tokenService.setClientInfo(userInfo);
          
            console.log('Token e dati del cliente salvati con successo');

            const token = await this.tokenService.getToken();
            const clientInfo = await this.tokenService.getClientInfo();
            console.log('Token e dati del cliente salvati con successo', token);
            console.log('Client info: ', clientInfo);

            this.isLogged = await this.tokenService.isLogged();
            console.log("Loggato: ", this.isLogged);

          }catch(err){
            console.log("Errore nel salvare i dati");
            this.isLogged = false;
          }

         }else{
          console.log("Nessun token ricevuto");
          this.isLogged = false;
         }
        },
        error: (err) => {
         console.log('Registration error:', err);
         this.isLogged = false;

        },
       })
  }

  LoginAmministratore(){
    this.autenticazioneService.loginAdmin({email:this.email, password:this.password}).subscribe({ 
         next: async (response) => {
         console.log('Login success:', response);
         if(response.token){
          try{
            //Salva il token ricevuto
            await this.tokenService.setToken(response.token);
          
            //Salva le info del cliente contenute nel token
            const userInfo = this.tokenService.getAdminInfoFromToken(response.token);
            await this.tokenService.setAdminInfo(userInfo);
          
            const token = await this.tokenService.getToken();
            const adminInfo = await this.tokenService.getAdminInfo();
            console.log("Token e dati dell'amministratore  salvati con successo", token);
            console.log('Admin info: ', adminInfo);

            this.isLogged = await this.tokenService.isLogged();
            console.log("Loggato: ", this.isLogged);

            this.router.navigate(['/gestione-voli']);

          }catch(err){
            console.log("Errore nel salvare i dati");
            this.isLogged = false;
          }

         }else{
          console.log("Nessun token ricevuto");
          this.isLogged = false;
         }
        },
        error: (err) => {
         console.log('Login error:', err);
         this.isLogged = false;
        },
     });
  }

  async Logout(){
    await this.tokenService.logout();
    this.isLogged = await this.tokenService.isLogged();
    console.log(this.isLogged);
  }

}  