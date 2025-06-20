
//prova matteo
/*
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton, IonIcon, IonLabel,
  IonList, IonBadge, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket, star,
  personCircle, notifications, settings, helpCircle, chevronForward
} from 'ionicons/icons';

// Interfaccia per i dati utente
interface User {
  name: string;
  email: string;
  flights: number;
  miles: string;
  status: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton,
    IonIcon, IonLabel, IonList, IonBadge, IonText, IonSpinner,
    ReactiveFormsModule
  ],
})
export class Tab3Page implements OnInit {
  
  // Stato del login - CAMBIATO A TRUE PER TESTARE
  isLoggedIn = true;
  isLoading = false;
  
  // Form di login
  loginForm: FormGroup;
  
  // Dati utente simulati per il testing
  user: User = {
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    flights: 24,
    miles: '48.500',
    status: 'Gold'
  };
  
  // Contatore notifiche simulato
  notificationCount = 3;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Registrazione delle icone
    addIcons({
      person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket,
      star, personCircle, notifications, settings, helpCircle, chevronForward
    });

    // Inizializzazione del form di login
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Controlla se l'utente è già loggato
    this.checkLoginStatus();
  }

  // Controlla lo stato del login
  checkLoginStatus() {
    // Per ora lasciamo isLoggedIn = true per testare la UI
    // In futuro qui controllerai il token di autenticazione
    this.isLoggedIn = true;
  }

  // Gestione del login
  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      try {
        const loginData = {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        };
        
        // Simula il login
        await this.simulateLogin();
        
        // Carica dati utente simulati
        this.user = {
          name: 'Mario Rossi',
          email: loginData.email,
          flights: 24,
          miles: '48.500',
          status: 'Gold'
        };
        this.notificationCount = 3;
        
        this.isLoggedIn = true;
        this.isLoading = false;
        
        console.log('Login effettuato con successo');
        
      } catch (error) {
        this.isLoading = false;
        console.error('Errore durante il login:', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Simula una chiamata di login
  private simulateLogin(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  // Carica i dati utente dal backend
  async loadUserData() {
    try {
      // Qui in futuro farai la chiamata al backend
      // const userData = await this.userService.getUserData();
      // this.user = userData;
    } catch (error) {
      console.error('Errore nel caricamento dei dati utente:', error);
    }
  }

  // Gestione del logout
  logout() {
    this.isLoggedIn = false;
    this.loginForm.reset();
    
    // Reset dei dati utente
    this.user = {
      name: '',
      email: '',
      flights: 0,
      miles: '0',
      status: ''
    };
    this.notificationCount = 0;
    
    console.log('Logout effettuato');
  }

  // Navigazione - I miei voli
  navigateToFlights() {
    console.log('Navigazione a: I miei voli');
    // this.router.navigate(['/flights']);
  }

  // Navigazione - Biglietti
  navigateToTickets() {
    console.log('Navigazione a: Biglietti');
    // this.router.navigate(['/tickets']);
  }

  // Navigazione - Programma fedeltà
  navigateToLoyalty() {
    console.log('Navigazione a: Programma fedeltà');
    // this.router.navigate(['/loyalty']);
  }

  // Navigazione - Modifica profilo
  navigateToProfile() {
    console.log('Navigazione a: Modifica profilo');
    // this.router.navigate(['/edit-profile']);
  }

  // Navigazione - Notifiche
  navigateToNotifications() {
    console.log('Navigazione a: Notifiche');
    // this.router.navigate(['/notifications']);
  }

  // Navigazione - Impostazioni
  navigateToSettings() {
    console.log('Navigazione a: Impostazioni');
    // this.router.navigate(['/settings']);
  }

  // Navigazione - Aiuto & Supporto
  navigateToSupport() {
    console.log('Navigazione a: Aiuto & Supporto');
    // this.router.navigate(['/support']);
  }

  // Navigazione - Registrazione
  navigateToRegister() {
    console.log('Navigazione a: Registrazione');
    // this.router.navigate(['/register']);
  }

  // Navigazione - Password dimenticata
  navigateToForgotPassword() {
    console.log('Navigazione a: Password dimenticata');
    // this.router.navigate(['/forgot-password']);
  }

  // Metodi di utility per il form
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  // Metodo per testare facilmente il cambio di stato
  toggleLoginState() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
  */


