import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importazione aggiunta

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton, IonIcon, IonLabel,
  IonList, IonBadge, IonText, IonSpinner, IonModal, IonButtons, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket, star,
  personCircle, notifications, settings, helpCircle, chevronForward
} from 'ionicons/icons';

import { TokenService } from '../services/token.service';
import { AutenticazioneService } from '../services/autenticazione.service';
import { FormsModule } from '@angular/forms';

// // Interfaccia per i dati utente
// interface User {
//   name: string;
//   email: string;
//   flights: number;
//   miles: string;
//   status: string;
// }

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, 
    CommonModule, // *** AGGIUNTO QUI ***
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton,
    IonIcon, IonLabel, IonList, IonBadge, IonText, IonSpinner,
    ReactiveFormsModule, FormsModule, IonSelectOption
  ],
})
 export class Tab3Page implements OnInit{
// closeContactPopup() {
// throw new Error('Method not implemented.');
// }
// isContactPopupOpen: any;
// openContactPopup() {
// throw new Error('Method not implemented.');
// }

//   // Stato del login
//   isLoggedIn = true; // Impostato a true per testare la UI di default
//   isLoading = false;

//   // Form di login
//   loginForm: FormGroup;

//   // Dati utente simulati per il testing
//   user: User = {
//     name: 'Mario Rossi',
//     email: 'mario.rossi@email.com',
//     flights: 24,
//     miles: '48.500',
//     status: 'Gold'
//   };

//   // Contatore notifiche simulato
//   notificationCount = 3;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private tokenService: TokenService,
//     private autenticazioneService: AutenticazioneService,
//   ) {
//     // Registrazione delle icone Ionic
//     addIcons({
//       person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket,
//       star, personCircle, notifications, settings, helpCircle, chevronForward
//     });

//     // Inizializzazione del form di login reattivo
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   ngOnInit() {
//     this.checkLoginStatus();
//   }

//   // Controlla lo stato di login dell'utente
//   checkLoginStatus() {
//     this.isLoggedIn = true;
//   }

//   // Gestisce il processo di login
//   async onLogin() {
//     if (this.loginForm.valid) {
//       this.isLoading = true;

//       try {
//         const loginData = {
//           email: this.loginForm.get('email')?.value,
//           password: this.loginForm.get('password')?.value
//         };

//         await this.simulateLogin();

//         this.user = {
//           name: 'VayGo Traveler',
//           email: loginData.email,
//           flights: Math.floor(Math.random() * 50) + 1,
//           miles: (Math.random() * 100000).toFixed(0),
//           status: 'Silver'
//         };
//         this.notificationCount = Math.floor(Math.random() * 5);

//         this.isLoggedIn = true;
//         this.isLoading = false;

//         console.log('Login effettuato con successo per:', loginData.email);

//       } catch (error) {
//         this.isLoading = false;
//         console.error('Errore durante il login:', error);
//       }
//     } else {
//       this.loginForm.markAllAsTouched();
//       console.log('Form di login non valido. Controlla i campi.');
//     }
//   }

//   // Funzione di utilità per simulare una chiamata asincrona di login
//   private simulateLogin(): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, 1500);
//     });
//   }

//   // Carica i dati utente dal backend (placeholder per futura implementazione)
//   async loadUserData() {
//     try {
//       // TODO: Implementare la chiamata al servizio backend per recuperare i dati utente
//     } catch (error) {
//       console.error('Errore nel caricamento dei dati utente:', error);
//     }
//   }

//   // Gestisce il processo di logout dell'utente
//   logout() {
//     this.isLoggedIn = false;
//     this.loginForm.reset();

//     this.user = {
//       name: '',
//       email: '',
//       flights: 0,
//       miles: '0',
//       status: ''
//     };
//     this.notificationCount = 0;

//     console.log('Logout effettuato');
//   }

//   // Metodi per la navigazione
//   navigateToFlights() {
//     console.log('Navigazione a: I miei voli');
//   }

//   navigateToTickets() {
//     console.log('Navigazione a: Biglietti');
//   }

//   navigateToLoyalty() {
//     console.log('Navigazione a: Programma fedeltà');
//   }

//   navigateToProfile() {
//     console.log('Navigazione a: Modifica profilo');
//   }

//   navigateToNotifications() {
//     console.log('Navigazione a: Notifiche');
//   }

//   navigateToSettings() {
//     console.log('Navigazione a: Impostazioni');
//   }

//   navigateToSupport() {
//     console.log('Navigazione a: Aiuto & Supporto');
//   }

//   navigateToRegister() {
//     console.log('Navigazione a: Registrazione');
//   }

//   navigateToForgotPassword() {
//     console.log('Navigazione a: Password dimenticata');
//   }

//   // Getter di convenienza per i controlli del form
//   get emailControl() {
//     return this.loginForm.get('email');
//   }

//   get passwordControl() {
//     return this.loginForm.get('password');
//   }

//   // Metodo per testare facilmente il cambio di stato
//   toggleLoginState() {
//     this.isLoggedIn = !this.isLoggedIn;
//     console.log('Stato login cambiato a:', this.isLoggedIn);
//   }
//   // Sostituisci le variabili e metodi del popup contatti con questi per il supporto
// isSupportPopupOpen = false;

// openSupportPopup() {
//   this.isSupportPopupOpen = true;
// }

// closeSupportPopup() {
//   this.isSupportPopupOpen = false;
// }

// // Rimuovi questi metodi se li avevi:
// // isContactPopupOpen, openContactPopup(), closeContactPopup()


// /*  import { Component } from '@angular/core';
// import {IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,IonButton,IonCard,
//   IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, IonSelectOption, IonSelect} from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-tab3',
//   templateUrl: 'tab3.page.html',
//   styleUrls: ['tab3.page.scss'],
//   standalone: true,

//     imports: [IonHeader,IonToolbar,IonTitle,IonContent,ExploreContainerComponent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,
//     IonButton,IonCard,IonCardContent,IonSegment,IonSegmentButton,IonItem,IonInput, FormsModule, IonSelectOption, IonSelect],
// })
//   password= '';

//   form= 'Login'; //di default assume valore 'login' se l'utente clicca sul bottone 'Registrati' cambai in 'registrazione
// //                 e viene mostrato il form per la registrazione
// }

//   changeForm(){
//     this.form = 'Registrazione';

//       back(){
//     this.form = 'Login';

//   }

//     Registrazione(){
//     console.log('registrato');
//   }
// }

// Login(){
//      this.accountSerivice.login({email:this.email, password:this.password}).subscribe({ 
//          next: (response) => {
//          console.log('Login success:', response);
//         },
//         error: (err) => {
//          console.log('Login error:', err);
//         },
//      });
//   }

// */

  constructor(private autenticazioneService: AutenticazioneService, private tokenService: TokenService){
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

  ngOnInit(): void {
      
  }

   changeForm(){
     this.form = 'Registrazione';
   } 

Login(){
     this.autenticazioneService.login({email:this.email, password:this.password}).subscribe({ 
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
            const adminInfo = await this.tokenService.getClientInfo();
            console.log('Token e dati del cliente salvati con successo', token);
            console.log('Admin info: ', adminInfo);

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
            const adminInfo = await this.tokenService.getClientInfo();
            console.log('Token e dati del cliente salvati con successo', token);
            console.log('Admin info: ', adminInfo);

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

}  