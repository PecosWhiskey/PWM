import { Component, OnInit } from '@angular/core';
import {IonHeader,IonToolbar,IonTitle,IonContent,IonTabs,IonTabBar,IonTabButton,IonIcon,IonLabel,IonButton,IonCard,IonCardContent,
  IonCardHeader,IonCardTitle,IonList,IonItem,IonSelect,IonSelectOption,IonChip,IonBadge,} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Volo } from '../models/volo.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Service } from '../tab1/tab1.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule,IonHeader,IonToolbar,IonTitle,IonContent,ExploreContainerComponent,IonTabs,IonTabBar,IonTabButton,
    IonIcon,IonLabel,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonList,IonItem,IonSelect,IonSelectOption,IonChip,IonBadge,],
})
export class Tab2Page implements OnInit {

  constructor(private tab1Service: Tab1Service) {}

  //Valori che cambiano in base ai risultati della ricerca effettuata nel tab1
  voliTrovatiAndata = false; 
  voliTrovatiRitorno = false;

  //Biglietti trovati dalla ricerca nel tab1
  bigliettiAndata: Volo[] = [];
  bigliettiRitorno: Volo[] = [];

  //Informazioni sulla ricerca dell'utente   
  ricercaInfo = { partenza: '', destinazione: '', dataPartenza: '', dataRitorno: '' };

  //Scelta dell'utente sui tipi di volo da cercare: andata e ritorno, solo andata, nessun selzionato
  sceltaUtente = 'nessun selezionato';

  // Filtri per la ricerca avanzata
  filtroPrezzo = 'tutti'; // tutti, economici, medi, premium


  filtroCompagnia = 'tutte'; // tutte, o specifiche compagnie
  compagnieDisponibili: string[] = [];

  //Copia dei biglietti di andata e ritorno trovati per usare questi per filtrare i biglietti e mostrarli all'utente
  bigliettiAndataOriginari: Volo[] = this.bigliettiAndata; 
  bigliettiRitornoOriginari: Volo[] = this.bigliettiRitorno;

  //Biglietti filtrati
  bigliettiAndataFiltrati: Volo[] = [];
  bigliettiRitornoFiltrati: Volo[] = [];

  // Combinazioni migliori
  combinazioniMigliori: { andata: Volo, ritorno: Volo, prezzoTotale: number }[] = [];


  ngOnInit() {
    this.tab1Service.getRicercaInfo().subscribe(info => {
      this.ricercaInfo = info;
    });

    this.tab1Service.getVoliTrovatiAndata().subscribe(founded => {
      this.voliTrovatiAndata = founded;
    })

    this.tab1Service.getVoliTrovatiRitorno().subscribe(founded => {
      this.voliTrovatiRitorno = founded;
    })

    this.tab1Service.getBigliettiAndata().subscribe(biglietti=> {
      this.bigliettiAndata = biglietti;
      this.bigliettiAndataOriginari = biglietti;
    })

    this.tab1Service.getBigliettiRitorno().subscribe(biglietti=> {
      this.bigliettiRitorno = biglietti;
      this.bigliettiRitornoOriginari = biglietti;
    })                      

    this.tab1Service.getSceltaUtente().subscribe(scelta => {
      this.sceltaUtente = scelta;
    })
  };

  applicaFiltri(){
    switch(this.filtroPrezzo){
      case 'tutti':
        this.bigliettiAndata = this.bigliettiAndataOriginari;
        this.bigliettiRitorno = this.bigliettiRitornoOriginari;
        break;

      case 'economici':
        this.bigliettiAndata = this.bigliettiAndataOriginari.filter(volo=> volo.prezzo <= 100);
        this.bigliettiRitorno = this.bigliettiRitornoOriginari.filter(volo=> volo.prezzo <= 100);
        break;

      case 'medi':
        this.bigliettiAndata = this.bigliettiAndataOriginari.filter(volo=> volo.prezzo>100 && volo.prezzo<=300);
        this.bigliettiRitorno = this.bigliettiRitornoOriginari.filter(volo=> volo.prezzo>100 && volo.prezzo<=300);
        break;

      case 'premium':
        this.bigliettiAndata = this.bigliettiAndataOriginari.filter(volo=> volo.prezzo > 300);
        this.bigliettiRitorno = this.bigliettiRitornoOriginari.filter(volo=> volo.prezzo > 300);
        break;
      
      default:
        this.bigliettiAndata = this.bigliettiAndataOriginari;
        this.bigliettiRitorno = this.bigliettiRitornoOriginari;
        break;
    }

    console.log('Biglietti di andata filtrati: ', this.bigliettiAndata);
    console.log('Biglietti di ritorno filtrati:', this.bigliettiRitorno);
  }
  





































