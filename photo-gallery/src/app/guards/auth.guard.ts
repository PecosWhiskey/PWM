//Protegge le pagine e quindi le rotte ad acesso limitato, quindi solo a coloro che sono autenticati.

import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { TokenService } from '../services/token.service';


export const authGuard: CanActivateFn = async (route, state) => {
  const tokenService = Inject(TokenService); 
  const router = Inject(Router);

   try {
     // Controlla se l'utente è loggato
     const isLogged = await tokenService.isLogged();
    
      if (isLogged) {
        return true; // Permette l'accesso
      } else {
        // Reindirizza al login bloccandone l'accesso
        router.navigate(['/tabs/tab3']);
        return false; 
      }
    } catch (error) {
      console.error('Errore controllo autenticazione:', error);
      router.navigate(['/tabs/tab3']);
      return false;
    }
};