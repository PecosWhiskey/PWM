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
  
  // Stato del login
  isLoggedIn = false;
  isLoading = false;
  
  // Form di login
  loginForm: FormGroup;
  
  // Dati utente (verranno caricati dal backend)
  user: User = {
    name: '',
    email: '',
    flights: 0,
    miles: '0',
    status: ''
  };
  
  // Contatore notifiche (verrà caricato dal backend)
  notificationCount = 0;

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
    // Controlla se l'utente è già loggato (es. da localStorage se fosse disponibile)
    this.checkLoginStatus();
  }

  // Controlla lo stato del login
  checkLoginStatus() {
    // Qui controllerai il token di autenticazione dal backend
    // o verificherai se l'utente è già autenticato
    this.isLoggedIn = false;
  }

  // Gestione del login
  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      try {
        // Qui farai la chiamata al tuo backend per l'autenticazione
        const loginData = {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        };
        
        // await this.authService.login(loginData);
        // Se il login ha successo, carica i dati utente
        // await this.loadUserData();
        
        // Per ora simulo il successo
        await this.simulateLogin();
        this.isLoggedIn = true;
        this.isLoading = false;
        
        console.log('Login effettuato con successo');
        
      } catch (error) {
        this.isLoading = false;
        console.error('Errore durante il login:', error);
        // Mostra messaggio di errore all'utente
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Simula una chiamata di login (rimuovi quando implementi il backend)
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
      // const userData = await this.userService.getUserData();
      // this.user = userData;
      // const notifications = await this.notificationService.getUnreadCount();
      // this.notificationCount = notifications;
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
    
    // Qui rimuoverai il token di autenticazione dal backend
    // this.authService.logout();
    
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