  //   this.searchService.bigliettiRitorno$.subscribe(voli => {
  //     this.bigliettiRitorno = voli;
  //     this.bigliettiRitornoFiltrati = voli;
  //     this.estraiCompagnie();
  //     this.calcolaCombinazioniMigliori();
  //   });

  //   this.searchService.cercaInfo$.subscribe(info => {
  //     this.ricercaInfo = info;
  //   });
  // }

  // Estrae le compagnie disponibili per il filtro
  estraiCompagnie() {
    const compagnie = new Set<string>();
    // Supponiamo che la proprietà corretta sia 'partenza' invece di 'compagniaAerea'
    this.bigliettiAndata.forEach(volo => {
      if (volo.partenza) compagnie.add(volo.partenza);
    });
    this.bigliettiRitorno.forEach(volo => {
      if (volo.partenza) compagnie.add(volo.partenza);
    });
    this.compagnieDisponibili = Array.from(compagnie);
  }

  // Applica i filtri ai biglietti
  // applicaFiltri() {
  //   // Filtra per prezzo
  //   this.bigliettiAndataFiltrati = this.bigliettiAndata.filter(volo => {
  //     // Filtro per compagnia/aeroporto (usando partenza invece di compagniaAerea)
  //     if (this.filtroCompagnia !== 'tutte' && volo.partenza !== this.filtroCompagnia) {
  //       return false;
  //     }

  //     // Filtro per range di prezzo
  //     if (this.filtroPrezzo === 'economici') {
  //       return volo.prezzo <= 100;
  //     } else if (this.filtroPrezzo === 'medi') {
  //       return volo.prezzo > 100 && volo.prezzo <= 300;
  //     } else if (this.filtroPrezzo === 'premium') {
  //       return volo.prezzo > 300;
  //     }

  //     return true; // Se filtroPrezzo è "tutti"
  //   });

  //   this.bigliettiRitornoFiltrati = this.bigliettiRitorno.filter(volo => {
  //     // Filtro per compagnia/aeroporto
  //     if (this.filtroCompagnia !== 'tutte' && volo.partenza !== this.filtroCompagnia) {
  //       return false;
  //     }

  //     // Filtro per range di prezzo
  //     if (this.filtroPrezzo === 'economici') {
  //       return volo.prezzo <= 100;
  //     } else if (this.filtroPrezzo === 'medi') {
  //       return volo.prezzo > 100 && volo.prezzo <= 300;
  //     } else if (this.filtroPrezzo === 'premium') {
  //       return volo.prezzo > 300;
  //     }

  //     return true; // Se filtroPrezzo è "tutti"
  //   });

  //   this.calcolaCombinazioniMigliori();
  // }

  // Calcola le combinazioni migliori andata/ritorno
  calcolaCombinazioniMigliori() {
    if (this.bigliettiAndataFiltrati.length === 0 || this.bigliettiRitornoFiltrati.length === 0) {
      this.combinazioniMigliori = [];
      return;
    }

    const combinazioni = [];

    // Crea tutte le combinazioni possibili
    for (const andata of this.bigliettiAndataFiltrati) {
      for (const ritorno of this.bigliettiRitornoFiltrati) {
        combinazioni.push({
          andata: andata,
          ritorno: ritorno,
          prezzoTotale: andata.prezzo + ritorno.prezzo
        });
      }
    }

    // Ordina per prezzo crescente
    combinazioni.sort((a, b) => a.prezzoTotale - b.prezzoTotale);

    // Prendi le 5 combinazioni migliori (o meno se non disponibili)
    this.combinazioniMigliori = combinazioni.slice(0, 5);
  }

  // Formatta data e ora per la visualizzazione
  formattaOra(dataOra: string): string {
    if (!dataOra) return '';
    const data = new Date(dataOra);
    return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formattaData(dataOra: string): string {
    if (!dataOra) return '';
    const data = new Date(dataOra);
    return data.toLocaleDateString();
  }
}
