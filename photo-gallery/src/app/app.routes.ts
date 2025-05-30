import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'gestione-voli',
    loadComponent: () => import('./gestione-voli/gestione-voli.page').then( m => m.GestioneVoliPage)
  },
];
