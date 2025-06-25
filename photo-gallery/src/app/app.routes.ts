import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'gestione-voli',
    loadComponent: () => import('./gestione-voli/gestione-voli.page').then( m => m.GestioneVoliPage),
    canActivate : [authGuard]
  },  {
    path: 'crea-biglietto',
    loadComponent: () => import('./crea-biglietto/crea-biglietto.page').then( m => m.CreaBigliettoPage)
  },
  {
    path: 'check-in',
    loadComponent: () => import('./check-in/check-in.page').then( m => m.CheckInPage)
  },

];
