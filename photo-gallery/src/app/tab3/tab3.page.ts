import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import {IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,IonCardTitle, IonCardSubtitle, 
  IonItem, IonInput, IonButton, IonIcon, IonLabel,IonList, IonBadge, IonText, IonSpinner, IonModal, IonButtons, IonSelectOption, 
  IonSelect, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket, star,personCircle, notifications, 
  settings, helpCircle, chevronForward} from 'ionicons/icons';
import { TokenService } from '../services/token.service';
import { AutenticazioneService } from '../services/autenticazione.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonAlert, IonButtons, IonModal, CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonInput, IonButton,
    IonIcon, IonLabel, IonList, FormsModule, IonSelectOption, IonSelect],
})
 export class Tab3Page implements OnInit{

  constructor(private autenticazioneService: AutenticazioneService, 
    private tokenService: TokenService, private router: Router){
    addIcons({
      person, mail, lockClosed, logIn, logOut, personAdd, airplane, ticket,
       star, personCircle, notifications, settings, helpCircle, chevronForward
     });
  }

  //Variabile che gestisce quale form mostrare
  form='Login';

  //Dati richiesti in fase di registrazione
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

  isLogged = false; //Mantiene memeorizzato lo stato di autenticazione dell'utente
  isAdmin = false; //Variabile impostata a true solo se "role" = admin
  role = ''; //Permette la visualizzazione della sezione "Gestione Voli" nel profilo dell'amministratore

  ngOnInit() {
    //Recupero dell' informazione circa lo stato di autenticazione dell'utente che accede al suo profilo
    this.isLogged = this.tokenService.isLogged();
    //Recupero delle informazioni dell'amministratore
    const adminInfo = this.tokenService.getAdminInfo();
    //Se presenti vuol dire che sta accedendo al profilo un amministratore
    if(adminInfo){
      //In questo modo verrà visualizzata la sezione "speciale" per l'amministratore
      this.role = adminInfo.role;
    }
  }
 
  //Variabili e funzione che gestiscono la comparsa del pop up al click su "Notifiche"
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

  //Funzione che gestisce la visualizzazione di un form rispetto ad un altro in base alla scelta dell'utente
  changeForm(){
    this.form = 'Registrazione';
  } 

  //Funzione che reindirizza alla pagina di visualizzazione dei biglietti acquistati dal cliente
  VaiABigliettiAcquistati(){
    this.router.navigate(['/biglietti-acquistati']);
  }

  //Funzione che gestisce il login del cliente
  LoginCliente(){
    this.autenticazioneService.loginClient({email:this.email, password:this.password}).subscribe({ 
      next: (response) => {
        console.log('Login success:', response);
        if(response.token){
          try{
            //Salva il token ricevuto
            this.tokenService.setToken(response.token);
          
            //Ricava e salva le informazioni del cliente contenute nel token
            const userInfo = this.tokenService.getClientInfoFromToken(response.token);
            this.tokenService.setClientInfo(userInfo);
          
            //SI PUO' TOGLIERE PRIMA DI CONSEGNARE IL PROGETTO
            //Recupero dei dati appena salvati per verificare che siano stati salvati correttamente
            const token = this.tokenService.getToken();
            const clientInfo = this.tokenService.getClientInfo();
            console.log('Token salvato: ', token);
            console.log('Client info salvate: ', clientInfo);

            //Verifica che il cliente sia autenticato
            this.isLogged = this.tokenService.isLogged();
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

  //Funzione che gestisce la registrazione del cliente
  Registrazione(){
    //Creazione dell'oggetto che contiene i dati da inviare al server
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
      next: (response) => {
        console.log('Registration success:', response);
        console.log(response.data.email);

        if(response.token){
          try{
            //Salva il token ricevuto
            this.tokenService.setToken(response.token);
        
            //Ricava e salva le informazioni del cliente contenute nel token
            const userInfo = this.tokenService.getClientInfoFromToken(response.token);
            this.tokenService.setClientInfo(userInfo);

            //SI PUO' TOGLIERE PRIMA DI CONSEGNARE IL PROGETTO
            //Recupero dei dati appena salvati per verificare che siano stati salvati correttamente
            const token = this.tokenService.getToken();
            const clientInfo = this.tokenService.getClientInfo();
            console.log('Token salvato: ', token);
            console.log('Client info salvate: ', clientInfo);

            //Verifica che il cliente sia autenticato
            this.isLogged = this.tokenService.isLogged();
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

  //Funzione che gestisce il login dell'amministratore
  LoginAmministratore(){
    this.autenticazioneService.loginAdmin({email:this.email, password:this.password}).subscribe({ 
      next: (response) => {
        console.log('Login success:', response);
        if(response.token){
          try{
            //Salva il token ricevuto
            this.tokenService.setToken(response.token);
          
            //Ricava e salva le info dell'amministratore contenute nel token
            const userInfo = this.tokenService.getAdminInfoFromToken(response.token);
            this.tokenService.setAdminInfo(userInfo);
          
            //SI PUO' TOGLIERE PRIMA DI CONSEGNARE IL PROGETTO
            //Recupero dei dati appena salvati per verificare che siano stati salvati correttamente
            const token = this.tokenService.getToken();
            const adminInfo = this.tokenService.getAdminInfo();
            //Ricava il ruolo dalle informazioni ottenute dal payload del token, che sarà admin
            this.role = adminInfo.role;

            console.log("Token e dati dell'amministratore  salvati con successo", token);
            console.log('Admin info: ', adminInfo);

            //Verifica che l'amministratores sia autenticato
            this.isLogged = this.tokenService.isLogged();
            console.log("Loggato: ", this.isLogged);

            // this.router.navigate(['/gestione-voli']);
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

  //Funzione che reinidirizza l'amministratore alla oagina di gestione ei voli
  VaiAGestioneVoli(){
    this.router.navigate(['/gestione-voli']);
  }

  //Funzione che esegue il logout
  Logout(){
    this.tokenService.logout();
    this.isLogged = this.tokenService.isLogged();
    //imposta il valore di 'role' uguale ad una stringa vuota 
    this.role = '';
    console.log(this.isLogged);
  }

}  