// vera prova matteo
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importazione aggiunta

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton, IonIcon, IonLabel,
  IonList, IonBadge, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket, star,
  personCircle, notifications, settings, helpCircle, chevronForward
} from 'ionicons/icons';

// Interfaccia per i dati utente
interface User {
  name: string;
  email: string;
  flights: number;
  miles: string;
  status: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // *** AGGIUNTO QUI ***
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton,
    IonIcon, IonLabel, IonList, IonBadge, IonText, IonSpinner,
    ReactiveFormsModule
  ],
})
export class Tab3Page implements OnInit {

  // Stato del login
  isLoggedIn = true; // Impostato a true per testare la UI di default
  isLoading = false;

  // Form di login
  loginForm: FormGroup;

  // Dati utente simulati per il testing
  user: User = {
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    flights: 24,
    miles: '48.500',
    status: 'Gold'
  };

  // Contatore notifiche simulato
  notificationCount = 3;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Registrazione delle icone Ionic
    addIcons({
      person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket,
      star, personCircle, notifications, settings, helpCircle, chevronForward
    });

    // Inizializzazione del form di login reattivo
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  // Controlla lo stato di login dell'utente
  checkLoginStatus() {
    this.isLoggedIn = true;
  }

  // Gestisce il processo di login
  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      try {
        const loginData = {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        };

        await this.simulateLogin();

        this.user = {
          name: 'VayGo Traveler',
          email: loginData.email,
          flights: Math.floor(Math.random() * 50) + 1,
          miles: (Math.random() * 100000).toFixed(0),
          status: 'Silver'
        };
        this.notificationCount = Math.floor(Math.random() * 5);

        this.isLoggedIn = true;
        this.isLoading = false;

        console.log('Login effettuato con successo per:', loginData.email);

      } catch (error) {
        this.isLoading = false;
        console.error('Errore durante il login:', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form di login non valido. Controlla i campi.');
    }
  }

  // Funzione di utilità per simulare una chiamata asincrona di login
  private simulateLogin(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  // Carica i dati utente dal backend (placeholder per futura implementazione)
  async loadUserData() {
    try {
      // TODO: Implementare la chiamata al servizio backend per recuperare i dati utente
    } catch (error) {
      console.error('Errore nel caricamento dei dati utente:', error);
    }
  }

  // Gestisce il processo di logout dell'utente
  logout() {
    this.isLoggedIn = false;
    this.loginForm.reset();

    this.user = {
      name: '',
      email: '',
      flights: 0,
      miles: '0',
      status: ''
    };
    this.notificationCount = 0;

    console.log('Logout effettuato');
  }

  // Metodi per la navigazione
  navigateToFlights() {
    console.log('Navigazione a: I miei voli');
  }

  navigateToTickets() {
    console.log('Navigazione a: Biglietti');
  }

  navigateToLoyalty() {
    console.log('Navigazione a: Programma fedeltà');
  }

  navigateToProfile() {
    console.log('Navigazione a: Modifica profilo');
  }

  navigateToNotifications() {
    console.log('Navigazione a: Notifiche');
  }

  navigateToSettings() {
    console.log('Navigazione a: Impostazioni');
  }

  navigateToSupport() {
    console.log('Navigazione a: Aiuto & Supporto');
  }

  navigateToRegister() {
    console.log('Navigazione a: Registrazione');
  }

  navigateToForgotPassword() {
    console.log('Navigazione a: Password dimenticata');
  }

  // Getter di convenienza per i controlli del form
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  // Metodo per testare facilmente il cambio di stato
  toggleLoginState() {
    this.isLoggedIn = !this.isLoggedIn;
    console.log('Stato login cambiato a:', this.isLoggedIn);
  }
}
