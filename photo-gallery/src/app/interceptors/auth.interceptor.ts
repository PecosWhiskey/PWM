//L'interceptor serve per inviare automaticamente il token al back-end senza doverlo aggiungere manualmente

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);


  //Poiché le due funzioni restituiscono una Promise, vengono trasformate in un Observable e gestite da switchMap (grazie a pipe)
       return from(Promise.all([tokenService.isTokenExpired(),tokenService.getToken()])).pipe(
        switchMap(([isExpired, token]) => {
          //Se il token è presente verifica prima che non sia scaduto
          if (token) {
            if(isExpired){ //Se è scaduto reindirizza al login
              console.log('Token scaduto! Reindirizzamento al login');
              return from(logout(tokenService, router)).pipe(
                switchMap(() => throwError(() => new Error('Token scaduto'))),
                catchError(logoutError => {
                  console.error('Errore durante logout:', logoutError);
                  // Anche se il logout fallisce, blocca comunque la richiesta
                  return throwError(() => new Error('Token scaduto'));
                })
              );
            }
            //Altrimenti lo aggiunge alla richiesta
            let clonedReq = req;
            clonedReq = req.clone({
              setHeaders: {
                Authorization:`Bearer ${token}`,
              }
            })

            return next(clonedReq);

          }else{ //Se il token non è presente lascia la richiesta così com'è
            return next(req);//Se il token era necessario per la richiesta sarà il server a restituire un messaggio di errore
          }
        }),
        catchError(error => {
          if (error.status === 401) {
            console.log('Token scaduto');
            logout(tokenService, router);
          }
          return throwError(() => error);
        })
      );

  //Funzione che reinderizza al login se il token è scaduto o mancante    
  async function logout(tokenService: any, router: Router) {
    await tokenService.logout();
    router.navigate(['/tabs/tab3']);
  }
};
