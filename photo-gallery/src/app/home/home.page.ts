import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonButton, IonInput, IonDatetime, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPopover, 
  IonHeader, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
//import { CercaBigliettoService } from './home-service.service';
import { HomeService } from './home.service';
import { RouterModule, RouterOutlet, RouterLink} from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterModule, IonHeader, RouterModule, IonPopover, IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
    IonDatetime, IonInput, IonButton, IonItem, IonContent, CommonModule, FormsModule, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar]
})
export class HomePage {

  constructor(private accountSerivice: HomeService, private tokenService: TokenService) {}

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

  form= 'Login'; //uguale a login se l'utente clicca su login, uguale a registrazione se l'utente clicca su registrazione.
  //          il valore viene passato dalla page cerca-biglietto all'accountService e ottenuto qui tramite il service.

  isLogged=true;

  ngOnInit(): void {}

  changeForm(){
    this.form='Registrazione';
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
    console.log("Dati inseriti: ", data);

    this.accountSerivice.register(data).subscribe({ 
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
  Login(){
     this.accountSerivice.login({email:this.email, password:this.password}).subscribe({ 
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
}